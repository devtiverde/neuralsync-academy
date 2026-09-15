import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { rotularAreas, pintarArea, areaPerto } from '../../lib/balde'
import '../../styles/crianca.css'

/**
 * Colorir por BALDE DE TINTA, sobre um desenho de traço.
 *
 * O modo antigo (regiões declaradas no dado) continua existindo e é o certo para
 * desenho geométrico. Este aqui é para desenho de livro de colorir de verdade, que
 * é uma imagem: o toque preenche a área fechada onde o dedo caiu.
 *
 * O trabalho pesado — descobrir quais são as áreas — acontece UMA vez, quando a
 * imagem carrega. Depois cada toque é instantâneo. Ver `src/lib/balde.js`.
 */

const PALETA = [
  { nome: 'Vermelho', hex: '#EF4444' },
  { nome: 'Laranja',  hex: '#F97316' },
  { nome: 'Amarelo',  hex: '#FACC15' },
  { nome: 'Verde',    hex: '#22C55E' },
  { nome: 'Azul',     hex: '#3B82F6' },
  { nome: 'Roxo',     hex: '#A855F7' },
  { nome: 'Rosa',     hex: '#EC4899' },
  { nome: 'Marrom',   hex: '#92400E' },
  { nome: 'Preto',    hex: '#374151' },
  { nome: 'Branco',   hex: '#FFFFFF' },
]

const MAX_DESFAZER = 12

