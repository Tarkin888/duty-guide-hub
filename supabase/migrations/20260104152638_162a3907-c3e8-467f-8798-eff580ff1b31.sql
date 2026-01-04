-- Create table for storing maturity assessment results
CREATE TABLE public.maturity_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  overall_score NUMERIC(5,2) NOT NULL,
  products_services_score NUMERIC(5,2) NOT NULL,
  price_value_score NUMERIC(5,2) NOT NULL,
  consumer_understanding_score NUMERIC(5,2) NOT NULL,
  consumer_support_score NUMERIC(5,2) NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.maturity_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Anyone can read their own assessments"
ON public.maturity_assessments
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert assessments"
ON public.maturity_assessments
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete their own assessments"
ON public.maturity_assessments
FOR DELETE
USING (true);

-- Create index for faster queries
CREATE INDEX idx_maturity_assessments_user_id ON public.maturity_assessments(user_id);
CREATE INDEX idx_maturity_assessments_completed_at ON public.maturity_assessments(completed_at DESC);