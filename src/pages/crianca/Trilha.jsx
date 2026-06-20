import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { tipoConfig } from '../../data/atividadesData'
import { useAtividades } from '../../hooks/useAtividades'
import '../../styles/crianca.css'

const menu = [
  { icon: '🏠', label: 'Início',  path: '/home-crianca' },
  { icon: '🗺️', label: 'Trilha',  path: '/trilha' },
  { icon: '🎬', label: 'Kids',    path: '/kids' },
  { icon: '🏆', label: 'Ranking', path: '/ranking' },
  { icon: '🏪', label: 'Loja',    path: '/loja' },
  { icon: '👤', label: 'Perfil',  path: '/perfil-crianca' },
]

const nomeFaixa = {
  exploradores: 'Exploradores 🔍',
  construtores: 'Construtores 🔧',
  criadores:    'Criadores 🎨',
  inventores:   'Inventores 💡',
}

function semanaAtual() {
  const d = new Date()
  const start = new Date(d.getFullYear(), 0, 0)
  const day = Math.floor((d - start) / 86400000)
  return `${d.getFullYear()}-W${Math.floor(day / 7)}`
}

export default function Trilha() {
  const navigate = useNavigate()
  const { state: navState } = useLocation()

  const [faixa, setFaixa] = useState('construtores')
  const [concluidas, setConcluidas] = useState([])
  const [filtroTipo, setFiltroTipo] = useState(navState?.filtroTipo || 'todos')
  const [child, setChild] = useState(null)
  const [desafioReivindicado, setDesafioReivindicado] = useState(false)

  const { atividades: activities } = useAtividades(faixa)

  useEffect(() => {
    const c = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    setChild(c)
    if (c?.faixa_etaria) setFaixa(c.faixa_etaria)
    else {
      supabase.from('children').select('faixa_etaria').limit(1).then(({ data }) => {
        const f = data?.[0]?.faixa_etaria || 'construtores'
        setFaixa(f)
      })
    }
    if (c?.id) {
      const chave = `ns_desafio_${c.id}_${semanaAtual()}`
      setDesafioReivindicado(!!localStorage.getItem(chave))
    }
  }, [])

  useEffect(() => {
    try {
      const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
      const c = JSON.parse(localStorage.getItem('ns_active_child') || 'null')
      if (!c?.id) return
      const registros = hist.filter(h => h.child_id === c.id)
      const ids = new Set()
      registros.forEach(h => {
        if (h.atividade_id) ids.add(h.atividade_id)
        if (h.tipo) ids.add(h.tipo)
      })
      setConcluidas([...ids])
    } catch {}
  }, [])

  async function reivindicarDesafio() {
    if (!child?.id || desafioReivindicado) return
    const novoXp = (child.xp || 0) + 500
    const novasCoins = (child.neural_coins || 0) + 500
    await supabase.from('children').update({ xp: novoXp, neural_coins: novasCoins }).eq('id', child.id)
    const updated = { ...child, xp: novoXp, neural_coins: novasCoins }
    setChild(updated)
    localStorage.setItem('ns_active_child', JSON.stringify(updated))
    const chave = `ns_desafio_${child.id}_${semanaAtual()}`
    localStorage.setItem(chave, '1')
    setDesafioReivindicado(true)
  }

  const atividadesVisiveis = filtroTipo === 'todos'
    ? activities
    : activities.filter(a => a.tipo === filtroTipo)

  const getStatus = (act) => {
    if (concluidas.includes(act.id) || concluidas.includes(act.tipo)) return 'concluido'
    return 'andamento'
  }

  const statusConfig = {
    concluido: { border: '#10b981', bg: '#f0fdf4', icon: '✅' },
    andamento: { border: '#F07A20', bg: '#fff7ed', icon: '▶️' },
    pendente:  { border: '#e5e7eb', bg: '#f9fafb', icon: '🔒' },
  }

  const totalConcluidas = activities.filter(a => getStatus(a) === 'concluido').length
  const total = activities.length
  const pct = total > 0 ? Math.round((totalConcluidas / total) * 100) : 0

  const tiposDisponiveis = [...new Set(activities.map(a => a.tipo))]

  function iniciarAtividade(act) {
    navigate(`/atividade/${act.tipo}`, { state: { atividade: act } })
  }

  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ paddingBottom: '90px' }}>

        {/* ── HEADER ── */}
        <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/home-crianca')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '900' }}>Minha Trilha 🗺️</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>{nomeFaixa[faixa]}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 12px', color: 'white', fontSize: '13px', fontWeight: '800' }}>
            {totalConcluidas}/{total}
          </div>
        </div>

        {/* ── FILTROS ── */}
        <div style={{ background: 'white', borderBottom: '1px solid #f0eeff', padding: '10px 16px', overflowX: 'auto', display: 'flex', gap: '8px', scrollbarWidth: 'none' }}>
          <button onClick={() => setFiltroTipo('todos')} style={{
            flexShrink: 0, borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            background: filtroTipo === 'todos' ? '#7C3AED' : '#f3f4f6',
            color: filtroTipo === 'todos' ? 'white' : '#6b7280',
            border: filtroTipo === 'todos' ? 'none' : '1px solid #e5e7eb',
          }}>
            Todas ({total})
          </button>
          {tiposDisponiveis.map(tipo => {
            const tc = tipoConfig[tipo]
            const qtd = activities.filter(a => a.tipo === tipo).length
            const ativo = filtroTipo === tipo
            return (
              <button key={tipo} onClick={() => setFiltroTipo(tipo)} style={{
                flexShrink: 0, borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                background: ativo ? tc.cor : '#f3f4f6',
                color: ativo ? 'white' : '#6b7280',
                border: ativo ? 'none' : '1px solid #e5e7eb',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <span>{tc.icon}</span> {tc.label} ({qtd})
              </button>
            )
          })}
        </div>

        <div style={{ padding: '16px' }}>

          {/* ── PROGRESSO ── */}
          <div className="card-white" style={{ padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: '700', fontSize: '14px' }}>
                {filtroTipo === 'todos' ? 'Progresso geral' : 'Filtro: ' + tipoConfig[filtroTipo]?.label}
              </span>
              <span style={{ fontWeight: '900', fontSize: '14px', color: '#7C3AED' }}>{pct}%</span>
            </div>
            <div style={{ background: '#e5e7eb', borderRadius: '999px', height: '7px', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(90deg, #7C3AED, #a78bfa)', width: pct + '%', height: '100%', borderRadius: '999px', transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px', fontWeight: '500' }}>
              {atividadesVisiveis.length} atividade{atividadesVisiveis.length !== 1 ? 's' : ''} {filtroTipo !== 'todos' ? 'nesta categoria' : 'na trilha'}
              {filtroTipo !== 'todos' && (
                <button onClick={() => setFiltroTipo('todos')} style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#7C3AED', fontWeight: '700', cursor: 'pointer', fontSize: '11px' }}>
                  ✕ Limpar filtro
                </button>
              )}
            </div>
          </div>

          {/* ── LISTA DE ATIVIDADES ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {atividadesVisiveis.length === 0 ? (
              <div className="card-white" style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                <p style={{ color: '#6b7280', fontWeight: '600' }}>Nenhuma atividade encontrada para este filtro.</p>
              </div>
            ) : atividadesVisiveis.map((act) => {
              const s = getStatus(act)
              const cfg = statusConfig[s]
              const tc = tipoConfig[act.tipo]
              return (
                <div key={act.id} style={{ background: cfg.bg, borderRadius: '18px', padding: '16px', border: '1.5px solid ' + cfg.border, opacity: s === 'pendente' ? 0.55 : 1, transition: 'opacity 0.2s' }}>

                  {/* Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <span style={{ background: tc.cor + '20', color: tc.cor, fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {tc.icon} {tc.label}
                    </span>
                    <span style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{act.habilidade}</span>
                    <div style={{ marginLeft: 'auto', fontSize: '20px' }}>{cfg.icon}</div>
                  </div>

                  {/* Título e historinha */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '36px', lineHeight: 1, flexShrink: 0 }}>{act.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '800', fontSize: '15px', marginBottom: '3px', color: '#0f0a1e' }}>{act.titulo}</div>
                      {act.historinha && (
                        <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                          {act.historinha.length > 85 ? act.historinha.substring(0, 85) + '...' : act.historinha}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid ' + (s === 'pendente' ? '#e5e7eb' : cfg.border + '40') }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>
                      ⏱ ~{act.tempo_estimado}min • +{act.xp_reward} XP • +{act.coins_reward} 💰
                    </div>
                    {s !== 'pendente' && (
                      <button onClick={() => iniciarAtividade(act)} style={{
                        background: s === 'concluido' ? '#10b981' : '#F07A20',
                        border: 'none', borderRadius: '8px', padding: '7px 14px',
                        color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '12px',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}>
                        {s === 'concluido' ? '✅ Revisar' : 'Começar →'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Desafio da semana */}
            {filtroTipo === 'todos' && (
              <div style={{ background: desafioReivindicado ? '#f0fdf4' : '#fffbeb', borderRadius: '18px', padding: '18px', border: `1.5px solid ${desafioReivindicado ? '#86efac' : '#fcd34d'}` }}>
                <div style={{ fontSize: '10px', color: desafioReivindicado ? '#15803d' : '#d97706', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>⭐ Desafio da Semana</div>
                <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '4px', color: '#0f0a1e' }}>Completar todas as atividades</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>Complete todas as {total} atividades da sua trilha esta semana para ganhar o bônus máximo!</div>
                {desafioReivindicado ? (
                  <div style={{ fontSize: '13px', color: '#15803d', fontWeight: '800' }}>✅ Bônus já resgatado esta semana!</div>
                ) : totalConcluidas === total && total > 0 ? (
                  <button onClick={reivindicarDesafio} style={{ background: 'linear-gradient(135deg, #F07A20, #ea580c)', border: 'none', borderRadius: '10px', padding: '10px 20px', color: 'white', fontWeight: '800', fontSize: '14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    🏆 Resgatar +500 XP e +500 Coins!
                  </button>
                ) : (
                  <div style={{ fontSize: '13px', color: '#d97706', fontWeight: '800' }}>🏆 +500 XP • +500 NeuralCoins — complete tudo! ({totalConcluidas}/{total})</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── BOTTOM MENU ── */}
        <div className="menu-bottom">
          {menu.map(item => (
            <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
              style={{ color: item.path === '/trilha' ? '#7C3AED' : '#9ca3af' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontWeight: item.path === '/trilha' ? '700' : '500' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
