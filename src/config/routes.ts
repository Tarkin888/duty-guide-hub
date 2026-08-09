/**
 * Centralized Route Configuration - SINGLE SOURCE OF TRUTH
 * 
 * All route definitions and module-to-path mappings MUST be defined here.
 * This ensures consistency across the entire application.
 * 
 * Usage:
 * - Import `getModulePath` to get the path for a module code
 * - Import `MODULE_ROUTE_CONFIG` for full module metadata
 * - Import `isValidRoute` to validate if a path exists
 */

// ============================================================================
// MODULE ROUTE DEFINITIONS
// ============================================================================

export interface ModuleRouteConfig {
  /** Unique module code (e.g., 'CD-F1', 'CD-I1') */
  code: string;
  /** URL path for the module */
  path: string;
  /** Display title */
  title: string;
  /** Category grouping */
  category: 'Foundation' | 'Governance' | 'Outcomes' | 'CrossCutting' | 'Enablement' | 'Monitoring';
  /** Related module codes for cross-linking */
  relatedModules?: string[];
  /** Whether this is a part 2 of a multi-part module */
  isPart2?: boolean;
}

/**
 * Complete module route configuration
 * This is the SINGLE SOURCE OF TRUTH for all module paths
 */
export const MODULE_ROUTE_CONFIG: ModuleRouteConfig[] = [
  // Foundation
  { code: 'CD-F1', path: '/foundation/readiness', title: 'Readiness Assessment', category: 'Foundation', relatedModules: ['CD-F2', 'CD-F3', 'CD-P1'] },
  { code: 'CD-F2', path: '/foundation/requirements', title: 'Requirements Mapping', category: 'Foundation', relatedModules: ['CD-F1', 'CD-F3', 'CD-P2'] },
  { code: 'CD-F3', path: '/foundation/risk-impact', title: 'Risk & Impact Assessment', category: 'Foundation', relatedModules: ['CD-F1', 'CD-F2', 'CD-M1'] },

  // Governance & Planning
  { code: 'CD-P1', path: '/governance/framework', title: 'Governance Framework', category: 'Governance', relatedModules: ['CD-P2', 'CD-P3', 'CD-M3', 'CD-F1'] },
  { code: 'CD-P1-Part2', path: '/governance/framework-part2', title: 'Governance Framework Part 2', category: 'Governance', relatedModules: ['CD-P1', 'CD-P2'], isPart2: true },
  { code: 'CD-P2', path: '/governance/policy', title: 'Policy Framework', category: 'Governance', relatedModules: ['CD-P1', 'CD-P3', 'CD-F2'] },
  { code: 'CD-P2-Part2', path: '/governance/policy-part2', title: 'Policy Framework Part 2', category: 'Governance', relatedModules: ['CD-P2', 'CD-P1'], isPart2: true },
  { code: 'CD-P3', path: '/governance/roadmap', title: 'Implementation Roadmap', category: 'Governance', relatedModules: ['CD-P1', 'CD-P2', 'CD-T1'] },

  // Four Outcomes
  { code: 'CD-I1', path: '/outcomes/products-services', title: 'Products & Services', category: 'Outcomes', relatedModules: ['CD-I2', 'CD-I6'] },
  { code: 'CD-I2', path: '/outcomes/price-value', title: 'Price & Value', category: 'Outcomes', relatedModules: ['CD-I1', 'CD-I3'] },
  { code: 'CD-I3', path: '/outcomes/consumer-understanding', title: 'Consumer Understanding', category: 'Outcomes', relatedModules: ['CD-I2', 'CD-I4', 'CD-T2'] },
  { code: 'CD-I4', path: '/outcomes/consumer-support', title: 'Consumer Support', category: 'Outcomes', relatedModules: ['CD-I3', 'CD-I5'] },

  // Cross-Cutting
  { code: 'CD-I5', path: '/cross-cutting/vulnerable-customers', title: 'Vulnerable Customers', category: 'CrossCutting', relatedModules: ['CD-I3', 'CD-I4', 'CD-T1'] },
  { code: 'CD-I6', path: '/cross-cutting/distribution-chain', title: 'Distribution Chain', category: 'CrossCutting', relatedModules: ['CD-I1', 'CD-I2'] },
  { code: 'CD-I7', path: '/cross-cutting/data-evidence', title: 'Data & Evidence', category: 'CrossCutting', relatedModules: ['CD-M1'] },
  { code: 'CD-I7A', path: '/cross-cutting/data-evidence-part1', title: 'Data & Evidence Part 1', category: 'CrossCutting', relatedModules: ['CD-I7B', 'CD-M1'] },
  { code: 'CD-I7B', path: '/cross-cutting/data-evidence-part2', title: 'Data & Evidence Part 2', category: 'CrossCutting', relatedModules: ['CD-I7A', 'CD-M1'], isPart2: true },

  // Enablement
  { code: 'CD-T1', path: '/enablement/training', title: 'Training Programme', category: 'Enablement', relatedModules: ['CD-T2', 'CD-P3', 'CD-I5'] },
  { code: 'CD-T1-Part2', path: '/enablement/training-part2', title: 'Training Programme Part 2', category: 'Enablement', relatedModules: ['CD-T1', 'CD-T2'], isPart2: true },
  { code: 'CD-T2', path: '/enablement/communications', title: 'Communications & Change', category: 'Enablement', relatedModules: ['CD-T1', 'CD-I3'] },
  { code: 'CD-T2-Part2', path: '/enablement/communications-part2', title: 'Communications & Change Part 2', category: 'Enablement', relatedModules: ['CD-T2', 'CD-T1'], isPart2: true },
  { code: 'CD-T3', path: '/enablement/technology', title: 'Technology Requirements', category: 'Enablement', relatedModules: ['CD-I7A'] },
  { code: 'CD-T3A', path: '/enablement/technology-part1', title: 'Technology Requirements Part 1', category: 'Enablement', relatedModules: ['CD-T3B', 'CD-I7A'] },
  { code: 'CD-T3B', path: '/enablement/technology-part2', title: 'Technology Requirements Part 2', category: 'Enablement', relatedModules: ['CD-T3A', 'CD-I7A'], isPart2: true },

  // Monitoring & Assurance
  { code: 'CD-M1', path: '/monitoring/mi-monitoring', title: 'Ongoing Monitoring & MI Framework', category: 'Monitoring', relatedModules: ['CD-M2', 'CD-M3', 'CD-I7A', 'CD-F3'] },
  { code: 'CD-M2', path: '/monitoring/testing-assurance', title: 'Testing & Assurance', category: 'Monitoring', relatedModules: ['CD-M1', 'CD-M3'] },
  { code: 'CD-M3', path: '/monitoring/board-reporting', title: 'Annual Board Attestation & Reporting', category: 'Monitoring', relatedModules: ['CD-M4', 'CD-P1'] },
  { code: 'CD-M3-Part2', path: '/monitoring/board-reporting-part2', title: 'Board Reporting Part 2', category: 'Monitoring', relatedModules: ['CD-M3', 'CD-M4'], isPart2: true },
  { code: 'CD-M4', path: '/monitoring/continuous-improvement', title: 'Continuous Improvement', category: 'Monitoring', relatedModules: ['CD-M1', 'CD-M3'] },
  { code: 'CD-M4-Part2', path: '/monitoring/continuous-improvement-part2', title: 'Continuous Improvement Part 2', category: 'Monitoring', relatedModules: ['CD-M4', 'CD-M1'], isPart2: true },
];

