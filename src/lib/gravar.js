import { supabase } from './supabase'

/**
 * Gravação que NÃO falha em silêncio.
 *
 * O PROBLEMA QUE ISTO RESOLVE
 * As três gravações mais importantes do produto — debitar moeda na Loja, creditar
 * XP no Encerramento e o bônus da Trilha — eram disparadas com
 * `.then(() => {})`. Esse `then` vazio engole o erro: a tela segue como se
 * tivesse dado certo, o estado local já mudou, e o banco não recebeu nada.
 *
 * O sintoma para a família não é uma mensagem de erro, é pior: a criança compra
 * um item, vê "compra feita", e no dia seguinte (ou noutro aparelho, quando o
 * app relê do servidor) o item não existe mais. Ou termina uma atividade, vê o
 * XP subir na tela, e ele volta atrás. Ninguém reporta isso como bug — reporta
 * como "o joguinho comeu minhas moedas", se reportar.
 *
 * ALÉM DE DETECTAR, AVISAR
 * Só devolver `false` não bastaria: o erro continuaria invisível para nós. Como
 * já existe canal de auto-reporte (o ErrorBoundary grava em `ns_feedback` com
 * prefixo `[automático]`), a falha entra pelo mesmo caminho e aparece na mesma
 * consulta. Sem inventar infraestrutura nova.
 *
 * O reporte é best-effort de propósito: se ele próprio falhar, engole. Uma falha
 * ao avisar sobre uma falha não pode virar um terceiro problema na frente da
 * criança.
 */

async function reportar(operacao, erro) {
  try {
    const { data } = await supabase.auth.getUser()
    if (!data?.user) return // sem sessão o RLS recusaria o insert de qualquer forma
    await supabase.from('ns_feedback').insert({
      user_id: data.user.id,
      tipo: 'bug',
      mensagem: `[automático] gravação falhou: ${operacao} — ${String(erro?.message || erro).slice(0, 300)}`,
      contexto: {
        automatico: true,
        operacao,
        rota: typeof window !== 'undefined' ? window.location.pathname : null,
        codigo: erro?.code ?? null,
        detalhe: erro?.details ?? null,
      },
    })
  } catch { /* avisar sobre a falha não pode virar outra falha */ }
}

/**
 * Executa uma gravação do Supabase e diz se deu certo.
 *
 * @param {Promise} consulta   o `supabase.from(...).update(...)` já montado
 * @param {string}  operacao   rótulo curto que vai no reporte, ex.: 'loja:debitar-moedas'
 * @returns {Promise<boolean>} true se gravou; false se falhou (já reportado)
 *
 * @example
 *   const ok = await gravar(
 *     supabase.from('children').update({ xp }).eq('id', childId),
 *     'encerramento:creditar-xp',
 *   )
 *   if (!ok) { desfazerNaTela(); avisar(); return }
 */
export async function gravar(consulta, operacao) {
  try {
    const { error } = await consulta
    if (error) {
      console.error(`[gravar] ${operacao}`, error)
      reportar(operacao, error)
      return false
    }
    return true
  } catch (e) {
    // Rede caiu, aba fechando, CORS — o await lança em vez de devolver `error`.
    console.error(`[gravar] ${operacao}`, e)
    reportar(operacao, e)
    return false
  }
}

/**
 * Várias gravações que precisam valer em conjunto. Devolve false se QUALQUER uma
 * falhar. Roda todas mesmo assim: numa compra, se o débito da moeda funcionou e
 * o registro do item não, gravar o que deu é melhor que abortar no meio — e o
 * chamador ainda recebe `false` para desfazer na tela e avisar.
 *
 * ⚠️ Não é transação. O Postgres não tem como desfazer o que já entrou por aqui;
 * para isso a gravação teria que virar uma função no servidor. Enquanto for
 * client-authoritative, isto é o teto do que dá para garantir. Ver a pendência
 * de tornar XP/moedas server-authoritative.
 */
export async function gravarTodas(operacoes) {
  const resultados = await Promise.all(
    operacoes.map(({ consulta, operacao }) => gravar(consulta, operacao)),
  )
  return resultados.every(Boolean)
}
