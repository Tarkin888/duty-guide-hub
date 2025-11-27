import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface PhaseProgressCardProps {
  title: string;
  completed: number;
  total: number;
  icon: LucideIcon;
}

export function PhaseProgressCard({ title, completed, total, icon: Icon }: PhaseProgressCardProps) {
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
          {completed} of {total} modules
        </p>
      </div>
    </div>
  );
}