// ============================================================================
// RESOURCE & UTILITY ROUTES
// ============================================================================

export interface ResourceRouteConfig {
  path: string;
  title: string;
  description?: string;
}

export const RESOURCE_ROUTE_CONFIG: ResourceRouteConfig[] = [
  { path: '/', title: 'Dashboard', description: 'Main dashboard with progress overview' },
  { path: '/ongoing/fair-value', title: 'Annual Fair Value Assessment & Monitoring', description: 'Recurring fair value assessment cycle (OC-3)' },
  { path: '/ongoing/outcomes-testing', title: 'Outcomes Testing & Consumer Understanding', description: 'Recurring communication testing cycle (OC-4)' },
  { path: '/ongoing/mi-monitoring', title: 'Ongoing Monitoring & MI Framework', description: 'Ongoing compliance view of CD-M1 (OC-1)' },
  { path: '/ongoing/board-attestation', title: 'Annual Board Attestation & Reporting', description: 'Ongoing compliance view of CD-M3 (OC-2)' },
  { path: '/resources/templates', title: 'Templates Library', description: 'Implementation templates and documents' },
  { path: '/resources/glossary', title: 'Glossary', description: 'Consumer Duty terminology' },
  { path: '/resources/regulatory-references', title: 'Regulatory References', description: 'FCA guidance and regulations' },
  { path: '/maturity-assessment', title: 'Maturity Assessment', description: 'Assess your Consumer Duty maturity' },
  { path: '/regulatory-updates', title: 'Regulatory Updates', description: 'FCA Consumer Duty developments since November 2025' },
  { path: '/consumer-duty-primer', title: 'Consumer Duty Primer', description: 'Educational orientation to the Consumer Duty framework' },
  { path: '/admin/site-health', title: 'Site Health', description: 'Internal link validation' },
];

