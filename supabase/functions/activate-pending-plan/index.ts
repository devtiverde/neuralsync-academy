import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: cors })

  // Email e user_id vêm do token JWT validado, nunca de campos enviados pelo
  // cliente — senão qualquer um poderia forjar o email de outra pessoa e
  // roubar o plano pago dela.
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return new Response('Unauthorized', { status: 401, headers: cors })

  const authed = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )
  const { data: { user } } = await authed.auth.getUser()
  if (!user?.email) return new Response('Unauthorized', { status: 401, headers: cors })

  const email = user.email.toLowerCase()

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Só o service_role enxerga pending_subscriptions (RLS não tem policy pública
  // de propósito) — por isso essa checagem precisa ser feita aqui, não no cliente.
  const { data: pending } = await admin
    .from('pending_subscriptions')
    .select('*')
    .eq('email', email)
    .maybeSingle()

  if (!pending) {
    return new Response(JSON.stringify({ activated: false }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }

  await admin
    .from('users')
    .update({
      plano: pending.plano,
      plano_status: 'ativo',
      plano_ativo_ate: pending.plano_ativo_ate,
      filhos_limite: pending.filhos_limite,
      kiwify_subscriber_id: pending.kiwify_subscriber_id,
    })
    .eq('id', user.id)

  await admin.from('pending_subscriptions').delete().eq('email', email)

  return new Response(JSON.stringify({ activated: true, plano: pending.plano }), {
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
})
