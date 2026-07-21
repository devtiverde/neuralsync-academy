import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutCrianca from '../../components/LayoutCrianca'
import IntroAtividade from '../atividades/IntroAtividade'
import { criarRastreadorDesempenho, ajustarVelocidade } from '../../lib/dificuldadeAdaptativa'
import '../../styles/crianca.css'

const COR = '#7C3AED'
const MAX_VIDAS = 3

// ── DADOS ────────────────────────────────────────────────────────────────
const SERIES_LETRAS = [
  { nome: 'Vogais', letras: ['A','E','I','O','U'] },
  { nome: 'B C D F G', letras: ['B','C','D','F','G'] },
  { nome: 'H J K L M', letras: ['H','J','K','L','M'] },
  { nome: 'N P R S T', letras: ['N','P','R','S','T'] },
  { nome: 'V X Z', letras: ['V','X','Z'] },
  { nome: '🎲 Mistura!', letras: 'ABCDEFGHIJKLMNOPRSTUVXZ'.split('') },
]

const SERIES_PALAVRAS = [
  { nome: '🐾 Animais', palavras: ['gato','cão','rato','pato','boi','leão','lobo','urso','mula','paca','peixe','tigre'] },
  { nome: '🍎 Frutas', palavras: ['uva','pera','maçã','kiwi','figo','caju','mango','limão','coco','tâmara','melão','abacaxi'] },
  { nome: '🎨 Cores', palavras: ['azul','roxo','rosa','verde','laranja','amarelo','cinza','preto','branco','bege','lilás','turquesa'] },
  { nome: '📚 Escola', palavras: ['livro','lápis','mesa','cola','papel','tesoura','quadro','borracha','caderno','caneta','régua','mochila'] },
  { nome: '🌿 Natureza', palavras: ['chuva','nuvem','vento','pedra','flor','folha','raiz','semente','galho','lagoa','serra','brisa'] },
]

const SERIES_FRASES = [
  {
    nome: '🔬 Ciência',
    frases: [
      'A Terra gira em torno do Sol.',
      'Os dinossauros viveram há milhões de anos.',
      'A água é formada por hidrogênio e oxigênio.',
      'A gravidade mantém os planetas em órbita.',
      'Os pulmões nos ajudam a respirar oxigênio.',
      'O Sol é uma estrela no centro do sistema solar.',
    ],
  },
  {
    nome: '💡 Curiosidades',
    frases: [
      'O cérebro humano tem 86 bilhões de neurônios.',
      'O coração bate cerca de cem mil vezes por dia.',
      'A luz viaja a trezentos mil quilômetros por segundo.',
      'O Brasil é o quinto maior país do mundo.',
      'As abelhas se comunicam dançando para as outras.',
      'A lua demora 27 dias para girar em torno da Terra.',
    ],
  },
  {
    nome: '🏛️ História',
    frases: [
      'O Brasil foi descoberto em 22 de abril de 1500.',
      'A independência foi proclamada em 1822.',
      'Brasília foi inaugurada em 21 de abril de 1960.',
      'Os incas construíram Machu Picchu nos Andes.',
      'A revolução francesa aconteceu em 1789.',
      'D. Pedro II governou o Brasil por quase 50 anos.',
    ],
  },
]

const SERIES_PARAGRAFOS = [
  {
    nome: '🌌 Astronomia',
    textos: [
      'O universo tem cerca de 13,8 bilhões de anos. A Via Láctea contém entre 200 e 400 bilhões de estrelas. A estrela mais próxima, Proxima Centauri, fica a 4,2 anos-luz de distância da Terra.',
      'A gravidade é uma das quatro forças fundamentais do universo. Einstein a descreveu como curvatura do espaço-tempo. Um buraco negro é uma região onde a gravidade é tão intensa que nem a luz consegue escapar.',
    ],
  },
  {
    nome: '🧬 Biologia',
    textos: [
      'O DNA é uma molécula que carrega as instruções genéticas de todos os seres vivos. Cada célula humana contém cerca de dois metros de DNA compactado. O genoma humano tem aproximadamente 3 bilhões de pares de bases.',
      'A fotossíntese é o processo pelo qual as plantas convertem luz solar em energia química. Elas absorvem dióxido de carbono e liberam oxigênio, tornando a vida na Terra possível para todos os seres vivos.',
    ],
  },
  {
    nome: '💻 Tecnologia',
    textos: [
      'A inteligência artificial é um campo da computação que busca criar sistemas capazes de realizar tarefas que normalmente exigem inteligência humana. Aprendizado de máquina é uma de suas principais abordagens.',
      'A internet conecta bilhões de dispositivos ao redor do mundo. Ela foi criada nos anos 1960 como uma rede militar chamada ARPANET e se tornou pública nos anos 1990, transformando a comunicação global.',
    ],
  },
]

// ── TECLADO VISUAL ────────────────────────────────────────────────────────
const TECLADO_LINHAS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
]
const HOME_ROW = new Set(['A','S','D','F','J','K','L'])

