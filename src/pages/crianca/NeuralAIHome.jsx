import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutCrianca from '../../components/LayoutCrianca'
import UpgradePremium from '../../components/UpgradePremium'
import { NEURALAI_CONFIG, NEURALAI_TEMAS_SUGERIDOS } from '../../config/neuralai'
import '../../styles/crianca.css'

// ── Tela de estado bloqueado ────────────────────────────────────────
function EstadoBloqueado({ emoji, titulo, descricao, children }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: 20, padding: '0 24px',
    }}>
      <div style={{ fontSize: 64 }}>{emoji}</div>
      <h2 style={{
        color: 'white', fontSize: 'var(--text-xl)', fontWeight: 800,
        fontFamily: "'Baloo 2', sans-serif",
      }}>
        {titulo}
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-base)', maxWidth: 360, lineHeight: 1.6 }}>
        {descricao}
      </p>
      {children}
    </div>
  )
}

// ── Countdown de cooldown ao vivo ───────────────────────────────────
function CooldownTimer({ endedAt }) {
  const calcRemaining = () => {
    const availableAt = new Date(new Date(endedAt).getTime() + NEURALAI_CONFIG.cooldownMinutes * 60 * 1000)
    return Math.max(0, Math.floor((availableAt - Date.now()) / 1000))
  }

  const [secs, setSecs] = useState(calcRemaining)

  useEffect(() => {
    if (secs <= 0) return
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [secs])

  const m = Math.floor(secs / 60)
  const s = secs % 60
  const display = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`

  return (
    <div style={{
      background: 'rgba(6,182,212,0.12)', border: '1.5px solid var(--color-ai)',
      borderRadius: 'var(--radius-xl)', padding: '20px 32px', textAlign: 'center',
    }}>
      <div style={{ color: 'var(--color-ai)', fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 8 }}>
        PRÓXIMA SESSÃO EM
      </div>
      <div style={{ color: 'white', fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '0.06em' }}>
        {display}
      </div>
    </div>
  )
}

// ── Card de tema ────────────────────────────────────────────────────
const CARD_GRADIENTS = [
  'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)',
  'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
  'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
  'linear-gradient(135deg, #065f46 0%, #059669 100%)',
]

function TemaCard({ tema, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => onClick(tema)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: CARD_GRADIENTS[index % CARD_GRADIENTS.length],
        border: 'none',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 20px',
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hovered
          ? '0 12px 36px rgba(0,0,0,0.4)'
          : '0 4px 16px rgba(0,0,0,0.25)',
      }}
    >
      <span style={{ fontSize: 44 }}>{tema.emoji}</span>
      <span style={{
        color: 'white', fontWeight: 800, fontSize: 'var(--text-base)',
        fontFamily: "'Baloo 2', sans-serif", lineHeight: 1.3,
      }}>
        {tema.titulo}
      </span>
    </button>
  )
}

// ── Seletor de duração ──────────────────────────────────────────────
function DurationSelector({ value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
        Duração da sessão:
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        {NEURALAI_CONFIG.sessionDurations.map(d => (
          <button
            key={d}
            onClick={() => onChange(d)}
            style={{
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              border: `1.5px solid ${value === d ? 'var(--color-ai)' : 'rgba(255,255,255,0.15)'}`,
              background: value === d ? 'rgba(6,182,212,0.18)' : 'transparent',
              color: value === d ? 'var(--color-ai)' : 'rgba(255,255,255,0.5)',
              fontWeight: 700,
              fontSize: 'var(--text-sm)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {d} min
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Página principal ────────────────────────────────────────────────
export default function NeuralAIHome() {
  const navigate = useNavigate()
  const { user, subscription } = useAuth()

  const [child, setChild]               = useState(null)
  const [loading, setLoading]           = useState(true)
  const [weeklyCount, setWeeklyCount]   = useState(0)
  const [maxSessoes, setMaxSessoes]     = useState(NEURALAI_CONFIG.maxSessionsPerWeek)
  const [lastEndedAt, setLastEndedAt]   = useState(null)
  const [cooldownAtivo, setCooldownAtivo] = useState(false)
  const [duration, setDuration]         = useState(NEURALAI_CONFIG.sessionDurations[0])

  useEffect(() => {
    async function init() {
      // Filho ativo do localStorage
      const stored = (() => {
        try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null }
      })()
      if (!stored) { navigate('/home-crianca'); return }
      setChild(stored)

      // Config do pai (neuralai_config) + sessões da semana
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('neuralai_config')
          .eq('id', user.id)
          .single()

        const config = userData?.neuralai_config ?? {}
        if (config.duracao) setDuration(config.duracao)
        if (config.max_sessoes_semana) setMaxSessoes(config.max_sessoes_semana)

        // Última sessão encerrada (para cooldown)
        const { data: last } = await supabase
          .from('neuralai_sessions')
          .select('ended_at')
          .eq('child_id', stored.id)
          .not('ended_at', 'is', null)
          .order('ended_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (last?.ended_at) {
          setLastEndedAt(last.ended_at)
          const diffMin = (Date.now() - new Date(last.ended_at).getTime()) / 60000
          if (diffMin < NEURALAI_CONFIG.cooldownMinutes) setCooldownAtivo(true)
        }

        // Sessões nesta semana
        const semanaAtras = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        const { count } = await supabase
          .from('neuralai_sessions')
          .select('id', { count: 'exact', head: true })
          .eq('child_id', stored.id)
          .gte('started_at', semanaAtras)

        setWeeklyCount(count ?? 0)
      }

      setLoading(false)
    }
    init()
  }, [user])

  // Navega para o chat com o tema selecionado
  function handleTema(tema) {
    navigate('/neural-ai/chat', { state: { tema, child, durationMinutes: duration } })
  }

  // ── Loading ───────────────────────────────────────────────────────
  if (loading || !child) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0618' }}>
        <div style={{ color: 'var(--color-ai)', fontWeight: 700, fontSize: 16 }}>Carregando...</div>
      </div>
    )
  }

  // ── Faixa etária incorreta ────────────────────────────────────────
  if (child.faixa_etaria !== 'inventores') {
    return (
      <LayoutCrianca child={child}>
        <div style={{ padding: '28px 32px', background: '#0a0618', minHeight: '100vh' }}>
          <EstadoBloqueado
            emoji="🔒"
            titulo="Disponível para Inventores"
            descricao="A NeuralAI é exclusiva para a faixa Inventores (12+ anos). Continue evoluindo e em breve você terá acesso!"
          />
        </div>
      </LayoutCrianca>
    )
  }

  // ── Plano insuficiente ────────────────────────────────────────────
  const planoOk = subscription?.plano === 'premium' && subscription?.plano_status === 'ativo'

  if (!planoOk) {
    return <UpgradePremium
      feature="NeuralAI — Chat de IA para Inventores"
      emoji="🤖"
      descricao="Converse com uma IA criada especialmente para crianças — explore ciência, tecnologia e lógica. Exclusivo no Plano Premium."
      onVoltar={() => navigate('/home-crianca')}
    />
  }

  // ── Limite semanal atingido ───────────────────────────────────────
  const limiteSemanal = weeklyCount >= maxSessoes

  return (
    <LayoutCrianca child={child}>
      <div style={{ padding: '28px 32px', background: '#0a0618', minHeight: '100vh' }}>

        {/* ── Header ────────────────────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--color-ai) 0%, var(--color-primary) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              boxShadow: '0 4px 16px rgba(6,182,212,0.35)',
            }}>
              🤖
            </div>
            <div>
              <h1 style={{
                color: 'white', fontSize: 'var(--text-2xl)', fontWeight: 900,
                fontFamily: "'Baloo 2', sans-serif", lineHeight: 1.1,
              }}>
                NeuralAI
              </h1>
              <span style={{
                background: 'var(--color-ai)', color: 'white',
                fontSize: 11, fontWeight: 800, padding: '2px 10px',
                borderRadius: 'var(--radius-full)', letterSpacing: '0.06em',
              }}>
                IA
              </span>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'var(--text-sm)', maxWidth: 480, lineHeight: 1.6 }}>
            Explore ideias, faça perguntas e pense junto com uma IA criada especialmente para inventores como você.
          </p>
        </div>

        {/* ── Cooldown ativa ────────────────────────────────────── */}
        {cooldownAtivo && (
          <div style={{ marginBottom: 32, maxWidth: 380 }}>
            <EstadoBloqueado
              emoji="⏳"
              titulo="Descansando..."
              descricao="Aguarde o cooldown antes de iniciar uma nova sessão. Esse tempo é importante para fixar o que você aprendeu!"
            >
              {lastEndedAt && <CooldownTimer endedAt={lastEndedAt} />}
            </EstadoBloqueado>
          </div>
        )}

        {/* ── Limite semanal ────────────────────────────────────── */}
        {!cooldownAtivo && limiteSemanal && (
          <EstadoBloqueado
            emoji="📅"
            titulo="Limite semanal atingido"
            descricao={`Você já fez ${maxSessoes} sessões esta semana. Volte na semana que vem para continuar explorando!`}
          />
        )}

        {/* ── Conteúdo principal ────────────────────────────────── */}
        {!cooldownAtivo && !limiteSemanal && (
          <>
            <div style={{ marginBottom: 10 }}>
              <h2 style={{
                color: 'white', fontSize: 'var(--text-lg)', fontWeight: 800,
                fontFamily: "'Baloo 2', sans-serif", marginBottom: 6,
              }}>
                Escolha um tema para explorar
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'var(--text-sm)' }}>
                Clique em um card para começar. A NeuralAI vai guiar você!
              </p>
            </div>

            {/* Cards de temas — grade 2×2 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
              marginBottom: 32,
              maxWidth: 560,
            }}>
              {NEURALAI_TEMAS_SUGERIDOS.map((tema, i) => (
                <TemaCard key={tema.id} tema={tema} index={i} onClick={handleTema} />
              ))}
            </div>

            {/* Seletor de duração + contagem semanal */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 14,
              padding: '20px 24px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: 560,
            }}>
              <DurationSelector value={duration} onChange={setDuration} />

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'var(--text-sm)' }}>
                  Sessões esta semana
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {Array.from({ length: maxSessoes }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 12, height: 12, borderRadius: '50%',
                        background: i < weeklyCount
                          ? 'var(--color-ai)'
                          : 'rgba(255,255,255,0.12)',
                        transition: 'background 0.2s',
                      }}
                    />
                  ))}
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'var(--text-xs)', marginLeft: 4 }}>
                    {weeklyCount}/{maxSessoes}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </LayoutCrianca>
  )
}
