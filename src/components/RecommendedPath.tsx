import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgressStore, MODULE_CATEGORIES } from '@/stores/progressStore';
import { ArrowRight, CheckCircle2, Circle, PlayCircle, Map } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Define the recommended path with phases and their modules
const RECOMMENDED_PATH = [
  {
    phase: 'Foundation',
    description: 'Start here - Assess readiness and map requirements',
    modules: [
      { id: 'CD-F1', name: 'Readiness Assessment', route: '/foundation/readiness' },
      { id: 'CD-F2', name: 'Requirements Mapping', route: '/foundation/requirements' },
      { id: 'CD-F3', name: 'Risk & Impact', route: '/foundation/risk-impact' },
    ],
    isParallel: false,
  },
  {
    phase: 'Governance & Planning',
    description: 'Establish governance structure and policies',
    modules: [
      { id: 'CD-P1', name: 'Governance Framework', route: '/governance/framework' },
      { id: 'CD-P2', name: 'Policy Framework', route: '/governance/policy' },
      { id: 'CD-P3', name: 'Implementation Roadmap', route: '/governance/roadmap' },
    ],
    isParallel: false,
  },
  {
    phase: 'Four Outcomes',
    description: 'Can be completed in parallel',
    modules: [
      { id: 'CD-I1', name: 'Products & Services', route: '/outcomes/products-services' },
      { id: 'CD-I2', name: 'Price & Value', route: '/outcomes/price-value' },
      { id: 'CD-I3', name: 'Consumer Understanding', route: '/outcomes/consumer-understanding' },
      { id: 'CD-I4', name: 'Consumer Support', route: '/outcomes/consumer-support' },
    ],
    isParallel: true,
  },
  {
    phase: 'Cross-Cutting',
    description: 'Can be completed in parallel',
    modules: [
      { id: 'CD-I5', name: 'Vulnerable Customers', route: '/cross-cutting/vulnerable-customers' },
      { id: 'CD-I6', name: 'Distribution Chain', route: '/cross-cutting/distribution-chain' },
      { id: 'CD-I7', name: 'Data & Evidence', route: '/cross-cutting/data-evidence' },
    ],
    isParallel: true,
  },
  {
    phase: 'Enablement',
    description: 'Training, communications, and technology',
    modules: [
      { id: 'CD-T1', name: 'Training Programme', route: '/enablement/training' },
      { id: 'CD-T2', name: 'Communications & Change', route: '/enablement/communications' },
      { id: 'CD-T3', name: 'Technology Requirements', route: '/enablement/technology' },
    ],
    isParallel: false,
  },
  {
    phase: 'Monitoring & Assurance',
    description: 'Ongoing monitoring and improvement',
    modules: [
      { id: 'CD-M1', name: 'MI Framework', route: '/monitoring/mi-monitoring' },
      { id: 'CD-M2', name: 'Testing & Assurance', route: '/monitoring/testing-assurance' },
      { id: 'CD-M3', name: 'Board Reporting', route: '/monitoring/board-reporting' },
      { id: 'CD-M4', name: 'Continuous Improvement', route: '/monitoring/continuous-improvement' },
    ],
    isParallel: false,
  },
];

type ModuleStatus = 'completed' | 'recommended' | 'future';

interface ModuleNodeProps {
  id: string;
  name: string;
  route: string;
  status: ModuleStatus;
  onClick: () => void;
}

