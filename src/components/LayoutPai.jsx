import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Brain, List, X } from '@phosphor-icons/react'
import { useAuth } from '../contexts/AuthContext'
import FAQButton from './FAQButton'
import FeedbackButton from './FeedbackButton'
import '../styles/pai.css'

const nav = [
  { icon: '🏠', label: 'Painel',       path: '/dashboard' },
  { icon: '⏱️', label: 'Timer',        path: '/timer' },
  { icon: '📅', label: 'Agenda',       path: '/agenda' },
  { icon: '📊', label: 'Relatórios',   path: '/relatorio' },
  { icon: '🤖', label: 'NeuralAI',     path: '/relatorio-ia' },
  { icon: '🔔', label: 'Notificações', path: '/notificacoes' },
  { icon: '🗓️', label: 'Trilha',       path: '/trilha-pai' },
  { icon: '📚', label: 'Ebook',        path: '/ebook' },
  { icon: '⚙️', label: 'Config',       path: '/configuracoes' },
]

export default function LayoutPai({ children }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const [menuAberto, setMenuAberto] = useState(false)

  function irPara(path) {
    setMenuAberto(false)
    navigate(path)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7ff', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>

      {/* ── TOPBAR ─────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
        background: 'white',
        borderBottom: '1px solid #ede9fe',
        boxShadow: '0 1px 8px rgba(124,58,237,0.06)',
      }}>
        <div className="pai-topbar-row" style={{ display: 'flex', alignItems: 'center', padding: '0 28px', height: '64px', gap: '8px' }}>

          {/* Logo */}
          <div
            onClick={() => irPara('/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginRight: '20px', flexShrink: 0 }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Brain weight="fill" size={20} color="white" /></div>
            <div>
              <div style={{ fontWeight: '900', fontSize: '14px', color: '#0f0a1e', lineHeight: 1.1 }}>NeuralSync</div>
              <div style={{ fontWeight: '600', fontSize: '10px', color: '#7C3AED' }}>Academy</div>
            </div>
          </div>

          {/* Navigation links — desktop */}
          <nav className="pai-nav-desktop" style={{ display: 'flex', gap: '2px', flex: 1 }}>
            {nav.map(item => {
              const isActive = pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => irPara(item.path)}
                  className="pai-nav-item"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '9px 16px', borderRadius: '10px',
                    border: 'none', cursor: 'pointer',
                    background: isActive ? '#f0eeff' : 'transparent',
                    color: isActive ? '#7C3AED' : '#6b7280',
                    fontWeight: isActive ? '800' : '500', fontSize: '14px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ fontSize: '17px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* espaçador — some no mobile, empurra o resto pra ponta no desktop */}
          <div className="pai-topbar-spacer" style={{ flex: 1 }} />

          {/* User info + actions — desktop */}
          <div className="pai-topbar-actions-desktop" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={() => irPara('/home-crianca')}
              className="pai-btn-crianca"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #7C3AED, #5b21b6)', border: 'none', borderRadius: '9px', padding: '8px 14px', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap' }}
            >
              🎮 Área da Criança
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '7px 13px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>👤</div>
              <div style={{ maxWidth: '160px' }}>
                <div style={{ fontSize: '12px', color: '#374151', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
                <div style={{ fontSize: '10px', color: '#9ca3af' }}>Administrador</div>
              </div>
            </div>
            <button
              onClick={signOut}
              style={{ background: 'transparent', border: '1.5px solid #e5e7eb', borderRadius: '9px', padding: '8px 14px', color: '#6b7280', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap' }}
            >
              Sair ↗
            </button>
          </div>

          {/* Hamburger — só mobile */}
          <button
            className="pai-menu-toggle"
            onClick={() => setMenuAberto(v => !v)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', flexShrink: 0, color: '#0f0a1e' }}
          >
            {menuAberto ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>

        {/* ── MENU MOBILE (dropdown) ─────────────────── */}
        {menuAberto && (
          <div className="pai-mobile-menu">
            {nav.map(item => {
              const isActive = pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => irPara(item.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                    padding: '13px 20px', border: 'none', borderBottom: '1px solid #f3f0ff',
                    background: isActive ? '#f0eeff' : 'transparent',
                    color: isActive ? '#7C3AED' : '#374151',
                    fontWeight: isActive ? '800' : '600', fontSize: '15px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'left', cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '19px' }}>{item.icon}</span>
                  {item.label}
                </button>
              )
            })}
            <button
              onClick={() => irPara('/home-crianca')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '13px 20px', border: 'none', borderBottom: '1px solid #f3f0ff', background: 'linear-gradient(135deg, #7C3AED, #5b21b6)', color: 'white', fontWeight: '700', fontSize: '15px', fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'left', cursor: 'pointer' }}
            >
              🎮 Área da Criança
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px', borderBottom: '1px solid #f3f0ff' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>👤</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', color: '#374151', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Administrador</div>
              </div>
            </div>
            <button
              onClick={signOut}
              style={{ width: '100%', padding: '13px 20px', border: 'none', background: 'transparent', color: '#6b7280', fontSize: '15px', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'left', cursor: 'pointer' }}
            >
              Sair ↗
            </button>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ───────────────────────────────── */}
      <main style={{ flex: 1, width: '100%', minWidth: 0 }}>
        {children}
      </main>
      <FAQButton tipo="pai" />
      <FeedbackButton tipo="pai" />
    </div>
  )
}
