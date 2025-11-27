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
  progress[moduleId] = {
    status,
    lastUpdated: new Date().toISOString(),
  };
  saveProgress(progress);
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
