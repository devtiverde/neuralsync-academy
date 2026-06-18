import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import '../../styles/crianca.css'

export default function PadraoAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [atual, setAtual] = useState(0)
  const [selecionado, setSelecionado] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const [encerrado, setEncerrado] = useState(false)

  useEffect(() => {
    if (!atividade) navigate('/trilha')
  }, [])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/trilha')} />

  const puzzles = atividade.puzzles
  const puzzle = puzzles[atual]
  const total = puzzles.length
  const progresso = (atual / total) * 100

  function responder(opcao) {
    if (selecionado !== null) return
    setSelecionado(opcao)
    if (opcao === puzzle.resposta) setAcertos(a => a + 1)
    setTimeout(() => {
      if (atual + 1 < total) {
        setAtual(a => a + 1)
        setSelecionado(null)
      } else {
        setEncerrado(true)
      }
    }, 1400)
  }

  if (encerrado) {
    const pct = Math.round((acertos / total) * 100)
    const xpGanho = Math.round((acertos / total) * atividade.xp_reward)
    const coinsGanho = Math.round((acertos / total) * atividade.coins_reward)
    const estrelas = pct >= 80 ? 3 : pct >= 50 ? 2 : 1
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
        <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '8px', letterSpacing: '4px' }}>{'⭐'.repeat(estrelas)}</div>
          <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '6px', color: '#0f0a1e' }}>
            {pct >= 80 ? 'Mente afiada! 🎯' : pct >= 50 ? 'Bom trabalho! 👍' : 'Continue praticando! 💪'}
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '28px', fontSize: '14px' }}>Você acertou {acertos} de {total} padrões</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', width: '100%' }}>
            {[['+' + xpGanho, 'XP ganho', '#7C3AED'], ['+' + coinsGanho + ' 💰', 'Coins', '#F07A20'], [acertos + '/' + total, 'Acertos', '#10b981'], [pct + '%', 'Pontuação', '#ec4899']].map(([v, l, c]) => (
              <div key={l} className="card-white" style={{ padding: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: c }}>{v}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button onClick={() => { setAtual(0); setSelecionado(null); setAcertos(0); setEncerrado(false) }} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>🔁 Repetir</button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo } })} className="btn-purple" style={{ flex: 1 }}>Concluir ✓</button>
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
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Padrão {atual + 1} de {total}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 10px', color: 'white', fontSize: '12px', fontWeight: '700' }}>+{atividade.xp_reward} XP</div>
        </div>

        <div style={{ background: '#d1d5db', height: '5px' }}>
          <div style={{ background: 'linear-gradient(90deg, #ec4899, #f472b6)', height: '100%', width: progresso + '%', transition: 'width 0.4s ease', borderRadius: '0 4px 4px 0' }} />
        </div>

        <div style={{ padding: '20px' }}>
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', fontWeight: '600', marginBottom: '14px' }}>
            Qual elemento completa a matriz?
          </p>

          <div className="card-white" style={{ padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '240px', margin: '0 auto' }}>
              {puzzle.matriz.map((item, i) => {
                const isLast = i === puzzle.matriz.length - 1
                const showCorrect = isLast && selecionado !== null
                return (
                  <div key={i} style={{
                    background: isLast ? (showCorrect ? '#f0fdf4' : 'linear-gradient(135deg, #ec4899, #f472b6)') : '#f3f4f6',
                    borderRadius: '10px',
                    aspectRatio: '1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: item.length > 4 ? '10px' : item.length > 2 ? '13px' : '20px',
                    fontWeight: '800',
                    color: isLast && !showCorrect ? 'white' : '#0f0a1e',
                    border: isLast ? (showCorrect ? '2px solid #10b981' : 'none') : '1px solid #e5e7eb',
                    padding: '4px',
                  }}>
                    {isLast && showCorrect ? puzzle.resposta : item}
                  </div>
                )
              })}
            </div>
            <p style={{ textAlign: 'center', fontSize: '11px', color: '#9ca3af', marginTop: '12px', fontWeight: '500' }}>
              💡 {puzzle.dica}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {puzzle.opcoes.map((opcao, idx) => {
              let bg = 'white', border = '1.5px solid #e5e7eb', color = '#0f0a1e'
              if (selecionado !== null) {
                if (opcao === puzzle.resposta) { bg = '#f0fdf4'; border = '2px solid #10b981'; color = '#065f46' }
                else if (opcao === selecionado) { bg = '#fef2f2'; border = '2px solid #ef4444'; color = '#991b1b' }
                else { bg = '#f9fafb'; color = '#9ca3af' }
              }
              return (
                <button key={idx} onClick={() => responder(opcao)} style={{
                  background: bg, border, borderRadius: '14px', padding: '18px 10px',
                  color, cursor: selecionado !== null ? 'default' : 'pointer',
                  fontWeight: '800', fontSize: opcao.length > 4 ? '12px' : opcao.length > 2 ? '18px' : '28px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  textAlign: 'center', transition: 'all 0.2s ease',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
                  {opcao}
                  {selecionado !== null && opcao === puzzle.resposta && <span style={{ fontSize: '14px' }}>✅</span>}
                  {selecionado !== null && opcao === selecionado && opcao !== puzzle.resposta && <span style={{ fontSize: '14px' }}>❌</span>}
                </button>
              )
            })}
          </div>

          {selecionado !== null && (
            <div style={{ marginTop: '14px', padding: '12px 16px', borderRadius: '12px', background: selecionado === puzzle.resposta ? '#f0fdf4' : '#fef2f2', border: '1px solid ' + (selecionado === puzzle.resposta ? '#10b981' : '#ef4444'), textAlign: 'center', fontSize: '13px', fontWeight: '600', color: selecionado === puzzle.resposta ? '#065f46' : '#991b1b' }}>
              {selecionado === puzzle.resposta ? '✅ Isso mesmo! Padrão identificado!' : '❌ A resposta é: ' + puzzle.resposta}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
