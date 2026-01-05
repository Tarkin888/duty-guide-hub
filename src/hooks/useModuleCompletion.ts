import { useState, useCallback } from "react";
import { validateModuleCompletion, ValidationResult } from "@/lib/moduleCompletionValidation";
import { useProgressStore } from "@/stores/progressStore";
import { useModuleTimeTracking } from "./useModuleTimeTracking";

/**
 * Hook to handle module completion with validation
 * Encapsulates all the logic for validating and completing a module
 */
export function useModuleCompletion(moduleId: string) {
  const [warningOpen, setWarningOpen] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  
  const { markModuleComplete } = useProgressStore();
  const { saveCurrentSession } = useModuleTimeTracking(moduleId);

  const handleMarkComplete = useCallback(() => {
    // Save current session time before validating
    saveCurrentSession();
    
    // Validate completion
    const validationResult = validateModuleCompletion(moduleId);
    
    if (!validationResult.isValid) {
      setValidation(validationResult);
      setWarningOpen(true);
    } else {
      markModuleComplete(moduleId);
    }
  }, [moduleId, saveCurrentSession, markModuleComplete]);

  const handleConfirmComplete = useCallback(() => {
    markModuleComplete(moduleId);
    setWarningOpen(false);
  }, [moduleId, markModuleComplete]);

  const handleCancelComplete = useCallback(() => {
    setWarningOpen(false);
  }, []);

  return {
    warningOpen,
    setWarningOpen,
    validation,
    handleMarkComplete,
    handleConfirmComplete,
    handleCancelComplete,
  };
}
