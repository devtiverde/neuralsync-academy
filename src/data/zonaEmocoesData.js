// Zona das Emoções — conteúdo por faixa etária.
// Base teórica: teoria funcional das emoções (medo/raiva/nojo evoluíram para proteger o
// organismo — LeDoux, Buss), Zones of Regulation (Kuypers) e os 5 pilares do CASEL
// (autoconsciência, autogestão, consciência social, habilidades de relacionamento,
// tomada de decisão responsável). Cada faixa etária ganha mais vocabulário emocional e
// explicações mais profundas — igual à progressão K-3 / 4-5 / 6-8 do próprio CASEL.

export const EMOCOES_BASE = {
  feliz:        { emoji: '😊', label: 'Feliz',        cor: '#FBBF24', valencia: 'positiva' },
  triste:       { emoji: '😢', label: 'Triste',       cor: '#3B82F6', valencia: 'negativa' },
  bravo:        { emoji: '😠', label: 'Bravo',        cor: '#EF4444', valencia: 'negativa' },
  assustado:    { emoji: '😨', label: 'Assustado',    cor: '#8B5CF6', valencia: 'negativa' },
  calmo:        { emoji: '😌', label: 'Calmo',        cor: '#10B981', valencia: 'positiva' },
  frustrado:    { emoji: '😤', label: 'Frustrado',    cor: '#F97316', valencia: 'negativa' },
  orgulhoso:    { emoji: '🤩', label: 'Orgulhoso',    cor: '#EAB308', valencia: 'positiva' },
  envergonhado: { emoji: '😳', label: 'Envergonhado', cor: '#EC4899', valencia: 'negativa' },
  ansioso:      { emoji: '😟', label: 'Ansioso',      cor: '#A855F7', valencia: 'negativa' },
  aliviado:     { emoji: '😮‍💨', label: 'Aliviado',    cor: '#14B8A6', valencia: 'positiva' },
  misto:        { emoji: '🥲', label: 'Dois de uma vez', cor: '#F472B6', valencia: 'mista' },
}

