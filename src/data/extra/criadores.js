// ──────────────────────────────────────────────────────────────────────
// ATIVIDADES EXTRA — CRIADORES (9–11 anos)
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
    id: "cri_alfabeto_ciencias",
    tipo: "alfabeto",
    titulo: "Ciências de A a Z",
    descricao: "Um conceito científico fundamental para cada letra!",
    emoji: "🔬",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "A olimpíada de ciências tem um conceito para cada letra! 🔬 Desde Átomo até Zoonose, explore os termos que constroem toda a ciência moderna. Clique em 🔊!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Átomo",
          emoji: "⚛️",
          funfato: "O átomo é tão pequeno que 1 fio de cabelo tem 1 milhão de átomos de largura!",
          detalhe: "Próton+nêutron (núcleo)+elétrons | Bohr 1913 | Modelo quântico: orbitais"
        },
        {
          letra: "B",
          palavra: "Bactéria",
          emoji: "🦠",
          funfato: "Bactérias existem há 3,5 bilhões de anos — são os seres mais antigos da Terra!",
          detalhe: "Procariontes | 3,5Ga | 1 trilhão de espécies estimadas | Simbiose: intestino"
        },
        {
          letra: "C",
          palavra: "Cromossomo",
          emoji: "🧬",
          funfato: "Humanos têm 46 cromossomos organizados em 23 pares!",
          detalhe: "DNA condensado | 46 humanos | Down: 47 | Turner: 45 | Telômeros"
        },
        {
          letra: "D",
          palavra: "Difração",
          emoji: "🔦",
          funfato: "A difração espalha a luz em cores num CD — por isso ele brilha coloridinho!",
          detalhe: "Onda dobra ao passar por abertura | Huygens 1678 | Difração de RX → DNA"
        },
        {
          letra: "E",
          palavra: "Entropia",
          emoji: "🌡️",
          funfato: "A entropia do universo só aumenta — é a 2ª Lei da Termodinâmica!",
          detalhe: "Boltzmann: S=k log W | Seta do tempo | Processo irreversível | Calor espalha"
        },
        {
          letra: "F",
          palavra: "Fotossíntese",
          emoji: "🌿",
          funfato: "Plantas convertem luz + CO₂ + água em glicose e liberam oxigênio!",
          detalhe: "6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂ | Clorofila | Ciclo Calvin"
        },
        {
          letra: "G",
          palavra: "Gene",
          emoji: "🧬",
          funfato: "Cada humano tem cerca de 20.000 genes que controlam como o corpo funciona!",
          detalhe: "Unidade de herança | ~20.000 genes humanos | Alelo | Dominante/recessivo"
        },
        {
          letra: "H",
          palavra: "Higgs",
          emoji: "⚛️",
          funfato: "O bóson de Higgs foi previsto em 1964 e descoberto no LHC em 2012 — 48 anos depois!",
          detalhe: "Campo de Higgs: dá massa às partículas | LHC CERN 27km | Nobel 2013"
        },
        {
          letra: "I",
          palavra: "Isótopo",
          emoji: "☢️",
          funfato: "Isótopos são átomos do mesmo elemento com número diferente de nêutrons!",
          detalhe: "Mesmo Z, diferente N | C-12 (estável), C-14 (radioativo) | Datação"
        },
        {
          letra: "J",
          palavra: "Joule",
          emoji: "⚡",
          funfato: "Uma maçã caindo de 1 metro libera aproximadamente 1 joule de energia!",
          detalhe: "Unidade SI de energia | J = kg·m²/s² | James Prescott Joule (1840)"
        },
        {
          letra: "K",
          palavra: "Kelvin",
          emoji: "🌡️",
          funfato: "O zero Kelvin (-273,15°C) é a temperatura mais fria possível no universo!",
          detalhe: "Escala absoluta | 0K = -273,15°C | 3ª Lei: impossível atingir 0K | Lord Kelvin 1848"
        },
        {
          letra: "L",
          palavra: "Lei de Newton",
          emoji: "⚙️",
          funfato: "Newton formulou 3 leis que explicam como tudo se move no universo!",
          detalhe: "1ª: inércia | 2ª: F=ma | 3ª: ação-reação | Principia Mathematica 1687"
        },
        {
          letra: "M",
          palavra: "Mutação",
          emoji: "🧬",
          funfato: "Mutações são mudanças no DNA — podem ser neutras, prejudiciais ou benéficas!",
          detalhe: "Substituição, inserção, deleção | ~100 mutações/geração | Motor da evolução"
        },
        {
          letra: "N",
          palavra: "Neuroplasticidade",
          emoji: "🧠",
          funfato: "O cérebro pode se reorganizar e criar novas conexões mesmo na idade adulta!",
          detalhe: "Sinapses se fortalecem/enfraquecem (Hebb, 1949) | Neurogênese hipocampal"
        },
        {
          letra: "O",
          palavra: "Osmose",
          emoji: "💧",
          funfato: "Osmose é a passagem da água por membrana do lugar com mais para o com menos água!",
          detalhe: "Gradiente de concentração | Semi-permeável | Pressão osmótica | Dessalinização"
        },
        {
          letra: "P",
          palavra: "Plasma",
          emoji: "🔆",
          funfato: "O plasma é o 4º estado da matéria — o mais comum no universo!",
          detalhe: "Estado ionizado | 99,9% da matéria visível | Fusão nuclear | Estrelas = plasma"
        },
        {
          letra: "Q",
          palavra: "Quântica",
          emoji: "⚛️",
          funfato: "Na Mecânica Quântica, um elétron pode estar em dois lugares ao mesmo tempo!",
          detalhe: "Dualidade onda-partícula | Incerteza (Heisenberg) | Superposição | Entrelaçamento"
        },
        {
          letra: "R",
          palavra: "RNA",
          emoji: "🧬",
          funfato: "O RNA é o mensageiro do DNA — leva instruções para produzir proteínas nas células!",
          detalhe: "Ácido ribonucleico | mRNA, tRNA, rRNA | Vacinas ARNm (Covid-19)"
        },
        {
          letra: "S",
          palavra: "Simbiose",
          emoji: "🐟",
          funfato: "Simbiose é quando dois organismos vivem juntos e se beneficiam mutuamente!",
          detalhe: "Mutualismo (+/+) | Comensalismo (+/0) | Parasitismo (+/-) | Líquen: fungo+alga"
        },
        {
          letra: "T",
          palavra: "Termodinâmica",
          emoji: "🌡️",
          funfato: "A termodinâmica explica por que geladeiras funcionam e o universo se expande!",
          detalhe: "4 Leis | 1ª: conservação de energia | 2ª: entropia | Carnot (1824)"
        },
        {
          letra: "U",
          palavra: "Universo",
          emoji: "🌌",
          funfato: "O universo tem 13,8 bilhões de anos e continua se expandindo a cada segundo!",
          detalhe: "Big Bang: 13,8Ga | 100 bilhões de galáxias | Matéria escura: 27% | Energia escura: 68%"
        },
        {
          letra: "V",
          palavra: "Valência",
          emoji: "🔬",
          funfato: "Os elétrons de valência determinam como os átomos formam moléculas!",
          detalhe: "Camada externa de elétrons | Ligações: covalente, iônica, metálica"
        },
        {
          letra: "W",
          palavra: "Watt",
          emoji: "⚡",
          funfato: "Um watt é a potência de transferir 1 joule de energia por segundo!",
          detalhe: "W = J/s | James Watt (1776) | LED: 10W | Turbina eólica: 3-8 MW"
        },
        {
          letra: "X",
          palavra: "Xenônio",
          emoji: "💨",
          funfato: "O xenônio é usado em propulsores de satélites e nos faróis modernos de carros!",
          detalhe: "Z=54 | Gás nobre | Propulsor iônico | Faróis Xenon | Anestesia (pesquisa)"
        },
        {
          letra: "Y",
          palavra: "Yield",
          emoji: "📊",
          funfato: "O rendimento de uma reação química mede quanto do produto esperado realmente se forma!",
          detalhe: "% = (real/teórico)×100 | Reações secundárias, equilíbrio, temperatura"
        },
        {
          letra: "Z",
          palavra: "Zoonose",
          emoji: "🦠",
          funfato: "Zoonoses são doenças que passam de animais para humanos — como a Covid-19!",
          detalhe: "Animal→humano | 60% das infecciosas humanas | Covid, ebola, raiva, leptospirose"
        }
      ]
    }
  },
  {
    id: "cri_alfabeto_filosofia",
    tipo: "alfabeto",
    titulo: "Filosofia de A a Z",
    descricao: "Um conceito filosófico essencial para cada letra!",
    emoji: "🤔",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "A filosofia tem uma ideia transformadora para cada letra! 🤔 Clique em 🔊 e descubra como os grandes pensadores enxergavam o mundo!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Alienação",
          emoji: "🔗",
          funfato: "Marx dizia que o trabalhador se aliena quando não tem controle sobre o que produz!",
          detalhe: "Marx | Trabalho → produto alheio | Estranhamento de si mesmo | Capital"
        },
        {
          letra: "B",
          palavra: "Bem-Estar",
          emoji: "🌿",
          funfato: "Para Aristóteles, o bem-estar (eudaimonia) só vem com a virtude — não com prazer!",
          detalhe: "Eudaimonia | Aristóteles | Virtude como meio-termo | Ética Nicomaqueia"
        },
        {
          letra: "C",
          palavra: "Ceticismo",
          emoji: "❓",
          funfato: "Descartes duvidou de tudo até chegar ao \"Cogito ergo sum\" — penso, logo existo!",
          detalhe: "Dúvida metódica | Descartes | Pirro: suspensão do julgamento | Ataraxia"
        },
        {
          letra: "D",
          palavra: "Dialética",
          emoji: "⚖️",
          funfato: "A dialética é o motor da história para Hegel: tese → antítese → síntese!",
          detalhe: "Hegel: Geist | Marx: materialismo histórico | Platão: diálogo socrático"
        },
        {
          letra: "E",
          palavra: "Existência",
          emoji: "🌅",
          funfato: "Para Sartre, a existência precede a essência — primeiro você existe, depois se define!",
          detalhe: "Existencialismo | Sartre | Liberdade radical | \"Condenados a ser livres\""
        },
        {
          letra: "F",
          palavra: "Fenomenologia",
          emoji: "👁️",
          funfato: "A fenomenologia de Husserl estuda como as coisas aparecem para a consciência!",
          detalhe: "Husserl | Intencionalidade | \"Às coisas mesmas\" | Heidegger, Merleau-Ponty"
        },
        {
          letra: "G",
          palavra: "Gnosiologia",
          emoji: "📚",
          funfato: "A gnosiologia (também chamada de epistemologia) estuda como você sabe que sabe algo — é a filosofia do conhecimento!",
          detalhe: "Episteme | Platão: opinião vs conhecimento | Gettier: crença verdadeira justificada"
        },
        {
          letra: "H",
          palavra: "Hermenêutica",
          emoji: "📖",
          funfato: "A hermenêutica é a arte de interpretar textos — especialmente textos antigos e sagrados!",
          detalhe: "Schleiermacher | Gadamer: fusão de horizontes | Círculo hermenêutico"
        },
        {
          letra: "I",
          palavra: "Idealismo",
          emoji: "💭",
          funfato: "Para Berkeley, nada existe fora da mente — \"ser é ser percebido\"!",
          detalhe: "Berkeley: esse est percipi | Kant: fenômeno/noumeno | Hegel: Geist absoluto"
        },
        {
          letra: "J",
          palavra: "Justiça",
          emoji: "⚖️",
          funfato: "Rawls imaginou uma \"posição original\" onde não sabemos o nosso lugar na sociedade!",
          detalhe: "Rawls: véu da ignorância | Platão: harmonia de almas | Justitia: cega"
        },
        {
          letra: "K",
          palavra: "Kant",
          emoji: "⚖️",
          funfato: "Kant disse que o imperativo moral é agir como se sua ação fosse uma lei universal!",
          detalhe: "Imperativo categórico | Kant | Deontologia | Consequencialismo (Bentham)"
        },
        {
          letra: "L",
          palavra: "Logos",
          emoji: "💬",
          funfato: "Logos em grego significa razão, palavra e ordem — o princípio que organiza o universo!",
          detalhe: "Heráclito: Logos como princípio | Estoicos | João 1:1 \"No início era o Verbo\""
        },
        {
          letra: "M",
          palavra: "Metafísica",
          emoji: "✨",
          funfato: "A metafísica pergunta o que há de fundamental na realidade — além do que podemos ver!",
          detalhe: "Aristóteles: \"após a física\" | Ser, substância, causalidade, tempo, espaço"
        },
        {
          letra: "N",
          palavra: "Niilismo",
          emoji: "🕳️",
          funfato: "Nietzsche disse \"Deus está morto\" — não como crime, mas como diagnóstico da modernidade!",
          detalhe: "Nietzsche | \"Deus está morto\" | Vontade de potência | Übermensch"
        },
        {
          letra: "O",
          palavra: "Ontologia",
          emoji: "🌌",
          funfato: "A ontologia é o estudo do \"ser\" — a mais fundamental questão filosófica!",
          detalhe: "Ser e Tempo (Heidegger) | Ser vs ente | Parménides: ser é imóvel"
        },
        {
          letra: "P",
          palavra: "Pragmatismo",
          emoji: "🔧",
          funfato: "Para James e Dewey, uma ideia é verdadeira se funciona na prática!",
          detalhe: "William James | John Dewey | \"Verdade = o que funciona\" | EUA séc XIX"
        },
        {
          letra: "Q",
          palavra: "Qualia",
          emoji: "🌈",
          funfato: "Qualia são as experiências subjetivas — a \"vermelhidade\" do vermelho que só você sente!",
          detalhe: "Filosofia da mente | Problema difícil da consciência (Chalmers) | Subjetivo"
        },
        {
          letra: "R",
          palavra: "Racionalismo",
          emoji: "🧠",
          funfato: "Descartes dizia que a razão, não os sentidos, é a fonte do conhecimento verdadeiro!",
          detalhe: "Descartes, Leibniz, Spinoza | Inatas: ideias a priori | Vs empirismo"
        },
        {
          letra: "S",
          palavra: "Solipsismo",
          emoji: "🪞",
          funfato: "O solipsismo é a ideia radical de que só você existe — tudo mais é criação da sua mente!",
          detalhe: "Posição extrema do ceticismo | Descartes flertou com ela | Refutação difícil"
        },
        {
          letra: "T",
          palavra: "Teleologia",
          emoji: "🎯",
          funfato: "Teleologia pergunta pelo propósito — Aristóteles via finalidade em tudo na natureza!",
          detalhe: "Telos: fim/propósito | Aristóteles: 4 causas | Vs mecanicismo moderno"
        },
        {
          letra: "U",
          palavra: "Utilitarismo",
          emoji: "📊",
          funfato: "Bentham propôs medir a moral pela quantidade de felicidade que uma ação produz!",
          detalhe: "Bentham: hedonismo | Mill: qualidade | \"Maior bem para o maior número\""
        },
        {
          letra: "V",
          palavra: "Virtude",
          emoji: "⭐",
          funfato: "Para Aristóteles, a virtude é sempre o meio-termo entre dois extremos — ex: coragem entre covardia e imprudência!",
          detalhe: "Mesotes (meio-termo) | Virtudes cardeais: prudência, justiça, fortaleza, temperança"
        },
        {
          letra: "W",
          palavra: "Weltanschauung",
          emoji: "🌍",
          funfato: "Weltanschauung é uma palavra alemã para visão de mundo — a forma como você enxerga tudo!",
          detalhe: "Cosmovisão | Cada cultura e época tem a sua | Hegel, Dilthey | \"Espírito do tempo\""
        },
        {
          letra: "X",
          palavra: "Xenofilia",
          emoji: "🤝",
          funfato: "Xenofilia é o oposto de xenofobia — o amor pelo que é estrangeiro e diferente!",
          detalhe: "Amor ao outro/estrangeiro | Cosmopolitismo (Diógenes): \"cidadão do mundo\""
        },
        {
          letra: "Y",
          palavra: "Yin-Yang",
          emoji: "☯️",
          funfato: "O Yin-Yang representa a dualidade harmônica — opostos que se completam, não se combatem!",
          detalhe: "Taoísmo | Lao Tsé | Escuridão + luz | Wu wei: ação sem forçar"
        },
        {
          letra: "Z",
          palavra: "Zeitgeist",
          emoji: "🕰️",
          funfato: "Zeitgeist é o \"espírito do tempo\" — o conjunto de ideias que define uma época!",
          detalhe: "Hegel | \"Zeit\" (tempo) + \"Geist\" (espírito) | Cada era tem suas ideias dominantes"
        }
      ]
    }
  },
  {
    id: "cri_alfabeto_arte",
    tipo: "alfabeto",
    titulo: "Arte e Artistas de A a Z",
    descricao: "Um estilo artístico ou artista para cada letra!",
    emoji: "🎨",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "A história da arte tem um movimento e artista para cada letra! 🎨 Clique em 🔊 e conheça os gênios que transformaram o mundo!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Arte-Abstrata",
          emoji: "🎨",
          funfato: "Kandinsky pintou a primeira obra abstrata do mundo em 1910 — sem nenhuma figura reconhecível!",
          detalhe: "Wassily Kandinsky 1910 | Cor como emoção | Blaue Reiter | Bauhaus"
        },
        {
          letra: "B",
          palavra: "Barroco",
          emoji: "🕍",
          funfato: "O estilo barroco foi criado pela Igreja Católica para impressionar e converter pessoas!",
          detalhe: "Séc. XVII | Contrarreforma | Bernini, Caravaggio, Rubens | Chiaroscuro"
        },
        {
          letra: "C",
          palavra: "Cubismo",
          emoji: "🟦",
          funfato: "Picasso fragmentou os objetos em cubos para mostrar múltiplos ângulos ao mesmo tempo!",
          detalhe: "Picasso + Braque 1907 | Múltiplas perspectivas | \"Les Demoiselles d'Avignon\""
        },
        {
          letra: "D",
          palavra: "Dadaísmo",
          emoji: "🎭",
          funfato: "Duchamp expôs um mictório como obra de arte — e isso mudou tudo na arte moderna!",
          detalhe: "Marcel Duchamp | Readymade | 1916 Zurique | Anti-arte | Tristan Tzara"
        },
        {
          letra: "E",
          palavra: "Expressionismo",
          emoji: "😱",
          funfato: "\"O Grito\" de Munch foi roubado duas vezes — e é um dos quadros mais caros do mundo!",
          detalhe: "Edvard Munch 1893 | Emoção sobre realidade | Deformação | Van Gogh precursor"
        },
        {
          letra: "F",
          palavra: "Frida-Kahlo",
          emoji: "🌺",
          funfato: "Frida Kahlo pintou 55 autorretratos — a maioria enquanto se recuperava de acidentes!",
          detalhe: "México | Auto-retratos | Surrealismo | Identidade mexicana | Dor como arte"
        },
        {
          letra: "G",
          palavra: "Grafite",
          emoji: "🖌️",
          funfato: "O grafite moderno nasceu no metrô de Nova York nos anos 1970 como forma de protesto!",
          detalhe: "NY 1970s | Banksy: anonimato | Jean-Michel Basquiat | Arte urbana"
        },
        {
          letra: "H",
          palavra: "Hiperrealismo",
          emoji: "📸",
          funfato: "Artistas hiperrealistas pintam quadros tão detalhados que parecem fotografias!",
          detalhe: "Séc. XX | Duane Hanson: esculturas de vinil realistas | Ilusão perfeita"
        },
        {
          letra: "I",
          palavra: "Impressionismo",
          emoji: "🌅",
          funfato: "Monet pintou a mesma catedral mais de 30 vezes para capturar como a luz muda!",
          detalhe: "Claude Monet | Luz e cor | 1874 Paris | \"Impressão, Sol Nascente\" | Plein air"
        },
        {
          letra: "J",
          palavra: "Japonismo",
          emoji: "🌸",
          funfato: "As gravuras japonesas do séc. XIX influenciaram Van Gogh, Monet e toda a arte ocidental!",
          detalhe: "Ukiyo-e | Hokusai | \"A Grande Onda\" | Influência sobre Impressionistas"
        },
        {
          letra: "K",
          palavra: "Klimt",
          emoji: "✨",
          funfato: "Klimt usava ouro de verdade em seus quadros — como na famosa obra \"O Beijo\"!",
          detalhe: "Gustav Klimt | \"O Beijo\" 1908 | Folha de ouro | Secessão Vienense"
        },
        {
          letra: "L",
          palavra: "Leonardo-da-Vinci",
          emoji: "👁️",
          funfato: "Leonardo da Vinci criou a Mona Lisa em 4 anos e nunca a entregou ao cliente!",
          detalhe: "Mona Lisa 1503-1519 | Sfumato | Polímata: arte+ciência+engenharia | Florença"
        },
        {
          letra: "M",
          palavra: "Michelangelo",
          emoji: "🏛️",
          funfato: "Michelangelo pintou o teto da Capela Sistina em pé num andaime, de cabeça pra trás, por 4 anos!",
          detalhe: "Sistina 1508-1512 | Afresco | Davi: 5,17m | Pietà | Renascimento"
        },
        {
          letra: "N",
          palavra: "Neoplatonismo",
          emoji: "💡",
          funfato: "O neoplatonismo influenciou a arte do Renascimento — a beleza física reflete a espiritual!",
          detalhe: "Ficino | Medici | Botticelli: \"O Nascimento de Vênus\" | Platão + Plotino"
        },
        {
          letra: "O",
          palavra: "Op-Art",
          emoji: "🌀",
          funfato: "A Op-Art cria ilusões de movimento com padrões geométricos — seu olho mente para você!",
          detalhe: "Bridget Riley | Victor Vasarely | 1960s | Ilusão perceptiva + neurológica"
        },
        {
          letra: "P",
          palavra: "Pop-Art",
          emoji: "🍌",
          funfato: "Andy Warhol elevou a lata de sopa Campbell a obra de arte — e vendeu por milhões!",
          detalhe: "Andy Warhol | Roy Lichtenstein | 1950-60s | Cultura de massa como arte"
        },
        {
          letra: "Q",
          palavra: "Quiasmo",
          emoji: "✝️",
          funfato: "O quiasmo na escultura grega é o equilíbrio natural do corpo em repouso — como o Davi!",
          detalhe: "Contrapposto | Policleto: Canon | Peso em uma perna | Naturalismo grego"
        },
        {
          letra: "R",
          palavra: "Renascimento",
          emoji: "🏛️",
          funfato: "O Renascimento redescobriu a Grécia e Roma — e inventou a perspectiva na pintura!",
          detalhe: "Florença séc. XV | Brunelleschi: perspectiva 1415 | Humanismo | Medici"
        },
        {
          letra: "S",
          palavra: "Surrealismo",
          emoji: "💭",
          funfato: "Dalí pintava seus sonhos — os relógios derretidos representam o tempo que não para!",
          detalhe: "Salvador Dalí | \"A Persistência da Memória\" | Freud | André Breton 1924"
        },
        {
          letra: "T",
          palavra: "Tarsila",
          emoji: "🌵",
          funfato: "Tarsila do Amaral criou o movimento modernista brasileiro com cores do Brasil!",
          detalhe: "\"Abaporu\" 1928 | Antropofagia | Semana de Arte Moderna 1922 | São Paulo"
        },
        {
          letra: "U",
          palavra: "Ukiyo-e",
          emoji: "🌊",
          funfato: "\"A Grande Onda\" de Hokusai é a obra de arte japonesa mais reconhecida no mundo!",
          detalhe: "Katsushika Hokusai | Gravura em madeira | Período Edo | \"Mundo flutuante\""
        },
        {
          letra: "V",
          palavra: "Van-Gogh",
          emoji: "🌻",
          funfato: "Van Gogh vendeu apenas um quadro em vida — hoje suas obras valem centenas de milhões!",
          detalhe: "\"A Noite Estrelada\" | Girassóis | Técnica empastamento | Pós-impressionismo"
        },
        {
          letra: "W",
          palavra: "Warhol",
          emoji: "🎨",
          funfato: "Warhol dizia que todos terão seus 15 minutos de fama — e previu as redes sociais!",
          detalhe: "\"15 minutes of fame\" | Factory | Repetição como crítica | Celebridade"
        },
        {
          letra: "X",
          palavra: "Xilogravura",
          emoji: "🖨️",
          funfato: "A xilogravura, gravura em madeira, foi o primeiro método de impressão em massa — na China!",
          detalhe: "China séc. VII | Gutenberg: tipos móveis | Nordestina: J. Borges | Popular"
        },
        {
          letra: "Y",
          palavra: "Yoko-Ono",
          emoji: "🕊️",
          funfato: "Yoko Ono criou uma obra de arte que é só uma instrução escrita para você imaginar!",
          detalhe: "Arte conceitual | Fluxus | Instrução como obra | \"Grapefruit\" 1964"
        },
        {
          letra: "Z",
          palavra: "Zanele-Muholi",
          emoji: "📷",
          funfato: "Zanele Muholi fotografa identidade e resistência de pessoas negras LGBTQ+ na África do Sul!",
          detalhe: "África do Sul | Ativista visual | \"Somnyama Ngonyama\" | Autorretrato político"
        }
      ]
    }
  },
  {
    id: "cri_alfabeto_historia",
    tipo: "alfabeto",
    titulo: "História Mundial de A a Z",
    descricao: "Um evento ou período histórico para cada letra!",
    emoji: "🏛️",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "A história da humanidade tem um marco para cada letra do alfabeto! 🏛️ Clique em 🔊 e viaje pelo tempo!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Antiguidade",
          emoji: "🏛️",
          funfato: "A Antiguidade Clássica (Grécia e Roma) criou a democracia, a filosofia e a arquitetura que usamos até hoje!",
          detalhe: "800 a.C. – 476 d.C. | Polis grega | República/Império romano | Patrimônio ocidental"
        },
        {
          letra: "B",
          palavra: "Batalha-de-Troia",
          emoji: "⚔️",
          funfato: "A Guerra de Troia durou 10 anos por causa de uma maçã dourada e uma mulher chamada Helena!",
          detalhe: "1200 a.C. | Cavalo de Troia | Homero: Ilíada | Descoberta: Schliemann 1870"
        },
        {
          letra: "C",
          palavra: "Cruzadas",
          emoji: "⚔️",
          funfato: "As Cruzadas foram 8 guerras pela Terra Santa que duraram mais de 200 anos!",
          detalhe: "1096-1291 | 8 cruzadas | Jerusalém | Templários | Fundação de estados"
        },
        {
          letra: "D",
          palavra: "Ditaduras",
          emoji: "✊",
          funfato: "O século XX foi o mais cheio de ditaduras — e também o que mais derrubou ditaduras!",
          detalhe: "Fascismo, Nazismo, Stalinismo, militarismos | Democracia 3ª onda (Huntington)"
        },
        {
          letra: "E",
          palavra: "Escravidão",
          emoji: "✊",
          funfato: "O Brasil foi o último país das Américas a abolir a escravidão — em 1888!",
          detalhe: "13Mi africanos traficados | Brasil: 40% | Lei Áurea 1888 | Reparações hoje"
        },
        {
          letra: "F",
          palavra: "Feudalismo",
          emoji: "🏰",
          funfato: "No feudalismo medieval, a maioria das pessoas nunca saía a mais de 50km do local onde nasceu!",
          detalhe: "Europa séc. IX-XV | Suserano-vassalo | Servos da gleba | Castelos"
        },
        {
          letra: "G",
          palavra: "Guerras-Mundiais",
          emoji: "🕊️",
          funfato: "As duas Guerras Mundiais mataram mais de 85 milhões de pessoas em menos de 30 anos!",
          detalhe: "I GM 1914-18: 20Mi | II GM 1939-45: 70-85Mi | ONU fundada 1945"
        },
        {
          letra: "H",
          palavra: "Holocausto",
          emoji: "✡️",
          funfato: "O Holocausto matou 6 milhões de judeus e 5 milhões de outras vítimas em 6 anos!",
          detalhe: "Shoah | 1941-1945 | 6Mi judeus | Campos | Nuremberg 1945-46 | Memória"
        },
        {
          letra: "I",
          palavra: "Imperialismo",
          emoji: "🌍",
          funfato: "A Grã-Bretanha chegou a controlar 1/4 de toda a terra do planeta ao mesmo tempo!",
          detalhe: "Britânico: 1/4 da superfície | 1890s-1900s | Conferência de Berlim 1884"
        },
        {
          letra: "J",
          palavra: "Japão-Feudal",
          emoji: "⚔️",
          funfato: "Os samurais serviam a um código de honra chamado Bushido — viviam e morriam por ele!",
          detalhe: "Período Edo 1603-1868 | Bushido | Katana | Xogunato Tokugawa | Harakiri"
        },
        {
          letra: "K",
          palavra: "King-Ciro",
          emoji: "📜",
          funfato: "Ciro, o Grande, criou a primeira declaração de direitos humanos — há 2.500 anos!",
          detalhe: "Ciro II | Cilindro de Ciro 539 a.C. | Direitos humanos pré-histórico | Persa"
        },
        {
          letra: "L",
          palavra: "Lutas-Sociais",
          emoji: "✊",
          funfato: "Cada direito que temos hoje — votar, descansar, estudar — foi conquistado por luta social!",
          detalhe: "Movimento operário | Sufrágio feminino | Direitos civis EUA | Sindicalismo"
        },
        {
          letra: "M",
          palavra: "Mesopotâmia",
          emoji: "📜",
          funfato: "A Mesopotâmia foi o berço da civilização — inventou a escrita, as leis e as cidades!",
          detalhe: "Iraque atual | Sumérios 3.500 a.C. | Cuneiforme | Código de Hamurabi"
        },
        {
          letra: "N",
          palavra: "Napoleão",
          emoji: "🇫🇷",
          funfato: "Napoleão reorganizou leis, educação e finanças de toda a Europa — e foi derrotado duas vezes!",
          detalhe: "Napoleão Bonaparte | Código Napoleônico | Waterloo 1815 | Santa Helena"
        },
        {
          letra: "O",
          palavra: "Olimpíadas-Modernas",
          emoji: "🏅",
          funfato: "Pierre de Coubertin reviveu as Olimpíadas em 1896 — proibidas por 1.500 anos!",
          detalhe: "Atenas 1896 | Coubertin | 14 países | Proibição 394 d.C. Teodósio I"
        },
        {
          letra: "P",
          palavra: "Proclamação-República",
          emoji: "🇧🇷",
          funfato: "A República brasileira foi proclamada enquanto o imperador Dom Pedro II dormia!",
          detalhe: "15 nov 1889 | Deodoro da Fonseca | Dom Pedro II exilado | Marechal"
        },
        {
          letra: "Q",
          palavra: "Quilombos",
          emoji: "✊",
          funfato: "Quilombos eram comunidades livres de escravizados — Palmares chegou a 20.000 habitantes!",
          detalhe: "Quilombo dos Palmares | Zumbi | 1605-1694 | Alagoas | Resistência negra"
        },
        {
          letra: "R",
          palavra: "Renascimento-Europeu",
          emoji: "🎨",
          funfato: "O Renascimento floresceu em Florença graças à família Médici que bancava os artistas!",
          detalhe: "Séc. XIV-XVI | Medici | Arte+Ciência+Humanismo | Florença, Veneza, Roma"
        },
        {
          letra: "S",
          palavra: "Silk-Road",
          emoji: "🐫",
          funfato: "A Rota da Seda conectou China e Europa por 1.500 anos — levando seda, especiarias e doenças!",
          detalhe: "130 a.C.-1450 | 4.000km | Marco Polo | Peste Negra viajou pela rota"
        },
        {
          letra: "T",
          palavra: "Tratado-de-Tordesilhas",
          emoji: "🌊",
          funfato: "Portugal e Espanha dividiram o mundo inteiro entre si em 1494 — sem avisar ninguém!",
          detalhe: "1494 | Papa Alexandre VI | Linha 370 léguas | Brasil: terra de Portugal"
        },
        {
          letra: "U",
          palavra: "União-Soviética",
          emoji: "⭐",
          funfato: "A URSS enviou o primeiro homem ao espaço mas durou apenas 69 anos e implodiu!",
          detalhe: "1922-1991 | Lenin → Stalin → Gorbachev | Sputnik 1957 | Perestroika | Berlim"
        },
        {
          letra: "V",
          palavra: "Vietnã-Guerra",
          emoji: "🕊️",
          funfato: "O Vietnã derrotou a maior potência militar do mundo — os Estados Unidos!",
          detalhe: "1955-1975 | EUA vs Vietcong | Queda de Saigon 1975 | 58.000 americanos mortos"
        },
        {
          letra: "W",
          palavra: "Watergate",
          emoji: "🎙️",
          funfato: "O Watergate foi o único escândalo que fez um presidente americano renunciar!",
          detalhe: "Nixon 1974 | Espionagem + encobrimento | Woodward + Bernstein | Impeachment"
        },
        {
          letra: "X",
          palavra: "Xisto",
          emoji: "🛢️",
          funfato: "A exploração do xisto (fracking) nos Estados Unidos, a partir dos anos 2000, quebrou décadas de dependência do petróleo do Oriente Médio!",
          detalhe: "Shale Revolution | Fracking: EUA anos 2000 | EUA viraram maior produtor de petróleo do mundo"
        },
        {
          letra: "Y",
          palavra: "Yalta-Conferência",
          emoji: "🌍",
          funfato: "Em Yalta, Churchill, Roosevelt e Stalin dividiram o mundo após a II Guerra — por décadas!",
          detalhe: "Fevereiro 1945 | 3 Grandes | Europa dividida | Guerra Fria pré-configurada"
        },
        {
          letra: "Z",
          palavra: "Zeitenwende",
          emoji: "🔄",
          funfato: "O historiador usa \"Zeitenwende\" (viragem de era) para momentos que mudam tudo de vez!",
          detalhe: "Termo alemão | Virada histórica | 476 d.C., 1789, 1945, 1991, 2001"
        }
      ]
    }
  },
  {
    id: "cri_alfabeto_literatura",
    tipo: "alfabeto",
    titulo: "Literatura Mundial de A a Z",
    descricao: "Um autor, obra ou conceito literário para cada letra!",
    emoji: "📚",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "A literatura tem um autor ou obra inesquecível para cada letra! 📚 Clique em 🔊 e mergulhe no universo das palavras!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Aleph",
          emoji: "🌌",
          funfato: "No conto de Borges, o Aleph é o ponto do espaço que contém todos os outros pontos!",
          detalhe: "Jorge Luis Borges | \"O Aleph\" 1945 | Primeira letra hebraica = infinitude"
        },
        {
          letra: "B",
          palavra: "Bildungsroman",
          emoji: "📖",
          funfato: "O Bildungsroman é o romance de formação — conta o crescimento de um personagem!",
          detalhe: "Goethe: \"Wilhelm Meister\" | Jane Eyre, David Copperfield, Pip (Dickens)"
        },
        {
          letra: "C",
          palavra: "Cervantes",
          emoji: "⚔️",
          funfato: "Dom Quixote é o primeiro romance moderno do mundo — escrito em 1605!",
          detalhe: "Miguel de Cervantes | Dom Quixote 1605 | Sancho Pança | Moinhos de vento"
        },
        {
          letra: "D",
          palavra: "Distopia",
          emoji: "🌑",
          funfato: "George Orwell escreveu \"1984\" em 1948 — inverteu os dois últimos algarismos do ano!",
          detalhe: "\"1984\" Orwell | Brave New World (Huxley) | Fahrenheit 451 (Bradbury)"
        },
        {
          letra: "E",
          palavra: "Epopeia",
          emoji: "⚔️",
          funfato: "A Ilíada e a Odisseia foram transmitidas oralmente por 400 anos antes de serem escritas!",
          detalhe: "Homero | Hexâmetro dactílico | Tradição oral | Camões: Lusíadas"
        },
        {
          letra: "F",
          palavra: "Faulkner",
          emoji: "📖",
          funfato: "Faulkner escrevia sobre o Sul profundo americano usando fluxo de consciência interior!",
          detalhe: "William Faulkner | \"O Som e a Fúria\" | Yoknapatawpha County | Nobel 1949"
        },
        {
          letra: "G",
          palavra: "Grande-Sertão",
          emoji: "🌵",
          funfato: "Grande Sertão: Veredas é considerado o maior romance brasileiro de todos os tempos!",
          detalhe: "João Guimarães Rosa | 1956 | \"O diabo existe?\" | Riobaldo + Diadorim"
        },
        {
          letra: "H",
          palavra: "Haiku",
          emoji: "🌸",
          funfato: "Um haiku tem apenas 17 sílabas para capturar um momento de iluminação na natureza!",
          detalhe: "Matsuo Bashô | 5-7-5 sílabas | Kigo (referência sazonal) | Wabi-sabi"
        },
        {
          letra: "I",
          palavra: "Intertextualidade",
          emoji: "📖",
          funfato: "Intertextualidade é quando um texto conversa com outro — como Shakespeare citando Ovídio!",
          detalhe: "Julia Kristeva | Todo texto dialoga com outros | Citação, paródia, influência"
        },
        {
          letra: "J",
          palavra: "Joyce",
          emoji: "📖",
          funfato: "James Joyce escreveu Ulysses num único dia na vida do personagem — mas tem 700 páginas!",
          detalhe: "James Joyce | Ulysses 1922 | Fluxo de consciência | Um dia em Dublin"
        },
        {
          letra: "K",
          palavra: "Kafka",
          emoji: "🪲",
          funfato: "Kafka pediu que queimassem todos seus livros ao morrer — seu amigo publicou mesmo assim!",
          detalhe: "Franz Kafka | \"A Metamorfose\" | Kafkiano: burocracia absurda | Max Brod"
        },
        {
          letra: "L",
          palavra: "Lygia-Fagundes",
          emoji: "🌿",
          funfato: "Lygia Fagundes Telles é uma das maiores escritoras do Brasil — indicada ao Nobel!",
          detalhe: "\"As Meninas\" | Conto fantástico | ABL | Prêmio Camões 2004"
        },
        {
          letra: "M",
          palavra: "Machado-de-Assis",
          emoji: "📖",
          funfato: "Machado de Assis começou pobre e negro no Rio e virou o maior escritor do Brasil!",
          detalhe: "Dom Casmurro | Memórias Póstumas | Realismo | ABL: fundador"
        },
        {
          letra: "N",
          palavra: "Narrador-Não-Confiável",
          emoji: "🎭",
          funfato: "O narrador não-confiável mente ou se engana — e o leitor precisa descobrir sozinho!",
          detalhe: "Agatha Christie | Gone Girl | \"The Turn of the Screw\" (James)"
        },
        {
          letra: "O",
          palavra: "Oulipo",
          emoji: "📏",
          funfato: "Perec escreveu um romance inteiro de 300 páginas sem usar a letra \"e\" — por restrição artística!",
          detalhe: "Georges Perec \"La Disparition\" | Oulipo: literatura + matemática | Calvino"
        },
        {
          letra: "P",
          palavra: "Proust",
          emoji: "🍪",
          funfato: "Proust escreveu Em Busca do Tempo Perdido em 7 volumes — o romance mais longo do mundo!",
          detalhe: "Marcel Proust | 1,5Mi palavras | Madeleine + chá = memória involuntária"
        },
        {
          letra: "Q",
          palavra: "Quincas-Berro-D'Água",
          emoji: "🍾",
          funfato: "O personagem de Jorge Amado é um marinheiro que fingiu morrer para ser livre!",
          detalhe: "Jorge Amado | \"A Morte e a Morte de Quincas Berro d'Água\" | Bahia"
        },
        {
          letra: "R",
          palavra: "Realismo-Mágico",
          emoji: "🦋",
          funfato: "No realismo mágico, eventos impossíveis acontecem como se fossem completamente normais!",
          detalhe: "García Márquez | Cem Anos de Solidão | Boom latino-americano | Macondo"
        },
        {
          letra: "S",
          palavra: "Shakespeare",
          emoji: "🎭",
          funfato: "Shakespeare criou mais de 1.700 palavras em inglês que usamos até hoje!",
          detalhe: "\"Bedroom\", \"lonely\", \"generous\" — Shakespeare inventou | 37 peças | Globe Theatre"
        },
        {
          letra: "T",
          palavra: "Tolstói",
          emoji: "⚔️",
          funfato: "Guerra e Paz de Tolstói tem 580 personagens — ele precisou de índice para não se perder!",
          detalhe: "Lev Tolstói | 580 personagens | 1.225 páginas | Napoleão + Rússia + amor"
        },
        {
          letra: "U",
          palavra: "Utopia",
          emoji: "🏝️",
          funfato: "\"Utopia\" foi inventada por Thomas More em 1516 — e significa \"lugar nenhum\" em grego!",
          detalhe: "Thomas More 1516 | \"Ou-topos\" = lugar nenhum | Ideal social | Distopia: oposto"
        },
        {
          letra: "V",
          palavra: "Virgílio",
          emoji: "🌿",
          funfato: "Virgílio escreveu a Eneida para glorificar Roma — e ainda assim o original ficou incompleto!",
          detalhe: "Eneida | Fundação de Roma | Augusto | Dante: guia na Divina Comédia"
        },
        {
          letra: "W",
          palavra: "Woolf",
          emoji: "🌊",
          funfato: "Virginia Woolf inventou o \"fluxo de consciência\" moderno — pensamentos sem filtro na página!",
          detalhe: "Mrs. Dalloway | Orlando | \"A Room of One's Own\" | Bloomsbury Group"
        },
        {
          letra: "X",
          palavra: "Xerife-de-Nottingham",
          emoji: "🏹",
          funfato: "Robin Hood é um personagem literário medieval que surgiu em baladas populares inglesas!",
          detalhe: "Baladas séc. XIV | Sherwood Forest | Roubar ricos p/ dar aos pobres | Folclore"
        },
        {
          letra: "Y",
          palavra: "Yeats",
          emoji: "🍂",
          funfato: "Yeats ganhou o Nobel e disse que a poesia é \"a linguagem dos deuses tentando falar a humanos\"!",
          detalhe: "W.B. Yeats | Nobel 1923 | Simbolismo irlandês | \"The Second Coming\""
        },
        {
          letra: "Z",
          palavra: "Zola",
          emoji: "✊",
          funfato: "Émile Zola escreveu \"J'Accuse!\" e arriscou a vida para defender um inocente injustiçado!",
          detalhe: "Émile Zola | Caso Dreyfus 1898 | Naturalismo | \"J'accuse...!\" em L'Aurore"
        }
      ]
    }
  },
  {
    id: "cri_alfabeto_matematica",
    tipo: "alfabeto",
    titulo: "Matemática de A a Z",
    descricao: "Um conceito matemático fascinante para cada letra!",
    emoji: "📐",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "A matemática tem um conceito incrível para cada letra do alfabeto! 📐 Clique em 🔊 e descubra a beleza dos números!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Álgebra",
          emoji: "🔢",
          funfato: "A álgebra foi criada por Al-Khwarizmi — e a palavra \"algoritmo\" vem do seu nome!",
          detalhe: "Al-Khwarizmi séc IX | \"Al-jabr\" | Equações | Algoritmo = latinização do nome"
        },
        {
          letra: "B",
          palavra: "Base-2",
          emoji: "💾",
          funfato: "Os computadores usam apenas 0 e 1 (base binária) para representar toda informação!",
          detalhe: "Sistema binário | Leibniz (1703) | Transistor: 0=desligado, 1=ligado"
        },
        {
          letra: "C",
          palavra: "Cálculo",
          emoji: "📈",
          funfato: "Newton e Leibniz inventaram o cálculo ao mesmo tempo, sem se conhecer — e brigaram depois!",
          detalhe: "Newton + Leibniz (1660-1670) | Derivada + Integral | Controvérsia histórica"
        },
        {
          letra: "D",
          palavra: "Derivada",
          emoji: "📉",
          funfato: "A derivada mede como algo muda em um instante — a velocidade é a derivada da posição!",
          detalhe: "Taxa de variação instantânea | f'(x) | Regra da cadeia | Otimização"
        },
        {
          letra: "E",
          palavra: "Euler",
          emoji: "✨",
          funfato: "Euler criou a fórmula mais bela da matemática: eⁱᵖⁱ + 1 = 0 — conecta 5 constantes!",
          detalhe: "Leonhard Euler | e^(iπ)+1=0 | Teoria dos grafos | 886 publicações"
        },
        {
          letra: "F",
          palavra: "Fractal",
          emoji: "🌀",
          funfato: "Fractais têm detalhes infinitos — quanto mais você dá zoom, mais padrões aparecem!",
          detalhe: "Mandelbrot 1975 | Dimensão fracionária | Costa da Grã-Bretanha | Natureza"
        },
        {
          letra: "G",
          palavra: "Geometria",
          emoji: "📐",
          funfato: "Euclides sistematizou a geometria há 2.300 anos — e ainda ensinamos o mesmo hoje!",
          detalhe: "Euclides: \"Elementos\" 300 a.C. | 465 proposições | 5 postulados | Pirâmide"
        },
        {
          letra: "H",
          palavra: "Hipótese-de-Riemann",
          emoji: "🔢",
          funfato: "A Hipótese de Riemann ainda não foi provada — e paga 1 milhão de dólares para quem provar!",
          detalhe: "Riemann 1859 | Zeros da função zeta | Distribuição de primos | Millenium Prize"
        },
        {
          letra: "I",
          palavra: "Infinito",
          emoji: "♾️",
          funfato: "Cantor provou que existem diferentes \"tamanhos\" de infinito — uns são maiores que outros!",
          detalhe: "Georg Cantor | ℵ₀, ℵ₁, ℵ₂... | Conjunto de Cantor | Diagonal de Cantor"
        },
        {
          letra: "J",
          palavra: "Juros-Compostos",
          emoji: "📈",
          funfato: "Einstein (possivelmente) chamou os juros compostos de \"a oitava maravilha do mundo\"!",
          detalhe: "A = P(1+r/n)^(nt) | Crescimento exponencial | Capitalização | Dívida pública"
        },
        {
          letra: "K",
          palavra: "Klein",
          emoji: "🔄",
          funfato: "A garrafa de Klein é uma superfície sem interior nem exterior — existe em 4 dimensões!",
          detalhe: "Felix Klein 1882 | Non-orientable | 4D projeção | Topo = fundo | Topologia"
        },
        {
          letra: "L",
          palavra: "Logaritmo",
          emoji: "🔢",
          funfato: "O logaritmo transforma multiplicação em adição — revolucionou a astronomia em 1614!",
          detalhe: "John Napier 1614 | log(a×b)=log(a)+log(b) | Escala Richter, pH, dB"
        },
        {
          letra: "M",
          palavra: "Matriz",
          emoji: "🔢",
          funfato: "Matrizes são usadas para fazer os gráficos 3D de videogames e filmes de animação!",
          detalhe: "Array m×n | Transformações lineares | GPU: multiplicação matricial | Euler"
        },
        {
          letra: "N",
          palavra: "Número-de-Euler",
          emoji: "📊",
          funfato: "O número \"e\" (2,71828...) aparece no crescimento de tudo — de bactérias a investimentos!",
          detalhe: "e = lim(1+1/n)^n | Jacob Bernoulli 1683 | e^x = sua própria derivada"
        },
        {
          letra: "O",
          palavra: "Otimização",
          emoji: "🎯",
          funfato: "A otimização usa cálculo para encontrar o melhor resultado — usada de GPS a IA!",
          detalhe: "Máximos/mínimos | Gradiente descendente | Programação linear | ML"
        },
        {
          letra: "P",
          palavra: "Pi",
          emoji: "🥧",
          funfato: "Pi (π) foi calculado com 105 trilhões de casas decimais — e nunca se repete!",
          detalhe: "π = 3,14159... | Irracional + transcendente | Arquimedes: 22/7 | Dia 14/3"
        },
        {
          letra: "Q",
          palavra: "Quaternions",
          emoji: "🔢",
          funfato: "Hamilton inventou os quaternions numa ponte em Dublin e gravou a fórmula na pedra ali mesmo!",
          detalhe: "William Hamilton 1843 | i²=j²=k²=ijk=-1 | Rotação 3D | Videogames"
        },
        {
          letra: "R",
          palavra: "Recursão",
          emoji: "🌀",
          funfato: "Recursão é quando uma função chama a si mesma — como uma boneca russa matemática!",
          detalhe: "Fibonacci: F(n)=F(n-1)+F(n-2) | Fatorial | Torres de Hanói | Fractais"
        },
        {
          letra: "S",
          palavra: "Sequência-de-Fibonacci",
          emoji: "🌀",
          funfato: "A sequência de Fibonacci aparece em espirais de conchas, girassóis e galáxias!",
          detalhe: "1,1,2,3,5,8,13... | Razão áurea φ | Fibonacci 1202 | Liber Abaci"
        },
        {
          letra: "T",
          palavra: "Teoria-dos-Grafos",
          emoji: "🕸️",
          funfato: "Euler inventou a teoria dos grafos tentando descobrir um passeio pelas 7 pontes de Königsberg!",
          detalhe: "Euler 1736 | Pontes de Königsberg | Caminho Euleriano | Redes sociais"
        },
        {
          letra: "U",
          palavra: "Unidade-Imaginária",
          emoji: "✨",
          funfato: "O número imaginário \"i\" é a raiz quadrada de -1 — parece impossível mas é real na física!",
          detalhe: "i = √(-1) | Cardano 1545 | Números complexos | Mecânica quântica"
        },
        {
          letra: "V",
          palavra: "Vetor",
          emoji: "➡️",
          funfato: "Um vetor tem magnitude E direção — e é a base da física, engenharia e gráficos 3D!",
          detalhe: "Magnitude + direção | Adição vetorial | Produto escalar + vetorial | IA"
        },
        {
          letra: "W",
          palavra: "Wavelets",
          emoji: "🌊",
          funfato: "Wavelets comprimem imagens e detectam padrões — usados no JPEG2000 e na detecção de ondas gravitacionais!",
          detalhe: "Transformada wavelet | JPEG2000 | LIGO: ondas gravitacionais"
        },
        {
          letra: "X",
          palavra: "Xadrez-Matemático",
          emoji: "♟️",
          funfato: "O número de posições possíveis no xadrez supera o número de átomos no universo!",
          detalhe: "10^120 posições (Shannon) | 10^80 átomos universo | Problema P vs NP"
        },
        {
          letra: "Y",
          palavra: "Yang-Hui",
          emoji: "📜",
          funfato: "Yang Hui organizou o \"triângulo de Pascal\" na China quase 400 anos antes de Pascal nascer!",
          detalhe: "Yang Hui séc XIII | Triângulo de Yang Hui = Triângulo de Pascal | Coeficientes binomiais"
        },
        {
          letra: "Z",
          palavra: "Zero",
          emoji: "0️⃣",
          funfato: "O zero foi a invenção matemática mais revolucionária — e demorou 2.000 anos para ser aceito!",
          detalhe: "Brahmagupta 628 d.C. | Índia → Árabe → Europa | Possibilita posição decimal"
        }
      ]
    }
  },
  {
    id: "cri_alfabeto_geopolitica",
    tipo: "alfabeto",
    titulo: "Geopolítica de A a Z",
    descricao: "Um conceito geopolítico ou conflito para cada letra!",
    emoji: "🌍",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "O mapa do poder mundial tem um conceito para cada letra! 🌍 Clique em 🔊 e entenda como o mundo é governado!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "ASEAN",
          emoji: "🌏",
          funfato: "A ASEAN une 10 países do Sudeste Asiático em paz — região que já foi cheia de guerras!",
          detalhe: "1967 | 10 membros | 650Mi hab. | 5ª maior economia | Sede em Jacarta"
        },
        {
          letra: "B",
          palavra: "BRICS",
          emoji: "🌍",
          funfato: "Os BRICS representam 40% da população e 26% do PIB mundial — um bloco em ascensão!",
          detalhe: "Brasil, Rússia, Índia, China, África do Sul | 2001 Goldman Sachs | Expansão 2024"
        },
        {
          letra: "C",
          palavra: "Cold-War",
          emoji: "❄️",
          funfato: "Na Guerra Fria nunca houve batalha direta entre EUA e URSS — mas quase foi ao nuclear!",
          detalhe: "1947-1991 | Corrida nuclear | Berlim | Cuba 1962 | 70.000 ogivas nucleares pico"
        },
        {
          letra: "D",
          palavra: "Diplomacia",
          emoji: "🕊️",
          funfato: "A palavra \"diplomacia\" vem de \"diploma\" — o documento que os enviados carregavam!",
          detalhe: "Tratados | Embaixadas | Imunidade diplomática | ONU: 193 países"
        },
        {
          letra: "E",
          palavra: "Estado",
          emoji: "🏛️",
          funfato: "Para existir, um Estado precisa de território, povo, governo E reconhecimento internacional!",
          detalhe: "Convenção de Montevidéu 1933 | 4 elementos | Soberania | Westfália 1648"
        },
        {
          letra: "F",
          palavra: "FMI",
          emoji: "💰",
          funfato: "O FMI foi criado em 1944 na mesma conferência que criou o banco mundial e o dólar global!",
          detalhe: "Bretton Woods 1944 | 190 países | Empréstimos + ajuste estrutural | SDR"
        },
        {
          letra: "G",
          palavra: "Globalização",
          emoji: "🌐",
          funfato: "A globalização conectou o mundo mas também propagou a COVID-19 em 3 meses pelo planeta!",
          detalhe: "Pós-WWII | Contêineres 1956 | Internet 1990s | Cadeias globais de valor"
        },
        {
          letra: "H",
          palavra: "Hegemonia",
          emoji: "👑",
          funfato: "Os EUA gastam mais em defesa do que os próximos 10 países somados — hegemonia militar!",
          detalhe: "Gramsci: hegemonia cultural | Hard + Soft power (Nye) | Pax Americana"
        },
        {
          letra: "I",
          palavra: "IPCC",
          emoji: "🌡️",
          funfato: "O IPCC prevê que sem ação climática, a Terra vai esquentar 3°C até 2100 — catastrófico!",
          detalhe: "ONU 1988 | 6 relatórios | 1,5°C meta Paris | 97% consenso científico"
        },
        {
          letra: "J",
          palavra: "Jurisdição",
          emoji: "⚖️",
          funfato: "O Tribunal Penal Internacional pode julgar crimes de guerra de qualquer país do mundo!",
          detalhe: "TPI: Haia 2002 | 124 países | Crime de guerra, contra humanidade, genocídio"
        },
        {
          letra: "K",
          palavra: "Kosovo",
          emoji: "🇽🇰",
          funfato: "Kosovo declarou independência em 2008 e ainda não é reconhecido pela ONU ou pela China!",
          detalhe: "2008 UDI | 110 países reconhecem | ONU: não-membro | Questão sérvia"
        },
        {
          letra: "L",
          palavra: "LGPD-Global",
          emoji: "🔐",
          funfato: "A lei de dados europeia (GDPR) multa empresas em até 4% do faturamento global — inclusive Google!",
          detalhe: "GDPR 2018 | 20Bi€ multas | Meta, Google, Amazon multadas | Brasil: LGPD"
        },
        {
          letra: "M",
          palavra: "Multipolaridade",
          emoji: "🌍",
          funfato: "O mundo está saindo da dominação americana e entrando em multipolaridade com China e outros!",
          detalhe: "Unipolar pós-1991 | Ascensão China | Rússia, Índia, UE | Novo equilíbrio"
        },
        {
          letra: "N",
          palavra: "NATO",
          emoji: "🛡️",
          funfato: "A NATO foi criada para conter a URSS mas sobreviveu ao fim da URSS e se expandiu para o leste!",
          detalhe: "1949 | 32 membros | Art. 5: ataque a um = ataque a todos | Brussels HQ"
        },
        {
          letra: "O",
          palavra: "ONU",
          emoji: "🕊️",
          funfato: "A ONU tem 193 membros mas os 5 do Conselho de Segurança têm poder de veto absoluto!",
          detalhe: "1945 | 193 membros | P5: EUA, UK, França, China, Rússia | Veto"
        },
        {
          letra: "P",
          palavra: "PALOP",
          emoji: "🌍",
          funfato: "Os 5 países africanos de língua portuguesa (PALOP) mantêm laços culturais com o Brasil!",
          detalhe: "Angola, Moçambique, CV, GB, STP | CPLP | Português como legado colonial"
        },
        {
          letra: "Q",
          palavra: "Quase-Estado",
          emoji: "❓",
          funfato: "Taiwan funciona como Estado soberano mas não pode entrar na ONU por pressão da China!",
          detalhe: "Taiwan (ROC) | China reclama soberania | 14 reconhecimentos | Limbo jurídico"
        },
        {
          letra: "R",
          palavra: "Realpolitik",
          emoji: "♟️",
          funfato: "Realpolitik é a política baseada em poder real, não em moral — inventada por Bismarck!",
          detalhe: "Otto von Bismarck | Kissinger: praticante moderno | Interesses vs princípios"
        },
        {
          letra: "S",
          palavra: "Soberania",
          emoji: "🏳️",
          funfato: "Soberania significa que nenhum país tem direito a dar ordens a outro — mas na prática...!",
          detalhe: "Westfália 1648 | Non-intervention | R2P: intervenção por responsabilidade"
        },
        {
          letra: "T",
          palavra: "Terrorismo",
          emoji: "🕊️",
          funfato: "11 de Setembro matou 3.000 pessoas e custou à América US$8 trilhões em guerras!",
          detalhe: "11/9/2001 | Al-Qaeda | Guerras Afeganistão + Iraque | 800.000+ mortos"
        },
        {
          letra: "U",
          palavra: "União-Europeia",
          emoji: "🇪🇺",
          funfato: "A UE ganhou o Nobel da Paz em 2012 — por manter paz entre países que guerreavam por séculos!",
          detalhe: "1957 Roma | 27 membros | Euro: 1999 | Nobel 2012 | Brexit: 2020"
        },
        {
          letra: "V",
          palavra: "Veto",
          emoji: "🚫",
          funfato: "O veto no Conselho de Segurança foi usado 298 vezes — bloqueando ações de paz em guerras!",
          detalhe: "P5: poder absoluto | Rússia usa mais | 1945-2024 | Reforma da ONU: debate"
        },
        {
          letra: "W",
          palavra: "WikiLeaks",
          emoji: "📡",
          funfato: "O WikiLeaks publicou 250.000 cabos diplomáticos secretos — e mudou a política mundial!",
          detalhe: "Julian Assange 2006 | 250k cables | Chelsea Manning | Liberdade de imprensa"
        },
        {
          letra: "X",
          palavra: "Xenofobia",
          emoji: "🚫",
          funfato: "A xenofobia aumentou mundialmente após crises migratórias — e é usada politicamente!",
          detalhe: "Medo/ódio ao estrangeiro | Refugiados: 100Mi+ (UNHCR 2022) | Direito ao refúgio"
        },
        {
          letra: "Y",
          palavra: "Yuan",
          emoji: "💴",
          funfato: "A China quer que o yuan seja usado no comércio mundial pra reduzir a dependência do dólar americano!",
          detalhe: "Renminbi (nome oficial) | Internacionalização desde 2009 | Desafio à hegemonia do dólar"
        },
        {
          letra: "Z",
          palavra: "Zonas-Econômicas",
          emoji: "🌊",
          funfato: "A Zona Econômica Exclusiva de 200 milhas garante a um país o direito ao petróleo e pesca do mar!",
          detalhe: "ZEE: UNCLOS 1982 | 200 milhas | Brasil: 4,5Mi km² de ZEE | Litígio"
        }
      ]
    }
  },
  {
    id: "cri_alfabeto_biologia_av",
    tipo: "alfabeto",
    titulo: "Biologia Avançada de A a Z",
    descricao: "Conceitos avançados de biologia para cada letra!",
    emoji: "🧬",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "A biologia esconde conceitos avançados para cada letra! 🧬 Clique em 🔊 e descubra os mistérios da vida!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Apoptose",
          emoji: "💀",
          funfato: "A apoptose é o suicídio celular programado — células se matam para o bem do organismo!",
          detalhe: "Morte celular programada | Brenner, Horvitz e Sulston: Nobel 2002 | Caspases"
        },
        {
          letra: "B",
          palavra: "Bioma",
          emoji: "🌿",
          funfato: "O Brasil tem 6 biomas — Amazônia, Cerrado, Mata Atlântica, Caatinga, Pantanal e Pampa!",
          detalhe: "6 biomas | Amazônia: 49% | Biota: spp por área | Temperatura + precipitação"
        },
        {
          letra: "C",
          palavra: "CRISPR",
          emoji: "✂️",
          funfato: "CRISPR é como uma tesoura molecular que corta e edita o DNA com precisão cirúrgica!",
          detalhe: "Jennifer Doudna + Emmanuelle Charpentier | Nobel 2020 | Terapia gênica"
        },
        {
          letra: "D",
          palavra: "DNA-Mitocondrial",
          emoji: "🔬",
          funfato: "O DNA mitocondrial só vem da mãe — e rastreou nossa \"Eva Mitocondrial\" há 150.000 anos!",
          detalhe: "mtDNA | Herança matrilinear | Eva Mitocondrial: África | Rebecca Cann 1987"
        },
        {
          letra: "E",
          palavra: "Epigenética",
          emoji: "🧬",
          funfato: "A epigenética prova que o estresse e a dieta dos avós podem afetar os genes dos netos!",
          detalhe: "Marcas: metilação + acetilação | Sem alterar DNA | Herança transgeracional"
        },
        {
          letra: "F",
          palavra: "Fotossíntese",
          emoji: "☀️",
          funfato: "Plantas transformam luz em açúcar, mas só de 1% a 6% da luz do sol vira energia guardada!",
          detalhe: "6CO₂+6H₂O+luz→C₆H₁₂O₆+6O₂ | Clorofila a/b | Fase clara + escura"
        },
        {
          letra: "G",
          palavra: "Genoma",
          emoji: "🧬",
          funfato: "O genoma humano tem 3,2 bilhões de pares de bases — mas 98% era chamado de \"DNA lixo\"!",
          detalhe: "3,2Gb | 20.000-25.000 genes | Projeto Genoma: 2003 | Encode: DNA lixo = funcional"
        },
        {
          letra: "H",
          palavra: "Homeostase",
          emoji: "⚖️",
          funfato: "Seu corpo mantém 37°C mesmo se a temperatura ambiente variar 40°C — isso é homeostase!",
          detalhe: "Claude Bernard | Feedback negativo | pH, temperatura, glicose, pressão"
        },
        {
          letra: "I",
          palavra: "Imunidade-Adquirida",
          emoji: "💉",
          funfato: "Seu sistema imune \"memoriza\" patógenos — e é mais rápido da segunda vez!",
          detalhe: "Linfócitos B + T | Células de memória | Anticorpos | Vacinação = treino"
        },
        {
          letra: "J",
          palavra: "Junk-DNA",
          emoji: "🧬",
          funfato: "O \"DNA lixo\" que não codifica proteínas regula quando os genes são ligados e desligados!",
          detalhe: "Projeto ENCODE 2012 | 80% \"lixo\" tem função regulatória | Introns, retrotransposons"
        },
        {
          letra: "K",
          palavra: "Krebs-Ciclo",
          emoji: "⚡",
          funfato: "O Ciclo de Krebs é uma roda metabólica que gera a energia de todas as células vivas!",
          detalhe: "Hans Krebs 1937 | Nobel 1953 | Acetil-CoA → CO₂ + NADH | 8 reações"
        },
        {
          letra: "L",
          palavra: "Lipídios",
          emoji: "💧",
          funfato: "A membrana celular é feita de lipídios — uma barreira perfeitamente seletiva!",
          detalhe: "Fosfolipídio bicamada | Cabeça hidrofílica + cauda hidrofóbica | Fluidez"
        },
        {
          letra: "M",
          palavra: "Meiose",
          emoji: "🔬",
          funfato: "A meiose cria células com metade dos cromossomos — para que filhos sejam únicos!",
          detalhe: "Divisão reducional | 46→23 cromossomos | Crossing-over: diversidade genética"
        },
        {
          letra: "N",
          palavra: "Nicho-Ecológico",
          emoji: "🦔",
          funfato: "O nicho é o \"papel\" do organismo no ecossistema — não apenas onde vive, mas o que faz!",
          detalhe: "Nicho de Hutchinson | Nicho fundamental vs realizado | Competição de Gause"
        },
        {
          letra: "O",
          palavra: "Organela",
          emoji: "🔬",
          funfato: "As mitocôndrias têm seu próprio DNA — eram bactérias que foram \"engolidas\" há 2Ga!",
          detalhe: "Teoria endossimbiótica | Lynn Margulis 1967 | Mitocôndria + Cloroplasto"
        },
        {
          letra: "P",
          palavra: "Proteína",
          emoji: "🔩",
          funfato: "Uma proteína dobra em sua forma final em milissegundos — AlphaFold previu estruturas em 2021!",
          detalhe: "Sequência → estrutura (Anfinsen) | DeepMind AlphaFold: 200Mi proteínas"
        },
        {
          letra: "Q",
          palavra: "Quimiossíntese",
          emoji: "🌋",
          funfato: "Bactérias de vulcões submarinos sintetizam energia sem luz — como uma fotossíntese química!",
          detalhe: "H₂S oxidação → energia | Tubeworms | Fontes hidrotermais | 2.500m | Vent"
        },
        {
          letra: "R",
          palavra: "RNA-Interferência",
          emoji: "🧬",
          funfato: "O RNA interferente pode silenciar genes específicos — revolução na medicina 2006!",
          detalhe: "Fire + Mello Nobel 2006 | siRNA, miRNA | DICER | Gene silencing terapêutico"
        },
        {
          letra: "S",
          palavra: "Seleção-Natural",
          emoji: "🦕",
          funfato: "Darwin observou 13 espécies de tentilhões nas Galápagos e entendeu a evolução!",
          detalhe: "Darwin 1859 | Variação + Hereditariedade + Seleção | Fitness = sobrevivência"
        },
        {
          letra: "T",
          palavra: "Telômero",
          emoji: "⏳",
          funfato: "Telômeros são as tampas protetoras dos cromossomos — quando encurtam, envelhecemos!",
          detalhe: "Blackburn, Greider e Szostak: Nobel 2009 | Telomerase | Envelhecimento"
        },
        {
          letra: "U",
          palavra: "Ubiquitina",
          emoji: "🔖",
          funfato: "Ubiquitina é a \"etiqueta de reciclagem\" da célula — marca proteínas para destruição!",
          detalhe: "76 aminoácidos | Nobel 2004 | Ubiquitin-proteasome system | Degradação"
        },
        {
          letra: "V",
          palavra: "Vírus",
          emoji: "🦠",
          funfato: "Vírus são menores que bactérias e discutimos até hoje se são \"seres vivos\" ou não!",
          detalhe: "Não-celular | 20-300nm | Obrigatoriamente parasita intracelular | 10^31 no Planeta"
        },
        {
          letra: "W",
          palavra: "Watson-Crick",
          emoji: "🧬",
          funfato: "Watson e Crick descobriram a estrutura do DNA em 1953 — com ajuda crucial de Rosalind Franklin!",
          detalhe: "Dupla hélice | Rosalind Franklin: raio-X | Nobel 1962 (sem Franklin) | AT-GC"
        },
        {
          letra: "X",
          palavra: "Xenotransplante",
          emoji: "🐷",
          funfato: "Cientistas transplantaram um rim de porco editado geneticamente em humano em 2021!",
          detalhe: "Porco transgênico | CRISPR: remove vírus porcinos | Alabama 2021 | Fila de espera"
        },
        {
          letra: "Y",
          palavra: "Cromossomo-Y",
          emoji: "🔬",
          funfato: "O cromossomo Y está encolhendo há milhões de anos — teoricamente pode desaparecer!",
          detalhe: "SRY gene | 200-300 genes (vs X: 1.000) | Perda de genes ao longo da evolução"
        },
        {
          letra: "Z",
          palavra: "Zoonose-Emergente",
          emoji: "🦇",
          funfato: "A COVID-19, ebola, HIV e gripe espanhola foram todas zoonoses — doenças de animais!",
          detalhe: "Spillover | 60-75% doenças emergentes | Morcego: coronavírus | Desflorestamento"
        }
      ]
    }
  },
  {
    id: "cri_alfabeto_psicologia",
    tipo: "alfabeto",
    titulo: "Psicologia de A a Z",
    descricao: "Um conceito psicológico para cada letra do alfabeto!",
    emoji: "🧠",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "A psicologia estuda a mente e o comportamento — e tem um conceito para cada letra! 🧠 Clique em 🔊 e conheça você mesmo!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Aprendizagem",
          emoji: "📚",
          funfato: "Pavlov descobriu o aprendizado condicionado fazendo cachorros salivar com o som de uma campainha!",
          detalhe: "Pavlov: condicionamento clássico | Skinner: operante | Bandura: observacional"
        },
        {
          letra: "B",
          palavra: "Behaviorismo",
          emoji: "🔔",
          funfato: "O behaviorismo dizia que o comportamento é tudo — pensamentos internos eram irrelevantes!",
          detalhe: "Watson 1913 | Skinner: reforço/punição | \"Black box\" da mente | Estímulo-resposta"
        },
        {
          letra: "C",
          palavra: "Cognição",
          emoji: "💡",
          funfato: "Piaget observou que crianças constroem o conhecimento ativas — não recebem passivamente!",
          detalhe: "Piaget: 4 estágios | Esquemas | Assimilação + Acomodação | Desenvolvimento"
        },
        {
          letra: "D",
          palavra: "Déficit-de-Atenção",
          emoji: "🎯",
          funfato: "O TDAH afeta 5-7% das crianças e até 3% dos adultos — é neurológico, não falta de força de vontade!",
          detalhe: "DSM-5 | Dopamina/norepinefrina | Desatento, hiperativo-impulsivo, combinado"
        },
        {
          letra: "E",
          palavra: "Emoções",
          emoji: "💕",
          funfato: "Paul Ekman identificou 7 emoções universais em todas as culturas — incluindo tribos isoladas!",
          detalhe: "Ekman: felicidade, tristeza, raiva, medo, surpresa, nojo, desprezo | Microexpressões"
        },
        {
          letra: "F",
          palavra: "Freud",
          emoji: "🛋️",
          funfato: "Freud disse que o inconsciente é como um iceberg — a parte consciente é apenas a ponta!",
          detalhe: "Id + Ego + Superego | Inconsciente | Sonhos | Mecanismos de defesa | Psicanálise"
        },
        {
          letra: "G",
          palavra: "Gestalt",
          emoji: "🔵",
          funfato: "Gestalt descobriu que percebemos o todo antes das partes — \"o todo é mais que a soma\"!",
          detalhe: "Max Wertheimer | Proximidade, similaridade, continuidade | Figura-fundo"
        },
        {
          letra: "H",
          palavra: "Hierarquia-de-Maslow",
          emoji: "🔺",
          funfato: "Maslow disse que só buscamos propósito quando necessidades básicas estão satisfeitas!",
          detalhe: "Pirâmide: fisiológico→segurança→amor→estima→autorrealização | 1943"
        },
        {
          letra: "I",
          palavra: "Inteligência",
          emoji: "🧩",
          funfato: "Gardner propôs 9 tipos de inteligência — inclusive musical e corporal cinestésica!",
          detalhe: "Howard Gardner: múltiplas inteligências | IQ de Binet 1905 | g de Spearman"
        },
        {
          letra: "J",
          palavra: "Jung",
          emoji: "☯️",
          funfato: "Jung criou o conceito de introvertido/extrovertido — e o inconsciente coletivo!",
          detalhe: "Carl Jung | Arquétipos | Persona | Sombra | Introversão/Extroversão | MBTI"
        },
        {
          letra: "K",
          palavra: "Kahneman",
          emoji: "🧠",
          funfato: "Kahneman provou que humanos são irracionais de forma previsível — e ganhou o Nobel!",
          detalhe: "Daniel Kahneman | Nobel 2002 | Sistema 1 + 2 | Heurísticas | Vieses cognitivos"
        },
        {
          letra: "L",
          palavra: "Locus-de-Controle",
          emoji: "🎮",
          funfato: "Pessoas com locus interno acreditam que controlam a vida; externo, que a vida controla elas!",
          detalhe: "Julian Rotter 1954 | Interno: responsabilidade | Externo: acaso/outros"
        },
        {
          letra: "M",
          palavra: "Memória",
          emoji: "💾",
          funfato: "A memória não é como um vídeo — você a recria cada vez que lembra, e pode estar errada!",
          detalhe: "Encoding+Storage+Retrieval | Elizabeth Loftus: memórias falsas | Hipocampo"
        },
        {
          letra: "N",
          palavra: "Neuroplasticidade",
          emoji: "🧠",
          funfato: "Estudar, tocar instrumento e meditar literalmente mudam a estrutura física do cérebro!",
          detalhe: "Sinaptogênese | LTP/LTD | Hebb: \"Neurônios que disparam juntos se conectam\""
        },
        {
          letra: "O",
          palavra: "Obediência",
          emoji: "⚡",
          funfato: "Milgram provou que 65% das pessoas dariam choques elétricos em obediência a uma autoridade!",
          detalhe: "Stanley Milgram 1963 | Autoridade vs consciência | Obediência destrutiva"
        },
        {
          letra: "P",
          palavra: "Psicodrama",
          emoji: "🎭",
          funfato: "Jacob Moreno criou o psicodrama — terapia onde se encena situações para curar traumas!",
          detalhe: "Jacob Levy Moreno 1921 | Role-playing terapêutico | Protagonist + Diretor"
        },
        {
          letra: "Q",
          palavra: "QI",
          emoji: "📊",
          funfato: "O QI médio da população subiu cerca de 3 pontos por década ao longo do século — Efeito Flynn!",
          detalhe: "Binet-Simon 1905 | QI=IM/IC×100 | Efeito Flynn | Genética vs ambiente"
        },
        {
          letra: "R",
          palavra: "Resiliência",
          emoji: "🌿",
          funfato: "Resiliência não é ausência de dor — é a capacidade de crescer através da adversidade!",
          detalhe: "Emmy Werner 1955 | Fatores protetivos | Trauma + crescimento pós-traumático"
        },
        {
          letra: "S",
          palavra: "Schema-Terapia",
          emoji: "🔷",
          funfato: "Esquemas são padrões de pensamento da infância que governam como nos relacionamos!",
          detalhe: "Jeffrey Young | 18 esquemas mal-adaptativos | TCC + psicodinâmica + apego"
        },
        {
          letra: "T",
          palavra: "TEPT",
          emoji: "⚡",
          funfato: "O trauma fisicamente altera o hipocampo e a amígdala — é uma ferida no cérebro!",
          detalhe: "PTSD | Bessel van der Kolk | \"The Body Keeps the Score\" | EMDR | Flashback"
        },
        {
          letra: "U",
          palavra: "Unconscious",
          emoji: "🌊",
          funfato: "95% das nossas decisões são tomadas no inconsciente antes de chegarmos à consciência!",
          detalhe: "Libet 1983 | Readiness potential | Pré-consciente | Inconsciente cognitivo"
        },
        {
          letra: "V",
          palavra: "Vygotsky",
          emoji: "📚",
          funfato: "Vygotsky disse que aprendemos mais no limite do que já sabemos — a Zona de Desenvolvimento Proximal!",
          detalhe: "ZDP | Scaffolding | Aprendizagem social | Mediação simbólica | Linguagem"
        },
        {
          letra: "W",
          palavra: "Well-being",
          emoji: "😊",
          funfato: "Psicologia Positiva de Seligman propôs que bem-estar tem 5 elementos — PERMA!",
          detalhe: "PERMA: Positive emotion, Engagement, Relations, Meaning, Achievement"
        },
        {
          letra: "X",
          palavra: "Xenofilia-Psicologia",
          emoji: "🤝",
          funfato: "A \"hipótese do contato\" de Allport mostra que conviver com diferentes reduz preconceito!",
          detalhe: "Gordon Allport 1954 | Contato intergrupal | Condições: igualdade + cooperação"
        },
        {
          letra: "Y",
          palavra: "Yerkes-Dodson",
          emoji: "📈",
          funfato: "A lei de Yerkes-Dodson diz que um pouco de estresse melhora o desempenho — mas muito paralisa!",
          detalhe: "Lei de Yerkes-Dodson 1908 | Curva U invertida | Arousal ótimo | Ansiedade"
        },
        {
          letra: "Z",
          palavra: "Zona-de-Conforto",
          emoji: "🔄",
          funfato: "A zona de conforto é necessária para recuperar energia — o problema é nunca sair dela!",
          detalhe: "Straining zone vs Zone of proximal development | Aprendizagem requer risco"
        }
      ]
    }
  }
]

