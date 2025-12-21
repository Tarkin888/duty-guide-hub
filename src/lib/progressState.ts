// Progress state management with localStorage persistence
// This module bridges the storage.ts module IDs with the canonical module IDs

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

// Map from storage keys (used in module pages) to canonical module IDs
const STORAGE_KEY_TO_MODULE_ID: Record<string, string> = {
  'cd-f1-readiness': 'CD-F1',
  'cd-f2-requirements': 'CD-F2',
  'cd-f3-risk': 'CD-F3',
  'cd-p1-governance': 'CD-P1',
  'cd-p2-policy': 'CD-P2',
  'cd-p3-roadmap': 'CD-P3',
  'cd-i1-products-services': 'CD-I1',
  'cd-i2-price-value': 'CD-I2',
  'cd-i3-consumer-understanding': 'CD-I3',
  'cd-i4-consumer-support': 'CD-I4',
  'cd-i5-vulnerable-customers': 'CD-I5',
  'cd-i6-distribution-chain': 'CD-I6',
  'cd-i7-data-evidence': 'CD-I7',
  'cd-t1-training': 'CD-T1',
  'cd-t1-training-part1': 'CD-T1',
  'cd-t1-training-part2': 'CD-T1',
  'cd-t2-communications': 'CD-T2',
  'cd-t3-technology': 'CD-T3',
  'cd-m1-mi-framework': 'CD-M1',
  'cd-m2-testing': 'CD-M2',
  'cd-m3-board-reporting': 'CD-M3',
  'cd-m4-continuous-improvement': 'CD-M4',
};

export const TOTAL_MODULES = 20;

// Read from the same key that storage.ts uses
const STORAGE_KEY = 'consumer-duty-progress';
const START_DATE_KEY = 'implementation-start-date';
const USER_DATA_KEY = 'consumer-duty-user-data';

// Get all valid module IDs
export function getAllModuleIds(): string[] {
  return Object.values(MODULE_STRUCTURE).flatMap(cat => cat.modules);
}

// Convert storage status to our status format
function normalizeStatus(status: string | undefined): 'not-started' | 'in-progress' | 'complete' {
  if (!status) return 'not-started';
  if (status === 'completed' || status === 'complete') return 'complete';
  if (status === 'in-progress') return 'in-progress';
  return 'not-started';
}

// Initialize or get progress from localStorage - reads from storage.ts format
export function initializeProgress(): Map<string, ModuleProgress> {
  const progressMap = new Map<string, ModuleProgress>();
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Convert storage.ts format to our format
      Object.entries(parsed).forEach(([storageKey, data]: [string, any]) => {
        // Map storage key to canonical module ID
        const moduleId = STORAGE_KEY_TO_MODULE_ID[storageKey];
        
        if (moduleId) {
          const status = normalizeStatus(data?.status);
          
          // Only add if we don't already have this module (handles part1/part2 modules)
          // Or update if this one is more complete
          const existing = progressMap.get(moduleId);
          if (!existing || (status === 'complete' && existing.status !== 'complete')) {
            progressMap.set(moduleId, {
              moduleId,
              status,
              lastAccessedDate: data?.lastUpdated || new Date().toISOString(),
              completedDate: status === 'complete' ? (data?.lastUpdated || new Date().toISOString()) : undefined,
            });
          }
        }
      });
    }
  } catch (e) {
    console.error('Failed to parse stored progress:', e);
  }
  
  return progressMap;
}

// Save progress to localStorage in storage.ts compatible format
export function saveProgress(progress: Map<string, ModuleProgress>): void {
  // We don't directly save here - module pages use storage.ts updateModuleStatus
  // This function is kept for compatibility but the actual saving happens through storage.ts
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

// Calculate overall progress - uses TOTAL_MODULES constant
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

  const startDate = getStartDate() || undefined;
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

// Update module status - delegates to storage.ts compatible format
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
  if (!getStartDate()) {
    localStorage.setItem(START_DATE_KEY, new Date().toISOString());
  }
  
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

// Get start date - check both possible locations
export function getStartDate(): string | null {
  // First check the dedicated start date key
  const startDate = localStorage.getItem(START_DATE_KEY);
  if (startDate) return startDate;
  
  // Fall back to user data key used by storage.ts
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed.startedDate || null;
    }
  } catch (e) {
    console.error('Failed to parse user data:', e);
  }
  
  return null;
}

// Get days since start
export function getDaysSinceStart(): number {
  const startDate = getStartDate();
  if (!startDate) return 0;
  
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Reset all progress
export function resetAllProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(START_DATE_KEY);
  localStorage.removeItem('consumer-duty-progress-v2'); // Also remove old key
  localStorage.removeItem('consumer-duty-activity');
  localStorage.removeItem(USER_DATA_KEY);
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
