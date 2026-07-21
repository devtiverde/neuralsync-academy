import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'

const ATIVIDADE = {
  id: 'caca-palavras',
  tipo: 'caca-palavras',
  emoji: '🔍',
  titulo: 'Caça-Palavras',
  habilidade: 'Atenção Visual',
  historinha: 'As palavras se esconderam na floresta de letras! Use seus olhos de detetive para encontrar todas antes do tempo acabar.',
  tempo_estimado: 4,
  xp_reward: 90,
  coins_reward: 15,
}

const TEMAS = {
  animais: { label: 'Animais', emoji: '🐾', palavras: ['GATO','CAO','PATO','PEIXE','LOBO','URSO','VACA','RATO'] },
  frutas:  { label: 'Frutas',  emoji: '🍎', palavras: ['MACA','UVA','PERA','MANGA','KIWI','LIMA','FIGO','CAJU'] },
  cores:   { label: 'Cores',   emoji: '🎨', palavras: ['AZUL','VERDE','ROXO','ROSA','BRANCO','PRETO','CINZA','BEGE'] },
  numeros: { label: 'Números', emoji: '🔢', palavras: ['UM','DOIS','TRES','CINCO','SEIS','SETE','OITO','NOVE'] },
}

const DIFS = {
  facil:   { label: 'Fácil',   emoji: '😊', tamanho: 8,  diagonal: false, timer: null, desc: '8×8 · sem diagonal' },
  medio:   { label: 'Médio',   emoji: '😮', tamanho: 10, diagonal: true,  timer: 180,  desc: '10×10 · diagonal · 3 min' },
  dificil: { label: 'Difícil', emoji: '🔥', tamanho: 12, diagonal: true,  timer: 120,  desc: '12×12 · todas as direções · 2 min' },
}

const CORES_PALAVRAS = ['#7C3AED','#F97316','#06B6D4','#10B981','#F59E0B','#EF4444','#8B5CF6','#3B82F6']

// ── Grid generation ──────────────────────────────────────────────────────────

function generateGrid(palavras, tamanho, diagonal = false, reverso = false) {
  const grid = Array.from({ length: tamanho }, () => Array(tamanho).fill(''))
  const palavrasColocadas = []

  const DIRS = [{ dr: 0, dc: 1 }, { dr: 1, dc: 0 }]
  if (diagonal) DIRS.push({ dr: 1, dc: 1 }, { dr: 1, dc: -1 })

  for (const palavra of palavras) {
    let colocada = false
    for (let t = 0; t < 200 && !colocada; t++) {
      const dir = DIRS[Math.floor(Math.random() * DIRS.length)]
      const pal = reverso && Math.random() < 0.35
        ? [...palavra].reverse().join('')
        : palavra
      const len = pal.length

      const minR = dir.dr < 0 ? (len - 1) : 0
      const maxR = tamanho - (dir.dr > 0 ? len - 1 : 0) - 1
      const minC = dir.dc < 0 ? (len - 1) : 0
      const maxC = tamanho - (dir.dc > 0 ? len - 1 : 0) - 1
      if (maxR < minR || maxC < minC) continue

      const sr = minR + Math.floor(Math.random() * (maxR - minR + 1))
      const sc = minC + Math.floor(Math.random() * (maxC - minC + 1))

      let ok = true
      for (let i = 0; i < len; i++) {
        const r = sr + dir.dr * i
        const c = sc + dir.dc * i
        if (r < 0 || r >= tamanho || c < 0 || c >= tamanho) { ok = false; break }
        if (grid[r][c] !== '' && grid[r][c] !== pal[i]) { ok = false; break }
      }

      if (ok) {
        const celulas = []
        for (let i = 0; i < len; i++) {
          const r = sr + dir.dr * i
          const c = sc + dir.dc * i
          grid[r][c] = pal[i]
          celulas.push({ row: r, col: c })
        }
        palavrasColocadas.push({ palavra, celulas })
        colocada = true
      }
    }
  }

  const VOGAIS = 'AEIOU'
  const CONS   = 'BCDFGHJKLMNPQRSTVXZ'
  for (let r = 0; r < tamanho; r++)
    for (let c = 0; c < tamanho; c++)
      if (grid[r][c] === '') {
        const pool = Math.random() < 0.4 ? VOGAIS : CONS
        grid[r][c] = pool[Math.floor(Math.random() * pool.length)]
      }

  return { grid, palavrasColocadas }
}

