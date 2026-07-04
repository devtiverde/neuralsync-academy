import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { RocketLaunch } from '@phosphor-icons/react'

const PLANO_LABEL = { starter: 'Starter', familia: 'Família', premium: 'Premium' }

export default function UpgradePremium({ feature = 'este recurso', emoji = '🚀', descricao, onVoltar }) {
  const navigate = useNavigate()
  const { subscription } = useAuth()
  const planoAtual = subscription?.plano ? PLANO_LABEL[subscription.plano] ?? subscription.plano : null

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(160deg, #0a0618 0%, #0f0a2e 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px', textAlign: 'center', gap: 24,
      fontFamily: 'var(--font-sans)',
      zIndex: 10,
    }}>
      <div style={{ fontSize: 72, lineHeight: 1 }}>{emoji}</div>

      <span style={{
        background: 'linear-gradient(135deg, #F97316, #ea6500)',
        color: 'white', fontSize: 11, fontWeight: 800,
        padding: '5px 14px', borderRadius: 'var(--radius-full)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
      }}>
        <RocketLaunch weight="duotone" size={16} color="white" /> Exclusivo Plano Premium
      </span>

      <div style={{ maxWidth: 360 }}>
        <h2 style={{
          color: 'white', fontSize: 26, fontWeight: 900,
          fontFamily: "'Baloo 2', sans-serif",
          marginBottom: 10, lineHeight: 1.2,
        }}>
          {feature}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.65 }}>
          {descricao || 'Este recurso usa Inteligência Artificial e está disponível exclusivamente no Plano Premium.'}
        </p>
      </div>

      {planoAtual && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12, padding: '10px 20px',
          color: 'rgba(255,255,255,0.4)', fontSize: 13,
        }}>
          Plano atual: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{planoAtual}</strong>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320 }}>
        <button
          onClick={() => navigate('/planos')}
          style={{
            background: 'linear-gradient(135deg, #F97316 0%, #ea6500 100%)',
            color: 'white', border: 'none',
            borderRadius: 'var(--radius-full)', padding: '15px 32px',
            fontWeight: 800, fontSize: 16, cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            boxShadow: '0 8px 24px rgba(249,115,22,0.45)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(249,115,22,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.45)' }}
        >
          Ver planos e fazer upgrade ✨
        </button>

        {onVoltar && (
          <button
            onClick={onVoltar}
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-full)', padding: '12px 32px',
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            ← Voltar
          </button>
        )}
      </div>
    </div>
  )
}
