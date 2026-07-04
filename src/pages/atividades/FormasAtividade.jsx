import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

const FORMAS_DEFAULT = [
  { id: 'circulo',   nome: 'Círculo',   cor: '#7F77DD', svg: 'circle',   frase: 'O círculo é redondo!',            funfato: 'Rodas, moedas, pratos, o Sol e a Lua são círculos — é a forma mais comum na natureza!', detalhe: 'Área = πr² | Perímetro = 2πr | Infinitos lados de mesmo comprimento' },
  { id: 'quadrado',  nome: 'Quadrado',  cor: '#D85A30', svg: 'square',   frase: 'O quadrado tem 4 lados iguais!',  funfato: 'Casas, janelas, TVs, ladrilhos e tabuleiros de xadrez usam o quadrado!',                detalhe: 'Polígono regular com 4 lados iguais | Ângulos de 90° | Área = l²' },
  { id: 'triangulo', nome: 'Triângulo', cor: '#EF9F27', svg: 'triangle', frase: 'O triângulo tem 3 pontas!',       funfato: 'Pontes e telhados usam triângulos porque são a forma mais resistente que existe!',      detalhe: 'Soma dos ângulos internos = 180° | Tipos: equilátero, isósceles, escaleno' },
  { id: 'retangulo', nome: 'Retângulo', cor: '#1D9E75', svg: 'rect',     frase: 'O retângulo é alongado!',         funfato: 'Livros, portas, folhas de papel, mesas e celulares têm formato de retângulo!',          detalhe: 'Lados opostos iguais | Área = base × altura | Ângulos de 90°' },
  { id: 'oval',      nome: 'Oval',      cor: '#D4537E', svg: 'oval',     frase: 'A oval parece um ovo!',           funfato: 'Pistas de atletismo, espelhos de banheiro e ovos são exemplos de forma oval!',          detalhe: 'Elipse com eixo maior e menor | Área = π × a × b' },
  { id: 'estrela',   nome: 'Estrela',   cor: '#EF9F27', svg: 'star',     frase: 'A estrela brilha no céu!',        funfato: 'A forma de estrela aparece nas bandeiras de mais de 50 países do mundo!',               detalhe: 'Polígono não-convexo | 5 vértices externos + 5 internos | Forma côncava' },
  { id: 'losango',   nome: 'Losango',   cor: '#534AB7', svg: 'diamond',  frase: 'O losango parece uma pipa!',      funfato: 'Pipas, campos de baseball e o naipe de ouros do baralho têm formato de losango!',       detalhe: 'Paralelogramo com 4 lados iguais | Diagonais perpendiculares | Área = (d1 × d2)/2' },
  { id: 'hexagono',  nome: 'Hexágono',  cor: '#1D9E75', svg: 'hex',      frase: 'O hexágono tem 6 lados!',         funfato: 'Abelhas constroem colmeias em hexágonos para economizar espaço e cera!',                detalhe: 'Polígono regular de 6 lados | Ângulos de 120° | Padrão natural das colmeias' },
]

function detectFaixa(id = '') {
  if (id.startsWith('cri_') || id.startsWith('inv_')) return 'avancado'
  if (id.startsWith('con_')) return 'medio'
  return 'basico'
}

function starPoints(cx, R, r, n) {
  const pts = []
  for (let i = 0; i < n * 2; i++) {
    const angle = (Math.PI / n) * i - Math.PI / 2
    const radius = i % 2 === 0 ? R : r
    pts.push(`${cx + radius * Math.cos(angle)},${cx + radius * Math.sin(angle)}`)
  }
  return pts.join(' ')
}

function nGonPoints(cx, R, n, offsetAngle = -Math.PI / 2) {
  return Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI / n) * i + offsetAngle
    return `${cx + R * Math.cos(a)},${cx + R * Math.sin(a)}`
  }).join(' ')
}