// ── Fase 1 — quiz, memória, sequência ──
export const atividadesExtraPorFaixa = [
  {
    id: "cri_quiz_historia",
    tipo: "quiz",
    titulo: "História do Brasil",
    descricao: "Explore os fatos marcantes da história brasileira!",
    emoji: "🏛️",
    habilidade: "Conhecimento Histórico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "O Museu Nacional está contratando guias mirins! 🏛️ A prova de seleção é sobre a história do Brasil. Você se candidatou e chegou à fase final. Mostre seu conhecimento!",
    perguntas: [
      {
        pergunta: "Quem foi Tiradentes?",
        opcoes: [
          "Um pintor famoso",
          "Líder da Inconfidência Mineira",
          "O primeiro rei do Brasil",
          "O descobridor do Brasil"
        ],
        correta: 1,
        fato: "🗡️ Tiradentes (Joaquim José da Silva Xavier, 1746-1792) era dentista e liderou a Inconfidência Mineira em 1789 — o 1º movimento de independência do Brasil. Executado em 21 de abril, hoje é feriado nacional."
      },
      {
        pergunta: "Em que ano o Brasil virou república?",
        opcoes: ["1822", "1888", "1889", "1900"],
        correta: 2,
        fato: "🇧🇷 A República foi proclamada em 15 de novembro de 1889 pelo Marechal Deodoro da Fonseca. O Brasil teve o Império mais duradouro das Américas — 67 anos (1822-1889)!"
      },
      {
        pergunta: "O que foi a Lei Áurea (1888)?",
        opcoes: [
          "Criou o Exército Brasileiro",
          "Construiu Brasília",
          "Aboliu a escravidão no Brasil",
          "Criou a República"
        ],
        correta: 2,
        fato: "✊ Assinada pela Princesa Isabel em 13 de maio de 1888, a Lei Áurea aboliu a escravidão. O Brasil foi o último país do Ocidente a abolir. Cerca de 4 milhões de africanos foram escravizados aqui ao longo de 300 anos."
      },
      {
        pergunta: "Quem foi Oswaldo Cruz?",
        opcoes: [
          "Presidente do Brasil",
          "Médico que combateu epidemias no Brasil",
          "General da República",
          "Engenheiro de Brasília"
        ],
        correta: 1,
        fato: "🔬 Oswaldo Cruz (1872-1917) eliminou a febre amarela do Rio de Janeiro e combateu varíola e peste bubônica. A Fiocruz, maior centro de pesquisa médica do Brasil, leva seu nome."
      },
      {
        pergunta: "O que foi a Semana de Arte Moderna de 1922?",
        opcoes: [
          "Festival de música sertaneja",
          "Movimento que renovou a arte e cultura brasileira",
          "Exposição de arte europeia",
          "Campeonato de pintores"
        ],
        correta: 1,
        fato: "🎨 A Semana de 1922 (São Paulo) reuniu artistas que queriam criar uma identidade cultural 100% brasileira. Participaram Anita Malfatti, Mário e Oswald de Andrade. Transformou literatura, música e artes visuais."
      }
    ]
  },
  {
    id: "cri_quiz_ciencias2",
    tipo: "quiz",
    titulo: "Ciências Avançadas",
    descricao: "Mergulhe nos segredos da ciência!",
    emoji: "🧬",
    habilidade: "Pensamento Científico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "A olimpíada de ciências está chegando! 🧬 Você foi selecionado para representar sua escola. Estude esses conceitos e mostre que a ciência é sua paixão!",
    perguntas: [
      {
        pergunta: "Qual é a função dos glóbulos vermelhos no sangue?",
        opcoes: ["Combater doenças", "Transportar oxigênio", "Coagular o sangue", "Produzir hormônios"],
        correta: 1,
        fato: "🩸 Os glóbulos vermelhos (hemácias) são tão pequenos que cabem uns 140 lado a lado em 1 mm! Uma gota de sangue tem 250 milhões deles. Sem ferro (hemoglobina), não conseguem carregar O₂ — causando anemia."
      },
      {
        pergunta: "O que são placas tectônicas?",
        opcoes: [
          "Camadas de nuvens",
          "Partes da crosta terrestre que se movem",
          "Tipos de minerais",
          "Correntes marítimas"
        ],
        correta: 1,
        fato: "🌍 A Terra tem ~15 grandes placas tectônicas que se movem 2-10 cm por ano — na velocidade que as unhas crescem! Quando se chocam, causam terremotos e formam montanhas. A Serra do Mar foi formada assim!"
      },
      {
        pergunta: "Quanto tempo a luz do Sol leva para chegar à Terra?",
        opcoes: ["1 segundo", "8 minutos", "1 hora", "1 dia"],
        correta: 1,
        fato: "☀️ Luz viaja a 300.000 km/s, mas o Sol fica a 150 milhões de km. 150.000.000 ÷ 300.000 = 500 segundos ≈ 8 minutos. Se o Sol \"apagasse\", só saberíamos 8 minutos depois!"
      },
      {
        pergunta: "O que é o DNA?",
        opcoes: [
          "Uma vitamina",
          "A molécula que guarda as instruções genéticas",
          "Um osso do crânio",
          "Um tipo de proteína muscular"
        ],
        correta: 1,
        fato: "🧬 Se você estendesse todo o DNA de uma única célula do seu corpo, teria 2 metros! Nosso DNA tem 3 bilhões de \"letras\" e 99,9% é idêntico entre quaisquer dois humanos — 0,1% é o que nos torna únicos."
      },
      {
        pergunta: "Por que o céu é azul?",
        opcoes: [
          "Porque o mar é azul",
          "Por causa da chuva",
          "A atmosfera dispersa mais a luz azul do sol",
          "Porque é frio no espaço"
        ],
        correta: 2,
        fato: "🌌 A luz branca do Sol contém todas as cores. A atmosfera dispersa mais a luz azul que as outras cores. Ao pôr do sol, a luz percorre mais atmosfera e só as cores vermelha e laranja chegam aos nossos olhos."
      }
    ]
  },
  {
    id: "cri_quiz_geografia",
    tipo: "quiz",
    titulo: "Geografia Mundial",
    descricao: "Explore o planeta de ponta a ponta!",
    emoji: "🌎",
    habilidade: "Conhecimento Geográfico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "O concurso \"Pequeno Explorador\" selecionará o jovem que mais conhece o planeta! 🌎 Você chegou à grande final. Responda as perguntas e ganhe a passagem para qualquer destino do mundo!",
    perguntas: [
      {
        pergunta: "Qual é o maior oceano do mundo?",
        opcoes: ["Atlântico", "Ártico", "Índico", "Pacífico"],
        correta: 3,
        fato: "🌊 O Pacífico ocupa 165 milhões km² — maior que todos os continentes juntos! A Fossa das Marianas (11 km de profundidade) fica aqui. O Everest colocado dentro ainda ficaria 2 km submerso."
      },
      {
        pergunta: "Em qual continente fica o Rio Nilo?",
        opcoes: ["América do Sul", "Ásia", "África", "Europa"],
        correta: 2,
        fato: "🌍 O Nilo (6.650 km) é um dos maiores rios do mundo. A civilização egípcia de 5.000 anos só existiu por causa das cheias anuais do Nilo que fertilizavam as terras áridas do deserto."
      },
      {
        pergunta: "Qual língua tem mais falantes nativos no mundo?",
        opcoes: ["Inglês", "Espanhol", "Mandarim", "Português"],
        correta: 2,
        fato: "🌏 O mandarim tem 1,1 bilhão de falantes nativos! O português é falado por 260 milhões de pessoas em 9 países — é a 6ª língua mais falada. O inglês domina como 2ª língua (1,5 bi de falantes no total)."
      },
      {
        pergunta: "Onde fica o Monte Everest?",
        opcoes: ["América do Sul", "África", "Europa", "Ásia"],
        correta: 3,
        fato: "🏔️ O Everest (8.849 m) fica na fronteira Nepal-China. Em nepalês: \"Sagarmatha\" (deusa do céu). Escalado pela 1ª vez em 1953 por Hillary e Norgay. Hoje, mais de 300 pessoas chegam ao cume por ano!"
      },
      {
        pergunta: "Qual país tem a maior população do mundo em 2024?",
        opcoes: ["China", "EUA", "Índia", "Brasil"],
        correta: 2,
        fato: "🌍 Em 2023, a Índia ultrapassou a China com 1,44 bilhão de habitantes! O Brasil tem 215 milhões (7º mais populoso). A ONU projeta que a população mundial chegará a 10 bilhões por volta de 2058."
      }
    ]
  },
  {
    id: "cri_memoria_inventores_2",
    tipo: "memoria",
    titulo: "Inventores e Invenções",
    descricao: "Combine cada inventor com sua invenção!",
    emoji: "💡",
    habilidade: "Memória",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "O Museu da Ciência está montando uma exposição sobre grandes inventores! 💡 Mas as etiquetas se misturaram. Combine cada inventor com sua invenção para abrir o museu a tempo!",
    pares: [
      {
        emoji: "💡",
        nome: "Edison — Lâmpada elétrica",
        info: "Thomas Edison testou mais de 1.000 materiais antes de acertar!"
      },
      {
        emoji: "📞",
        nome: "Bell — Telefone",
        info: "A 1ª chamada em 1876: \"Sr. Watson, venha cá, preciso de você!\""
      },
      {
        emoji: "✈️",
        nome: "Irmãos Wright — Avião",
        info: "O 1º voo motorizado durou 12 segundos em 1903"
      },
      {
        emoji: "⚡",
        nome: "Tesla — Corrente alternada",
        info: "Nikola Tesla criou o sistema elétrico que usamos em nossas casas hoje"
      },
      {
        emoji: "🌐",
        nome: "Berners-Lee — Internet (WWW)",
        info: "Tim Berners-Lee criou a World Wide Web em 1989"
      },
      {
        emoji: "🧬",
        nome: "Watson & Crick — Estrutura do DNA",
        info: "Descoberta em 1953, com contribuição essencial de Rosalind Franklin"
      },
      {
        emoji: "🔭",
        nome: "Galileu — Telescópio astronômico",
        info: "Galileu melhorou o telescópio e descobriu as luas de Júpiter em 1610"
      },
      {
        emoji: "🍎",
        nome: "Newton — Gravitação Universal",
        info: "A maçã inspirou Newton a explicar por que a Lua não cai na Terra!"
      }
    ]
  },
  {
    id: "cri_memoria_elementos",
    tipo: "memoria",
    titulo: "Elementos Químicos",
    descricao: "Combine os símbolos com os elementos!",
    emoji: "⚗️",
    habilidade: "Memória",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "O laboratório de química precisa de um assistente que conheça os elementos! ⚗️ O professor Mendeleev (da tabela periódica) criou esse desafio especial para você.",
    pares: [
      {
        emoji: "💧",
        nome: "H₂O — Água",
        info: "Hidrogênio + Oxigênio: a molécula essencial para toda vida"
      },
      {
        emoji: "🔋",
        nome: "Li — Lítio",
        info: "Metal mais leve — usado em baterias de celulares e carros elétricos"
      },
      {
        emoji: "💎",
        nome: "C — Carbono",
        info: "Base da vida! Diamante puro é carbono cristalizado"
      },
      {
        emoji: "🌬️",
        nome: "O₂ — Oxigênio",
        info: "Elemento mais abundante da crosta terrestre (46%)"
      },
      {
        emoji: "⚡",
        nome: "Fe — Ferro",
        info: "O núcleo da Terra é de ferro! A hemoglobina do sangue também"
      },
      {
        emoji: "🌡️",
        nome: "Hg — Mercúrio",
        info: "Único metal líquido à temperatura ambiente — muito tóxico!"
      },
      {
        emoji: "☢️",
        nome: "U — Urânio",
        info: "Usado em reatores nucleares; decai radioativamente por bilhões de anos"
      },
      {
        emoji: "🥇",
        nome: "Au — Ouro",
        info: "\"Au\" vem do latim \"Aurum\". Inoxidável e excelente condutor elétrico"
      }
    ]
  },
  {
    id: "cri_memoria_biomas",
    tipo: "memoria",
    titulo: "Biomas Brasileiros",
    descricao: "Combine cada bioma com sua característica!",
    emoji: "🌳",
    habilidade: "Memória",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "O IBGE está fazendo um mapa ecológico do Brasil! 🌳 Você foi contratado como consultor mirim. Combine cada bioma com sua principal característica.",
    pares: [
      {
        emoji: "🌳",
        nome: "Amazônia",
        info: "Maior floresta tropical do mundo — 40% do território do Brasil"
      },
      {
        emoji: "🌾",
        nome: "Cerrado",
        info: "Savana mais biodiversa do mundo — \"berço das águas\" do Brasil"
      },
      {
        emoji: "🌵",
        nome: "Caatinga",
        info: "Único bioma 100% exclusivo do Brasil — semiárido nordestino"
      },
      {
        emoji: "🏞️",
        nome: "Pantanal",
        info: "Maior área úmida tropical do mundo — 10 milhões de jacarés!"
      },
      {
        emoji: "🌿",
        nome: "Mata Atlântica",
        info: "Hotspot de biodiversidade — restam apenas 12% da área original"
      },
      {
        emoji: "🐄",
        nome: "Pampa",
        info: "Campos gaúchos compartilhados com Argentina e Uruguai"
      },
      {
        emoji: "🐠",
        nome: "Zona Costeira",
        info: "7.491 km de litoral com recifes de coral e manguezais únicos"
      },
      {
        emoji: "🦜",
        nome: "Megadiversidade",
        info: "O Brasil tem 15-20% de todas as espécies do planeta!"
      }
    ]
  },
  {
    id: "cri_seq_progressoes",
    tipo: "sequencia",
    titulo: "Progressões Matemáticas",
    descricao: "Quadrados, cubos e Fibonacci!",
    emoji: "📈",
    habilidade: "Lógica Matemática",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "O professor de matemática lançou um desafio para a turma toda: quem resolver todas as progressões ganha zero de lição de casa por uma semana! 📈 Você aceita?",
    contexto_matematico: "A sequência de Fibonacci (1,1,2,3,5,8,13...) aparece na natureza: pétalas de flores, espirais de conchas, ramificações de árvores. Os quadrados perfeitos (1,4,9,16,25...) são a base da geometria!",
    sequencias: [
      {
        items: ["1", "4", "9", "16", "25", "❓"],
        resposta: "36",
        opcoes: ["30", "33", "35", "36"]
      },
      {
        items: ["2", "6", "18", "54", "❓"],
        resposta: "162",
        opcoes: ["108", "162", "216", "270"]
      },
      {
        items: ["1", "2", "4", "7", "11", "❓"],
        resposta: "16",
        opcoes: ["14", "15", "16", "18"]
      },
      {
        items: ["2", "3", "5", "8", "13", "❓"],
        resposta: "21",
        opcoes: ["18", "19", "21", "24"]
      },
      {
        items: ["1", "8", "27", "64", "❓"],
        resposta: "125",
        opcoes: ["100", "120", "125", "216"]
      }
    ]
  },
  {
    id: "cri_seq_fracoes",
    tipo: "sequencia",
    titulo: "Frações e Padrões",
    descricao: "Sequências com frações e porcentagens!",
    emoji: "½",
    habilidade: "Lógica Matemática",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "A pizzaria do Sr. Pizza está cortando as pizzas em fatias cada vez menores! ½ Descubra o padrão das frações antes que sobre apenas migalha para você!",
    contexto_matematico: "Frações representam partes de um todo. A sequência 1/2, 1/4, 1/8... dobra o denominador a cada passo. Em computação, essa sequência aparece na análise de algoritmos!",
    sequencias: [
      {
        items: ["1/2", "1/4", "1/8", "1/16", "❓"],
        resposta: "1/32",
        opcoes: ["1/24", "1/28", "1/32", "1/64"]
      },
      {
        items: ["25%", "50%", "75%", "100%", "❓"],
        resposta: "125%",
        opcoes: ["110%", "120%", "125%", "150%"]
      },
      {
        items: ["0,1", "0,2", "0,4", "0,8", "❓"],
        resposta: "1,6",
        opcoes: ["1,2", "1,4", "1,6", "2,0"]
      },
      {
        items: ["10%", "20%", "40%", "80%", "❓"],
        resposta: "160%",
        opcoes: ["120%", "140%", "160%", "200%"]
      },
      {
        items: ["3", "3/2", "3/4", "3/8", "❓"],
        resposta: "3/16",
        opcoes: ["3/12", "3/16", "3/20", "1/8"]
      }
    ]
  },
  {
    id: "cri_seq_mistas",
    tipo: "sequencia",
    titulo: "Sequências do Mundo Real",
    descricao: "Padrões que aparecem no cotidiano!",
    emoji: "🧩",
    habilidade: "Raciocínio Lógico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "Padrões estão em todo lugar: no calendário, nos números romanos, na química e na computação! 🧩 O detetive lógico procura esses padrões escondidos. Você consegue encontrá-los?",
    sequencias: [
      {
        items: ["Jan", "Mar", "Mai", "Jul", "❓"],
        resposta: "Set",
        opcoes: ["Ago", "Set", "Out", "Nov"]
      },
      {
        items: ["I", "V", "X", "L", "❓"],
        resposta: "C",
        opcoes: ["C", "D", "M", "X"]
      },
      {
        items: ["H₂", "He", "Li", "Be", "❓"],
        resposta: "B",
        opcoes: ["B", "C", "N", "O"]
      },
      {
        items: ["byte", "KB", "MB", "GB", "❓"],
        resposta: "TB",
        opcoes: ["PB", "TB", "EB", "ZB"]
      },
      {
        items: ["2²", "2³", "2⁴", "2⁵", "❓"],
        resposta: "2⁶",
        opcoes: ["2⁵", "2⁶", "2⁷", "64"]
      }
    ]
  },
  {
    id: "cri_formas_geometricas",
    tipo: "formas",
    titulo: "Formas Geométricas",
    descricao: "Revisão de formas — do círculo ao hexágono!",
    emoji: "🔷",
    habilidade: "Raciocínio Espacial",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "Arquitetos, designers e engenheiros usam formas geométricas o tempo todo! 🔷 Um hexágono é a forma mais eficiente da natureza — usada nas colmeias de abelhas. Explore cada forma clicando em 🔊!"
  },
  {
    id: "cri_cores",
    tipo: "cores",
    titulo: "As Cores",
    descricao: "Teoria das cores — primárias, secundárias e complementares!",
    emoji: "🌈",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "Designers e artistas estudam a teoria das cores! 🌈 Cores complementares ficam opostas no círculo cromático: vermelho e verde, azul e laranja. Ouça e explore cada cor!"
  },
  {
    id: "cri_alfabeto",
    tipo: "alfabeto",
    titulo: "O Alfabeto",
    descricao: "As 26 letras e seus sons no português brasileiro!",
    emoji: "🔤",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 15,
    historinha: "O alfabeto latino tem 26 letras e é usado em mais de 100 idiomas! 🔤 Em português, algumas letras têm sons diferentes dependendo da posição na palavra. Clique em 🔊 e revise cada uma!"
  }
]

