import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutCrianca from '../../components/LayoutCrianca'
import GameShell from '../../components/GameShell'
import { gerarQuizIA } from '../../lib/claude'
import { playSound } from '../../lib/sounds'
import '../../styles/crianca.css'

const TEMAS = [
  { emoji: '🐾', nome: 'Animais' },
  { emoji: '🪐', nome: 'Planetas' },
  { emoji: '🦕', nome: 'Dinossauros' },
  { emoji: '🌊', nome: 'Oceano' },
  { emoji: '💻', nome: 'Tecnologia' },
  { emoji: '🎨', nome: 'Arte' },
  { emoji: '🏛️', nome: 'História' },
  { emoji: '🔢', nome: 'Matemática' },
  { emoji: '🫀', nome: 'Corpo Humano' },
  { emoji: '🍕', nome: 'Comida' },
  { emoji: '⚽', nome: 'Esporte' },
  { emoji: '🎵', nome: 'Música' },
  { emoji: '🌿', nome: 'Natureza' },
  { emoji: '🚀', nome: 'Astronomia' },
  { emoji: '🤖', nome: 'Robótica' },
  { emoji: '🌍', nome: 'Geografia' },
]

const MOCK_ATIVIDADE = {
  titulo: 'Quiz IA Livre',
  tipo: 'quizia',
  emoji: '🤖',
  xp_reward: 50,
  coins_reward: 40,
}

