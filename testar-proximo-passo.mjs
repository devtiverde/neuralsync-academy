/**
 * testar-proximo-passo.mjs — depois de salvar, a tela oferece o próximo passo?
 *
 * Relato do Cláudio (23/09): *"após configurar horários de uso tem que voltar
 * manualmente pro dashboard pra ver o próximo passo"*.
 *
 * 🪤 O `auditar-orientacao.mjs` NÃO enxerga este conserto, e isso é esperado: o
 * cartão só existe DEPOIS do salvamento, e aquele auditor não salva nada. Se eu
 * olhasse só para ele, concluiria que nada mudou. Instrumento que não exercita a
 * ação não mede a consequência dela.
 *
 * 🪤 E o cartão precisa SOBREVIVER: o "✓ salva!" das duas telas se apaga sozinho em
 * 2 segundos, e a 1ª versão do cartão estava presa nesse mesmo estado — aparecia e
 * evaporava antes de ser lido. Por isso o teste espera 3s antes de conferir.
 *
 * Uso: node testar-proximo-passo.mjs <porta>
 */
import { chromium, devices } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

const CASOS = [
  { rota: '/timer',  botao: /Salvar configuração/i, esperado: /Marcar os horários da semana/i, passo: 'tempo por dia (passo 2)' },
  { rota: '/agenda', botao: /Salvar agenda/i,       esperado: /Ver o próximo passo/i,          passo: 'horários da semana (passo 3)' },
]

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ ...devices['Pixel 5'] })
await prepararContexto(ctx)
// o salvamento é PATCH em `users`; responder aqui evita bater no banco de verdade
await ctx.route('**/rest/v1/users**', route =>
  route.request().method() === 'GET'
    ? route.continue()
    : route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }))

let ok = 0
for (const c of CASOS) {
  const pag = await ctx.newPage()
  await pag.goto(`${BASE}${c.rota}`, { waitUntil: 'networkidle' })
  await pag.waitForTimeout(700)

  // validação do instrumento: o cartão NÃO pode estar lá antes de salvar — senão
  // convidaria a sair da tela sem salvar, e o teste passaria sem provar nada.
  const antes = await pag.getByText(c.esperado).count()

  const botao = pag.getByRole('button', { name: c.botao })
  const achou = await botao.count() > 0
  if (achou) { await botao.first().click(); await pag.waitForTimeout(3000) }

  const depois = await pag.getByText(c.esperado).count()
  const passou = achou && antes === 0 && depois > 0
  if (passou) ok++
  console.log(`  ${passou ? '✅' : '🔴'} ${c.rota.padEnd(9)} ${c.passo}`)
  console.log(`       botão de salvar: ${achou ? 'achado' : 'NÃO ACHADO'} · cartão antes: ${antes} · depois de 3s: ${depois}`)
  await pag.close()
}

await navegador.close()
console.log(`\n${ok === CASOS.length ? '✅' : '🔴'} ${ok} de ${CASOS.length} telas oferecem o próximo passo depois de salvar.`)
process.exit(ok === CASOS.length ? 0 : 1)
