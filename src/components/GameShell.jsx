import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowsOut, ArrowsIn } from '@phosphor-icons/react'
import { getHintUses, consumePowerup } from '../lib/powerups'
import { Badge, Button } from './ui'
import MenuLateral from './MenuLateral'
import '../styles/crianca.css'

const AVATAR_MAP = {
  explorer:'🧭',av_explorer:'🧭',cientista:'🔬',av_cientista:'🔬',
  astronauta:'🚀',av_astronauta:'🚀',mago:'🧙',av_mago:'🧙',
  artista:'🎨',av_artista:'🎨',robô:'🤖',robo:'🤖',av_robo:'🤖',
  dino:'🦕',av_dino:'🦕',ninja:'🥷',av_ninja:'🥷',
}
const avatar = av => (!av ? '🦊' : AVATAR_MAP[String(av).toLowerCase()] || av)

const tipoTheme = {
  quiz:      { bg: 'linear-gradient(160deg,#0f0a1e 0%,#1e1b4b 100%)', accent: '#7C3AED', glow: 'rgba(124,58,237,0.3)'  },
  memoria:   { bg: 'linear-gradient(160deg,#0a1628 0%,#0c2a4a 100%)', accent: '#3b82f6', glow: 'rgba(59,130,246,0.3)'  },
  sequencia: { bg: 'linear-gradient(160deg,#0a1f0f 0%,#14532d 100%)', accent: '#10b981', glow: 'rgba(16,185,129,0.3)'  },
  labirinto: { bg: 'linear-gradient(160deg,#1a0a0a 0%,#3b0f0f 100%)', accent: '#ef4444', glow: 'rgba(239,68,68,0.3)'   },
  robo:      { bg: 'linear-gradient(160deg,#0c0c1a 0%,#1a1a3e 100%)', accent: '#6366f1', glow: 'rgba(99,102,241,0.3)'  },
  padrao:    { bg: 'linear-gradient(160deg,#1a0f00 0%,#3b1f00 100%)', accent: '#f59e0b', glow: 'rgba(245,158,11,0.3)'  },
  quizia:    { bg: 'linear-gradient(160deg,#100a1f 0%,#2e1065 100%)', accent: '#a855f7', glow: 'rgba(168,85,247,0.3)'  },
  inventor:  { bg: 'linear-gradient(160deg,#1a100a 0%,#431407 100%)', accent: '#f97316', glow: 'rgba(249,115,22,0.3)'  },
  blocos:    { bg: 'linear-gradient(160deg,#0a1a0a 0%,#064e3b 100%)', accent: '#10b981', glow: 'rgba(16,185,129,0.3)'  },
  numeros:   { bg: 'linear-gradient(160deg,#0d0a20 0%,#1a1045 100%)', accent: '#7F77DD', glow: 'rgba(127,119,221,0.3)' },
  formas:    { bg: 'linear-gradient(160deg,#0d0a20 0%,#1a1045 100%)', accent: '#7F77DD', glow: 'rgba(127,119,221,0.3)' },
  cores:     { bg: 'linear-gradient(160deg,#1a0a14 0%,#3b0f2f 100%)', accent: '#D4537E', glow: 'rgba(212,83,126,0.3)'  },
  alfabeto:  { bg: 'linear-gradient(160deg,#051a12 0%,#0d3320 100%)', accent: '#1D9E75', glow: 'rgba(29,158,117,0.3)'  },
  colorir:   { bg: 'linear-gradient(160deg,#0d1a05 0%,#1a3305 100%)', accent: '#84CC16', glow: 'rgba(132,204,22,0.3)'  },
  silabas:   { bg: 'linear-gradient(160deg,#04181f 0%,#0a3040 100%)', accent: '#06B6D4', glow: 'rgba(6,182,212,0.3)'   },
  musica:    { bg: 'linear-gradient(160deg,#150a26 0%,#2e1065 100%)', accent: '#a855f7', glow: 'rgba(168,85,247,0.3)'  },
}

