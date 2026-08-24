import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const MATURITY_CATEGORIES = [
  { key: 1, label: "Governance" },
  { key: 2, label: "Products & Services" },
  { key: 3, label: "Price & Value" },
  { key: 4, label: "Consumer Understanding" },
  { key: 5, label: "Consumer Support" },
  { key: 6, label: "Data & Evidence" },
] as const;

export const TARGET_SCORE = 4;

export interface MaturitySnapshot {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  score_1: number;
  score_2: number;
  score_3: number;
  score_4: number;
  score_5: number;
  score_6: number;
  comments_1: string | null;
  comments_2: string | null;
  comments_3: string | null;
  comments_4: string | null;
  comments_5: string | null;
  comments_6: string | null;
}

export type MaturitySnapshotInput = Omit<
  MaturitySnapshot,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export const useMaturitySnapshots = () => {
  const { user, loading: authLoading } = useAuth();
  const [latest, setLatest] = useState<MaturitySnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = user?.id || null;

  const fetchLatest = useCallback(async () => {
    if (!userId) {
      setLatest(null);
      if (!authLoading) setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error: queryError } = await supabase
        .from("maturity_snapshots")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (queryError) throw queryError;
      setLatest((data as MaturitySnapshot) ?? null);
      setError(null);
    } catch (err) {
      console.error("Error loading maturity assessment:", err);
      setError("We could not load your assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userId, authLoading]);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  const createSnapshot = async (input: MaturitySnapshotInput) => {
    if (!userId) {
      toast.error("You must be signed in to save an assessment");
      return null;
    }
    try {
      const { data, error: insertError } = await supabase
        .from("maturity_snapshots")
        .insert({ ...input, user_id: userId })
        .select()
        .single();

      if (insertError) throw insertError;
      setLatest(data as MaturitySnapshot);
      toast.success("Assessment saved");
      return data as MaturitySnapshot;
    } catch (err) {
      console.error("Error saving maturity assessment:", err);
      toast.error("Failed to save assessment");
      return null;
    }
  };

  return { latest, loading, error, createSnapshot, refetch: fetchLatest, userId };
};
