import { jsPDF } from 'jspdf';
import { useProgressStore, MODULE_CATEGORIES, TOTAL_MODULES } from '@/stores/progressStore';
import { format } from 'date-fns';

const MODULE_DETAILS: Record<string, { name: string; category: string; route: string }> = {
  'CD-F1': { name: 'Readiness Assessment', category: 'Foundation', route: '/foundation/readiness' },
  'CD-F2': { name: 'Requirements Mapping', category: 'Foundation', route: '/foundation/requirements' },
  'CD-F3': { name: 'Risk & Impact Assessment', category: 'Foundation', route: '/foundation/risk-impact' },
  'CD-P1': { name: 'Governance Framework', category: 'Governance & Planning', route: '/governance/framework' },
  'CD-P2': { name: 'Policy Framework', category: 'Governance & Planning', route: '/governance/policy' },
  'CD-P3': { name: 'Implementation Roadmap', category: 'Governance & Planning', route: '/governance/roadmap' },
  'CD-I1': { name: 'Products & Services', category: 'Four Outcomes', route: '/outcomes/products-services' },
  'CD-I2': { name: 'Price & Value', category: 'Four Outcomes', route: '/outcomes/price-value' },
  'CD-I3': { name: 'Consumer Understanding', category: 'Four Outcomes', route: '/outcomes/consumer-understanding' },
  'CD-I4': { name: 'Consumer Support', category: 'Four Outcomes', route: '/outcomes/consumer-support' },
  'CD-I5': { name: 'Vulnerable Customers', category: 'Cross-Cutting', route: '/cross-cutting/vulnerable-customers' },
  'CD-I6': { name: 'Distribution Chain', category: 'Cross-Cutting', route: '/cross-cutting/distribution-chain' },
  'CD-I7': { name: 'Data & Evidence', category: 'Cross-Cutting', route: '/cross-cutting/data-evidence' },
  'CD-T1': { name: 'Training Programme', category: 'Enablement', route: '/enablement/training' },
  'CD-T2': { name: 'Communications & Change', category: 'Enablement', route: '/enablement/communications' },
  'CD-T3': { name: 'Technology Requirements', category: 'Enablement', route: '/enablement/technology' },
  'CD-M1': { name: 'MI Framework', category: 'Monitoring & Assurance', route: '/monitoring/mi-monitoring' },
  'CD-M2': { name: 'Testing & Assurance', category: 'Monitoring & Assurance', route: '/monitoring/testing-assurance' },
  'CD-M3': { name: 'Board Reporting', category: 'Monitoring & Assurance', route: '/monitoring/board-reporting' },
  'CD-M4': { name: 'Continuous Improvement', category: 'Monitoring & Assurance', route: '/monitoring/continuous-improvement' },
};

const CATEGORY_ORDER = [
  'Foundation',
  'Governance & Planning', 
  'Four Outcomes',
  'Cross-Cutting',
  'Enablement',
  'Monitoring & Assurance'
];

interface ProgressData {
  modules: Record<string, { status: string; lastUpdated?: string; completedAt?: string }>;
  startDate: string | null;
  activities: Array<{ moduleId: string; moduleName: string; type: string; timestamp: string }>;
}

const getProgressData = (): ProgressData => {
  const state = useProgressStore.getState();
  return {
    modules: state.modules,
    startDate: state.startDate,
    activities: state.activities
  };
};

const calculateStats = (modules: ProgressData['modules']) => {
  const allModuleIds = Object.keys(MODULE_DETAILS);
  const completed = allModuleIds.filter(id => modules[id]?.status === 'complete').length;
  const inProgress = allModuleIds.filter(id => modules[id]?.status === 'in-progress').length;
  const notStarted = TOTAL_MODULES - completed - inProgress;
  const percentage = Math.round((completed / TOTAL_MODULES) * 100);
  
  return { completed, inProgress, notStarted, percentage };
};

const getCategoryStats = (modules: ProgressData['modules']) => {
  const categoryStats: Record<string, { completed: number; inProgress: number; notStarted: number; total: number; modules: Array<{ id: string; name: string; status: string; completedAt?: string }> }> = {};
  
  CATEGORY_ORDER.forEach(category => {
    categoryStats[category] = { completed: 0, inProgress: 0, notStarted: 0, total: 0, modules: [] };
  });
  
  Object.entries(MODULE_DETAILS).forEach(([moduleId, details]) => {
    const status = modules[moduleId]?.status || 'not-started';
    const completedAt = modules[moduleId]?.completedAt;
    const category = details.category;
    
    if (categoryStats[category]) {
      categoryStats[category].total++;
      categoryStats[category].modules.push({ 
        id: moduleId, 
        name: details.name, 
        status,
        completedAt
      });
      
      if (status === 'complete') categoryStats[category].completed++;
      else if (status === 'in-progress') categoryStats[category].inProgress++;
      else categoryStats[category].notStarted++;
    }
  });
  
  return categoryStats;
};

