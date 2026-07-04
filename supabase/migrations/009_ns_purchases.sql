-- Migration 009: Tabela de compras da Loja + coluna neuralai_config nos users

-- C2: Tabela de compras da Loja para sincronização entre dispositivos
CREATE TABLE IF NOT EXISTS ns_purchases (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id     uuid REFERENCES children(id) ON DELETE CASCADE NOT NULL,
  item_id      text NOT NULL,
  purchased_at timestamptz DEFAULT now()
);

ALTER TABLE ns_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parents_read_purchases" ON ns_purchases
  FOR SELECT USING (
    child_id IN (SELECT id FROM children WHERE parent_id = auth.uid())
  );

CREATE POLICY "parents_insert_purchases" ON ns_purchases
  FOR INSERT WITH CHECK (
    child_id IN (SELECT id FROM children WHERE parent_id = auth.uid())
  );

-- M5: Coluna neuralai_config para Settings (pode não existir em instâncias antigas)
ALTER TABLE users ADD COLUMN IF NOT EXISTS neuralai_config jsonb;
