import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  FileDown,
  StickyNote,
  Users,
} from "lucide-react";
import { useModuleNotes, ModuleNote } from "@/hooks/useModuleNotes";
import { NoteCard } from "./NoteCard";
import { RichTextEditor } from "./RichTextEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

interface ModuleNotesSectionProps {
  moduleId: string;
  moduleTitle: string;
}

const CATEGORIES = [
  "Implementation",
  "Risk",
  "Action Required",
  "Reference",
  "Decision",
  "Other",
];

export const ModuleNotesSection = ({
  moduleId,
  moduleTitle,
}: ModuleNotesSectionProps) => {
  const {
    notes,
    sharedNotes,
    loading,
    searchQuery,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
    shareNote,
    userId,
  } = useModuleNotes(moduleId);

  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleCreate = async () => {
    if (!newTitle.trim() && !newContent.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    await createNote(newTitle || "Untitled Note", newContent, newCategory || undefined);
    setNewTitle("");
    setNewContent("");
    setNewCategory("");
    setIsCreating(false);
  };

  const handleExportNotes = () => {
    if (notes.length === 0) {
      toast.error("No notes to export");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Notes: ${moduleTitle}`, 14, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Exported on ${new Date().toLocaleDateString()}`, 14, yPos);
    yPos += 15;

    // Notes
    notes.forEach((note, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${note.title || "Untitled Note"}`, 14, yPos);
      yPos += 6;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      const meta = `${new Date(note.updated_at).toLocaleDateString()}${note.category ? ` • ${note.category}` : ""}`;
      doc.text(meta, 14, yPos);
      yPos += 6;

      doc.setTextColor(0);
      // Strip HTML for PDF
      const plainContent = note.content.replace(/<[^>]*>/g, "").trim() || "No content";
      const splitContent = doc.splitTextToSize(plainContent, pageWidth - 28);
      doc.text(splitContent, 14, yPos);
      yPos += splitContent.length * 5 + 10;
    });

    doc.save(`${moduleId}-notes.pdf`);
    toast.success("Notes exported to PDF");
  };

  const totalNotes = notes.length + sharedNotes.length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-8">
      <div className="border rounded-lg">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-4 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <StickyNote className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Your Notes</h3>
                <p className="text-sm text-muted-foreground">
                  {totalNotes === 0
                    ? "Add implementation notes for this module"
                    : `${totalNotes} note${totalNotes !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {totalNotes > 0 && (
                <Badge variant="secondary">{totalNotes}</Badge>
              )}
              {isOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t p-4 space-y-4">
            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportNotes}
                disabled={notes.length === 0}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button size="sm" onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>

            {/* Sharing Info */}
            {userId && (
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                <span className="font-medium">💡 Tip:</span> Share notes with team members using their user ID. 
                Your ID can be found in your account menu.
              </div>
            )}

            {/* New Note Form */}
            {isCreating && (
              <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                <Input
                  placeholder="Note title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="font-semibold"
                />
                <RichTextEditor value={newContent} onChange={setNewContent} />
                <div className="flex items-center gap-3">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex h-9 w-full max-w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  >
                    <option value="">Select category...</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="flex-1" />
                  <Button variant="outline" size="sm" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleCreate}>
                    Save Note
                  </Button>
                </div>
              </div>
            )}

            {/* Notes Tabs */}
            {loading ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading notes...
              </div>
            ) : (
              <Tabs defaultValue="my-notes" className="w-full">
                <TabsList>
                  <TabsTrigger value="my-notes" className="flex items-center gap-2">
                    <StickyNote className="h-4 w-4" />
                    My Notes ({notes.length})
                  </TabsTrigger>
                  <TabsTrigger value="shared" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Shared with Me ({sharedNotes.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="my-notes" className="mt-4">
                  {notes.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <StickyNote className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notes yet. Click "Add Note" to create your first note.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {notes.map((note) => (
                        <NoteCard
                          key={note.id}
                          note={note}
                          onUpdate={updateNote}
                          onDelete={deleteNote}
                          onShare={shareNote}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="shared" className="mt-4">
                  {sharedNotes.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No shared notes. Notes shared with you will appear here.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {sharedNotes.map((note) => (
                        <NoteCard
                          key={note.id}
                          note={note}
                          isShared
                          canEdit={false}
                          onUpdate={updateNote}
                          onDelete={deleteNote}
                          onShare={shareNote}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
