import { useNavigate } from 'react-router-dom'

/**
 * "E agora?" — o cartão que aparece depois que o responsável salva algo.
 *
 * O QUE ESTAVA ERRADO — 23/09/2026
 * --------------------------------
 * Relato do Cláudio: *"os seis passos iniciais não estão intuitivos… ex: após
 * configurar horários de uso tem que voltar manualmente pro dashboard pra ver o
 * próximo passo"*.
 *
 * O `auditar-orientacao.mjs` mediu a mesma coisa em 24 das 30 telas: a tela salva,
 * escreve "✓ Agenda salva!" e para. Não há saída no conteúdo e não há frase dizendo
 * o que vem depois. Quem está configurando pela primeira vez — e é a primeira hora
 * de quem acabou de pagar — precisa descobrir sozinho que existe um menu, que existe
 * um painel, e que a lista dos seis passos mora noutro lugar.
 *
 * 🔑 A regra que este componente aplica: TODA tela que termina uma tarefa oferece o
 * próximo passo por um botão, não por prosa. Ver [[feedback_painel_tarefas_clicavel]].
 *
 * `visivel` só deve virar true DEPOIS do sucesso: oferecer o próximo passo antes de
 * salvar convidaria a sair sem salvar.
 */
export default function ProximoPasso({ visivel, titulo, texto, rota, rotulo, secundario }) {
  const navigate = useNavigate()
  if (!visivel) return null

  return (
    <div style={{
      marginTop: '16px',
      background: '#f5f3ff',
      border: '1px solid #ddd6fe',
      borderRadius: '16px',
      padding: '18px 20px',
    }}>
      <p style={{ color: '#5b21b6', fontWeight: '800', fontSize: '14px', margin: '0 0 4px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {titulo}
      </p>
      {texto && (
        <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 14px', lineHeight: 1.5, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {texto}
        </p>
      )}
      <button
        onClick={() => navigate(rota)}
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #6d28d9)',
          border: 'none', borderRadius: '12px', padding: '13px 18px',
          color: 'white', cursor: 'pointer', fontWeight: '800', fontSize: '14px',
          width: '100%', fontFamily: 'Plus Jakarta Sans, sans-serif',
          boxShadow: '0 4px 14px rgba(124,58,237,0.25)',
        }}
      >
        {rotulo}
      </button>
      {secundario && (
        <button
          onClick={() => navigate(secundario.rota)}
          style={{
            background: 'none', border: 'none', marginTop: '10px',
            color: '#7C3AED', cursor: 'pointer', fontWeight: '700', fontSize: '13px',
            width: '100%', fontFamily: 'Plus Jakarta Sans, sans-serif',
            textDecoration: 'underline', padding: '6px',
          }}
        >
          {secundario.rotulo}
        </button>
      )}
    </div>
  )
}
