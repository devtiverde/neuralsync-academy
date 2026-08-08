// ──────────────────────────────────────────────────────────────────────
// ATIVIDADES EXTRA — CONSTRUTORES (6–8 anos)
//
// Este arquivo é a FONTE DA VERDADE das atividades extra desta faixa.
// Atividade nova desta faixa entra AQUI, não no atividadesExtra.js (que hoje
// é só um barril de compatibilidade que junta as quatro faixas de novo).
//
// Existe separado porque a criança é de UMA faixa: carregar as quatro para
// usar uma mandava ~3/4 do maior arquivo do projeto para o celular à toa.
//
// Ao criar atividade nova, os 3 passos de sempre continuam valendo:
// rota em App.jsx + tipoGradiente/hubItens em HomeCrianca + kidsLinks.js.
// ──────────────────────────────────────────────────────────────────────

// ── Alfabeto ──
export const alfabetoExtraPorFaixa = [
  {
    id: "con_alfabeto_profissoes",
    tipo: "alfabeto",
    titulo: "Profissões de A a Z",
    descricao: "Uma profissão incrível para cada letra!",
    emoji: "👩‍🔬",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "A Feira de Carreiras chegou à cidade! 👩‍🔬 Cada letra do alfabeto tem uma profissão fascinante esperando por você. Clique em 🔊 e descubra o que cada pessoa faz!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Astronauta",
          emoji: "🚀",
          funfato: "Astronautas treinam por no mínimo 10 anos antes de ir ao espaço!",
          detalhe: "NASA: medicina, física, engenharia, pilotagem | Microgravidade: perda muscular/óssea"
        },
        {
          letra: "B",
          palavra: "Bióloga/o",
          emoji: "🧬",
          funfato: "Biólogos estudam desde vírus microscópicos até a maior baleia-azul!",
          detalhe: "Ciências da Vida | Molecular, celular, evolutiva, ecologia | 8,7Mi espécies"
        },
        {
          letra: "C",
          palavra: "Cirurgião/ã",
          emoji: "🏥",
          funfato: "Cirurgiões passam em média 13 anos estudando antes de operar sozinhos!",
          detalhe: "Medicina (6a) + Residência (5-7a) + Especialização | Robótica cirúrgica: Da Vinci"
        },
        {
          letra: "D",
          palavra: "Designer",
          emoji: "🎨",
          funfato: "Designers pensam em como as coisas ficam bonitas E como funcionam ao mesmo tempo!",
          detalhe: "UX/UI, Gráfico, Industrial, de Moda | Bauhaus 1919 | Design Thinking"
        },
        {
          letra: "E",
          palavra: "Engenheira/o",
          emoji: "⚙️",
          funfato: "Engenheiros projetam tudo ao nosso redor — do celular ao foguete!",
          detalhe: "Civil, mecânica, elétrica, computação, química, aeroespacial | STEM"
        },
        {
          letra: "F",
          palavra: "Fotógrafo/a",
          emoji: "📸",
          funfato: "Os primeiros fotógrafos precisavam que o modelo ficasse parado por minutos!",
          detalhe: "Daguerreótipo 1839 | Exposição longa | Digital 1975 | 1 trilhão de fotos/ano"
        },
        {
          letra: "G",
          palavra: "Geóloga/o",
          emoji: "🪨",
          funfato: "Geólogos descobrem a idade de uma pedra só olhando suas camadas!",
          detalhe: "Estratigrafia | Datação radiométrica: C-14, U-Pb | Mineração, petróleo, ambiental"
        },
        {
          letra: "H",
          palavra: "Historiador/a",
          emoji: "📜",
          funfato: "Historiadores estudam o passado para entender o presente e preparar o futuro!",
          detalhe: "Primária (documentos originais) vs Secundária (interpretações) | Arqueologia"
        },
        {
          letra: "I",
          palavra: "Inventor/a",
          emoji: "💡",
          funfato: "Thomas Edison tentou mais de 1.000 vezes antes de inventar a lâmpada!",
          detalhe: "1.093 patentes de Edison | Problema → hipótese → prototipagem → teste"
        },
        {
          letra: "J",
          palavra: "Jornalista",
          emoji: "📰",
          funfato: "Jornalistas têm o direito de guardar o segredo de suas fontes em quase todo o mundo!",
          detalhe: "Liberdade de imprensa | Sigilo de fonte | 5 Ws (Who, What, When, Where, Why)"
        },
        {
          letra: "K",
          palavra: "Kinesiologista",
          emoji: "💪",
          funfato: "Kinesiologistas estudam como o corpo humano se move para prevenir lesões!",
          detalhe: "Ciência do Movimento | Biomecânica | Reabilitação | Análise de marcha"
        },
        {
          letra: "L",
          palavra: "Linguista",
          emoji: "📚",
          funfato: "Existem mais de 7.000 línguas no mundo — e linguistas estudam todas!",
          detalhe: "7.151 línguas ativas | Fonética, sintaxe, semântica | 2.900 em risco de extinção"
        },
        {
          letra: "M",
          palavra: "Matemática/o",
          emoji: "➕",
          funfato: "Matemáticos encontram padrões em coisas que parecem completamente aleatórias!",
          detalhe: "Pura (abstrata) vs Aplicada | Teorema de Fermat: 358 anos para provar"
        },
        {
          letra: "N",
          palavra: "Neurocientista",
          emoji: "🧠",
          funfato: "Neurocientistas descobriram que o cérebro tem 86 bilhões de neurônios!",
          detalhe: "Neurônios: 86Bi | Sinapses: 100 trilhões | Neuroplasticidade: cérebro muda"
        },
        {
          letra: "O",
          palavra: "Oceanógrafo/a",
          emoji: "🌊",
          funfato: "Conhecemos menos de 20% do fundo do mar — há muito ainda para descobrir!",
          detalhe: "<20% mapeado | Zona Hadal (-6.000m) | Alvin submersível (1964)"
        },
        {
          letra: "P",
          palavra: "Professor/a",
          emoji: "📝",
          funfato: "A profissão de professor existe desde antes da escrita — Sócrates não escreveu nada!",
          detalhe: "Sócrates: método dialógico | Iluminismo: educação universal | Brasil: 2,2Mi professores"
        },
        {
          letra: "Q",
          palavra: "Química/o",
          emoji: "⚗️",
          funfato: "Químicos desenvolvem remédios, plásticos, fertilizantes e muito mais!",
          detalhe: "Orgânica/Inorgânica/Analítica | Nobel: Marie Curie (1911) | 200Mi compostos"
        },
        {
          letra: "R",
          palavra: "Robótica/o",
          emoji: "🤖",
          funfato: "Robóticos programam robôs que podem fazer cirurgias ou ir a Marte!",
          detalhe: "Mecatrônica + IA + Computação | ROS | Curiosity (2012) | Indústria 4.0"
        },
        {
          letra: "S",
          palavra: "Socióloga/o",
          emoji: "👥",
          funfato: "Sociólogos estudam como as pessoas se comportam em grupos — de família a países!",
          detalhe: "Auguste Comte (1838) | Estrutura social, mobilidade | Weber, Durkheim, Marx"
        },
        {
          letra: "T",
          palavra: "Tecnólogo/a",
          emoji: "💻",
          funfato: "Tecnólogos resolvem problemas práticos usando ciência e criatividade!",
          detalhe: "STEM aplicado | Curso 2-3 anos | Desenvolvimento de produto, inovação"
        },
        {
          letra: "U",
          palavra: "Urbanista",
          emoji: "🏙️",
          funfato: "Urbanistas planejam cidades para que parques, transporte e casas fiquem no lugar certo!",
          detalhe: "Planejamento urbano | Zoneamento | Curitiba: modelo de transporte mundial"
        },
        {
          letra: "V",
          palavra: "Veterinária/o",
          emoji: "🐾",
          funfato: "Veterinários tratam mais de 100 espécies diferentes de animais!",
          detalhe: "Medicina Animal | Zoonoses | Silvestres, domésticos, produção | 5-6 anos"
        },
        {
          letra: "W",
          palavra: "Web Developer",
          emoji: "🌐",
          funfato: "Web developers constroem todos os sites e apps que você usa todo dia!",
          detalhe: "Frontend (HTML/CSS/JS) + Backend (Python/Node) + Fullstack | mais de 1 bilhão de sites"
        },
        {
          letra: "X",
          palavra: "Xilogravurista",
          emoji: "🎨",
          funfato: "Xilogravuristas criam arte entalhando madeira à mão — técnica com 2.000 anos!",
          detalhe: "Xilogravura: China séc. V | Gutenberg: tipo móvel | Cordel nordestino"
        },
        {
          letra: "Y",
          palavra: "Youtuber",
          emoji: "📱",
          funfato: "Criadores de conteúdo precisam saber roteiro, câmera, edição, SEO e marketing!",
          detalhe: "Creator economy | Múltiplas habilidades | Algoritmo de recomendação"
        },
        {
          letra: "Z",
          palavra: "Zoóloga/o",
          emoji: "🦁",
          funfato: "Zoólogos descobrem novas espécies de animais todo ano — ainda há muito para explorar!",
          detalhe: "1.000 novas espécies/ano | Taxonomia | Comportamento animal | Etologia"
        }
      ]
    }
  },
  {
    id: "con_alfabeto_natureza",
    tipo: "alfabeto",
    titulo: "Natureza de A a Z",
    descricao: "Um elemento da natureza para cada letra!",
    emoji: "🌍",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "A Terra guarda um tesouro natural para cada letra do alfabeto! 🌍 Clique em 🔊 e explore rios, vulcões, glaciares e muito mais!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Água",
          emoji: "💧",
          funfato: "A água é essencial pra toda vida no planeta — nosso corpo é feito de mais água do que qualquer outra coisa!",
          detalhe: "H₂O | 71% da superfície da Terra | Estados: sólido, líquido e gasoso"
        },
        {
          letra: "B",
          palavra: "Borboleta",
          emoji: "🦋",
          funfato: "A borboleta começa a vida como uma lagarta e se transforma dentro de um casulo — isso se chama metamorfose!",
          detalhe: "Lepidoptera | Metamorfose completa | Asas cobertas de escamas coloridas"
        },
        {
          letra: "C",
          palavra: "Coral",
          emoji: "🪸",
          funfato: "Os recifes de coral são como cidades cheias de peixes coloridos escondidos no fundo do mar!",
          detalhe: "Exoesqueleto de CaCO₃ | Abriga 25% da vida marinha | Recifes: Grande Barreira"
        },
        {
          letra: "D",
          palavra: "Deserto",
          emoji: "🏜️",
          funfato: "No deserto faz muito calor de dia e muito frio de noite — e chove pouquíssimo o ano inteiro!",
          detalhe: "Precipitação <250mm/ano | Saara: maior deserto quente | Antártida: maior deserto frio"
        },
        {
          letra: "E",
          palavra: "Erva",
          emoji: "🌿",
          funfato: "As ervas são plantas pequenas que crescem rápido e algumas até servem de tempero pra comida!",
          detalhe: "Plantas herbáceas | Caule não lenhoso | Usadas em culinária e medicina"
        },
        {
          letra: "F",
          palavra: "Fóssil",
          emoji: "🦕",
          funfato: "Um fóssil é o rastro de um bicho ou planta que viveu há milhões de anos e virou pedra!",
          detalhe: "Permineralização | Estratigrafia | Fóssil mais antigo: 3,5 bilhões de anos"
        },
        {
          letra: "G",
          palavra: "Gelo",
          emoji: "❄️",
          funfato: "O gelo é a água tão gelada que fica dura — em alguns lugares do mundo ela nunca derrete!",
          detalhe: "Água sólida abaixo de 0°C | Geleiras cobrem 10% da superfície terrestre"
        },
        {
          letra: "H",
          palavra: "Horta",
          emoji: "🥬",
          funfato: "Numa horta você planta sementinhas e cuida delas até virarem legumes e verduras pra comer!",
          detalhe: "Cultivo de hortaliças | Compostagem | Rotação de culturas"
        },
        {
          letra: "I",
          palavra: "Ilha",
          emoji: "🏝️",
          funfato: "Uma ilha é um pedaço de terra cercado de água por todos os lados!",
          detalhe: "Groenlândia: maior ilha do mundo, 2,16Mi km² | Oceânica, continental, fluvial"
        },
        {
          letra: "J",
          palavra: "Jangada",
          emoji: "🌊",
          funfato: "A jangada é um barco simples feito de troncos amarrados, usado por pescadores no litoral do Brasil!",
          detalhe: "Embarcação tradicional nordestina | Vela triangular | Pesca artesanal"
        },
        {
          letra: "K",
          palavra: "Kiwi",
          emoji: "🥝",
          funfato: "O kiwi é uma fruta peluda por fora e verde por dentro, cheia de sementinhas pretas!",
          detalhe: "Actinidia deliciosa | Rica em vitamina C | Originária da China"
        },
        {
          letra: "L",
          palavra: "Lago",
          emoji: "🏞️",
          funfato: "Um lago é como um grande poço de água cercado de terra — diferente do rio, a água quase não corre!",
          detalhe: "Corpo de água doce parado | Lago Titicaca: mais alto navegável do mundo"
        },
        {
          letra: "M",
          palavra: "Montanha",
          emoji: "⛰️",
          funfato: "As montanhas são pedaços de terra bem altos — o topo das mais altas fica sempre coberto de neve!",
          detalhe: "Formação por movimento de placas tectônicas | Everest: 8.849m, a mais alta"
        },
        {
          letra: "N",
          palavra: "Neve",
          emoji: "❄️",
          funfato: "A neve é feita de flocos de gelo que caem do céu quando está muito frio — e cada floco é diferente!",
          detalhe: "Cristais de gelo hexagonais | Formam-se em nuvens abaixo de 0°C"
        },
        {
          letra: "O",
          palavra: "Oceano",
          emoji: "🌊",
          funfato: "Os oceanos cobrem quase todo o planeta e escondem montanhas, vulcões e criaturas que ninguém nunca viu!",
          detalhe: "Cobre 71% da superfície terrestre | Pacífico: maior e mais profundo"
        },
        {
          letra: "P",
          palavra: "Praia",
          emoji: "🏖️",
          funfato: "A praia é onde a areia encontra o mar — um lugar cheio de conchinhas e ondas pra brincar!",
          detalhe: "Zona costeira | Areia: grãos de rocha e conchas | Formada por erosão e maré"
        },
        {
          letra: "Q",
          palavra: "Queda-d'água",
          emoji: "💦",
          funfato: "Uma queda-d'água acontece quando um rio encontra um degrau alto e a água despenca fazendo um barulho enorme!",
          detalhe: "Cachoeira | Salto Ángel: mais alta do mundo, 979m | Erosão diferencial da rocha"
        },
        {
          letra: "R",
          palavra: "Rio",
          emoji: "💧",
          funfato: "Um rio é um caminho de água doce que corre sem parar da nascente até desaguar no mar!",
          detalhe: "Bacia hidrográfica | Rio Amazonas: maior em volume de água do mundo"
        },
        {
          letra: "S",
          palavra: "Savana",
          emoji: "🦁",
          funfato: "A savana é um campo enorme com poucas árvores, onde vivem leões, girafas e zebras!",
          detalhe: "Bioma tropical com estação seca e chuvosa | Serengeti: savana africana famosa"
        },
        {
          letra: "T",
          palavra: "Terra",
          emoji: "🌍",
          funfato: "A terra debaixo dos seus pés é feita de camadas — a de cima é onde as plantas criam raízes!",
          detalhe: "Solo: composto por minerais, água, ar e matéria orgânica | Horizontes do solo"
        },
        {
          letra: "U",
          palavra: "Uva",
          emoji: "🍇",
          funfato: "As uvas crescem em cachinhos numa planta chamada videira, que se agarra em treliças pra subir!",
          detalhe: "Vitis vinifera | Cresce em vinhedos | Usada em sucos e passas"
        },
        {
          letra: "V",
          palavra: "Vulcão",
          emoji: "🌋",
          funfato: "Um vulcão é uma montanha que pode expelir lava, fumaça e pedras quentes lá de dentro da Terra!",
          detalhe: "1.500 vulcões ativos no mundo | Tipos: escudo, composto, caldeira"
        },
        {
          letra: "W",
          palavra: "Windsurfe",
          emoji: "🏄",
          funfato: "No windsurfe a pessoa usa o vento numa vela pra deslizar em cima da água do mar!",
          detalhe: "Esporte que combina surfe e vela | Depende da força do vento"
        },
        {
          letra: "X",
          palavra: "Xingu",
          emoji: "💧",
          funfato: "O Rio Xingu corta a Floresta Amazônica e é a casa de vários povos indígenas brasileiros!",
          detalhe: "Afluente do Rio Amazonas | Bacia com 51 povos indígenas | 1.980km de extensão"
        },
        {
          letra: "Y",
          palavra: "Yeti",
          emoji: "❄️",
          funfato: "Diz a lenda que o Yeti é uma criatura peluda gigante que vive escondida nas montanhas nevadas do Himalaia!",
          detalhe: "Criatura do folclore do Himalaia | Também chamado de \"Abominável Homem das Neves\""
        },
        {
          letra: "Z",
          palavra: "Zebra",
          emoji: "🦓",
          funfato: "A zebra vive nas savanas da África e as listras dela são únicas, como uma impressão digital!",
          detalhe: "Equus quagga | Listras únicas por indivíduo | Vive em grupos chamados bandos"
        }
      ]
    }
  },
  {
    id: "con_alfabeto_corpo",
    tipo: "alfabeto",
    titulo: "Corpo Humano de A a Z",
    descricao: "Uma parte do corpo humano para cada letra!",
    emoji: "🫀",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "O corpo humano tem mais de 78 órgãos — um para cada letra do alfabeto! 🫀 Clique em 🔊 e descubra como você funciona!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Axila",
          emoji: "💪",
          funfato: "A axila é a dobrinha embaixo do braço — é um dos lugares mais sensíveis a cócegas do corpo!",
          detalhe: "Região abaixo do ombro | Rica em glândulas sudoríparas e linfonodos"
        },
        {
          letra: "B",
          palavra: "Boca",
          emoji: "👄",
          funfato: "A boca é por onde você come, fala e sorri — e também ajuda a respirar quando o nariz está entupido!",
          detalhe: "Cavidade oral | Contém dentes, língua e glândulas salivares"
        },
        {
          letra: "C",
          palavra: "Cabelo",
          emoji: "💇",
          funfato: "Seu cabelo cresce cerca de 1 centímetro por mês e cada fio nasce de uma raiz embaixo da pele!",
          detalhe: "Queratina | Cresce ~1,25cm/mês | Cerca de 100 mil fios no couro cabeludo"
        },
        {
          letra: "D",
          palavra: "Dedo",
          emoji: "👆",
          funfato: "Você tem 10 dedos nas mãos e 10 nos pés, e cada um tem uma impressão digital só sua!",
          detalhe: "Falanges: proximal, média, distal | Impressões digitais únicas"
        },
        {
          letra: "E",
          palavra: "Estômago",
          emoji: "🍽️",
          funfato: "Seu estômago mistura a comida com sucos especiais que ajudam a digerir tudo que você come!",
          detalhe: "Órgão muscular em formato de J | Produz ácido clorídrico e enzimas digestivas"
        },
        {
          letra: "F",
          palavra: "Face",
          emoji: "😊",
          funfato: "Sua face tem os olhos, o nariz e a boca — é a parte da frente da cabeça que mostra suas expressões!",
          detalhe: "Região anterior do crânio | 43 músculos faciais | Expressa emoções"
        },
        {
          letra: "G",
          palavra: "Garganta",
          emoji: "🗣️",
          funfato: "A garganta é o caminho por onde passam o ar que você respira e a comida que você engole!",
          detalhe: "Faringe | Compartilhada pelos sistemas respiratório e digestivo"
        },
        {
          letra: "H",
          palavra: "Hálito",
          emoji: "👃",
          funfato: "O hálito é o ar que sai da sua boca — por isso a gente escova os dentes, pra ele ficar sempre fresquinho!",
          detalhe: "Composição do ar exalado | Bactérias bucais influenciam o odor"
        },
        {
          letra: "I",
          palavra: "Intestino",
          emoji: "🌀",
          funfato: "Seu intestino é bem comprido — se você esticasse ele todo, daria quase 7 metros, mas cabe dobradinho dentro de você!",
          detalhe: "Delgado: 6m | Grosso: 1,5m | Absorve nutrientes e água"
        },
        {
          letra: "J",
          palavra: "Joelho",
          emoji: "🦵",
          funfato: "O joelho é a maior dobra da perna — ele dobra pra você poder correr, pular e sentar!",
          detalhe: "Articulação sinovial | Envolve fêmur, tíbia e patela"
        },
        {
          letra: "K",
          palavra: "Vitamina K",
          emoji: "💊",
          funfato: "A Vitamina K ajuda seu sangue a formar uma casquinha e parar de sangrar quando você se machuca!",
          detalhe: "Coagulação sanguínea | Encontrada em vegetais verdes escuros"
        },
        {
          letra: "L",
          palavra: "Língua",
          emoji: "👅",
          funfato: "A língua tem milhares de papilas gustativas que sentem se a comida é doce, salgada ou azeda!",
          detalhe: "Músculo com papilas gustativas | Detecta doce, salgado, azedo, amargo, umami"
        },
        {
          letra: "M",
          palavra: "Mão",
          emoji: "✋",
          funfato: "Suas mãos têm 27 ossinhos cada uma — é por isso que os dedos conseguem se dobrar de tantos jeitos!",
          detalhe: "27 ossos por mão | Movimentos finos controlados pelo cérebro"
        },
        {
          letra: "N",
          palavra: "Nariz",
          emoji: "👃",
          funfato: "Seu nariz consegue reconhecer milhares de cheiros diferentes e também ajuda a esquentar o ar que você respira!",
          detalhe: "Órgão olfativo | Filtra, aquece e umidifica o ar inspirado"
        },
        {
          letra: "O",
          palavra: "Olho",
          emoji: "👁️",
          funfato: "Seus olhos piscam sozinhos cerca de 15 vezes por minuto pra manter tudo limpinho e molhadinho!",
          detalhe: "Globo ocular | Pisca ~15x/min | Retina capta luz e envia sinal ao cérebro"
        },
        {
          letra: "P",
          palavra: "Pé",
          emoji: "🦶",
          funfato: "Cada pé seu tem 26 ossos — quase um quarto de todos os ossos do corpo estão nos seus pés!",
          detalhe: "26 ossos por pé | Suporta todo o peso do corpo ao caminhar"
        },
        {
          letra: "Q",
          palavra: "Queixo",
          emoji: "🙂",
          funfato: "O queixo é a pontinha do rosto embaixo da boca — em alguns bebês ele nem apareceu direito ainda!",
          detalhe: "Mento | Parte da mandíbula | Formato varia entre pessoas"
        },
        {
          letra: "R",
          palavra: "Rim",
          emoji: "💧",
          funfato: "Seus rins funcionam como um filtro, limpando o sangue e transformando o que sobra em xixi!",
          detalhe: "Néfrons: 1 milhão por rim | Filtra e equilibra líquidos do corpo"
        },
        {
          letra: "S",
          palavra: "Sobrancelha",
          emoji: "🙂",
          funfato: "As sobrancelhas ajudam a proteger seus olhos do suor e da chuva escorrendo pela testa!",
          detalhe: "Pelos acima da órbita ocular | Protegem contra suor e partículas"
        },
        {
          letra: "T",
          palavra: "Tornozelo",
          emoji: "🦵",
          funfato: "O tornozelo é a dobra entre a perna e o pé — ele te ajuda a manter o equilíbrio quando você anda!",
          detalhe: "Articulação entre tíbia, fíbula e tálus | Fundamental pro equilíbrio"
        },
        {
          letra: "U",
          palavra: "Umbigo",
          emoji: "🌀",
          funfato: "Seu umbigo é a marquinha que sobrou de quando você ainda estava ligado à sua mãe pelo cordão umbilical!",
          detalhe: "Cicatriz do cordão umbilical | Formato varia: \"para dentro\" ou \"para fora\""
        },
        {
          letra: "V",
          palavra: "Veia",
          emoji: "🩸",
          funfato: "As veias são os caminhos que levam o sangue de volta pro coração — você consegue ver algumas azuizinhas por baixo da pele!",
          detalhe: "Transporta sangue de volta ao coração | Possui válvulas que impedem refluxo"
        },
        {
          letra: "W",
          palavra: "Watt",
          emoji: "⚡",
          funfato: "Watt mede potência: quanta energia seu corpo gasta a cada segundo pra se mexer e se aquecer!",
          detalhe: "Unidade de potência (J/s) | Corpo em repouso gasta ~100W"
        },
        {
          letra: "X",
          palavra: "Raio-X",
          emoji: "🩻",
          funfato: "O Raio-X é uma foto especial que enxerga através da pele e mostra os ossos por dentro do seu corpo!",
          detalhe: "Radiografia | Usa radiação eletromagnética | Ossos absorvem mais radiação"
        },
        {
          letra: "Y",
          palavra: "Yoga",
          emoji: "🧘",
          funfato: "Yoga é uma atividade com posturas e respiração que deixa seu corpo mais flexível e a mente mais calma!",
          detalhe: "Prática milenar indiana | Combina posturas, respiração e concentração"
        },
        {
          letra: "Z",
          palavra: "Zigomático",
          emoji: "😊",
          funfato: "O zigomático é o osso da bochecha — ele ajuda a formar o seu sorriso!",
          detalhe: "Osso malar | Forma a proeminência da bochecha | Ligado ao músculo do sorriso"
        }
      ]
    }
  },
  {
    id: "con_alfabeto_paises",
    tipo: "alfabeto",
    titulo: "Países de A a Z",
    descricao: "Um país fascinante para cada letra do alfabeto!",
    emoji: "🌎",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "O mundo tem 195 países — vamos descobrir um para cada letra! 🌎 Clique em 🔊 e dê a volta ao mundo pelo alfabeto!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Austrália",
          emoji: "🦘",
          funfato: "A Austrália é um país-continente — e tem mais cangurus do que pessoas!",
          detalhe: "Oceania | 7,7Mi km² | 55Mi cangurus | Fauna monotremada/marsupial única"
        },
        {
          letra: "B",
          palavra: "Brasil",
          emoji: "🇧🇷",
          funfato: "O Brasil é o 5º maior país do mundo e tem a maior floresta tropical do planeta!",
          detalhe: "8,5Mi km² | Amazônia: 5,5Mi km² | 213Mi hab. | Maior biodiversidade"
        },
        {
          letra: "C",
          palavra: "China",
          emoji: "🐉",
          funfato: "A China tem a maior população do mundo e inventou o papel, a bússola e a pólvora!",
          detalhe: "1,4Bi hab. | Papel (105 d.C.) + bússola + pólvora + impressão | 5.000 anos"
        },
        {
          letra: "D",
          palavra: "Dinamarca",
          emoji: "🧜",
          funfato: "A Dinamarca é um dos países mais felizes do mundo há vários anos seguidos, segundo a ONU!",
          detalhe: "Escandinávia | World Happiness Report | Hygge | 5,9Mi hab. | Copenhague"
        },
        {
          letra: "E",
          palavra: "Egito",
          emoji: "🏛️",
          funfato: "O Egito tem as pirâmides construídas há mais de 4.500 anos — ainda em pé!",
          detalhe: "Pirâmides: 2.560 a.C. | Maravilha antiga | Nilômetro | 102Mi hab."
        },
        {
          letra: "F",
          palavra: "França",
          emoji: "🗼",
          funfato: "A França é o país mais visitado do mundo — 90 milhões de turistas por ano!",
          detalhe: "Europa | 90Mi turistas | Louvre | Gastronomia: patrimônio UNESCO"
        },
        {
          letra: "G",
          palavra: "Grécia",
          emoji: "🏛️",
          funfato: "A Grécia inventou a democracia, as Olimpíadas e a filosofia ocidental!",
          detalhe: "Democracia: Atenas 508 a.C. | Olimpíadas: 776 a.C. | Sócrates/Platão/Aristóteles"
        },
        {
          letra: "H",
          palavra: "Hungria",
          emoji: "🧩",
          funfato: "A Hungria inventou o cubo mágico — Rubik é húngaro!",
          detalhe: "Ernő Rubik 1974 | 43 quintilhões combinações | Matemática de grupo"
        },
        {
          letra: "I",
          palavra: "Índia",
          emoji: "🐘",
          funfato: "A Índia inventou o número zero — sem ele não existiriam computadores!",
          detalhe: "Brahmagupta: zero (628 d.C.) | 1,4Bi hab. | 22 línguas oficiais | Bollywood"
        },
        {
          letra: "J",
          palavra: "Japão",
          emoji: "🗾",
          funfato: "O Japão é formado por 6.852 ilhas — e tem o trem mais pontual do mundo!",
          detalhe: "6.852 ilhas | Shinkansen: ±18 seg. atraso médio | 125Mi hab. | Tecnologia"
        },
        {
          letra: "K",
          palavra: "Kuwait",
          emoji: "🐪",
          funfato: "O Kuwait é um dos países mais ricos do mundo — tem petróleo escondido embaixo de um deserto enorme!",
          detalhe: "Golfo Pérsico | Maior reserva de petróleo per capita | Capital: Kuwait City"
        },
        {
          letra: "L",
          palavra: "Líbano",
          emoji: "🌲",
          funfato: "O Líbano tem um cedro na bandeira — essas árvores constroem navios desde 3.000 a.C.!",
          detalhe: "Cedrus libani | Madeira dos templos de Salomão | Fenícios | 6Mi hab."
        },
        {
          letra: "M",
          palavra: "México",
          emoji: "🌮",
          funfato: "O México é o local de origem do chocolate, do tomate, do milho e da baunilha!",
          detalhe: "Cacao: astecas | Tomate + milho + baunilha | Patrimônio gastronômico"
        },
        {
          letra: "N",
          palavra: "Nepal",
          emoji: "🏔️",
          funfato: "O Nepal tem o Monte Everest — o ponto mais alto da Terra — dentro de suas fronteiras!",
          detalhe: "Everest: 8.849m | Himalaia | 8 das 14 maiores montanhas | Katmandu"
        },
        {
          letra: "O",
          palavra: "Omã",
          emoji: "🏜️",
          funfato: "Omã tem uma reserva de arábia selvagem onde órix extintos foram reintroduzidos!",
          detalhe: "Oryx leucoryx | Reintrodução 1982 | Deserto da Arábia | Muscat"
        },
        {
          letra: "P",
          palavra: "Portugal",
          emoji: "🐓",
          funfato: "Portugal foi o primeiro império global — chegou à América, África, Ásia e Oceania!",
          detalhe: "Vasco da Gama 1498 | Rota das especiarias | Língua: 250Mi falantes"
        },
        {
          letra: "Q",
          palavra: "Qatar",
          emoji: "⚽",
          funfato: "O Qatar é o menor país a sediar uma Copa do Mundo — e tem gás suficiente por 100 anos!",
          detalhe: "11.586 km² | 2022 FIFA World Cup | GNL: 3ª reserva | 2,9Mi hab."
        },
        {
          letra: "R",
          palavra: "Rússia",
          emoji: "🐻",
          funfato: "A Rússia é tão grande que tem 11 fusos horários diferentes!",
          detalhe: "17Mi km² | 11 fusos | 1/8 superfície terrestre | 143Mi hab."
        },
        {
          letra: "S",
          palavra: "Suécia",
          emoji: "🫐",
          funfato: "A Suécia inventou o Spotify, o IKEA e o Bluetooth — tudo desse país!",
          detalhe: "Spotify: 2006 | IKEA: 1943 | Bluetooth: Ericsson 1994 | Nobel"
        },
        {
          letra: "T",
          palavra: "Tailândia",
          emoji: "🐘",
          funfato: "A Tailândia é o único país do Sudeste Asiático que nunca foi colonizado!",
          detalhe: "\"Terra dos Livres\" | Nunca colonizado | 69Mi hab. | Budismo | Elefante branco"
        },
        {
          letra: "U",
          palavra: "Uganda",
          emoji: "🦍",
          funfato: "Uganda tem metade de toda a população de gorilas das montanhas do mundo!",
          detalhe: "Gorilla beringei | 50% população mundial | Parque Bwindi | África"
        },
        {
          letra: "V",
          palavra: "Vietnã",
          emoji: "🍜",
          funfato: "O Vietnã tem 3.000 km de costa e a paisagem da Baía de Ha Long tem 1.600 ilhas!",
          detalhe: "Ha Long: 1.600 ilhas | UNESCO | Pho: sopa nacional | 97Mi hab."
        },
        {
          letra: "W",
          palavra: "Wallis e Futuna",
          emoji: "🌺",
          funfato: "Wallis e Futuna é um território francês no Pacífico — nenhum país do mundo começa com W!",
          detalhe: "Coletividade francesa | 274 km² | Polinésia | 11.500 hab. | Moeda: franco"
        },
        {
          letra: "X",
          palavra: "Xizang-Tibete",
          emoji: "🏔️",
          funfato: "O Tibete (Xizang em chinês) fica no \"Teto do Mundo\" — o planalto mais alto da Terra!",
          detalhe: "Planalto: 4.500m altitude média | Região Autônoma China | Budismo Tibetano"
        },
        {
          letra: "Y",
          palavra: "Yemen",
          emoji: "🏛️",
          funfato: "No Iêmen fica a cidade de Shibam, cheia de prédios de barro tão altos que parecem os primeiros arranha-céus da história!",
          detalhe: "Shibam: torres de barro de 11 andares, séc. XVI | UNESCO | Península Arábica"
        },
        {
          letra: "Z",
          palavra: "Zimbábue",
          emoji: "🦏",
          funfato: "Zimbábue tem as Cataratas Vitória — a maior cortina de água do mundo!",
          detalhe: "Victoria Falls: 1.708m largura | 108m altura | Zimbabwe: \"Casa de Pedra\""
        }
      ]
    }
  },
  {
    id: "con_alfabeto_inventos",
    tipo: "alfabeto",
    titulo: "Inventos de A a Z",
    descricao: "Uma invenção que mudou o mundo para cada letra!",
    emoji: "💡",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "A humanidade inventou coisas incríveis para cada letra do alfabeto! 💡 Clique em 🔊 e descubra a história por trás de cada invenção!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Avião",
          emoji: "✈️",
          funfato: "O primeiro voo dos irmãos Wright durou apenas 12 segundos — em 1903!",
          detalhe: "Wright Flyer: 1903 | 12seg | 36m | Kitty Hawk NC | Asa biplana + motor"
        },
        {
          letra: "B",
          palavra: "Bússola",
          emoji: "🧭",
          funfato: "A bússola foi inventada na China há 2.000 anos e mudou a navegação mundial!",
          detalhe: "China: séc. I d.C. | Magnetita | Europa séc. XII | Declinação magnética"
        },
        {
          letra: "C",
          palavra: "Computador",
          emoji: "💻",
          funfato: "O primeiro computador pesava 27 toneladas e enchia uma sala inteira!",
          detalhe: "ENIAC 1945 | 27t | 18.000 válvulas | 1.000× mais lento que um smartphone"
        },
        {
          letra: "D",
          palavra: "DNA-Estrutura",
          emoji: "🧬",
          funfato: "A estrutura do DNA foi descoberta em 1953 e revolucionou toda a medicina!",
          detalhe: "Watson & Crick 1953 | Raio-X de Rosalind Franklin | Dupla hélice"
        },
        {
          letra: "E",
          palavra: "Eletricidade",
          emoji: "⚡",
          funfato: "Benjamin Franklin provou com uma pipa que o raio era eletricidade — quase levou um choque!",
          detalhe: "Franklin 1752 | Tesla/Edison: CA vs CC | Faraday: gerador | Volta: bateria"
        },
        {
          letra: "F",
          palavra: "Forno-Micro-ondas",
          emoji: "📡",
          funfato: "O micro-ondas foi inventado por acidente — uma barra de chocolate derreteu no bolso do inventor!",
          detalhe: "Percy Spencer 1945 | Radiação micro-ondas | Chocolate derreteu | Raytheon"
        },
        {
          letra: "G",
          palavra: "GPS",
          emoji: "📍",
          funfato: "O GPS foi criado pelos militares americanos e só liberado para o público em 2000!",
          detalhe: "24 satélites | Triangulação 3D | Selective Availability desligado: 2000"
        },
        {
          letra: "H",
          palavra: "Helicóptero",
          emoji: "🚁",
          funfato: "Leonardo da Vinci desenhou um helicóptero em 1489 — 450 anos antes de ser inventado!",
          detalhe: "Da Vinci 1489 (esboço) | Sikorsky VS-300: 1939 | Rotor principal + cauda"
        },
        {
          letra: "I",
          palavra: "Internet",
          emoji: "🌐",
          funfato: "A internet nasceu em 1969 conectando apenas 4 computadores americanos!",
          detalhe: "ARPANET 1969 | 4 nós | Tim Berners-Lee: WWW 1991 | 5Bi usuários hoje"
        },
        {
          letra: "J",
          palavra: "Jeans",
          emoji: "👖",
          funfato: "O jeans foi inventado para mineiros da corrida do ouro — tecido que nunca rasgasse!",
          detalhe: "Levi Strauss + Jacob Davis 1873 | Rebites de cobre | Denim de Nîmes"
        },
        {
          letra: "K",
          palavra: "Kevlar",
          emoji: "🛡️",
          funfato: "O Kevlar dos coletes à prova de bala foi inventado por uma química procurando pneus melhores!",
          detalhe: "Stephanie Kwolek 1964 | DuPont | 5× mais forte que aço | Aramida"
        },
        {
          letra: "L",
          palavra: "Laser",
          emoji: "🔦",
          funfato: "O laser foi chamado de \"solução em busca de problema\" — hoje está em tudo!",
          detalhe: "Theodore Maiman 1960 | Amplificação de luz | CD/cirurgia/fibra óptica"
        },
        {
          letra: "M",
          palavra: "Motor-a-Vapor",
          emoji: "🚂",
          funfato: "O motor a vapor de James Watt iniciou a Revolução Industrial e mudou a história humana!",
          detalhe: "James Watt 1769 | Condensador separado | Revolução Industrial | 10× mais eficiente"
        },
        {
          letra: "N",
          palavra: "Nylon",
          emoji: "🧵",
          funfato: "O nylon foi a primeira fibra sintética e substituiu a seda durante a 2ª Guerra!",
          detalhe: "Wallace Carothers 1935 | DuPont | Poliamida | Meias de nylon: 1939"
        },
        {
          letra: "O",
          palavra: "Óculos",
          emoji: "👓",
          funfato: "Os óculos foram inventados na Itália no século XIII por monges copistas!",
          detalhe: "Itália: séc. XIII | Lupa + armação | Franklin: óculos bifocais | 4Bi usuários"
        },
        {
          letra: "P",
          palavra: "Penicilina",
          emoji: "💊",
          funfato: "A penicilina foi descoberta por acidente — um mofo contaminou uma placa de bactérias!",
          detalhe: "Alexander Fleming 1928 | Penicillium notatum | Nobel 1945 | 200Mi vidas salvas"
        },
        {
          letra: "Q",
          palavra: "Código-QR",
          emoji: "📱",
          funfato: "O QR code foi inventado para rastrear peças de carro em fábricas japonesas!",
          detalhe: "Denso Wave 1994 | Toyota | 7.089 caracteres | Detecção de erros"
        },
        {
          letra: "R",
          palavra: "Rádio",
          emoji: "📻",
          funfato: "Marconi enviou o primeiro sinal de rádio pelo Atlântico em 1901 — transmitindo a letra S!",
          detalhe: "Marconi 1895 | Tesla (prioridade disputada) | Ondas eletromagnéticas | \"S\""
        },
        {
          letra: "S",
          palavra: "Smartphone",
          emoji: "📱",
          funfato: "O iPhone de 2007 tinha mais poder de processamento que os computadores da NASA em 1969!",
          detalhe: "Simon (IBM) 1994 | iPhone 2007 | 6,8Bi smartphones | 5G: 20 Gbps"
        },
        {
          letra: "T",
          palavra: "Televisão",
          emoji: "📺",
          funfato: "A televisão foi inventada por um fazendeiro americano de 21 anos em 1927!",
          detalhe: "Philo Farnsworth 1927 | 21 anos | Iconoscópio Zworykin | 1Bi aparelhos"
        },
        {
          letra: "U",
          palavra: "Ultrassom",
          emoji: "🏥",
          funfato: "O ultrassom médico foi desenvolvido a partir do sonar usado para detectar submarinos!",
          detalhe: "Sonar WWII → medicina 1950s | Ian Donald: feto 1958 | Efeito Doppler"
        },
        {
          letra: "V",
          palavra: "Vacina",
          emoji: "💉",
          funfato: "Edward Jenner inventou a vacina em 1796 e erradicou a varíola que matava milhões!",
          detalhe: "Jenner 1796 | Cowpox → proteção varíola | WHO erradicação 1980"
        },
        {
          letra: "W",
          palavra: "Wi-Fi",
          emoji: "📶",
          funfato: "O Wi-Fi foi patenteado por uma agência espacial australiana que pesquisava buracos negros!",
          detalhe: "CSIRO 1992 | John O'Sullivan | 802.11 | 16Bi dispositivos conectados"
        },
        {
          letra: "X",
          palavra: "Raio-X",
          emoji: "🩻",
          funfato: "Röntgen descobriu o raio-X por acidente e tirou foto da mão da esposa no mesmo dia!",
          detalhe: "Wilhelm Röntgen 1895 | Nobel 1901 | Mão de Anna Bertha | 3,6Bi exames/ano"
        },
        {
          letra: "Y",
          palavra: "Antena-Yagi",
          emoji: "📡",
          funfato: "A antena de TV comum no Brasil é uma \"antena Yagi\" — criada por um japonês em 1926!",
          detalhe: "Yagi-Uda 1926 | Hidetsugu Yagi | Diretiva + parasitas | UHF/VHF"
        },
        {
          letra: "Z",
          palavra: "Zíper",
          emoji: "🤐",
          funfato: "O zíper demorou 20 anos para ser aceito pelo público — ninguém confiava que não abria!",
          detalhe: "Whitcomb Judson 1893 | Sundback 1913 (moderno) | B.F. Goodrich: \"zipper\" 1923"
        }
      ]
    }
  },
  {
    id: "con_alfabeto_mitologia",
    tipo: "alfabeto",
    titulo: "Mitologia de A a Z",
    descricao: "Um deus ou mito incrível para cada letra!",
    emoji: "⚡",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "Os deuses e mitos do mundo inteiro chegaram para o alfabeto! ⚡ Clique em 🔊 e mergulhe no mundo dos mitos!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Afrodite",
          emoji: "💕",
          funfato: "Afrodite nasceu do mar — a deusa do amor grega surgiu da espuma das ondas!",
          detalhe: "Grega | Amor e beleza | Equivale a Vênus (romana) | Nascida da espuma"
        },
        {
          letra: "B",
          palavra: "Buda",
          emoji: "🧘",
          funfato: "Buda era um príncipe indiano que largou tudo para encontrar a iluminação!",
          detalhe: "Siddhartha Gautama | 563–483 a.C. | Não é deus para budistas: mestre"
        },
        {
          letra: "C",
          palavra: "Cronos",
          emoji: "⏳",
          funfato: "Cronos comia os próprios filhos para não perder o poder — o pai de Zeus!",
          detalhe: "Titã grego | Devora filhos (medo de profecia) | Equivale a Saturno (romano)"
        },
        {
          letra: "D",
          palavra: "Dionísio",
          emoji: "🍇",
          funfato: "Dionísio era o deus do vinho e das festas — a origem das festas da Antiguidade!",
          detalhe: "Grego | Vinho e teatro | Baco (romano) | Tiasos: cortejo festivo"
        },
        {
          letra: "E",
          palavra: "Éolo",
          emoji: "🌬️",
          funfato: "Éolo era o guardião dos ventos — ele os guardava num saco e podia controlá-los!",
          detalhe: "Grego | Deus dos ventos | Ilha Eólia | Odisseu recebeu saco de ventos"
        },
        {
          letra: "F",
          palavra: "Freya",
          emoji: "🌸",
          funfato: "Freya era a deusa nórdica do amor — \"Friday\" (sexta-feira) tem seu nome em inglês!",
          detalhe: "Nórdica | Amor, fertilidade, guerra | Valquíria | Friday = Freya's day"
        },
        {
          letra: "G",
          palavra: "Gaia",
          emoji: "🌍",
          funfato: "Gaia é a mãe Terra da mitologia grega — de quem nasceu tudo na mitologia grega!",
          detalhe: "Personificação da Terra | Primordial | Mãe de Urano, Ponto, Montes"
        },
        {
          letra: "H",
          palavra: "Hermes",
          emoji: "👟",
          funfato: "Hermes usava sandálias com asas para voar — era o mensageiro dos deuses!",
          detalhe: "Grego | Mensageiro, viajantes, comércio, ladrões | Caduceu médico"
        },
        {
          letra: "I",
          palavra: "Ísis",
          emoji: "🌙",
          funfato: "Ísis era a deusa mais poderosa do Egito — ela ressuscitou o marido Osíris!",
          detalhe: "Egípcia | Magia, maternidade | Ressuscitou Osíris | Mãe de Hórus"
        },
        {
          letra: "J",
          palavra: "Janus",
          emoji: "🚪",
          funfato: "Janus era o deus romano das portas — ele tinha duas faces: uma olhando para trás, outra para frente!",
          detalhe: "Romano | Começos, portas, transições | Janeiro = mês de Janus"
        },
        {
          letra: "K",
          palavra: "Khepri",
          emoji: "🌅",
          funfato: "Khepri era o deus egípcio do sol nascente — representado por um escaravelho!",
          detalhe: "Egípcio | Sol da manhã | Escaravelho empurrando sol | Autorrenascimento"
        },
        {
          letra: "L",
          palavra: "Loki",
          emoji: "🦊",
          funfato: "Loki era o deus nórdico trapaceiro — ele causava confusão mas também salvava os deuses!",
          detalhe: "Nórdico | Deus da trapaça | Shapeshifter | Pai de Fenrir, Jörmungandr"
        },
        {
          letra: "M",
          palavra: "Medusa",
          emoji: "🐍",
          funfato: "Medusa transformava em pedra quem a olhasse nos olhos — Perseu a derrotou com um espelho!",
          detalhe: "Grega | Górgona | Cabelos-serpentes | Perseus + escudo espelho + capacete Hades"
        },
        {
          letra: "N",
          palavra: "Nêmesis",
          emoji: "⚖️",
          funfato: "Nêmesis era a deusa da justiça divina que punia quem era orgulhoso ou arrogante!",
          detalhe: "Grega | Retribuição divina | \"Hybris\" (arrogância) → punição | Rival de Tyche"
        },
        {
          letra: "O",
          palavra: "Osíris",
          emoji: "🌿",
          funfato: "Osíris ensinava agricultura ao povo egípcio — e governava o reino dos mortos!",
          detalhe: "Egípcio | Morte, ressurreição, Nilo | Assassinado por Set | Ressuscitado por Ísis"
        },
        {
          letra: "P",
          palavra: "Posêidon",
          emoji: "🌊",
          funfato: "Posêidon controlava os mares e os terremotos — chamado \"Abalador da Terra\"!",
          detalhe: "Grego | Mar, terremotos, cavalos | Tridente | Netuno (romano)"
        },
        {
          letra: "Q",
          palavra: "Quetzalcóatl",
          emoji: "🐍",
          funfato: "Quetzalcóatl era uma serpente emplumada dos astecas — e os astecas esperavam seu retorno!",
          detalhe: "Asteca | Serpente emplumada | Vento, aprendizado | Confundido com Cortés 1519"
        },
        {
          letra: "R",
          palavra: "Rá",
          emoji: "☀️",
          funfato: "Rá era o deus do sol dos egípcios — ele navegava pelo céu de dia e pelo submundo à noite!",
          detalhe: "Egípcio | Deus solar supremo | Barca solar | Fusão Amon-Rá"
        },
        {
          letra: "S",
          palavra: "Saturno",
          emoji: "🪐",
          funfato: "O planeta Saturno tem o nome do deus romano do tempo e da agricultura!",
          detalhe: "Romano | Kronos grego | Agricultura | Saturno: planeta e deus | Saturno: anel"
        },
        {
          letra: "T",
          palavra: "Thor",
          emoji: "🔨",
          funfato: "Thor era o deus do trovão nórdico — \"Thursday\" (quinta-feira) tem seu nome!",
          detalhe: "Nórdico | Trovão, relâmpago, tempestades | Mjolnir | Thursday = Thor's day"
        },
        {
          letra: "U",
          palavra: "Ulisses",
          emoji: "⚓",
          funfato: "Ulisses demorou 10 anos para voltar para casa após a Guerra de Troia — uma odisseia!",
          detalhe: "Grego: Odisseu | Herói de Ítaca | Ilíada + Odisseia (Homero)"
        },
        {
          letra: "V",
          palavra: "Vênus",
          emoji: "💕",
          funfato: "Vênus era a deusa romana do amor — o planeta mais brilhante tem o seu nome!",
          detalhe: "Romana | Amor, beleza | Afrodite grega | Planeta Vênus | Vênus não tem lua"
        },
        {
          letra: "W",
          palavra: "Wotan",
          emoji: "🦅",
          funfato: "Wotan (Odin) era o deus supremo nórdico e deu o nome à quarta-feira (Wednesday)!",
          detalhe: "Germânico (Wotan) = Odin nórdico | Saber, guerra, mortos | Wednesday = Wōden"
        },
        {
          letra: "X",
          palavra: "Xipe-Totec",
          emoji: "🌽",
          funfato: "Xipe-Totec era o deus asteca da primavera e renovação — simbolizava a terra se renovando!",
          detalhe: "Asteca | Agricultura, ciclos | \"Deus Esfolado\" | Renovação sazonal"
        },
        {
          letra: "Y",
          palavra: "Yggdrasil",
          emoji: "🌳",
          funfato: "Yggdrasil era a Árvore do Mundo nórdica que conectava os 9 mundos — incluindo o dos deuses!",
          detalhe: "Nórdico | Freixo cósmico | Asgard + Midgard + Hel | Esquilo Ratatoskr"
        },
        {
          letra: "Z",
          palavra: "Zeus",
          emoji: "⚡",
          funfato: "Zeus era o rei dos deuses gregos e lançava raios em quem o desobedecia!",
          detalhe: "Grego | Deus supremo do Olimpo | Raios | Júpiter (romano) | Monte Olimpo"
        }
      ]
    }
  },
  {
    id: "con_alfabeto_culinaria",
    tipo: "alfabeto",
    titulo: "Culinária do Mundo de A a Z",
    descricao: "Um prato delicioso do mundo para cada letra!",
    emoji: "🍜",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "Cada letra do alfabeto tem um prato típico de algum país do mundo! 🍜 Clique em 🔊 e dê a volta ao mundo pela culinária!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Acarajé",
          emoji: "🫔",
          funfato: "O acarajé baiano é patrimônio cultural do Brasil — frito no dendê por baianas!",
          detalhe: "Bahia | Feijão-fradinho frito | Dendê | Candomblé | Patrimônio Imaterial"
        },
        {
          letra: "B",
          palavra: "Borscht",
          emoji: "🫕",
          funfato: "O borscht é uma sopa de beterraba ucraniana — e fica com cor de rosa vivo!",
          detalhe: "Ucrânia/Rússia | Beterraba + repolho | UNESCO 2022 | Cor: antocianinas"
        },
        {
          letra: "C",
          palavra: "Croissant",
          emoji: "🥐",
          funfato: "O croissant foi inventado na Áustria para celebrar a vitória sobre os turcos!",
          detalhe: "Viena 1683 | Kifli original | Franceses adotaram | Massa folhada laminada"
        },
        {
          letra: "D",
          palavra: "Dim-Sum",
          emoji: "🥟",
          funfato: "O dim sum chinês é servido em cestinhos de bambu e existe há mais de 1.000 anos!",
          detalhe: "Cantão | Yum cha: chá + comida | +1.000 tipos | Cestinhos de bambu"
        },
        {
          letra: "E",
          palavra: "Escargot",
          emoji: "🐌",
          funfato: "O escargot francês (caracol) era alimento de camponeses antes de virar prato nobre!",
          detalhe: "França | Helix pomatia | Manteiga + alho + salsinha | Gastronomia"
        },
        {
          letra: "F",
          palavra: "Fondue",
          emoji: "🧀",
          funfato: "A fondue de queijo suíça era a refeição dos pastores de montanha no inverno!",
          detalhe: "Suíça | Gruyère + Emmental + vinho branco | Kirsch | Pão mergulhado"
        },
        {
          letra: "G",
          palavra: "Guacamole",
          emoji: "🥑",
          funfato: "O guacamole foi criado pelos astecas há mais de 500 anos — antes da América ser colonizada!",
          detalhe: "Asteca \"Ahuacamolli\" | Abacate + limão + coentro + tomate | México"
        },
        {
          letra: "H",
          palavra: "Hummus",
          emoji: "🫘",
          funfato: "O hummus existe há mais de 700 anos e é disputado entre Israel, Líbano e Egito!",
          detalhe: "Oriente Médio | Grão-de-bico + tahine + limão + alho | Proteína vegetal"
        },
        {
          letra: "I",
          palavra: "Injera",
          emoji: "🫓",
          funfato: "A injera etíope é um pão esponjoso que serve de prato E de talheres ao mesmo tempo!",
          detalhe: "Etiópia | Farinha de teff fermentada | Come-se por cima | Probióticos"
        },
        {
          letra: "J",
          palavra: "Jerk-Chicken",
          emoji: "🍗",
          funfato: "O frango jerk jamaicano usa uma marinada com mais de 10 especiarias defumadas!",
          detalhe: "Jamaica | Pimenta allspice + scotch bonnet | Maroons: técnica escrava"
        },
        {
          letra: "K",
          palavra: "Kimchi",
          emoji: "🫙",
          funfato: "O kimchi coreano é fermentado e tem mais vitaminas depois de fermentar do que antes!",
          detalhe: "Coreia | Repolho fermentado + gochugaru | Probióticos | 200+ tipos"
        },
        {
          letra: "L",
          palavra: "Lasanha",
          emoji: "🍝",
          funfato: "A lasanha é um dos pratos mais antigos da culinária italiana — tem mais de 800 anos!",
          detalhe: "Emília-Romanha | Séc. XIII | Camadas de massa, molho, queijo | Bolonhesa"
        },
        {
          letra: "M",
          palavra: "Mochi",
          emoji: "🍡",
          funfato: "O mochi japonês é feito batendo arroz até virar uma massa elástica — o processo dura horas!",
          detalhe: "Japão | Mochigome (arroz glutinoso) | Tradição milenar | Wagashi"
        },
        {
          letra: "N",
          palavra: "Naan",
          emoji: "🫓",
          funfato: "O naan indiano é assado no tandoor — um forno de barro que chega a 500°C!",
          detalhe: "Índia/Pérsia | Forno tandoor | Fermento de iogurte | Manteiga clarificada"
        },
        {
          letra: "O",
          palavra: "Ossobuco",
          emoji: "🍖",
          funfato: "O ossobuco milanês é o joelho do boi cozido tão devagar que a carne solta do osso!",
          detalhe: "Milão | \"Osso com buraco\" | Gremolata: limão+salsa+alho | Braseado 3h"
        },
        {
          letra: "P",
          palavra: "Paella",
          emoji: "🥘",
          funfato: "A paella espanhola leva o nome da frigideira — \"paella\" é a palavra para a panela!",
          detalhe: "Valência | Arroz + açafrão + frutos do mar ou carne | Socarrat: crosta"
        },
        {
          letra: "Q",
          palavra: "Quibe",
          emoji: "🫔",
          funfato: "O quibe árabe chegou ao Brasil com imigrantes libaneses e sírios há mais de 100 anos!",
          detalhe: "Origem árabe | Trigo burgol + carne + hortelã | Libaneses no Brasil 1880s"
        },
        {
          letra: "R",
          palavra: "Ramen",
          emoji: "🍜",
          funfato: "O ramen japonês instantâneo foi eleito a maior invenção japonesa do século XX!",
          detalhe: "Momofuku Ando 1958 | Pesquisa 100.000 horas | 100Bi porções/ano mundiais"
        },
        {
          letra: "S",
          palavra: "Sushi",
          emoji: "🍣",
          funfato: "O sushi original não tinha peixe cru — era peixe fermentado em arroz por meses!",
          detalhe: "Narezushi: 8° séc. | Peixe fermentado | Edo séc. XIX: nigiri moderno"
        },
        {
          letra: "T",
          palavra: "Taco",
          emoji: "🌮",
          funfato: "O taco mexicano tem 500 anos e foi a \"fast food\" dos trabalhadores das minas!",
          detalhe: "México séc. XVIII | Tortilha de milho + recheio | UNESCO: milho sagrado"
        },
        {
          letra: "U",
          palavra: "Udon",
          emoji: "🍜",
          funfato: "O udon japonês são os macarrões mais grossos de toda a culinária asiática!",
          detalhe: "Japão | Farinha de trigo | 5mm espessura | Sanuki Udon: Kagawa"
        },
        {
          letra: "V",
          palavra: "Virado-à-Paulista",
          emoji: "🍳",
          funfato: "O Virado à Paulista é considerado o prato símbolo do estado de São Paulo!",
          detalhe: "SP | Feijão + farinha + ovo + couve + linguiça + bisteca | Segunda-feira"
        },
        {
          letra: "W",
          palavra: "Wonton",
          emoji: "🥟",
          funfato: "O wonton chinês é um bolsinho de massa com recheio — a origem dos harumakis e gyozas!",
          detalhe: "China | Canto (wontan em cantonês) | Caldo + massa + recheio | Dim sum"
        },
        {
          letra: "X",
          palavra: "Xinxim",
          emoji: "🍤",
          funfato: "O xinxim de galinha é um prato baiano com camarão seco que mistura Brasil e África!",
          detalhe: "Bahia | Galinha + camarão seco + amendoim + dendê | Influência africana"
        },
        {
          letra: "Y",
          palavra: "Yakisoba",
          emoji: "🍜",
          funfato: "O yakisoba no Brasil com macarrão espaguete foi criado pelos japoneses que vieram trabalhar!",
          detalhe: "Nipo-brasileiro | Macarrão frito + legumes + shoyu | Comunidade Nikkei"
        },
        {
          letra: "Z",
          palavra: "Zabaione",
          emoji: "🍮",
          funfato: "O zabaione italiano é uma sobremesa cremosa feita só de gemas, açúcar e vinho!",
          detalhe: "Itália | Gemas + marsala + açúcar | Cozimento em banho-maria | Piemonte"
        }
      ]
    }
  },
  {
    id: "con_alfabeto_folclore",
    tipo: "alfabeto",
    titulo: "Folclore Brasileiro de A a Z",
    descricao: "Um personagem ou lenda do folclore para cada letra!",
    emoji: "🇧🇷",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "O Brasil tem um universo de lendas e personagens incríveis! 🌿 Clique em 🔊 e explore o folclore da nossa terra!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Anhangá",
          emoji: "🦌",
          funfato: "O anhangá é um espírito protetor dos animais que pune quem caça sem necessidade!",
          detalhe: "Tupi-guarani | Espírito dos animais | Aparece como veado branco"
        },
        {
          letra: "B",
          palavra: "Boto-Cor-de-Rosa",
          emoji: "🐬",
          funfato: "O boto se transforma em homem bonito para seduzir mulheres nas festas ribeirinhas!",
          detalhe: "Amazônia | Inia geoffrensis | Lenda fluvial | Filho = \"filho do boto\""
        },
        {
          letra: "C",
          palavra: "Caipora",
          emoji: "🌿",
          funfato: "A caipora é uma criança peluda que protege a mata — ela confunde os caçadores!",
          detalhe: "Indígena | Protetora da floresta | Fuma cachimbo | Desnorteia caçadores"
        },
        {
          letra: "D",
          palavra: "Dança-de-São-Gonçalo",
          emoji: "💃",
          funfato: "A Dança de São Gonçalo é uma promessa dançada para pedir graças ao santo!",
          detalhe: "Nordeste/SE | Romaria dançante | Promessa religiosa | Cultura popular"
        },
        {
          letra: "E",
          palavra: "Emboava",
          emoji: "⚔️",
          funfato: "Os emboabas eram os portugueses que chegaram a Minas Gerais durante a corrida do ouro!",
          detalhe: "Guerra dos Emboabas 1707-1709 | \"Emboaba\": palavra tupi para estrangeiro"
        },
        {
          letra: "F",
          palavra: "Feijoada",
          emoji: "🫕",
          funfato: "A feijoada foi criada por escravizados usando sobras de carne que os senhores descartavam!",
          detalhe: "Brasil | Origem escravocrata | Pé, orelha, rabo | Sábado: símbolo nacional"
        },
        {
          letra: "G",
          palavra: "Guaraná",
          emoji: "🌿",
          funfato: "O guaraná tem lenda indígena: nasceu dos olhos de uma criança saudável enterrada viva!",
          detalhe: "Sateré-Mawé | Paullinia cupana | 2-3× cafeína do café | Amazônia"
        },
        {
          letra: "H",
          palavra: "Headless-Mule",
          emoji: "🐎",
          funfato: "A Mula-sem-Cabeça é a punição para quem faz mal a um padre — corre jogando fogo!",
          detalhe: "Brasil | Maldição: mulher + padre | Desmanchada ao amanhecer | Centro-Oeste"
        },
        {
          letra: "I",
          palavra: "Iara",
          emoji: "🧜",
          funfato: "A Iara é a sereia brasileira — ela atrai pescadores com seu canto e os leva ao fundo!",
          detalhe: "Tupi | \"Senhora das águas\" | Sincretismo com sereia europeia | Amazônia"
        },
        {
          letra: "J",
          palavra: "Jurupari",
          emoji: "👹",
          funfato: "O Jurupari é o demônio das selvas amazônicas que protege os segredos dos rituais!",
          detalhe: "Amazônia | Espírito maligno Tupi | Proibido a mulheres | Ritual masculino"
        },
        {
          letra: "K",
          palavra: "Kiriri",
          emoji: "🪶",
          funfato: "Os Kiriri são um povo indígena do Nordeste que preserva danças e rituais ancestrais!",
          detalhe: "Bahia/Sergipe | Povo Kariri | Dança do Toré | Resistência cultural"
        },
        {
          letra: "L",
          palavra: "Lobisomem",
          emoji: "🐺",
          funfato: "No folclore brasileiro, o 7º filho homem seguido virava lobisomem na sexta-feira 13!",
          detalhe: "Europeu-brasileiro | Sétimo filho varão | Lua cheia | Metamorfose"
        },
        {
          letra: "M",
          palavra: "Mapinguari",
          emoji: "🦥",
          funfato: "O Mapinguari é um monstro gigante da Amazônia — pode ser memória das preguiças gigantes!",
          detalhe: "Amazônia | Megatherium? | Fede + grita + 1 olho | Criptozoologia"
        },
        {
          letra: "N",
          palavra: "Negrinho-do-Pastoreio",
          emoji: "🕯️",
          funfato: "O Negrinho ajuda a achar objetos perdidos — você acende uma vela e pede!",
          detalhe: "Sul do Brasil | Escravizado + cavalo morto | Santa Catarina | Velas votivas"
        },
        {
          letra: "O",
          palavra: "Orixá",
          emoji: "🌊",
          funfato: "Os Orixás são divindades afro-brasileiras — cada um comanda forças da natureza!",
          detalhe: "Candomblé/Umbanda | Yorubá | Sincretismo com santos | 16 principais"
        },
        {
          letra: "P",
          palavra: "Pé-de-Garrafa",
          emoji: "👣",
          funfato: "O Pé-de-Garrafa é um ser com pé virado para trás — para enganar quem tenta seguir sua trilha!",
          detalhe: "Nordeste | Pé invertido | Desorientação | Variante de Curupira"
        },
        {
          letra: "Q",
          palavra: "Quentão",
          emoji: "🍵",
          funfato: "O quentão é a bebida tradicional das festas juninas — feito com cachaça, gengibre e canela!",
          detalhe: "Festa Junina | Cachaça + gengibre + cravo + canela | São João | Cultura"
        },
        {
          letra: "R",
          palavra: "Rasga-Mortalha",
          emoji: "🦉",
          funfato: "A Rasga-Mortalha é uma coruja que, segundo o folclore, anuncia a morte quando grita!",
          detalhe: "Brasil | Tyto alba | Canto: prenúncio de morte | Superstição popular"
        },
        {
          letra: "S",
          palavra: "Saci-Pererê",
          emoji: "🌪️",
          funfato: "O Saci é um menino de uma perna só com um cachimbo e um gorro mágico!",
          detalhe: "Brasil | Monteiro Lobato | Gorro vermelho = poderes | Redemoinhos"
        },
        {
          letra: "T",
          palavra: "Tutu-Mineiro",
          emoji: "🫕",
          funfato: "O tutu-de-feijão mineiro é um símbolo da cozinha mais famosa do Brasil!",
          detalhe: "Minas Gerais | Feijão + farinha de mandioca | Cozinha típica brasileira"
        },
        {
          letra: "U",
          palavra: "Uirapuru",
          emoji: "🐦",
          funfato: "O uirapuru é o pássaro mais difícil de ver na Amazônia — traz sorte para quem acha!",
          detalhe: "Amazônia | Lepidothrix coronata | Canto mágico | Amuleto de sorte"
        },
        {
          letra: "V",
          palavra: "Vitória-Régia",
          emoji: "🌺",
          funfato: "A Vitória-Régia nasceu da saudade de uma índia que tentou alcançar a lua nas águas!",
          detalhe: "Amazônia | Victoria amazonica | Folha suporta 40kg | Lenda Tupinambá"
        },
        {
          letra: "W",
          palavra: "Waurá",
          emoji: "🪶",
          funfato: "Os Waurá do Xingu são famosos por suas máscaras e cerâmicas sagradas incríveis!",
          detalhe: "Mato Grosso | Alto Xingu | Arte ritual | Máscaras do Jakuí | Arawak"
        },
        {
          letra: "X",
          palavra: "Xavante",
          emoji: "🪶",
          funfato: "Os Xavante do Mato Grosso resistiram bravamente à colonização até o século XX!",
          detalhe: "Mato Grosso | A'Uwe | Ritual Wai'a | Resistência | 20.000 pessoas hoje"
        },
        {
          letra: "Y",
          palavra: "Yanomami",
          emoji: "🌿",
          funfato: "Os Yanomami são um dos maiores povos indígenas isolados da Amazônia!",
          detalhe: "Amazônia | Brasil + Venezuela | 35.000 pessoas | Floresta | Davi Kopenawa"
        },
        {
          letra: "Z",
          palavra: "Zumbi-dos-Palmares",
          emoji: "✊",
          funfato: "Zumbi foi o líder do Quilombo dos Palmares — o maior quilombo da história do Brasil!",
          detalhe: "Quilombo dos Palmares | 20.000 habitantes | Alagoas | 20 nov: Dia da Consciência Negra"
        }
      ]
    }
  },
  {
    id: "con_alfabeto_cidades",
    tipo: "alfabeto",
    titulo: "Cidades do Mundo de A a Z",
    descricao: "Uma cidade incrível do mundo para cada letra!",
    emoji: "🏙️",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "As cidades mais famosas do mundo te esperam no alfabeto! 🏙️ Clique em 🔊 e faça um tour pelo planeta!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Amsterdã",
          emoji: "🚲",
          funfato: "Amsterdã tem mais bicicletas do que habitantes — 1,5 bicicleta por pessoa!",
          detalhe: "Holanda | 1Mi bicicletas | 165 canais | 1.281 pontes | Capital"
        },
        {
          letra: "B",
          palavra: "Buenos Aires",
          emoji: "🥩",
          funfato: "Buenos Aires tem mais psicólogos por habitante do que qualquer cidade do mundo!",
          detalhe: "Argentina | \"Paris da América do Sul\" | 3Mi hab. | Tango | Asado"
        },
        {
          letra: "C",
          palavra: "Cairo",
          emoji: "🏛️",
          funfato: "O Cairo é a maior cidade da África e tem as pirâmides de Gizé a 15 minutos do centro!",
          detalhe: "Egito | 21Mi hab. | Al-Qahira | Khan el-Khalili | Nilo"
        },
        {
          letra: "D",
          palavra: "Dubai",
          emoji: "🏗️",
          funfato: "Dubai construiu o prédio mais alto do mundo em apenas 5 anos!",
          detalhe: "Burj Khalifa: 828m | Emirados Árabes | De deserto a metrópole em 30 anos"
        },
        {
          letra: "E",
          palavra: "Edimburgo",
          emoji: "🏰",
          funfato: "Edimburgo tem um castelo no centro da cidade — construído em cima de um vulcão antigo!",
          detalhe: "Escócia | Castelo: rocha vulcânica | Festival: maior do mundo | 500.000 hab."
        },
        {
          letra: "F",
          palavra: "Florença",
          emoji: "🎨",
          funfato: "Florença concentra um terço de todas as obras-primas da arte ocidental!",
          detalhe: "Itália | Uffizi, Accademia, Bargello | Médici | Renascimento berço"
        },
        {
          letra: "G",
          palavra: "Guimarães",
          emoji: "🏰",
          funfato: "Guimarães é a primeira capital de Portugal — a cidade berço da nação!",
          detalhe: "Portugal | \"Aqui nasceu Portugal\" | D. Afonso Henriques | 1139"
        },
        {
          letra: "H",
          palavra: "Hanói",
          emoji: "🛵",
          funfato: "Hanói tem mais de 7 milhões de motos — o trânsito é uma dança interminável!",
          detalhe: "Vietnã | Capital | 7Mi motos | 1.000 anos de história | Lago Hoan Kiem"
        },
        {
          letra: "I",
          palavra: "Istambul",
          emoji: "🕌",
          funfato: "Istambul é a única cidade do mundo que fica em dois continentes ao mesmo tempo!",
          detalhe: "Turquia | Europa + Ásia | Bósforo | Hagia Sophia | Antiga Constantinopla"
        },
        {
          letra: "J",
          palavra: "Jerusalém",
          emoji: "🕌",
          funfato: "Jerusalém é sagrada para três religiões ao mesmo tempo: judaísmo, islamismo e cristianismo!",
          detalhe: "3 religiões | Muro das Lamentações, Mesquita Al-Aqsa, Santo Sepulcro"
        },
        {
          letra: "K",
          palavra: "Kyoto",
          emoji: "⛩️",
          funfato: "Kyoto tem mais de 1.600 templos budistas e 400 santuários xintoístas!",
          detalhe: "Japão | Capital antiga | 1.600 templos | Fushimi Inari | Gueixas | UNESCO"
        },
        {
          letra: "L",
          palavra: "Lisboa",
          emoji: "🛺",
          funfato: "Lisboa foi destruída por um terremoto em 1755 e reconstruída em apenas 10 anos!",
          detalhe: "Portugal | Terremoto 1755 | Marquês de Pombal | Sete colinas | Tejo"
        },
        {
          letra: "M",
          palavra: "Moscou",
          emoji: "🏰",
          funfato: "Moscou tem o metrô mais bonito do mundo — as estações são palácios de mármore!",
          detalhe: "Rússia | Kremlin | Praça Vermelha | Metrô: 1935 | 12Mi hab."
        },
        {
          letra: "N",
          palavra: "Nova Iorque",
          emoji: "🗽",
          funfato: "Nova Iorque tem mais de 800 línguas faladas — a cidade mais multilíngue do mundo!",
          detalhe: "EUA | 800 línguas | 8,3Mi hab. | Manhattan | \"The Big Apple\""
        },
        {
          letra: "O",
          palavra: "Oslo",
          emoji: "🎿",
          funfato: "Oslo é a capital mais cara do mundo para viver — e uma das mais felizes!",
          detalhe: "Noruega | Fiorde | Museus Viking | Prêmio Nobel da Paz | Sustentável"
        },
        {
          letra: "P",
          palavra: "Paris",
          emoji: "🗼",
          funfato: "A Torre Eiffel cresce 15cm no verão por causa da dilatação do metal com o calor!",
          detalhe: "França | Torre Eiffel | 2Mi visitantes/mês | \"Cidade Luz\" | Rio Sena"
        },
        {
          letra: "Q",
          palavra: "Queenstown",
          emoji: "🏔️",
          funfato: "Queenstown na Nova Zelândia é a capital mundial dos esportes radicais!",
          detalhe: "Nova Zelândia | Bungee jumping inventado | Esqui + rafting + paraquedas"
        },
        {
          letra: "R",
          palavra: "Roma",
          emoji: "🏛️",
          funfato: "Roma foi chamada de \"Cidade Eterna\" — e ainda tem monumentos de 2.000 anos em uso!",
          detalhe: "\"Urbs Aeterna\" | Coliseu, Pantheon, Fórum | 3Mi hab. | Vaticano"
        },
        {
          letra: "S",
          palavra: "Singapura",
          emoji: "🌿",
          funfato: "Singapura é uma das poucas cidades-estado do mundo e multa em R$1.500 quem joga lixo na rua!",
          detalhe: "Cidade-estado | Jardins na Bay | 6Mi hab. | 3° mais rico do mundo"
        },
        {
          letra: "T",
          palavra: "Tóquio",
          emoji: "🗼",
          funfato: "Tóquio é a maior cidade do mundo — com 38 milhões de pessoas na Grande Tóquio!",
          detalhe: "Japão | 38Mi | Grande Tóquio | Metrô pontual | Shibuya crossing"
        },
        {
          letra: "U",
          palavra: "Utrecht",
          emoji: "🚲",
          funfato: "Utrecht na Holanda tem o maior estacionamento de bicicletas do mundo!",
          detalhe: "Holanda | Stationsplein: 12.500 bikes | Dom Tower | Canal central"
        },
        {
          letra: "V",
          palavra: "Viena",
          emoji: "🎵",
          funfato: "Viena é a capital da música clássica — Beethoven, Mozart e Schubert viveram lá!",
          detalhe: "Áustria | Filarmônica de Viena | Mozart, Beethoven, Brahms | Ringstraße"
        },
        {
          letra: "W",
          palavra: "Wellington",
          emoji: "🌬️",
          funfato: "Wellington, capital da Nova Zelândia, é a capital mais ao sul e mais ventosa do mundo!",
          detalhe: "Nova Zelândia | Capital mais ao sul | Vento constante | Peter Jackson"
        },
        {
          letra: "X",
          palavra: "Xangai",
          emoji: "🏙️",
          funfato: "Xangai tem o trem mais rápido do mundo — vai a 431 km/h conectando o aeroporto!",
          detalhe: "China | Maglev: 431km/h | 24Mi hab. | Bund | Maior porto mundial"
        },
        {
          letra: "Y",
          palavra: "Yaoundé",
          emoji: "🌿",
          funfato: "Yaoundé é a capital dos Camarões e fica no coração da floresta tropical africana!",
          detalhe: "Camarões | Capital | 3,5Mi hab. | \"Cidade das Sete Colinas\" | Francófona"
        },
        {
          letra: "Z",
          palavra: "Zurique",
          emoji: "⌚",
          funfato: "Zurique é uma das cidades com melhor qualidade de vida do mundo há vários anos seguidos!",
          detalhe: "Suíça | Mercer QOL: top 3 | Centro financeiro | Relógios | Lago de Zurique"
        }
      ]
    }
  }
]

