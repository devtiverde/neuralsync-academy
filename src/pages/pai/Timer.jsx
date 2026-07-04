import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutPai from '../../components/LayoutPai'
import '../../styles/pai.css'

const STORAGE_KEY = 'ns_timer_config'

const defaultConfig = { duracao: 30, aviso5min: true, permiteExtensao: true, encerramentoAuto: true }

const FAIXA_ORDEM = ['exploradores', 'construtores', 'criadores', 'inventores']

const DICA_FAIXA = {
  exploradores: { label: 'Exploradores (4–5 anos)', rec: '30–45 min por sessão', opcaoIdeal: [30, 45] },
  construtores: { label: 'Construtores (6–8 anos)', rec: '45 min a 1 hora', opcaoIdeal: [45, 60] },
  criadores:    { label: 'Criadores (9–11 anos)',   rec: '1h a 1h30',          opcaoIdeal: [60, 90] },
  inventores:   { label: 'Inventores (12+ anos)',   rec: '1h30 a 2h (com pausas)', opcaoIdeal: [90] },
}

function faixaMaisRestritiva(faixas) {
  if (!faixas || faixas.length === 0) return null
  return faixas.reduce((menor, atual) => {
    const iAtual = FAIXA_ORDEM.indexOf(atual)
    const iMenor = FAIXA_ORDEM.indexOf(menor)
    return iAtual < iMenor ? atual : menor
  })
}

export default function Timer() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [duracao, setDuracao] = useState(defaultConfig.duracao)
  const [aviso5min, setAviso5min] = useState(defaultConfig.aviso5min)
  const [permiteExtensao, setPermiteExtensao] = useState(defaultConfig.permiteExtensao)
  const [encerramentoAuto, setEncerramentoAuto] = useState(defaultConfig.encerramentoAuto)
  const [salvo, setSalvo] = useState(false)
  const [faixaRec, setFaixaRec] = useState(null)
  const opcoes = [15, 30, 45, 60, 90]

  useEffect(() => {
    async function load() {
      if (user) {
        const [{ data: userData }, { data: filhos }] = await Promise.all([
          supabase.from('users').select('timer_config').eq('id', user.id).single(),
          supabase.from('children').select('faixa_etaria').eq('parent_id', user.id),
        ])

        if (userData?.timer_config) {
          const cfg = userData.timer_config
          setDuracao(cfg.duracao ?? defaultConfig.duracao)
          setAviso5min(cfg.aviso5min ?? defaultConfig.aviso5min)
          setPermiteExtensao(cfg.permiteExtensao ?? defaultConfig.permiteExtensao)
          setEncerramentoAuto(cfg.encerramentoAuto ?? defaultConfig.encerramentoAuto)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg))
        } else {
          try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
            if (saved) {
              setDuracao(saved.duracao ?? defaultConfig.duracao)
              setAviso5min(saved.aviso5min ?? defaultConfig.aviso5min)
              setPermiteExtensao(saved.permiteExtensao ?? defaultConfig.permiteExtensao)
              setEncerramentoAuto(saved.encerramentoAuto ?? defaultConfig.encerramentoAuto)
            }
          } catch {}
        }

        if (filhos && filhos.length > 0) {
          const faixas = filhos.map(f => f.faixa_etaria).filter(Boolean)
          setFaixaRec(faixaMaisRestritiva(faixas))
        }
        return
      }
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
        if (saved) {
          setDuracao(saved.duracao ?? defaultConfig.duracao)
          setAviso5min(saved.aviso5min ?? defaultConfig.aviso5min)
          setPermiteExtensao(saved.permiteExtensao ?? defaultConfig.permiteExtensao)
          setEncerramentoAuto(saved.encerramentoAuto ?? defaultConfig.encerramentoAuto)
        }
      } catch {}
    }
    load()
  }, [user])

  const salvar = async () => {
    const cfg = { duracao, aviso5min, permiteExtensao, encerramentoAuto }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg))
    if (user) {
      const { error } = await supabase.from('users').update({ timer_config: cfg }).eq('id', user.id)
      if (error) console.error('[Timer] Erro ao salvar timer_config no Supabase:', error.message)
    }
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
  }

  return (
    <LayoutPai>
      <div className="pai-content" style={{ maxWidth: '580px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f0a1e', marginBottom: '6px' }}>⏱️ Tempo de uso</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Configure a duração das sessões de estudo do seu filho.</p>

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

        {faixaRec && DICA_FAIXA[faixaRec] && (() => {
          const dica = DICA_FAIXA[faixaRec]
          const dentroDaFaixa = dica.opcaoIdeal.includes(duracao)
          return (
            <div className="pai-card" style={{padding: '16px 20px', marginBottom: '16px', background: '#faf5ff', border: '1px solid #ede9fe', display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
              <span style={{fontSize: '22px', flexShrink: 0}}>⏱️</span>
              <div>
                <p style={{fontSize: '13px', fontWeight: '700', color: '#7C3AED', marginBottom: '2px'}}>{dica.label}</p>
                <p style={{fontSize: '13px', color: '#6b7280'}}>
                  Recomendado: <strong style={{color: '#374151'}}>{dica.rec}</strong>
                  {!dentroDaFaixa && <span style={{color: '#f97316', marginLeft: '6px', fontSize: '12px', fontWeight: '600'}}>⚠ fora do ideal</span>}
                  {dentroDaFaixa && <span style={{color: '#10b981', marginLeft: '6px', fontSize: '12px', fontWeight: '600'}}>✓ dentro do ideal</span>}
                </p>
              </div>
            </div>
          )
        })()}

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
    </LayoutPai>
  )
}
