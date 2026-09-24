/**
 * testar-guia-inicial.mjs — o guia de configuração guia mesmo?
 *
 * O pedido do Cláudio: *"tem que ter um GUIA de configuração inicial com passo a
 * passo"*, porque *"os seis passos iniciais não estão intuitivos"*.
 *
 * O que separa guia de lista, e é o que este teste cobra:
 *   1. UM passo em destaque por vez — não seis cartões iguais competindo;
 *   2. o destaque é o passo CERTO, e ele anda sozinho conforme o dado real muda;
 *   3. o botão leva à tela exata, e a tela de destino já está pronta para a ação
 *      (o cadastro de filho abre a janela sozinho, em vez de largar a pessoa no painel);
 *   4. o passo impossível fica travado, com o motivo escrito;
 *   5. o painel NOMEIA o próximo passo, em vez de só contar quantos faltam.
 *
 * 🪤 E a validação do instrumento: a contagem de "cartões em destaque" precisa achar
 * pelo menos 1 em algum estado. Um seletor que não casasse com nada devolveria
 * "1 destaque" por acidente em nenhuma tela e passaria.
 *
 * Uso: node testar-guia-inicial.mjs <porta>
 */
import { chromium, devices } from 'playwright'
import { prepararContexto, CRIANCA_TESTE } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

let falhas = 0
const ok = (cond, msg) => { console.log(`  ${cond ? '✅' : '🔴'} ${msg}`); if (!cond) falhas++ }

const navegador = await chromium.launch()

/**
 * Abre o app com um estado de progresso escolhido.
 * `conta` sobrescreve a linha de `users` (timer_config / agenda_config).
 */
async function comProgresso({ filhos = 1, conta = {}, historico = 0, semFilhoAtivo = false }) {
  const ctx = await navegador.newContext({ ...devices['Pixel 5'] })
  await prepararContexto(ctx)
  if (semFilhoAtivo) await ctx.addInitScript(() => { try { localStorage.removeItem('ns_active_child') } catch {} })

  await ctx.route('**/rest/v1/children**', route => route.request().method() === 'GET'
    ? route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(Array.from({ length: filhos }, () => CRIANCA_TESTE)) })
    : route.continue())

  await ctx.route('**/rest/v1/users**', route => {
    if (route.request().method() !== 'GET') return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
    const corpo = { id: '00000000-0000-4000-8000-000000000000', plano: 'premium', plano_status: 'ativo', plano_ativo_ate: '2099-12-31T00:00:00Z', timer_config: null, agenda_config: null, ...conta }
    const querObjeto = (route.request().headers()['accept'] || '').includes('vnd.pgrst.object')
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(querObjeto ? corpo : [corpo]) })
  })

  await ctx.route('**/rest/v1/ns_historico**', route => route.fulfill({
    status: 200, contentType: 'application/json',
    headers: { 'content-range': `0-0/${historico}` },
    body: JSON.stringify(Array.from({ length: Math.min(historico, 1) }, () => ({ id: 'h1' }))),
  }))

  return ctx
}

/** Quantos cartões estão em DESTAQUE (borda roxa grossa + selo "PASSO n"). */
const contarDestaques = pag => pag.locator('article').filter({ hasText: /^PASSO \d/ }).count()

// ── 1. sem filho: o destaque tem que ser o passo 1 ──────────────────────────
{
  console.log('\n1️⃣  Conta nova (nenhum passo feito)')
  const ctx = await comProgresso({ filhos: 0, semFilhoAtivo: true })
  const pag = await ctx.newPage()
  const erros = []
  pag.on('pageerror', e => erros.push(String(e).slice(0, 120)))
  await pag.goto(`${BASE}/primeiros-passos`, { waitUntil: 'networkidle' })
  await pag.waitForTimeout(900)

  const destaques = await contarDestaques(pag)
  ok(destaques === 1, `cartões em destaque: ${destaques} (guia mostra UM por vez)`)
  ok(await pag.getByText('PASSO 1').count() > 0, 'o destaque é o PASSO 1')
  ok(await pag.getByText('Cadastre seu filho').count() > 0, 'título certo em destaque')
  ok(await pag.getByText('O que você vai ver').count() > 0, 'traz "O que você vai ver" (instrução concreta)')
  ok(/\d+ minuto/.test(await pag.locator('body').innerText()), 'mostra estimativa de tempo')

  // 🪤 instrumento: o texto velho do balão 💬 não pode ter sobrado
  ok(!(await pag.locator('body').innerText()).includes('balão 💬'), 'não manda usar o balão 💬 (que não existe mais)')

  // o botão leva ao destino certo, e lá a janela de cadastro abre sozinha
  await pag.getByRole('button', { name: /Cadastrar agora/i }).first().click()
  await pag.waitForTimeout(1200)
  ok(new URL(pag.url()).pathname === '/dashboard', `o botão levou ao painel (${new URL(pag.url()).pathname})`)
  ok(!pag.url().includes('novoFilho'), 'o parâmetro foi limpo da URL (não reabre no histórico)')
  const modalAberto = await pag.getByText(/Adicionar filho|Novo filho|Nome do/i).count() > 0
  ok(modalAberto, 'a janela de cadastro abriu sozinha no destino')

  ok(erros.length === 0, `sem erro de JS${erros.length ? ': ' + erros[0] : ''}`)
  await ctx.close()
}

