// ──────────────────────────────────────────────────────────────────────
// ATIVIDADES EXTRA — INVENTORES (12–15 anos)
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
    id: "inv_alfabeto_tecnologia",
    tipo: "alfabeto",
    titulo: "Tecnologia de A a Z",
    descricao: "Os conceitos fundamentais da computação e tecnologia!",
    emoji: "💻",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 15,
    historinha: "A linguagem da tecnologia tem um termo essencial para cada letra! 💻 De Algoritmo a Zero-day, domine o vocabulário que move o mundo digital. Clique em 🔊!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Algoritmo",
          emoji: "💻",
          funfato: "Um algoritmo é uma receita passo a passo para resolver qualquer problema computacional!",
          detalhe: "Sequência finita de instruções | Complexidade O(n) | Dijkstra, Quicksort, FFT"
        },
        {
          letra: "B",
          palavra: "Bit",
          emoji: "💾",
          funfato: "Um bit é a menor unidade de informação — 0 ou 1, sim ou não!",
          detalhe: "Binary digit | 8 bits = 1 byte | Shannon 1948 | Transistor representa bit"
        },
        {
          letra: "C",
          palavra: "Compilador",
          emoji: "🖥️",
          funfato: "Um compilador traduz seu código para a linguagem que o processador entende!",
          detalhe: "Alto nível → código máquina | Lexer+Parser+Semântica+Geração | GCC, LLVM"
        },
        {
          letra: "D",
          palavra: "Deploy",
          emoji: "🚀",
          funfato: "Deploy é o processo de colocar um software no ar para que outras pessoas usem!",
          detalhe: "DevOps | CI/CD Pipeline | Docker containers | Blue-green deployment"
        },
        {
          letra: "E",
          palavra: "Encriptação",
          emoji: "🔐",
          funfato: "Encriptação embaralha dados para que só quem tem a chave certa possa ler!",
          detalhe: "AES (simétrica) | RSA (assimétrica) | SSL/TLS: HTTPS | Computação pós-quântica"
        },
        {
          letra: "F",
          palavra: "Framework",
          emoji: "🏗️",
          funfato: "Frameworks são coleções de código prontas que aceleram o desenvolvimento!",
          detalhe: "Inversion of Control | React, Angular (front) | Django, Laravel (back)"
        },
        {
          letra: "G",
          palavra: "GPU",
          emoji: "⚡",
          funfato: "A GPU foi criada para jogos, mas hoje é a peça mais importante para treinar IA!",
          detalhe: "Graphics Processing Unit | Paralelismo massivo (1000s cores) | CUDA | LLMs"
        },
        {
          letra: "H",
          palavra: "Hashing",
          emoji: "🔒",
          funfato: "Hashing transforma qualquer dado em um código de tamanho fixo — como uma impressão digital!",
          detalhe: "Função unidirecional | SHA-256 (Bitcoin) | Colisão | Armazenamento de senhas"
        },
        {
          letra: "I",
          palavra: "Interface",
          emoji: "🖱️",
          funfato: "Interface é tudo que permite que humanos e máquinas se comuniquem!",
          detalhe: "GUI, CLI, API, NLI | Fitts Law | Affordance | Nielsen: 10 heurísticas"
        },
        {
          letra: "J",
          palavra: "JSON",
          emoji: "📋",
          funfato: "JSON é o formato de dados mais usado na internet — leve e legível por humanos!",
          detalhe: "JavaScript Object Notation | Douglas Crockford 2001 | 96% APIs REST"
        },
        {
          letra: "K",
          palavra: "Kernel",
          emoji: "🧠",
          funfato: "O Kernel é o núcleo do sistema operacional — gerencia hardware e processos!",
          detalhe: "Ponte hardware-software | Monolítico (Linux) vs Microkernel | Linus Torvalds 1991"
        },
        {
          letra: "L",
          palavra: "Loop",
          emoji: "🔄",
          funfato: "Loops permitem que o computador repita tarefas bilhões de vezes em segundos!",
          detalhe: "for, while, do-while | Iteração | Loop infinito | 10⁹ operações/s (GHz)"
        },
        {
          letra: "M",
          palavra: "Machine Learning",
          emoji: "🤖",
          funfato: "Machine Learning permite que computadores aprendam sem serem explicitamente programados!",
          detalhe: "Treinamento com dados | Supervised/Unsupervised/RL | Redes neurais | Gradient Descent"
        },
        {
          letra: "N",
          palavra: "Nuvem",
          emoji: "☁️",
          funfato: "A nuvem é simplesmente computadores de outra pessoa — em datacenters ao redor do mundo!",
          detalhe: "IaaS/PaaS/SaaS | AWS, Azure, GCP | Elasticidade | Pay-per-use"
        },
        {
          letra: "O",
          palavra: "Open Source",
          emoji: "💻",
          funfato: "Open Source é software com código aberto — qualquer pessoa pode ver, usar e melhorar!",
          detalhe: "GNU GPL | Linus Torvalds: Linux (1991) | Apache, Python, VSCode: open source"
        },
        {
          letra: "P",
          palavra: "Protocolo",
          emoji: "📡",
          funfato: "Protocolos são as regras que permitem que computadores do mundo todo se entendam!",
          detalhe: "TCP/IP | HTTP(S) | DNS | SMTP | Berners-Lee: HTTP 1991 | WebSocket"
        },
        {
          letra: "Q",
          palavra: "Quântica",
          emoji: "⚛️",
          funfato: "Um computador quântico com 300 qubits representa mais estados que átomos no universo!",
          detalhe: "Qubit em superposição | Emaranhamento | Algoritmo de Shor | Google Sycamore (2019)"
        },
        {
          letra: "R",
          palavra: "Recursão",
          emoji: "🔄",
          funfato: "Recursão é quando uma função chama a si mesma para resolver problemas menores!",
          detalhe: "Caso base + Caso recursivo | Fatorial, Fibonacci | Stack Overflow sem caso base"
        },
        {
          letra: "S",
          palavra: "Socket",
          emoji: "🔌",
          funfato: "Sockets são as \"tomadas\" digitais que permitem programas se comunicarem pela rede!",
          detalhe: "IP + Porta | TCP (confiável) vs UDP (rápido) | WebSocket: tempo real"
        },
        {
          letra: "T",
          palavra: "Thread",
          emoji: "🧵",
          funfato: "Threads são linhas de execução paralelas dentro de um mesmo programa!",
          detalhe: "Processo leve | Mutex | Deadlock | Concorrência vs Paralelismo | async/await"
        },
        {
          letra: "U",
          palavra: "UI/UX",
          emoji: "🎨",
          funfato: "UI é como a interface parece; UX é como ela faz o usuário se sentir!",
          detalhe: "User Interface / User Experience | Nielsen Norman | A/B testing | Acessibilidade"
        },
        {
          letra: "V",
          palavra: "Virtualização",
          emoji: "💻",
          funfato: "Virtualização permite rodar vários sistemas operacionais em uma única máquina física!",
          detalhe: "Hypervisor Tipo 1 e 2 | VM vs Container | VMware 1998 | Docker 2013 | Kubernetes"
        },
        {
          letra: "W",
          palavra: "Wi-Fi",
          emoji: "📶",
          funfato: "Wi-Fi usa ondas de rádio para transmitir dados pelo ar — como o radar!",
          detalhe: "IEEE 802.11 | 2.4GHz e 5GHz | Wi-Fi 6: 9.6 Gbps | OFDM | WPA3 (segurança)"
        },
        {
          letra: "X",
          palavra: "XML",
          emoji: "📄",
          funfato: "XML é uma linguagem de marcação para armazenar e transportar dados de forma estruturada!",
          detalhe: "eXtensible Markup Language | W3C 1998 | SVG, XHTML, RSS são XML | DOM"
        },
        {
          letra: "Y",
          palavra: "YAML",
          emoji: "⚙️",
          funfato: "YAML é uma forma de escrever configurações que é fácil de ler por humanos!",
          detalhe: "YAML Ain't Markup Language | Indentação como estrutura | Docker Compose, Kubernetes"
        },
        {
          letra: "Z",
          palavra: "Zero-day",
          emoji: "🛡️",
          funfato: "Zero-day é uma vulnerabilidade de segurança que ninguém conhece — exceto os hackers!",
          detalhe: "Vulnerabilidade não-conhecida | 0 dias para patch | Stuxnet (2010) | Bug bounty"
        }
      ]
    }
  },
  {
    id: "inv_alfabeto_fisica",
    tipo: "alfabeto",
    titulo: "Física Avançada de A a Z",
    descricao: "Conceitos de física de ponta para cada letra!",
    emoji: "⚛️",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 18,
    historinha: "A física tem um conceito revolucionário para cada letra! ⚛️ Clique em 🔊 e desvende os mistérios do universo!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Antimáteria",
          emoji: "✨",
          funfato: "Cada partícula tem uma antipartícula — e se se tocarem, ambas se aniquilam virando energia!",
          detalhe: "Dirac 1928 | Pósitron (Anderson 1932) | Big Bang: matéria venceu | PET scan"
        },
        {
          letra: "B",
          palavra: "Bóson-de-Higgs",
          emoji: "✨",
          funfato: "O Bóson de Higgs é o que dá massa às partículas — chamado de \"partícula de Deus\"!",
          detalhe: "Peter Higgs 1964 | CERN LHC 2012 | Campo de Higgs | Nobel 2013"
        },
        {
          letra: "C",
          palavra: "Casimir-Efeito",
          emoji: "🔬",
          funfato: "Duas placas de metal no vácuo se atraem por força do nada — energia do vácuo quântico!",
          detalhe: "Hendrik Casimir 1948 | Flutuações quânticas do vácuo | Verificado 1997"
        },
        {
          letra: "D",
          palavra: "Dualidade-Onda-Partícula",
          emoji: "🌊",
          funfato: "Um elétron é onda e partícula ao mesmo tempo — até você observar, e ele \"escolhe\"!",
          detalhe: "De Broglie 1924 | Experimento dupla fenda | Colapso da função de onda | Quântica"
        },
        {
          letra: "E",
          palavra: "Entropia",
          emoji: "🌀",
          funfato: "A entropia sempre aumenta — o universo caminha inevitavelmente para a desordem!",
          detalhe: "2ª Lei da Termodinâmica | Boltzmann: S=k×lnΩ | Seta do tempo | Morte térmica"
        },
        {
          letra: "F",
          palavra: "Fusão-Nuclear",
          emoji: "☀️",
          funfato: "O sol funciona por fusão nuclear — e cientistas tentam replicá-la há 70 anos para energia limpa!",
          detalhe: "H+H → He + energia | ITER: 15Mi°C | 2022: gain > 1 (NIF) | Plasma"
        },
        {
          letra: "G",
          palavra: "Gravitação-Quântica",
          emoji: "🌌",
          funfato: "Ninguém ainda sabe como unir Relatividade Geral com Mecânica Quântica — o maior problema da física!",
          detalhe: "Incompatibilidade | Teoria de Cordas | Loop QG | Graviton: não detectado"
        },
        {
          letra: "H",
          palavra: "Hawking-Radiação",
          emoji: "⬛",
          funfato: "Hawking provou matematicamente que buracos negros evaporam aos poucos — e morreram de fome!",
          detalhe: "Stephen Hawking 1974 | Par virtual + horizonte de eventos | Evaporação lenta"
        },
        {
          letra: "I",
          palavra: "Interferometria",
          emoji: "🔭",
          funfato: "O LIGO detectou ondas gravitacionais que distorciam o espaço menos que 1/1.000 de um próton!",
          detalhe: "LIGO 2015 | GW150914 | 10^-18m precisão | Nobel 2017 | Espelhos a 4km"
        },
        {
          letra: "J",
          palavra: "Jatos-Relativísticos",
          emoji: "🌌",
          funfato: "Buracos negros ativos disparam jatos de plasma a 99,9% da velocidade da luz!",
          detalhe: "AGN | Blazars | Magnetar | 3C 273 | Efeito Doppler relativístico"
        },
        {
          letra: "K",
          palavra: "KT-Extinção",
          emoji: "☄️",
          funfato: "O impacto que matou os dinossauros liberou energia de um bilhão de bombas nucleares!",
          detalhe: "Chicxulub 66Ma | Luís Álvarez: irídio | 10km | KT boundary | Inverno de impacto"
        },
        {
          letra: "L",
          palavra: "Laser-de-Gravitação",
          emoji: "🔭",
          funfato: "Cientistas usam lasers ultrafinos para detectar variações no espaço-tempo de 10^-21 metros!",
          detalhe: "LIGO-Virgo-KAGRA | Fabry-Pérot cavity | Squeezed light | Quantum noise"
        },
        {
          letra: "M",
          palavra: "Matéria-Escura",
          emoji: "🌑",
          funfato: "Matéria escura é 27% do universo — mas nunca foi detectada diretamente!",
          detalhe: "Fritz Zwicky 1933 | Curvas de rotação (Rubin) | WIMPs? Axions? | Invisível"
        },
        {
          letra: "N",
          palavra: "Neutrino",
          emoji: "⚡",
          funfato: "Neutrinos atravessam a Terra inteira como se ela não existisse — trilhões passam por você agora!",
          detalhe: "Pauli 1930 | Quase sem massa | 6×10¹⁰/cm²/s do sol | Oscilação: Nobel 2015"
        },
        {
          letra: "O",
          palavra: "Ondas-Gravitacionais",
          emoji: "🌊",
          funfato: "Duas estrelas de nêutrons colidindo criam ondas no espaço-tempo detectáveis a bilhões de anos-luz!",
          detalhe: "Einstein 1916 (previsão) | LIGO 2015 (detecção) | Chirp | Espiral interna"
        },
        {
          letra: "P",
          palavra: "Princípio-da-Incerteza",
          emoji: "❓",
          funfato: "Heisenberg provou que é impossível saber posição e velocidade de um elétron ao mesmo tempo!",
          detalhe: "Werner Heisenberg 1927 | Δx·Δp ≥ ℏ/2 | Não é imprecisão: é natureza"
        },
        {
          letra: "Q",
          palavra: "Quark",
          emoji: "⚛️",
          funfato: "Um próton é feito de 3 quarks — mas a massa deles explica apenas 1% da massa do próton!",
          detalhe: "Murray Gell-Mann 1964 | 6 sabores: up, down, charm, strange, top, bottom | QCD"
        },
        {
          letra: "R",
          palavra: "Relatividade",
          emoji: "🌌",
          funfato: "Einstein provou que o tempo passa mais devagar para quem se move rápido ou está perto de massa!",
          detalhe: "Einstein 1905 (RE) + 1915 (RG) | E=mc² | GPS: correção relativística"
        },
        {
          letra: "S",
          palavra: "Supercondutividade",
          emoji: "🔵",
          funfato: "Supercondutores transmitem eletricidade com ZERO resistência — abaixo de temperatura crítica!",
          detalhe: "Kamerlingh Onnes 1911 | BCS (Cooper pairs) | Tc < 133K | MRI, Maglev"
        },
        {
          letra: "T",
          palavra: "Teoria-das-Cordas",
          emoji: "🎵",
          funfato: "A teoria das cordas propõe que partículas são \"cordas\" vibrando em 11 dimensões!",
          detalhe: "11 dimensões | Superstrings | M-teoria | Não testável ainda | Paisagem"
        },
        {
          letra: "U",
          palavra: "Universo-Multiverso",
          emoji: "🌌",
          funfato: "A interpretação de muitos mundos da quântica diz que toda decisão cria universos paralelos!",
          detalhe: "Hugh Everett 1957 | Inflação eterna | Universo bolha | Não testável"
        },
        {
          letra: "V",
          palavra: "Velocidade-da-Luz",
          emoji: "💡",
          funfato: "A luz percorre 300.000 km por segundo — uma volta na Terra em 0,13 segundos!",
          detalhe: "c = 299.792.458 m/s | Rømer 1676 | Michelson-Morley 1887 | Limite absoluto"
        },
        {
          letra: "W",
          palavra: "WIMP",
          emoji: "🌑",
          funfato: "WIMPs são os candidatos a matéria escura — mas experimentos cada vez mais sensíveis não os acham!",
          detalhe: "Weakly Interacting Massive Particle | LUX, XENON1T, PandaX | Exclusão"
        },
        {
          letra: "X",
          palavra: "X-ray-Binária",
          emoji: "🌟",
          funfato: "Estrelas binárias de raios-X são pares onde um buraco negro devora a estrela parceira!",
          detalhe: "Cygnus X-1 | Acreção | Disco de acreção | Raios-X emitidos | 1972 descoberta"
        },
        {
          letra: "Y",
          palavra: "Yukawa-Potencial",
          emoji: "⚛️",
          funfato: "Yukawa previu o méson como portador da força nuclear forte — antes de ele ser descoberto!",
          detalhe: "Hideki Yukawa 1935 | Nobel 1949 | Píon descoberto 1947 | Força forte: 100× EM"
        },
        {
          letra: "Z",
          palavra: "Zwicky-Galaxias",
          emoji: "🌌",
          funfato: "Zwicky percebeu em 1933 que galáxias se movem como se houvesse matéria invisível — matéria escura!",
          detalhe: "Fritz Zwicky 1933 | Aglomerado de Coma | \"Dunkle Materie\" | Desconsiderado 30 anos"
        }
      ]
    }
  },
  {
    id: "inv_alfabeto_filosofia_av",
    tipo: "alfabeto",
    titulo: "Filosofia Avançada de A a Z",
    descricao: "Os conceitos filosóficos mais profundos para cada letra!",
    emoji: "🔭",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 18,
    historinha: "A filosofia mais avançada tem um conceito transformador para cada letra! 🔭 Clique em 🔊 e questione tudo!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Alteridade",
          emoji: "🤝",
          funfato: "Lévinas disse que a ética começa no rosto do outro — no reconhecer que ele existe!",
          detalhe: "Emmanuel Lévinas | \"O rosto do outro\" | Responsabilidade antes da liberdade"
        },
        {
          letra: "B",
          palavra: "Bioética",
          emoji: "⚕️",
          funfato: "CRISPR levanta questões que filósofos debatem: é ético editar o DNA de humanos?",
          detalhe: "Autonomia | Beneficência | Não-maleficência | Justiça | Beauchamp e Childress"
        },
        {
          letra: "C",
          palavra: "Compatibilismo",
          emoji: "🔗",
          funfato: "O compatibilismo diz que o livre-arbítrio pode coexistir com o determinismo!",
          detalhe: "Daniel Dennett | \"Liberdade que importa\" | Determinismo ≠ fatalismo"
        },
        {
          letra: "D",
          palavra: "Desconstrução",
          emoji: "🔨",
          funfato: "Derrida desconstruiu textos mostrando que todo significado é instável e contextual!",
          detalhe: "Jacques Derrida | Differance | Logocentrismo | Pós-estruturalismo"
        },
        {
          letra: "E",
          palavra: "Emergência",
          emoji: "🌊",
          funfato: "A consciência pode ser uma propriedade emergente do cérebro — como a umidade é da água!",
          detalhe: "Propriedade emergente | Reducionismo vs Holismo | Searle vs Dennett"
        },
        {
          letra: "F",
          palavra: "Foucault",
          emoji: "🔍",
          funfato: "Foucault mostrou que prisões, hospitais e escolas são formas de disciplinar corpos e mentes!",
          detalhe: "Michel Foucault | Vigiar e Punir | Biopoder | Arqueologia do saber"
        },
        {
          letra: "G",
          palavra: "Giro-Linguístico",
          emoji: "💬",
          funfato: "O giro linguístico afirma que não acessamos a realidade diretamente — só pela linguagem!",
          detalhe: "Wittgenstein | Jogos de linguagem | Heidegger: \"linguagem é a casa do ser\""
        },
        {
          letra: "H",
          palavra: "Hermenêutica-Crítica",
          emoji: "📖",
          funfato: "Habermas quer uma hermenêutica que liberte — não apenas interprete, mas emancipe!",
          detalhe: "Jürgen Habermas | Teoria Crítica | Frankfurt | Razão comunicativa"
        },
        {
          letra: "I",
          palavra: "Intersubjetividade",
          emoji: "🤝",
          funfato: "A intersubjetividade é a base da realidade social — só existe porque concordamos!",
          detalhe: "Husserl | Habermas | Realidade = acordo entre subjetividades | Verdade social"
        },
        {
          letra: "J",
          palavra: "Justiça-Global",
          emoji: "🌍",
          funfato: "Pogge pergunta: os ricos têm obrigação de reparar a pobreza global que ajudaram a criar?",
          detalhe: "Thomas Pogge | Rawls global | Cosmopolitismo | Ordem institucional injusta"
        },
        {
          letra: "K",
          palavra: "Kuhn-Paradigma",
          emoji: "🔬",
          funfato: "Kuhn mostrou que a ciência não avança gradualmente — ela muda de paradigma em revoluções!",
          detalhe: "Thomas Kuhn 1962 | Estrutura das Revoluções | Ciência normal + anomalia + crise"
        },
        {
          letra: "L",
          palavra: "Liberalismo-Político",
          emoji: "⚖️",
          funfato: "O liberalismo político de Rawls propõe que princípios de justiça devem ser aceitáveis por todos!",
          detalhe: "Rawls \"Political Liberalism\" | Razão pública | Sobreposição de consenso"
        },
        {
          letra: "M",
          palavra: "Moral-Realism",
          emoji: "⭐",
          funfato: "Moral realistas argumentam que \"tortura é errada\" é tão verdadeiro quanto \"água é H₂O\"!",
          detalhe: "Derek Parfit | Parfit: \"On What Matters\" | Razões objetivas | Vs relativismo"
        },
        {
          letra: "N",
          palavra: "Neo-Pragmatismo",
          emoji: "🔧",
          funfato: "Rorty dizia: a verdade não é uma \"cópia\" da realidade — é o que nos ajuda a seguir em frente!",
          detalhe: "Richard Rorty | \"A Filosofia e o Espelho da Natureza\" | Vocabulários finais"
        },
        {
          letra: "O",
          palavra: "Ontologia-Fundamental",
          emoji: "🌌",
          funfato: "Heidegger perguntava: por que há algo ao invés de nada? — a mais profunda questão!",
          detalhe: "Heidegger | Ser e Tempo | Dasein | Angústia | Ser-no-mundo | Onto-teologia"
        },
        {
          letra: "P",
          palavra: "Pós-Humanismo",
          emoji: "🤖",
          funfato: "O pós-humanismo questiona o que nos torna humanos quando há cyborgs e IA!",
          detalhe: "Donna Haraway | Cyborg Manifesto | Transhumanismo | Nick Bostrom | Superinteligência"
        },
        {
          letra: "Q",
          palavra: "Qualia-Hard-Problem",
          emoji: "🌈",
          funfato: "Por que sentimos a dor da dor — e não apenas processamos informação de dano?",
          detalhe: "David Chalmers | Problema difícil vs fácil da consciência | Zumbi filosófico"
        },
        {
          letra: "R",
          palavra: "Realismo-Científico",
          emoji: "🔬",
          funfato: "O realismo científico afirma que teorias são aproximações da realidade — não apenas instrumentos!",
          detalhe: "Stathis Psillos | Convergência | Underdetermination (Duhem-Quine)"
        },
        {
          letra: "S",
          palavra: "Sobre-determinação",
          emoji: "🔗",
          funfato: "A sobredeterminação mostra que um evento pode ter múltiplas causas suficientes ao mesmo tempo!",
          detalhe: "Problema da causalidade mental | Kim: exclusão causal | Davidson: anomalismo"
        },
        {
          letra: "T",
          palavra: "Teoria-Crítica",
          emoji: "✊",
          funfato: "A Escola de Frankfurt usou Marx + Freud para criticar a cultura de massa e o capitalismo!",
          detalhe: "Horkheimer, Adorno, Benjamin, Marcuse, Habermas | Dialética do Esclarecimento"
        },
        {
          letra: "U",
          palavra: "Utilitarismo-Efetivo",
          emoji: "📊",
          funfato: "O altruísmo efetivo aplica utilitarismo rigoroso: como maximizar o bem com seus recursos?",
          detalhe: "Peter Singer | GiveWell | Comparação imparcial | QALY | Doações estratégicas"
        },
        {
          letra: "V",
          palavra: "Vontade-de-Potência",
          emoji: "⚡",
          funfato: "A vontade de potência de Nietzsche não é dominação — é criação e auto-superação!",
          detalhe: "Friedrich Nietzsche | Auto-superação | Übermensch | Além do Bem e do Mal"
        },
        {
          letra: "W",
          palavra: "Wittgenstein-Tardio",
          emoji: "🎮",
          funfato: "Wittgenstein mostrou que muitos problemas filosóficos são confusões de linguagem!",
          detalhe: "Investigações Filosóficas | Jogos de linguagem | \"A filosofia deixa tudo como está\""
        },
        {
          letra: "X",
          palavra: "Xenofobia-Filosófica",
          emoji: "❌",
          funfato: "Filósofos como Derrida estudaram a hospitalidade — a tensão entre acolher e excluir o estranho!",
          detalhe: "Derrida: \"Da Hospitalidade\" | Hostis = estrangeiro + inimigo | Kant: hospitalidade"
        },
        {
          letra: "Y",
          palavra: "Yoga-Filosofia",
          emoji: "☯️",
          funfato: "O Yoga é uma das 6 escolas ortodoxas da filosofia indiana — muito mais que exercício físico!",
          detalhe: "Patañjali: Yoga Sutras séc. II | Samkhya + Yoga | Ashtanga: 8 membros | Moksha"
        },
        {
          letra: "Z",
          palavra: "Zhuangzi",
          emoji: "🦋",
          funfato: "Zhuangzi sonhou que era uma borboleta — e ao acordar não sabia se era homem que sonhara ser borboleta!",
          detalhe: "Taoísmo | Zhuangzi séc. IV a.C. | Perspectivismo | Wu wei | Natureza"
        }
      ]
    }
  },
  {
    id: "inv_alfabeto_economia",
    tipo: "alfabeto",
    titulo: "Economia de A a Z",
    descricao: "Um conceito econômico essencial para cada letra!",
    emoji: "📈",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 18,
    historinha: "A economia move o mundo — e tem um conceito para cada letra do alfabeto! 📈 Clique em 🔊 e entenda como o dinheiro funciona!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Assimetria-de-Informação",
          emoji: "📊",
          funfato: "Akerlof mostrou que mercados falham quando compradores sabem menos que vendedores — carros usados!",
          detalhe: "George Akerlof Nobel 2001 | \"Market for Lemons\" | Seleção adversa | Moral hazard"
        },
        {
          letra: "B",
          palavra: "Banco-Central",
          emoji: "🏦",
          funfato: "O Banco Central pode criar dinheiro do nada — literalmente digitando em um computador!",
          detalhe: "Reserva fracionária | Quantitative Easing | Taxa SELIC | Inflação meta"
        },
        {
          letra: "C",
          palavra: "Curva-de-Laffer",
          emoji: "📈",
          funfato: "A Curva de Laffer diz que um imposto de 100% arrecada ZERO — porque ninguém trabalha!",
          detalhe: "Arthur Laffer 1974 | Guardanapo de Reagan | Imposto ótimo | Curvilinear"
        },
        {
          letra: "D",
          palavra: "Deflação",
          emoji: "📉",
          funfato: "A deflação parece boa mas é perigosa — as pessoas param de comprar esperando preços menores!",
          detalhe: "Preços caindo | Espiral deflacionária (Fisher) | Japão 1990s | Armadilha de liquidez"
        },
        {
          letra: "E",
          palavra: "Elasticidade",
          emoji: "🎯",
          funfato: "Cigarros têm elasticidade baixa — mesmo se o preço sobe muito, os fumantes continuam comprando!",
          detalhe: "Preço/quantidade | Inelástico: < 1 | Elástico: > 1 | Preço × elasticidade"
        },
        {
          letra: "F",
          palavra: "Fed",
          emoji: "🏛️",
          funfato: "O Federal Reserve americano controla a taxa de juros que afeta TODA a economia mundial!",
          detalhe: "Federal Reserve 1913 | 12 distritos | Taxa Fed Funds | Dual mandate: emprego+inflação"
        },
        {
          letra: "G",
          palavra: "GDP-PIB",
          emoji: "📊",
          funfato: "O PIB não conta trabalho doméstico, voluntariado ou felicidade — apenas transações monetárias!",
          detalhe: "Simon Kuznets 1934 | C+I+G+(X-M) | GNP vs GDP | Crítica: BNB Butão"
        },
        {
          letra: "H",
          palavra: "Hiperinflação",
          emoji: "💸",
          funfato: "Na Alemanha de 1923, um pão custava 200 bilhões de marcos — o salário precisava ser pago 2× ao dia!",
          detalhe: "Weimar 1923 | Zimbábue 2008: 89,7 sextilhões% | Wheelbarrow | Perda de confiança"
        },
        {
          letra: "I",
          palavra: "Imperialismo-Econômico",
          emoji: "🌍",
          funfato: "Países ricos cobram dívidas que os colonizadores criaram — e isso mantém o ciclo!",
          detalhe: "Estruturalismo | CEPAL | Dependência | Wallerstein: sistema-mundo | Prebisch"
        },
        {
          letra: "J",
          palavra: "Juros-de-Mercado",
          emoji: "💰",
          funfato: "O Brasil teve as maiores taxas de juros reais do mundo por décadas — até recentemente!",
          detalhe: "Taxa real = nominal - inflação | SELIC | Spread bancário | Basileia III"
        },
        {
          letra: "K",
          palavra: "Keynesianismo",
          emoji: "🏗️",
          funfato: "Keynes dizia: em crises, o governo deve gastar mesmo com déficit — para criar empregos!",
          detalhe: "John Maynard Keynes | New Deal | Multiplicador fiscal | Demanda agregada"
        },
        {
          letra: "L",
          palavra: "Liquidez",
          emoji: "💧",
          funfato: "Na crise de 2008, bancos pararam de emprestar entre si porque não confiavam uns nos outros!",
          detalhe: "Capacidade de converter em dinheiro | M0, M1, M2, M3 | Crise de liquidez 2008"
        },
        {
          letra: "M",
          palavra: "Microeconomia",
          emoji: "🔬",
          funfato: "A microeconomia usa matemática avançada para prever como uma única pessoa decide!",
          detalhe: "Marshall | Curva de demanda/oferta | Utilidade marginal | Equilíbrio de Nash"
        },
        {
          letra: "N",
          palavra: "Nash-Equilíbrio",
          emoji: "♟️",
          funfato: "John Nash ganhou o Nobel com a teoria: as pessoas agem no seu melhor interesse DADO o que os outros fazem!",
          detalhe: "John Nash 1994 Nobel | Jogo: melhor resposta | Dilema do prisioneiro"
        },
        {
          letra: "O",
          palavra: "Oligopólio",
          emoji: "🏭",
          funfato: "Poucos supermercados controlam a maioria do varejo — e formam cartel silencioso de preços!",
          detalhe: "Poucos ofertantes | Conluio tácito | Liderança de preço | CADE: antitruste"
        },
        {
          letra: "P",
          palavra: "PIB-Verde",
          emoji: "🌿",
          funfato: "O PIB Verde subtrai a degradação ambiental da riqueza — e países ricos ficam menos ricos!",
          detalhe: "OECD | Contabilidade ambiental | Capital natural | \"Capital verde\" de Stiglitz"
        },
        {
          letra: "Q",
          palavra: "Quantitative-Easing",
          emoji: "💻",
          funfato: "O Fed criou US$4 trilhões do nada após 2008 — o maior experimento monetário da história!",
          detalhe: "Ben Bernanke | Compra de ativos | Expansão do balanço | Helicopter money"
        },
        {
          letra: "R",
          palavra: "Renda-Básica-Universal",
          emoji: "💸",
          funfato: "Milton Friedman (liberal) e Martin Luther King (progressista) ambos apoiavam renda básica!",
          detalhe: "UBI | Finlândia 2017-18 | Namíbia 2008-09 | Thomas Paine 1797 | IA e trabalho"
        },
        {
          letra: "S",
          palavra: "Stagflação",
          emoji: "⬆️",
          funfato: "Stagflação é a pior combinação: inflação alta + desemprego alto ao mesmo tempo!",
          detalhe: "USA 1970s | Crise do petróleo | Curva de Phillips quebrou | Friedman previu"
        },
        {
          letra: "T",
          palavra: "Taxa-de-Câmbio",
          emoji: "💱",
          funfato: "O dólar foi atrelado ao ouro até 1971 — Nixon o desatrelou e mudou a economia global!",
          detalhe: "Bretton Woods→Nixon Shock 1971 | Câmbio flutuante | Reservas internacionais"
        },
        {
          letra: "U",
          palavra: "Utilidade-Marginal",
          emoji: "📊",
          funfato: "O primeiro sorvete é delicioso; o 10° já enjoa — isso é utilidade marginal decrescente!",
          detalhe: "Jevons, Menger, Walras | Revolução Marginalista 1870 | MU = dU/dQ"
        },
        {
          letra: "V",
          palavra: "Veblen-Bem",
          emoji: "💎",
          funfato: "Bens Veblen ficam mais desejados quando mais caros — como bolsas Hermès e Rolex!",
          detalhe: "Thorstein Veblen | \"Conspicuous consumption\" | Curva de demanda positiva"
        },
        {
          letra: "W",
          palavra: "Washington-Consensus",
          emoji: "🌎",
          funfato: "O \"Consenso de Washington\" impôs privatizações e ajuste fiscal ao mundo em desenvolvimento!",
          detalhe: "John Williamson 1989 | FMI + Banco Mundial | Neoliberalismo | Stiglitz: crítica"
        },
        {
          letra: "X",
          palavra: "Xenodóquio-Econômico",
          emoji: "✈️",
          funfato: "O turismo é a maior indústria do mundo — 10% do PIB global em 2019!",
          detalhe: "UNWTO | US$9,2 trilhões 2019 | 334Mi empregos | Efeito multiplicador local"
        },
        {
          letra: "Y",
          palavra: "Yield-Curve",
          emoji: "📉",
          funfato: "Quando a curva de juros se inverte, 7 das últimas 10 recessões americanas aconteceram depois!",
          detalhe: "Títulos curto vs longo prazo | Inversão: sinal de recessão | Fed 2022-23"
        },
        {
          letra: "Z",
          palavra: "Zero-Sum-Game",
          emoji: "♟️",
          funfato: "Em jogo de soma zero, o que um ganha, o outro perde — ao contrário do comércio livre!",
          detalhe: "Teoria dos jogos | Win-win vs zero-sum | Protecionismo vs livre-comércio"
        }
      ]
    }
  },
  {
    id: "inv_alfabeto_linguistica",
    tipo: "alfabeto",
    titulo: "Linguística de A a Z",
    descricao: "Um conceito linguístico fascinante para cada letra!",
    emoji: "💬",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 18,
    historinha: "A linguística desvenda os mistérios da linguagem humana! 💬 Clique em 🔊 e explore a ciência das palavras!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Aquisição",
          emoji: "👶",
          funfato: "Chomsky descobriu que crianças aprendem idiomas muito além do que lhes ensinam — gramática inata!",
          detalhe: "Noam Chomsky | Gramática Universal | Período crítico | LAD | Pobreza do estímulo"
        },
        {
          letra: "B",
          palavra: "Bilinguismo",
          emoji: "🌎",
          funfato: "Bilíngues têm início do Alzheimer 4-5 anos mais tarde que monolíngues!",
          detalhe: "Bialystok | Reserva cognitiva | Code-switching | L1 vs L2 | Vantagem executiva"
        },
        {
          letra: "C",
          palavra: "Crioulização",
          emoji: "🌴",
          funfato: "O crioulo haitiano é uma língua nova criada por escravizados misturando várias línguas!",
          detalhe: "Pidgin → Crioulo | Nativização | Sranan (Suriname) | Papiamento | Complexidade"
        },
        {
          letra: "D",
          palavra: "Dialetologia",
          emoji: "🗺️",
          funfato: "No Brasil, \"tchê\" identifica o Rio Grande do Sul como \"ô\" identifica Minas Gerais!",
          detalhe: "Variação regional | Isoglossas | Atlas Linguístico | Dialeto vs Socioleto"
        },
        {
          letra: "E",
          palavra: "Etimologia",
          emoji: "📚",
          funfato: "A palavra \"escola\" vem do grego \"skholê\" que significa lazer — aprender era diversão!",
          detalhe: "Origem das palavras | Cognatos | Latim → Romance | Indo-europeu: proto-língua"
        },
        {
          letra: "F",
          palavra: "Fonema",
          emoji: "🔊",
          funfato: "Português tem 33 fonemas — e cada língua usa um conjunto diferente de sons possíveis!",
          detalhe: "Unidade mínima sonora | /p/ vs /b/ = minimal pair | IPA: 107 fonemas básicos"
        },
        {
          letra: "G",
          palavra: "Gramaticalização",
          emoji: "⏳",
          funfato: "A palavra inglesa \"will\" (querer) virou auxiliar de futuro — e continua mudando!",
          detalhe: "Gramaticalização | Bleaching semântico | \"ir + infinitivo\" → futuro | Diacronia"
        },
        {
          letra: "H",
          palavra: "Hipótese-Sapir-Whorf",
          emoji: "💭",
          funfato: "A língua Hopi não tem tempo verbal — e isso mudaria como seus falantes percebem o tempo?",
          detalhe: "Relativismo linguístico | Whorfianismo | Débil (maioria aceita) vs Forte (polêmico)"
        },
        {
          letra: "I",
          palavra: "Indo-Europeu",
          emoji: "🌍",
          funfato: "Português, inglês, hindi, russo e persa vêm de uma mesma língua de 6.000 anos atrás!",
          detalhe: "PIE: Proto-Indo-Europeu | 3Bi falantes | Sir William Jones 1786 | Reconstrução"
        },
        {
          letra: "J",
          palavra: "Jargão",
          emoji: "💼",
          funfato: "Cada profissão cria seu jargão — e quem não é da área não entende nada!",
          detalhe: "Linguagem especializada | Opacidade intencional | Médico, jurídico, tech | LSP"
        },
        {
          letra: "K",
          palavra: "Kinesics",
          emoji: "🤸",
          funfato: "Ray Birdwhistell descobriu que 65% da comunicação é não-verbal — gestos, postura, rosto!",
          detalhe: "Ray Birdwhistell | Comunicação não-verbal | Proxêmica (Hall) | Paralinguística"
        },
        {
          letra: "L",
          palavra: "Língua-de-Sinais",
          emoji: "🤟",
          funfato: "Libras é uma língua completa e complexa — e pesquisas provam que ativa as mesmas áreas do cérebro!",
          detalhe: "Língua natural | Área de Broca | Stokoe 1960 | 300 línguas de sinais no mundo"
        },
        {
          letra: "M",
          palavra: "Morfema",
          emoji: "🔤",
          funfato: "O menor pedaço de significado numa língua é o morfema — \"infelizmente\" tem 3!",
          detalhe: "\"in-\" + \"feliz\" + \"-mente\" | Livre vs preso | Derivação vs Flexão | Aglutinat."
        },
        {
          letra: "N",
          palavra: "Neologismo",
          emoji: "✨",
          funfato: "O português cria novos termos todo ano — \"tuitar\", \"deletar\", \"postar\" são neologismos!",
          detalhe: "Palavra nova | Empréstimo, calco, derivação | Dicionário: critério de entrada"
        },
        {
          letra: "O",
          palavra: "Ortografia",
          emoji: "✏️",
          funfato: "O inglês tem a ortografia mais irregular do mundo — palavras que não pronunciamos como escrevemos!",
          detalhe: "Sistema de escrita | Reforma ortográfica | Português: Acordo 1990 | Fonema-grafema"
        },
        {
          letra: "P",
          palavra: "Pragmática",
          emoji: "🎭",
          funfato: "Dizer \"você pode me passar o sal?\" não é uma pergunta sobre sua capacidade física!",
          detalhe: "John Austin | Speech Acts | Grice: máximas cooperativas | Implicatura"
        },
        {
          letra: "Q",
          palavra: "Quechua",
          emoji: "🦙",
          funfato: "O quechua tem 10 milhões de falantes nos Andes — língua dos Incas sobreviveu 500 anos!",
          detalhe: "Família quechuamara | Bolívia/Peru/Equador | Aglutinante | Wasi = casa"
        },
        {
          letra: "R",
          palavra: "Registro",
          emoji: "🎙️",
          funfato: "Você usa registros diferentes com amigos, professores e a avó — mesma língua, 3 variantes!",
          detalhe: "Formal/informal | Estilo | Campo + Relação + Modo (Halliday) | Diglossia"
        },
        {
          letra: "S",
          palavra: "Semântica",
          emoji: "💡",
          funfato: "A palavra \"terrível\" antes significava \"que inspira terror\" — sentido positivo!",
          detalhe: "Significado | Sema, semema | Mudança semântica: amelioração vs pejorização"
        },
        {
          letra: "T",
          palavra: "Tradução",
          emoji: "🌐",
          funfato: "A palavra \"saudade\" portuguesa é traduzida mas não equivale exatamente a nenhuma outra língua!",
          detalhe: "Equivalência dinâmica (Nida) | Saudade = untranslatable | Jakobson: 3 tipos"
        },
        {
          letra: "U",
          palavra: "Universais-Linguísticos",
          emoji: "🌍",
          funfato: "Todas as línguas humanas têm sujeito, verbo e objeto — mesmo em ordem diferente!",
          detalhe: "Greenberg 1963 | 45 universais | SOV, SVO, VSO... | Chomsky: GU | Implicacionais"
        },
        {
          letra: "V",
          palavra: "Variação",
          emoji: "🗣️",
          funfato: "Não existe língua \"certa\" ou \"errada\" — o dialeto \"feio\" é tão sistemático quanto o \"bonito\"!",
          detalhe: "Labov | Sociolinguística | Estigma social | Variável vs invariável | AAVE"
        },
        {
          letra: "W",
          palavra: "Wittgenstein-Linguagem",
          emoji: "🎮",
          funfato: "Wittgenstein mostrou que \"dor\" não é uma experiência privada — a palavra é pública!",
          detalhe: "Argumento da linguagem privada | Jogos de linguagem | Seguir uma regra"
        },
        {
          letra: "X",
          palavra: "Xenolalia",
          emoji: "🌍",
          funfato: "Pessoas que sofrem certos danos cerebrais acordam falando sotaque estrangeiro!",
          detalhe: "Foreign Accent Syndrome | Mary Koen 1941 | Casos documentados | Neurolinguística"
        },
        {
          letra: "Y",
          palavra: "Yorubá",
          emoji: "🌍",
          funfato: "O yorubá é uma língua tonal da África Ocidental — e influenciou fortemente o português brasileiro!",
          detalhe: "30Mi falantes | Nigéria/Benin | Candomblé/Umbanda | Banto + Yorubá → PB"
        },
        {
          letra: "Z",
          palavra: "Zulu",
          emoji: "🌍",
          funfato: "O zulu tem cliques nasais e dentais como consoantes — sons que não existem em português!",
          detalhe: "Nguni | África do Sul | 12Mi falantes | Cliques: [!], [|], [||], [ǁ] | Bantu"
        }
      ]
    }
  },
  {
    id: "inv_alfabeto_astronomia",
    tipo: "alfabeto",
    titulo: "Astronomia de A a Z",
    descricao: "Um objeto ou fenômeno do cosmos para cada letra!",
    emoji: "🌌",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 18,
    historinha: "O universo tem um mistério para cada letra do alfabeto! 🌌 Clique em 🔊 e explore o cosmos!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Anã-Branca",
          emoji: "⭐",
          funfato: "O Sol vai virar uma anã branca em 5 bilhões de anos — um diamante cósmico do tamanho da Terra!",
          detalhe: "Estrela residual | Carbono cristalizado | 1,4 M☉ (Chandrasekhar) | 10^9 anos resfria"
        },
        {
          letra: "B",
          palavra: "Big-Bang",
          emoji: "💥",
          funfato: "O Big Bang não foi uma explosão no espaço — foi o próprio espaço se expandindo!",
          detalhe: "13,8 Ga | Singularidade | CMB: 2,7K | Lemaître 1927 | Inflação cósmica"
        },
        {
          letra: "C",
          palavra: "Cepheid",
          emoji: "⭐",
          funfato: "Estrelas cefeidas pulsam e servem como \"régua cósmica\" para medir distâncias no universo!",
          detalhe: "Henrietta Leavitt 1908 | Período-Luminosidade | 1-50 dias | Hubble usou"
        },
        {
          letra: "D",
          palavra: "Dark-Energy",
          emoji: "🌑",
          funfato: "A energia escura acelera a expansão do universo e é 68% de tudo — mas ninguém sabe o que é!",
          detalhe: "Perlmutter+Schmidt+Riess 1998 Nobel | Constante cosmológica Λ | w=-1 (aprox)"
        },
        {
          letra: "E",
          palavra: "Estrela-de-Nêutrons",
          emoji: "💫",
          funfato: "Uma estrela de nêutrons tem a massa do Sol comprimida numa esfera de 20km de diâmetro!",
          detalhe: "Remanescente supernova | 1,4-3 M☉ | 10^17 kg/m³ | Pulsar: rotação 700Hz"
        },
        {
          letra: "F",
          palavra: "Fosca-Era-Cósmica",
          emoji: "🌑",
          funfato: "Após o Big Bang, o universo ficou \"apagado\" a partir de 380 mil anos — a era das trevas!",
          detalhe: "Dark Ages: 380ka-1Ga | Reionização | Primeiras estrelas | James Webb observa"
        },
        {
          letra: "G",
          palavra: "Galáxia-de-Andrômeda",
          emoji: "🌌",
          funfato: "Andrômeda vai colidir com nossa galáxia em 4,5 bilhões de anos — e não vai destruir nada!",
          detalhe: "M31 | 2,5 Mly | 1 trilhão de estrelas | Colisão suave: estrelas não se tocam"
        },
        {
          letra: "H",
          palavra: "Horizonte-de-Eventos",
          emoji: "⬛",
          funfato: "O horizonte de eventos é um ponto sem retorno — nem luz escapa do buraco negro depois!",
          detalhe: "Schwarzschild radius | rs = 2GM/c² | Paradoxo da informação | EHT 2019"
        },
        {
          letra: "I",
          palavra: "Inflação-Cósmica",
          emoji: "💥",
          funfato: "O universo se expandiu mais em 10^-32 segundos do que em 13 bilhões de anos depois!",
          detalhe: "Alan Guth 1980 | 10^-36 a 10^-32s | 10^26 vezes | Flutuações quânticas→galáxias"
        },
        {
          letra: "J",
          palavra: "James-Webb",
          emoji: "🔭",
          funfato: "O James Webb vê tão longe que observa galáxias de 400 milhões de anos após o Big Bang!",
          detalhe: "NASA 2021 | Infravermelho | L2 | 6,5m espelho | Primeira luz: 2022"
        },
        {
          letra: "K",
          palavra: "Kepler",
          emoji: "⭐",
          funfato: "O telescópio Kepler encontrou mais de 2.600 exoplanetas orbitando outras estrelas!",
          detalhe: "NASA 2009-2018 | 2.662 exoplanetas | Trânsito fotométrico | Zona habitável"
        },
        {
          letra: "L",
          palavra: "LISA",
          emoji: "🌊",
          funfato: "LISA vai detectar ondas gravitacionais de buracos negros com braços de 2,5 MILHÕES de km!",
          detalhe: "ESA | Launch: 2034 | 2,5 Mkm braços | Laser interferometry | mHz"
        },
        {
          letra: "M",
          palavra: "Magnetar",
          emoji: "🌟",
          funfato: "O campo magnético de um magnetar é tão forte que destruiria um cartão magnético a 160.000km!",
          detalhe: "~10^11 gauss (10^7 Tesla) | SGR 1806-20 | Soft Gamma Repeater | Casca de estrela nêutrons"
        },
        {
          letra: "N",
          palavra: "Nucleossíntese",
          emoji: "⚛️",
          funfato: "Todos os elementos mais pesados que o hidrogênio foram forjados dentro de estrelas!",
          detalhe: "\"We are stardust\" | Bethe: fusão estelar | r-processo: kilonova | Hoyle 1957"
        },
        {
          letra: "O",
          palavra: "Onda-Gravitacional",
          emoji: "🌊",
          funfato: "A primeira onda gravitacional detectada em 2015 veio de dois buracos negros que se fundiram há 1,3 Ga!",
          detalhe: "GW150914 | LIGO | 36+29 M☉ → 62 M☉ + 3 M☉ energia | 400 Mpc"
        },
        {
          letra: "P",
          palavra: "Pulsar",
          emoji: "💫",
          funfato: "Pulsares são tão precisos que podem ser usados como GPS intergaláctico!",
          detalhe: "Jocelyn Bell 1967 | Rotação 716Hz | PSR B1919+21 | \"LGM-1\" (apelido inicial)"
        },
        {
          letra: "Q",
          palavra: "Quasar",
          emoji: "✨",
          funfato: "Um quasar pode emitir 10 trilhões de vezes mais energia que o Sol — em um ponto minúsculo!",
          detalhe: "AGN | Buraco negro supermassivo | z>6 | 3C 273 | Quasi-stellar radio source"
        },
        {
          letra: "R",
          palavra: "Radiação-de-Fundo",
          emoji: "📡",
          funfato: "A CMB é o \"eco\" do Big Bang — e cobre o céu todo com temperatura de -270°C!",
          detalhe: "Penzias+Wilson 1965 Nobel | 2,72K | COBE, WMAP, Planck | Polarização: Nobel 2019"
        },
        {
          letra: "S",
          palavra: "Supernova",
          emoji: "💥",
          funfato: "Uma supernova pode brilhar mais do que sua galáxia inteira por semanas!",
          detalhe: "Tipo Ia: padrão | Tipo II: núcleo | SN 1987A | Perlmutter: aceleração universo"
        },
        {
          letra: "T",
          palavra: "Telescópio-EHT",
          emoji: "⬛",
          funfato: "O Event Horizon Telescope fotografou um buraco negro juntando dados de 8 telescópios no mundo!",
          detalhe: "M87* 2019 | Sgr A* 2022 | 8 observatórios | VLBI | M87*: 6,5 bilhões de massas solares"
        },
        {
          letra: "U",
          palavra: "Universo-Observável",
          emoji: "🌌",
          funfato: "O universo observável tem 93 bilhões de anos-luz de diâmetro — mas o universo total é maior!",
          detalhe: "46,5 Gly raio | Expansão: além do horizon | 2 trilhões de galáxias (Conselice)"
        },
        {
          letra: "V",
          palavra: "Via-Láctea",
          emoji: "🌌",
          funfato: "Vivemos numa das espirais da Via Láctea — a 26.000 anos-luz do centro!",
          detalhe: "200-400Bi estrelas | Barred spiral | Sgr A*: 4Mi M☉ | 13,6 Ga | 100.000 ly"
        },
        {
          letra: "W",
          palavra: "Webb-JWST",
          emoji: "🔭",
          funfato: "O James Webb pode detectar o calor de uma abelha na Lua com seus espelhos dourados!",
          detalhe: "Berílio + ouro | 6,5m | L2 | MIRI, NIRCam, NIRSpec, FGS/NIRISS"
        },
        {
          letra: "X",
          palavra: "X-Ray-Astronomy",
          emoji: "🌟",
          funfato: "O telescópio Chandra orbita quase 260× mais alto que o Hubble para detectar raios-X cósmicos!",
          detalhe: "Chandra X-Ray Observatory 1999 | 140.000km órbita | Plasmas quentes 10^7K"
        },
        {
          letra: "Y",
          palavra: "Ylem",
          emoji: "💥",
          funfato: "George Gamow chamou de \"ylem\" a matéria ultradensa dos primeiros instantes do Big Bang!",
          detalhe: "George Gamow 1948 | Nucleossíntese primordial | He, D, Li primordiais | BBN"
        },
        {
          letra: "Z",
          palavra: "Redshift-Z",
          emoji: "🌈",
          funfato: "O \"z\" do redshift mede o quanto a luz de uma galáxia foi \"esticada\" pela expansão do universo!",
          detalhe: "z = (λobs-λem)/λem | Hubble 1929 | z>11: galáxias mais antigas | JWST"
        }
      ]
    }
  },
  {
    id: "inv_alfabeto_quimica",
    tipo: "alfabeto",
    titulo: "Química de A a Z",
    descricao: "Um conceito de química pra cada letra do alfabeto!",
    emoji: "⚗️",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 18,
    historinha: "A química está em tudo ao seu redor — do fogo que queima ao sal que você usa na comida! ⚗️ Clique em 🔊 e descubra um conceito novo pra cada letra!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Ácido",
          emoji: "🍋",
          funfato: "Coisas ácidas têm gosto azedo, como limão e vinagre — o suco do seu estômago também é um ácido forte!",
          detalhe: "pH menor que 7 | Reage com metais e libera gás | Limão, vinagre, suco gástrico"
        },
        {
          letra: "B",
          palavra: "Base",
          emoji: "🧼",
          funfato: "Bases são o oposto dos ácidos — o sabão e a soda cáustica são exemplos, e por isso o sabão é escorregadio!",
          detalhe: "pH maior que 7 | Sensação escorregadia ao toque | Sabão, soda cáustica, leite de magnésia"
        },
        {
          letra: "C",
          palavra: "Combustão",
          emoji: "🔥",
          funfato: "Toda vez que algo queima, é oxigênio reagindo com outra substância e liberando calor e luz!",
          detalhe: "Reação que libera calor, luz e gás carbônico | Precisa de combustível + oxigênio + calor | Vela, fogueira"
        },
        {
          letra: "D",
          palavra: "Densidade",
          emoji: "🛢️",
          funfato: "O óleo flutua na água porque é menos denso — tem menos massa no mesmo espaço, por isso fica por cima!",
          detalhe: "Massa dividida pelo volume | Água: 1g por mL | Objeto menos denso que o líquido flutua"
        },
        {
          letra: "E",
          palavra: "Eletrólise",
          emoji: "⚡",
          funfato: "Passando eletricidade na água, ela se separa em hidrogênio e oxigênio — os gases que formam ela!",
          detalhe: "Corrente elétrica separa a molécula | Água vira gás hidrogênio + gás oxigênio | Usada pra purificar metais"
        },
        {
          letra: "F",
          palavra: "Fermentação",
          emoji: "🍞",
          funfato: "Fungos e bactérias transformam açúcar em outras substâncias — é assim que o pão cresce e o suco de uva vira vinho!",
          detalhe: "Processo sem oxigênio | Libera gás carbônico | Pão, vinho, iogurte, queijo"
        },
        {
          letra: "G",
          palavra: "Grafeno",
          emoji: "✏️",
          funfato: "O grafite do lápis é feito de carbono empilhado em camadas — uma única camada dessas é mais resistente que o aço!",
          detalhe: "Uma camada de átomos de carbono | Mais forte que o aço, mais leve que o papel | Ganhou o Nobel de Física em 2010"
        },
        {
          letra: "H",
          palavra: "Hidrogênio",
          emoji: "💧",
          funfato: "É o elemento mais simples e mais comum do universo — as estrelas, incluindo o Sol, são feitas principalmente dele!",
          detalhe: "Elemento número 1 da tabela periódica | Metade de cada molécula de água (H₂O) | Combustível de foguetes e estrelas"
        },
        {
          letra: "I",
          palavra: "Isótopo",
          emoji: "☢️",
          funfato: "Átomos do mesmo elemento podem ter pesos diferentes — é assim que cientistas descobrem a idade de fósseis!",
          detalhe: "Mesmo elemento, número diferente de nêutrons | Carbono-14 usado pra datar fósseis | Alguns são radioativos"
        },
        {
          letra: "J",
          palavra: "Joule",
          emoji: "⚙️",
          funfato: "É a unidade que mede energia — quanto mais joules uma reação libera, mais forte é o calor que ela produz!",
          detalhe: "Unidade de energia (símbolo J) | Batizada em homenagem a James Joule | 1 caloria equivale a cerca de 4,2 joules"
        },
        {
          letra: "K",
          palavra: "Kelvin",
          emoji: "🌡️",
          funfato: "É a escala de temperatura que começa no zero absoluto — o ponto mais frio que existe no universo!",
          detalhe: "0 K equivale a -273,15°C (zero absoluto) | Usada em ciência no mundo todo | Batizada em homenagem a Lord Kelvin"
        },
        {
          letra: "L",
          palavra: "Liga metálica",
          emoji: "🥉",
          funfato: "Misturando metais diferentes você cria materiais novos — o bronze é cobre com estanho, e é mais duro que os dois separados!",
          detalhe: "Mistura de dois ou mais metais | Bronze, aço e ouro 18 quilates são exemplos | Fica mais resistente que os metais puros"
        },
        {
          letra: "M",
          palavra: "Molécula",
          emoji: "🧬",
          funfato: "É um grupo de átomos grudados — a água é só 2 átomos de hidrogênio e 1 de oxigênio grudados de um jeito especial!",
          detalhe: "Átomos unidos por ligações químicas | Água, gás carbônico e oxigênio são exemplos | Menor parte que ainda tem as propriedades da substância"
        },
        {
          letra: "N",
          palavra: "Neutralização",
          emoji: "🧪",
          funfato: "Quando um ácido encontra uma base, os dois se cancelam e formam água e sal — por isso remédio antiácido alivia a azia!",
          detalhe: "Ácido + base formam sal + água | Usada em remédios pra azia | Reação muito comum no dia a dia"
        },
        {
          letra: "O",
          palavra: "Oxigênio",
          emoji: "🫧",
          funfato: "É o gás que respiramos e que faz o fogo queimar — sem ele, nenhuma fogueira acende e nenhum animal sobrevive!",
          detalhe: "21% do ar que respiramos | Produzido pelas plantas na fotossíntese | Essencial pra combustão e pra vida"
        },
        {
          letra: "P",
          palavra: "Plástico",
          emoji: "🧴",
          funfato: "Plásticos são moléculas gigantes feitas de milhares de pedacinhos repetidos grudados em fileira, como um colar bem comprido!",
          detalhe: "Cadeia longa de moléculas repetidas (polímero) | Feito geralmente de petróleo | Demora centenas de anos pra se decompor"
        },
        {
          letra: "Q",
          palavra: "Química verde",
          emoji: "🌿",
          funfato: "É a ideia de fazer reações químicas que sujam menos o planeta — usando menos energia e produzindo menos lixo tóxico!",
          detalhe: "Reações mais limpas e seguras | Menos resíduo, menos energia gasta | Cada vez mais usada na indústria"
        },
        {
          letra: "R",
          palavra: "Reação",
          emoji: "🧫",
          funfato: "É quando substâncias se transformam em outras completamente diferentes — como ferro que enferruja ou madeira que queima!",
          detalhe: "Rearranjo de átomos formando novas substâncias | Pode liberar ou absorver energia | Ferrugem, combustão e digestão são exemplos"
        },
        {
          letra: "S",
          palavra: "Sal",
          emoji: "🧂",
          funfato: "O sal de cozinha é feito de sódio (um metal que explode na água!) e cloro (um gás venenoso) — juntos formam algo seguro de comer!",
          detalhe: "Cloreto de sódio | Formado por ligação entre um metal e um não-metal | Sódio e cloro sozinhos são perigosos, juntos não"
        },
        {
          letra: "T",
          palavra: "Tabela periódica",
          emoji: "🔢",
          funfato: "Organiza todos os elementos conhecidos por suas propriedades — hoje já tem mais de 118 elementos catalogados!",
          detalhe: "Criada por Dmitri Mendeleiev em 1869 | Organizada por número atômico | 118 elementos conhecidos até hoje"
        },
        {
          letra: "U",
          palavra: "Urânio",
          emoji: "☢️",
          funfato: "É o combustível das usinas nucleares — um pouquinho de urânio produz uma quantidade enorme de energia!",
          detalhe: "Elemento radioativo pesado | Usado em usinas nucleares pra gerar eletricidade | Pouca massa gera muita energia"
        },
        {
          letra: "V",
          palavra: "Vinagre",
          emoji: "🍶",
          funfato: "É um ácido fraco dissolvido em água — por isso ele tem cheiro forte e pode até ajudar a limpar coisas!",
          detalhe: "Solução de ácido acético em água | pH em torno de 2,5 a 3 | Usado em culinária e limpeza"
        },
        {
          letra: "W",
          palavra: "Watt",
          emoji: "🔌",
          funfato: "É a unidade que mede quanta energia um aparelho gasta por segundo — uma lâmpada de 60 watts gasta 60 joules a cada segundo!",
          detalhe: "Unidade de potência (símbolo W) | Batizada em homenagem a James Watt | Watt equivale a joules por segundo"
        },
        {
          letra: "X",
          palavra: "Xenônio",
          emoji: "💡",
          funfato: "É um gás raro do ar que quase não reage com nada — mas brilha com uma luz azulada forte dentro de lâmpadas especiais!",
          detalhe: "Gás nobre, muito raro no ar | Usado em faróis de carro e flashes | Quase não forma compostos com outros elementos"
        },
        {
          letra: "Y",
          palavra: "Ytérbio",
          emoji: "⏱️",
          funfato: "Esse metal raro é usado nos relógios mais precisos do mundo — eles só errariam 1 segundo depois de 300 milhões de anos!",
          detalhe: "Elemento raro usado em relógios atômicos | Extremamente preciso pra medir o tempo | Descoberto perto da cidade de Ytterby, na Suécia"
        },
        {
          letra: "Z",
          palavra: "Zinco",
          emoji: "🔋",
          funfato: "Esse metal protege o ferro contra ferrugem e também é usado dentro de pilhas — seu corpo também precisa de um pouquinho dele!",
          detalhe: "Metal usado pra revestir ferro (galvanização) | Presente em pilhas comuns | Nutriente essencial encontrado em carnes e nozes"
        }
      ]
    }
  },
  {
    id: "inv_alfabeto_politica",
    tipo: "alfabeto",
    titulo: "Ciência Política de A a Z",
    descricao: "Um conceito essencial da ciência política para cada letra!",
    emoji: "🏛️",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 18,
    historinha: "A ciência política tem um conceito para cada letra do alfabeto! 🏛️ Clique em 🔊 e entenda como o poder funciona!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Anarquismo",
          emoji: "✊",
          funfato: "O anarquismo não é bagunça — propõe organização sem hierarquia: cooperação voluntária!",
          detalhe: "Proudhon, Bakunin, Kropotkin | Federalismo | Comitês de trabalhadores"
        },
        {
          letra: "B",
          palavra: "Burocracia",
          emoji: "📋",
          funfato: "Max Weber dizia que a burocracia moderna é como uma gaiola de ferro para a liberdade humana!",
          detalhe: "Weber: dominação racional-legal | Hierarquia + regras + registros | Disfunções"
        },
        {
          letra: "C",
          palavra: "Constitucionalismo",
          emoji: "📜",
          funfato: "A Magna Carta de 1215 foi o primeiro documento a limitar o poder do rei com uma lei escrita!",
          detalhe: "Magna Carta 1215 | Constituição americana 1787 | Supremacia constitucional"
        },
        {
          letra: "D",
          palavra: "Democracia",
          emoji: "🗳️",
          funfato: "A democracia ateniense excluía mulheres, escravos e estrangeiros — apenas 10% votavam!",
          detalhe: "Demos + kratos | Direta (Atenas) + Representativa + Deliberativa | Dahl: poliarquia"
        },
        {
          letra: "E",
          palavra: "Elitismo",
          emoji: "👑",
          funfato: "Mosca e Pareto provaram que em toda sociedade há sempre uma minoria que governa!",
          detalhe: "Gaetano Mosca | Vilfredo Pareto | C. Wright Mills: \"A Elite do Poder\""
        },
        {
          letra: "F",
          palavra: "Federalismo",
          emoji: "🏛️",
          funfato: "O Brasil é uma federação — estados podem ter constituições próprias e autonomia fiscal!",
          detalhe: "Hamilton, Madison, Jay: Federalist Papers | Dual vs Cooperative | Devolução"
        },
        {
          letra: "G",
          palavra: "Geopolítica-de-Mackinder",
          emoji: "🌍",
          funfato: "Mackinder dizia: quem controla a Eurásia controla o mundo — e isso ainda guia estratégias!",
          detalhe: "Heartland theory 1904 | Halford Mackinder | Spykman: Rimland | Sea power vs Land power"
        },
        {
          letra: "H",
          palavra: "Hegemonia-Gramsci",
          emoji: "✊",
          funfato: "Gramsci no cárcere de Mussolini escreveu que o poder se exerce pelo consentimento, não força!",
          detalhe: "Antonio Gramsci | Cadernos do Cárcere | Hegemonia cultural | Bloco histórico"
        },
        {
          letra: "I",
          palavra: "Imperialismo",
          emoji: "🌍",
          funfato: "Lenin escreveu sua teoria do imperialismo como \"fase superior do capitalismo\" na Primeira Guerra!",
          detalhe: "Lenin 1917 | Capital financeiro + exportação | Dependência | Neo-imperialismo"
        },
        {
          letra: "J",
          palavra: "Judiciário",
          emoji: "⚖️",
          funfato: "A revisão judicial americana foi criada em 1803 pelo juiz Marshall — não está na Constituição!",
          detalhe: "Marbury vs Madison 1803 | Judicial review | Ativismo vs deferência | STF"
        },
        {
          letra: "K",
          palavra: "Kelsen",
          emoji: "📜",
          funfato: "Hans Kelsen criou a pirâmide normativa — toda lei deve se fundamentar em lei superior!",
          detalhe: "Pirâmide de Kelsen | Grundnorm | Positivismo jurídico | Teoria Pura do Direito"
        },
        {
          letra: "L",
          palavra: "Legitimidade",
          emoji: "🤝",
          funfato: "Weber distinguiu 3 tipos de autoridade: tradicional, carismática e legal-racional!",
          detalhe: "Max Weber | Tradição + Carisma + Razão | Legality ≠ Legitimacy | Habermas"
        },
        {
          letra: "M",
          palavra: "Marxismo",
          emoji: "✊",
          funfato: "Marx previu que o capitalismo contém as sementes de sua própria destruição — contradições internas!",
          detalhe: "Karl Marx | Materialismo histórico | Mais-valia | Luta de classes | Manifesto 1848"
        },
        {
          letra: "N",
          palavra: "Neoliberalismo",
          emoji: "📈",
          funfato: "O neoliberalismo de Thatcher e Reagan privatizou empresas públicas em escala sem precedentes!",
          detalhe: "Hayek + Friedman | Chicago School | Desregulação, privatização, corte fiscal"
        },
        {
          letra: "O",
          palavra: "Oligarquia",
          emoji: "💎",
          funfato: "Michels criou a \"lei de ferro da oligarquia\" — toda organização tende a ser controlada por poucos!",
          detalhe: "Robert Michels 1911 | Burocracia interna | Partido + Sindicato → elites"
        },
        {
          letra: "P",
          palavra: "Populismo",
          emoji: "📢",
          funfato: "O populismo coloca \"o povo\" contra \"a elite\" — mas pode ser de esquerda ou direita!",
          detalhe: "Laclau: discurso populista | Povo vs Establishment | Liderança carismática"
        },
        {
          letra: "Q",
          palavra: "Quociente-Eleitoral",
          emoji: "🗳️",
          funfato: "O sistema proporcional brasileiro usa quociente eleitoral — e isso favorece coligações!",
          detalhe: "QE = votos válidos ÷ vagas | QP = votos partido ÷ QE | Cloverleaf effects"
        },
        {
          letra: "R",
          palavra: "Republicanismo",
          emoji: "🏛️",
          funfato: "Para os republicanos cívicos, a liberdade é não-dominação — ser livre de qualquer senhor!",
          detalhe: "Philip Pettit | Hannah Arendt | Participação + virtude cívica | Federalistas"
        },
        {
          letra: "S",
          palavra: "Socialismo",
          emoji: "✊",
          funfato: "Socialismo tem muitas formas — do democrático sueco ao autoritário soviético!",
          detalhe: "Social-democracia | Marxismo | Socialismo utópico | Means of production"
        },
        {
          letra: "T",
          palavra: "Teoria-da-Dependência",
          emoji: "🌍",
          funfato: "Fernando Henrique Cardoso analisou como países ricos mantêm pobres na periferia do sistema!",
          detalhe: "CEPAL | Prebisch-Singer | FHC + Falleto | Modernização vs Dependência"
        },
        {
          letra: "U",
          palavra: "Unipartidarismo",
          emoji: "🚫",
          funfato: "Dos 195 países do mundo, apenas 5 são governados por partido único hoje!",
          detalhe: "China, Cuba, Vietnã, Laos, Eritreia | Vs Pluralismo | 1 partido = monopol. poder"
        },
        {
          letra: "V",
          palavra: "Véu-da-Ignorância",
          emoji: "🎭",
          funfato: "Rawls pedia: escolha princípios como se não soubesse sua posição social — e você escolheria igualdade!",
          detalhe: "John Rawls | \"A Theory of Justice\" 1971 | Diferença + Igual liberdade"
        },
        {
          letra: "W",
          palavra: "Wallerstein",
          emoji: "🌍",
          funfato: "Wallerstein viu o mundo como um sistema dividido em centro, semiperiferia e periferia!",
          detalhe: "Immanuel Wallerstein | World-Systems Theory | Core-Periphery | Longa duração"
        },
        {
          letra: "X",
          palavra: "Xenopolítica",
          emoji: "🌍",
          funfato: "Xenopolítica é a política de exclusão do estrangeiro — e virou estratégia eleitoral global!",
          detalhe: "Populismo anti-imigrante | Trump, Orbán, Le Pen, Bolsonaro | Nativismo"
        },
        {
          letra: "Y",
          palavra: "Yeoman-Democracy",
          emoji: "🌾",
          funfato: "Thomas Jefferson sonhava com uma democracia de pequenos agricultores independentes!",
          detalhe: "Jeffersonian democracy | Virtude agrária | Vs Hamilton: burguesia industrial"
        },
        {
          letra: "Z",
          palavra: "Zeitgeist-Político",
          emoji: "🕰️",
          funfato: "O \"espírito do tempo\" político muda — o que parecia radical hoje é consenso amanhã!",
          detalhe: "Overton Window | Centro político se move | Thatcherismo → Blair | Transformação"
        }
      ]
    }
  },
  {
    id: "inv_alfabeto_medicina",
    tipo: "alfabeto",
    titulo: "Medicina de A a Z",
    descricao: "Um conceito médico fundamental para cada letra!",
    emoji: "⚕️",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 18,
    historinha: "A medicina tem um conceito que pode salvar vidas para cada letra! ⚕️ Clique em 🔊 e descubra a ciência que nos cura!",
    dados: {
      letras: [
        {
          letra: "A",
          palavra: "Anestesia",
          emoji: "💉",
          funfato: "Antes da anestesia, cirurgias eram feitas com pacientes acordados — e velocidade era virtude!",
          detalhe: "Éter: Morton 1846 | Clorofórmio: Simpson 1847 | Local (lidocaína) + geral"
        },
        {
          letra: "B",
          palavra: "BRCA-Gene",
          emoji: "🧬",
          funfato: "Mulheres com mutação BRCA1 têm até 87% de risco de câncer de mama — Angelina Jolie se operou!",
          detalhe: "BRCA1/2 | Mary-Claire King 1990 | Tumor suppressor | Mastectomia preventiva"
        },
        {
          letra: "C",
          palavra: "CRISPR-Medicina",
          emoji: "✂️",
          funfato: "Em 2023, a FDA aprovou a primeira terapia CRISPR para cura de anemia falciforme!",
          detalhe: "Casgevy (Vertex) 2023 | Anemia falciforme + talassemia | HbF reativação"
        },
        {
          letra: "D",
          palavra: "Diagnóstico-IA",
          emoji: "🤖",
          funfato: "IA detecta câncer de pele com precisão superior a dermatologistas experientes!",
          detalhe: "Estjanovic 2017 | CNN: sensibilidade 95% | Tchernov: ECG + STEMI"
        },
        {
          letra: "E",
          palavra: "Epidemiologia",
          emoji: "📊",
          funfato: "John Snow mapeou em 1854 casos de cólera em Londres e descobriu que vinha de um poço!",
          detalhe: "Mapa da Cólera | Broad Street | RR, OR, HR | Coorte, caso-controle, transversal"
        },
        {
          letra: "F",
          palavra: "Fisiologia-Cardíaca",
          emoji: "❤️",
          funfato: "O coração bate 100.000 vezes por dia e bombeia 7.000L de sangue — em 24 horas!",
          detalhe: "Windkessel | Starling: contratilidade | 4 câmaras | PA = CO × TPR"
        },
        {
          letra: "G",
          palavra: "Genoma-Pessoal",
          emoji: "🧬",
          funfato: "Sequenciar seu genoma completo custava US$3 bilhões em 2003 — hoje custa US$200!",
          detalhe: "HGP 2003: 3Gi USD | 2024: ~$200 | Medicina de precisão | Farmacogenômica"
        },
        {
          letra: "H",
          palavra: "Homeostase-pH",
          emoji: "⚖️",
          funfato: "O pH do sangue deve ficar entre 7,35 e 7,45 — desviar poucos décimos causa morte!",
          detalhe: "Henderson-Hasselbalch | Acidose + Alcalose | Pulmão + Rim + Buffer"
        },
        {
          letra: "I",
          palavra: "Imunoncologia",
          emoji: "🧬",
          funfato: "Os checkpoints imunológicos bloqueiam o \"freio\" do sistema imune — e ele ataca o tumor!",
          detalhe: "Allison + Honjo Nobel 2018 | PD-1, CTLA-4 | CAR-T cell | Resposta durável"
        },
        {
          letra: "J",
          palavra: "Jejum-Intermitente",
          emoji: "⏰",
          funfato: "Yoshinori Ohsumi ganhou o Nobel por descobrir que o jejum ativa a autofagia celular!",
          detalhe: "Ohsumi Nobel 2016 | Autofagia | mTOR inibição | 16:8, 5:2 | Longevidade"
        },
        {
          letra: "K",
          palavra: "Koch-Postulados",
          emoji: "🦠",
          funfato: "Koch estabeleceu as 4 regras para provar que um micróbio causa uma doença — em 1884!",
          detalhe: "Robert Koch 1884 | Isolamento + cultura + inoculação + recultura | Causação"
        },
        {
          letra: "L",
          palavra: "Laparoscopia",
          emoji: "🔬",
          funfato: "A laparoscopia permite operar o abdome com 3 furinhos — sem abrir o paciente!",
          detalhe: "Kalk 1929 | Semm 1983: apendicectomia | Trocar, insuflação CO₂, câmera 4K"
        },
        {
          letra: "M",
          palavra: "mRNA-Vacina",
          emoji: "💉",
          funfato: "As vacinas de mRNA da COVID foram desenvolvidas e aprovadas em apenas 11 meses!",
          detalhe: "Karikó + Weissman Nobel 2023 | Pseudouridina | Lipid nanoparticle | BNT162b2"
        },
        {
          letra: "N",
          palavra: "Neuroimagem",
          emoji: "🧠",
          funfato: "O fMRI mede o fluxo de sangue no cérebro em tempo real — você \"vê\" o pensamento!",
          detalhe: "fMRI: BOLD signal | Ogawa 1990 | PET scan: FDG | EEG: ms | Connectome"
        },
        {
          letra: "O",
          palavra: "Oncogene",
          emoji: "🧬",
          funfato: "Proto-oncogenes são genes normais que viram aceleradores de câncer se mutados!",
          detalhe: "Bishop + Varmus Nobel 1989 | Src, Ras, Myc | 2 Hit (Knudson) | Tumor suppressor"
        },
        {
          letra: "P",
          palavra: "Placebo",
          emoji: "💊",
          funfato: "O efeito placebo pode curar de verdade — cirurgias placebo eliminaram dores crônicas!",
          detalhe: "Henry Beecher 1955 | Neurobiologia real | Open-label placebo | Ritual de cura"
        },
        {
          letra: "Q",
          palavra: "Qualidade-de-Vida-QALY",
          emoji: "📊",
          funfato: "QALY (Quality-Adjusted Life Year) decide quanto um país paga por cada tratamento!",
          detalhe: "NICE UK | £30.000/QALY threshold | HTA | Equity vs Efficiency"
        },
        {
          letra: "R",
          palavra: "RCT",
          emoji: "🔬",
          funfato: "O RCT (ensaio clínico randomizado) é o padrão-ouro para provar que um tratamento funciona!",
          detalhe: "Bradford Hill 1948 | Randomização | Double-blind | Placebo-controlled | CONSORT"
        },
        {
          letra: "S",
          palavra: "Sepse",
          emoji: "🦠",
          funfato: "Sepse mata 11 milhões de pessoas por ano — mais que câncer de mama, próstata e pulmão juntos!",
          detalhe: "Disfunção orgânica + infecção | SOFA score | Bundles | Antibióticos 1h"
        },
        {
          letra: "T",
          palavra: "Telemedicina",
          emoji: "📱",
          funfato: "A telemedicina permite um médico operar com robô em hospital a 10.000km de distância!",
          detalhe: "ZEUS, da Vinci robot | Lindbergh Operation 2001 | Store-and-forward + síncrono"
        },
        {
          letra: "U",
          palavra: "Ultrassom-Point-of-Care",
          emoji: "🔬",
          funfato: "Hoje ultrassom cabe no bolso — médicos diagnosticam em campo de guerra ou deserto!",
          detalhe: "POCUS | Butterfly, Vscan | FAST: trauma | Lung sliding: pneumotórax | AI assist"
        },
        {
          letra: "V",
          palavra: "Vacina-Subunitária",
          emoji: "💉",
          funfato: "Vacinas subunitárias usam apenas um pedaço do vírus — mais seguras que as antigas!",
          detalhe: "Proteína S recombinante | HBV: yeast | HPV: VLP | Adjuvante: AS01B"
        },
        {
          letra: "W",
          palavra: "WHO-OMS",
          emoji: "🌍",
          funfato: "A OMS coordenou a erradicação da varíola em 1980 — a única doença humana erradicada!",
          detalhe: "World Health Organization | Intensified Smallpox Eradication 1967-80 | GOARN"
        },
        {
          letra: "X",
          palavra: "Xenotransplante-Médico",
          emoji: "🐷",
          funfato: "Em 2022, um homem recebeu um coração de porco transgênico — e viveu 2 meses!",
          detalhe: "Maryland 2022 | 10 genes editados | CRISPR + retrovírus removidos | Rejeição"
        },
        {
          letra: "Y",
          palavra: "Yasargil",
          emoji: "🧠",
          funfato: "Gazi Yaşargil inventou a neurocirurgia microscópica e operou tumores cerebrais impossíveis!",
          detalhe: "Türk | Microscópio cirúrgico 1967 | \"Pai da neurocirurgia moderna\" | Aneurisma"
        },
        {
          letra: "Z",
          palavra: "Zika-Epidemiologia",
          emoji: "🦟",
          funfato: "O Brasil ajudou a descobrir que o Zika causa microcefalia — nova associação vírus-malformação!",
          detalhe: "Aedes aegypti | Microcefalia 2015 | Adriana Melo | NEJM | Vacina: em dev."
        }
      ]
    }
  }
]

