CREATE TABLE public.module_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  module_code text NOT NULL,
  status text NOT NULL DEFAULT 'not_started',
  completed_at timestamptz,
  last_accessed_at timestamptz,
  manual_complete boolean NOT NULL DEFAULT false,
  manual_in_progress boolean NOT NULL DEFAULT false,
  time_spent_seconds integer NOT NULL DEFAULT 0,
  tabs_viewed jsonb NOT NULL DEFAULT '[]'::jsonb,
  template_downloads jsonb NOT NULL DEFAULT '[]'::jsonb,
  checked_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT module_progress_user_module_unique UNIQUE (user_id, module_code),
  CONSTRAINT module_progress_status_check CHECK (status IN ('not_started','in_progress','complete'))
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.module_progress TO authenticated;
GRANT ALL ON public.module_progress TO service_role;

ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own module progress"
  ON public.module_progress FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own module progress"
  ON public.module_progress FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own module progress"
  ON public.module_progress FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own module progress"
  ON public.module_progress FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX module_progress_user_id_idx ON public.module_progress (user_id);

CREATE TRIGGER update_module_progress_updated_at
  BEFORE UPDATE ON public.module_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();