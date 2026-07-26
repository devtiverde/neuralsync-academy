import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import ParentUnlockModal from '../../components/ParentUnlockModal'
import { dentroDoHorario, liberarPorMinutos, OPCOES_LIBERACAO } from '../../lib/horarioAcesso'
import '../../styles/crianca.css'

const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']


function proximaSessao(agenda) {
  try {
    if (!agenda || !Array.isArray(agenda)) return null
    const hoje = new Date()
    const diaHoje = hoje.getDay()
    const horaAtual = hoje.getHours() * 60 + hoje.getMinutes()

    for (let d = 0; d < 7; d++) {
      const dia = (diaHoje + d) % 7
      const slot = agenda[dia]
      if (!slot || !slot.ativo) continue
      const [h, m] = (slot.inicio || '14:00').split(':').map(Number)
      const minSlot = h * 60 + m
      if (d === 0 && minSlot <= horaAtual) continue
      return `${h}h${m > 0 ? String(m).padStart(2, '0') : ''} de ${DIAS[dia]}`
    }
    return null
  } catch {
    return null
  }
}

function infoAgendaHoje(agenda) {
  try {
    if (!agenda || !Array.isArray(agenda)) return null
    const agora = new Date()
    const diaIdx = agora.getDay()
    const slot = agenda[diaIdx]
    if (!slot) return null
    return {
      dia: DIAS[diaIdx],
      ativo: slot.ativo,
      inicio: slot.inicio || '--',
      fim: slot.fim || '--',
      agora: `${String(agora.getHours()).padStart(2,'0')}:${String(agora.getMinutes()).padStart(2,'0')}`,
    }
  } catch { return null }
}

export default function Bloqueio() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const nome = child?.nome || 'estudante'

  const [agenda, setAgenda] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ns_agenda_config') || 'null') } catch { return null }
  })

  // Fallback: busca agenda do Supabase se não estiver no localStorage
  useEffect(() => {
    if (agenda || !user) return
    supabase.from('users').select('agenda_config').eq('id', user.id).single().then(({ data }) => {
      if (data?.agenda_config && Array.isArray(data.agenda_config)) {
        localStorage.setItem('ns_agenda_config', JSON.stringify(data.agenda_config))
        setAgenda(data.agenda_config)
      }
    })
  }, [user, agenda])

  const proxima = proximaSessao(agenda)
  const info = infoAgendaHoje(agenda)

  // Recheck automático a cada 30s — libera quando o horário configurado chegar
  useEffect(() => {
    const check = () => {
      try {
        const ag = JSON.parse(localStorage.getItem('ns_agenda_config') || 'null')
        if (dentroDoHorario(ag, child?.id)) navigate('/home-crianca', { replace: true })
      } catch { /* agenda corrompida no localStorage: segue bloqueado */ }
    }
    const id = setInterval(check, 30000)
    return () => clearInterval(id)
  }, [navigate, child?.id])

  // ── Liberação de tempo extra pelo responsável ──────────────────────────
  // Antes desta tela existir com este botão, a mensagem dizia "peça ao
  // responsável para liberar" e não havia NENHUM caminho para isso: o pai teria
  // que sair, entrar na própria conta, mexer na agenda e voltar. Na prática o
  // controle parental era rígido no momento errado.
  const [pedindoSenha, setPedindoSenha] = useState(false)
  const [minutosEscolhidos, setMinutosEscolhidos] = useState(null)

  function autorizado() {
    liberarPorMinutos(child?.id, minutosEscolhidos)
    setPedindoSenha(false)
    navigate('/home-crianca', { replace: true })
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: 'linear-gradient(135deg, #7C3AED, #6d28d9)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px', textAlign: 'center',
    }}>
      <div style={{ fontSize: '72px', marginBottom: '20px' }}>🌙</div>
      <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-0.5px' }}>Ei, {nome}!</h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '6px' }}>Agora não é hora de usar a plataforma.</p>
      {proxima
        ? <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '36px', fontSize: '14px' }}>Sua próxima sessão começa às {proxima} ⭐</p>
        : <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '36px', fontSize: '14px' }}>Peça ao responsável para liberar o acesso ⭐</p>
      }

      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px 32px', maxWidth: '360px', width: '100%', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '28px' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px', fontWeight: '600' }}>Mensagem dos seus pais:</p>
        <p style={{ fontSize: '16px', color: 'white', fontStyle: 'italic', fontWeight: '500' }}>Aproveite para brincar lá fora! 😊</p>
      </div>

      {info && (
        <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '14px', padding: '14px 20px', maxWidth: '360px', width: '100%', marginBottom: '20px', textAlign: 'left' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>📋 Configuração de hoje ({info.dia})</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            <span>Horário agora:</span>
            <strong style={{ color: 'white' }}>{info.agora}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>
            <span>Acesso hoje:</span>
            <strong style={{ color: info.ativo ? '#34d399' : '#f87171' }}>{info.ativo ? `${info.inicio} – ${info.fim}` : 'Desativado'}</strong>
          </div>
        </div>
      )}

      {/* Bloco do responsável: escolher a duração já aqui evita uma tela a mais
          depois da senha, e o pai costuma estar de pé, com pressa, ao lado da
          criança. Três opções fechadas resolvem quase todo caso real. */}
      <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '18px', padding: '18px 20px', maxWidth: '360px', width: '100%', marginBottom: '20px' }}>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>🔓 Responsável, quer liberar mais tempo?</p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '14px' }}>Pede sua senha e libera na hora, sem mexer na agenda.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {OPCOES_LIBERACAO.map(min => (
            <button
              key={min}
              onClick={() => { setMinutosEscolhidos(min); setPedindoSenha(true) }}
              style={{
                flex: '1 1 90px', minHeight: '48px',
                background: 'rgba(255,255,255,0.14)', border: '1.5px solid rgba(255,255,255,0.3)',
                borderRadius: '12px', padding: '12px 10px', color: 'white', cursor: 'pointer',
                fontWeight: '800', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              +{min} min
            </button>
          ))}
        </div>
      </div>

      {pedindoSenha && (
        <ParentUnlockModal
          icone="⏰"
          titulo={`Liberar ${minutosEscolhidos} minutos`}
          descricao={`${nome} vai poder usar a plataforma por mais ${minutosEscolhidos} minutos, mesmo fora do horário da agenda. A agenda em si não muda.`}
          rotuloConfirmar={`✅ Liberar ${minutosEscolhidos} min`}
          onSuccess={autorizado}
          onCancel={() => setPedindoSenha(false)}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' }}>
        <button onClick={() => navigate('/atividades-offline')} style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none',
          borderRadius: '14px', padding: '14px 28px', color: 'white', cursor: 'pointer',
          fontWeight: '900', fontSize: '15px', fontFamily: 'Plus Jakarta Sans, sans-serif',
          boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
        }}>
          🌿 Ver o que fazer agora!
        </button>
        <button onClick={() => navigate('/home-crianca', { replace: true })} style={{
          background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.45)',
          borderRadius: '14px', padding: '13px 28px', color: 'white', cursor: 'pointer',
          fontWeight: '800', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif',
          backdropFilter: 'blur(8px)',
        }}>
          🔄 Tentar entrar
        </button>
        <button onClick={() => navigate('/auth')} style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '14px', padding: '11px 28px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
          fontWeight: '600', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          Entrar como responsável
        </button>
      </div>
    </div>
  )
}
