import { RATING_BY_VALUE } from "@/config/boardSummaryConfig";
import { BoardPack, fmtLongDate } from "@/lib/boardPaperPack";
import { BoardPaperContent, RiskRag } from "@/lib/boardPaperContent";

const CONTENT_GOLD = "#d4af37";

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

const P = ({ title, children, breakBefore = true }: { title: string; children: React.ReactNode; breakBefore?: boolean }) => (
  <section className={`space-y-3 border-b pb-6 ${breakBefore ? "bp-page-break" : ""}`}>
    <h2 className="text-xl font-bold text-foreground" style={{ borderLeft: `4px solid ${CONTENT_GOLD}`, paddingLeft: 12 }}>{title}</h2>
    {children}
  </section>
);
const Txt = ({ v }: { v: string }) =>
  v.trim() ? <p className="whitespace-pre-wrap text-base leading-relaxed">{v}</p> : <p className="text-base italic text-muted-foreground">Not provided.</p>;

interface Props {
  pack: BoardPack;
  /** e.g. "Issued — version 2" or "Draft" */
  stateLabel: string;
}

/** Read-only render of a full board pack (draft preview, version modal, print view). */
const BoardPackDocument = ({ pack, stateLabel }: Props) => {
  const { cover, content, scorecard, programme, regulatory } = pack;
  return (
    <article className="bp-doc mx-auto max-w-3xl space-y-6 rounded-lg border bg-card p-6 text-foreground md:p-10">
      <header className="space-y-2 border-b pb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-foreground">Board paper · {stateLabel}</p>
        <h1 className="text-3xl font-bold">{cover.title || "Untitled board paper"}</h1>
        <p className="text-base text-muted-foreground">{[cover.firm_name, cover.reporting_period, cover.committee].filter(Boolean).join(" · ")}</p>
        <p className="text-base text-muted-foreground">{[cover.author && `Author: ${cover.author}`, content.paper_date && fmtLongDate(content.paper_date)].filter(Boolean).join(" · ")}</p>
      </header>

      <P title="Executive summary" breakBefore={false}><Txt v={content.executive_summary} /></P>

      <P title="Consumer Duty outcomes scorecard">
        {scorecard.state === "unavailable" ? (
          <p role="alert" className="text-base text-destructive">The Board Summary ratings were not available when this pack was assembled.</p>
        ) : scorecard.state === "empty" ? (
          <p className="text-base italic text-muted-foreground">No Board Summary ratings had been set.</p>
        ) : (
          <div className="space-y-2">
            {scorecard.illustrative && <p className="text-sm font-semibold text-muted-foreground">Illustrative — these ratings come from demo data.</p>}
            <table className="w-full border-collapse text-base">
              <thead><tr className="border-b text-left"><th className="py-2 pr-4">Area</th><th className="py-2">Board rating</th></tr></thead>
              <tbody>
                {scorecard.rows.map((r) => (
                  <tr key={r.key} className="border-b">
                    <td className="py-2 pr-4 font-medium">{r.title}</td>
                    <td className="py-2">
                      {r.rating ? (
                        <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${RATING_BY_VALUE[r.rating]?.badgeClass ?? ""}`}>{r.rating_label}</span>
                      ) : <span className="text-muted-foreground">Not yet rated</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground">Ratings set by people in the Board Summary; not recalculated.</p>
          </div>
        )}
        <Txt v={content.scorecard_commentary} />
      </P>

      <P title="Four outcomes commentary">
        {OUTCOME_FIELDS.map((f) => <div key={f.key} className="bp-avoid-break"><h3 className="font-semibold">{f.label}</h3><Txt v={content.outcomes[f.key]} /></div>)}
      </P>
      <P title="Cross-cutting rule"><Txt v={content.cross_cutting} /></P>
      <P title="Vulnerable customers" breakBefore={false}><Txt v={content.vulnerable_customers} /></P>
      <P title="Distribution chain" breakBefore={false}><Txt v={content.distribution_chain} /></P>

      <P title="Management information & KPIs">
        {content.mi_rows.length ? (
          <table className="w-full border-collapse text-base"><thead><tr className="border-b text-left"><th className="py-2 pr-2">Metric</th><th className="pr-2">Value</th><th className="pr-2">Trend</th><th>Commentary</th></tr></thead>
            <tbody>{content.mi_rows.map((r) => <tr key={r.id} className="bp-avoid-break border-b align-top"><td className="py-2 pr-2">{r.metric}</td><td className="pr-2">{r.value}</td><td className="pr-2">{r.trend}</td><td className="whitespace-pre-wrap">{r.commentary}</td></tr>)}</tbody></table>
        ) : <Txt v="" />}
      </P>

      <P title="Programme status (factual)">
        {programme.state === "unavailable" ? (
          <p role="alert" className="text-base text-destructive">Programme progress was not available when this pack was assembled.</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Factual count — not a maturity rating</p>
            <p className="text-lg"><strong>{programme.complete.length} of {programme.total}</strong> modules have every implementation checklist item ticked.</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div><p className="mb-1 font-semibold">Checklist complete ({programme.complete.length})</p>
                {programme.complete.length ? <ul className="list-disc pl-5 text-base">{programme.complete.map((m) => <li key={m.id}>{m.id} {m.name}</li>)}</ul> : <p className="text-muted-foreground">None yet</p>}</div>
              <div><p className="mb-1 font-semibold">Outstanding ({programme.outstanding.length})</p>
                {programme.outstanding.length ? <ul className="list-disc pl-5 text-base">{programme.outstanding.map((m) => <li key={m.id}>{m.id} {m.name}</li>)}</ul> : <p className="text-muted-foreground">None</p>}</div>
            </div>
          </div>
        )}
        <Txt v={content.programme_commentary} />
      </P>

      <P title="Regulatory developments in period">
        {regulatory.length ? <ul className="space-y-2">{regulatory.map((u) => <li key={u.id}><strong>{u.title}</strong> <span className="text-muted-foreground">({u.date}, {u.status})</span></li>)}</ul> : <p className="italic text-muted-foreground">No developments selected.</p>}
        <Txt v={content.regulatory.commentary} />
      </P>

      <P title="Key risks & actions">
        {content.risks.length ? (
          <table className="w-full border-collapse text-base"><thead><tr className="border-b text-left"><th className="py-2 pr-2">Risk</th><th className="pr-2">Owner</th><th className="pr-2">RAG</th><th className="pr-2">Due</th><th>Status</th></tr></thead>
            <tbody>{content.risks.map((r) => <tr key={r.id} className="bp-avoid-break border-b align-top"><td className="py-2 pr-2">{r.risk}</td><td className="pr-2">{r.owner}</td><td className="pr-2">{r.rag ? <span className={`rounded border px-2 py-0.5 text-sm font-semibold ${RAG_META[r.rag].cls}`}>{RAG_META[r.rag].label}</span> : "—"}</td><td className="pr-2">{fmtLongDate(r.due_date)}</td><td>{r.status}</td></tr>)}</tbody></table>
        ) : <Txt v="" />}
      </P>

      <P title="Attestation & sign-off">
        <Txt v={content.attestation.statement} />
        <p className="text-base">{[content.attestation.approver_name, content.attestation.approver_role, fmtLongDate(content.attestation.date)].filter(Boolean).join(" · ") || <span className="italic text-muted-foreground">Approver not recorded.</span>}</p>
      </P>
    </article>
  );
};

export default BoardPackDocument;
