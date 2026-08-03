/**
 * Chave de idempotência do evento da Kiwify (migration 022).
 *
 * Mora em arquivo próprio para poder ser testada: importar o `index.ts` num teste
 * executaria o `serve()` e o processo ficaria pendurado esperando requisição.
 * O Supabase publica a pasta inteira da função, então o import relativo funciona.
 *
 * O HMAC prova que a entrega VEIO da Kiwify. Não prova que chegou UMA VEZ. Reenvio é
 * comportamento padrão de plataforma de pagamento quando o 200 demora, e a Kiwify ainda
 * tem o botão manual de reenviar no painel — reenviar um `order_approved` antigo depois
 * de um cancelamento reativaria um acesso que já tinha sido cortado.
 *
 * A chave NÃO pode ser só o id do pedido: o mesmo pedido gera vários eventos ao longo da
 * vida (boleto gerado → aprovado → cancelado). Só o id descartaria o cancelamento como se
 * fosse repetição do pagamento — exatamente o caso que mais dói.
 */
export async function chaveDoEvento(
  body: Record<string, any>,
  rawBody: string,
  evento: string,
  status: string,
): Promise<string> {
  const pedido =
    body.order_id ?? body.Order?.order_id ?? body.order?.order_id ??
    body.order_ref ?? body.Order?.order_ref ?? body.id ?? null

  if (pedido) return `kiwify:${pedido}:${evento || status || 'sem-evento'}`

  // Reserva, não o caminho principal: o reenvio manda o corpo byte a byte igual, então o
  // hash bate. Mas se a Kiwify carimbar horário dentro do corpo, dois envios do MESMO
  // evento gerariam hashes diferentes e a proteção não pegaria. Por isso o id vem antes.
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawBody))
  return 'kiwify:sha256:' + Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}
