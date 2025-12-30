import { TemplateDetails } from "@/components/modules/TemplatePreviewDialog";

export const CD_F2_TEMPLATES: TemplateDetails[] = [
  {
    id: 'cd-f2-register',
    name: 'Regulatory Obligations Register',
    description: 'Comprehensive register mapping all Consumer Duty obligations to your organisation, ensuring complete regulatory coverage and traceability.',
    whatsIncluded: [
      'Complete PRIN 2A requirements mapping',
      'Four outcomes obligation breakdown',
      'Cross-cutting rules analysis',
      'Handbook reference integration',
      'Ownership and accountability assignment'
    ],
    howToUse: 'Work through FCA Handbook PRIN 2A systematically. Extract each obligation. Categorise by outcome and function. Assign ownership. Link to policies and controls. Update quarterly as regulatory guidance evolves.',
    fileType: 'Excel',
    size: '312 KB',
    complexity: 'Advanced',
    module: 'CD-F2',
    fileName: 'CD-F2-Regulatory-Register-v1.xlsx'
  },
  {
    id: 'cd-f2-traceability',
    name: 'Requirements Traceability Matrix',
    description: 'End-to-end traceability tool linking FCA requirements through to policies, procedures, controls, and evidence, enabling regulatory inspection readiness.',
    whatsIncluded: [
      'Requirements to controls mapping',
      'Policy and procedure linkage',
      'Evidence repository references',
      'Testing and assurance tracking',
      'Gap identification and remediation'
    ],
    howToUse: 'For each regulatory requirement, identify corresponding policies, procedures, controls, and evidence. Map relationships. Identify gaps where controls don\'t exist. Track remediation actions. Update after control testing.',
    fileType: 'Excel',
    size: '267 KB',
    complexity: 'Advanced',
    module: 'CD-F2',
    fileName: 'CD-F2-Traceability-Matrix-v1.xlsx'
  },
  {
    id: 'cd-f2-target-market',
    name: 'Target Market Definition Template',
    description: 'Structured framework for defining and documenting target markets for products and services in accordance with Consumer Duty expectations.',
    whatsIncluded: [
      'Target market characteristics framework',
      'Needs and objectives analysis',
      'Distribution strategy alignment',
      'Negative target market identification',
      'Board approval documentation'
    ],
    howToUse: 'Complete for each product/service. Define positive target market characteristics (demographics, needs, objectives). Identify negative target markets (who product is NOT suitable for). Align distribution strategy. Document board approval.',
    fileType: 'Word',
    size: '189 KB',
    complexity: 'Intermediate',
    module: 'CD-F2',
    fileName: 'CD-F2-Target-Market-v1.docx'
  },
  {
    id: 'cd-f2-distribution',
    name: 'Distribution Chain Mapping Template',
    description: 'Visual mapping tool identifying all parties in your distribution chains, their roles, responsibilities, and information sharing requirements.',
    whatsIncluded: [
      'Distribution chain visualisation',
      'Manufacturer/distributor role definition',
      'Information sharing requirements',
      'Oversight arrangements',
      'Agreement schedule tracker'
    ],
    howToUse: 'Map all distribution channels for each product. Identify each party and their role (manufacturer, distributor, both). Define information sharing requirements. Document oversight arrangements. Track distribution agreements and renewal dates.',
    fileType: 'PowerPoint',
    size: '201 KB',
    complexity: 'Intermediate',
    module: 'CD-F2',
    fileName: 'CD-F2-Distribution-Map-v1.pptx'
  },
  {
    id: 'cd-f2-outcomes',
    name: 'Four Outcomes Assessment Checklist',
    description: 'Comprehensive checklist evaluating compliance across all four Consumer Duty outcomes with evidence requirements and action tracking.',
    whatsIncluded: [
      'Outcome-by-outcome assessment criteria',
      'Evidence requirement specification',
      'Compliance scoring methodology',
      'Action planning framework',
      'Progress tracking dashboard'
    ],
    howToUse: 'Assess each outcome systematically using checklist criteria. Gather evidence for each requirement. Score compliance level. Identify gaps and actions needed. Assign ownership and deadlines. Track progress monthly.',
    fileType: 'Excel',
    size: '278 KB',
    complexity: 'Intermediate',
    module: 'CD-F2',
    fileName: 'CD-F2-Outcomes-Checklist-v1.xlsx'
  },
  {
    id: 'cd-f2-fva',
    name: 'Fair Value Assessment Framework',
    description: 'Detailed methodology and template for conducting fair value assessments under the Price and Value outcome, including worked examples.',
    whatsIncluded: [
      'Multi-factor assessment methodology',
      'Price benchmarking framework',
      'Total costs analysis',
      'Benefits evaluation criteria',
      'Differential outcomes considerations',
      'Board reporting template'
    ],
    howToUse: 'Complete for each product annually (or when material changes occur). Gather pricing data, cost breakdowns, benefit specifications. Conduct benchmarking analysis. Assess differential outcomes by customer segment. Document reasonable grounds. Present to board with recommendation.',
    fileType: 'Excel',
    size: '445 KB',
    complexity: 'Advanced',
    module: 'CD-F2',
    fileName: 'CD-F2-FVA-Framework-v1.xlsx'
  }
];
