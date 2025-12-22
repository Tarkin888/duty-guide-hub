// Checklist storage utilities with debouncing and persistence

export interface ChecklistState {
  [itemId: string]: boolean;
}

export interface ModuleChecklistData {
  items: ChecklistState;
  completedCount: number;
  totalCount: number;
  lastUpdated: string;
}

export interface AllChecklistData {
  [moduleId: string]: ModuleChecklistData;
}

const CHECKLIST_STORAGE_KEY = "consumer-duty-checklists";

// Debounce storage writes
let saveTimeout: ReturnType<typeof setTimeout> | null = null;
let pendingData: AllChecklistData | null = null;

const debouncedSave = (data: AllChecklistData) => {
  pendingData = data;
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  saveTimeout = setTimeout(() => {
    if (pendingData) {
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(pendingData));
      } catch (error) {
        console.error("Error saving checklist data:", error);
        // Handle quota exceeded
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          console.warn("localStorage quota exceeded. Trying to clear old data.");
        }
      }
    }
    saveTimeout = null;
  }, 300);
};

export const getAllChecklistData = (): AllChecklistData => {
  try {
    const data = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading checklist data:", error);
    return {};
  }
};

export const getModuleChecklistData = (moduleId: string): ModuleChecklistData | null => {
  const allData = getAllChecklistData();
  return allData[moduleId] || null;
};

export const saveModuleChecklistData = (
  moduleId: string,
  items: ChecklistState,
  totalCount: number
): void => {
  const allData = getAllChecklistData();
  const completedCount = Object.values(items).filter(Boolean).length;
  
  allData[moduleId] = {
    items,
    completedCount,
    totalCount,
    lastUpdated: new Date().toISOString(),
  };
  
  debouncedSave(allData);
};

export const updateChecklistItem = (
  moduleId: string,
  itemId: string,
  checked: boolean,
  totalCount: number
): ChecklistState => {
  const moduleData = getModuleChecklistData(moduleId);
  const items = moduleData?.items || {};
  
  items[itemId] = checked;
  saveModuleChecklistData(moduleId, items, totalCount);
  
  return items;
};

export const resetModuleChecklist = (moduleId: string): void => {
  const allData = getAllChecklistData();
  delete allData[moduleId];
  
  try {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(allData));
    window.dispatchEvent(new CustomEvent('checklist-reset', { detail: { moduleId } }));
  } catch (error) {
    console.error("Error resetting checklist:", error);
  }
};

export const getModuleCompletionPercentage = (moduleId: string): number => {
  const moduleData = getModuleChecklistData(moduleId);
  if (!moduleData || moduleData.totalCount === 0) return 0;
  return Math.round((moduleData.completedCount / moduleData.totalCount) * 100);
};

export const isModuleChecklistComplete = (moduleId: string): boolean => {
  const moduleData = getModuleChecklistData(moduleId);
  if (!moduleData) return false;
  return moduleData.completedCount === moduleData.totalCount && moduleData.totalCount > 0;
};

// Check if any checkbox has been checked for a module
export const hasModuleStarted = (moduleId: string): boolean => {
  const moduleData = getModuleChecklistData(moduleId);
  return moduleData ? moduleData.completedCount > 0 : false;
};
