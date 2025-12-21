// Storage helper utilities for progress persistence validation

export const STORAGE_KEYS = {
  PROGRESS: 'consumer-duty-progress',
  ACTIVITY_LOG: 'consumer-duty-activity',
  START_DATE: 'implementation-start-date',
  USER_DATA: 'consumer-duty-user-data',
} as const;

// All valid module IDs
export const ALL_MODULE_IDS = [
  'CD-F1', 'CD-F2', 'CD-F3',
  'CD-P1', 'CD-P2', 'CD-P3',
  'CD-I1', 'CD-I2', 'CD-I3', 'CD-I4',
  'CD-I5', 'CD-I6', 'CD-I7',
  'CD-T1', 'CD-T2', 'CD-T3',
  'CD-M1', 'CD-M2', 'CD-M3', 'CD-M4',
] as const;

// Valid status values
const VALID_STATUSES = ['not-started', 'in-progress', 'completed', 'complete'] as const;

/**
 * Check if localStorage is available and working
 */
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validate the structure and content of stored progress data
 */
export const validateStorageData = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check localStorage availability
  if (!isStorageAvailable()) {
    errors.push('localStorage is not available in this browser');
    return { valid: false, errors };
  }

  // Validate progress data structure
  const progressData = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (progressData) {
    try {
      const parsed = JSON.parse(progressData);
      if (typeof parsed !== 'object' || parsed === null) {
        errors.push('Progress data is not a valid object');
      } else {
        // Check each entry has valid structure
        Object.entries(parsed).forEach(([key, value]: [string, any]) => {
          if (typeof value !== 'object' || value === null) {
            errors.push(`Invalid entry for module ${key}`);
          } else if (value.status && !VALID_STATUSES.includes(value.status)) {
            errors.push(`Invalid status "${value.status}" for module ${key}`);
          }
        });
      }
    } catch (e) {
      errors.push('Progress data JSON is corrupted');
    }
  }

  // Validate activity log format
  const activityLog = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG);
  if (activityLog) {
    try {
      const parsed = JSON.parse(activityLog);
      if (!Array.isArray(parsed)) {
        errors.push('Activity log is not an array');
      }
    } catch (e) {
      errors.push('Activity log JSON is corrupted');
    }
  }

  // Validate start date format
  const startDate = localStorage.getItem(STORAGE_KEYS.START_DATE);
  if (startDate) {
    const date = new Date(startDate);
    if (isNaN(date.getTime())) {
      errors.push('Start date is not a valid date');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Get a summary of current progress from storage
 */
export const getProgressSummary = (): {
  totalModules: number;
  completed: number;
  inProgress: number;
  notStarted: number;
} => {
  const progressData = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  let completed = 0;
  let inProgress = 0;

  if (progressData) {
    try {
      const parsed = JSON.parse(progressData);
      Object.values(parsed).forEach((entry: any) => {
        if (entry?.status === 'completed' || entry?.status === 'complete') {
          completed++;
        } else if (entry?.status === 'in-progress') {
          inProgress++;
        }
      });
    } catch (e) {
      console.error('Failed to parse progress data:', e);
    }
  }

  return {
    totalModules: 20,
    completed,
    inProgress,
    notStarted: 20 - completed - inProgress,
  };
};

/**
 * Export all progress data for backup
 */
export const exportProgressData = (): string => {
  const data = {
    progress: localStorage.getItem(STORAGE_KEYS.PROGRESS),
    activities: localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG),
    startDate: localStorage.getItem(STORAGE_KEYS.START_DATE),
    userData: localStorage.getItem(STORAGE_KEYS.USER_DATA),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

/**
 * Import progress data from backup
 */
export const importProgressData = (jsonData: string): { success: boolean; error?: string } => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.progress) {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, data.progress);
    }
    if (data.activities) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOG, data.activities);
    }
    if (data.startDate) {
      localStorage.setItem(STORAGE_KEYS.START_DATE, data.startDate);
    }
    if (data.userData) {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, data.userData);
    }

    // Trigger UI update
    window.dispatchEvent(new Event('module-progress-updated'));
    
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Invalid backup data format' };
  }
};
