/**
 * auditar-flutuantes.mjs — o que os botões flutuantes cobrem, e é grave?
 *
 * O PEDIDO
 * O Cláudio pediu um amigo para testar e ouviu: *"muito poluído visualmente,
 * alguns pais vão ter dificuldade pra começar"*. O `auditar-orientacao.mjs` já
 * tinha marcado "flutuante tapa" em 15 telas — mas marcar não é medir a GRAVIDADE.
 *
 * 🔑 A distinção que importa: cobrir TEXTO é feio; cobrir um CONTROLE é defeito.
 * Quando um botão fixo fica por cima de outro botão, o dedo vai para o de cima e
 * a tela fica muda — ou pior, faz outra coisa. Foi o que aconteceu com a barra
 * inferior de 93px, que abria a Digitação quando a criança mirava "Ir para Loja".
 *
 * 🪤 COBERTO NÃO É INALCANÇÁVEL — e eu quase errei isso de novo. A 1ª versão desta
 * medida acusou 26 controles cobertos, mas a maioria estava coberta só NAQUELE
 * instante da rolagem: basta rolar um dedo e o controle sai de baixo do botão. Isso
 * é feio, não é defeito. O defeito é o controle que NENHUMA posição de rolagem
 * libera — o que fica preso embaixo do flutuante no fim da página, exatamente como
 * a barra inferior de 93px fazia. Ver [[feedback_vazamento_alcancavel_vs_inalcancavel]].
 *
 * Então cada controle coberto é reexaminado: varre-se a página inteira e pergunta-se
 * se EXISTE alguma posição em que aquele mesmo controle NÃO está debaixo do botão.
 * Se existe, é ruído visual (🟡). Se não existe, é toque roubado (🔴).
 *
 * Uso: node auditar-flutuantes.mjs <porta> [--fotos]
 */
import { chromium, devices } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2]
if (!PORTA) { console.error('Falta a porta. Ex.: node auditar-flutuantes.mjs 5173'); process.exit(2) }
const FOTOS = process.argv.includes('--fotos')
const BASE = `http://localhost:${PORTA}`

const ROTAS = [
  ['/dashboard', 'pai'], ['/primeiros-passos', 'pai'], ['/timer', 'pai'], ['/agenda', 'pai'],
  ['/perfil-filho', 'pai'], ['/relatorio', 'pai'], ['/trilha-pai', 'pai'], ['/configuracoes', 'pai'],
  ['/home-crianca', 'crianca'], ['/trilha', 'crianca'], ['/loja', 'crianca'],
  ['/personalizar', 'crianca'], ['/perfil-crianca', 'crianca'], ['/coins', 'crianca'],
  ['/atividades-offline', 'crianca'], ['/kids', 'crianca'], ['/quiz-ia', 'crianca'],
  ['/timer-ativo', 'crianca'], ['/diario', 'crianca'],
]

const TELA = devices['Pixel 5']

/**
 * Para cada elemento FIXO de topo (z alto), pergunta ao navegador quem está
 * logo abaixo dele no ponto central — e se esse alguém é clicável.
 */
const SONDA = () => {
  const ehClicavel = el => {
    if (!el) return false
    let p = el
    for (let i = 0; i < 6 && p; i++, p = p.parentElement) {
      const tag = p.tagName
      if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'SELECT') return true
      if (p.getAttribute?.('role') === 'button') return true
    }
    return false
  }
  const rotulo = el => (el?.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)

  // flutuantes = pequenos, em cima de tudo — não a barra de baixo nem a topbar.
  // 🪤 24/09: a 1ª versão exigia `position: fixed` NO PRÓPRIO botão. Quando o botão
  // passou a ser `static` dentro de um invólucro fixo, o auditor parou de enxergá-lo
  // e devolveu ZERO em 19 telas — parecia conserto perfeito e era cegueira. Agora a
  // pergunta certa: alguém na LINHAGEM deste elemento é fixo?
  // Ver [[feedback_validar_o_instrumento_antes_da_medida]].
  const fixoNaLinhagem = el => {
    for (let p = el; p && p !== document.body; p = p.parentElement) {
      const st = getComputedStyle(p)
      if (st.position === 'fixed') return { z: Number(st.zIndex) || 0 }
    }
    return null
  }
  const flutuantes = [...document.querySelectorAll('button, a')].filter(el => {
    const fixo = fixoNaLinhagem(el)
    if (!fixo || fixo.z < 1000) return false
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.width <= 90 && r.height <= 90
  })

  const achados = []
  for (const f of flutuantes) {
    const r = f.getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    if (cy < 0 || cy > innerHeight || cx < 0 || cx > innerWidth) continue
    // esconde o flutuante por um instante para ver quem está debaixo
    const antes = f.style.visibility
    f.style.visibility = 'hidden'
    const debaixo = document.elementFromPoint(cx, cy)
    f.style.visibility = antes
    if (!debaixo || debaixo === document.body || debaixo === document.documentElement) continue
    // marca o elemento coberto para conseguir reencontrá-lo nas outras rolagens
    let alvo = debaixo
    for (let i = 0; i < 6 && alvo && !['BUTTON','A','INPUT','SELECT'].includes(alvo.tagName); i++) alvo = alvo.parentElement
    const clicavel = ehClicavel(debaixo)
    if (clicavel && alvo) {
      if (!alvo.dataset.nsAlvo) alvo.dataset.nsAlvo = 'alvo-' + Math.random().toString(36).slice(2, 9)
    }
    achados.push({
      botao: rotulo(f) || f.getAttribute('aria-label') || '?',
      tamanho: `${Math.round(r.width)}×${Math.round(r.height)}`,
      cobre: rotulo(debaixo),
      clicavel,
      marca: clicavel && alvo ? alvo.dataset.nsAlvo : null,
    })
  }
  return { achados, alturaFlutuantes: flutuantes.length }
}

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ ...TELA })
await prepararContexto(ctx)
if (FOTOS) mkdirSync('auditoria-flutuantes', { recursive: true })