// "Função" de cada emoção — por que ela existe — com profundidade crescente por faixa.
export const FUNCAO_EMOCAO = {
  feliz: {
    exploradores: 'Feliz é o corpo comemorando! Aparece quando rolou algo muito bom.',
    construtores: 'Feliz aparece quando conquistamos algo ou vivemos um momento bom — ela nos dá vontade de repetir aquilo.',
    criadores: 'A alegria é o sinal de que algo foi bom pra você. Ela reforça o que você fez, pra ter vontade de fazer de novo.',
    inventores: 'A alegria funciona como uma recompensa do cérebro: ela nos motiva a repetir a ação que trouxe esse bem-estar.',
  },
  triste: {
    exploradores: 'Triste aparece quando perdemos algo que a gente gosta. Ele pede um abraço.',
    construtores: 'Tristeza aparece quando perdemos algo importante — ela deixa a gente mais devagar e pede ajuda de quem está por perto.',
    criadores: 'A tristeza avisa que perdemos algo importante pra nós. Ela ajuda a parar, pensar no que aconteceu e buscar apoio.',
    inventores: 'A tristeza sinaliza perda ou decepção e reduz nossa energia de propósito — um convite do corpo pra desacelerar, refletir e pedir apoio, o que ajuda a processar o que aconteceu.',
  },
  bravo: {
    exploradores: 'Bravo aparece quando achamos que algo não foi justo.',
    construtores: 'Raiva aparece quando sentimos que algo foi injusto. Ela dá energia pra agir — mas a gente precisa escolher bem o que fazer com essa energia.',
    criadores: 'A raiva é como um alarme interno que dispara diante de uma injustiça. Ela prepara o corpo pra agir — só que a ação certa é falar sobre o problema, não descontar em alguém.',
    inventores: 'A raiva sinaliza que um limite foi ultrapassado. Ela acelera o corpo pra reagir rápido — só que por alguns segundos a parte do cérebro que planeja com calma "sai do ar", por isso é fácil agir por impulso quando estamos bravos.',
  },
  assustado: {
    exploradores: 'Assustado é o alarme do corpo avisando "cuidado!".',
    construtores: 'Medo é o alarme do corpo. Ele aparece antes mesmo de você pensar, pra te proteger de um perigo.',
    criadores: 'O medo dispara um alarme no cérebro que prepara o corpo pra fugir ou se defender — às vezes mais rápido do que conseguimos pensar.',
    inventores: 'O medo ativa a amígdala, uma parte do cérebro que reage a ameaças antes do pensamento consciente entrar em ação. Por isso reagimos rápido a um perigo real — mas às vezes o alarme dispara mesmo sem perigo de verdade, só com um pensamento preocupado.',
  },
  calmo: {
    exploradores: 'Calmo é quando o corpo sabe que está tudo bem e pode descansar.',
    construtores: 'Calma é quando corpo e mente sabem que estão seguros — é o melhor estado pra aprender e brincar.',
    criadores: 'A calma é o estado em que o corpo se recupera do estresse. É quando a gente aprende e memoriza melhor.',
    inventores: 'A calma ativa o sistema nervoso "de descanso" do corpo, o oposto do modo de alerta. É nesse estado que conseguimos pensar com mais clareza.',
  },
  frustrado: {
    construtores: 'Frustração aparece quando algo não sai do jeito que a gente queria. Ela é um sinal pra tentar de outro jeito.',
    criadores: 'A frustração aparece quando um objetivo é bloqueado. Ela pode ser útil: empurra a gente a tentar uma estratégia diferente, em vez de desistir.',
    inventores: 'A frustração sinaliza que o caminho pra um objetivo está bloqueado. Bem usada, é combustível pra persistência — mal administrada, vira desistência ou explosão de raiva.',
  },
  orgulhoso: {
    construtores: 'Orgulho aparece quando conseguimos fazer algo com nosso próprio esforço. Ele nos incentiva a continuar tentando.',
    criadores: 'O orgulho reforça esforços que valeram a pena — é como o cérebro dizendo "faça mais disso".',
    inventores: 'O orgulho é uma emoção "de autoavaliação": ele reforça comportamentos que valem a pena repetir, ligados ao esforço e à conquista pessoal, não só ao resultado.',
  },
  envergonhado: {
    criadores: 'Vergonha aparece quando achamos que fizemos algo errado na frente de outras pessoas. Ela ajuda a reparar e a se importar com o grupo.',
    inventores: 'A vergonha é uma emoção social: sinaliza que talvez tenhamos quebrado uma regra do grupo, e motiva a consertar a situação e manter os laços sociais — mas sentir vergonha demais por um erro pequeno não ajuda em nada.',
  },
  ansioso: {
    criadores: 'Ansiedade é um medo antecipado — sentimos antes mesmo de algo acontecer, imaginando o que pode dar errado.',
    inventores: 'A ansiedade é a versão do medo voltada pro futuro: o cérebro simula possíveis ameaças antes que aconteçam. Isso ajuda no preparo, mas pode ficar exagerado quando dispara sem um motivo real.',
  },
  aliviado: {
    inventores: 'Alívio aparece quando um perigo ou preocupação passa. É o corpo relaxando depois de ter ficado em alerta por um tempo.',
  },
  misto: {
    inventores: 'Sentir duas emoções ao mesmo tempo (tipo felicidade e tristeza juntas) é chamado de ambivalência emocional. É normal e mostra que a situação importa pra você de mais de um jeito.',
  },
}

