/**
 * testar-foco.mjs — prova o modo foco (tela cheia) das atividades.
 *
 * POR QUE ESTE TESTE EXISTE SEPARADO
 * ----------------------------------
 * `auditar-atividades.mjs` e `auditar-telas.mjs` rodam com o modo foco
 * DESLIGADO, que é o padrão. Rodar as duas e ver "24/24" não diz nada sobre o
 * foco — mediria a tela que já existia antes da mudança.
 *
 * O QUE ELE VERIFICA, e por quê cada um
 * -------------------------------------
 *  1. as duas colunas somem                → é o efeito pedido
 *  2. a alça do MenuLateral some           → idem
 *  3. o BOTÃO DE VOLTAR CONTINUA VISÍVEL   → 🔑 o item que importa: o
 *     MenuLateral foi criado em 21/07 justamente porque dentro da atividade não
 *     havia saída. Um modo "tela cheia" que esconde a última saída recria o
 *     buraco, e o sintoma seria uma criança presa numa tela sem erro nenhum.
 *  4. a área do jogo CRESCE                → se não crescer, o modo não serve
 *     pra nada e a mudança foi só enfeite
 *  5. o alvo do botão de foco ≥ 44px no toque → mesma regra das tiras de
 *     navegação corrigidas em 02/08
 *  6. Esc desliga                          → é o reflexo de quem está em tela cheia
 *
 * VALIDAÇÃO DO INSTRUMENTO
 * ------------------------
 * Antes de medir o foco ligado, mede DESLIGADO e exige que as colunas ESTEJAM
 * lá na largura de desktop. Um seletor errado devolveria "não encontrei" nas
 * duas vezes e o teste passaria feliz sem medir coisa alguma.
 *
 * Uso: node testar-foco.mjs [porta]     (padrão 5190)
 */
import { chromium, devices } from 'playwright'

const PORTA = process.argv[2] || '5190'
const BASE = `http://localhost:${PORTA}`
const ROTA = '/dev/atividade/quiz'

// A alça do MenuLateral não tem classe nenhuma — é identificada pelo rótulo de
// acessibilidade. Um seletor de classe inventado aqui não casaria com nada e a
// verificação passaria sempre, sem medir. Ela entra na validação do instrumento
// abaixo justamente por isso.
const ALCA_MENU = 'button[aria-label="Abrir menu de navegação"]'

const CHILD = {
  id: '11111111-2222-3333-4444-555555555555',
  nome: 'Teste', avatar: '🦊', faixa_etaria: 'construtores',
  nivel: 3, xp: 420, neural_coins: 90, streak_atual: 2,
}

let falhas = 0
const ok   = m => console.log(`  ✅ ${m}`)
const erro = m => { console.log(`  🔴 ${m}`); falhas++ }

async function abrir(browser, { foco, mobile }) {
  const ctx = await browser.newContext(
    mobile ? devices['Pixel 5'] : { viewport: { width: 1440, height: 900 } },
  )
  await ctx.addInitScript(([child, foco]) => {
    sessionStorage.setItem('ns_dev_bypass', '1')
    localStorage.setItem('ns_active_child', child)
    localStorage.setItem('ns_foco_atividade', foco)
  }, [JSON.stringify(CHILD), foco ? '1' : '0'])

  const page = await ctx.newPage()
  await page.goto(BASE + ROTA, { waitUntil: 'networkidle', timeout: 20000 })

  // A IntroAtividade abre ANTES da atividade e não é o GameShell — esperar por
  // `.game-shell` aqui estoura o tempo. Tem que passar pela intro primeiro.
  const comecar = page.getByRole('button', { name: /come[çc]ar|vamos|jogar|iniciar/i }).first()
  if (await comecar.count()) {
    await comecar.click({ timeout: 3000 }).catch(() => {})
    await page.waitForTimeout(900)
  }

  await page.waitForSelector('.game-shell', { timeout: 15000 })
  return { ctx, page }
}

const visivel = (page, sel) => page.evaluate(s => {
  const el = document.querySelector(s)
  if (!el) return { existe: false, visivel: false }
  const r = el.getBoundingClientRect()
  return { existe: true, visivel: r.width > 0 && r.height > 0 }
}, sel)

const larguraDoJogo = page => page.evaluate(() => {
  const el = document.querySelector('.game-content')
  return el ? Math.round(el.getBoundingClientRect().width) : 0
})

const alturaDoJogo = page => page.evaluate(() => {
  const el = document.querySelector('.game-content')
  return el ? Math.round(el.getBoundingClientRect().height) : 0
})

const browser = await chromium.launch()

