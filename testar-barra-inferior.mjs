/**
 * A barra inferior do celular não pode cobrir o fim do conteúdo.
 *
 * POR QUE ESTE TESTE EXISTE
 * O conserto é um `padding-bottom` em `.ns-conteudo-crianca` com um número (96px) escolhido
 * a partir da altura MEDIDA da `.menu-bottom` (93px). Número escolhido à mão envelhece: basta
 * alguém aumentar a fonte do rótulo, trocar o ícone ou o padding da barra para a folga virar
 * negativa — e o sintoma volta calado, porque nada quebra, só o último botão fica inalcançável
 * de novo. Então a garantia não é o número, é esta afirmação: **o espaço reservado é sempre
 * maior ou igual à altura real da barra**, medida no navegador, em todas as telas.
 *
 * Valida o instrumento antes: confere que a barra EXISTE abaixo de 768px e NÃO existe acima.
 * Sem isso, um seletor errado (`.menu-bottom` renomeado) faria o teste passar medindo nada.
 *
 * Uso: node testar-barra-inferior.mjs <porta>
 */
import { chromium } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2]
if (!PORTA) { console.error('Uso: node testar-barra-inferior.mjs <porta>'); process.exit(2) }
const BASE = `http://localhost:${PORTA}`

// `--sem-conserto` anula o `padding-bottom` do conserto em tempo de execução, reproduzindo o
// estado ANTERIOR. Serve para provar que este teste MEDE: rodado assim ele tem que FALHAR.
// Teste que passa nas duas versões não está medindo o conserto — está só existindo.
const SEM_CONSERTO = process.argv.includes('--sem-conserto')
const CSS_DESFAZ = '.ns-conteudo-crianca, .page-wrapper { padding-bottom: 0 !important; }'

const ROTAS = [
  '/home-crianca', '/trilha', '/ranking', '/perfil-crianca', '/loja', '/personalizar',
  '/coins', '/diario', '/atividades-offline', '/kids', '/kids/dinossauros', '/quiz-ia',
  '/timer-ativo', '/neural-ai',
]

let falhas = 0
const erro = m => { falhas++; console.log('  🔴 ' + m) }

const nav = await chromium.launch()

// ── validação do instrumento ────────────────────────────────────────────────
const ctxDesk = await nav.newContext({ viewport: { width: 1366, height: 768 } })
await prepararContexto(ctxDesk)
const pDesk = await ctxDesk.newPage()
await pDesk.goto(BASE + '/home-crianca', { waitUntil: 'networkidle' })
await pDesk.waitForTimeout(600)
const barraNoDesktop = await pDesk.evaluate(() => {
  const b = document.querySelector('.menu-bottom')
  return b ? getComputedStyle(b).display !== 'none' : false
})
await ctxDesk.close()
console.log('\n🔬 Validação do instrumento')
if (barraNoDesktop) erro('a barra aparece no desktop — o teste abaixo mediria a tela errada')
else console.log('  ✅ a barra não existe acima de 768px (como esperado)')

