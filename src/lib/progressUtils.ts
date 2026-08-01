/**
 * Unified Progress Utilities - all derivations read the single Zustand store,
 * with denominators coming from the static module registry.
 *
 * Rules (used everywhere, no exceptions):
 * - Module status: Complete only if 100% of its registered checklist items are
 *   ticked; In Progress if more than zero are ticked; otherwise Not Started.
 * - Category %: completed modules in category / total modules in category.
 * - Overall %: total completed modules / 20.
 * - Items checked: summed across the static registry only.
 */

import {
  useProgressStore,
  deriveModuleProgress,
  deriveModulesMap,
  useModulesMap,
  useCheckedItemsCount,
  type ModuleProgress,
  type AggregateProgress,
} from '@/stores/progressStore';
import {
  MODULE_CATEGORIES,
  CATEGORY_NAMES,
  CATEGORY_KEYS,
  TOTAL_MODULES,
  TOTAL_CHECKLIST_ITEMS,
  ALL_MODULE_IDS,
  normalizeModuleId,
  getModuleDisplayName,
  getModuleItemKeys,
  type CategoryKey,
} from '@/config/moduleRegistry';

export const ModuleStatus = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  COMPLETE: 'complete',
} as const;

export type ModuleStatusType = typeof ModuleStatus[keyof typeof ModuleStatus];

export const CategoryNames = CATEGORY_NAMES;

export {
  MODULE_CATEGORIES,
  TOTAL_MODULES,
  TOTAL_CHECKLIST_ITEMS,
  normalizeModuleId,
  getModuleDisplayName,
  useCheckedItemsCount,
};
export type { CategoryKey };

export interface ModuleProgressInfo {
  moduleId: string;
  canonicalId: string;
  displayName: string;
  status: ModuleStatusType;
  completedAt?: string;
  lastAccessedAt?: string;
  completedItems: number;
  totalItems: number;
  percentage: number;
}

export interface CategoryProgress extends AggregateProgress {
  categoryKey: CategoryKey;
  categoryName: string;
}

export type OverallProgress = AggregateProgress;

export interface ChecklistProgress {
  completedItems: number;
  totalItems: number;
  percentage: number;
  isComplete: boolean;
}

function toInfo(progress: ModuleProgress): ModuleProgressInfo {
  return {
    moduleId: progress.moduleId,
    canonicalId: progress.moduleId,
    displayName: getModuleDisplayName(progress.moduleId),
    status: progress.status,
    completedAt: progress.completedAt,
    lastAccessedAt: progress.lastAccessedAt,
    completedItems: progress.completedItems,
    totalItems: progress.totalItems,
    percentage: progress.percentage,
  };
}

export function getCanonicalModuleId(moduleId: string): string {
  return normalizeModuleId(moduleId);
}

export function getModuleStatus(moduleId: string): ModuleStatusType {
  return useProgressStore.getState().getModuleStatus(moduleId).status;
}

export function getModuleProgress(moduleId: string): ModuleProgressInfo {
  return toInfo(useProgressStore.getState().getModuleStatus(moduleId));
}

export function getAllModuleStatuses(): Map<string, ModuleProgressInfo> {
  const { checkedItems, moduleMeta } = useProgressStore.getState();
  const map = deriveModulesMap(checkedItems, moduleMeta);
  return new Map(ALL_MODULE_IDS.map((id) => [id, toInfo(map[id])]));
}

