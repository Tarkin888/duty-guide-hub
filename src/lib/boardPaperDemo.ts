/**
 * Demo seed: one fully populated, ISSUED board paper for an entirely fictional
 * firm ("Northbridge Building Society"). All prose is illustrative and the
 * scorecard ratings are flagged as demo data so they render as "Illustrative".
 */
import { supabase } from "@/integrations/supabase/client";
import { BoardPaperContent } from "@/lib/boardPaperContent";
import { buildPack, loadEvidence, PackCover, RatingRow } from "@/lib/boardPaperPack";

export const DEMO_FIRM = "Northbridge Building Society (fictional)";

const cover: PackCover = {
  title: "Consumer Duty annual board report 2025/26 (DEMO — fictional firm)",
  firm_name: DEMO_FIRM,
  reporting_period: "1 August 2025 to 31 July 2026",
  committee: "Board Risk Committee",
  author: "J. Ashworth, Head of Conduct Risk (fictional)",
};

const content: BoardPaperContent = {
  paper_date: "2026-07-24",
  executive_summary:
    "This paper sets out the Society's annual assessment of whether it is delivering good outcomes for retail customers under the Consumer Duty, for Board approval.\n\nIn summary, management considers that the Society is broadly delivering good outcomes. Products and pricing are well evidenced. Consumer understanding testing has improved but is not yet consistent across all communications. Complaint handling times rose in Q3 following the mortgage system migration and have since recovered. Outcomes for customers with characteristics of vulnerability are now monitored separately, and one gap has been identified in the digital savings journey.\n\nThe Board is asked to (1) note the evidence presented, (2) challenge the conclusions where appropriate, and (3) approve the attestation in section 12.",
  scorecard_commentary:
    "Ratings were agreed at the Consumer Duty Oversight Committee on 9 July 2026 after challenge from the Chief Risk Officer. The 'Developing' ratings for Consumer Understanding and Vulnerable customers reflect evidence gaps rather than known harm; both have funded actions in section 11.",
  outcomes: {
    products_services:
      "All 14 retail products were reviewed against their target market statements during the year. Two legacy fixed-rate savings products were closed to new business because the target market was no longer clearly identifiable. No product was found to be causing foreseeable harm.",
    price_value:
      "The fair value assessment covered every product line. Easy-access savings rates were benchmarked quarterly against the market median; the Society remained above median throughout. One mortgage early repayment charge was reduced after the assessment found it exceeded the Society's likely costs.",
    consumer_understanding:
      "Comprehension testing was carried out on 22 key communications with a panel of 300 members. 17 met the target of 80% correct understanding; five, mainly arrears letters, fell short and are being rewritten. Testing of the mobile app journeys starts in Q1.",
    consumer_support:
      "Average call waiting time was 3 minutes 40 seconds (target: under 5 minutes). Complaint resolution within 8 weeks fell to 91% in Q3 during the system migration, recovering to 97% by July. Cancelling a savings account now takes the same number of steps as opening one.",
  },
  cross_cutting:
    "Staff training on the three cross-cutting rules was completed by 98% of customer-facing colleagues. A review of 40 sales and servicing files found no evidence of customers being steered to unsuitable products. Evidence of good faith is drawn from complaint themes, which show no pattern of exploiting customer inertia.",
  vulnerable_customers:
    "Outcomes are now reported separately for members who have told us about a vulnerability (around 6% of the active base). Call outcomes and complaint rates are in line with other members. However, members using screen readers took on average twice as long to complete the digital savings journey; an accessibility fix is scheduled for September.",
  distribution_chain:
    "Mortgage intermediaries provide 68% of new lending. The Society shared its target market and fair value information with all panel firms and received outcome information back from the three largest. Two smaller networks have not yet returned information; the Society has written to them with a deadline of 30 September.",
  mi_rows: [
    { id: "d1", metric: "Complaints resolved within 8 weeks", value: "97%", trend: "Recovered from 91% in Q3", commentary: "Dip caused by mortgage system migration; extra staff added in May." },
    { id: "d2", metric: "Average call waiting time", value: "3 min 40 s", trend: "Stable", commentary: "Within the 5-minute appetite throughout the year." },
    { id: "d3", metric: "Communications meeting understanding target", value: "17 of 22", trend: "Up from 11 of 20", commentary: "Remaining five are arrears letters, being rewritten." },
    { id: "d4", metric: "Members in arrears offered forbearance", value: "100%", trend: "Stable", commentary: "File review confirmed options were explained in plain language." },
    { id: "d5", metric: "Vulnerable members: complaint rate vs all members", value: "1.1 vs 1.0 per 1,000", trend: "Narrowing", commentary: "No material difference; continue to monitor quarterly." },
  ],
  programme_commentary:
    "The programme count reflects checklist completion in this tool only and is not a judgement of maturity.",
  regulatory: {
    included_ids: [],
    commentary:
      "Management has reviewed FCA publications during the period. No change to the Society's approach is required, but the price and value good-practice findings have been fed into next year's fair value assessment.",
  },
  risks: [
    { id: "r1", risk: "Arrears letters not yet meeting understanding target", owner: "Head of Collections", rag: "amber", due_date: "2026-10-31", status: "Rewrite under way; retest booked" },
    { id: "r2", risk: "Digital savings journey harder for screen-reader users", owner: "Head of Digital", rag: "red", due_date: "2026-09-30", status: "Fix in development" },
    { id: "r3", risk: "Two intermediary networks yet to share outcome data", owner: "Head of Intermediary Sales", rag: "amber", due_date: "2026-09-30", status: "Formal request issued" },
    { id: "r4", risk: "Complaint backlog recurrence at next system change", owner: "Chief Operating Officer", rag: "green", due_date: "2026-12-31", status: "Contingency staffing plan approved" },
  ],
  attestation: {
    statement:
      "The Board has reviewed this assessment, challenged management on the evidence, and is satisfied that the Society is broadly delivering good outcomes for retail customers, subject to completion of the actions in section 11.",
    approver_name: "Dame P. Calloway (fictional)",
    approver_role: "Chair of the Board",
    date: "2026-07-29",
  },
};