// ── Fase 1 — quiz, memória, sequência ──
export const atividadesExtraPorFaixa = [
  {
    id: "inv_quiz_programacao",
    tipo: "quiz",
    titulo: "Programação e Tecnologia",
    descricao: "Conceitos fundamentais do mundo digital!",
    emoji: "💻",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "A TechCorp está contratando jovens desenvolvedores! 💻 A seleção é uma prova técnica com questões de programação e tecnologia. Prove que você é o candidato ideal.",
    perguntas: [
      {
        pergunta: "O que é um algoritmo?",
        opcoes: [
          "Um tipo de vírus",
          "Um nome de programa",
          "Uma sequência de instruções para resolver um problema",
          "Um idioma de computador"
        ],
        correta: 2,
        fato: "💻 A palavra \"algoritmo\" vem de Al-Khwarizmi, matemático persa do século IX. O algoritmo QuickSort ordena 1 milhão de elementos em menos de 1 segundo. Algoritmos eficientes valem bilhões!"
      },
      {
        pergunta: "O que é \"open source\" (código aberto)?",
        opcoes: [
          "Software pago com licença cara",
          "Código disponível para qualquer um ver, modificar e distribuir",
          "Programa desenvolvido em segredo",
          "Software com código ultrarrápido"
        ],
        correta: 1,
        fato: "🔓 Linux (open source) roda em 96% dos servidores da internet, incluindo Google, Amazon e Netflix. O kernel Linux tem mais de 27 milhões de linhas de código escritas por voluntários do mundo todo!"
      },
      {
        pergunta: "O que é recursão em programação?",
        opcoes: [
          "Um tipo de erro",
          "Uma função que chama a si mesma para resolver um problema",
          "Um loop infinito que nunca para",
          "Um método de debugar código"
        ],
        correta: 1,
        fato: "🔄 Recursão é uma das ideias mais elegantes da computação. Para calcular 5! = 5×4×3×2×1, a função \"chama a si mesma\" com 4, que chama com 3... Sem caso base, causa \"stack overflow\"!"
      },
      {
        pergunta: "O que são bytes?",
        opcoes: [
          "Unidades de velocidade",
          "Unidades de armazenamento digital",
          "Tipos de processadores",
          "Erros de sistema"
        ],
        correta: 1,
        fato: "💾 1 byte = 8 bits (zeros e uns). 1 GB = 1 bilhão de bytes. O genoma humano completo em formato digital teria 3 GB. O primeiro HD da IBM (1956) pesava 1 tonelada e armazenava apenas 5 MB!"
      },
      {
        pergunta: "Qual linguagem domina o desenvolvimento web front-end?",
        opcoes: ["Python", "JavaScript", "Java", "C++"],
        correta: 1,
        fato: "🌐 JavaScript foi criado em 1995 em apenas 10 dias! Hoje roda em 97% dos sites, no servidor (Node.js) e em apps móveis. É a linguagem mais usada no mundo há 11 anos consecutivos (StackOverflow)."
      }
    ]
  },
  {
    id: "inv_quiz_fisica",
    tipo: "quiz",
    titulo: "Física e Ciências Exatas",
    descricao: "Os segredos mais profundos do universo!",
    emoji: "⚛️",
    habilidade: "Pensamento Científico",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "A Academia de Ciências está selecionando jovens talentos para uma bolsa de pesquisa internacional! ⚛️ A prova teórica é sobre os fundamentos da física moderna. Você está preparado?",
    perguntas: [
      {
        pergunta: "O que significa E=mc² na Teoria da Relatividade?",
        opcoes: [
          "Energia é sempre constante",
          "Massa e energia são formas equivalentes da mesma coisa",
          "A velocidade da luz é relativa",
          "A massa aumenta com a temperatura"
        ],
        correta: 1,
        fato: "🌌 E=mc² significa que 1 grama de massa convertida em pura energia liberaria ~21 quilotons de energia (como uma bomba atômica). É assim que o Sol produz energia: fusão nuclear converte massa em luz!"
      },
      {
        pergunta: "O que é entropia na Termodinâmica?",
        opcoes: [
          "A energia total de um sistema",
          "Uma medida da desordem de um sistema",
          "A temperatura máxima possível",
          "A velocidade das partículas"
        ],
        correta: 1,
        fato: "🌡️ A 2ª Lei da Termodinâmica: a entropia do universo só aumenta. Você pode misturar café com leite facilmente, mas nunca separar de volta! É por isso que o tempo tem uma \"direção\" — do passado para o futuro."
      },
      {
        pergunta: "O que é um qubit na computação quântica?",
        opcoes: [
          "Um bit muito rápido",
          "Uma unidade que pode ser 0 e 1 ao mesmo tempo",
          "Um tipo de chip especial",
          "Um protocolo de segurança"
        ],
        correta: 1,
        fato: "⚛️ Um computador com 300 qubits pode representar mais estados simultâneos do que átomos no universo! Isso permite resolver problemas de criptografia, descoberta de medicamentos e otimização exponencialmente mais rápido."
      },
      {
        pergunta: "Qual é a velocidade da luz no vácuo?",
        opcoes: ["100.000 km/s", "300.000 km/s", "1.000.000 km/s", "150.000 km/s"],
        correta: 1,
        fato: "💡 c = 299.792.458 m/s — o limite máximo do universo. Pela relatividade, nada com massa pode alcançá-la. O GPS precisa de correções relativísticas porque os satélites se movem rápido o suficiente para o tempo deles correr diferente!"
      },
      {
        pergunta: "O que estuda a Mecânica Quântica?",
        opcoes: [
          "O movimento de planetas",
          "O comportamento de partículas subatômicas",
          "A resistência dos materiais",
          "A propagação do som"
        ],
        correta: 1,
        fato: "🔬 Sem Mecânica Quântica não existiriam transistores (base do computador), lasers (base da fibra óptica), IRM hospitalar, nem energia nuclear. É a teoria mais bem testada e precisa de toda a ciência!"
      }
    ]
  },
  {
    id: "inv_quiz_filosofia2",
    tipo: "quiz",
    titulo: "Filosofia e Lógica Formal",
    descricao: "Raciocínio crítico e lógica avançada!",
    emoji: "🧠",
    habilidade: "Pensamento Crítico",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "O clube de debate filosófico vai representar o Brasil em uma competição internacional! 🧠 Você foi indicado como membro. O treinamento começa com esses desafios de lógica e filosofia.",
    perguntas: [
      {
        pergunta: "O que é o \"Dilema do Bonde\" (Trolley Problem)?",
        opcoes: [
          "Um problema de transporte público",
          "Um experimento mental sobre escolhas éticas difíceis",
          "Um problema de física clássica",
          "Uma questão de gestão empresarial"
        ],
        correta: 1,
        fato: "🤔 Criado pela filósofa Philippa Foot em 1967: você pode desviar um bonde para matar 1 em vez de 5? Expõe o conflito entre consequencialismo (salvar mais) e deontologia (não matar ativamente). Não há resposta certa!"
      },
      {
        pergunta: "Quem disse \"Penso, logo existo\" (Cogito, ergo sum)?",
        opcoes: ["Platão", "Sócrates", "Descartes", "Kant"],
        correta: 2,
        fato: "🧠 René Descartes (1596-1650) duvidou de tudo até concluir: a única certeza é que ele estava duvidando, logo pensava, logo existia. É o ponto de partida do racionalismo e da filosofia moderna."
      },
      {
        pergunta: "O que é lógica booleana?",
        opcoes: [
          "Um tipo de sentimento",
          "Um sistema lógico com valores verdadeiro/falso",
          "Matemática de grandes números",
          "Uma teoria sobre o universo"
        ],
        correta: 1,
        fato: "💡 George Boole criou a álgebra booleana em 1854. Claude Shannon mostrou em 1937 que circuitos elétricos podiam implementá-la. Resultado: todo computador opera em lógica booleana — AND, OR, NOT são as operações base!"
      },
      {
        pergunta: "O que é uma falácia lógica?",
        opcoes: [
          "Um argumento muito poderoso",
          "Um erro de raciocínio que parece válido mas não é",
          "Uma prova matemática complexa",
          "Um método científico rigoroso"
        ],
        correta: 1,
        fato: "💬 Exemplos: \"Ad hominem\" (atacar a pessoa, não o argumento), \"Homem de palha\" (distorcer o argumento do oponente), \"Apelo à autoridade\". Reconhecer falácias é essencial na era das fake news!"
      },
      {
        pergunta: "O que o Teorema da Incompletude de Gödel provou?",
        opcoes: [
          "Que a matemática é perfeita e completa",
          "Que em qualquer sistema formal há verdades que não podem ser provadas",
          "Que a geometria euclidiana está errada",
          "Que a física quântica é impossível de entender"
        ],
        correta: 1,
        fato: "🔀 Kurt Gödel (1931) provou que qualquer sistema matemático suficientemente complexo terá afirmações verdadeiras que não podem ser provadas dentro do próprio sistema. A matemática tem limites inerentes — um resultado que chocou o mundo!"
      }
    ]
  },
  {
    id: "inv_memoria_linguagens_2",
    tipo: "memoria",
    titulo: "Linguagens de Programação",
    descricao: "Combine cada linguagem com sua especialidade!",
    emoji: "🖥️",
    habilidade: "Memória",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "A conferência de tecnologia reuniu as maiores linguagens de programação do mundo! 🖥️ Cada uma veio com sua área de especialidade. Você consegue combiná-las corretamente?",
    pares: [
      {
        emoji: "🐍",
        nome: "Python — IA e Machine Learning",
        info: "\"Batteries included\" — a linguagem mais popular para ciência de dados e IA"
      },
      {
        emoji: "🌐",
        nome: "JavaScript — Web front-end",
        info: "A única linguagem que roda nativamente em todos os navegadores"
      },
      {
        emoji: "☕",
        nome: "Java — Android e backend empresarial",
        info: "\"Write once, run anywhere\" — executa em qualquer sistema"
      },
      {
        emoji: "🔵",
        nome: "C++ — Games e sistemas operacionais",
        info: "Unreal Engine e o núcleo do Windows são escritos em C++"
      },
      {
        emoji: "🦀",
        nome: "Rust — Sistemas seguros sem bugs de memória",
        info: "Adotado no kernel Linux — substitui C em sistemas críticos"
      },
      {
        emoji: "🍎",
        nome: "Swift — Apps para iOS e macOS",
        info: "Criado pela Apple em 2014 para substituir Objective-C"
      },
      {
        emoji: "🎯",
        nome: "Kotlin — Android oficial",
        info: "Linguagem oficial do Android desde 2019, mais moderna que Java"
      },
      {
        emoji: "📊",
        nome: "R — Estatística e ciência de dados",
        info: "Dominante em pesquisa acadêmica e análise estatística"
      }
    ]
  },
  {
    id: "inv_memoria_estruturas",
    tipo: "memoria",
    titulo: "Estruturas de Dados",
    descricao: "As estruturas fundamentais da computação!",
    emoji: "🗂️",
    habilidade: "Memória",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "A entrevista técnica da startup de tecnologia está chegando! 🗂️ O entrevistador vai perguntar sobre estruturas de dados. Memorize bem os conceitos para mandar bem!",
    pares: [
      {
        emoji: "📚",
        nome: "Array — acesso indexado O(1)",
        info: "Elementos em sequência — acesso direto pelo índice"
      },
      {
        emoji: "🔗",
        nome: "Lista ligada — inserção O(1)",
        info: "Elementos conectados por ponteiros — ótima para inserção"
      },
      {
        emoji: "📥",
        nome: "Pilha (Stack) — LIFO",
        info: "Último a entrar, primeiro a sair. Ex: Ctrl+Z (desfazer)"
      },
      {
        emoji: "🚶",
        nome: "Fila (Queue) — FIFO",
        info: "Primeiro a entrar, primeiro a sair. Ex: fila da impressora"
      },
      {
        emoji: "🌳",
        nome: "Árvore binária — busca O(log n)",
        info: "Hierarquia com nó raiz e filhos — base dos bancos de dados"
      },
      {
        emoji: "#️⃣",
        nome: "Hash Table — busca O(1)",
        info: "Mapeamento chave-valor — base dos dicionários em Python"
      },
      {
        emoji: "🗺️",
        nome: "Grafo — redes e caminhos",
        info: "Nós conectados por arestas — usado em GPS e redes sociais"
      },
      {
        emoji: "🔴",
        nome: "Heap — fila de prioridade",
        info: "Mantém o máximo/mínimo na raiz — usado em algoritmos de ordenação"
      }
    ]
  },
  {
    id: "inv_memoria_cientistas",
    tipo: "memoria",
    titulo: "Cientistas que Mudaram o Mundo",
    descricao: "Combine cada cientista com sua maior contribuição!",
    emoji: "🔭",
    habilidade: "Memória",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "O Hall da Fama da Ciência vai inaugurar uma nova ala! 🔭 As placas com os nomes e descobertas se misturaram. Combine corretamente para que a inauguração aconteça.",
    pares: [
      {
        emoji: "🌌",
        nome: "Einstein — Teoria da Relatividade",
        info: "E=mc² em 1905 — o \"ano miraculoso\" com 4 artigos revolucionários"
      },
      {
        emoji: "🍎",
        nome: "Newton — Mecânica Clássica",
        info: "Principia Mathematica (1687) descreveu o universo por 200 anos"
      },
      {
        emoji: "🌠",
        nome: "Hubble — Universo em expansão",
        info: "Provou em 1923 que existem outras galáxias além da Via Láctea"
      },
      {
        emoji: "🧬",
        nome: "Darwin — Teoria da Evolução",
        info: "\"A Origem das Espécies\" (1859) transformou a biologia para sempre"
      },
      {
        emoji: "⚛️",
        nome: "Curie — Radioatividade",
        info: "Única pessoa com Nobel em 2 ciências diferentes: Física e Química"
      },
      {
        emoji: "🔬",
        nome: "Pasteur — Teoria dos Germes",
        info: "Provou que microrganismos causam doenças — base da medicina moderna"
      },
      {
        emoji: "💻",
        nome: "Turing — Computação moderna",
        info: "Criou o conceito teórico do computador e quebrou códigos na 2ª Guerra"
      },
      {
        emoji: "🔵",
        nome: "Bohr — Modelo atômico quântico",
        info: "Provou que elétrons saltam entre órbitas ao absorver/emitir energia"
      }
    ]
  },
  {
    id: "inv_seq_complexidade",
    tipo: "sequencia",
    titulo: "Complexidade Algorítmica",
    descricao: "Sequências de notação Big-O e eficiência!",
    emoji: "📊",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "O teste de eficiência algorítmica está rolando! 📊 Para aprovar seu código na empresa de tecnologia, você precisa entender notação Big-O e progressões de complexidade.",
    contexto_matematico: "Notação Big-O descreve como o tempo de execução cresce com a entrada. O(1) é ideal (constante). O(n²) é lento para entradas grandes. O(2ⁿ) é inviável para n>50. Escolher o algoritmo certo pode fazer a diferença entre 1ms e 1 ano!",
    sequencias: [
      {
        items: ["O(1)", "O(log n)", "O(n)", "O(n log n)", "❓"],
        resposta: "O(n²)",
        opcoes: ["O(n)", "O(n²)", "O(2ⁿ)", "O(n!)"]
      },
      {
        items: ["2⁰", "2¹", "2²", "2³", "❓"],
        resposta: "2⁴",
        opcoes: ["2³", "2⁴", "2⁵", "16"]
      },
      {
        items: ["n=1", "n=2", "n=4", "n=8", "❓"],
        resposta: "n=16",
        opcoes: ["n=12", "n=14", "n=16", "n=32"]
      },
      {
        items: ["SELECT", "FROM", "WHERE", "GROUP BY", "❓"],
        resposta: "HAVING",
        opcoes: ["HAVING", "ORDER BY", "LIMIT", "JOIN"]
      },
      {
        items: ["1ms", "10ms", "100ms", "1s", "❓"],
        resposta: "10s",
        opcoes: ["5s", "10s", "60s", "100s"]
      }
    ]
  },
  {
    id: "inv_seq_binario",
    tipo: "sequencia",
    titulo: "Sistemas Numéricos",
    descricao: "Binário, hexadecimal e lógica booleana!",
    emoji: "🔢",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "O sistema de criptografia da empresa foi ativado! 🔢 Para descriptografar os dados secretos, você precisa dominar sistemas numéricos binários e hexadecimais. Prepare-se!",
    contexto_matematico: "Computadores usam binário (base 2: 0 e 1). Hexadecimal (base 16: 0-9, A-F) é mais compacto para representar dados. 1 byte = 8 bits = 2 dígitos hexadecimais. Cores HTML usam hex: #FF0000 é vermelho puro.",
    sequencias: [
      {
        items: ["0000", "0001", "0010", "0011", "❓"],
        resposta: "0100",
        opcoes: ["0011", "0100", "0101", "1000"]
      },
      {
        items: ["1", "10", "11", "100", "❓"],
        resposta: "101",
        opcoes: ["101", "110", "111", "1000"]
      },
      {
        items: ["0x0", "0x1", "0xA", "0xF", "❓"],
        resposta: "0x10",
        opcoes: ["0x9", "0xE", "0x10", "0xFF"]
      },
      {
        items: ["AND", "OR", "NOT", "XOR", "❓"],
        resposta: "NAND",
        opcoes: ["AND", "NOR", "NAND", "XNOR"]
      },
      {
        items: ["#000", "#333", "#666", "#999", "❓"],
        resposta: "#CCC",
        opcoes: ["#AAA", "#BBB", "#CCC", "#FFF"]
      }
    ]
  },
  {
    id: "inv_seq_avancado",
    tipo: "sequencia",
    titulo: "Progressões Avançadas",
    descricao: "Fibonacci, fatoriais e funções matemáticas!",
    emoji: "∞",
    habilidade: "Lógica Matemática",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "A competição de matemática avançada chegou ao estágio final! ∞ Apenas 5 participantes chegaram até aqui. Essas progressões separaram os melhores dos melhores. Boa sorte!",
    contexto_matematico: "O fatorial cresce incrivelmente rápido: 10! = 3.628.800. A sequência de Fibonacci converge para a razão áurea φ ≈ 1,618. Funções trigonométricas descrevem ondas, sons e sinais digitais.",
    sequencias: [
      {
        items: ["1", "1", "2", "3", "5", "8", "❓"],
        resposta: "13",
        opcoes: ["11", "12", "13", "21"]
      },
      {
        items: ["0!", "1!", "2!", "3!", "❓"],
        resposta: "24",
        opcoes: ["8", "16", "24", "120"]
      },
      {
        items: ["π/6", "π/4", "π/3", "π/2", "❓"],
        resposta: "π",
        opcoes: ["2π/3", "3π/4", "π", "5π/6"]
      },
      {
        items: ["sin0°", "sin30°", "sin45°", "sin60°", "❓"],
        resposta: "1",
        opcoes: ["√2/2", "√3/2", "1", "0"]
      },
      {
        items: ["e⁰", "e¹", "e²", "e³", "❓"],
        resposta: "e⁴",
        opcoes: ["e⁴", "e⁵", "4e", "e+4"]
      }
    ]
  },
  {
    id: "inv_formas_geometricas",
    tipo: "formas",
    titulo: "Formas Geométricas",
    descricao: "Geometria euclidiana — do plano às formas fundamentais!",
    emoji: "🔷",
    habilidade: "Raciocínio Espacial",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "Euclides formalizou a geometria há 2.300 anos e ela ainda é a base da computação gráfica, da física e da engenharia. 🔷 Cada forma tem propriedades matemáticas únicas. Explore clicando em 🔊!"
  },
  {
    id: "inv_cores",
    tipo: "cores",
    titulo: "As Cores",
    descricao: "Espectro visível, luz e percepção — a física das cores!",
    emoji: "🌈",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "Newton descobriu que a luz branca contém todas as cores do espectro! 🌈 Monitores usam RGB (vermelho, verde, azul) — 3 cores que formam 16 milhões de combinações. Explore cada cor clicando em 🔊!"
  },
  {
    id: "inv_alfabeto",
    tipo: "alfabeto",
    titulo: "O Alfabeto",
    descricao: "Fonética, etimologia e o sistema de escrita latino!",
    emoji: "🔤",
    habilidade: "Linguagem",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 15,
    historinha: "O alfabeto latino descende do fenício via grego — tem mais de 3.000 anos! 🔤 Linguistas estudam como os sons das letras evoluíram ao longo dos séculos. Explore cada letra clicando em 🔊!"
  }
]

