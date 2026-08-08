// Conta as atividades por TIPO × FAIXA e mostra o que falta para a meta de 15.
//
// POR QUE ISTO EXISTE
// A meta "15 por categoria/faixa" foi decidida em 02/08 e a expansão é feita em lotes, ao
// longo de várias sessões. Sem uma medida, cada sessão recomeça contando à mão — e contar à
// mão já errou antes: em 08/08 o `checar-ids` continuou dizendo "421 ids, ok" com 30
// atividades novas já no disco, porque ele enumera os exports à mão e o export novo não
// tinha sido registrado.
//
// Este script varre por `Object.values` (igual ao gerar-economia-seed), então ele enxerga
// export novo sozinho e serve justamente para pegar esse esquecimento: se o número aqui
// subiu e o do `checar-ids` não, falta registrar o export.
//
// 🔑 BALDE VAZIO NEM SEMPRE É LACUNA. Três combinações estão vazias DE PROPÓSITO e enchê-las
// daria 45 atividades que ninguém deveria usar. Elas aparecem como N/A, não como buraco.
//
// Uso:  npm run inventario
//       npm run inventario -- --tipo quizia     (detalha um tipo, listando os ids)

import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const carregar = rel => import(pathToFileURL(resolve(raiz, rel)).href)

const META = 15
const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']

// Combinações deliberadamente vazias — decisão de produto registrada em 08/08.
const NAO_SE_APLICA = {
  'inventor:exploradores': 'exige a criança DIGITAR a invenção para a IA avaliar',
  'silabas:criadores': 'sílabas é alfabetização inicial',
  'silabas:inventores': 'sílabas é alfabetização inicial',
}

// 🪤 O barril `atividadesExtra.js` NÃO cobre tudo: `colorirExtra2` e `musicaExtra` são
// módulos próprios, fora dele. Carregar só o barril fazia esta tabela dizer que `colorir`
// tinha 12 quando tem mais, e omitia o tipo `musica` inteiro — a conferência contra o
// `npm run checar-ids` (que lê os dois) foi o que denunciou: 500 aqui contra 528 lá.
const dados = await carregar('src/data/atividadesData.js')
const extra = await carregar('src/data/atividadesExtra.js')
const colorir2 = await carregar('src/data/colorirExtra2.js')
const musica = await carregar('src/data/musicaExtra.js')

// Varredura por Object.values, e não por lista fixa: o projeto já tem mais de 12 grupos
// exportados e uma lista fixa esqueceria o próximo em silêncio.
function coletar(modulo) {
  const fora = []
  for (const valor of Object.values(modulo)) {
    if (!valor || typeof valor !== 'object' || Array.isArray(valor)) continue
    for (const [faixa, lista] of Object.entries(valor)) {
      if (!Array.isArray(lista)) continue
      for (const a of lista) if (a && a.id) fora.push({ ...a, faixa })
    }
  }
  return fora
}

const todas = [...coletar(dados), ...coletar(extra), ...coletar(colorir2), ...coletar(musica)]

// Deduplicar por id: os grupos podem repetir a mesma atividade e contá-la duas vezes
// inflaria o inventário justamente onde ele é usado para decidir o que falta.
const porId = new Map()
for (const a of todas) if (!porId.has(a.id)) porId.set(a.id, a)
const atividades = [...porId.values()]

const tipoAlvo = process.argv.includes('--tipo')
  ? process.argv[process.argv.indexOf('--tipo') + 1]
  : null

const grade = new Map()
for (const a of atividades) {
  const tipo = a.tipo || '(sem tipo)'
  if (!grade.has(tipo)) grade.set(tipo, new Map(FAIXAS.map(f => [f, []])))
  const linha = grade.get(tipo)
  if (!linha.has(a.faixa)) linha.set(a.faixa, [])
  linha.get(a.faixa).push(a.id)
}

if (tipoAlvo) {
  const linha = grade.get(tipoAlvo)
  if (!linha) {
    console.error(`❌ tipo "${tipoAlvo}" não existe. Tipos: ${[...grade.keys()].sort().join(', ')}`)
    process.exit(1)
  }
  console.log(`\n📋 ${tipoAlvo}\n`)
  for (const faixa of FAIXAS) {
    const ids = linha.get(faixa) || []
    const na = NAO_SE_APLICA[`${tipoAlvo}:${faixa}`]
    console.log(`  ${faixa} — ${ids.length}${na ? '  (N/A: ' + na + ')' : ` / ${META}`}`)
    for (const id of ids.sort()) console.log(`      ${id}`)
  }
  console.log()
  process.exit(0)
}

const linhas = []
for (const [tipo, faixaMap] of grade) {
  const celulas = FAIXAS.map(faixa => {
    const n = (faixaMap.get(faixa) || []).length
    const na = Boolean(NAO_SE_APLICA[`${tipo}:${faixa}`])
    return { n, na, falta: na ? 0 : Math.max(0, META - n) }
  })
  linhas.push({
    tipo,
    celulas,
    total: celulas.reduce((s, c) => s + c.n, 0),
    falta: celulas.reduce((s, c) => s + c.falta, 0),
  })
}

linhas.sort((a, b) => b.falta - a.falta || a.tipo.localeCompare(b.tipo))

const larg = Math.max(...linhas.map(l => l.tipo.length), 4)
const cab = ['tipo'.padEnd(larg), ' exp', ' con', ' cri', ' inv', '  total', '  faltam'].join('')
console.log('\n' + cab)
console.log('─'.repeat(cab.length))

for (const l of linhas) {
  const cels = l.celulas
    .map(c => (c.na ? ' n/a' : String(c.n).padStart(4)))
    .join('')
  const falta = l.falta === 0 ? '     ✅' : String(l.falta).padStart(7)
  console.log(l.tipo.padEnd(larg) + cels + String(l.total).padStart(7) + falta)
}

const totalAtividades = atividades.length
const totalFalta = linhas.reduce((s, l) => s + l.falta, 0)
const naCount = Object.keys(NAO_SE_APLICA).length

console.log('─'.repeat(cab.length))
console.log(
  `${totalAtividades} atividades · faltam ${totalFalta} para ${META}/faixa · ` +
  `${naCount} combinações são N/A de propósito`
)
console.log(
  '\n🔑 Se este total subiu e o do `npm run checar-ids` não, falta registrar o export novo\n' +
  '   em useAtividades.js / atividadesExtra.js / Dashboard.jsx / checar-ids-atividades.mjs.\n'
)
