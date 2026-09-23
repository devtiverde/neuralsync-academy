/**
 * testar-trava-horario.mjs — a agenda do responsável realmente barra?
 *
 * Pergunta do Cláudio (23/09): *"conferir se o relógio realmente trava"*.
 * A resposta medida era NÃO: `dentroDoHorario` só era consultado em
 * `HomeCrianca.jsx:92`. Toda outra tela da criança — e toda atividade — entrava
 * livremente, e quem já estava dentro nunca era barrado ao passar da hora.
 *
 * 🪤 VALIDAR O INSTRUMENTO ANTES DA MEDIDA. Um teste que só abre telas com a
 * agenda FECHADA e vê `/bloqueio` não prova nada: um app que mandasse todo mundo
 * para o bloqueio sempre passaria igual. Por isso a rodada 1 usa uma agenda ABERTA
 * e exige que NENHUMA tela bloqueie. Só então a rodada 2 vale.
 *
 * Uso: node testar-trava-horario.mjs <porta>
 */
import { chromium, devices } from 'playwright'
import { prepararContexto } from './harness-teste.mjs'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

const ROTAS = [
  '/home-crianca', '/trilha', '/kids', '/loja', '/digitacao',
  '/atividades-offline', '/perfil-crianca', '/coins', '/diario',
  // 🪤 `/atividade/quiz` não existe: a bancada é `/dev/atividade/:tipo` (só em DEV).
  // A 1ª versão deste teste usava a rota errada e as duas rodadas davam "blank" —
  // um 🔴 que não era do app, era meu.
  '/dev/atividade/quiz',      // atividade aberta: passa pelo GameShell
]

// A agenda é um vetor de 7 posições indexado por `getDay()` (0 = domingo).
function agenda(aberto) {
  const faixa = aberto
    ? { ativo: true, inicio: '00:00', fim: '23:59' }
    : { ativo: false, inicio: '00:00', fim: '00:01' }
  return Array.from({ length: 7 }, () => ({ ...faixa }))
}

async function rodada(nome, aberto, esperaBloqueio) {
  const navegador = await chromium.launch()
  const ctx = await navegador.newContext({ ...devices['Pixel 5'] })
  await prepararContexto(ctx, { ns_agenda_config: JSON.stringify(agenda(aberto)) })
  // sem liberação em vigor no banco — senão a agenda fechada seria contornada
  await ctx.route('**/rest/v1/ns_liberacoes**', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: 'null' }))

  console.log(`\n═══ ${nome} ═══`)
  let certos = 0
  for (const rota of ROTAS) {
    const pag = await ctx.newPage()
    try {
      await pag.goto(`${BASE}${rota}`, { waitUntil: 'networkidle' })
      await pag.waitForTimeout(1100)          // o hook confere ao montar
      const onde = new URL(pag.url()).pathname
      const bloqueou = onde === '/bloqueio'
      const ok = bloqueou === esperaBloqueio
      if (ok) certos++
      console.log(`  ${ok ? '✅' : '🔴'} ${rota.padEnd(22)} → ${onde}`)
    } catch (e) {
      console.log(`  ⚠️  ${rota.padEnd(22)} → erro: ${String(e.message).slice(0, 60)}`)
    }
    await pag.close()
  }
  await navegador.close()
  return { certos, total: ROTAS.length }
}

// 1. instrumento: com a agenda ABERTA nada pode bloquear
const livre = await rodada('1️⃣  VALIDAÇÃO — agenda ABERTA, nada pode bloquear', true, false)
if (livre.certos !== livre.total) {
  console.log(`\n⛔ ${livre.total - livre.certos} tela(s) bloquearam com a agenda aberta.`)
  console.log('   O instrumento não vale — a rodada 2 não provaria nada. Pare aqui.')
  process.exit(2)
}

// 2. a medida
const preso = await rodada('2️⃣  MEDIDA — agenda FECHADA, tudo tem que bloquear', false, true)

console.log(`\n${preso.certos === preso.total ? '✅' : '🔴'} ${preso.certos} de ${preso.total} telas respeitam a agenda.`)
if (preso.certos !== preso.total) {
  console.log('   As telas acima com 🔴 deixam a criança entrar fora do horário.')
  process.exit(1)
}
