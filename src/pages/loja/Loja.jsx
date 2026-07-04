import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { activatePowerup, getActiveSummary } from '../../lib/powerups'
import LayoutCrianca from '../../components/LayoutCrianca'
import { MOLDURA_STYLES, TEMA_CONFIG } from '../../lib/lojaConfig'
import '../../styles/crianca.css'

const catalogoAvatares = [
  { id: 'av_explorer', nome: 'Explorer', emoji: '🧭', preco: 0 },
  { id: 'av_cientista', nome: 'Cientista', emoji: '🔬', preco: 300 },
  { id: 'av_astronauta', nome: 'Astronauta', emoji: '🚀', preco: 500 },
  { id: 'av_mago', nome: 'Mago', emoji: '🧙', preco: 400 },
  { id: 'av_artista', nome: 'Artista', emoji: '🎨', preco: 350 },
  { id: 'av_robo', nome: 'Robô', emoji: '🤖', preco: 600, nivel: 5 },
  { id: 'av_dino', nome: 'Dino', emoji: '🦕', preco: 450 },
  { id: 'av_ninja', nome: 'Ninja', emoji: '🥷', preco: 550 },
  { id: 'av_pirata', nome: 'Pirata', emoji: '🏴‍☠️', preco: 480 },
  { id: 'av_fada', nome: 'Fada', emoji: '🧚', preco: 420 },
  { id: 'av_dragao', nome: 'Dragão', emoji: '🐉', preco: 700, nivel: 6 },
  { id: 'av_unicornio', nome: 'Unicórnio', emoji: '🦄', preco: 650 },
  { id: 'av_gato', nome: 'Gato Ninja', emoji: '😼', preco: 380 },
  { id: 'av_alien', nome: 'Alien', emoji: '👾', preco: 520 },
  { id: 'av_superheroi', nome: 'Super-Herói', emoji: '🦸', preco: 800, nivel: 8 },
  { id: 'av_bruxa', nome: 'Bruxa', emoji: '🧙‍♀️', preco: 430 },
  { id: 'av_zumbi', nome: 'Zumbi', emoji: '🧟', preco: 580 },
  { id: 'av_sereia', nome: 'Sereia', emoji: '🧜', preco: 560 },
  { id: 'av_lenda', nome: 'Lenda 🔒', emoji: '⚡', preco: 2000, nivel: 15 },
]

const catalogoMolduras = [
  { id: 'mo_basica', nome: 'Básica', emoji: '⬜', preco: 0 },
  { id: 'mo_estrelas', nome: 'Estrelas', emoji: '⭐', preco: 200 },
  { id: 'mo_fogo', nome: 'Fogo', emoji: '🔥', preco: 300 },
  { id: 'mo_arcoiris', nome: 'Arco-íris', emoji: '🌈', preco: 400 },
  { id: 'mo_diamante', nome: 'Diamante', emoji: '💎', preco: 700 },
  { id: 'mo_coroa', nome: 'Coroa', emoji: '👑', preco: 900 },
  { id: 'mo_lua', nome: 'Lua e Estrelas', emoji: '🌙', preco: 350 },
  { id: 'mo_flor', nome: 'Flores', emoji: '🌸', preco: 280 },
  { id: 'mo_raio', nome: 'Raios', emoji: '⚡', preco: 450 },
  { id: 'mo_gelado', nome: 'Gelo', emoji: '❄️', preco: 380 },
  { id: 'mo_neon', nome: 'Neon', emoji: '💫', preco: 600 },
  { id: 'mo_lenda', nome: 'Lenda Dourada', emoji: '🏆', preco: 1500, nivel: 10 },
]

const catalogoTemas = [
  { id: 'tm_espaco', nome: 'Espaço', emoji: '🌌', preco: 0, desc: 'Fundo galáxia roxa com estrelas animadas' },
  { id: 'tm_floresta', nome: 'Floresta', emoji: '🌿', preco: 0, desc: 'Tons de verde com folhas ao fundo' },
  { id: 'tm_oceano', nome: 'Oceano', emoji: '🌊', preco: 0, desc: 'Fundo aquático com bolhas animadas' },
  { id: 'tm_fogo', nome: 'Fogo', emoji: '🔥', preco: 900, desc: 'Gradiente laranja-vermelho com chamas' },
  { id: 'tm_neon', nome: 'Neon', emoji: '💜', preco: 750, desc: 'Visual cyberpunk com brilhos neon' },
  { id: 'tm_inverno', nome: 'Inverno', emoji: '❄️', preco: 650, desc: 'Fundo azul gelo com flocos de neve' },
  { id: 'tm_por_do_sol', nome: 'Pôr do Sol', emoji: '🌅', preco: 700, desc: 'Gradiente dourado e rosa vibrante' },
  { id: 'tm_candy', nome: 'Candy', emoji: '🍭', preco: 550, desc: 'Cores pastel doces e divertidas' },
  { id: 'tm_lava', nome: 'Lava', emoji: '🌋', preco: 850, desc: 'Vermelho profundo com efeito de lava' },
  { id: 'tm_arcoiris', nome: 'Arco-íris', emoji: '🌈', preco: 1000, nivel: 7, desc: 'Visual totalmente colorido e animado' },
]

