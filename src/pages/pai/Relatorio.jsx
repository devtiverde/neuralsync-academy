import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, AreaChart, Area } from 'recharts'
import { tipoConfig } from '../../data/atividadesData'
import '../../styles/pai.css'

const habilidadesBase = [
  { skill: 'Lógica',       atual: 0, anterior: 0 },
  { skill: 'Criatividade', atual: 0, anterior: 0 },
  { skill: 'Problemas',    atual: 0, anterior: 0 },
  { skill: 'Computac.',    atual: 0, anterior: 0 },
  { skill: 'Concentração', atual: 0, anterior: 0 },
  { skill: 'Memória',      atual: 0, anterior: 0 },
]

const habilidadePorTipo = {
  quiz: 'Memória', memoria: 'Memória', sequencia: 'Lógica', labirinto: 'Lógica',
  robo: 'Computac.', padrao: 'Problemas', quizia: 'Criatividade', inventor: 'Criatividade', blocos: 'Computac.',
}

const avatarPadrao = ['🦊', '👧', '👦', '🐱', '🐶', '🦁', '🐸', '🐧', '🦄', '🦉']

export default function Relatorio() {
  const navigate = useNavigate()
  const { user, subscription } = useAuth()
  const temAcesso = subscription?.plano === 'familia' || subscription?.plano === 'premium'
  const [aba, setAba] = useState('diario')
  const [filhos, setFilhos] = useState([])
  const [filhoIdx, setFilhoIdx] = useState(0)
  const [historico, setHistorico] = useState([])
  const [loadingFilhos, setLoadingFilhos] = useState(true)

  useEffect(() => {
    const query = user
      ? supabase.from('children').select('*').eq('parent_id', user.id)
      : supabase.from('children').select('*').limit(5)
    query.then(({ data }) => {
      setFilhos(data || [])
      setLoadingFilhos(false)
    })
  }, [user])

  const filho = filhos[filhoIdx]

  useEffect(() => {
    if (!filho) return
    supabase
      .from('ns_historico')
      .select('*')
      .eq('child_id', filho.id)
      .order('timestamp', { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHistorico(data)
        } else {
          const local = (() => { try { return JSON.parse(localStorage.getItem('ns_historico') || '[]') } catch { return [] } })()
          setHistorico(local)
        }
      })
  }, [filho?.id])

  const histFilho = useMemo(() => {
    if (!filho) return historico
    return historico.filter(h => !h.child_id || h.child_id === filho.id)
  }, [historico, filho])

  const hoje = new Date()
  const hojeStr = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })

  const histHoje = useMemo(() => histFilho.filter(h => {
    if (!h.timestamp) return true
    const d = new Date(h.timestamp)
    return d.toDateString() === hoje.toDateString()
  }), [histFilho])

  const histSemana = useMemo(() => {
    const semanaAtras = Date.now() - 7 * 86400000
    return histFilho.filter(h => !h.timestamp || h.timestamp >= semanaAtras)
  }, [histFilho])

  const dadosSemanal = useMemo(() => {
    const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const dStr = d.toDateString()
      const its = histFilho.filter(h => h.timestamp && new Date(h.timestamp).toDateString() === dStr)
      return { dia: dias[d.getDay()], atividades: its.length, minutos: its.reduce((s, h) => s + 10, 0) }
    })
  }, [histFilho])

  const habilidades = useMemo(() => {
    const map = {}
    habilidadesBase.forEach(h => { map[h.skill] = 0 })
    histSemana.forEach(h => {
      const skill = habilidadePorTipo[h.tipo]
      if (skill && map[skill] !== undefined) map[skill] += 10
    })
    return habilidadesBase.map(h => ({ ...h, atual: Math.min(100, 40 + (map[h.skill] || 0)), anterior: Math.max(0, 30 + (map[h.skill] || 0) - 15) }))
  }, [histSemana])

  const totalXPHoje = histHoje.reduce((s, h) => s + (h.xp || 0), 0)
  const totalCoinsHoje = histHoje.reduce((s, h) => s + (h.coins || 0), 0)
  const diasAtivos = dadosSemanal.filter(d => d.atividades > 0).length
  const totalMinSemana = dadosSemanal.reduce((s, d) => s + d.minutos, 0)
  const consistencia = Math.round((diasAtivos / 7) * 100)

  const tipoColor = { quiz: '#F07A20', memoria: '#9C27B0', sequencia: '#3b82f6', labirinto: '#10b981', robo: '#7C3AED', padrao: '#ef4444', quizia: '#7C3AED', inventor: '#F07A20', blocos: '#10b981' }
  const tipoLabel = { quiz: 'Quiz', memoria: 'Memória', sequencia: 'Sequência', labirinto: 'Labirinto', robo: 'Robô', padrao: 'Padrão', quizia: 'Quiz IA', inventor: 'Inventor', blocos: 'Blocos' }

  if (!temAcesso) return (
    <div style={{background: '#f9fafb', minHeight: '100vh'}}>
      <header className="pai-header">
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
      </header>
      <div style={{maxWidth: '480px', margin: '80px auto', textAlign: 'center', padding: '24px'}}>
        <div style={{fontSize: '64px', marginBottom: '16px'}}>📊</div>
        <h2 style={{fontWeight: '900', fontSize: '24px', color: '#0f0a1e', marginBottom: '10px'}}>Disponível no Plano Família</h2>
        <p style={{color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px'}}>
          O relatório semanal detalhado com gráficos e evolução cognitiva é exclusivo dos planos Família e Premium.
        </p>
        <button onClick={() => navigate('/planos')} style={{background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', border: 'none', borderRadius: '12px', padding: '14px 32px', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.35)'}}>
          Ver planos →
        </button>
      </div>
    </div>
  )

  if (loadingFilhos) return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#7C3AED', fontWeight: '700' }}>Carregando...</div>
    </div>
  )

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <header className="pai-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
          <h2 style={{ fontWeight: '800', fontSize: '18px', color: '#0f0a1e' }}>
            📊 Relatórios{filho ? ` — ${filho.nome}` : ''}
          </h2>
        </div>
        <button onClick={() => navigate('/relatorio-pdf')} style={{
          background: 'linear-gradient(135deg,#7C3AED,#6d28d9)', border: 'none', borderRadius: '10px',
          padding: '8px 16px', color: 'white', fontWeight: '700', fontSize: '12px', cursor: 'pointer',
          fontFamily: 'Plus Jakarta Sans, sans-serif'
        }}>📄 Relatório PDF</button>
      </header>

      {/* Seletor de filhos */}
      {filhos.length > 1 && (
        <div style={{ background: 'white', padding: '12px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {filhos.map((f, i) => (
            <button key={f.id} onClick={() => setFilhoIdx(i)} style={{
              background: filhoIdx === i ? '#7C3AED' : '#f9fafb',
              color: filhoIdx === i ? 'white' : '#374151',
              border: filhoIdx === i ? 'none' : '1.5px solid #e5e7eb',
              borderRadius: '20px', padding: '7px 16px', cursor: 'pointer',
              fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap',
            }}>
              <span>{avatarPadrao[f.nome.charCodeAt(0) % avatarPadrao.length]}</span>
              {f.nome}
            </button>
          ))}
        </div>
      )}

      {/* Perfil do filho selecionado */}
      {filho && (
        <div style={{ background: 'white', padding: '16px 24px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg,#7C3AED,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
              {avatarPadrao[filho.nome.charCodeAt(0) % avatarPadrao.length]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '16px', color: '#0f0a1e' }}>{filho.nome}</div>
              <div style={{ fontSize: '12px', color: '#7C3AED', fontWeight: '600' }}>Nível {filho.nivel} • {filho.faixa_etaria}</div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[['⭐', filho.xp, 'XP'], ['💰', filho.neural_coins, 'Coins'], ['🔥', filho.streak_atual, 'Streak']].map(([ic, v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '900', fontSize: '16px', color: '#0f0a1e' }}>{ic} {v}</div>
                  <div style={{ fontSize: '10px', color: '#9ca3af' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!filho && filhos.length === 0 && (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👶</div>
          <p style={{ color: '#9ca3af', fontWeight: '600' }}>Nenhum filho cadastrado. Acesse o Dashboard para adicionar.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ marginTop: '16px' }}>← Ir ao Dashboard</button>
        </div>
      )}

      {(filho || filhos.length === 0) && (
        <>
          <div style={{ borderBottom: '1px solid #f3f4f6', background: 'white', display: 'flex' }}>
            {['diario', 'semanal', 'mensal'].map(a => (
              <button key={a} onClick={() => setAba(a)} style={{
                flex: 1, padding: '14px', background: 'none', border: 'none',
                color: aba === a ? '#7C3AED' : '#9ca3af', cursor: 'pointer',
                fontWeight: aba === a ? '700' : '500',
                borderBottom: aba === a ? '2px solid #7C3AED' : '2px solid transparent',
                fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'capitalize',
              }}>
                {a === 'diario' ? 'Diário' : a === 'semanal' ? 'Semanal' : 'Mensal'}
            </button>
            ))}
          </div>

          <div style={{ maxWidth: '700px', margin: '0 auto', padding: '24px' }}>

            {/* ── DIÁRIO ── */}
            {aba === 'diario' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '16px' }}>
                  {[
                    [histHoje.length > 0 ? (histHoje.length * 10) + ' min' : '—', 'Tempo total', '#7C3AED'],
                    ['+' + totalXPHoje, 'XP ganho', '#F07A20'],
                    ['+' + totalCoinsHoje + ' 💰', 'Coins', '#FFD700'],
                    [histHoje.length, 'Atividades', '#10b981'],
                  ].map(([v, l, c]) => (
                    <div key={l} className="pai-card" style={{ padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: '900', color: c }}>{v}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{l}</div>
                    </div>
                  ))}
                </div>

                {histHoje.length > 0 ? (
                  <>
                    <div style={{ background: 'linear-gradient(135deg,#faf5ff,#f0fdf4)', border: '1.5px solid #ede9fe', borderRadius: '14px', padding: '16px', marginBottom: '16px', display: 'flex', gap: '12px' }}>
                      <div style={{ fontSize: '22px', flexShrink: 0 }}>🧠</div>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '13px', color: '#7C3AED', marginBottom: '4px' }}>Análise do Dia</div>
                        <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                          {histHoje.length >= 3 ? 'Ótima sessão hoje!' : 'Boa sessão hoje!'} {filho?.nome || 'A criança'} completou <strong>{histHoje.length} atividade{histHoje.length !== 1 ? 's' : ''}</strong> e ganhou <strong>{totalXPHoje} XP</strong>.
                        </p>
                      </div>
                    </div>

                    <h4 style={{ fontWeight: '800', marginBottom: '10px', color: '#0f0a1e', fontSize: '14px' }}>Linha do tempo</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {histHoje.map((item, i) => {
                        const cor = tipoColor[item.tipo] || '#7C3AED'
                        return (
                          <div key={i} className="pai-card" style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ fontSize: '24px', lineHeight: 1 }}>{item.emoji || '⭐'}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: '700', fontSize: '14px', color: '#0f0a1e' }}>{item.titulo}</div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                                <span style={{ color: cor, fontWeight: '600' }}>{tipoLabel[item.tipo] || item.tipo}</span>
                                {' · '}~10 min{' · '}+{item.xp || 0} XP
                                {item.coins ? ` · +${item.coins} 💰` : ''}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <div className="pai-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📅</div>
                    <p style={{ color: '#9ca3af', fontWeight: '600' }}>Nenhuma atividade hoje ainda.</p>
                    <p style={{ color: '#9ca3af', fontSize: '13px' }}>As atividades aparecem aqui quando {filho?.nome || 'seu filho'} jogar.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── SEMANAL ── */}
            {aba === 'semanal' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '16px' }}>
                  {[
                    [diasAtivos + '/7', 'Dias ativos', '#7C3AED'],
                    [totalMinSemana + ' min', 'Tempo total', '#F07A20'],
                    [consistencia + '%', 'Consistência', consistencia >= 70 ? '#10b981' : '#F07A20'],
                  ].map(([v, l, c]) => (
                    <div key={l} className="pai-card" style={{ padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '900', color: c }}>{v}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{l}</div>
                    </div>
                  ))}
                </div>

                <div className="pai-card" style={{ padding: '20px', marginBottom: '14px' }}>
                  <h4 style={{ fontWeight: '800', marginBottom: '16px', color: '#0f0a1e', fontSize: '14px' }}>Atividades por dia</h4>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={dadosSemanal}>
                      <XAxis dataKey="dia" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
                      <Tooltip contentStyle={{ background: 'white', border: '1px solid #ede9fe', borderRadius: '8px', fontSize: '12px' }} formatter={(v) => [v, 'Atividades']} />
                      <Bar dataKey="atividades" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="pai-card" style={{ padding: '20px', marginBottom: '14px' }}>
                  <h4 style={{ fontWeight: '800', marginBottom: '14px', color: '#0f0a1e', fontSize: '14px' }}>Habilidades cognitivas</h4>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart data={habilidades}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                      <Radar name="Esta semana" dataKey="atual" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.3} />
                      <Radar name="Anterior" dataKey="anterior" stroke="#F07A20" fill="#F07A20" fillOpacity={0.1} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px', border: '1.5px solid #bbf7d0' }}>
                    <div style={{ fontWeight: '800', fontSize: '12px', color: '#10b981', marginBottom: '8px' }}>✅ Pontos fortes</div>
                    {habilidades.sort((a, b) => b.atual - a.atual).slice(0, 3).map((h, i) => (
                      <div key={i} style={{ fontSize: '12px', color: '#374151', marginBottom: '4px', fontWeight: '500' }}>· {h.skill} — {h.atual}%</div>
                    ))}
                  </div>
                  <div style={{ background: '#fff7ed', borderRadius: '14px', padding: '14px', border: '1.5px solid #fed7aa' }}>
                    <div style={{ fontWeight: '800', fontSize: '12px', color: '#F07A20', marginBottom: '8px' }}>⚡ Para desenvolver</div>
                    {habilidades.sort((a, b) => a.atual - b.atual).slice(0, 3).map((h, i) => (
                      <div key={i} style={{ fontSize: '12px', color: '#374151', marginBottom: '4px', fontWeight: '500' }}>· {h.skill} — {h.atual}%</div>
                    ))}
                  </div>
                </div>

                {histSemana.length === 0 && (
                  <div className="pai-card" style={{ padding: '32px', textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>📊</div>
                    <p style={{ color: '#9ca3af', fontWeight: '600' }}>Nenhuma atividade esta semana ainda.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── MENSAL ── */}
            {aba === 'mensal' && (
              <div>
                {(() => {
                  const hoje30 = Date.now() - 30 * 86400000
                  const hist30 = histFilho.filter(h => !h.timestamp || h.timestamp >= hoje30)
                  const totalXPMes = hist30.reduce((s, h) => s + (h.xp || 0), 0)
                  const diasAtivosMes = new Set(hist30.filter(h => h.timestamp).map(h => new Date(h.timestamp).toDateString())).size
                  const dadosMensal = Array.from({ length: 30 }, (_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() - (29 - i))
                    const dStr = d.toDateString()
                    const xp = hist30.filter(h => h.timestamp && new Date(h.timestamp).toDateString() === dStr).reduce((s, h) => s + (h.xp || 0), 0)
                    return { dia: d.getDate(), xp }
                  })
                  return (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '16px' }}>
                        {[
                          [diasAtivosMes + ' dias', 'Dias ativos', '#7C3AED'],
                          [hist30.length, 'Atividades', '#F07A20'],
                          [totalXPMes + ' XP', 'XP do mês', '#9C27B0'],
                          [filho?.neural_coins || '—', 'Coins total', '#FFD700'],
                        ].map(([v, l, c]) => (
                          <div key={l} className="pai-card" style={{ padding: '14px', textAlign: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: '900', color: c }}>{v}</div>
                            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{l}</div>
                          </div>
                        ))}
                      </div>

                      <div className="pai-card" style={{ padding: '20px', marginBottom: '14px' }}>
                        <h4 style={{ fontWeight: '800', marginBottom: '14px', color: '#0f0a1e', fontSize: '14px' }}>Evolução de XP — últimos 30 dias</h4>
                        <ResponsiveContainer width="100%" height={160}>
                          <AreaChart data={dadosMensal}>
                            <defs>
                              <linearGradient id="gradXP" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="dia" stroke="#9ca3af" fontSize={10} tickCount={6} />
                            <YAxis stroke="#9ca3af" fontSize={10} />
                            <Tooltip contentStyle={{ background: 'white', border: '1px solid #ede9fe', borderRadius: '8px', fontSize: '12px' }} formatter={(v) => [v + ' XP', 'XP']} />
                            <Area type="monotone" dataKey="xp" stroke="#7C3AED" strokeWidth={2} fill="url(#gradXP)" dot={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="pai-card" style={{ padding: '16px', marginBottom: '14px' }}>
                        <h4 style={{ fontWeight: '800', fontSize: '14px', color: '#0f0a1e', marginBottom: '12px' }}>Calendário de atividade</h4>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {dadosMensal.map((d, i) => (
                            <div key={i} title={`Dia ${d.dia}: ${d.xp} XP`} style={{
                              width: '28px', height: '28px', borderRadius: '6px', fontSize: '10px', fontWeight: '700',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: d.xp > 100 ? '#7C3AED' : d.xp > 0 ? '#c4b5fd' : '#f3f4f6',
                              color: d.xp > 0 ? 'white' : '#d1d5db',
                            }}>{d.dia}</div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '12px', fontSize: '11px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#7C3AED', display: 'inline-block' }} />Alta atividade
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#c4b5fd', display: 'inline-block' }} />Alguma atividade
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f3f4f6', display: 'inline-block' }} />Inativo
                          </span>
                        </div>
                      </div>

                      <div onClick={() => navigate('/relatorio-pdf')} style={{
                        background: 'linear-gradient(135deg,#7C3AED,#6d28d9)', borderRadius: '16px', padding: '20px',
                        cursor: 'pointer', position: 'relative', overflow: 'hidden',
                      }}>
                        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>⭐ Exclusivo Premium</div>
                            <div style={{ fontWeight: '900', fontSize: '16px', color: 'white', marginBottom: '4px' }}>Relatório Cognitivo Completo</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Análise profunda + PDF de 2 páginas</div>
                          </div>
                          <div style={{ fontSize: '24px' }}>📄→</div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
