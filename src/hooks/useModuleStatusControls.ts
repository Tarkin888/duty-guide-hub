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

  const setStatus = useCallback((next: LegacyStatus) => {
    if (next === 'completed') markModuleComplete(canonicalId, false);
    else if (next === 'in-progress') markModuleInProgress(canonicalId, false);
    else resetModuleProgress(canonicalId, false);
  }, [canonicalId, markModuleComplete, markModuleInProgress, resetModuleProgress]);

  return { status, setStatus, canonicalId };
}