// O teclado desenhado era puramente decorativo: `<div>` sem onClick, 30x32px.
// No celular nao existe teclado fisico, e o ModoSumir nao tem nenhum <input> --
// entao a atividade era literalmente impossivel de jogar ("nao da pra clicar na
// letra"). Agora cada tecla e um <button> de verdade, com 44px de altura no
// celular (alvo minimo para o dedo) e largura elastica para caber 10 teclas em
// 360px sem estourar. `onTecla` e opcional: onde ele nao for passado o teclado
// continua sendo so ilustracao.
function TecladoVisual({ letraAlvo, letraAtiva, onTecla }) {
  const clicavel = typeof onTecla === 'function'
  return (
    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '14px 8px' }}>
      <div style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px', textAlign: 'center' }}>
        {clicavel ? 'Toque na letra' : 'Teclado'}
      </div>
      {TECLADO_LINHAS.map((linha, li) => (
        <div key={li} className="ns-dt-teclado-linha" style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          {linha.map(k => {
            const isAlvo = k === letraAlvo?.toUpperCase()
            const isAtiva = k === letraAtiva?.toUpperCase()
            const isHome = HOME_ROW.has(k)
            return (
              <button
                key={k}
                type="button"
                aria-label={`Tecla ${k}`}
                // pointerdown, nao click: no celular o click chega ~100-300ms depois
                // do toque e o jogo e cronometrado
                onPointerDown={clicavel ? (e) => { e.preventDefault(); onTecla(k) } : undefined}
                disabled={!clicavel}
                className="ns-dt-tecla"
                style={{
                  width: '30px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: '800', fontFamily: 'monospace', padding: 0,
                  background: isAtiva ? '#10b981' : isAlvo ? COR : isHome ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.07)',
                  border: isAlvo ? `2px solid ${COR}` : isHome ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  color: isAtiva || isAlvo ? 'white' : isHome ? COR : 'rgba(255,255,255,0.4)',
                  transform: isAtiva ? 'scale(0.85)' : 'scale(1)',
                  transition: 'all 0.1s',
                  boxShadow: isAlvo ? `0 0 10px ${COR}50` : 'none',
                  cursor: clicavel ? 'pointer' : 'default',
                  // sem isto o toque prolongado seleciona a letra / abre o menu do sistema
                  touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', userSelect: 'none',
                }}
              >{k}</button>
            )
          })}
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
        Teclas <span style={{ color: COR }}>roxas</span> = posição das mãos
      </div>
    </div>
  )
}

function Coracoes({ vidas }) {
  return (
    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
      {Array.from({ length: MAX_VIDAS }).map((_, i) => (
        <span key={i} style={{ fontSize: '26px', opacity: i < vidas ? 1 : 0.15, transition: 'opacity 0.3s' }}>❤️</span>
      ))}
    </div>
  )
}

function BarraTempo({ pct }) {
  const cor = pct > 55 ? '#10b981' : pct > 25 ? '#f59e0b' : '#ef4444'
  return (
    <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: '4px', width: `${pct}%`,
        background: cor, transition: 'width 0.08s linear, background 0.3s',
        boxShadow: `0 0 8px ${cor}60`,
      }} />
    </div>
  )
}

