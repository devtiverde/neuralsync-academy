const VARIANTS = {
  light: {
    background: '#fff',
    borderRadius: 'var(--ns-radius-lg)',
    boxShadow: 'var(--ns-shadow-md)',
    border: '1px solid rgba(124,58,237,0.08)',
    padding: 'var(--ns-gap-lg)',
  },
  dark: {
    background: 'linear-gradient(135deg, #1a0a3e, #0f0a1e)',
    borderRadius: 'var(--ns-radius-lg)',
    boxShadow: '0 8px 32px rgba(124,58,237,0.2)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: 'var(--ns-gap-lg)',
  },
  mission: {
    background: 'linear-gradient(135deg, rgba(240,122,32,0.18), rgba(10,6,24,0.6))',
    borderRadius: 'var(--ns-radius-lg)',
    boxShadow: '0 4px 20px rgba(240,122,32,0.15)',
    border: '1.5px solid rgba(240,122,32,0.5)',
    padding: 'var(--ns-gap-lg)',
  },
  glass: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 'var(--ns-radius-lg)',
    boxShadow: 'var(--ns-shadow-md)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    padding: 'var(--ns-gap-lg)',
  },
}

export default function Card({ variant = 'light', children, style, className, onClick, hover = true }) {
  const base = {
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
    ...VARIANTS[variant],
    ...style,
  }

  function handleMouseEnter(e) {
    if (!hover) return
    e.currentTarget.style.transform = 'translateY(-2px)'
    if (variant === 'light') e.currentTarget.style.boxShadow = 'var(--ns-shadow-lg)'
  }

  function handleMouseLeave(e) {
    if (!hover) return
    e.currentTarget.style.transform = ''
    e.currentTarget.style.boxShadow = ''
  }

  return (
    <div
      style={base}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
