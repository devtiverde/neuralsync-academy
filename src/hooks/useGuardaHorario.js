import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { dentroDoHorario, sincronizarLiberacao } from '../lib/horarioAcesso'

/**
 * A trava de horário, valendo em TODA tela da criança.
 *
 * O QUE ESTAVA ERRADO — medido em 23/09/2026
 * ------------------------------------------
 * O Cláudio pediu para conferir se "o relógio realmente trava". Não travava.
 * A verificação existia em UM lugar só do app inteiro:
 *
 *     src/pages/crianca/HomeCrianca.jsx:92
 *       if (!dentroDoHorario(agendaConfig, childId)) { navigate('/bloqueio'); return }
 *
 * Ou seja, só quem passava pela `/home-crianca` era barrado, e só no instante em que
 * a tela montava. Na prática:
 *   · a criança já dentro do app continuava jogando indefinidamente — a janela fechava
 *     e nada acontecia, porque nada voltava a perguntar;
 *   · o menu de baixo leva direto a Trilha, Kids TV, Loja e Digitação sem passar pela
 *     home, e nenhuma delas perguntava;
 *   · uma atividade aberta (`/atividade/:tipo`) nunca perguntava.
 * O pai configurava a agenda, via a tela dizer que estava configurada, e a regra não
 * existia fora de uma tela. 🔑 Manifesto é promessa, não medida.
 *
 * O QUE ESTE HOOK FAZ
 * Pergunta ao montar QUALQUER tela da criança e a cada minuto enquanto ela estiver
 * aberta, mais uma vez sempre que o aparelho volta do bloqueio de tela (`visibilitychange`
 * — o caso comum é a criança deixar o tablet de lado e voltar depois da hora).
 *
 * 🪤 A liberação do responsável é sincronizada com o banco ANTES de decidir. Sem isso,
 * o cache local vencido barraria quem acabou de ser liberado noutro aparelho — e o
 * cache adulterado liberaria quem não foi. Ver `src/lib/horarioAcesso.js`.
 *
 * ⚠️ Continua sendo trava de CONVENIÊNCIA, do lado do navegador: quem mexe no console
 * entra do mesmo jeito. Isso está escrito em `horarioAcesso.js` e não mudou aqui — o
 * que mudou é que agora a regra vale nas 20 telas, e não em 1.
 */

// Telas onde a guarda não deve agir: a de bloqueio é o próprio destino (mandar para
// ela de novo daria um laço), e as do responsável não são da criança.
const ISENTAS = ['/bloqueio', '/auth', '/planos', '/dashboard', '/timer', '/agenda',
  '/relatorio', '/notificacoes', '/configuracoes', '/perfil-filho', '/trilha-pai',
  '/primeiros-passos', '/feedbacks', '/relatorio-ia', '/recuperar-senha']

const INTERVALO_MS = 60_000

export default function useGuardaHorario() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (ISENTAS.some(r => pathname === r || pathname.startsWith(r + '/'))) return

    let vivo = true

    // 🪤 A 1ª versão tinha um `ocupado` de módulo para não empilhar chamadas. Ele
    // ENGOLIU a guarda inteira: no duplo-monte do StrictMode, a 1ª execução marcava
    // `ocupado` e era abandonada (`vivo = false`), e a 2ª — a viva — batia na marca da
    // 1ª e desistia. Resultado: a trava nunca decidia, sem erro nenhum. Medido com
    // `dbg-guarda.mjs`: a linha "dentro=" nunca era impressa.
    // A guarda não precisava existir: são leituras idempotentes, uma por minuto.
    async function conferir() {
      if (!vivo) return
      {
        const agenda = (() => {
          try { return JSON.parse(localStorage.getItem('ns_agenda_config') || 'null') } catch { return null }
        })()
        // Sem agenda configurada o acesso é livre — é o padrão de quem nunca abriu a
        // tela de Agenda. Barrar aqui quebraria o produto para a maioria.
        if (!agenda || !Array.isArray(agenda)) return

        const filho = (() => {
          try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null }
        })()

        // 🪤 A sincronização vai à rede, e rede falha. Na 1ª versão deste hook ela
        // ficava DENTRO do mesmo `try` da decisão: quando ela levantava, a decisão
        // nunca era tomada e a guarda ficava muda — exatamente a doença que este
        // mesmo dia consertou nas Atividades Offline. Agora a falha da sincronização
        // é abafada AQUI, e a decisão acontece de todo jeito com o cache que houver.
        try { await sincronizarLiberacao(filho?.id) } catch { /* decide com o cache */ }

        if (!vivo) return
        if (!dentroDoHorario(agenda, filho?.id)) navigate('/bloqueio', { replace: true })
      }
    }

    conferir()
    const t = setInterval(conferir, INTERVALO_MS)
    const aoVoltar = () => { if (document.visibilityState === 'visible') conferir() }
    document.addEventListener('visibilitychange', aoVoltar)

    return () => {
      vivo = false
      clearInterval(t)
      document.removeEventListener('visibilitychange', aoVoltar)
    }
  }, [pathname, navigate])
}
