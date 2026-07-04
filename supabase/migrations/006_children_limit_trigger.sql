CREATE OR REPLACE FUNCTION public.check_children_limit()
RETURNS TRIGGER AS $$
DECLARE
  v_limite integer;
  v_atual  integer;
BEGIN
  SELECT COALESCE(filhos_limite, 1) INTO v_limite
    FROM public.users WHERE id = NEW.parent_id;
  SELECT COUNT(*) INTO v_atual
    FROM public.children WHERE parent_id = NEW.parent_id;
  IF v_atual >= v_limite THEN
    RAISE EXCEPTION 'CHILDREN_LIMIT_REACHED: Limite de % filho(s) atingido para este plano', v_limite;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS enforce_children_limit ON public.children;
CREATE TRIGGER enforce_children_limit
  BEFORE INSERT ON public.children
  FOR EACH ROW EXECUTE FUNCTION public.check_children_limit();
