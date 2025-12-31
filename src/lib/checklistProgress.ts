/**
 * Real-time checklist progress calculation from localStorage
 * This calculates actual checkbox completion rather than module-level status
 */

// Module configurations with expected step counts
const MODULE_STEP_COUNTS: Record<string, number> = {
  'cd-f1-readiness': 6,
  'cd-f2-requirements': 6,
  'cd-f3-risk-assessment': 6,
  'cd-p1-governance-framework': 6,
  'cd-p2-policy-framework': 6,
  'cd-p3-implementation-roadmap': 6,
  'cd-i1-products-services': 6,
  'cd-i2-price-value': 6,
  'cd-i3-consumer-understanding': 6,
  'cd-i4-consumer-support': 6,
  'cd-i5-vulnerable-customers': 6,
  'cd-i6-distribution-chain': 6,
  'cd-i7-data-evidence': 6,
  'cd-t1-training': 6,
  'cd-t2-communications-change': 6,
  'cd-t3-technology-requirements': 6,
  'cd-m1-mi-framework': 6,
  'cd-m2-testing-assurance': 6,
  'cd-m3-board-reporting': 6,
  'cd-m4-continuous-improvement': 6,
};

// Map canonical module IDs to storage keys
const CANONICAL_TO_STORAGE_KEY: Record<string, string> = {
  'CD-F1': 'cd-f1-readiness',
  'CD-F2': 'cd-f2-requirements',
  'CD-F3': 'cd-f3-risk-assessment',
  'CD-P1': 'cd-p1-governance-framework',
  'CD-P2': 'cd-p2-policy-framework',
  'CD-P3': 'cd-p3-implementation-roadmap',
  'CD-I1': 'cd-i1-products-services',
  'CD-I2': 'cd-i2-price-value',
  'CD-I3': 'cd-i3-consumer-understanding',
  'CD-I4': 'cd-i4-consumer-support',
  'CD-I5': 'cd-i5-vulnerable-customers',
  'CD-I6': 'cd-i6-distribution-chain',
  'CD-I7': 'cd-i7-data-evidence',
  'CD-T1': 'cd-t1-training',
  'CD-T2': 'cd-t2-communications-change',
  'CD-T3': 'cd-t3-technology-requirements',
  'CD-M1': 'cd-m1-mi-framework',
  'CD-M2': 'cd-m2-testing-assurance',
  'CD-M3': 'cd-m3-board-reporting',
  'CD-M4': 'cd-m4-continuous-improvement',
};

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

// Category definitions
const CATEGORY_MODULES = {
  foundation: ['CD-F1', 'CD-F2', 'CD-F3'],
  governance: ['CD-P1', 'CD-P2', 'CD-P3'],
  outcomes: ['CD-I1', 'CD-I2', 'CD-I3', 'CD-I4'],
  crossCutting: ['CD-I5', 'CD-I6', 'CD-I7'],
  enablement: ['CD-T1', 'CD-T2', 'CD-T3'],
  monitoring: ['CD-M1', 'CD-M2', 'CD-M3', 'CD-M4'],
};

/**
 * Get checklist progress for a single module by reading all step data from localStorage
 */
export function getModuleChecklistProgress(canonicalModuleId: string): ModuleChecklistStats {
  const storageKey = CANONICAL_TO_STORAGE_KEY[canonicalModuleId];
  
  if (!storageKey) {
    return {
      moduleId: canonicalModuleId,
      storageKey: '',
      checkedBoxes: 0,
      totalBoxes: 0,
      percentage: 0,
      status: 'not-started',
    };
  }

  const maxSteps = MODULE_STEP_COUNTS[storageKey] || 10; // Check up to 10 steps if not defined
  let totalChecked = 0;
  let totalBoxes = 0;

  try {
    // Scan all possible step keys for this module
    for (let step = 1; step <= maxSteps; step++) {
      const stepKey = `checklist-${storageKey}-step${step}`;
      const stored = localStorage.getItem(stepKey);
      
      if (stored) {
        const data = JSON.parse(stored);
        const entries = Object.entries(data);
        totalBoxes += entries.length;
        totalChecked += entries.filter(([, checked]) => checked === true).length;
      }
    }
  } catch (error) {
    console.error(`Error reading checklist for ${canonicalModuleId}:`, error);
  }

  const percentage = totalBoxes > 0 ? Math.round((totalChecked / totalBoxes) * 100) : 0;
  
  let status: 'not-started' | 'in-progress' | 'complete' = 'not-started';
  if (percentage === 100 && totalBoxes > 0) {
    status = 'complete';
  } else if (totalChecked > 0) {
    status = 'in-progress';
  }

  return {
    moduleId: canonicalModuleId,
    storageKey,
    checkedBoxes: totalChecked,
    totalBoxes,
    percentage,
    status,
  };
}

