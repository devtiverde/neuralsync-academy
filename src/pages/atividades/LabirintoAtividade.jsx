import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
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
    if (!atividade) navigate(-1)
  }, [])

  useEffect(() => {
    if (!iniciou || ganhou) return
    const t = setInterval(() => setTempo(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [iniciou, ganhou])

  useEffect(() => {
    if (pos[0] === tamanho - 1 && pos[1] === tamanho - 1) {
      playSound('complete')
      setGanhou(true)
    }
  }, [pos])

  const mover = useCallback((dir) => {
    if (ganhou) return
    setPos(([r, c]) => {
      const cell = maze[r][c]
      if (dir === 'n' && !cell.n && r > 0) { setPasos(p => p + 1); playSound('click'); return [r - 1, c] }
      if (dir === 's' && !cell.s && r < tamanho - 1) { setPasos(p => p + 1); playSound('click'); return [r + 1, c] }
      if (dir === 'w' && !cell.w && c > 0) { setPasos(p => p + 1); playSound('click'); return [r, c - 1] }
      if (dir === 'e' && !cell.e && c < tamanho - 1) { setPasos(p => p + 1); playSound('click'); return [r, c + 1] }
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
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} kidsLink={null} />

  const cellPx = Math.max(28, Math.floor(400 / tamanho))
  const min = String(Math.floor(tempo / 60)).padStart(2, '0')
  const seg = String(tempo % 60).padStart(2, '0')
  const estrelas = passos <= tamanho * 2 ? 3 : passos <= tamanho * 4 ? 2 : 1
  const xpGanho = Math.round((estrelas / 3) * atividade.xp_reward)
  const coinsGanho = Math.round((estrelas / 3) * atividade.coins_reward)
  const progresso = ganhou ? 100 : Math.min(90, Math.round((passos / (tamanho * tamanho)) * 100))

  const btnD = (label, dir) => (
    <button onClick={() => mover(dir)} style={{
      width: '52px', height: '52px', borderRadius: '14px',
      background: '#ef4444', border: 'none', color: 'white',
      fontSize: '20px', cursor: 'pointer', fontWeight: '700',
      boxShadow: '0 4px 12px rgba(239,68,68,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'transform 0.1s ease',
    }}>{label}</button>
  )

  if (ganhou) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '24px', textAlign: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', letterSpacing: '6px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>{'⭐'.repeat(estrelas)}</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '30px', fontWeight: '900', marginBottom: '6px' }}>
              {estrelas === 3 ? 'Saída encontrada! 🏁' : estrelas === 2 ? 'Muito bem! 👏' : 'Labirinto vencido! 💪'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>Você chegou à saída!</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '420px' }}>
            {[['+' + xpGanho + ' XP', 'Experiência', '#ef4444'], ['+' + coinsGanho + ' 💰', 'Coins', '#f59e0b'], [passos, 'Passos', '#3b82f6'], [min + ':' + seg, 'Tempo', '#10b981']].map(([v, l, c]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: c, marginBottom: '4px' }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button onClick={() => { setPos([0, 0]); setPasos(0); setTempo(0); setGanhou(false) }} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>ðŸ” Novo labirinto</button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#ef4444,#f87171)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(239,68,68,0.4)' }}>
              Concluir ✓
            </button>
          </div>
        </div>
      </GameShell>
    )
  }

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`${passos} passos • ${min}:${seg}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '680px', width: '100%', margin: '0 auto' }}>

        {/* Maze */}
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)', display: 'inline-block' }}>
          {maze.map((row, r) => (
            <div key={r} style={{ display: 'flex' }}>
              {row.map((cell, c) => {
                const isPlayer = pos[0] === r && pos[1] === c
                const isExit = r === tamanho - 1 && c === tamanho - 1
                return (
                  <div key={c} style={{
                    width: cellPx, height: cellPx,
                    borderTop: cell.n ? `2px solid rgba(239,68,68,0.5)` : 'none',
                    borderRight: cell.e ? `2px solid rgba(239,68,68,0.5)` : 'none',
                    borderBottom: cell.s ? `2px solid rgba(239,68,68,0.5)` : 'none',
                    borderLeft: cell.w ? `2px solid rgba(239,68,68,0.5)` : 'none',
                    background: isPlayer ? 'rgba(239,68,68,0.3)' : isExit ? 'rgba(245,158,11,0.25)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: cellPx * 0.55,
                    transition: 'background 0.15s ease',
                  }}>
                    {isPlayer ? '🧒' : isExit ? '🏁' : ''}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* D-pad */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {btnD('↑', 'n')}
          <div style={{ display: 'flex', gap: '8px' }}>
            {btnD('←', 'w')}
            {btnD('↓', 's')}
            {btnD('→', 'e')}
          </div>
        </div>

        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', fontWeight: '500' }}>
          Setas do teclado também funcionam! Chegue ao 🏁
        </p>
      </div>
    </GameShell>
  )
}

