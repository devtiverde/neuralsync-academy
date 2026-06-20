-- Tabela de categorias educativas (Kids)
create table if not exists public.ns_kids (
  id          text primary key,
  titulo      text not null,
  emoji       text,
  cor         text default '#7C3AED',
  introducao  text,
  secoes      jsonb default '[]'::jsonb,
  fatos       jsonb default '[]'::jsonb,
  quiz        jsonb default '[]'::jsonb,
  ordem       int  default 0,
  ativo       boolean default true,
  created_at  timestamptz default now()
);

-- Tabela de atividades (Trilha — Fases 1, 2 e 3)
create table if not exists public.ns_atividades (
  id              text primary key,
  tipo            text not null,
  titulo          text not null,
  descricao       text,
  emoji           text,
  habilidade      text,
  xp_reward       int  default 0,
  coins_reward    int  default 0,
  tempo_estimado  int  default 0,
  faixa_etaria    text not null,
  fase            int  not null default 1,
  historinha      text,
  dados           jsonb default '{}'::jsonb,
  ordem           int  default 0,
  ativo           boolean default true,
  created_at      timestamptz default now()
);

-- RLS
alter table public.ns_kids       enable row level security;
alter table public.ns_atividades enable row level security;

-- Leitura pública (qualquer pessoa autenticada ou não pode ler)
do $$ begin
  drop policy if exists "Leitura pública kids"       on public.ns_kids;
  drop policy if exists "Leitura pública atividades" on public.ns_atividades;
exception when others then null; end $$;

create policy "Leitura pública kids" on public.ns_kids
  for select using (true);

create policy "Leitura pública atividades" on public.ns_atividades
  for select using (true);
