// Histórias Interativas — "Escolha seu Caminho" para cada categoria do Kids TV.
// Estrutura: nó inicial -> 2 nós intermediários -> 4 finais (heroi/sabio/aventureiro/cientista).
// ehFinal:true marca o fim da história. tipoFinal define o selo exibido.

export const kidsHistoriaInterativa = {
  dinossauros: {
    titulo: 'A Expedição de Luna',
    emoji: '🦴',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🏜️',
        texto: 'Luna está no deserto vermelho com sua escova de paleontóloga quando encontra dois rastros de pegadas fossilizadas cruzando o chão. Um rastro tem garras afiadas. O outro é enorme e arredondado.',
        escolhas: [
          { texto: 'Seguir o rastro de garras (carnívoro)', proximo: 'carnivoro' },
          { texto: 'Seguir o rastro gigante (herbívoro)', proximo: 'herbivoro' },
        ],
      },
      carnivoro: {
        emoji: '🦖',
        texto: 'O rastro termina numa marca de dente enorme cravada numa rocha — do tamanho de uma banana! Luna precisa decidir rápido antes que o vento apague as pistas.',
        escolhas: [
          { texto: 'Medir o dente com cuidado antes de tocar em mais nada', proximo: 'fim_dino_cientista' },
          { texto: 'Chamar a equipe pelo rádio para escavar juntos', proximo: 'fim_dino_heroi' },
        ],
      },
      herbivoro: {
        emoji: '🦕',
        texto: 'O rastro gigante segue por quilômetros e leva a um esqueleto parcialmente enterrado, com um pescoço tão comprido quanto um ônibus escolar.',
        escolhas: [
          { texto: 'Continuar escavando até desenterrar tudo', proximo: 'fim_dino_aventureiro' },
          { texto: 'Parar e desenhar cada detalhe num caderno de campo', proximo: 'fim_dino_sabio' },
        ],
      },
      fim_dino_cientista: {
        emoji: '📏', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Luna mede o dente com precisão: 15 centímetros, do tamanho de uma banana grande! É a marca de um T-Rex, o maior carnívoro que já pisou na Terra.',
        licao: 'O dente de T-Rex podia chegar a 15 cm — os cientistas medem cada fóssil antes de tocar para não perder pistas importantes.',
      },
      fim_dino_heroi: {
        emoji: '📻', ehFinal: true, tipoFinal: 'heroi',
        texto: 'A equipe chega correndo e, juntos, desenterram um esqueleto quase completo de T-Rex! Trabalho em equipe transformou uma pista pequena numa descoberta gigante.',
        licao: 'As maiores descobertas de dinossauros quase sempre acontecem em equipe — sozinho, um paleontólogo perderia detalhes importantes.',
      },
      fim_dino_aventureiro: {
        emoji: '🦴', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Depois de horas escavando, Luna revela o esqueleto inteiro de um Brachiosaurus. Os ossos são ocos por dentro — leves como os de um pássaro, mesmo sendo gigantes por fora!',
        licao: 'Dinossauros gigantes como o Brachiosaurus tinham ossos ocos, o que os deixava mais leves apesar do tamanho enorme.',
      },
      fim_dino_sabio: {
        emoji: '📓', ehFinal: true, tipoFinal: 'sabio',
        texto: 'O caderno de Luna fica cheio de desenhos detalhados. Anos depois, esses desenhos ajudam outros cientistas a entender como o dinossauro vivia — sem eles, muita informação teria se perdido.',
        licao: 'Registrar descobertas com desenhos e anotações é tão importante quanto escavar — sem isso, o conhecimento se perde.',
      },
    },
  },

  corpo_humano: {
    titulo: 'A Viagem de Max pelo Corpo',
    emoji: '🧬',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🔬',
        texto: 'Max encolheu até o tamanho de uma célula e está flutuando na corrente sanguínea. À frente, o caminho se divide: um leva ao coração, outro leva direto ao cérebro.',
        escolhas: [
          { texto: 'Seguir para o coração', proximo: 'coracao' },
          { texto: 'Seguir para o cérebro', proximo: 'cerebro' },
        ],
      },
      coracao: {
        emoji: '❤️',
        texto: 'Max sente o coração contrair com força — BUMP! Ele é lançado para dentro da aorta, a maior artéria do corpo, como um túnel vibrando.',
        escolhas: [
          { texto: 'Surfar a corrente até o fim da aorta', proximo: 'fim_corpo_aventureiro' },
          { texto: 'Ficar parado observando as válvulas se fechando', proximo: 'fim_corpo_cientista' },
        ],
      },
      cerebro: {
        emoji: '🧠',
        texto: 'Max chega ao cérebro e vê bilhões de luzinhas piscando ao mesmo tempo, como a cidade mais iluminada do mundo vista do espaço.',
        escolhas: [
          { texto: 'Seguir um raio elétrico entre dois neurônios', proximo: 'fim_corpo_sabio' },
          { texto: 'Tentar contar quantos neurônios existem', proximo: 'fim_corpo_heroi' },
        ],
      },
      fim_corpo_aventureiro: {
        emoji: '💨', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Max sai disparado pela aorta a mais de 200 km/h dentro do corpo! O sangue viaja tão rápido que dá a volta completa no corpo em menos de um minuto.',
        licao: 'O sangue circula pelo corpo inteiro em cerca de 1 minuto, levando oxigênio para cada célula que precisa dele.',
      },
      fim_corpo_cientista: {
        emoji: '🚪', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Max observa as válvulas do coração se abrindo e fechando com perfeição — isso acontece 100 mil vezes por dia, sem parar, a vida toda.',
        licao: 'O coração bate cerca de 100 mil vezes por dia sem descanso — é o músculo mais trabalhador do corpo.',
      },
      fim_corpo_sabio: {
        emoji: '⚡', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Max percebe algo incrível: o raio elétrico que ele seguiu era... um pensamento! O cérebro estava pensando sobre si mesmo, e Max fazia parte disso.',
        licao: 'Cada pensamento é um sinal elétrico saltando entre neurônios — pensar é, literalmente, eletricidade em ação.',
      },
      fim_corpo_heroi: {
        emoji: '💡', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Max desiste de contar um por um — são 86 bilhões de neurônios! Ele entende que o cérebro é tão poderoso que nenhum computador ainda consegue copiá-lo por completo.',
        licao: 'O cérebro humano tem cerca de 86 bilhões de neurônios trabalhando juntos — mais do que estrelas visíveis a olho nu no céu.',
      },
    },
  },

  animais: {
    titulo: 'O Safari de Sofia',
    emoji: '🐘',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🌅',
        texto: 'Sofia está no safari ao amanhecer quando ouve dois sons ao mesmo tempo: um assobio agudo vindo do rio e um zumbido intenso vindo de uma árvore próxima.',
        escolhas: [
          { texto: 'Seguir o assobio até o rio (golfinhos)', proximo: 'golfinho' },
          { texto: 'Seguir o zumbido até a árvore (abelhas)', proximo: 'abelha' },
        ],
      },
      golfinho: {
        emoji: '🐬',
        texto: 'No rio, um pesquisador mostra um golfinho chamado Ajax, que tem seu próprio assobio-nome único desde filhote.',
        escolhas: [
          { texto: 'Gravar o assobio de Ajax com o equipamento', proximo: 'fim_animais_cientista' },
          { texto: 'Nadar com cuidado para observar o grupo de perto', proximo: 'fim_animais_aventureiro' },
        ],
      },
      abelha: {
        emoji: '🐝',
        texto: 'Na árvore, uma abelha volta da flor mais bonita do campo e começa a fazer uma dança em forma de oito no ar.',
        escolhas: [
          { texto: 'Seguir a direção exata da dança', proximo: 'fim_animais_sabio' },
          { texto: 'Perguntar ao apicultor o que a dança significa', proximo: 'fim_animais_heroi' },
        ],
      },
      fim_animais_cientista: {
        emoji: '🎙️', ehFinal: true, tipoFinal: 'cientista',
        texto: 'A gravação confirma: Ajax e os outros golfinhos usam assobios como nomes próprios! Se você tocar o assobio de longe, o golfinho certo vem nadando até você.',
        licao: 'Golfinhos são um dos poucos animais, além dos humanos, que usam "nomes" próprios para se chamar entre si.',
      },
      fim_animais_aventureiro: {
        emoji: '🌊', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Sofia nada devagar e vê o grupo inteiro de golfinhos cuidando dos filhotes juntos — eles vivem em bandos muito unidos, como uma grande família.',
        licao: 'Golfinhos vivem em grupos sociais fortes e cuidam dos filhotes coletivamente, parecido com famílias humanas.',
      },
      fim_animais_sabio: {
        emoji: '🗺️', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Seguindo a dança, Sofia encontra o campo de flores exato que a abelha visitou! A dança era um mapa: a direção mostra o ângulo do sol, a duração mostra a distância.',
        licao: 'A "dança das abelhas" é uma forma real de comunicação — elas passam mapas precisos usando apenas o corpo.',
      },
      fim_animais_heroi: {
        emoji: '🍯', ehFinal: true, tipoFinal: 'heroi',
        texto: 'O apicultor explica que, sem as abelhas fazendo essa dança para achar flores, muitas plantas não seriam polinizadas — Sofia entende que salvar as abelhas é salvar o jardim inteiro.',
        licao: 'Abelhas polinizam boa parte das plantas que comemos — protegê-las protege toda a cadeia de alimentos.',
      },
    },
  },

  planeta_terra: {
    titulo: 'Tomás Observa a Terra',
    emoji: '🌍',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🛰️',
        texto: 'Tomás flutua no espaço olhando para a Terra girando devagar. De lá de cima, ele pode escolher observar os oceanos brilhando de azul ou o movimento lento das placas tectônicas.',
        escolhas: [
          { texto: 'Observar os oceanos', proximo: 'oceano' },
          { texto: 'Observar as placas tectônicas', proximo: 'placas' },
        ],
      },
      oceano: {
        emoji: '🌊',
        texto: 'Tomás percebe que 71% da superfície da Terra é coberta de água. Ele pode mergulhar bem fundo ou seguir uma corrente marinha gigante que atravessa o planeta.',
        escolhas: [
          { texto: 'Mergulhar até as profundezas', proximo: 'fim_terra_cientista' },
          { texto: 'Seguir a corrente marinha', proximo: 'fim_terra_aventureiro' },
        ],
      },
      placas: {
        emoji: '🗺️',
        texto: 'Tomás sente um tremor leve no chão — as placas tectônicas estão se movendo bem devagar, alguns centímetros por ano. Ele pode acompanhar a formação de um vulcão novo ou de uma montanha se erguendo.',
        escolhas: [
          { texto: 'Acompanhar o vulcão nascendo', proximo: 'fim_terra_heroi' },
          { texto: 'Acompanhar a montanha se erguendo', proximo: 'fim_terra_sabio' },
        ],
      },
      fim_terra_cientista: {
        emoji: '🐙', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Nas profundezas, Tomás descobre que menos de 20% do fundo do oceano já foi explorado por humanos — conhecemos melhor a superfície da Lua do que o fundo do nosso próprio mar!',
        licao: 'Exploramos mais a superfície da Lua do que o fundo dos oceanos da Terra — ainda há muito mistério por descobrir aqui mesmo.',
      },
      fim_terra_aventureiro: {
        emoji: '🌀', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'A corrente marinha leva Tomás ao redor do mundo inteiro! Essas correntes gigantes espalham calor pelo planeta e ajudam a controlar o clima de continentes inteiros.',
        licao: 'As correntes marinhas transportam calor pelo mundo e influenciam diretamente o clima de regiões inteiras.',
      },
      fim_terra_heroi: {
        emoji: '🏝️', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Tomás vê lava esfriando e endurecendo até formar uma ilha nova saindo do mar! Muitas ilhas do mundo, como o Havaí, nasceram exatamente assim.',
        licao: 'Ilhas vulcânicas como o Havaí nasceram de lava que esfriou e se acumulou até sair da água.',
      },
      fim_terra_sabio: {
        emoji: '⛰️', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Tomás percebe que a montanha cresce porque duas placas tectônicas colidem devagar, empurrando a terra para cima — um processo que leva milhões de anos para formar picos como o Himalaia.',
        licao: 'Cordilheiras como o Himalaia se formam pela colisão lenta entre placas tectônicas, ao longo de milhões de anos.',
      },
    },
  },

  esportes: {
    titulo: 'Théo Rumo ao Pódio',
    emoji: '⚽',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🏟️',
        texto: 'Théo está se preparando para uma competição importante e precisa decidir o foco do treino desta semana: força muscular ou resistência.',
        escolhas: [
          { texto: 'Treinar força', proximo: 'forca' },
          { texto: 'Treinar resistência', proximo: 'resistencia' },
        ],
      },
      forca: {
        emoji: '💪',
        texto: 'Depois de um treino puxado de musculação, os músculos de Théo estão cansados. Ele pode descansar bem hoje ou fazer mais uma série antes de ir para casa.',
        escolhas: [
          { texto: 'Descansar e deixar os músculos se recuperarem', proximo: 'fim_esportes_sabio' },
          { texto: 'Fazer mais uma série de treino', proximo: 'fim_esportes_aventureiro' },
        ],
      },
      resistencia: {
        emoji: '🏃',
        texto: 'Théo está no meio de uma corrida longa. Sua garganta está seca e ele pode parar para se hidratar ou continuar correndo sem parar.',
        escolhas: [
          { texto: 'Parar para se hidratar', proximo: 'fim_esportes_cientista' },
          { texto: 'Continuar correndo sem parar', proximo: 'fim_esportes_heroi' },
        ],
      },
      fim_esportes_sabio: {
        emoji: '😴', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Théo descansa bem e acorda mais forte no dia seguinte. Os músculos crescem justamente durante o descanso, não durante o treino!',
        licao: 'Os músculos se fortalecem durante o descanso, não durante o exercício em si — dormir bem faz parte do treino.',
      },
      fim_esportes_aventureiro: {
        emoji: '🔥', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Théo sente as pernas tremendo, mas termina a série extra com muito esforço. Ele aprende que ultrapassar limites tem seu valor — mas precisa de cuidado para não se machucar.',
        licao: 'Superar limites exige coragem, mas atletas profissionais sempre equilibram esforço com cuidado para evitar lesões.',
      },
      fim_esportes_cientista: {
        emoji: '💧', ehFinal: true, tipoFinal: 'cientista',
        texto: 'A água refresca Théo e melhora seu desempenho na hora! O corpo perde muita água suando, e sem repor, os músculos cansam muito mais rápido.',
        licao: 'A desidratação reduz o desempenho físico rapidamente — por isso atletas se hidratam antes, durante e depois do esforço.',
      },
      fim_esportes_heroi: {
        emoji: '🏅', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Théo cruza a linha de chegada exausto, mas com um sorriso enorme. Esse é o espírito olímpico: superar o próprio limite, não necessariamente vencer os outros.',
        licao: 'O espírito olímpico é sobre superar os próprios limites — competir contra si mesmo tanto quanto contra os adversários.',
      },
    },
  },

  coracao: {
    titulo: 'Ana e o Coração Elétrico',
    emoji: '❤️',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🏠',
        texto: 'Ana entra dentro de um coração gigante e vê duas câmaras piscando de luzes diferentes: uma recebe sangue de volta, a outra bombeia sangue para fora.',
        escolhas: [
          { texto: 'Explorar a câmara que recebe sangue', proximo: 'recebe' },
          { texto: 'Explorar a câmara que bombeia sangue', proximo: 'bombeia' },
        ],
      },
      recebe: {
        emoji: '🔵',
        texto: 'Ana vê o sangue chegando cheio de gás carbônico, precisando de oxigênio novo. Ela pode seguir até os pulmões ou ficar observando as válvulas do coração se fechando com força.',
        escolhas: [
          { texto: 'Seguir até os pulmões', proximo: 'fim_coracao_cientista' },
          { texto: 'Observar as válvulas de perto', proximo: 'fim_coracao_sabio' },
        ],
      },
      bombeia: {
        emoji: '⚡',
        texto: 'Ana sente um pequeno choque elétrico percorrer a parede do coração — é o sinal que faz tudo bater no ritmo certo. Ela pode seguir esse sinal elétrico ou contar quantas vezes o coração bate por minuto.',
        escolhas: [
          { texto: 'Seguir o sinal elétrico', proximo: 'fim_coracao_heroi' },
          { texto: 'Contar as batidas por minuto', proximo: 'fim_coracao_aventureiro' },
        ],
      },
      fim_coracao_cientista: {
        emoji: '🫁', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Nos pulmões, o sangue troca o gás carbônico por oxigênio fresco e volta para o coração pronto para viajar pelo corpo todo de novo.',
        licao: 'O sangue passa pelos pulmões para trocar gás carbônico por oxigênio antes de circular pelo resto do corpo.',
      },
      fim_coracao_sabio: {
        emoji: '🚪', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Ana vê as válvulas se fechando na hora certa, impedindo que o sangue volte para trás — como portas de mão única que garantem que tudo flua na direção correta.',
        licao: 'As válvulas do coração funcionam como portas de mão única, evitando que o sangue volte para o lugar errado.',
      },
      fim_coracao_heroi: {
        emoji: '💓', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Ana descobre que o coração tem seu próprio "marca-passo natural" — um grupo de células que gera o sinal elétrico sozinho, fazendo o coração bater mesmo sem receber ordens do cérebro.',
        licao: 'O coração tem um marca-passo natural próprio e continua batendo em ritmo mesmo sem comando direto do cérebro.',
      },
      fim_coracao_aventureiro: {
        emoji: '🔢', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Ana conta cerca de 70 batidas por minuto em repouso — isso dá mais de 100 mil batidas por dia, todos os dias, sem nunca tirar férias!',
        licao: 'Um coração saudável bate cerca de 70 vezes por minuto em repouso, somando mais de 100 mil batidas por dia.',
      },
    },
  },

  golfinhos: {
    titulo: 'Vitor Entre os Golfinhos',
    emoji: '🐬',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🚤',
        texto: 'Vitor acompanha um pesquisador num barco observando um grupo de golfinhos. Ele pode estudar como eles enxergam com som (ecolocalização) ou como vivem em grupo.',
        escolhas: [
          { texto: 'Estudar a ecolocalização', proximo: 'eco' },
          { texto: 'Estudar a vida social do grupo', proximo: 'social' },
        ],
      },
      eco: {
        emoji: '📡',
        texto: 'Um golfinho solta um clique sonoro rápido que ecoa na água. Vitor pode seguir o eco até um cardume de peixes escondido ou até uma formação de rochas no fundo.',
        escolhas: [
          { texto: 'Seguir o eco até os peixes', proximo: 'fim_golfinho_cientista' },
          { texto: 'Seguir o eco até as rochas', proximo: 'fim_golfinho_sabio' },
        ],
      },
      social: {
        emoji: '👨‍👩‍👧',
        texto: 'O grupo de golfinhos nada em formação, cuidando uns dos outros. Vitor pode observar como cuidam dos filhotes mais novos ou como cada um tem seu próprio "nome" sonoro.',
        escolhas: [
          { texto: 'Observar o cuidado com os filhotes', proximo: 'fim_golfinho_heroi' },
          { texto: 'Observar os "nomes" sonoros de cada golfinho', proximo: 'fim_golfinho_aventureiro' },
        ],
      },
      fim_golfinho_cientista: {
        emoji: '🐟', ehFinal: true, tipoFinal: 'cientista',
        texto: 'O eco rebate nos peixes e volta mais rápido — o golfinho "enxerga" a forma e a distância do cardume só com o som, como um sonar natural super preciso.',
        licao: 'Golfinhos usam ecolocalização — um sonar biológico — para "ver" objetos e presas através do som, mesmo na água escura.',
      },
      fim_golfinho_sabio: {
        emoji: '🪨', ehFinal: true, tipoFinal: 'sabio',
        texto: 'O eco nas rochas ajuda o golfinho a mapear todo o fundo do mar ao redor — ele conhece o território tão bem quanto você conhece sua própria casa no escuro.',
        licao: 'A ecolocalização também serve para os golfinhos mapearem o ambiente ao redor, não só para encontrar comida.',
      },
      fim_golfinho_heroi: {
        emoji: '🤱', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Vitor vê os golfinhos adultos nadando bem perto dos filhotes, protegendo-os de predadores. O grupo inteiro ajuda a cuidar das crias, não só a mãe.',
        licao: 'Em grupos de golfinhos, o cuidado com os filhotes é responsabilidade de todos, não apenas da mãe.',
      },
      fim_golfinho_aventureiro: {
        emoji: '🎵', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Vitor percebe que cada golfinho tem um assobio único, como um nome próprio, criado ainda filhote. Golfinhos chamam uns aos outros pelo "nome" — algo raríssimo no reino animal.',
        licao: 'Golfinhos criam seu próprio assobio-nome quando filhotes e o usam a vida toda para serem chamados pelo grupo.',
      },
    },
  },

  vulcoes: {
    titulo: 'Bia e o Vulcão Adormecido',
    emoji: '🌋',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🥾',
        texto: 'Bia sobe a encosta de um vulcão adormecido com sua equipe de geólogos. Ela pode estudar o que acontece por dentro (a câmara de magma) ou observar como o vulcão formou uma ilha próxima.',
        escolhas: [
          { texto: 'Estudar a câmara de magma', proximo: 'magma' },
          { texto: 'Observar a ilha formada pelo vulcão', proximo: 'ilha' },
        ],
      },
      magma: {
        emoji: '🔥',
        texto: 'Bia sente o calor vindo de fendas na rocha. Ela pode medir a temperatura com um instrumento especial ou observar os gases que escapam das fendas.',
        escolhas: [
          { texto: 'Medir a temperatura do magma', proximo: 'fim_vulcao_cientista' },
          { texto: 'Observar os gases saindo das fendas', proximo: 'fim_vulcao_sabio' },
        ],
      },
      ilha: {
        emoji: '🏝️',
        texto: 'Bia vê uma pequena ilha nova surgindo no oceano, criada por lava que esfriou. Ela pode documentar cientificamente o nascimento da ilha ou avisar os pescadores da região sobre a nova terra.',
        escolhas: [
          { texto: 'Documentar o nascimento da ilha', proximo: 'fim_vulcao_aventureiro' },
          { texto: 'Avisar os pescadores da região', proximo: 'fim_vulcao_heroi' },
        ],
      },
      fim_vulcao_cientista: {
        emoji: '🌡️', ehFinal: true, tipoFinal: 'cientista',
        texto: 'O instrumento marca mais de 1.000°C dentro da câmara! É calor suficiente para derreter rocha sólida e transformá-la em magma líquido e brilhante.',
        licao: 'O magma dentro de um vulcão pode ultrapassar 1.000°C — calor suficiente para derreter rocha sólida completamente.',
      },
      fim_vulcao_sabio: {
        emoji: '💨', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Bia percebe que o aumento de gases é um sinal de alerta importante — cientistas monitoram esses gases justamente para prever quando um vulcão pode entrar em erupção.',
        licao: 'O aumento de gases vulcânicos é um dos principais sinais que cientistas usam para prever erupções.',
      },
      fim_vulcao_aventureiro: {
        emoji: '📷', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Bia registra cada etapa: a lava toca a água, esfria rapidamente e se acumula até formar terra firme. Foi assim que ilhas como o Havaí nasceram, camada por camada, ao longo de milhares de anos.',
        licao: 'Ilhas vulcânicas nascem quando lava esfria repetidamente no mar, acumulando camadas até virar terra firme.',
      },
      fim_vulcao_heroi: {
        emoji: '🚨', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Os pescadores agradecem o aviso e navegam com segurança ao redor da nova terra. Bia entende que a ciência também serve para proteger as pessoas, não só para estudar.',
        licao: 'Compartilhar descobertas científicas com a comunidade ajuda a manter as pessoas seguras diante de mudanças na natureza.',
      },
    },
  },

  tecnologia: {
    titulo: 'Davi Programa um App',
    emoji: '💻',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '⌨️',
        texto: 'Davi quer criar seu primeiro aplicativo e precisa decidir por onde começar: aprender a lógica de programação ou entender como a internet conecta computadores no mundo todo.',
        escolhas: [
          { texto: 'Aprender lógica de programação', proximo: 'logica' },
          { texto: 'Entender como a internet funciona', proximo: 'internet' },
        ],
      },
      logica: {
        emoji: '🧩',
        texto: 'Davi escreve seu primeiro código, mas ele não funciona de primeira. Ele pode testar linha por linha para achar o erro ou rodar tudo de novo e torcer para dar certo.',
        escolhas: [
          { texto: 'Testar linha por linha', proximo: 'fim_tech_sabio' },
          { texto: 'Rodar tudo de novo e ver o que acontece', proximo: 'fim_tech_aventureiro' },
        ],
      },
      internet: {
        emoji: '🌐',
        texto: 'Davi descobre que toda mensagem na internet é dividida em pequenos pacotes de dados antes de viajar. Ele pode rastrear um pacote até seu destino ou visitar um servidor que guarda sites do mundo inteiro.',
        escolhas: [
          { texto: 'Rastrear um pacote de dados', proximo: 'fim_tech_cientista' },
          { texto: 'Visitar um servidor de dados', proximo: 'fim_tech_heroi' },
        ],
      },
      fim_tech_sabio: {
        emoji: '🐛', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Testando linha por linha, Davi encontra o erro: faltava um sinal de pontuação! Esse processo se chama "debugar" — é assim que todo programador profissional trabalha.',
        licao: 'Debugar (encontrar erros no código passo a passo) é uma habilidade essencial de todo programador, iniciante ou experiente.',
      },
      fim_tech_aventureiro: {
        emoji: '💥', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'O código dá erro de novo, mas dessa vez a mensagem de erro mostra exatamente onde está o problema. Davi aprende que errar rápido também ensina rápido.',
        licao: 'Na programação, cada erro traz uma mensagem que ajuda a entender e corrigir o problema — errar faz parte de aprender.',
      },
      fim_tech_cientista: {
        emoji: '📦', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Davi vê o pacote de dados passar por vários computadores no caminho até chegar ao destino em milissegundos — a internet é uma rede gigante de "atalhos" conectando o planeta inteiro.',
        licao: 'Dados na internet viajam em pequenos pacotes que passam por várias redes até chegar ao destino, tudo em milissegundos.',
      },
      fim_tech_heroi: {
        emoji: '🖥️', ehFinal: true, tipoFinal: 'heroi',
        texto: 'No servidor, Davi entende que sites e aplicativos do mundo inteiro ficam guardados em computadores gigantes, sempre ligados, para que qualquer pessoa possa acessá-los a qualquer hora.',
        licao: 'Servidores são computadores especiais que ficam sempre ligados para que sites e apps estejam disponíveis a qualquer momento.',
      },
    },
  },

  matematica: {
    titulo: 'Clara e o Enigma Numérico',
    emoji: '🔢',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '📐',
        texto: 'Clara encontra um enigma antigo escrito num pergaminho: para resolvê-lo, ela pode usar geometria (formas) ou probabilidade (chances).',
        escolhas: [
          { texto: 'Resolver com geometria', proximo: 'geo' },
          { texto: 'Resolver com probabilidade', proximo: 'prob' },
        ],
      },
      geo: {
        emoji: '📏',
        texto: 'Clara precisa medir um terreno estranho para desvendar o enigma. Ela pode dividir o terreno em triângulos ou em círculos para calcular a área.',
        escolhas: [
          { texto: 'Usar triângulos para medir', proximo: 'fim_mat_cientista' },
          { texto: 'Usar círculos para medir', proximo: 'fim_mat_sabio' },
        ],
      },
      prob: {
        emoji: '🎲',
        texto: 'O enigma pede para prever o resultado de um jogo de dados. Clara pode calcular as chances matematicamente ou simplesmente jogar os dados várias vezes para ver o que acontece.',
        escolhas: [
          { texto: 'Calcular as chances antes de jogar', proximo: 'fim_mat_heroi' },
          { texto: 'Jogar os dados e observar o resultado', proximo: 'fim_mat_aventureiro' },
        ],
      },
      fim_mat_cientista: {
        emoji: '🔺', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Dividindo o terreno em triângulos, Clara calcula a área com precisão perfeita! Engenheiros usam exatamente essa técnica para projetar pontes e prédios.',
        licao: 'Dividir formas complexas em triângulos é uma técnica real usada por engenheiros para calcular áreas com precisão.',
      },
      fim_mat_sabio: {
        emoji: '⭕', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Usando círculos, Clara percebe padrões escondidos no terreno que os triângulos não mostravam — a natureza está cheia de círculos, do sol às gotas de chuva.',
        licao: 'Círculos aparecem por toda a natureza, e entender sua matemática ajuda a explicar padrões naturais.',
      },
      fim_mat_heroi: {
        emoji: '🎯', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Clara calcula que a chance de tirar um número específico é de 1 em 6 — e acerta a previsão! A matemática permite prever o futuro com números, não com adivinhação.',
        licao: 'A probabilidade permite calcular as chances de um evento acontecer antes mesmo dele ocorrer.',
      },
      fim_mat_aventureiro: {
        emoji: '🎲', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Depois de jogar os dados 20 vezes, Clara percebe que os números realmente se distribuem quase igualmente entre 1 e 6 — a experiência confirma o que a teoria previa!',
        licao: 'Repetir um experimento várias vezes ajuda a confirmar (ou descobrir) padrões matemáticos na prática.',
      },
    },
  },

  arte: {
    titulo: 'Nina no Museu Mágico',
    emoji: '🎨',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🏛️',
        texto: 'Nina visita um museu incrível e precisa escolher qual sala explorar primeiro: a sala de pintura ou a sala de música.',
        escolhas: [
          { texto: 'Ir para a sala de pintura', proximo: 'pintura' },
          { texto: 'Ir para a sala de música', proximo: 'musica' },
        ],
      },
      pintura: {
        emoji: '🖼️',
        texto: 'Nina para diante de um quadro cheio de cores vibrantes. Ela pode misturar tintas para criar uma cor nova ou tentar copiar o quadro exatamente como está.',
        escolhas: [
          { texto: 'Misturar tintas e criar uma cor nova', proximo: 'fim_arte_aventureiro' },
          { texto: 'Copiar o quadro original com cuidado', proximo: 'fim_arte_sabio' },
        ],
      },
      musica: {
        emoji: '🎻',
        texto: 'Uma orquestra ensaia na sala ao lado. Nina pode pegar um instrumento e tentar tocar junto ou compor uma melodia totalmente nova no papel.',
        escolhas: [
          { texto: 'Tocar um instrumento com a orquestra', proximo: 'fim_arte_heroi' },
          { texto: 'Compor uma melodia nova', proximo: 'fim_arte_cientista' },
        ],
      },
      fim_arte_aventureiro: {
        emoji: '🟣', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Nina mistura vermelho com azul e vê o roxo aparecer na hora! As três cores primárias — vermelho, azul e amarelo — podem criar praticamente qualquer cor do mundo.',
        licao: 'Misturando apenas três cores primárias (vermelho, azul e amarelo), é possível criar quase todas as outras cores.',
      },
      fim_arte_sabio: {
        emoji: '✍️', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Copiar o quadro ensina Nina a observar detalhes que ela nunca tinha notado — pinceladas, sombras, luz. Grandes artistas da história aprenderam copiando os mestres antes de criar seu próprio estilo.',
        licao: 'Copiar obras de grandes artistas é uma forma tradicional e valiosa de aprender técnica antes de desenvolver estilo próprio.',
      },
      fim_arte_heroi: {
        emoji: '🎼', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Tocando junto com a orquestra, Nina sente como cada instrumento se encaixa nos outros para formar algo maior — música é um dos poucos momentos em que dezenas de pessoas criam a mesma coisa ao mesmo tempo.',
        licao: 'Uma orquestra mostra como a colaboração entre muitas pessoas pode criar algo mais bonito do que qualquer um sozinho.',
      },
      fim_arte_cientista: {
        emoji: '🔊', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Compondo, Nina descobre que cada nota musical é, na verdade, uma vibração no ar com uma frequência específica — música é arte, mas também é física pura.',
        licao: 'Som é vibração do ar em diferentes frequências — a música combina arte e ciência ao mesmo tempo.',
      },
    },
  },

  historia_brasil: {
    titulo: 'Pedro Viaja no Tempo',
    emoji: '🇧🇷',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '⏳',
        texto: 'Uma máquina do tempo leva Pedro para o passado do Brasil. Ele pode escolher visitar o Brasil Colonial de 1500 ou o momento da Independência em 1822.',
        escolhas: [
          { texto: 'Visitar o Brasil Colonial (1500)', proximo: 'colonial' },
          { texto: 'Visitar a Independência (1822)', proximo: 'independencia' },
        ],
      },
      colonial: {
        emoji: '⛵',
        texto: 'Pedro chega em 1500 e vê os primeiros navios portugueses chegando à costa. Ele pode conversar com os povos indígenas que já viviam ali ou explorar a mata para ver a riqueza natural da terra nova.',
        escolhas: [
          { texto: 'Conversar com os povos indígenas', proximo: 'fim_brasil_sabio' },
          { texto: 'Explorar a mata', proximo: 'fim_brasil_aventureiro' },
        ],
      },
      independencia: {
        emoji: '👑',
        texto: 'Pedro chega em 1822, num momento histórico. Ele pode assistir ao grito da Independência às margens do Ipiranga ou visitar a corte portuguesa para entender o que estava em jogo.',
        escolhas: [
          { texto: 'Assistir ao grito da Independência', proximo: 'fim_brasil_heroi' },
          { texto: 'Visitar a corte portuguesa', proximo: 'fim_brasil_cientista' },
        ],
      },
      fim_brasil_sabio: {
        emoji: '🪶', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Os povos indígenas mostram a Pedro que já viviam no território há milhares de anos, com línguas, culturas e conhecimentos próprios muito antes da chegada dos europeus.',
        licao: 'Povos indígenas viviam no território brasileiro há milhares de anos antes da chegada dos colonizadores europeus.',
      },
      fim_brasil_aventureiro: {
        emoji: '🌳', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Pedro se maravilha com a Mata Atlântica intocada, cheia de árvores gigantes, animais e rios cristalinos — uma das florestas mais ricas em biodiversidade do planeta.',
        licao: 'O Brasil colonial tinha uma das florestas mais ricas em biodiversidade do mundo, a Mata Atlântica.',
      },
      fim_brasil_heroi: {
        emoji: '📯', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Pedro assiste a Dom Pedro I declarando "Independência ou Morte!" às margens do rio Ipiranga — o momento em que o Brasil deixou de ser colônia de Portugal.',
        licao: 'A Independência do Brasil foi declarada em 7 de setembro de 1822, às margens do rio Ipiranga.',
      },
      fim_brasil_cientista: {
        emoji: '🏰', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Na corte, Pedro entende os bastidores: a família real portuguesa havia se mudado para o Brasil anos antes, o que mudou para sempre a relação entre os dois países até a Independência.',
        licao: 'A vinda da família real portuguesa para o Brasil em 1808 foi um passo importante que antecedeu e influenciou a Independência.',
      },
    },
  },

  frutas: {
    titulo: 'Léo no Pomar Encantado',
    emoji: '🍓',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🌸',
        texto: 'Léo está num pomar cheio de flores e árvores frutíferas. Ele pode seguir uma abelha que está polinizando as flores ou plantar uma semente para ver o que nasce.',
        escolhas: [
          { texto: 'Seguir a abelha polinizadora', proximo: 'abelha' },
          { texto: 'Plantar uma semente', proximo: 'semente' },
        ],
      },
      abelha: {
        emoji: '🐝',
        texto: 'A abelha visita flor por flor, carregando pólen. Léo pode observar de perto como o pólen gruda nas patinhas dela ou segui-la até a colmeia para ver o que ela faz com tudo isso.',
        escolhas: [
          { texto: 'Observar de perto o pólen grudando', proximo: 'fim_frutas_cientista' },
          { texto: 'Seguir a abelha até a colmeia', proximo: 'fim_frutas_sabio' },
        ],
      },
      semente: {
        emoji: '🌱',
        texto: 'Léo planta uma sementinha de fruta na terra fofa. Ele pode regar todos os dias com carinho ou esperar que a chuva natural cuide da planta sozinha.',
        escolhas: [
          { texto: 'Regar a planta todos os dias', proximo: 'fim_frutas_heroi' },
          { texto: 'Esperar a chuva cuidar da planta', proximo: 'fim_frutas_aventureiro' },
        ],
      },
      fim_frutas_cientista: {
        emoji: '🌼', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Léo vê o pólen amarelo grudando nas patinhas da abelha. Quando ela visita a próxima flor, esse pólen se espalha, e é assim que a fruta começa a se formar!',
        licao: 'A polinização acontece quando pólen de uma flor é transportado para outra — é o primeiro passo para uma fruta nascer.',
      },
      fim_frutas_sabio: {
        emoji: '🏠', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Na colmeia, Léo vê milhares de abelhas trabalhando juntas, cada uma com uma função — algumas cuidam das crias, outras buscam pólen, outras protegem a colmeia. Um trabalho em equipe perfeito.',
        licao: 'Uma colmeia funciona como uma sociedade organizada, onde cada abelha tem um papel específico para o bem do grupo.',
      },
      fim_frutas_heroi: {
        emoji: '💧', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Com água e cuidado todos os dias, a plantinha de Léo cresce forte e rápido, dando os primeiros frutos em pouco tempo. O cuidado constante faz toda a diferença.',
        licao: 'Plantas cuidadas com regularidade crescem mais saudáveis e produzem frutos mais rápido do que plantas sem cuidado.',
      },
      fim_frutas_aventureiro: {
        emoji: '☔', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Léo espera pacientemente, e a chuva realmente cuida da plantinha — mas demora bem mais tempo para os primeiros frutos aparecerem. A natureza tem seu próprio ritmo.',
        licao: 'Plantas conseguem crescer sem cuidado humano, mas geralmente de forma mais lenta e imprevisível, no ritmo da natureza.',
      },
    },
  },

  fisica: {
    titulo: 'Júlia no Laboratório Quântico',
    emoji: '⚛️',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🔬',
        texto: 'Júlia entra num laboratório de física avançada e precisa escolher o que estudar primeiro: o estranho mundo quântico ou a relatividade do tempo.',
        escolhas: [
          { texto: 'Estudar o mundo quântico', proximo: 'quantico' },
          { texto: 'Estudar a relatividade do tempo', proximo: 'relatividade' },
        ],
      },
      quantico: {
        emoji: '⚡',
        texto: 'Júlia observa um elétron que parece estar em vários lugares ao mesmo tempo — isso se chama superposição. Ela pode medir o elétron agora (fazendo-o "escolher" um estado) ou deixá-lo sem medir por mais tempo.',
        escolhas: [
          { texto: 'Medir o elétron agora', proximo: 'fim_fisica_cientista' },
          { texto: 'Deixar sem medir por mais tempo', proximo: 'fim_fisica_sabio' },
        ],
      },
      relatividade: {
        emoji: '🪐',
        texto: 'Júlia percebe que o tempo passa mais devagar perto de um planeta muito massivo. Ela pode se aproximar do planeta para sentir o efeito ou ficar de longe medindo o tempo normalmente.',
        escolhas: [
          { texto: 'Aproximar-se do planeta massivo', proximo: 'fim_fisica_aventureiro' },
          { texto: 'Ficar de longe medindo o tempo', proximo: 'fim_fisica_heroi' },
        ],
      },
      fim_fisica_cientista: {
        emoji: '🎯', ehFinal: true, tipoFinal: 'cientista',
        texto: 'No momento em que Júlia mede o elétron, ele "escolhe" instantaneamente um único estado — esse fenômeno se chama colapso da função de onda, e é um dos maiores mistérios da física moderna.',
        licao: 'Medir uma partícula quântica faz com que ela "escolha" um único estado — os cientistas chamam isso de colapso quântico.',
      },
      fim_fisica_sabio: {
        emoji: '❓', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Sem medir, o elétron continua existindo em múltiplos estados possíveis ao mesmo tempo. É essa propriedade estranha que torna os computadores quânticos incrivelmente poderosos.',
        licao: 'A superposição quântica — existir em vários estados ao mesmo tempo — é a base do poder dos computadores quânticos.',
      },
      fim_fisica_aventureiro: {
        emoji: '🕐', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Perto do planeta massivo, Júlia sente o tempo passar visivelmente mais devagar comparado a longe dele — exatamente como Einstein previu há mais de 100 anos.',
        licao: 'Quanto mais forte a gravidade de um objeto, mais devagar o tempo passa perto dele — um efeito real, não apenas teoria.',
      },
      fim_fisica_heroi: {
        emoji: '🛰️', ehFinal: true, tipoFinal: 'heroi',
        texto: 'De longe, Júlia entende por que isso importa no dia a dia: os satélites de GPS precisam corrigir constantemente essa diferença de tempo, ou o GPS erraria localizações por quilômetros!',
        licao: 'Os satélites de GPS precisam de correções baseadas na relatividade, ou o GPS erraria localizações por quilômetros.',
      },
    },
  },

  profissoes: {
    titulo: 'O Dia da Profissão de Rafa',
    emoji: '👷',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🎒',
        texto: 'É o dia da profissão na escola de Rafa, e ele pode visitar dois lugares: um hospital ou o corpo de bombeiros.',
        escolhas: [
          { texto: 'Visitar o hospital', proximo: 'hospital' },
          { texto: 'Visitar o corpo de bombeiros', proximo: 'bombeiros' },
        ],
      },
      hospital: {
        emoji: '🏥',
        texto: 'No hospital, Rafa conhece uma médica cuidando de vários pacientes ao mesmo tempo. Ele pode ajudar a organizar os remédios na prateleira ou conversar com um paciente para animá-lo.',
        escolhas: [
          { texto: 'Ajudar a organizar os remédios', proximo: 'fim_prof_sabio' },
          { texto: 'Conversar com um paciente', proximo: 'fim_prof_heroi' },
        ],
      },
      bombeiros: {
        emoji: '🚒',
        texto: 'No quartel, Rafa vê o treino dos bombeiros. Ele pode treinar a escalada no caminhão-tanque ou aprender como funciona a mangueira de água sob pressão.',
        escolhas: [
          { texto: 'Treinar a escalada', proximo: 'fim_prof_aventureiro' },
          { texto: 'Aprender sobre a mangueira', proximo: 'fim_prof_cientista' },
        ],
      },
      fim_prof_sabio: {
        emoji: '💊', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Organizando os remédios com cuidado, Rafa entende que um pequeno erro poderia prejudicar um paciente — por isso hospitais têm regras rígidas de organização.',
        licao: 'Em hospitais, a organização cuidadosa evita erros que podem afetar a saúde dos pacientes — atenção aos detalhes salva vidas.',
      },
      fim_prof_heroi: {
        emoji: '🗣️', ehFinal: true, tipoFinal: 'heroi',
        texto: 'A conversa deixa o paciente sorrindo pela primeira vez no dia. Rafa descobre que cuidar não é só remédio — a empatia também faz parte da cura.',
        licao: 'Além dos remédios, o cuidado humano e a empatia também são parte importante do processo de cura em hospitais.',
      },
      fim_prof_aventureiro: {
        emoji: '🧗', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Escalar o caminhão exige força, equilíbrio e muita coragem — os bombeiros treinam isso todos os dias para conseguir chegar rápido onde for preciso, mesmo em situações difíceis.',
        licao: 'Bombeiros treinam diariamente força e agilidade porque cada segundo pode ser decisivo numa emergência.',
      },
      fim_prof_cientista: {
        emoji: '💦', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Rafa aprende que a água sai da mangueira com tanta força porque está sob alta pressão — a mesma física que faz um foguete decolar ajuda a apagar incêndios grandes!',
        licao: 'A pressão da água em mangueiras de bombeiros usa os mesmos princípios de física de propulsão de foguetes.',
      },
    },
  },

  filosofia: {
    titulo: 'Igor e o Robô Pensante',
    emoji: '🧩',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🤖',
        texto: 'Igor conhece um robô com inteligência artificial muito avançada. Ele pode perguntar se o robô realmente "pensa" de verdade ou testar se as decisões do robô são justas com todos.',
        escolhas: [
          { texto: 'Perguntar se o robô pensa de verdade', proximo: 'pensa' },
          { texto: 'Testar se o robô é justo', proximo: 'justo' },
        ],
      },
      pensa: {
        emoji: '💭',
        texto: 'O robô responde de forma tão humana que Igor fica em dúvida. Ele pode tentar "enganar" o robô com perguntas difíceis ou aceitar que talvez ninguém saiba a resposta certa ainda.',
        escolhas: [
          { texto: 'Tentar enganar o robô com perguntas difíceis', proximo: 'fim_filo_cientista' },
          { texto: 'Aceitar que a resposta ainda é um mistério', proximo: 'fim_filo_sabio' },
        ],
      },
      justo: {
        emoji: '⚖️',
        texto: 'Igor descobre que o robô decide quem ganha um prêmio escolar. Ele pode verificar se a decisão foi justa com todos os alunos ou simplesmente confiar no robô sem checar nada.',
        escolhas: [
          { texto: 'Verificar se a decisão foi justa', proximo: 'fim_filo_heroi' },
          { texto: 'Confiar no robô sem checar', proximo: 'fim_filo_aventureiro' },
        ],
      },
      fim_filo_cientista: {
        emoji: '🎭', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Igor está recriando o famoso Teste de Turing, criado em 1950: se um humano não consegue distinguir se está conversando com uma máquina ou uma pessoa, a máquina pode ser considerada "inteligente"?',
        licao: 'O Teste de Turing (1950) propõe que uma máquina é "inteligente" se consegue convencer humanos de que é humana numa conversa.',
      },
      fim_filo_sabio: {
        emoji: '🦉', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Igor lembra da frase do filósofo grego Sócrates: "só sei que nada sei". Reconhecer que não temos todas as respostas é o primeiro passo para pensar com sabedoria.',
        licao: 'Sócrates ensinava que reconhecer os próprios limites de conhecimento é o começo da verdadeira sabedoria.',
      },
      fim_filo_heroi: {
        emoji: '🔍', ehFinal: true, tipoFinal: 'heroi',
        texto: 'Ao verificar, Igor descobre que o robô estava favorecendo alunos parecidos com os dados que "aprendeu" antes — isso se chama viés algorítmico, e ele ajuda a corrigir o problema a tempo.',
        licao: 'Viés algorítmico acontece quando uma IA aprende e repete preconceitos escondidos nos dados usados para treiná-la.',
      },
      fim_filo_aventureiro: {
        emoji: '😬', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Sem checar, Igor só percebe depois que a decisão do robô não foi justa com alguns colegas. Ele aprende, com esse tropeço, que confiar cegamente em algoritmos pode causar injustiças reais.',
        licao: 'Confiar cegamente em decisões automatizadas sem checagem humana pode reproduzir injustiças sem que ninguém perceba a tempo.',
      },
    },
  },

  formas_cores: {
    titulo: 'Mel e a Caixa de Tintas Mágicas',
    emoji: '🔷',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '🎨',
        texto: 'Mel encontra uma caixa de tintas mágicas que fala! Ela pode pintar com as cores do arco-íris ou desenhar formas geométricas que ganham vida.',
        escolhas: [
          { texto: 'Pintar com as cores', proximo: 'cores' },
          { texto: 'Desenhar formas geométricas', proximo: 'formas' },
        ],
      },
      cores: {
        emoji: '🌈',
        texto: 'A caixa tem três potinhos mágicos: vermelho, azul e amarelo. Mel pode misturar vermelho com azul ou misturar azul com amarelo para ver a mágica acontecer.',
        escolhas: [
          { texto: 'Misturar vermelho com azul', proximo: 'fim_cores_sabio' },
          { texto: 'Misturar azul com amarelo', proximo: 'fim_cores_aventureiro' },
        ],
      },
      formas: {
        emoji: '🔵',
        texto: 'No chão mágico aparecem um círculo e um quadrado, os dois piscando. Mel pode fazer o círculo rolar pelo chão ou empilhar quadrados para construir uma torre.',
        escolhas: [
          { texto: 'Fazer o círculo rolar', proximo: 'fim_formas_heroi' },
          { texto: 'Empilhar os quadrados', proximo: 'fim_formas_cientista' },
        ],
      },
      fim_cores_sabio: {
        emoji: '🟣', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Vermelho e azul se misturam e — puf! — vira roxo, brilhando na caixinha! A mágica das cores é real: cada mistura cria algo totalmente novo.',
        licao: 'Misturando vermelho com azul, sempre nasce o roxo — essa combinação é a mesma em qualquer lugar do mundo!',
      },
      fim_cores_aventureiro: {
        emoji: '🟢', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'Azul e amarelo se misturam e viram um verde vibrante, igual à cor das folhas e da grama lá fora!',
        licao: 'Misturando azul com amarelo, nasce o verde — a mesma cor que colore as plantas na natureza.',
      },
      fim_formas_heroi: {
        emoji: '⚽', ehFinal: true, tipoFinal: 'heroi',
        texto: 'O círculo rola suavemente pelo chão sem parar — ele não tem nenhum cantinho para travar! É por isso que rodas, bolas e moedas têm essa forma.',
        licao: 'O círculo não tem cantos, por isso rola facilmente — por isso rodas e bolas são sempre redondas.',
      },
      fim_formas_cientista: {
        emoji: '🧱', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Os quadrados se empilham perfeitinhos, um em cima do outro, formando uma torre firme — porque todos os lados de um quadrado têm o mesmo tamanho!',
        licao: 'O quadrado tem 4 lados iguais e 4 cantos retos, por isso é fácil empilhar e construir com essa forma.',
      },
    },
  },

  transporte: {
    titulo: 'A Entrega Urgente de Gui',
    emoji: '🚗',
    inicio: 'inicio',
    nos: {
      inicio: {
        emoji: '✉️',
        texto: 'Gui precisa entregar uma carta muito importante o mais rápido possível para outra cidade. Ele pode escolher ir de trem-bala ou de avião.',
        escolhas: [
          { texto: 'Ir de trem-bala', proximo: 'trem' },
          { texto: 'Ir de avião', proximo: 'aviao' },
        ],
      },
      trem: {
        emoji: '🚄',
        texto: 'Gui embarca no trem-bala superveloz. Ele pode ficar admirando a paisagem passando borrada pela janela ou cronometrar exatamente quanto tempo a viagem está levando.',
        escolhas: [
          { texto: 'Admirar a velocidade pela janela', proximo: 'fim_transp_aventureiro' },
          { texto: 'Cronometrar o tempo da viagem', proximo: 'fim_transp_cientista' },
        ],
      },
      aviao: {
        emoji: '✈️',
        texto: 'Gui embarca no avião e sente a decolagem. Ele pode olhar as nuvens pela janelinha ou ir até a cabine perguntar ao piloto como o avião consegue voar.',
        escolhas: [
          { texto: 'Olhar as nuvens pela janelinha', proximo: 'fim_transp_sabio' },
          { texto: 'Perguntar ao piloto como o avião voa', proximo: 'fim_transp_heroi' },
        ],
      },
      fim_transp_aventureiro: {
        emoji: '💨', ehFinal: true, tipoFinal: 'aventureiro',
        texto: 'A paisagem passa tão rápido que vira um borrão colorido — o trem-bala do Japão pode chegar a 320 km por hora, mais rápido que muitos carros de corrida!',
        licao: 'O trem-bala japonês pode atingir até 320 km/h, uma das formas de transporte terrestre mais rápidas do mundo.',
      },
      fim_transp_cientista: {
        emoji: '⏱️', ehFinal: true, tipoFinal: 'cientista',
        texto: 'Gui cronometra e descobre que a viagem que levaria horas de carro dura apenas alguns minutos de trem-bala — velocidade e tempo estão sempre ligados na física do movimento.',
        licao: 'Quanto maior a velocidade de um transporte, menor o tempo necessário para percorrer a mesma distância.',
      },
      fim_transp_sabio: {
        emoji: '☁️', ehFinal: true, tipoFinal: 'sabio',
        texto: 'Gui vê o mundo lá de cima, pequeno e bonito entre as nuvens. Viajar de avião muda completamente a forma como enxergamos a imensidão do planeta.',
        licao: 'Viajar de avião permite ver o mundo de uma perspectiva única, revelando o tamanho real das cidades e paisagens.',
      },
      fim_transp_heroi: {
        emoji: '🛫', ehFinal: true, tipoFinal: 'heroi',
        texto: 'O piloto explica que as asas do avião são desenhadas para criar uma força chamada sustentação, que empurra o avião para cima. Os irmãos Wright descobriram esse segredo há mais de 100 anos, em 1903.',
        licao: 'Os irmãos Wright inventaram o primeiro avião motorizado em 1903, usando o princípio da sustentação aerodinâmica.',
      },
    },
  },
}

export const TIPOS_FINAL = {
  heroi:       { label: 'Final Herói',       emoji: '🦸' },
  sabio:       { label: 'Final Sábio',       emoji: '🦉' },
  aventureiro: { label: 'Final Aventureiro', emoji: '🧭' },
  cientista:   { label: 'Final Cientista',   emoji: '🔬' },
}
