/**
 * sondar-texto-audio.mjs — descobre QUAL texto um mp3 contém, sem ouvir.
 *
 * 🔑 O método: regravar o mesmo texto com a MESMA voz e a MESMA velocidade e comparar o
 * TAMANHO. Dentro da mesma versão do edge-tts, texto igual dá tamanho igual. Se o
 * arquivo no disco bate com o texto A e não com o texto B, ele contém A.
 * 🪤 Reproduzir TODOS os parâmetros do gerador — esquecer o `--rate` mistura duas
 * variáveis e a comparação passa a não dizer nada.
 * 🪤 Fala curta satura num piso (10.656 na versão de agosto) e aí o tamanho não
 * distingue mais nada: este método só vale para frases.
 *
 * 🔴 E ESSA RESSALVA JÁ CUSTOU CARO. Em `numeros` o texto é UMA PALAVRA: "Um", "Dois" e
 * "Quatro" saem todos com exatamente 11.232 bytes. Enquanto a prova disponível era o
 * tamanho, 165 falas erradas eram indistinguíveis das certas — e ficaram no ar.
 * Para palavra curta, use o sucessor, que compara a ONDA decodificada e separa as duas
 * nuvens com folga (mesmo texto 1,0000 · texto diferente ≈ 0,00):
 *     node scripts/auditar-audio-onda.mjs --tipo <tipo> --ouvir
 * Ver `scripts/lib-onda.mjs`. Este aqui continua útil para frase e não precisa de ffmpeg.
 *
 * Existe porque o detector de deriva NÃO pega este caso: ele compara o hash do texto de
 * hoje com o que está no MANIFESTO, e o manifesto pode ter sido escrito para um arquivo
 * que nunca foi regravado. Manifesto é promessa; isto aqui é medida.
 *
 * uso: node scripts/sondar-texto-audio.mjs <caminho.mp3> "texto candidato 1" "candidato 2" ...
 */
import { statSync, existsSync, unlinkSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const [arquivo, ...candidatos] = process.argv.slice(2)
if (!arquivo || !candidatos.length) {
  console.error('uso: node scripts/sondar-texto-audio.mjs <mp3> "texto 1" "texto 2" ...')
  process.exit(1)
}
if (!existsSync(arquivo)) { console.error(`não achei ${arquivo}`); process.exit(1) }

const VOZ = 'pt-BR-FranciscaNeural'
const RATE = '-8%'
const alvo = statSync(arquivo).size

console.log(`\n🔍 ${arquivo}`)
console.log(`   tamanho no disco: ${alvo} bytes\n`)
if (alvo <= 11000) {
  console.log('   ⚠️  fala curta demais: o gerador satura num piso e o tamanho não distingue textos.\n')
}

let melhor = null
for (const texto of candidatos) {
  const tmp = join(tmpdir(), `sonda-${Date.now()}-${Math.random().toString(36).slice(2)}.mp3`)
  try {
    execFileSync('python', ['-m', 'edge_tts', '-t', texto, '-v', VOZ, `--rate=${RATE}`, '--write-media', tmp], { stdio: 'pipe' })
    const n = statSync(tmp).size
    const dif = Math.abs(n - alvo)
    const marca = dif === 0 ? '  ← É ESTE' : dif < alvo * 0.02 ? '  ← quase' : ''
    console.log(`   ${String(n).padStart(6)} bytes  (${dif === 0 ? 'igual' : (n > alvo ? '+' : '-') + dif})  "${texto}"${marca}`)
    if (!melhor || dif < melhor.dif) melhor = { texto, dif }
    unlinkSync(tmp)
  } catch (e) {
    console.log(`   ERRO ao gravar "${texto}": ${String(e.message).slice(0, 50)}`)
  }
}
console.log(`\n   mais próximo: "${melhor?.texto}" (diferença de ${melhor?.dif} bytes)\n`)
