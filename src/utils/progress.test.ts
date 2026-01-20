import { describe, it, expect } from 'vitest';
import {
  getModuleProgress,
  getModuleStatus,
  getPhaseProgress,
  getGlobalProgress,
  getCategoryProgress,
  validateProgressConsistency,
  parseChecklistData,
  aggregateStepProgress,
  MODULE_CATEGORIES,
  TOTAL_MODULES,
  type ChecklistItem,
  type ModuleProgressData,
} from './progress';

// ============================================================================
// getModuleProgress Tests
// ============================================================================

describe('getModuleProgress', () => {
  it('returns 0% for empty items array', () => {
    const result = getModuleProgress([]);
    expect(result).toEqual({
      completedCount: 0,
      totalCount: 0,
      percent: 0,
    });
  });

  it('returns 0% when no items are completed', () => {
    const items: ChecklistItem[] = [
      { id: '1', completed: false },
      { id: '2', completed: false },
      { id: '3', completed: false },
    ];
    const result = getModuleProgress(items);
    expect(result).toEqual({
      completedCount: 0,
      totalCount: 3,
      percent: 0,
    });
  });

  it('returns correct percentage for partially completed items', () => {
    const items: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: false },
      { id: '3', completed: true },
      { id: '4', completed: false },
    ];
    const result = getModuleProgress(items);
    expect(result).toEqual({
      completedCount: 2,
      totalCount: 4,
      percent: 50,
    });
  });

  it('returns 100% when all items are completed', () => {
    const items: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: true },
      { id: '3', completed: true },
    ];
    const result = getModuleProgress(items);
    expect(result).toEqual({
      completedCount: 3,
      totalCount: 3,
      percent: 100,
    });
  });

  it('rounds percentage correctly', () => {
    // 1/3 = 33.33...% should round to 33%
    const items: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: false },
      { id: '3', completed: false },
    ];
    const result = getModuleProgress(items);
    expect(result.percent).toBe(33);

    // 2/3 = 66.66...% should round to 67%
    const items2: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: true },
      { id: '3', completed: false },
    ];
    const result2 = getModuleProgress(items2);
    expect(result2.percent).toBe(67);
  });

  it('handles single item correctly', () => {
    expect(getModuleProgress([{ id: '1', completed: false }])).toEqual({
      completedCount: 0,
      totalCount: 1,
      percent: 0,
    });

    expect(getModuleProgress([{ id: '1', completed: true }])).toEqual({
      completedCount: 1,
      totalCount: 1,
      percent: 100,
    });
  });
});

// ============================================================================
// getModuleStatus Tests
// ============================================================================

describe('getModuleStatus', () => {
  it('returns not-started for empty items array', () => {
    const result = getModuleStatus([]);
    expect(result).toEqual({
      status: 'not-started',
      completedCount: 0,
      totalCount: 0,
    });
  });

  it('returns not-started when no items are completed', () => {
    const items: ChecklistItem[] = [
      { id: '1', completed: false },
      { id: '2', completed: false },
    ];
    const result = getModuleStatus(items);
    expect(result.status).toBe('not-started');
    expect(result.completedCount).toBe(0);
  });

  it('returns in-progress when some items are completed', () => {
    const items: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: false },
      { id: '3', completed: true },
    ];
    const result = getModuleStatus(items);
    expect(result.status).toBe('in-progress');
    expect(result.completedCount).toBe(2);
    expect(result.totalCount).toBe(3);
  });

  it('returns complete when all items are completed', () => {
    const items: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: true },
    ];
    const result = getModuleStatus(items);
    expect(result.status).toBe('complete');
    expect(result.completedCount).toBe(2);
    expect(result.totalCount).toBe(2);
  });

  it('returns complete for single completed item', () => {
    const result = getModuleStatus([{ id: '1', completed: true }]);
    expect(result.status).toBe('complete');
  });

  it('returns not-started for single incomplete item', () => {
    const result = getModuleStatus([{ id: '1', completed: false }]);
    expect(result.status).toBe('not-started');
  });
});

// ============================================================================
// getPhaseProgress Tests
// ============================================================================

