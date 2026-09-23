/**
 * repro-offline.mjs — "o botão JÁ FIZ ESSA! +15 não está clicável"
 *
 * Relato do Cláudio (23/09): na categoria Leitura e Escrita o botão não responde.
 *
 * 🪤 VALIDAR O INSTRUMENTO ANTES DA MEDIDA: se o script simplesmente clicar e nada
 * mudar, isso NÃO prova que o botão está morto — pode ser o clique que não chegou.
 * Por isso este script faz três coisas, nesta ordem:
 *   1. prova que ACHA o botão e que ele está habilitado e visível (senão, para);
 *   2. prova que o clique CHEGA no elemento (contador próprio no `onclick` da página);
 *   3. só então observa se o pedido ao servidor saiu e o que a tela disse.
 *
 * O RPC é respondido aqui mesmo: a auditoria não pode creditar moeda de verdade.
 *
 * Uso: node repro-offline.mjs <porta> [--sem-filho]
 *   --sem-filho  apaga o `ns_active_child` para testar a hipótese "child null"
 */
import { chromium, devices } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5173'
const SEM_FILHO = process.argv.includes('--sem-filho')
// --sem-nada: nem localStorage nem banco têm filho. É o caso que ficava MUDO.
const SEM_NADA = process.argv.includes('--sem-nada')
const BASE = `http://localhost:${PORTA}`

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ ...devices['Pixel 5'] })
await prepararContexto(ctx)

if (SEM_FILHO || SEM_NADA) {
  // roda DEPOIS do addInitScript do harness, então desfaz o que ele pôs
  await ctx.addInitScript(() => { try { localStorage.removeItem('ns_active_child') } catch {} })
}

if (SEM_NADA) {
  await ctx.route('**/rest/v1/children**', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }))
}

const rpcs = []
await ctx.route('**/rest/v1/rpc/**', async route => {
  const url = route.request().url()
  const corpo = route.request().postData()
  rpcs.push({ url: url.split('/rpc/')[1], corpo })
  return route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ ok: true, ganho_xp: 0, ganho_coins: 15, xp: 420, coins: 265, nivel: 3, streak: 4 }),
  })
})

const pag = await ctx.newPage()
const erros = []
pag.on('pageerror', e => erros.push(String(e)))
pag.on('console', m => { if (m.type() === 'error') erros.push('console: ' + m.text()) })

await pag.goto(`${BASE}/atividades-offline`, { waitUntil: 'networkidle' })
await pag.waitForTimeout(700)

console.log(`\n🔎 ${SEM_FILHO ? 'SEM ns_active_child' : 'COM ns_active_child'} — ${BASE}/atividades-offline`)
console.log('   URL final:', new URL(pag.url()).pathname)

// 1. ir para Leitura e Escrita
const aba = pag.getByRole('button', { name: /Leitura e Escrita/i })
console.log('   aba "Leitura e Escrita" encontrada:', await aba.count() > 0)
if (await aba.count() > 0) { await aba.first().click(); await pag.waitForTimeout(400) }

// 2. achar o botão e provar que ele está clicável
const botoes = pag.getByRole('button', { name: /J.? fiz essa/i })
const n = await botoes.count()
console.log('   botões "Já fiz essa":', n)
if (n === 0) {
  console.log('   ⛔ nenhum botão — a medida para aqui (não concluir "está morto")')
  await navegador.close(); process.exit(1)
}
const btn = botoes.first()
const rotulo = (await btn.textContent())?.trim()
console.log('   rótulo:', JSON.stringify(rotulo))
console.log('   habilitado:', await btn.isEnabled(), '· visível:', await btn.isVisible())
const cx = await btn.boundingBox()
console.log('   caixa:', cx ? `${Math.round(cx.width)}×${Math.round(cx.height)} em (${Math.round(cx.x)},${Math.round(cx.y)})` : 'SEM CAIXA')

// quem recebe o dedo no centro do botão? (elemento por cima = clique roubado)
const porCima = await pag.evaluate(([x, y]) => {
  const el = document.elementFromPoint(x, y)
  return el ? `${el.tagName}.${el.className?.toString().slice(0, 40)} "${(el.textContent || '').trim().slice(0, 40)}"` : 'nada'
}, [cx.x + cx.width / 2, cx.y + cx.height / 2])
console.log('   elemento no centro do botão:', porCima)

// 3. marcador: o clique chegou no elemento?
await btn.evaluate(el => { el.addEventListener('click', () => { window.__chegou = (window.__chegou || 0) + 1 }) })
const antes = (await btn.textContent())?.trim()
await btn.click()
await pag.waitForTimeout(1500)

console.log('   clique chegou no elemento:', await pag.evaluate(() => window.__chegou || 0), 'vez(es)')
console.log('   RPC disparado:', rpcs.length ? rpcs.map(r => r.url + ' ' + (r.corpo || '')).join(' | ') : 'NENHUM  ← handler não rodou')
const depois = (await botoes.first().textContent())?.trim()
console.log('   rótulo antes/depois:', JSON.stringify(antes), '→', JSON.stringify(depois))
// 🪤 procurar "perfil" solto casava com o LINK "Perfil" da barra lateral. O toast é
// um elemento fixo no topo com z-index 1000 — é por aí que ele se identifica.
const msg = await pag.evaluate(() => {
  for (const el of document.querySelectorAll('div')) {
    const st = getComputedStyle(el)
    if (st.position === 'fixed' && Number(st.zIndex) >= 1000 && el.getBoundingClientRect().top < 200) {
      const t = (el.textContent || '').trim()
      if (t && t.length < 220) return t
    }
  }
  return null
})
console.log('   AVISO na tela:', msg ? JSON.stringify(msg) : 'NENHUM 🔴 (tela muda)')
if (erros.length) console.log('   erros de JS:', erros.slice(0, 4))

await navegador.close()
