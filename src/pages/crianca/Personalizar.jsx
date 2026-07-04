import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import LayoutCrianca from '../../components/LayoutCrianca'
import { MOLDURA_STYLES, TEMA_CONFIG } from '../../lib/lojaConfig'
import '../../styles/crianca.css'

const catalogoAvatares = [
  { id: 'av_explorer',   nome: 'Explorer',    emoji: '🧭', preco: 0 },
  { id: 'av_cientista',  nome: 'Cientista',   emoji: '🔬', preco: 300 },
  { id: 'av_astronauta', nome: 'Astronauta',  emoji: '🚀', preco: 500 },
  { id: 'av_mago',       nome: 'Mago',        emoji: '🧙', preco: 400 },
  { id: 'av_artista',    nome: 'Artista',     emoji: '🎨', preco: 350 },
  { id: 'av_robo',       nome: 'Robô',        emoji: '🤖', preco: 600 },
  { id: 'av_dino',       nome: 'Dino',        emoji: '🦕', preco: 450 },
  { id: 'av_ninja',      nome: 'Ninja',       emoji: '🥷', preco: 550 },
  { id: 'av_pirata',     nome: 'Pirata',      emoji: '🏴‍☠️', preco: 480 },
  { id: 'av_fada',       nome: 'Fada',        emoji: '🧚', preco: 420 },
  { id: 'av_dragao',     nome: 'Dragão',      emoji: '🐉', preco: 700 },
  { id: 'av_unicornio',  nome: 'Unicórnio',   emoji: '🦄', preco: 650 },
  { id: 'av_gato',       nome: 'Gato Ninja',  emoji: '😼', preco: 380 },
  { id: 'av_alien',      nome: 'Alien',       emoji: '👾', preco: 520 },
  { id: 'av_superheroi', nome: 'Super-Herói', emoji: '🦸', preco: 800 },
  { id: 'av_bruxa',      nome: 'Bruxa',       emoji: '🧙‍♀️', preco: 430 },
  { id: 'av_zumbi',      nome: 'Zumbi',       emoji: '🧟', preco: 580 },
  { id: 'av_sereia',     nome: 'Sereia',      emoji: '🧜', preco: 560 },
  { id: 'av_lenda',      nome: 'Lenda',       emoji: '⚡', preco: 2000 },
]

const catalogoMolduras = [
  { id: 'mo_basica',   nome: 'Básica',         emoji: '⬜', preco: 0 },
  { id: 'mo_estrelas', nome: 'Estrelas',       emoji: '⭐', preco: 200 },
  { id: 'mo_fogo',     nome: 'Fogo',           emoji: '🔥', preco: 300 },
  { id: 'mo_arcoiris', nome: 'Arco-íris',      emoji: '🌈', preco: 400 },
  { id: 'mo_diamante', nome: 'Diamante',       emoji: '💎', preco: 700 },
  { id: 'mo_coroa',    nome: 'Coroa',          emoji: '👑', preco: 900 },
  { id: 'mo_lua',      nome: 'Lua e Estrelas', emoji: '🌙', preco: 350 },
  { id: 'mo_flor',     nome: 'Flores',         emoji: '🌸', preco: 280 },
  { id: 'mo_raio',     nome: 'Raios',          emoji: '⚡', preco: 450 },
  { id: 'mo_gelado',   nome: 'Gelo',           emoji: '❄️', preco: 380 },
  { id: 'mo_neon',     nome: 'Neon',           emoji: '💫', preco: 600 },
  { id: 'mo_lenda',    nome: 'Lenda Dourada',  emoji: '🏆', preco: 1500 },
]

