/**
 * Board Summary configuration — seven fixed scorecard rows.
 *
 * Ratings are always set by a human. Nothing here derives a rating from
 * checklist completion, and nothing maps onto the maturity_assessments
 * six-category structure (deliberately different shape).
 */

export type BoardRating = 'nascent' | 'developing' | 'established' | 'advanced';

export interface BoardRatingMeta {
  value: BoardRating;
  label: string;
  /** Plain-English meaning shown alongside the label (never colour alone). */
  description: string;
  /** Tailwind classes using existing semantic-friendly tokens. */
  badgeClass: string;
  dotClass: string;
  rag: 'red' | 'amber' | 'green' | 'dark-green';
}

export const BOARD_RATINGS: BoardRatingMeta[] = [
  {
    value: 'nascent',
    label: 'Nascent',
    description: 'Little or no evidence in place; material risk of poor outcomes.',
    badgeClass: 'bg-red-100 text-red-900 border-red-300',
    dotClass: 'bg-red-600',
    rag: 'red',
  },
  {
    value: 'developing',
    label: 'Developing',
    description: 'Work under way but incomplete or not yet evidenced end to end.',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    dotClass: 'bg-amber-500',
    rag: 'amber',
  },
  {
    value: 'established',
    label: 'Established',
    description: 'Controls operating and evidenced; outcomes monitored.',
    badgeClass: 'bg-green-100 text-green-900 border-green-300',
    dotClass: 'bg-green-600',
    rag: 'green',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: 'Consistently good outcomes, independently assured and improving.',
    badgeClass: 'bg-emerald-200 text-emerald-950 border-emerald-500',
    dotClass: 'bg-emerald-800',
    rag: 'dark-green',
  },
];

export const RATING_BY_VALUE: Record<BoardRating, BoardRatingMeta> = BOARD_RATINGS.reduce(
  (acc, r) => ({ ...acc, [r.value]: r }),
  {} as Record<BoardRating, BoardRatingMeta>,
);

export interface BoardScorecardRow {
  key: string;
  title: string;
  /** Plain-language description of what the board is rating. */
  summary: string;
  /** Registry module codes used to read completion state (read-only context). */
  moduleCodes: string[];
  /** module_notes.module_id prefixes used to read related notes (read-only). */
  notePrefixes: string[];
  /** Links into the source modules. */
  links: { label: string; url: string }[];
}

export const BOARD_SCORECARD_ROWS: BoardScorecardRow[] = [
  {
    key: 'products_services',
    title: 'Products & Services',
    summary: 'Products are designed for an identified target market and kept under review.',
    moduleCodes: ['CD-I1'],
    notePrefixes: ['cd-i1'],
    links: [{ label: 'CD-I1 Products & Services', url: '/outcomes/products-services' }],
  },
  {
    key: 'price_value',
    title: 'Price & Value',
    summary: 'Customers receive fair value; price is justified by the benefits provided.',
    moduleCodes: ['CD-I2'],
    notePrefixes: ['cd-i2'],
    links: [{ label: 'CD-I2 Price & Value', url: '/outcomes/price-value' }],
  },
  {
    key: 'consumer_understanding',
    title: 'Consumer Understanding',
    summary: 'Communications are tested and shown to be understood by customers.',
    moduleCodes: ['CD-I3'],
    notePrefixes: ['cd-i3'],
    links: [{ label: 'CD-I3 Consumer Understanding', url: '/outcomes/consumer-understanding' }],
  },
  {
    key: 'consumer_support',
    title: 'Consumer Support',
    summary: 'Support is as easy to access as sales, with no unreasonable barriers.',
    moduleCodes: ['CD-I4'],
    notePrefixes: ['cd-i4'],
    links: [{ label: 'CD-I4 Consumer Support', url: '/outcomes/consumer-support' }],
  },
  {
    key: 'cross_cutting',
    title: 'Cross-cutting rule',
    summary: 'Acting in good faith, avoiding foreseeable harm and supporting financial objectives.',
    moduleCodes: ['CD-F3'],
    notePrefixes: ['cd-f3'],
    links: [{ label: 'CD-F3 Risk & Impact Assessment', url: '/foundation/risk-impact' }],
  },
  {
    key: 'vulnerable_customers',
    title: 'Vulnerable customers',
    summary: 'Customers with characteristics of vulnerability receive outcomes as good as others.',
    moduleCodes: ['CD-I5'],
    notePrefixes: ['cd-i5'],
    links: [{ label: 'CD-I5 Vulnerable Customers', url: '/cross-cutting/vulnerable-customers' }],
  },
  {
    key: 'governance_monitoring',
    title: 'Governance & monitoring',
    summary: 'Board oversight, management information and independent assurance are working.',
    moduleCodes: ['CD-P1', 'CD-M1', 'CD-M2'],
    notePrefixes: ['cd-p1', 'cd-m1', 'cd-m2'],
    links: [
      { label: 'CD-P1 Governance Framework', url: '/governance/framework' },
      { label: 'CD-M1 MI & Monitoring', url: '/monitoring/mi-monitoring' },
      { label: 'CD-M2 Testing & Assurance', url: '/monitoring/testing-assurance' },
    ],
  },
];

export type BoardVerdict = 'yes' | 'broadly' | 'not_yet';

export const VERDICT_OPTIONS: { value: BoardVerdict; label: string }[] = [
  { value: 'yes', label: 'Yes — we are delivering good outcomes' },
  { value: 'broadly', label: 'Broadly — good outcomes with identified gaps' },
  { value: 'not_yet', label: 'Not yet — material gaps remain' },
];

export interface BoardAction {
  id: string;
  rowKey: string;
  description: string;
  owner: string;
  targetDate: string;
}
