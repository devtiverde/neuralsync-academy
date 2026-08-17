// Despeja TODAS as atividades como JSON, para as auditorias consumirem.
//
// POR QUE ISTO EXISTE
// O `auditar-atividades.mjs` abre a rota /dev/atividade/:tipo, que sem `?id=` cai sempre na
// PRIMEIRA atividade daquele tipo. Com 528 atividades e 24 tipos, isso significa que 504
// nunca foram abertas por auditoria nenhuma — e "24/24 passou" nunca disse nada sobre elas.
//
// A varredura é por `Object.values` (igual ao `inventario` e ao `gerar-economia-seed`), e
// NÃO por lista fixa de exports: os três lugares que enumeram export à mão já esqueceram um
// em silêncio antes. `colorirExtra2` e `musicaExtra` ficam FORA do barril `atividadesExtra`,
// então entram explicitamente.
//
// Uso:  node scripts/listar-atividades.mjs            (grava scripts/saida/atividades.json)
//       node scripts/listar-atividades.mjs --tipo quiz

import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { mkdirSync, writeFileSync } from 'node:fs'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const carregar = rel => import(pathToFileURL(resolve(raiz, rel)).href)

const dados = await carregar('src/data/atividadesData.js')
const extra = await carregar('src/data/atividadesExtra.js')
const colorir2 = await carregar('src/data/colorirExtra2.js')
const musica = await carregar('src/data/musicaExtra.js')

function coletar(modulo, origem) {
  const fora = []
  // 🪤 `colorirExtra2.js` e `musicaExtra.js` exportam o MESMO objeto duas vezes (named +
  // `export default`). Iterar `Object.entries` cru conta cada atividade duas vezes e a
  // primeira versão deste script gritou "28 ids REPETIDOS" — defeito do instrumento, não
  // do dado: o `checar-ids` e o `inventario` sempre disseram 528 sem repetição. Deduplicar
  // por IDENTIDADE do objeto (não por nome do export) resolve sem lista fixa.
  const jaVistos = new Set()
  for (const [nomeExport, valor] of Object.entries(modulo)) {
    if (!valor || typeof valor !== 'object' || Array.isArray(valor)) continue
    if (jaVistos.has(valor)) continue
    jaVistos.add(valor)
    for (const [faixa, lista] of Object.entries(valor)) {
      if (!Array.isArray(lista)) continue
      for (const a of lista) {
        if (!a || !a.id) continue
        fora.push({ id: a.id, tipo: a.tipo, titulo: a.titulo, faixa, origem, nomeExport })
      }
    }
  }
  return fora
}

const todas = [
  ...coletar(dados, 'atividadesData'),
  ...coletar(extra, 'atividadesExtra'),
  ...coletar(colorir2, 'colorirExtra2'),
  ...coletar(musica, 'musicaExtra'),
]

// Id repetido faria a auditoria medir a mesma atividade duas vezes e relatar um total
// inflado. O `checar-ids` já quebra o build nesse caso, mas quem consome este arquivo não
// deve depender disso para confiar na contagem.
const vistos = new Map()
const repetidos = []
for (const a of todas) {
  if (vistos.has(a.id)) repetidos.push(a.id)
  else vistos.set(a.id, a)
}
const unicas = [...vistos.values()]

const filtroTipo = process.argv.includes('--tipo')
  ? process.argv[process.argv.indexOf('--tipo') + 1]
  : null
const saidaLista = filtroTipo ? unicas.filter(a => a.tipo === filtroTipo) : unicas

// Atividade sem `tipo` no dado não tem rota para abrir: a bancada resolve o componente pelo
// :tipo da URL. Sinalizar é melhor que sumir com ela da contagem.
const semTipo = unicas.filter(a => !a.tipo)

mkdirSync(resolve(raiz, 'scripts/saida'), { recursive: true })
writeFileSync(
  resolve(raiz, 'scripts/saida/atividades.json'),
  JSON.stringify({ total: unicas.length, repetidos, semTipo: semTipo.map(a => a.id), atividades: saidaLista }, null, 2),
)

const porTipo = {}
for (const a of saidaLista) porTipo[a.tipo || '(sem tipo)'] = (porTipo[a.tipo || '(sem tipo)'] || 0) + 1

console.log(`\n${unicas.length} atividades únicas${filtroTipo ? ` · filtrando tipo=${filtroTipo} → ${saidaLista.length}` : ''}`)
if (repetidos.length) console.log(`⛔ ${repetidos.length} id(s) REPETIDO(S): ${repetidos.slice(0, 8).join(', ')}`)
if (semTipo.length) console.log(`⚠️  ${semTipo.length} sem campo \`tipo\` (não têm rota): ${semTipo.slice(0, 8).map(a => a.id).join(', ')}`)
console.log(`\ntipo × quantidade:`)
for (const [t, n] of Object.entries(porTipo).sort((a, b) => b[1] - a[1])) console.log(`  ${t.padEnd(22)} ${n}`)
console.log(`\n→ scripts/saida/atividades.json\n`)
