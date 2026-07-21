import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const PAID_STATUSES     = ['paid', 'complete', 'approved', 'active']
const CANCELED_STATUSES = ['refunded', 'chargeback', 'chargedback', 'subscription_canceled', 'canceled', 'dispute']

// A Kiwify identifica o que aconteceu tanto por `order_status` quanto por
// `webhook_event_type`, e nem sempre os dois concordam (numa renovação de
// assinatura, por exemplo, o evento é mais específico que o status). Olhamos os
// dois para não perder pagamento nem deixar de cortar acesso em reembolso.
const PAID_EVENTS     = ['order_approved', 'subscription_renewed']
const CANCELED_EVENTS = ['order_refunded', 'chargeback', 'subscription_canceled']

const APP_URL = 'https://app.neuralsync.com.br'

function detectPlan(productName: string): { plano: string; filhos_limite: number } {
  const n = productName.toLowerCase()
  if (n.includes('premium')) return { plano: 'premium', filhos_limite: 999 }
  if (n.includes('famil'))   return { plano: 'familia', filhos_limite: 3 }
  return { plano: 'starter', filhos_limite: 1 }
}

function calcPlanoAtivo(productName: string, periodEnd?: string): string {
  if (periodEnd) {
    const fim = new Date(periodEnd)
    // Data inválida viraria "Invalid Date" e derrubaria o update inteiro,
    // deixando quem pagou sem acesso. Melhor cair no cálculo por produto.
    if (!Number.isNaN(fim.getTime())) return fim.toISOString()
  }
  const d = new Date()
  productName.toLowerCase().includes('anual')
    ? d.setFullYear(d.getFullYear() + 1)
    : d.setMonth(d.getMonth() + 1)
  return d.toISOString()
}

const PLANO_LABEL: Record<string, string> = {
  starter: 'Starter',
  familia: 'Família',
  premium: 'Premium',
}

/**
 * A Kiwify tem dois formatos de webhook em circulação e qual deles chega
 * depende de como o webhook foi cadastrado no painel:
 *   - legado: manda o token dentro do corpo (`body.token`)
 *   - atual:  manda `?signature=` na URL, HMAC-SHA1 do corpo CRU usando o token como chave
 * Aceitamos os dois — senão a configuração "certa" no painel resulta em 401 eterno
 * e a venda é perdida em silêncio.
 */
async function autenticado(rawBody: string, url: URL, token: string): Promise<boolean> {
  const signature = url.searchParams.get('signature')
  if (signature) {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(token),
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign'],
    )
    const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody))
    const hex = Array.from(new Uint8Array(mac))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    return hex === signature.toLowerCase()
  }
  try {
    return JSON.parse(rawBody)?.token === token
  } catch {
    return false
  }
}

