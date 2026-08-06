import { useCallback } from 'react';
import { toast } from 'sonner';
import { useProgressStore, useModuleProgress, normalizeModuleId } from '@/stores/progressStore';

export type LegacyStatus = 'not-started' | 'in-progress' | 'completed';

const STATUS_LABELS: Record<LegacyStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Complete',
};

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

  /**
   * Persists the status and returns true only if the store actually saved it.
   * Always confirms the change to the user with a toast, so dropdown-style
   * controls give the same feedback as the button-style ones.
   */
  const setStatus = useCallback((next: LegacyStatus): boolean => {
    try {
      if (next === 'completed') markModuleComplete(canonicalId, false);
      else if (next === 'in-progress') markModuleInProgress(canonicalId, false);
      else resetModuleProgress(canonicalId, false);

      const saved = useProgressStore.getState().getModuleStatus(canonicalId).status;
      const expected = next === 'completed' ? 'complete' : next;
      const didSave = saved === expected;

      if (didSave) {
        toast.success(`Status updated to ${STATUS_LABELS[next]}`);
      } else {
        toast.error('Could not save the status change. Please try again.');
      }

      return didSave;
    } catch (error) {
      console.error('[useModuleStatusControls] Failed to save status:', error);
      toast.error('Could not save the status change. Please try again.');
      return false;
    }
  }, [canonicalId, markModuleComplete, markModuleInProgress, resetModuleProgress]);

  return { status, setStatus, canonicalId };
}

