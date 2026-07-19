// Regras de acesso por assinatura.
//
// Por que este arquivo existe: vários portões de plano checavam só o NOME do
// plano (`plano === 'familia'`) e ignoravam o STATUS, então uma assinatura
// cancelada ou vencida continuava liberando recurso pago. A lógica agora mora
// num lugar só.
//
// ⚠️ Regra de ouro: NUNCA bloquear quem ainda está carregando. `subscription`
// começa como `null` no AuthContext e só é preenchido depois do fetch — tratar
// esse `null` como "sem plano" bloquearia cliente pagante durante o carregamento.
// Use `assinaturaCarregando()` (ou o `subscriptionLoaded` do useAuth) para
// mostrar um estado de carregando ANTES de avaliar `temPlano()`.

export const PLANOS_PAGOS = ['familia', 'premium']

// Carência antes de cortar acesso por data vencida.
//
// `plano_ativo_ate` só é renovado quando o webhook da Kiwify entrega. Se um
// webhook falhar ou atrasar, a data vence e nós cortaríamos o acesso de alguém
// que PAGOU — falha pior que o bug que este arquivo veio corrigir, porque gera
// suporte irritado e chargeback. 3 dias dão margem pra retry e pra intervenção
// manual, sem virar acesso grátis indefinido.
const CARENCIA_MS = 3 * 24 * 60 * 60 * 1000

/**
 * A assinatura está vigente? Checa status e validade, independente do nome do plano.
 * - `plano_status` precisa ser exatamente 'ativo' ('cancelado' e 'pendente' não valem).
 * - `plano_ativo_ate`, quando presente, não pode estar no passado.
 */
export function assinaturaVigente(subscription) {
  if (!subscription) return false
  if (subscription.plano_status !== 'ativo') return false

  if (subscription.plano_ativo_ate) {
    const ate = new Date(subscription.plano_ativo_ate)
    // Data inválida não deve bloquear — o status 'ativo' já foi confirmado acima.
    if (!Number.isNaN(ate.getTime()) && ate.getTime() + CARENCIA_MS < Date.now()) return false
  }

  return true
}

/**
 * O usuário tem um dos planos informados E a assinatura está vigente?
 *
 * @param {object|null} subscription  objeto vindo do useAuth()
 * @param {string|string[]} planos    ex: ['familia','premium'] ou 'premium'
 * @returns {boolean} false enquanto `subscription` for null — por isso SEMPRE
 *   cheque o carregamento antes de usar este retorno para bloquear alguém.
 */
export function temPlano(subscription, planos = PLANOS_PAGOS) {
  if (!subscription) return false
  const lista = Array.isArray(planos) ? planos : [planos]
  if (!lista.includes(subscription.plano)) return false
  return assinaturaVigente(subscription)
}

/**
 * Ainda não dá pra decidir se o usuário tem acesso — mostre "carregando",
 * nunca a tela de bloqueio.
 *
 * @param {boolean} subscriptionLoaded  flag do useAuth()
 * @param {boolean} authLoading         `loading` do useAuth()
 */
export function assinaturaCarregando(subscriptionLoaded, authLoading = false) {
  return Boolean(authLoading) || !subscriptionLoaded
}
