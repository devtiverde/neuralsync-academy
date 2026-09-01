/**
 * testar-prefetch.mjs — prova que a `IntroAtividade` chega ANTES do clique.
 *
 * O QUE ESTÁ SENDO MEDIDO
 * -----------------------
 * Toda atividade mostra a `IntroAtividade` antes do jogo, e ela é o maior
 * pedaço do caminho de abertura (10,2 kB gzip contra 2–5 kB do componente do
 * jogo). Sem prefetch, esse pedaço só é pedido no clique — a criança espera a
 * rede depois de tocar o cartão. `src/lib/prefetch.js` passa a pedir no ocioso.
 *
 * O teste abre a `/home-crianca`, NÃO CLICA EM NADA, e exige que o pedido do
 * módulo tenha saído sozinho.
 *
 * VALIDAÇÃO DO INSTRUMENTO (sem isto o teste não mede nada)
 * ---------------------------------------------------------
 *  1. **Controle negativo:** exige que `QuizAtividade` (que também é `lazy` e
 *     também abre por clique) NÃO tenha sido pedido. Se o teste aprovasse os
 *     dois, ele estaria medindo "o dev server carrega tudo", não o prefetch.
 *  2. **Controle positivo do seletor:** exige que a home tenha renderizado de
 *     verdade (o hub com os cartões). Numa tela que não carregou, nada é pedido
 *     e o controle negativo passaria feliz.
 *
 * 🪤 Rodado ANTES da mudança, este teste REPROVA (0 pedidos de IntroAtividade) —
 * foi assim que se confirmou que ele mede o que diz medir.
 *
 * Uso: node testar-prefetch.mjs [porta]     (padrão 5190)
 */
import { chromium } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5190'
const BASE  = `http://localhost:${PORTA}`

// Espera pelo OCIOSO, não por um número mágico: o prefetch usa
// `requestIdleCallback` com timeout de 3s, então 6s cobre o pior caso com folga
// e ainda assim falha rápido se nada acontecer.
const ESPERA_MS = 6000

const ok = (m) => console.log(`  ✅ ${m}`)
const na = (m) => console.log(`  ❌ ${m}`)

const resultados = []
function checar(nome, passou, detalhe = '') {
  resultados.push({ nome, passou })
  ;(passou ? ok : na)(`${nome}${detalhe ? ' — ' + detalhe : ''}`)
}

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ viewport: { width: 390, height: 844 } })
await prepararContexto(ctx)

const pedidos = []
ctx.on('request', (req) => pedidos.push(req.url()))

const page = await ctx.newPage()
await page.goto(`${BASE}/home-crianca`, { waitUntil: 'domcontentloaded' })

// Controle positivo: a home tem que ter renderizado COM CONTEÚDO. Os cartões do
// hub (`.ns-hub-card`) só existem depois que as atividades da faixa chegaram —
// é a prova de que a tela não parou no splash nem redirecionou.
// 🪤 Procurar pelo texto "Explorar" não servia: esse rótulo não existe na tela.
let homeRenderizou = true
try {
  await page.locator('.ns-hub-card').first().waitFor({ timeout: 15000 })
} catch {
  homeRenderizou = false
}
checar('a home renderizou (controle positivo)', homeRenderizou,
  homeRenderizou ? '' : 'sem isto, o resto do teste não mede nada')

await page.waitForTimeout(ESPERA_MS)

const pediu = (nome) => pedidos.filter(u => u.includes(nome))

const intro = pediu('IntroAtividade')
checar('IntroAtividade foi buscada SEM clique', intro.length > 0,
  intro.length > 0 ? intro[0].split('/').pop() : 'nenhum pedido — o prefetch não rodou')

const quiz = pediu('QuizAtividade')
checar('QuizAtividade NÃO foi buscada (controle negativo)', quiz.length === 0,
  quiz.length === 0 ? '' : `${quiz.length} pedido(s) — o teste está medindo carga geral, não prefetch`)

await navegador.close()

const falhas = resultados.filter(r => !r.passou)
console.log(`\n${resultados.length - falhas.length}/${resultados.length} verificações`)
process.exit(falhas.length === 0 ? 0 : 1)
