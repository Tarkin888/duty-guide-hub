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

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setCheckedItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading checklist state:", error);
    }
  }, [storageKey]);

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
      
      // Calculate and report progress
      const completedCount = Object.values(updated).filter(Boolean).length;
      onProgressChange?.(completedCount, items.length);
      
      // Dispatch event for module-level tracking
      window.dispatchEvent(new CustomEvent('checklist-item-changed', {
        detail: { moduleId, stepNumber, itemId, checked, completedCount, totalCount: items.length }
      }));
      
      return updated;
    });
  }, [saveToStorage, items.length, onProgressChange, moduleId, stepNumber]);

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
