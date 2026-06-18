import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/pai.css'

export default function Agenda() {
  const navigate = useNavigate()
  const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const [schedule, setSchedule] = useState(dias.map((dia, i) => ({
    dia, ativo: i >= 1 && i <= 5, inicio: '14:00', fim: '15:00'
  })))
  const [salvo, setSalvo] = useState(false)

  const update = (index, field, value) => setSchedule(prev => prev.map((item, i) => i === index ? {...item, [field]: value} : item))
  const salvar = () => { setSalvo(true); setTimeout(() => setSalvo(false), 2000) }

  return (
    <div style={{background: '#f9fafb', minHeight: '100vh'}}>
      <header className="pai-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
          <h2 style={{fontWeight: '800', fontSize: '18px', color: '#0f0a1e'}}>📅 Agenda Semanal</h2>
        </div>
      </header>

      <div style={{maxWidth: '520px', margin: '0 auto', padding: '32px 24px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px'}}>
          {schedule.map((item, index) => (
            <div key={index} className="pai-card" style={{padding: '16px', opacity: item.ativo ? 1 : 0.6}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: item.ativo ? '12px' : 0}}>
                <span style={{fontWeight: '700', fontSize: '15px', width: '36px', color: '#0f0a1e'}}>{item.dia}</span>
                {!item.ativo && <span style={{color: '#9ca3af', fontSize: '13px', flex: 1, marginLeft: '10px'}}>Sem acesso</span>}
                <div className="toggle-track" style={{background: item.ativo ? '#7C3AED' : '#e5e7eb'}} onClick={() => update(index, 'ativo', !item.ativo)}>
                  <div className="toggle-thumb" style={{left: item.ativo ? '23px' : '3px'}} />
                </div>
              </div>
              {item.ativo && (
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <input type="time" value={item.inicio} onChange={e => update(index, 'inicio', e.target.value)} className="input-field" style={{flex: 1}} />
                  <span style={{color: '#9ca3af', fontWeight: '600', fontSize: '13px'}}>até</span>
                  <input type="time" value={item.fim} onChange={e => update(index, 'fim', e.target.value)} className="input-field" style={{flex: 1}} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pai-card" style={{padding: '14px', marginBottom: '20px', background: '#faf5ff', border: '1px solid #ede9fe'}}>
          <p style={{color: '#6b7280', fontSize: '13px', textAlign: 'center'}}>
            Fora desses horários, seu filho verá uma tela de bloqueio amigável.
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
          {salvo ? '✓ Agenda salva!' : 'Salvar agenda'}
        </button>
      </div>
    </div>
  )
}