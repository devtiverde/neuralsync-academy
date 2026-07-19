// Atividades de MÚSICA — notas, sons, ritmo e instrumentos, por faixa etária.
// Todo o áudio é sintetizado via Web Audio (osciladores, ver src/lib/sounds.js).
// Nenhum arquivo MP3 é necessário: cada nota traz sua frequência em Hertz.
//
// Contrato de `dados` (data-driven, nada hardcoded no componente):
//   dados = { modo, instrucao, rodadas: [...] }
//
//   modo: 'escuta'     -> toca `som` e a criança escolhe entre `opcoes`
//   modo: 'sequencia'  -> toca `sequencia` de notas e a criança repete tocando
//   modo: 'quiz'       -> pergunta escrita, `opcoes` podem ter `som` opcional
//   modo: 'ritmo'      -> `padrao` de batidas para a criança repetir no tempo
//   modo: 'montar'     -> a criança monta uma melodia com as `notas` disponíveis
//
// Formato de som (sempre opcional, sempre no mesmo formato):
//   som = { freq: Hz, dur: segundos, onda: 'sine'|'triangle'|'square'|'sawtooth',
//           vol: 0..1, freqFinal: Hz (glissando, opcional) }
//   sequencia / padrao / notas = array de { nome, freq, dur, onda?, vol? }
//   Em `padrao` (ritmo) a "nota" pode ser uma pausa: { nome: 'pausa', freq: 0, dur }

// Frequências de referência (4ª oitava, afinação A4 = 440 Hz)
export const NOTAS_HZ = {
  do4: 261.63,
  do4s: 277.18,
  re4: 293.66,
  re4s: 311.13,
  mi4: 329.63,
  fa4: 349.23,
  fa4s: 369.99,
  sol4: 392.0,
  sol4s: 415.3,
  la4: 440.0,
  la4s: 466.16,
  si4: 493.88,
  do5: 523.25,
  re5: 587.33,
  mi5: 659.25,
  fa5: 698.46,
  sol5: 783.99,
  la5: 880.0,
  si5: 987.77,
  do6: 1046.5,
}

