// Auditoria de JOGABILIDADE POR TOQUE nas atividades.
//
// POR QUE ESTE SCRIPT EXISTE
// O `auditar-atividades.mjs` dá 24/24 e isso NÃO contradiz o relato de "atividades
// bugadas no celular": ele mede vazamento de layout e erro de JavaScript. Ele não joga.
// Um botão que não responde ao dedo, ou um alvo de 12 pixels, passa limpo por ele.
//
// Já aconteceu exatamente isso: em 21/07 o teclado da Digitação tinha 26 teclas e ZERO
// clicáveis (eram `<div>`), e nenhuma auditoria acusou — quem acusou foi a esposa do
// Cláudio dizendo que "não dá pra jogar".
//
// O que este script mede, com dedo de verdade (`hasTouch`, viewport de celular):
//   1. ALVO PEQUENO — elemento interativo com menos de 40px. Para uma criança de 4-5
//      anos isso é o limite prático; abaixo disso ela erra e acha que travou.
//   2. NÃO RESPONDE AO TOQUE — elemento que parece clicável (cursor de mão, ou é um
//      botão) e, ao ser tocado, não muda NADA na tela.
//   3. ERRO DE JAVASCRIPT disparado pelo toque (e não só pelo carregamento).
//
// Uso:  node auditar-toque.mjs [porta]

