import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit2, Trash2, Share2, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { ModuleNote } from "@/hooks/useModuleNotes";
import { RichTextEditor } from "./RichTextEditor";
import { NoteShareDialog } from "./NoteShareDialog";

// Configure DOMPurify with allowed tags for rendering notes
const sanitizeConfig = {
  ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'p', 'br', 'strong', 'em', 'span', 'div'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
  ALLOW_DATA_ATTR: false,
};

interface NoteCardProps {
  note: ModuleNote;
  isShared?: boolean;
  canEdit?: boolean;
  onUpdate: (noteId: string, updates: Partial<ModuleNote>) => Promise<any>;
  onDelete: (noteId: string) => Promise<void>;
  onShare: (noteId: string, userId: string, permission: "view" | "edit") => Promise<void>;
}

const CATEGORIES = [
  "Implementation",
  "Risk",
  "Action Required",
  "Reference",
  "Decision",
  "Other",
];

export const NoteCard = ({
  note,
  isShared = false,
  canEdit = true,
  onUpdate,
  onDelete,
  onShare,
}: NoteCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editCategory, setEditCategory] = useState(note.category || "");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleSave = async () => {
    await onUpdate(note.id, {
      title: editTitle,
      content: editContent,
      category: editCategory || null,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditCategory(note.category || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="border-primary">
        <CardContent className="pt-4 space-y-4">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Note title"
            className="font-semibold"
          />
          <RichTextEditor value={editContent} onChange={setEditContent} />
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="flex h-9 w-full max-w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="group hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-lg truncate">
                {note.title || "Untitled Note"}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(note.updated_at), "MMM d, yyyy 'at' h:mm a")}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {isShared && (
                <Badge variant="secondary" className="text-xs">
                  Shared
                </Badge>
              )}
              {note.category && (
                <Badge variant="outline" className="text-xs">
                  {note.category}
                </Badge>
              )}
              {canEdit && !isShared && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShareDialogOpen(true)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(note.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-sm max-w-none text-muted-foreground line-clamp-4"
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(note.content || "<em>No content</em>", sanitizeConfig) 
            }}
          />
        </CardContent>
      </Card>

      <NoteShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        noteId={note.id}
        onShare={onShare}
      />
    </>
  );
};
