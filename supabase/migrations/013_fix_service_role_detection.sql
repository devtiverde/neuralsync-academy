-- ============================================================
-- 013 — Corrige a detecção de service_role da migration 012
-- ============================================================
--
-- BUG INTRODUZIDO PELA 012: as funções de trigger foram declaradas SECURITY DEFINER.
-- Dentro de uma função SECURITY DEFINER, `current_user` passa a ser o DONO da função
-- (postgres), não o papel que executou o comando. Resultado: `eh_service_role()` nunca
-- reconhecia o service_role, e o trigger bloqueava TAMBÉM as escritas legítimas do
-- webhook da Kiwify e do activate-pending-plan — ou seja, quem pagasse não teria o
-- plano ativado.
--
-- Confirmado empiricamente: um UPDATE como service_role manteve o valor antigo em vez
-- de aplicar o novo.
--
-- CORREÇÃO: as funções não precisam de SECURITY DEFINER — elas só leem o papel atual e
-- reescrevem campos de NEW, sem tocar em tabela nenhuma. Sem SECURITY DEFINER,
-- `current_user` reflete o papel real (o PostgREST faz SET LOCAL ROLE service_role) e a
-- detecção volta a funcionar nos dois caminhos: via PostgREST e via conexão direta.
-- ============================================================

-- ── Detector: agora INVOKER (padrão), não DEFINER ────────────

CREATE OR REPLACE FUNCTION public.eh_service_role()
RETURNS boolean
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  -- current_user: o PostgREST faz SET LOCAL ROLE service_role ao usar a service key.
  -- postgres/supabase_admin entram aqui de propósito: são operações administrativas
  -- legítimas (SQL editor do dashboard, suporte manual) e não devem ficar travadas.
  IF current_user IN ('service_role', 'postgres', 'supabase_admin')
     OR session_user IN ('service_role', 'postgres', 'supabase_admin') THEN
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

-- ── Triggers: recriados sem SECURITY DEFINER ─────────────────

CREATE OR REPLACE FUNCTION public.protege_billing_users()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF public.eh_service_role() THEN
    RETURN NEW;
  END IF;

  NEW.plano                := OLD.plano;
  NEW.plano_status         := OLD.plano_status;
  NEW.plano_ativo_ate      := OLD.plano_ativo_ate;
  NEW.filhos_limite        := OLD.filhos_limite;
  NEW.kiwify_subscriber_id := OLD.kiwify_subscriber_id;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.forca_billing_padrao_users()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF public.eh_service_role() THEN
    RETURN NEW;
  END IF;

  NEW.plano                := NULL;
  NEW.plano_status         := NULL;
  NEW.plano_ativo_ate      := NULL;
  NEW.filhos_limite        := 1;
  NEW.kiwify_subscriber_id := NULL;

  RETURN NEW;
END;
$$;

-- ============================================================
-- LIÇÃO: SECURITY DEFINER troca o current_user pelo dono da função. Nunca usar
-- SECURITY DEFINER numa função cuja lógica DEPENDE de saber quem é o chamador.
-- ============================================================
