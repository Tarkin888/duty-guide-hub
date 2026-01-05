import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ModuleNote {
  id: string;
  user_id: string;
  module_id: string;
  title: string;
  content: string;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface NoteShare {
  id: string;
  note_id: string;
  shared_with_user_id: string;
  permission: "view" | "edit";
  created_at: string;
}

const getUserId = () => {
  let userId = localStorage.getItem("consumer_duty_user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("consumer_duty_user_id", userId);
  }
  return userId;
};

export const useModuleNotes = (moduleId: string) => {
  const [notes, setNotes] = useState<ModuleNote[]>([]);
  const [sharedNotes, setSharedNotes] = useState<ModuleNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = getUserId();

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch user's own notes
      const { data: ownNotes, error: ownError } = await supabase
        .from("module_notes")
        .select("*")
        .eq("module_id", moduleId)
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (ownError) throw ownError;
      setNotes(ownNotes || []);

      // Fetch notes shared with this user
      const { data: shares, error: sharesError } = await supabase
        .from("note_shares")
        .select("note_id")
        .eq("shared_with_user_id", userId);

      if (sharesError) throw sharesError;

      if (shares && shares.length > 0) {
        const sharedNoteIds = shares.map((s) => s.note_id);
        const { data: sharedData, error: sharedError } = await supabase
          .from("module_notes")
          .select("*")
          .eq("module_id", moduleId)
          .in("id", sharedNoteIds)
          .order("updated_at", { ascending: false });

        if (sharedError) throw sharedError;
        setSharedNotes(sharedData || []);
      } else {
        setSharedNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  }, [moduleId, userId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote = async (title: string, content: string, category?: string) => {
    try {
      const { data, error } = await supabase
        .from("module_notes")
        .insert({
          user_id: userId,
          module_id: moduleId,
          title,
          content,
          category: category || null,
        })
        .select()
        .single();

      if (error) throw error;
      setNotes((prev) => [data, ...prev]);
      toast.success("Note created");
      return data;
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
      return null;
    }
  };

  const updateNote = async (noteId: string, updates: Partial<ModuleNote>) => {
    try {
      const { data, error } = await supabase
        .from("module_notes")
        .update(updates)
        .eq("id", noteId)
        .select()
        .single();

      if (error) throw error;
      setNotes((prev) => prev.map((n) => (n.id === noteId ? data : n)));
      toast.success("Note updated");
      return data;
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
      return null;
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const { error } = await supabase
        .from("module_notes")
        .delete()
        .eq("id", noteId);

      if (error) throw error;
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const shareNote = async (noteId: string, shareWithUserId: string, permission: "view" | "edit" = "view") => {
    try {
      const { error } = await supabase
        .from("note_shares")
        .insert({
          note_id: noteId,
          shared_with_user_id: shareWithUserId,
          permission,
        });

      if (error) throw error;
      toast.success("Note shared successfully");
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("Note already shared with this user");
      } else {
        console.error("Error sharing note:", error);
        toast.error("Failed to share note");
      }
    }
  };

  const removeShare = async (noteId: string, shareWithUserId: string) => {
    try {
      const { error } = await supabase
        .from("note_shares")
        .delete()
        .eq("note_id", noteId)
        .eq("shared_with_user_id", shareWithUserId);

      if (error) throw error;
      toast.success("Share removed");
    } catch (error) {
      console.error("Error removing share:", error);
      toast.error("Failed to remove share");
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.category && note.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredSharedNotes = sharedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.category && note.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return {
    notes: filteredNotes,
    sharedNotes: filteredSharedNotes,
    loading,
    searchQuery,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
    shareNote,
    removeShare,
    userId,
    refetch: fetchNotes,
  };
};

// Hook for searching all notes across modules
export const useAllNotes = () => {
  const [notes, setNotes] = useState<ModuleNote[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = getUserId();

  const fetchAllNotes = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("module_notes")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error("Error fetching all notes:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  return { notes, loading, refetch: fetchAllNotes };
};