// ── Colorir ──
export const colorirExtraPorFaixa = [
  {
    id: "inv_colorir_cidade",
    tipo: "colorir",
    titulo: "Colorir: Cidade",
    descricao: "Pinte o horizonte da cidade ao entardecer!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "Essa cidade acabou de ser construída e ainda não tem cor nenhuma! 🏙️ Escolha as cores e pinte cada prédio.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Cidade",
        regioes: [
          {
            id: "ceu",
            tipo: "rect",
            props: {
              x: 0,
              y: 0,
              width: 300,
              height: 300
            }
          },
          {
            id: "sol_fundo",
            tipo: "circle",
            props: {
              cx: 250,
              cy: 60,
              r: 25
            }
          },
          {
            id: "predio5",
            tipo: "rect",
            props: {
              x: 0,
              y: 175,
              width: 36,
              height: 95
            }
          },
          {
            id: "predio1",
            tipo: "rect",
            props: {
              x: 40,
              y: 140,
              width: 50,
              height: 130
            }
          },
          {
            id: "predio2",
            tipo: "rect",
            props: {
              x: 100,
              y: 90,
              width: 55,
              height: 180
            }
          },
          {
            id: "predio3",
            tipo: "rect",
            props: {
              x: 165,
              y: 120,
              width: 45,
              height: 150
            }
          },
          {
            id: "predio4",
            tipo: "rect",
            props: {
              x: 220,
              y: 160,
              width: 50,
              height: 110
            }
          },
          {
            id: "predio6",
            tipo: "rect",
            props: {
              x: 274,
              y: 145,
              width: 26,
              height: 125
            }
          },
          {
            id: "chao",
            tipo: "rect",
            props: {
              x: 0,
              y: 270,
              width: 300,
              height: 30
            }
          },
          {
            id: "janela1",
            tipo: "rect",
            decorativo: true,
            props: {
              x: 110,
              y: 106,
              width: 14,
              height: 14
            },
            cor: "#FDE68A"
          },
          {
            id: "janela2",
            tipo: "rect",
            decorativo: true,
            props: {
              x: 132,
              y: 106,
              width: 14,
              height: 14
            },
            cor: "#FDE68A"
          },
          {
            id: "janela3",
            tipo: "rect",
            decorativo: true,
            props: {
              x: 110,
              y: 136,
              width: 14,
              height: 14
            },
            cor: "#FDE68A"
          },
          {
            id: "janela4",
            tipo: "rect",
            decorativo: true,
            props: {
              x: 132,
              y: 136,
              width: 14,
              height: 14
            },
            cor: "#FDE68A"
          },
          {
            id: "janela5",
            tipo: "rect",
            decorativo: true,
            props: {
              x: 110,
              y: 166,
              width: 14,
              height: 14
            },
            cor: "#FDE68A"
          },
          {
            id: "janela6",
            tipo: "rect",
            decorativo: true,
            props: {
              x: 132,
              y: 166,
              width: 14,
              height: 14
            },
            cor: "#FDE68A"
          }
        ]
      }
    }
  },
  {
    id: "inv_colorir_sistema_solar",
    tipo: "colorir",
    titulo: "Colorir: Sistema Solar",
    descricao: "Pinte o Sol e os planetas!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "O Sol e os planetas estão esperando suas cores reais! 🪐 Escolha as cores e pinte cada um.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Sistema Solar",
        regioes: [
          {
            id: "fundo_espaco",
            tipo: "rect",
            props: {
              x: 0,
              y: 0,
              width: 300,
              height: 300
            }
          },
          {
            id: "sol",
            tipo: "circle",
            props: {
              cx: 40,
              cy: 150,
              r: 30
            }
          },
          {
            id: "planeta1",
            tipo: "circle",
            props: {
              cx: 100,
              cy: 150,
              r: 15
            }
          },
          {
            id: "planeta2",
            tipo: "circle",
            props: {
              cx: 142,
              cy: 150,
              r: 17
            }
          },
          {
            id: "planeta3",
            tipo: "circle",
            props: {
              cx: 182,
              cy: 150,
              r: 14
            }
          },
          {
            id: "anel_planeta4",
            tipo: "ellipse",
            props: {
              cx: 234,
              cy: 150,
              rx: 36,
              ry: 16
            }
          },
          {
            id: "planeta4",
            tipo: "circle",
            props: {
              cx: 234,
              cy: 150,
              r: 20
            }
          },
          {
            id: "planeta5",
            tipo: "circle",
            props: {
              cx: 285,
              cy: 150,
              r: 15
            }
          }
        ]
      }
    }
  },
  {
    id: "inv_colorir_ponte",
    tipo: "colorir",
    titulo: "Colorir: Ponte",
    descricao: "Pinte a ponte suspensa e a paisagem!",
    emoji: "🖍️",
    habilidade: "Coordenação",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "Essa ponte suspensa acabou de ser inaugurada, mas ainda está sem cor! 🌉 Escolha as cores e pinte cada parte.",
    dados: {
      desenho: {
        viewBox: 300,
        nome: "Ponte",
        regioes: [
          {
            id: "ceu",
            tipo: "rect",
            props: {
              x: 0,
              y: 0,
              width: 300,
              height: 210
            }
          },
          {
            id: "agua",
            tipo: "rect",
            props: {
              x: 0,
              y: 210,
              width: 300,
              height: 90
            }
          },
          {
            id: "cabo_esquerdo",
            tipo: "polygon",
            props: {
              points: "68,56 150,124 78,124"
            }
          },
          {
            id: "cabo_direito",
            tipo: "polygon",
            props: {
              points: "232,56 150,124 222,124"
            }
          },
          {
            id: "torre_esquerda",
            tipo: "rect",
            props: {
              x: 54,
              y: 56,
              width: 28,
              height: 86
            }
          },
          {
            id: "torre_direita",
            tipo: "rect",
            props: {
              x: 218,
              y: 56,
              width: 28,
              height: 86
            }
          },
          {
            id: "pilar_esquerdo",
            tipo: "rect",
            props: {
              x: 58,
              y: 164,
              width: 28,
              height: 76
            }
          },
          {
            id: "pilar_direito",
            tipo: "rect",
            props: {
              x: 214,
              y: 164,
              width: 28,
              height: 76
            }
          },
          {
            id: "tabuleiro",
            tipo: "rect",
            props: {
              x: 38,
              y: 132,
              width: 224,
              height: 32,
              rx: 6
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
    id: "inv_cores_espectro",
    tipo: "cores",
    titulo: "Espectro de Luz Visível",
    descricao: "A física da luz e as cores do espectro eletromagnético!",
    emoji: "🌈",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "A luz branca do sol esconde todas as cores do espectro! 🌈 Newton provou isso em 1666 com um prisma. Cada cor tem um comprimento de onda único. Explore a física das cores clicando em 🔊!",
    dados: {
      cores: [
        {
          id: "esp-vm",
          nome: "Vermelho",
          hex: "#B71C1C",
          emoji: "🔴",
          exemplo: "limite vermelho do espectro",
          funfato: "Além do vermelho existe o infravermelho — invisível para nós, mas cobras enxergam nessa faixa!",
          detalhe: "700nm | ~430THz | Limiar com infravermelho (>700nm) | Temperatura de cor: ~3.000K"
        },
        {
          id: "esp-la",
          nome: "Laranja",
          hex: "#E65100",
          emoji: "🟠",
          exemplo: "segunda cor do espectro",
          funfato: "Estrelas frias (3.000K) brilham em laranja-vermelho — como uma brasa quente!",
          detalhe: "620-700nm | ~480THz | Estrelas tipo K têm pico nessa faixa"
        },
        {
          id: "esp-am",
          nome: "Amarelo",
          hex: "#F57F17",
          emoji: "⭐",
          exemplo: "terceira cor do espectro",
          funfato: "O Sol tem 5.778K e emite mais luz amarela-verde — por isso parece branco-amarelado!",
          detalhe: "570-620nm | ~520THz | Pico solar em ~500nm (amarelo-verde)"
        },
        {
          id: "esp-vd",
          nome: "Verde",
          hex: "#1B5E20",
          emoji: "💚",
          exemplo: "centro do espectro visível",
          funfato: "O olho humano é mais sensível ao verde do que a qualquer outra cor — evoluímos para ver florestas!",
          detalhe: "495-570nm | ~580THz | Pico de sensibilidade fotópica humana em 555nm"
        },
        {
          id: "esp-az",
          nome: "Azul",
          hex: "#0D47A1",
          emoji: "💙",
          exemplo: "quinta cor do espectro",
          funfato: "Reatores nucleares brilham em azul-violeta dentro da água (Efeito Cherenkov)!",
          detalhe: "450-495nm | ~680THz | Espalhamento Rayleigh explica por que o céu é azul"
        },
        {
          id: "esp-an",
          nome: "Anil",
          hex: "#283593",
          emoji: "🌃",
          exemplo: "sexta cor do espectro",
          funfato: "Newton adicionou o anil ao arco-íris por superstição — 7 era número sagrado para ele!",
          detalhe: "420-450nm | ~720THz | Newton o adicionou para completar 7 cores"
        },
        {
          id: "esp-vi",
          nome: "Violeta",
          hex: "#4A148C",
          emoji: "🔮",
          exemplo: "limite violeta do espectro",
          funfato: "Além do violeta existe o ultravioleta — invisível para nós, mas abelhas enxergam!",
          detalhe: "380-420nm | ~750THz | Limiar com ultravioleta (<380nm) | Causa bronzeado"
        }
      ]
    }
  },
  {
    id: "inv_cores_percep",
    tipo: "cores",
    titulo: "Percepção Visual da Cor",
    descricao: "Como nossos olhos e cérebro processam as cores!",
    emoji: "👁️",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "Ver cores é um processo incrível — envolve física, biologia e neurociência! 👁️ Descubra como seus olhos funcionam como uma câmera de 3 sensores. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "per-cS",
          nome: "Cones S (Azul)",
          hex: "#283593",
          emoji: "💙",
          exemplo: "cones sensíveis ao azul-violeta",
          funfato: "Cones S são os menos numerosos — apenas 2% de todos os cones da retina!",
          detalhe: "Short λ | Pico em 420nm | ~6 milhões de cones total | 2% são S"
        },
        {
          id: "per-cM",
          nome: "Cones M (Verde)",
          hex: "#2E7D32",
          emoji: "💚",
          exemplo: "cones sensíveis ao verde",
          funfato: "Cones M são os mais sensíveis à luminosidade geral da cena!",
          detalhe: "Medium λ | Pico em 530nm | ~33% dos cones | Responsáveis por distinção de verdes"
        },
        {
          id: "per-cL",
          nome: "Cones L (Vermelho)",
          hex: "#C62828",
          emoji: "❤️",
          exemplo: "cones sensíveis ao vermelho",
          funfato: "Cones L são os mais abundantes — ~65% de todos os cones da retina!",
          detalhe: "Long λ | Pico em 564nm (não 700!) | ~65% dos cones | Processamento de vermelhos"
        },
        {
          id: "per-bast",
          nome: "Bastonetes",
          hex: "#212121",
          emoji: "🌑",
          exemplo: "visão noturna em preto e branco",
          funfato: "Bastonetes são 20x mais sensíveis que cones — permitem ver na quase-escuridão!",
          detalhe: "120 milhões de bastonetes | Pico em 498nm (azul-esverdeado) | Sem cor (escotópica)"
        },
        {
          id: "per-dal",
          nome: "Daltonismo",
          hex: "#9E9D24",
          emoji: "🔤",
          exemplo: "confusão entre vermelho e verde",
          funfato: "Daltonismo afeta 8% dos homens — o mais comum é não distinguir vermelho de verde!",
          detalhe: "Gene OPN1LW no cromossomo X | Recessivo ligado ao X | Mais comum em homens"
        },
        {
          id: "per-tet",
          nome: "Tetracromatas",
          hex: "#CE93D8",
          emoji: "👁️",
          exemplo: "visão com 4 tipos de cones!",
          funfato: "Algumas mulheres têm 4 tipos de cones e enxergam 100x mais cores que nós!",
          detalhe: "Gene extra no X | ~12% das mulheres portadoras | Podem ver 100 milhões de cores"
        }
      ]
    }
  },
  {
    id: "inv_cores_quimica_pig",
    tipo: "cores",
    titulo: "Química dos Pigmentos",
    descricao: "A ciência por trás das cores que usamos há milênios!",
    emoji: "⚗️",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "Antes da química moderna, pigmentos eram mais valiosos que ouro! ⚗️ Cada cor tinha uma história e um custo absurdo. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "pig-laz",
          nome: "Azul Ultramarino",
          hex: "#1565C0",
          emoji: "💎",
          exemplo: "do lápis-lazúli — R$50.000/kg!",
          funfato: "Ultramarino original era feito de lápis-lazúli — valia mais que ouro no século XIV!",
          detalhe: "Lazurita: Na₆Al₆Si₆O₂₄S₄ | Só no Afeganistão | Preço > ouro até séc. XIX"
        },
        {
          id: "pig-pru",
          nome: "Azul da Prússia",
          hex: "#003153",
          emoji: "🔬",
          exemplo: "pigmento acidental de 1704",
          funfato: "Azul da Prússia foi inventado por acidente em 1704 — o primeiro pigmento sintético!",
          detalhe: "Fe₄[Fe(CN)₆]₃ | Descoberto por Diesbach em 1704 | Primeiro pigmento artificial"
        },
        {
          id: "pig-coc",
          nome: "Carmim Cochonilha",
          hex: "#C62828",
          emoji: "🐛",
          exemplo: "vermelho feito de insetos!",
          funfato: "Batom e iogurte de morango podem conter carmim — feito de insetos esmagados!",
          detalhe: "Ácido carmínico de Dactylopius coccus | 70.000 insetos por 450g | Aditivo E120"
        },
        {
          id: "pig-ti",
          nome: "Branco de Titânio",
          hex: "#F5F5F5",
          emoji: "⬜",
          exemplo: "o branco moderno mais usado",
          funfato: "TiO₂ é tão branco e seguro que é usado em alimentos, cosméticos e protetor solar!",
          detalhe: "TiO₂ | Opacidade máxima | Aditivo E171 em alimentos | SPF em protetores solares"
        },
        {
          id: "pig-ver",
          nome: "Verde Paris",
          hex: "#00695C",
          emoji: "☠️",
          exemplo: "pigmento verde vitoriano tóxico",
          funfato: "Verde Paris era um verde elegante da era vitoriana — e mata por arsênio!",
          detalhe: "Cu(CH₃COO)₂·3Cu(AsO₂)₂ | Arsenito de cobre | Matou Napoleão? Hipótese debatida"
        },
        {
          id: "pig-inl",
          nome: "Índigo Natural",
          hex: "#283593",
          emoji: "👖",
          exemplo: "cor dos jeans — de planta!",
          funfato: "O índigo original vinha da planta Indigofera — hoje os jeans usam sintético!",
          detalhe: "C₁₆H₁₀N₂O₂ | Indigofera tinctoria | Índia > Europa | Sintético desde 1897 (BASF)"
        },
        {
          id: "pig-orpr",
          nome: "Ouro Vermelho Antigo",
          hex: "#9B2335",
          emoji: "🏺",
          exemplo: "vermelho raro da Antiguidade",
          funfato: "Púrpura de Tiro era feita de 12.000 moluscos por grama — só reis podiam comprar!",
          detalhe: "6,6-dibromoindigo | Murex brandaris e trunculus | Fenício | Cor do poder absoluto"
        },
        {
          id: "pig-och",
          nome: "Ocre Natural",
          hex: "#E65100",
          emoji: "🏕️",
          exemplo: "o pigmento mais antigo da Terra",
          funfato: "Ocre vermelho foi encontrado em pinturas rupestres de 300.000 anos — o pigmento mais antigo!",
          detalhe: "Fe₂O₃ hidratado | Hematita limonítica | Pinturas de Blombos Cave: 75.000 a.C."
        }
      ]
    }
  },
  {
    id: "inv_cores_astro",
    tipo: "cores",
    titulo: "Cores das Estrelas",
    descricao: "A temperatura de uma estrela determina sua cor!",
    emoji: "⭐",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "Estrelas não são todas da mesma cor! ⭐ A cor da estrela revela sua temperatura superficial. O nosso Sol é amarelo-branco — mas parece amarelo daqui. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "ast-O",
          nome: "Azul (Tipo O)",
          hex: "#BBDEFB",
          emoji: "💙",
          exemplo: "estrela azul: >30.000K!",
          funfato: "Estrelas azuis vivem apenas 10 milhões de anos — versus 10 bilhões do Sol!",
          detalhe: "Tipo O | >30.000K | λ pico <100nm | Raras e massivas | Rigel (Órion) é azul"
        },
        {
          id: "ast-B",
          nome: "Azul-Branco (Tipo B)",
          hex: "#90CAF9",
          emoji: "🔵",
          exemplo: "estrela azul-branca: 10.000K",
          funfato: "Rigel, uma das estrelas mais brilhantes do céu, é uma estrela Tipo B!",
          detalhe: "Tipo B | 10.000-30.000K | Rigel: ~12.000K | Curta vida | Alta luminosidade"
        },
        {
          id: "ast-A",
          nome: "Branco (Tipo A)",
          hex: "#E3F2FD",
          emoji: "⬜",
          exemplo: "estrela branca: 7.500K",
          funfato: "Vega, usada como padrão de magnitude estelar, é uma estrela Tipo A branca!",
          detalhe: "Tipo A | 7.500-10.000K | Vega: 9.600K | Padrão de magnitude zero"
        },
        {
          id: "ast-F",
          nome: "Amarelo-Branco (Tipo F)",
          hex: "#FFF9C4",
          emoji: "🌟",
          exemplo: "estrela amarelo-branca: 6.500K",
          funfato: "Canopus, segunda estrela mais brilhante, é Tipo F — levemente amarelada!",
          detalhe: "Tipo F | 6.000-7.500K | Canopus | Procyon | Transição quente-fria"
        },
        {
          id: "ast-G",
          nome: "Amarelo (Tipo G — Sol!)",
          hex: "#FDD835",
          emoji: "☀️",
          exemplo: "estrela amarela: 5.778K (nosso Sol!)",
          funfato: "Nosso Sol é Tipo G — parecido com bilhões de outras estrelas na galáxia!",
          detalhe: "Tipo G | 5.200-6.000K | Sol: 5.778K | 10 bilhões de anos de vida | Alpha Centauri A"
        },
        {
          id: "ast-K",
          nome: "Laranja (Tipo K)",
          hex: "#FF6F00",
          emoji: "🟠",
          exemplo: "estrela laranja: 4.500K",
          funfato: "Arcturus, a mais brilhante do hemisfério norte, é uma gigante laranja Tipo K!",
          detalhe: "Tipo K | 3.700-5.200K | Arcturus | Tau Ceti | Candidatos a vida extraterrestre"
        }
      ]
    }
  },
  {
    id: "inv_cores_biolum",
    tipo: "cores",
    titulo: "Bioluminescência",
    descricao: "Seres vivos que produzem sua própria luz!",
    emoji: "✨",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "Imagine produzir sua própria luz como uma lanterna viva! ✨ Vaga-lumes, polvos e cogumelos fazem isso com química pura. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "bio-vag",
          nome: "Verde Vaga-lume",
          hex: "#76FF03",
          emoji: "🐛",
          exemplo: "luz verde do vaga-lume",
          funfato: "O vaga-lume converte 96% de energia em luz — a lâmpada LED converte apenas 60%!",
          detalhe: "Luciferina + Luciferase + ATP + O₂ | Emite ~560nm (verde-amarelo) | 96% eficiência"
        },
        {
          id: "bio-gfp",
          nome: "Verde GFP",
          hex: "#00E676",
          emoji: "🧬",
          exemplo: "proteína fluorescente da água-viva",
          funfato: "A proteína GFP da água-viva ganhou o Nobel em 2008 — hoje usada em pesquisa médica!",
          detalhe: "GFP: Green Fluorescent Protein | Nobel 2008 | Marcador de genes in vivo"
        },
        {
          id: "bio-din",
          nome: "Azul Dinoflagelado",
          hex: "#283593",
          emoji: "🌊",
          exemplo: "ondas brilhantes azuis à noite",
          funfato: "Praias com plâncton dinoflagelado brilham azul-violeta quando as ondas batem!",
          detalhe: "Noctiluca scintillans | Luciferina oxetanoic | Mecânica: estresse mecânico ativa"
        },
        {
          id: "bio-pal",
          nome: "Azul Peixe Abissal",
          hex: "#01579B",
          emoji: "🐟",
          exemplo: "peixe lanterna do fundo do mar",
          funfato: "No fundo do oceano (sem luz) peixes usam bioluminescência para encontrar alimento!",
          detalhe: "Fotóforos: órgãos luz | Myctophidae | Emitem azul-verde (~490nm) no abismo"
        },
        {
          id: "bio-cog",
          nome: "Amarelo Cogumelo",
          hex: "#F9A825",
          emoji: "🍄",
          exemplo: "cogumelo que brilha no escuro",
          funfato: "Alguns cogumelos brilham à noite — eles usam a luz para atrair insetos!",
          detalhe: "Mycena chlorophos | Hifas bioluminescentes | Atrai insetos para espalhar esporos"
        },
        {
          id: "bio-bact",
          nome: "Azul Bacteriana",
          hex: "#0288D1",
          emoji: "🔬",
          exemplo: "bactéria que faz o mar brilhar",
          funfato: "Vibrio harveyi são bactérias marinhas que sincronizam sua luminescência em grupo!",
          detalhe: "Quorum sensing | Só brilham em grupo acima de densidade crítica | Luciferina bacteriana"
        }
      ]
    }
  },
  {
    id: "inv_cores_uv_ir",
    tipo: "cores",
    titulo: "Além do Visível: UV e IR",
    descricao: "As cores que existem mas nossos olhos não veem!",
    emoji: "🔭",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "O espectro visível é apenas uma fatia minúscula da luz que existe! 🔭 UV e infravermelho existem — mas somos cegos para eles. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "uv-a",
          nome: "UV-A (315-400nm)",
          hex: "#CE93D8",
          emoji: "🌞",
          exemplo: "UV que causa bronzeamento",
          funfato: "UV-A penetra vidro — óculos de sol precisam filtrar UV especificamente!",
          detalhe: "315-400nm | Penetra mais profundo na pele | Envelhece a pele | Passa pelo vidro"
        },
        {
          id: "uv-b",
          nome: "UV-B (280-315nm)",
          hex: "#9C27B0",
          emoji: "☀️",
          exemplo: "UV que sintetiza vitamina D",
          funfato: "UV-B é quem fabrica vitamina D na pele — mas também causa queimaduras solares!",
          detalhe: "280-315nm | Produz Vitamina D₃ | SPF só bloqueia UV-B! | Causa eritema"
        },
        {
          id: "uv-c",
          nome: "UV-C (100-280nm)",
          hex: "#6A1B9A",
          emoji: "🦠",
          exemplo: "UV germicida — esterilização",
          funfato: "UV-C destrói DNA de vírus e bactérias — usado em hospitais para esterilizar!",
          detalhe: "100-280nm | Bloqueado pela camada de ozônio | λ 254nm: máxima eficiência germicida"
        },
        {
          id: "ir-prox",
          nome: "IR Próximo (700nm-1μm)",
          hex: "#FF6F00",
          emoji: "📷",
          exemplo: "IR de câmeras e controles",
          funfato: "Câmeras de segurança enxergam IR próximo — por isso funcionam no escuro!",
          detalhe: "700nm-1.4μm | LED IR em controles remotos | Câmeras CCTV | Visão noturna"
        },
        {
          id: "ir-med",
          nome: "IR Médio (1-5μm)",
          hex: "#E65100",
          emoji: "🌡️",
          exemplo: "calor do corpo humano",
          funfato: "Corpos humanos emitem IR médio em ~9μm — câmeras térmicas detectam isso!",
          detalhe: "1.4-8μm | Lei de Wien: T=37°C → pico em 9.3μm | Câmeras termográficas"
        },
        {
          id: "ir-ter",
          nome: "IR Térmico (8-15μm)",
          hex: "#B71C1C",
          emoji: "🔥",
          exemplo: "câmera térmica militar/médica",
          funfato: "Câmeras térmicas militares detectam calor de motores de tanques através da névoa!",
          detalhe: "8-15μm | LWIR | Detectores de HgCdTe | Visão através de fumaça e névoa"
        }
      ]
    }
  },
  {
    id: "inv_cores_computacao",
    tipo: "cores",
    titulo: "Cor Digital e Computação",
    descricao: "Como computadores representam e processam cores!",
    emoji: "💻",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "Cada cor que você vê na tela é um número! 💻 De HEX a sRGB, existe uma ciência exata por trás das cores digitais. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "dig-rgb",
          nome: "RGB 8-bits",
          hex: "#C62828",
          emoji: "🔴",
          exemplo: "rgb(255, 0, 0) = vermelho puro",
          funfato: "8 bits por canal = 256 tons × 3 canais = 16 milhões de cores por pixel!",
          detalhe: "2⁸=256 valores por canal | 256³=16.777.216 cores | Padrão web e tela"
        },
        {
          id: "dig-hex",
          nome: "Hexadecimal",
          hex: "#00C853",
          emoji: "#️⃣",
          exemplo: "#00C853 = verde!",
          funfato: "Códigos HEX são base 16 — A=10, B=11, C=12, D=13, E=14, F=15!",
          detalhe: "Base 16 | #RRGGBB | #00FF00 = verde puro | Compacto: 6 dígitos = 3 canais"
        },
        {
          id: "dig-hsl",
          nome: "HSL / HSV",
          hex: "#1565C0",
          emoji: "🎨",
          exemplo: "hsl(240°, 100%, 50%) = azul",
          funfato: "HSL (Matiz, Saturação, Luminosidade) é mais intuitivo para artistas que RGB!",
          detalhe: "H: 0-360° (ângulo no círculo) | S: 0-100% (pureza) | L: 0-100% (luminosidade)"
        },
        {
          id: "dig-srgb",
          nome: "Espaço sRGB",
          hex: "#4A148C",
          emoji: "📺",
          exemplo: "padrão de cores da web",
          funfato: "sRGB foi criado por HP e Microsoft em 1996 e ainda é o padrão de toda a web!",
          detalhe: "Standard RGB | IEC 61966-2-1 | Gama de 2.2 | Todos os navegadores usam sRGB"
        },
        {
          id: "dig-hdr",
          nome: "HDR 10-bit",
          hex: "#FF6F00",
          emoji: "📱",
          exemplo: "telas HDR com 1 bilhão de cores",
          funfato: "Telas HDR 10-bit têm 4x mais tons que 8-bit — 1 bilhão de cores possíveis!",
          detalhe: "10-bit: 2¹⁰=1024 valores por canal | 1.073.741.824 cores totais | P3 wide gamut"
        },
        {
          id: "dig-alpha",
          nome: "Canal Alpha",
          hex: "#9E9E9E",
          emoji: "👻",
          exemplo: "transparência: rgba(0,0,0,0.5)",
          funfato: "O canal alpha (A) em RGBA controla a transparência — 0=invisível, 255=sólido!",
          detalhe: "RGBA: 4 canais | A=0: totalmente transparente | A=255: opaco | Composição"
        }
      ]
    }
  },
  {
    id: "inv_cores_metameria",
    tipo: "cores",
    titulo: "Metamerismo e Ilusões",
    descricao: "Quando o mesmo estímulo parece diferente — ou vice-versa!",
    emoji: "🧠",
    habilidade: "Expressão Artística",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 10,
    historinha: "Em 2015, um vestido dividiu a internet: era azul/preto ou branco/dourado? 🧠 A resposta revela como o cérebro constrói a percepção de cor. Clique em 🔊!",
    dados: {
      cores: [
        {
          id: "met-met",
          nome: "Metamerismo",
          hex: "#6A1B9A",
          emoji: "👁️",
          exemplo: "mesma cor com iluminações diferentes",
          funfato: "Duas amostras podem parecer iguais à luz do dia e diferentes à lâmpada!",
          detalhe: "Mesmo estímulo visual, espectros diferentes | Problema crítico em design de moda"
        },
        {
          id: "met-vest",
          nome: "O Vestido Viral",
          hex: "#283593",
          emoji: "👗",
          exemplo: "azul/preto ou branco/dourado?",
          funfato: "O \"vestido\" de 2015 era azul/preto — mas cérebros compensam luz diferente!",
          detalhe: "Constância de cor | Iluminante assumido difere entre pessoas | Erro de inferência"
        },
        {
          id: "met-aft",
          nome: "Pós-Imagem",
          hex: "#C62828",
          emoji: "🔄",
          exemplo: "fantasma de cor após olhar fixo",
          funfato: "Olhe fixo para vermelho por 30s depois veja o branco — aparece um \"verde fantasma\"!",
          detalhe: "Adaptação dos cones | Fotorreceptores L fatigados | Cores complementares surgem"
        },
        {
          id: "met-sim",
          nome: "Contraste Simultâneo",
          hex: "#9E9E9E",
          emoji: "🔲",
          exemplo: "cinza parece diferente em fundos diferentes",
          funfato: "O mesmo cinza parece mais claro num fundo escuro e mais escuro num fundo claro!",
          detalhe: "Inibição lateral | Células ganglionares center-surround | Chevreul (1839) descobriu"
        },
        {
          id: "met-const",
          nome: "Constância de Cor",
          hex: "#FDD835",
          emoji: "☀️",
          exemplo: "banana parece amarela em qualquer luz",
          funfato: "Uma banana parece amarela à luz do sol ou de lâmpada — o cérebro compensa automaticamente!",
          detalhe: "Color constancy | Retinex theory (Land, 1977) | Compensação do iluminante"
        },
        {
          id: "met-isl",
          nome: "Cor-Jogo de Xadrez",
          hex: "#424242",
          emoji: "♟️",
          exemplo: "ilusão de Adelson — quadrados idênticos",
          funfato: "Os quadrados A e B do tabuleiro de Adelson têm exatamente o mesmo cinza!",
          detalhe: "Ilusão de Adelson (1995) | Contexto altera percepção | Constância de luminosidade"
        }
      ]
    }
  }
]

