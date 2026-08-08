/**
 * testar-quiz-novos.mjs — confere as 30 atividades de quiz criadas em 08/08.
 *
 * POR QUE NÃO BASTAM AS AUDITORIAS QUE JÁ EXISTEM
 * -----------------------------------------------
 * `auditar-atividades.mjs` abre a PRIMEIRA atividade de cada tipo. Ele daria
 * 24/24 sem tocar em nenhuma das 30 novas — mediria a tela antiga.
 *
 * DUAS PASSADAS
 * -------------
 *  1. DADO — estrutura de todas as 30, sem navegador: 5 perguntas, 4 opções,
 *     índice da correta dentro do intervalo, `fato` presente, sem alternativa
 *     repetida dentro da mesma pergunta e sem título repetido na faixa.
 *  2. RUNTIME — abre CADA UMA das 30 na bancada (`/dev/atividade/quiz?id=<id>`)
 *     e confirma que a 1ª pergunta aparece na tela e que não houve erro de JS.
 *     🔑 Todas, não amostra: 400/400 de amostra já escondeu 3 falhas em 97 mil
 *     neste projeto.
 *
 * Uso: node testar-quiz-novos.mjs [porta]     (padrão 5192)
 */
import { chromium } from 'playwright'

const PORTA = process.argv[2] || '5192'
const BASE = `http://localhost:${PORTA}`

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const CHILD = {
  id: '11111111-2222-3333-4444-555555555555',
  nome: 'Teste', avatar: '🦊', faixa_etaria: 'construtores',
  nivel: 3, xp: 420, neural_coins: 90, streak_atual: 2,
}

let falhas = 0
const erro = m => { console.log(`  🔴 ${m}`); falhas++ }

// ── 1. DADO ──────────────────────────────────────────────────────────────────
console.log('\n① Estrutura dos dados\n')

const novos = []
for (const faixa of FAIXAS) {
  const mod = await import(`./src/data/extra/${faixa}.js`)
  const lista = mod.quizExtraPorFaixa || []
  if (!lista.length) { erro(`${faixa}: quizExtraPorFaixa vazio ou ausente`); continue }

  const titulos = new Set()
  for (const a of lista) {
    novos.push({ faixa, id: a.id })
    const p = a.perguntas || []
    if (p.length !== 5) erro(`${a.id}: ${p.length} perguntas (esperado 5)`)
    if (titulos.has(a.titulo)) erro(`${a.id}: título repetido na faixa — "${a.titulo}"`)
    titulos.add(a.titulo)
    if (!a.xp_reward || !a.coins_reward) erro(`${a.id}: sem xp_reward/coins_reward`)

    p.forEach((q, i) => {
      const onde = `${a.id} q${i + 1}`
      if (!q.pergunta?.trim()) erro(`${onde}: pergunta vazia`)
      if (!Array.isArray(q.opcoes) || q.opcoes.length !== 4) erro(`${onde}: ${q.opcoes?.length} opções (esperado 4)`)
      if (!Number.isInteger(q.correta) || q.correta < 0 || q.correta >= (q.opcoes?.length ?? 0)) {
        erro(`${onde}: índice "correta" inválido (${q.correta})`)
      }
      if (!q.fato?.trim()) erro(`${onde}: sem "fato"`)
      // Alternativa repetida deixa duas respostas certas na tela.
      if (new Set(q.opcoes || []).size !== (q.opcoes || []).length) erro(`${onde}: alternativa repetida`)
    })
  }
  console.log(`  ${lista.length === 0 ? '🔴' : '✅'} ${faixa.padEnd(14)} ${lista.length} quizzes novos`)
}

console.log(`\n  ${novos.length} atividades novas no total`)
if (novos.length !== 30) erro(`esperado 30 atividades novas, encontrado ${novos.length}`)

// ── 2. RUNTIME ───────────────────────────────────────────────────────────────
console.log('\n② Cada uma aberta na bancada\n')

// 🪤 A CRIANÇA DE TESTE PRECISA SER DA FAIXA DA ATIVIDADE. A 1ª versão deste
// script usava uma criança `construtores` para tudo e reprovou as 15 de
// criadores e inventores com "0 alternativas na tela". Não era defeito nenhum:
// era o `faixaGuard` funcionando — atividade de faixa SUPERIOR à da criança
// mostra o pedido de senha do responsável em vez de começar o jogo. O teste
// estava medindo a trava de segurança e chamando de bug de conteúdo.
const browser = await chromium.launch()

const contextos = {}
for (const f of FAIXAS) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  await ctx.addInitScript(child => {
    sessionStorage.setItem('ns_dev_bypass', '1')
    localStorage.setItem('ns_active_child', child)
  }, JSON.stringify({ ...CHILD, faixa_etaria: f }))
  const page = await ctx.newPage()
  const errosJs = []
  page.on('pageerror', e => errosJs.push(e.message))
  contextos[f] = { ctx, page, errosJs }
}

for (const { faixa, id } of novos) {
  const { page, errosJs } = contextos[faixa]
  errosJs.length = 0
  try {
    await page.goto(`${BASE}/dev/atividade/quiz?id=${id}`, { waitUntil: 'networkidle', timeout: 20000 })

    const comecar = page.getByRole('button', { name: /come[çc]ar|vamos|jogar|iniciar/i }).first()
    if (await comecar.count()) {
      await comecar.click({ timeout: 3000 }).catch(() => {})
      await page.waitForTimeout(700)
    }

    // A 1ª pergunta tem que estar na tela e as 4 alternativas clicáveis.
    const estado = await page.evaluate(() => {
      const opcoes = document.querySelectorAll('.quiz-option')
      const texto = document.body.innerText
      return { opcoes: opcoes.length, temTexto: texto.length > 120 }
    })

    if (errosJs.length) erro(`${id}: erro de JS — ${errosJs[0].slice(0, 90)}`)
    else if (estado.opcoes !== 4) erro(`${id}: ${estado.opcoes} alternativas na tela (esperado 4)`)
    else if (!estado.temTexto) erro(`${id}: tela praticamente vazia`)
    else console.log(`  ✅ ${faixa.slice(0, 3)} ${id}`)
  } catch (e) {
    erro(`${id}: não abriu — ${e.message.slice(0, 80)}`)
  }
}

await browser.close()

console.log(falhas === 0
  ? `\n✅ As ${novos.length} atividades novas passaram nas duas passadas.\n`
  : `\n🔴 ${falhas} falha(s).\n`)
process.exit(falhas === 0 ? 0 : 1)
