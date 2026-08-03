// ──────────────────────────────────────────────────────────────────────
// ATIVIDADES EXTRA — EXPLORADORES (4–5 anos)
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
    id: "exp_alfabeto_animais",
    tipo: "alfabeto",
    titulo: "Animais de A a Z",
    descricao: "Um animal para cada letra do alfabeto!",
    emoji: "🦁",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "O zoológico alfabético abriu as portas! 🦁 Cada letra tem um animal especial esperando por você. Clique em 🔊 para conhecê-los!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Arara",
          emoji: "🦜",
          funfato: "Araras conseguem imitar sons humanos!",
          detalhe: "Psittacidae | 35+ espécies | Plumagem colorida para comunicação"
        },
        {
          letra: "B",
          palavra: "Borboleta",
          emoji: "🦋",
          funfato: "Borboletas sabem o gosto das coisas com as patas!",
          detalhe: "Lepidoptera | Quimiorreceptores nos tarsos | Metamorfose completa"
        },
        {
          letra: "C",
          palavra: "Crocodilo",
          emoji: "🐊",
          funfato: "Crocodilos são os répteis mais próximos das aves no mundo animal!",
          detalhe: "Crocodilia | 240Ma | Coração 4 câmaras | Mesmo ancestral das aves"
        },
        {
          letra: "D",
          palavra: "Delfim",
          emoji: "🐬",
          funfato: "Golfinhos dormem com apenas metade do cérebro de cada vez!",
          detalhe: "Delphinidae | Sono unihemisférico | Sonar biológico | Mamíferos"
        },
        {
          letra: "E",
          palavra: "Elefante",
          emoji: "🐘",
          funfato: "Elefantes se lembram de amigos e inimigos por décadas!",
          detalhe: "Loxodonta/Elephas | Tromba: 100k músculos | Gestação: 22 meses"
        },
        {
          letra: "F",
          palavra: "Flamingo",
          emoji: "🦩",
          funfato: "Flamingos ficam rosas por causa dos camarões que comem!",
          detalhe: "Phoenicopteriformes | Carotenoides alimentares | Nascem brancos"
        },
        {
          letra: "G",
          palavra: "Golfinho",
          emoji: "🐬",
          funfato: "Golfinhos têm nomes uns para os outros — assobios únicos como identidades!",
          detalhe: "Tursiops truncatus | Assobios-assinatura | Ferramenta de esponja"
        },
        {
          letra: "H",
          palavra: "Hamster",
          emoji: "🐹",
          funfato: "Hamsters guardam metade do peso do corpo em comida nas bochechas!",
          detalhe: "Cricetinae | Bolsas da bochecha extensíveis | Correm 8km/noite"
        },
        {
          letra: "I",
          palavra: "Iguana",
          emoji: "🦎",
          funfato: "Iguanas têm um terceiro olho no topo da cabeça que detecta luz!",
          detalhe: "Iguanidae | Glândula parietal fotossensível | Herbívoras"
        },
        {
          letra: "J",
          palavra: "Jabuti",
          emoji: "🐢",
          funfato: "Jabutis podem viver mais de 100 anos!",
          detalhe: "Chelonoidis | Metabolismo lento | Casco: 60 ossos fundidos"
        },
        {
          letra: "K",
          palavra: "Koala",
          emoji: "🐨",
          funfato: "Koalas têm impressões digitais que até enganam cientistas!",
          detalhe: "Phascolarctos cinereus | 22h de sono/dia | Folhas eucalipto"
        },
        {
          letra: "L",
          palavra: "Leão",
          emoji: "🦁",
          funfato: "O rugido de um leão pode ser ouvido a 8 km de distância!",
          detalhe: "Panthera leo | Fêmeas caçam | Machos protegem | Dormem 20h/dia"
        },
        {
          letra: "M",
          palavra: "Morcego",
          emoji: "🦇",
          funfato: "Morcegos são os únicos mamíferos que realmente voam!",
          detalhe: "Chiroptera | Asa = mão modificada | Ecolocalização | 1.400+ sp."
        },
        {
          letra: "N",
          palavra: "Narval",
          emoji: "🐋",
          funfato: "O narval tem um dente espiral que pode medir 3 metros — o unicórnio do mar!",
          detalhe: "Monodon monoceros | Dente esquerdo espiral | Sensor eletromagnético"
        },
        {
          letra: "O",
          palavra: "Ornitorrinco",
          emoji: "🐾",
          funfato: "O ornitorrinco é um mamífero que bota ovos e tem veneno!",
          detalhe: "Ornithorhynchus | Monotremata | Bico com eletrorreceptores"
        },
        {
          letra: "P",
          palavra: "Panda",
          emoji: "🐼",
          funfato: "Pandas passam até 16 horas por dia comendo bambu!",
          detalhe: "Ailuropoda melanoleuca | 99% bambu | 6º dedo extra (pseudo-polegar)"
        },
        {
          letra: "Q",
          palavra: "Quati",
          emoji: "🦝",
          funfato: "Quatis usam o nariz longo e flexível para farejar comida sob as pedras!",
          detalhe: "Nasua nasua | Nariz articulável 30° | Onívoro | Grupos matriarcais"
        },
        {
          letra: "R",
          palavra: "Rinoceronte",
          emoji: "🦏",
          funfato: "O chifre do rinoceronte é feito de queratina — como nossas unhas!",
          detalhe: "Rhinocerotidae | 5 espécies | Chifre = queratina compactada"
        },
        {
          letra: "S",
          palavra: "Sapo",
          emoji: "🐸",
          funfato: "Sapos podem respirar pela pele!",
          detalhe: "Anura | Pele permeável: respiração cutânea | Absorvem água pela pele"
        },
        {
          letra: "T",
          palavra: "Tucano",
          emoji: "🦜",
          funfato: "O bico enorme do tucano serve para regular a temperatura do corpo!",
          detalhe: "Ramphastidae | Bico: 1/3 do corpo | Vascularização: termorregulação"
        },
        {
          letra: "U",
          palavra: "Urso Polar",
          emoji: "🐻‍❄️",
          funfato: "O pelo do urso polar parece branco, mas é transparente!",
          detalhe: "Ursus maritimus | Pelo oco capta UV | Pele preta absorve calor"
        },
        {
          letra: "V",
          palavra: "Veado",
          emoji: "🦌",
          funfato: "Os chifres do veado crescem 2,5 cm por dia — o tecido mais rápido da natureza!",
          detalhe: "Cervidae | Velvet: tecido vascular | Renovação anual"
        },
        {
          letra: "W",
          palavra: "Wombat",
          emoji: "🐨",
          funfato: "O wombat é o único animal que faz fezes em formato de cubo!",
          detalhe: "Vombatidae | Fezes cúbicas para marcação territorial | Marsupial"
        },
        {
          letra: "X",
          palavra: "Xexéu",
          emoji: "🐦",
          funfato: "O xexéu constrói ninhos que parecem cestas penduradas nas árvores!",
          detalhe: "Cacicus cela | Ninhos coloniais suspensos | Endêmico Brasil"
        },
        {
          letra: "Y",
          palavra: "Yak",
          emoji: "🐂",
          funfato: "O yak vive a 5.000m de altitude e tem sangue especial para o ar rarefeito!",
          detalhe: "Bos grunniens | Hemoglobina fetal (maior afinidade O₂) | Himalaias"
        },
        {
          letra: "Z",
          palavra: "Zebra",
          emoji: "🦓",
          funfato: "As listras de cada zebra são únicas — como impressões digitais!",
          detalhe: "Equus quagga | Padrão individual | Listras repelem moscas vetoras"
        }
      ]
    }
  },
  {
    id: "exp_alfabeto_comida",
    tipo: "alfabeto",
    titulo: "Comidas de A a Z",
    descricao: "Um alimento delicioso para cada letra!",
    emoji: "🍎",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "A feira da fruta abriu e tem um alimento para cada letra do alfabeto! 🍎 Clique em 🔊 para descobrir os sabores e segredos de cada um!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Abacate",
          emoji: "🥑",
          funfato: "O abacate é rico em gordura boa — do tipo que faz bem ao coração!",
          detalhe: "Persea americana | 70% gordura monoinsaturada | Vitaminas K, B9, C, E"
        },
        {
          letra: "B",
          palavra: "Beterraba",
          emoji: "🍠",
          funfato: "A beterraba pode deixar o xixi roxo — completamente normal e inofensivo!",
          detalhe: "Beta vulgaris | Betacianinas | Ácido fólico | Reduz pressão arterial"
        },
        {
          letra: "C",
          palavra: "Cenoura",
          emoji: "🥕",
          funfato: "Cenouras são laranjas por causa do betacaroteno que vira vitamina A!",
          detalhe: "Daucus carota | Betacaroteno: pró-vitamina A | Originalmente roxa/branca"
        },
        {
          letra: "D",
          palavra: "Damasco",
          emoji: "🍑",
          funfato: "O damasco seco tem mais ferro do que a carne vermelha!",
          detalhe: "Prunus armeniaca | Rico em ferro não-heme | Betacaroteno | Turquia"
        },
        {
          letra: "E",
          palavra: "Ervilha",
          emoji: "🟢",
          funfato: "Mendel estudou ervilhas para descobrir as leis da genética!",
          detalhe: "Pisum sativum | Leguminosa | Fixa nitrogênio no solo | Proteína vegetal"
        },
        {
          letra: "F",
          palavra: "Framboesa",
          emoji: "🫐",
          funfato: "A framboesa é feita de mini-frutinhos — cada bolinha é um fruto separado!",
          detalhe: "Rubus idaeus | ~85 drupéolas/fruto | Antocianinas | Vitamina C"
        },
        {
          letra: "G",
          palavra: "Goiaba",
          emoji: "🍓",
          funfato: "A goiaba tem mais vitamina C do que a laranja!",
          detalhe: "Psidium guajava | 5× mais vitamina C que laranja | Licopeno | Nativa Américas"
        },
        {
          letra: "H",
          palavra: "Hortelã",
          emoji: "🌿",
          funfato: "O cheiro fresco da hortelã vem de uma substância chamada mentol!",
          detalhe: "Mentha | Mentol: ativa receptor TRPM8 (sensação de frio) | 20+ espécies"
        },
        {
          letra: "I",
          palavra: "Inhame",
          emoji: "🍠",
          funfato: "O inhame é cultivado há mais de 50.000 anos — um dos alimentos mais antigos!",
          detalhe: "Dioscorea spp. | Raiz tuberosa | Rico em amido | Sudeste Asiático"
        },
        {
          letra: "J",
          palavra: "Jabuticaba",
          emoji: "🍇",
          funfato: "A jabuticaba nasce direto no tronco da árvore — não em galhos!",
          detalhe: "Plinia cauliflora | Caulifloria | Antocianinas | Endêmica do Brasil"
        },
        {
          letra: "K",
          palavra: "Kiwi",
          emoji: "🥝",
          funfato: "O kiwi tem mais vitamina C que a laranja e mais potássio que a banana!",
          detalhe: "Actinidia deliciosa | 2× vitamina C da laranja | Actinidina: enzima digestiva"
        },
        {
          letra: "L",
          palavra: "Limão",
          emoji: "🍋",
          funfato: "Marinheiros do século XVIII comiam limão para evitar o escorbuto!",
          detalhe: "Citrus limon | Vitamina C cura escorbuto | Britânicos = \"Limeys\""
        },
        {
          letra: "M",
          palavra: "Manga",
          emoji: "🥭",
          funfato: "A manga é a fruta tropical mais consumida no mundo!",
          detalhe: "Mangifera indica | Maior consumo global | Origem: Índia/Myanmar | Vitamina A, C"
        },
        {
          letra: "N",
          palavra: "Noz",
          emoji: "🥜",
          funfato: "A noz parece um cérebro — e realmente faz bem para o cérebro!",
          detalhe: "Juglans regia | Ômega-3 | Ácido α-linolênico | Antioxidantes"
        },
        {
          letra: "O",
          palavra: "Ovo",
          emoji: "🥚",
          funfato: "O ovo tem todos os nutrientes necessários para criar um ser vivo completo!",
          detalhe: "Proteína completa (8 aminoácidos essenciais) | Vitaminas A, D, E, K, B12"
        },
        {
          letra: "P",
          palavra: "Pimentão",
          emoji: "🫑",
          funfato: "O pimentão vermelho tem mais vitamina C do que o limão!",
          detalhe: "Capsicum annuum | Vermelho: 3× vitamina C da laranja | Sem capsaicina"
        },
        {
          letra: "Q",
          palavra: "Quiabo",
          emoji: "🥦",
          funfato: "O quiabo é viscoso por causa de uma fibra que reduz o colesterol!",
          detalhe: "Abelmoschus esculentus | Mucilagem: reduz colesterol LDL | Origem: África"
        },
        {
          letra: "R",
          palavra: "Romã",
          emoji: "🍎",
          funfato: "Uma romã pode ter até 1.400 sementes dentro dela!",
          detalhe: "Punica granatum | 200-1400 arilos | Polifenóis: punicalaginas | Antioxidante"
        },
        {
          letra: "S",
          palavra: "Salsinha",
          emoji: "🌿",
          funfato: "A salsinha tem mais vitamina K do que qualquer outra erva!",
          detalhe: "Petroselinum crispum | Vitaminas K, C, A | Apigenina: anti-inflamatória"
        },
        {
          letra: "T",
          palavra: "Tomate",
          emoji: "🍅",
          funfato: "O tomate é uma fruta, mas a lei dos EUA o classifica como legume — por causa dos impostos!",
          detalhe: "Solanum lycopersicum | Fruto botânico | Suprema Corte EUA 1893 | Licopeno"
        },
        {
          letra: "U",
          palavra: "Uva",
          emoji: "🍇",
          funfato: "As videiras existem há 65 milhões de anos — na era dos dinossauros!",
          detalhe: "Vitis vinifera | Domesticada há 8.000 anos | Resveratrol | 10.000 variedades"
        },
        {
          letra: "V",
          palavra: "Vagem",
          emoji: "🫘",
          funfato: "Vagens e ervilhas são da mesma família de plantas — as leguminosas!",
          detalhe: "Phaseolus vulgaris | Proteína vegetal | Fibras | Fixa nitrogênio | 400+ variedades"
        },
        {
          letra: "W",
          palavra: "Waffle",
          emoji: "🧇",
          funfato: "O waffle foi criado na Bélgica no século XIII!",
          detalhe: "Bélgica séc. XIII | Glúten + levedura | Astronautas comem waffles no espaço"
        },
        {
          letra: "X",
          palavra: "Xuxu",
          emoji: "🥦",
          funfato: "O xuxu é 96% água — um dos alimentos mais hidratantes do mundo!",
          detalhe: "Sechium edule | 96% água | Nativo América Central | Anti-hipertensivo"
        },
        {
          letra: "Y",
          palavra: "Yakisoba",
          emoji: "🍜",
          funfato: "O yakisoba é um macarrão frito japonês que virou febre nas praças de alimentação do Brasil!",
          detalhe: "Macarrão frito | Origem japonesa | Legumes + carne | Molho shoyu"
        },
        {
          letra: "Z",
          palavra: "Zucchini",
          emoji: "🥒",
          funfato: "O zucchini pode crescer tão rápido que em um dia triplica de tamanho!",
          detalhe: "Cucurbita pepo | Crescimento rápido (~15cm/dia) | 95% água | Anti-inflamatório"
        }
      ]
    }
  },
  {
    id: "exp_alfabeto_flores",
    tipo: "alfabeto",
    titulo: "Flores de A a Z",
    descricao: "Uma flor linda para cada letra do alfabeto!",
    emoji: "🌸",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "O jardim encantado tem uma flor para cada letra! 🌸 Clique em 🔊 para descobrir o nome e o segredo de cada uma!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Azaleia",
          emoji: "🌸",
          funfato: "A azaleia é tóxica para pets — mas linda nos jardins!",
          detalhe: "Rhododendron | Grayanotoxinas | China/Japão | Floresce no inverno"
        },
        {
          letra: "B",
          palavra: "Begônia",
          emoji: "🌺",
          funfato: "Existem mais de 1.800 espécies de begônia!",
          detalhe: "Begoniaceae | 1.800+ spp. | Flores masc. e fem. | Folhas assimétricas"
        },
        {
          letra: "C",
          palavra: "Cravo",
          emoji: "🌸",
          funfato: "Um cravo cortado dura mais de 3 semanas em água!",
          detalhe: "Dianthus caryophyllus | Etileno controla vida pós-colheita | Mediterrâneo"
        },
        {
          letra: "D",
          palavra: "Dália",
          emoji: "🌼",
          funfato: "A dália é a flor nacional do México, onde surgiu!",
          detalhe: "Dahlia | 42 espécies | Tubérculo | Asteraceae | Astecas: \"Acocotli\""
        },
        {
          letra: "E",
          palavra: "Estrelícia",
          emoji: "🌺",
          funfato: "A estrelícia parece um pássaro tropical voando — por isso se chama \"flor-do-paraíso\"!",
          detalhe: "Strelitzia reginae | Ornitofilia | Beija-flores polinizadores | África do Sul"
        },
        {
          letra: "F",
          palavra: "Frésia",
          emoji: "🌷",
          funfato: "O perfume da frésia é usado nos mais famosos sabonetes do mundo!",
          detalhe: "Freesia | Monoterpenos: limoneno, linalol | 10+ espécies | África do Sul"
        },
        {
          letra: "G",
          palavra: "Girassol",
          emoji: "🌻",
          funfato: "O girassol jovem acompanha o sol durante o dia — mas para quando cresce!",
          detalhe: "Helianthus annuus | Heliotropismo circadiano | 2.000 flores no disco"
        },
        {
          letra: "H",
          palavra: "Hibisco",
          emoji: "🌺",
          funfato: "O hibisco vira um chá vermelho delicioso e também serve de salada!",
          detalhe: "Hibiscus sabdariffa | Antocianinas | Vitamina C | Hipotensivo natural"
        },
        {
          letra: "I",
          palavra: "Íris",
          emoji: "🪻",
          funfato: "A íris tem nome da deusa grega do arco-íris porque vem em todas as cores!",
          detalhe: "Iris germanica | 300 spp. | Rizoma | Orris root: perfumaria | Grécia"
        },
        {
          letra: "J",
          palavra: "Jasmim",
          emoji: "🌸",
          funfato: "O jasmim é colhido de madrugada porque o cheiro é mais forte à noite!",
          detalhe: "Jasminum | Benzyl acetate | 200+ spp. | Índia e China | Chá de jasmim"
        },
        {
          letra: "K",
          palavra: "Kalanchoe",
          emoji: "🌻",
          funfato: "O kalanchoe floresce por meses e quase não precisa de água!",
          detalhe: "Kalanchoe blossfeldiana | CAM: fotossíntese noturna | Suculenta | Madagascar"
        },
        {
          letra: "L",
          palavra: "Lavanda",
          emoji: "🪷",
          funfato: "Cientistas provaram que o cheiro de lavanda reduz o estresse e ajuda a dormir!",
          detalhe: "Lavandula | Linalol + acetato linalila | EEG: relaxamento | Provence"
        },
        {
          letra: "M",
          palavra: "Margarida",
          emoji: "🌼",
          funfato: "Cada \"pétala\" da margarida é na verdade uma flor separada — é uma colônia!",
          detalhe: "Bellis perennis | Capítulo | Lígulas (raios) + flósculos (disco)"
        },
        {
          letra: "N",
          palavra: "Narciso",
          emoji: "🌼",
          funfato: "O narciso tem nome do personagem grego que se apaixonou pela própria imagem!",
          detalhe: "Narcissus | Narcisina: alcaloide | Bulbo | Espanha e Portugal"
        },
        {
          letra: "O",
          palavra: "Orquídea",
          emoji: "🌸",
          funfato: "As orquídeas são a maior família de flores do mundo — mais de 25.000 espécies!",
          detalhe: "Orchidaceae | 25.000+ spp. | Co-evolução com polinizadores | Baunilha"
        },
        {
          letra: "P",
          palavra: "Papoula",
          emoji: "🌺",
          funfato: "As papoulas formam tapetes vermelhos porque cada flor dura apenas 3 dias!",
          detalhe: "Papaver rhoeas | P. somniferum: morfina, codeína | Alcaloides"
        },
        {
          letra: "Q",
          palavra: "Quaresmeira",
          emoji: "🌸",
          funfato: "A quaresmeira floresce na Quaresma e enfeita ruas brasileiras com flores roxas!",
          detalhe: "Tibouchina granulosa | Endêmica Brasil | Cerrado | Melittofilia"
        },
        {
          letra: "R",
          palavra: "Rosa",
          emoji: "🌹",
          funfato: "A rosa é cultivada há mais de 5.000 anos — a flor mais famosa do mundo!",
          detalhe: "Rosa | 100+ espécies | Attar: 4 ton pétalas/1L | Bulgária: Valley of Roses"
        },
        {
          letra: "S",
          palavra: "Sálvia",
          emoji: "🌿",
          funfato: "A sálvia é tempero de cozinha E remédio natural há mais de 2.000 anos!",
          detalhe: "Salvia officinalis | Ácido rosmarínico: anti-inflamatório | Lamiaceae"
        },
        {
          letra: "T",
          palavra: "Tulipa",
          emoji: "🌷",
          funfato: "No século XVII, uma tulipa rara custava mais do que uma casa na Holanda!",
          detalhe: "Tulipa | Tulipamania 1637 | Vírus da mancha | Turquia → Holanda"
        },
        {
          letra: "U",
          palavra: "Ulmeira",
          emoji: "🌿",
          funfato: "A ulmeira floresce antes de ter folhas — os pássaros adoram suas sementes!",
          detalhe: "Ulmus | Anemofilia | Flores antes das folhas | Samaras aladas"
        },
        {
          letra: "V",
          palavra: "Violeta",
          emoji: "💜",
          funfato: "Napoleão Bonaparte amava tanto as violetas que as carregava sempre consigo!",
          detalhe: "Viola odorata | Ionona | Corante natural | \"Flor do êxtase\" grega"
        },
        {
          letra: "W",
          palavra: "Wistéria",
          emoji: "🌸",
          funfato: "Uma wistéria japonesa pode viver mais de 100 anos e pesar toneladas!",
          detalhe: "Wisteria floribunda | Trepadeira | Cachos 90cm | Tóxica se ingerida"
        },
        {
          letra: "X",
          palavra: "Xeranthemum",
          emoji: "🌸",
          funfato: "O xeranthemum seca mas mantém as cores por meses — é uma flor eterna!",
          detalhe: "Xeranthemum annuum | Flores permanentes | Mediterrâneo | Arranjos secos"
        },
        {
          letra: "Y",
          palavra: "Ylang-Ylang",
          emoji: "🌸",
          funfato: "O ylang-ylang é um dos ingredientes do famoso perfume Chanel Nº 5!",
          detalhe: "Cananga odorata | Benzyl acetate + geraniol | Filipinas | Perfumaria"
        },
        {
          letra: "Z",
          palavra: "Zínia",
          emoji: "🌸",
          funfato: "A zínia foi a primeira flor cultivada e colhida no espaço pela NASA em 2016!",
          detalhe: "Zinnia elegans | ISS 2016 | Autopolinização | México | 12 cores"
        }
      ]
    }
  },
  {
    id: "exp_alfabeto_oceano",
    tipo: "alfabeto",
    titulo: "Oceano de A a Z",
    descricao: "Um animal marinho para cada letra do alfabeto!",
    emoji: "🌊",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "O oceano esconde um animal para cada letra do alfabeto! 🌊 Clique em 🔊 para mergulhar e conhecer cada um!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Anêmona",
          emoji: "🌺",
          funfato: "A anêmona é a \"casa\" do peixe-palhaço — como o Nemo!",
          detalhe: "Actiniaria | Tentáculos urticantes | Simbiose com Amphiprion | Cnidários"
        },
        {
          letra: "B",
          palavra: "Baleia-Azul",
          emoji: "🐋",
          funfato: "A baleia-azul é o maior animal que já existiu na Terra — maior que dinossauros!",
          detalhe: "Balaenoptera musculus | 30m, 180t | Coração 600kg | Voz 188dB"
        },
        {
          letra: "C",
          palavra: "Caranguejo",
          emoji: "🦀",
          funfato: "O caranguejo anda de lado porque suas pernas dobram assim!",
          detalhe: "Brachyura | 6.793 espécies | Exoesqueleto quitinoso | Troca de casca"
        },
        {
          letra: "D",
          palavra: "Dugongo",
          emoji: "🐾",
          funfato: "Acredita-se que o dugongo inspirou as lendas das sereias!",
          detalhe: "Dugong dugon | Sirênia | Ervas marinhas | 70 anos | Indo-Pacífico"
        },
        {
          letra: "E",
          palavra: "Estrela-do-mar",
          emoji: "⭐",
          funfato: "A estrela-do-mar consegue regenerar um braço inteiro se perder um!",
          detalhe: "Asteroidea | Regeneração | Estômago externo | Pés tubulares"
        },
        {
          letra: "F",
          palavra: "Foca",
          emoji: "🦭",
          funfato: "A foca fecha as narinas embaixo d'água — elas só abrem para respirar!",
          detalhe: "Phocidae | Narinas valvulares | 2h mergulho | 600m profundidade"
        },
        {
          letra: "G",
          palavra: "Golfinho",
          emoji: "🐬",
          funfato: "Cada golfinho tem um assobio único — é seu \"nome\"!",
          detalhe: "Delphinidae | Assobio-assinatura | Sono unihemisférico | Sonar biológico"
        },
        {
          letra: "H",
          palavra: "Hipocampo",
          emoji: "🐴",
          funfato: "O hipocampo macho é quem fica grávido e dá à luz os filhotes!",
          detalhe: "Hippocampus | Bolsa incubatória no macho | Monogamia | Nada vertical"
        },
        {
          letra: "I",
          palavra: "Isópodo-Gigante",
          emoji: "🦐",
          funfato: "O isópodo gigante parece um tatuzão do fundo do mar e pode chegar a 45cm!",
          detalhe: "Bathynomus giganteus | Zona abisal | 4.000m | Nada para trás | Meses sem comer"
        },
        {
          letra: "J",
          palavra: "Jamanta",
          emoji: "🐟",
          funfato: "A jamanta é a maior raia do mundo — tem até 7 metros de largura!",
          detalhe: "Mobula birostris | 7m envergadura | 2t | Planctonívora | Saltos fora da água"
        },
        {
          letra: "K",
          palavra: "Krill",
          emoji: "🦐",
          funfato: "O krill é tão pequeno mas alimenta as maiores baleias do mundo!",
          detalhe: "Euphausiidae | 6cm | Biomassa: 500Mt | Pesca 300.000t/ano | Antártica"
        },
        {
          letra: "L",
          palavra: "Lagosta",
          emoji: "🦞",
          funfato: "A lagosta \"ouve\" vibrações com as pernas — ela não tem ouvidos!",
          detalhe: "Palinuridae | Estatocistos nas pernas | Quimiorreceptores nas antenas"
        },
        {
          letra: "M",
          palavra: "Medusa",
          emoji: "🪼",
          funfato: "A medusa é 99% água — se ficar fora do mar, quase desaparece!",
          detalhe: "Medusozoa | 99% H₂O | Turritopsis: potencialmente imortal | Sem cérebro"
        },
        {
          letra: "N",
          palavra: "Nautilo",
          emoji: "🐚",
          funfato: "O nautilo é um \"fóssil vivo\" — existe há 500 milhões de anos sem mudar!",
          detalhe: "Nautilus | 500 Ma | Câmaras com gás | Cephalopoda | 90 tentáculos"
        },
        {
          letra: "O",
          palavra: "Ouriço-do-mar",
          emoji: "🦔",
          funfato: "O ouriço-do-mar tem exatamente 5 dentes apontados para baixo — como uma lanterna!",
          detalhe: "Echinoidea | Lanterna-de-Aristóteles | Equinoderma | Simetria pentarradial"
        },
        {
          letra: "P",
          palavra: "Polvo",
          emoji: "🐙",
          funfato: "O polvo tem 3 corações, sangue azul e 9 cérebros!",
          detalhe: "Octopoda | 3 corações | Hemocianina (azul) | 9 cérebros (1 central + 8 braços)"
        },
        {
          letra: "Q",
          palavra: "Quiri",
          emoji: "🐚",
          funfato: "O quiri (vieira) consegue \"pular\" abrindo e fechando a concha rapidamente!",
          detalhe: "Pectinidae | Nado propulsão por jato | 200 olhos simples na borda do manto"
        },
        {
          letra: "R",
          palavra: "Raia",
          emoji: "🐟",
          funfato: "A raia é parente próxima do tubarão — ambos têm esqueleto de cartilagem!",
          detalhe: "Batoidea | Cartilaginosa | Eletrorreceptores: Ampolas de Lorenzini | 600 spp."
        },
        {
          letra: "S",
          palavra: "Salmão",
          emoji: "🐟",
          funfato: "O salmão nada de volta exatamente para o rio onde nasceu para pôr ovos!",
          detalhe: "Salmo/Oncorhynchus | Quimiorreceptores olfativos | Anádromo | Migração"
        },
        {
          letra: "T",
          palavra: "Tartaruga",
          emoji: "🐢",
          funfato: "Tartarugas marinhas existem há 200 milhões de anos — desde a era dos dinossauros!",
          detalhe: "Cheloniidae/Dermochelyidae | 200 Ma | Magnetoreceptores | Cloaca respiratória"
        },
        {
          letra: "U",
          palavra: "Urso-Marinho",
          emoji: "🦭",
          funfato: "O urso-marinho nada a 35km/h — mais rápido que um carro na cidade!",
          detalhe: "Arctocephalus | Otariidae | 35 km/h | Bigodes: detectam vibrações"
        },
        {
          letra: "V",
          palavra: "Vieira",
          emoji: "🐚",
          funfato: "A vieira tem mais de 200 olhinhos azuis ao redor da concha!",
          detalhe: "Argopecten irradians | 200 olhos compostos | Refletor côncavo na retina"
        },
        {
          letra: "W",
          palavra: "Wahoo",
          emoji: "🐟",
          funfato: "O wahoo é um dos peixes mais velozes do oceano — nada a 97 km/h!",
          detalhe: "Acanthocybium solandri | 97 km/h | Dentes serrilhados | Água tropical"
        },
        {
          letra: "X",
          palavra: "Xaréu",
          emoji: "🐟",
          funfato: "O xaréu é um peixe azul-esverdeado muito apreciado na culinária brasileira!",
          detalhe: "Caranx latus | Carangidae | Pesca esportiva | Atlântico Sul"
        },
        {
          letra: "Y",
          palavra: "Yeti-Crab",
          emoji: "🦀",
          funfato: "O caranguejo-yeti foi descoberto em 2005 no fundo do oceano e parece coberto de pelos!",
          detalhe: "Kiwa hirsuta | Hidrotermais | Profundidade 2.200m | Espécie nova 2005"
        },
        {
          letra: "Z",
          palavra: "Zooplâncton",
          emoji: "🦐",
          funfato: "O zooplâncton é feito de bichinhos minúsculos — e é a base de toda a cadeia alimentar do mar!",
          detalhe: "Microscópico | Base da cadeia alimentar | Krill | Sobe à superfície à noite"
        }
      ]
    }
  },
  {
    id: "exp_alfabeto_esportes",
    tipo: "alfabeto",
    titulo: "Esportes de A a Z",
    descricao: "Um esporte incrível para cada letra do alfabeto!",
    emoji: "⚽",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "A olimpíada do alfabeto tem um esporte para cada letra! ⚽ Clique em 🔊 e descubra curiosidades de cada modalidade!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Atletismo",
          emoji: "🏃",
          funfato: "O atletismo é o esporte mais antigo das Olimpíadas — desde a Grécia antiga!",
          detalhe: "Corrida, salto, arremesso | Olimpíadas 776 a.C. | 24 modalidades na IAAF"
        },
        {
          letra: "B",
          palavra: "Basquete",
          emoji: "🏀",
          funfato: "O basquete foi inventado em 1891 usando cestas de pêssegos de verdade!",
          detalhe: "James Naismith | 1891 | YMCA Springfield | Cesta original tinha fundo: tirava-se a bola a cada ponto"
        },
        {
          letra: "C",
          palavra: "Ciclismo",
          emoji: "🚴",
          funfato: "O Tour de France tem 3.500 km de distância — como ir de SP a Fortaleza!",
          detalhe: "Tour de France: 21 etapas | 3.500km | UCI | Desde 1903"
        },
        {
          letra: "D",
          palavra: "Dança-Esportiva",
          emoji: "💃",
          funfato: "A dança esportiva entrou nos Jogos Mundiais em 1981 como esporte oficial!",
          detalhe: "Standard + Latino | Avaliação técnica e artística | WDSF | 10 danças"
        },
        {
          letra: "E",
          palavra: "Esgrima",
          emoji: "🤺",
          funfato: "Na esgrima, o toque mais rápido acontece em 25 milissegundos — mais rápido que um piscar de olhos!",
          detalhe: "Florete, Espada, Sabre | FIE | 25ms toque | Olimpíadas desde 1896"
        },
        {
          letra: "F",
          palavra: "Futebol",
          emoji: "⚽",
          funfato: "O futebol é o esporte mais popular do mundo — mais de 3 bilhões de fãs!",
          detalhe: "FIFA: 211 federações | 3,5 bilhões de fãs | Regras codificadas 1863 | UK"
        },
        {
          letra: "G",
          palavra: "Ginástica",
          emoji: "🤸",
          funfato: "Simone Biles inventou movimentos tão difíceis que eles têm o nome dela!",
          detalhe: "FIG: artística, rítmica, acrobática | 4 movimentos \"Biles\" em código"
        },
        {
          letra: "H",
          palavra: "Handebol",
          emoji: "🤾",
          funfato: "O handebol nasceu no norte da Europa e o Brasil já foi campeão mundial feminino!",
          detalhe: "IHF | 7 jogadores | Dinamarca/Alemanha 1898 | Brasil: mundial feminino 2013"
        },
        {
          letra: "I",
          palavra: "Iatismo",
          emoji: "⛵",
          funfato: "No iatismo, o vento é o único motor — os velejadores usam a natureza para ganhar!",
          detalhe: "World Sailing | 10 classes olímpicas | Laser, 49er, Nacra 17"
        },
        {
          letra: "J",
          palavra: "Judô",
          emoji: "🥋",
          funfato: "O judô significa \"caminho suave\" — e ensina a usar a força do adversário!",
          detalhe: "Jigoro Kano | 1882 | \"Judô\" = caminho suave | Olímpico desde 1964"
        },
        {
          letra: "K",
          palavra: "Karatê",
          emoji: "🥋",
          funfato: "O karatê tem mais de 500 anos e nasceu na ilha de Okinawa, no Japão!",
          detalhe: "\"Mão vazia\" | Okinawa séc. XV | Katas e kumite | Olímpico em Tóquio 2020"
        },
        {
          letra: "L",
          palavra: "Luta-Livre",
          emoji: "🤼",
          funfato: "A luta livre é o esporte mais antigo do mundo — tem 15.000 anos de história!",
          detalhe: "Pinturas rupestres 15.000a.C. | Olímpico 776 a.C. | UWW | Greco-romana"
        },
        {
          letra: "M",
          palavra: "Mergulho",
          emoji: "🤿",
          funfato: "No mergulho de trampolim, o atleta gira 4 vezes no ar em menos de 1 segundo!",
          detalhe: "FINA | Trampolim 1m e 3m, plataforma 10m | G-force: 3g | Pontuação: dificuldade × execução"
        },
        {
          letra: "N",
          palavra: "Natação",
          emoji: "🏊",
          funfato: "Michael Phelps ganhou 28 medalhas olímpicas — mais do que muitos países!",
          detalhe: "FINA | 40 provas | Phelps: 23 ouros | Velocidade: 8,6 km/h (Caeleb Dressel)"
        },
        {
          letra: "O",
          palavra: "Orientação",
          emoji: "🧭",
          funfato: "No esporte de orientação, você só tem um mapa e uma bússola para se achar na floresta!",
          detalhe: "IOF | Mapa + bússola | Floresta | Criado na Noruega 1897"
        },
        {
          letra: "P",
          palavra: "Polo-Aquático",
          emoji: "🏊",
          funfato: "No polo aquático, os jogadores nadam mais de 3 km por jogo sem parar!",
          detalhe: "FINA | 7 jogadores | 3km natação/jogo | Olímpico desde 1900"
        },
        {
          letra: "Q",
          palavra: "Queimada",
          emoji: "🏃",
          funfato: "A queimada é uma das brincadeiras esportivas mais populares das escolas brasileiras!",
          detalhe: "Variante do dodgeball | Queimadores + fugitivos | Equipes + mortos ressuscitam"
        },
        {
          letra: "R",
          palavra: "Remo",
          emoji: "🚣",
          funfato: "O remo olímpico existe desde 1896 — uma das modalidades mais antigas dos Jogos!",
          detalhe: "FISA | 14 eventos olímpicos | 2.000m | Pesos: peso-leve e aberto"
        },
        {
          letra: "S",
          palavra: "Surf",
          emoji: "🏄",
          funfato: "O surf estreou nas Olimpíadas em Tóquio 2020 e o Brasil levou o ouro!",
          detalhe: "ISA | Polinésia há 3.000 anos | Italo Ferreira: ouro Tóquio | ondas 1-10pt"
        },
        {
          letra: "T",
          palavra: "Tênis",
          emoji: "🎾",
          funfato: "Wimbledon é o torneio de tênis mais antigo do mundo — existe desde 1877!",
          detalhe: "ITF | Wimbledon 1877 | Grand Slam: Aberto, Roland Garros, W, US Open"
        },
        {
          letra: "U",
          palavra: "Ultimate",
          emoji: "🥏",
          funfato: "No ultimate frisbee, não existe árbitro — os próprios jogadores marcam as faltas!",
          detalhe: "WFDF | Espírito esportivo | Sem árbitro | 7×7 | Inventado 1968 EUA"
        },
        {
          letra: "V",
          palavra: "Vôlei",
          emoji: "🏐",
          funfato: "O vôlei foi criado em 1895 misturando ideias do basquete e do tênis!",
          detalhe: "FIVB | William Morgan 1895 | 6×6 | Olímpico desde 1964 | Beach 1996"
        },
        {
          letra: "W",
          palavra: "Windsurf",
          emoji: "🏄",
          funfato: "No windsurf, a vela e a prancha são juntas — você surfa o vento e as ondas ao mesmo tempo!",
          detalhe: "IWA | Inventado 1964 EUA | 50 km/h | Olímpico desde Los Angeles 1984"
        },
        {
          letra: "X",
          palavra: "Xadrez",
          emoji: "♟️",
          funfato: "O xadrez existe há 1.500 anos e é reconhecido como esporte pela Olimpíada!",
          detalhe: "FIDE | Índia séc. VI | 318 bilhões de posições após 5 movimentos"
        },
        {
          letra: "Y",
          palavra: "Yoga",
          emoji: "🧘",
          funfato: "A yoga existe há mais de 5.000 anos e surgiu como prática espiritual na Índia!",
          detalhe: "Vedas: 3.000 a.C. | 840.000 ásanas tradicionais | ONU: Dia Internacional 21/6"
        },
        {
          letra: "Z",
          palavra: "Zumba",
          emoji: "💃",
          funfato: "A zumba foi criada por acidente quando um professor de academia esqueceu a música!",
          detalhe: "Beto Pérez 1990 | 200 países | 15 milhões de praticantes | Ritmos latinos"
        }
      ]
    }
  },
  {
    id: "exp_alfabeto_frutas",
    tipo: "alfabeto",
    titulo: "Frutas de A a Z",
    descricao: "Uma fruta diferente para cada letra do alfabeto!",
    emoji: "🍓",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "O pomar do alfabeto está pronto para colher! 🍓 Clique em 🔊 e descubra uma fruta incrível para cada letra!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Abacaxi",
          emoji: "🍍",
          funfato: "O abacaxi demora 2 anos para crescer — um fruto muito paciente!",
          detalhe: "Ananas comosus | Bromelina: enzima | Nativo Brasil/Paraguai | 2 anos maturação"
        },
        {
          letra: "B",
          palavra: "Banana",
          emoji: "🍌",
          funfato: "A banana é a fruta mais vendida no mundo e carrega potássio que evita câimbras!",
          detalhe: "Musa paradisiaca | Mais vendida globalmente | Potássio 358mg/100g"
        },
        {
          letra: "C",
          palavra: "Cereja",
          emoji: "🍒",
          funfato: "As cerejeiras japonesas florescem por apenas 2 semanas e atraem milhões de turistas!",
          detalhe: "Prunus avium | Hanami: festival das cerejeiras | Antocianinas | Japão"
        },
        {
          letra: "D",
          palavra: "Damasco",
          emoji: "🍑",
          funfato: "O damasco foi trazido para a Europa por Alexandre, o Grande!",
          detalhe: "Prunus armeniaca | Via Seda | Carotenoides | Ferro não-heme | Armênia"
        },
        {
          letra: "E",
          palavra: "Estelinha",
          emoji: "🌟",
          funfato: "A estelinha (carambola) tem formato de estrela quando cortada — perfeita para decorar!",
          detalhe: "Averrhoa carambola | 5 costelas | Oxalato: evitar em doenças renais | SE Ásia"
        },
        {
          letra: "F",
          palavra: "Figo",
          emoji: "🫐",
          funfato: "O figo é um dos alimentos mais antigos cultivados pelo ser humano — antes do trigo!",
          detalhe: "Ficus carica | 11.000 a.C. | Simbiontes com Blastophaga (vespa) | Mediterrâneo"
        },
        {
          letra: "G",
          palavra: "Graviola",
          emoji: "🍈",
          funfato: "A graviola é nativa da Amazônia e tem um sabor que mistura framboesa com abacaxi!",
          detalhe: "Annona muricata | Acetogeninas: pesquisa anticâncer | Nativa Américas tropicais"
        },
        {
          letra: "H",
          palavra: "Havaiano (mamão)",
          emoji: "🍑",
          funfato: "O mamão havaiano foi modificado para resistir a um vírus que ameaçava extinguir a fruta!",
          detalhe: "Carica papaya | Transgênico para PRSV | Papaína: enzima digestiva"
        },
        {
          letra: "I",
          palavra: "Ingá",
          emoji: "🌿",
          funfato: "O ingá é uma fruta brasileira com polpa branca doce que parece algodão!",
          detalhe: "Inga edulis | Polpa: arilo branco | Semente: tóxica | Mata Atlântica"
        },
        {
          letra: "J",
          palavra: "Jabuticaba",
          emoji: "🍇",
          funfato: "A jabuticaba nasce diretamente no tronco da árvore — não em galhos!",
          detalhe: "Plinia cauliflora | Caulifloria | Antocianinas | Endêmica Brasil"
        },
        {
          letra: "K",
          palavra: "Kiwi",
          emoji: "🥝",
          funfato: "Um kiwi tem mais vitamina C do que uma laranja do mesmo tamanho!",
          detalhe: "Actinidia deliciosa | 2× vitamina C da laranja | Nova Zelândia | Actinidina"
        },
        {
          letra: "L",
          palavra: "Lichia",
          emoji: "🍒",
          funfato: "A lichia era a fruta favorita da imperatriz Yang Guifei da China há 1.000 anos!",
          detalhe: "Litchi chinensis | Polpa translúcida | China 100 a.C. | Vitamina C"
        },
        {
          letra: "M",
          palavra: "Melancia",
          emoji: "🍉",
          funfato: "A melancia é 92% água — é como comer água com sabor!",
          detalhe: "Citrullus lanatus | 92% água | Licopeno | Nativa África | 2.000 variedades"
        },
        {
          letra: "N",
          palavra: "Nêspera",
          emoji: "🍑",
          funfato: "A nêspera é uma fruta japonesa que amadurece no inverno — ao contrário da maioria!",
          detalhe: "Eriobotrya japonica | Madura no inverno | Vitamina A | Japão/China"
        },
        {
          letra: "O",
          palavra: "Oliva",
          emoji: "🫒",
          funfato: "Uma oliveira pode viver mais de 2.000 anos — há árvores desde o tempo de Cristo!",
          detalhe: "Olea europaea | 2.000+ anos | Gordura monoinsaturada | Mediterrâneo"
        },
        {
          letra: "P",
          palavra: "Pitanga",
          emoji: "🍒",
          funfato: "A pitanga tem mais vitamina C do que a laranja e é da Mata Atlântica brasileira!",
          detalhe: "Eugenia uniflora | Vitamina C altíssima | Antocianinas | Brasil"
        },
        {
          letra: "Q",
          palavra: "Quivi",
          emoji: "🥝",
          funfato: "O quivi tem mais vitamina C do que a laranja — e até a casca peluda dá para comer!",
          detalhe: "Actinidia deliciosa | Origem na China | Rico em vitamina C e K | Actinidina"
        },
        {
          letra: "R",
          palavra: "Romã",
          emoji: "🍎",
          funfato: "Uma romã pode ter até 1.400 sementes dentro dela!",
          detalhe: "Punica granatum | 200-1.400 arilos | Punicalaginas: antioxidante | Oriente Médio"
        },
        {
          letra: "S",
          palavra: "Sapoti",
          emoji: "🍑",
          funfato: "O sapoti tem gosto de caramelo natural — é a fruta mais doce do Brasil!",
          detalhe: "Manilkara zapota | 20% açúcar | Látex: goma de mascar | América Central"
        },
        {
          letra: "T",
          palavra: "Tangerina",
          emoji: "🍊",
          funfato: "A tangerina é fácil de descascar porque a casca \"flutua\" sobre a polpa!",
          detalhe: "Citrus reticulata | Flavedo + albedo separados | Vitamina C | China"
        },
        {
          letra: "U",
          palavra: "Uva",
          emoji: "🍇",
          funfato: "Videiras existem há 65 milhões de anos — sobreviveram à extinção dos dinossauros!",
          detalhe: "Vitis vinifera | 65 Ma | 10.000 variedades | Resveratrol | Fermentação"
        },
        {
          letra: "V",
          palavra: "Videira",
          emoji: "🍇",
          funfato: "A videira é a planta que dá a uva — algumas vivem mais de 100 anos dando frutos!",
          detalhe: "Vitis vinifera | Uva de mesa e de vinho | Poda anual | Cultivada há 8.000 anos"
        },
        {
          letra: "W",
          palavra: "Wampee",
          emoji: "🍈",
          funfato: "O wampee é uma fruta tropical asiática com sabor de limão e manga ao mesmo tempo!",
          detalhe: "Clausena lansium | Sudeste Asiático | Limonoides | Cresce em regiões tropicais"
        },
        {
          letra: "X",
          palavra: "Xuxu",
          emoji: "🥒",
          funfato: "O xuxu (chuchu) é tecnicamente uma fruta — a semente fica dentro do fruto!",
          detalhe: "Sechium edule | Fruto botânico | 94% água | América Central | Cucurbitaceae"
        },
        {
          letra: "Y",
          palavra: "Yacon",
          emoji: "🌿",
          funfato: "O yacon é um tubérculo doce dos Andes que parece batata mas tem gosto de pera!",
          detalhe: "Smallanthus sonchifolius | Frutooligossacarídeos | Prebiótico | Peru"
        },
        {
          letra: "Z",
          palavra: "Ziziphus",
          emoji: "🍎",
          funfato: "A ziziphus (jujuba chinesa) parece uma mini-maçã e é cultivada há 4.000 anos!",
          detalhe: "Ziziphus jujuba | 4.000 anos | Vitamina C 20× laranja | China | Secagem"
        }
      ]
    }
  },
  {
    id: "exp_alfabeto_brinquedos",
    tipo: "alfabeto",
    titulo: "Brinquedos de A a Z",
    descricao: "Um brinquedo divertido para cada letra!",
    emoji: "🧸",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "A brinquedoteca do alfabeto está aberta! 🧸 Clique em 🔊 e conheça um brinquedo para cada letra!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Avião-de-Papel",
          emoji: "✈️",
          funfato: "O maior avião de papel do mundo voou mais de 60 metros!",
          detalhe: "Aerodinâmica | Sustentação | Centro de gravidade | Dobraduras precisas"
        },
        {
          letra: "B",
          palavra: "Boneca",
          emoji: "🪆",
          funfato: "As primeiras bonecas tinham mais de 4.000 anos e eram feitas de madeira e barro!",
          detalhe: "Egito Antigo: 4.000 a.C. | Argila, madeira, osso | Barbie: 1959 (Mattel)"
        },
        {
          letra: "C",
          palavra: "Carrinho",
          emoji: "🚗",
          funfato: "Os primeiros carrinhos de brinquedo eram feitos de madeira e lata há 100 anos!",
          detalhe: "Hot Wheels: 1968 | Diecast metal | Escala 1:64 | +6 bilhões vendidos"
        },
        {
          letra: "D",
          palavra: "Dado",
          emoji: "🎲",
          funfato: "O dado é o brinquedo mais antigo do mundo — tem mais de 5.000 anos!",
          detalhe: "Ossos de animais → marfim → plástico | 5.000 a.C. | Probabilidade 1/6"
        },
        {
          letra: "E",
          palavra: "Estilingue",
          emoji: "🪃",
          funfato: "O estilingue funciona pela mesma física de uma catapulta medieval!",
          detalhe: "Energia potencial elástica → cinética | Lei de Hooke | Precisão e mira"
        },
        {
          letra: "F",
          palavra: "Fantoche",
          emoji: "🧸",
          funfato: "Fantoches existem há mais de 3.000 anos e eram usados para contar histórias!",
          detalhe: "Marionetes: fios | Dedos | Luva | Teatro de sombras | China: 2.000 a.C."
        },
        {
          letra: "G",
          palavra: "Gude",
          emoji: "⚪",
          funfato: "O jogo de gude existe há mais de 3.500 anos — crianças no Egito já jogavam!",
          detalhe: "Bola de vidro/argila/pedra | Egito 1.500 a.C. | Física: colisão elástica"
        },
        {
          letra: "H",
          palavra: "Hula-Hoop",
          emoji: "⭕",
          funfato: "O hula-hoop foi o brinquedo que mais vendeu em 4 meses na história — 100 milhões!",
          detalhe: "Wham-O 1958 | 100Mi em 4 meses | Giroscópio: manter equilíbrio | Cintura"
        },
        {
          letra: "I",
          palavra: "Imã-Brinquedo",
          emoji: "🧲",
          funfato: "Brinquedos magnéticos ensinam física real enquanto você brinca!",
          detalhe: "Campo magnético | Norte + Sul se atraem | Magnetita natural | Eletromagnetismo"
        },
        {
          letra: "J",
          palavra: "Jogo-da-Memória",
          emoji: "🃏",
          funfato: "Jogar memória treina o cérebro e pode até prevenir doenças cognitivas!",
          detalhe: "Memória visual | Hipocampo | Pares: combinação | Concentração + memória"
        },
        {
          letra: "K",
          palavra: "Kit-de-Ciência",
          emoji: "🔬",
          funfato: "Kits de ciência foram criados para fazer crianças amarem experimentar!",
          detalhe: "STEM | Hipótese → experimento → conclusão | Marie Curie: kit de química"
        },
        {
          letra: "L",
          palavra: "Lego",
          emoji: "🧱",
          funfato: "O LEGO tem mais de 900 bilhões de pecinhas produzidas — 90 por pessoa no mundo!",
          detalhe: "Dinamarca 1949 | ABS plastic | Stud-and-tube | 900Bi peças produzidas"
        },
        {
          letra: "M",
          palavra: "Massinha",
          emoji: "🎨",
          funfato: "A massa de modelar foi criada para limpar papéis de parede e virou brinquedo!",
          detalhe: "Play-Doh: 1956 | Acidentalmente descoberta | Água + sal + farinha"
        },
        {
          letra: "N",
          palavra: "Navio-Miniatura",
          emoji: "⛵",
          funfato: "Navios em garrafas são feitos com palitos e pinças por dentro do gargalo!",
          detalhe: "Ship-in-bottle | Mastros dobráveis | Paciência + precisão | Arte náutica"
        },
        {
          letra: "O",
          palavra: "Óculos-Louco",
          emoji: "🕶️",
          funfato: "Óculos engraçados com mola foram usados pela primeira vez num circo americano!",
          detalhe: "Adereços cômicos | Polipropileno | Festa e diversão | Acessório de brinquedo"
        },
        {
          letra: "P",
          palavra: "Pião",
          emoji: "🌀",
          funfato: "O pião usa o mesmo princípio de um giroscópio de foguete para não cair!",
          detalhe: "Precessão: rotação do eixo | Conservação do momento angular | 3.500 a.C."
        },
        {
          letra: "Q",
          palavra: "Quebra-Cabeça",
          emoji: "🧩",
          funfato: "O maior quebra-cabeça do mundo tem 551.232 peças!",
          detalhe: "John Spilsbury 1767 | Mapas cortados | Puzzle 551.232: Ravensburger 2022"
        },
        {
          letra: "R",
          palavra: "Robô",
          emoji: "🤖",
          funfato: "Os robôs de brinquedo foram criados para ensinar crianças a programar!",
          detalhe: "STEM robotics | Lego Mindstorms | Scratch | Programação lógica visual"
        },
        {
          letra: "S",
          palavra: "Slime",
          emoji: "🟢",
          funfato: "O slime é um fluido não-newtoniano — se comporta como sólido e líquido ao mesmo tempo!",
          detalhe: "Polímero de PVA + borato | Fluido não-newtoniano | Tixotrópico"
        },
        {
          letra: "T",
          palavra: "Trem-de-Brinquedo",
          emoji: "🚂",
          funfato: "O primeiro trem de brinquedo funcionava a vapor real em 1840!",
          detalhe: "Märklin: 1859 | Vapor → corda → eletricidade | Escala HO 1:87"
        },
        {
          letra: "U",
          palavra: "Urso-de-Pelúcia",
          emoji: "🧸",
          funfato: "O ursinho de pelúcia leva o nome do presidente americano Teddy Roosevelt!",
          detalhe: "Theodore Roosevelt 1902 | Recusou matar urso amarrado | \"Teddy Bear\""
        },
        {
          letra: "V",
          palavra: "Videogame",
          emoji: "🎮",
          funfato: "O primeiro videogame foi inventado em 1958 por um físico para impressionar visitantes!",
          detalhe: "Tennis for Two: 1958 | Pong: 1972 | Atari, Nintendo, Sega, Sony"
        },
        {
          letra: "W",
          palavra: "Walkie-Talkie",
          emoji: "📻",
          funfato: "O walkie-talkie foi criado durante a Segunda Guerra para comunicação militar!",
          detalhe: "Galvin Manufacturing: 1940 | Ondas de rádio VHF/UHF | Half-duplex"
        },
        {
          letra: "X",
          palavra: "Xilofone",
          emoji: "🎵",
          funfato: "O xilofone ensina música de forma visual — cada barra tem um tamanho e som diferente!",
          detalhe: "Idiofone | Barras de madeira/metal | Frequência ∝ 1/comprimento | África"
        },
        {
          letra: "Y",
          palavra: "Yo-Yo",
          emoji: "🪀",
          funfato: "O yo-yo é um dos brinquedos mais antigos do mundo — tem mais de 2.500 anos!",
          detalhe: "Filipinas: 500 a.C. | Donald Duncan: 1929 | Energia cinética + potencial"
        },
        {
          letra: "Z",
          palavra: "Zunidor",
          emoji: "🌀",
          funfato: "O zunidor (spinner) vira com a força do sopro e emite um zumbido hipnótico!",
          detalhe: "Zumbidor/bullroarer | 25.000 a.C. | Austrália aborígene | Ondas sonoras"
        }
      ]
    }
  },
  {
    id: "exp_alfabeto_lugares",
    tipo: "alfabeto",
    titulo: "Lugares de A a Z",
    descricao: "Um lugar incrível para visitar para cada letra!",
    emoji: "🌍",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "Vamos viajar pelo alfabeto! 🌍 Cada letra leva a um lugar especial do mundo. Clique em 🔊 e embarque!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Aeroporto",
          emoji: "✈️",
          funfato: "O maior aeroporto do mundo é o de King Fahd na Arábia Saudita — maior que Mônaco!",
          detalhe: "King Fahd: 780km² | Hub: movimento de aviões | Terminal + pista + hangar"
        },
        {
          letra: "B",
          palavra: "Biblioteca",
          emoji: "📚",
          funfato: "A Biblioteca de Alexandria guardava quase todo o conhecimento da Antiguidade!",
          detalhe: "Alexandria: 300 a.C. | 700.000 rolos | Queimada | BNF Paris: 40Mi itens"
        },
        {
          letra: "C",
          palavra: "Circo",
          emoji: "🎪",
          funfato: "O circo moderno foi inventado em 1768 por um cavaleiro inglês!",
          detalhe: "Philip Astley 1768 | Pista circular | Acrobacia + animais + palhaços"
        },
        {
          letra: "D",
          palavra: "Deserto",
          emoji: "🏜️",
          funfato: "A Antártida é o maior deserto do mundo — um deserto de gelo!",
          detalhe: "Deserto: < 250mm/ano chuva | Antártida: 14Mi km² | Sahara: 9Mi km²"
        },
        {
          letra: "E",
          palavra: "Escola",
          emoji: "🏫",
          funfato: "A escola mais antiga do mundo ainda ativa existe desde 597 d.C. na Inglaterra!",
          detalhe: "Scuola Palatina: 787 | Kings: 597 Canterbury | +1.5 bilhão estudantes"
        },
        {
          letra: "F",
          palavra: "Fazenda",
          emoji: "🚜",
          funfato: "A maior fazenda do mundo fica na Austrália e é maior do que o estado de Sergipe!",
          detalhe: "Anna Creek Station: 24.000km² | Gado | Agricultura mecanizada"
        },
        {
          letra: "G",
          palavra: "Ginásio",
          emoji: "🏋️",
          funfato: "A palavra \"ginásio\" vem do grego \"gymnos\" que significa nu — os gregos treinavam assim!",
          detalhe: "Gymnasium grego | \"Gymnos\" = nu | Atletas | Moderno: 1811 Friedrich Jahn"
        },
        {
          letra: "H",
          palavra: "Hospital",
          emoji: "🏥",
          funfato: "O primeiro hospital da história foi criado no Sri Lanka há 2.500 anos!",
          detalhe: "Mihintale: 431 a.C. | Roma: 100 d.C. valetudinaria | Florência: séc. XIII"
        },
        {
          letra: "I",
          palavra: "Ilha",
          emoji: "🏝️",
          funfato: "A Groenlândia é a maior ilha do mundo — quase do tamanho de toda a Europa Ocidental!",
          detalhe: "Groenlândia: 2,16Mi km² | Continental vs Oceânica | Atol = anel de coral"
        },
        {
          letra: "J",
          palavra: "Jardim-Botânico",
          emoji: "🌿",
          funfato: "O jardim botânico mais antigo do mundo existe desde 1545 na Itália!",
          detalhe: "Pádua 1545 | Kew Gardens 1840: 7Mi espécies | Conservação ex-situ"
        },
        {
          letra: "K",
          palavra: "Karaokê",
          emoji: "🎤",
          funfato: "O karaokê foi inventado em 1971 por um músico japonês que precisava de acompanhamento!",
          detalhe: "Daisuke Inoue 1971 | \"Kara\" = vazio + \"okê\" = orquestra | 100.000 estabelec."
        },
        {
          letra: "L",
          palavra: "Lago",
          emoji: "🌊",
          funfato: "O Lago Baikal tem 20% de toda a água doce superficial do planeta!",
          detalhe: "Baikal: 1.642m profundidade | 20% água doce mundial | Rússia | 25 Ma"
        },
        {
          letra: "M",
          palavra: "Museu",
          emoji: "🏛️",
          funfato: "O Louvre em Paris é visitado por mais de 9 milhões de pessoas por ano!",
          detalhe: "Louvre: mais visitado | 35.000 obras expostas | 350.000 no acervo"
        },
        {
          letra: "N",
          palavra: "Navio-Cruzeiro",
          emoji: "🚢",
          funfato: "O maior navio do mundo tem mais restaurantes do que muitas cidades brasileiras!",
          detalhe: "Wonder of the Seas: 362m | 7.000 passageiros | 20 restaurantes | 6.988t"
        },
        {
          letra: "O",
          palavra: "Observatório",
          emoji: "🔭",
          funfato: "Observatórios ficam no topo de montanhas para fugir da poluição luminosa das cidades!",
          detalhe: "Cerro Paranal: 2.635m | VLT | Mauna Kea: 4.205m | Luz artificial: problema"
        },
        {
          letra: "P",
          palavra: "Parque",
          emoji: "🌳",
          funfato: "O Central Park de Nova York tem mais de 800 espécies de animais dentro da cidade!",
          detalhe: "Central Park: 341ha | 1858 Olmsted | Pulmão verde | 800 espécies fauna"
        },
        {
          letra: "Q",
          palavra: "Quadra",
          emoji: "🏀",
          funfato: "Uma quadra de basquete tem medidas exatas para ser justa em todos os países!",
          detalhe: "NBA: 28,65m × 15,24m | FIBA: 28m × 15m | Piso: borracha ou parquê"
        },
        {
          letra: "R",
          palavra: "Rio",
          emoji: "💧",
          funfato: "O Rio Amazonas joga mais água no oceano do que os 7 próximos rios juntos!",
          detalhe: "Amazonas: 20% descarga doce mundial | 7Mi km² | 3.000 espécies peixes"
        },
        {
          letra: "S",
          palavra: "Supermercado",
          emoji: "🛒",
          funfato: "O primeiro supermercado do mundo abriu em 1916 nos Estados Unidos com preços nas prateleiras!",
          detalhe: "Piggly Wiggly: 1916 Memphis | Self-service | Código de barras: 1974"
        },
        {
          letra: "T",
          palavra: "Teatro",
          emoji: "🎭",
          funfato: "O Teatro Grego de Epidauro tem 2.400 anos e ainda funciona com acústica perfeita!",
          detalhe: "Epidauro: 340 a.C. | 14.000 lugares | Acústica natural perfeita"
        },
        {
          letra: "U",
          palavra: "Universidade",
          emoji: "🎓",
          funfato: "A primeira universidade do mundo existe desde 859 d.C. no Marrocos!",
          detalhe: "Al-Qarawiyyin: 859 Fez | Bologna: 1088 | Harvard: 1636"
        },
        {
          letra: "V",
          palavra: "Vulcão",
          emoji: "🌋",
          funfato: "O vulcão Mauna Kea no Havaí é a montanha mais alta do mundo medida do fundo do mar!",
          detalhe: "Mauna Kea: 10.210m do fundo | Everest: 8.849m do mar | Hot spot vulcânico"
        },
        {
          letra: "W",
          palavra: "Waterpark",
          emoji: "🌊",
          funfato: "Os maiores parques aquáticos do mundo têm piscinas do tamanho de campos de futebol!",
          detalhe: "Wave pool: ondas artificiais mecânicas | Tobogãs | Rio lento"
        },
        {
          letra: "X",
          palavra: "Xangai",
          emoji: "🌆",
          funfato: "Xangai é uma das maiores cidades do mundo e tem um trem que corre a 430 km/h!",
          detalhe: "China | ~25 milhões de hab. | Maglev do aeroporto: 430 km/h | Maior porto do mundo"
        },
        {
          letra: "Y",
          palavra: "Yoga-Estúdio",
          emoji: "🧘",
          funfato: "Estúdios de yoga existem nos lugares mais incríveis do mundo — até em barcos!",
          detalhe: "Floating yoga | Aerial yoga | Hot yoga: 40°C | 300Mi praticantes mundiais"
        },
        {
          letra: "Z",
          palavra: "Zoológico",
          emoji: "🦁",
          funfato: "O zoológico mais antigo do mundo existe desde 1752 em Viena — quase 300 anos!",
          detalhe: "Tiergarten Schönbrunn: 1752 | Viena | Conservação ex-situ | ~2Mi visitantes/ano"
        }
      ]
    }
  },
  {
    id: "exp_alfabeto_dinos",
    tipo: "alfabeto",
    titulo: "Dinossauros de A a Z",
    descricao: "Um dinossauro incrível para cada letra do alfabeto!",
    emoji: "🦕",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 12,
    historinha: "A máquina do tempo te leva para a era dos dinossauros! 🦕 Cada letra tem um dino esperando por você. Clique em 🔊!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Anquilossauro",
          emoji: "🦕",
          funfato: "O anquilossauro tinha uma \"clava\" na cauda para se defender — era como um martelo de osso!",
          detalhe: "Cretáceo | Clava caudal | Armadura: osteodermos | 6-8m | América do Norte"
        },
        {
          letra: "B",
          palavra: "Braquiossauro",
          emoji: "🦕",
          funfato: "O braquiossauro era tão alto que podia ver pela janela de um prédio de 4 andares!",
          detalhe: "Jurássico | 26m | 58t | Pescoço alto | Jurassic Park | África/América"
        },
        {
          letra: "C",
          palavra: "Carnotauro",
          emoji: "🦕",
          funfato: "O carnotauro tinha chifres como um touro e era muito rápido para seu tamanho!",
          detalhe: "Cretáceo | Chifres supraorbitais | 8m | Argentina | \"Touro carnívoro\""
        },
        {
          letra: "D",
          palavra: "Diplodoco",
          emoji: "🦕",
          funfato: "O diplodoco tinha um pescoço enorme de 6 metros — e uma cauda ainda mais longa!",
          detalhe: "Jurássico | 25m comprimento | Cauda como chicote (som supersônico?) | EUA"
        },
        {
          letra: "E",
          palavra: "Edmontossauro",
          emoji: "🦕",
          funfato: "O edmontossauro tinha centenas de dentes empilhados — quando um caía, outro nascia!",
          detalhe: "Cretáceo | 1.000 dentes em bateria | 13m | Hadrossauro | Canadá"
        },
        {
          letra: "F",
          palavra: "Falcarius",
          emoji: "🦕",
          funfato: "O falcarius era um terópode que parou de comer carne e virou vegetariano!",
          detalhe: "Cretáceo | Therizinossauridea | Transição carnívoro→herbívoro | Utah EUA"
        },
        {
          letra: "G",
          palavra: "Giganotossauro",
          emoji: "🦕",
          funfato: "O giganotossauro foi descoberto na Argentina e era maior que o T-Rex!",
          detalhe: "Cretáceo | 12-13m | Argentina | Maior carnívoro Gondwana | Carcharodontosauridae"
        },
        {
          letra: "H",
          palavra: "Hadrossauro",
          emoji: "🦕",
          funfato: "O hadrossauro tinha uma crista oca na cabeça para fazer sons — como uma trompa!",
          detalhe: "Cretáceo | Crista de eco | Manadas | Cuidado parental | América do Norte"
        },
        {
          letra: "I",
          palavra: "Iguanodonte",
          emoji: "🦕",
          funfato: "O iguanodonte foi um dos primeiros dinossauros a ser descoberto e nomeado — em 1825!",
          detalhe: "1825 Mantell | Espinhos polegares | 10m | Cretáceo | Europa"
        },
        {
          letra: "J",
          palavra: "Jeholornis",
          emoji: "🦕",
          funfato: "O jeholornis era um dinossauro-pássaro que tinha penas longas na cauda para planar!",
          detalhe: "Cretáceo inf. | Cauda longa emplumada | China | Transição dinossauro-ave"
        },
        {
          letra: "K",
          palavra: "Kronosaurus",
          emoji: "🦕",
          funfato: "O kronosaurus tinha uma boca maior do que um homem adulto!",
          detalhe: "Cretáceo | Plesiossauro | 10m | Cabeça 2,7m | Austrália"
        },
        {
          letra: "L",
          palavra: "Lambeossauro",
          emoji: "🦕",
          funfato: "A crista enorme do lambeossauro podia amplificar sons — como um chifre musical!",
          detalhe: "Cretáceo | Crista óssea oca | 9-15m | México | Hadrossaurinae"
        },
        {
          letra: "M",
          palavra: "Mosassauro",
          emoji: "🦕",
          funfato: "O mosassauro dominava os mares do Cretáceo como uma cobra marinha gigante!",
          detalhe: "Cretáceo | Réptil marinho | 17m | Dois conjuntos de dentes | Europa/EUA"
        },
        {
          letra: "N",
          palavra: "Nodossauro",
          emoji: "🦕",
          funfato: "Um nodossauro foi encontrado tão preservado que ainda dá para ver a cor original da pele!",
          detalhe: "Cretáceo | Armadura nodal | Museu Royal Tyrrell | 1.100kg | Canadá"
        },
        {
          letra: "O",
          palavra: "Ornitomimo",
          emoji: "🦕",
          funfato: "O ornitomimo corria a 70km/h — mais rápido do que um carro na cidade!",
          detalhe: "Cretáceo | \"Imitador de avestruz\" | 70km/h | Edentado | Canadá"
        },
        {
          letra: "P",
          palavra: "Pterossauro",
          emoji: "🦕",
          funfato: "O pterossauro era réptil voador — mas não era dinossauro de verdade!",
          detalhe: "Triássico-Cretáceo | Pterosauria | Ossos ocos | Quetzalcoatlus: 10m envergadura"
        },
        {
          letra: "Q",
          palavra: "Qianzhousaurus",
          emoji: "🦕",
          funfato: "O qianzhousaurus tinha nariz comprido e foi apelidado de \"Pinocchio-Rex\"!",
          detalhe: "Cretáceo | Nariz elongado | China 2014 | Tiranossaurídeo | 9m"
        },
        {
          letra: "R",
          palavra: "Rapetossauro",
          emoji: "🦕",
          funfato: "O rapetossauro vivia em Madagascar há 70 milhões de anos — antes da ilha se separar!",
          detalhe: "Cretáceo | Saurópode | Madagascar | 15m | Titanossauro"
        },
        {
          letra: "S",
          palavra: "Sinossauropterix",
          emoji: "🦕",
          funfato: "O sinossauropterix foi o primeiro dinossauro descoberto com penas — em 1996 na China!",
          detalhe: "1996 China | Penas primitivas filamentosas | Coloração: ferrugem+branco"
        },
        {
          letra: "T",
          palavra: "Triceratops",
          emoji: "🦕",
          funfato: "O triceratops tinha 3 chifres e uma gola óssea enorme para se defender do T-Rex!",
          detalhe: "Cretáceo | 9m | 12t | 3 chifres | Ceratópside | América do Norte"
        },
        {
          letra: "U",
          palavra: "Utahraptoro",
          emoji: "🦕",
          funfato: "O utahraptoro era um velociraptor gigante — 7 metros de comprimento!",
          detalhe: "Cretáceo | 7m | Garra foice 38cm | Utah EUA | Dromaeossaurídeo"
        },
        {
          letra: "V",
          palavra: "Velociraptor",
          emoji: "🦕",
          funfato: "O velociraptor real era do tamanho de um peru — muito menor do que no cinema!",
          detalhe: "Cretáceo | 1,8m | Penas | Garra foice | Mongólia | Dromaeossaurídeo"
        },
        {
          letra: "W",
          palavra: "Wannanosaurus",
          emoji: "🦕",
          funfato: "O wannanosaurus era um dos menores dinossauros com crânio espessado — usava a cabeça para bater!",
          detalhe: "Cretáceo | 60cm | Paquicefalossaurídeo | China | Crânio 3cm espessura"
        },
        {
          letra: "X",
          palavra: "Xiaotingia",
          emoji: "🦕",
          funfato: "A xiaotingia é parente próxima do archeopteryx e ajudou a entender a origem das aves!",
          detalhe: "Jurássico | China 2011 | Anagenesis estudo | Escansoriopterygidae"
        },
        {
          letra: "Y",
          palavra: "Yangchuanosaurus",
          emoji: "🦕",
          funfato: "O yangchuanosaurus era o maior predador da Ásia no Jurássico — o T-Rex asiático!",
          detalhe: "Jurássico | China | 11m | 3,4t | Megalossaurídeo | Predador topo"
        },
        {
          letra: "Z",
          palavra: "Zuniceratops",
          emoji: "🦕",
          funfato: "O zuniceratops foi descoberto por um menino de 8 anos em 1996 — o sonho de todo explorador!",
          detalhe: "Cretáceo | Novo México | 1996 Christopher Wolfe: 8 anos | 3-3,5m | 2 chifres"
        }
      ]
    }
  }
]