export const musicaExtraPorFaixa = {
  // ---------------------------------------------------------------------
  // EXPLORADORES (4-5) — só ouvir e reconhecer. Frases curtas, zero jargão.
  // ---------------------------------------------------------------------
  exploradores: [
    {
      id: 'exp_musica_sons',
      tipo: 'musica',
      titulo: 'Que Som É Esse?',
      descricao: 'Ouça o som e aponte quem fez ele!',
      emoji: '🔔',
      habilidade: 'Escuta',
      xp_reward: 60,
      coins_reward: 60,
      tempo_estimado: 8,
      historinha: 'Os sons saíram para brincar e se esconderam! 🙈 Ouça com atenção e diga quem fez cada som.',
      dados: {
        modo: 'escuta',
        instrucao: 'Toque no botão para ouvir. Depois escolha quem fez o som.',
        rodadas: [
          {
            id: 'grave_agudo_1',
            pergunta: 'Quem fez esse som?',
            som: { freq: 98.0, dur: 0.9, onda: 'sine', vol: 0.35 },
            opcoes: [
              { id: 'urso', texto: 'Urso grandão', emoji: '🐻', correta: true },
              { id: 'passarinho', texto: 'Passarinho', emoji: '🐦', correta: false },
            ],
            dica: 'Som bem fundo, de bicho grande.',
          },
          {
            id: 'grave_agudo_2',
            pergunta: 'Quem fez esse som?',
            som: { freq: 1318.51, dur: 0.5, onda: 'sine', vol: 0.25 },
            opcoes: [
              { id: 'passarinho', texto: 'Passarinho', emoji: '🐦', correta: true },
              { id: 'urso', texto: 'Urso grandão', emoji: '🐻', correta: false },
            ],
            dica: 'Som bem fininho, lá no alto.',
          },
          {
            id: 'sino',
            pergunta: 'Quem fez esse som?',
            som: { freq: 1046.5, dur: 1.2, onda: 'sine', vol: 0.3 },
            opcoes: [
              { id: 'sino', texto: 'Sino', emoji: '🔔', correta: true },
              { id: 'tambor', texto: 'Tambor', emoji: '🥁', correta: false },
            ],
            dica: 'Faz "tim tim" e demora para sumir.',
          },
          {
            id: 'tambor',
            pergunta: 'Quem fez esse som?',
            som: { freq: 110.0, dur: 0.22, onda: 'triangle', vol: 0.4, freqFinal: 55.0 },
            opcoes: [
              { id: 'tambor', texto: 'Tambor', emoji: '🥁', correta: true },
              { id: 'sino', texto: 'Sino', emoji: '🔔', correta: false },
            ],
            dica: 'Faz "tum" e para rapidinho.',
          },
          {
            id: 'apito',
            pergunta: 'Quem fez esse som?',
            som: { freq: 1567.98, dur: 0.6, onda: 'square', vol: 0.16 },
            opcoes: [
              { id: 'apito', texto: 'Apito', emoji: '📣', correta: true },
              { id: 'trovao', texto: 'Trovão', emoji: '⛈️', correta: false },
            ],
            dica: 'Som bem alto e fininho.',
          },
          {
            id: 'trovao',
            pergunta: 'Quem fez esse som?',
            som: { freq: 73.42, dur: 1.4, onda: 'sawtooth', vol: 0.22, freqFinal: 41.2 },
            opcoes: [
              { id: 'trovao', texto: 'Trovão', emoji: '⛈️', correta: true },
              { id: 'apito', texto: 'Apito', emoji: '📣', correta: false },
            ],
            dica: 'Som bem fundo e demorado.',
          },
        ],
      },
    },
    {
      id: 'exp_musica_rapido_lento',
      tipo: 'musica',
      titulo: 'Rápido ou Devagar?',
      descricao: 'Ouça a música e diga se ela corre ou anda devagar.',
      emoji: '🐢',
      habilidade: 'Escuta',
      xp_reward: 65,
      coins_reward: 65,
      tempo_estimado: 8,
      historinha: 'A tartaruga anda bem devagar e o coelho sai correndo! 🐇 Ouça a música e diga quem está andando assim.',
      dados: {
        modo: 'escuta',
        instrucao: 'Ouça as batidas. Elas são rápidas como o coelho ou devagar como a tartaruga?',
        rodadas: [
          {
            id: 'lento_1',
            pergunta: 'Essa música é de quem?',
            sequencia: [
              { nome: 'sol', freq: 392.0, dur: 0.75, onda: 'triangle' },
              { nome: 'sol', freq: 392.0, dur: 0.75, onda: 'triangle' },
              { nome: 'mi', freq: 329.63, dur: 0.75, onda: 'triangle' },
              { nome: 'mi', freq: 329.63, dur: 0.75, onda: 'triangle' },
            ],
            opcoes: [
              { id: 'tartaruga', texto: 'Tartaruga', emoji: '🐢', correta: true },
              { id: 'coelho', texto: 'Coelho', emoji: '🐇', correta: false },
            ],
            dica: 'Cada batida demora bastante.',
          },
          {
            id: 'rapido_1',
            pergunta: 'Essa música é de quem?',
            sequencia: [
              { nome: 'do', freq: 523.25, dur: 0.16, onda: 'triangle' },
              { nome: 'mi', freq: 659.25, dur: 0.16, onda: 'triangle' },
              { nome: 'do', freq: 523.25, dur: 0.16, onda: 'triangle' },
              { nome: 'mi', freq: 659.25, dur: 0.16, onda: 'triangle' },
              { nome: 'sol', freq: 783.99, dur: 0.16, onda: 'triangle' },
              { nome: 'mi', freq: 659.25, dur: 0.16, onda: 'triangle' },
            ],
            opcoes: [
              { id: 'coelho', texto: 'Coelho', emoji: '🐇', correta: true },
              { id: 'tartaruga', texto: 'Tartaruga', emoji: '🐢', correta: false },
            ],
            dica: 'As batidas vêm bem juntinhas.',
          },
          {
            id: 'forte_1',
            pergunta: 'Esse som é forte ou fraquinho?',
            som: { freq: 440.0, dur: 0.8, onda: 'triangle', vol: 0.5 },
            opcoes: [
              { id: 'forte', texto: 'Forte', emoji: '📢', correta: true },
              { id: 'fraco', texto: 'Fraquinho', emoji: '🤫', correta: false },
            ],
            dica: 'Dá até um susto de tão alto!',
          },
          {
            id: 'fraco_1',
            pergunta: 'Esse som é forte ou fraquinho?',
            som: { freq: 440.0, dur: 0.8, onda: 'triangle', vol: 0.07 },
            opcoes: [
              { id: 'fraco', texto: 'Fraquinho', emoji: '🤫', correta: true },
              { id: 'forte', texto: 'Forte', emoji: '📢', correta: false },
            ],
            dica: 'Precisa prestar bem atenção para ouvir.',
          },
          {
            id: 'sobe',
            pergunta: 'O som subiu ou desceu?',
            sequencia: [
              { nome: 'dó', freq: 261.63, dur: 0.3, onda: 'sine' },
              { nome: 'sol', freq: 392.0, dur: 0.3, onda: 'sine' },
              { nome: 'dó', freq: 523.25, dur: 0.4, onda: 'sine' },
            ],
            opcoes: [
              { id: 'subiu', texto: 'Subiu', emoji: '⬆️', correta: true },
              { id: 'desceu', texto: 'Desceu', emoji: '⬇️', correta: false },
            ],
            dica: 'Foi ficando mais fininho, como uma escada para cima.',
          },
          {
            id: 'desce',
            pergunta: 'O som subiu ou desceu?',
            sequencia: [
              { nome: 'dó', freq: 523.25, dur: 0.3, onda: 'sine' },
              { nome: 'sol', freq: 392.0, dur: 0.3, onda: 'sine' },
              { nome: 'dó', freq: 261.63, dur: 0.4, onda: 'sine' },
            ],
            opcoes: [
              { id: 'desceu', texto: 'Desceu', emoji: '⬇️', correta: true },
              { id: 'subiu', texto: 'Subiu', emoji: '⬆️', correta: false },
            ],
            dica: 'Foi ficando mais fundo, como uma escada para baixo.',
          },
        ],
      },
    },
    {
      id: 'exp_musica_eco',
      tipo: 'musica',
      titulo: 'Eco Musical',
      descricao: 'Ouça as notinhas e toque na mesma ordem!',
      emoji: '🎵',
      habilidade: 'Memória',
      xp_reward: 70,
      coins_reward: 70,
      tempo_estimado: 10,
      historinha: 'O eco da montanha adora repetir tudo! 🏔️ Ouça as notinhas coloridas e toque nelas na mesma ordem.',
      dados: {
        modo: 'sequencia',
        instrucao: 'Ouça e depois toque nos botões coloridos na mesma ordem.',
        teclado: [
          { nome: 'dó', freq: 261.63, cor: '#ef4444', emoji: '🔴' },
          { nome: 'mi', freq: 329.63, cor: '#eab308', emoji: '🟡' },
          { nome: 'sol', freq: 392.0, cor: '#22c55e', emoji: '🟢' },
          { nome: 'dó', freq: 523.25, cor: '#3b82f6', emoji: '🔵' },
        ],
        onda: 'triangle',
        duracaoNota: 0.45,
        rodadas: [
          { id: 'eco_1', sequencia: ['dó', 'sol'] },
          { id: 'eco_2', sequencia: ['mi', 'dó'] },
          { id: 'eco_3', sequencia: ['dó', 'mi', 'sol'] },
          { id: 'eco_4', sequencia: ['sol', 'mi', 'dó'] },
          { id: 'eco_5', sequencia: ['dó', 'sol', 'mi', 'dó'] },
        ],
      },
    },
  ],

  // ---------------------------------------------------------------------
  // CONSTRUTORES (6-8) — as 7 notas, ritmo simples, famílias de instrumentos.
  // ---------------------------------------------------------------------
  construtores: [
    {
      id: 'con_musica_notas',
      tipo: 'musica',
      titulo: 'As Sete Notas',
      descricao: 'Conheça dó, ré, mi, fá, sol, lá e si!',
      emoji: '🎹',
      habilidade: 'Música',
      xp_reward: 80,
      coins_reward: 80,
      tempo_estimado: 12,
      historinha: 'As sete notas moram numa escada mágica. 🎹 Cada degrau tem um som diferente. Suba com elas e aprenda o nome de cada uma!',
      dados: {
        modo: 'escuta',
        instrucao: 'Ouça a nota e escolha o nome certo. Você pode ouvir quantas vezes quiser.',
        escada: [
          { nome: 'dó', freq: 261.63, grau: 1, cor: '#ef4444' },
          { nome: 'ré', freq: 293.66, grau: 2, cor: '#f97316' },
          { nome: 'mi', freq: 329.63, grau: 3, cor: '#eab308' },
          { nome: 'fá', freq: 349.23, grau: 4, cor: '#22c55e' },
          { nome: 'sol', freq: 392.0, grau: 5, cor: '#06b6d4' },
          { nome: 'lá', freq: 440.0, grau: 6, cor: '#3b82f6' },
          { nome: 'si', freq: 493.88, grau: 7, cor: '#a855f7' },
        ],
        onda: 'triangle',
        rodadas: [
          {
            id: 'nota_do',
            pergunta: 'Qual é essa nota?',
            som: { freq: 261.63, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'do', texto: 'dó', correta: true, som: { freq: 261.63, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'sol', texto: 'sol', correta: false, som: { freq: 392.0, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'si', texto: 'si', correta: false, som: { freq: 493.88, dur: 0.6, onda: 'triangle', vol: 0.3 } },
            ],
            dica: 'É a primeira nota da escada, a mais grave de todas.',
          },
          {
            id: 'nota_sol',
            pergunta: 'Qual é essa nota?',
            som: { freq: 392.0, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'sol', texto: 'sol', correta: true, som: { freq: 392.0, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 're', texto: 'ré', correta: false, som: { freq: 293.66, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'do', texto: 'dó', correta: false, som: { freq: 261.63, dur: 0.6, onda: 'triangle', vol: 0.3 } },
            ],
            dica: 'É o quinto degrau da escada.',
          },
          {
            id: 'nota_mi',
            pergunta: 'Qual é essa nota?',
            som: { freq: 329.63, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'mi', texto: 'mi', correta: true, som: { freq: 329.63, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'la', texto: 'lá', correta: false, som: { freq: 440.0, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'fa', texto: 'fá', correta: false, som: { freq: 349.23, dur: 0.6, onda: 'triangle', vol: 0.3 } },
            ],
            dica: 'É o terceiro degrau da escada.',
          },
          {
            id: 'nota_la',
            pergunta: 'Qual é essa nota?',
            som: { freq: 440.0, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'la', texto: 'lá', correta: true, som: { freq: 440.0, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'mi', texto: 'mi', correta: false, som: { freq: 329.63, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'si', texto: 'si', correta: false, som: { freq: 493.88, dur: 0.6, onda: 'triangle', vol: 0.3 } },
            ],
            dica: 'É a nota que os músicos usam para afinar os instrumentos.',
          },
          {
            id: 'ordem_1',
            pergunta: 'Qual nota vem depois do ré?',
            som: { freq: 293.66, dur: 0.7, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'mi', texto: 'mi', correta: true, som: { freq: 329.63, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'do', texto: 'dó', correta: false, som: { freq: 261.63, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'sol', texto: 'sol', correta: false, som: { freq: 392.0, dur: 0.6, onda: 'triangle', vol: 0.3 } },
            ],
            dica: 'dó, ré, ... qual vem agora?',
          },
          {
            id: 'ordem_2',
            pergunta: 'Qual nota vem antes do sol?',
            som: { freq: 392.0, dur: 0.7, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'fa', texto: 'fá', correta: true, som: { freq: 349.23, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'la', texto: 'lá', correta: false, som: { freq: 440.0, dur: 0.6, onda: 'triangle', vol: 0.3 } },
              { id: 'mi', texto: 'mi', correta: false, som: { freq: 329.63, dur: 0.6, onda: 'triangle', vol: 0.3 } },
            ],
            dica: 'dó, ré, mi, ..., sol.',
          },
        ],
      },
    },
    {
      id: 'con_musica_ritmo',
      tipo: 'musica',
      titulo: 'Palma no Ritmo',
      descricao: 'Repita as batidas na hora certa!',
      emoji: '👏',
      habilidade: 'Ritmo',
      xp_reward: 80,
      coins_reward: 80,
      tempo_estimado: 10,
      historinha: 'A banda da escola vai tocar hoje! 🥁 Escute o tambor e repita as batidas do mesmo jeito, sem atrasar.',
      dados: {
        modo: 'ritmo',
        instrucao: 'Ouça o ritmo e toque no tambor repetindo as batidas.',
        bpm: 90,
        som: { freq: 196.0, dur: 0.18, onda: 'triangle', vol: 0.4, freqFinal: 98.0 },
        rodadas: [
          {
            id: 'ritmo_1',
            nome: 'Bem devagar',
            padrao: [
              { nome: 'batida', tempos: 1 },
              { nome: 'batida', tempos: 1 },
              { nome: 'batida', tempos: 1 },
              { nome: 'batida', tempos: 1 },
            ],
          },
          {
            id: 'ritmo_2',
            nome: 'Bate e espera',
            padrao: [
              { nome: 'batida', tempos: 1 },
              { nome: 'pausa', tempos: 1 },
              { nome: 'batida', tempos: 1 },
              { nome: 'pausa', tempos: 1 },
            ],
          },
          {
            id: 'ritmo_3',
            nome: 'Duas juntas',
            padrao: [
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 1 },
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 1 },
            ],
          },
          {
            id: 'ritmo_4',
            nome: 'Trenzinho',
            padrao: [
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 0.5 },
              { nome: 'pausa', tempos: 1 },
              { nome: 'batida', tempos: 1 },
            ],
          },
          {
            id: 'ritmo_5',
            nome: 'Coração batendo',
            padrao: [
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 1.5 },
              { nome: 'batida', tempos: 0.5 },
              { nome: 'batida', tempos: 1.5 },
            ],
          },
        ],
      },
    },
    {
      id: 'con_musica_instrumentos',
      tipo: 'musica',
      titulo: 'Famílias de Instrumentos',
      descricao: 'Sopra, bate ou puxa a corda? Descubra!',
      emoji: '🎻',
      habilidade: 'Música',
      xp_reward: 80,
      coins_reward: 80,
      tempo_estimado: 10,
      historinha: 'Na orquestra os instrumentos moram em famílias. 🎺 Uns a gente sopra, outros a gente bate e outros têm cordas. Descubra a família de cada um!',
      dados: {
        modo: 'quiz',
        instrucao: 'Escolha a família de cada instrumento.',
        familias: [
          { id: 'sopro', nome: 'Sopro', emoji: '🎺', explicacao: 'A gente sopra dentro para fazer som.' },
          { id: 'corda', nome: 'Cordas', emoji: '🎻', explicacao: 'A gente puxa ou passa o arco nas cordas.' },
          { id: 'percussao', nome: 'Percussão', emoji: '🥁', explicacao: 'A gente bate para fazer som.' },
          { id: 'teclas', nome: 'Teclas', emoji: '🎹', explicacao: 'A gente aperta as teclas.' },
        ],
        rodadas: [
          {
            id: 'violao',
            pergunta: 'De que família é o violão?',
            emoji: '🎸',
            som: { freq: 329.63, dur: 1.0, onda: 'sawtooth', vol: 0.16 },
            opcoes: [
              { id: 'corda', texto: 'Cordas', emoji: '🎻', correta: true },
              { id: 'sopro', texto: 'Sopro', emoji: '🎺', correta: false },
              { id: 'percussao', texto: 'Percussão', emoji: '🥁', correta: false },
            ],
            dica: 'Você puxa os fios dele com os dedos.',
          },
          {
            id: 'flauta',
            pergunta: 'De que família é a flauta?',
            emoji: '🪈',
            som: { freq: 783.99, dur: 0.9, onda: 'sine', vol: 0.26 },
            opcoes: [
              { id: 'sopro', texto: 'Sopro', emoji: '🎺', correta: true },
              { id: 'corda', texto: 'Cordas', emoji: '🎻', correta: false },
              { id: 'teclas', texto: 'Teclas', emoji: '🎹', correta: false },
            ],
            dica: 'Você enche o peito de ar e sopra.',
          },
          {
            id: 'tambor',
            pergunta: 'De que família é o tambor?',
            emoji: '🥁',
            som: { freq: 146.83, dur: 0.2, onda: 'triangle', vol: 0.42, freqFinal: 73.42 },
            opcoes: [
              { id: 'percussao', texto: 'Percussão', emoji: '🥁', correta: true },
              { id: 'sopro', texto: 'Sopro', emoji: '🎺', correta: false },
              { id: 'corda', texto: 'Cordas', emoji: '🎻', correta: false },
            ],
            dica: 'Você bate nele com as mãos ou com baquetas.',
          },
          {
            id: 'piano',
            pergunta: 'De que família é o piano?',
            emoji: '🎹',
            som: { freq: 523.25, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'teclas', texto: 'Teclas', emoji: '🎹', correta: true },
              { id: 'sopro', texto: 'Sopro', emoji: '🎺', correta: false },
              { id: 'percussao', texto: 'Percussão', emoji: '🥁', correta: false },
            ],
            dica: 'Você aperta as teclas pretas e brancas.',
          },
          {
            id: 'trompete',
            pergunta: 'De que família é o trompete?',
            emoji: '🎺',
            som: { freq: 466.16, dur: 0.9, onda: 'square', vol: 0.13 },
            opcoes: [
              { id: 'sopro', texto: 'Sopro', emoji: '🎺', correta: true },
              { id: 'percussao', texto: 'Percussão', emoji: '🥁', correta: false },
              { id: 'corda', texto: 'Cordas', emoji: '🎻', correta: false },
            ],
            dica: 'Ele é dourado e você sopra bem forte nele.',
          },
          {
            id: 'violino',
            pergunta: 'De que família é o violino?',
            emoji: '🎻',
            som: { freq: 659.25, dur: 1.1, onda: 'sawtooth', vol: 0.14 },
            opcoes: [
              { id: 'corda', texto: 'Cordas', emoji: '🎻', correta: true },
              { id: 'teclas', texto: 'Teclas', emoji: '🎹', correta: false },
              { id: 'sopro', texto: 'Sopro', emoji: '🎺', correta: false },
            ],
            dica: 'Ele é pequeno, fica no ombro e usa um arco.',
          },
        ],
      },
    },
  ],

  // ---------------------------------------------------------------------
  // CRIADORES (9-11) — pauta, clave de sol, figuras rítmicas, escala maior.
  // ---------------------------------------------------------------------
  criadores: [
    {
      id: 'cri_musica_pauta',
      tipo: 'musica',
      titulo: 'A Pauta e a Clave de Sol',
      descricao: 'Leia as notas nas cinco linhas do pentagrama.',
      emoji: '🎼',
      habilidade: 'Música',
      xp_reward: 100,
      coins_reward: 100,
      tempo_estimado: 14,
      historinha: 'A música tem sua própria escrita: o pentagrama, com cinco linhas e quatro espaços. 🎼 A clave de sol diz em qual linha mora o sol. Aprenda a ler cada nota na posição certa.',
      dados: {
        modo: 'quiz',
        instrucao: 'Veja a posição da nota no pentagrama e identifique qual é.',
        pauta: {
          clave: 'sol',
          linhas: 5,
          // posicao: 1 = primeira linha (embaixo), 1.5 = primeiro espaço, e assim por diante.
          // posicao 0.5 = primeira linha suplementar inferior (dó central).
          referencia: [
            { nome: 'dó', oitava: 4, freq: 261.63, posicao: 0.5, suplementar: true },
            { nome: 'ré', oitava: 4, freq: 293.66, posicao: 1.0 },
            { nome: 'mi', oitava: 4, freq: 329.63, posicao: 1.5 },
            { nome: 'fá', oitava: 4, freq: 349.23, posicao: 2.0 },
            { nome: 'sol', oitava: 4, freq: 392.0, posicao: 2.5 },
            { nome: 'lá', oitava: 4, freq: 440.0, posicao: 3.0 },
            { nome: 'si', oitava: 4, freq: 493.88, posicao: 3.5 },
            { nome: 'dó', oitava: 5, freq: 523.25, posicao: 4.0 },
            { nome: 'ré', oitava: 5, freq: 587.33, posicao: 4.5 },
            { nome: 'mi', oitava: 5, freq: 659.25, posicao: 5.0 },
            { nome: 'fá', oitava: 5, freq: 698.46, posicao: 5.5 },
          ],
        },
        rodadas: [
          {
            id: 'pauta_sol',
            pergunta: 'Qual nota está escrita na pauta?',
            nota: { nome: 'sol', oitava: 4, freq: 392.0, posicao: 2.5 },
            som: { freq: 392.0, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'sol', texto: 'sol', correta: true },
              { id: 'mi', texto: 'mi', correta: false },
              { id: 'si', texto: 'si', correta: false },
              { id: 're', texto: 'ré', correta: false },
            ],
            dica: 'A clave de sol enrola exatamente nessa linha.',
          },
          {
            id: 'pauta_mi',
            pergunta: 'Qual nota está escrita na pauta?',
            nota: { nome: 'mi', oitava: 4, freq: 329.63, posicao: 1.5 },
            som: { freq: 329.63, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'mi', texto: 'mi', correta: true },
              { id: 'fa', texto: 'fá', correta: false },
              { id: 'do', texto: 'dó', correta: false },
              { id: 'la', texto: 'lá', correta: false },
            ],
            dica: 'Está no primeiro espaço, logo acima da primeira linha.',
          },
          {
            id: 'pauta_si',
            pergunta: 'Qual nota está escrita na pauta?',
            nota: { nome: 'si', oitava: 4, freq: 493.88, posicao: 3.5 },
            som: { freq: 493.88, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'si', texto: 'si', correta: true },
              { id: 'la', texto: 'lá', correta: false },
              { id: 'do', texto: 'dó', correta: false },
              { id: 'sol', texto: 'sol', correta: false },
            ],
            dica: 'Está bem no meio do pentagrama, na terceira linha.',
          },
          {
            id: 'pauta_do_central',
            pergunta: 'Qual nota está escrita na pauta?',
            nota: { nome: 'dó', oitava: 4, freq: 261.63, posicao: 0.5, suplementar: true },
            som: { freq: 261.63, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'do', texto: 'dó', correta: true },
              { id: 're', texto: 'ré', correta: false },
              { id: 'mi', texto: 'mi', correta: false },
              { id: 'fa', texto: 'fá', correta: false },
            ],
            dica: 'Fica abaixo do pentagrama, com uma linha extra cortando a cabeça da nota.',
          },
          {
            id: 'pauta_fa',
            pergunta: 'Qual nota está escrita na pauta?',
            nota: { nome: 'fá', oitava: 4, freq: 349.23, posicao: 2.0 },
            som: { freq: 349.23, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'fa', texto: 'fá', correta: true },
              { id: 'sol', texto: 'sol', correta: false },
              { id: 'mi', texto: 'mi', correta: false },
              { id: 'do', texto: 'dó', correta: false },
            ],
            dica: 'Está na segunda linha, logo abaixo do sol.',
          },
          {
            id: 'pauta_do5',
            pergunta: 'Qual nota está escrita na pauta?',
            nota: { nome: 'dó', oitava: 5, freq: 523.25, posicao: 4.0 },
            som: { freq: 523.25, dur: 0.8, onda: 'triangle', vol: 0.3 },
            opcoes: [
              { id: 'do', texto: 'dó', correta: true },
              { id: 'si', texto: 'si', correta: false },
              { id: 're', texto: 'ré', correta: false },
              { id: 'la', texto: 'lá', correta: false },
            ],
            dica: 'É a terceira linha suplementar acima do dó central: uma oitava mais agudo.',
          },
        ],
      },
    },
    {
      id: 'cri_musica_figuras',
      tipo: 'musica',
      titulo: 'Figuras Rítmicas',
      descricao: 'Semibreve, mínima, semínima: quanto tempo cada uma dura?',
      emoji: '🎶',
      habilidade: 'Ritmo',
      xp_reward: 100,
      coins_reward: 100,
      tempo_estimado: 12,
      historinha: 'Cada figura musical vale um número de tempos. ⏱️ A semibreve é a mais longa e vale 4; as outras são pedaços dela. Descubra o valor de cada uma e monte compassos completos.',
      dados: {
        modo: 'quiz',
        instrucao: 'Relacione cada figura com a duração dela em tempos.',
        bpm: 80,
        somPadrao: { freq: 392.0, dur: 0.5, onda: 'triangle', vol: 0.3 },
        figuras: [
          { id: 'semibreve', nome: 'Semibreve', simbolo: '𝅝', tempos: 4, descricao: 'Vale 4 tempos.' },
          { id: 'minima', nome: 'Mínima', simbolo: '𝅗𝅥', tempos: 2, descricao: 'Vale 2 tempos: metade da semibreve.' },
          { id: 'seminima', nome: 'Semínima', simbolo: '♩', tempos: 1, descricao: 'Vale 1 tempo.' },
          { id: 'colcheia', nome: 'Colcheia', simbolo: '♪', tempos: 0.5, descricao: 'Vale meio tempo.' },
        ],
        rodadas: [
          {
            id: 'fig_semibreve',
            pergunta: 'Quantos tempos vale a semibreve?',
            figura: 'semibreve',
            opcoes: [
              { id: '4', texto: '4 tempos', correta: true },
              { id: '2', texto: '2 tempos', correta: false },
              { id: '1', texto: '1 tempo', correta: false },
            ],
            dica: 'É a figura mais longa que estudamos: preenche um compasso 4/4 sozinha.',
          },
          {
            id: 'fig_minima',
            pergunta: 'Quantos tempos vale a mínima?',
            figura: 'minima',
            opcoes: [
              { id: '2', texto: '2 tempos', correta: true },
              { id: '4', texto: '4 tempos', correta: false },
              { id: '0.5', texto: 'Meio tempo', correta: false },
            ],
            dica: 'Cabem duas mínimas dentro de uma semibreve.',
          },
          {
            id: 'fig_seminima',
            pergunta: 'Quantas semínimas cabem em uma semibreve?',
            figura: 'seminima',
            opcoes: [
              { id: '4', texto: '4', correta: true },
              { id: '2', texto: '2', correta: false },
              { id: '8', texto: '8', correta: false },
            ],
            dica: 'A semínima vale 1 tempo e a semibreve vale 4.',
          },
          {
            id: 'fig_colcheia',
            pergunta: 'Quantas colcheias cabem em uma semínima?',
            figura: 'colcheia',
            opcoes: [
              { id: '2', texto: '2', correta: true },
              { id: '4', texto: '4', correta: false },
              { id: '3', texto: '3', correta: false },
            ],
            dica: 'A colcheia vale meio tempo.',
          },
          {
            id: 'compasso_1',
            pergunta: 'Qual figura completa este compasso 4/4?',
            compasso: { formula: '4/4', figuras: ['minima', 'seminima'] },
            opcoes: [
              { id: 'seminima', texto: 'Semínima', correta: true },
              { id: 'minima', texto: 'Mínima', correta: false },
              { id: 'semibreve', texto: 'Semibreve', correta: false },
            ],
            dica: '2 + 1 = 3. Falta apenas 1 tempo.',
          },
          {
            id: 'compasso_2',
            pergunta: 'Qual figura completa este compasso 4/4?',
            compasso: { formula: '4/4', figuras: ['seminima', 'seminima'] },
            opcoes: [
              { id: 'minima', texto: 'Mínima', correta: true },
              { id: 'seminima', texto: 'Semínima', correta: false },
              { id: 'colcheia', texto: 'Colcheia', correta: false },
            ],
            dica: '1 + 1 = 2. Faltam 2 tempos.',
          },
        ],
      },
    },
    {
      id: 'cri_musica_escala',
      tipo: 'musica',
      titulo: 'Escala Maior de Dó',
      descricao: 'Monte a escala e toque uma melodia sua.',
      emoji: '🎹',
      habilidade: 'Música',
      xp_reward: 100,
      coins_reward: 100,
      tempo_estimado: 14,
      historinha: 'A escala maior é a régua da música: sete notas em ordem, com uma distância exata entre elas. 🎹 Monte a escala de dó maior e depois componha sua própria melodia com ela.',
      dados: {
        modo: 'montar',
        instrucao: 'Coloque as notas na ordem da escala e depois crie sua melodia.',
        escala: {
          nome: 'Dó maior',
          tonica: 'dó',
          // T = tom inteiro, S = semitom. Padrão da escala maior: T T S T T T S
          formula: ['T', 'T', 'S', 'T', 'T', 'T', 'S'],
          graus: [
            { grau: 1, nome: 'dó', freq: 261.63 },
            { grau: 2, nome: 'ré', freq: 293.66 },
            { grau: 3, nome: 'mi', freq: 329.63 },
            { grau: 4, nome: 'fá', freq: 349.23 },
            { grau: 5, nome: 'sol', freq: 392.0 },
            { grau: 6, nome: 'lá', freq: 440.0 },
            { grau: 7, nome: 'si', freq: 493.88 },
            { grau: 8, nome: 'dó', freq: 523.25 },
          ],
        },
        onda: 'triangle',
        duracaoNota: 0.4,
        rodadas: [
          {
            id: 'escala_ordem',
            tarefa: 'ordenar',
            enunciado: 'Coloque as notas na ordem da escala de dó maior, do grave ao agudo.',
            embaralhadas: ['sol', 'dó', 'si', 'mi', 'ré', 'lá', 'fá'],
            resposta: ['dó', 'ré', 'mi', 'fá', 'sol', 'lá', 'si'],
          },
          {
            id: 'escala_semitom',
            tarefa: 'apontar',
            enunciado: 'Entre quais notas da escala existe um semitom (a menor distância)?',
            opcoes: [
              { id: 'mi_fa', texto: 'mi e fá', correta: true },
              { id: 'do_re', texto: 'dó e ré', correta: false },
              { id: 'sol_la', texto: 'sol e lá', correta: false },
            ],
            dica: 'No piano, entre essas duas teclas brancas não existe tecla preta.',
          },
          {
            id: 'melodia_copiar',
            tarefa: 'reproduzir',
            enunciado: 'Ouça a melodia e monte ela com as notas da escala.',
            sequencia: [
              { nome: 'dó', freq: 261.63, tempos: 1 },
              { nome: 'mi', freq: 329.63, tempos: 1 },
              { nome: 'sol', freq: 392.0, tempos: 1 },
              { nome: 'mi', freq: 329.63, tempos: 1 },
              { nome: 'dó', freq: 261.63, tempos: 2 },
            ],
          },
          {
            id: 'melodia_livre',
            tarefa: 'compor',
            enunciado: 'Agora é sua vez: monte uma melodia de 8 notas usando a escala de dó maior.',
            minimoNotas: 8,
            maximoNotas: 16,
            sugestao: 'Melodias costumam soar bem quando começam e terminam no dó.',
          },
        ],
      },
    },
  ],

  // ---------------------------------------------------------------------
  // INVENTORES (12+) — intervalos, acordes, tonalidade, física do som.
  // ---------------------------------------------------------------------
  inventores: [
    {
      id: 'inv_musica_intervalos',
      tipo: 'musica',
      titulo: 'Intervalos e Acordes',
      descricao: 'Reconheça terças, quintas e a diferença entre maior e menor.',
      emoji: '🎼',
      habilidade: 'Música',
      xp_reward: 120,
      coins_reward: 120,
      tempo_estimado: 16,
      historinha: 'Um intervalo é a distância entre duas notas, e é ele que define o clima da música. 🎼 Uma terça maior soa alegre; uma terça menor soa melancólica. Treine seu ouvido para identificar cada uma.',
      dados: {
        modo: 'escuta',
        instrucao: 'Ouça o intervalo ou acorde e identifique qual é. As notas podem ser tocadas juntas ou uma após a outra.',
        referencia: [
          { id: 'segunda_maior', nome: 'Segunda maior', semitons: 2, exemplo: ['dó', 'ré'] },
          { id: 'terca_menor', nome: 'Terça menor', semitons: 3, exemplo: ['dó', 'mi bemol'] },
          { id: 'terca_maior', nome: 'Terça maior', semitons: 4, exemplo: ['dó', 'mi'] },
          { id: 'quarta_justa', nome: 'Quarta justa', semitons: 5, exemplo: ['dó', 'fá'] },
          { id: 'quinta_justa', nome: 'Quinta justa', semitons: 7, exemplo: ['dó', 'sol'] },
          { id: 'oitava', nome: 'Oitava', semitons: 12, exemplo: ['dó4', 'dó5'] },
        ],
        onda: 'triangle',
        rodadas: [
          {
            id: 'int_quinta',
            pergunta: 'Que intervalo é este?',
            notas: [
              { nome: 'dó', freq: 261.63 },
              { nome: 'sol', freq: 392.0 },
            ],
            simultaneo: false,
            duracaoNota: 0.7,
            opcoes: [
              { id: 'quinta_justa', texto: 'Quinta justa', correta: true },
              { id: 'terca_maior', texto: 'Terça maior', correta: false },
              { id: 'oitava', texto: 'Oitava', correta: false },
            ],
            dica: 'São 7 semitons. É o intervalo que abre o tema de "Guerra nas Estrelas".',
          },
          {
            id: 'int_terca_maior',
            pergunta: 'Que intervalo é este?',
            notas: [
              { nome: 'dó', freq: 261.63 },
              { nome: 'mi', freq: 329.63 },
            ],
            simultaneo: false,
            duracaoNota: 0.7,
            opcoes: [
              { id: 'terca_maior', texto: 'Terça maior', correta: true },
              { id: 'terca_menor', texto: 'Terça menor', correta: false },
              { id: 'quarta_justa', texto: 'Quarta justa', correta: false },
            ],
            dica: '4 semitons. Soa aberto e alegre.',
          },
          {
            id: 'int_terca_menor',
            pergunta: 'Que intervalo é este?',
            notas: [
              { nome: 'dó', freq: 261.63 },
              { nome: 'mi bemol', freq: 311.13 },
            ],
            simultaneo: false,
            duracaoNota: 0.7,
            opcoes: [
              { id: 'terca_menor', texto: 'Terça menor', correta: true },
              { id: 'terca_maior', texto: 'Terça maior', correta: false },
              { id: 'segunda_maior', texto: 'Segunda maior', correta: false },
            ],
            dica: '3 semitons: um semitom mais estreito que a terça maior, e por isso soa mais triste.',
          },
          {
            id: 'acorde_maior',
            pergunta: 'Este acorde é maior ou menor?',
            notas: [
              { nome: 'dó', freq: 261.63 },
              { nome: 'mi', freq: 329.63 },
              { nome: 'sol', freq: 392.0 },
            ],
            simultaneo: true,
            duracaoNota: 1.4,
            opcoes: [
              { id: 'maior', texto: 'Dó maior', correta: true },
              { id: 'menor', texto: 'Dó menor', correta: false },
            ],
            dica: 'A distância da tônica até a nota do meio é de 4 semitons.',
          },
          {
            id: 'acorde_menor',
            pergunta: 'Este acorde é maior ou menor?',
            notas: [
              { nome: 'dó', freq: 261.63 },
              { nome: 'mi bemol', freq: 311.13 },
              { nome: 'sol', freq: 392.0 },
            ],
            simultaneo: true,
            duracaoNota: 1.4,
            opcoes: [
              { id: 'menor', texto: 'Dó menor', correta: true },
              { id: 'maior', texto: 'Dó maior', correta: false },
            ],
            dica: 'A nota do meio desceu meio tom em relação ao acorde maior.',
          },
          {
            id: 'acorde_sol',
            pergunta: 'Qual acorde é este?',
            notas: [
              { nome: 'sol', freq: 392.0 },
              { nome: 'si', freq: 493.88 },
              { nome: 'ré', freq: 587.33 },
            ],
            simultaneo: true,
            duracaoNota: 1.4,
            opcoes: [
              { id: 'sol_maior', texto: 'Sol maior', correta: true },
              { id: 'sol_menor', texto: 'Sol menor', correta: false },
              { id: 'la_menor', texto: 'Lá menor', correta: false },
            ],
            dica: 'A nota mais grave é a tônica: sol. E o intervalo até o si é de 4 semitons.',
          },
        ],
      },
    },
    {
      id: 'inv_musica_tonalidade',
      tipo: 'musica',
      titulo: 'Tonalidade e Graus',
      descricao: 'Tônica, dominante e o campo harmônico de uma tonalidade.',
      emoji: '🗝️',
      habilidade: 'Música',
      xp_reward: 120,
      coins_reward: 120,
      tempo_estimado: 15,
      historinha: 'Toda música tem um centro de gravidade: a tônica. 🗝️ Os outros acordes giram em volta dela e criam tensão ou repouso. Entenda como um campo harmônico funciona e por que certas sequências soam "resolvidas".',
      dados: {
        modo: 'quiz',
        instrucao: 'Responda sobre tonalidade e ouça os exemplos quando quiser.',
        campoHarmonico: {
          tonalidade: 'Dó maior',
          graus: [
            { grau: 'I', acorde: 'Dó maior', qualidade: 'maior', freqs: [261.63, 329.63, 392.0], funcao: 'Tônica: repouso.' },
            { grau: 'ii', acorde: 'Ré menor', qualidade: 'menor', freqs: [293.66, 349.23, 440.0], funcao: 'Subdominante: prepara.' },
            { grau: 'iii', acorde: 'Mi menor', qualidade: 'menor', freqs: [329.63, 392.0, 493.88], funcao: 'Tônica: repouso suave.' },
            { grau: 'IV', acorde: 'Fá maior', qualidade: 'maior', freqs: [349.23, 440.0, 523.25], funcao: 'Subdominante: afasta da tônica.' },
            { grau: 'V', acorde: 'Sol maior', qualidade: 'maior', freqs: [392.0, 493.88, 587.33], funcao: 'Dominante: cria tensão.' },
            { grau: 'vi', acorde: 'Lá menor', qualidade: 'menor', freqs: [440.0, 523.25, 659.25], funcao: 'Tônica relativa menor.' },
            { grau: 'vii°', acorde: 'Si diminuto', qualidade: 'diminuto', freqs: [493.88, 587.33, 698.46], funcao: 'Dominante: muita tensão.' },
          ],
        },
        rodadas: [
          {
            id: 'ton_tonica',
            pergunta: 'Em dó maior, qual acorde é a tônica?',
            opcoes: [
              { id: 'I', texto: 'Dó maior (I)', correta: true },
              { id: 'V', texto: 'Sol maior (V)', correta: false },
              { id: 'IV', texto: 'Fá maior (IV)', correta: false },
            ],
            dica: 'É o acorde construído sobre a primeira nota da escala.',
          },
          {
            id: 'ton_dominante',
            pergunta: 'Qual acorde é a dominante de dó maior?',
            opcoes: [
              { id: 'V', texto: 'Sol maior (V)', correta: true },
              { id: 'ii', texto: 'Ré menor (ii)', correta: false },
              { id: 'vi', texto: 'Lá menor (vi)', correta: false },
            ],
            dica: 'Fica no quinto grau da escala e puxa de volta para a tônica.',
          },
          {
            id: 'ton_relativa',
            pergunta: 'Qual é a tonalidade relativa menor de dó maior?',
            opcoes: [
              { id: 'lam', texto: 'Lá menor', correta: true },
              { id: 'rem', texto: 'Ré menor', correta: false },
              { id: 'mim', texto: 'Mi menor', correta: false },
            ],
            dica: 'Fica no sexto grau e usa exatamente as mesmas notas de dó maior.',
          },
          {
            id: 'ton_cadencia',
            pergunta: 'Ouça a sequência. Ela termina resolvida ou suspensa?',
            sequencia: [
              { acorde: 'Dó maior', freqs: [261.63, 329.63, 392.0], tempos: 2 },
              { acorde: 'Fá maior', freqs: [349.23, 440.0, 523.25], tempos: 2 },
              { acorde: 'Sol maior', freqs: [392.0, 493.88, 587.33], tempos: 2 },
              { acorde: 'Dó maior', freqs: [261.63, 329.63, 392.0], tempos: 4 },
            ],
            opcoes: [
              { id: 'resolvida', texto: 'Resolvida: volta à tônica', correta: true },
              { id: 'suspensa', texto: 'Suspensa: para na tensão', correta: false },
            ],
            dica: 'Repare no último acorde: é o mesmo do começo (I–IV–V–I).',
          },
          {
            id: 'ton_armadura',
            pergunta: 'A tonalidade de sol maior tem qual alteração na armadura de clave?',
            opcoes: [
              { id: 'fa_sust', texto: 'Um sustenido: fá#', correta: true },
              { id: 'nenhuma', texto: 'Nenhuma alteração', correta: false },
              { id: 'si_bemol', texto: 'Um bemol: si♭', correta: false },
            ],
            dica: 'Para manter o padrão T-T-S-T-T-T-S a partir do sol, a sétima nota precisa subir meio tom.',
          },
        ],
      },
    },
    {
      id: 'inv_musica_fisica',
      tipo: 'musica',
      titulo: 'A Física do Som',
      descricao: 'Frequência, oitavas e a série harmônica por trás do timbre.',
      emoji: '🔬',
      habilidade: 'Ciências',
      xp_reward: 120,
      coins_reward: 120,
      tempo_estimado: 16,
      historinha: 'Som é vibração viajando pelo ar. 🔬 A frequência em Hertz define se a nota é grave ou aguda, e os harmônicos que acompanham cada nota explicam por que um violino e uma flauta na mesma nota soam tão diferentes.',
      dados: {
        modo: 'quiz',
        instrucao: 'Explore os exemplos sonoros e responda.',
        laboratorio: {
          notaBase: { nome: 'lá', oitava: 4, freq: 440.0 },
          harmonicos: [
            { ordem: 1, freq: 440.0, rotulo: 'Fundamental (lá4)' },
            { ordem: 2, freq: 880.0, rotulo: '2º harmônico: uma oitava acima' },
            { ordem: 3, freq: 1320.0, rotulo: '3º harmônico: oitava + quinta' },
            { ordem: 4, freq: 1760.0, rotulo: '4º harmônico: duas oitavas' },
            { ordem: 5, freq: 2200.0, rotulo: '5º harmônico: terça maior acima' },
          ],
          ondas: [
            { id: 'sine', nome: 'Senoidal', descricao: 'Só a fundamental. Som puro, parecido com uma flauta suave.' },
            { id: 'triangle', nome: 'Triangular', descricao: 'Poucos harmônicos ímpares. Som doce.' },
            { id: 'square', nome: 'Quadrada', descricao: 'Harmônicos ímpares fortes. Som de videogame antigo.' },
            { id: 'sawtooth', nome: 'Dente de serra', descricao: 'Todos os harmônicos. Som áspero, tipo violino elétrico.' },
          ],
        },
        rodadas: [
          {
            id: 'fis_oitava',
            pergunta: 'O lá4 vibra a 440 Hz. Qual é a frequência do lá uma oitava acima?',
            notas: [
              { nome: 'lá4', freq: 440.0 },
              { nome: 'lá5', freq: 880.0 },
            ],
            opcoes: [
              { id: '880', texto: '880 Hz', correta: true },
              { id: '660', texto: '660 Hz', correta: false },
              { id: '440', texto: '440 Hz', correta: false },
            ],
            dica: 'Subir uma oitava é dobrar a frequência.',
          },
          {
            id: 'fis_grave',
            pergunta: 'Uma nota de 110 Hz comparada a uma de 880 Hz é...',
            notas: [
              { nome: '110 Hz', freq: 110.0 },
              { nome: '880 Hz', freq: 880.0 },
            ],
            opcoes: [
              { id: 'grave', texto: 'Mais grave, três oitavas abaixo', correta: true },
              { id: 'aguda', texto: 'Mais aguda', correta: false },
              { id: 'igual', texto: 'Da mesma altura', correta: false },
            ],
            dica: '880 → 440 → 220 → 110: dividimos por dois três vezes.',
          },
          {
            id: 'fis_quinta',
            pergunta: 'A quinta justa corresponde a qual razão entre as frequências?',
            notas: [
              { nome: 'dó', freq: 261.63 },
              { nome: 'sol', freq: 392.0 },
            ],
            opcoes: [
              { id: '3_2', texto: '3:2', correta: true },
              { id: '2_1', texto: '2:1', correta: false },
              { id: '5_4', texto: '5:4', correta: false },
            ],
            dica: '392 dividido por 261,63 dá aproximadamente 1,5.',
          },
          {
            id: 'fis_timbre',
            pergunta: 'Duas notas com a mesma frequência soam diferentes. O que muda?',
            comparacao: [
              { rotulo: 'Onda senoidal', freq: 440.0, onda: 'sine', dur: 1.0, vol: 0.3 },
              { rotulo: 'Onda dente de serra', freq: 440.0, onda: 'sawtooth', dur: 1.0, vol: 0.16 },
            ],
            opcoes: [
              { id: 'timbre', texto: 'O timbre: a mistura de harmônicos', correta: true },
              { id: 'altura', texto: 'A altura da nota', correta: false },
              { id: 'volume', texto: 'Apenas o volume', correta: false },
            ],
            dica: 'A frequência fundamental é a mesma nos dois casos. O que muda é o que vem junto com ela.',
          },
          {
            id: 'fis_harmonico',
            pergunta: 'O 3º harmônico de uma corda que vibra a 220 Hz tem qual frequência?',
            notas: [
              { nome: 'fundamental', freq: 220.0 },
              { nome: '3º harmônico', freq: 660.0 },
            ],
            opcoes: [
              { id: '660', texto: '660 Hz', correta: true },
              { id: '440', texto: '440 Hz', correta: false },
              { id: '330', texto: '330 Hz', correta: false },
            ],
            dica: 'Os harmônicos são múltiplos inteiros da fundamental: 1x, 2x, 3x...',
          },
          {
            id: 'fis_amplitude',
            pergunta: 'O que determina se um som é forte ou fraco?',
            comparacao: [
              { rotulo: 'Amplitude baixa', freq: 440.0, onda: 'triangle', dur: 0.9, vol: 0.07 },
              { rotulo: 'Amplitude alta', freq: 440.0, onda: 'triangle', dur: 0.9, vol: 0.45 },
            ],
            opcoes: [
              { id: 'amplitude', texto: 'A amplitude da onda', correta: true },
              { id: 'frequencia', texto: 'A frequência da onda', correta: false },
              { id: 'harmonicos', texto: 'O número de harmônicos', correta: false },
            ],
            dica: 'Frequência define grave ou agudo; o tamanho da vibração define o volume.',
          },
        ],
      },
    },
  ],
}

export default musicaExtraPorFaixa
