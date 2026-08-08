// Nix — mascote do NeuralSync Academy: a fagulha que mora entre os neurônios.
// Blob orgânico 100% CSS (gradiente ciano→violeta que "respira" cor + border-radius
// animado), sem imagem/SVG externo. Poses: idle | ask | cheer | think | sleep.
let injected = false
function injectCSS() {
  if (injected || typeof document === 'undefined') return
  injected = true
  const style = document.createElement('style')
  style.textContent = `
    @keyframes nix-float { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
    @keyframes nix-glow { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
    @keyframes nix-morph {
      0%,100%{border-radius:42% 58% 55% 45% / 48% 42% 58% 52%}
      33%{border-radius:58% 42% 45% 55% / 55% 55% 45% 45%}
      66%{border-radius:48% 52% 60% 40% / 42% 58% 42% 58%}
    }
    @keyframes nix-hue { 0%,100%{filter:hue-rotate(0deg)} 50%{filter:hue-rotate(-18deg)} }
    @keyframes nix-blink { 0%,92%,100%{transform:scaleY(1)} 95%{transform:scaleY(.15)} }
    @keyframes nix-cheer { 0%,100%{transform:rotate(0) translateY(0)} 25%{transform:rotate(-8deg) translateY(-5px)} 75%{transform:rotate(8deg) translateY(-5px)} }
    @keyframes nix-sway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
    @keyframes nix-orbit1 { 0%{transform:rotate(0deg) translateX(var(--orbit-r)) rotate(0deg);opacity:.9} 50%{opacity:.3} 100%{transform:rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg);opacity:.9} }
    @media (prefers-reduced-motion: reduce) {
      .nix-root, .nix-root * { animation-duration: .001ms !important; animation-iteration-count: 1 !important; }
    }
  `
  document.head.appendChild(style)
}

const POSE_ANIM = {
  idle:  'nix-float 4.5s ease-in-out infinite',
  ask:   'nix-float 4.5s ease-in-out infinite',
  cheer: 'nix-cheer 1.1s ease-in-out infinite',
  think: 'nix-float 3.2s ease-in-out infinite',
  sleep: 'nix-sway 3s ease-in-out infinite',
}

export default function Nix({ pose = 'idle', size = 96, glow = true, sparks = pose === 'idle' || pose === 'ask', style }) {
  injectCSS()
  const eyeHeight = pose === 'sleep' ? 2 : size * 0.11
  const eyeRadius = pose === 'sleep' ? 2 : '50%'

  return (
    <div
      className="nix-root"
      style={{
        position: 'relative',
        width: size,
        height: size,
        animation: POSE_ANIM[pose] || POSE_ANIM.idle,
        opacity: pose === 'sleep' ? 0.92 : 1,
        ...style,
      }}
    >
      {glow && (
        <div style={{
          position: 'absolute',
          inset: -size * 0.2,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.45), rgba(6,182,212,0.25) 55%, transparent 72%)',
          filter: 'blur(6px)',
          animation: 'nix-glow 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%',
        background: 'linear-gradient(150deg, #67e8f9 0%, #7C3AED 55%, #7C3AED 100%)',
        boxShadow: `0 0 ${size * 0.27}px rgba(124,58,237,0.55), inset -${size * 0.09}px -${size * 0.09}px ${size * 0.2}px rgba(76,29,149,0.5), inset ${size * 0.07}px ${size * 0.07}px ${size * 0.16}px rgba(255,255,255,0.35)`,
        animation: 'nix-morph 6s ease-in-out infinite, nix-hue 7s ease-in-out infinite',
      }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: size * 0.05 }}>
        <div style={{ display: 'flex', gap: size * 0.13 }}>
          <div style={{ width: size * 0.08, height: eyeHeight, background: '#1b0b33', borderRadius: eyeRadius, animation: pose === 'sleep' ? 'none' : 'nix-blink 4.2s ease-in-out infinite' }} />
          <div style={{ width: size * 0.08, height: eyeHeight, background: '#1b0b33', borderRadius: eyeRadius, animation: pose === 'sleep' ? 'none' : 'nix-blink 4.2s ease-in-out infinite' }} />
        </div>
        {pose === 'cheer' ? (
          <div style={{ width: size * 0.22, height: size * 0.11, borderRadius: `0 0 ${size * 0.22}px ${size * 0.22}px`, border: `${Math.max(2, size * 0.03)}px solid #1b0b33`, borderTop: 'none' }} />
        ) : pose !== 'sleep' && (
          <div style={{ width: size * 0.15, height: size * 0.075, borderRadius: `0 0 ${size * 0.15}px ${size * 0.15}px`, border: `${Math.max(2, size * 0.02)}px solid #1b0b33`, borderTop: 'none' }} />
        )}
      </div>

      {pose === 'ask' && (
        <div style={{
          position: 'absolute', top: -size * 0.08, right: -size * 0.05,
          width: size * 0.26, height: size * 0.24, borderRadius: `${size * 0.08}px ${size * 0.08}px ${size * 0.08}px ${size * 0.02}px`,
          background: '#FBBF24', color: '#3b2a00',
          fontFamily: 'var(--ns-font-display)', fontSize: size * 0.16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>?</div>
      )}

      {sparks && (
        <>
          <div style={{ position: 'absolute', width: size * 0.06, height: size * 0.06, top: '6%', right: '8%', borderRadius: '50%', background: '#FBBF24', '--orbit-r': `${size * 0.53}px`, animation: 'nix-orbit1 5s linear infinite' }} />
          <div style={{ position: 'absolute', width: size * 0.05, height: size * 0.05, top: '55%', right: '-4%', borderRadius: '50%', background: '#67e8f9', '--orbit-r': `${size * 0.53}px`, animation: 'nix-orbit1 6s linear infinite reverse' }} />
        </>
      )}
    </div>
  )
}
