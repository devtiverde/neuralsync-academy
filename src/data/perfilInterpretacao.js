// ============================================================
// Interpretação do Perfil Cognitivo
// Para cada pergunta (chave) e cada resposta (valor), um texto
// detalhado: título, descrição e uma dica prática para os pais.
// Usado na tela de resultado do questionário e na visão de perfil.
// ============================================================

export const dimensoes = [
  { titulo: 'Perfil de Aprendizado', emoji: '🧠', cor: '#7C3AED', chaves: ['estilo_aprendizado', 'persistencia'] },
  { titulo: 'Relação com Telas',     emoji: '📱', cor: '#F07A20', chaves: ['preocupacao_telas', 'regulacao_emocional'] },
  { titulo: 'Habilidades',           emoji: '🌟', cor: '#10b981', chaves: ['habilidade_prioridade', 'apoio_escola'] },
  { titulo: 'Rotina Familiar',       emoji: '🏠', cor: '#3b82f6', chaves: ['rotina', 'dedicacao_semanal'] },
]

export const rotulosChave = {
  estilo_aprendizado:   'Estilo de aprendizado',
  persistencia:         'Persistência',
  preocupacao_telas:    'Principal preocupação com telas',
  regulacao_emocional:  'Regulação emocional',
  habilidade_prioridade:'Habilidade prioritária',
  apoio_escola:         'Apoio escolar',
  rotina:               'Rotina de estudos',
  dedicacao_semanal:    'Dedicação semanal',
}

