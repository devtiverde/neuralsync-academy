// Testes da chave de idempotência.  Rodar:  deno test supabase/functions/kiwify-webhook/
//
// O que está sendo protegido: uma entrega repetida NÃO pode virar um segundo
// processamento, e um evento DIFERENTE do mesmo pedido não pode ser confundido com
// repetição. O segundo caso é o perigoso — confundir cancelamento com repetição do
// pagamento deixaria alguém que pediu reembolso com o acesso ligado.

import { assertEquals, assertNotEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { chaveDoEvento } from './chave.ts'

const aprovado = {
  order_id: 'abc123',
  webhook_event_type: 'order_approved',
  Customer: { email: 'cliente@exemplo.com' },
}

Deno.test('a mesma entrega, repetida, dá a mesma chave', async () => {
  const cru = JSON.stringify(aprovado)
  const a = await chaveDoEvento(aprovado, cru, 'order_approved', 'paid')
  const b = await chaveDoEvento(aprovado, cru, 'order_approved', 'paid')
  assertEquals(a, b)
})

Deno.test('o cancelamento do mesmo pedido NÃO conta como repetição', async () => {
  // É o caso que mais dói: com a chave sendo só o id do pedido, o cancelamento seria
  // descartado como duplicata e quem pediu reembolso ficaria com o acesso ligado.
  const cancelado = { ...aprovado, webhook_event_type: 'subscription_canceled' }
  const a = await chaveDoEvento(aprovado, JSON.stringify(aprovado), 'order_approved', 'paid')
  const b = await chaveDoEvento(cancelado, JSON.stringify(cancelado), 'subscription_canceled', 'canceled')
  assertNotEquals(a, b)
})

Deno.test('pedidos diferentes com o mesmo evento não colidem', async () => {
  const outro = { ...aprovado, order_id: 'xyz789' }
  const a = await chaveDoEvento(aprovado, JSON.stringify(aprovado), 'order_approved', 'paid')
  const b = await chaveDoEvento(outro, JSON.stringify(outro), 'order_approved', 'paid')
  assertNotEquals(a, b)
})

Deno.test('sem id de pedido, cai no hash do corpo cru', async () => {
  const semId = { webhook_event_type: 'order_approved', Customer: { email: 'a@b.com' } }
  const cru = JSON.stringify(semId)
  const chave = await chaveDoEvento(semId, cru, 'order_approved', 'paid')
  assertEquals(chave.startsWith('kiwify:sha256:'), true)
  // o mesmo corpo tem que dar o mesmo hash, senão o reenvio passaria batido
  assertEquals(chave, await chaveDoEvento(semId, cru, 'order_approved', 'paid'))
})

Deno.test('sem id de pedido, corpos diferentes dão chaves diferentes', async () => {
  const um   = { webhook_event_type: 'order_approved', Customer: { email: 'a@b.com' } }
  const dois = { webhook_event_type: 'order_approved', Customer: { email: 'c@d.com' } }
  assertNotEquals(
    await chaveDoEvento(um,   JSON.stringify(um),   'order_approved', 'paid'),
    await chaveDoEvento(dois, JSON.stringify(dois), 'order_approved', 'paid'),
  )
})

Deno.test('reconhece o id do pedido nos formatos alternativos da Kiwify', async () => {
  // A Kiwify já mudou a caixa dos campos uma vez (`Customer`/`Product` com maiúscula) e
  // isso custou uma venda. Aqui as variações são aceitas de propósito.
  for (const corpo of [
    { order_id: 'k1' },
    { Order: { order_id: 'k1' } },
    { order: { order_id: 'k1' } },
    { id: 'k1' },
  ]) {
    assertEquals(
      await chaveDoEvento(corpo, JSON.stringify(corpo), 'order_approved', 'paid'),
      'kiwify:k1:order_approved',
    )
  }
})