// ── Fase 2 — padrão, robô, labirinto ──
export const fase2ExtraPorFaixa = [
  {
    id: "inv_padrao_binario",
    tipo: "padrao",
    titulo: "Padrões Binários",
    descricao: "Matrizes e lógica booleana!",
    emoji: "💻",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "O computador precisa de um programador capaz de ler padrões binários! 💻 Cada grade contém um padrão lógico ou numérico. Identifique a regra e complete a matriz.",
    puzzles: [
      {
        matriz: ["000", "001", "010", "001", "010", "011", "010", "011", "❓"],
        resposta: "100",
        opcoes: ["011", "100", "101", "110"],
        dica: "Contagem binária! 000, 001, 010, 011, 100..."
      },
      {
        matriz: ["T", "F", "T", "F", "T", "F", "T", "F", "❓"],
        resposta: "T",
        opcoes: ["T", "F", "X", "Y"],
        dica: "Verdadeiro e Falso se alternam — lógica booleana básica!"
      },
      {
        matriz: ["0", "1", "1", "1", "1", "0", "1", "0", "❓"],
        resposta: "1",
        opcoes: ["0", "1", "2", "3"],
        dica: "XOR (OU exclusivo): 0 XOR 0 = 0; 0 XOR 1 = 1; 1 XOR 1 = 0"
      },
      {
        matriz: ["FF", "00", "FF", "00", "FF", "00", "FF", "00", "❓"],
        resposta: "FF",
        opcoes: ["FF", "00", "F0", "0F"],
        dica: "Hexadecimal alternando: FF (255) e 00 (0)"
      },
      {
        matriz: ["AND", "OR", "AND", "OR", "AND", "OR", "AND", "OR", "❓"],
        resposta: "AND",
        opcoes: ["AND", "OR", "NOT", "XOR"],
        dica: "Operadores lógicos alternando: AND, OR, AND, OR..."
      }
    ]
  },
  {
    id: "inv_padrao_algoritmos",
    tipo: "padrao",
    titulo: "Análise de Algoritmos",
    descricao: "Complexidade Big-O em padrões!",
    emoji: "📊",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "A revisão de código está avaliando a complexidade de algoritmos! 📊 Identifique o padrão de crescimento em cada grade para otimizar o sistema.",
    puzzles: [
      {
        matriz: ["O(1)", "O(log n)", "O(n)", "O(log n)", "O(n)", "O(n log n)", "O(n)", "O(n log n)", "❓"],
        resposta: "O(n²)",
        opcoes: ["O(n log n)", "O(n²)", "O(2ⁿ)", "O(n!)"],
        dica: "Hierarquia de complexidade crescente: 1, log n, n, n log n, n²..."
      },
      {
        matriz: ["1", "2", "4", "2", "4", "8", "4", "8", "❓"],
        resposta: "16",
        opcoes: ["12", "14", "16", "24"],
        dica: "Crescimento exponencial O(2ⁿ): dobra em cada passo!"
      },
      {
        matriz: ["n", "n/2", "n/4", "n/2", "n/4", "n/8", "n/4", "n/8", "❓"],
        resposta: "n/16",
        opcoes: ["n/12", "n/16", "n/20", "n/32"],
        dica: "Divisão por 2 — algoritmo O(log n): busca binária!"
      },
      {
        matriz: ["1", "1", "2", "1", "2", "6", "2", "6", "❓"],
        resposta: "24",
        opcoes: ["18", "20", "24", "30"],
        dica: "Fatoriais: 0!=1, 1!=1, 2!=2, 3!=6, 4!=24 — cresce O(n!)!"
      },
      {
        matriz: ["10", "20", "10", "20", "30", "20", "30", "40", "❓"],
        resposta: "30",
        opcoes: ["20", "30", "40", "50"],
        dica: "Cada diagonal aumenta em 10 — padrão triangular!"
      }
    ]
  },
  {
    id: "inv_padrao_matematica_avancada",
    tipo: "padrao",
    titulo: "Matemática Avançada",
    descricao: "Sequências, matrizes e funções!",
    emoji: "∫",
    habilidade: "Lógica Matemática",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "A olimpíada de matemática avançada chegou à prova de padrões matriciais! ∫ Cada grade esconde uma função matemática. Identifique e complete!",
    puzzles: [
      {
        matriz: ["2", "3", "5", "3", "5", "7", "5", "7", "❓"],
        resposta: "11",
        opcoes: ["9", "10", "11", "13"],
        dica: "Números primos consecutivos: 2, 3, 5, 7, 11, 13..."
      },
      {
        matriz: ["φ", "π", "e", "π", "e", "√2", "e", "√2", "❓"],
        resposta: "i",
        opcoes: ["φ", "π", "e", "i"],
        dica: "Constantes matemáticas famosas! φ=1.618, π≈3.14, e≈2.71, √2≈1.41, i=√(-1)"
      },
      {
        matriz: ["1", "0", "1", "0", "1", "0", "0", "1", "❓"],
        resposta: "1",
        opcoes: ["0", "1", "2", "3"],
        dica: "Olhe a diagonal principal: ela é toda de 1!"
      },
      {
        matriz: ["sin0", "cos0", "sin90", "cos0", "sin90", "cos90", "sin90", "cos90", "❓"],
        resposta: "sin180",
        opcoes: ["sin90", "cos90", "sin180", "cos180"],
        dica: "Ângulos crescendo 90° a cada passo na sequência trigonométrica!"
      },
      {
        matriz: ["2²", "3²", "5²", "3²", "5²", "7²", "5²", "7²", "❓"],
        resposta: "11²",
        opcoes: ["8²", "9²", "10²", "11²"],
        dica: "Quadrados dos primos: 4, 9, 25, 49, 121..."
      }
    ]
  },
  {
    id: "inv_robo_algoritmo",
    tipo: "robo",
    titulo: "Algoritmo de Busca",
    descricao: "Otimize o caminho do robô!",
    emoji: "🔍",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 14,
    historinha: "O robô implementa um algoritmo de pathfinding! 🔍 Precisa encontrar o caminho ótimo (menor número de passos) em uma grade com obstáculos complexos. Pense como um algoritmo A*!",
    niveis: [
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [3, 1],
          [3, 2],
          [3, 3],
          [3, 4],
          [3, 5]
        ],
        passos_max: 12
      },
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5]
        ],
        passos_max: 12
      }
    ]
  },
  {
    id: "inv_robo_otimizacao",
    tipo: "robo",
    titulo: "Otimização de Rotas",
    descricao: "Encontre o caminho mais eficiente!",
    emoji: "📡",
    habilidade: "Pensamento Computacional",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 14,
    historinha: "O sistema de drones precisa calcular rotas de entrega! 📡 Múltiplos obstáculos dinâmicos bloqueiam caminhos. Encontre a rota com menor custo computacional!",
    niveis: [
      {
        grade: 7,
        inicio: [0, 6],
        fim: [6, 0],
        paredes: [
          [2, 2],
          [2, 3],
          [3, 2],
          [3, 3],
          [4, 3],
          [4, 4]
        ],
        passos_max: 12
      },
      {
        grade: 7,
        inicio: [0, 6],
        fim: [6, 0],
        paredes: [
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [5, 4],
          [6, 4]
        ],
        passos_max: 12
      }
    ]
  },
  {
    id: "inv_labirinto_quantum",
    tipo: "labirinto",
    titulo: "Computador Quântico",
    descricao: "Navegue pelos estados quânticos!",
    emoji: "⚛️",
    habilidade: "Raciocínio Espacial",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 12,
    historinha: "Cada caminho no labirinto é um estado quântico — pode estar aberto e fechado ao mesmo tempo! ⚛️ Escolha o caminho clássico certo para colapsar a função de onda na saída.",
    tamanho: 11
  },
  {
    id: "inv_labirinto_neural",
    tipo: "labirinto",
    titulo: "Rede Neural",
    descricao: "Trace o sinal pela rede neural!",
    emoji: "🧠",
    habilidade: "Raciocínio Espacial",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 13,
    historinha: "Você é um impulso elétrico em uma rede neural artificial! 🧠 Os nós e conexões formam um labirinto de pesos e vieses. Encontre o caminho de propagação forward pass!",
    tamanho: 13
  },
  {
    id: "inv_labirinto_blockchain",
    tipo: "labirinto",
    titulo: "Cadeia de Blocos",
    descricao: "Valide a transação no blockchain!",
    emoji: "🔗",
    habilidade: "Raciocínio Espacial",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 14,
    historinha: "Uma transação precisa ser validada no blockchain! 🔗 O caminho passa por múltiplos nós validadores em uma topologia de grafo complexa. Encontre o caminho de consenso!",
    tamanho: 13
  },
  {
    id: "inv_labirinto_matrix",
    tipo: "labirinto",
    titulo: "A Matrix",
    descricao: "Escape do labirinto de código!",
    emoji: "💊",
    habilidade: "Raciocínio Espacial",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 15,
    historinha: "\"Matrix tem você.\" 💊 Você escolheu a pílula vermelha e vê o mundo real: um labirinto de código. Encontre a saída antes que os Agentes te capturem! O nível mais difícil de todos.",
    tamanho: 15
  }
]

