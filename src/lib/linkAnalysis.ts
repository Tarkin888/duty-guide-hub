// Link Analysis Utility for Site Health
// Defines all valid routes and module mappings for internal link validation

export interface ModuleRoute {
  id: string;
  code: string;
  path: string;
  title: string;
  category: string;
  relatedModules?: string[];
}

// Complete route mapping for all modules
export const MODULE_ROUTES: ModuleRoute[] = [
  // Foundation
  { id: 'cd-f1', code: 'CD-F1', path: '/foundation/readiness', title: 'Readiness Assessment', category: 'Foundation', relatedModules: ['CD-F2', 'CD-F3', 'CD-P1'] },
  { id: 'cd-f2', code: 'CD-F2', path: '/foundation/requirements', title: 'Requirements Mapping', category: 'Foundation', relatedModules: ['CD-F1', 'CD-F3', 'CD-P2'] },
  { id: 'cd-f3', code: 'CD-F3', path: '/foundation/risk-impact', title: 'Risk Assessment', category: 'Foundation', relatedModules: ['CD-F1', 'CD-F2', 'CD-M1'] },
  
  // Governance & Planning
  { id: 'cd-p1', code: 'CD-P1', path: '/governance/framework', title: 'Governance Framework', category: 'Governance', relatedModules: ['CD-P2', 'CD-P3', 'CD-M3'] },
  { id: 'cd-p1-part2', code: 'CD-P1-Part2', path: '/governance/framework-part2', title: 'Governance Framework Part 2', category: 'Governance', relatedModules: ['CD-P1', 'CD-P2'] },
  { id: 'cd-p2', code: 'CD-P2', path: '/governance/policy', title: 'Policy Framework Part 1', category: 'Governance', relatedModules: ['CD-P1', 'CD-P3'] },
  { id: 'cd-p2-part2', code: 'CD-P2-Part2', path: '/governance/policy-part2', title: 'Policy Framework Part 2', category: 'Governance', relatedModules: ['CD-P2', 'CD-P1'] },
  { id: 'cd-p3', code: 'CD-P3', path: '/governance/roadmap', title: 'Implementation Roadmap', category: 'Governance', relatedModules: ['CD-P1', 'CD-P2', 'CD-T1'] },
  
  // Four Outcomes
  { id: 'cd-i1', code: 'CD-I1', path: '/outcomes/products-services', title: 'Products & Services', category: 'Outcomes', relatedModules: ['CD-I2', 'CD-I6'] },
  { id: 'cd-i2', code: 'CD-I2', path: '/outcomes/price-value', title: 'Price & Value', category: 'Outcomes', relatedModules: ['CD-I1', 'CD-I3'] },
  { id: 'cd-i3', code: 'CD-I3', path: '/outcomes/consumer-understanding', title: 'Consumer Understanding', category: 'Outcomes', relatedModules: ['CD-I4', 'CD-T2'] },
  { id: 'cd-i4', code: 'CD-I4', path: '/outcomes/consumer-support', title: 'Consumer Support', category: 'Outcomes', relatedModules: ['CD-I3', 'CD-I5'] },
  
  // Cross-Cutting
  { id: 'cd-i5', code: 'CD-I5', path: '/cross-cutting/vulnerable-customers', title: 'Vulnerable Customers', category: 'Cross-Cutting', relatedModules: ['CD-I3', 'CD-I4', 'CD-T1'] },
  { id: 'cd-i6', code: 'CD-I6', path: '/cross-cutting/distribution-chain', title: 'Distribution Chain', category: 'Cross-Cutting', relatedModules: ['CD-I1', 'CD-I2'] },
  { id: 'cd-i7a', code: 'CD-I7A', path: '/cross-cutting/data-evidence-part1', title: 'Data & Evidence Part 1', category: 'Cross-Cutting', relatedModules: ['CD-I7B', 'CD-M1'] },
  { id: 'cd-i7b', code: 'CD-I7B', path: '/cross-cutting/data-evidence-part2', title: 'Data & Evidence Part 2', category: 'Cross-Cutting', relatedModules: ['CD-I7A', 'CD-M1'] },
  
  // Enablement
  { id: 'cd-t1', code: 'CD-T1', path: '/enablement/training', title: 'Training Programme Part 1', category: 'Enablement', relatedModules: ['CD-T1-Part2', 'CD-T2'] },
  { id: 'cd-t1-part2', code: 'CD-T1-Part2', path: '/enablement/training-part2', title: 'Training Programme Part 2', category: 'Enablement', relatedModules: ['CD-T1', 'CD-T2'] },
  { id: 'cd-t2', code: 'CD-T2', path: '/enablement/communications', title: 'Communications & Change Part 1', category: 'Enablement', relatedModules: ['CD-T2-Part2', 'CD-T1', 'CD-I3'] },
  { id: 'cd-t2-part2', code: 'CD-T2-Part2', path: '/enablement/communications-part2', title: 'Communications & Change Part 2', category: 'Enablement', relatedModules: ['CD-T2', 'CD-T1'] },
  { id: 'cd-t3a', code: 'CD-T3A', path: '/enablement/technology', title: 'Technology Requirements Part 1', category: 'Enablement', relatedModules: ['CD-T3B', 'CD-I7A'] },
  { id: 'cd-t3b', code: 'CD-T3B', path: '/enablement/technology-part2', title: 'Technology Requirements Part 2', category: 'Enablement', relatedModules: ['CD-T3A', 'CD-I7A'] },
  
  // Monitoring & Assurance
  { id: 'cd-m1', code: 'CD-M1', path: '/monitoring/mi-monitoring', title: 'MI Framework', category: 'Monitoring', relatedModules: ['CD-M2A', 'CD-M3', 'CD-I7A'] },
  { id: 'cd-m2a', code: 'CD-M2A', path: '/monitoring/testing-assurance', title: 'Testing & Assurance Part 1', category: 'Monitoring', relatedModules: ['CD-M2B', 'CD-M1'] },
  { id: 'cd-m2b', code: 'CD-M2B', path: '/monitoring/testing-assurance-part2', title: 'Testing & Assurance Part 2', category: 'Monitoring', relatedModules: ['CD-M2A', 'CD-M3'] },
  { id: 'cd-m3', code: 'CD-M3', path: '/monitoring/board-reporting', title: 'Board Reporting Part 1', category: 'Monitoring', relatedModules: ['CD-M3-Part2', 'CD-P1'] },
  { id: 'cd-m3-part2', code: 'CD-M3-Part2', path: '/monitoring/board-reporting-part2', title: 'Board Reporting Part 2', category: 'Monitoring', relatedModules: ['CD-M3', 'CD-M4'] },
  { id: 'cd-m4', code: 'CD-M4', path: '/monitoring/continuous-improvement', title: 'Continuous Improvement Part 1', category: 'Monitoring', relatedModules: ['CD-M4-Part2', 'CD-M1'] },
  { id: 'cd-m4-part2', code: 'CD-M4-Part2', path: '/monitoring/continuous-improvement-part2', title: 'Continuous Improvement Part 2', category: 'Monitoring', relatedModules: ['CD-M4', 'CD-M1'] },
];

