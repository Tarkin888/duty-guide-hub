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
import { AlertTriangle, Download, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useProgressStore, useModulesMap } from '@/stores/progressStore';
import { exportProgressToPDF } from '@/utils/exportProgress';
import { TOTAL_MODULES } from '@/config/moduleRegistry';
import { toast } from 'sonner';

interface ResetProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResetProgressModal({ open, onOpenChange }: ResetProgressModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmText, setConfirmText] = useState('');
  const [understood, setUnderstood] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { resetAllProgress, getCompletedModulesCount, activities, startDate } = useProgressStore();
  const modules = useModulesMap();

  const completedCount = getCompletedModulesCount();
  const isConfirmationValid = confirmText.toLowerCase() === 'reset' && understood;

  const [isExporting, setIsExporting] = useState(false);

  const handleExportProgress = async () => {
    setIsExporting(true);
    try {
      // Yield a frame so the loading state paints before PDF generation blocks.
      await new Promise(resolve => setTimeout(resolve, 50));
      exportProgressToPDF();
      toast.success('Progress report downloaded', {
        description: 'Keep this PDF as your record before resetting.',
      });
    } catch (error) {
      toast.error('Could not generate your progress report', {
        description: 'Nothing has been reset. Please try again.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      resetAllProgress();
      toast.success('All progress has been reset', {
        description: 'Your implementation journey has been cleared.',
      });
      handleClose();
    } catch (error) {
      toast.error('Reset failed', {
        description: 'Your progress has not been changed. Please try again.',
      });
    } finally {
      setIsResetting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setConfirmText('');
    setUnderstood(false);
    setIsResetting(false);
    setIsExporting(false);
    onOpenChange(false);
  };

  const itemsToDelete = [
    `Completion status for all ${TOTAL_MODULES} modules (${completedCount} currently complete)`,
    'Every checklist item ticked within those modules',
    'Your implementation start date and days-since-started tracking',
    'Your recent activity history',
  ];

  // Determine input border color based on validation
  const getInputBorderClass = () => {
    if (confirmText === '') return '';
    if (confirmText.toLowerCase() === 'reset') return 'border-green-500 focus-visible:ring-green-500';
    return 'border-red-500 focus-visible:ring-red-500';
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Reset All Progress?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. All your implementation progress will be permanently deleted.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-2">This will permanently delete:</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {itemsToDelete.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleExportProgress}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Preparing your report…
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download your progress first (PDF)
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Recommended: this is the only copy you will have once progress is reset.
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => setStep(2)}
                className="gap-1"
              >
                Continue to Confirmation
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Final Confirmation Required
              </DialogTitle>
              <DialogDescription>
                Please confirm that you want to permanently delete all progress.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-sm font-medium">
                  To confirm deletion, type <span className="font-mono font-bold text-destructive">RESET</span> in the box below:
                </Label>
                <Input
                  id="confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type RESET to confirm"
                  className={`font-mono ${getInputBorderClass()}`}
                  disabled={isResetting}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="understood"
                  checked={understood}
                  onCheckedChange={(checked) => setUnderstood(checked as boolean)}
                  disabled={isResetting}
                />
                <Label htmlFor="understood" className="text-sm leading-tight cursor-pointer">
                  I understand this action is permanent and cannot be undone
                </Label>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                disabled={isResetting}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                variant="destructive"
                disabled={!isConfirmationValid || isResetting}
                onClick={handleReset}
                className="gap-2"
              >
                {isResetting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Everything'
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
