import { Template } from '@/data/templatesData';
import { trackTemplateDownload } from '@/lib/moduleCompletionValidation';

// Generate a sanitized filename from template name
const sanitizeFilename = (name: string): string => {
  return name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Generate file extension from file type
const getExtension = (fileType: string): string => {
  const extensions: Record<string, string> = {
    xlsx: '.xlsx',
    docx: '.docx',
    pptx: '.pptx',
    pdf: '.pdf',
  };
  return extensions[fileType] || '.txt';
};

// MIME types for different file formats
const getMimeType = (fileType: string): string => {
  const mimeTypes: Record<string, string> = {
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    pdf: 'application/pdf',
  };
  return mimeTypes[fileType] || 'application/octet-stream';
};

// Generate Excel file content (simplified XML-based xlsx)
const generateExcelContent = (template: Template): string => {
  const rows = [
    `CONSUMER DUTY IMPLEMENTATION PLAYBOOK`,
    `${template.name}`,
    ``,
    `Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    `Module Reference: ${template.moduleReference}`,
    ``,
    `DESCRIPTION`,
    template.fullDescription,
    ``,
    `WHAT'S INCLUDED`,
    ...template.whatIncluded.map((item, i) => `${i + 1}. ${item}`),
    ``,
    `HOW TO USE`,
    template.howToUse,
    ``,
    `PREREQUISITES`,
    template.prerequisites.length > 0 ? template.prerequisites.join(', ') : 'None',
    ``,
    `TARGET USERS`,
    template.targetUsers.join(', '),
    ``,
    `---`,
    `This is a template placeholder. In a production environment, this would contain`,
    `the full Excel workbook with formatted sheets, formulas, and data validation.`,
    ``,
    `For implementation support, refer to the Consumer Duty Implementation Playbook.`,
  ];
  
  return rows.join('\n');
};

// Generate Word document content
const generateWordContent = (template: Template): string => {
  return `
CONSUMER DUTY IMPLEMENTATION PLAYBOOK
=====================================

${template.name}
${'='.repeat(template.name.length)}

Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Module Reference: ${template.moduleReference}
Last Updated: ${template.lastUpdated}

DESCRIPTION
-----------
${template.fullDescription}

WHAT'S INCLUDED
---------------
${template.whatIncluded.map((item, i) => `${i + 1}. ${item}`).join('\n')}

HOW TO USE
----------
${template.howToUse}

PREREQUISITES
-------------
${template.prerequisites.length > 0 ? template.prerequisites.join('\n') : 'None'}

TARGET USERS
------------
${template.targetUsers.join(', ')}

KEYWORDS
--------
${template.keywords.join(', ')}

---

[TEMPLATE CONTENT BEGINS HERE]

This is a template placeholder document. In a production environment, 
this would contain the fully formatted Word document with:

• Professional styling and branding
• Pre-formatted sections and tables
• Guidance notes and instructions
• Placeholder text for customisation
• Version control information

For implementation support, please refer to the Consumer Duty 
Implementation Playbook modules.

---
Consumer Duty Implementation Playbook
© ${new Date().getFullYear()} All rights reserved
`;
};

// Generate PowerPoint content
const generatePowerPointContent = (template: Template): string => {
  return `
CONSUMER DUTY IMPLEMENTATION PLAYBOOK
=====================================
PRESENTATION TEMPLATE

${template.name}

Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Module Reference: ${template.moduleReference}

---

SLIDE 1: TITLE
${template.name}
Consumer Duty Implementation

---

SLIDE 2: OVERVIEW
${template.description}

---

SLIDE 3: WHAT'S INCLUDED
${template.whatIncluded.map((item, i) => `• ${item}`).join('\n')}

---

SLIDE 4: HOW TO USE
${template.howToUse}

---

SLIDE 5: TARGET AUDIENCE
${template.targetUsers.map(user => `• ${user}`).join('\n')}

---

[ADDITIONAL SLIDES]

This is a presentation template placeholder. In a production environment,
this would contain the fully formatted PowerPoint presentation with:

• Professional slide designs and branding
• Charts and diagrams
• Speaker notes
• Editable content areas
• Animation and transitions

---
Consumer Duty Implementation Playbook
`;
};

// Generate PDF content (text representation)
const generatePDFContent = (template: Template): string => {
  return `
%PDF-1.4
CONSUMER DUTY IMPLEMENTATION PLAYBOOK
=====================================

${template.name}

Document Information
--------------------
Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Module Reference: ${template.moduleReference}
File Type: PDF Document
Complexity: ${template.complexity}

Description
-----------
${template.fullDescription}

Contents
--------
${template.whatIncluded.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Usage Instructions
------------------
${template.howToUse}

Target Users
------------
${template.targetUsers.join(', ')}

---

This is a PDF template placeholder. In a production environment,
this would contain the fully formatted PDF document with:

• Professional layout and branding
• Form fields where applicable
• Bookmarks and navigation
• Accessible formatting
• Digital signature areas if required

---
Consumer Duty Implementation Playbook
© ${new Date().getFullYear()} All rights reserved
`;
};

// Generate content based on file type
const generateContent = (template: Template): string => {
  switch (template.fileType) {
    case 'xlsx':
      return generateExcelContent(template);
    case 'docx':
      return generateWordContent(template);
    case 'pptx':
      return generatePowerPointContent(template);
    case 'pdf':
      return generatePDFContent(template);
    default:
      return generateWordContent(template);
  }
};

// Convert module reference to storage key format
const getModuleStorageKey = (moduleRef: string): string => {
  const refMap: Record<string, string> = {
    'CD-F1': 'cd-f1-readiness',
    'CD-F2': 'cd-f2-requirements',
    'CD-F3': 'cd-f3-risk-assessment',
    'CD-P1': 'cd-p1-governance-framework',
    'CD-P2': 'cd-p2-policy-framework',
    'CD-P3': 'cd-p3-implementation-roadmap',
    'CD-I1': 'cd-i1-products-services',
    'CD-I2': 'cd-i2-price-value',
    'CD-I3': 'cd-i3-consumer-understanding',
    'CD-I4': 'cd-i4-consumer-support',
    'CD-I5': 'cd-i5-vulnerable-customers',
    'CD-I6': 'cd-i6-distribution-chain',
    'CD-I7': 'cd-i7-data-evidence',
    'CD-T1': 'cd-t1-training',
    'CD-T2': 'cd-t2-communications-change',
    'CD-T3': 'cd-t3-technology-requirements',
    'CD-M1': 'cd-m1-mi-framework',
    'CD-M2': 'cd-m2-testing-assurance',
    'CD-M3': 'cd-m3-board-reporting',
    'CD-M4': 'cd-m4-continuous-improvement',
  };
  return refMap[moduleRef] || moduleRef.toLowerCase().replace(/-/g, '-');
};

// Main download function
export const downloadTemplate = (template: Template, moduleId?: string): void => {
  const filename = `${sanitizeFilename(template.name)}${getExtension(template.fileType)}`;
  const content = generateContent(template);
  const mimeType = getMimeType(template.fileType);
  
  // Track the download for module completion validation
  const storageKey = moduleId || getModuleStorageKey(template.moduleReference);
  trackTemplateDownload(storageKey, template.id);
  
  // Create blob and download
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

// Bulk download function for multiple templates
export const downloadMultipleTemplates = async (templates: Template[]): Promise<void> => {
  for (const template of templates) {
    downloadTemplate(template);
    // Small delay between downloads to prevent browser blocking
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
