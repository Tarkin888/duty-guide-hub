import { useCallback } from 'react';
import { useProgressStore, useModuleProgress, normalizeModuleId } from '@/stores/progressStore';

export type LegacyStatus = 'not-started' | 'in-progress' | 'completed';

/**
 * Reads module status from the single progress store and exposes setters that
 * write back to it. Module pages use this so that no page keeps its own count
 * or status copy.
 */
export function useModuleStatusControls(storageId: string) {
  const canonicalId = normalizeModuleId(storageId);
  const progress = useModuleProgress(canonicalId);
  const markModuleComplete = useProgressStore((state) => state.markModuleComplete);
  const markModuleInProgress = useProgressStore((state) => state.markModuleInProgress);
  const resetModuleProgress = useProgressStore((state) => state.resetModuleProgress);

  const status: LegacyStatus = progress.status === 'complete' ? 'completed' : progress.status;

  /** Persists the status and returns true only if the store actually saved it. */
  const setStatus = useCallback((next: LegacyStatus): boolean => {
    try {
      if (next === 'completed') markModuleComplete(canonicalId, false);
      else if (next === 'in-progress') markModuleInProgress(canonicalId, false);
      else resetModuleProgress(canonicalId, false);

      const saved = useProgressStore.getState().getModuleStatus(canonicalId).status;
      const expected = next === 'completed' ? 'complete' : next;
      return saved === expected;
    } catch (error) {
      console.error('[useModuleStatusControls] Failed to save status:', error);
      return false;
    }
  }, [canonicalId, markModuleComplete, markModuleInProgress, resetModuleProgress]);

  return { status, setStatus, canonicalId };
}