function ModuleNode({ id, name, status, onClick }: ModuleNodeProps) {
  const statusStyles = {
    completed: 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/30',
    recommended: 'bg-primary/20 border-primary text-primary hover:bg-primary/30 ring-2 ring-primary/30 ring-offset-2 ring-offset-background',
    future: 'bg-muted border-muted-foreground/30 text-muted-foreground hover:bg-muted/80',
  };

  const StatusIcon = status === 'completed' ? CheckCircle2 : status === 'recommended' ? PlayCircle : Circle;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all cursor-pointer text-left min-w-0',
              statusStyles[status]
            )}
          >
            <StatusIcon className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium truncate">{id}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">
            {status === 'completed' ? 'Completed' : status === 'recommended' ? 'Recommended next' : 'Future module'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface PhaseBlockProps {
  phase: string;
  description: string;
  modules: Array<{ id: string; name: string; route: string }>;
  isParallel: boolean;
  moduleStatuses: Record<string, ModuleStatus>;
  onModuleClick: (route: string) => void;
  showArrow: boolean;
}

function PhaseBlock({ phase, description, modules, isParallel, moduleStatuses, onModuleClick, showArrow }: PhaseBlockProps) {
  const phaseCompleted = modules.every(m => moduleStatuses[m.id] === 'completed');
  const hasRecommended = modules.some(m => moduleStatuses[m.id] === 'recommended');

  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        'flex-1 p-4 rounded-xl border-2 transition-all',
        phaseCompleted ? 'border-emerald-500/50 bg-emerald-500/5' :
        hasRecommended ? 'border-primary/50 bg-primary/5' :
        'border-border bg-card'
      )}>
        <div className="flex items-center gap-2 mb-3">
          <h4 className={cn(
            'font-semibold text-sm',
            phaseCompleted ? 'text-emerald-700 dark:text-emerald-400' :
            hasRecommended ? 'text-primary' :
            'text-muted-foreground'
          )}>
            {phase}
          </h4>
          {isParallel && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wider">
              Parallel
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
        <div className={cn(
          'flex gap-2',
          isParallel ? 'flex-wrap' : 'flex-wrap'
        )}>
          {modules.map((module) => (
            <ModuleNode
              key={module.id}
              {...module}
              status={moduleStatuses[module.id]}
              onClick={() => onModuleClick(module.route)}
            />
          ))}
        </div>
      </div>
      {showArrow && (
        <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 hidden lg:block" />
      )}
    </div>
  );
}

export function RecommendedPath() {
  const navigate = useNavigate();
  const modules = useModulesMap();

  // Determine status for each module
  const moduleStatuses = useMemo(() => {
    const statuses: Record<string, ModuleStatus> = {};
    let foundRecommended = false;

    // First pass: mark completed modules
    RECOMMENDED_PATH.forEach(phase => {
      phase.modules.forEach(module => {
        if (modules[module.id]?.status === 'complete') {
          statuses[module.id] = 'completed';
        }
      });
    });

    // Second pass: find recommended modules (first incomplete in sequence)
    for (const phase of RECOMMENDED_PATH) {
      const phaseModules = phase.modules;
      const allPhaseComplete = phaseModules.every(m => statuses[m.id] === 'completed');

      if (!allPhaseComplete && !foundRecommended) {
        // This phase has incomplete modules - mark them as recommended
        if (phase.isParallel) {
          // For parallel phases, recommend all incomplete ones
          phaseModules.forEach(module => {
            if (statuses[module.id] !== 'completed') {
              statuses[module.id] = 'recommended';
              foundRecommended = true;
            }
          });
        } else {
          // For sequential phases, recommend the first incomplete one
          for (const module of phaseModules) {
            if (statuses[module.id] !== 'completed') {
              statuses[module.id] = 'recommended';
              foundRecommended = true;
              break;
            }
          }
        }
      }
    }

    // Third pass: mark remaining as future
    RECOMMENDED_PATH.forEach(phase => {
      phase.modules.forEach(module => {
        if (!statuses[module.id]) {
          statuses[module.id] = 'future';
        }
      });
    });

    return statuses;
  }, [modules]);

  const handleModuleClick = (route: string) => {
    navigate(route);
  };

  // Stats for the header
  const stats = useMemo(() => {
    const all = Object.values(moduleStatuses);
    return {
      completed: all.filter(s => s === 'completed').length,
      recommended: all.filter(s => s === 'recommended').length,
      total: all.length,
    };
  }, [moduleStatuses]);

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            <CardTitle>Recommended Path</CardTitle>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Completed ({stats.completed})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Next ({stats.recommended})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              <span className="text-muted-foreground">Future</span>
            </div>
          </div>
        </div>
        <CardDescription>
          Follow this suggested sequence for optimal implementation. Click any module to navigate to it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {RECOMMENDED_PATH.map((phase, index) => (
            <PhaseBlock
              key={phase.phase}
              {...phase}
              moduleStatuses={moduleStatuses}
              onModuleClick={handleModuleClick}
              showArrow={index < RECOMMENDED_PATH.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
