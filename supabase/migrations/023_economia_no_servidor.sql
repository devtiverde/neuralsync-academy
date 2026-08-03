-- ============================================================
-- 023 — A economia passa a ser decidida pelo servidor
-- ============================================================
-- O PROBLEMA
-- Até aqui o navegador mandava o TOTAL de XP e de moedas, não o ganho. `update children
-- set xp = <número que eu quiser>` era uma linha no console, com a chave anon que está
-- publicada no bundle. O trigger `trg_clamp_reward` (019) limitava o salto a +600 por
-- gravação, mas limitar a velocidade da fraude não é impedir a fraude: bastava repetir.
--
-- E não era um caminho, eram SEIS: Encerramento, os dois bônus da Trilha, o débito da
-- Loja, as Atividades Offline e o Kids TV. Fechar um e deixar os outros não fecharia
-- nada — quem quisesse forjar XP passaria a usar o caminho da Loja.
--
-- POR QUE FUNÇÃO NO BANCO E NÃO EDGE FUNCTION
-- Os valores a validar (quanto cada atividade paga, quanto cada item custa) são dados,
-- e dado no banco fica ao lado de quem valida. Também não há partida a frio: esta função
-- roda enquanto a criança olha a tela de comemoração.
--
-- O QUE REALMENTE FECHA É O `REVOKE` NO FIM DO ARQUIVO. Sem ele estas funções seriam
-- apenas uma opção mais educada de fazer a mesma coisa.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. Os números, que agora moram no servidor
-- ─────────────────────────────────────────────────────────────
-- Preenchidas pela migration 024, que é GERADA a partir dos mesmos arquivos que a tela
-- usa (`npm run gerar-economia`). Redigitar à mão daria divergência na primeira
-- atividade nova: a criança concluiria algo que o servidor não conhece.

CREATE TABLE IF NOT EXISTS public.ns_recompensas (
  atividade_id text PRIMARY KEY,
  tipo         text,
  xp           integer NOT NULL DEFAULT 0 CHECK (xp    BETWEEN 0 AND 1000),
  coins        integer NOT NULL DEFAULT 0 CHECK (coins BETWEEN 0 AND 1000)
);

CREATE TABLE IF NOT EXISTS public.ns_loja_precos (
  item_id   text PRIMARY KEY,
  preco     integer NOT NULL DEFAULT 0 CHECK (preco >= 0),
  nivel_min integer NOT NULL DEFAULT 0
);

-- Bônus de resgate único (missão do dia, desafio da semana). Antes o controle era uma
-- chave no localStorage: apagar `ns_desafio_<filho>_<semana>` liberava os 500 XP de novo,
-- quantas vezes quisesse. Aqui o próprio formato da chave primária impede a repetição.
CREATE TABLE IF NOT EXISTS public.ns_bonus_resgates (
  child_id   uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  tipo       text NOT NULL,
  periodo    text NOT NULL,   -- '2026-08-02' para diário, '2026-W31' para semanal
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (child_id, tipo, periodo)
);

-- Liberação de tempo extra concedida pelo responsável. Vivia no localStorage e o console
-- adulterava — a criança dava a si mesma o resto da tarde.
CREATE TABLE IF NOT EXISTS public.ns_liberacoes (
  child_id   uuid PRIMARY KEY REFERENCES public.children(id) ON DELETE CASCADE,
  ate        timestamptz NOT NULL,
  minutos    integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ns_recompensas    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ns_loja_precos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ns_bonus_resgates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ns_liberacoes     ENABLE ROW LEVEL SECURITY;

-- Grant vem ANTES da RLS: não criar policy não nega nada. Revogar é o que nega.
REVOKE ALL ON public.ns_recompensas, public.ns_loja_precos,
              public.ns_bonus_resgates, public.ns_liberacoes
  FROM authenticated, anon;

-- Tabelas de preço/recompensa são públicas para LEITURA de propósito: a tela precisa
-- mostrar o preço. Segredo aqui não protegeria nada — o valor já aparece na Loja.
GRANT SELECT ON public.ns_recompensas, public.ns_loja_precos TO authenticated;

DROP POLICY IF EXISTS "recompensas_leitura" ON public.ns_recompensas;
CREATE POLICY "recompensas_leitura" ON public.ns_recompensas FOR SELECT USING (true);

DROP POLICY IF EXISTS "precos_leitura" ON public.ns_loja_precos;
CREATE POLICY "precos_leitura" ON public.ns_loja_precos FOR SELECT USING (true);

-- A tela de bloqueio precisa saber se há liberação valendo.
GRANT SELECT ON public.ns_liberacoes TO authenticated;
DROP POLICY IF EXISTS "liberacoes_do_filho" ON public.ns_liberacoes;
CREATE POLICY "liberacoes_do_filho" ON public.ns_liberacoes FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.parent_id = auth.uid())
);