// ── Fase 1 — quiz, memória, sequência ──
export const atividadesExtraPorFaixa = [
  {
    id: "exp_quiz_animais2",
    tipo: "quiz",
    titulo: "Animais Incríveis 2",
    descricao: "Mais curiosidades sobre os animais do mundo!",
    emoji: "🦁",
    habilidade: "Memória",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "O Zoológico Mágico abriu as portas! 🦁 O guia precisa da sua ajuda para responder as perguntas dos visitantes sobre os animais. Você topa ser o especialista do dia?",
    perguntas: [
      {
        pergunta: "Qual animal tem uma tromba comprida?",
        opcoes: ["Elefante", "Girafa", "Hipopótamo", "Zebra"],
        correta: 0,
        fato: "🐘 A tromba do elefante tem mais de 40.000 músculos! Eles usam para beber água (até 15 litros de uma vez!), pegar comida e até dar abraços entre si."
      },
      {
        pergunta: "Qual animal faz o barulho \"muuu\"?",
        opcoes: ["Cachorro", "Vaca", "Gato", "Sapo"],
        correta: 1,
        fato: "🐄 As vacas têm 4 estômagos! Isso ajuda a digerir bem a grama. Uma vaca pode beber até 150 litros de água por dia — como 750 copos!"
      },
      {
        pergunta: "Qual é o animal mais rápido do mundo?",
        opcoes: ["Leão", "Guepardo", "Cavalo", "Lobo"],
        correta: 1,
        fato: "🐆 O guepardo corre até 120 km/h — mais rápido que um carro na estrada! Mas cansa em 30 segundos. Precisa descansar bastante depois de uma corrida."
      },
      {
        pergunta: "Onde vive o urso polar?",
        opcoes: ["Na selva", "No deserto", "No Ártico", "Na floresta"],
        correta: 2,
        fato: "🐻‍❄️ O pelo do urso polar parece branco, mas é transparente! A pele por baixo é preta para absorver calor do sol. Ele aguenta temperaturas de -50°C."
      },
      {
        pergunta: "O que o coelho come?",
        opcoes: ["Carne", "Cenouras e verduras", "Peixes", "Insetos"],
        correta: 1,
        fato: "🐰 Os coelhos têm dentes que nunca param de crescer! Por isso precisam roer sempre. Eles também conseguem girar os ouvidos 270° para escutar melhor."
      }
    ]
  },
  {
    id: "exp_quiz_frutas",
    tipo: "quiz",
    titulo: "Frutas Coloridas",
    descricao: "Descubra curiosidades deliciosas sobre as frutas!",
    emoji: "🍓",
    habilidade: "Memória",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "A feira de frutas chegou ao bairro! 🍓 A feirante Maria precisa de um ajudante esperto para atender os clientes. Mostre que você sabe tudo sobre frutas!",
    perguntas: [
      {
        pergunta: "De que cor fica a banana quando está madura?",
        opcoes: ["Verde", "Amarela", "Vermelha", "Azul"],
        correta: 1,
        fato: "🍌 A banana verde tem amido, que vira açúcar quando amadurece — por isso fica mais doce e amarela! O Brasil é um dos maiores produtores de banana do mundo."
      },
      {
        pergunta: "Qual fruta tem sementinhas pretas na superfície?",
        opcoes: ["Maçã", "Laranja", "Morango", "Uva"],
        correta: 2,
        fato: "🍓 O morango tem sementinhas pretas do lado de fora, bem diferente das outras frutas!"
      },
      {
        pergunta: "Qual fruta usamos para fazer suco de laranja?",
        opcoes: ["Banana", "Maçã", "Laranja", "Uva"],
        correta: 2,
        fato: "🍊 O Brasil é o maior exportador de suco de laranja do mundo! São Paulo produz mais de 80% das laranjas brasileiras. Uma laranja grande tem vitamina C para o dia todo."
      },
      {
        pergunta: "Qual fruta tem casca espinhuda por fora e é amarela por dentro?",
        opcoes: ["Maçã", "Abacaxi", "Banana", "Coco"],
        correta: 1,
        fato: "🍍 Cada pé de abacaxi produz apenas 1 fruta por vez e leva até 2 anos para crescer! A enzima do abacaxi dissolve proteínas — por isso a língua fica sensível se comer demais."
      },
      {
        pergunta: "Qual fruta é quase toda feita de água?",
        opcoes: ["Banana", "Melancia", "Abacate", "Coco"],
        correta: 1,
        fato: "🍉 A melancia é 92% água! Por isso é tão refrescante no verão. Pode pesar até 20 kg. No Brasil, o verão é a época de maior consumo de melancia."
      }
    ]
  },
  {
    id: "exp_quiz_corpo",
    tipo: "quiz",
    titulo: "Meu Corpo Incrível",
    descricao: "Descubra os segredos do corpo humano!",
    emoji: "💪",
    habilidade: "Conhecimento",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "A Dra. Ana abriu uma clínica para crianças curiosas! 💪 Ela quer saber quem conhece melhor o próprio corpo. Responda as perguntas e ganhe o diploma de \"Expert do Corpo\"!",
    perguntas: [
      {
        pergunta: "Com que parte do corpo ouvimos os sons?",
        opcoes: ["Nariz", "Olhos", "Ouvidos", "Boca"],
        correta: 2,
        fato: "👂 Nossos ouvidos não dormem! Mesmo dormindo, eles captam sons — o cérebro é que decide ignorar os barulhos. Os ouvidos também nos ajudam a manter o equilíbrio."
      },
      {
        pergunta: "Para que servem os olhos?",
        opcoes: ["Para respirar", "Para ver", "Para ouvir", "Para comer"],
        correta: 1,
        fato: "👁️ Nossos olhos distinguem até 10 milhões de cores diferentes! Piscamos 15 a 20 vezes por minuto automaticamente para manter os olhos limpos e úmidos."
      },
      {
        pergunta: "Quantas mãos temos normalmente?",
        opcoes: ["1", "2", "3", "4"],
        correta: 1,
        fato: "🖐️ Cada mão tem 5 dedos, e cada um deles se mexe sozinho!"
      },
      {
        pergunta: "O que o coração faz?",
        opcoes: ["Pensa", "Digere comida", "Bombeia sangue", "Respira"],
        correta: 2,
        fato: "❤️ O coração bate 100.000 vezes por dia — mais de 35 milhões por ano! Em uma vida inteira, bombeia sangue suficiente para encher uma piscina olímpica várias vezes."
      },
      {
        pergunta: "Por onde respiramos?",
        opcoes: ["Pelos olhos", "Pelo nariz e pela boca", "Pelos ouvidos", "Pelos pés"],
        correta: 1,
        fato: "👃 O nariz tem pelínhos que filtram o ar antes de entrar nos pulmões! Respiramos cerca de 20.000 vezes por dia sem nem perceber — o corpo faz isso automaticamente."
      }
    ]
  },
  {
    id: "exp_memoria_profissoes_2",
    tipo: "memoria",
    titulo: "Profissões Heroicas",
    descricao: "Combine os pares de profissões!",
    emoji: "👩‍⚕️",
    habilidade: "Memória Visual",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 6,
    historinha: "A cidade tem muitos heróis do dia a dia! 👩‍⚕️ Cada profissão é super importante. Encontre os pares e aprenda sobre as pessoas que cuidam de nós!",
    pares: [
      {
        emoji: "🩺",
        nome: "Médico/a",
        info: "Cuida da saúde e trata doenças"
      },
      {
        emoji: "🚒",
        nome: "Bombeiro/a",
        info: "Apaga incêndios e salva vidas"
      },
      {
        emoji: "📚",
        nome: "Professor/a",
        info: "Ensina e transforma o futuro"
      },
      {
        emoji: "👮",
        nome: "Policial",
        info: "Protege a segurança das pessoas"
      },
      {
        emoji: "🍳",
        nome: "Cozinheiro/a",
        info: "Prepara refeições deliciosas"
      },
      {
        emoji: "✈️",
        nome: "Piloto/a",
        info: "Voa aviões pelo mundo todo"
      },
      {
        emoji: "🔧",
        nome: "Mecânico/a",
        info: "Conserta carros e máquinas"
      },
      {
        emoji: "🎨",
        nome: "Artista",
        info: "Cria beleza e arte para o mundo"
      }
    ]
  },
  {
    id: "exp_memoria_transporte",
    tipo: "memoria",
    titulo: "Meios de Transporte",
    descricao: "Como as pessoas se movem pelo mundo?",
    emoji: "🚗",
    habilidade: "Memória Visual",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 6,
    historinha: "O aeroporto, a rodoviária e o porto estão movimentados! 🚗 Encontre os pares de transportes antes que todos partam!",
    pares: [
      {
        emoji: "🚗",
        nome: "Carro",
        info: "Transporta pessoas pelas ruas e estradas"
      },
      {
        emoji: "✈️",
        nome: "Avião",
        info: "Voa pelos céus a 900 km/h"
      },
      {
        emoji: "⛵",
        nome: "Barco",
        info: "Navega pelos rios e mares"
      },
      {
        emoji: "🚂",
        nome: "Trem",
        info: "Corre nos trilhos muito rápido"
      },
      {
        emoji: "🚲",
        nome: "Bicicleta",
        info: "Pedala sem poluir o ar"
      },
      {
        emoji: "🚌",
        nome: "Ônibus",
        info: "Transporta muitas pessoas de uma vez"
      },
      {
        emoji: "🚁",
        nome: "Helicóptero",
        info: "Voa e pousa em espaços pequenos"
      },
      {
        emoji: "🚀",
        nome: "Foguete",
        info: "Viaja para o espaço sideral"
      }
    ]
  },
  {
    id: "exp_memoria_fazenda",
    tipo: "memoria",
    titulo: "Animais da Fazenda",
    descricao: "Conheça os animais que vivem na fazenda!",
    emoji: "🐄",
    habilidade: "Memória Visual",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 6,
    historinha: "O fazendeiro João precisa de ajuda para encontrar todos os animais da fazenda! 🐄 Eles se espalharam pelo campo. Encontre os pares para colocá-los de volta!",
    pares: [
      {
        emoji: "🐄",
        nome: "Vaca",
        info: "Dá leite e tem 4 estômagos!"
      },
      {
        emoji: "🐖",
        nome: "Porco",
        info: "Um dos animais mais inteligentes da fazenda"
      },
      {
        emoji: "🐔",
        nome: "Galinha",
        info: "Bota ovos todos os dias"
      },
      {
        emoji: "🐑",
        nome: "Ovelha",
        info: "Sua lã vira roupas quentinhas"
      },
      {
        emoji: "🐎",
        nome: "Cavalo",
        info: "Pode correr até 70 km/h!"
      },
      {
        emoji: "🐐",
        nome: "Cabra",
        info: "Sobe em lugares íngremes com facilidade"
      },
      {
        emoji: "🦆",
        nome: "Pato",
        info: "Nada, voa e anda — é tri-talentoso!"
      },
      {
        emoji: "🐰",
        nome: "Coelho",
        info: "Seus dentes nunca param de crescer"
      }
    ]
  },
  {
    id: "exp_seq_formas",
    tipo: "sequencia",
    titulo: "Sequência de Formas",
    descricao: "Qual forma vem a seguir?",
    emoji: "🔴",
    habilidade: "Raciocínio Lógico",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "A máquina de formas está trabalhando! 🔴 Ela sempre repete um padrão. Olhe com atenção e descubra qual forma vem em seguida!",
    sequencias: [
      {
        items: ["🔴", "🔵", "🔴", "🔵", "❓"],
        resposta: "🔴",
        opcoes: ["🔵", "🔴", "🟢", "🟡"]
      },
      {
        items: ["⭐", "🌙", "⭐", "🌙", "❓"],
        resposta: "⭐",
        opcoes: ["🌙", "⭐", "☀️", "🌟"]
      },
      {
        items: ["🍎", "🍌", "🍎", "🍌", "❓"],
        resposta: "🍎",
        opcoes: ["🍌", "🍎", "🍇", "🍓"]
      },
      {
        items: ["🔺", "🔷", "🔷", "🔺", "❓"],
        resposta: "🔷",
        opcoes: ["🔺", "🔷", "⭐", "🔶"]
      },
      {
        items: ["🟡", "🟢", "🔵", "🟡", "❓"],
        resposta: "🟢",
        opcoes: ["🔵", "🟡", "🟢", "🔴"]
      }
    ]
  },
  {
    id: "exp_seq_numeros2",
    tipo: "sequencia",
    titulo: "Números que Crescem",
    descricao: "Descubra o próximo número da sequência!",
    emoji: "🔢",
    habilidade: "Lógica Matemática",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "O trem dos números está partindo! 🔢 Cada vagão tem um número. Descubra qual número está no último vagão antes que o trem parta!",
    sequencias: [
      {
        items: ["1", "2", "3", "4", "❓"],
        resposta: "5",
        opcoes: ["4", "5", "6", "7"]
      },
      {
        items: ["2", "4", "6", "8", "❓"],
        resposta: "10",
        opcoes: ["9", "10", "11", "12"]
      },
      {
        items: ["10", "20", "30", "40", "❓"],
        resposta: "50",
        opcoes: ["45", "50", "55", "60"]
      },
      {
        items: ["1", "3", "5", "7", "❓"],
        resposta: "9",
        opcoes: ["8", "9", "10", "11"]
      },
      {
        items: ["5", "10", "15", "20", "❓"],
        resposta: "25",
        opcoes: ["22", "24", "25", "30"]
      }
    ]
  },
  {
    id: "exp_seq_bichinhos",
    tipo: "sequencia",
    titulo: "Bichinhos em Fila",
    descricao: "Qual bichinho vem a seguir na fila?",
    emoji: "🐣",
    habilidade: "Raciocínio Lógico",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "Os bichinhos da fazenda estão fazendo uma fila para a festa! 🐣 Mas alguém se perdeu no caminho. Descubra quem é o próximo da fila!",
    sequencias: [
      {
        items: ["🐣", "🐤", "🐔", "🐣", "❓"],
        resposta: "🐤",
        opcoes: ["🐔", "🐤", "🥚", "🐦"]
      },
      {
        items: ["🌱", "🌿", "🌳", "🌱", "❓"],
        resposta: "🌿",
        opcoes: ["🌳", "🌿", "🍂", "🌲"]
      },
      {
        items: ["🔴", "🟠", "🟡", "🟢", "❓"],
        resposta: "🔵",
        opcoes: ["🟣", "🔵", "🟤", "⚫"]
      },
      {
        items: ["🐛", "🦋", "🐛", "🦋", "❓"],
        resposta: "🐛",
        opcoes: ["🦋", "🐛", "🐝", "🐞"]
      },
      {
        items: ["🌞", "🌙", "🌞", "🌙", "❓"],
        resposta: "🌞",
        opcoes: ["🌙", "🌞", "⭐", "☁️"]
      }
    ]
  },
  {
    id: "exp_numeros_1_10",
    tipo: "numeros",
    titulo: "Números de 1 a 10",
    descricao: "Aprenda a contar com sons e objetos coloridos!",
    emoji: "🔢",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "O reino dos números acordou! 🔢 Cada número tem seu próprio emoji especial e quer te mostrar como é. Clique no botão de som 🔊 e ouça como cada número se chama — você vai aprender todos de 1 a 10!"
  },
  {
    id: "exp_formas_geometricas",
    tipo: "formas",
    titulo: "Formas Geométricas",
    descricao: "Conheça círculos, quadrados, triângulos e muito mais!",
    emoji: "🔷",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "O mundo está cheio de formas escondidas! 🔷 Clique em 🔊 e conheça cada forma pelo nome!"
  },
  {
    id: "exp_cores",
    tipo: "cores",
    titulo: "As Cores",
    descricao: "Descubra o arco-íris das cores com exemplos do dia a dia!",
    emoji: "🌈",
    habilidade: "Expressão Artística",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "O mundo ficaria cinza sem as cores! 🌈 Vamos ouvir o nome de cada uma!"
  },
  {
    id: "exp_alfabeto",
    tipo: "alfabeto",
    titulo: "O Alfabeto",
    descricao: "Aprenda as 26 letras com palavras e sons divertidos!",
    emoji: "🔤",
    habilidade: "Linguagem",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 15,
    historinha: "Vamos aprender as 26 letras do alfabeto! 🔤 Clique em 🔊 para ouvir a letra e descobrir a palavra que começa com ela!"
  }
]

