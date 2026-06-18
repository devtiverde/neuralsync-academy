import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import '../../styles/crianca.css'

export default function SequenciaAtividade() {
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

  const sequencias = atividade.sequencias
  const seq = sequencias[atual]
  const total = sequencias.length
  const progresso = (atual / total) * 100

  function responder(opcao) {
    if (selecionado !== null) return
    setSelecionado(opcao)
    if (opcao === seq.resposta) setAcertos(a => a + 1)
    setTimeout(() => {
      if (atual + 1 < total) {
        setAtual(a => a + 1)
        setSelecionado(null)
      } else {
        setEncerrado(true)
      }
    }, 1300)
  }

  function reiniciar() {
    setAtual(0)
    setSelecionado(null)
    setAcertos(0)
    setEncerrado(false)
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
            {pct >= 80 ? 'Raciocínio afiado! 🧠' : pct >= 50 ? 'Bom trabalho! 👍' : 'Continue praticando! 💪'}
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '28px', fontSize: '14px' }}>
            Você acertou {acertos} de {total} sequências
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', width: '100%' }}>
            {[
              ['+' + xpGanho, 'XP ganho', '#7C3AED'],
              ['+' + coinsGanho + ' 💰', 'Coins', '#F07A20'],
              [acertos + '/' + total, 'Acertos', '#10b981'],
              [pct + '%', 'Pontuação', '#3b82f6'],
            ].map(([val, label, cor]) => (
              <div key={label} className="card-white" style={{ padding: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: cor }}>{val}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{label}</div>
              </div>
            ))}
          </div>

          {atividade.contexto_matematico && (
            <div style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', borderRadius: '14px', padding: '14px 16px', border: '1.5px solid #c4b5fd', width: '100%' }}>
              <div style={{ fontSize: '10px', color: '#7C3AED', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>🧠 SABIA QUE...</div>
              <p style={{ fontSize: '13px', color: '#4c1d95', lineHeight: 1.5, margin: 0, fontWeight: '500' }}>{atividade.contexto_matematico}</p>
            </div>
          )}

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
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Sequência {atual + 1} de {total}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 10px', color: 'white', fontSize: '12px', fontWeight: '700' }}>+{atividade.xp_reward} XP</div>
        </div>

        <div style={{ background: '#d1d5db', height: '5px' }}>
          <div style={{ background: 'linear-gradient(90deg, #10b981, #34d399)', height: '100%', width: progresso + '%', transition: 'width 0.4s ease', borderRadius: '0 4px 4px 0' }} />
        </div>

        <div style={{ padding: '20px' }}>
          <div className="card-white" style={{ padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
              Qual elemento completa a sequência?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {seq.items.map((item, i) => (
                <div key={i} style={{
                  background: item === '❓' ? 'linear-gradient(135deg, #7C3AED, #a855f7)' : '#f3f4f6',
                  borderRadius: '12px',
                  padding: item === '❓' ? '12px 16px' : '12px 16px',
                  fontSize: item.length > 2 ? '16px' : '24px',
                  fontWeight: '900',
                  color: item === '❓' ? 'white' : '#0f0a1e',
                  minWidth: '48px',
                  boxShadow: item === '❓' ? '0 4px 12px rgba(124,58,237,0.3)' : 'none',
                  border: item === '❓' ? 'none' : '1.5px solid #e5e7eb',
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {atividade.legenda && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '10px' }}>
              {Object.entries(atividade.legenda).map(([emoji, nome]) => (
                <div key={emoji} style={{ background: 'white', borderRadius: '20px', padding: '4px 10px', fontSize: '12px', fontWeight: '600', color: '#374151', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {emoji} {nome}
                </div>
              ))}
            </div>
          )}

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', fontWeight: '600', marginBottom: '14px' }}>
            Escolha a resposta correta:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {seq.opcoes.map((opcao, idx) => {
              let bg = 'white', border = '1.5px solid #e5e7eb', color = '#0f0a1e'
              if (selecionado !== null) {
                if (opcao === seq.resposta) { bg = '#f0fdf4'; border = '2px solid #10b981'; color = '#065f46' }
                else if (opcao === selecionado && opcao !== seq.resposta) { bg = '#fef2f2'; border = '2px solid #ef4444'; color = '#991b1b' }
                else { bg = '#f9fafb'; color = '#9ca3af' }
              }
              return (
                <button key={idx} onClick={() => responder(opcao)} style={{
                  background: bg, border, borderRadius: '16px', padding: '20px 12px',
                  color, cursor: selecionado !== null ? 'default' : 'pointer',
                  fontWeight: '800', fontSize: opcao.length > 4 ? '16px' : '28px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  textAlign: 'center', transition: 'all 0.2s ease',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                }}>
                  {opcao}
                  {selecionado !== null && opcao === seq.resposta && <span style={{ fontSize: '16px' }}>✅</span>}
                  {selecionado !== null && opcao === selecionado && opcao !== seq.resposta && <span style={{ fontSize: '16px' }}>❌</span>}
                </button>
              )
            })}
          </div>

          {selecionado !== null && (
            <div style={{
              marginTop: '16px', padding: '13px 16px', borderRadius: '12px',
              background: selecionado === seq.resposta ? '#f0fdf4' : '#fef2f2',
              border: '1px solid ' + (selecionado === seq.resposta ? '#10b981' : '#ef4444'),
              textAlign: 'center', fontSize: '14px', fontWeight: '600',
              color: selecionado === seq.resposta ? '#065f46' : '#991b1b',
            }}>
              {selecionado === seq.resposta
                ? '✅ Isso mesmo! Lógica perfeita!'
                : '❌ A resposta correta é: ' + seq.resposta}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
