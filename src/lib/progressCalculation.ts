/**
 * Centralized progress calculation for the dashboard
 * 
 * This module provides accurate progress tracking based on module completion status
 * rather than checkbox counts (which require modules to be visited to be initialized).
 */

import { MODULE_CATEGORIES, TOTAL_MODULES, useProgressStore } from '@/stores/progressStore';

// Re-export for convenience
export { MODULE_CATEGORIES, TOTAL_MODULES };

export interface ModuleStatus {
  moduleId: string;
  status: 'not-started' | 'in-progress' | 'complete';
  completedAt?: string;
  lastAccessedAt?: string;
}

export interface CategoryProgressResult {
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
  percentage: number;
}

export interface OverallProgressResult {
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
  percentage: number;
}

/**
 * Get the status of all modules from the progress store
 */
export function getAllModuleStatuses(): Map<string, ModuleStatus> {
  const state = useProgressStore.getState();
  const statuses = new Map<string, ModuleStatus>();
  
  // Initialize all modules with default status
  const allModuleIds = Object.values(MODULE_CATEGORIES).flat();
  for (const moduleId of allModuleIds) {
    const moduleProgress = state.modules[moduleId];
    statuses.set(moduleId, {
      moduleId,
      status: moduleProgress?.status || 'not-started',
      completedAt: moduleProgress?.completedAt,
      lastAccessedAt: moduleProgress?.lastAccessedAt,
    });
  }
  
  return statuses;
}

/**
 * Calculate progress for a specific category
 * Formula: (completed modules in category / total modules in category) * 100
 */
export function calculateCategoryProgress(
  category: keyof typeof MODULE_CATEGORIES,
  moduleStatuses?: Map<string, ModuleStatus>
): CategoryProgressResult {
  const statuses = moduleStatuses || getAllModuleStatuses();
  const categoryModules = MODULE_CATEGORIES[category];
  const total = categoryModules.length;
  
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  
  for (const moduleId of categoryModules) {
    const status = statuses.get(moduleId)?.status || 'not-started';
    if (status === 'complete') {
      completed++;
    } else if (status === 'in-progress') {
      inProgress++;
    } else {
      notStarted++;
    }
  }
  
  // Calculate percentage based on completed modules only
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    completed,
    inProgress,
    notStarted,
    total,
    percentage,
  };
}

/**
 * Calculate overall progress across all modules
 * Formula: (total completed modules / 20 total modules) * 100
 */
export function calculateOverallProgress(
  moduleStatuses?: Map<string, ModuleStatus>
): OverallProgressResult {
  const statuses = moduleStatuses || getAllModuleStatuses();
  
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  
  for (const [, moduleStatus] of statuses) {
    if (moduleStatus.status === 'complete') {
      completed++;
    } else if (moduleStatus.status === 'in-progress') {
      inProgress++;
    } else {
      notStarted++;
    }
  }
  
  // Calculate percentage based on completed modules out of total 20
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
 * Get all category progress at once
 */
export function getAllCategoryProgress(): Record<keyof typeof MODULE_CATEGORIES, CategoryProgressResult> {
  const statuses = getAllModuleStatuses();
  
  return {
    foundation: calculateCategoryProgress('foundation', statuses),
    governance: calculateCategoryProgress('governance', statuses),
    outcomes: calculateCategoryProgress('outcomes', statuses),
    crossCutting: calculateCategoryProgress('crossCutting', statuses),
    enablement: calculateCategoryProgress('enablement', statuses),
    monitoring: calculateCategoryProgress('monitoring', statuses),
  };
}

/**
 * Get modules that are currently in progress
 */
export function getInProgressModules(): ModuleStatus[] {
  const statuses = getAllModuleStatuses();
  const inProgress: ModuleStatus[] = [];
  
  for (const [, status] of statuses) {
    if (status.status === 'in-progress') {
      inProgress.push(status);
    }
  }
  
  return inProgress;
}

/**
 * Hook-friendly version that subscribes to store changes
 */
export function useProgressCalculation() {
  const modules = useProgressStore((state) => state.modules);
  
  // Calculate all progress when modules change
  const statuses = new Map<string, ModuleStatus>();
  const allModuleIds = Object.values(MODULE_CATEGORIES).flat();
  
  for (const moduleId of allModuleIds) {
    const moduleProgress = modules[moduleId];
    statuses.set(moduleId, {
      moduleId,
      status: moduleProgress?.status || 'not-started',
      completedAt: moduleProgress?.completedAt,
      lastAccessedAt: moduleProgress?.lastAccessedAt,
    });
  }
  
  const overall = calculateOverallProgress(statuses);
  const categories = {
    foundation: calculateCategoryProgress('foundation', statuses),
    governance: calculateCategoryProgress('governance', statuses),
    outcomes: calculateCategoryProgress('outcomes', statuses),
    crossCutting: calculateCategoryProgress('crossCutting', statuses),
    enablement: calculateCategoryProgress('enablement', statuses),
    monitoring: calculateCategoryProgress('monitoring', statuses),
  };
  
  const inProgressModules = Array.from(statuses.values()).filter(
    (s) => s.status === 'in-progress'
  );
  
  return {
    overall,
    categories,
    inProgressModules,
    moduleStatuses: statuses,
  };
}
