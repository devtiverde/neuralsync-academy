import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import LayoutCrianca from '../../components/LayoutCrianca'
import { CoinVertical, Target } from '@phosphor-icons/react'
import '../../styles/crianca.css'

const PROXIMOS_ALVOS = [200, 300, 400, 500, 600, 700, 900, 1200, 1800, 3000, 5000]

const nomeAlvo = {
  200: 'Moldura Estrelas ⭐', 300: 'Avatar Cientista 🔬', 400: 'Moldura Fogo 🔥',
  500: 'Avatar Astronauta 🚀', 600: 'Avatar Robô 🤖', 700: 'Tema Oceano 🌊',
  900: 'Moldura Arco-íris 🌈', 1200: 'Caderno de Missões 📓',
  1800: 'Caneca Espacial ☕', 3000: 'Camiseta NeuralSync 👕', 5000: 'Mochila NeuralSync 🎒',
}

const BRINDES_FISICOS = new Set([1200, 1800, 3000, 5000])

function tempoRelativo(ts) {
  if (!ts) return ''
  const diff = Date.now() - ts
  if (diff < 60000) return 'agora'
  if (diff < 3600000) return `há ${Math.floor(diff / 60000)} min`
  if (diff < 86400000) return `há ${Math.floor(diff / 3600000)}h`
  if (diff < 172800000) return 'ontem'
  return `há ${Math.floor(diff / 86400000)} dias`
}

export default function Coins() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [historico, setHistorico] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (!cached) { setLoading(false); return }
    setChild(cached)

    supabase.from('ns_historico')
      .select('titulo, coins, xp, tipo, data, timestamp')
      .eq('child_id', cached.id)
      .order('timestamp', { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHistorico(data)
        } else {
          const local = (() => { try { return JSON.parse(localStorage.getItem('ns_historico') || '[]') } catch { return [] } })()
          setHistorico(local.filter(h => !h.child_id || h.child_id === cached.id).slice(0, 30))
        }
        setLoading(false)
      })
  }, [])

  const saldo = child?.neural_coins ?? 0
  const proximoIdx = PROXIMOS_ALVOS.findIndex(a => a > saldo)
  const proximoAlvo = proximoIdx >= 0 ? PROXIMOS_ALVOS[proximoIdx] : null
  const alvoAnterior = proximoIdx > 0 ? PROXIMOS_ALVOS[proximoIdx - 1] : 0
  const progressoPct = proximoAlvo ? Math.round(((saldo - alvoAnterior) / (proximoAlvo - alvoAnterior)) * 100) : 100

  return (
    <LayoutCrianca child={child}>
      <div className="ns-pad">

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <button onClick={() => navigate('/home-crianca')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: 6 }}>Carteira <CoinVertical weight="duotone" size={20} color="#F59E0B" /></h2>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>

          <div style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.15))', borderRadius: '20px', padding: '28px', textAlign: 'center', marginBottom: '14px', border: '1.5px solid rgba(251,191,36,0.4)' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', marginBottom: '8px' }}>Saldo atual</div>
            <div style={{ fontSize: '52px', fontWeight: '900', color: '#fbbf24', letterSpacing: '-2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><CoinVertical weight="duotone" size={52} color="#F59E0B" /> {saldo}</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>NeuralCoins</div>
          </div>

          {proximoAlvo && (
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '18px', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '500', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: 4 }}><Target weight="duotone" size={16} color="#F97316" /> Próxima recompensa</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ fontWeight: '700', fontSize: '15px', color: 'white' }}>{nomeAlvo[proximoAlvo]}</div>
                {/* volta pra "em breve": os brindes físicos ainda não existem, e prometer
                    entrega numa meta que a criança persegue por semanas é pior que não ter */}
                {BRINDES_FISICOS.has(proximoAlvo) && (
                  <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', padding: '2px 9px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: '700', whiteSpace: 'nowrap' }}>🔜 Brinde em breve</div>
                )}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '7px', overflow: 'hidden', marginBottom: '6px' }}>
                <div style={{ background: 'linear-gradient(90deg, #7C3AED, #a78bfa)', width: Math.max(progressoPct, 2) + '%', height: '100%', borderRadius: '999px', transition: 'width 0.5s' }} />
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>{saldo} de {proximoAlvo} coins • Faltam {proximoAlvo - saldo}</div>
            </div>
          )}

          <button onClick={() => navigate('/loja')} style={{
            width: '100%', padding: '14px', borderRadius: '14px', border: 'none', marginBottom: '24px',
            background: 'linear-gradient(135deg, #7C3AED, #6d28d9)',
            color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
          }}>🏪 Ir para a Loja</button>

          <h4 style={{ fontWeight: '800', fontSize: '15px', marginBottom: '12px', color: 'white' }}>Histórico</h4>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Carregando...</div>
          ) : historico.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '32px', textAlign: 'center' }}>
              <CoinVertical weight="duotone" size={36} color="#F59E0B" style={{ marginBottom: '10px' }} />
              <div style={{ color: 'white', fontWeight: '700', marginBottom: '4px' }}>Nenhuma atividade ainda</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Complete atividades para ganhar NeuralCoins!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {historico.map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px', padding: '14px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💚</div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px', color: 'white' }}>{item.titulo}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{item.data || tempoRelativo(item.timestamp)}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: '800', color: '#10b981', fontSize: '15px' }}>+{item.coins}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LayoutCrianca>
  )
}