// ── Fase 1 — quiz, memória, sequência ──
export const atividadesExtraPorFaixa = [
  {
    id: "con_quiz_ciencias2",
    tipo: "quiz",
    titulo: "Ciências da Natureza",
    descricao: "Explore os mistérios do mundo natural!",
    emoji: "🔬",
    habilidade: "Pensamento Científico",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "O laboratório científico abriu as portas para jovens pesquisadores! 🔬 Você foi selecionado para o teste de entrada. Responda corretamente e ganhe seu jaleco branco!",
    perguntas: [
      {
        pergunta: "O que as plantas precisam para fazer fotossíntese?",
        opcoes: ["Luz, água e CO₂", "Só água", "Só luz solar", "Terra e adubo"],
        correta: 0,
        fato: "🌱 Fotossíntese: luz + CO₂ + água → glicose + oxigênio. As plantas fazem seu próprio alimento! O oxigênio que liberamos é um \"subproduto\" — sem plantas, não haveria ar para respirar."
      },
      {
        pergunta: "Em que estado fica a água quando está congelada?",
        opcoes: ["Líquido", "Sólido", "Gasoso", "Plasma"],
        correta: 1,
        fato: "🧊 O gelo é mais leve que a água, por isso ele sempre flutua!"
      },
      {
        pergunta: "O que causa os trovões?",
        opcoes: [
          "Nuvens batendo",
          "O ar aquecendo rapidamente pelo raio",
          "Ventos muito fortes",
          "A Lua chegando perto"
        ],
        correta: 1,
        fato: "⚡ O raio aquece o ar a 30.000°C — 5x mais que a superfície do Sol! O ar expande tão rápido que cria uma onda de choque: o trovão. Por isso vemos o raio antes de ouvir o trovão."
      },
      {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        opcoes: ["Terra", "Saturno", "Júpiter", "Marte"],
        correta: 2,
        fato: "🪐 Júpiter é tão enorme que 1.300 Terras caberiam dentro dele! Sua \"Grande Mancha Vermelha\" é uma tempestade que dura há mais de 300 anos — maior que a Terra inteira."
      },
      {
        pergunta: "De que é feito principalmente nosso corpo?",
        opcoes: ["Ferro", "Água", "Cálcio", "Açúcar"],
        correta: 1,
        fato: "💧 Nosso corpo é 60% água! O cérebro tem 75% de água. Por isso a desidratação causa dor de cabeça e dificulta o raciocínio. Beba pelo menos 6 copos de água por dia!"
      }
    ]
  },
  {
    id: "con_quiz_brasil",
    tipo: "quiz",
    titulo: "Conhecendo o Brasil",
    descricao: "Explore as maravilhas do nosso país!",
    emoji: "🇧🇷",
    habilidade: "Conhecimento Geral",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "O game show \"Crianças do Brasil\" chegou à sua cidade! 🇧🇷 O apresentador quer saber quem conhece melhor o nosso país. Você vai representar sua escola!",
    perguntas: [
      {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
        correta: 2,
        fato: "🏛️ Brasília foi construída do zero em apenas 41 meses (1956-1960)! Vista de cima, tem o formato de um avião. Foi planejada por Lúcio Costa e projetada por Oscar Niemeyer."
      },
      {
        pergunta: "Qual é o maior rio do Brasil em volume de água?",
        opcoes: ["Rio São Francisco", "Rio Paraná", "Rio Amazonas", "Rio Tietê"],
        correta: 2,
        fato: "🌊 O Rio Amazonas carrega 20% de toda a água doce dos rios do planeta! É tão imenso que quando deságua no Atlântico, você encontra água doce 150 km para dentro do oceano."
      },
      {
        pergunta: "Em qual bioma vive a onça-pintada?",
        opcoes: ["Cerrado", "Caatinga", "Amazônia", "Pampa"],
        correta: 2,
        fato: "🐆 A onça-pintada é o maior felino das Américas! Cada uma tem manchas únicas como uma impressão digital. Ela sabe nadar muito bem e até pesca nos rios da Amazônia."
      },
      {
        pergunta: "O Pantanal é:",
        opcoes: ["Uma montanha", "Uma floresta seca", "Uma planície alagável", "Um deserto"],
        correta: 2,
        fato: "🌿 O Pantanal é a maior área úmida tropical do mundo com 150.000 km²! Tem cerca de 10 milhões de jacarés — a maior concentração do planeta. É Patrimônio Natural da Humanidade."
      },
      {
        pergunta: "Quantos estados tem o Brasil?",
        opcoes: ["24", "25", "26", "27"],
        correta: 2,
        fato: "🗺️ O Brasil tem 26 estados + 1 Distrito Federal (Brasília) = 27 unidades federativas. O maior em área é o Amazonas (1,5 milhão km² — maior que todo o Peru!). O menor é Sergipe."
      }
    ]
  },
  {
    id: "con_quiz_matematica2",
    tipo: "quiz",
    titulo: "Matemática Desafiadora",
    descricao: "Exercite o cérebro com problemas matemáticos!",
    emoji: "🧮",
    habilidade: "Lógica Matemática",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "O torneio de matemática da escola começou! 🧮 Você chegou à semifinal. Responda com calma — não existe atalho, só raciocínio!",
    perguntas: [
      {
        pergunta: "Quanto é 7 × 8?",
        opcoes: ["54", "56", "48", "63"],
        correta: 1,
        fato: "🧮 7 × 8 = 56. Dica de memória: \"5, 6, 7, 8 — cinquenta e seis é 7 vezes 8\"! Multiplicar é uma forma rápida de somar: 7+7+7+7+7+7+7+7 = 56."
      },
      {
        pergunta: "Qual é a metade de 100?",
        opcoes: ["25", "40", "50", "75"],
        correta: 2,
        fato: "✂️ Metade = dividir por 2. 100 ÷ 2 = 50. Em um supermercado, \"50% de desconto\" significa pagar apenas a metade do preço! Saber calcular metades é muito útil no dia a dia."
      },
      {
        pergunta: "Quantas faces tem um cubo?",
        opcoes: ["4", "5", "6", "8"],
        correta: 2,
        fato: "📦 Um cubo tem 6 faces, 12 arestas e 8 vértices. Dado de jogo, gelo e o Cubo Mágico são exemplos! O Cubo Mágico tem mais de 43 quintilhões de combinações possíveis."
      },
      {
        pergunta: "Qual número é primo?",
        opcoes: ["9", "15", "17", "21"],
        correta: 2,
        fato: "🔢 Números primos só são divisíveis por 1 e por si mesmos. 9=3×3, 15=3×5, 21=3×7 — não são primos! O 17 não tem outros divisores, então é primo. Os maiores primos conhecidos têm milhões de dígitos!"
      },
      {
        pergunta: "Quanto é 144 ÷ 12?",
        opcoes: ["10", "11", "12", "13"],
        correta: 2,
        fato: "🔢 12 × 12 = 144, então 144 ÷ 12 = 12. O número 12 aparece muito: 12 meses no ano, 12 horas no relógio, 12 unidades em uma dúzia. Por quê? Porque 12 é fácil de dividir: por 2, 3, 4 e 6!"
      }
    ]
  },
  {
    id: "con_memoria_paises",
    tipo: "memoria",
    titulo: "Países e Capitais",
    descricao: "Combine cada país com sua capital!",
    emoji: "🌍",
    habilidade: "Memória",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "O clube de geografia precisa de um novo membro! 🌍 O teste é combinar países com suas capitais. Quanto mais rápido você encontrar os pares, mais pontos ganha!",
    pares: [
      {
        emoji: "🇧🇷",
        nome: "Brasil — Brasília",
        info: "Brasília foi construída em apenas 41 meses!"
      },
      {
        emoji: "🇫🇷",
        nome: "França — Paris",
        info: "Paris tem mais de 2.000 anos de história"
      },
      {
        emoji: "🇯🇵",
        nome: "Japão — Tóquio",
        info: "Tóquio é a maior área metropolitana do mundo"
      },
      {
        emoji: "🇦🇺",
        nome: "Austrália — Camberra",
        info: "A capital não é Sydney — é Camberra!"
      },
      {
        emoji: "🇩🇪",
        nome: "Alemanha — Berlim",
        info: "Berlim foi reunificada em 1990 após 28 anos dividida"
      },
      {
        emoji: "🇮🇳",
        nome: "Índia — Nova Delhi",
        info: "Índia é o país mais populoso do mundo desde 2023"
      },
      {
        emoji: "🇨🇳",
        nome: "China — Pequim",
        info: "A Grande Muralha da China tem 21.000 km de extensão!"
      },
      {
        emoji: "🇷🇺",
        nome: "Rússia — Moscou",
        info: "A Rússia é o maior país do mundo em área territorial"
      }
    ]
  },
  {
    id: "con_memoria_habitats",
    tipo: "memoria",
    titulo: "Animais e Habitats",
    descricao: "Cada animal tem um lar especial!",
    emoji: "🦁",
    habilidade: "Memória",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "A arca de Noé perdeu o mapa! 🦁 Os animais estão no lugar errado. Combine cada animal com seu habitat correto antes que eles entrem em confusão!",
    pares: [
      {
        emoji: "🐧",
        nome: "Pinguim — Antártida",
        info: "Pinguins usam as asas para nadar, não voar!"
      },
      {
        emoji: "🦁",
        nome: "Leão — Savana africana",
        info: "Leões dormem até 20 horas por dia"
      },
      {
        emoji: "🐪",
        nome: "Camelo — Deserto do Saara",
        info: "A corcova armazena gordura, não água!"
      },
      {
        emoji: "🦅",
        nome: "Águia — Montanhas",
        info: "Enxerga 8x melhor que os humanos"
      },
      {
        emoji: "🐬",
        nome: "Golfinho — Oceano",
        info: "Golfinhos dormem com um olho aberto"
      },
      {
        emoji: "🐊",
        nome: "Jacaré — Pantanal",
        info: "O Pantanal tem 10 milhões de jacarés!"
      },
      {
        emoji: "🦒",
        nome: "Girafa — Savana africana",
        info: "Tem 7 vértebras no pescoço — igual a nós!"
      },
      {
        emoji: "🐨",
        nome: "Coala — Floresta da Austrália",
        info: "Dorme 22 horas por dia para economizar energia"
      }
    ]
  },
  {
    id: "con_memoria_geometria",
    tipo: "memoria",
    titulo: "Figuras Geométricas",
    descricao: "Combine as formas com seus nomes!",
    emoji: "📐",
    habilidade: "Memória Visual",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "O professor de matemática perdeu as etiquetas das formas geométricas! 📐 Ajude-o a combinar cada figura com seu nome correto antes da aula começar.",
    pares: [
      {
        emoji: "⭕",
        nome: "Círculo",
        info: "Todos os pontos são equidistantes do centro"
      },
      {
        emoji: "🔷",
        nome: "Losango",
        info: "4 lados iguais, mas ângulos diferentes"
      },
      {
        emoji: "🔺",
        nome: "Triângulo",
        info: "A forma mais rígida — usada em pontes e torres!"
      },
      {
        emoji: "🟦",
        nome: "Quadrado",
        info: "4 lados e 4 ângulos de 90° todos iguais"
      },
      {
        emoji: "🔵",
        nome: "Esfera",
        info: "Forma 3D do círculo — bolas são esferas"
      },
      {
        emoji: "📦",
        nome: "Cubo",
        info: "6 faces, 12 arestas, 8 vértices"
      },
      {
        emoji: "🔻",
        nome: "Pirâmide",
        info: "Base poligonal com faces triangulares — como no Egito!"
      },
      {
        emoji: "🥫",
        nome: "Cilindro",
        info: "2 bases circulares e uma face lateral curva"
      }
    ]
  },
  {
    id: "con_seq_dobros",
    tipo: "sequencia",
    titulo: "Dobros e Potências",
    descricao: "Números que dobram a cada passo!",
    emoji: "✖️",
    habilidade: "Lógica Matemática",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "Uma lenda diz que um rei prometeu dar grãos de arroz a um inventor: 1 grão na 1ª casa do xadrez, 2 na 2ª, 4 na 3ª... ✖️ O rei faliu! Descubra o padrão dos dobros!",
    contexto_matematico: "Dobrar um número é multiplicar por 2. Começando com 1: 1→2→4→8→16... Em 64 casas de xadrez, seriam 18 quintilhões de grãos — mais que toda a produção de arroz da história!",
    sequencias: [
      {
        items: ["1", "2", "4", "8", "❓"],
        resposta: "16",
        opcoes: ["12", "14", "16", "24"]
      },
      {
        items: ["3", "6", "12", "24", "❓"],
        resposta: "48",
        opcoes: ["36", "42", "48", "96"]
      },
      {
        items: ["256", "128", "64", "32", "❓"],
        resposta: "16",
        opcoes: ["8", "16", "24", "32"]
      },
      {
        items: ["100", "50", "25", "12", "❓"],
        resposta: "6",
        opcoes: ["5", "6", "7", "8"]
      },
      {
        items: ["5", "10", "20", "40", "❓"],
        resposta: "80",
        opcoes: ["60", "70", "80", "100"]
      }
    ]
  },
  {
    id: "con_seq_multiplos",
    tipo: "sequencia",
    titulo: "Múltiplos em Sequência",
    descricao: "Descubra o padrão de multiplicação!",
    emoji: "🔢",
    habilidade: "Lógica Matemática",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "O computador da escola está aprendendo a tabuada! 🔢 Mas alguns resultados estão faltando. Ajude-o a completar as sequências antes da aula de matemática!",
    contexto_matematico: "Múltiplos são os resultados de uma multiplicação: os múltiplos de 7 são 7, 14, 21, 28... A sequência de Fibonacci (1,1,2,3,5,8,13...) aparece nas flores, conchas e até na arte!",
    sequencias: [
      {
        items: ["7", "14", "21", "28", "❓"],
        resposta: "35",
        opcoes: ["32", "34", "35", "42"]
      },
      {
        items: ["A", "C", "E", "G", "❓"],
        resposta: "I",
        opcoes: ["H", "I", "J", "K"]
      },
      {
        items: ["0", "1", "1", "2", "❓"],
        resposta: "3",
        opcoes: ["2", "3", "4", "5"]
      },
      {
        items: ["100", "90", "80", "70", "❓"],
        resposta: "60",
        opcoes: ["55", "60", "65", "75"]
      },
      {
        items: ["J", "F", "M", "A", "❓"],
        resposta: "M",
        opcoes: ["J", "M", "N", "A"]
      }
    ]
  },
  {
    id: "con_seq_logica",
    tipo: "sequencia",
    titulo: "Sequências Lógicas",
    descricao: "Encontre a regra escondida!",
    emoji: "🧩",
    habilidade: "Raciocínio Lógico",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "O detetive lógico está investigando padrões misteriosos! 🧩 Cada sequência tem uma regra secreta. Descubra a regra e complete o elemento que falta!",
    sequencias: [
      {
        items: ["1", "4", "9", "16", "❓"],
        resposta: "25",
        opcoes: ["20", "24", "25", "36"]
      },
      {
        items: ["Z", "Y", "X", "W", "❓"],
        resposta: "V",
        opcoes: ["U", "V", "W", "X"]
      },
      {
        items: ["Dom", "Seg", "Ter", "Qua", "❓"],
        resposta: "Qui",
        opcoes: ["Qua", "Qui", "Sex", "Sab"]
      },
      {
        items: ["🌞", "🌙", "🌞", "🌙", "❓"],
        resposta: "🌞",
        opcoes: ["🌙", "🌞", "⭐", "☁️"]
      },
      {
        items: ["bit", "byte", "KB", "MB", "❓"],
        resposta: "GB",
        opcoes: ["TB", "PB", "GB", "EB"]
      }
    ]
  },
  {
    id: "con_formas_geometricas",
    tipo: "formas",
    titulo: "Formas Geométricas",
    descricao: "Revise círculos, quadrados, triângulos e muito mais!",
    emoji: "🔷",
    habilidade: "Raciocínio Espacial",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "As formas geométricas estão em todo lugar! 🔷 No tabuleiro de xadrez, na janela da sala, no logotipo do seu time favorito. Clique em 🔊 e revise o nome de cada forma!"
  },
  {
    id: "con_cores",
    tipo: "cores",
    titulo: "As Cores",
    descricao: "Explore o arco-íris e aprenda sobre misturas de cores!",
    emoji: "🌈",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "Artistas misturam cores para criar outras: vermelho + azul = roxo, azul + amarelo = verde! 🌈 Conheça as cores primárias e secundárias ouvindo cada uma pelo nome!"
  },
  {
    id: "con_alfabeto",
    tipo: "alfabeto",
    titulo: "O Alfabeto",
    descricao: "Todas as 26 letras — sons e palavras para cada uma!",
    emoji: "🔤",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "Com apenas 26 letras é possível escrever qualquer palavra do português! 🔤 Clique em 🔊 para ouvir cada letra e a palavra que começa com ela. Você conhece todas?"
  }
]

