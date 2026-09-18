/**
 * testar-colorir-balde.mjs — prova que as atividades de Colorir do modo BALDE
 * DÃO PARA TERMINAR, jogando de verdade num celular com toque.
 *
 * POR QUE ESTE TESTE EXISTE
 * -------------------------
 * O `auditar-colorir.mjs` calcula: conta áreas, mede alcance, compara com o
 * dado. Mas a atividade só termina quando TODAS as áreas contáveis são pintadas,
 * e isso é comportamento, não geometria — só se prova pintando até o fim e
 * vendo a tela de "Ficou lindo!" aparecer.
 *
 * Foi o buraco que deixou 11 atividades inconcluíveis passar em 15/09: o
 * auditor daquele dia dizia "sem desenho" para todas elas (elas não têm
 * `dados.desenho`, têm `dados.imagem`), então ninguém mediu nada, e um cálculo
 * de áreas que ignora se o dedo alcança a área não acusaria o problema mesmo
 * que tivesse rodado.
 *
 * COMO ELE ACHA ONDE TOCAR
 * ------------------------
 * Fora do navegador, com o MESMO rotulador do app (`src/lib/balde.js`): para
 * cada área contável, o centro do maior círculo que cabe dentro dela — o ponto
 * mais "gordo", que é onde um dedo tem mais chance de acertar. Os pontos viram
 * fração da imagem e, no navegador, fração do retângulo do canvas.
 *
 * VALIDAÇÃO DO INSTRUMENTO
 * ------------------------
 * Antes de acreditar em qualquer ✅, o teste pinta UMA área só e EXIGE que a
 * tela de conclusão NÃO apareça. Sem isso, um seletor errado (ou uma tela que
 * sempre mostra "Ficou lindo!") aprovaria tudo sem medir nada — o mesmo erro do
 * teste de permissão que passava no 503.
 *
 * Uso: node testar-colorir-balde.mjs [porta]     (padrão 5190)
 *      É preciso ter o `npm run dev` rodando nessa porta (a rota /dev só existe
 *      em desenvolvimento).
 */
import { readFileSync, existsSync } from 'node:fs'
import sharp from 'sharp'
import { chromium, devices } from 'playwright'
import { rotularAreas, discosInscritos } from './src/lib/balde.js'
import { colorirExtraPorFaixa as exploradores } from './src/data/extra/exploradores.js'
import { colorirExtraPorFaixa as construtores } from './src/data/extra/construtores.js'
import { colorirExtraPorFaixa as criadores } from './src/data/extra/criadores.js'
import { colorirExtraPorFaixa as inventores } from './src/data/extra/inventores.js'

const PORTA = process.argv[2] || '5190'
const BASE = `http://localhost:${PORTA}`

const FAIXAS = { exploradores, construtores, criadores, inventores }
const alvos = []
for (const [faixa, lista] of Object.entries(FAIXAS)) {
  for (const a of lista) if (a?.dados?.imagem) alvos.push({ faixa, a })
}

/** Centro do maior círculo de cada área contável, em fração da imagem. */
async function pontosDeToque(src) {
  const caminho = `public${src}`
  if (!existsSync(caminho)) throw new Error(`imagem não existe: ${caminho}`)
  const { data, info } = await sharp(readFileSync(caminho))
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const r = rotularAreas({ width: info.width, height: info.height, data })
  const discos = r.raios ?? discosInscritos(r.rotulos, info.width, info.height)
  const pontos = [...r.contaveis].map(rot => {
    const d = discos.get(rot)
    return { fx: (d.x + 0.5) / info.width, fy: (d.y + 0.5) / info.height, raio: d.raio }
  })
  return { pontos, total: r.total }
}

const CHILD = faixa => ({
  id: '11111111-2222-3333-4444-555555555555',
  nome: 'Teste QA', avatar: '🦊', nivel: 3, xp: 420,
  neural_coins: 120, streak_atual: 4, faixa_etaria: faixa,
})

