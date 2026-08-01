/**
 * Checklist progress derived from the single progress store.
 *
 * Kept as a thin compatibility layer: all counts come from the static module
 * registry, so nothing is discovered by scanning storage at runtime.
 */

import {
  useProgressStore,
  deriveModulesMap,
  deriveCheckedItemsCount,
} from '@/stores/progressStore';
import {
  MODULE_CATEGORIES,
  CATEGORY_KEYS,
  TOTAL_CHECKLIST_ITEMS,
  ALL_MODULE_IDS,
  getModuleDefinition,
  normalizeModuleId,
  type CategoryKey,
} from '@/config/moduleRegistry';

export interface ModuleChecklistStats {
  moduleId: string;
  storageKey: string;
  checkedBoxes: number;
  totalBoxes: number;
  percentage: number;
  status: 'not-started' | 'in-progress' | 'complete';
}

export interface CategoryStats {
  name: string;
  modules: string[];
  checkedBoxes: number;
  totalBoxes: number;
  percentage: number;
  completedModules: number;
  totalModules: number;
}

export interface OverallChecklistProgress {
  totalCheckedBoxes: number;
  totalBoxes: number;
  overallPercentage: number;
  completedModules: number;
  inProgressModules: number;
  notStartedModules: number;
  totalModules: number;
  moduleStats: ModuleChecklistStats[];
  categoryStats: Record<string, CategoryStats>;
}

export function getModuleChecklistProgress(moduleId: string): ModuleChecklistStats {
  const canonicalId = normalizeModuleId(moduleId);
  const definition = getModuleDefinition(canonicalId);
  const progress = useProgressStore.getState().getModuleStatus(canonicalId);

  return {
    moduleId: canonicalId,
    storageKey: definition?.storageIds[0] || '',
    checkedBoxes: progress.completedItems,
    totalBoxes: progress.totalItems,
    percentage: progress.percentage,
    status: progress.status,
  };
}

export function getOverallChecklistProgress(): OverallChecklistProgress {
  const { checkedItems, moduleMeta } = useProgressStore.getState();
  const modules = deriveModulesMap(checkedItems, moduleMeta);

  const moduleStats: ModuleChecklistStats[] = ALL_MODULE_IDS.map((id) => ({
    moduleId: id,
    storageKey: getModuleDefinition(id)?.storageIds[0] || '',
    checkedBoxes: modules[id].completedItems,
    totalBoxes: modules[id].totalItems,
    percentage: modules[id].percentage,
    status: modules[id].status,
  }));

  const completedModules = moduleStats.filter((m) => m.status === 'complete').length;
  const inProgressModules = moduleStats.filter((m) => m.status === 'in-progress').length;

  const categoryStats: Record<string, CategoryStats> = {};
  for (const categoryKey of CATEGORY_KEYS as CategoryKey[]) {
    const categoryModules = MODULE_CATEGORIES[categoryKey] || [];
    let checkedBoxes = 0;
    let totalBoxes = 0;
    let completed = 0;

    for (const id of categoryModules) {
      checkedBoxes += modules[id].completedItems;
      totalBoxes += modules[id].totalItems;
      if (modules[id].status === 'complete') completed++;
    }

    categoryStats[categoryKey] = {
      name: categoryKey,
      modules: categoryModules,
      checkedBoxes,
      totalBoxes,
      percentage: totalBoxes > 0 ? Math.round((checkedBoxes / totalBoxes) * 100) : 0,
      completedModules: completed,
      totalModules: categoryModules.length,
    };
  }

  const totalCheckedBoxes = deriveCheckedItemsCount(checkedItems);

  return {
    totalCheckedBoxes,
    totalBoxes: TOTAL_CHECKLIST_ITEMS,
    overallPercentage:
      TOTAL_CHECKLIST_ITEMS > 0 ? Math.round((totalCheckedBoxes / TOTAL_CHECKLIST_ITEMS) * 100) : 0,
    completedModules,
    inProgressModules,
    notStartedModules: ALL_MODULE_IDS.length - completedModules - inProgressModules,
    totalModules: ALL_MODULE_IDS.length,
    moduleStats,
    categoryStats,
  };
}

export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test_storage__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/** Repairs any stray entries in the store (unknown keys are dropped) */
export function validateAndRepairStorage(): { valid: boolean; repaired: boolean; errors: string[] } {
  return useProgressStore.getState().validateAndRepairState();
}