// ── MODO SUMIR — Exploradores (3-5 anos) ─────────────────────────────────
// Letra gigante aparece → anel de contagem regressiva → some → digita antes → fica mais rápido
function ModoSumir({ onConcluir }) {
  const [serieIdx, setSerieIdx] = useState(0)
  const [roundKey, setRoundKey] = useState(0)
  const [vidas, setVidas] = useState(MAX_VIDAS)
  const [pontos, setPontos] = useState(0)
  const [pct, setPct] = useState(100)
  const [status, setStatus] = useState('mostrando') // mostrando|acertou|errou|gameover|vitoria
  const [letraAtiva, setLetraAtiva] = useState(null)
  const [particulas, setParticulas] = useState([])
  const [arenaClass, setArenaClass] = useState('')

  // refs para uso em callbacks/timers
  const velocidadeRef = useRef(4500)
  const statusRef = useRef('mostrando')
  const pontosRef = useRef(0)
  const vidasRef = useRef(MAX_VIDAS)
  const letraIdxRef = useRef(0)
  const serieRef = useRef(SERIES_LETRAS[0])
  const letrasRef = useRef([...SERIES_LETRAS[0].letras].sort(() => Math.random() - 0.5))
  const tickRef = useRef(null)
  const rastreadorRef = useRef(criarRastreadorDesempenho())

  const letraAtual = letrasRef.current[letraIdxRef.current % letrasRef.current.length]

  // Atualizar serie ref quando muda
  useEffect(() => {
    serieRef.current = SERIES_LETRAS[serieIdx]
  }, [serieIdx])

  // Countdown para cada round
  useEffect(() => {
    statusRef.current = 'mostrando'
    setStatus('mostrando')
    setPct(100)

    clearInterval(tickRef.current)
    const startTime = Date.now()
    const duration = velocidadeRef.current

    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const restante = Math.max(0, 100 - (elapsed / duration * 100))
      setPct(restante)

      if (elapsed >= duration && statusRef.current === 'mostrando') {
        clearInterval(tickRef.current)
        // Timeout — miss
        statusRef.current = 'errou'
        setStatus('errou')
        setArenaClass('ns-dt-arena-miss')
        setTimeout(() => setArenaClass(''), 500)
        rastreadorRef.current.registrar(false)
        velocidadeRef.current = ajustarVelocidade(velocidadeRef.current, rastreadorRef.current.multiplicadorTempo(), 1800, 4500)
        vidasRef.current -= 1
        setVidas(vidasRef.current)
        if (vidasRef.current <= 0) {
          setTimeout(() => { statusRef.current = 'gameover'; setStatus('gameover') }, 700)
        } else {
          setTimeout(avancarRound, 900)
        }
      }
    }, 60)

    return () => clearInterval(tickRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundKey])

  // Uma unica funcao para as duas entradas possiveis: teclado fisico (desktop) e
  // toque no teclado da tela (celular). Antes a logica vivia so dentro do listener
  // de `keydown`, o que deixava o jogo sem nenhuma forma de entrada no celular.
  const processarTecla = useCallback((tecla) => {
    const k = String(tecla).toUpperCase()
    if (!/^[A-Z]$/.test(k)) return
    setLetraAtiva(k)
    setTimeout(() => setLetraAtiva(null), 200)

    if (statusRef.current !== 'mostrando') return
    if (k === letraAtual) {
      clearInterval(tickRef.current)
      statusRef.current = 'acertou'
      setStatus('acertou')
      pontosRef.current += 1
      setPontos(pontosRef.current)
      // Partículas de acerto
      const EMOJIS = ['⭐','✨','💫','🌟','⚡','🎉']
      const novas = Array.from({length: 7}, (_, i) => ({
        id: Date.now() + i,
        x: Math.round(Math.random() * 180 - 90),
        emoji: EMOJIS[i % EMOJIS.length],
      }))
      setParticulas(novas)
      setArenaClass('ns-dt-arena-hit')
      setTimeout(() => { setParticulas([]); setArenaClass('') }, 750)
      // Dificuldade adaptativa: ajusta o tempo disponível com base na taxa de
      // acerto das últimas tentativas, não só numa contagem fixa de acertos.
      rastreadorRef.current.registrar(true)
      velocidadeRef.current = ajustarVelocidade(velocidadeRef.current, rastreadorRef.current.multiplicadorTempo(), 1800, 4500)
      setTimeout(avancarRound, 550)
    }
  // avancarRound e estavel o bastante (so mexe em refs e no roundKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letraAtual])

  // Listener de teclado físico
  useEffect(() => {
    const onKey = e => processarTecla(e.key)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [processarTecla])

  function avancarRound() {
    letraIdxRef.current += 1
    // Vitória: percorreu toda a série 2 vezes
    if (letraIdxRef.current >= letrasRef.current.length * 2) {
      statusRef.current = 'vitoria'
      setStatus('vitoria')
      return
    }
    setRoundKey(k => k + 1)
  }

  function reiniciar(novoSerieIdx = serieIdx) {
    const serie = SERIES_LETRAS[novoSerieIdx]
    letrasRef.current = [...serie.letras].sort(() => Math.random() - 0.5)
    letraIdxRef.current = 0
    vidasRef.current = MAX_VIDAS
    pontosRef.current = 0
    velocidadeRef.current = 4500
    rastreadorRef.current.reiniciar()
    setSerieIdx(novoSerieIdx)
    setVidas(MAX_VIDAS)
    setPontos(0)
    setRoundKey(k => k + 1)
  }

  if (status === 'gameover') return (
    <GameOver pontos={pontos} unidade="letras" onReiniciar={() => reiniciar()} onConcluir={onConcluir} />
  )
  if (status === 'vitoria') return (
    <Vitoria pontos={pontos} unidade="letras" onReiniciar={() => reiniciar()} onConcluir={onConcluir}
      onProxima={serieIdx < SERIES_LETRAS.length - 1 ? () => reiniciar(serieIdx + 1) : null} />
  )

  const letraCor = status === 'acertou' ? '#10b981' : status === 'errou' ? '#ef4444' : 'white'
  const letraScale = status === 'acertou' ? 1.25 : status === 'errou' ? 0.8 : 1
  // Anel SVG
  const r = 44; const circ = 2 * Math.PI * r
  const aneOffset = circ * (1 - pct / 100)
  const anelCor = pct > 55 ? '#10b981' : pct > 25 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Seletor série */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '2px' }}>
        {SERIES_LETRAS.map((s, i) => (
          <button key={i} onClick={() => reiniciar(i)} style={{ background: serieIdx === i ? COR : 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '20px', padding: '5px 13px', color: serieIdx === i ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: '700', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>{s.nome}</button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#f59e0b' }}>{pontos}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>Pontos</div>
        </div>
        <Coracoes vidas={vidas} />
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px' }}>
            {velocidadeRef.current >= 3800 ? '🐢' : velocidadeRef.current >= 2800 ? '🦊' : velocidadeRef.current >= 2200 ? '🐆' : '⚡'}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>
            {velocidadeRef.current >= 3800 ? 'Devagar' : velocidadeRef.current >= 2800 ? 'Normal' : velocidadeRef.current >= 2200 ? 'Rápido' : 'Turbo!'}
          </div>
        </div>
      </div>

      {/* Arena principal */}
      <div className={arenaClass} style={{ position: 'relative', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', transition: 'border-color 0.2s', overflow: 'visible' }}>
        {/* Partículas de acerto */}
        {particulas.map(p => (
          <div key={p.id} style={{
            position: 'absolute', top: '50%', left: '50%',
            marginLeft: `${p.x}px`,
            pointerEvents: 'none', fontSize: '22px', zIndex: 20,
            animation: 'ns-dt-particula 0.72s ease-out forwards',
          }}>{p.emoji}</div>
        ))}

        {/* Anel SVG + letra */}
        <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
            <circle cx="50" cy="50" r={r} fill="none" stroke={anelCor} strokeWidth="5" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={aneOffset}
              style={{ transition: 'stroke-dashoffset 0.08s linear, stroke 0.3s' }} />
          </svg>
          <div style={{
            fontSize: '110px', lineHeight: 1, fontWeight: '900', fontFamily: 'monospace',
            color: letraCor, transform: `scale(${letraScale})`,
            transition: 'color 0.15s, transform 0.15s',
            textShadow: status === 'acertou' ? '0 0 40px #10b981, 0 0 70px #10b98150' : status === 'errou' ? '0 0 40px #ef4444, 0 0 70px #ef444450' : undefined,
            animation: status === 'mostrando' ? 'ns-dt-letra-wait 1.6s ease-in-out infinite' : 'none',
            userSelect: 'none',
          }}>
            {letraAtual}
          </div>
        </div>

        <div style={{ marginTop: '18px', fontSize: '14px', color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
          {status === 'acertou' ? '✅ Muito bem!' : status === 'errou' ? '⏰ Passou o tempo!' : (
            <>Pressione&nbsp;<kbd style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '6px', padding: '2px 10px', fontFamily: 'monospace', fontWeight: '800', fontSize: '16px', color: 'white' }}>{letraAtual}</kbd></>
          )}
        </div>
      </div>

      {/* Teclado — clicável: é a ÚNICA entrada possível no celular */}
      <TecladoVisual letraAlvo={letraAtual} letraAtiva={letraAtiva} onTecla={processarTecla} />
    </div>
  )
}

// ── MODO ESTEIRA — Construtores (6-8 anos) ────────────────────────────────
// Palavra + barra de tempo que esgota → digita antes → 3 vidas → fica mais rápido
function ModoEsteira({ onConcluir }) {
  const [serieIdx, setSerieIdx] = useState(0)
  const [roundKey, setRoundKey] = useState(0)
  const [vidas, setVidas] = useState(MAX_VIDAS)
  const [pontos, setPontos] = useState(0)
  const [pct, setPct] = useState(100)
  const [typed, setTyped] = useState('')
  const [status, setStatus] = useState('ativo') // ativo|acertou|errou|gameover|vitoria
  const [shake, setShake] = useState(false)
  const [tecladoAberto, setTecladoAberto] = useState(false)
  const inputRef = useRef(null)
  const tickRef = useRef(null)
  const statusRef = useRef('ativo')
  const velocidadeRef = useRef(7000)
  const pontosRef = useRef(0)
  const vidasRef = useRef(MAX_VIDAS)
  const palavraIdxRef = useRef(0)
  const palavrasRef = useRef([...SERIES_PALAVRAS[0].palavras].sort(() => Math.random() - 0.5))
  const typedRef = useRef('')
  const rastreadorRef = useRef(criarRastreadorDesempenho())

  const palavraAtual = palavrasRef.current[palavraIdxRef.current % palavrasRef.current.length]

  // Foco automático no mount
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [])

  // Countdown por round
  useEffect(() => {
    statusRef.current = 'ativo'
    setStatus('ativo')
    setTyped(''); typedRef.current = ''
    setPct(100)
    clearInterval(tickRef.current)
    if (inputRef.current) inputRef.current.focus()

    const startTime = Date.now()
    const duration = velocidadeRef.current

    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const restante = Math.max(0, 100 - (elapsed / duration * 100))
      setPct(restante)

      if (elapsed >= duration && statusRef.current === 'ativo') {
        clearInterval(tickRef.current)
        errarPalavra()
      }
    }, 60)

    return () => clearInterval(tickRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundKey])

  function errarPalavra() {
    statusRef.current = 'errou'
    setStatus('errou')
    rastreadorRef.current.registrar(false)
    velocidadeRef.current = ajustarVelocidade(velocidadeRef.current, rastreadorRef.current.multiplicadorTempo(), 3200, 7000)
    vidasRef.current -= 1
    setVidas(vidasRef.current)
    if (vidasRef.current <= 0) {
      setTimeout(() => { statusRef.current = 'gameover'; setStatus('gameover') }, 700)
    } else {
      setTimeout(avancarRound, 950)
    }
  }

  function avancarRound() {
    palavraIdxRef.current += 1
    if (palavraIdxRef.current >= palavrasRef.current.length) {
      statusRef.current = 'vitoria'; setStatus('vitoria'); return
    }
    setRoundKey(k => k + 1)
  }

  function handleInput(e) {
    if (statusRef.current !== 'ativo') return
    const val = e.target.value
    setTecladoAberto(true) // digitou = o teclado (físico ou virtual) já está aberto
    setTyped(val); typedRef.current = val

    const alvo = palavraAtual.toLowerCase()
    const valLower = val.toLowerCase()

    if (valLower === alvo) {
      clearInterval(tickRef.current)
      statusRef.current = 'acertou'; setStatus('acertou')
      pontosRef.current += 1; setPontos(pontosRef.current)
      rastreadorRef.current.registrar(true)
      velocidadeRef.current = ajustarVelocidade(velocidadeRef.current, rastreadorRef.current.multiplicadorTempo(), 3200, 7000)
      setTimeout(avancarRound, 650)
    } else if (val.length > 0 && !alvo.startsWith(valLower)) {
      setShake(true); setTimeout(() => setShake(false), 280)
    }
  }

  function reiniciar(novoSerieIdx = serieIdx) {
    palavrasRef.current = [...SERIES_PALAVRAS[novoSerieIdx].palavras].sort(() => Math.random() - 0.5)
    palavraIdxRef.current = 0
    vidasRef.current = MAX_VIDAS; pontosRef.current = 0
    velocidadeRef.current = 7000
    rastreadorRef.current.reiniciar()
    setSerieIdx(novoSerieIdx); setVidas(MAX_VIDAS); setPontos(0)
    setRoundKey(k => k + 1)
  }

  if (status === 'gameover') return <GameOver pontos={pontos} unidade="palavras" onReiniciar={() => reiniciar()} onConcluir={onConcluir} />
  if (status === 'vitoria') return (
    <Vitoria pontos={pontos} unidade="palavras" onReiniciar={() => reiniciar()} onConcluir={onConcluir}
      onProxima={serieIdx < SERIES_PALAVRAS.length - 1 ? () => reiniciar(serieIdx + 1) : null} />
  )

  // Render letras individuais da palavra
  function renderLetrasPalavra() {
    return palavraAtual.split('').map((char, i) => {
      const tc = (typed[i] || '').toLowerCase()
      const ch = char.toLowerCase()
      let cor = 'rgba(255,255,255,0.25)'
      let bg = 'rgba(255,255,255,0.05)'
      let brd = '1px solid rgba(255,255,255,0.1)'
      if (tc) {
        cor = tc === ch ? '#10b981' : '#ef4444'
        bg = tc === ch ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'
        brd = tc === ch ? '1px solid #10b98150' : '1px solid #ef444450'
      } else if (i === typed.length) {
        bg = `${COR}30`; cor = 'white'; brd = `2px solid ${COR}`
      }
      return (
        <div key={i} style={{
          width: '46px', height: '54px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', fontWeight: '900', fontFamily: 'monospace',
          color: cor, background: bg, border: brd, transition: 'all 0.12s',
        }}>{char.toUpperCase()}</div>
      )
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Seletor série */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '2px' }}>
        {SERIES_PALAVRAS.map((s, i) => (
          <button key={i} onClick={() => reiniciar(i)} style={{ background: serieIdx === i ? COR : 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '20px', padding: '5px 13px', color: serieIdx === i ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: '700', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>{s.nome}</button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#f59e0b' }}>{pontos}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>Acertos</div>
        </div>
        <Coracoes vidas={vidas} />
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px' }}>
            {velocidadeRef.current >= 6000 ? '🐢' : velocidadeRef.current >= 4800 ? '🦊' : velocidadeRef.current >= 3800 ? '🐆' : '⚡'}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>
            {velocidadeRef.current >= 6000 ? 'Devagar' : velocidadeRef.current >= 4800 ? 'Normal' : velocidadeRef.current >= 3800 ? 'Rápido' : 'Turbo!'}
          </div>
        </div>
      </div>

      {/* Card palavra */}
      <div className={shake ? 'ns-dt-shake' : ''} style={{
        background: status === 'acertou' ? 'rgba(16,185,129,0.08)' : status === 'errou' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${status === 'acertou' ? '#10b98140' : status === 'errou' ? '#ef444455' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '20px', padding: '20px 20px 22px',
        transition: 'background 0.2s, border-color 0.2s',
      }}>
        <div className={pct < 25 ? 'ns-dt-urgente' : ''}><BarraTempo pct={pct} /></div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '20px 0', flexWrap: 'wrap', minHeight: '60px', alignItems: 'center' }}>
          {status === 'acertou' ? (
            <div style={{ fontSize: '44px' }}>✅</div>
          ) : status === 'errou' ? (
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace', fontWeight: '700' }}>
              ❌ Era: <span style={{ color: '#fca5a5', fontSize: '22px' }}>{palavraAtual}</span>
            </div>
          ) : (
            renderLetrasPalavra()
          )}
        </div>

        {/* O input SEMPRE fica montado.
            Antes ele era `{status === 'ativo' && <input/>}`: ao acertar ou errar uma
            palavra o React o desmontava, o foco se perdia e o teclado virtual do
            celular FECHAVA. Na rodada seguinte o input voltava e o codigo chamava
            `.focus()` -- mas iOS e Android so abrem o teclado quando o foco vem de um
            gesto do usuario, nunca por chamada de script. Resultado pratico: dava
            para digitar a primeira palavra e mais nenhuma.
            `readOnly` (e nao `disabled`) porque elemento desabilitado tambem perde o
            foco; readOnly bloqueia a digitacao e mantem o teclado aberto. */}
        <input
          ref={inputRef}
          type="text" value={typed} onChange={handleInput}
          readOnly={status !== 'ativo'}
          placeholder={status === 'ativo' ? 'Digite a palavra...' : ''}
          inputMode="text"
          autoFocus autoCapitalize="none" autoComplete="off" autoCorrect="off" spellCheck={false}
          // NÃO usar onFocus: o autoFocus dispara `focus` também no celular, mas lá
          // isso não abre o teclado virtual. Só um toque do usuário abre — então é o
          // toque (ou uma tecla digitada, ver handleInput) que esconde a dica.
          onPointerDown={() => setTecladoAberto(true)}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px', padding: '12px 16px', color: 'white', fontSize: '20px',
            fontFamily: 'monospace', fontWeight: '700', outline: 'none', boxSizing: 'border-box',
            textAlign: 'center', letterSpacing: '3px',
            opacity: status === 'ativo' ? 1 : 0.35, transition: 'opacity 0.2s',
          }}
        />
      </div>

      {/* No celular o teclado so aparece depois de um toque do usuario -- o autoFocus
          e ignorado. Sem este aviso a crianca fica olhando para uma palavra que nao
          consegue responder. Some assim que o campo recebe foco. */}
      {!tecladoAberto && (
        <button
          onClick={() => inputRef.current?.focus()}
          style={{ width: '100%', background: 'rgba(124,58,237,0.18)', border: `1px solid ${COR}66`, borderRadius: '12px', padding: '12px', color: 'white', fontWeight: '800', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          ⌨️ Toque aqui para abrir o teclado
        </button>
      )}

      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
        💡 Digite a palavra antes que a barra vermelha chegue ao fim!
      </div>
    </div>
  )
}

// ── MODO TEXTO — Criadores & Inventores ───────────────────────────────────
function ModoTexto({ faixa, onConcluir }) {
  const isParagrafo = faixa === 'inventores'
  const series = isParagrafo ? SERIES_PARAGRAFOS : SERIES_FRASES
  const chave = isParagrafo ? 'textos' : 'frases'

  const [serieIdx, setSerieIdx] = useState(0)
  const [itemIdx, setItemIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [iniciou, setIniciou] = useState(false)
  const [inicio, setInicio] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [precisao, setPrecisao] = useState(100)
  const [terminou, setTerminou] = useState(false)
  const [historico, setHistorico] = useState([])
  const [tecladoAberto, setTecladoAberto] = useState(false)
  const inputRef = useRef(null)
  const inicioRef = useRef(null)

  const serie = series[serieIdx]
  const items = serie[chave]
  const alvo = items[itemIdx % items.length]

  function calcMetrics(texto, ini) {
    if (!ini) return
    const minutos = (Date.now() - ini) / 60000
    const palavras = texto.trim().split(/\s+/).filter(Boolean).length
    const w = minutos > 0.02 ? Math.round(palavras / minutos) : 0
    let corretas = 0
    for (let i = 0; i < texto.length; i++) { if (texto[i] === alvo[i]) corretas++ }
    const p = texto.length > 0 ? Math.round((corretas / texto.length) * 100) : 100
    setWpm(w); setPrecisao(p)
    return { w, p }
  }

  function handleInput(e) {
    const val = e.target.value
    setTecladoAberto(true)
    let ini = inicioRef.current
    if (!iniciou && val.length === 1) {
      const now = Date.now()
      setIniciou(true); setInicio(now); inicioRef.current = now; ini = now
    }
    setTyped(val)
    calcMetrics(val, ini)
    if (val.length >= alvo.length) {
      const res = calcMetrics(val, ini)
      setTerminou(true)
      setHistorico(h => [...h, { wpm: res?.w || 0, precisao: res?.p || 100, serie: serie.nome }])
    }
  }

  function reiniciar() {
    setTyped(''); setTerminou(false); setIniciou(false); setInicio(null)
    inicioRef.current = null; setWpm(0); setPrecisao(100)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  // Render texto com highlight — BUG FIX: sem whiteSpace:pre nos spans
  function renderTexto() {
    return (
      <div style={{
        fontFamily: 'monospace', fontSize: isParagrafo ? '15px' : '19px',
        lineHeight: 1.9, wordBreak: 'break-word', overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
      }}>
        {alvo.split('').map((char, i) => {
          let cor = 'rgba(255,255,255,0.28)'
          let bg = 'transparent'
          const isCursor = i === typed.length
          if (i < typed.length) {
            cor = typed[i] === char ? '#6ee7b7' : '#fca5a5'
            bg = typed[i] === char ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.14)'
          } else if (isCursor) {
            cor = 'white'
          }
          return (
            <span key={i} className={isCursor ? 'ns-dt-cursor-char' : ''} style={{ color: cor, background: isCursor ? undefined : bg, borderRadius: '2px' }}>{char}</span>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Seletor série */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '2px' }}>
        {series.map((s, i) => (
          <button key={i} onClick={() => { setSerieIdx(i); setItemIdx(0); reiniciar() }}
            style={{ background: serieIdx === i ? COR : 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '20px', padding: '5px 13px', color: serieIdx === i ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: '700', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {s.nome}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { label: 'WPM', valor: wpm || '—', cor: wpm >= 40 ? '#10b981' : wpm > 0 ? COR : 'rgba(255,255,255,0.2)' },
          { label: 'Precisão', valor: iniciou ? `${precisao}%` : '—', cor: precisao >= 95 ? '#10b981' : precisao >= 80 ? '#f59e0b' : precisao < 80 && iniciou ? '#ef4444' : 'rgba(255,255,255,0.2)' },
          { label: 'Progresso', valor: typed.length > 0 ? `${Math.round((typed.length / alvo.length) * 100)}%` : '—', cor: '#3b82f6' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '900', color: s.cor, fontFamily: 'monospace' }}>{s.valor}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', fontWeight: '600' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Área exercício */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${terminou ? '#10b98140' : 'rgba(255,255,255,0.08)'}`, borderRadius: '20px', padding: '20px', transition: 'border-color 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', padding: '8px 12px', background: 'rgba(124,58,237,0.12)', borderRadius: '10px', border: '1px solid rgba(124,58,237,0.2)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', flexShrink: 0, boxShadow: '0 0 6px #10b98180', display: iniciou ? 'block' : 'none' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: '800', color: COR, letterSpacing: '0.5px' }}>
            ▶ NEURALSYNC TERMINAL — {isParagrafo ? 'texto científico' : 'frase educativa'}
          </span>
        </div>

        {!terminou && (
          <>
            <div style={{ background: 'rgba(0,0,0,0.22)', borderRadius: '12px', padding: '16px', marginBottom: '14px' }}>
              {renderTexto()}
            </div>
            <textarea
              ref={inputRef}
              value={typed} onChange={handleInput}
              placeholder={iniciou ? '' : 'Comece a digitar...'}
              rows={isParagrafo ? 4 : 2}
              autoFocus autoCapitalize="none" autoCorrect="off" spellCheck={false}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px', padding: '14px', color: 'white', fontSize: '15px',
                lineHeight: 1.7, fontFamily: 'monospace', outline: 'none', resize: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.target.style.borderColor = COR + '70' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)' }}
              // ver ModoEsteira: onFocus não serve, o autoFocus dispara no celular
              // sem abrir o teclado virtual
              onPointerDown={() => setTecladoAberto(true)}
            />
            {/* Mesmo motivo do ModoEsteira: no celular o autoFocus nao abre o teclado
                virtual, so um toque do usuario abre. */}
            {!tecladoAberto && (
              <button
                onClick={() => inputRef.current?.focus()}
                style={{ width: '100%', marginTop: '10px', background: 'rgba(124,58,237,0.18)', border: `1px solid ${COR}66`, borderRadius: '12px', padding: '12px', color: 'white', fontWeight: '800', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                ⌨️ Toque aqui para abrir o teclado
              </button>
            )}
          </>
        )}

        {terminou && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>{precisao >= 95 ? '🎯' : precisao >= 80 ? '👍' : '💪'}</div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: 'white', marginBottom: '12px' }}>
              {wpm >= 40 ? 'Incrível!' : wpm >= 20 ? 'Muito bem!' : 'Continue praticando!'}
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '20px' }}>
              <div><div style={{ fontSize: '28px', fontWeight: '900', color: COR }}>{wpm}</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>WPM</div></div>
              <div><div style={{ fontSize: '28px', fontWeight: '900', color: precisao >= 95 ? '#10b981' : '#f59e0b' }}>{precisao}%</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Precisão</div></div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={reiniciar} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '11px 18px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>🔁 Repetir</button>
              <button onClick={() => { setItemIdx(i => i + 1); reiniciar() }} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '11px 18px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Próxima →</button>
              {onConcluir && <button onClick={onConcluir} style={{ background: COR, border: 'none', borderRadius: '12px', padding: '11px 18px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Concluir ✓</button>}
            </div>
          </div>
        )}
      </div>

      {historico.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '14px 16px' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>📊 Sessão atual</div>
          {historico.map((h, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{h.serie}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: COR }}>{h.wpm} WPM</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: h.precisao >= 95 ? '#10b981' : '#f59e0b' }}>{h.precisao}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── TELAS DE GAME OVER / VITÓRIA ──────────────────────────────────────────
const VITORIA_PARTICULAS = [
  { id:1, x:-90, e:'🏆'}, { id:2, x:-55, e:'⭐'}, { id:3, x:-20, e:'✨'},
  { id:4, x:20,  e:'💫'}, { id:5, x:55,  e:'⭐'}, { id:6, x:90,  e:'🎉'},
]

function GameOver({ pontos, unidade, onReiniciar, onConcluir }) {
  return (
    <div className="ns-dt-gameover-wrap" style={{ textAlign: 'center', padding: '48px 20px' }}>
      <div style={{ fontSize: '90px', marginBottom: '16px', filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.5))' }}>💔</div>
      <div style={{ fontSize: '26px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>Acabou as vidas!</div>
      <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', marginBottom: '10px' }}>
        Você acertou <strong style={{ color: '#f59e0b', fontSize: '20px' }}>{pontos}</strong> {unidade}!
      </div>
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginBottom: '28px' }}>Continue praticando — você vai melhorar! 💪</div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onReiniciar} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', padding: '14px 26px', color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit' }}>
          🔁 Jogar de novo
        </button>
        {onConcluir && (
          <button onClick={onConcluir} style={{ background: COR, border: 'none', borderRadius: '14px', padding: '14px 26px', color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 20px ${COR}60` }}>
            Concluir ✓
          </button>
        )}
      </div>
    </div>
  )
}

function Vitoria({ pontos, unidade, onReiniciar, onProxima, onConcluir }) {
  return (
    <div className="ns-dt-vitoria-wrap" style={{ textAlign: 'center', padding: '40px 20px', position: 'relative', overflow: 'visible' }}>
      {/* Partículas de celebração */}
      {VITORIA_PARTICULAS.map(p => (
        <div key={p.id} style={{
          position: 'absolute', top: '30px', left: '50%',
          marginLeft: `${p.x}px`,
          pointerEvents: 'none', fontSize: '24px', zIndex: 10,
          animation: 'ns-dt-particula 0.9s ease-out forwards',
        }}>{p.e}</div>
      ))}
      <div style={{ fontSize: '90px', marginBottom: '12px', filter: 'drop-shadow(0 0 24px rgba(251,191,36,0.6))' }}>🏆</div>
      <div style={{ fontSize: '26px', fontWeight: '900', color: 'white', marginBottom: '6px' }}>Série completa!</div>
      <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', marginBottom: '10px' }}>
        Você acertou <strong style={{ color: '#f59e0b', fontSize: '20px' }}>{pontos}</strong> {unidade}!
      </div>
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginBottom: '28px' }}>Incrível! Você está ficando um expert! 🚀</div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onReiniciar} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', padding: '12px 22px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>🔁 Repetir</button>
        {onProxima && <button onClick={onProxima} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', padding: '12px 22px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Próxima série →</button>}
        {onConcluir && <button onClick={onConcluir} style={{ background: COR, border: 'none', borderRadius: '14px', padding: '12px 22px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 16px ${COR}50` }}>Concluir ✓</button>}
      </div>
    </div>
  )
}

// ── INTRO POR FAIXA ──────────────────────────────────────────────────────
const INTRO_POR_FAIXA = {
  exploradores: {
    historinha: 'As letras estão fugindo da tela! Aperte a letra certa antes que ela desapareça. Treina seus dedos e sua atenção ao mesmo tempo!',
    tempo_estimado: 3,
    xp_reward: 15,
    coins_reward: 8,
  },
  construtores: {
    historinha: 'Um teclado mágico apareceu na missão! Você precisa digitar as palavras antes que o tempo acabe. Quanto mais rápido, mais pontos!',
    tempo_estimado: 5,
    xp_reward: 20,
    coins_reward: 10,
  },
  criadores: {
    historinha: 'Missão de velocidade! Digite frases sobre ciência, história e curiosidades. Meça sua precisão e melhore a cada sessão!',
    tempo_estimado: 7,
    xp_reward: 25,
    coins_reward: 12,
  },
  inventores: {
    historinha: 'Nível avançado! Textos científicos completos para medir seu WPM. Digitadores profissionais chegam a 80 WPM — você consegue superar?',
    tempo_estimado: 10,
    xp_reward: 30,
    coins_reward: 15,
  },
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────
const MODOS = [
  { id: 'letras',    emoji: '🔡', label: 'Letras',   desc: 'Aperte a letra antes que suma!',         badge: '3-5 anos' },
  { id: 'palavras',  emoji: '⏱️', label: 'Palavras', desc: 'Digite antes do tempo acabar!',          badge: '6-8 anos' },
  { id: 'frases',    emoji: '📝', label: 'Frases',   desc: 'Velocidade e precisão em frases',        badge: '9-11 anos' },
  { id: 'paragrafos',emoji: '🧬', label: 'Textos',   desc: 'Parágrafos científicos — meça seu WPM', badge: '12+ anos' },
]

function modoDefault(faixa) {
  if (faixa === 'exploradores') return 'letras'
  if (faixa === 'construtores') return 'palavras'
  if (faixa === 'criadores')    return 'frases'
  return 'paragrafos'
}

export default function Digitacao() {
  const navigate = useNavigate()
  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const faixa = child?.faixa_etaria || 'construtores'

  const [modoAtual, setModoAtual] = useState(() => modoDefault(faixa))
  const [iniciou, setIniciou] = useState(false)

  const modoInfo = MODOS.find(m => m.id === modoAtual) || MODOS[0]
  const infoFaixa = INTRO_POR_FAIXA[faixa] || INTRO_POR_FAIXA.construtores

  // A Digitação prometia XP na intro mas nunca levava à tela de encerramento:
  // a criança jogava, perdia (ou vencia) e ficava presa sem receber nada.
  function concluir() {
    navigate('/encerramento', {
      state: {
        titulo: 'Digitação',
        xp: infoFaixa.xp_reward,
        coins: infoFaixa.coins_reward,
        emoji: '⌨️',
        tipo: 'digitacao',
        atividade_id: 'digitacao',
      },
    })
  }

  if (!iniciou) {
    const info = infoFaixa
    return (
      <IntroAtividade
        atividade={{
          id: 'digitacao',
          tipo: 'digitacao',
          emoji: '⌨️',
          titulo: 'Digitação',
          habilidade: 'Coordenação & Velocidade',
          historinha: info.historinha,
          tempo_estimado: info.tempo_estimado,
          xp_reward: info.xp_reward,
          coins_reward: info.coins_reward,
        }}
        onComecar={() => setIniciou(true)}
        onVoltar={() => navigate('/home-crianca')}
      />
    )
  }

  return (
    <LayoutCrianca child={child}>
      <div className="ns-pad">

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(59,130,246,0.1) 100%)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '16px', padding: '16px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => navigate('/home-crianca')} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', width: '36px', height: '36px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ fontSize: '30px', filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.6))' }}>{modoInfo.emoji}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '900', lineHeight: 1.2 }}>⌨️ Digitação</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginTop: '2px' }}>{modoInfo.desc}</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '99px', padding: '4px 10px', flexShrink: 0 }}>
            {modoInfo.badge}
          </span>
        </div>

        {/* Seletor de modo — 4 cards clicáveis */}
        <div style={{ maxWidth: '680px', margin: '0 auto 20px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
          {MODOS.map(m => {
            const ativo = modoAtual === m.id
            return (
              <button
                key={m.id}
                onClick={() => setModoAtual(m.id)}
                style={{
                  background: ativo ? COR : 'rgba(255,255,255,0.05)',
                  border: ativo ? `2px solid ${COR}` : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px', padding: '12px 8px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                  transition: 'all 0.15s', fontFamily: 'inherit',
                  boxShadow: ativo ? `0 0 16px ${COR}50` : 'none',
                }}
              >
                <span style={{ fontSize: '22px' }}>{m.emoji}</span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: ativo ? 'white' : 'rgba(255,255,255,0.7)' }}>{m.label}</span>
                <span style={{ fontSize: '10px', fontWeight: '600', color: ativo ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)', background: ativo ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.05)', borderRadius: '99px', padding: '2px 7px' }}>{m.badge}</span>
              </button>
            )
          })}
        </div>

        <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {modoAtual === 'letras'     && <ModoSumir onConcluir={concluir} />}
          {modoAtual === 'palavras'   && <ModoEsteira onConcluir={concluir} />}
          {modoAtual === 'frases'     && <ModoTexto faixa="criadores"  onConcluir={concluir} />}
          {modoAtual === 'paragrafos' && <ModoTexto faixa="inventores" onConcluir={concluir} />}

          <button onClick={() => navigate('/diario')} style={{ marginTop: '20px', width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
            📔 Ir para o Meu Diário
          </button>
        </div>
      </div>
    </LayoutCrianca>
  )
}
