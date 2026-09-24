/**
 * testar-ajuda-flutuante.mjs — o botão único de ajuda abre o que promete?
 *
 * Os dois círculos fixos viraram um. `FAQButton` e `FeedbackButton` passaram a
 * poder ser abertos DE FORA (`semBotao` + `abertoExterno`), o que mexeu no fluxo
 * de abrir/fechar dos dois. Refatoração de controle é exatamente onde some um
 * caminho sem ninguém notar — então cada caminho é exercitado aqui.
 *
 * 🪤 E a validação do instrumento: antes de afirmar "abriu", o teste exige que o
 * painel NÃO esteja na tela antes do clique. Um seletor frouxo que casasse com
 * algo sempre presente aprovaria tudo.
 *
 * Uso: node testar-ajuda-flutuante.mjs <porta>
 */
import { chromium, devices } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ ...devices['Pixel 5'] })
await prepararContexto(ctx)

let falhas = 0
const ok = (cond, msg) => { console.log(`  ${cond ? '✅' : '🔴'} ${msg}`); if (!cond) falhas++ }

// ── 1. tela com layout: menu com as duas opções ─────────────────────────────
{
  const pag = await ctx.newPage()
  const erros = []
  pag.on('pageerror', e => erros.push(String(e).slice(0, 120)))
  await pag.goto(`${BASE}/home-crianca`, { waitUntil: 'networkidle' })
  await pag.waitForTimeout(700)

  console.log('\n1️⃣  /home-crianca — um botão só, menu com duas opções')

  const botoesFixos = await pag.evaluate(() => {
    const fixo = el => { for (let p = el; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).position === 'fixed') return true; return false }
    return [...document.querySelectorAll('button')]
      // 🪤 a 1ª versão casava pelo TEXTO "?" ou "✕" e contava o "Fechar menu" da
      // barra lateral como se fosse ajuda — dava 2 e acusava o conserto de falho.
      // O rótulo de acessibilidade é o que identifica o botão sem ambiguidade.
      .filter(b => { const r = b.getBoundingClientRect(); return fixo(b) && r.width > 0 && r.width <= 90 && /Ajuda/i.test(b.getAttribute('aria-label') || '') })
      .map(b => b.getAttribute('aria-label'))
  })
  ok(botoesFixos.length === 1, `círculo(s) de ajuda na tela: ${botoesFixos.length} (era 2, tem que ser 1)`)

  const ajuda = pag.getByRole('button', { name: /Ajuda e suporte/i })
  ok(await ajuda.count() === 1, 'botão de ajuda encontrado')

  // validação do instrumento: os painéis não podem já estar abertos
  ok(await pag.getByText('Perguntas frequentes sobre a plataforma').count() === 0, 'menu FECHADO antes do clique (instrumento válido)')

  await ajuda.first().click(); await pag.waitForTimeout(350)
  ok(await pag.getByText('Ajuda e dúvidas').count() > 0, 'menu abriu com "Ajuda e dúvidas"')
  ok(await pag.getByText('Relatar um problema').count() > 0, 'menu abriu com "Relatar um problema"')

  // caminho 1: FAQ
  await pag.getByText('Ajuda e dúvidas').first().click(); await pag.waitForTimeout(450)
  const faqAberto = await pag.getByPlaceholder(/buscar|pesquis/i).count() > 0 || await pag.getByText(/Perguntas frequentes|Central de ajuda|FAQ/i).count() > 0
  ok(faqAberto, 'painel de AJUDA abriu')
  await pag.keyboard.press('Escape'); await pag.waitForTimeout(250)

  // caminho 2: feedback
  await ajuda.first().click(); await pag.waitForTimeout(300)
  await pag.getByText('Relatar um problema').first().click(); await pag.waitForTimeout(450)
  const fbAberto = await pag.getByText(/Encontrou um erro|Enviar|O que aconteceu|feedback/i).count() > 0
  ok(fbAberto, 'painel de RELATAR PROBLEMA abriu')

  // fechar tocando fora do menu
  await pag.keyboard.press('Escape'); await pag.waitForTimeout(250)

  ok(erros.length === 0, `sem erro de JS${erros.length ? ': ' + erros[0] : ''}`)
  await pag.close()
}

// ── 2. telas que NÃO tinham ajuda nenhuma ───────────────────────────────────
console.log('\n2️⃣  as 5 telas que não tinham socorro alcançável')
for (const [rota, publica] of [['/auth', true], ['/recuperar-senha', true], ['/bloqueio', false], ['/ebook', false], ['/digitacao', false]]) {
  const pag = await ctx.newPage()
  try {
    await pag.goto(`${BASE}${rota}`, { waitUntil: 'networkidle' })
    await pag.waitForTimeout(700)
    const botao = pag.getByRole('button', { name: publica ? /^Ajuda$/i : /Ajuda e suporte/i })
    const achou = await botao.count() > 0
    ok(achou, `${rota.padEnd(18)} tem botão de ajuda${publica ? ' (só FAQ — feedback sem login é recusado pelo RLS)' : ''}`)
    if (achou && publica) {
      // sem login o feedback falharia calado: a opção não pode aparecer
      await botao.first().click(); await pag.waitForTimeout(400)
      ok(await pag.getByText('Relatar um problema').count() === 0, `${rota.padEnd(18)} NÃO oferece relatar problema (correto)`)
    }
  } catch (e) {
    ok(false, `${rota} erro: ${String(e.message).slice(0, 60)}`)
  }
  await pag.close()
}

await navegador.close()
console.log(`\n${falhas === 0 ? '✅ tudo passou' : `🔴 ${falhas} verificação(ões) falharam`}`)
process.exit(falhas === 0 ? 0 : 1)
