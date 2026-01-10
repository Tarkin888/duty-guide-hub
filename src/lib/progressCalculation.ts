/**
 * Centralized progress calculation for the dashboard
 * 
 * This module re-exports functions from progressUtils for backwards compatibility.
 * All new code should import directly from progressUtils.
 * 
 * @deprecated Import from '@/lib/progressUtils' instead
 */

import {
  MODULE_CATEGORIES as _MODULE_CATEGORIES,
  TOTAL_MODULES as _TOTAL_MODULES,
  ModuleStatus as _ModuleStatus,
  type ModuleStatusType,
  type CategoryKey,
  type ModuleProgressInfo,
  type CategoryProgress,
  type OverallProgress,
  getAllModuleStatuses as _getAllModuleStatuses,
  calculateCategoryProgress as _calculateCategoryProgress,
  calculateOverallProgress as _calculateOverallProgress,
  getAllCategoryProgress as _getAllCategoryProgress,
  getInProgressModules as _getInProgressModules,
  useProgressCalculation as _useProgressCalculation,
} from './progressUtils';

// Re-export with backwards-compatible names
export const MODULE_CATEGORIES = _MODULE_CATEGORIES;
export const TOTAL_MODULES = _TOTAL_MODULES;
export const ModuleStatusEnum = _ModuleStatus;
export { type ModuleStatusType };
export { type CategoryKey };

// Type aliases for backwards compatibility
export type ModuleStatus = ModuleProgressInfo;
export type CategoryProgressResult = CategoryProgress;
export type OverallProgressResult = OverallProgress;

// Function re-exports
export const getAllModuleStatuses = _getAllModuleStatuses;
export const calculateCategoryProgress = _calculateCategoryProgress;
export const calculateOverallProgress = _calculateOverallProgress;
export const getAllCategoryProgress = _getAllCategoryProgress;
export const getInProgressModules = _getInProgressModules;
export const useProgressCalculation = _useProgressCalculation;