export const EMOCOES_POR_FAIXA = {
  exploradores: ['feliz', 'triste', 'bravo', 'assustado', 'calmo'],
  construtores: ['feliz', 'triste', 'bravo', 'assustado', 'calmo', 'frustrado', 'orgulhoso'],
  criadores:    ['feliz', 'triste', 'bravo', 'assustado', 'calmo', 'frustrado', 'orgulhoso', 'envergonhado', 'ansioso'],
  inventores:   ['feliz', 'triste', 'bravo', 'assustado', 'calmo', 'frustrado', 'orgulhoso', 'envergonhado', 'ansioso', 'aliviado'],
}

// Estratégias pra emoções NEGATIVAS (o que ajuda a se sentir melhor)
export const ESTRATEGIAS_NEGATIVAS_BASE = {
  respirar: {
    emoji: '🌬️', label: 'Respirar fundo',
    afirmacao: {
      exploradores: 'Respirar fundo ajuda seu corpo a ficar mais calmo. Muito bem!',
      construtores: 'Respirar fundo manda uma mensagem de calma pro cérebro e desacelera o coração.',
      criadores: 'Respirar fundo e devagar ativa o "freio" do corpo, baixando os batimentos e acalmando a mente.',
      inventores: 'Respiração lenta e profunda ativa o nervo vago, que reduz a frequência cardíaca e sinaliza ao cérebro que o perigo passou — uma das formas mais rápidas de sair do modo de alerta.',
    },
  },
  contar: {
    emoji: '🔢', label: 'Contar até 10',
    afirmacao: {
      exploradores: 'Contar devagar dá um tempinho pro seu cérebro pensar antes de agir. Ótima escolha!',
      construtores: 'Contar até 10 dá tempo pro cérebro que pensa (e não só reage) entrar em ação.',
      criadores: 'Contar até 10 cria uma pausa entre o que sentimos e o que fazemos — tempo suficiente pra escolher melhor a reação.',
      inventores: 'Contar até 10 atrasa a resposta automática do cérebro emocional, dando tempo pra parte do cérebro que planeja e pondera assumir o controle da decisão.',
    },
  },
  abracar: {
    emoji: '🤗', label: 'Pedir um abraço',
    afirmacao: {
      exploradores: 'Um abraço de quem a gente ama sempre ajuda o coração. Que legal!',
      construtores: 'Um abraço ou a companhia de alguém de confiança ajuda o corpo a se acalmar mais rápido.',
      criadores: 'Buscar apoio em alguém de confiança ajuda o corpo a se acalmar mais rápido do que tentar sozinho.',
      inventores: 'Isso se chama "co-regulação": o sistema nervoso calmo de outra pessoa ajuda a acalmar o nosso, seja por contato físico ou só pela presença segura de alguém.',
    },
  },
  conversar: {
    emoji: '💬', label: 'Conversar sobre isso',
    afirmacao: {
      exploradores: 'Falar sobre o que sentimos ajuda a entender melhor as emoções. Excelente!',
      construtores: 'Colocar em palavras o que sentimos ajuda o cérebro a entender melhor a emoção — e ela incomoda menos.',
      criadores: 'Nomear a emoção (dizer "estou com raiva" em vez de só sentir) já ajuda a diminuir sua intensidade.',
      inventores: 'Colocar a emoção em palavras ativa áreas do cérebro ligadas à razão e acalma a resposta automática do alarme emocional — descrever o que sentimos já reduz a intensidade dele.',
    },
  },
  desenhar: {
    emoji: '🎨', label: 'Desenhar o que sinto',
    afirmacao: {
      exploradores: 'Desenhar é uma forma linda de colocar os sentimentos pra fora. Adorei!',
      construtores: 'Desenhar ou escrever o que sentimos é uma forma segura de colocar a emoção pra fora.',
      criadores: 'Expressar a emoção através de arte ou escrita ajuda a processá-la sem precisar guardar tudo dentro de você.',
      inventores: 'Expressar emoções de forma criativa é uma estratégia validada de regulação emocional — ajuda a processar a experiência sem reprimi-la ou explodir com ela.',
    },
  },
  identificar_gatilho: {
    emoji: '🔍', label: 'Pensar o que causou isso',
    afirmacao: {
      construtores: 'Pensar "o que me fez sentir assim?" ajuda a entender melhor a situação.',
      criadores: 'Identificar o que disparou a emoção ajuda a entender o padrão e agir melhor da próxima vez.',
      inventores: 'Reconhecer o gatilho específico de uma emoção é o primeiro passo de qualquer estratégia de regulação eficaz — sem saber a causa, é difícil escolher a resposta certa.',
    },
  },
  pausa_corporal: {
    emoji: '🧘', label: 'Perceber o corpo',
    afirmacao: {
      criadores: 'Prestar atenção no corpo (respiração, músculos tensos) ajuda a perceber a emoção antes que ela cresça demais.',
      inventores: 'Fazer uma checagem corporal rápida (ombros, mandíbula, respiração) é uma técnica de atenção plena que ajuda a identificar sinais físicos de uma emoção antes que ela vire uma reação impulsiva.',
    },
  },
  reformular_pensamento: {
    emoji: '🔄', label: 'Ver de outro ângulo',
    afirmacao: {
      inventores: 'Essa técnica se chama reavaliação cognitiva: mudar a forma como interpretamos uma situação muda também a emoção que sentimos sobre ela — uma das estratégias mais estudadas em psicologia pra regular emoções.',
    },
  },
}

