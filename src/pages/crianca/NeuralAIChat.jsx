import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useNeuralAI } from '../../hooks/useNeuralAI'
import SessionTimer from '../../components/SessionTimer'
import ChatBubble from '../../components/ChatBubble'
import Nix from '../../components/Nix'
import '../../styles/crianca.css'

const SUGESTOES_POR_TEMA = {
  universo:  ['Como os planetas se formam?', 'O que é um buraco negro?', 'Existe vida em outros planetas?', 'Por que o céu é azul?', 'O que acontece no centro de uma estrela?'],
  ia:        ['Como a IA aprende a falar?', 'A IA pode ter sentimentos?', 'O que é machine learning?', 'Como os robôs enxergam o mundo?', 'A IA pode ser criativa?'],
  invencao:  ['Como minha ideia resolveria isso?', 'Quem usaria minha invenção?', 'Qual seria o maior desafio?', 'Que materiais eu precisaria?', 'Já existe algo parecido?'],
  logica:    ['Me dê um desafio de lógica!', 'O que é pensamento lógico?', 'Como resolver paradoxos?', 'Qual a diferença entre dedução e indução?', 'Me ensina um truque matemático'],
}

const SUGESTOES_GENERICAS = [
  'Pode dar um exemplo?', 'Por que isso acontece?', 'Me conta mais sobre isso',
  'Como descobriram isso?', 'Tem algum experimento que posso fazer?', 'Isso é verdade sempre?',
  'O que aconteceria se...?', 'Qual a parte mais difícil?', 'Como posso aprender mais?',
]

function getSugestoes(temaId, usadas) {
  const especificas = (SUGESTOES_POR_TEMA[temaId] || []).filter(s => !usadas.has(s))
  const genericas = SUGESTOES_GENERICAS.filter(s => !usadas.has(s))
  const pool = [...especificas, ...genericas]
  const shuffled = pool.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}

