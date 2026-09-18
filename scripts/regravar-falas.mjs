/**
 * regravar-falas.mjs — regrava o áudio temático de um tipo inteiro, SEM PULAR NADA.
 *
 * Substitui `regravar-cores.mjs` e generaliza para os 4 tipos. A regra de caminho e de
 * texto NÃO mora aqui: vem de `lib-fala.mjs`, que é o único lugar que decide isso.
 * Foi a duplicação dessa regra que produziu os três defeitos de voz do projeto
 * (queijo em julho, "undefined" nas cores, `numeros` deslocado em setembro).
 *
 * Por que não usar `gerar-audios-temas.mjs`: ele é retomável — pula quando o manifesto
 * bate. Retomar é legítimo no meio de uma geração longa, mas é inútil quando a suspeita
 * é justamente sobre o que está gravado. Aqui apaga e grava de novo.
 *
 * 🔑 APAGA A PASTA ANTES. Regravar por cima deixa no disco o arquivo de uma nomeação
 * antiga — e em `numeros`, endereçado pelo índice, foi exatamente o órfão nomeado pelo
 * número que sobrescreveu o arquivo certo e deslocou a fala inteira.
 *
 * uso:
 *   node scripts/regravar-falas.mjs --tipo numeros
 *   node scripts/regravar-falas.mjs --tipo cores --so-listar
 *   node scripts/regravar-falas.mjs --tipo formas --so exp_formas_alimentos
 */
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { statSync } from 'node:fs'
import { falasEsperadas, conferir, REGRAS } from './lib-fala.mjs'
import { VOZ, RATE, PISO_BYTES } from './lib-onda.mjs'

const hash = t => createHash('sha256').update(t, 'utf8').digest('hex').slice(0, 16)

