import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

const CORES = [
  { id: 'vermelho', nome: 'Vermelho', hex: '#E24B4A', emoji: '🍎', exemplo: 'como uma maçã',    funfato: 'O vermelho chama mais atenção — é por isso que semáforos e sinais de perigo usam essa cor!', detalhe: 'Comprimento de onda ~700nm | Cor primária (luz) | RGB: 226, 75, 74'   },
  { id: 'azul',     nome: 'Azul',     hex: '#378ADD', emoji: '🫐', exemplo: 'como o céu',       funfato: 'O azul é a cor favorita da maioria das pessoas no mundo — inclusive crianças e adultos!',      detalhe: 'Comprimento de onda ~450nm | Cor primária (luz e pigmento) | RGB: 55, 138, 221' },
  { id: 'amarelo',  nome: 'Amarelo',  hex: '#EF9F27', emoji: '🌟', exemplo: 'como o sol',       funfato: 'O amarelo é a cor mais visível para os olhos humanos — táxis e alertas usam amarelo!',        detalhe: 'Comprimento de onda ~575nm | Cor primária (pigmento) | RGB: 239, 159, 39' },
  { id: 'verde',    nome: 'Verde',    hex: '#639922', emoji: '🌿', exemplo: 'como a folha',     funfato: 'Plantas usam o verde para absorver luz do sol e produzir o alimento delas!',                   detalhe: 'Comprimento de onda ~530nm | Cor primária (luz) | Clorofila absorve vermelho e azul' },
  { id: 'laranja',  nome: 'Laranja',  hex: '#D85A30', emoji: '🍊', exemplo: 'como a laranja',   funfato: 'O laranja é mistura de vermelho + amarelo — assim como a fruta que deu o nome à cor!',        detalhe: 'Comprimento de onda ~610nm | Mistura de vermelho + amarelo | RGB: 216, 90, 48' },
  { id: 'roxo',     nome: 'Roxo',     hex: '#534AB7', emoji: '🍇', exemplo: 'como a uva',       funfato: 'Na Antiguidade o roxo era tão difícil de fazer que só reis podiam usar roupas dessa cor!',    detalhe: 'Comprimento de onda ~420nm | Mistura de azul + vermelho | RGB: 83, 74, 183' },
  { id: 'rosa',     nome: 'Rosa',     hex: '#D4537E', emoji: '🌸', exemplo: 'como a flor',      funfato: 'O rosa é a única cor que não existe no arco-íris — nosso cérebro cria essa cor!',             detalhe: 'Não existe no espectro solar — é uma mistura de vermelho + azul percebida pelo cérebro' },
  { id: 'marrom',   nome: 'Marrom',   hex: '#854F0B', emoji: '🐻', exemplo: 'como o urso',      funfato: 'Animais da floresta têm cores marrons para se camuflar entre troncos e terra!',               detalhe: 'Cor composta (laranja escuro) | RGB: 133, 79, 11 | Resultado da mistura de várias cores' },
  { id: 'preto',    nome: 'Preto',    hex: '#2C2C2A', emoji: '🐧', exemplo: 'como o pinguim',   funfato: 'Objetos pretos ficam mais quentes sob o sol porque absorvem toda a luz!',                     detalhe: 'Ausência de luz refletida | Absorve todo o espectro visível | Não é cor no sentido físico' },
  { id: 'branco',   nome: 'Branco',   hex: '#9ca3af', emoji: '☁️', exemplo: 'como a nuvem',    funfato: 'A neve e as nuvens são brancas porque refletem toda a luz do sol de volta para os nossos olhos!', detalhe: 'Todas as cores do espectro combinadas | Prisma decompõe luz branca em arco-íris' },
]

function detectFaixa(id = '') {
  if (id.startsWith('cri_') || id.startsWith('inv_')) return 'avancado'
  if (id.startsWith('con_')) return 'medio'
  return 'basico'
}

function falarTTS(texto) {
  if (!window.speechSynthesis) return
  const utt = new SpeechSynthesisUtterance(texto)
  utt.lang = 'pt-BR'
  utt.rate = 0.85
  utt.pitch = 1.1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utt)
}

