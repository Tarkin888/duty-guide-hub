import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/CircularProgress";
import { PhaseProgressCard } from "@/components/PhaseProgressCard";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { ResetProgressModal } from "@/components/ResetProgressModal";
import { 
  BookOpen, 
  Download, 
  Calendar, 
  Clock, 
  Target, 
  CheckCircle2, 
  FileText,
  TrendingUp,
  BarChart3,
  Shield,
  ListChecks,
  Users,
  GraduationCap,
  AlertCircle,
  Play,
  FolderOpen,
  Bell,
  BookMarked,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
import { useProgressStore, MODULE_CATEGORIES, TOTAL_MODULES } from "@/stores/progressStore";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { toast } from "sonner";
import { exportProgressToPDF, exportProgressToCSV } from "@/utils/exportProgress";

// Map module IDs to their routes
const MODULE_ROUTES: Record<string, string> = {
  'CD-F1': '/foundation/readiness',
  'CD-F2': '/foundation/requirements',
  'CD-F3': '/foundation/risk-impact',
  'CD-P1': '/governance/framework',
  'CD-P2': '/governance/policy',
  'CD-P3': '/governance/roadmap',
  'CD-I1': '/outcomes/products-services',
  'CD-I2': '/outcomes/price-value',
  'CD-I3': '/outcomes/consumer-understanding',
  'CD-I4': '/outcomes/consumer-support',
  'CD-I5': '/cross-cutting/vulnerable-customers',
  'CD-I6': '/cross-cutting/distribution-chain',
  'CD-I7': '/cross-cutting/data-evidence',
  'CD-T1': '/enablement/training',
  'CD-T2': '/enablement/communications',
  'CD-T3': '/enablement/technology',
  'CD-M1': '/monitoring/mi-monitoring',
  'CD-M2': '/monitoring/testing-assurance',
  'CD-M3': '/monitoring/board-reporting',
  'CD-M4': '/monitoring/continuous-improvement',
};

// Module display names
const MODULE_NAMES: Record<string, string> = {
  'CD-F1': 'Readiness Assessment',
  'CD-F2': 'Requirements Mapping',
  'CD-F3': 'Risk & Impact Assessment',
  'CD-P1': 'Governance Framework',
  'CD-P2': 'Policy Framework',
  'CD-P3': 'Implementation Roadmap',
  'CD-I1': 'Products & Services',
  'CD-I2': 'Price & Value',
  'CD-I3': 'Consumer Understanding',
  'CD-I4': 'Consumer Support',
  'CD-I5': 'Vulnerable Customers',
  'CD-I6': 'Distribution Chain',
  'CD-I7': 'Data & Evidence',
  'CD-T1': 'Training Programme',
  'CD-T2': 'Communications & Change',
  'CD-T3': 'Technology Requirements',
  'CD-M1': 'MI Framework',
  'CD-M2': 'Testing & Assurance',
  'CD-M3': 'Board Reporting',
  'CD-M4': 'Continuous Improvement',
};

// Helper to format days since start
function formatDaysSinceStart(days: number): string {
  if (days < 0) return "Not started";
  if (days === 0) return "Started today";
  if (days === 1) return "Started yesterday";
  return `${days} days`;
}

export default function Dashboard() {
  // Use Zustand store for all progress data
  // IMPORTANT: Select modules state directly to establish reactivity for re-renders
  const modules = useProgressStore((state) => state.modules);
  const storeActivities = useProgressStore((state) => state.activities);
  const storeStartDate = useProgressStore((state) => state.startDate);
  const resetAllProgress = useProgressStore((state) => state.resetAllProgress);
  const resetStartDate = useProgressStore((state) => state.resetStartDate);

  const [lastUpdated, setLastUpdated] = useState("");
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetDateDialogOpen, setResetDateDialogOpen] = useState(false);

  // Compute progress from the modules state (reactive)
  const allModuleIds = Object.values(MODULE_CATEGORIES).flat();
  
  const overallProgress = useMemo(() => {
    const completed = allModuleIds.filter(
      (moduleId) => modules[moduleId]?.status === 'complete'
    ).length;
    const inProgress = allModuleIds.filter(
      (moduleId) => modules[moduleId]?.status === 'in-progress'
    ).length;
    return {
      completed,
      inProgress,
      total: TOTAL_MODULES,
      percentage: Math.round((completed / TOTAL_MODULES) * 100),
    };
  }, [modules, allModuleIds]);

  const getCategoryProgress = useCallback((category: keyof typeof MODULE_CATEGORIES) => {
    const categoryModules = MODULE_CATEGORIES[category];
    const total = categoryModules.length;
    const completed = categoryModules.filter(
      (moduleId) => modules[moduleId]?.status === 'complete'
    ).length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [modules]);

  const inProgressModules = useMemo(() => {
    return Object.values(modules).filter(
      (module) => module.status === 'in-progress'
    );
  }, [modules]);

  const daysSinceStart = useMemo(() => {
    if (!storeStartDate) return -1;
    const start = new Date(storeStartDate);
    const now = new Date();
    const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffTime = nowMidnight.getTime() - startMidnight.getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  }, [storeStartDate]);

  const avgDaysPerModule = useMemo(() => {
    const completedCount = Object.values(modules).filter(m => m.status === 'complete').length;
    if (completedCount === 0 || !storeStartDate) return 0;
    const start = new Date(storeStartDate);
    const now = new Date();
    const diffDays = Math.max(1, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return Math.round((diffDays / completedCount) * 10) / 10;
  }, [modules, storeStartDate]);

  const estimatedCompletion = useMemo(() => {
    const completedCount = Object.values(modules).filter(m => m.status === 'complete').length;
    if (completedCount === 0 || !storeStartDate) return null;
    const remainingModules = TOTAL_MODULES - completedCount;
    if (remainingModules <= 0) return new Date();
    if (avgDaysPerModule <= 0) return null;
    const estimatedDaysRemaining = Math.ceil(remainingModules * avgDaysPerModule);
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + estimatedDaysRemaining);
    return completionDate;
  }, [modules, storeStartDate, avgDaysPerModule]);

  // Category progress - with debug logging
  console.log('[Dashboard] Current modules state:', modules);
  console.log('[Dashboard] MODULE_CATEGORIES.foundation:', MODULE_CATEGORIES.foundation);
  
  const foundationProgress = getCategoryProgress('foundation');
  console.log('[Dashboard] Foundation progress:', foundationProgress, 
    'Modules check:', MODULE_CATEGORIES.foundation.map(id => ({ id, status: modules[id]?.status })));
  
  const governanceProgress = getCategoryProgress('governance');
  const outcomesProgress = getCategoryProgress('outcomes');
  const crossCuttingProgress = getCategoryProgress('crossCutting');
  const enablementProgress = getCategoryProgress('enablement');
  const monitoringProgress = getCategoryProgress('monitoring');

  useEffect(() => {
    setLastUpdated(format(new Date(), "PPP"));
    // Debug: Log all module keys in store
    console.log('[Dashboard Mount] All module keys:', Object.keys(modules));
    console.log('[Dashboard Mount] All module entries:', Object.entries(modules));
  }, [modules]);


  const totalTemplates = 40;

  const estimatedDaysRemaining = overallProgress.percentage > 0 && daysSinceStart > 0
    ? Math.ceil((daysSinceStart / overallProgress.percentage) * (100 - overallProgress.percentage))
    : 0;

  const mostUsedTemplates = [
    "Consumer Duty Assessment Template",
    "Risk Assessment Matrix",
    "Governance Framework Template",
    "Policy Document Template",
    "Implementation Roadmap Template"
  ];

  const recommendedReading = [
    { title: "FCA Consumer Duty Guidance", url: "#" },
    { title: "Final Rules and Guidance", url: "#" },
    { title: "Questions and Answers", url: "#" }
  ];

  // Convert activities to format expected by ActivityTimeline
  const formattedActivities = storeActivities.map(activity => ({
    id: activity.id,
    type: activity.type === 'module_completed' ? 'module_completed' as const : 
          activity.type === 'module_started' ? 'module_started' as const : 
          'status_updated' as const,
    moduleTitle: `${activity.moduleId}: ${activity.moduleName}`,
    timestamp: activity.timestamp,
  }));

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Consumer Duty Implementation Playbook
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Your comprehensive guide to FCA Consumer Duty compliance - from assessment through ongoing monitoring
            </p>
          </div>
          <Badge variant="outline" className="shrink-0">
            <Calendar className="h-3 w-3 mr-1" />
            {lastUpdated}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {inProgressModules.length > 0 && (
            <Button asChild size="lg" className="gap-2">
              <Link to={MODULE_ROUTES[inProgressModules[0].moduleId] || '/foundation/readiness'}>
                <Play className="h-4 w-4" />
                Resume Where You Left Off
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/resources/templates">
              <FolderOpen className="h-4 w-4" />
              View All Templates
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2">
                <Download className="h-4 w-4" />
                Export Progress Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => {
                exportProgressToPDF();
                toast.success('PDF exported successfully');
              }}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                exportProgressToCSV();
                toast.success('CSV exported successfully');
              }}>
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Overview Card */}
        <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Progress Overview
            </CardTitle>
            <CardDescription>Your implementation journey across all phases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <CircularProgress value={overallProgress.percentage} />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <PhaseProgressCard 
                    title="Foundation" 
                    completed={foundationProgress.completed}
                    total={foundationProgress.total}
                    icon={BookOpen}
                  />
                  <PhaseProgressCard 
                    title="Governance & Planning" 
                    completed={governanceProgress.completed}
                    total={governanceProgress.total}
                    icon={Shield}
                  />
                  <PhaseProgressCard 
                    title="Four Outcomes" 
                    completed={outcomesProgress.completed}
                    total={outcomesProgress.total}
                    icon={ListChecks}
                  />
                  <PhaseProgressCard 
                    title="Cross-Cutting" 
                    completed={crossCuttingProgress.completed}
                    total={crossCuttingProgress.total}
                    icon={Users}
                  />
                  <PhaseProgressCard 
                    title="Enablement" 
                    completed={enablementProgress.completed}
                    total={enablementProgress.total}
                    icon={GraduationCap}
                  />
                  <PhaseProgressCard 
                    title="Monitoring & Assurance" 
                    completed={monitoringProgress.completed}
                    total={monitoringProgress.total}
                    icon={BarChart3}
                  />
                </div>

                {estimatedDaysRemaining > 0 && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        Estimated {estimatedDaysRemaining} days to completion at current pace
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallProgress.total}</p>
                  <p className="text-sm text-muted-foreground">Total Modules</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallProgress.completed}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-warning/10">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallProgress.inProgress}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <Target className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallProgress.total - overallProgress.completed - overallProgress.inProgress}</p>
                  <p className="text-sm text-muted-foreground">Not Started</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-info/10">
                        <Calendar className="h-6 w-6 text-info" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {daysSinceStart >= 0 ? formatDaysSinceStart(daysSinceStart) : "--"}
                        </p>
                        <p className="text-sm text-muted-foreground">Days Since Started</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                {storeStartDate ? (
                  <div className="space-y-1">
                    <p className="font-medium">Started on {format(new Date(storeStartDate), "d MMM yyyy")}</p>
                    {avgDaysPerModule > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Avg: {avgDaysPerModule} days per module
                      </p>
                    )}
                    {estimatedCompletion && overallProgress.completed < overallProgress.total && (
                      <p className="text-xs text-muted-foreground">
                        Est. completion: {format(estimatedCompletion, "d MMM yyyy")}
                      </p>
                    )}
                  </div>
                ) : (
                  <p>Start date will be set when you begin a module</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Current Priorities & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Current Priorities
            </CardTitle>
            <CardDescription>Modules in progress and recommended next steps</CardDescription>
          </CardHeader>
          <CardContent>
            {inProgressModules.length > 0 ? (
              <div className="space-y-4">
                {inProgressModules.slice(0, 3).map((module) => (
                  <div key={module.moduleId} className="p-4 rounded-lg border border-warning/20 bg-warning/5">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">
                        {MODULE_NAMES[module.moduleId] || module.moduleId}
                      </h4>
                      <Badge variant="outline" className="bg-warning/10 text-warning">
                        In Progress
                      </Badge>
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto">
                      <Link to={MODULE_ROUTES[module.moduleId] || '/foundation/readiness'}>
                        Continue module →
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No modules in progress</p>
                <Button asChild>
                  <Link to="/foundation/readiness">Start with Readiness Assessment</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest actions and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityTimeline activities={formattedActivities.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-accent" />
              Most Used Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mostUsedTemplates.map((template, index) => (
                <li key={index}>
                  <Button asChild variant="link" className="h-auto p-0 text-left">
                    <Link to="/resources/templates" className="text-sm">
                      {template}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-info" />
              Regulatory Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p className="mb-4">Stay informed about the latest FCA guidance and regulatory changes.</p>
              <Button variant="outline" size="sm" className="w-full">
                View Updates
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookMarked className="h-5 w-5 text-primary" />
              Recommended Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendedReading.map((item, index) => (
                <li key={index}>
                  <Button asChild variant="link" className="h-auto p-0 text-left">
                    <a href={item.url} className="text-sm">
                      {item.title}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Reset Options */}
      <div className="mt-8 pt-8 border-t flex flex-wrap gap-3">
        {storeStartDate && (
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setResetDateDialogOpen(true)}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Start Date
          </Button>
        )}
        <Button 
          variant="outline" 
          className="text-destructive border-destructive hover:bg-destructive/10 gap-2"
          onClick={() => setResetModalOpen(true)}
        >
          <AlertTriangle className="h-4 w-4" />
          Reset All Progress
        </Button>
      </div>

      {/* Reset Start Date Dialog */}
      <AlertDialog open={resetDateDialogOpen} onOpenChange={setResetDateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Start Date?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset your implementation start date counter but keep all your module progress intact. A new start date will be set when you next update a module.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              resetStartDate();
              setResetDateDialogOpen(false);
            }}>
              Reset Start Date
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ResetProgressModal 
        open={resetModalOpen} 
        onOpenChange={setResetModalOpen} 
      />
    </div>
  );
}
