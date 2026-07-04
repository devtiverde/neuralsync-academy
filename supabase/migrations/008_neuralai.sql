-- ============================================================
-- NeuralSync Academy — NeuralAI Module
-- Tabelas: neuralai_sessions, neuralai_messages
-- Config pai: coluna neuralai_config em users
-- ============================================================

-- 1. NEURALAI_SESSIONS (uma por conversa)
create table if not exists public.neuralai_sessions (
  id               uuid primary key default gen_random_uuid(),
  child_id         uuid not null references public.children(id) on delete cascade,
  parent_id        uuid not null references auth.users(id) on delete cascade,
  started_at       timestamptz not null default now(),
  ended_at         timestamptz,
  duration_minutes int,
  themes           text[],
  highlight        text,
  challenge        text,
  engagement       text check (engagement in ('alto', 'medio', 'baixo')),
  message_count    int not null default 0,
  created_at       timestamptz not null default now()
);

alter table public.neuralai_sessions enable row level security;

create policy "neuralai_sessions_parent_all"
  on public.neuralai_sessions
  for all
  using (auth.uid() = parent_id);

-- Índices para queries de cooldown e limite semanal (Edge Function)
create index if not exists idx_neuralai_sessions_child_started
  on public.neuralai_sessions (child_id, started_at desc);

create index if not exists idx_neuralai_sessions_parent
  on public.neuralai_sessions (parent_id);

-- 2. NEURALAI_MESSAGES (histórico de cada sessão)
create table if not exists public.neuralai_messages (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.neuralai_sessions(id) on delete cascade,
  role       text not null check (role in ('user', 'assistant')),
  content    text not null,
  created_at timestamptz not null default now()
);

alter table public.neuralai_messages enable row level security;

-- Acesso via join com sessions para herdar parent_id
create policy "neuralai_messages_parent_all"
  on public.neuralai_messages
  for all
  using (
    exists (
      select 1
      from public.neuralai_sessions s
      where s.id = neuralai_messages.session_id
        and s.parent_id = auth.uid()
    )
  );

create index if not exists idx_neuralai_messages_session
  on public.neuralai_messages (session_id, created_at asc);

-- 3. CONFIG DO PAI — coluna JSONB em users (mesmo padrão de agenda_config)
-- Valores padrão: 30 min, 3 sessões/semana, notificação ativa
alter table public.users
  add column if not exists neuralai_config jsonb
    default '{"duracao": 30, "max_sessoes_semana": 3, "notificacao_fim": true}'::jsonb;
