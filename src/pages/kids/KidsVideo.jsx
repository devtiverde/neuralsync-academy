import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useKids } from '../../hooks/useKids'
import { supabase } from '../../lib/supabase'
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
    const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (!child) return
    const novasCoins = (child.neural_coins || 0) + total
    localStorage.setItem('ns_active_child', JSON.stringify({ ...child, neural_coins: novasCoins }))
    supabase.from('children').update({ neural_coins: novasCoins }).eq('id', child.id).then(() => {})
  }

  if (fase === 'video') {
    const cor = categoriaData?.cor || '#7C3AED'
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper">
        <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '800' }}>{categoriaData?.titulo || 'Vídeo Kids'}</h2>
        </div>

        {videoId ? (
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
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
            <div style={{ background: 'linear-gradient(135deg, #0f0a1e, #1e1b4b)', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '72px', marginBottom: '12px' }}>{categoriaData?.emoji || '🎬'}</div>
              <h3 style={{ color: 'white', fontWeight: '900', fontSize: '18px', marginBottom: '8px' }}>{categoriaData?.titulo}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.5 }}>{categoriaData?.introducao?.substring(0, 100)}...</p>
            </div>
            <div style={{ padding: '16px' }}>
              {(categoriaData?.secoes || []).slice(0, 2).map((s, i) => (
                <div key={i} className="card-white" style={{ padding: '14px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>{s.emoji}</div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '13px', marginBottom: '4px', color: '#0f0a1e' }}>{s.titulo}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5 }}>{s.texto?.substring(0, 120)}...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '16px' }}>
          {!videoId && (
            <div className="card-white" style={{ padding: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
                <span>Lendo conteúdo</span><span>{Math.round(progresso)}%</span>
              </div>
              <div style={{ background: '#e5e7eb', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                <div style={{ background: cor, width: progresso + '%', height: '100%', borderRadius: '999px', transition: 'width 1s linear' }} />
              </div>
            </div>
          )}
          {perguntas.length > 0 && (
            <button className="btn-purple" onClick={() => setFase('quiz')}>
              {videoId ? '✅ Assistido! Fazer quiz → +30 💰' : progresso >= 100 ? '✅ Conteúdo lido! Fazer quiz → +30 💰' : '📖 Ler e fazer quiz → +30 💰'}
            </button>
          )}
        </div>
      </div>
      </div>
    )
  }

  if (fase === 'quiz') {
    const perg = perguntas[perguntaAtual]
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ padding: '24px 16px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginBottom: '6px', fontWeight: '600' }}>
            <span>Pergunta {perguntaAtual + 1} de {perguntas.length}</span>
            <span style={{ color: '#F07A20', fontWeight: '700' }}>💰 +{coins}</span>
          </div>
          <div style={{ background: '#e5e7eb', borderRadius: '999px', height: '6px' }}>
            <div style={{ background: '#F07A20', width: ((perguntaAtual / perguntas.length) * 100) + '%', height: '100%', borderRadius: '999px', transition: 'width 0.3s' }} />
          </div>
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px', lineHeight: '1.4', color: '#0f0a1e' }}>{perg.pergunta}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {perg.opcoes.map((opcao, index) => {
            let bg = 'white', border = '1.5px solid #e5e7eb', color = '#0f0a1e'
            if (selecionada === index) { bg = index === perg.correta ? '#f0fdf4' : '#fef2f2'; border = '1.5px solid ' + (index === perg.correta ? '#10b981' : '#ef4444') }
            else if (mostrarFeedback && index === perg.correta) { bg = '#f0fdf4'; border = '1.5px solid #10b981' }
            return (
              <button key={index} onClick={() => responder(index)} style={{ background: bg, border, borderRadius: '12px', padding: '14px 16px', color, cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '600', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s' }}>
                <span style={{ color: '#9ca3af', marginRight: '8px' }}>{['A','B','C','D'][index]}.</span> {opcao}
              </button>
            )
          })}
        </div>
        {mostrarFeedback && perg.explicacao && (
          <div style={{ marginTop: '16px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '12px', fontSize: '13px', color: '#0369a1', fontWeight: '500' }}>
            💡 {perg.explicacao}
          </div>
        )}
      </div>
      </div>
    )
  }

  const totalCoins = coins + 30
  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
      <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '8px', color: '#0f0a1e' }}>Quiz concluído!</h2>
      <p style={{ color: '#6b7280', marginBottom: '28px' }}>Você acertou {acertos} de {perguntas.length}!</p>
      <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '20px', padding: '20px 40px', marginBottom: '28px', border: '1.5px solid #fcd34d' }}>
        <div style={{ fontSize: '32px', fontWeight: '900', color: '#92400e' }}>+{totalCoins} 💰</div>
        <div style={{ color: '#78350f', fontWeight: '600', fontSize: '14px' }}>NeuralCoins ganhos!</div>
      </div>
      <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
        <button onClick={() => navigate('/kids')} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Voltar</button>
        <button onClick={() => navigate('/kids')} className="btn-purple" style={{ flex: 1 }}>Explorar mais →</button>
      </div>
    </div>
    </div>
  )
}
