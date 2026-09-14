/**
 * importar-svg-colorir.mjs — converte um SVG de verdade em desenho de colorir.
 *
 * Por que existe: até hoje cada desenho era geometria escrita À MÃO (círculo, elipse,
 * polígono, raios). Isso custa uma tarde por desenho e é o motivo de só existirem 7 por
 * faixa. Clipart vetorial do mundo real é `<path>` com curva de Bézier — o componente
 * passou a desenhar `path`, e este script faz a ponte.
 *
 * O que ele faz, e por que cada passo:
 *  1. Lê as formas do SVG (path, circle, rect, ellipse, polygon).
 *  2. **Descarta a cor de origem.** Página de colorir nasce em branco; se a arte vier
 *     pintada, a criança não tem o que fazer.
 *  3. Normaliza para o viewBox 300 que o resto do projeto usa — senão o desenho entra
 *     com escala errada e some, ou estoura.
 *  4. **Mede cada região e grava `bbox`.** É o que deixa o `auditar-colorir` continuar
 *     funcionando: sem medida, região minúscula passaria calada e a criança não
 *     conseguiria acertar o dedo nela.
 *  5. Manda para `decorativo` o que é detalhe (olho, boca, traço fino) em vez de alvo
 *     obrigatório de pintura — mesma regra do redesenho de 08/08.
 *
 * ⚠️ LICENÇA É DECISÃO DE QUEM PUBLICA, NÃO DO SCRIPT. Use fonte CC0 / domínio público
 * (openclipart.org, publicdomainvectors.org, freesvg.org, SVG Repo filtrando CC0).
 * O script grava o campo `fonte` no desenho justamente para essa procedência não se
 * perder — produto pago com arte de licença desconhecida é risco, não economia.
 *
 * uso: node scripts/importar-svg-colorir.mjs <arquivo.svg> [--id exp_colorir_gato]
 *                                            [--nome "Gato"] [--fonte "openclipart/123 (CC0)"]
 *                                            [--max 8]   (máximo de regiões pintáveis)
 */
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'

const args = process.argv.slice(2)
const arquivo = args.find(a => !a.startsWith('--'))
const opt = (nome, padrao) => {
  const i = args.indexOf(`--${nome}`)
  return i >= 0 && args[i + 1] ? args[i + 1] : padrao
}
if (!arquivo) {
  console.error('uso: node scripts/importar-svg-colorir.mjs <arquivo.svg> [--id ...] [--nome ...] [--fonte ...] [--max 8]')
  process.exit(1)
}

const VIEWBOX = 300            // convenção do projeto
const PISO_PINTAVEL = 24       // px na tela de 360px — WCAG 2.5.8 AA
const LARGURA_REF = 288        // quanto o SVG ocupa num celular de 360px
const MAX = Number(opt('max', 10))

const svg = readFileSync(arquivo, 'utf8')