// ── Fase 3 — blocos, inventor, robô e quizia extras ──
export const fase3ExtraPorFaixa = [
  {
    id: "inv_blocos_3",
    tipo: "blocos",
    titulo: "Compilador de Rotas",
    descricao: "Pense como um compilador — otimize cada instrução!",
    emoji: "🖥️",
    habilidade: "Engenharia de Software",
    xp_reward: 190,
    coins_reward: 190,
    tempo_estimado: 20,
    historinha: "Compiladores transformam código humano em instruções de máquina e eliminam redundâncias automaticamente. 🖥️ Um compilador ruim gera código lento. Um bom compilador é uma obra de arte. Resolva cada labirinto com o mínimo absoluto de instruções — como um compilador de elite.",
    niveis: [
      {
        grade: 8,
        inicio: [0, 4],
        fim: [7, 4],
        paredes: [
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
          [2, 5],
          [2, 6],
          [2, 7],
          [5, 0],
          [5, 1],
          [5, 2],
          [5, 3],
          [5, 5],
          [5, 6],
          [5, 7]
        ],
        passos_max: 8,
        dica: "Duas paredes verticais com brechas no meio — passe por elas!"
      },
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3],
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5]
        ],
        passos_max: 8,
        dica: "Três paredes horizontais — passe pelas extremidades!"
      },
      {
        grade: 8,
        inicio: [7, 0],
        fim: [0, 7],
        paredes: [
          [6, 0],
          [5, 0],
          [4, 0],
          [6, 1],
          [5, 1],
          [6, 2],
          [5, 2],
          [4, 2],
          [3, 2],
          [2, 2],
          [1, 2],
          [1, 3],
          [1, 4],
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5],
          [6, 5],
          [5, 6],
          [4, 6],
          [3, 6],
          [2, 6],
          [1, 6],
          [1, 7]
        ],
        passos_max: 10,
        dica: "Labirinto em espiral — siga as paredes como um grafo!"
      }
    ]
  },
  {
    id: "inv_blocos_4",
    tipo: "blocos",
    titulo: "Grafo de Dependências",
    descricao: "Labirintos que simulam problemas reais de sistemas distribuídos!",
    emoji: "🕸️",
    habilidade: "Engenharia de Software",
    xp_reward: 195,
    coins_reward: 195,
    tempo_estimado: 22,
    historinha: "Sistemas distribuídos como Netflix e Google usam grafos de dependências para rotear dados. 🕸️ Cada nó do grafo é uma máquina; cada aresta é uma conexão. Falhas criam caminhos alternativos. Aqui o labirinto É o grafo — encontre o caminho ótimo!",
    niveis: [
      {
        grade: 8,
        inicio: [0, 0],
        fim: [7, 7],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
          [6, 0],
          [7, 0],
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 2],
          [6, 2],
          [7, 2],
          [0, 4],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [5, 4],
          [6, 4],
          [0, 6],
          [1, 6],
          [2, 6],
          [3, 6],
          [4, 6],
          [5, 6],
          [6, 6]
        ],
        passos_max: 6,
        dica: "Quatro paredes horizontais com brechas — serpenteia em S!"
      },
      {
        grade: 8,
        inicio: [4, 0],
        fim: [4, 7],
        paredes: [
          [0, 2],
          [1, 2],
          [2, 2],
          [3, 2],
          [5, 2],
          [6, 2],
          [7, 2],
          [0, 4],
          [1, 4],
          [2, 4],
          [3, 4],
          [5, 4],
          [6, 4],
          [7, 4],
          [0, 6],
          [1, 6],
          [2, 6],
          [3, 6],
          [5, 6],
          [6, 6],
          [7, 6]
        ],
        passos_max: 6,
        dica: "Corredor central com paredes bloqueando os lados — desce reto!"
      },
      {
        grade: 8,
        inicio: [0, 0],
        fim: [7, 7],
        paredes: [
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 3],
          [0, 4],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [5, 4],
          [6, 4],
          [3, 5],
          [3, 6],
          [3, 7]
        ],
        passos_max: 10,
        dica: "Parede em forma de + — contorne pelo quadrante certo!"
      }
    ]
  },
  {
    id: "inv_robo_2",
    tipo: "robo",
    titulo: "Robô em Marte",
    descricao: "Programe o rover marciano para colher amostras com mínimo de energia!",
    emoji: "🔴",
    habilidade: "Pensamento Computacional",
    xp_reward: 180,
    coins_reward: 180,
    tempo_estimado: 20,
    historinha: "O rover Perseverance da NASA é programado na Terra com dias de atraso de sinal. 🔴 Cada movimento deve ser preciso — um erro pode travar o robô por semanas. Programe o caminho mais eficiente para coletar as amostras marcianas!",
    niveis: [
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
          [6, 2],
          [6, 3],
          [6, 4]
        ],
        passos_max: 16,
        dica: "Três zonas de obstáculos — planeje o caminho em S!"
      },
      {
        grade: 7,
        inicio: [6, 0],
        fim: [0, 6],
        paredes: [
          [5, 0],
          [4, 0],
          [3, 0],
          [5, 1],
          [5, 2],
          [5, 3],
          [3, 3],
          [3, 4],
          [3, 5],
          [1, 3],
          [1, 4],
          [1, 5],
          [1, 6],
          [2, 6]
        ],
        passos_max: 16,
        dica: "Desce em escada contornando cada barreira!"
      },
      {
        grade: 8,
        inicio: [0, 0],
        fim: [7, 7],
        paredes: [
          [0, 3],
          [1, 3],
          [2, 3],
          [2, 4],
          [2, 5],
          [4, 2],
          [4, 3],
          [4, 4],
          [6, 3],
          [6, 4],
          [6, 5],
          [6, 6],
          [6, 7]
        ],
        passos_max: 18,
        dica: "Grade 8×8 com três paredes em L — navegue pelos corredores!"
      }
    ]
  },
  {
    id: "inv_inventor_2",
    tipo: "inventor",
    titulo: "Inventor Social",
    descricao: "Resolva um problema social real com tecnologia ou criatividade!",
    emoji: "🌍",
    habilidade: "Impacto Social",
    xp_reward: 205,
    coins_reward: 205,
    tempo_estimado: 20,
    historinha: "Os maiores desafios da humanidade não são tecnológicos — são sociais. 🌍 Pobreza, desigualdade, saúde mental, educação deficiente. A IA vai analisar sua solução como um juiz de pitch de startup social: criatividade, viabilidade, escalabilidade e impacto.",
    inspiracoes: [
      "Uma plataforma que conecta doadores de alimentos com pessoas em situação de rua em tempo real",
      "Sistema de tutoria peer-to-peer que conecta estudantes avançados com os que têm dificuldade",
      "App de saúde mental com triagem por IA para adolescentes em comunidades sem psicólogos"
    ]
  },
  {
    id: "inv_inventor_3",
    tipo: "inventor",
    titulo: "Inventor do Futuro",
    descricao: "O que o mundo vai precisar em 2050?",
    emoji: "🔮",
    habilidade: "Visão Estratégica",
    xp_reward: 205,
    coins_reward: 205,
    tempo_estimado: 20,
    historinha: "Em 2050, a Terra terá 10 bilhões de pessoas, cidades debaixo d'água por causa do aquecimento e IA em tudo. 🔮 O que você inventaria AGORA para garantir que o mundo de 2050 seja melhor? A IA vai analisar profundidade, originalidade e viabilidade futura.",
    inspiracoes: [
      "Proteína sintetizada por IA que substitui carne sem desmatamento ou emissão de carbono",
      "Sistema de geoengenharia descentralizado que reflete luz solar usando nanoesferas atmosféricas",
      "Rede de saúde preventiva baseada em biossensores implantáveis e IA preditiva"
    ]
  },
  {
    id: "inv_blocos_2",
    tipo: "blocos",
    titulo: "Algoritmos Complexos",
    descricao: "Os desafios mais difíceis — para mentes que pensam como engenheiros!",
    emoji: "⚡",
    habilidade: "Engenharia de Software",
    xp_reward: 185,
    coins_reward: 185,
    tempo_estimado: 20,
    historinha: "Engenheiros de software medem a qualidade do código pela complexidade ciclomática e pelo número de linhas. ⚡ Aqui, cada bloco tem um custo. Solucione cada labirinto com o mínimo de blocos absoluto — é assim que os profissionais pensam.",
    niveis: [
      {
        grade: 7,
        inicio: [6, 0],
        fim: [0, 6],
        paredes: [
          [5, 0],
          [4, 0],
          [3, 0],
          [2, 0],
          [1, 0],
          [5, 1],
          [4, 1],
          [3, 1],
          [2, 1],
          [1, 1],
          [5, 2],
          [4, 2],
          [3, 2],
          [2, 2],
          [1, 2],
          [5, 3],
          [4, 3],
          [3, 3],
          [2, 3],
          [1, 3],
          [5, 4],
          [4, 4],
          [3, 4],
          [2, 4],
          [1, 4],
          [5, 5],
          [4, 5],
          [3, 5],
          [2, 5],
          [1, 5]
        ],
        passos_max: 4,
        dica: "→ R6 depois ↑ R6 — apenas 4 blocos para cruzar tudo!"
      },
      {
        grade: 8,
        inicio: [0, 0],
        fim: [7, 7],
        paredes: [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
          [6, 0],
          [7, 0],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
          [6, 1],
          [7, 1],
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 2],
          [6, 2],
          [7, 2],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3],
          [6, 3],
          [7, 3],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [5, 4],
          [6, 4],
          [7, 4],
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5],
          [6, 5],
          [7, 5],
          [1, 6],
          [2, 6],
          [3, 6],
          [4, 6],
          [5, 6],
          [6, 6],
          [7, 6]
        ],
        passos_max: 4,
        dica: "Grade 8×8! Linha reta: → R7 depois ↓ R7!"
      },
      {
        grade: 7,
        inicio: [0, 3],
        fim: [6, 3],
        paredes: [
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 4],
          [1, 5],
          [1, 6],
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 4],
          [3, 5],
          [3, 6],
          [5, 0],
          [5, 1],
          [5, 2],
          [5, 4],
          [5, 5],
          [5, 6]
        ],
        passos_max: 6,
        dica: "Labirinto em ziguezague — planeje o caminho antes de programar!"
      }
    ]
  },
  {
    id: "inv_quizia_2",
    tipo: "quizia",
    titulo: "Quiz IA — Nível Elite",
    descricao: "Perguntas sobre os temas mais complexos geradas por IA!",
    emoji: "🏆",
    habilidade: "Conhecimento Avançado",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 14,
    historinha: "Este é o nível Elite. 🏆 Perguntas que exigem raciocínio profundo sobre ciência, filosofia, tecnologia e história. A IA foi instruída a criar perguntas que fazem os especialistas pensarem duas vezes. Você está pronto?",
    temas: ["🌐 Geopolítica", "🧠 Neurociência", "💹 Economia e Mercados", "🚁 Aeroespacial e Defesa"]
  },
  {
    id: "inv_quizia_3",
    tipo: "quizia",
    titulo: "Quiz IA — Ciência e Ética",
    descricao: "Ecologia, eletromagnetismo, filosofia e medicina para mentes avançadas!",
    emoji: "🌱",
    habilidade: "Pensamento Crítico",
    xp_reward: 120,
    coins_reward: 120,
    tempo_estimado: 14,
    historinha: "A fronteira entre ciência e ética nunca foi tão importante. 🌱 Biotecnologia edita genes, IA questiona o livre-arbítrio, e a crise climática exige soluções urgentes. A IA escolheu temas que moldam o futuro — qual você domina?",
    temas: [
      "🌱 Ecologia e Sustentabilidade",
      "🧲 Eletromagnetismo",
      "🏛️ Filosofia e Ética",
      "⚕️ Medicina e Biotecnologia"
    ]
  }
]

// ── Fase 4 — robô e padrão (2 por faixa) ──
export const fase4ExtraPorFaixa = [
  {
    id: "inv_robo_3",
    tipo: "robo",
    titulo: "Robô Cirurgião",
    descricao: "Precisão milimétrica — cada movimento deve ser exato!",
    emoji: "🔬",
    habilidade: "Pensamento Computacional",
    xp_reward: 175,
    coins_reward: 175,
    tempo_estimado: 19,
    historinha: "O Robô Cirurgião está operando um paciente! 🔬 Qualquer movimento errado é crítico. Programe o caminho com precisão máxima — como nos sistemas de cirurgia robótica real (Da Vinci Surgical System)!",
    niveis: [
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [0, 3],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3]
        ],
        passos_max: 14,
        dica: "Parede vertical no centro — desça pela esquerda e atravesse na base!"
      },
      {
        grade: 7,
        inicio: [0, 6],
        fim: [6, 0],
        paredes: [
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
          [2, 5],
          [4, 1],
          [4, 2],
          [4, 3],
          [4, 4],
          [4, 5]
        ],
        passos_max: 14,
        dica: "Duas barreiras horizontais — use os corredores das bordas!"
      },
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [4, 3],
          [4, 4],
          [4, 5]
        ],
        passos_max: 16,
        dica: "Duas paredes assimétricas — passe pela direita na 1ª barreira e pela direita na 2ª!"
      }
    ]
  },
  {
    id: "inv_robo_4",
    tipo: "robo",
    titulo: "Robô Mineiro",
    descricao: "Extraia recursos de Marte com rotas otimizadas!",
    emoji: "⛏️",
    habilidade: "Pensamento Computacional",
    xp_reward: 180,
    coins_reward: 180,
    tempo_estimado: 20,
    historinha: "O Robô Minerador está extraindo recursos em Marte! ⛏️ As formações rochosas criam labirintos naturais. Calcule as rotas de extração otimizadas para maximizar a eficiência energética!",
    niveis: [
      {
        grade: 7,
        inicio: [0, 0],
        fim: [6, 6],
        paredes: [
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
          [3, 3],
          [4, 3],
          [5, 3],
          [3, 5],
          [4, 5],
          [5, 5]
        ],
        passos_max: 14,
        dica: "Colunas verticais bloqueiam o centro — desça pela borda e atravesse pela base!"
      },
      {
        grade: 7,
        inicio: [3, 0],
        fim: [3, 6],
        paredes: [
          [0, 3],
          [1, 3],
          [2, 3],
          [4, 3],
          [5, 3],
          [6, 3]
        ],
        passos_max: 8,
        dica: "Há uma passagem no meio — descubra o corredor que atravessa tudo!"
      },
      {
        grade: 7,
        inicio: [0, 6],
        fim: [6, 0],
        paredes: [
          [1, 4],
          [1, 5],
          [2, 4],
          [3, 3],
          [3, 4],
          [4, 2],
          [4, 3],
          [5, 1],
          [5, 2]
        ],
        passos_max: 16,
        dica: "Obstáculos em diagonal — contorne pela borda superior e pela borda esquerda!"
      }
    ]
  },
  {
    id: "inv_padrao_criptografia",
    tipo: "padrao",
    titulo: "Padrões Criptográficos",
    descricao: "Cifras, hashes, protocolos e sistemas de segurança!",
    emoji: "🔐",
    habilidade: "Pensamento Computacional",
    xp_reward: 125,
    coins_reward: 125,
    tempo_estimado: 14,
    historinha: "O analista de segurança precisa decifrar os padrões! 🔐 Cada grade contém uma progressão de algoritmos ou protocolos criptográficos reais. Identifique a regra e complete a sequência!",
    puzzles: [
      {
        matriz: ["César", "Vigenère", "RSA", "Vigenère", "RSA", "AES", "RSA", "AES", "❓"],
        resposta: "ECC",
        opcoes: ["AES", "RSA", "ECC", "PGP"],
        dica: "Algoritmos de criptografia em ordem cronológica e de sofisticação!"
      },
      {
        matriz: ["MD5", "SHA1", "SHA256", "SHA1", "SHA256", "SHA512", "SHA256", "SHA512", "❓"],
        resposta: "SHA3",
        opcoes: ["SHA256", "SHA512", "SHA3", "BLAKE3"],
        dica: "Funções de hash em ordem crescente de segurança!"
      },
      {
        matriz: ["HTTP", "HTTPS", "SSH", "HTTPS", "SSH", "TLS", "SSH", "TLS", "❓"],
        resposta: "mTLS",
        opcoes: ["TLS", "SSL", "mTLS", "QUIC"],
        dica: "Protocolos de segurança de rede em complexidade crescente!"
      },
      {
        matriz: ["2", "8", "10", "16", "8", "10", "16", "10", "❓"],
        resposta: "16",
        opcoes: ["8", "10", "16", "64"],
        dica: "Bases numéricas: binário(2), octal(8), decimal(10), hexadecimal(16)!"
      },
      {
        matriz: ["chave", "bloqueio", "cofre", "bloqueio", "cofre", "vault", "cofre", "vault", "❓"],
        resposta: "HSM",
        opcoes: ["vault", "cofre", "HSM", "TPM"],
        dica: "Evolução dos dispositivos de armazenamento seguro de chaves criptográficas!"
      }
    ]
  },
  {
    id: "inv_padrao_sistemas",
    tipo: "padrao",
    titulo: "Padrões de Sistemas",
    descricao: "Modelo OSI, hierarquia de memória e topologias de rede!",
    emoji: "🌐",
    habilidade: "Pensamento Computacional",
    xp_reward: 125,
    coins_reward: 125,
    tempo_estimado: 14,
    historinha: "O arquiteto de sistemas perdeu os diagramas! 🌐 Cada grade contém um padrão de arquitetura de computadores ou redes. Identifique a camada ou componente que falta!",
    puzzles: [
      {
        matriz: ["Física", "Enlace", "Rede", "Enlace", "Rede", "Transporte", "Rede", "Transporte", "❓"],
        resposta: "Sessão",
        opcoes: ["Transporte", "Sessão", "Apresentação", "Aplicação"],
        dica: "Camadas do modelo OSI de baixo para cima!"
      },
      {
        matriz: ["Registrador", "Cache", "RAM", "Cache", "RAM", "SSD", "RAM", "SSD", "❓"],
        resposta: "HDD",
        opcoes: ["SSD", "HDD", "NAS", "Cloud"],
        dica: "Hierarquia de memória: mais rápido/menor para mais lento/maior!"
      },
      {
        matriz: ["P2P", "Barramento", "Anel", "Barramento", "Anel", "Estrela", "Anel", "Estrela", "❓"],
        resposta: "Malha",
        opcoes: ["Estrela", "Árvore", "Malha", "Híbrida"],
        dica: "Topologias de rede em complexidade crescente!"
      },
      {
        matriz: ["IPv4", "IPv6", "MAC", "IPv6", "MAC", "DNS", "MAC", "DNS", "❓"],
        resposta: "DHCP",
        opcoes: ["DNS", "DHCP", "NAT", "BGP"],
        dica: "Protocolos de endereçamento de rede evoluindo!"
      },
      {
        matriz: ["Kernel", "Shell", "API", "Shell", "API", "GUI", "API", "GUI", "❓"],
        resposta: "App",
        opcoes: ["GUI", "Driver", "App", "Service"],
        dica: "Camadas do sistema operacional: do núcleo à aplicação!"
      }
    ]
  }
]

// ── Fase 5 — quiz e inventor temáticos ──
export const fase5ExtraPorFaixa = [
  {
    id: "inv_quiz_epistemologia",
    tipo: "quiz",
    titulo: "Filosofia da Ciência",
    descricao: "Como sabemos o que sabemos? Os fundamentos do conhecimento.",
    emoji: "🔭",
    habilidade: "Epistemologia",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "A ciência não é um conjunto de fatos — é um método. 🔭 Karl Popper dizia que uma teoria só é científica se puder ser refutada. Kuhn falava em \"revoluções científicas\". Vamos explorar as bases do pensamento científico moderno?",
    perguntas: [
      {
        pergunta: "O que é o \"princípio da falsificabilidade\" de Karl Popper?",
        opcoes: [
          "Toda teoria é falsa",
          "Uma teoria só é científica se puder ser testada e potencialmente refutada",
          "Cientistas podem falsificar dados",
          "A ciência não tem certezas"
        ],
        correta: 1,
        fato: "🔬 \"Todos os corvos são pretos\" é falsificável — um único corvo branco o refuta. Já \"há um dragão invisível no quarto\" não é refutável: portanto, não é científico por definição."
      },
      {
        pergunta: "O que Thomas Kuhn chamou de \"paradigma\" na ciência?",
        opcoes: [
          "Um experimento famoso",
          "O conjunto de crenças e práticas que define uma ciência num período histórico",
          "Um modelo matemático perfeito",
          "Uma teoria ainda não comprovada"
        ],
        correta: 1,
        fato: "🔄 Kuhn mostrou que a ciência não avança linearmente — passa por \"revoluções\" onde o velho paradigma é substituído. A transição de \"Terra no centro\" para \"Sol no centro\" foi uma revolução de paradigma."
      },
      {
        pergunta: "O que é a \"navalha de Occam\"?",
        opcoes: [
          "Um experimento de física do século XIV",
          "O princípio de que a explicação mais simples tende a ser a correta",
          "Uma ferramenta de dissecação medieval",
          "Um método de análise estatística"
        ],
        correta: 1,
        fato: "✂️ William de Occam (séc. XIV): \"Não multiplique entidades além do necessário.\" Se duas teorias explicam o mesmo fenômeno igualmente bem, prefira a mais simples. A física moderna usa isso constantemente."
      },
      {
        pergunta: "O que diferencia correlação de causalidade?",
        opcoes: [
          "Nada — se A e B acontecem juntos, um causa o outro",
          "Correlação = A e B ocorrem juntos; causalidade = A provoca B",
          "Causalidade é mais fraca que correlação",
          "São sinônimos em estatística"
        ],
        correta: 1,
        fato: "📊 Sorvete e afogamentos têm correlação (ambos sobem no verão) mas sorvete não causa afogamento — o calor causa os dois. Confundir correlação com causalidade é um dos erros mais comuns em pesquisa e jornalismo."
      },
      {
        pergunta: "O que é \"viés de confirmação\"?",
        opcoes: [
          "Quando os dados confirmam a hipótese esperada",
          "A tendência de buscar informações que confirmam crenças já existentes e ignorar as que as contradizem",
          "Um tipo de experimento controlado duplo-cego",
          "Quando dois cientistas independentes chegam ao mesmo resultado"
        ],
        correta: 1,
        fato: "🧠 O viés de confirmação é automático e afeta todos — inclusive cientistas experientes! Por isso existe o estudo \"duplo-cego\": nem o paciente nem o médico sabem quem recebeu o remédio real."
      }
    ]
  },
  {
    id: "inv_quiz_civilizacoes",
    tipo: "quiz",
    titulo: "História das Civilizações",
    descricao: "As grandes revoluções que moldaram a humanidade.",
    emoji: "🏛️",
    habilidade: "História e Geopolítica",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "Para entender o presente, precisamos conhecer o passado. 🏛️ Cada grande civilização deixou legados que ainda usamos hoje — democracia, matemática, filosofia, direito. Vamos viajar no tempo?",
    perguntas: [
      {
        pergunta: "Qual civilização criou os primeiros sistemas de escrita, leis codificadas e cidades organizadas?",
        opcoes: ["Egito Antigo", "Grécia Antiga", "Mesopotâmia", "China Antiga"],
        correta: 2,
        fato: "📜 A Mesopotâmia (atual Iraque) criou a escrita cuneiforme há 5.000 anos. O Código de Hamurabi (1754 a.C.) foi uma das primeiras coleções de leis escritas — algumas de suas ideias ainda influenciam o direito moderno."
      },
      {
        pergunta: "Qual foi o impacto central da Revolução Industrial nos séculos XVIII–XIX?",
        opcoes: [
          "Apenas criou novas máquinas",
          "Transformou economias agrárias em industriais, urbanizou populações e redefiniu o trabalho",
          "Afetou somente a Inglaterra",
          "Reduziu a produção em geral"
        ],
        correta: 1,
        fato: "🏭 A Rev. Industrial multiplicou a produção por 10x mas criou desigualdades brutais. Isso gerou os movimentos trabalhistas, os sindicatos e as leis de proteção ao trabalho que existem em todos os países hoje."
      },
      {
        pergunta: "O que foi o Renascimento (séculos XIV–XVII)?",
        opcoes: [
          "Uma guerra religiosa europeia",
          "Um período de revalorização do conhecimento greco-romano, ciência e artes",
          "A reconquista da Terra Santa pelas Cruzadas",
          "O surgimento do sistema feudal na Europa"
        ],
        correta: 1,
        fato: "🎨 O Renascimento produziu Leonardo da Vinci (pintor, escultor, cientista, engenheiro numa só pessoa), Michelangelo, Copérnico e Galileu. Foi quando a Europa começou a colocar a razão humana acima dos dogmas."
      },
      {
        pergunta: "Qual foi o principal legado da Grécia Antiga para a civilização ocidental?",
        opcoes: [
          "A pirâmide e o hieróglifo",
          "A escrita cuneiforme",
          "A democracia, a filosofia e a geometria sistemática",
          "O monoteísmo e o calendário"
        ],
        correta: 2,
        fato: "🏛️ Os gregos inventaram a democracia (demos = povo + kratos = poder), a filosofia racional (Sócrates, Platão, Aristóteles) e a geometria sistematizada (Euclides). Sem eles, o Ocidente seria completamente outro."
      },
      {
        pergunta: "Por que a Rota da Seda foi historicamente revolucionária?",
        opcoes: [
          "Era exclusivamente uma rota de guerra",
          "Conectou Europa, Oriente Médio e Ásia em redes comerciais e culturais por séculos",
          "Servia apenas para exportar seda chinesa para Roma",
          "Foi criada pelos romanos para invadir a China Han"
        ],
        correta: 1,
        fato: "🛤️ Pela Rota da Seda viajaram não só mercadorias (seda, especiarias, porcelana) mas também ideias (Budismo, Islamismo), tecnologias (papel, pólvora, bússola) e doenças (a Peste Negra de 1347). Comércio move a história."
      }
    ]
  },
  {
    id: "inv_inventor_4",
    tipo: "inventor",
    titulo: "Inventor de Biotecnologia",
    descricao: "Use biologia e tecnologia para resolver problemas impossíveis!",
    emoji: "🧬",
    habilidade: "Biotecnologia",
    xp_reward: 205,
    coins_reward: 205,
    tempo_estimado: 20,
    historinha: "A edição de genes CRISPR permite reescrever o DNA como um editor de texto. 🧬 Bactérias foram programadas para produzir insulina. Órgãos estão sendo cultivados em laboratório. A fronteira entre biologia e tecnologia desapareceu. O que você inventaria nesse campo?",
    inspiracoes: [
      "Bactérias projetadas geneticamente para degradar plástico oceânico em compostos inofensivos em menos de 48 horas",
      "Implante bioeletrônico que monitora biomarcadores de doenças crônicas e libera medicamento automaticamente quando necessário",
      "Pele sintética vascularizada crescida em laboratório para transplante sem rejeição em vítimas de queimaduras graves"
    ]
  },
  {
    id: "inv_inventor_5",
    tipo: "inventor",
    titulo: "Inventor de Energia Limpa",
    descricao: "O futuro energético do planeta depende de novas ideias!",
    emoji: "⚡",
    habilidade: "Engenharia Energética",
    xp_reward: 205,
    coins_reward: 205,
    tempo_estimado: 20,
    historinha: "A humanidade consome 580 EJ de energia por ano — e 80% ainda vem de combustíveis fósseis. ⚡ Fusão nuclear, hidrogênio verde, baterias de próxima geração... muitas apostas, poucas certezas. Qual seria a sua solução para alimentar 10 bilhões de pessoas de forma limpa?",
    inspiracoes: [
      "Painéis solares flexíveis integrados ao asfalto de rodovias que geram eletricidade e iluminam a própria estrada à noite",
      "Sistema de captação de energia das ondas do mar com turbinas submersas e transmissão sem fio para a costa",
      "Baterias de grafeno que carregam em 5 minutos, duram 10× mais que as de lítio e usam materiais abundantes na natureza"
    ]
  }
]

