import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutCrianca from '../../components/LayoutCrianca'
import { Planet } from '@phosphor-icons/react'
import '../../styles/crianca.css'

const LS_KEY = 'ns_diario'
const COR_ROXO = '#7C3AED'
const COR_OURO = '#F59E0B'

const PROMPTS = [
  'O que você aprendeu hoje que te surpreendeu?',
  'Qual foi a parte mais legal do que você estudou?',
  'Se você fosse ensinar alguém o que aprendeu, o que diria primeiro?',
  'Qual palavra nova você descobriu hoje?',
  'O que você quer aprender amanhã?',
  'Faça uma pergunta sobre o que você estudou — tente responder depois!',
  'Descreva como você se sentiu durante o aprendizado de hoje.',
  'Qual conexão você fez entre o que aprendeu e a vida real?',
]

// Estrela de tamanho baseado em palavras
function StarIcon({ palavras }) {
  const size = palavras >= 200 ? 28 : palavras >= 100 ? 22 : palavras >= 30 ? 18 : 14
  const color = palavras >= 200 ? '#a855f7' : palavras >= 100 ? COR_OURO : palavras >= 30 ? '#94a3b8' : '#475569'
  const glow = palavras >= 100 ? `0 0 8px ${color}88` : 'none'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ filter: `drop-shadow(${glow})`, flexShrink: 0 }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function getEntradas(childId) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    return (all[childId] || []).sort((a, b) => new Date(b.data) - new Date(a.data))
  } catch { return [] }
}

function salvarEntrada(childId, entrada) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    const entradas = all[childId] || []
    entradas.unshift(entrada)
    all[childId] = entradas.slice(0, 100)
    localStorage.setItem(LS_KEY, JSON.stringify(all))
  } catch {}
}

