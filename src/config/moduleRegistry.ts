/**
 * MODULE REGISTRY - the single source of truth for progress tracking.
 *
 * Denominators (how many checklist items exist) are fixed at build time in
 * `moduleRegistry.generated.ts`. No count is ever derived from what the user has
 * happened to visit, so navigating between modules can never change a number.
 */

import {
  MODULE_REGISTRY,
  CATEGORY_NAMES,
  type CategoryKey,
  type ModuleDefinition,
} from './moduleRegistry.generated';

export { MODULE_REGISTRY, CATEGORY_NAMES };
export type { CategoryKey, ModuleDefinition };

export const TOTAL_MODULES = MODULE_REGISTRY.length;

/** Canonical module ids grouped by category, in display order */
export const MODULE_CATEGORIES = MODULE_REGISTRY.reduce((acc, module) => {
  (acc[module.category] ||= []).push(module.id);
  return acc;
}, {} as Record<CategoryKey, string[]>);

export const CATEGORY_KEYS = Object.keys(CATEGORY_NAMES) as CategoryKey[];

export const ALL_MODULE_IDS = MODULE_REGISTRY.map((m) => m.id);

const MODULE_BY_ID = new Map(MODULE_REGISTRY.map((m) => [m.id, m]));

/** Every checklist item key in the application (fixed at build time) */
export const ALL_ITEM_KEYS: string[] = MODULE_REGISTRY.flatMap((m) => m.items);

export const TOTAL_CHECKLIST_ITEMS = ALL_ITEM_KEYS.length;

const ITEM_KEY_SET = new Set(ALL_ITEM_KEYS);

/**
 * Maps any page-level storage id (e.g. "cd-p2-part1") or legacy alias to the
 * canonical module id (e.g. "CD-P2").
 */
export const STORAGE_ID_TO_MODULE_ID: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const module of MODULE_REGISTRY) {
    map[module.id] = module.id;
    map[module.id.toLowerCase()] = module.id;
    for (const storageId of module.storageIds) {
      map[storageId] = module.id;
    }
  }
  // Legacy aliases used by older pages / persisted data
  const legacyAliases: Record<string, string> = {
    'cd-f3-risk': 'CD-F3',
    'cd-f3-risk-assessment': 'CD-F3',
    'cd-p1-governance': 'CD-P1',
    'cd-p2-policy': 'CD-P2',
    'cd-p2-policy-framework': 'CD-P2',
    'cd-p3-roadmap': 'CD-P3',
    'cd-p3-implementation-roadmap': 'CD-P3',
    'cd-i1-products-services': 'CD-I1',
    'cd-i2-price-value': 'CD-I2',
    'cd-i3-consumer-understanding': 'CD-I3',
    'cd-i4-consumer-support': 'CD-I4',
    'cd-i5-vulnerable-customers': 'CD-I5',
    'cd-i6-distribution-chain': 'CD-I6',
    'cd-i7-data-evidence': 'CD-I7',
    'cd-t1-training': 'CD-T1',
    'cd-t2-communications': 'CD-T2',
    'cd-t2-communications-change': 'CD-T2',
    'cd-t3-technology': 'CD-T3',
    'cd-t3-technology-requirements': 'CD-T3',
    'cd-m1-mi-framework': 'CD-M1',
    'cd-m2-testing': 'CD-M2',
    'cd-m2-testing-assurance': 'CD-M2',
    'cd-m3-board-reporting': 'CD-M3',
    'cd-m4-continuous-improvement': 'CD-M4',
  };
  return { ...legacyAliases, ...map };
})();

/** Resolve any module id variant to its canonical id */
export function normalizeModuleId(moduleId: string): string {
  return STORAGE_ID_TO_MODULE_ID[moduleId] || moduleId;
}

export function getModuleDefinition(moduleId: string): ModuleDefinition | undefined {
  return MODULE_BY_ID.get(normalizeModuleId(moduleId));
}

export function getModuleDisplayName(moduleId: string): string {
  return getModuleDefinition(moduleId)?.name || normalizeModuleId(moduleId);
}

/** Fixed list of checklist item keys for a module (empty array if unknown) */
export function getModuleItemKeys(moduleId: string): string[] {
  return getModuleDefinition(moduleId)?.items || [];
}

/** Build the canonical item key used everywhere for a single checkbox */
export function makeItemKey(storageId: string, stepNumber: number, itemId: string): string {
  return `${storageId}::step${stepNumber}::${itemId}`;
}

export function isKnownItemKey(key: string): boolean {
  return ITEM_KEY_SET.has(key);
}

/** Item keys belonging to one page section (page storage id + step number) */
export function getStepItemKeys(storageId: string, stepNumber: number): string[] {
  const prefix = `${storageId}::step${stepNumber}::`;
  return getModuleItemKeys(storageId).filter((key) => key.startsWith(prefix));
}
