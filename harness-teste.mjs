/**
 * Preparo comum dos scripts de auditoria: entrar sem login e responder as
 * leituras do banco com dados de teste.
 *
 * POR QUE OS DADOS FALSOS IMPORTAM
 * A primeira versão da auditoria não respondia nada: a conta de teste não existe
 * no banco, então as telas renderizavam VAZIAS e passavam limpas. Falso
 * positivo em massa — `/home-crianca` chegou a ser reportada como "não medível"
 * quando na verdade tinha 11 elementos fora da tela assim que recebia dados.
 * Tela sem conteúdo não estoura; a auditoria só vale com a tela cheia.
 */

export const CRIANCA_TESTE = {
  // Precisa ter forma de UUID: as telas filtram `child_id` e o Postgres recusa
  // um id solto com 400.
  id: '00000000-0000-4000-8000-000000000001',
  nome: 'Teste QA', avatar: '🦊', nivel: 3, xp: 420,
  neural_coins: 250, streak_atual: 4, streak_maximo: 9,
  faixa_etaria: 'construtores', idade: 7,
}

const USUARIO_TESTE = {
  id: '00000000-0000-4000-8000-000000000000',
  email: 'qa@dev.local',
  plano: 'premium', plano_status: 'ativo', plano_ativo_ate: '2099-12-31T00:00:00Z',
  agenda_config: null,
}

const RESPOSTAS = {
  children: [CRIANCA_TESTE],
  users: [USUARIO_TESTE],
  ranking_view: [{
    id: CRIANCA_TESTE.id, apelido: 'Explorador #123', xp: 420, neural_coins: 250,
    nivel: 3, faixa_etaria: 'construtores', streak_atual: 4, avatar: '🦊',
  }],
}

/**
 * Aplica o atalho de sessão e as respostas de teste num contexto do Playwright.
 * Chamar ANTES de abrir qualquer página.
 */
export async function prepararContexto(ctx, extras = {}) {
  // Precisa rodar antes de qualquer script da página: o `PrivateRoute` decide
  // redirecionar para /auth na primeira renderização.
  await ctx.addInitScript(([crianca, extrasLocal]) => {
    try {
      sessionStorage.setItem('ns_dev_bypass', '1')
      localStorage.setItem('ns_active_child', JSON.stringify(crianca))
      for (const [k, v] of Object.entries(extrasLocal || {})) localStorage.setItem(k, v)
    } catch { /* modo privado */ }
  }, [CRIANCA_TESTE, extras])

  // Só intercepta LEITURA. Escrita numa auditoria de layout não deveria
  // acontecer — se acontecer, vai ao banco e fica visível, que é o certo.
  await ctx.route('**/rest/v1/**', route => {
    const req = route.request()
    if (req.method() !== 'GET') return route.continue()

    const tabela = new URL(req.url()).pathname.split('/rest/v1/')[1]?.split('?')[0]
    const linhas = RESPOSTAS[tabela] ?? []
    // `.single()` pede o objeto direto; devolver array aí gera 406.
    const querObjeto = (req.headers()['accept'] || '').includes('vnd.pgrst.object')
    const corpo = querObjeto ? (linhas[0] ?? null) : linhas
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(corpo) })
  })
}
