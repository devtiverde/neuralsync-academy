import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!

const faixaPrompt: Record<string, string> = {
  exploradores: 'crianças de 3 a 5 anos, usando linguagem muito simples, palavras fáceis e emojis',
  construtores:  'crianças de 6 a 8 anos, com linguagem clara, divertida e educativa',
  criadores:     'crianças de 9 a 11 anos, com linguagem elaborada e curiosidades inteligentes',
  inventores:    'jovens de 12 anos ou mais, com linguagem técnica adequada e desafios reais',
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

async function callAnthropic(prompt: string, maxTokens: number): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  const data = await res.json()
  return data.content[0].text
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  // Verifica autenticação
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return new Response('Unauthorized', { status: 401, headers: cors })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401, headers: cors })

  // Rate limit: 30 chamadas por usuário por dia
  const hoje = new Date().toISOString().slice(0, 10)
  const { data: uso, error: erroUso } = await supabase
    .from('ns_ai_usage')
    .select('calls')
    .eq('user_id', user.id)
    .eq('date', hoje)
    .single()

  if (!erroUso && uso && uso.calls >= 30) {
    return new Response(
      JSON.stringify({ error: 'Limite diário de 30 atividades com IA atingido. Volte amanhã! 🤖' }),
      { status: 429, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }

  // Incrementa contador (upsert)
  await supabase.from('ns_ai_usage').upsert({
    user_id: user.id,
    date: hoje,
    calls: (uso?.calls ?? 0) + 1,
  }, { onConflict: 'user_id,date' })

  const { action, tema, ideia, faixa } = await req.json()
  const desc = faixaPrompt[faixa] ?? faixaPrompt.construtores

  let raw: string

  if (action === 'quiz') {
    raw = await callAnthropic(
      `Gere 5 perguntas de quiz educativo para ${desc} sobre o tema "${tema}" em português brasileiro.

Responda APENAS com JSON válido neste formato exato:
{"perguntas":[{"pergunta":"Pergunta aqui?","opcoes":["Opção A","Opção B","Opção C","Opção D"],"correta":0,"fato":"Um fato curioso e educativo sobre a resposta correta."}]}

Regras: "correta" é índice 0-3. Use emojis nas opções e fatos. Perguntas educativas e divertidas. Fatos surpreendentes e instrutivos.`,
      1600
    )
  } else if (action === 'inventor') {
    raw = await callAnthropic(
      `Avalie esta ideia de invenção de uma criança (${desc}) de forma encorajadora e educativa:

Ideia: "${ideia}"

Responda APENAS com JSON válido neste formato exato:
{"titulo":"Nome criativo para a invenção","resumo":"Resumo positivo em 1-2 frases.","pontuacao":{"criatividade":85,"utilidade":70,"viabilidade":60},"pontos_fortes":["Ponto forte 1","Ponto forte 2","Ponto forte 3"],"sugestoes":["Sugestão de melhoria 1","Sugestão 2"],"inspiracao":"Um inventor famoso ou tecnologia real relacionada à ideia.","xp_bonus":120}

Regras: sempre positivo e encorajador. Pontuações 0-100. xp_bonus entre 80 e 200. Use linguagem adequada para crianças.`,
      1200
    )
  } else {
    return new Response('Invalid action', { status: 400, headers: cors })
  }

  const match = raw.match(/\{[\s\S]*\}/)
  if (!match) return new Response('Invalid AI response', { status: 500, headers: cors })

  return new Response(match[0], {
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
})
