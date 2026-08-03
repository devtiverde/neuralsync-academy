import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { temPlano, assinaturaCarregando, PLANOS_PAGOS } from '../../lib/assinatura'
import { activatePowerup, getActiveSummary } from '../../lib/powerups'
import { debitarLoja } from '../../lib/economia'
import LayoutCrianca from '../../components/LayoutCrianca'
import { MOLDURA_STYLES, TEMA_CONFIG } from '../../lib/lojaConfig'
import '../../styles/crianca.css'

import {
  catalogoAvatares, catalogoMolduras, catalogoTemas, catalogoTitulos,
  catalogoPowerups, catalogoEfeitos, catalogoBrindes,
} from '../../data/lojaCatalogo'

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
  const { subscription, subscriptionLoaded, loading: authLoading } = useAuth()

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
  // A compra agora espera a gravação: `comprando` trava o botão nesse intervalo
  // e `erroCompra` avisa quando não deu, em vez de fingir que deu.
  const [comprando, setComprando] = useState(false)
  const [erroCompra, setErroCompra] = useState(false)
  const [molduraEquipada, setMolduraEquipada] = useState(null)
  const [temaEquipado, setTemaEquipado] = useState(null)

  const temAcesso = temPlano(subscription, PLANOS_PAGOS)
  // `subscription === null` sozinho não distingue "carregando" de "sem plano":
  // subscriptionLoaded é quem sabe se o fetch já terminou.
  const subscriptionPendente = assinaturaCarregando(subscriptionLoaded, authLoading)

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

  // GRAVA PRIMEIRO, MUDA A TELA DEPOIS.
  //
  // Antes era o contrário: descontava a moeda na tela, guardava o item no
  // localStorage e só então disparava a gravação com `.then(() => {})` — um
  // `then` vazio, que engole o erro. Quando a gravação falhava, a criança via
  // "compra feita", ficava com o item só naquele aparelho, e ele sumia assim que
  // o app relesse do servidor. Perda silenciosa, e ninguém reporta isso como bug.
  //
  // Inverter a ordem custa a espera de uma requisição (coberta pelo estado
  // `comprando` no botão) e elimina qualquer necessidade de desfazer: ou gravou e
  // a tela muda, ou não gravou e nada mudou.
  async function comprar() {
    if (!modalItem || saldo < modalItem.preco || comprando) return

    const isAvatar = modalItem.id.startsWith('av_')
    const isPowerup = modalItem.id.startsWith('pu_')
    const categoria = isAvatar ? 'avatar' : modalItem.id.startsWith('mo_') ? 'moldura' : modalItem.id.startsWith('tm_') ? 'tema' : isPowerup ? 'powerup' : 'brinde'

    // 02/08/2026 — o débito saiu do navegador.
    // Antes esta tela calculava `neural_coins - preco` e mandava o TOTAL. Como a mesma
    // coluna era a do XP, era também o caminho mais curto para inventar saldo: bastava
    // mandar um número maior. Agora manda-se o ITEM; o servidor consulta o preço em
    // `ns_loja_precos`, confere saldo, nível e se já possui, debita e registra a posse —
    // tudo numa transação. A posse também deixou de ser gravável pelo cliente, senão
    // daria para inserir a linha e ficar com o item sem pagar.
    let novoSaldo = saldo - modalItem.preco
    if (childId) {
      setComprando(true)
      const r = await debitarLoja({ childId, itemId: modalItem.id })
      setComprando(false)

      if (!r?.ok) {
        setModalItem(null)
        setErroCompra(true)
        setTimeout(() => setErroCompra(false), 4500)
        // recusa do servidor (saldo/nível/já possui) traz o saldo real junto: aproveita
        // para corrigir a tela, que pode estar mostrando um número desatualizado.
        if (typeof r?.coins === 'number') setSaldo(r.coins)
        return
      }
      novoSaldo = r.coins
    }

    // A partir daqui está gravado — pode mexer na tela.
    setSaldo(novoSaldo)
    if (isAvatar && childId) {
      // avatar continua sendo do cliente: é aparência, não vale pontos
      supabase.from('children').update({ avatar: modalItem.emoji }).eq('id', childId).then(() => {})
    }
    try {
      const purch = (() => { try { return JSON.parse(localStorage.getItem('ns_purchased') || '[]') } catch { return [] } })()
      purch.push({ item_id: modalItem.id, timestamp: Date.now() })
      localStorage.setItem('ns_purchased', JSON.stringify(purch))
      const childLocal = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
      if (childLocal) {
        const atualizado = { ...childLocal, neural_coins: novoSaldo }
        if (isAvatar) atualizado.avatar = modalItem.emoji
        localStorage.setItem('ns_active_child', JSON.stringify(atualizado))
      }
    } catch { /* modo privado: o servidor já tem a verdade */ }
    setComprados(prev => [...prev, modalItem.id])

    if (isPowerup && childId) {
      activatePowerup(childId, modalItem.id)
      const puMap = {}
      getActiveSummary(childId).forEach(s => { puMap[s.id] = s.badge })
      setActivePu(puMap)
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

        {/* A compra agora pode falhar de verdade — e a crianca precisa saber, em
            vez de achar que comprou e o item sumir depois. */}
        {erroCompra && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: '12px', padding: '12px 20px', textAlign: 'center', color: '#fca5a5', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>
            😕 Não deu pra guardar sua compra agora. Suas moedas estão intactas — tente de novo em instantes.
          </div>
        )}
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
            { id: 'brindes', label: '🎁 Brindes (em breve)' },
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
            {/* Os brindes físicos ainda não existem de verdade. Deixar o resgate
                funcionando prometeria uma entrega que ninguém faria — pior que não ter. */}
            <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '38px', marginBottom: '10px' }}>🎁</div>
              <div style={{ fontWeight: '800', fontSize: '15px', color: '#fbbf24', marginBottom: '6px' }}>Brindes chegando em breve!</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6', maxWidth: '340px', margin: '0 auto' }}>
                Estamos preparando prêmios de verdade para chegarem na sua casa.
                Vá juntando suas NeuralCoins — elas continuam valendo!
              </div>
            </div>

            {catalogoBrindes.map(item => (
              <div key={item.id} style={{ opacity: 0.6, background: 'rgba(255,255,255,0.04)', border: comprados.includes(item.id) ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(251,191,36,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: 'white', marginBottom: '3px' }}>{item.nome}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>{item.desc}</div>
                  <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '600' }}>💰 {item.preco} NeuralCoins</div>
                </div>
                <div style={{ flexShrink: 0, minWidth: '110px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '7px', fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
                    🔜 Em breve
                  </div>
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
              <button onClick={comprar} disabled={comprando} style={{ flex: 1, background: comprando ? 'rgba(124,58,237,0.45)' : 'linear-gradient(135deg, #7C3AED, #5b21b6)', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{comprando ? '⏳ Comprando...' : 'Comprar! ✓'}</button>
            </div>
          </div>
        </div>
      )}
    </LayoutCrianca>
  )
}
