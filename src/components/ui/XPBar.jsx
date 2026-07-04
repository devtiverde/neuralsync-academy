import { useEffect, useRef } from 'react'

export default function XPBar({ current = 0, max = 100, level = 1, label, dark = false }) {
  const fillRef = useRef(null)
  const pct = max > 0 ? Math.min(100, (current / max) * 100) : 0

  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    el.style.width = '0%'
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'width 1s ease-out'
      el.style.width = `${pct}%`
    })
    return () => cancelAnimationFrame(raf)
  }, [pct])

  const trackStyle = {
    width: '100%',
    height: 10,
    background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.1)',
    borderRadius: 'var(--ns-radius-pill)',
    overflow: 'hidden',
  }

  const fillStyle = {
    height: '100%',
    background: 'linear-gradient(90deg, #10B981, #34D399)',
    borderRadius: 'var(--ns-radius-pill)',
    width: '0%',
    boxShadow: '0 0 8px rgba(16,185,129,0.4)',
  }

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%',
  }

  const metaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'var(--ns-font-ui)',
    fontSize: 12,
    fontWeight: 700,
    color: dark ? 'rgba(255,255,255,0.6)' : 'var(--ns-text-muted)',
  }

  const levelStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontFamily: 'var(--ns-font-ui)',
    fontWeight: 800,
    fontSize: 12,
    color: dark ? '#a78bfa' : 'var(--ns-violet)',
    background: dark ? 'rgba(124,58,237,0.2)' : 'var(--ns-violet-light)',
    padding: '2px 8px',
    borderRadius: 'var(--ns-radius-pill)',
  }

  const restante = max - current

  return (
    <div style={wrapStyle}>
      <div style={metaStyle}>
        <span style={levelStyle}>⚡ Nível {level}</span>
        <span>{label ?? `${restante} XP para o próximo`}</span>
      </div>
      <div style={trackStyle}>
        <div ref={fillRef} style={fillStyle} />
      </div>
    </div>
  )
}
