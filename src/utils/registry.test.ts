import { describe, it, expect } from 'vitest';
import { MODULE_REGISTRY, ALL_MODULE_IDS, ALL_ITEM_KEYS, TOTAL_CHECKLIST_ITEMS, MODULE_CATEGORIES } from '@/config/moduleRegistry';

describe('static module registry', () => {
  it('defines exactly 20 modules', () => {
    expect(ALL_MODULE_IDS.length).toBe(20);
  });

  it('has a fixed, non-discovered total item count', () => {
    const sum = MODULE_REGISTRY.reduce((n, m) => n + m.items.length, 0);
    expect(sum).toBe(TOTAL_CHECKLIST_ITEMS);
  });

  it('assigns every module to exactly one category', () => {
    const seen = Object.values(MODULE_CATEGORIES).flat();
    expect(new Set(seen).size).toBe(20);
    expect(seen.length).toBe(20);
  });

  it('uses unique item keys across all modules', () => {
    const keys = ALL_ITEM_KEYS;
    expect(new Set(keys).size).toBe(keys.length);
  });
});