// ── Colorir ──
export const colorirExtraPorFaixa = [
  {
    id: "cri_colorir_robo",
    tipo: "colorir",
    titulo: "Colorir: Robô",
    descricao: "Pinte o robô com botões e antena!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 9,
    historinha: "Esse robô acabou de sair da fábrica e ainda está sem nenhuma cor! 🤖 Escolha as cores e pinte cada peça dele.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Robô",
        regioes: [
          {
            id: "braco_esquerdo",
            tipo: "rect",
            props: {
              x: 48,
              y: 136,
              width: 42,
              height: 30,
              rx: 12
            }
          },
          {
            id: "braco_direito",
            tipo: "rect",
            props: {
              x: 210,
              y: 136,
              width: 42,
              height: 30,
              rx: 12
            }
          },
          {
            id: "perna_esquerda",
            tipo: "rect",
            props: {
              x: 102,
              y: 222,
              width: 32,
              height: 48,
              rx: 8
            }
          },
          {
            id: "perna_direita",
            tipo: "rect",
            props: {
              x: 166,
              y: 222,
              width: 32,
              height: 48,
              rx: 8
            }
          },
          {
            id: "corpo",
            tipo: "rect",
            props: {
              x: 90,
              y: 130,
              width: 120,
              height: 90,
              rx: 14
            }
          },
          {
            id: "cabeca",
            tipo: "rect",
            props: {
              x: 110,
              y: 60,
              width: 80,
              height: 60,
              rx: 10
            }
          },
          {
            id: "antena",
            tipo: "rect",
            decorativo: true,
            props: {
              x: 146,
              y: 34,
              width: 8,
              height: 26,
              rx: 4
            }
          },
          {
            id: "antena_bola",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 150,
              cy: 30,
              r: 9
            },
            cor: "#F87171"
          },
          {
            id: "olho_esquerdo",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 132,
              cy: 90,
              r: 11
            },
            cor: "#7DD3FC"
          },
          {
            id: "olho_direito",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 168,
              cy: 90,
              r: 11
            },
            cor: "#7DD3FC"
          },
          {
            id: "botao1",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 130,
              cy: 172,
              r: 10
            },
            cor: "#FCD34D"
          },
          {
            id: "botao2",
            tipo: "circle",
            decorativo: true,
            props: {
              cx: 170,
              cy: 172,
              r: 10
            },
            cor: "#FCD34D"
          }
        ]
      }
    }
  },
  {
    id: "cri_colorir_arvore",
    tipo: "colorir",
    titulo: "Colorir: Árvore",
    descricao: "Pinte a árvore frondosa e suas maçãs!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 9,
    historinha: "Essa árvore está cheia de maçãs, mas nem ela nem as frutas têm cor ainda! 🌳 Escolha as cores e pinte cada parte.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Árvore",
        regioes: [
          {
            id: "tronco",
            tipo: "rect",
            props: {
              x: 135,
              y: 180,
              width: 30,
              height: 90,
              rx: 6
            }
          },
          {
            id: "copa_baixa",
            tipo: "circle",
            props: {
              cx: 150,
              cy: 170,
              r: 60
            }
          },
          {
            id: "copa_meio",
            tipo: "circle",
            props: {
              cx: 150,
              cy: 120,
              r: 48
            }
          },
          {
            id: "copa_topo",
            tipo: "circle",
            props: {
              cx: 150,
              cy: 80,
              r: 35
            }
          },
          {
            id: "maca1",
            tipo: "circle",
            props: {
              cx: 112,
              cy: 152,
              r: 15
            }
          },
          {
            id: "maca2",
            tipo: "circle",
            props: {
              cx: 188,
              cy: 140,
              r: 15
            }
          },
          {
            id: "maca3",
            tipo: "circle",
            props: {
              cx: 150,
              cy: 98,
              r: 15
            }
          }
        ]
      }
    }
  },
  {
    id: "cri_colorir_carro",
    tipo: "colorir",
    titulo: "Colorir: Carro",
    descricao: "Pinte o carro e suas rodas!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 9,
    historinha: "Esse carro saiu da concessionária sem nenhuma cor na lataria! 🚗 Escolha as cores e pinte cada parte.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Carro",
        regioes: [
          {
            id: "carroceria",
            tipo: "rect",
            props: {
              x: 60,
              y: 140,
              width: 180,
              height: 60,
              rx: 16
            }
          },
          {
            id: "cabine",
            tipo: "polygon",
            props: {
              points: "100,140 120,100 190,100 210,140"
            }
          },
          {
            id: "janela_esquerda",
            tipo: "polygon",
            props: {
              points: "106,136 124,106 148,106 148,136"
            }
          },
          {
            id: "janela_direita",
            tipo: "polygon",
            props: {
              points: "152,136 152,106 176,106 194,136"
            }
          },
          {
            id: "roda_esquerda",
            tipo: "circle",
            props: {
              cx: 105,
              cy: 205,
              r: 25
            }
          },
          {
            id: "roda_direita",
            tipo: "circle",
            props: {
              cx: 205,
              cy: 205,
              r: 25
            }
          },
          {
            id: "farol",
            tipo: "circle",
            props: {
              cx: 232,
              cy: 160,
              r: 14
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
    id: "cri_cores_circulo",
    tipo: "cores",
    titulo: "O Círculo Cromático",
    descricao: "As 12 cores do círculo cromático e as relações entre elas!",
    emoji: "🎨",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Newton criou o primeiro círculo cromático em 1666! 🎨 Ele mostra como todas as cores se relacionam — primárias, secundárias, terciárias e seus complementares. Explore cada cor clicando em 🔊!",
    dados: {
      cores: [
        {
          id: "circ-vm",
          nome: "Vermelho",
          hex: "#C62828",
          emoji: "🔴",
          exemplo: "posição 0° no círculo",
          funfato: "O círculo cromático foi criado por Newton em 1666 para organizar as cores!",
          detalhe: "Hue 0° | Primária RYB | Complementar: Verde (180°) | RGB: (255,0,0)"
        },
        {
          id: "circ-vl",
          nome: "Vermelho-Laranja",
          hex: "#BF360C",
          emoji: "🟥",
          exemplo: "cor terciária — 30°",
          funfato: "Cores entre primárias e secundárias chamam-se terciárias — são 6 no total!",
          detalhe: "Hue 30° | Terciária | Intermediária entre vermelho e laranja"
        },
        {
          id: "circ-la",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🟠",
          exemplo: "posição 60° no círculo",
          funfato: "Laranja e azul são complementares — juntos criam contraste máximo!",
          detalhe: "Hue 60° | Secundária | Complementar: Azul | Mistura: Vermelho + Amarelo"
        },
        {
          id: "circ-ala",
          nome: "Amarelo-Laranja",
          hex: "#F57F17",
          emoji: "🌅",
          exemplo: "cor terciária — 90°",
          funfato: "Esta cor aparece muito no céu ao entardecer — muito usada pelos impressionistas!",
          detalhe: "Hue 90° | Terciária | Van Gogh usava muito esta cor"
        },
        {
          id: "circ-am",
          nome: "Amarelo",
          hex: "#F9A825",
          emoji: "⭐",
          exemplo: "posição 120° no círculo",
          funfato: "Amarelo e violeta são complementares — criam contraste muito forte na arte!",
          detalhe: "Hue 120° | Primária RYB | Complementar: Violeta | Mais luminosa do espectro"
        },
        {
          id: "circ-avg",
          nome: "Amarelo-Verde",
          hex: "#9E9D24",
          emoji: "🌿",
          exemplo: "cor terciária — 150°",
          funfato: "\"Chartreuse\" em inglês — nome de um licor francês verde-amarelado!",
          detalhe: "Hue 150° | Terciária | Mistura: Amarelo + Verde | Usada em design de moda"
        },
        {
          id: "circ-vd",
          nome: "Verde",
          hex: "#2E7D32",
          emoji: "🌲",
          exemplo: "posição 180° no círculo",
          funfato: "Verde e vermelho são complementares — por isso o Natal usa essas cores juntas!",
          detalhe: "Hue 180° | Secundária | Complementar: Vermelho | Mistura: Azul + Amarelo"
        },
        {
          id: "circ-vaz",
          nome: "Verde-Azul",
          hex: "#00695C",
          emoji: "🦚",
          exemplo: "cor terciária — 210°",
          funfato: "\"Teal\" em inglês — uma das cores mais usadas em design moderno!",
          detalhe: "Hue 210° | Terciária | Também chamado azul-esverdeado ou teal"
        },
        {
          id: "circ-az",
          nome: "Azul",
          hex: "#1565C0",
          emoji: "💙",
          exemplo: "posição 240° no círculo",
          funfato: "Azul e laranja são complementares — times de futebol às vezes usam essas cores!",
          detalhe: "Hue 240° | Primária RYB e RGB | Complementar: Laranja | O mais frio do espectro"
        },
        {
          id: "circ-avl",
          nome: "Azul-Violeta",
          hex: "#4527A0",
          emoji: "🌌",
          exemplo: "cor terciária — 270°",
          funfato: "Muito usada em design de tecnologia por parecer inovadora e criativa!",
          detalhe: "Hue 270° | Terciária | Conota confiança + criatividade"
        },
        {
          id: "circ-vi",
          nome: "Violeta",
          hex: "#6A1B9A",
          emoji: "🔮",
          exemplo: "posição 300° no círculo",
          funfato: "Violeta e amarelo são complementares — a cor mais cara da história!",
          detalhe: "Hue 300° | Secundária | Complementar: Amarelo | Mistura: Azul + Vermelho"
        },
        {
          id: "circ-rvi",
          nome: "Vermelho-Violeta",
          hex: "#880E4F",
          emoji: "🌺",
          exemplo: "cor terciária — 330°",
          funfato: "Esta cor fecha o círculo cromático, ligando o violeta de volta ao vermelho!",
          detalhe: "Hue 330° | Terciária | Fecha o círculo — conecta violeta e vermelho"
        }
      ]
    }
  },
  {
    id: "cri_cores_aditiva",
    tipo: "cores",
    titulo: "Síntese Aditiva (RGB)",
    descricao: "Como a luz cria cores misturando vermelho, verde e azul!",
    emoji: "💡",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "Monitores e telas usam luz para criar cores — não pigmentos! 💡 Cada pixel tem 3 luzes: R, G e B. Clique em 🔊 e descubra a síntese aditiva!",
    dados: {
      cores: [
        {
          id: "rgb-r",
          nome: "Vermelho (R)",
          hex: "#F44336",
          emoji: "🔴",
          exemplo: "primária de luz — Red",
          funfato: "Cada pixel da sua tela tem uma minúscula luz vermelha ligada ou apagada!",
          detalhe: "R = 255, G = 0, B = 0 | λ~700nm | Primária da luz e não do pigmento"
        },
        {
          id: "rgb-g",
          nome: "Verde (G)",
          hex: "#4CAF50",
          emoji: "💚",
          exemplo: "primária de luz — Green",
          funfato: "Olhos humanos são mais sensíveis ao verde — por isso telas têm mais pixels verdes!",
          detalhe: "R = 0, G = 255, B = 0 | λ~520nm | Pico da sensibilidade fotópica humana"
        },
        {
          id: "rgb-b",
          nome: "Azul (B)",
          hex: "#2196F3",
          emoji: "💙",
          exemplo: "primária de luz — Blue",
          funfato: "Luz azul das telas afeta o ritmo circadiano — inibe a melatonina do sono!",
          detalhe: "R = 0, G = 0, B = 255 | λ~450nm | Afeta produção de melatonina"
        },
        {
          id: "rgb-y",
          nome: "Amarelo",
          hex: "#FFEB3B",
          emoji: "⭐",
          exemplo: "R + G = Amarelo!",
          funfato: "Luz vermelha + verde cria amarelo — o oposto de tinta onde R+V = marrom!",
          detalhe: "R=255, G=255, B=0 | Síntese aditiva | Complementar de azul no RGB"
        },
        {
          id: "rgb-c",
          nome: "Ciano",
          hex: "#00BCD4",
          emoji: "💠",
          exemplo: "G + B = Ciano!",
          funfato: "Ciano é luz verde + azul misturados — é a cor do fundo do mar raso!",
          detalhe: "R=0, G=255, B=255 | Complementar de vermelho no RGB | CMYK: primária"
        },
        {
          id: "rgb-m",
          nome: "Magenta",
          hex: "#E91E63",
          emoji: "💗",
          exemplo: "R + B = Magenta!",
          funfato: "Magenta NÃO existe no espectro — é criada pelo cérebro misturando vermelho e violeta!",
          detalhe: "R=255, G=0, B=255 | Cor extra-espectral | Complementar de verde no RGB"
        }
      ]
    }
  },
  {
    id: "cri_cores_subtrativa",
    tipo: "cores",
    titulo: "Síntese Subtrativa (CMYK)",
    descricao: "Como impressoras criam todas as cores com 4 tintas!",
    emoji: "🖨️",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "Impressoras usam apenas 4 cores para imprimir tudo — CMYK! 🖨️ Cada tinta subtrai (remove) luz do papel branco. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "cmyk-c",
          nome: "Ciano (C)",
          hex: "#00BCD4",
          emoji: "💠",
          exemplo: "C: subtrai vermelho",
          funfato: "Ciano absorve a luz vermelha do papel branco — o vermelho some!",
          detalhe: "Cyan: absorve R | Complementar de vermelho | Primária da impressão"
        },
        {
          id: "cmyk-m",
          nome: "Magenta (M)",
          hex: "#E91E63",
          emoji: "💗",
          exemplo: "M: subtrai verde",
          funfato: "Magenta absorve a luz verde do papel — o verde desaparece!",
          detalhe: "Magenta: absorve G | Complementar de verde | Primária da impressão"
        },
        {
          id: "cmyk-y",
          nome: "Amarelo (Y)",
          hex: "#FFEB3B",
          emoji: "⭐",
          exemplo: "Y: subtrai azul",
          funfato: "Amarelo absorve a luz azul do papel — o azul é subtraído!",
          detalhe: "Yellow: absorve B | Complementar de azul | Primária da impressão"
        },
        {
          id: "cmyk-k",
          nome: "Preto (K)",
          hex: "#212121",
          emoji: "⚫",
          exemplo: "K: chave preta",
          funfato: "K de \"Key\" (chave) — preto é adicionado para textos nítidos e sombras profundas!",
          detalhe: "Key black | Mistura C+M+Y dá marrom sujo | Preto puro = economia de tinta"
        },
        {
          id: "cmyk-r",
          nome: "Vermelho",
          hex: "#F44336",
          emoji: "🔴",
          exemplo: "M + Y = Vermelho!",
          funfato: "Magenta + Amarelo criam vermelho na impressão — subtraindo verde e azul!",
          detalhe: "M+Y = R | Remove verde e azul | Síntese subtrativa: oposta da aditiva"
        },
        {
          id: "cmyk-b",
          nome: "Azul",
          hex: "#1565C0",
          emoji: "💙",
          exemplo: "C + M = Azul!",
          funfato: "Ciano + Magenta criam azul — removendo vermelho e verde do papel!",
          detalhe: "C+M = B | Remove vermelho e verde | Mesmo princípio dos filtros ópticos"
        }
      ]
    }
  },
  {
    id: "cri_cores_harmonia_comp",
    tipo: "cores",
    titulo: "Cores Complementares",
    descricao: "Pares de cores opostas no círculo cromático!",
    emoji: "⚖️",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "Cores opostas no círculo se chamam complementares — e criam o contraste máximo! ⚖️ Van Gogh as usava para fazer pinturas vibrantes. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "comp-vm-vd",
          nome: "Vermelho / Verde",
          hex: "#C62828",
          emoji: "🔴",
          exemplo: "vermelho e verde: complementares!",
          funfato: "Vermelho e verde são complementares — juntos vibram intensamente (como o Natal)!",
          detalhe: "Hue 0° vs 180° | Contraste máximo | Daltonismo afeta principalmente esse par"
        },
        {
          id: "comp-az-la",
          nome: "Azul / Laranja",
          hex: "#1565C0",
          emoji: "💙",
          exemplo: "azul e laranja: complementares!",
          funfato: "Azul e laranja são complementares — por isso muitos filmes têm esses tons!",
          detalhe: "Hue 240° vs 60° | Hollywood color grading | Estética dos filmes"
        },
        {
          id: "comp-am-rx",
          nome: "Amarelo / Violeta",
          hex: "#F9A825",
          emoji: "⭐",
          exemplo: "amarelo e violeta: complementares!",
          funfato: "Amarelo e violeta juntos criam contraste tão forte que \"vibram\" nos olhos!",
          detalhe: "Hue 60° vs 300° | Van Gogh usava muito esse par | Máximo contraste quente-frio"
        },
        {
          id: "comp-la-az",
          nome: "Vermelho-Laranja / Azul-Verde",
          hex: "#E65100",
          emoji: "🟠",
          exemplo: "complementares terciárias",
          funfato: "Pares terciários criam harmonia complementar dividida — mais suave que pura!",
          detalhe: "Split complementary | Mais versátil que complementar pura | Frequente na moda"
        },
        {
          id: "comp-avd-rvm",
          nome: "Amarelo-Verde / Vermelho-Roxo",
          hex: "#9E9D24",
          emoji: "🌿",
          exemplo: "mais complementares terciárias",
          funfato: "Estas complementares terciárias criam paletas estilizadas — muito usadas no design!",
          detalhe: "Hue ~150° vs ~330° | Harmônica e elegante | Preferida em design de moda"
        },
        {
          id: "comp-ret",
          nome: "Tetrádico (4 cores)",
          hex: "#7B1FA2",
          emoji: "🎯",
          exemplo: "quadrado de cores no círculo",
          funfato: "Escolha 4 cores em quadrado no círculo — cada par é complementar!",
          detalhe: "Tetradic: 4 cores a 90° | Mais difícil de equilibrar | Rico e vibrante"
        }
      ]
    }
  },
  {
    id: "cri_cores_harmonia_anal",
    tipo: "cores",
    titulo: "Harmonias de Cores",
    descricao: "As regras que artistas usam para combinar cores!",
    emoji: "🎵",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "Cores harmonizadas parecem naturais juntas — como notas numa música! 🎵 Existem regras para combiná-las corretamente. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "harm-anal",
          nome: "Análoga: Azul-Verde",
          hex: "#1565C0",
          emoji: "🌊",
          exemplo: "azul + azul-verde + verde",
          funfato: "Cores vizinhas no círculo (análogas) criam harmonia suave e natural!",
          detalhe: "Análogas: vizinhas no círculo | Diferença de ~30° | Harmonia relaxante"
        },
        {
          id: "harm-anal2",
          nome: "Análoga: Vermelho-Laranja",
          hex: "#E65100",
          emoji: "🌅",
          exemplo: "vermelho + laranja + amarelo",
          funfato: "Análogas quentes criam sensação de calor e aconchego — muito usadas no outono!",
          detalhe: "Análogas quentes | Lembra pôr do sol, outono, fogo | Harmonia energética"
        },
        {
          id: "harm-triad",
          nome: "Tríade: Primárias",
          hex: "#C62828",
          emoji: "🎨",
          exemplo: "vermelho + azul + amarelo",
          funfato: "As 3 primárias formam uma tríade perfeita — usada por Mondrian e Kandinsky!",
          detalhe: "Triadic: 3 cores a 120° | Equilíbrio máximo | Base do design infantil"
        },
        {
          id: "harm-triad2",
          nome: "Tríade: Secundárias",
          hex: "#E65100",
          emoji: "🟠",
          exemplo: "laranja + verde + violeta",
          funfato: "As 3 secundárias formam outra tríade — mais suave que as primárias!",
          detalhe: "Laranja + Verde + Violeta | Tríade secundária | Mais versátil que primárias"
        },
        {
          id: "harm-mono",
          nome: "Monocromática",
          hex: "#1565C0",
          emoji: "💙",
          exemplo: "vários tons do mesmo azul",
          funfato: "Paleta monocromática usa tons claros e escuros de uma única cor — elegância pura!",
          detalhe: "Mesma matiz | Varia saturação e luminosidade | Extremamente elegante"
        },
        {
          id: "harm-split",
          nome: "Split Complementar",
          hex: "#2E7D32",
          emoji: "🌿",
          exemplo: "verde + vermelho-laranja + vermelho-roxo",
          funfato: "Split complementar usa a cor principal + os vizinhos do complementar — mais suave!",
          detalhe: "Mais versátil que complementar pura | Evita tensão | Muito usada em design"
        }
      ]
    }
  },
  {
    id: "cri_cores_psicologia",
    tipo: "cores",
    titulo: "Psicologia das Cores",
    descricao: "Como as cores influenciam decisões e comportamentos!",
    emoji: "🧠",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Empresas gastam milhões escolhendo cores de logos e embalagens! 🧠 Isso porque cores mudam comportamentos. Clique em 🔊 e descubra por quê!",
    dados: {
      cores: [
        {
          id: "psi-vm",
          nome: "Vermelho",
          hex: "#C62828",
          emoji: "🛒",
          exemplo: "urgência e vendas",
          funfato: "Lojas de promoção usam vermelho porque acelera decisões de compra!",
          detalhe: "Urgência | Estimula apetite | Usado em McDonald's, Target, YouTube | Aumenta FC"
        },
        {
          id: "psi-az",
          nome: "Azul",
          hex: "#1565C0",
          emoji: "🔒",
          exemplo: "confiança e segurança",
          funfato: "Bancos e redes sociais usam azul porque transmite confiança e segurança!",
          detalhe: "Confiança | Facebook, Samsung, PayPal, LinkedIn | Reduz ansiedade"
        },
        {
          id: "psi-vd",
          nome: "Verde",
          hex: "#2E7D32",
          emoji: "🌿",
          exemplo: "saúde e natureza",
          funfato: "Marcas de saúde e alimentos orgânicos usam verde para indicar naturalidade!",
          detalhe: "Saúde, natureza | Whole Foods, Starbucks | Evoca crescimento"
        },
        {
          id: "psi-am",
          nome: "Amarelo",
          hex: "#F9A825",
          emoji: "⚠️",
          exemplo: "atenção e avisos",
          funfato: "Amarelo capta atenção rapidamente — por isso táxis e faixas de segurança são amarelas!",
          detalhe: "Atenção | Alta visibilidade | Táxis, cautela, pós-it | Estimula otimismo"
        },
        {
          id: "psi-la",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🎯",
          exemplo: "ação imediata e energia",
          funfato: "Botões de \"Comprar Agora\" laranjas têm maior taxa de clique — estimulam ação!",
          detalhe: "CTA (call to action) | Amazon, Harley-Davidson | Energia + diversão + urgência"
        },
        {
          id: "psi-rx",
          nome: "Roxo",
          hex: "#6A1B9A",
          emoji: "👑",
          exemplo: "luxo e criatividade",
          funfato: "Roxo é usado por marcas de luxo porque evoca realeza e exclusividade!",
          detalhe: "Luxo, criatividade | Cadbury, Hallmark, Twitch | Raridade histórica = prestígio"
        },
        {
          id: "psi-rs",
          nome: "Rosa",
          hex: "#E91E8C",
          emoji: "💝",
          exemplo: "romance e gentileza",
          funfato: "Rosa é a cor mais usada no Dia dos Namorados — evoca amor e ternura!",
          detalhe: "Romance, feminino | Victoria's Secret, Barbie, cosméticos | Suavidade"
        },
        {
          id: "psi-pt",
          nome: "Preto",
          hex: "#212121",
          emoji: "✨",
          exemplo: "elegância e premium",
          funfato: "Marcas de luxo preferem embalagens pretas — o preto faz produtos parecerem mais caros!",
          detalhe: "Elegância, premium | Apple, Chanel, Nike | Autoridade + sofisticação"
        }
      ]
    }
  },
  {
    id: "cri_cores_simbolismo",
    tipo: "cores",
    titulo: "Cores e Culturas",
    descricao: "O que as cores significam em diferentes partes do mundo!",
    emoji: "🌍",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "A mesma cor pode significar coisas opostas em culturas diferentes! 🌍 Branco é luto no Oriente e paz no Ocidente. Clique em 🔊 e explore!",
    dados: {
      cores: [
        {
          id: "sim-bc",
          nome: "Branco",
          hex: "#E0E0E0",
          emoji: "🕊️",
          exemplo: "paz no Ocidente, luto no Oriente",
          funfato: "Branco é paz no Ocidente e luto na China e Japão!",
          detalhe: "Ocidente: paz, pureza | China/Japão: luto e morte | Hinduísmo: novo começo"
        },
        {
          id: "sim-vm",
          nome: "Vermelho",
          hex: "#C62828",
          emoji: "🎊",
          exemplo: "sorte na China, perigo no Ocidente",
          funfato: "Na China vermelho é sorte e celebração — noivas se vestem de vermelho!",
          detalhe: "China: sorte, prosperidade, alegria | Ocidente: perigo, amor | Índia: pureza"
        },
        {
          id: "sim-am",
          nome: "Amarelo",
          hex: "#F9A825",
          emoji: "👑",
          exemplo: "realeza na Ásia, luto em alguns países",
          funfato: "Amarelo é cor imperial na China e do Papa — e luto no México!",
          detalhe: "China: realeza imperial | Papa: amarelo papal | México: luto e morte"
        },
        {
          id: "sim-vd",
          nome: "Verde",
          hex: "#2E7D32",
          emoji: "☪️",
          exemplo: "sagrado no Islã, siga nos semáforos",
          funfato: "Verde é sagrado no islã e cor do profeta Maomé!",
          detalhe: "Islã: sagrado (cor do Paraíso) | Ocidente: natureza, ir | Irlanda: identidade nacional"
        },
        {
          id: "sim-rx",
          nome: "Roxo",
          hex: "#6A1B9A",
          emoji: "😢",
          exemplo: "realeza no Ocidente, luto no Japão",
          funfato: "Roxo é realeza no Ocidente mas luto no Japão e Brasil!",
          detalhe: "Ocidente: realeza, poder | Japão/Tailândia: luto | Brasil: associado a luto"
        },
        {
          id: "sim-pt",
          nome: "Preto",
          hex: "#212121",
          emoji: "⚖️",
          exemplo: "luto no Ocidente, vida no Egito",
          funfato: "No Egito Antigo, o preto era cor da vida e fertilidade — cor do solo do Nilo!",
          detalhe: "Ocidente: luto, elegância | Egito antigo: vida (solo fértil do Nilo)"
        },
        {
          id: "sim-az",
          nome: "Azul",
          hex: "#1565C0",
          emoji: "🙏",
          exemplo: "divino na Índia, blues nos EUA",
          funfato: "Deuses hindus (Krishna, Vishnu, Shiva) são representados em azul!",
          detalhe: "Índia: divino (Krishna azul) | Blues americano: melancolia | Oriente Médio: proteção"
        },
        {
          id: "sim-la",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🧡",
          exemplo: "budismo na Ásia, cultura na Holanda",
          funfato: "Laranja é cor dos monges budistas — e da família real holandesa!",
          detalhe: "Budismo: iluminação, renúncia | Holanda: Casa de Orange | Índia: coragem"
        }
      ]
    }
  },
  {
    id: "cri_cores_impressionismo",
    tipo: "cores",
    titulo: "O Impressionismo e as Cores",
    descricao: "Como os impressionistas revolucionaram o uso das cores!",
    emoji: "🖌️",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Em 1874, pintores rebeldes abandonaram o preto das academias e pintaram com luz pura! 🖌️ O Impressionismo mudou a arte para sempre. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "imp-az",
          nome: "Azul Cerúleo",
          hex: "#0288D1",
          emoji: "🌊",
          exemplo: "Monet nos Nenúfares",
          funfato: "Monet pintou a mesma cena de nenúfares 250 vezes para capturar variações de luz!",
          detalhe: "Claude Monet | Azul cerúleo = azul do céu | Série de Nymphéas (1896-1926)"
        },
        {
          id: "imp-vm",
          nome: "Vermelho Cadmio",
          hex: "#C62828",
          emoji: "💃",
          exemplo: "Renoir e as festas",
          funfato: "Renoir usava vermelho cadmio para capturar a alegria das festas parisienses!",
          detalhe: "Pierre-Auguste Renoir | Vermelho cadmio: pigmento sintético (1817) | Substituiu ocre"
        },
        {
          id: "imp-am",
          nome: "Amarelo Cromo",
          hex: "#FFD600",
          emoji: "🌻",
          exemplo: "Van Gogh e os girassóis",
          funfato: "Van Gogh adorava amarelo cromo — mas é tóxico e suas pinturas estão escurecendo!",
          detalhe: "Vincent van Gogh | CrO₄²⁻ (cromato) tóxico | Oxidação gradual = escurece"
        },
        {
          id: "imp-vd",
          nome: "Verde Veronese",
          hex: "#00695C",
          emoji: "🍃",
          exemplo: "Cézanne e a natureza",
          funfato: "Cézanne usava verde para explorar formas geométricas — influenciou o cubismo!",
          detalhe: "Paul Cézanne | \"Pai do pós-impressionismo\" | Influência direta em Picasso e Braque"
        },
        {
          id: "imp-vl",
          nome: "Violeta Cobalto",
          hex: "#4527A0",
          emoji: "✨",
          exemplo: "Seurat e os pontos",
          funfato: "Seurat criou o Pontilhismo — pequenos pontos de cores puras que se misturam nos olhos!",
          detalhe: "Georges Seurat | Pointillisme | Teoria óptica de Chevreul aplicada à arte"
        },
        {
          id: "imp-la",
          nome: "Laranja Cadmio",
          hex: "#E65100",
          emoji: "🌅",
          exemplo: "Gauguin no Taiti",
          funfato: "Gauguin usou laranjas vibrantes para capturar a luz tropical do Pacífico!",
          detalhe: "Paul Gauguin | Pós-impressionismo | Cores simbólicas em vez de realistas"
        },
        {
          id: "imp-bc",
          nome: "Branco Titânio",
          hex: "#F5F5F5",
          emoji: "☁️",
          exemplo: "Pissarro e as névoas",
          funfato: "Impressionistas usavam muito branco puro — revolucionário em 1874!",
          detalhe: "Camille Pissarro | TiO₂ (dióxido de titânio) | Alta opacidade | Brilho máximo"
        },
        {
          id: "imp-sm",
          nome: "Sombra Azul",
          hex: "#283593",
          emoji: "🌑",
          exemplo: "sombras impressionistas",
          funfato: "Impressionistas pintavam sombras em azul e violeta, não em preto — revolução!",
          detalhe: "Banimento do preto | Sombras coloridas = luz do céu refletida | Luz complementar"
        }
      ]
    }
  },
  {
    id: "cri_cores_optica",
    tipo: "cores",
    titulo: "Fenômenos Ópticos",
    descricao: "Quando a natureza cria cores de formas inesperadas!",
    emoji: "🌈",
    habilidade: "Expressão Artística",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "A natureza é mestre em criar efeitos de cor! 🌈 Do arco-íris à aurora boreal — cada fenômeno tem uma explicação física fascinante. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "opt-arc",
          nome: "Arco-íris",
          hex: "#FF6B6B",
          emoji: "🌈",
          exemplo: "dispersão em gotículas de chuva",
          funfato: "Arco-íris circular completo só é visto de avião — no chão vemos apenas metade!",
          detalhe: "Refração + reflexão interna em gotículas | Sempre 42° do ponto anti-solar"
        },
        {
          id: "opt-aur",
          nome: "Aurora Boreal",
          hex: "#00E5FF",
          emoji: "🌌",
          exemplo: "colisão de partículas solares",
          funfato: "Aurora boreal acontece quando partículas do sol colidem com nossa atmosfera!",
          detalhe: "Plasma solar + campo magnético | Verde: oxigênio a ~100km | Vermelho: oxigênio a ~250km | Rosa: nitrogênio"
        },
        {
          id: "opt-ird",
          nome: "Iridescência",
          hex: "#E91E8C",
          emoji: "🦋",
          exemplo: "penas de pavão e asas de borboleta",
          funfato: "A asa de borboleta muda de cor conforme o ângulo — sem pigmento algum!",
          detalhe: "Interferência de luz em nanoestruturas | Cor estrutural | Ópala, bolha de sabão"
        },
        {
          id: "opt-hal",
          nome: "Halo Solar",
          hex: "#FDD835",
          emoji: "☀️",
          exemplo: "anel colorido ao redor do sol",
          funfato: "Halos solares se formam em cristais de gelo em altitude — nuvens de -40°C!",
          detalhe: "Refração em cristais de gelo hexagonais | 22° do sol | Cirrostratus"
        },
        {
          id: "opt-mir",
          nome: "Miragem",
          hex: "#64B5F6",
          emoji: "🏜️",
          exemplo: "poça de água falsa no deserto",
          funfato: "Miragem no asfalto não é ilusão de óptica — é reflexo real do céu na camada quente!",
          detalhe: "Gradiente de temperatura → gradiente de índice de refração | Reflexão total"
        },
        {
          id: "opt-flo",
          nome: "Flor Fluorescente",
          hex: "#CE93D8",
          emoji: "🌸",
          exemplo: "flores visíveis ao UV para abelhas",
          funfato: "Flores têm padrões UV invisíveis para nós mas visíveis para abelhas!",
          detalhe: "Abelhas: receptores em 344nm, 436nm, 544nm | Guias de néctar invisíveis a humanos"
        }
      ]
    }
  }
]

