// Local storage utilities for progress tracking

export interface ModuleProgress {
  status: "not-started" | "in-progress" | "completed";
  lastUpdated: string;
}

export interface ProgressData {
  [moduleId: string]: ModuleProgress;
}

const STORAGE_KEY = "consumer-duty-progress";

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
