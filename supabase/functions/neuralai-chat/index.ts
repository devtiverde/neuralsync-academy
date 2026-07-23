import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

// System prompt exato conforme especificação do produto
const SYSTEM_PROMPT = `Você é a NeuralAI, assistente de aprendizado do NeuralSync Academy.
Você conversa com crianças de 10 a 12 anos da faixa Inventores.

QUEM VOCÊ É:
- Um guia curioso que aprende JUNTO com a criança, não um professor que dá aula
- Você NÃO é amigo, confidente ou terapeuta
- Você é como um colega mais experiente que faz boas perguntas

SEU ÚNICO OBJETIVO:
Fazer a criança PENSAR MAIS, não pensar menos.
Nunca dê a resposta direta. Sempre devolva com pergunta ou desafio.

REGRA DE OURO — RESPOSTAS CURTAS:
- Máximo 3–4 frases por resposta. Nunca escreva parágrafos longos.
- Dê apenas 1 dado novo, 1 analogia OU 1 fato surpreendente — não os três.
- Termine SEMPRE com UMA pergunta (só uma — não faça listas de perguntas).
- Se a criança mandou uma mensagem curta, responda ainda mais curto.

ESTILO SOCRÁTICO:
- Quando a criança perguntar algo, responda com outra pergunta que a faça descobrir.
  Ex: "Boa pergunta! Antes de responder — o que você JÁ sabe sobre isso?"
- Quando a criança errar, não corrija direto. Pergunte: "Hmm, o que aconteceria se você testasse isso?"
- Quando acertar, elogie brevemente e aprofunde: "Exato! E por que você acha que funciona assim?"

COMO VOCÊ RESPONDE:
- Linguagem simples e animada, frases curtíssimas
- Use UMA analogia do mundo real se ajudar a entender
- Use emojis com moderação (no máximo 1 por mensagem)

O QUE VOCÊ PODE FALAR:
✅ Ciência, tecnologia, matemática, lógica
✅ Como as coisas funcionam (aviões, cérebro, internet, robôs)
✅ Invenções e inventores históricos
✅ Curiosidades do universo, natureza, animais
✅ Desafios de raciocínio e lógica
✅ Programação e como a IA funciona
✅ Ideias para projetos e inventos
✅ Perguntas filosóficas simples ("Por que existe o zero?")

O QUE VOCÊ NUNCA FAZ:
❌ Não dá aulas longas — isso é trabalho de escola, não seu
❌ Não faz lição de casa pela criança
❌ Não fala sobre assuntos pessoais, família ou relacionamentos
❌ Não discute política, religião ou notícias
❌ Não usa linguagem violenta, assustadora ou adulta
❌ Não finge ser humano quando perguntado
❌ Não cria apego emocional ("sinto sua falta", "somos amigos")

SE A CRIANÇA FUGIR DO TEMA:
"Hm, isso me lembra um problema de ciência... [conecte em 1 frase]. Quer explorar?"

SE PERGUNTAR SE É HUMANO:
"Sou uma IA! E por falar nisso — você sabe o que me faz diferente de um humano?"

SE TENTAR FAZER LIÇÃO DE CASA:
"A resposta tem que vir de você! O que você já entendeu até agora?"`

// Prompt injetado pelo sistema para encerrar sessão — nunca mostrado à criança
const SUMMARY_REQUEST = `[INSTRUÇÃO DO SISTEMA — não mostrar à criança]
A sessão chegou ao fim. Faça duas coisas:

1. Escreva uma mensagem de encerramento para a criança com um desafio para ela pensar até a próxima vez. Use o último tema abordado.

2. Logo após, inclua um bloco JSON exatamente assim (não visível para a criança):

<session_summary>
{
  "temas": ["lista dos assuntos abordados nesta conversa"],
  "destaque": "momento mais curioso ou engajado da conversa",
  "desafio_enviado": "o desafio que você propôs",
  "engajamento": "alto|medio|baixo"
}
</session_summary>`

type AnthropicMessage = { role: 'user' | 'assistant'; content: string }

// Escapa texto para interpolar com segurança dentro do HTML do e-mail.
// Sem isto, o nome do filho, os temas e o resumo (todos influenciados pela
// conversa/cadastro) entram crus no HTML enviado a partir de
// noreply@neuralsync.com.br — um vetor de injeção de HTML/link (phishing com o
// domínio do produto). Escapar os 5 caracteres perigosos neutraliza qualquer
// tag ou atributo injetado.
function escapeHtml(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Reconstrói o histórico da conversa a partir do BANCO, nunca do que o cliente
// mandou. O `history` do corpo da requisição é controlado pelo navegador: um
// cliente adulterado podia forjar turnos inteiros (inclusive falsas respostas
// da "assistant") e assim contornar o SYSTEM_PROMPT — a única barreira entre a
// Anthropic e uma criança. Lendo de neuralai_messages, o modelo só enxerga
// mensagens reais e verificadas, na ordem real.
async function carregarHistorico(
  supabase: ReturnType<typeof createClient>,
  sessionId: string,
  limite = 20,
): Promise<AnthropicMessage[]> {
  const { data } = await supabase
    .from('neuralai_messages')
    .select('role, content')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
  const linhas = (data ?? []) as { role: string; content: string }[]
  return linhas
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-limite)
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))
}