describe('getPhaseProgress', () => {
  it('returns 0% for empty modules array', () => {
    const result = getPhaseProgress([]);
    expect(result).toEqual({
      completedModules: 0,
      inProgressModules: 0,
      notStartedModules: 0,
      totalModules: 0,
      percent: 0,
    });
  });

  it('returns 0% when all modules are not started', () => {
    const modules: ModuleProgressData[] = [
      { moduleId: 'CD-F1', status: 'not-started' },
      { moduleId: 'CD-F2', status: 'not-started' },
      { moduleId: 'CD-F3', status: 'not-started' },
    ];
    const result = getPhaseProgress(modules);
    expect(result).toEqual({
      completedModules: 0,
      inProgressModules: 0,
      notStartedModules: 3,
      totalModules: 3,
      percent: 0,
    });
  });

  it('calculates correct percentage for partially completed phase', () => {
    const modules: ModuleProgressData[] = [
      { moduleId: 'CD-F1', status: 'complete' },
      { moduleId: 'CD-F2', status: 'in-progress' },
      { moduleId: 'CD-F3', status: 'not-started' },
    ];
    const result = getPhaseProgress(modules);
    expect(result).toEqual({
      completedModules: 1,
      inProgressModules: 1,
      notStartedModules: 1,
      totalModules: 3,
      percent: 33, // 1/3 = 33.33...% rounds to 33%
    });
  });

  it('returns 100% when all modules are complete', () => {
    const modules: ModuleProgressData[] = [
      { moduleId: 'CD-F1', status: 'complete' },
      { moduleId: 'CD-F2', status: 'complete' },
      { moduleId: 'CD-F3', status: 'complete' },
    ];
    const result = getPhaseProgress(modules);
    expect(result).toEqual({
      completedModules: 3,
      inProgressModules: 0,
      notStartedModules: 0,
      totalModules: 3,
      percent: 100,
    });
  });

  it('only counts complete modules in percentage calculation', () => {
    // 2 complete, 1 in-progress, 1 not-started = 50% (2/4)
    const modules: ModuleProgressData[] = [
      { moduleId: 'CD-I1', status: 'complete' },
      { moduleId: 'CD-I2', status: 'complete' },
      { moduleId: 'CD-I3', status: 'in-progress' },
      { moduleId: 'CD-I4', status: 'not-started' },
    ];
    const result = getPhaseProgress(modules);
    expect(result.percent).toBe(50);
    expect(result.completedModules).toBe(2);
    expect(result.inProgressModules).toBe(1);
    expect(result.notStartedModules).toBe(1);
  });

  it('handles single module phase', () => {
    expect(getPhaseProgress([{ moduleId: 'CD-X1', status: 'not-started' }])).toMatchObject({
      completedModules: 0,
      totalModules: 1,
      percent: 0,
    });

    expect(getPhaseProgress([{ moduleId: 'CD-X1', status: 'complete' }])).toMatchObject({
      completedModules: 1,
      totalModules: 1,
      percent: 100,
    });
  });
});

// ============================================================================
// getGlobalProgress Tests
// ============================================================================

