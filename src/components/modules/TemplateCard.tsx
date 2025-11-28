import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText, FileSpreadsheet, Presentation } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface TemplateCardProps {
  title: string;
  description: string;
  format: "Excel" | "Word" | "PowerPoint" | "PDF";
  onDownload?: () => void;
  onPreview?: () => void;
}

const formatIcons: Record<string, LucideIcon> = {
  Excel: FileSpreadsheet,
  Word: FileText,
  PowerPoint: Presentation,
  PDF: FileText,
};

const formatColors: Record<string, string> = {
  Excel: "bg-success/10 text-success",
  Word: "bg-info/10 text-info",
  PowerPoint: "bg-warning/10 text-warning",
  PDF: "bg-destructive/10 text-destructive",
};

export function TemplateCard({ title, description, format, onDownload, onPreview }: TemplateCardProps) {
  const Icon = formatIcons[format] || FileText;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge className={`mt-1 ${formatColors[format]}`} variant="secondary">
                {format}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="mt-3">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button onClick={onDownload} className="flex-1" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          {onPreview && (
            <Button onClick={onPreview} variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
