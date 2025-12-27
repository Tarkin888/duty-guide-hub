import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY_PREFIX = "module-tabs-viewed-";

export interface TabViewState {
  viewedTabs: Set<string>;
  markTabViewed: (tabValue: string) => void;
  isTabViewed: (tabValue: string) => boolean;
  resetViewedTabs: () => void;
}

export function useTabViewTracking(moduleId: string): TabViewState {
  const storageKey = `${STORAGE_KEY_PREFIX}${moduleId}`;
  
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return new Set(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading tab view state:", error);
    }
    return new Set();
  });

  // Save to localStorage when viewedTabs changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(viewedTabs)));
    } catch (error) {
      console.error("Error saving tab view state:", error);
    }
  }, [viewedTabs, storageKey]);

  const markTabViewed = useCallback((tabValue: string) => {
    setViewedTabs(prev => {
      if (prev.has(tabValue)) return prev;
      const newSet = new Set(prev);
      newSet.add(tabValue);
      return newSet;
    });
  }, []);

  const isTabViewed = useCallback((tabValue: string) => {
    return viewedTabs.has(tabValue);
  }, [viewedTabs]);

  const resetViewedTabs = useCallback(() => {
    setViewedTabs(new Set());
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Error resetting tab view state:", error);
    }
  }, [storageKey]);

  return {
    viewedTabs,
    markTabViewed,
    isTabViewed,
    resetViewedTabs,
  };
}
