import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ArrowLeft, Download, Loader2, Settings as SettingsIcon } from "lucide-react";
import { ResetProgressModal } from "@/components/ResetProgressModal";
import { exportProgressToPDF } from "@/utils/exportProgress";
import { useOverallProgress } from "@/stores/progressStore";
import { TOTAL_MODULES } from "@/config/moduleRegistry";
import { toast } from "sonner";

export default function Settings() {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const overall = useOverallProgress();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 50));
      exportProgressToPDF();
      toast.success("Progress report downloaded");
    } catch (error) {
      toast.error("Could not generate your progress report", {
        description: "Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-4 gap-2">
        <Link to="/">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </Button>

      <div className="flex items-center gap-3 mb-2">
        <SettingsIcon className="h-6 w-6 text-primary" aria-hidden="true" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Manage your saved implementation progress for this playbook.
      </p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Your progress</CardTitle>
          <CardDescription>
            {overall.completed} of {TOTAL_MODULES} modules complete ({overall.percentage}%).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="gap-2" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Preparing your report…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download progress report (PDF)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            Reset all progress
          </CardTitle>
          <CardDescription>
            Clears everything you have recorded in the playbook and starts you again from zero.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>
              <p className="font-medium mb-2">Resetting is permanent and will clear:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Completion status for all {TOTAL_MODULES} modules</li>
                <li>Every checklist item you have ticked</li>
                <li>Your implementation start date and days-since-started tracking</li>
                <li>Your recent activity history</li>
              </ul>
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground">
            You will be asked to confirm twice, and to type RESET, before anything is deleted.
            Download your progress report first if you want a record.
          </p>
          <Button
            variant="outline"
            className="text-destructive border-destructive hover:bg-destructive/10 gap-2"
            onClick={() => setResetModalOpen(true)}
          >
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Reset all progress
          </Button>
        </CardContent>
      </Card>

      <ResetProgressModal open={resetModalOpen} onOpenChange={setResetModalOpen} />
    </div>
  );
}
