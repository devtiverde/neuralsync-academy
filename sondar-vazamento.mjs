/**
 * Sonda: o que vaza para fora da tela é ALCANÇÁVEL ou não?
 *
 * O `auditar-telas.mjs` marca todo elemento cuja borda direita passa da janela.
 * Isso sozinho gera falso positivo: uma barra de navegação com
 * `overflow-x: auto` também "vaza", mas a criança alcança tudo arrastando.
 * O que é bug de verdade é vazar SEM nenhum ancestral rolável — foi o caso do
 * cabeçalho da criança, que ficava inalcançável porque `html, body` têm
 * `overflow-x: hidden` e não havia barra nenhuma.
 *
 * Esta sonda sobe a árvore de ancestrais de cada elemento vazado e responde:
 * existe alguém no caminho que realmente rola na horizontal?
 *
 * Uso: node sondar-vazamento.mjs <porta|url> <rota> [largura]
 *   node sondar-vazamento.mjs 5173 /trilha 390
 *   node sondar-vazamento.mjs https://app.neuralsync.com.br / 390
 *
 * Aceitar a URL completa permite conferir o site PUBLICADO, e nao so o build
 * local -- foi assim que se confirmou que o deploy realmente carregou as
 * correcoes, em vez de confiar no hash bater.
 */
import { chromium } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const [, , PORTA, ROTA, LARG = '390'] = process.argv
if (!PORTA || !ROTA) {
  console.error('Uso: node sondar-vazamento.mjs 5173 /trilha 390')
  process.exit(2)
}
const largura = Number(LARG)

const navegador = await chromium.launch()
const ctx = await navegador.newContext({
  viewport: { width: largura, height: largura < 800 ? 844 : 720 },
  // Precisa espelhar o auditar-telas.mjs: forçar isMobile numa janela de 1100px
  // muda o layout e a sonda passa a medir uma tela que ninguém vê.
  isMobile: largura < 800, hasTouch: largura < 800, deviceScaleFactor: 2,
})
await prepararContexto(ctx)

const pagina = await ctx.newPage()
const BASE = PORTA.startsWith('http') ? PORTA.replace(/\/$/, '') : `http://localhost:${PORTA}`
await pagina.goto(`${BASE}${ROTA}`, { waitUntil: 'networkidle', timeout: 30000 })
await pagina.waitForTimeout(1000)

const achados = await pagina.evaluate(largura => {
  const saida = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    const est = getComputedStyle(el)
    if (est.visibility === 'hidden' || est.display === 'none' || est.opacity === '0') continue
    if (est.position === 'fixed' || est.position === 'absolute') continue
    const excesso = Math.round(r.right - largura)
    if (excesso <= 2) continue

    // Sobe a árvore procurando quem de fato rola na horizontal.
    let rolavel = null
    let p = el.parentElement
    while (p && p !== document.body) {
      const pe = getComputedStyle(p)
      const rolaCSS = ['auto', 'scroll'].includes(pe.overflowX) || ['auto', 'scroll'].includes(pe.overflow)
      if (rolaCSS && p.scrollWidth > p.clientWidth + 2) {
        rolavel = {
          tag: p.tagName.toLowerCase(),
          classe: (typeof p.className === 'string' ? p.className : '').slice(0, 40),
          sobra: p.scrollWidth - p.clientWidth,
        }
        break
      }
      p = p.parentElement
    }

    saida.push({
      excesso,
      tag: el.tagName.toLowerCase(),
      classe: (typeof el.className === 'string' ? el.className : '').slice(0, 40),
      texto: (el.textContent || '').trim().slice(0, 38),
      rolavel,
    })
  }
  return saida.sort((a, b) => b.excesso - a.excesso)
}, largura)

await navegador.close()

const inalcancaveis = achados.filter(a => !a.rolavel)
const alcancaveis = achados.filter(a => a.rolavel)

console.log(`\n${ROTA} @ ${largura}px — ${achados.length} elementos passam da borda direita\n`)

console.log(`✅ ALCANÇÁVEIS (dentro de um container que rola de verdade): ${alcancaveis.length}`)
for (const a of alcancaveis.slice(0, 4)) {
  console.log(`   +${a.excesso}px <${a.tag}> "${a.texto}"`)
  console.log(`      rola em <${a.rolavel.tag} class="${a.rolavel.classe}"> (sobra ${a.rolavel.sobra}px)`)
}

console.log(`\n${inalcancaveis.length ? '🔴' : '✅'} INALCANÇÁVEIS (sem nenhum ancestral rolável): ${inalcancaveis.length}`)
for (const a of inalcancaveis.slice(0, 10)) {
  console.log(`   +${a.excesso}px <${a.tag} class="${a.classe}"> "${a.texto}"`)
}
console.log('')
