import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface PhaseProgressCardProps {
  /** Phase title (e.g., "Foundation", "Governance & Planning") */
  title: string;
  /** Number of fully complete modules in this phase */
  completed: number;
  /** Total number of modules in this phase */
  total: number;
  /** Proportional phase percentage from the progress store */
  percentage: number;
  /** Icon to display */
  icon: LucideIcon;
}

/**
 * PhaseProgressCard - Displays progress for a category/phase
 *
 * The percentage is calculated once in the progress store (average of each
 * module's own completion share) and passed in, so this card can never drift
 * from the dashboard or module pages.
 */
export function PhaseProgressCard({ title, completed, total, percentage, icon: Icon }: PhaseProgressCardProps) {


  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
      <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
          <h4 className="font-medium text-xs sm:text-sm truncate">{title}</h4>
          <span className="text-xs sm:text-sm font-semibold text-primary shrink-0">{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-1.5 sm:h-2" />
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
          {completed} of {total} complete
        </p>
      </div>
    </div>
  );
}
