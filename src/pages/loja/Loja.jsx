import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import '../../styles/crianca.css'

const menu = [
  { icon: '🏠', label: 'Início', path: '/home-crianca' },
  { icon: '🗺️', label: 'Trilha', path: '/trilha' },
  { icon: '🎬', label: 'Kids', path: '/kids' },
  { icon: '🏆', label: 'Ranking', path: '/ranking' },
  { icon: '🏪', label: 'Loja', path: '/loja' },
  { icon: '👤', label: 'Perfil', path: '/perfil-crianca' },
]

const catalogoAvatares = [
  { id: 'av_explorer', nome: 'Explorer', emoji: '🧭', preco: 0 },
  { id: 'av_cientista', nome: 'Cientista', emoji: '🔬', preco: 300 },
  { id: 'av_astronauta', nome: 'Astronauta', emoji: '🚀', preco: 500 },
  { id: 'av_mago', nome: 'Mago', emoji: '🧙', preco: 400 },
  { id: 'av_artista', nome: 'Artista', emoji: '🎨', preco: 350 },
  { id: 'av_robo', nome: 'Robô', emoji: '🤖', preco: 600, nivel: 5 },
  { id: 'av_dino', nome: 'Dino', emoji: '🦕', preco: 450 },
  { id: 'av_ninja', nome: 'Ninja', emoji: '🥷', preco: 550 },
]

const catalogoMolduras = [
  { id: 'mo_basica', nome: 'Básica', emoji: '⬜', preco: 0 },
  { id: 'mo_estrelas', nome: 'Estrelas', emoji: '⭐', preco: 200 },
  { id: 'mo_fogo', nome: 'Fogo', emoji: '🔥', preco: 300 },
  { id: 'mo_arcoiris', nome: 'Arco-íris', emoji: '🌈', preco: 400 },
  { id: 'mo_diamante', nome: 'Diamante', emoji: '💎', preco: 700 },
  { id: 'mo_coroa', nome: 'Coroa', emoji: '👑', preco: 900 },
]

const catalogoTemas = [
  { id: 'tm_espaco', nome: 'Espaço', emoji: '🌌', preco: 800, desc: 'Tema galáxia para o perfil' },
  { id: 'tm_floresta', nome: 'Floresta', emoji: '🌿', preco: 600, desc: 'Tema natureza para o perfil' },
  { id: 'tm_oceano', nome: 'Oceano', emoji: '🌊', preco: 700, desc: 'Tema aquático para o perfil' },
]

const catalogoBrindes = [
  { id: 'br_adesivos', nome: 'Pacote de Adesivos', emoji: '🎨', preco: 500, desc: 'Kit com 20 adesivos temáticos', entrega: '15 dias' },
  { id: 'br_caderno', nome: 'Caderno de Missões', emoji: '📓', preco: 1200, desc: 'Caderno especial NeuralSync', entrega: '20 dias' },
  { id: 'br_camiseta', nome: 'Camiseta NeuralSync', emoji: '👕', preco: 3000, desc: 'Camiseta exclusiva da plataforma', entrega: '30 dias' },
  { id: 'br_caneca', nome: 'Caneca Espacial', emoji: '☕', preco: 1800, desc: 'Caneca temática de cerâmica', entrega: '25 dias' },
  { id: 'br_mochila', nome: 'Mochila NeuralSync', emoji: '🎒', preco: 5000, desc: 'Mochila exclusiva da academia', entrega: '45 dias' },
]