async function abrir(browser, id, faixa) {
  const context = await browser.newContext({ ...devices['Pixel 5'] })
  await context.addInitScript(([child]) => {
    try {
      sessionStorage.setItem('ns_dev_bypass', '1')
      localStorage.setItem('ns_active_child', JSON.stringify(child))
    } catch { /* modo privado */ }
  }, [CHILD(faixa)])
  const page = await context.newPage()
  const erros = []
  page.on('pageerror', e => erros.push(String(e)))
  await page.goto(`${BASE}/dev/atividade/colorir?id=${id}`, { waitUntil: 'networkidle' })

  if (await page.locator('[data-dev-erro="id-nao-encontrado"]').count()) {
    throw new Error(`a bancada não encontrou o id ${id} (módulo não importado em DevAtividade?)`)
  }
  // O guard de faixa troca o botão por "Solicitar autorização" quando a criança
  // de teste é de outra idade. Isso apareceria como "0 toques funcionaram".
  if (await page.getByText('Solicitar autorização').count()) {
    throw new Error(`guard de faixa barrou ${id}: a criança de teste não é ${faixa}`)
  }
  await page.getByRole('button', { name: /Começar Atividade/ }).click()
  await page.waitForSelector('canvas', { state: 'visible', timeout: 15000 })
  // O rotulador roda no `onload` da imagem; antes disso o rótulo do progresso é '—'.
  await page.waitForFunction(() => /\d+\s*\/\s*\d+/.test(document.body.innerText), null, { timeout: 30000 })
  return { context, page, erros }
}

async function tocar(page, ponto) {
  const caixa = await page.locator('canvas').boundingBox()
  await page.touchscreen.tap(
    Math.round(caixa.x + ponto.fx * caixa.width),
    Math.round(caixa.y + ponto.fy * caixa.height),
  )
}

const concluiu = page => page.getByText('Ficou lindo!').count().then(n => n > 0)
const rotulo = async page => {
  const m = (await page.locator('body').innerText()).match(/(\d+)\s*\/\s*(\d+)/)
  return m ? { pintadas: Number(m[1]), total: Number(m[2]) } : null
}

const browser = await chromium.launch()
let falhas = 0

// ── 0. VALIDAÇÃO DO INSTRUMENTO ────────────────────────────────────────────
{
  const { faixa, a } = alvos[0]
  const { pontos } = await pontosDeToque(a.dados.imagem.src)
  const { context, page } = await abrir(browser, a.id, faixa)
  await tocar(page, pontos[0])
  await page.waitForTimeout(700)
  const cedo = await concluiu(page)
  console.log(`🔬 controle: com 1 de ${pontos.length} áreas pintadas, conclusão ${cedo ? 'APARECEU ❌ (o teste não sabe reprovar)' : 'não apareceu ✅'}`)
  await context.close()
  if (cedo) { await browser.close(); process.exit(1) }
}

console.log(`\n🪣 Colorir balde — jogando até o fim em Pixel 5 (toque real)\n`)

for (const { faixa, a } of alvos) {
  const t0 = Date.now()
  let context
  try {
    const { pontos, total } = await pontosDeToque(a.dados.imagem.src)
    const aberto = await abrir(browser, a.id, faixa)
    context = aberto.context
    const { page, erros } = aberto

    const inicial = await rotulo(page)
    if (!inicial || inicial.total !== total) {
      console.log(`  🔴 ${a.id.padEnd(24)} a tela diz ${inicial?.total} áreas e o rotulador diz ${total}`)
      falhas++
      await context.close()
      continue
    }
    if (a.dados.imagem.areas !== total) {
      console.log(`  🔴 ${a.id.padEnd(24)} o dado declara ${a.dados.imagem.areas} e a tela mostra ${total}`)
      falhas++
    }

    for (const p of pontos) {
      await tocar(page, p)
      await page.waitForTimeout(90)
    }
    await page.waitForTimeout(900)

    const fim = await concluiu(page)
    const podeConcluir = await page.getByRole('button', { name: /Concluir/ }).count()
    const marcador = await rotulo(page)
    const seg = ((Date.now() - t0) / 1000).toFixed(0)

    if (fim && podeConcluir && !erros.length) {
      console.log(`  ✅ ${a.id.padEnd(24)} ${pontos.length} toques → "Ficou lindo!" + Concluir ✓  (${seg}s)`)
    } else {
      console.log(`  🔴 ${a.id.padEnd(24)} ${pontos.length} toques e NÃO terminou` +
        ` (parou em ${marcador?.pintadas}/${marcador?.total}${erros.length ? `, ${erros.length} erro(s) de JS` : ''})`)
      for (const e of erros.slice(0, 2)) console.log(`       ${e.split('\n')[0]}`)
      falhas++
    }
  } catch (e) {
    console.log(`  🔴 ${a.id.padEnd(24)} ${e.message}`)
    falhas++
  } finally {
    if (context) await context.close()
  }
}

await browser.close()
console.log(falhas
  ? `\n🔴 ${falhas} de ${alvos.length} atividades do balde NÃO se concluem.\n`
  : `\n✅ as ${alvos.length} atividades do balde se concluem pintando só as áreas alcançáveis.\n`)
process.exit(falhas ? 1 : 0)
