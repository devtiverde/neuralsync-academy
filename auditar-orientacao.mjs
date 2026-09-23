/**
 * auditar-orientacao.mjs — a tela diz o que fazer agora, e por onde se volta?
 *
 * POR QUE ESTE AUDITOR EXISTE
 * ---------------------------
 * `auditar-telas.mjs` responde "cabe na tela?" e `auditar-toque.mjs` responde
 * "o dedo acerta?". Nenhum dos dois responde a reclamação real de quem usa:
 * *"não sei o que fazer agora nem para onde ir"*. Uma tela pode passar nos dois
 * e ainda assim ser um beco: bonita, responsiva, e muda.
 *
 * O QUE ELE MEDE — e o que ele NÃO decide
 * ---------------------------------------
 * Ele junta EVIDÊNCIA por tela e marca CANDIDATOS. O julgamento continua humano:
 * "esta tela orienta?" é pergunta de leitura, não de régua. O que dá para medir:
 *
 *  1. TÍTULO       a tela diz o que ela é? (h1/h2 visível no conteúdo)
 *  2. AÇÕES        quantas coisas clicáveis existem NO CONTEÚDO, e quais são
 *  3. SAÍDA        existe voltar/fechar dentro do conteúdo?
 *  4. FAQ          o socorro está alcançável a partir daqui?
 *  5. ORIENTAÇÃO   existe frase dizendo o próximo passo?
 *
 * 🪤 O CROMO AFOGA A MEDIDA SE VOCÊ DEIXAR. O MenuLateral, a topbar e a barra de
 * baixo existem em TODA tela: contá-los daria "toda tela tem 12 ações" e nenhuma
 * informação. Tudo que está dentro de menu/topbar/nav/header/footer/faq/feedback
 * e das sidebars é descartado, e só conta FOLHA interativa — o rótulo de texto
 * herda `cursor:pointer` do cartão, mas quem recebe o dedo é o cartão.
 * Mesma lição do `auditar-toque.mjs`, que na 1ª rodada acusou 20 de 22 telas.
 *
 * 🪤 E o contrário também: tela vazia não estoura. O harness responde as leituras
 * do banco com dados de teste, senão metade das telas renderiza vazia e passa
 * limpa por não ter nada.
 *
 * Uso: node auditar-orientacao.mjs <porta> [--fotos]
 */
import { chromium, devices } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2]
if (!PORTA) { console.error('Falta a porta. Ex.: node auditar-orientacao.mjs 5173'); process.exit(2) }
const FOTOS = process.argv.includes('--fotos')
const BASE = `http://localhost:${PORTA}`
const SAIDA = 'auditoria-orientacao'

// Celular é onde a reclamação nasceu, então é onde se mede.
const TELA = devices['Pixel 5']

const ROTAS = [
  { rota: '/dashboard',          nome: 'dashboard',      area: 'pai',     papel: 'primeira tela depois de pagar' },
  { rota: '/primeiros-passos',   nome: 'primeiros-passos', area: 'pai',   papel: 'os 6 passos iniciais' },
  { rota: '/timer',              nome: 'timer',          area: 'pai',     papel: 'configurar tempo de uso' },
  { rota: '/agenda',             nome: 'agenda',         area: 'pai',     papel: 'configurar horários' },
  { rota: '/perfil-filho',       nome: 'perfil-filho',   area: 'pai',     papel: 'cadastrar/editar filho' },
  { rota: '/relatorio',          nome: 'relatorio',      area: 'pai',     papel: 'acompanhar evolução' },
  { rota: '/relatorio-ia',       nome: 'relatorio-ia',   area: 'pai',     papel: 'análise por IA' },
  { rota: '/trilha-pai',         nome: 'trilha-pai',     area: 'pai',     papel: 'ver a trilha do filho' },
  { rota: '/notificacoes',       nome: 'notificacoes',   area: 'pai',     papel: 'avisos' },
  { rota: '/configuracoes',      nome: 'configuracoes',  area: 'pai',     papel: 'conta e assinatura' },
  { rota: '/feedbacks',          nome: 'feedbacks',      area: 'pai',     papel: 'painel de feedback (admin)' },

  { rota: '/home-crianca',       nome: 'home-crianca',   area: 'crianca', papel: 'porta de entrada da criança' },
  { rota: '/trilha',             nome: 'trilha',         area: 'crianca', papel: 'escolher o que jogar' },
  { rota: '/loja',               nome: 'loja',           area: 'crianca', papel: 'gastar moedas' },
  { rota: '/personalizar',       nome: 'personalizar',   area: 'crianca', papel: 'equipar o que comprou' },
  { rota: '/ranking',            nome: 'ranking',        area: 'crianca', papel: 'comparar com outros' },
  { rota: '/perfil-crianca',     nome: 'perfil-crianca', area: 'crianca', papel: 'ver o próprio progresso' },
  { rota: '/coins',              nome: 'coins',          area: 'crianca', papel: 'entender as moedas' },
  { rota: '/diario',             nome: 'diario',         area: 'crianca', papel: 'escrever o diário' },
  { rota: '/digitacao',          nome: 'digitacao',      area: 'crianca', papel: 'treinar digitação' },
  { rota: '/atividades-offline', nome: 'offline',        area: 'crianca', papel: 'atividades fora da tela' },
  { rota: '/kids',               nome: 'kids-tv',        area: 'crianca', papel: 'catálogo de vídeos' },
  { rota: '/ebook',              nome: 'ebooks',         area: 'crianca', papel: 'biblioteca' },
  { rota: '/quiz-ia',            nome: 'quiz-ia',        area: 'crianca', papel: 'quiz gerado por IA' },
  { rota: '/neural-ai',          nome: 'neural-ai',      area: 'crianca', papel: 'conversar com a IA' },
  { rota: '/timer-ativo',        nome: 'timer-ativo',    area: 'crianca', papel: 'sessão em andamento' },
  { rota: '/bloqueio',           nome: 'bloqueio',       area: 'crianca', papel: 'tempo esgotado' },

  { rota: '/planos',             nome: 'planos',         area: 'publica', papel: 'escolher plano' },
  { rota: '/auth',               nome: 'login',          area: 'publica', papel: 'entrar' },
  { rota: '/recuperar-senha',    nome: 'recuperar',      area: 'publica', papel: 'recuperar acesso' },
]