describe('getGlobalProgress', () => {
  it('returns 0% when no modules are tracked', () => {
    const result = getGlobalProgress({});
    expect(result).toEqual({
      completedModules: 0,
      inProgressModules: 0,
      notStartedModules: TOTAL_MODULES,
      totalModules: TOTAL_MODULES,
      percent: 0,
    });
  });

  it('calculates correct percentage based on TOTAL_MODULES constant', () => {
    // 4 modules complete = 4/20 = 20%
    const modules: Record<string, ModuleProgressData> = {
      'CD-F1': { moduleId: 'CD-F1', status: 'complete' },
      'CD-F2': { moduleId: 'CD-F2', status: 'complete' },
      'CD-F3': { moduleId: 'CD-F3', status: 'complete' },
      'CD-P1': { moduleId: 'CD-P1', status: 'complete' },
    };
    const result = getGlobalProgress(modules);
    expect(result.completedModules).toBe(4);
    expect(result.totalModules).toBe(20);
    expect(result.percent).toBe(20);
  });

  it('maintains invariant: completed + inProgress + notStarted === TOTAL_MODULES', () => {
    const modules: Record<string, ModuleProgressData> = {
      'CD-F1': { moduleId: 'CD-F1', status: 'complete' },
      'CD-F2': { moduleId: 'CD-F2', status: 'in-progress' },
      'CD-P1': { moduleId: 'CD-P1', status: 'complete' },
      'CD-I1': { moduleId: 'CD-I1', status: 'in-progress' },
      'CD-M1': { moduleId: 'CD-M1', status: 'complete' },
    };
    const result = getGlobalProgress(modules);
    
    const sum = result.completedModules + result.inProgressModules + result.notStartedModules;
    expect(sum).toBe(TOTAL_MODULES);
    expect(sum).toBe(20);
  });

  it('returns 100% when all modules are complete', () => {
    const modules: Record<string, ModuleProgressData> = {};
    // Mark all 20 modules as complete
    Object.values(MODULE_CATEGORIES).flat().forEach(moduleId => {
      modules[moduleId] = { moduleId, status: 'complete' };
    });
    
    const result = getGlobalProgress(modules);
    expect(result.completedModules).toBe(20);
    expect(result.notStartedModules).toBe(0);
    expect(result.inProgressModules).toBe(0);
    expect(result.percent).toBe(100);
  });

  it('treats missing modules as not-started', () => {
    const modules: Record<string, ModuleProgressData> = {
      'CD-F1': { moduleId: 'CD-F1', status: 'complete' },
    };
    const result = getGlobalProgress(modules);
    expect(result.completedModules).toBe(1);
    expect(result.notStartedModules).toBe(19);
  });

  it('ignores modules not in MODULE_CATEGORIES', () => {
    const modules: Record<string, ModuleProgressData> = {
      'CD-F1': { moduleId: 'CD-F1', status: 'complete' },
      'INVALID-MODULE': { moduleId: 'INVALID-MODULE', status: 'complete' },
    };
    const result = getGlobalProgress(modules);
    expect(result.completedModules).toBe(1); // Only CD-F1 counted
    expect(result.totalModules).toBe(20);
  });

  it('calculates percentage correctly for edge cases', () => {
    // 7 complete = 7/20 = 35%
    const modules: Record<string, ModuleProgressData> = {};
    ['CD-F1', 'CD-F2', 'CD-F3', 'CD-P1', 'CD-P2', 'CD-P3', 'CD-I1'].forEach(id => {
      modules[id] = { moduleId: id, status: 'complete' };
    });
    
    const result = getGlobalProgress(modules);
    expect(result.completedModules).toBe(7);
    expect(result.percent).toBe(35);
  });

  it('supports custom module categories', () => {
    const customCategories = {
      phase1: ['M1', 'M2'],
      phase2: ['M3', 'M4', 'M5'],
    };
    
    const modules: Record<string, ModuleProgressData> = {
      'M1': { moduleId: 'M1', status: 'complete' },
      'M2': { moduleId: 'M2', status: 'complete' },
    };
    
    const result = getGlobalProgress(modules, customCategories);
    expect(result.totalModules).toBe(5);
    expect(result.completedModules).toBe(2);
    expect(result.percent).toBe(40); // 2/5 = 40%
  });
});

// ============================================================================
// getCategoryProgress Tests
// ============================================================================

describe('getCategoryProgress', () => {
  it('returns progress for foundation category', () => {
    const modules: Record<string, ModuleProgressData> = {
      'CD-F1': { moduleId: 'CD-F1', status: 'complete' },
      'CD-F2': { moduleId: 'CD-F2', status: 'in-progress' },
    };
    
    const result = getCategoryProgress(modules, 'foundation');
    expect(result.totalModules).toBe(3);
    expect(result.completedModules).toBe(1);
    expect(result.inProgressModules).toBe(1);
    expect(result.notStartedModules).toBe(1);
    expect(result.percent).toBe(33); // 1/3
  });

  it('returns progress for outcomes category (4 modules)', () => {
    const modules: Record<string, ModuleProgressData> = {
      'CD-I1': { moduleId: 'CD-I1', status: 'complete' },
      'CD-I2': { moduleId: 'CD-I2', status: 'complete' },
      'CD-I3': { moduleId: 'CD-I3', status: 'complete' },
      'CD-I4': { moduleId: 'CD-I4', status: 'complete' },
    };
    
    const result = getCategoryProgress(modules, 'outcomes');
    expect(result.totalModules).toBe(4);
    expect(result.completedModules).toBe(4);
    expect(result.percent).toBe(100);
  });

  it('returns 0% for empty category', () => {
    const result = getCategoryProgress({}, 'monitoring');
    expect(result.percent).toBe(0);
    expect(result.notStartedModules).toBe(4); // monitoring has 4 modules
  });

  it('returns empty result for non-existent category', () => {
    const result = getCategoryProgress({}, 'nonexistent');
    expect(result.totalModules).toBe(0);
    expect(result.percent).toBe(0);
  });

  it('correctly calculates each category', () => {
    const modules: Record<string, ModuleProgressData> = {
      'CD-F1': { moduleId: 'CD-F1', status: 'complete' },
      'CD-F2': { moduleId: 'CD-F2', status: 'complete' },
      'CD-F3': { moduleId: 'CD-F3', status: 'complete' },
    };
    
    expect(getCategoryProgress(modules, 'foundation').percent).toBe(100);
    expect(getCategoryProgress(modules, 'governance').percent).toBe(0);
    expect(getCategoryProgress(modules, 'outcomes').percent).toBe(0);
  });
});