// Estratégias pra emoções POSITIVAS (o que fazer com um sentimento bom)
export const ESTRATEGIAS_POSITIVAS_BASE = {
  comemorar: {
    emoji: '🎉', label: 'Comemorar',
    afirmacao: {
      exploradores: 'Comemorar deixa esse sentimento bom durar mais tempo dentro de você!',
      construtores: 'Comemorar ajuda o cérebro a guardar essa alegria como uma lembrança boa.',
      criadores: 'Parar pra comemorar — não só seguir em frente rápido — ajuda o cérebro a registrar melhor esse momento bom.',
      inventores: 'Isso se chama "savoring" (saborear o momento): dedicar um tempo a uma experiência boa, em vez de passar batido por ela, aumenta o bem-estar e fortalece a memória positiva.',
    },
  },
  compartilhar: {
    emoji: '🗣️', label: 'Contar pra alguém',
    afirmacao: {
      exploradores: 'Contar pra alguém que você ama faz a alegria ficar ainda maior!',
      construtores: 'Compartilhar uma alegria com alguém faz ela parecer ainda maior.',
      criadores: 'Dividir uma boa notícia com alguém de confiança multiplica o efeito positivo da emoção.',
      inventores: 'Psicólogos chamam isso de "capitalização": compartilhar experiências positivas com outra pessoa e ver a reação dela amplifica o bem-estar mais do que guardar a alegria só pra você.',
    },
  },
  guardar_lembranca: {
    emoji: '📸', label: 'Guardar essa lembrança',
    afirmacao: {
      exploradores: 'Guardar esse momento na memória é como guardar um tesouro!',
      construtores: 'Prestar atenção nos detalhes desse momento ajuda a guardá-lo na memória por mais tempo.',
      criadores: 'Focar nos detalhes de um momento bom — o que você viu, ouviu, sentiu — ajuda o cérebro a fixar essa lembrança.',
      inventores: 'Registrar conscientemente os detalhes sensoriais de uma experiência positiva fortalece sua consolidação na memória de longo prazo.',
    },
  },
  agradecer: {
    emoji: '🙏', label: 'Agradecer',
    afirmacao: {
      exploradores: 'Agradecer por esse momento bom deixa o coração mais leve.',
      construtores: 'Parar pra agradecer por algo bom ajuda a notar mais coisas boas no seu dia.',
      criadores: 'Praticar gratidão treina o cérebro a notar mais coisas boas ao seu redor, não só as ruins.',
      inventores: 'A prática de gratidão é uma das estratégias mais estudadas em psicologia positiva — ligada a mais bem-estar e até melhor qualidade de sono.',
    },
  },
}

