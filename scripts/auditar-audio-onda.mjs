/**
 * auditar-audio-onda.mjs — a criança clica e ouve O QUÊ?
 *
 * 🔑 A PERGUNTA QUE NENHUM AUDITOR ANTERIOR FAZIA. Os que existiam perguntavam:
 * - `auditar-audio-arquivos.mjs`: "o arquivo existe?" — e por meses procurou o nome
 *   errado em `numeros` (pelo `n`, não pelo índice), respondendo "✅ todos existem"
 *   enquanto a criança clicava no 2 e ouvia "um".
 * - `audios-deriva.mjs`: "o hash do texto bate com o MANIFESTO?" — manifesto é promessa;
 *   se quem gravou anotou outra coisa, ele repete a mentira com confiança.
 * - `auditar-audio-orfao.mjs`: "sobra arquivo?" — pega o sintoma, não o conteúdo.
 *
 * Aqui a resposta vem de MEDIR o que está gravado: grava o texto esperado com a mesma
 * voz e velocidade e compara a ONDA decodificada (`lib-onda.mjs`). Não serve o método do
 * TAMANHO (`sondar-texto-audio.mjs`): "Um", "Dois" e "Quatro" saem todos com 11.232 bytes.
 *
 * uso:
 *   node scripts/auditar-audio-onda.mjs --tipo numeros            # estrutura, sem rede
 *   node scripts/auditar-audio-onda.mjs --tipo numeros --ouvir    # mede TODAS
 *   node scripts/auditar-audio-onda.mjs --tipo alfabeto --ouvir --amostra 3
 *   node scripts/auditar-audio-onda.mjs --tipo cores --ouvir --so exp_cores_arcoiris
 */
import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { onda, semelhanca, gravar, pastaTemp, autoteste } from './lib-onda.mjs'
import { falasEsperadas, conferir, REGRAS } from './lib-fala.mjs'

const args = process.argv.slice(2)
const tipo = args.includes('--tipo') ? args[args.indexOf('--tipo') + 1] : null
const ouvir = args.includes('--ouvir')
const so = args.includes('--so') ? args[args.indexOf('--so') + 1] : null
const amostra = args.includes('--amostra') ? Number(args[args.indexOf('--amostra') + 1]) : 0

if (!tipo || !REGRAS[tipo]) {
  console.error(`uso: node scripts/auditar-audio-onda.mjs --tipo <${Object.keys(REGRAS).join('|')}> [--ouvir] [--amostra N] [--so <id>]`)
  process.exit(1)
}

// 🔑 Os números medidos são bimodais e a separação é enorme: mesma fala fica entre 0,94 e
// 1,00 (0,94 quando o mp3 foi codificado por uma versão mais velha do edge-tts), fala
// diferente fica abaixo de 0,10. 0,90 cai no vazio entre as duas nuvens. Não é limiar
// afrouxado para o teste passar: é onde a medição mostrou que não há ninguém.
const LIMIAR = 0.90

const divergencias = conferir()
if (divergencias.length) {
  console.error('\n🔴 a regra de caminho não bate com o componente — eu mediria o alvo errado:')
  divergencias.forEach(d => console.error('   ', d))
  process.exit(1)
}

let falas = await falasEsperadas([tipo])
if (so) falas = falas.filter(f => f.atividade === so)
if (!falas.length) { console.error(so ? `não achei falas de ${so}` : `nenhuma fala de ${tipo}`); process.exit(1) }

const atividades = [...new Set(falas.map(f => f.atividade))]

// ── 1. ESTRUTURA ─────────────────────────────────────────────────────────────
const faltando = falas.filter(f => !existsSync(join(f.pasta, f.arquivo)))
const semTexto = falas.filter(f => f.defeito)

console.log(`\n🔊 ${tipo}: ${atividades.length} atividades · ${falas.length} falas esperadas`)
console.log(`   ${faltando.length} arquivo(s) que o app PEDE e não existe (cai no TTS robótico)`)
if (semTexto.length) console.log(`   🔴 ${semTexto.length} fala(s) com defeito no dado — falariam "undefined"`)

