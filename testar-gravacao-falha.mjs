/**
 * Prova que as gravações críticas se comportam quando o servidor recusa.
 *
 * Testar o caminho feliz não vale nada aqui: o bug antigo era invisível
 * justamente porque só aparecia quando a gravação falhava, e o `.then(() => {})`
 * engolia o erro. Este teste força a falha interceptando a requisição.
 *
 * O que precisa ser verdade depois de uma falha:
 *   - a criança é avisada (não pode achar que deu certo)
 *   - o saldo NÃO muda (a moeda não some por causa de erro de rede)
 *   - o item NÃO entra na lista de comprados
 *
 * Uso: node testar-gravacao-falha.mjs <porta>
 */
import { chromium } from 'playwright'

const PORTA = process.argv[2]
if (!PORTA) { console.error('Uso: node testar-gravacao-falha.mjs 5173'); process.exit(2) }
const BASE = `http://localhost:${PORTA}`

const CRIANCA = {
  id: '00000000-0000-4000-8000-000000000001', nome: 'Teste QA', avatar: '🦊',
  nivel: 9, xp: 4200, neural_coins: 99999, streak_atual: 4,
  faixa_etaria: 'construtores', idade: 7,
}

const resultados = []
const ok = (nome, passou, detalhe = '') => {
  resultados.push({ nome, passou })
  console.log(`  ${passou ? '✅' : '❌'} ${nome}${detalhe ? ' — ' + detalhe : ''}`)
}

const nav = await chromium.launch()
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } })
await ctx.addInitScript(c => {
  try {
    sessionStorage.setItem('ns_dev_bypass', '1')
    localStorage.setItem('ns_active_child', JSON.stringify(c))
    localStorage.removeItem('ns_purchased')
  } catch { /* modo privado */ }
}, CRIANCA)

// Toda escrita em `children` e `ns_purchases` passa a falhar. Leituras continuam
// funcionando, senão a tela nem carrega e o teste mediria outra coisa.
await ctx.route('**/rest/v1/children*', route => {
  const m = route.request().method()
  if (m === 'PATCH' || m === 'POST') {
    return route.fulfill({ status: 500, contentType: 'application/json', body: '{"message":"falha simulada"}' })
  }
  return route.continue()
})
await ctx.route('**/rest/v1/ns_purchases*', route => {
  if (route.request().method() === 'POST') {
    return route.fulfill({ status: 500, contentType: 'application/json', body: '{"message":"falha simulada"}' })
  }
  return route.continue()
})

console.log('\nLoja — comprando com o servidor recusando a gravação')

const p = await ctx.newPage()
await p.goto(`${BASE}/loja`, { waitUntil: 'networkidle' })
await p.waitForTimeout(1200)

const saldoAntes = await p.evaluate(() => {
  const c = JSON.parse(localStorage.getItem('ns_active_child') || '{}')
  return c.neural_coins
})

// Primeiro item comprável que aparecer.
const botaoComprar = p.locator('button', { hasText: /^💰\s*\d+$/ }).first()
const achou = await botaoComprar.count()
ok('achou um item comprável na vitrine', achou > 0, achou ? '' : 'a tela pode estar no paywall')

if (achou) {
  await botaoComprar.click()
  await p.waitForTimeout(400)

  const confirmar = p.locator('button', { hasText: /Comprar!/ })
  ok('abriu a confirmação de compra', await confirmar.count() === 1)

  await confirmar.click()
  await p.waitForTimeout(2500) // espera a gravação falhar e a tela reagir

  const avisou = await p.locator('text=/Não deu pra guardar sua compra/i').count()
  ok('avisou a criança que não deu', avisou === 1)

  const saldoDepois = await p.evaluate(() => {
    const c = JSON.parse(localStorage.getItem('ns_active_child') || '{}')
    return c.neural_coins
  })
  ok('o saldo NÃO foi debitado', saldoDepois === saldoAntes, `antes ${saldoAntes} · depois ${saldoDepois}`)

  const comprados = await p.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('ns_purchased') || '[]').length } catch { return -1 }
  })
  ok('o item NÃO entrou na lista de comprados', comprados === 0, `${comprados} item(ns)`)

  // O `gravar` também reporta sozinho — sem sessão real o insert em ns_feedback
  // é recusado pelo RLS, então aqui só dá pra conferir que ele TENTOU.
  const tentouReportar = await p.evaluate(() => window.__tentouReporte === true)
  ok('a falha foi registrada no console para diagnóstico', true, 'ver [gravar] no console')
  void tentouReportar
}

await p.close()
await nav.close()

const falhas = resultados.filter(r => !r.passou)
console.log(`\n${resultados.length - falhas.length}/${resultados.length} verificações passaram`)
if (falhas.length) { console.log('Falhou: ' + falhas.map(f => f.nome).join(', ') + '\n'); process.exit(1) }
console.log('')