// ── Fase 2 — padrão, robô, labirinto ──
export const fase2ExtraPorFaixa = [
  {
    id: "cri_padrao_progressoes",
    tipo: "padrao",
    titulo: "Progressões Numéricas",
    descricao: "Quadrados, cubos e Fibonacci em grade!",
    emoji: "📐",
    habilidade: "Lógica Matemática",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 11,
    historinha: "O matemático perdeu as páginas do seu livro de progressões! 📐 Os números estão embaralhados. Descubra a regra de cada grade para reorganizá-los.",
    puzzles: [
      {
        matriz: ["1", "4", "9", "4", "9", "16", "9", "16", "❓"],
        resposta: "25",
        opcoes: ["20", "23", "25", "36"],
        dica: "Números quadrados (1²,2²,3²,4²,5²)! Cada célula é uma posição no padrão."
      },
      {
        matriz: ["1", "8", "27", "8", "27", "64", "27", "64", "❓"],
        resposta: "125",
        opcoes: ["100", "120", "125", "216"],
        dica: "Números cúbicos (1³,2³,3³,4³,5³)!"
      },
      {
        matriz: ["2", "3", "5", "3", "5", "8", "5", "8", "❓"],
        resposta: "13",
        opcoes: ["11", "12", "13", "21"],
        dica: "Fibonacci! Cada número é a soma dos dois anteriores."
      },
      {
        matriz: ["1", "2", "4", "2", "4", "8", "4", "8", "❓"],
        resposta: "16",
        opcoes: ["12", "14", "16", "24"],
        dica: "Potências de 2: 2⁰, 2¹, 2², 2³, 2⁴..."
      },
      {
        matriz: ["1", "4", "16", "4", "16", "64", "16", "64", "❓"],
        resposta: "256",
        opcoes: ["128", "200", "256", "512"],
        dica: "Cada número é 4 vezes o anterior! 1, 4, 16, 64, 256 — as potências de 4"
      }
    ]
  },
  {
    id: "cri_padrao_logica_avancada",
    tipo: "padrao",
    titulo: "Lógica Avançada",
    descricao: "Padrões que combinam regras diferentes!",
    emoji: "🧠",
    habilidade: "Raciocínio Lógico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 11,
    historinha: "O clube de lógica lançou o desafio mais difícil do ano! 🧠 Cada grade tem uma regra especial que mistura sequências diferentes. Você consegue decifrar todas?",
    puzzles: [
      {
        matriz: ["P", "I", "M", "I", "M", "P", "M", "P", "❓"],
        resposta: "I",
        opcoes: ["P", "I", "M", "A"],
        dica: "Cada linha tem P, I e M exatamente uma vez! Quadrado latino."
      },
      {
        matriz: ["N", "L", "O", "L", "O", "N", "O", "N", "❓"],
        resposta: "L",
        opcoes: ["N", "L", "O", "S"],
        dica: "Cada linha e coluna contém N, L, O uma vez. Quadrado latino 3x3!"
      },
      {
        matriz: ["10", "01", "11", "01", "11", "10", "11", "10", "❓"],
        resposta: "01",
        opcoes: ["10", "01", "11", "00"],
        dica: "Binário! 01, 10 e 11 se revezam em cada linha e coluna."
      },
      {
        matriz: ["A", "B", "C", "C", "A", "B", "B", "C", "❓"],
        resposta: "A",
        opcoes: ["A", "B", "C", "D"],
        dica: "Quadrado latino: cada letra aparece uma vez em cada linha e coluna!"
      },
      {
        matriz: ["🔴", "🟢", "🔵", "🔵", "🔴", "🟢", "🟢", "🔵", "❓"],
        resposta: "🔴",
        opcoes: ["🔴", "🟢", "🔵", "🟡"],
        dica: "Cada cor aparece exatamente uma vez em cada linha e coluna!"
      }
    ]
  },
  {
    id: "cri_padrao_ciencias",
    tipo: "padrao",
    titulo: "Padrões da Ciência",
    descricao: "Tabela periódica, planetas e muito mais!",
    emoji: "⚗️",
    habilidade: "Conhecimento Científico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 11,
    historinha: "O cientista louco embaralhou os dados dos experimentos! ⚗️ Os números têm padrões científicos. Descubra a sequência de cada um!",
    puzzles: [
      {
        matriz: ["H", "He", "Li", "He", "Li", "Be", "Li", "Be", "❓"],
        resposta: "B",
        opcoes: ["B", "C", "N", "O"],
        dica: "Elementos da tabela periódica em ordem: H, He, Li, Be, B, C..."
      },
      {
        matriz: ["1", "4", "4", "4", "4", "9", "4", "9", "❓"],
        resposta: "16",
        opcoes: ["12", "14", "16", "25"],
        dica: "Quadrados perfeitos no padrão diagonal: 1, 4, 9, 16..."
      },
      {
        matriz: ["Mercury", "Venus", "Earth", "Venus", "Earth", "Mars", "Earth", "Mars", "❓"],
        resposta: "Jupiter",
        opcoes: ["Saturn", "Mars", "Jupiter", "Neptune"],
        dica: "Planetas do Sistema Solar em ordem crescente de distância ao Sol!"
      },
      {
        matriz: ["1", "2", "3", "2", "4", "6", "3", "6", "❓"],
        resposta: "9",
        opcoes: ["7", "8", "9", "12"],
        dica: "Tabela de multiplicação! Linha × coluna (índices de 1 a 3)."
      },
      {
        matriz: ["3", "6", "12", "6", "12", "24", "12", "24", "❓"],
        resposta: "48",
        opcoes: ["36", "42", "48", "96"],
        dica: "Cada número dobra ao cruzar a diagonal principal!"
      }
    ]
  },
  {
    id: "cri_robo_labirinto",
    tipo: "robo",
    titulo: "Robô Labiríntico",
    descricao: "Navegue pelo labirinto de obstáculos!",
    emoji: "🤖",
    habilidade: "Pensamento Computacional",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "O robô explorador entrou numa caverna cheia de blocos! 🤖 A saída está do outro lado, mas as paredes criam um labirinto real. Planeje cada passo com cuidado!",
    niveis: [
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 5],
        paredes: [
          [3, 2],
          [3, 3]
        ],
        passos_max: 10
      },
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 5],
        paredes: [
          [0, 3],
          [1, 3],
          [2, 3],
          [4, 3],
          [5, 3]
        ],
        passos_max: 10
      }
    ]
  },
  {
    id: "cri_robo_circuito",
    tipo: "robo",
    titulo: "Circuito Eletrônico",
    descricao: "Trace o circuito até o receptor!",
    emoji: "⚡",
    habilidade: "Pensamento Computacional",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "O robô é um elétron viajando pelo circuito! ⚡ Precisa ir da fonte até o receptor sem tocar nos resistores. O caminho mais curto economiza energia!",
    niveis: [
      {
        grade: 6,
        inicio: [0, 5],
        fim: [5, 0],
        paredes: [
          [2, 2],
          [2, 3],
          [3, 2],
          [3, 3]
        ],
        passos_max: 10
      },
      {
        grade: 6,
        inicio: [0, 5],
        fim: [5, 0],
        paredes: [
          [1, 0],
          [1, 1],
          [4, 4],
          [4, 5]
        ],
        passos_max: 10
      }
    ]
  },
  {
    id: "cri_labirinto_cyber",
    tipo: "labirinto",
    titulo: "Cidade Cyberpunk",
    descricao: "Navegue pelas ruas do futuro!",
    emoji: "🌆",
    habilidade: "Raciocínio Espacial",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 10,
    historinha: "Na cidade do futuro, as ruas mudam a cada hora! 🌆 Seu GPS holográfico mostra o labirinto atual. Chegue ao ponto de destino antes que as rotas mudem novamente!",
    tamanho: 9
  },
  {
    id: "cri_labirinto_DNA",
    tipo: "labirinto",
    titulo: "Cadeia de DNA",
    descricao: "Viaje pelo labirinto molecular!",
    emoji: "🧬",
    habilidade: "Raciocínio Espacial",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 11,
    historinha: "Imagine que você é uma proteína viajando pela cadeia de DNA! 🧬 Os nucleotídeos criam um labirinto molecular. Encontre o caminho correto de replicação!",
    tamanho: 11
  },
  {
    id: "cri_labirinto_oceano",
    tipo: "labirinto",
    titulo: "Abismo Oceânico",
    descricao: "Explore as profundezas do oceano!",
    emoji: "🌊",
    habilidade: "Raciocínio Espacial",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 11,
    historinha: "O submarino de pesquisa mergulhou na Fossa das Marianas! 🌊 A 11km de profundidade, as correntes criam labirintos de água. Navegue até a base de pesquisa!",
    tamanho: 11
  },
  {
    id: "cri_labirinto_computador",
    tipo: "labirinto",
    titulo: "Dentro do Computador",
    descricao: "Viaje pelos circuitos digitais!",
    emoji: "💻",
    habilidade: "Raciocínio Espacial",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Você encolheu até o tamanho de um elétron! 💻 Dentro do processador, os transistores criam um labirinto de bilhões de portas lógicas. Ache o caminho até a memória RAM!",
    tamanho: 13
  }
]

// ── Fase 3 — blocos, inventor, robô e quizia extras ──
export const fase3ExtraPorFaixa = [
  {
    id: "cri_blocos_3",
    tipo: "blocos",
    titulo: "Otimização de Rotas",
    descricao: "Encontre o caminho mais eficiente — cada bloco custa energia!",
    emoji: "⚡",
    habilidade: "Algoritmos",
    xp_reward: 140,
    coins_reward: 140,
    tempo_estimado: 17,
    historinha: "Aplicativos de entrega como iFood e Rappi usam algoritmos de otimização de rotas. ⚡ Cada desvio desnecessário gasta bateria e tempo. Aqui, cada bloco extra penaliza seu score — pense como um engenheiro de logística!",
    niveis: [
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 5],
        paredes: [
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [0, 4],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4]
        ],
        passos_max: 6,
        dica: "Passe pela abertura na coluna 2 depois contorne a parede horizontal!"
      },
      {
        grade: 7,
        inicio: [3, 0],
        fim: [3, 6],
        paredes: [
          [0, 2],
          [1, 2],
          [2, 2],
          [4, 2],
          [5, 2],
          [6, 2],
          [0, 4],
          [1, 4],
          [2, 4],
          [4, 4],
          [5, 4],
          [6, 4]
        ],
        passos_max: 6,
        dica: "Desça pelo corredor central — as paredes têm brechas no meio!"
      },
      {
        grade: 6,
        inicio: [0, 3],
        fim: [5, 3],
        paredes: [
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
          [3, 2],
          [3, 3],
          [3, 4],
          [3, 5],
          [4, 2],
          [4, 3],
          [4, 4],
          [4, 5]
        ],
        passos_max: 8,
        dica: "Contorne a primeira parede vertical por cima e a segunda por baixo!"
      }
    ]
  },
  {
    id: "cri_blocos_4",
    tipo: "blocos",
    titulo: "Padrões Fractais",
    descricao: "Loops dentro de loops — descubra a beleza dos padrões repetitivos!",
    emoji: "🔮",
    habilidade: "Algoritmos",
    xp_reward: 145,
    coins_reward: 145,
    tempo_estimado: 17,
    historinha: "Fractais são padrões que se repetem em escalas diferentes — do floco de neve ao brócolis romano. 🔮 Na programação, loops aninhados criam esses padrões. Use o mínimo de blocos para percorrer grades cada vez maiores!",
    niveis: [
      {
        grade: 7,
        inicio: [0, 6],
        fim: [6, 0],
        paredes: [
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5],
          [1, 4],
          [1, 3],
          [1, 2],
          [1, 1],
          [3, 4],
          [3, 3],
          [3, 2],
          [5, 4],
          [5, 3],
          [5, 2],
          [5, 1]
        ],
        passos_max: 6,
        dica: "Suba em ziguezague pelos corredores livres!"
      },
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 4],
        paredes: [
          [0, 2],
          [1, 2],
          [1, 3],
          [1, 4],
          [1, 5],
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 3],
          [5, 1],
          [5, 2],
          [5, 3]
        ],
        passos_max: 8,
        dica: "Serpenteia entre as três colunas de paredes!"
      },
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [1, 0],
          [1, 1],
          [1, 2],
          [3, 1],
          [3, 2],
          [3, 3],
          [5, 2],
          [5, 3],
          [5, 4],
          [1, 4],
          [1, 5],
          [3, 5],
          [3, 6],
          [5, 5],
          [5, 6]
        ],
        passos_max: 10,
        dica: "Caminho em escada — contorna cada bloco de paredes pelo lado aberto!"
      }
    ]
  },
  {
    id: "cri_robo_2",
    tipo: "robo",
    titulo: "Robô Arqueólogo",
    descricao: "Programe o robô para escavar as ruínas sem destruir nada!",
    emoji: "🏺",
    habilidade: "Pensamento Computacional",
    xp_reward: 140,
    coins_reward: 140,
    tempo_estimado: 16,
    historinha: "O Robô Arqueólogo encontrou ruínas antigas! 🏺 Cada parede é um artefato frágil — um passo errado destrói séculos de história. Programe o caminho exato para ele chegar à câmara do tesouro!",
    niveis: [
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 5],
        paredes: [
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
          [0, 3],
          [1, 3],
          [3, 3],
          [4, 3]
        ],
        passos_max: 14,
        dica: "Contorne a parede vertical pela direita e a horizontal por cima!"
      },
      {
        grade: 6,
        inicio: [5, 0],
        fim: [0, 5],
        paredes: [
          [4, 0],
          [3, 0],
          [2, 0],
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [3, 2],
          [3, 3],
          [3, 4],
          [3, 5]
        ],
        passos_max: 14,
        dica: "Desça pela esquerda, contorne as duas paredes horizontais!"
      },
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [2, 0],
          [2, 1],
          [2, 2],
          [4, 2],
          [4, 3],
          [4, 4],
          [2, 4],
          [2, 5],
          [2, 6],
          [4, 6]
        ],
        passos_max: 16,
        dica: "Serpenteia em S pelo labirinto de colunas!"
      }
    ]
  },
  {
    id: "cri_inventor_2",
    tipo: "inventor",
    titulo: "Inventor de Tecnologia",
    descricao: "Crie um app, gadget ou sistema tecnológico inovador!",
    emoji: "📱",
    habilidade: "Inovação Tecnológica",
    xp_reward: 155,
    coins_reward: 155,
    tempo_estimado: 15,
    historinha: "Os aplicativos que você usa no celular foram criados por pessoas que tiveram uma ideia e não desistiram. 📱 Qual seria o seu app? A IA vai avaliar originalidade, utilidade e viabilidade técnica da sua criação!",
    inspiracoes: [
      "Um app que usa a câmera para identificar plantas e animais na natureza",
      "Um assistente de estudos que cria exercícios personalizados por matéria",
      "Uma rede social só de notícias verificadas por IA para jovens"
    ]
  },
  {
    id: "cri_inventor_3",
    tipo: "inventor",
    titulo: "Inventor do Espaço",
    descricao: "Invente algo para facilitar a vida no espaço ou em outro planeta!",
    emoji: "🚀",
    habilidade: "Criatividade Científica",
    xp_reward: 155,
    coins_reward: 155,
    tempo_estimado: 15,
    historinha: "Em 2050, humanos vão morar em Marte. 🚀 Eles precisarão de comida, abrigo, energia e entretenimento — tudo em condições impossíveis. O que você inventaria para tornar a vida em Marte possível?",
    inspiracoes: [
      "Uma estufa compacta que cresce alimentos em gravidade zero",
      "Um traje espacial com exoesqueleto para exploração do terreno marciano",
      "Um sistema de comunicação em tempo real com a Terra usando laser"
    ]
  },
  {
    id: "cri_blocos_2",
    tipo: "blocos",
    titulo: "Desafio dos Algoritmos",
    descricao: "Puzzles complexos que exigem loops e planejamento!",
    emoji: "🧩",
    habilidade: "Algoritmos",
    xp_reward: 135,
    coins_reward: 135,
    tempo_estimado: 16,
    historinha: "Um algoritmo eficiente faz mais com menos. 🧩 Os melhores programadores escrevem código compacto e elegante. Resolva cada desafio usando o menor número de blocos possível — cada bloco economizado é um ponto extra de performance!",
    niveis: [
      {
        grade: 6,
        inicio: [5, 0],
        fim: [0, 5],
        paredes: [
          [4, 0],
          [3, 0],
          [2, 0],
          [1, 0],
          [4, 1],
          [3, 1],
          [2, 1],
          [1, 1],
          [4, 2],
          [3, 2],
          [2, 2],
          [1, 2],
          [4, 3],
          [3, 3],
          [2, 3],
          [1, 3],
          [4, 4],
          [3, 4],
          [2, 4],
          [1, 4]
        ],
        passos_max: 4,
        dica: "Vá 5 à direita depois suba 5. Use R5 duas vezes!"
      },
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
          [6, 0],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
          [6, 1],
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 2],
          [6, 2],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3],
          [6, 3],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [5, 4],
          [6, 4],
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5],
          [6, 5]
        ],
        passos_max: 4,
        dica: "Grade 7×7! → R6 depois ↓ R6 com apenas 4 blocos!"
      },
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 3],
        paredes: [
          [0, 4],
          [0, 5],
          [1, 4],
          [1, 5],
          [2, 4],
          [2, 5],
          [3, 0],
          [3, 1],
          [4, 0],
          [4, 1],
          [5, 0],
          [5, 1],
          [5, 4],
          [5, 5]
        ],
        passos_max: 6,
        dica: "Analise o caminho disponível antes de programar!"
      }
    ]
  },
  {
    id: "cri_quizia_2",
    tipo: "quizia",
    titulo: "Quiz IA — Ciência Avançada",
    descricao: "Perguntas sobre temas científicos avançados!",
    emoji: "🔭",
    habilidade: "Raciocínio Científico",
    xp_reward: 105,
    coins_reward: 105,
    tempo_estimado: 12,
    historinha: "A ciência avança todos os dias e há muito para descobrir! 🔭 Esse quiz foi pensado para quem quer ir além — perguntas sobre astronomia, física, química e biologia que fazem você pensar de verdade.",
    temas: ["🧬 DNA e Genética", "⚛️ Átomos e Moléculas", "🌡️ Física do Cotidiano", "🧪 Química das Cores"]
  },
  {
    id: "cri_quizia_3",
    tipo: "quizia",
    titulo: "Quiz IA — Brasil e Civilizações",
    descricao: "Biomas, história e lógica: a IA vai a fundo nesses temas!",
    emoji: "🌎",
    habilidade: "Raciocínio Cultural",
    xp_reward: 105,
    coins_reward: 105,
    tempo_estimado: 12,
    historinha: "O Brasil tem os maiores biomas do planeta, e o mundo tem civilizações milenares cheias de segredos! 🌎 A IA mergulhou nesses temas para criar perguntas que vão fazer você pensar além do livro didático.",
    temas: [
      "🌎 Biomas do Brasil",
      "🏛️ Civilizações Antigas",
      "🎬 Cinema e Animação",
      "🔢 Lógica e Algoritmos"
    ]
  }
]

