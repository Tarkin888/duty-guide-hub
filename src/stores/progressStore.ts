import { create, type StateCreator } from 'zustand';
import { toast } from 'sonner';
import {
  MODULE_REGISTRY,
  MODULE_CATEGORIES,
  TOTAL_MODULES,
  TOTAL_CHECKLIST_ITEMS,
  ALL_ITEM_KEYS,
  CATEGORY_NAMES,
  CATEGORY_KEYS,
  ALL_MODULE_IDS,
  STORAGE_ID_TO_MODULE_ID,
  normalizeModuleId,
  getModuleDisplayName,
  getModuleDefinition,
  getModuleItemKeys,
  makeItemKey,
  isKnownItemKey,
  type CategoryKey,
} from '@/config/moduleRegistry';

export {
  MODULE_CATEGORIES,
  TOTAL_MODULES,
  TOTAL_CHECKLIST_ITEMS,
  CATEGORY_NAMES,
  CATEGORY_KEYS,
  normalizeModuleId,
  getModuleDisplayName,
  makeItemKey,
};
export type { CategoryKey };

export type ModuleStatusValue = 'not-started' | 'in-progress' | 'complete';

export interface ModuleProgress {
  moduleId: string;
  status: ModuleStatusValue;
  completedAt?: string;
  lastAccessedAt?: string;
  /** Number of checklist items ticked for this module */
  completedItems: number;
  /** Fixed number of checklist items for this module (from the static registry) */
  totalItems: number;
  /** Proportional completion: 100 when the module is explicitly marked complete */
  percentage: number;
  /** Percentage derived purely from ticked checklist items */
  itemPercentage: number;
  /** True when the user has explicitly forced this module to 100% */
  isMarkedComplete: boolean;
}


export interface Activity {
  id: string;
  type: 'module_completed' | 'module_started' | 'checklist_updated';
  moduleId: string;
  moduleName: string;
  timestamp: string;
}

export interface AggregateProgress {
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
  percentage: number;
}

export interface ModuleMeta {
  completedAt?: string;
  lastAccessedAt?: string;
  /** Explicitly marked complete by the user: forces this module to 100% */
  manualComplete?: boolean;
  /** Explicitly marked in progress by the user (persists with zero ticked items) */
  manualInProgress?: boolean;
}

/** Engagement signals used by completion validation (tabs, templates, time) */
export interface ModuleActivityRecord {
  tabsViewed: string[];
  templateDownloads: string[];
  timeSpentSeconds: number;
}

const EMPTY_ACTIVITY: ModuleActivityRecord = {
  tabsViewed: [],
  templateDownloads: [],
  timeSpentSeconds: 0,
};

interface ProgressState {
  /** THE single source of truth: which checklist items are ticked */
  checkedItems: Record<string, boolean>;
  moduleMeta: Record<string, ModuleMeta>;
  moduleActivity: Record<string, ModuleActivityRecord>;
  activities: Activity[];
  startDate: string | null;
  /** True once the signed-in user's rows have been loaded from the backend */
  hydrated: boolean;
  hydrationError: string | null;

  // Actions
  setChecklistItem: (storageId: string, stepNumber: number, itemId: string, checked: boolean) => void;
  setStepItems: (storageId: string, stepNumber: number, checked: boolean) => void;
  markModuleComplete: (moduleId: string, showToast?: boolean) => void;
  markModuleInProgress: (moduleId: string, showToast?: boolean) => void;
  reopenModule: (moduleId: string) => void;
  resetModuleProgress: (moduleId: string, showToast?: boolean) => void;
  updateLastAccessed: (moduleId: string) => void;
  resetAllProgress: () => void;
  resetStartDate: () => void;
  initializeStartDate: () => void;
  addActivity: (type: Activity['type'], moduleId: string, moduleName: string) => void;
  clearActivities: () => void;
  validateAndRepairState: () => { valid: boolean; repaired: boolean; errors: string[] };

  // Engagement tracking (account-level, stored in module_progress)
  markTabViewed: (moduleId: string, tab: string) => void;
  resetTabsViewed: (moduleId: string) => void;
  addTemplateDownload: (moduleId: string, templateId: string) => void;
  addTimeSpentSeconds: (moduleId: string, seconds: number) => void;
  getModuleActivity: (moduleId: string) => ModuleActivityRecord;

