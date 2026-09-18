/**
 * auditar-audio-numeros.mjs — a criança clica no número e ouve O QUÊ?
 *
 * 🔑 A PERGUNTA QUE NENHUM AUDITOR ANTERIOR FAZIA.
 * - `auditar-audio-arquivos.mjs` procurava o arquivo de `numeros` pelo campo `n`
 *   (`arquivo: it => it.n`). O app pede pelo ÍNDICE. O instrumento perguntava por um
 *   nome que o app nunca pede, achava, e dizia "✅ todos existem".
 * - `audios-deriva.mjs` compara o hash do texto de hoje com o MANIFESTO. Manifesto é
 *   promessa: se quem gravou anotou outra coisa, ele repete a mentira com confiança.
 * - `auditar-audio-orfao.mjs` acha arquivo que sobra — pega o sintoma, não o conteúdo.
 *
 * Aqui a pergunta é a do dedo da criança: para o índice N, o arquivo existe E ele fala a
 * palavra do item N? A resposta vem de MEDIR a onda (ver `lib-onda.mjs`), porque para
 * palavra curta o tamanho em bytes satura e não distingue "Um" de "Sete".
 *
 * uso:
 *   node scripts/auditar-audio-numeros.mjs              # estrutura (rápido, sem rede)
 *   node scripts/auditar-audio-numeros.mjs --ouvir      # + mede a onda de TODOS
 *   node scripts/auditar-audio-numeros.mjs --ouvir --so exp_numeros_frutas
 *   node scripts/auditar-audio-numeros.mjs --ouvir --amostra 3   # 3 índices por atividade
 */
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { onda, semelhanca, gravar, pastaTemp, autoteste } from './lib-onda.mjs'

const args = process.argv.slice(2)
const ouvir = args.includes('--ouvir')
const so = args.includes('--so') ? args[args.indexOf('--so') + 1] : null
const amostra = args.includes('--amostra') ? Number(args[args.indexOf('--amostra') + 1]) : 0
// 🔑 Os números medidos são bimodais e a separação é enorme: mesma fala fica entre 0,94 e
// 1,00 (0,94 quando o mp3 foi codificado por uma versão mais velha do edge-tts), fala
// diferente fica abaixo de 0,10. 0,90 cai no vazio entre as duas nuvens. Não é um limiar
// afrouxado para o teste passar: é onde a medição mostrou que não há ninguém.
const LIMIAR = 0.90
// Só acuso um culpado quando o candidato realmente casa. Sem isto o relatório dizia
// "na verdade fala VII." com semelhança 0,066 — que não é semelhança, é ruído.
const LIMIAR_CULPADO = 0.90

const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const todas = []
for (const f of FAIXAS) {
  const m = await import(`../src/data/extra/${f}.js`)
  for (const v of Object.values(m)) if (Array.isArray(v)) todas.push(...v)
}
const base = await import('../src/data/atividadesData.js')
for (const v of Object.values(base)) {
  const listas = Array.isArray(v) ? [v] : (v && typeof v === 'object' ? Object.values(v) : [])
  for (const l of listas) if (Array.isArray(l)) todas.push(...l)
}
const vistos = new Set()
const atividades = todas
  .filter(a => a?.tipo === 'numeros' && a?.id && !vistos.has(a.id) && vistos.add(a.id))
  .filter(a => Array.isArray(a?.dados?.numeros))
  .filter(a => !so || a.id === so)

if (!atividades.length) { console.error(so ? `não achei a atividade ${so}` : 'nenhuma atividade de numeros com dados'); process.exit(1) }

// ── 1. ESTRUTURA: o arquivo que o app pede existe? sobra alguém? ──────────────
const problemas = { falta: [], orfao: [], semPalavra: [], conteudo: [] }
let esperadosTotal = 0

for (const a of atividades) {
  const itens = a.dados.numeros
  const pasta = join('public', 'audio', 'numeros', '_temas', slug(a.id))
  const noDisco = existsSync(pasta) ? readdirSync(pasta).filter(f => f.endsWith('.mp3')) : []
  const esperados = new Set()
  itens.forEach((it, i) => {
    esperadosTotal++
    esperados.add(`${i}.mp3`)
    const palavra = String(it?.word ?? '').trim()
    if (!palavra) problemas.semPalavra.push(`${a.id}[${i}]`)
    if (!noDisco.includes(`${i}.mp3`)) problemas.falta.push({ id: a.id, idx: i, palavra, pasta })
  })
  for (const f of noDisco) if (!esperados.has(f)) problemas.orfao.push(join(pasta, f))
}