// Estratégias exclusivas da cena de emoção "mista" (só Inventores)
export const ESTRATEGIAS_MISTAS_BASE = {
  aceitar_dois: {
    emoji: '🤝', label: 'Aceitar os dois sentimentos',
    afirmacao: { inventores: 'Sentir duas emoções ao mesmo tempo é chamado de ambivalência emocional — é completamente normal e mostra que a situação importa pra você de mais de um jeito.' },
  },
  conversar_dois: {
    emoji: '💬', label: 'Conversar sobre os dois',
    afirmacao: { inventores: 'Explicar pra alguém os dois lados do que você sente ajuda a organizar melhor sentimentos complexos.' },
  },
  focar_controle: {
    emoji: '🎯', label: 'Focar no que dá pra controlar agora',
    afirmacao: { inventores: 'Quando os sentimentos são complicados, focar numa ação pequena e possível agora ajuda a não se sentir paralisado.' },
  },
}

// Quais estratégias (negativas) cada faixa já conhece
export const ESTRATEGIAS_NEGATIVAS_POR_FAIXA = {
  exploradores: ['respirar', 'contar', 'abracar', 'conversar', 'desenhar'],
  construtores: ['respirar', 'contar', 'abracar', 'conversar', 'desenhar', 'identificar_gatilho'],
  criadores:    ['respirar', 'contar', 'abracar', 'conversar', 'desenhar', 'identificar_gatilho', 'pausa_corporal'],
  inventores:   ['respirar', 'contar', 'abracar', 'conversar', 'desenhar', 'identificar_gatilho', 'pausa_corporal', 'reformular_pensamento'],
}

export const ESTRATEGIAS_POSITIVAS_POR_FAIXA = {
  exploradores: ['comemorar', 'compartilhar'],
  construtores: ['comemorar', 'compartilhar', 'guardar_lembranca'],
  criadores:    ['comemorar', 'compartilhar', 'guardar_lembranca', 'agradecer'],
  inventores:   ['comemorar', 'compartilhar', 'guardar_lembranca', 'agradecer'],
}