-- ─────────────────────────────────────────────────────────────
-- 2. Utilitários
-- ─────────────────────────────────────────────────────────────

-- Todo limite por dia e todo cálculo de sequência usa o dia BRASILEIRO. Com o horário
-- do servidor em UTC, a criança que joga às 21h vira o dia às 21h e ganharia um dia de
-- sequência de graça toda noite.
CREATE OR REPLACE FUNCTION public.ns_hoje_br() RETURNS date
LANGUAGE sql STABLE AS $$
  SELECT (now() AT TIME ZONE 'America/Sao_Paulo')::date;
$$;

CREATE OR REPLACE FUNCTION public.ns_meu_filho(p_child uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.children c
     WHERE c.id = p_child AND c.parent_id = auth.uid()
  );
$$;

-- ─────────────────────────────────────────────────────────────
-- 3. Creditar uma atividade concluída
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.ns_creditar_atividade(
  p_child      uuid,
  p_atividade  text,
  p_titulo     text    DEFAULT NULL,
  p_emoji      text    DEFAULT '⭐',
  p_assistiu   boolean DEFAULT false,
  p_mult_xp    numeric DEFAULT 1,
  p_mult_coins numeric DEFAULT 1
) RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_rec       public.ns_recompensas%ROWTYPE;
  v_child     public.children%ROWTYPE;
  v_xp        integer;
  v_coins     integer;
  v_ultimo    date;
  v_streak    integer;
  v_nivel     integer;
  v_hoje      date := public.ns_hoje_br();
  v_no_dia    integer;
