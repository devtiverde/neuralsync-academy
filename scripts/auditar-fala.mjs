/**
 * auditar-fala.mjs — caça o "undefined" FALADO nas atividades que narram item a item.
 *
 * O defeito não é o áudio: é a FRASE de reserva. Quando o mp3 não existe, o componente
 * cai no TTS do navegador com um texto montado a partir de campos do dado. Se o campo
 * não existe, a criança ouve literalmente "undefined".
 *
 * Por isso a auditoria mede as DUAS pernas juntas:
 *   1. o dado tem os campos que a frase interpola?
 *   2. o mp3 existe? (sem ele, o defeito do item 1 vira som)
 * Um item sem campo MAS com áudio é bomba armada; sem campo E sem áudio já está tocando.
 *
 * 🔑 Cada componente interpola campos DIFERENTES — cores usa `exemplo`, formas usa `frase`.
 * Trocar um pelo outro no dado não dá erro nenhum, só "undefined" na voz.
 */
import { existsSync } from 'node:fs'
import { falasEsperadas } from './lib-fala.mjs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']

// Espelha `src/pages/atividades/*.jsx`. Se a frase mudar lá, mudar aqui.
//
// 🪤 `arquivo` NÃO é igual nos quatro, e supor que fosse foi o erro da 1ª versão desta
// auditoria: ela pediu `<slug(item.id)>.mp3` para todos e, como alfabeto e números não
// têm campo `id`, o caminho saía `.mp3` — 1.277 "ausentes" que eram invenção do
// instrumento. Cada tipo nomeia o arquivo do seu jeito:
//   cores/formas → pelo id do item · alfabeto → pela LETRA · números → pelo ÍNDICE
const TIPOS = {
  cores: {
    lista: 'cores', campos: ['nome', 'exemplo'], pasta: 'cores',
    frase: c => `${c.nome}. ${c.nome}, ${c.exemplo}.`,
    arquivo: (it) => [`${slug(it.id ?? '')}.mp3`],
  },
  alfabeto: {
    lista: 'letras', campos: ['letra', 'palavra'], pasta: 'alfabeto',
    frase: l => `${l.letra}. ${l.palavra}.`,
    arquivo: (it) => {
      const l = String(it.letra ?? '').toLowerCase()
      return [`${l}.mp3`, `${l}-palavra.mp3`]   // são DOIS arquivos por letra
    },
  },
  formas: {
    lista: 'formas', campos: ['nome', 'frase'], pasta: 'formas',
    frase: f => `${f.nome}. ${f.frase}`,
    arquivo: (it) => [`${slug(it.id ?? '')}.mp3`],
  },
  numeros: {
    lista: 'numeros', campos: ['word'], pasta: 'numeros',
    frase: n => `${n.word}`,
    arquivo: (it, i) => [`${i}.mp3`],           // índice, não o `n`
  },
}

const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

async function carregar() {
  const todas = []
  for (const faixa of FAIXAS) {
    const mod = await import(`../src/data/extra/${faixa}.js`)
    for (const [nome, valor] of Object.entries(mod)) {
      if (Array.isArray(valor)) todas.push(...valor.map(a => ({ ...a, _origem: `extra/${faixa}.js:${nome}` })))
    }
  }
  const base = await import('../src/data/atividadesData.js')
  for (const [nome, valor] of Object.entries(base)) {
    if (Array.isArray(valor)) todas.push(...valor.map(a => ({ ...a, _origem: `atividadesData.js:${nome}` })))
    else if (valor && typeof valor === 'object') {
      for (const lista of Object.values(valor)) {
        if (Array.isArray(lista)) todas.push(...lista.map(a => ({ ...a, _origem: `atividadesData.js:${nome}` })))
      }
    }
  }
  const vistos = new Set()
  return todas.filter(a => a?.id && !vistos.has(a.id) && vistos.add(a.id))
}

// Prova que o instrumento mede: um dado sabidamente quebrado tem que reprovar.
function autoteste() {
  const cfg = TIPOS.cores
  const bom = { id: 'x', nome: 'Vermelho', exemplo: 'do tomate' }
  const ruim = { id: 'x', nome: 'Vermelho', frase: 'do tomate' } // campo trocado: o erro real
  const faltando = it => cfg.campos.filter(c => it[c] === undefined || it[c] === null || it[c] === '')
  if (faltando(bom).length !== 0) throw new Error('autoteste: reprovou dado bom')
  if (faltando(ruim).length !== 1) throw new Error('autoteste: aprovou dado quebrado')
  if (!cfg.frase(ruim).includes('undefined')) throw new Error('autoteste: frase quebrada não mostrou undefined')
}

const todas = await carregar()
autoteste()