// ── Colorir ──
export const colorirExtraPorFaixa = [
  {
    id: "con_colorir_peixe",
    tipo: "colorir",
    titulo: "Colorir: Peixe",
    descricao: "Pinte o peixinho e suas bolhas de ar!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "No fundo do mar vive um peixinho sem cor nenhuma! 🐟 Escolha as cores e pinte cada parte dele.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Peixe",
        regioes: [
          {
            id: "cauda",
            tipo: "polygon",
            props: {
              points: "205,150 252,108 252,192"
            }
          },
          {
            id: "corpo",
            tipo: "ellipse",
            props: {
              cx: 140,
              cy: 150,
              rx: 70,
              ry: 45
            }
          },
          {
            id: "barbatana_superior",
            tipo: "polygon",
            props: {
              points: "112,108 145,62 172,110"
            }
          },
          {
            id: "barbatana_inferior",
            tipo: "polygon",
            props: {
              points: "112,192 145,238 172,190"
            }
          },
          {
            id: "olho",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 100,
              cy: 138,
              r: 9
            }
          },
          {
            id: "bolha1",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 252,
              cy: 88,
              r: 7
            },
            cor: "#BAE6FD"
          },
          {
            id: "bolha2",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 270,
              cy: 66,
              r: 5
            },
            cor: "#BAE6FD"
          }
        ]
      }
    }
  },
  {
    id: "con_colorir_foguete",
    tipo: "colorir",
    titulo: "Colorir: Foguete",
    descricao: "Pinte o foguete antes da decolagem!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "Esse foguete está pronto para decolar, só falta a pintura! 🚀 Escolha as cores e deixe ele com a sua cara.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Foguete",
        regioes: [
          {
            id: "chama",
            tipo: "polygon",
            props: {
              points: "130,198 150,252 170,198"
            }
          },
          {
            id: "aleta_esquerda",
            tipo: "polygon",
            props: {
              points: "126,168 88,226 126,198"
            }
          },
          {
            id: "aleta_direita",
            tipo: "polygon",
            props: {
              points: "174,168 212,226 174,198"
            }
          },
          {
            id: "corpo",
            tipo: "rect",
            props: {
              x: 126,
              y: 90,
              width: 48,
              height: 110,
              rx: 22
            }
          },
          {
            id: "ponta",
            tipo: "polygon",
            props: {
              points: "126,90 174,90 150,32"
            }
          },
          {
            id: "janela",
            tipo: "circle",
            props: {
              cx: 150,
              cy: 130,
              r: 17
            }
          }
        ]
      }
    }
  },
  {
    id: "con_colorir_borboleta",
    tipo: "colorir",
    titulo: "Colorir: Borboleta",
    descricao: "Pinte as asas coloridas da borboleta!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "Uma borboleta pousou no jardim, mas suas asas ainda não têm cor! 🦋 Escolha as cores e pinte cada asa.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Borboleta",
        regioes: [
          {
            id: "asa_sup_esq",
            tipo: "ellipse",
            props: {
              cx: 104,
              cy: 118,
              rx: 46,
              ry: 33
            }
          },
          {
            id: "asa_sup_dir",
            tipo: "ellipse",
            props: {
              cx: 196,
              cy: 118,
              rx: 46,
              ry: 33
            }
          },
          {
            id: "asa_inf_esq",
            tipo: "ellipse",
            props: {
              cx: 110,
              cy: 176,
              rx: 36,
              ry: 26
            }
          },
          {
            id: "asa_inf_dir",
            tipo: "ellipse",
            props: {
              cx: 190,
              cy: 176,
              rx: 36,
              ry: 26
            }
          },
          {
            id: "corpo",
            tipo: "rect",
            props: {
              x: 137,
              y: 100,
              width: 26,
              height: 110,
              rx: 13
            }
          },
          {
            id: "cabeca",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 150,
              cy: 92,
              r: 12
            }
          }
        ]
      }
    }
  }
]

