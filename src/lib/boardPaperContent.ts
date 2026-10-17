/**
 * Board paper content shape, persisted in board_papers.content (jsonb).
 * All narrative is human-authored. Nothing here computes a rating.
 */
export interface MiRow { id: string; metric: string; value: string; trend: string; commentary: string }
export type RiskRag = '' | 'red' | 'amber' | 'green';
export interface RiskRow { id: string; risk: string; owner: string; rag: RiskRag; due_date: string; status: string }
export interface AtAGlance { conclusion: string; key_messages: string[]; board_asks: string[] }

export const CHALLENGE_QUESTION_KEYS = [
  'products_services', 'price_value', 'consumer_understanding', 'consumer_support',
  'cross_cutting', 'vulnerable_customers', 'distribution_chain',
] as const;
export type ChallengeQuestionKey = typeof CHALLENGE_QUESTION_KEYS[number];
export type ChallengeQuestions = Record<ChallengeQuestionKey, string[]>;

export const normaliseQuestions = (raw: unknown): string[] =>
  Array.isArray(raw) ? raw.filter((v): v is string => typeof v === 'string').slice(0, 3).map((v) => v.slice(0, 220)) : [];

export const normaliseChallengeQuestions = (raw: unknown): ChallengeQuestions => {
  const value = raw && typeof raw === 'object' ? raw as Partial<ChallengeQuestions> : {};
  return Object.fromEntries(CHALLENGE_QUESTION_KEYS.map((key) => [key, normaliseQuestions(value[key])])) as ChallengeQuestions;
};

export const normaliseAtAGlance = (raw?: Partial<AtAGlance>): AtAGlance => ({
  conclusion: typeof raw?.conclusion === 'string' ? raw.conclusion : '',
  key_messages: Array.isArray(raw?.key_messages) ? raw.key_messages.filter((v): v is string => typeof v === 'string').slice(0, 3).map((v) => v.slice(0, 220)) : [],
  board_asks: Array.isArray(raw?.board_asks) ? raw.board_asks.filter((v): v is string => typeof v === 'string').slice(0, 3).map((v) => v.slice(0, 160)) : [],
});

export interface BoardPaperContent {
  at_a_glance?: AtAGlance;
  challenge_questions?: ChallengeQuestions;
  paper_date: string;
  executive_summary: string;
  scorecard_commentary: string;
  outcomes: {
    products_services: string;
    price_value: string;
    consumer_understanding: string;
    consumer_support: string;
  };
  cross_cutting: string;
  vulnerable_customers: string;
  distribution_chain: string;
  mi_rows: MiRow[];
  programme_commentary: string;
  regulatory: { included_ids: string[]; commentary: string };
  risks: RiskRow[];
  attestation: { statement: string; approver_name: string; approver_role: string; date: string };
}

export const emptyContent = (): BoardPaperContent => ({
  paper_date: '',
  executive_summary: '',
  scorecard_commentary: '',
  outcomes: { products_services: '', price_value: '', consumer_understanding: '', consumer_support: '' },
  cross_cutting: '',
  vulnerable_customers: '',
  distribution_chain: '',
  mi_rows: [],
  programme_commentary: '',
  regulatory: { included_ids: [], commentary: '' },
  risks: [],
  attestation: { statement: '', approver_name: '', approver_role: '', date: '' },
});

/** Merge stored jsonb over defaults so older/partial records stay valid. */
export const normaliseContent = (raw: unknown): BoardPaperContent => {
  const base = emptyContent();
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<BoardPaperContent>;
  return {
    ...base,
    ...r,
    ...(r.at_a_glance ? { at_a_glance: normaliseAtAGlance(r.at_a_glance) } : {}),
    ...(r.challenge_questions ? { challenge_questions: normaliseChallengeQuestions(r.challenge_questions) } : {}),
    outcomes: { ...base.outcomes, ...(r.outcomes ?? {}) },
    regulatory: { ...base.regulatory, ...(r.regulatory ?? {}) },
    attestation: { ...base.attestation, ...(r.attestation ?? {}) },
    mi_rows: Array.isArray(r.mi_rows) ? r.mi_rows : [],
    risks: Array.isArray(r.risks) ? r.risks : [],
  };
};

export const newId = () => Math.random().toString(36).slice(2, 10);
