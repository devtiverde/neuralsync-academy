-- ============================================================
-- 014 — Remove `session_user` da detecção de service_role
-- ============================================================
--
-- A 013 checava `current_user OR session_user`. O `session_user` é o papel com que a
-- CONEXÃO foi aberta e não muda com SET LOCAL ROLE — ou seja, ele descreve o pool de
-- conexão, não quem está executando o comando.
--
-- No Supabase o PostgREST abre a conexão como `authenticator` e faz
-- SET LOCAL ROLE {authenticated|anon|service_role} por requisição. Então:
--   - `current_user`  = o papel REAL da requisição  ← é este que importa
--   - `session_user`  = quase sempre `authenticator` (ou `postgres` via CLI/psql)
--
-- Com o OR no session_user, qualquer sessão aberta como postgres passava direto,
-- independente do SET LOCAL ROLE. Confirmado empiricamente: um UPDATE rodando como
-- `authenticated` conseguiu se dar plano premium, porque o session_user era postgres.
--
-- `current_user` sozinho já cobre todos os casos corretamente:
--   navegador (authenticated) → bloqueia | Edge Function (service_role) → libera
--   SQL editor / CLI (postgres)          → libera
-- ============================================================

CREATE OR REPLACE FUNCTION public.eh_service_role()
RETURNS boolean
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  IF current_user IN ('service_role', 'postgres', 'supabase_admin') THEN
    RETURN true;
  END IF;

  RETURN coalesce(
    current_setting('request.jwt.claims', true)::jsonb ->> 'role' = 'service_role',
    false
  );
EXCEPTION WHEN others THEN
  RETURN false;
END;
$$;

-- ============================================================
-- LIÇÃO: current_user = quem executa AGORA (muda com SET ROLE).
--        session_user = quem abriu a conexão (não muda).
-- Controle de acesso por papel deve olhar current_user, nunca session_user.
-- ============================================================
