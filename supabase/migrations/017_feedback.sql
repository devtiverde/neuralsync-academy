-- ============================================================
-- 017 — Canal de feedback / reporte de erro
-- ============================================================
-- Necessário antes de ligar tráfego pago: com anúncio rodando e sem teste de usuário
-- real, o canal de bug é o que evita reembolso silencioso. Cliente que não consegue
-- reclamar pede estorno.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.ns_feedback (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  tipo        text NOT NULL CHECK (tipo IN ('bug', 'sugestao', 'duvida', 'elogio')),
  mensagem    text NOT NULL CHECK (char_length(mensagem) BETWEEN 3 AND 4000),
  contexto    jsonb,        -- rota, user agent, faixa da criança, hash do build
  resolvido   boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ns_feedback_created_idx ON public.ns_feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS ns_feedback_user_idx    ON public.ns_feedback (user_id);

ALTER TABLE public.ns_feedback ENABLE ROW LEVEL SECURITY;

-- O usuário insere o próprio feedback e relê o que mandou (pra ver o histórico).
-- Sem UPDATE e sem DELETE: ninguém apaga o próprio reporte depois de enviado, e
-- `resolvido` é campo de gestão — só service_role mexe.
DROP POLICY IF EXISTS "feedback_insert_own" ON public.ns_feedback;
CREATE POLICY "feedback_insert_own" ON public.ns_feedback
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "feedback_select_own" ON public.ns_feedback;
CREATE POLICY "feedback_select_own" ON public.ns_feedback
  FOR SELECT USING (user_id = auth.uid());

-- ⚠️ Lição da migration 015: policy permissiva com OUTRO NOME na mesma tabela anula a
-- intenção, porque policies são OR. Se for mexer aqui, listar todas antes:
--   select policyname, cmd from pg_policies where tablename = 'ns_feedback';

-- Como LER os feedbacks (não há painel ainda — rodar no SQL Editor):
--   select created_at, tipo, mensagem, contexto->>'rota' as rota
--     from public.ns_feedback where not resolvido order by created_at desc;
