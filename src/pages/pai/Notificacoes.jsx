import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutPai from '../../components/LayoutPai'
import { Bell } from '@phosphor-icons/react'
import '../../styles/pai.css'

const icones = {
  atividade: '🎯', conquista: '🏆', sessao_inicio: '🟢',
  sessao_fim: '🔵', relatorio: '📊', coins: '💰', streak: '🔥',
}

function tempoRelativo(ts) {
  if (!ts) return 'agora'
  const diff = Date.now() - ts
  if (diff < 60000) return 'agora'
  if (diff < 3600000) return `há ${Math.floor(diff / 60000)} min`
  if (diff < 86400000) return `há ${Math.floor(diff / 3600000)}h`
  if (diff < 172800000) return 'ontem'
  return `há ${Math.floor(diff / 86400000)} dias`
}

export default function Notificacoes() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [notifs, setNotifs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarNotifs() {
      let hist = []

      if (user) {
        const { data: filhos } = await supabase.from('children').select('id,nome').eq('parent_id', user.id)
        if (filhos && filhos.length > 0) {
          const ids = filhos.map(f => f.id)
          const { data } = await supabase
            .from('ns_historico')
            .select('titulo, xp, coins, tipo, timestamp, child_id')
            .in('child_id', ids)
            .order('timestamp', { ascending: false })
            .limit(20)
          if (data && data.length > 0) {
            const nomeMap = Object.fromEntries(filhos.map(f => [f.id, f.nome]))
            hist = data.map(h => ({ ...h, nome_filho: nomeMap[h.child_id] }))
          }
        }
      }

      if (hist.length === 0) {
        const local = (() => { try { return JSON.parse(localStorage.getItem('ns_historico') || '[]') } catch { return [] } })()
        hist = local.slice(0, 10)
      }

      const histNotifs = hist.map((h, i) => ({
        id: 'h_' + i,
        tipo: 'atividade',
        titulo: 'Atividade concluída' + (h.nome_filho ? ` — ${h.nome_filho}` : ''),
        mensagem: `"${h.titulo}" foi concluída com +${h.xp || 0} XP e +${h.coins || 0} 💰`,
        tempo: tempoRelativo(h.timestamp),
        lida: i > 2,
        ts: h.timestamp || (Date.now() - i * 3600000),
      }))

      const coinsNotifs = hist.filter(h => (h.xp || 0) >= 100).slice(0, 2).map((h, i) => ({
        id: 'coins_' + i,
        tipo: 'conquista',
        titulo: '🏆 Desempenho excelente!',
        mensagem: `Pontuação alta em "${h.titulo}" — ${h.xp} XP ganhos!`,
        tempo: tempoRelativo(h.timestamp),
        lida: true,
        ts: (h.timestamp || Date.now()) - 1000,
      }))

      const staticNotifs = [
        { id: 'rel', tipo: 'relatorio', titulo: 'Relatório disponível', mensagem: 'O relatório semanal está pronto para visualização', tempo: 'ontem', lida: true, ts: Date.now() - 86400000 },
      ]

      const allNotifs = [...histNotifs, ...coinsNotifs, ...staticNotifs]
        .sort((a, b) => (b.ts || 0) - (a.ts || 0))

      setNotifs(allNotifs.length > 0 ? allNotifs : [
        { id: 1, tipo: 'relatorio', titulo: 'Relatório disponível', mensagem: 'O relatório semanal está pronto', tempo: 'ontem', lida: true, ts: Date.now() - 86400000 },
      ])
      setLoading(false)
    }

    carregarNotifs()
  }, [user])

  const naoLidas = notifs.filter(n => !n.lida).length
  const marcarTodas = () => setNotifs(prev => prev.map(n => ({ ...n, lida: true })))
  const marcar = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n))

  return (
    <LayoutPai>
      <div className="pai-content" style={{ maxWidth: '680px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f0a1e', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 8 }}><Bell weight="fill" size={22} color="#7C3AED" /> Notificações{naoLidas > 0 ? ` (${naoLidas})` : ''}</h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Acompanhe a atividade do seu filho em tempo real.</p>
          </div>
          {naoLidas > 0 && <button className="btn-secondary" onClick={marcarTodas}>Marcar todas como lidas</button>}
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ color: '#7C3AED', fontWeight: '700' }}>Carregando notificações...</div>
          </div>
        ) : notifs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Bell weight="fill" size={48} color="#7C3AED" style={{ marginBottom: '12px' }} />
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Nenhuma notificação ainda.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notifs.map(notif => (
              <div key={notif.id} onClick={() => {
                marcar(notif.id)
                if (notif.tipo === 'relatorio') navigate('/relatorio')
              }}
                className="pai-card" style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start', cursor: 'pointer', borderLeft: notif.lida ? '3px solid #f3f4f6' : '3px solid #7C3AED', opacity: notif.lida ? 0.75 : 1 }}>
                <div style={{ fontSize: '24px' }}>{icones[notif.tipo] || '📌'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '3px', color: '#0f0a1e' }}>{notif.titulo}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', lineHeight: 1.4 }}>{notif.mensagem}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>{notif.tempo}</div>
                </div>
                {!notif.lida && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED', flexShrink: 0, marginTop: '4px' }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutPai>
  )
}
