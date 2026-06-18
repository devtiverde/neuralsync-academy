import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

const faixaPrompt = {
  exploradores: 'crianças de 3 a 5 anos, usando linguagem muito simples, palavras fáceis e emojis',
  construtores: 'crianças de 6 a 8 anos, com linguagem clara, divertida e educativa',
  criadores:    'crianças de 9 a 11 anos, com linguagem elaborada e curiosidades inteligentes',
  inventores:   'jovens de 12 anos ou mais, com linguagem técnica adequada e desafios reais',
}

export function getFaixa(id) {
  if (!id) return 'construtores'
  if (id.startsWith('exp_')) return 'exploradores'
  if (id.startsWith('con_')) return 'construtores'
  if (id.startsWith('cri_')) return 'criadores'
  if (id.startsWith('inv_')) return 'inventores'
  return 'construtores'
}

export async function gerarQuizIA(tema, faixa) {
  if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
    throw new Error('Atividade com IA indisponível no momento. Tente novamente em breve! 🤖')
  }
  const desc = faixaPrompt[faixa] || faixaPrompt.construtores

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1600,
    messages: [{
      role: 'user',
      content: `Gere 5 perguntas de quiz educativo para ${desc} sobre o tema "${tema}" em português brasileiro.

Responda APENAS com JSON válido neste formato exato:
{"perguntas":[{"pergunta":"Pergunta aqui?","opcoes":["Opção A","Opção B","Opção C","Opção D"],"correta":0,"fato":"Um fato curioso e educativo sobre a resposta correta."}]}

Regras: "correta" é índice 0-3. Use emojis nas opções e fatos. Perguntas educativas e divertidas. Fatos surpreendentes e instrutivos.`,
    }],
  })

  const txt = msg.content[0].text
  const m = txt.match(/\{[\s\S]*\}/)
  if (!m) throw new Error('JSON inválido da API')
  return JSON.parse(m[0])
}

export async function avaliarInvento(ideia, faixa) {
  if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
    throw new Error('Atividade com IA indisponível no momento. Tente novamente em breve! 🤖')
  }
  const desc = faixaPrompt[faixa] || faixaPrompt.construtores

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1200,
    messages: [{
      role: 'user',
      content: `Avalie esta ideia de invenção de uma criança (${desc}) de forma encorajadora e educativa:

Ideia: "${ideia}"

Responda APENAS com JSON válido neste formato exato:
{"titulo":"Nome criativo para a invenção","resumo":"Resumo positivo em 1-2 frases.","pontuacao":{"criatividade":85,"utilidade":70,"viabilidade":60},"pontos_fortes":["Ponto forte 1","Ponto forte 2","Ponto forte 3"],"sugestoes":["Sugestão de melhoria 1","Sugestão 2"],"inspiracao":"Um inventor famoso ou tecnologia real relacionada à ideia.","xp_bonus":120}

Regras: sempre positivo e encorajador. Pontuações 0-100. xp_bonus entre 80 e 200 baseado na criatividade. Use linguagem adequada para crianças. Mencione cientistas/inventores reais quando possível.`,
    }],
  })

  const txt = msg.content[0].text
  const m = txt.match(/\{[\s\S]*\}/)
  if (!m) throw new Error('JSON inválido da API')
  return JSON.parse(m[0])
}