console.log(`\n🔢 ${atividades.length} atividades de \`numeros\` com áudio próprio · ${esperadosTotal} falas esperadas`)
console.log(`   ${problemas.falta.length} arquivo(s) que o app PEDE e não existe (cai no TTS robótico)`)
console.log(`   ${problemas.orfao.length} arquivo(s) órfão(s) que ninguém pede`)
if (problemas.semPalavra.length) console.log(`   🔴 ${problemas.semPalavra.length} item(ns) SEM \`word\` — falaria "undefined"`)

if (!ouvir) {
  if (problemas.falta.length) {
    console.log(`\n   exemplos do que falta:`)
    problemas.falta.slice(0, 6).forEach(f => console.log(`     ${f.id} índice ${f.idx} ("${f.palavra}") → ${f.pasta}/${f.idx}.mp3`))
  }
  console.log(`\n(estrutura apenas — rode com --ouvir para MEDIR o que cada arquivo fala)`)
  process.exit(problemas.falta.length || problemas.orfao.length || problemas.semPalavra.length ? 1 : 0)
}

// ── 2. CONTEÚDO: o arquivo fala a palavra certa? ─────────────────────────────
console.log(`\n🎧 medindo a onda (o tamanho em bytes satura em palavra curta e não serve)`)
autoteste()

const t = pastaTemp()
const cache = new Map()
const gravado = texto => {
  if (!cache.has(texto)) {
    const destino = join(t.caminho, `c${cache.size}.mp3`)
    gravar(texto, destino)
    cache.set(texto, onda(destino))
  }
  return cache.get(texto)
}

let medidos = 0, ok = 0
try {
  for (const a of atividades) {
    const itens = a.dados.numeros
    const pasta = join('public', 'audio', 'numeros', '_temas', slug(a.id))
    let indices = itens.map((_, i) => i)
    if (amostra > 0) indices = indices.filter(i => i < amostra || i === itens.length - 1)
    for (const i of indices) {
      const arquivo = join(pasta, `${i}.mp3`)
      if (!existsSync(arquivo) || statSync(arquivo).size === 0) continue
      const palavra = String(itens[i]?.word ?? '').trim()
      if (!palavra) continue
      medidos++
      const nota = semelhanca(onda(arquivo), gravado(palavra))
      if (nota >= LIMIAR) { ok++; continue }
      // Não bate. Quem está aí dentro? Testa as outras palavras DA MESMA atividade e o
      // formato antigo (`display.`), que foi o que a regravação de 03/08 gravou.
      let culpado = null, melhor = nota
      for (let j = 0; j < itens.length; j++) {
        if (j === i) continue
        const p = String(itens[j]?.word ?? '').trim()
        if (!p) continue
        const n2 = semelhanca(onda(arquivo), gravado(p))
        if (n2 > melhor) { melhor = n2; culpado = `a palavra do índice ${j} ("${p}")` }
      }
      const antigo = `${itens[i]?.display ?? itens[i]?.n}.`
      const n3 = semelhanca(onda(arquivo), gravado(antigo))
      if (n3 > melhor) { melhor = n3; culpado = `o formato antigo "${antigo}"` }
      if (melhor < LIMIAR_CULPADO) culpado = null
      problemas.conteudo.push({ id: a.id, idx: i, esperado: palavra, nota, culpado, melhor })
      console.log(`  🔴 ${a.id} índice ${i}: devia falar "${palavra}" (${nota.toFixed(3)})` +
        (culpado ? ` — na verdade fala ${culpado} (${melhor.toFixed(3)})` : ` — fala outra coisa, que não está entre os candidatos`))
    }
  }
} finally { t.apagar() }

console.log(`\n${ok} de ${medidos} falas conferidas dizem a palavra certa`)
const ruim = problemas.falta.length + problemas.orfao.length + problemas.conteudo.length + problemas.semPalavra.length
if (!ruim) console.log('✅ nenhuma divergência.')
process.exit(ruim ? 1 : 0)
