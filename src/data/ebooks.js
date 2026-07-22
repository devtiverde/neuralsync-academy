/**
 * Biblioteca de ebooks da NeuralSync.
 *
 * Estrutura data-driven: cada ebook tem `capitulos[]` e a leitura acontece em
 * `/ebook/leitura?id=<id>`. Antes existia um único ebook ("A Tela Certa") com os
 * capítulos escritos direto no componente — foi migrado para cá.
 *
 * Os ebooks novos ("por faixa etária, ciência em palavras fáceis") são escritos
 * para o PAI LER PARA/COM o filho (decisão do Cláudio em 22/07/2026): linguagem
 * simples de ler em voz alta, com uma dica de conversa no fim de cada capítulo.
 * Cada ebook declara a(s) faixa(s) para as quais foi pensado, mas todos ficam na
 * Biblioteca (área do pai), liberados nos planos pagos.
 *
 * ⚠️ Cuidado factual: mitos comuns foram evitados de propósito (a Amazônia NÃO
 * produz "20% do oxigênio do mundo"; vinagre+bicarbonato é reação ENDOtérmica,
 * esfria; etc.). Ao adicionar conteúdo, conferir os fatos — já tivemos leva de
 * ~120 correções factuais no app.
 */

export const MATERIAS = {
  ciencias:  { label: 'Ciências da Natureza', emoji: '🔬', cor: '#10b981' },
  logica:    { label: 'Lógica e Matemática',  emoji: '🔢', cor: '#7C3AED' },
  sociedade: { label: 'Mundo e Sociedade',    emoji: '🌍', cor: '#F07A20' },
  linguagem: { label: 'Linguagem',            emoji: '🔤', cor: '#3b82f6' },
  pais:      { label: 'Para os Pais',         emoji: '👨‍👩‍👧', cor: '#ec4899' },
}

export const FAIXA_LABEL = {
  exploradores: 'Exploradores (4–5)',
  construtores: 'Construtores (6–8)',
  criadores:    'Criadores (9–11)',
  inventores:   'Inventores (12–15)',
  pais:         'Pais',
}

