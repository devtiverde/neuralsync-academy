// Avisa por e-mail quando chega um feedback novo.
//
// Sem isto o feedback cai na tabela `ns_feedback` e ninguém fica sabendo — cliente
// reporta um bug de madrugada e o reporte só é visto quando alguém lembra de rodar um
// SELECT no dashboard. Com anúncio no ar isso é tempo demais.
//
// Chamada pelo cliente logo depois do INSERT (fire-and-forget). O INSERT em si é o que
// vale: se este e-mail falhar, o feedback continua salvo.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ⚠️ O secret no projeto está cadastrado como `Resend`, não `RESEND_API_KEY`.
// Ler só o nome canônico fazia o envio falhar em silêncio — foi o motivo de o
// e-mail de resumo da NeuralAI nunca ter chegado. Aceita os dois nomes.
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? Deno.env.get('Resend')
// Caixa oficial de atendimento (a mesma do `src/config/support.js` e do `reply_to` do
// e-mail de boas-vindas). Era `tiverdetec@gmail.com`, endereço pessoal — feedback de
// cliente pagante tem que cair no canal da empresa, senão ninguém além do Cláudio vê.
// O segredo `FEEDBACK_EMAIL` continua tendo precedência: se estiver cadastrado no
// projeto com o valor antigo, ELE é que manda, e trocar aqui não muda nada.
const DESTINO = Deno.env.get('FEEDBACK_EMAIL') ?? 'suporte@neuralsync.com.br'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ROTULO: Record<string, string> = {
  bug: '🐛 Erro reportado',
  sugestao: '💡 Sugestão',
  duvida: '❓ Dúvida',
  elogio: '💜 Elogio',
}

// o conteúdo vem do usuário e vai pra dentro de um HTML de e-mail — escapar é obrigatório.
// (mesma classe do bug de injeção de HTML já identificado no resumo da NeuralAI)
function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    // exige usuário autenticado — este endpoint dispara e-mail, não pode ficar aberto
    const authHeader = req.headers.get('Authorization') ?? ''
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )
    const { data: { user }, error: authErr } = await supabase.auth.getUser()
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: 'nao autenticado' }), {
        status: 401, headers: { ...cors, 'Content-Type': 'application/json' },
      })
    }

    if (!RESEND_API_KEY) {
      // sem chave o feedback já está salvo; não é erro do cliente
      return new Response(JSON.stringify({ ok: true, email: false }), {
        headers: { ...cors, 'Content-Type': 'application/json' },
      })
    }

    const { feedback_id } = await req.json().catch(() => ({}))
    if (!feedback_id) {
      return new Response(JSON.stringify({ error: 'feedback_id ausente' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
      })
    }

    // lê a linha COM O TOKEN DO USUÁRIO (respeita RLS): só passa se o feedback for dele.
    // assim ninguém dispara e-mail com o id de feedback de outra pessoa.
    const { data: fb } = await supabase
      .from('ns_feedback')
      .select('id, tipo, mensagem, contexto, created_at')
      .eq('id', feedback_id)
      .single()

    if (!fb) {
      return new Response(JSON.stringify({ error: 'feedback nao encontrado' }), {
        status: 404, headers: { ...cors, 'Content-Type': 'application/json' },
      })
    }

    const ctx = (fb.contexto ?? {}) as Record<string, unknown>
    const titulo = ROTULO[fb.tipo] ?? fb.tipo

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2 style="margin:0 0 4px;font-size:20px">${esc(titulo)}</h2>
        <p style="margin:0 0 18px;color:#666;font-size:13px">NeuralSync Academy</p>
        <div style="background:#f6f4fb;border-radius:12px;padding:16px;margin-bottom:18px">
          <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6">${esc(fb.mensagem)}</p>
        </div>
        <table style="width:100%;font-size:13px;color:#555;border-collapse:collapse">
          <tr><td style="padding:4px 0"><b>Quem</b></td><td>${esc(user.email)}</td></tr>
          <tr><td style="padding:4px 0"><b>Tela</b></td><td>${esc(ctx.rota)}</td></tr>
          <tr><td style="padding:4px 0"><b>Área</b></td><td>${esc(ctx.area)}</td></tr>
          <tr><td style="padding:4px 0"><b>Faixa</b></td><td>${esc(ctx.faixa ?? '—')}</td></tr>
          <tr><td style="padding:4px 0"><b>Tela/viewport</b></td><td>${esc(ctx.viewport)}</td></tr>
          <tr><td style="padding:4px 0;vertical-align:top"><b>Dispositivo</b></td><td style="word-break:break-all">${esc(ctx.user_agent)}</td></tr>
        </table>
        <p style="margin:18px 0 0;font-size:12px;color:#999">id: ${esc(fb.id)}</p>
      </div>`

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'NeuralSync <noreply@neuralsync.com.br>',
        to: [DESTINO],
        reply_to: user.email,
        subject: `${titulo} — NeuralSync`,
        html,
      }),
    })

    return new Response(JSON.stringify({ ok: true, email: r.ok }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e).slice(0, 200) }), {
      status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
})
