import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { ValidationResult } from "@/lib/moduleCompletionValidation";

interface ModuleCompletionWarningProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  validation: ValidationResult;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ModuleCompletionWarning({
  open,
  onOpenChange,
  validation,
  onConfirm,
  onCancel,
}: ModuleCompletionWarningProps) {
  const { details, warnings } = validation;

  const ValidationItem = ({
    label,
    isValid,
    current,
    required,
    suffix = "",
  }: {
    label: string;
    isValid: boolean;
    current: number;
    required: number;
    suffix?: string;
  }) => (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div className="flex items-center gap-2">
        {isValid ? (
          <CheckCircle2 className="h-4 w-4 text-success" />
        ) : (
          <XCircle className="h-4 w-4 text-destructive" />
        )}
        <span className="text-sm">{label}</span>
      </div>
      <Badge variant={isValid ? "secondary" : "destructive"}>
        {current}{suffix} / {required}{suffix}
      </Badge>
    </div>
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            Module May Not Be Fully Reviewed
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This module may not have been fully reviewed. Please check the criteria below:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-1 py-4">
          <ValidationItem
            label="Tabs Visited"
            isValid={details.tabsValid}
            current={details.tabsViewed}
            required={details.tabsRequired}
          />
          <ValidationItem
            label="Checklist Completed"
            isValid={details.checklistValid}
            current={details.checklistPercentage}
            required={details.checklistRequired}
            suffix="%"
          />
          <ValidationItem
            label="Templates Downloaded"
            isValid={details.templatesValid}
            current={details.templatesDownloaded}
            required={1}
          />
          <ValidationItem
            label="Time Spent"
            isValid={details.timeValid}
            current={details.minutesSpent}
            required={details.minutesRequired}
            suffix=" min"
          />
        </div>

        {warnings.length > 0 && (
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
            <p className="text-sm font-medium text-warning mb-2">Recommendations:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {warnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            Continue Reviewing
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-warning hover:bg-warning/90 text-warning-foreground"
          >
            Mark Complete Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
