// Gera as narrações das histórias ilustradas do Kids TV (voz Francisca, edge-tts).
//
// ⚠️ Estas gravações são PROVISÓRIAS. A intenção é substituí-las pelas narrações feitas no
// painel de IA da GoTo (voz mais expressiva pra narrativa longa — a Francisca fica monótona
// em texto de história). O guia de gravação usa exatamente estes mesmos nomes de arquivo,
// então basta sobrescrever `{categoria}/{n}.mp3` que o app passa a tocar a versão nova.
//
// Idempotente: pula o que já existe. Pra REGERAR, apague a pasta antes.
// Rodar com `node gerar-audios-kids-storias.mjs`.

import { execFileSync } from 'child_process'
import { mkdirSync, existsSync } from 'fs'

const VOICE = 'pt-BR-FranciscaNeural'
const RATE = '-8%'   // mesmo ritmo usado nas histórias interativas (gerar-audios-fase2.mjs)
const DEST = 'public/audio/kids-storias'

const { kidsStorias } = await import('./src/data/kidsStorias.js')

const tarefas = []
for (const [categoria, historia] of Object.entries(kidsStorias)) {
  // o player monta o caminho como `${categoria}/${cenaAtiva + 1}.mp3` — 1-indexado
  historia.cenas?.forEach((cena, i) => {
    tarefas.push({ categoria, arquivo: String(i + 1), texto: cena.texto })
  })
}

console.log(`${tarefas.length} narrações de cena em ${Object.keys(kidsStorias).length} histórias.`)

let gerados = 0, pulados = 0
const falhas = []

for (const t of tarefas) {
  mkdirSync(`${DEST}/${t.categoria}`, { recursive: true })
  const destino = `${DEST}/${t.categoria}/${t.arquivo}.mp3`
  if (existsSync(destino)) { pulados++; continue }
  try {
    execFileSync('python', [
      '-m', 'edge_tts', '-t', t.texto, '-v', VOICE, `--rate=${RATE}`, '--write-media', destino,
    ], { stdio: ['ignore', 'ignore', 'pipe'] })
    gerados++
    process.stdout.write(`\r${gerados} gerados, ${pulados} pulados...`)
  } catch (e) {
    falhas.push(`${t.categoria}/${t.arquivo}: ${e.stderr?.toString() || e.message}`)
  }
}

console.log(`\n\nConcluído: ${gerados} gerados, ${pulados} já existiam.`)
if (falhas.length) {
  console.log(`${falhas.length} falha(s):`)
  falhas.forEach(f => console.log(' - ' + f))
}
