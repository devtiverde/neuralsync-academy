/**
 * Teste funcional do fluxo de liberação de tempo extra.
 *
 * Confere, num navegador de verdade e em tela de celular:
 *   1. a tela de bloqueio oferece as opções de liberação e elas são clicáveis;
 *   2. clicar abre o pedido de senha do responsável (a criança não passa sozinha);
 *   3. o "+15 min" do timer também passa a exigir senha;
 *   4. `liberarPorMinutos` realmente destrava `dentroDoHorario`.
 *
 * Uso: node testar-liberacao.mjs <porta>
 */
import { chromium } from 'playwright'

const PORTA = process.argv[2]
if (!PORTA) { console.error('Uso: node testar-liberacao.mjs 5173'); process.exit(2) }
const BASE = `http://localhost:${PORTA}`

const CRIANCA = {
  id: '00000000-0000-4000-8000-000000000001', nome: 'Lize', avatar: '🦊',
  nivel: 3, xp: 420, neural_coins: 250, streak_atual: 4,
  faixa_etaria: 'construtores', idade: 7,
}

// Agenda que bloqueia o dia inteiro, os 7 dias — garante a tela de bloqueio
// independentemente da hora em que o teste rodar.
const AGENDA_FECHADA = Array.from({ length: 7 }, () => ({ ativo: false, inicio: '00:00', fim: '00:00' }))

const nav = await chromium.launch()
const ctx = await nav.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
await ctx.addInitScript(([crianca, agenda]) => {
  try {
    sessionStorage.setItem('ns_dev_bypass', '1')
    localStorage.setItem('ns_active_child', JSON.stringify(crianca))
    localStorage.setItem('ns_agenda_config', JSON.stringify(agenda))
  } catch { /* modo privado */ }
}, [CRIANCA, AGENDA_FECHADA])

const resultados = []
const ok = (nome, passou, detalhe = '') => {
  resultados.push({ nome, passou, detalhe })
  console.log(`  ${passou ? '✅' : '❌'} ${nome}${detalhe ? ' — ' + detalhe : ''}`)
}

// ── 1 e 2: tela de bloqueio ──────────────────────────────────
console.log('\nTela de bloqueio @ 390px')
const p1 = await ctx.newPage()
await p1.goto(`${BASE}/bloqueio`, { waitUntil: 'networkidle' })
await p1.waitForTimeout(700)

const botoes = await p1.locator('button', { hasText: /^\+\d+ min$/ }).all()
ok('oferece opções de liberação', botoes.length === 3, `${botoes.length} botões`)

// Alvo de toque: quem usa isso é adulto com pressa, em pé, no celular.
const caixas = await Promise.all(botoes.map(b => b.boundingBox()))
const menorAltura = Math.min(...caixas.map(c => c?.height || 0))
ok('alvos com pelo menos 44px de altura', menorAltura >= 44, `menor = ${Math.round(menorAltura)}px`)

const dentroDaTela = caixas.every(c => c && c.x >= 0 && c.x + c.width <= 390)
ok('botões dentro da largura da tela', dentroDaTela)

await botoes[1].click() // +30 min
await p1.waitForTimeout(500)
const pedeSenha = await p1.locator('input[type="password"]').count()
ok('clicar pede a senha do responsável', pedeSenha === 1)
// `h2` sozinho pega o "Ei, {nome}!" da propria tela de bloqueio, que vem antes
// no DOM. O botao de confirmar so existe dentro do modal, entao e um alvo sem
// ambiguidade.
const confirmar = await p1.locator('button[type="submit"]').textContent().catch(() => '')
ok('o modal diz quanto tempo vai liberar', /30/.test(confirmar || ''), `"${(confirmar || '').trim()}"`)

// A criança não pode passar sem a senha certa.
await p1.locator('input[type="password"]').fill('senha-errada-de-proposito')
await p1.locator('button[type="submit"]').click()
await p1.waitForTimeout(1800)
const aindaBloqueado = p1.url().includes('/bloqueio')
ok('senha errada não libera', aindaBloqueado, p1.url().split(PORTA)[1] || '')
await p1.close()

// ── 3: timer ─────────────────────────────────────────────────
console.log('\nTimer ativo @ 390px')
const p2 = await ctx.newPage()
await p2.goto(`${BASE}/timer-ativo`, { waitUntil: 'networkidle' })
await p2.waitForTimeout(700)
const btn15 = p2.locator('button', { hasText: '+15 min' })
ok('botão +15 min existe', await btn15.count() === 1)
await btn15.click()
await p2.waitForTimeout(500)
ok('+15 min agora exige senha', await p2.locator('input[type="password"]').count() === 1)
await p2.close()

// ── 4: a liberação realmente destrava ────────────────────────
console.log('\nEfeito da liberação')
const p3 = await ctx.newPage()
await p3.goto(`${BASE}/bloqueio`, { waitUntil: 'networkidle' })
const destrava = await p3.evaluate(async id => {
  const mod = await import('/src/lib/horarioAcesso.js')
  const agendaFechada = Array.from({ length: 7 }, () => ({ ativo: false, inicio: '00:00', fim: '00:00' }))
  const antes = mod.dentroDoHorario(agendaFechada, id)
  mod.liberarPorMinutos(id, 30)
  const depois = mod.dentroDoHorario(agendaFechada, id)
  const restante = mod.minutosLiberados(id)
  mod.cancelarLiberacao(id)
  const aposCancelar = mod.dentroDoHorario(agendaFechada, id)
  return { antes, depois, restante, aposCancelar }
}, CRIANCA.id)

ok('com agenda fechada, acesso negado', destrava.antes === false)
ok('depois de liberar, acesso permitido', destrava.depois === true)
ok('conta os minutos restantes', destrava.restante === 30, `${destrava.restante} min`)
ok('cancelar volta a bloquear', destrava.aposCancelar === false)
await p3.close()

await nav.close()

const falhas = resultados.filter(r => !r.passou)
console.log(`\n${resultados.length - falhas.length}/${resultados.length} verificações passaram`)
if (falhas.length) { console.log('Falhou: ' + falhas.map(f => f.nome).join(', ') + '\n'); process.exit(1) }
console.log('')
