import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

// Canal de feedback / reporte de erro.
// Fica num botão flutuante PRÓPRIO, empilhado acima do FAQ, em vez de escondido dentro
// dele: com tráfego pago rodando, cliente que não acha onde reclamar pede estorno.

const TIPOS = [
  { id: 'bug',      label: 'Achei um erro', emoji: '🐛', cor: '#ef4444' },
  { id: 'sugestao', label: 'Tenho uma ideia', emoji: '💡', cor: '#f59e0b' },
  { id: 'duvida',   label: 'Estou com dúvida', emoji: '❓', cor: '#3b82f6' },
  { id: 'elogio',   label: 'Quero elogiar', emoji: '💜', cor: '#a855f7' },
]

export default function FeedbackButton({ tipo: area = 'pai' }) {
  const { user } = useAuth()
  const [aberto, setAberto] = useState(false)
  const [tipoSel, setTipoSel] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  function fechar() {
    setAberto(false)
    // reseta só depois da animação de saída, pra não piscar o form vazio
    setTimeout(() => { setTipoSel(null); setMensagem(''); setEnviado(false); setErro('') }, 200)
  }

  async function enviar() {
    if (!tipoSel || mensagem.trim().length < 3 || enviando) return
    setEnviando(true)
    setErro('')

    // contexto automático: sem isso quase todo reporte vira "não funciona" sem pista
    const contexto = {
      rota: window.location.pathname + window.location.search,
      // guardado aqui de propósito: a RLS não deixa ninguém ler o e-mail de outra conta,
      // nem o admin. Sem esta linha o painel mostra o reporte mas não tem como responder
      // a pessoa. O e-mail chega no aviso do Resend como `reply_to`, mas some da tela.
      email: user?.email ?? null,
      user_agent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      area,
      faixa: (() => {
        try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null')?.faixa_etaria || null }
        catch { return null }
      })(),
      enviado_em: new Date().toISOString(),
    }

    const { data, error } = await supabase.from('ns_feedback').insert({
      user_id: user?.id ?? null,
      tipo: tipoSel,
      mensagem: mensagem.trim().slice(0, 4000),
      contexto,
    }).select('id').single()

    // avisa por e-mail em segundo plano. Fire-and-forget de proposito: o que importa
    // e o INSERT acima, que ja aconteceu. Se o e-mail falhar, o feedback nao se perde.
    if (!error && data?.id) {
      supabase.functions.invoke('feedback-notify', { body: { feedback_id: data.id } })
        .catch(() => {})
    }

    setEnviando(false)
    if (error) {
      // falhar em silêncio aqui é o pior caso: a pessoa acha que reportou e não reportou
      setErro('Não consegui enviar. Confira sua conexão e tente de novo.')
      return
    }
    setEnviado(true)
    setTimeout(fechar, 2200)
  }

  const ehCrianca = area === 'crianca'

  return (
    <>
      <button
        className="feedback-float-btn"
        onClick={() => setAberto(true)}
        aria-label="Enviar feedback ou reportar um erro"
        title="Enviar feedback"
        style={{
          position: 'fixed', right: '24px', zIndex: 9998,
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'linear-gradient(135deg,#7C3AED,#a855f7)',
          border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(124,58,237,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        💬
      </button>

      {aberto && (
        <>
          <div
            onClick={fechar}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, backdropFilter: 'blur(4px)' }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Enviar feedback"
            style={{
              position: 'fixed', zIndex: 10000,
              left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
              width: 'min(440px, calc(100vw - 32px))',
              maxHeight: 'calc(100vh - 48px)', overflowY: 'auto',
              background: ehCrianca ? '#1a1030' : 'white',
              color: ehCrianca ? 'white' : '#1a1030',
              borderRadius: '20px', padding: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            {enviado ? (
              <div style={{ textAlign: 'center', padding: '28px 0' }}>
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>💜</div>
                <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontFamily: 'var(--ns-font-display)', fontWeight: 400 }}>
                  Recebemos!
                </h3>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '15px' }}>
                  Obrigado por avisar. Isso ajuda demais.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '18px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontFamily: 'var(--ns-font-display)', fontWeight: 400 }}>
                      Fale com a gente
                    </h3>
                    <p style={{ margin: 0, opacity: 0.65, fontSize: '14px' }}>
                      Achou um erro ou tem uma ideia? Conta pra nós.
                    </p>
                  </div>
                  <button
                    onClick={fechar}
                    aria-label="Fechar"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '24px', lineHeight: 1, color: 'inherit', opacity: 0.5,
                      minWidth: '44px', minHeight: '44px',
                    }}
                  >×</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                  {TIPOS.map(t => {
                    const sel = tipoSel === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTipoSel(t.id)}
                        aria-pressed={sel}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          minHeight: '48px', padding: '0 12px', borderRadius: '12px',
                          background: sel ? t.cor + '22' : (ehCrianca ? 'rgba(255,255,255,0.06)' : '#f6f4fb'),
                          border: '1.5px solid ' + (sel ? t.cor : 'transparent'),
                          color: 'inherit', fontSize: '13.5px', fontWeight: 700,
                          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>{t.emoji}</span>
                        {t.label}
                      </button>
                    )
                  })}
                </div>

                <textarea
                  value={mensagem}
                  onChange={e => setMensagem(e.target.value)}
                  placeholder={tipoSel === 'bug'
                    ? 'O que aconteceu? Em qual tela? O que você fez antes?'
                    : 'Escreva aqui...'}
                  rows={5}
                  maxLength={4000}
                  aria-label="Sua mensagem"
                  style={{
                    width: '100%', boxSizing: 'border-box', padding: '12px 14px',
                    borderRadius: '12px', resize: 'vertical',
                    background: ehCrianca ? 'rgba(255,255,255,0.06)' : '#f6f4fb',
                    border: '1.5px solid ' + (ehCrianca ? 'rgba(255,255,255,0.14)' : '#e2daf5'),
                    color: 'inherit', fontSize: '15px', fontFamily: 'inherit', outline: 'none',
                  }}
                />

                {erro && (
                  <p style={{ color: '#ef4444', fontSize: '13.5px', fontWeight: 600, margin: '10px 0 0' }}>{erro}</p>
                )}

                <button
                  onClick={enviar}
                  disabled={!tipoSel || mensagem.trim().length < 3 || enviando}
                  style={{
                    width: '100%', minHeight: '52px', marginTop: '14px',
                    borderRadius: '12px', border: 'none', cursor: 'pointer',
                    background: (!tipoSel || mensagem.trim().length < 3)
                      ? (ehCrianca ? 'rgba(255,255,255,0.1)' : '#e2daf5')
                      : 'linear-gradient(135deg,#7C3AED,#a855f7)',
                    color: (!tipoSel || mensagem.trim().length < 3) ? (ehCrianca ? 'rgba(255,255,255,0.4)' : '#9d92b8') : 'white',
                    fontSize: '15px', fontWeight: 800, fontFamily: 'inherit',
                  }}
                >
                  {enviando ? 'Enviando...' : 'Enviar'}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
