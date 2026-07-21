import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { playSound } from '../../lib/sounds'
import { foiAssistido } from '../atividades/IntroAtividade'
import { getMultipliers, hasEffect, consumePowerup } from '../../lib/powerups'
import { Trophy, Star, CoinVertical, RocketLaunch } from '@phosphor-icons/react'
import Nix from '../../components/Nix'
import '../../styles/crianca.css'

// localStorage cheio lança QuotaExceededError. Sem isto, a tela que aparece depois de
// TODA atividade concluída quebrava por inteiro por causa de um cache que nem é crítico.
function salvarLocal(chave, valor) {
  try { localStorage.setItem(chave, valor); return true }
  catch (e) { console.warn('[Encerramento] falha ao salvar', chave, e); return false }
}

const badgeMap = {
  quiz:      { emoji: '🧠', texto: 'Mestre dos Quizzes!' },
  memoria:   { emoji: '💡', texto: 'Memória de Elefante!' },
  sequencia: { emoji: '🔢', texto: 'Mestre das Sequências!' },
  labirinto: { emoji: '🗺️', texto: 'Explorador de Labirintos!' },
  robo:      { emoji: '🤖', texto: 'Pequeno Programador!' },
  padrao:    { emoji: '🔍', texto: 'Detetive de Padrões!' },
  quizia:    { emoji: '🧬', texto: 'Gênio da IA!' },
  inventor:  { emoji: '💡', texto: 'Inventor Supremo!' },
  blocos:    { emoji: '🧱', texto: 'Arquiteto de Código!' },
  numeros:   { emoji: '🔢', texto: 'Mestre dos Números!' },
  formas:    { emoji: '🔷', texto: 'Geômetra Expert!' },
  cores:     { emoji: '🎨', texto: 'Artista das Cores!' },
  alfabeto:  { emoji: '🔤', texto: 'Mestre das Letras!' },
  colorir:   { emoji: '🖍️', texto: 'Artista Colorido!' },
  silabas:   { emoji: '🔡', texto: 'Leitor em Formação!' },
  musica:    { emoji: '🎵', texto: 'Ouvido Musical!' },
  'zona-emocoes': { emoji: '💗', texto: 'Detetive das Emoções!' },
}

const confettiColors = ['#7C3AED','#a78bfa','#f59e0b','#10b981','#f97316','#3b82f6','#ec4899','#fbbf24']

function gerarPecas(n) {
  return Array.from({ length: n }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 2,
    dur: 2 + Math.random() * 2,
    size: 6 + Math.random() * 10,
    rotate: Math.random() * 360,
  }))
}

