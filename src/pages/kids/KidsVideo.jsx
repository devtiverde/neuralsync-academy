import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/crianca.css'

export default function KidsVideo() {
  const navigate = useNavigate()
  const [fase, setFase] = useState('video')
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [selecionada, setSelecionada] = useState(null)
  const [mostrarFeedback, setMostrarFeedback] = useState(false)
  const [coins, setCoins] = useState(0)

  const perguntas = [
    { pergunta: 'Qual era o maior dinossauro carnívoro?', opcoes: ['T-Rex', 'Brachiosaurus', 'Stegosaurus', 'Triceratops'], correta: 0 },
    { pergunta: 'Em que período viveu o T-Rex?', opcoes: ['Jurássico', 'Triássico', 'Cretáceo', 'Permiano'], correta: 2 },
    { pergunta: 'O que os dinossauros comiam?', opcoes: ['Apenas plantas', 'Apenas carne', 'Plantas e carne', 'Peixes apenas'], correta: 2 },
  ]

  const responder = (index) => {
    if (selecionada !== null) return
    setSelecionada(index)
    setMostrarFeedback(true)
    if (index === perguntas[perguntaAtual].correta) setCoins(c => c + 10)
    setTimeout(() => {
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(p => p + 1)
        setSelecionada(null)
        setMostrarFeedback(false)
      } else {
        setFase('resultado')
      }
    }, 1500)
  }

  if (fase === 'video') return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper">
      <div className="header-gradient" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <button onClick={() => navigate(-1)} style={{background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>←</button>
        <h2 style={{color: 'white', fontSize: '16px', fontWeight: '800'}}>Dinossauros: Os Gigantes</h2>
      </div>
      <div style={{background: '#1a1a2e', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px'}}>🦕</div>
      <div style={{padding: '16px'}}>
        <p style={{color: '#6b7280', marginBottom: '16px', fontSize: '13px'}}>Assista ao vídeo completo para desbloquear o quiz e ganhar NeuralCoins!</p>
        <div className="card-white" style={{padding: '14px', marginBottom: '16px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginBottom: '6px'}}>
            <span>Progresso</span><span>0%</span>
          </div>
          <div style={{background: '#e5e7eb', borderRadius: '999px', height: '6px'}}>
            <div style={{background: '#7C3AED', width: '0%', height: '100%', borderRadius: '999px'}} />
          </div>
        </div>
        <button className="btn-purple" onClick={() => setFase('quiz')}>▶ Assistir e fazer quiz → +30 💰</button>
      </div>
    </div>
    </div>
  )

  if (fase === 'quiz') {
    const perg = perguntas[perguntaAtual]
    return (
      <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
      <div className="page-wrapper" style={{padding: '24px 16px'}}>
        <div style={{marginBottom: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginBottom: '6px', fontWeight: '600'}}>
            <span>Pergunta {perguntaAtual + 1} de {perguntas.length}</span>
            <span style={{color: '#F07A20', fontWeight: '700'}}>💰 +{coins}</span>
          </div>
          <div style={{background: '#e5e7eb', borderRadius: '999px', height: '6px'}}>
            <div style={{background: '#F07A20', width: ((perguntaAtual / perguntas.length) * 100) + '%', height: '100%', borderRadius: '999px', transition: 'width 0.3s'}} />
          </div>
        </div>
        <h3 style={{fontSize: '18px', fontWeight: '800', marginBottom: '24px', lineHeight: '1.4', color: '#0f0a1e'}}>{perg.pergunta}</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {perg.opcoes.map((opcao, index) => {
            let bg = 'white', border = '1.5px solid #e5e7eb', color = '#0f0a1e'
            if (selecionada === index) {
              bg = index === perg.correta ? '#f0fdf4' : '#fef2f2'
              border = '1.5px solid ' + (index === perg.correta ? '#10b981' : '#ef4444')
            } else if (mostrarFeedback && index === perg.correta) {
              bg = '#f0fdf4'; border = '1.5px solid #10b981'
            }
            return (
              <button key={index} onClick={() => responder(index)} style={{background: bg, border, borderRadius: '12px', padding: '14px 16px', color, cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '600', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s'}}>
                <span style={{color: '#9ca3af', marginRight: '8px'}}>{['A','B','C','D'][index]}.</span> {opcao}
              </button>
            )
          })}
        </div>
      </div>
      </div>
    )
  }

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center'}}>
      <div style={{fontSize: '64px', marginBottom: '16px'}}>🎉</div>
      <h2 style={{fontSize: '24px', fontWeight: '900', marginBottom: '8px', color: '#0f0a1e'}}>Quiz concluído!</h2>
      <p style={{color: '#6b7280', marginBottom: '28px'}}>Você acertou {perguntaAtual} de {perguntas.length}!</p>
      <div style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '20px', padding: '20px 40px', marginBottom: '28px', border: '1.5px solid #fcd34d'}}>
        <div style={{fontSize: '32px', fontWeight: '900', color: '#92400e'}}>+{coins + 30} 💰</div>
        <div style={{color: '#78350f', fontWeight: '600', fontSize: '14px'}}>NeuralCoins ganhos!</div>
      </div>
      <div style={{display: 'flex', gap: '10px', width: '100%'}}>
        <button onClick={() => navigate('/kids')} style={{flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>Voltar</button>
        <button onClick={() => navigate('/kids')} className="btn-purple" style={{flex: 1}}>Próximo →</button>
      </div>
    </div>
    </div>
  )
}