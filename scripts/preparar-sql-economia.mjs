/**
 * preparar-sql-economia.mjs — valida a migration 024 e gera a versão enxuta,
 * só com as atividades que ainda NÃO estão no banco.
 *
 * POR QUE ISSO EXISTE
 * -------------------
 * `npm run gerar-economia` reescreve a `024`, mas regenerar NÃO É APLICAR.
 * Enquanto o SQL não roda no banco, a atividade nova não paga XP nem moedas —
 * `ns_creditar_atividade` falha FECHADA para atividade fora do seed, e isso é
 * de propósito. Este script prepara o que o Cláudio cola no SQL Editor.
 *
 * O QUE ELE ENTREGA
 * -----------------
 *  1. Valida a `024` inteira com a gramática REAL do Postgres (`pgsql-parser`),
 *     não com regex. SQL que "parece certo" e não parseia é erro que só
 *     aparece na hora de colar.
 *  2. Confere que a contagem prometida no cabeçalho bate com as linhas de
 *     verdade dentro do arquivo — cabeçalho gerado pode mentir se o gerador
 *     mudar e o texto ficar para trás.
 *  3. Escreve `scripts/saida/economia-delta.sql`, só com as linhas dos ids
 *     passados por argumento. Serve para colar pouco quando se sabe
 *     exatamente o que entrou.
 *
 * A `024` é idempotente de verdade (`INSERT ... ON CONFLICT DO UPDATE`), então
 * reaplicar o arquivo inteiro é seguro e deixa banco e repositório iguais.
 * ⚠️ O que ela NÃO faz é APAGAR linha de atividade que saiu do repositório.
 *
 * Uso:
 *   node scripts/preparar-sql-economia.mjs                → só valida
 *   node scripts/preparar-sql-economia.mjs id1 id2 ...    → valida e gera o delta
 *   node scripts/preparar-sql-economia.mjs --novos-quiz   → delta dos 30 de 08/08
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { parse } from 'pgsql-parser'

const ARQUIVO = 'supabase/migrations/024_economia_valores.sql'
const sql = readFileSync(ARQUIVO, 'utf8')

console.log(`\n🗄️  ${ARQUIVO}\n`)

// ── 0. O instrumento se prova ────────────────────────────────────────────────
// Um parser que engolisse qualquer coisa daria "✅ sem erro de sintaxe" para SQL
// quebrado e essa checagem inteira seria enfeite. Antes de medir, exigir que ele
// REPROVE algo sabidamente inválido.
try {
  await parse('select from where (((')
  console.error('🔴 O parser aceitou SQL inválido — esta verificação não mede nada.')
  process.exit(1)
} catch { /* era para falhar mesmo */ }

/** `parse` devolve `{ version, stmts }` — não um array. Contar `stmts`. */
const contarComandos = r => (Array.isArray(r) ? r.length : r?.stmts?.length ?? 0)

// ── 1. Parse de verdade ──────────────────────────────────────────────────────
let nComandos
try {
  nComandos = contarComandos(await parse(sql))
  if (nComandos === 0) { console.error('🔴 Parseou mas não achou comando nenhum.'); process.exit(1) }
  console.log(`✅ Gramática do Postgres: ${nComandos} comando(s), sem erro de sintaxe.`)
} catch (e) {
  console.error(`🔴 O SQL NÃO PARSEIA: ${e.message}`)
  process.exit(1)
}

// ── 2. O cabeçalho bate com o conteúdo? ──────────────────────────────────────
const prometido = {
  atividades: Number(sql.match(/Atividades:\s*(\d+)/)?.[1] ?? -1),
  itens:      Number(sql.match(/Itens da Loja:\s*(\d+)/)?.[1] ?? -1),
}

