import { supabase } from './supabase'

/**
 * Toda entrada e saída de XP e de NeuralCoins passa por aqui.
 *
 * O QUE MUDOU EM 02/08/2026
 * Antes cada tela calculava o novo total e mandava `update children set xp = <total>`.
 * Isso quer dizer que o navegador decidia quanto a criança ganhava — e a chave anon que
 * autoriza essa escrita está publicada dentro do bundle. Uma linha no console valia
 * qualquer pontuação, e o ranking entre famílias não significava nada.
 *
 * Agora o cliente diz o que ACONTECEU ("concluí a atividade tal") e o servidor decide
 * quanto isso vale, consultando a tabela de recompensas (migrations 023 e 024). As
 * colunas `xp`, `neural_coins`, `nivel` e as de sequência estão revogadas para o papel
 * `authenticated`: mesmo que alguém tente escrever direto, o banco recusa.
 *
 * COMO LER O RETORNO
 * Todas devolvem `{ ok, motivo?, xp, coins, nivel, streak }`. `ok: false` com `motivo`
 * é recusa esperada (já resgatou, saldo insuficiente) e deve virar mensagem para a
 * criança. `null` é falha de rede ou erro inesperado — aí a tela mantém o que já
 * mostrou e a próxima ação corrige, como antes.
 */

async function chamar(funcao, args, operacao) {
  const { data, error } = await supabase.rpc(funcao, args)
  if (error) {
    // Mesmo canal de auto-reporte do `gravar.js`: falha silenciosa em crédito de XP é
    // exatamente o tipo de coisa que a família relata como "o joguinho comeu meus
    // pontos", meses depois, sem detalhe nenhum.
    try {
      const { data: sessao } = await supabase.auth.getUser()
      if (sessao?.user) {
        await supabase.from('ns_feedback').insert({
          user_id: sessao.user.id,
          tipo: 'bug',
          mensagem: `[automático] economia falhou: ${operacao} — ${String(error.message).slice(0, 300)}`,
          contexto: { automatico: true, operacao, funcao, codigo: error.code ?? null },
        })
      }
    } catch { /* avisar sobre a falha não pode virar outra falha */ }
    return null
  }
  return data
}

/** Conclusão de atividade. O servidor consulta o valor; o cliente não o envia. */
export function creditarAtividade({ childId, atividadeId, titulo, emoji, assistiu, multXp, multCoins }) {
  return chamar('ns_creditar_atividade', {
    p_child: childId,
    p_atividade: atividadeId,
    p_titulo: titulo ?? null,
    p_emoji: emoji ?? '⭐',
    p_assistiu: !!assistiu,
    // Multiplicador de power-up ainda vem daqui porque a ATIVAÇÃO do power-up mora no
    // localStorage. O servidor limita a 3×, que é o teto do item mais caro da Loja —
    // então o pior caso é o de quem comprou, não um número qualquer. Ver o comentário
    // longo na migration 023.
    p_mult_xp: multXp ?? 1,
    p_mult_coins: multCoins ?? 1,
  }, 'creditar-atividade')
}

/**
 * Bônus de valor fixo. `tipo`: 'missao' | 'desafio' | 'offline' | 'kids'.
 * `ref` limita a repetição por item (id da atividade offline, id do vídeo); missão e
 * desafio ignoram, porque a janela deles é o dia e a semana.
 *
 * ⚠️ O controle de "já resgatei" saiu do localStorage. Antes `ns_desafio_<filho>_<semana>`
 * era só uma chave: apagar liberava os 500 XP de novo, sem limite.
 */
export function creditarBonus({ childId, tipo, ref }) {
  return chamar('ns_creditar_bonus', {
    p_child: childId, p_tipo: tipo, p_ref: ref ?? null,
  }, `bonus-${tipo}`)
}

/** Compra na Loja. O preço vem da tabela do servidor, não do catálogo da tela. */
export function debitarLoja({ childId, itemId }) {
  return chamar('ns_debitar_loja', { p_child: childId, p_item: itemId }, 'debitar-loja')
}

/** Zera a sequência quando passou um dia sem jogar. Calculado a partir do histórico. */
export function sincronizarStreak(childId) {
  return chamar('ns_sincronizar_streak', { p_child: childId }, 'sincronizar-streak')
}

/** Libera tempo extra. `minutos: 0` cancela a liberação em vigor. */
export function liberarHorario({ childId, minutos }) {
  return chamar('ns_liberar_horario', { p_child: childId, p_minutos: minutos }, 'liberar-horario')
}

/**
 * Minutos de liberação ainda válidos, lidos do banco.
 * Devolve 0 quando não há liberação — e também quando a consulta falha, que é a
 * resposta segura: na dúvida, o bloqueio continua valendo.
 */
export async function minutosLiberados(childId) {
  if (!childId) return 0
  const { data, error } = await supabase
    .from('ns_liberacoes').select('ate').eq('child_id', childId).maybeSingle()
  if (error || !data?.ate) return 0
  const restante = Math.ceil((new Date(data.ate).getTime() - Date.now()) / 60000)
  return restante > 0 ? restante : 0
}

/**
 * Aplica na cópia local do filho o que o servidor devolveu.
 * A tela lê `ns_active_child` do localStorage o tempo todo; sem isto o XP só apareceria
 * atualizado no próximo carregamento.
 */
export function aplicarNoFilhoLocal(resultado) {
  if (!resultado?.ok) return null
  try {
    const atual = JSON.parse(localStorage.getItem('ns_active_child') || 'null')
    if (!atual) return null
    const novo = {
      ...atual,
      xp: resultado.xp ?? atual.xp,
      neural_coins: resultado.coins ?? atual.neural_coins,
      nivel: resultado.nivel ?? atual.nivel,
      streak_atual: resultado.streak ?? atual.streak_atual,
    }
    localStorage.setItem('ns_active_child', JSON.stringify(novo))
    return novo
  } catch { return null }
}
