/**
 * conferir-verify-jwt.mjs — confere, contra a PRODUÇÃO, se cada Edge Function está
 * com a verificação de JWT no estado certo.
 *
 * POR QUE ISSO EXISTE
 * -------------------
 * Em 21/07/2026 um deploy ligou `verify_jwt` no `kiwify-webhook` sozinho. O gateway
 * passou a recusar as entregas da Kiwify com "Missing authorization header" ANTES de
 * executar uma linha da função — e toda venda se perdeu em silêncio, sem erro, sem log,
 * sem aparecer em lugar nenhum do sistema. A mensagem de sucesso do CLI não prova nada:
 * o deploy funciona, o que muda é a configuração do gateway.
 *
 * COMO A SONDAGEM FUNCIONA (e por que é segura)
 * ---------------------------------------------
 * Todas as 5 funções recusam método diferente de POST com 405 na PRIMEIRA linha do
 * handler, antes de tocar em banco, e-mail ou API paga. Então um GET é inerte:
 *
 *   - gateway respondeu 401 "Missing authorization header"  → verify_jwt LIGADO
 *     (a função nunca rodou)
 *   - a função respondeu 405 "Method Not Allowed"           → verify_jwt DESLIGADO
 *     (o gateway deixou passar)
 *
 * 🔑 O QUE DISTINGUE OS DOIS CASOS NÃO É O STATUS, É QUEM RESPONDE. O `feedback-notify`
 * também devolve 401 por conta própria quando não reconhece o usuário. Olhar só o
 * código HTTP daria "401 nos dois" e não mediria nada.
 *
 * VALIDAÇÃO DO INSTRUMENTO
 * ------------------------
 * Para as funções que DEVEM ter JWT ligado roda uma segunda sondagem, com um
 * `Authorization` propositalmente inválido. Um gateway que verifica de verdade recusa
 * com uma mensagem DIFERENTE da primeira (JWT inválido ≠ cabeçalho ausente). Se as duas
 * respostas forem iguais, ou se aparecer um 405, a conclusão da 1ª sondagem não se
 * sustenta e o script avisa em vez de dar certo caladamente.
 *
 * Uso:  node conferir-verify-jwt.mjs
 * Sai com código ≠ 0 se algo estiver fora do esperado ou indeterminado.
 */

const PROJECT_REF = 'nlcjddiqlnvtgusssspk'
const BASE = `https://${PROJECT_REF}.supabase.co/functions/v1`

/**
 * `jwt: false` é OBRIGATÓRIO no kiwify-webhook — a Kiwify é um servidor externo e não
 * manda `Authorization`. A autenticação real dele é o token compartilhado, conferido
 * DENTRO da função. Ver supabase/config.toml.
 */
const FUNCOES = [
  { nome: 'kiwify-webhook',        jwt: false, porque: 'Kiwify é servidor externo, não manda Authorization — ligado = toda venda perdida em silêncio' },
  { nome: 'feedback-notify',       jwt: true,  porque: 'dispara e-mail; só o app logado chama' },
  { nome: 'ai-proxy',              jwt: true,  porque: 'consome API paga da Anthropic' },
  { nome: 'neuralai-chat',         jwt: true,  porque: 'consome API paga e conversa com criança' },
  { nome: 'activate-pending-plan', jwt: true,  porque: 'ativa plano pago' },
]

/** Assinaturas com que o GATEWAY recusa por falta de cabeçalho (não a função). */
const SEM_CABECALHO = ['missing authorization header', 'unauthorized_no_auth_header']

async function sondar(nome, headers = {}) {
  const r = await fetch(`${BASE}/${nome}`, { method: 'GET', headers })
  return { status: r.status, corpo: (await r.text()).trim().slice(0, 300) }
}

/** LIGADO | DESLIGADO | INDETERMINADO — nunca chuta. */
function ler({ status, corpo }) {
  const c = corpo.toLowerCase()
  if (status === 401 && SEM_CABECALHO.some(s => c.includes(s))) return 'LIGADO'
  if (status === 405) return 'DESLIGADO'
  return 'INDETERMINADO'
}

console.log(`\n🔐 verify_jwt em produção — projeto ${PROJECT_REF}\n`)

let problemas = 0

for (const f of FUNCOES) {
  const esperado = f.jwt ? 'LIGADO' : 'DESLIGADO'
  let a
  try {
    a = await sondar(f.nome)
  } catch (e) {
    console.log(`❌ ${f.nome.padEnd(22)} não respondeu: ${e.message}`)
    problemas++
    continue
  }

  const lido = ler(a)
  const bate = lido === esperado
  const icone = lido === 'INDETERMINADO' ? '❓' : bate ? '✅' : '🔴'

  console.log(`${icone} ${f.nome.padEnd(22)} ${lido.padEnd(14)} (esperado ${esperado})`)
  console.log(`   HTTP ${a.status} · ${a.corpo || '(corpo vazio)'}`)

  if (!bate) {
    problemas++
    console.log(`   ⚠️  ${f.porque}`)
    if (!f.jwt) {
      console.log(`   ↩️  conserto: npx supabase functions deploy ${f.nome} --no-verify-jwt --project-ref ${PROJECT_REF}`)
    } else {
      console.log(`   ↩️  conserto: npx supabase functions deploy ${f.nome} --project-ref ${PROJECT_REF}`)
    }
  }

  // Validação do instrumento: só faz sentido onde esperamos o gateway barrando.
  if (f.jwt && lido === 'LIGADO') {
    const b = await sondar(f.nome, { Authorization: 'Bearer isto-nao-e-um-jwt' })
    const mesmaResposta = b.status === a.status && b.corpo === a.corpo
    if (b.status === 405) {
      console.log(`   ❓ instrumento não confere: com cabeçalho inválido a função RODOU (405).`)
      console.log(`      O 401 de antes pode não ter vindo do gateway. Conferir no painel.`)
      problemas++
    } else if (mesmaResposta) {
      console.log(`   ❓ instrumento não confere: cabeçalho ausente e cabeçalho inválido deram`)
      console.log(`      a MESMA resposta. Um gateway que verifica distingue os dois casos.`)
      problemas++
    }
  }

  console.log('')
}

if (problemas === 0) {
  console.log('✅ As 5 funções estão no estado esperado.\n')
  process.exit(0)
}

console.log(`🔴 ${problemas} problema(s). NÃO concluir que está tudo bem.\n`)
process.exit(1)
