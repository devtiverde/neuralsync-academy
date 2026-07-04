import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

const DIRS = { '↑': [-1, 0], '↓': [1, 0], '←': [0, -1], '→': [0, 1] }

function expandirPrograma(programa) {
  const out = []
  for (const b of programa) {
    if (b.startsWith('R')) {
      const n = parseInt(b.slice(1))
      const prev = out.length > 0 ? out[out.length - 1] : null
      if (prev) { out.pop(); for (let j = 0; j < n; j++) out.push(prev) }
    } else {
      out.push(b)
    }
  }
  return out
}

const moveConfig = {
  '↑': { label: 'CIMA' }, '↓': { label: 'BAIXO' },
  '←': { label: 'ESQ' }, '→': { label: 'DIR' },
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
    if (!atividade) navigate(-1)
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

  useEffect(() => {
    if (!resultado) return
    if (resultado === 'sucesso') playSound('correct')
    else if (resultado === 'falhou') playSound('wrong')
  }, [resultado])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} kidsLink={getKidsLink(atividade.id)} />

  const nivel = atividade.niveis?.[nivelIdx]
  if (!nivel || posRobo === null) return null

  const { grade, inicio, fim, paredes, passos_max, dica } = nivel
  const celSize = Math.max(40, Math.floor(360 / grade))
  const maxR = grade - 1
  const repetirOpcoes = Array.from({ length: maxR - 1 }, (_, i) => `R${i + 2}`)
  const progresso = Math.round((nivelsConcluidos / atividade.niveis.length) * 100)

  function isParede(r, c) {
    return (paredes || []).some(([pr, pc]) => pr === r && pc === c)
  }

  function adicionarBloco(b) {
    if (animando || programa.length >= passos_max) return
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
      playSound('click')
      setNivelIdx(n => n + 1)
      setPrograma([])
      setResultado(null)
      setAnimando(false)
    } else {
      playSound('complete')
      navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })
    }
  }

  const hasMoreNiveis = nivelIdx + 1 < atividade.niveis.length

  function blocoDisplay(b, idx, highlight) {
    const isRepetir = b.startsWith('R')
    const n = isRepetir ? b.slice(1) : null
    return (
      <div key={idx} style={{
        background: isRepetir ? '#f97316' : highlight ? 'rgba(16,185,129,0.5)' : '#10b981',
        color: 'white', borderRadius: '8px', padding: '4px 10px',
        fontSize: isRepetir ? '11px' : '16px', fontWeight: '800',
        opacity: highlight ? 0.65 : 1, transition: 'all 0.2s',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        lineHeight: 1.1, minWidth: isRepetir ? '40px' : '36px',
      }}>
        {isRepetir ? (<><span style={{ fontSize: '14px' }}>ðŸ”</span><span>×{n}</span></>) : b}
      </div>
    )
  }

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`Nível ${nivelIdx + 1}/${atividade.niveis.length}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', maxWidth: '720px', width: '100%', margin: '0 auto', animation: 'ns-slide-up 0.3s ease' }}>

        {/* Level info */}
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '12px 18px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🧒</span>
          <div>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '14px' }}>Grade {grade}×{grade} • Máx. {passos_max} blocos</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Programe o personagem para chegar ao 🏆</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {/* Grid */}
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '18px', padding: '14px', border: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
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
                      background: isPar
                        ? 'rgba(16,185,129,0.5)'
                        : isPlayer ? 'rgba(16,185,129,0.25)'
                        : isFim ? 'rgba(245,158,11,0.25)'
                        : isInicio && !isPlayer ? 'rgba(16,185,129,0.1)'
                        : 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)', borderRadius: '7px', margin: '1.5px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: celSize * 0.5, transition: 'background 0.15s ease',
                    }}>
                      {isPlayer ? (resultado === 'falhou' ? '💥' : '🧒') : isFim ? '🏆' : ''}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, minWidth: '220px' }}>
            {/* Dica */}
            {dica && !resultado && (
              <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px', padding: '11px 14px', fontSize: '12px', color: '#fde68a', fontWeight: '600' }}>
                💡 {dica}
              </div>
            )}

            {/* Program */}
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Programa ({programa.length}/{passos_max})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '40px', alignItems: 'center' }}>
                {programa.length === 0
                  ? <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', fontStyle: 'italic' }}>Adicione blocos...</span>
                  : programa.map((b, i) => blocoDisplay(b, i, i < animIdx && animando))
                }
              </div>
            </div>

            {/* Result */}
            {resultado && (
              <div style={{
                padding: '14px 16px', borderRadius: '14px', textAlign: 'center',
                background: resultado === 'sucesso' ? 'rgba(16,185,129,0.15)' : resultado === 'falhou' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                border: '1.5px solid ' + (resultado === 'sucesso' ? 'rgba(16,185,129,0.4)' : resultado === 'falhou' ? 'rgba(239,68,68,0.4)' : 'rgba(245,158,11,0.4)'),
                color: resultado === 'sucesso' ? '#6ee7b7' : resultado === 'falhou' ? '#fca5a5' : '#fde68a',
                fontSize: '14px', fontWeight: '700',
              }}>
                {resultado === 'sucesso' && '🎉 Perfeito! Programa executado com sucesso!'}
                {resultado === 'falhou' && '💥 O personagem bateu em uma parede!'}
                {resultado === 'incompleto' && '🤔 O programa terminou antes de chegar.'}
              </div>
            )}

            {/* Block controls */}
            {!resultado ? (
              <>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>MOVIMENTO</div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['↑', '↓', '←', '→'].map(dir => (
                      <button key={dir} onClick={() => adicionarBloco(dir)} disabled={programa.length >= passos_max} style={{
                        width: '56px', height: '56px', borderRadius: '12px',
                        background: programa.length >= passos_max ? 'rgba(255,255,255,0.05)' : '#10b981',
                        border: 'none', color: 'white', fontSize: '18px', cursor: programa.length >= passos_max ? 'not-allowed' : 'pointer',
                        fontWeight: '700', boxShadow: programa.length >= passos_max ? 'none' : '0 4px 12px rgba(16,185,129,0.35)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
                        fontFamily: 'Plus Jakarta Sans, sans-serif', opacity: programa.length >= passos_max ? 0.4 : 1,
                        transition: 'all 0.15s',
                      }}>
                        <span style={{ lineHeight: 1 }}>{dir}</span>
                        <span style={{ fontSize: '8px', fontWeight: '800', opacity: 0.8 }}>{moveConfig[dir].label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>REPETIR (multiplica bloco anterior)</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {repetirOpcoes.map(r => (
                      <button key={r} onClick={() => adicionarBloco(r)} disabled={programa.length >= passos_max} style={{
                        height: '46px', padding: '0 12px', borderRadius: '10px',
                        background: programa.length >= passos_max ? 'rgba(255,255,255,0.05)' : '#f97316',
                        border: 'none', color: 'white', cursor: programa.length >= passos_max ? 'not-allowed' : 'pointer',
                        fontWeight: '800', boxShadow: programa.length >= passos_max ? 'none' : '0 3px 8px rgba(249,115,22,0.3)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1px',
                        fontFamily: 'Plus Jakarta Sans, sans-serif', opacity: programa.length >= passos_max ? 0.4 : 1,
                      }}>
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>ðŸ”</span>
                        <span style={{ fontSize: '10px', fontWeight: '900' }}>×{r.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setPrograma(p => p.slice(0, -1))} disabled={programa.length === 0} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px' }}>⌫ Apagar</button>
                  <button onClick={resetar} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px' }}>🔄 Limpar</button>
                  <button onClick={executar} disabled={programa.length === 0 || animando} style={{ flex: 1.5, background: programa.length === 0 || animando ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#10b981,#34d399)', border: 'none', borderRadius: '10px', padding: '10px', color: 'white', cursor: programa.length === 0 || animando ? 'not-allowed' : 'pointer', fontWeight: '900', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
                    {animando ? 'â–¶ ...' : 'â–¶ Executar'}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={resetar} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>🔄 Tentar</button>
                {resultado === 'sucesso' && (
                  <button onClick={proximoNivel} style={{ flex: 1, background: 'linear-gradient(135deg,#10b981,#34d399)', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 16px rgba(16,185,129,0.4)' }}>
                    {hasMoreNiveis ? 'Próximo →' : 'Concluir ✓'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </GameShell>
  )
}

