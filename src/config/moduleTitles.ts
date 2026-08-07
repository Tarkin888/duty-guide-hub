/**
 * CANONICAL MODULE TITLES
 *
 * The full title rendered in each module's page header. The registry display
 * name (used in toasts, dashboards and reports) must match these exactly —
 * `src/test/nameaudit.test.ts` fails if they ever diverge.
 */
export const CANONICAL_MODULE_TITLES: Record<string, string> = {
  'CD-F1': 'Consumer Duty Readiness Assessment',
  'CD-F2': 'Regulatory Requirements Mapping',
  'CD-F3': 'Risk & Impact Assessment',
  'CD-P1': 'Governance Framework Design',
  'CD-P2': 'Policy & Framework Development',
  'CD-P3': 'Implementation Roadmap Development',
  'CD-I1': 'Products & Services Outcome Implementation',
  'CD-I2': 'Price & Value Outcome Implementation',
  'CD-I3': 'Consumer Understanding Outcome Implementation',
  'CD-I4': 'Consumer Support Outcome Implementation',
  'CD-I5': 'Vulnerable Customers Framework',
  'CD-I6': 'Distribution Chain Management',
  'CD-I7': 'Data & Evidence Management Framework',
  'CD-T1': 'Training Programme Delivery',
  'CD-T2': 'Communications & Change Management',
  'CD-T3': 'Technology Requirements & System Configuration',
  'CD-M1': 'Ongoing Monitoring & MI Framework',
  'CD-M2': 'Testing & Assurance Programme',
  'CD-M3': 'Annual Board Attestation & Reporting',
  'CD-M4': 'Continuous Improvement Framework',
};