// ── Cores ──
export const coresExtraPorFaixa = [
  {
    id: "con_cores_primarias",
    tipo: "cores",
    titulo: "Primárias e Secundárias",
    descricao: "Misture cores e entenda como nascem novas cores!",
    emoji: "🎨",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "O ateliê do artista tem só 3 cores de tinta — mas ele consegue fazer qualquer cor! 🎨 Descubra o segredo das cores primárias e secundárias clicando em 🔊!",
    dados: {
      cores: [
        {
          id: "prim-vermelho",
          nome: "Vermelho",
          hex: "#D32F2F",
          emoji: "🎨",
          exemplo: "cor primária — não se cria",
          funfato: "Vermelho é primária: não dá para fazer vermelho misturando outras cores de tinta!",
          detalhe: "Cor primária da síntese subtrativa (pigmento RYB) | Na luz (RGB) o vermelho também é primária"
        },
        {
          id: "prim-azul",
          nome: "Azul",
          hex: "#1565C0",
          emoji: "🎨",
          exemplo: "cor primária — não se cria",
          funfato: "Azul é primária — junto com vermelho e amarelo, forma todas as outras cores!",
          detalhe: "Cor primária em pigmento (RYB) e em luz (RGB) | Comprimento de onda ~450nm"
        },
        {
          id: "prim-amarelo",
          nome: "Amarelo",
          hex: "#F9A825",
          emoji: "🎨",
          exemplo: "cor primária — não se cria",
          funfato: "Amarelo é a terceira primária — em tinta, não se consegue fazê-lo misturando outras!",
          detalhe: "Primária do pigmento (RYB) | Mais luminosa do espectro | Absorção de tinta"
        },
        {
          id: "sec-laranja",
          nome: "Laranja",
          hex: "#E64A19",
          emoji: "🧪",
          exemplo: "vermelho + amarelo = laranja",
          funfato: "Laranja é secundária — você mesmo pode fazer misturando tinta vermelha com amarela!",
          detalhe: "Vermelho + Amarelo = Laranja | Cor quente | Estimula apetite"
        },
        {
          id: "sec-verde",
          nome: "Verde",
          hex: "#388E3C",
          emoji: "🧪",
          exemplo: "azul + amarelo = verde",
          funfato: "Verde é secundária — misture tinta azul com amarela e veja a cor surgir!",
          detalhe: "Azul + Amarelo = Verde | Cor fria e relaxante | Mais comum na natureza"
        },
        {
          id: "sec-roxo",
          nome: "Roxo",
          hex: "#6A1B9A",
          emoji: "🧪",
          exemplo: "vermelho + azul = roxo",
          funfato: "Roxo é secundária — misture tinta vermelha com azul! Era a cor mais cara da história.",
          detalhe: "Vermelho + Azul = Roxo/Violeta | Mais difícil de fabricar na Antiguidade"
        }
      ]
    }
  },
  {
    id: "con_cores_temperaturas",
    tipo: "cores",
    titulo: "Cores Quentes e Frias",
    descricao: "Entenda como as cores transmitem sensações de temperatura!",
    emoji: "🌡️",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "Na arte, as cores têm temperatura! 🌡️ Algumas cores parecem quentes como fogo, outras frias como gelo. Clique em 🔊 e sinta a diferença!",
    dados: {
      cores: [
        {
          id: "q-vermelho",
          nome: "Vermelho",
          hex: "#C62828",
          emoji: "🔥",
          exemplo: "cor quente — lembra fogo",
          funfato: "Cores quentes (vermelho, laranja, amarelo) parecem mais próximas e energéticas!",
          detalhe: "Comprimento de onda maior (~700nm) | Estimula adrenalina | Sinaliza urgência"
        },
        {
          id: "q-laranja",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🌅",
          exemplo: "cor quente — lembra pôr do sol",
          funfato: "O laranja é a cor mais energética e festiva — por isso carnavais têm muito laranja!",
          detalhe: "Estimula entusiasmo e criatividade | Mais visível após o amarelo"
        },
        {
          id: "q-amarelo",
          nome: "Amarelo",
          hex: "#F57F17",
          emoji: "☀️",
          exemplo: "cor quente — lembra o sol",
          funfato: "Câmeras térmicas mostram corpos quentes em amarelo e vermelho!",
          detalhe: "Cor mais luminosa para olhos humanos | Estimula atividade mental"
        },
        {
          id: "q-rosa",
          nome: "Rosa",
          hex: "#AD1457",
          emoji: "🌸",
          exemplo: "cor quente — lembra flores",
          funfato: "Rosa é quente — é vermelho misturado com branco!",
          detalhe: "Mescla quente-neutro | Psicologicamente calmante apesar de ser tom de vermelho"
        },
        {
          id: "f-azul",
          nome: "Azul",
          hex: "#0D47A1",
          emoji: "❄️",
          exemplo: "cor fria — lembra o gelo",
          funfato: "Cores frias (azul, verde, roxo) parecem mais distantes e calmantes!",
          detalhe: "Comprimento de onda menor (~450nm) | Reduz pressão arterial | Cor da confiança"
        },
        {
          id: "f-verde",
          nome: "Verde",
          hex: "#1B5E20",
          emoji: "🌲",
          exemplo: "cor fria — lembra floresta",
          funfato: "Hospitais usam muito verde porque é a cor mais calmante para os olhos!",
          detalhe: "Centro do espectro | Mais fácil de distinguir pelo olho humano"
        },
        {
          id: "f-roxo",
          nome: "Roxo",
          hex: "#4A148C",
          emoji: "🔮",
          exemplo: "cor fria — lembra a noite",
          funfato: "Roxo fica na fronteira — tem vermelho quente e azul frio ao mesmo tempo!",
          detalhe: "Cor limiar entre quente (vermelho) e frio (azul) | Associada a mistério"
        },
        {
          id: "n-cinza",
          nome: "Cinza",
          hex: "#455A64",
          emoji: "🌫️",
          exemplo: "cor neutra — lembra neblina",
          funfato: "Cores neutras (cinza, preto, branco) não são quentes nem frias!",
          detalhe: "Cor acromática | Sem saturação | Serve de base para destacar qualquer cor"
        }
      ]
    }
  },
  {
    id: "con_cores_emocoes",
    tipo: "cores",
    titulo: "Cores e Emoções",
    descricao: "Como as cores afetam nossa mente e sentimentos!",
    emoji: "🧠",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "Designers e artistas usam cores para criar sentimentos nas pessoas! 🧠 Descubra como cada cor age na nossa mente. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "emo-vm",
          nome: "Vermelho Paixão",
          hex: "#C62828",
          emoji: "❤️",
          exemplo: "como a paixão e urgência",
          funfato: "Restaurantes usam vermelho para estimular o apetite e acelerar as refeições!",
          detalhe: "Eleva FC e PA | Estimula apetite | Aumenta força muscular temporariamente"
        },
        {
          id: "emo-am",
          nome: "Amarelo Otimismo",
          hex: "#F9A825",
          emoji: "☀️",
          exemplo: "como a alegria e o sol",
          funfato: "O amarelo estimula o hipocampo — área do cérebro responsável pela memória!",
          detalhe: "Libera serotonina | Estimula memória | Ativa pensamento analítico"
        },
        {
          id: "emo-az",
          nome: "Azul Confiança",
          hex: "#1565C0",
          emoji: "🧊",
          exemplo: "como a confiança e paz",
          funfato: "Empresas como Facebook, Samsung e LinkedIn usam azul para transmitir confiança!",
          detalhe: "Reduz PA | Favorece lógica | Cor mais citada como favorita no mundo"
        },
        {
          id: "emo-vd",
          nome: "Verde Equilíbrio",
          hex: "#2E7D32",
          emoji: "🌿",
          exemplo: "como o equilíbrio",
          funfato: "Passar 20 minutos em ambientes verdes reduz o hormônio do estresse (cortisol)!",
          detalhe: "Reduz cortisol | Centro do espectro = equilíbrio visual | Associado à saúde"
        },
        {
          id: "emo-rx",
          nome: "Roxo Criatividade",
          hex: "#6A1B9A",
          emoji: "🎨",
          exemplo: "como a criatividade",
          funfato: "Artistas e escritores preferem ambientes roxos para estimular a criatividade!",
          detalhe: "Estimula imaginação | Combina energia (R) + calma (B) | Associado à sabedoria"
        },
        {
          id: "emo-la",
          nome: "Laranja Entusiasmo",
          hex: "#E65100",
          emoji: "🔥",
          exemplo: "como o entusiasmo",
          funfato: "Botões de compra laranja convertem mais que outras cores — estimulam ação imediata!",
          detalhe: "Alta visibilidade | CTA (call to action) | Combina energia + diversão"
        },
        {
          id: "emo-rs",
          nome: "Rosa Romance",
          hex: "#E91E8C",
          emoji: "🌸",
          exemplo: "como o romance",
          funfato: "Prisões pintadas de rosa reduziram a agressividade dos detentos!",
          detalhe: "\"Baker-Miller Pink\" | Reduz testosterona | Efeito calmante rápido (~30min)"
        },
        {
          id: "emo-pt",
          nome: "Preto Elegância",
          hex: "#212121",
          emoji: "🎩",
          exemplo: "como a elegância",
          funfato: "O preto absorve quase toda a luz — e é a cor que faz os objetos parecerem menores!",
          detalhe: "Ausência de cor | Autoridade | Vantablack absorve 99,965% da luz"
        }
      ]
    }
  },
  {
    id: "con_cores_estacoes",
    tipo: "cores",
    titulo: "Cores das Estações",
    descricao: "Cada estação do ano tem sua paleta de cores!",
    emoji: "🍂",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "A natureza muda de roupa 4 vezes por ano! 🍂 Cada estação tem cores que contam uma história. Clique em 🔊 e explore!",
    dados: {
      cores: [
        {
          id: "est-vdp",
          nome: "Verde Primavera",
          hex: "#66BB6A",
          emoji: "🌸",
          exemplo: "como as folhas novas",
          funfato: "As folhas novas da primavera são claras porque ainda têm pouca clorofila!",
          detalhe: "Clorofila crescendo | Folhas jovens: mais água, menos clorofila | Refletem mais luz"
        },
        {
          id: "est-rsp",
          nome: "Rosa Primavera",
          hex: "#F48FB1",
          emoji: "🌷",
          exemplo: "como as flores da primavera",
          funfato: "Flores desabrocham na primavera para atrair insetos polinizadores!",
          detalhe: "Antocianinas e carotenoides | Atração de polinizadores | UV visível para abelhas"
        },
        {
          id: "est-azv",
          nome: "Azul Verão",
          hex: "#42A5F5",
          emoji: "🌊",
          exemplo: "como o mar de verão",
          funfato: "O mar fica mais azul no verão porque a água quente tem menos algas e partículas!",
          detalhe: "Água clara = mais espalhamento Rayleigh | Verão: menos turbulência e sedimentos"
        },
        {
          id: "est-amv",
          nome: "Amarelo Verão",
          hex: "#FFC107",
          emoji: "☀️",
          exemplo: "como o sol quente",
          funfato: "O sol parece mais intenso no verão porque está mais alto — atravessa menos atmosfera!",
          detalhe: "Menor caminho óptico = menos dispersão = mais amarelo/branco"
        },
        {
          id: "est-lao",
          nome: "Laranja Outono",
          hex: "#E65100",
          emoji: "🍂",
          exemplo: "como as folhas de outono",
          funfato: "Folhas ficam laranja no outono quando a clorofila desaparece e carotenoides aparecem!",
          detalhe: "Clorofila decomposta | Carotenoides ficam visíveis | Preparação para a queda"
        },
        {
          id: "est-vmo",
          nome: "Vermelho Outono",
          hex: "#B71C1C",
          emoji: "🍁",
          exemplo: "como a folha vermelha",
          funfato: "Folhas vermelhas têm antocianinas que a árvore FABRICA — sinal de estresse!",
          detalhe: "Antocianinas produzidas ativamente | Protege folha na recuperação de nutrientes"
        },
        {
          id: "est-bci",
          nome: "Branco Inverno",
          hex: "#E0E0E0",
          emoji: "❄️",
          exemplo: "como a neve",
          funfato: "A neve é branca porque cristais de gelo refletem toda a luz solar!",
          detalhe: "Cristais de gelo: múltiplas interfaces reflexivas | Reflectância >80%"
        },
        {
          id: "est-cii",
          nome: "Cinza Inverno",
          hex: "#546E7A",
          emoji: "🌫️",
          exemplo: "como o céu de inverno",
          funfato: "Céu cinza no inverno tem mais umidade — as nuvens baixas bloqueiam a luz!",
          detalhe: "Nuvens Stratus baixas | Alta umidade | Menos horas de luz solar"
        }
      ]
    }
  },
  {
    id: "con_cores_bandeiras",
    tipo: "cores",
    titulo: "Cores nas Bandeiras",
    descricao: "O que as cores das bandeiras significam?",
    emoji: "🏳️",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "Cada cor em uma bandeira conta uma história do país! 🏳️ Veja o que vermelho, azul e verde significam ao redor do mundo. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "flag-vm",
          nome: "Vermelho",
          hex: "#C62828",
          emoji: "🚩",
          exemplo: "coragem e revolução nas bandeiras",
          funfato: "Mais de 150 bandeiras têm vermelho — é a cor mais comum em bandeiras do mundo!",
          detalhe: "Coragem, sacrifício, revolução | Brasil, EUA, China, França, Japão usam vermelho"
        },
        {
          id: "flag-az",
          nome: "Azul",
          hex: "#1565C0",
          emoji: "🔵",
          exemplo: "paz e liberdade nas bandeiras",
          funfato: "Azul representa o oceano ou o céu — liberdade e paz em muitas culturas!",
          detalhe: "Paz, lealdade, céu | ONU usa azul | Brasil, Argentina, França, Austrália"
        },
        {
          id: "flag-am",
          nome: "Amarelo",
          hex: "#F9A825",
          emoji: "⭐",
          exemplo: "riqueza e sol nas bandeiras",
          funfato: "Dourado/amarelo representa riqueza mineral e o sol em bandeiras africanas!",
          detalhe: "Ouro, sol, riqueza | Brasil (ouro), Vietnã (estrela), Suécia, Alemanha"
        },
        {
          id: "flag-vd",
          nome: "Verde",
          hex: "#2E7D32",
          emoji: "🌿",
          exemplo: "natureza e islã nas bandeiras",
          funfato: "Verde é sagrado no islã — por isso muitas bandeiras de países muçulmanos têm verde!",
          detalhe: "Natureza, islã, esperança | Brasil (florestas), Paquistão, Arábia Saudita"
        },
        {
          id: "flag-bc",
          nome: "Branco",
          hex: "#9E9E9E",
          emoji: "🕊️",
          exemplo: "paz e pureza nas bandeiras",
          funfato: "Bandeira branca é sinal universal de paz e rendição desde a Idade Média!",
          detalhe: "Paz, pureza, honestidade | Japão (sol no branco), Suíça, Israel"
        },
        {
          id: "flag-pt",
          nome: "Preto",
          hex: "#212121",
          emoji: "🖤",
          exemplo: "força e povo nas bandeiras",
          funfato: "Preto em bandeiras africanas representa o povo africano e a determinação!",
          detalhe: "Pan-Africanismo | Força, luto, determinação | Alemanha, Quênia, Uganda"
        },
        {
          id: "flag-la",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🔶",
          exemplo: "criatividade e realeza",
          funfato: "A Holanda usa laranja porque a casa real (Casa de Orange) tem esse nome!",
          detalhe: "Casa de Orange-Nassau | Protestantismo | Índia (budismo), Irlanda"
        },
        {
          id: "flag-rx",
          nome: "Roxo",
          hex: "#6A1B9A",
          emoji: "👑",
          exemplo: "raridade real nas bandeiras",
          funfato: "Roxo é raríssimo em bandeiras — Nicarágua e Dominica são os únicos países!",
          detalhe: "Raridade do pigmento púrpura histórico | Apenas 2 países têm roxo na bandeira"
        }
      ]
    }
  },
  {
    id: "con_cores_arte",
    tipo: "cores",
    titulo: "Cores na Arte",
    descricao: "Como grandes artistas usaram as cores para criar emoções!",
    emoji: "🎨",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "Os maiores pintores escolhiam cores com cuidado científico! 🎨 Descubra o que cada cor revelava na obra de arte. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "art-az",
          nome: "Azul Klein",
          hex: "#002FA7",
          emoji: "🎨",
          exemplo: "o azul mais famoso do mundo",
          funfato: "Yves Klein criou um azul tão intenso que patenteou a cor — o IKB (1960)!",
          detalhe: "International Klein Blue | Ultramarine + verniz Rhodopas | Patente registrada"
        },
        {
          id: "art-vm",
          nome: "Vermelho Rembrandt",
          hex: "#9B2335",
          emoji: "🖼️",
          exemplo: "como os drapeados de Rembrandt",
          funfato: "Rembrandt usava vermelho carmesim para criar profundidade dramática nos quadros!",
          detalhe: "Carmim de garança | Pigmento de madder (raiz de Rubia) | Técnica chiaroscuro"
        },
        {
          id: "art-am",
          nome: "Amarelo van Gogh",
          hex: "#FFD700",
          emoji: "🌻",
          exemplo: "como os girassóis de van Gogh",
          funfato: "Van Gogh tinha obsessão pelo amarelo — a cor da luz artificial o fascinava!",
          detalhe: "Amarelo cromo (tóxico) | Amarelo de cádmio | \"Noite Estrelada\" tem muito amarelo"
        },
        {
          id: "art-vd",
          nome: "Verde Monet",
          hex: "#4CAF50",
          emoji: "🌿",
          exemplo: "como o jardim de Monet",
          funfato: "Monet plantou jardins inteiros para estudar como a luz muda as cores das plantas!",
          detalhe: "Impressionismo | Mesmo tema em horas diferentes | Série de nenúfares: 250 quadros"
        },
        {
          id: "art-pt",
          nome: "Preto Mondrian",
          hex: "#212121",
          emoji: "⬛",
          exemplo: "como as linhas de Mondrian",
          funfato: "Mondrian usava apenas preto, branco e as 3 primárias — geometria pura!",
          detalhe: "De Stijl | 1917 | Neoplasticismo | Influência direta no design gráfico moderno"
        },
        {
          id: "art-bc",
          nome: "Branco Malevich",
          hex: "#F5F5F5",
          emoji: "⬜",
          exemplo: "como o Quadrado Branco",
          funfato: "Malevich pintou um quadrado branco sobre fundo branco — arte pura sem representação!",
          detalhe: "Suprematismo | \"Quadrado Branco\" 1918 | Influência no design minimalista"
        },
        {
          id: "art-la",
          nome: "Laranja Gauguin",
          hex: "#E65100",
          emoji: "🌺",
          exemplo: "como as obras do Taiti",
          funfato: "Gauguin usava laranjas vibrantes para capturar a luz tropical do Taiti!",
          detalhe: "Pós-impressionismo | Fuga para a Polinésia | Cores expressivas, não realistas"
        },
        {
          id: "art-rx",
          nome: "Roxo Chagall",
          hex: "#7B1FA2",
          emoji: "🌙",
          exemplo: "como os sonhos de Chagall",
          funfato: "Chagall usava roxo e azul para criar um mundo de sonhos em suas pinturas!",
          detalhe: "Marc Chagall | Surrealismo/Fauvismo | Memórias de infância em cores oníricas"
        }
      ]
    }
  },
  {
    id: "con_cores_materiais",
    tipo: "cores",
    titulo: "Cores dos Materiais",
    descricao: "Por que cada material tem sua cor característica?",
    emoji: "⚗️",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "Cada material tem uma cor que conta sua história! ⚗️ Do ouro ao cobre, cada cor tem uma razão química. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "mat-au",
          nome: "Dourado Ouro",
          hex: "#FFD700",
          emoji: "💛",
          exemplo: "como o ouro",
          funfato: "O ouro é amarelo porque seus elétrons absorvem luz azul e refletem dourado!",
          detalhe: "Efeitos relativísticos | Elétrons do Au mais rápidos | Absorção de azul ~500nm"
        },
        {
          id: "mat-ag",
          nome: "Prateado Prata",
          hex: "#9E9E9E",
          emoji: "🪙",
          exemplo: "como a prata",
          funfato: "A prata reflete 95% da luz visível — é o metal mais refletivo da natureza!",
          detalhe: "Refletância: ~95% | Espelho original: vidro + prata | Maior condutividade elétrica"
        },
        {
          id: "mat-cu",
          nome: "Cobre Rosado",
          hex: "#B87333",
          emoji: "🟤",
          exemplo: "como o cobre novo",
          funfato: "O cobre novo é rosado, mas fica verde com o tempo por causa da oxidação!",
          detalhe: "Pátina: Cu₂(OH)₂CO₃ | Estátua da Liberdade: cobre oxidado = verde"
        },
        {
          id: "mat-fe",
          nome: "Cinza Ferro",
          hex: "#607D8B",
          emoji: "⚙️",
          exemplo: "como o aço",
          funfato: "Ferro enferrujado é vermelho por causa do óxido de ferro — a mesma cor de Marte!",
          detalhe: "Fe₂O₃ (hematita) = vermelho | Fe₃O₄ (magnetita) = preto | Aço-inox: Cr evita"
        },
        {
          id: "mat-em",
          nome: "Verde Esmeralda",
          hex: "#00695C",
          emoji: "💎",
          exemplo: "como a esmeralda",
          funfato: "A esmeralda verde contém cromo — o mesmo elemento que tinge rubi de vermelho!",
          detalhe: "Berilo + Cr³⁺ | Cromo dá verde em esmeralda e vermelho em rubi — paradoxo!"
        },
        {
          id: "mat-am",
          nome: "Violeta Ametista",
          hex: "#7B1FA2",
          emoji: "💜",
          exemplo: "como a ametista",
          funfato: "A ametista fica descolorida ao sol — a radiação UV destrói o pigmento roxo!",
          detalhe: "Quartzo + Fe⁴⁺ irradiado | Fotossensível | UV destrói centros de cor"
        }
      ]
    }
  },
  {
    id: "con_cores_mistura",
    tipo: "cores",
    titulo: "A Ciência das Misturas",
    descricao: "Como as cores se misturam para criar novas cores!",
    emoji: "🧪",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "O laboratório de cores está aberto! 🧪 Quando você mistura duas cores, o que acontece? Descubra cada combinação. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "mix-vm-am",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🎨",
          exemplo: "vermelho + amarelo = laranja!",
          funfato: "Misturar vermelho e amarelo cria laranja — experimente com guache!",
          detalhe: "Síntese subtrativa | RYB: R+Y=O | Cor secundária | Comprimento de onda ~610nm"
        },
        {
          id: "mix-az-am",
          nome: "Verde",
          hex: "#388E3C",
          emoji: "🧪",
          exemplo: "azul + amarelo = verde!",
          funfato: "Azul e amarelo fazem verde — o mesmo verde das plantas em tinta de pintura!",
          detalhe: "Síntese subtrativa | RYB: B+Y=G | Cor secundária | Clorofila é verde natural"
        },
        {
          id: "mix-vm-az",
          nome: "Roxo",
          hex: "#6A1B9A",
          emoji: "🎭",
          exemplo: "vermelho + azul = roxo!",
          funfato: "Vermelho e azul fazem roxo — a cor mais difícil de criar na Antiguidade!",
          detalhe: "Síntese subtrativa | RYB: R+B=V | Cor secundária | Raridade histórica"
        },
        {
          id: "mix-vm-bc",
          nome: "Rosa",
          hex: "#E91E8C",
          emoji: "🌸",
          exemplo: "vermelho + branco = rosa!",
          funfato: "Vermelho com branco faz rosa — adicionar branco aclara qualquer cor!",
          detalhe: "Tom de vermelho | Branco = dilui + aclara | Rosa não existe no espectro"
        },
        {
          id: "mix-az-bc",
          nome: "Azul Claro",
          hex: "#64B5F6",
          emoji: "💧",
          exemplo: "azul + branco = azul claro!",
          funfato: "Azul com branco faz azul claro — como o azul do céu ao meio-dia!",
          detalhe: "Tom de azul | Tinte = mistura com branco | Mesma lógica para qualquer cor"
        },
        {
          id: "mix-pt-bc",
          nome: "Cinza",
          hex: "#9E9E9E",
          emoji: "🌫️",
          exemplo: "preto + branco = cinza!",
          funfato: "Preto e branco fazem cinza — há infinitos tons entre o branco e o preto!",
          detalhe: "Tom neutro | 256 tons de cinza em 8 bits | Ausência de saturação"
        },
        {
          id: "mix-vm-vd",
          nome: "Marrom",
          hex: "#5D4037",
          emoji: "🟤",
          exemplo: "complementares = marrom!",
          funfato: "Misturar vermelho e verde (complementares) cria marrom — opostos se neutralizam!",
          detalhe: "Complementares → marrom/neutro | Impressionistas evitavam essa mistura"
        },
        {
          id: "mix-3pri",
          nome: "Preto",
          hex: "#212121",
          emoji: "⚫",
          exemplo: "todas as cores = preto!",
          funfato: "Misturar as 3 primárias (vermelho + azul + amarelo) resulta em preto/marrom escuro!",
          detalhe: "Síntese subtrativa | R+B+Y absorve quase todo espectro | Contrário da luz"
        }
      ]
    }
  },
  {
    id: "con_cores_sombra_luz",
    tipo: "cores",
    titulo: "Luz, Sombra e Brilho",
    descricao: "Como a luz muda as cores que vemos!",
    emoji: "💡",
    habilidade: "Expressão Artística",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "A mesma cor pode parecer diferente dependendo da luz! 💡 Descubra como pintores e fotógrafos entendem isso. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "luz-bc",
          nome: "Branco Luz Plena",
          hex: "#FFFFFF",
          emoji: "☀️",
          exemplo: "como a luz do sol",
          funfato: "A luz branca do sol contém TODAS as cores do espectro — Newton provou com prisma!",
          detalhe: "Luz branca = todas as λ visíveis | Prisma decompõe | 400-700nm combinados"
        },
        {
          id: "luz-am",
          nome: "Amarelo Incandescente",
          hex: "#FDD835",
          emoji: "💡",
          exemplo: "como a lâmpada amarela",
          funfato: "Lâmpadas incandescentes têm luz amarela porque o filamento quente emite calor!",
          detalhe: "2.700K temperatura de cor | Corpo negro | LED moderno imita essa temperatura"
        },
        {
          id: "luz-ci",
          nome: "Cinza Meia Sombra",
          hex: "#9E9E9E",
          emoji: "🌥️",
          exemplo: "como a penumbra",
          funfato: "Penumbra é a área entre sombra total e luz direta — sombras suaves acontecem aqui!",
          detalhe: "Difração e espalhamento | Múltiplas fontes de luz | Menos intensa que plena luz"
        },
        {
          id: "luz-az",
          nome: "Azul Sombra",
          hex: "#283593",
          emoji: "🌑",
          exemplo: "como a sombra no chão",
          funfato: "Sombras não são cinzas — são levemente azuladas porque refletem o céu azul!",
          detalhe: "Luz difusa do céu: ~6.500K (azul) | Impressionistas pintavam sombras azuis!"
        },
        {
          id: "luz-la",
          nome: "Laranja Reflexo",
          hex: "#FF6F00",
          emoji: "🏠",
          exemplo: "como a cor refletida de paredes",
          funfato: "Uma parede laranja pode tingir de laranja objetos brancos próximos a ela!",
          detalhe: "Reflexo indireto | Fotografia: fill light colorido | Interação entre superfícies"
        },
        {
          id: "luz-rx",
          nome: "Roxo Crepúsculo",
          hex: "#4A148C",
          emoji: "🌆",
          exemplo: "como o céu ao anoitecer",
          funfato: "Ao anoitecer, o azul do céu escurece e os últimos tons vermelhos criam o roxo!",
          detalhe: "Espalhamento Rayleigh residual + escuridão do espaço = roxo/violeta"
        }
      ]
    }
  }
]

