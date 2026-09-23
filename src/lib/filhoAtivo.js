import { supabase } from './supabase'

/**
 * Quem é a criança nesta tela.
 *
 * O DEFEITO QUE ISTO CONSERTA — 23/09/2026
 * ----------------------------------------
 * Relato do Cláudio: *"o botão JÁ FIZ ESSA! +15 não está clicável"* nas Atividades
 * Offline. O botão estava certo e o servidor também. O que faltava era a CRIANÇA.
 *
 * Dezesseis telas da área da criança liam o filho ativo assim:
 *
 *     const stored = JSON.parse(localStorage.getItem('ns_active_child') || 'null')
 *     if (stored) setChild(stored)
 *
 * Quem escreve essa chave é a `/home-crianca`. Então quem chega por qualquer outro
 * caminho — o menu de baixo, um link direto, outro aparelho, depois de limpar o
 * navegador, ou logo após entrar — fica com `child = null`. E aí a tela renderiza
 * INTEIRA, com todos os botões habilitados e com a cara de sempre, mas o primeiro
 * `if (!child) return` de cada ação engole o clique: sem pedido, sem mensagem, sem
 * erro no console. Medido com `repro-offline.mjs --sem-filho`: 8 botões visíveis,
 * habilitados, e o clique não produz absolutamente nada.
 *
 * 🔑 A lição é a de sempre: ausência de dado virou ausência de RESPOSTA. O sintoma
 * do lado de quem usa é mudo, então nenhuma auditoria de layout ou de toque acha —
 * `auditar-toque.mjs` clica e não vê erro, porque não há erro. Ver
 * [[feedback_validar_o_instrumento_antes_da_medida]].
 *
 * 🪤 Não basta cair para o banco: se o banco também não responder, a tela tem que
 * DIZER isso. Por isso `carregarFilhoAtivo` devolve `{ filho, motivo }` e nunca um
 * `null` solto — quem chama precisa conseguir distinguir "ainda não sei" de
 * "não tem filho cadastrado" de "a consulta falhou".
 */

const CHAVE = 'ns_active_child'

function lerDoNavegador() {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE) || 'null')
    // Um id em forma de UUID é o mínimo: as telas filtram `child_id` e o Postgres
    // devolve 400 para um id solto, o que apareceria como "erro de JS" sem relação.
    return bruto?.id ? bruto : null
  } catch { return null }
}

export function salvarFilhoAtivo(filho) {
  try { localStorage.setItem(CHAVE, JSON.stringify(filho)) } catch { /* modo privado */ }
  return filho
}

/**
 * Devolve `{ filho, motivo }`.
 *  - `{ filho: {...}, motivo: 'local' | 'banco' }`  — achou
 *  - `{ filho: null, motivo: 'sem-cadastro' }`      — a conta não tem filho ainda
 *  - `{ filho: null, motivo: 'sem-conexao' }`       — não deu para saber agora
 *  - `{ filho: null, motivo: 'sem-login' }`         — não há usuário
 *
 * Quando vem do banco, grava no navegador: as outras telas continuam lendo a chave.
 */
export async function carregarFilhoAtivo(userId) {
  const local = lerDoNavegador()
  if (local) return { filho: local, motivo: 'local' }
  if (!userId) return { filho: null, motivo: 'sem-login' }

  const { data, error } = await supabase
    .from('children').select('*').eq('parent_id', userId)
  if (error) return { filho: null, motivo: 'sem-conexao' }
  if (!data || data.length === 0) return { filho: null, motivo: 'sem-cadastro' }

  return { filho: salvarFilhoAtivo(data[0]), motivo: 'banco' }
}

/** Frase para a criança/responsável quando não há filho para agir. */
export function fraseSemFilho(motivo) {
  if (motivo === 'sem-cadastro') return 'Nenhum perfil de criança cadastrado ainda. Peça ao responsável para criar um no painel.'
  if (motivo === 'sem-conexao') return 'Não consegui carregar o perfil agora. Confira a conexão e tente de novo.'
  return 'Não achei o perfil da criança. Volte ao início e escolha o perfil.'
}
