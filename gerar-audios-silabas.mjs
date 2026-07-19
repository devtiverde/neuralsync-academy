// Gera os áudios das FICHAS DE SÍLABA da atividade Sílabas (voz Francisca, edge-tts).
//
// Por que este script existe:
// Até agora só a PALAVRA completa tinha gravação (`/audio/silabas/{id}.mp3`, gerada em
// `gerar-audios-francisca.mjs`). Cada ficha de sílaba individual caía no TTS do navegador,
// que lê sigla de 2 letras maiúsculas como abreviação de estado — "TO" virava "Tocantins",
// "PA" virava "Pará", "BA" virava "Bahia", "RO" virava "Rondônia". Bug reportado pelo usuário.
//
// Os textos são gerados em MINÚSCULA de propósito: em maiúscula o edge-tts também
// soletra algumas ("CA" → "cê-á", "SA" → "S.A."). Minúscula sai como sílaba de verdade.
//
// Idempotente: pula o que já existe. Rodar com `node gerar-audios-silabas.mjs`.

import { execFileSync } from 'child_process'
import { mkdirSync, existsSync } from 'fs'

const VOICE = 'pt-BR-FranciscaNeural'
const RATE = '-10%'
const DEST_DIR = 'public/audio/silabas/_fichas'

// lê as sílabas direto dos dados reais — assim novas atividades de sílaba
// entram automaticamente sem precisar editar este script
const { silabasExtraPorFaixa } = await import('./src/data/atividadesExtra.js')

const silabas = new Set()
for (const atividades of Object.values(silabasExtraPorFaixa)) {
  for (const atividade of atividades) {
    for (const palavra of atividade.dados?.palavras || []) {
      for (const silaba of palavra.silabas || []) {
        silabas.add(silaba.toLowerCase())
      }
    }
  }
}

const tarefas = [...silabas].sort()
console.log(`${tarefas.length} sílabas únicas encontradas nos dados.`)

mkdirSync(DEST_DIR, { recursive: true })

let gerados = 0, pulados = 0
const falhas = []

for (const silaba of tarefas) {
  const destino = `${DEST_DIR}/${silaba}.mp3`
  if (existsSync(destino)) { pulados++; continue }
  try {
    execFileSync('python', [
      '-m', 'edge_tts',
      '-t', silaba,
      '-v', VOICE,
      `--rate=${RATE}`,
      '--write-media', destino,
    ], { stdio: ['ignore', 'ignore', 'pipe'] })
    gerados++
    process.stdout.write(`\r${gerados} gerados, ${pulados} pulados...`)
  } catch (e) {
    falhas.push(`${silaba}: ${e.stderr?.toString() || e.message}`)
  }
}

console.log(`\n\nConcluído: ${gerados} gerados, ${pulados} já existiam.`)
if (falhas.length) {
  console.log(`${falhas.length} falha(s):`)
  falhas.forEach(f => console.log(' - ' + f))
  process.exit(1)
}
