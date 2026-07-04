-- RLS para tabela ns_ai_usage (rate limiting da IA)
ALTER TABLE ns_ai_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_usage_own" ON ns_ai_usage;

CREATE POLICY "ai_usage_own" ON ns_ai_usage
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
