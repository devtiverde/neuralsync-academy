import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

const DIRS = {
  '↑': [-1, 0], '↓': [1, 0], '←': [0, -1], '→': [0, 1],
}

function cmdBtn(cor) {
  return {
    width: '52px', height: '52px', borderRadius: '12px',
    background: cor, border: 'none', color: 'white',
    fontSize: '20px', cursor: 'pointer', fontWeight: '700',
    boxShadow: '0 3px 8px rgba(99,102,241,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'transform 0.1s ease', fontFamily: 'Plus Jakarta Sans, sans-serif',
  }
}

export default function RoboAtividade() {
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
    const nivel = atividade.niveis[nivelIdx]
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
    }, 420)
    return () => clearTimeout(timer)
  }, [animando, animIdx, animPath])

  useEffect(() => {
    if (!resultado) return
    if (resultado === 'sucesso') playSound('correct')
    else if (resultado === 'falhou') playSound('wrong')
  }, [resultado])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} kidsLink={getKidsLink(atividade.id)} />

  const nivel = atividade.niveis[nivelIdx]
  if (!nivel || posRobo === null) return null

  const { grade, inicio, fim, paredes, passos_max } = nivel
  const celSize = Math.max(48, Math.floor(360 / grade))
  const progresso = Math.round((nivelsConcluidos / atividade.niveis.length) * 100)

  function isParede(r, c) {
    return paredes.some(([pr, pc]) => pr === r && pc === c)
  }

  function executar() {
    if (animando) return
    const path = []
    let pos = [...inicio]
    let terminouCom = null
    for (let i = 0; i < programa.length; i++) {
      const [dr, dc] = DIRS[programa[i]]
      const nr = pos[0] + dr
      const nc = pos[1] + dc
      if (nr < 0 || nr >= grade || nc < 0 || nc >= grade || isParede(nr, nc)) {
        path.push({ pos: [...pos] })
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

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`Nível ${nivelIdx + 1}/${atividade.niveis.length}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', maxWidth: '700px', width: '100%', margin: '0 auto', animation: 'ns-slide-up 0.3s ease' }}>

        {/* Level info */}
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '12px 18px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🤖</span>
          <div>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '14px' }}>Grade {grade}×{grade} • Máx. {passos_max} comandos</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Programe o robô para chegar ao 🏆</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {/* Grid */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '18px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
            {Array.from({ length: grade }, (_, r) => (
              <div key={r} style={{ display: 'flex' }}>
                {Array.from({ length: grade }, (_, c) => {
                  const isRobo = posRobo[0] === r && posRobo[1] === c
                  const isFim = fim[0] === r && fim[1] === c
                  const isInicio = inicio[0] === r && inicio[1] === c
                  const isPar = isParede(r, c)
                  return (
                    <div key={c} style={{
                      width: celSize, height: celSize,
                      background: isPar
                        ? 'rgba(99,102,241,0.6)'
                        : isRobo ? 'rgba(99,102,241,0.3)'
                        : isFim ? 'rgba(245,158,11,0.25)'
                        : isInicio && !isRobo ? 'rgba(16,185,129,0.15)'
                        : 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '8px', margin: '2px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: celSize * 0.55, transition: 'background 0.2s ease',
                    }}>
                      {isRobo ? (resultado === 'falhou' ? '💥' : '🤖') : isFim ? '🏆' : ''}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, minWidth: '200px' }}>
            {/* Program display */}
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Programa ({programa.length}/{passos_max})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '40px', alignItems: 'center' }}>
                {programa.length === 0
                  ? <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', fontStyle: 'italic' }}>Adicione comandos...</span>
                  : programa.map((cmd, i) => (
                    <div key={i} style={{
                      background: i < animIdx && animando ? 'rgba(99,102,241,0.5)' : '#6366f1',
                      color: 'white', borderRadius: '8px', padding: '5px 10px',
                      fontSize: '16px', fontWeight: '700', opacity: i < animIdx && animando ? 0.5 : 1,
                    }}>{cmd}</div>
                  ))
                }
              </div>
            </div>

            {/* Result */}
            {resultado && (
              <div style={{
                padding: '14px 16px', borderRadius: '14px', textAlign: 'center',
                background: resultado === 'sucesso' ? 'rgba(16,185,129,0.15)' : resultado === 'falhou' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                border: '1.5px solid ' + (resultado === 'sucesso' ? 'rgba(16,185,129,0.4)' : resultado === 'falhou' ? 'rgba(239,68,68,0.4)' : 'rgba(245,158,11,0.4)'),
                fontSize: '14px', fontWeight: '700',
                color: resultado === 'sucesso' ? '#6ee7b7' : resultado === 'falhou' ? '#fca5a5' : '#fde68a',
              }}>
                {resultado === 'sucesso' && '🎉 Chegou ao destino!'}
                {resultado === 'falhou' && '💥 O robô bateu! Tente de novo.'}
                {resultado === 'incompleto' && '🤔 O programa terminou antes de chegar.'}
              </div>
            )}

            {/* D-pad input */}
            {!resultado ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '700', marginBottom: '4px' }}>ADICIONAR COMANDO</div>
                  <button onClick={() => programa.length < passos_max && setPrograma(p => [...p, '↑'])} style={cmdBtn('#6366f1')}>↑</button>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => programa.length < passos_max && setPrograma(p => [...p, '←'])} style={cmdBtn('#6366f1')}>←</button>
                    <button onClick={() => programa.length < passos_max && setPrograma(p => [...p, '↓'])} style={cmdBtn('#6366f1')}>↓</button>
                    <button onClick={() => programa.length < passos_max && setPrograma(p => [...p, '→'])} style={cmdBtn('#6366f1')}>→</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setPrograma(p => p.slice(0, -1))} disabled={programa.length === 0} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px' }}>⌫ Apagar</button>
                  <button onClick={resetar} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px' }}>🔄 Reset</button>
                  <button onClick={executar} disabled={programa.length === 0 || animando} style={{ flex: 1.5, background: 'linear-gradient(135deg,#6366f1,#818cf8)', border: 'none', borderRadius: '10px', padding: '10px', color: 'white', cursor: 'pointer', fontWeight: '900', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                    {animando ? '▶ ...' : '▶ Executar'}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={resetar} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>🔄 Tentar</button>
                {resultado === 'sucesso' && (
                  <button onClick={proximoNivel} style={{ flex: 1, background: 'linear-gradient(135deg,#6366f1,#818cf8)', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}>
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

