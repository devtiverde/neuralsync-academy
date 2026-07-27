/**
 * Auditoria de responsividade das telas que NÃO são atividade.
 *
 * O `auditar-atividades.mjs` cobre as 24 telas de jogo. Este cobre o resto da
 * plataforma: home, trilha, loja, ranking, perfil, área dos pais e as páginas
 * públicas. Juntos, os dois respondem "a plataforma inteira responde no
 * celular?" sem depender de conferência visual manual.
 *
 * COMO ENTRA SEM LOGIN
 * `PrivateRoute` (src/App.jsx) libera a rota quando `sessionStorage.ns_dev_bypass`
 * é '1', e esse if inteiro é removido do bundle de produção pelo
 * `import.meta.env.DEV`. É o mesmo atalho que o `src/dev/DevAtividade.jsx` usa.
 *
 * POR QUE MEDE ELEMENTO A ELEMENTO E NÃO SÓ scrollWidth
 * `src/index.css` tem `html, body { overflow-x: hidden }`. Com isso o documento
 * NUNCA relata scrollWidth maior que a janela, mesmo com conteúdo inteiramente
 * fora da tela — foi exatamente assim que o cabeçalho da criança ficou
 * inalcançável no celular sem nenhum sintoma mensurável. Então o teste percorre
 * os elementos e procura quem tem borda direita além da largura da janela.
 *
 * Uso: node auditar-telas.mjs <porta>     (ex.: node auditar-telas.mjs 5173)
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { prepararContexto, CRIANCA_TESTE } from './harness-teste.mjs'

const PORTA = process.argv[2]
if (!PORTA) {
  console.error('Falta a porta. Ex.: node auditar-telas.mjs 5173')
  process.exit(2)
}
const BASE = `http://localhost:${PORTA}`
const SAIDA = 'auditoria-telas'

const ROTAS = [
  // públicas
  { rota: '/',                 nome: 'landing',        area: 'publica' },
  { rota: '/auth',             nome: 'login',          area: 'publica' },
  { rota: '/planos',           nome: 'planos',         area: 'publica' },
  { rota: '/termos',           nome: 'termos',         area: 'publica' },
  { rota: '/privacidade',      nome: 'privacidade',    area: 'publica' },
  { rota: '/recuperar-senha',  nome: 'recuperar',      area: 'publica' },
  // criança
  { rota: '/home-crianca',     nome: 'home',           area: 'crianca' },
  { rota: '/trilha',           nome: 'trilha',         area: 'crianca' },
  { rota: '/ranking',          nome: 'ranking',        area: 'crianca' },
  { rota: '/perfil-crianca',   nome: 'perfil',         area: 'crianca' },
  { rota: '/loja',             nome: 'loja',           area: 'crianca' },
  { rota: '/personalizar',     nome: 'personalizar',   area: 'crianca' },
  { rota: '/coins',            nome: 'coins',          area: 'crianca' },
  { rota: '/diario',           nome: 'diario',         area: 'crianca' },
  { rota: '/digitacao',        nome: 'digitacao',      area: 'crianca' },
  { rota: '/atividades-offline', nome: 'offline',      area: 'crianca' },
  { rota: '/kids',             nome: 'kids-tv',        area: 'crianca' },
  { rota: '/ebook',            nome: 'ebooks',         area: 'crianca' },
  { rota: '/ebook/leitura?id=corpo-humano', nome: 'ebook-leitura', area: 'crianca' },
  { rota: '/quiz-ia',          nome: 'quiz-ia-livre',  area: 'crianca' },
  { rota: '/neural-ai',        nome: 'neural-ai',      area: 'crianca' },
  { rota: '/bloqueio',         nome: 'bloqueio',       area: 'crianca' },
  { rota: '/timer-ativo',      nome: 'timer-ativo',    area: 'crianca' },
  // pais
  { rota: '/dashboard',        nome: 'dashboard',      area: 'pai' },
  { rota: '/timer',            nome: 'timer',          area: 'pai' },
  { rota: '/agenda',           nome: 'agenda',         area: 'pai' },
  { rota: '/notificacoes',     nome: 'notificacoes',   area: 'pai' },
  { rota: '/relatorio',        nome: 'relatorio',      area: 'pai' },
  { rota: '/relatorio-ia',     nome: 'relatorio-ia',   area: 'pai' },
  { rota: '/perfil-filho',     nome: 'perfil-filho',   area: 'pai' },
  { rota: '/trilha-pai',       nome: 'trilha-pai',     area: 'pai' },
  { rota: '/configuracoes',    nome: 'configuracoes',  area: 'pai' },
]

const TELAS = [
  { nome: 'celular-p', largura: 360, altura: 740 },   // Android pequeno, o pior caso comum
  { nome: 'celular',   largura: 390, altura: 844 },   // iPhone 12/13/14
  { nome: 'tablet',    largura: 820, altura: 1180 },
  { nome: 'janela',    largura: 1100, altura: 720 },  // PC não maximizado
]

// O id precisa ter forma de UUID: as telas que consultam `ns_historico` e
// `ns_purchases` filtram por `child_id`, e um id solto como 'dev-child' faz o
// Postgres devolver 400. Isso aparecia no relatorio como "erro de JS" em
// perfil/loja/coins/perfil-filho — ruido do teste, nao defeito da tela.
mkdirSync(SAIDA, { recursive: true })
const navegador = await chromium.launch()
const resultados = []

for (const tela of TELAS) {
  const ctx = await navegador.newContext({
    viewport: { width: tela.largura, height: tela.altura },
    isMobile: tela.largura < 800,
    hasTouch: tela.largura < 800,
    deviceScaleFactor: 2,
  })

  await prepararContexto(ctx)

  for (const { rota, nome, area } of ROTAS) {
    const pagina = await ctx.newPage()
    const erros = []
    pagina.on('pageerror', e => erros.push(String(e.message).slice(0, 120)))
    pagina.on('console', m => { if (m.type() === 'error') erros.push(m.text().slice(0, 120)) })

    const reg = { tela: tela.nome, largura: tela.largura, rota, nome, area, erros }

    try {
      await pagina.goto(BASE + rota, { waitUntil: 'networkidle', timeout: 20000 })
      await pagina.waitForTimeout(900) // animações de entrada e dados assíncronos

      reg.urlFinal = new URL(pagina.url()).pathname
      reg.redirecionou = reg.urlFinal !== rota.split('?')[0]

      const medida = await pagina.evaluate(largura => {
        const doc = document.documentElement
        const vazamentos = []
        let alcancavel = true

        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          const est = getComputedStyle(el)
          if (est.visibility === 'hidden' || est.display === 'none' || est.opacity === '0') continue
          // Elemento fixo/absoluto propositalmente fora da tela (menu fechado,
          // carrossel) não é bug. O sintoma real é conteúdo do FLUXO passando da
          // borda direita sem que exista barra para alcançá-lo.
          if (est.position === 'fixed' || est.position === 'absolute') continue
          const excesso = Math.round(r.right - largura)
          if (excesso <= 2) continue

          // Passar da borda só é bug se NÃO houver como chegar lá. Uma barra com
          // `overflow-x: auto` (o `.menu-bottom` da criança, a tabela de planos)
          // também "vaza" e é perfeitamente alcançável arrastando. Sem esta
          // checagem o relatório enche de falso positivo e deixa de ser útil.
          let rolavel = false
          let pai = el.parentElement
          while (pai && pai !== document.body) {
            const pe = getComputedStyle(pai)
            const rolaCSS = ['auto', 'scroll'].includes(pe.overflowX) || ['auto', 'scroll'].includes(pe.overflow)
            if (rolaCSS && pai.scrollWidth > pai.clientWidth + 2) { rolavel = true; break }
            pai = pai.parentElement
          }
          if (rolavel) continue

          vazamentos.push({
            excesso,
            tag: el.tagName.toLowerCase(),
            classe: (el.className && typeof el.className === 'string' ? el.className : '').slice(0, 45),
            texto: (el.textContent || '').trim().slice(0, 40),
          })
        }

        // Texto cortado por overflow:hidden — scrollWidth do próprio elemento
        // maior que a largura visível dele. É o corte que o scrollWidth do
        // documento não enxerga.
        const cortados = []
        for (const el of document.querySelectorAll('h1,h2,h3,p,span,button,a,label,li')) {
          if (el.children.length > 0) continue
          if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
            const est = getComputedStyle(el)
            if (est.overflow === 'hidden' || est.overflowX === 'hidden' || est.textOverflow === 'ellipsis') {
              cortados.push({
                tag: el.tagName.toLowerCase(),
                sobra: el.scrollWidth - el.clientWidth,
                texto: (el.textContent || '').trim().slice(0, 40),
              })
            }
          }
        }

        // Alvo de toque abaixo do mínimo. 44px é o piso da WCAG; para criança
        // pequena a referência da NN/g é ~76px, mas 44 já pega o caso grave.
        const alvosPequenos = []
        for (const el of document.querySelectorAll('button, a[href], input[type=checkbox], [role=button]')) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          const est = getComputedStyle(el)
          if (est.visibility === 'hidden' || est.display === 'none') continue
          if (r.height < 32 || r.width < 32) {
            alvosPequenos.push({
              w: Math.round(r.width), h: Math.round(r.height),
              texto: (el.textContent || '').trim().slice(0, 30) || el.getAttribute('aria-label') || el.tagName,
            })
          }
        }

        return {
          docScrollWidth: doc.scrollWidth,
          vazamentos: vazamentos.sort((a, b) => b.excesso - a.excesso).slice(0, 6),
          totalVazamentos: vazamentos.length,
          cortados: cortados.slice(0, 5),
          alvosPequenos: alvosPequenos.slice(0, 5),
          totalAlvosPequenos: alvosPequenos.length,
          corpoVazio: (document.body.innerText || '').trim().length < 20,
          alcancavel,
        }
      }, tela.largura)

      Object.assign(reg, medida)
    } catch (e) {
      reg.falha = String(e.message).split('\n')[0].slice(0, 110)
    }

    await pagina.close()
    resultados.push(reg)
  }

  await ctx.close()
}

await navegador.close()
writeFileSync(`${SAIDA}/resultado.json`, JSON.stringify(resultados, null, 2))

// ── relatório ────────────────────────────────────────────────
const comProblema = resultados.filter(r =>
  r.falha || r.erros?.length || r.totalVazamentos > 0 || r.cortados?.length || r.corpoVazio
)

const naoRodou = resultados.filter(r => r.falha).length
if (naoRodou === resultados.length) {
  console.log(`\n⛔ Nenhuma tela foi medida — as ${resultados.length} tentativas falharam.`)
  console.log(`   O servidor está no ar em ${BASE}?\n`)
  process.exit(2)
}

console.log(`\n${resultados.length} combinações testadas (${ROTAS.length} telas × ${TELAS.length} tamanhos) · ${comProblema.length} com problema\n`)

for (const tela of TELAS) {
  const daTela = comProblema.filter(p => p.tela === tela.nome)
  console.log(`\n═══ ${tela.nome} (${tela.largura}×${tela.altura}) — ${daTela.length} problemas ═══`)
  for (const p of daTela) {
    const partes = []
    if (p.falha) partes.push(`FALHOU: ${p.falha}`)
    if (p.corpoVazio) partes.push('TELA VAZIA')
    if (p.redirecionou) partes.push(`redirecionou → ${p.urlFinal}`)
    if (p.totalVazamentos > 0) {
      const pior = p.vazamentos[0]
      partes.push(`${p.totalVazamentos} elemento(s) fora da tela — pior: +${pior.excesso}px <${pior.tag}> "${pior.texto}"`)
    }
    if (p.cortados?.length) partes.push(`${p.cortados.length} texto(s) cortado(s): "${p.cortados[0].texto}"`)
    if (p.erros?.length) partes.push(`JS: ${p.erros[0]}`)
    console.log(`  ${p.nome.padEnd(16)} ${partes.join(' · ')}`)
  }
}

// Alvos pequenos entram como aviso separado: nem sempre é bug (ícone decorativo
// dentro de um botão maior conta como "a"), mas em tela de criança merece olhada.
const comAlvos = resultados.filter(r => r.totalAlvosPequenos > 0 && r.largura < 800)
if (comAlvos.length) {
  console.log(`\n⚠️  AVISO — alvos de toque abaixo de 32px no celular (checar manualmente):`)
  const porTela = {}
  for (const r of comAlvos) porTela[r.nome] = Math.max(porTela[r.nome] || 0, r.totalAlvosPequenos)
  for (const [nome, n] of Object.entries(porTela)) console.log(`  ${nome.padEnd(16)} ${n} alvo(s)`)
}

const limpas = ROTAS.filter(r => !comProblema.some(p => p.nome === r.nome))
if (limpas.length === ROTAS.length) {
  console.log(`\n✅ As ${ROTAS.length} telas passaram em todos os ${TELAS.length} tamanhos.\n`)
} else {
  console.log(`\n${limpas.length} de ${ROTAS.length} telas limpas em todos os tamanhos.`)
  console.log(`${ROTAS.length - limpas.length} com problema em pelo menos um tamanho — detalhe acima.`)
  console.log(`Relatório completo em ${SAIDA}/resultado.json\n`)
  process.exit(1)
}