BEGIN
  IF NOT public.ns_meu_filho(p_child) THEN
    RAISE EXCEPTION 'sem permissao para este filho';
  END IF;

  SELECT * INTO v_rec FROM public.ns_recompensas WHERE atividade_id = p_atividade;
  IF NOT FOUND THEN
    -- Falha FECHADA aqui, ao contrário da idempotência do webhook: creditar um valor
    -- inventado por não conhecer a atividade seria exatamente o buraco que esta
    -- migration fecha. O sintoma (atividade nova não paga) aparece no teste e o
    -- conserto é rodar `npm run gerar-economia`.
    RAISE EXCEPTION 'atividade desconhecida: %', p_atividade;
  END IF;

  SELECT * INTO v_child FROM public.children WHERE id = p_child FOR UPDATE;

  -- Teto diário. Não é para punir quem joga muito: 40 atividades num dia já está muito
  -- acima de qualquer uso real (o timer da própria plataforma não deixa passar disso),
  -- então o que passa daqui é script, não criança.
  SELECT count(*) INTO v_no_dia
    FROM public.ns_historico
   WHERE child_id = p_child
     AND (created_at AT TIME ZONE 'America/Sao_Paulo')::date = v_hoje;

  IF v_no_dia >= 40 THEN
    RETURN json_build_object(
      'ok', false, 'motivo', 'limite_diario',
      'xp', v_child.xp, 'coins', v_child.neural_coins,
      'nivel', v_child.nivel, 'streak', v_child.streak_atual);
  END IF;

  -- Intervalo mínimo: a atividade mais curta da plataforma leva minutos. Duas conclusões
  -- em 10 segundos não são duas partidas, são o mesmo pedido repetido ou um laço.
  IF EXISTS (
    SELECT 1 FROM public.ns_historico
     WHERE child_id = p_child AND created_at > now() - interval '10 seconds'
  ) THEN
    RETURN json_build_object(
      'ok', false, 'motivo', 'muito_rapido',
      'xp', v_child.xp, 'coins', v_child.neural_coins,
      'nivel', v_child.nivel, 'streak', v_child.streak_atual);
  END IF;

  -- ⚠️ RESÍDUO CONHECIDO, e é de propósito.
  -- Os power-ups comprados na Loja (XP×2, XP×3, moedas +50%) ficam ativos no
  -- localStorage, então o multiplicador ainda chega pelo cliente. Ignorá-lo puniria
  -- quem pagou por ele: a tela mostraria ×3 e o banco creditaria o valor base.
  --
  -- O que muda é o TAMANHO do problema. Antes o cliente escolhia o TOTAL — qualquer
  -- número. Agora escolhe no máximo triplicar um valor que o servidor conhece, e ×3 é
  -- exatamente o que o power-up mais caro da Loja concede. O ganho máximo por atividade
  -- sai de "infinito" para "o que um jogador legítimo consegue comprando".
  --
  -- Fechar de vez pede mover a ATIVAÇÃO do power-up para o banco (uma tabela de
  -- power-ups ativos por criança, com validade). É o próximo passo natural desta frente.
  v_xp := round((v_rec.xp + CASE WHEN p_assistiu THEN 5 ELSE 0 END)
                * LEAST(GREATEST(COALESCE(p_mult_xp, 1), 1), 3));
  v_coins := round(v_rec.coins * LEAST(GREATEST(COALESCE(p_mult_coins, 1), 1), 3));

  -- Sequência calculada aqui, e não no navegador: antes ela vinha de
  -- `ns_ultimo_ativo_<filho>` no localStorage, onde trocar a data valia dias de brinde.
  SELECT max((created_at AT TIME ZONE 'America/Sao_Paulo')::date)
    INTO v_ultimo FROM public.ns_historico WHERE child_id = p_child;

  v_streak := COALESCE(v_child.streak_atual, 0);
  IF v_ultimo IS NULL THEN
    v_streak := 1;
  ELSIF v_ultimo = v_hoje THEN
    NULL;                                   -- já jogou hoje: mantém
  ELSIF v_ultimo = v_hoje - 1 THEN
    v_streak := v_streak + 1;
  ELSE
    v_streak := 1;                          -- faltou um dia: recomeça
  END IF;

  v_nivel := GREATEST(COALESCE(v_child.nivel, 1),
                      floor((COALESCE(v_child.xp, 0) + v_xp) / 500.0)::int + 1);

  UPDATE public.children SET
    xp            = COALESCE(xp, 0) + v_xp,
    neural_coins  = COALESCE(neural_coins, 0) + v_coins,
    nivel         = v_nivel,
    streak_atual  = v_streak,
    streak_maximo = GREATEST(COALESCE(streak_maximo, 0), v_streak)
  WHERE id = p_child
  RETURNING * INTO v_child;

  INSERT INTO public.ns_historico (child_id, parent_id, titulo, xp, coins, emoji, tipo, data, timestamp)
  VALUES (p_child, auth.uid(), COALESCE(p_titulo, p_atividade), v_xp, v_coins,
          p_emoji, v_rec.tipo,
          to_char(now() AT TIME ZONE 'America/Sao_Paulo', 'DD/MM HH24:MI'),
          (extract(epoch FROM now()) * 1000)::bigint);

  RETURN json_build_object(
    'ok', true, 'ganho_xp', v_xp, 'ganho_coins', v_coins,
    'xp', v_child.xp, 'coins', v_child.neural_coins,
    'nivel', v_child.nivel, 'streak', v_child.streak_atual);
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- 4. Bônus (missão do dia, desafio da semana, offline, Kids TV)
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.ns_creditar_bonus(
  p_child uuid,
  p_tipo  text,
  p_ref   text DEFAULT NULL     -- id da atividade offline / do vídeo, para limitar repetição
) RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_child   public.children%ROWTYPE;
  v_xp      integer := 0;
  v_coins   integer := 0;
  v_periodo text;
  v_nivel   integer;
