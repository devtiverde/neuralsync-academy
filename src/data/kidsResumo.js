// ──────────────────────────────────────────────────────────────────────
// GERADO por scripts/gerar-kids-resumo.mjs — NÃO EDITE À MÃO.
// Para mudar algo aqui, mude `src/data/kidsData.js` e rode `npm run gerar-kids-resumo`.
//
// É o mínimo do Kids TV que a tela de intro precisa: emoji, título e os primeiros
// 80 caracteres da introdução. Existe porque a intro abre antes de TODA atividade
// e importar o `kidsData.js` inteiro levava 21 kB gzip de seções, fatos e quizzes
// para o celular da criança a cada abertura, para exibir três campos.
//
// O `prebuild` confere se este arquivo está em dia com o kidsData e QUEBRA O BUILD
// se não estiver — arquivo gerado envelhece em silêncio se ninguém vigiar.
// ──────────────────────────────────────────────────────────────────────

export const kidsResumo = {
  dinossauros: { titulo: "Dinossauros: Os Gigantes da Terra", emoji: "🦕", introducao: "Os dinossauros dominaram a Terra por 165 milhões de anos — muito mais do que os " },
  corpo_humano: { titulo: "O Corpo Humano: Uma Máquina Incrível", emoji: "🧬", introducao: "Seu corpo é a máquina mais complexa do universo! Com 37 trilhões de células, 206" },
  animais: { titulo: "Animais: O Reino da Natureza", emoji: "🐘", introducao: "Existem mais de 8 milhões de espécies de animais na Terra! De insetos microscópi" },
  planeta_terra: { titulo: "Planeta Terra: Nossa Casa no Espaço", emoji: "🌍", introducao: "A Terra tem 4,5 bilhões de anos e é o único planeta que conhecemos com vida! Com" },
  esportes: { titulo: "Esportes: Corpo, Mente e Superação", emoji: "⚽", introducao: "O esporte é uma das maiores invenções da humanidade! Ele desenvolve força, conce" },
  coracao: { titulo: "Como Funciona o Coração", emoji: "❤️", introducao: "Seu coração bate mais de 100.000 vezes por dia sem nunca parar — mesmo enquanto " },
  golfinhos: { titulo: "Golfinhos: Os Gênios do Mar", emoji: "🐬", introducao: "Golfinhos são considerados os animais mais inteligentes do oceano — e talvez de " },
  vulcoes: { titulo: "Vulcões: A Força da Natureza", emoji: "🌋", introducao: "Vulcões são as janelas para o interior da Terra! Onde a crosta rochosa se abre, " },
  tecnologia: { titulo: "Tecnologia: O Mundo Digital", emoji: "💻", introducao: "A tecnologia transformou o mundo em menos de 100 anos! Do primeiro computador qu" },
  matematica: { titulo: "Matemática: A Linguagem do Universo", emoji: "🔢", introducao: "A matemática não é só contas de escola — é a linguagem fundamental do universo! " },
  arte: { titulo: "Arte e Cultura: Criatividade Humana", emoji: "🎨", introducao: "A arte é tão antiga quanto a humanidade! As primeiras pinturas rupestres têm mai" },
  historia_brasil: { titulo: "História do Brasil: Nossa Jornada", emoji: "🇧🇷", introducao: "O Brasil tem mais de 500 anos de história oficial — mas os povos indígenas habit" },
  frutas: { titulo: "Frutas: Doces Tesouros da Natureza", emoji: "🍓", introducao: "As frutas são os presentes mais coloridos e gostosos que a natureza nos dá! Elas" },
  fisica: { titulo: "Física: As Leis que Governam o Universo", emoji: "⚛️", introducao: "A Física é a ciência que descreve absolutamente tudo — desde partículas menores " },
  profissoes: { titulo: "Profissões: O Que Posso Ser?", emoji: "👷", introducao: "Cada pessoa tem uma profissão — um trabalho que faz para ajudar o mundo! Médicos" },
  filosofia: { titulo: "Filosofia e Ética: As Grandes Perguntas", emoji: "🧩", introducao: "A filosofia faz as perguntas mais difíceis que existem: O que é certo e errado? " },
  formas_cores: { titulo: "Formas e Cores: O Mundo Colorido", emoji: "🔷", introducao: "As formas e as cores estão em todo lugar ao nosso redor! O sol é redondo, as jan" },
  transporte: { titulo: "Meios de Transporte", emoji: "🚗", introducao: "Como as pessoas se movem de um lugar para outro? Usam carros, ônibus, trens, avi" },
}
