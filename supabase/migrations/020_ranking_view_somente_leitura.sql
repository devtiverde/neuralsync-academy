-- 020 — ranking_view aceitava ESCRITA de qualquer usuário logado
--
-- O QUE ESTAVA ERRADO
-- A view foi criada à mão no SQL Editor com `grant all` implícito. Ela é um
-- `select ... from children` simples, o que no Postgres a torna AUTO-ATUALIZÁVEL
-- (information_schema.views.is_updatable = YES). E ela roda com privilégio do
-- DONO (postgres), porque `reloptions` é null — não tem `security_invoker`.
--
-- Isso é de propósito para o SELECT: o ranking é global e precisa enxergar além
-- do RLS de `children`. O problema é que o mesmo mecanismo valia para escrita, e
-- o papel `authenticated` tinha INSERT, UPDATE, DELETE e TRUNCATE.
--
-- Resultado: qualquer pessoa que criasse uma conta podia, com a chave anon que
-- está no bundle JS:
--   update public.ranking_view set xp = 999999, neural_coins = 999999;
--   delete from public.ranking_view;   -- apaga linhas de `children`
-- ...em crianças de TODAS as famílias, com o RLS inteiramente contornado. O
-- delete é o pior: `children` tem FK em cascata para ns_historico, ns_purchases,
-- sessions, timer_config, screen_schedule e neuralai_sessions.
--
-- Mitigação parcial que já existia: o trigger `trg_clamp_reward` (migration 019)
-- limita o AUMENTO de xp/moedas por UPDATE, então a forja de recompensa era
-- contida. O DELETE e as colunas nivel/faixa_etaria/avatar não eram.
--
-- POR QUE A CORREÇÃO É REVOKE E NÃO security_invoker
-- Ligar `security_invoker` faria a view respeitar o RLS de `children` e o
-- ranking deixaria de ser global — cada criança veria só a si mesma. Isso
-- quebraria a funcionalidade. O que precisa sumir é só a escrita.
--
-- Verificado antes de escrever: o app só faz SELECT na view
-- (src/pages/crianca/Ranking.jsx:39). Nenhum caminho de escrita é usado.

revoke insert, update, delete, truncate, references, trigger
  on public.ranking_view from authenticated;

-- `anon` já não tinha nada (migration 016 revogou). Reforçando para o caso de
-- alguém recriar a view no SQL Editor sem lembrar.
revoke all on public.ranking_view from anon;
grant select on public.ranking_view to authenticated;

-- Conferência: deve sobrar SELECT e nada mais.
--   select grantee, privilege_type
--     from information_schema.role_table_grants
--    where table_name = 'ranking_view' and grantee in ('anon','authenticated');
