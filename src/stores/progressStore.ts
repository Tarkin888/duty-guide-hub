import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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

interface ModuleMeta {
  completedAt?: string;
  lastAccessedAt?: string;
  /** Explicitly marked complete by the user: forces this module to 100% */
  manualComplete?: boolean;
  /** Explicitly marked in progress by the user (persists with zero ticked items) */
  manualInProgress?: boolean;
}


interface ProgressState {
  /** THE single source of truth: which checklist items are ticked */
  checkedItems: Record<string, boolean>;
  moduleMeta: Record<string, ModuleMeta>;
  activities: Activity[];
  startDate: string | null;
  migratedLegacy: boolean;

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
 * Aggregate for a set of modules. The percentage is PROPORTIONAL: each module
 * contributes its own completion share, so ticking a single item moves the bar.
 */
function deriveAggregate(
  moduleIds: string[],
  checkedItems: Record<string, boolean>,
  moduleMeta: Record<string, ModuleMeta>
): AggregateProgress {
  let completed = 0;
  let inProgress = 0;
  let percentSum = 0;
  for (const id of moduleIds) {
    const progress = deriveModuleProgress(id, checkedItems, moduleMeta);
    if (progress.status === 'complete') completed++;
    else if (progress.status === 'in-progress') inProgress++;
    percentSum += progress.percentage;
  }
  const total = moduleIds.length;
  return {
    completed,
    inProgress,
    notStarted: total - completed - inProgress,
    total,
    percentage: total > 0 ? Math.round(percentSum / total) : 0,
  };

}

export function deriveCheckedItemsCount(checkedItems: Record<string, boolean>): number {
  // Counted against the static registry only - unknown/legacy keys are ignored
  return ALL_ITEM_KEYS.reduce((sum, key) => sum + (checkedItems[key] === true ? 1 : 0), 0);
}

// ---------------------------------------------------------------------------
// One-off migration from the previous storage layout
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'consumer-duty-progress-v3';

interface LegacyResult {
  checkedItems: Record<string, boolean>;
  moduleMeta: Record<string, ModuleMeta>;
  startDate: string | null;
  activities: Activity[];
}

export function migrateLegacyProgress(): LegacyResult {
  const checkedItems: Record<string, boolean> = {};
  const moduleMeta: Record<string, ModuleMeta> = {};
  let startDate: string | null = null;
  let activities: Activity[] = [];

  // 1. Per-step checklist keys: checklist-<storageId>-step<n> => { itemId: boolean }
  try {
    for (const module of MODULE_REGISTRY) {
      for (const key of module.items) {
        const [storageId, step, itemId] = key.split('::');
        const legacyKey = `checklist-${storageId}-${step}`;
        const raw = localStorage.getItem(legacyKey);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed[itemId] === true) {
          checkedItems[key] = true;
        }
      }
    }
  } catch (error) {
    console.error('[ProgressStore] Legacy checklist migration failed:', error);
  }

