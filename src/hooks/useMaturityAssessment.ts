import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface AssessmentResult {
  id: string;
  user_id: string;
  completed_at: string;
  overall_score: number;
  products_services_score: number;
  price_value_score: number;
  consumer_understanding_score: number;
  consumer_support_score: number;
  answers: Record<string, number>;
}

export const useMaturityAssessment = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [latestAssessment, setLatestAssessment] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canRetake, setCanRetake] = useState(true);
  const [daysUntilRetake, setDaysUntilRetake] = useState(0);
  const { toast } = useToast();
  const hasLoadedOnce = useRef(false);

  const { loading: authLoading } = useAuth();
  const userId = user?.id || null;

  const fetchAssessments = async () => {
    if (!userId) {
      setAssessments([]);
      setLatestAssessment(null);
      if (!authLoading) {
        hasLoadedOnce.current = true;
        setIsLoading(false);
      }
      return;
    }

    // Only show the blocking spinner on the very first load; later refreshes
    // happen in the background so in-progress UI state is never interrupted.
    if (!hasLoadedOnce.current) setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('maturity_assessments')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      const typedData = (data || []).map(item => ({
        ...item,
        overall_score: Number(item.overall_score),
        products_services_score: Number(item.products_services_score),
        price_value_score: Number(item.price_value_score),
        consumer_understanding_score: Number(item.consumer_understanding_score),
        consumer_support_score: Number(item.consumer_support_score),
        answers: item.answers as Record<string, number>,
      }));

      setAssessments(typedData);
      
      if (typedData.length > 0) {
        setLatestAssessment(typedData[0]);
        
        // Check if user can retake (quarterly = 90 days)
        const lastDate = new Date(typedData[0].completed_at);
        const now = new Date();
        const daysSinceLastAssessment = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        const quarterlyDays = 90;
        
        if (daysSinceLastAssessment < quarterlyDays) {
          setCanRetake(false);
          setDaysUntilRetake(quarterlyDays - daysSinceLastAssessment);
        } else {
          setCanRetake(true);
          setDaysUntilRetake(0);
        }
      }
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load assessment history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveAssessment = async (answers: Record<string, number>, scores: {
    overall: number;
    products_services: number;
    price_value: number;
    consumer_understanding: number;
    consumer_support: number;
  }) => {
    if (!userId) {
      toast({
        title: 'Error',
        description: 'You must be signed in to save assessments',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('maturity_assessments')
        .insert({
          user_id: userId,
          overall_score: scores.overall,
          products_services_score: scores.products_services,
          price_value_score: scores.price_value,
          consumer_understanding_score: scores.consumer_understanding,
          consumer_support_score: scores.consumer_support,
          answers: answers,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Assessment Saved',
        description: 'Your maturity assessment has been recorded successfully.',
      });

      await fetchAssessments();
      return data;
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: 'Error',
        description: 'Failed to save assessment results',
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, [userId]);

  return {
    assessments,
    latestAssessment,
    isLoading,
    canRetake,
    daysUntilRetake,
    saveAssessment,
    refetch: fetchAssessments,
  };
};
