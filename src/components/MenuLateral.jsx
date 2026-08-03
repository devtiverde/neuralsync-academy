import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

/**
 * Menu lateral suspenso, presente em TODAS as telas.
 *
 * Por que existe: a navegação era uma única fileira horizontal na topbar que não
 * quebra nem rola. Numa janela de 1100px os últimos itens (Loja, Perfil) ficavam
 * fora da tela, e o `overflow-x: hidden` global escondia a barra de rolagem —
 * então não havia NENHUMA forma de chegar neles. No celular sumiam 894px de menu.
 * Também não existia botão de sair, nem volta para o início dentro das atividades.
 *
 * Comportamento: alça fina na borda esquerda; no desktop abre ao passar o mouse,
 * no toque abre no clique (hover não existe em touch).
 */

const LINKS_CRIANCA = [
  { icon: '🏠', label: 'Início',      path: '/home-crianca' },
  { icon: '🗺️', label: 'Trilha',      path: '/trilha' },
  { icon: '🎬', label: 'Kids TV',     path: '/kids' },
  { icon: '⌨️', label: 'Digitação',   path: '/digitacao' },
  { icon: '📔', label: 'Diário',      path: '/diario' },
  { icon: '🌿', label: 'Offline',     path: '/atividades-offline' },
  { icon: '🪄', label: 'Quiz IA',     path: '/quiz-ia' },
  { icon: '🏆', label: 'Ranking',     path: '/ranking' },
  { icon: '🏪', label: 'Loja',        path: '/loja' },
  { icon: '🎨', label: 'Personalizar',path: '/personalizar' },
  { icon: '👤', label: 'Meu Perfil',  path: '/perfil-crianca' },
]

const LINKS_PAI = [
  { icon: '📊', label: 'Painel',        path: '/dashboard' },
  { icon: '🧭', label: 'Primeiros passos', path: '/primeiros-passos' },
  { icon: '🗓️', label: 'Trilha',        path: '/trilha-pai' },
  { icon: '⏱️', label: 'Timer',         path: '/timer' },
  { icon: '📅', label: 'Agenda',        path: '/agenda' },
  { icon: '📈', label: 'Relatório',     path: '/relatorio' },
  { icon: '🤖', label: 'NeuralAI',      path: '/relatorio-ia' },
  { icon: '🔔', label: 'Notificações',  path: '/notificacoes' },
  { icon: '⚙️', label: 'Configurações', path: '/configuracoes' },
]

