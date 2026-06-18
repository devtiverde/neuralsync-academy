import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/pai.css'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [novoFilho, setNovoFilho] = useState({ nome: '', idade: '', faixa_etaria: 'construtores' })
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    loadChildren()
  }, [user])

  const loadChildren = async () => {
    const { data } = await supabase.from('children').select('*').eq('parent_id', user.id)
    setChildren(data || [])
    setLoading(false)
  }

  const adicionarFilho = async () => {
    if (!novoFilho.nome || !novoFilho.idade) return
    setSalvando(true)
    await supabase.from('children').insert({
      parent_id: user.id,
      nome: novoFilho.nome,
      idade: parseInt(novoFilho.idade),
      faixa_etaria: novoFilho.faixa_etaria,
      nivel: 1, xp: 0, neural_coins: 0, streak_atual: 0, streak_maximo: 0
    })
    await loadChildren()
    setShowModal(false)
    setNovoFilho({ nome: '', idade: '', faixa_etaria: 'construtores' })
    setSalvando(false)
  }

  const menuItems = [
    { icon: '⏱️', label: 'Timer', path: '/timer', cor: '#7C3AED' },
    { icon: '📅', label: 'Agenda', path: '/agenda', cor: '#F07A20' },
    { icon: '📊', label: 'Relatórios', path: '/relatorio', cor: '#10b981' },
    { icon: '🔔', label: 'Notificações', path: '/notificacoes', cor: '#3b82f6' },
    { icon: '📚', label: 'Ebook', path: '/ebook', cor: '#9C27B0' },
  ]

  const faixaLabel = {
    exploradores: '🌱 Exploradores 3-5 anos',
    construtores: '🧩 Construtores 6-8 anos',
    criadores: '🎨 Criadores 9-11 anos',
    inventores: '🚀 Inventores 12+ anos'
  }

  return (
    <div style={{background: '#f9fafb', minHeight: '100vh', color: '#0f0a1e'}}>

      <header className="pai-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div style={{width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'}}>🧠</div>
          <span style={{fontWeight: '800', fontSize: '18px'}}>
            <span style={{color: '#0f0a1e'}}>NeuralSync </span>
            <span style={{color: '#7C3AED'}}>Academy</span>
          </span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{fontSize: '13px', color: '#9ca3af'}}>{user?.email}</span>
          <button className="btn-secondary" onClick={signOut}>Sair</button>
        </div>
      </header>

      <div style={{maxWidth: '1000px', margin: '0 auto', padding: '32px 24px'}}>

        <div style={{marginBottom: '28px'}}>
          <h1 style={{fontSize: '26px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '4px'}}>Olá! 👋 Bem-vindo ao painel</h1>
          <p style={{color: '#6b7280', fontSize: '14px'}}>Acompanhe a evolução cognitiva dos seus filhos em tempo real.</p>
        </div>

        {/* MENU RÁPIDO */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '12px', marginBottom: '32px'}}>
          {menuItems.map(item => (
            <div key={item.path} className="pai-card" style={{padding: '20px', textAlign: 'center', cursor: 'pointer'}} onClick={() => navigate(item.path)}>
              <div style={{width: '44px', height: '44px', borderRadius: '12px', background: item.cor + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', margin: '0 auto 10px'}}>{item.icon}</div>
              <div style={{fontWeight: '700', fontSize: '13px', color: '#0f0a1e'}}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* FILHOS */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
          <h2 style={{fontSize: '18px', fontWeight: '800'}}>Seus filhos</h2>
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Adicionar filho</button>
        </div>

        {loading ? (
          <div style={{color: '#9ca3af', textAlign: 'center', padding: '40px'}}>Carregando...</div>
        ) : children.length === 0 ? (
          <div style={{background: 'white', borderRadius: '20px', padding: '48px', textAlign: 'center', border: '2px dashed #ede9fe'}}>
            <div style={{fontSize: '48px', marginBottom: '12px'}}>👨‍👧‍👦</div>
            <h3 style={{fontWeight: '800', marginBottom: '8px'}}>Adicione seu primeiro filho</h3>
            <p style={{color: '#6b7280', marginBottom: '20px', fontSize: '14px'}}>Comece a acompanhar o desenvolvimento cognitivo agora.</p>
            <button className="btn-primary" onClick={() => setShowModal(true)}>+ Adicionar filho</button>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px'}}>
            {children.map(child => {
              const xpPercent = Math.min((child.xp / (child.nivel * 500)) * 100, 100)
              return (
                <div key={child.id} className="pai-card" style={{padding: '24px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'}}>🦊</div>
                      <div>
                        <h3 style={{fontWeight: '800', fontSize: '16px', marginBottom: '2px'}}>{child.nome}</h3>
                        <p style={{color: '#7C3AED', fontSize: '12px', fontWeight: '600'}}>{faixaLabel[child.faixa_etaria] || child.faixa_etaria} • Nível {child.nivel}</p>
                      </div>
                    </div>
                    <div style={{background: '#fff7ed', borderRadius: '999px', padding: '4px 10px', fontSize: '12px', color: '#ea580c', fontWeight: '700'}}>🔥 {child.streak_atual} dias</div>
                  </div>

                  <div style={{marginBottom: '16px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '6px', fontWeight: '500'}}>
                      <span>XP para próximo nível</span>
                      <span style={{color: '#0f0a1e', fontWeight: '700'}}>{child.xp} / {child.nivel * 500}</span>
                    </div>
                    <div style={{background: '#e5e7eb', borderRadius: '999px', height: '7px', overflow: 'hidden'}}>
                      <div style={{background: 'linear-gradient(90deg, #7C3AED, #a78bfa)', width: xpPercent + '%', height: '100%', borderRadius: '999px'}} />
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '16px'}}>
                    {[['XP', child.xp, '#7C3AED'],['Coins 💰', child.neural_coins, '#F07A20'],['Idade', child.idade + ' anos', '#10b981']].map(([label, val, cor]) => (
                      <div key={label} style={{background: '#faf5ff', borderRadius: '10px', padding: '10px', textAlign: 'center', border: '1px solid #ede9fe'}}>
                        <div style={{fontWeight: '900', fontSize: '15px', color: cor}}>{val}</div>
                        <div style={{fontSize: '10px', color: '#9ca3af', fontWeight: '500'}}>{label}</div>
                      </div>
                    ))}
                  </div>

                  <button className="btn-primary" style={{width: '100%', textAlign: 'center'}} onClick={() => navigate('/home-crianca')}>
                    Ver área da {child.nome} →
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* MODAL ADICIONAR FILHO */}
      {showModal && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 200}}>
          <div style={{background: 'white', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)'}}>
            <h3 style={{fontWeight: '900', fontSize: '20px', marginBottom: '6px', color: '#0f0a1e'}}>Adicionar filho</h3>
            <p style={{color: '#6b7280', fontSize: '14px', marginBottom: '24px'}}>Preencha os dados do seu filho</p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px'}}>
              <div>
                <label style={{fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block'}}>Nome</label>
                <input className="input-field" placeholder="Nome do filho" value={novoFilho.nome} onChange={e => setNovoFilho({...novoFilho, nome: e.target.value})} />
              </div>
              <div>
                <label style={{fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block'}}>Idade</label>
                <input className="input-field" type="number" placeholder="Idade" min="3" max="17" value={novoFilho.idade} onChange={e => setNovoFilho({...novoFilho, idade: e.target.value})} />
              </div>
              <div>
                <label style={{fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block'}}>Faixa etária</label>
                <select className="input-field" value={novoFilho.faixa_etaria} onChange={e => setNovoFilho({...novoFilho, faixa_etaria: e.target.value})}>
                  <option value="exploradores">🌱 Exploradores (3-5 anos)</option>
                  <option value="construtores">🧩 Construtores (6-8 anos)</option>
                  <option value="criadores">🎨 Criadores (9-11 anos)</option>
                  <option value="inventores">🚀 Inventores (12-17 anos)</option>
                </select>
              </div>
            </div>

            <div style={{display: 'flex', gap: '10px'}}>
              <button onClick={() => setShowModal(false)} style={{flex: 1, background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>Cancelar</button>
              <button className="btn-primary" style={{flex: 1}} onClick={adicionarFilho} disabled={salvando}>
                {salvando ? 'Salvando...' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}