// ============================================================================
// validateProgressConsistency Tests
// ============================================================================

describe('validateProgressConsistency', () => {
  it('returns valid for consistent progress', () => {
    const progress = {
      completedModules: 5,
      inProgressModules: 3,
      notStartedModules: 12,
      totalModules: 20,
      percent: 25,
    };
    
    const result = validateProgressConsistency(progress);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('detects sum mismatch', () => {
    const progress = {
      completedModules: 5,
      inProgressModules: 3,
      notStartedModules: 10, // Should be 12
      totalModules: 20,
      percent: 25,
    };
    
    const result = validateProgressConsistency(progress);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('State sum (18) does not match totalModules (20)'))).toBe(true);
  });

  it('detects percentage mismatch', () => {
    const progress = {
      completedModules: 5,
      inProgressModules: 3,
      notStartedModules: 12,
      totalModules: 20,
      percent: 30, // Should be 25
    };
    
    const result = validateProgressConsistency(progress);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('Percentage mismatch'))).toBe(true);
  });

  it('returns valid for 0% progress', () => {
    const progress = {
      completedModules: 0,
      inProgressModules: 0,
      notStartedModules: 20,
      totalModules: 20,
      percent: 0,
    };
    
    const result = validateProgressConsistency(progress);
    expect(result.valid).toBe(true);
  });

  it('returns valid for 100% progress', () => {
    const progress = {
      completedModules: 20,
      inProgressModules: 0,
      notStartedModules: 0,
      totalModules: 20,
      percent: 100,
    };
    
    const result = validateProgressConsistency(progress);
    expect(result.valid).toBe(true);
  });
});

// ============================================================================
// parseChecklistData Tests
// ============================================================================

describe('parseChecklistData', () => {
  it('parses empty object to empty array', () => {
    const result = parseChecklistData({});
    expect(result).toEqual([]);
  });

  it('parses checklist data correctly', () => {
    const data = {
      'item-1': true,
      'item-2': false,
      'item-3': true,
    };
    const result = parseChecklistData(data);
    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ id: 'item-1', completed: true });
    expect(result).toContainEqual({ id: 'item-2', completed: false });
    expect(result).toContainEqual({ id: 'item-3', completed: true });
  });
});

// ============================================================================
// aggregateStepProgress Tests
// ============================================================================

describe('aggregateStepProgress', () => {
  it('returns 0% for empty steps array', () => {
    const result = aggregateStepProgress([]);
    expect(result).toEqual({
      completedCount: 0,
      totalCount: 0,
      percent: 0,
    });
  });

  it('aggregates progress across multiple steps', () => {
    const steps = [
      { 'step1-item1': true, 'step1-item2': false },
      { 'step2-item1': true, 'step2-item2': true },
      { 'step3-item1': false, 'step3-item2': false },
    ];
    
    const result = aggregateStepProgress(steps);
    expect(result).toEqual({
      completedCount: 3, // 1 + 2 + 0
      totalCount: 6,
      percent: 50,
    });
  });

  it('handles steps with varying item counts', () => {
    const steps = [
      { 'a': true },
      { 'b': true, 'c': true, 'd': false },
      { 'e': false, 'f': false },
    ];
    
    const result = aggregateStepProgress(steps);
    expect(result.completedCount).toBe(3);
    expect(result.totalCount).toBe(6);
    expect(result.percent).toBe(50);
  });

  it('returns 100% when all items across all steps are complete', () => {
    const steps = [
      { 'a': true, 'b': true },
      { 'c': true },
    ];
    
    const result = aggregateStepProgress(steps);
    expect(result.percent).toBe(100);
  });
});