const catalogoTitulos = [
  { id: 'ti_curioso', nome: 'Explorador Curioso', emoji: '🔍', preco: 0, desc: 'Título inicial de todo explorador' },
  { id: 'ti_quiz', nome: 'Mestre dos Quiz', emoji: '🧠', preco: 400, desc: 'Para quem domina as perguntas' },
  { id: 'ti_leitura', nome: 'Leitor Voraz', emoji: '📚', preco: 350, desc: 'Apaixonado por aprender' },
  { id: 'ti_matematica', nome: 'Gênio da Matemática', emoji: '🔢', preco: 500, desc: 'Calculadora humana' },
  { id: 'ti_inventor', nome: 'Inventor Supremo', emoji: '💡', preco: 600, desc: 'Mentes que criam o futuro' },
  { id: 'ti_natureza', nome: 'Guardião da Natureza', emoji: '🌍', preco: 450, desc: 'Defensor do planeta' },
  { id: 'ti_streak', nome: 'Campeão de Streak', emoji: '🔥', preco: 700, desc: '30 dias seguidos sem parar' },
  { id: 'ti_estrela', nome: 'Estrela NeuralSync', emoji: '⭐', preco: 800, nivel: 5, desc: 'Os melhores da plataforma' },
  { id: 'ti_ciencia', nome: 'Cientista Louco', emoji: '🔬', preco: 550, desc: 'Para quem ama experimentos' },
  { id: 'ti_arte', nome: 'Artista Digital', emoji: '🎨', preco: 480, desc: 'Criatividade sem limites' },
  { id: 'ti_codigo', nome: 'Pequeno Programador', emoji: '💻', preco: 650, desc: 'Futuro dev em treinamento' },
  { id: 'ti_lenda', nome: 'Lenda da Academia', emoji: '👑', preco: 3000, nivel: 20, desc: 'O título mais raro da plataforma' },
]

const catalogoPowerups = [
  { id: 'pu_xp2_1h', nome: 'XP Duplo (1h)', emoji: '⚡', preco: 200, desc: 'Ganhe o dobro de XP por 1 hora' },
  { id: 'pu_xp2_24h', nome: 'XP Duplo (24h)', emoji: '🌟', preco: 500, desc: 'Ganhe o dobro de XP por 24 horas' },
  { id: 'pu_coins_50', nome: 'NeuralCoins +50%', emoji: '💰', preco: 300, desc: 'Ganhe 50% mais coins por 1 hora' },
  { id: 'pu_pular', nome: 'Pular Atividade', emoji: '⏭️', preco: 150, desc: 'Pule uma atividade sem perder o progresso' },
  { id: 'pu_reviver', nome: 'Reviver Tentativa', emoji: '💖', preco: 100, desc: 'Continue de onde parou após erro' },
  { id: 'pu_hint', nome: 'Dica Mágica', emoji: '🔮', preco: 80, desc: 'Receba uma dica em qualquer atividade' },
  { id: 'pu_shield', nome: 'Escudo de Streak', emoji: '🛡️', preco: 250, desc: 'Protege seu streak por 1 dia sem jogar' },
  { id: 'pu_xp3', nome: 'XP Triplo (30min)', emoji: '🚀', preco: 400, desc: 'Ganhe o triplo de XP por 30 minutos' },
]

const catalogoEfeitos = [
  { id: 'ef_confete', nome: 'Confetes', emoji: '🎊', preco: 0, desc: 'Chuva de confetes coloridos ao completar' },
  { id: 'ef_estrelas', nome: 'Chuva de Estrelas', emoji: '✨', preco: 300, desc: 'Estrelas caindo na tela ao vencer' },
  { id: 'ef_fogos', nome: 'Fogos de Artifício', emoji: '🎆', preco: 500, desc: 'Explosão de fogos coloridos' },
  { id: 'ef_arcoiris', nome: 'Arco-íris Mágico', emoji: '🌈', preco: 400, desc: 'Arco-íris explode pela tela' },
  { id: 'ef_coins', nome: 'Chuva de Coins', emoji: '💰', preco: 350, desc: 'NeuralCoins caindo comemorando' },
  { id: 'ef_emoji', nome: 'Emoji Mania', emoji: '😄', preco: 280, desc: 'Emojis animados em festa' },
  { id: 'ef_raio', nome: 'Tempestade Elétrica', emoji: '⚡', preco: 600, nivel: 5, desc: 'Efeito de raios épico ao vencer' },
  { id: 'ef_aurora', nome: 'Aurora Boreal', emoji: '🌌', preco: 800, nivel: 8, desc: 'Cores mágicas dançando na tela' },
]

