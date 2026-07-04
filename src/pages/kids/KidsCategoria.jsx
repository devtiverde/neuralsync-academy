import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useKids } from '../../hooks/useKids'
import { kidsStorias } from '../../data/kidsStorias'
import { kidsExperimentos } from '../../data/kidsExperimentos'
import { kidsFlashcards } from '../../data/kidsFlashcards'
import { kidsHistoriaInterativa, TIPOS_FINAL } from '../../data/kidsHistoriaInterativa'
import LayoutCrianca from '../../components/LayoutCrianca'
import '../../styles/crianca.css'

// ── HISTÓRIA ILUSTRADA ──
function HistoriaIlustrada({ historia, cor }) {
  const [cenaAtiva, setCenaAtiva] = useState(0)
  if (!historia) return null

  const cena = historia.cenas[cenaAtiva]
  const isLast = cenaAtiva === historia.cenas.length - 1

  return (
    <div style={{
      background: `linear-gradient(135deg, ${cor}18, rgba(255,255,255,0.03))`,
      border: `1.5px solid ${cor}35`,
      borderRadius: '22px', overflow: 'hidden',
    }}>
      {/* barra topo colorida */}
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${cor}, ${cor}60)` }} />

      {/* header */}
      <div style={{ padding: '18px 22px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: cor + '28', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>📖</div>
        <div>
          <div style={{ fontSize: '10px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '1px' }}>História Ilustrada</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: 'white', lineHeight: 1.2 }}>{historia.titulo}</div>
        </div>
        {/* indicador de cena */}
        <div style={{ marginLeft: 'auto', background: cor + '22', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '800', color: cor }}>
          {cenaAtiva + 1}/{historia.cenas.length}
        </div>
      </div>

      {/* cena */}
      <div style={{ padding: '24px 22px 18px' }}>
        {/* emoji da cena em destaque */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '110px', height: '110px', borderRadius: '32px',
            background: `linear-gradient(135deg, ${cor}28, ${cor}45)`,
            border: `2px solid ${cor}50`, fontSize: '60px', lineHeight: 1,
            boxShadow: `0 8px 32px ${cor}30`,
          }}>{cena.emoji}</div>
        </div>

        {/* badge cena + título */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', justifyContent: 'center' }}>
          <span style={{ background: cor, color: 'white', borderRadius: '20px', padding: '3px 12px', fontSize: '11px', fontWeight: '800' }}>{cena.scene}</span>
          <span style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}>{cena.titulo}</span>
        </div>

        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0, textAlign: 'center', fontStyle: 'italic' }}>
          "{cena.texto}"
        </p>
      </div>

      {/* navegação */}
      <div style={{ padding: '0 22px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* dots */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {historia.cenas.map((_, i) => (
            <button key={i} onClick={() => setCenaAtiva(i)} style={{
              width: i === cenaAtiva ? '28px' : '8px', height: '8px',
              borderRadius: '20px', border: 'none', cursor: 'pointer',
              background: i === cenaAtiva ? cor : 'rgba(255,255,255,0.2)',
              transition: 'all 0.25s', padding: 0,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {cenaAtiva > 0 && (
            <button onClick={() => setCenaAtiva(c => c - 1)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '7px 16px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>← Anterior</button>
          )}
          {!isLast && (
            <button onClick={() => setCenaAtiva(c => c + 1)} style={{ background: cor, border: 'none', borderRadius: '10px', padding: '7px 16px', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>Próxima →</button>
          )}
          {isLast && (
            <span style={{ fontSize: '13px', color: cor, fontWeight: '800', alignSelf: 'center' }}>✓ Completa!</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MINI QUIZ ──
function MiniQuiz({ quiz, cor }) {
  const [atual, setAtual] = useState(0)
  const [selecionada, setSelecionada] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const [concluido, setConcluido] = useState(false)

  const q = quiz[atual]

  function escolher(idx) {
    if (selecionada !== null) return
    setSelecionada(idx)
    if (idx === q.correta) setAcertos(a => a + 1)
  }

  function avancar() {
    if (atual + 1 >= quiz.length) setConcluido(true)
    else { setAtual(a => a + 1); setSelecionada(null) }
  }

  function reiniciar() { setAtual(0); setSelecionada(null); setAcertos(0); setConcluido(false) }

  if (concluido) {
    const xp = acertos * 15
    const estrelas = acertos === quiz.length ? 3 : acertos >= quiz.length / 2 ? 2 : 1
    return (
      <div style={{ textAlign: 'center', padding: '24px 16px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px', letterSpacing: '4px' }}>{'⭐'.repeat(estrelas)}</div>
        <div style={{ fontSize: '20px', fontWeight: '900', color: 'white', marginBottom: '4px' }}>
          {acertos === quiz.length ? 'Perfeito! 🎉' : acertos >= quiz.length / 2 ? 'Muito bem! 👏' : 'Continue estudando! 💪'}
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          {acertos} de {quiz.length} acertos • +{xp} XP
        </div>
        <button onClick={reiniciar} style={{ background: cor, color: 'white', border: 'none', borderRadius: '12px', padding: '12px 28px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          🔁 Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Pergunta {atual + 1} de {quiz.length}</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {quiz.map((_, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i <= atual ? cor : 'rgba(255,255,255,0.15)', opacity: i < atual ? 0.5 : 1 }} />
          ))}
        </div>
      </div>

      <div style={{ fontSize: '15px', fontWeight: '800', color: 'white', marginBottom: '16px', lineHeight: 1.4 }}>{q.pergunta}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {q.opcoes.map((op, i) => {
          let bg = 'rgba(255,255,255,0.06)'
          let border = '1.5px solid rgba(255,255,255,0.1)'
          let textColor = 'rgba(255,255,255,0.8)'
          if (selecionada !== null) {
            if (i === q.correta) { bg = 'rgba(16,185,129,0.15)'; border = '2px solid #10b981'; textColor = '#6ee7b7' }
            else if (i === selecionada && i !== q.correta) { bg = 'rgba(239,68,68,0.15)'; border = '2px solid #ef4444'; textColor = '#fca5a5' }
          }
          return (
            <button key={i} onClick={() => escolher(i)} style={{ background: bg, border, borderRadius: '12px', padding: '12px 14px', textAlign: 'left', cursor: selecionada !== null ? 'default' : 'pointer', fontWeight: '600', fontSize: '13px', color: textColor, fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.15s ease' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
                {selecionada !== null ? (i === q.correta ? '✓' : i === selecionada ? '✗' : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
              </span>
              {op}
            </button>
          )
        })}
      </div>

      {selecionada !== null && (
        <div style={{ background: selecionada === q.correta ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', border: `1.5px solid ${selecionada === q.correta ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`, borderRadius: '12px', padding: '12px 14px', marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: selecionada === q.correta ? '#6ee7b7' : '#fcd34d', marginBottom: '3px' }}>
            {selecionada === q.correta ? '✅ Correto!' : '💡 Aprenda mais:'}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{q.explicacao}</div>
        </div>
      )}

      {selecionada !== null && (
        <button onClick={avancar} style={{ width: '100%', background: cor, color: 'white', border: 'none', borderRadius: '12px', padding: '13px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {atual + 1 >= quiz.length ? 'Ver resultado →' : 'Próxima →'}
        </button>
      )}
    </div>
  )
}

// ── EXPERIMENTOS ──
function Experimentos({ experimentos, cor }) {
  const [aberto, setAberto] = useState(null)

  if (!experimentos || experimentos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.4)' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔬</div>
        <p style={{ fontWeight: '600' }}>Experimentos em breve!</p>
      </div>
    )
  }

  const NIVEL_LABEL = { todos: 'Todos os níveis', construtores: '6–8 anos', criadores: '9–11 anos', inventores: '12+ anos' }
  const NIVEL_COR = { todos: '#10b981', construtores: '#3b82f6', criadores: '#7c3aed', inventores: '#f59e0b' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '20px' }}>🏠</span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#6ee7b7', marginBottom: '3px' }}>Atividades para fazer em casa</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>Peça ajuda de um adulto para materiais cortantes, fogo ou substâncias químicas.</div>
        </div>
      </div>

      {experimentos.map((exp, i) => (
        <div key={i} style={{
          background: aberto === i ? `${cor}0d` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${aberto === i ? cor + '35' : 'rgba(255,255,255,0.09)'}`,
          borderRadius: '18px', overflow: 'hidden', transition: 'all 0.2s',
        }}>
          <button
            onClick={() => setAberto(aberto === i ? null : i)}
            style={{ width: '100%', background: 'none', border: 'none', padding: '16px 20px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: cor + '22', border: `1.5px solid ${cor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
              {exp.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '800', color: 'white', lineHeight: 1.3, marginBottom: '5px' }}>{exp.nome}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ background: NIVEL_COR[exp.nivel] + '22', color: NIVEL_COR[exp.nivel], borderRadius: '20px', padding: '2px 8px', fontSize: '11px', fontWeight: '700' }}>{NIVEL_LABEL[exp.nivel]}</span>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', borderRadius: '20px', padding: '2px 8px', fontSize: '11px', fontWeight: '700' }}>⏱ {exp.tempo} min</span>
              </div>
            </div>
            <span style={{ color: cor, fontSize: '16px', flexShrink: 0, transition: 'transform 0.2s', transform: aberto === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </button>

          {aberto === i && (
            <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>📋 Materiais</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {exp.materiais.map((m, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cor, flexShrink: 0, marginTop: '6px' }} />
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>🔢 Passo a passo</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {exp.passos.map((p, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: cor + '28', border: `1.5px solid ${cor}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: cor, flexShrink: 0 }}>{j + 1}</div>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, paddingTop: '2px' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: cor + '12', border: `1px solid ${cor}30`, borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: cor, marginBottom: '6px' }}>🔭 A ciência por trás</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>{exp.ciencia}</p>
              </div>

              <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '12px', padding: '12px 14px' }}>
                <p style={{ fontSize: '13px', color: '#fcd34d', margin: 0, lineHeight: 1.5 }}>{exp.dica}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── FLASHCARDS com flip 3D ──
function Flashcards({ cards, cor }) {
  const [idx, setIdx] = useState(0)
  const [virado, setVirado] = useState(false)
  const [concluidos, setConcluidos] = useState([])

  if (!cards || cards.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.4)' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🃏</div>
        <p style={{ fontWeight: '600' }}>Flashcards em breve!</p>
      </div>
    )
  }

  const card = cards[idx]
  const progresso = Math.round((concluidos.length / cards.length) * 100)

  function marcarSabia() {
    if (!concluidos.includes(idx)) setConcluidos(c => [...c, idx])
    avancar()
  }

  function avancar() {
    setVirado(false)
    setTimeout(() => setIdx(i => (i + 1) % cards.length), 180)
  }

  function anterior() {
    setVirado(false)
    setTimeout(() => setIdx(i => (i - 1 + cards.length) % cards.length), 180)
  }

  if (concluidos.length === cards.length) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '60px', marginBottom: '12px' }}>🎓</div>
        <div style={{ fontSize: '20px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>Todos revisados!</div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>{cards.length} flashcards concluídos</div>
        <button onClick={() => { setConcluidos([]); setIdx(0); setVirado(false) }} style={{ background: cor, color: 'white', border: 'none', borderRadius: '12px', padding: '12px 28px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>
          🔁 Revisar novamente
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* barra de progresso */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Card {idx + 1} de {cards.length}</span>
          <span style={{ fontSize: '12px', color: cor, fontWeight: '700' }}>{concluidos.length} sabidos ✓</span>
        </div>
        <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: `linear-gradient(90deg, ${cor}, ${cor}80)`, borderRadius: '20px', width: `${progresso}%`, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* hint */}
      <div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: '600' }}>
        Toque no card para virar
      </div>

      {/* Card com flip 3D */}
      <div style={{ perspective: '1000px', height: '230px' }} onClick={() => setVirado(v => !v)}>
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          transform: virado ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
        }}>
          {/* Frente */}
          <div style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            background: 'rgba(255,255,255,0.07)',
            border: `2px solid rgba(255,255,255,0.12)`,
            borderRadius: '22px', padding: '28px 24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: '52px' }}>{card.emoji}</div>
            <div style={{ fontSize: '17px', fontWeight: '800', color: 'white', lineHeight: 1.4, textAlign: 'center' }}>{card.frente}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>👆</span> toque para revelar
            </div>
          </div>

          {/* Verso (rotateY 180 para compensar o flip) */}
          <div style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${cor}22, ${cor}10)`,
            border: `2px solid ${cor}50`,
            borderRadius: '22px', padding: '28px 24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px',
            boxShadow: `0 4px 32px ${cor}25`,
          }}>
            <div style={{ fontSize: '52px' }}>{card.emoji}</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'white', lineHeight: 1.5, textAlign: 'center' }}>{card.verso}</div>
            {card.dica && (
              <div style={{ fontSize: '12px', color: cor, fontWeight: '700', background: cor + '18', borderRadius: '20px', padding: '5px 14px', textAlign: 'center' }}>
                💡 {card.dica}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controles */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={anterior} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>← Anterior</button>
        {virado && (
          <button onClick={marcarSabia} style={{ flex: 2, background: '#10b981', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', fontWeight: '800', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>✓ Eu sabia!</button>
        )}
        <button onClick={avancar} style={{ flex: 1, background: cor, border: 'none', borderRadius: '12px', padding: '12px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Próximo →</button>
      </div>
    </div>
  )
}

// ── ATIVIDADES OFFLINE / DICAS ──
function AtividadesOfflineKids({ cor, titulo }) {
  const dicas = [
    { icon: '📓', titulo: 'Caderno de Descobertas', texto: 'Escreva 3 coisas que você aprendeu hoje sobre este tema. Desenhe ou cole figuras.' },
    { icon: '🗣️', titulo: 'Ensine Alguém', texto: `Explique o que você aprendeu sobre ${titulo} para alguém da família. Quem ensina aprende duas vezes!` },
    { icon: '🎭', titulo: 'Encenar', texto: 'Crie uma peça curta sobre o tema. Use roupas, acessórios e improvise!' },
    { icon: '🗺️', titulo: 'Mapa Mental', texto: 'No papel, escreva o tema no centro e conecte todas as ideias que você conhece ao redor.' },
    { icon: '🔍', titulo: 'Pesquisa na Biblioteca', texto: 'Procure um livro sobre este tema. Leia pelo menos 2 páginas e conte o que descobriu.' },
    { icon: '📸', titulo: 'Fotógrafo Curioso', texto: 'Saia com um adulto e fotografe coisas no mundo real que se relacionem com o que você aprendeu.' },
    { icon: '✉️', titulo: 'Carta para o Futuro', texto: 'Escreva uma carta para você mesmo explicando o que sabe hoje sobre este tema.' },
    { icon: '🎨', titulo: 'Arte Temática', texto: 'Crie um desenho, colagem ou pintura inspirada no que você estudou.' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>📵</span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#fcd34d', marginBottom: '3px' }}>Aprendizado além da tela</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>Atividades para consolidar o conhecimento sem precisar de dispositivo.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {dicas.map((d, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{d.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'white', marginBottom: '6px', lineHeight: 1.3 }}>{d.titulo}</div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, margin: 0 }}>{d.texto}</p>
          </div>
        ))}
      </div>

      <div style={{ background: `linear-gradient(135deg, ${cor}15, rgba(124,58,237,0.15))`, border: `1px solid ${cor}30`, borderRadius: '16px', padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: '24px' }}>⌨️</span>
          <div style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>Pratique digitação</div>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, margin: '0 0 12px' }}>
          Escreva um resumo do que você aprendeu hoje no seu Diário ou pratique digitação com palavras deste tema!
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href="/diario" style={{ flex: 1, display: 'block', background: cor, color: 'white', borderRadius: '10px', padding: '10px 14px', fontWeight: '700', fontSize: '12px', textDecoration: 'none', textAlign: 'center' }}>📔 Meu Diário</a>
          <a href="/digitacao" style={{ flex: 1, display: 'block', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px', padding: '10px 14px', fontWeight: '700', fontSize: '12px', textDecoration: 'none', textAlign: 'center' }}>⌨️ Digitar</a>
        </div>
      </div>
    </div>
  )
}

// ── INTERATIVA (BREVE) ── fallback para categorias sem história cadastrada
function HistoriaInterativaBreve({ cor }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: cor + '22', border: `2px solid ${cor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🎭</div>
      <div>
        <div style={{ fontSize: '18px', fontWeight: '900', color: 'white', marginBottom: '6px' }}>História Interativa</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto' }}>
          Escolha seus caminhos e viva a aventura! Esta modalidade chegará em breve com múltiplos finais para este tema.
        </div>
      </div>
      <div style={{ background: cor + '20', border: `1px solid ${cor}40`, borderRadius: '20px', padding: '6px 16px', fontSize: '12px', fontWeight: '800', color: cor }}>
        🔒 Em breve
      </div>
    </div>
  )
}

// ── INTERATIVA: histórias com múltiplos finais ──
function getFinaisDescobertos(childId, categoria) {
  try {
    const all = JSON.parse(localStorage.getItem('ns_hist_interativa_' + (childId || 'anon')) || '{}')
    return all[categoria] || []
  } catch { return [] }
}
function salvarFinalDescoberto(childId, categoria, tipoFinal) {
  try {
    const key = 'ns_hist_interativa_' + (childId || 'anon')
    const all = JSON.parse(localStorage.getItem(key) || '{}')
    const atuais = all[categoria] || []
    if (!atuais.includes(tipoFinal)) all[categoria] = [...atuais, tipoFinal]
    localStorage.setItem(key, JSON.stringify(all))
  } catch { /* localStorage indisponível — segue sem persistir */ }
}

function HistoriaInterativaEscolha({ historia, cor, childId, categoria }) {
  const [noId, setNoId] = useState(historia.inicio)
  const [descobertos, setDescobertos] = useState(() => getFinaisDescobertos(childId, categoria))
  const no = historia.nos[noId]

  useEffect(() => {
    if (no.ehFinal) {
      salvarFinalDescoberto(childId, categoria, no.tipoFinal)
      setDescobertos(getFinaisDescobertos(childId, categoria))
    }
  }, [noId])

  if (no.ehFinal) {
    const tf = TIPOS_FINAL[no.tipoFinal]
    return (
      <div style={{ textAlign: 'center', padding: '8px 4px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '92px', height: '92px', borderRadius: '28px', marginBottom: '18px',
          background: `linear-gradient(135deg, ${cor}30, ${cor}12)`,
          border: `2px solid ${cor}50`, fontSize: '46px',
          boxShadow: `0 8px 32px ${cor}30`,
        }}>{no.emoji}</div>

        <div style={{ background: cor, color: 'white', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '20px', padding: '5px 14px', fontSize: '12px', fontWeight: '800', marginBottom: '14px' }}>
          <span>{tf.emoji}</span>{tf.label}
        </div>

        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 18px' }}>
          {no.texto}
        </p>

        <div style={{ background: cor + '12', border: `1px solid ${cor}30`, borderRadius: '14px', padding: '14px 16px', maxWidth: '480px', margin: '0 auto 20px', textAlign: 'left' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>💡 Você aprendeu</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>{no.licao}</p>
        </div>

        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '18px' }}>
          {Object.keys(TIPOS_FINAL).map(k => (
            <span key={k} style={{
              fontSize: '20px', opacity: descobertos.includes(k) ? 1 : 0.18,
              filter: descobertos.includes(k) ? 'none' : 'grayscale(1)',
            }} title={TIPOS_FINAL[k].label}>{TIPOS_FINAL[k].emoji}</span>
          ))}
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '700', marginLeft: '6px', alignSelf: 'center' }}>
            {descobertos.length}/4 finais
          </span>
        </div>

        <button onClick={() => setNoId(historia.inicio)} style={{ background: cor, color: 'white', border: 'none', borderRadius: '12px', padding: '12px 28px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          🔁 {descobertos.length < 4 ? 'Tentar outro caminho' : 'Jogar de novo'}
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '92px', height: '92px', borderRadius: '28px',
          background: `linear-gradient(135deg, ${cor}28, ${cor}10)`,
          border: `2px solid ${cor}40`, fontSize: '46px',
          boxShadow: `0 8px 28px ${cor}25`,
        }}>{no.emoji}</div>
      </div>

      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, textAlign: 'center', maxWidth: '480px', margin: '0 auto 22px' }}>
        {no.texto}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '480px', margin: '0 auto' }}>
        {no.escolhas.map((esc, i) => (
          <button
            key={i}
            onClick={() => setNoId(esc.proximo)}
            style={{
              background: 'rgba(255,255,255,0.06)', border: `1.5px solid ${cor}35`,
              borderRadius: '14px', padding: '14px 18px', textAlign: 'left',
              color: 'white', fontWeight: '700', fontSize: '13.5px', lineHeight: 1.4,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.15s ease',
            }}
          >
            <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: cor + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: cor, flexShrink: 0 }}>
              {String.fromCharCode(65 + i)}
            </span>
            {esc.texto}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── CONFIG DAS ABAS ──
const ABAS = [
  { id: 'historia',    label: '📖', nome: 'História' },
  { id: 'experimentos', label: '🧪', nome: 'Experimentos' },
  { id: 'flashcards',  label: '🃏', nome: 'Flashcards' },
  { id: 'offline',     label: '📵', nome: 'Offline' },
  { id: 'interativa',  label: '🎭', nome: 'Interativa' },
]

// ── COMPONENTE PRINCIPAL ──
export default function KidsCategoria() {
  const navigate = useNavigate()
  const { categoria } = useParams()
  const { state } = useLocation()
  const { data: kidsData, loading } = useKids()
  const [abaAtiva, setAbaAtiva] = useState('historia')
  const voltarQuiz = state?.voltarQuiz === true
  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()

  if (loading) return (
    <div style={{ background: '#0f0a1e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#7C3AED', fontWeight: '700' }}>Carregando...</div>
    </div>
  )

  const dados = kidsData?.[categoria]
  const historiaInterativa = kidsHistoriaInterativa[categoria] || null

  if (!dados) {
    return (
      <LayoutCrianca child={child}>
        <div className="ns-pad" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Categoria não encontrada</p>
          <button onClick={() => navigate('/kids')} style={{ marginTop: '16px', background: '#7C3AED', color: 'white', border: 'none', borderRadius: '12px', padding: '12px 24px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>← Voltar</button>
        </div>
      </LayoutCrianca>
    )
  }

  const { titulo, emoji, cor, introducao, secoes, fatos, quiz } = dados
  const historia = kidsStorias[categoria] || null
  const experimentos = kidsExperimentos[categoria] || []
  const flashcards = kidsFlashcards[categoria] || []

  return (
    <LayoutCrianca child={child}>
      <div className="ns-pad">

        {/* ── HEADER IMERSIVO ── */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${cor}28 0%, ${cor}10 60%, rgba(15,10,30,0) 100%)`,
          border: `1.5px solid ${cor}30`,
          borderRadius: '24px', padding: '22px 24px', marginBottom: '20px',
        }}>
          {/* orb decorativo */}
          <div style={{
            position: 'absolute', right: '-30px', top: '-30px',
            width: '130px', height: '130px', borderRadius: '50%',
            background: `radial-gradient(circle, ${cor}30, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
            <button
              onClick={() => voltarQuiz ? navigate(-1) : navigate('/kids')}
              style={{ background: 'rgba(255,255,255,0.1)', border: `1px solid ${cor}30`, borderRadius: '10px', width: '36px', height: '36px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >←</button>

            {/* emoji grande */}
            <div style={{
              width: '60px', height: '60px', borderRadius: '20px', flexShrink: 0,
              background: `linear-gradient(135deg, ${cor}35, ${cor}18)`,
              border: `2px solid ${cor}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px',
              boxShadow: `0 4px 20px ${cor}30`,
            }}>{emoji}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '3px' }}>Kids TV</div>
              <h2 style={{ color: 'white', fontSize: '19px', fontWeight: '900', lineHeight: 1.2, margin: 0 }}>{titulo}</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', margin: '3px 0 0', fontWeight: '600' }}>
                {voltarQuiz ? '📚 Estude e volte para o quiz!' : 'Aprenda, explore e faça o quiz!'}
              </p>
            </div>
          </div>

          {voltarQuiz && (
            <div style={{ marginTop: '14px', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600' }}>📚 Leia o conteúdo e volte para o quiz</span>
              <button onClick={() => navigate(-1)} style={{ background: '#7C3AED', border: 'none', borderRadius: '20px', padding: '6px 14px', color: 'white', fontWeight: '800', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                Voltar ao quiz →
              </button>
            </div>
          )}
        </div>

        {/* ── SEGMENTED TABS ── */}
        <div style={{
          display: 'flex', gap: '3px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '4px',
          marginBottom: '20px', overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {ABAS.map(aba => {
            const isActive = abaAtiva === aba.id
            const isDisabled = aba.id === 'interativa' && !historiaInterativa
            return (
              <button
                key={aba.id}
                onClick={() => !isDisabled && setAbaAtiva(aba.id)}
                style={{
                  flex: 1, minWidth: '70px',
                  background: isActive ? cor : 'transparent',
                  border: 'none', borderRadius: '12px',
                  padding: '9px 10px', whiteSpace: 'nowrap',
                  color: isActive ? 'white' : isDisabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)',
                  fontWeight: isActive ? '800' : '600',
                  fontSize: '13px', cursor: isDisabled ? 'default' : 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.2s',
                  boxShadow: isActive ? `0 2px 12px ${cor}50` : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{aba.label}</span>
                <span style={{ fontSize: '11px', lineHeight: 1 }}>{aba.nome}</span>
              </button>
            )
          })}
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ABA: HISTÓRIA */}
          {abaAtiva === 'historia' && (
            <>
              <HistoriaIlustrada historia={historia} cor={cor} />

              {/* Introdução */}
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '20px', padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: cor + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{emoji}</div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Introdução</div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>{introducao}</p>
                  </div>
                </div>
              </div>

              {/* Seções */}
              {secoes.map((secao, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: cor + '22', border: `1px solid ${cor}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{secao.emoji}</div>
                    <h3 style={{ fontSize: '15px', fontWeight: '900', color: 'white', margin: 0, lineHeight: 1.3 }}>{secao.titulo}</h3>
                  </div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: 0 }}>{secao.texto}</p>
                </div>
              ))}

              {/* Fatos */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>⚡ Fatos Incríveis</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {fatos.map((fato, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: cor + '10', borderRadius: '12px', borderLeft: `3px solid ${cor}` }}>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, fontWeight: '500' }}>{fato}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Quiz */}
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${cor}25`,
                borderRadius: '20px', overflow: 'hidden',
              }}>
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${cor}, ${cor}50)` }} />
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: cor + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🧠</div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '900', color: 'white' }}>Mini Quiz</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>{quiz.length} perguntas • +{quiz.length * 15} XP possíveis</div>
                    </div>
                  </div>
                  <MiniQuiz quiz={quiz} cor={cor} />
                </div>
              </div>
            </>
          )}

          {/* ABA: EXPERIMENTOS */}
          {abaAtiva === 'experimentos' && (
            <Experimentos experimentos={experimentos} cor={cor} />
          )}

          {/* ABA: FLASHCARDS */}
          {abaAtiva === 'flashcards' && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${cor}25`, borderRadius: '22px', overflow: 'hidden' }}>
              <div style={{ height: '3px', background: `linear-gradient(90deg, ${cor}, ${cor}50)` }} />
              <div style={{ padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: cor + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🃏</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '900', color: 'white' }}>Flashcards</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{flashcards.length} cards • Toque para virar</div>
                  </div>
                </div>
                <Flashcards cards={flashcards} cor={cor} />
              </div>
            </div>
          )}

          {/* ABA: OFFLINE */}
          {abaAtiva === 'offline' && (
            <AtividadesOfflineKids cor={cor} titulo={titulo} emoji={emoji} />
          )}

          {/* ABA: INTERATIVA */}
          {abaAtiva === 'interativa' && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ height: '4px', background: `linear-gradient(90deg, ${cor}, #7C3AED)` }} />
              {historiaInterativa ? (
                <div style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: cor + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎭</div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '900', color: 'white' }}>{historiaInterativa.titulo}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Escolha seu caminho • 4 finais possíveis</div>
                    </div>
                  </div>
                  <HistoriaInterativaEscolha
                    key={categoria}
                    historia={historiaInterativa}
                    cor={cor}
                    childId={child?.id}
                    categoria={categoria}
                  />
                </div>
              ) : (
                <HistoriaInterativaBreve cor={cor} />
              )}
            </div>
          )}

        </div>
      </div>
    </LayoutCrianca>
  )
}