/**
 * Get complete progress across all modules by scanning localStorage
 */
export function getOverallChecklistProgress(): OverallChecklistProgress {
  const allModuleIds = Object.keys(CANONICAL_TO_STORAGE_KEY);
  const moduleStats: ModuleChecklistStats[] = [];
  
  let totalCheckedBoxes = 0;
  let totalBoxes = 0;
  let completedModules = 0;
  let inProgressModules = 0;
  let notStartedModules = 0;

  // Get stats for each module
  for (const moduleId of allModuleIds) {
    const stats = getModuleChecklistProgress(moduleId);
    moduleStats.push(stats);
    
    totalCheckedBoxes += stats.checkedBoxes;
    totalBoxes += stats.totalBoxes;
    
    if (stats.status === 'complete') {
      completedModules++;
    } else if (stats.status === 'in-progress') {
      inProgressModules++;
    } else {
      notStartedModules++;
    }
  }

  // Calculate category stats
  const categoryStats: Record<string, CategoryStats> = {};
  
  for (const [categoryKey, categoryModules] of Object.entries(CATEGORY_MODULES)) {
    let catChecked = 0;
    let catTotal = 0;
    let catCompleted = 0;
    
    for (const modId of categoryModules) {
      const modStats = moduleStats.find(m => m.moduleId === modId);
      if (modStats) {
        catChecked += modStats.checkedBoxes;
        catTotal += modStats.totalBoxes;
        if (modStats.status === 'complete') {
          catCompleted++;
        }
      }
    }
    
    categoryStats[categoryKey] = {
      name: categoryKey,
      modules: categoryModules,
      checkedBoxes: catChecked,
      totalBoxes: catTotal,
      percentage: catTotal > 0 ? Math.round((catChecked / catTotal) * 100) : 0,
      completedModules: catCompleted,
      totalModules: categoryModules.length,
    };
  }

  const overallPercentage = totalBoxes > 0 
    ? Math.round((totalCheckedBoxes / totalBoxes) * 100) 
    : 0;

  return {
    totalCheckedBoxes,
    totalBoxes,
    overallPercentage,
    completedModules,
    inProgressModules,
    notStartedModules,
    totalModules: allModuleIds.length,
    moduleStats,
    categoryStats,
  };
}

/**
 * Check if localStorage is available and working
 */
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

/**
 * Validate and potentially repair corrupted localStorage data
 */
export function validateAndRepairStorage(): { valid: boolean; repaired: boolean; errors: string[] } {
  const errors: string[] = [];
  let repaired = false;

  try {
    for (const storageKey of Object.values(CANONICAL_TO_STORAGE_KEY)) {
      for (let step = 1; step <= 10; step++) {
        const key = `checklist-${storageKey}-step${step}`;
        const stored = localStorage.getItem(key);
        
        if (stored) {
          try {
            const data = JSON.parse(stored);
            // Validate it's an object with boolean values
            if (typeof data !== 'object' || data === null) {
              throw new Error('Invalid data structure');
            }
            for (const value of Object.values(data)) {
              if (typeof value !== 'boolean') {
                throw new Error('Invalid value type');
              }
            }
          } catch (e) {
            errors.push(`Corrupted data in ${key}`);
            localStorage.removeItem(key);
            repaired = true;
          }
        }
      }
    }
  } catch (e) {
    errors.push('Storage validation failed');
  }

  return {
    valid: errors.length === 0,
    repaired,
    errors,
  };
}