const calculateTimeline = (modules: ProgressData['modules'], startDate: string | null) => {
  if (!startDate) return null;
  
  const start = new Date(startDate);
  const now = new Date();
  const daysSinceStart = Math.max(0, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  
  const stats = calculateStats(modules);
  const avgDaysPerModule = stats.completed > 0 ? Math.round((daysSinceStart / stats.completed) * 10) / 10 : 0;
  const remainingModules = TOTAL_MODULES - stats.completed;
  const estimatedDaysRemaining = avgDaysPerModule > 0 ? Math.ceil(remainingModules * avgDaysPerModule) : null;
  
  let estimatedCompletion: Date | null = null;
  if (estimatedDaysRemaining !== null) {
    estimatedCompletion = new Date();
    estimatedCompletion.setDate(estimatedCompletion.getDate() + estimatedDaysRemaining);
  }
  
  return {
    startDate: format(start, 'dd MMMM yyyy'),
    daysSinceStart,
    avgDaysPerModule,
    estimatedDaysRemaining,
    estimatedCompletion: estimatedCompletion ? format(estimatedCompletion, 'dd MMMM yyyy') : null
  };
};

export const exportProgressToPDF = () => {
  const { modules, startDate } = getProgressData();
  const stats = calculateStats(modules);
  const categoryStats = getCategoryStats(modules);
  const timeline = calculateTimeline(modules, startDate);
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;
  
  // Helper functions
  const addNewPageIfNeeded = (requiredSpace: number) => {
    if (yPos + requiredSpace > 270) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };
  
  const drawProgressBar = (x: number, y: number, width: number, percentage: number) => {
    doc.setFillColor(229, 231, 235); // gray-200
    doc.roundedRect(x, y, width, 4, 2, 2, 'F');
    if (percentage > 0) {
      doc.setFillColor(34, 197, 94); // green-500
      doc.roundedRect(x, y, (width * percentage) / 100, 4, 2, 2, 'F');
    }
  };

  // Header with branding
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Consumer Duty Implementation Playbook', margin, 18);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Progress Report', margin, 28);
  
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), 'dd MMMM yyyy, HH:mm')}`, margin, 36);
  
  yPos = 55;
  doc.setTextColor(0, 0, 0);
  
  // Executive Summary Box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 45, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 45, 3, 3, 'S');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin + 5, yPos + 10);
  
  // Large percentage display
  doc.setFontSize(36);
  doc.setTextColor(34, 197, 94); // green-500
  doc.text(`${stats.percentage}%`, margin + 5, yPos + 32);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('Overall Completion', margin + 5, yPos + 40);
  
  // Stats columns
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  const col1X = margin + 55;
  const col2X = margin + 95;
  const col3X = margin + 135;
  
  doc.setFont('helvetica', 'bold');
  doc.text(`${stats.completed}`, col1X, yPos + 25);
  doc.text(`${stats.inProgress}`, col2X, yPos + 25);
  doc.text(`${stats.notStarted}`, col3X, yPos + 25);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Completed', col1X, yPos + 32);
  doc.text('In Progress', col2X, yPos + 32);
  doc.text('Not Started', col3X, yPos + 32);
  
  yPos += 55;
  
  // Timeline Section
  if (timeline) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Timeline & Projections', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    
    doc.text(`• Implementation started: ${timeline.startDate}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`• Days since start: ${timeline.daysSinceStart}`, margin + 5, yPos);
    yPos += 6;
    if (timeline.avgDaysPerModule > 0) {
      doc.text(`• Average pace: ${timeline.avgDaysPerModule} days per module`, margin + 5, yPos);
      yPos += 6;
    }
    if (timeline.estimatedCompletion) {
      doc.text(`• Projected completion: ${timeline.estimatedCompletion} (${timeline.estimatedDaysRemaining} days remaining)`, margin + 5, yPos);
      yPos += 6;
    }
    yPos += 8;
  }
  
  // Progress by Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Progress by Section', margin, yPos);
  yPos += 10;
  
  CATEGORY_ORDER.forEach(category => {
    addNewPageIfNeeded(50);
    
    const catStats = categoryStats[category];
    const catPercentage = catStats.total > 0 ? Math.round((catStats.completed / catStats.total) * 100) : 0;
    
    // Category header
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 8, 2, 2, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(category, margin + 3, yPos + 6);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`${catStats.completed}/${catStats.total} Complete (${catPercentage}%)`, pageWidth - margin - 50, yPos + 6);
    
    yPos += 12;
    
    // Progress bar
    drawProgressBar(margin, yPos, pageWidth - (margin * 2), catPercentage);
    yPos += 8;
    
    // Module list
    doc.setFontSize(9);
    catStats.modules.forEach(module => {
      addNewPageIfNeeded(8);
      
      const statusIcon = module.status === 'complete' ? '✓' : 
                         module.status === 'in-progress' ? '◐' : '○';
      const statusColor = module.status === 'complete' ? [34, 197, 94] : 
                          module.status === 'in-progress' ? [234, 179, 8] : [148, 163, 184];
      
      doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.text(statusIcon, margin + 5, yPos);
      
      doc.setTextColor(51, 65, 85);
      doc.text(`${module.id}: ${module.name}`, margin + 12, yPos);
      
      if (module.status === 'complete' && module.completedAt) {
        doc.setTextColor(148, 163, 184);
        doc.text(`Completed ${format(new Date(module.completedAt), 'dd MMM yyyy')}`, pageWidth - margin - 45, yPos);
      } else if (module.status === 'in-progress') {
        doc.setTextColor(234, 179, 8);
        doc.text('In Progress', pageWidth - margin - 25, yPos);
      }
      
      yPos += 6;
    });
    
    yPos += 6;
  });
  
  // Footer on last page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Consumer Duty Implementation Playbook - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      285,
      { align: 'center' }
    );
  }
  
  // Save
  doc.save(`Consumer-Duty-Progress-Report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

export const exportProgressToCSV = () => {
  const { modules, startDate } = getProgressData();
  const stats = calculateStats(modules);
  const categoryStats = getCategoryStats(modules);
  const timeline = calculateTimeline(modules, startDate);
  
  let csv = '';
  
  // Header
  csv += 'CONSUMER DUTY IMPLEMENTATION PLAYBOOK - PROGRESS REPORT\n';
  csv += `Generated: ${format(new Date(), 'dd MMMM yyyy HH:mm')}\n\n`;
  
  // Executive Summary
  csv += 'EXECUTIVE SUMMARY\n';
  csv += `Overall Completion,${stats.percentage}%\n`;
  csv += `Total Modules,${TOTAL_MODULES}\n`;
  csv += `Completed,${stats.completed}\n`;
  csv += `In Progress,${stats.inProgress}\n`;
  csv += `Not Started,${stats.notStarted}\n\n`;
  
  // Timeline
  if (timeline) {
    csv += 'TIMELINE & PROJECTIONS\n';
    csv += `Implementation Started,${timeline.startDate}\n`;
    csv += `Days Since Start,${timeline.daysSinceStart}\n`;
    if (timeline.avgDaysPerModule > 0) {
      csv += `Average Days Per Module,${timeline.avgDaysPerModule}\n`;
    }
    if (timeline.estimatedCompletion) {
      csv += `Projected Completion,${timeline.estimatedCompletion}\n`;
      csv += `Days Remaining,${timeline.estimatedDaysRemaining}\n`;
    }
    csv += '\n';
  }
  
  // Detailed Module Status
  csv += 'DETAILED MODULE STATUS\n';
  csv += 'Module ID,Module Name,Category,Status,Completion Date\n';
  
  CATEGORY_ORDER.forEach(category => {
    categoryStats[category].modules.forEach(module => {
      const completionDate = module.status === 'complete' && module.completedAt 
        ? format(new Date(module.completedAt), 'yyyy-MM-dd')
        : '';
      csv += `${module.id},"${module.name}","${category}",${module.status},${completionDate}\n`;
    });
  });
  
  // Category Summary
  csv += '\nCATEGORY SUMMARY\n';
  csv += 'Category,Completed,In Progress,Not Started,Total,Completion %\n';
  
  CATEGORY_ORDER.forEach(category => {
    const catStats = categoryStats[category];
    const catPercentage = catStats.total > 0 ? Math.round((catStats.completed / catStats.total) * 100) : 0;
    csv += `"${category}",${catStats.completed},${catStats.inProgress},${catStats.notStarted},${catStats.total},${catPercentage}%\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Consumer-Duty-Progress-Report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