export default function Loja() {
  const navigate = useNavigate()
  const [aba, setAba] = useState('avatares')
  const [saldo, setSaldo] = useState(0)
  const [childId, setChildId] = useState(null)
  const [childNivel, setChildNivel] = useState(1)
  const [comprados, setComprados] = useState([])
  const [modalItem, setModalItem] = useState(null)
  const [compraOk, setCompraOk] = useState(false)

  useEffect(() => {
    const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (child) {
      setSaldo(child.neural_coins || 0)
      setChildId(child.id)
      setChildNivel(child.nivel || 1)
    } else {
      supabase.from('children').select('neural_coins,id,nivel').limit(1).then(({ data }) => {
        if (data?.[0]) { setSaldo(data[0].neural_coins || 0); setChildId(data[0].id); setChildNivel(data[0].nivel || 1) }
      })
    }
    const purch = (() => { try { return JSON.parse(localStorage.getItem('ns_purchased') || '[]') } catch { return [] } })()
    setComprados(purch.map(p => p.item_id))
    setComprados(['av_explorer', 'mo_basica', ...purch.map(p => p.item_id)])
  }, [])

  function comprar() {
    if (!modalItem || saldo < modalItem.preco) return
    const novoSaldo = saldo - modalItem.preco
    setSaldo(novoSaldo)
    const purch = (() => { try { return JSON.parse(localStorage.getItem('ns_purchased') || '[]') } catch { return [] } })()
    purch.push({ item_id: modalItem.id, timestamp: Date.now() })
    localStorage.setItem('ns_purchased', JSON.stringify(purch))
    setComprados(prev => [...prev, modalItem.id])
    const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (child) {
      const childAtualizado = { ...child, neural_coins: novoSaldo }
      localStorage.setItem('ns_active_child', JSON.stringify(childAtualizado))
    }
    if (childId) {
      supabase.from('children').update({ neural_coins: novoSaldo }).eq('id', childId).then(() => {})
    }
    setModalItem(null)
    setCompraOk(true)
    setTimeout(() => setCompraOk(false), 2500)
  }

  function renderBotao(item, isDesbloqueado, isLocked) {
    if (isDesbloqueado) return <div style={{ background: '#f0fdf4', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#10b981', textAlign: 'center' }}>Equipado ✓</div>
    if (isLocked) return <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '7px', fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>🔒 Nível {item.nivel}</div>
    const podeComprar = saldo >= item.preco && !comprados.includes(item.id)
    const jaComprado = comprados.includes(item.id) && !['av_explorer','mo_basica'].includes(item.id)
    if (jaComprado) return <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#3b82f6', textAlign: 'center' }}>Adquirido ✓</div>
    return (
      <button onClick={() => podeComprar && setModalItem(item)} style={{
        background: podeComprar ? 'linear-gradient(135deg, #7C3AED, #6d28d9)' : '#f3f4f6',
        border: 'none', borderRadius: '8px', padding: '8px',
        color: podeComprar ? 'white' : '#9ca3af',
        cursor: podeComprar ? 'pointer' : 'default',
        fontWeight: '700', fontSize: '12px', width: '100%',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}>
        {podeComprar ? '💰 ' + item.preco : 'Faltam ' + (item.preco - saldo)}
      </button>
    )
  }

  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
    <div className="page-wrapper" style={{ paddingBottom: '90px' }}>

      <div className="header-gradient">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '900' }}>Loja NeuralSync 🏪</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '2px' }}>Troque seus NeuralCoins</p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '12px', padding: '8px 14px', textAlign: 'center' }}>
            <div style={{ color: '#92400e', fontWeight: '900', fontSize: '16px' }}>💰 {saldo}</div>
            <div style={{ color: '#78350f', fontSize: '10px', fontWeight: '600' }}>NeuralCoins</div>
          </div>
        </div>
      </div>

      {compraOk && (
        <div style={{ background: '#10b981', padding: '12px 20px', textAlign: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>
          ✅ Compra realizada! Aproveite seu novo item!
        </div>
      )}

      <div style={{ background: 'white', display: 'flex', borderBottom: '1px solid #f3f4f6', overflowX: 'auto' }}>
        {['avatares', 'molduras', 'temas', 'brindes'].map(a => (
          <button key={a} onClick={() => setAba(a)} style={{
            flex: 1, padding: '12px 8px', background: 'none', border: 'none',
            color: aba === a ? '#7C3AED' : '#9ca3af', cursor: 'pointer',
            fontWeight: aba === a ? '700' : '500',
            borderBottom: aba === a ? '2px solid #7C3AED' : '2px solid transparent',
            textTransform: 'capitalize', fontSize: '13px', whiteSpace: 'nowrap',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>{a}</button>
        ))}
      </div>

      <div style={{ padding: '16px' }}>

        {aba === 'avatares' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {catalogoAvatares.map(item => {
              const isDesbloqueado = item.preco === 0
              const isLocked = item.nivel && childNivel < item.nivel
              return (
                <div key={item.id} className="card-white" style={{ padding: '16px', textAlign: 'center', border: isDesbloqueado ? '1.5px solid #10b981' : '1.5px solid #f3f4f6' }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{item.emoji}</div>
                  <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '10px', color: '#0f0a1e' }}>{item.nome}</div>
                  {renderBotao(item, isDesbloqueado, isLocked)}
                </div>
              )
            })}
          </div>
        )}

        {aba === 'molduras' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {catalogoMolduras.map(item => {
              const isDesbloqueado = item.preco === 0
              return (
                <div key={item.id} className="card-white" style={{ padding: '16px', textAlign: 'center', border: isDesbloqueado ? '1.5px solid #10b981' : '1.5px solid #f3f4f6' }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{item.emoji}</div>
                  <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '10px', color: '#0f0a1e' }}>{item.nome}</div>
                  {renderBotao(item, isDesbloqueado, false)}
                </div>
              )
            })}
          </div>
        )}

        {aba === 'temas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#faf5ff', borderRadius: '12px', padding: '12px 14px', fontSize: '13px', color: '#7C3AED', fontWeight: '600', marginBottom: '4px' }}>
              ✨ Personalize o visual do seu perfil com temas exclusivos!
            </div>
            {catalogoTemas.map(item => (
              <div key={item.id} className="card-white" style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ fontSize: '36px' }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#0f0a1e', marginBottom: '3px' }}>{item.nome}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{item.desc}</div>
                </div>
                <div>{renderBotao(item, false, false)}</div>
              </div>
            ))}
          </div>
        )}

        {aba === 'brindes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#fff7ed', borderRadius: '12px', padding: '12px 14px', fontSize: '13px', color: '#F07A20', fontWeight: '600', marginBottom: '4px' }}>
              📦 Brindes físicos enviados para o seu endereço!
            </div>
            {catalogoBrindes.map(item => (
              <div key={item.id} className="card-white" style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ fontSize: '36px' }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#0f0a1e', marginBottom: '3px' }}>{item.nome}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>{item.desc}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>📦 Entrega em até {item.entrega}</div>
                </div>
                <div style={{ flexShrink: 0 }}>{renderBotao(item, false, false)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 200 }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', textAlign: 'center', maxWidth: '300px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{modalItem.emoji}</div>
            <h3 style={{ fontWeight: '800', marginBottom: '8px', color: '#0f0a1e' }}>Confirmar compra?</h3>
            <p style={{ color: '#6b7280', marginBottom: '4px', fontSize: '14px' }}>{modalItem.nome}</p>
            <p style={{ color: '#F07A20', fontWeight: '800', fontSize: '18px', marginBottom: '6px' }}>💰 {modalItem.preco}</p>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '20px' }}>Saldo após: 💰 {saldo - modalItem.preco}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setModalItem(null)} style={{ flex: 1, background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '12px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Cancelar</button>
              <button onClick={comprar} className="btn-purple" style={{ flex: 1, padding: '12px' }}>Comprar! ✓</button>
            </div>
          </div>
        </div>
      )}

      <div className="menu-bottom">
        {menu.map(item => (
          <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
            style={{ color: item.path === '/loja' ? '#7C3AED' : '#9ca3af' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontWeight: item.path === '/loja' ? '700' : '500' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}
