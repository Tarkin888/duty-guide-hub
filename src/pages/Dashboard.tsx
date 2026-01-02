import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/CircularProgress";
import { PhaseProgressCard } from "@/components/PhaseProgressCard";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { ResetProgressModal } from "@/components/ResetProgressModal";
import { RecommendedPath } from "@/components/RecommendedPath";
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
import { useChecklistProgress } from "@/hooks/useChecklistProgress";
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
  if (days === 0) return "0 days";
  if (days === 1) return "1 day";
  return `${days} days`;
}

// Helper to get color class based on days elapsed
function getDaysColorClass(days: number): string {
  if (days < 0) return "text-muted-foreground";
  if (days <= 30) return "text-success"; // Green: on track
  if (days <= 60) return "text-warning"; // Yellow: monitor
  return "text-destructive"; // Amber/Red: may need acceleration
}

function getDaysIconColorClass(days: number): string {
  if (days < 0) return "bg-muted text-muted-foreground";
  if (days <= 30) return "bg-success/10 text-success";
  if (days <= 60) return "bg-warning/10 text-warning";
  return "bg-destructive/10 text-destructive";
}

export default function Dashboard() {
  // Use Zustand store for activities and start date
  const modules = useProgressStore((state) => state.modules);
  const storeActivities = useProgressStore((state) => state.activities);
  const storeStartDate = useProgressStore((state) => state.startDate);
  const resetAllProgress = useProgressStore((state) => state.resetAllProgress);
  const resetStartDate = useProgressStore((state) => state.resetStartDate);
  const initializeStartDate = useProgressStore((state) => state.initializeStartDate);

  // Use actual checklist progress from localStorage
  const { progress: checklistProgress, isLoading: isLoadingProgress, error: progressError } = useChecklistProgress();

  const [lastUpdated, setLastUpdated] = useState("");
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetDateDialogOpen, setResetDateDialogOpen] = useState(false);

  // Initialize start date on first visit
  useEffect(() => {
    initializeStartDate();
  }, [initializeStartDate]);

  // Compute REAL progress from actual checkbox states
  const overallProgress = useMemo(() => {
    if (!checklistProgress) {
      return {
        completed: 0,
        inProgress: 0,
        total: TOTAL_MODULES,
        percentage: 0,
        checkedBoxes: 0,
        totalBoxes: 0,
      };
    }
    
    return {
      completed: checklistProgress.completedModules,
      inProgress: checklistProgress.inProgressModules,
      total: checklistProgress.totalModules,
      percentage: checklistProgress.overallPercentage,
      checkedBoxes: checklistProgress.totalCheckedBoxes,
      totalBoxes: checklistProgress.totalBoxes,
    };
  }, [checklistProgress]);

  // Get category progress from actual checklist data
  const getCategoryProgress = useCallback((category: keyof typeof MODULE_CATEGORIES) => {
    if (!checklistProgress?.categoryStats) {
      const categoryModules = MODULE_CATEGORIES[category];
      return { completed: 0, total: categoryModules.length, percentage: 0 };
    }
    
    const stats = checklistProgress.categoryStats[category];
    if (!stats) {
      const categoryModules = MODULE_CATEGORIES[category];
      return { completed: 0, total: categoryModules.length, percentage: 0 };
    }
    
    return {
      completed: stats.completedModules,
      total: stats.totalModules,
      percentage: stats.percentage,
    };
  }, [checklistProgress]);

  // Get in-progress modules from actual checklist data
  const inProgressModules = useMemo(() => {
    if (!checklistProgress?.moduleStats) return [];
    
    return checklistProgress.moduleStats
      .filter(m => m.status === 'in-progress')
      .map(m => ({
        moduleId: m.moduleId,
        status: m.status as 'in-progress',
        percentage: m.percentage,
      }));
  }, [checklistProgress]);

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
    const completedCount = overallProgress.completed;
    if (completedCount === 0 || !storeStartDate) return 0;
    const start = new Date(storeStartDate);
    const now = new Date();
    const diffDays = Math.max(1, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return Math.round((diffDays / completedCount) * 10) / 10;
  }, [overallProgress.completed, storeStartDate]);

  const estimatedCompletion = useMemo(() => {
    const completedCount = overallProgress.completed;
    if (completedCount === 0 || !storeStartDate) return null;
    const remainingModules = TOTAL_MODULES - completedCount;
    if (remainingModules <= 0) return new Date();
    if (avgDaysPerModule <= 0) return null;
    const estimatedDaysRemaining = Math.ceil(remainingModules * avgDaysPerModule);
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + estimatedDaysRemaining);
    return completionDate;
  }, [overallProgress.completed, storeStartDate, avgDaysPerModule]);

  // Dynamic completion estimation with velocity calculation
  const completionEstimate = useMemo(() => {
    const completedCount = overallProgress.completed;
    const remainingModules = TOTAL_MODULES - completedCount;
    
    if (remainingModules <= 0) {
      return { weeks: 0, methodology: 'All modules completed!', isComplete: true };
    }
    
    if (completedCount === 0 || !storeStartDate) {
      return { weeks: null, methodology: 'Start completing modules to see an estimate.', isComplete: false };
    }

    // Calculate average duration from completed modules
    const start = new Date(storeStartDate);
    const now = new Date();
    const totalDays = Math.max(1, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const avgDays = totalDays / completedCount;
    
    const estimatedWeeks = Math.ceil((remainingModules * avgDays) / 7);
    const methodologyDetail = `Based on ${completedCount} completed modules over ${totalDays} days (average ${avgDays.toFixed(1)} days per module).`;
    
    return {
      weeks: Math.max(1, estimatedWeeks),
      methodology: methodologyDetail,
      isComplete: false,
      remainingModules,
      completedCount,
      weeklyVelocity: null,
    };
  }, [overallProgress.completed, storeStartDate]);

  // Category progress
  const foundationProgress = getCategoryProgress('foundation');
  const governanceProgress = getCategoryProgress('governance');
  const outcomesProgress = getCategoryProgress('outcomes');
  const crossCuttingProgress = getCategoryProgress('crossCutting');
  const enablementProgress = getCategoryProgress('enablement');
  const monitoringProgress = getCategoryProgress('monitoring');

  useEffect(() => {
    setLastUpdated(format(new Date(), "PPP"));
  }, []);


  const totalTemplates = 40;

  const mostUsedTemplates = [
    "Consumer Duty Assessment Template",
    "Risk Assessment Matrix",
    "Governance Framework Template",
    "Policy Document Template",
    "Implementation Roadmap Template"
  ];

  const recommendedReading = [
    { title: "FCA Consumer Duty Guidance", url: "https://www.fca.org.uk/publication/finalised-guidance/fg22-5.pdf" },
    { title: "Final Rules and Guidance", url: "https://www.fca.org.uk/publications/policy-statements/ps22-9-new-consumer-duty" },
    { title: "Questions and Answers", url: "https://www.fca.org.uk/firms/consumer-duty" }
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
            {progressError ? (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span>{progressError}</span>
              </div>
            ) : isLoadingProgress ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-pulse text-muted-foreground">Loading progress...</div>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center gap-2">
                <CircularProgress value={overallProgress.percentage} />
                {overallProgress.totalBoxes > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {overallProgress.checkedBoxes} of {overallProgress.totalBoxes} items checked
                  </p>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <PhaseProgressCard 
                    title="Foundation" 
                    completed={foundationProgress.completed}
                    total={foundationProgress.total}
                    icon={BookOpen}
                    checkboxPercentage={foundationProgress.percentage}
                  />
                  <PhaseProgressCard 
                    title="Governance & Planning" 
                    completed={governanceProgress.completed}
                    total={governanceProgress.total}
                    icon={Shield}
                    checkboxPercentage={governanceProgress.percentage}
                  />
                  <PhaseProgressCard 
                    title="Four Outcomes" 
                    completed={outcomesProgress.completed}
                    total={outcomesProgress.total}
                    icon={ListChecks}
                    checkboxPercentage={outcomesProgress.percentage}
                  />
                  <PhaseProgressCard 
                    title="Cross-Cutting" 
                    completed={crossCuttingProgress.completed}
                    total={crossCuttingProgress.total}
                    icon={Users}
                    checkboxPercentage={crossCuttingProgress.percentage}
                  />
                  <PhaseProgressCard 
                    title="Enablement" 
                    completed={enablementProgress.completed}
                    total={enablementProgress.total}
                    icon={GraduationCap}
                    checkboxPercentage={enablementProgress.percentage}
                  />
                  <PhaseProgressCard 
                    title="Monitoring & Assurance" 
                    completed={monitoringProgress.completed}
                    total={monitoringProgress.total}
                    icon={BarChart3}
                    checkboxPercentage={monitoringProgress.percentage}
                  />
                </div>

                {completionEstimate.weeks !== null && !completionEstimate.isComplete && (
                  <div className="pt-4 border-t">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-help">
                            <Clock className="h-4 w-4" />
                            <span>
                              Estimated {completionEstimate.weeks} {completionEstimate.weeks === 1 ? 'week' : 'weeks'} to completion
                            </span>
                            <AlertCircle className="h-3.5 w-3.5 opacity-60" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs p-3">
                          <div className="space-y-2">
                            <p className="font-medium text-sm">Calculation methodology</p>
                            <p className="text-xs text-muted-foreground">{completionEstimate.methodology}</p>
                            <div className="text-xs pt-1 border-t border-border/50 space-y-0.5">
                              <p>• {completionEstimate.remainingModules} modules remaining</p>
                              <p>• {completionEstimate.completedCount} modules completed</p>
                              {completionEstimate.weeklyVelocity && (
                                <p>• Recent velocity: {completionEstimate.weeklyVelocity} modules/week</p>
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                {completionEstimate.isComplete && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>All modules completed!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            )}
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
                      <div className={`p-3 rounded-lg ${getDaysIconColorClass(daysSinceStart)}`}>
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${getDaysColorClass(daysSinceStart)}`}>
                          {formatDaysSinceStart(daysSinceStart)}
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
                    {daysSinceStart <= 30 && (
                      <p className="text-xs text-success">On track (0-30 days)</p>
                    )}
                    {daysSinceStart > 30 && daysSinceStart <= 60 && (
                      <p className="text-xs text-warning">Monitor progress (31-60 days)</p>
                    )}
                    {daysSinceStart > 60 && (
                      <p className="text-xs text-destructive">May need acceleration (61+ days)</p>
                    )}
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
                  <p>Tracking started today</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Recommended Path */}
      <div className="mb-8">
        <RecommendedPath />
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
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm">
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