function formatData(isoStr) {
  const d = new Date(isoStr)
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function contarPalavras(texto) {
  return texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length
}

// Partícula de celebração
function Particula({ x, y, cor, onDone }) {
  const angle = Math.random() * 360
  const dist = 60 + Math.random() * 80
  const tx = Math.cos(angle * Math.PI / 180) * dist
  const ty = Math.sin(angle * Math.PI / 180) * dist - 40
  const size = 4 + Math.random() * 6
  const emoji = ['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)]

  useEffect(() => {
    const t = setTimeout(onDone, 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <span style={{
      position: 'fixed', left: x, top: y, fontSize: size * 2 + 'px',
      pointerEvents: 'none', zIndex: 9999,
      animation: `ns-particula 0.9s ease-out forwards`,
      '--tx': tx + 'px', '--ty': ty + 'px',
    }}>{emoji}</span>
  )
}

export default function Diario() {
  const navigate = useNavigate()
  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const childId = child?.id || 'guest'

  const [texto, setTexto] = useState('')
  const [titulo, setTitulo] = useState('')
  const [entradas, setEntradas] = useState([])
  const [tela, setTela] = useState('escrever')
  const [salvou, setSalvou] = useState(false)
  const [entradaAberta, setEntradaAberta] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [inicioDigitacao, setInicioDigitacao] = useState(null)
  const [focado, setFocado] = useState(false)
  const [particulas, setParticulas] = useState([])
  const promptRef = useRef(PROMPTS[Math.floor(Math.random() * PROMPTS.length)])
  const intervalRef = useRef(null)
  const btnRef = useRef(null)
  const particulaId = useRef(0)

  useEffect(() => {
    setEntradas(getEntradas(childId))
  }, [childId])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  // Injetar CSS de animações
  useEffect(() => {
    const id = 'diario-anims'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes ns-particula {
        0%   { transform: translate(0,0) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0.3); opacity: 0; }
      }
      @keyframes ns-prompt-pulse {
        0%, 100% { opacity: 0.7; transform: scale(1); }
        50%       { opacity: 1;   transform: scale(1.15); }
      }
      @keyframes ns-star-twinkle {
        0%, 100% { opacity: 0.15; }
        50%       { opacity: 0.9; }
      }
      @keyframes ns-card-in {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes ns-borda-ouro {
        0%   { box-shadow: 0 12px 48px rgba(124,58,237,0.35), 0 0 0 1.5px rgba(167,139,250,0.4); }
        100% { box-shadow: 0 16px 56px rgba(245,158,11,0.3), 0 0 0 2px rgba(245,158,11,0.6), 0 0 24px rgba(245,158,11,0.15); }
      }
      @keyframes ns-salvo-pulse {
        0%   { box-shadow: 0 4px 20px rgba(16,185,129,0.4); }
        50%  { box-shadow: 0 4px 40px rgba(16,185,129,0.7); }
        100% { box-shadow: 0 4px 20px rgba(16,185,129,0.4); }
      }
      .diario-pergaminho {
        border-radius: 28px;
        background: linear-gradient(160deg, #1a0e3a 0%, #0f0a1e 60%, #0d0820 100%);
        box-shadow: 0 12px 48px rgba(124,58,237,0.35), 0 0 0 1.5px rgba(167,139,250,0.4);
        transition: box-shadow 0.35s ease;
        overflow: hidden;
      }
      .diario-pergaminho.focado {
        animation: ns-borda-ouro 0.35s ease forwards;
      }
      .diario-btn-salvar {
        transition: all 0.25s ease;
      }
      .diario-btn-salvar:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(124,58,237,0.5) !important;
      }
      .diario-btn-salvar.salvo {
        animation: ns-salvo-pulse 0.6s ease;
      }
      .diario-estrela-card {
        transition: transform 0.2s, box-shadow 0.2s;
        animation: ns-card-in 0.3s ease both;
      }
      .diario-estrela-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 28px rgba(124,58,237,0.25) !important;
      }
    `
    document.head.appendChild(style)
    return () => { const el = document.getElementById(id); if(el) el.remove() }
  }, [])

  function handleTexto(e) {
    const val = e.target.value
    setTexto(val)
    setSalvou(false)

    if (val.length === 1 && !inicioDigitacao) {
      const inicio = Date.now()
      setInicioDigitacao(inicio)
      intervalRef.current = setInterval(() => {
        const minutos = (Date.now() - inicio) / 60000
        if (minutos > 0) setWpm(Math.round(contarPalavras(val) / minutos))
      }, 2000)
    }

    if (val.length > 1 && inicioDigitacao) {
      const minutos = (Date.now() - inicioDigitacao) / 60000
      if (minutos > 0) setWpm(Math.round(contarPalavras(val) / minutos))
    }

    if (val.length === 0) {
      clearInterval(intervalRef.current)
      setInicioDigitacao(null)
      setWpm(0)
    }
  }

  function dispararParticulas() {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const novas = Array.from({ length: 12 }, () => ({
      id: ++particulaId.current,
      x: cx, y: cy,
    }))
    setParticulas(p => [...p, ...novas])
  }

  function removerParticula(id) {
    setParticulas(p => p.filter(pt => pt.id !== id))
  }

  function salvar() {
    if (texto.trim().length < 10) return
    const entrada = {
      id: Date.now(),
      data: new Date().toISOString(),
      titulo: titulo.trim() || `Entrada de ${new Date().toLocaleDateString('pt-BR')}`,
      texto: texto.trim(),
      palavras: contarPalavras(texto),
      wpm,
    }
    salvarEntrada(childId, entrada)
    setEntradas(getEntradas(childId))
    setSalvou(true)
    dispararParticulas()
    clearInterval(intervalRef.current)
    setInicioDigitacao(null)
    setWpm(0)
    setTimeout(() => {
      setTexto('')
      setTitulo('')
      setSalvou(false)
      promptRef.current = PROMPTS[Math.floor(Math.random() * PROMPTS.length)]
    }, 1800)
  }

  const palavrasAtual = contarPalavras(texto)

  // Gerar estrelas de fundo do header
  const ESTRELAS = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      dur: 2 + Math.random() * 3,
      delay: Math.random() * 4,
    }))
  ).current

  return (
    <LayoutCrianca child={child}>
      {/* Partículas de celebração */}
      {particulas.map(p => (
        <Particula key={p.id} x={p.x} y={p.y} onDone={() => removerParticula(p.id)} />
      ))}

      <div style={{ minHeight: '100vh' }}>

        {/* ── HEADER MÁGICO ─────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(160deg, #0a0415 0%, #1a0a3e 50%, #0f0820 100%)',
          padding: '32px 32px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Estrelas */}
          {ESTRELAS.map(s => (
            <div key={s.id} style={{
              position: 'absolute',
              left: s.left + '%', top: s.top + '%',
              width: s.size + 'px', height: s.size + 'px',
              borderRadius: '50%', background: 'white',
              animation: `ns-star-twinkle ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
              pointerEvents: 'none',
            }} />
          ))}

          {/* Orbs de fundo */}
          <div style={{ position: 'absolute', top: '-60px', right: '60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(124,58,237,0.12)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '20px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(245,158,11,0.08)', filter: 'blur(30px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Navegação */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <button
                onClick={() => navigate('/home-crianca')}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', width: '40px', height: '40px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}
              >←</button>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(167,139,250,0.7)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>Área Secreta</div>
                <h2 style={{ color: 'white', fontSize: '26px', fontWeight: '900', lineHeight: 1, letterSpacing: '-0.5px' }}>
                  ✨ Meu Diário
                </h2>
              </div>
              {child?.nome && (
                <div style={{ marginLeft: 'auto', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.35)', borderRadius: '99px', padding: '6px 16px', fontSize: '13px', fontWeight: '700', color: '#a78bfa' }}>
                  {child.nome}
                </div>
              )}
            </div>

            {/* Abas */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'escrever', icon: '✍️', label: 'Escrever' },
                { id: 'historico', icon: '🌌', label: `Memórias${entradas.length > 0 ? ` (${entradas.length})` : ''}` },
              ].map(a => (
                <button
                  key={a.id}
                  onClick={() => setTela(a.id)}
                  style={{
                    background: tela === a.id
                      ? 'linear-gradient(135deg, rgba(124,58,237,0.7), rgba(109,40,217,0.7))'
                      : 'rgba(255,255,255,0.06)',
                    border: tela === a.id
                      ? '1px solid rgba(167,139,250,0.5)'
                      : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '10px 20px',
                    color: tela === a.id ? 'white' : 'rgba(255,255,255,0.4)',
                    fontWeight: '800',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    transition: 'all 0.2s',
                    boxShadow: tela === a.id ? '0 4px 16px rgba(124,58,237,0.3)' : 'none',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <span>{a.icon}</span> {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTEÚDO ──────────────────────────────────────────── */}
        <div style={{ padding: '32px', maxWidth: '760px', margin: '0 auto' }}>

          {/* ════ TELA ESCREVER ════ */}
          {tela === 'escrever' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Prompt inspirador */}
              <div style={{
                background: 'rgba(124,58,237,0.1)',
                border: '1.5px dashed rgba(124,58,237,0.4)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex', gap: '12px', alignItems: 'flex-start',
              }}>
                <span style={{
                  fontSize: '20px',
                  animation: 'ns-prompt-pulse 2.5s ease-in-out infinite',
                  display: 'inline-block',
                }}>✨</span>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '900', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>Sugestão para começar</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontStyle: 'italic' }}>{promptRef.current}</div>
                </div>
              </div>

              {/* Pergaminho flutuante */}
              <div className={`diario-pergaminho${focado ? ' focado' : ''}`}>

                {/* Cabeçalho do pergaminho */}
                <div style={{ padding: '20px 24px 0', borderBottom: '1px solid rgba(167,139,250,0.12)' }}>
                  <input
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    placeholder={`Entrada de ${new Date().toLocaleDateString('pt-BR')}`}
                    maxLength={60}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: '800',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      paddingBottom: '16px',
                    }}
                  />
                </div>

                {/* Área de escrita */}
                <div style={{ padding: '0 24px' }}>
                  <textarea
                    value={texto}
                    onChange={handleTexto}
                    onFocus={() => setFocado(true)}
                    onBlur={() => setFocado(false)}
                    placeholder="Escreva aqui o que você aprendeu, sentiu ou descobriu hoje..."
                    rows={10}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '240px',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '15px',
                      lineHeight: '1.85',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      padding: '20px 0',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Rodapé de stats dentro do pergaminho */}
                <div style={{
                  borderTop: '1px solid rgba(167,139,250,0.1)',
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '700',
                }}>
                  <span style={{ color: palavrasAtual > 0 ? '#10b981' : 'rgba(255,255,255,0.2)' }}>
                    {palavrasAtual} {palavrasAtual === 1 ? 'palavra' : 'palavras'}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span style={{ color: texto.length > 0 ? '#60a5fa' : 'rgba(255,255,255,0.2)' }}>
                    {texto.length} caracteres
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span style={{ color: wpm > 0 ? '#a78bfa' : 'rgba(255,255,255,0.2)' }}>
                    {wpm > 0 ? `${wpm} WPM` : '— WPM'}
                  </span>
                  {wpm >= 30 && (
                    <>
                      <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                      <span style={{ color: '#fbbf24', fontSize: '12px' }}>🚀 Boa velocidade!</span>
                    </>
                  )}
                </div>
              </div>

              {/* Dicas contextuais */}
              {palavrasAtual > 0 && palavrasAtual < 20 && (
                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span>💡</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    Tente escrever pelo menos 30 palavras. Quanto mais você escreve, mais aprende!
                  </span>
                </div>
              )}

              {wpm > 0 && wpm < 20 && (
                <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '10px' }}>
                  <span>⌨️</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    Dica: posicione os dedos em ASDF (esquerda) e JKL; (direita) para digitar mais rápido!
                  </span>
                </div>
              )}

              {/* Botão salvar */}
              <button
                ref={btnRef}
                onClick={salvar}
                disabled={texto.trim().length < 10}
                className={`diario-btn-salvar${salvou ? ' salvo' : ''}`}
                style={{
                  width: '100%',
                  background: salvou
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : texto.trim().length >= 10
                    ? `linear-gradient(135deg, ${COR_ROXO}, #5b21b6)`
                    : 'rgba(255,255,255,0.06)',
                  border: texto.trim().length >= 10
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '18px',
                  color: texto.trim().length >= 10 ? 'white' : 'rgba(255,255,255,0.25)',
                  fontWeight: '900',
                  fontSize: '16px',
                  cursor: texto.trim().length >= 10 ? 'pointer' : 'not-allowed',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: texto.trim().length >= 10
                    ? '0 4px 20px rgba(124,58,237,0.4)'
                    : 'none',
                  letterSpacing: '0.3px',
                }}
              >
                {salvou ? '✅ Entrada registrada nos grimórios!' : '💾 Guardar no Diário'}
              </button>

              {texto.trim().length < 10 && texto.length > 0 && (
                <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '-12px' }}>
                  Mais {10 - texto.trim().length} caractere(s) para poder salvar
                </p>
              )}

              {/* Link para digitação */}
              <button
                onClick={() => navigate('/digitacao')}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
              >
                ⌨️ Praticar digitação →
              </button>
            </div>
          )}

          {/* ════ TELA HISTÓRICO — CONSTELAÇÃO ════ */}
          {tela === 'historico' && (
            <div>
              {entradas.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                  <Planet weight="duotone" size={64} color="#7C3AED" style={{ marginBottom: '16px', filter: 'drop-shadow(0 0 20px rgba(124,58,237,0.5))' }} />
                  <div style={{ fontSize: '20px', fontWeight: '900', color: 'white', marginBottom: '10px' }}>Seu grimório está vazio</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px', lineHeight: 1.6 }}>
                    Cada entrada que você escrever<br/>vira uma estrela aqui.
                  </div>
                  <button
                    onClick={() => setTela('escrever')}
                    style={{ background: `linear-gradient(135deg, ${COR_ROXO}, #5b21b6)`, color: 'white', border: 'none', borderRadius: '14px', padding: '14px 28px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(124,58,237,0.4)' }}
                  >
                    ✍️ Escrever agora
                  </button>
                </div>
              ) : (
                <>
                  {/* Legenda de estrelas */}
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', padding: '14px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <StarIcon palavras={5} /> {'<'} 30 palavras
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <StarIcon palavras={50} /> 30–99 palavras
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <StarIcon palavras={120} /> 100–199 palavras
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <StarIcon palavras={250} /> 200+ palavras
                    </div>
                  </div>

                  {/* Grid de constelação */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {entradas.map((e, i) => (
                      <div
                        key={e.id}
                        onClick={() => setEntradaAberta(entradaAberta === i ? null : i)}
                        className="diario-estrela-card"
                        style={{
                          background: entradaAberta === i
                            ? 'rgba(124,58,237,0.12)'
                            : 'rgba(255,255,255,0.04)',
                          border: entradaAberta === i
                            ? '1px solid rgba(124,58,237,0.35)'
                            : '1px solid rgba(255,255,255,0.07)',
                          borderRadius: '20px',
                          padding: '18px 22px',
                          cursor: 'pointer',
                          animationDelay: `${i * 0.04}s`,
                          boxShadow: entradaAberta === i
                            ? '0 4px 24px rgba(124,58,237,0.2)'
                            : '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          {/* Estrela de palavras */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                            <StarIcon palavras={e.palavras} />
                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.25)' }}>{e.palavras}p</span>
                          </div>

                          {/* Info principal */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: '800', fontSize: '15px', color: 'white', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {e.titulo}
                            </div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>
                              {formatData(e.data)}
                            </div>
                          </div>

                          {/* Badge WPM */}
                          {e.wpm > 0 && (
                            <div style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '99px', padding: '4px 10px', fontSize: '11px', color: '#a78bfa', fontWeight: '800', flexShrink: 0 }}>
                              {e.wpm} WPM
                            </div>
                          )}

                          {/* Seta */}
                          <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', transition: 'transform 0.2s', transform: entradaAberta === i ? 'rotate(90deg)' : 'none', flexShrink: 0 }}>›</div>
                        </div>

                        {/* Preview do texto */}
                        {entradaAberta !== i && (
                          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, margin: '10px 0 0 34px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {e.texto}
                          </p>
                        )}

                        {/* Texto completo expandido */}
                        {entradaAberta === i && (
                          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(124,58,237,0.15)', marginLeft: '34px' }}>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{e.texto}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </LayoutCrianca>
  )
}