// ── Colorir ──
export const colorirExtraPorFaixa = [
  {
    id: "exp_colorir_sol",
    tipo: "colorir",
    titulo: "Colorir: Sol",
    descricao: "Escolha as cores e pinte o sol sorridente!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "O sol amanheceu sem nenhuma cor! ☀️ Escolha as cores que você quiser e toque em cada parte para deixar o dia mais bonito.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Sol",
        regioes: [
          {
            id: "nucleo",
            tipo: "circle",
            props: {
              cx: 150,
              cy: 150,
              r: 55
            }
          },
          {
            id: "raios",
            tipo: "radial",
            props: {
              cx: 150,
              cy: 150,
              rInner: 58,
              rOuter: 95,
              n: 8
            }
          },
          {
            id: "olho_esquerdo",
            tipo: "circle",
            props: {
              cx: 130,
              cy: 140,
              r: 8
            }
          },
          {
            id: "olho_direito",
            tipo: "circle",
            props: {
              cx: 170,
              cy: 140,
              r: 8
            }
          },
          {
            id: "boca",
            tipo: "rect",
            props: {
              x: 125,
              y: 165,
              width: 50,
              height: 10,
              rx: 5
            }
          }
        ]
      }
    }
  },
  {
    id: "exp_colorir_casa",
    tipo: "colorir",
    titulo: "Colorir: Casa",
    descricao: "Pinte a casinha do jeito que você imaginar!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "Essa casinha está esperando as cores! 🏠 Toque numa cor e depois numa parte da casa para pintar.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Casa",
        regioes: [
          {
            id: "parede",
            tipo: "rect",
            props: {
              x: 70,
              y: 150,
              width: 160,
              height: 100
            }
          },
          {
            id: "telhado",
            tipo: "polygon",
            props: {
              points: "60,150 150,80 240,150"
            }
          },
          {
            id: "chamine",
            tipo: "rect",
            props: {
              x: 190,
              y: 95,
              width: 20,
              height: 40
            }
          },
          {
            id: "porta",
            tipo: "rect",
            props: {
              x: 135,
              y: 190,
              width: 30,
              height: 60
            }
          },
          {
            id: "janela_esquerda",
            tipo: "rect",
            props: {
              x: 90,
              y: 170,
              width: 30,
              height: 30
            }
          },
          {
            id: "janela_direita",
            tipo: "rect",
            props: {
              x: 180,
              y: 170,
              width: 30,
              height: 30
            }
          }
        ]
      }
    }
  },
  {
    id: "exp_colorir_flor",
    tipo: "colorir",
    titulo: "Colorir: Flor",
    descricao: "Dê vida a essa flor com as cores que você quiser!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "O jardim ganhou uma flor nova, mas ela ainda não tem cor! 🌸 Escolha as cores e pinte cada pedacinho.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Flor",
        regioes: [
          {
            id: "caule",
            tipo: "rect",
            props: {
              x: 145,
              y: 180,
              width: 10,
              height: 90
            }
          },
          {
            id: "folha_esquerda",
            tipo: "polygon",
            props: {
              points: "145,220 108,233 145,248"
            }
          },
          {
            id: "folha_direita",
            tipo: "polygon",
            props: {
              points: "155,220 192,233 155,248"
            }
          },
          {
            id: "petalas",
            tipo: "radial",
            props: {
              cx: 150,
              cy: 140,
              rInner: 26,
              rOuter: 58,
              n: 6
            }
          },
          {
            id: "miolo",
            tipo: "circle",
            props: {
              cx: 150,
              cy: 140,
              r: 25
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
    id: "exp_cores_arcoiris",
    tipo: "cores",
    titulo: "Cores do Arco-Íris",
    descricao: "As 6 cores do arco-íris e seus segredos!",
    emoji: "🌈",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "Após a chuva, um arco-íris gigante apareceu no céu! 🌈 Cada cor tem um segredo especial. Clique em 🔊 para descobrir!",
    dados: {
      cores: [
        {
          id: "arco-vermelho",
          nome: "Vermelho",
          hex: "#E53935",
          emoji: "❤️",
          exemplo: "a primeira cor do arco-íris",
          funfato: "O vermelho fica sempre na borda de fora do arco-íris — é a maior curva!",
          detalhe: "Comprimento de onda ~700nm | Maior onda do espectro visível | Borda exterior"
        },
        {
          id: "arco-laranja",
          nome: "Laranja",
          hex: "#FB8C00",
          emoji: "🟠",
          exemplo: "a segunda cor do arco-íris",
          funfato: "Para ver um arco-íris você precisa estar de costas para o sol — sempre!",
          detalhe: "Comprimento de onda ~620nm | Entre vermelho e amarelo no espectro"
        },
        {
          id: "arco-amarelo",
          nome: "Amarelo",
          hex: "#FDD835",
          emoji: "☀️",
          exemplo: "a terceira cor do arco-íris",
          funfato: "O arco-íris sempre aparece no lado oposto ao sol no céu!",
          detalhe: "Comprimento de onda ~575nm | Mais luminosa do espectro"
        },
        {
          id: "arco-verde",
          nome: "Verde",
          hex: "#43A047",
          emoji: "🍀",
          exemplo: "a quarta cor do arco-íris",
          funfato: "Cada gota de chuva age como um mini-prisma que separa a luz em cores!",
          detalhe: "Comprimento de onda ~530nm | Centro do espectro visível"
        },
        {
          id: "arco-azul",
          nome: "Azul",
          hex: "#1E88E5",
          emoji: "💙",
          exemplo: "a quinta cor do arco-íris",
          funfato: "É impossível tocar um arco-íris — ele se move conforme você se move!",
          detalhe: "Comprimento de onda ~450nm | Cor primária da luz"
        },
        {
          id: "arco-violeta",
          nome: "Violeta",
          hex: "#8E24AA",
          emoji: "🔮",
          exemplo: "a última cor do arco-íris",
          funfato: "Às vezes dá para ver um arco-íris duplo — o segundo tem as cores invertidas!",
          detalhe: "Comprimento de onda ~420nm | Menor onda do visível | Borda interior"
        }
      ]
    }
  },
  {
    id: "exp_cores_natureza",
    tipo: "cores",
    titulo: "Cores da Natureza",
    descricao: "Descubra as cores escondidas no mundo natural!",
    emoji: "🌿",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 10,
    historinha: "A natureza é uma paleta de cores! 🌿 Cada cor tem uma razão para existir. Clique em 🔊 e explore!",
    dados: {
      cores: [
        {
          id: "nat-verde",
          nome: "Verde Folha",
          hex: "#388E3C",
          emoji: "🌿",
          exemplo: "como as plantas",
          funfato: "Plantas são verdes por causa da clorofila, que capta luz solar para fazer comida!",
          detalhe: "Clorofila a e b absorvem luz vermelha e azul, refletem o verde"
        },
        {
          id: "nat-azul",
          nome: "Azul Oceano",
          hex: "#0288D1",
          emoji: "🌊",
          exemplo: "como o mar",
          funfato: "O mar é azul porque absorve as outras cores e reflete apenas o azul!",
          detalhe: "Água absorve luz vermelha e infravermelha, espalhando comprimentos de onda azuis"
        },
        {
          id: "nat-amarelo",
          nome: "Amarelo Sol",
          hex: "#FFA000",
          emoji: "☀️",
          exemplo: "como o sol ao entardecer",
          funfato: "O sol parece dourado ao pôr do sol porque a luz percorre mais atmosfera!",
          detalhe: "Ao entardecer, luz azul se dispersa; chegam apenas vermelho e laranja"
        },
        {
          id: "nat-laranja",
          nome: "Laranja Terra",
          hex: "#BF360C",
          emoji: "🏜️",
          exemplo: "como a terra vermelha",
          funfato: "A terra vermelha tem óxido de ferro — como ferrugem! Marte também é vermelho!",
          detalhe: "Fe₂O₃ (hematita) — pigmento natural usado há 100.000 anos em pinturas rupestres"
        },
        {
          id: "nat-marrom",
          nome: "Marrom Madeira",
          hex: "#5D4037",
          emoji: "🌳",
          exemplo: "como o tronco das árvores",
          funfato: "A cor marrom da madeira vem da lignina, que dá rigidez à planta!",
          detalhe: "Lignina: 2ª molécula orgânica mais abundante na Terra | Responsável pela estrutura lenhosa"
        },
        {
          id: "nat-rosa",
          nome: "Rosa Flor",
          hex: "#E91E8C",
          emoji: "🌸",
          exemplo: "como as flores",
          funfato: "Flores têm cores para atrair abelhas e beija-flores que espalham o pólen!",
          detalhe: "Antocianinas e carotenoides: pigmentos que criam as cores das flores"
        },
        {
          id: "nat-branco",
          nome: "Branco Neve",
          hex: "#B0BEC5",
          emoji: "❄️",
          exemplo: "como a neve",
          funfato: "A neve é branca porque os cristais de gelo refletem toda a luz solar de volta!",
          detalhe: "Água pura é transparente, mas cristais de gelo empacotados refletem todas as frequências"
        },
        {
          id: "nat-cinza",
          nome: "Cinza Nuvem",
          hex: "#607D8B",
          emoji: "☁️",
          exemplo: "como nuvens de chuva",
          funfato: "Nuvens cinzas são muito espessas — têm tanta água que bloqueiam a luz do sol!",
          detalhe: "Nuvens brancas = poucas gotículas | Nuvens cinzas = muita água (nimbus)"
        }
      ]
    }
  },
  {
    id: "exp_cores_brinquedos",
    tipo: "cores",
    titulo: "Brinquedos Coloridos",
    descricao: "Cada brinquedo tem uma cor especial!",
    emoji: "🎀",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "O baú de brinquedos transbordou de cores! 🎀 Cada brinquedo tem uma cor muito especial. Clique em 🔊 e descubra o que cada cor significa!",
    dados: {
      cores: [
        {
          id: "bq-rosa",
          nome: "Rosa",
          hex: "#E91E8C",
          emoji: "🎀",
          exemplo: "como o laço de fita",
          funfato: "O rosa virou cor de menina só nos anos 1940 — antes era associado a meninos!",
          detalhe: "Vermelho + branco | Não existe no espectro | Criado pelo cérebro misturando R+B"
        },
        {
          id: "bq-amarelo",
          nome: "Amarelo",
          hex: "#FFD600",
          emoji: "🧸",
          exemplo: "como o ursinho de pelúcia",
          funfato: "Brinquedos de bebê usam amarelo porque é a cor mais fácil de ver pelos olhos pequenos!",
          detalhe: "Cor mais luminosa | Estimula sistema visual | Primeiro a ser identificada por bebês"
        },
        {
          id: "bq-azul",
          nome: "Azul",
          hex: "#1565C0",
          emoji: "🚗",
          exemplo: "como o carrinho azul",
          funfato: "Azul é a cor favorita de 40% das pessoas no mundo inteiro!",
          detalhe: "Evoca confiança | Raro em alimentos naturais | Cor do céu e do mar"
        },
        {
          id: "bq-verde",
          nome: "Verde",
          hex: "#388E3C",
          emoji: "🦖",
          exemplo: "como o dinossauro",
          funfato: "Dinossauros provavelmente tinham penas coloridas — alguns eram bem chamativos!",
          detalhe: "Verde de clorofila | Mais relaxante para os olhos | Associado à natureza"
        },
        {
          id: "bq-laranja",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🏀",
          exemplo: "como a bola de basquete",
          funfato: "A bola de basquete ficou laranja para ser visível na TV em preto e branco!",
          detalhe: "Alta visibilidade | Contraste com o piso | Adotada na NBA nos anos 1950"
        },
        {
          id: "bq-vermelho",
          nome: "Vermelho",
          hex: "#C62828",
          emoji: "🎯",
          exemplo: "como o alvo vermelho",
          funfato: "Vermelho chama mais atenção — alvos e sinais de perigo usam essa cor!",
          detalhe: "Maior λ visível (~700nm) | Reação rápida no cérebro | Cor de urgência universal"
        },
        {
          id: "bq-roxo",
          nome: "Roxo",
          hex: "#6A1B9A",
          emoji: "🪄",
          exemplo: "como a varinha mágica",
          funfato: "Roxo é associado à magia porque na Antiguidade era raríssimo e caro de produzir!",
          detalhe: "Púrpura de Tiro: 12.000 moluscos/grama | Só reis podiam comprar"
        },
        {
          id: "bq-marrom",
          nome: "Marrom",
          hex: "#6D4C41",
          emoji: "🧩",
          exemplo: "como as peças do puzzle",
          funfato: "Os primeiros puzzles eram de madeira — naturalmente marrons, sem pintura!",
          detalhe: "Cor da madeira | Óxidos de Fe+Mn | Sensação de solidez e confiabilidade"
        }
      ]
    }
  },
  {
    id: "exp_cores_alimentos",
    tipo: "cores",
    titulo: "Cores dos Alimentos",
    descricao: "As cores do prato nos dizem sobre os nutrientes!",
    emoji: "🍽️",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "O chef preparou um prato arco-íris! 🍽️ Cada cor de alimento tem um nutriente diferente. Clique em 🔊 e descubra!",
    dados: {
      cores: [
        {
          id: "food-vm",
          nome: "Vermelho",
          hex: "#C62828",
          emoji: "🍅",
          exemplo: "como o tomate",
          funfato: "Alimentos vermelhos têm licopeno — que ajuda a proteger o coração!",
          detalhe: "Licopeno (carotenoide) | Antioxidante potente | Tomate, melancia, morango"
        },
        {
          id: "food-la",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🥕",
          exemplo: "como a cenoura",
          funfato: "A cenoura original era roxa — ficou laranja por seleção humana no séc. XVII!",
          detalhe: "Beta-caroteno → Vitamina A | Holandeses selecionaram a cor laranja"
        },
        {
          id: "food-am",
          nome: "Amarelo",
          hex: "#F9A825",
          emoji: "🌽",
          exemplo: "como o milho",
          funfato: "O milho amarelo tem luteína — que protege a visão e os olhos!",
          detalhe: "Luteína e zeaxantina | Carotenoides | Previnem degeneração macular"
        },
        {
          id: "food-vd",
          nome: "Verde",
          hex: "#2E7D32",
          emoji: "🥦",
          exemplo: "como o brócolis",
          funfato: "Brócolis e folhas verdes têm ferro e vitamina K — que fortalecem os ossos!",
          detalhe: "Clorofila + Vitamina K | Ferro não-heme | Folato | Crucíferas anticâncer"
        },
        {
          id: "food-az",
          nome: "Azul",
          hex: "#283593",
          emoji: "🫐",
          exemplo: "como o mirtilo",
          funfato: "Mirtilos têm antocianinas — poderosos antioxidantes que protegem as células!",
          detalhe: "Antocianinas | Flavonoides | Melhora memória e função cognitiva"
        },
        {
          id: "food-rx",
          nome: "Roxo",
          hex: "#6A1B9A",
          emoji: "🍆",
          exemplo: "como a berinjela",
          funfato: "A casca roxa da berinjela tem nasunina — que protege as membranas do cérebro!",
          detalhe: "Nasunina (antocianina) | Protege membranas celulares | Neuroprotetor"
        },
        {
          id: "food-br",
          nome: "Branco",
          hex: "#9E9E9E",
          emoji: "🧄",
          exemplo: "como o alho",
          funfato: "O alho branco tem alicina — um antibiótico natural e poderoso!",
          detalhe: "Alicina (organossulfurado) | Antibacteriano natural | Hipócrates prescrevia alho"
        },
        {
          id: "food-mm",
          nome: "Marrom",
          hex: "#5D4037",
          emoji: "🍫",
          exemplo: "como o chocolate",
          funfato: "Chocolate escuro tem mais antioxidantes que o chá verde ou o vinho tinto!",
          detalhe: "Flavonoides do cacau | Teobromina | Melhora circulação | >70% cacau recomendado"
        }
      ]
    }
  },
  {
    id: "exp_cores_bichinhos",
    tipo: "cores",
    titulo: "Bichinhos Coloridos",
    descricao: "Por que os animais têm tantas cores?",
    emoji: "🦋",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "Na natureza, cada cor tem um propósito! 🦋 Esconder, atrair ou avisar — os animais são pintores incríveis. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "bich-la",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🐅",
          exemplo: "como as listras do tigre",
          funfato: "As listras do tigre são únicas como impressão digital — dois tigres nunca são iguais!",
          detalhe: "Padrão individual único | Camuflagem em luz filtrada | Melanina e feomelanina"
        },
        {
          id: "bich-am",
          nome: "Amarelo",
          hex: "#F9A825",
          emoji: "🐝",
          exemplo: "como a abelha",
          funfato: "Amarelo+preto da abelha é um aviso: \"Tenho ferrão — não mexa em mim!\"",
          detalhe: "Aposematismo | Sinaliza veneno/defesa | Preto absorve calor solar"
        },
        {
          id: "bich-vm",
          nome: "Vermelho",
          hex: "#C62828",
          emoji: "🐞",
          exemplo: "como a joaninha",
          funfato: "A joaninha vermelha avisa: \"Tenho gosto horrível — não me coma!\"",
          detalhe: "Aposematismo | Alcaloides defensivos | Hemolimfa amarga e tóxica"
        },
        {
          id: "bich-vd",
          nome: "Verde",
          hex: "#2E7D32",
          emoji: "🦎",
          exemplo: "como o lagarto verde",
          funfato: "O lagarto verde é quase invisível nas folhas — a cor é sua armadura!",
          detalhe: "Cromatóforos | Camuflagem críptica | Lagartos arbóreos são mais verdes"
        },
        {
          id: "bich-az",
          nome: "Azul",
          hex: "#1565C0",
          emoji: "🦚",
          exemplo: "como as penas do pavão",
          funfato: "O azul do pavão não vem de pigmento — é criado pela estrutura microscópica das penas!",
          detalhe: "Cor estrutural | Nanoestruturas produzem iridescência | Sem pigmento azul real"
        },
        {
          id: "bich-rs",
          nome: "Rosa",
          hex: "#E91E8C",
          emoji: "🦩",
          exemplo: "como o flamingo",
          funfato: "Flamingos nascem cinzas e ficam rosa porque comem camarão — a dieta dá a cor!",
          detalhe: "Astaxantina (carotenoide) do camarão | Dieta determina pigmentação"
        },
        {
          id: "bich-pt",
          nome: "Preto",
          hex: "#212121",
          emoji: "🦬",
          exemplo: "como o bisão preto",
          funfato: "Animais negros em regiões frias ficam mais quentes — o preto absorve o calor do sol!",
          detalhe: "Melanina total | Máxima absorção solar | Vantagem em termorregulação"
        },
        {
          id: "bich-bc",
          nome: "Branco",
          hex: "#E0E0E0",
          emoji: "🐻‍❄️",
          exemplo: "como o urso polar",
          funfato: "O pelo do urso polar é transparente, não branco — reflete a luz como neve!",
          detalhe: "Fios ocos transparentes | Pele negra por baixo | Efeito de fibra óptica"
        }
      ]
    }
  },
  {
    id: "exp_cores_fazenda",
    tipo: "cores",
    titulo: "Cores da Fazenda",
    descricao: "As cores dos animais e plantas da fazenda!",
    emoji: "🌻",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "Bem-vindo à fazenda mais colorida do mundo! 🌻 Cada cantinho tem uma cor diferente. Clique em 🔊 para explorar!",
    dados: {
      cores: [
        {
          id: "faz-am",
          nome: "Amarelo Girassol",
          hex: "#FDD835",
          emoji: "🌻",
          exemplo: "como o girassol",
          funfato: "O girassol gira para seguir o sol durante o dia — por isso tem esse nome!",
          detalhe: "Heliotropismo (plantas jovens) | Flavonoides nas pétalas | 1.000+ flores minúsculas"
        },
        {
          id: "faz-vm",
          nome: "Vermelho Maçã",
          hex: "#C62828",
          emoji: "🍎",
          exemplo: "como a maçã vermelha",
          funfato: "Maçãs ficam vermelhas ao sol porque antocianinas se formam com luz solar intensa!",
          detalhe: "Antocianinas: sensor de UV | Vermelho ao sol direto | Verdes na sombra"
        },
        {
          id: "faz-la",
          nome: "Laranja Abóbora",
          hex: "#E65100",
          emoji: "🎃",
          exemplo: "como a abóbora",
          funfato: "A abóbora laranja tem beta-caroteno — o mesmo nutriente saudável da cenoura!",
          detalhe: "Beta-caroteno → Vitamina A | Cucurbitáceas | Carotenoide lipofílico"
        },
        {
          id: "faz-rx",
          nome: "Roxo Uva",
          hex: "#6A1B9A",
          emoji: "🍇",
          exemplo: "como as uvas roxas",
          funfato: "Uvas roxas ficam mais doces ao sol porque o calor transforma amido em açúcar!",
          detalhe: "Antocianinas + maturação açucarada | Resveratrol antioxidante na casca"
        },
        {
          id: "faz-vd",
          nome: "Verde Capim",
          hex: "#388E3C",
          emoji: "🌿",
          exemplo: "como o capim fresco",
          funfato: "Vacas preferem capim verde fresco porque tem mais água e nutrientes!",
          detalhe: "Clorofila ativa (verde) = crescimento | Clorofila degradada = amarelo seco"
        },
        {
          id: "faz-mm",
          nome: "Marrom Pinhão",
          hex: "#5D4037",
          emoji: "🌰",
          exemplo: "como o pinhão maduro",
          funfato: "O pinhão é semente da araucária, uma árvore que já existia na época dos dinossauros!",
          detalhe: "Araucária angustifólia | Endêmica do Sul do Brasil | Em risco de extinção"
        },
        {
          id: "faz-bc",
          nome: "Branco Leite",
          hex: "#EEEEEE",
          emoji: "🥛",
          exemplo: "como o leite",
          funfato: "O leite é branco porque suas proteínas espalham toda a luz em todas as direções!",
          detalhe: "Micelas de caseína (~3%) | Espalhamento Mie | Partículas >1μm"
        },
        {
          id: "faz-do",
          nome: "Dourado Mel",
          hex: "#FF8F00",
          emoji: "🍯",
          exemplo: "como o mel",
          funfato: "O mel nunca estraga — arqueólogos encontraram mel de 3.000 anos ainda comestível!",
          detalhe: "Umidade <20% | pH ácido (3.4) | Peróxido de H₂O₂ | Higroscópico"
        }
      ]
    }
  },
  {
    id: "exp_cores_ceu",
    tipo: "cores",
    titulo: "As Cores do Céu",
    descricao: "O céu muda de cor durante o dia — descubra por quê!",
    emoji: "🌤️",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "O céu é como um quadro que muda a cada hora! 🌤️ De manhã, ao meio-dia e ao pôr do sol — tudo muda. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "ceu-rs",
          nome: "Rosa da Manhã",
          hex: "#F48FB1",
          emoji: "🌅",
          exemplo: "como o amanhecer",
          funfato: "O céu rosa de manhã acontece porque a luz do sol baixo passa por muito mais atmosfera!",
          detalhe: "Espalhamento Rayleigh + aerossóis | Luz azul dispersa | λ longos predominam"
        },
        {
          id: "ceu-az",
          nome: "Azul do Dia",
          hex: "#1565C0",
          emoji: "☀️",
          exemplo: "como o céu ao meio-dia",
          funfato: "O céu é azul porque as moléculas do ar espalham mais a luz azul que outras cores!",
          detalhe: "Espalhamento Rayleigh | λ curto (azul) = mais espalhado | Tyndall 1869"
        },
        {
          id: "ceu-bc",
          nome: "Branco da Nuvem",
          hex: "#BDBDBD",
          emoji: "☁️",
          exemplo: "como as nuvens brancas",
          funfato: "Nuvens são brancas porque bilhões de gotículas de água refletem toda a luz solar!",
          detalhe: "Espalhamento Mie (gotículas >1μm) | Reflete todas as frequências = branco"
        },
        {
          id: "ceu-la",
          nome: "Laranja do Entardecer",
          hex: "#E65100",
          emoji: "🌄",
          exemplo: "como o pôr do sol",
          funfato: "No pôr do sol a luz percorre muito mais atmosfera — só laranja e vermelho chegam!",
          detalhe: "Caminho óptico longo | Azul dispersa antes | Vermelho/laranja chegam ao solo"
        },
        {
          id: "ceu-ci",
          nome: "Cinza de Chuva",
          hex: "#546E7A",
          emoji: "🌧️",
          exemplo: "como as nuvens de chuva",
          funfato: "Nuvens de chuva ficam cinzas porque são espessas demais para deixar luz passar!",
          detalhe: "Nimbostratus: 2-4km de espessura | Gotas maiores absorvem mais luz"
        },
        {
          id: "ceu-vl",
          nome: "Violeta da Noite",
          hex: "#283593",
          emoji: "🌃",
          exemplo: "como o céu ao anoitecer",
          funfato: "O céu fica violeta no crepúsculo — é a transição entre azul e o preto do espaço!",
          detalhe: "Crepúsculo civil: sol 6° abaixo | Luz espalhada residual + escuridão do espaço"
        }
      ]
    }
  },
  {
    id: "exp_cores_sentimentos",
    tipo: "cores",
    titulo: "Cores e Sentimentos",
    descricao: "Cada sentimento tem uma cor — qual é a sua hoje?",
    emoji: "🎭",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "Sentimentos têm cores! 🎭 Artistas usam cores para mostrar emoções nas pinturas. Clique em 🔊 e descubra!",
    dados: {
      cores: [
        {
          id: "sent-am",
          nome: "Amarelo Alegria",
          hex: "#FDD835",
          emoji: "😄",
          exemplo: "como a alegria",
          funfato: "Pesquisas mostram que o amarelo aumenta felicidade e energia nas pessoas!",
          detalhe: "Estimula serotonina | Aumenta atenção | Primeira cor percebida visualmente"
        },
        {
          id: "sent-vm",
          nome: "Vermelho Raiva",
          hex: "#C62828",
          emoji: "😡",
          exemplo: "como a raiva",
          funfato: "Ver o vermelho acelera o coração — por isso é cor de alerta e urgência!",
          detalhe: "Eleva frequência cardíaca | Aumenta adrenalina | Associada a perigo evolutivo"
        },
        {
          id: "sent-az",
          nome: "Azul Calma",
          hex: "#1565C0",
          emoji: "😌",
          exemplo: "como a calma",
          funfato: "Azul reduz a pressão arterial — hospitais usam muito azul para acalmar pacientes!",
          detalhe: "Reduz frequência cardíaca | Aumenta produtividade | Favorece concentração"
        },
        {
          id: "sent-vd",
          nome: "Verde Esperança",
          hex: "#2E7D32",
          emoji: "🌱",
          exemplo: "como a esperança",
          funfato: "Verde é a cor da esperança e do crescimento — como uma plantinha que brota!",
          detalhe: "Centro do espectro | Facilmente percebida | Associada à natureza e renovação"
        },
        {
          id: "sent-rx",
          nome: "Roxo Mistério",
          hex: "#6A1B9A",
          emoji: "🔮",
          exemplo: "como o mistério",
          funfato: "Roxo é associado à magia e intuição — por isso bruxas e magos usam essa cor!",
          detalhe: "Raridade histórica | Realeza, sabedoria, espiritualidade | Mistura R+B"
        },
        {
          id: "sent-la",
          nome: "Laranja Energia",
          hex: "#E65100",
          emoji: "⚡",
          exemplo: "como a energia",
          funfato: "Laranja é a cor mais associada à diversão e aventura — anima e convida!",
          detalhe: "Alta excitação | Entre calor do vermelho e alegria do amarelo | Estimulante"
        }
      ]
    }
  },
  {
    id: "exp_cores_frutas",
    tipo: "cores",
    titulo: "Frutas Coloridas",
    descricao: "Um arco-íris de sabores e nutrientes!",
    emoji: "🍓",
    habilidade: "Expressão Artística",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "A cesta de frutas virou um arco-íris! 🍓 Cada cor tem uma fruta e um nutriente especial. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "fru-vm",
          nome: "Vermelho Morango",
          hex: "#C62828",
          emoji: "🍓",
          exemplo: "como o morango",
          funfato: "O morango tem mais vitamina C que a laranja — por grama!",
          detalhe: "Vitamina C: 59mg/100g | Antocianinas | Fisalino (pigmento vermelho)"
        },
        {
          id: "fru-la",
          nome: "Laranja Manga",
          hex: "#E65100",
          emoji: "🥭",
          exemplo: "como a manga",
          funfato: "A manga tem mais de 20 vitaminas e minerais — uma das frutas mais nutritivas!",
          detalhe: "Beta-caroteno | Vitamina C 60mg | Vitamina B6 | 83 kcal/100g"
        },
        {
          id: "fru-am",
          nome: "Amarelo Banana",
          hex: "#FDD835",
          emoji: "🍌",
          exemplo: "como a banana",
          funfato: "A banana tem triptofano que o corpo transforma em serotonina — te deixa feliz!",
          detalhe: "Triptofano → Serotonina | Potássio 358mg | Vitamina B6 | 96 kcal"
        },
        {
          id: "fru-vd",
          nome: "Verde Kiwi",
          hex: "#388E3C",
          emoji: "🥝",
          exemplo: "como o kiwi",
          funfato: "O kiwi tem o dobro de vitamina C da laranja e ajuda a dormir melhor!",
          detalhe: "Vitamina C: 93mg/100g | Serotonina natural | Melhora qualidade do sono"
        },
        {
          id: "fru-az",
          nome: "Azul Mirtilo",
          hex: "#283593",
          emoji: "🫐",
          exemplo: "como o mirtilo",
          funfato: "Mirtilos azuis têm antocianinas que melhoram a memória e protegem o cérebro!",
          detalhe: "Antocianinas | Manganês | Vitamina K | Baixo índice glicêmico"
        },
        {
          id: "fru-rx",
          nome: "Roxo Uva",
          hex: "#6A1B9A",
          emoji: "🍇",
          exemplo: "como a uva roxa",
          funfato: "O resveratrol da uva roxa é um antioxidante que protege o coração!",
          detalhe: "Resveratrol (estilbeno) | Polifenol anticâncer | Mais concentrado na casca"
        },
        {
          id: "fru-bc",
          nome: "Branco Coco",
          hex: "#E0E0E0",
          emoji: "🥥",
          exemplo: "como o coco",
          funfato: "A água de coco é tão pura que foi usada como soro médico de emergência!",
          detalhe: "Isotônica | Eletrólitos naturais | Laurato de coco com propriedade antimicrobiana"
        },
        {
          id: "fru-mm",
          nome: "Marrom Tâmara",
          hex: "#5D4037",
          emoji: "🍯",
          exemplo: "como a tâmara",
          funfato: "As tâmaras são tão ricas em energia que guerreiros as usavam como alimento de guerra!",
          detalhe: "66g açúcar/100g | Frutose + glicose | Alimento tradicional do deserto"
        }
      ]
    }
  }
]

