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
import { onda, comparar, gravar, pastaTemp, autoteste, PISO_BYTES } from './lib-onda.mjs'
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

// 🔑 O que decide é o COSSENO, e ele é bimodal com uma separação enorme: mesma fala fica
// entre 0,94 e 1,00 (0,94 quando o mp3 vem de uma versão mais velha do edge-tts), fala
// diferente fica abaixo de 0,10 — medido inclusive em fala de uma letra ("A." vs "B." =
// 0,005). 0,90 cai no vazio entre as duas nuvens; não é limiar afrouxado para passar.
const LIMIAR_COS = 0.90
// A razão de comprimento é a segunda pergunta, e é mais frouxa de propósito: ela existe
// para pegar fala que é o COMEÇO de outra ("Um" dentro de "Um milhão", razão ~0,35), não
// para reprovar ~96 ms de cauda a mais, que foi o falso positivo do `z-palavra.mp3`.
const LIMIAR_RAZAO = 0.70

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
// 🔑 Arquivo MUITO abaixo do piso é download interrompido — a fala sai cortada no meio e
// nenhum detector via isso, porque o comando de gravação tinha retornado sem erro e o
// manifesto anotou sucesso. Custa um `stat` e pega o que a medição de onda só acharia se
// aquele arquivo caísse na amostra.
const truncados = falas.filter(f => {
  const p = join(f.pasta, f.arquivo)
  return existsSync(p) && statSync(p).size < PISO_BYTES
})

console.log(`\n🔊 ${tipo}: ${atividades.length} atividades · ${falas.length} falas esperadas`)
console.log(`   ${faltando.length} arquivo(s) que o app PEDE e não existe (cai no TTS robótico)`)
if (semTexto.length) console.log(`   🔴 ${semTexto.length} fala(s) com defeito no dado — falariam "undefined"`)
if (truncados.length) {
  console.log(`   🔴 ${truncados.length} arquivo(s) TRUNCADO(S) (abaixo de ${PISO_BYTES} bytes — fala cortada):`)
  truncados.forEach(f => console.log(`      ${f.atividade}/${f.arquivo} — ${statSync(join(f.pasta, f.arquivo)).size} bytes ("${f.texto}")`))
}

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
    const { cos, razao } = comparar(onda(arquivo), controle)
    if (cos >= LIMIAR_COS && razao >= LIMIAR_RAZAO) { ok++; pior = Math.min(pior, cos); continue }
    // 🔑 Cosseno alto e razão baixa NÃO é fala errada: é a mesma fala com envelope
    // diferente (cauda a mais, silêncio a mais). Dizer "fala outra coisa" aqui seria
    // reportar defeito onde não há.
    if (cos >= LIMIAR_COS) {
      ok++; pior = Math.min(pior, cos)
      console.log(`  🟡 ${f.atividade} · ${f.arquivo}: diz "${f.texto}" (cos ${cos.toFixed(3)}) mas com duração diferente do controle (razão ${razao.toFixed(2)}) — conteúdo certo`)
      continue
    }
    // Não bate. Quem está aí dentro? Testa as outras falas DA MESMA atividade.
    let culpado = null, melhor = cos
    for (const outra of falas.filter(x => x.atividade === f.atividade && x !== f)) {
      if (!outra.texto) continue
      const c2 = gravado(outra.texto)
      if (!c2) continue
      const r2 = comparar(onda(arquivo), c2)
      if (r2.cos > melhor) { melhor = r2.cos; culpado = `"${outra.texto}" (do ${outra.arquivo})` }
    }
    if (melhor < LIMIAR_COS) culpado = null
    errados.push({ ...f, cos, razao, culpado })
    console.log(`  🔴 ${f.atividade} · ${f.arquivo}: devia falar "${f.texto}" (cos ${cos.toFixed(3)} · razão ${razao.toFixed(2)})` +
      (culpado ? ` — na verdade fala ${culpado}` : ` — fala outra coisa, que não está entre os candidatos`))
  }
} finally { t.apagar() }

console.log(`\n${ok} de ${medidos} falas conferidas dizem o texto certo (pior nota entre as aprovadas: ${pior.toFixed(3)})`)
if (naoMedidos.length) {
  console.log(`⚠️  ${naoMedidos.length} fala(s) NÃO medida(s) — o controle não foi gravado (rede). Não são aprovadas nem reprovadas:`)
  naoMedidos.slice(0, 5).forEach(f => console.log(`     ${f.atividade}/${f.arquivo} ("${f.texto}")`))
}
const ruim = faltando.length + semTexto.length + errados.length + truncados.length
if (!ruim && !naoMedidos.length) console.log('✅ nenhuma divergência.')
process.exit(ruim ? 1 : 0)
