import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useKids } from '../../hooks/useKids'
import { supabase } from '../../lib/supabase'
import LayoutCrianca from '../../components/LayoutCrianca'
import '../../styles/crianca.css'

export default function KidsVideo() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state: navState } = useLocation()
  const { data: kidsData, loading } = useKids()

  const [fase, setFase] = useState('video')
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [selecionada, setSelecionada] = useState(null)
  const [mostrarFeedback, setMostrarFeedback] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const [coins, setCoins] = useState(0)
  const [progresso, setProgresso] = useState(0)

  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()

  const categoriaKey = !loading
    ? ((id && kidsData?.[id]) ? id : (navState?.categoria && kidsData?.[navState.categoria]) ? navState.categoria : Object.keys(kidsData || {})[0])
    : null
  const categoriaData = categoriaKey ? kidsData?.[categoriaKey] : null
  const perguntas = categoriaData?.quiz || []
  const videoId = categoriaData?.video_id || null

  useEffect(() => {
    if (loading || fase !== 'video' || videoId) return
    let t = 0
    const timer = setInterval(() => {
      t += 100 / 30
      setProgresso(Math.min(t, 100))
      if (t >= 100) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [loading, fase, videoId])

  useEffect(() => {
    if (fase === 'resultado') salvarCoins(coins + 30)
  }, [fase])

  if (loading) return (
    <div style={{ background: '#0f0a1e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#7C3AED', fontWeight: '700' }}>Carregando...</div>
    </div>
  )

  const responder = (index) => {
    if (selecionada !== null) return
    setSelecionada(index)
    setMostrarFeedback(true)
    const correto = index === perguntas[perguntaAtual].correta
    if (correto) { setAcertos(a => a + 1); setCoins(c => c + 10) }
    setTimeout(() => {
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(p => p + 1); setSelecionada(null); setMostrarFeedback(false)
      } else {
        setFase('resultado')
      }
    }, 1500)
  }

  function salvarCoins(total) {
    if (!child) return
    const novasCoins = (child.neural_coins || 0) + total
    localStorage.setItem('ns_active_child', JSON.stringify({ ...child, neural_coins: novasCoins }))
    supabase.from('children').update({ neural_coins: novasCoins }).eq('id', child.id).then(() => {})
  }

  const cor = categoriaData?.cor || '#7C3AED'

  if (fase === 'video') {
    return (
      <LayoutCrianca child={child}>
        <div className="ns-pad">

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
            <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800' }}>{categoriaData?.titulo || 'Vídeo Kids'}</h2>
          </div>

          <div style={{ maxWidth: '800px' }}>

            {videoId ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000', borderRadius: '16px', marginBottom: '20px' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  title={categoriaData?.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
            ) : (
              <div>
                <div style={{ background: 'linear-gradient(135deg, rgba(15,10,30,0.8), rgba(30,27,75,0.9))', borderRadius: '20px', padding: '40px 24px', textAlign: 'center', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '72px', marginBottom: '12px' }}>{categoriaData?.emoji || '🎬'}</div>
                  <h3 style={{ color: 'white', fontWeight: '900', fontSize: '20px', marginBottom: '8px' }}>{categoriaData?.titulo}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6 }}>{categoriaData?.introducao?.substring(0, 100)}...</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {(categoriaData?.secoes || []).slice(0, 2).map((s, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '26px', flexShrink: 0 }}>{s.emoji}</div>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '14px', marginBottom: '4px', color: 'white' }}>{s.titulo}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{s.texto?.substring(0, 120)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!videoId && (
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                  <span>Lendo conteúdo</span><span>{Math.round(progresso)}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ background: cor, width: progresso + '%', height: '100%', borderRadius: '999px', transition: 'width 1s linear' }} />
                </div>
              </div>
            )}

            {perguntas.length > 0 && (
              <button onClick={() => setFase('quiz')} style={{
                width: '100%', padding: '14px', borderRadius: '14px', border: 'none',
                background: 'linear-gradient(135deg, #7C3AED, #6d28d9)',
                color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                boxShadow: '0 6px 20px rgba(124,58,237,0.35)',
              }}>
                {videoId ? '✅ Assistido! Fazer quiz → +30 💰' : progresso >= 100 ? '✅ Conteúdo lido! Fazer quiz → +30 💰' : '📖 Ler e fazer quiz → +30 💰'}
              </button>
            )}
          </div>
        </div>
      </LayoutCrianca>
    )
  }

  if (fase === 'quiz') {
    const perg = perguntas[perguntaAtual]
    return (
      <LayoutCrianca child={child}>
        <div className="ns-pad">
          <div style={{ maxWidth: '640px' }}>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: '600' }}>
                <span>Pergunta {perguntaAtual + 1} de {perguntas.length}</span>
                <span style={{ color: '#fbbf24', fontWeight: '700' }}>💰 +{coins}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                <div style={{ background: '#F07A20', width: ((perguntaAtual / perguntas.length) * 100) + '%', height: '100%', borderRadius: '999px', transition: 'width 0.3s' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', lineHeight: '1.4', color: 'white' }}>{perg.pergunta}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {perg.opcoes.map((opcao, index) => {
                let bg = 'rgba(255,255,255,0.06)'
                let border = '1.5px solid rgba(255,255,255,0.1)'
                let color = 'rgba(255,255,255,0.85)'
                if (selecionada === index) {
                  bg = index === perg.correta ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'
                  border = '1.5px solid ' + (index === perg.correta ? '#10b981' : '#ef4444')
                  color = index === perg.correta ? '#6ee7b7' : '#fca5a5'
                } else if (mostrarFeedback && index === perg.correta) {
                  bg = 'rgba(16,185,129,0.1)'; border = '1.5px solid #10b981'; color = '#6ee7b7'
                }
                return (
                  <button key={index} onClick={() => responder(index)} style={{
                    background: bg, border, borderRadius: '14px', padding: '15px 18px',
                    color, cursor: 'pointer', textAlign: 'left', fontSize: '14px',
                    fontWeight: '600', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s',
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', marginRight: '8px' }}>{['A','B','C','D'][index]}.</span> {opcao}
                  </button>
                )
              })}
            </div>

            {mostrarFeedback && perg.explicacao && (
              <div style={{ marginTop: '16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '12px', padding: '14px', fontSize: '13px', color: '#93c5fd', fontWeight: '500' }}>
                💡 {perg.explicacao}
              </div>
            )}
          </div>
        </div>
      </LayoutCrianca>
    )
  }

  const totalCoins = coins + 30
  return (
    <LayoutCrianca child={child}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '8px', color: 'white' }}>Quiz concluído!</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontSize: '15px' }}>Você acertou {acertos} de {perguntas.length}!</p>
        <div style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.15))', borderRadius: '20px', padding: '24px 48px', marginBottom: '32px', border: '1.5px solid rgba(251,191,36,0.35)' }}>
          <div style={{ fontSize: '40px', fontWeight: '900', color: '#fbbf24' }}>+{totalCoins} 💰</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600', fontSize: '14px' }}>NeuralCoins ganhos!</div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/kids')} style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '14px', padding: '14px 24px', color: 'white', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Voltar</button>
          <button onClick={() => navigate('/kids')} style={{ background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', border: 'none', borderRadius: '14px', padding: '14px 24px', color: 'white', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}>Explorar mais →</button>
        </div>
      </div>
    </LayoutCrianca>
  )
}
