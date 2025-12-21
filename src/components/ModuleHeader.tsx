import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, Printer, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getModuleStatus, updateModuleStatus, addActivity } from '@/lib/storage';

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
  const navigate = useNavigate();
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started');

  useEffect(() => {
    const savedStatus = getModuleStatus(storageKey);
    setStatus(savedStatus);
  }, [storageKey]);

  const handleMarkComplete = () => {
    updateModuleStatus(storageKey, 'completed');
    setStatus('completed');
    
    toast.success('Module Complete', {
      description: `${title} marked as complete!`,
    });
  };

  const handleMarkInProgress = () => {
    updateModuleStatus(storageKey, 'in-progress');
    setStatus('in-progress');
    
    toast.info('Module In Progress', {
      description: `${title} marked as in progress`,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
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
    <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

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

            <Button
              size="sm"
              onClick={handleMarkComplete}
              disabled={status === 'completed'}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {status === 'completed' ? 'Completed' : 'Mark Complete'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleHeader;
