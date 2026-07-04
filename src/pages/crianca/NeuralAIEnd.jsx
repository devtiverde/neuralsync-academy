import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { NEURALAI_CONFIG } from '../../config/neuralai'
import '../../styles/crianca.css'

// ── Confetti ─────────────────────────────────────────────────────────
const CONFETTI_COLORS = ['#06B6D4','#7C3AED','#a78bfa','#F59E0B','#10B981','#F97316','#3b82f6']

function Confetti() {
  const pieces = Array.from({ length: 36 }, (_, i) => ({
    left:   Math.random() * 100,
    delay:  Math.random() * 2,
    dur:    2.2 + Math.random() * 2,
    color:  CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size:   5 + Math.random() * 9,
    rotate: Math.random() * 360,
    shape:  i % 3 === 0 ? '50%' : '2px',  // alternates between circles and squares
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', top: '-12px',
          left: p.left + '%',
          width: p.size, height: p.size,
          borderRadius: p.shape,
          background: p.color,
          opacity: 0.85,
          animation: `neuralai-confetti ${p.dur}s ${p.delay}s linear infinite`,
          transform: `rotate(${p.rotate}deg)`,
        }} />
      ))}
      <style>{`
        @keyframes neuralai-confetti {
          0%   { transform: translateY(-12px) rotate(0deg);    opacity: 0.9; }
          100% { transform: translateY(110vh) rotate(720deg);  opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ── Countdown até próxima sessão ─────────────────────────────────────
function ProximaSessao({ startedAt }) {
  const calcSecs = () => {
    const availableAt = startedAt + NEURALAI_CONFIG.cooldownMinutes * 60 * 1000
    return Math.max(0, Math.floor((availableAt - Date.now()) / 1000))
  }
  const [secs, setSecs] = useState(calcSecs)

  useEffect(() => {
    if (secs <= 0) return
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [secs])

  const m = Math.floor(secs / 60)
  const s = secs % 60

  if (secs <= 0) {
    return (
      <div style={{ color: 'var(--color-success)', fontWeight: 700, fontSize: 14 }}>
        ✅ Próxima sessão disponível agora!
      </div>
    )
  }

  return (
    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
      Próxima sessão em{' '}
      <span style={{ color: 'var(--color-ai)', fontWeight: 700 }}>
        {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </span>
    </div>
  )
}

// ── Badge de engajamento ─────────────────────────────────────────────
const ENGAGEMENT_LABEL = { alto: '🔥 Alto', medio: '⚡ Médio', baixo: '💤 Baixo' }
const ENGAGEMENT_COLOR = { alto: 'var(--color-success)', medio: 'var(--color-reward)', baixo: 'var(--color-text-muted)' }

// ── Página principal ─────────────────────────────────────────────────
export default function NeuralAIEnd() {
  const navigate      = useNavigate()
  const { state }     = useLocation()
  const { summary, child } = state || {}
  const sessionStartRef = useRef(Date.now())

  // Redireciona se não tiver dados de sessão
  useEffect(() => {
    if (!summary) navigate('/neural-ai')
  }, [])

  if (!summary) return null

  const {
    durationMinutes = 0,
    messageCount    = 0,
    themes          = [],
    highlight       = null,
    challenge       = null,
    engagement      = null,
  } = summary

  const temaPrincipal = themes[0] ?? null

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(160deg, #0f0a1e 0%, #1a0a3e 50%, #0c0520 100%)',
      overflowY: 'auto',
      fontFamily: 'var(--font-sans)',
      zIndex: 10,
    }}>
      <Confetti />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 520, margin: '0 auto',
        padding: '48px 24px 80px',
        display: 'flex', flexDirection: 'column', gap: 24,
        minHeight: '100vh', justifyContent: 'center',
      }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 16, animation: 'ns-bounce 1.5s ease-in-out 3' }}>🤖</div>
          <h1 style={{
            color: 'white', fontSize: 'var(--text-2xl)', fontWeight: 900,
            fontFamily: "'Baloo 2', sans-serif", marginBottom: 8, lineHeight: 1.2,
          }}>
            Sessão concluída!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'var(--text-sm)' }}>
            {child?.nome ? `Parabéns, ${child.nome}!` : 'Parabéns!'} Você explorou muito hoje. 🚀
          </p>
        </div>

        {/* ── Estatísticas da sessão ─────────────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        }}>
          {[
            { label: 'Duração',    value: `${durationMinutes} min`, icon: '⏱' },
            { label: 'Mensagens',  value: Math.floor(messageCount / 2), icon: '💬' },
            { label: 'Engajamento', value: ENGAGEMENT_LABEL[engagement] ?? '—', icon: null },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 12px', textAlign: 'center',
            }}>
              {stat.icon && <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.icon}</div>}
              <div style={{
                color: stat.label === 'Engajamento' && engagement
                  ? ENGAGEMENT_COLOR[engagement]
                  : 'white',
                fontWeight: 800, fontSize: 'var(--text-base)', marginBottom: 4,
              }}>
                {stat.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em' }}>
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* ── Temas abordados ────────────────────────────────────── */}
        {themes.length > 0 && (
          <div style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
          }}>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 10 }}>
              TEMAS EXPLORADOS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {themes.map((t, i) => (
                <span key={i} style={{
                  background: 'rgba(124,58,237,0.2)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#c4b5fd',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 14px',
                  fontSize: 13, fontWeight: 600,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Destaque da conversa ───────────────────────────────── */}
        {highlight && (
          <div style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
          }}>
            <div style={{ color: 'var(--color-ai)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>
              ✨ MOMENTO DESTAQUE
            </div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>
              {highlight}
            </p>
          </div>
        )}

        {/* ── Desafio para pensar ────────────────────────────────── */}
        {challenge && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(249,115,22,0.1) 100%)',
            border: '1.5px solid rgba(245,158,11,0.35)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 24px',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
            }}>
              <span style={{ fontSize: 22 }}>🧩</span>
              <span style={{ color: 'var(--color-reward)', fontWeight: 800, fontSize: 'var(--text-base)' }}>
                Desafio para pensar
              </span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.85)', fontSize: 'var(--text-sm)',
              lineHeight: 1.7, margin: 0, fontStyle: 'italic',
            }}>
              "{challenge}"
            </p>
          </div>
        )}

        {/* ── CTAs ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => navigate('/relatorio-ia')}
            style={{
              background: 'linear-gradient(135deg, var(--color-ai) 0%, var(--color-primary) 100%)',
              color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
              padding: '15px 28px', fontWeight: 800, fontSize: 'var(--text-base)',
              cursor: 'pointer', width: '100%',
              boxShadow: '0 4px 20px rgba(6,182,212,0.35)',
            }}
          >
            Ver no relatório dos pais
          </button>

          <button
            onClick={() => navigate('/home-crianca')}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.6)',
              borderRadius: 'var(--radius-full)',
              padding: '13px 28px', fontWeight: 700, fontSize: 'var(--text-sm)',
              cursor: 'pointer', width: '100%',
            }}
          >
            Voltar ao início
          </button>
        </div>

        {/* ── Cooldown próxima sessão ─────────────────────────────── */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <ProximaSessao startedAt={sessionStartRef.current} />
        </div>

      </div>
    </div>
  )
}
