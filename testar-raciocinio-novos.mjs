/**
 * testar-raciocinio-novos.mjs — confere as 77 atividades de `sequencia` e `padrao`
 * criadas em 08/08/2026.
 *
 * POR QUE NÃO BASTAM AS AUDITORIAS QUE JÁ EXISTEM
 * -----------------------------------------------
 * `auditar-atividades.mjs` abre a PRIMEIRA atividade de cada tipo. Ele daria 24/24
 * sem tocar em nenhuma das 77 — mediria a tela antiga. E `auditar-sequencia-padrao.mjs`
 * confere o DADO sem navegador: ele prova que a resposta está entre as opções, mas não
 * prova que o COMPONENTE concorda com o dado.
 *
 * O QUE ESTE FAZ DE DIFERENTE: ele JOGA.
 * -------------------------------------
 * Para cada atividade, clica na alternativa que o dado declara correta e exige que a
 * tela responda "Isso mesmo". Se a comparação do componente for por outro campo, se
 * houver espaço sobrando no texto, ou se um emoji tiver variação invisível de Unicode
 * (VS16), o clique cai no ramo do erro e o teste reprova — coisas que a conferência
 * estrutural aprova sem ver.
 *
 * 🔑 VALIDAÇÃO DO INSTRUMENTO: antes de medir, o script força um clique na alternativa
 * ERRADA de uma atividade e exige ver o ramo de erro. Um teste que só sabe reconhecer
 * o sucesso diria "77/77" mesmo com a tela quebrada.
 * Ver [[feedback_validar_o_instrumento_antes_da_medida]].
 *
 * Uso: node testar-raciocinio-novos.mjs [porta]     (padrão 5193)
 */
import { chromium } from 'playwright'

const PORTA = process.argv[2] || '5193'
const BASE = `http://localhost:${PORTA}`

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const CHILD = {
  id: '11111111-2222-3333-4444-555555555555',
  nome: 'Teste', avatar: '🦊', faixa_etaria: 'construtores',
  nivel: 3, xp: 420, neural_coins: 90, streak_atual: 2,
}

let falhas = 0
const erro = m => { console.log(`  🔴 ${m}`); falhas++ }

// ── Carrega as atividades novas ──────────────────────────────────────────────
const novos = []
for (const faixa of FAIXAS) {
  const mod = await import(`./src/data/extra/${faixa}.js`)
  const lista = mod.raciocinioExtraPorFaixa || []
  if (!lista.length) { erro(`${faixa}: raciocinioExtraPorFaixa vazio ou ausente`); continue }
  for (const a of lista) novos.push({ faixa, a })
}
console.log(`\n${novos.length} atividades novas encontradas`)
if (novos.length !== 77) erro(`esperado 77 atividades novas, encontrado ${novos.length}`)

// 🪤 A CRIANÇA DE TESTE PRECISA SER DA FAIXA DA ATIVIDADE. Com uma criança só, as de
// faixa superior caem no `faixaGuard` e mostram o pedido de senha do responsável em
// vez do jogo — o teste mediria a trava de segurança e chamaria de bug de conteúdo.
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
  contextos[f] = { page, errosJs }
}

/** Abre a atividade na bancada e passa da intro. Devolve o estado da tela. */
async function abrir(page, tipo, id) {
  await page.goto(`${BASE}/dev/atividade/${tipo}?id=${id}`, { waitUntil: 'networkidle', timeout: 20000 })
  const comecar = page.getByRole('button', { name: /come[çc]ar|vamos|jogar|iniciar/i }).first()
  if (await comecar.count()) {
    await comecar.click({ timeout: 3000 }).catch(() => {})
    await page.waitForTimeout(600)
  }
}

/** Clica na alternativa cujo texto é exatamente `alvo`. Devolve false se não achou. */
async function clicarAlternativa(page, alvo) {
  const botoes = page.locator('button')
  const n = await botoes.count()
  for (let i = 0; i < n; i++) {
    const b = botoes.nth(i)
    const t = (await b.innerText().catch(() => '')).trim()
    if (t === alvo) { await b.click({ timeout: 3000 }); return true }
  }
  return false
}

// ── 0. VALIDAÇÃO DO INSTRUMENTO ──────────────────────────────────────────────
console.log('\n⓪ Validando o instrumento (o teste sabe reprovar?)\n')
{
  const alvo = novos.find(n => n.a.tipo === 'sequencia')
  const { page } = contextos[alvo.faixa]
  const seq = alvo.a.sequencias[0]
  const errada = seq.opcoes.find(o => o !== seq.resposta)
  await abrir(page, 'sequencia', alvo.a.id)
  const achou = await clicarAlternativa(page, errada)
  await page.waitForTimeout(400)
  const txt = await page.evaluate(() => document.body.innerText)
  if (!achou) erro('instrumento: não achou a alternativa errada para clicar')
  else if (txt.includes('Isso mesmo')) erro('🔴 INSTRUMENTO CEGO: clicou na ERRADA e a tela disse "Isso mesmo"')
  else console.log(`  ✅ clique errado em ${alvo.a.id} produziu o ramo de erro — o teste distingue os dois`)
}

// ── 1. CADA ATIVIDADE, JOGADA ────────────────────────────────────────────────
console.log('\n① Abrindo e jogando cada uma\n')

const porFaixa = {}
for (const { faixa, a } of novos) {
  const { page, errosJs } = contextos[faixa]
  errosJs.length = 0
  const lista = a.tipo === 'sequencia' ? a.sequencias : a.puzzles
  const primeiro = lista[0]

  try {
    await abrir(page, a.tipo, a.id)

    const estado = await page.evaluate(() => ({
      texto: document.body.innerText.length,
      // A matriz do `padrao` é um grid de 9 casas; a sequência desenha os items em linha.
      celulas: document.querySelectorAll('div[style*="aspect-ratio"]').length,
    }))

    if (errosJs.length) { erro(`${a.id}: erro de JS — ${errosJs[0].slice(0, 90)}`); continue }
    if (estado.texto < 120) { erro(`${a.id}: tela praticamente vazia`); continue }

    // O teste de verdade: clicar no que o DADO diz ser certo e exigir a confirmação.
    const clicou = await clicarAlternativa(page, primeiro.resposta)
    if (!clicou) {
      erro(`${a.id}: a alternativa "${primeiro.resposta}" não existe como botão na tela`)
      continue
    }
    await page.waitForTimeout(400)
    const txt = await page.evaluate(() => document.body.innerText)
    if (!txt.includes('Isso mesmo')) {
      erro(`${a.id}: cliquei em "${primeiro.resposta}" (a resposta do dado) e a tela NÃO confirmou`)
      continue
    }
    if (errosJs.length) { erro(`${a.id}: erro de JS ao responder — ${errosJs[0].slice(0, 80)}`); continue }

    porFaixa[faixa] = (porFaixa[faixa] || 0) + 1
  } catch (e) {
    erro(`${a.id}: não abriu — ${e.message.slice(0, 80)}`)
  }
}

await browser.close()

for (const f of FAIXAS) {
  const esperado = novos.filter(n => n.faixa === f).length
  const ok = porFaixa[f] || 0
  console.log(`  ${ok === esperado ? '✅' : '🔴'} ${f.padEnd(14)} ${ok}/${esperado}`)
}

console.log(falhas === 0
  ? `\n✅ As ${novos.length} atividades abrem, desenham e aceitam a resposta declarada no dado.\n`
  : `\n🔴 ${falhas} falha(s).\n`)
process.exit(falhas === 0 ? 0 : 1)