// Partículas CSS puras — posicionamento estático, animação via keyframes crianca.css
const PARTICLES = [
  { top:'8%',   left:'4%',  size:60,  opacity:0.04, delay:'0s'   },
  { top:'25%',  left:'1%',  size:40,  opacity:0.06, delay:'0.8s' },
  { top:'60%',  left:'3%',  size:80,  opacity:0.03, delay:'1.4s' },
  { top:'80%',  left:'6%',  size:50,  opacity:0.05, delay:'0.3s' },
  { top:'10%',  right:'4%', size:70,  opacity:0.04, delay:'1.1s' },
  { top:'45%',  right:'2%', size:45,  opacity:0.06, delay:'0.6s' },
  { top:'75%',  right:'5%', size:55,  opacity:0.03, delay:'1.7s' },
  { top:'35%',  left:'8%',  size:30,  opacity:0.05, delay:'2.0s' },
  { top:'55%',  right:'8%', size:35,  opacity:0.04, delay:'0.4s' },
]

export default function GameShell({
  children,
  atividade,
  tipo,
  progresso = 0,
  onVoltar,
  labelProgresso = '',
  sidebarLeft,
  sidebarRight,
}) {
  const navigate = useNavigate()
  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const t = tipo ? (tipoTheme[tipo] || tipoTheme.quiz) : tipoTheme.quiz
  const [hintModal, setHintModal] = useState(false)
  const [hintUses, setHintUses] = useState(0)

  // Modo foco: esconde as duas colunas, a alça do menu lateral e o título para
  // sobrar tela pro jogo. A preferência é lida do localStorage na PRIMEIRA
  // renderização (função no useState, não useEffect): quem gosta de tela cheia
  // gosta em toda atividade, e ligar depois da montagem faria a tela piscar
  // com o cromo antes de sumir.
  const [foco, setFoco] = useState(() => {
    try { return localStorage.getItem('ns_foco_atividade') === '1' } catch { return false }
  })

  useEffect(() => { if (child?.id) setHintUses(getHintUses(child.id)) }, [])

  useEffect(() => {
    try { localStorage.setItem('ns_foco_atividade', foco ? '1' : '0') } catch { /* modo privado */ }
  }, [foco])

  // Esc sai do foco. Sem isso o único jeito de voltar é achar de novo um botão
  // de 36px, e o reflexo de quem está em tela cheia é apertar Esc.
  useEffect(() => {
    if (!foco) return
    const aoTeclar = e => { if (e.key === 'Escape') setFoco(false) }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [foco])

  const handleVoltar = onVoltar || (() => navigate('/trilha'))

  return (
    // `position` NÃO vai aqui: a classe .game-shell precisa de `fixed` para
    // travar a atividade no viewport, e style inline venceria a folha de estilo.
    <div className={`game-shell${foco ? ' game-shell--foco' : ''}`} style={{ background: t.bg }}>

      {/* Dentro da atividade não havia nenhuma saída além do botão voltar do jogo:
          nem início, nem troca de tela, nem sair da conta.
          No modo foco ele sai de cena — mas o botão de voltar do topbar fica,
          então nunca se chega a uma tela sem saída. */}
      {!foco && <MenuLateral tipo="crianca" />}

      {/* ── Ambient glow blobs ──────────────────────
          Eram círculos sólidos com `filter: blur(120px)`/`blur(100px)`. Um filtro de
          desfoque não é composto pela GPU como uma camada estática: sempre que algo
          por cima muda (as partículas animadas, a rolagem do .game-center), o
          navegador refaz o desfoque de uma superfície de 500×500 no processador.
          Medido em celular emulado (390×844, CPU 20×) rolando a atividade de memória:
          COM blur 29–31 de 119 quadros acima de 32ms (p95 = 50ms);
          SEM blur  5–7  de 119 quadros acima de 32ms (p95 = 17–33ms).
          Um radial-gradient dá o mesmo brilho difuso e é apenas pintura barata. */}
      <div style={{ position: 'absolute', top: '-30%', left: '5%', width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle, ${t.glow} 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-25%', right: '-5%', width: 650, height: 650, borderRadius: '50%', background: `radial-gradient(circle, ${t.glow} 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0, opacity: 0.5 }} />

      {/* ── CSS-pure particles ────────────────────── */}
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: t.accent,
          opacity: p.opacity,
          top: p.top, left: p.left, right: p.right,
          animation: `ns-bounce ${2.5 + i * 0.4}s ease-in-out infinite`,
          animationDelay: p.delay,
          pointerEvents: 'none', zIndex: 0,
        }} />
      ))}

      {/* ── LEFT SIDEBAR ──────────────────────────── */}
      <aside className="game-sidebar-left" style={{ position: 'relative', zIndex: 1 }}>

        {/* Child profile pill */}
        {child && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {avatar(child.avatar)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: 'white', fontFamily: 'var(--ns-font-display)', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{child.nome}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'var(--ns-font-ui)' }}>Nível {child.nivel || 1} • {child.xp || 0} XP</div>
            </div>
          </div>
        )}

        {/* Activity context */}
        {atividade && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 12, animation: 'ns-bounce 3s ease-in-out infinite' }}>{atividade.emoji}</div>
              <div style={{ color: 'white', fontFamily: 'var(--ns-font-display)', fontSize: 16, marginBottom: 6, lineHeight: 1.3 }}>{atividade.titulo}</div>
              <div style={{ display: 'inline-block', background: t.accent + '30', border: `1px solid ${t.accent}50`, borderRadius: 99, padding: '3px 12px', color: t.accent, fontSize: 11, fontWeight: 700, fontFamily: 'var(--ns-font-ui)' }}>
                {atividade.habilidade}
              </div>
            </div>

            {/* Story */}
            {atividade.historinha && (
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '14px', marginBottom: 16, border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 800, letterSpacing: '1px', marginBottom: 8, fontFamily: 'var(--ns-font-ui)' }}>📖 HISTÓRIA</div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  {atividade.historinha.length > 180 ? atividade.historinha.substring(0, 180) + '…' : atividade.historinha}
                </p>
              </div>
            )}

            {/* Rewards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                ['⭐', '+' + atividade.xp_reward, 'XP'],
                ['💰', '+' + atividade.coins_reward, 'Coins'],
                ['⏱', atividade.tempo_estimado + 'min', 'Tempo'],
              ].map(([ic, val, lbl]) => (
                <div key={lbl} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 10, textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 14, marginBottom: 2 }}>{ic}</div>
                  <div style={{ color: 'white', fontWeight: 900, fontSize: 13, fontFamily: 'var(--ns-font-ui)' }}>{val}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 600 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {sidebarLeft}
      </aside>

      {/* ── CENTER ────────────────────────────────── */}
      <div className="game-center" style={{ position: 'relative', zIndex: 1 }}>

        {/* Topbar compacto */}
        <div className="game-topbar">
          {/* back button */}
          {/* `ns-alvo-toque` (44px sob `pointer: coarse`) porque no modo foco
              este botão é a ÚNICA saída da atividade. 36px é alvo de mouse;
              no dedo é o mesmo erro das tiras de navegação de 02/08 — a
              criança toca, nada acontece, e conclui que travou. */}
          <button
            onClick={handleVoltar}
            className="ns-alvo-toque"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10, width: 36, height: 36,
              color: 'white', cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          >
            ←
          </button>

          {/* title + progress bar */}
          {/* 🔑 `minWidth: 0` é obrigatório, não enfeite. Item flex tem mínimo automático
              igual ao próprio conteúdo, então esta coluna se recusava a encolher abaixo da
              largura do TÍTULO e empurrava o grupo da direita (badge de XP + botão de tela
              cheia) para fora da `.game-topbar`. Como a `.game-center` é `overflow: hidden`,
              o que saía era CORTADO e ficava sem como alcançar: medido em 78 atividades a
              360px, sempre as de título comprido — "Formas do Corpo Humano" (186px) estourava
              29px, "Biomas do Brasil" (140px) caberia. O `textOverflow: ellipsis` do título
              abaixo nunca entrava em ação justamente porque o pai não encolhia.
              Mesma família do `min-width: 0` do `.pai-nav-desktop` e do `min-height: 0` da
              `.game-center`. */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="game-topbar-titulo" style={{ color: 'white', fontFamily: 'var(--ns-font-display)', fontSize: 15, marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {atividade?.titulo || ''}
            </div>
            <div className="game-progress-bar">
              <div className="game-progress-fill" style={{ width: progresso + '%', background: `linear-gradient(90deg, ${t.accent}, ${t.accent}cc)` }} />
            </div>

            {/* progress bubbles */}
            {labelProgresso && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, fontFamily: 'var(--ns-font-ui)' }}>{labelProgresso}</span>
              </div>
            )}
          </div>

          {/* topbar right: hint + XP badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {hintUses > 0 && (
              <button
                onClick={() => setHintModal(true)}
                style={{
                  background: 'rgba(168,85,247,0.2)',
                  border: '1px solid rgba(168,85,247,0.4)',
                  borderRadius: 10, padding: '4px 10px',
                  color: '#d8b4fe', cursor: 'pointer', fontSize: 14,
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontFamily: 'var(--ns-font-body)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.2)' }}
              >
                🔮 <span style={{ fontSize: 10, fontWeight: 800, fontFamily: 'var(--ns-font-ui)' }}>×{hintUses}</span>
              </button>
            )}
            <Badge variant="xp">+{atividade?.xp_reward || 0} XP</Badge>

            {/* Alterna o modo foco. `aria-pressed` porque é um interruptor que
                permanece ligado, não uma ação — e o estado ligado precisa ser
                visível no próprio botão, senão só se percebe pelo que sumiu. */}
            <button
              className="ns-foco-btn ns-alvo-toque"
              onClick={() => setFoco(f => !f)}
              aria-pressed={foco}
              title={foco ? 'Sair da tela cheia (Esc)' : 'Tela cheia'}
              aria-label={foco ? 'Sair da tela cheia' : 'Tela cheia'}
            >
              {foco ? <ArrowsIn size={17} weight="bold" /> : <ArrowsOut size={17} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Game content — centralizado, max 600px */}
        <div className="game-content">
          {children}
        </div>
      </div>

      {/* ── RIGHT SIDEBAR ─────────────────────────── */}
      <aside className="game-sidebar-right" style={{ position: 'relative', zIndex: 1 }}>

        {/* Progress ring */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 10px' }}>
            <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle cx="40" cy="40" r="34" fill="none" stroke={t.accent} strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - progresso / 100)}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: 16, fontFamily: 'var(--ns-font-ui)' }}>{Math.round(progresso)}%</span>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, fontFamily: 'var(--ns-font-ui)' }}>Progresso</div>
        </div>

        {/* Live stats */}
        {child && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {[
              ['🔥', child.streak_atual || 0, 'dias seguidos', '#f97316'],
              ['💰', child.neural_coins || 0, 'NeuralCoins',  '#fbbf24'],
              ['⭐', child.xp || 0,           'XP Total',     t.accent ],
            ].map(([ic, val, lbl, cor]) => (
              <div key={lbl} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <div>
                  <div style={{ color: cor, fontWeight: 900, fontSize: 14, fontFamily: 'var(--ns-font-ui)' }}>{val}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 600 }}>{lbl}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tip card */}
        <div style={{ background: `${t.accent}18`, borderRadius: 12, padding: '14px', border: `1px solid ${t.accent}30`, marginTop: 'auto' }}>
          <div style={{ fontSize: 10, color: t.accent, fontWeight: 800, letterSpacing: '1px', marginBottom: 8, fontFamily: 'var(--ns-font-ui)' }}>💡 DICA</div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            Leia cada opção com calma antes de responder. Cada acerto contribui para seu perfil cognitivo!
          </p>
        </div>

        {sidebarRight}
      </aside>

      {/* ── Modal de dica ──────────────────────────── */}
      {hintModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 300, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'linear-gradient(135deg, #1a0a3e, #0c0520)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 'var(--ns-radius-xl)', padding: 28, maxWidth: 380, width: '100%', boxShadow: 'var(--ns-shadow-glow-violet)' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🔮</div>
              <h3 style={{ color: 'white', fontFamily: 'var(--ns-font-display)', fontSize: 22, marginBottom: 6 }}>Dica Mágica</h3>
            </div>
            {atividade?.historinha ? (
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.7, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '14px', marginBottom: 16 }}>
                {atividade.historinha}
              </p>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, textAlign: 'center', marginBottom: 16, lineHeight: 1.6 }}>
                Leia com atenção a história e o enunciado — a resposta está lá!
              </p>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="ghost" style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }} onClick={() => setHintModal(false)}>
                Fechar
              </Button>
              <Button variant="primary" style={{ flex: 1, background: 'linear-gradient(135deg, #a855f7, #7C3AED)', boxShadow: 'var(--ns-shadow-glow-violet)' }} onClick={() => { consumePowerup(child?.id, 'pu_hint'); setHintUses(h => h - 1); setHintModal(false) }}>
                Usar Dica ×{hintUses}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