function hexPoints(cx, R) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + R * Math.cos(a)},${cx + R * Math.sin(a)}`
  }).join(' ')
}

function FormaShape({ type, cor, size = 180, emojiChar }) {
  const s = size
  const c = s / 2

  if (type === 'emoji') {
    return (
      <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.6, lineHeight: 1 }}>
        {emojiChar}
      </div>
    )
  }

  if (type && type.startsWith('polygon_')) {
    const n = parseInt(type.split('_')[1], 10)
    const pts = nGonPoints(c, c * 0.85, n)
    return (
      <svg width={size} height={size} viewBox={`0 0 ${s} ${s}`} aria-hidden="true">
        <polygon points={pts} fill={cor} />
      </svg>
    )
  }

  const shapes = {
    circle:   <circle cx={c} cy={c} r={c * 0.85} fill={cor} />,
    square:   <rect x={s*0.08} y={s*0.08} width={s*0.84} height={s*0.84} rx={s*0.06} fill={cor} />,
    triangle: <polygon points={`${c},${s*0.08} ${s*0.92},${s*0.92} ${s*0.08},${s*0.92}`} fill={cor} />,
    rect:     <rect x={s*0.04} y={s*0.22} width={s*0.92} height={s*0.56} rx={s*0.05} fill={cor} />,
    oval:     <ellipse cx={c} cy={c} rx={c*0.9} ry={c*0.6} fill={cor} />,
    star:     <polygon points={starPoints(c, c*0.82, c*0.38, 5)} fill={cor} />,
    diamond:  <polygon points={`${c},${s*0.06} ${s*0.92},${c} ${c},${s*0.94} ${s*0.08},${c}`} fill={cor} />,
    hex:      <polygon points={hexPoints(c, c*0.84)} fill={cor} />,
    // wide rect for simetria demonstration
    wideRect: <rect x={s*0.04} y={s*0.3} width={s*0.92} height={s*0.4} rx={s*0.05} fill={cor} />,
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${s} ${s}`} aria-hidden="true">
      {shapes[type] || <circle cx={c} cy={c} r={c * 0.7} fill={cor} />}
    </svg>
  )
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

function falar(forma) {
  const texto = `${forma.nome}. ${forma.frase}`
  // só usa a gravação quando id+frase batem com o padrão (círculo, quadrado...) — sets
  // temáticos (animais, alimentos etc.) reaproveitam o mesmo id com frase diferente
  const padrao = FORMAS_DEFAULT.find(x => x.id === forma.id)
  if (padrao && padrao.frase === forma.frase) {
    const audio = new Audio(`/audio/formas/${forma.id}.mp3`)
    audio.addEventListener('error', () => falarTTS(texto))
    audio.play().catch(() => falarTTS(texto))
    return
  }
  falarTTS(texto)
}

