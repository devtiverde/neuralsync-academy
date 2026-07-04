import { forwardRef, useState } from 'react'

const VARIANTS = {
  primary: {
    background: 'var(--ns-orange)',
    color: '#fff',
    border: 'none',
    boxShadow: 'var(--ns-shadow-glow-orange)',
    fontWeight: 800,
  },
  secondary: {
    background: 'transparent',
    color: 'var(--ns-violet)',
    border: '1.5px solid var(--ns-violet)',
    boxShadow: 'none',
    fontWeight: 700,
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ns-text)',
    border: '1px solid transparent',
    boxShadow: 'none',
    fontWeight: 600,
  },
  danger: {
    background: 'var(--ns-error)',
    color: '#fff',
    border: 'none',
    boxShadow: 'none',
    fontWeight: 700,
  },
  dark: {
    background: 'linear-gradient(135deg, #F07A20, #ea580c)',
    color: '#fff',
    border: 'none',
    boxShadow: 'var(--ns-shadow-glow-orange)',
    fontWeight: 800,
  },
}

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', children, style, disabled, onClick, type = 'button', className, ...rest },
  ref
) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)

  const sizes = {
    sm: { padding: '6px 16px', fontSize: 13, minHeight: 34 },
    md: { padding: '10px 24px', fontSize: 15, minHeight: 44 },
    lg: { padding: '14px 32px', fontSize: 17, minHeight: 52 },
  }

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 'var(--ns-radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease',
    fontFamily: 'var(--ns-font-body)',
    lineHeight: 1,
    opacity: disabled ? 0.5 : 1,
    transform: pressed ? 'scale(0.98)' : hovered && !disabled ? 'translateY(-1px)' : 'none',
    filter: hovered && !disabled && !pressed ? 'brightness(0.92)' : 'none',
    ...sizes[size],
    ...VARIANTS[variant],
    ...style,
  }

  return (
    <button
      ref={ref}
      type={type}
      style={base}
      disabled={disabled}
      onClick={onClick}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      {...rest}
    >
      {children}
    </button>
  )
})

export default Button
