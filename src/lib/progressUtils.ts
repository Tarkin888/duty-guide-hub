/**
 * Unified Progress Utilities - SINGLE SOURCE OF TRUTH
 * 
 * All progress calculations MUST go through this module to ensure consistency
 * between module pages, dashboard, and phase cards.
 * 
 * Module State Rules (DETERMINISTIC TRANSITIONS):
 * - NOT_STARTED: 0 checklist items checked AND no explicit user interaction
 * - IN_PROGRESS: At least 1 item checked OR explicitly started, but not marked complete
 * - COMPLETE: Explicitly marked as complete via "Mark Complete" button
 * 
 * State Transition Rules:
 * - NOT_STARTED → IN_PROGRESS: When first checklist item is checked
 * - IN_PROGRESS → COMPLETE: Only via explicit "Mark Complete" action
 * - COMPLETE → IN_PROGRESS: When any checklist item is unchecked (auto-reversion)
 * - Any State → NOT_STARTED: Only via explicit "Reset" action
 * 
 * INVARIANT: A module is counted in exactly ONE bucket at any time.
 * Sum of (Not Started + In Progress + Complete) MUST equal TOTAL_MODULES (20).
 */

import { useProgressStore, MODULE_CATEGORIES, TOTAL_MODULES, normalizeModuleId, getModuleDisplayName } from '@/stores/progressStore';

// ============================================================================
// TYPE-SAFE ENUMS AND CONSTANTS
// ============================================================================

/**
 * Module status enum - use these constants instead of string literals
 */
export const ModuleStatus = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  COMPLETE: 'complete',
} as const;

export type ModuleStatusType = typeof ModuleStatus[keyof typeof ModuleStatus];

/**
 * Category names for phase groupings
 */
export const CategoryNames = {
  foundation: 'Foundation',
  governance: 'Governance & Planning',
  outcomes: 'Four Outcomes',
  crossCutting: 'Cross-Cutting',
  enablement: 'Enablement',
  monitoring: 'Monitoring & Assurance',
} as const;

export type CategoryKey = keyof typeof MODULE_CATEGORIES;

// Re-export for convenience
export { MODULE_CATEGORIES, TOTAL_MODULES, normalizeModuleId, getModuleDisplayName };

// ============================================================================
// INTERFACES
// ============================================================================

export interface ModuleProgressInfo {
  moduleId: string;
  canonicalId: string;
  displayName: string;
  status: ModuleStatusType;
  completedAt?: string;
  lastAccessedAt?: string;
}

export interface CategoryProgress {
  categoryKey: CategoryKey;
  categoryName: string;
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
  /** Percentage based on completed modules only: (completed / total) * 100 */
  percentage: number;
}

export interface OverallProgress {
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
  /** Percentage based on completed modules out of 20: (completed / 20) * 100 */
  percentage: number;
}

export interface ChecklistProgress {
  completedItems: number;
  totalItems: number;
  percentage: number;
  isComplete: boolean;
}

// ============================================================================
// CORE PROGRESS FUNCTIONS
// ============================================================================

/**
 * Get the canonical module ID from any storage key or module ID variant
 */
export function getCanonicalModuleId(moduleId: string): string {
  return normalizeModuleId(moduleId);
}

/**
 * Get module status from the Zustand store (the single source of truth)
 */
export function getModuleStatus(moduleId: string): ModuleStatusType {
  const state = useProgressStore.getState();
  const canonicalId = normalizeModuleId(moduleId);
  const module = state.modules[canonicalId];
  return module?.status || ModuleStatus.NOT_STARTED;
}

/**
 * Get full module progress information
 */
export function getModuleProgress(moduleId: string): ModuleProgressInfo {
  const state = useProgressStore.getState();
  const canonicalId = normalizeModuleId(moduleId);
  const module = state.modules[canonicalId];
  
  return {
    moduleId,
    canonicalId,
    displayName: getModuleDisplayName(canonicalId),
    status: module?.status || ModuleStatus.NOT_STARTED,
    completedAt: module?.completedAt,
    lastAccessedAt: module?.lastAccessedAt,
  };
}

