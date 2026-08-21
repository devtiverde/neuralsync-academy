/**
 * Quais atividades pedem um mp3 que NÃO existe no disco?
 *
 * POR QUE ISTO EXISTE
 * Quando o arquivo falta, o componente cai no TTS do navegador — que é a voz robótica que o
 * Cláudio reclama, e é também onde qualquer defeito de texto vira voz. O `audios-deriva.mjs`
 * confere se o áudio ENVELHECEU (hash do texto); este confere se ele EXISTE, que é outra
 * pergunta e não estava coberta.
 *
 * O caminho é calculado com a MESMA normalização dos componentes (`slug`), lida do código:
 *   /audio/<categoria>/_temas/<slug(atividade.id)>/<slug(item.id)>.mp3   (atividade temática)
 *   /audio/<categoria>/<item.id>.mp3                                     (lista padrão)
 * 🪤 A pasta usa HÍFEN e o id usa UNDERSCORE — procurar com underscore dá "não existe" para
 * tudo, que é erro já cometido neste projeto.
 *
 * Uso: node scripts/auditar-audio-arquivos.mjs
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { existsSync } from 'node:fs'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const carregar = rel => import(pathToFileURL(resolve(raiz, rel)).href)
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// tipo → { pasta em public/audio, chave dentro de `dados`, campo que nomeia o arquivo }
const MAPA = {
  cores:    { pasta: 'cores',    chave: 'cores',    arquivo: it => it.id },
  formas:   { pasta: 'formas',   chave: 'formas',   arquivo: it => it.id },
  numeros:  { pasta: 'numeros',  chave: 'numeros',  arquivo: it => it.n },
  alfabeto: { pasta: 'alfabeto', chave: 'letras',   arquivo: it => it.letra },
  // 🪤 `silabas` NAO usa `_temas/`: o componente pede `/audio/silabas/<id>.mp3` e
  // `/audio/silabas/_fichas/<slug>.mp3`. Incluir aqui gerou 16 falsos positivos na 1a rodada,
  // apontando arquivos que existem. Fica de fora ate alguem modelar o caminho proprio dele.
}

const mods = await Promise.all([
  carregar('src/data/atividadesData.js'),
  carregar('src/data/atividadesExtra.js'),
  carregar('src/data/colorirExtra2.js'),
  carregar('src/data/musicaExtra.js'),
])
const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const todas = []
for (const mod of mods) {
  const vistos = new Set()
  for (const v of Object.values(mod)) {
    if (!v || typeof v !== 'object' || Array.isArray(v)) continue
    if (vistos.has(v)) continue
    vistos.add(v)
    for (const f of FAIXAS) for (const a of v[f] || []) if (a?.id) todas.push({ ...a, faixa: f })
  }
}

let esperados = 0
const faltando = []
for (const a of todas) {
  const m = MAPA[a.tipo]
  if (!m) continue
  const itens = a?.dados?.[m.chave]
  if (!Array.isArray(itens)) continue   // usa a lista padrão do componente
  for (const it of itens) {
    const nome = m.arquivo(it)
    if (nome === undefined || nome === null) {
      faltando.push({ id: a.id, tipo: a.tipo, item: JSON.stringify(it).slice(0, 60), caminho: '(nome do arquivo seria undefined)' })
      continue
    }
    const rel = `public/audio/${m.pasta}/_temas/${slug(a.id)}/${slug(nome)}.mp3`
    esperados++
    if (!existsSync(resolve(raiz, rel))) faltando.push({ id: a.id, tipo: a.tipo, item: String(nome), caminho: rel })
  }
}

console.log(`\n${esperados} arquivos de áudio esperados em atividades temáticas`)
if (!faltando.length) { console.log('✅ Todos existem no disco.\n'); process.exit(0) }

const porAtividade = new Map()
for (const f of faltando) {
  if (!porAtividade.has(f.id)) porAtividade.set(f.id, [])
  porAtividade.get(f.id).push(f)
}
console.log(`\n🔇 ${faltando.length} arquivo(s) faltando, em ${porAtividade.size} atividade(s):\n`)
for (const [id, itens] of [...porAtividade].slice(0, 40)) {
  console.log(`  ${id.padEnd(28)} ${String(itens.length).padStart(2)} · ex.: ${itens[0].caminho}`)
}
if (porAtividade.size > 40) console.log(`  … e mais ${porAtividade.size - 40}`)
const porTipo = {}
for (const [, itens] of porAtividade) porTipo[itens[0].tipo] = (porTipo[itens[0].tipo] || 0) + 1
console.log('\npor tipo:')
for (const [t, q] of Object.entries(porTipo).sort((a, b) => b[1] - a[1])) console.log(`  ${t.padEnd(10)} ${q} atividade(s)`)
console.log('')
process.exit(1)
