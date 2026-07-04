import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutPai from '../../components/LayoutPai'
import { NEURALAI_CONFIG } from '../../config/neuralai'
import { GearSix } from '@phosphor-icons/react'
import '../../styles/pai.css'

const MAX_SESSOES_OPCOES = [1, 2, 3, 5]

function OpcaoPilula({ value, selected, onChange, label }) {
  return (
    <button
      onClick={() => onChange(value)}
      style={{
        padding: '8px 20px',
        borderRadius: 'var(--radius-full)',
        border: `1.5px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}`,
        background: selected ? 'var(--color-primary-light)' : 'white',
        color: selected ? 'var(--color-primary)' : 'var(--color-text-muted)',
        fontWeight: selected ? 700 : 500,
        fontSize: 'var(--text-sm)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        transition: 'all 0.15s',
      }}
    >
      {label ?? value}
    </button>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      style={{
        width: 48, height: 26,
        borderRadius: 'var(--radius-full)',
        background: checked ? 'var(--color-primary)' : '#d1d5db',
        border: 'none', cursor: 'pointer', padding: 3,
        display: 'flex', alignItems: 'center',
        justifyContent: checked ? 'flex-end' : 'flex-start',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  )
}

export default function Settings() {
  const { user } = useAuth()
  const navigate  = useNavigate()

  const [duracao,          setDuracao]          = useState(NEURALAI_CONFIG.sessionDurations[0])
  const [maxSessoes,       setMaxSessoes]        = useState(NEURALAI_CONFIG.maxSessionsPerWeek)
  const [notificacaoFim,   setNotificacaoFim]    = useState(true)
  const [loading,          setLoading]           = useState(true)
  const [salvando,         setSalvando]          = useState(false)
  const [toast,            setToast]             = useState(null)
  const [confirmarExcluir, setConfirmarExcluir]  = useState(false)
  const [excluindo,        setExcluindo]         = useState(false)

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    supabase
      .from('users')
      .select('neuralai_config')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.neuralai_config) {
          const c = data.neuralai_config
          if (c.duracao)            setDuracao(c.duracao)
          if (c.max_sessoes_semana) setMaxSessoes(c.max_sessoes_semana)
          if (c.notificacao_fim !== undefined) setNotificacaoFim(c.notificacao_fim)
        }
        setLoading(false)
      })
  }, [user])

  const excluirConta = async () => {
    setExcluindo(true)
    const { data: filhos } = await supabase.from('children').select('id').eq('parent_id', user.id)
    const ids = (filhos || []).map(f => f.id)
    if (ids.length > 0) {
      await supabase.from('ns_historico').delete().in('child_id', ids)
      await supabase.from('children').delete().in('id', ids)
    }
    await supabase.from('users').delete().eq('id', user.id)
    await supabase.auth.signOut()
    navigate('/auth')
  }

  const salvar = async () => {
    setSalvando(true)
    const { error } = await supabase
      .from('users')
      .update({
        neuralai_config: {
          duracao:            duracao,
          max_sessoes_semana: maxSessoes,
          notificacao_fim:    notificacaoFim,
        },
      })
      .eq('id', user.id)
    setSalvando(false)
    if (error) {
      setToast({ msg: 'Erro ao salvar configurações.', tipo: 'erro' })
    } else {
      setToast({ msg: 'Configurações salvas!', tipo: 'ok' })
    }
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <LayoutPai>
      {toast && (
        <div style={{
          position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
          zIndex: 400, background: toast.tipo === 'erro' ? 'var(--color-error)' : 'var(--color-success)',
          color: 'white', borderRadius: 12, padding: '12px 20px',
          fontWeight: 700, fontSize: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          whiteSpace: 'nowrap',
        }}>
          {toast.tipo === 'erro' ? '⚠️' : '✅'} {toast.msg}
        </div>
      )}

      <div className="pai-content">
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--color-text-primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          Configurações <GearSix weight="fill" size={22} color="#6b7280" />
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 32 }}>
          Personalize o comportamento da plataforma para sua família.
        </p>

        {loading ? (
          <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 60 }}>Carregando...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 600 }}>

            {/* ── Seção NeuralAI ──────────────────────────── */}
            <div className="pai-card" style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'linear-gradient(135deg, #06b6d4, #7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>🤖</div>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: 16, color: 'var(--color-text-primary)', margin: 0 }}>NeuralAI</h2>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>Configurações do assistente de IA para Inventores</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Duração padrão */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', display: 'block', marginBottom: 10 }}>
                    Duração padrão da sessão
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {NEURALAI_CONFIG.sessionDurations.map(d => (
                      <OpcaoPilula
                        key={d}
                        value={d}
                        selected={duracao === d}
                        onChange={setDuracao}
                        label={`${d} minutos`}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 6 }}>
                    A criança pode iniciar a sessão com qualquer duração — esta é apenas o padrão pré-selecionado.
                  </p>
                </div>

                {/* Máximo de sessões */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', display: 'block', marginBottom: 10 }}>
                    Máximo de sessões por semana
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {MAX_SESSOES_OPCOES.map(n => (
                      <OpcaoPilula
                        key={n}
                        value={n}
                        selected={maxSessoes === n}
                        onChange={setMaxSessoes}
                        label={`${n} sessão${n > 1 ? 'ões' : ''}`}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 6 }}>
                    Após atingir o limite, a criança precisará aguardar a próxima semana.
                  </p>
                </div>

                {/* Notificação ao fim */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      Notificação ao fim da sessão
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
                      Receba um e-mail com o resumo sempre que uma sessão NeuralAI terminar
                    </div>
                  </div>
                  <Toggle checked={notificacaoFim} onChange={setNotificacaoFim} />
                </div>

              </div>
            </div>

            {/* Botão salvar */}
            <button
              className="btn-primary"
              onClick={salvar}
              disabled={salvando}
              style={{ alignSelf: 'flex-start', padding: '13px 32px', fontSize: 'var(--text-base)' }}
            >
              {salvando ? 'Salvando...' : 'Salvar configurações'}
            </button>

            {/* ── Zona de Perigo ──────────────────────────── */}
            <div className="pai-card" style={{ padding: '28px 32px', border: '1.5px solid #fecaca' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🗑️</div>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: 16, color: '#991b1b', margin: 0 }}>Zona de Perigo</h2>
                  <p style={{ fontSize: 12, color: '#b91c1c', margin: 0 }}>Ações irreversíveis — leia com atenção</p>
                </div>
              </div>

              {!confirmarExcluir ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>Excluir minha conta</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Remove todos os seus dados e dos seus filhos da plataforma (LGPD Art. 18).</div>
                  </div>
                  <button
                    onClick={() => setConfirmarExcluir(true)}
                    style={{ background: 'none', border: '1.5px solid #ef4444', borderRadius: 10, padding: '9px 20px', color: '#ef4444', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}
                  >
                    Excluir conta
                  </button>
                </div>
              ) : (
                <div style={{ background: '#fef2f2', borderRadius: 12, padding: '18px 20px' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', marginBottom: 8 }}>⚠️ Tem certeza absoluta?</p>
                  <p style={{ fontSize: 13, color: '#374151', marginBottom: 16, lineHeight: 1.5 }}>
                    Isso <strong>apagará permanentemente</strong> sua conta, todos os perfis de filhos cadastrados e o histórico de atividades. Esta ação não pode ser desfeita.
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={excluirConta}
                      disabled={excluindo}
                      style={{ background: '#ef4444', border: 'none', borderRadius: 10, padding: '10px 20px', color: 'white', fontWeight: 700, fontSize: 13, cursor: excluindo ? 'default' : 'pointer', fontFamily: 'var(--font-sans)' }}
                    >
                      {excluindo ? 'Excluindo...' : 'Sim, excluir tudo'}
                    </button>
                    <button
                      onClick={() => setConfirmarExcluir(false)}
                      disabled={excluindo}
                      style={{ background: 'none', border: '1.5px solid #d1d5db', borderRadius: 10, padding: '10px 20px', color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </LayoutPai>
  )
}
