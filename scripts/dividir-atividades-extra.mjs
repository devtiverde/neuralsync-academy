/**
 * Divide `src/data/atividadesExtra.js` em um arquivo por faixa etária.
 *
 * POR QUE
 * O arquivo tinha 6.765 linhas / 702 kB (233 kB gzip) e é o maior do projeto. A home
 * da criança baixava e parseava os QUATRO conjuntos de faixa para usar UM — três
 * quartos do maior arquivo do projeto viajavam para o celular sem serem lidos. Uma
 * criança é de uma faixa só, sempre.
 *
 * O QUE ELE FAZ
 * Grava `src/data/extra/<faixa>.js` com os 12 conjuntos daquela faixa e reescreve o
 * `atividadesExtra.js` como BARRIL de compatibilidade — quem importava o nome antigo
 * (Dashboard, DevAtividade, checar-ids) continua funcionando sem alteração.
 *
 * DEPOIS DE RODAR, os arquivos por faixa passam a ser a FONTE DA VERDADE: atividade
 * nova entra em `src/data/extra/<faixa>.js`, não no barril. Não há geração contínua,
 * então não há o risco de deriva que já mordeu os áudios temáticos.
 *
 * Uso: node scripts/dividir-atividades-extra.mjs
 */
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { writeFile, mkdir, readFile } from 'node:fs/promises'

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const ROTULO = {
  exploradores: 'EXPLORADORES (4–5 anos)',
  construtores: 'CONSTRUTORES (6–8 anos)',
  criadores:    'CRIADORES (9–11 anos)',
  inventores:   'INVENTORES (12–15 anos)',
}
// Reaproveita os cabeçalhos que existiam no arquivo grande, para o contexto não
// se perder na divisão.
const DESCRICAO = {
  atividadesExtraPorFaixa: 'Fase 1 — quiz, memória, sequência',
  fase2ExtraPorFaixa:      'Fase 2 — padrão, robô, labirinto',
  fase3ExtraPorFaixa:      'Fase 3 — blocos, inventor, robô e quizia extras',
  fase4ExtraPorFaixa:      'Fase 4 — robô e padrão (2 por faixa)',
  fase5ExtraPorFaixa:      'Fase 5 — quiz e inventor temáticos',
  inglesExtraPorFaixa:     'Inglês — vocabulário, flashcards, frases e leitura',
  formasExtraPorFaixa:     'Formas geométricas',
  numerosExtraPorFaixa:    'Números',
  coresExtraPorFaixa:      'Cores',
  alfabetoExtraPorFaixa:   'Alfabeto',
  colorirExtraPorFaixa:    'Colorir',
  silabasExtraPorFaixa:    'Sílabas',
}

const raiz = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..')
const caminho = rel => resolve(raiz, rel)
const carregar = (rel, v = '') => import(pathToFileURL(caminho(rel)).href + v)

// ── serializador ────────────────────────────────────────────────────────────────
// JSON.stringify puro citaria TODA chave (`"titulo":`), e um regex depois para
// tirar as aspas mexeria também dentro do texto das historinhas. Este anda na
// estrutura e decide chave por chave, sem nunca tocar no conteúdo das strings.
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/
function serializar(v, nivel = 1) {
  const ind = '  '.repeat(nivel)
  const indFim = '  '.repeat(nivel - 1)
  if (v === null) return 'null'
  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return JSON.stringify(v)
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]'
    // Array só de escalares curtos cabe em uma linha e fica MUITO mais legível.
    const escalares = v.every(x => typeof x !== 'object' || x === null)
    if (escalares) {
      const linha = `[${v.map(x => JSON.stringify(x)).join(', ')}]`
      if (linha.length <= 100) return linha
    }
    return `[\n${v.map(x => ind + serializar(x, nivel + 1)).join(',\n')}\n${indFim}]`
  }
  const entradas = Object.entries(v)
  if (entradas.length === 0) return '{}'
  const corpo = entradas
    .map(([k, x]) => `${ind}${IDENT.test(k) ? k : JSON.stringify(k)}: ${serializar(x, nivel + 1)}`)
    .join(',\n')
  return `{\n${corpo}\n${indFim}}`
}

// ── 1. fotografia do estado atual, ANTES de sobrescrever qualquer coisa ─────────
const original = await carregar('src/data/atividadesExtra.js')
const EXPORTS = Object.keys(original)
// Normaliza antes de comparar: alguns conjuntos (silabas) declaravam só 2 das 4
// faixas, e o barril passa a declarar as 4. Faixa ausente e faixa vazia são a
// mesma coisa para quem lê (`[f] || []`) — comparar cru acusaria diferença onde
// não há nenhuma, e um verificador que grita à toa deixa de ser lido.
const foto = mod => JSON.stringify(
  Object.fromEntries(EXPORTS.map(e => [e, Object.fromEntries(FAIXAS.map(f => [f, mod[e]?.[f] || []]))])),
)
const antes = foto(original)
console.log(`lido: ${EXPORTS.length} conjuntos, ${EXPORTS.reduce((t, e) => t + FAIXAS.reduce((s, f) => s + (original[e][f] || []).length, 0), 0)} atividades`)

