/**
 * medir-tabuleiros.mjs — o tabuleiro do jogo cabe na tela do celular?
 *
 * O QUE ESTE TESTE COBRE QUE NENHUM OUTRO COBRIA
 * ----------------------------------------------
 * Três atividades desenham um tabuleiro com o tamanho da célula calculado em
 * PIXELS, a partir de uma largura fixa de tela de computador e com um PISO que
 * impede a grade de encolher:
 *
 *   Labirinto  Math.max(28, 400 / tamanho)   tamanho vai até 15
 *   Robô       Math.max(48, 360 / grade)     grade   vai até 8
 *   Blocos     Math.max(40, 360 / grade)     grade   vai até 8
 *
 * Num celular de 360px a grade passa da largura da tela, e o `.game-content` é
 * `overflow: hidden auto` — corta a horizontal de propósito. O pedaço que vaza
 * não volta com rolagem: some. No Labirinto isso escondia a bandeira 🏁 da
 * saída, que fica justamente no canto inferior direito.
 *
 * 🪤 POR QUE AS AUDITORIAS EXISTENTES DÃO "24/24" E NÃO CONTRADIZEM ISTO:
 *  - `auditar-atividades` abre só a PRIMEIRA atividade de cada tipo — sempre a
 *    menor grade. O caso extremo nunca foi aberto.
 *  - a auditoria de alcance mede CONTROLE interativo inalcançável; as células
 *    do tabuleiro não são clicáveis (quem move é o botão de seta), então uma
 *    grade cortada não tem nada para ela acusar.
 *  - `auditar-toque` também joga pelos controles, não pelo tabuleiro.
 *
 * VALIDAÇÃO DO INSTRUMENTO
 * ------------------------
 * Mede também numa janela de 1280px, onde tudo cabe com folga: se acusar corte
 * lá, a medida está errada e o resultado do celular não vale nada.
 *
 * Uso: node medir-tabuleiros.mjs [porta]     (padrão 5190)
 */
import { chromium } from 'playwright'
import { prepararContexto, CRIANCA_TESTE } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5190'
const BASE = `http://localhost:${PORTA}`

// 🪤 A CRIANÇA DE TESTE PRECISA SER DA FAIXA DA ATIVIDADE. A `IntroAtividade` lê
// `ns_active_child` do localStorage e, se a atividade for de faixa superior,
// mostra o pedido de senha do responsável no lugar do botão "Começar" — o teste
// trava esperando um botão que nunca aparece e o erro parece bug de conteúdo.
// Mesma armadilha já paga em `testar-quiz-novos.mjs`.
const FAIXA_POR_PREFIXO = { exp: 'exploradores', con: 'construtores', cri: 'criadores', inv: 'inventores' }
const faixaDoId = (id) => FAIXA_POR_PREFIXO[id.slice(0, 3)] || 'construtores'

// Os casos EXTREMOS de cada tipo — o maior tabuleiro que existe no conteúdo.
const CASOS = [
  { tipo: 'labirinto', id: 'exp_labirinto_floresta',   nota: '5×5' },
  { tipo: 'labirinto', id: 'con_labirinto_piramide',   nota: '9×9' },
  { tipo: 'labirinto', id: 'cri_labirinto_computador', nota: '13×13' },
  { tipo: 'labirinto', id: 'inv_labirinto_matrix',     nota: '15×15' },
  // 🪤 O nível 1 nem sempre é o maior tabuleiro da atividade — a grade cresce a
  // cada nível. Estes são os que TÊM níveis de grade 8, o teto do conteúdo.
  { tipo: 'robo',      id: 'inv_robo_2',               nota: 'tem grade 8' },
  { tipo: 'robo',      id: 'cri_robo_4',               nota: 'grade média' },
  { tipo: 'blocos',    id: 'inv_blocos_4',             nota: 'tem grade 8' },
  { tipo: 'blocos',    id: 'cri_blocos_3',             nota: 'grade média' },
]