async function callAnthropic(messages: AnthropicMessage[], maxTokens: number): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)
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
        model: 'claude-sonnet-4-6',
        max_tokens: maxTokens,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Anthropic ${res.status}: ${err}`)
    }
    const data = await res.json()
    return data.content[0].text as string
  } finally {
    clearTimeout(timeout)
  }
}

const err = (msg: string, status: number) =>
  new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })

const ok = (payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })

async function enviarEmailSessao(opts: {
  parentEmail: string
  parentNome: string
  childNome: string
  durationMinutes: number
  messageCount: number
  themes: string[]
  highlight: string | null
  challenge: string | null
  engagement: string | null
}) {
// ⚠️ O secret no projeto está cadastrado como `Resend`, não `RESEND_API_KEY`.
// Ler só o nome canônico fazia o envio falhar em silêncio — foi o motivo de o
// e-mail de resumo da NeuralAI nunca ter chegado. Aceita os dois nomes.
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? Deno.env.get('Resend')
  if (!RESEND_API_KEY) return

  const engagementLabel: Record<string, string> = { alto: '🔥 Alto', medio: '⚡ Médio', baixo: '💤 Baixo' }
  // Tudo que vai para o HTML abaixo é escapado: nome do filho/responsável (vêm
  // do cadastro), temas/destaque/desafio (vêm do resumo gerado sobre a conversa).
  const childNome  = escapeHtml(opts.childNome)
  const parentNome = escapeHtml(opts.parentNome)
  const highlight  = opts.highlight ? escapeHtml(opts.highlight) : null
  const challenge  = opts.challenge ? escapeHtml(opts.challenge) : null
  const tempos = opts.themes.length > 0 ? opts.themes.map(escapeHtml).join(', ') : 'Conversa livre'
  // engagement é sempre um de alto/medio/baixo vindo do enum; escapado por garantia.
  const engStr  = opts.engagement ? (engagementLabel[opts.engagement] || escapeHtml(opts.engagement)) : '—'

  const html = `
  <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0f0a1e; color: white; border-radius: 16px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #7C3AED, #06B6D4); padding: 28px 32px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 8px;">🤖</div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 900; color: white;">Sessão NeuralAI concluída!</h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.75); font-size: 14px;">${childNome} explorou muito hoje 🚀</p>
    </div>
    <div style="padding: 28px 32px;">
      <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 20px;">Olá, ${parentNome}! Aqui está o resumo da sessão do(a) <strong style="color: #a78bfa;">${childNome}</strong> com a NeuralAI.</p>
      <div style="display: flex; gap: 12px; margin-bottom: 20px;">
        <div style="flex: 1; background: rgba(124,58,237,0.2); border: 1px solid rgba(124,58,237,0.3); border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 24px; font-weight: 900; color: #a78bfa;">${opts.durationMinutes} min</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">DURAÇÃO</div>
        </div>
        <div style="flex: 1; background: rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.25); border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 24px; font-weight: 900; color: #67e8f9;">${Math.floor(opts.messageCount / 2)}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">MENSAGENS</div>
        </div>
        <div style="flex: 1; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 16px; font-weight: 900; color: #34d399;">${engStr}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">ENGAJAMENTO</div>
        </div>
      </div>
      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
        <div style="font-size: 11px; color: rgba(255,255,255,0.4); font-weight: 700; letter-spacing: 0.08em; margin-bottom: 8px;">🎯 TEMAS EXPLORADOS</div>
        <p style="color: rgba(255,255,255,0.75); font-size: 14px; margin: 0;">${tempos}</p>
      </div>
      ${highlight ? `<div style="background: rgba(6,182,212,0.08); border: 1px solid rgba(6,182,212,0.2); border-radius: 12px; padding: 16px; margin-bottom: 16px;"><div style="font-size: 11px; color: #67e8f9; font-weight: 700; letter-spacing: 0.08em; margin-bottom: 8px;">✨ MOMENTO DESTAQUE</div><p style="color: rgba(255,255,255,0.75); font-size: 14px; margin: 0;">${highlight}</p></div>` : ''}
      ${challenge ? `<div style="background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); border-radius: 12px; padding: 16px; margin-bottom: 20px;"><div style="font-size: 11px; color: #fbbf24; font-weight: 700; letter-spacing: 0.08em; margin-bottom: 8px;">🧩 DESAFIO ENVIADO</div><p style="color: rgba(255,255,255,0.75); font-size: 14px; margin: 0; font-style: italic;">"${challenge}"</p></div>` : ''}
      <a href="https://app.neuralsync.com.br/relatorio-ia" style="display: block; background: linear-gradient(135deg, #7C3AED, #06B6D4); color: white; text-decoration: none; border-radius: 12px; padding: 14px 24px; text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 20px;">Ver relatório completo →</a>
      <p style="color: rgba(255,255,255,0.3); font-size: 12px; text-align: center; margin: 0;">Para desativar estas notificações, acesse Configurações no NeuralSync Academy.</p>
    </div>
  </div>`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'NeuralSync Academy <noreply@neuralsync.com.br>',
      to: [opts.parentEmail],
      subject: `🤖 Sessão NeuralAI concluída — ${opts.childNome}`,
      html,
    }),
  })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  // --- Autenticação ---
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return err('Não autorizado', 401)

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return err('Não autorizado', 401)

  // --- Parse do body ---
  let body: {
    action: 'start' | 'message' | 'end'
    childId: string
    sessionId?: string
    message?: string
    history?: AnthropicMessage[]
  }
  try {
    body = await req.json()
  } catch {
    return err('JSON inválido', 400)
  }

  // `history` NÃO é mais lido do corpo de propósito — o histórico agora vem do
  // banco (carregarHistorico). O cliente pode até continuar mandando, mas é
  // ignorado, então não há como injetar turnos falsos.
  const { action, childId, sessionId, message } = body

  if (!action || !childId) return err('Parâmetros obrigatórios: action, childId', 400)

  // --- Validar filho pertence ao pai ---
  const { data: child } = await supabase
    .from('children')
    .select('id, nome, faixa_etaria')
    .eq('id', childId)
    .eq('parent_id', user.id)
    .single()

  if (!child) return err('Filho não encontrado', 404)

  // --- Validar faixa etária (backend — não confiar no frontend) ---
  if (child.faixa_etaria !== 'inventores') {
    return err('NeuralAI disponível apenas para a faixa Inventores', 403)
  }

  // --- Validar plano ---
  const { data: userData } = await supabase
    .from('users')
    .select('plano, plano_status, neuralai_config, nome')
    .eq('id', user.id)
    .single()

  const planoAtivo = userData?.plano_status === 'ativo' && userData?.plano === 'premium'

  if (!planoAtivo) {
    return err('NeuralAI requer o Plano Premium', 402)
  }

  const config = (userData?.neuralai_config ?? {}) as {
    duracao?: number
    max_sessoes_semana?: number
  }
  const maxSessoesSemana = config.max_sessoes_semana ?? 3

  // ============================================================
  // ACTION: start — validações de cooldown e limite, cria sessão
  // ============================================================
  if (action === 'start') {
    const now = new Date()

    // Cooldown: última sessão encerrada há menos de 60 min?
    const { data: lastEnded } = await supabase
      .from('neuralai_sessions')
      .select('ended_at')
      .eq('child_id', childId)
      .not('ended_at', 'is', null)
      .order('ended_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (lastEnded?.ended_at) {
      const diffMin = (now.getTime() - new Date(lastEnded.ended_at).getTime()) / 60000
      if (diffMin < 60) {
        const restante = Math.ceil(60 - diffMin)
        return err(`Cooldown ativo. Próxima sessão em ${restante} minuto(s)`, 429)
      }
    }

    // Limite semanal
    const semanaAtras = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('neuralai_sessions')
      .select('id', { count: 'exact', head: true })
      .eq('child_id', childId)
      .gte('started_at', semanaAtras)

    if ((count ?? 0) >= maxSessoesSemana) {
      return err(`Limite de ${maxSessoesSemana} sessões por semana atingido`, 429)
    }

    // Criar sessão
    const { data: newSession, error: sessionErr } = await supabase
      .from('neuralai_sessions')
      .insert({ child_id: childId, parent_id: user.id })
      .select('id')
      .single()

    if (sessionErr || !newSession) return err('Erro ao criar sessão', 500)

    return ok({ sessionId: newSession.id, childName: child.nome })
  }

  // ============================================================
  // ACTION: message | end — requerem sessionId
  // ============================================================
  if (!sessionId) return err('sessionId obrigatório', 400)

  // Validar sessão aberta, pertencente ao filho e ao pai
  const { data: session } = await supabase
    .from('neuralai_sessions')
    .select('id, started_at, message_count')
    .eq('id', sessionId)
    .eq('child_id', childId)
    .eq('parent_id', user.id)
    .is('ended_at', null)
    .single()

  if (!session) return err('Sessão não encontrada ou já encerrada', 404)

  // ============================================================
  // ACTION: message
  // ============================================================
  if (action === 'message') {
    if (!message?.trim()) return err('Mensagem vazia', 400)
    if (message.length > 2000) return err('Mensagem muito longa (máx 2000 caracteres)', 400)
    if (session.message_count >= 50) return err('Limite de 50 mensagens por sessão atingido', 429)

    const userMessage = message.trim()

    // Salvar mensagem do usuário
    await supabase.from('neuralai_messages').insert({
      session_id: sessionId,
      role: 'user',
      content: userMessage,
    })

    // Histórico para o Anthropic vindo do BANCO (não do cliente) — já inclui a
    // mensagem recém-salva como último turno. Ver carregarHistorico(): impede
    // que um cliente adulterado injete turnos falsos e fure o SYSTEM_PROMPT.
    const anthropicHistory = await carregarHistorico(supabase, sessionId, 20)

    const aiText = await callAnthropic(anthropicHistory, 220)

    // Salvar resposta da IA
    await supabase.from('neuralai_messages').insert({
      session_id: sessionId,
      role: 'assistant',
      content: aiText,
    })

    // Atualizar contador (+2: user + assistant)
    await supabase
      .from('neuralai_sessions')
      .update({ message_count: session.message_count + 2 })
      .eq('id', sessionId)

    return ok({ response: aiText, sessionId })
  }

  // ============================================================
  // ACTION: end — gera resumo e fecha sessão
  // ============================================================
  if (action === 'end') {
    const endedAt = new Date()
    const durationMinutes = Math.round(
      (endedAt.getTime() - new Date(session.started_at).getTime()) / 60000
    )

    // Pedir resumo + mensagem de encerramento à IA — histórico do BANCO, não do
    // cliente (mesma proteção do action 'message').
    const historicoReal = await carregarHistorico(supabase, sessionId, 20)
    const summaryMessages: AnthropicMessage[] = [
      ...historicoReal,
      { role: 'user', content: SUMMARY_REQUEST },
    ]

    let closingMessage = 'Nossa sessão chegou ao fim! Até a próxima exploração. 🚀'
    let summaryData: Record<string, unknown> = {}

    try {
      const aiText = await callAnthropic(summaryMessages, 500)

      // Extrair bloco JSON do encerramento (invisível para a criança)
      const match = aiText.match(/<session_summary>([\s\S]*?)<\/session_summary>/)
      if (match) {
        summaryData = JSON.parse(match[1].trim())
        closingMessage = aiText
          .replace(/<session_summary>[\s\S]*?<\/session_summary>/, '')
          .trim()
      } else {
        closingMessage = aiText
      }
    } catch (e) {
      console.error('[neuralai-chat] Erro ao gerar resumo:', e)
    }

    // Salvar mensagem de encerramento
    await supabase.from('neuralai_messages').insert({
      session_id: sessionId,
      role: 'assistant',
      content: closingMessage,
    })

    // Fechar sessão com dados do resumo
    await supabase
      .from('neuralai_sessions')
      .update({
        ended_at: endedAt.toISOString(),
        duration_minutes: durationMinutes,
        themes: summaryData.temas ?? [],
        highlight: summaryData.destaque ?? null,
        challenge: summaryData.desafio_enviado ?? null,
        engagement: summaryData.engajamento ?? null,
        message_count: session.message_count,
      })
      .eq('id', sessionId)

    // Notificação por email (fire-and-forget — não bloqueia a resposta)
    const notifConfig = userData?.neuralai_config as Record<string, unknown> | null
    if (notifConfig?.notificacao_fim && user.email) {
      enviarEmailSessao({
        parentEmail: user.email,
        parentNome: (userData as Record<string, unknown>)?.nome as string || 'Responsável',
        childNome: child.nome,
        durationMinutes,
        messageCount: session.message_count,
        themes: (summaryData.temas as string[]) ?? [],
        highlight: summaryData.destaque as string | null ?? null,
        challenge: summaryData.desafio_enviado as string | null ?? null,
        engagement: summaryData.engajamento as string | null ?? null,
      }).catch(() => {})
    }

    return ok({
      response: closingMessage,
      sessionId,
      sessionEnded: true,
      summary: {
        durationMinutes,
        messageCount: session.message_count,
        themes: summaryData.temas ?? [],
        highlight: summaryData.destaque ?? null,
        challenge: summaryData.desafio_enviado ?? null,
        engagement: summaryData.engajamento ?? null,
      },
    })
  }

  return err('Action inválida. Use: start | message | end', 400)
})