  // Sync plumbing
  hydrateFromRemote: (payload: {
    checkedItems: Record<string, boolean>;
    moduleMeta: Record<string, ModuleMeta>;
    moduleActivity: Record<string, ModuleActivityRecord>;
    startDate: string | null;
  }) => void;
  setHydrated: (hydrated: boolean, error?: string | null) => void;
  clearLocalState: () => void;

  // Getters (derived - never stored)
  isItemChecked: (storageId: string, stepNumber: number, itemId: string) => boolean;
  getModuleStatus: (moduleId: string) => ModuleProgress;
  getCategoryProgress: (category: CategoryKey) => AggregateProgress;
  getOverallProgress: () => AggregateProgress;
  getCheckedItemsCount: () => number;
  getCompletedModulesCount: () => number;
  getInProgressModules: () => ModuleProgress[];
  getDaysSinceStart: () => number;
  getStartDate: () => string | null;
  getFormattedStartDate: () => string | null;
  getActivities: () => Activity[];
  getAverageDaysPerModule: () => number;
  getEstimatedCompletionDate: () => Date | null;
}

// ---------------------------------------------------------------------------
// Pure derivation helpers - every view uses these, nothing counts on its own
// ---------------------------------------------------------------------------

export function deriveModuleProgress(
  moduleId: string,
  checkedItems: Record<string, boolean>,
  moduleMeta: Record<string, ModuleMeta> = {}
): ModuleProgress {
  const canonicalId = normalizeModuleId(moduleId);
  const itemKeys = getModuleItemKeys(canonicalId);
  const meta = moduleMeta[canonicalId] || {};
  const totalItems = itemKeys.length;
  const completedItems = itemKeys.reduce(
    (sum, key) => sum + (checkedItems[key] === true ? 1 : 0),
    0
  );

  const itemPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const isMarkedComplete = meta.manualComplete === true;

  let status: ModuleStatusValue = 'not-started';
  if (isMarkedComplete) {
    status = 'complete';
  } else if (totalItems > 0 && completedItems === totalItems) {
    status = 'complete';
  } else if (completedItems > 0 || meta.manualInProgress === true) {
    status = 'in-progress';
  } else if (totalItems === 0 && meta.lastAccessedAt) {
    status = 'in-progress';
  }

  return {
    moduleId: canonicalId,
    status,
    completedAt: status === 'complete' ? meta.completedAt : undefined,
    lastAccessedAt: meta.lastAccessedAt,
    completedItems,
    totalItems,
    // Marked complete forces 100%; otherwise the module's own item proportion
    percentage: isMarkedComplete ? 100 : itemPercentage,
    itemPercentage,
    isMarkedComplete,
  };
}

/**
 * Aggregate for a set of modules. The percentage is the raw completion ratio:
 * (completed modules / total modules) * 100, so it always matches the
 * "Completed: X of Y" count shown alongside it in the UI.
 */