/** Envia o e-mail de boas-vindas com o link que já deixa a pessoa dentro do app. */
async function enviarEmailAcesso(email: string, nome: string, plano: string, link: string) {
  // O secret já foi cadastrado com dois nomes diferentes ao longo do tempo; ler os
  // dois evita que o e-mail volte a falhar em silêncio como aconteceu antes.
  const apiKey = Deno.env.get('RESEND_API_KEY') ?? Deno.env.get('Resend')
  if (!apiKey) {
    console.error('[kiwify-webhook] RESEND_API_KEY ausente — e-mail de acesso NÃO enviado para', email)
    return false
  }

  const primeiroNome = (nome || '').trim().split(/\s+/)[0] || ''
  const saudacao = primeiroNome ? `Oi, ${primeiroNome}!` : 'Oi!'

  const html = `
<div style="font-family:'Segoe UI',Arial,sans-serif;background:#f6f4fb;padding:32px 16px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,10,30,.08)">
    <div style="background:linear-gradient(135deg,#1a0a3e,#2d1b69);padding:32px;text-align:center">
      <div style="color:#fff;font-size:22px;font-weight:800">NeuralSync <span style="color:#a78bfa">Academy</span></div>
    </div>
    <div style="padding:32px">
      <h1 style="margin:0 0 12px;font-size:22px;color:#0f0a1e">${saudacao} Sua compra foi confirmada 🎉</h1>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 8px">
        Seu plano <strong>${PLANO_LABEL[plano] ?? plano}</strong> já está ativo e
        <strong>sua conta já foi criada</strong> com este e-mail.
      </p>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 24px">
        Só falta escolher sua senha. É só clicar no botão abaixo:
      </p>
      <div style="text-align:center;margin:0 0 24px">
        <a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#7C3AED,#6d28d9);color:#fff;text-decoration:none;font-weight:700;font-size:16px;padding:15px 32px;border-radius:12px">
          Criar minha senha e entrar
        </a>
      </div>
      <p style="color:#9ca3af;font-size:13px;line-height:1.6;margin:0">
        O link vale por 24 horas. Se expirar, use "Esqueci minha senha" em
        <a href="${APP_URL}/auth" style="color:#7C3AED">${APP_URL.replace('https://', '')}</a>
        com este mesmo e-mail.
      </p>
    </div>
    <div style="background:#faf9fc;padding:20px 32px;text-align:center;color:#9ca3af;font-size:12px">
      Precisa de ajuda? Responda este e-mail ou fale com suporte@neuralsync.com.br
    </div>
  </div>
</div>`.trim()

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'NeuralSync Academy <noreply@neuralsync.com.br>',
        to: [email],
        reply_to: 'suporte@neuralsync.com.br',
        subject: '🎉 Sua conta NeuralSync está pronta — crie sua senha',
        html,
      }),
    })
    if (!r.ok) {
      console.error('[kiwify-webhook] Resend recusou o envio:', r.status, await r.text())
      return false
    }
    return true
  } catch (e) {
    console.error('[kiwify-webhook] falha ao enviar e-mail de acesso:', e)
    return false
  }
}

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  const rawBody = await req.text()
  const url = new URL(req.url)

  // ── Gravador de diagnóstico (TEMPORÁRIO) ──────────────────
  // Registra o que chega ANTES de autenticar, para distinguir "não chegou",
  // "chegou e o token não bate" e "chegou e foi ignorado pelo status".
  // Remover junto com a tabela quando o webhook estiver confirmado.
  const debug: Record<string, any> = {
    metodo: req.method,
    query_keys: [...url.searchParams.keys()].join(', ') || '(nenhum)',
    header_keys: [...req.headers.keys()].join(', '),
    body_bruto: rawBody.slice(0, 4000),
  }
  // devolve um código curto (nunca a mensagem de erro) só para eu saber, de fora,
  // se a gravação funcionou — o endpoint é público e não pode expor o banco.
  let dbgStatus = 'nao-tentou'
  const gravarDebug = async (extra: Record<string, any>) => {
    try {
      const cli = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      )
      const { error } = await cli.from('webhook_debug').insert({ ...debug, ...extra })
      dbgStatus = error ? 'erro-insert' : 'ok'
      if (error) console.error('[kiwify-webhook] insert do diagnóstico falhou:', error)
    } catch (e) {
      dbgStatus = 'excecao'
      console.error('[kiwify-webhook] falha ao gravar diagnóstico:', e)
    }
  }

  try {
    const parsed = JSON.parse(rawBody)
    debug.body_keys = Object.keys(parsed).join(', ')
    // o token compartilhado nunca vai para a tabela
    if (parsed?.token) debug.body_bruto = debug.body_bruto.replaceAll(String(parsed.token), '***TOKEN***')
  } catch {
    debug.body_keys = '(corpo não é JSON válido)'
  }

  const token = Deno.env.get('KIWIFY_WEBHOOK_TOKEN')
  if (!token) {
    console.error('[kiwify-webhook] KIWIFY_WEBHOOK_TOKEN não configurado — requisição rejeitada')
    await gravarDebug({ autenticou: false, modo_auth: 'segredo ausente', resposta: '500 Webhook not configured' })
    return new Response('Webhook not configured', { status: 500 })
  }

  const modoAuth = url.searchParams.get('signature') ? 'signature'
    : (rawBody.includes('"token"') ? 'body.token' : 'nenhum')
  const ok = await autenticado(rawBody, url, token)
  if (!ok) {
    await gravarDebug({ autenticou: false, modo_auth: modoAuth, resposta: '401 Unauthorized' })
    return new Response(`Unauthorized [v3 dbg:${dbgStatus} auth:${modoAuth}]`, { status: 401 })
  }

  let body: Record<string, any>
  try {
    body = JSON.parse(rawBody)
  } catch {
    await gravarDebug({ autenticou: true, modo_auth: modoAuth, resposta: '400 Invalid JSON' })
    return new Response('Invalid JSON', { status: 400 })
  }

  // ⚠️ A Kiwify manda `Customer` e `Product` com INICIAL MAIÚSCULA, e o nome do
  // produto vem em `product_name` (não `name`). Ler minúsculo devolvia undefined
  // e o webhook morria em "Missing customer email" mesmo autenticando certo.
  // Os fallbacks minúsculos ficam para o caso de mudarem o formato de novo.
  const cust = body.Customer ?? body.customer ?? {}
  const prod = body.Product ?? body.product ?? {}
  const sub  = body.Subscription ?? body.subscription ?? null

  const status      = (body.order_status ?? body.status ?? '').toLowerCase()
  const evento      = (body.webhook_event_type ?? '').toLowerCase()
  const email       = (cust.email ?? cust.Email ?? '').toLowerCase().trim() || undefined
  const nomeCliente = cust.full_name ?? cust.first_name ?? cust.name ?? ''
  const productName = prod.product_name ?? prod.name ?? body.product_name ?? ''

  Object.assign(debug, {
    status_lido: `${status || '(vazio)'} | evento=${evento || '(vazio)'}`,
    email_lido: email ?? '(ausente)',
    produto_lido: productName || '(ausente)',
  })

  if (!email) {
    await gravarDebug({ autenticou: true, modo_auth: modoAuth, resposta: '400 Missing customer email' })
    return new Response('Missing customer email', { status: 400 })
  }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: existingUser } = await admin
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  // Cancelamento / reembolso
  if (CANCELED_STATUSES.includes(status) || CANCELED_EVENTS.includes(evento)) {
    if (existingUser) {
      await admin.from('users').update({ plano_status: 'cancelado' }).eq('id', existingUser.id)
    }
    await gravarDebug({ autenticou: true, modo_auth: modoAuth, resposta: '200 canceled' })
    return new Response(JSON.stringify({ ok: true, action: 'canceled' }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Status não tratado (boleto gerado, pix aguardando, recusado…) — ignora sem erro.
  // Só ativa acesso com pagamento CONFIRMADO.
  if (!PAID_STATUSES.includes(status) && !PAID_EVENTS.includes(evento)) {
    await gravarDebug({ autenticou: true, modo_auth: modoAuth, resposta: `200 skip (status="${status}")` })
    return new Response(JSON.stringify({ ok: true, skip: status }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ── Pagamento confirmado ────────────────────────────────────
  const { plano, filhos_limite } = detectPlan(productName)
  // Na Kiwify a próxima cobrança vem em `next_payment`; os outros nomes ficam de
  // reserva. Se vier vazio ou inválido, calculamos pelo nome do produto.
  const plano_ativo_ate      = calcPlanoAtivo(productName, sub?.next_payment ?? sub?.current_period_end)
  const kiwify_subscriber_id = sub?.id ?? sub?.subscription_id ?? body.subscription_id ?? null
  const assinatura = { plano, plano_status: 'ativo', plano_ativo_ate, filhos_limite, kiwify_subscriber_id }

  // Caso 1 — já tem conta: só ativa o plano.
  if (existingUser) {
    await admin.from('users').update(assinatura).eq('id', existingUser.id)
    await gravarDebug({ autenticou: true, modo_auth: modoAuth, resposta: `200 updated (${plano})` })
    return new Response(JSON.stringify({ ok: true, action: 'updated', plano, email }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Caso 2 — ainda não tem conta: criamos por ele e mandamos o link de acesso.
  // Antes disso o cliente caía numa tela pedindo pra "criar conta" e, se usasse
  // outro e-mail, a assinatura ficava órfã. Criar a conta aqui elimina o passo.
  let authUserId: string | null = null
  const { data: criado, error: erroCriar } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    password: crypto.randomUUID() + crypto.randomUUID(), // descartada: ele define a dele pelo link
    user_metadata: { nome: nomeCliente, origem: 'kiwify' },
  })

  if (criado?.user) {
    authUserId = criado.user.id
  } else {
    // Pode existir em auth.users sem linha em `users` (cadastro interrompido no meio).
    // Nesse caso reaproveitamos o id em vez de falhar.
    const { data: lista } = await admin.auth.admin.listUsers()
    authUserId = lista?.users?.find((u: any) => u.email?.toLowerCase() === email)?.id ?? null
    if (!authUserId) console.error('[kiwify-webhook] não foi possível criar/achar auth user:', erroCriar)
  }

  if (!authUserId) {
    // Último recurso: guarda como pendente pra ativar quando ele se cadastrar sozinho.
    await admin.from('pending_subscriptions').upsert(
      { email, plano, plano_ativo_ate, filhos_limite, kiwify_subscriber_id },
      { onConflict: 'email' },
    )
    await gravarDebug({ autenticou: true, modo_auth: modoAuth, resposta: '200 pending_fallback (nao criou conta)' })
    return new Response(JSON.stringify({ ok: true, action: 'pending_fallback', email }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  await admin.from('users').upsert({
    id: authUserId,
    email,
    nome: nomeCliente || email.split('@')[0],
    tipo: 'pai',
    ...assinatura,
  })

  // Link que leva direto pra tela de criar senha, já autenticado.
  const { data: linkData, error: erroLink } = await admin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo: `${APP_URL}/nova-senha?novo=1` },
  })

  const link = linkData?.properties?.action_link
  let emailEnviado = false
  let viaFallback = false
  if (link) {
    emailEnviado = await enviarEmailAcesso(email, nomeCliente, plano, link)
  } else {
    console.error('[kiwify-webhook] generateLink falhou:', erroLink)
  }

  // Rede de segurança: se o Resend recusar (domínio não verificado, chave inválida,
  // conta suspensa), quem PAGOU ficaria sem nenhuma forma de saber que a conta
  // existe. Aqui pedimos ao próprio Supabase que envie o e-mail de definição de
  // senha — texto mais simples, mas entrega o acesso.
  // ⚠️ O envio nativo do Supabase é limitado por hora; ele é reserva, não o
  // caminho principal. Assim que o MX do Resend existir, o principal volta a valer.
  if (!emailEnviado) {
    try {
      const r = await fetch(
        `${Deno.env.get('SUPABASE_URL')}/auth/v1/recover?redirect_to=${encodeURIComponent(APP_URL + '/nova-senha?novo=1')}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: Deno.env.get('SUPABASE_ANON_KEY')!,
          },
          body: JSON.stringify({ email }),
        },
      )
      viaFallback = r.ok
      if (!r.ok) console.error('[kiwify-webhook] fallback de e-mail falhou:', r.status, await r.text())
    } catch (e) {
      console.error('[kiwify-webhook] fallback de e-mail lançou erro:', e)
    }
  }

  // A conta e o plano já estão gravados mesmo se o e-mail falhar — nesse caso o
  // cliente ainda entra por "Esqueci minha senha" com o mesmo e-mail.
  await gravarDebug({
    autenticou: true, modo_auth: modoAuth,
    resposta: `200 created (${plano}, resend=${emailEnviado}, fallback=${viaFallback})`,
  })
  return new Response(JSON.stringify({ ok: true, action: 'created', plano, email, emailEnviado, viaFallback }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
