import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Activity {
  id: string;
  type: "module_completed" | "module_started" | "status_updated";
  moduleTitle: string;
  timestamp: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
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
    switch (activity.type) {
      case "module_completed":
        return `Completed ${activity.moduleTitle}`;
      case "module_started":
        return `Started ${activity.moduleTitle}`;
      case "status_updated":
        return `Updated ${activity.moduleTitle}`;
      default:
        return activity.moduleTitle;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "module_completed":
        return "bg-success";
      case "module_started":
        return "bg-info";
      case "status_updated":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`} />
            {index < activities.length - 1 && (
              <div className="w-px h-full bg-border mt-1" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm font-medium">{getActivityText(activity)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