import { chromium, devices } from 'playwright'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`
const MIN_ALVO = 40

const TIPOS = [
  'quiz', 'memoria', 'sequencia', 'labirinto', 'robo', 'padrao', 'blocos',
  'numeros', 'formas', 'cores', 'alfabeto', 'ingles', 'colorir', 'silabas',
  'musica', 'zona-emocoes', 'sequencia-magica', 'conectar-pontos',
  'classificar-objetos', 'quebra-cabeca', 'caca-palavras', 'historia-interativa',
]

const navegador = await chromium.launch()
const contexto = await navegador.newContext({
  ...devices['Pixel 5'],          // 393×851, hasTouch, isMobile — celular de verdade
  locale: 'pt-BR',
})
await contexto.addInitScript(() => {
  sessionStorage.setItem('ns_dev_bypass', '1')
  localStorage.setItem('ns_active_child', JSON.stringify({
    id: '00000000-0000-4000-8000-000000000001',
    nome: 'Teste', idade: 7, faixa_etaria: 'construtores',
    xp: 0, neural_coins: 500, nivel: 1, streak_atual: 0,
  }))
})

const achados = []

for (const tipo of TIPOS) {
  const pagina = await contexto.newPage()
  const errosJs = []
  pagina.on('pageerror', e => errosJs.push(e.message))

  try {
    await pagina.goto(`${BASE}/dev/atividade/${tipo}`, { waitUntil: 'networkidle', timeout: 25000 })
    await pagina.waitForTimeout(800)

    // A tela de abertura (IntroAtividade) fica na frente de quase toda atividade.
    // Sem passar por ela o teste mediria só a intro, e não o jogo — que é o ponto.
    const comecar = pagina.locator('button', { hasText: /começar|iniciar|vamos|jogar/i }).first()
    if (await comecar.count() > 0) {
      await comecar.tap().catch(() => {})
      await pagina.waitForTimeout(1200)
    }

    // Candidatos: o que o navegador considera interativo, mais o que só PARECE
    // interativo (cursor de mão). O segundo grupo é onde moram os `<div>` sem clique.
    const alvos = await pagina.evaluate((MIN) => {
      const vis = el => {
        const r = el.getBoundingClientRect()
        const s = getComputedStyle(el)
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' &&
               r.top < window.innerHeight && r.bottom > 0 && r.left < window.innerWidth && r.right > 0
      }

      // 🪤 A PRIMEIRA VERSÃO DESTE SCRIPT MEDIU LIXO.
      // O menu lateral e a barra do topo existem em TODA atividade, e seus itens
      // ("Loja", "🚪", "👨‍👩‍👧") apareciam como alvo pequeno nas 22, afogando o que é do
      // jogo. Pior: como o menu está fechado, tocar neles não muda nada — o que virava
      // "6/6 toques sem reação" em quase tudo. Dois falsos positivos que, somados,
      // diziam que 20 de 22 atividades estavam quebradas. Não estavam.
      const foraDoJogo = el =>
        el.closest('[class*="menu"], [class*="topbar"], nav, header, [class*="faq"], [class*="feedback"]') !== null

      // Só a FOLHA interativa interessa. Um rótulo de texto dentro de um cartão grande
      // herda `cursor: pointer` do cartão e mediria 17×11 — mas o dedo acerta o cartão,
      // não o texto. Contar isso como alvo pequeno seria inventar problema.
      const ehFolhaInterativa = el => {
        const s = getComputedStyle(el)
        const tag = el.tagName.toLowerCase()
        const nativo = ['button', 'a', 'input', 'select', 'textarea'].includes(tag) || el.getAttribute('role') === 'button'
        if (nativo) return true
        if (s.cursor !== 'pointer') return false
        // herdou o cursor de um ancestral clicável? então o alvo real é o ancestral
        const pai = el.parentElement
        if (pai && getComputedStyle(pai).cursor === 'pointer') return false
        // contém outro interativo? é contêiner, não alvo
        if (el.querySelector('button, [role="button"], a, input')) return false
        return true
      }

      const out = []
      for (const el of document.querySelectorAll('*')) {
        if (!vis(el) || foraDoJogo(el) || !ehFolhaInterativa(el)) continue
        const tag = el.tagName.toLowerCase()
        const nativo = ['button', 'a', 'input', 'select', 'textarea'].includes(tag) || el.getAttribute('role') === 'button'
        const r = el.getBoundingClientRect()
        out.push({
          tag, nativo,
          w: Math.round(r.width), h: Math.round(r.height),
          x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2),
          rotulo: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40),
          // um alvo largo e baixo (um item de lista de 300×24) é confortável de acertar;
          // o que machuca é ser pequeno nas DUAS dimensões, ou muito baixo.
          pequeno: (r.width < MIN && r.height < MIN) || r.height < 28,
        })
      }
      return out
    }, MIN_ALVO)

    const pequenos = alvos.filter(a => a.pequeno)

    // Toca no primeiro candidato de jogo e vê se a tela reage. Comparar a árvore
    // inteira é grosseiro de propósito: qualquer reação real (classe, texto, cor)
    // muda o HTML. Se NADA muda, o toque não fez nada.
    let mudos = 0
    // Tocar só no que é do JOGO (já filtrado acima). Antes isto pegava itens do menu
    // fechado e concluía que a atividade inteira não respondia ao dedo.
    const paraTocar = alvos.slice(0, 6)
    for (const alvo of paraTocar) {
      const antes = await pagina.evaluate(() => document.body.innerHTML.length + '|' + document.body.innerText.slice(0, 400))
      await pagina.touchscreen.tap(alvo.x, alvo.y).catch(() => {})
      await pagina.waitForTimeout(450)
      const depois = await pagina.evaluate(() => document.body.innerHTML.length + '|' + document.body.innerText.slice(0, 400))
      if (antes === depois) mudos++
    }

    const problemas = []
    if (pequenos.length) {
      const piores = pequenos.sort((a, b) => (a.w * a.h) - (b.w * b.h)).slice(0, 3)
      problemas.push(`${pequenos.length} alvo(s) < ${MIN_ALVO}px — menores: ` +
        piores.map(p => `${p.w}×${p.h}${p.rotulo ? ` "${p.rotulo}"` : ''}`).join(', '))
    }
    if (paraTocar.length && mudos === paraTocar.length) {
      problemas.push(`${mudos}/${paraTocar.length} toques sem NENHUMA reação na tela`)
    }
    if (errosJs.length) problemas.push(`erro JS: ${errosJs[0].slice(0, 90)}`)

    if (problemas.length) achados.push({ tipo, problemas })
    console.log(`${problemas.length ? '❌' : '✅'} ${tipo.padEnd(20)} ${problemas.join(' · ')}`)
  } catch (e) {
    achados.push({ tipo, problemas: ['não abriu: ' + String(e.message).slice(0, 80)] })
    console.log(`❌ ${tipo.padEnd(20)} não abriu: ${String(e.message).slice(0, 80)}`)
  }
  await pagina.close()
}

await navegador.close()

console.log(`\n${TIPOS.length - achados.length}/${TIPOS.length} atividades sem apontamento de toque`)
if (achados.length) {
  console.log('\nPara olhar de perto:')
  for (const a of achados) console.log(`  • ${a.tipo}: ${a.problemas.join(' | ')}`)
}
process.exit(achados.length ? 1 : 0)