/** Roda DENTRO da página. Devolve a evidência de orientação daquela tela. */
function coletar() {
  const CROMO = [
    '.ns-sidebar', '.pai-sidebar', '.menu-bottom', '.ns-topbar-row', '.pai-topbar-row',
    '.game-sidebar-left', '.game-sidebar-right', '.game-topbar',
    'nav', 'header', 'footer',
    '[class*="menu"]', '[class*="topbar"]', '[class*="faq"]', '[class*="feedback"]',
    '[aria-label*="menu"]', '[aria-label*="Menu"]',
  ]
  const ehCromo = el => CROMO.some(sel => { try { return el.closest(sel) } catch { return false } })

  const visivel = el => {
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) return false
    const cs = getComputedStyle(el)
    return cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0'
  }

  const texto = el => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim()

  // ── 1. título ──────────────────────────────────────────────────────────────
  const titulos = [...document.querySelectorAll('h1, h2')]
    .filter(el => visivel(el) && !ehCromo(el))
    .map(texto).filter(Boolean)

  // ── 2. ações de conteúdo (folha interativa) ────────────────────────────────
  const candidatos = [...document.querySelectorAll('button, a[href], [role="button"], input[type="submit"]')]
  const acoes = candidatos
    .filter(el => visivel(el) && !ehCromo(el) && !el.disabled)
    // folha: descarta quem contém outro interativo dentro
    .filter(el => !el.querySelector('button, a[href], [role="button"]'))
    .map(el => ({
      texto: texto(el).slice(0, 48),
      href: el.getAttribute('href') || null,
      principal: (() => {
        const r = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        // "principal" = alvo grande com fundo próprio — o botão que a tela quer que você toque
        return r.width >= 120 && r.height >= 38 &&
          cs.backgroundImage !== 'none' || /rgb\((?!0, 0, 0)/.test(cs.backgroundColor) && r.height >= 38
      })(),
    }))
    .filter(a => a.texto)

  // ── 3. saída dentro do conteúdo ────────────────────────────────────────────
  const PADRAO_SAIDA = /voltar|fechar|cancelar|←|✕|×|sair|home|in[íi]cio/i
  const saidas = acoes.filter(a => PADRAO_SAIDA.test(a.texto)).map(a => a.texto)

  // ── 4. FAQ alcançável ──────────────────────────────────────────────────────
  const faq = [...document.querySelectorAll('button, a')].some(el =>
    visivel(el) && /faq|ajuda|d[úu]vida|\?/i.test(texto(el) + ' ' + (el.getAttribute('aria-label') || '')))

  // ── 5. frase de orientação no conteúdo ─────────────────────────────────────
  const corpo = [...document.querySelectorAll('p, li, span, div')]
    .filter(el => visivel(el) && !ehCromo(el) && el.children.length === 0)
    .map(texto).filter(t => t.length > 12).join(' | ')
  const PADRAO_ORIENTA = /pr[óo]ximo passo|comece|come[çc]ar|toque|clique|escolha|selecione|configure|cadastre|agora voc[êe]|para come[çc]ar|primeiro|depois disso|em seguida/i
  const orienta = PADRAO_ORIENTA.test(corpo)
  const trechoOrienta = orienta ? (corpo.match(new RegExp('[^|]{0,90}(' + PADRAO_ORIENTA.source + ')[^|]{0,60}', 'i')) || [''])[0].trim() : null

  // ── 6. flutuante tapando conteúdo ──────────────────────────────────────────
  // O balão de feedback e o "?" do FAQ moram os dois no canto inferior direito.
  // 🪤 Medir só o CENTRO deles dizia "não tapa nada" numa tela em que a foto
  // mostrava o "?" por cima de "XP total acumulado": um ponto não cobre um
  // círculo de 56px. Varre a área inteira numa grade de 5×5.
  const flutuantes = [...document.querySelectorAll('button, a')].filter(el => {
    const cs = getComputedStyle(el)
    const b = el.getBoundingClientRect()
    return cs.position === 'fixed' && b.width > 30 && b.height > 30 && visivel(el)
  })
  const tapando = []
  for (const f of flutuantes) {
    const b = f.getBoundingClientRect()
    const rotulo = texto(f) || f.getAttribute('aria-label') || '?'
    const achados = new Set()
    for (let i = 0; i <= 4; i++) for (let j = 0; j <= 4; j++) {
      for (const el of document.elementsFromPoint(b.x + (b.width * i) / 4, b.y + (b.height * j) / 4)) {
        if (getComputedStyle(el).position === 'fixed') continue
        const t = texto(el)
        if (t.length > 3 && t.length < 90 && el.children.length === 0) { achados.add(t.slice(0, 44)); break }
      }
    }
    if (achados.size) tapando.push({ botao: rotulo.slice(0, 12), cobre: [...achados] })
  }

  return {
    flutuantes: flutuantes.length,
    tapando,
    titulo: titulos[0] || null,
    titulos: titulos.slice(0, 3),
    acoes: acoes.map(a => a.texto),
    principais: acoes.filter(a => a.principal).map(a => a.texto),
    saidas,
    faq,
    orienta,
    trechoOrienta,
    tamanhoTexto: corpo.length,
  }
}