// ── 2. um arquivo por faixa ─────────────────────────────────────────────────────
await mkdir(caminho('src/data/extra'), { recursive: true })

for (const faixa of FAIXAS) {
  const blocos = EXPORTS.map(nome => {
    const lista = original[nome][faixa] || []
    return `// ── ${DESCRICAO[nome] || nome} ──\nexport const ${nome} = ${serializar(lista, 1)}\n`
  })
  const cabecalho = [
    '// ──────────────────────────────────────────────────────────────────────',
    `// ATIVIDADES EXTRA — ${ROTULO[faixa]}`,
    '//',
    '// Este arquivo é a FONTE DA VERDADE das atividades extra desta faixa.',
    '// Atividade nova desta faixa entra AQUI, não no atividadesExtra.js (que hoje',
    '// é só um barril de compatibilidade que junta as quatro faixas de novo).',
    '//',
    '// Existe separado porque a criança é de UMA faixa: carregar as quatro para',
    '// usar uma mandava ~3/4 do maior arquivo do projeto para o celular à toa.',
    '//',
    '// Ao criar atividade nova, os 3 passos de sempre continuam valendo:',
    '// rota em App.jsx + tipoGradiente/hubItens em HomeCrianca + kidsLinks.js.',
    '// ──────────────────────────────────────────────────────────────────────',
    '',
  ].join('\n')
  const destino = `src/data/extra/${faixa}.js`
  await writeFile(caminho(destino), cabecalho + '\n' + blocos.join('\n'), 'utf8')
  const kb = (Buffer.byteLength(await readFile(caminho(destino), 'utf8'), 'utf8') / 1024).toFixed(0)
  console.log(`  ✓ ${destino.padEnd(34)} ${kb} kB`)
}

// ── 3. barril de compatibilidade ────────────────────────────────────────────────
const barril = [
  '// ──────────────────────────────────────────────────────────────────────',
  '// BARRIL DE COMPATIBILIDADE — não edite atividade aqui.',
  '//',
  '// As atividades moram em `src/data/extra/<faixa>.js`, um arquivo por faixa.',
  '// Este arquivo só junta as quatro de novo, com os mesmos nomes de export de',
  '// antes, para quem precisa de TODAS as faixas de uma vez (o painel do pai',
  '// procurando a atividade recomendada, a bancada de teste, o checador de ids).',
  '//',
  '// ⚠️ Quem precisa de UMA faixa só NÃO deve importar este arquivo: ele arrasta',
  '// as quatro. Importe `src/data/extra/<faixa>.js` direto, como o useAtividades faz.',
  '// ──────────────────────────────────────────────────────────────────────',
  '',
  ...FAIXAS.map(f => `import * as ${f} from './extra/${f}.js'`),
  '',
  ...EXPORTS.map(nome => [
    `export const ${nome} = {`,
    ...FAIXAS.map(f => `  ${f}: ${f}.${nome},`),
    '}',
  ].join('\n')),
  '',
].join('\n')
await writeFile(caminho('src/data/atividadesExtra.js'), barril, 'utf8')
console.log('  ✓ src/data/atividadesExtra.js       (barril)')

// ── 4. prova de que nada se perdeu ──────────────────────────────────────────────
// Sem isto a divisão seria um voto de confiança: o build passaria igual com uma
// faixa faltando. A comparação é do objeto inteiro, chave por chave, na ordem.
const depoisMod = await carregar('src/data/atividadesExtra.js', '?v=' + Date.now())
const depois = foto(depoisMod)

if (antes === depois) {
  console.log('\n✅ IDÊNTICO ao original — nenhuma atividade perdida ou alterada')
  process.exit(0)
}
// Se divergiu, dizer ONDE, senão o diagnóstico vira caça ao tesouro.
for (const e of EXPORTS) {
  for (const f of FAIXAS) {
    const a = JSON.stringify(original[e][f] || [])
    const b = JSON.stringify(depoisMod[e]?.[f] || [])
    if (a !== b) console.error(`❌ divergiu em ${e}.${f} (antes ${(original[e][f] || []).length} itens, depois ${(depoisMod[e]?.[f] || []).length})`)
  }
}
process.exit(1)
