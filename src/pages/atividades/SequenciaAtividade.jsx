import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
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
    if (!atividade) navigate(-1)
  }, [])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} kidsLink={getKidsLink(atividade.id)} />

  const sequencias = atividade.sequencias
  const seq = sequencias[atual]
  const total = sequencias.length
  const progresso = (atual / total) * 100

  function responder(opcao) {
    if (selecionado !== null) return
    setSelecionado(opcao)
    if (opcao === seq.resposta) { setAcertos(a => a + 1); playSound('correct') }
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
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '24px', textAlign: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', letterSpacing: '6px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>{'⭐'.repeat(estrelas)}</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '30px', fontWeight: '900', marginBottom: '6px' }}>
              {pct >= 80 ? 'Raciocínio afiado! 🧠' : pct >= 50 ? 'Bom trabalho! 👍' : 'Continue praticando! 💪'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>Você acertou {acertos} de {total} sequências</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '420px' }}>
            {[
              ['+' + xpGanho + ' XP', 'Experiência', '#10b981'],
              ['+' + coinsGanho + ' 💰', 'Coins', '#f59e0b'],
              [acertos + '/' + total, 'Acertos', '#3b82f6'],
              [pct + '%', 'Pontuação', '#a855f7'],
            ].map(([val, label, cor]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: cor, marginBottom: '4px' }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{label}</div>
              </div>
            ))}
          </div>

          {atividade.contexto_matematico && (
            <div style={{ background: 'rgba(16,185,129,0.1)', borderRadius: '14px', padding: '16px 18px', border: '1px solid rgba(16,185,129,0.3)', width: '100%', maxWidth: '420px' }}>
              <div style={{ fontSize: '10px', color: '#6ee7b7', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>🧠 SABIA QUE...</div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0, fontWeight: '500' }}>{atividade.contexto_matematico}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button onClick={reiniciar} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              🔁 Repetir
            </button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#10b981,#34d399)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(16,185,129,0.4)' }}>
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

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
            Qual elemento completa a sequência?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {seq.items.map((item, i) => (
              <div key={i} style={{
                background: item === '❓' ? 'linear-gradient(135deg, #10b981, #34d399)' : 'rgba(255,255,255,0.1)',
                borderRadius: '14px', padding: '14px 18px',
                fontSize: item.length > 2 ? '18px' : '26px',
                fontWeight: '900', color: 'white', minWidth: '52px', textAlign: 'center',
                boxShadow: item === '❓' ? '0 4px 16px rgba(16,185,129,0.4)' : 'none',
                border: item === '❓' ? 'none' : '1px solid rgba(255,255,255,0.15)',
              }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {atividade.legenda && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {Object.entries(atividade.legenda).map(([emoji, nome]) => (
              <div key={emoji} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '20px', padding: '5px 12px', fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                {emoji} {nome}
              </div>
            ))}
          </div>
        )}

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: '600' }}>
          Escolha a resposta correta:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {seq.opcoes.map((opcao, idx) => {
            let bg = 'rgba(255,255,255,0.07)', border = '2px solid rgba(255,255,255,0.12)', color = 'white'
            if (selecionado !== null) {
              if (opcao === seq.resposta) { bg = 'rgba(16,185,129,0.2)'; border = '2px solid #10b981'; color = '#6ee7b7' }
              else if (opcao === selecionado && opcao !== seq.resposta) { bg = 'rgba(239,68,68,0.2)'; border = '2px solid #ef4444'; color = '#fca5a5' }
              else { bg = 'rgba(255,255,255,0.03)'; color = 'rgba(255,255,255,0.25)'; border = '2px solid rgba(255,255,255,0.05)' }
            }
            return (
              <button key={idx} onClick={() => responder(opcao)} style={{
                background: bg, border, borderRadius: '16px', padding: '22px 14px',
                color, cursor: selecionado !== null ? 'default' : 'pointer',
                fontWeight: '800', fontSize: opcao.length > 4 ? '18px' : '32px',
                fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'center',
                transition: 'all 0.2s ease',
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
            borderRadius: '16px', padding: '18px 20px',
            background: selecionado === seq.resposta ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            border: '1.5px solid ' + (selecionado === seq.resposta ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'),
            animation: 'ns-slide-up 0.25s ease',
          }}>
            <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: '800', color: selecionado === seq.resposta ? '#6ee7b7' : '#fca5a5', marginBottom: '14px' }}>
              {selecionado === seq.resposta ? '✅ Isso mesmo! Lógica perfeita!' : '❌ A resposta correta é: ' + seq.resposta}
            </div>
            <button onClick={avancar} style={{
              width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
              background: selecionado === seq.resposta ? '#10b981' : '#7C3AED',
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

