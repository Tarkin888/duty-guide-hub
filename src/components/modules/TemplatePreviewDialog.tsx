import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, FileSpreadsheet, FileText, Presentation, CheckCircle2, BookOpen, Clock, Layers } from "lucide-react";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";

export interface TemplateDetails {
  id: string;
  name: string;
  description: string;
  whatsIncluded: string[];
  howToUse: string;
  fileType: "Excel" | "Word" | "PowerPoint" | "PDF";
  size: string;
  complexity: "Quick Start" | "Intermediate" | "Advanced";
  module: string;
  fileName: string;
}

interface TemplatePreviewDialogProps {
  template: TemplateDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatIcons: Record<string, LucideIcon> = {
  Excel: FileSpreadsheet,
  Word: FileText,
  PowerPoint: Presentation,
  PDF: FileText,
};

const formatColors: Record<string, string> = {
  Excel: "bg-success/10 text-success border-success/30",
  Word: "bg-info/10 text-info border-info/30",
  PowerPoint: "bg-warning/10 text-warning border-warning/30",
  PDF: "bg-destructive/10 text-destructive border-destructive/30",
};

const complexityColors: Record<string, string> = {
  "Quick Start": "bg-success/10 text-success",
  "Intermediate": "bg-warning/10 text-warning",
  "Advanced": "bg-destructive/10 text-destructive",
};

export function TemplatePreviewDialog({ template, open, onOpenChange }: TemplatePreviewDialogProps) {
  if (!template) return null;

  const Icon = formatIcons[template.fileType] || FileText;

  const handleDownload = () => {
    toast.success("Downloading Template", {
      description: `${template.name} will download shortly...`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg border ${formatColors[template.fileType]}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{template.name}</DialogTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className={formatColors[template.fileType]}>
                  {template.fileType}
                </Badge>
                <Badge variant="secondary" className={complexityColors[template.complexity]}>
                  {template.complexity}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {template.size}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {template.module}
                </Badge>
              </div>
            </div>
          </div>
          <DialogDescription className="text-base mt-4 leading-relaxed">
            {template.description}
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-4" />

        <div className="space-y-6">
          {/* What's Included */}
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-primary" />
              What's Included
            </h4>
            <ul className="space-y-2">
              {template.whatsIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Use */}
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              How to Use
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg border">
              {template.howToUse}
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download {template.fileType}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
