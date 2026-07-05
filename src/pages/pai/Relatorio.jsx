import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  AreaChart, Area, LineChart, Line,
} from 'recharts'
import { tipoConfig } from '../../data/atividadesData'
import LayoutPai from '../../components/LayoutPai'
import { ChartBar, Brain, CalendarBlank } from '@phosphor-icons/react'
import '../../styles/pai.css'

// ── Categorias cognitivas ──────────────────────────────────────────────────────
const CATEGORIAS_COG = ['Memória', 'Atenção', 'Espacial', 'Linguagem', 'Lógica', 'Coordenação']

const TIPO_CATEGORIA = {
  memoria: 'Memória',   padrao: 'Memória',
  labirinto: 'Atenção', sequencia: 'Atenção',
  'classificar-objetos': 'Espacial', 'quebra-cabeca': 'Espacial', 'sequencia-magica': 'Espacial', 'conectar-pontos': 'Espacial',
  quiz: 'Linguagem', quizia: 'Linguagem', alfabeto: 'Linguagem', cores: 'Linguagem',
  formas: 'Linguagem', 'historia-interativa': 'Linguagem', 'caca-palavras': 'Linguagem', silabas: 'Linguagem', ingles: 'Linguagem',
  blocos: 'Lógica', robo: 'Lógica', inventor: 'Lógica',
  numeros: 'Coordenação', digitacao: 'Coordenação', colorir: 'Coordenação',
  'zona-emocoes': 'Atenção',
}

const avatarPadrao = ['🦊', '👧', '👦', '🐱', '🐶', '🦁', '🐸', '🐧', '🦄', '🦉']

const tipoColor = {
  quiz: '#F07A20', memoria: '#9C27B0', sequencia: '#3b82f6', labirinto: '#10b981',
  robo: '#7C3AED', padrao: '#ef4444', quizia: '#7C3AED', inventor: '#F07A20', blocos: '#10b981',
  colorir: '#84CC16', silabas: '#06B6D4', 'zona-emocoes': '#EC4899',
}
const tipoLabel = {
  quiz: 'Quiz', memoria: 'Memória', sequencia: 'Sequência', labirinto: 'Labirinto',
  robo: 'Robô', padrao: 'Padrão', quizia: 'Quiz IA', inventor: 'Inventor', blocos: 'Blocos',
  numeros: 'Números', formas: 'Formas', cores: 'Cores', alfabeto: 'Alfabeto',
  digitacao: 'Digitação', 'sequencia-magica': 'Seq. Mágica', 'conectar-pontos': 'Pontos',
  'classificar-objetos': 'Classificar', 'quebra-cabeca': 'Quebra-cabeça',
  'caca-palavras': 'Caça-palavras', 'historia-interativa': 'História',
  colorir: 'Colorir', silabas: 'Sílabas', ingles: 'Inglês', 'zona-emocoes': 'Zona das Emoções',
}

