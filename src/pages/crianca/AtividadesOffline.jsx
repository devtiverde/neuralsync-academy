import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { temPlano, assinaturaCarregando, PLANOS_PAGOS } from '../../lib/assinatura'
import { categoriasOffline, atividadesOffline } from '../../data/atividadesOffline'
import { creditarBonus, aplicarNoFilhoLocal } from '../../lib/economia'
import LayoutCrianca from '../../components/LayoutCrianca'
import '../../styles/crianca.css'

const COINS_POR_ATIVIDADE = 15
const LS_KEY = 'ns_offline_feitas'

function getFeitasDoChild(childId) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    return all[childId] || []
  } catch { return [] }
}

function salvarFeita(childId, atividadeId) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    const feitas = all[childId] || []
    if (!feitas.includes(atividadeId)) feitas.push(atividadeId)
    all[childId] = feitas
    localStorage.setItem(LS_KEY, JSON.stringify(all))
  } catch {}
}

const DIFICULDADE_COLOR = {
  'fácil': '#10b981',
  'médio': '#f59e0b',
  'difícil': '#ef4444',
}

const TEMPO_FILTROS = [
  { label: 'Todos', value: 0 },
  { label: '≤ 15 min', value: 15 },
  { label: '≤ 30 min', value: 30 },
  { label: '1 hora', value: 60 },
]