// ── Fase 2 — padrão, robô, labirinto ──
export const fase2ExtraPorFaixa = [
  {
    id: "exp_padrao_cores",
    tipo: "padrao",
    titulo: "Cores que Alternam",
    descricao: "Descubra qual cor vem a seguir!",
    emoji: "🎨",
    habilidade: "Reconhecimento de Padrões",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "A máquina de tintas está trabalhando! 🎨 Ela repete sempre as mesmas cores. Olhe o padrão e descubra qual cor está faltando!",
    puzzles: [
      {
        matriz: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵", "🔴", "🔵", "❓"],
        resposta: "🔴",
        opcoes: ["🔵", "🔴", "🟡", "🟢"],
        dica: "As cores se alternam: vermelho, azul, vermelho..."
      },
      {
        matriz: ["🟡", "🟢", "🔵", "🟡", "🟢", "🔵", "🟡", "🟢", "❓"],
        resposta: "🔵",
        opcoes: ["🟡", "🟢", "🔵", "🔴"],
        dica: "Três cores se repetem sempre na mesma ordem!"
      },
      {
        matriz: ["🌙", "🌙", "⭐", "⭐", "🌙", "🌙", "⭐", "⭐", "❓"],
        resposta: "🌙",
        opcoes: ["⭐", "🌙", "☀️", "💫"],
        dica: "Dois iguais, dois iguais... qual vem depois de dois estrelas?"
      },
      {
        matriz: ["🍎", "🍊", "🍋", "🍎", "🍊", "🍋", "🍎", "🍊", "❓"],
        resposta: "🍋",
        opcoes: ["🍎", "🍊", "🍋", "🍇"],
        dica: "Cada linha tem as mesmas 3 frutas!"
      },
      {
        matriz: ["🔺", "⬛", "⭕", "🔺", "⬛", "⭕", "🔺", "⬛", "❓"],
        resposta: "⭕",
        opcoes: ["🔺", "⬛", "⭕", "🔷"],
        dica: "Triângulo, quadrado, círculo — sempre nessa ordem!"
      }
    ]
  },
  {
    id: "exp_padrao_numeros",
    tipo: "padrao",
    titulo: "Números em Ordem",
    descricao: "Qual número está faltando na grade?",
    emoji: "🔢",
    habilidade: "Lógica Matemática",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "O calendário mágico perdeu alguns números! 🔢 Cada linha e coluna tem um padrão secreto. Descubra o número que está faltando!",
    puzzles: [
      {
        matriz: ["1", "2", "3", "4", "5", "6", "7", "8", "❓"],
        resposta: "9",
        opcoes: ["8", "9", "10", "11"],
        dica: "Cada número é 1 a mais que o anterior!"
      },
      {
        matriz: ["2", "4", "6", "8", "10", "12", "14", "16", "❓"],
        resposta: "18",
        opcoes: ["16", "17", "18", "20"],
        dica: "Contamos de 2 em 2 — números pares!"
      },
      {
        matriz: ["1", "2", "3", "2", "3", "4", "3", "4", "❓"],
        resposta: "5",
        opcoes: ["4", "5", "6", "7"],
        dica: "Cada linha começa um número maior!"
      },
      {
        matriz: ["10", "9", "8", "7", "6", "5", "4", "3", "❓"],
        resposta: "2",
        opcoes: ["1", "2", "3", "4"],
        dica: "Os números estão diminuindo de 1 em 1!"
      },
      {
        matriz: ["A", "B", "C", "D", "E", "F", "G", "H", "❓"],
        resposta: "I",
        opcoes: ["H", "I", "J", "K"],
        dica: "Siga o alfabeto!"
      }
    ]
  },
  {
    id: "exp_padrao_animais",
    tipo: "padrao",
    titulo: "Animais Brincalhões",
    descricao: "Qual animal vem a seguir no padrão?",
    emoji: "🐾",
    habilidade: "Reconhecimento de Padrões",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "Os animais estão formando grupos para brincar! 🐾 Eles sempre se organizam da mesma forma. Descubra qual animal está faltando!",
    puzzles: [
      {
        matriz: ["🐶", "🐱", "🐰", "🐶", "🐱", "🐰", "🐶", "🐱", "❓"],
        resposta: "🐰",
        opcoes: ["🐶", "🐱", "🐰", "🐭"],
        dica: "Cachorro, gato, coelho — sempre nessa ordem!"
      },
      {
        matriz: ["🐠", "🐠", "🐙", "🐠", "🐠", "🐙", "🐠", "🐠", "❓"],
        resposta: "🐙",
        opcoes: ["🐠", "🐙", "🦈", "🐟"],
        dica: "Dois peixes, um polvo, dois peixes, um polvo..."
      },
      {
        matriz: ["🐘", "🦒", "🦁", "🐘", "🦒", "🦁", "🐘", "🦒", "❓"],
        resposta: "🦁",
        opcoes: ["🐘", "🦒", "🦁", "🐆"],
        dica: "Elefante, girafa, leão — sempre a mesma sequência!"
      },
      {
        matriz: ["🦋", "🐛", "🦋", "🐛", "🦋", "🐛", "🦋", "🐛", "❓"],
        resposta: "🦋",
        opcoes: ["🐛", "🦋", "🐝", "🐞"],
        dica: "Borboleta e lagarta se alternam. Quem vem depois de lagarta?"
      },
      {
        matriz: ["🐧", "🐧", "🦆", "🦆", "🐧", "🐧", "🦆", "🦆", "❓"],
        resposta: "🐧",
        opcoes: ["🦆", "🐧", "🦅", "🐓"],
        dica: "Dois pinguins, dois patos — qual vem depois de dois patos?"
      }
    ]
  },
  {
    id: "exp_robo_passeio",
    tipo: "robo",
    titulo: "Passeio no Parque",
    descricao: "Guie o robô até a flor!",
    emoji: "🤖",
    habilidade: "Pensamento Computacional",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "O robozinho quer visitar a flor no parque! 🤖 Mostre o caminho para ele. Cuidado com as pedras no caminho!",
    niveis: [
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 3],
        paredes: [],
        passos_max: 6
      },
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 3],
        paredes: [
          [1, 1]
        ],
        passos_max: 6
      }
    ]
  },
  {
    id: "exp_robo_jardim",
    tipo: "robo",
    titulo: "Jardim Mágico",
    descricao: "Encontre o caminho pelo jardim!",
    emoji: "🌸",
    habilidade: "Pensamento Computacional",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "O robô jardineiro precisa regar as plantas! 🌸 Mas o jardim tem alguns obstáculos. Planeje o caminho mais curto!",
    niveis: [
      {
        grade: 4,
        inicio: [0, 0],
        fim: [0, 3],
        paredes: [],
        passos_max: 3
      },
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 0],
        paredes: [
          [1, 0],
          [2, 0]
        ],
        passos_max: 5
      }
    ]
  },
  {
    id: "exp_labirinto_floresta",
    tipo: "labirinto",
    titulo: "Floresta Encantada",
    descricao: "Encontre a saída da floresta!",
    emoji: "🌲",
    habilidade: "Raciocínio Espacial",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 5,
    historinha: "Você se perdeu na floresta encantada! 🌲 Use seu mapa e encontre a saída antes de anoitecer. O caminho é mais simples do que parece!",
    tamanho: 5
  },
  {
    id: "exp_labirinto_castelo",
    tipo: "labirinto",
    titulo: "Castelo de Brinquedo",
    descricao: "Ache a porta do castelo!",
    emoji: "🏰",
    habilidade: "Raciocínio Espacial",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 6,
    historinha: "O castelo de brinquedo tem corredores misteriosos! 🏰 A princesa está esperando. Encontre o caminho até a porta dourada!",
    tamanho: 5
  },
  {
    id: "exp_labirinto_fazenda",
    tipo: "labirinto",
    titulo: "Labirinto da Fazenda",
    descricao: "Guie o frango até o celeiro!",
    emoji: "🐔",
    habilidade: "Raciocínio Espacial",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "O franguinho se perdeu no milharal! 🐔 O celeiro está do outro lado da fazenda. Encontre o caminho entre os pés de milho!",
    tamanho: 7
  },
  {
    id: "exp_labirinto_fundo_mar",
    tipo: "labirinto",
    titulo: "Fundo do Mar",
    descricao: "Nada até o tesouro submarino!",
    emoji: "🐠",
    habilidade: "Raciocínio Espacial",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 7,
    historinha: "O peixinho descobriu um tesouro no fundo do mar! 🐠 Mas tem muitas algas e corais no caminho. Nada com cuidado até chegar lá!",
    tamanho: 7
  }
]

