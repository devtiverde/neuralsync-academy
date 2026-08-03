// Catálogo da Loja — fonte única de itens e PREÇOS.
//
// Saiu de dentro do `Loja.jsx` em 02/08/2026 porque o preço deixou de ser assunto só da
// tela: o servidor passou a validar a compra (migration 023), e para isso o gerador
// `scripts/gerar-economia-seed.mjs` precisa ler estes mesmos números sem conseguir
// interpretar JSX. Dois lugares com o preço divergindo seria pior que o problema
// original — a criança veria um valor e pagaria outro.
//
// ⚠️ Ao mexer em qualquer preço aqui, rodar `npm run gerar-economia` e aplicar a
// migration gerada, senão o servidor recusa a compra com o preço antigo.

export const catalogoAvatares = [
  { id: 'av_explorer', nome: 'Explorer', emoji: '🧭', preco: 0 },
  { id: 'av_cientista', nome: 'Cientista', emoji: '🔬', preco: 300 },
  { id: 'av_astronauta', nome: 'Astronauta', emoji: '🚀', preco: 500 },
  { id: 'av_mago', nome: 'Mago', emoji: '🧙', preco: 400 },
  { id: 'av_artista', nome: 'Artista', emoji: '🎨', preco: 350 },
  { id: 'av_robo', nome: 'Robô', emoji: '🤖', preco: 600, nivel: 5 },
  { id: 'av_dino', nome: 'Dino', emoji: '🦕', preco: 450 },
  { id: 'av_ninja', nome: 'Ninja', emoji: '🥷', preco: 550 },
  { id: 'av_pirata', nome: 'Pirata', emoji: '🏴‍☠️', preco: 480 },
  { id: 'av_fada', nome: 'Fada', emoji: '🧚', preco: 420 },
  { id: 'av_dragao', nome: 'Dragão', emoji: '🐉', preco: 700, nivel: 6 },
  { id: 'av_unicornio', nome: 'Unicórnio', emoji: '🦄', preco: 650 },
  { id: 'av_gato', nome: 'Gato Ninja', emoji: '😼', preco: 380 },
  { id: 'av_alien', nome: 'Alien', emoji: '👾', preco: 520 },
  { id: 'av_superheroi', nome: 'Super-Herói', emoji: '🦸', preco: 800, nivel: 8 },
  { id: 'av_bruxa', nome: 'Bruxa', emoji: '🧙‍♀️', preco: 430 },
  { id: 'av_zumbi', nome: 'Zumbi', emoji: '🧟', preco: 580 },
  { id: 'av_sereia', nome: 'Sereia', emoji: '🧜', preco: 560 },
  { id: 'av_lenda', nome: 'Lenda 🔒', emoji: '⚡', preco: 2000, nivel: 15 },
]

export const catalogoMolduras = [
  { id: 'mo_basica', nome: 'Básica', emoji: '⬜', preco: 0 },
  { id: 'mo_estrelas', nome: 'Estrelas', emoji: '⭐', preco: 200 },
  { id: 'mo_fogo', nome: 'Fogo', emoji: '🔥', preco: 300 },
  { id: 'mo_arcoiris', nome: 'Arco-íris', emoji: '🌈', preco: 400 },
  { id: 'mo_diamante', nome: 'Diamante', emoji: '💎', preco: 700 },
  { id: 'mo_coroa', nome: 'Coroa', emoji: '👑', preco: 900 },
  { id: 'mo_lua', nome: 'Lua e Estrelas', emoji: '🌙', preco: 350 },
  { id: 'mo_flor', nome: 'Flores', emoji: '🌸', preco: 280 },
  { id: 'mo_raio', nome: 'Raios', emoji: '⚡', preco: 450 },
  { id: 'mo_gelado', nome: 'Gelo', emoji: '❄️', preco: 380 },
  { id: 'mo_neon', nome: 'Neon', emoji: '💫', preco: 600 },
  { id: 'mo_lenda', nome: 'Lenda Dourada', emoji: '🏆', preco: 1500, nivel: 10 },
]

