import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

const COR_VAZIA = '#E5E7EB'
const CONTORNO = '#1F2937'

const PALETA_CORES = [
  { nome: 'Vermelho', hex: '#EF4444' },
  { nome: 'Laranja',  hex: '#F97316' },
  { nome: 'Amarelo',  hex: '#FACC15' },
  { nome: 'Verde',    hex: '#22C55E' },
  { nome: 'Azul',     hex: '#3B82F6' },
  { nome: 'Roxo',     hex: '#A855F7' },
  { nome: 'Rosa',     hex: '#EC4899' },
  { nome: 'Marrom',   hex: '#92400E' },
]

function radialTrianglePoints(cx, cy, rInner, rOuter, n, i) {
  const step = (2 * Math.PI) / n
  const half = step * 0.32
  const mid = step * i
  const apex  = [cx + rOuter * Math.cos(mid),          cy + rOuter * Math.sin(mid)]
  const base1 = [cx + rInner * Math.cos(mid - half),   cy + rInner * Math.sin(mid - half)]
  const base2 = [cx + rInner * Math.cos(mid + half),   cy + rInner * Math.sin(mid + half)]
  return `${apex[0]},${apex[1]} ${base1[0]},${base1[1]} ${base2[0]},${base2[1]}`
}

function RegiaoSVG({ regiao, cor, onClick }) {
  const comum = { fill: cor, stroke: CONTORNO, strokeWidth: 3, style: { cursor: 'pointer', transition: 'fill 0.15s' }, onClick }

  if (regiao.tipo === 'circle')  return <circle cx={regiao.props.cx} cy={regiao.props.cy} r={regiao.props.r} {...comum} />
  if (regiao.tipo === 'rect')    return <rect x={regiao.props.x} y={regiao.props.y} width={regiao.props.width} height={regiao.props.height} rx={regiao.props.rx || 0} {...comum} />
  if (regiao.tipo === 'ellipse') return <ellipse cx={regiao.props.cx} cy={regiao.props.cy} rx={regiao.props.rx} ry={regiao.props.ry} {...comum} />
  if (regiao.tipo === 'polygon') return <polygon points={regiao.props.points} {...comum} />
  if (regiao.tipo === 'radial') {
    const { cx, cy, rInner, rOuter, n } = regiao.props
    return (
      <g onClick={onClick} style={{ cursor: 'pointer' }}>
        {Array.from({ length: n }).map((_, i) => (
          <polygon key={i} points={radialTrianglePoints(cx, cy, rInner, rOuter, n, i)} fill={cor} stroke={CONTORNO} strokeWidth={2} />
        ))}
      </g>
    )
  }
  return null
}

export default function ColorirAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [coresAplicadas, setCoresAplicadas] = useState({})
  const [corSelecionada, setCorSelecionada] = useState(PALETA_CORES[0].hex)
  const [encerrado, setEncerrado] = useState(false)

  useEffect(() => { if (!atividade) navigate(-1) }, [])
  if (!atividade) return null

  const desenho = atividade?.dados?.desenho
  const regioes = desenho?.regioes || []
  const total = regioes.length
  const pintadas = Object.keys(coresAplicadas).length
  const progresso = total ? (pintadas / total) * 100 : 0
  const limiar3 = Math.ceil(total * 0.9)
  const limiar2 = Math.ceil(total * 0.6)
  const limiar1 = Math.ceil(total * 0.3)
  const estrelas = pintadas >= limiar3 ? 3 : pintadas >= limiar2 ? 2 : pintadas >= limiar1 ? 1 : 0

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

  function pintarRegiao(id) {
    playSound('click')
    setCoresAplicadas(prev => {
      const next = { ...prev, [id]: corSelecionada }
      if (Object.keys(next).length === total && Object.keys(prev).length < total) {
        setTimeout(() => { playSound('complete'); setEncerrado(true) }, 500)
      }
      return next
    })
  }

  if (encerrado) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ fontSize: '64px', letterSpacing: '8px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>🎨🌟🎨</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '6px' }}>Ficou lindo! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você coloriu {desenho.nome} inteirinho!</p>
          </div>

          <svg width={220} height={220} viewBox={`0 0 ${desenho.viewBox} ${desenho.viewBox}`} style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.06)' }}>
            {regioes.map(r => <RegiaoSVG key={r.id} regiao={r} cor={coresAplicadas[r.id] || COR_VAZIA} onClick={() => {}} />)}
          </svg>

          {estrelas > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {Array.from({ length: estrelas }).map((_, i) => (
                <span key={i} style={{ fontSize: '24px', animation: `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button
              onClick={() => { setCoresAplicadas({}); setEncerrado(false) }}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              🔁 Pintar de novo
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#84CC16,#a3e635)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(132,204,22,0.4)' }}
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
      labelProgresso={`${pintadas} / ${total}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{ maxWidth: '560px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', width: '100%', padding: '4px 2px' }}>
          {PALETA_CORES.map(c => (
            <button
              key={c.hex}
              onClick={() => { setCorSelecionada(c.hex); playSound('click') }}
              title={c.nome}
              style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: c.hex, cursor: 'pointer',
                border: corSelecionada === c.hex ? '3px solid white' : '3px solid transparent',
                boxShadow: corSelecionada === c.hex ? `0 0 0 3px ${c.hex}, 0 4px 14px ${c.hex}80` : '0 2px 8px rgba(0,0,0,0.2)',
                transform: corSelecionada === c.hex ? 'scale(1.12)' : 'scale(1)',
                transition: 'all 0.15s',
              }}
            />
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '24px', padding: '20px', width: '100%', display: 'flex', justifyContent: 'center', border: '1.5px solid rgba(255,255,255,0.1)' }}>
          <svg width="100%" height="auto" viewBox={`0 0 ${desenho.viewBox} ${desenho.viewBox}`} style={{ maxWidth: '400px' }}>
            {regioes.map(r => (
              <RegiaoSVG key={r.id} regiao={r} cor={coresAplicadas[r.id] || COR_VAZIA} onClick={() => pintarRegiao(r.id)} />
            ))}
          </svg>
        </div>

        {estrelas > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Array.from({ length: estrelas }).map((_, i) => (
              <span key={i} style={{ fontSize: '20px', animation: `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600' }}>{pintadas} de {total} partes pintadas</span>
          </div>
        )}
      </div>
    </GameShell>
  )
}
