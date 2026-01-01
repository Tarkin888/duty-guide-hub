import { useState, useEffect, useCallback, memo } from "react";
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
import { useProgressStore } from "@/stores/progressStore";

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
      <div className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50">
        <Checkbox
          id={item.id}
          checked={checked}
          onCheckedChange={onCheck}
          className={cn(
            "mt-1 transition-all duration-200 data-[state=checked]:scale-105",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          aria-label={`Mark "${item.label}" as complete`}
        />
        <div className="flex-1 space-y-1">
          <label
            htmlFor={item.id}
            className={cn(
              "text-sm font-medium leading-relaxed cursor-pointer transition-all duration-200",
              checked && "text-muted-foreground line-through"
            )}
          >
            {item.label}
          </label>
          {(item.responsible || item.duration) && (
            <div className="flex gap-4 text-xs text-muted-foreground">
              {item.responsible && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {item.responsible}
                </span>
              )}
              {item.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.duration}
                </span>
              )}
            </div>
          )}
          {item.details && (
            <p className="text-sm text-muted-foreground pt-1">
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

// Helper to convert storage moduleId to canonical format
function getCanonicalModuleId(storageModuleId: string): string {
  const mapping: Record<string, string> = {
    'cd-f1-readiness': 'CD-F1',
    'cd-f2-requirements': 'CD-F2',
    'cd-f3-risk-assessment': 'CD-F3',
    'cd-p1-governance-framework': 'CD-P1',
    'cd-p2-policy-framework': 'CD-P2',
    'cd-p3-implementation-roadmap': 'CD-P3',
    'cd-i1-products-services': 'CD-I1',
    'cd-i2-price-value': 'CD-I2',
    'cd-i3-consumer-understanding': 'CD-I3',
    'cd-i4-consumer-support': 'CD-I4',
    'cd-i5-vulnerable-customers': 'CD-I5',
    'cd-i6-distribution-chain': 'CD-I6',
    'cd-i7-data-evidence': 'CD-I7',
    'cd-t1-training': 'CD-T1',
    'cd-t2-communications-change': 'CD-T2',
    'cd-t3-technology-requirements': 'CD-T3',
    'cd-m1-mi-framework': 'CD-M1',
    'cd-m2-testing-assurance': 'CD-M2',
    'cd-m3-board-reporting': 'CD-M3',
    'cd-m4-continuous-improvement': 'CD-M4',
  };
  return mapping[storageModuleId] || storageModuleId.toUpperCase();
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
  const storageKey = `checklist-${moduleId}-step${stepNumber}`;
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(true);
  
  // Get activity logging function from store
  const addActivity = useProgressStore((state) => state.addActivity);
  const storeStartDate = useProgressStore((state) => state.startDate);
  const setStartDate = useProgressStore((state) => state.resetStartDate);

  // Initialize localStorage with all items on mount (ensures total count is accurate)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        // Load existing checked state
        const existingData = JSON.parse(stored);
        // Ensure all current items exist in state (handles added/removed items)
        const updated: Record<string, boolean> = {};
        items.forEach(item => {
          updated[item.id] = existingData[item.id] || false;
        });
        setCheckedItems(updated);
        // Update storage if items changed
        if (Object.keys(updated).length !== Object.keys(existingData).length) {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        }
      } else {
        // Initialize with all items unchecked - critical for accurate total counting
        const initialState: Record<string, boolean> = {};
        items.forEach(item => {
          initialState[item.id] = false;
        });
        setCheckedItems(initialState);
        localStorage.setItem(storageKey, JSON.stringify(initialState));
      }
      // Notify that this step's data is now available
      window.dispatchEvent(new CustomEvent('checklist-item-changed', {
        detail: { moduleId, stepNumber, initialized: true }
      }));
    } catch (error) {
      console.error("Error loading checklist state:", error);
    }
  }, [storageKey, moduleId, stepNumber, items]);

  // Debounced save to localStorage
  const saveToStorage = useCallback((data: Record<string, boolean>) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving checklist state:", error);
      toast({
        title: "Warning",
        description: "Unable to save progress. Storage may be full.",
        variant: "destructive",
      });
    }
  }, [storageKey]);

  const handleCheck = useCallback((itemId: string, checked: boolean) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [itemId]: checked };
      saveToStorage(updated);
      
      // Calculate progress
      const completedCount = Object.values(updated).filter(Boolean).length;
      const wasEmpty = Object.values(prev).filter(Boolean).length === 0;
      
      onProgressChange?.(completedCount, items.length);
      
      // Log activity and set start date via the store when checking (not unchecking)
      if (checked) {
        // Get the canonical module ID for proper activity logging
        const canonicalId = getCanonicalModuleId(moduleId);
        const moduleName = MODULE_DISPLAY_NAMES[moduleId] || moduleId;
        
        // Set start date on first ever checkbox check
        if (wasEmpty && !storeStartDate) {
          // Zustand store will handle start date when we call updateChecklistItem
        }
        
        // Log activity - use 'module_started' for first check in module, or for any checkbox
        addActivity('checklist_updated', canonicalId, moduleName);
      }
      
      // Dispatch event for module-level tracking
      window.dispatchEvent(new CustomEvent('checklist-item-changed', {
        detail: { moduleId, stepNumber, itemId, checked, completedCount, totalCount: items.length }
      }));
      
      return updated;
    });
  }, [saveToStorage, items.length, onProgressChange, moduleId, stepNumber, storeStartDate, addActivity]);


  const handleResetStep = useCallback(() => {
    setCheckedItems({});
    try {
      localStorage.removeItem(storageKey);
      onProgressChange?.(0, items.length);
      window.dispatchEvent(new CustomEvent('checklist-item-changed', {
        detail: { moduleId, stepNumber, itemId: null, checked: false, completedCount: 0, totalCount: items.length }
      }));
      toast({
        title: "Step Reset",
        description: `All items in Step ${stepNumber} have been reset.`,
      });
    } catch (error) {
      console.error("Error resetting step:", error);
    }
  }, [storageKey, items.length, onProgressChange, moduleId, stepNumber]);

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
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
