/**
 * repro-offline-alcance.mjs — o dedo ALCANÇA o botão "Já fiz essa"?
 *
 * O repro anterior provou que o HANDLER funciona: o clique do Playwright chega,
 * o RPC sai, a tela responde. Então "não está clicável" não é o código do botão.
 *
 * 🔑 Falta a outra pergunta, que é a que o Cláudio está fazendo sem saber:
 * *o dedo chega nesse ponto da tela?* `.click()` do Playwright rola até o elemento
 * e mira o centro — o dedo de verdade não faz isso. Se um elemento FIXO (o botão
 * flutuante de ajuda, o de feedback, a barra de baixo) estiver por cima naquele
 * ponto, o toque vai para o elemento de cima e a tela fica muda. Foi exatamente
 * assim na auditoria de alcance anterior, com a barra de 93px.
 *
 * Método: para cada botão, rolar até ele ficar visível e perguntar ao NAVEGADOR
 * quem está no ponto (`elementFromPoint`) — não ao script. Depois tocar de verdade
 * (`page.touchscreen.tap`) nas coordenadas e ver se o handler rodou.
 *
 * Uso: node repro-offline-alcance.mjs <porta>
 */
import { chromium, devices } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ ...devices['Pixel 5'] })
await prepararContexto(ctx)

let rpcs = 0
await ctx.route('**/rest/v1/rpc/**', route => {
  rpcs++
  return route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ ok: true, ganho_xp: 0, ganho_coins: 15, xp: 420, coins: 265, nivel: 3, streak: 4 }),
  })
})

const pag = await ctx.newPage()
await pag.goto(`${BASE}/atividades-offline`, { waitUntil: 'networkidle' })
await pag.waitForTimeout(600)
await pag.getByRole('button', { name: /Leitura e Escrita/i }).first().click()
await pag.waitForTimeout(400)

const vp = pag.viewportSize()
console.log(`\n👆 Alcance do dedo — Leitura e Escrita — tela ${vp.width}×${vp.height}\n`)

const botoes = pag.getByRole('button', { name: /J.? fiz essa/i })
const total = await botoes.count()
console.log(`   ${total} botões na categoria\n`)

const tapados = []
for (let i = 0; i < total; i++) {
  const b = botoes.nth(i)
  await b.scrollIntoViewIfNeeded()
  await pag.waitForTimeout(150)
  const cx = await b.boundingBox()
  if (!cx) { console.log(`   ${i + 1}. SEM CAIXA`); continue }
  const px = cx.x + cx.width / 2
  const py = cx.y + cx.height / 2

  const quem = await pag.evaluate(([x, y]) => {
    const el = document.elementFromPoint(x, y)
    if (!el) return { tag: 'FORA DA TELA', txt: '', fixo: false }
    // o elemento é fixo, ou está dentro de um fixo?
    let p = el, fixo = false, alvoFixo = ''
    while (p && p !== document.body) {
      if (getComputedStyle(p).position === 'fixed') { fixo = true; alvoFixo = (p.textContent || '').trim().slice(0, 30); break }
      p = p.parentElement
    }
    return { tag: el.tagName, txt: (el.textContent || '').trim().slice(0, 34), fixo, alvoFixo }
  }, [px, py])

  const ehOBotao = quem.txt.includes('Já fiz essa') || quem.txt.includes('Concluída')
  const marca = ehOBotao ? '✅' : '🔴'
  console.log(`   ${i + 1}. y=${Math.round(py)}  ${marca} no ponto: <${quem.tag}> "${quem.txt}"${quem.fixo ? `  ⚠️ FIXO ("${quem.alvoFixo}")` : ''}`)
  if (!ehOBotao) tapados.push({ i: i + 1, quem })
}

// toque de verdade no primeiro botão, sem o Playwright "ajudar"
console.log('\n   — toque real (touchscreen.tap) no 1º botão —')
const b1 = botoes.first()
await b1.scrollIntoViewIfNeeded()
await pag.waitForTimeout(200)
const c1 = await b1.boundingBox()
const antesRpc = rpcs
await pag.touchscreen.tap(c1.x + c1.width / 2, c1.y + c1.height / 2)
await pag.waitForTimeout(1200)
console.log('   RPC saiu com o toque:', rpcs > antesRpc ? 'SIM' : 'NÃO  ← o dedo não chegou')
const t = pag.locator('text=/NeuralCoins|já ganhou|Não deu para registrar/i').first()
console.log('   mensagem:', await t.count() ? JSON.stringify((await t.textContent()).trim()) : 'NENHUMA')

console.log(`\n   ${tapados.length} de ${total} botões com OUTRO elemento no ponto do dedo.`)
await navegador.close()
