import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutPai from '../../components/LayoutPai'
import '../../styles/pai.css'

const ENGAGEMENT_LABEL = { alto: 'Alto', medio: 'Médio', baixo: 'Baixo' }
const ENGAGEMENT_COLORS = { alto: '#10B981', medio: '#F59E0B', baixo: '#9ca3af' }

const ENGAGEMENT_CONFIG = {
  alto:  { label: 'Alto',  color: '#10B981', bg: '#f0fdf4', icon: '🔥' },
  medio: { label: 'Médio', color: '#F59E0B', bg: '#fffbeb', icon: '⚡' },
  baixo: { label: 'Baixo', color: '#9ca3af', bg: '#f9fafb', icon: '💤' },
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatTime(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px', color: '#6b7280' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🤖</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
        Nenhuma sessão ainda
      </h3>
      <p style={{ fontSize: 14, maxWidth: 360, margin: '0 auto', lineHeight: 1.6 }}>
        Quando seu filho usar a NeuralAI, as sessões aparecerão aqui com um resumo completo da conversa.
      </p>
    </div>
  )
}

function SessionCard({ session }) {
  const [expanded, setExpanded] = useState(false)
  const eng = session.engagement ? ENGAGEMENT_CONFIG[session.engagement] : null

  return (
    <div style={{
      background: 'white',
      border: '1.5px solid #ede9fe',
      borderRadius: 16,
      overflow: 'hidden',
      transition: 'box-shadow 0.2s',
    }}>
      {/* Header clicável */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 16,
          padding: '16px 20px', background: 'none', border: 'none',
          cursor: 'pointer', textAlign: 'left',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}
      >
        {/* Ícone */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>🤖</div>

        {/* Info principal */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: '#1e1b4b' }}>
              Sessão NeuralAI
            </span>
            {eng && (
              <span style={{
                background: eng.bg, color: eng.color,
                fontSize: 11, fontWeight: 700, padding: '2px 10px',
                borderRadius: 9999, border: `1px solid ${eng.color}30`,
              }}>
                {eng.icon} {eng.label}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>
              📅 {formatDate(session.started_at)} às {formatTime(session.started_at)}
            </span>
            {session.duration_minutes && (
              <span style={{ fontSize: 12, color: '#9ca3af' }}>⏱ {session.duration_minutes} min</span>
            )}
            {session.message_count > 0 && (
              <span style={{ fontSize: 12, color: '#9ca3af' }}>💬 {Math.floor(session.message_count / 2)} trocas</span>
            )}
          </div>
        </div>

        {/* Temas (máx 2) */}
        {session.themes?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {session.themes.slice(0, 2).map((t, i) => (
              <span key={i} style={{
                background: '#f0eeff', color: '#7C3AED',
                fontSize: 11, fontWeight: 600, padding: '3px 10px',
                borderRadius: 9999,
              }}>{t}</span>
            ))}
            {session.themes.length > 2 && (
              <span style={{ fontSize: 11, color: '#9ca3af' }}>+{session.themes.length - 2}</span>
            )}
          </div>
        )}

        <span style={{ fontSize: 18, color: '#9ca3af', flexShrink: 0 }}>
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Expandido — detalhes */}
      {expanded && (
        <div style={{
          borderTop: '1px solid #ede9fe',
          padding: '20px 20px 20px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {/* Todos os temas */}
          {session.themes?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 8 }}>
                TEMAS ABORDADOS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {session.themes.map((t, i) => (
                  <span key={i} style={{
                    background: '#f0eeff', color: '#7C3AED',
                    fontSize: 12, fontWeight: 600, padding: '4px 14px',
                    borderRadius: 9999,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Destaque */}
          {session.highlight && (
            <div style={{
              background: '#f0fdff', border: '1.5px solid #a5f3fc',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#06B6D4', letterSpacing: '0.06em', marginBottom: 6 }}>
                ✨ MOMENTO DESTAQUE
              </div>
              <p style={{ fontSize: 14, color: '#1e1b4b', lineHeight: 1.6, margin: 0 }}>
                {session.highlight}
              </p>
            </div>
          )}

          {/* Desafio */}
          {session.challenge && (
            <div style={{
              background: '#fffbeb', border: '1.5px solid #fde68a',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', letterSpacing: '0.06em', marginBottom: 6 }}>
                🧩 DESAFIO PROPOSTO
              </div>
              <p style={{ fontSize: 14, color: '#1e1b4b', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                "{session.challenge}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function RelatorioIA() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [children, setChildren]   = useState([])
  const [sessions, setSessions]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [selectedChild, setSelectedChild] = useState('todos')
  const [analysis, setAnalysis]   = useState({})   // { [child_id]: result }
  const [analyzing, setAnalyzing] = useState(null) // child_id sendo analisado

  useEffect(() => {
    if (!user) return

    async function load() {
      const [{ data: kids }, { data: sess }] = await Promise.all([
        supabase
          .from('children')
          .select('id, nome, faixa_etaria')
          .eq('parent_id', user.id)
          .order('nome'),
        supabase
          .from('neuralai_sessions')
          .select('id, child_id, started_at, ended_at, duration_minutes, themes, highlight, challenge, engagement, message_count')
          .eq('parent_id', user.id)
          .not('ended_at', 'is', null)
          .order('started_at', { ascending: false })
          .limit(100),
      ])

      setChildren(kids ?? [])
      setSessions(sess ?? [])
      setLoading(false)
    }

    load()
  }, [user])

  const filteredSessions = selectedChild === 'todos'
    ? sessions
    : sessions.filter(s => s.child_id === selectedChild)

  const childMap = Object.fromEntries((children ?? []).map(c => [c.id, c]))

  const inventores = children.filter(c => c.faixa_etaria === 'inventores')

  async function gerarAnalise(childId) {
    const child = childMap[childId]
    if (!child) return
    const childSessions = sessions.filter(s => s.child_id === childId)
    if (childSessions.length === 0) return

    setAnalyzing(childId)
    try {
      const { data: { session: authSession } } = await supabase.auth.getSession()
      const token = authSession?.access_token
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-proxy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            action: 'relatorio',
            child_name: child.nome,
            faixa: child.faixa_etaria,
            sessions: childSessions.map(s => ({
              themes: s.themes,
              highlight: s.highlight,
              challenge: s.challenge,
              engagement: s.engagement,
              duration_minutes: s.duration_minutes,
              message_count: s.message_count,
            })),
          }),
        }
      )
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Erro ${res.status}`)
      }
      const data = await res.json()
      setAnalysis(prev => ({ ...prev, [childId]: data }))
    } catch (e) {
      alert('Erro ao gerar análise: ' + e.message)
    } finally {
      setAnalyzing(null)
    }
  }

  return (
    <LayoutPai>
      <div className="pai-content" style={{ padding: '36px 32px', maxWidth: 860 }}>

        {/* ── Header ────────────────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              boxShadow: '0 4px 16px rgba(6,182,212,0.25)',
            }}>🤖</div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1e1b4b', lineHeight: 1.1, margin: 0 }}>
                Relatório NeuralAI
              </h1>
              <p style={{ fontSize: 14, color: '#9ca3af', margin: '4px 0 0' }}>
                Histórico das sessões de IA dos seus filhos
              </p>
            </div>
          </div>

          {/* Aviso se nenhum filho é Inventor */}
          {!loading && inventores.length === 0 && (
            <div style={{
              background: '#faf5ff', border: '1.5px solid #ddd6fe',
              borderRadius: 12, padding: '14px 18px',
              display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16,
            }}>
              <span style={{ fontSize: 20 }}>ℹ️</span>
              <p style={{ fontSize: 14, color: '#7C3AED', lineHeight: 1.6, margin: 0 }}>
                A NeuralAI está disponível apenas para crianças na faixa <strong>Inventores (12+ anos)</strong>. Nenhum dos seus filhos atingiu essa faixa ainda.
              </p>
            </div>
          )}
        </div>

        {/* ── Resumo rápido ─────────────────────────────────── */}
        {!loading && sessions.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32,
          }}>
            {[
              { label: 'Total de sessões', value: sessions.length, icon: '🤖' },
              { label: 'Minutos de IA',    value: sessions.reduce((acc, s) => acc + (s.duration_minutes ?? 0), 0), icon: '⏱️' },
              { label: 'Engajamento alto', value: sessions.filter(s => s.engagement === 'alto').length, icon: '🔥' },
            ].map(stat => (
              <div key={stat.label} className="pai-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{stat.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#7C3AED' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Filtro por filho ──────────────────────────────── */}
        {!loading && children.length > 1 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {[{ id: 'todos', nome: 'Todos' }, ...children].map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedChild(c.id)}
                style={{
                  padding: '8px 18px', borderRadius: 9999,
                  border: `1.5px solid ${selectedChild === c.id ? '#7C3AED' : '#ddd6fe'}`,
                  background: selectedChild === c.id ? '#7C3AED' : 'white',
                  color: selectedChild === c.id ? 'white' : '#7C3AED',
                  fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  transition: 'all 0.15s',
                }}
              >
                {c.nome}
                {c.id !== 'todos' && (
                  <span style={{ marginLeft: 6, opacity: 0.7, fontSize: 11 }}>
                    ({sessions.filter(s => s.child_id === c.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Análise IA ───────────────────────────────────── */}
        {!loading && selectedChild !== 'todos' && sessions.filter(s => s.child_id === selectedChild).length > 0 && (() => {
          const child = childMap[selectedChild]
          const result = analysis[selectedChild]
          const isAnalyzing = analyzing === selectedChild
          const engColor = result ? (ENGAGEMENT_COLORS[result.nivel_engajamento_geral] ?? '#7C3AED') : '#7C3AED'

          return (
            <div style={{ marginBottom: 32 }}>
              {!result ? (
                <button
                  onClick={() => gerarAnalise(selectedChild)}
                  disabled={isAnalyzing}
                  style={{
                    width: '100%', padding: '16px 24px',
                    background: isAnalyzing
                      ? 'linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%)'
                      : 'linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)',
                    border: 'none', borderRadius: 16, cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                    color: 'white', fontWeight: 800, fontSize: 15,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: '0 4px 20px rgba(6,182,212,0.25)',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {isAnalyzing ? (
                    <>
                      <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⚙️</span>
                      Gerando análise com IA...
                    </>
                  ) : (
                    <>🤖 Gerar Análise IA de {child?.nome}</>
                  )}
                </button>
              ) : (
                <div style={{
                  background: 'white', border: '1.5px solid #ede9fe',
                  borderRadius: 20, overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(124,58,237,0.08)',
                }}>
                  {/* Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)',
                    padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 28 }}>🤖</span>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>
                          Análise IA — {child?.nome}
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                          Baseada em {sessions.filter(s => s.child_id === selectedChild).length} sessões
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setAnalysis(prev => { const n = {...prev}; delete n[selectedChild]; return n })}
                      style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '6px 12px', color: 'white', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
                    >
                      Nova análise
                    </button>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Resumo geral */}
                    {result.resumo_geral && (
                      <div style={{ background: '#f0eeff', borderRadius: 12, padding: '16px 20px' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.06em', marginBottom: 8 }}>
                          📋 RESUMO GERAL
                        </div>
                        <p style={{ fontSize: 14, color: '#1e1b4b', lineHeight: 1.7, margin: 0 }}>
                          {result.resumo_geral}
                        </p>
                      </div>
                    )}

                    {/* Engajamento geral + frase motivacional */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {result.nivel_engajamento_geral && (
                        <div style={{ background: '#f9fafb', borderRadius: 12, padding: '16px', textAlign: 'center', border: `2px solid ${engColor}30` }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 8 }}>
                            ENGAJAMENTO GERAL
                          </div>
                          <div style={{ fontSize: 22, fontWeight: 900, color: engColor }}>
                            {ENGAGEMENT_LABEL[result.nivel_engajamento_geral] ?? result.nivel_engajamento_geral}
                          </div>
                        </div>
                      )}
                      {result.frase_motivacional && (
                        <div style={{ background: '#fff7ed', borderRadius: 12, padding: '16px', border: '1.5px solid #fed7aa' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', letterSpacing: '0.06em', marginBottom: 8 }}>
                            💛 PARA {child?.nome?.toUpperCase()}
                          </div>
                          <p style={{ fontSize: 13, color: '#92400e', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                            "{result.frase_motivacional}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Áreas de interesse + Habilidades */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {result.areas_interesse?.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 10 }}>
                            🎯 ÁREAS DE INTERESSE
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {result.areas_interesse.map((a, i) => (
                              <span key={i} style={{
                                background: '#f0eeff', color: '#7C3AED',
                                fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 9999,
                              }}>{a}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {result.habilidades_exercitadas?.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 10 }}>
                            🧠 HABILIDADES EXERCITADAS
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {result.habilidades_exercitadas.map((h, i) => (
                              <span key={i} style={{
                                background: '#f0fdf4', color: '#10B981',
                                fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 9999,
                                border: '1px solid #bbf7d0',
                              }}>{h}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pontos fortes */}
                    {result.pontos_fortes?.length > 0 && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 10 }}>
                          ⭐ PONTOS FORTES OBSERVADOS
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {result.pontos_fortes.map((p, i) => (
                            <div key={i} style={{
                              display: 'flex', alignItems: 'flex-start', gap: 10,
                              background: '#fffbeb', borderRadius: 10, padding: '10px 14px',
                              border: '1px solid #fde68a',
                            }}>
                              <span style={{ fontSize: 14, flexShrink: 0 }}>✨</span>
                              <span style={{ fontSize: 13, color: '#1e1b4b', lineHeight: 1.5 }}>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recomendações */}
                    {result.recomendacoes?.length > 0 && (
                      <div style={{ background: '#f0fdff', borderRadius: 12, padding: '16px 20px', border: '1.5px solid #a5f3fc' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#06B6D4', letterSpacing: '0.06em', marginBottom: 10 }}>
                          💡 RECOMENDAÇÕES PARA OS PAIS
                        </div>
                        <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {result.recomendacoes.map((r, i) => (
                            <li key={i} style={{ fontSize: 13, color: '#1e1b4b', lineHeight: 1.6 }}>{r}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        {/* ── Lista de sessões ──────────────────────────────── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>Carregando sessões...</div>
        ) : filteredSessions.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredSessions.map(session => (
              <div key={session.id}>
                {/* Nome do filho (quando "Todos") */}
                {selectedChild === 'todos' && childMap[session.child_id] && (
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 6, paddingLeft: 4 }}>
                    👦 {childMap[session.child_id].nome}
                  </div>
                )}
                <SessionCard session={session} />
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutPai>
  )
}