function CardAtividade({ atividade, feita, onFazer }) {
  const [expandido, setExpandido] = useState(false)

  return (
    <div style={{
      background: feita ? 'rgba(16,185,129,0.07)' : 'rgba(255,255,255,0.04)',
      border: feita ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: '18px',
      padding: '22px 24px',
      transition: 'all 0.2s',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {feita && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          background: '#10b981', borderRadius: '50%',
          width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', color: 'white', fontWeight: '900',
        }}>✓</div>
      )}

      {/* Header do card */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '14px' }}>
        <div style={{ fontSize: '40px', lineHeight: 1, flexShrink: 0 }}>{atividade.emoji}</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'white', fontWeight: '800', fontSize: '16px', margin: '0 0 8px', lineHeight: 1.3 }}>{atividade.titulo}</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(124,58,237,0.25)', color: '#a78bfa',
              fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '99px',
            }}>⏱ {atividade.tempo} min</span>
            <span style={{
              background: `${DIFICULDADE_COLOR[atividade.dificuldade]}22`,
              color: DIFICULDADE_COLOR[atividade.dificuldade],
              fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '99px',
            }}>{atividade.dificuldade}</span>
          </div>
        </div>
      </div>

      {/* Materiais */}
      <div style={{ marginBottom: '14px' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Materiais</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {atividade.materiais.map((m, i) => (
            <span key={i} style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)', fontSize: '12px', padding: '3px 10px', borderRadius: '8px' }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Passo a passo colapsável */}
      <button
        onClick={() => setExpandido(v => !v)}
        style={{
          background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '10px', padding: '9px 16px', color: '#a78bfa',
          fontSize: '13px', fontWeight: '700', cursor: 'pointer',
          fontFamily: 'Plus Jakarta Sans, sans-serif', width: '100%', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: expandido ? '14px' : '0',
          transition: 'all 0.15s',
        }}
      >
        <span>📋 Ver passo a passo</span>
        <span style={{ fontSize: '16px', transform: expandido ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
      </button>

      {expandido && (
        <ol style={{ margin: '0 0 14px', paddingLeft: '22px', listStyle: 'decimal' }}>
          {atividade.passos.map((passo, i) => (
            <li key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.6, marginBottom: '6px' }}>{passo}</li>
          ))}
        </ol>
      )}

      {/* Botão Já fiz essa */}
      <button
        onClick={() => !feita && onFazer(atividade.id)}
        disabled={feita}
        style={{
          marginTop: '14px',
          width: '100%',
          background: feita ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, #10b981, #059669)',
          border: feita ? '1px solid rgba(16,185,129,0.3)' : 'none',
          borderRadius: '12px', padding: '12px 20px',
          color: feita ? '#10b981' : 'white',
          fontSize: '14px', fontWeight: '800',
          cursor: feita ? 'default' : 'pointer',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          transition: 'all 0.15s',
          opacity: feita ? 0.8 : 1,
        }}
      >
        {feita ? '✓ Concluída! +' + COINS_POR_ATIVIDADE + ' coins' : '🏅 Já fiz essa! +' + COINS_POR_ATIVIDADE + ' coins'}
      </button>
    </div>
  )
}

export default function AtividadesOffline() {
  const navigate = useNavigate()
  const { user, subscription, subscriptionLoaded, loading: authLoading } = useAuth()
  const [child, setChild] = useState(null)
  const [categoriaAtiva, setCategoriaAtiva] = useState('natureza')
  const [filtroTempo, setFiltroTempo] = useState(0)
  const [feitas, setFeitas] = useState([])
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    const stored = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (stored) {
      setChild(stored)
      setFeitas(getFeitasDoChild(stored.id))
    }
  }, [user])

  const LIMITE_FREE = 4
  const assinanteAtivo = temPlano(subscription, PLANOS_PAGOS)
  const carregandoPlano = assinaturaCarregando(subscriptionLoaded, authLoading)
  // Enquanto carrega, não cortamos a lista nem mostramos o aviso de bloqueio:
  // cortar aqui faria a tela "piscar" o paywall para quem paga. Assim que
  // subscriptionLoaded vira true o corte real é aplicado.
  const liberado = assinanteAtivo || carregandoPlano

  const ativadasNaCategoria = atividadesOffline.filter(a => {
    if (a.categoria !== categoriaAtiva) return false
    if (filtroTempo === 0) return true
    return a.tempo <= filtroTempo
  })
  const ativadasFiltradas = liberado ? ativadasNaCategoria : ativadasNaCategoria.slice(0, LIMITE_FREE)
  const qtdBloqueadas = liberado ? 0 : Math.max(0, atividadesOffline.filter(a => a.categoria === categoriaAtiva).length - LIMITE_FREE)

  async function marcarFeita(atividadeId) {
    if (!child) return

    salvarFeita(child.id, atividadeId)
    setFeitas(getFeitasDoChild(child.id))

    const novasCoins = (child.neural_coins || 0) + COINS_POR_ATIVIDADE
    const childAtualizado = { ...child, neural_coins: novasCoins }
    localStorage.setItem('ns_active_child', JSON.stringify(childAtualizado))
    setChild(childAtualizado)

    // valor e limite por atividade decididos no servidor (migration 023): antes esta
    // linha mandava o total de moedas, que era o caminho mais curto para inventar saldo.
    creditarBonus({ childId: child.id, tipo: 'offline', ref: atividadeId })
      .then(r => { if (r?.ok) { aplicarNoFilhoLocal(r); setChild(c => ({ ...c, neural_coins: r.coins })) } })

    setToast(`+${COINS_POR_ATIVIDADE} NeuralCoins! 🎉`)
    setTimeout(() => setToast(null), 2800)
  }

  const totalFeitas = feitas.length
  const totalAtividades = atividadesOffline.length

  return (
    <LayoutCrianca child={child}>
      <div style={{ padding: '32px 36px', maxWidth: '1000px', margin: '0 auto' }}>

        {/* Toast */}
        {toast && (
          <div style={{
            position: 'fixed', top: '90px', left: '50%', transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white', padding: '12px 28px', borderRadius: '14px',
            fontWeight: '800', fontSize: '16px', zIndex: 1000,
            boxShadow: '0 8px 32px rgba(16,185,129,0.4)',
            animation: 'ns-slide-up 0.3s ease',
          }}>
            {toast}
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
            <div style={{ fontSize: '36px' }}>🌿</div>
            <div>
              <h1 style={{ color: 'white', fontWeight: '900', fontSize: '28px', margin: 0, letterSpacing: '-0.5px' }}>Atividades Offline</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '4px 0 0' }}>Aproveite o tempo longe da tela com atividades criativas!</p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600' }}>Atividades concluídas</span>
                <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '800' }}>{totalFeitas} / {totalAtividades}</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(totalFeitas / totalAtividades) * 100}%`, background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'center' }}>
              <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '20px' }}>+{totalFeitas * COINS_POR_ATIVIDADE}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: '600' }}>COINS</div>
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
          {categoriasOffline.map(cat => {
            const ativa = cat.id === categoriaAtiva
            const qtdFeitas = atividadesOffline.filter(a => a.categoria === cat.id && feitas.includes(a.id)).length
            const qtdTotal = atividadesOffline.filter(a => a.categoria === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setCategoriaAtiva(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px', borderRadius: '12px', border: 'none',
                  background: ativa ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.06)',
                  color: ativa ? 'white' : 'rgba(255,255,255,0.6)',
                  fontWeight: ativa ? '800' : '600', fontSize: '13px',
                  cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                  transition: 'all 0.15s',
                  boxShadow: ativa ? '0 4px 16px rgba(16,185,129,0.35)' : 'none',
                }}
              >
                <span style={{ fontSize: '17px' }}>{cat.emoji}</span>
                <span>{cat.label}</span>
                {qtdFeitas > 0 && (
                  <span style={{ background: ativa ? 'rgba(255,255,255,0.25)' : 'rgba(16,185,129,0.2)', color: ativa ? 'white' : '#10b981', fontSize: '10px', fontWeight: '800', padding: '1px 7px', borderRadius: '99px' }}>
                    {qtdFeitas}/{qtdTotal}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Filtro por tempo */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '26px', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: '600', marginRight: '4px' }}>TEMPO:</span>
          {TEMPO_FILTROS.map(f => (
            <button
              key={f.value}
              onClick={() => setFiltroTempo(f.value)}
              style={{
                padding: '7px 14px', borderRadius: '8px', border: 'none',
                background: filtroTempo === f.value ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.05)',
                color: filtroTempo === f.value ? '#a78bfa' : 'rgba(255,255,255,0.45)',
                fontWeight: filtroTempo === f.value ? '700' : '500', fontSize: '12px',
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid de atividades */}
        {ativadasFiltradas.length === 0 && qtdBloqueadas === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Nenhuma atividade com esse filtro de tempo.</p>
            <button onClick={() => setFiltroTempo(0)} style={{ marginTop: '12px', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', padding: '8px 18px', borderRadius: '10px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Ver todas
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: '18px' }}>
            {ativadasFiltradas.map(ativ => (
              <CardAtividade
                key={ativ.id}
                atividade={ativ}
                feita={feitas.includes(ativ.id)}
                onFazer={marcarFeita}
              />
            ))}

            {/* Card de bloqueio premium */}
            {qtdBloqueadas > 0 && (
              <div style={{
                gridColumn: '1 / -1',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(245,158,11,0.08))',
                border: '1px dashed rgba(124,58,237,0.4)',
                borderRadius: '18px', padding: '32px 28px',
                display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
              }}>
                <div style={{ fontSize: '48px' }}>🔒</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#a78bfa', fontWeight: '900', fontSize: '16px', marginBottom: '6px' }}>
                    +{qtdBloqueadas} atividades exclusivas nesta categoria
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.5 }}>
                    No Plano Família ou Premium você desbloqueia todas as atividades offline — mais criatividade, mais diversão fora da tela!
                  </div>
                </div>
                <button
                  onClick={() => navigate('/planos')}
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #5b21b6)',
                    border: 'none', borderRadius: '12px', padding: '13px 24px',
                    color: 'white', fontWeight: '800', fontSize: '14px',
                    cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                    boxShadow: '0 4px 16px rgba(124,58,237,0.4)', whiteSpace: 'nowrap',
                  }}
                >
                  Ver planos →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </LayoutCrianca>
  )
}
