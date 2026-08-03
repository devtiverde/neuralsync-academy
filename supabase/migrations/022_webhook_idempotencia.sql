-- ============================================================
-- 022 — Idempotência do webhook da Kiwify
-- ============================================================
-- O HMAC já garante que a entrega VEIO da Kiwify. Não garante que ela chegou UMA VEZ.
-- Toda plataforma de pagamento reenvia quando não recebe 200 no tempo esperado, e a
-- própria Kiwify tem botão de reenviar no painel. Hoje o reenvio de um `order_approved`
-- roda o mesmo UPDATE de novo — e, pior, o reenvio de um evento ANTIGO depois de um
-- cancelamento reativaria um plano que já foi cortado.
--
-- Também protege da corrida: duas entregas simultâneas do mesmo evento chegariam nas
-- duas instâncias da função ao mesmo tempo. Por isso a marcação é feita ANTES de agir
-- (quem consegue inserir processa; o outro vê o conflito e sai), e não depois.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.webhook_eventos (
  -- a chave é montada na função: `kiwify:<order_id>:<evento>` quando há id de pedido,
  -- ou `kiwify:sha256:<hash do corpo cru>` quando não há. O mesmo pedido gera eventos
  -- diferentes ao longo da vida (boleto gerado → aprovado → cancelado), então a chave
  -- NÃO pode ser só o id do pedido: isso descartaria o cancelamento como "repetido".
  chave      text PRIMARY KEY,
  origem     text NOT NULL DEFAULT 'kiwify',
  evento     text,
  email      text,
  resultado  text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS webhook_eventos_created_idx ON public.webhook_eventos (created_at DESC);

ALTER TABLE public.webhook_eventos ENABLE ROW LEVEL SECURITY;

-- Nenhuma policy, de propósito: com RLS ligada e sem policy, `authenticated` e `anon`
-- não leem nem escrevem nada. Só `service_role` (a função) enxerga. Os grants amplos
-- padrão são revogados porque grant vem ANTES da RLS e policy nenhuma o desfaz —
-- mesma armadilha da `ranking_view` e da `ns_admins`.
REVOKE ALL ON public.webhook_eventos FROM authenticated, anon;

-- ── Manutenção ──────────────────────────────────────────────
-- A tabela cresce uma linha por evento e nunca é lida pelo app. Janela de 90 dias é
-- muito além de qualquer reenvio plausível (a Kiwify tenta por horas, não por meses).
-- Rodar de vez em quando, ou agendar se um dia o pg_cron for ligado:
--   delete from public.webhook_eventos where created_at < now() - interval '90 days';

-- ── Verificação ─────────────────────────────────────────────
--   select chave, evento, resultado, created_at
--     from public.webhook_eventos order by created_at desc limit 20;
--
-- Duplicata chegando aparece como `resultado = 'duplicado'` no log da função, e NÃO
-- como linha nova — a linha original permanece com o resultado do processamento real.
