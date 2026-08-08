/**
 * diagnosticar-fonte.mjs — a fonte da marca carrega de forma confiável em produção?
 *
 * Sintoma (06/08/2026, iPhone da esposa do Cláudio): títulos dos cards e da tela de erro em
 * CURSIVA. `--ns-font-display` é `'Fredoka One', cursive`, então cursiva É o fallback: a
 * Fredoka One não chegou.
 *
 * Já descartado: o CSS do Google responde 200 e declara a Fredoka One; o .woff2 dela responde
 * 200 com 15 kB no curl; a CSP não registra violação nenhuma.
 *
 * 🪤 Duas tentativas anteriores de diagnóstico ficaram inúteis, anotadas para não repetir:
 *   1. `page.route('**\/sw.js', abort)` NÃO impede o Service Worker de instalar — o script do
 *      worker não passa pelo roteador da página. O "A/B" mediu duas vezes a mesma coisa.
 *   2. Uma única carga não decide nada: o resultado mudou entre execuções. Fonte de terceiro é
 *      uma dependência de REDE, e rede falha às vezes. Um "carregou" não desmente um relato.
 *
 * Por isso aqui a medida é por REPETIÇÃO, em contexto novo a cada vez (cache limpo), contando
 * em quantas das N vezes a fonte realmente chegou.
 *
 * Rodar: node diagnosticar-fonte.mjs [n] [url]
 */
import { chromium, devices } from 'playwright'

const VEZES = Number(process.argv[2] || 6)
const ALVO  = process.argv[3] || 'https://app.neuralsync.com.br/'

const navegador = await chromium.launch()
console.log(`\n  ${VEZES} visitas limpas a ${ALVO} (iPhone 13)\n`)

let chegou = 0
const falhas = []

for (let i = 1; i <= VEZES; i++) {
  const contexto = await navegador.newContext({ ...devices['iPhone 13'] })
  const pagina = await contexto.newPage()

  const problemas = []
  pagina.on('requestfailed', r => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) {
      problemas.push(`${r.failure()?.errorText ?? '?'} ${r.url().replace('https://fonts.', '').slice(0, 60)}`)
    }
  })

  try {
    await pagina.goto(ALVO, { waitUntil: 'networkidle', timeout: 60000 })
    await pagina.evaluate(() => document.fonts.ready)
  } catch { /* segue: o que importa é o veredito da fonte */ }

  const ok = await pagina.evaluate(async () => {
    try { await document.fonts.load('400 40px "Fredoka One"') } catch { /* segue */ }
    return document.fonts.check('400 40px "Fredoka One"')
  }).catch(() => false)

  if (ok) chegou++
  else falhas.push(...problemas)

  console.log(`   visita ${i}: Fredoka One ${ok ? 'chegou' : 'NAO chegou'}` +
              (problemas.length ? `  (${problemas.length} pedido(s) falharam)` : ''))

  await contexto.close()
}

console.log(`\n  RESULTADO: a fonte chegou em ${chegou} de ${VEZES} visitas limpas.`)
if (chegou < VEZES) {
  console.log('  Quando não chega, o iOS desenha o fallback `cursive` — a letra manuscrita do print.')
  const unicas = [...new Set(falhas)]
  if (unicas.length) {
    console.log('\n  Falhas de rede observadas:')
    unicas.slice(0, 6).forEach(f => console.log(`    ${f}`))
  }
}
console.log('')

await navegador.close()
