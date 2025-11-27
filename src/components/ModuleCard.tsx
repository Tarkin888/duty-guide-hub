import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: "not-started" | "in-progress" | "completed";
  url: string;
}

export function ModuleCard({ title, description, icon: Icon, status, url }: ModuleCardProps) {
  const statusConfig = {
    "not-started": {
      label: "Not Started",
      icon: Circle,
      className: "bg-muted text-muted-foreground",
    },
    "in-progress": {
      label: "In Progress",
      icon: Clock,
      className: "bg-warning/10 text-warning border-warning/20",
    },
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      className: "bg-success/10 text-success border-success/20",
    },
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <Link to={url} className="block transition-transform hover:scale-[1.02]">
      <Card className="h-full hover:shadow-lg transition-shadow border-border">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <Badge variant="outline" className={currentStatus.className}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {currentStatus.label}
            </Badge>
          </div>
          <CardDescription className="mt-3">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Click to view module details
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