/**
 * Get all module statuses as a map
 */
export function getAllModuleStatuses(): Map<string, ModuleProgressInfo> {
  const state = useProgressStore.getState();
  const statuses = new Map<string, ModuleProgressInfo>();
  
  // Get all module IDs from categories
  const allModuleIds = Object.values(MODULE_CATEGORIES).flat();
  
  for (const moduleId of allModuleIds) {
    const module = state.modules[moduleId];
    statuses.set(moduleId, {
      moduleId,
      canonicalId: moduleId,
      displayName: getModuleDisplayName(moduleId),
      status: module?.status || ModuleStatus.NOT_STARTED,
      completedAt: module?.completedAt,
      lastAccessedAt: module?.lastAccessedAt,
    });
  }
  
  return statuses;
}

// ============================================================================
// CATEGORY PROGRESS CALCULATIONS
// ============================================================================

/**
 * Calculate progress for a specific category/phase
 * Formula: percentage = (completed modules / total modules in category) * 100
 */
export function calculateCategoryProgress(categoryKey: CategoryKey): CategoryProgress {
  const state = useProgressStore.getState();
  const categoryModules = MODULE_CATEGORIES[categoryKey];
  const total = categoryModules.length;
  
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  
  for (const moduleId of categoryModules) {
    const module = state.modules[moduleId];
    const status = module?.status || ModuleStatus.NOT_STARTED;
    
    if (status === ModuleStatus.COMPLETE) {
      completed++;
    } else if (status === ModuleStatus.IN_PROGRESS) {
      inProgress++;
    } else {
      notStarted++;
    }
  }
  
  // Percentage is based on COMPLETED modules only
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    categoryKey,
    categoryName: CategoryNames[categoryKey],
    completed,
    inProgress,
    notStarted,
    total,
    percentage,
  };
}

/**
 * Get progress for all categories at once
 */
export function getAllCategoryProgress(): Record<CategoryKey, CategoryProgress> {
  return {
    foundation: calculateCategoryProgress('foundation'),
    governance: calculateCategoryProgress('governance'),
    outcomes: calculateCategoryProgress('outcomes'),
    crossCutting: calculateCategoryProgress('crossCutting'),
    enablement: calculateCategoryProgress('enablement'),
    monitoring: calculateCategoryProgress('monitoring'),
  };
}

// ============================================================================
// OVERALL PROGRESS CALCULATIONS
// ============================================================================

/**
 * Calculate overall progress across all 20 modules
 * Formula: percentage = (completed modules / 20 total modules) * 100
 * 
 * IMPORTANT: This is the ONLY function that should calculate overall progress
 */
export function calculateOverallProgress(): OverallProgress {
  const state = useProgressStore.getState();
  const allModuleIds = Object.values(MODULE_CATEGORIES).flat();
  
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  
  for (const moduleId of allModuleIds) {
    const module = state.modules[moduleId];
    const status = module?.status || ModuleStatus.NOT_STARTED;
    
    if (status === ModuleStatus.COMPLETE) {
      completed++;
    } else if (status === ModuleStatus.IN_PROGRESS) {
      inProgress++;
    } else {
      notStarted++;
    }
  }
  
  // Percentage is based on COMPLETED modules out of TOTAL_MODULES (20)
  const percentage = Math.round((completed / TOTAL_MODULES) * 100);
  
  return {
    completed,
    inProgress,
    notStarted,
    total: TOTAL_MODULES,
    percentage,
  };
}

/**
 * Get count of completed modules
 */
export function getCompletedModulesCount(): number {
  return calculateOverallProgress().completed;
}

/**
 * Get modules currently in progress
 */
export function getInProgressModules(): ModuleProgressInfo[] {
  const allStatuses = getAllModuleStatuses();
  const inProgress: ModuleProgressInfo[] = [];
  
  for (const [, moduleInfo] of allStatuses) {
    if (moduleInfo.status === ModuleStatus.IN_PROGRESS) {
      inProgress.push(moduleInfo);
    }
  }
  
  return inProgress;
}

