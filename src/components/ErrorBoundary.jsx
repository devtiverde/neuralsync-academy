import { Component } from 'react'
import { supabase } from '../lib/supabase'

// Rede de segurança global. Antes disto, QUALQUER erro de React derrubava a árvore
// inteira e o usuário via uma tela branca — sem mensagem, sem botão, sem reporte.
// Foi exatamente o que aconteceu no /encerramento depois do Quiz IA.
//
// Agora o erro vira uma tela explicativa com saída, E se auto-reporta em ns_feedback,
// então a gente descobre o bug mesmo que o cliente não escreva nada.

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { erro: null }
  }

  static getDerivedStateFromError(erro) {
    return { erro }
  }

  componentDidCatch(erro, info) {
    // console primeiro: se o reporte falhar, o rastro não se perde
    console.error('[ErrorBoundary]', erro, info?.componentStack)

    // auto-reporte. Fire-and-forget e dentro de try: o relatório de erro
    // não pode ser a causa de um segundo erro.
    try {
      const contexto = {
        rota: window.location.pathname + window.location.search,
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        automatico: true,
        stack: String(erro?.stack || erro).slice(0, 1500),
        componente: String(info?.componentStack || '').slice(0, 1500),
      }
      supabase.auth.getUser().then(({ data }) => {
        if (!data?.user) return   // sem sessão o RLS recusa o insert de qualquer forma
        supabase.from('ns_feedback').insert({
          user_id: data.user.id,
          tipo: 'bug',
          mensagem: `[automático] ${String(erro?.message || erro).slice(0, 500)}`,
          contexto,
        }).then(() => {})
      }).catch(() => {})
    } catch { /* nunca deixar o reporte quebrar a tela de erro */ }
  }

  render() {
    if (!this.state.erro) return this.props.children

    return (
      <div style={{
        minHeight: '100vh', background: '#0f0a1e', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}>
        <div style={{ maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>🛠️</div>
          <h1 style={{ fontSize: '24px', fontFamily: 'var(--ns-font-display)', fontWeight: 400, margin: '0 0 10px' }}>
            Ops, algo travou aqui
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px' }}>
            Já avisamos a equipe automaticamente. Seu progresso está salvo —
            é só voltar e continuar.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { window.location.href = '/home-crianca' }}
              style={{
                minHeight: '52px', padding: '0 22px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg,#7C3AED,#a855f7)', color: 'white',
                fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Voltar ao início
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                minHeight: '52px', padding: '0 22px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Tentar de novo
            </button>
          </div>
        </div>
      </div>
    )
  }
}
