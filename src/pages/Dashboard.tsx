import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/CircularProgress";
import { PhaseProgressCard } from "@/components/PhaseProgressCard";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { RecommendedPath } from "@/components/RecommendedPath";
import { WelcomeModal, resetOnboarding } from "@/components/WelcomeModal";
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
  RotateCcw,
  HelpCircle,
  RefreshCw,
  ClipboardCheck,
  Settings
} from "lucide-react";
import { RegulatoryUpdatesDialog } from "@/components/RegulatoryUpdatesDialog";
import { useRegulatoryUpdates } from "@/hooks/useRegulatoryUpdates";
import { useProgressStore, useModulesMap, TOTAL_MODULES } from "@/stores/progressStore";
import { useProgressCalculation } from "@/lib/progressUtils";
import { useEffect, useState, useMemo } from "react";
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
  if (days < 0) return "Not Started";
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
  const modules = useModulesMap();
  const storeActivities = useProgressStore((state) => state.activities);
  const storeStartDate = useProgressStore((state) => state.startDate);
  const resetAllProgress = useProgressStore((state) => state.resetAllProgress);
  const resetStartDate = useProgressStore((state) => state.resetStartDate);
  const initializeStartDate = useProgressStore((state) => state.initializeStartDate);
  const clearActivities = useProgressStore((state) => state.clearActivities);
  const getFormattedStartDate = useProgressStore((state) => state.getFormattedStartDate);

  // Use centralized progress calculation based on module completion status
  const { overall: calculatedProgress, categories: categoryProgress, inProgressModules: progressInProgressModules } = useProgressCalculation();

  const [lastUpdated, setLastUpdated] = useState("");
  const [resetDateDialogOpen, setResetDateDialogOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [regulatoryUpdatesOpen, setRegulatoryUpdatesOpen] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingCSV, setIsExportingCSV] = useState(false);

  // Hook for regulatory updates
  const { unreadCount: regulatoryUnreadCount, latestUpdateDate, refresh: refreshRegulatoryUpdates } = useRegulatoryUpdates();

  // Initialize start date on first visit
  useEffect(() => {
    initializeStartDate();
  }, [initializeStartDate]);

  // Use centralized progress calculation - based on module completion status
  // Formula: (completed modules / total modules) * 100
  const overallProgress = useMemo(() => {
    return {
      completed: calculatedProgress.completed,
      inProgress: calculatedProgress.inProgress,
      notStarted: calculatedProgress.notStarted,
      total: calculatedProgress.total,
      percentage: calculatedProgress.percentage,
    };
  }, [calculatedProgress]);

  // Get in-progress modules for display
  const inProgressModules = useMemo(() => {
    return progressInProgressModules.map(m => ({
      moduleId: m.moduleId,
      status: m.status as 'in-progress',
    }));
  }, [progressInProgressModules]);

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

  // Category progress - directly from useProgressCalculation hook
  const foundationProgress = categoryProgress.foundation;
  const governanceProgress = categoryProgress.governance;
  const outcomesProgress = categoryProgress.outcomes;
  const crossCuttingProgress = categoryProgress.crossCutting;
  const enablementProgress = categoryProgress.enablement;
  const monitoringProgress = categoryProgress.monitoring;

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
    type: activity.type,
    moduleId: activity.moduleId,
    moduleTitle: `${activity.moduleId}: ${activity.moduleName}`,
    timestamp: activity.timestamp,
  }));

  return (
    <>
      <WelcomeModal 
        forceOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)} 
      />
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 break-words">
              Consumer Duty Compliance Hub
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl">
              Run and evidence Consumer Duty as business-as-usual, and prepare your annual board attestation
            </p>
          </div>
          <Badge variant="outline" className="shrink-0 self-start text-xs sm:text-sm">
            <Calendar className="h-3 w-3 mr-1" />
            {lastUpdated}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
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
              <DropdownMenuItem 
                disabled={isExportingPDF}
                onClick={async () => {
                  setIsExportingPDF(true);
                  try {
                    await new Promise(resolve => setTimeout(resolve, 100)); // Allow UI to update
                    exportProgressToPDF();
                    toast.success('Progress report exported successfully');
                  } catch (error) {
                    console.error('PDF export failed:', error);
                    toast.error('Failed to generate PDF. Please try again.');
                  } finally {
                    setIsExportingPDF(false);
                  }
                }}
              >
                {isExportingPDF ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  'Export as PDF'
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                disabled={isExportingCSV}
                onClick={async () => {
                  setIsExportingCSV(true);
                  try {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    exportProgressToCSV();
                    toast.success('CSV exported successfully');
                  } catch (error) {
                    console.error('CSV export failed:', error);
                    toast.error('Failed to generate CSV. Please try again.');
                  } finally {
                    setIsExportingCSV(false);
                  }
                }}
              >
                {isExportingCSV ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating CSV...
                  </>
                ) : (
                  'Export as CSV'
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="gap-2"
                  onClick={() => {
                    resetOnboarding();
                    setShowWelcomeModal(true);
                  }}
                >
                  <HelpCircle className="h-4 w-4" />
                  Tour
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Replay the welcome tour</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Progress Overview Card */}
        <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Progress Overview
            </CardTitle>
            <CardDescription className="text-sm">Your knowledge base coverage across all phases</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="flex flex-col items-center justify-center gap-2">
                <CircularProgress value={overallProgress.percentage} />
                <p className="text-xs text-muted-foreground text-center">
                  {overallProgress.completed} of {overallProgress.total} modules complete
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
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

          {/* Industry Comparison Card */}
          <Card className="border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-accent" />
                Industry Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You are at <span className="font-semibold text-foreground">{overallProgress.percentage}%</span> completion
              </p>
              
              {/* Benchmark Bars */}
              <div className="space-y-3">
                {/* Your Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-primary">Your Progress</span>
                    <span className="text-muted-foreground">{overallProgress.percentage}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${overallProgress.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Industry Average */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Industry Average</span>
                    <span className="text-muted-foreground">28%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-muted-foreground/40 rounded-full"
                      style={{ width: '28%' }}
                    />
                  </div>
                </div>

                {/* Top Quartile */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Top Quartile</span>
                    <span className="text-muted-foreground">45%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success/60 rounded-full"
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Performance Indicator */}
              <div className="pt-2 border-t">
                {overallProgress.percentage >= 45 ? (
                  <p className="text-xs text-success flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    You're in the top quartile!
                  </p>
                ) : overallProgress.percentage >= 28 ? (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Above industry average
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Keep going to reach industry average
                  </p>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-muted-foreground/70 leading-tight pt-1">
                Benchmarks based on FCA implementation timeline expectations and typical firm readiness.
              </p>
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
                    <p className="font-medium">Started on {getFormattedStartDate()}</p>
                    <p className="text-xs text-muted-foreground">
                      {daysSinceStart === 0 
                        ? 'Started today' 
                        : `${daysSinceStart} day${daysSinceStart === 1 ? '' : 's'} ago`}
                    </p>
                    {daysSinceStart <= 30 && (
                      <p className="text-xs text-success">On track (0-30 days)</p>
                    )}
                    {daysSinceStart > 30 && daysSinceStart <= 90 && (
                      <p className="text-xs text-warning">Monitor progress (31-90 days)</p>
                    )}
                    {daysSinceStart > 90 && (
                      <p className="text-xs text-destructive">Should be nearing completion (90+ days)</p>
                    )}
                    {avgDaysPerModule > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Avg: {avgDaysPerModule} days per module
                      </p>
                    )}
                    {estimatedCompletion && overallProgress.completed < overallProgress.total && (
                      <p className="text-xs text-muted-foreground">
                        Est. completion: {format(estimatedCompletion, "dd/MM/yyyy")}
                      </p>
                    )}
                  </div>
                ) : (
                  <p>Start a module to begin tracking</p>
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
            <ActivityTimeline 
              activities={formattedActivities.slice(0, 5)} 
              moduleRoutes={MODULE_ROUTES}
              showClearButton={formattedActivities.length > 0}
              onClear={clearActivities}
            />
          </CardContent>
        </Card>
      </div>

      {/* Maturity Assessment Card */}
      <Card className="mb-8 border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-accent" />
            Maturity Assessment Tool
          </CardTitle>
          <CardDescription>
            Evaluate your Consumer Duty implementation maturity across the four outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="space-y-2">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  20 questions across four Consumer Duty outcomes
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Visual heatmap and gap analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Track improvement over time (quarterly retakes)
                </li>
              </ul>
            </div>
            <Button asChild size="lg" className="gap-2 shrink-0">
              <Link to="/maturity-assessment">
                <ClipboardCheck className="h-4 w-4" />
                Take Assessment
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

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

        <Card className="relative">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-info" />
              Regulatory Updates
              {regulatoryUnreadCount > 0 && (
                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                  {regulatoryUnreadCount}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p className="mb-4">Stay informed about the latest FCA guidance and regulatory changes.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2"
                onClick={() => setRegulatoryUpdatesOpen(true)}
              >
                View Updates
                {regulatoryUnreadCount > 0 && <RefreshCw className="h-3 w-3" />}
              </Button>
              <p className="text-[10px] text-muted-foreground/70 mt-3">
                Last updated: {latestUpdateDate ? format(latestUpdateDate, "MMMM yyyy") : "Loading..."}
              </p>
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
        <Button asChild variant="outline" className="gap-2">
          <Link to="/settings">
            <Settings className="h-4 w-4" />
            Settings (reset progress)
          </Link>
        </Button>
      </div>

      {/* Reset Start Date Dialog */}
      <AlertDialog open={resetDateDialogOpen} onOpenChange={setResetDateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Start Date?</AlertDialogTitle>
            <AlertDialogDescription>
              {storeStartDate 
                ? `Your current start date is ${getFormattedStartDate()}. This will reset your implementation start date counter but keep all your module progress intact.`
                : 'This will reset your implementation start date counter but keep all your module progress intact.'
              } A new start date will be set when you next update a module.
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

      <RegulatoryUpdatesDialog
        open={regulatoryUpdatesOpen}
        onOpenChange={setRegulatoryUpdatesOpen}
        onUnreadCountChange={() => refreshRegulatoryUpdates()}
      />
    </div>
    </>
  );
}
