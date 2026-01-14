// Link Analysis Utility for Site Health
// Uses centralized route configuration from src/config/routes.ts
// This file provides Site Health specific functionality

import { 
  MODULE_ROUTE_CONFIG, 
  RESOURCE_ROUTE_CONFIG,
  MODULE_CODE_TO_PATH,
  getModulePath,
  getModuleConfig,
  isValidRoute,
  getAllValidPaths
} from '@/config/routes';

// Re-export for backwards compatibility
export { MODULE_CODE_TO_PATH, getModulePath, getModuleConfig, isValidRoute };

export interface ModuleRoute {
  id: string;
  code: string;
  path: string;
  title: string;
  category: string;
  relatedModules?: string[];
}

// Convert MODULE_ROUTE_CONFIG to MODULE_ROUTES format for backwards compatibility
export const MODULE_ROUTES: ModuleRoute[] = MODULE_ROUTE_CONFIG.map(m => ({
  id: m.code.toLowerCase().replace(/-/g, '-'),
  code: m.code,
  path: m.path,
  title: m.title,
  category: m.category,
  relatedModules: m.relatedModules,
}));

// Resource pages - re-export from config
export const RESOURCE_ROUTES = RESOURCE_ROUTE_CONFIG.map(r => ({
  path: r.path,
  title: r.title,
}));

// All valid paths for validation
export const ALL_VALID_PATHS = getAllValidPaths();

// Get route for a module code (wrapper for backwards compatibility)
export function getRouteForModuleCode(code: string): string | null {
  return getModulePath(code);
}

// Check if a path is valid (wrapper for backwards compatibility)
export function isValidPath(path: string): boolean {
  return isValidRoute(path);
}

// Get module info by path
export function getModuleByPath(path: string): ModuleRoute | null {
  const config = MODULE_ROUTE_CONFIG.find(m => m.path === path);
  if (!config) return null;
  return {
    id: config.code.toLowerCase().replace(/-/g, '-'),
    code: config.code,
    path: config.path,
    title: config.title,
    category: config.category,
    relatedModules: config.relatedModules,
  };
}

// Get module info by code
export function getModuleByCode(code: string): ModuleRoute | null {
  const config = getModuleConfig(code);
  if (!config) return null;
  return {
    id: config.code.toLowerCase().replace(/-/g, '-'),
    code: config.code,
    path: config.path,
    title: config.title,
    category: config.category,
    relatedModules: config.relatedModules,
  };
}

export interface LinkIssue {
  id: string;
  type: 'broken' | 'not-hyperlink' | 'missing-reciprocal' | 'invalid-format' | 'warning' | 'fixed';
  severity: 'error' | 'warning' | 'info';
  location: string;
  description: string;
  currentValue?: string;
  suggestedFix?: string;
  affectedModule?: string;
}

// Known link issues - Updated to reflect fixed status
export const KNOWN_LINK_ISSUES: LinkIssue[] = [
  {
    id: 'gap-analysis-fixed',
    type: 'fixed',
    severity: 'info',
    location: 'src/components/maturity/GapAnalysis.tsx',
    description: 'Module links now use centralized MODULE_CODE_TO_PATH mapping (FIXED)',
    currentValue: 'Uses MODULE_CODE_TO_PATH[moduleId]',
    suggestedFix: 'No action needed - already fixed',
    affectedModule: 'CD-I1, CD-I2, CD-I3, CD-I4, CD-I5, CD-I6'
  },
  {
    id: 'module-insights-fixed',
    type: 'fixed',
    severity: 'info',
    location: 'src/components/modules/ModuleInsights.tsx',
    description: 'Module links now use centralized path mapping with react-router Link (FIXED)',
    currentValue: 'Uses centralized pathMap with Link component',
    suggestedFix: 'No action needed - already fixed',
    affectedModule: 'All related modules'
  },
  {
    id: 'regulatory-references-fixed',
    type: 'fixed',
    severity: 'info',
    location: 'src/pages/RegulatoryReferences.tsx',
    description: 'Module links now use centralized path mapping (FIXED)',
    currentValue: 'Uses centralized pathMap',
    suggestedFix: 'No action needed - already fixed',
    affectedModule: 'All modules'
  },
  {
    id: 'centralized-routing',
    type: 'fixed',
    severity: 'info',
    location: 'src/config/routes.ts',
    description: 'Centralized routing configuration created - all components should import from here',
    currentValue: 'MODULE_ROUTE_CONFIG, getModulePath(), etc.',
    suggestedFix: 'Use imports from @/config/routes for all routing needs'
  }
];