export default function Relatorio() {
  const navigate = useNavigate()
  const { user, subscription } = useAuth()
  const temAcesso = subscription?.plano === 'familia' || subscription?.plano === 'premium'

  const [aba, setAba] = useState('diario')
  const [filhos, setFilhos] = useState([])
  const [filhoIdx, setFilhoIdx] = useState(0)
  const [historico, setHistorico] = useState([])
  const [loadingFilhos, setLoadingFilhos] = useState(true)
  const [histVisible, setHistVisible] = useState(20)

  useEffect(() => {
    if (!user) { setLoadingFilhos(false); return }
    supabase.from('children').select('*').eq('parent_id', user.id)
      .then(({ data, error }) => {
        if (!error) setFilhos(data || [])
        setLoadingFilhos(false)
      })
  }, [user])

  const filho = filhos[filhoIdx]

  useEffect(() => {
    if (!filho) return
    supabase
      .from('ns_historico').select('*').eq('child_id', filho.id)
      .order('timestamp', { ascending: false }).limit(200)
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

  const histHoje = useMemo(() => histFilho.filter(h => {
    if (!h.timestamp) return false
    return new Date(h.timestamp).toDateString() === hoje.toDateString()
  }), [histFilho])

  const histSemana = useMemo(() => {
    const semanaAtras = new Date(); semanaAtras.setDate(semanaAtras.getDate() - 7)
    return histFilho.filter(h => {
      if (!h.timestamp) return false
      return new Date(h.timestamp) >= semanaAtras
    })
  }, [histFilho])

  // Semana anterior (8–14 dias atrás) — usada pra comparar com dados reais, não uma estimativa
  const histSemanaAnterior = useMemo(() => {
    const inicio = new Date(); inicio.setDate(inicio.getDate() - 14)
    const fim = new Date(); fim.setDate(fim.getDate() - 7)
    return histFilho.filter(h => {
      if (!h.timestamp) return false
      const t = new Date(h.timestamp)
      return t >= inicio && t < fim
    })
  }, [histFilho])

  const dadosSemanal = useMemo(() => {
    const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i))
      const dStr = d.toDateString()
      const its = histFilho.filter(h => h.timestamp && new Date(h.timestamp).toDateString() === dStr)
      return { dia: dias[d.getDay()], atividades: its.length, xp: its.reduce((s,h) => s + (h.xp||0), 0) }
    })
  }, [histFilho])

  // 4 semanas de XP diário para o gráfico de linha
  const dadosSemanas4 = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (27 - i))
      const dStr = d.toDateString()
      const xp = histFilho
        .filter(h => h.timestamp && new Date(h.timestamp).toDateString() === dStr)
        .reduce((s, h) => s + (h.xp || 0), 0)
      const semana = Math.floor(i / 7) + 1
      return { idx: i, dia: d.getDate(), xp, label: i % 7 === 0 ? `Sem ${semana}` : '' }
    })
  }, [histFilho])

  // Scores cognitivos por categoria — "anterior" agora vem da semana passada de verdade, não de uma fórmula inventada
  const scoresCognitivos = useMemo(() => {
    const contagem = {}, contagemAnterior = {}
    CATEGORIAS_COG.forEach(c => { contagem[c] = 0; contagemAnterior[c] = 0 })
    histSemana.forEach(h => { const cat = TIPO_CATEGORIA[h.tipo]; if (cat) contagem[cat]++ })
    histSemanaAnterior.forEach(h => { const cat = TIPO_CATEGORIA[h.tipo]; if (cat) contagemAnterior[cat]++ })
    const MAX = Math.max(...Object.values(contagem), ...Object.values(contagemAnterior), 1)
    return CATEGORIAS_COG.map(cat => ({
      skill: cat,
      atual: Math.min(95, Math.round(20 + (contagem[cat] / MAX) * 60)),
      anterior: Math.min(95, Math.round(20 + (contagemAnterior[cat] / MAX) * 60)),
    }))
  }, [histSemana, histSemanaAnterior])

  // Atividade mais praticada na semana + comparação real com a semana passada
  const tipoFavoritoSemana = useMemo(() => {
    const contagemTipo = {}
    histSemana.forEach(h => { contagemTipo[h.tipo] = (contagemTipo[h.tipo] || 0) + 1 })
    const entradas = Object.entries(contagemTipo).sort((a, b) => b[1] - a[1])
    return entradas.length ? { tipo: entradas[0][0], vezes: entradas[0][1] } : null
  }, [histSemana])

  const deltaAtividadesSemana = useMemo(() => {
    if (histSemanaAnterior.length === 0) return histSemana.length > 0 ? null : 0
    return Math.round(((histSemana.length - histSemanaAnterior.length) / histSemanaAnterior.length) * 100)
  }, [histSemana, histSemanaAnterior])

  const totalXPHoje   = histHoje.reduce((s, h) => s + (h.xp || 0), 0)
  const totalXPSemana = histSemana.reduce((s, h) => s + (h.xp || 0), 0)
  const totalCoinsHoje = histHoje.reduce((s, h) => s + (h.coins || 0), 0)
  const diasAtivos = dadosSemanal.filter(d => d.atividades > 0).length
  const totalMinSemana = histSemana.length * 10
  const consistencia = Math.round((diasAtivos / 7) * 100)

  const pontosFortesTop2 = [...scoresCognitivos].sort((a, b) => b.atual - a.atual).slice(0, 2)
  const oportunidadesBot2 = [...scoresCognitivos].sort((a, b) => a.atual - b.atual).slice(0, 2)

  // ── Gate premium ──────────────────────────────────────────────────────────────
  if (!temAcesso) return (
    <LayoutPai>
      <div className="pai-content" style={{ maxWidth: '480px', textAlign: 'center', paddingTop: '80px' }}>
        <ChartBar weight="fill" size={64} color="#7C3AED" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontWeight: '900', fontSize: '24px', color: '#0f0a1e', marginBottom: '10px' }}>Disponível no Plano Família</h2>
        <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
          O relatório semanal detalhado com gráficos e evolução cognitiva é exclusivo dos planos Família e Premium.
        </p>
        <button onClick={() => navigate('/planos')} className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>Ver planos →</button>
      </div>
    </LayoutPai>
  )

  if (loadingFilhos) return (
    <LayoutPai>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ color: '#7C3AED', fontWeight: '700' }}>Carregando...</div>
      </div>
    </LayoutPai>
  )

  return (
    <LayoutPai>
      <div className="pai-content">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f0a1e', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChartBar weight="fill" size={22} color="#7C3AED" /> Relatórios{filho ? ` — ${filho.nome}` : ''}
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Análise cognitiva detalhada.</p>
          </div>
          <button onClick={() => navigate('/relatorio-pdf')} className="btn-primary" style={{ padding: '9px 18px', fontSize: '13px' }}>📄 Relatório PDF</button>
        </div>

        {/* Seletor de filhos */}
        {filhos.length > 1 && (
          <div style={{ background: 'white', padding: '12px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '0' }}>
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

        {/* Perfil do filho */}
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
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!filho && filhos.length === 0 && (
          <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👶</div>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Nenhum filho cadastrado. Acesse o Dashboard para adicionar.</p>
            <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ marginTop: '16px' }}>← Ir ao Dashboard</button>
          </div>
        )}

        {(filho || filhos.length === 0) && (
          <>
            {/* ── Resumo semanal (sempre visível) ──────────────────────── */}
            {filho && (
              <div style={{ background: '#fafbff', borderBottom: '1px solid #f3f4f6', padding: '16px 24px' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Esta semana
                    </div>
                    {deltaAtividadesSemana !== null && (
                      <span style={{
                        fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '999px',
                        background: deltaAtividadesSemana >= 0 ? '#ecfdf5' : '#fff7ed',
                        color: deltaAtividadesSemana >= 0 ? '#059669' : '#c2410c',
                      }}>
                        {deltaAtividadesSemana >= 0 ? '▲' : '▼'} {Math.abs(deltaAtividadesSemana)}% vs semana passada
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {[
                      { valor: `${totalMinSemana} min`, label: 'Minutos', cor: '#7C3AED' },
                      { valor: histSemana.length, label: 'Atividades', cor: '#10b981' },
                      { valor: `+${totalXPSemana}`, label: 'XP ganho', cor: '#F07A20' },
                      { valor: `${filho.streak_atual || 0}🔥`, label: 'Streak atual', cor: '#ef4444' },
                    ].map(({ valor, label, cor }) => (
                      <div key={label} style={{ background: 'white', border: '1.5px solid #ede9fe', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: '900', color: cor, fontFamily: 'Space Grotesk, sans-serif' }}>{valor}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500', marginTop: '2px' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Tabs ─────────────────────────────────────────────────── */}
            <div style={{ borderBottom: '1px solid #f3f4f6', background: 'white', display: 'flex' }}>
              {[
                ['diario',   'Diário'],
                ['semanal',  'Semanal'],
                ['mensal',   'Mensal'],
                ['historico','Histórico'],
              ].map(([id, label]) => (
                <button key={id} onClick={() => setAba(id)} style={{
                  flex: 1, padding: '14px', background: 'none', border: 'none',
                  color: aba === id ? '#7C3AED' : '#9ca3af', cursor: 'pointer',
                  fontWeight: aba === id ? '700' : '500',
                  borderBottom: aba === id ? '2px solid #7C3AED' : '2px solid transparent',
                  fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>{label}</button>
              ))}
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '24px' }}>

              {/* ══ DIÁRIO ══════════════════════════════════════════════ */}
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
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  {histHoje.length > 0 ? (
                    <>
                      <div style={{ background: 'linear-gradient(135deg,#faf5ff,#f0fdf4)', border: '1.5px solid #ede9fe', borderRadius: '14px', padding: '16px', marginBottom: '16px', display: 'flex', gap: '12px' }}>
                        <Brain weight="fill" size={22} color="#7C3AED" style={{ flexShrink: 0 }} />
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
                                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
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
                      <CalendarBlank weight="fill" size={48} color="#7C3AED" style={{ marginBottom: '12px' }} />
                      <p style={{ color: '#6b7280', fontWeight: '600' }}>Nenhuma atividade hoje ainda.</p>
                    </div>
                  )}
                </div>
              )}

              {/* ══ SEMANAL ═════════════════════════════════════════════ */}
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
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Atividades por dia */}
                  <div className="pai-card" style={{ padding: '20px', marginBottom: '14px' }}>
                    <h4 style={{ fontWeight: '800', marginBottom: '16px', color: '#0f0a1e', fontSize: '14px' }}>Atividades por dia</h4>
                    <ResponsiveContainer width="100%" height={150}>
                      <BarChart data={dadosSemanal}>
                        <XAxis dataKey="dia" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
                        <Tooltip contentStyle={{ background: 'white', border: '1px solid #ede9fe', borderRadius: '8px', fontSize: '12px' }} formatter={v => [v, 'Atividades']} />
                        <Bar dataKey="atividades" fill="#7C3AED" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Evolução XP — 4 semanas */}
                  <div className="pai-card" style={{ padding: '20px', marginBottom: '14px' }}>
                    <h4 style={{ fontWeight: '800', marginBottom: '14px', color: '#0f0a1e', fontSize: '14px' }}>Evolução de XP — últimas 4 semanas</h4>
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart data={dadosSemanas4}>
                        <XAxis dataKey="dia" stroke="#9ca3af" fontSize={10} tickCount={7} />
                        <YAxis stroke="#9ca3af" fontSize={10} />
                        <Tooltip contentStyle={{ background: 'white', border: '1px solid #ede9fe', borderRadius: '8px', fontSize: '12px' }} formatter={v => [v + ' XP', 'XP']} />
                        <Line type="monotone" dataKey="xp" stroke="#7C3AED" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Radar cognitivo */}
                  <div className="pai-card" style={{ padding: '20px', marginBottom: '14px' }}>
                    <h4 style={{ fontWeight: '800', marginBottom: '4px', color: '#0f0a1e', fontSize: '14px' }}>Desempenho cognitivo</h4>
                    <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>Score 0–100 por categoria com base nas atividades da semana</p>
                    {histSemana.length > 0 ? (
                      <ResponsiveContainer width="100%" height={220}>
                        <RadarChart data={scoresCognitivos} outerRadius="55%" margin={{ top: 8, right: 24, bottom: 8, left: 36 }}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 10 }} />
                          <Radar name="Esta semana" dataKey="atual" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.3} />
                          <Radar name="Anterior" dataKey="anterior" stroke="#F07A20" fill="#F07A20" fillOpacity={0.1} />
                        </RadarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '32px', color: '#9ca3af', fontSize: '13px' }}>
                        Nenhuma atividade esta semana ainda.
                      </div>
                    )}
                  </div>

                  {/* Atividade favorita da semana */}
                  {tipoFavoritoSemana && (
                    <div className="pai-card" style={{ padding: '14px 16px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ fontSize: '22px' }}>🏆</div>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '13px', color: '#0f0a1e' }}>
                          Atividade favorita da semana: <span style={{ color: tipoColor[tipoFavoritoSemana.tipo] || '#7C3AED' }}>{tipoLabel[tipoFavoritoSemana.tipo] || tipoFavoritoSemana.tipo}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Praticada {tipoFavoritoSemana.vezes}x esta semana</div>
                      </div>
                    </div>
                  )}

                  {/* Pontos fortes e oportunidades */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px', border: '1.5px solid #bbf7d0' }}>
                      <div style={{ fontWeight: '800', fontSize: '12px', color: '#10b981', marginBottom: '8px' }}>✅ Pontos fortes</div>
                      {pontosFortesTop2.map((h, i) => (
                        <div key={i} style={{ fontSize: '12px', color: '#374151', marginBottom: '4px', fontWeight: '500' }}>· {h.skill} — {h.atual}%</div>
                      ))}
                    </div>
                    <div style={{ background: '#fff7ed', borderRadius: '14px', padding: '14px', border: '1.5px solid #fed7aa' }}>
                      <div style={{ fontWeight: '800', fontSize: '12px', color: '#F07A20', marginBottom: '8px' }}>⚡ Oportunidades</div>
                      {oportunidadesBot2.map((h, i) => (
                        <div key={i} style={{ fontSize: '12px', color: '#374151', marginBottom: '4px', fontWeight: '500' }}>· {h.skill} — {h.atual}%</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ══ MENSAL ══════════════════════════════════════════════ */}
              {aba === 'mensal' && (() => {
                const hoje30 = new Date(); hoje30.setDate(hoje30.getDate() - 30)
                const hist30 = histFilho.filter(h => h.timestamp && new Date(h.timestamp) >= hoje30)
                const totalXPMes = hist30.reduce((s, h) => s + (h.xp || 0), 0)
                const diasAtivosMes = new Set(hist30.filter(h => h.timestamp).map(h => new Date(h.timestamp).toDateString())).size
                const dadosMensal = Array.from({ length: 30 }, (_, i) => {
                  const d = new Date(); d.setDate(d.getDate() - (29 - i))
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
                          <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>{l}</div>
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
                          <Tooltip contentStyle={{ background: 'white', border: '1px solid #ede9fe', borderRadius: '8px', fontSize: '12px' }} formatter={v => [v + ' XP', 'XP']} />
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
                        {[['#7C3AED','Alta atividade'],['#c4b5fd','Alguma'],['#f3f4f6','Inativo']].map(([bg, label]) => (
                          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: bg, display: 'inline-block' }} />{label}
                          </span>
                        ))}
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

              {/* ══ HISTÓRICO ═══════════════════════════════════════════ */}
              {aba === 'historico' && (
                <div>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontWeight: '800', color: '#0f0a1e', fontSize: '14px' }}>Últimas atividades</h4>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{histFilho.length} registros</span>
                  </div>

                  {histFilho.length === 0 ? (
                    <div className="pai-card" style={{ padding: '40px', textAlign: 'center' }}>
                      <ChartBar weight="fill" size={40} color="#7C3AED" style={{ marginBottom: '10px' }} />
                      <p style={{ color: '#6b7280', fontWeight: '600' }}>Nenhuma atividade registrada ainda.</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {histFilho.slice(0, histVisible).map((item, i) => {
                          const cor = tipoColor[item.tipo] || '#7C3AED'
                          const dt = item.timestamp ? new Date(item.timestamp) : null
                          const dataStr = dt ? dt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '—'
                          const horaStr = dt ? dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''
                          return (
                            <div key={i} className="pai-card" style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <div style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>{item.emoji || '⭐'}</div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: '700', fontSize: '13px', color: '#0f0a1e', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {item.titulo || tipoLabel[item.tipo] || item.tipo}
                                </div>
                                <div style={{ fontSize: '11px', color: '#6b7280' }}>
                                  <span style={{ color: cor, fontWeight: '600' }}>{tipoLabel[item.tipo] || item.tipo}</span>
                                  {' · '}{dataStr} {horaStr}
                                </div>
                              </div>
                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#F07A20' }}>+{item.xp || 0} XP</div>
                                {item.coins ? <div style={{ fontSize: '11px', color: '#9ca3af' }}>+{item.coins} 💰</div> : null}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {histVisible < histFilho.length && (
                        <button
                          onClick={() => setHistVisible(v => v + 10)}
                          style={{
                            width: '100%', marginTop: '12px', padding: '13px',
                            background: 'white', border: '1.5px solid #ede9fe',
                            borderRadius: '12px', color: '#7C3AED', fontWeight: '700',
                            fontSize: '13px', cursor: 'pointer',
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                          }}
                        >
                          Ver mais ({histFilho.length - histVisible} restantes)
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

            </div>
          </>
        )}
      </div>
    </LayoutPai>
  )
}
