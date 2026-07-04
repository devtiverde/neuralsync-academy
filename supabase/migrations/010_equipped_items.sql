-- Migration 010: Add equipped item columns to children table
-- Fixes C2: equipped state (title/effect/frame/theme) was localStorage-only
-- Now saved to Supabase so it survives device changes

ALTER TABLE children ADD COLUMN IF NOT EXISTS titulo_equipado  jsonb;
ALTER TABLE children ADD COLUMN IF NOT EXISTS efeito_equipado  jsonb;
ALTER TABLE children ADD COLUMN IF NOT EXISTS moldura_equipada jsonb;
ALTER TABLE children ADD COLUMN IF NOT EXISTS tema_equipado    jsonb;
