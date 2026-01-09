import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';

// Module structure definition
export const MODULE_CATEGORIES = {
  foundation: ['CD-F1', 'CD-F2', 'CD-F3'],
  governance: ['CD-P1', 'CD-P2', 'CD-P3'],
  outcomes: ['CD-I1', 'CD-I2', 'CD-I3', 'CD-I4'],
  crossCutting: ['CD-I5', 'CD-I6', 'CD-I7'],
  enablement: ['CD-T1', 'CD-T2', 'CD-T3'],
  monitoring: ['CD-M1', 'CD-M2', 'CD-M3', 'CD-M4'],
} as const;

export const TOTAL_MODULES = 20;

// Map from storage keys (used in module pages) to canonical module IDs
const STORAGE_KEY_TO_MODULE_ID: Record<string, string> = {
  'cd-f1-readiness': 'CD-F1',
  'cd-f2-requirements': 'CD-F2',
  'cd-f3-risk': 'CD-F3',
  'cd-f3-risk-assessment': 'CD-F3',
  'cd-p1-governance': 'CD-P1',
  'cd-p1-governance-framework': 'CD-P1',
  'cd-p2-policy': 'CD-P2',
  'cd-p2-policy-framework': 'CD-P2',
  'cd-p3-roadmap': 'CD-P3',
  'cd-p3-implementation-roadmap': 'CD-P3',
  'cd-i1-products-services': 'CD-I1',
  'cd-i1-products': 'CD-I1',
  'cd-i2-price-value': 'CD-I2',
  'cd-i3-consumer-understanding': 'CD-I3',
  'cd-i4-consumer-support': 'CD-I4',
  'cd-i5-vulnerable-customers': 'CD-I5',
  'cd-i6-distribution-chain': 'CD-I6',
  'cd-i7-data-evidence': 'CD-I7',
  'cd-t1-training': 'CD-T1',
  'cd-t2-communications': 'CD-T2',
  'cd-t2-communications-change': 'CD-T2',
  'cd-t3-technology': 'CD-T3',
  'cd-t3-technology-requirements': 'CD-T3',
  'cd-m1-mi-framework': 'CD-M1',
  'cd-m2-testing': 'CD-M2',
  'cd-m2-testing-assurance': 'CD-M2',
  'cd-m3-board-reporting': 'CD-M3',
  'cd-m4-continuous-improvement': 'CD-M4',
};

export interface ModuleProgress {
  moduleId: string;
  status: 'not-started' | 'in-progress' | 'complete';
  completedAt?: string;
  lastAccessedAt?: string;
  checklistItems?: Record<string, boolean>;
}

export interface Activity {
  id: string;
  type: 'module_completed' | 'module_started' | 'checklist_updated';
  moduleId: string;
  moduleName: string;
  timestamp: string;
}

interface ProgressState {
  modules: Record<string, ModuleProgress>;
  activities: Activity[];
  startDate: string | null;
  version: number;

  // Actions
  markModuleComplete: (moduleId: string, showToast?: boolean) => void;
  markModuleInProgress: (moduleId: string, showToast?: boolean) => void;
  resetModuleProgress: (moduleId: string, showToast?: boolean) => void;
  updateChecklistItem: (moduleId: string, itemId: string, completed: boolean) => void;
  updateLastAccessed: (moduleId: string) => void;
  resetAllProgress: () => void;
  resetStartDate: () => void;
  initializeStartDate: () => void;
  addActivity: (type: Activity['type'], moduleId: string, moduleName: string) => void;
  clearActivities: () => void;
  validateAndRepairState: () => { valid: boolean; repaired: boolean; errors: string[] };

  // Getters
  getModuleStatus: (moduleId: string) => ModuleProgress;
  getCategoryProgress: (category: keyof typeof MODULE_CATEGORIES) => { completed: number; total: number; percentage: number };
  getOverallProgress: () => { completed: number; inProgress: number; total: number; percentage: number };
  getCompletedModulesCount: () => number;
  getInProgressModules: () => ModuleProgress[];
  getDaysSinceStart: () => number;
  getStartDate: () => string | null;
  getFormattedStartDate: () => string | null;
  getActivities: () => Activity[];
  getAverageDaysPerModule: () => number;
  getEstimatedCompletionDate: () => Date | null;
}

