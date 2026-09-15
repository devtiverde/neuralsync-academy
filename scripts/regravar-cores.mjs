/**
 * regravar-cores.mjs — regrava TODO o áudio de cores, sem pular nada.
 *
 * Por que existir em vez de rodar `gerar-audios-temas.mjs`: aquele script tem
 * `if (existsSync(destino)) continue`, comentado como "retomável". **Arquivo existir não
 * diz nada sobre o texto que ele contém** — foi exatamente assim que o `triangulino`
 * passou a narrar queijo em julho. Aqui não há atalho: se o arquivo existe, é apagado e
 * gravado de novo.
 *
 * Também limpa ÓRFÃO: mp3 que não corresponde a item nenhum do dado de hoje. Órfão é
 * resto de uma versão antiga da atividade e, em `numeros`, onde o arquivo é endereçado
 * pelo índice, é sinal de que os áudios podem estar deslocados.
 *
 * uso: node scripts/regravar-cores.mjs [--so-listar]
 */
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'

const VOZ = 'pt-BR-FranciscaNeural'
// 🔑 A MESMA velocidade do `gerar-audios-temas.mjs`. Regravar sem o `--rate` deixaria
// estas 249 falas mais rápidas que as outras 2.500 do app — desconfiguração nova,
// criada pelo conserto.
const RATE = '-8%'
const soListar = process.argv.includes('--so-listar')
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const hash = t => createHash('sha256').update(t, 'utf8').digest('hex').slice(0, 16)

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const todas = []
for (const f of FAIXAS) {
  const m = await import(`../src/data/extra/${f}.js`)
  for (const v of Object.values(m)) if (Array.isArray(v)) todas.push(...v)
}
const base = await import('../src/data/atividadesData.js')
for (const v of Object.values(base)) {
  const listas = Array.isArray(v) ? [v] : (v && typeof v === 'object' ? Object.values(v) : [])
  for (const l of listas) if (Array.isArray(l)) todas.push(...l)
}
const vistos = new Set()
const cores = todas.filter(a => a?.tipo === 'cores' && a?.id && !vistos.has(a.id) && vistos.add(a.id))

// ── o que gravar ────────────────────────────────────────────────────────────
const tarefas = []
for (const a of cores) {
  const itens = a?.dados?.cores
  if (!Array.isArray(itens)) continue
  for (const c of itens) {
    const nome = String(c?.nome ?? '').trim()
    const exemplo = String(c?.exemplo ?? '').trim()
    if (!nome) { console.error(`❌ ${a.id}/${c?.id}: sem nome — não gravo`); process.exit(1) }
    // A MESMA frase do componente. Se mudar lá, mudar aqui.
    const texto = exemplo ? `${nome}. ${nome}, ${exemplo}.` : `${nome}.`
    if (/\bundefined\b/.test(texto)) { console.error(`❌ ${a.id}/${c.id}: a frase tem "undefined" — ${texto}`); process.exit(1) }
    tarefas.push({
      pasta: join('public', 'audio', 'cores', '_temas', slug(a.id)),
      arquivo: `${slug(c.id)}.mp3`,
      chave: `cores/_temas/${slug(a.id)}/${slug(c.id)}.mp3`,
      texto,
    })
  }
}

// ── órfãos ──────────────────────────────────────────────────────────────────
const porPasta = new Map()
for (const t of tarefas) {
  if (!porPasta.has(t.pasta)) porPasta.set(t.pasta, new Set())
  porPasta.get(t.pasta).add(t.arquivo)
}
const orfaos = []
for (const [pasta, esperados] of porPasta) {
  if (!existsSync(pasta)) continue
  for (const f of readdirSync(pasta).filter(x => x.endsWith('.mp3'))) {
    if (!esperados.has(f)) orfaos.push(join(pasta, f))
  }
}

console.log(`\n🎙️  ${cores.length} atividades de cores · ${tarefas.length} áudios a regravar · ${orfaos.length} órfão(s)`)
if (soListar) {
  console.log(`\n(apenas listando — nada foi tocado)`)
  tarefas.slice(0, 3).forEach(t => console.log(`   ${t.chave}  ← "${t.texto}"`))
  process.exit(0)
}

for (const o of orfaos) { unlinkSync(o); console.log(`   🗑️  ${o}`) }

// ── gravar ──────────────────────────────────────────────────────────────────
const manifesto = existsSync('audio-manifesto.json')
  ? JSON.parse(readFileSync('audio-manifesto.json', 'utf8')) : {}

let ok = 0
const falhas = []
for (const t of tarefas) {
  mkdirSync(t.pasta, { recursive: true })
  const destino = join(t.pasta, t.arquivo)
  if (existsSync(destino)) unlinkSync(destino)      // sem atalho: apaga e regrava
  try {
    execFileSync('python', ['-m', 'edge_tts', '-t', t.texto, '-v', VOZ, `--rate=${RATE}`, '--write-media', destino], { stdio: 'pipe' })
    manifesto[t.chave] = hash(t.texto)
    ok++
    if (ok % 40 === 0) console.log(`   ... ${ok}/${tarefas.length}`)
  } catch (e) {
    falhas.push(`${t.chave}: ${String(e.message).slice(0, 60)}`)
  }
}

writeFileSync('audio-manifesto.json', JSON.stringify(manifesto, null, 0), 'utf8')
console.log(`\n✅ ${ok} de ${tarefas.length} regravados · ${orfaos.length} órfãos removidos`)
if (falhas.length) {
  console.log(`\n🔴 ${falhas.length} falha(s):`)
  falhas.slice(0, 8).forEach(f => console.log('   ', f))
  process.exit(1)
}
