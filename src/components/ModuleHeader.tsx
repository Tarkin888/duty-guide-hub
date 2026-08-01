import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, Printer, Calendar, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useProgressStore, useModuleProgress, normalizeModuleId } from '@/stores/progressStore';
import { format } from 'date-fns';
import { ModuleBreadcrumb } from './ModuleBreadcrumb';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ModuleHeaderProps {
  moduleId: string;
  storageKey: string;
  title: string;
  description: string;
  category: string;
  categoryBadgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive';
  duration?: string;
  phase?: string;
  priority?: string;
  owner?: string;
  part?: string;
  icon?: React.ReactNode;
}

// Storage key for "don't show again" preferences
const CONFIRM_PREFERENCES_KEY = 'module-confirm-preferences';

const getConfirmPreferences = () => {
  try {
    const data = localStorage.getItem(CONFIRM_PREFERENCES_KEY);
    return data ? JSON.parse(data) : { skipCompleteConfirm: false, skipResetConfirm: false };
  } catch {
    return { skipCompleteConfirm: false, skipResetConfirm: false };
  }
};

const saveConfirmPreferences = (prefs: { skipCompleteConfirm?: boolean; skipResetConfirm?: boolean }) => {
  try {
    const current = getConfirmPreferences();
    localStorage.setItem(CONFIRM_PREFERENCES_KEY, JSON.stringify({ ...current, ...prefs }));
  } catch (e) {
    console.error('Failed to save confirm preferences:', e);
  }
};

export const ModuleHeader = ({
  moduleId,
  storageKey,
  title,
  description,
  category,
  categoryBadgeVariant = 'secondary',
  duration,
  phase,
  priority,
  owner,
  part,
  icon,
}: ModuleHeaderProps) => {
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [dontShowComplete, setDontShowComplete] = useState(false);
  const [dontShowReset, setDontShowReset] = useState(false);

  // Single source of truth: the progress store
  const canonicalId = normalizeModuleId(storageKey);
  const moduleProgress = useModuleProgress(canonicalId);
  const completedAt = moduleProgress.completedAt;
  const status = moduleProgress.status;

  const markModuleComplete = useProgressStore((state) => state.markModuleComplete);
  const markModuleInProgress = useProgressStore((state) => state.markModuleInProgress);
  const resetModuleProgress = useProgressStore((state) => state.resetModuleProgress);

  const handleMarkCompleteClick = () => {
    const prefs = getConfirmPreferences();
    if (prefs.skipCompleteConfirm) {
      confirmComplete();
    } else {
      setCompleteDialogOpen(true);
    }
  };

  const confirmComplete = () => {
    if (dontShowComplete) {
      saveConfirmPreferences({ skipCompleteConfirm: true });
    }
    
    markModuleComplete(canonicalId, false);
    setCompleteDialogOpen(false);
    
    toast.success('Module Complete!', {
      description: `${title} marked as complete. Your progress has been saved.`,
    });
  };

  const handleResetClick = () => {
    const prefs = getConfirmPreferences();
    if (prefs.skipResetConfirm) {
      confirmReset();
    } else {
      setResetDialogOpen(true);
    }
  };

  const confirmReset = () => {
    if (dontShowReset) {
      saveConfirmPreferences({ skipResetConfirm: true });
    }
    
    resetModuleProgress(canonicalId, false);
    setResetDialogOpen(false);
    
    toast.info('Progress Reset', {
      description: `${title} has been reset to Not Started.`,
    });
  };

  const handleMarkInProgress = () => {
    markModuleInProgress(canonicalId, false);
    
    toast.info('Module In Progress', {
      description: `Started working on ${title}`,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCompletionDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'd MMM yyyy');
    } catch {
      return null;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'complete':
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Complete
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Circle className="h-3 w-3 mr-1" />
            Not Started
          </Badge>
        );
    }
  };

  return (
    <>
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb Navigation */}
          <ModuleBreadcrumb 
            moduleId={moduleId} 
            moduleName={title}
            part={part}
            className="mb-4"
          />

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              {icon && (
                <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                  {icon}
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline">{moduleId}</Badge>
                  <Badge variant={categoryBadgeVariant}>{category}</Badge>
                  {part && <Badge variant="secondary">{part}</Badge>}
                  {getStatusBadge()}
                </div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
                
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  {duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Duration: {duration}
                    </span>
                  )}
                  {phase && (
                    <span>Phase: {phase}</span>
                  )}
                  {priority && (
                    <span>Priority: {priority}</span>
                  )}
                  {owner && (
                    <span>Owner: {owner}</span>
                  )}
                  {status === 'complete' && completedAt && (
                    <span className="flex items-center gap-1 text-success">
                      <Calendar className="h-4 w-4" />
                      Completed on {formatCompletionDate(completedAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>

              {status === 'not-started' && (
                <Button variant="outline" size="sm" onClick={handleMarkInProgress}>
                  <Clock className="h-4 w-4 mr-2" />
                  Mark In Progress
                </Button>
              )}

              {status === 'complete' ? (
                <Button variant="outline" size="sm" onClick={handleResetClick}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Progress
                </Button>
              ) : (
                <Button size="sm" onClick={handleMarkCompleteClick}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Confirmation Dialog */}
      <AlertDialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Module as Complete?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark <strong>{title}</strong> as complete and update your progress tracking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-2 py-2">
            <Checkbox 
              id="dont-show-complete" 
              checked={dontShowComplete}
              onCheckedChange={(checked) => setDontShowComplete(checked === true)}
            />
            <Label htmlFor="dont-show-complete" className="text-sm text-muted-foreground">
              Don't show this again
            </Label>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmComplete}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Complete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Module Progress?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset progress for <strong>{title}</strong>? This will change the status back to "Not Started".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-2 py-2">
            <Checkbox 
              id="dont-show-reset" 
              checked={dontShowReset}
              onCheckedChange={(checked) => setDontShowReset(checked === true)}
            />
            <Label htmlFor="dont-show-reset" className="text-sm text-muted-foreground">
              Don't show this again
            </Label>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset} className="bg-destructive hover:bg-destructive/90">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Progress
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ModuleHeader;
