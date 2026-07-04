// Power-ups — tipos e lógica central
// localStorage key: ns_powerups_{childId}

export const POWERUP_CONFIG = {
  'pu_xp2_1h':   { tipo: 'timer', duracao_ms: 3_600_000,  xpMult: 2   },
  'pu_xp2_24h':  { tipo: 'timer', duracao_ms: 86_400_000, xpMult: 2   },
  'pu_xp3':      { tipo: 'timer', duracao_ms: 1_800_000,  xpMult: 3   },
  'pu_coins_50': { tipo: 'timer', duracao_ms: 3_600_000,  coinsMult: 1.5 },
  'pu_shield':   { tipo: 'timer', duracao_ms: 86_400_000, efeito: 'streak_shield' },
  'pu_hint':     { tipo: 'uses',  uses: 3,  efeito: 'hint'    },
  'pu_pular':    { tipo: 'uses',  uses: 1,  efeito: 'skip'    },
  'pu_reviver':  { tipo: 'uses',  uses: 1,  efeito: 'reviver' },
}

function key(childId) { return `ns_powerups_${childId}` }

export function getActivePowerups(childId) {
  try {
    const raw = JSON.parse(localStorage.getItem(key(childId)) || '[]')
    const now = Date.now()
    return raw.filter(p =>
      (p.expires_at != null ? p.expires_at > now : true) &&
      (p.uses       != null ? p.uses > 0         : true)
    )
  } catch { return [] }
}

function savePowerups(childId, list) {
  localStorage.setItem(key(childId), JSON.stringify(list))
}

export function activatePowerup(childId, puId) {
  const cfg = POWERUP_CONFIG[puId]
  if (!cfg) return
  const active = getActivePowerups(childId)
  const now = Date.now()
  if (cfg.tipo === 'timer') {
    const ex = active.find(p => p.id === puId)
    if (ex) ex.expires_at = Math.max(ex.expires_at, now) + cfg.duracao_ms
    else active.push({ id: puId, expires_at: now + cfg.duracao_ms })
  } else {
    const ex = active.find(p => p.id === puId)
    if (ex) ex.uses += cfg.uses
    else active.push({ id: puId, uses: cfg.uses })
  }
  savePowerups(childId, active)
}

export function consumePowerup(childId, puId) {
  const active = getActivePowerups(childId)
  const p = active.find(p => p.id === puId)
  if (!p || p.uses == null) return false
  p.uses -= 1
  savePowerups(childId, active.filter(p => (p.uses != null ? p.uses > 0 : true)))
  return true
}

export function getMultipliers(childId) {
  let xpMult = 1, coinsMult = 1
  for (const p of getActivePowerups(childId)) {
    const cfg = POWERUP_CONFIG[p.id]
    if (!cfg) continue
    if (cfg.xpMult)    xpMult    = Math.max(xpMult, cfg.xpMult)
    if (cfg.coinsMult) coinsMult = Math.max(coinsMult, cfg.coinsMult)
  }
  return { xpMult, coinsMult }
}

export function hasEffect(childId, efeito) {
  return getActivePowerups(childId).some(p => POWERUP_CONFIG[p.id]?.efeito === efeito)
}

export function getHintUses(childId) {
  return getActivePowerups(childId).find(p => p.id === 'pu_hint')?.uses || 0
}

export function getActiveSummary(childId) {
  const now = Date.now()
  return getActivePowerups(childId).map(p => {
    const cfg = POWERUP_CONFIG[p.id]
    if (!cfg) return null
    let badge = ''
    if (p.expires_at) {
      const mins = Math.ceil((p.expires_at - now) / 60000)
      badge = mins < 60 ? `${mins}m` : `${Math.ceil(mins / 60)}h`
    }
    if (p.uses != null) badge = `×${p.uses}`
    return { id: p.id, badge }
  }).filter(Boolean)
}

const EMOJI_MAP = {
  'pu_xp2_1h': '⚡', 'pu_xp2_24h': '🌟', 'pu_xp3': '🚀',
  'pu_coins_50': '💰', 'pu_shield': '🛡️', 'pu_hint': '🔮',
  'pu_pular': '⏭️', 'pu_reviver': '💖',
}
export function getPuEmoji(puId) { return EMOJI_MAP[puId] || '⚡' }
