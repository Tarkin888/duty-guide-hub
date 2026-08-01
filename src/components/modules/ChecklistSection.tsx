import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Clock, User, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useProgressStore, makeItemKey } from "@/stores/progressStore";
import { normalizeModuleId, getModuleDisplayName } from "@/lib/progressUtils";

interface ChecklistItem {
  id: string;
  label: string;
  details?: string;
  responsible?: string;
  duration?: string;
}

interface ChecklistSectionProps {
  stepNumber: number;
  title: string;
  description?: string;
  items: ChecklistItem[];
  moduleId: string;
  templateLink?: {
    name: string;
    onClick: () => void;
  };
  onProgressChange?: (completedCount: number, totalCount: number) => void;
}

// Memoized checkbox item for performance
const ChecklistItemRow = memo(({ 
  item, 
  checked, 
  onCheck 
}: { 
  item: ChecklistItem; 
  checked: boolean; 
  onCheck: (checked: boolean) => void;
}) => {
  return (
    <div className="space-y-2 group">
      <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors hover:bg-muted/50 min-h-[44px]">
        <Checkbox
          id={item.id}
          checked={checked}
          onCheckedChange={onCheck}
          className={cn(
            "mt-0.5 sm:mt-1 h-5 w-5 shrink-0 transition-all duration-200 data-[state=checked]:scale-105",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          aria-label={`Mark "${item.label}" as complete`}
        />
        <div className="flex-1 space-y-1 min-w-0">
          <label
            htmlFor={item.id}
            className={cn(
              "text-sm font-medium leading-relaxed cursor-pointer transition-all duration-200 break-words",
              checked && "text-muted-foreground line-through"
            )}
          >
            {item.label}
          </label>
          {(item.responsible || item.duration) && (
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-muted-foreground">
              {item.responsible && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3 shrink-0" />
                  <span className="truncate">{item.responsible}</span>
                </span>
              )}
              {item.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 shrink-0" />
                  <span>{item.duration}</span>
                </span>
              )}
            </div>
          )}
          {item.details && (
            <p className="text-xs sm:text-sm text-muted-foreground pt-1 break-words">
              {item.details}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

ChecklistItemRow.displayName = "ChecklistItemRow";

// Module display names for activity logging
const MODULE_DISPLAY_NAMES: Record<string, string> = {
  'cd-f1-readiness': 'Readiness Assessment',
  'cd-f2-requirements': 'Requirements Mapping',
  'cd-f3-risk-assessment': 'Risk & Impact Assessment',
  'cd-p1-governance-framework': 'Governance Framework',
  'cd-p2-policy-framework': 'Policy Framework',
  'cd-p3-implementation-roadmap': 'Implementation Roadmap',
  'cd-i1-products-services': 'Products & Services',
  'cd-i2-price-value': 'Price & Value',
  'cd-i3-consumer-understanding': 'Consumer Understanding',
  'cd-i4-consumer-support': 'Consumer Support',
  'cd-i5-vulnerable-customers': 'Vulnerable Customers',
  'cd-i6-distribution-chain': 'Distribution Chain',
  'cd-i7-data-evidence': 'Data & Evidence',
  'cd-t1-training': 'Training Programme',
  'cd-t2-communications-change': 'Communications & Change',
  'cd-t3-technology-requirements': 'Technology Requirements',
  'cd-m1-mi-framework': 'MI Framework',
  'cd-m2-testing-assurance': 'Testing & Assurance',
  'cd-m3-board-reporting': 'Board Reporting',
  'cd-m4-continuous-improvement': 'Continuous Improvement',
};

// Helper to convert storage moduleId to canonical format (now using progressUtils)
function getCanonicalModuleId(storageModuleId: string): string {
  return normalizeModuleId(storageModuleId);
}

// Helper to get display name (now using progressUtils)
function getLocalModuleDisplayName(storageModuleId: string): string {
  return MODULE_DISPLAY_NAMES[storageModuleId] || getModuleDisplayName(normalizeModuleId(storageModuleId));
}

export function ChecklistSection({ 
  stepNumber, 
  title, 
  description,
  items, 
  moduleId,
  templateLink,
  onProgressChange
}: ChecklistSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Single source of truth: the progress store keyed by the static registry
  const checkedItemsMap = useProgressStore((state) => state.checkedItems);
  const setChecklistItem = useProgressStore((state) => state.setChecklistItem);
  const setStepItems = useProgressStore((state) => state.setStepItems);

  const checkedItems = useMemo(() => {
    const result: Record<string, boolean> = {};
    items.forEach((item) => {
      result[item.id] = checkedItemsMap[makeItemKey(moduleId, stepNumber, item.id)] === true;
    });
    return result;
  }, [checkedItemsMap, items, moduleId, stepNumber]);

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  useEffect(() => {
    onProgressChange?.(completedCount, items.length);
  }, [completedCount, items.length, onProgressChange]);

  const handleCheck = useCallback((itemId: string, checked: boolean) => {
    setChecklistItem(moduleId, stepNumber, itemId, checked);
  }, [setChecklistItem, moduleId, stepNumber]);

  const handleResetStep = useCallback(() => {
    setStepItems(moduleId, stepNumber, false);
    toast({
      title: "Step reset",
      description: `All items in Step ${stepNumber} have been reset.`,
    });
  }, [setStepItems, moduleId, stepNumber]);

  // Denominator comes from the fixed item list for this step
  const totalCount = items.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isComplete = completedCount === totalCount && totalCount > 0;


  // Determine progress bar color
  const getProgressColor = () => {
    if (progress === 0) return "bg-muted";
    if (progress === 100) return "bg-success";
    return "bg-primary";
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <CollapsibleTrigger asChild>
            <div className="flex items-start justify-between w-full">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="font-semibold">
                    Step {stepNumber}
                  </Badge>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  {isComplete && (
                    <Badge className="bg-success text-success-foreground">
                      ✓ Complete
                    </Badge>
                  )}
                </div>
                {description && (
                  <CardDescription>{description}</CardDescription>
                )}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-4 text-sm">
                    <span className={cn(
                      "font-medium",
                      isComplete && "text-success"
                    )}>
                      {completedCount} of {totalCount} completed
                    </span>
                    {isComplete && (
                      <span className="text-accent font-semibold">100%</span>
                    )}
                  </div>
                  <div className="max-w-xs">
                    <Progress 
                      value={progress} 
                      className="h-2"
                      aria-label={`Step ${stepNumber} progress: ${Math.round(progress)}%`}
                    />
                  </div>
                </div>
              </div>
              <ChevronDown className={cn(
                "h-5 w-5 text-muted-foreground transition-transform",
                isOpen && "rotate-180"
              )} />
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-2">
            {items.map((item) => (
              <ChecklistItemRow
                key={item.id}
                item={item}
                checked={checkedItems[item.id] || false}
                onCheck={(checked) => handleCheck(item.id, checked)}
              />
            ))}
            
            {templateLink && (
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={templateLink.onClick}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  📎 {templateLink.name}
                </button>
              </div>
            )}

            {completedCount > 0 && (
              <div className="mt-4 pt-4 border-t">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset Step {stepNumber}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset Step {stepNumber}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will uncheck all {totalCount} items in "{title}". This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleResetStep} className="bg-destructive hover:bg-destructive/90">
                        Reset Step
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