export const catalogoTemas = [
  { id: 'tm_espaco', nome: 'Espaço', emoji: '🌌', preco: 0, desc: 'Fundo galáxia roxa com estrelas animadas' },
  { id: 'tm_floresta', nome: 'Floresta', emoji: '🌿', preco: 0, desc: 'Tons de verde com folhas ao fundo' },
  { id: 'tm_oceano', nome: 'Oceano', emoji: '🌊', preco: 0, desc: 'Fundo aquático com bolhas animadas' },
  { id: 'tm_fogo', nome: 'Fogo', emoji: '🔥', preco: 900, desc: 'Gradiente laranja-vermelho com chamas' },
  { id: 'tm_neon', nome: 'Neon', emoji: '💜', preco: 750, desc: 'Visual cyberpunk com brilhos neon' },
  { id: 'tm_inverno', nome: 'Inverno', emoji: '❄️', preco: 650, desc: 'Fundo azul gelo com flocos de neve' },
  { id: 'tm_por_do_sol', nome: 'Pôr do Sol', emoji: '🌅', preco: 700, desc: 'Gradiente dourado e rosa vibrante' },
  { id: 'tm_candy', nome: 'Candy', emoji: '🍭', preco: 550, desc: 'Cores pastel doces e divertidas' },
  { id: 'tm_lava', nome: 'Lava', emoji: '🌋', preco: 850, desc: 'Vermelho profundo com efeito de lava' },
  { id: 'tm_arcoiris', nome: 'Arco-íris', emoji: '🌈', preco: 1000, nivel: 7, desc: 'Visual totalmente colorido e animado' },
]

export const catalogoTitulos = [
  { id: 'ti_curioso', nome: 'Explorador Curioso', emoji: '🔍', preco: 0, desc: 'Título inicial de todo explorador' },
  { id: 'ti_quiz', nome: 'Mestre dos Quiz', emoji: '🧠', preco: 400, desc: 'Para quem domina as perguntas' },
  { id: 'ti_leitura', nome: 'Leitor Voraz', emoji: '📚', preco: 350, desc: 'Apaixonado por aprender' },
  { id: 'ti_matematica', nome: 'Gênio da Matemática', emoji: '🔢', preco: 500, desc: 'Calculadora humana' },
  { id: 'ti_inventor', nome: 'Inventor Supremo', emoji: '💡', preco: 600, desc: 'Mentes que criam o futuro' },
  { id: 'ti_natureza', nome: 'Guardião da Natureza', emoji: '🌍', preco: 450, desc: 'Defensor do planeta' },
  { id: 'ti_streak', nome: 'Campeão de Streak', emoji: '🔥', preco: 700, desc: '30 dias seguidos sem parar' },
  { id: 'ti_estrela', nome: 'Estrela NeuralSync', emoji: '⭐', preco: 800, nivel: 5, desc: 'Os melhores da plataforma' },
  { id: 'ti_ciencia', nome: 'Cientista Louco', emoji: '🔬', preco: 550, desc: 'Para quem ama experimentos' },
  { id: 'ti_arte', nome: 'Artista Digital', emoji: '🎨', preco: 480, desc: 'Criatividade sem limites' },
  { id: 'ti_codigo', nome: 'Pequeno Programador', emoji: '💻', preco: 650, desc: 'Futuro dev em treinamento' },
  { id: 'ti_lenda', nome: 'Lenda da Academia', emoji: '👑', preco: 3000, nivel: 20, desc: 'O título mais raro da plataforma' },
]

