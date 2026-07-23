-- TESTE do trigger 019 — roda em transação e FAZ ROLLBACK no fim.
-- Nada é persistido; serve só para provar que o clamp:
--   (a) deixa a recompensa legítima passar,
--   (b) corta a forja de 99999,
--   (c) deixa o gasto na loja (queda de moedas) passar.
-- Rodar com o arquivo (não inline), ex:
--   npx supabase db query --file supabase/migrations/019_TESTE_rollback.sql
-- ou colar no SQL Editor do dashboard e executar.

begin;

-- cria o trigger dentro da transação (será desfeito no rollback)
create or replace function public.clamp_reward_jump()
returns trigger language plpgsql as $$
declare xp_cap constant int := 600; coin_cap constant int := 300;
begin
  if current_user in ('service_role','postgres','supabase_admin') then return NEW; end if;
  if coalesce(NEW.xp,0) - coalesce(OLD.xp,0) > xp_cap then NEW.xp := coalesce(OLD.xp,0) + xp_cap; end if;
  if coalesce(NEW.neural_coins,0) - coalesce(OLD.neural_coins,0) > coin_cap then NEW.neural_coins := coalesce(OLD.neural_coins,0) + coin_cap; end if;
  if coalesce(NEW.nivel,1) > floor(coalesce(NEW.xp,0)/500.0)+1 then NEW.nivel := floor(coalesce(NEW.xp,0)/500.0)+1; end if;
  if coalesce(NEW.streak_atual,0) - coalesce(OLD.streak_atual,0) > 1 then NEW.streak_atual := coalesce(OLD.streak_atual,0)+1; end if;
  if coalesce(NEW.streak_maximo,0) > greatest(coalesce(OLD.streak_maximo,0),coalesce(NEW.streak_atual,0)) then NEW.streak_maximo := greatest(coalesce(OLD.streak_maximo,0),coalesce(NEW.streak_atual,0)); end if;
  return NEW;
end $$;
drop trigger if exists trg_clamp_reward on public.children;
create trigger trg_clamp_reward before update on public.children for each row execute function public.clamp_reward_jump();

create temp table alvo on commit drop as
  select id, xp, neural_coins, nivel from public.children order by xp desc limit 1;

select 'ANTES' etapa, xp, neural_coins, nivel from public.children where id = (select id from alvo);

set local role authenticated;
update public.children set xp = xp+150, neural_coins = neural_coins+30, nivel = floor((xp+150)/500.0)+1 where id = (select id from alvo);
reset role;
select 'LEGIT +150 (deve passar)' etapa, xp, neural_coins, nivel from public.children where id = (select id from alvo);

set local role authenticated;
update public.children set xp = 99999, neural_coins = 99999, nivel = 200 where id = (select id from alvo);
reset role;
select 'FORJA 99999 (deve virar +600/+300)' etapa, xp, neural_coins, nivel from public.children where id = (select id from alvo);

set local role authenticated;
update public.children set neural_coins = neural_coins-50 where id = (select id from alvo);
reset role;
select 'GASTO -50 (deve cair livre)' etapa, xp, neural_coins, nivel from public.children where id = (select id from alvo);

rollback;
