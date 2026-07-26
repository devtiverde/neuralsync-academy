import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import LayoutCrianca from '../../components/LayoutCrianca'
import { resolverAvatar } from '../../lib/avatars'
import { MOLDURA_STYLES } from '../../lib/lojaConfig'
import { Brain, CheckCircle, CoinVertical, Medal } from '@phosphor-icons/react'
import '../../styles/crianca.css'

const nomeFaixa = {
  exploradores: 'Exploradores 🔍', construtores: 'Construtores 🔧',
  criadores: 'Criadores 🎨', inventores: 'Inventores 💡',
}

const TIPO_HABILIDADE = {
  quiz: ['Lógica', 'Memória'], quizia: ['Lógica', 'Comunicação'],
  memoria: ['Memória', 'Concentração'], sequencia: ['Problemas', 'Lógica'],
  labirinto: ['Concentração', 'Problemas'], robo: ['Problemas', 'Computacional'],
  padrao: ['Concentração', 'Memória'], inventor: ['Criatividade', 'Comunicação'],
  blocos: ['Computacional', 'Lógica'],
}
const HABILIDADES_BASE = ['Lógica', 'Criatividade', 'Problemas', 'Computacional', 'Concentração', 'Memória', 'Comunicação', 'Emocional']

function calcularHabilidades(historico) {
  const contagem = Object.fromEntries(HABILIDADES_BASE.map(h => [h, 0]))
  historico.forEach(h => {
    ;(TIPO_HABILIDADE[h.tipo] || []).forEach(s => { if (s in contagem) contagem[s]++ })
  })
  const MAX = Math.max(...Object.values(contagem), 1)
  return HABILIDADES_BASE.map(skill => ({
    skill,
    value: contagem[skill] === 0 ? 15 : Math.round(20 + (contagem[skill] / MAX) * 65),
  }))
}

const BADGES = [
  { nome: 'Primeira Missão', icone: '🌟', xp: 0, desc: 'Completar a primeira atividade' },
  { nome: 'Explorador', icone: '🗺️', xp: 100, desc: 'Ganhar 100 XP' },
  { nome: 'Streaker', icone: '🔥', streak: 3, desc: 'Estudar 3 dias seguidos' },
  { nome: 'Cérebro Ativo', icone: '🧠', atividades: 5, desc: 'Completar 5 atividades' },
  { nome: 'Mestre Quiz', icone: '❓', tipo: 'quiz', n: 3, desc: 'Completar 3 quizzes' },
  { nome: 'Inventor', icone: '💡', tipo: 'inventor', n: 1, desc: 'Completar atividade de invenção' },
  { nome: 'Programador', icone: '💻', tipo: 'blocos', n: 2, desc: 'Completar 2 atividades de blocos' },
  { nome: 'Memória Boa', icone: '🃏', tipo: 'memoria', n: 2, desc: 'Completar 2 jogos de memória' },
  { nome: 'Herói do XP', icone: '⭐', xp: 500, desc: 'Ganhar 500 XP total' },
]

function verificarBadge(badge, child, historico) {
  if (badge.xp !== undefined && (child?.xp ?? 0) >= badge.xp) return true
  if (badge.streak && (child?.streak_maximo ?? 0) >= badge.streak) return true
  if (badge.atividades && historico.length >= badge.atividades) return true
  if (badge.tipo) return historico.filter(h => h.tipo === badge.tipo).length >= (badge.n || 1)
  return false
}

function tempoRelativo(ts) {
  if (!ts) return ''
  const diff = Date.now() - ts
  if (diff < 60000) return 'agora'
  if (diff < 3600000) return `há ${Math.floor(diff / 60000)} min`
  if (diff < 86400000) return `há ${Math.floor(diff / 3600000)}h`
  return `há ${Math.floor(diff / 86400000)} dias`
}

// hook de count-up animado
function useCountUp(target, duration = 900, delay = 0) {
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!target || target === 0) { setValue(0); return }
    const timeout = setTimeout(() => {
      const start = performance.now()
      function tick(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) frameRef.current = requestAnimationFrame(tick)
      }
      frameRef.current = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(frameRef.current) }
  }, [target, duration, delay])

  return value
}

// hook para animar a barra de XP do 0 até o valor real
function useXPBar(target, delay = 400) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setPct(target), delay)
    return () => clearTimeout(t)
  }, [target, delay])
  return pct
}

