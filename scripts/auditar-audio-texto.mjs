/**
 * Acha atividade cujo TTS falaria "undefined" para a criança.
 *
 * POR QUE ISTO EXISTE
 * Relato do Cláudio (18/08/2026): "tem atividade que não tem áudio, ele fala UNDEFINED, nas
 * cores, frutas etc". A causa é sempre a mesma forma: o componente monta a frase por template
 * string com um campo do dado, e quando o campo NÃO EXISTE o template não quebra — ele escreve
 * a palavra `undefined` no meio da frase, e o `speechSynthesis` lê aquilo em voz alta.
 *
 *   CoresAtividade:  `${cor.nome}. ${cor.nome}, ${cor.exemplo}.`   ← sem `exemplo` vira
 *                    "Vermelho. Vermelho, undefined."
 *
 * 🔑 Falha SILENCIOSA em toda a cadeia: o dado é válido, o build passa, o lint passa, a tela
 * desenha certo, e só quem está ouvindo percebe. Nenhuma auditoria de layout pega isso.
 *
 * O script varre as 528 atividades e confere, para cada tipo com áudio, se os itens têm os
 * campos que a frase daquele componente usa. Os campos foram lidos do código, não supostos —
 * ao mexer no template de um componente, atualizar a tabela CAMPOS aqui.
 *
 * Uso: node scripts/auditar-audio-texto.mjs
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const carregar = rel => import(pathToFileURL(resolve(raiz, rel)).href)

// tipo → { chave: onde ficam os itens em `atividade.dados`, campos: usados na frase falada }
const CAMPOS = {
  cores:    { chave: 'cores',    campos: ['nome', 'exemplo'], molde: '${nome}. ${nome}, ${exemplo}.' },
  formas:   { chave: 'formas',   campos: ['nome', 'frase'],   molde: '${nome}. ${frase}' },
  numeros:  { chave: 'numeros',  campos: ['word'],            molde: '${word}' },
  alfabeto: { chave: 'letras',   campos: ['letra', 'palavra'], molde: '${letra}. ${palavra}.' },
  silabas:  { chave: 'palavras', campos: ['palavra'],         molde: '${palavra}' },
}

const mods = await Promise.all([
  carregar('src/data/atividadesData.js'),
  carregar('src/data/atividadesExtra.js'),
  carregar('src/data/colorirExtra2.js'),
  carregar('src/data/musicaExtra.js'),
])

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const todas = []
for (const mod of mods) {
  const vistos = new Set()
  for (const valor of Object.values(mod)) {
    if (!valor || typeof valor !== 'object' || Array.isArray(valor)) continue
    if (vistos.has(valor)) continue
    vistos.add(valor)
    for (const f of FAIXAS) for (const a of valor[f] || []) if (a?.id) todas.push({ ...a, faixa: f })
  }
}

const achados = []
let itensConferidos = 0
let atividadesComDados = 0

for (const a of todas) {
  const regra = CAMPOS[a.tipo]
  if (!regra) continue
  const itens = a?.dados?.[regra.chave]
  // Sem `dados` a atividade usa a lista PADRÃO embutida no componente, que é completa.
  if (!Array.isArray(itens)) continue
  atividadesComDados++
  itens.forEach((item, i) => {
    itensConferidos++
    const faltando = regra.campos.filter(c => item?.[c] === undefined || item?.[c] === null || item?.[c] === '')
    if (faltando.length) {
      achados.push({
        id: a.id, faixa: a.faixa, tipo: a.tipo, indice: i,
        itemId: item?.id ?? item?.letra ?? item?.nome ?? `#${i}`,
        faltando,
        fraseQueSairia: regra.campos.map(c => item?.[c] === undefined ? 'undefined' : item[c]).join(' · '),
      })
    }
  })
}

console.log(`\n${todas.length} atividades · ${atividadesComDados} com dados próprios de áudio · ${itensConferidos} itens conferidos\n`)

if (!achados.length) {
  console.log('✅ Nenhum item falaria "undefined".\n')
  process.exit(0)
}

const porAtividade = new Map()
for (const x of achados) {
  if (!porAtividade.has(x.id)) porAtividade.set(x.id, [])
  porAtividade.get(x.id).push(x)
}

console.log(`🔴 ${achados.length} item(ns) em ${porAtividade.size} atividade(s) falariam "undefined":\n`)
const porTipo = {}
for (const [id, itens] of porAtividade) {
  const t = itens[0].tipo
  porTipo[t] = (porTipo[t] || 0) + 1
  const campos = [...new Set(itens.flatMap(i => i.faltando))].join(', ')
  console.log(`  ${id.padEnd(28)} ${String(itens.length).padStart(2)} item(ns) sem: ${campos}`)
  console.log(`      ex.: "${itens[0].itemId}" → falaria "${itens[0].fraseQueSairia}"`)
}
console.log('\npor tipo:')
for (const [t, n] of Object.entries(porTipo).sort((a, b) => b[1] - a[1])) console.log(`  ${t.padEnd(10)} ${n} atividade(s)`)
console.log('')
process.exit(1)