// ── Fase 2 — padrão, robô, labirinto ──
export const fase2ExtraPorFaixa = [
  {
    id: "con_padrao_tabuada",
    tipo: "padrao",
    titulo: "Grade da Tabuada",
    descricao: "Descubra o padrão de multiplicação!",
    emoji: "✖️",
    habilidade: "Lógica Matemática",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 9,
    historinha: "A calculadora da escola está aprendendo a tabuada! ✖️ Mas ela precisa descobrir o padrão por conta própria. Você consegue ajudá-la?",
    puzzles: [
      {
        matriz: ["1", "2", "3", "2", "4", "6", "3", "6", "❓"],
        resposta: "9",
        opcoes: ["7", "8", "9", "12"],
        dica: "Linha 1 são múltiplos de 1; linha 2, múltiplos de 2; linha 3, múltiplos de 3."
      },
      {
        matriz: ["1", "2", "4", "2", "4", "8", "4", "8", "❓"],
        resposta: "16",
        opcoes: ["12", "14", "16", "24"],
        dica: "Cada número é o dobro do da linha anterior!"
      },
      {
        matriz: ["1", "3", "9", "3", "9", "27", "9", "27", "❓"],
        resposta: "81",
        opcoes: ["54", "63", "81", "108"],
        dica: "Cada número multiplica por 3 — potências de 3!"
      },
      {
        matriz: ["5", "10", "15", "10", "20", "30", "15", "30", "❓"],
        resposta: "45",
        opcoes: ["35", "40", "45", "60"],
        dica: "A grade segue a tabuada: linha × coluna × 5!"
      },
      {
        matriz: ["0", "1", "2", "1", "2", "3", "2", "3", "❓"],
        resposta: "4",
        opcoes: ["3", "4", "5", "6"],
        dica: "Cada célula é linha + coluna (começando do zero)!"
      }
    ]
  },
  {
    id: "con_padrao_logica",
    tipo: "padrao",
    titulo: "Lógica em Grade",
    descricao: "Encontre a regra escondida na grade!",
    emoji: "🧩",
    habilidade: "Raciocínio Lógico",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 9,
    historinha: "O detetive de padrões encontrou grades misteriosas! 🧩 Cada uma tem uma regra diferente. Descubra qual é a regra e complete a grade!",
    puzzles: [
      {
        matriz: ["Z", "Y", "X", "Y", "X", "W", "X", "W", "❓"],
        resposta: "V",
        opcoes: ["V", "W", "U", "X"],
        dica: "Cada linha vai para o próximo conjunto de letras do alfabeto ao contrário!"
      },
      {
        matriz: ["2", "3", "5", "3", "5", "8", "5", "8", "❓"],
        resposta: "13",
        opcoes: ["11", "12", "13", "21"],
        dica: "A sequência de Fibonacci! 2,3,5,8,13..."
      },
      {
        matriz: ["N", "S", "L", "S", "L", "O", "L", "O", "❓"],
        resposta: "N",
        opcoes: ["N", "S", "L", "O"],
        dica: "São os pontos cardeais: Norte, Sul, Leste, Oeste — ciclando!"
      },
      {
        matriz: ["Jan", "Fev", "Mar", "Fev", "Mar", "Abr", "Mar", "Abr", "❓"],
        resposta: "Mai",
        opcoes: ["Abr", "Mai", "Jun", "Mar"],
        dica: "Meses consecutivos — cada linha avança um mês!"
      },
      {
        matriz: ["🌱", "🌿", "🌳", "🌿", "🌳", "🍂", "🌳", "🍂", "❓"],
        resposta: "🌰",
        opcoes: ["🌱", "🌿", "🌳", "🌰"],
        dica: "O ciclo das estações da árvore!"
      }
    ]
  },
  {
    id: "con_padrao_matematica",
    tipo: "padrao",
    titulo: "Matemática Mágica",
    descricao: "Somas e diferenças em padrão!",
    emoji: "🔢",
    habilidade: "Lógica Matemática",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 9,
    historinha: "O quadro mágico da matemática perdeu um número! 🔢 Em cada linha, coluna e diagonal a soma tem que bater. Você consegue descobrir o número que falta?",
    puzzles: [
      {
        matriz: ["2", "9", "4", "7", "5", "3", "6", "1", "❓"],
        resposta: "8",
        opcoes: ["6", "7", "8", "9"],
        dica: "Quadrado mágico: cada linha, coluna e diagonal soma 15!"
      },
      {
        matriz: ["4", "3", "8", "9", "5", "1", "2", "7", "❓"],
        resposta: "6",
        opcoes: ["4", "5", "6", "7"],
        dica: "Quadrado mágico: soma 15 em qualquer direção!"
      },
      {
        matriz: ["100", "50", "25", "50", "25", "12", "25", "12", "❓"],
        resposta: "6",
        opcoes: ["5", "6", "7", "8"],
        dica: "Cada número é metade do anterior!"
      },
      {
        matriz: ["1", "1", "2", "1", "2", "3", "2", "3", "❓"],
        resposta: "5",
        opcoes: ["4", "5", "6", "7"],
        dica: "Fibonacci: cada célula é a soma das duas anteriores na diagonal!"
      },
      {
        matriz: ["81", "27", "9", "27", "9", "3", "9", "3", "❓"],
        resposta: "1",
        opcoes: ["1", "2", "3", "4"],
        dica: "Dividindo por 3 a cada passo — potências de 3 ao contrário!"
      }
    ]
  },
  {
    id: "con_robo_cidade",
    tipo: "robo",
    titulo: "Robô na Cidade",
    descricao: "Navegue pelas ruas da cidade!",
    emoji: "🏙️",
    habilidade: "Pensamento Computacional",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "O robô de entrega precisa chegar ao destino! 🏙️ As ruas da cidade têm vários bloqueios. Planeje a rota mais eficiente!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [2, 1],
          [2, 2],
          [2, 3]
        ],
        passos_max: 8
      },
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [0, 2],
          [1, 2],
          [3, 2],
          [4, 2]
        ],
        passos_max: 8
      }
    ]
  },
  {
    id: "con_robo_fabrica",
    tipo: "robo",
    titulo: "Robô da Fábrica",
    descricao: "Leve a peça até a esteira!",
    emoji: "🏭",
    habilidade: "Pensamento Computacional",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "O robô industrial precisa levar uma peça do ponto A ao ponto B! 🏭 Mas a fábrica tem máquinas no caminho. Encontre a rota segura!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 4],
        fim: [4, 0],
        paredes: [
          [2, 2]
        ],
        passos_max: 8
      },
      {
        grade: 5,
        inicio: [0, 4],
        fim: [4, 0],
        paredes: [
          [4, 1],
          [4, 2],
          [4, 3]
        ],
        passos_max: 8
      }
    ]
  },
  {
    id: "con_labirinto_escola",
    tipo: "labirinto",
    titulo: "Corredores da Escola",
    descricao: "Encontre o caminho até a biblioteca!",
    emoji: "🏫",
    habilidade: "Raciocínio Espacial",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 8,
    historinha: "A biblioteca está fechando em 5 minutos! 🏫 Os corredores da escola são um labirinto. Encontre o caminho mais rápido antes que as luzes se apaguem!",
    tamanho: 7
  },
  {
    id: "con_labirinto_piramide",
    tipo: "labirinto",
    titulo: "Pirâmide do Egito",
    descricao: "Explore os túneis da pirâmide!",
    emoji: "🏛️",
    habilidade: "Raciocínio Espacial",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 9,
    historinha: "Você é um arqueólogo explorando a pirâmide! 🏛️ Os túneis são escuros e longos. Ache a câmara do tesouro seguindo as marcas nas paredes!",
    tamanho: 9
  },
  {
    id: "con_labirinto_espaco",
    tipo: "labirinto",
    titulo: "Estação Espacial",
    descricao: "Navegue pelos tubos da estação!",
    emoji: "🚀",
    habilidade: "Raciocínio Espacial",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 9,
    historinha: "A nave espacial tem tubos de passagem em todas as direções! 🚀 O módulo de controle está do outro lado. Navegue pelos tubos sem se perder!",
    tamanho: 9
  },
  {
    id: "con_labirinto_caverna",
    tipo: "labirinto",
    titulo: "Caverna de Cristal",
    descricao: "Ache a saída da caverna!",
    emoji: "💎",
    habilidade: "Raciocínio Espacial",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "Os cristais brilham nas paredes desta caverna misteriosa! 💎 A saída existe, mas os caminhos enganam. Use a lógica para não entrar em becos sem saída!",
    tamanho: 11
  }
]

// ── Fase 3 — blocos, inventor, robô e quizia extras ──
export const fase3ExtraPorFaixa = [
  {
    id: "con_blocos_3",
    tipo: "blocos",
    titulo: "Labirinto Digital",
    descricao: "Programe o caminho exato com loops para sair do labirinto!",
    emoji: "🌀",
    habilidade: "Programação",
    xp_reward: 115,
    coins_reward: 115,
    tempo_estimado: 14,
    historinha: "No mundo digital, programas resolvem labirintos milhões de vezes por segundo. 🌀 Cada app de mapa do seu celular usa exatamente essa lógica — sequências de movimentos otimizadas. Mostre que você pensa como um algoritmo!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [0, 2],
          [0, 3],
          [0, 4],
          [1, 2],
          [1, 3],
          [1, 4],
          [2, 2],
          [3, 0],
          [3, 1],
          [3, 2],
          [4, 0],
          [4, 1],
          [4, 2]
        ],
        passos_max: 6,
        dica: "Suba pelo corredor da direita depois contorne!"
      },
      {
        grade: 5,
        inicio: [2, 0],
        fim: [2, 4],
        paredes: [
          [0, 1],
          [1, 1],
          [3, 1],
          [4, 1],
          [0, 2],
          [1, 2],
          [3, 2],
          [4, 2],
          [0, 3],
          [1, 3],
          [3, 3],
          [4, 3]
        ],
        passos_max: 5,
        dica: "Você está no centro — desça pelo corredor do meio!"
      },
      {
        grade: 6,
        inicio: [0, 5],
        fim: [5, 0],
        paredes: [
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [4, 3],
          [4, 2],
          [4, 1],
          [3, 1],
          [2, 1],
          [2, 2],
          [2, 3]
        ],
        passos_max: 8,
        dica: "Suba, contorne o L e chegue ao destino!"
      }
    ]
  },
  {
    id: "con_blocos_4",
    tipo: "blocos",
    titulo: "Código Espelho",
    descricao: "Movimentos simétricos — o bloco de repetição é seu melhor amigo!",
    emoji: "🪞",
    habilidade: "Programação",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 14,
    historinha: "Simetria está em todo lugar: nas asas da borboleta, nos fractais da natureza e também no código! 🪞 Quando os movimentos se repetem de forma espelhada, loops economizam tempo. Resolva os desafios com o mínimo de blocos!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 2],
        fim: [4, 2],
        paredes: [
          [1, 0],
          [1, 1],
          [1, 3],
          [1, 4],
          [3, 0],
          [3, 1],
          [3, 3],
          [3, 4]
        ],
        passos_max: 5,
        dica: "Siga o corredor central → use R4!"
      },
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 0],
        paredes: [
          [0, 2],
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 2],
          [0, 4],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [5, 4]
        ],
        passos_max: 3,
        dica: "Linha reta de 5 passos — use → R5!"
      },
      {
        grade: 5,
        inicio: [4, 4],
        fim: [0, 0],
        paredes: [
          [3, 3],
          [2, 2],
          [1, 1]
        ],
        passos_max: 6,
        dica: "Contorne a diagonal de obstáculos!"
      }
    ]
  },
  {
    id: "con_robo_3",
    tipo: "robo",
    titulo: "Robô Marinheiro",
    descricao: "Navegue o robô pelos canais sem afundar!",
    emoji: "⚓",
    habilidade: "Pensamento Computacional",
    xp_reward: 125,
    coins_reward: 125,
    tempo_estimado: 15,
    historinha: "O Robô Capitão precisa navegar pelo porto cheio de ilhas! ⚓ Cada parede é uma ilha que ele não pode atravessar. Calcule o caminho certo para atracar no destino!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [3, 1],
          [3, 2],
          [3, 3],
          [3, 4]
        ],
        passos_max: 12,
        dica: "Contorne a parede esquerda e depois a direita!"
      },
      {
        grade: 5,
        inicio: [4, 0],
        fim: [0, 4],
        paredes: [
          [2, 0],
          [2, 1],
          [0, 2],
          [1, 2],
          [2, 2],
          [2, 3],
          [2, 4]
        ],
        passos_max: 10,
        dica: "Contorne a parede em forma de cruz pelo exterior!"
      },
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 5],
        paredes: [
          [0, 2],
          [1, 2],
          [2, 2],
          [2, 3],
          [2, 4],
          [2, 5],
          [4, 0],
          [4, 1],
          [4, 2],
          [4, 3]
        ],
        passos_max: 14,
        dica: "Duas paredes pra contornar — planeje o caminho maior!"
      }
    ]
  },
  {
    id: "con_inventor_2",
    tipo: "inventor",
    titulo: "Inventor da Natureza",
    descricao: "Crie soluções para problemas do meio ambiente!",
    emoji: "🌱",
    habilidade: "Criatividade Ambiental",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "O planeta precisa de inventores criativos! 🌱 Poluição, desmatamento, falta de água... esses são problemas reais. A IA vai avaliar sua invenção: ela é criativa? Funciona? Pode ajudar o meio ambiente?",
    inspiracoes: [
      "Um aspirador que limpa o plástico dos rios automaticamente",
      "Uma mochila que planta sementes enquanto a criança caminha",
      "Um jogo que ensina as crianças a reciclar de forma divertida"
    ]
  },
  {
    id: "con_inventor_3",
    tipo: "inventor",
    titulo: "Inventor da Escola",
    descricao: "Que invenção tornaria a escola mais legal?",
    emoji: "🏫",
    habilidade: "Criatividade",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "E se você pudesse inventar algo para melhorar a escola? 🏫 Uma mochila inteligente? Um app para ajudar com dever de casa? A IA vai avaliar se sua ideia é criativa e útil!",
    inspiracoes: [
      "Uma agenda digital que manda lembrete de provas e deveres para os pais",
      "Um robô auxiliar que ajuda crianças com dificuldade de leitura",
      "Uma carteira escolar que vira mesa e suporte para tablet ao mesmo tempo"
    ]
  },
  {
    id: "con_blocos_2",
    tipo: "blocos",
    titulo: "Loops Avançados",
    descricao: "Desafios maiores com o poder dos blocos de repetição!",
    emoji: "🔁",
    habilidade: "Programação",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 13,
    historinha: "Programadores profissionais usam loops para evitar repetir o mesmo código várias vezes. 🔁 O bloco 🔁×N é o seu loop — ele repete o comando anterior N vezes. Use-o para resolver os desafios com o mínimo de blocos!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 2],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4]
        ],
        passos_max: 4,
        dica: "Só tem caminho pelas colunas 0,1,2. Vá → 2, ↓ 4!"
      },
      {
        grade: 5,
        inicio: [0, 4],
        fim: [4, 0],
        paredes: [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 3]
        ],
        passos_max: 4,
        dica: "Desça 4 depois vá para a esquerda 4. Use dois R4!"
      },
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 5],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4]
        ],
        passos_max: 4,
        dica: "Vá 5 à direita, depois desça 5 — use R5 duas vezes!"
      }
    ]
  },
  {
    id: "con_robo_2",
    tipo: "robo",
    titulo: "Robô Construtor",
    descricao: "Novos labirintos de obstáculos para o robô!",
    emoji: "🏗️",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 14,
    historinha: "O Robô Construtor precisa entregar materiais na obra! 🏗️ O canteiro de obras tem caixas e andaimes por todo lado. Programe o caminho mais eficiente para evitar os obstáculos!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [0, 2],
          [0, 3],
          [0, 4],
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [4, 3]
        ],
        passos_max: 10,
        dica: "Desce, contorna a parede e vai até o canto inferior!"
      },
      {
        grade: 5,
        inicio: [4, 0],
        fim: [0, 4],
        paredes: [
          [3, 0],
          [2, 0],
          [1, 4],
          [2, 4],
          [3, 4],
          [2, 1],
          [2, 2],
          [2, 3]
        ],
        passos_max: 10,
        dica: "Sobe pelo lado esquerdo, contorna pelo meio!"
      },
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 5],
        paredes: [
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [0, 3],
          [1, 3],
          [3, 3],
          [4, 3],
          [5, 3]
        ],
        passos_max: 12,
        dica: "Evite as paredes verticais e horizontais na grade 6×6!"
      }
    ]
  },
  {
    id: "con_quizia_2",
    tipo: "quizia",
    titulo: "Quiz Turbo 2",
    descricao: "Novos temas de ciências e cultura para o Quiz IA!",
    emoji: "⚡",
    habilidade: "Conhecimento Geral",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "O Quiz Turbo está de volta com novos temas! ⚡ A IA gerou perguntas sobre assuntos que você nunca imaginou. Escolha um tema e prepare-se para aprender!",
    temas: ["🌋 Vulcões", "🦈 Tubarões", "🏗️ Construções Famosas", "🌡️ Clima e Tempo"]
  },
  {
    id: "con_quizia_3",
    tipo: "quizia",
    titulo: "Quiz IA — Cultura e Natureza",
    descricao: "IA cria perguntas sobre o Brasil e as maravilhas do mundo!",
    emoji: "🎭",
    habilidade: "Cultura Geral",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "O Brasil tem folclore, ritmos e paisagens únicos no mundo! 🎭 E lá fora existem maravilhas que você precisa conhecer. A IA preparou temas que misturam cultura e natureza — qual você escolhe?",
    temas: [
      "🎭 Folclore Brasileiro",
      "🦁 Animais da Savana",
      "🏔️ Maravilhas do Mundo",
      "🎵 Música e Instrumentos"
    ]
  }
]

// ── Fase 4 — robô e padrão (2 por faixa) ──
export const fase4ExtraPorFaixa = [
  {
    id: "con_robo_4",
    tipo: "robo",
    titulo: "Robô Bombeiro",
    descricao: "Programe o robô para apagar o incêndio mais rápido!",
    emoji: "🚒",
    habilidade: "Pensamento Computacional",
    xp_reward: 115,
    coins_reward: 115,
    tempo_estimado: 12,
    historinha: "O Robô Bombeiro foi chamado para uma emergência! 🚒 Mas a rua tem barricadas que bloqueiam a passagem. Programe a rota mais eficiente para chegar ao foco do incêndio!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3]
        ],
        passos_max: 10,
        dica: "A barreira bloqueia o centro — passe pela extremidade direita!"
      },
      {
        grade: 5,
        inicio: [4, 4],
        fim: [0, 0],
        paredes: [
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2]
        ],
        passos_max: 10,
        dica: "Suba pelo lado direito e depois vá pela linha de cima!"
      },
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [1, 1],
          [1, 2],
          [1, 3],
          [3, 1],
          [3, 2],
          [3, 3]
        ],
        passos_max: 10,
        dica: "Dois obstáculos horizontais — use as bordas para contornar!"
      }
    ]
  },
  {
    id: "con_robo_5",
    tipo: "robo",
    titulo: "Robô Meteorologista",
    descricao: "Navegue pelas frentes de ar para chegar à estação!",
    emoji: "🌦️",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 13,
    historinha: "O Robô Meteorologista precisa instalar sensores de clima! 🌦️ Mas as frentes de vento bloqueiam alguns caminhos. Encontre a rota que leva o robô ao destino certo!",
    niveis: [
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [0, 2],
          [1, 2],
          [3, 2],
          [4, 2]
        ],
        passos_max: 10,
        dica: "Use o corredor que passa pelo meio onde não há bloqueio!"
      },
      {
        grade: 5,
        inicio: [4, 0],
        fim: [0, 4],
        paredes: [
          [1, 0],
          [1, 1],
          [1, 2],
          [3, 1],
          [3, 2],
          [3, 3]
        ],
        passos_max: 10,
        dica: "Vai pela direita e sobe pela extremidade!"
      }
    ]
  },
  {
    id: "con_padrao_historia",
    tipo: "padrao",
    titulo: "Padrões da História",
    descricao: "Números romanos, séculos e civilizações em sequência!",
    emoji: "🏛️",
    habilidade: "Raciocínio Histórico",
    xp_reward: 85,
    coins_reward: 85,
    tempo_estimado: 10,
    historinha: "O historiador perdeu a ordem dos eventos! 🏛️ Cada grade tem um padrão histórico escondido. Descubra a regra para completar o quadro!",
    puzzles: [
      {
        matriz: ["I", "II", "III", "II", "III", "IV", "III", "IV", "❓"],
        resposta: "V",
        opcoes: ["IV", "V", "VI", "X"],
        dica: "Números romanos crescendo em cada diagonal!"
      },
      {
        matriz: ["Pedra", "Bronze", "Ferro", "Bronze", "Ferro", "Aço", "Ferro", "Aço", "❓"],
        resposta: "Digital",
        opcoes: ["Aço", "Nuclear", "Digital", "Espacial"],
        dica: "A evolução dos materiais que os humanos dominaram!"
      },
      {
        matriz: ["1800", "1850", "1900", "1850", "1900", "1950", "1900", "1950", "❓"],
        resposta: "2000",
        opcoes: ["1975", "1990", "2000", "2050"],
        dica: "Os séculos avançam em 50 anos por diagonal!"
      },
      {
        matriz: ["Caça", "Pesca", "Cultivo", "Pesca", "Cultivo", "Criação", "Cultivo", "Criação", "❓"],
        resposta: "Indústria",
        opcoes: ["Cultivo", "Criação", "Comércio", "Indústria"],
        dica: "A evolução da alimentação humana ao longo da história!"
      },
      {
        matriz: [
          "Grego",
          "Romano",
          "Medieval",
          "Romano",
          "Medieval",
          "Renascentista",
          "Medieval",
          "Renascentista",
          "❓"
        ],
        resposta: "Moderno",
        opcoes: ["Medieval", "Renascentista", "Moderno", "Contemporâneo"],
        dica: "Cada período histórico leva ao próximo na diagonal!"
      }
    ]
  },
  {
    id: "con_padrao_natureza",
    tipo: "padrao",
    titulo: "Padrões da Natureza",
    descricao: "Ciclos da água, cadeias alimentares e elementos!",
    emoji: "🌿",
    habilidade: "Pensamento Científico",
    xp_reward: 85,
    coins_reward: 85,
    tempo_estimado: 10,
    historinha: "O cientista misturou os dados dos experimentos! 🌿 Cada grade esconde um padrão da natureza. Descubra a regra e complete o quadro!",
    puzzles: [
      {
        matriz: ["💧", "💦", "🌊", "💦", "🌊", "☁️", "🌊", "☁️", "❓"],
        resposta: "🌧️",
        opcoes: ["💧", "☁️", "🌧️", "🌨️"],
        dica: "O ciclo da água: gota, corrente, mar, nuvem, chuva!"
      },
      {
        matriz: ["🌱", "🐛", "🦋", "🐛", "🦋", "🐝", "🦋", "🐝", "❓"],
        resposta: "🌺",
        opcoes: ["🌱", "🐛", "🌺", "🌸"],
        dica: "Cada diagonal apresenta um ser diferente no ecossistema!"
      },
      {
        matriz: ["H", "He", "Li", "He", "Li", "Be", "Li", "Be", "❓"],
        resposta: "B",
        opcoes: ["Be", "B", "C", "N"],
        dica: "Os primeiros elementos da tabela periódica em ordem!"
      },
      {
        matriz: ["10°", "20°", "30°", "20°", "30°", "40°", "30°", "40°", "❓"],
        resposta: "50°",
        opcoes: ["40°", "45°", "50°", "60°"],
        dica: "A temperatura sobe 10° em cada diagonal!"
      },
      {
        matriz: ["🐾", "🦶", "🐾", "🦶", "🐾", "🦶", "🐾", "🦶", "❓"],
        resposta: "🐾",
        opcoes: ["🦶", "🐾", "🐕", "🦁"],
        dica: "Rastros de dois animais diferentes se alternam!"
      }
    ]
  }
]

