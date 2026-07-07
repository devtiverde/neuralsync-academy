import { execFileSync } from 'child_process'
import { mkdirSync, existsSync } from 'fs'
import * as dataMod from './src/data/atividadesData.js'
import * as extraMod from './src/data/atividadesExtra.js'

const VOICE = 'pt-BR-FranciscaNeural'
const RATE = '-8%'

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

const all = { ...dataMod, ...extraMod }

// coleta todas as atividades de cada tipo, com override (dados.*) ou não
const buckets = { alfabeto: [], formas: [], numeros: [], cores: [] }
for (const val of Object.values(all)) {
  if (!val || typeof val !== 'object') continue
  for (const arr of Object.values(val)) {
    if (!Array.isArray(arr)) continue
    for (const at of arr) {
      if (at && at.tipo && buckets[at.tipo]) buckets[at.tipo].push(at)
    }
  }
}

const tarefas = []

// ── Alfabeto: texto = "{Letra}. {Palavra}." ──────────────────────────────────
for (const at of buckets.alfabeto) {
  if (!at.dados?.letras) continue // sem override -> já usa o arquivo padrão a-z.mp3
  for (const l of at.dados.letras) {
    tarefas.push({
      categoria: `alfabeto/_temas/${slug(at.id)}`,
      arquivo: l.letra.toLowerCase(),
      texto: `${l.letra}. ${l.palavra}.`,
    })
  }
}

// ── Formas: texto = "{Nome}. {Frase}" ────────────────────────────────────────
for (const at of buckets.formas) {
  if (!at.dados?.formas) continue
  for (const f of at.dados.formas) {
    tarefas.push({
      categoria: `formas/_temas/${slug(at.id)}`,
      arquivo: slug(f.id),
      texto: `${f.nome}. ${f.frase}`,
    })
  }
}

// ── Números: texto = word ─────────────────────────────────────────────────────
// chave por ÍNDICE (não por n): varias atividades reaproveitam o mesmo "n" pra
// entradas diferentes (frações com numerador 1, negativos e positivos, etc.)
for (const at of buckets.numeros) {
  if (!at.dados?.numeros) continue
  at.dados.numeros.forEach((n, idx) => {
    tarefas.push({
      categoria: `numeros/_temas/${slug(at.id)}`,
      arquivo: String(idx),
      texto: n.word,
    })
  })
}

// ── Cores: texto = "{Nome}. {Nome}, {exemplo}." ─────────────────────────────
for (const at of buckets.cores) {
  if (!at.dados?.cores) continue
  for (const c of at.dados.cores) {
    tarefas.push({
      categoria: `cores/_temas/${slug(at.id)}`,
      arquivo: slug(c.id),
      texto: `${c.nome}. ${c.nome}, ${c.exemplo}.`,
    })
  }
}

// dedup por caminho de destino (algumas atividades podem repetir item id+texto)
const vistos = new Set()
const unicos = tarefas.filter(t => {
  const chave = `${t.categoria}/${t.arquivo}`
  if (vistos.has(chave)) return false
  vistos.add(chave)
  return true
})

console.log(`${buckets.alfabeto.length} atividades alfabeto | ${buckets.formas.length} formas | ${buckets.numeros.length} numeros | ${buckets.cores.length} cores`)
console.log(`Gerando ${unicos.length} áudios temáticos com a voz Francisca...`)

let ok = 0, falhas = []
for (const t of unicos) {
  mkdirSync(`public/audio/${t.categoria}`, { recursive: true })
  const destino = `public/audio/${t.categoria}/${t.arquivo}.mp3`
  if (existsSync(destino)) { ok++; continue } // retomável — pula o que já existe
  try {
    execFileSync('python', [
      '-m', 'edge_tts',
      '-t', t.texto,
      '-v', VOICE,
      `--rate=${RATE}`,
      '--write-media', destino,
    ], { stdio: ['ignore', 'ignore', 'pipe'] })
    ok++
    if (ok % 10 === 0) process.stdout.write(`\r${ok}/${unicos.length} gerados...`)
  } catch (e) {
    falhas.push(`${t.categoria}/${t.arquivo}: ${e.stderr?.toString() || e.message}`)
  }
}

console.log(`\n\nConcluído: ${ok}/${unicos.length} áudios (gerados ou já existentes).`)
if (falhas.length) {
  console.log(`${falhas.length} falha(s):`)
  falhas.forEach(f => console.log(' - ' + f))
}
