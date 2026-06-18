import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import { gerarQuizIA, getFaixa } from '../../lib/claude'
import '../../styles/crianca.css'

export default function QuizIAAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [fase, setFase] = useState('temas') // temas | carregando | jogando | encerrado
  const [temaSelecionado, setTemaSelecionado] = useState('')
  const [perguntas, setPerguntas] = useState([])
  const [erroAPI, setErroAPI] = useState(null)
  const [atual, setAtual] = useState(0)
  const [selecionado, setSelecionado] = useState(null)
  const [acertos, setAcertos] = useState(0)

  useEffect(() => {
    if (!atividade) navigate('/trilha')
  }, [])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/trilha')} />

  const faixa = getFaixa(atividade.id)
  const temas = atividade.temas || []

  async function escolherTema(tema) {
    setTemaSelecionado(tema)
    setFase('carregando')
    setErroAPI(null)
    try {
      const nomeSimples = tema.replace(/^\S+\s/, '')
      const data = await gerarQuizIA(nomeSimples, faixa)
      setPerguntas(data.perguntas)
      setAtual(0)
      setSelecionado(null)
      setAcertos(0)
      setFase('jogando')
    } catch {
      setErroAPI('Não foi possível gerar o quiz. Verifique sua conexão e a chave de API.')
      setFase('temas')
    }
  }

  function responder(idx) {
    if (selecionado !== null) return
    setSelecionado(idx)
    if (idx === perguntas[atual].correta) setAcertos(a => a + 1)
    setTimeout(() => {
      if (atual + 1 < perguntas.length) {
        setAtual(a => a + 1)
        setSelecionado(null)
      } else {
        setFase('encerrado')
      }
    }, 1500)
  }

  // ── FASE: CARREGANDO
  if (fase === 'carregando') {
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{`@keyframes ns-spin{to{transform:rotate(360deg)}} @keyframes ns-pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        <div style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '64px', animation: 'ns-spin 2s linear infinite', display: 'inline-block', marginBottom: '20px' }}>🤖</div>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f0a1e', marginBottom: '8px' }}>Criando perguntas sobre</h3>
          <div style={{ background: 'linear-gradient(135deg, #7C3AED, #a855f7)', color: 'white', borderRadius: '20px', padding: '6px 18px', display: 'inline-block', fontWeight: '700', fontSize: '15px', marginBottom: '16px' }}>{temaSelecionado}</div>
          <p style={{ color: '#6b7280', fontSize: '13px', animation: 'ns-pulse 1.5s ease-in-out infinite' }}>A IA está gerando perguntas especiais para você...</p>
        </div>
      </div>
    )
  }

  // ── FASE: ENCERRADO
  if (fase === 'encerrado') {
    const total = perguntas.length
    const pct = Math.round((acertos / total) * 100)
    const xpGanho = Math.round((acertos / total) * atividade.xp_reward)
    const coinsGanho = Math.round((acertos / total) * atividade.coins_reward)
    const estrelas = pct >= 80 ? 3 : pct >= 50 ? 2 : 1
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
        <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '8px', letterSpacing: '4px' }}>{'⭐'.repeat(estrelas)}</div>
          <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '4px', color: '#0f0a1e' }}>
            {pct >= 80 ? 'Incrível! 🎉' : pct >= 50 ? 'Bom trabalho! 👍' : 'Continue tentando! 💪'}
          </h2>
          <div style={{ background: 'rgba(124,58,237,0.08)', borderRadius: '10px', padding: '4px 14px', marginBottom: '20px', display: 'inline-block' }}>
            <span style={{ fontSize: '13px', color: '#7C3AED', fontWeight: '700' }}>🤖 Tema: {temaSelecionado}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', width: '100%' }}>
            {[['+' + xpGanho, 'XP ganho', '#7C3AED'], ['+' + coinsGanho + ' 💰', 'Coins', '#F07A20'], [acertos + '/' + total, 'Acertos', '#10b981'], [pct + '%', 'Pontuação', '#ec4899']].map(([v, l, c]) => (
              <div key={l} className="card-white" style={{ padding: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: c }}>{v}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button onClick={() => setFase('temas')} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>🤖 Novo tema</button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo + ' — ' + temaSelecionado, emoji: atividade.emoji, tipo: atividade.tipo } })} className="btn-purple" style={{ flex: 1 }}>Concluir ✓</button>
          </div>
        </div>
      </div>
    )
  }

  // ── FASE: TEMAS
  if (fase === 'temas') {
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
        <div className="page-wrapper" style={{ paddingBottom: '24px' }}>
          <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => navigate('/trilha')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900' }}>Quiz com IA 🤖</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Escolha um tema para começar</p>
            </div>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '52px', marginBottom: '10px' }}>🤖</div>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f0a1e', marginBottom: '6px' }}>Sobre o que você quer aprender?</h3>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>A IA cria 5 perguntas novas, só para você!</p>
            </div>

            {erroAPI && (
              <div style={{ background: '#fef2f2', border: '1px solid #ef4444', borderRadius: '10px', padding: '12px', marginBottom: '16px', color: '#991b1b', fontSize: '13px', textAlign: 'center' }}>
                ⚠️ {erroAPI}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {temas.map((tema, i) => {
                const emoji = tema.split(' ')[0]
                const nome = tema.replace(/^\S+\s/, '')
                return (
                  <button key={i} onClick={() => escolherTema(tema)} style={{
                    background: 'white', border: '2px solid #e5e7eb', borderRadius: '16px',
                    padding: '22px 12px', cursor: 'pointer',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  }}>
                    <span style={{ fontSize: '30px' }}>{emoji}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f0a1e' }}>{nome}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── FASE: JOGANDO
  const pergunta = perguntas[atual]
  const total = perguntas.length
  const progresso = (atual / total) * 100

  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ paddingBottom: '24px' }}>
        <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setFase('temas')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900' }}>{temaSelecionado}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Pergunta {atual + 1} de {total} • Quiz IA 🤖</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 10px', color: 'white', fontSize: '12px', fontWeight: '700' }}>+{atividade.xp_reward} XP</div>
        </div>

        <div style={{ background: '#d1d5db', height: '5px' }}>
          <div style={{ background: 'linear-gradient(90deg, #7C3AED, #a855f7)', height: '100%', width: progresso + '%', transition: 'width 0.4s ease', borderRadius: '0 4px 4px 0' }} />
        </div>

        <div style={{ padding: '20px' }}>
          <div className="card-white" style={{ padding: '22px', marginBottom: '18px' }}>
            <div style={{ fontSize: '10px', color: '#7C3AED', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#ede9fe', borderRadius: '6px', padding: '2px 8px' }}>🤖 Gerado por IA</span>
            </div>
            <p style={{ fontSize: '17px', fontWeight: '800', color: '#0f0a1e', lineHeight: 1.4, margin: 0 }}>{pergunta.pergunta}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            {pergunta.opcoes.map((opcao, idx) => {
              let bg = 'white', border = '1.5px solid #e5e7eb', color = '#0f0a1e'
              if (selecionado !== null) {
                if (idx === pergunta.correta) { bg = '#f0fdf4'; border = '2px solid #10b981'; color = '#065f46' }
                else if (idx === selecionado && idx !== pergunta.correta) { bg = '#fef2f2'; border = '2px solid #ef4444'; color = '#991b1b' }
                else { bg = '#f9fafb'; color = '#9ca3af' }
              }
              return (
                <button key={idx} onClick={() => responder(idx)} style={{
                  background: bg, border, borderRadius: '14px', padding: '16px 12px',
                  color, cursor: selecionado !== null ? 'default' : 'pointer',
                  fontWeight: '700', fontSize: '13px', textAlign: 'left',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{
                    background: selecionado !== null && idx === pergunta.correta ? '#10b981' : '#f3f4f6',
                    color: selecionado !== null && idx === pergunta.correta ? 'white' : '#6b7280',
                    borderRadius: '6px', minWidth: '22px', height: '22px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: '800', flexShrink: 0,
                  }}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  {opcao}
                </button>
              )
            })}
          </div>

          {selecionado !== null && (
            <div style={{ padding: '14px 16px', borderRadius: '12px', background: '#fef9c3', border: '1.5px solid #fbbf24' }}>
              <div style={{ fontSize: '10px', color: '#92400e', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>💡 SABIA QUE...</div>
              <p style={{ fontSize: '13px', color: '#78350f', margin: 0, lineHeight: 1.5, fontWeight: '500' }}>{pergunta.fato}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
