DROP POLICY IF EXISTS "Users can view shared notes" ON public.module_notes;
DROP POLICY IF EXISTS "Users can view note shares for own notes" ON public.note_shares;
DROP POLICY IF EXISTS "Users can create shares for own notes" ON public.note_shares;
DROP POLICY IF EXISTS "Users can delete shares for own notes" ON public.note_shares;
DROP FUNCTION IF EXISTS public.note_is_shared_with(uuid, text);
DROP FUNCTION IF EXISTS public.note_is_owned_by(uuid, text);

CREATE OR REPLACE FUNCTION public.note_shared_with_me(_note_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.note_shares
    WHERE note_shares.note_id = _note_id
      AND note_shares.shared_with_user_id = (auth.uid())::text
  )
$$;

CREATE OR REPLACE FUNCTION public.note_owned_by_me(_note_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.module_notes
    WHERE module_notes.id = _note_id
      AND module_notes.user_id = (auth.uid())::text
  )
$$;

REVOKE EXECUTE ON FUNCTION public.note_shared_with_me(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.note_owned_by_me(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.note_shared_with_me(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.note_owned_by_me(uuid) TO authenticated;

CREATE POLICY "Users can view shared notes" ON public.module_notes
  FOR SELECT TO authenticated USING (public.note_shared_with_me(id));

CREATE POLICY "Users can view note shares for own notes" ON public.note_shares
  FOR SELECT TO authenticated USING (
    shared_with_user_id = (auth.uid())::text OR public.note_owned_by_me(note_id)
  );

CREATE POLICY "Users can create shares for own notes" ON public.note_shares
  FOR INSERT TO authenticated WITH CHECK (public.note_owned_by_me(note_id));

CREATE POLICY "Users can delete shares for own notes" ON public.note_shares
  FOR DELETE TO authenticated USING (public.note_owned_by_me(note_id));