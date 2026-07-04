const VARIANTS = {
  xp: {
    background: 'rgba(245,158,11,0.15)',
    color: '#fbbf24',
    border: '1px solid rgba(245,158,11,0.3)',
  },
  coins: {
    background: 'var(--ns-amber-light)',
    color: '#92400e',
    border: '1px solid rgba(245,158,11,0.2)',
  },
  ai: {
    background: 'var(--ns-teal-light)',
    color: '#0e7490',
    border: '1px solid rgba(6,182,212,0.25)',
  },
  new: {
    background: 'var(--ns-orange)',
    color: '#fff',
    border: 'none',
    boxShadow: 'var(--ns-shadow-glow-orange)',
  },
  streak: {
    background: 'rgba(239,68,68,0.12)',
    color: '#ef4444',
    border: '1px solid rgba(239,68,68,0.25)',
  },
  tag: {
    background: 'var(--ns-violet-light)',
    color: 'var(--ns-violet)',
    border: '1px solid rgba(124,58,237,0.2)',
  },
  success: {
    background: 'var(--ns-green-light)',
    color: '#065f46',
    border: '1px solid rgba(16,185,129,0.2)',
  },
}

const SIZES = {
  sm: { fontSize: 11, padding: '2px 8px' },
  md: { fontSize: 12, padding: '3px 10px' },
  lg: { fontSize: 14, padding: '5px 14px' },
}

export default function Badge({ variant = 'tag', size = 'md', children, style, className }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    borderRadius: 'var(--ns-radius-pill)',
    fontFamily: 'var(--ns-font-ui)',
    fontWeight: 800,
    whiteSpace: 'nowrap',
    lineHeight: 1.4,
    ...SIZES[size],
    ...VARIANTS[variant],
    ...style,
  }

  return (
    <span style={base} className={className}>
      {children}
    </span>
  )
}
