/**
 * Regra de horário de acesso da criança + liberação temporária pelo responsável.
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * `dentroDoHorario` estava copiado, idêntico, em `HomeCrianca.jsx` e em
 * `Bloqueio.jsx`. Uma tela decide se manda pro bloqueio, a outra decide se
 * libera de volta — se as duas cópias divergirem, a criança fica presa num
 * pingue-pongue entre as telas. Ao adicionar a liberação temporária a regra
 * passou a ter dois termos, então duplicar deixou de ser aceitável.
 *
 * ⚠️ LIMITE CONHECIDO: isto vive no localStorage e portanto é adulterável por
 * quem souber abrir o console. Não é uma falha nova — a própria agenda
 * (`ns_agenda_config`) já é lida de lá. É controle parental por conveniência,
 * não por segurança. O conserto de verdade seria validar no servidor, e vale
 * fazer junto com o de XP/moedas, que tem exatamente o mesmo formato de problema.
 */

const PREFIXO = 'ns_liberacao_'

/** Chave por criança: liberar a Lize não pode liberar o Pedro junto. */
const chave = childId => `${PREFIXO}${childId || 'sem-filho'}`

/**
 * Minutos que ainda restam de liberação temporária. 0 = não há liberação.
 * Também limpa o registro vencido, pra não ficar lixo acumulando.
 */
export function minutosLiberados(childId) {
  try {
    const bruto = localStorage.getItem(chave(childId))
    if (!bruto) return 0
    const ate = Number(bruto)
    if (!Number.isFinite(ate)) { localStorage.removeItem(chave(childId)); return 0 }
    const restanteMs = ate - Date.now()
    if (restanteMs <= 0) { localStorage.removeItem(chave(childId)); return 0 }
    return Math.ceil(restanteMs / 60000)
  } catch { return 0 } // modo privado
}

/** Concede N minutos a partir de agora. Sobrescreve uma liberação em curso. */
export function liberarPorMinutos(childId, minutos) {
  try {
    localStorage.setItem(chave(childId), String(Date.now() + minutos * 60000))
    return true
  } catch { return false }
}

/** Encerra a liberação antes da hora (usado pelo responsável nas Configurações). */
export function cancelarLiberacao(childId) {
  try { localStorage.removeItem(chave(childId)) } catch { /* modo privado */ }
}

/**
 * A criança pode usar a plataforma agora?
 *
 * Sem agenda configurada, o acesso é livre — é o padrão de quem nunca abriu a
 * tela de Agenda, e barrar aí seria quebrar o produto para a maioria.
 */
export function dentroDoHorario(agenda, childId) {
  // A liberação do responsável vem primeiro: ela existe justamente para valer
  // FORA da janela configurada.
  if (minutosLiberados(childId) > 0) return true

  if (!agenda || !Array.isArray(agenda)) return true
  const agora = new Date()
  const diaIdx = agora.getDay()
  const horaAtual = agora.getHours() * 60 + agora.getMinutes()
  const slot = agenda[diaIdx]
  if (!slot || !slot.ativo) return false
  const [hIni, mIni] = (slot.inicio || '00:00').split(':').map(Number)
  const [hFim, mFim] = (slot.fim || '23:59').split(':').map(Number)
  return horaAtual >= hIni * 60 + mIni && horaAtual <= hFim * 60 + mFim
}

/** Opções oferecidas ao responsável na tela de bloqueio. */
export const OPCOES_LIBERACAO = [15, 30, 60]
