/**
 * Quais atividades pedem um mp3 que NÃO existe no disco?
 *
 * POR QUE ISTO EXISTE
 * Quando o arquivo falta, o componente cai no TTS do navegador — que é a voz robótica que o
 * Cláudio reclama, e é também onde qualquer defeito de texto vira voz. O `audios-deriva.mjs`
 * confere se o áudio ENVELHECEU (hash do texto); este confere se ele EXISTE, que é outra
 * pergunta e não estava coberta.
 *
 * 🪤 ESTE AUDITOR JÁ MENTIU, E POR MESES. A versão anterior tinha a sua própria cópia da
 * regra de nomes (`MAPA`) e nela `numeros` era endereçado por `it => it.n`. O componente
 * pede pelo ÍNDICE. Resultado: ele procurava um arquivo que o app nunca pede, encontrava,
 * e imprimia "✅ Todos existem no disco" enquanto a criança clicava no 2 e ouvia "um".
 * Por isso a regra agora vem de `lib-fala.mjs`, um lugar só, conferido contra o .jsx.
 * Ver [[feedback_validar_o_instrumento_antes_da_medida]].
 *
 * 🪤 A pasta usa HÍFEN e o id usa UNDERSCORE — procurar com underscore dá "não existe" para
 * tudo, que é erro já cometido neste projeto. O `slug()` da lib resolve isso.
 *
 * Uso: node scripts/auditar-audio-arquivos.mjs
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { falasEsperadas, conferir } from './lib-fala.mjs'

const divergencias = conferir()
if (divergencias.length) {
  console.error('\n🔴 a regra de caminho não bate com o componente — a auditoria mediria o alvo errado:')
  divergencias.forEach(d => console.error('   ', d))
  process.exit(1)
}

const falas = await falasEsperadas()
const faltando = falas.filter(f => !existsSync(join(f.pasta, f.arquivo)))
const comDefeito = falas.filter(f => f.defeito)

console.log(`\n${falas.length} arquivos de áudio esperados em atividades temáticas`)
if (comDefeito.length) {
  console.log(`\n🔴 ${comDefeito.length} fala(s) com defeito no DADO (falariam "undefined"):`)
  comDefeito.slice(0, 10).forEach(f => console.log(`   ${f.caminho}: ${f.defeito}`))
}
if (!faltando.length && !comDefeito.length) { console.log('✅ Todos existem no disco.\n'); process.exit(0) }

const porAtividade = new Map()
for (const f of faltando) {
  if (!porAtividade.has(f.atividade)) porAtividade.set(f.atividade, [])
  porAtividade.get(f.atividade).push(f)
}
if (faltando.length) {
  console.log(`\n🔇 ${faltando.length} arquivo(s) faltando, em ${porAtividade.size} atividade(s):\n`)
  for (const [id, itens] of [...porAtividade].slice(0, 40)) {
    console.log(`  ${id.padEnd(28)} ${String(itens.length).padStart(2)} · ex.: ${itens[0].pasta}/${itens[0].arquivo}`)
  }
  if (porAtividade.size > 40) console.log(`  … e mais ${porAtividade.size - 40}`)
  const porTipo = {}
  for (const [, itens] of porAtividade) porTipo[itens[0].tipo] = (porTipo[itens[0].tipo] || 0) + 1
  console.log('\npor tipo:')
  for (const [t, q] of Object.entries(porTipo).sort((a, b) => b[1] - a[1])) console.log(`  ${t.padEnd(10)} ${q} atividade(s)`)
}
process.exit(1)
