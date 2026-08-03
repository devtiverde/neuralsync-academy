/**
 * O login funciona NA PRIMEIRA TENTATIVA?
 *
 * Relato do Cláudio (03/08): "a tela de login ainda está com bug, tenho que dar
 * refresh, só loga pela segunda vez."
 *
 * Este teste NÃO usa o atalho `ns_dev_bypass` — ele existe justamente para pular o
 * login, e usá-lo aqui seria testar tudo menos o que se quer testar. Em vez disso
 * responde os endpoints do Supabase como o servidor de verdade responderia, e o
 * `supabase-js` segue o caminho normal: grava a sessão, dispara `onAuthStateChange`,
 * e o app decide para onde ir.
 *
 * A demora da Edge Function de ativação é simulada de propósito. Ela tem partida a
 * frio, e é exatamente na janela em que ela ainda não respondeu que a corrida entre
 * "já tenho usuário" e "já sei se tem plano" pode jogar a pessoa de volta ao login.
 *
 * Uso: node testar-login.mjs [porta] [msDeAtraso]
 */
import { chromium } from 'playwright'

const PORTA = process.argv[2] || '5173'
const BASE = PORTA.startsWith('http') ? PORTA : `http://localhost:${PORTA}`
// Atraso da Edge Function de ativação. 0 = quente; 2500 = partida a frio real.
const ATRASOS = process.argv[3] ? [Number(process.argv[3])] : [0, 800, 2500]

const UID = '00000000-0000-4000-8000-0000000000aa'
const EMAIL = 'teste-login@exemplo.com'

// JWT de mentira, mas com a FORMA certa: o supabase-js lê o `exp` para decidir se a
// sessão está viva. Sem assinatura válida não tem problema — quem confere assinatura
// é o servidor, e aqui o servidor somos nós.
function jwtFalso() {
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url')
  const agora = Math.floor(Date.now() / 1000)
  return [
    b64({ alg: 'HS256', typ: 'JWT' }),
    b64({ sub: UID, email: EMAIL, role: 'authenticated', aud: 'authenticated', iat: agora, exp: agora + 3600 }),
    'assinatura-de-teste',
  ].join('.')
}

const usuario = {
  id: UID, aud: 'authenticated', role: 'authenticated', email: EMAIL,
  email_confirmed_at: new Date().toISOString(), phone: '',
  confirmed_at: new Date().toISOString(), last_sign_in_at: new Date().toISOString(),
  app_metadata: { provider: 'email', providers: ['email'] },
  user_metadata: { nome: 'Teste Login' },
  identities: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
}

const sessao = () => ({
  access_token: jwtFalso(), token_type: 'bearer', expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: 'refresh-de-teste', user: usuario,
})

// Assinatura VÁLIDA: se o paywall mandar embora quem tem plano ativo, o problema é
// do fluxo de login, não de permissão.
const linhaUsuario = {
  id: UID, email: EMAIL, nome: 'Teste Login', tipo: 'pai',
  plano: 'premium', plano_status: 'ativo',
  plano_ativo_ate: '2099-12-31T00:00:00Z',
  agenda_config: null, timer_config: null, neuralai_config: null,
}

const espera = ms => new Promise(r => setTimeout(r, ms))

// Cenário real que o caminho feliz não cobre: a pessoa JÁ TEVE sessão, ela venceu,
// e o navegador ainda guarda os restos. É o estado de quem volta ao produto dias
// depois — provavelmente o mais comum de todos, e o único em que o app precisa
// limpar sujeira antes de aceitar o login novo.
const CHAVE_SESSAO = 'sb-nlcjddiqlnvtgusssspk-auth-token'
function sessaoVencida() {
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url')
  const passado = Math.floor(Date.now() / 1000) - 7200
  const jwt = [
    b64({ alg: 'HS256', typ: 'JWT' }),
    b64({ sub: UID, email: EMAIL, role: 'authenticated', aud: 'authenticated', iat: passado - 3600, exp: passado }),
    'assinatura-de-teste',
  ].join('.')
  return JSON.stringify({
    access_token: jwt, token_type: 'bearer', expires_in: 3600, expires_at: passado,
    refresh_token: 'refresh-vencido', user: usuario,
  })
}

