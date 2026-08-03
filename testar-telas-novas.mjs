// Verifica as duas telas novas da sessão de 31/07: /primeiros-passos e /feedbacks.
//
// Build passando NÃO prova nada aqui: rota errada é erro de execução — o router cai no
// NotFound e redireciona pro /dashboard em silêncio, exatamente o que aconteceu com
// Colorir e Sílabas em 04/07. Este script confirma que a URL PERMANECE na rota pedida.
//
// Uso:  node testar-telas-novas.mjs [porta]

import { chromium } from 'playwright'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

// A marca é uma expressão porque a /feedbacks tem DOIS estados legítimos: o painel em si
// (para quem está em `ns_admins`) e o aviso de "esta tela é da administração". Enquanto a
// migration 021 não for aplicada, o segundo é o correto — a tabela nem existe.
// ⚠️ Isto confirma que a rota existe e desenha. NÃO confirma o painel cheio: para isso é
// preciso a 021 aplicada e o usuário cadastrado como admin.
const TELAS = [
  { rota: '/primeiros-passos', marca: /primeiros passos/i },
  { rota: '/feedbacks',        marca: /administra/i },
]
const LARGURAS = [360, 390, 820, 1280]

const navegador = await chromium.launch()
let falhas = 0

for (const largura of LARGURAS) {
  const contexto = await navegador.newContext({ viewport: { width: largura, height: 800 } })

  // precisa rodar ANTES de qualquer script da página: o guard de rota já teria
  // redirecionado se o sinalizador não estivesse gravado a tempo.
  await contexto.addInitScript(() => {
    sessionStorage.setItem('ns_dev_bypass', '1')
  })

  for (const tela of TELAS) {
    const pagina = await contexto.newPage()
    const errosJs = []
    pagina.on('pageerror', e => errosJs.push(e.message))
    pagina.on('console', m => { if (m.type() === 'error') errosJs.push(m.text()) })

    await pagina.goto(BASE + tela.rota, { waitUntil: 'networkidle' })
    await pagina.waitForTimeout(900)

    const rotaFinal = new URL(pagina.url()).pathname
    const texto = await pagina.evaluate(() => document.body.innerText)
    const medida = await pagina.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      janela: window.innerWidth,
    }))

    const ficou = rotaFinal === tela.rota
    const renderizou = tela.marca.test(texto)
    const vazou = medida.scroll > medida.janela + 1
    // só o que atrapalha: ruído de rede da sessão falsa (401/406 do Supabase) é esperado
    const errosReais = errosJs.filter(e =>
      !/Failed to load resource|401|406|400 \(\)|net::ERR/i.test(e))

    const ok = ficou && renderizou && !vazou && errosReais.length === 0
    if (!ok) falhas++

    console.log(
      `${ok ? '✅' : '❌'} ${String(largura).padStart(4)}px  ${tela.rota.padEnd(20)}` +
      `${ficou ? '' : ` REDIRECIONOU para ${rotaFinal}`}` +
      `${renderizou || !ficou ? '' : ` não achei ${tela.marca} na tela`}` +
      `${vazou ? ` VAZOU ${medida.scroll - medida.janela}px` : ''}` +
      `${errosReais.length ? ` erro JS: ${errosReais[0].slice(0, 110)}` : ''}`
    )

    await pagina.close()
  }
  await contexto.close()
}

await navegador.close()

const total = LARGURAS.length * TELAS.length
console.log(`\n${total - falhas}/${total} combinações limpas`)
process.exit(falhas === 0 ? 0 : 1)
