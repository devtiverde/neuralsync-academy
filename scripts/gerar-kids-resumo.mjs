/**
 * Gera `src/data/kidsResumo.js` — o mínimo do Kids TV que a tela de intro precisa.
 *
 * POR QUE
 * `IntroAtividade.jsx` abre ANTES DE TODA atividade e importava `kidsData.js`
 * inteiro (21 kB gzip) para mostrar três coisas no cartão "Estude antes": o emoji,
 * o título e os primeiros 80 caracteres da introdução. As seções, os fatos e os
 * quizzes de 18 categorias viajavam junto, em toda abertura de atividade, para
 * nunca serem lidos ali.
 *
 * DERIVA
 * Arquivo gerado envelhece em silêncio — foi assim que um áudio passou a narrar o
 * texto errado. Por isso este script tem modo `--verificar`, ligado no `prebuild`:
 * se alguém mexer no `kidsData.js` e não regenerar, o BUILD QUEBRA e diz o que fazer.
 *
 * Uso: node scripts/gerar-kids-resumo.mjs            (grava)
 *      node scripts/gerar-kids-resumo.mjs --verificar (só confere; usado no prebuild)
 */
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { writeFile, readFile } from 'node:fs/promises'

const raiz = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..')
const p = rel => resolve(raiz, rel)

// Igual ao corte que a tela já fazia: `introducao.substring(0, 80)` + reticência.
// Guardar já cortado torna a linha da tela um no-op, sem mudar um pixel do que aparece.
const LIMITE_INTRO = 80

const { kidsData } = await import(pathToFileURL(p('src/data/kidsData.js')).href)

const linhas = Object.entries(kidsData).map(([chave, c]) => {
  const campos = [
    `titulo: ${JSON.stringify(c.titulo || '')}`,
    `emoji: ${JSON.stringify(c.emoji || '📚')}`,
    `introducao: ${JSON.stringify((c.introducao || '').substring(0, LIMITE_INTRO))}`,
  ]
  return `  ${/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(chave) ? chave : JSON.stringify(chave)}: { ${campos.join(', ')} },`
})

const conteudo = [
  '// ──────────────────────────────────────────────────────────────────────',
  '// GERADO por scripts/gerar-kids-resumo.mjs — NÃO EDITE À MÃO.',
  '// Para mudar algo aqui, mude `src/data/kidsData.js` e rode `npm run gerar-kids-resumo`.',
  '//',
  '// É o mínimo do Kids TV que a tela de intro precisa: emoji, título e os primeiros',
  `// ${LIMITE_INTRO} caracteres da introdução. Existe porque a intro abre antes de TODA atividade`,
  '// e importar o `kidsData.js` inteiro levava 21 kB gzip de seções, fatos e quizzes',
  '// para o celular da criança a cada abertura, para exibir três campos.',
  '//',
  '// O `prebuild` confere se este arquivo está em dia com o kidsData e QUEBRA O BUILD',
  '// se não estiver — arquivo gerado envelhece em silêncio se ninguém vigiar.',
  '// ──────────────────────────────────────────────────────────────────────',
  '',
  'export const kidsResumo = {',
  ...linhas,
  '}',
  '',
].join('\n')

const destino = p('src/data/kidsResumo.js')
const atual = await readFile(destino, 'utf8').catch(() => null)

if (process.argv.includes('--verificar')) {
  if (atual === null) {
    console.error('\n❌ src/data/kidsResumo.js não existe. Rode: npm run gerar-kids-resumo\n')
    process.exit(1)
  }
  // Normaliza a quebra de linha: o git converte LF->CRLF nesta máquina e isso
  // sozinho faria o build quebrar sem nenhuma diferença real de conteúdo.
  if (atual.replace(/\r\n/g, '\n') !== conteudo) {
    console.error('\n❌ src/data/kidsResumo.js está DESATUALIZADO em relação ao kidsData.js.')
    console.error('   Alguém mexeu no Kids TV e não regenerou o resumo que a tela de intro lê.')
    console.error('   Conserto: npm run gerar-kids-resumo\n')
    process.exit(1)
  }
  console.log(`✓ kidsResumo em dia (${linhas.length} categorias)`)
  process.exit(0)
}

await writeFile(destino, conteudo, 'utf8')
console.log(`✓ src/data/kidsResumo.js gravado — ${linhas.length} categorias, ${(Buffer.byteLength(conteudo) / 1024).toFixed(1)} kB`)
