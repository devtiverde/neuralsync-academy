import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { assinaturaVigente } from '../lib/assinatura'

const AuthContext = createContext({})

// Bancada de teste: com `ns_dev_bypass` ligado, finge uma sessão com plano pago
// para que as telas atrás do paywall (Loja, Ranking, Relatório, Ebook) e a
// `/home-crianca` possam ser auditadas sem criar conta de verdade em produção —
// antes sobravam contas `@teste-neuralsync.com` no banco por causa disso.
//
// `import.meta.env.DEV` vira `false` no build e o bloco todo some do bundle
// publicado (conferido: nem `ns_dev_bypass` nem `qa@dev.local` aparecem em
// `dist/`). É o mesmo mecanismo do `PrivateRoute` e do `src/dev/DevAtividade.jsx`.
// ⚠️ Trocar isso por uma env var comum abriria a porta em produção: só
// `import.meta.env.DEV` é eliminado na compilação.
// ⚠️ Os dados falsos ficam DENTRO desta função, depois do `return` de produção.
// Numa primeira versão eles eram constantes no topo do arquivo e o e-mail
// `qa@dev.local` FOI PARAR NO BUNDLE PUBLICADO: a constante continuava
// referenciada e o compilador não teve como eliminá-la. Com o `return` antecipado,
// `import.meta.env.DEV` vira `false`, tudo abaixo é código morto e some.
// Conferir depois de mexer aqui:  grep -r "qa@dev.local" dist/assets/
function estadoInicialDev() {
  if (!import.meta.env.DEV) return null
  try { if (sessionStorage.getItem('ns_dev_bypass') !== '1') return null } catch { return null }
  return {
    user: { id: '00000000-0000-4000-8000-000000000000', email: 'qa@dev.local' },
    subscription: { plano: 'premium', plano_status: 'ativo', plano_ativo_ate: '2099-12-31T00:00:00Z' },
  }
}

export function AuthProvider({ children }) {
  // Inicializar o estado direto, em vez de chamar setState dentro do efeito:
  // evita um render extra e não acrescenta aviso de lint ao arquivo.
  const [user, setUser] = useState(() => estadoInicialDev()?.user ?? null)
  const [subscription, setSubscription] = useState(() => estadoInicialDev()?.subscription ?? null)
  const [subscriptionLoaded, setSubscriptionLoaded] = useState(() => !!estadoInicialDev())
  const [loading, setLoading] = useState(() => !estadoInicialDev())
  // 'ativando' evita a corrida: enquanto a Edge Function de ativação não respondeu,
  // ninguém pode concluir que o usuário está sem plano.
  const [ativando, setAtivando] = useState(false)
  // guarda o e-mail quando NÃO se acha assinatura — quem comprou com outro e-mail
  // precisa ver isso escrito, senão acha que o pagamento não passou e pede reembolso
  const [ativacaoFalhou, setAtivacaoFalhou] = useState(null)

  // Devolve a assinatura carregada para que quem chamou possa decidir na hora,
  // sem depender do setState (que só vale no próximo render).
  const loadSubscription = async (userId) => {
    try {
      const { data } = await supabase
        .from('users')
        .select('plano, plano_status, plano_ativo_ate, filhos_limite, kiwify_subscriber_id')
        .eq('id', userId)
        .single()
      if (data) setSubscription(data)
      return data ?? null
    } catch {
      return null
    } finally {
      setSubscriptionLoaded(true)
    }
  }

  // pending_subscriptions só é legível pelo service_role (RLS sem policy pública
  // de propósito) — a ativação de plano pago pago-antes-de-cadastrar precisa
  // passar por essa Edge Function, nunca por uma query direta do cliente.
  const activatePendingPlan = async (accessToken) => {
    if (!accessToken) return null
    try {
      const r = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/activate-pending-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      return await r.json()
    } catch { return null }
  }

  useEffect(() => {
    // Na bancada de teste o estado já nasce preenchido (ver os `useState` acima);
    // não há sessão real para buscar nem escuta de autenticação a registrar.
    if (estadoInicialDev()) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadSubscription(session.user.id)
      else setSubscriptionLoaded(true)
      setLoading(false)
    })

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadSubscription(session.user.id)
      } else {
        setSubscription(null)
        setSubscriptionLoaded(true)
      }
    })

    return () => authListener.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error && data.user) {
      // Não aguarda: a Edge Function de ativação de plano pode demorar (cold
      // start) e travaria o botão de login. onAuthStateChange já recarrega a
      // assinatura sozinho; aqui só recarregamos de novo depois pra refletir
      // um plano recém-ativado.
      setAtivando(true)
      const r = await activatePendingPlan(data.session?.access_token)
      const sub = await loadSubscription(data.user.id)
      // `activated:false` só significa "não havia nada pendente pra ativar" — e isso
      // é o caso normal de QUALQUER pessoa cujo plano já foi ativado antes. Só é
      // problema de verdade se, depois de carregar, ela realmente não tiver plano.
      if (r && r.activated === false && !assinaturaVigente(sub)) {
        setAtivacaoFalhou(email.toLowerCase())
      }
      setAtivando(false)
    }
    return { error }
  }

  const signUp = async (email, password, nome) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (!error && data.user) {
      const emailLower = email.toLowerCase()
      await supabase.from('users').insert({
        id: data.user.id, email: emailLower, nome, tipo: 'pai',
      })
      setAtivando(true)
      const r = await activatePendingPlan(data.session?.access_token)
      const sub = await loadSubscription(data.user.id)
      if (r && r.activated === false && !assinaturaVigente(sub)) {
        setAtivacaoFalhou(emailLower)
      }
      setAtivando(false)
    }
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSubscription(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, subscription, subscriptionLoaded, ativando, ativacaoFalhou, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