export default function MenuLateral({ tipo = 'crianca' }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { signOut } = useAuth()
  const [aberto, setAberto] = useState(false)
  const [touch, setTouch] = useState(false)
  // lê o cache já na inicialização: fazer isso dentro do efeito custaria um render extra
  // em toda navegação, e o menu monta em todas as telas do app.
  const [ehAdmin, setEhAdmin] = useState(() => {
    try { return sessionStorage.getItem('ns_eh_admin') === '1' } catch { return false }
  })
  const fecharTimer = useRef(null)

  useEffect(() => {
    // `hover: none` distingue dedo de mouse melhor que largura de tela: um tablet
    // grande tem 1024px e mesmo assim nunca dispara mouseenter de forma confiável.
    const mq = window.matchMedia('(hover: none)')
    const aplicar = () => setTouch(mq.matches)
    aplicar()
    mq.addEventListener('change', aplicar)
    return () => mq.removeEventListener('change', aplicar)
  }, [])

  // Fecha ao trocar de rota, senão o painel fica aberto por cima da tela nova.
  useEffect(() => { setAberto(false) }, [pathname])

  useEffect(() => {
    if (!aberto) return
    const esc = e => { if (e.key === 'Escape') setAberto(false) }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [aberto])

  useEffect(() => () => clearTimeout(fecharTimer.current), [])

  // O painel de feedbacks só aparece para quem é administrador. Um pai comum vendo o item
  // e batendo na tela de "sem acesso" é ruído. A resposta fica no sessionStorage porque o
  // menu monta em TODA tela do app — sem cache seria uma consulta por navegação.
  useEffect(() => {
    if (tipo !== 'pai') return
    // já respondido nesta aba (o valor foi lido na inicialização do estado) — não repergunta
    let cache = null
    try { cache = sessionStorage.getItem('ns_eh_admin') } catch { /* modo privativo */ }
    if (cache !== null) return
    let vivo = true
    supabase.auth.getUser().then(({ data }) => {
      const id = data?.user?.id
      if (!id) return
      return supabase.from('ns_admins').select('user_id').eq('user_id', id).maybeSingle()
        .then(({ data: linha }) => {
          if (!vivo) return
          const sim = !!linha
          sessionStorage.setItem('ns_eh_admin', sim ? '1' : '0')
          setEhAdmin(sim)
        })
    }).catch(() => {})
    return () => { vivo = false }
  }, [tipo])

  const links = tipo === 'pai'
    ? (ehAdmin ? [...LINKS_PAI, { icon: '💬', label: 'Feedbacks', path: '/feedbacks' }] : LINKS_PAI)
    : LINKS_CRIANCA
  const corBase = tipo === 'pai' ? '#7C3AED' : '#a78bfa'

  const abrir = () => { clearTimeout(fecharTimer.current); setAberto(true) }
  const agendarFechar = () => {
    clearTimeout(fecharTimer.current)
    // pequena tolerância: sem isso o menu fecha se o mouse passar de raspão na borda
    fecharTimer.current = setTimeout(() => setAberto(false), 220)
  }

  const ir = path => { setAberto(false); navigate(path) }

  const sair = async () => {
    setAberto(false)
    try { await signOut() } finally { navigate('/auth', { replace: true }) }
  }

  return (
    <>
      {/* Véu só no toque — no desktop o menu é passageiro e não deve travar a tela */}
      {aberto && touch && (
        <div
          onClick={() => setAberto(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(5,2,15,0.55)', zIndex: 998 }}
        />
      )}

      <div
        onMouseEnter={touch ? undefined : abrir}
        onMouseLeave={touch ? undefined : agendarFechar}
        style={{
          position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 999,
          display: 'flex', alignItems: 'center', pointerEvents: 'none',
        }}
      >
        {/* Alça: fica sempre visível para a pessoa saber que há um menu ali */}
        <button
          onClick={() => setAberto(a => !a)}
          aria-label="Abrir menu de navegação"
          aria-expanded={aberto}
          style={{
            pointerEvents: 'auto',
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            width: 30, height: 116, border: 'none', cursor: 'pointer',
            borderRadius: '0 14px 14px 0',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.95), rgba(76,29,149,0.95))',
            color: 'white', fontSize: 15, lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '2px 0 14px rgba(0,0,0,0.35)',
            opacity: aberto ? 0 : 1,
            transition: 'opacity 0.18s',
          }}
        >
          ☰
        </button>

        {/* Painel */}
        <nav
          style={{
            pointerEvents: aberto ? 'auto' : 'none',
            width: 246, height: '100vh', overflowY: 'auto',
            background: 'linear-gradient(170deg, #1c0b42 0%, #0b0518 100%)',
            borderRight: '1px solid rgba(255,255,255,0.10)',
            boxShadow: aberto ? '8px 0 40px rgba(0,0,0,0.5)' : 'none',
            transform: aberto ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.24s cubic-bezier(0.4,0,0.2,1)',
            display: 'flex', flexDirection: 'column',
            padding: '18px 12px calc(18px + env(safe-area-inset-bottom, 0px))',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px 14px' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 14, letterSpacing: 0.3 }}>
              {tipo === 'pai' ? 'Área dos Pais' : 'Navegar'}
            </span>
            <button
              onClick={() => setAberto(false)}
              aria-label="Fechar menu"
              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', width: 30, height: 30, borderRadius: 9, cursor: 'pointer', fontSize: 15 }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            {links.map(l => {
              const ativo = pathname === l.path
              return (
                <button
                  key={l.path}
                  onClick={() => ir(l.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 11,
                    padding: '11px 12px', borderRadius: 11, border: 'none',
                    cursor: 'pointer', textAlign: 'left', width: '100%',
                    minHeight: 44,
                    background: ativo ? 'rgba(124,58,237,0.42)' : 'transparent',
                    color: ativo ? '#fff' : 'rgba(255,255,255,0.72)',
                    fontWeight: ativo ? 800 : 600, fontSize: 14.5,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <span style={{ fontSize: 19, width: 24, textAlign: 'center', flexShrink: 0 }}>{l.icon}</span>
                  <span>{l.label}</span>
                </button>
              )
            })}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 10, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <button
              onClick={() => ir(tipo === 'pai' ? '/home-crianca' : '/dashboard')}
              style={{
                display: 'flex', alignItems: 'center', gap: 11, minHeight: 44,
                padding: '11px 12px', borderRadius: 11, border: 'none', cursor: 'pointer',
                background: 'rgba(255,255,255,0.06)', color: corBase,
                fontWeight: 800, fontSize: 14, textAlign: 'left', width: '100%',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{tipo === 'pai' ? '🎮' : '👨‍👩‍👧'}</span>
              <span>{tipo === 'pai' ? 'Área da Criança' : 'Área dos Pais'}</span>
            </button>

            <button
              onClick={sair}
              style={{
                display: 'flex', alignItems: 'center', gap: 11, minHeight: 44,
                padding: '11px 12px', borderRadius: 11, border: 'none', cursor: 'pointer',
                background: 'transparent', color: '#fca5a5',
                fontWeight: 800, fontSize: 14, textAlign: 'left', width: '100%',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>🚪</span>
              <span>Sair da conta</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