// ── Fase 3 — blocos, inventor, robô e quizia extras ──
export const fase3ExtraPorFaixa = [
  {
    id: "exp_blocos_3",
    tipo: "blocos",
    titulo: "Robô na Chuva",
    descricao: "Leve o robô até o abrigo antes da tempestade!",
    emoji: "🌧️",
    habilidade: "Pensamento Computacional",
    xp_reward: 75,
    coins_reward: 75,
    tempo_estimado: 9,
    historinha: "Está chovendo muito e o Robô Beep está perdido! 🌧️ Ele precisa chegar ao abrigo quentinho. Use os blocos para guiá-lo pelo caminho seco!",
    niveis: [
      {
        grade: 3,
        inicio: [0, 2],
        fim: [2, 0],
        paredes: [],
        passos_max: 4,
        dica: "Suba 2 e vá 2 para a direita!"
      },
      {
        grade: 4,
        inicio: [0, 0],
        fim: [2, 3],
        paredes: [
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 3]
        ],
        passos_max: 5,
        dica: "Vá 2 para a direita e desça 3!"
      },
      {
        grade: 4,
        inicio: [3, 3],
        fim: [0, 0],
        paredes: [
          [1, 2],
          [2, 2],
          [3, 2]
        ],
        passos_max: 6,
        dica: "Suba evitando a parede e vá para a esquerda!"
      }
    ]
  },
  {
    id: "exp_blocos_4",
    tipo: "blocos",
    titulo: "Tesouro Escondido",
    descricao: "Use o bloco mágico para achar o tesouro mais rápido!",
    emoji: "💎",
    habilidade: "Pensamento Computacional",
    xp_reward: 80,
    coins_reward: 80,
    tempo_estimado: 10,
    historinha: "Um pirata escondeu seu tesouro num mapa cheio de repetições! 💎 O mapa diz: \"ande, ande, ande, ande...\" — mas o bloco 🔁 faz isso em um comando só!",
    niveis: [
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 0],
        paredes: [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
          [0, 2],
          [1, 2],
          [2, 2],
          [3, 2],
          [0, 3],
          [1, 3],
          [2, 3],
          [3, 3]
        ],
        passos_max: 3,
        dica: "Use → depois 🔁×3 para andar 3 casas à direita!"
      },
      {
        grade: 4,
        inicio: [0, 3],
        fim: [0, 0],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [1, 1],
          [2, 1],
          [3, 1],
          [1, 2],
          [2, 2],
          [3, 2],
          [1, 3],
          [2, 3],
          [3, 3]
        ],
        passos_max: 3,
        dica: "Use ↑ depois 🔁×3 para subir 3 casas!"
      },
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 3],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [0, 1],
          [0, 2],
          [0, 3]
        ],
        passos_max: 5,
        dica: "Contorne as paredes: desça 3 depois vá 3 para a direita!"
      }
    ]
  },
  {
    id: "exp_robo_3",
    tipo: "robo",
    titulo: "Robô na Fazenda",
    descricao: "Guie o robô para colher os vegetais maduros!",
    emoji: "🥕",
    habilidade: "Pensamento Computacional",
    xp_reward: 75,
    coins_reward: 75,
    tempo_estimado: 9,
    historinha: "O Robô Fazendeiro precisa colher as cenouras antes que escureça! 🥕 Mas os canteiros formam paredes pelo caminho. Você consegue guiá-lo até a colheita?",
    niveis: [
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 3],
        paredes: [
          [1, 1],
          [2, 1],
          [1, 2],
          [2, 2]
        ],
        passos_max: 8,
        dica: "Contorne o bloco do meio — vai pela borda!"
      },
      {
        grade: 4,
        inicio: [0, 2],
        fim: [3, 0],
        paredes: [
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2]
        ],
        passos_max: 8,
        dica: "Suba primeiro, depois contorne as plantas!"
      },
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
          [2, 0],
          [2, 1],
          [2, 2],
          [0, 3],
          [1, 3],
          [2, 3]
        ],
        passos_max: 10,
        dica: "Contorne a parede vertical e depois a horizontal!"
      }
    ]
  },
  {
    id: "exp_blocos_1",
    tipo: "blocos",
    titulo: "Primeiro Programa",
    descricao: "Monte sequências simples para guiar o robozinho!",
    emoji: "🔲",
    habilidade: "Pensamento Computacional",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "O Robozinho Beep acabou de aprender a andar! 🤖 Ele entende dois comandos: \"ir para o lado\" e \"ir para baixo\". Monte a sequência certa e leve-o até a estrelinha!",
    niveis: [
      {
        grade: 3,
        inicio: [0, 0],
        fim: [2, 2],
        paredes: [],
        passos_max: 4,
        dica: "Vá 2 vezes para a direita e 2 vezes para baixo!"
      },
      {
        grade: 4,
        inicio: [0, 0],
        fim: [0, 3],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [1, 1],
          [2, 1],
          [3, 1],
          [1, 2],
          [2, 2],
          [3, 2],
          [1, 3],
          [2, 3],
          [3, 3]
        ],
        passos_max: 4,
        dica: "Só tem caminho na primeira linha — use → R3!"
      },
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 0],
        paredes: [
          [0, 1],
          [0, 2],
          [0, 3],
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [2, 3],
          [3, 1],
          [3, 2],
          [3, 3]
        ],
        passos_max: 4,
        dica: "Só tem caminho na primeira coluna — use ↓ R3!"
      }
    ]
  },
  {
    id: "exp_blocos_2",
    tipo: "blocos",
    titulo: "Caminhos Mágicos",
    descricao: "Descubra o poder de repetir comandos com o bloco mágico!",
    emoji: "✨",
    habilidade: "Pensamento Computacional",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 9,
    historinha: "A varinha mágica tem um poder especial: ela repete o último feitiço quantas vezes você quiser! ✨ Use o bloco 🔁 para repetir os movimentos sem escrever muito!",
    niveis: [
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 3],
        paredes: [],
        passos_max: 4,
        dica: "Use → R3 para ir 3 vezes à direita, depois ↓ R3 para baixo!"
      },
      {
        grade: 3,
        inicio: [2, 0],
        fim: [0, 2],
        paredes: [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1]
        ],
        passos_max: 4,
        dica: "Suba 2 e vá para a direita 2!"
      },
      {
        grade: 4,
        inicio: [0, 3],
        fim: [3, 0],
        paredes: [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 0],
          [2, 1],
          [2, 2]
        ],
        passos_max: 4,
        dica: "Desça 3 e vá para a esquerda 3!"
      }
    ]
  },
  {
    id: "exp_robo_2",
    tipo: "robo",
    titulo: "Robô Explorador",
    descricao: "Guie o robô por novos desafios na floresta!",
    emoji: "🌳",
    habilidade: "Pensamento Computacional",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 9,
    historinha: "O Robô Folha precisa atravessar a Floresta Mágica! 🌳 As árvores formam paredes e ele precisa encontrar o caminho entre elas. Você consegue guiá-lo até a semente dourada?",
    niveis: [
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 2],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [1, 1],
          [2, 1],
          [3, 1]
        ],
        passos_max: 5,
        dica: "Vai para a direita até o fim, depois desce!"
      },
      {
        grade: 4,
        inicio: [0, 0],
        fim: [2, 3],
        paredes: [
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 0],
          [2, 1],
          [2, 2]
        ],
        passos_max: 5,
        dica: "Desce 2, vai para a direita 3!"
      },
      {
        grade: 5,
        inicio: [0, 0],
        fim: [4, 4],
        paredes: [
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
        passos_max: 8,
        dica: "Vai até a última coluna, depois desce!"
      }
    ]
  },
  {
    id: "exp_quizia_2",
    tipo: "quizia",
    titulo: "Quiz Surpresa IA",
    descricao: "Mais temas incríveis gerados pela inteligência artificial!",
    emoji: "🌟",
    habilidade: "Conhecimento Geral",
    xp_reward: 75,
    coins_reward: 75,
    tempo_estimado: 8,
    historinha: "O robozinho da IA está com novas perguntas! 🌟 Hoje ele trouxe temas ainda mais incríveis. Escolha um e mostre o quanto você sabe!",
    temas: ["🌍 Países", "🦕 Dinossauros", "🌤️ Tempo e Clima", "🎪 Festas e Datas"]
  },
  {
    id: "exp_quizia_3",
    tipo: "quizia",
    titulo: "Quiz IA — Mundo ao Redor",
    descricao: "Coisas do dia a dia viram perguntas divertidas com a ajuda da IA!",
    emoji: "🏠",
    habilidade: "Conhecimento Geral",
    xp_reward: 75,
    coins_reward: 75,
    tempo_estimado: 8,
    historinha: "A IA olhou ao redor e ficou curiosa com tudo que existe! 🏠 Carros, comidas, casas e profissões — tudo virou pergunta. Escolha um tema do mundo real e vamos descobrir juntos!",
    temas: ["🚗 Veículos", "🍕 Comidas", "🏠 A Casa", "👷 Profissões"]
  }
]