// ── Selection helper ─────────────────────────────────────────────────────────

function getCelulas(inicio, fim, tamanho) {
  const dr = fim.row - inicio.row
  const dc = fim.col - inicio.col
  const len = Math.max(Math.abs(dr), Math.abs(dc))
  if (len === 0) return [inicio]
  // Only allow straight lines: horiz, vert, or 45° diagonal
  if (Math.abs(dr) !== 0 && Math.abs(dc) !== 0 && Math.abs(dr) !== Math.abs(dc)) return [inicio]
  const stepR = dr === 0 ? 0 : dr > 0 ? 1 : -1
  const stepC = dc === 0 ? 0 : dc > 0 ? 1 : -1
  const cells = []
  for (let i = 0; i <= len; i++) {
    const r = inicio.row + stepR * i
    const c = inicio.col + stepC * i
    if (r >= 0 && r < tamanho && c >= 0 && c < tamanho) cells.push({ row: r, col: c })
  }
  return cells
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CacaPalavrasAtividade() {
  const navigate = useNavigate()
  const gridRef  = useRef(null)

  const [iniciou,    setIniciou]    = useState(false)
  const [fase,       setFase]       = useState('tema')
  const [temaSel,    setTemaSel]    = useState(null)
  const [difSel,     setDifSel]     = useState(null)
  const [gridData,   setGridData]   = useState(null)
  const [encontradas,setEncontradas]= useState({})   // {palavra: cor}
  const [selecionando,setSelecionando]= useState(false)
  const [inicioCell, setInicioCell] = useState(null)
  const [cellsSel,   setCellsSel]   = useState([])
  const [tempo,      setTempo]      = useState(null)
  const [gameOver,   setGameOver]   = useState(false)
  const timerRef = useRef(null)

  const tema = temaSel ? TEMAS[temaSel] : null
  const dif  = difSel  ? DIFS[difSel]  : null
  const encontradasCount = Object.keys(encontradas).length
  const totalPalavras    = tema ? tema.palavras.length : 0

  // Timer
  useEffect(() => {
    if (!dif?.timer || tempo === null || gameOver) return
    if (tempo <= 0) { setGameOver(true); return }
    timerRef.current = setTimeout(() => setTempo(t => t - 1), 1000)
    return () => clearTimeout(timerRef.current)
  }, [tempo, dif, gameOver])

  // Win
  useEffect(() => {
    if (!gridData || encontradasCount === 0 || encontradasCount < totalPalavras) return
    clearTimeout(timerRef.current)
    setTimeout(() => navigate('/encerramento', {
      state: {
        xp: ATIVIDADE.xp_reward,
        coins: ATIVIDADE.coins_reward,
        titulo: ATIVIDADE.titulo,
        emoji: ATIVIDADE.emoji,
        tipo: ATIVIDADE.tipo,
        atividade_id: ATIVIDADE.id,
      }
    }), 800)
  }, [encontradasCount, totalPalavras, gridData]) // eslint-disable-line

  const iniciarJogo = useCallback(() => {
    if (!temaSel || !difSel) return
    const d = DIFS[difSel]
    const t = TEMAS[temaSel]
    setGridData(generateGrid(t.palavras, d.tamanho, d.diagonal, difSel === 'dificil'))
    setEncontradas({})
    setSelecionando(false)
    setInicioCell(null)
    setCellsSel([])
    setGameOver(false)
    setTempo(d.timer)
    setFase('jogo')
  }, [temaSel, difSel])

  const checkSelection = useCallback((cells) => {
    if (!gridData || !tema || cells.length < 2) return
    const word    = cells.map(c => gridData.grid[c.row][c.col]).join('')
    const wordRev = [...word].reverse().join('')
    for (const wp of gridData.palavrasColocadas) {
      if (encontradas[wp.palavra]) continue
      if (wp.palavra === word || wp.palavra === wordRev) {
        const idx = Object.keys(encontradas).length % CORES_PALAVRAS.length
        setEncontradas(prev => ({ ...prev, [wp.palavra]: CORES_PALAVRAS[idx] }))
        return
      }
    }
  }, [gridData, tema, encontradas])

  // Touch helpers
  const getCellFromPoint = useCallback((x, y) => {
    const el = document.elementFromPoint(x, y)
    if (!el) return null
    const r = el.dataset.row; const c = el.dataset.col
    if (r === undefined || c === undefined) return null
    return { row: parseInt(r, 10), col: parseInt(c, 10) }
  }, [])

  const handleMouseDown = useCallback((e, row, col) => {
    e.preventDefault()
    const cell = { row, col }
    setSelecionando(true); setInicioCell(cell); setCellsSel([cell])
  }, [])

  const handleMouseEnter = useCallback((row, col) => {
    if (!selecionando || !inicioCell || !dif) return
    setCellsSel(getCelulas(inicioCell, { row, col }, dif.tamanho))
  }, [selecionando, inicioCell, dif])

  const handleMouseUp = useCallback(() => {
    if (!selecionando) return
    setSelecionando(false); checkSelection(cellsSel); setCellsSel([]); setInicioCell(null)
  }, [selecionando, cellsSel, checkSelection])

  const handleTouchStart = useCallback((e) => {
    e.preventDefault()
    const cell = getCellFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    if (!cell) return
    setSelecionando(true); setInicioCell(cell); setCellsSel([cell])
  }, [getCellFromPoint])

  const handleTouchMove = useCallback((e) => {
    e.preventDefault()
    if (!selecionando || !inicioCell || !dif) return
    const cell = getCellFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    if (!cell) return
    setCellsSel(getCelulas(inicioCell, cell, dif.tamanho))
  }, [selecionando, inicioCell, dif, getCellFromPoint])

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault()
    if (!selecionando) return
    setSelecionando(false); checkSelection(cellsSel); setCellsSel([]); setInicioCell(null)
  }, [selecionando, cellsSel, checkSelection])

  if (!iniciou) {
    return <IntroAtividade atividade={ATIVIDADE} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/home-crianca')} />
  }

  // Cell colour
  const getCellState = (row, col) => {
    if (cellsSel.some(c => c.row === row && c.col === col)) return 'selecting'
    for (const [palavra, cor] of Object.entries(encontradas)) {
      const wp = gridData?.palavrasColocadas.find(w => w.palavra === palavra)
      if (wp?.celulas.some(c => c.row === row && c.col === col)) return cor
    }
    return 'normal'
  }

  const timerPct = dif?.timer ? Math.max(0, ((tempo ?? 0) / dif.timer) * 100) : 100
  const timerCor = timerPct < 10 ? '#EF4444' : timerPct < 25 ? '#F97316' : '#10B981'
  const tamanho  = dif?.tamanho ?? 8
  const CELL     = 38

  /* ── TEMA ── */
  if (fase === 'tema') return (
    <div style={{ minHeight: '100vh', background: '#0f0a1e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Nunito, sans-serif' }}>
      <h2 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 28, marginBottom: 8, textAlign: 'center' }}>Escolha um tema</h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 32, textAlign: 'center' }}>Que categoria de palavras você quer caçar?</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.entries(TEMAS).map(([key, t]) => (
          <div key={key} onClick={() => setTemaSel(key)} style={{
            width: 140, cursor: 'pointer', textAlign: 'center', padding: '24px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: `2px solid ${temaSel === key ? '#7C3AED' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: temaSel === key ? '0 0 24px rgba(124,58,237,0.4)' : 'none',
            borderRadius: 20, transition: 'border-color .2s, box-shadow .2s',
          }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{t.emoji}</div>
            <div style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 16 }}>{t.label}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4 }}>{t.palavras.length} palavras</div>
          </div>
        ))}
      </div>
      {temaSel && (
        <button onClick={() => setFase('dificuldade')} style={{ marginTop: 32, background: '#7C3AED', color: 'white', border: 'none', borderRadius: 14, padding: '14px 40px', fontSize: 18, fontFamily: 'Fredoka One, cursive', cursor: 'pointer' }}>
          Próximo →
        </button>
      )}
    </div>
  )

  /* ── DIFICULDADE ── */
  if (fase === 'dificuldade') return (
    <div style={{ minHeight: '100vh', background: '#0f0a1e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Nunito, sans-serif' }}>
      <h2 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 28, marginBottom: 8 }}>Dificuldade</h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 32 }}>Tema: {tema?.emoji} {tema?.label}</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.entries(DIFS).map(([key, d]) => (
          <div key={key} onClick={() => setDifSel(key)} style={{
            width: 160, cursor: 'pointer', textAlign: 'center', padding: '24px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: `2px solid ${difSel === key ? '#7C3AED' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: difSel === key ? '0 0 24px rgba(124,58,237,0.4)' : 'none',
            borderRadius: 20, transition: 'border-color .2s, box-shadow .2s',
          }}>
            <div style={{ fontSize: 44, marginBottom: 8 }}>{d.emoji}</div>
            <div style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 18, marginBottom: 6 }}>{d.label}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{d.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        <button onClick={() => setFase('tema')} style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '12px 24px', fontSize: 15, cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}>← Voltar</button>
        {difSel && (
          <button onClick={iniciarJogo} style={{ background: '#7C3AED', color: 'white', border: 'none', borderRadius: 14, padding: '14px 40px', fontSize: 18, fontFamily: 'Fredoka One, cursive', cursor: 'pointer' }}>Jogar! 🔍</button>
        )}
      </div>
    </div>
  )

  /* ── JOGO ── */
  return (
    <div
      style={{ minHeight: '100vh', background: '#0f0a1e', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px', fontFamily: 'Nunito, sans-serif', userSelect: 'none' }}
      onMouseUp={handleMouseUp}
    >
      {/* Header */}
      <div style={{ width: '100%', maxWidth: 900, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{tema?.emoji} {tema?.label} · {dif?.label}</span>
          <span style={{ color: 'white', fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 600 }}>
            {encontradasCount}/{totalPalavras} palavras
          </span>
        </div>
        {dif?.timer && (
          <>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${timerPct}%`, background: timerCor, borderRadius: 3, transition: 'width 1s linear, background .3s' }} />
            </div>
            <div style={{ textAlign: 'right', color: timerCor, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif', marginTop: 3 }}>
              {Math.floor((tempo ?? 0) / 60)}:{String((tempo ?? 0) % 60).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {/* Game area */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 900 }}>
        {/* Grid */}
        <div
          ref={gridRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ display: 'grid', gridTemplateColumns: `repeat(${tamanho}, ${CELL}px)`, gap: 1, touchAction: 'none', cursor: 'crosshair' }}
        >
          {gridData && [...Array(tamanho)].flatMap((_, row) =>
            [...Array(tamanho)].map((_, col) => {
              const state   = getCellState(row, col)
              const isFound = state !== 'normal' && state !== 'selecting'
              const bg = state === 'selecting'
                ? 'rgba(124,58,237,0.7)'
                : isFound ? state
                : 'rgba(255,255,255,0.05)'
              return (
                <div
                  key={`${row}-${col}`}
                  data-row={row}
                  data-col={col}
                  onMouseDown={(e) => handleMouseDown(e, row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  style={{
                    width: CELL, height: CELL,
                    background: bg,
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 16, fontWeight: 700,
                    transition: 'background .1s',
                  }}
                >
                  {gridData.grid[row][col]}
                </div>
              )
            })
          )}
        </div>

        {/* Word list */}
        <div style={{ minWidth: 130 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, margin: '0 0 12px' }}>Palavras</p>
          {tema?.palavras.map(p => {
            const cor = encontradas[p]
            return (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {cor
                  ? <div style={{ width: 10, height: 10, borderRadius: 2, background: cor, flexShrink: 0 }} />
                  : <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                }
                <span style={{
                  color: cor ? 'rgba(255,255,255,0.35)' : 'white',
                  fontSize: 14, fontFamily: 'Space Grotesk, sans-serif', fontWeight: cor ? 400 : 600,
                  textDecoration: cor ? 'line-through' : 'none',
                  transition: 'color .3s',
                }}>
                  {p}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Game Over */}
      {gameOver && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,10,30,0.96)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>⏰</div>
          <h2 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 32, marginBottom: 8 }}>Tempo esgotado!</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 32 }}>
            Você encontrou <strong style={{ color: 'white' }}>{encontradasCount}</strong> de {totalPalavras} palavras
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={iniciarJogo} style={{ background: '#7C3AED', color: 'white', border: 'none', borderRadius: 14, padding: '14px 32px', fontSize: 16, fontFamily: 'Fredoka One, cursive', cursor: 'pointer' }}>
              Tentar novamente
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: Math.round(ATIVIDADE.xp_reward * (encontradasCount / totalPalavras)), coins: Math.round(ATIVIDADE.coins_reward * (encontradasCount / totalPalavras)), titulo: ATIVIDADE.titulo, emoji: ATIVIDADE.emoji, tipo: ATIVIDADE.tipo, atividade_id: ATIVIDADE.id } })}
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '14px 32px', fontSize: 16, cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}
            >
              Ver resultado
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
