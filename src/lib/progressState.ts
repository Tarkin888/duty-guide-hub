// Progress state management with localStorage persistence

export interface ModuleProgress {
  moduleId: string;
  status: 'not-started' | 'in-progress' | 'complete';
  completedDate?: string;
  lastAccessedDate: string;
  checklistProgress?: {
    total: number;
    completed: number;
  };
}

export interface CategoryProgress {
  categoryId: string;
  name: string;
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  percentageComplete: number;
}

export interface OverallProgress {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  percentageComplete: number;
  startDate?: string;
  lastUpdated: string;
}

// Module structure definition - matches the actual routes
export const MODULE_STRUCTURE = {
  foundation: {
    name: 'Foundation & Assessment',
    modules: ['CD-F1', 'CD-F2', 'CD-F3']
  },
  governance: {
    name: 'Governance & Planning',
    modules: ['CD-P1', 'CD-P2', 'CD-P3']
  },
  outcomes: {
    name: 'Four Outcomes Implementation',
    modules: ['CD-I1', 'CD-I2', 'CD-I3', 'CD-I4']
  },
  crosscutting: {
    name: 'Cross-Cutting Modules',
    modules: ['CD-I5', 'CD-I6', 'CD-I7']
  },
  enablement: {
    name: 'Enablement & Training',
    modules: ['CD-T1', 'CD-T2', 'CD-T3']
  },
  monitoring: {
    name: 'Monitoring & Assurance',
    modules: ['CD-M1', 'CD-M2', 'CD-M3', 'CD-M4']
  }
} as const;

export const TOTAL_MODULES = 20;

const PROGRESS_STORAGE_KEY = 'consumer-duty-progress-v2';
const START_DATE_KEY = 'implementation-start-date';

// Get all valid module IDs
export function getAllModuleIds(): string[] {
  return Object.values(MODULE_STRUCTURE).flatMap(cat => cat.modules);
}

// Initialize or get progress from localStorage
export function initializeProgress(): Map<string, ModuleProgress> {
  const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return new Map(Object.entries(parsed));
    } catch (e) {
      console.error('Failed to parse stored progress:', e);
    }
  }
  return new Map();
}

// Save progress to localStorage
export function saveProgress(progress: Map<string, ModuleProgress>): void {
  try {
    const obj = Object.fromEntries(progress);
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

// Calculate category progress
export function calculateCategoryProgress(
  categoryId: string,
  allProgress: Map<string, ModuleProgress>
): CategoryProgress {
  const category = MODULE_STRUCTURE[categoryId as keyof typeof MODULE_STRUCTURE];
  
  if (!category) {
    return {
      categoryId,
      name: 'Unknown',
      totalModules: 0,
      completedModules: 0,
      inProgressModules: 0,
      percentageComplete: 0
    };
  }

  const moduleIds = category.modules;
  const totalModules = moduleIds.length;
  
  let completedModules = 0;
  let inProgressModules = 0;

  moduleIds.forEach(moduleId => {
    const progress = allProgress.get(moduleId);
    if (progress?.status === 'complete') {
      completedModules++;
    } else if (progress?.status === 'in-progress') {
      inProgressModules++;
    }
  });

  const percentageComplete = totalModules > 0 
    ? Math.round((completedModules / totalModules) * 100)
    : 0;

  return {
    categoryId,
    name: category.name,
    totalModules,
    completedModules,
    inProgressModules,
    percentageComplete
  };
}

// Calculate overall progress - FIXED: uses TOTAL_MODULES constant
export function calculateOverallProgress(
  allProgress: Map<string, ModuleProgress>
): OverallProgress {
  let completedModules = 0;
  let inProgressModules = 0;

  // Only count modules that are in our valid module list
  const validModuleIds = getAllModuleIds();
  
  allProgress.forEach((progress, moduleId) => {
    if (validModuleIds.includes(moduleId)) {
      if (progress.status === 'complete') {
        completedModules++;
      } else if (progress.status === 'in-progress') {
        inProgressModules++;
      }
    }
  });

  // Calculate percentage against fixed total of 20 modules
  const percentageComplete = Math.round((completedModules / TOTAL_MODULES) * 100);

  const startDate = localStorage.getItem(START_DATE_KEY) || undefined;
  const lastUpdated = new Date().toISOString();

  return {
    totalModules: TOTAL_MODULES,
    completedModules,
    inProgressModules,
    percentageComplete,
    startDate,
    lastUpdated
  };
}

// Update module status
export function updateModuleStatus(
  moduleId: string,
  status: 'not-started' | 'in-progress' | 'complete',
  allProgress: Map<string, ModuleProgress>
): Map<string, ModuleProgress> {
  const newProgress = new Map(allProgress);
  
  const existing = newProgress.get(moduleId) || {
    moduleId,
    status: 'not-started',
    lastAccessedDate: new Date().toISOString()
  };

  const updated: ModuleProgress = {
    ...existing,
    moduleId,
    status,
    lastAccessedDate: new Date().toISOString(),
    completedDate: status === 'complete' 
      ? new Date().toISOString() 
      : existing.completedDate
  };

  newProgress.set(moduleId, updated);
  
  // Set start date if this is the first activity
  if (!localStorage.getItem(START_DATE_KEY)) {
    localStorage.setItem(START_DATE_KEY, new Date().toISOString());
  }
  
  saveProgress(newProgress);
  return newProgress;
}

// Get all category progress
export function getAllCategoryProgress(
  allProgress: Map<string, ModuleProgress>
): Record<string, CategoryProgress> {
  const categories = Object.keys(MODULE_STRUCTURE);
  const result: Record<string, CategoryProgress> = {};
  
  categories.forEach(categoryId => {
    result[categoryId] = calculateCategoryProgress(categoryId, allProgress);
  });
  
  return result;
}

// Get start date
export function getStartDate(): string | null {
  return localStorage.getItem(START_DATE_KEY);
}

// Get days since start
export function getDaysSinceStart(): number {
  const startDate = localStorage.getItem(START_DATE_KEY);
  if (!startDate) return 0;
  
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Reset all progress
export function resetAllProgress(): void {
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
  localStorage.removeItem(START_DATE_KEY);
  localStorage.removeItem('consumer-duty-progress'); // Also remove old key
  localStorage.removeItem('consumer-duty-activity');
}

// Validation function to prevent impossible states
export function validateProgressState(
  progress: Map<string, ModuleProgress>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const validModuleIds = getAllModuleIds();
  
  // Check all module IDs are valid
  progress.forEach((_, moduleId) => {
    if (!validModuleIds.includes(moduleId)) {
      errors.push(`Invalid module ID: ${moduleId}`);
    }
  });
  
  // Check for impossible completion percentages
  const overall = calculateOverallProgress(progress);
  if (overall.percentageComplete > 100) {
    errors.push('Overall completion exceeds 100%');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Get in-progress modules for resume functionality
export function getInProgressModules(
  allProgress: Map<string, ModuleProgress>
): ModuleProgress[] {
  const result: ModuleProgress[] = [];
  allProgress.forEach((progress) => {
    if (progress.status === 'in-progress') {
      result.push(progress);
    }
  });
  return result;
}