export default function FormasAtividade() {
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

  const formasData = atividade?.dados?.formas || FORMAS_DEFAULT
  const total = formasData.length
  const nivel = detectFaixa(atividade.id)
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

  const forma = formasData[currentIndex]
  const progresso = (ouvidas.size / total) * 100
  const limiar3 = total
  const limiar2 = Math.ceil(total * 0.6)
  const limiar1 = Math.ceil(total * 0.3)
  const estrelas = ouvidas.size >= limiar3 ? 3 : ouvidas.size >= limiar2 ? 2 : ouvidas.size >= limiar1 ? 1 : 0

  function handleFalar() {
    if (falando) return
    const idx = currentIndex
    setFalando(true)
    playSound('correct')
    falar(forma)

    if (!ouvidas.has(idx)) {
      const next = new Set(ouvidas)
      next.add(idx)
      setOuvidas(next)
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
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você conheceu todas as {total} formas!</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(4, total)}, 1fr)`, gap: '8px', maxWidth: '380px', width: '100%' }}>
            {formasData.map((f, i) => (
              <div key={i} style={{ background: f.cor + '25', border: `1px solid ${f.cor}55`, borderRadius: '12px', padding: '12px 4px', textAlign: 'center' }}>
                <FormaShape type={f.svg} cor={f.cor} size={44} emojiChar={f.emoji} />
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: '700', marginTop: '4px' }}>{f.nome}</div>
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
      labelProgresso={`${ouvidas.size} / ${total}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{
        maxWidth: '560px', width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        animation: animIn ? 'ns-slide-up 0.3s ease' : 'none',
      }}>

        {/* Dots navigator */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {formasData.map((f, i) => (
            <button
              key={i}
              onClick={() => irPara(i)}
              style={{
                width: '40px', height: '40px', borderRadius: '10px', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: i === currentIndex ? f.cor : ouvidas.has(i) ? f.cor + '55' : 'rgba(255,255,255,0.1)',
                transition: 'all 0.2s',
                boxShadow: i === currentIndex ? `0 0 14px ${f.cor}80` : 'none',
                transform: i === currentIndex ? 'scale(1.2)' : 'scale(1)',
                fontSize: f.svg === 'emoji' ? '18px' : undefined,
              }}
            >
              {f.svg === 'emoji'
                ? (ouvidas.has(i) ? '✓' : f.emoji)
                : <FormaShape type={f.svg} cor={i === currentIndex || ouvidas.has(i) ? 'white' : f.cor} size={22} emojiChar={f.emoji} />
              }
            </button>
          ))}
        </div>

        {/* Main card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: '24px', padding: '32px 40px',
          textAlign: 'center', width: '100%',
          border: `1.5px solid ${forma.cor}35`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 60px ${forma.cor}12`,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'center', marginBottom: '16px',
            filter: `drop-shadow(0 0 30px ${forma.cor}60)`,
            animation: 'ns-bounce 3s ease-in-out infinite',
          }}>
            <FormaShape type={forma.svg} cor={forma.cor} size={140} emojiChar={forma.emoji} />
          </div>

          <div style={{ fontSize: '32px', fontWeight: '900', color: forma.cor, marginBottom: '8px', letterSpacing: '-0.5px', textShadow: `0 0 20px ${forma.cor}50` }}>
            {forma.nome}
          </div>

          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontWeight: '600', lineHeight: 1.5 }}>
            {forma.frase}
          </div>

          {nivel === 'medio' && forma.funfato && (
            <div style={{ marginTop: '12px', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#fdba74', fontWeight: '600', lineHeight: 1.5, textAlign: 'left' }}>
              💡 {forma.funfato}
            </div>
          )}
          {nivel === 'avancado' && (forma.detalhe || forma.funfato) && (
            <div style={{ marginTop: '12px', background: 'rgba(127,119,221,0.15)', border: '1px solid rgba(127,119,221,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#c4b5fd', fontWeight: '600', lineHeight: 1.5, textAlign: 'left' }}>
              🔬 {forma.detalhe || forma.funfato}
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
              {ouvidas.size} de {total} formas ouvidas
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
            title="Ouvir o nome da forma"
            style={{
              width: '80px', height: '80px', borderRadius: '50%', border: 'none',
              background: falando
                ? 'rgba(127,119,221,0.35)'
                : `linear-gradient(135deg, ${forma.cor}, ${forma.cor}bb)`,
              color: 'white', fontSize: '32px', cursor: 'pointer',
              boxShadow: falando ? 'none' : `0 8px 28px ${forma.cor}55`,
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

        {ouvidas.has(currentIndex) && (
          <div style={{ background: 'rgba(16,185,129,0.12)', borderRadius: '12px', padding: '9px 20px', border: '1px solid rgba(16,185,129,0.3)', animation: 'ns-slide-up 0.25s ease' }}>
            <span style={{ color: '#6ee7b7', fontWeight: '800', fontSize: '13px' }}>✓ Você já ouviu esta forma!</span>
          </div>
        )}
      </div>
    </GameShell>
  )
}