export async function regravar(tipo, { soListar = false, so = null, log = console.log } = {}) {
  if (!REGRAS[tipo]) throw new Error(`tipo inválido: ${tipo} (use ${Object.keys(REGRAS).join(', ')})`)

  // Antes de tocar em arquivo: a regra ainda descreve o que o componente pede?
  const divergencias = conferir()
  if (divergencias.length) {
    console.error(`\n🔴 a regra de caminho não bate com o componente — não gravo nada:`)
    divergencias.forEach(d => console.error('   ', d))
    process.exit(1)
  }

  let falas = (await falasEsperadas([tipo]))
  if (so) falas = falas.filter(f => f.atividade === so)
  if (!falas.length) { console.error(so ? `não achei falas de ${so}` : `nenhuma fala de ${tipo}`); process.exit(1) }

  // 🔴 Fala vazia ou com "undefined" para ANTES de gravar. Gravar isso é pôr a palavra
  // na boca da narradora — foi o defeito das cores, que ficou meses no ar.
  const defeituosas = falas.filter(f => f.defeito)
  if (defeituosas.length) {
    console.error(`\n🔴 ${defeituosas.length} fala(s) com defeito no DADO — corrija o dado, não o áudio:`)
    defeituosas.slice(0, 10).forEach(f => console.error(`   ${f.caminho}: ${f.defeito}`))
    process.exit(1)
  }

  const pastas = new Set(falas.map(f => f.pasta))
  const esperados = new Set(falas.map(f => f.caminho))
  const aApagar = []
  for (const p of pastas) {
    if (!existsSync(p)) continue
    for (const f of readdirSync(p).filter(x => x.endsWith('.mp3'))) aApagar.push({ disco: join(p, f), chave: `${p.replace(/^public\/audio\//, '')}/${f}` })
  }
  const orfaos = aApagar.filter(x => !esperados.has(x.chave))

  log(`\n🎙️  ${tipo}: ${falas.length} falas a gravar em ${pastas.size} pasta(s)`)
  log(`   ${aApagar.length} mp3 no disco serão apagados antes (${orfaos.length} órfão(s) que o app não pede)`)
  if (soListar) {
    log(`\n(apenas listando — nada foi tocado)`)
    falas.slice(0, 8).forEach(f => log(`   ${f.caminho}  ← "${f.texto}"`))
    if (orfaos.length) { log(`   órfãos, ex.:`); orfaos.slice(0, 8).forEach(o => log(`     🗑️  ${o.disco}`)) }
    return { gravados: 0, apagados: 0, orfaos: orfaos.length }
  }

  for (const x of aApagar) unlinkSync(x.disco)

  const manifesto = existsSync('audio-manifesto.json') ? JSON.parse(readFileSync('audio-manifesto.json', 'utf8')) : {}
  // Entrada de manifesto para arquivo que acabei de apagar é a próxima mentira do
  // detector de deriva: ele diria "conhecido, não mexer" sobre algo que não existe.
  const prefixo = `${tipo}/_temas/`
  for (const k of Object.keys(manifesto)) {
    if (k.startsWith(prefixo) && !esperados.has(k) && (!so || k.includes(so.replace(/_/g, '-')))) delete manifesto[k]
  }

  let ok = 0
  const falhas = []
  for (const f of falas) {
    mkdirSync(f.pasta, { recursive: true })
    const destino = join(f.pasta, f.arquivo)
    // 🔑 "O comando voltou sem erro" NÃO é o mesmo que "o arquivo está inteiro". Em agosto
    // 8 mp3 do alfabeto saíram truncados assim — um com 0,36s no lugar de 1,78s — e o
    // manifesto anotou sucesso nos oito. Por isso cada gravação é conferida pelo tamanho e
    // repetida até 3 vezes. Ver [[feedback_manifesto_e_promessa_nao_medida]].
    let gravou = false
    for (let tentativa = 1; tentativa <= 3 && !gravou; tentativa++) {
      try {
        execFileSync('python', ['-m', 'edge_tts', '-t', f.texto, '-v', VOZ, `--rate=${RATE}`, '--write-media', destino], { stdio: 'pipe' })
        const tam = statSync(destino).size
        if (tam < PISO_BYTES) {
          if (tentativa === 3) falhas.push(`${f.caminho}: saiu truncado (${tam} bytes) em 3 tentativas`)
          continue
        }
        gravou = true
      } catch (e) {
        if (tentativa === 3) falhas.push(`${f.caminho}: ${String(e.message).slice(0, 60)}`)
      }
    }
    if (!gravou) continue
    manifesto[f.caminho] = hash(f.texto)
    ok++
    if (ok % 40 === 0) log(`   ... ${ok}/${falas.length}`)
  }

  writeFileSync('audio-manifesto.json', JSON.stringify(manifesto, null, 0), 'utf8')
  log(`\n✅ ${ok} de ${falas.length} gravados · ${aApagar.length} apagados antes`)
  if (falhas.length) {
    log(`\n🔴 ${falhas.length} falha(s):`)
    falhas.slice(0, 8).forEach(x => log('   ' + x))
    process.exitCode = 1
  }
  return { gravados: ok, apagados: aApagar.length, orfaos: orfaos.length, falhas: falhas.length }
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const ehCLI = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('scripts/regravar-falas.mjs')
if (ehCLI) {
  const args = process.argv.slice(2)
  const tipo = args.includes('--tipo') ? args[args.indexOf('--tipo') + 1] : null
  if (!tipo) { console.error(`uso: node scripts/regravar-falas.mjs --tipo <${Object.keys(REGRAS).join('|')}> [--so <id>] [--so-listar]`); process.exit(1) }
  const r = await regravar(tipo, {
    soListar: args.includes('--so-listar'),
    so: args.includes('--so') ? args[args.indexOf('--so') + 1] : null,
  })
  if (tipo === 'numeros' && r.gravados) console.log(`\n▶️  confira com: node scripts/auditar-audio-numeros.mjs --ouvir`)
}
