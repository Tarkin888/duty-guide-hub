import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, RotateCcw, Calendar } from 'lucide-react';
import { useProgressStore, useModuleProgress } from '@/stores/progressStore';
import { format } from 'date-fns';

interface ModuleActionButtonsProps {
  moduleId: string;
  className?: string;
}

export function ModuleActionButtons({ moduleId, className }: ModuleActionButtonsProps) {
  const markModuleComplete = useProgressStore((state) => state.markModuleComplete);
  const markModuleInProgress = useProgressStore((state) => state.markModuleInProgress);
  const reopenModule = useProgressStore((state) => state.reopenModule);
  const moduleStatus = useModuleProgress(moduleId);

  const handleMarkInProgress = () => {
    markModuleInProgress(moduleId);
  };

  const handleMarkComplete = () => {
    markModuleComplete(moduleId);
  };

  const handleReopen = () => {
    reopenModule(moduleId);
  };

  const formatCompletionDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'd MMM yyyy');
    } catch {
      return null;
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 flex-wrap">
        {moduleStatus.status === 'not-started' && (
          <Button
            onClick={handleMarkInProgress}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <Clock className="h-4 w-4" />
            Mark In Progress
          </Button>
        )}

        {moduleStatus.status !== 'complete' && (
          <Button
            onClick={handleMarkComplete}
            size="sm"
            className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark Complete
          </Button>
        )}

        {moduleStatus.status === 'complete' && (
          <>
            {moduleStatus.completedAt && (
              <span className="flex items-center gap-1.5 text-sm text-success mr-2">
                <Calendar className="h-4 w-4" />
                Completed on {formatCompletionDate(moduleStatus.completedAt)}
              </span>
            )}
            <Button
              onClick={handleReopen}
              variant="secondary"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reopen Module
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
