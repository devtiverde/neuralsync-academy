import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { playSound } from '../../lib/sounds'
// ⚡ `kidsResumo` no lugar de `kidsData`: esta tela abre ANTES DE TODA atividade e
// só usa três campos do Kids TV (emoji, título e os 80 primeiros caracteres da
// introdução) num cartão. O `kidsData.js` inteiro são 21 kB gzip de seções, fatos e
// quizzes de 18 categorias — viajavam para o celular da criança a cada abertura de
// atividade sem serem lidos aqui. O resumo tem 4,2 kB crus.
// É GERADO (`npm run gerar-kids-resumo`) e o `prebuild` quebra o build se ficar
// desatualizado — arquivo gerado envelhece em silêncio se ninguém vigiar.
import { kidsResumo } from '../../data/kidsResumo'
import { INTRO_SLIDES } from '../../data/introSlides'
import { podeAcessar, isDesbloqueado, desbloquear, getFaixaFromId, FAIXA_LABELS } from '../../lib/faixaGuard'
import ParentUnlockModal from '../../components/ParentUnlockModal'
import '../../styles/crianca.css'

export function getAssistidoKey(childId, atividadeId) {
  return `ns_estudou_antes_${childId}_${atividadeId}`
}
export function marcarAssistido(childId, atividadeId) {
  if (childId && atividadeId) localStorage.setItem(getAssistidoKey(childId, atividadeId), '1')
}
export function foiAssistido(childId, atividadeId) {
  if (!childId || !atividadeId) return false
  return !!localStorage.getItem(getAssistidoKey(childId, atividadeId))
}

const tipoTheme = {
  quiz:      { bg: 'linear-gradient(160deg,#0f0a1e 0%,#1e1b4b 100%)', accent: '#7C3AED', soft: '#a78bfa' },
  memoria:   { bg: 'linear-gradient(160deg,#0a1628 0%,#0c2a4a 100%)', accent: '#3b82f6', soft: '#93c5fd' },
  sequencia: { bg: 'linear-gradient(160deg,#0a1f0f 0%,#14532d 100%)', accent: '#10b981', soft: '#6ee7b7' },
  labirinto: { bg: 'linear-gradient(160deg,#1a0a0a 0%,#3b0f0f 100%)', accent: '#ef4444', soft: '#fca5a5' },
  robo:      { bg: 'linear-gradient(160deg,#0c0c1a 0%,#1a1a3e 100%)', accent: '#6366f1', soft: '#a5b4fc' },
  padrao:    { bg: 'linear-gradient(160deg,#1a0f00 0%,#3b1f00 100%)', accent: '#f59e0b', soft: '#fcd34d' },
  quizia:    { bg: 'linear-gradient(160deg,#100a1f 0%,#2e1065 100%)', accent: '#a855f7', soft: '#d8b4fe' },
  inventor:  { bg: 'linear-gradient(160deg,#1a100a 0%,#431407 100%)', accent: '#f97316', soft: '#fdba74' },
  blocos:    { bg: 'linear-gradient(160deg,#0a1a0a 0%,#064e3b 100%)', accent: '#10b981', soft: '#6ee7b7' },
  numeros:   { bg: 'linear-gradient(160deg,#0d0a20 0%,#1a1045 100%)', accent: '#7F77DD', soft: '#c4b5fd' },
  formas:    { bg: 'linear-gradient(160deg,#0d0a20 0%,#1a1045 100%)', accent: '#7F77DD', soft: '#c4b5fd' },
  cores:     { bg: 'linear-gradient(160deg,#1a0a14 0%,#3b0f2f 100%)', accent: '#D4537E', soft: '#f9a8d4' },
  alfabeto:  { bg: 'linear-gradient(160deg,#051a12 0%,#0d3320 100%)', accent: '#1D9E75', soft: '#6ee7b7' },
  ingles:    { bg: 'linear-gradient(160deg,#040e1f 0%,#0a2040 100%)', accent: '#3B82F6', soft: '#93C5FD' },
  colorir:   { bg: 'linear-gradient(160deg,#0d1a05 0%,#1a3305 100%)', accent: '#84CC16', soft: '#bef264' },
  silabas:   { bg: 'linear-gradient(160deg,#04181f 0%,#0a3040 100%)', accent: '#06B6D4', soft: '#67e8f9' },
  musica:    { bg: 'linear-gradient(160deg,#150a26 0%,#2e1065 100%)', accent: '#a855f7', soft: '#d8b4fe' },
  'zona-emocoes': { bg: 'linear-gradient(160deg,#1a0a12 0%,#3b0f28 100%)', accent: '#EC4899', soft: '#f9a8d4' },
}

