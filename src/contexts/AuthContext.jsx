import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [subscriptionLoaded, setSubscriptionLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadSubscription = async (userId) => {
    try {
      const { data } = await supabase
        .from('users')
        .select('plano, plano_status, plano_ativo_ate, filhos_limite, kiwify_subscriber_id')
        .eq('id', userId)
        .single()
      if (data) setSubscription(data)
    } catch {
    } finally {
      setSubscriptionLoaded(true)
    }
  }

  // pending_subscriptions só é legível pelo service_role (RLS sem policy pública
  // de propósito) — a ativação de plano pago pago-antes-de-cadastrar precisa
  // passar por essa Edge Function, nunca por uma query direta do cliente.
  const activatePendingPlan = async (accessToken) => {
    if (!accessToken) return
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/activate-pending-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
    } catch {}
  }

  useEffect(() => {
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
      activatePendingPlan(data.session?.access_token).then(() => loadSubscription(data.user.id))
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
      activatePendingPlan(data.session?.access_token).then(() => loadSubscription(data.user.id))
    }
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSubscription(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, subscription, subscriptionLoaded, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
