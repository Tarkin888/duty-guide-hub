import { useEffect, useRef, useCallback } from "react";
import { startModuleSession, endModuleSession, trackModuleTime } from "@/lib/moduleCompletionValidation";

/**
 * Hook to track time spent on a module
 * Automatically starts tracking on mount and saves time on unmount
 */
export function useModuleTimeTracking(moduleId: string) {
  const sessionStartRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start session
    sessionStartRef.current = startModuleSession(moduleId);

    // Save time periodically (every minute)
    intervalRef.current = setInterval(() => {
      if (sessionStartRef.current) {
        // Calculate and save current session time
        const currentTime = Date.now();
        const minutesElapsed = (currentTime - sessionStartRef.current) / (1000 * 60);
        
        // Only save if more than 30 seconds elapsed
        if (minutesElapsed >= 0.5) {
          trackModuleTime(moduleId, sessionStartRef.current);
          // Reset session start to now to avoid double-counting
          sessionStartRef.current = currentTime;
        }
      }
    }, 60000); // Every minute

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Save final time
      endModuleSession(moduleId);
    };
  }, [moduleId]);

  // Force save current session (useful before validation)
  const saveCurrentSession = useCallback(() => {
    if (sessionStartRef.current) {
      trackModuleTime(moduleId, sessionStartRef.current);
      sessionStartRef.current = Date.now();
    }
  }, [moduleId]);

  return { saveCurrentSession };
}