const catalogoBrindes = [
  { id: 'br_adesivos', nome: 'Pacote de Adesivos', emoji: '🎨', preco: 500, desc: 'Kit com 20 adesivos temáticos' },
  { id: 'br_caderno', nome: 'Caderno de Missões', emoji: '📓', preco: 1200, desc: 'Caderno especial NeuralSync' },
  { id: 'br_camiseta', nome: 'Camiseta NeuralSync', emoji: '👕', preco: 3000, desc: 'Camiseta exclusiva da plataforma' },
  { id: 'br_caneca', nome: 'Caneca Espacial', emoji: '☕', preco: 1800, desc: 'Caneca temática de cerâmica' },
  { id: 'br_mochila', nome: 'Mochila NeuralSync', emoji: '🎒', preco: 5000, desc: 'Mochila exclusiva da academia' },
  { id: 'br_bone', nome: 'Boné NeuralSync', emoji: '🧢', preco: 2000, desc: 'Boné bordado edição limitada' },
  { id: 'br_mousepad', nome: 'Mousepad Gamer', emoji: '🖱️', preco: 2500, desc: 'Mousepad com ilustração NeuralSync' },
  { id: 'br_poster', nome: 'Pôster Galáxia', emoji: '🌌', preco: 900, desc: 'Pôster A3 temático para o quarto' },
  { id: 'br_pin', nome: 'Pin Colecionável', emoji: '📌', preco: 600, desc: 'Pin metálico edição especial' },
  { id: 'br_livro', nome: 'Box de Livros', emoji: '📦', preco: 4000, desc: '3 livros educativos curados pela equipe' },
]

function resolverAvatar(av) {
  if (!av) return '🦊'
  if (!/^[\x00-\x7F]+$/.test(av)) return av
  const found = catalogoAvatares.find(a =>
    a.id === av || a.nome.toLowerCase() === av.toLowerCase()
  )
  return found ? found.emoji : '🦊'
}

