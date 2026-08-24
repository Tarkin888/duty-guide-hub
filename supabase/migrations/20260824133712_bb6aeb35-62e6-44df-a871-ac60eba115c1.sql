CREATE TABLE public.maturity_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  score_1 smallint NOT NULL CHECK (score_1 BETWEEN 1 AND 5),
  score_2 smallint NOT NULL CHECK (score_2 BETWEEN 1 AND 5),
  score_3 smallint NOT NULL CHECK (score_3 BETWEEN 1 AND 5),
  score_4 smallint NOT NULL CHECK (score_4 BETWEEN 1 AND 5),
  score_5 smallint NOT NULL CHECK (score_5 BETWEEN 1 AND 5),
  score_6 smallint NOT NULL CHECK (score_6 BETWEEN 1 AND 5),
  comments_1 text,
  comments_2 text,
  comments_3 text,
  comments_4 text,
  comments_5 text,
  comments_6 text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.maturity_snapshots TO authenticated;
GRANT ALL ON public.maturity_snapshots TO service_role;

ALTER TABLE public.maturity_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own maturity snapshots" ON public.maturity_snapshots
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own maturity snapshots" ON public.maturity_snapshots
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own maturity snapshots" ON public.maturity_snapshots
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own maturity snapshots" ON public.maturity_snapshots
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX maturity_snapshots_user_created_idx ON public.maturity_snapshots (user_id, created_at DESC);

CREATE TRIGGER update_maturity_snapshots_updated_at
  BEFORE UPDATE ON public.maturity_snapshots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();