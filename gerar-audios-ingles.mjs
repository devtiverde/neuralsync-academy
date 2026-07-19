// Gera os áudios de vocabulário de INGLÊS que faltam (voz en-US-AnaNeural, edge-tts).
//
// Por que existe: `gerar-audios-fase2.mjs` tem uma lista de 62 palavras HARDCODED, mas as
// 40 atividades de inglês em `atividadesData/Extra` cresceram muito além disso. As palavras
// não cobertas caíam no TTS do navegador silenciosamente (o player tem fallback no onerror).
//
// Este script lê o vocabulário DIRETO dos dados das atividades, então nunca mais diverge.
// Usa o MESMO slug do player (`InglesAtividade.jsx`) — underscore, não hífen.
//
// Idempotente: pula o que já existe. Rodar com `node gerar-audios-ingles.mjs`.

import { execFileSync } from 'child_process'
import { mkdirSync, existsSync } from 'fs'

const VOICE = 'en-US-AnaNeural'
const RATE = '-15%'
const DEST = 'public/audio/ingles'

// IDÊNTICO ao slug() de src/pages/atividades/InglesAtividade.jsx — se mudar lá, mudar aqui
function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
}

const mods = [
  await import('./src/data/atividadesData.js'),
  await import('./src/data/atividadesExtra.js'),
]

const atividades = []
for (const mod of mods) {
  for (const exportado of Object.values(mod)) {
    if (typeof exportado !== 'object' || !exportado) continue
    const arrays = Array.isArray(exportado) ? [exportado] : Object.values(exportado).filter(Array.isArray)
    for (const arr of arrays) for (const at of arr) if (at?.id && at?.tipo) atividades.push(at)
  }
}

// `vocab` às vezes é array, às vezes objeto agrupado por categoria — aceitar os dois
const termos = new Set()
for (const at of atividades.filter(a => a.tipo === 'ingles')) {
  for (const chave of ['vocab', 'flashcards', 'cards']) {
    const valor = at.dados?.[chave]
    if (!valor) continue
    const itens = Array.isArray(valor)
      ? valor
      : Object.values(valor).filter(Array.isArray).flat()
    for (const item of itens) {
      const en = item.en || item.palavra || item.word
      if (en) termos.add(en)
    }
  }
}

const tarefas = [...termos].sort()
console.log(`${tarefas.length} termos de inglês únicos encontrados nos dados.`)

mkdirSync(DEST, { recursive: true })

let gerados = 0, pulados = 0
const falhas = []

for (const termo of tarefas) {
  const destino = `${DEST}/${slug(termo)}.mp3`
  if (existsSync(destino)) { pulados++; continue }
  try {
    execFileSync('python', [
      '-m', 'edge_tts', '-t', termo, '-v', VOICE, `--rate=${RATE}`, '--write-media', destino,
    ], { stdio: ['ignore', 'ignore', 'pipe'] })
    gerados++
    process.stdout.write(`\r${gerados} gerados, ${pulados} pulados...`)
  } catch (e) {
    falhas.push(`${termo}: ${e.stderr?.toString() || e.message}`)
  }
}

console.log(`\n\nConcluído: ${gerados} gerados, ${pulados} já existiam.`)
if (falhas.length) {
  console.log(`${falhas.length} falha(s):`)
  falhas.forEach(f => console.log(' - ' + f))
}
