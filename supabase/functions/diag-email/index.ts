// FUNÇÃO TEMPORÁRIA DE DIAGNÓSTICO — APAGAR depois de resolver o envio de e-mail.
//
// Existe porque o webhook da Kiwify gravou `email=false` (o Resend recusou o envio)
// e não há como ler o log da Edge Function pela CLI. Ela tenta enviar um e-mail e
// devolve a resposta CRUA do Resend, que é o que diz o motivo real da recusa
// (domínio não verificado, chave inválida, remetente não autorizado…).
//
// Protegida por um token dedicado (DIAG_TOKEN) — nunca usa nem expõe a chave real.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const url = new URL(req.url)
  const diag = Deno.env.get('DIAG_TOKEN')
  if (!diag || url.searchParams.get('t') !== diag) {
    return new Response('Unauthorized', { status: 401 })
  }

  const apiKey = Deno.env.get('RESEND_API_KEY') ?? Deno.env.get('Resend')
  const destino = url.searchParams.get('para') ?? ''
  const remetente = url.searchParams.get('de') ?? 'NeuralSync Academy <noreply@neuralsync.com.br>'

  const relatorio: Record<string, unknown> = {
    chave_encontrada: Boolean(apiKey),
    chave_nome: Deno.env.get('RESEND_API_KEY') ? 'RESEND_API_KEY' : (Deno.env.get('Resend') ? 'Resend' : '(nenhuma)'),
    chave_prefixo: apiKey ? apiKey.slice(0, 3) : null,
    chave_tamanho: apiKey ? apiKey.length : 0,
    remetente,
    destino,
  }

  if (!apiKey) {
    return Response.json({ ...relatorio, conclusao: 'Nenhuma chave do Resend configurada' })
  }

  // 1) A chave é válida? Listar domínios é uma chamada de leitura, não envia nada.
  try {
    const d = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    relatorio.dominios_status = d.status
    relatorio.dominios_resposta = (await d.text()).slice(0, 1500)
  } catch (e) {
    relatorio.dominios_erro = String(e)
  }

  // 1b) Detalhe do domínio: quais registros de DNS o Resend espera e quais falharam.
  const domId = url.searchParams.get('dom')
  if (domId) {
    try {
      const d = await fetch(`https://api.resend.com/domains/${domId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      })
      relatorio.dominio_status = d.status
      relatorio.dominio_detalhe = (await d.text()).slice(0, 4000)
    } catch (e) {
      relatorio.dominio_erro = String(e)
    }
  }

  // 1c) Pedir revalidação do domínio (depois de corrigir o DNS).
  if (domId && url.searchParams.get('verificar') === '1') {
    try {
      const v = await fetch(`https://api.resend.com/domains/${domId}/verify`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
      })
      relatorio.verificar_status = v.status
      relatorio.verificar_resposta = (await v.text()).slice(0, 800)
    } catch (e) {
      relatorio.verificar_erro = String(e)
    }
  }

  // 2) Tentar o envio de verdade, se pediram um destino.
  if (destino) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: remetente,
          to: [destino],
          subject: 'Teste de envio — NeuralSync',
          html: '<p>Teste de diagnóstico do envio de e-mail.</p>',
        }),
      })
      relatorio.envio_status = r.status
      relatorio.envio_resposta = (await r.text()).slice(0, 1500)
    } catch (e) {
      relatorio.envio_erro = String(e)
    }
  }

  return Response.json(relatorio)
})