// ============================================================================
// CHECKLIST PROGRESS (Item-level within modules)
// ============================================================================

/**
 * Calculate checklist progress for a module from localStorage
 * This is separate from module completion status
 */
export function getModuleChecklistProgress(moduleId: string, totalSteps: number): ChecklistProgress {
  let completedItems = 0;
  let totalItems = 0;
  
  for (let i = 1; i <= totalSteps; i++) {
    const storageKey = `checklist-${moduleId}-step${i}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        const items = Object.values(data);
        totalItems += items.length;
        completedItems += items.filter(Boolean).length;
      }
    } catch (error) {
      console.error(`Error reading checklist step ${i}:`, error);
    }
  }
  
  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const isComplete = completedItems === totalItems && totalItems > 0;
  
  return {
    completedItems,
    totalItems,
    percentage,
    isComplete,
  };
}

/**
 * Check if a module has any checklist activity (for determining if started)
 */
export function hasModuleChecklistActivity(moduleId: string, totalSteps: number): boolean {
  for (let i = 1; i <= totalSteps; i++) {
    const storageKey = `checklist-${moduleId}-step${i}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        const hasAnyChecked = Object.values(data).some(Boolean);
        if (hasAnyChecked) return true;
      }
    } catch (error) {
      // Ignore errors
    }
  }
  return false;
}

// ============================================================================
// REACT HOOKS FOR REACTIVE UPDATES
// ============================================================================

/**
 * React hook that returns reactive progress calculations
 * Subscribes to Zustand store changes automatically
 */
export function useProgressCalculation() {
  const modules = useProgressStore((state) => state.modules);
  
  // Calculate all module statuses
  const moduleStatuses = new Map<string, ModuleProgressInfo>();
  const allModuleIds = Object.values(MODULE_CATEGORIES).flat();
  
  for (const moduleId of allModuleIds) {
    const module = modules[moduleId];
    moduleStatuses.set(moduleId, {
      moduleId,
      canonicalId: moduleId,
      displayName: getModuleDisplayName(moduleId),
      status: module?.status || ModuleStatus.NOT_STARTED,
      completedAt: module?.completedAt,
      lastAccessedAt: module?.lastAccessedAt,
    });
  }
  
  // Calculate overall progress
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  
  for (const [, moduleInfo] of moduleStatuses) {
    if (moduleInfo.status === ModuleStatus.COMPLETE) {
      completed++;
    } else if (moduleInfo.status === ModuleStatus.IN_PROGRESS) {
      inProgress++;
    } else {
      notStarted++;
    }
  }
  
  const overall: OverallProgress = {
    completed,
    inProgress,
    notStarted,
    total: TOTAL_MODULES,
    percentage: Math.round((completed / TOTAL_MODULES) * 100),
  };
  
  // Calculate category progress
  const categories: Record<CategoryKey, CategoryProgress> = {
    foundation: calculateCategoryProgressFromMap('foundation', moduleStatuses),
    governance: calculateCategoryProgressFromMap('governance', moduleStatuses),
    outcomes: calculateCategoryProgressFromMap('outcomes', moduleStatuses),
    crossCutting: calculateCategoryProgressFromMap('crossCutting', moduleStatuses),
    enablement: calculateCategoryProgressFromMap('enablement', moduleStatuses),
    monitoring: calculateCategoryProgressFromMap('monitoring', moduleStatuses),
  };
  
  // Get in-progress modules
  const inProgressModules = Array.from(moduleStatuses.values()).filter(
    (m) => m.status === ModuleStatus.IN_PROGRESS
  );
  
  return {
    overall,
    categories,
    inProgressModules,
    moduleStatuses,
  };
}

/**
 * Helper to calculate category progress from a pre-computed status map
 */