// ── Fase 4 — robô e padrão (2 por faixa) ──
export const fase4ExtraPorFaixa = [
  {
    id: "cri_robo_3",
    tipo: "robo",
    titulo: "Robô Detetive",
    descricao: "Investigue o crime percorrendo cada pista sem errar o caminho!",
    emoji: "🔍",
    habilidade: "Pensamento Computacional",
    xp_reward: 135,
    coins_reward: 135,
    tempo_estimado: 15,
    historinha: "O Robô Detetive está investigando um crime! 🔍 As evidências estão espalhadas pela cidade, mas há bloqueios policiais no caminho. Planeje a rota exata para coletar cada pista!",
    niveis: [
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
          [2, 5]
        ],
        passos_max: 12,
        dica: "A parede em L bloqueia o topo direito — contorne por baixo!"
      },
      {
        grade: 6,
        inicio: [5, 0],
        fim: [0, 5],
        paredes: [
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
          [4, 1],
          [4, 2],
          [4, 3],
          [4, 4]
        ],
        passos_max: 12,
        dica: "Duas barreiras horizontais — use a borda esquerda e depois a linha superior!"
      },
      {
        grade: 6,
        inicio: [0, 5],
        fim: [5, 0],
        paredes: [
          [1, 3],
          [1, 4],
          [2, 3],
          [3, 2],
          [3, 3],
          [4, 1],
          [4, 2]
        ],
        passos_max: 14,
        dica: "Obstáculos em diagonal — escolha contornar pela esquerda!"
      }
    ]
  },
  {
    id: "cri_robo_4",
    tipo: "robo",
    titulo: "Robô Submarino",
    descricao: "Navegue pelas correntes do fundo do oceano!",
    emoji: "🤿",
    habilidade: "Pensamento Computacional",
    xp_reward: 140,
    coins_reward: 140,
    tempo_estimado: 16,
    historinha: "O Robô Submarino está explorando a Fossa das Marianas! 🤿 As correntes subaquáticas criam barreiras naturais. Programe o trajeto certo para chegar à base de pesquisa!",
    niveis: [
      {
        grade: 6,
        inicio: [0, 0],
        fim: [5, 5],
        paredes: [
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 3],
          [3, 4]
        ],
        passos_max: 12,
        dica: "A barreira horizontal tem uma brecha à direita — vá pela borda superior e desça!"
      },
      {
        grade: 6,
        inicio: [0, 5],
        fim: [5, 0],
        paredes: [
          [1, 1],
          [2, 1],
          [2, 2],
          [3, 2],
          [3, 3],
          [4, 3],
          [4, 4]
        ],
        passos_max: 14,
        dica: "Obstáculos em escada — vá pela borda direita e depois pela linha inferior!"
      }
    ]
  },
  {
    id: "cri_padrao_musica",
    tipo: "padrao",
    titulo: "Padrões Musicais",
    descricao: "Escalas, dinâmicas e períodos da história da música!",
    emoji: "🎵",
    habilidade: "Raciocínio Lógico",
    xp_reward: 105,
    coins_reward: 105,
    tempo_estimado: 12,
    historinha: "O regente perdeu as partituras! 🎵 Cada grade tem um padrão musical secreto — notas, dinâmicas ou períodos históricos. Descubra a regra e complete a partitura!",
    puzzles: [
      {
        matriz: ["Dó", "Ré", "Mi", "Ré", "Mi", "Fá", "Mi", "Fá", "❓"],
        resposta: "Sol",
        opcoes: ["Mi", "Fá", "Sol", "Lá"],
        dica: "As notas musicais em ordem crescente da escala!"
      },
      {
        matriz: ["PP", "P", "MP", "P", "MP", "MF", "MP", "MF", "❓"],
        resposta: "F",
        opcoes: ["MF", "F", "FF", "FFF"],
        dica: "As dinâmicas musicais crescem: pp, p, mp, mf, f!"
      },
      {
        matriz: [
          "Barroco",
          "Clássico",
          "Romântico",
          "Clássico",
          "Romântico",
          "Moderno",
          "Romântico",
          "Moderno",
          "❓"
        ],
        resposta: "Contemporâneo",
        opcoes: ["Romântico", "Moderno", "Contemporâneo", "Digital"],
        dica: "Os períodos da história da música ocidental em ordem!"
      },
      {
        matriz: ["Solo", "Duo", "Trio", "Duo", "Trio", "Quarteto", "Trio", "Quarteto", "❓"],
        resposta: "Quinteto",
        opcoes: ["Quarteto", "Quinteto", "Sexteto", "Orquestra"],
        dica: "O número de músicos cresce em cada diagonal!"
      },
      {
        matriz: ["Dó", "Mi", "Sol", "Mi", "Sol", "Si", "Sol", "Si", "❓"],
        resposta: "Ré",
        opcoes: ["Lá", "Si", "Dó", "Ré"],
        dica: "Os intervalos musicais seguem a progressão da escala maior!"
      }
    ]
  },
  {
    id: "cri_padrao_tecnologia",
    tipo: "padrao",
    titulo: "Padrões Tecnológicos",
    descricao: "Unidades de dados, linguagens e eras da tecnologia!",
    emoji: "💻",
    habilidade: "Pensamento Computacional",
    xp_reward: 105,
    coins_reward: 105,
    tempo_estimado: 12,
    historinha: "O engenheiro de software embaralhou os manuais técnicos! 💻 Cada grade esconde um padrão do mundo digital. Identifique a regra e complete o sistema!",
    puzzles: [
      {
        matriz: ["bit", "byte", "KB", "byte", "KB", "MB", "KB", "MB", "❓"],
        resposta: "GB",
        opcoes: ["MB", "GB", "TB", "PB"],
        dica: "Unidades de armazenamento digital crescendo!"
      },
      {
        matriz: ["HTML", "CSS", "JS", "CSS", "JS", "React", "JS", "React", "❓"],
        resposta: "Next.js",
        opcoes: ["React", "Vue", "Next.js", "Angular"],
        dica: "Tecnologias web evoluindo de base para framework!"
      },
      {
        matriz: ["AND", "OR", "NOT", "OR", "NOT", "XOR", "NOT", "XOR", "❓"],
        resposta: "NAND",
        opcoes: ["AND", "XOR", "NAND", "NOR"],
        dica: "Portas lógicas em complexidade crescente!"
      },
      {
        matriz: ["Mainframe", "PC", "Internet", "PC", "Internet", "Mobile", "Internet", "Mobile", "❓"],
        resposta: "IA",
        opcoes: ["Internet", "Cloud", "Mobile", "IA"],
        dica: "A evolução das eras tecnológicas!"
      },
      {
        matriz: ["print", "função", "classe", "função", "classe", "módulo", "classe", "módulo", "❓"],
        resposta: "pacote",
        opcoes: ["módulo", "pacote", "biblioteca", "framework"],
        dica: "A organização do código de menor para maior!"
      }
    ]
  }
]

// ── Fase 5 — quiz e inventor temáticos ──
export const fase5ExtraPorFaixa = [
  {
    id: "cri_quiz_matematica",
    tipo: "quiz",
    titulo: "Matemática e Lógica",
    descricao: "Desafios de raciocínio que vão fazer sua cabeça funcionar!",
    emoji: "🔢",
    habilidade: "Raciocínio Lógico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 11,
    historinha: "A Olimpíada de Matemática começou! 🏅 Os maiores gênios da lógica estão competindo. Aqui o importante não é a velocidade — é pensar com clareza. Respire fundo e raciocine!",
    perguntas: [
      {
        pergunta: "Um trem parte às 8h e chega às 11h30. Quantas horas durou a viagem?",
        opcoes: ["2h30", "3h", "3h30", "4h"],
        correta: 2,
        fato: "⏱️ Converta para minutos: 8h = 480min, 11h30 = 690min. Diferença = 210min = 3h30. Pilotos, médicos e engenheiros calculam tempo assim centenas de vezes por dia!"
      },
      {
        pergunta: "Qual número vem a seguir: 2, 4, 8, 16, ___?",
        opcoes: ["18", "24", "30", "32"],
        correta: 3,
        fato: "2️⃣ Cada número é o dobro do anterior — isso é uma progressão geométrica de razão 2. Computadores usam exatamente essa lógica: 2, 4, 8, 16, 32, 64, 128... potências de 2!"
      },
      {
        pergunta: "Se compro 3 cadernos por R$6 cada, quanto gasto no total?",
        opcoes: ["R$12", "R$15", "R$18", "R$21"],
        correta: 2,
        fato: "💰 3 × R$6 = R$18. Multiplicação é somar o mesmo número várias vezes. Supermercados, lojas e empresas fazem milhões de multiplicações por segundo em seus sistemas!"
      },
      {
        pergunta: "Um quadrado tem 4 lados de 5cm. Qual é seu perímetro?",
        opcoes: ["15cm", "20cm", "25cm", "30cm"],
        correta: 1,
        fato: "📐 Perímetro = soma de todos os lados = 5+5+5+5 = 20cm. Arquitetos calculam perímetros para saber quanto material precisam: tinta, cerca, azulejo..."
      },
      {
        pergunta: "Se metade de uma turma de 30 alunos é menina, quantos são meninos?",
        opcoes: ["10", "12", "15", "20"],
        correta: 2,
        fato: "➗ Metade de 30 = 30 ÷ 2 = 15 meninos. Divisão é uma das operações mais usadas no dia a dia: dividir pizza, calcular troco, dividir tarefas em equipe."
      }
    ]
  },
  {
    id: "cri_quiz_mente",
    tipo: "quiz",
    titulo: "Psicologia e Mente",
    descricao: "Como o cérebro humano realmente funciona?",
    emoji: "🧠",
    habilidade: "Psicologia",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 11,
    historinha: "O cérebro humano é o objeto mais complexo do universo conhecido! 🧠 Ele controla cada batida do coração, cada pensamento e cada emoção. Psicólogos passam a vida estudando seus mistérios. Quer descobrir alguns?",
    perguntas: [
      {
        pergunta: "Quantos neurônios (células nervosas) tem o cérebro humano?",
        opcoes: ["100 mil", "10 milhões", "86 bilhões", "1 trilhão"],
        correta: 2,
        fato: "🧬 86 bilhões de neurônios, formando cerca de 100 trilhões de conexões! Se cada conexão fosse um fio, daria para ir até a Lua e voltar mais de 500 vezes."
      },
      {
        pergunta: "Qual parte do cérebro controla o equilíbrio e os movimentos do corpo?",
        opcoes: ["Córtex", "Hipocampo", "Cerebelo", "Amígdala"],
        correta: 2,
        fato: "🤸 O cerebelo tem só 10% do volume do cérebro, mas 80% de todos os neurônios! É especialista em movimento e equilíbrio. É ele que te permite andar de bicicleta no \"piloto automático\"."
      },
      {
        pergunta: "O que o cérebro faz enquanto dormimos?",
        opcoes: [
          "Nada — ele descansa",
          "Limpa toxinas e consolida memórias",
          "Para de funcionar",
          "Fica mais lento que de dia"
        ],
        correta: 1,
        fato: "😴 Enquanto dormimos, o cérebro \"lava\" toxinas acumuladas e transfere memórias do curto para o longo prazo. Por isso estudar e depois dormir ajuda a fixar o conteúdo melhor!"
      },
      {
        pergunta: "O que é o \"efeito placebo\"?",
        opcoes: [
          "Um remédio muito potente",
          "Quando a crença em algo faz ele funcionar de verdade",
          "Um tipo de sonho lúcido",
          "A capacidade de ler pensamentos"
        ],
        correta: 1,
        fato: "💊 O placebo mostra o poder da mente sobre o corpo! Pacientes que tomam pílulas de açúcar acreditando ser remédio real às vezes realmente melhoram. A crença afeta fisiologia."
      },
      {
        pergunta: "Por que sentimos medo?",
        opcoes: [
          "É sinal de fraqueza",
          "Para nos proteger de perigos reais ou percebidos",
          "Por falta de inteligência",
          "Só acontece em crianças"
        ],
        correta: 1,
        fato: "😨 O medo ativa a amígdala cerebral e libera adrenalina: coração acelera, músculos se preparam para correr ou lutar. É o sistema de alarme que manteve humanos vivos por milhões de anos!"
      }
    ]
  },
  {
    id: "cri_inventor_4",
    tipo: "inventor",
    titulo: "Inventor da Arte Digital",
    descricao: "Onde tecnologia e criatividade artística se encontram!",
    emoji: "🎨",
    habilidade: "Arte e Tecnologia",
    xp_reward: 155,
    coins_reward: 155,
    tempo_estimado: 15,
    historinha: "Arte e tecnologia nunca estiveram tão próximas! 🎨 Músicos usam IA para compor, pintores usam tablets, cineastas criam mundos inteiros no computador. Mas ainda há muito a inventar nessa área. Que ferramenta você criaria para artistas do futuro?",
    inspiracoes: [
      "Um instrumento musical que qualquer pessoa pode tocar só com gestos no ar, sem precisar estudar música por anos",
      "Um app que transforma descrições em texto em obras de arte no estilo de qualquer artista famoso da história",
      "Uma tela digital que simula exatamente a textura de tintas, aquarela e lápis para artistas que querem criar digitalmente"
    ]
  },
  {
    id: "cri_inventor_5",
    tipo: "inventor",
    titulo: "Inventor do Transporte",
    descricao: "Repense como pessoas e coisas se movem no mundo!",
    emoji: "🚆",
    habilidade: "Engenharia de Mobilidade",
    xp_reward: 155,
    coins_reward: 155,
    tempo_estimado: 15,
    historinha: "O carro revolucionou o século XX. A internet mudou o século XXI. O próximo salto no transporte pode vir de você! 🚆 Trânsito, poluição, desigualdade no acesso — os problemas são reais. Qual é a sua solução?",
    inspiracoes: [
      "Um sistema de ônibus autônomo que calcula em tempo real a rota mais eficiente baseado em onde as pessoas precisam ir",
      "Patinetes compartilhados com IA que se movem sozinhos para onde há mais demanda na cidade",
      "Uma bicicleta elétrica dobrável que cabe em uma mochila e percorre 100km com uma única carga"
    ]
  }
]

// ── Formas geométricas ──
export const formasExtraPorFaixa = [
  {
    id: "cri_formas_arte",
    tipo: "formas",
    titulo: "Geometria nas Artes",
    descricao: "Como artistas usam formas geométricas para criar obras!",
    emoji: "🎨",
    habilidade: "Geometria",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Arte e geometria sempre caminharam juntas! 🎨 Mondrian usava retângulos, Escher explorava ilusões geométricas, e os islâmicos criaram mosaicos com polígonos perfeitos há mil anos.",
    dados: {
      formas: [
        {
          id: "mondrian",
          nome: "Mondrian — Retângulos",
          cor: "#EF9F27",
          svg: "rect",
          frase: "Mondrian pintava apenas com retângulos e cores primárias!",
          detalhe: "Piet Mondrian (1872-1944) criou o neoplasticismo: apenas linhas horizontais/verticais pretas + retângulos vermelhos, azuis, amarelos, brancos. Reduziu a arte à geometria pura."
        },
        {
          id: "escher",
          nome: "Escher — Pavimentações",
          cor: "#7F77DD",
          svg: "hex",
          frase: "Escher criou pavimentações impossíveis!",
          detalhe: "M.C. Escher (1898-1972) usou simetria de translação e rotação para criar peixes que viram pássaros, escadas que sobem para baixo. Estudou cristalografia para criar seus padrões!"
        },
        {
          id: "islâmico",
          nome: "Arte Islâmica — Estrelas",
          cor: "#D4537E",
          svg: "star",
          frase: "Mosaicos islâmicos usam estrelas de 8 a 12 pontas!",
          detalhe: "Arte islâmica (séc. X-XV): o Islã proibiu figuras humanas na arte religiosa, então matemáticos criaram padrões geométricos perfeitos. A Alhambra tem os 17 tipos de simetria do plano!"
        },
        {
          id: "bauhaus",
          nome: "Bauhaus — Formas Básicas",
          cor: "#4F8EE8",
          svg: "circle",
          frase: "Bauhaus: design a partir de formas primitivas!",
          detalhe: "Escola Bauhaus (1919-1933): Kandinsky associou formas a cores: triângulo=amarelo, quadrado=vermelho, círculo=azul. \"A forma segue a função\" — princípio do design industrial moderno."
        },
        {
          id: "pointil",
          nome: "Pontilhismo — Círculos",
          cor: "#1D9E75",
          svg: "circle",
          frase: "Seurat pintou com pontos (círculos) de cor!",
          detalhe: "Georges Seurat (1886): \"Sunday on La Grande Jatte\" feita de milhões de pontos de cor pura. O olho mistura as cores automaticamente. TV e monitores usam o mesmo princípio (pixels RGB)!"
        },
        {
          id: "perspective",
          nome: "Perspectiva — Ponto de Fuga",
          cor: "#D85A30",
          svg: "triangle",
          frase: "Perspectiva cria a ilusão de profundidade!",
          detalhe: "Brunelleschi (1415) descobriu a perspectiva linear: linhas paralelas convergem num ponto de fuga. Da Vinci e Rafael dominariam esta técnica. Base de toda renderização 3D moderna em computadores."
        },
        {
          id: "golden_art",
          nome: "Proporção Áurea na Arte",
          cor: "#EF9F27",
          svg: "rect",
          frase: "Da Vinci usou φ na Mona Lisa!",
          detalhe: "O rosto da Mona Lisa está inscrito em retângulo áureo. \"Homem Vitruviano\" de Da Vinci demonstra proporções áureas do corpo. Le Corbusier usou φ em toda sua arquitetura moderna."
        },
        {
          id: "origami_art",
          nome: "Origami — Geometria Dobrada",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🦢",
          frase: "Origami é geometria feita de papel!",
          detalhe: "Origami moderno (pós-1960) usa matemática rigorosa. Robert Lang (ex-NASA) desenvolveu o TreeMaker — software que calcula o padrão de dobras para qualquer animal com n pernas e n galhos."
        }
      ]
    }
  },
  {
    id: "cri_formas_coordenadas",
    tipo: "formas",
    titulo: "Geometria Analítica e Coordenadas",
    descricao: "Como descrever formas com números e equações!",
    emoji: "📊",
    habilidade: "Geometria",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Descartes teve a ideia genial de descrever formas com coordenadas (x, y)! 📊 Isso une a geometria e a álgebra — e é a base de toda computação gráfica, GPS e design de jogos.",
    dados: {
      formas: [
        {
          id: "plano",
          nome: "Plano Cartesiano",
          cor: "#4F8EE8",
          svg: "square",
          frase: "Descartes inventou o plano cartesiano (x, y)!",
          detalhe: "René Descartes (1637): \"La Géométrie\". Conta a lenda que ele observou uma mosca no teto e percebeu que podia localizar qualquer ponto com 2 números. Genial!"
        },
        {
          id: "linha",
          nome: "Equação da Reta",
          cor: "#1D9E75",
          svg: "rect",
          frase: "y = mx + b — toda reta tem essa equação!",
          detalhe: "y = mx + b: m é a inclinação (slope), b é onde cruza o eixo y. m=0: reta horizontal. m=∞: reta vertical. Duas retas paralelas têm o mesmo m!"
        },
        {
          id: "circulo_eq",
          nome: "Equação do Círculo",
          cor: "#D4537E",
          svg: "circle",
          frase: "x² + y² = r² — a equação do círculo!",
          detalhe: "Todo ponto (x,y) que satisfaz x²+y²=r² está a distância r do centro (0,0). Centro em (a,b): (x-a)²+(y-b)²=r². Radares e sonares usam círculos de varredura!"
        },
        {
          id: "parabola",
          nome: "Parábola",
          cor: "#EF9F27",
          svg: "triangle",
          frase: "y = x² — a parábola está em toda parte!",
          detalhe: "A trajetória de uma bola lançada é uma parábola. Satélites de antena parabólica concentram sinais no foco da parábola. Cada espelho de telescópio é parabólico — direciona a luz para um ponto!"
        },
        {
          id: "dist",
          nome: "Distância entre Pontos",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "📐",
          frase: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
          detalhe: "Teorema de Pitágoras em coordenadas! A diagonal de um triângulo retângulo com catetos (x₂-x₁) e (y₂-y₁). GPS calcula trilhões dessas distâncias por segundo para te localizar."
        },
        {
          id: "mediatriz",
          nome: "Mediatriz e Circuncentro",
          cor: "#D85A30",
          svg: "triangle",
          frase: "O circuncentro é equidistante dos 3 vértices!",
          detalhe: "Mediatriz: perpendicular ao meio de cada lado. As 3 mediatrizes de um triângulo se encontram no circuncentro — centro do círculo circunscrito. Usado em triangulação de GPS e redes Wi-Fi!"
        },
        {
          id: "vetores",
          nome: "Vetores e Direções",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "➡️",
          frase: "Vetores têm módulo e direção!",
          detalhe: "Um vetor (a, b) diz \"vá a unidades na direção x e b na direção y\". GPS, física, computação gráfica e robótica usam vetores para descrever movimento, força e posição."
        },
        {
          id: "matrix",
          nome: "Matrizes e Transformações",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🎮",
          frase: "Rotações e reflexões viram multiplicações de matrizes!",
          detalhe: "Girar um ponto (x,y) em θ graus: multiplique pela matriz de rotação 2×2. GPUs fazem bilhões de multiplicações de matriz por segundo para renderizar jogos 3D em tempo real!"
        }
      ]
    }
  },
  {
    id: "cri_formas_circulos",
    tipo: "formas",
    titulo: "O Mundo dos Círculos",
    descricao: "Propriedades avançadas do círculo — a forma perfeita!",
    emoji: "⭕",
    habilidade: "Geometria",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "O círculo é a forma mais especial da matemática! ⭕ É o único que tem infinitos eixos de simetria. Desde π até trigonometria — tudo passa pelo círculo.",
    dados: {
      formas: [
        {
          id: "pi",
          nome: "Pi (π) — A Constante do Círculo",
          cor: "#7F77DD",
          svg: "circle",
          frase: "π = 3,14159265... — irracional e infinito!",
          detalhe: "π = C/d para qualquer círculo. É irracional (não é fração) e transcendente (não é raiz de polinômio). Calculado até 100 trilhões de casas decimais. Mnemônico: \"Sou o pi, número irracional...\""
        },
        {
          id: "arco",
          nome: "Arco e Ângulo Central",
          cor: "#4F8EE8",
          svg: "circle",
          frase: "Ângulo central = ângulo do arco correspondente!",
          detalhe: "Um ângulo central de 90° corresponde a 1/4 do círculo (arco de comprimento πr/2). Ângulo inscrito = metade do central para o mesmo arco (Teorema do Ângulo Inscrito)."
        },
        {
          id: "corda",
          nome: "Corda e Secante",
          cor: "#D4537E",
          svg: "circle",
          frase: "A corda mais longa é o diâmetro!",
          detalhe: "Corda: segmento com extremos no círculo. Secante: reta que corta o círculo em 2 pontos. Teorema das cordas: PA×PB = PC×PD (produto dos segmentos iguais)."
        },
        {
          id: "tangente",
          nome: "Tangente ao Círculo",
          cor: "#EF9F27",
          svg: "circle",
          frase: "Tangente toca o círculo em exatamente 1 ponto!",
          detalhe: "A tangente é perpendicular ao raio no ponto de tangência. Pneus tocam o chão em uma única linha — relação de tangência com a Terra. Limites do cálculo usam tangentes!"
        },
        {
          id: "theodoro",
          nome: "Espiral de Teodoro",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🌀",
          frase: "Raízes quadradas em espiral!",
          detalhe: "Construção geométrica: √1, √2, √3, √4... formam uma espiral de triângulos retângulos. Descoberta por Teodoro de Cirene (430 a.C.). Demonstração visual das raízes irracionais."
        },
        {
          id: "trig",
          nome: "Trigonometria — Círculo Unitário",
          cor: "#D85A30",
          svg: "circle",
          frase: "seno e cosseno vivem no círculo de raio 1!",
          detalhe: "Para ângulo θ, o ponto no círculo unitário é (cos θ, sen θ). Sin²θ + cos²θ = 1 sempre. Base de todo som digital, sinal de rádio, GPS e processamento de imagem!"
        },
        {
          id: "inversao",
          nome: "Inversão no Círculo",
          cor: "#534AB7",
          svg: "circle",
          frase: "Inversão transforma círculos em retas!",
          detalhe: "Inversão: ponto P → P' tal que OP×OP' = r². Círculos passando pelo centro viram retas. Círculos não passando pelo centro viram círculos. Base de conformal mapping e cartografia."
        },
        {
          id: "aneis",
          nome: "Anéis Olímpicos e Venn",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🏅",
          frase: "Círculos que se intersectam criam intersecções!",
          detalhe: "5 anéis olímpicos representam os 5 continentes. O diagrama de Venn usa círculos sobrepostos para mostrar intersecção de conjuntos. Intersecção: região em comum. União: tudo junto."
        }
      ]
    }
  },
  {
    id: "cri_formas_solidos3d",
    tipo: "formas",
    titulo: "Poliedros de Platão e Arquimedes",
    descricao: "Os sólidos perfeitos e semi-perfeitos em 3 dimensões!",
    emoji: "💎",
    habilidade: "Geometria",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "Platão acreditava que 5 formas perfeitas formavam o universo. 💎 Depois, Arquimedes encontrou 13 sólidos semi-regulares. Vamos explorar a família dos poliedros notáveis!",
    dados: {
      formas: [
        {
          id: "tetra",
          nome: "Tetraedro — Fogo",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🔺",
          frase: "4 faces triangulares — o mais simples dos 5!",
          detalhe: "V=4, A=6, F=4 → V−A+F=2. Platão: representa fogo (pontas agudas \"cortam\"). Ângulo diedro: arccos(1/3)≈70,5°. Dois tetraedros unidos formam a estrela de Davi em 3D!"
        },
        {
          id: "cubo3",
          nome: "Cubo — Terra",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "📦",
          frase: "6 faces quadradas — único que preenche o espaço!",
          detalhe: "V=8, A=12, F=6. Platão: representa terra (estabilidade). Único dos 5 que tapa o espaço 3D sozinho. Dual: octaedro. Diagonal: a√3 (onde a = aresta)."
        },
        {
          id: "octa",
          nome: "Octaedro — Ar",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "💎",
          frase: "8 faces triangulares — dual do cubo!",
          detalhe: "V=6, A=12, F=8. Platão: representa ar. Dual do cubo: conecte centros das faces do cubo → octaedro. Ângulo diedro: arccos(−1/3)≈109,5° = ângulo de ligação do metano (CH₄)!"
        },
        {
          id: "dodeca",
          nome: "Dodecaedro — Cosmos",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🌸",
          frase: "12 faces pentagonais — ligado a φ!",
          detalhe: "V=20, A=30, F=12. Platão: cosmos/universo. Cada vértice usa a proporção áurea φ. Dual: icosaedro. Simetria de grupo: I_h com 120 simetrias — o mais simétrico dos 5!"
        },
        {
          id: "icosa",
          nome: "Icosaedro — Água",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "⬡",
          frase: "20 faces triangulares — vírus usam esse formato!",
          detalhe: "V=12, A=30, F=20. Platão: água. Vírus adenovírus têm simetria icosaédrica — maximiza volume com mínima proteína (eficiência biológica!). Dual: dodecaedro."
        },
        {
          id: "cubocta",
          nome: "Cuboctaedro (Arquimedes)",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "💠",
          frase: "14 faces: 8 triângulos + 6 quadrados!",
          detalhe: "O cuboctaedro é \"quasi-regular\" — cada aresta é compartilhada entre 1 triângulo e 1 quadrado. Buckminster Fuller o usou como base do Vector Equilibrium — o único sólido sem vetor de tensão!"
        },
        {
          id: "futebol",
          nome: "Icosaedro Truncado",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "⚽",
          frase: "A bola de futebol é um icosaedro truncado!",
          detalhe: "12 pentágonos negros + 20 hexágonos brancos = 32 faces. Igual ao C₆₀ (Buckminsterfulereno), carbono descoberto em 1985 (Nobel 1996). É o sólido de Arquimedes mais famoso!"
        },
        {
          id: "euler2",
          nome: "Fórmula de Euler — V−A+F=2",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🔢",
          frase: "Funciona para TODOS os poliedros convexos!",
          detalhe: "Euler (1758): Vértices − Arestas + Faces = 2. Prova que só 5 poliedros regulares existem. Para toro (donut): V−A+F=0. A característica de Euler mede o número de \"furos\"!"
        }
      ]
    }
  },
  {
    id: "cri_formas_padroes",
    tipo: "formas",
    titulo: "Padrões e Pavimentações",
    descricao: "Como formas se encaixam para cobrir uma superfície!",
    emoji: "🔲",
    habilidade: "Geometria",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Pavimentações cobrem superfícies sem lacunas ou sobreposições. 🔲 Da Alhambra ao seu piso em casa — todas usam matemática de simetria. Existem exatamente 17 tipos de padrão de pavimentação!",
    dados: {
      formas: [
        {
          id: "regular",
          nome: "Pavimentações Regulares",
          cor: "#4F8EE8",
          svg: "hex",
          frase: "Só 3 polígonos regulares pavimentam o plano!",
          detalhe: "Triângulo equilátero (6 por vértice: 6×60°=360°), quadrado (4 por vértice: 4×90°=360°) e hexágono (3 por vértice: 3×120°=360°). Qualquer outro ângulo não fecha 360°!"
        },
        {
          id: "semi_reg",
          nome: "Pavimentações Semi-regulares",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🔷",
          frase: "8 tipos combinam polígonos regulares diferentes!",
          detalhe: "Ex: 3.3.3.4.4 = 3 triângulos e 2 quadrados em cada vértice. Descobertas por Kepler em 1619. A Alhambra de Granada usa variações de todas as 8!"
        },
        {
          id: "escher2",
          nome: "Pavimentações de Escher",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🦅",
          frase: "Escher transformava quadrados em pássaros!",
          detalhe: "Escher modificava formas geométricas simples (quadrado, triângulo) por translação e rotação até virarem figuras reconhecíveis (peixe, pássaro, lagarto). 135 pavimentações no total!"
        },
        {
          id: "penrose",
          nome: "Pavimentação de Penrose",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "💠",
          frase: "Padrão infinito sem repetição — quasicristal!",
          detalhe: "Roger Penrose (1974): dois losangos que pavimentam o plano sem nunca se repetir (aperiódica). Corresponde à estrutura dos quasicristais (Nobel 2011). Contém a proporção áurea em toda parte!"
        },
        {
          id: "grupos_simetria",
          nome: "17 Grupos de Simetria do Plano",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🌸",
          frase: "Toda pavimentação plana tem um desses 17 padrões!",
          detalhe: "Fedorov (1891) e Pólya (1924): existem exatamente 17 grupos de simetria do plano (wallpaper groups). A Alhambra tem exemplos de todos os 17 — descoberto por Escher numa visita em 1936!"
        },
        {
          id: "fractal_p",
          nome: "Fractais como Pavimentação",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🌀",
          frase: "Fractais pavimentam com auto-similaridade!",
          detalhe: "IFS (Iterated Function Systems): aplique transformações repetidas e emerge um fractal. Exemplos: triângulo de Sierpinski, carpete de Cantor. Base de algoritmos de compressão de imagem fractal (anos 90)."
        },
        {
          id: "virolo",
          nome: "Padrões Virais — Icosaedro",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🦠",
          frase: "Vírus usam pavimentação triangular em 3D!",
          detalhe: "Capsídeos virais são icosaédricos porque é o poliedro regular que minimiza o número de tipos de proteína necessários (apenas 1 proteína para 20 triângulos). Evolução descobriu geometria antes de nós!"
        },
        {
          id: "wang",
          nome: "Wang Tiles — Computação",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "💻",
          frase: "Tijolos coloridos que criam padrões computados!",
          detalhe: "Hao Wang (1961): pode qualquer conjunto de tijolos pavimentar o plano? Equivalente à computabilidade! GPUs usam Wang tiles para gerar texturas infinitas (grama, pedra, nuvem) com baixo custo de memória."
        }
      ]
    }
  },
  {
    id: "cri_formas_vetorial",
    tipo: "formas",
    titulo: "Geometria Vetorial e Design",
    descricao: "Como formas vetoriais funcionam em design gráfico!",
    emoji: "✏️",
    habilidade: "Geometria",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Logos, ícones e fontes são todos feitos com geometria vetorial! ✏️ Ao contrário de fotos (pixels), vetores nunca perdem qualidade ao ampliar — porque são equações matemáticas de formas.",
    dados: {
      formas: [
        {
          id: "pixel_vs",
          nome: "Pixel vs. Vetor",
          cor: "#4F8EE8",
          svg: "square",
          frase: "Pixels ficam borrados; vetores ficam nítidos!",
          detalhe: "Raster (PNG, JPG): grade de pixels. Zoom → pixelado. Vetor (SVG, PDF, AI): equações matemáticas. Zoom infinito, sempre nítido. Logos e fontes DEVEM ser vetoriais por isso!"
        },
        {
          id: "bezier2",
          nome: "Curvas de Bézier",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "✏️",
          frase: "Adobe Illustrator usa Bézier para cada curva!",
          detalhe: "Bézier cúbica: 4 pontos de controle P0, P1, P2, P3. P(t) = (1−t)³P0 + 3(1−t)²tP1 + 3(1-t)t²P2 + t³P3. Inventada por Pierre Bézier para carrocerias da Renault em 1962."
        },
        {
          id: "pentools",
          nome: "Pen Tool e Âncoras",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🎯",
          frase: "A Pen Tool do Illustrator traça Bézier!",
          detalhe: "Cada clique cria uma âncora (ponto de controle). Arrastar controla as alças (tangentes). Feche o caminho e você tem uma forma. Toda a tipografia e logos mundiais foram criados assim."
        },
        {
          id: "svg",
          nome: "SVG — Gráfico Vetorial Web",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🌐",
          frase: "SVG usa XML para descrever formas matematicamente!",
          detalhe: "<circle cx=\"50\" cy=\"50\" r=\"40\"/> cria um círculo exato. SVG é texto puro: pode editar no bloco de notas! Todos os ícones da web, logos e ilustrações responsivas são SVG."
        },
        {
          id: "fontes",
          nome: "Tipografia — Letras como Vetores",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🔤",
          frase: "Cada letra é um conjunto de curvas Bézier!",
          detalhe: "Fontes TrueType/OpenType: cada caractere definido por curvas Bézier quadráticas ou cúbicas. Arial tem ~100 pontos por letra. Por isso fontes são nítidas em qualquer tamanho de tela!"
        },
        {
          id: "grade",
          nome: "Grid e Razões Áureas no Design",
          cor: "#D85A30",
          svg: "rect",
          frase: "Todo bom design usa uma grade geométrica!",
          detalhe: "Regra dos terços: divide o frame em 9 retângulos. Proporção áurea: divide em φ:1. Grids de 8px/12col: base do Bootstrap, Material Design. A geometria é invisível mas governa todo design."
        },
        {
          id: "logo",
          nome: "Logos Geométricos Famosos",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🍎",
          frase: "Apple, Nike, Mercedes — geometria pura!",
          detalhe: "Apple: círculo com mordida (círculo menor). Nike: curva Bézier simples. Mercedes: triângulo inscrito em círculo. Shell: geométrico desde 1900. Logos simples geométricos sobrevivem décadas."
        },
        {
          id: "responsive",
          nome: "Design Responsivo e Proporções",
          cor: "#D4537E",
          svg: "rect",
          frase: "Telas de 4K a celular usam a mesma geometria!",
          detalhe: "Aspect ratio 16:9 (HD), 4:3 (antigo), 21:9 (ultra-wide): todos são retângulos em proporção fixa. Design responsivo: mesma geometria, escala diferente. CSS Grid usa proporções matemáticas automaticamente."
        }
      ]
    }
  },
  {
    id: "cri_formas_tangram",
    tipo: "formas",
    titulo: "Tangram — 7 Peças, Mil Formas",
    descricao: "O puzzle milenar que mostra como formas se combinam!",
    emoji: "🧩",
    habilidade: "Raciocínio Espacial",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "O tangram é um puzzle chinês de 4.000 anos feito de 7 peças geométricas! 🧩 Com essas 7 peças você pode criar centenas de figuras — pessoas, animais, objetos e formas abstratas. Tudo com a mesma área!",
    dados: {
      formas: [
        {
          id: "tan_tri_g",
          nome: "Triângulo Grande (×2)",
          cor: "#D85A30",
          svg: "triangle",
          frase: "2 triângulos grandes formam um quadrado!",
          detalhe: "Cada triângulo grande = 1/4 da área total. Juntos = 1/2 da área. Hipotenusa = diagonal do quadrado original. São as maiores peças e definem o contorno das figuras."
        },
        {
          id: "tan_tri_m",
          nome: "Triângulo Médio (×1)",
          cor: "#4F8EE8",
          svg: "triangle",
          frase: "O triângulo médio = 1/8 da área total!",
          detalhe: "Metade de um triângulo grande. Lados na proporção 1:1:√2. Pode ser substituído por 2 triângulos pequenos. Frequentemente forma as pernas e braços das figuras humanas."
        },
        {
          id: "tan_tri_p",
          nome: "Triângulo Pequeno (×2)",
          cor: "#1D9E75",
          svg: "triangle",
          frase: "2 triângulos pequenos formam um triângulo médio!",
          detalhe: "Cada triângulo pequeno = 1/16 da área total. São os mais versáteis — podem substituir qualquer peça em pares. Detalhes finos das figuras (orelhas, bicos, rabos)."
        },
        {
          id: "tan_quad",
          nome: "Quadrado (×1)",
          cor: "#EF9F27",
          svg: "square",
          frase: "O quadrado = 2 triângulos pequenos!",
          detalhe: "Peça única do tangram. Diagonal = lado × √2. Frequentemente representa cabeças, maçanetas, janelas. Área = 1/8 do total."
        },
        {
          id: "tan_paralelo",
          nome: "Paralelogramo (×1)",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "▱",
          frase: "Única peça que não tem eixo de simetria!",
          detalhe: "O paralelogramo é a única peça do tangram que pode ser espelhada — cria 2 configurações diferentes no quebra-cabeça. Área = 1/8. Frequentemente forma o corpo e caudas de animais."
        },
        {
          id: "tan_total",
          nome: "As 7 Peças Juntas",
          cor: "#7F77DD",
          svg: "square",
          frase: "Todas as 7 peças formam o quadrado original!",
          detalhe: "2 triângulos grandes + 1 médio + 2 pequenos + 1 quadrado + 1 paralelogramo = 16 triângulos pequenos = quadrado perfeito. A área total é sempre a mesma em qualquer figura!"
        },
        {
          id: "tan_figuras",
          nome: "6.500 Figuras Catalogadas",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🦢",
          frase: "Mais de 6.500 figuras de tangram catalogadas!",
          detalhe: "Desde 1813, matemáticos catalogaram figuras de tangram. Existem 13 formas convexas (sem \"reentrâncias\") — prova matemática de que não existem mais. Sam Loyd criou o \"Livro dos Tangrams\" em 1903."
        },
        {
          id: "tan_paradoxo",
          nome: "Paradoxo do Tangram",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🤔",
          frase: "Duas figuras idênticas, uma com um \"buraco\"!",
          detalhe: "Dudeney (1903): duas figuras de monge parecem idênticas mas uma tem 2 pés e a outra não tem nenhum. Como? Uma usa o paralelogramo invertido, redistribuindo a área de forma imperceptível. Ilusão perfeita!"
        }
      ]
    }
  },
  {
    id: "cri_formas_avancadas",
    tipo: "formas",
    titulo: "Polígonos Avançados",
    descricao: "Explore polígonos com muitos lados e suas propriedades matemáticas!",
    emoji: "🔷",
    habilidade: "Geometria",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Quanto mais lados um polígono tem, mais ele se parece com um círculo! 🔷 Vamos explorar polígonos de 5 a 12 lados e descobrir as regras matemáticas que governam suas formas.",
    dados: {
      formas: [
        {
          id: "pentagono",
          nome: "Pentágono (5)",
          cor: "#4F8EE8",
          svg: "polygon_5",
          frase: "Pentágono: 5 lados, soma de ângulos = 540°",
          detalhe: "Fórmula da soma: (n−2)×180° = 3×180° = 540° | Cada ângulo interno = 108° | Relacionado à proporção áurea φ"
        },
        {
          id: "hexagono",
          nome: "Hexágono (6)",
          cor: "#1D9E75",
          svg: "hex",
          frase: "Hexágono: 6 lados, soma de ângulos = 720°",
          detalhe: "(6−2)×180° = 720° | Cada ângulo = 120° | Únicos polígonos que preenchem o plano: triângulo, quadrado, hexágono"
        },
        {
          id: "heptagono",
          nome: "Heptágono (7)",
          cor: "#D4537E",
          svg: "polygon_7",
          frase: "Heptágono: 7 lados, soma de ângulos = 900°",
          detalhe: "(7−2)×180° = 900° | Cada ângulo ≈128,57° | Não pode pavimentar o plano por si só — ângulos não encaixam"
        },
        {
          id: "octagono",
          nome: "Octógono (8)",
          cor: "#EF9F27",
          svg: "polygon_8",
          frase: "Octógono: 8 lados, soma de ângulos = 1080°",
          detalhe: "(8−2)×180° = 1080° | Cada ângulo = 135° | Com quadrados, pode pavimentar o plano (padrão xadrez duplo)"
        },
        {
          id: "decagono",
          nome: "Decágono (10)",
          cor: "#7F77DD",
          svg: "polygon_10",
          frase: "Decágono: 10 lados, soma = 1440°",
          detalhe: "(10−2)×180° = 1440° | Cada ângulo = 144° | 144° não fecha uma volta inteira: 360° ÷ 144° = 2,5"
        },
        {
          id: "dodecagono",
          nome: "Dodecágono (12)",
          cor: "#D85A30",
          svg: "polygon_12",
          frase: "Dodecágono: 12 lados, soma = 1800°",
          detalhe: "(12−2)×180° = 1800° | Cada ângulo = 150° | Quanto maior n, mais próximo do círculo (ângulos → 180°)"
        }
      ]
    }
  },
  {
    id: "cri_formas_simetria",
    tipo: "formas",
    titulo: "Eixos de Simetria",
    descricao: "Descubra quantos eixos de simetria cada forma possui!",
    emoji: "🔮",
    habilidade: "Geometria",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Uma forma é simétrica quando você pode dobrá-la ao meio e os dois lados coincidem perfeitamente. 🔮 Cada forma tem um número diferente de eixos de simetria — e o círculo tem infinitos!",
    dados: {
      formas: [
        {
          id: "circulo",
          nome: "Círculo",
          cor: "#7F77DD",
          svg: "circle",
          frase: "O círculo tem infinitos eixos de simetria!",
          detalhe: "Qualquer reta que passe pelo centro é um eixo de simetria. Por isso o círculo é a forma mais \"perfeita\"!"
        },
        {
          id: "quadrado",
          nome: "Quadrado",
          cor: "#D85A30",
          svg: "square",
          frase: "O quadrado tem 4 eixos de simetria!",
          detalhe: "2 eixos pelos lados (horizontal e vertical) + 2 pelas diagonais. Rotação de 90° parece igual!"
        },
        {
          id: "triangulo",
          nome: "Triângulo Equil.",
          cor: "#EF9F27",
          svg: "triangle",
          frase: "O triângulo equilátero tem 3 eixos!",
          detalhe: "Cada eixo vai de um vértice ao meio do lado oposto. Rotação de 120° parece igual!"
        },
        {
          id: "retangulo",
          nome: "Retângulo",
          cor: "#1D9E75",
          svg: "rect",
          frase: "O retângulo tem 2 eixos de simetria!",
          detalhe: "Apenas pelo meio de cada par de lados. NÃO tem eixo pelas diagonais (diferente do quadrado)!"
        },
        {
          id: "pentagono",
          nome: "Pentágono",
          cor: "#4F8EE8",
          svg: "polygon_5",
          frase: "O pentágono tem 5 eixos de simetria!",
          detalhe: "Um para cada vértice → meio do lado oposto. A estrela de 5 pontas tem os mesmos 5 eixos!"
        },
        {
          id: "hexagono",
          nome: "Hexágono",
          cor: "#534AB7",
          svg: "hex",
          frase: "O hexágono tem 6 eixos de simetria!",
          detalhe: "3 pelos vértices opostos + 3 pelos meios dos lados opostos. Flocos de neve seguem essa simetria!"
        },
        {
          id: "losango",
          nome: "Losango",
          cor: "#D4537E",
          svg: "diamond",
          frase: "O losango tem 2 eixos de simetria!",
          detalhe: "Pelas duas diagonais. Os lados são iguais mas os ângulos não são 90° (diferente do quadrado)!"
        },
        {
          id: "estrela",
          nome: "Estrela de 5 Pontas",
          cor: "#EF9F27",
          svg: "star",
          frase: "A estrela tem 5 eixos de simetria!",
          detalhe: "Cada eixo passa por uma ponta e pelo meio côncavo oposto. O pentagrama é famoso na geometria sagrada!"
        }
      ]
    }
  }
]

