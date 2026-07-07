import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

const NUMEROS_DEFAULT = [
  { n: 1,  word: 'Um',     emoji: '⭐', cor: '#7F77DD' },
  { n: 2,  word: 'Dois',   emoji: '🍎', cor: '#D85A30' },
  { n: 3,  word: 'Três',   emoji: '🌺', cor: '#EF9F27' },
  { n: 4,  word: 'Quatro', emoji: '🌸', cor: '#D4537E' },
  { n: 5,  word: 'Cinco',  emoji: '🦋', cor: '#1D9E75' },
  { n: 6,  word: 'Seis',   emoji: '🍊', cor: '#D85A30' },
  { n: 7,  word: 'Sete',   emoji: '🌟', cor: '#7F77DD' },
  { n: 8,  word: 'Oito',   emoji: '🐸', cor: '#1D9E75' },
  { n: 9,  word: 'Nove',   emoji: '🌈', cor: '#D4537E' },
  { n: 10, word: 'Dez',    emoji: '🎉', cor: '#EF9F27' },
]

function falarTTS(palavra) {
  if (!window.speechSynthesis) return
  const utt = new SpeechSynthesisUtterance(palavra)
  utt.lang = 'pt-BR'
  utt.rate = 0.85
  utt.pitch = 1.1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utt)
}

function falar(numero, atividadeId, temTema, indice) {
  // atividades temáticas usam o índice como chave (não o "n") porque várias reaproveitam
  // o mesmo n pra entradas diferentes (frações com numerador 1, negativos e positivos etc.)
  const caminho = temTema
    ? `/audio/numeros/_temas/${atividadeId}/${indice}.mp3`
    : `/audio/numeros/${numero.n}.mp3`
  const audio = new Audio(caminho)
  audio.addEventListener('error', () => falarTTS(numero.word))
  audio.play().catch(() => falarTTS(numero.word))
}