// ============================================================================
// MODULE_CATEGORIES Constant Tests
// ============================================================================

describe('MODULE_CATEGORIES', () => {
  it('contains exactly 20 modules total', () => {
    const allModules = Object.values(MODULE_CATEGORIES).flat();
    expect(allModules).toHaveLength(20);
  });

  it('has no duplicate module IDs', () => {
    const allModules = Object.values(MODULE_CATEGORIES).flat();
    const uniqueModules = new Set(allModules);
    expect(uniqueModules.size).toBe(allModules.length);
  });

  it('has expected category structure', () => {
    expect(MODULE_CATEGORIES.foundation).toHaveLength(3);
    expect(MODULE_CATEGORIES.governance).toHaveLength(3);
    expect(MODULE_CATEGORIES.outcomes).toHaveLength(4);
    expect(MODULE_CATEGORIES.crossCutting).toHaveLength(3);
    expect(MODULE_CATEGORIES.enablement).toHaveLength(3);
    expect(MODULE_CATEGORIES.monitoring).toHaveLength(4);
  });

  it('TOTAL_MODULES matches actual count', () => {
    const allModules = Object.values(MODULE_CATEGORIES).flat();
    expect(TOTAL_MODULES).toBe(allModules.length);
    expect(TOTAL_MODULES).toBe(20);
  });
});

// ============================================================================
// Edge Cases and Regression Tests
// ============================================================================

describe('Edge Cases', () => {
  it('handles module status transitions correctly', () => {
    // Simulating state transitions
    const stateNotStarted: ChecklistItem[] = [
      { id: '1', completed: false },
      { id: '2', completed: false },
    ];
    expect(getModuleStatus(stateNotStarted).status).toBe('not-started');
    
    // First item checked
    const stateInProgress: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: false },
    ];
    expect(getModuleStatus(stateInProgress).status).toBe('in-progress');
    
    // All items checked
    const stateComplete: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: true },
    ];
    expect(getModuleStatus(stateComplete).status).toBe('complete');
    
    // Item unchecked (reversion)
    const stateReverted: ChecklistItem[] = [
      { id: '1', completed: true },
      { id: '2', completed: false },
    ];
    expect(getModuleStatus(stateReverted).status).toBe('in-progress');
  });

  it('handles large checklist with many items', () => {
    const items: ChecklistItem[] = Array.from({ length: 100 }, (_, i) => ({
      id: `item-${i}`,
      completed: i < 75, // 75 completed out of 100
    }));
    
    const result = getModuleProgress(items);
    expect(result.completedCount).toBe(75);
    expect(result.totalCount).toBe(100);
    expect(result.percent).toBe(75);
  });

  it('regression: denominator should always be TOTAL_MODULES for global progress', () => {
    // This was a bug where the denominator was the count of interacted modules
    // instead of the fixed TOTAL_MODULES constant
    
    // Only 2 modules interacted with, but percentage should be based on 20
    const modules: Record<string, ModuleProgressData> = {
      'CD-F1': { moduleId: 'CD-F1', status: 'complete' },
      'CD-F2': { moduleId: 'CD-F2', status: 'in-progress' },
    };
    
    const result = getGlobalProgress(modules);
    // Should be 1/20 = 5%, NOT 1/2 = 50%
    expect(result.percent).toBe(5);
    expect(result.totalModules).toBe(20);
  });

  it('percentage rounding edge cases', () => {
    // 1/20 = 5%
    const oneComplete = { 'CD-F1': { moduleId: 'CD-F1', status: 'complete' as const } };
    expect(getGlobalProgress(oneComplete).percent).toBe(5);
    
    // 3/20 = 15%
    const threeComplete: Record<string, ModuleProgressData> = {};
    ['CD-F1', 'CD-F2', 'CD-F3'].forEach(id => {
      threeComplete[id] = { moduleId: id, status: 'complete' };
    });
    expect(getGlobalProgress(threeComplete).percent).toBe(15);
    
    // 19/20 = 95%
    const nineteenComplete: Record<string, ModuleProgressData> = {};
    Object.values(MODULE_CATEGORIES).flat().slice(0, 19).forEach(id => {
      nineteenComplete[id] = { moduleId: id, status: 'complete' };
    });
    expect(getGlobalProgress(nineteenComplete).percent).toBe(95);
  });
});
