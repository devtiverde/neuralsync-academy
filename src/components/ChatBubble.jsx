// Balão de mensagem para o chat NeuralAI
// role: 'user' | 'assistant'
// typing: mostra indicador de "digitando..." quando true

const TYPING_STYLE = `
@keyframes chat-dot-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%           { transform: translateY(-6px); opacity: 1; }
}
`

function TypingDots() {
  const dotBase = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--color-primary)',
    display: 'inline-block',
    animation: 'chat-dot-bounce 1.2s ease-in-out infinite',
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 0' }}>
      <span style={{ ...dotBase, animationDelay: '0ms'   }} />
      <span style={{ ...dotBase, animationDelay: '160ms' }} />
      <span style={{ ...dotBase, animationDelay: '320ms' }} />
    </span>
  )
}

function RobotAvatar() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-ai) 0%, var(--color-primary) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        flexShrink: 0,
        alignSelf: 'flex-end',
        boxShadow: '0 2px 8px rgba(6,182,212,0.30)',
      }}
    >
      🤖
    </div>
  )
}

export default function ChatBubble({ role, content, typing = false }) {
  const isUser = role === 'user'

  return (
    <>
      {/* keyframes injetados uma única vez — ignorados se já existirem */}
      <style>{TYPING_STYLE}</style>

      <div
        style={{
          display:       'flex',
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems:    'flex-end',
          gap:           10,
          marginBottom:  16,
        }}
      >
        {!isUser && <RobotAvatar />}

        <div
          style={{
            maxWidth:     '72%',
            padding:      '12px 16px',
            borderRadius: isUser
              ? '18px 18px 4px 18px'   // user: canto inferior direito flat
              : '18px 18px 18px 4px',  // assistant: canto inferior esquerdo flat
            background: isUser
              ? 'var(--color-action-light)'
              : 'var(--color-primary-light)',
            color:      'var(--color-text-primary)',
            fontSize:   'var(--text-base)',       // mínimo 16px conforme spec
            lineHeight: 1.65,
            fontFamily: 'var(--font-sans)',
            fontWeight: 450,
            boxShadow:  'var(--shadow-sm)',
            wordBreak:  'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          {typing ? <TypingDots /> : content}
        </div>
      </div>
    </>
  )
}