// ── Fase 4 — robô e padrão (2 por faixa) ──
export const fase4ExtraPorFaixa = [
  {
    id: "exp_robo_4",
    tipo: "robo",
    titulo: "Robô no Espaço",
    descricao: "Guie o robozinho pelos planetas sem bater nos asteroides!",
    emoji: "🚀",
    habilidade: "Pensamento Computacional",
    xp_reward: 75,
    coins_reward: 75,
    tempo_estimado: 9,
    historinha: "O Robô Astronauta está explorando o sistema solar! 🚀 Mas há asteroides pelo caminho. Planeje a rota certa para ele chegar à Lua sã e salvo!",
    niveis: [
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 2],
        paredes: [
          [1, 0],
          [2, 0]
        ],
        passos_max: 7,
        dica: "Vai para a direita primeiro, depois desce!"
      },
      {
        grade: 4,
        inicio: [3, 0],
        fim: [0, 3],
        paredes: [
          [2, 1],
          [2, 2],
          [2, 3]
        ],
        passos_max: 8,
        dica: "Sobe pela esquerda e depois vai para a direita!"
      }
    ]
  },
  {
    id: "exp_robo_5",
    tipo: "robo",
    titulo: "Robô na Fazendinha",
    descricao: "Ajude o robô a regar as plantas do jardim!",
    emoji: "🌻",
    habilidade: "Pensamento Computacional",
    xp_reward: 75,
    coins_reward: 75,
    tempo_estimado: 9,
    historinha: "O Robô Jardineiro precisa regar todas as plantas! 🌻 Mas alguns canteiros estão bloqueando o caminho. Use os comandos certos para chegar ao regador!",
    niveis: [
      {
        grade: 4,
        inicio: [0, 0],
        fim: [3, 3],
        paredes: [
          [0, 2],
          [1, 2],
          [2, 2]
        ],
        passos_max: 8,
        dica: "A coluna do meio está bloqueada — vai pela esquerda e depois pela base!"
      },
      {
        grade: 4,
        inicio: [0, 3],
        fim: [2, 0],
        paredes: [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1]
        ],
        passos_max: 7,
        dica: "O canto esquerdo está fechado — desce pelo lado direito!"
      }
    ]
  },
  {
    id: "exp_padrao_clima",
    tipo: "padrao",
    titulo: "Padrões do Tempo",
    descricao: "Descubra o padrão do clima e veja o que vem a seguir!",
    emoji: "⛅",
    habilidade: "Reconhecimento de Padrões",
    xp_reward: 65,
    coins_reward: 65,
    tempo_estimado: 7,
    historinha: "A previsora do tempo perdeu os dados! ⛅ Os símbolos do clima têm um padrão secreto. Você consegue descobrir qual tempo vem a seguir?",
    puzzles: [
      {
        matriz: ["☀️", "🌧️", "☀️", "🌧️", "☀️", "🌧️", "☀️", "🌧️", "❓"],
        resposta: "☀️",
        opcoes: ["🌧️", "☀️", "⛅", "🌩️"],
        dica: "Sol e chuva se alternam sempre!"
      },
      {
        matriz: ["☀️", "🌤️", "⛅", "☀️", "🌤️", "⛅", "☀️", "🌤️", "❓"],
        resposta: "⛅",
        opcoes: ["☀️", "🌤️", "⛅", "🌧️"],
        dica: "Três tipos de tempo sempre na mesma ordem!"
      },
      {
        matriz: ["❄️", "❄️", "🌞", "❄️", "🌞", "🌞", "🌞", "🌞", "❓"],
        resposta: "🌞",
        opcoes: ["❄️", "⛄", "🌞", "⛅"],
        dica: "Cada linha tem menos neve e mais sol!"
      },
      {
        matriz: ["🌸", "🌻", "🍂", "🌸", "🌻", "🍂", "🌸", "🌻", "❓"],
        resposta: "🍂",
        opcoes: ["🌸", "🌻", "🍂", "❄️"],
        dica: "As estações se repetem: primavera, verão, outono!"
      },
      {
        matriz: ["🌤️", "⛅", "🌧️", "⛅", "🌧️", "⛈️", "🌧️", "⛈️", "❓"],
        resposta: "🌩️",
        opcoes: ["☀️", "⛅", "⛈️", "🌩️"],
        dica: "O tempo vai piorando — cada diagonal tem um tempo mais forte!"
      }
    ]
  },
  {
    id: "exp_padrao_estacoes",
    tipo: "padrao",
    titulo: "Ciclos da Natureza",
    descricao: "Dia e noite, lua, plantas — tudo se repete!",
    emoji: "🌕",
    habilidade: "Reconhecimento de Padrões",
    xp_reward: 65,
    coins_reward: 65,
    tempo_estimado: 7,
    historinha: "A natureza tem seus próprios ritmos! 🌕 O sol nasce e se põe, a lua cresce e some, as plantas brotam e secam. Descubra o padrão de cada ciclo!",
    puzzles: [
      {
        matriz: ["🌞", "🌙", "🌞", "🌙", "🌞", "🌙", "🌞", "🌙", "❓"],
        resposta: "🌞",
        opcoes: ["🌙", "🌞", "⭐", "🌛"],
        dica: "Dia e noite se revezam sempre!"
      },
      {
        matriz: ["🌱", "🌿", "🌳", "🌱", "🌿", "🌳", "🌱", "🌿", "❓"],
        resposta: "🌳",
        opcoes: ["🌱", "🌿", "🌳", "🍂"],
        dica: "A planta cresce em três etapas — broto, arbusto, árvore!"
      },
      {
        matriz: ["🐣", "🐤", "🐔", "🐣", "🐤", "🐔", "🐣", "🐤", "❓"],
        resposta: "🐔",
        opcoes: ["🐣", "🐤", "🐔", "🥚"],
        dica: "O ciclo da galinha: filhote, pintinho, adulta!"
      },
      {
        matriz: ["🌑", "🌓", "🌕", "🌑", "🌓", "🌕", "🌑", "🌓", "❓"],
        resposta: "🌕",
        opcoes: ["🌑", "🌓", "🌕", "🌛"],
        dica: "As fases da Lua se repetem: nova, meia, cheia!"
      },
      {
        matriz: ["🍓", "🌻", "🍁", "🍓", "🌻", "🍁", "🍓", "🌻", "❓"],
        resposta: "🍁",
        opcoes: ["🍓", "🌻", "🍁", "❄️"],
        dica: "As três estações: primavera, verão, outono!"
      }
    ]
  }
]

// ── Fase 5 — quiz e inventor temáticos ──
export const fase5ExtraPorFaixa = [
  {
    id: "exp_quiz_espaco",
    tipo: "quiz",
    titulo: "Espaço e Planetas",
    descricao: "Descubra os segredos do sistema solar!",
    emoji: "🚀",
    habilidade: "Conhecimento",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 8,
    historinha: "A nave espacial está pronta para decolar! 🚀 Você vai viajar pelo sistema solar e descobrir coisas incríveis sobre planetas, o Sol e a Lua. Preparado para ser um astronauta por um dia?",
    perguntas: [
      {
        pergunta: "Qual é o nosso planeta?",
        opcoes: ["Marte", "Terra", "Júpiter", "Saturno"],
        correta: 1,
        fato: "🌍 A Terra é o único planeta que sabemos que tem vida! Ela tem 71% da superfície coberta de água — por isso parece azul vista do espaço."
      },
      {
        pergunta: "O que brilha no céu durante o dia e nos aquece?",
        opcoes: ["A Lua", "Uma estrela cadente", "O Sol", "Saturno"],
        correta: 2,
        fato: "☀️ O Sol é uma enorme estrela! Ele é tão grande que caberiam 1 milhão de Terras dentro dele. A sua luz leva 8 minutos para chegar até nós."
      },
      {
        pergunta: "O que vemos no céu à noite que parece mudar de formato?",
        opcoes: ["O Sol", "A Lua", "Uma nuvem", "Um avião"],
        correta: 1,
        fato: "🌙 A Lua muda de formato todos os dias — às vezes é redonda, às vezes é uma fatia!"
      },
      {
        pergunta: "Qual planeta tem anéis famosos ao redor dele?",
        opcoes: ["Marte", "Vênus", "Saturno", "Mercúrio"],
        correta: 2,
        fato: "🪐 Os anéis de Saturno são feitos de pedaços de gelo e rocha! Eles têm quase 300.000 km de largura, mas só uns 10 metros de espessura!"
      },
      {
        pergunta: "Como chamamos as pessoas que viajam para o espaço?",
        opcoes: ["Pilotos", "Astronautas", "Mergulhadores", "Escaladores"],
        correta: 1,
        fato: "👨‍🚀 No espaço, os astronautas flutuam e dormem presos numa cama especial!"
      }
    ]
  },
  {
    id: "exp_quiz_profissoes",
    tipo: "quiz",
    titulo: "Profissões",
    descricao: "Descubra o que cada profissional faz!",
    emoji: "👩‍⚕️",
    habilidade: "Conhecimento",
    xp_reward: 55,
    coins_reward: 55,
    tempo_estimado: 7,
    historinha: "Na Cidade das Profissões todos têm um trabalho especial! 🏙️ Médicos, bombeiros, professores... cada um faz algo diferente para ajudar as pessoas. Você sabe quem faz o quê?",
    perguntas: [
      {
        pergunta: "Quem cuida das pessoas quando elas ficam doentes?",
        opcoes: ["O bombeiro", "O médico", "O pedreiro", "O chef"],
        correta: 1,
        fato: "👩‍⚕️ Os médicos estudam por muitos anos para aprender tudo sobre o corpo humano. Um médico especialista em crianças se chama pediatra!"
      },
      {
        pergunta: "Quem apaga incêndios e salva pessoas em perigo?",
        opcoes: ["O policial", "O eletricista", "O bombeiro", "O piloto"],
        correta: 2,
        fato: "🚒 Os bombeiros também resgatam animais presos e socorrem pessoas em acidentes! O caminhão deles pode carregar até 4.000 litros de água para apagar o fogo."
      },
      {
        pergunta: "Quem ensina os alunos na escola?",
        opcoes: ["O diretor", "O professor", "O cozinheiro", "O dentista"],
        correta: 1,
        fato: "📚 Professores passam anos estudando antes de ensinar outros. No Brasil, o Dia do Professor é comemorado em 15 de outubro em homenagem ao ensino!"
      },
      {
        pergunta: "Quem cuida dos dentes das pessoas?",
        opcoes: ["O fisioterapeuta", "O veterinário", "O farmacêutico", "O dentista"],
        correta: 3,
        fato: "🦷 O dentista recomenda escovar os dentes 3 vezes por dia! O esmalte do dente é o material mais duro do nosso corpo — mais duro que o osso!"
      },
      {
        pergunta: "Quem pilota aviões levando passageiros?",
        opcoes: ["O motorista", "O capitão de navio", "O piloto", "O marinheiro"],
        correta: 2,
        fato: "✈️ Pilotos estudam por anos para aprender a voar! Um avião grande pode carregar mais de 500 pessoas e voar a quase 900 km/h — mais rápido que qualquer carro."
      }
    ]
  }
]

