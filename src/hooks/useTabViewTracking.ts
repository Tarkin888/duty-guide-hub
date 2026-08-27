import { useCallback, useMemo } from "react";
import { useProgressStore } from "@/stores/progressStore";
import { normalizeModuleId } from "@/config/moduleRegistry";

export interface TabViewState {
  viewedTabs: Set<string>;
  markTabViewed: (tabValue: string) => void;
  isTabViewed: (tabValue: string) => boolean;
  resetViewedTabs: () => void;
}

/**
 * Tracks which module tabs the signed-in user has visited. State lives in the
 * account-level progress store (backed by the module_progress table), so it
 * follows the user across browsers and devices.
 */
export function useTabViewTracking(moduleId: string): TabViewState {
  const canonicalId = normalizeModuleId(moduleId);
  const tabs = useProgressStore(
    (state) => state.moduleActivity[canonicalId]?.tabsViewed
  );
  const markTabViewedAction = useProgressStore((state) => state.markTabViewed);
  const resetTabsViewedAction = useProgressStore((state) => state.resetTabsViewed);

  const viewedTabs = useMemo(() => new Set(tabs ?? []), [tabs]);

  const markTabViewed = useCallback(
    (tabValue: string) => markTabViewedAction(canonicalId, tabValue),
    [canonicalId, markTabViewedAction]
  );

  const isTabViewed = useCallback((tabValue: string) => viewedTabs.has(tabValue), [viewedTabs]);

  const resetViewedTabs = useCallback(
    () => resetTabsViewedAction(canonicalId),
    [canonicalId, resetTabsViewedAction]
  );

  return { viewedTabs, markTabViewed, isTabViewed, resetViewedTabs };
}