export const catalogoPowerups = [
  { id: 'pu_xp2_1h', nome: 'XP Duplo (1h)', emoji: '⚡', preco: 200, desc: 'Ganhe o dobro de XP por 1 hora' },
  { id: 'pu_xp2_24h', nome: 'XP Duplo (24h)', emoji: '🌟', preco: 500, desc: 'Ganhe o dobro de XP por 24 horas' },
  { id: 'pu_coins_50', nome: 'NeuralCoins +50%', emoji: '💰', preco: 300, desc: 'Ganhe 50% mais coins por 1 hora' },
  { id: 'pu_pular', nome: 'Pular Atividade', emoji: '⏭️', preco: 150, desc: 'Pule uma atividade sem perder o progresso' },
  { id: 'pu_reviver', nome: 'Reviver Tentativa', emoji: '💖', preco: 100, desc: 'Continue de onde parou após erro' },
  { id: 'pu_hint', nome: 'Dica Mágica', emoji: '🔮', preco: 80, desc: 'Receba uma dica em qualquer atividade' },
  { id: 'pu_shield', nome: 'Escudo de Streak', emoji: '🛡️', preco: 250, desc: 'Protege seu streak por 1 dia sem jogar' },
  { id: 'pu_xp3', nome: 'XP Triplo (30min)', emoji: '🚀', preco: 400, desc: 'Ganhe o triplo de XP por 30 minutos' },
]

export const catalogoEfeitos = [
  { id: 'ef_confete', nome: 'Confetes', emoji: '🎊', preco: 0, desc: 'Chuva de confetes coloridos ao completar' },
  { id: 'ef_estrelas', nome: 'Chuva de Estrelas', emoji: '✨', preco: 300, desc: 'Estrelas caindo na tela ao vencer' },
  { id: 'ef_fogos', nome: 'Fogos de Artifício', emoji: '🎆', preco: 500, desc: 'Explosão de fogos coloridos' },
  { id: 'ef_arcoiris', nome: 'Arco-íris Mágico', emoji: '🌈', preco: 400, desc: 'Arco-íris explode pela tela' },
  { id: 'ef_coins', nome: 'Chuva de Coins', emoji: '💰', preco: 350, desc: 'NeuralCoins caindo comemorando' },
  { id: 'ef_emoji', nome: 'Emoji Mania', emoji: '😄', preco: 280, desc: 'Emojis animados em festa' },
  { id: 'ef_raio', nome: 'Tempestade Elétrica', emoji: '⚡', preco: 600, nivel: 5, desc: 'Efeito de raios épico ao vencer' },
  { id: 'ef_aurora', nome: 'Aurora Boreal', emoji: '🌌', preco: 800, nivel: 8, desc: 'Cores mágicas dançando na tela' },
]

export const catalogoBrindes = [
  { id: 'br_adesivos', nome: 'Pacote de Adesivos', emoji: '🎨', preco: 500, desc: 'Kit com 20 adesivos temáticos' },
  { id: 'br_caderno', nome: 'Caderno de Missões', emoji: '📓', preco: 1200, desc: 'Caderno especial NeuralSync' },
  { id: 'br_camiseta', nome: 'Camiseta NeuralSync', emoji: '👕', preco: 3000, desc: 'Camiseta exclusiva da plataforma' },
  { id: 'br_caneca', nome: 'Caneca Espacial', emoji: '☕', preco: 1800, desc: 'Caneca temática de cerâmica' },
  { id: 'br_mochila', nome: 'Mochila NeuralSync', emoji: '🎒', preco: 5000, desc: 'Mochila exclusiva da academia' },
  { id: 'br_bone', nome: 'Boné NeuralSync', emoji: '🧢', preco: 2000, desc: 'Boné bordado edição limitada' },
  { id: 'br_mousepad', nome: 'Mousepad Gamer', emoji: '🖱️', preco: 2500, desc: 'Mousepad com ilustração NeuralSync' },
  { id: 'br_poster', nome: 'Pôster Galáxia', emoji: '🌌', preco: 900, desc: 'Pôster A3 temático para o quarto' },
  { id: 'br_pin', nome: 'Pin Colecionável', emoji: '📌', preco: 600, desc: 'Pin metálico edição especial' },
  { id: 'br_livro', nome: 'Box de Livros', emoji: '📦', preco: 4000, desc: '3 livros educativos curados pela equipe' },
]
