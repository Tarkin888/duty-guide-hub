import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface BoardPaperRow {
  id: string;
  title: string;
  firm_name: string | null;
  reporting_period: string | null;
  status: string;
  updated_at: string;
}

const CONTENT_GOLD = "#d4af37";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const StatusBadge = ({ status }: { status: string }) =>
  status === "issued" ? (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
      style={{ backgroundColor: CONTENT_GOLD, color: "#1e3a8a" }}
    >
      Issued
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground">
      Draft
    </span>
  );

const BoardPapers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [papers, setPapers] = useState<BoardPaperRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [firmName, setFirmName] = useState("");
  const [period, setPeriod] = useState("");

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setLoadError(null);
    const { data, error } = await supabase
      .from("board_papers")
      .select("id,title,firm_name,reporting_period,status,updated_at")
      .order("updated_at", { ascending: false });
    if (error) setLoadError("Board papers could not be loaded. Please try again.");
    else setPapers(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim()) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("board_papers")
      .insert({
        user_id: user.id,
        title: title.trim(),
        firm_name: firmName.trim() || null,
        reporting_period: period.trim() || null,
      })
      .select("id")
      .single();
    setSaving(false);
    if (error || !data) {
      toast.error("The board paper could not be created");
      return;
    }
    setOpen(false);
    navigate(`/board-papers/${data.id}`);
  };

  const newButton = (
    <Button onClick={() => setOpen(true)} className="min-h-[44px]">
      <Plus className="mr-2 h-4 w-4" aria-hidden /> New board paper
    </Button>
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Board Papers</h1>
          <p className="text-base text-muted-foreground">
            Assemble Consumer Duty board packs for your governing committee.
          </p>
        </div>
        {papers.length > 0 && newButton}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" /></div>
      ) : loadError ? (
        <Card><CardContent className="py-8 text-base text-destructive" role="alert">{loadError}</CardContent></Card>
      ) : papers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <FileText className="h-10 w-10 text-muted-foreground" aria-hidden />
            <p className="text-base text-muted-foreground">
              You have no board papers yet. Create one to start assembling a board pack.
            </p>
            {newButton}
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {papers.map((p) => (
            <li key={p.id}>
              <Link
                to={`/board-papers/${p.id}`}
                className="block rounded-lg border bg-card p-4 transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-lg font-semibold text-foreground">{p.title}</p>
                    <p className="text-base text-muted-foreground">
                      {[p.firm_name, p.reporting_period].filter(Boolean).join(" · ") || "No firm or period set"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={p.status} />
                    <span className="text-sm text-muted-foreground">Updated {formatDate(p.updated_at)}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={create}>
            <DialogHeader>
              <DialogTitle>New board paper</DialogTitle>
              <DialogDescription>Start a draft. You can add the content later.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bp-title">Title</Label>
                <Input id="bp-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bp-firm">Firm name</Label>
                <Input id="bp-firm" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bp-period">Reporting period</Label>
                <Input id="bp-period" placeholder="e.g. H1 2026 (Jan-Jun)" value={period} onChange={(e) => setPeriod(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving || !title.trim()}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}Create draft
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoardPapers;