// ── Formas geométricas ──
export const formasExtraPorFaixa = [
  {
    id: "exp_formas_alimentos",
    tipo: "formas",
    titulo: "Formas dos Alimentos",
    descricao: "Descubra que os alimentos têm formas geométricas!",
    emoji: "🍕",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 8,
    historinha: "Que fome de formas! 🍕 A pizza é um círculo, a fatia é um triângulo, o sanduíche é um quadrado. Vamos descobrir as formas escondidas na sua comida favorita!",
    dados: {
      formas: [
        {
          id: "pizza",
          nome: "Círculo (Pizza)",
          cor: "#EF9F27",
          svg: "circle",
          frase: "A pizza tem formato de círculo!",
          funfato: "A pizza surgiu em Nápoles, Itália, no século XIX. O círculo é a forma que distribui o calor de forma mais igual ao assar!"
        },
        {
          id: "fatia",
          nome: "Triângulo (Fatia)",
          cor: "#D85A30",
          svg: "triangle",
          frase: "A fatia de pizza é um triângulo!",
          funfato: "Cortar uma pizza em 8 fatias iguais cria 8 triângulos. É a divisão mais fácil: 4 cortes passando pelo centro!"
        },
        {
          id: "sanduiche",
          nome: "Quadrado (Sanduíche)",
          cor: "#4F8EE8",
          svg: "square",
          frase: "O sanduíche cortado ao meio vira dois retângulos!",
          funfato: "Pão de forma é quadrado porque é mais fácil de fatiar e embalar. E cabe melhor na mochila!"
        },
        {
          id: "melancia",
          nome: "Oval (Melancia)",
          cor: "#1D9E75",
          svg: "oval",
          frase: "A melancia tem formato oval!",
          funfato: "No Japão, agricultores criam melancias quadradas colocando-as em caixas durante o crescimento — custam R$500 cada!"
        },
        {
          id: "bolacha",
          nome: "Círculo (Bolacha)",
          cor: "#D4537E",
          svg: "circle",
          frase: "As bolachas são círculos perfeitos!",
          funfato: "Bolachas circulares empacotam melhor em tubos redondos. E rolos redondos de massa criam bolachas circulares com apenas um passo!"
        },
        {
          id: "waffle",
          nome: "Quadrado (Waffle)",
          cor: "#EF9F27",
          svg: "square",
          frase: "O waffle é uma grade de quadrados!",
          funfato: "Os quadrados do waffle guardam a manteiga e a calda de bordo. A forma em grade aumenta a área crocante!"
        },
        {
          id: "queijo",
          nome: "Triângulo (Queijo)",
          cor: "#D85A30",
          svg: "triangle",
          frase: "O queijo processado tem formato triangular!",
          funfato: "O queijo triangular é uma fatia do círculo grande de queijo. É a forma mais eficiente para cortar e empacotar!"
        },
        {
          id: "ovo",
          nome: "Oval (Ovo)",
          cor: "#7F77DD",
          svg: "oval",
          frase: "O ovo tem forma oval (elipsoide)!",
          funfato: "A forma oval distribui a pressão de forma igual — a galinha consegue sentar no ovo sem quebrá-lo. Engenharia da natureza!"
        }
      ]
    }
  },
  {
    id: "exp_formas_animais",
    tipo: "formas",
    titulo: "Formas dos Animais",
    descricao: "Os animais usam formas geométricas para viver!",
    emoji: "🐾",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 8,
    historinha: "Os animais são mestres das formas! 🐾 A tartaruga tem hexágonos no casco, a abelha faz hexágonos na colmeia, e o caracol carrega uma espiral. Vamos descobrir as formas nos bichinhos!",
    dados: {
      formas: [
        {
          id: "casco",
          nome: "Hexágono (Casco de Tartaruga)",
          cor: "#1D9E75",
          svg: "hex",
          frase: "O casco da tartaruga tem hexágonos!",
          funfato: "O casco da tartaruga tem entre 30 e 40 escudos encaixados. O hexágono é a forma que distribui melhor o peso de todos os lados!"
        },
        {
          id: "peixe",
          nome: "Oval (Corpo do Peixe)",
          cor: "#4F8EE8",
          svg: "oval",
          frase: "O corpo do peixe tem formato oval!",
          funfato: "A forma oval (fusiforme) reduz o arrasto na água. Por isso carros esportivos e aviões também têm esse formato!"
        },
        {
          id: "estrela",
          nome: "Estrela (Estrela-do-Mar)",
          cor: "#EF9F27",
          svg: "star",
          frase: "A estrela-do-mar tem 5 pontas!",
          funfato: "A simetria de 5 pontas da estrela-do-mar se chama simetria pentarradial. Ela pode perder um braço e um novo cresce de volta!"
        },
        {
          id: "borbo",
          nome: "Triângulo (Asas da Borboleta)",
          cor: "#D4537E",
          svg: "triangle",
          frase: "As asas da borboleta têm forma triangular!",
          funfato: "A borboleta é simétrica — a asa esquerda é o espelho perfeito da direita. Os padrões coloridos afastam predadores!"
        },
        {
          id: "circulo",
          nome: "Círculo (Ouriço)",
          cor: "#D85A30",
          svg: "circle",
          frase: "O ouriço vira uma bola circular!",
          funfato: "Quando o ouriço se enrola, todas as espinhas apontam para fora formando um círculo de proteção. Nenhum predador consegue morder!"
        },
        {
          id: "losango",
          nome: "Losango (Pele da Cobra)",
          cor: "#7F77DD",
          svg: "diamond",
          frase: "As escamas da cobra formam losangos!",
          funfato: "As escamas em losango permitem que a cobra se mova em qualquer direção. Engenheiros estudam cobras para criar robôs flexíveis!"
        },
        {
          id: "retangulo",
          nome: "Retângulo (Girafa)",
          cor: "#EF9F27",
          svg: "rect",
          frase: "A girafa tem manchas retangulares!",
          funfato: "As manchas da girafa funcionam como impressão digital — cada girafa tem um padrão único. Também ajudam a regular a temperatura!"
        },
        {
          id: "hexabee",
          nome: "Hexágono (Colmeia)",
          cor: "#1D9E75",
          svg: "hex",
          frase: "As abelhas constroem hexágonos perfeitos!",
          funfato: "As abelhas usam 35% menos cera construindo hexágonos do que se construíssem círculos. A natureza é eficiente!"
        }
      ]
    }
  },
  {
    id: "exp_formas_brinquedos",
    tipo: "formas",
    titulo: "Formas dos Brinquedos",
    descricao: "Descubra as formas escondidas nos seus brinquedos!",
    emoji: "🧸",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 8,
    historinha: "Seus brinquedos estão cheios de formas! 🧸 A bola é uma esfera, o dado é um cubo, e a pista de corrida tem curvas em oval. Vamos encontrar geometria na caixinha de brinquedos!",
    dados: {
      formas: [
        {
          id: "bola",
          nome: "Círculo (Bola)",
          cor: "#D4537E",
          svg: "circle",
          frase: "A bola tem formato de círculo (esfera)!",
          funfato: "Bolas redondas rolam em todas as direções porque têm a mesma distância do centro até qualquer ponto da superfície!"
        },
        {
          id: "dado",
          nome: "Quadrado (Dado)",
          cor: "#4F8EE8",
          svg: "square",
          frase: "O dado tem 6 faces quadradas!",
          funfato: "O dado clássico é um cubo — um dos 5 sólidos de Platão. Os lados opostos sempre somam 7: 1+6, 2+5, 3+4!"
        },
        {
          id: "pipa2",
          nome: "Losango (Pipa)",
          cor: "#EF9F27",
          svg: "diamond",
          frase: "A pipa tem formato de losango!",
          funfato: "A pipa mais antiga conhecida foi feita na China há 2.300 anos com seda e bambu. O formato losango equilibra o vento!"
        },
        {
          id: "carrinho",
          nome: "Círculo (Roda)",
          cor: "#D85A30",
          svg: "circle",
          frase: "As rodas do carrinho são círculos!",
          funfato: "A roda circular foi inventada há 5.500 anos. O círculo é a única forma que rola de forma suave e constante!"
        },
        {
          id: "bloco",
          nome: "Quadrado (Bloco de Lego)",
          cor: "#7F77DD",
          svg: "square",
          frase: "Os blocos de Lego têm topo quadrado!",
          funfato: "O Lego foi inventado na Dinamarca em 1958. A palavra \"LEGO\" vem do dinamarquês \"leg godt\" que significa \"brincar bem\"!"
        },
        {
          id: "aro",
          nome: "Círculo (Bambolê)",
          cor: "#1D9E75",
          svg: "circle",
          frase: "O bambolê é um círculo grande!",
          funfato: "Crianças egípcias já brincavam com aros circulares há 3.000 anos — os primeiros bambolês eram feitos de galhos dobrados!"
        },
        {
          id: "estrelabrink",
          nome: "Estrela (Pião Estrela)",
          cor: "#D4537E",
          svg: "star",
          frase: "Alguns piões têm formato de estrela!",
          funfato: "Piões em estrela giram de forma diferente — os pontos criam um efeito de espiral visual hipnótico quando em alta velocidade!"
        },
        {
          id: "triangulino",
          nome: "Triângulo (Instrumento Musical)",
          cor: "#EF9F27",
          svg: "triangle",
          frase: "O triângulo musical é uma forma geométrica!",
          funfato: "O triângulo musical é um instrumento de percussão. Não tem ponta fechada — por isso o som ressoa e dura mais!"
        }
      ]
    }
  },
  {
    id: "exp_formas_espaco",
    tipo: "formas",
    titulo: "Formas no Espaço",
    descricao: "Os planetas, estrelas e luas têm formas geométricas!",
    emoji: "🚀",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 8,
    historinha: "O espaço é cheio de formas! 🚀 Os planetas são esferas, as órbitas são elipses e as estrelas parecem pontas. Vamos explorar a geometria do universo!",
    dados: {
      formas: [
        {
          id: "planeta",
          nome: "Círculo (Planeta)",
          cor: "#4F8EE8",
          svg: "circle",
          frase: "Os planetas têm formato de esfera!",
          funfato: "Planetas ficam redondos porque a gravidade puxa para o centro igualmente em todas as direções. Quanto maior o planeta, mais redondo ele fica!"
        },
        {
          id: "orbita",
          nome: "Oval (Órbita)",
          cor: "#D4537E",
          svg: "oval",
          frase: "Os planetas orbitam em elipses!",
          funfato: "Kepler descobriu em 1609 que planetas orbitam em elipses, não círculos. O Sol fica em um dos focos da elipse — não no centro!"
        },
        {
          id: "estrelasp",
          nome: "Estrela (Formato)",
          cor: "#EF9F27",
          svg: "star",
          frase: "Estrelas parecem pontas, mas são esferas!",
          funfato: "Estrelas são esferas de gás incandescente. A aparência de \"pontas\" é causada pela nossa córnea e pelas lentes dos telescópios!"
        },
        {
          id: "lua",
          nome: "Círculo (Lua Cheia)",
          cor: "#7F77DD",
          svg: "circle",
          frase: "A Lua cheia parece um círculo no céu!",
          funfato: "A Lua fica no mesmo lado voltado para a Terra sempre — gira ao redor de si mesma na mesma velocidade que orbita a Terra. Nunca vemos o lado de trás!"
        },
        {
          id: "saturno",
          nome: "Oval (Anéis de Saturno)",
          cor: "#1D9E75",
          svg: "oval",
          frase: "Os anéis de Saturno têm formato oval visto de lado!",
          funfato: "Os anéis de Saturno são feitos de bilhões de pedaços de gelo e rocha. São tão finos que comparados ao tamanho seriam mais finos que uma folha de papel!"
        },
        {
          id: "cometa",
          nome: "Triângulo (Cauda do Cometa)",
          cor: "#D85A30",
          svg: "triangle",
          frase: "A cauda do cometa tem formato triangular!",
          funfato: "A cauda do cometa sempre aponta para longe do Sol — é empurrada pelo vento solar. Por isso muda de direção durante a órbita!"
        },
        {
          id: "galaxia",
          nome: "Espiral (Galáxia)",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🌌",
          frase: "Nossa galáxia tem formato de espiral!",
          funfato: "A Via Láctea tem braços espirais com 100.000 anos-luz de diâmetro. O Sol fica a 26.000 anos-luz do centro — uma posição bem simples!"
        },
        {
          id: "buraco",
          nome: "Círculo (Buraco Negro)",
          cor: "#EF9F27",
          svg: "circle",
          frase: "A sombra do buraco negro é um círculo!",
          funfato: "Em 2019, a primeira foto de um buraco negro foi tirada — mostrou um círculo escuro rodeado de luz. Levou 8 telescópios no mundo inteiro e 2 anos de processamento!"
        }
      ]
    }
  },
  {
    id: "exp_formas_casas",
    tipo: "formas",
    titulo: "Formas das Casas",
    descricao: "As casas e prédios são cheios de formas geométricas!",
    emoji: "🏠",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 8,
    historinha: "Olhe ao redor — a sua casa é uma coleção de formas! 🏠 O telhado é um triângulo, as janelas são quadrados, a porta é um retângulo. Vamos descobrir as formas que constroem as casas!",
    dados: {
      formas: [
        {
          id: "telhado",
          nome: "Triângulo (Telhado)",
          cor: "#D85A30",
          svg: "triangle",
          frase: "O telhado tem formato triangular!",
          funfato: "Telhados triangulares existem porque o triângulo é a forma mais resistente — distribui o peso para os lados. A chuva também escorre melhor!"
        },
        {
          id: "janelac",
          nome: "Quadrado (Janela)",
          cor: "#4F8EE8",
          svg: "square",
          frase: "Janelas quadradas deixam entrar luz!",
          funfato: "Janelas quadradas são fáceis de construir e vedar. Aviões têm janelas com cantos arredondados para evitar que o metal quebre pelo estresse!"
        },
        {
          id: "portac",
          nome: "Retângulo (Porta)",
          cor: "#1D9E75",
          svg: "rect",
          frase: "As portas são retângulos altos!",
          funfato: "Portas são mais altas do que largas (retângulo) para as pessoas passarem de pé. A maioria tem 2,10m de altura — 20cm acima da altura média!"
        },
        {
          id: "chamine",
          nome: "Retângulo (Chaminé)",
          cor: "#D4537E",
          svg: "rect",
          frase: "A chaminé tem formato retangular!",
          funfato: "Chaminés retangulares são mais fáceis de construir com tijolos quadrados. A forma tubular guia a fumaça para cima pelo efeito de tiragem!"
        },
        {
          id: "piscina",
          nome: "Retângulo (Piscina)",
          cor: "#7F77DD",
          svg: "rect",
          frase: "A piscina tem formato retangular!",
          funfato: "Piscinas olímpicas têm exatamente 50m × 25m. A forma retangular é perfeita para nadar em linha reta durante as competições!"
        },
        {
          id: "arco",
          nome: "Oval (Arco de Porta)",
          cor: "#EF9F27",
          svg: "oval",
          frase: "Arcos de portas têm forma oval (semicircular)!",
          funfato: "Arcos existem há 4.000 anos — os romanos os usavam em pontes e aquedutos. O arco distribui o peso melhor que uma viga horizontal!"
        },
        {
          id: "piramidec",
          nome: "Triângulo (Pirâmide)",
          cor: "#D85A30",
          svg: "triangle",
          frase: "As pirâmides são triângulos gigantes!",
          funfato: "A Grande Pirâmide de Gizé tem 138m de altura — durante 3.800 anos foi o prédio mais alto do mundo. Construída sem maquinaria moderna!"
        },
        {
          id: "circuloc",
          nome: "Círculo (Cúpula)",
          cor: "#1D9E75",
          svg: "circle",
          frase: "Cúpulas de igrejas têm formato circular!",
          funfato: "A cúpula é a única forma que se sustenta sem colunas no centro. O Pantheon de Roma tem 43m de diâmetro e existe há 1.900 anos!"
        }
      ]
    }
  },
  {
    id: "exp_formas_mar",
    tipo: "formas",
    titulo: "Formas do Mar",
    descricao: "O oceano esconde formas geométricas incríveis!",
    emoji: "🌊",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 8,
    historinha: "Mergulhe no mundo das formas marinhas! 🌊 A concha é uma espiral, o ouriço-do-mar tem simetria de estrela e o coral parece uma árvore de hexágonos. Vamos explorar o fundo do mar!",
    dados: {
      formas: [
        {
          id: "concha",
          nome: "Espiral (Concha)",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🐚",
          frase: "A concha tem formato espiral!",
          funfato: "A espiral da concha do náutilo segue a proporção áurea (φ = 1,618). É a mesma espiral que aparece nas galáxias e nos girassóis!"
        },
        {
          id: "ourico",
          nome: "Estrela (Ouriço-do-Mar)",
          cor: "#D4537E",
          svg: "star",
          frase: "O ouriço-do-mar tem simetria de estrela!",
          funfato: "O ouriço-do-mar tem 5 partes iguais — assim como a estrela-do-mar. Essa simetria de 5 se chama pentarradial e é comum nos equinodermos!"
        },
        {
          id: "bolha",
          nome: "Círculo (Bolha)",
          cor: "#4F8EE8",
          svg: "circle",
          frase: "Bolhas de ar no mar são esferas!",
          funfato: "Bolhas são esféricas porque o ar empurra igualmente em todas as direções. É a forma que usa menos superfície para um mesmo volume!"
        },
        {
          id: "coral",
          nome: "Hexágono (Coral)",
          cor: "#1D9E75",
          svg: "hex",
          frase: "Corais têm células hexagonais!",
          funfato: "Os corais são animais (não plantas) que constroem esqueletos de carbonato de cálcio em forma hexagonal. Recifes de coral levam séculos para crescer!"
        },
        {
          id: "baiacalda",
          nome: "Triângulo (Raia)",
          cor: "#7F77DD",
          svg: "triangle",
          frase: "A raia tem formato de triângulo!",
          funfato: "A raia achatou seu corpo para viver no fundo do mar. A forma triangular (rombo) permite que ela \"voe\" pela água com movimentos de onda!"
        },
        {
          id: "polvo",
          nome: "Círculo (Cabeça do Polvo)",
          cor: "#D85A30",
          svg: "circle",
          frase: "A cabeça do polvo tem formato oval!",
          funfato: "O polvo tem 3 corações, sangue azul e 8 braços com 240 ventosas cada. É o animal invertebrado mais inteligente — consegue abrir potes!"
        },
        {
          id: "peixeang",
          nome: "Oval (Peixe-Anjo)",
          cor: "#D4537E",
          svg: "oval",
          frase: "O peixe-anjo tem formato oval achatado!",
          funfato: "Peixes achatados como o linguado e o peixe-anjo se camuflam no fundo. Os dois olhos migram para o mesmo lado durante o crescimento!"
        },
        {
          id: "estrelamar",
          nome: "Estrela (Estrela-do-Mar)",
          cor: "#EF9F27",
          svg: "star",
          frase: "A estrela-do-mar tem 5 braços em estrela!",
          funfato: "A estrela-do-mar não tem cérebro nem sangue — circula água do mar pelo corpo. Se perder um braço, em 1 ano cresce um novo!"
        }
      ]
    }
  },
  {
    id: "exp_formas_frutas",
    tipo: "formas",
    titulo: "Formas das Frutas",
    descricao: "As frutas têm formas geométricas deliciosas!",
    emoji: "🍓",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 8,
    historinha: "Hora da merenda de formas! 🍓 O morango é um triângulo, a banana é uma lua crescente, e a laranja é um círculo. Vamos descobrir as formas das frutas!",
    dados: {
      formas: [
        {
          id: "laranja",
          nome: "Círculo (Laranja)",
          cor: "#EF9F27",
          svg: "circle",
          frase: "A laranja tem formato de esfera!",
          funfato: "A laranja tem entre 8 e 14 gomos, todos triangulares. A forma esférica protege a polpa e reduz a evaporação da água!"
        },
        {
          id: "morango",
          nome: "Triângulo (Morango)",
          cor: "#D4537E",
          svg: "triangle",
          frase: "O morango tem formato triangular!",
          funfato: "Cada morango tem entre 150 e 200 sementinhas na superfície — são os verdadeiros frutos! A parte vermelha é o receptáculo floral!"
        },
        {
          id: "banana",
          nome: "Arco (Banana)",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🍌",
          frase: "A banana tem formato de arco curvo!",
          funfato: "As bananas crescem curvadas porque apontam para o Sol! O processo se chama gravitropismo negativo — crescem contra a gravidade e em direção à luz."
        },
        {
          id: "melaoverd",
          nome: "Oval (Melão)",
          cor: "#1D9E75",
          svg: "oval",
          frase: "O melão tem formato oval!",
          funfato: "As listras do melão indicam onde os gomos estão dentro. Cada listra externa corresponde a uma divisão interna — dá para contar por fora!"
        },
        {
          id: "abacaxi",
          nome: "Oval (Abacaxi)",
          cor: "#EF9F27",
          svg: "oval",
          frase: "O abacaxi tem formato oval com espinhos!",
          funfato: "Os losangos externos do abacaxi seguem espirais de Fibonacci — 8 em uma direção e 13 na outra. Tudo na natureza usa essa sequência!"
        },
        {
          id: "uva",
          nome: "Círculo (Uva)",
          cor: "#7F77DD",
          svg: "circle",
          frase: "Cada uva é uma esfera pequeninha!",
          funfato: "As uvas crescem em cachos porque ficam juntas por segurança. A forma esférica cabe mais na mesma área — packing máximo de esferas!"
        },
        {
          id: "limaosil",
          nome: "Oval (Limão)",
          cor: "#D4537E",
          svg: "oval",
          frase: "O limão tem forma oval com pontinha!",
          funfato: "A ponta do limão é onde ficam as glândulas de óleos essenciais. Por isso a casca do limão tem um cheiro mais forte que a polpa!"
        },
        {
          id: "cerejacirc",
          nome: "Círculo (Cereja)",
          cor: "#D85A30",
          svg: "circle",
          frase: "A cereja é um círculo perfeito!",
          funfato: "Cerejas dobram de tamanho nas últimas 2 semanas antes de serem colhidas. A forma esférica é determinada geneticamente com precisão!"
        }
      ]
    }
  },
  {
    id: "exp_formas_corpo",
    tipo: "formas",
    titulo: "Formas do Corpo Humano",
    descricao: "Nosso corpo é feito de formas geométricas incríveis!",
    emoji: "🫀",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 8,
    historinha: "Você é uma coleção de formas! 🫀 Seus olhos são círculos, suas unhas são ovais e seus dentes são retângulos. Vamos descobrir as formas do nosso próprio corpo!",
    dados: {
      formas: [
        {
          id: "olho",
          nome: "Oval (Olho)",
          cor: "#4F8EE8",
          svg: "oval",
          frase: "Os olhos têm formato oval!",
          funfato: "A pupila é um círculo que se abre e fecha para controlar a luz. Gatos têm pupila em fenda vertical — permite ver no escuro até 6× melhor que humanos!"
        },
        {
          id: "dente",
          nome: "Retângulo (Dente)",
          cor: "#1D9E75",
          svg: "rect",
          frase: "Os dentes da frente têm forma retangular!",
          funfato: "Dentes são feitos de esmalte — o material mais duro do corpo, mais duro que os ossos! Cada pessoa tem um padrão único de dentes, como impressão digital."
        },
        {
          id: "ouvido",
          nome: "Oval (Ouvido)",
          cor: "#D4537E",
          svg: "oval",
          frase: "O ouvido externo tem forma oval espiral!",
          funfato: "A espiral do ouvido interno (cóclea) tem 2,5 voltas. Quanto mais grave o som, mais fundo na espiral ele é detectado. A natureza usa espirais para maximizar área!"
        },
        {
          id: "unha",
          nome: "Oval (Unha)",
          cor: "#EF9F27",
          svg: "oval",
          frase: "As unhas têm formato oval arredondado!",
          funfato: "Unhas crescem 3mm por mês — mais rápido no verão e na mão dominante. São feitas de queratina, a mesma proteína do cabelo e dos chifres de animais!"
        },
        {
          id: "cabeca",
          nome: "Oval (Cabeça)",
          cor: "#7F77DD",
          svg: "oval",
          frase: "Nossa cabeça tem formato oval!",
          funfato: "Bebês nascem com cabeça maior proporcionalmente. O cérebro humano tem a consistência de gelatina mole e pesa cerca de 1,4kg!"
        },
        {
          id: "coraçao",
          nome: "Triângulo (Coração)",
          cor: "#D85A30",
          svg: "triangle",
          frase: "O coração tem formato triangular (cônico)!",
          funfato: "O coração bate 100.000 vezes por dia e bombeia 7.500 litros de sangue. Tem o tamanho do seu punho fechado!"
        },
        {
          id: "boca",
          nome: "Oval (Boca Aberta)",
          cor: "#D4537E",
          svg: "oval",
          frase: "A boca aberta tem formato oval!",
          funfato: "Ao abrir a boca ao máximo, a mandíbula pode descer até 5cm. O movimento é controlado pelos músculos masseteres — os mais fortes do corpo em proporção ao tamanho!"
        },
        {
          id: "impressao",
          nome: "Espiral (Impressão Digital)",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "👆",
          frase: "Impressões digitais são espirais únicas!",
          funfato: "Nenhum ser humano tem a mesma impressão digital — nem gêmeos idênticos. São formadas no 3º mês de gestação pelos movimentos do bebê no líquido amniótico!"
        }
      ]
    }
  },
  {
    id: "exp_formas_2",
    tipo: "formas",
    titulo: "Formas na Natureza",
    descricao: "Descubra as formas geométricas escondidas na natureza!",
    emoji: "🌿",
    habilidade: "Raciocínio Espacial",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "A natureza é cheia de formas! 🌿 O Sol é um círculo, as montanhas são triângulos, os favos de mel são hexágonos. Ouça cada forma e descubra onde ela aparece no mundo real!",
    dados: {
      formas: [
        {
          id: "sol",
          nome: "Círculo (Sol)",
          cor: "#EF9F27",
          svg: "circle",
          frase: "O Sol tem forma de círculo!",
          funfato: "O Sol é uma esfera gigante — do nosso ponto de vista parece um círculo perfeito no céu!"
        },
        {
          id: "montanha",
          nome: "Triângulo (Montanha)",
          cor: "#4F8EE8",
          svg: "triangle",
          frase: "As montanhas têm forma de triângulo!",
          funfato: "As pirâmides do Egito são triângulos construídos há 4.500 anos — ainda de pé hoje!"
        },
        {
          id: "janela",
          nome: "Quadrado (Janela)",
          cor: "#D85A30",
          svg: "square",
          frase: "Janelas têm forma de quadrado!",
          funfato: "A maioria das casas tem janelas quadradas ou retangulares para encaixar vidros facilmente!"
        },
        {
          id: "porta",
          nome: "Retângulo (Porta)",
          cor: "#1D9E75",
          svg: "rect",
          frase: "Portas têm forma de retângulo!",
          funfato: "Portas são retângulos altos para as pessoas passarem por elas de pé!"
        },
        {
          id: "ovo",
          nome: "Oval (Ovo)",
          cor: "#D4537E",
          svg: "oval",
          frase: "O ovo tem forma oval!",
          funfato: "A forma oval do ovo é perfeita — distribui pressão por igual e é difícil de quebrar!"
        },
        {
          id: "estrelamar",
          nome: "Estrela (do Mar)",
          cor: "#EF9F27",
          svg: "star",
          frase: "A estrela-do-mar tem 5 pontas!",
          funfato: "A estrela-do-mar consegue regenerar um braço inteiro se perder um!"
        },
        {
          id: "pipa",
          nome: "Losango (Pipa)",
          cor: "#7F77DD",
          svg: "diamond",
          frase: "A pipa tem forma de losango!",
          funfato: "Pipas com formato de losango voam melhor porque cortam o vento de forma equilibrada!"
        },
        {
          id: "colmeia",
          nome: "Hexágono (Colmeia)",
          cor: "#1D9E75",
          svg: "hex",
          frase: "A colmeia tem células hexagonais!",
          funfato: "As abelhas escolheram o hexágono por ser o formato que usa menos cera e guarda mais mel!"
        }
      ]
    }
  }
]