  // 2. Previous Zustand store (v2) - module statuses, activities and start date
  try {
    const rawV2 = localStorage.getItem('consumer-duty-progress-v2');
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      const state = parsed?.state || {};
      startDate = state.startDate || null;
      if (Array.isArray(state.activities)) activities = state.activities.slice(0, 50);

      Object.entries(state.modules || {}).forEach(([id, value]) => {
        const legacyModule = value as {
          status?: string;
          completedAt?: string;
          lastAccessedAt?: string;
          checklistItems?: Record<string, boolean>;
        };
        const canonicalId = normalizeModuleId(id);
        const definition = getModuleDefinition(canonicalId);
        if (!definition) return;

        moduleMeta[canonicalId] = {
          completedAt: legacyModule.completedAt,
          lastAccessedAt: legacyModule.lastAccessedAt,
          manualComplete:
            definition.items.length === 0 && legacyModule.status === 'complete' ? true : undefined,
        };

        // A module previously marked complete keeps its completion by ticking
        // every registered item, so the new rule holds without losing progress.
        if (legacyModule.status === 'complete') {
          definition.items.forEach((key) => {
            checkedItems[key] = true;
          });
        }

        // Item-level flags stored on the old module record
        Object.entries(legacyModule.checklistItems || {}).forEach(([itemId, checked]) => {
          if (checked !== true) return;
          const match = definition.items.find((key) => key.endsWith(`::${itemId}`));
          if (match) checkedItems[match] = true;
        });
      });
    }
  } catch (error) {
    console.error('[ProgressStore] Legacy store migration failed:', error);
  }

  // 3. Oldest format: consumer-duty-progress
  try {
    const rawV1 = localStorage.getItem('consumer-duty-progress');
    if (rawV1) {
      const parsed = JSON.parse(rawV1);
      Object.entries(parsed || {}).forEach(([id, value]) => {
        const data = value as { status?: string; lastUpdated?: string };
        const definition = getModuleDefinition(normalizeModuleId(id));
        if (!definition) return;
        const canonicalId = definition.id;
        if (data?.status === 'completed' || data?.status === 'complete') {
          definition.items.forEach((key) => {
            checkedItems[key] = true;
          });
          moduleMeta[canonicalId] = {
            ...moduleMeta[canonicalId],
            completedAt: moduleMeta[canonicalId]?.completedAt || data.lastUpdated,
            manualComplete:
              definition.items.length === 0 ? true : moduleMeta[canonicalId]?.manualComplete,
          };
        } else if (data?.status === 'in-progress') {
          moduleMeta[canonicalId] = {
            ...moduleMeta[canonicalId],
            lastAccessedAt: moduleMeta[canonicalId]?.lastAccessedAt || data.lastUpdated,
          };
        }
      });
    }
  } catch (error) {
    console.error('[ProgressStore] V1 migration failed:', error);
  }

  return { checkedItems, moduleMeta, startDate, activities };
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
  persist(
    (set, get) => ({
      checkedItems: {},
      moduleMeta: {},
      activities: [],
      startDate: null,
      migratedLegacy: false,

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
        const definition = getModuleDefinition(canonicalId);
        const now = new Date().toISOString();

        set((state) => {
          const checkedItems = { ...state.checkedItems };
          definition?.items.forEach((key) => {
            checkedItems[key] = true;
          });
          return {
            checkedItems,
            moduleMeta: {
              ...state.moduleMeta,
              [canonicalId]: {
                ...state.moduleMeta[canonicalId],
                completedAt: state.moduleMeta[canonicalId]?.completedAt || now,
                lastAccessedAt: now,
                manualComplete: definition && definition.items.length === 0 ? true : undefined,
              },
            },
            activities: [
              newActivity('module_completed', canonicalId, getModuleDisplayName(canonicalId), now),
              ...state.activities,
            ].slice(0, 50),
            startDate: state.startDate || now,
          };
        });

        window.dispatchEvent(new Event('module-progress-updated'));

        if (showToast) {
          toast.success('Module complete', {
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
              manualComplete: undefined,
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
          toast.info('Module in progress', {
            description: `${getModuleDisplayName(canonicalId)} is now in progress.`,
          });
        }
      },

      reopenModule: (moduleId) => {
        const canonicalId = normalizeModuleId(moduleId);
        const definition = getModuleDefinition(canonicalId);
        const now = new Date().toISOString();

        set((state) => {
          const checkedItems = { ...state.checkedItems };
          // Completion is derived from the checklist, so reopening clears the ticks
          definition?.items.forEach((key) => {
            delete checkedItems[key];
          });
          return {
            checkedItems,
            moduleMeta: {
              ...state.moduleMeta,
              [canonicalId]: {
                ...state.moduleMeta[canonicalId],
                completedAt: undefined,
                lastAccessedAt: now,
                manualComplete: undefined,
              },
            },
          };
        });

        window.dispatchEvent(new Event('module-progress-updated'));

        toast.info('Module reopened', {
          description: `${getModuleDisplayName(canonicalId)} is back in progress and its checklist has been cleared.`,
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
    }),
    {
      name: STORAGE_KEY,
      version: 3,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        checkedItems: state.checkedItems,
        moduleMeta: state.moduleMeta,
        activities: state.activities,
        startDate: state.startDate,
        migratedLegacy: state.migratedLegacy,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state || state.migratedLegacy) return;

        // One-off migration so existing progress is not lost
        const legacy = migrateLegacyProgress();
        state.checkedItems = { ...legacy.checkedItems, ...state.checkedItems };
        state.moduleMeta = { ...legacy.moduleMeta, ...state.moduleMeta };
        state.startDate = state.startDate || legacy.startDate;
        state.activities = state.activities?.length ? state.activities : legacy.activities;
        state.migratedLegacy = true;
      },
    }
  )
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
