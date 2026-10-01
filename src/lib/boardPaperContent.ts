/**
 * Board paper content shape, persisted in board_papers.content (jsonb).
 * All narrative is human-authored. Nothing here computes a rating.
 */
export interface MiRow { id: string; metric: string; value: string; trend: string; commentary: string }
export type RiskRag = '' | 'red' | 'amber' | 'green';
export interface RiskRow { id: string; risk: string; owner: string; rag: RiskRag; due_date: string; status: string }

export interface BoardPaperContent {
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
    outcomes: { ...base.outcomes, ...(r.outcomes ?? {}) },
    regulatory: { ...base.regulatory, ...(r.regulatory ?? {}) },
    attestation: { ...base.attestation, ...(r.attestation ?? {}) },
    mi_rows: Array.isArray(r.mi_rows) ? r.mi_rows : [],
    risks: Array.isArray(r.risks) ? r.risks : [],
  };
};

export const newId = () => Math.random().toString(36).slice(2, 10);
