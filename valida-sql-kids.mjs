// Valida o SQL gerado pelo painel do Kids TV contra a gramática real do Postgres.
// Vive no projeto porque a resolução de ESM parte do ARQUIVO, não do cwd.
// Uso: node valida-sql-kids.mjs <arquivo.sql>
//
// `pgsql-parser` foi instalado com --no-save (não está no package.json, para não pesar o
// projeto por causa de uma ferramenta de conferência). Se sumir depois de um `npm ci`, rodar
// `npm install --no-save pgsql-parser` de novo.
// 🪤 Não chamar `pgsql-parser` e `libpg-query` no MESMO processo: derruba o Node no Windows.
import { readFileSync } from 'node:fs'
import { parse } from 'pgsql-parser'

const caminho = process.argv[2]
if (!caminho) {
  console.error('uso: node valida-sql-kids.mjs <arquivo.sql>')
  process.exit(2)
}

try {
  const resultado = await parse(readFileSync(caminho, 'utf8'))
  const comandos = resultado.stmts ?? resultado
  console.log(`OK — ${comandos.length} comandos aceitos pela gramática do Postgres`)
  comandos.forEach((c, i) => console.log(`  ${i + 1}. ${Object.keys(c.stmt ?? c)[0]}`))
} catch (erro) {
  console.error('ERRO DE SINTAXE: ' + erro.message)
  process.exit(1)
}