export default function PerfilCrianca() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [habilidades, setHabilidades] = useState(HABILIDADES_BASE.map(skill => ({ skill, value: 15 })))
  const [historico, setHistorico] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const cached = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (cached) {
      setChild(cached)
      supabase.from('ns_historico')
        .select('tipo, xp, coins, titulo, timestamp')
        .eq('child_id', cached.id)
        .order('timestamp', { ascending: false })
        .limit(100)
        .then(({ data }) => {
          const hist = data && data.length > 0
            ? data
            : (() => { try { return JSON.parse(localStorage.getItem('ns_historico') || '[]') } catch { return [] } })()
              .filter(h => !h.child_id || h.child_id === cached.id)
          setHistorico(hist)
          setHabilidades(calcularHabilidades(hist))
        })
    }
    // pequeno delay para acionar animações após mount
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  // hooks DEVEM ficar antes de qualquer early return (regras dos hooks do React)
  const xpTarget = child ? Math.min(((child.xp || 0) / Math.max((child.nivel || 1) * 500, 1)) * 100, 100) : 0
  const xpBarPct = useXPBar(xpTarget)
  const nivelAnim  = useCountUp(child?.nivel || 0,          700,  80)
  const xpAnim     = useCountUp(child?.xp || 0,             900, 160)
  const coinsAnim  = useCountUp(child?.neural_coins || 0,   900, 240)
  const streakAnim = useCountUp(child?.streak_atual || 0,   600, 320)

  if (!child) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f0a1e' }}>
      <div style={{ color: '#a78bfa', fontWeight: '700' }}>Carregando...</div>
    </div>
  )

  const avatar = resolverAvatar(child.avatar)
  const corPerfil = child.cor_perfil || '#7C3AED'
  const tituloEquipado = (() => { try { return JSON.parse(localStorage.getItem(`ns_titulo_${child.id}`) || 'null') } catch { return null } })()
  const molduraEquipada = (() => { try { return JSON.parse(localStorage.getItem(`ns_moldura_${child.id}`) || 'null') } catch { return null } })()
  const molduraStyle = molduraEquipada?.id ? MOLDURA_STYLES[molduraEquipada.id] : null
  const temMoldura = !!molduraStyle && molduraEquipada?.id !== 'mo_basica'

  const badges = BADGES.map(b => ({ ...b, desbloqueado: verificarBadge(b, child, historico) }))
  const badgesDesbloqueados = badges.filter(b => b.desbloqueado).length
  const recente = historico.slice(0, 5)

  const STATS = [
    { label: 'Nível',    value: nivelAnim,  suffix: '',   color: '#a78bfa', bg: 'rgba(124,58,237,0.18)', border: 'rgba(124,58,237,0.32)' },
    { label: 'XP Total', value: xpAnim,     suffix: '',   color: '#fbbf24', bg: 'rgba(251,191,36,0.14)', border: 'rgba(251,191,36,0.28)' },
    { label: 'Coins',    value: coinsAnim,  suffix: ' 💰', color: '#fb923c', bg: 'rgba(251,146,60,0.14)', border: 'rgba(251,146,60,0.28)' },
    { label: 'Streak',   value: streakAnim, suffix: ' 🔥', color: '#34d399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.24)' },
  ]

  return (
    <LayoutCrianca child={child}>
      <div style={{ minHeight: '100vh' }}>

        {/* ── HERO HEADER ── */}
        <div style={{
          background: `linear-gradient(135deg, ${corPerfil}50 0%, rgba(124,58,237,0.28) 55%, rgba(15,10,30,0.95) 100%)`,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '36px 32px 28px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* orb de fundo */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '280px', height: '280px', borderRadius: '50%',
            background: `radial-gradient(circle, ${corPerfil}28, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div className="ns-perfil-hero" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap', position: 'relative' }}>

            {/* ── AVATAR COM MOLDURA DESTACADA ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {/* anel animado para molduras especiais */}
              <div style={{ position: 'relative' }}>
                {temMoldura && (
                  <div style={{
                    position: 'absolute', inset: '-6px', borderRadius: '30px',
                    border: `2px solid ${corPerfil}50`,
                    animation: 'ns-ring-pulse 2.4s ease-in-out infinite',
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{
                  width: '100px', height: '100px', borderRadius: '28px',
                  background: `linear-gradient(135deg, ${corPerfil}, ${corPerfil}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '50px', flexShrink: 0,
                  boxShadow: molduraStyle?.boxShadow
                    ? `${molduraStyle.boxShadow}, 0 0 0 3px rgba(255,255,255,0.08)`
                    : `0 8px 40px ${corPerfil}55, 0 0 0 2px ${corPerfil}40`,
                  border: molduraStyle?.border || `2px solid ${corPerfil}60`,
                  transition: 'box-shadow 0.3s',
                }}>
                  {avatar}
                </div>
              </div>

              {/* badge da moldura */}
              {molduraEquipada?.id && molduraEquipada.id !== 'mo_basica' && (
                <div style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '20px', padding: '3px 10px',
                  fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.6)',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  <span>{molduraEquipada.emoji || '🖼️'}</span>
                  <span>{molduraEquipada.nome}</span>
                </div>
              )}
            </div>

            {/* Nome, título e faixa */}
            <div style={{ flex: 1, minWidth: '180px' }}>
              <h2 style={{
                color: 'white', fontSize: '28px', fontWeight: '900',
                fontFamily: 'var(--ns-font-display, Fredoka One, cursive)',
                marginBottom: '4px', letterSpacing: '0.3px', lineHeight: 1.1,
              }}>
                {child.nome}
              </h2>
              {tituloEquipado && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)',
                  borderRadius: '99px', padding: '4px 12px',
                  fontSize: '12px', fontWeight: '700', color: '#fbbf24',
                  marginBottom: '8px',
                }}>
                  <span>{tituloEquipado.emoji}</span>
                  <span>{tituloEquipado.nome}</span>
                </div>
              )}
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: '600', marginTop: tituloEquipado ? 0 : '6px' }}>
                {nomeFaixa[child.faixa_etaria] || '🔧 Construtores'}
              </div>
              {child.bio && (
                <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', fontStyle: 'italic', marginTop: '6px' }}>"{child.bio}"</div>
              )}
            </div>

            {/* Stats pills animadas */}
            <div className="ns-perfil-stats" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexShrink: 0 }}>
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    background: s.bg, border: `1px solid ${s.border}`,
                    borderRadius: '16px', padding: '12px 20px', textAlign: 'center', minWidth: '82px',
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`,
                  }}
                >
                  <div style={{
                    color: s.color, fontWeight: '900', fontSize: '22px', lineHeight: 1,
                    fontFamily: 'var(--ns-font-ui, Space Grotesk, sans-serif)',
                  }}>
                    {s.value}{s.suffix}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '10px', fontWeight: '700', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* XP bar animada */}
          <div style={{ maxWidth: '1000px', margin: '22px auto 0', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', fontWeight: '600' }}>XP para o próximo nível</span>
              <span style={{ fontSize: '11px', color: corPerfil, fontWeight: '800', fontFamily: 'var(--ns-font-ui, Space Grotesk, sans-serif)' }}>
                {child.xp || 0} / {(child.nivel || 1) * 500}
              </span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '99px', height: '7px', overflow: 'hidden' }}>
              <div style={{
                background: `linear-gradient(90deg, ${corPerfil}, ${corPerfil}aa)`,
                width: xpBarPct + '%', height: '100%', borderRadius: '99px',
                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 0 8px ${corPerfil}70`,
              }} />
            </div>
          </div>
        </div>

        {/* ── CONTEÚDO ── */}
        <div style={{ padding: '28px 32px' }}>
          {/* A coluna de 300px é fixa e não cabe no celular — vira uma coluna só
              abaixo de 767px pela regra `.ns-perfil-colunas` em crianca.css.
              Sem isso, "Conquistas" e os botões de Personalizar/Ver Carteira
              ficavam 121px fora da tela, sem rolagem pra alcançar. */}
          <div className="ns-perfil-colunas" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>

            {/* ── COLUNA ESQUERDA ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Radar */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '22px' }}>
                <div style={{ fontWeight: '800', fontSize: '15px', color: 'white', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 6 }}><Brain weight="duotone" size={20} color="#7C3AED" /> Habilidades Cognitivas</div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '16px' }}>
                  {historico.length === 0 ? 'Complete atividades para ver seu radar!' : `Baseado em ${historico.length} atividade${historico.length > 1 ? 's' : ''}`}
                </p>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={habilidades}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }} />
                    <Radar dataKey="value" stroke={corPerfil} fill={corPerfil} fillOpacity={0.18} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Histórico */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '22px' }}>
                <div style={{ fontWeight: '800', fontSize: '15px', color: 'white', marginBottom: '16px' }}>📋 Atividades Recentes</div>
                {recente.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px', color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Nenhuma atividade ainda</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {recente.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '11px 14px', background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateX(0)' : 'translateX(-12px)',
                        transition: `opacity 0.35s ease ${200 + i * 60}ms, transform 0.35s ease ${200 + i * 60}ms`,
                      }}>
                        <CheckCircle weight="duotone" size={20} color="#10B981" />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: '600', fontSize: '13px', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.titulo || 'Atividade concluída'}</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{tempoRelativo(item.timestamp)}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                          {item.xp > 0 && <span style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '700', fontFamily: 'var(--ns-font-ui, Space Grotesk, sans-serif)' }}>+{item.xp} XP</span>}
                          {item.coins > 0 && <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '700', display: 'flex', alignItems: 'center', gap: 2 }}>+{item.coins} <CoinVertical weight="duotone" size={16} color="#F59E0B" /></span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── COLUNA DIREITA ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Conquistas */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: 'white', display: 'flex', alignItems: 'center', gap: 6 }}><Medal weight="duotone" size={20} color="#F59E0B" className="ns-icon-bounce" /> Conquistas</div>
                  <div style={{
                    background: badgesDesbloqueados > 0 ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${badgesDesbloqueados > 0 ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '99px', padding: '3px 12px',
                    fontSize: '12px', color: badgesDesbloqueados > 0 ? '#fbbf24' : 'rgba(255,255,255,0.4)', fontWeight: '700',
                  }}>
                    {badgesDesbloqueados}/{badges.length}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '7px' }}>
                  {badges.map((badge, i) => (
                    <div
                      key={badge.nome}
                      title={badge.desc}
                      style={{
                        background: badge.desbloqueado
                          ? 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))'
                          : 'rgba(255,255,255,0.03)',
                        borderRadius: '14px', padding: '12px 6px', textAlign: 'center',
                        border: badge.desbloqueado ? '1px solid rgba(251,191,36,0.35)' : '1px solid rgba(255,255,255,0.07)',
                        opacity: mounted ? (badge.desbloqueado ? 1 : 0.4) : 0,
                        transform: mounted ? 'scale(1)' : 'scale(0.85)',
                        transition: `opacity 0.35s ease ${300 + i * 40}ms, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${300 + i * 40}ms`,
                        cursor: 'default',
                        boxShadow: badge.desbloqueado ? '0 2px 10px rgba(251,191,36,0.18)' : 'none',
                      }}
                    >
                      <div style={{ fontSize: '22px', marginBottom: '5px' }}>{badge.desbloqueado ? badge.icone : '🔒'}</div>
                      <div style={{ fontSize: '9px', color: badge.desbloqueado ? '#fbbf24' : 'rgba(255,255,255,0.28)', fontWeight: '700', lineHeight: 1.3 }}>{badge.nome}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ações rápidas */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontWeight: '800', fontSize: '15px', color: 'white', marginBottom: '4px' }}>⚡ Ações</div>

                <button onClick={() => navigate('/personalizar')} style={{
                  width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
                  background: `linear-gradient(135deg, ${corPerfil}, ${corPerfil}bb)`,
                  color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: `0 4px 14px ${corPerfil}40`, textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{ fontSize: '18px' }}>✨</span> Personalizar Perfil
                </button>

                <button onClick={() => navigate('/coins')} style={{
                  width: '100%', padding: '13px', borderRadius: '12px',
                  border: '1px solid rgba(251,191,36,0.25)',
                  background: 'rgba(251,191,36,0.08)',
                  color: '#fbbf24', fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <CoinVertical weight="duotone" size={18} color="#F59E0B" /> Ver Carteira
                </button>

                <button onClick={() => navigate('/loja')} style={{
                  width: '100%', padding: '13px', borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.6)', fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{ fontSize: '18px' }}>🏪</span> Ir para Loja
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutCrianca>
  )
}
