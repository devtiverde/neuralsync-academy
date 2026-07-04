import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutPai from '../../components/LayoutPai'
import { CalendarBlank } from '@phosphor-icons/react'
import '../../styles/pai.css'

const STORAGE_KEY = 'ns_agenda_config'

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const defaultSchedule = diasSemana.map((dia, i) => ({
  dia, ativo: i >= 1 && i <= 5, inicio: '14:00', fim: '15:00'
}))

export default function Agenda() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [schedule, setSchedule] = useState(defaultSchedule)
  const [salvo, setSalvo] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [erroAgenda, setErroAgenda] = useState('')

  useEffect(() => {
    async function carregar() {
      if (user) {
        const { data } = await supabase.from('users').select('agenda_config').eq('id', user.id).single()
        if (data?.agenda_config && Array.isArray(data.agenda_config)) {
          setSchedule(data.agenda_config)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.agenda_config))
          return
        }
      }
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
        if (saved && Array.isArray(saved)) setSchedule(saved)
      } catch {}
    }
    carregar()
  }, [user])

  const update = (index, field, value) => setSchedule(prev => prev.map((item, i) => i === index ? {...item, [field]: value} : item))

  const salvar = async () => {
    const invalido = schedule.find(s => s.ativo && s.inicio >= s.fim)
    if (invalido) {
      setErroAgenda(`Horário inválido em ${invalido.dia}: o início deve ser antes do término.`)
      setTimeout(() => setErroAgenda(''), 4000)
      return
    }
    setErroAgenda('')
    setSalvando(true)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule))
    if (user) {
      const { error } = await supabase.from('users').update({ agenda_config: schedule }).eq('id', user.id)
      if (error) {
        setErroAgenda(`Erro ao salvar no servidor: ${error.message}. O horário foi salvo localmente.`)
        setSalvando(false)
        return
      }
    }
    setSalvando(false)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
  }

  const limparAgenda = async () => {
    localStorage.removeItem(STORAGE_KEY)
    if (user) {
      await supabase.from('users').update({ agenda_config: null }).eq('id', user.id)
    }
    setSchedule(defaultSchedule)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
  }

  return (
    <LayoutPai>
      <div className="pai-content" style={{ maxWidth: '580px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f0a1e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: 8 }}><CalendarBlank weight="fill" size={22} color="#7C3AED" /> Agenda Semanal</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Configure os dias e horários de estudo do seu filho.</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px'}}>
          {schedule.map((item, index) => (
            <div key={index} className="pai-card" style={{padding: '16px', opacity: item.ativo ? 1 : 0.6}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: item.ativo ? '12px' : 0}}>
                <span style={{fontWeight: '700', fontSize: '15px', width: '36px', color: '#0f0a1e'}}>{item.dia}</span>
                {!item.ativo && <span style={{color: '#6b7280', fontSize: '13px', flex: 1, marginLeft: '10px'}}>Sem acesso</span>}
                <div className="toggle-track" style={{background: item.ativo ? '#7C3AED' : '#e5e7eb'}} onClick={() => update(index, 'ativo', !item.ativo)}>
                  <div className="toggle-thumb" style={{left: item.ativo ? '23px' : '3px'}} />
                </div>
              </div>
              {item.ativo && (
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <input type="time" value={item.inicio} onChange={e => update(index, 'inicio', e.target.value)} className="input-field" style={{flex: 1}} />
                  <span style={{color: '#6b7280', fontWeight: '600', fontSize: '13px'}}>até</span>
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

        {erroAgenda && (
          <div style={{background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', padding: '12px 14px', marginBottom: '12px', color: '#991b1b', fontSize: '13px', fontWeight: '600'}}>
            ⚠️ {erroAgenda}
          </div>
        )}

        <button onClick={limparAgenda} style={{
          background: 'transparent', border: '1.5px solid #ef4444',
          borderRadius: '14px', padding: '13px 15px',
          color: '#ef4444', cursor: 'pointer', fontWeight: '700',
          fontSize: '14px', width: '100%', marginBottom: '10px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          🔓 Liberar acesso agora (remover restrição de horário)
        </button>

        <button onClick={salvar} disabled={salvando} style={{
          background: salvo ? '#10b981' : 'linear-gradient(135deg, #7C3AED, #6d28d9)',
          border: 'none', borderRadius: '14px', padding: '15px',
          color: 'white', cursor: salvando ? 'default' : 'pointer', fontWeight: '700',
          fontSize: '15px', width: '100%', transition: 'background 0.3s',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
          opacity: salvando ? 0.7 : 1
        }}>
          {salvo ? '✓ Agenda salva!' : salvando ? 'Salvando...' : 'Salvar agenda'}
        </button>
      </div>
    </LayoutPai>
  )
}
