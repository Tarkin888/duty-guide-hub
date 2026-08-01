import { jsPDF } from 'jspdf';
import { useProgressStore, getModulesMap, MODULE_CATEGORIES, TOTAL_MODULES } from '@/stores/progressStore';
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
    modules: getModulesMap(),
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

const NAVY: [number, number, number] = [30, 58, 138]; // #1e3a8a
const GOLD: [number, number, number] = [245, 158, 11]; // #f59e0b
const SLATE: [number, number, number] = [100, 116, 139];

const getRecommendedNextModule = (modules: ProgressData['modules']) => {
  const order = Object.keys(MODULE_DETAILS);
  const inProgress = order.find(id => modules[id]?.status === 'in-progress');
  const target = inProgress || order.find(id => (modules[id]?.status || 'not-started') === 'not-started');
  if (!target) return null;
  return { id: target, ...MODULE_DETAILS[target], status: modules[target]?.status || 'not-started' };
};

export const exportProgressToPDF = () => {
  const { modules, startDate } = getProgressData();
  const stats = calculateStats(modules);
  const categoryStats = getCategoryStats(modules);
  const timeline = calculateTimeline(modules, startDate);
  const recommended = getRecommendedNextModule(modules);

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  const addNewPageIfNeeded = (requiredSpace: number) => {
    if (yPos + requiredSpace > 270) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  const drawProgressBar = (x: number, y: number, width: number, percentage: number) => {
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(x, y, width, 4, 2, 2, 'F');
    if (percentage > 0) {
      doc.setFillColor(...GOLD);
      doc.roundedRect(x, y, (width * percentage) / 100, 4, 2, 2, 'F');
    }
  };

  // Circular completion figure (navy track, gold arc)
  const drawProgressCircle = (cx: number, cy: number, radius: number, percentage: number) => {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(3.5);
    doc.circle(cx, cy, radius, 'S');

    if (percentage > 0) {
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(3.5);
      const segments = Math.max(1, Math.round((percentage / 100) * 72));
      const step = (Math.PI * 2) / 72;
      for (let i = 0; i < segments; i++) {
        const a1 = -Math.PI / 2 + i * step;
        const a2 = -Math.PI / 2 + (i + 1) * step;
        doc.line(
          cx + radius * Math.cos(a1),
          cy + radius * Math.sin(a1),
          cx + radius * Math.cos(a2),
          cy + radius * Math.sin(a2)
        );
      }
    }
    doc.setLineWidth(0.2);

    doc.setTextColor(...NAVY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(`${percentage}%`, cx, cy + 2, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...SLATE);
    doc.text('Complete', cx, cy + 8, { align: 'center' });
  };

  // Header with navy/gold branding
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setFillColor(...GOLD);
  doc.rect(0, 40, pageWidth, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Consumer Duty Implementation Playbook', margin, 18);

  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.text('Progress Report', margin, 27);

  doc.setFontSize(9);
  doc.text(`Generated: ${format(new Date(), 'dd MMMM yyyy, HH:mm')}`, margin, 35);

  yPos = 55;
  doc.setTextColor(0, 0, 0);

  // Executive Summary box with circular figure
  const boxHeight = 50;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, boxHeight, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, boxHeight, 3, 3, 'S');

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('Overall Completion', margin + 5, yPos + 10);

  drawProgressCircle(margin + 25, yPos + 30, 14, stats.percentage);

  doc.setTextColor(...NAVY);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const col1X = margin + 60;
  const col2X = margin + 100;
  const col3X = margin + 140;
  doc.text(`${stats.completed}`, col1X, yPos + 28);
  doc.text(`${stats.inProgress}`, col2X, yPos + 28);
  doc.text(`${stats.notStarted}`, col3X, yPos + 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...SLATE);
  doc.text('Completed', col1X, yPos + 35);
  doc.text('In Progress', col2X, yPos + 35);
  doc.text('Not Started', col3X, yPos + 35);
  doc.text(`${stats.completed} of ${TOTAL_MODULES} modules complete`, col1X, yPos + 43);

  yPos += boxHeight + 12;

  // Timeline
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('Timeline', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  if (timeline) {
    doc.text(`Implementation started: ${timeline.startDate}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Days since started: ${timeline.daysSinceStart}`, margin + 5, yPos);
    yPos += 6;
    if (timeline.avgDaysPerModule > 0) {
      doc.text(`Average pace: ${timeline.avgDaysPerModule} days per module`, margin + 5, yPos);
      yPos += 6;
    }
    if (timeline.estimatedCompletion) {
      doc.text(
        `Projected completion: ${timeline.estimatedCompletion} (${timeline.estimatedDaysRemaining} days remaining)`,
        margin + 5,
        yPos
      );
      yPos += 6;
    }
  } else {
    doc.text('Implementation not yet started.', margin + 5, yPos);
    yPos += 6;
  }
  yPos += 8;

  // Recommended next module
  addNewPageIfNeeded(30);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('Recommended Next Module', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  if (recommended) {
    doc.setFillColor(254, 249, 235);
    doc.roundedRect(margin, yPos - 5, pageWidth - margin * 2, 14, 2, 2, 'F');
    doc.setDrawColor(...GOLD);
    doc.roundedRect(margin, yPos - 5, pageWidth - margin * 2, 14, 2, 2, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`${recommended.id}: ${recommended.name}`, margin + 4, yPos + 2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...SLATE);
    doc.text(
      recommended.status === 'in-progress' ? 'Continue in progress' : 'Not started',
      pageWidth - margin - 4,
      yPos + 2,
      { align: 'right' }
    );
    yPos += 18;
  } else {
    doc.text('All modules complete. Focus on continuous improvement and monitoring.', margin + 5, yPos);
    yPos += 10;
  }

  // Completed modules
  const completedModules = Object.entries(MODULE_DETAILS)
    .filter(([id]) => modules[id]?.status === 'complete')
    .map(([id, d]) => ({ id, ...d, completedAt: modules[id]?.completedAt }));
  const inProgressModules = Object.entries(MODULE_DETAILS)
    .filter(([id]) => modules[id]?.status === 'in-progress')
    .map(([id, d]) => ({ id, ...d }));

  addNewPageIfNeeded(30);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text(`Completed Modules (${completedModules.length})`, margin, yPos);
  yPos += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  if (completedModules.length === 0) {
    doc.setTextColor(...SLATE);
    doc.text('No modules completed yet.', margin + 5, yPos);
    yPos += 8;
  } else {
    completedModules.forEach(module => {
      addNewPageIfNeeded(8);
      doc.setTextColor(51, 65, 85);
      doc.text(`${module.id}: ${module.name}`, margin + 5, yPos);
      doc.setTextColor(...SLATE);
      doc.text(
        module.completedAt
          ? `Completed ${format(new Date(module.completedAt), 'dd MMM yyyy')}`
          : 'Completion date not recorded',
        pageWidth - margin,
        yPos,
        { align: 'right' }
      );
      yPos += 6;
    });
    yPos += 4;
  }

  addNewPageIfNeeded(30);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text(`In Progress Modules (${inProgressModules.length})`, margin, yPos);
  yPos += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  if (inProgressModules.length === 0) {
    doc.setTextColor(...SLATE);
    doc.text('No modules currently in progress.', margin + 5, yPos);
    yPos += 8;
  } else {
    inProgressModules.forEach(module => {
      addNewPageIfNeeded(8);
      doc.setTextColor(51, 65, 85);
      doc.text(`${module.id}: ${module.name}`, margin + 5, yPos);
      doc.setTextColor(...SLATE);
      doc.text(module.category, pageWidth - margin, yPos, { align: 'right' });
      yPos += 6;
    });
    yPos += 4;
  }

  // Progress by Section
  addNewPageIfNeeded(30);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('Progress by Category', margin, yPos);
  yPos += 10;

  CATEGORY_ORDER.forEach(category => {
    addNewPageIfNeeded(50);

    const catStats = categoryStats[category];
    const catPercentage = catStats.total > 0 ? Math.round((catStats.completed / catStats.total) * 100) : 0;

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, yPos, pageWidth - margin * 2, 8, 2, 2, 'F');

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(category, margin + 3, yPos + 6);

    doc.setFont('helvetica', 'normal');
    doc.text(`${catStats.completed}/${catStats.total} Complete (${catPercentage}%)`, pageWidth - margin - 3, yPos + 6, {
      align: 'right',
    });

    yPos += 12;

    drawProgressBar(margin, yPos, pageWidth - margin * 2, catPercentage);
    yPos += 8;

    doc.setFontSize(9);
    catStats.modules.forEach(module => {
      addNewPageIfNeeded(8);

      const label =
        module.status === 'complete' ? 'Complete' : module.status === 'in-progress' ? 'In Progress' : 'Not Started';

      doc.setTextColor(51, 65, 85);
      doc.text(`${module.id}: ${module.name}`, margin + 5, yPos);

      doc.setTextColor(...SLATE);
      doc.text(
        module.status === 'complete' && module.completedAt
          ? `${label} - ${format(new Date(module.completedAt), 'dd MMM yyyy')}`
          : label,
        pageWidth - margin,
        yPos,
        { align: 'right' }
      );

      yPos += 6;
    });

    yPos += 6;
  });

  // Footer
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
