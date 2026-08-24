import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, StickyNote } from "lucide-react";
import { useModuleNotes, ModuleNote } from "@/hooks/useModuleNotes";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface NotesTabProps {
  moduleId: string;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const authorLabel = (email?: string | null) => {
  if (!email) return "You";
  const local = email.split("@")[0];
  const first = local.split(/[._-]/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
};

export const NotesTab = ({ moduleId }: NotesTabProps) => {
  const { user } = useAuth();
  const { notes, loading, createNote, updateNote, deleteNote, userId } =
    useModuleNotes(moduleId);

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState<ModuleNote | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ModuleNote | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!draft.trim()) {
      toast.error("Please enter some note content");
      return;
    }
    setSaving(true);
    await createNote("", draft.trim());
    setSaving(false);
    setDraft("");
    setIsAdding(false);
  };

  const handleEdit = async () => {
    if (!editing) return;
    if (!editDraft.trim()) {
      toast.error("Please enter some note content");
      return;
    }
    setSaving(true);
    await updateNote(editing.id, { content: editDraft.trim() });
    setSaving(false);
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    await deleteNote(pendingDelete.id);
    setPendingDelete(null);
  };

  if (!userId) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        Sign in to add notes to this module.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold">Your Notes</h3>
          <p className="text-sm text-muted-foreground">
            Private to your account. Only you can see these notes.
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>

      {loading ? (
        <p className="py-8 text-center text-muted-foreground">Loading notes…</p>
      ) : notes.length === 0 ? (
        <Card className="py-10 text-center text-muted-foreground">
          <StickyNote className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No notes yet. Select “Add Note” to record your first note.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => {
            const isOwn = note.user_id === userId;
            const edited = note.updated_at !== note.created_at;
            return (
              <li key={note.id}>
                <div className="rounded bg-muted/50 p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {authorLabel(user?.email)}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span>{formatDate(note.created_at)}</span>
                      {note.category && (
                        <Badge variant="secondary">{note.category}</Badge>
                      )}
                    </div>
                    {isOwn && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditing(note);
                            setEditDraft(note.content);
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPendingDelete(note)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                  {note.title && (
                    <p className="font-semibold mb-1">{note.title}</p>
                  )}
                  <p className="whitespace-pre-wrap text-base leading-relaxed">
                    {note.content.replace(/<[^>]*>/g, "")}
                  </p>
                  {edited && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Edited on {formatDate(note.updated_at)}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Add note */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add note</DialogTitle>
            <DialogDescription>
              Record an observation, gap or action for this module.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={6}
            placeholder="Type your note…"
            aria-label="Note content"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit note */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit note</DialogTitle>
            <DialogDescription>
              The original date and author stay unchanged.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={editDraft}
            onChange={(e) => setEditDraft(e.target.value)}
            rows={6}
            aria-label="Note content"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this note?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete this note? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NotesTab;
