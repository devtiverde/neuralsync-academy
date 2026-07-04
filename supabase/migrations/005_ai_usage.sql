-- Tabela de rate limiting para atividades com IA
create table if not exists public.ns_ai_usage (
  user_id   uuid references auth.users(id) on delete cascade,
  date      date not null,
  calls     int  not null default 0,
  primary key (user_id, date)
);

alter table public.ns_ai_usage enable row level security;

drop policy if exists "ai_usage_own" on ns_ai_usage;
create policy "ai_usage_own" on ns_ai_usage
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
