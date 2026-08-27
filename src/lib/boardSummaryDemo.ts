import { supabase } from '@/integrations/supabase/client';
import { BoardAction, BoardRating } from '@/config/boardSummaryConfig';

/**
 * Demo firm data for the Board Summary. Clearly flagged as demo in the UI via
 * the is_demo column, and removable with one click.
 */
const DEMO_RATINGS: { row_key: string; rating: BoardRating; rationale: string }[] = [
  {
    row_key: 'products_services',
    rating: 'established',
    rationale:
      'Target markets are documented for all 14 open products and the annual product review cycle ran to plan. Two closed-book products still lack a refreshed target market statement.',
  },
  {
    row_key: 'price_value',
    rating: 'developing',
    rationale:
      'Fair value assessments are complete for the core range, but benchmarking evidence for the two intermediated products relies on distributor data we have not independently verified.',
  },
  {
    row_key: 'consumer_understanding',
    rating: 'established',
    rationale:
      'Comprehension testing is embedded for all new customer communications, with results reported quarterly to the Consumer Duty Oversight Committee.',
  },
  {
    row_key: 'consumer_support',
    rating: 'developing',
    rationale:
      'The sludge audit identified three friction points in cancellation journeys. Two are remediated; the telephone cancellation route is still slower than the sales route.',
  },
  {
    row_key: 'cross_cutting',
    rating: 'established',
    rationale:
      'Foreseeable harm assessment refreshed in the last cycle and linked to the risk register, with Board challenge recorded in the minutes.',
  },
  {
    row_key: 'vulnerable_customers',
    rating: 'nascent',
    rationale:
      'We cannot yet evidence that customers with characteristics of vulnerability receive outcomes as good as other customers. Identification data is incomplete and outcome comparison is not produced.',
  },
  {
    row_key: 'governance_monitoring',
    rating: 'established',
    rationale:
      'Consumer Duty Oversight Committee meets monthly with a defined MI pack. Second-line assurance plan is agreed; independent third-line review is scheduled for the next cycle.',
  },
];

const DEMO_ACTIONS: BoardAction[] = [
  {
    id: 'demo-action-1',
    rowKey: 'vulnerable_customers',
    description:
      'Build the vulnerable customer outcome comparison report and present a first differential outcomes analysis to the Board.',
    owner: 'Head of Customer Operations',
    targetDate: '2026-11-30',
  },
  {
    id: 'demo-action-2',
    rowKey: 'price_value',
    description:
      'Obtain independent benchmarking evidence for the two intermediated products and re-run the fair value assessment.',
    owner: 'Director of Product',
    targetDate: '2026-10-31',
  },
  {
    id: 'demo-action-3',
    rowKey: 'consumer_support',
    description:
      'Remove the remaining friction in the telephone cancellation journey so it is no slower than the equivalent sales route.',
    owner: 'Contact Centre Lead',
    targetDate: '2026-09-30',
  },
];

export async function seedDemoBoardSummary(userId: string) {
  const { error: ratingsError } = await supabase.from('board_summary_ratings').upsert(
    DEMO_RATINGS.map((r) => ({ ...r, user_id: userId, is_demo: true })),
    { onConflict: 'user_id,row_key' },
  );
  if (ratingsError) throw ratingsError;

  const { error: reportError } = await supabase.from('board_summary_reports').upsert(
    {
      user_id: userId,
      verdict: 'broadly',
      verdict_narrative:
        'Demo firm: across the seven areas the Board rates one as nascent, two as developing and four as established. On that basis we are broadly delivering good outcomes, with one material gap in evidencing outcomes for vulnerable customers that the Board does not yet consider adequately controlled.',
      differential_outcomes:
        'Demo firm: customers identified as having characteristics of vulnerability show a complaint rate roughly twice that of the wider book and a lower first-contact resolution rate. Older customers using telephone servicing wait longer than digital users. The underlying cause appears to be incomplete identification data rather than product design.',
      forward_look:
        'Demo firm: over the next twelve months the priorities are completing the vulnerable customer outcome comparison, independent verification of intermediated product value, and commissioning third-line assurance over the Consumer Duty framework.',
      actions: DEMO_ACTIONS as unknown as never,
      approver_name: 'Alexandra Finch',
      approver_role: 'SMF1 Chief Executive',
      signoff_date: new Date().toISOString().slice(0, 10),
      is_demo: true,
    },
    { onConflict: 'user_id' },
  );
  if (reportError) throw reportError;
}

export async function resetBoardSummary(userId: string) {
  const ratings = await supabase.from('board_summary_ratings').delete().eq('user_id', userId);
  if (ratings.error) throw ratings.error;
  const report = await supabase.from('board_summary_reports').delete().eq('user_id', userId);
  if (report.error) throw report.error;
  const snapshots = await supabase.from('board_summary_snapshots').delete().eq('user_id', userId);
  if (snapshots.error) throw snapshots.error;
}