function EfeitoCelebracao({ tipo = 'ef_confete' }) {
  const pecas = gerarPecas(32)

  const css = `
    @keyframes ef-fall {
      0%   { transform: translateY(-10px) rotate(0deg);   opacity: 0.95; }
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }
    @keyframes ef-burst {
      0%   { transform: translateY(-10px) rotate(0deg) scale(1);   opacity: 1; }
      60%  { opacity: 0.8; }
      100% { transform: translateY(110vh) rotate(360deg) scale(0.6); opacity: 0; }
    }
  `

  if (tipo === 'ef_estrelas') {
    const estrelaColors = ['#fbbf24','#fde68a','#fff','#f59e0b','#facc15']
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <style>{css}</style>
        {pecas.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-10px', left: p.left + '%',
            fontSize: p.size + 6 + 'px', lineHeight: 1,
            animation: `ef-fall ${p.dur}s ${p.delay}s linear infinite`,
            color: estrelaColors[i % estrelaColors.length],
            filter: 'drop-shadow(0 0 4px #fbbf24)',
          }}>★</div>
        ))}
      </div>
    )
  }

  if (tipo === 'ef_fogos') {
    const fogosColors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#a855f7','#ec4899']
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <style>{css}</style>
        {pecas.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-10px', left: p.left + '%',
            width: p.size * 1.5, height: p.size * 1.5, borderRadius: '50%',
            background: fogosColors[i % fogosColors.length],
            boxShadow: `0 0 ${p.size}px ${fogosColors[i % fogosColors.length]}`,
            animation: `ef-burst ${p.dur}s ${p.delay}s linear infinite`,
          }} />
        ))}
      </div>
    )
  }

  if (tipo === 'ef_arcoiris') {
    const arcColors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899']
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <style>{css}</style>
        {pecas.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-10px', left: p.left + '%',
            width: p.size * 2, height: p.size * 0.6, borderRadius: '2px',
            background: arcColors[i % arcColors.length],
            opacity: 0.75,
            animation: `ef-fall ${p.dur}s ${p.delay}s linear infinite`,
          }} />
        ))}
      </div>
    )
  }

  if (tipo === 'ef_coins') {
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <style>{css}</style>
        {pecas.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-10px', left: p.left + '%',
            fontSize: p.size + 8 + 'px', lineHeight: 1,
            animation: `ef-fall ${p.dur}s ${p.delay}s linear infinite`,
            filter: 'drop-shadow(0 0 4px #fbbf24)',
          }}>💰</div>
        ))}
      </div>
    )
  }

  if (tipo === 'ef_emoji') {
    const emojis = ['😄','🎉','🥳','🎊','✨','🏆','⭐','💫','🎈','🚀','🦄','🌟']
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <style>{css}</style>
        {pecas.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-10px', left: p.left + '%',
            fontSize: p.size + 4 + 'px', lineHeight: 1,
            animation: `ef-fall ${p.dur}s ${p.delay}s linear infinite`,
          }}>{emojis[i % emojis.length]}</div>
        ))}
      </div>
    )
  }

  if (tipo === 'ef_raio') {
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <style>{css}</style>
        {pecas.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-10px', left: p.left + '%',
            fontSize: p.size + 6 + 'px', lineHeight: 1,
            animation: `ef-fall ${p.dur * 0.8}s ${p.delay}s linear infinite`,
            color: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#fff' : '#a78bfa',
            filter: 'drop-shadow(0 0 6px #fbbf24)',
          }}>⚡</div>
        ))}
      </div>
    )
  }

  if (tipo === 'ef_aurora') {
    const auroraColors = ['#06b6d4','#8b5cf6','#10b981','#3b82f6','#a855f7','#0ea5e9']
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <style>{css}</style>
        {pecas.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-10px', left: p.left + '%',
            width: p.size * 3, height: p.size * 0.5, borderRadius: '99px',
            background: auroraColors[i % auroraColors.length],
            opacity: 0.6,
            filter: `blur(${p.size * 0.3}px)`,
            animation: `ef-fall ${p.dur * 1.4}s ${p.delay}s linear infinite`,
          }} />
        ))}
      </div>
    )
  }

  // ef_confete (default)
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <style>{css}</style>
      {pecas.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', top: '-10px', left: p.left + '%',
          width: p.size, height: p.size, borderRadius: '2px',
          background: confettiColors[i % confettiColors.length], opacity: 0.8,
          animation: `ef-fall ${p.dur}s ${p.delay}s linear infinite`,
          transform: `rotate(${p.rotate}deg)`,
        }} />
      ))}
    </div>
  )
}