const browser = await chromium.launch()
const resultados = []

for (const r of ROTAS) {
  const ctx = await browser.newContext({ ...TELA })
  await prepararContexto(ctx)
  const page = await ctx.newPage()
  const erros = []
  page.on('pageerror', e => erros.push(String(e).split('\n')[0]))

  try {
    await page.goto(BASE + r.rota, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(700)
    const urlFinal = new URL(page.url()).pathname
    const dados = await page.evaluate(coletar)
    if (FOTOS) {
      mkdirSync(SAIDA, { recursive: true })
      await page.screenshot({ path: `${SAIDA}/${r.nome}.png` })
    }
    resultados.push({ ...r, urlFinal, redirecionou: urlFinal !== r.rota, erros, ...dados })
  } catch (e) {
    resultados.push({ ...r, erro: e.message.split('\n')[0], acoes: [], principais: [], saidas: [], titulos: [] })
  }
  await ctx.close()
}
await browser.close()

// ── relatório ────────────────────────────────────────────────────────────────
console.log(`\n🧭 Orientação — ${ROTAS.length} telas em ${TELA.viewport.width}px (celular)\n`)
console.log('   Legenda: T=título · A=ações de conteúdo · P=ação principal · S=saída · F=FAQ · O=frase de orientação\n')

const marca = v => (v ? '✓' : '·')
console.log('tela'.padEnd(20) + 'T  A   P  S  F  O   observação (T=título A=ações P=principal S=saída F=FAQ O=orientação)')
console.log('─'.repeat(92))

const suspeitas = []
for (const r of resultados) {
  if (r.erro) { console.log(`${r.nome.padEnd(20)}— não abriu: ${r.erro}`); suspeitas.push({ ...r, motivo: 'não abriu' }); continue }
  const obs = []
  if (r.redirecionou) obs.push(`redireciona → ${r.urlFinal}`)
  if (!r.titulo) obs.push('sem título visível')
  if (r.acoes.length === 0) obs.push('NENHUMA ação no conteúdo')
  if (r.principais.length === 0 && r.acoes.length > 0) obs.push('sem ação principal destacada')
  if (r.saidas.length === 0) obs.push('sem voltar no conteúdo')
  if (!r.faq) obs.push('FAQ não alcançável')
  if (!r.orienta) obs.push('sem frase de próximo passo')
  if (r.erros?.length) obs.push(`${r.erros.length} erro(s) de JS`)
  if (r.tapando?.length) obs.push(`flutuante tapa: ${r.tapando.map(t => `"${t.botao}"→${t.cobre[0]}`).join(' ; ')}`)

  console.log(
    r.nome.padEnd(20) +
    marca(r.titulo) + '  ' +
    String(r.acoes.length).padStart(2) + '  ' +
    String(r.principais.length).padStart(2) + '  ' +
    marca(r.saidas.length) + '  ' + marca(r.faq) + '  ' + marca(r.orienta) + '   ' +
    obs.join(' · ')
  )
  if (obs.length >= 2) suspeitas.push({ ...r, motivo: obs.join(' · ') })
}

mkdirSync(SAIDA, { recursive: true })
writeFileSync(`${SAIDA}/orientacao.json`, JSON.stringify(resultados, null, 2))

console.log(`\n${suspeitas.length} de ${resultados.length} telas com 2 ou mais sinais — candidatas a olhar.`)
console.log(`Detalhe completo (com os rótulos de cada botão): ${SAIDA}/orientacao.json`)
console.log(`\n⚠️ Isto é EVIDÊNCIA, não veredito: "a tela orienta?" se responde lendo, não medindo.`)
