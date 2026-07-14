import { execFileSync } from 'child_process'
import { mkdirSync } from 'fs'

const VOICE = 'pt-BR-FranciscaNeural'
const RATE = '-10%' // um pouco mais devagar, mais fácil pra criança acompanhar

const CORES = [
  { id: 'vermelho', nome: 'Vermelho', exemplo: 'como uma maçã' },
  { id: 'azul',     nome: 'Azul',     exemplo: 'como o céu' },
  { id: 'amarelo',  nome: 'Amarelo',  exemplo: 'como o sol' },
  { id: 'verde',    nome: 'Verde',    exemplo: 'como a folha' },
  { id: 'laranja',  nome: 'Laranja',  exemplo: 'como a laranja' },
  { id: 'roxo',     nome: 'Roxo',     exemplo: 'como a uva' },
  { id: 'rosa',     nome: 'Rosa',     exemplo: 'como a flor' },
  { id: 'marrom',   nome: 'Marrom',   exemplo: 'como o urso' },
  { id: 'preto',    nome: 'Preto',    exemplo: 'como o pinguim' },
  { id: 'branco',   nome: 'Branco',   exemplo: 'como a nuvem' },
]

const FORMAS = [
  { id: 'circulo',   nome: 'Círculo',   frase: 'O círculo é redondo!' },
  { id: 'quadrado',  nome: 'Quadrado',  frase: 'O quadrado tem 4 lados iguais!' },
  { id: 'triangulo', nome: 'Triângulo', frase: 'O triângulo tem 3 pontas!' },
  { id: 'retangulo', nome: 'Retângulo', frase: 'O retângulo é alongado!' },
  { id: 'oval',      nome: 'Oval',      frase: 'A oval parece um ovo!' },
  { id: 'estrela',   nome: 'Estrela',   frase: 'A estrela brilha no céu!' },
  { id: 'losango',   nome: 'Losango',   frase: 'O losango parece uma pipa!' },
  { id: 'hexagono',  nome: 'Hexágono',  frase: 'O hexágono tem 6 lados!' },
]

const NUMEROS = [
  { id: '1',  word: 'Um' },     { id: '2',  word: 'Dois' },
  { id: '3',  word: 'Três' },   { id: '4',  word: 'Quatro' },
  { id: '5',  word: 'Cinco' },  { id: '6',  word: 'Seis' },
  { id: '7',  word: 'Sete' },   { id: '8',  word: 'Oito' },
  { id: '9',  word: 'Nove' },   { id: '10', word: 'Dez' },
]

const ALFABETO = [
  { letra: 'A', palavra: 'Avião' },      { letra: 'B', palavra: 'Bola' },
  { letra: 'C', palavra: 'Casa' },       { letra: 'D', palavra: 'Dado' },
  { letra: 'E', palavra: 'Estrela' },    { letra: 'F', palavra: 'Fogo' },
  { letra: 'G', palavra: 'Gato' },       { letra: 'H', palavra: 'Hipopótamo' },
  { letra: 'I', palavra: 'Iglu' },       { letra: 'J', palavra: 'Janela' },
  { letra: 'K', palavra: 'Koala' },      { letra: 'L', palavra: 'Leão' },
  { letra: 'M', palavra: 'Macaco' },     { letra: 'N', palavra: 'Nuvem' },
  { letra: 'O', palavra: 'Ovo' },        { letra: 'P', palavra: 'Pato' },
  { letra: 'Q', palavra: 'Queijo' },     { letra: 'R', palavra: 'Rato' },
  { letra: 'S', palavra: 'Sol' },        { letra: 'T', palavra: 'Tartaruga' },
  { letra: 'U', palavra: 'Uva' },        { letra: 'V', palavra: 'Vaca' },
  { letra: 'W', palavra: 'Waffle' },     { letra: 'X', palavra: 'Xícara' },
  { letra: 'Y', palavra: 'Iogurte' },    { letra: 'Z', palavra: 'Zebra' },
]

const SILABAS = [
  { id: 'bola', palavra: 'Bola' }, { id: 'casa', palavra: 'Casa' },
  { id: 'sapo', palavra: 'Sapo' }, { id: 'mesa', palavra: 'Mesa' },
  { id: 'pato', palavra: 'Pato' }, { id: 'dedo', palavra: 'Dedo' },
  { id: 'gato', palavra: 'Gato' }, { id: 'bode', palavra: 'Bode' },
  { id: 'boneca',    palavra: 'Boneca' },    { id: 'janela',    palavra: 'Janela' },
  { id: 'cavalo',    palavra: 'Cavalo' },    { id: 'banana',    palavra: 'Banana' },
  { id: 'sorvete',   palavra: 'Sorvete' },   { id: 'cachorro',  palavra: 'Cachorro' },
  { id: 'elefante',  palavra: 'Elefante' },  { id: 'bicicleta', palavra: 'Bicicleta' },
]

const tarefas = [
  ...CORES.map(c => ({ categoria: 'cores', arquivo: c.id, texto: `${c.nome}. ${c.nome}, ${c.exemplo}.` })),
  ...FORMAS.map(f => ({ categoria: 'formas', arquivo: f.id, texto: `${f.nome}. ${f.frase}` })),
  ...NUMEROS.map(n => ({ categoria: 'numeros', arquivo: n.id, texto: n.word })),
  // alfabeto: letra e palavra em arquivos SEPARADOS — tocados em sequência com pausa
  // real via JS (setTimeout), não dá pra confiar em pontuação pra pausa dentro do TTS
  ...ALFABETO.map(l => ({ categoria: 'alfabeto', arquivo: l.letra.toLowerCase(), texto: `${l.letra}.` })),
  ...ALFABETO.map(l => ({ categoria: 'alfabeto', arquivo: `${l.letra.toLowerCase()}-palavra`, texto: `${l.palavra}.` })),
  ...SILABAS.map(s => ({ categoria: 'silabas', arquivo: s.id, texto: s.palavra })),
]

console.log(`Gerando ${tarefas.length} áudios com a voz Francisca (edge-tts)...`)

let ok = 0, falhas = []
for (const t of tarefas) {
  mkdirSync(`public/audio/${t.categoria}`, { recursive: true })
  const destino = `public/audio/${t.categoria}/${t.arquivo}.mp3`
  try {
    execFileSync('python', [
      '-m', 'edge_tts',
      '-t', t.texto,
      '-v', VOICE,
      `--rate=${RATE}`,
      '--write-media', destino,
    ], { stdio: ['ignore', 'ignore', 'pipe'] })
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
