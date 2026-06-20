import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/crianca.css'

const menu = [
  { icon: '🏠', label: 'Início', path: '/home-crianca' },
  { icon: '🗺️', label: 'Trilha', path: '/trilha' },
  { icon: '🎬', label: 'Kids', path: '/kids' },
  { icon: '🏆', label: 'Ranking', path: '/ranking' },
  { icon: '🏪', label: 'Loja', path: '/loja' },
  { icon: '👤', label: 'Perfil', path: '/perfil-crianca' },
]

const avatarPadrao = ['🦊', '👧', '👦', '🐱', '🐶', '🦁', '🐸', '🐧', '🦄', '🦉']

const AVATAR_MAP = {
  'explorer':'🧭','av_explorer':'🧭','cientista':'🔬','av_cientista':'🔬',
  'astronauta':'🚀','av_astronauta':'🚀','mago':'🧙','av_mago':'🧙',
  'artista':'🎨','av_artista':'🎨','robô':'🤖','robo':'🤖','av_robo':'🤖',
  'dino':'🦕','av_dino':'🦕','ninja':'🥷','av_ninja':'🥷',
}
const resolverAvatar = (av, nome) => {
  if (!av) return avatarPadrao[(nome || '').charCodeAt(0) % avatarPadrao.length]
  return AVATAR_MAP[String(av).toLowerCase()] || av
}

const faixaLabel = { exploradores: 'Exploradores', construtores: 'Construtores', criadores: 'Criadores', inventores: 'Inventores' }
const normalizarFaixa = f => {
  const s = (f || '').toLowerCase()
  if (s.startsWith('explor')) return 'exploradores'
  if (s.startsWith('constr')) return 'construtores'
  if (s.startsWith('criad'))  return 'criadores'
  if (s.startsWith('invent')) return 'inventores'
  return f
}

