import { Template } from '@/data/templatesData';
import { trackTemplateDownload } from '@/lib/moduleCompletionValidation';

// Generate a sanitised filename fragment from a template name
const sanitiseFilename = (name: string): string =>
  name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const getExtension = (fileType: string): string => {
  const extensions: Record<string, string> = {
    xlsx: 'xlsx',
    docx: 'docx',
    pptx: 'pptx',
    pdf: 'pdf',
  };
  return extensions[fileType] || 'txt';
};

// Public download filename: [Module-Code]-[Template-Name]-v[n].[ext]
export const getDownloadFilename = (template: Template): string =>
  `${template.moduleReference}-${sanitiseFilename(template.name)}-v${template.version}.${getExtension(template.fileType)}`;

// Convert module reference to storage key format used by progress tracking
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
  return refMap[moduleRef] || moduleRef.toLowerCase();
};

export class TemplateDownloadError extends Error {}

/**
 * Fetch the real file from /public/templates and trigger a browser download.
 * Throws TemplateDownloadError if the template is not available or the fetch fails,
 * so callers can surface an error to the user. Never fails silently.
 */
export const downloadTemplate = async (template: Template, moduleId?: string): Promise<void> => {
  if (template.fileStatus !== 'available') {
    throw new TemplateDownloadError('This template is not yet available to download.');
  }

  let response: Response;
  try {
    response = await fetch(template.filePath, { cache: 'no-store' });
  } catch {
    throw new TemplateDownloadError('The file could not be reached. Check your connection and try again.');
  }

  if (!response.ok) {
    throw new TemplateDownloadError(`The file could not be retrieved (error ${response.status}).`);
  }

  const blob = await response.blob();
  if (blob.size === 0) {
    throw new TemplateDownloadError('The file appears to be empty.');
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = getDownloadFilename(template);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 100);

  // Record the download only after it has genuinely succeeded
  trackTemplateDownload(moduleId || getModuleStorageKey(template.moduleReference), template.id);
};

export const downloadMultipleTemplates = async (templates: Template[]): Promise<void> => {
  for (const template of templates.filter(t => t.fileStatus === 'available')) {
    await downloadTemplate(template);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