BEGIN
  IF NOT public.ns_meu_filho(p_child) THEN
    RAISE EXCEPTION 'sem permissao para este filho';
  END IF;

  -- Os valores são fixos AQUI, não vêm por parâmetro. Aceitar o valor do cliente seria
  -- reabrir o buraco por uma porta com outro nome.
  CASE p_tipo
    WHEN 'missao'  THEN v_xp := 75;  v_coins := 75;
    WHEN 'desafio' THEN v_xp := 500; v_coins := 500;
    WHEN 'offline' THEN v_xp := 0;   v_coins := 15;
    WHEN 'kids'    THEN v_xp := 0;   v_coins := 20;
    ELSE RAISE EXCEPTION 'bonus desconhecido: %', p_tipo;
  END CASE;

  -- A janela do resgate único é o que define quantas vezes cabe: a missão é diária, o
  -- desafio é semanal, e offline/Kids TV se repetem por item (mas uma vez por item).
  v_periodo := CASE p_tipo
    WHEN 'missao'  THEN to_char(public.ns_hoje_br(), 'YYYY-MM-DD')
    WHEN 'desafio' THEN to_char(public.ns_hoje_br(), 'IYYY-"W"IW')
    ELSE COALESCE(p_ref, 'sem-ref')
  END;

  BEGIN
    INSERT INTO public.ns_bonus_resgates (child_id, tipo, periodo)
    VALUES (p_child, p_tipo, v_periodo);
  EXCEPTION WHEN unique_violation THEN
    SELECT * INTO v_child FROM public.children WHERE id = p_child;
    RETURN json_build_object(
      'ok', false, 'motivo', 'ja_resgatado',
      'xp', v_child.xp, 'coins', v_child.neural_coins,
      'nivel', v_child.nivel, 'streak', v_child.streak_atual);
  END;

  SELECT * INTO v_child FROM public.children WHERE id = p_child FOR UPDATE;
  v_nivel := GREATEST(COALESCE(v_child.nivel, 1),
                      floor((COALESCE(v_child.xp, 0) + v_xp) / 500.0)::int + 1);

  UPDATE public.children SET
    xp           = COALESCE(xp, 0) + v_xp,
    neural_coins = COALESCE(neural_coins, 0) + v_coins,
    nivel        = v_nivel
  WHERE id = p_child
  RETURNING * INTO v_child;

  RETURN json_build_object(
    'ok', true, 'ganho_xp', v_xp, 'ganho_coins', v_coins,
    'xp', v_child.xp, 'coins', v_child.neural_coins,
    'nivel', v_child.nivel, 'streak', v_child.streak_atual);
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- 5. Comprar na Loja
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.ns_debitar_loja(p_child uuid, p_item text)
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_child     public.children%ROWTYPE;
  v_preco     public.ns_loja_precos%ROWTYPE;
  v_consumivel boolean;
BEGIN
  IF NOT public.ns_meu_filho(p_child) THEN
    RAISE EXCEPTION 'sem permissao para este filho';
  END IF;

  SELECT * INTO v_preco FROM public.ns_loja_precos WHERE item_id = p_item;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'item desconhecido: %', p_item;
  END IF;

  -- Power-up é consumível: pode ser comprado de novo. Os demais são posse permanente e
  -- comprar duas vezes só queimaria moeda da criança.
  v_consumivel := p_item LIKE 'pu\_%';

  SELECT * INTO v_child FROM public.children WHERE id = p_child FOR UPDATE;

  IF COALESCE(v_child.nivel, 1) < v_preco.nivel_min THEN
    RETURN json_build_object('ok', false, 'motivo', 'nivel_insuficiente',
                             'coins', v_child.neural_coins);
  END IF;

  IF NOT v_consumivel AND EXISTS (
    SELECT 1 FROM public.ns_purchases WHERE child_id = p_child AND item_id = p_item
  ) THEN
    RETURN json_build_object('ok', false, 'motivo', 'ja_possui',
                             'coins', v_child.neural_coins);
  END IF;

  IF COALESCE(v_child.neural_coins, 0) < v_preco.preco THEN
    RETURN json_build_object('ok', false, 'motivo', 'saldo_insuficiente',
                             'coins', v_child.neural_coins);
  END IF;

  UPDATE public.children
     SET neural_coins = neural_coins - v_preco.preco
   WHERE id = p_child
  RETURNING * INTO v_child;

  IF NOT v_consumivel THEN
    INSERT INTO public.ns_purchases (child_id, item_id)
    VALUES (p_child, p_item)
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN json_build_object('ok', true, 'preco', v_preco.preco,
                           'coins', v_child.neural_coins);
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- 6. Sequência: acertar quando o dia passou sem jogar
-- ─────────────────────────────────────────────────────────────
-- A Home zerava a sequência com um UPDATE direto. Com a coluna trancada, quem recalcula
-- é isto — e agora a partir do histórico, que é o registro real do que aconteceu.
CREATE OR REPLACE FUNCTION public.ns_sincronizar_streak(p_child uuid)
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_ultimo date;
  v_child  public.children%ROWTYPE;
  v_hoje   date := public.ns_hoje_br();
BEGIN
  IF NOT public.ns_meu_filho(p_child) THEN
    RAISE EXCEPTION 'sem permissao para este filho';
  END IF;

  SELECT max((created_at AT TIME ZONE 'America/Sao_Paulo')::date)
    INTO v_ultimo FROM public.ns_historico WHERE child_id = p_child;

  IF v_ultimo IS NULL OR v_ultimo < v_hoje - 1 THEN
    UPDATE public.children SET streak_atual = 0 WHERE id = p_child
    RETURNING * INTO v_child;
  ELSE
    SELECT * INTO v_child FROM public.children WHERE id = p_child;
  END IF;

  RETURN json_build_object('ok', true, 'streak', v_child.streak_atual);
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- 7. Liberação de tempo extra pelo responsável
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.ns_liberar_horario(p_child uuid, p_minutos integer)
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_min integer := LEAST(GREATEST(COALESCE(p_minutos, 0), 0), 120);
  v_ate timestamptz;
