import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  BOARD_SCORECARD_ROWS,
  BoardAction,
  BoardRating,
  BoardVerdict,
} from '@/config/boardSummaryConfig';

export interface BoardRatingRow {
  row_key: string;
  rating: BoardRating;
  rationale: string;
  is_demo: boolean;
  updated_at: string;
}

export interface BoardReport {
  verdict: BoardVerdict;
  verdict_narrative: string;
  differential_outcomes: string;
  forward_look: string;
  actions: BoardAction[];
  approver_name: string;
  approver_role: string;
  signoff_date: string | null;
  is_demo: boolean;
  updated_at?: string;
}

export interface BoardSnapshot {
  id: string;
  version: number;
  issued_at: string;
  is_demo: boolean;
  payload: {
    ratings: BoardRatingRow[];
    report: BoardReport;
  };
}

export interface BoardNote {
  id: string;
  module_id: string;
  title: string;
  content: string;
  updated_at: string;
}

const EMPTY_REPORT: BoardReport = {
  verdict: 'broadly',
  verdict_narrative: '',
  differential_outcomes: '',
  forward_look: '',
  actions: [],
  approver_name: '',
  approver_role: '',
  signoff_date: null,
  is_demo: false,
};

export const useBoardSummary = () => {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [ratings, setRatings] = useState<Record<string, BoardRatingRow>>({});
  const [report, setReport] = useState<BoardReport>(EMPTY_REPORT);
  const [snapshots, setSnapshots] = useState<BoardSnapshot[]>([]);
  const [notes, setNotes] = useState<BoardNote[]>([]);
  const [notesAvailable, setNotesAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [ratingsRes, reportRes, snapshotsRes, notesRes] = await Promise.all([
        supabase.from('board_summary_ratings').select('*').eq('user_id', userId),
        supabase.from('board_summary_reports').select('*').eq('user_id', userId).maybeSingle(),
        supabase
          .from('board_summary_snapshots')
          .select('*')
          .eq('user_id', userId)
          .order('version', { ascending: false }),
        supabase
          .from('module_notes')
          .select('id, module_id, title, content, updated_at')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false }),
      ]);

      if (ratingsRes.error) throw ratingsRes.error;
      const map: Record<string, BoardRatingRow> = {};
      (ratingsRes.data ?? []).forEach((r) => {
        map[r.row_key] = r as unknown as BoardRatingRow;
      });
      setRatings(map);

      if (reportRes.error) throw reportRes.error;
      setReport(
        reportRes.data
          ? ({ ...EMPTY_REPORT, ...reportRes.data, actions: (reportRes.data.actions as unknown as BoardAction[]) ?? [] })
          : EMPTY_REPORT,
      );

      if (snapshotsRes.error) throw snapshotsRes.error;
      setSnapshots((snapshotsRes.data ?? []) as unknown as BoardSnapshot[]);

      if (notesRes.error) {
        setNotesAvailable(false);
        setNotes([]);
      } else {
        setNotesAvailable(true);
        setNotes((notesRes.data ?? []) as BoardNote[]);
      }
    } catch (error) {
      console.error('Error loading board summary:', error);
      toast.error('Could not load the Board Summary');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  const saveRating = useCallback(
    async (rowKey: string, rating: BoardRating, rationale: string) => {
      if (!userId) return;
      setSaving(true);
      try {
        const { data, error } = await supabase
          .from('board_summary_ratings')
          .upsert(
            { user_id: userId, row_key: rowKey, rating, rationale, is_demo: false },
            { onConflict: 'user_id,row_key' },
          )
          .select()
          .single();
        if (error) throw error;
        setRatings((prev) => ({ ...prev, [rowKey]: data as unknown as BoardRatingRow }));
        toast.success('Rating saved');
      } catch (error) {
        console.error('Error saving rating:', error);
        toast.error('Could not save the rating');
      } finally {
        setSaving(false);
      }
    },
    [userId],
  );

  const saveReport = useCallback(
    async (patch: Partial<BoardReport>, options?: { silent?: boolean }) => {
      if (!userId) return;
      setSaving(true);
      const next = { ...report, ...patch, is_demo: false };
      try {
        const { data, error } = await supabase
          .from('board_summary_reports')
          .upsert(
            {
              user_id: userId,
              verdict: next.verdict,
              verdict_narrative: next.verdict_narrative,
              differential_outcomes: next.differential_outcomes,
              forward_look: next.forward_look,
              actions: next.actions as unknown as never,
              approver_name: next.approver_name,
              approver_role: next.approver_role,
              signoff_date: next.signoff_date,
              is_demo: false,
            },
            { onConflict: 'user_id' },
          )
          .select()
          .single();
        if (error) throw error;
        setReport({
          ...EMPTY_REPORT,
          ...(data as unknown as BoardReport),
          actions: ((data as { actions?: BoardAction[] }).actions ?? []) as BoardAction[],
        });
        if (!options?.silent) toast.success('Board report saved');
      } catch (error) {
        console.error('Error saving board report:', error);
        toast.error('Could not save the board report');
      } finally {
        setSaving(false);
      }
    },
    [userId, report],
  );

  const issueToBoard = useCallback(async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const version = (snapshots[0]?.version ?? 0) + 1;
      const payload = {
        ratings: Object.values(ratings),
        report,
      };
      const { data, error } = await supabase
        .from('board_summary_snapshots')
        .insert({
          user_id: userId,
          version,
          payload: payload as unknown as never,
          is_demo: report.is_demo,
        })
        .select()
        .single();
      if (error) throw error;
      setSnapshots((prev) => [data as unknown as BoardSnapshot, ...prev]);
      toast.success(`Version ${version} issued to the board`);
    } catch (error) {
      console.error('Error issuing board report:', error);
      toast.error('Could not issue the report');
    } finally {
      setSaving(false);
    }
  }, [userId, snapshots, ratings, report]);

  const notesForPrefixes = useCallback(
    (prefixes: string[]) =>
      notes.filter((note) => prefixes.some((prefix) => note.module_id.startsWith(prefix))),
    [notes],
  );

  const rollUp = useMemo(() => {
    let red = 0;
    let amber = 0;
    let green = 0;
    let unrated = 0;
    BOARD_SCORECARD_ROWS.forEach((row) => {
      const rating = ratings[row.key]?.rating;
      if (!rating) unrated += 1;
      else if (rating === 'nascent') red += 1;
      else if (rating === 'developing') amber += 1;
      else green += 1;
    });
    return { red, amber, green, unrated, total: BOARD_SCORECARD_ROWS.length };
  }, [ratings]);

  const isDemo = useMemo(
    () => report.is_demo || Object.values(ratings).some((r) => r.is_demo),
    [report.is_demo, ratings],
  );

  return {
    userId,
    loading,
    saving,
    ratings,
    report,
    snapshots,
    notes,
    notesAvailable,
    notesForPrefixes,
    rollUp,
    isDemo,
    saveRating,
    saveReport,
    issueToBoard,
    reload: load,
    setRatings,
    setReport,
  };
};
