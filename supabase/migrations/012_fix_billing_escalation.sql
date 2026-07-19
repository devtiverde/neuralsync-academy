-- ============================================================
-- 012 — Corrige escalonamento de plano e reset de cota de IA
-- ============================================================
--
-- CONTEXTO (achado da auditoria de 2026-07-19):
--
-- A policy `users_update_own` (011) é `FOR UPDATE USING (auth.uid() = id)`.
-- RLS restringe QUAL LINHA pode ser alterada, mas NÃO quais colunas. Como a
-- tabela `users` guarda o estado de faturamento (plano, plano_status,
-- plano_ativo_ate, filhos_limite, kiwify_subscriber_id), qualquer usuário
-- autenticado podia se conceder Premium direto do navegador:
--
--   supabase.from('users').update({ plano:'premium', plano_status:'ativo',
--     plano_ativo_ate:'2099-01-01', filhos_limite:999 }).eq('id', meuId)
--
-- Isso não derrubava só o paywall do front — as Edge Functions `ai-proxy` e
-- `neuralai-chat` validam o plano lendo ESTA MESMA LINHA, então o exploit também
-- liberava consumo ilimitado da API da Anthropic por conta do operador.
--
-- Mesma classe de problema em `ns_ai_usage`: a policy era `FOR ALL`, o que inclui
-- DELETE — o usuário apagava a própria linha e zerava o limite de 30 chamadas/dia.
--
-- ESTRATÉGIA: trigger BEFORE UPDATE que preserva as colunas de billing quando
-- quem escreve não é o service_role. Preferido a GRANT de coluna porque o
-- PostgREST devolve erro melhor e porque não quebra o UPDATE inteiro — só ignora
-- a tentativa de alterar campo protegido.
-- ============================================================

-- ── 0. Detector de service_role ──────────────────────────────
-- Dois sinais independentes. O supabase-js com a service_role key fala com o PostgREST,
-- que faz `SET LOCAL role = service_role` (pega em current_user) E popula
-- request.jwt.claims (pega no segundo teste). Qualquer um dos dois basta.

CREATE OR REPLACE FUNCTION public.eh_service_role()
RETURNS boolean
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  IF current_user = 'service_role' OR session_user = 'service_role' THEN
    RETURN true;
  END IF;

  -- o claim pode não existir (conexão direta, psql, cron) — `true` no 2º arg evita erro
  RETURN coalesce(
    current_setting('request.jwt.claims', true)::jsonb ->> 'role' = 'service_role',
    false
  );
EXCEPTION WHEN others THEN
  -- claims malformado não pode derrubar um UPDATE legítimo
  RETURN false;
END;
$$;

-- ── 1. Blindar as colunas de faturamento de `users` ──────────

CREATE OR REPLACE FUNCTION public.protege_billing_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- service_role (Edge Functions: kiwify-webhook, activate-pending-plan) passa direto.
  -- Checa DOIS sinais de propósito: se este trigger errar e barrar o service_role, o
  -- webhook da Kiwify para de ativar plano de quem pagou — falha pior que o próprio bug.
  -- `current_user` cobre o SET LOCAL role do PostgREST; o claim do JWT cobre o resto.
  IF public.eh_service_role() THEN
    RETURN NEW;
  END IF;

  -- qualquer outro papel: as colunas de billing são forçadas de volta ao valor atual
  NEW.plano                := OLD.plano;
  NEW.plano_status         := OLD.plano_status;
  NEW.plano_ativo_ate      := OLD.plano_ativo_ate;
  NEW.filhos_limite        := OLD.filhos_limite;
  NEW.kiwify_subscriber_id := OLD.kiwify_subscriber_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protege_billing_users ON public.users;
CREATE TRIGGER trg_protege_billing_users
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.protege_billing_users();

-- ── 2. Mesma proteção no INSERT ──────────────────────────────
-- `AuthContext.signUp` insere a própria linha em `users` client-side, então dava
-- pra já nascer com plano: 'premium'. Conta nova sempre começa sem plano.

CREATE OR REPLACE FUNCTION public.forca_billing_padrao_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
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

DROP TRIGGER IF EXISTS trg_forca_billing_padrao_users ON public.users;
CREATE TRIGGER trg_forca_billing_padrao_users
  BEFORE INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.forca_billing_padrao_users();

-- ── 3. Impedir reset da cota de IA ───────────────────────────
-- Antes: FOR ALL (inclui DELETE/UPDATE) — usuário zerava o próprio contador.
-- Agora: só SELECT. Quem escreve é a Edge Function com service_role, que
-- ignora RLS.

DROP POLICY IF EXISTS "ai_usage_own" ON public.ns_ai_usage;

CREATE POLICY "ai_usage_select_own" ON public.ns_ai_usage
  FOR SELECT USING (user_id = auth.uid());

-- ============================================================
-- COMO VALIDAR (rodar logado como usuário comum, não service_role):
--
--   update users set plano='premium' where id = auth.uid();
--   select plano from users where id = auth.uid();   -- deve continuar o anterior
--
--   delete from ns_ai_usage where user_id = auth.uid();  -- deve afetar 0 linhas
--
-- ⚠️ AINDA PENDENTE, não coberto por esta migration:
--   - `ranking_view`: view criada à mão, fora das migrations. Verificar
--     `security_invoker` — se não estiver true, ela contorna o RLS de `children`
--     e expõe nome/faixa etária de crianças de OUTRAS famílias (LGPD Art. 14).
--   - `historias_jogadas`: tabela criada à mão, estado de RLS desconhecido.
--   - XP/moedas continuam client-authoritative (`children` aceita qualquer valor).
-- ============================================================