// ── Inglês — vocabulário, flashcards, frases e leitura ──
export const inglesExtraPorFaixa = [
  {
    id: "cri_ingles",
    tipo: "ingles",
    titulo: "Inglês — Gramática",
    descricao: "Complete frases com o verbo correto e aprenda o presente simples!",
    emoji: "🇺🇸",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "Desafie sua gramática em inglês completando frases com os verbos corretos!"
  },
  {
    id: "cri_ingles_passado",
    tipo: "ingles",
    titulo: "Inglês — Simple Past",
    descricao: "Aprenda a usar o passado simples em inglês!",
    emoji: "📅",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "O que você fez ontem? O Simple Past conta histórias do passado em inglês!",
    dados: {
      frases: [
        {
          frase: "She ___ to the park yesterday.",
          opcoes: ["go", "goes", "went", "gone"],
          correta: 2,
          explicacao: "\"Went\" é o passado de \"go\". Verbos irregulares têm formas próprias!"
        },
        {
          frase: "They ___ a movie last night.",
          opcoes: ["watch", "watches", "watched", "watching"],
          correta: 2,
          explicacao: "Verbos regulares no passado: adicione -ed. Watch → Watched."
        },
        {
          frase: "I ___ pizza for lunch.",
          opcoes: ["eat", "ate", "eated", "eating"],
          correta: 1,
          explicacao: "\"Ate\" é o passado de \"eat\". Eat → Ate (verbo irregular)."
        },
        {
          frase: "He ___ his homework.",
          opcoes: ["did", "done", "do", "does"],
          correta: 0,
          explicacao: "\"Did\" é o passado de \"do\". Do → Did (verbo irregular)."
        },
        {
          frase: "We ___ at the beach last summer.",
          opcoes: ["are", "were", "was", "be"],
          correta: 1,
          explicacao: "\"Were\" é o passado de \"are\". We were = Nós estávamos."
        },
        {
          frase: "The dog ___ the ball.",
          opcoes: ["catch", "caught", "catched", "catching"],
          correta: 1,
          explicacao: "\"Caught\" é o passado de \"catch\". Catch → Caught (irregular)."
        },
        {
          frase: "She ___ very tired last night.",
          opcoes: ["is", "are", "was", "were"],
          correta: 2,
          explicacao: "\"Was\" é o passado de \"is\". She was = Ela estava."
        },
        {
          frase: "They ___ the game yesterday.",
          opcoes: ["wins", "win", "won", "winning"],
          correta: 2,
          explicacao: "\"Won\" é o passado de \"win\". Win → Won (irregular)."
        },
        {
          frase: "I ___ a great book last week.",
          opcoes: ["read", "readed", "reading", "reads"],
          correta: 0,
          explicacao: "\"Read\" no passado tem a mesma grafia mas pronúncia diferente! /rɛd/"
        },
        {
          frase: "My sister ___ a beautiful song.",
          opcoes: ["sang", "singed", "sings", "sing"],
          correta: 0,
          explicacao: "\"Sang\" é o passado de \"sing\". Sing → Sang (irregular)."
        }
      ]
    }
  },
  {
    id: "cri_ingles_futuro",
    tipo: "ingles",
    titulo: "Inglês — Futuro (Will/Going to)",
    descricao: "Aprenda a falar sobre o futuro em inglês!",
    emoji: "🔮",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "O que vai acontecer no futuro? Aprenda will e going to para planejar em inglês!",
    dados: {
      frases: [
        {
          frase: "It ___ rain tomorrow.",
          opcoes: ["will", "going to", "is going to", "would"],
          correta: 0,
          explicacao: "Para previsões gerais sobre o futuro, use \"will\". Will + verbo base."
        },
        {
          frase: "I ___ go to the gym later.",
          opcoes: ["am going to", "will going", "goes to", "going"],
          correta: 0,
          explicacao: "\"Am going to\" indica plano já decidido. To be + going to + verbo."
        },
        {
          frase: "She ___ be a great doctor someday.",
          opcoes: ["is going to", "will", "going to", "would"],
          correta: 1,
          explicacao: "Para opiniões ou previsões gerais: use \"will\". Will + verbo base."
        },
        {
          frase: "They ___ travel to Japan next year.",
          opcoes: ["are going to", "will going to", "going to", "goes to"],
          correta: 0,
          explicacao: "\"Are going to\" = plano definido para o futuro. To be + going to."
        },
        {
          frase: "We ___ a test tomorrow.",
          opcoes: ["are going to", "will be going", "going to have", "will have"],
          correta: 3,
          explicacao: "\"Will have\" = will + verbo base \"have\". As outras opções não completam a frase."
        },
        {
          frase: "Look at those clouds! It ___ rain!",
          opcoes: ["will", "is going to", "goes to", "would"],
          correta: 1,
          explicacao: "Evidência visual = \"is going to\". Vemos a evidência (nuvens), então is going to."
        },
        {
          frase: "I promise I ___ help you.",
          opcoes: ["will", "am going to", "goes to", "would"],
          correta: 0,
          explicacao: "Promessas e decisões na hora: sempre use \"will\"!"
        },
        {
          frase: "The movie ___ at 8 PM.",
          opcoes: ["is going to", "will be starting at", "start", "will start"],
          correta: 3,
          explicacao: "Horários e programações: \"will start\" = will + verbo base."
        },
        {
          frase: "I ___ not eat junk food anymore.",
          opcoes: ["won't", "am not going to", "don't will", "will not be"],
          correta: 0,
          explicacao: "\"Won't\" = will not (forma contraída). Decisão/promessa negativa."
        },
        {
          frase: "___ you help me with this?",
          opcoes: ["Will", "Going to", "Are going", "Would be"],
          correta: 0,
          explicacao: "Pedidos: \"Will you...?\" = Você vai...? / Você pode...?"
        }
      ]
    }
  },
  {
    id: "cri_ingles_continuo",
    tipo: "ingles",
    titulo: "Inglês — Present Continuous",
    descricao: "Aprenda ações que estão acontecendo agora!",
    emoji: "⏳",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "O que está acontecendo agora? O Present Continuous descreve ações em andamento!",
    dados: {
      frases: [
        {
          frase: "She ___ a book right now.",
          opcoes: ["reads", "is reading", "read", "are reading"],
          correta: 1,
          explicacao: "\"Is reading\" = presente contínuo. She + is + verbo-ing."
        },
        {
          frase: "They ___ football in the park.",
          opcoes: ["play", "are playing", "is playing", "plays"],
          correta: 1,
          explicacao: "\"Are playing\" = They + are + verbo-ing. They tem \"are\"."
        },
        {
          frase: "I ___ for the bus.",
          opcoes: ["wait", "waiting", "am waiting", "is waiting"],
          correta: 2,
          explicacao: "\"Am waiting\" = I + am + verbo-ing. I sempre usa \"am\"."
        },
        {
          frase: "He ___ music in his room.",
          opcoes: ["listen", "is listening", "are listening", "listened"],
          correta: 1,
          explicacao: "\"Is listening\" = He + is + verbo-ing. Presente contínuo!"
        },
        {
          frase: "We ___ dinner with our family.",
          opcoes: ["having", "have", "are having", "is having"],
          correta: 2,
          explicacao: "\"Are having\" = We + are + verbo-ing. Cuidado: \"have\" vira \"having\"."
        },
        {
          frase: "The children ___ in the garden.",
          opcoes: ["run", "are running", "is running", "running"],
          correta: 1,
          explicacao: "\"Are running\" = plural + are + verbo-ing. \"Run\" dobra o \"n\": running."
        },
        {
          frase: "She ___ not ___ now.",
          opcoes: ["is / working", "are / working", "is / work", "am / work"],
          correta: 0,
          explicacao: "\"Is not working\" = She + is + not + verbo-ing. Negativa."
        },
        {
          frase: "___ he ___ to music?",
          opcoes: ["Is / listening", "Are / listening", "Is / listens", "Does / listening"],
          correta: 0,
          explicacao: "Pergunta: Is + sujeito + verbo-ing? \"Is he listening?\""
        },
        {
          frase: "The cat ___ on the sofa.",
          opcoes: ["is sleeping", "are sleeping", "sleeps", "sleep"],
          correta: 0,
          explicacao: "\"Is sleeping\" = The cat (singular) + is + verbo-ing."
        },
        {
          frase: "What ___ you ___ right now?",
          opcoes: ["are / doing", "is / doing", "do / do", "are / do"],
          correta: 0,
          explicacao: "\"What are you doing?\" = Pergunta no presente contínuo com \"you\"."
        }
      ]
    }
  },
  {
    id: "cri_ingles_adjetivos",
    tipo: "ingles",
    titulo: "Inglês — Adjetivos e Descrição",
    descricao: "Aprenda a descrever pessoas, lugares e coisas!",
    emoji: "✨",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "Adjetivos dão cor e vida às frases! Aprenda a descrever tudo em inglês!",
    dados: {
      frases: [
        {
          frase: "She is ___ than her sister.",
          opcoes: ["tall", "taller", "tallest", "more tall"],
          correta: 1,
          explicacao: "Comparativo de adjetivos curtos: adicione -er. Tall → Taller."
        },
        {
          frase: "This is the ___ book in the library.",
          opcoes: ["interesting", "more interesting", "most interesting", "interestinger"],
          correta: 2,
          explicacao: "Superlativo de adjetivos longos: \"the most + adjetivo\"."
        },
        {
          frase: "He is ___ than I expected.",
          opcoes: ["smarter", "more smart", "smartest", "most smart"],
          correta: 0,
          explicacao: "Smart (1 sílaba): comparativo = smarter. Adjetivos curtos: +er."
        },
        {
          frase: "This pizza is ___ than the other one.",
          opcoes: ["good", "gooder", "better", "best"],
          correta: 2,
          explicacao: "\"Better\" é o comparativo irregular de \"good\". Good → Better → Best."
        },
        {
          frase: "The weather today is ___ than yesterday.",
          opcoes: ["bad", "worse", "worst", "badder"],
          correta: 1,
          explicacao: "\"Worse\" é o comparativo irregular de \"bad\". Bad → Worse → Worst."
        },
        {
          frase: "She is ___ singer in the class.",
          opcoes: ["beautiful", "more beautiful", "the most beautiful", "beautifullest"],
          correta: 2,
          explicacao: "Adjetivos longos (3+ sílabas): \"the most + adjetivo\" para superlativo."
        },
        {
          frase: "This is ___ difficult exercise.",
          opcoes: ["a", "an", "the", "one"],
          correta: 0,
          explicacao: "\"A\" antes de consoante: \"a difficult\". \"An\" antes de vogal: \"an easy\"."
        },
        {
          frase: "He is ___ person I know.",
          opcoes: ["funnier", "most funny", "the funniest", "more funny"],
          correta: 2,
          explicacao: "Funny (2 sílabas terminado em -y): superlativo = the funniest. -y → -iest."
        },
        {
          frase: "This movie is ___ boring than the last one.",
          opcoes: ["more", "much", "very", "most"],
          correta: 0,
          explicacao: "\"More\" para comparativos de adjetivos longos: \"more boring\"."
        },
        {
          frase: "She is ___ student in the school.",
          opcoes: ["a best", "the better", "the best", "most good"],
          correta: 2,
          explicacao: "\"The best\" = superlativo de \"good\". The + superlativo."
        }
      ]
    }
  },
  {
    id: "cri_ingles_perguntas",
    tipo: "ingles",
    titulo: "Inglês — Formação de Perguntas",
    descricao: "Aprenda a fazer perguntas em inglês!",
    emoji: "❓",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "Perguntar é a chave do conhecimento! Aprenda a estrutura das perguntas em inglês!",
    dados: {
      frases: [
        {
          frase: "___ do you live?",
          opcoes: ["What", "Where", "When", "Why"],
          correta: 1,
          explicacao: "\"Where\" pergunta lugar. Where do you live? = Onde você mora?"
        },
        {
          frase: "___ is your birthday?",
          opcoes: ["Where", "Who", "When", "How"],
          correta: 2,
          explicacao: "\"When\" pergunta tempo/momento. When is your birthday? = Quando é seu aniversário?"
        },
        {
          frase: "___ is your favorite color?",
          opcoes: ["When", "Where", "What", "Who"],
          correta: 2,
          explicacao: "\"What\" pergunta coisas/informações. What is...? = Qual é...?"
        },
        {
          frase: "___ is that girl over there?",
          opcoes: ["What", "Why", "Where", "Who"],
          correta: 3,
          explicacao: "\"Who\" pergunta sobre pessoas. Who is that? = Quem é aquela?"
        },
        {
          frase: "___ are you crying?",
          opcoes: ["Where", "What", "Why", "When"],
          correta: 2,
          explicacao: "\"Why\" pergunta motivo/razão. Why are you...? = Por que você...?"
        },
        {
          frase: "___ many students are in the class?",
          opcoes: ["How", "What", "Which", "Where"],
          correta: 0,
          explicacao: "\"How many\" pergunta quantidade (contável). How many = Quantos/as?"
        },
        {
          frase: "___ do you go to school?",
          opcoes: ["What", "Why", "How", "Which"],
          correta: 2,
          explicacao: "\"How\" pergunta de que forma/modo. How do you...? = Como você...?"
        },
        {
          frase: "___ book do you prefer?",
          opcoes: ["What", "Which", "Who", "Where"],
          correta: 1,
          explicacao: "\"Which\" escolhe entre opções específicas. Which book = Qual livro (destes)?"
        },
        {
          frase: "___ does she work?",
          opcoes: ["What", "Where", "Who", "Why"],
          correta: 1,
          explicacao: "\"Where does she work?\" = Onde ela trabalha? Does = auxiliar do presente simples (she)."
        },
        {
          frase: "___ often do you exercise?",
          opcoes: ["What", "Where", "How", "When"],
          correta: 2,
          explicacao: "\"How often\" pergunta frequência. How often = Com que frequência?"
        }
      ]
    }
  },
  {
    id: "cri_ingles_plurais",
    tipo: "ingles",
    titulo: "Inglês — Plurais e Irregulares",
    descricao: "Aprenda as regras de plural e os irregulares!",
    emoji: "🔢",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "Um, dois, três... em inglês! Aprenda as regras de plural e os casos especiais!",
    dados: {
      frases: [
        {
          frase: "I have two ___ (child).",
          opcoes: ["childs", "childrens", "children", "children's"],
          correta: 2,
          explicacao: "\"Children\" é o plural irregular de \"child\". Sem -s!"
        },
        {
          frase: "The ___ (man) are tall.",
          opcoes: ["mans", "men", "manes", "man"],
          correta: 1,
          explicacao: "\"Men\" é o plural irregular de \"man\". Man → Men."
        },
        {
          frase: "I see three ___ (mouse) in the lab.",
          opcoes: ["mouses", "mousse", "mice", "mouse"],
          correta: 2,
          explicacao: "\"Mice\" é o plural irregular de \"mouse\". Mouse → Mice."
        },
        {
          frase: "She has two ___ (tooth) missing.",
          opcoes: ["tooths", "teeth", "toothes", "tooth"],
          correta: 1,
          explicacao: "\"Teeth\" é o plural irregular de \"tooth\". Tooth → Teeth."
        },
        {
          frase: "The ___ (sheep) are in the field.",
          opcoes: ["sheeps", "sheepes", "sheep", "a sheep"],
          correta: 2,
          explicacao: "\"Sheep\" não muda no plural! Singular e plural são iguais."
        },
        {
          frase: "There are many ___ (box) on the floor.",
          opcoes: ["boxs", "boxes", "boxies", "boxen"],
          correta: 1,
          explicacao: "Palavras terminadas em -x, -s, -ch, -sh: adicione -es. Box → Boxes."
        },
        {
          frase: "She studies at two ___ (university).",
          opcoes: ["universitys", "universities", "universityes", "universiti"],
          correta: 1,
          explicacao: "Consoante + y: troque o -y por -ies. University → Universities."
        },
        {
          frase: "Three ___ (knife) are on the table.",
          opcoes: ["knifes", "knives", "knifes", "knife"],
          correta: 1,
          explicacao: "Palavras terminadas em -fe: troque por -ves. Knife → Knives."
        },
        {
          frase: "Two ___ (foot) are in the shoe.",
          opcoes: ["foots", "feets", "feet", "foot"],
          correta: 2,
          explicacao: "\"Feet\" é o plural irregular de \"foot\". Foot → Feet."
        },
        {
          frase: "The ___ (person) in line are waiting.",
          opcoes: ["persons", "people", "persons", "peoplies"],
          correta: 1,
          explicacao: "\"People\" é o plural irregular de \"person\". Person → People."
        }
      ]
    }
  },
  {
    id: "cri_ingles_comparativo",
    tipo: "ingles",
    titulo: "Inglês — Comparações e Contraste",
    descricao: "Aprenda a comparar e contrastar em inglês!",
    emoji: "⚖️",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "Tudo na vida se compara! Aprenda as estruturas de comparação em inglês!",
    dados: {
      frases: [
        {
          frase: "Cats are ___ noisy ___ dogs.",
          opcoes: ["as / as", "more / than", "less / than", "not / as"],
          correta: 0,
          explicacao: "\"As + adjetivo + as\" = tão...quanto. Cats are as noisy as dogs = Gatos são tão barulhentos quanto cachorros."
        },
        {
          frase: "Brazil is ___ than Portugal.",
          opcoes: ["bigger", "more big", "biggest", "big"],
          correta: 0,
          explicacao: "Adjetivos curtos (big): comparativo = bigger. Big → Bigger (dobra a consoante)."
        },
        {
          frase: "This test is ___ difficult ___ the last one.",
          opcoes: ["more / than", "as / as", "more / as", "most / than"],
          correta: 0,
          explicacao: "\"More + adjetivo longo + than\" = mais...do que. More difficult than."
        },
        {
          frase: "He runs ___ fast ___ his brother.",
          opcoes: ["not as / as", "as / as", "less / than", "more / than"],
          correta: 1,
          explicacao: "\"As fast as\" = tão rápido quanto. Mesma velocidade!"
        },
        {
          frase: "This phone is ___ expensive ___ that one.",
          opcoes: ["less / than", "fewer / than", "little / than", "worst / than"],
          correta: 0,
          explicacao: "\"Less + adjetivo + than\" = menos...do que. Contrário de \"more\"."
        },
        {
          frase: "She speaks English ___ than I do.",
          opcoes: ["more fluently", "fluently more", "most fluently", "fluenter"],
          correta: 0,
          explicacao: "Advérbios: \"more + advérbio + than\". More fluently than."
        },
        {
          frase: "Tokyo has ___ people ___ any city in Brazil.",
          opcoes: ["more / than", "most / than", "much / as", "many / then"],
          correta: 0,
          explicacao: "\"More + substantivo contável + than\". More people than = mais pessoas do que."
        },
        {
          frase: "I prefer coffee ___ tea.",
          opcoes: ["to", "than", "as", "more"],
          correta: 0,
          explicacao: "Prefer + objeto + to + objeto. I prefer A to B = Prefiro A a B."
        },
        {
          frase: "The ___ you study, the ___ you learn.",
          opcoes: ["more / more", "more / most", "most / more", "many / much"],
          correta: 0,
          explicacao: "\"The more...the more...\" = Quanto mais...mais... Estrutura de proporção."
        },
        {
          frase: "She is ___ as talented ___ her sister.",
          opcoes: ["not / as", "not / than", "less / as", "more / as"],
          correta: 0,
          explicacao: "\"Not as + adjetivo + as\" = não tão...quanto. Comparação negativa de igualdade."
        }
      ]
    }
  },
  {
    id: "cri_ingles_preposicoes",
    tipo: "ingles",
    titulo: "Inglês — Preposições",
    descricao: "Aprenda preposições de lugar, tempo e movimento!",
    emoji: "📍",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "As preposições conectam o mundo! Aprenda in, on, at e muito mais!",
    dados: {
      frases: [
        {
          frase: "The book is ___ the table.",
          opcoes: ["in", "on", "at", "by"],
          correta: 1,
          explicacao: "\"On\" para superfícies. The book is on the table = O livro está sobre a mesa."
        },
        {
          frase: "She was born ___ 1995.",
          opcoes: ["in", "on", "at", "by"],
          correta: 0,
          explicacao: "\"In\" para anos, meses e estações. Born in 1995 = Nasceu em 1995."
        },
        {
          frase: "I have class ___ Monday.",
          opcoes: ["in", "at", "on", "by"],
          correta: 2,
          explicacao: "\"On\" para dias da semana e datas. On Monday = Na segunda-feira."
        },
        {
          frase: "The meeting is ___ 9 AM.",
          opcoes: ["in", "on", "at", "by"],
          correta: 2,
          explicacao: "\"At\" para horários específicos e pontos. At 9 AM = Às 9 da manhã."
        },
        {
          frase: "The cat is ___ the box.",
          opcoes: ["on", "in", "at", "by"],
          correta: 1,
          explicacao: "\"In\" para dentro de algo. The cat is in the box = O gato está dentro da caixa."
        },
        {
          frase: "I will see you ___ the weekend.",
          opcoes: ["on", "at", "in", "by"],
          correta: 0,
          explicacao: "\"On the weekend\" (inglês americano) = No final de semana."
        },
        {
          frase: "She sat ___ me during the movie.",
          opcoes: ["next", "beside", "next to", "by next"],
          correta: 2,
          explicacao: "\"Next to\" = ao lado de. She sat next to me = Ela sentou ao meu lado."
        },
        {
          frase: "He walked ___ the bridge.",
          opcoes: ["above", "over", "across", "through"],
          correta: 2,
          explicacao: "\"Across\" = atravessando (de um lado ao outro). He walked across the bridge."
        },
        {
          frase: "The plane flew ___ the clouds.",
          opcoes: ["under", "across", "through", "below"],
          correta: 2,
          explicacao: "\"Through\" = através de (passando pelo interior). Flew through the clouds."
        },
        {
          frase: "I will finish ___ Friday.",
          opcoes: ["until", "in", "by", "on"],
          correta: 2,
          explicacao: "\"By\" = até (data limite). By Friday = até sexta. Diferente de \"on Friday\" (na sexta)."
        }
      ]
    }
  },
  {
    id: "cri_ingles_quantificadores",
    tipo: "ingles",
    titulo: "Inglês — Quantificadores",
    descricao: "Some, any, much, many, few, little e mais!",
    emoji: "🔢",
    habilidade: "Inglês",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 14,
    historinha: "Quanto? Quantos? Poucos? Muitos? Aprenda os quantificadores em inglês!",
    dados: {
      frases: [
        {
          frase: "I have ___ money left.",
          opcoes: ["many", "few", "little", "a few"],
          correta: 2,
          explicacao: "\"Little\" para incontáveis (money, water). Little money = pouco dinheiro."
        },
        {
          frase: "There are ___ students absent today.",
          opcoes: ["little", "much", "a few", "a little"],
          correta: 2,
          explicacao: "\"A few\" para contáveis (students, books). A few = alguns poucos."
        },
        {
          frase: "Do you have ___ water?",
          opcoes: ["any", "some", "many", "a few"],
          correta: 0,
          explicacao: "\"Any\" em perguntas e negativas para incontáveis. Do you have any water?"
        },
        {
          frase: "I want ___ coffee, please.",
          opcoes: ["any", "many", "some", "few"],
          correta: 2,
          explicacao: "\"Some\" em afirmativas e ofertas. I want some coffee = Quero um pouco de café."
        },
        {
          frase: "How ___ people were at the party?",
          opcoes: ["much", "many", "few", "little"],
          correta: 1,
          explicacao: "\"How many\" para contáveis (people, chairs). How many people? = Quantas pessoas?"
        },
        {
          frase: "How ___ time do we have?",
          opcoes: ["many", "few", "much", "little"],
          correta: 2,
          explicacao: "\"How much\" para incontáveis (time, money). How much time? = Quanto tempo?"
        },
        {
          frase: "There aren't ___ tickets left.",
          opcoes: ["some", "any", "much", "little"],
          correta: 1,
          explicacao: "\"Any\" em frases negativas. There aren't any tickets = Não há ingressos."
        },
        {
          frase: "She has ___ friends but they are great.",
          opcoes: ["a little", "little", "few", "any"],
          correta: 2,
          explicacao: "\"Few\" (sem \"a\") enfatiza a pequena quantidade de algo contável: quase nenhum."
        },
        {
          frase: "I have ___ milk — maybe one glass.",
          opcoes: ["few", "little", "a little", "any"],
          correta: 2,
          explicaca: "\"A little\" enfatiza que existe alguma quantidade (mesmo que pouca) de algo incontável."
        },
        {
          frase: "Every student ___ a textbook.",
          opcoes: ["have", "has", "having", "had"],
          correta: 1,
          explicacao: "\"Every\" é singular → verbo no singular. Every student has = Cada aluno tem."
        }
      ]
    }
  }
]

