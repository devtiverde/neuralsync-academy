-- ============================================================
-- 015 — Remove a policy duplicada que reabria o reset de cota de IA
-- ============================================================
--
-- A 012 trocou `ai_usage_own` (FOR ALL) por `ai_usage_select_own` (FOR SELECT), pra impedir
-- que o usuário apagasse a própria linha de contagem e zerasse o limite de 30 chamadas/dia
-- da API da Anthropic.
--
-- Só que existe uma SEGUNDA policy na mesma tabela, `uso_proprio`, também FOR ALL, criada
-- numa migration anterior com outro nome. Como policies do Postgres são OR (permissiva por
-- padrão), bastava uma delas permitir — a 012 não teve efeito prático nenhum.
--
-- Confirmado na base real:
--   ai_usage_select_own | SELECT
--   uso_proprio         | ALL      ← esta ainda permitia DELETE
--
-- LIÇÃO: antes de "substituir" uma policy, listar TODAS as policies da tabela
-- (`select policyname, cmd from pg_policies where tablename = ...`). Trocar uma policy pelo
-- nome não garante nada se houver outra permissiva com nome diferente.
-- ============================================================

DROP POLICY IF EXISTS "uso_proprio" ON public.ns_ai_usage;

-- garante o estado final desejado: usuário só LÊ a própria cota.
-- quem escreve é a Edge Function com service_role, que ignora RLS.
DROP POLICY IF EXISTS "ai_usage_select_own" ON public.ns_ai_usage;
CREATE POLICY "ai_usage_select_own" ON public.ns_ai_usage
  FOR SELECT USING (user_id = auth.uid());
