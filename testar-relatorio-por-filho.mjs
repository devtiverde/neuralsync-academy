/**
 * O relatório em PDF é do filho SELECIONADO?
 *
 * Bug relatado em 02/08/2026: abrir o relatório da Liz e clicar em "Relatório PDF"
 * gerava o relatório do Claudio. Causa: a tela do PDF nunca soube qual filho estava
 * selecionado — lia `ns_active_child`, que é escrito pela área da CRIANÇA (o último
 * que jogou) e pelo Dashboard, nunca pelo seletor do /relatorio.
 *
 * POR QUE ESTE TESTE PRECISA HONRAR OS FILTROS
 * O `harness-teste.mjs` responde por TABELA e ignora `child_id=eq.…` — com ele os dois
 * filhos receberiam o mesmo histórico e o teste passaria mesmo com o bug de pé. Aqui a
 * rota lê o filtro da URL, então cada filho tem dados que só podem ser dele: se a tela
 * mostrar 5 sessões no relatório da Liz, o dado veio do Claudio.
 *
 * Uso: node testar-relatorio-por-filho.mjs [porta]   (padrão 5173)
 */
import { chromium } from 'playwright'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

const CLAUDIO = {
  id: '00000000-0000-4000-8000-00000000c1a0',
  nome: 'Claudio', avatar: '🦊', nivel: 7, xp: 3200, neural_coins: 410,
  streak_atual: 5, streak_maximo: 12, faixa_etaria: 'inventores', idade: 12,
  perfil_cognitivo: null,
}
const LIZ = {
  id: '00000000-0000-4000-8000-00000000112a',
  nome: 'Liz', avatar: '🦄', nivel: 2, xp: 150, neural_coins: 30,
  streak_atual: 1, streak_maximo: 2, faixa_etaria: 'exploradores', idade: 5,
  perfil_cognitivo: null,
}

const agora = Date.now()
const linhaHist = (child, tipo, i) => ({
  id: `${child.id.slice(0, -2)}${(10 + i).toString(16)}`,
  child_id: child.id,
  parent_id: '00000000-0000-4000-8000-000000000000',
  titulo: `Atividade de ${child.nome} #${i + 1}`,
  xp: 50, coins: 10, emoji: '⭐', tipo,
  data: '01 ago, 10:00',
  timestamp: agora - i * 86400000,
  created_at: new Date(agora - i * 86400000).toISOString(),
})

// Claudio: 5 sessões. Liz: 2. Os números são diferentes de propósito — é assim que
// o teste distingue "mostrou a Liz" de "mostrou o Claudio com o nome da Liz".
const HISTORICO = {
  [CLAUDIO.id]: Array.from({ length: 5 }, (_, i) => linhaHist(CLAUDIO, 'memoria', i)),
  [LIZ.id]: Array.from({ length: 2 }, (_, i) => linhaHist(LIZ, 'quiz', i)),
}

const USUARIO = {
  id: '00000000-0000-4000-8000-000000000000',
  email: 'qa@dev.local',
  plano: 'premium', plano_status: 'ativo', plano_ativo_ate: '2099-12-31T00:00:00Z',
  agenda_config: null,
}

function responder(tabela, params) {
  if (tabela === 'children') {
    const filtroId = params.get('id')?.replace('eq.', '')
    const todos = [CLAUDIO, LIZ]
    return filtroId ? todos.filter(c => c.id === filtroId) : todos
  }
  if (tabela === 'users') return [USUARIO]
  if (tabela === 'ns_historico') {
    const childId = params.get('child_id')?.replace('eq.', '')
    // Sem filtro devolve vazio de propósito: consulta de histórico sem child_id é
    // justamente o defeito que estamos caçando, não pode ser premiada com dados.
    return childId ? (HISTORICO[childId] ?? []) : []
  }
  return []
}

async function preparar(ctx, activeChild) {
  await ctx.addInitScript(child => {
    try {
      sessionStorage.setItem('ns_dev_bypass', '1')
      // A condição do bug: quem está em `ns_active_child` NÃO é quem vamos selecionar.
      localStorage.setItem('ns_active_child', JSON.stringify(child))
      localStorage.setItem('ns_historico', '[]')
    } catch { /* modo privado */ }
  }, activeChild)

  await ctx.route('**/rest/v1/**', route => {
    const req = route.request()
    if (req.method() !== 'GET') return route.continue()
    const url = new URL(req.url())
    const tabela = url.pathname.split('/rest/v1/')[1]?.split('?')[0]
    const linhas = responder(tabela, url.searchParams)
    const querObjeto = (req.headers()['accept'] || '').includes('vnd.pgrst.object')
    return route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify(querObjeto ? (linhas[0] ?? null) : linhas),
    })
  })
}

