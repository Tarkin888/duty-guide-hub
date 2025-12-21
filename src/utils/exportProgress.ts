import { jsPDF } from 'jspdf';
import { getProgressSummary } from './storageHelpers';

const MODULE_DETAILS: Record<string, { name: string; category: string }> = {
  'CD-F1': { name: 'Readiness Assessment', category: 'Foundation' },
  'CD-F2': { name: 'Requirements Mapping', category: 'Foundation' },
  'CD-F3': { name: 'Risk & Impact', category: 'Foundation' },
  'CD-P1': { name: 'Governance Framework', category: 'Governance & Planning' },
  'CD-P2': { name: 'Policy Development', category: 'Governance & Planning' },
  'CD-P3': { name: 'Implementation Roadmap', category: 'Governance & Planning' },
  'CD-I1': { name: 'Products & Services', category: 'Four Outcomes' },
  'CD-I2': { name: 'Price & Value', category: 'Four Outcomes' },
  'CD-I3': { name: 'Consumer Understanding', category: 'Four Outcomes' },
  'CD-I4': { name: 'Consumer Support', category: 'Four Outcomes' },
  'CD-I5': { name: 'Vulnerable Customers', category: 'Cross-Cutting' },
  'CD-I6': { name: 'Distribution Chain', category: 'Cross-Cutting' },
  'CD-I7': { name: 'Data & Evidence', category: 'Cross-Cutting' },
  'CD-T1': { name: 'Training', category: 'Enablement' },
  'CD-T2': { name: 'Change Management', category: 'Enablement' },
  'CD-T3': { name: 'Technology', category: 'Enablement' },
  'CD-M1': { name: 'MI & Monitoring', category: 'Monitoring & Assurance' },
  'CD-M2': { name: 'Testing & Assurance', category: 'Monitoring & Assurance' },
  'CD-M3': { name: 'Board Reporting', category: 'Monitoring & Assurance' },
  'CD-M4': { name: 'Continuous Improvement', category: 'Monitoring & Assurance' },
};

const STORAGE_KEY = 'consumer-duty-progress';

const getAllModuleStatuses = (): Record<string, string> => {
  const statuses: Record<string, string> = {};
  const progressData = localStorage.getItem(STORAGE_KEY);
  
  if (progressData) {
    try {
      const parsed = JSON.parse(progressData);
      Object.entries(parsed).forEach(([moduleId, data]: [string, any]) => {
        if (data?.status) {
          statuses[moduleId] = data.status;
        }
      });
    } catch (e) {
      console.error('Failed to parse progress data:', e);
    }
  }
  
  return statuses;
};

export const exportProgressToPDF = () => {
  const doc = new jsPDF();
  const statuses = getAllModuleStatuses();
  const startDate = localStorage.getItem('implementation-start-date');

  // Title
  doc.setFontSize(20);
  doc.text('Consumer Duty Implementation Progress Report', 20, 20);

  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

  // Summary Statistics
  const completed = Object.values(statuses).filter(s => s === 'complete' || s === 'completed').length;
  const inProgress = Object.values(statuses).filter(s => s === 'in-progress').length;
  const overallProgress = Math.round((completed / 20) * 100);

  doc.setFontSize(12);
  doc.text('Progress Summary', 20, 45);
  doc.setFontSize(10);
  doc.text(`Overall Progress: ${overallProgress}%`, 20, 55);
  doc.text(`Completed Modules: ${completed} of 20`, 20, 62);
  doc.text(`In Progress: ${inProgress}`, 20, 69);
  doc.text(`Not Started: ${20 - completed - inProgress}`, 20, 76);

  if (startDate) {
    const days = Math.floor((new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    doc.text(`Days Since Started: ${days}`, 20, 83);
  }

  // Module Status by Category
  let yPos = 100;
  doc.setFontSize(12);
  doc.text('Module Status', 20, yPos);
  yPos += 10;

  doc.setFontSize(9);
  Object.entries(MODULE_DETAILS).forEach(([moduleId, details]) => {
    const status = statuses[moduleId] || 'not-started';
    const statusText = (status === 'complete' || status === 'completed') ? '✓ Complete' :
      status === 'in-progress' ? '◐ In Progress' :
      '○ Not Started';

    doc.text(`${moduleId}: ${details.name}`, 20, yPos);
    doc.text(statusText, 150, yPos);
    yPos += 7;

    // Add new page if needed
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
  });

  // Save
  doc.save(`Consumer-Duty-Progress-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportProgressToCSV = () => {
  const statuses = getAllModuleStatuses();
  let csv = 'Module ID,Module Name,Category,Status\n';

  Object.entries(MODULE_DETAILS).forEach(([moduleId, details]) => {
    const status = statuses[moduleId] || 'not-started';
    csv += `${moduleId},"${details.name}","${details.category}",${status}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Consumer-Duty-Progress-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
