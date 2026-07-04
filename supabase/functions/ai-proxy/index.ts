import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!

const faixaPrompt: Record<string, string> = {
  exploradores: 'crianças de 4 a 5 anos, usando linguagem muito simples, palavras fáceis e emojis',
  construtores:  'crianças de 6 a 8 anos, com linguagem clara, divertida e educativa',
  criadores:     'crianças de 9 a 11 anos, com linguagem elaborada e curiosidades inteligentes',
  inventores:    'jovens de 12 anos ou mais, com linguagem técnica adequada e desafios reais',
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

async function callAnthropic(prompt: string, maxTokens: number): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 25000)
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
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
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Anthropic ${res.status}: ${errText.slice(0, 300)}`)
    }
    const data = await res.json()
    return data.content[0].text
  } finally {
    clearTimeout(timer)
  }
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

  // Validar plano Premium
  const { data: userData } = await supabase.from('users').select('plano, plano_status').eq('id', user.id).single()
  if (!(userData?.plano_status === 'ativo' && userData?.plano === 'premium')) {
    return new Response(
      JSON.stringify({ error: 'Atividades com IA disponíveis apenas no Plano Premium.' }),
      { status: 403, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }

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

  const { action, tema, ideia, faixa, child_name, sessions } = await req.json()

  if (action === 'inventor' && ideia && ideia.length > 1000) {
    return new Response(
      JSON.stringify({ error: 'Texto muito longo. Máximo de 1000 caracteres.' }),
      { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }
  if (action === 'quiz' && tema && tema.length > 200) {
    return new Response(
      JSON.stringify({ error: 'Tema inválido.' }),
      { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }

  // Análise IA do relatório — ação exclusiva dos pais, sem consumir cota de atividades
  if (action === 'relatorio') {
    if (!child_name || !Array.isArray(sessions) || sessions.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Dados insuficientes para análise.' }),
        { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    const faixaLabel: Record<string, string> = {
      exploradores: 'Exploradores (3–5 anos)',
      construtores:  'Construtores (6–8 anos)',
      criadores:     'Criadores (9–11 anos)',
      inventores:    'Inventores (12+ anos)',
    }

    // Usa no máximo as 15 sessões mais recentes para não estourar tokens
    const recentSessions = sessions.slice(0, 15)
    const sessionsText = recentSessions.map((s: Record<string, unknown>, i: number) => {
      const themes = Array.isArray(s.themes) ? (s.themes as string[]).join(', ') : '—'
      return `Sessão ${i + 1}: temas=[${themes}] | engajamento=${s.engagement ?? '?'} | duração=${s.duration_minutes ?? '?'}min | mensagens=${s.message_count ?? '?'} | destaque="${s.highlight ?? ''}" | desafio="${s.challenge ?? ''}"`
    }).join('\n')

    const prompt = `Você é um especialista em desenvolvimento cognitivo infantil. Analise o histórico de uso da NeuralAI (assistente de IA educativa) por esta criança e gere um relatório para os pais.

Criança: ${child_name} | Faixa: ${faixaLabel[faixa] ?? faixa} | Total de sessões analisadas: ${recentSessions.length}

Histórico de sessões:
${sessionsText}

Responda APENAS com JSON válido neste formato exato:
{
  "resumo_geral": "2-3 frases descrevendo o perfil de curiosidade e aprendizado desta criança com base nas sessões",
  "areas_interesse": ["tema de interesse 1", "tema de interesse 2", "tema de interesse 3"],
  "habilidades_exercitadas": ["habilidade cognitiva 1", "habilidade cognitiva 2", "habilidade cognitiva 3"],
  "pontos_fortes": ["ponto forte observado 1", "ponto forte observado 2"],
  "recomendacoes": ["recomendação prática para os pais 1", "recomendação 2", "recomendação 3"],
  "nivel_engajamento_geral": "alto|medio|baixo",
  "frase_motivacional": "Uma frase curta de encorajamento personalizada para esta criança"
}

Use linguagem clara e acolhedora para pais. Seja específico com base nos temas e destaques reais das sessões.`

    let raw: string
    try {
      raw = await callAnthropic(prompt, 1000)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erro ao gerar análise'
      return new Response(
        JSON.stringify({ error: msg }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) return new Response('Invalid AI response', { status: 500, headers: cors })

    return new Response(match[0], {
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }

  const desc = faixaPrompt[faixa] ?? faixaPrompt.construtores

  let raw: string

  try {
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
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Erro ao gerar conteúdo com IA'
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }

  const match = raw.match(/\{[\s\S]*\}/)
  if (!match) return new Response('Invalid AI response', { status: 500, headers: cors })

  return new Response(match[0], {
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
})