// ── Fase 5 — quiz e inventor temáticos ──
export const fase5ExtraPorFaixa = [
  {
    id: "con_quiz_inventores",
    tipo: "quiz",
    titulo: "Grandes Inventores",
    descricao: "Conheça as mentes que mudaram a história!",
    emoji: "💡",
    habilidade: "Conhecimento Histórico",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 9,
    historinha: "O Museu dos Inventores abriu as portas! 🏛️ Aqui vivem as histórias das pessoas que criaram invenções que mudaram para sempre a vida humana. Você consegue identificar quem inventou o quê?",
    perguntas: [
      {
        pergunta: "Quem inventou a lâmpada elétrica depois de mais de 1.000 tentativas?",
        opcoes: ["Albert Einstein", "Thomas Edison", "Nikola Tesla", "Isaac Newton"],
        correta: 1,
        fato: "💡 Edison disse: \"Não falhei. Descobri 1.000 formas que não funcionam!\" Essa mentalidade de aprender com erros é o coração da ciência e da inovação."
      },
      {
        pergunta: "Quem criou a teoria da gravidade ao observar objetos caindo?",
        opcoes: ["Galileu Galilei", "Charles Darwin", "Isaac Newton", "Copérnico"],
        correta: 2,
        fato: "🍎 Isaac Newton tinha 23 anos quando desenvolveu a teoria da gravidade. Ele percebeu que a mesma força que faz objetos caírem também mantém a Lua em órbita ao redor da Terra."
      },
      {
        pergunta: "Quem foi a primeira mulher a ganhar o Prêmio Nobel e ganhou duas vezes?",
        opcoes: ["Ada Lovelace", "Marie Curie", "Amelia Earhart", "Florence Nightingale"],
        correta: 1,
        fato: "⚗️ Marie Curie ganhou o Nobel em Física (1903) e em Química (1911). Ela descobriu os elementos rádio e polônio. Seu laboratório ainda é radioativo hoje e precisa de proteção especial."
      },
      {
        pergunta: "Quem inventou o telefone em 1876?",
        opcoes: ["Alexander Graham Bell", "Marconi", "Nikola Tesla", "Benjamin Franklin"],
        correta: 0,
        fato: "📞 A primeira frase transmitida por telefone foi: \"Sr. Watson, venha aqui, quero falar com você.\" Hoje existem mais celulares no mundo do que pessoas — quase 8 bilhões!"
      },
      {
        pergunta: "Quem criou a teoria da evolução das espécies após 5 anos viajando pelo mundo?",
        opcoes: ["Isaac Newton", "Louis Pasteur", "Gregor Mendel", "Charles Darwin"],
        correta: 3,
        fato: "🦕 Darwin viajou no navio Beagle observando animais e plantas em diferentes ambientes. Ele percebeu que os seres vivos mudam ao longo de gerações para sobreviver melhor — isso é a evolução!"
      }
    ]
  },
  {
    id: "con_quiz_biomas",
    tipo: "quiz",
    titulo: "Biomas do Brasil",
    descricao: "Explore os ecossistemas mais ricos do planeta!",
    emoji: "🌿",
    habilidade: "Ciências Naturais",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 9,
    historinha: "O Brasil tem os biomas mais ricos do planeta! 🌿 Da Amazônia ao Cerrado, do Pantanal à Caatinga, são ecossistemas únicos cheios de vida. Vamos descobrir os segredos da natureza brasileira?",
    perguntas: [
      {
        pergunta: "Qual é a maior floresta tropical do mundo, que cobre boa parte do Brasil?",
        opcoes: ["Mata Atlântica", "Cerrado", "Amazônia", "Pantanal"],
        correta: 2,
        fato: "🌳 A Amazônia tem mais de 40.000 espécies de plantas e 1.300 espécies de pássaros! Ela abriga cerca de 10% de todas as espécies conhecidas do planeta!"
      },
      {
        pergunta: "Qual bioma brasileiro é a savana mais rica em biodiversidade do mundo?",
        opcoes: ["Caatinga", "Cerrado", "Pampa", "Mata Atlântica"],
        correta: 1,
        fato: "🌾 O Cerrado tem mais de 12.000 espécies de plantas, sendo 35% encontradas só aqui no mundo! É também o berço das águas do Brasil — nascem aqui os rios São Francisco, Araguaia e Tocantins."
      },
      {
        pergunta: "Qual é a maior área úmida continental do mundo, famosa por seus jacarés?",
        opcoes: ["Amazônia", "Restinga", "Pantanal", "Manguezal"],
        correta: 2,
        fato: "🐊 O Pantanal tem a maior concentração de jacarés do mundo — cerca de 10 milhões! Durante a chuva, 80% do Pantanal fica inundado, criando um paraíso para pássaros, peixes e onças."
      },
      {
        pergunta: "Qual bioma nordestino tem plantas adaptadas para sobreviver sem chuva por meses?",
        opcoes: ["Cerrado", "Caatinga", "Pampas", "Restinga"],
        correta: 1,
        fato: "🌵 A Caatinga é o único bioma 100% brasileiro! O cacto mandacaru armazena até 2.000 litros de água. O tatu-bola, exclusivo da Caatinga, se enrola como uma bolinha para se proteger de predadores."
      },
      {
        pergunta: "Qual ecossistema costeiro tem raízes dentro da água e é berçário de peixes?",
        opcoes: ["Mata Atlântica", "Mangue", "Restinga", "Brejo"],
        correta: 1,
        fato: "🦐 Os manguezais são a \"creche do mar\" — 70% dos peixes marinhos passam parte da vida neles! Suas raízes filtram a água, protegem a costa de tempestades e capturam carbono da atmosfera."
      }
    ]
  },
  {
    id: "con_inventor_4",
    tipo: "inventor",
    titulo: "Inventor da Saúde",
    descricao: "Crie algo que melhore a saúde das pessoas!",
    emoji: "🏥",
    habilidade: "Inovação em Saúde",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Os maiores avanços da humanidade vieram da medicina! 💊 Vacinas, antibióticos, raio-X — cada invenção dessas salvou milhões de vidas. Agora é sua vez: que invenção você criaria para deixar as pessoas mais saudáveis?",
    inspiracoes: [
      "Um sensor na pulseira que detecta quando você está ficando doente antes de sentir qualquer sintoma",
      "Um aplicativo que usa a câmera do celular para verificar se uma ferida está cicatrizando bem",
      "Uma geladeira inteligente que avisa quando o alimento está vencido e sugere receitas mais saudáveis"
    ]
  },
  {
    id: "con_inventor_5",
    tipo: "inventor",
    titulo: "Inventor da Comunicação",
    descricao: "Como fazer as pessoas se conectarem melhor?",
    emoji: "📡",
    habilidade: "Criatividade Digital",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "O ser humano sempre inventou formas de se comunicar: tambores, cartas, telefone, internet. 📡 Cada geração criou algo novo. Que invenção você criaria para melhorar a comunicação entre as pessoas hoje?",
    inspiracoes: [
      "Um dispositivo que traduz automaticamente qualquer idioma em tempo real para qualquer pessoa no mundo",
      "Um app de videochamada especial para avós e idosos, simples como ligar a televisão",
      "Um sistema de comunicação que funciona mesmo sem internet, usando conexão direta entre celulares próximos"
    ]
  }
]

// ── Formas geométricas ──
export const formasExtraPorFaixa = [
  {
    id: "con_formas_angulos",
    tipo: "formas",
    titulo: "Ângulos das Formas",
    descricao: "Cada forma tem ângulos especiais — descubra as regras!",
    emoji: "📐",
    habilidade: "Geometria",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Um ângulo é o espaço entre dois lados que se encontram. 📐 O triângulo tem ângulos menores, o quadrado tem ângulos retos (90°) e polígonos maiores têm ângulos maiores. Vamos medir a geometria!",
    dados: {
      formas: [
        {
          id: "agudo",
          nome: "Ângulo Agudo",
          cor: "#EF9F27",
          svg: "triangle",
          frase: "Ângulo agudo: menor que 90°!",
          funfato: "O triângulo equilátero tem 3 ângulos de 60° cada. A soma dos ângulos internos de qualquer triângulo é sempre 180°!",
          detalhe: "Ângulo < 90° | Triângulo: 3 ângulos de 60° | Soma interna sempre = 180°"
        },
        {
          id: "reto",
          nome: "Ângulo Reto",
          cor: "#4F8EE8",
          svg: "square",
          frase: "Ângulo reto: exatamente 90°!",
          funfato: "O quadrado tem 4 ângulos retos. O símbolo □ indica ângulo reto. Os cantos das paredes da sua casa são ângulos retos!",
          detalhe: "Ângulo = 90° | Símbolo: □ | Quadrado: 4 ângulos retos | Triângulo retângulo: 1 ângulo reto"
        },
        {
          id: "obtuso",
          nome: "Ângulo Obtuso",
          cor: "#D4537E",
          svg: "diamond",
          frase: "Ângulo obtuso: entre 90° e 180°!",
          funfato: "O losango tem 2 ângulos obtusos e 2 agudos. Juntos somam 360° — como qualquer quadrilátero!",
          detalhe: "90° < ângulo < 180° | Hexágono regular: 120° | Pentágono regular: 108°"
        },
        {
          id: "raso",
          nome: "Ângulo Raso",
          cor: "#1D9E75",
          svg: "rect",
          frase: "Ângulo raso: 180° — uma linha reta!",
          funfato: "Quando você dobra o braço completamente esticado, forma 180°. Um ângulo raso é exatamente metade de um giro completo!",
          detalhe: "Ângulo = 180° | Uma linha reta | Ângulos suplementares: dois ângulos que somam 180°"
        },
        {
          id: "completo",
          nome: "Ângulo Completo",
          cor: "#7F77DD",
          svg: "circle",
          frase: "Ângulo completo: 360° — uma volta inteira!",
          funfato: "Por que 360°? Os babilônios (4.000 a.C.) dividiram o círculo em 360 por ser divisível por 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24...",
          detalhe: "Ângulo = 360° | Uma revolução completa | Soma dos ângulos externos de qualquer polígono = 360°"
        },
        {
          id: "soma_tri",
          nome: "Soma de Triângulos",
          cor: "#D85A30",
          svg: "triangle",
          frase: "A soma dos ângulos de um triângulo é 180°!",
          funfato: "Corte os 3 cantos de qualquer triângulo e ponha juntos — formam uma linha reta (180°)! Isso funciona com QUALQUER triângulo, por mais estranho que seja!",
          detalhe: "Triângulo: soma = 180° | Quadrilátero: soma = 360° | n-ágono: soma = (n−2) × 180°"
        },
        {
          id: "soma_quad",
          nome: "Soma de Quadriláteros",
          cor: "#D4537E",
          svg: "square",
          frase: "A soma dos ângulos de um quadrilátero é 360°!",
          funfato: "Todo quadrilátero pode ser dividido em 2 triângulos: 2 × 180° = 360°. Isso vale para quadrado, retângulo, trapézio e losango!",
          detalhe: "Quadrilátero = 2 triângulos = 360° | Cada n-ágono = (n−2) triângulos"
        },
        {
          id: "exterior",
          nome: "Ângulos Externos",
          cor: "#534AB7",
          svg: "polygon_5",
          frase: "A soma dos ângulos externos é sempre 360°!",
          funfato: "Se você andar ao longo de qualquer polígono e girar nos cantos, ao completar a volta girou exatamente 360°. Independente do número de lados!",
          detalhe: "Soma dos externos = sempre 360° | Polígono regular: cada externo = 360°/n"
        }
      ]
    }
  },
  {
    id: "con_formas_perimetro",
    tipo: "formas",
    titulo: "Perímetro e Área",
    descricao: "Aprenda a medir o contorno e o espaço das formas!",
    emoji: "📏",
    habilidade: "Geometria",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Perímetro é a distância ao redor de uma forma — como uma cerca ao redor do jardim. 📏 Área é o espaço dentro — como o gramado do jardim. Vamos aprender as fórmulas!",
    dados: {
      formas: [
        {
          id: "quad_perim",
          nome: "Quadrado — Perímetro",
          cor: "#4F8EE8",
          svg: "square",
          frase: "Perímetro do quadrado: 4 × lado!",
          funfato: "Se um quadrado tem lado de 5m, seu perímetro é 20m. Se dobrar o lado, o perímetro dobra — mas a área quadruplica!",
          detalhe: "P = 4l | Área = l² | Exemplo: lado 3m → P=12m, A=9m²"
        },
        {
          id: "ret_perim",
          nome: "Retângulo — Área",
          cor: "#1D9E75",
          svg: "rect",
          frase: "Área do retângulo: base × altura!",
          funfato: "Uma sala de 4m × 5m tem 20m² de área. É por isso que tapetes e pisos são vendidos em metro quadrado!",
          detalhe: "A = b × h | P = 2(b+h) | Exemplo: 4×5 = 20m²"
        },
        {
          id: "circ_perim",
          nome: "Círculo — Circunferência",
          cor: "#D4537E",
          svg: "circle",
          frase: "Circunferência do círculo: 2πr!",
          funfato: "π (pi) = 3,14159... é a razão entre a circunferência e o diâmetro de qualquer círculo. Calculado com 100 trilhões de casas decimais em 2022!",
          detalhe: "C = 2πr = πd | Área = πr² | Pi ≈ 3,14159..."
        },
        {
          id: "tri_area",
          nome: "Triângulo — Área",
          cor: "#EF9F27",
          svg: "triangle",
          frase: "Área do triângulo: base × altura ÷ 2!",
          funfato: "O triângulo é metade do retângulo equivalente. Por isso divide por 2. Todo triângulo cabe exatamente em um retângulo com base e altura iguais!",
          detalhe: "A = (b × h) / 2 | P = a + b + c"
        },
        {
          id: "hex_area",
          nome: "Hexágono — Área",
          cor: "#7F77DD",
          svg: "hex",
          frase: "Hexágono regular = 6 triângulos equiláteros!",
          funfato: "Por isso as abelhas usam hexágono — elas constroem 6 triângulos ao redor de um centro. São \"economistas\" naturais de cera!",
          detalhe: "A = (3√3 / 2) × l² | Para l=1: A ≈ 2,598"
        },
        {
          id: "escala",
          nome: "Escala e Proporção",
          cor: "#D85A30",
          svg: "square",
          frase: "Dobrar o lado quadruplica a área!",
          funfato: "Se uma pizza de 20cm de lado custa R$20, uma de 40cm de lado tem 4× mais área e deveria custar R$80 — não R$40!",
          detalhe: "Lado × 2 → área × 4 | Lado × 3 → área × 9 | Fórmula: (k×l)² = k² × l²"
        },
        {
          id: "irregulares",
          nome: "Áreas Irregulares",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🗺️",
          frase: "Formas irregulares: divida em partes conhecidas!",
          funfato: "Arquitetos e engenheiros calculam áreas de terrenos irregulares dividindo em triângulos e retângulos. GPS faz isso automaticamente para calcular distâncias!",
          detalhe: "Estratégia: decompor em triângulos | Fórmula de Gauss para polígonos irregulares"
        },
        {
          id: "perim_circ",
          nome: "Área do Círculo",
          cor: "#D4537E",
          svg: "circle",
          frase: "Área do círculo: π × r²!",
          funfato: "Arquimedes (250 a.C.) foi o primeiro a calcular π com precisão, usando polígonos de 96 lados. Chegou a 3,14 sem calculadora, só com geometria!",
          detalhe: "A = πr² | Para r=5: A = π×25 ≈ 78,54 unidades²"
        }
      ]
    }
  },
  {
    id: "con_formas_quadrilateros",
    tipo: "formas",
    titulo: "Família dos Quadriláteros",
    descricao: "Todas as formas de 4 lados e suas diferenças!",
    emoji: "🔷",
    habilidade: "Geometria",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Quadrilátero é qualquer forma com 4 lados! 🔷 Mas existem muitos tipos: quadrado, retângulo, losango, paralelogramo e trapézio — cada um com suas regras especiais.",
    dados: {
      formas: [
        {
          id: "quadrado",
          nome: "Quadrado",
          cor: "#4F8EE8",
          svg: "square",
          frase: "Quadrado: 4 lados iguais e 4 ângulos retos!",
          funfato: "O quadrado é o \"campeão\" dos quadriláteros — tem o maior número de propriedades. É um retângulo, um losango e um paralelogramo ao mesmo tempo!",
          detalhe: "4 lados iguais | 4 ângulos = 90° | 4 eixos de simetria | Diagonal = l√2"
        },
        {
          id: "retangulo2",
          nome: "Retângulo",
          cor: "#1D9E75",
          svg: "rect",
          frase: "Retângulo: 4 ângulos retos, lados opostos iguais!",
          funfato: "Todo quadrado é um retângulo, mas nem todo retângulo é quadrado. Os lados opostos são paralelos e iguais — por isso é um paralelogramo especial!",
          detalhe: "2 pares de lados iguais | 4 ângulos = 90° | 2 eixos de simetria | Diagonal = √(b²+h²)"
        },
        {
          id: "losango2",
          nome: "Losango",
          cor: "#D4537E",
          svg: "diamond",
          frase: "Losango: 4 lados iguais, ângulos opostos iguais!",
          funfato: "O losango parece um quadrado \"espremido\". As diagonais do losango se cruzam em ângulo reto e em seus pontos médios!",
          detalhe: "4 lados iguais | Ângulos opostos iguais | 2 eixos de simetria | Diagonais perpendiculares"
        },
        {
          id: "paralelo",
          nome: "Paralelogramo",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "▱",
          frase: "Paralelogramo: lados opostos paralelos e iguais!",
          funfato: "O paralelogramo se transforma em retângulo quando você \"endireita\" os ângulos. Área = base × altura (a altura é perpendicular à base, não o lado inclinado)!",
          detalhe: "Lados opostos paralelos e iguais | Ângulos opostos iguais | 0 eixos de simetria"
        },
        {
          id: "trapezio",
          nome: "Trapézio",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🔻",
          frase: "Trapézio: apenas 1 par de lados paralelos!",
          funfato: "O trapézio isósceles (lados iguais) é simétrico — só 1 eixo de simetria. Pontes e bancos de praça têm formato de trapézio para ser mais estável!",
          detalhe: "1 par de lados paralelos | Área = (b1+b2)/2 × h | Trapézio isósceles: 1 eixo"
        },
        {
          id: "cometa",
          nome: "Deltoide (Pipa)",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🪁",
          frase: "Deltoide: 2 pares de lados iguais adjacentes!",
          funfato: "O deltoide (ou pipa geométrica) tem as diagonais perpendiculares, e uma delas corta a outra bem no meio! É o formato das pipas que voamos!",
          detalhe: "2 pares de lados iguais adjacentes | 1 eixo de simetria | Diagonais perpendiculares"
        },
        {
          id: "familia",
          nome: "Hierarquia dos Quadriláteros",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🌳",
          frase: "Quadrado → Retângulo → Paralelogramo!",
          funfato: "Todo quadrado é retângulo e losango. Todo retângulo é paralelogramo. É uma hierarquia — formas mais específicas têm mais propriedades!",
          detalhe: "Quadrado ⊂ Retângulo ⊂ Paralelogramo ⊂ Quadrilátero"
        },
        {
          id: "irregular4",
          nome: "Quadrilátero Irregular",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🌀",
          frase: "Qualquer forma com 4 lados é um quadrilátero!",
          funfato: "A soma dos ângulos internos de qualquer quadrilátero é sempre 360°. Pode verificar: corte os 4 cantos e ponha juntos — formam um círculo completo!",
          detalhe: "Soma dos ângulos = 360° | n lados → (n−2)×180° total"
        }
      ]
    }
  },
  {
    id: "con_formas_triangulos",
    tipo: "formas",
    titulo: "Tipos de Triângulos",
    descricao: "Existem vários tipos de triângulo — conheça todos!",
    emoji: "🔺",
    habilidade: "Geometria",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Nem todo triângulo é igual! 🔺 Alguns têm os 3 lados iguais, outros têm um ângulo de 90°, e outros são completamente irregulares. Vamos descobrir a família dos triângulos!",
    dados: {
      formas: [
        {
          id: "equilatero",
          nome: "Equilátero",
          cor: "#EF9F27",
          svg: "triangle",
          frase: "3 lados iguais, 3 ângulos de 60°!",
          funfato: "O triângulo equilátero tem 3 eixos de simetria e é o único triângulo \"regular\". Aparece na placa de \"Dê a preferência\" no trânsito em todo o Brasil!",
          detalhe: "3 lados iguais | 3 × 60° = 180° | 3 eixos de simetria | Mais simétrico dos triângulos"
        },
        {
          id: "isosceles",
          nome: "Isósceles",
          cor: "#4F8EE8",
          svg: "triangle",
          frase: "2 lados iguais, 2 ângulos iguais!",
          funfato: "O triângulo isósceles tem 1 eixo de simetria — pelo meio do lado diferente. Telhados de casas são triângulos isósceles para distribuir o peso igualmente!",
          detalhe: "2 lados iguais | 2 ângulos da base iguais | 1 eixo de simetria"
        },
        {
          id: "escaleno",
          nome: "Escaleno",
          cor: "#D4537E",
          svg: "triangle",
          frase: "3 lados e 3 ângulos diferentes!",
          funfato: "O triângulo escaleno é o mais \"livre\" — não tem restrições de igualdade. Mas a soma dos ângulos é sempre 180°, não importa o formato!",
          detalhe: "3 lados diferentes | 3 ângulos diferentes | 0 eixos de simetria"
        },
        {
          id: "retangulo3",
          nome: "Retângulo",
          cor: "#1D9E75",
          svg: "triangle",
          frase: "Um ângulo de 90° — o mais usado na construção!",
          funfato: "O Teorema de Pitágoras (a²+b²=c²) vale só para triângulos retângulos. Carpinteiros e engenheiros usam a regra 3-4-5 para garantir ângulos retos!",
          detalhe: "1 ângulo = 90° | Pitágoras: a²+b²=c² | A hipotenusa é sempre o maior lado"
        },
        {
          id: "acutangulo",
          nome: "Acutângulo",
          cor: "#7F77DD",
          svg: "triangle",
          frase: "Todos os 3 ângulos são menores que 90°!",
          funfato: "Todo triângulo equilátero é acutângulo (60°<90°). A maioria dos triângulos que você encontra no cotidiano são acutângulos!",
          detalhe: "Todos os ângulos < 90° | Inclui o equilátero e muitos isósceles"
        },
        {
          id: "obtusangulo",
          nome: "Obtusângulo",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "📐",
          frase: "Um ângulo maior que 90°!",
          funfato: "Um triângulo obtusângulo \"parece\" que está se inclinando para um lado. Só pode ter UM ângulo obtuso — se tivesse dois, a soma passaria de 180°!",
          detalhe: "1 ângulo > 90° | Os outros dois são obrigatoriamente agudos"
        },
        {
          id: "teorema",
          nome: "Teorema de Pitágoras",
          cor: "#534AB7",
          svg: "triangle",
          frase: "Os lados de um triângulo com cantinho reto têm uma relação mágica!",
          funfato: "Pitágoras (500 a.C.) ficou famoso por essa descoberta, mas os egípcios já usavam um truque parecido com cordas esticadas 1.000 anos antes, pra construir cantos bem certinhos!",
          detalhe: "Catetos: a e b | Hipotenusa: c | Exemplo: 3²+4²=5² → 9+16=25 ✓"
        },
        {
          id: "medianas",
          nome: "Medianas e Baricentro",
          cor: "#D4537E",
          svg: "triangle",
          frase: "Todo triângulo tem um pontinho mágico de equilíbrio!",
          funfato: "Se você recortar um triângulo de papelão e equilibrar ele na ponta de um lápis bem no meio, ele fica em pé sem cair — esse ponto mágico se chama baricentro!",
          detalhe: "Mediana: segmento do vértice ao meio do lado oposto | Baricentro: 2/3 de cada mediana a partir do vértice"
        }
      ]
    }
  },
  {
    id: "con_formas_transformacoes",
    tipo: "formas",
    titulo: "Transformações Geométricas",
    descricao: "Como as formas se movem, giram e refletem!",
    emoji: "🔄",
    habilidade: "Geometria",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Formas podem se mover sem mudar! 🔄 Quando você desliza, gira ou espelha uma forma, ela mantém o mesmo tamanho e os mesmos ângulos. Isso se chama isometria!",
    dados: {
      formas: [
        {
          id: "translacao",
          nome: "Translação (Deslizar)",
          cor: "#4F8EE8",
          svg: "rect",
          frase: "Transladar = mover sem girar ou espelhar!",
          funfato: "Quando você move uma peça de xadrez pelo tabuleiro, está fazendo uma translação. A peça mantém orientação e tamanho — só muda de posição!",
          detalhe: "Mover (x,y) → (x+a, y+b) | Preserva: tamanho, ângulos, orientação"
        },
        {
          id: "rotacao",
          nome: "Rotação (Girar)",
          cor: "#D4537E",
          svg: "triangle",
          frase: "Rotacionar = girar em torno de um ponto!",
          funfato: "O ponteiro de um relógio faz rotações. Uma hélice gira em torno do eixo central. A Terra gira em torno de seu eixo uma vez por dia!",
          detalhe: "Girar ângulo θ em torno de ponto P | Preserva: tamanho, ângulos | Pode inverter orientação (180°)"
        },
        {
          id: "reflexao",
          nome: "Reflexão (Espelhar)",
          cor: "#EF9F27",
          svg: "square",
          frase: "Reflexão = espelhar em uma linha-eixo!",
          funfato: "Sua imagem no espelho é uma reflexão. A letra \"b\" se reflete na \"d\" e o \"p\" no \"q\". A maioria dos seres vivos tem simetria de reflexão!",
          detalhe: "Espelhar em torno de eixo | Preserva: tamanho, ângulos | Inverte orientação"
        },
        {
          id: "homotecia",
          nome: "Homotetia (Ampliar/Reduzir)",
          cor: "#1D9E75",
          svg: "circle",
          frase: "Homotetia = mudar o tamanho mantendo a forma!",
          funfato: "Quando você amplia uma foto, está fazendo homotetia. Mapas são homotetias do mundo real. Células ao microscópio mostram homotetia de estruturas maiores!",
          detalhe: "Multiplica coordenadas por fator k | k>1: amplia | 0<k<1: reduz | Preserva ângulos"
        },
        {
          id: "isometria",
          nome: "Isometrias — Resumo",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🔄",
          frase: "Deslizar, girar e espelhar sem esticar ou encolher!",
          funfato: "Quando você desliza, gira ou espelha uma forma sem esticar nem encolher ela, o tamanho continua o mesmo! É esse truque que cria os padrões de calçada, papel de parede e mosaicos!",
          detalhe: "Isometria: preserva distâncias | Grupo de simetria: todas as isometrias de uma forma"
        },
        {
          id: "pavimentacao",
          nome: "Pavimentação do Plano",
          cor: "#D85A30",
          svg: "hex",
          frase: "Triângulos, quadrados e hexágonos preenchem o plano!",
          funfato: "Só 3 polígonos regulares podem preencher o plano sem brechas ou sobreposições: triângulo (6/ponto), quadrado (4/ponto), hexágono (3/ponto). Por isso pisos usam essas 3 formas!",
          detalhe: "360°/ângulo interno = número de peças no vértice. Triângulo: 360/60=6, Quadrado: 360/90=4, Hexágono: 360/120=3"
        },
        {
          id: "fractal_t",
          nome: "Transformações em Fractais",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🌀",
          frase: "Um padrão que se repete dentro de si mesmo, cada vez menor!",
          funfato: "O triângulo de Sierpinski nasce repetindo o mesmo triângulo, sempre na metade do tamanho, várias e várias vezes — um padrão que parece nunca acabar!",
          detalhe: "Auto-similaridade: partes = cópia em escala menor do todo | Base de toda compressão de imagem fractal"
        },
        {
          id: "simetria_sum",
          nome: "Grupos de Simetria",
          cor: "#D4537E",
          svg: "star",
          frase: "Algumas formas têm mais jeitos de girar ou espelhar que outras!",
          funfato: "O quadrado tem 8 jeitos diferentes de girar ou espelhar e continuar parecendo igual (4 giros + 4 espelhos)! O círculo tem infinitos jeitos — ele é a forma mais \"simétrica\" que existe!",
          detalhe: "Grupo cíclico Cn: n rotações | Grupo diedral Dn: n rotações + n reflexões"
        }
      ]
    }
  },
  {
    id: "con_formas_arquitetura",
    tipo: "formas",
    titulo: "Formas na Arquitetura",
    descricao: "As formas que os arquitetos usam para construir o mundo!",
    emoji: "🏛️",
    habilidade: "Geometria",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Cada prédio famoso do mundo usa geometria de forma inteligente! 🏛️ A Torre Eiffel é feita de triângulos, o Coliseu tem formato oval, e o Burj Khalifa tem espiral. Vamos explorar a arquitetura geométrica!",
    dados: {
      formas: [
        {
          id: "triangulo_arq",
          nome: "Triângulo — Estabilidade",
          cor: "#D85A30",
          svg: "triangle",
          frase: "O triângulo é a forma mais rígida!",
          funfato: "Torre Eiffel (1889): 18.000 peças de ferro, todas unidas em triângulos. Pontes são feitas de treliças triangulares. Um triângulo não pode ser deformado sem quebrar um lado — ao contrário do quadrado!",
          detalhe: "Treliça: estrutura de triângulos | Rigidez máxima por unidade de peso | Base de pontes, torres e coberturas"
        },
        {
          id: "arco_arq",
          nome: "Arco — Força sem Concreto",
          cor: "#4F8EE8",
          svg: "oval",
          frase: "O arco distribui o peso pelas laterais!",
          funfato: "O Coliseu de Roma (70 d.C.) usa 240 arcos de calcário — sem concreto armado. O arco converte pressão vertical em horizontal, que as paredes laterais absorvem. Existem há 6.000 anos!",
          detalhe: "Voussoirs (pedras em cunha) | Clave no topo | Empuxo: força horizontal transmitida"
        },
        {
          id: "cupula_arq",
          nome: "Cúpula — O Arco em 3D",
          cor: "#7F77DD",
          svg: "circle",
          frase: "A cúpula é um arco girado 360°!",
          funfato: "Pantheon de Roma (120 d.C.): cúpula de 43m de diâmetro, maior do mundo por 1.300 anos. Tem um buraco no topo (óculo) de 9m — a chuva entra por ele e escorre por ralos no chão!",
          detalhe: "Distribuição de carga 3D | Oculus: abertura no topo | Pendentivo: triângulo esférico de transição de quadrado para círculo"
        },
        {
          id: "espiral_arq",
          nome: "Espiral — Movimento e Altura",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🌀",
          frase: "Espirais criam altura e elegância!",
          funfato: "Burj Khalifa (Dubai, 828m): o edifício se torce em espiral reduzindo a velocidade do vento. O Museu Guggenheim (NY) tem uma rampa em espiral por dentro. A forma espiral é eficiente e elegante!",
          detalhe: "Redução de arrasto do vento | Espiral logarítmica na proporção áurea | Imita conchas e galáxias"
        },
        {
          id: "hexagono_arq",
          nome: "Hexágono — Eficiência Máxima",
          cor: "#1D9E75",
          svg: "hex",
          frase: "Hexágonos são os mais eficientes!",
          funfato: "Eden Project (UK): geodésica de hexágonos cobre 1,56 hectares com o mínimo de material. Células hexagonais são 15% mais leves que circulares para a mesma rigidez. A abelha sabia disso primeiro!",
          detalhe: "Geodésica: esfera feita de triângulos e hexágonos | Buckminster Fuller popularizou (1967) | Força/peso: máximo"
        },
        {
          id: "piramide_arq",
          nome: "Pirâmide — Força e Eternidade",
          cor: "#D4537E",
          svg: "triangle",
          frase: "Pirâmides distribuem o peso para baixo!",
          funfato: "Grande Pirâmide (2560 a.C.): 2,3 milhões de blocos de 2,5 toneladas. A base quadrada distribui o peso igualmente. Durou 3.800 anos como o prédio mais alto do mundo (146m)!",
          detalhe: "Centro de gravidade baixo: estabilidade máxima | Ângulo das faces: 51,8° | Base nível com 2cm de desvio em 230m"
        },
        {
          id: "retangulo_arq",
          nome: "Retângulo — O Módulo Universal",
          cor: "#D85A30",
          svg: "rect",
          frase: "O retângulo é o tijolo da civilização!",
          funfato: "Tijolos são retangulares porque empilham sem brechas e distribuem peso uniformemente. Le Corbusier criou o \"Modulor\" baseado em retângulos áureos para dimensionar todos os elementos de uma casa!",
          detalhe: "Tijolo padrão: 19×9×5,7cm | Proporção: comprimento = 2×largura (para amarração perfeita)"
        },
        {
          id: "triangulo_mod",
          nome: "Módulo Triangular Moderno",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🏗️",
          frase: "Triângulos no Museu do Louvre e no Estádio!",
          funfato: "Pirâmide do Louvre (1989): 603 losangos + 70 triângulos de vidro, 673 vidros no total. Estruturas trianguladas são 30% mais leves que retangulares!",
          detalhe: "Estrutura geodésica: poliedro inscrito em esfera | Tensegrity: tensão e compressão separadas"
        }
      ]
    }
  },
  {
    id: "con_formas_mapa",
    tipo: "formas",
    titulo: "Formas nos Mapas",
    descricao: "Geografia e geometria se encontram nos mapas!",
    emoji: "🗺️",
    habilidade: "Geometria",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Mapas são geometria aplicada! 🗺️ Para representar a Terra (uma esfera) em papel (um plano), precisamos de projeções matemáticas. Cada projeção distorce de forma diferente!",
    dados: {
      formas: [
        {
          id: "mercat",
          nome: "Projeção de Mercator",
          cor: "#4F8EE8",
          svg: "rect",
          frase: "A projeção mais famosa distorce os polos!",
          funfato: "No mapa Mercator, a Groenlândia parece maior que a África — mas a África tem 14× mais área! A projeção preserva ângulos (útil para navegação) mas distorce áreas!",
          detalhe: "Preserva: ângulos (conforme) | Distorce: áreas (polos ficam enormes) | Uso: navegação marítima desde 1569"
        },
        {
          id: "brasil",
          nome: "Forma do Brasil",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🇧🇷",
          frase: "O Brasil tem formato irregular — mas enorme!",
          funfato: "O Brasil é o 5º maior país do mundo: 8,5 milhões de km². Cabe a Europa inteira dentro do Brasil com espaço sobrando. A fronteira tem 16.886 km — 3ª maior do mundo!",
          detalhe: "Polígono irregular com ~7.500 vértices no mapa detalhado | Latitude: 5°N a 34°S | Longitude: 35°W a 74°W"
        },
        {
          id: "latitude",
          nome: "Latitude e Longitude",
          cor: "#D4537E",
          svg: "circle",
          frase: "A Terra é uma grade de linhas imaginárias!",
          funfato: "O GPS usa latitude e longitude para te localizar com precisão de metros. O equador (0°) divide a Terra em norte e sul. Greenwich (0°) divide em leste e oeste — localizado em Londres!",
          detalhe: "Latitude: 0° (equador) a 90° (polos) | Longitude: 0° a 180° | 1° de latitude ≈ 111km"
        },
        {
          id: "distancia",
          nome: "Distância no Mapa",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "📏",
          frase: "Distância real = distância no mapa × escala!",
          funfato: "Um mapa 1:1.000.000 significa que 1cm no mapa = 10km na realidade. Google Maps usa projeção Mercator modificada — a distância na tela varia com a latitude!",
          detalhe: "Escala: 1:N → 1cm = N×cm | Fórmula haversine para distância entre coordenadas (Terra esférica)"
        },
        {
          id: "contorno",
          nome: "Curvas de Nível",
          cor: "#7F77DD",
          svg: "oval",
          frase: "Curvas de nível mostram montanhas em 2D!",
          funfato: "Cada linha do mapa topográfico une pontos de mesma altitude. Linhas muito próximas = encosta íngreme. Linhas fechadas = morro ou vale. GPS 3D e videogames usam esse sistema!",
          detalhe: "Equidistância: distância vertical entre curvas | Ponto mais alto: centro da curva mais interna"
        },
        {
          id: "voronoi_m",
          nome: "Voronoi no Mapa Urbano",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🏙️",
          frase: "Cada bairro tem a escola ou o hospital mais pertinho!",
          funfato: "Hospitais, postos de saúde e escolas de uma cidade têm áreas invisíveis ao redor deles — e cada casa costuma usar a unidade mais próxima da sua! Urbanistas usam esse mapa de \"mais perto\" pra planejar cidades!",
          detalhe: "Diagrama de Voronoi: divide o plano pela célula mais próxima | Usado em logística, redes celulares, planejamento"
        },
        {
          id: "escala_m",
          nome: "Escalas e Proporções",
          cor: "#534AB7",
          svg: "rect",
          frase: "Mapas são homotetias do espaço real!",
          funfato: "Uma planta de arquitetura (1:50) significa 1cm = 50cm real. Satélites tiram fotos em escalas como 1:5.000. A escala correta é essencial — erros de escala causaram acidentes de aviação!",
          detalhe: "Escala numérica 1:N | Escala gráfica: barra indicativa | Ampliação: k>1 | Redução: k<1"
        },
        {
          id: "fractal_coast",
          nome: "O Paradoxo da Costa",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🌊",
          frase: "Quanto maior o zoom, maior o litoral!",
          funfato: "Um cientista chamado Mandelbrot percebeu algo estranho: quanto menor a régua que você usa pra medir o litoral de um país, mais cantinhos e curvinhas você encontra — e o litoral \"cresce\"!",
          detalhe: "Paradoxo: o perímetro aumenta indefinidamente com maior resolução | Dimensão fractal do litoral: 1,02–1,52 dependendo do país"
        }
      ]
    }
  },
  {
    id: "con_formas_solidos",
    tipo: "formas",
    titulo: "Sólidos Geométricos 3D",
    descricao: "Conheça as formas tridimensionais que existem no mundo real!",
    emoji: "📦",
    habilidade: "Raciocínio Espacial",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "As formas 2D (planas) têm uma versão 3D (com volume)! 📦 Círculo vira esfera, quadrado vira cubo, triângulo vira pirâmide. Vamos descobrir cada sólido geométrico!",
    dados: {
      formas: [
        {
          id: "cubo",
          nome: "Cubo",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "📦",
          frase: "O cubo tem 6 faces quadradas iguais!",
          funfato: "O dado clássico é um cubo com 6 faces — os lados opostos sempre somam 7!",
          detalhe: "6 faces | 8 vértices | 12 arestas | Volume = lado³"
        },
        {
          id: "esfera",
          nome: "Esfera",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🌐",
          frase: "A esfera é redonda em todas as direções!",
          funfato: "A Terra é uma esfera (levemente achatada nos polos). Bolas de futebol e planetas são esferas!",
          detalhe: "Superfície = 4πr² | Volume = (4/3)πr³ | Nenhum vértice ou aresta"
        },
        {
          id: "cilindro",
          nome: "Cilindro",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🥫",
          frase: "O cilindro tem dois círculos e um corpo longo!",
          funfato: "Latas de refrigerante, troncos de árvores e colunas de prédios são cilindros!",
          detalhe: "2 bases circulares | 1 face lateral curva | Volume = πr²h"
        },
        {
          id: "cone",
          nome: "Cone",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🍦",
          frase: "O cone tem uma base circular e uma ponta!",
          funfato: "Sorvetes, chapéus de festa e o nariz de um foguete têm formato de cone!",
          detalhe: "1 base circular | 1 face lateral curva | 1 vértice | Volume = (1/3)πr²h"
        },
        {
          id: "piramide",
          nome: "Pirâmide",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🔺",
          frase: "A pirâmide tem uma base e faces triangulares!",
          funfato: "As pirâmides do Egito são as estruturas mais antigas ainda de pé — construídas sem máquinas!",
          detalhe: "1 base quadrada + 4 faces triangulares | 5 vértices | Volume = (1/3) × base × altura"
        },
        {
          id: "prisma",
          nome: "Prisma Triangular",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "💠",
          frase: "O prisma tem dois triângulos e três retângulos!",
          funfato: "Prismas de vidro separam a luz branca nas cores do arco-íris — é assim que os físicos estudam a luz!",
          detalhe: "2 bases triangulares | 3 faces retangulares | Volume = área da base × altura"
        }
      ]
    }
  },
  {
    id: "con_formas_poligonos",
    tipo: "formas",
    titulo: "Polígonos de 5 a 8 Lados",
    descricao: "Explore os polígonos além do quadrado e hexágono!",
    emoji: "⬠",
    habilidade: "Raciocínio Espacial",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "Você já conhece o triângulo (3 lados), o quadrado (4) e o hexágono (6). Mas existem polígonos com 5, 7, 8 lados e muito mais! 🔷 Vamos descobri-los!",
    dados: {
      formas: [
        {
          id: "pentagono",
          nome: "Pentágono",
          cor: "#4F8EE8",
          svg: "polygon_5",
          frase: "O pentágono tem 5 lados iguais!",
          funfato: "O edifício do Pentágono nos EUA tem esse formato — visto de cima, parece um pentágono perfeito!",
          detalhe: "Soma dos ângulos internos = 540° | Cada ângulo interno = 108° | Aparece na estrela de 5 pontas"
        },
        {
          id: "hexagono",
          nome: "Hexágono",
          cor: "#1D9E75",
          svg: "hex",
          frase: "O hexágono tem 6 lados iguais!",
          funfato: "Abelhas constroem colmeias em hexágono — é o formato que usa menos material e armazena mais!",
          detalhe: "Soma dos ângulos internos = 720° | Cada ângulo interno = 120° | Padrão do grafeno (mais forte que aço)"
        },
        {
          id: "heptagono",
          nome: "Heptágono",
          cor: "#D4537E",
          svg: "polygon_7",
          frase: "O heptágono tem 7 lados!",
          funfato: "Moedas de alguns países têm 7 lados para serem fáceis de reconhecer sem ver — como a libra britânica!",
          detalhe: "Soma dos ângulos internos = 900° | Cada ângulo = ≈128,57° | Polígono raro no cotidiano"
        },
        {
          id: "octagono",
          nome: "Octógono",
          cor: "#EF9F27",
          svg: "polygon_8",
          frase: "O octógono tem 8 lados iguais!",
          funfato: "As placas de PARE ao redor do mundo têm formato de octógono — para serem reconhecidas de qualquer ângulo!",
          detalhe: "Soma dos ângulos internos = 1080° | Cada ângulo = 135° | 8 eixos de simetria"
        }
      ]
    }
  }
]

