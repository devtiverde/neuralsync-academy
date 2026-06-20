import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/pai.css'

const AVATAR_MAP = {
  'explorer':'🧭','av_explorer':'🧭','cientista':'🔬','av_cientista':'🔬',
  'astronauta':'🚀','av_astronauta':'🚀','mago':'🧙','av_mago':'🧙',
  'artista':'🎨','av_artista':'🎨','robô':'🤖','robo':'🤖','av_robo':'🤖',
  'dino':'🦕','av_dino':'🦕','ninja':'🥷','av_ninja':'🥷',
}
const resolverAvatar = av => (!av ? '🦊' : AVATAR_MAP[String(av).toLowerCase()] || av)

export default function Dashboard() {
  const { user, signOut, subscription } = useAuth()
  const navigate = useNavigate()
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [novoFilho, setNovoFilho] = useState({ nome: '', idade: '', faixa_etaria: 'construtores' })
  const [salvando, setSalvando] = useState(false)
  const [childToDelete, setChildToDelete] = useState(null)
  const [excluindo, setExcluindo] = useState(false)
  const [childToEdit, setChildToEdit] = useState(null)
  const [editForm, setEditForm] = useState({ nome: '', idade: '', faixa_etaria: 'construtores' })
  const [editando, setEditando] = useState(false)
  const [toast, setToast] = useState(null)

  const { loading: authLoading } = useAuth()

  useEffect(() => {
    if (authLoading) return
    if (!user) { navigate('/auth'); return }
    if (subscription && subscription.plano_status !== 'ativo') { navigate('/planos'); return }
    loadChildren()
  }, [user, authLoading, subscription])

  const loadChildren = async () => {
    const { data } = await supabase.from('children').select('*').eq('parent_id', user.id)
    setChildren(data || [])
    setLoading(false)
  }

  const limiteFilhos = subscription?.filhos_limite ?? 1
  const podeAdicionarFilho = children.length < limiteFilhos

  const adicionarFilho = async () => {
    if (!novoFilho.nome.trim()) { showToast('Informe o nome do filho.', 'erro'); return }
    const idadeNum = parseInt(novoFilho.idade)
    if (isNaN(idadeNum) || idadeNum < 3 || idadeNum > 17) { showToast('A idade deve ser entre 3 e 17 anos.', 'erro'); return }
    if (!podeAdicionarFilho) return
    setSalvando(true)
    const { data, error } = await supabase.from('children').insert({
      parent_id: user.id,
      nome: novoFilho.nome,
      idade: parseInt(novoFilho.idade),
      faixa_etaria: novoFilho.faixa_etaria,
      nivel: 1, xp: 0, neural_coins: 0, streak_atual: 0, streak_maximo: 0
    }).select().single()
    setSalvando(false)
    if (error) { showToast('Erro ao adicionar filho. Tente novamente.', 'erro'); return }
    setShowModal(false)
    setNovoFilho({ nome: '', idade: '', faixa_etaria: 'construtores' })
    if (data?.id) { showToast(`${data.nome} adicionado!`); navigate(`/questionario/${data.id}`) }
    else { await loadChildren() }
  }

  const showToast = (msg, tipo = 'ok') => {
    setToast({ msg, tipo })
    setTimeout(() => setToast(null), 3000)
  }

  const excluirFilho = async () => {
    if (!childToDelete) return
    setExcluindo(true)
    const nome = childToDelete.nome
    const { error } = await supabase.from('children').delete().eq('id', childToDelete.id)
    setExcluindo(false)
    setChildToDelete(null)
    if (error) { showToast('Erro ao excluir. Tente novamente.', 'erro'); return }
    showToast(`Perfil de ${nome} excluído.`, 'erro')
    loadChildren()
  }

  const abrirEditar = (child) => {
    setChildToEdit(child)
    setEditForm({ nome: child.nome, idade: child.idade, faixa_etaria: normalizarFaixa(child.faixa_etaria, child.idade) })
  }

  const salvarEdicao = async () => {
    if (!childToEdit) return
    if (!editForm.nome.trim()) { showToast('Informe o nome do filho.', 'erro'); return }
    const idadeNum = parseInt(editForm.idade)
    if (isNaN(idadeNum) || idadeNum < 3 || idadeNum > 17) { showToast('A idade deve ser entre 3 e 17 anos.', 'erro'); return }
    setEditando(true)
    const { error } = await supabase.from('children').update({
      nome: editForm.nome,
      idade: parseInt(editForm.idade),
      faixa_etaria: editForm.faixa_etaria,
    }).eq('id', childToEdit.id)
    setEditando(false)
    if (error) {
      showToast('Erro ao salvar. Tente novamente.', 'erro')
      return
    }
    setChildToEdit(null)
    showToast(`Perfil de ${editForm.nome} atualizado!`)
    loadChildren()
  }

  const irParaHabilidades = (child) => {
    localStorage.setItem('ns_active_child', JSON.stringify(child))
    navigate('/perfil-crianca')
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

  // Normaliza qualquer valor de faixa para um dos 4 válidos. Aceita variações
  // ('explorer', 'explorador', maiúsculas) e, se vier inválido/vazio, deduz
  // pela idade. Garante que o card nunca mostre um valor cru/quebrado.
  const normalizarFaixa = (faixa, idade) => {
    const f = (faixa || '').toString().trim().toLowerCase()
    if (f.startsWith('explor')) return 'exploradores'
    if (f.startsWith('constr')) return 'construtores'
    if (f.startsWith('criad'))  return 'criadores'
    if (f.startsWith('invent')) return 'inventores'
    const n = parseInt(idade)
    if (n >= 3 && n <= 5)  return 'exploradores'
    if (n >= 6 && n <= 8)  return 'construtores'
    if (n >= 9 && n <= 11) return 'criadores'
    if (n >= 12)           return 'inventores'
    return 'construtores'
  }

  return (
    <div style={{background: '#f9fafb', minHeight: '100vh', color: '#0f0a1e'}}>

      {/* TOAST */}
      {toast && (
        <div style={{position:'fixed',top:'20px',left:'50%',transform:'translateX(-50%)',zIndex:300,background: toast.tipo === 'erro' ? '#ef4444' : '#10b981',color:'white',borderRadius:'12px',padding:'12px 20px',fontWeight:'700',fontSize:'14px',boxShadow:'0 4px 20px rgba(0,0,0,0.15)',whiteSpace:'nowrap'}}>
          {toast.tipo === 'erro' ? '🗑️' : '✅'} {toast.msg}
        </div>
      )}

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

        {/* BANNER DE ASSINATURA */}
        {subscription && subscription.plano_status === 'ativo' && (
          <div style={{background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '14px', padding: '12px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '18px'}}>✅</span>
              <div>
                <span style={{fontWeight: '700', fontSize: '14px', color: '#166534'}}>Plano {subscription.plano?.charAt(0).toUpperCase() + subscription.plano?.slice(1)} ativo</span>
                {subscription.plano_ativo_ate && (
                  <span style={{fontSize: '12px', color: '#15803d', marginLeft: '8px'}}>• Renovação em {new Date(subscription.plano_ativo_ate).toLocaleDateString('pt-BR')}</span>
                )}
              </div>
            </div>
            <span style={{fontSize: '12px', color: '#15803d', fontWeight: '600'}}>{limiteFilhos === 999 ? 'Filhos ilimitados' : `Até ${limiteFilhos} filho${limiteFilhos > 1 ? 's' : ''}`}</span>
          </div>
        )}
        {(!subscription || subscription.plano_status === 'pendente') && (
          <div style={{background: '#fffbeb', border: '1.5px solid #fcd34d', borderRadius: '14px', padding: '12px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '18px'}}>⚠️</span>
              <span style={{fontWeight: '600', fontSize: '14px', color: '#92400e'}}>Você ainda não tem uma assinatura ativa.</span>
            </div>
            <button onClick={() => navigate('/planos')} style={{background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', color: 'white', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer'}}>
              Assinar agora →
            </button>
          </div>
        )}
        {subscription?.plano_status === 'cancelado' && (
          <div style={{background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '14px', padding: '12px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '18px'}}>❌</span>
              <span style={{fontWeight: '600', fontSize: '14px', color: '#991b1b'}}>Sua assinatura foi cancelada.</span>
            </div>
            <button onClick={() => navigate('/planos')} style={{background: '#dc2626', color: 'white', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer'}}>
              Renovar →
            </button>
          </div>
        )}

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
          <button className="btn-primary" onClick={() => podeAdicionarFilho ? setShowModal(true) : null}
            title={!podeAdicionarFilho ? `Seu plano permite até ${limiteFilhos} filho${limiteFilhos > 1 ? 's' : ''}` : ''}
            style={{opacity: podeAdicionarFilho ? 1 : 0.5, cursor: podeAdicionarFilho ? 'pointer' : 'not-allowed'}}>
            + Adicionar filho
          </button>
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
                      <div style={{width: '48px', height: '48px', borderRadius: '14px', background: child.cor_perfil || 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'}}>{resolverAvatar(child.avatar)}</div>
                      <div>
                        <h3 style={{fontWeight: '800', fontSize: '16px', marginBottom: '2px'}}>{child.nome}</h3>
                        <p style={{color: '#7C3AED', fontSize: '12px', fontWeight: '600'}}>{faixaLabel[normalizarFaixa(child.faixa_etaria, child.idade)]} • Nível {child.nivel}</p>
                      </div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                      <button onClick={() => abrirEditar(child)} title="Editar filho" style={{background:'#f3f4f6',border:'none',borderRadius:'8px',width:'30px',height:'30px',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center'}}>✏️</button>
                      <div style={{background: '#fff7ed', borderRadius: '999px', padding: '4px 10px', fontSize: '12px', color: '#ea580c', fontWeight: '700'}}>🔥 {child.streak_atual} dias</div>
                    </div>
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

                  {child.perfil_cognitivo ? (
                    <div style={{background:'#faf5ff',borderRadius:'12px',padding:'12px 14px',marginBottom:'12px',border:'1px solid #ede9fe'}}>
                      <div style={{fontSize:'11px',fontWeight:'800',color:'#7C3AED',marginBottom:'8px'}}>🧠 Perfil Cognitivo</div>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}>
                        {[
                          ['Aprendizado', {visual:'👀 Visual',cinestetico:'🙌 Cinestésico',auditivo:'👂 Auditivo',leitura:'📖 Leitura'}[child.perfil_cognitivo.estilo_aprendizado]],
                          ['Foco', {alta:'🎯 Alto',media:'😤 Médio',baixa:'😔 Baixo',social:'🤝 Social'}[child.perfil_cognitivo.persistencia]],
                          ['Prioridade', {foco:'🎯 Foco',criatividade:'🎨 Criatividade',logica:'🧩 Lógica',emocional:'💛 Emocional'}[child.perfil_cognitivo.habilidade_prioridade]],
                          ['Regulação', {alta:'😊 Ótima',media:'🤔 Boa',baixa:'😤 Em dev.',muito_baixa:'😭 Atenção'}[child.perfil_cognitivo.regulacao_emocional]],
                        ].map(([label, val]) => (
                          <div key={label} style={{background:'white',borderRadius:'8px',padding:'7px 10px',border:'1px solid #ede9fe'}}>
                            <div style={{fontSize:'9px',color:'#9ca3af',fontWeight:'700',marginBottom:'2px'}}>{label}</div>
                            <div style={{fontSize:'12px',fontWeight:'800',color:'#374151'}}>{val || '—'}</div>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => navigate(`/perfil-cognitivo/${child.id}`)} style={{width:'100%',padding:'8px',borderRadius:'8px',border:'none',background:'#7C3AED',color:'white',fontWeight:'700',fontSize:'12px',cursor:'pointer',marginTop:'10px',fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                        Ver perfil completo →
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => navigate(`/questionario/${child.id}`)} style={{width:'100%',padding:'10px',borderRadius:'12px',border:'1.5px dashed #c4b5fd',background:'#faf5ff',color:'#7C3AED',fontWeight:'700',fontSize:'13px',cursor:'pointer',marginBottom:'12px',fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                      🧠 Criar Perfil Cognitivo →
                    </button>
                  )}

                  <button className="btn-primary" style={{width: '100%', textAlign: 'center'}} onClick={() => {
                    localStorage.setItem('ns_active_child', JSON.stringify(child))
                    navigate('/home-crianca')
                  }}>
                    Ver área da {child.nome} →
                  </button>

                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginTop:'8px'}}>
                    <button
                      onClick={() => irParaHabilidades(child)}
                      style={{padding:'8px', borderRadius:'10px', border:'1.5px solid #ddd6fe', background:'#faf5ff', color:'#7C3AED', fontWeight:'600', fontSize:'12px', cursor:'pointer', fontFamily:'Plus Jakarta Sans, sans-serif'}}
                    >
                      📊 Habilidades
                    </button>
                    <button
                      onClick={() => setChildToDelete(child)}
                      style={{padding:'8px', borderRadius:'10px', border:'1.5px solid #fecaca', background:'transparent', color:'#ef4444', fontWeight:'600', fontSize:'12px', cursor:'pointer', fontFamily:'Plus Jakarta Sans, sans-serif'}}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* MODAL EDITAR FILHO */}
      {childToEdit && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',zIndex:200}}>
          <div style={{background:'white',borderRadius:'24px',padding:'32px',width:'100%',maxWidth:'400px',boxShadow:'0 20px 60px rgba(0,0,0,0.15)'}}>
            <h3 style={{fontWeight:'900',fontSize:'20px',marginBottom:'6px',color:'#0f0a1e'}}>Editar {childToEdit.nome}</h3>
            <p style={{color:'#6b7280',fontSize:'14px',marginBottom:'24px'}}>Atualize os dados do perfil</p>

            <div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'24px'}}>
              <div>
                <label style={{fontSize:'12px',fontWeight:'700',color:'#374151',marginBottom:'6px',display:'block'}}>Nome</label>
                <input className="input-field" value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} />
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'700',color:'#374151',marginBottom:'6px',display:'block'}}>Idade</label>
                <input className="input-field" type="number" min="3" max="17" value={editForm.idade} onChange={e => setEditForm({...editForm, idade: e.target.value})} />
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'700',color:'#374151',marginBottom:'6px',display:'block'}}>Faixa etária</label>
                <select className="input-field" value={editForm.faixa_etaria} onChange={e => setEditForm({...editForm, faixa_etaria: e.target.value})}>
                  <option value="exploradores">🌱 Exploradores (3-5 anos)</option>
                  <option value="construtores">🧩 Construtores (6-8 anos)</option>
                  <option value="criadores">🎨 Criadores (9-11 anos)</option>
                  <option value="inventores">🚀 Inventores (12-17 anos)</option>
                </select>
              </div>
            </div>

            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={() => setChildToEdit(null)} style={{flex:1,background:'#f9fafb',border:'1.5px solid #e5e7eb',borderRadius:'12px',padding:'13px',color:'#0f0a1e',cursor:'pointer',fontWeight:'700',fontFamily:'Plus Jakarta Sans, sans-serif'}}>Cancelar</button>
              <button onClick={salvarEdicao} disabled={editando} className="btn-primary" style={{flex:1}}>
                {editando ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR EXCLUSÃO */}
      {childToDelete && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',zIndex:200}}>
          <div style={{background:'white',borderRadius:'24px',padding:'32px',width:'100%',maxWidth:'380px',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>
            <div style={{fontSize:'40px',textAlign:'center',marginBottom:'12px'}}>⚠️</div>
            <h3 style={{fontWeight:'900',fontSize:'18px',marginBottom:'8px',color:'#0f0a1e',textAlign:'center'}}>Excluir perfil de {childToDelete.nome}?</h3>
            <p style={{color:'#6b7280',fontSize:'13px',marginBottom:'24px',textAlign:'center',lineHeight:1.6}}>
              Essa ação é <strong>irreversível</strong>. Todo o histórico de atividades, XP, Coins e o perfil cognitivo de <strong>{childToDelete.nome}</strong> serão apagados permanentemente.
            </p>
            <div style={{display:'flex',gap:'10px'}}>
              <button
                onClick={() => setChildToDelete(null)}
                style={{flex:1,background:'#f9fafb',border:'1.5px solid #e5e7eb',borderRadius:'12px',padding:'13px',color:'#0f0a1e',cursor:'pointer',fontWeight:'700',fontFamily:'Plus Jakarta Sans, sans-serif'}}
              >
                Cancelar
              </button>
              <button
                onClick={excluirFilho}
                disabled={excluindo}
                style={{flex:1,background:'#ef4444',border:'none',borderRadius:'12px',padding:'13px',color:'white',cursor:excluindo?'not-allowed':'pointer',fontWeight:'700',fontSize:'14px',fontFamily:'Plus Jakarta Sans, sans-serif',opacity:excluindo?0.7:1}}
              >
                {excluindo ? 'Excluindo...' : 'Sim, excluir'}
              </button>
            </div>
          </div>
        </div>
      )}

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