export default function NumerosAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ouvidos, setOuvidos] = useState(new Set())
  const [encerrado, setEncerrado] = useState(false)
  const [animIn, setAnimIn] = useState(true)
  const [falando, setFalando] = useState(false)

  useEffect(() => { if (!atividade) navigate(-1) }, [])
  if (!atividade) return null

  const numerosData = atividade?.dados?.numeros || NUMEROS_DEFAULT
  const total = numerosData.length

  const kidsLink = getKidsLink(atividade.id)
  if (!iniciou) return (
    <IntroAtividade
      atividade={atividade}
      onComecar={() => setIniciou(true)}
      onVoltar={() => navigate(-1)}
      refazendo={state?.refazendo}
      kidsLink={kidsLink}
    />
  )

  const numero = numerosData[currentIndex]
  const progresso = (ouvidos.size / total) * 100
  const limiar3 = Math.ceil(total * 0.9)
  const limiar2 = Math.ceil(total * 0.6)
  const limiar1 = Math.ceil(total * 0.3)
  const estrelas = ouvidos.size >= limiar3 ? 3 : ouvidos.size >= limiar2 ? 2 : ouvidos.size >= limiar1 ? 1 : 0

  function handleFalar() {
    if (falando) return
    const idx = currentIndex
    setFalando(true)
    playSound('correct')
    falar(numero, atividade.id, !!atividade?.dados?.numeros, currentIndex)

    if (!ouvidos.has(idx)) {
      const next = new Set(ouvidos)
      next.add(idx)
      setOuvidos(next)
      if (next.size === total) {
        setTimeout(() => { setFalando(false); setEncerrado(true) }, 3000)
        return
      }
    }

    setTimeout(() => {
      setFalando(false)
      if (idx < total - 1) {
        setAnimIn(false)
        setTimeout(() => { setCurrentIndex(idx + 1); setAnimIn(true) }, 200)
      }
    }, 3000)
  }

  function navegar(dir) {
    const next = currentIndex + dir
    if (next < 0 || next >= total) return
    playSound('click')
    setAnimIn(false)
    setTimeout(() => { setCurrentIndex(next); setAnimIn(true) }, 200)
  }

  if (encerrado) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ fontSize: '64px', letterSpacing: '8px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>⭐⭐⭐</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '6px' }}>Parabéns! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você ouviu todos os {total} itens!</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(5, total)}, 1fr)`, gap: '8px', maxWidth: '400px', width: '100%' }}>
            {numerosData.map((n, i) => (
              <div key={i} style={{ background: n.cor + '25', border: `1px solid ${n.cor}55`, borderRadius: '12px', padding: '10px 4px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', marginBottom: '2px' }}>{n.emoji}</div>
                <div style={{ color: n.cor, fontWeight: '900', fontSize: '16px' }}>{n.display || n.n}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '700' }}>{n.word}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button
              onClick={() => { setCurrentIndex(0); setOuvidos(new Set()); setEncerrado(false); setAnimIn(true) }}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              🔁 Repetir
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#7F77DD,#a78bfa)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(127,119,221,0.4)' }}
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
      labelProgresso={`${ouvidos.size} / ${total}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{
        maxWidth: '560px', width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        animation: animIn ? 'ns-slide-up 0.3s ease' : 'none',
      }}>

        {/* Dots navigator */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {numerosData.map((n, i) => (
            <button
              key={i}
              onClick={() => { if (i !== currentIndex) navegar(i - currentIndex) }}
              style={{
                width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                cursor: 'pointer', fontWeight: '900', fontSize: '11px', color: 'white',
                background: i === currentIndex ? n.cor : ouvidos.has(i) ? n.cor + '55' : 'rgba(255,255,255,0.1)',
                transition: 'all 0.2s',
                boxShadow: i === currentIndex ? `0 0 14px ${n.cor}80` : 'none',
                transform: i === currentIndex ? 'scale(1.3)' : 'scale(1)',
              }}
            >
              {ouvidos.has(i) ? '✓' : (n.display || n.n)}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: '24px', padding: '32px 40px',
          textAlign: 'center', width: '100%',
          border: `1.5px solid ${numero.cor}35`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 60px ${numero.cor}12`,
        }}>
          {/* Big display */}
          <div style={{
            fontSize: '96px', fontWeight: '900', color: numero.cor, lineHeight: 1,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textShadow: `0 0 40px ${numero.cor}50`,
            animation: 'ns-bounce 3s ease-in-out infinite',
            marginBottom: '4px',
          }}>
            {numero.display || numero.n}
          </div>

          {/* Word */}
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            {numero.word}
          </div>

          {/* Emoji grid — only shown when n is numeric and positive */}
          {typeof numero.n === 'number' && numero.n > 0 && numero.n <= 20 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', minHeight: '72px', alignItems: 'center' }}>
              {Array.from({ length: numero.n }).map((_, i) => (
                <span
                  key={`${currentIndex}-${i}`}
                  style={{
                    fontSize: '30px', lineHeight: 1,
                    display: 'inline-block',
                    animation: `ns-slide-up 0.25s ease ${i * 0.07}s both`,
                  }}
                >
                  {numero.emoji}
                </span>
              ))}
            </div>
          )}

          {/* Fun fact / context — for non-default items with extra info */}
          {numero.funfato && (
            <div style={{ marginTop: '16px', background: 'rgba(127,119,221,0.12)', borderRadius: '12px', padding: '10px 14px', border: '1px solid rgba(127,119,221,0.25)', textAlign: 'left' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.5' }}>{numero.funfato}</span>
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
              {ouvidos.size} de {total} ouvidos
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
            title="Ouvir o nome"
            style={{
              width: '80px', height: '80px', borderRadius: '50%', border: 'none',
              background: falando
                ? 'rgba(127,119,221,0.35)'
                : `linear-gradient(135deg, ${numero.cor}, ${numero.cor}bb)`,
              color: 'white', fontSize: '32px', cursor: 'pointer',
              boxShadow: falando ? 'none' : `0 8px 28px ${numero.cor}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              transform: falando ? 'scale(0.92)' : 'scale(1)',
            }}
          >
            🔊
          </button>

          <button
            onClick={() => navegar(1)}
            disabled={currentIndex === total - 1}
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.08)', color: 'white',
              fontSize: '20px', cursor: currentIndex === total - 1 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === total - 1 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            →
          </button>
        </div>

        {/* Heard confirmation badge */}
        {ouvidos.has(currentIndex) && (
          <div style={{ background: 'rgba(16,185,129,0.12)', borderRadius: '12px', padding: '9px 20px', border: '1px solid rgba(16,185,129,0.3)', animation: 'ns-slide-up 0.25s ease' }}>
            <span style={{ color: '#6ee7b7', fontWeight: '800', fontSize: '13px' }}>✓ Você já ouviu este item!</span>
          </div>
        )}
      </div>
    </GameShell>
  )
}
