/**
 * Pure Progress Calculation Utilities
 * 
 * These functions provide pure, testable calculations for progress tracking.
 * They operate on plain data without relying on external state (localStorage, Zustand).
 * 
 * This module is the foundation for unit testing progress logic.
 */

// ============================================================================
// TYPES
// ============================================================================

export type ModuleStatusType = 'not-started' | 'in-progress' | 'complete';

export interface ChecklistItem {
  id: string;
  completed: boolean;
}

export interface ModuleProgressData {
  moduleId: string;
  status: ModuleStatusType;
  completedAt?: string;
  lastAccessedAt?: string;
}

export interface CategoryDefinition {
  [key: string]: string[];
}

export interface ProgressResult {
  completedCount: number;
  totalCount: number;
  percent: number;
}

export interface ModuleStatusResult {
  status: ModuleStatusType;
  completedCount: number;
  totalCount: number;
}

export interface PhaseProgressResult {
  completedModules: number;
  inProgressModules: number;
  notStartedModules: number;
  totalModules: number;
  percent: number;
}

export interface GlobalProgressResult {
  completedModules: number;
  inProgressModules: number;
  notStartedModules: number;
  totalModules: number;
  percent: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const MODULE_CATEGORIES: CategoryDefinition = {
  foundation: ['CD-F1', 'CD-F2', 'CD-F3'],
  governance: ['CD-P1', 'CD-P2', 'CD-P3'],
  outcomes: ['CD-I1', 'CD-I2', 'CD-I3', 'CD-I4'],
  crossCutting: ['CD-I5', 'CD-I6', 'CD-I7'],
  enablement: ['CD-T1', 'CD-T2', 'CD-T3'],
  monitoring: ['CD-M1', 'CD-M2', 'CD-M3', 'CD-M4'],
};

export const TOTAL_MODULES = 20;

// ============================================================================
// CORE PROGRESS FUNCTIONS
// ============================================================================

/**
 * Calculate progress for a list of checklist items
 * 
 * @param items Array of checklist items with id and completed status
 * @returns Progress result with completedCount, totalCount, and percent
 * 
 * Formula: percent = Math.round((completedCount / totalCount) * 100)
 * Edge case: Returns 0% if totalCount is 0
 */
export function getModuleProgress(items: ChecklistItem[]): ProgressResult {
  const totalCount = items.length;
  const completedCount = items.filter(item => item.completed).length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  return {
    completedCount,
    totalCount,
    percent,
  };
}

/**
 * Determine module status based on checklist items
 * 
 * Rules:
 * - No items completed → 'not-started'
 * - Some items completed (but not all) → 'in-progress'
 * - All items completed → 'complete'
 * 
 * Edge case: Empty items array → 'not-started'
 * 
 * @param items Array of checklist items
 * @returns Module status result with status, completedCount, and totalCount
 */
export function getModuleStatus(items: ChecklistItem[]): ModuleStatusResult {
  const totalCount = items.length;
  const completedCount = items.filter(item => item.completed).length;
  
  let status: ModuleStatusType;
  
  if (totalCount === 0 || completedCount === 0) {
    status = 'not-started';
  } else if (completedCount === totalCount) {
    status = 'complete';
  } else {
    status = 'in-progress';
  }
  
  return {
    status,
    completedCount,
    totalCount,
  };
}

/**
 * Calculate progress for a phase/category of modules
 * 
 * @param modules Array of module progress data for modules in this phase
 * @returns Phase progress result with counts for each status and percentage
 * 
 * Formula: percent = Math.round((completedModules / totalModules) * 100)
 * Edge case: Returns 0% if totalModules is 0
 */
export function getPhaseProgress(modules: ModuleProgressData[]): PhaseProgressResult {
  const totalModules = modules.length;
  
  let completedModules = 0;
  let inProgressModules = 0;
  let notStartedModules = 0;
  
  for (const module of modules) {
    switch (module.status) {
      case 'complete':
        completedModules++;
        break;
      case 'in-progress':
        inProgressModules++;
        break;
      case 'not-started':
      default:
        notStartedModules++;
        break;
    }
  }
  
  const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  
  return {
    completedModules,
    inProgressModules,
    notStartedModules,
    totalModules,
    percent,
  };
}

/**
 * Calculate global progress across all modules
 * 
 * Uses TOTAL_MODULES constant (20) as the denominator for consistent percentage calculation.
 * 
 * @param allModules Record of module ID to module progress data
 * @param moduleCategories Optional category definitions (defaults to MODULE_CATEGORIES)
 * @returns Global progress result
 * 
 * Formula: percent = Math.round((completedModules / TOTAL_MODULES) * 100)
 * 
 * INVARIANT: completedModules + inProgressModules + notStartedModules === TOTAL_MODULES
 */
export function getGlobalProgress(
  allModules: Record<string, ModuleProgressData>,
  moduleCategories: CategoryDefinition = MODULE_CATEGORIES
): GlobalProgressResult {
  const allModuleIds = Object.values(moduleCategories).flat();
  const totalModules = allModuleIds.length;
  
  let completedModules = 0;
  let inProgressModules = 0;
  let notStartedModules = 0;
  
  for (const moduleId of allModuleIds) {
    const module = allModules[moduleId];
    
    if (!module || module.status === 'not-started') {
      notStartedModules++;
    } else if (module.status === 'complete') {
      completedModules++;
    } else if (module.status === 'in-progress') {
      inProgressModules++;
    } else {
      // Default to not-started for any unknown status
      notStartedModules++;
    }
  }
  
  const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  
  return {
    completedModules,
    inProgressModules,
    notStartedModules,
    totalModules,
    percent,
  };
}

/**
 * Calculate category/phase progress from a record of all modules
 * 
 * @param allModules Record of module ID to module progress data
 * @param categoryKey The category key to calculate progress for
 * @param moduleCategories Optional category definitions (defaults to MODULE_CATEGORIES)
 * @returns Phase progress result for the specified category
 */
export function getCategoryProgress(
  allModules: Record<string, ModuleProgressData>,
  categoryKey: string,
  moduleCategories: CategoryDefinition = MODULE_CATEGORIES
): PhaseProgressResult {
  const categoryModuleIds = moduleCategories[categoryKey] || [];
  
  const modules: ModuleProgressData[] = categoryModuleIds.map(moduleId => {
    const module = allModules[moduleId];
    return module || { moduleId, status: 'not-started' as ModuleStatusType };
  });
  
  return getPhaseProgress(modules);
}

/**
 * Validate that progress counts are consistent
 * 
 * INVARIANT: completed + inProgress + notStarted === totalModules
 * 
 * @param progress Global progress result to validate
 * @returns Object with valid flag and any error messages
 */
export function validateProgressConsistency(progress: GlobalProgressResult): { 
  valid: boolean; 
  errors: string[] 
} {
  const errors: string[] = [];
  
  const sum = progress.completedModules + progress.inProgressModules + progress.notStartedModules;
  
  if (sum !== progress.totalModules) {
    errors.push(
      `State sum (${sum}) does not match totalModules (${progress.totalModules}). ` +
      `Completed: ${progress.completedModules}, In Progress: ${progress.inProgressModules}, Not Started: ${progress.notStartedModules}`
    );
  }
  
  // Validate percentage calculation
  const expectedPercent = progress.totalModules > 0 
    ? Math.round((progress.completedModules / progress.totalModules) * 100) 
    : 0;
  
  if (progress.percent !== expectedPercent) {
    errors.push(
      `Percentage mismatch. Expected: ${expectedPercent}%, Got: ${progress.percent}%`
    );
  }
  
  // Validate no negative values
  if (progress.completedModules < 0 || progress.inProgressModules < 0 || progress.notStartedModules < 0) {
    errors.push('Negative module counts detected');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Parse checklist data from a JSON-like object (simulating localStorage format)
 * 
 * @param data Object where keys are item IDs and values are boolean completion status
 * @returns Array of ChecklistItem objects
 */
export function parseChecklistData(data: Record<string, boolean>): ChecklistItem[] {
  return Object.entries(data).map(([id, completed]) => ({
    id,
    completed,
  }));
}

/**
 * Aggregate checklist data from multiple steps
 * 
 * @param steps Array of step data objects (each containing checklist items)
 * @returns Combined progress result across all steps
 */
export function aggregateStepProgress(steps: Record<string, boolean>[]): ProgressResult {
  let totalCompleted = 0;
  let totalItems = 0;
  
  for (const step of steps) {
    const items = parseChecklistData(step);
    totalItems += items.length;
    totalCompleted += items.filter(item => item.completed).length;
  }
  
  const percent = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;
  
  return {
    completedCount: totalCompleted,
    totalCount: totalItems,
    percent,
  };
}
