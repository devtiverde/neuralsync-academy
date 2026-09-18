/**
 * Detecta e conserta a DERIVA dos áudios gerados.
 *
 * O PROBLEMA, encontrado em 03/08/2026
 * O `gerar-audios-temas.mjs` pula o que já existe: `if (existsSync(destino)) continue`,
 * comentado como "retomável". Só que **o arquivo existir não diz nada sobre o texto que
 * ele contém**. Quando o texto de um item muda, o áudio antigo fica congelado para
 * sempre, narrando o conteúdo antigo, e nada acusa.
 *
 * Foi assim que o item `triangulino` ("Triângulo — instrumento musical") passou a narrar
 * algo sobre QUEIJO: a data mudou depois da geração. E teria sido assim com a letra Y,
 * cuja palavra era "Iogurte" (que nem tem Y) e foi corrigida para "Yoga" hoje.
 *
 * A SAÍDA
 * Um manifesto que guarda, para cada arquivo, o **hash do texto que o gerou**. Aí
 * "pular o que já existe" vira "pular o que já existe E veio deste mesmo texto". Texto
 * mudou → hash muda → o áudio é refeito. Ativo gerado deixa de envelhecer em silêncio.
 *
 * Uso:
 *   node scripts/audios-deriva.mjs              → relatório (não grava nada)
 *   node scripts/audios-deriva.mjs --gravar     → regenera o que falta ou derivou
 *   node scripts/audios-deriva.mjs --verificar  → só confere; sai 1 se houver deriva
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { falasEsperadas, conferir, slug } from './lib-fala.mjs'

const divergencias = conferir()
if (divergencias.length) {
  console.error('\n🔴 a regra de caminho não bate mais com o componente:')
  divergencias.forEach(d => console.error('   ', d))
  process.exit(1)
}

const raiz = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..')
const p = rel => resolve(raiz, rel)

const VOZ = 'pt-BR-FranciscaNeural'
const RITMO = '-8%'
const MANIFESTO = p('audio-manifesto.json')

const GRAVAR = process.argv.includes('--gravar')
const VERIFICAR = process.argv.includes('--verificar')

const hash = t => createHash('sha256').update(t, 'utf8').digest('hex').slice(0, 16)

// ── o que DEVERIA existir, derivado do dado de hoje ─────────────────────────────
// 🔑 A REGRA NÃO MORA MAIS AQUI. Ela mora em `lib-fala.mjs`, e isto não é arrumação:
// a versão anterior deste bloco dizia seguir "as mesmas regras do gerador" e não seguia.
// Ela nomeava o arquivo de `numeros` pelo NÚMERO (`n`) quando o app pede pelo ÍNDICE, e
// montava a frase das cores com `${c.frase}`, campo que não existe no dado (é `exemplo`).
// Rodar este script com `--gravar` foi o que, em 03/08, gravou "1." no arquivo do índice
// 1 — a criança clicava no 2 e ouvia "um" — e o que pôs "undefined" na fala das cores.
// Um detector que carrega a regra errada não detecta: ele PROPAGA.
const esperados = (await falasEsperadas()).map(f => ({ caminho: f.caminho, texto: f.texto, defeito: f.defeito }))
const juntar = (caminho, texto) => esperados.push({ caminho, texto })

const comDefeito = esperados.filter(e => e.defeito)
if (comDefeito.length) {
  console.error(`
🔴 ${comDefeito.length} fala(s) com defeito no DADO — corrija o dado antes de gravar:`)
  comDefeito.slice(0, 10).forEach(e => console.error(`   ${e.caminho}: ${e.defeito}`))
  process.exit(1)
}

// A lista PADRÃO do alfabeto mora dentro do componente, não nos dados — e foi
// justamente ali que estava o erro do Y. Precisa entrar na conferência.
const comp = readFileSync(p('src/pages/atividades/AlfabetoAtividade.jsx'), 'utf8')
const bloco = comp.match(/const LETRAS = \[([\s\S]*?)\n\]/)
if (bloco) {
  for (const [, letra, palavra] of bloco[1].matchAll(/letra: '([^']+)',\s*palavra: '([^']+)'/g)) {
    juntar(`alfabeto/${letra.toLowerCase()}.mp3`, `${letra}.`)
    juntar(`alfabeto/${letra.toLowerCase()}-palavra.mp3`, `${palavra}.`)
  }
}

// dedup por destino
const porCaminho = new Map()
for (const e of esperados) if (!porCaminho.has(e.caminho)) porCaminho.set(e.caminho, e.texto)

// ── comparar com o manifesto ────────────────────────────────────────────────────
const manifesto = existsSync(MANIFESTO) ? JSON.parse(readFileSync(MANIFESTO, 'utf8')) : {}
const semManifesto = !existsSync(MANIFESTO)

const ausentes = [], derivados = [], desconhecidos = [], iguais = []
for (const [caminho, texto] of porCaminho) {
  const arquivo = p(`public/audio/${caminho}`)
  if (!existsSync(arquivo)) { ausentes.push({ caminho, texto }); continue }
  const registrado = manifesto[caminho]
  if (!registrado) desconhecidos.push({ caminho, texto })
  else if (registrado !== hash(texto)) derivados.push({ caminho, texto })
  else iguais.push(caminho)
}

console.log(`${porCaminho.size} áudios esperados pelo dado de hoje`)
console.log(`  ✅ conferem com o manifesto: ${iguais.length}`)
console.log(`  ❓ sem registro no manifesto: ${desconhecidos.length}${semManifesto ? '  (manifesto ainda não existe — 1ª execução)' : ''}`)
console.log(`  ⬜ ausentes no disco:         ${ausentes.length}`)
console.log(`  🔴 DERIVADOS (texto mudou):   ${derivados.length}`)

for (const d of derivados.slice(0, 15)) console.log(`     · ${d.caminho} → agora deveria dizer "${d.texto}"`)
if (derivados.length > 15) console.log(`     … e mais ${derivados.length - 15}`)

if (VERIFICAR) {
  // Só reprova por deriva de verdade. "Desconhecido" na primeira execução não é
  // defeito do conteúdo — é o manifesto que ainda não nasceu, e reprovar aí
  // treinaria todo mundo a ignorar este aviso.
  if (derivados.length || ausentes.length) {
    console.error(`\n❌ ${derivados.length} áudio(s) narrando texto velho e ${ausentes.length} faltando.`)
    console.error('   Conserto: npm run audios-deriva -- --gravar\n')
    process.exit(1)
  }
  console.log('\n✅ Nenhum áudio derivado ou faltando.')
  process.exit(0)
}

if (!GRAVAR) {
  console.log('\n(relatório apenas — use --gravar para regenerar)')
  process.exit(derivados.length ? 1 : 0)
}

// ── regravar ────────────────────────────────────────────────────────────────────
// Os "desconhecidos" entram: sem saber de que texto vieram, a única forma de garantir
// que o áudio bate com a tela é refazer. É caro uma vez só; depois disso o manifesto
// responde sem custo.
const refazer = [...ausentes, ...derivados, ...desconhecidos]
console.log(`\nRegravando ${refazer.length} áudios com a voz Francisca...`)

let ok = 0
const falhas = []
for (const t of refazer) {
  const destino = p(`public/audio/${t.caminho}`)
  mkdirSync(dirname(destino), { recursive: true })
  try {
    execFileSync('python', ['-m', 'edge_tts', '-t', t.texto, '-v', VOZ, `--rate=${RITMO}`, '--write-media', destino],
      { stdio: ['ignore', 'ignore', 'pipe'] })
    manifesto[t.caminho] = hash(t.texto)
    ok++
    if (ok % 25 === 0) {
      process.stdout.write(`\r  ${ok}/${refazer.length}...`)
      // grava de tempos em tempos: queda de rede no meio não pode custar tudo
      writeFileSync(MANIFESTO, JSON.stringify(manifesto, null, 1))
    }
  } catch (e) {
    falhas.push(`${t.caminho}: ${(e.stderr?.toString() || e.message).slice(0, 120)}`)
  }
}
// registra também os que já conferiam, para o manifesto ficar completo
for (const c of iguais) manifesto[c] = hash(porCaminho.get(c))
writeFileSync(MANIFESTO, JSON.stringify(manifesto, null, 1))

console.log(`\n\n✅ ${ok} regravados · manifesto com ${Object.keys(manifesto).length} entradas`)
if (falhas.length) {
  console.log(`❌ ${falhas.length} falharam:`)
  for (const f of falhas.slice(0, 10)) console.log(`   ${f}`)
  process.exit(1)
}