// ── 2. com filho: o destaque ANDA sozinho para o passo 2 ────────────────────
{
  console.log('\n2️⃣  Já tem filho cadastrado — o guia tem que andar sozinho')
  const ctx = await comProgresso({ filhos: 1 })
  const pag = await ctx.newPage()
  await pag.goto(`${BASE}/primeiros-passos`, { waitUntil: 'networkidle' })
  await pag.waitForTimeout(900)
  ok(await contarDestaques(pag) === 1, 'ainda UM destaque')
  ok(await pag.getByText('PASSO 2').count() > 0, 'o destaque andou para o PASSO 2')
  ok(await pag.getByText('Escolha quanto tempo por dia').count() > 0, 'título do passo 2 em destaque')
  await ctx.close()
}

// ── 3. timer e agenda prontos: o destaque pula para o passo 4 ──────────────
{
  console.log('\n3️⃣  Tempo e agenda já configurados')
  const ctx = await comProgresso({
    filhos: 1,
    conta: { timer_config: { duracao: 45 }, agenda_config: Array.from({ length: 7 }, () => ({ ativo: true, inicio: '08:00', fim: '18:00' })) },
    semFilhoAtivo: true,
  })
  const pag = await ctx.newPage()
  await pag.goto(`${BASE}/primeiros-passos`, { waitUntil: 'networkidle' })
  await pag.waitForTimeout(900)
  ok(await pag.getByText('PASSO 4').count() > 0, 'o destaque pulou para o PASSO 4 (área da criança)')
  const corpo = await pag.locator('body').innerText()
  ok(/3 de 6|2 de 6/.test(corpo), `o contador acompanha (${(corpo.match(/\d de 6/) || ['?'])[0]})`)
  await ctx.close()
}

// ── 4. passo travado precisa DIZER por quê ─────────────────────────────────
{
  console.log('\n4️⃣  Passo impossível fica travado, com motivo')
  const ctx = await comProgresso({ filhos: 0, semFilhoAtivo: true })
  const pag = await ctx.newPage()
  await pag.goto(`${BASE}/primeiros-passos`, { waitUntil: 'networkidle' })
  await pag.waitForTimeout(900)
  const travados = await pag.locator('button:disabled').count()
  ok(travados >= 1, `há passo(s) travado(s) sem filho cadastrado: ${travados}`)
  ok((await pag.locator('body').innerText()).includes('depois'), 'os travados aparecem como "depois", não como convite')
  await ctx.close()
}

// ── 5. o painel NOMEIA o próximo passo ─────────────────────────────────────
{
  console.log('\n5️⃣  A faixa do painel nomeia o próximo passo')
  const ctx = await comProgresso({ filhos: 1 })
  const pag = await ctx.newPage()
  await pag.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' })
  await pag.waitForTimeout(1200)
  const corpo = await pag.locator('body').innerText()
  ok(corpo.includes('Próximo passo:'), 'a faixa diz "Próximo passo: …"')
  ok(/Próximo passo: escolha quanto tempo/i.test(corpo), 'e nomeia o passo certo')
  ok(!/^Faltam \d+ passos para deixar tudo configurado$/m.test(corpo), 'não usa mais só a contagem seca')
  await ctx.close()
}

await navegador.close()
console.log(`\n${falhas === 0 ? '✅ tudo passou' : `🔴 ${falhas} verificação(ões) falharam`}`)
process.exit(falhas === 0 ? 0 : 1)