// 🔑 GUARDA CONTRA A DIVERGÊNCIA — a causa das três vozes erradas deste projeto.
// Este arquivo tem a sua própria tabela `TIPOS` porque precisa também da FRASE DE RESERVA
// (o texto do TTS), que é assunto dele. Mas o NOME DO ARQUIVO tem que ser exatamente o
// que `lib-fala.mjs` diz, e aquilo é conferido contra o .jsx. Se as duas discordarem, o
// build para aqui: foi assim que `auditar-audio-arquivos.mjs` passou meses procurando
// `<n>.mp3` enquanto o app pedia `<índice>.mp3` e dizia "✅ todos existem".
{
  const daLib = new Set((await falasEsperadas(['cores', 'formas', 'numeros', 'alfabeto']))
    .map(f => `${f.pasta}/${f.arquivo}`))
  const daqui = new Set()
  for (const [tipo, cfg] of Object.entries(TIPOS)) {
    for (const a of todas.filter(x => x.tipo === tipo)) {
      const itens = a?.dados?.[cfg.lista]
      if (!Array.isArray(itens)) continue
      itens.forEach((it, i) => cfg.arquivo(it, i).forEach(n =>
        daqui.add(`public/audio/${cfg.pasta}/_temas/${slug(a.id)}/${n}`)))
    }
  }
  const soAqui = [...daqui].filter(x => !daLib.has(x))
  const soLa = [...daLib].filter(x => !daqui.has(x) && !x.includes('/alfabeto/'))
  if (soAqui.length || soLa.length) {
    console.error(`\n🔴 a regra de nome de arquivo divergiu de scripts/lib-fala.mjs:`)
    soAqui.slice(0, 5).forEach(x => console.error(`   só aqui: ${x}`))
    soLa.slice(0, 5).forEach(x => console.error(`   só na lib: ${x}`))
    process.exit(1)
  }
}

let itensTotal = 0, semCampo = 0, semAudio = 0, tocandoUndefined = 0
const achados = []

for (const [tipo, cfg] of Object.entries(TIPOS)) {
  for (const a of todas.filter(x => x.tipo === tipo)) {
    const itens = a?.dados?.[cfg.lista]
    if (!Array.isArray(itens)) continue // usa o conjunto padrão embutido no componente
    for (const [i, it] of itens.entries()) {
      itensTotal++
      // 🔑 Campo AUSENTE não é o único jeito de a criança ouvir "undefined": o campo
      // pode CONTER a palavra, se alguma vez foi preenchido por um template que
      // interpolou um valor vazio. A auditoria só olhava ausência e teria aprovado isso.
      const faltando = cfg.campos.filter(c =>
        it[c] === undefined || it[c] === null || String(it[c]).trim() === '' ||
        /\bundefined\b|\[object Object\]/.test(String(it[c])))
      const pasta = join(raiz, 'public', 'audio', cfg.pasta, '_temas', slug(a.id))
      const temAudio = cfg.arquivo(it, i).every(nome => existsSync(join(pasta, nome)))
      if (!temAudio) semAudio++
      if (faltando.length) {
        semCampo++
        if (!temAudio) tocandoUndefined++
        achados.push({
          tipo, atividade: a.id, origem: a._origem, item: it.id ?? '(sem id)',
          faltando: faltando.join(', '),
          estado: temAudio ? 'armado (tem mp3, cai no TTS se o mp3 falhar)' : '🔴 TOCANDO (sem mp3 → TTS já fala undefined)',
          frase: cfg.frase(it),
        })
      }
    }
  }
}

console.log(`\n🔊 Auditoria de fala — ${itensTotal} itens narráveis em ${todas.length} atividades\n`)
if (!achados.length) {
  console.log('✅ Nenhum item sem os campos da frase.')
} else {
  const porAtividade = new Map()
  for (const a of achados) {
    if (!porAtividade.has(a.atividade)) porAtividade.set(a.atividade, [])
    porAtividade.get(a.atividade).push(a)
  }
  for (const [ativ, lista] of porAtividade) {
    console.log(`  ${lista[0].estado.startsWith('🔴') ? '🔴' : '🟡'} ${ativ}  (${lista[0].tipo} · ${lista[0].origem})`)
    console.log(`     ${lista.length} item(ns), falta "${lista[0].faltando}"`)
    console.log(`     fala: "${lista[0].frase}"`)
  }
}
console.log(`\n  itens sem campo da frase ....... ${semCampo}`)
console.log(`  desses, JÁ tocando undefined ... ${tocandoUndefined}`)
console.log(`  itens sem mp3 no disco ......... ${semAudio} de ${itensTotal}`)
console.log('')
process.exit(semCampo ? 1 : 0)