// ── Formas geométricas ──
export const formasExtraPorFaixa = [
  {
    id: "inv_formas_fractais",
    tipo: "formas",
    titulo: "Fractais e Formas Infinitas",
    descricao: "Explore as formas que se repetem infinitamente — os fractais!",
    emoji: "🌀",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "Um fractal é uma forma que se repete infinitamente ao fazer zoom — cada parte é uma cópia menor do todo. 🌀 Eles aparecem em montanhas, nuvens, rios, pulmões e até no mercado financeiro!",
    dados: {
      formas: [
        {
          id: "sierpinski",
          nome: "Triângulo de Sierpinski",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🔺",
          frase: "Triângulo dividido em triângulos, infinitamente!",
          detalhe: "Dimensão fractal ≈ 1,585 (entre 1D e 2D). Criado em 1915 por Wacław Sierpiński. A área tende a zero, mas o perímetro tende ao infinito!"
        },
        {
          id: "koch",
          nome: "Floco de Koch",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "❄️",
          frase: "Cada lado vira uma estrela, para sempre!",
          detalhe: "Perímetro infinito, área finita. Os flocos de neve reais seguem padrões similares por causa de como cristais de gelo crescem."
        },
        {
          id: "mandelbrot",
          nome: "Conjunto de Mandelbrot",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🌑",
          frase: "A forma mais complexa gerada por uma equação simples!",
          detalhe: "z → z² + c. Pontos dentro do conjunto nunca escapam para o infinito. A fronteira tem dimensão fractal ≈ 2 — complexidade máxima!"
        },
        {
          id: "julia",
          nome: "Conjunto de Julia",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🌀",
          frase: "Prima do Mandelbrot — infinitas variações!",
          detalhe: "Cada ponto do Mandelbrot gera um Conjunto de Julia diferente. Parecidos com galáxias e nebulosas — a natureza usa matemática fractal!"
        },
        {
          id: "cantor",
          nome: "Conjunto de Cantor",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "➖",
          frase: "Remove o terço do meio, infinitas vezes!",
          detalhe: "Dimensão fractal ≈ 0,631 (entre 0D e 1D). Tem tantos pontos quanto os números reais, mas comprimento total zero. Matemática do infinito!"
        },
        {
          id: "romanesco",
          nome: "Brócolis Romanesco",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🥦",
          frase: "Um fractal que você pode comer!",
          detalhe: "Cada florzinha é uma versão menor do brócolis inteiro. Segue a espiral de Fibonacci. A natureza usa fractais para crescer de forma eficiente."
        },
        {
          id: "dragon",
          nome: "Curva do Dragão",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🐉",
          frase: "Dobra o papel ao meio infinitas vezes!",
          detalhe: "Aparece em ficção científica (Jurassic Park) e em matemática real. A 13ª dobra cria um padrão que testa computadores até hoje."
        },
        {
          id: "natura",
          nome: "Fractais na Natureza",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🌊",
          frase: "Rios, nuvens, pulmões — tudo é fractal!",
          detalhe: "Pulmões: 23 bifurcações fractais maximizam a área de absorção. Rios: padrão idêntico em escala de cm até km. Fractais = eficiência máxima."
        }
      ]
    }
  },
  {
    id: "inv_formas_topologia",
    tipo: "formas",
    titulo: "Topologia — Formas que se Deformam",
    descricao: "A matemática das formas que podem ser esticadas mas não cortadas!",
    emoji: "🫧",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "Na topologia, uma caneca de café e uma rosca são a MESMA forma — ambas têm um furo! 🫧 A topologia estuda o que não muda quando você estica, dobra ou distorce — sem cortar.",
    dados: {
      formas: [
        {
          id: "mobius",
          nome: "Fita de Möbius",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "♾️",
          frase: "Uma superfície com apenas um lado!",
          detalhe: "Faça: torça uma tira de papel 180° e cole as pontas. Corte pelo meio e vira uma fita maior! Criada em 1858 por August Möbius."
        },
        {
          id: "klein",
          nome: "Garrafa de Klein",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🫙",
          frase: "Uma garrafa sem dentro nem fora!",
          detalhe: "Existe em 4 dimensões — em 3D ela se autointersecta. Se você tentasse encher de água, ela escorreria para fora pelo interior. Impossível de construir em 3D real."
        },
        {
          id: "toro",
          nome: "Toro (Rosca)",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🍩",
          frase: "Topologicamente igual a uma caneca de café!",
          detalhe: "Ambos têm exatamente 1 furo. Na topologia, se você pode deformar uma forma na outra sem cortar, elas são \"iguais\" (homeomorfas)."
        },
        {
          id: "esfera",
          nome: "Esfera Topológica",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "🌐",
          frase: "Topologicamente igual a um cubo!",
          detalhe: "A esfera e o cubo são homeomorfos — imagine inflar o cubo como um balão. O que importa é a ausência de furos, não a forma exata."
        },
        {
          id: "euler",
          nome: "Característica de Euler",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🔢",
          frase: "V − A + F = 2 para qualquer poliedro!",
          detalhe: "Vértices − Arestas + Faces = 2. Cubo: 8−12+6=2. Tetraedro: 4−6+4=2. Octaedro: 6−12+8=2. Euler provou isso em 1758 — um resultado fundamental!"
        },
        {
          id: "nope",
          nome: "Nó Trefoil",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🪢",
          frase: "O nó mais simples que não pode ser desfeito!",
          detalhe: "Na teoria dos nós (ramo da topologia), o trefoil é o nó não-trivial mais simples. O DNA assume forma de nós — enzimas precisam desatá-los!"
        },
        {
          id: "proj",
          nome: "Plano Projetivo",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🎯",
          frase: "Um plano onde paralelas se encontram!",
          detalhe: "No plano projetivo, toda reta se encontra em um ponto (incluindo paralelas). Base da geometria projetiva, usada em perspectiva e computação gráfica."
        },
        {
          id: "homeo",
          nome: "Homeomorfismo",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🔄",
          frase: "Quando duas formas são \"iguais\" na topologia!",
          detalhe: "Xícara ↔ Rosca (1 furo). Esfera ↔ Cubo (0 furos). Pretzel ↔ Superfície com 3 furos. A topologia classifica formas pelo número de furos!"
        }
      ]
    }
  },
  {
    id: "inv_formas_4d",
    tipo: "formas",
    titulo: "Formas em 4 Dimensões",
    descricao: "Visualize poliedros e hipercubos além das 3 dimensões!",
    emoji: "🔮",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "Assim como um quadrado de 2D vira um cubo em 3D, o cubo em 3D vira um tesserato em 4D! 🔮 Não conseguimos ver a 4ª dimensão, mas a matemática nos permite entendê-la.",
    dados: {
      formas: [
        {
          id: "tesserato",
          nome: "Tesserato (Hipercubo)",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🔷",
          frase: "O cubo da 4ª dimensão tem 8 cubos dentro!",
          detalhe: "16 vértices | 32 arestas | 24 faces quadradas | 8 células cúbicas. Assim como um cubo tem 6 quadrados, o tesserato tem 8 cubos!"
        },
        {
          id: "hipers",
          nome: "Hiperesfera (4D)",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🌐",
          frase: "Uma esfera em 4 dimensões!",
          detalhe: "A hiperesfera em 4D tem \"volume\" = π²r⁴/2. O universo pode ter topologia de hiperesfera — andar em linha reta poderia te trazer de volta!"
        },
        {
          id: "sshot",
          nome: "Projeção do Tesserato",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "📐",
          frase: "Como ver 4D em 2D: projeção em cascata!",
          detalhe: "Assim como a sombra 2D de um cubo 3D parece hexágono ou quadrado, a projeção 3D do tesserato parece um cubo dentro de outro cubo."
        },
        {
          id: "croos",
          nome: "Politopo de Cruz",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "✚",
          frase: "A analogia 4D do octaedro!",
          detalhe: "8 vértices | 24 arestas | 32 faces | 16 células. É o dual do tesserato, assim como o octaedro é dual do cubo."
        },
        {
          id: "dim24",
          nome: "Politopo 24-células",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "💎",
          frase: "Único em 4D — não existe análogo em outras dimensões!",
          detalhe: "24 vértices | 96 arestas | 96 faces | 24 células octaédricas. É autodual — único politopo regular sem análogo em 3D ou 5D+."
        },
        {
          id: "slice",
          nome: "Fatias Dimensionais",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🔪",
          frase: "Cortar 4D revela 3D, como cortar 3D revela 2D!",
          detalhe: "Fatiar um cubo 3D revela quadrados. Fatiar um tesserato 4D revela cubos. Um ser 4D veria o interior do seu corpo — como nós vemos o interior de um quadrado."
        },
        {
          id: "calabi",
          nome: "Espaço de Calabi-Yau",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🌀",
          frase: "As 6 dimensões extras da teoria das cordas!",
          detalhe: "A teoria das cordas exige 10 dimensões. As 6 extras são \"compactadas\" em formas de Calabi-Yau — microscópicas demais para detectar. Matemática pura influenciando física quântica!"
        },
        {
          id: "flatland",
          nome: "Flatland — Analogia 2D",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "📖",
          frase: "Imagine ser 2D tentando entender 3D!",
          detalhe: "No livro Flatland (1884), seres 2D não conseguem imaginar 3D — assim como nós em 3D não conseguimos imaginar 4D. Um ser 2D veria círculos (seções de uma esfera)."
        }
      ]
    }
  },
  {
    id: "inv_formas_fibonacci",
    tipo: "formas",
    titulo: "Fibonacci e Razão Áurea nas Formas",
    descricao: "A proporção que governa a beleza e a natureza!",
    emoji: "🐚",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "A razão áurea φ = 1,618... aparece em conchas, flores, galáxias e até na Mona Lisa! 🐚 A sequência de Fibonacci (1,1,2,3,5,8,13...) é a porta de entrada para esse segredo matemático.",
    dados: {
      formas: [
        {
          id: "retangulo_aureo",
          nome: "Retângulo Áureo",
          cor: "#EF9F27",
          svg: "rect",
          frase: "O retângulo mais \"bonito\" da matemática!",
          detalhe: "Proporção largura/altura = φ ≈ 1,618. Remova um quadrado e o retângulo restante é outro retângulo áureo — ao infinito! Cartão de crédito, Partenon."
        },
        {
          id: "espiral",
          nome: "Espiral de Fibonacci",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🐚",
          frase: "Quadrados de Fibonacci formam uma espiral!",
          detalhe: "Quadrados de lado 1,1,2,3,5,8,13,21... colocados em espiral criam a curva logarítmica perfeita. Conchas de náutilo, galáxias espirais, padrão de sementes de girassol."
        },
        {
          id: "pentagonoaur",
          nome: "Pentágono e φ",
          cor: "#4F8EE8",
          svg: "polygon_5",
          frase: "A diagonal do pentágono = φ × lado!",
          detalhe: "Em um pentágono regular, diagonal/lado = φ. As diagonais formam um pentágono menor — e assim ao infinito. Por isso a estrela de 5 pontas codifica a razão áurea!"
        },
        {
          id: "girassol",
          nome: "Padrão do Girassol",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🌻",
          frase: "34 espirais em uma direção, 55 na outra!",
          detalhe: "34 e 55 são números consecutivos de Fibonacci. Sementes de pinha: 8 e 13. Abacaxi: 8 e 13. A natureza usa Fibonacci para empacotar o máximo em mínimo espaço!"
        },
        {
          id: "phi",
          nome: "Phi — A Proporção",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🔢",
          frase: "φ = (1 + √5) / 2 = 1,6180339...",
          detalhe: "φ é irracional e satisfaz φ = 1 + 1/φ. É o único número que é 1 a mais que seu recíproco. A razão dos termos de Fibonacci se aproxima de φ à medida que n → ∞."
        },
        {
          id: "arte",
          nome: "φ na Arte e Arquitetura",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🎨",
          frase: "Partenon, Mona Lisa, Le Corbusier!",
          detalhe: "Partenon (450 a.C.): fachada tem proporção áurea. Mona Lisa: rosto inscrito em retângulo áureo. Le Corbusier usou φ no \"Modulor\" para escalar toda a arquitetura moderna."
        },
        {
          id: "natureza2",
          nome: "Fibonacci na Natureza",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🌿",
          frase: "Folhas, pétalas, conchas — tudo Fibonacci!",
          detalhe: "Pétalas de flores: 3, 5, 8, 13, 21 (sempre Fibonacci). Divisões de galhos: padrão Fibonacci. DNA: 34 Å por volta, 21 Å de largura — razão φ!"
        },
        {
          id: "quase",
          nome: "Quasicristais",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "💠",
          frase: "Padrões áureos que não são periódicos!",
          detalhe: "Descobertos em 1982 (Nobel 2011): materiais com simetria de 5 (φ) que não se repetem nunca — como o Penrose tile. Provaram que a natureza vai além da geometria clássica."
        }
      ]
    }
  },
  {
    id: "inv_formas_computacional",
    tipo: "formas",
    titulo: "Geometria Computacional",
    descricao: "Como computadores entendem e processam formas!",
    emoji: "💻",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "Todo jogo 3D, GPS e robô usa geometria computacional para entender o espaço. 💻 São algoritmos matemáticos que resolvem problemas de posição, distância e forma em milissegundos.",
    dados: {
      formas: [
        {
          id: "voronoi",
          nome: "Diagrama de Voronoi",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "🗺️",
          frase: "Divide o espaço pela vizinhança mais próxima!",
          detalhe: "Dado n pontos, o Voronoi divide o plano em regiões onde cada ponto pertence ao \"centro\" mais próximo. Usado em GPS, redes de celular, planejamento urbano, biologia celular."
        },
        {
          id: "delaunay",
          nome: "Triangulação de Delaunay",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🔺",
          frase: "A melhor malha de triângulos para n pontos!",
          detalhe: "Dual do Voronoi. Maximiza o menor ângulo dos triângulos — evita triângulos \"finos\". Base de jogos 3D (malhas de terreno), simulação física, interpolação de dados."
        },
        {
          id: "convex",
          nome: "Envoltória Convexa",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "📦",
          frase: "O menor polígono que contém todos os pontos!",
          detalhe: "Imagine uma borracha ao redor de pinos. Algoritmo O(n log n). Usado em detecção de colisão (games), computação gráfica, visão computacional e robótica."
        },
        {
          id: "bezier",
          nome: "Curvas de Bézier",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "✏️",
          frase: "A curva que define fontes e logos vetoriais!",
          detalhe: "P(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3. Todo texto vetorial (PDF, SVG, fontes TrueType) usa Bézier. Criada por Pierre Bézier para carrocerias da Renault."
        },
        {
          id: "mesh",
          nome: "Malhas Poligonais 3D",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🎮",
          frase: "Como games representam personagens!",
          detalhe: "Todo objeto 3D em games é uma malha de triângulos. Um personagem pode ter 10k a 10M triângulos. Ray tracing calcula intersecção de raios com triângulos em tempo real."
        },
        {
          id: "raster",
          nome: "Rasterização de Formas",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🖥️",
          frase: "Como a tela converte geometria em pixels!",
          detalhe: "Algoritmo de Bresenham converte linhas matemáticas em pixels. A GPU faz isso bilhões de vezes por segundo. Antialiasing suaviza bordas serrilhadas com pixels parcialmente coloridos."
        },
        {
          id: "pathfind",
          nome: "Pathfinding Geométrico",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🤖",
          frase: "Como robôs e NPCs encontram caminhos!",
          detalhe: "A* e Dijkstra buscam caminhos em grafos. Robôs mapeiam o ambiente em polígonos de obstáculos e calculam o caminho mais curto no espaço livre em tempo real."
        },
        {
          id: "sdf",
          nome: "Signed Distance Fields",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🌊",
          frase: "Fontes ultra-nítidas em qualquer tamanho!",
          detalhe: "Cada pixel armazena a distância até a borda mais próxima da forma. Permite escalar texto e ícones sem perder qualidade. Usado em Valve games e toda UI de engines modernas."
        }
      ]
    }
  },
  {
    id: "inv_formas_origami",
    tipo: "formas",
    titulo: "Matemática do Origami",
    descricao: "A geometria escondida na arte de dobrar papel!",
    emoji: "🦢",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "O origami não é só arte — é geometria pura! 🦢 Matemáticos usaram o origami para resolver problemas impossíveis com régua e compasso, e engenheiros dobram satélites e airbags usando esses princípios.",
    dados: {
      formas: [
        {
          id: "huzita",
          nome: "Axiomas de Huzita-Hatori",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "📐",
          frase: "7 regras que definem toda dobra possível!",
          detalhe: "Os 7 axiomas de Huzita-Hatori definem todas as dobras de origami. Eles são MAIS poderosos que régua e compasso — permitem trissectar ângulos e duplicar cubos (impossíveis classicamente)!"
        },
        {
          id: "miura",
          nome: "Dobra Miura",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🛸",
          frase: "Como painéis solares de satélites são dobrados!",
          detalhe: "A Dobra Miura (1970, JAXA) permite desdobrar painéis solares gigantes com um único puxão. Uma dobra periódica em paralelogramos que colapsa de uma folha grande em pequeno retângulo."
        },
        {
          id: "waterbomb",
          nome: "Waterbomb Base",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "💧",
          frase: "A base de muitos modelos clássicos!",
          detalhe: "Cria 4 pontas a partir de um quadrado. É a base do balão de água e da estrela ninja. Matematicamente, envolve pontos de dobra e reflexões — uma transformação isométrica."
        },
        {
          id: "airbag",
          nome: "Origami em Airbags",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🚗",
          frase: "Airbags são dobrados com matemática de origami!",
          detalhe: "Software como Origamizer (MIT) calcula como dobrar um airbag para que expanda corretamente. A mesma matemática dobra stents cardíacos que se abrem dentro de artérias."
        },
        {
          id: "flat",
          nome: "Origami Planificável",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "📄",
          frase: "Quando uma dobra fica completamente plana!",
          detalhe: "Teorema de Kawasaki: soma alternada dos ângulos em um vértice = 0. Teorema de Maekawa: diferença entre dobras montanha e vale = ±2. Condições para modelo flat-foldable."
        },
        {
          id: "crease",
          nome: "Padrão de Dobras (Crease Pattern)",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🗺️",
          frase: "O mapa completo de uma escultura de origami!",
          detalhe: "O crease pattern mostra todas as dobras antes de dobrá-las. Modelos complexos (sapos, insetos) têm centenas de dobras. Projetado com software como TreeMaker (Robert Lang, ex-NASA)."
        },
        {
          id: "medical",
          nome: "Origami Médico",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🏥",
          frase: "Stents, implantes e cápsulas dobráveis!",
          detalhe: "Stents cardíacos usam dobras para entrar em artérias e se expandir. Cápsulas de remédio se dobram para liberar no lugar certo. Pesquisas da Harvard usam origami para robôs auto-montáveis."
        },
        {
          id: "tesselation",
          nome: "Tessellations de Origami",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🔳",
          frase: "Padrões que cobrem o plano por dobras!",
          detalhe: "Ron Resch (1960s) criou tessellations de origami — padrões que cobrem o plano infinito. Usados em fachadas de prédios, materiais meta com propriedades especiais (absorvem impacto)."
        }
      ]
    }
  },
  {
    id: "inv_formas_nao_euclidiana",
    tipo: "formas",
    titulo: "Geometria Não-Euclidiana",
    descricao: "Geometrias onde as regras clássicas não valem!",
    emoji: "🌐",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "Por 2.000 anos, acreditamos que Euclides tinha a geometria \"perfeita\". Mas no século XIX descobrimos geometrias onde triângulos têm soma de ângulos diferente de 180°! 🌐 E a Terra usa uma delas.",
    dados: {
      formas: [
        {
          id: "esferica",
          nome: "Geometria Esférica",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "🌍",
          frase: "Na esfera, triângulos somam mais de 180°!",
          detalhe: "Triângulo Polo Norte → Equador A → Equador B: 3 ângulos retos = 270°! Paralelas se encontram (meridianos). Aviões usam geometria esférica — rotas no globo não são linhas retas no mapa."
        },
        {
          id: "hiperbolica",
          nome: "Geometria Hiperbólica",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🔴",
          frase: "Na sela de cavalo, triângulos somam menos de 180°!",
          detalhe: "Em superfície com curvatura negativa (forma de sela): soma dos ângulos < 180°. Infinitas paralelas passam por um ponto externo! Crochê hiperbólico é a melhor forma de visualizar."
        },
        {
          id: "gauss",
          nome: "Curvatura de Gauss",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🏔️",
          frase: "O número que define o tipo de superfície!",
          detalhe: "K > 0: esfera (positiva). K = 0: plano (Euclidiano). K < 0: sela (negativa). Gauss provou que a curvatura pode ser medida SEM sair da superfície — chamou de \"Theorema Egregium\"."
        },
        {
          id: "poincare",
          nome: "Disco de Poincaré",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🎯",
          frase: "Visualizando geometria hiperbólica no plano!",
          detalhe: "Poincaré colocou o espaço hiperbólico infinito dentro de um disco finito. As \"retas\" são arcos de círculo. Usado em arte por M.C. Escher (Circle Limit series)."
        },
        {
          id: "einstein",
          nome: "Relatividade Geral",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "⚛️",
          frase: "O universo segue geometria não-euclidiana!",
          detalhe: "Einstein (1915): massa curva o espaço-tempo. Luz dobra ao passar perto do Sol (confirmado em 1919). GPS precisa corrigir efeitos relativísticos para ser preciso. A geometria do universo é não-euclidiana!"
        },
        {
          id: "lobachevski",
          nome: "Lobachevski e Bolyai",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "📜",
          frase: "Descobriram geometrias não-euclidianas independentemente!",
          detalhe: "Nikolai Lobachevski (1829) e János Bolyai (1832) descobriram geometria hiperbólica ao mesmo tempo. Gauss já sabia mas não publicou com medo do escândalo. Bolyai escreveu ao pai: \"Criei um mundo novo do nada!\""
        },
        {
          id: "riemanniana",
          nome: "Geometria Riemanniana",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "📐",
          frase: "A linguagem da relatividade geral!",
          detalhe: "Riemann (1854) generalizou para n dimensões com curvatura variável. Deu a Einstein a linguagem matemática para descrever o espaço-tempo. Tensor de Riemann: mede a curvatura em cada ponto do espaço."
        },
        {
          id: "universo",
          nome: "Forma do Universo",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🌌",
          frase: "Plano, esférico ou hiperbólico?",
          detalhe: "Medições do CMB (radiação cósmica) sugerem que o universo é plano com precisão de 0,4%. Mas pode ser \"flat toroidal\" — como Pac-Man, onde sair de um lado te traz do outro. Ainda não sabemos!"
        }
      ]
    }
  },
  {
    id: "inv_formas_knot",
    tipo: "formas",
    titulo: "Teoria dos Nós",
    descricao: "A matemática que classifica nós e links topológicos!",
    emoji: "🪢",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "Um nó matemático é uma curva fechada no espaço 3D. 🪢 Quando dois nós são \"iguais\"? Essa questão simples gerou um campo da matemática que se conecta à física quântica, biologia do DNA e química molecular.",
    dados: {
      formas: [
        {
          id: "trivial",
          nome: "Nó Trivial (Círculo)",
          cor: "#4F8EE8",
          svg: "circle",
          frase: "O círculo é o nó mais simples!",
          detalhe: "O nó trivial é apenas um laço fechado sem cruzamentos. Qualquer nó que pode ser desfeito vira o nó trivial. Provar que um nó NÃO é trivial é matematicamente difícil!"
        },
        {
          id: "trefoil",
          nome: "Nó Trefoil",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🪢",
          frase: "O nó mais simples que não pode ser desfeito!",
          detalhe: "3 cruzamentos. Existem dois trefoils — dextrogiro e levogiro — como mãos direita e esquerda: não podem ser sobrepostos! É quiral. DNA da E.coli frequentemente forma trefoil."
        },
        {
          id: "figure8",
          nome: "Nó Figura-8",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "∞",
          frase: "4 cruzamentos — anfiquiral (igual ao espelho)!",
          detalhe: "O nó figura-8 é o único nó de 4 cruzamentos e é anfiquiral — igual ao seu espelho. Aparece no DNA superenrolado de bactérias. As enzimas topoisomerases desfazem esses nós!"
        },
        {
          id: "invariant",
          nome: "Invariantes de Nó",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "🔢",
          frase: "Como provar que dois nós são diferentes?",
          detalhe: "Polinômio de Jones (1984, Fields Medal): equação algébrica que identifica nós. Revolucionou a topologia e conectou-se à física quântica (teoria de campos). Ainda não classificou todos os nós!"
        },
        {
          id: "dna",
          nome: "Nós no DNA",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "🧬",
          frase: "DNA se enrola em nós — enzimas desfazem!",
          detalhe: "DNA humano: 2m comprimidos em célula de 6μm → enrolamento extremo cria nós. Topoisomerases cortam e religam para desfazer os nós antes da replicação. Sem elas a célula morre!"
        },
        {
          id: "quimica",
          nome: "Moléculas em Nó",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "⚗️",
          frase: "Químicos sintetizaram moléculas em nó!",
          detalhe: "Em 2017, Manchester: primeira molécula com estrutura de trefoil com 8 cruzamentos — menor nó sintético do mundo (192 átomos). Potencial para materiais com propriedades mecânicas únicas."
        },
        {
          id: "quantum",
          nome: "Anions e Física Quântica",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "⚛️",
          frase: "Partículas em 2D se comportam como nós!",
          detalhe: "Anions (partículas 2D): ao trocar de posição, a função de onda adquire fase topológica — tipo de \"nó\" quântico. Base dos computadores quânticos topológicos (Microsoft) — resistentes a erros por serem protegidos pela topologia!"
        },
        {
          id: "tabela",
          nome: "Tabela de Nós",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "📊",
          frase: "0 cruzamentos: 1 nó. 3: 1. 4: 1. 5: 2. 6: 3...",
          detalhe: "Tait começou a tabular nós em 1877. Hoje conhecemos mais de 1,7 milhão de nós com até 16 cruzamentos. O problema de classificar TODOS os nós é em aberto — equivalente à Hipótese de Poincaré em 3D."
        }
      ]
    }
  },
  {
    id: "inv_formas_platao",
    tipo: "formas",
    titulo: "Sólidos de Platão e Poliedros",
    descricao: "Os 5 poliedros regulares perfeitos — e por que só existem 5!",
    emoji: "🔮",
    habilidade: "Geometria Avançada",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 14,
    historinha: "Platão acreditava que o universo era feito de 5 formas perfeitas — e a matemática prova que são exatamente 5, nem mais nem menos! 🔮 Nenhum outro poliedro regular pode existir.",
    dados: {
      formas: [
        {
          id: "tetraedro",
          nome: "Tetraedro (4 faces)",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "🔺",
          frase: "4 triângulos equiláteros — o mais simples!",
          detalhe: "4 faces | 4 vértices | 6 arestas | Dual de si mesmo | Platão: representa o FOGO | Ângulo sólido: arctan(2√2) | Ângulo diedro: arccos(1/3) ≈ 70,5°"
        },
        {
          id: "cubo",
          nome: "Cubo (6 faces)",
          cor: "#4F8EE8",
          svg: "emoji",
          emoji: "📦",
          frase: "6 quadrados — o único que empilha perfeitamente!",
          detalhe: "6 faces | 8 vértices | 12 arestas | Dual: octaedro | Platão: representa a TERRA | Único dos 5 que preenche o espaço 3D sozinho."
        },
        {
          id: "octaedro",
          nome: "Octaedro (8 faces)",
          cor: "#1D9E75",
          svg: "emoji",
          emoji: "💎",
          frase: "8 triângulos — dual do cubo!",
          detalhe: "8 faces | 6 vértices | 12 arestas | Dual: cubo | Platão: representa o AR | Ângulo diedro: arccos(−1/3) ≈ 109,5° (mesmo ângulo das ligações no metano!)"
        },
        {
          id: "dodecaedro",
          nome: "Dodecaedro (12 faces)",
          cor: "#EF9F27",
          svg: "emoji",
          emoji: "🌸",
          frase: "12 pentágonos — ligado à razão áurea!",
          detalhe: "12 faces pentagonais | 20 vértices | 30 arestas | Dual: icosaedro | Platão: representa o COSMOS | Vértices em proporção áurea. Vírus de algumas plantas têm essa simetria!"
        },
        {
          id: "icosaedro",
          nome: "Icosaedro (20 faces)",
          cor: "#7F77DD",
          svg: "emoji",
          emoji: "⬡",
          frase: "20 triângulos — base das cápsulas de vírus!",
          detalhe: "20 faces | 12 vértices | 30 arestas | Dual: dodecaedro | Platão: representa a ÁGUA | Vírus (como adenovírus) têm simetria icosaédrica — maximiza volume com mínima proteína!"
        },
        {
          id: "euler_solid",
          nome: "Fórmula de Euler",
          cor: "#D4537E",
          svg: "emoji",
          emoji: "🔢",
          frase: "V − A + F = 2 para TODOS os poliedros convexos!",
          detalhe: "Euler (1758): Vértices − Arestas + Faces = 2. Cubo: 8−12+6=2. Icosaedro: 12−30+20=2. Isso prova que só podem existir 5 poliedros regulares — tentativas com outros polígonos sempre violam Euler."
        },
        {
          id: "arquimediano",
          nome: "Sólidos de Arquimedes",
          cor: "#534AB7",
          svg: "emoji",
          emoji: "🪐",
          frase: "13 sólidos semi-regulares além dos 5 de Platão!",
          detalhe: "Futebol = icosaedro truncado (12 pentágonos + 20 hexágonos). C60 (Buckminsterfulereno) tem a mesma estrutura — foi descoberto em 1985 e ganhou Nobel em 1996!"
        },
        {
          id: "quase_cristal",
          nome: "Simetria de Icosaedro em Cristais",
          cor: "#D85A30",
          svg: "emoji",
          emoji: "💠",
          frase: "Impossível em cristais... até 1982!",
          detalhe: "Cristais clássicos só têm simetria 2,3,4,6. Dan Shechtman observou simetria de icosaedro (5) em liga de alumínio — \"impossível\". Foi ridicularizado, depois ganhou Nobel de Química 2011."
        }
      ]
    }
  }
]

