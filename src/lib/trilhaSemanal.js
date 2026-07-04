import { temas } from '../data/temasData'

const EPOCH = new Date('2024-01-01').getTime()
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

// Configuração por faixa etária: tipos preferidos + quantidade de dias/semana
const FAIXA_CONFIG = {
  exploradores: {
    dias: 3,
    pool: ['quiz', 'memoria', 'sequencia', 'formas', 'cores', 'alfabeto'],
    label: 'Exploradores 🔍',
    dica: '3 dias/semana — ideal para 3–5 anos',
  },
  construtores: {
    dias: 4,
    pool: ['quiz', 'memoria', 'sequencia', 'labirinto', 'robo', 'padrao'],
    label: 'Construtores 🔧',
    dica: '4 dias/semana — ideal para 6–8 anos',
  },
  criadores: {
    dias: 5,
    pool: ['quiz', 'labirinto', 'robo', 'padrao', 'blocos', 'sequencia', 'quizia'],
    label: 'Criadores 🎨',
    dica: '5 dias/semana — ideal para 9–11 anos',
  },
  inventores: {
    dias: 5,
    pool: ['quizia', 'inventor', 'blocos', 'robo', 'padrao', 'labirinto', 'sequencia', 'quiz'],
    label: 'Inventores 💡',
    dica: '5 dias/semana — ideal para 12+ anos',
  },
}

const DEFAULT_CONFIG = { dias: 5, pool: ['quiz', 'memoria', 'sequencia', 'labirinto', 'robo', 'padrao', 'blocos', 'quizia', 'inventor'] }

export const getFaixaConfig = (faixa) => FAIXA_CONFIG[faixa] || DEFAULT_CONFIG

// FNV-1a hash determinístico
function hashStr(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}

export function getWeekNumber() {
  return Math.floor((Date.now() - EPOCH) / MS_PER_WEEK)
}

export function getTemaAtual() {
  return temas[getWeekNumber() % temas.length]
}

export function getTemaByWeek(weekNum) {
  return temas[weekNum % temas.length]
}

// Embaralha pool da faixa com seed determinística e retorna os primeiros N
function getTiposDaSemana(weekNum, faixa) {
  const cfg = getFaixaConfig(faixa)
  const pool = [...cfg.pool]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = hashStr(`wk${weekNum}_t${i}_${faixa}`) % (i + 1)
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, cfg.dias)
}

// IDs de atividades feitas nos últimos 28 dias
function getRecentIds(childId) {
  try {
    const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
    const cutoff = Date.now() - 28 * MS_PER_WEEK / 4
    return new Set(
      hist
        .filter(h => h.child_id === childId && (h.timestamp || 0) > cutoff && h.atividade_id)
        .map(h => h.atividade_id)
    )
  } catch { return new Set() }
}

function selectAtividade(pool, tipo, childId, weekNum, diaIdx, usedIds, recentIds) {
  const typed = pool.filter(a => a.tipo === tipo)
  if (!typed.length) return null

  const seed = hashStr(`${weekNum}_${childId}_dia${diaIdx}`)

  // Preferência: não recente E não usada essa semana
  let candidates = typed.filter(a => !recentIds.has(a.id) && !usedIds.has(a.id))
  // Fallback: não usada essa semana (permite repetição de histórico)
  if (!candidates.length) candidates = typed.filter(a => !usedIds.has(a.id))
  // Último recurso: qualquer uma
  if (!candidates.length) candidates = typed

  return [...candidates].sort((a, b) => hashStr(seed + a.id) - hashStr(seed + b.id))[0]
}

export function gerarTrilhaSemanal(atividades, childId, weekNum, faixa) {
  const tema = temas[weekNum % temas.length]
  const cfg = getFaixaConfig(faixa)
  const tipos = getTiposDaSemana(weekNum, faixa)
  const recentIds = getRecentIds(childId)
  const usedIds = new Set()
  const dias = []

  for (let i = 0; i < cfg.dias; i++) {
    const tipo = tipos[i]
    const atividade = selectAtividade(atividades, tipo, childId, weekNum, i, usedIds, recentIds)
    if (atividade) {
      usedIds.add(atividade.id)
      dias.push({ dia: i + 1, tipo, atividadeId: atividade.id })
    } else {
      const fallback = selectAtividade(atividades, 'quiz', childId, weekNum, i, usedIds, recentIds)
      if (fallback) {
        usedIds.add(fallback.id)
        dias.push({ dia: i + 1, tipo: 'quiz', atividadeId: fallback.id })
      }
    }
  }

  return { temaId: tema.id, semana: weekNum, faixa, dias, geradoEm: Date.now() }
}

const chave = (childId, weekNum, faixa) => `ns_trilha_${childId}_${weekNum}_${faixa || 'default'}`

export function getTrilhaSemanal(atividades, childId, faixa) {
  const weekNum = getWeekNumber()
  const cfg = getFaixaConfig(faixa)
  const key = chave(childId, weekNum, faixa)
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null')
    if (saved?.semana === weekNum && saved?.dias?.length === cfg.dias) return saved
  } catch {}
  const trilha = gerarTrilhaSemanal(atividades, childId, weekNum, faixa)
  localStorage.setItem(key, JSON.stringify(trilha))
  return trilha
}

export function customizarDia(childId, diaIdx, novaAtividadeId, novoTipo, faixa) {
  const weekNum = getWeekNumber()
  const key = chave(childId, weekNum, faixa)
  try {
    const trilha = JSON.parse(localStorage.getItem(key) || 'null')
    if (trilha?.dias?.[diaIdx] !== undefined) {
      trilha.dias[diaIdx] = { ...trilha.dias[diaIdx], atividadeId: novaAtividadeId, tipo: novoTipo || trilha.dias[diaIdx].tipo, customizado: true }
      trilha.customizado = true
      localStorage.setItem(key, JSON.stringify(trilha))
      return trilha
    }
  } catch {}
  return null
}

// Verifica se uma atividade foi concluída essa semana por esse filho
export function isDiaConcluido(atividadeId, childId) {
  try {
    const weekStart = getWeekNumber() * MS_PER_WEEK + EPOCH
    const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
    return hist.some(h =>
      h.child_id === childId &&
      h.atividade_id === atividadeId &&
      (h.timestamp || 0) >= weekStart
    )
  } catch { return false }
}

// Índice do dia da semana atual (1=Seg ... 5=Sex, null se fds)
export function getDiaHoje() {
  const dow = new Date().getDay()
  if (dow === 0 || dow === 6) return null
  return dow
}

export const DIAS_LABEL = ['', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
export const DIAS_CURTO  = ['', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex']
