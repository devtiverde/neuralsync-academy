import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import UpgradePremium from '../../components/UpgradePremium'
import { gerarQuizIA, getFaixa } from '../../lib/claude'
import { playSound } from '../../lib/sounds'
import { temPlano, assinaturaCarregando } from '../../lib/assinatura'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/crianca.css'

const temaKidsMap = {
  'animais':'animais','frutas':'frutas','natureza':'planeta_terra','planetas':'planeta_terra',
  'dinossauros':'dinossauros','oceano':'golfinhos','países':'historia_brasil','tecnologia':'tecnologia',
  'matemática':'matematica','arte':'arte','corpo':'corpo_humano','ciência':'planeta_terra',
  'cores':'formas_cores','formas':'formas_cores','física':'fisica','genética':'corpo_humano',
}

export default function QuizIAAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade
  const { subscription, subscriptionLoaded, loading: authLoading } = useAuth()

  const [iniciou, setIniciou] = useState(false)
  const [fase, setFase] = useState('temas')
  const [temaSelecionado, setTemaSelecionado] = useState('')
  const [perguntas, setPerguntas] = useState([])
  const [erroAPI, setErroAPI] = useState(null)
  const [atual, setAtual] = useState(0)
  const [selecionado, setSelecionado] = useState(null)
  const [acertos, setAcertos] = useState(0)

  useEffect(() => {
    if (!atividade) navigate(-1)
  }, [])

  if (!atividade) return null

  if (!assinaturaCarregando(subscriptionLoaded, authLoading) && !temPlano(subscription, 'premium')) {
    return <UpgradePremium
      feature="Quiz IA — Perguntas geradas por IA"
      emoji="🤖"
      descricao="A IA cria 5 perguntas novas sobre o tema que você escolher. Disponível exclusivamente no Plano Premium."
      onVoltar={() => navigate(-1)}
    />
  }

  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} />

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
    } catch (e) {
      setErroAPI(e.message || 'Não foi possível gerar o quiz. Verifique sua conexão.')
      setFase('temas')
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

  if (fase === 'carregando') {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={0} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '20px' }}>
          <div style={{ fontSize: '80px', animation: 'ns-spin 2s linear infinite', display: 'inline-block' }}>🤖</div>
          <div>
            <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '900', marginBottom: '8px' }}>Criando perguntas sobre</h3>
            <div style={{ background: 'rgba(168,85,247,0.3)', border: '1.5px solid rgba(168,85,247,0.5)', color: '#d8b4fe', borderRadius: '20px', padding: '6px 20px', display: 'inline-block', fontWeight: '800', fontSize: '16px', marginBottom: '16px' }}>{temaSelecionado}</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', animation: 'ns-pulse 1.5s ease-in-out infinite' }}>A IA está gerando perguntas especiais para você...</p>
          </div>
        </div>
      </GameShell>
    )
  }

  if (fase === 'encerrado') {
    const total = perguntas.length
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
            <button onClick={() => setFase('temas')} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>🤖 Novo tema</button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo + ' — ' + temaSelecionado, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#a855f7,#c084fc)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(168,85,247,0.4)' }}>
              Concluir ✓
            </button>
          </div>
        </div>
      </GameShell>
    )
  }

  if (fase === 'temas') {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={0} onVoltar={() => navigate(-1)}>
        <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'ns-slide-up 0.3s ease' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '14px', animation: 'ns-bounce 2.5s ease-in-out infinite' }}>🤖</div>
            <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '900', marginBottom: '8px' }}>Sobre o que você quer aprender?</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>A IA cria 5 perguntas novas, só para você!</p>
          </div>

          {erroAPI && (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '12px', padding: '14px', color: '#fca5a5', fontSize: '13px', textAlign: 'center' }}>
              ⚠️ {erroAPI}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {temas.map((tema, i) => {
              const emoji = tema.split(' ')[0]
              const nome = tema.replace(/^\S+\s/, '')
              const kidsKey = Object.keys(temaKidsMap).find(k => nome.toLowerCase().includes(k))
              const kidsLink = kidsKey ? temaKidsMap[kidsKey] : null
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => { playSound('click'); escolherTema(tema) }} style={{
                    background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.12)',
                    borderRadius: '18px', padding: '24px 14px', cursor: 'pointer',
                    fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.2)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}>
                    <span style={{ fontSize: '36px' }}>{emoji}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{nome}</span>
                  </button>
                  {kidsLink && (
                    <button onClick={() => navigate('/kids/' + kidsLink, { state: { voltarQuiz: true } })} style={{
                      background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)',
                      borderRadius: '10px', padding: '7px 10px', cursor: 'pointer', fontFamily: 'inherit',
                      fontSize: '11px', fontWeight: '700', color: '#d8b4fe',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                    }}>📚 Estudar antes</button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </GameShell>
    )
  }

  // fase === 'jogando'
  const pergunta = perguntas[atual]
  const total = perguntas.length
  const progresso = (atual / total) * 100

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`${atual + 1} / ${total}`}
      onVoltar={() => setFase('temas')}
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

