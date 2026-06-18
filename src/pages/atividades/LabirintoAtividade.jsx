import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import '../../styles/crianca.css'

function gerarMaze(rows, cols) {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ n: true, s: true, e: true, w: true, v: false }))
  )
  function dfs(r, c) {
    grid[r][c].v = true
    const dirs = [
      [r - 1, c, 'n', 's'], [r + 1, c, 's', 'n'],
      [r, c - 1, 'w', 'e'], [r, c + 1, 'e', 'w'],
    ].filter(([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].v)
      .sort(() => Math.random() - 0.5)
    for (const [nr, nc, d1, d2] of dirs) {
      if (!grid[nr][nc].v) {
        grid[r][c][d1] = false
        grid[nr][nc][d2] = false
        dfs(nr, nc)
      }
    }
  }
  dfs(0, 0)
  // Open entrance (top of start) and exit (bottom of goal)
  grid[0][0].n = false
  grid[rows - 1][cols - 1].s = false
  return grid
}

export default function LabirintoAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const tamanho = atividade?.tamanho ?? 7
  const maze = useMemo(() => gerarMaze(tamanho, tamanho), [tamanho])

  const [iniciou, setIniciou] = useState(false)
  const [pos, setPos] = useState([0, 0])
  const [passos, setPasos] = useState(0)
  const [tempo, setTempo] = useState(0)
  const [ganhou, setGanhou] = useState(false)

  useEffect(() => {
    if (!atividade) navigate('/trilha')
  }, [])

  useEffect(() => {
    if (!iniciou || ganhou) return
    const t = setInterval(() => setTempo(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [iniciou, ganhou])

  useEffect(() => {
    if (pos[0] === tamanho - 1 && pos[1] === tamanho - 1) {
      setGanhou(true)
    }
  }, [pos])

  const mover = useCallback((dir) => {
    if (ganhou) return
    setPos(([r, c]) => {
      const cell = maze[r][c]
      if (dir === 'n' && !cell.n && r > 0) { setPasos(p => p + 1); return [r - 1, c] }
      if (dir === 's' && !cell.s && r < tamanho - 1) { setPasos(p => p + 1); return [r + 1, c] }
      if (dir === 'w' && !cell.w && c > 0) { setPasos(p => p + 1); return [r, c - 1] }
      if (dir === 'e' && !cell.e && c < tamanho - 1) { setPasos(p => p + 1); return [r, c + 1] }
      return [r, c]
    })
  }, [ganhou, maze, tamanho])

  useEffect(() => {
    if (!iniciou) return
    const handler = (e) => {
      if (e.key === 'ArrowUp') mover('n')
      if (e.key === 'ArrowDown') mover('s')
      if (e.key === 'ArrowLeft') mover('w')
      if (e.key === 'ArrowRight') mover('e')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [mover, iniciou])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/trilha')} />

  const cellPx = Math.max(24, Math.floor(300 / tamanho))
  const min = String(Math.floor(tempo / 60)).padStart(2, '0')
  const seg = String(tempo % 60).padStart(2, '0')
  const estrelas = passos <= tamanho * 2 ? 3 : passos <= tamanho * 4 ? 2 : 1
  const xpGanho = Math.round((estrelas / 3) * atividade.xp_reward)
  const coinsGanho = Math.round((estrelas / 3) * atividade.coins_reward)

  if (ganhou) {
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
        <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '8px', letterSpacing: '4px' }}>{'⭐'.repeat(estrelas)}</div>
          <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '6px', color: '#0f0a1e' }}>
            {estrelas === 3 ? 'Saída encontrada! 🏁' : estrelas === 2 ? 'Muito bem! 👏' : 'Labirinto vencido! 💪'}
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '28px', fontSize: '14px' }}>Você chegou à saída!</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', width: '100%' }}>
            {[['+' + xpGanho, 'XP ganho', '#7C3AED'], ['+' + coinsGanho + ' 💰', 'Coins', '#F07A20'], [passos, 'Passos', '#3b82f6'], [min + ':' + seg, 'Tempo', '#10b981']].map(([v, l, c]) => (
              <div key={l} className="card-white" style={{ padding: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: c }}>{v}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button onClick={() => { setPos([0, 0]); setPasos(0); setTempo(0); setGanhou(false) }} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>🔁 Novo labirinto</button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo } })} className="btn-purple" style={{ flex: 1 }}>Concluir ✓</button>
          </div>
        </div>
      </div>
    )
  }

  const btnStyle = (active) => ({
    width: '52px', height: '52px', borderRadius: '14px',
    background: active ? '#7C3AED' : 'white',
    border: '2px solid ' + (active ? '#7C3AED' : '#e5e7eb'),
    color: active ? 'white' : '#374151',
    fontSize: '20px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.1s ease',
  })

  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ paddingBottom: '24px' }}>
        <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/trilha')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900' }}>{atividade.titulo}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Grade {tamanho}×{tamanho} • Chegue ao 🏁!</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: '18px', fontWeight: '900', lineHeight: 1 }}>{min}:{seg}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>{passos} passos</div>
          </div>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {/* Maze grid */}
          <div className="card-white" style={{ padding: '16px', display: 'inline-block' }}>
            {maze.map((row, r) => (
              <div key={r} style={{ display: 'flex' }}>
                {row.map((cell, c) => {
                  const isPlayer = pos[0] === r && pos[1] === c
                  const isExit = r === tamanho - 1 && c === tamanho - 1
                  return (
                    <div key={c} style={{
                      width: cellPx, height: cellPx,
                      borderTop: cell.n ? `2px solid #1e1b4b` : 'none',
                      borderRight: cell.e ? `2px solid #1e1b4b` : 'none',
                      borderBottom: cell.s ? `2px solid #1e1b4b` : 'none',
                      borderLeft: cell.w ? `2px solid #1e1b4b` : 'none',
                      background: isPlayer ? '#ede9fe' : isExit ? '#fef9c3' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: cellPx * 0.5,
                      transition: 'background 0.15s ease',
                    }}>
                      {isPlayer ? '🧒' : isExit ? '🏁' : ''}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* D-pad controls */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <button onClick={() => mover('n')} style={btnStyle(false)}>↑</button>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => mover('w')} style={btnStyle(false)}>←</button>
              <button onClick={() => mover('s')} style={btnStyle(false)}>↓</button>
              <button onClick={() => mover('e')} style={btnStyle(false)}>→</button>
            </div>
          </div>

          <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', fontWeight: '500' }}>
            Toque nas setas ou use o teclado para mover o personagem 🧒
          </p>
        </div>
      </div>
    </div>
  )
}
