import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'

const ATIVIDADE = {
  id: 'quebra-cabeca',
  tipo: 'quebra-cabeca',
  emoji: '🧩',
  titulo: 'Quebra-Cabeça',
  habilidade: 'Raciocínio Espacial',
  historinha: 'As peças do mapa do tesouro voaram com o vento! Monte o quebra-cabeça para descobrir onde o tesouro está escondido.',
  tempo_estimado: 5,
  xp_reward: 100,
  coins_reward: 20,
}

const PUZZLES = [
  {
    id: 'sol', emoji: '☀️', nome: 'O Sol',
    grid: { rows: 2, cols: 2 },
    pecas: [
      { id: 'A', label: '☀️', row: 0, col: 0, cor: '#F59E0B' },
      { id: 'B', label: '🌤', row: 0, col: 1, cor: '#FEF3C7' },
      { id: 'C', label: '🌈', row: 1, col: 0, cor: '#7C3AED' },
      { id: 'D', label: '⭐', row: 1, col: 1, cor: '#EDE9FE' },
    ],
  },
  {
    id: 'foguete', emoji: '🚀', nome: 'Foguete Espacial',
    grid: { rows: 3, cols: 3 },
    pecas: [
      { id: 'A', label: '🔴', row: 0, col: 0, cor: '#EF4444' },
      { id: 'B', label: '🚀', row: 0, col: 1, cor: '#6B7280' },
      { id: 'C', label: '🔵', row: 0, col: 2, cor: '#3B82F6' },
      { id: 'D', label: '🌙', row: 1, col: 0, cor: '#1E1B4B' },
      { id: 'E', label: '⭐', row: 1, col: 1, cor: '#F59E0B' },
      { id: 'F', label: '🌟', row: 1, col: 2, cor: '#FEF9C3' },
      { id: 'G', label: '🪐', row: 2, col: 0, cor: '#F97316' },
      { id: 'H', label: '💫', row: 2, col: 1, cor: '#7C3AED' },
      { id: 'I', label: '🌌', row: 2, col: 2, cor: '#1e1b4b' },
    ],
  },
  {
    id: 'floresta', emoji: '🌲', nome: 'Floresta Mágica',
    grid: { rows: 3, cols: 4 },
    pecas: [
      { id: 'A', label: '🌲', row: 0, col: 0, cor: '#10B981' },
      { id: 'B', label: '🦋', row: 0, col: 1, cor: '#7C3AED' },
      { id: 'C', label: '🌸', row: 0, col: 2, cor: '#F97316' },
      { id: 'D', label: '☁️', row: 0, col: 3, cor: '#BAE6FD' },
      { id: 'E', label: '🐿️', row: 1, col: 0, cor: '#F59E0B' },
      { id: 'F', label: '🍄', row: 1, col: 1, cor: '#EF4444' },
      { id: 'G', label: '🦊', row: 1, col: 2, cor: '#F97316' },
      { id: 'H', label: '🌙', row: 1, col: 3, cor: '#1E1B4B' },
      { id: 'I', label: '🐾', row: 2, col: 0, cor: '#6B7280' },
      { id: 'J', label: '🍃', row: 2, col: 1, cor: '#10B981' },
      { id: 'K', label: '💧', row: 2, col: 2, cor: '#3B82F6' },
      { id: 'L', label: '⭐', row: 2, col: 3, cor: '#F59E0B' },
    ],
  },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function tocarPop(ctxRef) {
  if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
  const ctx  = ctxRef.current
  const osc  = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain); gain.connect(ctx.destination)
  osc.frequency.value = 800; osc.type = 'sine'
  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
  osc.start(); osc.stop(ctx.currentTime + 0.08)
}