function buildCategoryProgress(
  categoryKey: CategoryKey,
  statuses: Map<string, ModuleProgressInfo>
): CategoryProgress {
  const moduleIds = MODULE_CATEGORIES[categoryKey] || [];
  let completed = 0;
  let inProgress = 0;

  for (const moduleId of moduleIds) {
    const status = statuses.get(moduleId)?.status || ModuleStatus.NOT_STARTED;
    if (status === ModuleStatus.COMPLETE) completed++;
    else if (status === ModuleStatus.IN_PROGRESS) inProgress++;
  }

  const total = moduleIds.length;
  return {
    categoryKey,
    categoryName: CATEGORY_NAMES[categoryKey],
    completed,
    inProgress,
    notStarted: total - completed - inProgress,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function calculateCategoryProgress(categoryKey: CategoryKey): CategoryProgress {
  return buildCategoryProgress(categoryKey, getAllModuleStatuses());
}

export function getAllCategoryProgress(): Record<CategoryKey, CategoryProgress> {
  const statuses = getAllModuleStatuses();
  return CATEGORY_KEYS.reduce((acc, key) => {
    acc[key] = buildCategoryProgress(key, statuses);
    return acc;
  }, {} as Record<CategoryKey, CategoryProgress>);
}

export function calculateOverallProgress(): OverallProgress {
  return useProgressStore.getState().getOverallProgress();
}

export function getCompletedModulesCount(): number {
  return calculateOverallProgress().completed;
}

export function getInProgressModules(): ModuleProgressInfo[] {
  return Array.from(getAllModuleStatuses().values()).filter(
    (m) => m.status === ModuleStatus.IN_PROGRESS
  );
}

/**
 * Checklist progress for a module. The denominator comes from the static
 * registry, so it is identical on every screen and never changes on navigation.
 */
export function getModuleChecklistProgress(moduleId: string): ChecklistProgress {
  const progress = useProgressStore.getState().getModuleStatus(moduleId);
  return {
    completedItems: progress.completedItems,
    totalItems: progress.totalItems,
    percentage: progress.percentage,
    isComplete: progress.totalItems > 0 && progress.completedItems === progress.totalItems,
  };
}

export function hasModuleChecklistActivity(moduleId: string): boolean {
  return useProgressStore.getState().getModuleStatus(moduleId).completedItems > 0;
}

export function getModuleTotalItems(moduleId: string): number {
  return getModuleItemKeys(moduleId).length;
}

// ============================================================================
// REACT HOOKS
// ============================================================================

export function useProgressCalculation() {
  const modules = useModulesMap();

  const moduleStatuses = new Map<string, ModuleProgressInfo>(
    ALL_MODULE_IDS.map((id) => [id, toInfo(modules[id])])
  );

  let completed = 0;
  let inProgress = 0;
  for (const [, info] of moduleStatuses) {
    if (info.status === ModuleStatus.COMPLETE) completed++;
    else if (info.status === ModuleStatus.IN_PROGRESS) inProgress++;
  }

  const overall: OverallProgress = {
    completed,
    inProgress,
    notStarted: TOTAL_MODULES - completed - inProgress,
    total: TOTAL_MODULES,
    percentage: Math.round((completed / TOTAL_MODULES) * 100),
  };

  const categories = CATEGORY_KEYS.reduce((acc, key) => {
    acc[key] = buildCategoryProgress(key, moduleStatuses);
    return acc;
  }, {} as Record<CategoryKey, CategoryProgress>);

  const inProgressModules = Array.from(moduleStatuses.values()).filter(
    (m) => m.status === ModuleStatus.IN_PROGRESS
  );

  return { overall, categories, inProgressModules, moduleStatuses };
}

/** Reactive checklist progress for a single module */
export function useModuleChecklistProgress(moduleId: string): ChecklistProgress & {
  status: ModuleStatusType;
} {
  const checkedItems = useProgressStore((state) => state.checkedItems);
  const moduleMeta = useProgressStore((state) => state.moduleMeta);
  const progress = deriveModuleProgress(moduleId, checkedItems, moduleMeta);

  return {
    completedItems: progress.completedItems,
    totalItems: progress.totalItems,
    percentage: progress.percentage,
    isComplete: progress.totalItems > 0 && progress.completedItems === progress.totalItems,
    status: progress.status,
  };
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export function validateProgressConsistency(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const overall = calculateOverallProgress();
  const allCategories = getAllCategoryProgress();

  const stateSum = overall.completed + overall.inProgress + overall.notStarted;
  if (stateSum !== TOTAL_MODULES) {
    errors.push(`State sum (${stateSum}) does not match TOTAL_MODULES (${TOTAL_MODULES})`);
  }

  const categoryTotal = Object.values(allCategories).reduce((sum, cat) => sum + cat.total, 0);
  if (categoryTotal !== TOTAL_MODULES) {
    errors.push(`Category total (${categoryTotal}) does not match TOTAL_MODULES (${TOTAL_MODULES})`);
  }

  const categoryCompleted = Object.values(allCategories).reduce((sum, cat) => sum + cat.completed, 0);
  if (categoryCompleted !== overall.completed) {
    errors.push(
      `Category completed sum (${categoryCompleted}) does not match overall completed (${overall.completed})`
    );
  }

  return { valid: errors.length === 0, errors };
}

export function getStatusReason(moduleId: string): string {
  const progress = useProgressStore.getState().getModuleStatus(moduleId);

  switch (progress.status) {
    case ModuleStatus.NOT_STARTED:
      return 'No checklist items have been completed';
    case ModuleStatus.IN_PROGRESS:
      return `${progress.completedItems} of ${progress.totalItems} checklist items completed`;
    case ModuleStatus.COMPLETE:
      return 'All checklist items completed';
    default:
      return 'Unknown status';
  }
}
