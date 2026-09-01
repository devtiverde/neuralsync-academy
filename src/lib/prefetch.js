/**
 * Prefetch no OCIOSO do que a criança vai abrir a seguir.
 *
 * POR QUE ISTO EXISTE
 * Toda atividade — as 25, sem exceção — mostra a `IntroAtividade` antes do jogo,
 * e ela é o maior pedaço do caminho de abertura: 10,2 kB gzip contra 2–5 kB do
 * componente da atividade em si. Como o React só pede esse pedaço no clique, a
 * criança em 4G espera a ida e volta da rede DEPOIS de tocar o cartão — o
 * momento em que ela está olhando pra tela esperando o jogo começar.
 *
 * Buscar no ocioso não deixa a tela mais rápida; deixa o CLIQUE mais rápido, que
 * é onde a espera aparece. E o navegador guarda o pedaço no cache do módulo:
 * quando o clique vier, `import()` resolve na hora, sem rede.
 *
 * 🔑 O CUSTO É ZERO PARA QUEM ESTÁ NAVEGANDO. `requestIdleCallback` só roda
 * quando o navegador não tem nada melhor a fazer — se a criança estiver rolando
 * a tela ou o app ainda estiver montando, ele espera. O `setTimeout` é o plano B
 * do **Safari/iOS**, que não tem `requestIdleCallback` — e é justamente o
 * aparelho de onde vieram as reclamações de lentidão.
 *
 * 🔑 SÓ A HOME PRECISA CHAMAR. A `Trilha.jsx` já importa `foiAssistido` da
 * própria `IntroAtividade` de forma estática, então quem chega pela trilha já
 * baixou o pedaço junto com a tela. Quem sai da HOME direto para uma atividade
 * — a **Missão do Dia** e os cartões do hub que apontam para `/atividade/...` —
 * é que pagava a espera no clique.
 *
 * ⚠️ NÃO transformar isto num prefetch de "tudo". Puxar os 25 componentes de
 * atividade no ocioso gastaria o 4G da família para adiantar o que ela talvez
 * nunca abra. A `IntroAtividade` é o único pedaço que TODA atividade usa.
 */

let jaPedido = false

export function prefetchIntroAtividade() {
  // Uma vez por carga de página basta: o segundo `import()` do mesmo módulo é
  // resolvido pelo cache do navegador, mas nem esse trabalho precisa acontecer.
  if (jaPedido) return
  jaPedido = true

  const puxar = () => {
    // Falhar aqui não pode quebrar nada: é adiantamento, não dependência. Se a
    // rede cair, o clique busca de novo pelo caminho normal.
    import('../pages/atividades/IntroAtividade').catch(() => {})
  }

  if (typeof window === 'undefined') return
  if (typeof window.requestIdleCallback === 'function') {
    // `timeout` garante que em aparelho que nunca fica ocioso o pedido saia
    // mesmo assim — sem ele, `requestIdleCallback` pode não disparar nunca.
    window.requestIdleCallback(puxar, { timeout: 3000 })
  } else {
    // Safari/iOS: 1,2s é depois da tela já ter pintado e assentado.
    setTimeout(puxar, 1200)
  }
}
