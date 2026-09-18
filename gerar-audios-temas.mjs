/**
 * gerar-audios-temas.mjs — gera o áudio temático das atividades faladas (alfabeto,
 * formas, números, cores) com a voz Francisca.
 *
 * 🔑 A REGRA DE "QUAL ARQUIVO, QUAL TEXTO" NÃO MORA MAIS AQUI — mora em
 * `scripts/lib-fala.mjs`, junto com o detector de deriva, o regravador e os auditores.
 * Enquanto cada script tinha a sua cópia, elas divergiram três vezes e as três viraram
 * voz errada no ouvido da criança (queijo no `triangulino`, "undefined" nas cores,
 * `numeros` deslocado em um). Copiar a regra É o defeito.
 *
 * uso: node gerar-audios-temas.mjs
 */
import { execFileSync } from 'child_process'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { falasEsperadas, conferir } from './scripts/lib-fala.mjs'

const VOICE = 'pt-BR-FranciscaNeural'
const RATE = '-8%'
const CAMINHO_MANIFESTO = 'audio-manifesto.json'
const hashTexto = t => createHash('sha256').update(t, 'utf8').digest('hex').slice(0, 16)

const divergencias = conferir()
if (divergencias.length) {
  console.error('\n🔴 a regra de caminho não bate com o componente — não gero nada:')
  divergencias.forEach(d => console.error('   ', d))
  process.exit(1)
}

const falas = await falasEsperadas()

// 🔴 Fala vazia ou com "undefined" para ANTES de gravar: o mp3 sai dizendo a palavra
// "undefined" e nada no sistema acusa — foi assim por meses nas cores.
const comDefeito = falas.filter(f => f.defeito)
if (comDefeito.length) {
  console.error(`\n🔴 ${comDefeito.length} fala(s) com defeito no DADO — corrija o dado antes de gerar:`)
  comDefeito.slice(0, 10).forEach(f => console.error(`   ${f.caminho}: ${f.defeito}`))
  process.exit(1)
}

// O manifesto responde "já existe E veio deste texto?" — a pergunta que o sistema de
// arquivos não responde. Sem ele, "retomável" vira "mantém o áudio velho para sempre".
const manifesto = existsSync(CAMINHO_MANIFESTO)
  ? JSON.parse(readFileSync(CAMINHO_MANIFESTO, 'utf8'))
  : {}

const porTipo = {}
for (const f of falas) porTipo[f.tipo] = (porTipo[f.tipo] || 0) + 1
console.log(Object.entries(porTipo).map(([t, n]) => `${n} ${t}`).join(' | '))
console.log(`Gerando ${falas.length} áudios temáticos com a voz Francisca...`)

let ok = 0, pulados = 0
const falhas = []
for (const f of falas) {
  mkdirSync(f.pasta, { recursive: true })
  const destino = join(f.pasta, f.arquivo)
  // 🔴 NÃO PULE POR "O ARQUIVO EXISTE". Arquivo existir não diz NADA sobre o texto que
  // ele contém. Retomar é legítimo, mas a pergunta certa é "já existe E VEIO DESTE
  // TEXTO?" — quem responde isso é o manifesto, não o sistema de arquivos.
  if (existsSync(destino) && manifesto[f.caminho] === hashTexto(f.texto)) { ok++; pulados++; continue }
  try {
    execFileSync('python', ['-m', 'edge_tts', '-t', f.texto, '-v', VOICE, `--rate=${RATE}`, '--write-media', destino],
      { stdio: ['ignore', 'ignore', 'pipe'] })
    // 🔑 Gravou, ANOTA. A versão anterior lia o manifesto e nunca escrevia nele: todo
    // arquivo que ela gerava continuava "desconhecido" para o detector de deriva, e o
    // retomável não retomava nada. Manifesto só vale se quem grava o alimenta.
    manifesto[f.caminho] = hashTexto(f.texto)
    ok++
    if ((ok - pulados) % 10 === 0) process.stdout.write(`\r${ok}/${falas.length} ...`)
  } catch (e) {
    falhas.push(`${f.caminho}: ${e.stderr?.toString() || e.message}`)
  }
}

writeFileSync(CAMINHO_MANIFESTO, JSON.stringify(manifesto, null, 0), 'utf8')
console.log(`\n\nConcluído: ${ok}/${falas.length} áudios (${pulados} já conferiam com o manifesto).`)
if (falhas.length) {
  console.log(`${falhas.length} falha(s):`)
  falhas.slice(0, 10).forEach(f => console.log(' - ' + f))
  process.exitCode = 1
}
