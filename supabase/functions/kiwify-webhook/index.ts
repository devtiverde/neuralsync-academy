import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const PAID_STATUSES     = ['paid', 'complete', 'approved', 'active']
const CANCELED_STATUSES = ['refunded', 'chargeback', 'subscription_canceled', 'canceled', 'dispute']

function detectPlan(productName: string): { plano: string; filhos_limite: number } {
  const n = productName.toLowerCase()
  if (n.includes('premium')) return { plano: 'premium', filhos_limite: 999 }
  if (n.includes('famil'))   return { plano: 'familia', filhos_limite: 3 }
  return { plano: 'starter', filhos_limite: 1 }
}

function calcPlanoAtivo(productName: string, periodEnd?: string): string {
  if (periodEnd) return new Date(periodEnd).toISOString()
  const d = new Date()
  productName.toLowerCase().includes('anual')
    ? d.setFullYear(d.getFullYear() + 1)
    : d.setMonth(d.getMonth() + 1)
  return d.toISOString()
}

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  let body: Record<string, any>
  try { body = await req.json() } catch { return new Response('Invalid JSON', { status: 400 }) }

  // Token de segurança configurável no painel da Kiwify
  const token = Deno.env.get('KIWIFY_WEBHOOK_TOKEN')
  if (token && body.token !== token) return new Response('Unauthorized', { status: 401 })

  const status     = (body.order_status ?? body.status ?? '').toLowerCase()
  const email      = body.customer?.email?.toLowerCase()?.trim()
  const productName = body.product?.name ?? ''

  if (!email) return new Response('Missing customer email', { status: 400 })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  // Cancelamento / reembolso
  if (CANCELED_STATUSES.includes(status)) {
    if (existingUser) {
      await supabase
        .from('users')
        .update({ plano_status: 'cancelado' })
        .eq('id', existingUser.id)
    }
    return new Response(JSON.stringify({ ok: true, action: 'canceled' }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Status não tratado — ignora sem erro
  if (!PAID_STATUSES.includes(status)) {
    return new Response(JSON.stringify({ ok: true, skip: status }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Pagamento confirmado
  const { plano, filhos_limite } = detectPlan(productName)
  const plano_ativo_ate          = calcPlanoAtivo(productName, body.subscription?.current_period_end)
  const kiwify_subscriber_id     = body.subscription?.id ?? null

  if (existingUser) {
    // Usuário já cadastrado — atualiza assinatura direto
    await supabase
      .from('users')
      .update({ plano, plano_status: 'ativo', plano_ativo_ate, filhos_limite, kiwify_subscriber_id })
      .eq('id', existingUser.id)
  } else {
    // Usuário ainda não criou conta — salva em pending para ativar no cadastro
    await supabase
      .from('pending_subscriptions')
      .upsert(
        { email, plano, plano_ativo_ate, filhos_limite, kiwify_subscriber_id },
        { onConflict: 'email' }
      )
  }

  return new Response(JSON.stringify({ ok: true, plano, email }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
