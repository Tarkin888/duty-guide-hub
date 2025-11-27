import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ModuleCard } from "@/components/ModuleCard";
import { ClipboardCheck, Map, AlertTriangle, Shield, FileText, Target, ListChecks, DollarSign, MessageSquare, HeadphonesIcon } from "lucide-react";
import { getModuleStatus, calculateOverallProgress } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    setOverallProgress(calculateOverallProgress());
  }, []);

  const featuredModules = [
    {
      title: "Readiness Assessment",
      description: "Evaluate your organization's current state and readiness for Consumer Duty implementation",
      icon: ClipboardCheck,
      status: getModuleStatus("readiness-assessment"),
      url: "/foundation/readiness",
    },
    {
      title: "Governance Framework",
      description: "Establish governance structures and accountability mechanisms",
      icon: Shield,
      status: getModuleStatus("governance-framework"),
      url: "/governance/framework",
    },
    {
      title: "Products & Services",
      description: "Ensure products and services meet customer needs and deliver fair value",
      icon: ListChecks,
      status: getModuleStatus("products-services"),
      url: "/outcomes/products-services",
    },
    {
      title: "Consumer Support",
      description: "Provide effective support throughout the customer journey",
      icon: HeadphonesIcon,
      status: getModuleStatus("consumer-support"),
      url: "/outcomes/consumer-support",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Consumer Duty Implementation Playbook</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive guide to implementing Consumer Duty requirements across your organization
        </p>
      </div>

      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Overall Progress
          </CardTitle>
          <CardDescription>Track your implementation journey across all modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Implementation Completion</span>
              <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Continue working through the modules to improve your compliance readiness
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
        <p className="text-muted-foreground">
          Begin with these essential modules to build a strong foundation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {featuredModules.map((module) => (
          <ModuleCard key={module.url} {...module} />
        ))}
      </div>

      <Card className="border-accent/30">
        <CardHeader>
          <CardTitle>About This Playbook</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This implementation playbook provides a structured approach to achieving Consumer Duty compliance.
            Each module contains detailed guidance, templates, and best practices to help your organization
            meet regulatory requirements while improving customer outcomes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold text-primary mb-1">7</div>
              <div className="text-sm text-muted-foreground">Module Categories</div>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold text-primary mb-1">20+</div>
              <div className="text-sm text-muted-foreground">Implementation Modules</div>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold text-primary mb-1">100+</div>
              <div className="text-sm text-muted-foreground">Resources & Templates</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
