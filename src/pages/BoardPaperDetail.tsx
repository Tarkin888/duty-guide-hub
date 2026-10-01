import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Eye, Pencil, Plus, Trash2, CheckCircle2, AlertCircle, History, Printer, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { BOARD_SCORECARD_ROWS, RATING_BY_VALUE, BoardRating } from "@/config/boardSummaryConfig";
import { MODULE_REGISTRY } from "@/config/moduleRegistry";
import { regulatoryUpdates } from "@/data/regulatoryUpdatesData";
import {
  BoardPaperContent, MiRow, RiskRow, RiskRag, emptyContent, normaliseContent, newId,
} from "@/lib/boardPaperContent";
import { buildPack, readPack } from "@/lib/boardPaperPack";
import BoardPackDocument from "@/components/board-papers/BoardPackDocument";

const CONTENT_GOLD = "#d4af37";
const SAVE_DELAY_MS = 1200;

interface Cover { title: string; firm_name: string; reporting_period: string; committee: string; author: string }
interface RatingRow { row_key: string; rating: BoardRating; is_demo: boolean }
interface SnapshotRow { id: string; version: number; issued_by: string | null; issued_at: string; frozen_content: unknown }

const SECTIONS = [
  { id: "cover", label: "Cover" },
  { id: "executive-summary", label: "Executive summary" },
  { id: "scorecard", label: "Outcomes scorecard" },
  { id: "four-outcomes", label: "Four outcomes commentary" },
  { id: "cross-cutting", label: "Cross-cutting rule" },
  { id: "vulnerable", label: "Vulnerable customers" },
  { id: "distribution", label: "Distribution chain" },
  { id: "mi", label: "Management information & KPIs" },
  { id: "programme", label: "Programme status (factual)" },
  { id: "regulatory", label: "Regulatory developments" },
  { id: "risks", label: "Key risks & actions" },
  { id: "attestation", label: "Attestation & sign-off" },
];

const OUTCOME_FIELDS: { key: keyof BoardPaperContent["outcomes"]; label: string }[] = [
  { key: "products_services", label: "Products & Services" },
  { key: "price_value", label: "Price & Value" },
  { key: "consumer_understanding", label: "Consumer Understanding" },
  { key: "consumer_support", label: "Consumer Support" },
];

const RAG_META: Record<Exclude<RiskRag, "">, { label: string; cls: string }> = {
  red: { label: "Red", cls: "bg-red-100 text-red-900 border-red-400" },
  amber: { label: "Amber", cls: "bg-orange-100 text-orange-950 border-orange-400" },
  green: { label: "Green", cls: "bg-green-100 text-green-900 border-green-400" },
};

const fmtDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