// ── Inglês — vocabulário, flashcards, frases e leitura ──
export const inglesExtraPorFaixa = [
  {
    id: "con_ingles",
    tipo: "ingles",
    titulo: "Inglês — Flashcards e Quiz",
    descricao: "Flashcards PT→EN e mini quiz com vocabulário do dia a dia!",
    emoji: "🇺🇸",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Vire os cartões para descobrir as palavras em inglês e teste seus conhecimentos no quiz!"
  },
  {
    id: "con_ingles_profissoes",
    tipo: "ingles",
    titulo: "Inglês — Profissões",
    descricao: "Flashcards com profissões do cotidiano em inglês!",
    emoji: "👩‍⚕️",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Descubra como se chamam as profissões em inglês com esses flashcards!",
    dados: {
      flashcards: [
        {
          en: "Doctor",
          pt: "Médico(a)",
          emoji: "🩺"
        },
        {
          en: "Teacher",
          pt: "Professor(a)",
          emoji: "👩‍🏫"
        },
        {
          en: "Nurse",
          pt: "Enfermeiro(a)",
          emoji: "👩‍⚕️"
        },
        {
          en: "Engineer",
          pt: "Engenheiro(a)",
          emoji: "⚙️"
        },
        {
          en: "Firefighter",
          pt: "Bombeiro(a)",
          emoji: "🚒"
        },
        {
          en: "Police Officer",
          pt: "Policial",
          emoji: "👮"
        },
        {
          en: "Chef",
          pt: "Chef de cozinha",
          emoji: "👨‍🍳"
        },
        {
          en: "Pilot",
          pt: "Piloto(a)",
          emoji: "✈️"
        },
        {
          en: "Farmer",
          pt: "Agricultor(a)",
          emoji: "🌾"
        },
        {
          en: "Artist",
          pt: "Artista",
          emoji: "🎨"
        },
        {
          en: "Lawyer",
          pt: "Advogado(a)",
          emoji: "⚖️"
        },
        {
          en: "Dentist",
          pt: "Dentista",
          emoji: "🦷"
        },
        {
          en: "Scientist",
          pt: "Cientista",
          emoji: "🔬"
        },
        {
          en: "Astronaut",
          pt: "Astronauta",
          emoji: "🚀"
        },
        {
          en: "Journalist",
          pt: "Jornalista",
          emoji: "📰"
        },
        {
          en: "Musician",
          pt: "Músico(a)",
          emoji: "🎵"
        },
        {
          en: "Architect",
          pt: "Arquiteto(a)",
          emoji: "🏗️"
        },
        {
          en: "Biologist",
          pt: "Biólogo(a)",
          emoji: "🧬"
        },
        {
          en: "Programmer",
          pt: "Programador(a)",
          emoji: "💻"
        },
        {
          en: "Veterinarian",
          pt: "Veterinário(a)",
          emoji: "🐾"
        }
      ]
    }
  },
  {
    id: "con_ingles_viagem",
    tipo: "ingles",
    titulo: "Inglês — Viagem",
    descricao: "Vocabulário essencial para viajar em inglês!",
    emoji: "✈️",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Pronto para viajar? Aprenda o vocabulário essencial de viagem em inglês!",
    dados: {
      flashcards: [
        {
          en: "Airport",
          pt: "Aeroporto",
          emoji: "✈️"
        },
        {
          en: "Hotel",
          pt: "Hotel",
          emoji: "🏨"
        },
        {
          en: "Passport",
          pt: "Passaporte",
          emoji: "📘"
        },
        {
          en: "Ticket",
          pt: "Passagem/Bilhete",
          emoji: "🎫"
        },
        {
          en: "Luggage",
          pt: "Bagagem",
          emoji: "🧳"
        },
        {
          en: "Map",
          pt: "Mapa",
          emoji: "🗺️"
        },
        {
          en: "Taxi",
          pt: "Táxi",
          emoji: "🚕"
        },
        {
          en: "Train",
          pt: "Trem",
          emoji: "🚆"
        },
        {
          en: "Bus",
          pt: "Ônibus",
          emoji: "🚌"
        },
        {
          en: "Museum",
          pt: "Museu",
          emoji: "🏛️"
        },
        {
          en: "Restaurant",
          pt: "Restaurante",
          emoji: "🍽️"
        },
        {
          en: "Beach",
          pt: "Praia",
          emoji: "🏖️"
        },
        {
          en: "City",
          pt: "Cidade",
          emoji: "🏙️"
        },
        {
          en: "Country",
          pt: "País",
          emoji: "🌍"
        },
        {
          en: "Language",
          pt: "Idioma",
          emoji: "🗣️"
        },
        {
          en: "Money",
          pt: "Dinheiro",
          emoji: "💰"
        },
        {
          en: "Camera",
          pt: "Câmera",
          emoji: "📷"
        },
        {
          en: "Reservation",
          pt: "Reserva",
          emoji: "📋"
        },
        {
          en: "Border",
          pt: "Fronteira",
          emoji: "🛂"
        },
        {
          en: "Tourism",
          pt: "Turismo",
          emoji: "🗽"
        }
      ]
    }
  },
  {
    id: "con_ingles_esportes",
    tipo: "ingles",
    titulo: "Inglês — Esportes",
    descricao: "Vocabulário de esportes e atividades físicas!",
    emoji: "⚽",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Game on! Aprenda o nome dos seus esportes favoritos em inglês!",
    dados: {
      flashcards: [
        {
          en: "Soccer",
          pt: "Futebol",
          emoji: "⚽"
        },
        {
          en: "Basketball",
          pt: "Basquete",
          emoji: "🏀"
        },
        {
          en: "Tennis",
          pt: "Tênis",
          emoji: "🎾"
        },
        {
          en: "Swimming",
          pt: "Natação",
          emoji: "🏊"
        },
        {
          en: "Running",
          pt: "Corrida",
          emoji: "🏃"
        },
        {
          en: "Volleyball",
          pt: "Vôlei",
          emoji: "🏐"
        },
        {
          en: "Baseball",
          pt: "Beisebol",
          emoji: "⚾"
        },
        {
          en: "Cycling",
          pt: "Ciclismo",
          emoji: "🚴"
        },
        {
          en: "Gymnastics",
          pt: "Ginástica",
          emoji: "🤸"
        },
        {
          en: "Boxing",
          pt: "Boxe",
          emoji: "🥊"
        },
        {
          en: "Golf",
          pt: "Golfe",
          emoji: "⛳"
        },
        {
          en: "Surfing",
          pt: "Surfe",
          emoji: "🏄"
        },
        {
          en: "Skiing",
          pt: "Esqui",
          emoji: "⛷️"
        },
        {
          en: "Martial Arts",
          pt: "Artes Marciais",
          emoji: "🥋"
        },
        {
          en: "Rowing",
          pt: "Remo",
          emoji: "🚣"
        },
        {
          en: "Team",
          pt: "Equipe",
          emoji: "👥"
        },
        {
          en: "Score",
          pt: "Placar",
          emoji: "🏆"
        },
        {
          en: "Champion",
          pt: "Campeão/ã",
          emoji: "🥇"
        },
        {
          en: "Training",
          pt: "Treino",
          emoji: "💪"
        },
        {
          en: "Stadium",
          pt: "Estádio",
          emoji: "🏟️"
        }
      ]
    }
  },
  {
    id: "con_ingles_tecnologia",
    tipo: "ingles",
    titulo: "Inglês — Tecnologia",
    descricao: "Vocabulário de tecnologia e mundo digital!",
    emoji: "💻",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "O mundo digital fala inglês! Aprenda os termos tech mais usados!",
    dados: {
      flashcards: [
        {
          en: "Computer",
          pt: "Computador",
          emoji: "💻"
        },
        {
          en: "Smartphone",
          pt: "Celular",
          emoji: "📱"
        },
        {
          en: "Internet",
          pt: "Internet",
          emoji: "🌐"
        },
        {
          en: "App",
          pt: "Aplicativo",
          emoji: "📲"
        },
        {
          en: "Password",
          pt: "Senha",
          emoji: "🔒"
        },
        {
          en: "Screen",
          pt: "Tela",
          emoji: "🖥️"
        },
        {
          en: "Keyboard",
          pt: "Teclado",
          emoji: "⌨️"
        },
        {
          en: "Mouse",
          pt: "Mouse",
          emoji: "🖱️"
        },
        {
          en: "Camera",
          pt: "Câmera",
          emoji: "📷"
        },
        {
          en: "Battery",
          pt: "Bateria",
          emoji: "🔋"
        },
        {
          en: "Headphones",
          pt: "Fones de ouvido",
          emoji: "🎧"
        },
        {
          en: "Charger",
          pt: "Carregador",
          emoji: "🔌"
        },
        {
          en: "Video Call",
          pt: "Videochamada",
          emoji: "📹"
        },
        {
          en: "Download",
          pt: "Baixar",
          emoji: "⬇️"
        },
        {
          en: "Upload",
          pt: "Enviar/Subir",
          emoji: "⬆️"
        },
        {
          en: "Wifi",
          pt: "Wi-Fi",
          emoji: "📶"
        },
        {
          en: "Search",
          pt: "Pesquisar",
          emoji: "🔍"
        },
        {
          en: "Click",
          pt: "Clicar",
          emoji: "👆"
        },
        {
          en: "File",
          pt: "Arquivo",
          emoji: "📂"
        },
        {
          en: "Robot",
          pt: "Robô",
          emoji: "🤖"
        }
      ]
    }
  },
  {
    id: "con_ingles_sentimentos",
    tipo: "ingles",
    titulo: "Inglês — Emoções",
    descricao: "Aprenda como expressar sentimentos em inglês!",
    emoji: "😊",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Como você está se sentindo? Aprenda a expressar suas emoções em inglês!",
    dados: {
      flashcards: [
        {
          en: "Happy",
          pt: "Feliz",
          emoji: "😄"
        },
        {
          en: "Sad",
          pt: "Triste",
          emoji: "😢"
        },
        {
          en: "Angry",
          pt: "Bravo(a)",
          emoji: "😠"
        },
        {
          en: "Scared",
          pt: "Com medo",
          emoji: "😨"
        },
        {
          en: "Surprised",
          pt: "Surpreso(a)",
          emoji: "😲"
        },
        {
          en: "Excited",
          pt: "Animado(a)",
          emoji: "🤩"
        },
        {
          en: "Tired",
          pt: "Cansado(a)",
          emoji: "😴"
        },
        {
          en: "Bored",
          pt: "Entediado(a)",
          emoji: "😑"
        },
        {
          en: "Nervous",
          pt: "Nervoso(a)",
          emoji: "😰"
        },
        {
          en: "Proud",
          pt: "Orgulhoso(a)",
          emoji: "😊"
        },
        {
          en: "Curious",
          pt: "Curioso(a)",
          emoji: "🤔"
        },
        {
          en: "Grateful",
          pt: "Grato(a)",
          emoji: "🙏"
        },
        {
          en: "Confident",
          pt: "Confiante",
          emoji: "😎"
        },
        {
          en: "Lonely",
          pt: "Solitário(a)",
          emoji: "😞"
        },
        {
          en: "Calm",
          pt: "Calmo(a)",
          emoji: "😌"
        },
        {
          en: "Love",
          pt: "Amor",
          emoji: "❤️"
        },
        {
          en: "Hope",
          pt: "Esperança",
          emoji: "🌟"
        },
        {
          en: "Fear",
          pt: "Medo",
          emoji: "😱"
        },
        {
          en: "Joy",
          pt: "Alegria",
          emoji: "🎉"
        },
        {
          en: "Envy",
          pt: "Inveja",
          emoji: "😒"
        }
      ]
    }
  },
  {
    id: "con_ingles_natureza",
    tipo: "ingles",
    titulo: "Inglês — Mundo Natural",
    descricao: "Vocabulário do mundo natural e meio ambiente!",
    emoji: "🌍",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "A natureza fala inglês! Explore os ecossistemas e animais do planeta!",
    dados: {
      flashcards: [
        {
          en: "Forest",
          pt: "Floresta",
          emoji: "🌳"
        },
        {
          en: "Desert",
          pt: "Deserto",
          emoji: "🏜️"
        },
        {
          en: "Ocean",
          pt: "Oceano",
          emoji: "🌊"
        },
        {
          en: "Volcano",
          pt: "Vulcão",
          emoji: "🌋"
        },
        {
          en: "Glacier",
          pt: "Glaciar",
          emoji: "❄️"
        },
        {
          en: "Coral Reef",
          pt: "Recife de coral",
          emoji: "🪸"
        },
        {
          en: "Jungle",
          pt: "Selva",
          emoji: "🌴"
        },
        {
          en: "Savanna",
          pt: "Savana",
          emoji: "🦁"
        },
        {
          en: "Swamp",
          pt: "Pântano",
          emoji: "🐊"
        },
        {
          en: "Tundra",
          pt: "Tundra",
          emoji: "🐻‍❄️"
        },
        {
          en: "Earthquake",
          pt: "Terremoto",
          emoji: "🌍"
        },
        {
          en: "Hurricane",
          pt: "Furacão",
          emoji: "🌀"
        },
        {
          en: "Tornado",
          pt: "Tornado",
          emoji: "🌪️"
        },
        {
          en: "Flood",
          pt: "Enchente",
          emoji: "🌊"
        },
        {
          en: "Drought",
          pt: "Seca",
          emoji: "☀️"
        },
        {
          en: "Pollution",
          pt: "Poluição",
          emoji: "🏭"
        },
        {
          en: "Recycle",
          pt: "Reciclar",
          emoji: "♻️"
        },
        {
          en: "Biodiversity",
          pt: "Biodiversidade",
          emoji: "🦋"
        },
        {
          en: "Ecosystem",
          pt: "Ecossistema",
          emoji: "🌿"
        },
        {
          en: "Climate",
          pt: "Clima",
          emoji: "🌡️"
        }
      ]
    }
  },
  {
    id: "con_ingles_compras",
    tipo: "ingles",
    titulo: "Inglês — Compras e Comércio",
    descricao: "Vocabulário para fazer compras em inglês!",
    emoji: "🛒",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Vamos às compras? Aprenda como pedir, pagar e negociar em inglês!",
    dados: {
      flashcards: [
        {
          en: "Store",
          pt: "Loja",
          emoji: "🏪"
        },
        {
          en: "Price",
          pt: "Preço",
          emoji: "💲"
        },
        {
          en: "Discount",
          pt: "Desconto",
          emoji: "🏷️"
        },
        {
          en: "Receipt",
          pt: "Recibo",
          emoji: "🧾"
        },
        {
          en: "Cash",
          pt: "Dinheiro",
          emoji: "💵"
        },
        {
          en: "Credit Card",
          pt: "Cartão de crédito",
          emoji: "💳"
        },
        {
          en: "Shopping Cart",
          pt: "Carrinho de compras",
          emoji: "🛒"
        },
        {
          en: "Size",
          pt: "Tamanho",
          emoji: "📏"
        },
        {
          en: "Color",
          pt: "Cor",
          emoji: "🎨"
        },
        {
          en: "Exchange",
          pt: "Troca",
          emoji: "🔄"
        },
        {
          en: "Sale",
          pt: "Promoção",
          emoji: "🔥"
        },
        {
          en: "Brand",
          pt: "Marca",
          emoji: "✅"
        },
        {
          en: "Quality",
          pt: "Qualidade",
          emoji: "⭐"
        },
        {
          en: "Cheap",
          pt: "Barato",
          emoji: "🤑"
        },
        {
          en: "Expensive",
          pt: "Caro",
          emoji: "💎"
        },
        {
          en: "Supermarket",
          pt: "Supermercado",
          emoji: "🏬"
        },
        {
          en: "Pharmacy",
          pt: "Farmácia",
          emoji: "💊"
        },
        {
          en: "Bakery",
          pt: "Padaria",
          emoji: "🍞"
        },
        {
          en: "Market",
          pt: "Mercado",
          emoji: "🛍️"
        },
        {
          en: "Customer",
          pt: "Cliente",
          emoji: "🙋"
        }
      ]
    }
  },
  {
    id: "con_ingles_lugares",
    tipo: "ingles",
    titulo: "Inglês — Lugares da Cidade",
    descricao: "Aprenda o nome dos lugares da cidade em inglês!",
    emoji: "🏙️",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Explore a cidade em inglês! Aprenda onde fica cada lugar e como pedir informações!",
    dados: {
      flashcards: [
        {
          en: "School",
          pt: "Escola",
          emoji: "🏫"
        },
        {
          en: "Hospital",
          pt: "Hospital",
          emoji: "🏥"
        },
        {
          en: "Park",
          pt: "Parque",
          emoji: "🌳"
        },
        {
          en: "Library",
          pt: "Biblioteca",
          emoji: "📚"
        },
        {
          en: "Police Station",
          pt: "Delegacia",
          emoji: "👮"
        },
        {
          en: "Fire Station",
          pt: "Bombeiros",
          emoji: "🚒"
        },
        {
          en: "Supermarket",
          pt: "Supermercado",
          emoji: "🛒"
        },
        {
          en: "Bank",
          pt: "Banco",
          emoji: "🏦"
        },
        {
          en: "Post Office",
          pt: "Correio",
          emoji: "📮"
        },
        {
          en: "Church",
          pt: "Igreja",
          emoji: "⛪"
        },
        {
          en: "Museum",
          pt: "Museu",
          emoji: "🏛️"
        },
        {
          en: "Zoo",
          pt: "Zoológico",
          emoji: "🦁"
        },
        {
          en: "Airport",
          pt: "Aeroporto",
          emoji: "✈️"
        },
        {
          en: "Train Station",
          pt: "Estação de trem",
          emoji: "🚆"
        },
        {
          en: "Bus Stop",
          pt: "Ponto de ônibus",
          emoji: "🚌"
        },
        {
          en: "Restaurant",
          pt: "Restaurante",
          emoji: "🍽️"
        },
        {
          en: "Pharmacy",
          pt: "Farmácia",
          emoji: "💊"
        },
        {
          en: "Cinema",
          pt: "Cinema",
          emoji: "🎬"
        },
        {
          en: "Gym",
          pt: "Academia",
          emoji: "🏋️"
        },
        {
          en: "Market",
          pt: "Mercado",
          emoji: "🛍️"
        }
      ]
    }
  },
  {
    id: "con_ingles_corpo",
    tipo: "ingles",
    titulo: "Inglês — Corpo e Saúde",
    descricao: "Vocabulário médico e do corpo humano!",
    emoji: "🏥",
    habilidade: "Inglês",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 12,
    historinha: "Saúde em inglês! Aprenda vocabulário do corpo e consultas médicas!",
    dados: {
      flashcards: [
        {
          en: "Heart",
          pt: "Coração",
          emoji: "❤️"
        },
        {
          en: "Lung",
          pt: "Pulmão",
          emoji: "🫁"
        },
        {
          en: "Brain",
          pt: "Cérebro",
          emoji: "🧠"
        },
        {
          en: "Stomach",
          pt: "Estômago",
          emoji: "🫃"
        },
        {
          en: "Bone",
          pt: "Osso",
          emoji: "🦴"
        },
        {
          en: "Skin",
          pt: "Pele",
          emoji: "🧴"
        },
        {
          en: "Blood",
          pt: "Sangue",
          emoji: "🩸"
        },
        {
          en: "Fever",
          pt: "Febre",
          emoji: "🌡️"
        },
        {
          en: "Headache",
          pt: "Dor de cabeça",
          emoji: "🤕"
        },
        {
          en: "Medicine",
          pt: "Remédio",
          emoji: "💊"
        },
        {
          en: "Hospital",
          pt: "Hospital",
          emoji: "🏥"
        },
        {
          en: "Surgery",
          pt: "Cirurgia",
          emoji: "🔪"
        },
        {
          en: "X-Ray",
          pt: "Raio-X",
          emoji: "🩻"
        },
        {
          en: "Vaccine",
          pt: "Vacina",
          emoji: "💉"
        },
        {
          en: "Allergy",
          pt: "Alergia",
          emoji: "🤧"
        },
        {
          en: "Healthy",
          pt: "Saudável",
          emoji: "💚"
        },
        {
          en: "Exercise",
          pt: "Exercício",
          emoji: "🏋️"
        },
        {
          en: "Sleep",
          pt: "Sono",
          emoji: "😴"
        },
        {
          en: "Nutrition",
          pt: "Nutrição",
          emoji: "🥗"
        },
        {
          en: "Hygiene",
          pt: "Higiene",
          emoji: "🧼"
        }
      ]
    }
  }
]