function calculateCategoryProgressFromMap(
  categoryKey: CategoryKey,
  moduleStatuses: Map<string, ModuleProgressInfo>
): CategoryProgress {
  const categoryModules = MODULE_CATEGORIES[categoryKey];
  const total = categoryModules.length;
  
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  
  for (const moduleId of categoryModules) {
    const moduleInfo = moduleStatuses.get(moduleId);
    const status = moduleInfo?.status || ModuleStatus.NOT_STARTED;
    
    if (status === ModuleStatus.COMPLETE) {
      completed++;
    } else if (status === ModuleStatus.IN_PROGRESS) {
      inProgress++;
    } else {
      notStarted++;
    }
  }
  
  return {
    categoryKey,
    categoryName: CategoryNames[categoryKey],
    completed,
    inProgress,
    notStarted,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate that progress counts are consistent
 * Returns true if counts match expected values
 * 
 * INVARIANT: completed + inProgress + notStarted === TOTAL_MODULES (20)
 */
export function validateProgressConsistency(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const overall = calculateOverallProgress();
  const allCategories = getAllCategoryProgress();
  
  // CRITICAL: Sum of all states must equal TOTAL_MODULES
  const stateSum = overall.completed + overall.inProgress + overall.notStarted;
  if (stateSum !== TOTAL_MODULES) {
    errors.push(`State sum (${stateSum}) does not match TOTAL_MODULES (${TOTAL_MODULES}). Completed: ${overall.completed}, In Progress: ${overall.inProgress}, Not Started: ${overall.notStarted}`);
  }
  
  // Sum of category totals should equal TOTAL_MODULES
  const categoryTotal = Object.values(allCategories).reduce((sum, cat) => sum + cat.total, 0);
  if (categoryTotal !== TOTAL_MODULES) {
    errors.push(`Category total (${categoryTotal}) does not match TOTAL_MODULES (${TOTAL_MODULES})`);
  }
  
  // Sum of completed across categories should equal overall completed
  const categoryCompleted = Object.values(allCategories).reduce((sum, cat) => sum + cat.completed, 0);
  if (categoryCompleted !== overall.completed) {
    errors.push(`Category completed sum (${categoryCompleted}) does not match overall completed (${overall.completed})`);
  }
  
  // Sum of in-progress across categories should equal overall in-progress
  const categoryInProgress = Object.values(allCategories).reduce((sum, cat) => sum + cat.inProgress, 0);
  if (categoryInProgress !== overall.inProgress) {
    errors.push(`Category in-progress sum (${categoryInProgress}) does not match overall in-progress (${overall.inProgress})`);
  }
  
  // Sum of not-started across categories should equal overall not-started
  const categoryNotStarted = Object.values(allCategories).reduce((sum, cat) => sum + cat.notStarted, 0);
  if (categoryNotStarted !== overall.notStarted) {
    errors.push(`Category not-started sum (${categoryNotStarted}) does not match overall not-started (${overall.notStarted})`);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if a module can transition to a given state
 * Used for validation before state changes
 */
export function canTransitionTo(
  currentStatus: ModuleStatusType,
  targetStatus: ModuleStatusType
): boolean {
  // All transitions are valid in our model:
  // - NOT_STARTED → IN_PROGRESS (first checkbox)
  // - IN_PROGRESS → COMPLETE (explicit Mark Complete)
  // - COMPLETE → IN_PROGRESS (item unchecked - auto-reversion)
  // - Any → NOT_STARTED (reset action)
  return true;
}

/**
 * Get a human-readable description of why a module is in its current state
 */
export function getStatusReason(moduleId: string): string {
  const status = getModuleStatus(moduleId);
  
  switch (status) {
    case ModuleStatus.NOT_STARTED:
      return 'No checklist items have been completed';
    case ModuleStatus.IN_PROGRESS:
      return 'Some checklist items completed, awaiting "Mark Complete"';
    case ModuleStatus.COMPLETE:
      return 'Marked as complete by user';
    default:
      return 'Unknown status';
  }
}
