/**
 * Module completion validation utilities
 * Checks various criteria before allowing module completion
 */

// Storage keys
const TAB_VIEW_PREFIX = "module-tabs-viewed-";
const TEMPLATE_DOWNLOADS_KEY = "module-template-downloads";
const MODULE_TIME_KEY = "module-time-spent";

// Expected tabs for modules (6 tabs)
const EXPECTED_TABS = ["overview", "regulatory", "steps", "templates", "success", "pitfalls"];
const MIN_TABS_VIEWED = 6;
const MIN_CHECKLIST_PERCENTAGE = 70;
const MIN_TIME_MINUTES = 15;

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  details: {
    tabsViewed: number;
    tabsRequired: number;
    tabsValid: boolean;
    checklistPercentage: number;
    checklistRequired: number;
    checklistValid: boolean;
    templatesDownloaded: number;
    templatesValid: boolean;
    minutesSpent: number;
    minutesRequired: number;
    timeValid: boolean;
  };
}

/**
 * Get tabs viewed for a module
 */
export function getTabsViewed(moduleId: string): string[] {
  try {
    const stored = localStorage.getItem(`${TAB_VIEW_PREFIX}${moduleId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading tabs viewed:", error);
  }
  return [];
}

/**
 * Get template downloads for a module
 */
export function getTemplateDownloads(moduleId: string): string[] {
  try {
    const stored = localStorage.getItem(TEMPLATE_DOWNLOADS_KEY);
    if (stored) {
      const allDownloads = JSON.parse(stored);
      return allDownloads[moduleId] || [];
    }
  } catch (error) {
    console.error("Error reading template downloads:", error);
  }
  return [];
}

/**
 * Track a template download for a module
 */
export function trackTemplateDownload(moduleId: string, templateId: string): void {
  try {
    const stored = localStorage.getItem(TEMPLATE_DOWNLOADS_KEY);
    const allDownloads = stored ? JSON.parse(stored) : {};
    
    if (!allDownloads[moduleId]) {
      allDownloads[moduleId] = [];
    }
    
    if (!allDownloads[moduleId].includes(templateId)) {
      allDownloads[moduleId].push(templateId);
    }
    
    localStorage.setItem(TEMPLATE_DOWNLOADS_KEY, JSON.stringify(allDownloads));
  } catch (error) {
    console.error("Error tracking template download:", error);
  }
}

/**
 * Get time spent on a module (in minutes)
 */
export function getModuleTimeSpent(moduleId: string): number {
  try {
    const stored = localStorage.getItem(MODULE_TIME_KEY);
    if (stored) {
      const allTimes = JSON.parse(stored);
      return allTimes[moduleId]?.totalMinutes || 0;
    }
  } catch (error) {
    console.error("Error reading module time:", error);
  }
  return 0;
}

/**
 * Track time spent on a module (call this periodically while module is open)
 */
export function trackModuleTime(moduleId: string, sessionStartTime: number): void {
  try {
    const stored = localStorage.getItem(MODULE_TIME_KEY);
    const allTimes = stored ? JSON.parse(stored) : {};
    
    const currentSessionMinutes = (Date.now() - sessionStartTime) / (1000 * 60);
    const previousTotal = allTimes[moduleId]?.totalMinutes || 0;
    
    allTimes[moduleId] = {
      totalMinutes: previousTotal + currentSessionMinutes,
      lastUpdated: new Date().toISOString(),
    };
    
    localStorage.setItem(MODULE_TIME_KEY, JSON.stringify(allTimes));
  } catch (error) {
    console.error("Error tracking module time:", error);
  }
}

/**
 * Start tracking time for a module session
 */
export function startModuleSession(moduleId: string): number {
  const sessionStart = Date.now();
  
  // Store session start in sessionStorage (resets on browser close)
  sessionStorage.setItem(`module-session-start-${moduleId}`, sessionStart.toString());
  
  return sessionStart;
}

/**
 * End a module session and save the time
 */
export function endModuleSession(moduleId: string): void {
  const sessionStartStr = sessionStorage.getItem(`module-session-start-${moduleId}`);
  if (sessionStartStr) {
    const sessionStart = parseInt(sessionStartStr, 10);
    trackModuleTime(moduleId, sessionStart);
    sessionStorage.removeItem(`module-session-start-${moduleId}`);
  }
}

/**
 * Get checklist progress for a module (from localStorage)
 */
function getChecklistProgress(moduleId: string): number {
  try {
    let totalChecked = 0;
    let totalBoxes = 0;
    
    // Scan up to 10 steps
    for (let step = 1; step <= 10; step++) {
      const stepKey = `checklist-${moduleId}-step${step}`;
      const stored = localStorage.getItem(stepKey);
      
      if (stored) {
        const data = JSON.parse(stored);
        const entries = Object.entries(data);
        totalBoxes += entries.length;
        totalChecked += entries.filter(([, checked]) => checked === true).length;
      }
    }
    
    return totalBoxes > 0 ? Math.round((totalChecked / totalBoxes) * 100) : 0;
  } catch (error) {
    console.error("Error reading checklist progress:", error);
    return 0;
  }
}

/**
 * Validate module completion readiness
 */
export function validateModuleCompletion(moduleId: string): ValidationResult {
  const tabsViewed = getTabsViewed(moduleId);
  const checklistPercentage = getChecklistProgress(moduleId);
  const templatesDownloaded = getTemplateDownloads(moduleId);
  const minutesSpent = getModuleTimeSpent(moduleId);
  
  const tabsValid = tabsViewed.length >= MIN_TABS_VIEWED;
  const checklistValid = checklistPercentage >= MIN_CHECKLIST_PERCENTAGE;
  const templatesValid = templatesDownloaded.length >= 1;
  const timeValid = minutesSpent >= MIN_TIME_MINUTES;
  
  const warnings: string[] = [];
  
  if (!tabsValid) {
    warnings.push(`Only ${tabsViewed.length} of ${MIN_TABS_VIEWED} tabs have been visited`);
  }
  
  if (!checklistValid) {
    warnings.push(`Implementation checklist is only ${checklistPercentage}% complete (${MIN_CHECKLIST_PERCENTAGE}% required)`);
  }
  
  if (!templatesValid) {
    warnings.push("No templates have been downloaded yet");
  }
  
  if (!timeValid) {
    warnings.push(`Only ${Math.round(minutesSpent)} of ${MIN_TIME_MINUTES} minutes spent on this module`);
  }
  
  return {
    isValid: tabsValid && checklistValid && templatesValid && timeValid,
    warnings,
    details: {
      tabsViewed: tabsViewed.length,
      tabsRequired: MIN_TABS_VIEWED,
      tabsValid,
      checklistPercentage,
      checklistRequired: MIN_CHECKLIST_PERCENTAGE,
      checklistValid,
      templatesDownloaded: templatesDownloaded.length,
      templatesValid,
      minutesSpent: Math.round(minutesSpent),
      minutesRequired: MIN_TIME_MINUTES,
      timeValid,
    },
  };
}
