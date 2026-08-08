// Confere as atividades de `sequencia` e `padrao` contra o que os componentes REALMENTE leem.
//
// POR QUE ISTO EXISTE
// Estes dois tipos têm resposta certa gravada no dado. Um erro aqui não quebra o build, não
// gera erro de JS e não aparece em nenhuma auditoria de layout: a criança joga, escolhe a
// alternativa certa e o jogo diz que ela errou. O sintoma é MUDO, e quem paga é a criança.
//
// As travas abaixo saíram da leitura dos componentes, não de suposição:
//
//   PadraoAtividade.jsx:101 — a matriz é desenhada num grid `repeat(3, 1fr)` FIXO.
//     → matriz tem que ter 9 células. Com 12, o desenho vira 4 linhas de 3 e o "quadrado"
//       que a criança precisa enxergar para achar o padrão deixa de existir.
//   PadraoAtividade.jsx:103 — o desconhecido é `isLast`, sempre a ÚLTIMA célula.
//     → o ❓ no meio seria desenhado como texto e a resposta apareceria na célula errada.
//   PadraoAtividade.jsx:122 — `💡 {puzzle.dica}` não tem guarda.
//     → sem `dica`, a tela escreve "💡 undefined" para a criança.
//   Ambos — as opções são um grid de 2 colunas e a comparação é `opcao === resposta`.
//     → 4 opções (2×2), sem repetida, e a resposta TEM que estar entre elas.
//
// 🔑 O script se autotesta antes de medir: ele roda contra 8 defeitos conhecidos e EXIGE
// reprovar os 8. Um verificador que aprova tudo daria ✅ no conteúdo quebrado também.
// Ver [[feedback_validar_o_instrumento_antes_da_medida]].
//
// Uso:  npm run auditar-sequencia-padrao

import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const carregar = rel => import(pathToFileURL(resolve(raiz, rel)).href)

const INCOGNITA = '❓'
const N_OPCOES = 4      // grid de 2 colunas nos dois componentes
const N_CELULAS = 9     // PadraoAtividade: grid repeat(3, 1fr)

const XP_FAIXA = {
  exploradores: [55, 80],
  construtores: [75, 105],
  criadores: [95, 135],
  inventores: [115, 165],
}

const PREFIXO = { exploradores: 'exp', construtores: 'con', criadores: 'cri', inventores: 'inv' }

// ─────────────────────────────────────────────────────────────────────────────
// As regras. Cada uma devolve lista de defeitos; lista vazia = passou.
// ─────────────────────────────────────────────────────────────────────────────

function conferirAlternativas(item, onde) {
  const erros = []
  const { resposta, opcoes } = item

  if (!Array.isArray(opcoes)) return [`${onde}: 'opcoes' não é lista`]
  if (typeof resposta !== 'string') erros.push(`${onde}: 'resposta' não é texto (${typeof resposta})`)

  if (opcoes.length !== N_OPCOES) {
    erros.push(`${onde}: ${opcoes.length} opções — o grid é de 2 colunas, tem que ser ${N_OPCOES}`)
  }
  if (opcoes.some(o => typeof o !== 'string')) {
    erros.push(`${onde}: opção que não é texto — a comparação é === e número nunca casa com texto`)
  }
  const repetidas = opcoes.filter((o, i) => opcoes.indexOf(o) !== i)
  if (repetidas.length) {
    erros.push(`${onde}: opção repetida (${[...new Set(repetidas)].join(', ')}) — duas ficariam verdes`)
  }
  if (!opcoes.includes(resposta)) {
    erros.push(`${onde}: 🔴 a resposta "${resposta}" NÃO está entre as opções — impossível acertar`)
  }
  if (resposta === INCOGNITA) erros.push(`${onde}: a resposta é o próprio ${INCOGNITA}`)

  return erros
}