// ── Inglês — vocabulário, flashcards, frases e leitura ──
export const inglesExtraPorFaixa = [
  {
    id: "inv_ingles",
    tipo: "ingles",
    titulo: "Inglês — Reading",
    descricao: "Leia textos em inglês sobre IA e espaço e responda questões de compreensão!",
    emoji: "🇺🇸",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "Leia textos reais em inglês sobre Inteligência Artificial e Exploração Espacial!"
  },
  {
    id: "inv_ingles_ciencia",
    tipo: "ingles",
    titulo: "Inglês — Ciência Moderna",
    descricao: "Leia textos sobre descobertas científicas em inglês!",
    emoji: "🔬",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "A ciência moderna é escrita em inglês! Leia e compreenda textos científicos reais!",
    dados: {
      textos: [
        {
          titulo: "CRISPR and Gene Editing",
          emoji: "🧬",
          texto: "CRISPR-Cas9 is a revolutionary gene-editing technology discovered in 2012 by Jennifer Doudna and Emmanuelle Charpentier, who won the Nobel Prize in Chemistry in 2020. This \"molecular scissors\" technology can cut DNA at precise locations, allowing scientists to add, remove, or modify genetic sequences. CRISPR is being tested to treat genetic diseases such as sickle cell anemia and certain types of cancer. It could potentially eliminate hereditary conditions that have affected humans for thousands of years. However, ethical debates surround the editing of human embryos, as changes would be inherited by future generations.",
          perguntas: [
            {
              p: "Quem descobriu a tecnologia CRISPR-Cas9?",
              ops: ["Einstein e Bohr", "Doudna e Charpentier", "Watson e Crick", "Curie e Pasteur"],
              c: 1
            },
            {
              p: "O que significa \"molecular scissors\"?",
              ops: [
                "Ferramentas moleculares de costura",
                "Tesouras moleculares (corta DNA)",
                "Microscópio molecular",
                "Análise molecular"
              ],
              c: 1
            },
            {
              p: "Que prêmio as cientistas ganharam?",
              ops: ["Nobel de Física", "Nobel de Medicina", "Nobel de Química", "Nobel da Paz"],
              c: 2
            },
            {
              p: "Qual doença é mencionada como alvo do CRISPR?",
              ops: ["Diabetes", "Anemia falciforme", "Malária", "Alzheimer"],
              c: 1
            },
            {
              p: "Qual é o debate ético principal mencionado?",
              ops: ["Custo da tecnologia", "Edição de embriões humanos", "Propriedade intelectual", "Uso militar"],
              c: 1
            }
          ]
        },
        {
          titulo: "Quantum Computing",
          emoji: "⚛️",
          texto: "Quantum computers use quantum bits, or \"qubits,\" which can exist in multiple states simultaneously due to a phenomenon called superposition. Unlike classical computers that process information as 0s or 1s, quantum computers can process both simultaneously. Quantum entanglement allows qubits to be interconnected, so the state of one instantly influences another. In 2019, Google claimed \"quantum supremacy\" when its quantum computer solved a problem in 200 seconds that would take classical supercomputers 10,000 years. Quantum computing could revolutionize cryptography, drug discovery, and climate modeling.",
          perguntas: [
            {
              p: "O que são qubits?",
              ops: ["Bits clássicos", "Bits quânticos", "Bytes quânticos", "Quilobytes"],
              c: 1
            },
            {
              p: "O que é superposição?",
              ops: [
                "Velocidade de processamento",
                "Existir em vários estados ao mesmo tempo",
                "Tipo de memória",
                "Linguagem de programação"
              ],
              c: 1
            },
            {
              p: "Qual empresa alegou \"supremacia quântica\" em 2019?",
              ops: ["Microsoft", "IBM", "Google", "Apple"],
              c: 2
            },
            {
              p: "Em quanto tempo o computador quântico resolveu o problema?",
              ops: ["200 horas", "200 minutos", "200 dias", "200 segundos"],
              c: 3
            },
            {
              p: "\"Entanglement\" no texto significa:",
              ops: ["Velocidade", "Embaralhamento", "Entrelaçamento", "Processamento"],
              c: 2
            }
          ]
        }
      ]
    }
  },
  {
    id: "inv_ingles_historia",
    tipo: "ingles",
    titulo: "Inglês — História Mundial",
    descricao: "Leia sobre eventos históricos marcantes em inglês!",
    emoji: "📜",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "A história da humanidade em inglês! Leia sobre os eventos que mudaram o mundo!",
    dados: {
      textos: [
        {
          titulo: "The Renaissance",
          emoji: "🎨",
          texto: "The Renaissance was a cultural and intellectual movement that began in Italy in the 14th century and spread throughout Europe. The word \"renaissance\" means \"rebirth\" in French. This period saw a renewed interest in ancient Greek and Roman learning, art, and philosophy. Leonardo da Vinci embodied the \"Renaissance man\" ideal — excelling in painting, sculpture, architecture, science, and engineering simultaneously. The invention of the printing press by Gutenberg around 1440 accelerated the spread of Renaissance ideas across Europe. The Renaissance fundamentally changed how humans viewed themselves and their place in the universe.",
          perguntas: [
            {
              p: "O que significa \"renaissance\" em francês?",
              ops: ["Revolução", "Renascimento", "Reforma", "Reconstrução"],
              c: 1
            },
            {
              p: "Onde a Renascença começou?",
              ops: ["França", "Alemanha", "Itália", "Inglaterra"],
              c: 2
            },
            {
              p: "Quem inventou a prensa móvel?",
              ops: ["Da Vinci", "Gutenberg", "Galileu", "Newton"],
              c: 1
            },
            {
              p: "O que caracterizava um \"Renaissance man\"?",
              ops: ["Especialista em uma área", "Habilidoso em muitas áreas", "Rico e nobre", "Religioso e devoto"],
              c: 1
            },
            {
              p: "A Renascença teve início em qual século?",
              ops: ["12°", "13°", "14°", "15°"],
              c: 2
            }
          ]
        },
        {
          titulo: "The Industrial Revolution",
          emoji: "🏭",
          texto: "The Industrial Revolution began in Britain in the 1760s and transformed the world from agricultural to industrial societies. Steam power, greatly improved by James Watt, replaced human and animal labor in factories. New transportation systems — railways and steamships — connected cities and nations, revolutionizing trade. Cities grew rapidly as people moved from rural areas to work in factories, creating new social classes. Child labor was widespread; children as young as 5 worked in dangerous conditions. The revolution increased productivity enormously but also created significant social problems that led to labor rights movements and eventually modern workers' rights.",
          perguntas: [
            {
              p: "Onde começou a Revolução Industrial?",
              ops: ["França", "Alemanha", "Estados Unidos", "Grã-Bretanha"],
              c: 3
            },
            {
              p: "Qual fonte de energia foi fundamental?",
              ops: ["Carvão", "Petróleo", "Vapor", "Eletricidade"],
              c: 2
            },
            {
              p: "Quem inventou a máquina a vapor eficiente?",
              ops: ["Newton", "Edison", "Watt", "Tesla"],
              c: 2
            },
            {
              p: "Qual problema social é mencionado?",
              ops: ["Fome", "Trabalho infantil", "Guerras", "Doenças"],
              c: 1
            },
            {
              p: "\"Productivity\" no texto significa:",
              ops: ["Lucro", "Produtividade", "Proteção", "Progresso"],
              c: 1
            }
          ]
        }
      ]
    }
  },
  {
    id: "inv_ingles_tecnologia",
    tipo: "ingles",
    titulo: "Inglês — Tecnologia e Futuro",
    descricao: "Leia sobre inovações tecnológicas do século XXI!",
    emoji: "🚀",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "O futuro está sendo construído hoje! Leia sobre as tecnologias que vão mudar nossa vida!",
    dados: {
      textos: [
        {
          titulo: "Electric Vehicles and Sustainability",
          emoji: "🚗",
          texto: "Electric vehicles (EVs) are transforming the global transportation industry. Unlike gasoline-powered cars, EVs run on electric motors powered by rechargeable batteries, producing zero direct emissions. Tesla, founded by Elon Musk, popularized the modern EV with vehicles offering over 500 km of range on a single charge. Governments worldwide are offering incentives — tax credits and subsidies — to accelerate adoption. The International Energy Agency predicts that by 2030, EVs will represent 60% of new car sales globally. Challenges remain: battery production requires lithium and cobalt mining, which has environmental and social costs.",
          perguntas: [
            {
              p: "O que significa EV?",
              ops: ["Electric Velocity", "Energy Vehicle", "Electric Vehicle", "Eco-Vehicle"],
              c: 2
            },
            {
              p: "Qual é a emissão direta de um EV?",
              ops: ["Alta emissão de CO2", "Zero emissão direta", "Emissão de metano", "Emissão de óxido nitroso"],
              c: 1
            },
            {
              p: "Qual empresa popularizou os EVs modernos?",
              ops: ["BMW", "Toyota", "Ford", "Tesla"],
              c: 3
            },
            {
              p: "Qual a previsão da IEA para EVs em 2030?",
              ops: ["30% dos carros novos", "40% dos carros novos", "60% dos carros novos", "80% dos carros novos"],
              c: 2
            },
            {
              p: "\"Subsidies\" no texto significa:",
              ops: ["Impostos", "Subsídios", "Multas", "Tarifas"],
              c: 1
            }
          ]
        },
        {
          titulo: "The Metaverse",
          emoji: "🥽",
          texto: "The metaverse is a concept of a persistent, shared virtual world that combines augmented reality (AR), virtual reality (VR), and the internet. Users can interact through digital avatars, own virtual property, attend concerts, and work in immersive environments. Meta (formerly Facebook) invested $10 billion in 2021 to develop metaverse technologies. While the concept was popularized by Neal Stephenson's 1992 novel \"Snow Crash,\" the technology to create it is still emerging. Critics argue the metaverse raises serious privacy concerns, could deepen social isolation, and requires significant computing power with associated carbon footprint.",
          perguntas: [
            {
              p: "O que é o metaverso?",
              ops: [
                "Rede social comum",
                "Mundo virtual compartilhado persistente",
                "Videogame online",
                "Plataforma de e-commerce"
              ],
              c: 1
            },
            {
              p: "Quanto a Meta investiu em 2021?",
              ops: ["$1 bilhão", "$5 bilhões", "$10 bilhões", "$100 bilhões"],
              c: 2
            },
            {
              p: "Qual livro popularizou o conceito?",
              ops: ["Ready Player One", "Snow Crash", "Matrix", "Neuromancer"],
              c: 1
            },
            {
              p: "AR significa:",
              ops: ["Artificial Reality", "Augmented Reality", "Advanced Reality", "Automatic Reality"],
              c: 1
            },
            {
              p: "Qual crítica ao metaverso é mencionada?",
              ops: ["Custo elevado", "Falta de conteúdo", "Privacidade e isolamento social", "Velocidade de internet"],
              c: 2
            }
          ]
        }
      ]
    }
  },
  {
    id: "inv_ingles_natureza",
    tipo: "ingles",
    titulo: "Inglês — Meio Ambiente e Clima",
    descricao: "Textos sobre mudanças climáticas e sustentabilidade!",
    emoji: "🌍",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "O planeta precisa de defensores que falem inglês! Leia sobre o meio ambiente!",
    dados: {
      textos: [
        {
          titulo: "Climate Change",
          emoji: "🌡️",
          texto: "Climate change refers to long-term shifts in global temperatures and weather patterns. While natural factors have always influenced climate, since the Industrial Revolution, human activities have become the main driver. Burning fossil fuels — coal, oil, and gas — releases greenhouse gases, primarily carbon dioxide (CO₂) and methane (CH₄), which trap heat in the atmosphere. The Intergovernmental Panel on Climate Change (IPCC) warns that limiting warming to 1.5°C above pre-industrial levels requires cutting global emissions by 45% by 2030 and reaching net-zero by 2050. Rising seas, extreme weather, food insecurity, and mass migrations are among the projected consequences.",
          perguntas: [
            {
              p: "Qual é a causa principal das mudanças climáticas modernas?",
              ops: ["Atividade vulcânica", "Ciclos solares", "Atividades humanas", "Desvio da órbita terrestre"],
              c: 2
            },
            {
              p: "Quais são os principais gases do efeito estufa mencionados?",
              ops: ["O₂ e N₂", "CO₂ e CH₄", "SO₂ e NO₂", "H₂O e O₃"],
              c: 1
            },
            {
              p: "Qual é a meta de aquecimento do Acordo de Paris?",
              ops: ["1°C", "1.5°C", "2°C", "2.5°C"],
              c: 1
            },
            {
              p: "O que significa IPCC?",
              ops: [
                "Instituto de Pesquisa do Clima",
                "Painel Intergovernamental sobre Mudanças Climáticas",
                "Programa Internacional de Clima",
                "Parceria Internacional de Combate ao CO₂"
              ],
              c: 1
            },
            {
              p: "\"Net-zero by 2050\" significa:",
              ops: [
                "Crescimento econômico nulo em 2050",
                "Emissões líquidas zero em 2050",
                "Energia 100% nuclear em 2050",
                "Desmatamento zero em 2050"
              ],
              c: 1
            }
          ]
        },
        {
          titulo: "Ocean Plastic Crisis",
          emoji: "🌊",
          texto: "Every year, approximately 8 million metric tons of plastic enter the oceans, threatening marine ecosystems. Plastic breaks down into microplastics — tiny particles less than 5mm — which are now found in the deepest ocean trenches and even in human blood. The Great Pacific Garbage Patch, a massive accumulation of plastic debris, covers an area twice the size of Texas. Innovations like biodegradable plastics, ocean cleanup technologies developed by organizations like The Ocean Cleanup, and policies banning single-use plastics are emerging solutions. However, experts emphasize that reducing plastic production at the source is more effective than cleanup efforts.",
          perguntas: [
            {
              p: "Quantas toneladas de plástico entram nos oceanos por ano?",
              ops: ["800 mil", "8 milhões", "80 milhões", "800 milhões"],
              c: 1
            },
            {
              p: "O que são microplásticos?",
              ops: [
                "Plástico biodegradável",
                "Partículas de plástico menores que 5mm",
                "Plástico reciclado",
                "Plástico transparente"
              ],
              c: 1
            },
            {
              p: "Qual é o tamanho do Great Pacific Garbage Patch?",
              ops: ["Tamanho do Brasil", "2× tamanho do Texas", "Tamanho da Europa", "2× tamanho da China"],
              c: 1
            },
            {
              p: "Onde foram encontrados microplásticos?",
              ops: [
                "Apenas no oceano",
                "Apenas em peixes",
                "No sangue humano e nas fossas oceânicas",
                "Apenas nas praias"
              ],
              c: 2
            },
            {
              p: "Qual é a solução mais eficaz segundo especialistas?",
              ops: [
                "Limpeza dos oceanos",
                "Reciclagem de plástico",
                "Reduzir a produção de plástico na fonte",
                "Substituir plástico por metal"
              ],
              c: 2
            }
          ]
        }
      ]
    }
  },
  {
    id: "inv_ingles_cultura",
    tipo: "ingles",
    titulo: "Inglês — Cultura e Sociedade",
    descricao: "Textos sobre diversidade cultural e sociedade global!",
    emoji: "🌏",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "O mundo é diverso e fascinante! Leia sobre culturas ao redor do globo em inglês!",
    dados: {
      textos: [
        {
          titulo: "The Power of Language",
          emoji: "🗣️",
          texto: "Language is much more than a communication tool — it shapes how we think and perceive the world. The Sapir-Whorf hypothesis suggests that the language we speak influences our thoughts and worldview. For example, the Hopi language has no words for past, present, or future as separate concepts. The Russian language has separate words for light blue and dark blue, and Russian speakers perceive these as entirely different colors. English is the dominant global language with approximately 1.5 billion speakers worldwide, but Mandarin Chinese has the most native speakers at 920 million. Every two weeks, a language dies — meaning all accumulated cultural knowledge encoded in it is lost forever.",
          perguntas: [
            {
              p: "O que afirma a hipótese Sapir-Whorf?",
              ops: [
                "Línguas são todas iguais",
                "A língua influencia os pensamentos",
                "A matemática é universal",
                "Todos podem aprender qualquer língua"
              ],
              c: 1
            },
            {
              p: "Quantos falantes tem o inglês globalmente?",
              ops: ["920 milhões", "1 bilhão", "1,5 bilhão", "2 bilhões"],
              c: 2
            },
            {
              p: "Qual língua tem mais falantes nativos?",
              ops: ["Inglês", "Espanhol", "Hindi", "Mandarim chinês"],
              c: 3
            },
            {
              p: "Com que frequência uma língua morre?",
              ops: ["A cada dia", "A cada semana", "A cada 2 semanas", "A cada mês"],
              c: 2
            },
            {
              p: "O exemplo do russo demonstra:",
              ops: [
                "Que idiomas têm gramáticas diferentes",
                "Que a língua afeta a percepção de cores",
                "Que há mais palavras em russo",
                "Que azul é a cor favorita dos russos"
              ],
              c: 1
            }
          ]
        },
        {
          titulo: "Social Media and Society",
          emoji: "📱",
          texto: "Social media has fundamentally transformed how humans connect, communicate, and consume information. Platforms like Instagram, TikTok, and YouTube reach billions of users daily. Studies show that social media can increase feelings of connection but also contribute to anxiety, depression, and body image issues, especially among teenagers. The algorithm-driven content has been criticized for creating \"echo chambers\" where users only see information confirming their existing beliefs. Misinformation spreads six times faster on social media than factual information, according to MIT research. Some countries have implemented regulations, and experts debate whether social media companies should be treated like traditional media outlets with editorial responsibility.",
          perguntas: [
            {
              p: "Qual efeito positivo das redes sociais é mencionado?",
              ops: ["Aumenta renda", "Aumenta conexão humana", "Aumenta QI", "Aumenta produtividade"],
              c: 1
            },
            {
              p: "O que são \"echo chambers\"?",
              ops: [
                "Salas de estúdio",
                "Câmaras de eco onde só se vê o que confirma crenças",
                "Algoritmos de busca",
                "Grupos de debate equilibrados"
              ],
              c: 1
            },
            {
              p: "Quantas vezes mais rápida é a desinformação?",
              ops: ["2×", "4×", "6×", "10×"],
              c: 2
            },
            {
              p: "Qual universidade pesquisou a velocidade da desinformação?",
              ops: ["Harvard", "Stanford", "MIT", "Oxford"],
              c: 2
            },
            {
              p: "\"Algorithm-driven content\" significa:",
              ops: [
                "Conteúdo criado por algoritmos",
                "Conteúdo selecionado por algoritmos",
                "Conteúdo bloqueado por algoritmos",
                "Conteúdo vendido por algoritmos"
              ],
              c: 1
            }
          ]
        }
      ]
    }
  },
  {
    id: "inv_ingles_economia",
    tipo: "ingles",
    titulo: "Inglês — Economia Global",
    descricao: "Leia textos sobre economia e mercados globais!",
    emoji: "💹",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "O dinheiro do mundo fala inglês! Leia sobre economia global e tome decisões mais inteligentes!",
    dados: {
      textos: [
        {
          titulo: "The Gig Economy",
          emoji: "🚗",
          texto: "The gig economy refers to a labor market characterized by short-term, flexible, and freelance work rather than permanent jobs. Platforms like Uber, Airbnb, Fiverr, and Upwork connect workers directly with customers, bypassing traditional employers. In the United States, approximately 59 million Americans — or 36% of the workforce — participated in freelance work in 2020. Workers gain flexibility and autonomy but lose traditional benefits such as health insurance, retirement plans, and job security. The gig economy has enabled entrepreneurship and supplemental income for millions, but critics argue it erodes workers' rights and creates economic instability.",
          perguntas: [
            {
              p: "O que é a \"gig economy\"?",
              ops: [
                "Economia de gigantes corporativos",
                "Trabalho temporário e freelance",
                "Setor de entretenimento",
                "Economia digital do futuro"
              ],
              c: 1
            },
            {
              p: "Qual porcentagem dos americanos trabalhou como freelance em 2020?",
              ops: ["16%", "26%", "36%", "46%"],
              c: 2
            },
            {
              p: "Qual benefício o trabalhador gig ganha?",
              ops: [
                "Plano de saúde",
                "Aposentadoria garantida",
                "Flexibilidade e autonomia",
                "Estabilidade de emprego"
              ],
              c: 2
            },
            {
              p: "\"Bypassing traditional employers\" significa:",
              ops: [
                "Contratando empregadores tradicionais",
                "Ignorando/pulando empregadores tradicionais",
                "Respeitando empregadores tradicionais",
                "Competindo com empregadores"
              ],
              c: 1
            },
            {
              p: "Qual é a crítica à gig economy mencionada?",
              ops: ["Gera desemprego", "Erode direitos trabalhistas", "Aumenta impostos", "Causa inflação"],
              c: 1
            }
          ]
        },
        {
          titulo: "Cryptocurrency and Blockchain",
          emoji: "₿",
          texto: "Bitcoin, created by the anonymous Satoshi Nakamoto in 2009, was the first cryptocurrency — a digital currency that operates without central banks. Blockchain, the technology behind Bitcoin, is a distributed ledger that records transactions across thousands of computers simultaneously, making fraud nearly impossible. Ethereum expanded blockchain capabilities with \"smart contracts\" — self-executing agreements that trigger automatically when conditions are met. The total market capitalization of cryptocurrencies surpassed $3 trillion at its peak in 2021. However, cryptocurrencies are highly volatile, have been used in illegal transactions, and Bitcoin mining consumes as much energy as entire countries like Argentina.",
          perguntas: [
            {
              p: "Quem criou o Bitcoin?",
              ops: ["Elon Musk", "Mark Zuckerberg", "Satoshi Nakamoto", "Vitalik Buterin"],
              c: 2
            },
            {
              p: "O que é blockchain?",
              ops: [
                "Moeda digital",
                "Banco central digital",
                "Registro distribuído de transações",
                "Software de pagamento"
              ],
              c: 2
            },
            {
              p: "O que são \"smart contracts\"?",
              ops: [
                "Advogados digitais",
                "Acordos auto-executáveis por código",
                "Contratos físicos digitalizados",
                "Sistemas de pagamento"
              ],
              c: 1
            },
            {
              p: "Qual o pico do mercado de criptomoedas?",
              ops: ["$300 bilhões", "$1 trilhão", "$3 trilhões", "$10 trilhões"],
              c: 2
            },
            {
              p: "Qual é a crítica ambiental ao Bitcoin?",
              ops: [
                "Produz CO₂ direto",
                "Consome muita água",
                "Consome energia equivalente a países inteiros",
                "Gera resíduos eletrônicos"
              ],
              c: 2
            }
          ]
        }
      ]
    }
  },
  {
    id: "inv_ingles_saude",
    tipo: "ingles",
    titulo: "Inglês — Saúde e Neurociência",
    descricao: "Leia sobre descobertas na saúde e no cérebro humano!",
    emoji: "🧠",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "A ciência da mente e do corpo em inglês! Leia sobre neurociência e saúde moderna!",
    dados: {
      textos: [
        {
          titulo: "The Science of Sleep",
          emoji: "😴",
          texto: "Sleep is not merely a period of rest — it is an active biological process essential for survival. During sleep, the brain consolidates memories, moving information from short-term to long-term storage. The glymphatic system, discovered in 2012, removes toxic proteins from the brain during sleep, including amyloid-beta, associated with Alzheimer's disease. Adults need 7–9 hours of sleep per night, yet the CDC reports that one-third of American adults are chronically sleep-deprived. Sleep deprivation impairs judgment, reaction time, and immune function — studies show that sleeping less than 6 hours per night increases the risk of cardiovascular disease by 200%.",
          perguntas: [
            {
              p: "O que o cérebro faz durante o sono?",
              ops: [
                "Desliga completamente",
                "Consolida memórias",
                "Processa emoções apenas",
                "Regenera apenas o corpo"
              ],
              c: 1
            },
            {
              p: "Quando foi descoberto o sistema glinfático?",
              ops: ["1992", "2002", "2012", "2022"],
              c: 2
            },
            {
              p: "Qual proteína é associada ao Alzheimer?",
              ops: ["Serotonina", "Dopamina", "Amiloide-beta", "Cortisol"],
              c: 2
            },
            {
              p: "Qual é a recomendação de horas de sono para adultos?",
              ops: ["5-6 horas", "6-7 horas", "7-9 horas", "9-11 horas"],
              c: 2
            },
            {
              p: "Dormir menos de 6h aumenta o risco de doenças cardiovasculares em:",
              ops: ["50%", "100%", "200%", "300%"],
              c: 2
            }
          ]
        },
        {
          titulo: "Mental Health in Modern Society",
          emoji: "🧠",
          texto: "Mental health disorders affect approximately one in five adults worldwide, yet only 25% of those affected in low-income countries receive treatment. Depression is the leading cause of disability globally, affecting over 280 million people. The World Health Organization (WHO) estimates that every dollar invested in mental health treatment returns four dollars in improved health and productivity. Stigma remains a major barrier: in many cultures, admitting mental illness is seen as weakness. New approaches, including digital therapy apps and AI-powered chatbots, are expanding access to care. The COVID-19 pandemic caused a 25% increase in anxiety and depression globally, highlighting the urgent need for mental health infrastructure.",
          perguntas: [
            {
              p: "Qual fração dos adultos tem transtornos mentais?",
              ops: ["1 em 10", "1 em 5", "1 em 3", "1 em 2"],
              c: 1
            },
            {
              p: "Qual é a principal causa de incapacidade no mundo?",
              ops: ["Diabetes", "Câncer", "Depressão", "Doenças cardíacas"],
              c: 2
            },
            {
              p: "Quanto retorna cada dólar investido em saúde mental?",
              ops: ["$2", "$4", "$8", "$10"],
              c: 1
            },
            {
              p: "Qual é a principal barreira de tratamento mencionada?",
              ops: ["Falta de médicos", "Custo elevado", "Estigma", "Falta de medicamentos"],
              c: 2
            },
            {
              p: "Quanto a pandemia aumentou ansiedade e depressão?",
              ops: ["10%", "15%", "25%", "50%"],
              c: 2
            }
          ]
        }
      ]
    }
  },
  {
    id: "inv_ingles_matematica",
    tipo: "ingles",
    titulo: "Inglês — Matemática e Lógica",
    descricao: "Leia textos sobre matemática, lógica e raciocínio!",
    emoji: "➕",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "A linguagem universal da matemática, escrita em inglês! Explore os mistérios dos números!",
    dados: {
      textos: [
        {
          titulo: "The Golden Ratio",
          emoji: "🌀",
          texto: "The golden ratio, approximately 1.618, represented by the Greek letter phi (φ), appears throughout nature, art, and architecture. It is obtained by dividing a line into two parts such that the ratio of the whole to the longer part equals the ratio of the longer part to the shorter. The Parthenon in Athens, the pyramids of Giza, and Leonardo da Vinci's Vitruvian Man all incorporate golden ratio proportions. In nature, the spiral patterns of galaxies, nautilus shells, and sunflower seeds follow Fibonacci numbers, which approximate the golden ratio. Many artists and architects have deliberately used this ratio to create aesthetically pleasing compositions.",
          perguntas: [
            {
              p: "Qual é o valor aproximado do número de ouro?",
              ops: ["1.414", "1.618", "2.718", "3.141"],
              c: 1
            },
            {
              p: "Qual letra grega representa o número de ouro?",
              ops: ["Pi (π)", "Sigma (σ)", "Phi (φ)", "Delta (δ)"],
              c: 2
            },
            {
              p: "Quais estruturas usam proporções da razão áurea?",
              ops: [
                "Pirâmides e Coliseu",
                "Parthenon e Pirâmides de Gizé",
                "Torre Eiffel e Big Ben",
                "Pirâmides e Stonehenge"
              ],
              c: 1
            },
            {
              p: "Em espirais da natureza, quais números aproximam a razão áurea?",
              ops: ["Números primos", "Números pares", "Sequência de Fibonacci", "Números perfeitos"],
              c: 2
            },
            {
              p: "\"Aesthetically pleasing\" significa:",
              ops: [
                "Matematicamente perfeito",
                "Esteticamente agradável",
                "Arquitetonicamente correto",
                "Geometricamente preciso"
              ],
              c: 1
            }
          ]
        },
        {
          titulo: "Probability and Decision Making",
          emoji: "🎲",
          texto: "Probability is the branch of mathematics that measures how likely an event is to occur, expressed as a number between 0 (impossible) and 1 (certain). Daniel Kahneman, winner of the Nobel Prize in Economics in 2002, showed that humans are naturally poor at estimating probabilities. We fear rare but dramatic events (plane crashes) more than common but mundane dangers (car accidents), even though the latter are statistically far more dangerous. \"Expected value\" in decision theory calculates the average outcome of a decision by multiplying each possible outcome by its probability. Understanding probability can prevent cognitive biases from distorting our judgments in medicine, finance, and everyday choices.",
          perguntas: [
            {
              p: "O que é probabilidade?",
              ops: [
                "Contagem de eventos",
                "Medida de possibilidade de um evento",
                "Soma de resultados",
                "Média aritmética"
              ],
              c: 1
            },
            {
              p: "Qual prêmio Daniel Kahneman ganhou?",
              ops: ["Nobel de Física", "Nobel de Matemática", "Nobel de Economia", "Nobel de Medicina"],
              c: 2
            },
            {
              p: "O que é \"expected value\"?",
              ops: [
                "Resultado esperado por intuição",
                "Resultado médio ponderado por probabilidade",
                "Melhor resultado possível",
                "Resultado mais frequente"
              ],
              c: 1
            },
            {
              p: "Segundo o texto, qual é mais perigoso estatisticamente?",
              ops: ["Acidentes de avião", "Acidentes de trem", "Acidentes de carro", "Ambos são iguais"],
              c: 2
            },
            {
              p: "\"Cognitive biases\" significa:",
              ops: [
                "Cálculos cognitivos",
                "Preconceitos/vieses cognitivos",
                "Aprendizados cognitivos",
                "Memórias cognitivas"
              ],
              c: 1
            }
          ]
        }
      ]
    }
  },
  {
    id: "inv_ingles_filosofia",
    tipo: "ingles",
    titulo: "Inglês — Filosofia e Ética",
    descricao: "Leia textos filosóficos sobre ética, existência e conhecimento!",
    emoji: "🤔",
    habilidade: "Inglês",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 16,
    historinha: "As grandes questões da humanidade em inglês! Explore filosofia, ética e existência!",
    dados: {
      textos: [
        {
          titulo: "The Trolley Problem and Ethics",
          emoji: "🚃",
          texto: "The Trolley Problem, introduced by philosopher Philippa Foot in 1967, poses a moral dilemma: a runaway trolley is heading toward five people on the tracks. You can pull a lever to divert it to another track, where only one person stands. Do you act? Most people say yes — sacrificing one to save five seems logical (utilitarian ethics). But a variation by Judith Jarvis Thomson asks: would you push a large man off a bridge to stop the trolley and save five? Most say no — the emotional response changes even though the math is the same. This reveals a conflict between utilitarian ethics (greatest good for most) and deontological ethics (some actions are inherently wrong regardless of outcome).",
          perguntas: [
            {
              p: "Quem introduziu o Problema do Bonde?",
              ops: ["Kant", "Philippa Foot", "Judith Thomson", "Mill"],
              c: 1
            },
            {
              p: "O que é a ética utilitarista?",
              ops: [
                "Ações são certas se seguem regras",
                "O maior bem para o maior número",
                "Virtude é o critério moral",
                "Contrato social define moral"
              ],
              c: 1
            },
            {
              p: "Na variação de Thomson, por que as pessoas recusam empurrar o homem?",
              ops: [
                "Medo da lei",
                "Resposta emocional diferente apesar da mesma matemática",
                "Falta de coragem",
                "A matemática é diferente"
              ],
              c: 1
            },
            {
              p: "O que é ética deontológica?",
              ops: [
                "Consequências definem a moral",
                "Ações inerentemente certas/erradas independente do resultado",
                "Virtude define a moral",
                "Utilidade define a moral"
              ],
              c: 1
            },
            {
              p: "\"Dilemma\" no texto significa:",
              ops: ["Solução", "Dilema/situação sem saída perfeita", "Contradição", "Paradoxo matemático"],
              c: 1
            }
          ]
        },
        {
          titulo: "Consciousness and the Hard Problem",
          emoji: "🧠",
          texto: "The \"hard problem of consciousness,\" coined by philosopher David Chalmers in 1995, asks: why do physical processes in the brain give rise to subjective experience? We can explain how the brain processes visual information, but why does seeing red feel like something? This subjective quality of experience — what philosophers call \"qualia\" — is the hard problem. Materialists believe consciousness is entirely a product of brain processes, while dualists argue there is something non-physical about consciousness. AI systems like large language models can process language and generate responses, but whether they have genuine conscious experience remains deeply controversial. Roger Penrose controversially proposed that consciousness might involve quantum processes in neural microtubules.",
          perguntas: [
            {
              p: "Quem cunhou o \"problema difícil da consciência\"?",
              ops: ["Descartes", "Penrose", "Chalmers", "Turing"],
              c: 2
            },
            {
              p: "O que são \"qualia\"?",
              ops: [
                "Partes do cérebro",
                "Qualidades subjetivas da experiência",
                "Neurônios conscientes",
                "Ondas cerebrais"
              ],
              c: 1
            },
            {
              p: "O que os materialistas acreditam?",
              ops: [
                "Consciência é não-física",
                "Consciência requer quantum",
                "Consciência é produto do cérebro",
                "Consciência é divina"
              ],
              c: 2
            },
            {
              p: "O que Penrose propôs sobre a consciência?",
              ops: [
                "É apenas software",
                "Envolve processos quânticos nos microtúbulos",
                "É uma ilusão",
                "Requer IA para ser entendida"
              ],
              c: 1
            },
            {
              p: "\"Subjective experience\" significa:",
              ops: [
                "Experiência objetiva e mensurável",
                "Experiência subjetiva interna/pessoal",
                "Experiência compartilhada",
                "Experiência científica"
              ],
              c: 1
            }
          ]
        }
      ]
    }
  }
]