// ── a afirmação ─────────────────────────────────────────────────────────────
for (const { largura, altura } of [{ largura: 360, altura: 640 }, { largura: 390, altura: 844 }]) {
  const ctx = await nav.newContext({ viewport: { width: largura, height: altura }, isMobile: true, hasTouch: true })
  await prepararContexto(ctx)
  console.log(`\n═══ ${largura}×${altura} ═══`)

  for (const rota of ROTAS) {
    const p = await ctx.newPage()
    try {
      await p.goto(BASE + rota, { waitUntil: 'networkidle', timeout: 20000 })
      if (SEM_CONSERTO) await p.addStyleTag({ content: CSS_DESFAZ })
      await p.waitForTimeout(650)

      const m = await p.evaluate(() => {
        const barra = document.querySelector('.menu-bottom')
        if (!barra || getComputedStyle(barra).display === 'none') return { semBarra: true }
        const alturaBarra = barra.getBoundingClientRect().height
        const alvo = document.querySelector('.ns-conteudo-crianca') || document.querySelector('.page-wrapper')
        if (!alvo) return { semAlvo: true, alturaBarra }
        const reservado = parseFloat(getComputedStyle(alvo).paddingBottom) || 0

        // Conferência de comportamento: rolar até o fim e ver se o último controle do
        // conteúdo continua recebendo o próprio clique, em vez de um botão da barra.
        window.scrollTo(0, document.documentElement.scrollHeight)
        const controles = [...alvo.querySelectorAll('button, a[href], [role=button]')]
          .filter(el => {
            const e = getComputedStyle(el)
            if (e.display === 'none' || e.visibility === 'hidden' || e.pointerEvents === 'none') return false
            const r = el.getBoundingClientRect()
            return r.width > 0 && r.height > 0
          })
        let roubados = []
        for (const el of controles) {
          const r = el.getBoundingClientRect()
          const cx = Math.round(r.left + r.width / 2), cy = Math.round(r.top + r.height / 2)
          if (cy < 0 || cy > window.innerHeight) continue
          const noPonto = document.elementFromPoint(cx, cy)
          if (!noPonto) continue
          if (el === noPonto || el.contains(noPonto)) continue
          if (noPonto.closest('.menu-bottom')) {
            roubados.push({
              alvo: (el.textContent || '').trim().slice(0, 34),
              ladrao: (noPonto.textContent || '').trim().slice(0, 24),
            })
          }
        }
        return { alturaBarra: Math.round(alturaBarra), reservado: Math.round(reservado), roubados }
      })

      if (m.semBarra) { erro(`${rota}: a barra não apareceu no celular`); }
      else if (m.semAlvo) { erro(`${rota}: nenhum contêiner de conteúdo reconhecido (barra ${m.alturaBarra}px)`) }
      else if (m.reservado < m.alturaBarra) {
        erro(`${rota}: reserva ${m.reservado}px < barra ${m.alturaBarra}px — o fim do conteúdo fica embaixo dela`)
      } else if (m.roubados.length) {
        erro(`${rota}: ${m.roubados.length} controle(s) com o clique roubado pela barra — ex.: "${m.roubados[0].alvo}" → "${m.roubados[0].ladrao}"`)
      } else {
        console.log(`  ✅ ${rota.padEnd(22)} reserva ${m.reservado}px ≥ barra ${m.alturaBarra}px · nenhum clique roubado`)
      }
    } catch (e) {
      // "Execution context was destroyed" = a página navegou no meio do `evaluate`. É ruído
      // de tempo, não defeito da barra, e aparece de forma intermitente (/coins passou numa
      // rodada e falhou na seguinte). Uma repetição resolve; se falhar DE NOVO, é reportado
      // como falha de verdade — a repetição não engole erro, só desconta a corrida.
      const msg = String(e.message).split('\n')[0]
      if (/Execution context was destroyed|Target closed|frame was detached/i.test(msg)) {
        try {
          await p.goto(BASE + rota, { waitUntil: 'networkidle', timeout: 20000 })
          if (SEM_CONSERTO) await p.addStyleTag({ content: CSS_DESFAZ })
          await p.waitForTimeout(900)
          const m2 = await p.evaluate(() => {
            const barra = document.querySelector('.menu-bottom')
            const alvo = document.querySelector('.ns-conteudo-crianca') || document.querySelector('.page-wrapper')
            if (!barra || !alvo) return null
            return {
              alturaBarra: Math.round(barra.getBoundingClientRect().height),
              reservado: Math.round(parseFloat(getComputedStyle(alvo).paddingBottom) || 0),
            }
          })
          if (m2 && m2.reservado >= m2.alturaBarra) {
            console.log(`  ✅ ${rota.padEnd(22)} reserva ${m2.reservado}px ≥ barra ${m2.alturaBarra}px (2ª tentativa)`)
          } else {
            erro(`${rota}: na 2ª tentativa, reserva ${m2?.reservado} < barra ${m2?.alturaBarra}`)
          }
        } catch (e2) {
          erro(`${rota}: falhou duas vezes — ${String(e2.message).split('\n')[0].slice(0, 60)}`)
        }
      } else {
        erro(`${rota}: ${msg.slice(0, 70)}`)
      }
    }
    await p.close()
  }
  await ctx.close()
}

await nav.close()
if (falhas) {
  console.log(`\n🔴 ${falhas} falha(s).\n`)
  process.exit(1)
}
console.log(`\n✅ Em todas as telas a reserva cobre a barra e nenhum clique é roubado.\n`)