// ── 1. caixa do SVG de origem ───────────────────────────────────────────────
const mVB = svg.match(/viewBox\s*=\s*["']([-\d.eE\s,]+)["']/)
let [vx, vy, vw, vh] = mVB
  ? mVB[1].trim().split(/[\s,]+/).map(Number)
  : [0, 0, Number((svg.match(/width\s*=\s*["']([\d.]+)/) || [])[1] || 300),
           Number((svg.match(/height\s*=\s*["']([\d.]+)/) || [])[1] || 300)]
if (!vw || !vh) { console.error('❌ SVG sem viewBox nem width/height utilizáveis'); process.exit(1) }

// ── 2. achatar curvas para medir de verdade ─────────────────────────────────
/** Devolve todos os pontos por onde o traçado passa. Bézier é amostrada, não chutada:
 *  usar os pontos de CONTROLE daria caixa MAIOR que a curva — e erro para cima aqui
 *  aprovaria região pequena demais, que é exatamente o que não pode passar. */
function pontosDoPath(d) {
  const pts = []
  const nums = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g
  const comandos = d.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || []
  let x = 0, y = 0, sx = 0, sy = 0, ctrlX = 0, ctrlY = 0, prev = ''
  const bez = (p0, p1, p2, p3) => {
    for (let i = 1; i <= 16; i++) {
      const t = i / 16, u = 1 - t
      pts.push([
        u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
        u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1],
      ])
    }
  }
  for (const c of comandos) {
    const tipo = c[0]
    const n = (c.slice(1).match(nums) || []).map(Number)
    const rel = tipo === tipo.toLowerCase()
    let i = 0
    const T = tipo.toUpperCase()
    if (T === 'Z') { x = sx; y = sy; pts.push([x, y]); prev = T; continue }
    while (i < n.length) {
      if (T === 'M' || T === 'L') {
        x = rel ? x + n[i++] : n[i++]; y = rel ? y + n[i++] : n[i++]
        if (T === 'M' && pts.length === 0) { sx = x; sy = y }
        if (T === 'M' && i === 2) { sx = x; sy = y }
        pts.push([x, y])
      } else if (T === 'H') { x = rel ? x + n[i++] : n[i++]; pts.push([x, y]) }
      else if (T === 'V') { y = rel ? y + n[i++] : n[i++]; pts.push([x, y]) }
      else if (T === 'C') {
        const p0 = [x, y]
        const p1 = [rel ? x + n[i++] : n[i++], rel ? y + n[i++] : n[i++]]
        const p2 = [rel ? x + n[i++] : n[i++], rel ? y + n[i++] : n[i++]]
        const p3 = [rel ? x + n[i++] : n[i++], rel ? y + n[i++] : n[i++]]
        bez(p0, p1, p2, p3); ctrlX = p2[0]; ctrlY = p2[1]; x = p3[0]; y = p3[1]
      } else if (T === 'S') {
        const p0 = [x, y]
        const p1 = 'CS'.includes(prev) ? [2*x - ctrlX, 2*y - ctrlY] : [x, y]
        const p2 = [rel ? x + n[i++] : n[i++], rel ? y + n[i++] : n[i++]]
        const p3 = [rel ? x + n[i++] : n[i++], rel ? y + n[i++] : n[i++]]
        bez(p0, p1, p2, p3); ctrlX = p2[0]; ctrlY = p2[1]; x = p3[0]; y = p3[1]
      } else if (T === 'Q' || T === 'T') {
        const p0 = [x, y]
        const q = T === 'Q'
          ? [rel ? x + n[i++] : n[i++], rel ? y + n[i++] : n[i++]]
          : ('QT'.includes(prev) ? [2*x - ctrlX, 2*y - ctrlY] : [x, y])
        const p3 = [rel ? x + n[i++] : n[i++], rel ? y + n[i++] : n[i++]]
        // quadrática vira cúbica equivalente
        bez(p0, [p0[0] + 2/3*(q[0]-p0[0]), p0[1] + 2/3*(q[1]-p0[1])],
                [p3[0] + 2/3*(q[0]-p3[0]), p3[1] + 2/3*(q[1]-p3[1])], p3)
        ctrlX = q[0]; ctrlY = q[1]; x = p3[0]; y = p3[1]
      } else if (T === 'A') {
        i += 5                                   // rx ry rot arcoGrande varredura
        x = rel ? x + n[i++] : n[i++]; y = rel ? y + n[i++] : n[i++]
        pts.push([x, y])                         // só as pontas: arco é raro em clipart
      } else { break }
      prev = T
    }
  }
  return pts
}

const caixa = pts => {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1])
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
}

// ── 3. colher as formas ─────────────────────────────────────────────────────
const formas = []
for (const m of svg.matchAll(/<path\b[^>]*\bd\s*=\s*["']([^"']+)["'][^>]*>/g)) {
  formas.push({ tipo: 'path', d: m[1].replace(/\s+/g, ' ').trim(), tag: m[0] })
}
for (const m of svg.matchAll(/<circle\b[^>]*>/g)) {
  const g = a => Number((m[0].match(new RegExp(a + '\\s*=\\s*["\']([-\\d.]+)')) || [])[1])
  if (g('r')) formas.push({ tipo: 'circle', props: { cx: g('cx') || 0, cy: g('cy') || 0, r: g('r') }, tag: m[0] })
}
for (const m of svg.matchAll(/<ellipse\b[^>]*>/g)) {
  const g = a => Number((m[0].match(new RegExp(a + '\\s*=\\s*["\']([-\\d.]+)')) || [])[1])
  if (g('rx')) formas.push({ tipo: 'ellipse', props: { cx: g('cx') || 0, cy: g('cy') || 0, rx: g('rx'), ry: g('ry') || g('rx') }, tag: m[0] })
}
for (const m of svg.matchAll(/<rect\b[^>]*>/g)) {
  const g = a => Number((m[0].match(new RegExp(a + '\\s*=\\s*["\']([-\\d.]+)')) || [])[1])
  if (g('width')) formas.push({ tipo: 'rect', props: { x: g('x') || 0, y: g('y') || 0, width: g('width'), height: g('height'), rx: g('rx') || 0 }, tag: m[0] })
}
for (const m of svg.matchAll(/<polygon\b[^>]*\bpoints\s*=\s*["']([^"']+)["'][^>]*>/g)) {
  formas.push({ tipo: 'polygon', props: { points: m[1].replace(/\s+/g, ' ').trim() }, tag: m[0] })
}

if (!formas.length) { console.error('❌ nenhuma forma encontrada no SVG'); process.exit(1) }

// ── 4. normalizar para o viewBox do projeto ─────────────────────────────────
const escala = VIEWBOX / Math.max(vw, vh)
const desX = (VIEWBOX - vw * escala) / 2 - vx * escala
const desY = (VIEWBOX - vh * escala) / 2 - vy * escala
const T = (x, y) => [ +(x * escala + desX).toFixed(1), +(y * escala + desY).toFixed(1) ]

function transformar(f) {
  if (f.tipo === 'path') {
    // reescreve os números do `d` mantendo as letras de comando
    let i = 0
    const d = f.d.replace(/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g, n => {
      const v = Number(n)
      const eixoX = i++ % 2 === 0
      return String(+(v * escala + (eixoX ? desX : desY)).toFixed(1))
    })
    // ⚠️ o `replace` acima só é correto para comandos absolutos com pares x,y.
    // Comando relativo ou H/V misturam a paridade — por isso o script AVISA.
    const relativo = /[mlhvcsqtaz]/.test(f.d)
    return { ...f, d, relativo }
  }
  const p = { ...f.props }
  if (f.tipo === 'circle')  { [p.cx, p.cy] = T(p.cx, p.cy); p.r *= escala }
  if (f.tipo === 'ellipse') { [p.cx, p.cy] = T(p.cx, p.cy); p.rx *= escala; p.ry *= escala }
  if (f.tipo === 'rect')    { [p.x, p.y] = T(p.x, p.y); p.width *= escala; p.height *= escala; p.rx *= escala }
  if (f.tipo === 'polygon') {
    p.points = p.points.split(' ').map(par => { const [a, b] = par.split(',').map(Number); return T(a, b).join(',') }).join(' ')
  }
  for (const k of Object.keys(p)) if (typeof p[k] === 'number') p[k] = +p[k].toFixed(1)
  return { ...f, props: p }
}

// ── 5. medir, classificar, emitir ───────────────────────────────────────────
let avisouRelativo = false
const regioes = formas.map((f, idx) => {
  const t = transformar(f)
  if (t.relativo) avisouRelativo = true
  let bbox
  if (t.tipo === 'path') {
    const [x1, y1, x2, y2] = caixa(pontosDoPath(t.d))
    bbox = [+(x2 - x1).toFixed(1), +(y2 - y1).toFixed(1)]
  } else if (t.tipo === 'circle')  bbox = [t.props.r * 2, t.props.r * 2]
  else if (t.tipo === 'ellipse')   bbox = [t.props.rx * 2, t.props.ry * 2]
  else if (t.tipo === 'rect')      bbox = [t.props.width, t.props.height]
  else {
    const [x1, y1, x2, y2] = caixa(t.props.points.split(' ').map(p => p.split(',').map(Number)))
    bbox = [+(x2 - x1).toFixed(1), +(y2 - y1).toFixed(1)]
  }
  const px = bbox.map(v => v / VIEWBOX * LARGURA_REF)
  return { ...t, idx, bbox, px, area: bbox[0] * bbox[1] }
})

// Maiores viram alvo de pintura; o resto é traço, como numa página de colorir de verdade.
const ordenadas = [...regioes].sort((a, b) => b.area - a.area)
const pintaveis = new Set(
  ordenadas.filter(r => Math.min(...r.px) >= PISO_PINTAVEL).slice(0, MAX).map(r => r.idx)
)

const id = opt('id', `exp_colorir_${basename(arquivo).replace(/\.svg$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '_')}`)
const nome = opt('nome', basename(arquivo).replace(/\.svg$/i, ''))
const fonte = opt('fonte', 'INFORMAR A FONTE E A LICENÇA')

const saida = {
  desenho: {
    viewBox: VIEWBOX,
    nome,
    fonte,
    regioes: regioes.map(r => {
      const base = { id: `r${r.idx + 1}`, tipo: r.tipo }
      if (!pintaveis.has(r.idx)) base.decorativo = true
      base.props = r.tipo === 'path' ? { d: r.d, bbox: r.bbox } : { ...r.props, bbox: r.bbox }
      return base
    }),
  },
}

console.log(`\n🖍️  ${basename(arquivo)} → ${regioes.length} formas`)
console.log(`   viewBox de origem ${vw}×${vh} → ${VIEWBOX} (escala ${escala.toFixed(3)})`)
console.log(`   pintáveis: ${pintaveis.size} · traço/decorativo: ${regioes.length - pintaveis.size}`)
const menores = regioes.filter(r => !pintaveis.has(r.idx) && Math.min(...r.px) < PISO_PINTAVEL).length
if (menores) console.log(`   ${menores} forma(s) abaixo de ${PISO_PINTAVEL}px viraram traço — o dedo não acertaria`)
if (avisouRelativo) {
  console.log(`\n   ⚠️  O \`d\` tem comando RELATIVO (letras minúsculas) ou H/V. A conversão de`)
  console.log(`      coordenada deste script assume pares absolutos x,y — confira o desenho na tela`)
  console.log(`      com \`npm run render-colorir\` antes de aceitar. Converter para absoluto na`)
  console.log(`      origem (Inkscape: Preferências → Entrada/Saída → Caminhos absolutos) evita isso.`)
}
console.log(`\n   id sugerido: ${id}`)
if (fonte.startsWith('INFORMAR')) console.log(`   🔴 preencha --fonte com origem + licença antes de publicar\n`)

console.log('// cole em src/data/extra/<faixa>.js')
console.log(JSON.stringify(saida, null, 2))
