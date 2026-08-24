REVOKE EXECUTE ON FUNCTION public.note_is_shared_with(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.note_is_owned_by(uuid, text) FROM PUBLIC, anon, authenticated;