if (!ouvir) {
  faltando.slice(0, 6).forEach(f => console.log(`     falta ${f.pasta}/${f.arquivo} ("${f.texto}")`))
  console.log(`\n(estrutura apenas — rode com --ouvir para MEDIR o que cada arquivo fala)`)
  process.exit(faltando.length || semTexto.length ? 1 : 0)
}

// ── 2. CONTEÚDO ──────────────────────────────────────────────────────────────
console.log(`\n🎧 medindo a onda (o tamanho em bytes satura em palavra curta e não serve)`)
autoteste()

// Amostra: as N primeiras de cada atividade mais a última. Serve para defeito
// SISTEMÁTICO (o mesmo gerador errado para todo mundo), que é o caso desta família.
// 🪤 Não serve para defeito pontual em uma fala específica — para isso, rodar inteiro.
let alvo = falas
if (amostra > 0) {
  alvo = []
  for (const a of atividades) {
    const daAtiv = falas.filter(f => f.atividade === a)
    alvo.push(...daAtiv.slice(0, amostra), ...(daAtiv.length > amostra ? [daAtiv[daAtiv.length - 1]] : []))
  }
  alvo = [...new Set(alvo)]
  console.log(`   amostra: ${alvo.length} de ${falas.length} falas (${amostra} por atividade + a última)`)
}

const t = pastaTemp()
const cache = new Map()
const gravado = texto => {
  if (!cache.has(texto)) {
    const destino = join(t.caminho, `c${cache.size}.mp3`)
    // `null` = o controle não veio (falha de rede). Guardo o null no cache para não
    // tentar de novo a mesma fala, e quem usa trata como NÃO MEDIDO.
    cache.set(texto, gravar(texto, destino) ? onda(destino) : null)
  }
  return cache.get(texto)
}

let medidos = 0, ok = 0, pior = 1
const naoMedidos = []
const errados = []
try {
  for (const f of alvo) {
    const arquivo = join(f.pasta, f.arquivo)
    if (!existsSync(arquivo) || statSync(arquivo).size === 0) continue
    if (!f.texto) continue
    const controle = gravado(f.texto)
    // 🔑 Sem controle não há medida. Contar como aprovado aqui seria transformar falha
    // de rede em "✅", que é o jeito clássico de uma auditoria mentir.
    if (!controle) { naoMedidos.push(f); continue }
    medidos++
    const nota = semelhanca(onda(arquivo), controle)
    if (nota >= LIMIAR) { ok++; pior = Math.min(pior, nota); continue }
    // Não bate. Quem está aí dentro? Testa as outras falas DA MESMA atividade.
    let culpado = null, melhor = nota
    for (const outra of falas.filter(x => x.atividade === f.atividade && x !== f)) {
      if (!outra.texto) continue
      const c2 = gravado(outra.texto)
      if (!c2) continue
      const n2 = semelhanca(onda(arquivo), c2)
      if (n2 > melhor) { melhor = n2; culpado = `"${outra.texto}" (do ${outra.arquivo})` }
    }
    if (melhor < LIMIAR) culpado = null
    errados.push({ ...f, nota, culpado })
    console.log(`  🔴 ${f.atividade} · ${f.arquivo}: devia falar "${f.texto}" (${nota.toFixed(3)})` +
      (culpado ? ` — na verdade fala ${culpado}` : ` — fala outra coisa, que não está entre os candidatos`))
  }
} finally { t.apagar() }

console.log(`\n${ok} de ${medidos} falas conferidas dizem o texto certo (pior nota entre as aprovadas: ${pior.toFixed(3)})`)
if (naoMedidos.length) {
  console.log(`⚠️  ${naoMedidos.length} fala(s) NÃO medida(s) — o controle não foi gravado (rede). Não são aprovadas nem reprovadas:`)
  naoMedidos.slice(0, 5).forEach(f => console.log(`     ${f.atividade}/${f.arquivo} ("${f.texto}")`))
}
const ruim = faltando.length + semTexto.length + errados.length
if (!ruim && !naoMedidos.length) console.log('✅ nenhuma divergência.')
process.exit(ruim ? 1 : 0)