const RatingBadge = ({ rating }: { rating: BoardRating }) => {
  const m = RATING_BY_VALUE[rating];
  return <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${m.badgeClass}`}>{m.label}</span>;
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <Card id={id} className="scroll-mt-6">
    <CardHeader className="border-b" style={{ borderBottomColor: CONTENT_GOLD }}>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 pt-6">{children}</CardContent>
  </Card>
);

const Narrative = ({ id, label, value, onChange, placeholder, rows = 5 }: {
  id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-base">{label}</Label>
    <Textarea id={id} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="text-base" />
  </div>
);

const BoardPaperDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");
  const [cover, setCover] = useState<Cover>({ title: "", firm_name: "", reporting_period: "", committee: "", author: "" });
  const [content, setContent] = useState<BoardPaperContent>(emptyContent());
  const [saveState, setSaveState] = useState<"idle" | "pending" | "saving" | "saved" | "error">("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [preview, setPreview] = useState(false);

  // Read-only evidence
  const [ratings, setRatings] = useState<RatingRow[] | null>(null);
  const [ratingsError, setRatingsError] = useState(false);
  const [checked, setChecked] = useState<Set<string> | null>(null);
  const [progressError, setProgressError] = useState(false);

  // Issue + versions
  const [status, setStatus] = useState<"draft" | "issued">("draft");
  const statusRef = useRef<"draft" | "issued">("draft");
  const [versions, setVersions] = useState<SnapshotRow[] | null>(null);
  const [viewing, setViewing] = useState<SnapshotRow | null>(null);
  const [confirmIssue, setConfirmIssue] = useState(false);
  const [issuing, setIssuing] = useState(false);

  const dirty = useRef(false);
  const timer = useRef<number | null>(null);
  const latest = useRef({ cover, content });
  latest.current = { cover, content };

  const loadVersions = useCallback(async () => {
    if (!id) return;
    const { data } = await supabase.from("board_paper_snapshots")
      .select("id,version,issued_by,issued_at,frozen_content").eq("board_paper_id", id).order("version", { ascending: false });
    setVersions((data ?? []) as SnapshotRow[]);
  }, [id]);

  useEffect(() => { void loadVersions(); }, [loadVersions]);

  useEffect(() => {
    if (!id || !user) return;
    supabase.from("board_papers").select("title,firm_name,reporting_period,committee,author,content,updated_at,status")
      .eq("id", id).maybeSingle().then(({ data }) => {
        if (!data) { setState("missing"); return; }
        setCover({
          title: data.title, firm_name: data.firm_name ?? "", reporting_period: data.reporting_period ?? "",
          committee: data.committee ?? "", author: data.author ?? "",
        });
        setContent(normaliseContent(data.content));
        setLastSaved(new Date(data.updated_at));
        const st = data.status === "issued" ? "issued" : "draft";
        statusRef.current = st; setStatus(st);
        setState("ok");
      });
    supabase.from("board_summary_ratings").select("row_key,rating,is_demo").eq("user_id", user.id)
      .then(({ data, error }) => { if (error) setRatingsError(true); else setRatings((data ?? []) as RatingRow[]); });
    supabase.from("module_progress").select("module_code,checked_items").eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) { setProgressError(true); return; }
        const s = new Set<string>();
        (data ?? []).forEach((r) => Array.isArray(r.checked_items) && (r.checked_items as string[]).forEach((k) => s.add(k)));
        setChecked(s);
      });
  }, [id, user]);

  const save = useCallback(async () => {
    if (!id) return;
    timer.current = null;
    dirty.current = false;
    setSaveState("saving");
    const { cover: c, content: ct } = latest.current;
    // Editing an issued paper returns it to draft; prior snapshots are untouched.
    const { error } = await supabase.from("board_papers").update({
      title: c.title.trim() || "Untitled board paper",
      firm_name: c.firm_name || null, reporting_period: c.reporting_period || null,
      committee: c.committee || null, author: c.author || null,
      content: ct as unknown as never, updated_at: new Date().toISOString(), status: "draft",
    }).eq("id", id);
    if (error) { setSaveState("error"); dirty.current = true; return; }
    statusRef.current = "draft";
    setStatus("draft");
    setSaveState("saved");
    setLastSaved(new Date());
  }, [id]);

  const schedule = useCallback(() => {
    dirty.current = true;
    setSaveState("pending");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(save, SAVE_DELAY_MS);
  }, [save]);

  // Flush on unmount / tab close
  useEffect(() => {
    const flush = () => { if (dirty.current) { if (timer.current) window.clearTimeout(timer.current); void save(); } };
    window.addEventListener("beforeunload", flush);
    return () => { window.removeEventListener("beforeunload", flush); flush(); };
  }, [save]);

  const setC = (patch: Partial<Cover>) => { setCover((p) => ({ ...p, ...patch })); schedule(); };
  const set = (patch: Partial<BoardPaperContent>) => { setContent((p) => ({ ...p, ...patch })); schedule(); };

  const ratingByKey = useMemo(() => {
    const m: Record<string, RatingRow> = {};
    (ratings ?? []).forEach((r) => { m[r.row_key] = r; });
    return m;
  }, [ratings]);
  const ratingsDemo = (ratings ?? []).some((r) => r.is_demo);

  const programme = useMemo(() => {
    if (!checked) return null;
    const withItems = MODULE_REGISTRY.filter((m) => m.items.length > 0);
    const complete = withItems.filter((m) => m.items.every((k) => checked.has(k)));
    const outstanding = withItems.filter((m) => !complete.includes(m));
    return { total: withItems.length, complete, outstanding };
  }, [checked]);

  const includedUpdates = regulatoryUpdates.filter((u) => content.regulatory.included_ids.includes(u.id));
  void includedUpdates;

  // ---------- issue + versioning ----------
  const evidenceReady = (ratings !== null || ratingsError) && (checked !== null || progressError);
  const maxVersion = versions && versions.length ? Math.max(...versions.map((v) => v.version)) : 0;
  const nextVersion = maxVersion + 1;

  const issue = async () => {
    if (!id || !user) return;
    setIssuing(true);
    try {
      if (dirty.current) { if (timer.current) window.clearTimeout(timer.current); await save(); }
      const { data: top, error: vErr } = await supabase.from("board_paper_snapshots").select("version")
        .eq("board_paper_id", id).order("version", { ascending: false }).limit(1);
      if (vErr) throw vErr;
      const version = (top?.[0]?.version ?? 0) + 1;
      const { cover: c, content: ct } = latest.current;
      const pack = buildPack(c, ct, { ratings: ratingsError ? null : ratings ?? [], checked: progressError ? null : checked });
      const { error: sErr } = await supabase.from("board_paper_snapshots").insert({
        board_paper_id: id, user_id: user.id, version,
        issued_by: c.author.trim() || user.email || null, frozen_content: pack as unknown as never,
      });
      if (sErr) throw sErr;
      const { error: uErr } = await supabase.from("board_papers").update({ status: "issued" }).eq("id", id);
      if (uErr) throw uErr;
      statusRef.current = "issued";
      setStatus("issued");
      await loadVersions();
      toast.success(`Version ${version} issued`);
    } catch {
      toast.error("The board paper could not be issued. Nothing was frozen; please try again.");
    } finally {
      setIssuing(false);
    }
  };

  // ---------- table helpers ----------
  const updMi = (rid: string, patch: Partial<MiRow>) => set({ mi_rows: content.mi_rows.map((r) => (r.id === rid ? { ...r, ...patch } : r)) });
  const updRisk = (rid: string, patch: Partial<RiskRow>) => set({ risks: content.risks.map((r) => (r.id === rid ? { ...r, ...patch } : r)) });

  if (state !== "ok") {
    return (
      <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
        <Button asChild variant="outline" className="min-h-[44px]"><Link to="/board-papers"><ArrowLeft className="mr-2 h-4 w-4" aria-hidden />Back to Board Papers</Link></Button>
        {state === "loading" ? <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" />
          : <p className="text-base text-destructive" role="alert">This board paper could not be found.</p>}
      </div>
    );
  }

  const saveLabel = {
    idle: lastSaved ? `Saved ${lastSaved.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : "",
    pending: "Unsaved changes",
    saving: "Saving…",
    saved: `Saved ${lastSaved?.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) ?? ""}`,
    error: "Save failed — your changes are kept here and will retry on next edit",
  }[saveState];

  const scorecardTable = (
    ratingsError ? (
      <p role="alert" className="flex items-center gap-2 text-base text-destructive"><AlertCircle className="h-5 w-5" aria-hidden />The Board Summary ratings could not be loaded.</p>
    ) : ratings === null ? <Loader2 className="h-6 w-6 animate-spin" aria-label="Loading ratings" />
    : ratings.length === 0 ? (
      <div className="rounded-lg border border-dashed p-6 text-base text-muted-foreground">
        No ratings have been set yet. Complete the <Link to="/board-summary" className="font-semibold underline">Board Summary</Link> first; its ratings will appear here.
      </div>
    ) : (
      <div className="space-y-2">
        {ratingsDemo && <p className="text-sm font-semibold text-muted-foreground">Illustrative — these ratings come from demo data.</p>}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-base">
            <thead><tr className="border-b text-left"><th className="py-2 pr-4">Area</th><th className="py-2">Board rating</th></tr></thead>
            <tbody>
              {BOARD_SCORECARD_ROWS.map((row) => {
                const r = ratingByKey[row.key];
                return (
                  <tr key={row.key} className="border-b">
                    <td className="py-3 pr-4 font-medium">{row.title}</td>
                    <td className="py-3">{r ? <RatingBadge rating={r.rating} /> : <span className="text-muted-foreground">Not yet rated</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">Read-only. Ratings are set by people in the Board Summary and are not recalculated here.</p>
      </div>
    )
  );

  const programmeBlock = (
    progressError ? (
      <p role="alert" className="flex items-center gap-2 text-base text-destructive"><AlertCircle className="h-5 w-5" aria-hidden />Programme progress could not be loaded.</p>
    ) : !programme ? <Loader2 className="h-6 w-6 animate-spin" aria-label="Loading progress" /> : (
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Factual count — not a maturity rating</p>
        <p className="text-lg"><strong>{programme.complete.length} of {programme.total}</strong> modules have every implementation checklist item ticked.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-1 font-semibold">Checklist complete ({programme.complete.length})</p>
            {programme.complete.length ? <ul className="list-disc pl-5 text-base">{programme.complete.map((m) => <li key={m.id}>{m.id} {m.name}</li>)}</ul> : <p className="text-muted-foreground">None yet</p>}
          </div>
          <div>
            <p className="mb-1 font-semibold">Outstanding ({programme.outstanding.length})</p>
            {programme.outstanding.length ? <ul className="list-disc pl-5 text-base">{programme.outstanding.map((m) => <li key={m.id}>{m.id} {m.name}</li>)}</ul> : <p className="text-muted-foreground">None</p>}
          </div>
        </div>
      </div>
    )
  );

  // ---------- EDITOR ----------
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="outline" className="min-h-[44px]"><Link to="/board-papers"><ArrowLeft className="mr-2 h-4 w-4" aria-hidden />Back to Board Papers</Link></Button>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border px-3 py-1 text-sm font-semibold">
            {status === "issued" ? `Issued — version ${maxVersion}` : maxVersion ? `Draft (edited since version ${maxVersion})` : "Draft"}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground" aria-live="polite">
            {saveState === "saving" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {saveState === "saved" && <CheckCircle2 className="h-4 w-4" aria-hidden />}
            {saveState === "error" && <AlertCircle className="h-4 w-4 text-destructive" aria-hidden />}
            <span className={saveState === "error" ? "text-destructive" : ""}>{saveLabel}</span>
          </span>
          <Button variant="outline" onClick={() => setPreview((p) => !p)} className="min-h-[44px]" aria-pressed={preview}>
            {preview ? <><Pencil className="mr-2 h-4 w-4" aria-hidden />Back to editing</> : <><Eye className="mr-2 h-4 w-4" aria-hidden />Preview</>}
          </Button>
          <Button asChild variant="outline" className="min-h-[44px]"><Link to={`/board-papers/${id}/print`}><Printer className="mr-2 h-4 w-4" aria-hidden />Print draft</Link></Button>
          <Button onClick={() => setConfirmIssue(true)} disabled={!evidenceReady || issuing || status === "issued"} className="min-h-[44px]">
            {issuing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> : <Send className="mr-2 h-4 w-4" aria-hidden />}
            {status === "issued" ? "Issued — edit to re-issue" : "Issue board paper"}
          </Button>
        </div>
      </div>

      {preview ? <BoardPackDocument pack={buildPack(cover, content, { ratings: ratingsError ? null : ratings ?? [], checked: progressError ? null : checked ?? new Set() })} stateLabel="Draft preview" /> : (
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Board paper sections" className="lg:sticky lg:top-6 lg:self-start">
            <ol className="space-y-1 text-base">
              {SECTIONS.map((s, i) => (
                <li key={s.id}><a href={`#${s.id}`} className="block rounded px-2 py-2 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">{i + 1}. {s.label}</a></li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 space-y-6">
            <Section id="cover" title="1. Cover">
              <div className="grid gap-4 md:grid-cols-2">
                {([["title", "Title"], ["firm_name", "Firm name"], ["reporting_period", "Reporting period"], ["committee", "Committee"], ["author", "Author"]] as [keyof Cover, string][]).map(([k, l]) => (
                  <div key={k} className="space-y-2"><Label htmlFor={`cv-${k}`} className="text-base">{l}</Label><Input id={`cv-${k}`} value={cover[k]} onChange={(e) => setC({ [k]: e.target.value })} className="text-base" /></div>
                ))}
                <div className="space-y-2"><Label htmlFor="cv-date" className="text-base">Paper date</Label><Input id="cv-date" type="date" value={content.paper_date} onChange={(e) => set({ paper_date: e.target.value })} className="text-base" /></div>
              </div>
            </Section>

            <Section id="executive-summary" title="2. Executive summary">
              <Narrative id="exec" label="Executive summary" rows={8} value={content.executive_summary} onChange={(v) => set({ executive_summary: v })} placeholder="The board's key messages for this period, in your own words." />
            </Section>

            <Section id="scorecard" title="3. Consumer Duty outcomes scorecard">
              {scorecardTable}
              <Narrative id="sc-comm" label="Scorecard commentary" value={content.scorecard_commentary} onChange={(v) => set({ scorecard_commentary: v })} />
            </Section>

            <Section id="four-outcomes" title="4. Four outcomes commentary">
              {OUTCOME_FIELDS.map((f) => (
                <Narrative key={f.key} id={`oc-${f.key}`} label={f.label} value={content.outcomes[f.key]} onChange={(v) => set({ outcomes: { ...content.outcomes, [f.key]: v } })} />
              ))}
            </Section>

            <Section id="cross-cutting" title="5. Cross-cutting rule">
              <Narrative id="cc" label="Commentary" value={content.cross_cutting} onChange={(v) => set({ cross_cutting: v })} placeholder="Acting in good faith, avoiding foreseeable harm, enabling customers to pursue their financial objectives." />
            </Section>

            <Section id="vulnerable" title="6. Vulnerable customers">
              <Narrative id="vc" label="Commentary" value={content.vulnerable_customers} onChange={(v) => set({ vulnerable_customers: v })} placeholder="Analysis of outcomes for vulnerable cohorts compared with other customers — not grouped averages." />
            </Section>

            <Section id="distribution" title="7. Distribution chain">
              <Narrative id="dc" label="Commentary" value={content.distribution_chain} onChange={(v) => set({ distribution_chain: v })} placeholder="How manufacturers and distributors are overseen, and what outcomes evidence is shared along the chain." />
            </Section>

            <Section id="mi" title="8. Management information & KPIs">
              <p className="text-base text-muted-foreground">MI must carry explanatory analysis, not data alone. Say what each figure means for customer outcomes.</p>
              {content.mi_rows.map((r, i) => (
                <div key={r.id} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[1fr_120px_120px_2fr_auto]">
                  <Input aria-label={`Metric ${i + 1}`} placeholder="Metric" value={r.metric} onChange={(e) => updMi(r.id, { metric: e.target.value })} />
                  <Input aria-label={`Value ${i + 1}`} placeholder="Value" value={r.value} onChange={(e) => updMi(r.id, { value: e.target.value })} />
                  <Input aria-label={`Trend ${i + 1}`} placeholder="Trend" value={r.trend} onChange={(e) => updMi(r.id, { trend: e.target.value })} />
                  <Textarea aria-label={`Commentary ${i + 1}`} rows={2} placeholder="What this tells the board" value={r.commentary} onChange={(e) => updMi(r.id, { commentary: e.target.value })} />
                  <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px]" aria-label={`Remove metric ${i + 1}`} onClick={() => set({ mi_rows: content.mi_rows.filter((x) => x.id !== r.id) })}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button variant="outline" className="min-h-[44px]" onClick={() => set({ mi_rows: [...content.mi_rows, { id: newId(), metric: "", value: "", trend: "", commentary: "" }] })}><Plus className="mr-2 h-4 w-4" aria-hidden />Add metric</Button>
            </Section>

            <Section id="programme" title="9. Programme status (factual)">
              {programmeBlock}
              <div className="space-y-2"><Label htmlFor="prog-comm" className="text-base">Commentary</Label><Input id="prog-comm" value={content.programme_commentary} onChange={(e) => set({ programme_commentary: e.target.value })} className="text-base" /></div>
            </Section>

            <Section id="regulatory" title="10. Regulatory developments in period">
              <p className="text-base text-muted-foreground">Tick the developments to include. Taken from the <Link to="/regulatory-updates" className="underline">Regulatory Updates</Link> page.</p>
              <ul className="space-y-3">
                {regulatoryUpdates.map((u) => {
                  const on = content.regulatory.included_ids.includes(u.id);
                  return (
                    <li key={u.id} className="flex items-start gap-3">
                      <Checkbox id={`ru-${u.id}`} checked={on} className="mt-1" onCheckedChange={(v) => set({ regulatory: { ...content.regulatory, included_ids: v ? [...content.regulatory.included_ids, u.id] : content.regulatory.included_ids.filter((x) => x !== u.id) } })} />
                      <Label htmlFor={`ru-${u.id}`} className="cursor-pointer text-base font-normal"><strong>{u.title}</strong> <span className="text-muted-foreground">({u.date}, {u.status})</span></Label>
                    </li>
                  );
                })}
              </ul>
              <Narrative id="reg-comm" label="Commentary" value={content.regulatory.commentary} onChange={(v) => set({ regulatory: { ...content.regulatory, commentary: v } })} />
            </Section>

            <Section id="risks" title="11. Key risks & actions">
              {content.risks.map((r, i) => (
                <div key={r.id} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[2fr_1fr_120px_160px_1fr_auto]">
                  <Input aria-label={`Risk ${i + 1}`} placeholder="Risk" value={r.risk} onChange={(e) => updRisk(r.id, { risk: e.target.value })} />
                  <Input aria-label={`Owner ${i + 1}`} placeholder="Owner" value={r.owner} onChange={(e) => updRisk(r.id, { owner: e.target.value })} />
                  <select aria-label={`RAG ${i + 1}`} value={r.rag} onChange={(e) => updRisk(r.id, { rag: e.target.value as RiskRag })} className="h-10 rounded-md border bg-background px-2 text-base">
                    <option value="">RAG…</option><option value="red">Red</option><option value="amber">Amber</option><option value="green">Green</option>
                  </select>
                  <Input aria-label={`Due date ${i + 1}`} type="date" value={r.due_date} onChange={(e) => updRisk(r.id, { due_date: e.target.value })} />
                  <Input aria-label={`Status ${i + 1}`} placeholder="Status" value={r.status} onChange={(e) => updRisk(r.id, { status: e.target.value })} />
                  <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px]" aria-label={`Remove risk ${i + 1}`} onClick={() => set({ risks: content.risks.filter((x) => x.id !== r.id) })}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button variant="outline" className="min-h-[44px]" onClick={() => set({ risks: [...content.risks, { id: newId(), risk: "", owner: "", rag: "", due_date: "", status: "" }] })}><Plus className="mr-2 h-4 w-4" aria-hidden />Add risk</Button>
            </Section>

            <Section id="attestation" title="12. Attestation & sign-off">
              <Narrative id="att" label="Attestation statement" value={content.attestation.statement} onChange={(v) => set({ attestation: { ...content.attestation, statement: v } })} />
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2"><Label htmlFor="att-name" className="text-base">Approver name</Label><Input id="att-name" value={content.attestation.approver_name} onChange={(e) => set({ attestation: { ...content.attestation, approver_name: e.target.value } })} /></div>
                <div className="space-y-2"><Label htmlFor="att-role" className="text-base">Role / SMF</Label><Input id="att-role" value={content.attestation.approver_role} onChange={(e) => set({ attestation: { ...content.attestation, approver_role: e.target.value } })} /></div>
                <div className="space-y-2"><Label htmlFor="att-date" className="text-base">Date</Label><Input id="att-date" type="date" value={content.attestation.date} onChange={(e) => set({ attestation: { ...content.attestation, date: e.target.value } })} /></div>
              </div>
            </Section>
          </div>
        </div>
      )}

      <Card id="versions">
        <CardHeader className="border-b" style={{ borderBottomColor: CONTENT_GOLD }}>
          <CardTitle className="flex items-center gap-2 text-xl"><History className="h-5 w-5" aria-hidden />Issued versions</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {versions === null ? <Loader2 className="h-6 w-6 animate-spin" aria-label="Loading versions" />
            : versions.length === 0 ? <p className="text-base text-muted-foreground">Not issued yet. Issuing freezes the pack exactly as it stands as version 1.</p>
            : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-base">
                  <thead><tr className="border-b text-left"><th className="py-2 pr-4">Version</th><th className="pr-4">Issued by</th><th className="pr-4">Issued</th><th><span className="sr-only">Actions</span></th></tr></thead>
                  <tbody>
                    {versions.map((v) => (
                      <tr key={v.id} className="border-b">
                        <td className="py-2 pr-4 font-semibold">Version {v.version}</td>
                        <td className="pr-4">{v.issued_by || "—"}</td>
                        <td className="pr-4">{fmtDate(v.issued_at)} {new Date(v.issued_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</td>
                        <td className="flex flex-wrap justify-end gap-2 py-2">
                          <Button variant="outline" className="min-h-[44px]" onClick={() => setViewing(v)}><Eye className="mr-2 h-4 w-4" aria-hidden />View</Button>
                          <Button asChild variant="outline" className="min-h-[44px]"><Link to={`/board-papers/${id}/print?version=${v.version}`}><Printer className="mr-2 h-4 w-4" aria-hidden />Print view</Link></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-sm text-muted-foreground">Issued versions are permanent and cannot be edited or deleted. Re-issuing creates a new version.</p>
              </div>
            )}
        </CardContent>
      </Card>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Version {viewing?.version} — read-only</DialogTitle>
            <DialogDescription>Issued {viewing && fmtDate(viewing.issued_at)}{viewing?.issued_by ? ` by ${viewing.issued_by}` : ""}. This is the pack exactly as frozen at issue.</DialogDescription>
          </DialogHeader>
          {viewing && <BoardPackDocument pack={readPack(viewing.frozen_content)} stateLabel={`Issued — version ${viewing.version}`} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmIssue} onOpenChange={setConfirmIssue}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Issue version {nextVersion}?</AlertDialogTitle>
            <AlertDialogDescription>
              The full pack — your narrative plus the scorecard, programme status and selected regulatory entries as they stand now — will be frozen permanently as version {nextVersion}. You can keep editing afterwards and issue a new version.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={issue}>Issue version {nextVersion}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BoardPaperDetail;
