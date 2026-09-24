import { useState, useEffect, useRef } from 'react'
import FAQButton from './FAQButton'
import FeedbackButton from './FeedbackButton'

/**
 * Um círculo fixo no lugar de dois.
 *
 * POR QUE — 24/09/2026
 * --------------------
 * O Cláudio pediu a um amigo para testar e ouviu: *"muito poluído visualmente,
 * alguns pais vão ter dificuldade pra começar"*. Fui medir em vez de adivinhar.
 *
 * Havia DOIS botões fixos em toda tela do app — o "?" da ajuda (48px) e o "💬" do
 * feedback (52px), empilhados no canto inferior direito, os dois em roxo forte com
 * sombra. Medido com `auditar-flutuantes.mjs` em 19 telas a 393px: os dois ficavam
 * por cima de conteúdo em **19 de 19**, e por cima de algum CONTROLE em 9.
 *
 * 🪤 E aqui está a parte que quase virou conserto errado: reexaminei os 26 controles
 * cobertos perguntando se ALGUMA posição de rolagem os libera. **Todos os 26 saem
 * de baixo com um dedo de rolagem.** Ou seja, nenhum toque estava sendo roubado —
 * ao contrário da barra inferior de 93px, que prendia o controle no fim da página.
 * Então isto aqui **não é conserto de defeito, é redução de ruído**: dois círculos
 * permanentes competindo com o conteúdo em toda tela, para duas ações raras.
 * Ver [[feedback_vazamento_alcancavel_vs_inalcancavel]].
 *
 * O QUE MUDA
 * Um botão só. Tocá-lo abre um menuzinho com as duas opções, e cada painel continua
 * sendo o mesmo de antes — `FAQButton` e `FeedbackButton` não foram reescritos, só
 * ganharam a possibilidade de serem abertos de fora (`semBotao` + `abertoExterno`).
 *
 * 🔑 E resolve de quebra um buraco que a auditoria de orientação achou: a ajuda não
 * era alcançável em 5 telas — digitação, ebooks, bloqueio, login e recuperar senha —
 * porque os dois botões moravam dentro do `LayoutPai`/`LayoutCrianca`, e essas telas
 * não usam layout nenhum. Justamente as telas onde alguém trava. Agora o
 * `AjudaFlutuante` pode ser montado sozinho, sem layout.
 *
 * 🪤 `somenteFaq` existe para as telas PÚBLICAS (entrar, recuperar senha). A policy
 * da `ns_feedback` é `WITH CHECK (user_id = auth.uid())`: para quem não está logado
 * os dois lados são NULL, e em SQL `null = null` não é verdadeiro — o INSERT é
 * recusado. Oferecer "relatar um problema" ali seria um formulário que sempre falha,
 * exatamente na tela de quem já está com problema.
 */
export default function AjudaFlutuante({ tipo = 'pai', somenteFaq = false }) {
  const [menu, setMenu] = useState(false)
  const [painel, setPainel] = useState(null)   // null | 'faq' | 'feedback'
  const caixa = useRef(null)

  // Fechar tocando fora e no Esc: um menu que só fecha pelo próprio botão é uma
  // armadilha em celular, onde não existe "clicar fora" óbvio.
  useEffect(() => {
    if (!menu) return
    const foraDaCaixa = ev => { if (caixa.current && !caixa.current.contains(ev.target)) setMenu(false) }
    const esc = ev => { if (ev.key === 'Escape') setMenu(false) }
    document.addEventListener('pointerdown', foraDaCaixa)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', foraDaCaixa)
      document.removeEventListener('keydown', esc)
    }
  }, [menu])

  // Esc fecha o painel aberto. Descoberto testando: nem o FAQ nem o de feedback
  // fechavam no Esc — só no ✕ ou clicando no escurecido. Com um caminho de entrada
  // só, ficar preso num painel é pior do que era antes.
  useEffect(() => {
    if (!painel) return
    const esc = ev => { if (ev.key === 'Escape') setPainel(null) }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [painel])

  function escolher(qual) { setMenu(false); setPainel(qual) }

  // Com uma opção só, menu é cerimônia: o botão abre a ajuda direto.
  const aoTocar = () => (somenteFaq ? setPainel(p => (p ? null : 'faq')) : setMenu(v => !v))
  const expandido = somenteFaq ? painel === 'faq' : menu

  const OPCOES = [
    { id: 'faq', emoji: '❓', titulo: 'Ajuda e dúvidas', texto: 'Perguntas frequentes sobre a plataforma' },
    { id: 'feedback', emoji: '💬', titulo: 'Relatar um problema', texto: 'Algo não funcionou? Conte para a gente' },
  ]

  return (
    <>
      {/* os dois painéis, sem botão próprio — quem abre é este componente */}
      <FAQButton tipo={tipo} semBotao abertoExterno={painel === 'faq'} aoFechar={() => setPainel(null)} />
      {!somenteFaq && (
        <FeedbackButton tipo={tipo} semBotao abertoExterno={painel === 'feedback'} aoFechar={() => setPainel(null)} />
      )}

      <div ref={caixa} className="ns-ajuda-flutuante">
        {menu && !somenteFaq && (
          <div
            role="menu"
            style={{
              position: 'absolute', bottom: '58px', right: 0,
              width: 'min(268px, calc(100vw - 32px))',
              background: '#1a1626', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px', overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
            }}
          >
            {OPCOES.map((o, i) => (
              <button
                key={o.id}
                role="menuitem"
                onClick={() => escolher(o.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '11px', width: '100%',
                  padding: '13px 15px', background: 'none', border: 'none',
                  borderTop: i ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  color: 'white', textAlign: 'left', cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                <span style={{ fontSize: '19px', lineHeight: 1.2, flexShrink: 0 }}>{o.emoji}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontWeight: '800', fontSize: '14px' }}>{o.titulo}</span>
                  <span style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.4, marginTop: '2px' }}>{o.texto}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={aoTocar}
          aria-label={somenteFaq ? 'Ajuda' : 'Ajuda e suporte'}
          aria-expanded={expandido}
          title={somenteFaq ? 'Ajuda' : 'Ajuda e suporte'}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            // Um pouco mais calmo que os dois anteriores: o conteúdo é que tem que
            // chamar atenção, não o socorro. Contraste continua alto para o ícone.
            background: 'linear-gradient(135deg, #6d28d9, #5b21b6)',
            border: 'none', color: 'white', fontSize: '20px', fontWeight: '900',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(91,33,182,0.42)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.18s',
          }}
        >
          {expandido && !somenteFaq ? '✕' : '?'}
        </button>
      </div>
    </>
  )
}