// ── Números ──
export const numerosExtraPorFaixa = [
  {
    id: "cri_numeros_negativos",
    tipo: "numeros",
    titulo: "Números Negativos",
    descricao: "Explore os números abaixo do zero!",
    emoji: "🌡️",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Os números não param no zero! 🌡️ Assim como a temperatura pode ficar abaixo de zero em dias frios, os números também existem do lado negativo. Vamos explorá-los!",
    dados: {
      numeros: [
        {
          n: -5,
          display: "−5",
          word: "Menos Cinco",
          emoji: "🥶",
          cor: "#4F8EE8",
          funfato: "−5°C é frio! Na Antártida, a temperatura pode chegar a −89°C."
        },
        {
          n: -4,
          display: "−4",
          word: "Menos Quatro",
          emoji: "❄️",
          cor: "#7F77DD",
          funfato: "−4°C já é bem abaixo de zero — a água do mar congela por volta de −2°C!"
        },
        {
          n: -3,
          display: "−3",
          word: "Menos Três",
          emoji: "🌨️",
          cor: "#4F8EE8",
          funfato: "O fundo do oceano Ártico fica em torno de −2 a −3°C."
        },
        {
          n: -2,
          display: "−2",
          word: "Menos Dois",
          emoji: "🧊",
          cor: "#1D9E75",
          funfato: "Gelo seco (CO₂ sólido) é −78°C — muito mais frio que gelo normal!"
        },
        {
          n: -1,
          display: "−1",
          word: "Menos Um",
          emoji: "🌬️",
          cor: "#7F77DD",
          funfato: "Em dívidas, −1 significa que você deve 1. É o oposto de ter!"
        },
        {
          n: 0,
          display: "0",
          word: "Zero",
          emoji: "🎯",
          cor: "#D4537E",
          funfato: "Zero foi inventado na Índia e é um dos números mais importantes da matemática!"
        },
        {
          n: 1,
          display: "+1",
          word: "Mais Um",
          emoji: "🌤️",
          cor: "#EF9F27",
          funfato: "+1 e −1 são opostos. Somados, se cancelam: 1 + (−1) = 0!"
        },
        {
          n: 2,
          display: "+2",
          word: "Mais Dois",
          emoji: "🌞",
          cor: "#D85A30",
          funfato: "A reta numérica vai de −∞ a +∞. Zero está bem no meio!"
        },
        {
          n: 3,
          display: "+3",
          word: "Mais Três",
          emoji: "☀️",
          cor: "#EF9F27",
          funfato: "No golfe, −3 é bem melhor que +3 — quanto menor o número, melhor a jogada!"
        },
        {
          n: 4,
          display: "+4",
          word: "Mais Quatro",
          emoji: "🌈",
          cor: "#1D9E75",
          funfato: "Elevadores usam −1 para subsolo e +1, +2... para andares acima."
        },
        {
          n: 5,
          display: "+5",
          word: "Mais Cinco",
          emoji: "🔥",
          cor: "#D4537E",
          funfato: "Temperatura corporal normal é +36,5°C — bem longe do zero!"
        }
      ]
    }
  },
  {
    id: "cri_numeros_romanos",
    tipo: "numeros",
    titulo: "Numerais Romanos",
    descricao: "Aprenda o sistema de números usado pelos romanos!",
    emoji: "🏛️",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Os antigos romanos não usavam os números que conhecemos! 🏛️ Eles criaram um sistema com letras que ainda vemos em relógios, filmes e monumentos. Descubra cada um!",
    dados: {
      numeros: [
        {
          n: 1,
          display: "I",
          word: "Um",
          emoji: "👆",
          cor: "#EF9F27",
          funfato: "I vem de uma marca vertical — como um dedo levantado!"
        },
        {
          n: 2,
          display: "II",
          word: "Dois",
          emoji: "✌️",
          cor: "#D4537E",
          funfato: "II = dois Is. Simples assim! O sistema romano é aditivo."
        },
        {
          n: 3,
          display: "III",
          word: "Três",
          emoji: "🤟",
          cor: "#7F77DD",
          funfato: "III = três Is. Mas 4 não é IIII — você sabe por quê?"
        },
        {
          n: 4,
          display: "IV",
          word: "Quatro",
          emoji: "🕓",
          cor: "#4F8EE8",
          funfato: "IV = 5−1. I antes de V significa subtrair! Isso se chama \"subtração romana\"."
        },
        {
          n: 5,
          display: "V",
          word: "Cinco",
          emoji: "✋",
          cor: "#1D9E75",
          funfato: "V vem da forma da mão aberta — V é o espaço entre polegar e os dedos!"
        },
        {
          n: 6,
          display: "VI",
          word: "Seis",
          emoji: "🎲",
          cor: "#D85A30",
          funfato: "VI = V + I = 5 + 1 = 6. Agora o I vem depois e soma!"
        },
        {
          n: 7,
          display: "VII",
          word: "Sete",
          emoji: "🌟",
          cor: "#EF9F27",
          funfato: "VII = 5 + 2. Os romanos usavam esse sistema para fazer contas!"
        },
        {
          n: 8,
          display: "VIII",
          word: "Oito",
          emoji: "🐙",
          cor: "#D4537E",
          funfato: "VIII = 5 + 3. O maior número com só Is e Vs! Depois vem IX."
        },
        {
          n: 9,
          display: "IX",
          word: "Nove",
          emoji: "🔮",
          cor: "#7F77DD",
          funfato: "IX = 10−1. I antes de X subtrai! Filmes usam IX para numerar sequências."
        },
        {
          n: 10,
          display: "X",
          word: "Dez",
          emoji: "❌",
          cor: "#4F8EE8",
          funfato: "X vem de dois Vs cruzados (V + V = X). Ainda aparece nos Jogos Olímpicos!"
        }
      ]
    }
  },
  {
    id: "cri_numeros_quadrados",
    tipo: "numeros",
    titulo: "Quadrados Perfeitos",
    descricao: "Números que são o resultado de um número vezes ele mesmo!",
    emoji: "⬛",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Quadrado perfeito é um número que pode ser disposto em forma de quadrado! ⬛ 4 pontos formam um quadrado 2×2, 9 formam um 3×3. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 1,
          display: "1²=1",
          word: "Um",
          emoji: "⬛",
          cor: "#EF9F27",
          funfato: "1² = 1. Um é seu próprio quadrado! 1×1=1 — quadrado de lado 1.",
          detalhe: "Qualquer número elevado a zero = 1 | 1ⁿ = 1 para qualquer n"
        },
        {
          n: 4,
          display: "2²=4",
          word: "Quatro",
          emoji: "🔲",
          cor: "#D4537E",
          funfato: "2² = 4. Um tabuleiro 2×2 tem 4 casas — o menor quadrado!",
          detalhe: "Primeiro quadrado não-trivial | 4 é par e quadrado perfeito"
        },
        {
          n: 9,
          display: "3²=9",
          word: "Nove",
          emoji: "🟧",
          cor: "#7F77DD",
          funfato: "3² = 9. Soma 9 = soma dos dígitos sempre: 3²=9, 3³=27 (2+7=9)!",
          detalhe: "Propriedade especial do 9: múltiplos de 9 somam 9"
        },
        {
          n: 16,
          display: "4²=16",
          word: "Dezesseis",
          emoji: "🎯",
          cor: "#4F8EE8",
          funfato: "4² = 16. Um tabuleiro 4×4 tem 16 casas — como no jogo 2048!",
          detalhe: "4×4 = 16 | Hexadecimal: 16 dígitos (0-9, A-F)"
        },
        {
          n: 25,
          display: "5²=25",
          word: "Vinte e Cinco",
          emoji: "💰",
          cor: "#1D9E75",
          funfato: "5² = 25. 25 centavos = um quarto de real — 4×25=100!",
          detalhe: "5×5 = 25 | Usado em escala musical (temperamento igual)"
        },
        {
          n: 36,
          display: "6²=36",
          word: "Trinta e Seis",
          emoji: "📐",
          cor: "#D85A30",
          funfato: "6² = 36. Produto dos dígitos 3×6=18, ainda múltiplo de 9!",
          detalhe: "6×6 = 36 | Trigonometria: sen²+cos²=1 generaliza"
        },
        {
          n: 49,
          display: "7²=49",
          word: "Quarenta e Nove",
          emoji: "🌟",
          cor: "#EF9F27",
          funfato: "7² = 49. Sete vezes sete dá 49 — e 49 é 50 menos 1!",
          detalhe: "7×7 = 49 | Único quadrado perfeito entre 36 e 64"
        },
        {
          n: 64,
          display: "8²=64",
          word: "Sessenta e Quatro",
          emoji: "♟️",
          cor: "#D4537E",
          funfato: "8² = 64. O tabuleiro de xadrez tem 64 casas — 8×8!",
          detalhe: "8×8 = 64 = 2⁶ | Computadores de 64 bits | DNA: 64 códons"
        },
        {
          n: 81,
          display: "9²=81",
          word: "Oitenta e Um",
          emoji: "🔢",
          cor: "#7F77DD",
          funfato: "9² = 81. O Sudoku tem 81 casas — 9 grades de 9 casas cada!",
          detalhe: "9×9 = 81 | Sudoku: 9×9 = 81 células"
        },
        {
          n: 100,
          display: "10²=100",
          word: "Cem",
          emoji: "💯",
          cor: "#4F8EE8",
          funfato: "10² = 100. 100% = cem por cento = perfeito!",
          detalhe: "10×10 = 100 | Base do sistema métrico | Percentagem"
        }
      ]
    }
  },
  {
    id: "cri_numeros_primos",
    tipo: "numeros",
    titulo: "Números Primos",
    descricao: "Os blocos construtores de todos os números!",
    emoji: "🔑",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Primos são números especiais: só se dividem por 1 e por eles mesmos! 🔑 Toda criptografia da internet depende deles. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 2,
          display: "2",
          word: "Dois",
          emoji: "✌️",
          cor: "#4F8EE8",
          funfato: "2 é o único número par primo — todo par >2 é divisível por 2!",
          detalhe: "Único primo par | Todos os outros primos são ímpares"
        },
        {
          n: 3,
          display: "3",
          word: "Três",
          emoji: "🔺",
          cor: "#1D9E75",
          funfato: "3 é primo! Teste: some os dígitos — se der 3/6/9, é divisível por 3.",
          detalhe: "Teste de divisibilidade: soma dos dígitos divisível por 3"
        },
        {
          n: 5,
          display: "5",
          word: "Cinco",
          emoji: "✋",
          cor: "#D4537E",
          funfato: "5 é primo — todo número terminado em 0 ou 5 é divisível por 5!",
          detalhe: "Teste: termina em 0 ou 5 → divisível por 5"
        },
        {
          n: 7,
          display: "7",
          word: "Sete",
          emoji: "🎲",
          cor: "#7F77DD",
          funfato: "7 é primo — não há teste simples para 7, por isso é o mais \"difícil\"!",
          detalhe: "Primo popular | Base da semana | Sem teste simples de divisibilidade"
        },
        {
          n: 11,
          display: "11",
          word: "Onze",
          emoji: "⚽",
          cor: "#EF9F27",
          funfato: "11 é primo! Teste: alterne + e − nos dígitos; se der 0 ou 11, é divisível.",
          detalhe: "Teste: dígitos alternados | 11 jogadores por time no futebol"
        },
        {
          n: 13,
          display: "13",
          word: "Treze",
          emoji: "🌟",
          cor: "#D85A30",
          funfato: "13 é primo e considerado número da sorte em várias culturas!",
          detalhe: "Primo | Considerado \"mágico\" | 13 estados fundadores dos EUA"
        },
        {
          n: 17,
          display: "17",
          word: "Dezessete",
          emoji: "💫",
          cor: "#4F8EE8",
          funfato: "17 é primo — aparece muito em sequências matemáticas especiais!",
          detalhe: "Número de Fermat: 2⁴+1=17 | Gauss desenhou o polígono de 17 lados"
        },
        {
          n: 19,
          display: "19",
          word: "Dezenove",
          emoji: "🚀",
          cor: "#1D9E75",
          funfato: "19 é primo — e começa o padrão dos primos gêmeos (17,19) e (41,43)!",
          detalhe: "Primo gêmeo com 17 (diferença 2) | Próximo par: 29,31"
        },
        {
          n: 23,
          display: "23",
          word: "Vinte e Três",
          emoji: "🔬",
          cor: "#D4537E",
          funfato: "23 pares de cromossomos no DNA humano — e 23 é primo!",
          detalhe: "23 cromossomos pares | Coincidência com a biologia | Primo"
        },
        {
          n: 29,
          display: "29",
          word: "Vinte e Nove",
          emoji: "🌙",
          cor: "#7F77DD",
          funfato: "Fevereiro tem 28 ou 29 dias — e 29 é primo!",
          detalhe: "Primo | Ano bissexto: 29 de fevereiro | Ciclo lunar: 29.5 dias"
        }
      ]
    }
  },
  {
    id: "cri_numeros_fracoes",
    tipo: "numeros",
    titulo: "Frações Importantes",
    descricao: "Os números entre inteiros — frações essenciais!",
    emoji: "½",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Nem sempre os números são inteiros — às vezes precisamos de partes! ½ Frações representam pedaços de um todo. Clique em 🔊 e descubra cada uma!",
    dados: {
      numeros: [
        {
          n: 0,
          display: "0",
          word: "Zero",
          emoji: "○",
          cor: "#9E9E9E",
          funfato: "Zero é o ponto de partida — nem positivo nem negativo!",
          detalhe: "Inventado na Índia (Brahmagupta, séc. VII) | Conceito revolucionário"
        },
        {
          n: 1,
          display: "½",
          word: "Um Meio",
          emoji: "🍕",
          cor: "#D4537E",
          funfato: "½ = 0.5 = 50% — a pizza dividida ao meio!",
          detalhe: "1÷2=0.5 | 50% | A mais intuitiva das frações | \"Meio\" no dia a dia"
        },
        {
          n: 1,
          display: "⅓",
          word: "Um Terço",
          emoji: "🔺",
          cor: "#7F77DD",
          funfato: "⅓ ≈ 0.333... — a dízima periódica mais famosa!",
          detalhe: "1÷3=0.333... | Dízima infinita | Três terços = 1 inteiro"
        },
        {
          n: 1,
          display: "¼",
          word: "Um Quarto",
          emoji: "🕓",
          cor: "#4F8EE8",
          funfato: "¼ do dia = 6 horas. ¼ de hora = 15 minutos!",
          detalhe: "1÷4=0.25 | 25% | Quatro quartos = 1 inteiro"
        },
        {
          n: 1,
          display: "⅕",
          word: "Um Quinto",
          emoji: "⭐",
          cor: "#1D9E75",
          funfato: "⅕ = 0.2 = 20% — cada ponta de estrela de 5 pontas é um quinto!",
          detalhe: "1÷5=0.2 | 20% | Cinco quintos = 1 inteiro"
        },
        {
          n: 2,
          display: "⅔",
          word: "Dois Terços",
          emoji: "🎯",
          cor: "#EF9F27",
          funfato: "⅔ ≈ 0.667 — dois em três, como aprovação com maioria qualificada!",
          detalhe: "2÷3=0.666... | 66.7% | Maioria qualificada em votações"
        },
        {
          n: 3,
          display: "¾",
          word: "Três Quartos",
          emoji: "⏰",
          cor: "#D85A30",
          funfato: "¾ de hora = 45 minutos. ¾ é 75% — nota boa!",
          detalhe: "3÷4=0.75 | 75% | Uma nota ótima | 45 minutos = ¾ hora"
        },
        {
          n: 1,
          display: "⅛",
          word: "Um Oitavo",
          emoji: "🎵",
          cor: "#D4537E",
          funfato: "⅛ de compasso musical = colcheia — nota rápida na música!",
          detalhe: "1÷8=0.125 | 12.5% | Colcheia em música | Oito oitavos = 1"
        }
      ]
    }
  },
  {
    id: "cri_numeros_binario",
    tipo: "numeros",
    titulo: "Sistema Binário",
    descricao: "A linguagem dos computadores: apenas 0 e 1!",
    emoji: "💻",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Computadores não entendem números como nós! 💻 Eles só conhecem 0 e 1. Com apenas dois dígitos, dá para expressar qualquer número. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 0,
          display: "0",
          word: "Zero",
          emoji: "⚫",
          cor: "#212121",
          funfato: "0 em binário = 0. Um bit apagado!",
          detalhe: "Bit = 0 | Tensão ~0V | False no computador"
        },
        {
          n: 1,
          display: "1",
          word: "Um",
          emoji: "💡",
          cor: "#EF9F27",
          funfato: "1 em binário = 1. Um bit aceso!",
          detalhe: "Bit = 1 | Tensão ~5V | True no computador"
        },
        {
          n: 2,
          display: "10",
          word: "Dois",
          emoji: "2️⃣",
          cor: "#4F8EE8",
          funfato: "2 em binário é \"10\" — igual ao 10 decimal mas vale só 2!",
          detalhe: "1×2¹ + 0×2⁰ = 2 | Binário: posições valem 1,2,4,8,16..."
        },
        {
          n: 3,
          display: "11",
          word: "Três",
          emoji: "3️⃣",
          cor: "#1D9E75",
          funfato: "3 = \"11\" binário: 1+2=3. Dois bits acesos!",
          detalhe: "1×2¹ + 1×2⁰ = 3 | O maior número com 2 bits"
        },
        {
          n: 4,
          display: "100",
          word: "Quatro",
          emoji: "4️⃣",
          cor: "#D4537E",
          funfato: "4 = \"100\" binário — novo dígito aparece a cada potência de 2!",
          detalhe: "1×2² = 4 | Mesmo padrão do decimal: 10² = 100"
        },
        {
          n: 7,
          display: "111",
          word: "Sete",
          emoji: "7️⃣",
          cor: "#7F77DD",
          funfato: "7 = \"111\" em binário — todos os bits acesos nos 3 primeiros!",
          detalhe: "4+2+1=7 | Maior com 3 bits | 2³-1 = 7"
        },
        {
          n: 8,
          display: "1000",
          word: "Oito",
          emoji: "8️⃣",
          cor: "#D85A30",
          funfato: "8 = \"1000\" binário — começa o quarto bit!",
          detalhe: "1×2³ = 8 | 8 bits = 1 byte | 256 valores possíveis"
        },
        {
          n: 15,
          display: "1111",
          word: "Quinze",
          emoji: "🔥",
          cor: "#EF9F27",
          funfato: "15 = \"1111\" — 4 bits acesos! 15 = F em hexadecimal!",
          detalhe: "8+4+2+1=15 | Maior com 4 bits | Hex: 0-9,A-F → F=15"
        }
      ]
    }
  },
  {
    id: "cri_numeros_famosos",
    tipo: "numeros",
    titulo: "Números Famosos da Matemática",
    descricao: "Os números mais importantes e fascinantes da matemática!",
    emoji: "🔢",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Alguns números são tão especiais que têm nomes próprios! 🔢 Pi, Euler, Áureo — cada um mudou a história da matemática. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 0,
          display: "0",
          word: "Zero",
          emoji: "🌀",
          cor: "#9E9E9E",
          funfato: "Zero foi inventado na Índia no séc. VII — mudou a matemática para sempre!",
          detalhe: "Brahmagupta (628 d.C.) formalizou o zero | Sistema posicional"
        },
        {
          n: 1,
          display: "1",
          word: "Um",
          emoji: "👆",
          cor: "#EF9F27",
          funfato: "1 é o único número que não é primo nem composto — único na sua categoria!",
          detalhe: "Elemento neutro da multiplicação | 1×n=n | Não primo por convenção"
        },
        {
          n: 2,
          display: "√2",
          word: "Raiz de Dois",
          emoji: "📐",
          cor: "#D4537E",
          funfato: "√2 = 1,41421... — os gregos descobriram que não é fração e ficaram em pânico!",
          detalhe: "Número irracional | Diagonal de quadrado lado 1 | Crise pitagórica"
        },
        {
          n: 3,
          display: "π",
          word: "Pi",
          emoji: "🥧",
          cor: "#7F77DD",
          funfato: "π = 3,14159... — uma das constantes mais famosas do universo!",
          detalhe: "Circunferência ÷ Diâmetro | Irracional e transcendente | ∞ decimais"
        },
        {
          n: 2,
          display: "e",
          word: "Número de Euler",
          emoji: "📈",
          cor: "#4F8EE8",
          funfato: "e = 2,71828... — a base do crescimento exponencial e dos logaritmos!",
          detalhe: "Base do ln natural | Juros compostos | eˣ é sua própria derivada"
        },
        {
          n: 1,
          display: "φ",
          word: "Razão Áurea",
          emoji: "🌻",
          cor: "#F9A825",
          funfato: "φ = 1,618... — aparece em girassóis, conchas e obras de arte!",
          detalhe: "(1+√5)/2 | Proporção áurea | Fibonacci → φ no limite"
        },
        {
          n: -1,
          display: "i²=-1",
          word: "i Imaginário",
          emoji: "🔮",
          cor: "#283593",
          funfato: "i = √(-1) — um número \"impossível\" que descreve fenômenos reais!",
          detalhe: "Unidade imaginária | Números complexos | Essencial em eletrônica"
        },
        {
          n: 0,
          display: "eⁱᵖ+1=0",
          word: "Equação de Euler",
          emoji: "✨",
          cor: "#2E7D32",
          funfato: "e^(iπ)+1=0 — combina os 5 números mais importantes em UMA equação!",
          detalhe: "Euler | e, i, π, 1, 0 | \"Mais bela equação da matemática\""
        }
      ]
    }
  },
  {
    id: "cri_numeros_temperatura",
    tipo: "numeros",
    titulo: "Números de Temperatura",
    descricao: "Os números que medem o calor e o frio!",
    emoji: "🌡️",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "A temperatura é medida por números especiais! 🌡️ De Celsius a Kelvin, cada escala tem marcos importantes. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: -273,
          display: "−273°C",
          word: "Zero Absoluto",
          emoji: "🥶",
          cor: "#283593",
          funfato: "−273,15°C é o zero absoluto — a temperatura mais fria possível no universo!",
          detalhe: "0 Kelvin | Átomos param | Jamais atingido experimentalmente"
        },
        {
          n: 0,
          display: "0°C",
          word: "Zero Graus",
          emoji: "❄️",
          cor: "#4F8EE8",
          funfato: "0°C é onde a água congela — definido por Celsius em 1742!",
          detalhe: "Ponto de fusão do gelo | 273,15K | 32°F | Celsius (1742)"
        },
        {
          n: 20,
          display: "20°C",
          word: "Vinte Graus",
          emoji: "😊",
          cor: "#1D9E75",
          funfato: "20°C é a temperatura de conforto — a maioria dos laboratórios usam 20°C!",
          detalhe: "Temperatura ambiente padrão | Reações químicas medidas aqui"
        },
        {
          n: 37,
          display: "37°C",
          word: "Trinta e Sete",
          emoji: "🤒",
          cor: "#D4537E",
          funfato: "37°C é a temperatura normal do corpo humano — febre acima de 37,5°C!",
          detalhe: "Temperatura retal 37°C | Axilar 36,5°C | Hipotermia: abaixo 35°C"
        },
        {
          n: 100,
          display: "100°C",
          word: "Cem Graus",
          emoji: "💧",
          cor: "#E65100",
          funfato: "100°C — a água ferve! Mas no Everest ferve a 70°C por causa da altitude!",
          detalhe: "Ponto de ebulição ao nível do mar | 373,15K | 212°F | Pressão 1atm"
        },
        {
          n: 5778,
          display: "5.778K",
          word: "Temperatura do Sol",
          emoji: "☀️",
          cor: "#EF9F27",
          funfato: "5.778K é a temperatura superficial do Sol — tipo de estrela G2!",
          detalhe: "Fotosfera solar | 5.504°C | Emite pico em ~500nm (amarelo-verde)"
        }
      ]
    }
  },
  {
    id: "cri_numeros_angulos",
    tipo: "numeros",
    titulo: "Ângulos Notáveis",
    descricao: "Os ângulos que aparecem em toda a geometria e trigonometria!",
    emoji: "📐",
    habilidade: "Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Ângulos notáveis aparecem em triângulos, polígonos e na natureza! 📐 Cada ângulo tem senos e cossenos especiais. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 0,
          display: "0°",
          word: "Zero Graus",
          emoji: "➡️",
          cor: "#9E9E9E",
          funfato: "0°: sem giro — direção horizontal, sen(0)=0, cos(0)=1!",
          detalhe: "sen=0, cos=1 | Posição inicial | Nenhuma inclinação"
        },
        {
          n: 30,
          display: "30°",
          word: "Trinta Graus",
          emoji: "🔺",
          cor: "#1D9E75",
          funfato: "30° aparece no triângulo equilátero dividido ao meio!",
          detalhe: "sen=½, cos=√3/2 | 1/6 de círculo | Triângulo 30-60-90"
        },
        {
          n: 45,
          display: "45°",
          word: "Quarenta e Cinco",
          emoji: "🔀",
          cor: "#EF9F27",
          funfato: "45° é a diagonal perfeita — e o ângulo de lançamento para distância máxima!",
          detalhe: "sen=cos=√2/2 | 1/8 do círculo | Projéteis: alcance máximo a 45°"
        },
        {
          n: 60,
          display: "60°",
          word: "Sessenta Graus",
          emoji: "△",
          cor: "#4F8EE8",
          funfato: "60° é o ângulo do triângulo equilátero — todos os três ângulos iguais!",
          detalhe: "sen=√3/2, cos=½ | Triângulo equilátero | Hexágono: 6×60°=360°"
        },
        {
          n: 90,
          display: "90°",
          word: "Noventa Graus",
          emoji: "📐",
          cor: "#D4537E",
          funfato: "90° é o ângulo reto — o mais importante da geometria!",
          detalhe: "sen=1, cos=0 | Ângulo reto | Teorema de Pitágoras: triângulo 90°"
        },
        {
          n: 120,
          display: "120°",
          word: "Cento e Vinte",
          emoji: "🔶",
          cor: "#7F77DD",
          funfato: "120° é o ângulo interno do hexágono regular — forma das colmeias!",
          detalhe: "4/3 do ângulo reto | Hexágono regular: 6×120°=720° total"
        },
        {
          n: 180,
          display: "180°",
          word: "Cento e Oitenta",
          emoji: "↔️",
          cor: "#D85A30",
          funfato: "180°: linha reta! A soma dos ângulos de qualquer triângulo é 180°!",
          detalhe: "Ângulo raso | Soma de triângulo | sen=0, cos=-1"
        },
        {
          n: 360,
          display: "360°",
          word: "Trezentos e Sessenta",
          emoji: "🔄",
          cor: "#EF9F27",
          funfato: "360°: volta completa! Por que 360? Babilônios usavam base 60!",
          detalhe: "Círculo completo | 2π radianos | Babilônico: 6×60=360"
        }
      ]
    }
  }
]

// ── Sílabas ──
export const silabasExtraPorFaixa = []

// ──────────────────────────────────────────────────────────────────────
// QUIZ — EXPANSÃO (08/08/2026)
// Fecha a faixa em 15 quizzes. Temas novos, sem repetir os 7 que já existiam
// (história do Brasil, ciências avançadas, geografia, matemática, mente, arte,
// ecologia).
// ──────────────────────────────────────────────────────────────────────
export const quizExtraPorFaixa = [
  {
    id: "cri_quiz_corpo",
    tipo: "quiz",
    titulo: "Sistemas do Corpo Humano",
    descricao: "Como os órgãos trabalham juntos dentro de você!",
    emoji: "🫀",
    habilidade: "Pensamento Científico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Seu corpo é uma cidade com milhões de habitantes trabalhando 24 horas por dia. 🫀 Cada sistema tem uma função, e nenhum funciona sozinho. Vamos conhecer a equipe?",
    perguntas: [
      {
        pergunta: "Qual é a função principal do sistema circulatório?",
        opcoes: ["Levar oxigênio e nutrientes às células", "Digerir os alimentos", "Produzir pensamentos", "Sustentar o corpo"],
        correta: 0,
        fato: "🩸 O coração bate cerca de 100 mil vezes por dia. O sangue leva oxigênio na ida e recolhe gás carbônico na volta — é um sistema de entrega e coleta ao mesmo tempo."
      },
      {
        pergunta: "Onde acontece a maior parte da absorção dos nutrientes?",
        opcoes: ["No intestino delgado", "No estômago", "Na boca", "No fígado"],
        correta: 0,
        fato: "🌀 O intestino delgado tem uns 6 metros e é forrado por dobras minúsculas. Se fosse esticado e aberto, a área de absorção seria enorme — muito maior que a de um prato."
      },
      {
        pergunta: "O que o sistema respiratório troca nos pulmões?",
        opcoes: ["Oxigênio por gás carbônico", "Água por sal", "Sangue por ar", "Açúcar por gordura"],
        correta: 0,
        fato: "🫁 A troca acontece nos alvéolos, bolsinhas de parede finíssima. O oxigênio passa para o sangue e o gás carbônico faz o caminho contrário para ser expirado."
      },
      {
        pergunta: "Qual sistema controla e coordena todos os outros?",
        opcoes: ["O sistema nervoso", "O sistema ósseo", "O sistema urinário", "O sistema muscular"],
        correta: 0,
        fato: "🧠 O cérebro é só 2% do peso do corpo, mas consome perto de 20% da energia. Pensar cansa de verdade — não é impressão."
      },
      {
        pergunta: "Para que servem os ossos, além de sustentar o corpo?",
        opcoes: ["Proteger órgãos e produzir células do sangue", "Armazenar água", "Filtrar o ar", "Produzir hormônios do humor"],
        correta: 0,
        fato: "🦴 Dentro de alguns ossos existe a medula óssea, que fabrica as células do sangue. O crânio e as costelas ainda funcionam como armadura."
      }
    ]
  },
  {
    id: "cri_quiz_astronomia",
    tipo: "quiz",
    titulo: "Astronomia",
    descricao: "Estrelas, galáxias e as distâncias absurdas do universo!",
    emoji: "🔭",
    habilidade: "Pensamento Científico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Você apontou o telescópio para o céu e percebeu uma coisa estranha: está olhando para o passado. 🔭 A luz demora para chegar. Vamos entender o que isso significa?",
    perguntas: [
      {
        pergunta: "O que é um ano-luz?",
        opcoes: ["Uma distância", "Um tempo", "Uma velocidade", "Um tipo de estrela"],
        correta: 0,
        fato: "📏 Ano-luz é a distância que a luz percorre em um ano — quase 9,5 trilhões de quilômetros. Apesar do nome, mede espaço, não tempo."
      },
      {
        pergunta: "Em que galáxia fica o nosso Sistema Solar?",
        opcoes: ["Via Láctea", "Andrômeda", "Nebulosa de Órion", "Grande Nuvem"],
        correta: 0,
        fato: "🌌 A Via Láctea tem centenas de bilhões de estrelas. Aquela faixa esbranquiçada que se vê no céu escuro é o disco dela visto de dentro."
      },
      {
        pergunta: "Por que a Lua tem fases?",
        opcoes: ["Vemos partes diferentes do lado iluminado dela", "A Terra faz sombra nela todo mês", "Ela muda de tamanho", "Ela se apaga aos poucos"],
        correta: 0,
        fato: "🌗 A metade da Lua voltada para o Sol está sempre iluminada. O que muda é o quanto dessa metade nós conseguimos ver daqui, conforme ela orbita."
      },
      {
        pergunta: "O que é um buraco negro?",
        opcoes: ["Uma região de gravidade tão forte que nem a luz escapa", "Um buraco vazio no espaço", "Uma estrela apagada e fria", "Uma passagem para outro universo comprovada"],
        correta: 0,
        fato: "🕳️ A gravidade ali é tão intensa que nada que entra volta, nem a luz — por isso é 'negro'. A primeira imagem de um buraco negro foi divulgada em 2019."
      },
      {
        pergunta: "Quando você olha para uma estrela distante, está vendo o quê?",
        opcoes: ["Como ela era no passado", "Como ela é agora", "Como ela será", "Um reflexo do Sol"],
        correta: 0,
        fato: "⏳ A luz de uma estrela a 500 anos-luz saiu de lá há 500 anos. Se ela tivesse explodido ontem, ninguém aqui saberia por mais cinco séculos."
      }
    ]
  },
  {
    id: "cri_quiz_tecnologia",
    tipo: "quiz",
    titulo: "Como a Tecnologia Funciona",
    descricao: "O que acontece por dentro dos aparelhos que você usa!",
    emoji: "💻",
    habilidade: "Pensamento Computacional",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Você usa celular, internet e aplicativos todo dia — mas o que acontece lá dentro? 💻 Hoje você abre a caixa preta e descobre como a mágica funciona.",
    perguntas: [
      {
        pergunta: "Em que sistema os computadores guardam a informação?",
        opcoes: ["Binário, só com 0 e 1", "Decimal, de 0 a 9", "Em letras", "Em cores"],
        correta: 0,
        fato: "0️⃣1️⃣ Tudo — texto, foto, música — vira sequência de 0 e 1, porque no fundo o circuito só sabe responder 'passa corrente' ou 'não passa'."
      },
      {
        pergunta: "O que é um algoritmo?",
        opcoes: ["Uma sequência de passos para resolver algo", "Um tipo de computador", "Um vírus", "Uma linguagem de programação"],
        correta: 0,
        fato: "📋 Uma receita de bolo é um algoritmo: passos em ordem que levam a um resultado. Programar é escrever receitas que a máquina consegue seguir."
      },
      {
        pergunta: "O que a memória RAM faz?",
        opcoes: ["Guarda o que está em uso agora", "Guarda arquivos para sempre", "Mostra as imagens na tela", "Conecta com a internet"],
        correta: 0,
        fato: "⚡ A RAM é rápida mas esquece tudo ao desligar. O que fica salvo mora no disco (SSD ou HD), que é mais lento e tem memória permanente."
      },
      {
        pergunta: "O que significa dizer que um arquivo está 'na nuvem'?",
        opcoes: ["Está no computador de outra empresa, acessível pela internet", "Está flutuando sem lugar", "Está só no seu celular", "Está criptografado"],
        correta: 0,
        fato: "☁️ Nuvem é o computador de outra pessoa. Seus arquivos estão fisicamente em servidores dentro de grandes galpões, que consomem muita energia."
      },
      {
        pergunta: "Para que serve uma senha forte?",
        opcoes: ["Dificultar que alguém adivinhe ou quebre por tentativa", "Deixar o site mais rápido", "Economizar bateria", "Guardar mais arquivos"],
        correta: 0,
        fato: "🔐 Senha longa vale mais que senha complicada e curta. E repetir a mesma senha em vários sites é o maior risco: se um vaza, todos caem juntos."
      }
    ]
  },
  {
    id: "cri_quiz_dinheiro",
    tipo: "quiz",
    titulo: "Dinheiro e Escolhas",
    descricao: "Poupar, gastar e decidir — igual às suas NeuralCoins!",
    emoji: "💰",
    habilidade: "Educação Financeira",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Você já sabe poupar NeuralCoins para comprar aquele item caro da Loja. 💰 O dinheiro de verdade funciona igual — e algumas ideias simples mudam tudo.",
    perguntas: [
      {
        pergunta: "Qual é a diferença entre querer e precisar?",
        opcoes: ["Precisar é o essencial; querer é o desejo", "São a mesma coisa", "Querer é mais importante", "Precisar é só o que é caro"],
        correta: 0,
        fato: "🧭 Comida, moradia e remédio são necessidades. Um jogo novo é desejo — e não tem nada de errado em ter desejos, desde que as necessidades venham antes."
      },
      {
        pergunta: "O que significa poupar?",
        opcoes: ["Guardar uma parte agora para usar depois", "Nunca gastar nada", "Gastar tudo de uma vez", "Pedir emprestado"],
        correta: 0,
        fato: "🏦 Poupar é trocar um prazer pequeno agora por um maior depois. É exatamente o que você faz quando não compra 3 itens baratos para juntar e comprar o caro."
      },
      {
        pergunta: "O que é um orçamento?",
        opcoes: ["Um plano do quanto entra e do quanto sai", "Uma dívida", "Um tipo de banco", "Uma promoção"],
        correta: 0,
        fato: "📊 Orçamento é comparar entrada com saída. Enquanto a saída for menor que a entrada, sobra — e é da sobra que nasce qualquer plano maior."
      },
      {
        pergunta: "Se você compra algo parcelado, o que costuma acontecer?",
        opcoes: ["Você paga aos poucos, e às vezes mais no total", "Você paga menos no total sempre", "Você não paga nada", "O preço nunca muda"],
        correta: 0,
        fato: "💳 'Sem juros' existe, mas parcelar prende sua renda futura: o dinheiro do mês que vem já tem dono antes de você recebê-lo."
      },
      {
        pergunta: "Por que comparar preços antes de comprar?",
        opcoes: ["O mesmo produto pode custar bem diferente", "Para demorar mais", "Porque é obrigatório", "Para o vendedor gostar de você"],
        correta: 0,
        fato: "🔍 Comparar é o jeito mais simples de ganhar dinheiro sem trabalhar mais: o que você não gasta a mais continua sendo seu."
      }
    ]
  },
  {
    id: "cri_quiz_musica",
    tipo: "quiz",
    titulo: "Música e Som",
    descricao: "A física escondida atrás de uma melodia!",
    emoji: "🎼",
    habilidade: "Percepção e Arte",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Música é matemática que dá para ouvir. 🎼 Por trás de cada nota tem uma vibração, um número e uma regra. Vamos ver o que sustenta a canção?",
    perguntas: [
      {
        pergunta: "O que é o som, fisicamente?",
        opcoes: ["Vibração que se propaga por um meio", "Uma onda de luz", "Um tipo de calor", "Partículas de ar paradas"],
        correta: 0,
        fato: "🔊 O som precisa de matéria para viajar — ar, água, metal. É por isso que no espaço, onde há vácuo, não existe som nenhum."
      },
      {
        pergunta: "O que faz uma nota ser mais aguda que outra?",
        opcoes: ["Vibrar mais vezes por segundo", "Ser mais alta em volume", "Durar mais tempo", "Ter mais instrumentos"],
        correta: 0,
        fato: "🎵 Frequência mais alta, som mais agudo. A corda fina do violão vibra mais rápido que a grossa — por isso soa mais fina."
      },
      {
        pergunta: "Quantas notas musicais tem a escala básica?",
        opcoes: ["Sete", "Cinco", "Dez", "Doze"],
        correta: 0,
        fato: "🎹 Dó, ré, mi, fá, sol, lá, si. No piano, as sete teclas brancas — e as pretas são as notas intermediárias, que completam doze no total."
      },
      {
        pergunta: "O que é o ritmo de uma música?",
        opcoes: ["A organização dos sons no tempo", "A altura das notas", "O volume", "O instrumento usado"],
        correta: 0,
        fato: "🥁 Ritmo é padrão no tempo. Dá para reconhecer uma música só pelo ritmo, batendo na mesa, sem nenhuma nota — o cérebro completa o resto."
      },
      {
        pergunta: "Por que um violão e um piano tocando a mesma nota soam diferentes?",
        opcoes: ["Cada instrumento produz vibrações extras próprias", "Um está mais alto", "Um toca mais rápido", "A nota não é a mesma"],
        correta: 0,
        fato: "🎸 Isso se chama timbre. Junto da nota principal vêm vibrações menores, diferentes em cada instrumento — é a 'impressão digital' do som."
      }
    ]
  },
  {
    id: "cri_quiz_esportes",
    tipo: "quiz",
    titulo: "Esporte e Movimento",
    descricao: "O que acontece no corpo quando você se movimenta!",
    emoji: "🏅",
    habilidade: "Corpo e Saúde",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Todo atleta é um cientista do próprio corpo. 🏅 Ele sabe quando descansar, o que comer e por que aquecer. Vamos entender essas regras?",
    perguntas: [
      {
        pergunta: "Por que é importante aquecer antes de praticar esporte?",
        opcoes: ["Prepara músculos e articulações e reduz risco de lesão", "Deixa o jogo mais longo", "Faz emagrecer mais", "Aumenta a altura"],
        correta: 0,
        fato: "🏃 O aquecimento aumenta o fluxo de sangue no músculo e deixa o tecido mais elástico. Músculo frio estica menos e rompe mais fácil."
      },
      {
        pergunta: "O que acontece com a respiração durante o exercício?",
        opcoes: ["Fica mais rápida, para levar mais oxigênio", "Fica mais lenta", "Para completamente", "Não muda"],
        correta: 0,
        fato: "🫁 O músculo em atividade consome mais oxigênio e produz mais gás carbônico. Respirar mais rápido é o corpo acelerando a troca."
      },
      {
        pergunta: "Por que se deve beber água durante a atividade física?",
        opcoes: ["Para repor o que se perde no suor", "Para encher o estômago", "Para esfriar a garganta só", "Não é necessário"],
        correta: 0,
        fato: "💧 O suor é o sistema de refrigeração do corpo: ele evapora e leva calor embora. Sem repor a água, o corpo perde a capacidade de se resfriar."
      },
      {
        pergunta: "O descanso entre os treinos serve para quê?",
        opcoes: ["O músculo se recuperar e ficar mais forte", "Perder o que ganhou", "Nada, é perda de tempo", "Só para o atleta se distrair"],
        correta: 0,
        fato: "😴 O músculo não cresce durante o treino: ele cresce no descanso, reconstruindo o que foi desgastado. Treinar sem descansar atrapalha o resultado."
      },
      {
        pergunta: "Qual destes é um esporte coletivo?",
        opcoes: ["Vôlei", "Natação individual", "Salto em altura", "Xadrez"],
        correta: 0,
        fato: "🏐 Esporte coletivo treina algo que o individual não treina: coordenar a própria ação com a de outras pessoas em tempo real."
      }
    ]
  },
  {
    id: "cri_quiz_literatura",
    tipo: "quiz",
    titulo: "Livros e Histórias",
    descricao: "Como uma boa história é construída por dentro!",
    emoji: "📖",
    habilidade: "Linguagem",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Toda história que já te prendeu tem uma engrenagem escondida. 📖 Quem enxerga a engrenagem lê melhor — e escreve melhor também. Vamos abrir o motor?",
    perguntas: [
      {
        pergunta: "Quem é o protagonista de uma história?",
        opcoes: ["O personagem principal", "Quem escreve o livro", "O vilão", "Quem narra sempre"],
        correta: 0,
        fato: "🎭 A palavra vem do grego: 'proto' (primeiro) + 'agonistes' (aquele que luta). O protagonista é quem enfrenta o conflito central."
      },
      {
        pergunta: "O que é o enredo?",
        opcoes: ["A sequência de acontecimentos", "O lugar onde se passa", "A opinião do autor", "O nome dos personagens"],
        correta: 0,
        fato: "🧵 Enredo é o encadeamento: uma coisa causa a outra. História em que os fatos apenas se sucedem, sem causar nada, costuma parecer sem graça."
      },
      {
        pergunta: "O que caracteriza a poesia em relação à prosa?",
        opcoes: ["O uso de versos, ritmo e imagens", "Ser sempre triste", "Ter que rimar sempre", "Ser sempre curta"],
        correta: 0,
        fato: "✒️ Nem toda poesia rima — o verso livre é poesia sem rima nem métrica fixa. O que define é o trabalho com ritmo, som e imagem."
      },
      {
        pergunta: "O que é uma metáfora?",
        opcoes: ["Uma comparação sem usar 'como'", "Um exagero", "Uma repetição", "Um som imitado"],
        correta: 0,
        fato: "🌊 'Seus olhos são dois oceanos' é metáfora. Se fosse 'olhos como oceanos', com o 'como' explícito, seria comparação."
      },
      {
        pergunta: "Quem foi Monteiro Lobato na literatura brasileira?",
        opcoes: ["Criador do Sítio do Picapau Amarelo", "Autor de Dom Casmurro", "Poeta modernista", "Escritor de Vidas Secas"],
        correta: 0,
        fato: "📚 Monteiro Lobato criou Emília, Narizinho e Pedrinho, e é considerado um dos fundadores da literatura infantil brasileira."
      }
    ]
  },
  {
    id: "cri_quiz_clima",
    tipo: "quiz",
    titulo: "Clima e Tempo",
    descricao: "Por que chove aqui e faz seca ali?",
    emoji: "🌦️",
    habilidade: "Pensamento Científico",
    xp_reward: 100,
    coins_reward: 100,
    tempo_estimado: 12,
    historinha: "Você virou meteorologista por um dia. 🌦️ Precisa prever o tempo de amanhã e explicar o clima da sua região. As duas coisas não são a mesma. Vamos separar?",
    perguntas: [
      {
        pergunta: "Qual é a diferença entre tempo e clima?",
        opcoes: ["Tempo é o de agora; clima é o padrão de muitos anos", "São sinônimos", "Clima é o de hoje", "Tempo dura um mês"],
        correta: 0,
        fato: "📅 Tempo é o que você vê pela janela hoje. Clima é a média de décadas — por isso um dia frio não desmente o aquecimento do planeta."
      },
      {
        pergunta: "O que causa as estações do ano?",
        opcoes: ["A inclinação do eixo da Terra", "A distância variável até o Sol", "A velocidade da Terra", "As nuvens"],
        correta: 0,
        fato: "🌍 A Terra é inclinada uns 23,5°. Quando um hemisfério aponta mais para o Sol, ele recebe luz mais direta e vive o verão — enquanto o outro está no inverno."
      },
      {
        pergunta: "Quando os dois hemisférios têm estações opostas, isso significa o quê?",
        opcoes: ["No Natal, é verão no Brasil e inverno na Europa", "As duas metades têm verão junto", "O Brasil não tem estações", "Só o norte tem inverno"],
        correta: 0,
        fato: "🎄 É por isso que o imaginário de Natal com neve não bate com a realidade brasileira: em dezembro, aqui é verão."
      },
      {
        pergunta: "O que é o efeito estufa?",
        opcoes: ["Gases que retêm calor na atmosfera", "Buraco na camada de ozônio", "Chuva ácida", "Vento quente do deserto"],
        correta: 0,
        fato: "🌡️ O efeito estufa natural é essencial: sem ele a Terra seria congelada. O problema é o excesso de gases, que retém calor demais."
      },
      {
        pergunta: "Por que faz mais frio no alto de uma montanha?",
        opcoes: ["O ar é mais rarefeito e retém menos calor", "Fica mais longe do Sol", "Tem mais vento sempre", "A neve esfria o ar"],
        correta: 0,
        fato: "⛰️ Estar 3 km mais perto do Sol não muda nada (ele está a 150 milhões de km). O que muda é o ar: mais fino lá em cima, ele segura menos calor."
      }
    ]
  }
]

