CREATE TABLE public.board_summary_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  row_key text NOT NULL,
  rating text NOT NULL CHECK (rating IN ('nascent','developing','established','advanced')),
  rationale text NOT NULL DEFAULT '',
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, row_key)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.board_summary_ratings TO authenticated;
GRANT ALL ON public.board_summary_ratings TO service_role;
ALTER TABLE public.board_summary_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own board ratings" ON public.board_summary_ratings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own board ratings" ON public.board_summary_ratings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own board ratings" ON public.board_summary_ratings FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own board ratings" ON public.board_summary_ratings FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_board_summary_ratings_updated_at BEFORE UPDATE ON public.board_summary_ratings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.board_summary_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  verdict text NOT NULL DEFAULT 'broadly' CHECK (verdict IN ('yes','broadly','not_yet')),
  verdict_narrative text NOT NULL DEFAULT '',
  differential_outcomes text NOT NULL DEFAULT '',
  forward_look text NOT NULL DEFAULT '',
  actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  approver_name text NOT NULL DEFAULT '',
  approver_role text NOT NULL DEFAULT '',
  signoff_date date,
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.board_summary_reports TO authenticated;
GRANT ALL ON public.board_summary_reports TO service_role;
ALTER TABLE public.board_summary_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own board report" ON public.board_summary_reports FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own board report" ON public.board_summary_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own board report" ON public.board_summary_reports FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own board report" ON public.board_summary_reports FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_board_summary_reports_updated_at BEFORE UPDATE ON public.board_summary_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.board_summary_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  version integer NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb NOT NULL,
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, version)
);

GRANT SELECT, INSERT, DELETE ON public.board_summary_snapshots TO authenticated;
GRANT ALL ON public.board_summary_snapshots TO service_role;
ALTER TABLE public.board_summary_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own board snapshots" ON public.board_summary_snapshots FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own board snapshots" ON public.board_summary_snapshots FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own board snapshots" ON public.board_summary_snapshots FOR DELETE TO authenticated USING (auth.uid() = user_id);