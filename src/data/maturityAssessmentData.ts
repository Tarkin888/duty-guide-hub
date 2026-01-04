export interface AssessmentQuestion {
  id: string;
  outcome: 'products_services' | 'price_value' | 'consumer_understanding' | 'consumer_support';
  question: string;
  description: string;
}

export const OUTCOME_LABELS: Record<string, string> = {
  products_services: 'Products & Services',
  price_value: 'Price & Value',
  consumer_understanding: 'Consumer Understanding',
  consumer_support: 'Consumer Support',
};

export const OUTCOME_COLORS: Record<string, string> = {
  products_services: 'hsl(var(--primary))',
  price_value: 'hsl(var(--chart-2))',
  consumer_understanding: 'hsl(var(--chart-3))',
  consumer_support: 'hsl(var(--chart-4))',
};

export const OUTCOME_MODULES: Record<string, string[]> = {
  products_services: ['CD-I1', 'CD-I6'],
  price_value: ['CD-I2'],
  consumer_understanding: ['CD-I3', 'CD-I5'],
  consumer_support: ['CD-I4', 'CD-I5'],
};

export const assessmentQuestions: AssessmentQuestion[] = [
  // Products & Services (5 questions)
  {
    id: 'ps1',
    outcome: 'products_services',
    question: 'Product Design & Target Market',
    description: 'We have clearly defined target markets for all products and regularly review whether products meet customer needs.',
  },
  {
    id: 'ps2',
    outcome: 'products_services',
    question: 'Product Governance',
    description: 'We have robust product governance frameworks with documented approval processes and ongoing monitoring.',
  },
  {
    id: 'ps3',
    outcome: 'products_services',
    question: 'Distribution Strategy',
    description: 'Our distribution channels are appropriate for target markets and we monitor distributor compliance.',
  },
  {
    id: 'ps4',
    outcome: 'products_services',
    question: 'Product Reviews',
    description: 'We conduct regular product reviews to assess whether products continue to deliver good outcomes.',
  },
  {
    id: 'ps5',
    outcome: 'products_services',
    question: 'Harm Prevention',
    description: 'We have mechanisms to identify and prevent foreseeable harms from our products and services.',
  },

  // Price & Value (5 questions)
  {
    id: 'pv1',
    outcome: 'price_value',
    question: 'Fair Value Assessment',
    description: 'We systematically assess whether the price customers pay is reasonable relative to the benefits received.',
  },
  {
    id: 'pv2',
    outcome: 'price_value',
    question: 'Cost Transparency',
    description: 'All costs, fees, and charges are clearly disclosed and customers understand what they are paying for.',
  },
  {
    id: 'pv3',
    outcome: 'price_value',
    question: 'Value Documentation',
    description: 'We maintain documented fair value assessments for each product with clear methodology.',
  },
  {
    id: 'pv4',
    outcome: 'price_value',
    question: 'Pricing Reviews',
    description: 'We regularly review pricing to ensure it remains fair and competitive over time.',
  },
  {
    id: 'pv5',
    outcome: 'price_value',
    question: 'Cross-Subsidisation',
    description: 'We monitor for unfair cross-subsidisation where some customers pay more to benefit others.',
  },

  // Consumer Understanding (5 questions)
  {
    id: 'cu1',
    outcome: 'consumer_understanding',
    question: 'Communication Clarity',
    description: 'Our communications are clear, fair, and not misleading, using plain language customers understand.',
  },
  {
    id: 'cu2',
    outcome: 'consumer_understanding',
    question: 'Information Testing',
    description: 'We test our communications with customers to ensure they are understood as intended.',
  },
  {
    id: 'cu3',
    outcome: 'consumer_understanding',
    question: 'Channel Appropriateness',
    description: 'We use appropriate channels to communicate with different customer segments effectively.',
  },
  {
    id: 'cu4',
    outcome: 'consumer_understanding',
    question: 'Key Information Prominence',
    description: 'Important information is prominent and customers receive it at the right time to make decisions.',
  },
  {
    id: 'cu5',
    outcome: 'consumer_understanding',
    question: 'Informed Decision Making',
    description: 'We enable customers to make informed decisions by providing balanced information about products.',
  },

  // Consumer Support (5 questions)
  {
    id: 'cs1',
    outcome: 'consumer_support',
    question: 'Support Accessibility',
    description: 'Customers can easily access support through multiple channels appropriate to their needs.',
  },
  {
    id: 'cs2',
    outcome: 'consumer_support',
    question: 'Complaint Handling',
    description: 'We have effective complaint handling processes that resolve issues promptly and fairly.',
  },
  {
    id: 'cs3',
    outcome: 'consumer_support',
    question: 'Vulnerable Customer Support',
    description: 'We identify and provide enhanced support for customers in vulnerable circumstances.',
  },
  {
    id: 'cs4',
    outcome: 'consumer_support',
    question: 'Friction-Free Experience',
    description: 'We remove unreasonable barriers that make it harder for customers to act in their interests.',
  },
  {
    id: 'cs5',
    outcome: 'consumer_support',
    question: 'Post-Sale Support',
    description: 'We provide ongoing support throughout the customer relationship, not just at point of sale.',
  },
];

export const RATING_LABELS: Record<number, { label: string; description: string }> = {
  1: { label: 'Initial', description: 'Ad-hoc, no formal processes' },
  2: { label: 'Developing', description: 'Some processes, inconsistent application' },
  3: { label: 'Defined', description: 'Documented processes, regular application' },
  4: { label: 'Managed', description: 'Measured outcomes, continuous monitoring' },
  5: { label: 'Optimised', description: 'Best practice, continuous improvement' },
};
