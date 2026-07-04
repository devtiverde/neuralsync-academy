import { useState, useEffect } from 'react'
import { startMusic, stopMusic, getPrefs, setPrefs } from '../lib/sounds'

export default function MusicPlayer() {
  const [prefs, setLocal] = useState(() => {
    const p = getPrefs()
    return { muted: p.muted ?? false, musicVol: p.musicVol ?? 0.2 }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    startMusic()
    // Browsers (especially mobile) block AudioContext until a user gesture.
    // Retry startMusic on first interaction — it's idempotent once ticking.
    const unlock = () => startMusic()
    document.addEventListener('click', unlock)
    document.addEventListener('touchstart', unlock)
    return () => {
      stopMusic()
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchstart', unlock)
    }
  }, [])

  const toggleMute = (e) => {
    e.stopPropagation()
    const next = setPrefs({ muted: !prefs.muted })
    setLocal(p => ({ ...p, muted: next.muted }))
  }

  const changeVol = v => {
    const vol = parseFloat(v)
    setPrefs({ musicVol: vol, muted: false })
    setLocal({ muted: false, musicVol: vol })
  }

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '12px', zIndex: 300,
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px',
    }}>
      {open && (
        <div style={{
          background: 'rgba(15,10,30,0.93)', backdropFilter: 'blur(16px)',
          borderRadius: '16px', padding: '14px 16px',
          border: '1px solid rgba(124,58,237,0.4)', width: '180px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        }}>
          <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '800', marginBottom: '10px', letterSpacing: '0.3px' }}>
            🎵 Música de Fundo
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', minWidth: '28px' }}>
              {prefs.muted ? '🔇' : '🔈'}
            </span>
            <input
              type="range" min="0.03" max="0.5" step="0.01"
              value={prefs.muted ? 0 : prefs.musicVol}
              onChange={e => changeVol(e.target.value)}
              disabled={prefs.muted}
              style={{
                flex: 1, accentColor: '#7C3AED',
                cursor: prefs.muted ? 'not-allowed' : 'pointer',
                opacity: prefs.muted ? 0.35 : 1,
              }}
            />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>🔊</span>
          </div>
          <button
            onClick={toggleMute}
            style={{
              width: '100%', background: prefs.muted ? 'rgba(255,255,255,0.07)' : 'rgba(124,58,237,0.4)',
              border: `1px solid ${prefs.muted ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.5)'}`,
              borderRadius: '10px', padding: '8px',
              color: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: '700',
              fontFamily: 'inherit',
            }}
          >
            {prefs.muted ? '🔇 Ativar música' : '🔊 Silenciar'}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {/* Volume expand button */}
        <button
          onClick={() => setOpen(o => !o)}
          title="Ajustar volume"
          style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: 'rgba(15,10,30,0.65)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer', fontSize: '13px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {open ? '✕' : '⚙'}
        </button>

        {/* Main mute/unmute button */}
        <button
          onClick={toggleMute}
          title={prefs.muted ? 'Ativar música' : 'Silenciar música'}
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: prefs.muted
              ? 'rgba(70,70,85,0.88)'
              : 'linear-gradient(135deg, #7C3AED, #6d28d9)',
            border: 'none', cursor: 'pointer', fontSize: '20px',
            boxShadow: prefs.muted ? 'none' : '0 3px 16px rgba(124,58,237,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'all 0.2s',
          }}
        >
          {prefs.muted ? '🔇' : '🎵'}
        </button>
      </div>
    </div>
  )
}
