import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileDown, Printer, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getModuleStatus, updateModuleStatus, addActivity } from "@/lib/storage";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ModulePageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  moduleId: string;
  category: string;
}

export default function ModulePage({ title, description, icon: Icon, moduleId, category }: ModulePageProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"not-started" | "in-progress" | "completed">("not-started");

  useEffect(() => {
    setStatus(getModuleStatus(moduleId));
  }, [moduleId]);

  const handleStatusChange = (newStatus: string) => {
    const validStatus = newStatus as "not-started" | "in-progress" | "completed";
    const oldStatus = status;
    setStatus(validStatus);
    updateModuleStatus(moduleId, validStatus);
    
    // Track activity
    if (validStatus === "completed" && oldStatus !== "completed") {
      addActivity("module_completed", title);
    } else if (validStatus === "in-progress" && oldStatus === "not-started") {
      addActivity("module_started", title);
    } else {
      addActivity("status_updated", title);
    }
    
    toast.success("Module status updated", {
      description: `Status changed to ${newStatus.replace("-", " ")}`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const handleExport = () => {
    toast.success("Export functionality coming soon");
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 -ml-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <Badge variant="outline" className={
            status === "completed" ? "bg-success/10 text-success" :
            status === "in-progress" ? "bg-warning/10 text-warning" :
            "bg-muted text-muted-foreground"
          }>
            {status.replace("-", " ").toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>

          <Button variant="outline" onClick={handleExport}>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Module Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <div className="p-8 rounded-lg bg-muted/50 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Content Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                This module is currently under development. Detailed guidance, templates, and resources will be available here.
              </p>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-sm font-medium">What to expect in this module:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Step-by-step implementation guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Downloadable templates and tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Best practice examples
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Regulatory references and requirements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
