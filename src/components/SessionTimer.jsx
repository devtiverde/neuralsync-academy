// Timer regressivo da sessão NeuralAI — exibe MM:SS com alerta nos 5 min finais

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function SessionTimer({ secondsLeft, warning }) {
  if (secondsLeft === null) return null

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const display = `${pad(minutes)}:${pad(seconds)}`

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`${minutes} minutos e ${seconds} segundos restantes`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 14px',
        borderRadius: 'var(--radius-full)',
        background: warning ? 'var(--color-error-light)' : 'var(--color-ai-light)',
        color:      warning ? 'var(--color-error)'       : '#0891b2',
        fontSize:   'var(--text-sm)',
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.04em',
        border: `1.5px solid ${warning ? 'var(--color-error)' : 'var(--color-ai)'}`,
        animation: warning ? 'ns-pulse 1.2s ease-in-out infinite' : 'none',
        transition: 'background 0.3s, color 0.3s, border-color 0.3s',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 14 }}>⏱</span>
      <span>{display} restantes</span>
    </div>
  )
}
