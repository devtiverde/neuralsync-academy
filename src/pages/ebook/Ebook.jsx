import { useNavigate } from 'react-router-dom'
import '../../styles/pai.css'

export default function Ebook() {
  const navigate = useNavigate()
  const bonus = [
    { icon: '🛠️', titulo: '30 Ferramentas Gratuitas por Faixa Etária', desc: 'Curadoria das melhores ferramentas educativas' },
    { icon: '📺', titulo: '10 Canais do YouTube Educativos Curados', desc: 'Os melhores canais para cada faixa etária' },
    { icon: '✅', titulo: 'Checklist Semanal Imprimível', desc: 'Organize a rotina digital do seu filho' },
  ]

  return (
    <div style={{background: '#f9fafb', minHeight: '100vh'}}>
      <header className="pai-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
          <h2 style={{fontWeight: '800', fontSize: '18px', color: '#0f0a1e'}}>📚 Biblioteca NeuralSync</h2>
        </div>
      </header>

      <div style={{maxWidth: '600px', margin: '0 auto', padding: '32px 24px'}}>
        <div style={{background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', borderRadius: '24px', padding: '32px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 8px 32px rgba(124,58,237,0.3)'}}>
          <div style={{fontSize: '60px', marginBottom: '16px'}}>📖</div>
          <h3 style={{fontSize: '22px', fontWeight: '900', color: 'white', marginBottom: '8px', letterSpacing: '-0.3px'}}>A Tela Certa</h3>
          <p style={{color: 'rgba(255,255,255,0.8)', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6'}}>Como Usar a Tecnologia Para Criar uma Criança Inteligente</p>
          <div style={{display: 'flex', gap: '10px'}}>
            <button onClick={() => navigate('/ebook/leitura')} style={{flex: 1, background: 'white', border: 'none', borderRadius: '12px', padding: '12px', color: '#7C3AED', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>📖 Ler online</button>
            <button style={{flex: 1, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>⬇ Baixar PDF</button>
          </div>
        </div>

        <h3 style={{fontWeight: '800', fontSize: '17px', marginBottom: '14px', color: '#0f0a1e'}}>🎁 Seus Bônus</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {bonus.map((item, i) => (
            <div key={i} className="pai-card" style={{padding: '18px', display: 'flex', gap: '14px', alignItems: 'center'}}>
              <div style={{fontSize: '30px'}}>{item.icon}</div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: '700', fontSize: '14px', color: '#0f0a1e', marginBottom: '3px'}}>{item.titulo}</div>
                <div style={{fontSize: '12px', color: '#9ca3af'}}>{item.desc}</div>
              </div>
              <button className="btn-secondary" style={{whiteSpace: 'nowrap', fontSize: '12px', padding: '7px 12px'}}>Baixar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}