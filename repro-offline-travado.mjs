/**
 * repro-offline-travado.mjs — uma falha de rede mata TODOS os botões da tela
 *
 * HIPÓTESE
 * `marcarFeita` faz `setCreditando(id)` → `await creditarBonus(...)` → `setCreditando(null)`.
 * `chamar()` (lib/economia.js) NÃO tem try/catch em volta do `supabase.rpc`: ele trata
 * `error` devolvido, mas uma falha de REDE faz o `fetch` REJEITAR a promessa. Aí o
 * `await` propaga, `setCreditando(null)` nunca roda e `creditando` fica preso no id.
 *
 * A partir daí `if (!child || creditando) return` barra TODO clique — e os outros
 * botões não ficam desabilitados (o `ocupado` deles é falso), então continuam com a
 * cara de sempre e não fazem absolutamente nada. Que é o relato: "não está clicável".
 *
 * 🪤 VALIDAR O INSTRUMENTO: antes de derrubar a rede, o teste exige que um clique
 * NORMAL funcione. Se o primeiro clique já não funcionasse, o resultado do segundo
 * não provaria nada.
 *
 * Uso: node repro-offline-travado.mjs <porta>
 */
import { chromium, devices } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ ...devices['Pixel 5'] })
await prepararContexto(ctx)

let modo = 'ok'          // 'ok' | 'queda'
let chamadas = 0
await ctx.route('**/rest/v1/rpc/**', route => {
  chamadas++
  if (modo === 'queda') return route.abort('failed')   // falha de REDE, não erro HTTP
  return route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ ok: true, ganho_xp: 0, ganho_coins: 15, xp: 420, coins: 265, nivel: 3, streak: 4 }),
  })
})

const pag = await ctx.newPage()
const erros = []
pag.on('pageerror', e => erros.push(String(e).slice(0, 120)))

await pag.goto(`${BASE}/atividades-offline`, { waitUntil: 'networkidle' })
await pag.waitForTimeout(600)
await pag.getByRole('button', { name: /Leitura e Escrita/i }).first().click()
await pag.waitForTimeout(400)

const btns = () => pag.getByRole('button', { name: /J.? fiz essa/i })

// ── 1. instrumento: um clique normal precisa funcionar ────────────────────────
console.log('\n1️⃣  VALIDAÇÃO DO INSTRUMENTO — clique com a rede boa')
let antes = chamadas
await btns().first().click()
await pag.waitForTimeout(1000)
const funcionouNormal = chamadas > antes
console.log('   pedido saiu:', funcionouNormal ? 'SIM ✅' : 'NÃO ⛔ (o teste não vale, pare aqui)')
console.log('   botões restantes:', await btns().count())
if (!funcionouNormal) { await navegador.close(); process.exit(2) }

// ── 2. a queda ────────────────────────────────────────────────────────────────
console.log('\n2️⃣  UMA FALHA DE REDE (uma só)')
modo = 'queda'
antes = chamadas
await btns().first().click()
await pag.waitForTimeout(1500)
console.log('   pedido tentado:', chamadas > antes ? 'SIM' : 'NÃO')
const rotuloDoQueFalhou = (await btns().first().textContent())?.trim()
console.log('   rótulo do botão que falhou:', JSON.stringify(rotuloDoQueFalhou))
const msg = pag.locator('text=/Não deu para registrar|NeuralCoins|já ganhou/i').first()
console.log('   avisou a criança:', await msg.count() ? JSON.stringify((await msg.textContent()).trim()) : 'NÃO — tela muda 🔴')

// ── 3. a rede volta. os OUTROS botões ainda funcionam? ───────────────────────
console.log('\n3️⃣  REDE DE VOLTA — clicar em OUTRO botão, que nunca falhou')
modo = 'ok'
const total = await btns().count()
const outro = btns().nth(Math.min(2, total - 1))
console.log('   rótulo:', JSON.stringify((await outro.textContent())?.trim()))
console.log('   desabilitado?', !(await outro.isEnabled()), '(se false, ele PARECE clicável)')
antes = chamadas
await outro.click()
await pag.waitForTimeout(1500)
const vivo = chamadas > antes
console.log('   pedido saiu:', vivo ? 'SIM ✅ tela sã' : 'NÃO 🔴 TELA TRAVADA — botão com cara de clicável que não faz nada')

if (erros.length) console.log('\n   erros de JS na página:', erros.slice(0, 3))
console.log(`\n   VEREDITO: ${vivo ? 'hipótese REFUTADA' : 'hipótese CONFIRMADA — uma falha de rede mata a tela inteira até recarregar'}`)
await navegador.close()