export default function IntroAtividade({ atividade, onComecar, onVoltar, refazendo = false, kidsLink = null }) {
  const navigate = useNavigate()
  const t = tipoTheme[atividade?.tipo] || tipoTheme.quiz
  if (atividade) sessionStorage.setItem('ns_last_atividade', JSON.stringify(atividade))

  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const [assistido, setAssistido] = useState(() => foiAssistido(child?.id, atividade?.id))
  const [slideIdx, setSlideIdx] = useState(0)
  const slides = atividade?.tipo ? (INTRO_SLIDES[atividade.tipo] || []) : []
  // ponto inicial do dedo, para distinguir "arrastar de lado" de "rolar a pagina"
  const toqueRef = useRef(null)
  // circular: quem chega no ultimo slide e arrasta de novo volta ao primeiro,
  // em vez de ficar com a sensacao de que a tela travou
  const irParaSlide = (delta) => {
    if (slides.length < 2) return
    setSlideIdx(i => (i + delta + slides.length) % slides.length)
  }

  const atividadeFaixa = getFaixaFromId(atividade?.id)
  const precisaGuard = !!atividadeFaixa && !podeAcessar(child?.faixa_etaria, atividade?.id)
  const [desbloqueado, setDesbloqueado] = useState(() => isDesbloqueado(child?.id, atividade?.id))
  const [showModal, setShowModal] = useState(false)

  function handleUnlockSuccess() {
    desbloquear(child?.id, atividade?.id)
    setDesbloqueado(true)
    setShowModal(false)
  }

  const kidsCategoria = kidsLink ? kidsResumo[kidsLink] : null

  function handleEstudarAntes() {
    playSound('click')
    marcarAssistido(child?.id, atividade?.id)
    setAssistido(true)
    navigate('/kids/' + kidsLink, { state: { voltarQuiz: true, atividadeId: atividade?.id } })
  }

  return (
    // `height` e não `minHeight`: a tela da atividade é fixa (ver a trava em
    // App.jsx / index.css). Com `min-height: 100vh` o documento crescia junto
    // com a coluna da direita e a roda do mouse rolava a página inteira.
    <div style={{ height: '100dvh', background: t.bg, display: 'flex', alignItems: 'stretch', position: 'relative', overflow: 'hidden' }}>

      {showModal && (
        <ParentUnlockModal
          atividadeFaixa={atividadeFaixa}
          atividadeTitulo={atividade.titulo}
          childNome={child?.nome}
          onSuccess={handleUnlockSuccess}
          onCancel={() => setShowModal(false)}
        />
      )}


      {/* Ambient blobs — radial-gradient no lugar de `filter: blur()`.
          Ver a explicação medida em GameShell.jsx: o filtro obriga o navegador a
          refazer o desfoque a cada quadro em que algo por cima muda (aqui há 5 emojis
          com animação infinita logo abaixo), e isso derruba quadros no celular. */}
      <div style={{ position: 'absolute', top: '-30%', left: '10%', width: '800px', height: '800px', borderRadius: '50%', background: `radial-gradient(circle, ${t.accent} 0%, transparent 65%)`, opacity: 0.1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-25%', right: '0%', width: '560px', height: '560px', borderRadius: '50%', background: `radial-gradient(circle, ${t.soft} 0%, transparent 65%)`, opacity: 0.09, pointerEvents: 'none' }} />

      {/* Floating emoji decorations */}
      {['✨','⚡','🌟','💫','🎯'].map((e, i) => (
        <div key={i} style={{
          position: 'absolute', fontSize: '22px', opacity: 0.12,
          top: `${10 + i * 18}%`, left: i % 2 === 0 ? `${3 + i}%` : 'auto',
          right: i % 2 !== 0 ? `${3 + i}%` : 'auto',
          animation: `ns-bounce ${2 + i * 0.5}s ease-in-out infinite`,
          pointerEvents: 'none',
        }}>{e}</div>
      ))}

      {/* ── LAYOUT ──────────────────────────────── */}
      {/* `minHeight: 0` é o que permite as colunas rolarem: sem ele um filho
          flex se recusa a encolher abaixo do próprio conteúdo e o
          `overflow-y: auto` das colunas nunca chega a valer. */}
      <div className="intro-cols" style={{ display: 'flex', width: '100%', minHeight: 0, position: 'relative', zIndex: 1 }}>

        {/* LEFT COLUMN (desktop) */}
        <div className="intro-left" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', minWidth: 0 }}>

          {/* Back button */}
          <div style={{ alignSelf: 'flex-start', marginBottom: '32px' }}>
            <button onClick={onVoltar} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 18px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '13px', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ← Voltar
            </button>
          </div>

          {/* Hero */}
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div className="hero-emoji" style={{ fontSize: '100px', lineHeight: 1, marginBottom: '24px', animation: 'ns-bounce 3s ease-in-out infinite', filter: `drop-shadow(0 0 30px ${t.accent}80)` }}>
              {atividade.emoji}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${t.accent}25`, border: `1px solid ${t.accent}40`, borderRadius: '99px', padding: '5px 16px', marginBottom: '16px' }}>
              <span style={{ color: t.soft, fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{atividade.habilidade}</span>
            </div>
            <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '900', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '14px' }}>
              {atividade.titulo}
            </h1>
            {/* MEDIDO EM 03/08/2026: aqui ficava a `historinha` cortada em 120
                caracteres, e 286 das 393 atividades (73%) passam disso — ou seja, a
                história aparecia MUTILADA na regra, não na exceção. E aparecia duas
                vezes: pela metade neste hero e inteira no cartão "A missão" ao lado.
                A criança de 4-5 anos lê o texto grande do meio da tela, chega no "…"
                e não tem por que supor que o resto está numa coluna à direita.

                Toda atividade já tem `descricao` — uma linha de 23 a 75 caracteres,
                escrita justamente para ser esse resumo. Ela nunca corta. A história
                inteira fica num lugar só, no cartão, sem reticência. */}
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.6 }}>
              {atividade.descricao || atividade.historinha}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        {/* Esta é a coluna de TEXTO — história, recompensas, "Sabia que...",
            botões. É a única parte da tela de atividade que pode rolar.
            Antes era `justify-content: center` dentro de um pai com
            `overflow: hidden`: quando o conteúdo passava da altura da janela
            (acontecia em notebook de 768px em quase toda atividade), a
            centralização empurrava o excesso para FORA pelos dois lados e o
            topo ficava inalcançável — sem barra de rolagem, sem como chegar
            nele. `safe center` centraliza só enquanto couber e volta a alinhar
            no topo quando não cabe; o `flex-start` antes dele é o valor que
            navegador sem suporte enxerga. */}
        <div className="intro-right" style={{ width: '420px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '40px 32px', background: 'rgba(0,0,0,0.25)', borderLeft: '1px solid rgba(255,255,255,0.07)', overflowY: 'auto', overscrollBehavior: 'contain', justifyContent: 'safe center' }}>

          {/* Child greeting */}
          {child && (
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px 16px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🦊</div>
              <div>
                <div style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>Olá, {child.nome}! 🚀</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>Preparado para mais uma aventura?</div>
              </div>
            </div>
          )}

          {/* Story */}
          <div style={{ background: `${t.accent}15`, borderRadius: '16px', padding: '20px', marginBottom: '20px', border: `1px solid ${t.accent}30` }}>
            <div style={{ fontSize: '11px', color: t.soft, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>📖 A missão</div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              {atividade.historinha}
            </p>
          </div>

          {/* Rewards row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {[
              ['⏱', '~' + atividade.tempo_estimado + 'min', 'Duração'],
              ['⭐', '+' + atividade.xp_reward + ' XP', 'Experiência'],
              ['💰', '+' + atividade.coins_reward, 'Coins'],
            ].map(([ic, val, lbl]) => (
              <div key={lbl} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{ic}</div>
                <div style={{ color: 'white', fontWeight: '900', fontSize: '13px', marginBottom: '2px' }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: '600' }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Refazendo badge */}
          {refazendo && (
            <div style={{ background: 'rgba(239,68,68,0.15)', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>🔁</span>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#fca5a5', textTransform: 'uppercase' }}>Refazendo</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>Prática leva à perfeição!</div>
              </div>
            </div>
          )}

          {/* ── ESTUDE ANTES ──────────────────────────── */}
          {kidsLink && kidsCategoria ? (
            <button
              onClick={handleEstudarAntes}
              style={{
                width: '100%', marginBottom: '12px', cursor: 'pointer',
                background: assistido ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)',
                border: `1.5px solid ${assistido ? 'rgba(16,185,129,0.4)' : 'rgba(99,102,241,0.35)'}`,
                borderRadius: '16px', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: '12px',
                fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s',
                textAlign: 'left',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                background: assistido ? 'rgba(16,185,129,0.25)' : 'rgba(99,102,241,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
              }}>
                {kidsCategoria.emoji || '📚'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: assistido ? '#34d399' : '#a5b4fc', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    📺 Estude Antes
                  </span>
                  {assistido && (
                    <span style={{ background: 'rgba(16,185,129,0.25)', border: '1px solid rgba(16,185,129,0.5)', color: '#34d399', fontSize: '9px', fontWeight: '800', padding: '2px 7px', borderRadius: '99px' }}>
                      ✓ Assistido
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: 'white', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {kidsCategoria.titulo}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {(kidsCategoria.introducao || '').substring(0, 80)}…
                </div>
              </div>
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.3)' }}>→</span>
                {!assistido && <span style={{ fontSize: '9px', color: '#fbbf24', fontWeight: '800' }}>+5 XP</span>}
              </div>
            </button>
          ) : null}

          {/* ── SABIA QUE — slides para todos os tipos ──
              Relato real: "sao tres abas mas nao da pra passar rodando a tela, somente
              clicando nos pontinhos, e estao muito pequenos". Os pontinhos mediam 6x6px
              (o minimo recomendado para o dedo e 44x44) e nao havia nenhum gesto de
              arrastar. Agora: swipe por toque, setas ‹ › e alvo de toque de 44px de
              altura em volta de cada pontinho (o ponto desenhado continua pequeno). */}
          {slides.length > 0 && (
            <div
              style={{ width: '100%', marginBottom: '12px', background: `rgba(255,255,255,0.05)`, border: `1px solid ${t.accent}40`, borderRadius: '16px', padding: '16px', touchAction: 'pan-y', userSelect: 'none' }}
              onPointerDown={e => { toqueRef.current = { x: e.clientX, y: e.clientY } }}
              onPointerUp={e => {
                const ini = toqueRef.current
                toqueRef.current = null
                if (!ini) return
                const dx = e.clientX - ini.x
                const dy = e.clientY - ini.y
                // so conta como swipe horizontal: 40px e um gesto claro, e |dx|>|dy|
                // impede que rolar a pagina para baixo troque o slide sem querer
                if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return
                irParaSlide(dx < 0 ? 1 : -1)
              }}
              onPointerCancel={() => { toqueRef.current = null }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: t.soft, textTransform: 'uppercase', letterSpacing: '1px' }}>📖 Sabia que...</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: '700' }}>{slideIdx + 1}/{slides.length}</div>
              </div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <button
                  onClick={() => irParaSlide(-1)}
                  aria-label="Slide anterior"
                  style={{ flexShrink: 0, width: 34, minHeight: 44, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: '22px', fontWeight: '900', cursor: 'pointer', padding: 0, lineHeight: 1, fontFamily: 'inherit' }}
                >‹</button>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '28px', flexShrink: 0, lineHeight: 1 }}>{slides[slideIdx].emoji}</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>{slides[slideIdx].titulo}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{slides[slideIdx].texto}</div>
                  </div>
                </div>
                <button
                  onClick={() => irParaSlide(1)}
                  aria-label="Próximo slide"
                  style={{ flexShrink: 0, width: 34, minHeight: 44, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: '22px', fontWeight: '900', cursor: 'pointer', padding: 0, lineHeight: 1, fontFamily: 'inherit' }}
                >›</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    aria-label={`Ir para o slide ${i + 1}`}
                    // o botao inteiro tem 44px de altura e >=22px de largura: e o alvo
                    // do dedo. O ponto colorido de dentro continua com 6px de altura.
                    style={{ width: 26, height: 44, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <span style={{ display: 'block', width: i === slideIdx ? 20 : 8, height: 8, borderRadius: 999, background: i === slideIdx ? t.accent : 'rgba(255,255,255,0.25)', transition: 'all 0.2s' }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Faixa guard warning */}
          {precisaGuard && !desbloqueado && (
            <div style={{
              background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)',
              borderRadius: '14px', padding: '14px 16px', marginBottom: '14px',
              display: 'flex', alignItems: 'flex-start', gap: '10px',
            }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
              <div>
                <div style={{ color: '#fcd34d', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Faixa avançada
                </div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', lineHeight: 1.5 }}>
                  Esta atividade é para <strong style={{ color: '#fbbf24' }}>{FAIXA_LABELS[atividadeFaixa]}</strong>. Um adulto precisa autorizar o acesso.
                </div>
              </div>
            </div>
          )}

          {/* Start button */}
          {precisaGuard && !desbloqueado ? (
            <button
              onClick={() => setShowModal(true)}
              style={{
                width: '100%', padding: '17px', borderRadius: '16px', border: 'none',
                background: 'linear-gradient(135deg, #92400e, #f59e0b99)',
                color: 'white', fontWeight: '900', fontSize: '16px', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                boxShadow: '0 8px 32px rgba(245,158,11,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(245,158,11,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,158,11,0.35)' }}
            >
              🔐 Solicitar autorização
            </button>
          ) : (
            <button
              onClick={() => { playSound('click'); onComecar() }}
              style={{
                width: '100%', padding: '17px', borderRadius: '16px', border: 'none',
                background: `linear-gradient(135deg, ${t.accent}, ${t.soft}99)`,
                color: 'white', fontWeight: '900', fontSize: '16px', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                boxShadow: `0 8px 32px ${t.accent}50`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${t.accent}70` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 32px ${t.accent}50` }}
            >
              {desbloqueado && precisaGuard ? '🔓 Começar Atividade' : '🚀 Começar Atividade'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile layout override (stacked) */}
      <style>{`
        /* A coluna esquerda (emoji grande + título) também centraliza dentro de
           altura fixa; sem isto ela cortava o botão "Voltar" no topo em janela
           baixa. Mesmo tratamento da direita. */
        .intro-left { justify-content: safe center; overflow-y: auto; overscroll-behavior: contain; }
        /* Barra de rolagem discreta — no fundo escuro a padrão do Windows
           aparece como uma faixa clara larga e chama mais atenção que o jogo. */
        .intro-left::-webkit-scrollbar, .intro-right::-webkit-scrollbar { width: 6px; }
        .intro-left::-webkit-scrollbar-thumb, .intro-right::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.14); border-radius: 99px;
        }
        .intro-left, .intro-right { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.14) transparent; }

        @media (max-width: 767px) {
          /* No celular as duas colunas viram uma pilha só. Aí quem rola é o
             conjunto, não cada coluna — senão viram duas áreas de rolagem
             aninhadas e o dedo nunca sabe qual vai responder. */
          .intro-cols { flex-direction: column !important; overflow-y: auto; overscroll-behavior: contain; }
          .intro-left, .intro-right { overflow-y: visible !important; flex-shrink: 0; }
          .intro-right { width: 100% !important; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07) !important; }
          .intro-left { padding: 24px 20px 20px !important; }
          .intro-left h1 { font-size: 26px !important; }
          .intro-left .hero-emoji { font-size: 72px !important; }
        }
      `}</style>
    </div>
  )
}