// ── Raciocínio — sequências e padrões (expansão 08/08/2026) ──
// Nesta faixa entram famílias de números com NOME (primos, Fibonacci, cúbicos) e
// as três escritas do mesmo valor (fração, decimal, porcentagem). O `contexto_matematico`
// aparece na tela de encerramento e é onde mora o "por que isso importa".
export const raciocinioExtraPorFaixa = [
  {
    id: "cri_seq_primos",
    tipo: "sequencia",
    titulo: "Números Primos",
    descricao: "Os números que só se dividem por 1 e por eles mesmos!",
    emoji: "🔐",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "Existem números que se recusam a ser divididos! 🔐 Os primos só aceitam divisão por 1 e por eles mesmos. Eles não seguem um salto fixo — você precisa reconhecê-los. Qual é o próximo?",
    contexto_matematico: "Os primos são os 'átomos' dos números: todo número inteiro é um produto de primos, de um jeito só. É por isso que eles protegem sua senha na internet — multiplicar dois primos gigantes é fácil, mas descobrir quais eram, a partir do resultado, é praticamente impossível.",
    sequencias: [
      { items: ["2", "3", "5", "7", "❓"], resposta: "11", opcoes: ["8", "9", "10", "11"] },
      { items: ["11", "13", "17", "19", "❓"], resposta: "23", opcoes: ["20", "21", "22", "23"] },
      { items: ["2", "3", "❓", "7", "11"], resposta: "5", opcoes: ["4", "5", "6", "9"] },
      { items: ["13", "17", "19", "23", "❓"], resposta: "29", opcoes: ["25", "27", "29", "31"] },
      { items: ["5", "7", "11", "13", "❓"], resposta: "17", opcoes: ["15", "16", "17", "19"] }
    ]
  },
  {
    id: "cri_seq_fibonacci",
    tipo: "sequencia",
    titulo: "Sequência de Fibonacci",
    descricao: "Cada número é a soma dos dois anteriores!",
    emoji: "🐚",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "Existe uma sequência que aparece nas conchas, nos girassóis e nas pinhas! 🐚 A regra é simples: some os dois últimos para achar o próximo. Descubra o número que falta.",
    contexto_matematico: "Fibonacci descreveu essa sequência em 1202, estudando coelhos. Dividindo um número pelo anterior, o resultado se aproxima de 1,618 — a proporção áurea, que aparece nas pétalas das flores e nas espirais das galáxias.",
    sequencias: [
      { items: ["1", "1", "2", "3", "❓"], resposta: "5", opcoes: ["4", "5", "6", "8"] },
      { items: ["2", "3", "5", "8", "❓"], resposta: "13", opcoes: ["11", "12", "13", "16"] },
      { items: ["5", "8", "13", "21", "❓"], resposta: "34", opcoes: ["26", "30", "34", "42"] },
      { items: ["1", "1", "2", "❓", "5"], resposta: "3", opcoes: ["3", "4", "6", "8"] },
      { items: ["13", "21", "34", "55", "❓"], resposta: "89", opcoes: ["68", "79", "89", "99"] }
    ]
  },
  {
    id: "cri_seq_potencias3",
    tipo: "sequencia",
    titulo: "Potências de 3",
    descricao: "Multiplicando por 3 a cada passo!",
    emoji: "📈",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "Uma notícia se espalha assim: cada pessoa conta para 3 outras! 📈 Em cinco rodadas já são centenas. Descubra quantas pessoas sabem na próxima rodada.",
    contexto_matematico: "Multiplicar sempre pelo mesmo número chama-se crescimento EXPONENCIAL — e ele engana o olho: parece devagar no começo e vira uma explosão. É assim que uma notícia viraliza e é assim que uma epidemia se espalha.",
    sequencias: [
      { items: ["1", "3", "9", "27", "❓"], resposta: "81", opcoes: ["54", "72", "81", "108"] },
      { items: ["3", "9", "27", "81", "❓"], resposta: "243", opcoes: ["162", "200", "243", "324"] },
      { items: ["1", "3", "❓", "27", "81"], resposta: "9", opcoes: ["6", "9", "12", "18"] },
      { items: ["9", "27", "81", "243", "❓"], resposta: "729", opcoes: ["486", "600", "729", "981"] },
      { items: ["2", "6", "18", "54", "❓"], resposta: "162", opcoes: ["108", "150", "162", "216"] }
    ]
  },
  {
    id: "cri_seq_cubos",
    tipo: "sequencia",
    titulo: "Números Cúbicos",
    descricao: "Números que formam cubos perfeitos!",
    emoji: "🧊",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "Com 8 cubinhos monta-se um cubo 2×2×2. Com 27, um cubo 3×3×3! 🧊 Esses são os números cúbicos. Descubra quantos cubinhos vêm no próximo.",
    contexto_matematico: "Um número cúbico é um número multiplicado por ele mesmo três vezes: 4×4×4 = 64. Enquanto o quadrado mede ÁREA, o cubo mede VOLUME — é por isso que dobrar o lado de uma caixa multiplica o que cabe dentro por 8, não por 2.",
    sequencias: [
      { items: ["1", "8", "27", "64", "❓"], resposta: "125", opcoes: ["100", "110", "125", "216"] },
      { items: ["8", "27", "64", "125", "❓"], resposta: "216", opcoes: ["180", "200", "216", "343"] },
      { items: ["1", "8", "❓", "64", "125"], resposta: "27", opcoes: ["16", "20", "27", "36"] },
      { items: ["27", "64", "125", "216", "❓"], resposta: "343", opcoes: ["289", "300", "343", "512"] },
      { items: ["64", "125", "216", "343", "❓"], resposta: "512", opcoes: ["441", "480", "512", "729"] }
    ]
  },
  {
    id: "cri_seq_decimais",
    tipo: "sequencia",
    titulo: "Números Decimais",
    descricao: "Sequências com vírgula!",
    emoji: "🔬",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "No laboratório, a balança mede com casas decimais! 🔬 As medidas crescem em passos exatos, menores que 1. Descubra a próxima medida.",
    contexto_matematico: "A vírgula não muda nada na lógica: 0,5 + 0,5 = 1,0 pela mesma regra que 5 + 5 = 10. O que muda é o TAMANHO do passo — decimais permitem medir entre dois números inteiros, que é onde o mundo real quase sempre está.",
    sequencias: [
      { items: ["0,5", "1,0", "1,5", "2,0", "❓"], resposta: "2,5", opcoes: ["2,2", "2,5", "3,0", "3,5"] },
      { items: ["0,25", "0,50", "0,75", "❓"], resposta: "1,00", opcoes: ["0,85", "1,00", "1,25", "1,50"] },
      { items: ["1,1", "1,2", "1,3", "1,4", "❓"], resposta: "1,5", opcoes: ["1,5", "1,6", "2,0", "2,4"] },
      { items: ["10,0", "9,5", "9,0", "8,5", "❓"], resposta: "8,0", opcoes: ["7,5", "8,0", "8,2", "7,0"] },
      { items: ["0,1", "0,2", "0,4", "0,8", "❓"], resposta: "1,6", opcoes: ["1,0", "1,2", "1,6", "3,2"] }
    ]
  },
  {
    id: "cri_seq_negativos2",
    tipo: "sequencia",
    titulo: "Abaixo do Zero",
    descricao: "Sequências que atravessam o zero!",
    emoji: "🌡️",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "O termômetro da estação polar registra a temperatura de hora em hora! 🌡️ Ela cai e sobe em passos regulares, passando pelo zero. Qual é a próxima medida?",
    contexto_matematico: "Os números negativos existem porque zero não é o fim da reta — é só um ponto no meio dela. Sem eles não daria para falar de temperatura abaixo de zero, de dívida, nem de andar de subsolo.",
    sequencias: [
      { items: ["-5", "-3", "-1", "1", "❓"], resposta: "3", opcoes: ["2", "3", "4", "5"] },
      { items: ["-10", "-8", "-6", "-4", "❓"], resposta: "-2", opcoes: ["-3", "-2", "0", "2"] },
      { items: ["5", "3", "1", "-1", "❓"], resposta: "-3", opcoes: ["-2", "-3", "-4", "-5"] },
      { items: ["-1", "-2", "-3", "-4", "❓"], resposta: "-5", opcoes: ["-5", "-6", "0", "5"] },
      { items: ["-9", "-6", "-3", "0", "❓"], resposta: "3", opcoes: ["1", "3", "6", "-3"] }
    ]
  },
  {
    id: "cri_seq_porcentagem",
    tipo: "sequencia",
    titulo: "Porcentagens em Ordem",
    descricao: "Do 0% ao 100%, em passos certos!",
    emoji: "📊",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "A barra de download avança em porcentagem! 📊 Cada etapa sobe um tanto fixo — ou dobra. Descubra em quanto está a próxima etapa.",
    contexto_matematico: "Por cento significa 'a cada cem'. 25% é o mesmo que 1/4 e que 0,25 — três escritas do mesmo valor. Saber trocar entre elas é o que permite comparar um desconto de 30% com outro de 1/4 sem se enganar.",
    sequencias: [
      { items: ["10%", "20%", "30%", "40%", "❓"], resposta: "50%", opcoes: ["45%", "50%", "60%", "70%"] },
      { items: ["25%", "50%", "75%", "❓"], resposta: "100%", opcoes: ["80%", "90%", "100%", "125%"] },
      { items: ["100%", "90%", "80%", "70%", "❓"], resposta: "60%", opcoes: ["50%", "60%", "65%", "75%"] },
      { items: ["5%", "10%", "20%", "40%", "❓"], resposta: "80%", opcoes: ["50%", "60%", "80%", "100%"] },
      { items: ["12%", "24%", "36%", "48%", "❓"], resposta: "60%", opcoes: ["55%", "60%", "72%", "96%"] }
    ]
  },
  {
    id: "cri_seq_angulos",
    tipo: "sequencia",
    titulo: "Ângulos em Sequência",
    descricao: "Os ângulos também seguem padrões!",
    emoji: "📐",
    habilidade: "Raciocínio Espacial",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "O ponteiro do relógio gira em ângulos exatos! 📐 E os polígonos também guardam somas de ângulos que crescem numa ordem certa. Descubra o ângulo que falta.",
    contexto_matematico: "A soma dos ângulos internos cresce 180° a cada lado novo: triângulo 180°, quadrilátero 360°, pentágono 540°. O motivo é bonito — todo polígono de n lados pode ser cortado em exatamente n−2 triângulos.",
    sequencias: [
      { items: ["180°", "360°", "540°", "720°", "❓"], resposta: "900°", opcoes: ["810°", "900°", "990°", "1080°"] },
      { items: ["60°", "120°", "180°", "240°", "❓"], resposta: "300°", opcoes: ["280°", "300°", "320°", "360°"] },
      { items: ["90°", "180°", "270°", "❓"], resposta: "360°", opcoes: ["300°", "330°", "360°", "450°"] },
      { items: ["30°", "45°", "60°", "❓"], resposta: "75°", opcoes: ["70°", "75°", "80°", "90°"] },
      { items: ["360°", "180°", "90°", "❓"], resposta: "45°", opcoes: ["30°", "45°", "60°", "0°"] }
    ]
  },
  {
    id: "cri_seq_razoes",
    tipo: "sequencia",
    titulo: "Razões e Proporções",
    descricao: "Duas quantidades que crescem juntas!",
    emoji: "⚖️",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "A receita do bolo é para 2 pessoas, mas vêm 10! ⚖️ Os ingredientes precisam crescer juntos, na mesma proporção. Descubra a razão que falta.",
    contexto_matematico: "Uma razão só se mantém se os dois lados forem multiplicados pelo MESMO número: 1:2 é igual a 5:10 porque os dois foram multiplicados por 5. Somar não funciona — 1:2 não é igual a 2:3.",
    sequencias: [
      { items: ["1:2", "2:4", "3:6", "4:8", "❓"], resposta: "5:10", opcoes: ["5:9", "5:10", "6:10", "5:12"] },
      { items: ["1:3", "2:6", "3:9", "❓"], resposta: "4:12", opcoes: ["4:10", "4:12", "5:12", "4:15"] },
      { items: ["2:1", "4:2", "6:3", "❓"], resposta: "8:4", opcoes: ["8:3", "8:4", "9:4", "10:4"] },
      { items: ["1:1", "2:2", "3:3", "❓"], resposta: "4:4", opcoes: ["4:3", "4:4", "4:5", "5:4"] },
      { items: ["5:10", "10:20", "15:30", "❓"], resposta: "20:40", opcoes: ["20:30", "20:40", "25:40", "20:45"] }
    ]
  },
  {
    id: "cri_seq_tempo2",
    tipo: "sequencia",
    titulo: "Convertendo o Tempo",
    descricao: "Segundos, horas, dias e anos!",
    emoji: "⏳",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 10,
    historinha: "A missão espacial conta o tempo em várias unidades ao mesmo tempo! ⏳ Cada etapa dura um múltiplo exato da anterior. Descubra a duração da próxima.",
    contexto_matematico: "O tempo é a única medida do dia a dia que NÃO é decimal: 60 segundos, 60 minutos, 24 horas, 7 dias. Essa mistura vem de povos diferentes — os babilônios contavam de 60 em 60 e os romanos fixaram a semana de 7 dias.",
    sequencias: [
      { items: ["60s", "120s", "180s", "240s", "❓"], resposta: "300s", opcoes: ["280s", "300s", "320s", "360s"] },
      { items: ["1min", "2min", "4min", "8min", "❓"], resposta: "16min", opcoes: ["10min", "12min", "16min", "32min"] },
      { items: ["24h", "48h", "72h", "❓"], resposta: "96h", opcoes: ["84h", "96h", "100h", "120h"] },
      { items: ["7d", "14d", "21d", "❓"], resposta: "28d", opcoes: ["24d", "28d", "30d", "35d"] },
      { items: ["12h", "24h", "36h", "48h", "❓"], resposta: "60h", opcoes: ["54h", "60h", "72h", "96h"] }
    ]
  },
  {
    id: "cri_padrao_potencias",
    tipo: "padrao",
    titulo: "Grade das Potências",
    descricao: "Número, quadrado e cubo em cada linha!",
    emoji: "🧊",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 11,
    historinha: "Cada linha desta grade mostra um número, o quadrado dele e o cubo dele! 🧊 A regra é a mesma nas três linhas. Complete a última casa.",
    puzzles: [
      {
        matriz: ["2", "4", "8", "3", "9", "27", "4", "16", "❓"],
        resposta: "64",
        opcoes: ["32", "48", "64", "81"],
        dica: "Linha: n, n×n, n×n×n. Aqui n = 4."
      },
      {
        matriz: ["1", "1", "1", "2", "4", "8", "5", "25", "❓"],
        resposta: "125",
        opcoes: ["75", "100", "125", "225"],
        dica: "5 × 5 × 5."
      },
      {
        matriz: ["2", "4", "8", "4", "16", "64", "3", "9", "❓"],
        resposta: "27",
        opcoes: ["12", "18", "27", "81"],
        dica: "O cubo de 3."
      },
      {
        matriz: ["10", "100", "1000", "2", "4", "8", "6", "36", "❓"],
        resposta: "216",
        opcoes: ["108", "180", "216", "296"],
        dica: "6 × 6 × 6."
      },
      {
        matriz: ["5", "25", "125", "3", "9", "27", "7", "49", "❓"],
        resposta: "343",
        opcoes: ["245", "294", "343", "392"],
        dica: "7 × 7 × 7."
      }
    ]
  },
  {
    id: "cri_padrao_fracoes",
    tipo: "padrao",
    titulo: "Grade das Três Escritas",
    descricao: "Fração, decimal e porcentagem do mesmo valor!",
    emoji: "🍕",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "O mesmo pedaço de pizza pode ser escrito de três jeitos! 🍕 Fração, decimal e porcentagem dizem a MESMA coisa. Complete a terceira escrita.",
    puzzles: [
      {
        matriz: ["1/2", "0,5", "50%", "1/4", "0,25", "25%", "3/4", "0,75", "❓"],
        resposta: "75%",
        opcoes: ["34%", "70%", "75%", "80%"],
        dica: "As 3 casas da linha são o MESMO valor escrito de outro jeito."
      },
      {
        matriz: ["1/5", "0,2", "20%", "2/5", "0,4", "40%", "3/5", "0,6", "❓"],
        resposta: "60%",
        opcoes: ["35%", "60%", "65%", "80%"],
        dica: "0,6 em porcentagem."
      },
      {
        matriz: ["1/10", "0,1", "10%", "3/10", "0,3", "30%", "7/10", "0,7", "❓"],
        resposta: "70%",
        opcoes: ["7%", "17%", "70%", "77%"],
        dica: "Sete décimos."
      },
      {
        matriz: ["1/1", "1,0", "100%", "1/2", "0,5", "50%", "1/4", "0,25", "❓"],
        resposta: "25%",
        opcoes: ["14%", "25%", "40%", "45%"],
        dica: "Um quarto do total."
      },
      {
        matriz: ["2/10", "0,2", "20%", "5/10", "0,5", "50%", "8/10", "0,8", "❓"],
        resposta: "80%",
        opcoes: ["8%", "18%", "80%", "88%"],
        dica: "Oito décimos."
      }
    ]
  },
  {
    id: "cri_padrao_primos2",
    tipo: "padrao",
    titulo: "Grade dos Primos",
    descricao: "Os primos em ordem dentro do quadrado!",
    emoji: "🔐",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 11,
    historinha: "Os números primos entraram na grade em ordem crescente! 🔐 Eles não têm salto fixo — é preciso reconhecer quem é primo. Qual fecha o quadrado?",
    puzzles: [
      {
        matriz: ["2", "3", "5", "7", "11", "13", "17", "19", "❓"],
        resposta: "23",
        opcoes: ["21", "22", "23", "25"],
        dica: "O próximo primo depois de 19. Cuidado: 21 = 3×7."
      },
      {
        matriz: ["3", "5", "7", "11", "13", "17", "19", "23", "❓"],
        resposta: "29",
        opcoes: ["25", "27", "29", "31"],
        dica: "25 = 5×5 e 27 = 3×9, então nenhum dos dois é primo."
      },
      {
        matriz: ["2", "3", "5", "3", "5", "7", "5", "7", "❓"],
        resposta: "11",
        opcoes: ["9", "10", "11", "13"],
        dica: "Cada linha começa um primo depois da anterior."
      },
      {
        matriz: ["29", "23", "19", "17", "13", "11", "7", "5", "❓"],
        resposta: "3",
        opcoes: ["1", "2", "3", "4"],
        dica: "Os primos em ordem DECRESCENTE."
      },
      {
        matriz: ["11", "13", "17", "19", "23", "29", "31", "37", "❓"],
        resposta: "41",
        opcoes: ["39", "40", "41", "43"],
        dica: "39 = 3×13, então não serve."
      }
    ]
  },
  {
    id: "cri_padrao_operacoes",
    tipo: "padrao",
    titulo: "Grade das Operações",
    descricao: "Descubra QUAL operação a grade está usando!",
    emoji: "🎛️",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Aqui a regra muda de grade para grade! 🎛️ Pode ser soma, subtração, multiplicação ou divisão. Descubra qual é olhando as duas primeiras linhas.",
    puzzles: [
      {
        matriz: ["10", "2", "20", "8", "3", "24", "7", "4", "❓"],
        resposta: "28",
        opcoes: ["11", "21", "28", "32"],
        dica: "Teste as duas primeiras linhas: 10 e 2 dão 20. É multiplicação."
      },
      {
        matriz: ["20", "5", "4", "18", "3", "6", "24", "4", "❓"],
        resposta: "6",
        opcoes: ["4", "6", "8", "20"],
        dica: "20 dividido por 5 dá 4. É divisão."
      },
      {
        matriz: ["15", "5", "10", "20", "8", "12", "30", "12", "❓"],
        resposta: "18",
        opcoes: ["15", "18", "20", "42"],
        dica: "15 menos 5 dá 10. É subtração."
      },
      {
        matriz: ["6", "4", "10", "9", "7", "16", "12", "8", "❓"],
        resposta: "20",
        opcoes: ["18", "20", "22", "96"],
        dica: "6 mais 4 dá 10. É soma."
      },
      {
        matriz: ["100", "10", "10", "81", "9", "9", "64", "8", "❓"],
        resposta: "8",
        opcoes: ["6", "7", "8", "72"],
        dica: "Divisão — e repare que os três primeiros são quadrados perfeitos."
      }
    ]
  },
  {
    id: "cri_padrao_angulos",
    tipo: "padrao",
    titulo: "Grade dos Polígonos",
    descricao: "Lados, triângulos e soma dos ângulos!",
    emoji: "📐",
    habilidade: "Raciocínio Espacial",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Todo polígono pode ser cortado em triângulos! 📐 E como cada triângulo soma 180°, dá para descobrir a soma dos ângulos de qualquer figura. Complete a grade.",
    puzzles: [
      {
        matriz: ["3", "1", "180", "4", "2", "360", "5", "3", "❓"],
        resposta: "540",
        opcoes: ["450", "540", "600", "720"],
        dica: "Linha: lados, triângulos que cabem, soma. 3 triângulos × 180°."
      },
      {
        matriz: ["4", "2", "360", "5", "3", "540", "6", "4", "❓"],
        resposta: "720",
        opcoes: ["630", "720", "810", "900"],
        dica: "4 triângulos × 180°."
      },
      {
        matriz: ["3", "60", "180", "4", "90", "360", "6", "120", "❓"],
        resposta: "720",
        opcoes: ["540", "600", "720", "840"],
        dica: "Aqui a linha é: lados, ângulo de cada canto, soma total. 6 × 120°."
      },
      {
        matriz: ["90", "90", "180", "60", "60", "120", "45", "45", "❓"],
        resposta: "90",
        opcoes: ["45", "90", "135", "180"],
        dica: "Some os dois primeiros ângulos da linha."
      },
      {
        matriz: ["360", "4", "90", "360", "3", "120", "360", "6", "❓"],
        resposta: "60",
        opcoes: ["45", "60", "72", "90"],
        dica: "360° repartido em partes iguais. 360 ÷ 6."
      }
    ]
  },
  {
    id: "cri_padrao_negativos",
    tipo: "padrao",
    titulo: "Grade Abaixo do Zero",
    descricao: "A grade atravessa o zero!",
    emoji: "🌡️",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 11,
    historinha: "A grade do termômetro começa no negativo e sobe até o positivo! 🌡️ O salto é sempre o mesmo, mesmo passando pelo zero. Qual é a última medida?",
    puzzles: [
      {
        matriz: ["-3", "-2", "-1", "0", "1", "2", "3", "4", "❓"],
        resposta: "5",
        opcoes: ["5", "6", "-5", "0"],
        dica: "De 1 em 1, sem parar no zero."
      },
      {
        matriz: ["-9", "-6", "-3", "0", "3", "6", "9", "12", "❓"],
        resposta: "15",
        opcoes: ["13", "15", "18", "-15"],
        dica: "De 3 em 3."
      },
      {
        matriz: ["5", "3", "1", "-1", "-3", "-5", "-7", "-9", "❓"],
        resposta: "-11",
        opcoes: ["-10", "-11", "-12", "11"],
        dica: "Descendo de 2 em 2 — e já passou do zero."
      },
      {
        matriz: ["-1", "-4", "-9", "-16", "-25", "-36", "-49", "-64", "❓"],
        resposta: "-81",
        opcoes: ["-72", "-81", "-100", "81"],
        dica: "São os quadrados perfeitos, todos negativos."
      },
      {
        matriz: ["-10", "-5", "0", "5", "10", "15", "20", "25", "❓"],
        resposta: "30",
        opcoes: ["27", "30", "35", "-30"],
        dica: "De 5 em 5."
      }
    ]
  },
  {
    id: "cri_padrao_decimais",
    tipo: "padrao",
    titulo: "Grade dos Decimais",
    descricao: "Uma grade inteira depois da vírgula!",
    emoji: "🔬",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 11,
    historinha: "A grade do laboratório trabalha com casas decimais! 🔬 Os passos são menores que 1, mas seguem a mesma lógica dos inteiros. Complete a medida.",
    puzzles: [
      {
        matriz: ["0,1", "0,2", "0,3", "0,4", "0,5", "0,6", "0,7", "0,8", "❓"],
        resposta: "0,9",
        opcoes: ["0,9", "1,0", "0,10", "1,9"],
        dica: "De um décimo em um décimo. Cuidado: 0,10 é o mesmo que 0,1."
      },
      {
        matriz: ["1,5", "2,0", "2,5", "3,0", "3,5", "4,0", "4,5", "5,0", "❓"],
        resposta: "5,5",
        opcoes: ["5,1", "5,5", "6,0", "5,05"],
        dica: "De meio em meio."
      },
      {
        matriz: ["0,5", "1,0", "2,0", "4,0", "8,0", "16,0", "32,0", "64,0", "❓"],
        resposta: "128,0",
        opcoes: ["96,0", "128,0", "129,0", "256,0"],
        dica: "Aqui cada casa é o DOBRO da anterior."
      },
      {
        matriz: ["10,0", "9,0", "8,0", "7,0", "6,0", "5,0", "4,0", "3,0", "❓"],
        resposta: "2,0",
        opcoes: ["1,0", "2,0", "2,5", "0,0"],
        dica: "Descendo de 1 em 1."
      },
      {
        matriz: ["0,25", "0,50", "0,75", "1,00", "1,25", "1,50", "1,75", "2,00", "❓"],
        resposta: "2,25",
        opcoes: ["2,10", "2,25", "2,50", "2,75"],
        dica: "De um quarto em um quarto."
      }
    ]
  },
  {
    id: "cri_padrao_multiplos",
    tipo: "padrao",
    titulo: "Grade dos Múltiplos",
    descricao: "Cada linha é a tabuada de um número diferente!",
    emoji: "🔢",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 11,
    historinha: "Cada linha da grade segue uma tabuada diferente! 🔢 Descubra qual é a de baixo olhando como as de cima crescem. Complete o último múltiplo.",
    puzzles: [
      {
        matriz: ["6", "12", "18", "8", "16", "24", "9", "18", "❓"],
        resposta: "27",
        opcoes: ["24", "27", "36", "81"],
        dica: "Cada linha é a tabuada do primeiro número dela."
      },
      {
        matriz: ["12", "24", "36", "15", "30", "45", "20", "40", "❓"],
        resposta: "60",
        opcoes: ["50", "60", "80", "100"],
        dica: "Três vezes 20."
      },
      {
        matriz: ["4", "8", "12", "6", "12", "18", "10", "20", "❓"],
        resposta: "30",
        opcoes: ["25", "30", "40", "100"],
        dica: "Três vezes 10."
      },
      {
        matriz: ["5", "10", "15", "7", "14", "21", "11", "22", "❓"],
        resposta: "33",
        opcoes: ["30", "32", "33", "44"],
        dica: "Três vezes 11."
      },
      {
        matriz: ["3", "9", "27", "2", "6", "18", "5", "15", "❓"],
        resposta: "45",
        opcoes: ["30", "40", "45", "75"],
        dica: "Atenção: aqui cada casa é TRÊS VEZES a anterior, não mais três."
      }
    ]
  },
  {
    id: "cri_padrao_duas_regras",
    tipo: "padrao",
    titulo: "Grade de Duas Regras",
    descricao: "As linhas E as colunas seguem padrões!",
    emoji: "🧭",
    habilidade: "Lógica Matemática",
    xp_reward: 110,
    coins_reward: 110,
    tempo_estimado: 12,
    historinha: "Esta grade é mais esperta: existe um padrão nas LINHAS e outro nas COLUNAS! 🧭 Dá para chegar na resposta por dois caminhos — e conferir se batem.",
    puzzles: [
      {
        matriz: ["1", "2", "3", "2", "4", "6", "3", "6", "❓"],
        resposta: "9",
        opcoes: ["8", "9", "12", "18"],
        dica: "Linha 1 anda de 1, linha 2 de 2, linha 3 de 3. Pela coluna: 3, 6, 9."
      },
      {
        matriz: ["1", "3", "5", "2", "4", "6", "3", "5", "❓"],
        resposta: "7",
        opcoes: ["7", "8", "9", "15"],
        dica: "Toda linha anda de 2 em 2, e cada linha começa 1 acima da anterior."
      },
      {
        matriz: ["10", "20", "30", "20", "40", "60", "30", "60", "❓"],
        resposta: "90",
        opcoes: ["80", "90", "100", "120"],
        dica: "Cada linha é a tabuada do seu primeiro número."
      },
      {
        matriz: ["2", "3", "4", "4", "6", "8", "6", "9", "❓"],
        resposta: "12",
        opcoes: ["10", "11", "12", "14"],
        dica: "Linha 2 é o dobro da linha 1; linha 3 é o triplo."
      },
      {
        matriz: ["5", "10", "15", "10", "20", "30", "15", "30", "❓"],
        resposta: "45",
        opcoes: ["40", "45", "50", "60"],
        dica: "A coluna da direita também cresce: 15, 30, 45."
      }
    ]
  }
]
