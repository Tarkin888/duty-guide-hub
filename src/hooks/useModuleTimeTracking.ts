import { useEffect, useRef, useCallback } from "react";
import { trackModuleTimeSeconds } from "@/lib/moduleCompletionValidation";

/**
 * Tracks time spent on a module. Elapsed seconds are added to the
 * account-level progress store, which persists to the module_progress table.
 */
export function useModuleTimeTracking(moduleId: string) {
  const sessionStartRef = useRef<number>(Date.now());

  useEffect(() => {
    sessionStartRef.current = Date.now();

    const interval = setInterval(() => {
      const elapsedSeconds = (Date.now() - sessionStartRef.current) / 1000;
      if (elapsedSeconds >= 30) {
        trackModuleTimeSeconds(moduleId, elapsedSeconds);
        sessionStartRef.current = Date.now();
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      const elapsedSeconds = (Date.now() - sessionStartRef.current) / 1000;
      if (elapsedSeconds >= 1) {
        trackModuleTimeSeconds(moduleId, elapsedSeconds);
      }
    };
  }, [moduleId]);

  /** Force-save the current session (used before completion validation) */
  const saveCurrentSession = useCallback(() => {
    const elapsedSeconds = (Date.now() - sessionStartRef.current) / 1000;
    if (elapsedSeconds >= 1) {
      trackModuleTimeSeconds(moduleId, elapsedSeconds);
      sessionStartRef.current = Date.now();
    }
  }, [moduleId]);

  return { saveCurrentSession };
}
