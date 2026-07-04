import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutCrianca from '../../components/LayoutCrianca'
import { AVATAR_MAP } from '../../lib/avatars'
import { Trophy } from '@phosphor-icons/react'
import '../../styles/crianca.css'

const avatarPadrao = ['🦊', '👧', '👦', '🐱', '🐶', '🦁', '🐸', '🐧', '🦄', '🦉']
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

  function carregarRanking() {
    supabase.from('ranking_view').select('id,nome,xp,neural_coins,nivel,faixa_etaria,streak_atual,avatar').then(({ data, error }) => {
      if (!error) setCriancas(data || [])
      setLoading(false)
    })
  }

  useEffect(() => {
    if (!temAcesso) return
    carregarRanking()
    const onVisible = () => { if (document.visibilityState === 'visible') carregarRanking() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [temAcesso])

  const activeChild = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const activeId = activeChild?.id
  const meuTitulo = (() => { try { return activeId ? JSON.parse(localStorage.getItem(`ns_titulo_${activeId}`) || 'null') : null } catch { return null } })()

  const rankeia = (arr) => [...arr]
    .filter(c => faixaFiltro === 'todos' || normalizarFaixa(c.faixa_etaria) === faixaFiltro)
    .sort((a, b) => aba === 'coins' ? b.neural_coins - a.neural_coins : b.xp - a.xp)

  const ranked = rankeia(criancas)
  const top3 = ranked.slice(0, 3)
  const resto = ranked.slice(3)
  const podioOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3
  const podioRealPos = top3.length === 3 ? [1, 0, 2] : [0, 1, 2]
  const minhaPosicao = ranked.findIndex(c => c.id === activeId) + 1
  const eu = ranked.find(c => c.id === activeId)

  const medals = ['🥇', '🥈', '🥉']
  const podioColors = ['#f59e0b', '#7C3AED', '#78716c']

  if (!temAcesso) return (
    <LayoutCrianca child={activeChild}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '40px', textAlign: 'center' }}>
        <Trophy weight="duotone" size={72} color="#F59E0B" className="ns-icon-bounce" style={{ marginBottom: '20px' }} />
        <div style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '99px', padding: '6px 18px', fontSize: '12px', color: '#a78bfa', fontWeight: '700', marginBottom: '20px', letterSpacing: '0.5px' }}>PLANO FAMÍLIA OU PREMIUM</div>
        <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '12px', color: 'white' }}>Ranking disponível<br />no Plano Família</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: '1.7', marginBottom: '32px', maxWidth: '300px' }}>Compare o desempenho com outras famílias e suba no ranking global!</p>
        <button onClick={() => navigate('/planos')} style={{ background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', border: 'none', borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(124,58,237,0.4)' }}>
          Ver planos →
        </button>
      </div>
    </LayoutCrianca>
  )

  if (loading) return (
    <LayoutCrianca child={activeChild}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div style={{ color: '#a78bfa', fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', gap: 6 }}>Carregando ranking... <Trophy weight="duotone" size={20} color="#F59E0B" className="ns-icon-bounce" /></div>
      </div>
    </LayoutCrianca>
  )

  return (
    <LayoutCrianca child={activeChild}>
      <div style={{ minHeight: '100vh' }}>

        {/* ── HEADER ────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #3b0764 0%, #5b21b6 60%, #7C3AED 100%)',
          padding: '28px 32px', boxShadow: '0 4px 24px rgba(124,58,237,0.3)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 8 }}>Ranking da Semana <Trophy weight="duotone" size={22} color="#F59E0B" className="ns-icon-bounce" /></h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '20px' }}>Ranking geral acumulado</p>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {['todos', 'exploradores', 'construtores', 'criadores', 'inventores'].map(f => (
                <button key={f} onClick={() => setFaixaFiltro(f)} style={{
                  borderRadius: '99px', padding: '8px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                  background: faixaFiltro === f ? 'white' : 'rgba(255,255,255,0.12)',
                  color: faixaFiltro === f ? '#7C3AED' : 'rgba(255,255,255,0.7)',
                  border: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: faixaFiltro === f ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                  transition: 'all 0.15s',
                }}>{f === 'todos' ? 'Todos' : faixaLabel[f]}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ──────────────────────────────────────── */}
        <div style={{ background: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex' }}>
            {[['coins', '💰 NeuralCoins'], ['xp', '⭐ XP Total']].map(([k, l]) => (
              <button key={k} onClick={() => setAba(k)} style={{
                flex: 1, padding: '14px', background: 'none', border: 'none',
                color: aba === k ? 'white' : 'rgba(255,255,255,0.35)',
                fontWeight: aba === k ? '800' : '500',
                borderBottom: aba === k ? '2px solid #7C3AED' : '2px solid transparent',
                fontSize: '14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.15s',
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '28px 32px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* ── PÓDIO ─────────────────────────────────── */}
            {top3.length >= 2 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '14px', marginBottom: '28px', padding: '0 20px' }}>
                {podioOrder.map((item, podioIdx) => {
                  const realPos = podioRealPos[podioIdx]
                  const isEu = item.id === activeId
                  const isFirst = realPos === 0
                  const cor = podioColors[realPos]
                  return (
                    <div key={item.id} style={{
                      flex: 1, maxWidth: isFirst ? '240px' : '190px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      background: isEu ? 'rgba(124,58,237,0.18)' : `rgba(255,255,255,0.04)`,
                      borderRadius: '22px',
                      padding: `${isFirst ? 28 : 20}px 16px ${isFirst ? 22 : 16}px`,
                      border: `1px solid ${isEu ? 'rgba(124,58,237,0.45)' : cor + '30'}`,
                      boxShadow: isFirst ? `0 8px 32px ${cor}18` : `0 4px 16px rgba(0,0,0,0.15)`,
                      minHeight: isFirst ? '180px' : '150px',
                      cursor: 'default',
                    }}>
                      <div style={{ fontSize: isFirst ? '34px' : '26px', marginBottom: '10px' }}>{medals[realPos]}</div>
                      <div style={{
                        width: isFirst ? '58px' : '48px', height: isFirst ? '58px' : '48px',
                        borderRadius: '50%', background: `${cor}22`, border: `2px solid ${cor}55`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: isFirst ? '34px' : '28px', marginBottom: '10px',
                        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
                      }}>
                        {resolverAvatar(item.avatar, item.nome)}
                      </div>
                      <div style={{ fontWeight: '800', fontSize: isFirst ? '15px' : '13px', color: isEu ? '#a78bfa' : 'white', marginBottom: isEu && meuTitulo ? '3px' : '6px', textAlign: 'center', lineHeight: 1.2 }}>
                        {item.nome}{isEu ? ' 👑' : ''}
                      </div>
                      {isEu && meuTitulo && (
                        <div style={{ fontSize: '10px', color: '#fbbf24', fontWeight: '700', marginBottom: '5px', textAlign: 'center' }}>
                          {meuTitulo.emoji} {meuTitulo.nome}
                        </div>
                      )}
                      <div style={{ fontSize: isFirst ? '15px' : '13px', color: cor, fontWeight: '900' }}>
                        {aba === 'coins' ? '💰 ' + item.neural_coins : '⭐ ' + item.xp}
                      </div>
                      {item.streak_atual > 0 && (
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '5px' }}>🔥 {item.streak_atual} dias</div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* ── SUA POSIÇÃO (destaque quando fora do pódio) ── */}
            {eu && minhaPosicao > 3 && (
              <div style={{
                background: 'rgba(124,58,237,0.1)', border: '2px solid rgba(124,58,237,0.35)',
                borderRadius: '16px', padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px',
                boxShadow: '0 4px 20px rgba(124,58,237,0.12)',
              }}>
                <div style={{ width: '36px', fontWeight: '800', color: '#a78bfa', fontSize: '16px', textAlign: 'center', flexShrink: 0 }}>#{minhaPosicao}</div>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>{resolverAvatar(eu.avatar, eu.nome)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#a78bfa' }}>{eu.nome} (você)</div>
                  {meuTitulo && <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '700', marginTop: '1px' }}>{meuTitulo.emoji} {meuTitulo.nome}</div>}
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>🔥 {eu.streak_atual || 0} streak • Nível {eu.nivel}</div>
                </div>
                <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '15px', flexShrink: 0 }}>
                  {aba === 'coins' ? '💰 ' + eu.neural_coins : '⭐ ' + eu.xp}
                </div>
              </div>
            )}

            {/* ── LISTA 4+ ──────────────────────────────── */}
            {resto.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {resto.map((item, i) => {
                  const pos = i + 4
                  const isEu = item.id === activeId
                  return (
                    <div key={item.id} style={{
                      padding: '13px 18px', display: 'flex', alignItems: 'center', gap: '14px',
                      background: isEu ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.04)',
                      borderRadius: '14px',
                      border: `1px solid ${isEu ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.07)'}`,
                      transition: 'background 0.12s',
                    }}
                      onMouseOver={e => { e.currentTarget.style.background = isEu ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.07)' }}
                      onMouseOut={e => { e.currentTarget.style.background = isEu ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.04)' }}
                    >
                      <div style={{ width: '32px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', fontSize: '14px', textAlign: 'center', flexShrink: 0 }}>#{pos}</div>
                      <div style={{ fontSize: '26px', flexShrink: 0 }}>{resolverAvatar(item.avatar, item.nome)}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: isEu ? '#a78bfa' : 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.nome}{isEu ? ' (você)' : ''}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.32)', marginTop: '2px' }}>
                          {faixaLabel[normalizarFaixa(item.faixa_etaria)] || item.faixa_etaria} • Nível {item.nivel}
                        </div>
                      </div>
                      <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
                        {aba === 'coins' ? '💰 ' + item.neural_coins : '⭐ ' + item.xp}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {ranked.length === 0 && (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
                <Trophy weight="duotone" size={48} color="#F59E0B" className="ns-icon-bounce" style={{ marginBottom: '14px' }} />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Nenhum participante nesta faixa ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutCrianca>
  )
}
