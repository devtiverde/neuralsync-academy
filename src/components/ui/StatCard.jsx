import { useState } from 'react'

export default function StatCard({ emoji, value, label, color = '#fff', onClick }) {
  const [hovered, setHovered] = useState(false)

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '12px 16px',
    background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 16,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.18s ease',
    transform: hovered && onClick ? 'translateY(-2px)' : 'none',
    minWidth: 70,
    userSelect: 'none',
  }

  const emojiStyle = {
    fontSize: 22,
    lineHeight: 1,
  }

  const valueStyle = {
    fontSize: 18,
    fontWeight: 800,
    fontFamily: 'var(--ns-font-ui)',
    color,
    lineHeight: 1.1,
  }

  const labelStyle = {
    fontSize: 10,
    fontWeight: 600,
    fontFamily: 'var(--ns-font-ui)',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }

  return (
    <div
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={emojiStyle}>{emoji}</span>
      <span style={valueStyle}>{value}</span>
      <span style={labelStyle}>{label}</span>
    </div>
  )
}
