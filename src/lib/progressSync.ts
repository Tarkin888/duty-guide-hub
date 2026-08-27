import { supabase } from '@/integrations/supabase/client';
import {
  useProgressStore,
  type ModuleMeta,
  type ModuleActivityRecord,
} from '@/stores/progressStore';
import {
  ALL_MODULE_IDS,
  getModuleItemKeys,
  isKnownItemKey,
  normalizeModuleId,
} from '@/config/moduleRegistry';

/**
 * Account-level progress sync.
 *
 * Module progress lives in Supabase (`module_progress`), one row per module per
 * user, so completion state follows the account rather than the browser. The
 * Zustand store is an in-memory cache of those rows: it is hydrated on sign-in
 * and every change is upserted back.
 */

type Row = {
  module_code: string;
  status: 'not_started' | 'in_progress' | 'complete';
  completed_at: string | null;
  last_accessed_at: string | null;
  manual_complete: boolean;
  manual_in_progress: boolean;
  time_spent_seconds: number;
  tabs_viewed: string[];
  template_downloads: string[];
  checked_items: string[];
  created_at?: string;
};

let currentUserId: string | null = null;
let unsubscribe: (() => void) | null = null;
let lastSerialised = new Map<string, string>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;

const asArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : [];

/** Builds the row payload for one module, or null when the module has no data yet. */
function buildRow(moduleId: string): Row | null {
  const state = useProgressStore.getState();
  const meta: ModuleMeta = state.moduleMeta[moduleId] || {};
  const activity: ModuleActivityRecord = state.moduleActivity[moduleId] || {
    tabsViewed: [],
    templateDownloads: [],
    timeSpentSeconds: 0,
  };
  const checkedItems = getModuleItemKeys(moduleId).filter(
    (key) => state.checkedItems[key] === true
  );
  const progress = state.getModuleStatus(moduleId);

  const hasData =
    checkedItems.length > 0 ||
    activity.tabsViewed.length > 0 ||
    activity.templateDownloads.length > 0 ||
    activity.timeSpentSeconds > 0 ||
    meta.manualComplete === true ||
    meta.manualInProgress === true ||
    Boolean(meta.completedAt) ||
    Boolean(meta.lastAccessedAt);

  if (!hasData) return null;

  return {
    module_code: moduleId,
    status:
      progress.status === 'complete'
        ? 'complete'
        : progress.status === 'in-progress'
          ? 'in_progress'
          : 'not_started',
    completed_at: meta.completedAt ?? null,
    last_accessed_at: meta.lastAccessedAt ?? null,
    manual_complete: meta.manualComplete === true,
    manual_in_progress: meta.manualInProgress === true,
    time_spent_seconds: Math.round(activity.timeSpentSeconds),
    tabs_viewed: activity.tabsViewed,
    template_downloads: activity.templateDownloads,
    checked_items: checkedItems,
  };
}

async function flush() {
  flushTimer = null;
  const userId = currentUserId;
  if (!userId) return;

  const upserts: (Row & { user_id: string })[] = [];
  const deletes: string[] = [];

  for (const moduleId of ALL_MODULE_IDS) {
    const row = buildRow(moduleId);
    const serialised = row ? JSON.stringify(row) : '';
    if (lastSerialised.get(moduleId) === serialised) continue;
    lastSerialised.set(moduleId, serialised);
    if (row) upserts.push({ ...row, user_id: userId });
    else deletes.push(moduleId);
  }

  try {
    if (upserts.length > 0) {
      const { error } = await supabase
        .from('module_progress')
        .upsert(upserts, { onConflict: 'user_id,module_code' });
      if (error) throw error;
    }
    if (deletes.length > 0) {
      const { error } = await supabase
        .from('module_progress')
        .delete()
        .eq('user_id', userId)
        .in('module_code', deletes);
      if (error) throw error;
    }
  } catch (error) {
    console.error('[progressSync] Failed to save progress:', error);
    // Force a retry on the next change rather than silently dropping the write
    upserts.forEach((row) => lastSerialised.delete(row.module_code));
    deletes.forEach((code) => lastSerialised.delete(code));
  }
}

function scheduleFlush() {
  if (!currentUserId) return;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    void flush();
  }, 600);
}

/** Loads the signed-in user's rows into the store. */
export async function hydrateProgressForUser(userId: string): Promise<void> {
  currentUserId = userId;
  lastSerialised = new Map();

  const { data, error } = await supabase
    .from('module_progress')
    .select(
      'module_code, status, completed_at, last_accessed_at, manual_complete, manual_in_progress, time_spent_seconds, tabs_viewed, template_downloads, checked_items, created_at'
    )
    .eq('user_id', userId);

  if (error) {
    console.error('[progressSync] Failed to load progress:', error);
    useProgressStore.getState().setHydrated(false, error.message);
    return;
  }

  const checkedItems: Record<string, boolean> = {};
  const moduleMeta: Record<string, ModuleMeta> = {};
  const moduleActivity: Record<string, ModuleActivityRecord> = {};
  let startDate: string | null = null;

  for (const raw of data || []) {
    const moduleId = normalizeModuleId(raw.module_code);
    if (!ALL_MODULE_IDS.includes(moduleId)) continue;

    asArray(raw.checked_items).forEach((key) => {
      if (isKnownItemKey(key)) checkedItems[key] = true;
    });

    moduleMeta[moduleId] = {
      completedAt: raw.completed_at ?? undefined,
      lastAccessedAt: raw.last_accessed_at ?? undefined,
      manualComplete: raw.manual_complete ? true : undefined,
      manualInProgress: raw.manual_in_progress ? true : undefined,
    };

    moduleActivity[moduleId] = {
      tabsViewed: asArray(raw.tabs_viewed),
      templateDownloads: asArray(raw.template_downloads),
      timeSpentSeconds: raw.time_spent_seconds || 0,
    };

    const created = raw.created_at;
    if (created && (!startDate || created < startDate)) startDate = created;
  }

  useProgressStore.getState().hydrateFromRemote({
    checkedItems,
    moduleMeta,
    moduleActivity,
    startDate,
  });

  // Snapshot the loaded state so the first flush only sends genuine changes
  for (const moduleId of ALL_MODULE_IDS) {
    const row = buildRow(moduleId);
    lastSerialised.set(moduleId, row ? JSON.stringify(row) : '');
  }

  if (!unsubscribe) {
    unsubscribe = useProgressStore.subscribe(() => scheduleFlush());
  }
}

/** Clears the in-memory cache when the user signs out. */
export function clearProgressSync(): void {
  currentUserId = null;
  lastSerialised = new Map();
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  useProgressStore.getState().clearLocalState();
}

/** Best-effort immediate save (used before unload). */
export function flushProgressNow(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  void flush();
}

/**
 * Removes the pre-migration localStorage keys that are no longer read or written
 * anywhere in the app. Safe to call repeatedly: localStorage.removeItem is a
 * no-op when the key is absent. Does NOT touch unrelated, still-active UI-state
 * keys (onboarding, sidebar, search, filter).
 */
const LEGACY_PROGRESS_KEYS = [
  'consumer-duty-progress-v3',
  'module-time-spent',
  'module-template-downloads',
];

export function clearLegacyProgressStorage(): void {
  try {
    for (const key of LEGACY_PROGRESS_KEYS) {
      localStorage.removeItem(key);
    }
    // Per-module tab-viewed keys use a shared prefix.
    const tabPrefix = 'module-tabs-viewed-';
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(tabPrefix)) keysToRemove.push(k);
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // localStorage may be unavailable (private mode / disabled) — ignore.
  }
}
