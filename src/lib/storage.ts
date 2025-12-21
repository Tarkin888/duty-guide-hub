// Local storage utilities for progress tracking

export interface ModuleProgress {
  status: "not-started" | "in-progress" | "completed";
  lastUpdated: string;
}

export interface ProgressData {
  [moduleId: string]: ModuleProgress;
}

export interface Activity {
  id: string;
  type: "module_completed" | "module_started" | "status_updated";
  moduleTitle: string;
  timestamp: string;
}

export interface UserData {
  startedDate: string;
  lastVisit: string;
}

const STORAGE_KEY = "consumer-duty-progress";
const ACTIVITY_KEY = "consumer-duty-activity";
const USER_DATA_KEY = "consumer-duty-user-data";

// Map storage keys to friendly module names
const MODULE_DISPLAY_NAMES: Record<string, string> = {
  'cd-f1-readiness': 'CD-F1: Readiness Assessment',
  'cd-f2-requirements': 'CD-F2: Requirements Mapping',
  'cd-f3-risk-assessment': 'CD-F3: Risk & Impact Assessment',
  'cd-p1-governance-framework': 'CD-P1: Governance Framework',
  'cd-p2-policy-framework': 'CD-P2: Policy Framework',
  'cd-p3-implementation-roadmap': 'CD-P3: Implementation Roadmap',
  'cd-i1-products-services': 'CD-I1: Products & Services',
  'cd-i2-price-value': 'CD-I2: Price & Value',
  'cd-i3-consumer-understanding': 'CD-I3: Consumer Understanding',
  'cd-i4-consumer-support': 'CD-I4: Consumer Support',
  'cd-i5-vulnerable-customers': 'CD-I5: Vulnerable Customers',
  'cd-i6-distribution-chain': 'CD-I6: Distribution Chain',
  'cd-i7-data-evidence': 'CD-I7: Data & Evidence',
  'cd-t1-training': 'CD-T1: Training Programme',
  'cd-t2-communications-change': 'CD-T2: Communications & Change',
  'cd-t3-technology-requirements': 'CD-T3: Technology Requirements',
  'cd-m1-mi-framework': 'CD-M1: MI Framework',
  'cd-m2-testing-assurance': 'CD-M2: Testing & Assurance',
  'cd-m3-board-reporting': 'CD-M3: Board Reporting',
  'cd-m4-continuous-improvement': 'CD-M4: Continuous Improvement',
};

// Get friendly display name for a module
const getModuleDisplayName = (moduleId: string): string => {
  return MODULE_DISPLAY_NAMES[moduleId] || moduleId.toUpperCase().replace(/-/g, ' ');
};

export const getProgress = (): ProgressData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading progress from localStorage:", error);
    return {};
  }
};

export const saveProgress = (progress: ProgressData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving progress to localStorage:", error);
  }
};

export const updateModuleStatus = (
  moduleId: string,
  status: "not-started" | "in-progress" | "completed"
): void => {
  const progress = getProgress();
  const previousStatus = progress[moduleId]?.status;
  
  progress[moduleId] = {
    status,
    lastUpdated: new Date().toISOString(),
  };
  saveProgress(progress);
  
  // Log activity for completed modules with friendly names
  const displayName = getModuleDisplayName(moduleId);
  if (status === "completed" && previousStatus !== "completed") {
    addActivity("module_completed", displayName);
  } else if (status === "in-progress" && previousStatus !== "in-progress") {
    addActivity("module_started", displayName);
  }
  
  // Dispatch custom event for same-tab updates (Dashboard will listen)
  window.dispatchEvent(new Event('module-progress-updated'));
};

export const getModuleStatus = (moduleId: string): "not-started" | "in-progress" | "completed" => {
  const progress = getProgress();
  return progress[moduleId]?.status || "not-started";
};

export const calculateOverallProgress = (): number => {
  const progress = getProgress();
  const modules = Object.values(progress);
  
  if (modules.length === 0) return 0;
  
  const completed = modules.filter(m => m.status === "completed").length;
  const inProgress = modules.filter(m => m.status === "in-progress").length;
  
  // Weight: completed = 100%, in-progress = 50%
  const totalWeight = completed * 100 + inProgress * 50;
  const maxWeight = modules.length * 100;
  
  return Math.round((totalWeight / maxWeight) * 100);
};

// Activity tracking
export const getActivities = (): Activity[] => {
  try {
    const data = localStorage.getItem(ACTIVITY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading activities from localStorage:", error);
    return [];
  }
};

export const addActivity = (type: Activity["type"], moduleTitle: string): void => {
  try {
    const activities = getActivities();
    const newActivity: Activity = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      moduleTitle,
      timestamp: new Date().toISOString(),
    };
    
    // Keep only last 20 activities
    const updatedActivities = [newActivity, ...activities].slice(0, 20);
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updatedActivities));
  } catch (error) {
    console.error("Error saving activity to localStorage:", error);
  }
};

// User data tracking
export const getUserData = (): UserData => {
  try {
    const data = localStorage.getItem(USER_DATA_KEY);
    if (data) {
      const userData = JSON.parse(data);
      // Update last visit
      userData.lastVisit = new Date().toISOString();
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      return userData;
    } else {
      // Initialize new user
      const newUserData: UserData = {
        startedDate: new Date().toISOString(),
        lastVisit: new Date().toISOString(),
      };
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUserData));
      return newUserData;
    }
  } catch (error) {
    console.error("Error managing user data:", error);
    return {
      startedDate: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
    };
  }
};

export const getDaysSinceStart = (): number => {
  const userData = getUserData();
  const startDate = new Date(userData.startedDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getPhaseProgress = () => {
  const progress = getProgress();
  
  const phases = {
    foundation: ["readiness-assessment", "requirements-mapping", "risk-impact"],
    governance: ["governance-framework", "policy-development", "implementation-roadmap"],
    outcomes: ["products-services", "price-value", "consumer-understanding", "consumer-support"],
    crossCutting: ["vulnerable-customers", "distribution-chain", "data-evidence"],
    enablement: ["training", "change-management", "technology"],
    monitoring: ["mi-monitoring", "testing-assurance", "board-reporting", "continuous-improvement"],
  };

  const calculatePhase = (moduleIds: string[]) => {
    const completed = moduleIds.filter(id => progress[id]?.status === "completed").length;
    return { completed, total: moduleIds.length };
  };

  return {
    foundation: calculatePhase(phases.foundation),
    governance: calculatePhase(phases.governance),
    outcomes: calculatePhase(phases.outcomes),
    crossCutting: calculatePhase(phases.crossCutting),
    enablement: calculatePhase(phases.enablement),
    monitoring: calculatePhase(phases.monitoring),
  };
};

export const getInProgressModules = () => {
  const progress = getProgress();
  return Object.entries(progress)
    .filter(([_, data]) => data.status === "in-progress")
    .map(([id, data]) => ({ id, ...data }));
};

export const getCompletedModulesCount = (): number => {
  const progress = getProgress();
  return Object.values(progress).filter(m => m.status === "completed").length;
};

export const resetAllProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVITY_KEY);
  } catch (error) {
    console.error("Error resetting progress:", error);
  }
};
