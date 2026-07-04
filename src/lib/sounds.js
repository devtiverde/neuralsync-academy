// Web Audio API sound engine — no files, no dependencies
let ctx = null
let sfxGain = null
let musicGain = null
let musicRunning = false
let nextNoteTime = 0
let noteIdx = 0
let schedulerHandle = null

const BPM = 118
const BEAT = 60 / BPM
const LOOKAHEAD = 0.15
const TICK_MS = 50

// Note frequencies (Hz)
const N = {
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99,
  C4: 261.63, E4: 329.63, G4: 392.00,
  R: 0,
}

// "Mary Had a Little Lamb" — public domain, recognisable children's melody
// [freq, beats]
const MELODY = [
  [N.E5,1],[N.D5,1],[N.C5,1],[N.D5,1],
  [N.E5,1],[N.E5,1],[N.E5,2],
  [N.D5,1],[N.D5,1],[N.D5,2],
  [N.E5,1],[N.G5,1],[N.G5,2],
  [N.E5,1],[N.D5,1],[N.C5,1],[N.D5,1],
  [N.E5,1],[N.E5,1],[N.E5,1],[N.E5,1],
  [N.D5,1],[N.D5,1],[N.E5,1],[N.D5,1],
  [N.C5,4],
  [N.R, 2],
]

function _boot() {
  if (ctx) return
  ctx = new (window.AudioContext || window.webkitAudioContext)()
  sfxGain = ctx.createGain()
  sfxGain.connect(ctx.destination)
  musicGain = ctx.createGain()
  musicGain.connect(ctx.destination)
  _apply()
}

function _resume() {
  if (ctx && ctx.state === 'suspended') ctx.resume()
}

function _apply() {
  if (!musicGain || !sfxGain) return
  const p = getPrefs()
  const m = p.muted ?? false
  musicGain.gain.value = m ? 0 : Math.min(0.5, p.musicVol ?? 0.2)
  sfxGain.gain.value   = m ? 0 : Math.min(1.0, p.sfxVol  ?? 0.6)
}

export function getPrefs() {
  try { return JSON.parse(localStorage.getItem('ns_sound_prefs') || '{}') }
  catch { return {} }
}

export function setPrefs(updates) {
  const next = { ...getPrefs(), ...updates }
  localStorage.setItem('ns_sound_prefs', JSON.stringify(next))
  _apply()
  return next
}

// --- Background music ---

function _scheduleNote(freq, start, beats) {
  if (!freq) return
  const dur = beats * BEAT
  const osc = ctx.createOscillator()
  const env = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.value = freq
  env.gain.setValueAtTime(0, start)
  env.gain.linearRampToValueAtTime(0.45, start + 0.015)
  env.gain.setValueAtTime(0.32, start + dur * 0.65)
  env.gain.linearRampToValueAtTime(0, start + dur * 0.92)
  osc.connect(env)
  env.connect(musicGain)
  osc.start(start)
  osc.stop(start + dur + 0.02)

  // soft bass accent every 8 notes
  if (noteIdx % 8 === 0) {
    const b = ctx.createOscillator()
    const bg = ctx.createGain()
    b.type = 'sine'
    b.frequency.value = freq / 2
    bg.gain.setValueAtTime(0, start)
    bg.gain.linearRampToValueAtTime(0.18, start + 0.02)
    bg.gain.linearRampToValueAtTime(0, start + Math.min(dur * 1.5, BEAT * 2))
    b.connect(bg)
    bg.connect(musicGain)
    b.start(start)
    b.stop(start + Math.min(dur * 1.5, BEAT * 2) + 0.02)
  }
}

function _tick() {
  if (!musicRunning || !ctx) return
  while (nextNoteTime < ctx.currentTime + LOOKAHEAD) {
    const [freq, beats] = MELODY[noteIdx % MELODY.length]
    _scheduleNote(freq, nextNoteTime, beats)
    nextNoteTime += beats * BEAT
    noteIdx++
  }
  schedulerHandle = setTimeout(_tick, TICK_MS)
}

export function startMusic() {
  _boot()
  musicRunning = true
  if (schedulerHandle) return // already ticking

  const doStart = () => {
    if (!musicRunning || schedulerHandle) return
    noteIdx = 0
    nextNoteTime = ctx.currentTime + 0.4
    _tick()
  }

  if (ctx.state === 'running') {
    doStart()
  } else {
    // Browsers block AudioContext until user gesture — retry when context resumes
    ctx.resume().then(doStart).catch(() => {})
  }
}

export function stopMusic() {
  musicRunning = false
  clearTimeout(schedulerHandle)
  schedulerHandle = null
  if (!musicGain || !ctx) return
  const g = musicGain.gain
  g.cancelScheduledValues(ctx.currentTime)
  g.setValueAtTime(g.value, ctx.currentTime)
  g.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
  setTimeout(_apply, 700)
}

// --- Sound effects ---

function _tone(freq, dur, type, vol, freqEnd) {
  _boot(); _resume()
  const osc = ctx.createOscillator()
  const env = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  if (freqEnd != null) osc.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + dur)
  env.gain.setValueAtTime(vol, ctx.currentTime)
  env.gain.linearRampToValueAtTime(0, ctx.currentTime + dur)
  osc.connect(env)
  env.connect(sfxGain)
  osc.start()
  osc.stop(ctx.currentTime + dur + 0.01)
}

function _seq(freqs, delays, type, vol, noteDur) {
  _boot(); _resume()
  const t = ctx.currentTime
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    const s = t + (delays[i] ?? 0)
    env.gain.setValueAtTime(0, s)
    env.gain.linearRampToValueAtTime(vol, s + 0.012)
    env.gain.linearRampToValueAtTime(0, s + noteDur)
    osc.connect(env)
    env.connect(sfxGain)
    osc.start(s)
    osc.stop(s + noteDur + 0.01)
  })
}

export function playSound(type) {
  if (getPrefs().muted) return
  try {
    switch (type) {
      case 'click':
        _tone(820, 0.07, 'sine', 0.22, 620)
        break
      case 'correct':
        _seq([523, 659, 784], [0, 0.09, 0.18], 'sine', 0.32, 0.22)
        break
      case 'wrong':
        _tone(220, 0.28, 'sawtooth', 0.18, 100)
        break
      case 'complete':
        _seq([523, 659, 784, 1047], [0, 0.13, 0.26, 0.39], 'triangle', 0.38, 0.32)
        break
      case 'coin':
        _seq([1200, 1600, 1200], [0, 0.05, 0.10], 'sine', 0.28, 0.13)
        break
      case 'levelup':
        _seq([392, 523, 659, 784, 1047], [0, 0.10, 0.20, 0.30, 0.40], 'triangle', 0.36, 0.28)
        break
    }
  } catch { /* AudioContext unavailable */ }
}