// ── Inglês — vocabulário, flashcards, frases e leitura ──
export const inglesExtraPorFaixa = [
  {
    id: "exp_ingles",
    tipo: "ingles",
    titulo: "Inglês — Primeiras Palavras",
    descricao: "Aprenda cores, animais, números e cumprimentos em inglês!",
    emoji: "🇺🇸",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Vamos aprender palavras em inglês! Toque nos cartões e ouça como cada palavra soa!"
  },
  {
    id: "exp_ingles_corpo",
    tipo: "ingles",
    titulo: "Inglês — Corpo Humano",
    descricao: "Aprenda as partes do corpo humano em inglês!",
    emoji: "🧍",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Conheça o nome de cada parte do corpo em inglês! Toque nos cartões e repita em voz alta!",
    dados: {
      vocab_cats: [
        {
          id: "corpo",
          label: "Body Parts",
          emoji: "🧍"
        }
      ],
      vocab: {
        corpo: [
          {
            en: "Head",
            pt: "Cabeça",
            emoji: "🗣️"
          },
          {
            en: "Eye",
            pt: "Olho",
            emoji: "👁️"
          },
          {
            en: "Nose",
            pt: "Nariz",
            emoji: "👃"
          },
          {
            en: "Mouth",
            pt: "Boca",
            emoji: "👄"
          },
          {
            en: "Ear",
            pt: "Ouvido",
            emoji: "👂"
          },
          {
            en: "Hand",
            pt: "Mão",
            emoji: "🖐️"
          },
          {
            en: "Foot",
            pt: "Pé",
            emoji: "🦶"
          },
          {
            en: "Arm",
            pt: "Braço",
            emoji: "💪"
          },
          {
            en: "Leg",
            pt: "Perna",
            emoji: "🦵"
          },
          {
            en: "Hair",
            pt: "Cabelo",
            emoji: "💇"
          },
          {
            en: "Tooth",
            pt: "Dente",
            emoji: "🦷"
          },
          {
            en: "Finger",
            pt: "Dedo",
            emoji: "☝️"
          }
        ]
      }
    }
  },
  {
    id: "exp_ingles_comida",
    tipo: "ingles",
    titulo: "Inglês — Alimentos",
    descricao: "Aprenda os alimentos mais comuns em inglês!",
    emoji: "🍎",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Que fome! Aprenda o nome dos seus alimentos favoritos em inglês clicando em cada cartão!",
    dados: {
      vocab_cats: [
        {
          id: "frutas",
          label: "Fruits",
          emoji: "🍎"
        },
        {
          id: "comidas",
          label: "Food",
          emoji: "🍔"
        }
      ],
      vocab: {
        frutas: [
          {
            en: "Apple",
            pt: "Maçã",
            emoji: "🍎"
          },
          {
            en: "Banana",
            pt: "Banana",
            emoji: "🍌"
          },
          {
            en: "Orange",
            pt: "Laranja",
            emoji: "🍊"
          },
          {
            en: "Grape",
            pt: "Uva",
            emoji: "🍇"
          },
          {
            en: "Strawberry",
            pt: "Morango",
            emoji: "🍓"
          },
          {
            en: "Watermelon",
            pt: "Melancia",
            emoji: "🍉"
          }
        ],
        comidas: [
          {
            en: "Bread",
            pt: "Pão",
            emoji: "🍞"
          },
          {
            en: "Rice",
            pt: "Arroz",
            emoji: "🍚"
          },
          {
            en: "Egg",
            pt: "Ovo",
            emoji: "🥚"
          },
          {
            en: "Milk",
            pt: "Leite",
            emoji: "🥛"
          },
          {
            en: "Cake",
            pt: "Bolo",
            emoji: "🎂"
          },
          {
            en: "Soup",
            pt: "Sopa",
            emoji: "🍜"
          }
        ]
      }
    }
  },
  {
    id: "exp_ingles_roupas",
    tipo: "ingles",
    titulo: "Inglês — Roupas",
    descricao: "Aprenda o nome das roupas em inglês!",
    emoji: "👕",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Hora de montar o guarda-roupa em inglês! Toque em cada roupa para ouvir o nome!",
    dados: {
      vocab_cats: [
        {
          id: "roupas",
          label: "Clothes",
          emoji: "👕"
        }
      ],
      vocab: {
        roupas: [
          {
            en: "Shirt",
            pt: "Camiseta",
            emoji: "👕"
          },
          {
            en: "Pants",
            pt: "Calça",
            emoji: "👖"
          },
          {
            en: "Dress",
            pt: "Vestido",
            emoji: "👗"
          },
          {
            en: "Shoes",
            pt: "Sapatos",
            emoji: "👟"
          },
          {
            en: "Hat",
            pt: "Chapéu",
            emoji: "🎩"
          },
          {
            en: "Jacket",
            pt: "Jaqueta",
            emoji: "🧥"
          },
          {
            en: "Socks",
            pt: "Meias",
            emoji: "🧦"
          },
          {
            en: "Gloves",
            pt: "Luvas",
            emoji: "🧤"
          },
          {
            en: "Scarf",
            pt: "Cachecol",
            emoji: "🧣"
          },
          {
            en: "Boots",
            pt: "Botas",
            emoji: "👢"
          }
        ]
      }
    }
  },
  {
    id: "exp_ingles_casa",
    tipo: "ingles",
    titulo: "Inglês — Casa e Objetos",
    descricao: "Aprenda objetos de casa em inglês!",
    emoji: "🏠",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Bem-vindo à casa em inglês! Toque em cada objeto para aprender como se diz!",
    dados: {
      vocab_cats: [
        {
          id: "comodos",
          label: "Rooms",
          emoji: "🚪"
        },
        {
          id: "moveis",
          label: "Furniture",
          emoji: "🛋️"
        }
      ],
      vocab: {
        comodos: [
          {
            en: "Kitchen",
            pt: "Cozinha",
            emoji: "🍳"
          },
          {
            en: "Bedroom",
            pt: "Quarto",
            emoji: "🛏️"
          },
          {
            en: "Bathroom",
            pt: "Banheiro",
            emoji: "🚿"
          },
          {
            en: "Living Room",
            pt: "Sala",
            emoji: "🛋️"
          },
          {
            en: "Garden",
            pt: "Jardim",
            emoji: "🌳"
          }
        ],
        moveis: [
          {
            en: "Chair",
            pt: "Cadeira",
            emoji: "🪑"
          },
          {
            en: "Table",
            pt: "Mesa",
            emoji: "📋"
          },
          {
            en: "Bed",
            pt: "Cama",
            emoji: "🛏️"
          },
          {
            en: "Door",
            pt: "Porta",
            emoji: "🚪"
          },
          {
            en: "Window",
            pt: "Janela",
            emoji: "🪟"
          },
          {
            en: "Floor",
            pt: "Chão",
            emoji: "⬛"
          }
        ]
      }
    }
  },
  {
    id: "exp_ingles_tempo",
    tipo: "ingles",
    titulo: "Inglês — Tempo e Clima",
    descricao: "Aprenda as estações e condições climáticas em inglês!",
    emoji: "☀️",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Como está o tempo hoje? Aprenda a descrever o clima em inglês!",
    dados: {
      vocab_cats: [
        {
          id: "clima",
          label: "Weather",
          emoji: "🌤️"
        },
        {
          id: "estacoes",
          label: "Seasons",
          emoji: "🍂"
        }
      ],
      vocab: {
        clima: [
          {
            en: "Sunny",
            pt: "Ensolarado",
            emoji: "☀️"
          },
          {
            en: "Rainy",
            pt: "Chuvoso",
            emoji: "🌧️"
          },
          {
            en: "Cloudy",
            pt: "Nublado",
            emoji: "☁️"
          },
          {
            en: "Windy",
            pt: "Ventoso",
            emoji: "💨"
          },
          {
            en: "Snowy",
            pt: "Nevado",
            emoji: "❄️"
          },
          {
            en: "Foggy",
            pt: "Neblinoso",
            emoji: "🌫️"
          },
          {
            en: "Storm",
            pt: "Tempestade",
            emoji: "⛈️"
          }
        ],
        estacoes: [
          {
            en: "Spring",
            pt: "Primavera",
            emoji: "🌸"
          },
          {
            en: "Summer",
            pt: "Verão",
            emoji: "🌞"
          },
          {
            en: "Autumn",
            pt: "Outono",
            emoji: "🍁"
          },
          {
            en: "Winter",
            pt: "Inverno",
            emoji: "⛄"
          }
        ]
      }
    }
  },
  {
    id: "exp_ingles_escola",
    tipo: "ingles",
    titulo: "Inglês — Material Escolar",
    descricao: "Aprenda o nome dos materiais escolares em inglês!",
    emoji: "📚",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Sua mochila fala inglês! Aprenda o nome de cada material da sua escola!",
    dados: {
      vocab_cats: [
        {
          id: "escola",
          label: "School",
          emoji: "📚"
        }
      ],
      vocab: {
        escola: [
          {
            en: "Book",
            pt: "Livro",
            emoji: "📚"
          },
          {
            en: "Pen",
            pt: "Caneta",
            emoji: "✒️"
          },
          {
            en: "Pencil",
            pt: "Lápis",
            emoji: "✏️"
          },
          {
            en: "Ruler",
            pt: "Régua",
            emoji: "📏"
          },
          {
            en: "Eraser",
            pt: "Borracha",
            emoji: "🟪"
          },
          {
            en: "Scissors",
            pt: "Tesoura",
            emoji: "✂️"
          },
          {
            en: "Bag",
            pt: "Mochila",
            emoji: "🎒"
          },
          {
            en: "Board",
            pt: "Lousa",
            emoji: "📋"
          },
          {
            en: "Desk",
            pt: "Carteira",
            emoji: "🪑"
          },
          {
            en: "Paint",
            pt: "Tinta",
            emoji: "🎨"
          }
        ]
      }
    }
  },
  {
    id: "exp_ingles_natureza",
    tipo: "ingles",
    titulo: "Inglês — Natureza",
    descricao: "Aprenda palavras da natureza em inglês!",
    emoji: "🌿",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "A natureza tem muito a ensinar em inglês! Toque em cada cartão e explore!",
    dados: {
      vocab_cats: [
        {
          id: "natureza",
          label: "Nature",
          emoji: "🌿"
        }
      ],
      vocab: {
        natureza: [
          {
            en: "Tree",
            pt: "Árvore",
            emoji: "🌳"
          },
          {
            en: "Flower",
            pt: "Flor",
            emoji: "🌸"
          },
          {
            en: "River",
            pt: "Rio",
            emoji: "🏞️"
          },
          {
            en: "Mountain",
            pt: "Montanha",
            emoji: "⛰️"
          },
          {
            en: "Sea",
            pt: "Mar",
            emoji: "🌊"
          },
          {
            en: "Grass",
            pt: "Grama",
            emoji: "🌱"
          },
          {
            en: "Stone",
            pt: "Pedra",
            emoji: "🪨"
          },
          {
            en: "Sky",
            pt: "Céu",
            emoji: "🌌"
          },
          {
            en: "Star",
            pt: "Estrela",
            emoji: "⭐"
          },
          {
            en: "Moon",
            pt: "Lua",
            emoji: "🌙"
          },
          {
            en: "Rainbow",
            pt: "Arco-íris",
            emoji: "🌈"
          }
        ]
      }
    }
  },
  {
    id: "exp_ingles_familia",
    tipo: "ingles",
    titulo: "Inglês — Família",
    descricao: "Aprenda os membros da família em inglês!",
    emoji: "👨‍👩‍👧",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Apresente sua família em inglês! Aprenda o nome de cada membro da família!",
    dados: {
      vocab_cats: [
        {
          id: "familia",
          label: "Family",
          emoji: "👨‍👩‍👧"
        }
      ],
      vocab: {
        familia: [
          {
            en: "Mom",
            pt: "Mãe",
            emoji: "👩"
          },
          {
            en: "Dad",
            pt: "Pai",
            emoji: "👨"
          },
          {
            en: "Baby",
            pt: "Bebê",
            emoji: "👶"
          },
          {
            en: "Sister",
            pt: "Irmã",
            emoji: "👧"
          },
          {
            en: "Brother",
            pt: "Irmão",
            emoji: "👦"
          },
          {
            en: "Grandma",
            pt: "Vovó",
            emoji: "👵"
          },
          {
            en: "Grandpa",
            pt: "Vovô",
            emoji: "👴"
          },
          {
            en: "Uncle",
            pt: "Tio",
            emoji: "👨‍🦰"
          },
          {
            en: "Aunt",
            pt: "Tia",
            emoji: "👩‍🦰"
          },
          {
            en: "Cousin",
            pt: "Primo(a)",
            emoji: "🧑"
          }
        ]
      }
    }
  },
  {
    id: "exp_ingles_acoes",
    tipo: "ingles",
    titulo: "Inglês — Ações e Verbos",
    descricao: "Aprenda os verbos de ação mais usados em inglês!",
    emoji: "🏃",
    habilidade: "Inglês",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Os verbos são a energia da língua inglesa! Aprenda as ações essenciais!",
    dados: {
      vocab_cats: [
        {
          id: "acoes",
          label: "Actions",
          emoji: "🏃"
        }
      ],
      vocab: {
        acoes: [
          {
            en: "Run",
            pt: "Correr",
            emoji: "🏃"
          },
          {
            en: "Jump",
            pt: "Pular",
            emoji: "🦘"
          },
          {
            en: "Eat",
            pt: "Comer",
            emoji: "😋"
          },
          {
            en: "Sleep",
            pt: "Dormir",
            emoji: "😴"
          },
          {
            en: "Read",
            pt: "Ler",
            emoji: "📖"
          },
          {
            en: "Write",
            pt: "Escrever",
            emoji: "✍️"
          },
          {
            en: "Sing",
            pt: "Cantar",
            emoji: "🎤"
          },
          {
            en: "Dance",
            pt: "Dançar",
            emoji: "💃"
          },
          {
            en: "Play",
            pt: "Brincar",
            emoji: "🎮"
          },
          {
            en: "Swim",
            pt: "Nadar",
            emoji: "🏊"
          },
          {
            en: "Draw",
            pt: "Desenhar",
            emoji: "🖍️"
          }
        ]
      }
    }
  }
]

// ── Números ──
export const numerosExtraPorFaixa = [
  {
    id: "exp_numeros_animais",
    tipo: "numeros",
    titulo: "Contando Animais",
    descricao: "Aprenda os números de 1 a 10 contando animais!",
    emoji: "🐝",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "O parque dos animais abriu as portas! 🐝 Cada plaquinha mostra um número e um animal diferente. Toque no botão de som para aprender a contar com os bichinhos!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "🐝",
          cor: "#EF9F27"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🐞",
          cor: "#D85A30"
        },
        {
          n: 3,
          word: "Três",
          emoji: "🦋",
          cor: "#7F77DD"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "🐸",
          cor: "#1D9E75"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "🦁",
          cor: "#D4537E"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "🐘",
          cor: "#4F8EE8"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "🦒",
          cor: "#EF9F27"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "🐙",
          cor: "#D4537E"
        },
        {
          n: 9,
          word: "Nove",
          emoji: "🦈",
          cor: "#4F8EE8"
        },
        {
          n: 10,
          word: "Dez",
          emoji: "🐋",
          cor: "#1D9E75"
        }
      ]
    }
  },
  {
    id: "exp_numeros_frutas",
    tipo: "numeros",
    titulo: "Contando Frutas",
    descricao: "Aprenda os números de 1 a 10 com frutas deliciosas!",
    emoji: "🍎",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "A feirinha de frutas chegou! 🍎 Cada plaquinha tem um número e uma fruta colorida. Ouça como conta cada número e descubra quantas frutas há em cada grupo!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "🍎",
          cor: "#D85A30"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🍌",
          cor: "#EF9F27"
        },
        {
          n: 3,
          word: "Três",
          emoji: "🍇",
          cor: "#7F77DD"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "🍓",
          cor: "#D4537E"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "🥝",
          cor: "#1D9E75"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "🍊",
          cor: "#D85A30"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "🍋",
          cor: "#EF9F27"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "🍑",
          cor: "#D4537E"
        },
        {
          n: 9,
          word: "Nove",
          emoji: "🍍",
          cor: "#1D9E75"
        },
        {
          n: 10,
          word: "Dez",
          emoji: "🍉",
          cor: "#1D9E75"
        }
      ]
    }
  },
  {
    id: "exp_numeros_planetas",
    tipo: "numeros",
    titulo: "Planetas do Sistema Solar",
    descricao: "Conte os planetas do Sistema Solar!",
    emoji: "🪐",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "Uma viagem pelo espaço! 🪐 Cada número representa um planeta do nosso Sistema Solar. Clique em 🔊 e decole para o espaço!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "☀️",
          cor: "#EF9F27"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🪐",
          cor: "#D85A30"
        },
        {
          n: 3,
          word: "Três",
          emoji: "🌍",
          cor: "#1D9E75"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "🔴",
          cor: "#D4537E"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "⚪",
          cor: "#4F8EE8"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "💫",
          cor: "#EF9F27"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "🌀",
          cor: "#7F77DD"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "🌊",
          cor: "#4F8EE8"
        }
      ]
    }
  },
  {
    id: "exp_numeros_flores",
    tipo: "numeros",
    titulo: "Pétalas e Flores",
    descricao: "Conte pétalas e aprenda os números!",
    emoji: "🌸",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "O jardim florido abriu suas portas! 🌸 Cada flor tem um número especial de pétalas. Clique em 🔊 e explore!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "🌱",
          cor: "#1D9E75"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🌿",
          cor: "#388E3C"
        },
        {
          n: 3,
          word: "Três",
          emoji: "🌷",
          cor: "#D4537E"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "🍀",
          cor: "#2E7D32"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "🌸",
          cor: "#E91E8C"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "🌺",
          cor: "#D85A30"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "🌻",
          cor: "#FDD835"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "💐",
          cor: "#7F77DD"
        },
        {
          n: 9,
          word: "Nove",
          emoji: "🌼",
          cor: "#EF9F27"
        },
        {
          n: 10,
          word: "Dez",
          emoji: "🪷",
          cor: "#D4537E"
        }
      ]
    }
  },
  {
    id: "exp_numeros_estrelas",
    tipo: "numeros",
    titulo: "Estrelas e Espaço",
    descricao: "Conte estrelas e explore o universo!",
    emoji: "⭐",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "O observatório astronômico está aberto! ⭐ Cada número brilha no céu noturno. Clique em 🔊 e viaje pelo espaço!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "⭐",
          cor: "#EF9F27"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🌟",
          cor: "#FDD835"
        },
        {
          n: 3,
          word: "Três",
          emoji: "✨",
          cor: "#4F8EE8"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "💫",
          cor: "#7F77DD"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "🌙",
          cor: "#9E9D24"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "☀️",
          cor: "#D85A30"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "🌠",
          cor: "#D4537E"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "🔭",
          cor: "#1D9E75"
        },
        {
          n: 9,
          word: "Nove",
          emoji: "🌌",
          cor: "#283593"
        },
        {
          n: 10,
          word: "Dez",
          emoji: "🚀",
          cor: "#EF9F27"
        }
      ]
    }
  },
  {
    id: "exp_numeros_brinquedos",
    tipo: "numeros",
    titulo: "Brinquedos e Diversão",
    descricao: "Conte brinquedos e aprenda os números!",
    emoji: "🎮",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "A caixa de brinquedos está cheia! 🎮 Cada número tem um brinquedo especial esperando por você. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "🎀",
          cor: "#E91E8C"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🎲",
          cor: "#7F77DD"
        },
        {
          n: 3,
          word: "Três",
          emoji: "🪀",
          cor: "#D85A30"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "🎯",
          cor: "#C62828"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "🎮",
          cor: "#1565C0"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "🧩",
          cor: "#1D9E75"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "🪁",
          cor: "#EF9F27"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "🎸",
          cor: "#D4537E"
        },
        {
          n: 9,
          word: "Nove",
          emoji: "🎪",
          cor: "#7F77DD"
        },
        {
          n: 10,
          word: "Dez",
          emoji: "🎠",
          cor: "#E91E8C"
        }
      ]
    }
  },
  {
    id: "exp_numeros_instrumentos",
    tipo: "numeros",
    titulo: "Instrumentos Musicais",
    descricao: "Conte instrumentos e aprenda música e números!",
    emoji: "🎵",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "A orquestra infantil começou! 🎵 Cada número tem um instrumento musical. Clique em 🔊 e faça música!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "🥁",
          cor: "#D85A30"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🎷",
          cor: "#EF9F27"
        },
        {
          n: 3,
          word: "Três",
          emoji: "🎺",
          cor: "#EF9F27"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "🎸",
          cor: "#D4537E"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "🎹",
          cor: "#212121"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "🎻",
          cor: "#5D4037"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "🪘",
          cor: "#C62828"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "🪗",
          cor: "#1D9E75"
        },
        {
          n: 9,
          word: "Nove",
          emoji: "🎤",
          cor: "#7F77DD"
        },
        {
          n: 10,
          word: "Dez",
          emoji: "🎵",
          cor: "#4F8EE8"
        }
      ]
    }
  },
  {
    id: "exp_numeros_cores",
    tipo: "numeros",
    titulo: "Números Coloridos",
    descricao: "Cada número tem uma cor — aprenda contando cores!",
    emoji: "🌈",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "O arco-íris dos números chegou! 🌈 Cada número tem uma cor especial. Clique em 🔊 e veja como contar com as cores!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "🔴",
          cor: "#C62828"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🟠",
          cor: "#E65100"
        },
        {
          n: 3,
          word: "Três",
          emoji: "🟡",
          cor: "#F9A825"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "🟢",
          cor: "#2E7D32"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "🔵",
          cor: "#1565C0"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "🟣",
          cor: "#6A1B9A"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "⚫",
          cor: "#212121"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "⚪",
          cor: "#9E9E9E"
        },
        {
          n: 9,
          word: "Nove",
          emoji: "🟤",
          cor: "#5D4037"
        },
        {
          n: 10,
          word: "Dez",
          emoji: "🌈",
          cor: "#EF9F27"
        }
      ]
    }
  },
  {
    id: "exp_numeros_natureza2",
    tipo: "numeros",
    titulo: "Natureza em Números",
    descricao: "Os números que aparecem na natureza ao redor de você!",
    emoji: "🌊",
    habilidade: "Matemática",
    xp_reward: 70,
    coins_reward: 70,
    tempo_estimado: 10,
    historinha: "A natureza está cheia de números! 🌊 Do mar às montanhas, cada número tem um elemento natural. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 1,
          word: "Um",
          emoji: "🌊",
          cor: "#1565C0"
        },
        {
          n: 2,
          word: "Dois",
          emoji: "🏔️",
          cor: "#607D8B"
        },
        {
          n: 3,
          word: "Três",
          emoji: "🌋",
          cor: "#C62828"
        },
        {
          n: 4,
          word: "Quatro",
          emoji: "🌿",
          cor: "#2E7D32"
        },
        {
          n: 5,
          word: "Cinco",
          emoji: "☀️",
          cor: "#EF9F27"
        },
        {
          n: 6,
          word: "Seis",
          emoji: "🌙",
          cor: "#9E9D24"
        },
        {
          n: 7,
          word: "Sete",
          emoji: "⭐",
          cor: "#EF9F27"
        },
        {
          n: 8,
          word: "Oito",
          emoji: "❄️",
          cor: "#4F8EE8"
        },
        {
          n: 9,
          word: "Nove",
          emoji: "🌧️",
          cor: "#283593"
        },
        {
          n: 10,
          word: "Dez",
          emoji: "🌈",
          cor: "#D4537E"
        }
      ]
    }
  }
]

// ── Sílabas ──
export const silabasExtraPorFaixa = [
  {
    id: "exp_silabas",
    tipo: "silabas",
    titulo: "Sílabas: Palavras Simples",
    descricao: "Junte as sílabas e forme a palavra!",
    emoji: "🔡",
    habilidade: "Linguagem",
    xp_reward: 60,
    coins_reward: 60,
    tempo_estimado: 10,
    historinha: "As sílabas se espalharam e as palavras ficaram bagunçadas! 🔤 Toque nas sílabas na ordem certa para formar cada palavra.",
    dados: {
      palavras: [
        {
          id: "bola",
          palavra: "BOLA",
          silabas: ["BO", "LA"],
          emoji: "⚽"
        },
        {
          id: "casa",
          palavra: "CASA",
          silabas: ["CA", "SA"],
          emoji: "🏠"
        },
        {
          id: "sapo",
          palavra: "SAPO",
          silabas: ["SA", "PO"],
          emoji: "🐸"
        },
        {
          id: "mesa",
          palavra: "MESA",
          silabas: ["ME", "SA"],
          emoji: "🪑"
        },
        {
          id: "pato",
          palavra: "PATO",
          silabas: ["PA", "TO"],
          emoji: "🦆"
        },
        {
          id: "dedo",
          palavra: "DEDO",
          silabas: ["DE", "DO"],
          emoji: "👆"
        },
        {
          id: "gato",
          palavra: "GATO",
          silabas: ["GA", "TO"],
          emoji: "🐱"
        },
        {
          id: "bode",
          palavra: "BODE",
          silabas: ["BO", "DE"],
          emoji: "🐐"
        }
      ]
    }
  }
]
