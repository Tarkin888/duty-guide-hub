import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// Get or create user ID from localStorage
function getUserId(): string {
  let userId = localStorage.getItem('consumer-duty-user-id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('consumer-duty-user-id', userId);
  }
  return userId;
}

export function useRegulatoryUpdates() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestUpdateDate, setLatestUpdateDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCounts = useCallback(async () => {
    try {
      const userId = getUserId();
      
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
  }, []);

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
