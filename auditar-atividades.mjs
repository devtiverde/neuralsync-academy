/**
 * Auditoria automatizada das telas de atividade.
 *
 * Mede, em cada atividade e em cada tamanho de tela, se:
 *   1. a PÁGINA rola (documento maior que a janela) — é o bug que faz o
 *      tabuleiro subir e sair de vista quando a criança usa a roda do mouse;
 *   2. algum conteúdo está sendo CORTADO pela trava de tela (o oposto: cabe
 *      menos do que o jogo precisa, então parte do jogo fica invisível);
 *   3. houve erro de JavaScript ao montar.
 *
 * Roda contra o servidor de desenvolvimento, usando a rota /dev/atividade/:tipo.
 * Uso:  node auditar-atividades.mjs [porta]
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const PORTA = process.argv[2] || '5199'
const BASE = `http://localhost:${PORTA}`
const SAIDA = 'auditoria-atividades'

const TIPOS = [
  'quiz', 'memoria', 'sequencia', 'labirinto', 'robo', 'padrao', 'quizia',
  'inventor', 'blocos', 'numeros', 'formas', 'cores', 'alfabeto',
  'sequencia-magica', 'quebra-cabeca', 'caca-palavras', 'historia-interativa',
  'classificar-objetos', 'conectar-pontos', 'ingles', 'colorir', 'silabas',
  'musica', 'zona-emocoes',
]

const TELAS = [
  { nome: 'notebook', largura: 1366, altura: 768 },   // o tamanho mais comum de PC
  { nome: 'desktop',  largura: 1920, altura: 1080 },
  { nome: 'janela',   largura: 1100, altura: 720 },   // janela não maximizada
  { nome: 'celular',  largura: 390,  altura: 844 },
]

mkdirSync(SAIDA, { recursive: true })

const navegador = await chromium.launch()
const resultados = []

for (const tela of TELAS) {
  const contexto = await navegador.newContext({
    viewport: { width: tela.largura, height: tela.altura },
    isMobile: tela.nome === 'celular',
    hasTouch: tela.nome === 'celular',
    deviceScaleFactor: 1,
  })

  for (const tipo of TIPOS) {
    const pagina = await contexto.newPage()
    const erros = []
    pagina.on('pageerror', e => erros.push(String(e.message)))

    try {
      await pagina.goto(`${BASE}/dev/atividade/${tipo}`, { waitUntil: 'networkidle', timeout: 20000 })

      // Quase toda atividade abre na tela de introdução ("Vamos começar!").
      // O que interessa auditar é o JOGO, então entra nele quando possível.
      const comecar = pagina.getByRole('button', { name: /come[çc]ar|vamos|jogar|iniciar/i }).first()
      if (await comecar.count()) {
        await comecar.click({ timeout: 3000 }).catch(() => {})
        await pagina.waitForTimeout(900)
      }

      const m = await pagina.evaluate(() => {
        const d = document.documentElement
        const b = document.body
        const alturaJanela = window.innerHeight
        // Maior elemento que ultrapassa a janela na vertical, ignorando o que
        // tem rolagem própria autorizada (as laterais do GameShell).
        let cortado = null
        for (const el of document.querySelectorAll('body *')) {
          const est = getComputedStyle(el)
          if (est.position === 'fixed' || est.display === 'none') continue
          // Se QUALQUER ancestral rola, o elemento é alcançável — não é o bug
          // que se procura. Checar só o próprio elemento (como estava antes)
          // acusava todo o conteúdo das colunas laterais do GameShell e da
          // tela de introdução, que rolam de propósito.
          let temAncestralRolavel = false
          for (let p = el; p && p !== document.body; p = p.parentElement) {
            const ep = getComputedStyle(p)
            if (ep.overflowY === 'auto' || ep.overflowY === 'scroll') { temAncestralRolavel = true; break }
          }
          if (temAncestralRolavel) continue
          // Decoração (brilhos de fundo, partículas) é sempre `pointer-events:
          // none` e é feita para sangrar para fora da tela de propósito —
          // contá-la como "conteúdo cortado" enche o relatório de falso
          // positivo com o mesmo número repetido em toda atividade.
          if (est.pointerEvents === 'none') continue
          const r = el.getBoundingClientRect()
          if (r.height === 0) continue
          // Só interessa o que a criança precisa ver ou tocar.
          if (!(el.textContent || '').trim() && !el.querySelector('button,input,canvas,svg,img')) continue
          const excesso = Math.round(r.bottom - alturaJanela)
          if (excesso > 8 && (!cortado || excesso > cortado.excesso)) {
            cortado = {
              excesso,
              tag: el.tagName.toLowerCase(),
              classe: (el.className && String(el.className).slice(0, 40)) || '',
              texto: (el.textContent || '').trim().slice(0, 50),
            }
          }
        }
        return {
          rolagemPagina: Math.max(d.scrollHeight - d.clientHeight, b.scrollHeight - alturaJanela, 0),
          vazamentoH: Math.max(d.scrollWidth - d.clientWidth, 0),
          bodyTravado: b.dataset.atividade === '1',
          cortado,
          rota: location.pathname,
        }
      })

      // Prova real: dar scroll de verdade e ver se a página se mexeu.
      await pagina.mouse.move(tela.largura / 2, tela.altura / 2)
      await pagina.mouse.wheel(0, 600)
      await pagina.waitForTimeout(250)
      const moveu = await pagina.evaluate(() => window.scrollY || document.documentElement.scrollTop || 0)

      resultados.push({ tela: tela.nome, tipo, ...m, moveuComRoda: moveu, erros })

      if (m.rolagemPagina > 8 || moveu > 0 || m.cortado || erros.length) {
        await pagina.screenshot({ path: `${SAIDA}/${tela.nome}-${tipo}.png`, fullPage: false })
      }
    } catch (e) {
      resultados.push({ tela: tela.nome, tipo, falha: String(e.message).slice(0, 120), erros })
    }
    await pagina.close()
  }
  await contexto.close()
}

await navegador.close()
writeFileSync(`${SAIDA}/resultado.json`, JSON.stringify(resultados, null, 2))

// ── Relatório ────────────────────────────────────────────────────────────
const problemas = resultados.filter(r => r.falha || r.erros?.length || r.moveuComRoda > 0 || r.rolagemPagina > 8 || r.cortado || r.vazamentoH > 0)
console.log(`\n${resultados.length} combinações testadas · ${problemas.length} com problema\n`)

for (const tela of TELAS) {
  const doTela = problemas.filter(p => p.tela === tela.nome)
  console.log(`\n═══ ${tela.nome} (${tela.largura}×${tela.altura}) — ${doTela.length} problemas ═══`)
  for (const p of doTela) {
    const partes = []
    if (p.falha) partes.push(`FALHOU: ${p.falha}`)
    if (p.erros?.length) partes.push(`JS: ${p.erros[0].slice(0, 70)}`)
    if (p.moveuComRoda > 0) partes.push(`PÁGINA ROLOU ${p.moveuComRoda}px com a roda`)
    else if (p.rolagemPagina > 8) partes.push(`documento ${p.rolagemPagina}px maior que a janela`)
    if (p.vazamentoH > 0) partes.push(`vaza ${p.vazamentoH}px na horizontal`)
    if (p.cortado) partes.push(`CORTADO ${p.cortado.excesso}px: <${p.cortado.tag}> "${p.cortado.texto}"`)
    console.log(`  ${p.tipo.padEnd(22)} ${partes.join(' · ')}`)
  }
}

const limpos = TIPOS.filter(t => !problemas.some(p => p.tipo === t))
console.log(`\n✅ Sem nenhum problema em nenhuma tela (${limpos.length}/${TIPOS.length}): ${limpos.join(', ')}\n`)
