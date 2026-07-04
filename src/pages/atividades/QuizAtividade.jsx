import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

export default function QuizAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [atual, setAtual] = useState(0)
  const [selecionado, setSelecionado] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const [encerrado, setEncerrado] = useState(false)
  const [animIn, setAnimIn] = useState(true)

  useEffect(() => { if (!atividade) navigate(-1) }, [])
  if (!atividade) return null

  const kidsLink = getKidsLink(atividade.id)
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} kidsLink={kidsLink} />

  const perguntas = atividade.perguntas
  if (!perguntas || perguntas.length === 0) return (
    <GameShell atividade={atividade} tipo={atividade.tipo} progresso={0} onVoltar={() => navigate(-1)}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '16px' }}>
        <div style={{ fontSize: '64px' }}>😕</div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>Esta atividade está em manutenção.<br />Tente outra da trilha!</p>
        <button onClick={() => navigate(-1)} style={{ background: '#7C3AED', border: 'none', borderRadius: '12px', padding: '12px 28px', color: 'white', fontWeight: '700', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>← Voltar à trilha</button>
      </div>
    </GameShell>
  )
  const pergunta = perguntas[atual]
  const total = perguntas.length
  const progresso = (atual / total) * 100

  function responder(idx) {
    if (selecionado !== null) return
    setSelecionado(idx)
    if (idx === pergunta.correta) { setAcertos(a => a + 1); playSound('correct') }
    else playSound('wrong')
  }

  function avancar() {
    if (atual + 1 < total) {
      playSound('click')
      setAnimIn(false)
      setTimeout(() => { setAtual(a => a + 1); setSelecionado(null); setAnimIn(true) }, 200)
    } else {
      playSound('complete')
      setEncerrado(true)
    }
  }

  function reiniciar() { setAtual(0); setSelecionado(null); setAcertos(0); setEncerrado(false); setAnimIn(true) }

  if (encerrado) {
    const pctFinal = Math.round((acertos / total) * 100)
    const xpGanho = Math.round((acertos / total) * atividade.xp_reward)
    const coinsGanho = Math.round((acertos / total) * atividade.coins_reward)
    const estrelas = pctFinal >= 80 ? 3 : pctFinal >= 50 ? 2 : 1
    const msg = pctFinal >= 80 ? 'Incrível! 🎉' : pctFinal >= 50 ? 'Bom trabalho! 👍' : 'Continue tentando! 💪'

    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ fontSize: '72px', letterSpacing: '6px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>{'⭐'.repeat(estrelas)}</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '6px' }}>{msg}</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você acertou {acertos} de {total} perguntas</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px', width: '100%', maxWidth: '420px' }}>
            {[
              ['+' + xpGanho + ' XP', 'Experiência', '#7C3AED'],
              ['+' + coinsGanho + ' 💰', 'Coins', '#f59e0b'],
              [acertos + '/' + total, 'Acertos', '#10b981'],
              [pctFinal + '%', 'Pontuação', '#3b82f6'],
            ].map(([val, lbl, cor]) => (
              <div key={lbl} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: cor, marginBottom: '4px' }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button onClick={reiniciar} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              🔄 Repetir
            </button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#7C3AED,#a855f7)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(124,58,237,0.4)' }}>
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
      <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', animation: animIn ? 'ns-slide-up 0.3s ease' : 'none' }}>

        {/* Question card */}
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '52px', marginBottom: '18px', lineHeight: 1 }}>{atividade.emoji}</div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Pergunta {atual + 1} de {total}</div>
          <p style={{ color: 'white', fontSize: '20px', fontWeight: '700', lineHeight: 1.5, margin: 0 }}>{pergunta.pergunta}</p>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {pergunta.opcoes.map((op, idx) => {
            let cls = 'quiz-option'
            if (selecionado !== null) {
              if (idx === pergunta.correta) cls += ' correct'
              else if (idx === selecionado) cls += ' wrong'
              else cls += ' dimmed'
            }
            return (
              <button key={idx} className={cls} onClick={() => responder(idx)} disabled={selecionado !== null}>
                <span style={{
                  background: selecionado === null ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: selecionado === null ? 'rgba(255,255,255,0.7)' : 'inherit',
                  borderRadius: '8px', padding: '4px 10px', fontSize: '13px',
                  fontWeight: '900', minWidth: '28px', textAlign: 'center', flexShrink: 0,
                }}>
                  {['A','B','C','D'][idx]}
                </span>
                <span style={{ flex: 1 }}>{op}</span>
                {selecionado !== null && idx === pergunta.correta && <span>✅</span>}
                {selecionado !== null && idx === selecionado && idx !== pergunta.correta && <span>❌</span>}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {selecionado !== null && (
          <div style={{
            borderRadius: '16px', padding: '18px 20px',
            background: selecionado === pergunta.correta ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            border: '1.5px solid ' + (selecionado === pergunta.correta ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'),
            animation: 'ns-slide-up 0.25s ease',
          }}>
            <div style={{ fontWeight: '800', fontSize: '15px', color: selecionado === pergunta.correta ? '#6ee7b7' : '#fca5a5', marginBottom: pergunta.fato ? '10px' : '14px' }}>
              {selecionado === pergunta.correta ? '✅ Correto! Muito bem!' : `❌ A resposta certa era: ${pergunta.opcoes[pergunta.correta]}`}
            </div>
            {pergunta.fato && (
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.6, background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px' }}>
                💡 {pergunta.fato}
              </div>
            )}
            <button onClick={avancar} style={{
              width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
              background: selecionado === pergunta.correta ? '#10b981' : '#7C3AED',
              color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              boxShadow: selecionado === pergunta.correta ? '0 6px 20px rgba(16,185,129,0.4)' : '0 6px 20px rgba(124,58,237,0.4)',
            }}>
              {atual + 1 < total ? 'Próxima pergunta →' : 'Ver resultado →'}
            </button>
          </div>
        )}
      </div>
    </GameShell>
  )
}

