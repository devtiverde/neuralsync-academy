import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

function falarTTS(texto) {
  if (!window.speechSynthesis) return
  const utt = new SpeechSynthesisUtterance(texto)
  utt.lang = 'pt-BR'
  utt.rate = 0.8
  utt.pitch = 1.1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utt)
}

function embaralhar(silabas) {
  const fichas = silabas.map((texto, fichaId) => ({ fichaId, texto }))
  for (let i = fichas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[fichas[i], fichas[j]] = [fichas[j], fichas[i]]
  }
  return fichas
}

export default function SilabasAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slots, setSlots] = useState([])
  const [fichas, setFichas] = useState([])
  const [fichasUsadas, setFichasUsadas] = useState(new Set())
  const [acertos, setAcertos] = useState(new Set())
  const [erro, setErro] = useState(false)
  const [travado, setTravado] = useState(false)
  const [encerrado, setEncerrado] = useState(false)

  useEffect(() => { if (!atividade) navigate(-1) }, [])

  const palavras = atividade?.dados?.palavras || []
  const total = palavras.length
  const atual = palavras[currentIndex]

  useEffect(() => {
    if (!atual) return
    setSlots(Array(atual.silabas.length).fill(null))
    setFichas(embaralhar(atual.silabas))
    setFichasUsadas(new Set())
  }, [currentIndex, atividade])

  if (!atividade) return null

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

  const progresso = total ? (acertos.size / total) * 100 : 0
  const limiar3 = Math.ceil(total * 0.9)
  const limiar2 = Math.ceil(total * 0.6)
  const limiar1 = Math.ceil(total * 0.3)
  const estrelas = acertos.size >= limiar3 ? 3 : acertos.size >= limiar2 ? 2 : acertos.size >= limiar1 ? 1 : 0

  function handleFicha(ficha) {
    if (travado || fichasUsadas.has(ficha.fichaId)) return
    falarTTS(ficha.texto)
    playSound('click')

    const proximoVazio = slots.findIndex(s => s === null)
    if (proximoVazio === -1) return

    const novosSlots = [...slots]
    novosSlots[proximoVazio] = ficha.texto
    const novasUsadas = new Set(fichasUsadas)
    novasUsadas.add(ficha.fichaId)
    setSlots(novosSlots)
    setFichasUsadas(novasUsadas)

    if (proximoVazio === slots.length - 1) {
      setTravado(true)
      const correta = novosSlots.every((s, i) => s === atual.silabas[i])
      if (correta) {
        setTimeout(() => { playSound('correct'); falarTTS(atual.palavra) }, 300)
        setTimeout(() => {
          const novoAcertos = new Set(acertos)
          novoAcertos.add(currentIndex)
          setAcertos(novoAcertos)
          if (currentIndex < total - 1) {
            setCurrentIndex(currentIndex + 1)
            setTravado(false)
          } else {
            playSound('complete')
            setEncerrado(true)
          }
        }, 1800)
      } else {
        setErro(true)
        playSound('wrong')
        setTimeout(() => {
          setErro(false)
          setSlots(Array(atual.silabas.length).fill(null))
          setFichasUsadas(new Set())
          setTravado(false)
        }, 900)
      }
    }
  }

  if (encerrado) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ fontSize: '64px', letterSpacing: '8px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>🔡⭐🔡</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '6px' }}>Você é craque! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você montou todas as {total} palavras!</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(4, total)}, 1fr)`, gap: '8px', maxWidth: '400px', width: '100%' }}>
            {palavras.map((p, i) => (
              <div key={i} style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.35)', borderRadius: '12px', padding: '10px 4px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '2px' }}>{p.emoji}</div>
                <div style={{ color: '#67e8f9', fontWeight: '900', fontSize: '13px' }}>{p.palavra}</div>
              </div>
            ))}
          </div>

          {estrelas > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {Array.from({ length: estrelas }).map((_, i) => (
                <span key={i} style={{ fontSize: '24px', animation: `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button
              onClick={() => { setCurrentIndex(0); setAcertos(new Set()); setEncerrado(false) }}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              🔁 Repetir
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#06B6D4,#67e8f9)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(6,182,212,0.4)' }}
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
      labelProgresso={`${acertos.size} / ${total}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{ maxWidth: '520px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>

        <div style={{ fontSize: '80px', lineHeight: 1 }}>{atual.emoji}</div>

        <button
          onClick={() => falarTTS(atual.palavra)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.35)',
            borderRadius: '99px', padding: '8px 18px', color: '#67e8f9', fontWeight: '700', fontSize: '13px',
            cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
        >
          🔊 Ouvir palavra
        </button>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', animation: erro ? 'ns-silabas-shake 0.4s ease' : 'none' }}>
          {slots.map((s, i) => (
            <div key={i} style={{
              minWidth: '64px', height: '64px', borderRadius: '14px', padding: '0 10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: s ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.06)',
              border: s ? '2px solid #06B6D4' : '2px dashed rgba(255,255,255,0.2)',
              color: 'white', fontWeight: '900', fontSize: '22px', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              {s || ''}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {fichas.map(f => (
            <button
              key={f.fichaId}
              onClick={() => handleFicha(f)}
              disabled={fichasUsadas.has(f.fichaId) || travado}
              style={{
                minWidth: '64px', height: '64px', padding: '0 12px', borderRadius: '14px',
                background: fichasUsadas.has(f.fichaId) ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg,#06B6D4,#67e8f9)',
                border: 'none', color: fichasUsadas.has(f.fichaId) ? 'rgba(255,255,255,0.15)' : 'white',
                fontWeight: '900', fontSize: '22px', fontFamily: 'Plus Jakarta Sans, sans-serif',
                cursor: fichasUsadas.has(f.fichaId) || travado ? 'not-allowed' : 'pointer',
                opacity: fichasUsadas.has(f.fichaId) ? 0.35 : 1,
                boxShadow: fichasUsadas.has(f.fichaId) ? 'none' : '0 6px 16px rgba(6,182,212,0.35)',
                transition: 'all 0.15s',
              }}
            >
              {f.texto}
            </button>
          ))}
        </div>

        {estrelas > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Array.from({ length: estrelas }).map((_, i) => (
              <span key={i} style={{ fontSize: '18px' }}>⭐</span>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600' }}>{acertos.size} de {total} palavras montadas</span>
          </div>
        )}
      </div>
    </GameShell>
  )
}
