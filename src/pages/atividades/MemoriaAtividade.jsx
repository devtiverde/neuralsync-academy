import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import '../../styles/crianca.css'

function embaralhar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function criarCartas(pares) {
  const items = pares.map(p => typeof p === 'string' ? { emoji: p, nome: '', info: '' } : p)
  return embaralhar([...items, ...items].map((item, id) => ({
    id, emoji: item.emoji, nome: item.nome || '', info: item.info || '',
    virada: false, encontrada: false,
  })))
}

export default function MemoriaAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [cartas, setCartas] = useState([])
  const [abertaIdx, setAbertaIdx] = useState(null)
  const [bloqueado, setBloqueado] = useState(false)
  const [movimentos, setMovimentos] = useState(0)
  const [paresEncontrados, setParesEncontrados] = useState(0)
  const [tempo, setTempo] = useState(0)
  const [ganhou, setGanhou] = useState(false)

  useEffect(() => {
    if (!atividade) { navigate('/trilha'); return }
    setCartas(criarCartas(atividade.pares))
  }, [])

  useEffect(() => {
    if (!iniciou || ganhou) return
    const t = setInterval(() => setTempo(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [iniciou, ganhou])

  useEffect(() => {
    if (!atividade || paresEncontrados === 0) return
    if (paresEncontrados === atividade.pares.length) {
      setTimeout(() => setGanhou(true), 600)
    }
  }, [paresEncontrados])

  const clicarCarta = useCallback((idx) => {
    if (bloqueado) return
    if (cartas[idx].virada || cartas[idx].encontrada) return
    if (abertaIdx === idx) return

    const novas = cartas.map((c, i) => i === idx ? { ...c, virada: true } : c)
    setCartas(novas)

    if (abertaIdx === null) {
      setAbertaIdx(idx)
      return
    }

    setMovimentos(m => m + 1)
    setBloqueado(true)

    if (cartas[abertaIdx].emoji === cartas[idx].emoji) {
      setTimeout(() => {
        setCartas(prev => prev.map((c, i) =>
          i === idx || i === abertaIdx ? { ...c, virada: false, encontrada: true } : c
        ))
        setParesEncontrados(p => p + 1)
        setAbertaIdx(null)
        setBloqueado(false)
      }, 500)
    } else {
      setTimeout(() => {
        setCartas(prev => prev.map((c, i) =>
          i === idx || i === abertaIdx ? { ...c, virada: false } : c
        ))
        setAbertaIdx(null)
        setBloqueado(false)
      }, 1000)
    }
  }, [cartas, abertaIdx, bloqueado])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/trilha')} />

  function reiniciar() {
    setCartas(criarCartas(atividade.pares))
    setAbertaIdx(null)
    setBloqueado(false)
    setMovimentos(0)
    setParesEncontrados(0)
    setTempo(0)
    setGanhou(false)
  }

  const totalPares = atividade.pares.length
  const estrelas = movimentos <= totalPares + 2 ? 3 : movimentos <= totalPares * 2 ? 2 : 1
  const xpGanho = Math.round((estrelas / 3) * atividade.xp_reward)
  const coinsGanho = Math.round((estrelas / 3) * atividade.coins_reward)
  const min = String(Math.floor(tempo / 60)).padStart(2, '0')
  const seg = String(tempo % 60).padStart(2, '0')

  const cols = totalPares <= 4 ? 4 : totalPares <= 6 ? 4 : 4

  if (ganhou) {
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
        <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '8px', letterSpacing: '4px' }}>{'⭐'.repeat(estrelas)}</div>
          <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '6px', color: '#0f0a1e' }}>
            {estrelas === 3 ? 'Perfeito! 🧠' : estrelas === 2 ? 'Muito bem! 👏' : 'Concluído! 💪'}
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '28px', fontSize: '14px' }}>
            Todos os pares encontrados!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', width: '100%' }}>
            {[
              ['+' + xpGanho, 'XP ganho', '#7C3AED'],
              ['+' + coinsGanho + ' 💰', 'Coins', '#F07A20'],
              [movimentos, 'Movimentos', '#10b981'],
              [min + ':' + seg, 'Tempo', '#3b82f6'],
            ].map(([val, label, cor]) => (
              <div key={label} className="card-white" style={{ padding: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: cor }}>{val}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button onClick={reiniciar} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              🔁 Repetir
            </button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo } })} className="btn-purple" style={{ flex: 1 }}>
              Concluir ✓
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ paddingBottom: '24px' }}>

        <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/trilha')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900' }}>{atividade.titulo}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>{atividade.descricao}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: '18px', fontWeight: '900', lineHeight: 1 }}>{min}:{seg}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>tempo</div>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', gap: '10px' }}>
            <div className="card-white" style={{ flex: 1, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#7C3AED' }}>{movimentos}</div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600' }}>MOVIMENTOS</div>
            </div>
            <div className="card-white" style={{ flex: 1, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#10b981' }}>{paresEncontrados}/{totalPares}</div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600' }}>PARES</div>
            </div>
            <div className="card-white" style={{ flex: 1, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#F07A20' }}>+{atividade.xp_reward}</div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600' }}>XP</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px' }}>
            {cartas.map((carta, idx) => {
              const mostrar = carta.virada || carta.encontrada
              return (
                <div key={carta.id} onClick={() => clicarCarta(idx)} style={{ perspective: '600px', cursor: carta.encontrada ? 'default' : 'pointer' }}>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    transformStyle: 'preserve-3d',
                    transform: mostrar ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.35s ease',
                  }}>
                    {/* Frente (face down) */}
                    <div style={{
                      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, #7C3AED, #a855f7)',
                      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px', color: 'rgba(255,255,255,0.5)', fontWeight: '900',
                      boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
                    }}>
                      🧩
                    </div>
                    {/* Verso (face up) */}
                    <div style={{
                      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: carta.encontrada ? '#f0fdf4' : 'white',
                      borderRadius: '12px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      border: '2px solid ' + (carta.encontrada ? '#10b981' : '#7C3AED'),
                      boxShadow: carta.encontrada ? '0 2px 8px rgba(16,185,129,0.2)' : '0 2px 8px rgba(124,58,237,0.2)',
                      padding: '4px',
                      gap: '2px',
                    }}>
                      <div style={{ fontSize: carta.nome ? '22px' : '28px', lineHeight: 1 }}>{carta.emoji}</div>
                      {carta.nome && <div style={{ fontSize: '8px', fontWeight: '800', color: carta.encontrada ? '#065f46' : '#7C3AED', textAlign: 'center', lineHeight: 1.2 }}>{carta.nome}</div>}
                      {carta.info && carta.encontrada && <div style={{ fontSize: '7px', color: '#9ca3af', textAlign: 'center', lineHeight: 1.2 }}>{carta.info}</div>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {totalPares > 4 && (
            <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px', marginTop: '16px', fontWeight: '500' }}>
              Toque nas cartas para virá-las e encontrar os pares! 🧠
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
