-- ============================================================
-- 021 — Administradores + leitura dos feedbacks no painel
-- ============================================================
-- A migration 017 deixou `ns_feedback` com leitura restrita ao próprio autor. Isso é
-- correto para o cliente, mas significa que NEM O DONO DO PRODUTO enxerga os reportes:
-- a única forma de ler era rodar SELECT no SQL Editor (está escrito no rodapé da 017).
-- Com anúncio no ar isso não se sustenta — o reporte de erro precisa de uma tela.
--
-- Escolha de arquitetura: tabela de administradores + política amarrada a ela, em vez de
-- uma Edge Function com `service_role`. Motivo: a chave de serviço ignora RLS inteira; se
-- vazar de uma função, expõe o banco todo. Aqui o pior caso é ler feedback.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. Quem é administrador
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ns_admins (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nota       text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ns_admins ENABLE ROW LEVEL SECURITY;

-- 🔴 O PONTO CRÍTICO DESTA MIGRATION.
-- Se `authenticated` puder escrever aqui, qualquer cliente se cadastra como admin com um
-- INSERT pelo console do navegador e passa a ler o feedback de todas as famílias. A tabela
-- é somente leitura para o app: só `service_role` e `postgres` (o SQL Editor) escrevem.
-- REVOKE explícito porque o grant padrão do Supabase para `authenticated` inclui escrita —
-- não adianta só "não criar policy", o grant vem de antes. Mesma lição da `ranking_view`.
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.ns_admins FROM authenticated, anon;

-- Cada um só descobre se ELE é admin. Sem isso a tela não tem como decidir o que mostrar,
-- e devolver a lista inteira de administradores para qualquer logado é vazamento à toa.
DROP POLICY IF EXISTS "admins_le_a_si_mesmo" ON public.ns_admins;
CREATE POLICY "admins_le_a_si_mesmo" ON public.ns_admins
  FOR SELECT USING (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────────
-- 2. Administrador enxerga todos os feedbacks
-- ─────────────────────────────────────────────────────────────
-- ⚠️ Políticas são combinadas com OU. Esta CONVIVE com a `feedback_select_own` da 017:
-- o cliente continua vendo o que mandou, o admin vê tudo. É o efeito desejado — mas
-- justamente por ser OU, conferir a lista completa antes de mexer aqui de novo:
--   select policyname, cmd, qual from pg_policies where tablename = 'ns_feedback';
DROP POLICY IF EXISTS "feedback_select_admin" ON public.ns_feedback;
CREATE POLICY "feedback_select_admin" ON public.ns_feedback
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.ns_admins a WHERE a.user_id = auth.uid())
  );

-- ─────────────────────────────────────────────────────────────
-- 3. Marcar como resolvido — e SÓ isso
-- ─────────────────────────────────────────────────────────────
-- A 017 não previa UPDATE nenhum, de propósito: ninguém reescreve um reporte depois de
-- enviado. A tela precisa de um botão "resolvido", então a permissão é aberta na COLUNA,
-- não na tabela. Sem o REVOKE primeiro isto não teria efeito: privilégio de tabela e de
-- coluna se somam, e o grant amplo de `authenticated` já cobriria `mensagem` também.
REVOKE UPDATE ON public.ns_feedback FROM authenticated, anon;
GRANT  UPDATE (resolvido) ON public.ns_feedback TO authenticated;

DROP POLICY IF EXISTS "feedback_update_admin" ON public.ns_feedback;
CREATE POLICY "feedback_update_admin" ON public.ns_feedback
  FOR UPDATE
  USING      (EXISTS (SELECT 1 FROM public.ns_admins a WHERE a.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.ns_admins a WHERE a.user_id = auth.uid()));

-- ─────────────────────────────────────────────────────────────
-- 4. Cadastrar o administrador  ← FAZER À MÃO, UMA VEZ
-- ─────────────────────────────────────────────────────────────
-- Sem esta linha a tela /feedbacks abre vazia dizendo que você não tem acesso — o que é o
-- comportamento certo, mas parece bug. Rodar depois de aplicar o resto:
--
--   insert into public.ns_admins (user_id, nota)
--   select id, 'Cláudio — dono do produto' from auth.users
--    where email = 'tiverdetec@gmail.com'
--   on conflict (user_id) do nothing;
--
-- ⚠️ Usar o e-mail com que você ENTRA no app, que pode não ser o mesmo do suporte.
-- Conferir depois:  select * from public.ns_admins;

-- ─────────────────────────────────────────────────────────────
-- 5. Verificação
-- ─────────────────────────────────────────────────────────────
-- Confirma que sobrou só o que deveria (esperado: authenticated com SELECT e com
-- UPDATE apenas na coluna `resolvido`; nada de INSERT/UPDATE/DELETE em ns_admins):
--
--   select grantee, privilege_type, table_name
--     from information_schema.role_table_grants
--    where table_name in ('ns_feedback','ns_admins') and grantee = 'authenticated';
--
--   select grantee, privilege_type, column_name
--     from information_schema.column_privileges
--    where table_name = 'ns_feedback' and grantee = 'authenticated';
