// Mede o custo de PARTIDA num celular fraco: Pixel 5 + CPU 4× estrangulada +
// rede móvel. Alvo padrão: /auth de produção (não precisa login) — é onde o
// chunk de entrada (index-*.js) é parseado e executado, o maior custo inicial.
// Uso: node scripts/perf-celular.mjs [url] [cpuThrottle] [repeticoes]
import { chromium, devices } from 'playwright'

const URL = process.argv[2] || 'https://app.neuralsync.com.br/auth'
const CPU = Number(process.argv[3] || 4)   // 4× = celular de entrada
const N   = Number(process.argv[4] || 3)

const fmt = (n, u = 'ms') => `${Math.round(n)}${u}`

async function umaMedida(browser) {
  const context = await browser.newContext({ ...devices['Pixel 5'] })
  const page = await context.newPage()
  const client = await context.newCDPSession(page)
  await client.send('Emulation.setCPUThrottlingRate', { rate: CPU })
  // Rede móvel realista (~Fast 3G): ~1.6 Mbps down, 150ms RTT
  await client.send('Network.enable')
  await client.send('Network.emulateNetworkConditions', {
    offline: false, latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (0.75 * 1024 * 1024) / 8,
  })

  // contabiliza bytes de JS transferidos
  let jsBytes = 0, jsReqs = 0
  page.on('response', async (r) => {
    const ct = r.headers()['content-type'] || ''
    if (ct.includes('javascript')) {
      jsReqs++
      try { const b = await r.body(); jsBytes += b.length } catch { /* ignora */ }
    }
  })

  const t0 = Date.now()
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 })
  // espera a árvore React montar de verdade (o formulário aparecer)
  let tInteractive = null
  try {
    await page.waitForSelector('input[type=email], .auth-heading, h1', { timeout: 30000 })
    tInteractive = Date.now() - t0
  } catch { /* não montou */ }

  // Total Blocking Time (proxy): soma do que passa de 50ms em long tasks
  const metrics = await page.evaluate(() => new Promise((resolve) => {
    const nav = performance.getEntriesByType('navigation')[0] || {}
    const paints = performance.getEntriesByType('paint')
    const fcp = (paints.find(p => p.name === 'first-contentful-paint') || {}).startTime || null
    let tbt = 0, longCount = 0
    for (const e of performance.getEntriesByType('longtask')) { tbt += Math.max(0, e.duration - 50); longCount++ }
    // dá um tempo pra longtasks tardias entrarem
    setTimeout(() => resolve({
      dcl: nav.domContentLoadedEventEnd || null,
      load: nav.loadEventEnd || null,
      fcp, tbt, longCount,
      heapMB: (performance.memory ? performance.memory.usedJSHeapSize / 1048576 : null),
    }), 500)
  }))

  await context.close()
  return { tInteractive, jsBytes, jsReqs, ...metrics }
}

const browser = await chromium.launch()
console.log(`\nAlvo: ${URL}\nCPU: ${CPU}× estrangulada · rede ~Fast 3G · Pixel 5 · ${N} rodadas\n`)
const rows = []
for (let i = 0; i < N; i++) {
  const m = await umaMedida(browser)
  rows.push(m)
  console.log(`rodada ${i + 1}: interativo=${fmt(m.tInteractive)} · FCP=${fmt(m.fcp)} · DCL=${fmt(m.dcl)} · load=${fmt(m.load)} · TBT=${fmt(m.tbt)} (${m.longCount} long tasks) · JS=${(m.jsBytes/1024).toFixed(0)}kB em ${m.jsReqs} req · heap=${m.heapMB ? m.heapMB.toFixed(1)+'MB' : 'n/a'}`)
}
await browser.close()

// mediana
const med = (arr) => { const s = arr.filter(x => x != null).sort((a, b) => a - b); return s.length ? s[Math.floor(s.length/2)] : null }
console.log(`\n── MEDIANA ──`)
console.log(`Tempo até interativo: ${fmt(med(rows.map(r => r.tInteractive)))}`)
console.log(`First Contentful Paint: ${fmt(med(rows.map(r => r.fcp)))}`)
console.log(`Total Blocking Time: ${fmt(med(rows.map(r => r.tbt)))}  ← quanto a tela fica travada sem responder ao toque`)
console.log(`JS baixado: ${(med(rows.map(r => r.jsBytes))/1024).toFixed(0)}kB`)
console.log(`Heap JS: ${med(rows.map(r => r.heapMB))?.toFixed?.(1) ?? 'n/a'}MB`)