const catalogoTemas = [
  { id: 'tm_espaco',     nome: 'Espaço',     emoji: '🌌', preco: 0,    desc: 'Galáxia roxa' },
  { id: 'tm_floresta',   nome: 'Floresta',   emoji: '🌿', preco: 0,    desc: 'Verde natureza' },
  { id: 'tm_oceano',     nome: 'Oceano',     emoji: '🌊', preco: 0,    desc: 'Azul aquático' },
  { id: 'tm_fogo',       nome: 'Fogo',       emoji: '🔥', preco: 900,  desc: 'Laranja chamas' },
  { id: 'tm_neon',       nome: 'Neon',       emoji: '💜', preco: 750,  desc: 'Cyberpunk neon' },
  { id: 'tm_inverno',    nome: 'Inverno',    emoji: '❄️', preco: 650,  desc: 'Azul gelo' },
  { id: 'tm_por_do_sol', nome: 'Pôr do Sol', emoji: '🌅', preco: 700,  desc: 'Dourado e rosa' },
  { id: 'tm_candy',      nome: 'Candy',      emoji: '🍭', preco: 550,  desc: 'Pastel doce' },
  { id: 'tm_lava',       nome: 'Lava',       emoji: '🌋', preco: 850,  desc: 'Vermelho lava' },
  { id: 'tm_arcoiris',   nome: 'Arco-íris',  emoji: '🌈', preco: 1000, desc: 'Todas as cores' },
]

const catalogoTitulos = [
  { id: 'ti_curioso',    nome: 'Explorador Curioso',   emoji: '🔍', preco: 0 },
  { id: 'ti_quiz',       nome: 'Mestre dos Quiz',      emoji: '🧠', preco: 400 },
  { id: 'ti_leitura',    nome: 'Leitor Voraz',         emoji: '📚', preco: 350 },
  { id: 'ti_matematica', nome: 'Gênio da Matemática',  emoji: '🔢', preco: 500 },
  { id: 'ti_inventor',   nome: 'Inventor Supremo',     emoji: '💡', preco: 600 },
  { id: 'ti_natureza',   nome: 'Guardião da Natureza', emoji: '🌍', preco: 450 },
  { id: 'ti_streak',     nome: 'Campeão de Streak',    emoji: '🔥', preco: 700 },
  { id: 'ti_estrela',    nome: 'Estrela NeuralSync',   emoji: '⭐', preco: 800 },
  { id: 'ti_ciencia',    nome: 'Cientista Louco',      emoji: '🔬', preco: 550 },
  { id: 'ti_arte',       nome: 'Artista Digital',      emoji: '🎨', preco: 480 },
  { id: 'ti_codigo',     nome: 'Pequeno Programador',  emoji: '💻', preco: 650 },
  { id: 'ti_lenda',      nome: 'Lenda da Academia',    emoji: '👑', preco: 3000 },
]

const catalogoEfeitos = [
  { id: 'ef_confete',  nome: 'Confetes',           emoji: '🎊', preco: 0 },
  { id: 'ef_estrelas', nome: 'Chuva de Estrelas',  emoji: '✨', preco: 300 },
  { id: 'ef_fogos',    nome: 'Fogos de Artifício', emoji: '🎆', preco: 500 },
  { id: 'ef_arcoiris', nome: 'Arco-íris Mágico',   emoji: '🌈', preco: 400 },
  { id: 'ef_coins',    nome: 'Chuva de Coins',     emoji: '💰', preco: 350 },
  { id: 'ef_emoji',    nome: 'Emoji Mania',        emoji: '😄', preco: 280 },
  { id: 'ef_raio',     nome: 'Tempestade Elétrica',emoji: '⚡', preco: 600 },
  { id: 'ef_aurora',   nome: 'Aurora Boreal',      emoji: '🌌', preco: 800 },
]

const ABAS = [
  { id: 'avatar',  label: 'Avatar',  emoji: '🧑' },
  { id: 'moldura', label: 'Moldura', emoji: '🖼️' },
  { id: 'tema',    label: 'Tema',    emoji: '🎨' },
  { id: 'titulo',  label: 'Título',  emoji: '🏷️' },
  { id: 'efeito',  label: 'Efeito',  emoji: '✨' },
]

function resolverAvatar(av) {
  if (!av) return '🦊'
  if (!/^[\x00-\x7F]+$/.test(av)) return av
  const found = catalogoAvatares.find(a =>
    a.id === av || a.nome.toLowerCase() === av.toLowerCase()
  )
  return found ? found.emoji : '🦊'
}