const blocoRecompensas = sql.slice(sql.indexOf('ns_recompensas'), sql.indexOf('ns_loja_precos'))
const blocoPrecos      = sql.slice(sql.indexOf('ns_loja_precos'))
const real = {
  atividades: (blocoRecompensas.match(/^\s*\('/gm) || []).length,
  itens:      (blocoPrecos.match(/^\s*\('/gm) || []).length,
}

const bate = prometido.atividades === real.atividades && prometido.itens === real.itens
console.log(`${bate ? '✅' : '🔴'} Cabeçalho × conteúdo: ${real.atividades} atividades e ${real.itens} itens ` +
            `(cabeçalho diz ${prometido.atividades} e ${prometido.itens}).`)
if (!bate) process.exit(1)

console.log(`✅ Idempotente: ${(sql.match(/ON CONFLICT/g) || []).length} cláusulas ON CONFLICT DO UPDATE — pode reaplicar.`)

// ── 3. Delta ─────────────────────────────────────────────────────────────────
const NOVOS_QUIZ_0808 = [
  'exp_quiz_transportes', 'exp_quiz_casa', 'exp_quiz_tempo', 'exp_quiz_bichinhos',
  'exp_quiz_comida', 'exp_quiz_higiene', 'exp_quiz_oceano', 'exp_quiz_sons',
  'con_quiz_espaco', 'con_quiz_dinossauros', 'con_quiz_agua', 'con_quiz_oceanos',
  'con_quiz_energia', 'con_quiz_portugues', 'con_quiz_reciclagem',
  'cri_quiz_corpo', 'cri_quiz_astronomia', 'cri_quiz_tecnologia', 'cri_quiz_dinheiro',
  'cri_quiz_musica', 'cri_quiz_esportes', 'cri_quiz_literatura', 'cri_quiz_clima',
  'inv_quiz_genetica', 'inv_quiz_ia', 'inv_quiz_seguranca', 'inv_quiz_economia',
  'inv_quiz_quimica', 'inv_quiz_estatistica', 'inv_quiz_evolucao',
]

const args = process.argv.slice(2)
const ids = args.includes('--novos-quiz') ? NOVOS_QUIZ_0808 : args
if (ids.length === 0) {
  console.log('\nSem ids: nenhum delta gerado. Use --novos-quiz ou passe os ids.\n')
  process.exit(0)
}

const linhas = []
const naoAchados = []
for (const id of ids) {
  const m = blocoRecompensas.match(new RegExp(`^\\s*\\('${id}',.*$`, 'm'))
  if (m) linhas.push('  ' + m[0].trim().replace(/,$/, ''))
  else naoAchados.push(id)
}

if (naoAchados.length) {
  console.error(`\n🔴 Não estão na 024 (rodou \`npm run gerar-economia\`?): ${naoAchados.join(', ')}`)
  process.exit(1)
}

const delta = `-- ============================================================
-- Economia — apenas as ${linhas.length} atividades novas de 08/08/2026
-- ============================================================
-- Recorte da migration 024, que é a fonte da verdade. Aplicar a 024 inteira
-- também funciona e é igualmente seguro: ela é idempotente.
--
-- 🔴 SEM ISSO A ATIVIDADE NOVA NÃO PAGA NADA. A função ns_creditar_atividade
-- falha FECHADA para atividade que não está aqui — de propósito. A criança
-- joga, a tela comemora, e o XP e as moedas não sobem.
--
-- Depende da migration 023 (que cria a tabela ns_recompensas).
-- Pode rodar quantas vezes quiser: ON CONFLICT DO UPDATE.
-- ============================================================

INSERT INTO public.ns_recompensas (atividade_id, tipo, xp, coins) VALUES
${linhas.join(',\n')}
ON CONFLICT (atividade_id) DO UPDATE
  SET tipo = excluded.tipo, xp = excluded.xp, coins = excluded.coins;

-- Conferência depois de aplicar — tem que devolver ${linhas.length}:
--   select count(*) from public.ns_recompensas
--    where atividade_id in (${ids.map(i => `'${i}'`).join(', ')});
`

// O delta também tem que parsear: recorte feito com regex é exatamente o tipo
// de coisa que gera SQL quebrado sem ninguém perceber.
try {
  const c = contarComandos(await parse(delta))
  if (c === 0) { console.error('🔴 O delta parseou vazio.'); process.exit(1) }
  console.log(`✅ Delta gerado e validado: ${linhas.length} linhas, ${c} comando(s).`)
} catch (e) {
  console.error(`🔴 O DELTA não parseia: ${e.message}`)
  process.exit(1)
}

mkdirSync('scripts/saida', { recursive: true })
writeFileSync('scripts/saida/economia-delta.sql', delta, 'utf8')
console.log('   → scripts/saida/economia-delta.sql\n')
