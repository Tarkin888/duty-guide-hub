import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
}

export function ChecklistSection({ 
  stepNumber, 
  title, 
  description,
  items, 
  moduleId,
  templateLink 
}: ChecklistSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`checklist-${moduleId}-step${stepNumber}`);
    if (stored) {
      setCheckedItems(JSON.parse(stored));
    }
  }, [moduleId, stepNumber]);

  // Save to localStorage when changed
  const handleCheck = (itemId: string, checked: boolean) => {
    const updated = { ...checkedItems, [itemId]: checked };
    setCheckedItems(updated);
    localStorage.setItem(`checklist-${moduleId}-step${stepNumber}`, JSON.stringify(updated));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

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
                </div>
                {description && (
                  <CardDescription>{description}</CardDescription>
                )}
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{completedCount} of {totalCount} completed</span>
                  <div className="flex-1 max-w-xs h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={(checked) => handleCheck(item.id, checked === true)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <label
                      htmlFor={item.id}
                      className="text-sm font-medium leading-relaxed cursor-pointer"
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
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
