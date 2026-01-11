import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/progressStore";
import { ModuleStatus, getModuleChecklistProgress } from "@/lib/progressUtils";

interface StepProgress {
  stepNumber: number;
  completed: number;
  total: number;
}

interface ModuleChecklistProgressProps {
  moduleId: string;
  totalSteps: number;
}

export function ModuleChecklistProgress({ 
  moduleId, 
  totalSteps,
}: ModuleChecklistProgressProps) {
  const [stepProgress, setStepProgress] = useState<StepProgress[]>([]);
  
  // Use Zustand store with individual selectors to prevent unnecessary re-renders
  const markModuleInProgress = useProgressStore((state) => state.markModuleInProgress);
  const resetModuleProgress = useProgressStore((state) => state.resetModuleProgress);
  const getModuleStatus = useProgressStore((state) => state.getModuleStatus);
  const moduleStatus = getModuleStatus(moduleId);

  /**
   * Calculate totals from localStorage
   * IMPORTANT: Only counts items that have been initialized (exist in localStorage)
   * The ChecklistSection component is responsible for initializing all items on mount
   */
  const calculateTotals = useCallback(() => {
    const steps: StepProgress[] = [];
    
    for (let i = 1; i <= totalSteps; i++) {
      const storageKey = `checklist-${moduleId}-step${i}`;
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const data = JSON.parse(stored);
          // Validate data structure
          if (typeof data === 'object' && data !== null) {
            const entries = Object.entries(data);
            // Only count boolean values (filter out any corrupted data)
            const validEntries = entries.filter(([, value]) => typeof value === 'boolean');
            const completedCount = validEntries.filter(([, checked]) => checked === true).length;
            const totalCount = validEntries.length;
            
            if (totalCount > 0) {
              steps.push({ stepNumber: i, completed: completedCount, total: totalCount });
            }
          }
        }
      } catch (error) {
        console.error(`Error reading step ${i} progress:`, error);
      }
    }
    
    return steps;
  }, [moduleId, totalSteps]);

  const loadProgress = useCallback(() => {
    const steps = calculateTotals();
    setStepProgress(steps);
    
    // Calculate overall progress from checklist items
    const totalCompleted = steps.reduce((sum, s) => sum + s.completed, 0);
    const totalItems = steps.reduce((sum, s) => sum + s.total, 0);
    
    // State transition logic:
    // 1. If no items checked and module is complete or in-progress → should revert to in-progress (store handles this)
    // 2. If some items checked but was not-started → upgrade to in-progress
    // 3. If was complete but items unchecked (not all complete) → revert to in-progress
    
    if (totalItems > 0) {
      if (totalCompleted === 0 && moduleStatus.status !== ModuleStatus.NOT_STARTED) {
        // All items unchecked - this will be handled by the ChecklistSection component
        // which calls updateChecklistItem on the store
      } else if (totalCompleted > 0 && moduleStatus.status === ModuleStatus.NOT_STARTED) {
        // Some items checked, upgrade to in-progress
        markModuleInProgress(moduleId, false);
      } else if (moduleStatus.status === ModuleStatus.COMPLETE && totalCompleted < totalItems) {
        // Was complete but not all items checked anymore - revert to in-progress
        markModuleInProgress(moduleId, false);
      }
    }
  }, [calculateTotals, moduleId, moduleStatus.status, markModuleInProgress]);

  useEffect(() => {
    loadProgress();

    // Listen for checklist changes
    const handleChecklistChange = () => {
      loadProgress();
    };

    window.addEventListener('checklist-item-changed', handleChecklistChange);
    window.addEventListener('checklist-reset', handleChecklistChange);
    window.addEventListener('storage', handleChecklistChange);

    return () => {
      window.removeEventListener('checklist-item-changed', handleChecklistChange);
      window.removeEventListener('checklist-reset', handleChecklistChange);
      window.removeEventListener('storage', handleChecklistChange);
    };
  }, [loadProgress]);

  const handleResetAll = useCallback(() => {
    // Clear all step data for this module
    for (let i = 1; i <= totalSteps; i++) {
      const storageKey = `checklist-${moduleId}-step${i}`;
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.error(`Error clearing step ${i}:`, error);
      }
    }
    
    // Reset module status to not-started via Zustand store
    resetModuleProgress(moduleId, false);
    
    // Reload progress
    setStepProgress([]);
    
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('checklist-reset', { detail: { moduleId } }));
    
    toast.success("Progress Reset", {
      description: "All checklist progress for this module has been reset to Not Started.",
    });
  }, [moduleId, totalSteps, resetModuleProgress]);

  // Aggregate totals from all steps (single source of truth from localStorage)
  const totalCompleted = stepProgress.reduce((sum, s) => sum + s.completed, 0);
  const totalItems = stepProgress.reduce((sum, s) => sum + s.total, 0);
  // Calculate percentage using consistent formula: Math.round((X / Y) * 100)
  const overallProgress = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;
  // Module is complete when ALL items are checked
  const isComplete = totalCompleted === totalItems && totalItems > 0;

  // Don't render if no items tracked yet
  if (totalItems === 0) {
    return null;
  }

  return (
    <Card className="bg-muted/30 border-primary/20">
      <CardContent className="pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : null}
              <span className="text-sm font-medium">
                Overall Module Progress
              </span>
              {isComplete && (
                <Badge className="bg-success text-success-foreground">
                  Complete
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Progress 
                value={overallProgress} 
                className="h-3 flex-1 max-w-md"
                aria-label={`Module progress: ${overallProgress}%`}
              />
              <span className={cn(
                "text-sm font-semibold min-w-[80px]",
                isComplete ? "text-accent" : "text-foreground"
              )}>
                {totalCompleted} of {totalItems} ({overallProgress}%)
              </span>
            </div>
          </div>

          {totalCompleted > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-muted-foreground hover:text-destructive">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset All Progress
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset all checklist progress?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will uncheck all {totalItems} items across all steps in this module. 
                    The module status will also be reset to "Not Started". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetAll} className="bg-destructive hover:bg-destructive/90">
                    Reset All Progress
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
