import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { kidsData } from '../../data/kidsData'
import '../../styles/crianca.css'

const menu = [
  { icon: '🏠', label: 'Início', path: '/home-crianca' },
  { icon: '🗺️', label: 'Trilha', path: '/trilha' },
  { icon: '🎬', label: 'Kids', path: '/kids' },
  { icon: '🏆', label: 'Ranking', path: '/ranking' },
  { icon: '🏪', label: 'Loja', path: '/loja' },
  { icon: '👤', label: 'Perfil', path: '/perfil-crianca' },
]

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
    if (atual + 1 >= quiz.length) {
      setConcluido(true)
    } else {
      setAtual(a => a + 1)
      setSelecionada(null)
    }
  }

  function reiniciar() {
    setAtual(0)
    setSelecionada(null)
    setAcertos(0)
    setConcluido(false)
  }

  if (concluido) {
    const xp = acertos * 15
    const estrelas = acertos === quiz.length ? 3 : acertos >= quiz.length / 2 ? 2 : 1
    return (
      <div style={{ textAlign: 'center', padding: '24px 16px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px', letterSpacing: '4px' }}>{'⭐'.repeat(estrelas)}</div>
        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f0a1e', marginBottom: '4px' }}>
          {acertos === quiz.length ? 'Perfeito! 🎉' : acertos >= quiz.length / 2 ? 'Muito bem! 👏' : 'Continue estudando! 💪'}
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
          {acertos} de {quiz.length} acertos • +{xp} XP
        </div>
        <button onClick={reiniciar} style={{ background: cor, color: 'white', border: 'none', borderRadius: '12px', padding: '12px 28px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          🔁 Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>Pergunta {atual + 1} de {quiz.length}</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {quiz.map((_, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i < atual ? cor : i === atual ? cor : '#e5e7eb', opacity: i < atual ? 0.4 : 1 }} />
          ))}
        </div>
      </div>

      <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f0a1e', marginBottom: '16px', lineHeight: 1.4 }}>
        {q.pergunta}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {q.opcoes.map((op, i) => {
          let bg = 'white'
          let border = '1.5px solid #e5e7eb'
          let textColor = '#374151'

          if (selecionada !== null) {
            if (i === q.correta) { bg = '#f0fdf4'; border = '2px solid #10b981'; textColor = '#065f46' }
            else if (i === selecionada && i !== q.correta) { bg = '#fef2f2'; border = '2px solid #ef4444'; textColor = '#991b1b' }
          } else if (selecionada === i) {
            border = `2px solid ${cor}`
          }

          return (
            <button key={i} onClick={() => escolher(i)} style={{
              background: bg, border, borderRadius: '12px', padding: '12px 14px',
              textAlign: 'left', cursor: selecionada !== null ? 'default' : 'pointer',
              fontWeight: '600', fontSize: '13px', color: textColor,
              fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'all 0.15s ease',
            }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: i === q.correta && selecionada !== null ? '#10b981' : i === selecionada && selecionada !== null && i !== q.correta ? '#ef4444' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: i === q.correta && selecionada !== null ? 'white' : i === selecionada && selecionada !== null && i !== q.correta ? 'white' : '#6b7280', flexShrink: 0 }}>
                {selecionada !== null ? (i === q.correta ? '✓' : i === selecionada ? '✗' : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
              </span>
              {op}
            </button>
          )
        })}
      </div>

      {selecionada !== null && (
        <div style={{ background: selecionada === q.correta ? '#f0fdf4' : '#fef9c3', border: `1.5px solid ${selecionada === q.correta ? '#10b981' : '#fbbf24'}`, borderRadius: '12px', padding: '12px 14px', marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: selecionada === q.correta ? '#065f46' : '#92400e', marginBottom: '3px' }}>
            {selecionada === q.correta ? '✅ Correto!' : '💡 Aprenda mais:'}
          </div>
          <div style={{ fontSize: '12px', color: '#374151', lineHeight: 1.5 }}>{q.explicacao}</div>
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

export default function KidsCategoria() {
  const navigate = useNavigate()
  const { categoria } = useParams()
  const dados = kidsData[categoria]

  if (!dados) {
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
        <div className="page-wrapper" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <p style={{ color: '#9ca3af', fontWeight: '600' }}>Categoria não encontrada</p>
          <button onClick={() => navigate('/kids')} style={{ marginTop: '16px', background: '#7C3AED', color: 'white', border: 'none', borderRadius: '12px', padding: '12px 24px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>← Voltar</button>
        </div>
      </div>
    )
  }

  const { titulo, emoji, cor, introducao, secoes, fatos, quiz } = dados

  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ paddingBottom: '90px' }}>

        {/* Header */}
        <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/kids')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ fontSize: '28px' }}>{emoji}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900', lineHeight: 1.2 }}>{titulo}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Aprenda e faça o quiz!</p>
          </div>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Introdução */}
          <div className="card-white" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ fontSize: '44px', lineHeight: 1, flexShrink: 0 }}>{emoji}</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>Introdução</div>
                <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, margin: 0 }}>{introducao}</p>
              </div>
            </div>
          </div>

          {/* Seções ilustradas */}
          {secoes.map((secao, i) => (
            <div key={i} className="card-white" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: cor + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                  {secao.emoji}
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f0a1e', margin: 0, lineHeight: 1.3 }}>{secao.titulo}</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>{secao.texto}</p>
            </div>
          ))}

          {/* Fatos curiosos */}
          <div className="card-white" style={{ padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>
              ⚡ Fatos Incríveis
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {fatos.map((fato, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '11px 12px', background: cor + '0d', borderRadius: '10px', borderLeft: `3px solid ${cor}` }}>
                  <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5, fontWeight: '500' }}>{fato}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini quiz */}
          <div className="card-white" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: cor + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                🧠
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#0f0a1e' }}>Mini Quiz</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{quiz.length} perguntas • +{quiz.length * 15} XP possíveis</div>
              </div>
            </div>
            <MiniQuiz quiz={quiz} cor={cor} />
          </div>

        </div>

        {/* Bottom menu */}
        <div className="menu-bottom">
          {menu.map(item => (
            <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
              style={{ color: item.path === '/kids' ? '#7C3AED' : '#9ca3af' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontWeight: item.path === '/kids' ? '700' : '500' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
