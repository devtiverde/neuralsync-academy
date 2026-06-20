import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/pai.css'

const STORAGE_KEY = 'ns_timer_config'

const defaultConfig = { duracao: 30, aviso5min: true, permiteExtensao: true, encerramentoAuto: true }

export default function Timer() {
  const navigate = useNavigate()
  const [duracao, setDuracao] = useState(defaultConfig.duracao)
  const [aviso5min, setAviso5min] = useState(defaultConfig.aviso5min)
  const [permiteExtensao, setPermiteExtensao] = useState(defaultConfig.permiteExtensao)
  const [encerramentoAuto, setEncerramentoAuto] = useState(defaultConfig.encerramentoAuto)
  const [salvo, setSalvo] = useState(false)
  const opcoes = [15, 30, 45, 60, 90]

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      if (saved) {
        setDuracao(saved.duracao ?? defaultConfig.duracao)
        setAviso5min(saved.aviso5min ?? defaultConfig.aviso5min)
        setPermiteExtensao(saved.permiteExtensao ?? defaultConfig.permiteExtensao)
        setEncerramentoAuto(saved.encerramentoAuto ?? defaultConfig.encerramentoAuto)
      }
    } catch {}
  }, [])

  const salvar = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ duracao, aviso5min, permiteExtensao, encerramentoAuto }))
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
  }

  return (
    <div style={{background: '#f9fafb', minHeight: '100vh'}}>
      <header className="pai-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
          <h2 style={{fontWeight: '800', fontSize: '18px', color: '#0f0a1e'}}>⏱️ Tempo de uso</h2>
        </div>
      </header>

      <div style={{maxWidth: '520px', margin: '0 auto', padding: '32px 24px'}}>

        <div className="pai-card" style={{padding: '24px', marginBottom: '16px'}}>
          <h3 style={{fontWeight: '800', fontSize: '15px', marginBottom: '16px', color: '#0f0a1e'}}>Duração da sessão</h3>
          <div style={{display: 'flex', gap: '8px'}}>
            {opcoes.map(op => (
              <button key={op} onClick={() => setDuracao(op)} style={{
                flex: 1, padding: '12px 4px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontWeight: '700', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif',
                background: duracao === op ? 'linear-gradient(135deg, #7C3AED, #6d28d9)' : '#f3f4f6',
                color: duracao === op ? 'white' : '#6b7280',
                boxShadow: duracao === op ? '0 4px 12px rgba(124,58,237,0.3)' : 'none'
              }}>{op}m</button>
            ))}
          </div>
        </div>

        <div className="pai-card" style={{padding: '24px', marginBottom: '16px'}}>
          <h3 style={{fontWeight: '800', fontSize: '15px', marginBottom: '20px', color: '#0f0a1e'}}>Configurações</h3>
          {[
            { label: 'Avisar 5 minutos antes', value: aviso5min, set: setAviso5min },
            { label: 'Permitir extensão de +15min', value: permiteExtensao, set: setPermiteExtensao },
            { label: 'Encerrar sessão automaticamente', value: encerramentoAuto, set: setEncerramentoAuto },
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < 2 ? '18px' : 0}}>
              <span style={{fontSize: '14px', color: '#374151', fontWeight: '500'}}>{item.label}</span>
              <div className="toggle-track" style={{background: item.value ? '#7C3AED' : '#e5e7eb'}} onClick={() => item.set(!item.value)}>
                <div className="toggle-thumb" style={{left: item.value ? '23px' : '3px'}} />
              </div>
            </div>
          ))}
        </div>

        <div className="pai-card" style={{padding: '16px', marginBottom: '20px', background: '#faf5ff', border: '1px solid #ede9fe'}}>
          <p style={{color: '#6b7280', fontSize: '13px', textAlign: 'center'}}>
            Seu filho terá <strong style={{color: '#7C3AED'}}>{duracao} minutos</strong> de sessão
            {aviso5min ? ' com aviso aos 5 minutos finais' : ''}.
          </p>
        </div>

        <button onClick={salvar} style={{
          background: salvo ? '#10b981' : 'linear-gradient(135deg, #7C3AED, #6d28d9)',
          border: 'none', borderRadius: '14px', padding: '15px',
          color: 'white', cursor: 'pointer', fontWeight: '700',
          fontSize: '15px', width: '100%', transition: 'background 0.3s',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          boxShadow: '0 4px 14px rgba(124,58,237,0.3)'
        }}>
          {salvo ? '✓ Configuração salva!' : 'Salvar configuração'}
        </button>
      </div>
    </div>
  )
}