// Module display names
const MODULE_NAMES: Record<string, string> = {
  'CD-F1': 'Readiness Assessment',
  'CD-F2': 'Requirements Mapping',
  'CD-F3': 'Risk & Impact Assessment',
  'CD-P1': 'Governance Framework',
  'CD-P2': 'Policy Framework',
  'CD-P3': 'Implementation Roadmap',
  'CD-I1': 'Products & Services',
  'CD-I2': 'Price & Value',
  'CD-I3': 'Consumer Understanding',
  'CD-I4': 'Consumer Support',
  'CD-I5': 'Vulnerable Customers',
  'CD-I6': 'Distribution Chain',
  'CD-I7': 'Data & Evidence',
  'CD-T1': 'Training Programme',
  'CD-T2': 'Communications & Change',
  'CD-T3': 'Technology Requirements',
  'CD-M1': 'MI Framework',
  'CD-M2': 'Testing & Assurance',
  'CD-M3': 'Board Reporting',
  'CD-M4': 'Continuous Improvement',
};

// Helper to normalize storage key to canonical module ID
export function normalizeModuleId(storageKey: string): string {
  return STORAGE_KEY_TO_MODULE_ID[storageKey] || storageKey.toUpperCase().replace(/-/g, '-');
}

// Helper to get module display name
export function getModuleDisplayName(moduleId: string): string {
  const canonicalId = STORAGE_KEY_TO_MODULE_ID[moduleId] || moduleId;
  return MODULE_NAMES[canonicalId] || canonicalId;
}