function falar(cor) {
  const texto = `${cor.nome}. ${cor.nome}, ${cor.exemplo}.`
  // só usa a gravação quando id+exemplo batem com o padrão — sets temáticos
  // (arco-íris, natureza etc.) usam ids próprios ou reaproveitam com texto diferente
  const padrao = CORES.find(x => x.id === cor.id)
  if (padrao && padrao.exemplo === cor.exemplo) {
    const audio = new Audio(`/audio/cores/${cor.id}.mp3`)
    audio.addEventListener('error', () => falarTTS(texto))
    audio.play().catch(() => falarTTS(texto))
    return
  }
  falarTTS(texto)
}

export default function CoresAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ouvidas, setOuvidas] = useState(new Set())
  const [encerrado, setEncerrado] = useState(false)
  const [animIn, setAnimIn] = useState(true)
  const [falando, setFalando] = useState(false)

  useEffect(() => { if (!atividade) navigate(-1) }, [])
  if (!atividade) return null

  const DADOS = atividade?.dados?.cores || CORES
  const kidsLink = getKidsLink(atividade.id)
  const nivel = detectFaixa(atividade.id)
  if (!iniciou) return (
    <IntroAtividade
      atividade={atividade}
      onComecar={() => setIniciou(true)}
      onVoltar={() => navigate(-1)}
      refazendo={state?.refazendo}
      kidsLink={kidsLink}
    />
  )

  const cor = DADOS[currentIndex]
  const progresso = (ouvidas.size / DADOS.length) * 100
  const estrelas = ouvidas.size >= DADOS.length ? 3 : ouvidas.size >= Math.ceil(DADOS.length * 0.6) ? 2 : ouvidas.size >= Math.ceil(DADOS.length * 0.2) ? 1 : 0

  function handleFalar() {
    if (falando) return
    const idx = currentIndex
    setFalando(true)
    playSound('correct')
    falar(cor)

    if (!ouvidas.has(idx)) {
      const next = new Set(ouvidas)
      next.add(idx)
      setOuvidas(next)
      if (next.size === DADOS.length) {
        setTimeout(() => { setFalando(false); setEncerrado(true) }, 3000)
        return
      }
    }

    setTimeout(() => {
      setFalando(false)
      if (idx < DADOS.length - 1) {
        setAnimIn(false)
        setTimeout(() => { setCurrentIndex(idx + 1); setAnimIn(true) }, 200)
      }
    }, 3000)
  }

  function navegar(dir) {
    const next = currentIndex + dir
    if (next < 0 || next >= DADOS.length) return
    playSound('click')
    setAnimIn(false)
    setTimeout(() => { setCurrentIndex(next); setAnimIn(true) }, 200)
  }

  function irPara(i) {
    if (i === currentIndex) return
    playSound('click')
    setAnimIn(false)
    setTimeout(() => { setCurrentIndex(i); setAnimIn(true) }, 200)
  }

  if (encerrado) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ fontSize: '64px', letterSpacing: '8px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>⭐⭐⭐</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '6px' }}>Parabéns! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você conheceu todas as cores!</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', maxWidth: '360px', width: '100%' }}>
            {DADOS.map((c, i) => (
              <div key={i} style={{ background: c.hex + '25', border: `1px solid ${c.hex}55`, borderRadius: '12px', padding: '10px 4px', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: c.hex, margin: '0 auto 4px', border: '2px solid rgba(0,0,0,0.15)' }} />
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: '700' }}>{c.nome}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button
              onClick={() => { setCurrentIndex(0); setOuvidas(new Set()); setEncerrado(false); setAnimIn(true) }}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              🔁 Repetir
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#D4537E,#f472b6)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(212,83,126,0.4)' }}
            >
              Concluir ✓
            </button>
          </div>
        </div>
      </GameShell>
    )
  }

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`${ouvidas.size} / ${DADOS.length}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{
        maxWidth: '560px', width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        animation: animIn ? 'ns-slide-up 0.3s ease' : 'none',
      }}>

        {/* Color dots navigator */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {DADOS.map((c, i) => (
            <button
              key={i}
              onClick={() => irPara(i)}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                cursor: 'pointer', padding: 0,
                background: c.hex,
                border: i === currentIndex ? '3px solid white' : ouvidas.has(i) ? `2px solid ${c.hex}` : '2px solid rgba(0,0,0,0.2)',
                transition: 'all 0.2s',
                boxShadow: i === currentIndex ? `0 0 14px ${c.hex}80` : 'none',
                transform: i === currentIndex ? 'scale(1.35)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Main card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: '24px', padding: '32px 40px',
          textAlign: 'center', width: '100%',
          border: `1.5px solid ${cor.hex}35`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 60px ${cor.hex}12`,
        }}>
          <div style={{
            width: '150px', height: '150px', borderRadius: '50%',
            backgroundColor: cor.hex,
            border: '4px solid rgba(0,0,0,0.15)',
            margin: '0 auto 16px',
            transition: 'background-color 0.4s ease',
            boxShadow: `0 8px 40px ${cor.hex}60`,
            animation: 'ns-bounce 3s ease-in-out infinite',
          }} />

          <div style={{ fontSize: '36px', marginBottom: '8px' }}>{cor.emoji}</div>

          <div style={{ fontSize: '36px', fontWeight: '900', color: cor.hex, marginBottom: '6px', letterSpacing: '-0.5px', textShadow: `0 0 20px ${cor.hex}50` }}>
            {cor.nome}
          </div>

          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', fontWeight: '600' }}>
            {cor.nome}, {cor.exemplo}
          </div>

          {nivel === 'medio' && (
            <div style={{ marginTop: '12px', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#fdba74', fontWeight: '600', lineHeight: 1.5 }}>
              💡 {cor.funfato}
            </div>
          )}
          {nivel === 'avancado' && (
            <div style={{ marginTop: '12px', background: 'rgba(55,138,221,0.15)', border: '1px solid rgba(55,138,221,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#93c5fd', fontWeight: '600', lineHeight: 1.5 }}>
              🔬 {cor.detalhe}
            </div>
          )}
        </div>

        {/* Stars feedback */}
        {estrelas > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Array.from({ length: estrelas }).map((_, i) => (
              <span key={i} style={{ fontSize: '20px', animation: `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600' }}>
              {ouvidas.size} de {CORES.length} cores ouvidas
            </span>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navegar(-1)}
            disabled={currentIndex === 0}
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.08)', color: 'white',
              fontSize: '20px', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === 0 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            ←
          </button>

          <button
            onClick={handleFalar}
            disabled={falando}
            title="Ouvir o nome da cor"
            style={{
              width: '80px', height: '80px', borderRadius: '50%', border: 'none',
              background: falando
                ? 'rgba(212,83,126,0.35)'
                : `linear-gradient(135deg, ${cor.hex}, ${cor.hex}bb)`,
              color: 'white', fontSize: '32px', cursor: 'pointer',
              boxShadow: falando ? 'none' : `0 8px 28px ${cor.hex}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              transform: falando ? 'scale(0.92)' : 'scale(1)',
            }}
          >
            🔊
          </button>

          <button
            onClick={() => navegar(1)}
            disabled={currentIndex === DADOS.length - 1}
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.08)', color: 'white',
              fontSize: '20px', cursor: currentIndex === DADOS.length - 1 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === DADOS.length - 1 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            →
          </button>
        </div>

        {ouvidas.has(currentIndex) && (
          <div style={{ background: 'rgba(16,185,129,0.12)', borderRadius: '12px', padding: '9px 20px', border: '1px solid rgba(16,185,129,0.3)', animation: 'ns-slide-up 0.25s ease' }}>
            <span style={{ color: '#6ee7b7', fontWeight: '800', fontSize: '13px' }}>✓ Você já ouviu esta cor!</span>
          </div>
        )}
      </div>
    </GameShell>
  )
}
