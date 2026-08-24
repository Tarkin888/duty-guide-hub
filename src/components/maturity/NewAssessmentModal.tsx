import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MATURITY_CATEGORIES,
  MaturitySnapshotInput,
} from "@/hooks/useMaturitySnapshots";

interface NewAssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (input: MaturitySnapshotInput) => Promise<unknown>;
}

const SCORES = [1, 2, 3, 4, 5];
const MAX_COMMENT = 200;

const defaultScores = () =>
  Object.fromEntries(MATURITY_CATEGORIES.map((c) => [c.key, "3"])) as Record<
    number,
    string
  >;

const defaultComments = () =>
  Object.fromEntries(MATURITY_CATEGORIES.map((c) => [c.key, ""])) as Record<
    number,
    string
  >;

export const NewAssessmentModal = ({
  open,
  onOpenChange,
  onSave,
}: NewAssessmentModalProps) => {
  const [scores, setScores] = useState(defaultScores);
  const [comments, setComments] = useState(defaultComments);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const input = {} as MaturitySnapshotInput;
    MATURITY_CATEGORIES.forEach(({ key }) => {
      (input as Record<string, unknown>)[`score_${key}`] = Number(scores[key]);
      (input as Record<string, unknown>)[`comments_${key}`] =
        comments[key].trim() || null;
    });
    const result = await onSave(input);
    setSaving(false);
    if (result) {
      setScores(defaultScores());
      setComments(defaultComments());
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New assessment</DialogTitle>
          <DialogDescription>
            Score each category from 1 (initial) to 5 (optimised). Comments are
            optional, up to {MAX_COMMENT} characters.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {MATURITY_CATEGORIES.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={`score-${key}`} className="text-base">
                {label}
              </Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Select
                  value={scores[key]}
                  onValueChange={(value) =>
                    setScores((prev) => ({ ...prev, [key]: value }))
                  }
                >
                  <SelectTrigger id={`score-${key}`} className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCORES.map((score) => (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={comments[key]}
                  maxLength={MAX_COMMENT}
                  placeholder="Comment (optional)"
                  aria-label={`${label} comment`}
                  onChange={(e) =>
                    setComments((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAssessmentModal;
