// Audita o /checklist do DASHBOARD da TI Verde num viewport de celular.
//
// Mora aqui (neuralsync-academy) e NÃO no dashboard porque o `playwright` está instalado
// neste projeto — ESM resolve o import a partir do ARQUIVO, não do cwd.
// Ver [[feedback-playwright-script-no-projeto]].
//
//   node scripts/auditar-checklist-mobile.mjs [url]
//
// Mede o que o olho não vê: overflow horizontal elemento a elemento, alvos de toque
// pequenos demais, e conteúdo coberto pela barra fixa de baixo.
// 🪤 `fullPage` MENTE sobre overflow — por isso a medição é por `scrollWidth`, e elemento
//    a elemento, não só no body. Ver [[feedback-playwright-fullpage-overflow]] e
//    [[feedback-overflow-escondido-por-overflow-hidden]].

import { chromium } from 'playwright'

const BASE = process.argv[2] || 'http://localhost:5173'
const ROTA = '/checklist'
const LARGURA = 390   // iPhone 12/13/14
const ALTURA  = 844

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: LARGURA, height: ALTURA },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
})
// Sessão FALSA só para renderizar o layout localmente. `isLoggedIn()` lê o sessionStorage,
// então isto abre a casca do app — as APIs vão devolver 401 e tudo bem: o que se mede aqui
// é LAYOUT, não dado. Nada disso toca produção.
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem('dashboard_sessao_v2', JSON.stringify({
      token: 'teste-layout', usuario: 'teste', papel: 'tecnico',
    }))
  } catch (e) {}
})

const page = await ctx.newPage()

const erros = []
page.on('pageerror', e => erros.push('JS: ' + e.message))
page.on('console', m => { if (m.type() === 'error') erros.push('console: ' + m.text().slice(0, 160)) })

console.log(`\nabrindo ${BASE}${ROTA} em ${LARGURA}x${ALTURA}…`)
const resp = await page.goto(BASE + ROTA, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => ({ __erro: e.message }))
if (resp?.__erro) { console.log('  ❌ não abriu: ' + resp.__erro); await browser.close(); process.exit(2) }

await page.waitForTimeout(1200)

const url = page.url()
console.log(`  url final: ${url}`)
if (!url.includes('checklist')) {
  console.log('  ⚠️  REDIRECIONOU — provavelmente exige login. O teste abaixo é da tela que apareceu.')
}

// ── 1. overflow horizontal, elemento a elemento ──────────────────────────────
const over = await page.evaluate((vw) => {
  const ruins = []
  const docW = document.documentElement.scrollWidth
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    // vaza para a direita do viewport?
    if (r.right > vw + 1) {
      // é alcançável rolando algum ancestral? se sim, é scroll legítimo
      let p = el.parentElement, rolavel = false
      while (p) {
        const s = getComputedStyle(p)
        if ((s.overflowX === 'auto' || s.overflowX === 'scroll') && p.scrollWidth > p.clientWidth) { rolavel = true; break }
        p = p.parentElement
      }
      if (!rolavel) ruins.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className || '').slice(0, 70),
        right: Math.round(r.right),
        txt: (el.textContent || '').trim().slice(0, 45),
      })
    }
  }
  return { docW, ruins: ruins.slice(0, 12) }
}, LARGURA)

console.log(`\n== overflow horizontal ==`)
console.log(`  scrollWidth do documento: ${over.docW} (viewport ${LARGURA})`)
if (over.docW > LARGURA + 1) console.log(`  ❌ a PÁGINA rola de lado — ${over.docW - LARGURA}px a mais`)
else console.log('  ✅ a página não rola de lado')
if (over.ruins.length) {
  console.log(`  ${over.ruins.length} elemento(s) vazando SEM ancestral rolável:`)
  over.ruins.forEach(r => console.log(`     <${r.tag}> right=${r.right}  "${r.txt}"  .${r.cls}`))
} else console.log('  ✅ nenhum elemento inalcançável na horizontal')

// ── 2. alvos de toque pequenos ───────────────────────────────────────────────
const toques = await page.evaluate(() => {
  const MIN = 44
  const ruins = []
  for (const el of document.querySelectorAll('button, a, input, select, textarea, [role=button]')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    if (r.height < MIN || r.width < MIN) ruins.push({
      tag: el.tagName.toLowerCase(),
      w: Math.round(r.width), h: Math.round(r.height),
      txt: (el.textContent || el.getAttribute('aria-label') || el.type || '').trim().slice(0, 34),
    })
  }
  return ruins.slice(0, 15)
})
console.log(`\n== alvos de toque menores que 44px ==`)
if (!toques.length) console.log('  ✅ nenhum')
else toques.forEach(t => console.log(`  ⚠️  <${t.tag}> ${t.w}x${t.h}  "${t.txt}"`))

// ── 3. o que a barra fixa de baixo cobre ─────────────────────────────────────
const barra = await page.evaluate(() => {
  const fixos = [...document.querySelectorAll('*')].filter(el => {
    const s = getComputedStyle(el)
    if (s.position !== 'fixed') return false
    const r = el.getBoundingClientRect()
    return r.bottom >= window.innerHeight - 2 && r.height > 20
  })
  if (!fixos.length) return null
  const b = fixos[0].getBoundingClientRect()
  return { top: Math.round(b.top), altura: Math.round(b.height), vh: window.innerHeight }
})
console.log(`\n== barra fixa inferior ==`)
if (!barra) console.log('  (nenhuma barra fixa no rodapé)')
else {
  console.log(`  altura ${barra.altura}px, começa em y=${barra.top} de ${barra.vh}`)
  // rola até o fim e vê se algum controle fica embaixo dela
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(400)
  const cobertos = await page.evaluate((topoBarra) => {
    const ruins = []
    for (const el of document.querySelectorAll('button, a, input, select, textarea, [role=button]')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (getComputedStyle(el).position === 'fixed') continue
      const meioY = r.top + r.height / 2
      if (meioY > topoBarra) {
        const noTopo = document.elementFromPoint(Math.round(r.left + r.width / 2), Math.round(meioY))
        if (noTopo && !el.contains(noTopo) && !noTopo.contains(el))
          ruins.push({ tag: el.tagName.toLowerCase(), txt: (el.textContent || el.type || '').trim().slice(0, 34), y: Math.round(meioY) })
      }
    }
    return ruins.slice(0, 10)
  }, barra.top)
  if (!cobertos.length) console.log('  ✅ nenhum controle fica embaixo da barra (a folga de fim de página está certa)')
  else cobertos.forEach(c => console.log(`  ❌ COBERTO: <${c.tag}> "${c.txt}" em y=${c.y} — o toque abre OUTRA coisa`))
}

if (erros.length) {
  console.log(`\n== erros de JS/console ==`)
  ;[...new Set(erros)].slice(0, 8).forEach(e => console.log('  ❌ ' + e))
} else console.log('\n== nenhum erro de JS ==')

const destino = process.env.PRINT || 'checklist-mobile.png'
await page.screenshot({ path: destino, fullPage: true })
console.log(`\nprint salvo em ${destino}\n`)

await browser.close()
