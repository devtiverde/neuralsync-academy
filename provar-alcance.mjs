/**
 * Prova (ou desmente) um achado do `auditar-alcance.mjs` do jeito mais direto que existe:
 * TENTA CLICAR de verdade, com o mouse/dedo do Playwright, e fotografa a tela.
 *
 * POR QUE ISTO EXISTE
 * O `auditar-alcance` mede geometria e hit-testing. Isso já pegou defeito real, mas medida
 * não é a coisa: neste projeto uma auditoria de tamanho já aprovou um desenho visivelmente
 * quebrado, e só apareceu ao renderizar. Aqui o critério é o comportamento: o clique chega
 * no elemento pedido, ou chega em OUTRO (ou em nenhum)?
 *
 * `click({ trial: true })` faz o Playwright rodar as próprias checagens de "clicável"
 * (visível, estável, recebe eventos) SEM disparar o clique — se ele recusa, um dedo real
 * também não chegaria. Além disso conferimos QUEM está no ponto e se a página já está no
 * fim da rolagem, porque "está coberto" só é bug se não houver como rolar mais.
 *
 * Uso: node provar-alcance.mjs <porta> <rota> <largura> <altura> "<texto do alvo>"
 *      node provar-alcance.mjs 5191 /digitacao 390 844 "Começar Atividade"
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { prepararContexto } from './harness-teste.mjs'

const [porta, rota, larguraStr, alturaStr, alvoTexto] = process.argv.slice(2)
if (!porta || !rota || !alvoTexto) {
  console.error('Uso: node provar-alcance.mjs <porta> <rota> <largura> <altura> "<texto>"')
  process.exit(2)
}
const largura = Number(larguraStr) || 390
const altura = Number(alturaStr) || 844
const SAIDA = 'auditoria-alcance/provas'
mkdirSync(SAIDA, { recursive: true })

const navegador = await chromium.launch()
const ctx = await navegador.newContext({
  viewport: { width: largura, height: altura },
  isMobile: largura < 800, hasTouch: largura < 800, deviceScaleFactor: 1,
})
await prepararContexto(ctx)
const pagina = await ctx.newPage()
await pagina.goto(`http://localhost:${porta}${rota}`, { waitUntil: 'networkidle', timeout: 25000 })
await pagina.waitForTimeout(900)

// Atividade abre na introdução; `--jogo` entra no jogo antes de medir.
if (process.argv.includes('--jogo')) {
  const b = pagina.getByRole('button', { name: /come[çc]ar|vamos|jogar|iniciar/i }).first()
  if (await b.count().catch(() => 0)) { await b.click({ timeout: 3000 }).catch(() => {}); await pagina.waitForTimeout(1000) }
}

const alvo = pagina.getByText(alvoTexto, { exact: false }).first()
const n = await alvo.count()
console.log(`\nRota ${rota} · ${largura}×${altura} · alvo "${alvoTexto}" → ${n} encontrado(s)`)
if (!n) { await navegador.close(); process.exit(1) }

// Rolar como o usuário rola, e não por código: primeiro a página, depois a RODA do mouse
// sobre o meio da tela — que é o que rola o painel interno onde o cursor está. Sem isto o
// script diria "inalcançável" para qualquer coisa que dependa de rolar um painel legítimo
// (`.game-content`, `.intro-cols`, as laterais do GameShell).
await pagina.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await pagina.waitForTimeout(300)

const alcancou = async () => alvo.evaluate(el => {
  const r = el.getBoundingClientRect()
  const cx = Math.round(r.left + r.width / 2), cy = Math.round(r.top + r.height / 2)
  if (cy < 0 || cy > window.innerHeight || cx < 0 || cx > window.innerWidth) return false
  const e = document.elementFromPoint(cx, cy)
  return !!e && (el === e || el.contains(e))
}).catch(() => false)

let rodadas = 0
await pagina.mouse.move(largura / 2, Math.round(altura / 2))
while (rodadas < 12 && !(await alcancou())) {
  await pagina.mouse.wheel(0, 300)
  await pagina.waitForTimeout(140)
  rodadas++
}
if (rodadas) console.log(`  rolagem com a roda: ${rodadas} passo(s) de 300px sobre o meio da tela`)

// 🔑 NÃO usar `scrollIntoView` aqui. Ele rola contêiner com `overflow: hidden`, que o dedo
// não rola — e foi assim que a 1ª versão deste script "provou" que o botão do /digitacao
// estava acessível, contradizendo a auditoria por engano. O mesmo vale para
// `click({ trial: true })`: o Playwright também rola por código antes de testar, então ele
// aprova alvo que criança nenhuma alcança. A rolagem aqui é só a da PÁGINA, acima, que é a
// que o usuário faz de verdade.
const diag = await alvo.evaluate(el => {
  const r = el.getBoundingClientRect()
  const cx = Math.round(r.left + r.width / 2), cy = Math.round(r.top + r.height / 2)
  const noPonto = document.elementFromPoint(cx, cy)
  const fim = Math.abs(window.scrollY + window.innerHeight - document.documentElement.scrollHeight) < 4
  return {
    rect: { t: Math.round(r.top), b: Math.round(r.bottom), l: Math.round(r.left), r: Math.round(r.right) },
    janela: { w: window.innerWidth, h: window.innerHeight },
    dentroDaJanela: cy >= 0 && cy <= window.innerHeight && cx >= 0 && cx <= window.innerWidth,
    noPonto: noPonto ? noPonto.tagName.toLowerCase() + '.' + (typeof noPonto.className === 'string' ? noPonto.className.trim().split(/\s+/)[0] : '') : null,
    textoNoPonto: noPonto ? (noPonto.textContent || '').trim().slice(0, 40) : null,
    acertou: noPonto ? (el === noPonto || el.contains(noPonto)) : false,
    paginaNoFim: fim,
    scrollY: Math.round(window.scrollY),
    scrollMax: Math.round(document.documentElement.scrollHeight - window.innerHeight),
  }
})

console.log('  retângulo do alvo :', JSON.stringify(diag.rect), 'janela', JSON.stringify(diag.janela))
console.log('  centro na janela? :', diag.dentroDaJanela)
console.log('  quem está no ponto:', diag.noPonto, diag.textoNoPonto ? `("${diag.textoNoPonto}")` : '')
console.log('  o clique acerta?  :', diag.acertou ? '✅ SIM' : '⛔ NÃO')
console.log('  rolagem           :', `${diag.scrollY}/${diag.scrollMax}`, diag.paginaNoFim ? '(no fim — não há como rolar mais)' : '(ainda dá para rolar)')

// Fotografar ANTES de clicar: depois do clique a tela já pode ter navegado, e a captura
// mostraria o destino errado em vez do defeito.
const arquivoAntes = `${SAIDA}/${rota.replace(/\W+/g, '_')}-${largura}x${altura}.png`
await pagina.screenshot({ path: arquivoAntes })

// Clique de verdade no PONTO, sem deixar o Playwright rolar por código: se o alvo estiver
// coberto ou fora da janela, quem recebe é outro elemento — e é isso que a criança sente.
if (diag.dentroDaJanela) {
  const cx = Math.round((diag.rect.l + diag.rect.r) / 2)
  const cy = Math.round((diag.rect.t + diag.rect.b) / 2)
  const antes = pagina.url()
  await pagina.mouse.click(cx, cy).catch(() => {})
  await pagina.waitForTimeout(600)
  console.log('  clique no ponto   :', diag.acertou ? '✅ chegou no alvo' : '⛔ chegou em OUTRO elemento',
    pagina.url() !== antes ? `· navegou para ${new URL(pagina.url()).pathname}` : '· a tela não mudou')
} else {
  console.log('  clique no ponto   : ⛔ nem tentado — o centro do alvo está fora da janela')
}

console.log(`  captura           : ${arquivoAntes}\n`)

await navegador.close()
process.exit(diag.acertou ? 0 : 1)
