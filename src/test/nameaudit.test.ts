import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getModuleDisplayName, normalizeModuleId, MODULE_REGISTRY } from '../src/config/moduleRegistry';

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
});
