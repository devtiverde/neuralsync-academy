-- ============================================================
-- 025 — Exclusão de conta que apaga de verdade (LGPD, Art. 18, VI)
-- ============================================================
-- O QUE ACONTECIA
-- O botão "excluir tudo" das Configurações apagava `ns_historico`, `children` e a linha
-- em `users` — e parava aí. A conta continuava viva em `auth.users`: a pessoa conseguia
-- entrar de novo, com o mesmo e-mail e a mesma senha, num produto que dizia ter apagado
-- os dados dela. É plataforma com dado de criança; a exposição aqui é jurídica.
--
-- Três coisas ficavam para trás mesmo depois de apagar as três tabelas:
--   1. `auth.users` — a identidade em si, com e-mail e senha.
--   2. `pending_subscriptions`, que é indexada por E-MAIL e não tem chave estrangeira
--      para o usuário: nenhuma cascata alcança.
--   3. `ns_feedback`, que a 017 desliga com `ON DELETE SET NULL` (correto: o reporte de
--      erro sobrevive anonimizado). Só que o `contexto` passou a guardar o e-mail em
--      31/07 — anonimizar a coluna e deixar o e-mail no JSON ao lado não anonimiza nada.
--
-- E o erro era ignorado: falhando qualquer passo, a tela deslogava e a pessoa ia embora
-- achando que tinha sido apagada.
--
-- POR QUE FUNÇÃO E NÃO O CLIENTE
-- `auth.users` não é acessível pelo papel `authenticated` em hipótese nenhuma — e não
-- deve ser. A função roda como dono e **não aceita parâmetro de usuário**: apaga
-- `auth.uid()` e mais ninguém. Essa assinatura é a própria garantia de que ninguém
-- consegue apagar a conta de outra pessoa, nem por engano nem de propósito.
-- ============================================================

CREATE OR REPLACE FUNCTION public.ns_excluir_minha_conta()
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_email  text;
  v_filhos integer;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'precisa estar autenticado';
  END IF;

  SELECT email INTO v_email FROM auth.users WHERE id = v_uid;
  SELECT count(*) INTO v_filhos FROM public.children WHERE parent_id = v_uid;

  -- 1. Feedback: a linha continua (serve de histórico de suporte), mas some tudo que
  -- identifica. Apagar o `contexto` inteiro é mais seguro do que tentar remover só a
  -- chave do e-mail — amanhã alguém acrescenta outro campo identificável ali e ninguém
  -- lembra de voltar aqui.
  UPDATE public.ns_feedback
     SET contexto = NULL,
         mensagem = '[conta excluída a pedido do titular]'
   WHERE user_id = v_uid;

  -- 2. Assinatura pendente é achada por e-mail, não por id: nenhuma cascata chega nela.
  IF v_email IS NOT NULL THEN
    DELETE FROM public.pending_subscriptions WHERE lower(email) = lower(v_email);
  END IF;

  -- 3. A identidade. Isto dispara em cascata `users`, `children` e, por elas,
  -- `ns_historico`, `ns_purchases`, `ns_liberacoes`, `ns_bonus_resgates`,
  -- `neuralai_sessions`, `neuralai_messages` e `ns_ai_usage` — todas declaradas com
  -- `on delete cascade`. Apagar à mão antes seria repetir o que o banco já faz, com o
  -- risco de esquecer a tabela nova da próxima migration.
  DELETE FROM auth.users WHERE id = v_uid;

  RETURN json_build_object('ok', true, 'filhos_removidos', v_filhos);
END;
$$;

REVOKE ALL ON FUNCTION public.ns_excluir_minha_conta() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.ns_excluir_minha_conta() TO authenticated;

-- ── Verificação ─────────────────────────────────────────────
-- Depois de excluir uma conta de teste, TODAS estas contagens têm que dar zero:
--
--   select count(*) from auth.users              where email = '<e-mail>';
--   select count(*) from public.users            where email = '<e-mail>';
--   select count(*) from pending_subscriptions   where lower(email) = lower('<e-mail>');
--   select count(*) from public.children         where parent_id = '<uid>';
--   select count(*) from public.ns_historico     where parent_id = '<uid>';
--
-- E o feedback tem que estar anonimizado, não sumido:
--   select user_id, mensagem, contexto from public.ns_feedback where mensagem like '%titular%';
--
-- ⚠️ O que esta função NÃO alcança: o que está gravado no navegador da pessoa
-- (`ns_diario`, `ns_historico`, `ns_active_child` e o resto das chaves `ns_*`). Isso é
-- responsabilidade da tela, que limpa antes de deslogar — ver `Settings.jsx`.
