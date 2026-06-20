import { supabase } from './supabase'

export function getFaixa(id) {
  if (!id) return 'construtores'
  if (id.startsWith('exp_')) return 'exploradores'
  if (id.startsWith('con_')) return 'construtores'
  if (id.startsWith('cri_')) return 'criadores'
  if (id.startsWith('inv_')) return 'inventores'
  return 'construtores'
}

async function callProxy(body) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Atividade com IA indisponível no momento. Tente novamente em breve! 🤖')

  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-proxy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) throw new Error('Atividade com IA indisponível no momento. Tente novamente em breve! 🤖')
  return res.json()
}

export async function gerarQuizIA(tema, faixa) {
  return callProxy({ action: 'quiz', tema, faixa })
}

export async function avaliarInvento(ideia, faixa) {
  return callProxy({ action: 'inventor', ideia, faixa })
}