function conferirSequencia(seq, onde) {
  const erros = []
  if (!Array.isArray(seq.items)) return [`${onde}: 'items' não é lista`]
  if (seq.items.some(i => typeof i !== 'string')) {
    erros.push(`${onde}: item que não é texto — o componente lê item.length`)
  }
  const incognitas = seq.items.filter(i => i === INCOGNITA).length
  if (incognitas !== 1) {
    erros.push(`${onde}: ${incognitas} ${INCOGNITA} na sequência — tem que haver exatamente 1`)
  }
  if (seq.items.length < 4) erros.push(`${onde}: só ${seq.items.length} itens — pouco para revelar um padrão`)
  return [...erros, ...conferirAlternativas(seq, onde)]
}

function conferirPuzzle(pz, onde) {
  const erros = []
  if (!Array.isArray(pz.matriz)) return [`${onde}: 'matriz' não é lista`]

  if (pz.matriz.length !== N_CELULAS) {
    erros.push(`${onde}: matriz com ${pz.matriz.length} células — o grid é repeat(3,1fr), tem que ser ${N_CELULAS}`)
  }
  if (pz.matriz.some(c => typeof c !== 'string')) {
    erros.push(`${onde}: célula que não é texto — o componente lê item.length`)
  }
  const posicoes = pz.matriz.map((c, i) => (c === INCOGNITA ? i : -1)).filter(i => i >= 0)
  if (posicoes.length !== 1) {
    erros.push(`${onde}: ${posicoes.length} ${INCOGNITA} na matriz — tem que haver exatamente 1`)
  } else if (posicoes[0] !== pz.matriz.length - 1) {
    erros.push(
      `${onde}: o ${INCOGNITA} está na célula ${posicoes[0] + 1} — o componente revela sempre a ÚLTIMA`
    )
  }
  if (typeof pz.dica !== 'string' || !pz.dica.trim()) {
    erros.push(`${onde}: sem 'dica' — a tela escreveria "💡 undefined" para a criança`)
  }
  return [...erros, ...conferirAlternativas(pz, onde)]
}

function conferirAtividade(a, faixa) {
  const erros = []
  const onde = a.id

  const pref = PREFIXO[faixa]
  if (pref && !a.id.startsWith(pref + '_')) {
    erros.push(`${onde}: id não começa com "${pref}_" — o faixaGuard deduz a faixa pelo prefixo`)
  }
  for (const campo of ['titulo', 'descricao', 'emoji', 'habilidade', 'historinha']) {
    if (typeof a[campo] !== 'string' || !a[campo].trim()) erros.push(`${onde}: falta '${campo}'`)
  }
  const faixaXp = XP_FAIXA[faixa]
  if (faixaXp && !(a.xp_reward >= faixaXp[0] && a.xp_reward <= faixaXp[1])) {
    erros.push(`${onde}: xp_reward ${a.xp_reward} fora da faixa ${faixaXp[0]}–${faixaXp[1]} de ${faixa}`)
  }
  if (a.coins_reward !== a.xp_reward) {
    erros.push(`${onde}: coins_reward (${a.coins_reward}) ≠ xp_reward (${a.xp_reward})`)
  }

  const lista = a.tipo === 'sequencia' ? a.sequencias : a.puzzles
  const nome = a.tipo === 'sequencia' ? 'sequencias' : 'puzzles'
  if (!Array.isArray(lista) || lista.length === 0) {
    erros.push(`${onde}: sem '${nome}'`)
    return erros
  }
  lista.forEach((item, i) => {
    const rot = `${onde}[${i + 1}]`
    erros.push(...(a.tipo === 'sequencia' ? conferirSequencia(item, rot) : conferirPuzzle(item, rot)))
  })
  return erros
}

// ─────────────────────────────────────────────────────────────────────────────
// Autoteste — 8 defeitos que o verificador TEM que pegar.
// ─────────────────────────────────────────────────────────────────────────────

const base = {
  id: 'exp_x', tipo: 'sequencia', titulo: 't', descricao: 'd', emoji: '🎯',
  habilidade: 'h', historinha: 'hh', xp_reward: 70, coins_reward: 70, tempo_estimado: 8,
}
const seqOk = { items: ['1', '2', '3', INCOGNITA], resposta: '4', opcoes: ['4', '5', '6', '7'] }
const pzOk = {
  matriz: ['1', '2', '3', '2', '4', '6', '3', '6', INCOGNITA],
  resposta: '9', opcoes: ['7', '8', '9', '12'], dica: 'múltiplos',
}

