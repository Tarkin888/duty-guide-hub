/**
 * A "pack" is the fully resolved board paper: cover, human-authored content,
 * and the read-only evidence (scorecard, programme status, regulatory entries)
 * resolved to their values at a given moment. Issued snapshots store a pack in
 * board_paper_snapshots.frozen_content. Nothing here computes a rating.
 */
import { supabase } from "@/integrations/supabase/client";
import { BOARD_SCORECARD_ROWS, RATING_BY_VALUE, BoardRating } from "@/config/boardSummaryConfig";
import { MODULE_REGISTRY } from "@/config/moduleRegistry";
import { regulatoryUpdates } from "@/data/regulatoryUpdatesData";
import { BoardPaperContent, normaliseContent } from "@/lib/boardPaperContent";

export interface PackCover { title: string; firm_name: string; reporting_period: string; committee: string; author: string }
export interface PackScorecardRow { key: string; title: string; rating: BoardRating | null; rating_label: string | null }
export interface PackModule { id: string; name: string }
export interface PackRegEntry { id: string; title: string; date: string; status: string }

export interface BoardPack {
  schema: 1;
  resolved_at: string;
  cover: PackCover;
  content: BoardPaperContent;
  scorecard: { state: "ok" | "empty" | "unavailable"; illustrative: boolean; rows: PackScorecardRow[] };
  programme: { state: "ok" | "unavailable"; total: number; complete: PackModule[]; outstanding: PackModule[] };
  regulatory: PackRegEntry[];
}

export interface RatingRow { row_key: string; rating: BoardRating; is_demo: boolean }

export interface Evidence {
  ratings: RatingRow[] | null; // null = unavailable
  checked: Set<string> | null; // null = unavailable
}

export const loadEvidence = async (userId: string): Promise<Evidence> => {
  const [r, p] = await Promise.all([
    supabase.from("board_summary_ratings").select("row_key,rating,is_demo").eq("user_id", userId),
    supabase.from("module_progress").select("module_code,checked_items").eq("user_id", userId),
  ]);
  let checked: Set<string> | null = null;
  if (!p.error) {
    checked = new Set<string>();
    (p.data ?? []).forEach((row) => Array.isArray(row.checked_items) && (row.checked_items as string[]).forEach((k) => checked!.add(k)));
  }
  return { ratings: r.error ? null : ((r.data ?? []) as RatingRow[]), checked };
};

export const buildPack = (cover: PackCover, content: BoardPaperContent, ev: Evidence): BoardPack => {
  const byKey: Record<string, RatingRow> = {};
  (ev.ratings ?? []).forEach((r) => { byKey[r.row_key] = r; });
  const withItems = MODULE_REGISTRY.filter((m) => m.items.length > 0);
  const complete = ev.checked ? withItems.filter((m) => m.items.every((k) => ev.checked!.has(k))) : [];
  const outstanding = ev.checked ? withItems.filter((m) => !complete.includes(m)) : [];
  return {
    schema: 1,
    resolved_at: new Date().toISOString(),
    cover,
    content,
    scorecard: {
      state: ev.ratings === null ? "unavailable" : ev.ratings.length === 0 ? "empty" : "ok",
      illustrative: (ev.ratings ?? []).some((r) => r.is_demo),
      rows: BOARD_SCORECARD_ROWS.map((row) => {
        const r = byKey[row.key];
        return { key: row.key, title: row.title, rating: r?.rating ?? null, rating_label: r ? RATING_BY_VALUE[r.rating]?.label ?? r.rating : null };
      }),
    },
    programme: {
      state: ev.checked ? "ok" : "unavailable",
      total: withItems.length,
      complete: complete.map((m) => ({ id: m.id, name: m.name })),
      outstanding: outstanding.map((m) => ({ id: m.id, name: m.name })),
    },
    regulatory: regulatoryUpdates
      .filter((u) => content.regulatory.included_ids.includes(u.id))
      .map((u) => ({ id: u.id, title: u.title, date: u.date, status: u.status })),
  };
};

/** Read a stored frozen_content safely (older/partial shapes still render). */
export const readPack = (raw: unknown): BoardPack => {
  const r = (raw && typeof raw === "object" ? raw : {}) as Partial<BoardPack>;
  return {
    schema: 1,
    resolved_at: r.resolved_at ?? "",
    cover: { title: "", firm_name: "", reporting_period: "", committee: "", author: "", ...(r.cover ?? {}) },
    content: normaliseContent(r.content),
    scorecard: r.scorecard ?? { state: "unavailable", illustrative: false, rows: [] },
    programme: r.programme ?? { state: "unavailable", total: 0, complete: [], outstanding: [] },
    regulatory: Array.isArray(r.regulatory) ? r.regulatory : [],
  };
};

export const fmtLongDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