console.log(`\n🎈 Flutuantes — ${ROTAS.length} telas em ${TELA.viewport.width}px\n`)
console.log('   Regra: cobrir TEXTO é feio · cobrir CONTROLE é defeito (o dedo vai pro de cima)\n')

let telasComControle = 0, telasComTexto = 0, totalControles = 0, totalFlutuantesVistos = 0
const relatorio = []

for (const [rota, area] of ROTAS) {
  const pag = await ctx.newPage()
  try {
    await pag.goto(`${BASE}${rota}`, { waitUntil: 'networkidle' })
    await pag.waitForTimeout(600)

    const vistos = new Map()
    const altura = await pag.evaluate(() => document.documentElement.scrollHeight)
    const passo = Math.max(200, Math.floor(TELA.viewport.height * 0.6))
    for (let y = 0; y < altura; y += passo) {
      await pag.evaluate(v => scrollTo(0, v), y)
      await pag.waitForTimeout(120)
      const { achados, alturaFlutuantes } = await pag.evaluate(SONDA)
      totalFlutuantesVistos += alturaFlutuantes
      for (const a of achados) {
        const chave = `${a.botao}|${a.cobre}`
        if (!vistos.has(chave)) vistos.set(chave, a)
      }
    }

    const lista = [...vistos.values()]
    const textos = lista.filter(a => !a.clicavel)

    // ── 2ª passada: o controle coberto SAI de baixo do botão em alguma rolagem? ──
    // Sem isto, "coberto agora" viraria "defeito" — e a maioria só precisa de um
    // dedo de rolagem. O que importa é o controle que NENHUMA posição libera.
    const controles = []
    for (const c of lista.filter(a => a.clicavel && a.marca)) {
      let liberaEmAlguma = false
      for (let y = 0; y < altura && !liberaEmAlguma; y += Math.floor(passo / 2)) {
        await pag.evaluate(v => scrollTo(0, v), y)
        await pag.waitForTimeout(90)
        liberaEmAlguma = await pag.evaluate(marca => {
          const alvo = document.querySelector(`[data-ns-alvo="${marca}"]`)
          if (!alvo) return false
          const r = alvo.getBoundingClientRect()
          if (r.bottom <= 0 || r.top >= innerHeight) return false   // fora da tela não conta
          const cx = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1)
          const cy = Math.min(Math.max(r.top + r.height / 2, 1), innerHeight - 1)
          const noPonto = document.elementFromPoint(cx, cy)
          return !!noPonto && (alvo === noPonto || alvo.contains(noPonto))
        }, c.marca)
      }
      controles.push({ ...c, alcancavel: liberaEmAlguma })
    }
    const presos = controles.filter(c => !c.alcancavel)
    const soFeios = controles.filter(c => c.alcancavel)
    if (presos.length) { telasComControle++; totalControles += presos.length }
    if (textos.length || soFeios.length) telasComTexto++
    relatorio.push({ rota, area, presos, soFeios, textos })

    const marca = presos.length ? '\u{1F534}' : (soFeios.length || textos.length) ? '\u{1F7E1}' : '\u2705'
    console.log(`  ${marca} ${rota.padEnd(20)} ${presos.length} PRESO(s) · ${soFeios.length} coberto mas alcançável · ${textos.length} texto(s)`)
    for (const c of presos) console.log(`        \u{1F534} "${c.botao}" (${c.tamanho}) PRENDE o controle "${c.cobre}" — nenhuma rolagem libera`)

    if (FOTOS) await pag.screenshot({ path: `auditoria-flutuantes/${rota.replace(/\//g, '_')}.png`, fullPage: false })
  } catch (e) {
    console.log(`  ⚠️  ${rota.padEnd(20)} erro: ${String(e.message).slice(0, 70)}`)
  }
  await pag.close()
}

writeFileSync('auditoria-flutuantes.json', JSON.stringify(relatorio, null, 2))

// 🪤 VALIDAÇÃO DO INSTRUMENTO. "Zero coberturas" só vale se o auditor tiver de fato
// ENCONTRADO botões flutuantes. Sem esta checagem, um seletor que deixou de casar
// devolveria 19 telas limpas e eu comemoraria um conserto que não houve.
if (totalFlutuantesVistos === 0) {
  console.log('\n⛔ O auditor não encontrou flutuante NENHUM em nenhuma tela.')
  console.log('   Isso não é "nenhuma cobertura": é o seletor não estar casando. Não conclua nada.')
  process.exit(2)
}
console.log(`\n(instrumento: ${totalFlutuantesVistos} flutuante(s) encontrado(s) ao longo da varredura)`)
console.log(`\n   \u{1F534} ${telasComControle} tela(s) com controle PRESO embaixo do flutuante (${totalControles} no total)`)
console.log(`   \u{1F7E1} ${telasComTexto} tela(s) com conteúdo coberto que a rolagem resolve — ruído visual, não defeito`)
console.log('   Detalhe: auditoria-flutuantes.json')
await navegador.close()
