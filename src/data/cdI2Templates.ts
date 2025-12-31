import { TemplateDetails } from "@/components/modules/TemplatePreviewDialog";

export const CD_I2_TEMPLATES: TemplateDetails[] = [
  {
    id: 'cd-i2-methodology',
    name: 'Fair Value Assessment Methodology Document',
    description: 'Comprehensive methodology document establishing your organisation\'s approach to conducting fair value assessments in line with FCA expectations.',
    whatsIncluded: [
      'FVA principles and objectives',
      'Assessment methodology and factors',
      'Reasonable grounds framework',
      'Benchmarking approach',
      'Differential outcomes considerations',
      'Governance and approval process'
    ],
    howToUse: 'Develop methodology with input from product, finance, risk, and compliance. Define approach for each product category. Specify data requirements. Establish governance. Obtain board approval. Publish internally. Train assessors. Review annually.',
    fileType: 'Word',
    size: '445 KB',
    complexity: 'Advanced',
    module: 'CD-I2',
    fileName: 'CD-I2-FVA-Methodology-v1.docx'
  },
  {
    id: 'cd-i2-fva-master',
    name: 'Fair Value Assessment Template (Master)',
    description: 'Comprehensive FVA template with multi-dimensional analysis framework, worked examples, and board reporting format.',
    whatsIncluded: [
      'Multi-factor assessment framework',
      'Total costs analysis',
      'Benefits evaluation',
      'Benchmarking analysis',
      'Differential outcomes assessment',
      'Reasonable grounds documentation',
      'Board report format'
    ],
    howToUse: 'Complete annually for each product (or when material changes occur). Gather all cost and pricing data. Conduct benefit analysis. Perform benchmarking. Assess differential outcomes. Document reasonable grounds. Present to board with recommendation (continue/remediate/withdraw).',
    fileType: 'Excel',
    size: '567 KB',
    complexity: 'Advanced',
    module: 'CD-I2',
    fileName: 'CD-I2-FVA-Master-v1.xlsx'
  },
  {
    id: 'cd-i2-benchmarking',
    name: 'Price Benchmarking Template',
    description: 'Structured benchmarking template for comparing your products\' pricing and value against market comparators.',
    whatsIncluded: [
      'Comparator identification framework',
      'Like-for-like comparison methodology',
      'Feature and benefit normalisation',
      'Price positioning analysis',
      'Value assessment framework'
    ],
    howToUse: 'Identify appropriate comparators (similar products, similar target market). Gather pricing and feature data. Normalise for like-for-like comparison. Analyse price positioning. Assess value relative to market. Document findings. Use to inform fair value assessment.',
    fileType: 'Excel',
    size: '312 KB',
    complexity: 'Intermediate',
    module: 'CD-I2',
    fileName: 'CD-I2-Price-Benchmarking-v1.xlsx'
  },
  {
    id: 'cd-i2-scorecard',
    name: 'Value for Money Scorecard',
    description: 'Balanced scorecard approach to evaluating value for money across multiple dimensions with weighted scoring methodology.',
    whatsIncluded: [
      'Multi-dimensional value framework',
      'Weighted scoring methodology',
      'Quantitative and qualitative measures',
      'RAG status indicators',
      'Trend analysis',
      'Management commentary'
    ],
    howToUse: 'Define value dimensions relevant to your products. Set weightings. Establish scoring criteria. Gather data. Complete scorecard. Calculate weighted scores. Identify areas of concern. Develop improvement actions. Monitor trends over time.',
    fileType: 'PowerPoint',
    size: '289 KB',
    complexity: 'Intermediate',
    module: 'CD-I2',
    fileName: 'CD-I2-Value-Scorecard-v1.pptx'
  },
  {
    id: 'cd-i2-differential',
    name: 'Differential Outcomes Analysis Template',
    description: 'Analytical template for identifying and assessing differential outcomes by customer segment, with remediation planning.',
    whatsIncluded: [
      'Customer segmentation framework',
      'Outcome metrics by segment',
      'Statistical analysis tools',
      'Root cause analysis',
      'Remediation action planning'
    ],
    howToUse: 'Segment customers by relevant characteristics (vulnerability, engagement, demographics). Analyse outcome metrics by segment. Identify material differences. Investigate root causes. Assess if differences are justified. Develop remediation plan if not. Monitor ongoing.',
    fileType: 'Excel',
    size: '378 KB',
    complexity: 'Advanced',
    module: 'CD-I2',
    fileName: 'CD-I2-Differential-Analysis-v1.xlsx'
  },
  {
    id: 'cd-i2-remediation',
    name: 'Value Remediation Plan Template',
    description: 'Action planning template for remediating products identified as not providing fair value, including customer communication.',
    whatsIncluded: [
      'Remediation options analysis',
      'Customer impact assessment',
      'Implementation plan',
      'Communication strategy',
      'Cost-benefit analysis',
      'Board approval documentation'
    ],
    howToUse: 'When FVA identifies poor value product, evaluate remediation options (price reduction, feature enhancement, withdrawal). Assess customer impact. Develop implementation plan. Plan customer communications. Conduct cost-benefit analysis. Obtain board approval. Execute and monitor.',
    fileType: 'Word',
    size: '245 KB',
    complexity: 'Advanced',
    module: 'CD-I2',
    fileName: 'CD-I2-Value-Remediation-v1.docx'
  },
  {
    id: 'cd-i2-dashboard',
    name: 'FVA Monitoring Dashboard Specification',
    description: 'MI dashboard specification for ongoing monitoring of fair value indicators and early warning signs.',
    whatsIncluded: [
      'Leading and lagging indicators',
      'Dashboard design specification',
      'Data requirements and sources',
      'Alert thresholds and triggers',
      'Reporting frequency and ownership'
    ],
    howToUse: 'Select KPIs for ongoing value monitoring. Define data sources. Set alert thresholds. Design dashboard (use Excel or BI tool). Implement data feeds. Train users. Monitor monthly. Investigate threshold breaches. Report to product and pricing committees.',
    fileType: 'PowerPoint',
    size: '334 KB',
    complexity: 'Advanced',
    module: 'CD-I2',
    fileName: 'CD-I2-FVA-Dashboard-v1.pptx'
  },
  {
    id: 'cd-i2-board-report',
    name: 'Board FVA Report Template',
    description: 'Executive board reporting template for fair value assessment findings, conclusions, and recommendations.',
    whatsIncluded: [
      'Executive summary format',
      'Assessment findings by product',
      'Reasonable grounds documentation',
      'Differential outcomes summary',
      'Remediation recommendations',
      'Board decisions required'
    ],
    howToUse: 'Complete annually following FVA cycle. Summarise findings across portfolio. Highlight concerns and remediation needs. Provide clear recommendations. Specify board decisions required. Include supporting evidence. Present to board. Document decisions and actions.',
    fileType: 'PowerPoint',
    size: '298 KB',
    complexity: 'Intermediate',
    module: 'CD-I2',
    fileName: 'CD-I2-Board-FVA-Report-v1.pptx'
  }
];
