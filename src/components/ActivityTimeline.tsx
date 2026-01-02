import { Clock, CheckCircle2, Play, CheckSquare, Eye, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export interface Activity {
  id: string;
  type: "module_completed" | "module_started" | "checklist_updated" | "module_visit" | "progress_milestone";
  moduleId?: string;
  moduleTitle?: string;
  timestamp: string;
  description?: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
  moduleRoutes?: Record<string, string>;
  showClearButton?: boolean;
  onClear?: () => void;
}

// Format relative time
function formatRelativeTime(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export function ActivityTimeline({ 
  activities, 
  moduleRoutes = {},
  showClearButton = false,
  onClear 
}: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No recent activity yet</p>
        <p className="text-sm mt-1">Start working on modules to see your progress here</p>
      </div>
    );
  }

  const getActivityText = (activity: Activity) => {
    if (activity.description) return activity.description;
    
    switch (activity.type) {
      case "module_completed":
        return `Completed ${activity.moduleTitle || "module"}`;
      case "module_started":
        return `Started ${activity.moduleTitle || "module"}`;
      case "checklist_updated":
        return `Completed step in ${activity.moduleTitle || "module"}`;
      case "module_visit":
        return `Viewed ${activity.moduleTitle || "module"}`;
      case "progress_milestone":
        return activity.description || "Reached milestone";
      default:
        return activity.moduleTitle || "Activity";
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "module_completed":
        return "bg-success/20";
      case "module_started":
        return "bg-info/20";
      case "checklist_updated":
        return "bg-primary/20";
      case "module_visit":
        return "bg-muted";
      case "progress_milestone":
        return "bg-warning/20";
      default:
        return "bg-muted";
    }
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "module_completed":
        return <CheckCircle2 className="h-3.5 w-3.5 text-success" />;
      case "module_started":
        return <Play className="h-3.5 w-3.5 text-info" />;
      case "checklist_updated":
        return <CheckSquare className="h-3.5 w-3.5 text-primary" />;
      case "module_visit":
        return <Eye className="h-3.5 w-3.5 text-muted-foreground" />;
      case "progress_milestone":
        return <Trophy className="h-3.5 w-3.5 text-warning" />;
      default:
        return <Clock className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => {
        const moduleRoute = activity.moduleId ? moduleRoutes[activity.moduleId] : null;
        
        return (
          <div key={activity.id} className="flex gap-3 group">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center transition-transform group-hover:scale-110`}>
                {getActivityIcon(activity.type)}
              </div>
              {index < activities.length - 1 && (
                <div className="w-px h-full bg-border mt-1" />
              )}
            </div>
            <div className="flex-1 pb-3">
              <p className="text-sm font-medium leading-snug">{getActivityText(activity)}</p>
              {moduleRoute && activity.moduleId && (
                <Link 
                  to={moduleRoute} 
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  Go to module →
                </Link>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {formatRelativeTime(activity.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
      
      {showClearButton && onClear && (
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center pt-2 border-t"
        >
          Clear activity history
        </button>
      )}
    </div>
  );
}
