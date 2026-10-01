import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Eye, Pencil, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BOARD_SCORECARD_ROWS, RATING_BY_VALUE, BoardRating } from "@/config/boardSummaryConfig";
import { MODULE_REGISTRY } from "@/config/moduleRegistry";
import { regulatoryUpdates } from "@/data/regulatoryUpdatesData";
import {
  BoardPaperContent, MiRow, RiskRow, RiskRag, emptyContent, normaliseContent, newId,
} from "@/lib/boardPaperContent";

const CONTENT_GOLD = "#d4af37";
const SAVE_DELAY_MS = 1200;

interface Cover { title: string; firm_name: string; reporting_period: string; committee: string; author: string }
interface RatingRow { row_key: string; rating: BoardRating; is_demo: boolean }

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

  const dirty = useRef(false);
  const timer = useRef<number | null>(null);
  const latest = useRef({ cover, content });
  latest.current = { cover, content };

  useEffect(() => {
    if (!id || !user) return;
    supabase.from("board_papers").select("title,firm_name,reporting_period,committee,author,content,updated_at")
      .eq("id", id).maybeSingle().then(({ data }) => {
        if (!data) { setState("missing"); return; }
        setCover({
          title: data.title, firm_name: data.firm_name ?? "", reporting_period: data.reporting_period ?? "",
          committee: data.committee ?? "", author: data.author ?? "",
        });
        setContent(normaliseContent(data.content));
        setLastSaved(new Date(data.updated_at));
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
    const { error } = await supabase.from("board_papers").update({
      title: c.title.trim() || "Untitled board paper",
      firm_name: c.firm_name || null, reporting_period: c.reporting_period || null,
      committee: c.committee || null, author: c.author || null,
      content: ct as unknown as never, updated_at: new Date().toISOString(),
    }).eq("id", id);
    if (error) { setSaveState("error"); dirty.current = true; return; }
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

  // ---------- PREVIEW ----------
  const P = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="space-y-3 border-b pb-6">
      <h2 className="text-xl font-bold text-foreground" style={{ borderLeft: `4px solid ${CONTENT_GOLD}`, paddingLeft: 12 }}>{title}</h2>
      {children}
    </section>
  );
  const Txt = ({ v }: { v: string }) => v.trim() ? <p className="whitespace-pre-wrap text-base leading-relaxed">{v}</p> : <p className="text-base italic text-muted-foreground">Not provided.</p>;

  const previewDoc = (
    <article className="mx-auto max-w-3xl space-y-6 rounded-lg border bg-card p-6 md:p-10">
      <header className="space-y-2 border-b pb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-foreground">Board paper</p>
        <h1 className="text-3xl font-bold">{cover.title || "Untitled board paper"}</h1>
        <p className="text-base text-muted-foreground">{[cover.firm_name, cover.reporting_period, cover.committee].filter(Boolean).join(" · ")}</p>
        <p className="text-base text-muted-foreground">{[cover.author && `Author: ${cover.author}`, content.paper_date && fmtDate(content.paper_date)].filter(Boolean).join(" · ")}</p>
      </header>
      <P title="Executive summary"><Txt v={content.executive_summary} /></P>
      <P title="Consumer Duty outcomes scorecard">{scorecardTable}<Txt v={content.scorecard_commentary} /></P>
      <P title="Four outcomes commentary">{OUTCOME_FIELDS.map((f) => <div key={f.key}><h3 className="font-semibold">{f.label}</h3><Txt v={content.outcomes[f.key]} /></div>)}</P>
      <P title="Cross-cutting rule"><Txt v={content.cross_cutting} /></P>
      <P title="Vulnerable customers"><Txt v={content.vulnerable_customers} /></P>
      <P title="Distribution chain"><Txt v={content.distribution_chain} /></P>
      <P title="Management information & KPIs">
        {content.mi_rows.length ? (
          <table className="w-full border-collapse text-base"><thead><tr className="border-b text-left"><th className="py-2 pr-2">Metric</th><th className="pr-2">Value</th><th className="pr-2">Trend</th><th>Commentary</th></tr></thead>
            <tbody>{content.mi_rows.map((r) => <tr key={r.id} className="border-b align-top"><td className="py-2 pr-2">{r.metric}</td><td className="pr-2">{r.value}</td><td className="pr-2">{r.trend}</td><td className="whitespace-pre-wrap">{r.commentary}</td></tr>)}</tbody></table>
        ) : <Txt v="" />}
      </P>
      <P title="Programme status (factual)">{programmeBlock}<Txt v={content.programme_commentary} /></P>
      <P title="Regulatory developments in period">
        {includedUpdates.length ? <ul className="space-y-2">{includedUpdates.map((u) => <li key={u.id}><strong>{u.title}</strong> <span className="text-muted-foreground">({u.date}, {u.status})</span></li>)}</ul> : <p className="italic text-muted-foreground">No developments selected.</p>}
        <Txt v={content.regulatory.commentary} />
      </P>
      <P title="Key risks & actions">
        {content.risks.length ? (
          <table className="w-full border-collapse text-base"><thead><tr className="border-b text-left"><th className="py-2 pr-2">Risk</th><th className="pr-2">Owner</th><th className="pr-2">RAG</th><th className="pr-2">Due</th><th>Status</th></tr></thead>
            <tbody>{content.risks.map((r) => <tr key={r.id} className="border-b align-top"><td className="py-2 pr-2">{r.risk}</td><td className="pr-2">{r.owner}</td><td className="pr-2">{r.rag ? <span className={`rounded border px-2 py-0.5 text-sm font-semibold ${RAG_META[r.rag].cls}`}>{RAG_META[r.rag].label}</span> : "—"}</td><td className="pr-2">{fmtDate(r.due_date)}</td><td>{r.status}</td></tr>)}</tbody></table>
        ) : <Txt v="" />}
      </P>
      <P title="Attestation & sign-off">
        <Txt v={content.attestation.statement} />
        <p className="text-base">{[content.attestation.approver_name, content.attestation.approver_role, fmtDate(content.attestation.date)].filter(Boolean).join(" · ") || <span className="italic text-muted-foreground">Approver not recorded.</span>}</p>
      </P>
    </article>
  );

  // ---------- EDITOR ----------
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="outline" className="min-h-[44px]"><Link to="/board-papers"><ArrowLeft className="mr-2 h-4 w-4" aria-hidden />Back to Board Papers</Link></Button>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm text-muted-foreground" aria-live="polite">
            {saveState === "saving" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {saveState === "saved" && <CheckCircle2 className="h-4 w-4" aria-hidden />}
            {saveState === "error" && <AlertCircle className="h-4 w-4 text-destructive" aria-hidden />}
            <span className={saveState === "error" ? "text-destructive" : ""}>{saveLabel}</span>
          </span>
          <Button onClick={() => setPreview((p) => !p)} className="min-h-[44px]" aria-pressed={preview}>
            {preview ? <><Pencil className="mr-2 h-4 w-4" aria-hidden />Back to editing</> : <><Eye className="mr-2 h-4 w-4" aria-hidden />Preview</>}
          </Button>
        </div>
      </div>

      {preview ? previewDoc : (
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
    </div>
  );
};

export default BoardPaperDetail;