try {
  // ── 0. Instrumento: com foco DESLIGADO as colunas têm que existir ──────────
  console.log('\n① Validação do instrumento (foco desligado, 1440px)')
  {
    const { ctx, page } = await abrir(browser, { foco: false, mobile: false })
    const esq = await visivel(page, '.game-sidebar-left')
    const dir = await visivel(page, '.game-sidebar-right')
    esq.visivel ? ok('coluna esquerda presente (o seletor acha mesmo)')
                : erro('coluna esquerda NÃO apareceu nem com foco desligado — o teste não está medindo nada')
    dir.visivel ? ok('coluna direita presente')
                : erro('coluna direita NÃO apareceu nem com foco desligado')
    const alca = await visivel(page, ALCA_MENU)
    alca.visivel ? ok('alça do menu lateral presente (o seletor acha mesmo)')
                 : erro('alça do menu NÃO apareceu nem com foco desligado — o seletor está errado e essa verificação não mede nada')
    globalThis.__larguraSemFoco = await larguraDoJogo(page)
    globalThis.__alturaSemFoco  = await alturaDoJogo(page)
    console.log(`     área do jogo sem foco: ${globalThis.__larguraSemFoco}×${globalThis.__alturaSemFoco}px`)
    await ctx.close()
  }

  // ── 1. Foco ligado no desktop ─────────────────────────────────────────────
  console.log('\n② Foco ligado (1440px)')
  {
    const { ctx, page } = await abrir(browser, { foco: true, mobile: false })

    const esq = await visivel(page, '.game-sidebar-left')
    const dir = await visivel(page, '.game-sidebar-right')
    !esq.visivel ? ok('coluna esquerda escondida') : erro('coluna esquerda continua visível')
    !dir.visivel ? ok('coluna direita escondida')  : erro('coluna direita continua visível')

    const menu = await visivel(page, ALCA_MENU)
    !menu.visivel ? ok('alça do menu lateral fora de cena') : erro('alça do menu lateral continua visível')

    // 🔑 O ITEM QUE IMPORTA
    const saida = await page.evaluate(() => {
      const b = document.querySelector('.game-topbar button')
      if (!b) return { existe: false }
      const r = b.getBoundingClientRect()
      const noAlcance = r.top >= 0 && r.left >= 0
        && r.bottom <= innerHeight && r.right <= innerWidth
      return { existe: true, visivel: r.width > 0 && r.height > 0, noAlcance,
               caixa: `${Math.round(r.width)}×${Math.round(r.height)}` }
    })
    saida.existe && saida.visivel && saida.noAlcance
      ? ok(`botão de voltar continua na tela e alcançável (${saida.caixa})`)
      : erro(`SAÍDA PERDIDA — a criança fica presa na atividade (${JSON.stringify(saida)})`)

    const l = await larguraDoJogo(page)
    const a = await alturaDoJogo(page)
    const ganhoL = l - globalThis.__larguraSemFoco
    const ganhoA = a - globalThis.__alturaSemFoco
    ganhoL > 0 || ganhoA > 0
      ? ok(`área do jogo cresceu: ${globalThis.__larguraSemFoco}×${globalThis.__alturaSemFoco} → ${l}×${a} (+${ganhoL}px de largura, +${ganhoA}px de altura)`)
      : erro(`área do jogo não cresceu (${l}×${a}) — o modo não entrega nada`)

    // Esc desliga
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
    const voltou = await visivel(page, '.game-sidebar-left')
    voltou.visivel ? ok('Esc sai do modo foco') : erro('Esc não saiu do modo foco')

    await ctx.close()
  }

  // ── 2. Celular: alvo de toque e saída ─────────────────────────────────────
  console.log('\n③ Foco ligado no celular (Pixel 5, toque)')
  {
    const { ctx, page } = await abrir(browser, { foco: true, mobile: true })

    const botao = await page.evaluate(() => {
      const b = document.querySelector('.ns-foco-btn')
      if (!b) return null
      const r = b.getBoundingClientRect()
      return { w: Math.round(r.width), h: Math.round(r.height) }
    })
    if (!botao) erro('botão de foco não encontrado no celular')
    else if (botao.w >= 44 && botao.h >= 44) ok(`alvo do botão de foco ${botao.w}×${botao.h} (≥44px)`)
    else erro(`alvo do botão de foco ${botao.w}×${botao.h} — abaixo de 44px, o dedo erra`)

    // No modo foco este botão é a ÚNICA saída — então aqui ele é medido, não
    // só procurado. Alcançável mas pequeno demais para o dedo é o mesmo que
    // não ter saída.
    const saida = await page.evaluate(() => {
      const b = document.querySelector('.game-topbar button')
      if (!b) return null
      const r = b.getBoundingClientRect()
      return {
        w: Math.round(r.width), h: Math.round(r.height),
        naTela: r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth,
      }
    })
    if (!saida || !saida.naTela) erro('SAÍDA PERDIDA no celular')
    else if (saida.w >= 44 && saida.h >= 44) ok(`saída (voltar) alcançável e com alvo ${saida.w}×${saida.h}`)
    else erro(`saída (voltar) com alvo ${saida.w}×${saida.h} — abaixo de 44px, e no foco é a única saída`)

    // ⚠️ Isto NÃO prova o safe-area: o Playwright não emula entalhe, então
    // `env(safe-area-inset-top)` vale 0 aqui e o valor medido é só o padding
    // base. O que se garante é que a regra do foco não zerou o padding do topo
    // — o `calc(8px + env(...))` em si só dá pra conferir em aparelho real.
    const paddingTopo = await page.evaluate(() => {
      const tb = document.querySelector('.game-shell--foco .game-topbar')
      return tb ? parseFloat(getComputedStyle(tb).paddingTop) : null
    })
    paddingTopo >= 8 ? ok(`padding-top do topbar em foco: ${paddingTopo}px (sem entalhe emulado)`)
                     : erro(`padding-top do topbar em foco: ${paddingTopo}px — o topo ficou colado na borda`)

    await ctx.close()
  }
} finally {
  await browser.close()
}

console.log(falhas === 0
  ? '\n✅ Modo foco: todas as verificações passaram.\n'
  : `\n🔴 ${falhas} falha(s) no modo foco.\n`)
process.exit(falhas === 0 ? 0 : 1)
