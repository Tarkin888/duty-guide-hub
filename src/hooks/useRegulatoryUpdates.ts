import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useRegulatoryUpdates() {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestUpdateDate, setLatestUpdateDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = user?.id || null;

  const fetchCounts = useCallback(async () => {
    if (!userId) {
      setUnreadCount(0);
      setLatestUpdateDate(null);
      setLoading(false);
      return;
    }

    try {
      // Fetch all updates
      const { data: updates, error: updatesError } = await supabase
        .from('regulatory_updates')
        .select('id, created_at')
        .order('created_at', { ascending: false });

      if (updatesError) throw updatesError;

      // Fetch read status
      const { data: reads, error: readsError } = await supabase
        .from('user_update_reads')
        .select('update_id')
        .eq('user_id', userId);

      if (readsError) throw readsError;

      const readIds = new Set((reads || []).map(r => r.update_id));
      const unread = (updates || []).filter(u => !readIds.has(u.id)).length;
      
      setUnreadCount(unread);
      
      if (updates && updates.length > 0) {
        setLatestUpdateDate(new Date(updates[0].created_at));
      }
    } catch (error) {
      console.error('Error fetching regulatory update counts:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchCounts();
  }, [fetchCounts]);

  return {
    unreadCount,
    latestUpdateDate,
    loading,
    refresh
  };
}