export default function QuizIALivre() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [fase, setFase] = useState('inicio')
  const [temaInput, setTemaInput] = useState('')
  const [temaSelecionado, setTemaSelecionado] = useState('')
  const [perguntas, setPerguntas] = useState([])
  const [erroAPI, setErroAPI] = useState(null)
  const [atual, setAtual] = useState(0)
  const [selecionado, setSelecionado] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    const stored = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (!stored) { navigate('/home-crianca'); return }
    setChild(stored)
  }, [])

  async function iniciarQuiz(tema) {
    const temaLimpo = tema.trim()
    if (!temaLimpo) return
    setTemaSelecionado(temaLimpo)
    setFase('carregando')
    setErroAPI(null)
    try {
      const faixa = child?.faixa_etaria || 'construtores'
      const data = await gerarQuizIA(temaLimpo, faixa)
      setPerguntas(data.perguntas)
      setAtual(0)
      setSelecionado(null)
      setAcertos(0)
      setFase('jogando')
    } catch (e) {
      setErroAPI(e.message || 'Não foi possível gerar o quiz. Tente novamente!')
      setFase('inicio')
    }
  }

  function responder(idx) {
    if (selecionado !== null) return
    setSelecionado(idx)
    if (idx === perguntas[atual].correta) { setAcertos(a => a + 1); playSound('correct') }
    else playSound('wrong')
  }

  function avancar() {
    if (atual + 1 < perguntas.length) { playSound('click'); setAtual(a => a + 1); setSelecionado(null) }
    else { playSound('complete'); setFase('encerrado') }
  }

  if (!child) return null

  if (fase === 'carregando') {
    return (
      <GameShell atividade={MOCK_ATIVIDADE} tipo="quizia" progresso={0} onVoltar={() => setFase('inicio')}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '20px' }}>
          <div style={{ fontSize: '80px', animation: 'ns-spin 2s linear infinite', display: 'inline-block' }}>🤖</div>
          <div>
            <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '900', marginBottom: '8px' }}>Criando perguntas sobre</h3>
            <div style={{ background: 'rgba(168,85,247,0.3)', border: '1.5px solid rgba(168,85,247,0.5)', color: '#d8b4fe', borderRadius: '20px', padding: '6px 20px', display: 'inline-block', fontWeight: '800', fontSize: '16px', marginBottom: '16px' }}>{temaSelecionado}</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', animation: 'ns-pulse 1.5s ease-in-out infinite' }}>A IA está criando perguntas especiais para você...</p>
          </div>
        </div>
      </GameShell>
    )
  }

  if (fase === 'encerrado') {
    const total = perguntas.length
    const pct = Math.round((acertos / total) * 100)
    const xpGanho = Math.round((acertos / total) * MOCK_ATIVIDADE.xp_reward)
    const coinsGanho = Math.round((acertos / total) * MOCK_ATIVIDADE.coins_reward)
    const estrelas = pct >= 80 ? 3 : pct >= 50 ? 2 : 1
    return (
      <GameShell atividade={MOCK_ATIVIDADE} tipo="quizia" progresso={100} onVoltar={() => navigate('/home-crianca')}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '24px', textAlign: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', letterSpacing: '6px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>{'⭐'.repeat(estrelas)}</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '30px', fontWeight: '900', marginBottom: '6px' }}>
              {pct >= 80 ? 'Incrível! 🎉' : pct >= 50 ? 'Bom trabalho! 👍' : 'Continue tentando! 💪'}
            </h2>
            <div style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: '20px', padding: '4px 14px', display: 'inline-block', marginTop: '8px' }}>
              <span style={{ fontSize: '13px', color: '#d8b4fe', fontWeight: '700' }}>🤖 Tema: {temaSelecionado}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '420px' }}>
            {[['+' + xpGanho + ' XP', 'Experiência', '#a855f7'], ['+' + coinsGanho + ' 💰', 'Coins', '#f59e0b'], [acertos + '/' + total, 'Acertos', '#10b981'], [pct + '%', 'Pontuação', '#ec4899']].map(([v, l, c]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: c, marginBottom: '4px' }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button
              onClick={() => setFase('inicio')}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >🤖 Novo tema</button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: 'Quiz IA — ' + temaSelecionado, emoji: '🤖', tipo: 'quizia', atividade_id: 'quiz_ia_livre' } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#a855f7,#c084fc)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(168,85,247,0.4)' }}
            >Salvar e concluir ✓</button>
          </div>
        </div>
      </GameShell>
    )
  }

  if (fase === 'jogando') {
    const pergunta = perguntas[atual]
    const total = perguntas.length
    const progresso = (atual / total) * 100
    return (
      <GameShell
        atividade={MOCK_ATIVIDADE}
        tipo="quizia"
        progresso={progresso}
        labelProgresso={`${atual + 1} / ${total}`}
        onVoltar={() => setFase('inicio')}
      >
        <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', animation: 'ns-slide-up 0.3s ease' }}>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: '99px', padding: '4px 12px', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', color: '#d8b4fe', fontWeight: '800' }}>🤖 Gerado por IA • {temaSelecionado}</span>
            </div>
            <p style={{ color: 'white', fontSize: '19px', fontWeight: '700', lineHeight: 1.5, margin: 0 }}>{pergunta.pergunta}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {pergunta.opcoes.map((opcao, idx) => {
              let bg = 'rgba(255,255,255,0.07)', border = '2px solid rgba(255,255,255,0.12)', color = 'white'
              if (selecionado !== null) {
                if (idx === pergunta.correta) { bg = 'rgba(16,185,129,0.2)'; border = '2px solid #10b981'; color = '#6ee7b7' }
                else if (idx === selecionado && idx !== pergunta.correta) { bg = 'rgba(239,68,68,0.2)'; border = '2px solid #ef4444'; color = '#fca5a5' }
                else { bg = 'rgba(255,255,255,0.03)'; color = 'rgba(255,255,255,0.25)'; border = '2px solid rgba(255,255,255,0.05)' }
              }
              return (
                <button key={idx} onClick={() => responder(idx)} style={{
                  background: bg, border, borderRadius: '14px', padding: '16px 12px',
                  color, cursor: selecionado !== null ? 'default' : 'pointer',
                  fontWeight: '700', fontSize: '13px', textAlign: 'left',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{
                    background: selecionado !== null && idx === pergunta.correta ? '#10b981' : 'rgba(255,255,255,0.1)',
                    color: selecionado !== null && idx === pergunta.correta ? 'white' : 'rgba(255,255,255,0.6)',
                    borderRadius: '6px', minWidth: '22px', height: '22px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900', flexShrink: 0,
                  }}>{['A','B','C','D'][idx]}</span>
                  {opcao}
                </button>
              )
            })}
          </div>

          {selecionado !== null && (
            <div style={{ borderRadius: '16px', padding: '18px 20px', background: 'rgba(245,158,11,0.12)', border: '1.5px solid rgba(245,158,11,0.3)', animation: 'ns-slide-up 0.25s ease' }}>
              <div style={{ fontSize: '11px', color: '#fde68a', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>💡 SABIA QUE...</div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '14px' }}>{pergunta.fato}</p>
              <button onClick={avancar} style={{
                width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
                background: selecionado === pergunta.correta ? '#10b981' : '#a855f7',
                color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
                {atual + 1 < perguntas.length ? 'Próxima →' : 'Ver resultado →'}
              </button>
            </div>
          )}
        </div>
      </GameShell>
    )
  }

  // fase === 'inicio'
  return (
    <LayoutCrianca child={child}>
      <div style={{ padding: '28px 32px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ fontSize: '72px', marginBottom: '16px', animation: 'ns-bounce 2.5s ease-in-out infinite' }}>🤖</div>
            <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', marginBottom: '8px', letterSpacing: '-0.5px' }}>Quiz Inteligente</h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px' }}>Escolha um tema ou escreva o seu — a IA cria perguntas únicas só para você!</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.35)', borderRadius: '99px', padding: '5px 16px', marginTop: '12px' }}>
              <span style={{ fontSize: '12px', color: '#d8b4fe', fontWeight: '700' }}>✨ Gerado por IA • Perguntas novas a cada vez</span>
            </div>
          </div>

          {/* Input de tema personalizado */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '2px solid rgba(168,85,247,0.3)', borderRadius: '20px', padding: '24px', marginBottom: '28px' }}>
            <div style={{ fontSize: '12px', color: '#a78bfa', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>✏️ Escreva qualquer tema</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                ref={inputRef}
                value={temaInput}
                onChange={e => setTemaInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && temaInput.trim() && iniciarQuiz(temaInput)}
                placeholder="Ex: Minecraft, Pokémon, Folclore brasileiro, Física quântica..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px', padding: '14px 18px', color: 'white', fontSize: '15px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none', transition: 'all 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(168,85,247,0.6)'; e.target.style.background = 'rgba(168,85,247,0.08)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
              />
              <button
                onClick={() => temaInput.trim() && iniciarQuiz(temaInput)}
                disabled={!temaInput.trim()}
                style={{
                  background: temaInput.trim() ? 'linear-gradient(135deg, #a855f7, #c084fc)' : 'rgba(255,255,255,0.06)',
                  border: 'none', borderRadius: '12px', padding: '14px 24px',
                  color: temaInput.trim() ? 'white' : 'rgba(255,255,255,0.25)',
                  fontWeight: '800', fontSize: '14px', cursor: temaInput.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap',
                  boxShadow: temaInput.trim() ? '0 4px 16px rgba(168,85,247,0.4)' : 'none',
                  transition: 'all 0.2s',
                }}
              >Gerar Quiz →</button>
            </div>
            {erroAPI && (
              <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '12px', color: '#fca5a5', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
                ⚠️ {erroAPI}
              </div>
            )}
          </div>

          {/* Temas populares */}
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: '700', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>⚡ Temas populares</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
              {TEMAS.map(({ emoji, nome }) => (
                <button
                  key={nome}
                  onClick={() => { playSound('click'); iniciarQuiz(nome) }}
                  style={{
                    background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.09)',
                    borderRadius: '14px', padding: '18px 10px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    transition: 'all 0.15s', fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.16)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <span style={{ fontSize: '28px' }}>{emoji}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'white', textAlign: 'center', lineHeight: 1.2 }}>{nome}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </LayoutCrianca>
  )
}