export default function Ranking() {
  const navigate = useNavigate()
  const { subscription } = useAuth()
  const temAcesso = subscription?.plano === 'familia' || subscription?.plano === 'premium'
  const [criancas, setCriancas] = useState([])
  const [loading, setLoading] = useState(true)
  const [faixaFiltro, setFaixaFiltro] = useState('todos')
  const [aba, setAba] = useState('coins')

  useEffect(() => {
    supabase.from('children').select('id,nome,xp,neural_coins,nivel,faixa_etaria,streak_atual,avatar').then(({ data }) => {
      setCriancas(data || [])
      setLoading(false)
    })
  }, [])

  const activeChild = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const activeId = activeChild?.id

  const rankeia = (arr) => [...arr]
    .filter(c => faixaFiltro === 'todos' || normalizarFaixa(c.faixa_etaria) === faixaFiltro)
    .sort((a, b) => aba === 'coins' ? b.neural_coins - a.neural_coins : b.xp - a.xp)

  const ranked = rankeia(criancas)
  const top3 = ranked.slice(0, 3)
  const resto = ranked.slice(3)
  const podioOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3
  const minhaPosicao = ranked.findIndex(c => c.id === activeId) + 1
  const eu = ranked.find(c => c.id === activeId)

  const medalha = (pos) => ['🥇', '🥈', '🥉'][pos] || '#' + (pos + 1)
  const medalhaEmoji = (pos) => ['🥇', '🥈', '🥉'][pos]

  if (!temAcesso) return (
    <div style={{background: '#0f0a1e', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center'}}>
      <div style={{fontSize: '72px', marginBottom: '16px'}}>🏆</div>
      <div style={{background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '999px', padding: '5px 14px', fontSize: '12px', color: '#a78bfa', fontWeight: '700', marginBottom: '16px'}}>Plano Família ou Premium</div>
      <h2 style={{color: 'white', fontSize: '24px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-0.5px'}}>Ranking disponível<br />no Plano Família</h2>
      <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px', maxWidth: '280px'}}>Compare o desempenho com outras famílias e suba no ranking!</p>
      <button onClick={() => navigate('/planos')} style={{background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', border: 'none', borderRadius: '12px', padding: '14px 28px', color: 'white', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginBottom: '12px'}}>
        Ver planos →
      </button>
      <button onClick={() => navigate('/home-crianca')} style={{background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '13px'}}>← Voltar</button>
    </div>
  )

  if (loading) return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ color: '#7C3AED', fontWeight: '700' }}>Carregando ranking...</div>
    </div>
  )

  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
    <div className="page-wrapper" style={{ paddingBottom: '90px' }}>

      <div className="header-gradient">
        <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>Ranking da Semana 🏆</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '12px' }}>Resetar em 3 dias</p>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {['todos', 'exploradores', 'construtores', 'criadores', 'inventores'].map(f => (
            <button key={f} onClick={() => setFaixaFiltro(f)} style={{
              background: faixaFiltro === f ? 'white' : 'rgba(255,255,255,0.15)',
              color: faixaFiltro === f ? '#7C3AED' : 'white',
              border: 'none', borderRadius: '20px', padding: '5px 12px',
              fontSize: '11px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>{f === 'todos' ? 'Todos' : faixaLabel[f]}</button>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', display: 'flex', borderBottom: '1px solid #f3f4f6' }}>
        {[['coins', '💰 NeuralCoins'], ['xp', '⭐ XP Total']].map(([k, l]) => (
          <button key={k} onClick={() => setAba(k)} style={{
            flex: 1, padding: '12px', background: 'none', border: 'none',
            color: aba === k ? '#7C3AED' : '#9ca3af', cursor: 'pointer',
            fontWeight: aba === k ? '700' : '500',
            borderBottom: aba === k ? '2px solid #7C3AED' : '2px solid transparent',
            fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '16px' }}>

        {/* PÓDIO */}
        {top3.length >= 2 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '8px', marginBottom: '20px', paddingTop: '8px' }}>
            {podioOrder.map((item, podioIdx) => {
              const originalPos = ranked.indexOf(item)
              const isEu = item.id === activeId
              const alturas = [70, 90, 60]
              return (
                <div key={item.id} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  background: 'white', borderRadius: '16px',
                  padding: podioIdx === 1 ? '18px 12px' : '14px 10px',
                  flex: 1, minHeight: alturas[podioIdx] + 'px',
                  border: isEu ? '2px solid #7C3AED' : '1.5px solid #f3f4f6',
                  boxShadow: isEu ? '0 4px 16px rgba(124,58,237,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ fontSize: podioIdx === 1 ? '22px' : '18px', marginBottom: '6px' }}>{medalhaEmoji(originalPos)}</div>
                  <div style={{ fontSize: podioIdx === 1 ? '32px' : '26px', marginBottom: '6px' }}>{resolverAvatar(item.avatar, item.nome)}</div>
                  <div style={{ fontWeight: '800', fontSize: '12px', color: isEu ? '#7C3AED' : '#0f0a1e', marginBottom: '4px' }}>{item.nome}{isEu ? ' (você)' : ''}</div>
                  <div style={{ fontSize: '11px', color: '#F07A20', fontWeight: '700' }}>
                    {aba === 'coins' ? '💰 ' + item.neural_coins : '⭐ ' + item.xp}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* LISTA */}
        {resto.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {resto.map((item, i) => {
              const pos = i + 4
              const isEu = item.id === activeId
              return (
                <div key={item.id} className="card-white" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', border: isEu ? '1.5px solid #7C3AED' : '1.5px solid #f3f4f6' }}>
                  <div style={{ width: '24px', fontWeight: '700', color: '#9ca3af', fontSize: '13px' }}>#{pos}</div>
                  <div style={{ fontSize: '22px' }}>{resolverAvatar(item.avatar, item.nome)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: isEu ? '#7C3AED' : '#0f0a1e' }}>{item.nome}{isEu ? ' (você)' : ''}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{faixaLabel[normalizarFaixa(item.faixa_etaria)] || item.faixa_etaria} • Nível {item.nivel}</div>
                  </div>
                  <div style={{ color: '#F07A20', fontWeight: '700', fontSize: '13px' }}>
                    {aba === 'coins' ? '💰 ' + item.neural_coins : '⭐ ' + item.xp}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* SUA POSIÇÃO */}
        {eu && minhaPosicao > 0 && (
          <div style={{ background: '#faf5ff', borderRadius: '14px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', border: '2px solid #7C3AED', marginBottom: '12px' }}>
            <div style={{ width: '24px', fontWeight: '800', color: '#7C3AED', fontSize: '13px' }}>
              {minhaPosicao <= 3 ? ['🥇','🥈','🥉'][minhaPosicao - 1] : '#' + minhaPosicao}
            </div>
            <div style={{ fontSize: '22px' }}>{resolverAvatar(eu.avatar, eu.nome)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#7C3AED' }}>{eu.nome} (você)</div>
              <div style={{ fontSize: '11px', color: '#a78bfa' }}>🔥 {eu.streak_atual || 0} dias • Nível {eu.nivel}</div>
            </div>
            <div style={{ color: '#F07A20', fontWeight: '800', fontSize: '13px' }}>
              {aba === 'coins' ? '💰 ' + eu.neural_coins : '⭐ ' + eu.xp}
            </div>
          </div>
        )}

        {ranked.length === 0 && (
          <div className="card-white" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
            <p style={{ color: '#9ca3af', fontWeight: '600' }}>Nenhum participante nesta faixa ainda.</p>
          </div>
        )}
      </div>

      <div className="menu-bottom">
        {menu.map(item => (
          <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
            style={{ color: item.path === '/ranking' ? '#7C3AED' : '#9ca3af' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontWeight: item.path === '/ranking' ? '700' : '500' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}