export default function QuebracabecaAtividade() {
  const navigate     = useNavigate()
  const audioRef     = useRef(null)
  const inicioRef    = useRef(null)
  const dragIdRef    = useRef(null)

  const [iniciou,          setIniciou]          = useState(false)
  const [fase,             setFase]             = useState('selecao')
  const [puzzleSel,        setPuzzleSel]        = useState(null)
  const [puzzleAtual,      setPuzzleAtual]      = useState(null)
  const [bancoPecas,       setBancoPecas]       = useState([])
  const [tabuleiro,        setTabuleiro]        = useState({})
  const [slotFlash,        setSlotFlash]        = useState(null)
  const [brilhoConcluido,  setBrilhoConcluido]  = useState(false)

  const encaixadas = Object.keys(tabuleiro).length

  const iniciarPuzzle = useCallback((p) => {
    setPuzzleAtual(p)
    setBancoPecas(shuffle(p.pecas))
    setTabuleiro({})
    setSlotFlash(null)
    setBrilhoConcluido(false)
    inicioRef.current = Date.now()
    setFase('jogo')
  }, [])

  useEffect(() => {
    if (!puzzleAtual || encaixadas === 0) return
    if (encaixadas < puzzleAtual.pecas.length) return
    setBrilhoConcluido(true)
    const t = setTimeout(() => {
      const tempo = Math.round((Date.now() - inicioRef.current) / 1000)
      navigate('/encerramento', {
        state: {
          xp: 100,
          coins: 20,
          titulo: ATIVIDADE.titulo,
          emoji: ATIVIDADE.emoji,
          tipo: ATIVIDADE.tipo,
          atividade_id: ATIVIDADE.id,
        },
      })
    }, 1500)
    return () => clearTimeout(t)
  }, [encaixadas, puzzleAtual, navigate])

  const handleDragStart = useCallback((e, id) => {
    dragIdRef.current = id
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOver = useCallback((e) => { e.preventDefault() }, [])

  const handleDrop = useCallback((e, row, col) => {
    e.preventDefault()
    const id = dragIdRef.current
    dragIdRef.current = null
    if (!id || !puzzleAtual) return
    const pos  = `${row}-${col}`
    if (tabuleiro[pos]) return
    const peca = puzzleAtual.pecas.find(p => p.id === id)
    if (!peca) return
    if (peca.row === row && peca.col === col) {
      tocarPop(audioRef)
      setTabuleiro(prev => ({ ...prev, [pos]: id }))
      setBancoPecas(prev => prev.filter(p => p.id !== id))
      setSlotFlash({ pos, tipo: 'ok' })
      setTimeout(() => setSlotFlash(f => f?.pos === pos ? null : f), 500)
    } else {
      setSlotFlash({ pos, tipo: 'err' })
      setTimeout(() => setSlotFlash(f => f?.pos === pos ? null : f), 300)
    }
  }, [puzzleAtual, tabuleiro])

  if (!iniciou) {
    return (
      <IntroAtividade
        atividade={ATIVIDADE}
        onComecar={() => setIniciou(true)}
        onVoltar={() => navigate('/home-crianca')}
      />
    )
  }

  /* ── TELA DE SELEÇÃO ── */
  if (fase === 'selecao') {
    return (
      <div style={{ minHeight: '100vh', background: '#0f0a1e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Nunito, sans-serif' }}>
        <h2 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 28, marginBottom: 8, textAlign: 'center' }}>Escolha um puzzle</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 32, textAlign: 'center' }}>Qual desafio você quer montar?</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PUZZLES.map(p => (
            <div
              key={p.id}
              onClick={() => setPuzzleSel(p.id)}
              style={{
                width: 156, cursor: 'pointer', textAlign: 'center', padding: '24px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: `2px solid ${puzzleSel === p.id ? 'var(--ns-violet, #7C3AED)' : 'rgba(255,255,255,0.1)'}`,
                boxShadow: puzzleSel === p.id ? '0 0 24px rgba(124,58,237,0.4)' : 'none',
                borderRadius: 20, transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 8 }}>{p.emoji}</div>
              <div style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 16, marginBottom: 4 }}>{p.nome}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{p.pecas.length} peças</div>
            </div>
          ))}
        </div>
        {puzzleSel && (
          <button
            onClick={() => { const p = PUZZLES.find(x => x.id === puzzleSel); if (p) iniciarPuzzle(p) }}
            style={{ marginTop: 32, background: 'var(--ns-violet, #7C3AED)', color: 'white', border: 'none', borderRadius: 14, padding: '14px 40px', fontSize: 18, fontFamily: 'Fredoka One, cursive', cursor: 'pointer' }}
          >
            Montar esse! 🧩
          </button>
        )}
      </div>
    )
  }

  /* ── TELA DE JOGO ── */
  const { grid: { rows, cols }, pecas } = puzzleAtual
  return (
    <div style={{ minHeight: '100vh', background: '#0f0a1e', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 26, margin: '0 0 4px' }}>
          {brilhoConcluido ? '🎉 Puzzle completo!' : puzzleAtual.nome}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: 0 }}>
          {encaixadas} de {pecas.length} peças encaixadas
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 800, width: '100%' }}>
        {/* Banco */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>Peças</p>
          {bancoPecas.map(peca => (
            <div
              key={peca.id}
              draggable
              onDragStart={(e) => handleDragStart(e, peca.id)}
              style={{
                width: 80, height: 80, background: peca.cor, borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, cursor: 'grab', border: '2px solid rgba(255,255,255,0.2)',
                userSelect: 'none',
                transition: 'filter 0.3s',
                filter: brilhoConcluido ? 'brightness(1.6) drop-shadow(0 0 8px white)' : 'none',
              }}
            >
              {peca.label}
            </div>
          ))}
        </div>

        {/* Tabuleiro */}
        <div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textAlign: 'center', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 1 }}>Tabuleiro</p>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 84px)`, gridTemplateRows: `repeat(${rows}, 84px)`, gap: 4 }}>
            {[...Array(rows)].flatMap((_, row) =>
              [...Array(cols)].map((_, col) => {
                const pos   = `${row}-${col}`
                const pecaId = tabuleiro[pos]
                const peca  = pecaId ? pecas.find(p => p.id === pecaId) : null
                const flash = slotFlash?.pos === pos ? slotFlash.tipo : null
                return (
                  <div
                    key={pos}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, row, col)}
                    style={{
                      width: 84, height: 84, borderRadius: 14,
                      background: peca ? peca.cor : flash === 'err' ? 'rgba(239,68,68,0.25)' : flash === 'ok' ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.04)',
                      border: peca ? '2px solid rgba(255,255,255,0.2)' : flash === 'err' ? '2px solid #EF4444' : flash === 'ok' ? '2px solid #10B981' : '2px dashed rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.15s, border-color 0.15s',
                      filter: brilhoConcluido && peca ? 'brightness(1.5) drop-shadow(0 0 10px white)' : 'none',
                    }}
                  >
                    {peca
                      ? <span style={{ fontSize: 36 }}>{peca.label}</span>
                      : <span style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Fredoka One, cursive', fontSize: 22 }}>?</span>
                    }
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setFase('selecao')}
        style={{ marginTop: 32, background: 'transparent', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 20px', fontSize: 13, cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}
      >
        ← Escolher outro puzzle
      </button>
    </div>
  )
}
