-- Create regulatory_updates table to store FCA publications
CREATE TABLE public.regulatory_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  link TEXT NOT NULL UNIQUE,
  pub_date TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT NOT NULL, -- 'guidance', 'dear_ceo_letter', 'multi_firm_review', 'consultation', 'other'
  affected_modules TEXT[] DEFAULT '{}', -- Array of module IDs like 'CD-I1', 'CD-I2'
  source TEXT DEFAULT 'FCA',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_update_reads table to track which updates users have read
-- Using localStorage user ID since we don't have auth
CREATE TABLE public.user_update_reads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- localStorage-based user ID
  update_id UUID NOT NULL REFERENCES public.regulatory_updates(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, update_id)
);

-- Enable RLS
ALTER TABLE public.regulatory_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_update_reads ENABLE ROW LEVEL SECURITY;

-- Regulatory updates are publicly readable (no auth needed)
CREATE POLICY "Anyone can read regulatory updates"
ON public.regulatory_updates
FOR SELECT
USING (true);

-- User reads are managed by user_id from localStorage
CREATE POLICY "Anyone can read update reads"
ON public.user_update_reads
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert update reads"
ON public.user_update_reads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete their own reads"
ON public.user_update_reads
FOR DELETE
USING (true);

-- Create index for faster queries
CREATE INDEX idx_regulatory_updates_pub_date ON public.regulatory_updates(pub_date DESC);
CREATE INDEX idx_user_update_reads_user ON public.user_update_reads(user_id);

-- Insert some initial regulatory updates for demo purposes
INSERT INTO public.regulatory_updates (title, description, link, pub_date, category, affected_modules) VALUES
('Consumer Duty: Review of firms'' implementation plans', 'The FCA has published findings from their review of firms'' Consumer Duty implementation plans, highlighting areas of good practice and areas for improvement.', 'https://www.fca.org.uk/publications/multi-firm-reviews/consumer-duty-implementation-plans', '2024-12-15 10:00:00+00', 'multi_firm_review', ARRAY['CD-P1', 'CD-P3', 'CD-M1']),
('Dear CEO letter: Consumer Duty expectations for 2025', 'Letter setting out the FCA''s supervisory priorities and expectations for Consumer Duty compliance in 2025.', 'https://www.fca.org.uk/publications/dear-ceo-letters/consumer-duty-2025', '2024-12-10 09:00:00+00', 'dear_ceo_letter', ARRAY['CD-M1', 'CD-M3', 'CD-P1']),
('FG24/5: Guidance on Consumer Duty board reporting', 'New guidance on board reporting requirements under Consumer Duty, including good practice examples.', 'https://www.fca.org.uk/publications/finalised-guidance/fg24-5-consumer-duty-board-reporting', '2024-11-28 11:00:00+00', 'guidance', ARRAY['CD-M3', 'CD-M1']),
('Consumer Duty: Fair value assessments review', 'Multi-firm review examining how firms are conducting fair value assessments for their products and services.', 'https://www.fca.org.uk/publications/multi-firm-reviews/consumer-duty-fair-value', '2024-11-15 10:00:00+00', 'multi_firm_review', ARRAY['CD-I2', 'CD-I1']),
('Updated guidance on vulnerable customer identification', 'Supplementary guidance on identifying and supporting customers in vulnerable circumstances under Consumer Duty.', 'https://www.fca.org.uk/publications/finalised-guidance/vulnerable-customers-consumer-duty', '2024-10-20 09:00:00+00', 'guidance', ARRAY['CD-I5', 'CD-I4']);