export default function ColorirImagem({ atividade, onVoltar }) {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const estado = useRef({ rotulos: null, contaveis: null, original: null, imagem: null })

  const [cor, setCor] = useState(PALETA[0].hex)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [pintadas, setPintadas] = useState(() => new Set())
  const [totalAreas, setTotalAreas] = useState(0)
  const [pilha, setPilha] = useState([])
  const [encerrado, setEncerrado] = useState(false)

  const src = atividade?.dados?.imagem?.src

  // ── carregar o desenho e descobrir as áreas ───────────────────────────────
  useEffect(() => {
    if (!src) { setErro('Este desenho não tem imagem.'); setCarregando(false); return }
    let cancelado = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (cancelado) return
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      // Fundo branco antes do desenho: PNG com transparência viraria "área preta"
      // no cálculo de luminância e o desenho inteiro deixaria de ser pintável.
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)

      const dados = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const { rotulos, total, contaveis } = rotularAreas(dados)
      estado.current = {
        rotulos, contaveis, imagem: dados,
        original: new Uint8ClampedArray(dados.data),
      }
      setTotalAreas(total)
      setCarregando(false)
    }
    img.onerror = () => { if (!cancelado) { setErro('Não deu para carregar o desenho.'); setCarregando(false) } }
    img.src = src
    return () => { cancelado = true }
  }, [src])

  const desenhar = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !estado.current.imagem) return
    canvas.getContext('2d', { willReadFrequently: true }).putImageData(estado.current.imagem, 0, 0)
  }, [])

  // ── um toque ──────────────────────────────────────────────────────────────
  function tocar(ev) {
    const { rotulos, imagem, contaveis } = estado.current
    if (!rotulos || encerrado) return
    const canvas = canvasRef.current
    const r = canvas.getBoundingClientRect()
    const ponto = ev.touches?.[0] ?? ev.changedTouches?.[0] ?? ev
    // O canvas é desenhado esticado; converte da tela para o pixel da imagem.
    const x = (ponto.clientX - r.left) * (canvas.width / r.width)
    const y = (ponto.clientY - r.top) * (canvas.height / r.height)

    const area = areaPerto(rotulos, canvas.width, canvas.height, x, y)
    if (!area) return                       // caiu no traço e não havia área perto

    setPilha(p => [...p.slice(-(MAX_DESFAZER - 1)), new Uint8ClampedArray(imagem.data)])
    pintarArea(imagem, rotulos, area, cor)
    desenhar()
    playSound('click')

    if (contaveis.has(area)) {
      setPintadas(ant => {
        const nova = new Set(ant).add(area)
        if (totalAreas && nova.size >= totalAreas) {
          setTimeout(() => { playSound('complete'); setEncerrado(true) }, 400)
        }
        return nova
      })
    }
  }

  function desfazer() {
    if (!pilha.length) return
    const anterior = pilha[pilha.length - 1]
    estado.current.imagem.data.set(anterior)
    setPilha(p => p.slice(0, -1))
    // O conjunto de áreas pintadas não volta atrás de propósito: a criança desfaz
    // a COR, não o progresso. Tirar a estrelinha de volta seria punição por
    // experimentar, que é justamente o que esta atividade quer estimular.
    desenhar()
  }

  function recomecar() {
    const { original, imagem } = estado.current
    if (!original) return
    imagem.data.set(original)
    setPilha([]); setPintadas(new Set()); setEncerrado(false)
    desenhar()
  }

  useEffect(() => { if (!carregando) desenhar() }, [carregando, desenhar])

  const progresso = totalAreas ? Math.min(100, (pintadas.size / totalAreas) * 100) : 0
  const estrelas = progresso >= 100 ? 3 : progresso >= 60 ? 2 : progresso >= 25 ? 1 : 0

  if (encerrado) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={onVoltar}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
          <div style={{ fontSize: 60 }}>🎨</div>
          <div style={{ fontFamily: 'var(--ns-font-display)', fontSize: 26, color: 'white' }}>Ficou lindo!</div>
          <canvas ref={canvasRef} style={{ width: '100%', maxWidth: 320, borderRadius: 16, background: 'white' }} />
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <button onClick={recomecar} className="ns-alvo-toque"
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: 14, color: 'white', fontWeight: 700, fontSize: 14 }}>
              🔁 Pintar de novo
            </button>
            <button className="ns-alvo-toque"
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#22C55E,#4ade80)', border: 'none', borderRadius: 12, padding: 14, color: 'white', fontWeight: 900, fontSize: 14 }}>
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
      labelProgresso={totalAreas ? `${pintadas.size} / ${totalAreas}` : '—'}
      onVoltar={onVoltar}
    >
      <div style={{ maxWidth: 560, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>

        {erro && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 12, padding: '14px 16px', color: '#fca5a5', fontWeight: 600, fontSize: 14 }}>
            {erro}
          </div>
        )}

        {carregando && !erro && (
          <div style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, padding: 30 }}>
            Preparando o desenho…
          </div>
        )}

        {/* A folha. `touchAction: none` impede a página de rolar quando o dedo
            encosta para pintar — sem isso a criança arrasta a tela sem querer. */}
        <div style={{ width: '100%', background: 'white', borderRadius: 18, padding: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.3)', display: carregando || erro ? 'none' : 'block' }}>
          <canvas
            ref={canvasRef}
            onClick={tocar}
            onTouchStart={ev => { ev.preventDefault(); tocar(ev) }}
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12, cursor: 'pointer', touchAction: 'none' }}
          />
        </div>

        {estrelas > 0 && (
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 700 }}>
            {'⭐'.repeat(estrelas)} {pintadas.size} de {totalAreas} áreas pintadas
          </div>
        )}

        {/* Paleta */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PALETA.map(c => (
            <button
              key={c.hex}
              onClick={() => setCor(c.hex)}
              title={c.nome}
              aria-label={c.nome}
              className="ns-alvo-toque"
              style={{
                width: 44, height: 44, borderRadius: '50%', padding: 0, cursor: 'pointer',
                background: c.hex,
                border: cor === c.hex ? '3px solid white' : '2px solid rgba(0,0,0,0.25)',
                transform: cor === c.hex ? 'scale(1.15)' : 'scale(1)',
                boxShadow: cor === c.hex ? `0 0 14px ${c.hex}90` : 'none',
                transition: 'transform .15s, box-shadow .15s',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={desfazer} disabled={!pilha.length} className="ns-alvo-toque"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 18px', color: 'white', fontWeight: 700, fontSize: 13, opacity: pilha.length ? 1 : 0.4 }}>
            ↩️ Desfazer
          </button>
          <button onClick={recomecar} className="ns-alvo-toque"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 18px', color: 'white', fontWeight: 700, fontSize: 13 }}>
            🧽 Limpar
          </button>
        </div>
      </div>
    </GameShell>
  )
}
