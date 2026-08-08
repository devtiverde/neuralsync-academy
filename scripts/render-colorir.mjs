/**
 * render-colorir.mjs — desenha os 12 Colorir num contato só, para OLHAR.
 *
 * O `auditar-colorir.mjs` mede tamanho de alvo. Ele não sabe dizer se o desenho
 * ainda parece um sol depois de mexer na geometria — parte fora do lugar, peça
 * cobrindo outra, decorativo caindo no vazio. Isso só se vê olhando.
 *
 * Cada desenho aparece duas vezes: sem pintura (como a criança recebe) e
 * pintado (para conferir que o decorativo continua por cima do preenchimento).
 *
 * Uso: node scripts/render-colorir.mjs   → scripts/saida/colorir.png
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { colorirExtraPorFaixa as exploradores } from '../src/data/extra/exploradores.js'
import { colorirExtraPorFaixa as construtores } from '../src/data/extra/construtores.js'
import { colorirExtraPorFaixa as criadores }    from '../src/data/extra/criadores.js'
import { colorirExtraPorFaixa as inventores }   from '../src/data/extra/inventores.js'

const COR_VAZIA = '#E5E7EB'
const CONTORNO  = '#1F2937'
const AMOSTRA   = ['#EF4444', '#F97316', '#FACC15', '#22C55E', '#3B82F6', '#A855F7', '#EC4899', '#92400E']

function pontosRadiais(cx, cy, rInner, rOuter, n, i, largura = 0.32) {
  const passo = (2 * Math.PI) / n
  const meio = passo * largura
  const centro = passo * i
  return [
    [cx + rOuter * Math.cos(centro),        cy + rOuter * Math.sin(centro)],
    [cx + rInner * Math.cos(centro - meio), cy + rInner * Math.sin(centro - meio)],
    [cx + rInner * Math.cos(centro + meio), cy + rInner * Math.sin(centro + meio)],
  ].map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')
}

function svgDaRegiao(r, cor) {
  const dec = !!r.decorativo
  const fill = dec ? (r.cor || CONTORNO) : cor
  const traco = `stroke="${CONTORNO}" stroke-width="${dec ? 1.5 : 3}"`
  const p = r.props
  switch (r.tipo) {
    case 'circle':  return `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${fill}" ${traco}/>`
    case 'rect':    return `<rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}" rx="${p.rx || 0}" fill="${fill}" ${traco}/>`
    case 'ellipse': return `<ellipse cx="${p.cx}" cy="${p.cy}" rx="${p.rx}" ry="${p.ry}" fill="${fill}" ${traco}/>`
    case 'polygon': return `<polygon points="${p.points}" fill="${fill}" ${traco}/>`
    case 'radial':  return Array.from({ length: p.n }, (_, i) =>
      `<polygon points="${pontosRadiais(p.cx, p.cy, p.rInner, p.rOuter, p.n, i, p.largura)}" fill="${fill}" stroke="${CONTORNO}" stroke-width="2"/>`).join('')
    default: return ''
  }
}

/** Mesma ordenação do componente: decorativo por último, para ficar por cima. */
const ordenar = regioes => [...regioes].sort((a, b) => (a.decorativo ? 1 : 0) - (b.decorativo ? 1 : 0))

function svgDoDesenho(desenho, pintar) {
  let i = 0
  const corpos = ordenar(desenho.regioes).map(r => {
    const cor = r.decorativo ? COR_VAZIA : (pintar ? AMOSTRA[i++ % AMOSTRA.length] : COR_VAZIA)
    return svgDaRegiao(r, cor)
  }).join('')
  return `<svg viewBox="0 0 ${desenho.viewBox} ${desenho.viewBox}" width="200" height="200">${corpos}</svg>`
}

const TODAS = [
  ['exploradores (4–5)', exploradores],
  ['construtores (6–8)', construtores],
  ['criadores (9–11)',   criadores],
  ['inventores (12+)',   inventores],
]

let html = `<style>
  body{background:#15102a;color:#eee;font:13px system-ui;margin:0;padding:24px}
  h2{font-size:15px;margin:26px 0 10px;color:#c4b5fd;border-bottom:1px solid #33285a;padding-bottom:6px}
  .linha{display:flex;gap:18px;flex-wrap:wrap}
  .par{background:#fff;border-radius:12px;padding:8px;display:flex;gap:6px}
  figure{margin:0;text-align:center}
  figcaption{font-size:10px;color:#555;margin-top:2px}
  .rot{font-size:11px;color:#9b8fc4;margin:8px 0 4px}
</style>`

for (const [faixa, lista] of TODAS) {
  html += `<h2>${faixa}</h2><div class="linha">`
  for (const a of lista) {
    const d = a.dados.desenho
    const pint = d.regioes.filter(r => !r.decorativo).length
    const dec = d.regioes.length - pint
    html += `<div><div class="rot">${a.id} — ${pint} pintáveis${dec ? ` + ${dec} traço` : ''}</div>
      <div class="par">
        <figure>${svgDoDesenho(d, false)}<figcaption>como chega</figcaption></figure>
        <figure>${svgDoDesenho(d, true)}<figcaption>pintado</figcaption></figure>
      </div></div>`
  }
  html += `</div>`
}

mkdirSync('scripts/saida', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1500, height: 800 } })
await page.setContent(html)
await page.screenshot({ path: 'scripts/saida/colorir.png', fullPage: true })
await browser.close()
console.log('✅ scripts/saida/colorir.png')
