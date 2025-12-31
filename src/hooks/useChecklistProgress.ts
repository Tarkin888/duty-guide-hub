import { useState, useEffect, useCallback } from 'react';
import { 
  getOverallChecklistProgress, 
  isLocalStorageAvailable,
  validateAndRepairStorage,
  type OverallChecklistProgress 
} from '@/lib/checklistProgress';

/**
 * Hook to track real-time checklist progress from localStorage
 * Updates automatically when checklist items change
 */
export function useChecklistProgress() {
  const [progress, setProgress] = useState<OverallChecklistProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProgress = useCallback(() => {
    try {
      if (!isLocalStorageAvailable()) {
        setStorageAvailable(false);
        setError('LocalStorage is not available. Progress cannot be saved.');
        setIsLoading(false);
        return;
      }

      // Validate and repair if needed
      const validation = validateAndRepairStorage();
      if (!validation.valid && validation.repaired) {
        console.warn('Repaired corrupted localStorage data:', validation.errors);
      }

      const newProgress = getOverallChecklistProgress();
      setProgress(newProgress);
      setError(null);
    } catch (e) {
      console.error('Error loading checklist progress:', e);
      setError('Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    refreshProgress();

    // Listen for checklist changes
    const handleChange = () => {
      refreshProgress();
    };

    window.addEventListener('checklist-item-changed', handleChange);
    window.addEventListener('checklist-reset', handleChange);
    window.addEventListener('module-progress-updated', handleChange);
    window.addEventListener('storage', handleChange);

    return () => {
      window.removeEventListener('checklist-item-changed', handleChange);
      window.removeEventListener('checklist-reset', handleChange);
      window.removeEventListener('module-progress-updated', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, [refreshProgress]);

  return {
    progress,
    isLoading,
    storageAvailable,
    error,
    refreshProgress,
  };
}
