-- 019_clamp_reward_jump.sql
-- ─────────────────────────────────────────────────────────────────────────────
-- Backstop de integridade contra forja de XP/moedas.
--
-- PROBLEMA: o crédito de recompensa é 100% no cliente. `Encerramento.jsx` calcula
-- `novoXP`/`novasCoins` e grava direto em `children` via RLS (o pai é dono do
-- filho, então o UPDATE é permitido). Como os valores vêm do `state` da
-- navegação, dá para abrir `/encerramento` com `state={{ xp: 99999 }}` e creditar
-- qualquer quantia sem jogar.
--
-- O conserto DEFINITIVO é server-authoritative (uma Edge Function que valida a
-- conclusão da atividade e credita a recompensa). Isso é um projeto à parte —
-- cada atividade precisaria chamar o servidor e o servidor precisaria do catálogo
-- de recompensas. Enquanto isso não existe, este trigger é um BACKSTOP barato:
-- limita o AUMENTO por UPDATE a um teto plausível. Assim o "99999 de uma vez"
-- vira "no máximo uma atividade por gravação", que é invisível para o jogo real
-- (a maior recompensa legítima de uma atividade, já com power-up ×3, fica ~375 XP).
--
-- SEGURANÇA (lições das migrations 012–015):
--   • NÃO é SECURITY DEFINER — assim `current_user` é o papel que REALMENTE
--     executou o UPDATE (com DEFINER viraria o dono da função e a checagem de
--     papel quebraria).
--   • Usa `current_user` (quem executa agora), não `session_user`.
--   • Exime service_role/postgres/supabase_admin: fluxos de servidor e admin
--     (seeder, dashboard) podem ajustar valores livremente. A chave service_role
--     NÃO está no bundle do cliente (só a anon), então isentá-la é seguro.
--   • Só limita AUMENTOS. Gasto na loja faz `neural_coins` CAIR — passa livre.

create or replace function public.clamp_reward_jump()
returns trigger
language plpgsql
as $$
declare
  xp_cap   constant int := 600;  -- ~1.5× a maior recompensa legítima com power-up
  coin_cap constant int := 300;
begin
  -- Servidor e admin não são limitados.
  if current_user in ('service_role', 'postgres', 'supabase_admin') then
    return NEW;
  end if;

  -- XP: limita salto para cima; queda (raro) passa.
  if coalesce(NEW.xp, 0) - coalesce(OLD.xp, 0) > xp_cap then
    NEW.xp := coalesce(OLD.xp, 0) + xp_cap;
  end if;

  -- Moedas: limita ganho; gasto na loja (queda) passa livre.
  if coalesce(NEW.neural_coins, 0) - coalesce(OLD.neural_coins, 0) > coin_cap then
    NEW.neural_coins := coalesce(OLD.neural_coins, 0) + coin_cap;
  end if;

  -- Nível nunca pode passar do que o XP (já limitado) permite: fecha a forja
  -- direta de `nivel`. Fórmula idêntica à do cliente: floor(xp/500)+1.
  if coalesce(NEW.nivel, 1) > floor(coalesce(NEW.xp, 0) / 500.0) + 1 then
    NEW.nivel := floor(coalesce(NEW.xp, 0) / 500.0) + 1;
  end if;

  -- Streak: ganho plausível é +1 por dia. Reset para baixo passa.
  if coalesce(NEW.streak_atual, 0) - coalesce(OLD.streak_atual, 0) > 1 then
    NEW.streak_atual := coalesce(OLD.streak_atual, 0) + 1;
  end if;
  if coalesce(NEW.streak_maximo, 0) > greatest(coalesce(OLD.streak_maximo, 0), coalesce(NEW.streak_atual, 0)) then
    NEW.streak_maximo := greatest(coalesce(OLD.streak_maximo, 0), coalesce(NEW.streak_atual, 0));
  end if;

  return NEW;
end;
$$;

drop trigger if exists trg_clamp_reward on public.children;
create trigger trg_clamp_reward
  before update on public.children
  for each row
  execute function public.clamp_reward_jump();