export default function NeuralAIChat() {
  const navigate           = useNavigate()
  const { state }          = useLocation()
  const { tema, child, durationMinutes = 30 } = state || {}

  const {
    status, messages, secondsLeft, warning,
    sending, summary, error,
    startSession, sendMessage, endSession,
  } = useNeuralAI()

  const [input, setInput]           = useState('')
  const [confirmEnd, setConfirmEnd] = useState(false)
  const [sugestoes, setSugestoes]   = useState([])
  const sugestoesUsadasRef          = useRef(new Set())
  const messagesEndRef  = useRef(null)
  const inputRef        = useRef(null)
  const firstSentRef    = useRef(false)

  // Redireciona se não tiver dados de sessão
  useEffect(() => {
    if (!child) { navigate('/neural-ai'); return }
    startSession(child.id, durationMinutes)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Envia o tema como primeira mensagem assim que a sessão abre
  useEffect(() => {
    if (status === 'active' && tema && !firstSentRef.current) {
      firstSentRef.current = true
      sendMessage(tema.titulo)
    }
    // Foca no input quando sessão ativa
    if (status === 'active') {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  // Navega para a tela de conclusão quando a sessão encerra
  useEffect(() => {
    if (status === 'ended') {
      navigate('/neural-ai/fim', { state: { summary, child } })
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  // Atualiza sugestões após cada resposta da IA
  useEffect(() => {
    const last = messages[messages.length - 1]
    if (last?.role === 'assistant') {
      const novas = getSugestoes(tema?.id, sugestoesUsadasRef.current)
      setSugestoes(novas)
    }
    if (last?.role === 'user') setSugestoes([])
  }, [messages])

  // Auto-scroll ao final das mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  function handleSend(texto) {
    const msg = (texto ?? input).trim()
    if (!msg || sending || status !== 'active') return
    sendMessage(msg)
    setInput('')
    setSugestoes([])
    inputRef.current?.focus()
  }

  function handleSugestao(sugestao) {
    sugestoesUsadasRef.current.add(sugestao)
    handleSend(sugestao)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleInputChange(e) {
    setInput(e.target.value)
    if (e.target.value && sugestoes.length > 0) setSugestoes([])
  }

  function handleEndClick() {
    if (!confirmEnd) { setConfirmEnd(true); return }
    endSession()
  }

  const isActive  = status === 'active'
  const isEnding  = status === 'ending'
  const isLoading = status === 'idle' || status === 'starting'

  // ── Loading / Iniciando ────────────────────────────────────────────
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#0a0618',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <Nix pose="think" size={64} />
        <div style={{ color: 'var(--color-ai)', fontWeight: 700, fontSize: 16 }}>
          Iniciando sessão NeuralAI...
        </div>
        <div style={{
          width: 40, height: 4, borderRadius: 2,
          background: 'rgba(6,182,212,0.2)', overflow: 'hidden',
        }}>
          <div style={{
            width: '60%', height: '100%',
            background: 'var(--color-ai)',
            animation: 'ns-pulse 1.2s ease-in-out infinite',
          }} />
        </div>
      </div>
    )
  }

  // ── Erro ────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: '#0a0618',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 20,
        padding: 32, textAlign: 'center',
      }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <h2 style={{ color: 'white', fontWeight: 800, fontSize: 22 }}>Algo deu errado</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 340 }}>{error}</p>
        <button
          onClick={() => navigate('/neural-ai')}
          style={{
            background: 'var(--color-primary)', color: 'white',
            border: 'none', borderRadius: 'var(--radius-full)',
            padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer',
          }}
        >
          Voltar
        </button>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0a0618',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
    }}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg, #1a0a3e 0%, #0c0520 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 20px',
        height: 66,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        {/* Identidade */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button
            onClick={() => navigate('/neural-ai')}
            style={{
              background: 'rgba(255,255,255,0.07)', border: 'none',
              borderRadius: 'var(--radius-sm)', color: 'rgba(255,255,255,0.6)',
              fontSize: 18, cursor: 'pointer', padding: '6px 10px',
              display: 'flex', alignItems: 'center',
            }}
            title="Voltar"
          >
            ←
          </button>
          <Nix pose="ask" size={36} glow={false} sparks={false} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>NeuralAI</span>
              <span style={{
                background: 'var(--color-ai)', color: 'white',
                fontSize: 10, fontWeight: 800, padding: '2px 8px',
                borderRadius: 'var(--radius-full)', letterSpacing: '0.06em',
              }}>IA</span>
            </div>
            {tema && (
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 1 }}>
                {tema.emoji} {tema.titulo}
              </div>
            )}
          </div>
        </div>

        {/* Timer + Encerrar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <SessionTimer secondsLeft={secondsLeft} warning={warning} />

          {isActive && (
            <button
              onClick={handleEndClick}
              style={{
                background: confirmEnd ? 'var(--color-error)' : 'rgba(255,255,255,0.07)',
                border: `1px solid ${confirmEnd ? 'var(--color-error)' : 'rgba(255,255,255,0.12)'}`,
                color: confirmEnd ? 'white' : 'rgba(255,255,255,0.5)',
                borderRadius: 'var(--radius-sm)', padding: '6px 12px',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {confirmEnd ? 'Confirmar?' : 'Encerrar'}
            </button>
          )}
        </div>
      </header>

      {/* ── Banner de aviso 5 min ─────────────────────────────── */}
      {warning && (
        <div style={{
          flexShrink: 0,
          background: 'rgba(239,68,68,0.12)',
          borderBottom: '1px solid rgba(239,68,68,0.3)',
          padding: '10px 20px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <span style={{ color: 'var(--color-error)', fontWeight: 700, fontSize: 14 }}>
            Faltam 5 minutos! A sessão está chegando ao fim.
          </span>
        </div>
      )}

      {/* ── Área de mensagens ─────────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '24px 20px',
        display: 'flex', flexDirection: 'column',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.1) transparent',
      }}>
        {/* Mensagem de boas-vindas enquanto IA ainda não respondeu */}
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 60, opacity: 0.35, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Nix pose="ask" size={56} />
            <div style={{ color: 'white', fontSize: 14 }}>Iniciando conversa...</div>
          </div>
        )}

        {/* Balões */}
        {messages.map(msg => (
          <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}

        {/* Erro de mensagem (ex: sem créditos na API) */}
        {error && status === 'active' && (
          <div style={{
            alignSelf: 'center', margin: '8px 0',
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)',
            borderRadius: 12, padding: '10px 16px',
            color: '#fca5a5', fontSize: 13, textAlign: 'center', maxWidth: 380,
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Indicador "digitando..." */}
        {sending && <ChatBubble role="assistant" typing />}

        {/* Indicador de encerramento */}
        {isEnding && (
          <div style={{
            textAlign: 'center', padding: '20px 0', opacity: 0.6,
            color: 'var(--color-ai)', fontSize: 14, fontWeight: 600,
          }}>
            Encerrando sessão e gerando resumo...
          </div>
        )}

        {/* Âncora de scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Chips de sugestão ───────────────────────────────────── */}
      {isActive && sugestoes.length > 0 && (
        <div style={{
          flexShrink: 0,
          padding: '10px 20px 0',
          display: 'flex', gap: 8, flexWrap: 'wrap',
          background: 'linear-gradient(0deg, #0c0520 0%, rgba(12,5,32,0.95) 100%)',
        }}>
          {sugestoes.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSugestao(s)}
              style={{
                background: 'rgba(6,182,212,0.1)',
                border: '1px solid rgba(6,182,212,0.3)',
                borderRadius: 'var(--radius-full)',
                padding: '7px 14px',
                color: 'var(--color-ai)',
                fontSize: 12, fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.22)'; e.currentTarget.style.borderColor = 'var(--color-ai)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Input area ──────────────────────────────────────────── */}
      {(isActive || isEnding) && (
        <div style={{
          flexShrink: 0,
          background: 'linear-gradient(0deg, #0c0520 0%, rgba(12,5,32,0.95) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '14px 20px',
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={!isActive || sending}
            placeholder={isEnding ? 'Encerrando...' : 'Digite sua mensagem...'}
            maxLength={500}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-full)',
              padding: '12px 20px',
              color: 'white',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-sans)',
              outline: 'none',
              opacity: (!isActive || sending) ? 0.5 : 1,
              transition: 'border-color 0.15s',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--color-ai)' }}
            onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!isActive || sending || !input.trim()}
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: (!isActive || sending || !input.trim())
                ? 'rgba(255,255,255,0.08)'
                : 'linear-gradient(135deg, var(--color-ai) 0%, var(--color-primary) 100%)',
              border: 'none', cursor: (!isActive || sending || !input.trim()) ? 'not-allowed' : 'pointer',
              color: 'white', fontSize: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.15s ease',
              boxShadow: (!isActive || sending || !input.trim())
                ? 'none'
                : '0 4px 14px rgba(6,182,212,0.35)',
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
