CREATE OR REPLACE FUNCTION public.note_is_shared_with(_note_id uuid, _user_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.note_shares
    WHERE note_shares.note_id = _note_id
      AND note_shares.shared_with_user_id = _user_id
  )
$$;

CREATE OR REPLACE FUNCTION public.note_is_owned_by(_note_id uuid, _user_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.module_notes
    WHERE module_notes.id = _note_id
      AND module_notes.user_id = _user_id
  )
$$;

DROP POLICY IF EXISTS "Users can view shared notes" ON public.module_notes;
CREATE POLICY "Users can view shared notes" ON public.module_notes
  FOR SELECT USING (public.note_is_shared_with(id, (auth.uid())::text));

DROP POLICY IF EXISTS "Users can view note shares for own notes" ON public.note_shares;
CREATE POLICY "Users can view note shares for own notes" ON public.note_shares
  FOR SELECT USING (
    shared_with_user_id = (auth.uid())::text
    OR public.note_is_owned_by(note_id, (auth.uid())::text)
  );

DROP POLICY IF EXISTS "Users can create shares for own notes" ON public.note_shares;
CREATE POLICY "Users can create shares for own notes" ON public.note_shares
  FOR INSERT WITH CHECK (public.note_is_owned_by(note_id, (auth.uid())::text));

DROP POLICY IF EXISTS "Users can delete shares for own notes" ON public.note_shares;
CREATE POLICY "Users can delete shares for own notes" ON public.note_shares
  FOR DELETE USING (public.note_is_owned_by(note_id, (auth.uid())::text));