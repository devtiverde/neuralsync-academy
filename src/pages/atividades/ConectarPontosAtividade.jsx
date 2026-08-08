import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'

const ATIVIDADE = {
  id: 'conectar-pontos',
  tipo: 'conectar-pontos',
  emoji: '✏️',
  titulo: 'Conectar os Pontos',
  habilidade: 'Coordenação e Sequência',
  historinha: 'O desenhista mágico precisa da sua ajuda! Conecte os pontos na ordem certa para revelar o desenho escondido.',
  tempo_estimado: 3,
  xp_reward: 70,
  coins_reward: 10,
}

const DESENHOS = [
  {
    nome: 'estrela',
    emoji: '⭐',
    total: 11,
    pontos: [
      { n: 1,  x: 200, y: 40  },
      { n: 2,  x: 234, y: 138 },
      { n: 3,  x: 338, y: 140 },
      { n: 4,  x: 255, y: 203 },
      { n: 5,  x: 285, y: 302 },
      { n: 6,  x: 200, y: 243 },
      { n: 7,  x: 115, y: 302 },
      { n: 8,  x: 145, y: 203 },
      { n: 9,  x: 62,  y: 140 },
      { n: 10, x: 166, y: 138 },
      { n: 11, x: 200, y: 40  },
    ],
  },
  {
    nome: 'casa',
    emoji: '🏠',
    total: 10,
    pontos: [
      { n: 1,  x: 200, y: 60  },
      { n: 2,  x: 320, y: 160 },
      { n: 3,  x: 320, y: 320 },
      { n: 4,  x: 240, y: 320 },
      { n: 5,  x: 240, y: 240 },
      { n: 6,  x: 160, y: 240 },
      { n: 7,  x: 160, y: 320 },
      { n: 8,  x: 80,  y: 320 },
      { n: 9,  x: 80,  y: 160 },
      { n: 10, x: 200, y: 60  },
    ],
  },
  {
    nome: 'coração',
    emoji: '❤️',
    total: 11,
    pontos: [
      { n: 1,  x: 200, y: 300 },
      { n: 2,  x: 80,  y: 180 },
      { n: 3,  x: 60,  y: 120 },
      { n: 4,  x: 100, y: 70  },
      { n: 5,  x: 150, y: 60  },
      { n: 6,  x: 200, y: 90  },
      { n: 7,  x: 250, y: 60  },
      { n: 8,  x: 300, y: 70  },
      { n: 9,  x: 340, y: 120 },
      { n: 10, x: 320, y: 180 },
      { n: 11, x: 200, y: 300 },
    ],
  },
]

const CANVAS_W = 400
const CANVAS_H = 400

