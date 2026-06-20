-- ============================================================
-- 003 — Correções: colunas faltantes + normalização de dados
-- Seguro e re-rodável. Execute no Supabase: SQL Editor → Run
-- ============================================================

-- 1) Colunas que o app grava mas não existiam no schema
alter table public.children add column if not exists avatar           text;
alter table public.children add column if not exists cor_perfil       text;
alter table public.children add column if not exists bio              text;
alter table public.children add column if not exists perfil_cognitivo jsonb;
alter table public.users    add column if not exists agenda_config    jsonb;

-- 2) Normaliza faixas etárias inválidas (ex.: 'explorer' -> 'exploradores')
--    Qualquer valor fora dos 4 oficiais é corrigido pelo prefixo; se não der
--    para deduzir, cai em 'construtores'.
update public.children set faixa_etaria = case
  when lower(faixa_etaria) like 'explor%' then 'exploradores'
  when lower(faixa_etaria) like 'constr%' then 'construtores'
  when lower(faixa_etaria) like 'criad%'  then 'criadores'
  when lower(faixa_etaria) like 'invent%' then 'inventores'
  else 'construtores'
end
where faixa_etaria is null
   or faixa_etaria not in ('exploradores','construtores','criadores','inventores');
