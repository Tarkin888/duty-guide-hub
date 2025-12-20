import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/CircularProgress";
import { PhaseProgressCard } from "@/components/PhaseProgressCard";
import { ActivityTimeline } from "@/components/ActivityTimeline";
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
  BookMarked
} from "lucide-react";
import { getActivities } from "@/lib/storage";
import { useProgress } from "@/contexts/ProgressContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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

export default function Dashboard() {
  const { 
    overallProgress, 
    categoryProgress, 
    resetAllProgress,
    inProgressModules,
    daysSinceStart,
    isValidState,
    validationErrors,
    refreshProgress
  } = useProgress();

  const [activities, setActivities] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setActivities(getActivities());
    setLastUpdated(format(new Date(), "PPP"));
    // Refresh progress on mount to ensure we have latest data
    refreshProgress();
  }, [refreshProgress]);

  const handleReset = () => {
    resetAllProgress();
    toast.success("All progress has been reset");
    window.location.reload();
  };

  const totalTemplates = 40;

  const estimatedDaysRemaining = overallProgress.percentageComplete > 0 && daysSinceStart > 0
    ? Math.ceil((daysSinceStart / overallProgress.percentageComplete) * (100 - overallProgress.percentageComplete))
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

  // Show validation errors if state is invalid
  if (!isValidState && validationErrors.length > 0) {
    return (
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Progress State Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The progress tracking system has detected inconsistencies:</p>
            <ul className="list-disc pl-6 mb-4">
              {validationErrors.map((error, i) => (
                <li key={i} className="text-destructive">{error}</li>
              ))}
            </ul>
            <Button onClick={handleReset} variant="destructive">
              Reset Progress to Fix
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2">
                <Download className="h-4 w-4" />
                Export Progress Report
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Export Coming Soon</AlertDialogTitle>
                <AlertDialogDescription>
                  PDF export functionality will be available in the next update.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Got it</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                <CircularProgress value={overallProgress.percentageComplete} />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <PhaseProgressCard 
                    title="Foundation" 
                    completed={categoryProgress.foundation?.completedModules || 0}
                    total={categoryProgress.foundation?.totalModules || 3}
                    icon={BookOpen}
                  />
                  <PhaseProgressCard 
                    title="Governance & Planning" 
                    completed={categoryProgress.governance?.completedModules || 0}
                    total={categoryProgress.governance?.totalModules || 3}
                    icon={Shield}
                  />
                  <PhaseProgressCard 
                    title="Four Outcomes" 
                    completed={categoryProgress.outcomes?.completedModules || 0}
                    total={categoryProgress.outcomes?.totalModules || 4}
                    icon={ListChecks}
                  />
                  <PhaseProgressCard 
                    title="Cross-Cutting" 
                    completed={categoryProgress.crosscutting?.completedModules || 0}
                    total={categoryProgress.crosscutting?.totalModules || 3}
                    icon={Users}
                  />
                  <PhaseProgressCard 
                    title="Enablement" 
                    completed={categoryProgress.enablement?.completedModules || 0}
                    total={categoryProgress.enablement?.totalModules || 3}
                    icon={GraduationCap}
                  />
                  <PhaseProgressCard 
                    title="Monitoring & Assurance" 
                    completed={categoryProgress.monitoring?.completedModules || 0}
                    total={categoryProgress.monitoring?.totalModules || 4}
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
                  <p className="text-2xl font-bold">{overallProgress.totalModules}</p>
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
                  <p className="text-2xl font-bold">{overallProgress.completedModules}</p>
                  <p className="text-sm text-muted-foreground">Completed Modules</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalTemplates}+</p>
                  <p className="text-sm text-muted-foreground">Templates Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-info/10">
                  <Calendar className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{daysSinceStart}</p>
                  <p className="text-sm text-muted-foreground">Days Since Started</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
            <ActivityTimeline activities={activities.slice(0, 5)} />
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

      {/* Reset Progress Button */}
      <div className="mt-8 pt-8 border-t">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
              Reset All Progress
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all your progress data and activity history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Yes, reset everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}