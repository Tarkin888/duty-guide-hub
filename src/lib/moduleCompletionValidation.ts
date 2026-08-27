import { useProgressStore } from '@/stores/progressStore';

/**
 * Module completion validation utilities.
 *
 * Every signal below (tabs viewed, templates downloaded, time spent, checklist
 * progress) is read from the account-level progress store, which is backed by
 * the module_progress table in the database. Nothing is device-local.
 */

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
  return useProgressStore.getState().getModuleActivity(moduleId).tabsViewed;
}

/**
 * Get template downloads for a module
 */
export function getTemplateDownloads(moduleId: string): string[] {
  return useProgressStore.getState().getModuleActivity(moduleId).templateDownloads;
}

/**
 * Track a template download for a module
 */
export function trackTemplateDownload(moduleId: string, templateId: string): void {
  useProgressStore.getState().addTemplateDownload(moduleId, templateId);
}

/**
 * Get time spent on a module (in minutes)
 */
export function getModuleTimeSpent(moduleId: string): number {
  return useProgressStore.getState().getModuleActivity(moduleId).timeSpentSeconds / 60;
}

/**
 * Add elapsed session time (in seconds) to a module
 */
export function trackModuleTimeSeconds(moduleId: string, seconds: number): void {
  useProgressStore.getState().addTimeSpentSeconds(moduleId, seconds);
}

/**
 * Get checklist progress for a module from the single progress store
 * (denominators come from the static module registry)
 */
function getChecklistProgress(moduleId: string): number {
  return useProgressStore.getState().getModuleStatus(moduleId).percentage;
}

/**
 * Validate module completion readiness
 */
export function validateModuleCompletion(moduleId: string): ValidationResult {
  // Only the six core content tabs count towards completion (Notes is additive)
  const tabsViewed = getTabsViewed(moduleId).filter((tab) => EXPECTED_TABS.includes(tab));
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
