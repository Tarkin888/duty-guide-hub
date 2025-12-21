import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  ModuleProgress,
  CategoryProgress,
  OverallProgress,
  initializeProgress,
  calculateOverallProgress,
  getAllCategoryProgress,
  updateModuleStatus as updateModuleStatusFn,
  validateProgressState,
  resetAllProgress as resetAllProgressFn,
  getInProgressModules as getInProgressModulesFn,
  getDaysSinceStart,
  getStartDate
} from '@/lib/progressState';

interface ProgressContextType {
  progress: Map<string, ModuleProgress>;
  overallProgress: OverallProgress;
  categoryProgress: Record<string, CategoryProgress>;
  updateModule: (moduleId: string, status: 'not-started' | 'in-progress' | 'complete') => void;
  resetAllProgress: () => void;
  isValidState: boolean;
  validationErrors: string[];
  inProgressModules: ModuleProgress[];
  daysSinceStart: number;
  startDate: string | null;
  refreshProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Map<string, ModuleProgress>>(() => 
    initializeProgress()
  );
  
  const [overallProgress, setOverallProgress] = useState<OverallProgress>(() =>
    calculateOverallProgress(initializeProgress())
  );
  
  const [categoryProgress, setCategoryProgress] = useState<Record<string, CategoryProgress>>(() =>
    getAllCategoryProgress(initializeProgress())
  );
  
  const [isValidState, setIsValidState] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [inProgressModules, setInProgressModules] = useState<ModuleProgress[]>([]);
  const [daysSinceStartState, setDaysSinceStartState] = useState(0);
  const [startDateState, setStartDateState] = useState<string | null>(null);

  // Refresh all progress data from storage
  const refreshProgress = useCallback(() => {
    const currentProgress = initializeProgress();
    setProgress(currentProgress);
    setOverallProgress(calculateOverallProgress(currentProgress));
    setCategoryProgress(getAllCategoryProgress(currentProgress));
    setInProgressModules(getInProgressModulesFn(currentProgress));
    setDaysSinceStartState(getDaysSinceStart());
    setStartDateState(getStartDate());
    
    const validation = validateProgressState(currentProgress);
    setIsValidState(validation.valid);
    setValidationErrors(validation.errors);
  }, []);

  // Validate and recalculate whenever progress changes
  useEffect(() => {
    const validation = validateProgressState(progress);
    setIsValidState(validation.valid);
    setValidationErrors(validation.errors);
    
    setOverallProgress(calculateOverallProgress(progress));
    setCategoryProgress(getAllCategoryProgress(progress));
    setInProgressModules(getInProgressModulesFn(progress));
    setDaysSinceStartState(getDaysSinceStart());
    setStartDateState(getStartDate());
  }, [progress]);

  // Listen for storage events to sync across tabs and custom events for same-tab updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Listen for the key that storage.ts uses
      if (e.key === 'consumer-duty-progress') {
        refreshProgress();
      }
    };
    
    // Custom event for same-tab updates when module pages update progress
    const handleProgressUpdate = () => {
      refreshProgress();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('module-progress-updated', handleProgressUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('module-progress-updated', handleProgressUpdate);
    };
  }, [refreshProgress]);

  const updateModule = useCallback((
    moduleId: string, 
    status: 'not-started' | 'in-progress' | 'complete'
  ) => {
    setProgress(currentProgress => {
      const newProgress = updateModuleStatusFn(moduleId, status, currentProgress);
      return newProgress;
    });
  }, []);

  const resetAllProgress = useCallback(() => {
    resetAllProgressFn();
    const emptyProgress = new Map<string, ModuleProgress>();
    setProgress(emptyProgress);
  }, []);

  return (
    <ProgressContext.Provider value={{
      progress,
      overallProgress,
      categoryProgress,
      updateModule,
      resetAllProgress,
      isValidState,
      validationErrors,
      inProgressModules,
      daysSinceStart: daysSinceStartState,
      startDate: startDateState,
      refreshProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
