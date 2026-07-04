export const NEURALAI_CONFIG = {
  minAge: 10,
  sessionDurations: [30, 60],
  maxSessionsPerWeek: 3,
  cooldownMinutes: 60,
  model: 'claude-sonnet-4-6',
  maxTokensPerMessage: 300,
  maxMessagesPerSession: 50,
}

export const NEURALAI_TEMAS_SUGERIDOS = [
  { id: 'universo',  emoji: '🔬', titulo: 'Como funciona o universo?'  },
  { id: 'ia',        emoji: '🤖', titulo: 'Como a IA pensa?'           },
  { id: 'invencao',  emoji: '💡', titulo: 'Invente algo novo'          },
  { id: 'logica',    emoji: '🧩', titulo: 'Desafio de lógica'         },
]