export const ebooks = [
  // ══════════════════════════════════════════════════════════════════
  // CIÊNCIAS DA NATUREZA
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'corpo-humano',
    titulo: 'Seu Corpo é uma Máquina Incrível',
    subtitulo: 'A ciência do corpo humano em palavras fáceis',
    materia: 'ciencias',
    faixas: ['construtores', 'criadores'],
    emoji: '🫀',
    leituraMin: 12,
    capitulos: [
      {
        titulo: 'O coração: a bomba que nunca para',
        conteudo: `Feche a mão e aperte com força. Pronto: esse é mais ou menos o tamanho do seu coração. Pequeno, né? Mas ele faz um trabalho gigante.

O coração é uma bomba. O dia inteiro, mesmo quando você dorme, ele aperta e solta, aperta e solta, empurrando o sangue para todos os cantos do seu corpo. É por isso que, quando você põe a mão no peito, sente aquele "tum-tum": é o coração trabalhando.

O sangue é como um caminhão de entregas. Ele leva comida e ar para cada pedacinho do corpo e recolhe a sujeira para jogar fora. Sem essa entrega, nenhuma parte do corpo funcionaria.

Quando você corre ou pula, seus músculos precisam de mais comida e mais ar bem rápido. Aí o coração acelera para dar conta — e é por isso que ele bate mais forte depois de uma corrida.`,
        conversa: 'Peça para a criança correr no lugar por 20 segundos e depois pôr a mão no peito. Pergunte: "Por que será que ele está batendo mais rápido agora?"',
      },
      {
        titulo: 'O cérebro: o chefe de tudo',
        conteudo: `Dentro da sua cabeça mora o chefe do corpo inteiro: o cérebro. Ele parece uma esponja enrugada e é macio como gelatina firme.

Tudo que você faz passa por ele primeiro. Levantar o braço, sentir cheiro de bolo, lembrar do nome de um amigo, ficar com medo, ter uma ideia — tudo começa no cérebro. Ele manda recados pelo corpo por uns fios finininhos chamados nervos, e esses recados viajam muito rápido, quase na hora.

O mais legal: quanto mais você usa o cérebro para aprender coisas novas, mais forte ele fica. Não é força de músculo, é força de conexão. Cada vez que você tenta algo difícil e não desiste, seu cérebro cria caminhos novos por dentro. Errar e tentar de novo é literalmente construir cérebro.

Por isso, um quebra-cabeça difícil não é "perder tempo": é treino para o chefe.`,
        conversa: 'Pergunte: "O que foi a coisa mais difícil que você aprendeu a fazer?" e lembre que o cérebro dela ficou mais forte fazendo isso.',
      },
      {
        titulo: 'Ossos e músculos: a armação que te segura',
        conteudo: `Imagine uma barraca de acampamento. As varetas seguram o pano em pé. No seu corpo, os ossos são as varetas: eles dão forma e sustentam você. Sem ossos, você seria molinho como um travesseiro.

Você tem mais de 200 ossos. O menorzinho fica dentro da orelha e é do tamanho de um grão de arroz. O maior é o osso da coxa. Os ossos são duros por fora, mas vivos por dentro — eles crescem junto com você e até se consertam sozinhos quando quebram.

Só que ossos sozinhos não se mexem. Quem puxa eles são os músculos. Os músculos são como elásticos fortes presos aos ossos: quando eles encolhem, o osso se move. Dobrar o braço, sorrir, piscar o olho — é sempre um músculo puxando.

E os músculos também ficam mais fortes com uso. Brincar, correr e subir em coisas é o jeito de treinar eles.`,
        conversa: 'Peça para a criança apertar o braço enquanto dobra o cotovelo e sentir o músculo "engordar". Explique que ali ele está encolhendo para puxar o osso.',
      },
      {
        titulo: 'A comida vira você',
        conteudo: `Já parou para pensar que a maçã que você comeu vira pedaço de você? É verdade — e o caminho dela é uma aventura.

Primeiro, os dentes cortam e amassam a comida. A saliva na boca já começa a desmanchar ela. Depois, a comida desce por um tubo até a barriga, onde fica de molho num líquido especial que a transforma numa papa.

Nessa papa tem tudo o que o corpo precisa: pedacinhos que viram energia para correr, pedacinhos que ajudam os ossos a crescer, pedacinhos que consertam o corpo. O intestino recolhe essas partes boas e manda para o sangue, que entrega em todo lugar. O que não serve, o corpo joga fora quando você vai ao banheiro.

É por isso que comer de tudo um pouco — fruta, verdura, arroz, feijão, carne — deixa o corpo com todas as peças de que precisa. Cada alimento traz uma peça diferente.`,
        conversa: 'Na próxima refeição, pergunte: "Qual parte do corpo será que esse alimento está ajudando?" Não precisa acertar — o legal é imaginar.',
      },
      {
        titulo: 'Por que a gente dorme',
        conteudo: `Parece que dormir é não fazer nada. Mas é o contrário: enquanto você dorme, seu corpo trabalha um monte.

À noite, o cérebro faz uma faxina. Ele guarda nas "gavetas" as coisas importantes que você aprendeu no dia e joga fora o que não precisa. É por isso que, quando você dorme bem depois de estudar, lembra melhor no dia seguinte. Dormir é parte de aprender.

O corpo também aproveita o sono para crescer e se consertar. Machucados saram mais rápido, os músculos descansam, e a energia se recarrega, como um celular na tomada.

Quando a gente dorme pouco, no dia seguinte fica difícil prestar atenção, a gente fica emburrado e qualquer coisinha irrita. Não é frescura — é o corpo pedindo a faxina que não teve.

Uma dica que ajuda o sono: telas de longe antes de dormir. A luz forte da tela engana o cérebro, que pensa que ainda é dia e demora mais para desligar.`,
        conversa: 'Combine um "ritual de desligar" juntos: guardar as telas, apagar a luz forte e contar uma coisa boa do dia antes de dormir.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // LÓGICA E MATEMÁTICA
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'numeros-formas',
    titulo: 'O Mundo Secreto dos Números e das Formas',
    subtitulo: 'Matemática que está escondida em tudo',
    materia: 'logica',
    faixas: ['exploradores', 'construtores'],
    emoji: '🔷',
    leituraMin: 10,
    capitulos: [
      {
        titulo: 'Números são apelidos de quantidades',
        conteudo: `Antes de existir a palavra "três", as pessoas já viam três pedras, três frutas, três estrelas. O número três é só um apelido curtinho para "essa quantidade aqui".

Isso é o mais importante de entender sobre números: eles não são desenhos enfeitados, são apelidos de quantidades. O "5" é o apelido de quando você tem cinco de alguma coisa — cinco dedos, cinco bolinhas, cinco pulos.

Por isso contar com os dedos não é "coisa de bebê": é usar o corpo para enxergar a quantidade. Todo mundo começou assim, até os matemáticos mais famosos.

Quando a criança entende que número é quantidade, e não um símbolo decorado, a matemática inteira fica mais fácil pela frente.`,
        conversa: 'Espalhe alguns objetos na mesa e conte junto tocando em cada um. Depois pergunte: "Se eu tirar um, quantos ficam?"',
      },
      {
        titulo: 'O zero: o número do nada',
        conteudo: `Aqui vai uma ideia curiosa: existe um número para o nada. É o zero.

Pode parecer bobo ter um número para nada, mas foi uma das invenções mais espertas da história. Imagine que você tinha três balas e comeu as três. Quantas balas você tem agora? Zero. O zero conta o "não tem".

O zero também é o herói dos números grandes. Sabe por que "10" é diferente de "1"? Por causa do zero do lado. Ele empurra o 1 para um lugar que vale mais. É assim que a gente escreve números enormes usando só dez símbolos (de 0 a 9): mudando as peças de lugar.

Sem o zero, seria quase impossível escrever números grandes. Ele parece o número do nada, mas faz um trabalhão.`,
        conversa: 'Brinque de "quantos sobraram": coma junto os pedacinhos de algo até chegar a zero, dizendo o número a cada mordida.',
      },
      {
        titulo: 'Padrões: o mundo se repete',
        conteudo: `Olhe para o seu redor e você vai começar a ver padrões em todo lugar. Um padrão é uma coisa que se repete seguindo uma regra.

O dia e a noite se revezam: dia, noite, dia, noite. Isso é um padrão. As listras de uma zebra, os quadrados de um tabuleiro, o refrão de uma música que volta sempre igual — tudo é padrão.

Descobrir o padrão é como descobrir a regra de um jogo secreto. Quando você percebe "ah, está sempre pulando de dois em dois", você consegue adivinhar o que vem depois sem precisar contar tudo de novo. Isso é o comecinho do pensamento matemático de verdade.

E não para na matemática: quem enxerga padrões entende melhor música, desenho, e até como as coisas funcionam. O cérebro adora padrões porque eles deixam o mundo mais fácil de prever.`,
        conversa: 'Crie um padrão com objetos (colher, garfo, colher, garfo...) e pergunte: "O que vem agora?" Depois deixe a criança inventar um para você adivinhar.',
      },
      {
        titulo: 'Formas: as peças do mundo',
        conteudo: `Todo desenho, todo objeto, é feito de formas mais simples juntas. Uma casa é um quadrado com um triângulo em cima. Uma bicicleta tem dois círculos. Um sorvete é um triângulo de ponta para baixo com um círculo em cima.

As formas têm nomes pelo número de lados. O triângulo tem três lados (tri = três). O quadrado tem quatro lados iguais. O círculo é especial: não tem lado nenhum, é uma volta só, sem cantos.

Quando a criança começa a enxergar as formas escondidas nas coisas, ela está treinando o olhar de quem projeta, desenha e constrói. Engenheiros e artistas fazem exatamente isso: enxergam o mundo montado em formas.

O melhor: dá para montar formas grandes juntando formas pequenas. Dois triângulos viram um quadrado. É como um quebra-cabeça infinito.`,
        conversa: 'Saiam pela casa "caçando formas": quantos círculos vocês acham? E triângulos? Vale relógio, prato, janela, tudo.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // MUNDO E SOCIEDADE (inclui dinheiro básico)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'emocoes-dinheiro',
    titulo: 'Emoções, Amizade e o Valor das Coisas',
    subtitulo: 'Sentimentos, convivência e as primeiras ideias sobre dinheiro',
    materia: 'sociedade',
    faixas: ['construtores', 'criadores'],
    emoji: '💛',
    leituraMin: 11,
    capitulos: [
      {
        titulo: 'Toda emoção serve para alguma coisa',
        conteudo: `Às vezes a gente acha que existem emoções "boas" e emoções "ruins". Mas a verdade é que toda emoção serve para alguma coisa — ela é um recado do seu corpo.

O medo é um recado que diz "cuidado, pode ter perigo". Graças ao medo, você olha antes de atravessar a rua. A raiva é um recado que diz "algo aqui não está justo". A tristeza é um recado que diz "perdi algo que era importante para mim" — e ela ajuda os outros a perceberem que você precisa de carinho.

Até a alegria é um recado: diz "isso aqui faz bem, faça mais vezes".

O problema nunca é sentir a emoção. O que a gente aprende, com o tempo, é o que fazer com ela. Sentir raiva é normal; bater em alguém não. Por isso, dar nome ao que se sente já é meio caminho: "estou com raiva" é bem diferente de só explodir.`,
        conversa: 'No fim do dia, cada um conta uma emoção que sentiu e por quê. Vale dizer "fiquei com raiva quando..." sem ninguém corrigir. Só nomear já ajuda.',
      },
      {
        titulo: 'Amizade é combinar de novo',
        conteudo: `Amigos brigam. Todos eles, uma hora ou outra. O que faz uma amizade durar não é nunca brigar — é saber combinar de novo depois.

Quando duas pessoas convivem, é natural que às vezes queiram coisas diferentes. Um quer jogar bola, o outro quer desenhar. Isso não é o fim da amizade; é só um momento de resolver. Boas amizades se resolvem conversando: "eu quis isso, você quis aquilo, como a gente faz?"

Uma parte difícil e importante é pedir desculpa de verdade — não o "desculpa" resmungado, mas o que vem junto com "eu não devia ter feito isso". E o outro lado também aprende algo valioso: perdoar, para não ficar carregando raiva à toa.

Amizade é um pouco como cuidar de uma planta: precisa de atenção de vez em quando, senão murcha. Mandar uma mensagem, dividir o lanche, esperar o outro — são águas que mantêm a amizade viva.`,
        conversa: 'Pergunte sobre uma vez em que a criança brigou com um amigo e fez as pazes. Como foi? O que ajudou a combinar de novo?',
      },
      {
        titulo: 'De onde vem o dinheiro',
        conteudo: `Muita criança pensa que dinheiro vem do banco ou daquela máquina na parede. Mas o dinheiro não nasce lá — ele só fica guardado lá.

O dinheiro vem do trabalho. Quando um adulto faz algo útil para outras pessoas — conserta um cano, ensina numa escola, cuida de doentes, dirige um ônibus, cozinha num restaurante — ele recebe dinheiro em troca desse trabalho. O dinheiro é uma forma de dizer "obrigado pelo que você fez, agora você pode pegar algo que precisa".

Por isso o dinheiro é limitado: ele representa trabalho, e trabalho dá esforço. Não dá para ter tudo ao mesmo tempo, e está tudo bem — ninguém tem.

Entender isso cedo ajuda a criança a valorizar as coisas. Aquele brinquedo custou horas do trabalho de alguém. Não para deixar a criança preocupada com contas de adulto — mas para ela sacar que as coisas têm valor porque alguém se esforçou por elas.`,
        conversa: 'Converse sobre o trabalho que existe atrás de algo simples: o pão da manhã passou pelo agricultor, pelo padeiro, pelo caminhão... quantas pessoas trabalharam?',
      },
      {
        titulo: 'Guardar hoje para ter amanhã',
        conteudo: `Existe um pequeno superpoder que muita gente grande gostaria de ter aprendido criança: saber esperar e guardar.

Imagine que você ganha um pouco de dinheiro ou de moedas. Você pode gastar tudo agora numa coisa pequena, ou guardar um pouco de cada vez para conseguir uma coisa maior depois. Guardar é escolher o "eu do futuro" em vez do "eu de agora".

No comecinho é difícil, porque o agora grita mais alto: a vontade de gastar já é forte. Mas quem treina a esperar descobre uma coisa boa: ver o montinho crescer também dá alegria. E a coisa comprada com o dinheiro guardado costuma ser mais bem cuidada, porque deu trabalho conseguir.

Aqui na NeuralSync tem um treino disso: as NeuralCoins. Dá para gastar rápido numa coisinha ou juntar para algo especial da loja. É esse mesmo superpoder, brincando: querer x precisar, agora x depois.`,
        conversa: 'Ajude a criança a escolher uma "meta" (um item da loja da NeuralSync, por exemplo) e acompanhem juntos as moedas subindo até lá. Comemorem quando chegar.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // LINGUAGEM
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'aventura-palavras',
    titulo: 'A Aventura das Palavras',
    subtitulo: 'De onde vêm as letras, as histórias e as línguas',
    materia: 'linguagem',
    faixas: ['exploradores', 'construtores'],
    emoji: '📖',
    leituraMin: 9,
    capitulos: [
      {
        titulo: 'Letras são desenhos de sons',
        conteudo: `Aqui vai um segredo das letras: cada letra é o desenho de um som. Quando você vê a letra "M" e faz "mmm", você está transformando um desenho em som. Ler é isso: trocar desenhos por sons e sons por sentidos.

Faz muito, muito tempo, as pessoas não sabiam escrever. Elas guardavam tudo na memória e passavam as histórias falando, de boca em boca. Só que a memória esquece. Aí alguém teve a ideia genial: e se a gente desenhasse os sons? Assim as palavras poderiam ficar guardadas em pedras, papéis, e durar mais que as pessoas.

Por isso a escrita é uma das maiores invenções de todos os tempos. Ela é uma máquina do tempo: você pode ler hoje o que alguém pensou faz mil anos.

Quando a criança junta as letrinhas e forma a primeira palavra sozinha, ela está usando uma invenção de milhares de anos. É bem mais mágico do que parece.`,
        conversa: 'Escolha uma letra e saiam procurando coisas que começam com o som dela pela casa. Faça o som junto, não só o nome da letra.',
      },
      {
        titulo: 'Toda história tem um esqueleto',
        conteudo: `Da menor historinha ao filme mais longo, quase toda história tem o mesmo esqueleto escondido: um começo, um problema e uma solução.

No começo, a gente conhece alguém e o mundo dele. Aí aparece um problema — algo dá errado, alguém some, um perigo chega. É o problema que prende a atenção: a gente quer saber como vai resolver. E no fim vem a solução, quando o problema se resolve (nem sempre do jeito que a gente esperava).

Saber desse esqueleto ajuda de dois jeitos. Ao ouvir histórias, a criança entende melhor o que está acontecendo. E ao inventar as próprias histórias, ela tem um mapa: "quem é o personagem? qual o problema dele? como resolve?"

Contar histórias não é só brincadeira. É treino de organizar ideias em ordem — a mesma habilidade que serve para explicar as coisas, escrever e até resolver problemas na vida.`,
        conversa: 'Inventem uma história juntos em três partes: "Era uma vez... / Um dia, apareceu um problema... / E então...". Cada um continua uma parte.',
      },
      {
        titulo: 'Ler em voz alta é dar vida às palavras',
        conteudo: `Uma mesma frase pode ser dita de mil jeitos. "Vem cá" pode ser um convite alegre, um sussurro de segredo ou um chamado de bronca. As palavras no papel são as mesmas; quem dá a emoção é a voz.

Quando um adulto lê em voz alta para a criança, acontece uma coisa poderosa. A criança ouve palavras que ainda não sabe ler, aprende como a história soa, e junta a voz de quem ama a ela ao prazer de ler. Isso planta a vontade de ler para a vida toda.

E não precisa ser uma leitura perfeita de ator. Errar, rir, fazer vozes engraçadas, parar para perguntar "o que será que vai acontecer?" — tudo isso deixa a leitura viva.

Ler junto, mesmo poucos minutos por dia, faz mais pela leitura de uma criança do que quase qualquer outra coisa. É um dos presentes mais baratos e mais valiosos que existem.`,
        conversa: 'Leiam um trecho fazendo vozes diferentes para cada personagem. Deixe a criança escolher a voz de um deles.',
      },
      {
        titulo: 'Outra língua, outro nome para o mundo',
        conteudo: `A cachorro que late no seu quintal, uma criança em outro país chama de "dog". É o mesmo bicho — só o apelido que muda. Isso é o que uma língua nova ensina: que existem vários nomes para as mesmas coisas do mundo.

Aprender outra língua, como o inglês, não é decorar palavras difíceis. É descobrir que o mundo pode ser nomeado de mais de um jeito, e que existem milhões de pessoas que enxergam as mesmas coisas com outros sons.

Crianças têm uma vantagem enorme nisso: o cérebro delas aprende sons novos com muita facilidade, bem mais que o dos adultos. Por isso, ouvir e brincar com outra língua desde cedo — uma música, os nomes das cores, uma contagem — abre uma porta que fica mais fácil a vida toda.

Não precisa pressa nem prova. No começo, o importante é a língua nova ser divertida, e não uma obrigação. A vontade vem primeiro; o resto vem atrás.`,
        conversa: 'Escolham uma palavra do dia em inglês (uma cor, um animal) e usem ela de brincadeira o dia todo. Amanhã, outra.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // PARA OS PAIS — ebook original migrado do componente
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'tela-certa',
    titulo: 'A Tela Certa',
    subtitulo: 'Como usar a tecnologia para criar uma criança inteligente',
    materia: 'pais',
    faixas: ['pais'],
    emoji: '📱',
    leituraMin: 25,
    capitulos: [
      {
        titulo: 'Introdução — A Tela Não É a Vilã',
        conteudo: `A tecnologia não é o problema. O problema é como usamos ela.

Nos últimos anos, criamos uma narrativa em que a tela é a vilã da história — responsável por tudo, desde a falta de atenção até problemas de socialização. Mas essa visão é simplista demais para um fenômeno tão complexo.

A verdade é que a tela é uma ferramenta. Como toda ferramenta, pode construir ou destruir, dependendo de quem a usa e como.

Este livro não vai te ensinar a proibir o celular do seu filho. Vai te ensinar a transformá-lo em uma das mais poderosas ferramentas de desenvolvimento cognitivo da história da educação.

A NeuralSync Academy nasceu exatamente dessa crença: que tecnologia bem direcionada pode ser a melhor aliada do desenvolvimento infantil.`,
      },
      {
        titulo: 'Capítulo 1 — O Cérebro Aprende Fazendo',
        conteudo: `Jean Piaget nos ensinou algo fundamental: a criança aprende fazendo, não observando.

O construtivismo — teoria que fundamenta toda a NeuralSync Academy — parte do princípio de que o conhecimento é construído ativamente pelo aprendiz.

Quando sua filha joga um jogo que requer raciocínio lógico, ela não está perdendo tempo. Ela está construindo estruturas cognitivas que vão durar a vida toda.

O problema com a maioria dos conteúdos digitais é que eles são passivos. A criança consome, mas não produz. Assiste, mas não pensa.

Pesquisas sobre jogos de estratégia sugerem que crianças que jogam jogos que exigem planejamento desenvolvem melhor a resolução de problemas. O jogo ativo estimula o córtex pré-frontal — a área responsável pelo planejamento, tomada de decisão e controle de impulsos.`,
      },
      {
        titulo: 'Capítulo 2 — Regras de Ouro do Tempo de Tela',
        conteudo: `As principais organizações de saúde do mundo têm diretrizes claras sobre tempo de tela.

Para crianças de 2 a 5 anos: máximo 1 hora por dia de conteúdo de qualidade, sempre com supervisão adulta.

Para crianças de 6 a 12 anos: limite consistente de tempo, priorizando atividades físicas, sono e interações presenciais.

Mas atenção: essas diretrizes foram criadas pensando em uso passivo. Uma hora de jogo cognitivo ativo é fundamentalmente diferente de uma hora assistindo vídeos aleatórios.

As 3 Perguntas que Todo Pai Deveria Fazer:
1. O conteúdo ensina algo ou apenas entretém?
2. Meu filho está produzindo ou apenas consumindo?
3. Esse tempo de tela está substituindo algo importante (sono, exercício, convívio social)?

Se as respostas forem positivas para a primeira e negativas para as outras duas, você está no caminho certo.`,
      },
      {
        titulo: 'Capítulo 3 — Faixas Etárias e o Que Funciona em Cada Uma',
        conteudo: `Cada fase do desenvolvimento neurológico pede um tipo diferente de estímulo digital.

EXPLORADORES (4 a 5 anos)
Nessa fase, o cérebro está desenvolvendo a linguagem, a motricidade fina e a noção de causa e efeito. Conteúdos ideais: jogos de encaixe digital, livros interativos, vídeos de natureza com narração clara. Tempo máximo: 30 a 45 minutos por sessão, sempre acompanhado.

CONSTRUTORES (6 a 8 anos)
A criança já lê, compreende regras e começa a pensar de forma lógica. É a fase ideal para introduzir programação visual (Scratch), quebra-cabeças digitais e quizzes educativos. Tempo máximo: 45 minutos a 1 hora.

CRIADORES (9 a 11 anos)
Pensamento abstrato começa a se desenvolver. Projetos de criação digital (stop motion, blog, podcast simples) estimulam criatividade e comunicação. Tempo máximo: 1 a 1h30.

INVENTORES (12 a 15 anos)
Jovens se beneficiam de desafios reais: programação, inteligência artificial, robótica e pesquisa científica online. O foco muda de consumo para produção e criação. Tempo máximo: 1h30 a 2h, com pausas regulares.`,
      },
      {
        titulo: 'Capítulo 4 — Construindo Hábitos Digitais Saudáveis',
        conteudo: `A consistência supera a intensidade. Dez minutos de atividade cognitiva por dia, todo dia, transforma o cérebro de uma criança em 30 dias.

A ROTINA DIGITAL EM 4 PASSOS:

Passo 1 — Defina o horário
Crianças prosperam com previsibilidade. Defina um horário fixo para o tempo de tela educativo — preferencialmente depois do dever de casa e antes do jantar.

Passo 2 — Prepare o ambiente
Tela em local visível, fones de ouvido não obrigatórios, postura adequada. Evite o quarto ou a cama.

Passo 3 — Escolha o conteúdo antes
Nunca deixe a criança "explorar livremente" plataformas não curadas. Selecione o conteúdo com antecedência.

Passo 4 — Debrief após o uso
A pergunta mais poderosa que um pai pode fazer: "O que você aprendeu hoje?" Essa simples ação consolida o aprendizado na memória de longo prazo.`,
      },
      {
        titulo: 'Capítulo 5 — Telas e Sono: O Inimigo Silencioso',
        conteudo: `A luz azul emitida por dispositivos digitais atrapalha a produção de melatonina — o hormônio do sono — especialmente nas crianças.

Usar dispositivos na hora que antecede o sono tende a atrasar o adormecer. Ao longo de uma semana, esses minutos perdidos viram horas de sono a menos.

E sono insuficiente em crianças está diretamente ligado a:
- Dificuldade de concentração e atenção
- Alterações de humor e irritabilidade
- Menor capacidade de consolidação de memórias
- Impactos no desenvolvimento e na saúde

A REGRA DO ESCRITÓRIO DIGITAL: todo dispositivo tem um "horário de trabalho". No mínimo 1 hora antes de dormir, todos os dispositivos vão para um "escritório digital" — um local centralizado da casa onde carregam durante a noite. Isso funciona porque remove o objeto físico do quarto, não apenas o acesso.`,
      },
      {
        titulo: 'Capítulo 6 — Conversas Difíceis: Como Limitar Sem Conflito',
        conteudo: `"Mais 5 minutinhos!" — toda criança já disse isso. E todo pai já cedeu. E já se arrependeu.

A negociação interminável acontece porque a criança aprendeu que persistir funciona. A solução não é endurecer mais — é mudar a estrutura da situação.

ESTRATÉGIAS QUE FUNCIONAM:

O Aviso Progressivo
Avise com 10 minutos, depois 5, depois 2. A criança não é surpreendida e o cérebro tem tempo de "desligar" gradualmente.

O Timer Visual
Use um timer físico ou digital que a criança VEJA contando. Quando chega a zero, não é o pai que está dizendo para parar — é o tempo.

A Rotina de Encerramento
Crie um ritual de desligar: "Agora você vai salvar o progresso, fechar o app e me contar uma coisa que aprendeu." O encerramento ritualizado reduz a resistência.

A Recompensa Antecipada
"Quando você terminar a sessão de hoje, vamos [atividade especial juntos]." Dá à criança algo pelo qual torcer ALÉM da tela.`,
      },
      {
        titulo: 'Conclusão — Você Já Está Fazendo a Diferença',
        conteudo: `O simples fato de você estar lendo este ebook já coloca você à frente da maioria dos pais no que diz respeito à consciência digital.

Pais que se preocupam com o tipo de conteúdo que seus filhos consomem criam crianças que se tornam mais seletivas, mais críticas e mais capacitadas para navegar o mundo digital por conta própria.

Mas atenção ao perfeccionismo: você não precisa executar tudo que está neste livro de uma vez. Escolha UMA mudança para implementar esta semana.

Pode ser o timer visual. Pode ser o debrief pós-tela. Pode ser o ritual de encerramento. Uma mudança consolidada vale mais que dez tentadas e abandonadas.

A NeuralSync Academy foi criada para ser a ferramenta que torna isso mais fácil. Cada sessão de atividade é projetada para ser curta, intensa e recompensadora — para que seu filho QUEIRA aprender.

O futuro pertence às crianças que aprendem a aprender. E você está construindo isso hoje.

Obrigado por fazer parte dessa jornada.`,
      },
    ],
  },
]

export function getEbook(id) {
  return ebooks.find(e => e.id === id) || null
}
