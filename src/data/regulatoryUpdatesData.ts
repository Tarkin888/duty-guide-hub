export type RegulatoryUpdateStatus = 'Finalised' | 'Consultation' | 'Interim' | 'Fact';

export interface RegulatoryUpdate {
  id: string;
  date: string;
  title: string;
  status: RegulatoryUpdateStatus;
  summary: string;
  implication: string;
  relatesTo: string;
  source: string;
}

export const regulatoryUpdates: RegulatoryUpdate[] = [
  {
    id: 'ru-2026-07-10-price-value',
    date: '10 July 2026',
    title: 'Price and Value: good practice update',
    status: 'Finalised',
    summary:
      'The FCA updated its Price and Value good and poor practice publication. It follows continued supervisory pressure on fair value, including the earlier TR24/2 finding that many general insurance and pure protection firms were still not delivering fair value, and the GAP insurance intervention in which sales were paused until firms could demonstrate fair value.',
    implication:
      'Fair value assessments should reach a conclusion and drive action, not simply record that a process was followed. The GAP insurance pause remains the template for how the FCA escalates where value cannot be demonstrated.',
    relatesTo: 'Price and Value Outcome (CD-I2)',
    source: 'FCA Price and Value good and poor practice, updated 10 July 2026',
  },
  {
    id: 'ru-2026-06-29-cp2623',
    date: '29 June 2026',
    title: 'CP26/23 Consumer Duty: scope and proportionality',
    status: 'Consultation',
    summary:
      "The FCA's rebalancing consultation. It proposes to limit the Duty's territorial scope to retail customers usually resident in the UK, restructure the definition of retail market business, replace co-manufacturing with a framework of primary and secondary manufacturers, and exclude several wholesale activities such as market making, custody, safeguarding and merchant acquiring.",
    implication:
      'These are proposals, not current rules. Firms that are wholesale, in complex distribution chains, or serving non-UK customers should consider responding by 18 September 2026. Do not rewrite scope wording in your own documentation until final rules land, expected Q1 2027.',
    relatesTo: 'Distribution Chain Management (CD-I6); scope',
    source: 'FCA CP26/23, 29 June 2026',
  },
  {
    id: 'ru-2026-04-16-year-2-board-reports',
    date: '16 April 2026',
    title: 'Year 2 board reports: FCA observations',
    status: 'Finalised',
    summary:
      'The FCA reviewed 180 first-year and 80 second-year board reports. Firms are maturing, but four areas need improvement: link data clearly to outcomes rather than presenting MI dashboards; monitor outcomes delivered by third parties and distribution chains; document board challenge in papers and minutes; and deepen the evidence on consumer understanding and support.',
    implication:
      'A board report that presents data without conclusions is now a documented weakness. Board minutes should record the challenge given, questions asked and follow-ups requested.',
    relatesTo: 'Board and Executive Reporting (CD-M3); Ongoing Compliance (OC-1, OC-2)',
    source: 'FCA, Year 2 Consumer Duty Board Reports, 16 April 2026',
  },
  {
    id: 'ru-2026-03-27-fca-ico-vulnerability',
    date: '27 March 2026',
    title: 'FCA and ICO joint statement on vulnerability data',
    status: 'Finalised',
    summary:
      'The first coordinated FCA and ICO guidance confirms that UK GDPR, the Data Protection Act 2018 and PECR do not prevent firms from identifying and supporting vulnerable customers. It covers supporting vulnerable consumers, sharing vulnerability data across distribution chains where necessary to deliver good outcomes (subject to data minimisation, purpose limitation and contractual protections), and monitoring whether vulnerable consumers achieve outcomes comparable to others.',
    implication:
      'Data protection is no longer a defensible reason for failing to identify or support vulnerable customers. Boards should expect to see evidence that vulnerable-customer outcomes are monitored and that poorer outcomes are remediated.',
    relatesTo: 'Vulnerable Customer Framework (CD-I5); Distribution Chain Management (CD-I6)',
    source: 'FCA and ICO joint statement, 27 March 2026',
  },
  {
    id: 'ru-2026-03-16-redress-modernisation',
    date: '16 March 2026',
    title: 'Redress modernisation: CP26/9 and FG26/2',
    status: 'Finalised',
    summary:
      'The FCA and FOS published consultation CP26/9 alongside finalised guidance FG26/2 on identifying and rectifying harm. Confirmed changes include revised criteria for identifying mass redress events, a readiness-for-investigation framework, and updated SUP 15 reporting guidance clarifying when firms should report redress issues, in force from 1 June 2026. FG26/2 also reinforces that ineffective communication can cause foreseeable harm. Note: CP26/9 itself remains a consultation.',
    implication:
      'Redress is shifting from reactive remediation to proactive identification and rectification of harm, and should be treated as part of the Consumer Duty control environment rather than a standalone process.',
    relatesTo: 'Consumer Support (CD-I4); Testing and Assurance (CD-M2)',
    source: 'FCA and FOS CP26/9 and FG26/2, 16 March 2026; SUP 15 guidance from 1 June 2026',
  },
  {
    id: 'ru-2026-03-13-consumer-understanding',
    date: '13 March 2026',
    title: 'Consumer understanding: good practice and areas for improvement',
    status: 'Finalised',
    summary:
      "Based on a September 2025 survey of 38 firms and the 2024 Financial Lives Survey. The recurring weakness was firms relying on sales data or the absence of complaints as proof that customers understand. The FCA said this provides no reliable assurance, whatever the firm's size. Good practice included using call listening, complaints, chat transcripts, website analytics and drop-off data, and testing communications with real customers before and after changes. This is a good and poor practice report, not new Handbook rules.",
    implication:
      'Absence of complaints is not evidence of understanding. Consumer understanding should be tested directly with customers, including those with accessibility needs and lower financial capability.',
    relatesTo: 'Consumer Understanding Outcome (CD-I3); Testing and Assurance (CD-M2)',
    source: 'FCA, Consumer understanding: good practice and areas for improvement, 13 March 2026',
  },
  {
    id: 'ru-2026-02-premium-finance',
    date: 'February 2026',
    title: 'Premium finance market study (MS24/2) concluded',
    status: 'Finalised',
    summary:
      'The FCA concluded its premium finance market study with no market-wide APR cap, while signalling continued supervisory pressure. It observed that the cost of paying monthly for insurance had fallen following the Duty.',
    implication:
      'The absence of a cap does not reduce fair-value scrutiny of premium finance. Firms should still evidence that the cost of paying in instalments is fair.',
    relatesTo: 'Price and Value Outcome (CD-I2)',
    source: 'FCA MS24/2, February 2026',
  },
  {
    id: 'ru-2026-01-enforcement-live',
    date: 'January 2026 onward',
    title: 'Enforcement is now live',
    status: 'Fact',
    summary:
      "The FCA's first Enforcement Watch (January 2026) disclosed six potential Consumer Duty breaches under investigation, particularly on fair value. The second Enforcement Watch updated this to 11 open Consumer Duty enforcement operations across insurance, pensions, wealth, consumer investments, P2P lending and claims management. The FCA confirmed it has used voluntary and own-initiative requirements to restrict firms while investigations continue. These are investigations, not findings of breach, and firms are unnamed.",
    implication:
      'Enforcement is no longer hypothetical, and fair value is the leading theme. Firms should assume the ability to evidence fair value will be tested.',
    relatesTo: 'Risk and Impact Assessment (CD-F3); Price and Value (CD-I2)',
    source: 'FCA Enforcement Watch 1 (January 2026) and Enforcement Watch 2',
  },
  {
    id: 'ru-2025-12-08-co-manufacturing',
    date: '8 December 2025',
    title: 'Statement on co-manufacturing',
    status: 'Interim',
    summary:
      'The FCA clarified a proportionate application of the current rules where firms work together to manufacture products. It does not require co-manufacturers to engage in joint decision-making where roles are distinct, and it proposed allowing co-insuring firms to appoint a lead firm with sole responsibility for PROD 4 manufacturer obligations. This was the precursor to CP26/23.',
    implication:
      'An interim clarification. The direction of travel, primary and secondary manufacturers, is now set out in CP26/23 and remains at consultation stage.',
    relatesTo: 'Distribution Chain Management (CD-I6)',
    source: 'FCA statement on co-manufacturing, 8 December 2025',
  },
  {
    id: 'ru-2025-09-30-requirements-package',
    date: '30 September 2025',
    title: 'September 2025 requirements package',
    status: 'Finalised',
    summary:
      "The FCA published a review of the Duty's requirements, its focus areas for 2025/26, and a letter to the Chancellor on the Duty's application to wholesale firms. It set out a four-point plan: clearer co-manufacturing guidance; updated client categorisation; consulting on how the Duty applies across distribution chains; and removing business with non-UK customers from scope. As part of simplification, the FCA retired over 90 Dear CEO and portfolio letters (April 2025) and more than 100 multi-firm and thematic reports (August 2025).",
    implication:
      'The rebalancing programme began here. It signals proportionality without diluting the core outcomes obligation.',
    relatesTo: 'Regulatory Requirements Mapping (CD-F2)',
    source: 'FCA requirements review and focus areas, 30 September 2025',
  },
];
