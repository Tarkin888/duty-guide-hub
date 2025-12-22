import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Download } from 'lucide-react';
import { useProgressStore } from '@/stores/progressStore';
import { toast } from 'sonner';

interface ResetProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResetProgressModal({ open, onOpenChange }: ResetProgressModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [understood, setUnderstood] = useState(false);
  const { resetAllProgress, getCompletedModulesCount, modules, activities, startDate } = useProgressStore();

  const completedCount = getCompletedModulesCount();
  const canReset = confirmText === 'RESET' && understood;

  const handleExportProgress = () => {
    const progressData = {
      exportDate: new Date().toISOString(),
      version: 1,
      modules,
      activities,
      startDate,
      completedModulesCount: completedCount,
    };

    const blob = new Blob([JSON.stringify(progressData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `consumer-duty-progress-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Progress exported successfully!', {
      description: 'Your backup has been downloaded.',
    });
  };

  const handleReset = () => {
    resetAllProgress();
    setConfirmText('');
    setUnderstood(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    setConfirmText('');
    setUnderstood(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Reset All Progress
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please read carefully before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-2">This will permanently delete:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Completion status for all {completedCount} completed modules</li>
                <li>All checklist item progress</li>
                <li>Your start date and timeline tracking</li>
                <li>All module access history</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleExportProgress}
            >
              <Download className="h-4 w-4" />
              Download Progress Backup First
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Recommended: Export your progress before resetting
            </p>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="understood"
                checked={understood}
                onCheckedChange={(checked) => setUnderstood(checked as boolean)}
              />
              <Label htmlFor="understood" className="text-sm leading-tight cursor-pointer">
                I understand this action is permanent and cannot be undone
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm font-medium">
                Type <span className="font-mono font-bold">RESET</span> to confirm
              </Label>
              <Input
                id="confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type RESET here"
                className="font-mono"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={!canReset}
            onClick={handleReset}
          >
            Reset Everything
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
