/**
 * A história da atividade aparece INTEIRA e alcançável na tela de intro?
 *
 * Relato do Cláudio (02/08): "A intro da atividade corta a história. Não dá pra ler
 * o texto inteiro." Medido: a `historinha` era cortada em 120 caracteres no hero e
 * 286 das 393 atividades passam disso — 73%.
 *
 * Este teste NÃO confia em screenshot nem em "parece que cabe". Ele compara o texto
 * renderizado com o texto do dado, caractere por caractere, e depois confirma que o
 * elemento é alcançável de verdade — subindo a árvore atrás de um ancestral que role,
 * porque um texto presente no DOM mas fora de qualquer área rolável é tão ilegível
 * quanto um texto cortado. Ver feedback_vazamento_alcancavel_vs_inalcancavel.
 *
 * Uso: node testar-intro-historia.mjs [porta]
 */
import { chromium, devices } from 'playwright'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`
const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']

// Casos escolhidos pelo pior cenário, não por conveniência: a maior história do
// acervo, a que o Cláudio citou, e a maior de cada faixa.
async function escolherCasos() {
  const todas = []
  for (const f of FAIXAS) {
    const m = await import(pathToFileURL(resolve(`src/data/extra/${f}.js`)).href)
    for (const k of Object.keys(m)) for (const a of m[k]) todas.push({ ...a, faixa: f })
  }
  const d = await import(pathToFileURL(resolve('src/data/atividadesData.js')).href)
  for (const k of ['atividadesPorFaixa', 'fase2PorFaixa', 'fase3PorFaixa']) {
    for (const f of FAIXAS) for (const a of (d[k][f] || [])) todas.push({ ...a, faixa: f })
  }
  const comH = todas.filter(a => a.historinha)
  const porTamanho = [...comH].sort((a, b) => b.historinha.length - a.historinha.length)
  const casos = [porTamanho[0]]
  const citada = comH.find(a => a.id === 'exp_formas_brinquedos')
  if (citada) casos.push(citada)
  for (const f of FAIXAS) {
    const maior = porTamanho.find(a => a.faixa === f)
    if (maior && !casos.some(c => c.id === maior.id)) casos.push(maior)
  }
  return { casos, total: comH.length }
}

const TELAS = [
  { nome: 'celular 360', width: 360, height: 640 },
  { nome: 'celular 390', width: 390, height: 844 },
  { nome: 'notebook baixo', width: 1366, height: 700 },
  { nome: 'desktop', width: 1920, height: 1080 },
]

const resultados = []
function checar(nome, ok, detalhe = '') {
  resultados.push({ ok })
  if (!ok) console.log(`❌ ${nome}${detalhe ? ` — ${detalhe}` : ''}`)
}

async function main() {
  const { casos, total } = await escolherCasos()
  console.log(`${total} atividades têm história. Testando ${casos.length} casos (maior do acervo, a citada, e a maior de cada faixa) em ${TELAS.length} telas.\n`)

  const browser = await chromium.launch()

  for (const caso of casos) {
    for (const tela of TELAS) {
      const ctx = await browser.newContext({
        viewport: { width: tela.width, height: tela.height },
        ...(tela.width < 500 ? { ...devices['Pixel 5'], viewport: { width: tela.width, height: tela.height } } : {}),
      })
      await ctx.addInitScript(at => {
        try {
          sessionStorage.setItem('ns_dev_bypass', '1')
          sessionStorage.setItem('ns_intro_teste', JSON.stringify(at))
          localStorage.setItem('ns_active_child', JSON.stringify({
            id: '00000000-0000-4000-8000-000000000001', nome: 'Teste QA',
            faixa_etaria: at.faixa, nivel: 3, xp: 420, neural_coins: 250,
          }))
        } catch { /* modo privado */ }
      }, caso)
      await ctx.route('**/rest/v1/**', r => r.request().method() === 'GET'
        ? r.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
        : r.continue())

      const page = await ctx.newPage()
      const erros = []
      page.on('pageerror', e => erros.push(e.message))
      await page.goto(`${BASE}/dev/atividade/${caso.tipo}?id=${encodeURIComponent(caso.id)}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(500)

      // O texto renderizado da história bate com o dado, inteiro? E — o que
      // realmente importa — não existe NENHUMA cópia mutilada dela na tela?
      const achado = await page.evaluate(esperado => {
        const ps = [...document.querySelectorAll('p, div')]
        const inteiro = esperado.trim()

        // A CÓPIA CORTADA é o bug relatado. A história inteira sempre esteve na
        // coluna da direita; o que a criança lia era este pedaço com reticência no
        // meio da tela, e ela não tem por que supor que o resto está noutro lugar.
        // Sem esta checagem o teste passa igual antes e depois da correção — foi o
        // que aconteceu na primeira versão dele.
        const mutilada = ps.find(el => {
          if (el.childElementCount !== 0) return false
          const txt = el.textContent.trim()
          if (txt.length === 0 || txt === inteiro) return false
          const semReticencia = txt.replace(/[…]+$/, '').trim()
          return semReticencia.length >= 20
            && semReticencia.length < inteiro.length
            && inteiro.startsWith(semReticencia)
        })

        const alvo = ps.find(el => el.childElementCount === 0 && el.textContent.trim() === inteiro)
        const cortada = mutilada ? mutilada.textContent.trim() : null
        if (!alvo) {
          return { ok: false, parcial: cortada, cortada }
        }
        // Alcançável? sobe a árvore procurando quem role de verdade.
        const r = alvo.getBoundingClientRect()
        let no = alvo.parentElement, rolavel = false
        while (no && no !== document.documentElement) {
          const s = getComputedStyle(no)
          if (/(auto|scroll)/.test(s.overflowY) && no.scrollHeight > no.clientHeight + 1) { rolavel = true; break }
          no = no.parentElement
        }
        const doc = document.documentElement
        if (!rolavel && doc.scrollHeight > doc.clientHeight + 1) rolavel = true
        const dentro = r.top >= -1 && r.bottom <= window.innerHeight + 1
        return { ok: true, alcancavel: dentro || rolavel, dentro, rolavel, altura: Math.round(r.height), cortada }
      }, caso.historinha)

      const id = `${caso.id} @ ${tela.nome}`
      checar(`${id}: história inteira no DOM`, achado.ok,
        achado.parcial ? `renderizado: "${achado.parcial.slice(0, 70)}…" (${achado.parcial.length} de ${caso.historinha.length} chars)` : 'texto não encontrado')
      if (achado.ok) {
        checar(`${id}: alcançável`, achado.alcancavel,
          `fora da tela e sem ancestral rolável (altura ${achado.altura}px)`)
      }
      checar(`${id}: nenhuma cópia mutilada da história na tela`, !achado.cortada,
        achado.cortada ? `"${achado.cortada.slice(0, 60)}…" (${achado.cortada.length} de ${caso.historinha.length} chars)` : '')
      checar(`${id}: sem erro de JS`, erros.length === 0, erros[0])

      await ctx.close()
    }
    console.log(`  ${caso.id} (${caso.historinha.length} chars, ${caso.tipo}) — ok nas ${TELAS.length} telas`)
  }

  await browser.close()
  const falhas = resultados.filter(r => !r.ok).length
  console.log(`\n${resultados.length - falhas}/${resultados.length} verificações passaram`)
  process.exit(falhas === 0 ? 0 : 1)
}

main().catch(e => { console.error('Erro no teste:', e); process.exit(2) })