export const interpretacao = {
  estilo_aprendizado: {
    visual: {
      titulo: '👀 Aprende observando',
      descricao: 'Absorve melhor quando vê alguém fazer primeiro. Tem memória visual forte e se beneficia de demonstrações, vídeos e exemplos antes de tentar sozinho.',
      dica: 'Mostre o passo a passo antes de pedir para fazer. Use imagens, esquemas e vídeos curtos como apoio.',
    },
    cinestetico: {
      titulo: '🙌 Aprende fazendo',
      descricao: 'Aprende com as mãos, tentando e errando. Precisa de movimento e experimentação — ficar parado ouvindo cansa rápido.',
      dica: 'Priorize atividades práticas, jogos e desafios "mão na massa". Deixe experimentar antes de explicar.',
    },
    auditivo: {
      titulo: '👂 Aprende ouvindo',
      descricao: 'Entende melhor com explicações faladas, passo a passo. Gosta de conversar sobre o que aprende e de instruções claras em voz alta.',
      dica: 'Explique em voz alta, faça perguntas e peça que repita com as próprias palavras.',
    },
    leitura: {
      titulo: '📖 Aprende lendo e vendo',
      descricao: 'Se concentra bem com textos e imagens. Tem facilidade de seguir instruções escritas e gosta de ler para descobrir.',
      dica: 'Ofereça livros, legendas, listas e instruções escritas. Estimule a leitura como ferramenta de aprendizado.',
    },
  },
  persistencia: {
    baixa: {
      titulo: '😔 Desiste com facilidade',
      descricao: 'Tende a trocar de atividade quando encontra dificuldade. Precisa de desafios curtos e vitórias rápidas para construir confiança.',
      dica: 'Quebre tarefas em etapas pequenas e celebre cada conquista. Evite desafios longos demais no começo.',
    },
    media: {
      titulo: '😤 Tenta de novo, mas frustra',
      descricao: 'Insiste por um tempo, mas a frustração aparece. Está desenvolvendo tolerância ao erro — um ótimo momento para reforçar que errar faz parte.',
      dica: 'Valide o esforço ("você tentou!") mais do que o acerto. Mostre que errar é parte de aprender.',
    },
    social: {
      titulo: '🤝 Busca ajuda rápido',
      descricao: 'Pede ajuda assim que trava. É colaborativo, mas pode ganhar mais autonomia aprendendo a tentar um pouco antes de pedir.',
      dica: 'Antes de ajudar, pergunte "o que você já tentou?". Incentive uma tentativa antes do apoio.',
    },
    alta: {
      titulo: '🎯 Persiste até conseguir',
      descricao: 'Tem foco e determinação acima da média. Encara desafios difíceis sem desistir — um grande diferencial cognitivo.',
      dica: 'Ofereça desafios mais complexos para não desanimar com tarefas fáceis. Estimule projetos de prazo maior.',
    },
  },
  preocupacao_telas: {
    tempo: {
      titulo: '⏰ Tempo de tela',
      descricao: 'A maior preocupação é a quantidade de horas. O foco do plano será equilibrar o tempo com atividades enriquecedoras e offline.',
      dica: 'Use o Timer e a Agenda para criar limites claros e previsíveis de tela por dia.',
    },
    conteudo: {
      titulo: '🎯 Tipo de conteúdo',
      descricao: 'A preocupação é com o que é consumido, não só quanto. O caminho é direcionar para conteúdo educativo e curado.',
      dica: 'Use o catálogo Kids e a Trilha para substituir conteúdo passivo por conteúdo que ensina.',
    },
    social: {
      titulo: '🫂 Isolamento social',
      descricao: 'Há preocupação com o isolamento causado pelas telas. O foco será reforçar interação e atividades compartilhadas.',
      dica: 'Prefira atividades feitas junto e momentos de conversa sobre o que a criança aprendeu.',
    },
    fisico: {
      titulo: '🏃 Falta de atividade física',
      descricao: 'A tela está competindo com o movimento. O plano vai intercalar telas com pausas ativas e estímulo ao corpo.',
      dica: 'Combine cada sessão de tela com uma atividade física curta. Use a Agenda para reservar esse tempo.',
    },
  },
  regulacao_emocional: {
    alta: {
      titulo: '😊 Lida bem com limites',
      descricao: 'Aceita o fim do tempo de tela com tranquilidade. Tem boa regulação emocional — uma base excelente para construir hábitos saudáveis.',
      dica: 'Aproveite essa maturidade para dar pequenas responsabilidades sobre os próprios limites.',
    },
    media: {
      titulo: '🤔 Negocia o tempo',
      descricao: 'Pede "mais um pouco" mas costuma ceder. Está aprendendo a lidar com a frustração — combina bem com regras claras e combinadas antes.',
      dica: 'Combine o limite ANTES de começar e avise quando estiver perto do fim. Previsibilidade reduz o conflito.',
    },
    baixa: {
      titulo: '😤 Fica agitado ao parar',
      descricao: 'A transição para longe da tela gera irritação. É importante criar rituais de transição suaves, sem cortes bruscos.',
      dica: 'Dê avisos ("faltam 5 minutos") e ofereça uma atividade prazerosa logo após desligar a tela.',
    },
    muito_baixa: {
      titulo: '😭 Reage com intensidade',
      descricao: 'Parar a tela pode gerar choro ou crise. Vale priorizar a regulação emocional como habilidade central neste momento.',
      dica: 'Reduza o tempo gradualmente, mantenha rotina fixa e nomeie as emoções ("sei que é difícil parar"). Considere apoio profissional se for frequente.',
    },
  },
  habilidade_prioridade: {
    foco: {
      titulo: '🎯 Foco e atenção',
      descricao: 'A prioridade é desenvolver concentração. As atividades darão preferência a desafios que treinam atenção sustentada.',
      dica: 'Sessões curtas e sem distrações funcionam melhor. Aumente o tempo de foco aos poucos.',
    },
    criatividade: {
      titulo: '🎨 Criatividade',
      descricao: 'O objetivo é estimular a imaginação e a originalidade. A Trilha vai favorecer criação, invenção e resolução aberta de problemas.',
      dica: 'Valorize soluções diferentes e perguntas abertas ("e se fosse de outro jeito?").',
    },
    logica: {
      titulo: '🧩 Raciocínio lógico',
      descricao: 'O foco é o pensamento lógico e a resolução de problemas. As atividades enfatizarão padrões, sequências e estratégia.',
      dica: 'Jogos de lógica, quebra-cabeças e desafios de programação são ótimos aliados.',
    },
    emocional: {
      titulo: '💛 Inteligência emocional',
      descricao: 'A prioridade é reconhecer e lidar com emoções. O plano incluirá nomear sentimentos e desenvolver empatia.',
      dica: 'Converse sobre emoções no dia a dia e valorize a forma como a criança lida com frustrações.',
    },
  },
  apoio_escola: {
    matematica: {
      titulo: '🔢 Matemática e lógica',
      descricao: 'Precisa de reforço em raciocínio numérico e lógico. As atividades trarão mais desafios de números e padrões.',
      dica: 'Traga a matemática para o cotidiano: contar, medir, comparar e dividir em situações reais.',
    },
    leitura: {
      titulo: '📝 Leitura e interpretação',
      descricao: 'O apoio é em leitura e compreensão de texto. O foco será fortalecer vocabulário e interpretação.',
      dica: 'Leia junto e pergunte sobre a história ("por que você acha que isso aconteceu?").',
    },
    organizacao: {
      titulo: '📅 Organização e planejamento',
      descricao: 'Precisa desenvolver organização e gestão do tempo. A Agenda e as rotinas serão ferramentas centrais.',
      dica: 'Use listas, quadros de rotina e divida tarefas grandes em passos com a criança.',
    },
    autoconfianca: {
      titulo: '🙋 Autoconfiança',
      descricao: 'O apoio é em confiança e participação. O plano dará vitórias graduais para fortalecer a autoestima.',
      dica: 'Celebre tentativas e progressos, não só resultados. Evite comparar com outras crianças.',
    },
  },
  rotina: {
    nenhuma: {
      titulo: '❓ Sem rotina definida',
      descricao: 'Ainda não há uma rotina de estudos em casa. Este é o ponto de partida: criar uma estrutura simples e previsível.',
      dica: 'Comece com 10-15 minutos por dia em horário fixo. Consistência vale mais que duração.',
    },
    tarefa: {
      titulo: '✏️ Só tarefa escolar',
      descricao: 'A rotina se limita ao dever de casa. Há espaço para adicionar atividades de desenvolvimento além da escola.',
      dica: 'Some à tarefa uma atividade curta da Trilha, no mesmo horário, para criar hábito.',
    },
    horarios: {
      titulo: '⏱️ Horários fixos',
      descricao: 'Já existe uma rotina com horários definidos. Uma base sólida — agora é otimizar o conteúdo desses momentos.',
      dica: 'Mantenha os horários e varie as atividades para não cair na monotonia.',
    },
    acompanhamento: {
      titulo: '👨‍👩‍👧 Estudo acompanhado',
      descricao: 'Há acompanhamento diário no estudo. Excelente engajamento familiar — base ideal para avançar rápido.',
      dica: 'Aproveite a presença para propor desafios maiores e dar autonomia progressiva.',
    },
  },
  dedicacao_semanal: {
    menos1h: {
      titulo: '⚡ Menos de 1 hora',
      descricao: 'O tempo disponível é curto. O plano será enxuto e focado no que gera mais impacto em poucos minutos por dia.',
      dica: 'Priorize qualidade: poucas atividades, bem escolhidas, em sessões curtas e diárias.',
    },
    '1a3h': {
      titulo: '🕐 1 a 3 horas',
      descricao: 'Há um tempo razoável por semana. Dá para equilibrar atividades de habilidade com momentos de leitura e conversa.',
      dica: 'Distribua em sessões de 15-20 min ao longo da semana para manter consistência.',
    },
    '3a5h': {
      titulo: '🕓 3 a 5 horas',
      descricao: 'Boa disponibilidade semanal. Permite um plano mais completo, cobrindo várias dimensões do desenvolvimento.',
      dica: 'Combine foco, criatividade e leitura ao longo da semana para um desenvolvimento equilibrado.',
    },
    mais5h: {
      titulo: '💪 Mais de 5 horas',
      descricao: 'Alta dedicação familiar. Há espaço para um plano robusto e para acompanhar de perto a evolução.',
      dica: 'Aproveite para incluir projetos maiores e revisar os relatórios de progresso com frequência.',
    },
  },
}

// Gera uma síntese (parágrafo de abertura) com base nas respostas-chave.
export function gerarSintese(perfil, nome) {
  const estilo = interpretacao.estilo_aprendizado?.[perfil.estilo_aprendizado]?.titulo?.replace(/^[^ ]+ /, '') || 'um estilo próprio'
  const prioridade = interpretacao.habilidade_prioridade?.[perfil.habilidade_prioridade]?.titulo?.replace(/^[^ ]+ /, '') || 'habilidades importantes'
  const persistencia = {
    baixa: 'ainda está construindo persistência',
    media: 'persiste, mas lida com alguma frustração',
    social: 'gosta de aprender com apoio',
    alta: 'tem ótima persistência',
  }[perfil.persistencia] || 'tem seu próprio ritmo'

  return `${nome} ${estilo.toLowerCase()} e ${persistencia}. ` +
    `Neste momento, o foco do desenvolvimento será em ${prioridade.toLowerCase()}. ` +
    `Abaixo está o detalhamento completo do perfil, com recomendações práticas para cada área.`
}
