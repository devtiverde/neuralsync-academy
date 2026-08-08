/**
 * Barra IDs de atividade repetidos antes do build.
 *
 * Por que este teste existe: `useAtividades` junta ~14 arrays de fontes
 * diferentes num único array por faixa. Se o mesmo id aparece em dois arrays,
 * a criança perde acesso a uma das atividades — a segunda sobrescreve a
 * primeira em silêncio, sem erro de build e sem erro de runtime. Isso já
 * aconteceu 3 vezes (`inv_memoria_linguagens`, `exp_memoria_profissoes`,
 * `cri_memoria_inventores`) e só foi descoberto por acaso.
 *
 * Confere também se todo id tem categoria em `kidsLinks.js` — sem ela a
 * atividade cai no balde "outros" na navegação.
 *
 * Roda sozinho no `npm run build` (script `prebuild`).
 * Para rodar à mão: node scripts/checar-ids-atividades.mjs
 */

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']

const [dataMod, extraMod, colorir2Mod, musicaMod, linksMod] = await Promise.all([
  import('../src/data/atividadesData.js'),
  import('../src/data/atividadesExtra.js'),
  import('../src/data/colorirExtra2.js'),
  import('../src/data/musicaExtra.js'),
  import('../src/lib/kidsLinks.js'),
])

// Mesma ordem de junção de src/hooks/useAtividades.js. Se aquele arquivo ganhar
// uma fonte nova, ela precisa entrar aqui também — senão o teste passa a mentir.
const FONTES = [
  ['atividadesPorFaixa',       dataMod.atividadesPorFaixa],
  ['atividadesExtraPorFaixa',  extraMod.atividadesExtraPorFaixa],
  ['fase2PorFaixa',            dataMod.fase2PorFaixa],
  ['fase2ExtraPorFaixa',       extraMod.fase2ExtraPorFaixa],
  ['fase3PorFaixa',            dataMod.fase3PorFaixa],
  ['fase3ExtraPorFaixa',       extraMod.fase3ExtraPorFaixa],
  ['fase4ExtraPorFaixa',       extraMod.fase4ExtraPorFaixa],
  ['fase5ExtraPorFaixa',       extraMod.fase5ExtraPorFaixa],
  ['inglesExtraPorFaixa',      extraMod.inglesExtraPorFaixa],
  ['formasExtraPorFaixa',      extraMod.formasExtraPorFaixa],
  ['numerosExtraPorFaixa',     extraMod.numerosExtraPorFaixa],
  ['coresExtraPorFaixa',       extraMod.coresExtraPorFaixa],
  ['alfabetoExtraPorFaixa',    extraMod.alfabetoExtraPorFaixa],
  ['colorirExtraPorFaixa',     extraMod.colorirExtraPorFaixa],
  ['colorirExtra2PorFaixa',    colorir2Mod.colorirExtra2PorFaixa],
  ['musicaExtraPorFaixa',      musicaMod.musicaExtraPorFaixa],
  ['silabasExtraPorFaixa',     extraMod.silabasExtraPorFaixa],
  ['quizExtraPorFaixa',        extraMod.quizExtraPorFaixa],
  ['raciocinioExtraPorFaixa',  extraMod.raciocinioExtraPorFaixa],
]

const colisoes = []
const semCategoria = []
const todos = new Set()

for (const faixa of FAIXAS) {
  // id -> [{ fonte, titulo }] — guarda o título porque o sintoma que interessa
  // é "duas atividades DIFERENTES com o mesmo id", não uma repetição inofensiva.
  const vistos = new Map()

  for (const [nomeFonte, mapa] of FONTES) {
    for (const at of (mapa?.[faixa] || [])) {
      if (!at?.id) continue
      todos.add(at.id)
      if (!vistos.has(at.id)) vistos.set(at.id, [])
      vistos.get(at.id).push({ fonte: nomeFonte, titulo: at.titulo || '(sem título)' })
    }
  }

  for (const [id, ocorrencias] of vistos) {
    if (ocorrencias.length > 1) colisoes.push({ faixa, id, ocorrencias })
  }
}

const getKidsLink = linksMod.getKidsLink || linksMod.default
for (const id of todos) {
  const cat = typeof getKidsLink === 'function' ? getKidsLink(id) : undefined
  if (!cat) semCategoria.push(id)
}

let falhou = false

if (colisoes.length) {
  falhou = true
  console.error(`\n✖ ${colisoes.length} id(s) de atividade repetido(s) na mesma faixa:\n`)
  for (const { faixa, id, ocorrencias } of colisoes) {
    console.error(`  [${faixa}] ${id}`)
    for (const o of ocorrencias) console.error(`      ${o.fonte} → "${o.titulo}"`)
    console.error('')
  }
  console.error('  A última ocorrência sobrescreve as anteriores e a criança perde')
  console.error('  acesso a elas. Renomeie uma das duas (sufixo _2) e mapeie o id')
  console.error('  novo em src/lib/kidsLinks.js.\n')
}

if (semCategoria.length) {
  falhou = true
  console.error(`\n✖ ${semCategoria.length} id(s) sem categoria em kidsLinks.js:\n`)
  for (const id of semCategoria) console.error(`  ${id}`)
  console.error('\n  Sem mapeamento a atividade aparece como "outros" na navegação.\n')
}

if (falhou) process.exit(1)

console.log(`✓ ${todos.size} ids de atividade — nenhum repetido, todos com categoria`)
