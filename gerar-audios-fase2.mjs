import { execFileSync } from 'child_process'
import { mkdirSync } from 'fs'

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
}

function gerar(voice, rate, destino, texto) {
  execFileSync('python', [
    '-m', 'edge_tts',
    '-t', texto,
    '-v', voice,
    `--rate=${rate}`,
    '--write-media', destino,
  ], { stdio: ['ignore', 'ignore', 'pipe'] })
}

// ── Inglês (voz en-US-AnaNeural — "Cute/Cartoon", boa pra criança aprendendo) ──
const INGLES_VOICE = 'en-US-AnaNeural'
const INGLES_RATE = '-15%'

const VOCAB_EN = [
  'Red','Blue','Yellow','Green','Orange','Purple','Pink','White','Black',
  'Cat','Dog','Bird','Fish','Rabbit','Horse','Duck','Elephant',
  'One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
  'Hello','Goodbye','Please','Thank you','Yes','No',
]

const FLASHCARDS_EN = [
  'Hello','Good morning','Good night',"I'm fine",'See you later',
  'Book','Pen','School','Teacher','Student','Homework',
  'Mother','Father','Sister','Brother','Grandmother','Grandfather',
  'Apple','Water','Bread','Milk',
  'Head','Hand','Eye','Nose','Mouth','Ear',
  'Friend','House','Happy',
]

const inglesUnicos = [...new Set([...VOCAB_EN, ...FLASHCARDS_EN])]
const tarefasIngles = inglesUnicos.map(texto => ({
  categoria: 'ingles', arquivo: slug(texto), texto, voice: INGLES_VOICE, rate: INGLES_RATE,
}))

// ── História Interativa (voz Francisca, pt-BR) ─────────────────────────────────
const HISTORIA_VOICE = 'pt-BR-FranciscaNeural'
const HISTORIA_RATE = '-8%'

const HISTORIAS_TEXTO = {
  'floresta-magica': {
    'inicio': 'Luna entrou na floresta encantada e encontrou um cofre misterioso com dois cadeados diferentes. O que ela deve fazer?',
    'cadeado-dourado': 'O cadeado dourado abriu fácil! Dentro havia um mapa brilhante do tesouro. O mapa mostra dois caminhos que levam em direções opostas da floresta.',
    'procura-chave': 'Luna procurou com cuidado e encontrou uma chave de prata brilhante debaixo de uma pedra coberta de musgo. Mas ao se levantar, avistou pegadas estranhas na lama.',
    'ajuda-coruja': 'A coruja sábia piscou seus olhos dourados e disse: "O cofre guarda magia antiga. Você precisa cantar a música da floresta para abri-lo." Luna respirou fundo e cantou.',
    'caminho-floresta': 'No coração da floresta, Luna encontrou um vilarejo de fadas que precisavam de ajuda para encontrar suas flores perdidas. As fadas choravam baixinho entre as raízes das árvores.',
    'caminho-montanha': 'Luna subiu a montanha pedregosa e encontrou um sábio ancião sentado numa pedra plana, rodeado de livros abertos. Ele sorriu e disse: "Eu esperava por você, exploradora."',
    'cofre-aberto': 'Com a chave de prata, o cofre se abriu lentamente revelando um jardim minúsculo dentro de uma caixinha de cristal. Dentro havia sementes encantadas que poderiam fazer a floresta florescer para sempre.',
    'seguir-pegadas': 'As pegadas levaram Luna até uma clareira onde um filhote de lobo estava tremendo sozinho, perdido da sua família. Seus olhos brilhavam de medo e esperança ao mesmo tempo.',
    'cofre-musica': 'Com a melodia certa, o cofre vibrou com uma luz dourada e se abriu! Dentro havia uma varinha que brilhava com todas as cores do arco-íris. Era o poder da floresta encantada, guardado por séculos.',
    'outra-melodia': 'Luna tentou uma melodia mais suave, como o vento entre as folhas. O cofre respondeu com uma luz suave e se abriu revelando um cristal que guardava todo o conhecimento da floresta encantada.',
    'fim-heroi': 'Luna usou todo o poder que encontrou para ajudar as criaturas da floresta. Os animais a elegeram guardiã das criaturas mágicas, e a floresta ficou mais viva e colorida do que nunca!',
    'fim-aventureiro': 'Luna encontrou o tesouro e descobriu que era um portal para mundos mágicos! Sua coragem inabalável a levou a aventuras em lugares que nenhum humano havia visitado antes.',
    'fim-sabio': 'Luna aprendeu o segredo mais profundo da floresta: o verdadeiro tesouro era o conhecimento guardado nos livros do cofre mágico. Com ele, ela ajudou toda a floresta a prosperar.',
  },
  'viagem-espacial': {
    'inicio': 'O astronauta Zito estava explorando o espaço quando seu foguete detectou um planeta desconhecido com sinais de vida inteligente. O que ele deve fazer?',
    'pousar': 'Ao pousar, Zito encontrou criaturas azuis com olhos brilhantes que nunca tinham visto um humano antes. Elas olhavam para ele com curiosidade e estenderam as mãos em sinal de paz.',
    'observar': 'Com seu telescópio de precisão, Zito estudou o planeta por horas. Descobriu que seus habitantes viviam em harmonia com a natureza e possuíam uma tecnologia incrível baseada em energia solar das três luas do planeta.',
    'mensagem': 'Zito configurou o comunicador universal e enviou uma sequência matemática — padrões de números primos que qualquer civilização inteligente poderia reconhecer. Em minutos, recebeu uma resposta amigável com padrões de luz!',
    'fim-explorador': 'Zito se tornou o primeiro humano a fazer contato amigável com extraterrestres! As duas civilizações abriram uma rota de comunicação que mudou para sempre a história da humanidade.',
    'fim-amigo': 'Os alienígenas adoraram o gesto caloroso de Zito e compartilharam em troca sua tecnologia de energia limpa com a humanidade. Um simples gesto de amizade aproximou dois mundos para sempre.',
    'fim-cientista': 'Zito documentou cada detalhe com rigor científico e voltou para a Terra com dados que mudaram para sempre o entendimento da humanidade sobre vida no universo. Sua paciência valeu mais que qualquer pressa.',
  },
}

const tarefasHistoria = []
for (const [storyId, nos] of Object.entries(HISTORIAS_TEXTO)) {
  for (const [noId, texto] of Object.entries(nos)) {
    tarefasHistoria.push({ categoria: `historia-interativa/${storyId}`, arquivo: noId, texto, voice: HISTORIA_VOICE, rate: HISTORIA_RATE })
  }
}

const tarefas = [...tarefasIngles, ...tarefasHistoria]
console.log(`Gerando ${tarefas.length} áudios (Inglês: Ana | História: Francisca)...`)

let ok = 0, falhas = []
for (const t of tarefas) {
  mkdirSync(`public/audio/${t.categoria}`, { recursive: true })
  const destino = `public/audio/${t.categoria}/${t.arquivo}.mp3`
  try {
    gerar(t.voice, t.rate, destino, t.texto)
    ok++
    process.stdout.write(`\r${ok}/${tarefas.length} gerados...`)
  } catch (e) {
    falhas.push(`${t.categoria}/${t.arquivo}: ${e.stderr?.toString() || e.message}`)
  }
}

console.log(`\n\nConcluído: ${ok}/${tarefas.length} áudios gerados.`)
if (falhas.length) {
  console.log(`${falhas.length} falha(s):`)
  falhas.forEach(f => console.log(' - ' + f))
  process.exit(1)
}