export default function Loja() {
  const navigate = useNavigate()
  const { subscription, loading: authLoading } = useAuth()

  const [child] = useState(() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })
  const [aba, setAba] = useState('avatares')
  const [comprandoPU, setComprandoPU] = useState(null)
  const [activePu, setActivePu] = useState({})
  const [saldo, setSaldo] = useState(0)
  const [childId, setChildId] = useState(null)
  const [childNivel, setChildNivel] = useState(1)
  const [comprados, setComprados] = useState([])
  const [avatarAtual, setAvatarAtual] = useState('🦊')
  const [tituloEquipado, setTituloEquipado] = useState(null)
  const [efeitoEquipado, setEfeitoEquipado] = useState(null)
  const [modalItem, setModalItem] = useState(null)
  const [compraOk, setCompraOk] = useState(false)
  const [molduraEquipada, setMolduraEquipada] = useState(null)
  const [temaEquipado, setTemaEquipado] = useState(null)

  const temAcesso = subscription?.plano === 'familia' || subscription?.plano === 'premium'
  const subscriptionPendente = authLoading || subscription === null

  useEffect(() => {
    if (child) {
      setSaldo(child.neural_coins || 0)
      setChildId(child.id)
      setChildNivel(child.nivel || 1)
      setAvatarAtual(resolverAvatar(child.avatar))
      try { setTituloEquipado(JSON.parse(localStorage.getItem(`ns_titulo_${child.id}`) || 'null')) } catch {}
      try { setEfeitoEquipado(JSON.parse(localStorage.getItem(`ns_efeito_${child.id}`) || 'null')) } catch {}
      try { setMolduraEquipada(JSON.parse(localStorage.getItem(`ns_moldura_${child.id}`) || 'null')) } catch {}
      try { setTemaEquipado(JSON.parse(localStorage.getItem(`ns_tema_${child.id}`) || 'null')) } catch {}
      const summary = getActiveSummary(child.id)
      const puMap = {}
      summary.forEach(s => { puMap[s.id] = s.badge })
      setActivePu(puMap)

      const local = (() => { try { return JSON.parse(localStorage.getItem('ns_purchased') || '[]') } catch { return [] } })()
      Promise.all([
        supabase.from('ns_purchases').select('item_id').eq('child_id', child.id),
        supabase.from('children').select('titulo_equipado,efeito_equipado,moldura_equipada,tema_equipado').eq('id', child.id).single(),
      ]).then(([purchasesRes, childRes]) => {
        const remote = purchasesRes.data?.map(p => p.item_id) || []
        const todos = [...new Set(['av_explorer', 'mo_basica', 'ti_curioso', 'ef_confete', ...local.map(p => p.item_id), ...remote])]
        setComprados(todos)
        if (remote.length > 0) {
          const localIds = new Set(local.map(p => p.item_id))
          const extras = remote.filter(id => !localIds.has(id))
          if (extras.length > 0) {
            const merged = [...local, ...extras.map(id => ({ item_id: id, timestamp: Date.now() }))]
            localStorage.setItem('ns_purchased', JSON.stringify(merged))
          }
        }
        // Restore equipped state from Supabase when localStorage is empty (ex: novo dispositivo)
        const cd = childRes.data
        if (cd) {
          if (!localStorage.getItem(`ns_titulo_${child.id}`) && cd.titulo_equipado) {
            localStorage.setItem(`ns_titulo_${child.id}`, JSON.stringify(cd.titulo_equipado))
            setTituloEquipado(cd.titulo_equipado)
          }
          if (!localStorage.getItem(`ns_efeito_${child.id}`) && cd.efeito_equipado) {
            localStorage.setItem(`ns_efeito_${child.id}`, JSON.stringify(cd.efeito_equipado))
            setEfeitoEquipado(cd.efeito_equipado)
          }
          if (!localStorage.getItem(`ns_moldura_${child.id}`) && cd.moldura_equipada) {
            localStorage.setItem(`ns_moldura_${child.id}`, JSON.stringify(cd.moldura_equipada))
            setMolduraEquipada(cd.moldura_equipada)
          }
          if (!localStorage.getItem(`ns_tema_${child.id}`) && cd.tema_equipado) {
            localStorage.setItem(`ns_tema_${child.id}`, JSON.stringify(cd.tema_equipado))
            setTemaEquipado(cd.tema_equipado)
          }
        }
      })
    } else {
      const purch = (() => { try { return JSON.parse(localStorage.getItem('ns_purchased') || '[]') } catch { return [] } })()
      setComprados(['av_explorer', 'mo_basica', 'ti_curioso', 'ef_confete', ...purch.map(p => p.item_id)])
    }
  }, [])

  function comprar() {
    if (!modalItem || saldo < modalItem.preco) return
    const novoSaldo = saldo - modalItem.preco
    setSaldo(novoSaldo)
    const purch = (() => { try { return JSON.parse(localStorage.getItem('ns_purchased') || '[]') } catch { return [] } })()
    purch.push({ item_id: modalItem.id, timestamp: Date.now() })
    localStorage.setItem('ns_purchased', JSON.stringify(purch))
    setComprados(prev => [...prev, modalItem.id])
    const childLocal = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    const isAvatar = modalItem.id.startsWith('av_')
    const isPowerup = modalItem.id.startsWith('pu_')
    const categoria = isAvatar ? 'avatar' : modalItem.id.startsWith('mo_') ? 'moldura' : modalItem.id.startsWith('tm_') ? 'tema' : isPowerup ? 'powerup' : 'brinde'
    if (isPowerup && childId) {
      activatePowerup(childId, modalItem.id)
      const summary = getActiveSummary(childId)
      const puMap = {}
      summary.forEach(s => { puMap[s.id] = s.badge })
      setActivePu(puMap)
    }
    const updates = { neural_coins: novoSaldo }
    if (isAvatar) updates.avatar = modalItem.emoji
    if (childLocal) localStorage.setItem('ns_active_child', JSON.stringify({ ...childLocal, ...updates }))
    if (childId) {
      supabase.from('children').update(updates).eq('id', childId).then(() => {})
      if (!isPowerup) supabase.from('ns_purchases').insert({ child_id: childId, item_id: modalItem.id }).then(() => {})
    }
    setModalItem(null)
    setCompraOk(categoria)
    setTimeout(() => setCompraOk(false), 2500)
  }

  function equipar(item) {
    if (!item.emoji) return
    setAvatarAtual(item.emoji)
    const childLocal = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (childLocal) localStorage.setItem('ns_active_child', JSON.stringify({ ...childLocal, avatar: item.emoji }))
    if (childId) supabase.from('children').update({ avatar: item.emoji }).eq('id', childId).then(() => {})
  }

  function equiparTitulo(item) {
    if (!childId) return
    const dados = { id: item.id, nome: item.nome, emoji: item.emoji }
    localStorage.setItem(`ns_titulo_${childId}`, JSON.stringify(dados))
    setTituloEquipado(dados)
    supabase.from('children').update({ titulo_equipado: dados }).eq('id', childId).then(() => {})
    setCompraOk('titulo')
    setTimeout(() => setCompraOk(false), 2500)
  }

  function equiparEfeito(item) {
    if (!childId) return
    const dados = { id: item.id, nome: item.nome, emoji: item.emoji }
    localStorage.setItem(`ns_efeito_${childId}`, JSON.stringify(dados))
    setEfeitoEquipado(dados)
    supabase.from('children').update({ efeito_equipado: dados }).eq('id', childId).then(() => {})
    setCompraOk('efeito')
    setTimeout(() => setCompraOk(false), 2500)
  }

  function equiparMoldura(item) {
    if (!childId) return
    const dados = { id: item.id, nome: item.nome, emoji: item.emoji }
    localStorage.setItem(`ns_moldura_${childId}`, JSON.stringify(dados))
    setMolduraEquipada(dados)
    supabase.from('children').update({ moldura_equipada: dados }).eq('id', childId).then(() => {})
    setCompraOk('moldura_equipada')
    setTimeout(() => setCompraOk(false), 2500)
  }

  function equiparTema(item) {
    if (!childId) return
    const dados = { id: item.id, nome: item.nome, emoji: item.emoji }
    localStorage.setItem(`ns_tema_${childId}`, JSON.stringify(dados))
    setTemaEquipado(dados)
    supabase.from('children').update({ tema_equipado: dados }).eq('id', childId).then(() => {})
    setCompraOk('tema_equipado')
    setTimeout(() => setCompraOk(false), 2500)
  }

  function renderBotao(item, isDesbloqueado, isLocked) {
    const isAvatar  = item.id?.startsWith('av_')
    const isTitulo  = item.id?.startsWith('ti_')
    const isEfeito  = item.id?.startsWith('ef_')
    const isMoldura = item.id?.startsWith('mo_')
    const isTema    = item.id?.startsWith('tm_')
    const isBrinde  = item.id?.startsWith('br_')

    const isEquipadoAvatar  = isAvatar  && item.emoji === avatarAtual
    const isEquipadoTitulo  = isTitulo  && tituloEquipado?.id === item.id
    const isEquipadoEfeito  = isEfeito  && efeitoEquipado?.id === item.id
    const isEquipadoMoldura = isMoldura && molduraEquipada?.id === item.id
    const isEquipadoTema    = isTema    && temaEquipado?.id === item.id

    if (isEquipadoAvatar || isEquipadoTitulo || isEquipadoEfeito || isEquipadoMoldura || isEquipadoTema)
      return <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#34d399', textAlign: 'center' }}>Equipado ✓</div>

    if (isLocked)
      return <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '7px', fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>🔒 Nível {item.nivel}</div>

    const podeComprar = saldo >= item.preco

    if (isDesbloqueado || comprados.includes(item.id)) {
      if (isAvatar) return (
        <button onClick={() => equipar(item)} style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#a78bfa', textAlign: 'center', cursor: 'pointer', width: '100%', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Equipar →</button>
      )
      if (isTitulo) return (
        <button onClick={() => equiparTitulo(item)} style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#fbbf24', textAlign: 'center', cursor: 'pointer', width: '100%', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Equipar →</button>
      )
      if (isEfeito) return (
        <button onClick={() => equiparEfeito(item)} style={{ background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.4)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#67e8f9', textAlign: 'center', cursor: 'pointer', width: '100%', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Equipar →</button>
      )
      if (isMoldura) return (
        <button onClick={() => equiparMoldura(item)} style={{ background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.4)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#fbbf24', textAlign: 'center', cursor: 'pointer', width: '100%', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Equipar →</button>
      )
      if (isTema) return (
        <button onClick={() => equiparTema(item)} style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#a78bfa', textAlign: 'center', cursor: 'pointer', width: '100%', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Equipar →</button>
      )
      if (isBrinde) return <div style={{ background: 'rgba(251,191,36,0.15)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#fbbf24', textAlign: 'center' }}>📦 Pedido feito ✓</div>
      return <div style={{ background: 'rgba(124,58,237,0.15)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: '#a78bfa', textAlign: 'center' }}>Adquirido ✓</div>
    }

    return (
      <button onClick={() => podeComprar && setModalItem(item)} style={{
        background: podeComprar ? (isBrinde ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #7C3AED, #5b21b6)') : 'rgba(255,255,255,0.05)',
        border: 'none', borderRadius: '8px', padding: '8px',
        color: podeComprar ? 'white' : 'rgba(255,255,255,0.3)',
        cursor: podeComprar ? 'pointer' : 'default',
        fontWeight: '700', fontSize: '12px', width: '100%',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}>
        {isBrinde && podeComprar ? '🎁 Resgatar' : podeComprar ? '💰 ' + item.preco : 'Faltam ' + (item.preco - saldo)}
      </button>
    )
  }

  if (subscriptionPendente) return (
    <LayoutCrianca child={child}>
      <div className="ns-pad" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ color: '#a78bfa', fontWeight: '700', fontSize: '15px' }}>Carregando loja...</div>
      </div>
    </LayoutCrianca>
  )

  if (!temAcesso) return (
    <LayoutCrianca child={child}>
      <div className="ns-pad" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
        <div style={{ fontSize: '72px', marginBottom: '16px' }}>🏪</div>
        <div style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '99px', padding: '5px 14px', fontSize: '12px', color: '#a78bfa', fontWeight: '700', marginBottom: '16px' }}>Plano Família ou Premium</div>
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-0.5px' }}>A Loja fica disponível<br />no Plano Família</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px', maxWidth: '300px' }}>Troque NeuralCoins por avatares, molduras e brindes exclusivos!</p>
        <button onClick={() => navigate('/planos')} style={{ background: 'linear-gradient(135deg, #7C3AED, #5b21b6)', border: 'none', borderRadius: '12px', padding: '14px 28px', color: 'white', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginBottom: '12px' }}>
          Ver planos →
        </button>
        <button onClick={() => navigate('/home-crianca')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '13px' }}>← Voltar</button>
      </div>
    </LayoutCrianca>
  )

  return (
    <LayoutCrianca child={child}>
      <div className="ns-pad">

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #5b21b6 60%, #3b0764 100%)',
          borderRadius: '20px', padding: '24px 28px', marginBottom: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div>
            <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '900', marginBottom: '4px' }}>Loja NeuralSync 🏪</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Troque seus NeuralCoins por itens exclusivos</p>
          </div>
          <div style={{ background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.4)', borderRadius: '14px', padding: '12px 18px', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '20px' }}>💰 {saldo}</div>
            <div style={{ color: 'rgba(251,191,36,0.7)', fontSize: '11px', fontWeight: '600', marginTop: '2px' }}>NeuralCoins</div>
          </div>
        </div>

        {compraOk && (
          <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '12px 20px', textAlign: 'center', color: '#34d399', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>
            {compraOk === 'avatar' ? '✅ Avatar equipado! Veja no seu Perfil →'
             : compraOk === 'titulo' ? '✅ Título equipado! Aparece no seu Perfil e Ranking.'
             : compraOk === 'efeito' ? '✅ Efeito equipado! Aparece ao concluir atividades.'
             : compraOk === 'moldura' ? '✅ Moldura adquirida! Agora clique em Equipar →'
             : compraOk === 'moldura_equipada' ? '✅ Moldura equipada! Aparece ao redor do seu avatar.'
             : compraOk === 'tema' ? '✅ Tema adquirido! Agora clique em Equipar →'
             : compraOk === 'tema_equipado' ? '✅ Tema equipado! As cores do app foram atualizadas.'
             : compraOk === 'powerup' ? '⚡ Power-up ativado! Já está valendo nas suas atividades.'
             : '🎁 Pedido feito! Seu responsável receberá as instruções por email.'}
          </div>
        )}

        {/* Tabs */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', display: 'flex', marginBottom: '20px', overflow: 'hidden', overflowX: 'auto' }}>
          {[
            { id: 'avatares', label: '🧙 Avatares' },
            { id: 'molduras', label: '🖼️ Molduras' },
            { id: 'titulos', label: '🏷️ Títulos' },
            { id: 'powerups', label: '⚡ Power-ups' },
            { id: 'efeitos', label: '✨ Efeitos' },
            { id: 'temas', label: '🎨 Temas' },
            { id: 'brindes', label: '🎁 Brindes' },
          ].map(a => (
            <button key={a.id} onClick={() => setAba(a.id)} style={{
              flexShrink: 0, padding: '12px 14px', background: 'none', border: 'none',
              color: aba === a.id ? '#a78bfa' : 'rgba(255,255,255,0.4)', cursor: 'pointer',
              fontWeight: aba === a.id ? '700' : '500',
              borderBottom: aba === a.id ? '2px solid #7C3AED' : '2px solid transparent',
              fontSize: '12px', whiteSpace: 'nowrap',
              fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s',
            }}>{a.label}</button>
          ))}
        </div>

        {/* Avatares */}
        {aba === 'avatares' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
            {catalogoAvatares.map(item => {
              const isDesbloqueado = item.preco === 0
              const isLocked = item.nivel && childNivel < item.nivel
              return (
                <div key={item.id} style={{
                  background: isDesbloqueado ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.05)',
                  border: isDesbloqueado ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '18px 12px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{item.emoji}</div>
                  <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '10px', color: 'white' }}>{item.nome}</div>
                  {renderBotao(item, isDesbloqueado, isLocked)}
                </div>
              )
            })}
          </div>
        )}

        {/* Molduras */}
        {aba === 'molduras' && (
          <div>
            <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#fbbf24', fontWeight: '600', marginBottom: '16px' }}>
              🖼️ Molduras aparecem ao redor do seu avatar no perfil e no app!
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {catalogoMolduras.map(item => {
                const isDesbloqueado = item.preco === 0
                const isLocked = item.nivel && childNivel < item.nivel
                const moldStyle = MOLDURA_STYLES[item.id]
                return (
                  <div key={item.id} style={{
                    background: isDesbloqueado ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.05)',
                    border: isDesbloqueado ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px', padding: '16px 12px', textAlign: 'center',
                    position: 'relative',
                  }}>
                    {/* Badge do emoji da moldura */}
                    <div style={{ fontSize: '18px', marginBottom: '8px', lineHeight: 1 }}>{item.emoji}</div>
                    {/* Preview: avatar com a borda da moldura */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                      <div style={{
                        width: '56px', height: '56px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4c1d95, #7C3AED)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '26px',
                        ...(moldStyle ? { border: moldStyle.border, boxShadow: moldStyle.boxShadow } : { border: '2px solid rgba(255,255,255,0.15)' }),
                      }}>
                        {avatarAtual || '🦊'}
                      </div>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '12px', marginBottom: '8px', color: 'white' }}>{item.nome}</div>
                    {renderBotao(item, isDesbloqueado, isLocked)}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Títulos */}
        {aba === 'titulos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#fbbf24', fontWeight: '600', marginBottom: '4px' }}>
              🏷️ Equipe um título para exibir no seu perfil e no ranking!
            </div>
            {catalogoTitulos.map(item => {
              const isDesbloqueado = item.preco === 0
              const isLocked = item.nivel && childNivel < item.nivel
              return (
                <div key={item.id} style={{ background: isDesbloqueado ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.05)', border: isDesbloqueado ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ fontSize: '28px', flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: 'white', marginBottom: '2px' }}>{item.nome}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{item.desc}</div>
                  </div>
                  <div style={{ flexShrink: 0, minWidth: '110px' }}>{renderBotao(item, isDesbloqueado, isLocked)}</div>
                </div>
              )
            })}
          </div>
        )}

        {/* Power-ups */}
        {aba === 'powerups' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#fbbf24', fontWeight: '600', marginBottom: '4px' }}>
              ⚡ Power-ups são consumíveis e podem ser comprados várias vezes!
            </div>
            {catalogoPowerups.map(item => {
              const podeComprar = saldo >= item.preco
              const ativo = activePu[item.id]
              return (
                <div key={item.id} style={{ background: ativo ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.04)', border: ativo ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: ativo ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: 'white', marginBottom: '2px' }}>{item.nome}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>{item.desc}</div>
                    <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '600' }}>💰 {item.preco} NeuralCoins</div>
                  </div>
                  <div style={{ flexShrink: 0, minWidth: '90px', textAlign: 'center' }}>
                    {ativo ? (
                      <div style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '8px', padding: '7px 10px', fontSize: '11px', fontWeight: '800', color: '#fbbf24', textAlign: 'center', lineHeight: 1.3 }}>
                        ⚡ Ativo<br />{ativo}
                      </div>
                    ) : (
                      <button onClick={() => podeComprar && setModalItem(item)} style={{
                        background: podeComprar ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255,255,255,0.05)',
                        border: 'none', borderRadius: '8px', padding: '8px 12px',
                        color: podeComprar ? 'white' : 'rgba(255,255,255,0.3)',
                        cursor: podeComprar ? 'pointer' : 'default',
                        fontWeight: '700', fontSize: '12px', width: '100%',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}>
                        {podeComprar ? '💰 ' + item.preco : 'Faltam ' + (item.preco - saldo)}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Efeitos de Celebração */}
        {aba === 'efeitos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
            <div style={{ gridColumn: '1 / -1', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#67e8f9', fontWeight: '600' }}>
              ✨ Efeitos visuais que aparecem quando você completa uma atividade!
            </div>
            {catalogoEfeitos.map(item => {
              const isDesbloqueado = item.preco === 0
              const isLocked = item.nivel && childNivel < item.nivel
              return (
                <div key={item.id} style={{ background: isDesbloqueado ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.05)', border: isDesbloqueado ? '1px solid rgba(6,182,212,0.3)' : '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '18px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{item.emoji}</div>
                  <div style={{ fontWeight: '700', fontSize: '12px', color: 'white', marginBottom: '5px', lineHeight: 1.3 }}>{item.nome}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '10px', lineHeight: 1.4 }}>{item.desc}</div>
                  {renderBotao(item, isDesbloqueado, isLocked)}
                </div>
              )
            })}
          </div>
        )}

        {/* Temas */}
        {aba === 'temas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#a78bfa', fontWeight: '600', marginBottom: '4px' }}>
              🎨 Temas mudam as cores do app — fundo, topbar e barra de XP!
            </div>
            {catalogoTemas.map(item => {
              const isDesbloqueado = item.preco === 0
              const isLocked = item.nivel && childNivel < item.nivel
              const temaStyle = TEMA_CONFIG[item.id]
              return (
                <div key={item.id} style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '14px 16px', display: 'flex', gap: '14px', alignItems: 'center',
                }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '14px', flexShrink: 0,
                    background: temaStyle?.topbar || 'linear-gradient(135deg, #1a0a3e, #050510)',
                    border: `2px solid ${temaStyle?.accent || '#7C3AED'}55`,
                    boxShadow: `0 0 10px ${temaStyle?.accent || '#7C3AED'}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
                  }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: 'white', marginBottom: '2px' }}>{item.nome}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>{item.desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: temaStyle?.accent || '#a78bfa' }} />
                      <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '600' }}>💰 {item.preco} NeuralCoins</span>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, minWidth: '110px' }}>{renderBotao(item, isDesbloqueado, isLocked)}</div>
                </div>
              )
            })}
          </div>
        )}

        {/* Brindes */}
        {aba === 'brindes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontWeight: '800', fontSize: '13px', color: '#fbbf24', marginBottom: '12px' }}>🎁 Como funciona o resgate?</div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { n: '1', texto: 'Escolha um brinde e clique em Resgatar' },
                  { n: '2', texto: 'Seu responsável recebe as instruções por email' },
                  { n: '3', texto: 'O brinde chega na sua casa em alguns dias!' },
                ].map(step => (
                  <div key={step.n} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flex: '1 1 150px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(251,191,36,0.25)', color: '#fbbf24', fontWeight: '900', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.n}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.4' }}>{step.texto}</div>
                  </div>
                ))}
              </div>
            </div>
            {catalogoBrindes.map(item => (
              <div key={item.id} style={{ background: 'rgba(255,255,255,0.04)', border: comprados.includes(item.id) ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(251,191,36,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: 'white', marginBottom: '3px' }}>{item.nome}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>{item.desc}</div>
                  <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '600' }}>💰 {item.preco} NeuralCoins</div>
                </div>
                <div style={{ flexShrink: 0, minWidth: '110px' }}>
                  {renderBotao(item, false, false)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de compra */}
      {modalItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 200 }}>
          <div style={{ background: 'linear-gradient(135deg, #1a0a3e, #0c0520)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '28px', textAlign: 'center', maxWidth: '320px', width: '100%' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{modalItem.emoji}</div>
            <h3 style={{ fontWeight: '800', marginBottom: '8px', color: 'white' }}>Confirmar compra?</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontSize: '14px' }}>{modalItem.nome}</p>
            <p style={{ color: '#fbbf24', fontWeight: '800', fontSize: '18px', marginBottom: '6px' }}>💰 {modalItem.preco}</p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginBottom: modalItem?.id?.startsWith('br_') ? '10px' : '20px' }}>Saldo após: 💰 {saldo - modalItem.preco}</p>
            {modalItem?.id?.startsWith('br_') && (
              <p style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '10px', padding: '10px 12px', color: 'rgba(251,191,36,0.8)', fontSize: '12px', marginBottom: '20px', lineHeight: '1.5', textAlign: 'left' }}>
                📦 Após confirmar, seu responsável receberá um email com as instruções de entrega.
              </p>
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setModalItem(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Cancelar</button>
              <button onClick={comprar} style={{ flex: 1, background: 'linear-gradient(135deg, #7C3AED, #5b21b6)', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Comprar! ✓</button>
            </div>
          </div>
        </div>
      )}
    </LayoutCrianca>
  )
}
