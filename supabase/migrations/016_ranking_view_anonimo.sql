-- ============================================================
-- 016 — ranking_view deixa de expor nome de criança
-- ============================================================
--
-- ESTADO ANTERIOR (verificado na base de produção em 2026-07-19):
--   definição : SELECT id, nome, xp, neural_coins, nivel, faixa_etaria, streak_atual,
--               avatar FROM children;
--   dono      : postgres  (superusuário)
--   reloptions: nenhuma   → security_invoker NÃO estava setado
--
-- Como a view era dona do postgres e sem security_invoker, ela rodava com os privilégios
-- do dono e **ignorava o RLS de `children` por completo**. Confirmado empiricamente: um
-- SELECT como `anon` — o papel da chave publicável, que está PÚBLICA no bundle JS —
-- retornou todas as crianças da plataforma, com nome real e faixa etária.
--
-- Dado pessoal de menor, de terceiros, sem consentimento específico. LGPD Art. 14.
--
-- Esta view nunca esteve em migration nenhuma: foi criada à mão no SQL Editor. Por isso
-- não aparecia em nenhuma auditoria baseada no repositório.
--
-- DECISÃO (do Cláudio, 2026-07-19): manter o ranking GLOBAL entre famílias, porque a
-- competição é o que dá sentido à gamificação, mas torná-lo ANÔNIMO. A criança não
-- precisa saber o nome de ninguém pra competir — precisa de um avatar e um número.
-- O app mostra o nome real apenas da própria criança, que ele já tem localmente.
-- ============================================================

DROP VIEW IF EXISTS public.ranking_view;

CREATE VIEW public.ranking_view AS
  SELECT
    id,
    -- apelido estável e não-identificável, derivado do próprio id.
    -- 3 dígitos (100-999) em vez de hash hexadecimal porque quem lê é criança.
    -- Colisão é possível e inofensiva: é rótulo cosmético, não chave.
    'Explorador #' || (100 + (abs(hashtext(id::text)) % 900))::text AS apelido,
    xp,
    neural_coins,
    nivel,
    faixa_etaria,   -- usado só pra filtrar por faixa; sozinho não identifica ninguém
    streak_atual,
    avatar
  FROM public.children;

-- `nome` foi REMOVIDO de propósito. Não recolocar: era a exposição.

-- A view continua sem security_invoker DE PROPÓSITO — o ranking precisa enxergar além do
-- RLS pra ser global. Isso só é aceitável porque não há mais dado identificável nela.
-- ⚠️ Se algum dia voltar a expor coluna sensível, ou seta security_invoker, ou não expõe.

-- Defesa em profundidade: exige conta. Antes qualquer visitante anônimo lia a view.
REVOKE ALL ON public.ranking_view FROM anon;
GRANT SELECT ON public.ranking_view TO authenticated;
