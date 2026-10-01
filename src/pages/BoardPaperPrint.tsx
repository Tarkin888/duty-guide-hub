import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader2, Printer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import BoardPackDocument from "@/components/board-papers/BoardPackDocument";
import { BoardPack, buildPack, fmtLongDate, loadEvidence, readPack } from "@/lib/boardPaperPack";
import { normaliseContent } from "@/lib/boardPaperContent";

const cssStr = (s: string) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ")}"`;

/** Clean, read-only print layout of an issued version (?version=N) or the current draft. */
const BoardPaperPrint = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  const version = params.get("version");
  const { user } = useAuth();
  const [pack, setPack] = useState<BoardPack | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) return;
    (async () => {
      if (version) {
        const { data, error } = await supabase.from("board_paper_snapshots").select("frozen_content")
          .eq("board_paper_id", id).eq("version", Number(version)).maybeSingle();
        if (error || !data) { setError("This issued version could not be found."); return; }
        setPack(readPack(data.frozen_content));
      } else {
        const { data, error } = await supabase.from("board_papers")
          .select("title,firm_name,reporting_period,committee,author,content").eq("id", id).maybeSingle();
        if (error || !data) { setError("This board paper could not be found."); return; }
        const ev = await loadEvidence(user.id);
        setPack(buildPack({
          title: data.title, firm_name: data.firm_name ?? "", reporting_period: data.reporting_period ?? "",
          committee: data.committee ?? "", author: data.author ?? "",
        }, normaliseContent(data.content), ev));
      }
    })();
  }, [id, user, version]);

  const stateLabel = version ? `Issued — version ${version}` : "Draft (not issued)";
  const header = pack ? [pack.cover.firm_name, pack.cover.reporting_period].filter(Boolean).join(" · ") : "";
  const footer = pack ? [version ? `Version ${version}` : "Draft — no version", version ? "Issued" : "Draft",
    pack.content.paper_date ? `Paper date ${fmtLongDate(pack.content.paper_date)}` : "Paper date not set"].join(" · ") : "";

  useEffect(() => {
    if (pack) document.title = `${pack.cover.title || "Board paper"} — ${stateLabel}`;
  }, [pack, stateLabel]);

  return (
    <div className="bp-print-root min-h-screen bg-background">
      {pack && (
        <style>{`@page { size: A4 portrait; margin: 22mm 16mm 22mm 16mm;
          @top-left { content: ${cssStr(header)}; font-size: 9pt; color: #111827; }
          @bottom-left { content: ${cssStr(footer)}; font-size: 9pt; color: #111827; }
          @bottom-right { content: "Page " counter(page) " of " counter(pages); font-size: 9pt; color: #111827; } }`}</style>
      )}
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 p-4" data-print-hidden>
        <Button asChild variant="outline" className="min-h-[44px]"><Link to={`/board-papers/${id}`}><ArrowLeft className="mr-2 h-4 w-4" aria-hidden />Back to paper</Link></Button>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">Use your browser's print dialogue and choose "Save as PDF".</p>
          <Button onClick={() => window.print()} disabled={!pack} className="min-h-[44px]"><Printer className="mr-2 h-4 w-4" aria-hidden />Print / Save as PDF</Button>
        </div>
      </div>
      {error ? <p role="alert" className="mx-auto max-w-3xl p-4 text-base text-destructive">{error}</p>
        : !pack ? <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" /></div>
        : <div className="px-4 pb-12"><BoardPackDocument pack={pack} stateLabel={stateLabel} /></div>}
    </div>
  );
};

export default BoardPaperPrint;
