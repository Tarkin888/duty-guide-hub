CREATE TABLE public.board_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  title text NOT NULL,
  firm_name text,
  reporting_period text,
  committee text,
  author text,
  status text NOT NULL DEFAULT 'draft',
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.board_papers TO authenticated;
GRANT ALL ON public.board_papers TO service_role;
ALTER TABLE public.board_papers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own board papers" ON public.board_papers FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own board papers" ON public.board_papers FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own board papers" ON public.board_papers FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own board papers" ON public.board_papers FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE TRIGGER update_board_papers_updated_at BEFORE UPDATE ON public.board_papers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.board_paper_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_paper_id uuid NOT NULL REFERENCES public.board_papers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  version int NOT NULL,
  issued_by text,
  issued_at timestamptz NOT NULL DEFAULT now(),
  frozen_content jsonb NOT NULL
);
GRANT SELECT, INSERT ON public.board_paper_snapshots TO authenticated;
GRANT ALL ON public.board_paper_snapshots TO service_role;
ALTER TABLE public.board_paper_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own board paper snapshots" ON public.board_paper_snapshots FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own board paper snapshots" ON public.board_paper_snapshots FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());