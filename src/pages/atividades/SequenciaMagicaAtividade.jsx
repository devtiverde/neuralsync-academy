import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'

const ATIVIDADE = {
  id: 'sequencia-magica',
  tipo: 'sequencia-magica',
  emoji: '🌈',
  titulo: 'Sequência Mágica',
  habilidade: 'Memória de Trabalho',
  historinha: 'O reino das cores perdeu a ordem! Ajude o guardião a lembrar a sequência certa para acender as luzes do castelo.',
  tempo_estimado: 4,
  xp_reward: 80,
  coins_reward: 15,
}

const BOTOES = [
  { cor: '#EF4444', corEscura: '#991B1B', freq: 261, label: 'Vermelho' },
  { cor: '#3B82F6', corEscura: '#1D4ED8', freq: 329, label: 'Azul'     },
  { cor: '#10B981', corEscura: '#065F46', freq: 392, label: 'Verde'    },
  { cor: '#F59E0B', corEscura: '#92400E', freq: 523, label: 'Amarelo'  },
]

function criarAudioCtx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

function tocarSom(audioCtx, frequencia) {
  const osc  = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.frequency.value = frequencia
  osc.type = 'sine'
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4)
  osc.start()
  osc.stop(audioCtx.currentTime + 0.4)
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

export default function SequenciaMagicaAtividade() {
  const navigate  = useNavigate()
  const audioCtx  = useRef(null)
  const inicioRef = useRef(null)
  const bloqueado = useRef(false)

  const [iniciou,      setIniciou]      = useState(false)
  const [sequencia,    setSequencia]    = useState([])
  const [faseJogador,  setFaseJogador]  = useState(false)
  const [indexJogador, setIndexJogador] = useState(0)
  const [nivel,        setNivel]        = useState(1)
  const [aceso,        setAceso]        = useState(null)
  const [gameOver,     setGameOver]     = useState(false)
  const [aguardando,   setAguardando]   = useState(false)

  const getAudio = useCallback(() => {
    if (!audioCtx.current) audioCtx.current = criarAudioCtx()
    return audioCtx.current
  }, [])

  const exibirSequencia = useCallback(async (seq) => {
    bloqueado.current = true
    setFaseJogador(false)
    setAguardando(true)
    await sleep(600)
    for (const idx of seq) {
      setAceso(idx)
      tocarSom(getAudio(), BOTOES[idx].freq)
      await sleep(500)
      setAceso(null)
      await sleep(300)
    }
    setAguardando(false)
    setFaseJogador(true)
    setIndexJogador(0)
    bloqueado.current = false
  }, [getAudio])

  const iniciarNovonivel = useCallback((novaSeq) => {
    exibirSequencia(novaSeq)
  }, [exibirSequencia])

  const comecarJogo = useCallback(() => {
    inicioRef.current = Date.now()
    const primeiroIdx = Math.floor(Math.random() * 4)
    const novaSeq = [primeiroIdx]
    setSequencia(novaSeq)
    setNivel(1)
    setGameOver(false)
    exibirSequencia(novaSeq)
  }, [exibirSequencia])

  useEffect(() => {
    if (iniciou) comecarJogo()
  }, [iniciou]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleBotao = useCallback(async (idx) => {
    if (!faseJogador || bloqueado.current || gameOver) return

    setAceso(idx)
    tocarSom(getAudio(), BOTOES[idx].freq)
    await sleep(200)
    setAceso(null)

    if (idx !== sequencia[indexJogador]) {
      setGameOver(true)
      return
    }

    const novoIndex = indexJogador + 1
    if (novoIndex < sequencia.length) {
      setIndexJogador(novoIndex)
      return
    }

    // Completou a rodada
    setFaseJogador(false)
    bloqueado.current = true
    await sleep(800)

    const novoNivel = nivel + 1
    const novaSeq   = [...sequencia, Math.floor(Math.random() * 4)]
    setNivel(novoNivel)
    setSequencia(novaSeq)
    iniciarNovonivel(novaSeq)
  }, [faseJogador, gameOver, sequencia, indexJogador, nivel, getAudio, iniciarNovonivel])

  const handleVerResultado = useCallback(() => {
    const xp     = Math.max(30, nivel * 15)
    const coins  = Math.max(5, nivel * 3)
    const tempo  = inicioRef.current ? Math.round((Date.now() - inicioRef.current) / 1000) : 0
    navigate('/encerramento', {
      state: {
        xp,
        coins,
        titulo: ATIVIDADE.titulo,
        emoji: ATIVIDADE.emoji,
        tipo: ATIVIDADE.tipo,
        atividade_id: ATIVIDADE.id,
      },
    })
  }, [nivel, navigate])

  if (!iniciou) {
    return (
      <IntroAtividade
        atividade={ATIVIDADE}
        onComecar={() => setIniciou(true)}
        onVoltar={() => navigate('/home-crianca')}
      />
    )
  }

  const label = aguardando
    ? 'Observe a sequência...'
    : faseJogador
    ? `Repita! (${indexJogador + 1} / ${sequencia.length})`
    : ''

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0a1e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'Nunito, sans-serif',
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 4px' }}>
          {gameOver ? 'Resultado' : label}
        </p>
        <h2 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 32, margin: 0 }}>
          {gameOver ? '😅 Fim de Jogo!' : `Nível ${nivel}`}
        </h2>
        {!gameOver && (
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>
            Sequência de {sequencia.length} {sequencia.length === 1 ? 'cor' : 'cores'}
          </p>
        )}
      </div>

      {/* Tela de game over */}
      {gameOver ? (
        <div style={{ textAlign: 'center', maxWidth: 360 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>😅</div>
          <p style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 24, marginBottom: 8 }}>
            Você chegou ao Nível {nivel}!
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 32 }}>
            Sequência de {sequencia.length} {sequencia.length === 1 ? 'cor memorizada' : 'cores memorizadas'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={comecarJogo}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 16,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Jogar de novo
            </button>
            <button
              onClick={handleVerResultado}
              style={{
                background: 'var(--ns-violet, #7C3AED)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 16,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Ver resultado
            </button>
          </div>
        </div>
      ) : (
        /* Grid 2×2 de botões */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          maxWidth: 380,
          width: '100%',
        }}>
          {BOTOES.map((b, i) => {
            const estaAceso = aceso === i
            return (
              <button
                key={i}
                onClick={() => handleBotao(i)}
                aria-label={b.label}
                style={{
                  background: b.cor,
                  border: `3px solid ${b.corEscura}`,
                  borderRadius: 20,
                  height: 140,
                  cursor: faseJogador && !bloqueado.current ? 'pointer' : 'default',
                  opacity: estaAceso ? 1 : 0.4,
                  boxShadow: estaAceso
                    ? `0 0 32px 8px ${b.cor}, 0 0 60px 16px ${b.cor}66`
                    : `0 4px 12px ${b.cor}44`,
                  transform: estaAceso ? 'scale(1.04)' : 'scale(1)',
                  transition: 'opacity 0.08s, box-shadow 0.08s, transform 0.08s',
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
