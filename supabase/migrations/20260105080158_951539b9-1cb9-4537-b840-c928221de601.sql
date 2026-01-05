-- Create the updated_at trigger function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Notes table for module-specific notes
CREATE TABLE public.module_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Note shares table for team collaboration
CREATE TABLE public.note_shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  note_id UUID REFERENCES public.module_notes(id) ON DELETE CASCADE NOT NULL,
  shared_with_user_id TEXT NOT NULL,
  permission TEXT NOT NULL DEFAULT 'view',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(note_id, shared_with_user_id)
);

-- Enable RLS
ALTER TABLE public.module_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.note_shares ENABLE ROW LEVEL SECURITY;

-- RLS policies for notes
CREATE POLICY "Anyone can view notes" ON public.module_notes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert notes" ON public.module_notes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update notes" ON public.module_notes FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete notes" ON public.module_notes FOR DELETE USING (true);

-- RLS policies for note shares
CREATE POLICY "Anyone can view note shares" ON public.note_shares FOR SELECT USING (true);
CREATE POLICY "Anyone can insert note shares" ON public.note_shares FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update note shares" ON public.note_shares FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete note shares" ON public.note_shares FOR DELETE USING (true);

-- Indexes for performance
CREATE INDEX idx_module_notes_user_id ON public.module_notes(user_id);
CREATE INDEX idx_module_notes_module_id ON public.module_notes(module_id);
CREATE INDEX idx_module_notes_category ON public.module_notes(category);
CREATE INDEX idx_note_shares_note_id ON public.note_shares(note_id);
CREATE INDEX idx_note_shares_shared_with ON public.note_shares(shared_with_user_id);

-- Trigger for updated_at
CREATE TRIGGER update_module_notes_updated_at
BEFORE UPDATE ON public.module_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();