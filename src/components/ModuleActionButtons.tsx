import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, RotateCcw } from 'lucide-react';
import { useProgressStore } from '@/stores/progressStore';

interface ModuleActionButtonsProps {
  moduleId: string;
  className?: string;
}

export function ModuleActionButtons({ moduleId, className }: ModuleActionButtonsProps) {
  const { getModuleStatus, markModuleComplete, markModuleInProgress } = useProgressStore();
  const moduleStatus = getModuleStatus(moduleId);

  const handleMarkInProgress = () => {
    markModuleInProgress(moduleId);
  };

  const handleMarkComplete = () => {
    markModuleComplete(moduleId);
  };

  const handleReopen = () => {
    // To reopen, we set back to in-progress by directly updating the store
    const { modules } = useProgressStore.getState();
    const existingModule = modules[moduleId];
    
    useProgressStore.setState((state) => ({
      modules: {
        ...state.modules,
        [moduleId]: {
          ...existingModule,
          moduleId,
          status: 'in-progress',
          completedAt: undefined,
          lastAccessedAt: new Date().toISOString(),
        },
      },
    }));
    
    window.dispatchEvent(new Event('module-progress-updated'));
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
          <Button
            onClick={handleReopen}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reopen Module
          </Button>
        )}
      </div>
    </div>
  );
}
