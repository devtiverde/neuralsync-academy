/**
 * Mede o contraste REAL do texto na tela de intro da atividade (WCAG 2.1).
 *
 * Relato do Cláudio (02/08): "'Estude antes' e 'Sabia que…' pouco nítidos".
 * "Pouco nítido" é impressão; contraste é número. Este script transforma um no outro.
 *
 * POR QUE NÃO DÁ PARA CALCULAR NO PAPEL
 * Quase toda cor da intro é `rgba(255,255,255,0.4)` sobre um fundo que é gradiente
 * escuro + dois blobs radiais + um cartão translúcido por cima. O valor final do
 * pixel não está em lugar nenhum do CSS. Então: pinta o texto de transparente,
 * fotografa a caixa do elemento (aí o que sobra é exatamente o fundo que estava
 * atrás dele), tira a média dos pixels, e só então compõe a cor do texto com o
 * alfa dela por cima desse fundo. É a cor que o olho recebe.
 *
 * Uso: node auditar-contraste.mjs [porta]
 */
import { chromium } from 'playwright'
import sharp from 'sharp'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

// O fundo e o accent mudam por TIPO de atividade, e o contraste muda junto. Não
// basta pegar um tipo bonitinho: os que quebram são os de accent CLARO (âmbar,
// lima, ciano), onde texto branco tem menos margem. Estes cobrem as duas pontas.
const CASOS = [
  { tipo: 'formas',  id: 'exp_formas_brinquedos', faixa: 'exploradores' },
  { tipo: 'quiz',    id: null,                    faixa: 'construtores' },
  { tipo: 'robo',    id: null,                    faixa: 'criadores' },
  { tipo: 'blocos',  id: 'inv_blocos',            faixa: 'inventores' },
  { tipo: 'padrao',  id: null,                    faixa: 'construtores' }, // âmbar #f59e0b — o mais claro
  { tipo: 'colorir', id: null,                    faixa: 'exploradores' }, // lima #84CC16
  { tipo: 'silabas', id: null,                    faixa: 'exploradores' }, // ciano #06B6D4
  { tipo: 'alfabeto', id: null,                   faixa: 'construtores' }, // verde #1D9E75
  { tipo: 'cores',   id: null,                    faixa: 'criadores' },
  { tipo: 'inventor', id: null,                   faixa: 'inventores' },  // laranja #f97316
]

// WCAG 2.1: 4.5:1 para texto normal, 3:1 para texto grande (>=18.66px negrito ou >=24px).
const MINIMO = (px, peso) => (px >= 24 || (px >= 18.66 && peso >= 700)) ? 3 : 4.5

const canal = c => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4) }
const luminancia = ([r, g, b]) => 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)
function contraste(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}
const compor = (frente, alfa, fundo) => frente.map((c, i) => Math.round(c * alfa + fundo[i] * (1 - alfa)))
const lerCor = txt => {
  const m = txt.match(/rgba?\(([^)]+)\)/)
  if (!m) return null
  const p = m[1].split(',').map(s => parseFloat(s.trim()))
  return { rgb: [p[0], p[1], p[2]], alfa: p.length > 3 ? p[3] : 1 }
}

const achados = []