const TELAS = [
  { nome: 'celular-p', largura: 360, altura: 740, controle: false },
  { nome: 'celular',   largura: 390, altura: 844, controle: false },
  { nome: 'janela',    largura: 1280, altura: 800, controle: true },
]

async function medir(page, caso, tela) {
  await page.setViewportSize({ width: tela.largura, height: tela.altura })
  await page.goto(`${BASE}/dev/atividade/${caso.tipo}?id=${caso.id}`, { waitUntil: 'domcontentloaded' })

  const comecar = page.getByRole('button', { name: /Começar/i }).first()
  await comecar.waitFor({ timeout: 20000 })
  await comecar.click()

  // Espera o tabuleiro existir de verdade antes de medir — medir cedo devolve
  // "nada vaza" numa tela que ainda não desenhou.
  await page.waitForFunction(() => {
    const area = document.querySelector('.game-content')
    return area && area.querySelectorAll('div').length > 20
  }, { timeout: 20000 })

  return page.evaluate(() => {
    const area = document.querySelector('.game-content')
    if (!area) return { erro: 'sem .game-content' }

    const limite = area.getBoundingClientRect()

    // Um elemento só está PERDIDO se vaza E nenhum ancestral rola na horizontal
    // para trazê-lo de volta. Ver [[feedback_vazamento_alcancavel_vs_inalcancavel]].
    const alcancavel = (el) => {
      let no = el
      while (no && no !== document.body) {
        const est = getComputedStyle(no)
        if (/(auto|scroll)/.test(est.overflowX) && no.scrollWidth > no.clientWidth + 1) return true
        no = no.parentElement
      }
      return false
    }

    let piorVazamento = 0
    let larguraTabuleiro = 0
    for (const el of area.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      larguraTabuleiro = Math.max(larguraTabuleiro, Math.round(r.width))
      const vaza = Math.round(r.right - limite.right)
      if (vaza > 1 && !alcancavel(el)) piorVazamento = Math.max(piorVazamento, vaza)
    }

    return {
      larguraArea: Math.round(limite.width),
      larguraTabuleiro,
      vazamentoPerdido: piorVazamento,
    }
  })
}

const navegador = await chromium.launch()

let problemas = 0
let instrumentoOk = true

for (const tela of TELAS) {
  console.log(`\n═══ ${tela.nome} (${tela.largura}px) ═══`)
  for (const caso of CASOS) {
    const ctx = await navegador.newContext()
    await prepararContexto(ctx, {
      ns_active_child: JSON.stringify({ ...CRIANCA_TESTE, faixa_etaria: faixaDoId(caso.id) }),
    })
    const page = await ctx.newPage()

    let m
    try {
      m = await medir(page, caso, tela)
    } catch (e) {
      console.log(`  ⚠️  ${caso.id.padEnd(24)} não abriu: ${e.message.split('\n')[0]}`)
      await ctx.close()
      continue
    }

    const cortado = m.vazamentoPerdido > 1
    if (cortado) {
      problemas++
      if (tela.controle) instrumentoOk = false
    }
    console.log(
      `  ${cortado ? '🔴' : '✅'} ${caso.tipo.padEnd(10)} ${caso.id.padEnd(24)} ${caso.nota.padEnd(12)}` +
      ` área ${String(m.larguraArea).padStart(4)}px` +
      `  ${cortado ? `CORTA ${m.vazamentoPerdido}px sem rolagem` : 'cabe'}`
    )
    await ctx.close()
  }
}

await navegador.close()

console.log(`\n${problemas} combinação(ões) com pedaço do jogo perdido fora da tela.`)
if (!instrumentoOk) {
  console.log('❌ INSTRUMENTO REPROVADO: acusou corte na janela de 1280px, onde tudo cabe.')
  process.exit(2)
}
console.log('✅ Instrumento validado: nada acusado na janela larga.')
process.exit(problemas > 0 ? 1 : 0)