BEGIN
  -- Quem chama é a conta do responsável (a tela ainda pede a senha dele antes). O
  -- servidor confere o vínculo; a senha é a barreira contra a criança usar o aparelho
  -- desbloqueado do pai.
  IF NOT public.ns_meu_filho(p_child) THEN
    RAISE EXCEPTION 'sem permissao para este filho';
  END IF;

  IF v_min = 0 THEN
    DELETE FROM public.ns_liberacoes WHERE child_id = p_child;
    RETURN json_build_object('ok', true, 'minutos', 0, 'ate', NULL);
  END IF;

  v_ate := now() + make_interval(mins => v_min);

  INSERT INTO public.ns_liberacoes (child_id, ate, minutos)
  VALUES (p_child, v_ate, v_min)
  ON CONFLICT (child_id) DO UPDATE SET ate = excluded.ate, minutos = excluded.minutos;

  RETURN json_build_object('ok', true, 'minutos', v_min, 'ate', v_ate);
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- 8. 🔴 O QUE REALMENTE FECHA: trancar as colunas
-- ─────────────────────────────────────────────────────────────
-- Sem isto tudo acima é só uma forma mais educada de fazer o que já dava para fazer
-- direto. Privilégio de tabela e de coluna se SOMAM, então o REVOKE tem que vir antes
-- do GRANT — do contrário o privilégio amplo que já existe cobre tudo. Mesma lição da
-- `ranking_view` (016/020) e da `ns_admins` (021).
REVOKE UPDATE ON public.children FROM authenticated, anon;

-- A posse dos itens também era gravada pelo navegador. Trancar só a moeda deixaria o
-- caminho mais curto aberto: inserir a linha de posse direto e ficar com o item de
-- graça, sem passar pelo débito. Quem grava posse agora é `ns_debitar_loja`.
REVOKE INSERT, UPDATE, DELETE ON public.ns_purchases FROM authenticated, anon;

-- Sem restrição única, duas compras disparadas ao mesmo tempo (toque duplo, conexão
-- lenta) inseriam duas linhas de posse e debitavam duas vezes. Limpa as repetições
-- existentes antes de criar a restrição, senão a criação falha em bases que já rodaram.
DELETE FROM public.ns_purchases a
 USING public.ns_purchases b
 WHERE a.child_id = b.child_id AND a.item_id = b.item_id AND a.ctid > b.ctid;

CREATE UNIQUE INDEX IF NOT EXISTS ns_purchases_child_item_idx
  ON public.ns_purchases (child_id, item_id);

-- Continua livre o que é aparência e cadastro: nada disso vale pontos.
GRANT UPDATE (
  nome, idade, faixa_etaria, avatar,
  titulo_equipado, efeito_equipado, moldura_equipada, tema_equipado,
  perfil_cognitivo
) ON public.children TO authenticated;

-- As funções rodam como dono (postgres) e por isso atravessam tanto a RLS quanto o
-- trigger `trg_clamp_reward` da 019 — que fica de pé como rede para qualquer caminho
-- que ainda escreva direto.
GRANT EXECUTE ON FUNCTION
  public.ns_creditar_atividade(uuid, text, text, text, boolean, numeric, numeric),
  public.ns_creditar_bonus(uuid, text, text),
  public.ns_debitar_loja(uuid, text),
  public.ns_sincronizar_streak(uuid),
  public.ns_liberar_horario(uuid, integer),
  public.ns_meu_filho(uuid)
TO authenticated;

-- ─────────────────────────────────────────────────────────────
-- 9. Verificação  (rodar DEPOIS de aplicar a 024)
-- ─────────────────────────────────────────────────────────────
-- Esperado: authenticated com UPDATE apenas nas 9 colunas de aparência/cadastro,
-- e NENHUMA linha para xp, neural_coins, nivel, streak_atual, streak_maximo.
--
--   select column_name from information_schema.column_privileges
--    where table_name='children' and grantee='authenticated' and privilege_type='UPDATE'
--    order by column_name;
--
-- Prova prática, logado como um pai comum no SQL Editor ou pelo console do navegador —
-- tem que dar erro de permissão:
--   update children set xp = 999999 where id = '<id de um filho seu>';