export default function Personalizar() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [aba, setAba] = useState('avatar')
  const [comprados, setComprados] = useState(new Set())

  const [avatarEquipado, setAvatarEquipado] = useState('🦊')
  const [molduraEquipada, setMolduraEquipada] = useState(null)
  const [temaEquipado, setTemaEquipado] = useState(null)
  const [tituloEquipado, setTituloEquipado] = useState(null)
  const [efeitoEquipado, setEfeitoEquipado] = useState(null)

  const [toast, setToast] = useState(null)

  useEffect(() => {
    const cached = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (!cached) return
    setChild(cached)
    setAvatarEquipado(resolverAvatar(cached.avatar))

    const purch = (() => { try { return JSON.parse(localStorage.getItem('ns_purchased') || '[]') } catch { return [] } })()
    const ids = new Set([
      'av_explorer', 'mo_basica', 'ti_curioso', 'ef_confete',
      'tm_espaco', 'tm_floresta', 'tm_oceano',
      ...purch.map(p => p.item_id),
    ])
    setComprados(ids)

    try { setMolduraEquipada(JSON.parse(localStorage.getItem(`ns_moldura_${cached.id}`) || 'null')) } catch {}
    try { setTemaEquipado(JSON.parse(localStorage.getItem(`ns_tema_${cached.id}`) || 'null')) } catch {}
    try { setTituloEquipado(JSON.parse(localStorage.getItem(`ns_titulo_${cached.id}`) || 'null')) } catch {}
    try { setEfeitoEquipado(JSON.parse(localStorage.getItem(`ns_efeito_${cached.id}`) || 'null')) } catch {}
  }, [])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  function equiparAvatar(item) {
    if (!comprados.has(item.id)) { navigate('/loja'); return }
    const updatedChild = { ...child, avatar: item.emoji }
    setChild(updatedChild)
    setAvatarEquipado(item.emoji)
    localStorage.setItem('ns_active_child', JSON.stringify(updatedChild))
    supabase.from('children').update({ avatar: item.emoji }).eq('id', child.id)
    showToast('Avatar equipado!')
  }

  function equiparMoldura(item) {
    if (!comprados.has(item.id)) { navigate('/loja'); return }
    const obj = item.id === 'mo_basica' ? null : { id: item.id, nome: item.nome, emoji: item.emoji }
    setMolduraEquipada(obj)
    localStorage.setItem(`ns_moldura_${child.id}`, JSON.stringify(obj))
    supabase.from('children').update({ moldura_equipada: obj }).eq('id', child.id)
    showToast('Moldura equipada!')
  }

  function equiparTema(item) {
    if (!comprados.has(item.id)) { navigate('/loja'); return }
    const obj = { id: item.id, nome: item.nome, emoji: item.emoji }
    setTemaEquipado(obj)
    localStorage.setItem(`ns_tema_${child.id}`, JSON.stringify(obj))
    supabase.from('children').update({ tema_equipado: obj }).eq('id', child.id)
    showToast('Tema ativado! Navegue para ver o efeito.')
  }

  function removerTema() {
    setTemaEquipado(null)
    localStorage.removeItem(`ns_tema_${child.id}`)
    supabase.from('children').update({ tema_equipado: null }).eq('id', child.id)
    showToast('Tema padrão restaurado.')
  }

  function equiparTitulo(item) {
    if (!comprados.has(item.id)) { navigate('/loja'); return }
    const obj = { id: item.id, nome: item.nome, emoji: item.emoji }
    setTituloEquipado(obj)
    localStorage.setItem(`ns_titulo_${child.id}`, JSON.stringify(obj))
    supabase.from('children').update({ titulo_equipado: obj }).eq('id', child.id)
    showToast('Título equipado!')
  }

  function equiparEfeito(item) {
    if (!comprados.has(item.id)) { navigate('/loja'); return }
    const obj = { id: item.id, nome: item.nome, emoji: item.emoji }
    setEfeitoEquipado(obj)
    localStorage.setItem(`ns_efeito_${child.id}`, JSON.stringify(obj))
    supabase.from('children').update({ efeito_equipado: obj }).eq('id', child.id)
    showToast('Efeito equipado!')
  }

  if (!child) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f0a1e' }}>
      <div style={{ color: '#7C3AED', fontWeight: '700' }}>Carregando...</div>
    </div>
  )

  const molduraStyle = molduraEquipada?.id ? MOLDURA_STYLES[molduraEquipada.id] : null
  const temaAtivo = temaEquipado?.id ? TEMA_CONFIG[temaEquipado.id] : null
  const accentColor = temaAtivo?.accent || '#7C3AED'

  return (
    <LayoutCrianca child={child}>
      <div className="ns-pad" style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/perfil-crianca')}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >←</button>
          <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '900' }}>✨ Personalizar</h2>
        </div>

        {/* Preview card */}
        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '18px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0, ...(molduraStyle || {}) }}>
            {avatarEquipado}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: '900', fontSize: '18px', color: 'white', marginBottom: '2px' }}>{child.nome}</div>
            {tituloEquipado && (
              <div style={{ fontSize: '12px', color: accentColor, fontWeight: '700', marginBottom: '4px' }}>
                {tituloEquipado.emoji} {tituloEquipado.nome}
              </div>
            )}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {temaEquipado && <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', padding: '2px 8px', color: 'rgba(255,255,255,0.6)' }}>{temaEquipado.emoji} {temaEquipado.nome}</span>}
              {molduraEquipada && <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', padding: '2px 8px', color: 'rgba(255,255,255,0.6)' }}>{molduraEquipada.emoji} {molduraEquipada.nome}</span>}
              {efeitoEquipado && <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', padding: '2px 8px', color: 'rgba(255,255,255,0.6)' }}>{efeitoEquipado.emoji} {efeitoEquipado.nome}</span>}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {ABAS.map(a => (
            <button key={a.id} onClick={() => setAba(a.id)} style={{
              background: aba === a.id ? accentColor : 'rgba(255,255,255,0.07)',
              border: 'none', borderRadius: '10px', padding: '8px 14px',
              color: 'white', fontWeight: '700', fontSize: '13px',
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              boxShadow: aba === a.id ? `0 4px 12px ${accentColor}55` : 'none',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'all 0.15s',
            }}>
              {a.emoji} {a.label}
            </button>
          ))}
        </div>

        {/* Avatar tab */}
        {aba === 'avatar' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {catalogoAvatares.map(item => {
              const owned = comprados.has(item.id)
              const active = avatarEquipado === item.emoji
              return (
                <button key={item.id} onClick={() => equiparAvatar(item)} style={{
                  background: active ? `${accentColor}22` : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${active ? accentColor : owned ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '14px', padding: '12px 8px',
                  cursor: 'pointer', textAlign: 'center', opacity: owned ? 1 : 0.45,
                  transition: 'all 0.15s', fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '4px' }}>{item.emoji}</div>
                  <div style={{ fontSize: '10px', color: active ? accentColor : 'rgba(255,255,255,0.6)', fontWeight: '700' }}>{item.nome}</div>
                  {!owned && <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>🔒 Loja</div>}
                  {active && <div style={{ fontSize: '9px', color: accentColor, marginTop: '2px', fontWeight: '800' }}>✓ Equipado</div>}
                </button>
              )
            })}
          </div>
        )}

        {/* Moldura tab */}
        {aba === 'moldura' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {catalogoMolduras.map(item => {
              const owned = comprados.has(item.id)
              const active = molduraEquipada?.id === item.id || (item.id === 'mo_basica' && !molduraEquipada)
              const style = MOLDURA_STYLES[item.id]
              return (
                <button key={item.id} onClick={() => equiparMoldura(item)} style={{
                  background: active ? `${accentColor}22` : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${active ? accentColor : owned ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '14px', padding: '14px 10px',
                  cursor: 'pointer', textAlign: 'center', opacity: owned ? 1 : 0.45,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 8px', ...(style || {}) }}>
                    {item.emoji}
                  </div>
                  <div style={{ fontSize: '11px', color: active ? accentColor : 'rgba(255,255,255,0.7)', fontWeight: '700' }}>{item.nome}</div>
                  {!owned && <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>🔒 {item.preco} coins</div>}
                  {active && <div style={{ fontSize: '9px', color: accentColor, marginTop: '3px', fontWeight: '800' }}>✓ Equipado</div>}
                </button>
              )
            })}
          </div>
        )}

        {/* Tema tab */}
        {aba === 'tema' && (
          <>
            {temaEquipado && (
              <button onClick={removerTema} style={{ width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Restaurar tema padrão
              </button>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {catalogoTemas.map(item => {
                const owned = comprados.has(item.id)
                const active = temaEquipado?.id === item.id
                const cfg = TEMA_CONFIG[item.id]
                return (
                  <button key={item.id} onClick={() => equiparTema(item)} style={{
                    background: active ? `${accentColor}22` : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${active ? accentColor : owned ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '14px', padding: '0', overflow: 'hidden',
                    cursor: 'pointer', textAlign: 'left', opacity: owned ? 1 : 0.45,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}>
                    <div style={{ height: '36px', background: cfg?.topbar || '#1a0a3e', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>{item.emoji}</span>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: cfg?.accent || '#7C3AED', flexShrink: 0 }} />
                      <div style={{ width: '24px', height: '8px', borderRadius: '4px', background: cfg?.bg || '#0a0618', flexShrink: 0 }} />
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: '13px', color: active ? accentColor : 'rgba(255,255,255,0.85)', fontWeight: '800' }}>{item.nome}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{item.desc}</div>
                      {!owned && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>🔒 {item.preco} coins</div>}
                      {active && <div style={{ fontSize: '10px', color: accentColor, marginTop: '4px', fontWeight: '800' }}>✓ Ativo</div>}
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* Título tab */}
        {aba === 'titulo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {catalogoTitulos.map(item => {
              const owned = comprados.has(item.id)
              const active = tituloEquipado?.id === item.id
              return (
                <button key={item.id} onClick={() => equiparTitulo(item)} style={{
                  background: active ? `${accentColor}22` : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${active ? accentColor : owned ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '12px', padding: '14px 16px',
                  cursor: 'pointer', textAlign: 'left', opacity: owned ? 1 : 0.45,
                  display: 'flex', alignItems: 'center', gap: '12px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: active ? accentColor : 'white' }}>{item.nome}</div>
                    {!owned && <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>🔒 {item.preco} coins — ir à loja</div>}
                  </div>
                  {active && <div style={{ fontSize: '12px', color: accentColor, fontWeight: '800', flexShrink: 0 }}>✓</div>}
                </button>
              )
            })}
          </div>
        )}

        {/* Efeito tab */}
        {aba === 'efeito' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {catalogoEfeitos.map(item => {
              const owned = comprados.has(item.id)
              const active = efeitoEquipado?.id === item.id
              return (
                <button key={item.id} onClick={() => equiparEfeito(item)} style={{
                  background: active ? `${accentColor}22` : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${active ? accentColor : owned ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '14px', padding: '16px',
                  cursor: 'pointer', textAlign: 'center', opacity: owned ? 1 : 0.45,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '6px' }}>{item.emoji}</div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: active ? accentColor : 'rgba(255,255,255,0.85)' }}>{item.nome}</div>
                  {!owned && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>🔒 {item.preco} coins</div>}
                  {active && <div style={{ fontSize: '10px', color: accentColor, marginTop: '3px', fontWeight: '800' }}>✓ Equipado</div>}
                </button>
              )
            })}
          </div>
        )}

        {/* Botão loja */}
        <button onClick={() => navigate('/loja')} style={{
          width: '100%', marginTop: '20px', padding: '13px', borderRadius: '12px',
          border: '1.5px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)',
          color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontWeight: '700', fontSize: '13px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          🏪 Comprar mais itens na Loja
        </button>

        {/* Toast */}
        {toast && (
          <div style={{
            position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
            background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '12px',
            fontWeight: '800', fontSize: '14px', zIndex: 9999,
            boxShadow: '0 8px 24px rgba(16,185,129,0.4)',
          }}>
            ✓ {toast}
          </div>
        )}
      </div>
    </LayoutCrianca>
  )
}
