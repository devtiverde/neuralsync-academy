import { useNavigate, useLocation } from 'react-router-dom'
import { Brain, CoinVertical, Fire } from '@phosphor-icons/react'
import FAQButton from './FAQButton'
import FeedbackButton from './FeedbackButton'
import { MOLDURA_STYLES, TEMA_CONFIG } from '../lib/lojaConfig'
import '../styles/crianca.css'

const AVATAR_MAP = {
  explorer:'🧭',av_explorer:'🧭',cientista:'🔬',av_cientista:'🔬',
  astronauta:'🚀',av_astronauta:'🚀',mago:'🧙',av_mago:'🧙',
  artista:'🎨',av_artista:'🎨',robô:'🤖',robo:'🤖',av_robo:'🤖',
  dino:'🦕',av_dino:'🦕',ninja:'🥷',av_ninja:'🥷',
}
const avatar = av => (!av ? '🦊' : AVATAR_MAP[String(av).toLowerCase()] || av)

const NAV_BASE = [
  { icon: '🏠', label: 'Início',    path: '/home-crianca' },
  { icon: '🗺️', label: 'Trilha',    path: '/trilha' },
  { icon: '🎬', label: 'Kids TV',   path: '/kids' },
  { icon: '⌨️', label: 'Digitação', path: '/digitacao' },
  { icon: '📔', label: 'Diário',    path: '/diario' },
  { icon: '🌿', label: 'Offline',   path: '/atividades-offline' },
  { icon: '🧩', label: 'Quiz IA',   path: '/quiz-ia', badge: 'IA' },
  { icon: '🏆', label: 'Ranking',   path: '/ranking' },
  { icon: '🏪', label: 'Loja',      path: '/loja' },
  { icon: '👤', label: 'Perfil',    path: '/perfil-crianca' },
]
// NeuralAI apenas para Inventores (12+)
const NAV_INVENTORES_EXTRA = { icon: '🤖', label: 'NeuralAI', path: '/neural-ai', badge: 'IA' }

export default function LayoutCrianca({ children, child }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const faixaAtual = child?.faixa_etaria || 'construtores'
  const nav = faixaAtual === 'inventores'
    ? [...NAV_BASE.slice(0, 6), NAV_INVENTORES_EXTRA, ...NAV_BASE.slice(6)]
    : NAV_BASE

  const xpPercent = child
    ? Math.min((child.xp / Math.max((child.nivel || 1) * 500, 1)) * 100, 100)
    : 0

  const temaEquipado = (() => {
    if (!child?.id) return null
    try { return JSON.parse(localStorage.getItem(`ns_tema_${child.id}`) || 'null') } catch { return null }
  })()
  const tema = temaEquipado?.id ? TEMA_CONFIG[temaEquipado.id] : null

  const molduraEquipada = (() => {
    if (!child?.id) return null
    try { return JSON.parse(localStorage.getItem(`ns_moldura_${child.id}`) || 'null') } catch { return null }
  })()
  const molduraStyle = molduraEquipada?.id ? MOLDURA_STYLES[molduraEquipada.id] : null

  const xpBarBg = tema?.accent
    ? `linear-gradient(90deg, ${tema.accent}, ${tema.accent}aa)`
    : 'linear-gradient(90deg, var(--color-success), #34D399)'

  return (
    <div style={{ minHeight: '100vh', background: tema?.bg || '#0a0618', display: 'flex', flexDirection: 'column', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── TOPBAR ─────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
        background: tema?.topbar || 'linear-gradient(135deg, #1a0a3e 0%, #0c0520 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        {/* Nav row */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 28px', height: '66px', gap: '8px' }}>

          {/* Logo */}
          <div
            onClick={() => navigate('/home-crianca')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginRight: '20px', flexShrink: 0 }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Brain weight="duotone" size={20} color="white" /></div>
            <div>
              <div style={{ color: 'white', fontWeight: '900', fontSize: '15px', lineHeight: 1.1, fontFamily: "'Baloo 2', sans-serif" }}>NeuralSync</div>
              <div style={{ color: '#a78bfa', fontWeight: '700', fontSize: '10px', letterSpacing: '0.5px' }}>Academy</div>
            </div>
          </div>

          {/* Navigation links */}
          <nav style={{ display: 'flex', gap: '2px', flex: 1 }}>
            {nav.map(item => {
              const isActive = pathname === item.path || (item.path !== '/home-crianca' && pathname.startsWith(item.path))
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="ns-nav-item"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '9px 16px', borderRadius: '10px',
                    border: 'none', cursor: 'pointer',
                    background: isActive ? 'rgba(124,58,237,0.35)' : 'transparent',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                    fontWeight: isActive ? '700' : '500', fontSize: '14px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ fontSize: '17px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      background: 'var(--color-ai)', color: 'white',
                      fontSize: 9, fontWeight: 800, padding: '1px 6px',
                      borderRadius: '999px', letterSpacing: '0.04em',
                    }}>{item.badge}</span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Child info pills */}
          {child && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <div onClick={() => navigate('/coins')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}>
                <CoinVertical weight="duotone" size={20} color="#F59E0B" />
                <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '14px' }}>{child.neural_coins || 0}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.25)', borderRadius: '8px', padding: '6px 12px' }}>
                <Fire weight="duotone" size={20} color="#F97316" className="ns-icon-bounce" />
                <span style={{ color: '#fb923c', fontWeight: '800', fontSize: '14px' }}>{child.streak_atual || 0}</span>
              </div>
              <div
                onClick={() => navigate('/perfil-crianca')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '7px 13px', cursor: 'pointer' }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #7C3AED, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, ...(molduraStyle ? { border: molduraStyle.border, boxShadow: molduraStyle.boxShadow } : {}) }}>
                  {avatar(child.avatar)}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '13px', lineHeight: 1.2 }}>{child.nome}</div>
                  <div style={{ color: '#a78bfa', fontSize: '10px', fontWeight: '600' }}>Nível {child.nivel || 1}</div>
                </div>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '7px 12px', color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap' }}
              >
                ← Pais
              </button>
            </div>
          )}
        </div>

        {/* XP progress bar */}
        {child && (
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)' }}>
            <div style={{ height: '100%', width: xpPercent + '%', background: xpBarBg, transition: 'width 0.6s ease' }} />
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ───────────────────────────────── */}
      <main style={{ flex: 1, width: '100%' }}>
        {children}
      </main>
      <FAQButton tipo="crianca" />
      <FeedbackButton tipo="crianca" />

      {/* ── BOTTOM MENU (mobile only, hidden desktop via CSS) ── */}
      <div className="menu-bottom">
        {nav.map(item => (
          <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
            style={{ color: pathname === item.path ? '#7C3AED' : '#9ca3af' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontWeight: pathname === item.path ? '700' : '500' }}>{item.label}</span>
            {item.badge && (
              <span style={{
                background: 'var(--color-ai)', color: 'white',
                fontSize: 8, fontWeight: 800, padding: '1px 5px',
                borderRadius: '999px', letterSpacing: '0.04em',
                position: 'absolute', top: 4, right: 4,
              }}>{item.badge}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