// Cenas por faixa etária
export const CENAS_POR_FAIXA = {
  exploradores: [
    { texto: 'Você ganhou de presente o brinquedo que mais queria!',                       ilustracao: '🎁', correta: 'feliz' },
    { texto: 'Seu brinquedo favorito quebrou sem querer.',                                  ilustracao: '🧸', correta: 'triste' },
    { texto: 'Seu irmão pegou seu brinquedo sem pedir licença.',                             ilustracao: '🚫', correta: 'bravo' },
    { texto: 'Você ouviu um trovão bem forte lá fora.',                                     ilustracao: '⛈️', correta: 'assustado' },
    { texto: 'Você está deitado no sofá ouvindo uma música tranquila.',                      ilustracao: '🎶', correta: 'calmo' },
    { texto: 'Você conseguiu terminar sozinho uma atividade difícil!',                       ilustracao: '🏆', correta: 'feliz' },
    { texto: 'Seu amigo disse que não quer mais brincar com você hoje.',                     ilustracao: '🙁', correta: 'triste' },
    { texto: 'Você arrumou todo o seu quarto, e alguém bagunçou tudo de novo.',              ilustracao: '🧹', correta: 'bravo' },
  ],
  construtores: [
    { texto: 'Você ganhou uma medalha numa competição da escola!',                          ilustracao: '🏅', correta: 'feliz' },
    { texto: 'Seu animal de estimação ficou doente.',                                        ilustracao: '🐶', correta: 'triste' },
    { texto: 'Alguém furou a fila bem na sua frente, sem pedir desculpa.',                   ilustracao: '🚶', correta: 'bravo' },
    { texto: 'Você vai dormir pela primeira vez numa casa que você não conhece.',            ilustracao: '🏠', correta: 'assustado' },
    { texto: 'Você está lendo um livro gostoso, num cantinho silencioso.',                   ilustracao: '📖', correta: 'calmo' },
    { texto: 'Você tentou cinco vezes montar o quebra-cabeça e as peças não encaixam.',       ilustracao: '🧩', correta: 'frustrado' },
    { texto: 'Você treinou muito pra prova e tirou uma nota ótima.',                         ilustracao: '📝', correta: 'orgulhoso' },
    { texto: 'Sua torre de blocos caiu bem na hora que você ia terminar.',                   ilustracao: '🧱', correta: 'frustrado' },
  ],
  criadores: [
    { texto: 'Você foi escolhido capitão do time no recreio.',                               ilustracao: '⚽', correta: 'feliz' },
    { texto: 'Sua melhor amiga vai se mudar de cidade.',                                     ilustracao: '📦', correta: 'triste' },
    { texto: 'Um colega espalhou um segredo que você tinha contado em confiança.',           ilustracao: '🤐', correta: 'bravo' },
    { texto: 'Você percebeu que ficou sozinho, longe do grupo, numa trilha.',                ilustracao: '🌲', correta: 'assustado' },
    { texto: 'Depois de um dia corrido, você está sentado no jardim ouvindo os pássaros.',    ilustracao: '🌳', correta: 'calmo' },
    { texto: 'Você estudou a semana toda, mas travou numa questão bem na hora da prova.',     ilustracao: '📄', correta: 'frustrado' },
    { texto: 'Você ajudou um colega a entender a matéria e ele foi bem na prova.',            ilustracao: '🤝', correta: 'orgulhoso' },
    { texto: 'Você tropeçou e caiu na frente de toda a turma.',                              ilustracao: '😳', correta: 'envergonhado' },
    { texto: 'Amanhã é sua primeira apresentação de trabalho em grupo, na frente da turma.',  ilustracao: '🎤', correta: 'ansioso' },
  ],
  inventores: [
    { texto: 'Você recebeu a notícia de que passou de fase num campeonato para o qual treinou meses.', ilustracao: '🏆', correta: 'feliz' },
    { texto: 'Um projeto em que você trabalhou semanas não foi selecionado.',                  ilustracao: '📉', correta: 'triste' },
    { texto: 'Você viu alguém sendo tratado de forma injusta e ninguém fez nada.',             ilustracao: '⚖️', correta: 'bravo' },
    { texto: 'Você está sozinho em casa e ouviu um barulho estranho vindo do quintal.',        ilustracao: '🌙', correta: 'assustado' },
    { texto: 'Você terminou tudo que precisava fazer e está deitado sem nenhuma pressa.',      ilustracao: '🛋️', correta: 'calmo' },
    { texto: 'Você reescreveu o mesmo parágrafo da redação cinco vezes e ainda não ficou bom.', ilustracao: '✍️', correta: 'frustrado' },
    { texto: 'Você defendeu sua opinião num debate, mesmo com medo de errar.',                 ilustracao: '🗣️', correta: 'orgulhoso' },
    { texto: 'Você respondeu errado, bem alto, numa sala cheia, achando que tinha certeza.',   ilustracao: '🙈', correta: 'envergonhado' },
    { texto: 'Amanhã sai o resultado de uma prova bem importante pra você.',                   ilustracao: '📊', correta: 'ansioso' },
    { texto: 'Você achou a carteira que tinha perdido, com tudo dentro dela.',                 ilustracao: '😮‍💨', correta: 'aliviado' },
    { texto: 'Você vai se mudar pra uma escola nova: vai sentir falta dos amigos, mas também está animado pra conhecer gente nova.', ilustracao: '🚚', correta: 'misto',
      estrategiasOverride: ['aceitar_dois', 'conversar_dois', 'focar_controle'] },
  ],
}
