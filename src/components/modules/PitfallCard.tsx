import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface PitfallCardProps {
  title: string;
  description: string;
  impact: string;
  prevention: string;
}

export function PitfallCard({ title, description, impact, prevention }: PitfallCardProps) {
  return (
    <Alert className="border-warning/50 bg-warning/5">
      <AlertTriangle className="h-5 w-5 text-warning" />
      <AlertTitle className="text-lg font-semibold mb-2">{title}</AlertTitle>
      <AlertDescription className="space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Description:</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Impact:</p>
          <p className="text-sm text-muted-foreground">{impact}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Prevention:</p>
          <p className="text-sm text-muted-foreground">{prevention}</p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
