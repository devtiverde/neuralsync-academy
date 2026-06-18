import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/pai.css'

const icones = {
  atividade: '🎯',
  conquista: '🏆',
  sessao_inicio: '🟢',
  sessao_fim: '🔵',
  relatorio: '📊',
  coins: '💰',
  streak: '🔥',
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
  const [notifs, setNotifs] = useState([])

  useEffect(() => {
    const hist = (() => { try { return JSON.parse(localStorage.getItem('ns_historico') || '[]') } catch { return [] } })()
    const staticNotifs = [
      { id: 'rel', tipo: 'relatorio', titulo: 'Relatório disponível', mensagem: 'O relatório semanal está pronto para visualização', tempo: 'ontem', lida: true, ts: Date.now() - 86400000 },
    ]
    const histNotifs = hist.slice(0, 10).map((h, i) => ({
      id: 'h_' + i,
      tipo: 'atividade',
      titulo: 'Atividade concluída',
      mensagem: `"${h.titulo}" foi concluída com +${h.xp || 0} XP e +${h.coins || 0} 💰`,
      tempo: tempoRelativo(h.timestamp),
      lida: i > 1,
      ts: h.timestamp || (Date.now() - i * 3600000),
    }))
    const coinsNotifs = hist.filter(h => (h.xp || 0) >= 100).slice(0, 2).map((h, i) => ({
      id: 'coins_' + i,
      tipo: 'conquista',
      titulo: 'Desempenho excelente!',
      mensagem: `Pontuação alta em "${h.titulo}" — ${h.xp} XP ganhos!`,
      tempo: tempoRelativo(h.timestamp),
      lida: true,
      ts: (h.timestamp || Date.now()) - 1000,
    }))
    const allNotifs = [...histNotifs, ...coinsNotifs, ...staticNotifs]
      .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    setNotifs(allNotifs.length > 0 ? allNotifs : [
      { id: 1, tipo: 'sessao_inicio', titulo: 'Sessão iniciada', mensagem: 'Sua criança começou uma sessão de aprendizado', tempo: 'há 2 horas', lida: false, ts: Date.now() - 7200000 },
      { id: 2, tipo: 'conquista', titulo: 'Nova conquista!', mensagem: '"Primeira Missão" desbloqueada!', tempo: 'há 2 horas', lida: false, ts: Date.now() - 7200000 },
      { id: 3, tipo: 'sessao_fim', titulo: 'Sessão encerrada', mensagem: 'Sua criança completou a sessão de aprendizado', tempo: 'há 3 horas', lida: true, ts: Date.now() - 10800000 },
      { id: 4, tipo: 'relatorio', titulo: 'Relatório disponível', mensagem: 'O relatório semanal está pronto', tempo: 'ontem', lida: true, ts: Date.now() - 86400000 },
      { id: 5, tipo: 'streak', titulo: 'Streak! 🔥', mensagem: '7 dias seguidos de estudo!', tempo: 'ontem', lida: true, ts: Date.now() - 90000000 },
    ])
  }, [])

  const naoLidas = notifs.filter(n => !n.lida).length
  const marcarTodas = () => setNotifs(prev => prev.map(n => ({ ...n, lida: true })))
  const marcar = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n))

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <header className="pai-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
          <h2 style={{ fontWeight: '800', fontSize: '18px', color: '#0f0a1e' }}>🔔 Notificações</h2>
          {naoLidas > 0 && <span style={{ background: '#7C3AED', color: 'white', borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: '700' }}>{naoLidas}</span>}
        </div>
        {naoLidas > 0 && <button className="btn-secondary" onClick={marcarTodas}>Marcar todas como lidas</button>}
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px' }}>
        {notifs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔔</div>
            <p style={{ color: '#9ca3af', fontWeight: '600' }}>Nenhuma notificação ainda.</p>
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
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{notif.tempo}</div>
                </div>
                {!notif.lida && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED', flexShrink: 0, marginTop: '4px' }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
