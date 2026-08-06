import { useCallback } from "react";
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
import { cn } from "@/lib/utils";
import { useProgressStore, getModuleDisplayName } from "@/stores/progressStore";
import { useModuleChecklistProgress } from "@/lib/progressUtils";

interface ModuleChecklistProgressProps {
  moduleId: string;
  /** Display name used in the reset confirmation copy */
  moduleName?: string;
  /** Retained for backwards compatibility; totals come from the module registry */
  totalSteps?: number;
}

/**
 * Overall progress for a module. Both the numerator and the denominator come
 * from the single progress store and the static module registry, so the numbers
 * are identical here, on the dashboard and in every badge.
 */
export function ModuleChecklistProgress({ moduleId, moduleName }: ModuleChecklistProgressProps) {
  const resetModuleProgress = useProgressStore((state) => state.resetModuleProgress);
  const { completedItems, totalItems, percentage, isComplete } = useModuleChecklistProgress(moduleId);

  const handleResetAll = useCallback(() => {
    resetModuleProgress(moduleId);
  }, [moduleId, resetModuleProgress]);

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
                value={percentage} 
                className="h-3 flex-1 max-w-md"
                aria-label={`Module progress: ${percentage}%`}
              />
              <span className={cn(
                "text-sm font-semibold min-w-[80px]",
                isComplete ? "text-accent" : "text-foreground"
              )}>
                {completedItems} of {totalItems} ({percentage}%)
              </span>
            </div>
          </div>

          {completedItems > 0 && (
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
                    This will clear all checked items and completion status for{" "}
                    <strong>{moduleName || getModuleDisplayName(moduleId)}</strong> only
                    ({totalItems} items across all steps). This cannot be undone.
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
