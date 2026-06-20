import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
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

  useEffect(() => {
    if (!atividade) navigate('/trilha')
  }, [])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/trilha')} />

  const perguntas = atividade.perguntas
  const pergunta = perguntas[atual]
  const total = perguntas.length
  const progresso = (atual / total) * 100

  function responder(idx) {
    if (selecionado !== null) return
    setSelecionado(idx)
    if (idx === pergunta.correta) setAcertos(a => a + 1)
  }

  function avancar() {
    if (atual + 1 < total) {
      setAtual(a => a + 1)
      setSelecionado(null)
    } else {
      setEncerrado(true)
    }
  }

  function reiniciar() {
    setAtual(0)
    setSelecionado(null)
    setAcertos(0)
    setEncerrado(false)
  }

  if (encerrado) {
    const pctFinal = Math.round((acertos / total) * 100)
    const xpGanho = Math.round((acertos / total) * atividade.xp_reward)
    const coinsGanho = Math.round((acertos / total) * atividade.coins_reward)
    const estrelas = pctFinal >= 80 ? 3 : pctFinal >= 50 ? 2 : 1

    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
        <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '8px', letterSpacing: '4px' }}>{'⭐'.repeat(estrelas)}</div>
          <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '6px', color: '#0f0a1e' }}>
            {pctFinal >= 80 ? 'Incrível! 🎉' : pctFinal >= 50 ? 'Bom trabalho! 👍' : 'Continue tentando! 💪'}
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '28px', fontSize: '14px' }}>
            Você acertou {acertos} de {total} perguntas
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', width: '100%' }}>
            {[
              ['+' + xpGanho, 'XP ganho', '#7C3AED'],
              ['+' + coinsGanho + ' 💰', 'Coins', '#F07A20'],
              [acertos + '/' + total, 'Acertos', '#10b981'],
              [pctFinal + '%', 'Pontuação', '#3b82f6'],
            ].map(([val, label, cor]) => (
              <div key={label} className="card-white" style={{ padding: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: cor }}>{val}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button onClick={reiniciar} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              🔁 Repetir
            </button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo } })} className="btn-purple" style={{ flex: 1 }}>
              Concluir ✓
            </button>
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
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Pergunta {atual + 1} de {total}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 10px', color: 'white', fontSize: '12px', fontWeight: '700' }}>+{atividade.xp_reward} XP</div>
        </div>

        <div style={{ background: '#d1d5db', height: '5px' }}>
          <div style={{ background: 'linear-gradient(90deg, #7C3AED, #a855f7)', height: '100%', width: progresso + '%', transition: 'width 0.4s ease', borderRadius: '0 4px 4px 0' }} />
        </div>

        <div style={{ padding: '20px' }}>
          <div className="card-white" style={{ padding: '28px', marginBottom: '20px', textAlign: 'center', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '42px', marginBottom: '14px' }}>{atividade.emoji}</div>
            <p style={{ fontSize: '17px', fontWeight: '700', color: '#0f0a1e', lineHeight: 1.45 }}>{pergunta.pergunta}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pergunta.opcoes.map((op, idx) => {
              let bg = 'white', border = '1.5px solid #e5e7eb', color = '#0f0a1e', scale = 'scale(1)'
              if (selecionado !== null) {
                if (idx === pergunta.correta) { bg = '#f0fdf4'; border = '2px solid #10b981'; color = '#065f46' }
                else if (idx === selecionado && idx !== pergunta.correta) { bg = '#fef2f2'; border = '2px solid #ef4444'; color = '#991b1b' }
                else { bg = '#f9fafb'; color = '#9ca3af' }
              }
              return (
                <button key={idx} onClick={() => responder(idx)} style={{
                  background: bg, border, borderRadius: '14px', padding: '15px 16px',
                  color, cursor: selecionado !== null ? 'default' : 'pointer',
                  fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif',
                  textAlign: 'left', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  transform: scale,
                }}>
                  <span style={{
                    background: selecionado !== null ? 'transparent' : '#f3f0ff',
                    color: selecionado !== null ? 'inherit' : '#7C3AED',
                    borderRadius: '8px', padding: '3px 8px', fontSize: '12px',
                    fontWeight: '800', minWidth: '22px', textAlign: 'center', flexShrink: 0,
                  }}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  {op}
                  {selecionado !== null && idx === pergunta.correta && <span style={{ marginLeft: 'auto' }}>✅</span>}
                  {selecionado !== null && idx === selecionado && idx !== pergunta.correta && <span style={{ marginLeft: 'auto' }}>❌</span>}
                </button>
              )
            })}
          </div>

          {selecionado !== null && (
            <div style={{
              marginTop: '16px', padding: '14px 16px', borderRadius: '14px',
              background: selecionado === pergunta.correta ? '#f0fdf4' : '#fef2f2',
              border: '1.5px solid ' + (selecionado === pergunta.correta ? '#10b981' : '#ef4444'),
            }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: selecionado === pergunta.correta ? '#065f46' : '#991b1b', marginBottom: pergunta.fato ? '8px' : '12px' }}>
                {selecionado === pergunta.correta
                  ? '✅ Correto! Continue assim!'
                  : '❌ Resposta certa: ' + pergunta.opcoes[pergunta.correta]}
              </div>
              {pergunta.fato && (
                <div style={{ fontSize: '12px', color: '#374151', lineHeight: 1.5, background: 'rgba(0,0,0,0.04)', borderRadius: '8px', padding: '8px 10px', marginBottom: '12px' }}>
                  💡 {pergunta.fato}
                </div>
              )}
              <button onClick={avancar} style={{
                width: '100%', padding: '11px', borderRadius: '10px', border: 'none',
                background: selecionado === pergunta.correta ? '#10b981' : '#7C3AED',
                color: 'white', fontWeight: '800', fontSize: '14px', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
                {atual + 1 < total ? 'Próxima →' : 'Ver resultado →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
