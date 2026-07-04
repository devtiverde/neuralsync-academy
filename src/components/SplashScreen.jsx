export default function SplashScreen() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(160deg, #0f0a1e 0%, #1a0a3e 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 16,
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'linear-gradient(135deg, #7C3AED, #a855f7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 40px rgba(124,58,237,0.4)',
        animation: 'ns-splash-pulse 2s ease-in-out infinite',
      }}>
        <span style={{ fontSize: 36 }}>🧠</span>
      </div>
      <h1 style={{
        color: 'white',
        fontFamily: "'Fredoka One', cursive",
        fontSize: 28, margin: 0, textAlign: 'center',
        textShadow: '0 2px 16px rgba(0,0,0,0.5)',
      }}>
        NeuralSync Academy
      </h1>
      <div style={{ width: 200, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 99, overflow: 'hidden', marginTop: 8 }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: '#7C3AED',
          animation: 'ns-splash-bar 1.8s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @keyframes ns-splash-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.08); }
        }
        @keyframes ns-splash-bar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
