/**
 * Acha card que mostraria a palavra "undefined" para a criança.
 *
 * POR QUE ISTO EXISTE
 * Relato do Cláudio (18/08/2026): "tem atividade que não tem áudio, ele fala undefined, nas
 * cores e frutas". Investigando: os 1.806 mp3 existem e nenhuma FALA sai com undefined — o
 * defeito está na TELA.
 *
 * `CoresAtividade` e `AlfabetoAtividade` guardam o card só pelo NÍVEL, sem conferir se o campo
 * existe:
 *     {nivel === 'medio'    && (<div>💡 {cor.funfato}</div>)}
 *     {nivel === 'avancado' && (<div>🔬 {cor.detalhe}</div>)}
 * Faltando o campo, o React escreve `undefined` dentro do card, com o emoji do lado.
 * `FormasAtividade` e `NumerosAtividade` fazem certo (`forma.funfato &&`, `numero.funfato &&`)
 * — a diferença entre os quatro é o que mostra que é descuido, não decisão.
 *
 * 🔑 Falha SILENCIOSA: dado válido, build limpo, lint limpo, layout perfeito. Só quem lê a
 * tela percebe. Nenhuma auditoria de layout ou de alcance pega isto.
 *
 * Uso: node scripts/auditar-texto-tela.mjs
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const carregar = rel => import(pathToFileURL(resolve(raiz, rel)).href)

// tipo → { chave dos itens, campo exigido por nível }.  Lido do JSX, não suposto.
const POR_NIVEL = {
  cores:    { chave: 'cores',  medio: 'funfato', avancado: 'detalhe' },
  alfabeto: { chave: 'letras', medio: 'funfato', avancado: 'detalhe' },
}
const nivelDe = id => (id.startsWith('cri_') || id.startsWith('inv_')) ? 'avancado'
  : id.startsWith('con_') ? 'medio' : 'basico'

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
  for (const v of Object.values(mod)) {
    if (!v || typeof v !== 'object' || Array.isArray(v)) continue
    if (vistos.has(v)) continue
    vistos.add(v)
    for (const f of FAIXAS) for (const a of v[f] || []) if (a?.id) todas.push({ ...a, faixa: f })
  }
}

const achados = []
let conferidas = 0
for (const a of todas) {
  const regra = POR_NIVEL[a.tipo]
  if (!regra) continue
  const nivel = nivelDe(a.id)
  if (nivel === 'basico') continue           // nessas faixas o card nem é renderizado
  const itens = a?.dados?.[regra.chave]
  if (!Array.isArray(itens)) continue        // usa a lista padrão, que é completa
  conferidas++
  const campo = regra[nivel]
  const sem = itens.filter(it => it?.[campo] === undefined || it?.[campo] === null || String(it?.[campo]).trim() === '')
  if (sem.length) {
    achados.push({
      id: a.id, tipo: a.tipo, nivel, campo,
      quantos: sem.length, de: itens.length,
      exemplo: sem[0]?.id ?? sem[0]?.letra ?? sem[0]?.nome ?? '?',
    })
  }
}

console.log(`\n${conferidas} atividades de cores/alfabeto em faixa que mostra o card`)
if (!achados.length) { console.log('✅ Nenhum card mostraria "undefined".\n'); process.exit(0) }

const totalItens = achados.reduce((s, x) => s + x.quantos, 0)
console.log(`\n🔴 ${totalItens} item(ns) em ${achados.length} atividade(s) mostram "undefined" na tela:\n`)
for (const x of achados) {
  console.log(`  ${x.id.padEnd(26)} ${x.nivel.padEnd(9)} sem "${x.campo}" em ${String(x.quantos).padStart(2)}/${x.de} itens · ex.: ${x.exemplo}`)
}
const porTipo = {}
for (const x of achados) porTipo[x.tipo] = (porTipo[x.tipo] || 0) + 1
console.log('\npor tipo:')
for (const [t, q] of Object.entries(porTipo)) console.log(`  ${t.padEnd(10)} ${q} atividade(s)`)
console.log('')
process.exit(1)
