/**
 * auditar-audio-orfao.mjs — acha mp3 que NÃO corresponde a item nenhum do dado.
 *
 * 🔑 Por que isto pega o que o detector de deriva NÃO pega: `audios-deriva` parte do
 * DADO DE HOJE e confere os arquivos que ele espera. Arquivo que sobrou de uma versão
 * antiga da atividade é invisível para ele — ninguém pergunta por aquele caminho.
 *
 * E o órfão não é lixo inofensivo: ele é a PROVA de que a lista daquela atividade mudou
 * depois que o áudio foi gerado. Em `numeros`, onde o arquivo é endereçado pelo ÍNDICE,
 * uma remoção no MEIO da lista desloca todos os áudios seguintes — a criança vê "3" e
 * ouve "quatro", e nada no sistema acusa.
 */
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const TIPOS = {
  cores:    { lista: 'cores',   arquivos: (it) => [`${slug(it.id ?? '')}.mp3`] },
  formas:   { lista: 'formas',  arquivos: (it) => [`${slug(it.id ?? '')}.mp3`] },
  alfabeto: { lista: 'letras',  arquivos: (it) => { const l = String(it.letra ?? '').toLowerCase(); return [`${l}.mp3`, `${l}-palavra.mp3`] } },
  numeros:  { lista: 'numeros', arquivos: (_it, i) => [`${i}.mp3`] },
}

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
const unicas = todas.filter(a => a?.id && !vistos.has(a.id) && vistos.add(a.id))

let orfaos = 0, pastas = 0, afetadas = []
for (const [tipo, cfg] of Object.entries(TIPOS)) {
  for (const a of unicas.filter(x => x.tipo === tipo)) {
    const itens = a?.dados?.[cfg.lista]
    if (!Array.isArray(itens)) continue
    const pasta = join('public', 'audio', tipo, '_temas', slug(a.id))
    if (!existsSync(pasta)) continue
    pastas++
    const esperados = new Set(itens.flatMap((it, i) => cfg.arquivos(it, i)))
    const noDisco = readdirSync(pasta).filter(f => f.endsWith('.mp3'))
    const sobrando = noDisco.filter(f => !esperados.has(f))
    if (sobrando.length) {
      orfaos += sobrando.length
      afetadas.push({ id: a.id, tipo, itens: itens.length, arquivos: noDisco.length, sobrando })
      console.log(`  🔴 ${a.id} (${tipo}) — ${itens.length} itens, ${noDisco.length} mp3 · sobram: ${sobrando.join(' ')}`)
    }
  }
}

console.log(`\n${pastas} pastas temáticas · ${orfaos} arquivo(s) órfão(s) em ${afetadas.length} atividade(s)`)
if (afetadas.some(a => a.tipo === 'numeros')) {
  console.log(`\n⚠️  Órfão em \`numeros\` é o caso GRAVE: o arquivo é endereçado pelo ÍNDICE.`)
  console.log(`   Se o item removido estava no MEIO da lista, todos os áudios seguintes`)
  console.log(`   estão deslocados — a criança vê um número e ouve outro.`)
}
process.exit(orfaos ? 1 : 0)
