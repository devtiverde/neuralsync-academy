const FAIXA_ORDER = { exploradores: 0, construtores: 1, criadores: 2, inventores: 3 }

const FAIXA_PREFIX = {
  'exp_': 'exploradores',
  'con_': 'construtores',
  'cri_': 'criadores',
  'inv_': 'inventores',
}

export const FAIXA_LABELS = {
  exploradores: 'Exploradores (3–5 anos)',
  construtores: 'Construtores (6–8 anos)',
  criadores: 'Criadores (9–11 anos)',
  inventores: 'Inventores (12+ anos)',
}

export function getFaixaFromId(id) {
  if (!id) return null
  for (const [prefix, faixa] of Object.entries(FAIXA_PREFIX)) {
    if (id.startsWith(prefix)) return faixa
  }
  return null
}

export function podeAcessar(childFaixa, atividadeId) {
  const childLevel = FAIXA_ORDER[childFaixa] ?? 0
  const atividadeFaixa = getFaixaFromId(atividadeId)
  if (!atividadeFaixa) return true
  return childLevel >= FAIXA_ORDER[atividadeFaixa]
}

export function isDesbloqueado(childId, atividadeId) {
  if (!childId || !atividadeId) return false
  return !!sessionStorage.getItem(`ns_unlock_${childId}_${atividadeId}`)
}

export function desbloquear(childId, atividadeId) {
  if (childId && atividadeId) {
    sessionStorage.setItem(`ns_unlock_${childId}_${atividadeId}`, '1')
  }
}