// ============================================================================
// LOOKUP MAPS (Generated from config)
// ============================================================================

/**
 * Map from module code to path
 * Supports multiple code formats: 'CD-I1', 'cd-i1', 'CD-I1-Part2'
 */
export const MODULE_CODE_TO_PATH: Record<string, string> = {};

/**
 * Map from path to module config
 */
export const PATH_TO_MODULE: Record<string, ModuleRouteConfig> = {};

/**
 * Map from module code to full config
 */
export const CODE_TO_MODULE: Record<string, ModuleRouteConfig> = {};

// Initialize lookup maps
MODULE_ROUTE_CONFIG.forEach(module => {
  // Map various code formats to path
  MODULE_CODE_TO_PATH[module.code] = module.path;
  MODULE_CODE_TO_PATH[module.code.toLowerCase()] = module.path;
  MODULE_CODE_TO_PATH[module.code.replace(/-/g, '')] = module.path;
  MODULE_CODE_TO_PATH[module.code.toLowerCase().replace(/-/g, '')] = module.path;
  
  // Map path to module
  PATH_TO_MODULE[module.path] = module;
  
  // Map code to full config
  CODE_TO_MODULE[module.code] = module;
  CODE_TO_MODULE[module.code.toLowerCase()] = module;
});

// ============================================================================
// ROUTE HELPER FUNCTIONS
// ============================================================================

/**
 * Get the path for a module code
 * @param code Module code (e.g., 'CD-I1', 'cd-i1')
 * @returns The path or null if not found
 */
export function getModulePath(code: string): string | null {
  if (!code) return null;
  
  // Try direct lookup first
  const directPath = MODULE_CODE_TO_PATH[code] || MODULE_CODE_TO_PATH[code.toUpperCase()];
  if (directPath) return directPath;
  
  // Try normalized lookup
  const normalized = code.toUpperCase().replace(/\s+/g, '-');
  return MODULE_CODE_TO_PATH[normalized] || null;
}

/**
 * Get full module config by code
 */
export function getModuleConfig(code: string): ModuleRouteConfig | null {
  if (!code) return null;
  return CODE_TO_MODULE[code] || CODE_TO_MODULE[code.toUpperCase()] || null;
}

/**
 * Get module config by path
 */
export function getModuleByPath(path: string): ModuleRouteConfig | null {
  return PATH_TO_MODULE[path] || null;
}

/**
 * Get related modules for a given module code
 */
export function getRelatedModules(code: string): ModuleRouteConfig[] {
  const module = getModuleConfig(code);
  if (!module?.relatedModules) return [];
  
  return module.relatedModules
    .map(relatedCode => getModuleConfig(relatedCode))
    .filter((m): m is ModuleRouteConfig => m !== null);
}

/**
 * Check if a path is a valid route
 */
export function isValidRoute(path: string): boolean {
  if (!path || !path.startsWith('/')) return false;
  
  // Remove query params and hash
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Check module routes
  if (PATH_TO_MODULE[cleanPath]) return true;
  
  // Check resource routes
  if (RESOURCE_ROUTE_CONFIG.some(r => r.path === cleanPath)) return true;
  
  return false;
}

/**
 * Get all valid paths (for site health validation)
 */
export function getAllValidPaths(): string[] {
  return [
    ...MODULE_ROUTE_CONFIG.map(m => m.path),
    ...RESOURCE_ROUTE_CONFIG.map(r => r.path),
  ];
}

/**
 * Get modules by category
 */
export function getModulesByCategory(category: ModuleRouteConfig['category']): ModuleRouteConfig[] {
  return MODULE_ROUTE_CONFIG.filter(m => m.category === category && !m.isPart2);
}

/**
 * Get the display name for a module code
 */
export function getModuleTitle(code: string): string {
  const module = getModuleConfig(code);
  return module?.title || code;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ModuleCode = typeof MODULE_ROUTE_CONFIG[number]['code'];
export type CategoryType = ModuleRouteConfig['category'];