export default function Encerramento() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [mostrarBadge, setMostrarBadge] = useState(false)
  const [levelUp, setLevelUp] = useState(null)
  const [showContent, setShowContent] = useState(false)

  const tipo = state?.tipo ?? ''
  const badge = badgeMap[tipo] ?? { emoji: '🏅', texto: 'Explorador de Atividades' }

  const child0 = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const lastAtividade = (() => { try { return JSON.parse(sessionStorage.getItem('ns_last_atividade') || 'null') } catch { return null } })()
  const efeitoEquipado = (() => {
    if (!child0?.id) return 'ef_confete'
    try { return JSON.parse(localStorage.getItem(`ns_efeito_${child0.id}`) || 'null')?.id || 'ef_confete' } catch { return 'ef_confete' }
  })()
  const bonusEstudo = foiAssistido(child0?.id, state?.atividade_id) ? 5 : 0
  const { xpMult, coinsMult } = child0?.id ? getMultipliers(child0.id) : { xpMult: 1, coinsMult: 1 }
  const xp = Math.round(((state?.xp ?? 0) + bonusEstudo) * xpMult)
  const coins = Math.round((state?.coins ?? 0) * coinsMult)
  const powerupXpAtivo = xpMult > 1
  const powerupCoinsAtivo = coinsMult > 1
  const titulo = state?.titulo ?? null

  useEffect(() => {
    if (!titulo) { navigate('/trilha', { replace: true }); return }

    const entrada = {
      titulo: state.titulo,
      xp,
      coins,
      emoji: state.emoji || '⭐',
      tipo: state.tipo || '',
      atividade_id: state.atividade_id || null,
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
    }

    // ns_historico corrompido ou localStorage cheio derrubava a tela INTEIRA aqui,
    // e esta é a tela que aparece depois de TODA atividade concluída
    const hist = (() => {
      try {
        const h = JSON.parse(localStorage.getItem('ns_historico') || '[]')
        return Array.isArray(h) ? h : []
      } catch { return [] }
    })()
    const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()

    if (child) {
      entrada.child_id = child.id
      const novoXP = (child.xp || 0) + xp
      const novasCoins = (child.neural_coins || 0) + coins
      const nivelAtual = child.nivel || 1
      const novoNivel = Math.max(nivelAtual, Math.floor(novoXP / 500) + 1)
      if (novoNivel > nivelAtual) setTimeout(() => setLevelUp({ de: nivelAtual, para: novoNivel }), 800)
      const hoje = new Date().toDateString()
      const ultimoAtivoKey = 'ns_ultimo_ativo_' + child.id
      const ultimoAtivo = localStorage.getItem(ultimoAtivoKey)
      let novoStreak = child.streak_atual || 0
      if (ultimoAtivo !== hoje) {
        const ontem = new Date(Date.now() - 86400000).toDateString()
        if (ultimoAtivo === ontem || hasEffect(child.id, 'streak_shield')) {
          novoStreak = novoStreak + 1
        } else {
          novoStreak = 1
        }
        salvarLocal(ultimoAtivoKey, hoje)
      }
      const novoStreakMax = Math.max(child.streak_maximo || 0, novoStreak)
      const childAtualizado = { ...child, xp: novoXP, neural_coins: novasCoins, nivel: novoNivel, streak_atual: novoStreak, streak_maximo: novoStreakMax }
      salvarLocal('ns_active_child', JSON.stringify(childAtualizado))
      supabase.from('children').update({ xp: novoXP, neural_coins: novasCoins, nivel: novoNivel, streak_atual: novoStreak, streak_maximo: novoStreakMax }).eq('id', child.id).then(() => {})
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) return
        supabase.from('ns_historico').insert({ child_id: child.id, parent_id: user.id, titulo: entrada.titulo, xp: entrada.xp, coins: entrada.coins, emoji: entrada.emoji, tipo: entrada.tipo, data: entrada.data, timestamp: entrada.timestamp }).then(() => {})
      })
    }

    hist.unshift(entrada)
    salvarLocal('ns_historico', JSON.stringify(hist.slice(0, 50)))

    const t1 = setTimeout(() => playSound('coin'), 400)
    const t2 = setTimeout(() => playSound('levelup'), 1200)
    const t3 = setTimeout(() => setMostrarBadge(true), 1000)
    const t4 = setTimeout(() => setShowContent(true), 200)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0f0a1e 0%, #1e1265 50%, #0f0a1e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>

      <EfeitoCelebracao tipo={efeitoEquipado} />

      {/* Ambient glow — radial-gradient no lugar de `filter: blur()`.
          Esta tela roda o <EfeitoCelebracao> com partículas animadas por cima; com o
          filtro, cada quadro da celebração forçava o navegador a refazer o desfoque
          de 500×500 no processador. Ver a medição em GameShell.jsx. */}
      <div style={{ position: 'absolute', top: '0%', left: '10%', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, #7C3AED 0%, transparent 65%)', opacity: 0.11, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '5%', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, #f59e0b 0%, transparent 65%)', opacity: 0.1, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', width: '100%', animation: showContent ? 'ns-slide-up 0.5s ease' : 'none' }}>

        {/* Trophy */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
            <Nix pose="cheer" size={64} />
          </div>
          <Trophy weight="duotone" size={90} color="#F59E0B" className="ns-icon-bounce" style={{ marginBottom: '8px', filter: 'drop-shadow(0 0 40px rgba(245,158,11,0.6))' }} />
          <h1 style={{ color: 'white', fontSize: '38px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '6px', lineHeight: 1 }}>Incrível!</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>Atividade concluída com sucesso</p>
          {titulo && <p style={{ color: '#a78bfa', fontSize: '14px', fontWeight: '700', marginTop: '6px' }}>"{titulo}"</p>}
        </div>

        {/* XP & Coins */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(245,158,11,0.15)', borderRadius: '18px', padding: '24px', textAlign: 'center', border: '1.5px solid rgba(245,158,11,0.4)', animation: 'ns-pop 0.4s 0.3s both' }}>
            <Star weight="duotone" size={32} color="#F59E0B" className="ns-icon-bounce" style={{ marginBottom: '8px' }} />
            <div style={{ color: 'var(--color-reward)', fontSize: 'var(--text-3xl)', fontWeight: '800', letterSpacing: '-1px' }}>+{xp}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>XP Ganho</div>
          </div>
          <div style={{ background: 'rgba(245,158,11,0.15)', borderRadius: '18px', padding: '24px', textAlign: 'center', border: '1.5px solid rgba(245,158,11,0.4)', animation: 'ns-pop 0.4s 0.5s both' }}>
            <CoinVertical weight="duotone" size={32} color="#F59E0B" style={{ marginBottom: '8px' }} />
            <div style={{ color: 'var(--color-reward)', fontSize: 'var(--text-3xl)', fontWeight: '800', letterSpacing: '-1px' }}>+{coins}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>NeuralCoins</div>
          </div>
        </div>

        {/* Power-up Ativo */}
        {(powerupXpAtivo || powerupCoinsAtivo) && (
          <div style={{ background: 'rgba(245,158,11,0.15)', borderRadius: '14px', padding: '12px 18px', marginBottom: '14px', border: '1px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', gap: '10px', animation: 'ns-slide-up 0.4s 0.2s both' }}>
            <span style={{ fontSize: '22px' }}>⚡</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', color: '#fbbf24', fontSize: '13px' }}>Power-up Ativo!</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
                {powerupXpAtivo && `XP ×${xpMult}`}{powerupXpAtivo && powerupCoinsAtivo && ' • '}{powerupCoinsAtivo && `Coins ×${coinsMult}`}
              </div>
            </div>
          </div>
        )}

        {/* Bônus Estudou Antes */}
        {bonusEstudo > 0 && (
          <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '14px', padding: '12px 18px', marginBottom: '14px', border: '1px solid rgba(251,191,36,0.3)', display: 'flex', alignItems: 'center', gap: '10px', animation: 'ns-slide-up 0.4s 0.4s both' }}>
            <Star weight="duotone" size={22} color="#F59E0B" className="ns-icon-bounce" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', color: '#fde68a', fontSize: '13px' }}>Bônus: Estudou Antes!</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Você assistiu o conteúdo antes de jogar</div>
            </div>
            <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '16px' }}>+5 XP</div>
          </div>
        )}

        {/* Level up */}
        {levelUp && (
          <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2))', borderRadius: '16px', padding: '20px 24px', marginBottom: '16px', border: '1.5px solid rgba(167,139,250,0.5)', textAlign: 'center', animation: 'ns-pop 0.5s 0.6s both' }}>
            <RocketLaunch weight="duotone" size={40} color="#F97316" style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: '900', color: 'white', fontSize: '22px', letterSpacing: '-0.5px' }}>LEVEL UP!</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', marginTop: '6px' }}>
              Nível {levelUp.de} → <strong style={{ color: '#fde68a', fontSize: '18px' }}>Nível {levelUp.para}</strong> 🎊
            </div>
          </div>
        )}

        {/* Badge */}
        {mostrarBadge && (
          <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,179,8,0.1))', borderRadius: '16px', padding: '18px 22px', marginBottom: '20px', border: '1.5px solid rgba(252,211,77,0.4)', display: 'flex', alignItems: 'center', gap: '14px', animation: 'ns-pop 0.5s ease' }}>
            <div style={{ fontSize: '36px', flexShrink: 0 }}>{badge.emoji}</div>
            <div>
              <div style={{ fontWeight: '800', color: '#fde68a', fontSize: '15px' }}>Nova conquista desbloqueada!</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '3px' }}>{badge.texto} — Continue assim!</div>
            </div>
          </div>
        )}

        {/* Reviver */}
        {lastAtividade && child0?.id && hasEffect(child0.id, 'reviver') && (
          <button
            onClick={() => {
              consumePowerup(child0.id, 'pu_reviver')
              playSound('click')
              navigate(`/atividade/${lastAtividade.tipo}`, { state: { atividade: lastAtividade, refazendo: false } })
            }}
            style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid rgba(236,72,153,0.4)', background: 'rgba(236,72,153,0.15)', color: '#f9a8d4', fontWeight: '800', fontSize: '14px', cursor: 'pointer', marginBottom: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            💖 Reviver — Jogar Outra Vez
          </button>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { playSound('click'); navigate('/trilha') }}
            style={{ flex: 1, padding: '16px', borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--color-action)', color: 'white', fontWeight: '900', fontSize: 'var(--text-base)', cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: '0 8px 24px rgba(249,115,22,0.4)', transition: 'transform 0.2s', minHeight: '52px' }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            Próxima atividade →
          </button>
          <button
            onClick={() => { playSound('click'); navigate('/home-crianca') }}
            style={{ flex: 1, padding: '16px', borderRadius: '14px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)', fontWeight: '700', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'background 0.2s' }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.07)'}
          >
            🏠 Início
          </button>
        </div>
      </div>
    </div>
  )
}
