import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { atividadesPorFaixa, fase2PorFaixa, fase3PorFaixa, tipoConfig } from '../../data/atividadesData'
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

export default function HomeCrianca() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [atividades, setAtividades] = useState([])
  const [historico, setHistorico] = useState([])

  useEffect(() => {
    supabase.from('children').select('*').limit(1).then(({ data }) => {
      const c = data?.[0]
      setChild(c)
      if (c) {
        localStorage.setItem('ns_active_child', JSON.stringify(c))
        const f = c.faixa_etaria || 'construtores'
        const fase1 = atividadesPorFaixa[f] || atividadesPorFaixa.construtores
        const fase2 = fase2PorFaixa[f]     || fase2PorFaixa.construtores
        const fase3 = fase3PorFaixa[f]     || []
        setAtividades([...fase1, ...fase2, ...fase3])
      }
    })
    const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
    setHistorico(hist.slice(0, 4))
  }, [])

  const contsPorTipo = useMemo(() => {
    const c = {}
    atividades.forEach(a => { c[a.tipo] = (c[a.tipo] || 0) + 1 })
    return c
  }, [atividades])

  const missaoAtual = atividades[0]

  if (!child) return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ color: '#7C3AED', fontWeight: '700' }}>Carregando...</div>
    </div>
  )

  const xpPercent = Math.min((child.xp / (child.nivel * 500)) * 100, 100)
  const faixa = child.faixa_etaria || 'construtores'

  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ paddingBottom: '90px' }}>

        {/* ── HEADER ── */}
        <div className="header-gradient">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '3px', fontWeight: '600' }}>
                {nomeFaixa[faixa]}
              </p>
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                Olá, {child.nome}! 🚀
              </h2>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 14px', textAlign: 'right' }}>
              <div style={{ color: 'white', fontWeight: '900', fontSize: '16px' }}>💰 {child.neural_coins}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '500' }}>NeuralCoins</div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginBottom: '7px', fontWeight: '500' }}>
              <span>Nível {child.nivel} → {child.nivel + 1}</span>
              <span style={{ color: 'white', fontWeight: '700' }}>{child.xp} / {child.nivel * 500} XP</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '999px', height: '7px', overflow: 'hidden' }}>
              <div style={{ background: 'white', width: xpPercent + '%', height: '100%', borderRadius: '999px', transition: 'width 0.5s ease' }} />
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 16px 0' }}>

          {/* ── STREAK ── */}
          <div style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', borderRadius: '16px', padding: '14px 16px', marginBottom: '12px', border: '1.5px solid #fed7aa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#ea580c' }}>🔥 {child.streak_atual} dias seguidos!</div>
              <div style={{ fontSize: '12px', color: '#9a3412', marginTop: '2px' }}>Recorde: {child.streak_maximo} dias — não pare agora!</div>
            </div>
            <div style={{ fontSize: '28px' }}>⚡</div>
          </div>

          {/* ── MISSÃO DO DIA ── */}
          {missaoAtual && (
            <div style={{ background: 'white', borderRadius: '18px', padding: '18px', marginBottom: '16px', border: '2px solid #F07A20', boxShadow: '0 4px 20px rgba(240,122,32,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F07A20' }} />
                <span style={{ fontSize: '10px', color: '#F07A20', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Missão do Dia</span>
                <span style={{ background: tipoConfig[missaoAtual.tipo]?.cor + '20', color: tipoConfig[missaoAtual.tipo]?.cor, fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px', marginLeft: '4px' }}>
                  {tipoConfig[missaoAtual.tipo]?.icon} {tipoConfig[missaoAtual.tipo]?.label}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '44px', lineHeight: 1, flexShrink: 0 }}>{missaoAtual.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '900', fontSize: '16px', marginBottom: '4px', color: '#0f0a1e' }}>{missaoAtual.titulo}</div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px', lineHeight: 1.5 }}>
                    {missaoAtual.historinha?.substring(0, 90)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>
                      ⏱ ~{missaoAtual.tempo_estimado}min • +{missaoAtual.xp_reward} XP
                    </div>
                    <button onClick={() => navigate(`/atividade/${missaoAtual.tipo}`, { state: { atividade: missaoAtual } })} className="btn-orange" style={{ padding: '8px 16px', fontSize: '13px' }}>
                      Jogar agora →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── EXPLORAR TODAS AS ATIVIDADES ── */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f0a1e' }}>Explorar atividades</h3>
              <button onClick={() => navigate('/trilha')} style={{ background: 'none', border: 'none', color: '#7C3AED', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Ver trilha →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {['quiz','memoria','sequencia','labirinto','robo','padrao','quizia','inventor','blocos'].map(tipo => {
                const cfg = tipoConfig[tipo]
                const qtd = contsPorTipo[tipo] || 0
                if (!qtd) return null
                const isIA = ['quizia','inventor','blocos'].includes(tipo)
                return (
                  <button key={tipo} onClick={() => navigate('/trilha', { state: { filtroTipo: tipo } })} style={{
                    background: isIA ? 'linear-gradient(135deg, #faf5ff, #ede9fe)' : 'white',
                    border: isIA ? '1.5px solid #c4b5fd' : '1.5px solid #f0eeff',
                    borderRadius: '16px', padding: '14px 8px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                    cursor: 'pointer', boxShadow: isIA ? '0 2px 8px rgba(124,58,237,0.1)' : '0 2px 8px rgba(0,0,0,0.06)',
                    position: 'relative',
                  }}>
                    {isIA && (
                      <span style={{ position: 'absolute', top: '6px', right: '6px', background: 'linear-gradient(135deg, #7C3AED, #a855f7)', color: 'white', fontSize: '8px', fontWeight: '800', padding: '1px 5px', borderRadius: '20px' }}>IA</span>
                    )}
                    <div style={{ fontSize: '26px', lineHeight: 1 }}>{cfg.icon}</div>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: cfg.cor, textAlign: 'center', lineHeight: 1.2 }}>{cfg.label}</div>
                    <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '500' }}>{qtd} ativ.</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── CONTEÚDOS ── */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f0a1e', marginBottom: '10px' }}>Conteúdos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button onClick={() => navigate('/kids')} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', borderRadius: '16px', padding: '18px 14px', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎬</div>
                <div style={{ color: 'white', fontWeight: '800', fontSize: '14px', marginBottom: '3px' }}>Kids TV</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>Vídeos educativos</div>
              </button>
              <button onClick={() => navigate('/ebook')} style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', borderRadius: '16px', padding: '18px 14px', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📚</div>
                <div style={{ color: 'white', fontWeight: '800', fontSize: '14px', marginBottom: '3px' }}>Ebooks</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>Leitura interativa</div>
              </button>
            </div>
          </div>

          {/* ── HISTÓRICO ── */}
          {historico.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f0a1e', marginBottom: '10px' }}>Últimas atividades</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {historico.map((item, i) => {
                  const tc = tipoConfig[item.tipo]
                  return (
                    <div key={i} className="card-white" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ fontSize: '28px', lineHeight: 1 }}>{item.emoji || '⭐'}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '13px', color: '#0f0a1e' }}>{item.titulo}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{item.data}</div>
                      </div>
                      {tc && (
                        <div style={{ background: tc.cor + '20', color: tc.cor, fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                          {tc.icon} {tc.label}
                        </div>
                      )}
                      <div style={{ color: '#10b981', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap' }}>+{item.xp} XP</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── PROGRESSO ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f0a1e' }}>Meu progresso</h3>
              <button onClick={() => navigate('/trilha')} style={{ background: 'none', border: 'none', color: '#7C3AED', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Ver trilha →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[
                [child.xp, 'XP Total', '#7C3AED', '⭐'],
                [child.streak_maximo + '🔥', 'Maior streak', '#F07A20', ''],
                [atividades.length, 'Atividades', '#10b981', '🗺️'],
              ].map(([val, label, cor, icon]) => (
                <div key={label} className="card-white" style={{ padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', marginBottom: '4px' }}>{icon}</div>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: cor }}>{val}</div>
                  <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '500', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RANKING TEASER ── */}
          <div className="card-white" style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500', marginBottom: '3px' }}>🏆 Ranking da semana</div>
              <div style={{ fontWeight: '800', fontSize: '15px', color: '#F07A20' }}>Você está em 2º lugar! 🥈</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '1px' }}>Continue ganhando NeuralCoins!</div>
            </div>
            <button onClick={() => navigate('/ranking')} style={{ background: '#faf5ff', border: '1px solid #ede9fe', borderRadius: '8px', padding: '7px 12px', color: '#7C3AED', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>Ver →</button>
          </div>
        </div>

        {/* ── BOTTOM MENU ── */}
        <div className="menu-bottom">
          {menu.map(item => (
            <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
              style={{ color: item.path === '/home-crianca' ? '#7C3AED' : '#9ca3af' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontWeight: item.path === '/home-crianca' ? '700' : '500' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
