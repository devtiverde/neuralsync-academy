-- ============================================================
-- NeuralSync Academy — Schema completo
-- Execute no Supabase: SQL Editor → New query → Run
-- ============================================================

-- 1. USERS (perfil do pai, ligado ao auth.users)
create table if not exists public.users (
  id                    uuid primary key references auth.users(id) on delete cascade,
  email                 text not null,
  nome                  text,
  tipo                  text default 'pai',
  plano                 text,                   -- 'starter' | 'familia' | 'premium'
  plano_status          text,                   -- 'ativo' | 'cancelado' | 'pendente'
  plano_ativo_ate       timestamptz,
  filhos_limite         integer default 1,
  kiwify_subscriber_id  text,
  agenda_config         jsonb,
  created_at            timestamptz default now()
);

alter table public.users enable row level security;
create policy "users_select_own" on public.users for select using (auth.uid() = id);
create policy "users_insert_own" on public.users for insert with check (auth.uid() = id);
create policy "users_update_own" on public.users for update using (auth.uid() = id);

-- 2. PENDING_SUBSCRIPTIONS (preenchida pelo webhook; limpa no cadastro)
create table if not exists public.pending_subscriptions (
  id                    uuid primary key default gen_random_uuid(),
  email                 text not null unique,
  plano                 text not null,
  plano_ativo_ate       timestamptz,
  filhos_limite         integer not null default 1,
  kiwify_subscriber_id  text,
  created_at            timestamptz default now()
);

alter table public.pending_subscriptions enable row level security;
-- Sem políticas públicas — só acessível via service_role key (Edge Function)

-- 3. CHILDREN (filhos cadastrados pelo pai)
create table if not exists public.children (
  id               uuid primary key default gen_random_uuid(),
  parent_id        uuid references auth.users(id) on delete cascade,
  nome             text not null,
  idade            integer,
  faixa_etaria     text default 'construtores',
  nivel            integer default 1,
  xp               integer default 0,
  neural_coins     integer default 0,
  streak_atual     integer default 0,
  streak_maximo    integer default 0,
  avatar           text,
  cor_perfil       text,
  bio              text,
  perfil_cognitivo jsonb,
  created_at       timestamptz default now()
);

alter table public.children enable row level security;
create policy "children_parent_all" on public.children for all using (auth.uid() = parent_id);

-- 4. NS_HISTORICO (atividades concluídas pelas crianças)
create table if not exists public.ns_historico (
  id         uuid primary key default gen_random_uuid(),
  child_id   uuid references public.children(id) on delete cascade,
  parent_id  uuid references auth.users(id) on delete cascade,
  titulo     text,
  xp         integer default 0,
  coins      integer default 0,
  emoji      text,
  tipo       text,
  data       text,
  timestamp  bigint,
  created_at timestamptz default now()
);

alter table public.ns_historico enable row level security;
create policy "historico_parent_all" on public.ns_historico for all using (auth.uid() = parent_id);
