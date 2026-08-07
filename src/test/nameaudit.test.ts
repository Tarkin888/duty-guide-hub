import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getModuleDisplayName, normalizeModuleId, MODULE_REGISTRY } from '@/config/moduleRegistry';
import { CANONICAL_MODULE_TITLES } from '@/config/moduleTitles';

const dir = 'src/pages/modules';
const ids = new Set<string>();
for (const f of fs.readdirSync(dir)) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of s.matchAll(/(?:useModuleStatusControls\(|ModuleActionButtons moduleId=|moduleId=|storageKey=|STORAGE_KEY\s*=\s*|MODULE_ID\s*=\s*)["']([a-z0-9-]+)["']/g)) ids.add(m[1]);
}

describe('display names', () => {
  it('resolves every page module id', () => {
    const bad = [...ids].filter((id) => {
      const n = normalizeModuleId(id);
      return !MODULE_REGISTRY.some((m) => m.id === n) || getModuleDisplayName(id) === id;
    });
    expect({ bad, count: ids.size }).toEqual({ bad: [], count: ids.size });
  });

  it('registry name exactly equals the canonical module title', () => {
    const mismatches = MODULE_REGISTRY.filter(
      (m) => m.name !== CANONICAL_MODULE_TITLES[m.id],
    ).map((m) => ({ id: m.id, registry: m.name, canonical: CANONICAL_MODULE_TITLES[m.id] }));
    expect(mismatches).toEqual([]);
  });

  it('every canonical title has a registry module', () => {
    const orphans = Object.keys(CANONICAL_MODULE_TITLES).filter(
      (id) => !MODULE_REGISTRY.some((m) => m.id === id),
    );
    expect(orphans).toEqual([]);
  });

  it('every page module id (including both parts) resolves to the canonical title', () => {
    const bad = [...ids]
      .map((id) => ({ id, name: getModuleDisplayName(id), expected: CANONICAL_MODULE_TITLES[normalizeModuleId(id)] }))
      .filter((r) => r.expected !== undefined && r.name !== r.expected);
    expect(bad).toEqual([]);
  });
});
