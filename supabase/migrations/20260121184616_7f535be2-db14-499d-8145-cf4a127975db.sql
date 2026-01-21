-- Drop all existing permissive RLS policies

-- module_notes policies
DROP POLICY IF EXISTS "Anyone can delete notes" ON public.module_notes;
DROP POLICY IF EXISTS "Anyone can insert notes" ON public.module_notes;
DROP POLICY IF EXISTS "Anyone can update notes" ON public.module_notes;
DROP POLICY IF EXISTS "Anyone can view notes" ON public.module_notes;

-- note_shares policies
DROP POLICY IF EXISTS "Anyone can delete note shares" ON public.note_shares;
DROP POLICY IF EXISTS "Anyone can insert note shares" ON public.note_shares;
DROP POLICY IF EXISTS "Anyone can update note shares" ON public.note_shares;
DROP POLICY IF EXISTS "Anyone can view note shares" ON public.note_shares;

-- maturity_assessments policies
DROP POLICY IF EXISTS "Anyone can delete their own assessments" ON public.maturity_assessments;
DROP POLICY IF EXISTS "Anyone can insert assessments" ON public.maturity_assessments;
DROP POLICY IF EXISTS "Anyone can read their own assessments" ON public.maturity_assessments;

-- user_update_reads policies
DROP POLICY IF EXISTS "Anyone can delete their own reads" ON public.user_update_reads;
DROP POLICY IF EXISTS "Anyone can insert update reads" ON public.user_update_reads;
DROP POLICY IF EXISTS "Anyone can read update reads" ON public.user_update_reads;

-- Create new secure RLS policies for module_notes
CREATE POLICY "Users can view own notes"
ON public.module_notes
FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view shared notes"
ON public.module_notes
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM note_shares 
    WHERE note_id = module_notes.id 
    AND shared_with_user_id = auth.uid()::text
  )
);

CREATE POLICY "Users can insert own notes"
ON public.module_notes
FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own notes"
ON public.module_notes
FOR UPDATE
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own notes"
ON public.module_notes
FOR DELETE
USING (auth.uid()::text = user_id);

-- Create new secure RLS policies for note_shares
CREATE POLICY "Users can view note shares for own notes"
ON public.note_shares
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM module_notes 
    WHERE id = note_shares.note_id 
    AND user_id = auth.uid()::text
  )
  OR shared_with_user_id = auth.uid()::text
);

CREATE POLICY "Users can create shares for own notes"
ON public.note_shares
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM module_notes 
    WHERE id = note_shares.note_id 
    AND user_id = auth.uid()::text
  )
);

CREATE POLICY "Users can delete shares for own notes"
ON public.note_shares
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM module_notes 
    WHERE id = note_shares.note_id 
    AND user_id = auth.uid()::text
  )
);

-- Create new secure RLS policies for maturity_assessments
CREATE POLICY "Users can view own assessments"
ON public.maturity_assessments
FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own assessments"
ON public.maturity_assessments
FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own assessments"
ON public.maturity_assessments
FOR DELETE
USING (auth.uid()::text = user_id);

-- Create new secure RLS policies for user_update_reads
CREATE POLICY "Users can view own read status"
ON public.user_update_reads
FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own read status"
ON public.user_update_reads
FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own read status"
ON public.user_update_reads
FOR DELETE
USING (auth.uid()::text = user_id);