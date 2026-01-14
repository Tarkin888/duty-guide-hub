import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface PhaseProgressCardProps {
  /** Phase title (e.g., "Foundation", "Governance & Planning") */
  title: string;
  /** Number of completed modules in this phase */
  completed: number;
  /** Total number of modules in this phase */
  total: number;
  /** Icon to display */
  icon: LucideIcon;
}

/**
 * PhaseProgressCard - Displays progress for a category/phase
 * 
 * Uses unified module state logic where:
 * - `completed`: Count of modules with status === 'complete'
 * - `total`: Total modules defined in MODULE_CATEGORIES for this phase
 * - Percentage: Math.round((completed / total) * 100)
 * 
 * This ensures phase cards align exactly with the global dashboard counts.
 */
export function PhaseProgressCard({ title, completed, total, icon: Icon }: PhaseProgressCardProps) {
  // Single deterministic percentage calculation: (completed / total) * 100
  // This matches the calculation in progressUtils.ts calculateCategoryProgressFromMap
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm truncate">{title}</h4>
          <span className="text-sm font-semibold text-primary ml-2">{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {completed} of {total} modules complete
        </p>
      </div>
    </div>
  );
}
