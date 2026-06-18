import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import '../../styles/crianca.css'

const DIRS = { '↑': [-1, 0], '↓': [1, 0], '←': [0, -1], '→': [0, 1] }

// Expand REPETIR blocks: 'R3' after a move repeats that move 3× total
function expandirPrograma(programa) {
  const out = []
  for (const b of programa) {
    if (b.startsWith('R')) {
      const n = parseInt(b.slice(1))
      const prev = out.length > 0 ? out[out.length - 1] : null
      if (prev) {
        out.pop()
        for (let j = 0; j < n; j++) out.push(prev)
      }
    } else {
      out.push(b)
    }
  }
  return out
}

const moveConfig = {
  '↑': { label: 'CIMA',    cor: '#7C3AED' },
  '↓': { label: 'BAIXO',   cor: '#7C3AED' },
  '←': { label: 'ESQ',     cor: '#7C3AED' },
  '→': { label: 'DIR',     cor: '#7C3AED' },
}

export default function BlocosAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [nivelIdx, setNivelIdx] = useState(0)
  const [programa, setPrograma] = useState([])
  const [posRobo, setPosRobo] = useState(null)
  const [animPath, setAnimPath] = useState([])
  const [animIdx, setAnimIdx] = useState(0)
  const [animando, setAnimando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [nivelsConcluidos, setNiveisConcluidos] = useState(0)

  useEffect(() => {
    if (!atividade) navigate('/trilha')
  }, [])

  useEffect(() => {
    if (!atividade) return
    const nivel = atividade.niveis?.[nivelIdx]
    if (nivel) setPosRobo([...nivel.inicio])
  }, [nivelIdx, atividade])

  useEffect(() => {
    if (!animando) return
    if (animIdx >= animPath.length) { setAnimando(false); return }
    const timer = setTimeout(() => {
      const step = animPath[animIdx]
      if (step.pos) setPosRobo([...step.pos])
      if (step.fim) {
        setResultado(step.fim)
        setAnimando(false)
        if (step.fim === 'sucesso') setNiveisConcluidos(n => n + 1)
        return
      }
      setAnimIdx(i => i + 1)
    }, 380)
    return () => clearTimeout(timer)
  }, [animando, animIdx, animPath])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/trilha')} />

  const nivel = atividade.niveis?.[nivelIdx]
  if (!nivel || posRobo === null) return null

  const { grade, inicio, fim, paredes, passos_max, dica } = nivel
  const celSize = Math.max(32, Math.floor(270 / grade))
  const maxR = grade - 1
  const repetirOpcoes = Array.from({ length: maxR - 1 }, (_, i) => `R${i + 2}`)

  function isParede(r, c) {
    return (paredes || []).some(([pr, pc]) => pr === r && pc === c)
  }

  function adicionarBloco(b) {
    if (animando) return
    if (programa.length >= passos_max) return
    setPrograma(p => [...p, b])
  }

  function executar() {
    if (animando || programa.length === 0) return
    const expandido = expandirPrograma(programa)
    const path = []
    let pos = [...inicio]
    let terminouCom = null

    for (const cmd of expandido) {
      const [dr, dc] = DIRS[cmd] || [0, 0]
      const nr = pos[0] + dr
      const nc = pos[1] + dc
      if (nr < 0 || nr >= grade || nc < 0 || nc >= grade || isParede(nr, nc)) {
        path.push({ pos: [...pos], fim: 'falhou' })
        terminouCom = 'falhou'
        break
      }
      pos = [nr, nc]
      path.push({ pos: [...pos] })
      if (pos[0] === fim[0] && pos[1] === fim[1]) {
        path.push({ pos: [...pos], fim: 'sucesso' })
        terminouCom = 'sucesso'
        break
      }
    }

    if (!terminouCom) path.push({ pos: [...pos], fim: 'incompleto' })

    setResultado(null)
    setAnimPath(path)
    setAnimIdx(0)
    setAnimando(true)
  }

  function resetar() {
    setPosRobo([...nivel.inicio])
    setPrograma([])
    setResultado(null)
    setAnimando(false)
    setAnimIdx(0)
    setAnimPath([])
  }

  function proximoNivel() {
    if (nivelIdx + 1 < atividade.niveis.length) {
      setNivelIdx(n => n + 1)
      setPrograma([])
      setResultado(null)
      setAnimando(false)
    } else {
      navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo } })
    }
  }

  const hasMoreNiveis = nivelIdx + 1 < atividade.niveis.length

  function blocoDisplay(b, idx, highlight) {
    const isRepetir = b.startsWith('R')
    const n = isRepetir ? b.slice(1) : null
    return (
      <div key={idx} style={{
        background: isRepetir ? '#F07A20' : highlight ? '#c4b5fd' : '#7C3AED',
        color: 'white', borderRadius: '8px', padding: '4px 10px',
        fontSize: isRepetir ? '11px' : '16px', fontWeight: '800',
        opacity: highlight ? 0.65 : 1, transition: 'all 0.2s',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        lineHeight: 1.1, minWidth: isRepetir ? '40px' : '36px',
      }}>
        {isRepetir ? (<><span style={{ fontSize: '14px' }}>🔁</span><span>×{n}</span></>) : b}
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
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Nível {nivelIdx + 1} de {atividade.niveis.length} • Grade {grade}×{grade}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 10px', color: 'white', fontSize: '12px', fontWeight: '700' }}>+{atividade.xp_reward} XP</div>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>

          {/* Grid */}
          <div className="card-white" style={{ padding: '12px', display: 'inline-block' }}>
            {Array.from({ length: grade }, (_, r) => (
              <div key={r} style={{ display: 'flex' }}>
                {Array.from({ length: grade }, (_, c) => {
                  const isPlayer = posRobo[0] === r && posRobo[1] === c
                  const isFim = fim[0] === r && fim[1] === c
                  const isInicio = inicio[0] === r && inicio[1] === c
                  const isPar = isParede(r, c)
                  return (
                    <div key={c} style={{
                      width: celSize, height: celSize,
                      background: isPar ? '#1e1b4b' : isPlayer ? '#ede9fe' : isFim ? '#fef9c3' : isInicio && !isPlayer ? '#f0fdf4' : '#f9fafb',
                      border: '1px solid #e5e7eb', borderRadius: '5px', margin: '1px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: celSize * 0.45, transition: 'background 0.15s ease',
                    }}>
                      {isPlayer ? (resultado === 'falhou' ? '💥' : '🧒') : isFim ? '🏆' : ''}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Dica */}
          {dica && !resultado && (
            <div style={{ background: '#fef9c3', border: '1px solid #fbbf24', borderRadius: '10px', padding: '10px 14px', width: '100%', fontSize: '12px', color: '#78350f', fontWeight: '600' }}>
              💡 {dica}
            </div>
          )}

          {/* Programa */}
          <div className="card-white" style={{ padding: '12px', width: '100%' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Programa ({programa.length}/{passos_max})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '40px', alignItems: 'center' }}>
              {programa.length === 0
                ? <span style={{ color: '#9ca3af', fontSize: '13px', fontStyle: 'italic' }}>Adicione blocos abaixo...</span>
                : programa.map((b, i) => blocoDisplay(b, i, i < animIdx && animando))
              }
            </div>
          </div>

          {/* Resultado */}
          {resultado && (
            <div style={{
              width: '100%', padding: '14px 16px', borderRadius: '14px', textAlign: 'center',
              background: resultado === 'sucesso' ? '#f0fdf4' : resultado === 'falhou' ? '#fef2f2' : '#fefce8',
              border: '2px solid ' + (resultado === 'sucesso' ? '#10b981' : resultado === 'falhou' ? '#ef4444' : '#fbbf24'),
              fontSize: '15px', fontWeight: '700',
              color: resultado === 'sucesso' ? '#065f46' : resultado === 'falhou' ? '#991b1b' : '#78350f',
            }}>
              {resultado === 'sucesso'    && '🎉 Perfeito! Programa executado com sucesso!'}
              {resultado === 'falhou'     && '💥 O personagem bateu em uma parede! Tente de novo.'}
              {resultado === 'incompleto' && '🤔 O programa terminou mas não chegou ao destino.'}
            </div>
          )}

          {/* Controles */}
          {!resultado ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Move blocks */}
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Movimento</div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  {['↑', '↓', '←', '→'].map(dir => (
                    <button key={dir} onClick={() => adicionarBloco(dir)} disabled={programa.length >= passos_max} style={{
                      width: '58px', height: '58px', borderRadius: '12px',
                      background: programa.length >= passos_max ? '#d1d5db' : '#7C3AED',
                      border: 'none', color: 'white', fontSize: '20px', cursor: programa.length >= passos_max ? 'not-allowed' : 'pointer',
                      fontWeight: '700', boxShadow: '0 3px 8px rgba(124,58,237,0.3)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1px',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}>
                      <span style={{ fontSize: '18px', lineHeight: 1 }}>{dir}</span>
                      <span style={{ fontSize: '8px', fontWeight: '800', opacity: 0.8 }}>{moveConfig[dir].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Repeat blocks */}
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Repetir (multiplica o bloco anterior)</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {repetirOpcoes.map(r => (
                    <button key={r} onClick={() => adicionarBloco(r)} disabled={programa.length >= passos_max} style={{
                      height: '48px', padding: '0 12px', borderRadius: '12px',
                      background: programa.length >= passos_max ? '#d1d5db' : '#F07A20',
                      border: 'none', color: 'white', cursor: programa.length >= passos_max ? 'not-allowed' : 'pointer',
                      fontWeight: '800', boxShadow: '0 3px 8px rgba(240,122,32,0.3)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1px',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}>
                      <span style={{ fontSize: '14px', lineHeight: 1 }}>🔁</span>
                      <span style={{ fontSize: '10px', fontWeight: '900' }}>×{r.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setPrograma(p => p.slice(0, -1))} disabled={programa.length === 0} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px', color: '#6b7280', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px' }}>⌫ Apagar</button>
                <button onClick={resetar} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px', color: '#6b7280', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px' }}>🔄 Limpar</button>
                <button onClick={executar} disabled={programa.length === 0 || animando} className="btn-purple" style={{ flex: 1.5, padding: '10px', fontSize: '14px' }}>
                  {animando ? '▶ ...' : '▶ Executar'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <button onClick={resetar} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>🔄 Tentar de novo</button>
              {resultado === 'sucesso' && (
                <button onClick={proximoNivel} className="btn-purple" style={{ flex: 1 }}>
                  {hasMoreNiveis ? 'Próximo nível →' : 'Concluir ✓'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