// ── Números ──
export const numerosExtraPorFaixa = [
  {
    id: "con_numeros_11_20",
    tipo: "numeros",
    titulo: "Números 11 a 20",
    descricao: "Aprenda a ler e ouvir os números de 11 a 20!",
    emoji: "🔢",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "Você já domina o 1 ao 10 — agora é hora de ir além! 🔢 Os números de 11 a 20 têm nomes especiais em português. Ouça cada um e descubra o padrão deles!",
    dados: {
      numeros: [
        {
          n: 11,
          display: "11",
          word: "Onze",
          emoji: "⭐",
          cor: "#7F77DD",
          funfato: "11 é o primeiro número com dois dígitos iguais!"
        },
        {
          n: 12,
          display: "12",
          word: "Doze",
          emoji: "🕛",
          cor: "#4F8EE8",
          funfato: "O relógio tem 12 horas — por isso 12 é chamado de \"dúzia\"!"
        },
        {
          n: 13,
          display: "13",
          word: "Treze",
          emoji: "🌟",
          cor: "#EF9F27",
          funfato: "13 tem fama de número da sorte em muitas culturas do mundo!"
        },
        {
          n: 14,
          display: "14",
          word: "Quatorze",
          emoji: "🦋",
          cor: "#D4537E",
          funfato: "Fevereiro tem 28 ou 29 dias — 14 + 14 ou 14 + 15!"
        },
        {
          n: 15,
          display: "15",
          word: "Quinze",
          emoji: "🏅",
          cor: "#1D9E75",
          funfato: "15 minutos é um quarto de hora. 4 × 15 = 60 minutos!"
        },
        {
          n: 16,
          display: "16",
          word: "Dezesseis",
          emoji: "🎯",
          cor: "#D85A30",
          funfato: "16 é 4 × 4 — o quadrado de 4! Quadrados são números bem especiais."
        },
        {
          n: 17,
          display: "17",
          word: "Dezessete",
          emoji: "💫",
          cor: "#7F77DD",
          funfato: "17 é um número primo — só é divisível por 1 e por ele mesmo!"
        },
        {
          n: 18,
          display: "18",
          word: "Dezoito",
          emoji: "🌺",
          cor: "#4F8EE8",
          funfato: "18 = 2 × 9 = 3 × 6. Tem vários pares de multiplicação!"
        },
        {
          n: 19,
          display: "19",
          word: "Dezenove",
          emoji: "🚀",
          cor: "#EF9F27",
          funfato: "19 é primo — igualzinho ao 17. Primos não se dividem facilmente!"
        },
        {
          n: 20,
          display: "20",
          word: "Vinte",
          emoji: "🎉",
          cor: "#1D9E75",
          funfato: "Vinte = 2 dezenas! Quando chegamos no 20, completamos dois grupos de 10."
        }
      ]
    }
  },
  {
    id: "con_numeros_dezenas",
    tipo: "numeros",
    titulo: "As Dezenas",
    descricao: "Conheça as dezenas: 10, 20, 30... até 100!",
    emoji: "💯",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "As dezenas são como escadas numéricas! 💯 Cada degrau sobe 10 unidades. Vamos ouvir e aprender cada uma delas até chegar no número 100!",
    dados: {
      numeros: [
        {
          n: 10,
          display: "10",
          word: "Dez",
          emoji: "🔟",
          cor: "#7F77DD",
          funfato: "Temos 10 dedos — por isso contamos em base 10!"
        },
        {
          n: 20,
          display: "20",
          word: "Vinte",
          emoji: "✌️",
          cor: "#4F8EE8",
          funfato: "Vinte = 2 grupos de 10. Vinte reais são duas notas de R$10!"
        },
        {
          n: 30,
          display: "30",
          word: "Trinta",
          emoji: "📅",
          cor: "#1D9E75",
          funfato: "Muitos meses têm 30 dias. Trinta dias é quase um mês inteiro!"
        },
        {
          n: 40,
          display: "40",
          word: "Quarenta",
          emoji: "🕐",
          cor: "#EF9F27",
          funfato: "Quarenta minutos é dois terços de uma hora!"
        },
        {
          n: 50,
          display: "50",
          word: "Cinquenta",
          emoji: "🏅",
          cor: "#D4537E",
          funfato: "Cinquenta é a metade de cem — o meio caminho andado!"
        },
        {
          n: 60,
          display: "60",
          word: "Sessenta",
          emoji: "⏱️",
          cor: "#D85A30",
          funfato: "Sessenta segundos fazem um minuto. Sessenta minutos fazem uma hora!"
        },
        {
          n: 70,
          display: "70",
          word: "Setenta",
          emoji: "🌟",
          cor: "#7F77DD",
          funfato: "70 anos é chamado de \"sétima década de vida\" — uma vida longa!"
        },
        {
          n: 80,
          display: "80",
          word: "Oitenta",
          emoji: "🎯",
          cor: "#4F8EE8",
          funfato: "Oitenta por cento de 100 é a maioria! Mais da metade com sobra."
        },
        {
          n: 90,
          display: "90",
          word: "Noventa",
          emoji: "📐",
          cor: "#1D9E75",
          funfato: "Um ângulo reto tem 90 graus — o canto de uma folha de papel!"
        },
        {
          n: 100,
          display: "100",
          word: "Cem",
          emoji: "💯",
          cor: "#EF9F27",
          funfato: "Cem é o número da perfeição! 10 × 10 = 100. Um século tem 100 anos."
        }
      ]
    }
  },
  {
    id: "con_numeros_pares",
    tipo: "numeros",
    titulo: "Números Pares",
    descricao: "Descubra os números pares de 2 a 20!",
    emoji: "2️⃣",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "Números pares são como meias — sempre aparecem em duplas! 👟 Um número é par quando pode ser dividido em dois grupos iguais. Vamos conhecê-los!",
    dados: {
      numeros: [
        {
          n: 2,
          display: "2",
          word: "Dois",
          emoji: "👟",
          cor: "#4F8EE8",
          funfato: "2 é o único número par que também é primo!"
        },
        {
          n: 4,
          display: "4",
          word: "Quatro",
          emoji: "🍀",
          cor: "#1D9E75",
          funfato: "O trevo de 4 folhas é raro e traz sorte — são 4 grupos de 1!"
        },
        {
          n: 6,
          display: "6",
          word: "Seis",
          emoji: "🎲",
          cor: "#D85A30",
          funfato: "O dado tem 6 faces — e cada face oposta soma sempre 7!"
        },
        {
          n: 8,
          display: "8",
          word: "Oito",
          emoji: "🐙",
          cor: "#7F77DD",
          funfato: "O polvo tem 8 braços — e pode abrir potes com eles!"
        },
        {
          n: 10,
          display: "10",
          word: "Dez",
          emoji: "🔟",
          cor: "#EF9F27",
          funfato: "10 dedos nas mãos — por isso nossa base de contar é 10!"
        },
        {
          n: 12,
          display: "12",
          word: "Doze",
          emoji: "🕛",
          cor: "#D4537E",
          funfato: "Uma dúzia tem 12 — ovos, rosas e donuts costumam vir em dúzias!"
        },
        {
          n: 14,
          display: "14",
          word: "Quatorze",
          emoji: "💝",
          cor: "#4F8EE8",
          funfato: "14 de fevereiro é o Dia dos Namorados em muitos países!"
        },
        {
          n: 16,
          display: "16",
          word: "Dezesseis",
          emoji: "🎯",
          cor: "#1D9E75",
          funfato: "16 = 4² (quatro ao quadrado). Quadrados são números multiplicados por si mesmos!"
        },
        {
          n: 18,
          display: "18",
          word: "Dezoito",
          emoji: "🌺",
          cor: "#EF9F27",
          funfato: "18 é divisível por 1, 2, 3, 6, 9 e 18 — tem muitos divisores!"
        },
        {
          n: 20,
          display: "20",
          word: "Vinte",
          emoji: "🎉",
          cor: "#D4537E",
          funfato: "Chegamos ao 20! Todos os pares terminam em 0, 2, 4, 6 ou 8."
        }
      ]
    }
  },
  {
    id: "con_numeros_impares",
    tipo: "numeros",
    titulo: "Números Ímpares",
    descricao: "Descubra os números ímpares — os que não se dividem em duas partes iguais!",
    emoji: "1️⃣",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "Números ímpares são os rebeldes da matemática! 1️⃣ Quando você tenta dividir um ímpar ao meio, sempre sobra 1. Vamos conhecê-los!",
    dados: {
      numeros: [
        {
          n: 1,
          display: "1",
          word: "Um",
          emoji: "👆",
          cor: "#EF9F27",
          funfato: "1 é o menor número ímpar — e é divisor de todos os outros!"
        },
        {
          n: 3,
          display: "3",
          word: "Três",
          emoji: "🍀",
          cor: "#1D9E75",
          funfato: "3 é ímpar e primo! Triângulos têm 3 lados e são as formas mais estáveis!"
        },
        {
          n: 5,
          display: "5",
          word: "Cinco",
          emoji: "✋",
          cor: "#D4537E",
          funfato: "5 dedos na mão e 5 pontas na estrela — 5 aparece em toda a natureza!"
        },
        {
          n: 7,
          display: "7",
          word: "Sete",
          emoji: "🌈",
          cor: "#7F77DD",
          funfato: "7 é o número da sorte em muitas culturas — 7 cores no arco-íris!"
        },
        {
          n: 9,
          display: "9",
          word: "Nove",
          emoji: "🐱",
          cor: "#D85A30",
          funfato: "Gatos têm \"7 vidas\" na lenda — e 9 é o maior dígito ímpar!"
        },
        {
          n: 11,
          display: "11",
          word: "Onze",
          emoji: "⚽",
          cor: "#4F8EE8",
          funfato: "11 jogadores por time no futebol — e 11 é primo!"
        },
        {
          n: 13,
          display: "13",
          word: "Treze",
          emoji: "🌟",
          cor: "#EF9F27",
          funfato: "13 é primo e muitas culturas o consideram número da sorte!"
        },
        {
          n: 15,
          display: "15",
          word: "Quinze",
          emoji: "🏅",
          cor: "#1D9E75",
          funfato: "15 = 3 × 5 — produto de dois primos! Divisível por 3 e por 5."
        },
        {
          n: 17,
          display: "17",
          word: "Dezessete",
          emoji: "💫",
          cor: "#D4537E",
          funfato: "17 é primo — assim como 11 e 13 aqui na série de ímpares!"
        },
        {
          n: 19,
          display: "19",
          word: "Dezenove",
          emoji: "🚀",
          cor: "#7F77DD",
          funfato: "19 é o último primo da dezena. O próximo ímpar (21 = 3×7) não é primo!"
        }
      ]
    }
  },
  {
    id: "con_numeros_multiplos3",
    tipo: "numeros",
    titulo: "Múltiplos de 3",
    descricao: "Os números da tabuada do 3!",
    emoji: "3️⃣",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "A tabuada do 3 tem um segredo: some os dígitos e se der 3, 6 ou 9, o número é múltiplo de 3! 3️⃣ Vamos descobrir!",
    dados: {
      numeros: [
        {
          n: 3,
          display: "3",
          word: "Três",
          emoji: "🎵",
          cor: "#1D9E75",
          funfato: "3 × 1 = 3. O Trio é a formação mínima de uma banda de jazz!"
        },
        {
          n: 6,
          display: "6",
          word: "Seis",
          emoji: "🎲",
          cor: "#D85A30",
          funfato: "3 × 2 = 6. Um dado tem 6 faces e a soma de opostas é sempre 7!"
        },
        {
          n: 9,
          display: "9",
          word: "Nove",
          emoji: "🐱",
          cor: "#7F77DD",
          funfato: "3 × 3 = 9. Curiosidade: todo múltiplo de 9 tem dígitos que somam 9!"
        },
        {
          n: 12,
          display: "12",
          word: "Doze",
          emoji: "🕛",
          cor: "#4F8EE8",
          funfato: "3 × 4 = 12. Uma dúzia! 12 meses, 12 horas — número muito usado!"
        },
        {
          n: 15,
          display: "15",
          word: "Quinze",
          emoji: "🏅",
          cor: "#EF9F27",
          funfato: "3 × 5 = 15. 15 minutos é um quarto de hora — 60 ÷ 4 = 15."
        },
        {
          n: 18,
          display: "18",
          word: "Dezoito",
          emoji: "🌺",
          cor: "#D4537E",
          funfato: "3 × 6 = 18. Os dígitos 1+8=9 — sempre volta ao 9 nos múltiplos de 9!"
        },
        {
          n: 21,
          display: "21",
          word: "Vinte e Um",
          emoji: "🃏",
          cor: "#1D9E75",
          funfato: "3 × 7 = 21. O jogo Black Jack tem como objetivo chegar a 21!"
        },
        {
          n: 24,
          display: "24",
          word: "Vinte e Quatro",
          emoji: "⏰",
          cor: "#D85A30",
          funfato: "3 × 8 = 24. Um dia tem 24 horas — dividido em 3 turnos de 8h!"
        },
        {
          n: 27,
          display: "27",
          word: "Vinte e Sete",
          emoji: "🌙",
          cor: "#7F77DD",
          funfato: "3 × 9 = 27. A Lua demora 27 dias para dar uma volta completa na Terra!"
        },
        {
          n: 30,
          display: "30",
          word: "Trinta",
          emoji: "📅",
          cor: "#4F8EE8",
          funfato: "3 × 10 = 30. Muitos meses têm 30 dias — quase um mês inteiro!"
        }
      ]
    }
  },
  {
    id: "con_numeros_multiplos5",
    tipo: "numeros",
    titulo: "Múltiplos de 5",
    descricao: "Os números da tabuada do 5 — sempre terminam em 0 ou 5!",
    emoji: "5️⃣",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "A tabuada do 5 é fácil: todos os múltiplos terminam em 5 ou 0! 5️⃣ É o mais fácil de decorar. Vamos conferir!",
    dados: {
      numeros: [
        {
          n: 5,
          display: "5",
          word: "Cinco",
          emoji: "✋",
          cor: "#D4537E",
          funfato: "5 × 1 = 5. Temos 5 dedos em cada mão — perfeito para contar!"
        },
        {
          n: 10,
          display: "10",
          word: "Dez",
          emoji: "🔟",
          cor: "#1D9E75",
          funfato: "5 × 2 = 10. Dez dedos nas duas mãos — a base do sistema decimal!"
        },
        {
          n: 15,
          display: "15",
          word: "Quinze",
          emoji: "⏰",
          cor: "#EF9F27",
          funfato: "5 × 3 = 15. Um quarto de hora tem 15 minutos!"
        },
        {
          n: 20,
          display: "20",
          word: "Vinte",
          emoji: "🎉",
          cor: "#D85A30",
          funfato: "5 × 4 = 20. Vinte dedos nas mãos e nos pés combinados!"
        },
        {
          n: 25,
          display: "25",
          word: "Vinte e Cinco",
          emoji: "💰",
          cor: "#7F77DD",
          funfato: "5 × 5 = 25. Um quarto de cem centavos — a moeda de 25 cents!"
        },
        {
          n: 30,
          display: "30",
          word: "Trinta",
          emoji: "📅",
          cor: "#4F8EE8",
          funfato: "5 × 6 = 30. Metade de um minuto! 30 segundos é meia tacada!"
        },
        {
          n: 35,
          display: "35",
          word: "Trinta e Cinco",
          emoji: "🌡️",
          cor: "#EF9F27",
          funfato: "5 × 7 = 35. Temperatura de 35°C já é muito quente no Brasil!"
        },
        {
          n: 40,
          display: "40",
          word: "Quarenta",
          emoji: "🕐",
          cor: "#D4537E",
          funfato: "5 × 8 = 40. A semana de trabalho padrão é 40 horas (5 dias × 8h)!"
        },
        {
          n: 45,
          display: "45",
          word: "Quarenta e Cinco",
          emoji: "📐",
          cor: "#1D9E75",
          funfato: "5 × 9 = 45. 45° é a diagonal perfeita — metade de um ângulo reto!"
        },
        {
          n: 50,
          display: "50",
          word: "Cinquenta",
          emoji: "🏅",
          cor: "#D85A30",
          funfato: "5 × 10 = 50. A metade exata de 100 — o meio caminho andado!"
        }
      ]
    }
  },
  {
    id: "con_numeros_multiplos4",
    tipo: "numeros",
    titulo: "Múltiplos de 4",
    descricao: "Os números da tabuada do 4!",
    emoji: "4️⃣",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "A tabuada do 4 aparece em todo lugar — nas estações do ano, nos pontos cardeais e nas patas dos cavalos! 4️⃣ Vamos explorar!",
    dados: {
      numeros: [
        {
          n: 4,
          display: "4",
          word: "Quatro",
          emoji: "🍀",
          cor: "#1D9E75",
          funfato: "4 × 1 = 4. As 4 estações do ano, os 4 pontos cardeais!"
        },
        {
          n: 8,
          display: "8",
          word: "Oito",
          emoji: "🐙",
          cor: "#D4537E",
          funfato: "4 × 2 = 8. O polvo tem 8 braços — dois grupos de 4!"
        },
        {
          n: 12,
          display: "12",
          word: "Doze",
          emoji: "🕛",
          cor: "#7F77DD",
          funfato: "4 × 3 = 12. Uma dúzia! O relógio tem 12 horas — 3 grupos de 4!"
        },
        {
          n: 16,
          display: "16",
          word: "Dezesseis",
          emoji: "🎯",
          cor: "#4F8EE8",
          funfato: "4 × 4 = 16. Quadrado de 4! O xadrez tem 16 peças de cada lado!"
        },
        {
          n: 20,
          display: "20",
          word: "Vinte",
          emoji: "✋",
          cor: "#EF9F27",
          funfato: "4 × 5 = 20. Os 20 dedos das mãos e pés — 5 grupos de 4!"
        },
        {
          n: 24,
          display: "24",
          word: "Vinte e Quatro",
          emoji: "⏰",
          cor: "#D85A30",
          funfato: "4 × 6 = 24. O dia tem 24 horas — 6 grupos de 4 horas cada!"
        },
        {
          n: 28,
          display: "28",
          word: "Vinte e Oito",
          emoji: "📅",
          cor: "#1D9E75",
          funfato: "4 × 7 = 28. Fevereiro tem 28 dias — 7 grupos de 4!"
        },
        {
          n: 32,
          display: "32",
          word: "Trinta e Dois",
          emoji: "🎮",
          cor: "#D4537E",
          funfato: "4 × 8 = 32. 32 graus Fahrenheit é a temperatura em que a água congela!"
        },
        {
          n: 36,
          display: "36",
          word: "Trinta e Seis",
          emoji: "📐",
          cor: "#7F77DD",
          funfato: "4 × 9 = 36. 360° ÷ 10 = 36°. Aparece no círculo!"
        },
        {
          n: 40,
          display: "40",
          word: "Quarenta",
          emoji: "🏆",
          cor: "#4F8EE8",
          funfato: "4 × 10 = 40. A semana de trabalho tem 40 horas (4 grupos de 10!)."
        }
      ]
    }
  },
  {
    id: "con_numeros_centenas",
    tipo: "numeros",
    titulo: "As Centenas",
    descricao: "De 100 a 1000 — os números das centenas!",
    emoji: "💯",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "Depois das dezenas vêm as centenas! 💯 Cada salto é de 100 unidades. Vamos aprender a ler e ouvir esses números grandes!",
    dados: {
      numeros: [
        {
          n: 100,
          display: "100",
          word: "Cem",
          emoji: "💯",
          cor: "#EF9F27",
          funfato: "100 é o quadrado de 10! 10 × 10 = 100. Um século tem 100 anos!"
        },
        {
          n: 200,
          display: "200",
          word: "Duzentos",
          emoji: "🕐",
          cor: "#4F8EE8",
          funfato: "200 é 2 × 100. Duzentos centavos fazem 2 reais!"
        },
        {
          n: 300,
          display: "300",
          word: "Trezentos",
          emoji: "📅",
          cor: "#1D9E75",
          funfato: "300 é 3 × 100. Um ano tem ~365 dias — próximo de 300!"
        },
        {
          n: 400,
          display: "400",
          word: "Quatrocentos",
          emoji: "🌍",
          cor: "#D4537E",
          funfato: "400 anos é uma época histórica — como o Brasil na época colonial!"
        },
        {
          n: 500,
          display: "500",
          word: "Quinhentos",
          emoji: "⚡",
          cor: "#7F77DD",
          funfato: "500 anos! O Brasil foi descoberto (avistado) há mais de 500 anos!"
        },
        {
          n: 600,
          display: "600",
          word: "Seiscentos",
          emoji: "🎵",
          cor: "#D85A30",
          funfato: "600 Hz é a frequência do Ré na escala musical — sons e números!"
        },
        {
          n: 700,
          display: "700",
          word: "Setecentos",
          emoji: "🏆",
          cor: "#EF9F27",
          funfato: "700 quilômetros de estrada — de São Paulo a Florianópolis!"
        },
        {
          n: 800,
          display: "800",
          word: "Oitocentos",
          emoji: "🌙",
          cor: "#4F8EE8",
          funfato: "800 anos atrás estava a Idade Média — um mundo muito diferente!"
        },
        {
          n: 900,
          display: "900",
          word: "Novecentos",
          emoji: "🌟",
          cor: "#1D9E75",
          funfato: "900 = 30² (trinta ao quadrado). Também é 9 × 100!"
        },
        {
          n: 1000,
          display: "1.000",
          word: "Mil",
          emoji: "🎊",
          cor: "#D4537E",
          funfato: "Mil é 10 × 100 = 10³. Um milênio tem 1.000 anos — o fim do século XX!"
        }
      ]
    }
  },
  {
    id: "con_numeros_geometria",
    tipo: "numeros",
    titulo: "Números da Geometria",
    descricao: "Os números especiais que aparecem nas figuras geométricas!",
    emoji: "📐",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "A geometria está cheia de números especiais! 📐 Cada figura tem um número de lados, ângulos e vértices únicos. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 3,
          display: "3",
          word: "Três",
          emoji: "🔺",
          cor: "#C62828",
          funfato: "3 lados: o triângulo é a figura mais resistente e estável!"
        },
        {
          n: 4,
          display: "4",
          word: "Quatro",
          emoji: "⬛",
          cor: "#1565C0",
          funfato: "4 lados do quadrado: todos iguais e ângulos de 90°!"
        },
        {
          n: 5,
          display: "5",
          word: "Cinco",
          emoji: "⭐",
          cor: "#EF9F27",
          funfato: "5 pontas da estrela, 5 lados do pentágono — aparece em flores!"
        },
        {
          n: 6,
          display: "6",
          word: "Seis",
          emoji: "🐝",
          cor: "#F9A825",
          funfato: "6 lados do hexágono — abelhas fazem colmeias hexagonais por eficiência!"
        },
        {
          n: 8,
          display: "8",
          word: "Oito",
          emoji: "🛑",
          cor: "#C62828",
          funfato: "8 lados do octógono — a placa de PARE tem 8 lados!"
        },
        {
          n: 90,
          display: "90°",
          word: "Noventa Graus",
          emoji: "📐",
          cor: "#D4537E",
          funfato: "90° é o ângulo reto — o canto de toda folha de papel e porta!"
        },
        {
          n: 180,
          display: "180°",
          word: "Cento e Oitenta",
          emoji: "📏",
          cor: "#7F77DD",
          funfato: "180°: a soma dos ângulos de qualquer triângulo é sempre 180°!"
        },
        {
          n: 360,
          display: "360°",
          word: "Trezentos e Sessenta",
          emoji: "🔄",
          cor: "#4F8EE8",
          funfato: "360°: um círculo completo! De onde veio? Dos babilônios!"
        }
      ]
    }
  },
  {
    id: "con_numeros_calendario",
    tipo: "numeros",
    titulo: "Números do Calendário",
    descricao: "Os números que organizam nosso tempo!",
    emoji: "📅",
    habilidade: "Matemática",
    xp_reward: 90,
    coins_reward: 90,
    tempo_estimado: 10,
    historinha: "O calendário é cheio de números interessantes! 📅 Horas, dias, meses — tudo tem um número. Clique em 🔊 e organize o tempo!",
    dados: {
      numeros: [
        {
          n: 7,
          display: "7",
          word: "Sete",
          emoji: "📅",
          cor: "#7F77DD",
          funfato: "7 dias na semana — nome dos planetas! Domingo=Sol, Segunda=Lua, etc."
        },
        {
          n: 12,
          display: "12",
          word: "Doze",
          emoji: "🗓️",
          cor: "#4F8EE8",
          funfato: "12 meses no ano — os romanos adicionaram Janeiro e Fevereiro no calendário!"
        },
        {
          n: 24,
          display: "24",
          word: "Vinte e Quatro",
          emoji: "⏰",
          cor: "#D85A30",
          funfato: "24 horas por dia — vem dos egípcios que dividiam o dia em 12+12!"
        },
        {
          n: 60,
          display: "60",
          word: "Sessenta",
          emoji: "⏱️",
          cor: "#EF9F27",
          funfato: "60 minutos por hora e 60 segundos por minuto — sistema babilônico (base 60)!"
        },
        {
          n: 28,
          display: "28",
          word: "Vinte e Oito",
          emoji: "🌙",
          cor: "#9E9D24",
          funfato: "28 dias: o mês de fevereiro e o ciclo lunar! Lua cheia a cada ~28 dias!"
        },
        {
          n: 30,
          display: "30",
          word: "Trinta",
          emoji: "📆",
          cor: "#D4537E",
          funfato: "30 dias em abril, junho, setembro e novembro — um terço dos meses!"
        },
        {
          n: 31,
          display: "31",
          word: "Trinta e Um",
          emoji: "🎊",
          cor: "#C62828",
          funfato: "31 dias em janeiro, março, maio, julho, agosto, outubro e dezembro!"
        },
        {
          n: 52,
          display: "52",
          word: "Cinquenta e Dois",
          emoji: "🃏",
          cor: "#1565C0",
          funfato: "52 semanas no ano e 52 cartas no baralho — coincidência matemática!"
        },
        {
          n: 365,
          display: "365",
          word: "Trezentos e Sessenta e Cinco",
          emoji: "🌍",
          cor: "#1D9E75",
          funfato: "365 dias: o tempo que a Terra leva para dar uma volta ao redor do Sol!"
        },
        {
          n: 366,
          display: "366",
          word: "Trezentos e Sessenta e Seis",
          emoji: "🐸",
          cor: "#388E3C",
          funfato: "366 dias: ano bissexto! Ocorre a cada 4 anos para ajustar o calendário!"
        }
      ]
    }
  }
]

// ── Sílabas ──
export const silabasExtraPorFaixa = [
  {
    id: "con_silabas",
    tipo: "silabas",
    titulo: "Sílabas: Palavras Compostas",
    descricao: "Junte 3 ou mais sílabas e forme a palavra!",
    emoji: "🔡",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "Essas palavras são maiores e têm mais sílabas! 🔤 Toque nas sílabas na ordem certa para formar cada uma.",
    dados: {
      palavras: [
        {
          id: "boneca",
          palavra: "BONECA",
          silabas: ["BO", "NE", "CA"],
          emoji: "🪆"
        },
        {
          id: "janela",
          palavra: "JANELA",
          silabas: ["JA", "NE", "LA"],
          emoji: "🪟"
        },
        {
          id: "cavalo",
          palavra: "CAVALO",
          silabas: ["CA", "VA", "LO"],
          emoji: "🐴"
        },
        {
          id: "banana",
          palavra: "BANANA",
          silabas: ["BA", "NA", "NA"],
          emoji: "🍌"
        },
        {
          id: "sorvete",
          palavra: "SORVETE",
          silabas: ["SOR", "VE", "TE"],
          emoji: "🍦"
        },
        {
          id: "cachorro",
          palavra: "CACHORRO",
          silabas: ["CA", "CHOR", "RO"],
          emoji: "🐕"
        },
        {
          id: "elefante",
          palavra: "ELEFANTE",
          silabas: ["E", "LE", "FAN", "TE"],
          emoji: "🐘"
        },
        {
          id: "bicicleta",
          palavra: "BICICLETA",
          silabas: ["BI", "CI", "CLE", "TA"],
          emoji: "🚲"
        }
      ]
    }
  }
]