// Resource pages
export const RESOURCE_ROUTES = [
  { path: '/resources/templates', title: 'Templates Library' },
  { path: '/resources/glossary', title: 'Glossary' },
  { path: '/resources/regulatory-references', title: 'Regulatory References' },
  { path: '/resources/regulatory', title: 'Regulatory References (alias)' },
  { path: '/maturity-assessment', title: 'Maturity Assessment' },
  { path: '/', title: 'Dashboard' },
  { path: '/dashboard', title: 'Dashboard (alias)' },
];

// All valid paths for validation
export const ALL_VALID_PATHS = [
  ...MODULE_ROUTES.map(m => m.path),
  ...RESOURCE_ROUTES.map(r => r.path),
  // Also add common aliases
  '/cross-cutting/data-evidence',
  '/enablement/training-part1',
  '/enablement/communications-part1',
  '/enablement/technology-part1',
  '/monitoring/testing-assurance-part1',
  '/monitoring/board-reporting-part1',
  '/monitoring/continuous-improvement-part1',
  '/modules/cd-m1-mi-framework',
  '/modules/cd-m2a-testing-assurance-part1',
];

// Get route for a module code
export function getRouteForModuleCode(code: string): string | null {
  const normalizedCode = code.toUpperCase().replace(/\s+/g, '');
  const module = MODULE_ROUTES.find(m => 
    m.code.toUpperCase() === normalizedCode ||
    m.id.toUpperCase() === normalizedCode.replace(/-/g, '')
  );
  return module?.path || null;
}

// Check if a path is valid
export function isValidPath(path: string): boolean {
  if (!path.startsWith('/')) return false;
  // Remove query params and hash
  const cleanPath = path.split('?')[0].split('#')[0];
  return ALL_VALID_PATHS.includes(cleanPath);
}

// Get module info by path
export function getModuleByPath(path: string): ModuleRoute | null {
  return MODULE_ROUTES.find(m => m.path === path) || null;
}

// Get module info by code
export function getModuleByCode(code: string): ModuleRoute | null {
  const normalizedCode = code.toUpperCase();
  return MODULE_ROUTES.find(m => m.code.toUpperCase() === normalizedCode) || null;
}

export interface LinkIssue {
  id: string;
  type: 'broken' | 'not-hyperlink' | 'missing-reciprocal' | 'invalid-format' | 'warning';
  severity: 'error' | 'warning' | 'info';
  location: string;
  description: string;
  currentValue?: string;
  suggestedFix?: string;
  affectedModule?: string;
}

// Known link issues found in the codebase (static analysis results)
export const KNOWN_LINK_ISSUES: LinkIssue[] = [
  {
    id: 'gap-analysis-fixed',
    type: 'broken',
    severity: 'info',
    location: 'src/components/maturity/GapAnalysis.tsx',
    description: 'Module links now use centralized MODULE_CODE_TO_PATH mapping (FIXED)',
    currentValue: 'Uses MODULE_CODE_TO_PATH[moduleId]',
    suggestedFix: 'No action needed - already fixed',
    affectedModule: 'CD-I1, CD-I2, CD-I3, CD-I4, CD-I5, CD-I6'
  },
  {
    id: 'dashboard-module-routes',
    type: 'warning',
    severity: 'warning',
    location: 'src/pages/Dashboard.tsx',
    description: 'Dashboard uses MODULE_ROUTES mapping that may become out of sync with App.tsx routes',
    suggestedFix: 'Consider importing routes from centralized linkAnalysis.ts for consistency'
  },
  {
    id: 'missing-reciprocal-f1-p1',
    type: 'missing-reciprocal',
    severity: 'info',
    location: 'src/pages/modules/CD-F1-ReadinessAssessment.tsx',
    description: 'CD-F1 references CD-P1 Governance Framework but CD-P1 does not reference CD-F1',
    suggestedFix: 'Add link to CD-F1 Readiness Assessment in CD-P1 module'
  }
];

// Get path from module code for use in components
export const MODULE_CODE_TO_PATH: Record<string, string> = {};
MODULE_ROUTES.forEach(m => {
  MODULE_CODE_TO_PATH[m.code] = m.path;
  MODULE_CODE_TO_PATH[m.code.toLowerCase()] = m.path;
  MODULE_CODE_TO_PATH[m.id] = m.path;
});
