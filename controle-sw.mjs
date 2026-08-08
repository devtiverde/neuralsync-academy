// Controle do Service Worker, agora do jeito certo: `serviceWorkers: 'block'` no CONTEXTO.
// (page.route em /sw.js nao funciona -- o script do worker nao passa pelo roteador da pagina.)
import { chromium, devices } from 'playwright'

const ALVO = process.argv[2] || 'https://app.neuralsync.com.br/'
const nav = await chromium.launch()

for (const modo of ['allow', 'block']) {
  const ctx = await nav.newContext({ ...devices['iPhone 13'], serviceWorkers: modo })
  const p = await ctx.newPage()
  const falhas = []
  p.on('requestfailed', r => { if (/fonts\./.test(r.url())) falhas.push(r.url().replace('https://fonts.','').slice(0,58)) })

  try {
    await p.goto(ALVO, { waitUntil: 'networkidle', timeout: 60000 })
    await p.evaluate(() => document.fonts.ready)
  } catch {}

  const controlada = await p.evaluate(() => !!navigator.serviceWorker?.controller).catch(() => 'n/d')
  const ok = await p.evaluate(async () => {
    try { await document.fonts.load('400 40px "Fredoka One"') } catch {}
    return document.fonts.check('400 40px "Fredoka One"')
  }).catch(() => false)

  console.log(`\n  serviceWorkers: ${modo}`)
  console.log(`     pagina controlada por SW: ${controlada}`)
  console.log(`     FREDOKA ONE CHEGOU: ${ok ? 'SIM' : 'NAO'}`)
  falhas.forEach(f => console.log(`       falhou: ${f}`))
  await ctx.close()
}
console.log('')
await nav.close()