// Migrate old localStorage data to new format
function migrateOldData(): Record<string, ModuleProgress> {
  const modules: Record<string, ModuleProgress> = {};
  
  try {
    // Try to read old format
    const oldData = localStorage.getItem('consumer-duty-progress');
    
    if (oldData) {
      const parsed = JSON.parse(oldData);
      
      Object.entries(parsed).forEach(([storageKey, data]: [string, any]) => {
        const canonicalId = STORAGE_KEY_TO_MODULE_ID[storageKey];
        
        if (canonicalId && !modules[canonicalId]) {
          const status = data?.status === 'completed' ? 'complete' : 
                         data?.status === 'in-progress' ? 'in-progress' : 'not-started';
          modules[canonicalId] = {
            moduleId: canonicalId,
            status,
            lastAccessedAt: data?.lastUpdated || new Date().toISOString(),
            completedAt: status === 'complete' ? data?.lastUpdated : undefined,
          };
        }
      });
    }
  } catch (e) {
    console.error('Migration failed:', e);
  }
  
  return modules;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      modules: {},
      activities: [],
      startDate: null,
      version: 1,

      markModuleComplete: (moduleId: string, showToast = true) => {
        const canonicalId = STORAGE_KEY_TO_MODULE_ID[moduleId] || moduleId;
        const now = new Date().toISOString();
        
        set((state) => {
          const existingModule = state.modules[canonicalId];
          
          // Don't re-mark if already complete
          if (existingModule?.status === 'complete') {
            return state;
          }
          
          const newModules = { ...state.modules };
          newModules[canonicalId] = {
            moduleId: canonicalId,
            status: 'complete',
            completedAt: now,
            lastAccessedAt: now,
            checklistItems: existingModule?.checklistItems || {},
          };

          const newStartDate = state.startDate || now;
          
          // Add activity
          const newActivity: Activity = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'module_completed',
            moduleId: canonicalId,
            moduleName: getModuleDisplayName(canonicalId),
            timestamp: now,
          };
          
          const newActivities = [newActivity, ...state.activities].slice(0, 50);

          return {
            modules: newModules,
            startDate: newStartDate,
            activities: newActivities,
          };
        });
        
        // Dispatch event for legacy compatibility
        window.dispatchEvent(new Event('module-progress-updated'));
        
        if (showToast) {
          toast.success('Module Complete!', {
            description: `${getModuleDisplayName(canonicalId)} marked as complete.`,
          });
        }
      },

      markModuleInProgress: (moduleId: string, showToast = true) => {
        const canonicalId = STORAGE_KEY_TO_MODULE_ID[moduleId] || moduleId;
        const now = new Date().toISOString();
        
        set((state) => {
          const existingModule = state.modules[canonicalId];
          
          // Don't downgrade from complete
          if (existingModule?.status === 'complete') {
            return state;
          }
          
          // Don't re-mark if already in progress
          if (existingModule?.status === 'in-progress') {
            return { 
              modules: {
                ...state.modules,
                [canonicalId]: { ...existingModule, lastAccessedAt: now }
              }
            };
          }
          
          const newModules = { ...state.modules };
          newModules[canonicalId] = {
            moduleId: canonicalId,
            status: 'in-progress',
            lastAccessedAt: now,
            checklistItems: existingModule?.checklistItems || {},
          };

          const newStartDate = state.startDate || now;
          
          // Add activity
          const newActivity: Activity = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'module_started',
            moduleId: canonicalId,
            moduleName: getModuleDisplayName(canonicalId),
            timestamp: now,
          };
          
          const newActivities = [newActivity, ...state.activities].slice(0, 50);

          return {
            modules: newModules,
            startDate: newStartDate,
            activities: newActivities,
          };
        });
        
        window.dispatchEvent(new Event('module-progress-updated'));
        
        if (showToast) {
          toast.info('Module In Progress', {
            description: `Started ${getModuleDisplayName(canonicalId)}.`,
          });
        }
      },

      resetModuleProgress: (moduleId: string, showToast = true) => {
        const canonicalId = STORAGE_KEY_TO_MODULE_ID[moduleId] || moduleId;
        const now = new Date().toISOString();
        
        set((state) => {
          const newModules = { ...state.modules };
          
          // Remove the module from tracking (resets to not-started)
          delete newModules[canonicalId];
          
          return {
            modules: newModules,
          };
        });
        
        // Also sync with legacy localStorage
        try {
          const legacyData = localStorage.getItem('consumer-duty-progress');
          if (legacyData) {
            const parsed = JSON.parse(legacyData);
            // Find and remove any storage keys that map to this module
            Object.keys(STORAGE_KEY_TO_MODULE_ID).forEach(storageKey => {
              if (STORAGE_KEY_TO_MODULE_ID[storageKey] === canonicalId) {
                delete parsed[storageKey];
              }
            });
            localStorage.setItem('consumer-duty-progress', JSON.stringify(parsed));
          }
        } catch (e) {
          console.error('Failed to sync reset with legacy storage:', e);
        }
        
        window.dispatchEvent(new Event('module-progress-updated'));
        
        if (showToast) {
          toast.info('Progress Reset', {
            description: `${getModuleDisplayName(canonicalId)} reset to Not Started.`,
          });
        }
      },

      updateChecklistItem: (moduleId: string, itemId: string, completed: boolean) => {
        const canonicalId = STORAGE_KEY_TO_MODULE_ID[moduleId] || moduleId;
        const now = new Date().toISOString();
        
        set((state) => {
          const existingModule = state.modules[canonicalId] || {
            moduleId: canonicalId,
            status: 'not-started' as const,
            checklistItems: {},
          };

          const newChecklistItems = {
            ...existingModule.checklistItems,
            [itemId]: completed,
          };
          
          // Auto-upgrade to in-progress if not started
          const newStatus = existingModule.status === 'not-started' 
            ? 'in-progress' 
            : existingModule.status;

          const newModules = { ...state.modules };
          newModules[canonicalId] = {
            ...existingModule,
            status: newStatus,
            lastAccessedAt: now,
            checklistItems: newChecklistItems,
          };

          const newStartDate = state.startDate || now;

          return {
            modules: newModules,
            startDate: newStartDate,
          };
        });
        
        window.dispatchEvent(new Event('module-progress-updated'));
      },

      updateLastAccessed: (moduleId: string) => {
        const canonicalId = STORAGE_KEY_TO_MODULE_ID[moduleId] || moduleId;
        const now = new Date().toISOString();
        
        set((state) => {
          const existingModule = state.modules[canonicalId];
          if (!existingModule) return state;
          
          return {
            modules: {
              ...state.modules,
              [canonicalId]: { ...existingModule, lastAccessedAt: now },
            },
          };
        });
      },

      resetAllProgress: () => {
        set({ 
          modules: {}, 
          activities: [],
          startDate: null 
        });
        
        // Also clear legacy localStorage keys
        try {
          localStorage.removeItem('consumer-duty-progress');
          localStorage.removeItem('consumer-duty-activity');
          localStorage.removeItem('consumer-duty-user-data');
          localStorage.removeItem('implementation-start-date');
          
          // Clear checklist data
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('checklist-')) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (e) {
          console.error('Error clearing legacy data:', e);
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
        // This function should NOT auto-set a date
        // The start date is ONLY set when the first module is marked as in-progress or complete
        // This is already handled in markModuleComplete and markModuleInProgress
        const state = get();
        
        // Validate existing start date
        if (state.startDate) {
          const startDate = new Date(state.startDate);
          const now = new Date();
          
          // If start date is invalid or in the future, clear it
          if (isNaN(startDate.getTime()) || startDate > now) {
            console.warn('[ProgressStore] Invalid start date detected, clearing');
            set({ startDate: null });
          }
        }
      },

      addActivity: (type: Activity['type'], moduleId: string, moduleName: string) => {
        const now = new Date().toISOString();
        const newActivity: Activity = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type,
          moduleId,
          moduleName,
          timestamp: now,
        };
        
        set((state) => ({
          activities: [newActivity, ...state.activities].slice(0, 50),
          // Also set start date if not already set (first activity = start)
          startDate: state.startDate || now,
        }));
      },

      clearActivities: () => {
        set({ activities: [] });
      },

      validateAndRepairState: () => {
        const state = get();
        const errors: string[] = [];
        let repaired = false;
        
        const validModuleIds: string[] = Object.values(MODULE_CATEGORIES).flat();
        const newModules = { ...state.modules };
        
        // Check for invalid module IDs
        Object.keys(newModules).forEach(moduleId => {
          if (!validModuleIds.includes(moduleId)) {
            errors.push(`Invalid module ID: ${moduleId}`);
            delete newModules[moduleId];
            repaired = true;
          }
        });
        
        // Check for invalid statuses
        Object.entries(newModules).forEach(([moduleId, module]) => {
          if (!['not-started', 'in-progress', 'complete'].includes(module.status)) {
            errors.push(`Invalid status for ${moduleId}: ${module.status}`);
            newModules[moduleId] = { ...module, status: 'not-started' };
            repaired = true;
          }
        });
        
        if (repaired) {
          set({ modules: newModules });
          console.warn('[ProgressStore] State repaired:', errors);
        }
        
        return { valid: errors.length === 0, repaired, errors };
      },

      getModuleStatus: (moduleId: string) => {
        const canonicalId = STORAGE_KEY_TO_MODULE_ID[moduleId] || moduleId;
        const state = get();
        return state.modules[canonicalId] || {
          moduleId: canonicalId,
          status: 'not-started',
          checklistItems: {},
        };
      },

      getCategoryProgress: (category: keyof typeof MODULE_CATEGORIES) => {
        const state = get();
        const categoryModules = MODULE_CATEGORIES[category];
        const total = categoryModules.length;

        const completed = categoryModules.filter(
          (moduleId) => state.modules[moduleId]?.status === 'complete'
        ).length;

        return {
          completed,
          total,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      },

      getOverallProgress: () => {
        const state = get();
        const allModules = Object.values(MODULE_CATEGORIES).flat();
        
        const completed = allModules.filter(
          (moduleId) => state.modules[moduleId]?.status === 'complete'
        ).length;
        
        const inProgress = allModules.filter(
          (moduleId) => state.modules[moduleId]?.status === 'in-progress'
        ).length;

        return {
          completed,
          inProgress,
          total: TOTAL_MODULES,
          percentage: Math.round((completed / TOTAL_MODULES) * 100),
        };
      },

      getCompletedModulesCount: () => {
        const state = get();
        return Object.values(state.modules).filter(
          (module) => module.status === 'complete'
        ).length;
      },

      getInProgressModules: () => {
        const state = get();
        return Object.values(state.modules).filter(
          (module) => module.status === 'in-progress'
        );
      },

      getDaysSinceStart: () => {
        const state = get();
        if (!state.startDate) return -1; // -1 indicates not started

        const start = new Date(state.startDate);
        const now = new Date();
        // Reset time to midnight for accurate day calculation
        const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diffTime = nowMidnight.getTime() - startMidnight.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return Math.max(0, diffDays);
      },

      getStartDate: () => {
        const state = get();
        return state.startDate;
      },

      getFormattedStartDate: () => {
        const state = get();
        if (!state.startDate) return null;
        
        const date = new Date(state.startDate);
        if (isNaN(date.getTime())) return null;
        
        // Format as DD/MM/YYYY (British format)
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
      },

      getActivities: () => {
        const state = get();
        return state.activities;
      },

      getAverageDaysPerModule: () => {
        const state = get();
        const completedCount = Object.values(state.modules).filter(
          (m) => m.status === 'complete'
        ).length;
        
        if (completedCount === 0 || !state.startDate) return 0;

        const start = new Date(state.startDate);
        const now = new Date();
        const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diffDays = Math.max(1, Math.floor((nowMidnight.getTime() - startMidnight.getTime()) / (1000 * 60 * 60 * 24)));

        return Math.round((diffDays / completedCount) * 10) / 10; // 1 decimal
      },

      getEstimatedCompletionDate: () => {
        const state = get();
        const completedCount = Object.values(state.modules).filter(
          (m) => m.status === 'complete'
        ).length;
        
        if (completedCount === 0 || !state.startDate) return null;

        const remainingModules = TOTAL_MODULES - completedCount;
        if (remainingModules <= 0) return new Date(); // Already complete

        const avgDays = get().getAverageDaysPerModule();
        if (avgDays <= 0) return null;

        const estimatedDaysRemaining = Math.ceil(remainingModules * avgDays);
        const completionDate = new Date();
        completionDate.setDate(completionDate.getDate() + estimatedDaysRemaining);

        return completionDate;
      },
    }),
    {
      name: 'consumer-duty-progress-v2',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // On first load, try to migrate data from old localStorage format
        if (state) {
          const migratedData = migrateOldData();
          
          // Only merge migrated data for modules not already in the store
          // Never auto-complete modules - only user actions should mark complete
          const merged = { ...state.modules };
          
          Object.keys(migratedData).forEach(key => {
            // Only add from migrated data if not already present
            if (!merged[key]) {
              merged[key] = migratedData[key];
            }
          });
          
          state.modules = merged;
          
          // Log state for debugging in development
          if (process.env.NODE_ENV === 'development') {
            console.log('[ProgressStore] Rehydrated state:', {
              totalModules: Object.keys(state.modules).length,
              complete: Object.values(state.modules).filter(m => m.status === 'complete').length,
              inProgress: Object.values(state.modules).filter(m => m.status === 'in-progress').length,
            });
          }
        }
      },
    }
  )
);

// Subscribe to store changes for debugging
if (process.env.NODE_ENV === 'development') {
  useProgressStore.subscribe((state, prevState) => {
    const prevComplete = Object.values(prevState.modules).filter(m => m.status === 'complete').length;
    const currComplete = Object.values(state.modules).filter(m => m.status === 'complete').length;
    
    if (prevComplete !== currComplete) {
      console.log('[ProgressStore] Completed modules changed:', prevComplete, '→', currComplete);
    }
  });
}