const resultados = []
function checar(nome, ok, detalhe = '') {
  resultados.push({ nome, ok, detalhe })
  console.log(`${ok ? '✅' : '❌'} ${nome}${detalhe ? ` — ${detalhe}` : ''}`)
}

async function main() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  // ns_active_child = CLAUDIO. Todo relatório da Liz que sair errado sai como Claudio.
  await preparar(ctx, CLAUDIO)
  const page = await ctx.newPage()
  const erros = []
  page.on('pageerror', e => erros.push(e.message))

  // ── 1. /relatorio → selecionar Liz → botão do PDF ───────────────────────────
  await page.goto(`${BASE}/relatorio`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Liz/ }).first().click()
  await page.waitForTimeout(600)

  const tituloRelatorio = await page.locator('h1').first().innerText()
  checar('Tela /relatorio mostra a Liz selecionada', tituloRelatorio.includes('Liz'), tituloRelatorio.trim())

  await page.getByRole('button', { name: /Relatório PDF/ }).click()
  await page.waitForURL('**/relatorio-pdf', { timeout: 5000 })
  await page.waitForTimeout(900)

  const corpo = await page.locator('.pai-content').innerText()
  // O nome tem que sair do HERO, não do texto da página: o seletor lista TODOS os
  // filhos, então "Claudio" aparece na tela por direito. Procurar o nome solto no
  // corpo daria falso negativo aqui e — pior — falso positivo se o hero errasse.
  const nomeHero = async () => (await page.locator('.pai-content h2').nth(1).innerText()).trim()
  checar('PDF abre no filho SELECIONADO (Liz), não no ns_active_child (Claudio)',
    (await nomeHero()) === 'Liz', `hero: ${await nomeHero()}`)

  // Os números têm que ser os da Liz. 150 XP é dela; 3200 é do Claudio.
  checar('Hero traz o XP da Liz (150), não o do Claudio (3200)',
    corpo.includes('150 XP') && !corpo.includes('3200 XP'))
  checar('Idade/nível são os da Liz (5 anos, Nível 2)',
    corpo.includes('5 anos') && corpo.includes('Nível 2'))

  // Liz tem 2 linhas de histórico, Claudio tem 5 — prova que o ns_historico
  // buscado foi o dela.
  const sessoesLiz = (corpo.match(/(\d+)\s*\n?\s*Sessões/) || [])[1]
  checar('Contagem de sessões é a da Liz (2), não a do Claudio (5)',
    sessoesLiz === '2', `sessões lidas: ${sessoesLiz}`)

  // ── 2. Seletor dentro da própria tela do PDF ────────────────────────────────
  await page.getByRole('button', { name: /Claudio/ }).first().click()
  await page.waitForTimeout(900)
  const corpoClaudio = await page.locator('.pai-content').innerText()
  checar('Trocar para Claudio no seletor recarrega os dados dele',
    (await nomeHero()) === 'Claudio' && corpoClaudio.includes('3200 XP') && corpoClaudio.includes('12 anos'),
    `hero: ${await nomeHero()}`)

  const sessoesClaudio = (corpoClaudio.match(/(\d+)\s*\n?\s*Sessões/) || [])[1]
  checar('Sessões passam a ser as do Claudio (5)', sessoesClaudio === '5', `sessões lidas: ${sessoesClaudio}`)

  await page.getByRole('button', { name: /Liz/ }).first().click()
  await page.waitForTimeout(900)
  const voltou = await page.locator('.pai-content').innerText()
  checar('Voltar para Liz devolve os dados dela',
    (await nomeHero()) === 'Liz' && voltou.includes('150 XP') && !voltou.includes('3200 XP'))

  // ── 3. O PDF gerado leva o nome certo ───────────────────────────────────────
  const download = await Promise.all([
    page.waitForEvent('download', { timeout: 20000 }),
    page.getByRole('button', { name: /Gerar Relatório Premium/ }).click(),
  ]).then(([d]) => d)
  const arquivo = download.suggestedFilename()
  checar('Arquivo baixado é o da Liz', arquivo === 'NeuralSync_Relatorio_Liz.pdf', arquivo)

  checar('Nenhum erro de JS', erros.length === 0, erros.join(' / '))

  await browser.close()

  const falhas = resultados.filter(r => !r.ok)
  console.log(`\n${resultados.length - falhas.length}/${resultados.length} verificações passaram`)
  process.exit(falhas.length === 0 ? 0 : 1)
}

main().catch(e => { console.error('Erro no teste:', e); process.exit(2) })