async function main() {
  const browser = await chromium.launch()

  for (const caso of CASOS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
    await ctx.addInitScript(f => {
      try {
        sessionStorage.setItem('ns_dev_bypass', '1')
        localStorage.setItem('ns_active_child', JSON.stringify({
          id: '00000000-0000-4000-8000-000000000001', nome: 'Teste QA', faixa_etaria: f, nivel: 3, xp: 420,
        }))
      } catch { /* modo privado */ }
    }, caso.faixa)
    await ctx.route('**/rest/v1/**', r => r.request().method() === 'GET'
      ? r.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
      : r.continue())

    const page = await ctx.newPage()
    const url = `${BASE}/dev/atividade/${caso.tipo}` + (caso.id ? `?id=${encodeURIComponent(caso.id)}` : '')
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)

    // Todo nó de texto visível da coluna direita e do hero.
    const alvos = await page.evaluate(() => {
      const out = []
      const raiz = document.querySelector('.intro-cols') || document.body
      for (const el of raiz.querySelectorAll('*')) {
        if (el.childElementCount !== 0) continue
        const txt = (el.textContent || '').trim()
        if (!txt || txt.length < 2) continue
        // Emoji NÃO é tingido por `color` — é uma imagem colorida, e a cor
        // computada do elemento não tem nada a ver com o que aparece. Medir "🧸"
        // como se fosse texto preto dá 1.14:1 e é puro ruído: a primeira rodada
        // acusou 14 "problemas" que eram emojis. Só entra o que tem letra ou número.
        if (!/[\p{L}\p{N}]/u.test(txt)) continue
        const r = el.getBoundingClientRect()
        if (r.width < 8 || r.height < 6) continue
        const s = getComputedStyle(el)
        if (s.visibility === 'hidden' || s.display === 'none' || parseFloat(s.opacity) === 0) continue
        el.dataset.nsContraste = String(out.length)
        out.push({
          i: out.length, texto: txt.slice(0, 42), cor: s.color,
          px: parseFloat(s.fontSize), peso: parseInt(s.fontWeight, 10) || 400,
          box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        })
      }
      return out
    })

    // Some com o texto (só a tinta das letras) e fotografa: o que resta na caixa
    // é o fundo verdadeiro, com gradiente, blob e cartão translúcido incluídos.
    await page.addStyleTag({ content: '[data-ns-contraste]{color:transparent !important}' })
    await page.waitForTimeout(150)
    const png = await page.screenshot({ type: 'png' })
    const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

    for (const a of alvos) {
      const { x, y, w, h } = a.box
      // MEDIANA, não média: um rótulo como "🚀 Começar" continua exibindo o emoji
      // mesmo com a cor transparente, e esses pixels coloridos puxariam a média do
      // fundo para longe do valor real. A mediana ignora a minoria discrepante.
      const canais = [[], [], []]
      for (let py = Math.max(0, y); py < Math.min(info.height, y + h); py++) {
        for (let px = Math.max(0, x); px < Math.min(info.width, x + w); px++) {
          const o = (py * info.width + px) * info.channels
          canais[0].push(data[o]); canais[1].push(data[o + 1]); canais[2].push(data[o + 2])
        }
      }
      if (!canais[0].length) continue
      const fundo = canais.map(c => { c.sort((m, n) => m - n); return c[Math.floor(c.length / 2)] })
      const c = lerCor(a.cor)
      if (!c) continue
      const efetiva = compor(c.rgb, c.alfa, fundo)
      const razao = contraste(efetiva, fundo)
      const min = MINIMO(a.px, a.peso)
      if (razao < min) {
        achados.push({
          caso: caso.id || caso.tipo, texto: a.texto, cor: a.cor,
          px: a.px, razao: razao.toFixed(2), min,
          fundo: fundo.map(v => Math.round(v)).join(','),
        })
      }
    }

    await ctx.close()
  }

  await browser.close()

  if (!achados.length) {
    console.log('✅ Nenhum texto abaixo do mínimo WCAG na tela de intro.')
    process.exit(0)
  }
  // Agrupa por cor: o mesmo `rgba(255,255,255,0.4)` reprova em vários lugares e
  // corrigir a cor conserta todos de uma vez. Listar ocorrência por ocorrência
  // faria parecer que são dezenas de problemas diferentes.
  const porCor = {}
  for (const a of achados) {
    const k = `${a.cor} @ ${a.px}px`
    ;(porCor[k] ||= []).push(a)
  }
  console.log(`❌ ${achados.length} textos abaixo do mínimo WCAG, em ${Object.keys(porCor).length} cores distintas:\n`)
  for (const [cor, lista] of Object.entries(porCor).sort((a, b) => b[1].length - a[1].length)) {
    const pior = lista.reduce((m, x) => (+x.razao < +m.razao ? x : m))
    console.log(`  ${cor}`)
    console.log(`    ${lista.length} ocorrência(s) · pior razão ${pior.razao}:1 (mínimo ${pior.min}:1)`)
    console.log(`    ex: "${pior.texto}"`)
  }
  process.exit(1)
}

main().catch(e => { console.error('Erro:', e); process.exit(2) })
