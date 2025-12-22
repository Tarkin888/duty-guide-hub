import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { useProgressStore } from '@/stores/progressStore';
import { cn } from '@/lib/utils';

interface ModuleStatusBadgeProps {
  moduleId: string;
  className?: string;
}

export function ModuleStatusBadge({ moduleId, className }: ModuleStatusBadgeProps) {
  const { getModuleStatus } = useProgressStore();
  const status = getModuleStatus(moduleId).status;

  const variants = {
    'not-started': {
      icon: Circle,
      label: 'Not Started',
      className: 'bg-muted text-muted-foreground border-muted-foreground/20',
    },
    'in-progress': {
      icon: Clock,
      label: 'In Progress',
      className: 'bg-warning/10 text-warning border-warning/30',
    },
    'complete': {
      icon: CheckCircle2,
      label: 'Complete',
      className: 'bg-success/10 text-success border-success/30',
    },
  };

  const config = variants[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}
