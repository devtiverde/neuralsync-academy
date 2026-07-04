import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
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
    if (!atividade) navigate(-1)
  }, [])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} kidsLink={getKidsLink(atividade.id)} />

  const puzzles = atividade.puzzles
  const puzzle = puzzles[atual]
  const total = puzzles.length
  const progresso = (atual / total) * 100

  function responder(opcao) {
    if (selecionado !== null) return
    setSelecionado(opcao)
    if (opcao === puzzle.resposta) { setAcertos(a => a + 1); playSound('correct') }
    else playSound('wrong')
  }

  function avancar() {
    if (atual + 1 < total) {
      playSound('click')
      setAtual(a => a + 1)
      setSelecionado(null)
    } else {
      playSound('complete')
      setEncerrado(true)
    }
  }

  if (encerrado) {
    const pct = Math.round((acertos / total) * 100)
    const xpGanho = Math.round((acertos / total) * atividade.xp_reward)
    const coinsGanho = Math.round((acertos / total) * atividade.coins_reward)
    const estrelas = pct >= 80 ? 3 : pct >= 50 ? 2 : 1
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '24px', textAlign: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', letterSpacing: '6px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>{'⭐'.repeat(estrelas)}</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '30px', fontWeight: '900', marginBottom: '6px' }}>
              {pct >= 80 ? 'Mente afiada! 🎯' : pct >= 50 ? 'Bom trabalho! 👍' : 'Continue praticando! 💪'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>Você acertou {acertos} de {total} padrões</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '420px' }}>
            {[['+' + xpGanho + ' XP', 'Experiência', '#f59e0b'], ['+' + coinsGanho + ' 💰', 'Coins', '#ec4899'], [acertos + '/' + total, 'Acertos', '#10b981'], [pct + '%', 'Pontuação', '#a855f7']].map(([v, l, c]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: c, marginBottom: '4px' }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button onClick={() => { setAtual(0); setSelecionado(null); setAcertos(0); setEncerrado(false) }} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>ðŸ” Repetir</button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(245,158,11,0.4)' }}>
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
      labelProgresso={`${atual + 1} / ${total}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', animation: 'ns-slide-up 0.3s ease' }}>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Qual elemento completa a matriz?
        </p>

        {/* Matrix */}
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '280px', margin: '0 auto 16px' }}>
            {puzzle.matriz.map((item, i) => {
              const isLast = i === puzzle.matriz.length - 1
              const showCorrect = isLast && selecionado !== null
              return (
                <div key={i} style={{
                  background: isLast
                    ? (showCorrect ? 'rgba(16,185,129,0.25)' : 'linear-gradient(135deg, #f59e0b, #fbbf24)')
                    : 'rgba(255,255,255,0.1)',
                  borderRadius: '12px', aspectRatio: '1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: item.length > 4 ? '12px' : item.length > 2 ? '16px' : '24px',
                  fontWeight: '800', color: 'white',
                  border: isLast && showCorrect ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.15)',
                  padding: '4px',
                }}>
                  {isLast && showCorrect ? puzzle.resposta : item}
                </div>
              )
            })}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: '600' }}>💡 {puzzle.dica}</p>
        </div>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {puzzle.opcoes.map((opcao, idx) => {
            let bg = 'rgba(255,255,255,0.07)', border = '2px solid rgba(255,255,255,0.12)', color = 'white'
            if (selecionado !== null) {
              if (opcao === puzzle.resposta) { bg = 'rgba(16,185,129,0.2)'; border = '2px solid #10b981'; color = '#6ee7b7' }
              else if (opcao === selecionado) { bg = 'rgba(239,68,68,0.2)'; border = '2px solid #ef4444'; color = '#fca5a5' }
              else { bg = 'rgba(255,255,255,0.03)'; color = 'rgba(255,255,255,0.25)'; border = '2px solid rgba(255,255,255,0.05)' }
            }
            return (
              <button key={idx} onClick={() => responder(opcao)} style={{
                background: bg, border, borderRadius: '16px', padding: '22px 10px',
                color, cursor: selecionado !== null ? 'default' : 'pointer',
                fontWeight: '800', fontSize: opcao.length > 4 ? '14px' : opcao.length > 2 ? '20px' : '30px',
                fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'center',
                transition: 'all 0.2s ease',
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
          <div style={{
            borderRadius: '16px', padding: '18px 20px',
            background: selecionado === puzzle.resposta ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            border: '1.5px solid ' + (selecionado === puzzle.resposta ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'),
            animation: 'ns-slide-up 0.25s ease',
          }}>
            <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: '800', color: selecionado === puzzle.resposta ? '#6ee7b7' : '#fca5a5', marginBottom: '14px' }}>
              {selecionado === puzzle.resposta ? '✅ Isso mesmo! Padrão identificado!' : '❌ A resposta é: ' + puzzle.resposta}
            </div>
            <button onClick={avancar} style={{
              width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
              background: selecionado === puzzle.resposta ? '#10b981' : '#f59e0b',
              color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              {atual + 1 < total ? 'Próxima →' : 'Ver resultado →'}
            </button>
          </div>
        )}
      </div>
    </GameShell>
  )
}