function deriveAggregate(
  moduleIds: string[],
  checkedItems: Record<string, boolean>,
  moduleMeta: Record<string, ModuleMeta>
): AggregateProgress {
  let completed = 0;
  let inProgress = 0;
  for (const id of moduleIds) {
    const progress = deriveModuleProgress(id, checkedItems, moduleMeta);
    if (progress.status === 'complete') completed++;
    else if (progress.status === 'in-progress') inProgress++;
  }
  const total = moduleIds.length;
  return {
    completed,
    inProgress,
    notStarted: total - completed - inProgress,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function deriveCheckedItemsCount(checkedItems: Record<string, boolean>): number {
  // Counted against the static registry only - unknown/legacy keys are ignored
  return ALL_ITEM_KEYS.reduce((sum, key) => sum + (checkedItems[key] === true ? 1 : 0), 0);
}

function newActivity(
  type: Activity['type'],
  moduleId: string,
  moduleName: string,
  timestamp: string
): Activity {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    type,
    moduleId,
    moduleName,
    timestamp,
  };
}

export const useProgressStore = create<ProgressState>()(
  ((set, get) => ({
      checkedItems: {},
      moduleMeta: {},
      moduleActivity: {},
      activities: [],
      startDate: null,
      hydrated: false,
      hydrationError: null,

      hydrateFromRemote: ({ checkedItems, moduleMeta, moduleActivity, startDate }) =>
        set({
          checkedItems,
          moduleMeta,
          moduleActivity,
          startDate,
          hydrated: true,
          hydrationError: null,
          activities: Object.entries(moduleMeta)
            .filter(([, meta]) => Boolean((meta as ModuleMeta).completedAt))
            .map(([moduleId, meta]) =>
              newActivity(
                'module_completed',
                moduleId,
                getModuleDisplayName(moduleId),
                (meta as ModuleMeta).completedAt as string
              )
            )
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
            .slice(0, 50),
        }),

      setHydrated: (hydrated, error = null) => set({ hydrated, hydrationError: error }),

      clearLocalState: () =>
        set({
          checkedItems: {},
          moduleMeta: {},
          moduleActivity: {},
          activities: [],
          startDate: null,
          hydrated: false,
          hydrationError: null,
        }),

      markTabViewed: (moduleId, tab) => {
        const canonicalId = normalizeModuleId(moduleId);
        set((state) => {
          const current = state.moduleActivity[canonicalId] || EMPTY_ACTIVITY;
          if (current.tabsViewed.includes(tab)) return state;
          return {
            moduleActivity: {
              ...state.moduleActivity,
              [canonicalId]: { ...current, tabsViewed: [...current.tabsViewed, tab] },
            },
          };
        });
      },

      resetTabsViewed: (moduleId) => {
        const canonicalId = normalizeModuleId(moduleId);
        set((state) => {
          const current = state.moduleActivity[canonicalId];
          if (!current) return state;
          return {
            moduleActivity: {
              ...state.moduleActivity,
              [canonicalId]: { ...current, tabsViewed: [] },
            },
          };
        });
      },

      addTemplateDownload: (moduleId, templateId) => {
        const canonicalId = normalizeModuleId(moduleId);
        set((state) => {
          const current = state.moduleActivity[canonicalId] || EMPTY_ACTIVITY;
          if (current.templateDownloads.includes(templateId)) return state;
          return {
            moduleActivity: {
              ...state.moduleActivity,
              [canonicalId]: {
                ...current,
                templateDownloads: [...current.templateDownloads, templateId],
              },
            },
          };
        });
      },

      addTimeSpentSeconds: (moduleId, seconds) => {
        if (!Number.isFinite(seconds) || seconds <= 0) return;
        const canonicalId = normalizeModuleId(moduleId);
        set((state) => {
          const current = state.moduleActivity[canonicalId] || EMPTY_ACTIVITY;
          return {
            moduleActivity: {
              ...state.moduleActivity,
              [canonicalId]: {
                ...current,
                timeSpentSeconds: current.timeSpentSeconds + Math.round(seconds),
              },
            },
          };
        });
      },

      getModuleActivity: (moduleId) =>
        get().moduleActivity[normalizeModuleId(moduleId)] || EMPTY_ACTIVITY,

      setChecklistItem: (storageId, stepNumber, itemId, checked) => {
        const key = makeItemKey(storageId, stepNumber, itemId);
        const canonicalId = normalizeModuleId(storageId);
        const now = new Date().toISOString();

        if (!isKnownItemKey(key)) {
          console.warn('[ProgressStore] Unknown checklist item key ignored:', key);
        }

        set((state) => {
          const before = deriveModuleProgress(canonicalId, state.checkedItems, state.moduleMeta);
          const checkedItems = { ...state.checkedItems };
          if (checked) checkedItems[key] = true;
          else delete checkedItems[key];

          const moduleMeta = {
            ...state.moduleMeta,
            [canonicalId]: { ...state.moduleMeta[canonicalId], lastAccessedAt: now },
          };

          const after = deriveModuleProgress(canonicalId, checkedItems, moduleMeta);
          if (after.status === 'complete' && before.status !== 'complete') {
            moduleMeta[canonicalId] = { ...moduleMeta[canonicalId], completedAt: now };
          }

          let activities = state.activities;
          if (after.status === 'complete' && before.status !== 'complete') {
            activities = [
              newActivity('module_completed', canonicalId, getModuleDisplayName(canonicalId), now),
              ...activities,
            ].slice(0, 50);
          } else if (checked) {
            activities = [
              newActivity('checklist_updated', canonicalId, getModuleDisplayName(canonicalId), now),
              ...activities,
            ].slice(0, 50);
          }

          return {
            checkedItems,
            moduleMeta,
            activities,
            startDate: state.startDate || now,
          };
        });

        window.dispatchEvent(new Event('module-progress-updated'));
      },

      setStepItems: (storageId, stepNumber, checked) => {
        const canonicalId = normalizeModuleId(storageId);
        const prefix = `${storageId}::step${stepNumber}::`;
        const keys = getModuleItemKeys(canonicalId).filter((key) => key.startsWith(prefix));
        const now = new Date().toISOString();

        set((state) => {
          const checkedItems = { ...state.checkedItems };
          keys.forEach((key) => {
            if (checked) checkedItems[key] = true;
            else delete checkedItems[key];
          });
          return {
            checkedItems,
            moduleMeta: {
              ...state.moduleMeta,
              [canonicalId]: { ...state.moduleMeta[canonicalId], lastAccessedAt: now },
            },
            startDate: state.startDate || now,
          };
        });

        window.dispatchEvent(new Event('module-progress-updated'));
      },

      markModuleComplete: (moduleId, showToast = true) => {
        const canonicalId = normalizeModuleId(moduleId);
        const now = new Date().toISOString();

        // Mark Complete sets an explicit flag that forces this module to 100%.
        // Individual checklist ticks are left untouched, so unchecking items
        // after reopening the module lowers the percentage again.
        set((state) => ({
          moduleMeta: {
            ...state.moduleMeta,
            [canonicalId]: {
              ...state.moduleMeta[canonicalId],
              completedAt: state.moduleMeta[canonicalId]?.completedAt || now,
              lastAccessedAt: now,
              manualComplete: true,
              manualInProgress: undefined,
            },
          },
          activities: [
            newActivity('module_completed', canonicalId, getModuleDisplayName(canonicalId), now),
            ...state.activities,
          ].slice(0, 50),
          startDate: state.startDate || now,
        }));

        window.dispatchEvent(new Event('module-progress-updated'));

        if (showToast) {
          toast.success('Status updated', {
            description: `${getModuleDisplayName(canonicalId)} marked as complete.`,
          });
        }
      },

      markModuleInProgress: (moduleId, showToast = true) => {
        const canonicalId = normalizeModuleId(moduleId);
        const now = new Date().toISOString();

        set((state) => ({
          moduleMeta: {
            ...state.moduleMeta,
            [canonicalId]: {
              ...state.moduleMeta[canonicalId],
              lastAccessedAt: now,
              completedAt: undefined,
              manualComplete: undefined,
              manualInProgress: true,
            },
          },
          activities: [
            newActivity('module_started', canonicalId, getModuleDisplayName(canonicalId), now),
            ...state.activities,
          ].slice(0, 50),
          startDate: state.startDate || now,
        }));

        window.dispatchEvent(new Event('module-progress-updated'));

        if (showToast) {
          toast.success('Status updated', {
            description: `${getModuleDisplayName(canonicalId)} is now in progress.`,
          });
        }
      },

      reopenModule: (moduleId) => {
        const canonicalId = normalizeModuleId(moduleId);
        const now = new Date().toISOString();

        // Clears only the explicit completion flag - ticked checklist items are
        // preserved, so the module falls back to its real item-based percentage.
        // The status label must reflect the real ticked count: with zero items
        // checked the module is "Not Started", not "In Progress".
        const checkedItems = get().checkedItems;
        const hasCheckedItems = getModuleItemKeys(canonicalId).some(
          (key) => checkedItems[key] === true
        );

        set((state) => ({
          moduleMeta: {
            ...state.moduleMeta,
            [canonicalId]: {
              ...state.moduleMeta[canonicalId],
              completedAt: undefined,
              lastAccessedAt: now,
              manualComplete: undefined,
              manualInProgress: hasCheckedItems ? true : undefined,
            },
          },
        }));

        window.dispatchEvent(new Event('module-progress-updated'));

        toast.info('Module reopened', {
          description: hasCheckedItems
            ? `${getModuleDisplayName(canonicalId)} is back in progress; your ticked items have been kept.`
            : `${getModuleDisplayName(canonicalId)} is back to not started; no items are currently ticked.`,
        });
      },

      resetModuleProgress: (moduleId, showToast = true) => {
        const canonicalId = normalizeModuleId(moduleId);
        const definition = getModuleDefinition(canonicalId);

        set((state) => {
          const checkedItems = { ...state.checkedItems };
          definition?.items.forEach((key) => {
            delete checkedItems[key];
          });
          const moduleMeta = { ...state.moduleMeta };
          delete moduleMeta[canonicalId];
          return { checkedItems, moduleMeta };
        });

        window.dispatchEvent(new Event('module-progress-updated'));

        if (showToast) {
          toast.info('Progress reset', {
            description: `${getModuleDisplayName(canonicalId)} reset to Not Started.`,
          });
        }
      },

      updateLastAccessed: (moduleId) => {
        const canonicalId = normalizeModuleId(moduleId);
        set((state) => {
          if (!state.moduleMeta[canonicalId]) return state;
          return {
            moduleMeta: {
              ...state.moduleMeta,
              [canonicalId]: {
                ...state.moduleMeta[canonicalId],
                lastAccessedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      resetAllProgress: () => {
        set({ checkedItems: {}, moduleMeta: {}, activities: [], startDate: null });

        try {
          localStorage.removeItem('consumer-duty-progress');
          localStorage.removeItem('consumer-duty-progress-v2');
          localStorage.removeItem('consumer-duty-checklists');
          localStorage.removeItem('consumer-duty-activity');
          localStorage.removeItem('consumer-duty-user-data');
          localStorage.removeItem('implementation-start-date');

          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('checklist-')) keysToRemove.push(key);
          }
          keysToRemove.forEach((key) => localStorage.removeItem(key));
        } catch (error) {
          console.error('Error clearing legacy data:', error);
        }

        window.dispatchEvent(new Event('module-progress-updated'));
        toast.success('All progress has been reset');
      },

      resetStartDate: () => {
        set({ startDate: null });
        toast.success('Start date has been reset', {
          description: 'A new start date will be set when you next update a module.',
        });
      },

      initializeStartDate: () => {
        const state = get();
        if (state.startDate) {
          const startDate = new Date(state.startDate);
          if (isNaN(startDate.getTime()) || startDate > new Date()) {
            set({ startDate: null });
          }
        }
      },

      addActivity: (type, moduleId, moduleName) => {
        const now = new Date().toISOString();
        set((state) => ({
          activities: [newActivity(type, moduleId, moduleName, now), ...state.activities].slice(0, 50),
          startDate: state.startDate || now,
        }));
      },

      clearActivities: () => set({ activities: [] }),

      validateAndRepairState: () => {
        const state = get();
        const errors: string[] = [];
        let repaired = false;

        const checkedItems: Record<string, boolean> = {};
        Object.entries(state.checkedItems).forEach(([key, value]) => {
          if (value !== true) {
            repaired = true;
            return;
          }
          if (!isKnownItemKey(key)) {
            errors.push(`Unknown checklist item: ${key}`);
            repaired = true;
            return;
          }
          checkedItems[key] = true;
        });

        const moduleMeta = { ...state.moduleMeta };
        Object.keys(moduleMeta).forEach((moduleId) => {
          if (!ALL_MODULE_IDS.includes(moduleId)) {
            errors.push(`Unknown module: ${moduleId}`);
            delete moduleMeta[moduleId];
            repaired = true;
          }
        });

        if (repaired) set({ checkedItems, moduleMeta });

        return { valid: errors.length === 0, repaired, errors };
      },

      isItemChecked: (storageId, stepNumber, itemId) =>
        get().checkedItems[makeItemKey(storageId, stepNumber, itemId)] === true,

      getModuleStatus: (moduleId) => {
        const state = get();
        return deriveModuleProgress(moduleId, state.checkedItems, state.moduleMeta);
      },

      getCategoryProgress: (category) => {
        const state = get();
        return deriveAggregate(MODULE_CATEGORIES[category] || [], state.checkedItems, state.moduleMeta);
      },

      getOverallProgress: () => {
        const state = get();
        return deriveAggregate(ALL_MODULE_IDS, state.checkedItems, state.moduleMeta);
      },

      getCheckedItemsCount: () => deriveCheckedItemsCount(get().checkedItems),

      getCompletedModulesCount: () => get().getOverallProgress().completed,

      getInProgressModules: () => {
        const state = get();
        return ALL_MODULE_IDS.map((id) =>
          deriveModuleProgress(id, state.checkedItems, state.moduleMeta)
        ).filter((module) => module.status === 'in-progress');
      },

      getDaysSinceStart: () => {
        const state = get();
        if (!state.startDate) return -1;
        const start = new Date(state.startDate);
        const now = new Date();
        const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Math.max(
          0,
          Math.floor((nowMidnight.getTime() - startMidnight.getTime()) / (1000 * 60 * 60 * 24))
        );
      },

      getStartDate: () => get().startDate,

      getFormattedStartDate: () => {
        const { startDate } = get();
        if (!startDate) return null;
        const date = new Date(startDate);
        if (isNaN(date.getTime())) return null;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}/${date.getFullYear()}`;
      },

      getActivities: () => get().activities,

      getAverageDaysPerModule: () => {
        const state = get();
        const completed = state.getOverallProgress().completed;
        if (completed === 0 || !state.startDate) return 0;
        const days = Math.max(1, state.getDaysSinceStart());
        return Math.round((days / completed) * 10) / 10;
      },

      getEstimatedCompletionDate: () => {
        const state = get();
        const completed = state.getOverallProgress().completed;
        if (completed === 0 || !state.startDate) return null;
        const remaining = TOTAL_MODULES - completed;
        if (remaining <= 0) return new Date();
        const avgDays = state.getAverageDaysPerModule();
        if (avgDays <= 0) return null;
        const date = new Date();
        date.setDate(date.getDate() + Math.ceil(remaining * avgDays));
        return date;
      },
    })) as StateCreator<ProgressState, [], []>
);

// ---------------------------------------------------------------------------
// Reactive hooks - every view reads progress through these
// ---------------------------------------------------------------------------

export function useModuleProgress(moduleId: string): ModuleProgress {
  const checkedItems = useProgressStore((state) => state.checkedItems);
  const moduleMeta = useProgressStore((state) => state.moduleMeta);
  return deriveModuleProgress(moduleId, checkedItems, moduleMeta);
}

export function useOverallProgress(): AggregateProgress {
  const checkedItems = useProgressStore((state) => state.checkedItems);
  const moduleMeta = useProgressStore((state) => state.moduleMeta);
  return deriveAggregate(ALL_MODULE_IDS, checkedItems, moduleMeta);
}

export function useCategoryProgress(category: CategoryKey): AggregateProgress {
  const checkedItems = useProgressStore((state) => state.checkedItems);
  const moduleMeta = useProgressStore((state) => state.moduleMeta);
  return deriveAggregate(MODULE_CATEGORIES[category] || [], checkedItems, moduleMeta);
}

export function useCheckedItemsCount(): { checked: number; total: number; percentage: number } {
  const checkedItems = useProgressStore((state) => state.checkedItems);
  const checked = deriveCheckedItemsCount(checkedItems);
  return {
    checked,
    total: TOTAL_CHECKLIST_ITEMS,
    percentage: TOTAL_CHECKLIST_ITEMS > 0 ? Math.round((checked / TOTAL_CHECKLIST_ITEMS) * 100) : 0,
  };
}

export { STORAGE_ID_TO_MODULE_ID, ALL_MODULE_IDS, getModuleDefinition, getModuleItemKeys };

/**
 * Derived map of every module's progress, keyed by canonical module id.
 * Kept for views that need to look modules up by id - it is always derived,
 * never stored.
 */
export function deriveModulesMap(
  checkedItems: Record<string, boolean>,
  moduleMeta: Record<string, ModuleMeta>
): Record<string, ModuleProgress> {
  const map: Record<string, ModuleProgress> = {};
  for (const id of ALL_MODULE_IDS) {
    map[id] = deriveModuleProgress(id, checkedItems, moduleMeta);
  }
  return map;
}

export function getModulesMap(): Record<string, ModuleProgress> {
  const state = useProgressStore.getState();
  return deriveModulesMap(state.checkedItems, state.moduleMeta);
}

export function useModulesMap(): Record<string, ModuleProgress> {
  const checkedItems = useProgressStore((state) => state.checkedItems);
  const moduleMeta = useProgressStore((state) => state.moduleMeta);
  return deriveModulesMap(checkedItems, moduleMeta);
}

// ---------------------------------------------------------------------------
// THE single progress calculation entry point.
// Every view (dashboard circle, category bars, badges, counters) resolves a
// module's numbers through this one function.
// ---------------------------------------------------------------------------

export interface ModuleProgressSummary {
  moduleId: string;
  checkedItems: number;
  totalItems: number;
  percentComplete: number;
  isMarkedComplete: boolean;
  status: ModuleStatusValue;
}

function toSummary(progress: ModuleProgress): ModuleProgressSummary {
  return {
    moduleId: progress.moduleId,
    checkedItems: progress.completedItems,
    totalItems: progress.totalItems,
    percentComplete: progress.percentage,
    isMarkedComplete: progress.isMarkedComplete,
    status: progress.status,
  };
}

/** Non-reactive read (event handlers, exports, tests) */
export function getModuleProgressSummary(moduleCode: string): ModuleProgressSummary {
  const state = useProgressStore.getState();
  return toSummary(deriveModuleProgress(moduleCode, state.checkedItems, state.moduleMeta));
}

/** Reactive read for components */
export function useModuleProgressSummary(moduleCode: string): ModuleProgressSummary {
  return toSummary(useModuleProgress(moduleCode));
}