async function tentar(browser, atrasoAtivacao, comSessaoVelha = false) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const chamadas = []

  if (comSessaoVelha) {
    await ctx.addInitScript(([k, v]) => {
      try { localStorage.setItem(k, v) } catch { /* modo privado */ }
    }, [CHAVE_SESSAO, sessaoVencida()])
  }

  await ctx.route('**/auth/v1/**', async route => {
    const u = new URL(route.request().url())
    chamadas.push(`auth ${route.request().method()} ${u.pathname}${u.search}`)
    if (u.pathname.endsWith('/token')) {
      // Renovação com refresh_token vencido é RECUSADA, como o servidor de verdade
      // recusa. Responder 200 aqui esconderia justamente o cenário que queremos ver.
      if (u.search.includes('grant_type=refresh_token')) {
        return route.fulfill({
          status: 400, contentType: 'application/json',
          body: JSON.stringify({ error: 'invalid_grant', error_description: 'Invalid Refresh Token' }),
        })
      }
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(sessao()) })
    }
    if (u.pathname.endsWith('/user')) {
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(usuario) })
    }
    if (u.pathname.endsWith('/logout')) return route.fulfill({ status: 204, body: '' })
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
  })

  await ctx.route('**/functions/v1/**', async route => {
    chamadas.push('function ' + new URL(route.request().url()).pathname)
    if (atrasoAtivacao) await espera(atrasoAtivacao)
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ activated: false }) })
  })

  await ctx.route('**/rest/v1/**', route => {
    const u = new URL(route.request().url())
    const tabela = u.pathname.split('/rest/v1/')[1]?.split('?')[0]
    chamadas.push(`rest ${route.request().method()} ${tabela}`)
    if (route.request().method() !== 'GET') {
      return route.fulfill({ status: 201, contentType: 'application/json', body: '[]' })
    }
    const linhas = tabela === 'users' ? [linhaUsuario] : []
    const querObjeto = (route.request().headers()['accept'] || '').includes('vnd.pgrst.object')
    return route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify(querObjeto ? (linhas[0] ?? null) : linhas),
    })
  })

  const page = await ctx.newPage()
  const erros = []
  page.on('pageerror', e => erros.push(e.message))
  const rotas = []
  page.on('framenavigated', f => { if (f === page.mainFrame()) rotas.push(new URL(f.url()).pathname) })

  await page.goto(`${BASE}/auth`, { waitUntil: 'networkidle' })
  await page.fill('input[type="email"]', EMAIL)
  await page.fill('input[type="password"]', 'senha-de-teste')
  await page.click('button[type="submit"]')

  // Espera generosa: o que se quer saber é onde ele PARA, não quão rápido chega.
  await page.waitForTimeout(3000 + atrasoAtivacao)
  const destino = new URL(page.url()).pathname
  const texto = await page.locator('body').innerText().catch(() => '')

  await ctx.close()
  return { destino, rotas, erros, chamadas, texto: texto.slice(0, 160).replace(/\s+/g, ' ') }
}

async function main() {
  const browser = await chromium.launch()
  let falhas = 0

  const CENARIOS = []
  for (const atraso of ATRASOS) CENARIOS.push({ atraso, velha: false })
  for (const atraso of ATRASOS) CENARIOS.push({ atraso, velha: true })

  for (const { atraso, velha } of CENARIOS) {
    const r = await tentar(browser, atraso, velha)
    const ok = r.destino === '/dashboard' && r.erros.length === 0
    if (!ok) falhas++
    console.log(`${ok ? '✅' : '❌'} ${velha ? 'COM sessão vencida' : 'navegador limpo'}, ativação ${atraso}ms → parou em ${r.destino}`)
    console.log(`   caminho: ${[...new Set(r.rotas)].join(' → ')}`)
    if (!ok) {
      console.log(`   tela: "${r.texto}"`)
      if (r.erros.length) console.log(`   erro de JS: ${r.erros[0]}`)
      console.log(`   chamadas: ${r.chamadas.join(' | ')}`)
    }
  }

  await browser.close()
  console.log(falhas ? `\n❌ ${falhas} de ${CENARIOS.length} cenários NÃO caíram no /dashboard` : `\n✅ Login entrou de primeira nos ${CENARIOS.length} cenários`)
  process.exit(falhas ? 1 : 0)
}

main().catch(e => { console.error('Erro no teste:', e); process.exit(2) })
