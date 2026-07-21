-- Tabela TEMPORÁRIA de diagnóstico do webhook da Kiwify.
--
-- Existe porque o webhook foi configurado no painel e nada chegava, e não há como
-- ler o log da Edge Function pela CLI. Ela grava o que efetivamente bate no
-- endpoint ANTES da autenticação, para separar três hipóteses que se parecem de
-- fora: (1) a requisição nunca chega, (2) chega e é recusada por token, (3) chega,
-- autentica e é ignorada por causa do status.
--
-- ⚠️ REMOVER depois do diagnóstico:  drop table public.webhook_debug;
create table if not exists public.webhook_debug (
  id            bigserial primary key,
  criado_em     timestamptz not null default now(),
  metodo        text,
  query_keys    text,      -- nomes dos parâmetros da URL (ex: "signature")
  header_keys   text,      -- nomes dos cabeçalhos recebidos
  body_keys     text,      -- chaves do primeiro nível do JSON
  status_lido   text,      -- o que o código entendeu como status do pedido
  email_lido    text,
  produto_lido  text,
  autenticou    boolean,
  modo_auth     text,      -- 'signature' | 'body.token' | 'nenhum'
  resposta      text,      -- o que a função devolveu
  body_bruto    text       -- payload cru, para entender o formato real
);

-- Sem policy de RLS de propósito: só o service_role (a própria Edge Function)
-- enxerga. Nunca deve ser legível pelo cliente — o corpo pode conter dado pessoal.
alter table public.webhook_debug enable row level security;
