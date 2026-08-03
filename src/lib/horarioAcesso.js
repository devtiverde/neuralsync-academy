import { supabase } from './supabase'
import { liberarHorario } from './economia'

/**
 * Regra de horário de acesso da criança + liberação temporária pelo responsável.
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * `dentroDoHorario` estava copiado, idêntico, em `HomeCrianca.jsx` e em `Bloqueio.jsx`.
 * Uma tela decide se manda pro bloqueio, a outra decide se libera de volta — se as duas
 * cópias divergirem, a criança fica presa num pingue-pongue entre as telas.
 *
 * O QUE MUDOU EM 02/08/2026
 * A liberação passou a ser gravada no banco (`ns_liberacoes`, migration 023) e o
 * localStorage virou só um CACHE, sobrescrito pelo servidor a cada sincronização.
 *
 * Antes, o valor local era a própria verdade: escrever uma data de 2099 na chave dava
 * acesso permanente, e ninguém do outro lado saberia. Agora um valor adulterado dura
 * até a próxima leitura do banco, e a liberação que o responsável concede vale em
 * qualquer aparelho — o que também conserta um problema de produto real: liberar no
 * celular do pai não liberava no tablet da criança.
 *
 * ⚠️ O QUE ISTO **NÃO** RESOLVE, e é importante não vender como resolvido:
 * a tela de bloqueio continua sendo do navegador. Quem abrir o console e mexer no
 * estado do React entra do mesmo jeito, com ou sem liberação — assim como quem edita
 * `ns_agenda_config` direto. Controle parental aqui é conveniência para a família,
 * não barreira contra um adolescente determinado. Bloqueio de verdade exigiria o
 * servidor recusando o conteúdo, não a tela escondendo o botão.
 */

const PREFIXO = 'ns_liberacao_'

/** Chave por criança: liberar a Lize não pode liberar o Pedro junto. */
const chave = childId => `${PREFIXO}${childId || 'sem-filho'}`

function lerCache(childId) {
  try {
    const bruto = localStorage.getItem(chave(childId))
    if (!bruto) return 0
    const ate = Number(bruto)
    if (!Number.isFinite(ate)) { localStorage.removeItem(chave(childId)); return 0 }
    return ate
  } catch { return 0 }
}

function gravarCache(childId, ateMs) {
  try {
    if (ateMs > Date.now()) localStorage.setItem(chave(childId), String(ateMs))
    else localStorage.removeItem(chave(childId))
  } catch { /* modo privado */ }
}

/**
 * Puxa do banco a liberação em vigor e reescreve o cache local.
 *
 * É o que desfaz adulteração: se alguém escreveu uma data de 2099 na chave, a primeira
 * sincronização devolve o valor real (ou apaga, se não houver liberação nenhuma).
 * Chamar ao montar a tela de bloqueio e a home da criança.
 */
export async function sincronizarLiberacao(childId) {
  if (!childId) return 0
  const { data, error } = await supabase
    .from('ns_liberacoes').select('ate').eq('child_id', childId).maybeSingle()

  // Falha de rede NÃO apaga o cache: a criança que está no meio de um tempo liberado
  // não pode ser barrada porque o wi-fi caiu. Mantém o que tinha e tenta de novo depois.
  if (error) return minutosLiberados(childId)

  const ateMs = data?.ate ? new Date(data.ate).getTime() : 0
  gravarCache(childId, ateMs)
  return ateMs > Date.now() ? Math.ceil((ateMs - Date.now()) / 60000) : 0
}

/**
 * Minutos que ainda restam de liberação. 0 = não há liberação.
 * Continua síncrona de propósito: é lida durante a renderização das telas, e torná-la
 * assíncrona faria a tela piscar o bloqueio antes de decidir.
 */
export function minutosLiberados(childId) {
  const ate = lerCache(childId)
  if (!ate) return 0
  const restanteMs = ate - Date.now()
  if (restanteMs <= 0) { try { localStorage.removeItem(chave(childId)) } catch { /* modo privado */ } return 0 }
  return Math.ceil(restanteMs / 60000)
}

/**
 * Concede N minutos a partir de agora. Sobrescreve uma liberação em curso.
 * Grava no servidor PRIMEIRO: marcar o cache antes faria a tela liberar mesmo quando a
 * gravação falhasse, e aí a liberação sumiria sozinha no próximo carregamento.
 */
export async function liberarPorMinutos(childId, minutos) {
  const r = await liberarHorario({ childId, minutos })
  if (!r?.ok) return false
  gravarCache(childId, r.ate ? new Date(r.ate).getTime() : Date.now() + minutos * 60000)
  return true
}

/** Encerra a liberação antes da hora (usado pelo responsável nas Configurações). */
export async function cancelarLiberacao(childId) {
  const r = await liberarHorario({ childId, minutos: 0 })
  gravarCache(childId, 0)
  return !!r?.ok
}

/**
 * A criança pode usar a plataforma agora?
 *
 * Sem agenda configurada, o acesso é livre — é o padrão de quem nunca abriu a tela de
 * Agenda, e barrar aí seria quebrar o produto para a maioria.
 */
export function dentroDoHorario(agenda, childId) {
  // A liberação do responsável vem primeiro: ela existe justamente para valer FORA da
  // janela configurada.
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
