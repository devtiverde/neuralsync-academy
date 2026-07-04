export const AVATAR_MAP = {
  'explorer':'🧭','av_explorer':'🧭',
  'cientista':'🔬','av_cientista':'🔬',
  'astronauta':'🚀','av_astronauta':'🚀',
  'mago':'🧙','av_mago':'🧙',
  'artista':'🎨','av_artista':'🎨',
  'robô':'🤖','robo':'🤖','av_robo':'🤖',
  'dino':'🦕','av_dino':'🦕',
  'ninja':'🥷','av_ninja':'🥷',
  'pirata':'🏴‍☠️','av_pirata':'🏴‍☠️',
  'fada':'🧚','av_fada':'🧚',
  'dragao':'🐉','av_dragao':'🐉',
  'unicornio':'🦄','av_unicornio':'🦄',
  'gato':'😼','av_gato':'😼',
  'alien':'👾','av_alien':'👾',
  'superheroi':'🦸','av_superheroi':'🦸',
  'bruxa':'🧙‍♀️','av_bruxa':'🧙‍♀️',
  'zumbi':'🧟','av_zumbi':'🧟',
  'sereia':'🧜','av_sereia':'🧜',
  'lenda':'⚡','av_lenda':'⚡',
}

export const resolverAvatar = av => (!av ? '🦊' : AVATAR_MAP[String(av).toLowerCase()] || av)
