/**
 * testar-historia-video.mjs — prova o vídeo por cena na História Ilustrada.
 *
 * Os 3 vídeos de "Luna e o Dente de Banana" (canal NeuralSync) entraram como
 * `video_id` nas cenas da categoria `dinossauros`. Este teste confere que:
 *
 *  1. a cena 1 mostra IFRAME e não o emoji, com o id certo;
 *  2. navegar de cena TROCA o vídeo — um `key` errado no iframe deixaria o
 *     player da cena 1 tocando enquanto o texto já é o da cena 2, e isso passa
 *     despercebido em conferência rápida;
 *  3. uma categoria SEM vídeo continua mostrando o emoji — a mudança não pode
 *     ter quebrado as outras 17 histórias;
 *  4. nada de CSP aparece no console.
 *
 * ⚠️ O item 4 vale POUCO rodando contra o servidor de desenvolvimento: o Vite
 * não aplica o `public/_headers`, então "nenhuma violação" ali é quase de
 * graça. A garantia real veio de conferir que a política PUBLICADA
 * (`dist/_headers`) traz `https://www.youtube-nocookie.com` no `frame-src`.
 * O item fica como rede contra regressão barulhenta, não como prova.
 *
 * 🪤 NÃO prova que o vídeo TOCA. O player é um iframe de terceiro; o que se
 * garante aqui é que o embed está montado com o id certo e não foi bloqueado.
 * Que os 3 são públicos e incorporáveis foi conferido à parte, pelo oEmbed do
 * YouTube (privado não incorpora e o player fica preto).
 *
 * Uso: node testar-historia-video.mjs [porta]     (padrão 5193)
 */
import { chromium } from 'playwright'

const PORTA = process.argv[2] || '5193'
const BASE = `http://localhost:${PORTA}`

const ESPERADOS = ['zNrztG-J9oU', 'Mfm-XmBTbVA', 'Tgvjx59-LbM']
const SEM_VIDEO = 'corpo_humano'

const CHILD = {
  id: '11111111-2222-3333-4444-555555555555',
  nome: 'Teste', avatar: '🦊', faixa_etaria: 'construtores',
  nivel: 3, xp: 420, neural_coins: 90, streak_atual: 2,
}

let falhas = 0
const ok   = m => console.log(`  ✅ ${m}`)
const erro = m => { console.log(`  🔴 ${m}`); falhas++ }

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
await ctx.addInitScript(child => {
  sessionStorage.setItem('ns_dev_bypass', '1')
  localStorage.setItem('ns_active_child', child)
}, JSON.stringify(CHILD))

const page = await ctx.newPage()
const violacoes = []
page.on('console', m => { if (/Content Security Policy|Refused to frame/i.test(m.text())) violacoes.push(m.text()) })

const idDoIframe = () => page.evaluate(() => {
  const f = document.querySelector('iframe[src*="youtube"]')
  if (!f) return null
  return (f.getAttribute('src').match(/embed\/([\w-]+)/) || [])[1] || 'sem-id'
})

try {
  console.log('\n① dinossauros — as 3 cenas\n')
  await page.goto(`${BASE}/kids/dinossauros`, { waitUntil: 'networkidle', timeout: 25000 })
  await page.waitForTimeout(900)

  // 🪤 Esperar o SELETOR, não um tempo fixo. Com `waitForTimeout(900)` o teste
  // acusou "cena 1: encontrado null" enquanto a página estava correta — o
  // iframe só existia alguns instantes depois. Falso reprovado por relógio.
  await page.waitForSelector('iframe[src*="youtube"]', { timeout: 15000 })
    .catch(() => erro('nenhum iframe de vídeo apareceu na cena 1'))

  const primeiro = await idDoIframe()
  primeiro === ESPERADOS[0]
    ? ok(`cena 1 mostra o vídeo ${primeiro} (e não o emoji)`)
    : erro(`cena 1: esperado ${ESPERADOS[0]}, encontrado ${primeiro}`)

  // A navegação de cena é por BOLINHAS, não por botão com texto — a 1ª versão
  // deste teste procurou "Próxima" e não achou nada.
  for (let i = 1; i < ESPERADOS.length; i++) {
    const trocou = await page.evaluate(i => {
      // As bolinhas são os últimos botões do cartão da história, um por cena.
      const cartao = document.querySelector('iframe[src*="youtube"]')?.closest('div[style*="border-radius"]')?.parentElement?.parentElement
      const botoes = [...(cartao?.querySelectorAll('button') ?? [])].filter(b => !b.innerText.trim())
      if (botoes.length <= i) return false
      botoes[i].click()
      return true
    }, i)
    if (!trocou) { erro(`não achei a bolinha da cena ${i + 1}`); break }
    await page.waitForFunction(
      esperado => document.querySelector('iframe[src*="youtube"]')?.src.includes(esperado),
      ESPERADOS[i], { timeout: 8000 },
    ).catch(() => {})
    const atual = await idDoIframe()
    atual === ESPERADOS[i]
      ? ok(`cena ${i + 1} trocou para ${atual}`)
      : erro(`cena ${i + 1}: esperado ${ESPERADOS[i]}, encontrado ${atual}`)
  }

  console.log(`\n② ${SEM_VIDEO} — categoria sem vídeo continua com emoji\n`)
  await page.goto(`${BASE}/kids/${SEM_VIDEO}`, { waitUntil: 'networkidle', timeout: 25000 })
  await page.waitForTimeout(900)
  const semVideo = await idDoIframe()
  semVideo === null
    ? ok('nenhum iframe — o emoji continua no lugar')
    : erro(`apareceu iframe (${semVideo}) numa categoria que não tem vídeo`)

  console.log('\n③ CSP\n')
  violacoes.length === 0
    ? ok('nenhuma violação de CSP no console')
    : erro(`${violacoes.length} violação(ões): ${violacoes[0].slice(0, 110)}`)
} finally {
  await browser.close()
}

console.log(falhas === 0
  ? '\n✅ Vídeo por cena funcionando.\n'
  : `\n🔴 ${falhas} falha(s).\n`)
process.exit(falhas === 0 ? 0 : 1)
