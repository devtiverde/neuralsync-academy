-- ============================================================
-- NeuralSync Academy — Migration 011: Auditoria e reforço de RLS
-- Idempotente: pode ser rodado várias vezes sem efeito colateral.
-- Garante que todas as tabelas têm RLS ativo e policies corretas.
-- Rodar em: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- ============================================================
-- 1. USERS
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;

CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- 2. PENDING_SUBSCRIPTIONS (só service_role — sem policies públicas)
-- ============================================================
ALTER TABLE public.pending_subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 3. CHILDREN
-- ============================================================
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "children_parent_all" ON public.children;

CREATE POLICY "children_parent_all" ON public.children
  FOR ALL USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

-- ============================================================
-- 4. NS_HISTORICO
-- ============================================================
ALTER TABLE public.ns_historico ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "historico_parent_all" ON public.ns_historico;

CREATE POLICY "historico_parent_all" ON public.ns_historico
  FOR ALL USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

-- ============================================================
-- 5. NS_KIDS (leitura pública — conteúdo educativo)
-- ============================================================
ALTER TABLE public.ns_kids ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Leitura pública kids" ON public.ns_kids;

CREATE POLICY "Leitura pública kids" ON public.ns_kids
  FOR SELECT USING (true);

-- ============================================================
-- 6. NS_ATIVIDADES (leitura pública — conteúdo educativo)
-- ============================================================
ALTER TABLE public.ns_atividades ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Leitura pública atividades" ON public.ns_atividades;

CREATE POLICY "Leitura pública atividades" ON public.ns_atividades
  FOR SELECT USING (true);

-- ============================================================
-- 7. NS_AI_USAGE (rate limiting — acesso apenas ao próprio registro)
-- ============================================================
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'ns_ai_usage'
  ) THEN
    ALTER TABLE public.ns_ai_usage ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "ai_usage_own" ON public.ns_ai_usage;
    EXECUTE $p$
      CREATE POLICY "ai_usage_own" ON public.ns_ai_usage
        FOR ALL
        USING (user_id = auth.uid())
        WITH CHECK (user_id = auth.uid())
    $p$;
  END IF;
END $$;

-- ============================================================
-- 8. NEURALAI_SESSIONS
-- ============================================================
ALTER TABLE public.neuralai_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "neuralai_sessions_parent_all" ON public.neuralai_sessions;

CREATE POLICY "neuralai_sessions_parent_all" ON public.neuralai_sessions
  FOR ALL
  USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

-- ============================================================
-- 9. NEURALAI_MESSAGES (acesso via join com sessions)
-- ============================================================
ALTER TABLE public.neuralai_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "neuralai_messages_parent_all" ON public.neuralai_messages;

CREATE POLICY "neuralai_messages_parent_all" ON public.neuralai_messages
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.neuralai_sessions s
      WHERE s.id = neuralai_messages.session_id
        AND s.parent_id = auth.uid()
    )
  );

-- ============================================================
-- 10. NS_PURCHASES
-- ============================================================
ALTER TABLE public.ns_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "parents_read_purchases"   ON public.ns_purchases;
DROP POLICY IF EXISTS "parents_insert_purchases" ON public.ns_purchases;

CREATE POLICY "parents_read_purchases" ON public.ns_purchases
  FOR SELECT USING (
    child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

CREATE POLICY "parents_insert_purchases" ON public.ns_purchases
  FOR INSERT WITH CHECK (
    child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

-- ============================================================
-- VERIFICAÇÃO — rode após o script para confirmar
-- ============================================================
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY tablename;
--
-- SELECT schemaname, tablename, policyname, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
