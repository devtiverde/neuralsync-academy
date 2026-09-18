/**
 * preparar-colorir-imagem.mjs — transforma um desenho de traço em página de colorir.
 *
 * O QUE ELE FAZ, E POR QUE CADA PASSO
 *  1. Tira a cor e endurece o traço. Desenho baixado costuma vir cinza, com sombra
 *     ou fundo levemente colorido; o balde de tinta precisa de preto e branco limpos,
 *     senão o "cinza claro" vira área pintável e o desenho se enche de sujeira.
 *  2. Apara a moldura branca e deixa uma margem. Desenho colado no canto fica com
 *     área de fundo grudada no traço e vaza tinta pela borda.
 *  3. Padroniza o tamanho. Imagem de 4000px trava celular fraco no cálculo das áreas;
 *     abaixo de ~700px o traço fica grosso e come as áreas pequenas.
 *  4. **CONFERE se serve** rodando o MESMO rotulador que o app usa em tempo de
 *     execução (`src/lib/balde.js`). É isso que separa "converteu" de "funciona":
 *     um desenho com o contorno aberto tem UMA área só — a tinta vaza para o
 *     desenho inteiro — e só dá para saber contando.
 *
 * ⚠️ LICENÇA É DECISÃO DE QUEM PUBLICA. O campo `--fonte` é obrigatório e vai gravado
 * no dado; num produto pago, arte de origem desconhecida é risco, não economia.
 *
 * uso:
 *   node scripts/preparar-colorir-imagem.mjs <arquivo> --slug gato --titulo "Gato"
 *        --faixa exploradores --fonte "openclipart #123 (CC0)"
 *        [--limiar 190] [--largura 900]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { basename } from 'node:path'
import sharp from 'sharp'
import { rotularAreas } from '../src/lib/balde.js'

const args = process.argv.slice(2)
const entrada = args.find(a => !a.startsWith('--'))
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] ? args[i + 1] : d }

if (!entrada || !existsSync(entrada)) {
  console.error('uso: node scripts/preparar-colorir-imagem.mjs <arquivo> --slug <slug> --titulo "<t>" --faixa <faixa> --fonte "<origem e licença>"')
  process.exit(1)
}

const slug    = opt('slug', basename(entrada).replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '_'))
const titulo  = opt('titulo', slug)
const faixa   = opt('faixa', 'exploradores')
const fonte   = opt('fonte', '')
const limiar  = Number(opt('limiar', 190))
const largura = Number(opt('largura', 900))

const PREFIXO = { exploradores: 'exp', construtores: 'con', criadores: 'cri', inventores: 'inv' }
const XP = { exploradores: 60, construtores: 80, criadores: 100, inventores: 120 }
if (!PREFIXO[faixa]) { console.error(`faixa inválida: ${faixa}`); process.exit(1) }
if (!fonte) {
  console.error('❌ --fonte é obrigatório: escreva de onde veio o desenho e sob que licença.')
  console.error('   Ex: --fonte "openclipart.org/detail/12345 (CC0)"')
  process.exit(1)
}

// ── 1 a 3: limpar, aparar, padronizar ───────────────────────────────────────
const base = sharp(readFileSync(entrada), { density: 300 })
const meta = await base.metadata()

const limpo = await base
  .flatten({ background: '#FFFFFF' })   // achata transparência em branco
  .greyscale()
  .normalise()                          // usa a faixa toda: traço fraco vira traço
  .threshold(limiar)                    // preto e branco duros
  .trim({ background: '#FFFFFF', threshold: 10 })
  .resize({ width: largura, fit: 'inside', withoutEnlargement: false, background: '#FFFFFF' })
  .extend({ top: 24, bottom: 24, left: 24, right: 24, background: '#FFFFFF' })
  .png({ compressionLevel: 9 })
  .toBuffer()

// ── 4: conferir com o MESMO rotulador do app ────────────────────────────────
const { data, info } = await sharp(limpo).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { total, contaveis, tamanhos, fundo, candidatas } = rotularAreas({
  width: info.width, height: info.height, data,
})

const pixels = info.width * info.height
const areaFundo = tamanhos[fundo] || 0
const maiores = [...contaveis].map(r => tamanhos[r]).sort((a, b) => b - a).slice(0, 5)

console.log(`\n🖌️  ${basename(entrada)}`)
console.log(`   origem ........... ${meta.width}×${meta.height} ${meta.format}`)
console.log(`   preparado ........ ${info.width}×${info.height} png`)
console.log(`   áreas pintáveis .. ${total}`)
// Fresta = área fechada que o dedo não alcança (rachadura do traço). Ela pinta,
// mas não conta no progresso — senão o desenho ficaria INCONCLUÍVEL. Fresta demais
// é sinal de traço sujo: vale tentar um `--limiar` mais alto.
console.log(`   frestas ignoradas  ${(candidatas?.length ?? total) - total}`)
console.log(`   fundo ............ ${(areaFundo / pixels * 100).toFixed(1)}% da folha`)
if (maiores.length) console.log(`   maiores áreas .... ${maiores.map(t => (t / pixels * 100).toFixed(1) + '%').join(' · ')}`)

const avisos = []
if (total === 0) avisos.push('nenhuma área fechada — o contorno está aberto e a tinta vai vazar pela folha inteira')
else if (total < 4) avisos.push(`só ${total} área(s) — o desenho fica pobre de pintar; procure um traço com mais partes fechadas`)
if (areaFundo / pixels > 0.80) avisos.push('o fundo ocupa mais de 80% da folha — provavelmente o traço tem falha e as partes de dentro se juntaram ao fundo')
if (total > 400) avisos.push(`${total} áreas — traço muito detalhado (hachura, textura); vira caça-níquel para criança pequena`)

if (avisos.length) {
  console.log('')
  avisos.forEach(a => console.log(`   ⚠️  ${a}`))
}

const serve = total >= 4 && areaFundo / pixels <= 0.80
if (!serve) {
  console.log(`\n❌ este desenho NÃO entra assim. Tente: --limiar mais alto (traço mais grosso, fecha falha)`)
  console.log(`   ou escolha outro desenho com contorno fechado.\n`)
  process.exit(1)
}

// ── gravar e emitir o dado ──────────────────────────────────────────────────
mkdirSync('public/colorir', { recursive: true })
const destino = `public/colorir/${slug}.png`
writeFileSync(destino, limpo)

const p = PREFIXO[faixa]
const xp = XP[faixa]
const bloco = `  {
    id: '${p}_colorir_${slug}',
    tipo: 'colorir',
    titulo: 'Colorir: ${titulo}',
    descricao: 'Pinte o desenho do jeito que você quiser!',
    emoji: '🎨',
    habilidade: 'Criatividade',
    xp_reward: ${xp},
    coins_reward: ${xp},
    tempo_estimado: 8,
    historinha: 'Um desenho esperando a sua cor! 🎨 Toque em cada pedacinho e pinte do jeito que você gosta.',
    dados: {
      imagem: {
        src: '/colorir/${slug}.png',
        fonte: '${String(fonte).replace(/'/g, "\\'")}',
        areas: ${total},
      },
    },
  },`

console.log(`\n✅ ${destino}  (${(limpo.length / 1024).toFixed(0)} kB)`)
console.log(`\n// cole em src/data/extra/${faixa}.js, dentro de colorirExtraPorFaixa:`)
console.log(bloco)
console.log(`\n// e em src/lib/kidsLinks.js:`)
console.log(`  ${p}_colorir_${slug}: 'formas_cores',\n`)