const demoRatings: RatingRow[] = [
  { row_key: "products_services", rating: "established", is_demo: true },
  { row_key: "price_value", rating: "established", is_demo: true },
  { row_key: "consumer_understanding", rating: "developing", is_demo: true },
  { row_key: "consumer_support", rating: "established", is_demo: true },
  { row_key: "cross_cutting", rating: "established", is_demo: true },
  { row_key: "vulnerable_customers", rating: "developing", is_demo: true },
  { row_key: "governance_monitoring", rating: "established", is_demo: true },
];

/** Creates the demo paper (status issued) and its version 1 snapshot. Returns the paper id. */
export const seedDemoBoardPaper = async (userId: string): Promise<string> => {
  const ev = await loadEvidence(userId);
  const regIds = (await import("@/data/regulatoryUpdatesData")).regulatoryUpdates.slice(0, 2).map((u) => u.id);
  const c: BoardPaperContent = { ...content, regulatory: { ...content.regulatory, included_ids: regIds } };
  const pack = { ...buildPack(cover, c, { ratings: demoRatings, checked: ev.checked }), resolved_at: "2026-07-29T16:30:00.000Z" };

  const { data, error } = await supabase.from("board_papers").insert({
    user_id: userId, ...cover, status: "issued", content: c as unknown as never,
  }).select("id").single();
  if (error || !data) throw error ?? new Error("Insert failed");

  const { error: sErr } = await supabase.from("board_paper_snapshots").insert({
    board_paper_id: data.id, user_id: userId, version: 1, issued_by: cover.author,
    issued_at: "2026-07-29T16:30:00.000Z", frozen_content: pack as unknown as never,
  });
  if (sErr) throw sErr;
  return data.id;
};
