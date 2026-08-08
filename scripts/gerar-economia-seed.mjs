// Gera a migration com os números da economia: quanto cada atividade paga e quanto
// cada item da Loja custa.
//
// POR QUE ISTO EXISTE
// Até 02/08/2026 esses números só existiam no navegador, e o navegador também era quem
// mandava o resultado para o banco — ou seja, o cliente decidia quanto ganhava. Agora o
// servidor decide (migration 023), e para decidir ele precisa dos mesmos valores.
//
// Duplicar à mão daria divergência na primeira atividade nova: a criança concluiria algo
// que o servidor não conhece e não receberia nada. Por isso os valores são EXTRAÍDOS dos
// mesmos arquivos que a tela usa, nunca redigitados.
//
// Uso:  npm run gerar-economia
// Saída: supabase/migrations/024_economia_valores.sql  (idempotente, pode reaplicar)

import { writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const destino = resolve(raiz, 'supabase/migrations/024_economia_valores.sql')

// `import()` de caminho absoluto no Windows falha com ERR_UNSUPPORTED_ESM_URL_SCHEME:
// o `E:\...` é lido como se `e:` fosse o protocolo. Precisa virar URL file://.
const carregar = rel => import(pathToFileURL(resolve(raiz, rel)).href)

const dados = await carregar('src/data/atividadesData.js')
const extra = await carregar('src/data/atividadesExtra.js')
const loja  = await carregar('src/data/lojaCatalogo.js')

// 🔴 `atividadesExtra.js` é um barril — e ele NÃO cobre tudo. `colorirExtra2` e
// `musicaExtra` são módulos próprios, importados direto pelo `useAtividades`, e por
// isso ficaram de fora daqui desde que foram criados: 28 atividades (16 colorir +
// 12 musica) que a criança JOGA e pelas quais não recebe nada. `ns_creditar_atividade`
// falha FECHADA para atividade fora do seed, então o sintoma é a tela comemorar e o
// XP não subir — sem erro em lugar nenhum.
// Descoberto em 08/08/2026 comparando este total (500) com o do `npm run checar-ids`
// (528). 🔑 Dois contadores que deveriam bater e não batem é o que denuncia.
const colorir2 = await carregar('src/data/colorirExtra2.js')
const musica   = await carregar('src/data/musicaExtra.js')

// Todo grupo exportado que seja `{ faixa: [atividades] }`. Pegar por varredura, e não
// por lista fixa, é de propósito: o projeto já tem 12 grupos (`fase2`, `fase3Extra`,
// `inglesExtra`…) e uma lista fixa silenciosamente esqueceria o próximo.
function coletar(modulo) {
  const fora = []
  for (const valor of Object.values(modulo)) {
    if (!valor || typeof valor !== 'object' || Array.isArray(valor)) continue
    for (const lista of Object.values(valor)) {
      if (Array.isArray(lista)) fora.push(...lista.filter(a => a && a.id))
    }
  }
  return fora
}

const atividades = [...coletar(dados), ...coletar(extra), ...coletar(colorir2), ...coletar(musica)]

const porId = new Map()
const divergentes = []
for (const a of atividades) {
  const linha = {
    id: a.id,
    tipo: a.tipo ?? '',
    xp: Number(a.xp_reward ?? 0) || 0,
    coins: Number(a.coins_reward ?? 0) || 0,
  }
  const anterior = porId.get(a.id)
  // ID repetido já aconteceu 3× neste projeto. Se as recompensas divergirem, escolher
  // uma delas em silêncio faria a criança receber um valor diferente do que a tela
  // mostrou. Melhor quebrar aqui.
  if (anterior && (anterior.xp !== linha.xp || anterior.coins !== linha.coins)) {
    divergentes.push(a.id)
  }
  porId.set(a.id, linha)
}

if (divergentes.length) {
  console.error('❌ IDs repetidos com recompensas diferentes:', divergentes.join(', '))
  process.exit(1)
}

const semRecompensa = [...porId.values()].filter(l => l.xp === 0 && l.coins === 0)

const itens = [
  ...loja.catalogoAvatares, ...loja.catalogoMolduras, ...loja.catalogoTemas,
  ...loja.catalogoTitulos, ...loja.catalogoPowerups, ...loja.catalogoEfeitos,
  ...loja.catalogoBrindes,
].filter(i => i && i.id)

const aspas = s => String(s).replaceAll("'", "''")

const linhasAtividades = [...porId.values()]
  .sort((a, b) => a.id.localeCompare(b.id))
  .map(l => `  ('${aspas(l.id)}', '${aspas(l.tipo)}', ${l.xp}, ${l.coins})`)
  .join(',\n')

const linhasItens = itens
  .sort((a, b) => a.id.localeCompare(b.id))
  .map(i => `  ('${aspas(i.id)}', ${Number(i.preco) || 0}, ${Number(i.nivel) || 0})`)
  .join(',\n')

const sql = `-- ============================================================
-- 024 — Valores da economia  (ARQUIVO GERADO — NÃO EDITAR À MÃO)
-- ============================================================
-- Gerado por scripts/gerar-economia-seed.mjs a partir de:
--   src/data/atividadesData.js · src/data/atividadesExtra.js · src/data/lojaCatalogo.js
--
-- Atividades: ${porId.size}   ·   Itens da Loja: ${itens.length}
--
-- Ao acrescentar atividade ou mexer em preço: rodar \`npm run gerar-economia\` e aplicar
-- este arquivo de novo. Sem isso o servidor não conhece a atividade nova e a criança
-- conclui sem receber nada.
--
-- Depende da migration 023 (que cria as tabelas). É idempotente: pode reaplicar.
-- ============================================================

INSERT INTO public.ns_recompensas (atividade_id, tipo, xp, coins) VALUES
${linhasAtividades}
ON CONFLICT (atividade_id) DO UPDATE
  SET tipo = excluded.tipo, xp = excluded.xp, coins = excluded.coins;

INSERT INTO public.ns_loja_precos (item_id, preco, nivel_min) VALUES
${linhasItens}
ON CONFLICT (item_id) DO UPDATE
  SET preco = excluded.preco, nivel_min = excluded.nivel_min;

-- Conferência rápida depois de aplicar:
--   select count(*) from public.ns_recompensas;  -- esperado: ${porId.size}
--   select count(*) from public.ns_loja_precos;  -- esperado: ${itens.length}
`

writeFileSync(destino, sql, 'utf8')

console.log(`✅ ${porId.size} atividades e ${itens.length} itens da Loja gravados em`)
console.log(`   supabase/migrations/024_economia_valores.sql`)
if (semRecompensa.length) {
  console.log(`\n⚠️  ${semRecompensa.length} atividades com XP e coins zerados (podem ser intencionais):`)
  console.log('   ' + semRecompensa.slice(0, 12).map(l => l.id).join(', ') + (semRecompensa.length > 12 ? '…' : ''))
}
