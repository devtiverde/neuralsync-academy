const { createClient } = require('@supabase/supabase-js')

const PLANO_MAP = {
  starter: { plano: 'starter', filhos_limite: 1 },
  familia: { plano: 'familia', filhos_limite: 3 },
  família: { plano: 'familia', filhos_limite: 3 },
  premium: { plano: 'premium', filhos_limite: 999 },
}

function detectarPlano(productName) {
  if (!productName) return PLANO_MAP.familia
  const lower = productName.toLowerCase()
  if (lower.includes('starter')) return PLANO_MAP.starter
  if (lower.includes('premium')) return PLANO_MAP.premium
  if (lower.includes('famil')) return PLANO_MAP.familia
  return PLANO_MAP.familia
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  // Validação do token Kiwify
  const token = event.headers['kiwify-token'] || event.queryStringParameters?.token
  const expectedToken = process.env.KIWIFY_WEBHOOK_TOKEN
  if (expectedToken && token !== expectedToken) {
    return { statusCode: 401, body: 'Unauthorized' }
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { event: eventType, data } = body
  if (!data) return { statusCode: 200, body: 'No data' }

  const email = data.customer?.email?.toLowerCase()
  if (!email) return { statusCode: 200, body: 'No email' }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // Ativação de assinatura
  if (eventType === 'order.approved' || eventType === 'subscription.active') {
    const planoInfo = detectarPlano(data.product?.name)
    const planoAtivateAte = data.subscription?.current_period_end || null
    const kiwifyId = data.subscription?.id || data.id || null

    // Tenta encontrar usuário já cadastrado
    const { data: usuario } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (usuario) {
      await supabase.from('users').update({
        plano: planoInfo.plano,
        plano_status: 'ativo',
        plano_ativo_ate: planoAtivateAte,
        filhos_limite: planoInfo.filhos_limite,
        kiwify_subscriber_id: kiwifyId,
      }).eq('id', usuario.id)
    } else {
      // Usuário ainda não criou conta — salva como pendente
      await supabase.from('pending_subscriptions').upsert({
        email,
        plano: planoInfo.plano,
        filhos_limite: planoInfo.filhos_limite,
        kiwify_subscriber_id: kiwifyId,
        plano_ativo_ate: planoAtivateAte,
      }, { onConflict: 'email' })
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, plano: planoInfo.plano }) }
  }

  // Cancelamento ou inadimplência
  if (eventType === 'subscription.cancelled' || eventType === 'subscription.overdue') {
    await supabase.from('users').update({
      plano_status: 'cancelado',
    }).eq('email', email)

    return { statusCode: 200, body: JSON.stringify({ ok: true, status: 'cancelado' }) }
  }

  return { statusCode: 200, body: 'Event ignored' }
}