// ── Números ──
export const numerosExtraPorFaixa = [
  {
    id: "inv_numeros_potencias",
    tipo: "numeros",
    titulo: "Potências de 2",
    descricao: "Explore as potências de 2 — a base da computação!",
    emoji: "💻",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Todo computador pensa em potências de 2! 💻 Bits, bytes, memória RAM — tudo é baseado nesses números. Descubra por que 2 é o número mais importante da era digital!",
    dados: {
      numeros: [
        {
          n: 1,
          display: "2¹",
          word: "Dois",
          emoji: "🔌",
          cor: "#4F8EE8",
          funfato: "2¹ = 2. Um bit tem 2 estados: 0 ou 1. É a base de tudo no computador!"
        },
        {
          n: 2,
          display: "2²",
          word: "Quatro",
          emoji: "🖥️",
          cor: "#7F77DD",
          funfato: "2² = 4. Quatro estados possíveis com 2 bits: 00, 01, 10, 11."
        },
        {
          n: 3,
          display: "2³",
          word: "Oito",
          emoji: "💾",
          cor: "#1D9E75",
          funfato: "2³ = 8. Um byte tem 8 bits — a menor unidade de armazenamento!"
        },
        {
          n: 4,
          display: "2⁴",
          word: "Dezesseis",
          emoji: "🎨",
          cor: "#EF9F27",
          funfato: "2⁴ = 16. O sistema hexadecimal (cores HTML) usa 16 dígitos (0-9 + A-F)."
        },
        {
          n: 5,
          display: "2⁵",
          word: "Trinta e Dois",
          emoji: "🎮",
          cor: "#D4537E",
          funfato: "2⁵ = 32. Console de 32 bits foi o padrão dos videogames nos anos 90!"
        },
        {
          n: 6,
          display: "2⁶",
          word: "Sessenta e Quatro",
          emoji: "🕹️",
          cor: "#D85A30",
          funfato: "2⁶ = 64. Nintendo 64 e computadores de 64 bits — o padrão atual!"
        },
        {
          n: 7,
          display: "2⁷",
          word: "Cento e Vinte e Oito",
          emoji: "💿",
          cor: "#4F8EE8",
          funfato: "2⁷ = 128. O áudio MP3 padrão usa 128 Kbps — 2⁷ kilobits por segundo!"
        },
        {
          n: 8,
          display: "2⁸",
          word: "Duzentos e Cinquenta e Seis",
          emoji: "🌈",
          cor: "#7F77DD",
          funfato: "2⁸ = 256. Cores RGB: cada canal (R, G, B) vai de 0 a 255 — 256 valores!"
        },
        {
          n: 9,
          display: "2⁹",
          word: "Quinhentos e Doze",
          emoji: "📀",
          cor: "#1D9E75",
          funfato: "2⁹ = 512. Storage de 512 GB é padrão em SSDs modernos!"
        },
        {
          n: 10,
          display: "2¹⁰",
          word: "Mil e Vinte e Quatro",
          emoji: "💻",
          cor: "#EF9F27",
          funfato: "2¹⁰ = 1024. Um kilobyte (KB) = 1024 bytes. Não 1000! Computadores pensam em 2."
        }
      ]
    }
  },
  {
    id: "inv_numeros_fibonacci",
    tipo: "numeros",
    titulo: "Sequência de Fibonacci",
    descricao: "O código secreto da natureza — a sequência de Fibonacci!",
    emoji: "🌻",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Há um padrão matemático escondido nas flores, conchas e galáxias! 🌻 Descoberto pelo matemático Fibonacci no séc. XIII, ele aparece em toda a natureza. Cada número é a soma dos dois anteriores!",
    dados: {
      numeros: [
        {
          n: 1,
          display: "1",
          word: "Um",
          emoji: "🌱",
          cor: "#1D9E75",
          funfato: "A sequência começa com 1, 1. Cada pétala de algumas flores vem em grupos de Fibonacci!"
        },
        {
          n: 1,
          display: "1",
          word: "Um",
          emoji: "🌿",
          cor: "#1D9E75",
          funfato: "1 + 1 = 2. O segundo 1 prepara o terreno para a sequência crescer!"
        },
        {
          n: 2,
          display: "2",
          word: "Dois",
          emoji: "🍃",
          cor: "#4F8EE8",
          funfato: "1 + 1 = 2. Algumas flores têm 2 pétalas no padrão Fibonacci!"
        },
        {
          n: 3,
          display: "3",
          word: "Três",
          emoji: "🌷",
          cor: "#D4537E",
          funfato: "1 + 2 = 3. Lírios e íris têm 3 pétalas — número Fibonacci!"
        },
        {
          n: 5,
          display: "5",
          word: "Cinco",
          emoji: "🌸",
          cor: "#EF9F27",
          funfato: "2 + 3 = 5. A maioria das flores silvestres tem 5 pétalas!"
        },
        {
          n: 8,
          display: "8",
          word: "Oito",
          emoji: "🌼",
          cor: "#D85A30",
          funfato: "3 + 5 = 8. Algumas margaridas têm 8 pétalas — olhe na natureza!"
        },
        {
          n: 13,
          display: "13",
          word: "Treze",
          emoji: "🌻",
          cor: "#1D9E75",
          funfato: "5 + 8 = 13. O girassol tem espirais em grupos de 13, 21 e 34!"
        },
        {
          n: 21,
          display: "21",
          word: "Vinte e Um",
          emoji: "🐚",
          cor: "#7F77DD",
          funfato: "8 + 13 = 21. A concha náutilo cresce em espiral de Fibonacci!"
        },
        {
          n: 34,
          display: "34",
          word: "Trinta e Quatro",
          emoji: "🍍",
          cor: "#4F8EE8",
          funfato: "13 + 21 = 34. O abacaxi tem 34 escamas em uma das espirais!"
        },
        {
          n: 55,
          display: "55",
          word: "Cinquenta e Cinco",
          emoji: "🌌",
          cor: "#D4537E",
          funfato: "21 + 34 = 55. Galáxias espirais seguem proporções Fibonacci. A natureza é matemática!"
        }
      ]
    }
  },
  {
    id: "inv_numeros_constantes",
    tipo: "numeros",
    titulo: "Constantes Matemáticas",
    descricao: "Os números que definem a estrutura do universo!",
    emoji: "∞",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Algumas constantes aparecem em toda a matemática e física — do átomo à galáxia! ∞ Cada uma tem um significado profundo. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 3,
          display: "π=3.14159",
          word: "Pi",
          emoji: "🥧",
          cor: "#7F77DD",
          funfato: "π foi calculado em trilhões de casas decimais — e nunca se repete!",
          detalhe: "Transcendente | C=2πr | A=πr² | 100 trilhões de dígitos calculados (2022)"
        },
        {
          n: 2,
          display: "e=2.71828",
          word: "Número de Euler",
          emoji: "📈",
          cor: "#4F8EE8",
          funfato: "e é a taxa de crescimento natural — aparece em juros, radioatividade e biologia!",
          detalhe: "lim(1+1/n)ⁿ | Base do logaritmo natural | Crescimento/decaimento exponencial"
        },
        {
          n: 1,
          display: "φ=1.61803",
          word: "Razão Áurea",
          emoji: "🌻",
          cor: "#F9A825",
          funfato: "φ (phi) = 1,618... — o número da beleza, proporção e harmonia!",
          detalhe: "(1+√5)/2 | a/b = (a+b)/a | Fibonacci converge para φ | Parthenon, Mona Lisa"
        },
        {
          n: 1,
          display: "√2=1.41421",
          word: "Raiz de Dois",
          emoji: "📐",
          cor: "#D4537E",
          funfato: "√2 = 1,41421... — a diagonal de um quadrado de lado 1!",
          detalhe: "Irracional | Descoberta pelos pitagóricos ~500 a.C. | A4/A3 = √2"
        },
        {
          n: 0,
          display: "γ=0.57721",
          word: "Euler-Mascheroni",
          emoji: "🔢",
          cor: "#1D9E75",
          funfato: "A constante γ = 0,5772... ainda é desconhecida — é racional ou irracional?",
          detalhe: "γ = lim(Hₙ - ln n) | Ainda sem prova de irracionalidade | Número misterioso"
        },
        {
          n: 1,
          display: "ln2=0.693",
          word: "Logaritmo de 2",
          emoji: "💻",
          cor: "#D85A30",
          funfato: "ln(2) = 0,693 — aparece no tempo de meia-vida radioativa!",
          detalhe: "loge(2) = 0.6931 | Meia-vida: t½ = ln(2)/λ | Computação: log₂ base"
        },
        {
          n: 4,
          display: "δ=4.6692",
          word: "Feigenbaum",
          emoji: "🌀",
          cor: "#EF9F27",
          funfato: "δ = 4,6692... aparece no caos — sistemas caóticos convergem sempre para δ!",
          detalhe: "Constante de Feigenbaum | Cascata de bifurcação | Universo do caos"
        },
        {
          n: 1,
          display: "ζ(3)=1.202",
          word: "Constante de Apéry",
          emoji: "∑",
          cor: "#283593",
          funfato: "ζ(3) = 1+1/8+1/27+... é irracional — prova de 1979 famosa!",
          detalhe: "Apéry (1979) | Série ζ(3) = ∑1/n³ | Física de partículas"
        }
      ]
    }
  },
  {
    id: "inv_numeros_bases",
    tipo: "numeros",
    titulo: "Sistemas de Numeração",
    descricao: "Diferentes bases numéricas usadas pela humanidade!",
    emoji: "🔢",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Contar com 10 dígitos não é a única forma! 🔢 Computadores usam binário (2), babilônios usavam sexagesimal (60). Cada base tem vantagens. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 2,
          display: "Base 2",
          word: "Binário",
          emoji: "💻",
          cor: "#212121",
          funfato: "Base 2 é a linguagem dos computadores — apenas 0 e 1!",
          detalhe: "2 dígitos: 0,1 | Transistor: liga/desliga | 1011₂ = 11₁₀"
        },
        {
          n: 8,
          display: "Base 8",
          word: "Octal",
          emoji: "🔢",
          cor: "#D85A30",
          funfato: "Octal (base 8) era usado nos primeiros computadores — dígitos 0 a 7!",
          detalhe: "8 dígitos: 0-7 | Permissões Unix: chmod 755 = rwxr-xr-x | 3 bits/dígito"
        },
        {
          n: 10,
          display: "Base 10",
          word: "Decimal",
          emoji: "✋",
          cor: "#1D9E75",
          funfato: "Contamos em base 10 porque temos 10 dedos — simples assim!",
          detalhe: "10 dígitos: 0-9 | Sistema Hindu-Arábico | Universal hoje"
        },
        {
          n: 12,
          display: "Base 12",
          word: "Duodecimal",
          emoji: "🕛",
          cor: "#4F8EE8",
          funfato: "Base 12 foi popular pela divisibilidade: 12 = 2×2×3, divide por 2, 3, 4, 6!",
          detalhe: "12 dígitos | Dúzia | Horas, polegadas, meses | Mais divisível que 10"
        },
        {
          n: 16,
          display: "Base 16",
          word: "Hexadecimal",
          emoji: "🎨",
          cor: "#6A1B9A",
          funfato: "Hex (base 16) usa letras A-F como dígitos — cores HTML são hex!",
          detalhe: "16 dígitos: 0-9, A-F | Cores: #FF5733 | 1 byte = 2 dígitos hex"
        },
        {
          n: 20,
          display: "Base 20",
          word: "Vigesimal",
          emoji: "🌎",
          cor: "#C62828",
          funfato: "Maias contavam em base 20 — usavam dedos das mãos E dos pés!",
          detalhe: "20 dígitos | Maias e Astecas | \"Score\" (20) em inglês"
        },
        {
          n: 60,
          display: "Base 60",
          word: "Sexagesimal",
          emoji: "⏱️",
          cor: "#283593",
          funfato: "Babilônios usavam base 60 — herdamos dela as horas, minutos e graus!",
          detalhe: "60 dígitos | Sumérios ~3.000 a.C. | 60min, 60seg, 360° ainda hoje"
        },
        {
          n: 1,
          display: "Base 1",
          word: "Unário",
          emoji: "🖊️",
          cor: "#5D4037",
          funfato: "Base 1 são as \"risquinhas de contagem\" — I, II, III, IIII, IIIII...",
          detalhe: "Palitos (tally marks) | Sistema mais primitivo | O(n) por valor"
        }
      ]
    }
  },
  {
    id: "inv_numeros_grandes",
    tipo: "numeros",
    titulo: "Números Muito Grandes",
    descricao: "De milhões a googolplex — o tamanho dos números!",
    emoji: "🌌",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Os números não têm limite! 🌌 Googol, googolplex, infinito — explore números que desafiam a imaginação. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 1,
          display: "10³",
          word: "Mil",
          emoji: "💰",
          cor: "#1D9E75",
          funfato: "10³ = 1.000 — um milhar. 1.000 é o número de gramas em 1 kg!",
          detalhe: "Kilo (k) | Prefixo SI | 1.000 metros = 1 km"
        },
        {
          n: 6,
          display: "10⁶",
          word: "Milhão",
          emoji: "🏆",
          cor: "#EF9F27",
          funfato: "10⁶ = 1.000.000 — um milhão! O Brasil tem ~214 milhões de habitantes!",
          detalhe: "Mega (M) | 1 megabyte = 10⁶ bytes | 1 milhão de segundos = 11,6 dias"
        },
        {
          n: 9,
          display: "10⁹",
          word: "Bilhão",
          emoji: "🌍",
          cor: "#4F8EE8",
          funfato: "10⁹ = 1 bilhão — a Terra tem ~8 bilhões de habitantes!",
          detalhe: "Giga (G) | 1 GB = 10⁹ bytes | 1 bilhão de segundos = 31,7 anos"
        },
        {
          n: 12,
          display: "10¹²",
          word: "Trilhão",
          emoji: "💸",
          cor: "#D4537E",
          funfato: "10¹² = 1 trilhão — o PIB do Brasil é de ~2 trilhões de dólares!",
          detalhe: "Tera (T) | 1 TB = 10¹² bytes | Galáxia Via Láctea: 10¹¹ estrelas"
        },
        {
          n: 23,
          display: "6×10²³",
          word: "Avogadro",
          emoji: "⚗️",
          cor: "#7F77DD",
          funfato: "6,022 × 10²³ átomos em 1 mol — o número de Avogadro!",
          detalhe: "Nₐ = 6.022×10²³ | 12g de carbono-12 tem exatamente Nₐ átomos"
        },
        {
          n: 80,
          display: "10⁸⁰",
          word: "Átomos do Universo",
          emoji: "🌌",
          cor: "#283593",
          funfato: "~10⁸⁰ átomos no universo observável — um número enorme mas finito!",
          detalhe: "Estimativa | Raio do universo: 46 bilhões anos-luz | ~10²³ estrelas"
        },
        {
          n: 100,
          display: "10¹⁰⁰",
          word: "Googol",
          emoji: "🔢",
          cor: "#D85A30",
          funfato: "Googol = 10¹⁰⁰ — maior que o número de átomos do universo!",
          detalhe: "Cunhado por Milton Sirotta (9 anos) em 1938 | Google é grafia errada de googol"
        },
        {
          n: 100,
          display: "10^googol",
          word: "Googolplex",
          emoji: "♾️",
          cor: "#6A1B9A",
          funfato: "Googolplex = 10^googol — não cabe escrito no universo inteiro!",
          detalhe: "10^(10¹⁰⁰) | Maior número com nome em matemática convencional"
        }
      ]
    }
  },
  {
    id: "inv_numeros_fisica",
    tipo: "numeros",
    titulo: "Constantes Físicas",
    descricao: "Os números que governam as leis do universo!",
    emoji: "⚛️",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "A física descreve o universo com números precisíssimos! ⚛️ Cada constante foi medida com experimentos incríveis. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 3,
          display: "c=3×10⁸m/s",
          word: "Velocidade da Luz",
          emoji: "💡",
          cor: "#EF9F27",
          funfato: "Nada no universo pode superar c=299.792.458 m/s — lei do universo!",
          detalhe: "Velocidade da luz no vácuo | Einstein: E=mc² | Invariante em todos os referenciais"
        },
        {
          n: 6,
          display: "G=6.67×10⁻¹¹",
          word: "Gravitação",
          emoji: "🌍",
          cor: "#1D9E75",
          funfato: "G é a mais fraca das constantes — gravidade é a força mais fraca!",
          detalhe: "G = 6.674×10⁻¹¹ N·m²/kg² | Newton (1687) | F=Gm₁m₂/r²"
        },
        {
          n: 6,
          display: "h=6.63×10⁻³⁴",
          word: "Planck",
          emoji: "⚛️",
          cor: "#D4537E",
          funfato: "h define a menor \"dose\" de energia possível — o quantum!",
          detalhe: "6.626×10⁻³⁴ J·s | Mecânica quântica | E=hf | Planck (1900)"
        },
        {
          n: 1,
          display: "e=1.6×10⁻¹⁹",
          word: "Carga do Elétron",
          emoji: "⚡",
          cor: "#7F77DD",
          funfato: "Toda carga elétrica é múltiplo da carga do elétron — quantizada!",
          detalhe: "1.602×10⁻¹⁹ coulombs | Millikan (1909) | Carga elementar"
        },
        {
          n: 1,
          display: "k=1.38×10⁻²³",
          word: "Boltzmann",
          emoji: "🌡️",
          cor: "#4F8EE8",
          funfato: "k conecta temperatura com energia cinética das moléculas!",
          detalhe: "1.381×10⁻²³ J/K | E=kT/2 por grau de liberdade | Termodinâmica"
        },
        {
          n: 6,
          display: "Nₐ=6×10²³",
          word: "Avogadro",
          emoji: "🔬",
          cor: "#D85A30",
          funfato: "6,022 × 10²³ partículas em 1 mol — o número de Avogadro!",
          detalhe: "6.022×10²³ mol⁻¹ | 1 mol H₂O = 18g | 1 mol qualquer = Nₐ partículas"
        },
        {
          n: 8,
          display: "R=8.31J/mol",
          word: "Gás Universal",
          emoji: "💨",
          cor: "#EF9F27",
          funfato: "R = 8,314 J/(mol·K) — aparece na equação de gás perfeito PV=nRT!",
          detalhe: "8.314 J mol⁻¹ K⁻¹ | R = k × Nₐ | Gás perfeito: PV=nRT"
        },
        {
          n: 1,
          display: "α≈1/137",
          word: "Estrutura Fina",
          emoji: "🔮",
          cor: "#283593",
          funfato: "α ≈ 1/137 — a constante de estrutura fina que ninguém entende por quê!",
          detalhe: "1/137.036 | Adimensional | Feynman: \"todos os físicos mágicos sabem 137\""
        }
      ]
    }
  },
  {
    id: "inv_numeros_astronomia",
    tipo: "numeros",
    titulo: "Números da Astronomia",
    descricao: "As escalas numéricas do universo — imensas e fascinantes!",
    emoji: "🔭",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "A astronomia trabalha com os maiores números que existem! 🔭 De distâncias a massas de estrelas, explore a escala do cosmos. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 8,
          display: "8",
          word: "Oito Planetas",
          emoji: "🪐",
          cor: "#4F8EE8",
          funfato: "O Sistema Solar tem 8 planetas — Plutão foi reclassificado em 2006!",
          detalhe: "Mercúrio a Netuno | IAU 2006: Plutão = planeta anão | Voyager 2 passou por Netuno"
        },
        {
          n: 1,
          display: "1 UA",
          word: "Unidade Astronômica",
          emoji: "☀️",
          cor: "#EF9F27",
          funfato: "1 UA = 149.597.871 km — a distância Terra-Sol!",
          detalhe: "1 AU = 1.496×10¹¹m | Luz leva 8 min 20 seg | Medida do Sistema Solar"
        },
        {
          n: 1,
          display: "1 al",
          word: "Ano-Luz",
          emoji: "🌟",
          cor: "#D4537E",
          funfato: "1 ano-luz = 9,461 trilhões de km — a distância que a luz percorre em 1 ano!",
          detalhe: "9.461×10¹² km | Proxima Centauri: 4,24 al | Andrômeda: 2.537.000 al"
        },
        {
          n: 4,
          display: "4.24 al",
          word: "Proxima Centauri",
          emoji: "⭐",
          cor: "#7F77DD",
          funfato: "Proxima Centauri é a estrela mais próxima — mas ainda fica 4,24 anos-luz!",
          detalhe: "Alpha Centauri C | 40 trilhões km | Viagem: ~76.000 anos a 60.000 km/h"
        },
        {
          n: 13,
          display: "13.8Ga",
          word: "Idade do Universo",
          emoji: "🌌",
          cor: "#283593",
          funfato: "O universo tem 13,8 bilhões de anos — desde o Big Bang!",
          detalhe: "13,787 ± 0,020 Ga | Medido pelo CMB (fundo cósmico) | Planck 2018"
        },
        {
          n: 8,
          display: "10¹¹",
          word: "Estrelas na Galáxia",
          emoji: "💫",
          cor: "#D85A30",
          funfato: "A Via Láctea tem ~200 bilhões de estrelas — 200.000.000.000!",
          detalhe: "10¹¹-10¹² estrelas | Disco: 100.000 al diâmetro | Buracos negros: um central"
        },
        {
          n: 2,
          display: "2×10³⁰kg",
          word: "Massa do Sol",
          emoji: "☀️",
          cor: "#F9A825",
          funfato: "O Sol tem 1,989 × 10³⁰ kg — 330.000 vezes a massa da Terra!",
          detalhe: "M☉ = 2×10³⁰ kg | 99.86% da massa do Sistema Solar | Fusão: 620Mt H/s"
        },
        {
          n: 0,
          display: "10⁻⁴³s",
          word: "Tempo de Planck",
          emoji: "⚛️",
          cor: "#1D9E75",
          funfato: "10⁻⁴³s é o menor tempo mensurável — o instante após o Big Bang!",
          detalhe: "tₚ = √(ℏG/c⁵) | Fronteira da física conhecida | Antes = desconhecido"
        }
      ]
    }
  },
  {
    id: "inv_numeros_probabilidade",
    tipo: "numeros",
    titulo: "Probabilidade e Aleatoriedade",
    descricao: "Os números que descrevem o acaso!",
    emoji: "🎲",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "A matemática pode calcular a chance de qualquer evento! 🎲 De lançar um dado a ganhar na loteria, os números do acaso têm regras precisas. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 0,
          display: "0",
          word: "Zero",
          emoji: "❌",
          cor: "#C62828",
          funfato: "P=0: evento impossível. Cara e coroa ao mesmo tempo = P(0)!",
          detalhe: "P(impossível)=0 | Axioma de Kolmogorov | Complemento: P(nada)=0"
        },
        {
          n: 1,
          display: "1",
          word: "Um",
          emoji: "✅",
          cor: "#2E7D32",
          funfato: "P=1: evento certo. A probabilidade de morrer um dia = 1 (100%)!",
          detalhe: "P(certo)=1 | Soma de todos eventos = 1 | Complemento: P(A)=1-P(Ā)"
        },
        {
          n: 1,
          display: "½",
          word: "Um Meio",
          emoji: "🪙",
          cor: "#EF9F27",
          funfato: "P=½: cara ou coroa tem 50% de chance — se a moeda for justa!",
          detalhe: "P(cara)=1/2 | Experimento clássico de Bernoulli | 50/50"
        },
        {
          n: 1,
          display: "⅙",
          word: "Um Sexto",
          emoji: "🎲",
          cor: "#D4537E",
          funfato: "P=1/6 = 16,7%: chance de sair qualquer face de um dado justo!",
          detalhe: "Dado: 6 faces equiprováveis | Soma 7 é a mais provável no jogo de dados"
        },
        {
          n: 1,
          display: "1/52",
          word: "Um em 52",
          emoji: "🃏",
          cor: "#7F77DD",
          funfato: "P=1/52 ≈ 1,9%: chance de tirar o ás de espadas de um baralho!",
          detalhe: "52 cartas | P(ás)=4/52=1/13 | P(espada)=13/52=1/4 | P(ás de ♠)=1/52"
        },
        {
          n: 1,
          display: "1/365",
          word: "Um em 365",
          emoji: "🎂",
          cor: "#4F8EE8",
          funfato: "P=1/365: chance de dois estranhos fazerem aniversário no mesmo dia!",
          detalhe: "Problema do aniversário: com 23 pessoas, P>50%! Surpreendente!"
        },
        {
          n: 1,
          display: "1/50M",
          word: "Um em 50 Milhões",
          emoji: "🎰",
          cor: "#D85A30",
          funfato: "P=1/50.063.860 ≈ 2×10⁻⁸: chance de acertar as 6 dezenas da Mega-Sena!",
          detalhe: "C(60,6) = 50.063.860 combinações | Esperança negativa | \"Imposto dos ingênuos\""
        },
        {
          n: 1,
          display: "0.999...=1",
          word: "Noventa e Nove Por Cento",
          emoji: "♾️",
          cor: "#283593",
          funfato: "0,999... = 1 exatamente — não \"quase 1\", mas matematicamente igual a 1!",
          detalhe: "⅓×3=1 | 0,333×3=0,999 | Limite da série geométrica: ∑9/10ⁿ = 1"
        }
      ]
    }
  },
  {
    id: "inv_numeros_logaritmos",
    tipo: "numeros",
    titulo: "Logaritmos e Escalas",
    descricao: "A matemática que comprime escalas enormes!",
    emoji: "📊",
    habilidade: "Matemática",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Logaritmos transformam multiplicações em adições — Napier os inventou para facilitar navegação! 📊 Hoje estão em todo lugar: decibéis, pH, escala Richter. Clique em 🔊!",
    dados: {
      numeros: [
        {
          n: 0,
          display: "log(1)=0",
          word: "Zero",
          emoji: "📊",
          cor: "#9E9E9E",
          funfato: "log(1) = 0 sempre: qualquer base elevada a 0 dá 1, então log(1)=0!",
          detalhe: "log_b(1) = 0 | b⁰ = 1 | Identidade fundamental"
        },
        {
          n: 1,
          display: "log(10)=1",
          word: "Um",
          emoji: "1️⃣",
          cor: "#EF9F27",
          funfato: "log₁₀(10)=1. Definição: logaritmo é o expoente necessário!",
          detalhe: "10¹=10 | log₁₀(10)=1 | Regra: log_b(b)=1 para qualquer base b"
        },
        {
          n: 2,
          display: "log(100)=2",
          word: "Dois",
          emoji: "2️⃣",
          cor: "#D4537E",
          funfato: "log(100)=2 porque 10²=100. Logaritmo \"desfaz\" a potência!",
          detalhe: "10²=100 | Ordem de grandeza | 2 dígitos = grandeza 10²"
        },
        {
          n: 3,
          display: "log(1k)=3",
          word: "Três",
          emoji: "3️⃣",
          cor: "#7F77DD",
          funfato: "log(1000)=3. Cada grau de magnitude na escala Richter = 10× mais forte!",
          detalhe: "Escala Richter: log | Richter 6 = 10× mais forte que Richter 5"
        },
        {
          n: 1,
          display: "ln(e)=1",
          word: "Logaritmo Natural",
          emoji: "📈",
          cor: "#4F8EE8",
          funfato: "ln(e)=1. O logaritmo natural usa e≈2,718 como base — fundamental em cálculo!",
          detalhe: "ln = log_e | e = 2.71828 | Derivada de ln(x) = 1/x"
        },
        {
          n: 10,
          display: "log₂(1024)=10",
          word: "Dez Binário",
          emoji: "💻",
          cor: "#1D9E75",
          funfato: "log₂(1024)=10. Computadores usam log₂ — 1 KB = 2¹⁰ = 1024 bytes!",
          detalhe: "2¹⁰=1024 | Complexidade O(log n) em algoritmos | Busca binária"
        },
        {
          n: 7,
          display: "pH=-log[H⁺]",
          word: "pH Sete Neutro",
          emoji: "⚗️",
          cor: "#D85A30",
          funfato: "pH = -log[H⁺]. pH 7 = neutro, pH<7 = ácido, pH>7 = básico!",
          detalhe: "Potencial Hidrogeniônico | pH=7: água pura | Sorensen (1909)"
        },
        {
          n: 0,
          display: "dB=20log(p)",
          word: "Decibel",
          emoji: "🔊",
          cor: "#283593",
          funfato: "Decibel usa logaritmo: 0 dB = limiar da audição, 120 dB = dor!",
          detalhe: "dB = 20×log₁₀(p/p₀) | Escala logarítmica | +6dB = 2× amplitude"
        }
      ]
    }
  }
]

// ── Sílabas ──
export const silabasExtraPorFaixa = []

// ──────────────────────────────────────────────────────────────────────
// QUIZ — EXPANSÃO (08/08/2026)
// Fecha a faixa em 15 quizzes. Temas novos, sem repetir os 8 que já existiam
// (programação, física, filosofia ×2, epistemologia, civilizações, tecnologia,
// lógica).
// ──────────────────────────────────────────────────────────────────────
export const quizExtraPorFaixa = [
  {
    id: "inv_quiz_genetica",
    tipo: "quiz",
    titulo: "Genética e DNA",
    descricao: "O manual de instruções que existe dentro de cada célula sua.",
    emoji: "🧬",
    habilidade: "Pensamento Científico",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Dentro de praticamente cada célula do seu corpo existe o mesmo texto de 3 bilhões de letras. 🧬 Ele explica por que você se parece com sua família — e por que não é idêntico a ninguém.",
    perguntas: [
      {
        pergunta: "O que é o DNA?",
        opcoes: ["A molécula que carrega a informação genética", "Um tipo de proteína", "Uma célula do sangue", "Um órgão microscópico"],
        correta: 0,
        fato: "🧬 O DNA tem forma de dupla hélice, descrita em 1953 com base decisiva nos dados de difração de raios X de Rosalind Franklin."
      },
      {
        pergunta: "Quantos pares de cromossomos tem uma célula humana típica?",
        opcoes: ["23 pares", "46 pares", "12 pares", "10 pares"],
        correta: 0,
        fato: "🔢 São 23 pares, 46 no total: metade veio da mãe e metade do pai. Por isso você tem duas versões de quase todo gene."
      },
      {
        pergunta: "O que é um gene?",
        opcoes: ["Um trecho de DNA com instrução para uma característica", "Uma célula inteira", "Um cromossomo", "Um tipo de vírus"],
        correta: 0,
        fato: "📖 Se o DNA é o livro, o gene é um capítulo. Muitos genes contêm a receita de uma proteína, e é a proteína que faz o trabalho na célula."
      },
      {
        pergunta: "Por que gêmeos idênticos não são exatamente iguais?",
        opcoes: ["Ambiente e experiências também influenciam", "O DNA deles é diferente desde o início", "Um deles perde genes", "Eles têm cromossomos a mais"],
        correta: 0,
        fato: "👯 Mesmo com DNA praticamente igual, alimentação, doenças e experiências mudam quais genes ficam ativos. É o campo da epigenética."
      },
      {
        pergunta: "O que é uma mutação genética?",
        opcoes: ["Uma alteração na sequência do DNA", "Uma doença sempre grave", "Um poder especial", "A perda de um cromossomo apenas"],
        correta: 0,
        fato: "🔄 Mutação não é sinônimo de doença: a maioria é neutra, algumas são prejudiciais e algumas são vantajosas. É essa variação que a evolução usa como matéria-prima."
      }
    ]
  },
  {
    id: "inv_quiz_ia",
    tipo: "quiz",
    titulo: "Inteligência Artificial",
    descricao: "Como as máquinas aprendem — e onde elas erram.",
    emoji: "🤖",
    habilidade: "Pensamento Computacional",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Você usa IA todo dia, às vezes sem perceber. 🤖 Entender como ela funciona é a diferença entre usar a ferramenta e ser usado por ela. Vamos abrir a caixa?",
    perguntas: [
      {
        pergunta: "Como um modelo de aprendizado de máquina 'aprende'?",
        opcoes: ["Ajustando parâmetros a partir de muitos exemplos", "Sendo programado regra por regra", "Copiando a internet inteira literalmente", "Perguntando a especialistas"],
        correta: 0,
        fato: "📈 Em vez de alguém escrever a regra, o modelo ajusta milhões de números até acertar os exemplos de treino. Ninguém consegue apontar onde uma ideia específica ficou guardada."
      },
      {
        pergunta: "O que é viés (bias) em um sistema de IA?",
        opcoes: ["Uma distorção herdada dos dados de treino", "Um erro de digitação", "Uma falha de hardware", "Um vírus"],
        correta: 0,
        fato: "⚖️ Se os dados de treino refletem uma desigualdade do mundo, o modelo reproduz e às vezes amplifica essa desigualdade — sem que ninguém tenha programado isso."
      },
      {
        pergunta: "Por que uma IA de linguagem pode afirmar algo falso com confiança?",
        opcoes: ["Ela prevê texto plausível, não consulta a verdade", "Ela mente de propósito", "Ela sempre erra números", "Ela está sem internet"],
        correta: 0,
        fato: "🎭 Esses modelos otimizam plausibilidade, não veracidade. Uma resposta errada pode soar tão bem escrita quanto uma certa — por isso conferir a fonte continua sendo com você."
      },
      {
        pergunta: "O que é dado de treino?",
        opcoes: ["O material a partir do qual o modelo aprende", "O resultado que ele produz", "A velocidade do computador", "O código-fonte"],
        correta: 0,
        fato: "🗂️ A qualidade do dado limita o teto do modelo. É a origem do ditado da computação: 'entra lixo, sai lixo'."
      },
      {
        pergunta: "Qual destas é uma preocupação ética real com IA?",
        opcoes: ["Uso de imagem e voz de pessoas sem autorização", "As máquinas ficarem tristes", "O computador esquentar", "A internet ficar lenta"],
        correta: 0,
        fato: "🛡️ Deepfake de voz e rosto já é usado em golpes. Combinar ceticismo com verificação por outro canal é a defesa mais prática que existe hoje."
      }
    ]
  },
  {
    id: "inv_quiz_seguranca",
    tipo: "quiz",
    titulo: "Segurança Digital",
    descricao: "Como golpes funcionam — e como não cair neles.",
    emoji: "🔐",
    habilidade: "Cidadania Digital",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "A maior parte dos ataques não quebra a tecnologia: convence uma pessoa. 🔐 Quem conhece o truque para de cair nele. Vamos estudar os golpes por dentro?",
    perguntas: [
      {
        pergunta: "O que é phishing?",
        opcoes: ["Enganar alguém para entregar dados ou senha", "Um vírus que apaga arquivos", "Uma falha do roteador", "Um tipo de criptografia"],
        correta: 0,
        fato: "🎣 O nome vem de 'fishing', pescar: manda-se isca para muita gente esperando que alguém morda. A mensagem imita um banco, uma loja ou um chefe."
      },
      {
        pergunta: "Qual é o sinal mais comum de uma mensagem de golpe?",
        opcoes: ["Urgência e ameaça de perder algo agora", "Erro de português apenas", "Ser enviada de manhã", "Ter imagens coloridas"],
        correta: 0,
        fato: "⏰ A pressa é a ferramenta principal: quem está com medo de perder a conta não para para conferir. Desconfiar de urgência é a defesa mais barata."
      },
      {
        pergunta: "Por que não se deve repetir a mesma senha em vários sites?",
        opcoes: ["Um vazamento derruba todas as contas de uma vez", "A senha fica mais lenta", "Os sites cobram por isso", "Ela expira mais rápido"],
        correta: 0,
        fato: "🔑 Atacantes testam automaticamente e-mail e senha vazados de um site em dezenas de outros. Chama-se credential stuffing e funciona justamente pela repetição."
      },
      {
        pergunta: "O que a verificação em duas etapas acrescenta?",
        opcoes: ["Um segundo fator além da senha", "Uma senha mais longa", "Um antivírus", "Uma conta reserva"],
        correta: 0,
        fato: "📱 Mesmo que a senha vaze, falta o segundo fator. Aplicativo autenticador é mais seguro que SMS, porque o número de telefone pode ser clonado."
      },
      {
        pergunta: "Um site com cadeado e HTTPS é necessariamente confiável?",
        opcoes: ["Não — só garante que a conexão é criptografada", "Sim, é sempre seguro", "Sim, foi verificado pelo governo", "Não, o cadeado indica golpe"],
        correta: 0,
        fato: "🔒 O cadeado diz que ninguém no meio do caminho lê o que você envia. Ele não diz nada sobre quem está do outro lado — site de golpe também tem cadeado."
      }
    ]
  },
  {
    id: "inv_quiz_economia",
    tipo: "quiz",
    titulo: "Economia e Finanças",
    descricao: "Juros, inflação e por que o dinheiro muda de valor.",
    emoji: "📈",
    habilidade: "Educação Financeira",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Cem reais hoje e cem reais daqui a dez anos não são a mesma coisa. 📈 Entender por quê é o que separa quem decide de quem só reage. Vamos aos conceitos?",
    perguntas: [
      {
        pergunta: "O que é inflação?",
        opcoes: ["A alta geral e contínua dos preços", "O aumento do seu salário", "A queda dos juros", "A falta de dinheiro no banco"],
        correta: 0,
        fato: "📉 Com inflação, a mesma nota compra menos. É por isso que comparar preços de épocas diferentes sem corrigir pela inflação leva a conclusões erradas."
      },
      {
        pergunta: "Qual é a diferença entre juros simples e compostos?",
        opcoes: ["No composto, o juro também rende juro", "No simples o valor é maior", "São a mesma coisa", "O composto só existe em dívidas"],
        correta: 0,
        fato: "🌱 No composto o montante cresce sobre o montante já acrescido. Isso trabalha a seu favor quando você investe — e contra você quando você deve."
      },
      {
        pergunta: "O que significa diversificar investimentos?",
        opcoes: ["Não concentrar tudo em um único lugar", "Investir sempre no mais rentável", "Guardar em casa", "Comprar e vender todo dia"],
        correta: 0,
        fato: "🧺 A ideia é simples: se tudo estiver em um só lugar, um único problema leva tudo junto. Diversificar reduz o estrago de um erro isolado."
      },
      {
        pergunta: "O que é o PIB de um país?",
        opcoes: ["O valor de tudo que ele produz num período", "O dinheiro guardado no banco central", "A dívida do país", "A soma dos salários apenas"],
        correta: 0,
        fato: "🏭 PIB mede produção, não bem-estar. Um país pode ter PIB alto e desigualdade grande — por isso ele nunca é lido sozinho."
      },
      {
        pergunta: "Se uma promessa de investimento garante lucro alto e sem risco, o que isso indica?",
        opcoes: ["Forte sinal de golpe", "Uma boa oportunidade rara", "Um investimento do governo", "Que é isento de imposto"],
        correta: 0,
        fato: "🚩 Retorno alto sempre vem acompanhado de risco. 'Garantido e altíssimo' é a assinatura clássica de pirâmide financeira."
      }
    ]
  },
  {
    id: "inv_quiz_quimica",
    tipo: "quiz",
    titulo: "Química do Cotidiano",
    descricao: "As reações que acontecem na sua cozinha e no seu corpo.",
    emoji: "⚗️",
    habilidade: "Pensamento Científico",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Cozinhar é química aplicada, e enferrujar também. ⚗️ Você convive com reações o tempo todo. Vamos nomear o que já está acontecendo à sua volta?",
    perguntas: [
      {
        pergunta: "O que é um átomo?",
        opcoes: ["A menor unidade que mantém as propriedades de um elemento", "A menor partícula que existe", "Uma molécula pequena", "Um tipo de célula"],
        correta: 0,
        fato: "⚛️ O átomo não é indivisível como o nome sugere: tem prótons, nêutrons e elétrons. Mas dividi-lo muda o elemento — deixa de ser aquele material."
      },
      {
        pergunta: "O que a fórmula H₂O indica?",
        opcoes: ["Dois hidrogênios ligados a um oxigênio", "Dois oxigênios e um hidrogênio", "Água com gás", "Hidrogênio puro"],
        correta: 0,
        fato: "💧 A molécula de água é angular, não reta, e isso a torna polar. Essa polaridade é a razão de a água dissolver tanta coisa."
      },
      {
        pergunta: "Por que o ferro enferruja?",
        opcoes: ["Ele reage com oxigênio e umidade", "Ele esquenta demais", "Ele perde peso", "Ele absorve luz"],
        correta: 0,
        fato: "🔩 Ferrugem é óxido de ferro. Como ela se solta em vez de formar camada protetora, o ferro continua sendo corroído por baixo — o alumínio faz o contrário."
      },
      {
        pergunta: "O que acontece ao misturar bicarbonato de sódio com vinagre?",
        opcoes: ["Reagem liberando gás carbônico e esfriam um pouco", "Explodem com calor forte", "Nada acontece", "Formam um sólido duro"],
        correta: 0,
        fato: "🧪 A espuma é gás carbônico. E, ao contrário do que a efervescência sugere, a reação é endotérmica: ela ABSORVE calor e a mistura esfria."
      },
      {
        pergunta: "O que a escala de pH mede?",
        opcoes: ["Quão ácida ou básica é uma solução", "A temperatura", "A densidade", "A quantidade de sal"],
        correta: 0,
        fato: "🌡️ A escala vai de 0 a 14 e é logarítmica: pH 4 é dez vezes mais ácido que pH 5, não um pouquinho. O sangue humano fica perto de 7,4."
      }
    ]
  },
  {
    id: "inv_quiz_estatistica",
    tipo: "quiz",
    titulo: "Estatística e Probabilidade",
    descricao: "Como números enganam quem não sabe lê-los.",
    emoji: "🎲",
    habilidade: "Raciocínio Quantitativo",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Todo dia alguém te mostra um número para te convencer de alguma coisa. 🎲 Saber estatística é saber perguntar 'de onde veio esse número?'. Vamos treinar?",
    perguntas: [
      {
        pergunta: "Se você jogar uma moeda honesta e sair cara 5 vezes seguidas, qual a chance da próxima ser cara?",
        opcoes: ["50%", "Menos de 50%", "Mais de 50%", "Quase 0%"],
        correta: 0,
        fato: "🪙 A moeda não tem memória. Achar que 'já deu muita cara, agora vem coroa' é a falácia do apostador — um dos erros de raciocínio mais comuns que existem."
      },
      {
        pergunta: "Qual é a diferença entre média e mediana?",
        opcoes: ["A mediana é o valor do meio e resiste a valores extremos", "São sempre iguais", "A média é sempre maior", "A mediana só serve para números pares"],
        correta: 0,
        fato: "📊 Numa sala com nove pessoas de renda comum e um bilionário, a média fica absurda e a mediana continua representando a sala. Por isso renda se costuma reportar pela mediana."
      },
      {
        pergunta: "Correlação entre duas coisas prova que uma causa a outra?",
        opcoes: ["Não — pode haver coincidência ou uma terceira causa", "Sim, sempre", "Sim, se for forte", "Só quando são números grandes"],
        correta: 0,
        fato: "🔗 Venda de sorvete e afogamento sobem juntos, e nenhum causa o outro: o calor causa os dois. Procurar a terceira variável é reflexo básico."
      },
      {
        pergunta: "O que é uma amostra representativa?",
        opcoes: ["Um subconjunto que reflete bem o grupo todo", "A maior amostra possível", "Os primeiros que responderem", "Quem se voluntaria"],
        correta: 0,
        fato: "🎯 Tamanho não corrige viés: uma amostra enorme mal escolhida erra com confiança. Pesquisa feita só com quem se voluntaria costuma ser enviesada."
      },
      {
        pergunta: "Um gráfico cujo eixo Y não começa no zero pode causar o quê?",
        opcoes: ["Exagerar visualmente uma diferença pequena", "Deixar o gráfico mais preciso", "Corrigir a escala", "Nada, é indiferente"],
        correta: 0,
        fato: "📉 Cortar o eixo transforma uma variação de 2% numa montanha. É legítimo em alguns casos, mas quem lê precisa reparar no eixo antes de se impressionar."
      }
    ]
  },
  {
    id: "inv_quiz_evolucao",
    tipo: "quiz",
    titulo: "Evolução e Seleção Natural",
    descricao: "Como a vida mudou ao longo de bilhões de anos.",
    emoji: "🧭",
    habilidade: "Pensamento Científico",
    xp_reward: 130,
    coins_reward: 130,
    tempo_estimado: 12,
    historinha: "Nenhum ser vivo decide evoluir. 🧭 A evolução não tem plano nem destino — e entender isso derruba quase todos os mal-entendidos sobre o assunto. Vamos com calma?",
    perguntas: [
      {
        pergunta: "O que é seleção natural?",
        opcoes: ["Indivíduos mais adaptados ao ambiente deixam mais descendentes", "Os animais escolhem mudar", "Os mais fortes sempre vencem", "A natureza planeja as espécies"],
        correta: 0,
        fato: "🌿 'Mais apto' quer dizer mais adequado àquele ambiente, não mais forte. Em ambiente escasso, o pequeno que come menos pode ser o mais apto."
      },
      {
        pergunta: "De onde vem a variação sobre a qual a seleção natural age?",
        opcoes: ["De mutações e da recombinação genética", "Do esforço dos indivíduos", "Do clima diretamente", "Da vontade da espécie"],
        correta: 0,
        fato: "🎲 A variação surge ao acaso, ANTES de ser útil. O ambiente não encomenda a característica: ele apenas favorece quem já a tinha."
      },
      {
        pergunta: "Quem propôs a teoria da evolução por seleção natural?",
        opcoes: ["Charles Darwin e Alfred Russel Wallace", "Gregor Mendel", "Louis Pasteur", "Isaac Newton"],
        correta: 0,
        fato: "📜 Wallace chegou à mesma ideia de forma independente, e os dois apresentaram o trabalho juntos em 1858. Darwin publicou 'A Origem das Espécies' no ano seguinte."
      },
      {
        pergunta: "O ser humano descende do macaco atual?",
        opcoes: ["Não — humanos e macacos atuais têm um ancestral comum", "Sim, do chimpanzé", "Sim, do gorila", "Não, não há parentesco"],
        correta: 0,
        fato: "🐒 Somos primos, não descendentes. O ancestral comum com o chimpanzé viveu há milhões de anos e não era nem humano nem chimpanzé."
      },
      {
        pergunta: "Por que bactérias se tornam resistentes a antibióticos?",
        opcoes: ["As resistentes sobrevivem e se multiplicam", "Elas aprendem com o remédio", "O remédio as deixa mais fortes", "Elas trocam de espécie"],
        correta: 0,
        fato: "💊 É seleção natural acontecendo em dias. Interromper o tratamento antes da hora deixa vivas justamente as mais resistentes — por isso se completa a caixa."
      }
    ]
  }
]