const casos = [
  ['resposta fora das opções', { ...base, sequencias: [{ ...seqOk, resposta: '99' }] }, 'exploradores'],
  ['opção repetida', { ...base, sequencias: [{ ...seqOk, opcoes: ['4', '4', '6', '7'] }] }, 'exploradores'],
  ['3 opções em vez de 4', { ...base, sequencias: [{ ...seqOk, opcoes: ['4', '5', '6'] }] }, 'exploradores'],
  ['nenhum ❓', { ...base, sequencias: [{ ...seqOk, items: ['1', '2', '3', '4'] }] }, 'exploradores'],
  ['matriz com 12 células', { ...base, tipo: 'padrao', puzzles: [{ ...pzOk, matriz: [...pzOk.matriz, 'a', 'b', 'c'] }] }, 'exploradores'],
  ['❓ fora da última célula', { ...base, tipo: 'padrao', puzzles: [{ ...pzOk, matriz: [INCOGNITA, '2', '3', '2', '4', '6', '3', '6', '9'] }] }, 'exploradores'],
  ['puzzle sem dica', { ...base, tipo: 'padrao', puzzles: [{ ...pzOk, dica: undefined }] }, 'exploradores'],
  ['número em vez de texto', { ...base, sequencias: [{ items: ['1', '2', INCOGNITA], resposta: '3', opcoes: [3, '4', '5', '6'] }] }, 'exploradores'],
]

const falhasAutoteste = []
for (const [nome, atividade, faixa] of casos) {
  if (conferirAtividade(atividade, faixa).length === 0) falhasAutoteste.push(nome)
}
// E o contrário: dado bom não pode ser reprovado, senão o script vira ruído.
const bomSeq = conferirAtividade({ ...base, sequencias: [seqOk] }, 'exploradores')
const bomPz = conferirAtividade({ ...base, tipo: 'padrao', puzzles: [pzOk] }, 'exploradores')

if (falhasAutoteste.length || bomSeq.length || bomPz.length) {
  console.error('❌ O VERIFICADOR NÃO MEDE — não confie no resultado dele.')
  for (const n of falhasAutoteste) console.error(`   passou batido: ${n}`)
  for (const e of [...bomSeq, ...bomPz]) console.error(`   falso positivo: ${e}`)
  process.exit(1)
}
console.log(`🔬 autoteste: ${casos.length}/${casos.length} defeitos conhecidos reprovados, dado bom aprovado\n`)

// ─────────────────────────────────────────────────────────────────────────────
// A medida de verdade.
// ─────────────────────────────────────────────────────────────────────────────

const mods = [await carregar('src/data/atividadesData.js'), await carregar('src/data/atividadesExtra.js')]

const vistos = new Set()
const alvo = []
for (const mod of mods) {
  for (const grupo of Object.values(mod)) {
    if (!grupo || typeof grupo !== 'object' || Array.isArray(grupo)) continue
    for (const [faixa, lista] of Object.entries(grupo)) {
      if (!Array.isArray(lista)) continue
      for (const a of lista) {
        if (!a || !a.id || vistos.has(a.id)) continue
        if (a.tipo !== 'sequencia' && a.tipo !== 'padrao') continue
        vistos.add(a.id)
        alvo.push([a, faixa])
      }
    }
  }
}

const todosErros = []
for (const [a, faixa] of alvo) todosErros.push(...conferirAtividade(a, faixa))

const nSeq = alvo.filter(([a]) => a.tipo === 'sequencia').length
const nPad = alvo.filter(([a]) => a.tipo === 'padrao').length
const nItens = alvo.reduce((s, [a]) => s + (a.sequencias || a.puzzles || []).length, 0)

if (todosErros.length) {
  console.error(`❌ ${todosErros.length} problemas em ${alvo.length} atividades:\n`)
  for (const e of todosErros) console.error('   ' + e)
  process.exit(1)
}

console.log(`✅ ${alvo.length} atividades (${nSeq} sequencia + ${nPad} padrao), ${nItens} puzzles — nenhum problema`)