export default function ConectarPontosAtividade() {
  const navigate   = useNavigate()
  const canvasRef  = useRef(null)
  const inicioRef  = useRef(null)
  const flashRef   = useRef(null) // { idx, until }

  const [iniciou,      setIniciou]      = useState(false)
  const [desenho,      setDesenho]      = useState(null)
  const [conectados,   setConectados]   = useState(0)   // quantos já conectados
  const [completo,     setCompleto]     = useState(false)
  const [erroIdx,      setErroIdx]      = useState(null)
  const [estrelas,     setEstrelas]     = useState(0)

  const escolherDesenho = useCallback(() => {
    const d = DESENHOS[Math.floor(Math.random() * DESENHOS.length)]
    setDesenho(d)
    setConectados(0)
    setCompleto(false)
    setErroIdx(null)
    inicioRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (iniciou) escolherDesenho()
  }, [iniciou, escolherDesenho])

  // Redesenha canvas a cada mudança de estado
  useEffect(() => {
    if (!desenho || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

    const pontos    = desenho.pontos
    const totalPts  = pontos.length

    // Linhas já traçadas
    if (conectados > 1) {
      ctx.beginPath()
      ctx.strokeStyle = '#7C3AED'
      ctx.lineWidth   = 3
      ctx.lineCap     = 'round'
      ctx.lineJoin    = 'round'
      for (let i = 0; i < conectados - 1; i++) {
        ctx.moveTo(pontos[i].x, pontos[i].y)
        ctx.lineTo(pontos[i + 1].x, pontos[i + 1].y)
      }
      // Fechar o shape quando completo (caso o último ponto não coincida com o primeiro)
      if (completo) {
        const last = pontos[totalPts - 1]
        const first = pontos[0]
        if (last.x !== first.x || last.y !== first.y) {
          ctx.moveTo(last.x, last.y)
          ctx.lineTo(first.x, first.y)
        }
      }
      ctx.stroke()
    }

    // Pontos
    for (let i = 0; i < totalPts; i++) {
      const p         = pontos[i]
      const conectado = i < conectados
      const eProximo  = i === conectados
      const erro      = erroIdx === i

      ctx.beginPath()
      ctx.arc(p.x, p.y, 14, 0, Math.PI * 2)

      if (conectado) {
        ctx.fillStyle = '#10B981'
        ctx.fill()
        // checkmark
        ctx.strokeStyle = 'white'
        ctx.lineWidth   = 2.5
        ctx.beginPath()
        ctx.moveTo(p.x - 5, p.y)
        ctx.lineTo(p.x - 1, p.y + 5)
        ctx.lineTo(p.x + 6, p.y - 5)
        ctx.stroke()
      } else if (erro) {
        ctx.fillStyle = '#EF4444'
        ctx.fill()
        ctx.strokeStyle = '#FCA5A5'
        ctx.lineWidth   = 2
        ctx.stroke()
      } else if (eProximo && !completo) {
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.strokeStyle = '#A78BFA'
        ctx.lineWidth   = 3
        ctx.stroke()
        // número
        ctx.fillStyle   = '#1e1b4b'
        ctx.font        = 'bold 13px "Space Grotesk", sans-serif'
        ctx.textAlign   = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.n, p.x, p.y)
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'
        ctx.lineWidth   = 1.5
        ctx.stroke()
        ctx.fillStyle   = 'white'
        ctx.font        = 'bold 12px "Space Grotesk", sans-serif'
        ctx.textAlign   = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.n, p.x, p.y)
      }
    }

    // Emoji central se completou
    if (completo) {
      ctx.font         = '80px serif'
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(desenho.emoji, CANVAS_W / 2, CANVAS_H / 2)
    }
  }, [desenho, conectados, completo, erroIdx])

  const handleCanvasClick = useCallback((e) => {
    if (!desenho || completo) return
    const rect  = canvasRef.current.getBoundingClientRect()
    const scaleX = CANVAS_W / rect.width
    const scaleY = CANVAS_H / rect.height
    const cx    = (e.clientX - rect.left) * scaleX
    const cy    = (e.clientY - rect.top)  * scaleY
    const pontos = desenho.pontos

    const proximoIdx = conectados
    if (proximoIdx >= pontos.length) return

    // Distância para o ponto correto
    const alvo = pontos[proximoIdx]
    const dx   = cx - alvo.x
    const dy   = cy - alvo.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 35) {
      const novosConectados = conectados + 1
      setConectados(novosConectados)
      setErroIdx(null)

      if (novosConectados >= pontos.length) {
        setCompleto(true)
        const tempo  = Math.round((Date.now() - inicioRef.current) / 1000)
        const stars  = tempo <= 30 ? 3 : tempo <= 60 ? 2 : 1
        setEstrelas(stars)
      }
      return
    }

    // Clicou perto de ponto errado?
    for (let i = 0; i < pontos.length; i++) {
      if (i === proximoIdx) continue
      const p    = pontos[i]
      const ddx  = cx - p.x
      const ddy  = cy - p.y
      if (Math.sqrt(ddx * ddx + ddy * ddy) < 35) {
        setErroIdx(i)
        setTimeout(() => setErroIdx(null), 300)
        return
      }
    }
  }, [desenho, conectados, completo])

  const handleVerResultado = useCallback(() => {
    const tempo  = Math.round((Date.now() - inicioRef.current) / 1000)
    const xp     = estrelas === 3 ? 70 : estrelas === 2 ? 50 : 35
    navigate('/encerramento', {
      state: {
        xp,
        coins: estrelas * 4,
        titulo: ATIVIDADE.titulo,
        emoji: ATIVIDADE.emoji,
        tipo: ATIVIDADE.tipo,
        atividade_id: ATIVIDADE.id,
      },
    })
  }, [estrelas, desenho, navigate])

  if (!iniciou) {
    return (
      <IntroAtividade
        atividade={ATIVIDADE}
        onComecar={() => setIniciou(true)}
        onVoltar={() => navigate('/home-crianca')}
      />
    )
  }

  const progresso = desenho
    ? Math.round((conectados / desenho.pontos.length) * 100)
    : 0

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0a1e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'Nunito, sans-serif',
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 style={{ color: 'white', fontFamily: 'var(--ns-font-display)', fontSize: 28, margin: '0 0 4px' }}>
          {completo ? `${desenho?.emoji} Perfeito!` : `Desenhe: ${desenho?.emoji} ${desenho?.nome}`}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: 0 }}>
          {completo
            ? 'Você conectou todos os pontos!'
            : `Ponto ${Math.min(conectados + 1, desenho?.pontos.length ?? 1)} de ${desenho?.pontos.length ?? 0}`}
        </p>
      </div>

      {/* Barra de progresso */}
      <div style={{
        width: '100%', maxWidth: 420, height: 6,
        background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 16,
      }}>
        <div style={{
          width: `${progresso}%`, height: '100%',
          background: 'linear-gradient(90deg, #7C3AED, #a78bfa)',
          borderRadius: 3, transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onClick={handleCanvasClick}
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: completo ? 'default' : 'crosshair',
          maxWidth: '100%',
          touchAction: 'manipulation',
        }}
      />

      {/* Saída durante o jogo: antes disto só dava pra sair depois de completar */}
      {!completo && (
        <button
          onClick={() => navigate('/home-crianca')}
          style={{ marginTop: 24, background: 'transparent', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 20px', fontSize: 13, cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}
        >
          ← Sair da atividade
        </button>
      )}

      {/* Resultado após completar */}
      {completo && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>
            {'⭐'.repeat(estrelas)}{'☆'.repeat(3 - estrelas)}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <button
              onClick={escolherDesenho}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 16,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Jogar de novo
            </button>
            <button
              onClick={handleVerResultado}
              style={{
                background: 'var(--ns-violet, #7C3AED)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 16,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Ver resultado
            </button>
          </div>
        </div>
      )}

      {/* Instrução */}
      {!completo && (
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 13,
          marginTop: 16,
          textAlign: 'center',
        }}>
          Toque no ponto {conectados + 1} para continuar
        </p>
      )}
    </div>
  )
}
