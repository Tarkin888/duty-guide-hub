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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Share2, Eye, Edit2 } from "lucide-react";

interface NoteShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noteId: string;
  onShare: (noteId: string, userId: string, permission: "view" | "edit") => Promise<void>;
}

export const NoteShareDialog = ({
  open,
  onOpenChange,
  noteId,
  onShare,
}: NoteShareDialogProps) => {
  const [userId, setUserId] = useState("");
  const [permission, setPermission] = useState<"view" | "edit">("view");
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!userId.trim()) return;
    setIsSharing(true);
    try {
      await onShare(noteId, userId.trim(), permission);
      setUserId("");
      setPermission("view");
      onOpenChange(false);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Note
          </DialogTitle>
          <DialogDescription>
            Share this note with a team member by entering their user ID. They'll be able to see
            this note in their shared notes section.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="userId">Recipient's User ID</Label>
            <Input
              id="userId"
              placeholder="Enter the recipient's user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Ask your team member for their authenticated user ID from their account settings
            </p>
          </div>

          <div className="space-y-2">
            <Label>Permission Level</Label>
            <RadioGroup
              value={permission}
              onValueChange={(v) => setPermission(v as "view" | "edit")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="view" id="view" />
                <Label htmlFor="view" className="flex items-center gap-1 cursor-pointer">
                  <Eye className="h-4 w-4" />
                  View only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="edit" id="edit" />
                <Label htmlFor="edit" className="flex items-center gap-1 cursor-pointer">
                  <Edit2 className="h-4 w-4" />
                  Can edit
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleShare} disabled={!userId.trim() || isSharing}>
            {isSharing ? "Sharing..." : "Share Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
