// ICS Calendar Export Utility
// Compatible with Outlook, Google Calendar, Apple Calendar

export interface CalendarEvent {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  allDay?: boolean;
  reminders?: number[]; // minutes before event
  recurrence?: {
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    interval?: number;
    count?: number;
    until?: Date;
  };
}

function formatDateForICS(date: Date, allDay?: boolean): string {
  if (allDay) {
    return date.toISOString().split('T')[0].replace(/-/g, '');
  }
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@consumer-duty-toolkit`;
}

function formatRecurrence(recurrence: CalendarEvent['recurrence']): string {
  if (!recurrence) return '';
  
  let rrule = `RRULE:FREQ=${recurrence.frequency}`;
  
  if (recurrence.interval && recurrence.interval > 1) {
    rrule += `;INTERVAL=${recurrence.interval}`;
  }
  
  if (recurrence.count) {
    rrule += `;COUNT=${recurrence.count}`;
  }
  
  if (recurrence.until) {
    rrule += `;UNTIL=${formatDateForICS(recurrence.until)}`;
  }
  
  return rrule;
}

function formatAlarms(reminders: number[]): string {
  return reminders.map(minutes => {
    const duration = minutes >= 60 * 24 
      ? `-P${Math.floor(minutes / (60 * 24))}D`
      : minutes >= 60 
        ? `-PT${Math.floor(minutes / 60)}H`
        : `-PT${minutes}M`;
    
    return `BEGIN:VALARM
TRIGGER:${duration}
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM`;
  }).join('\r\n');
}

export function generateICS(events: CalendarEvent[]): string {
  const icsEvents = events.map(event => {
    const endDate = event.endDate || new Date(event.startDate.getTime() + 60 * 60 * 1000); // Default 1 hour
    const uid = generateUID();
    
    let eventBlock = `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDateForICS(new Date())}
DTSTART${event.allDay ? ';VALUE=DATE' : ''}:${formatDateForICS(event.startDate, event.allDay)}
DTEND${event.allDay ? ';VALUE=DATE' : ''}:${formatDateForICS(endDate, event.allDay)}
SUMMARY:${escapeICSText(event.title)}`;

    if (event.description) {
      eventBlock += `\r\nDESCRIPTION:${escapeICSText(event.description)}`;
    }
    
    if (event.location) {
      eventBlock += `\r\nLOCATION:${escapeICSText(event.location)}`;
    }
    
    if (event.recurrence) {
      eventBlock += `\r\n${formatRecurrence(event.recurrence)}`;
    }
    
    if (event.reminders && event.reminders.length > 0) {
      eventBlock += `\r\n${formatAlarms(event.reminders)}`;
    }
    
    eventBlock += '\r\nEND:VEVENT';
    
    return eventBlock;
  }).join('\r\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Consumer Duty Toolkit//Calendar Export//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Consumer Duty Implementation
${icsEvents}
END:VCALENDAR`;
}

export function downloadICSFile(events: CalendarEvent[], filename: string = 'calendar-event'): void {
  const icsContent = generateICS(events);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Pre-configured event templates
export function createModuleDueDateEvent(
  moduleTitle: string, 
  dueDate: Date,
  moduleDescription?: string
): CalendarEvent {
  return {
    title: `Consumer Duty: ${moduleTitle} Due`,
    description: moduleDescription || `Complete the ${moduleTitle} module for Consumer Duty implementation.`,
    startDate: dueDate,
    allDay: true,
    reminders: [60 * 24 * 7, 60 * 24], // 1 week and 1 day before
  };
}

export function createTrainingSessionEvent(
  sessionTitle: string,
  startDate: Date,
  durationHours: number = 2,
  description?: string,
  location?: string
): CalendarEvent {
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);
  
  return {
    title: `Training: ${sessionTitle}`,
    description: description || `Consumer Duty training session: ${sessionTitle}`,
    startDate,
    endDate,
    location,
    reminders: [60 * 24 * 7, 60 * 24, 60], // 1 week, 1 day, 1 hour before
  };
}

export function createBoardReportingDeadline(
  reportTitle: string,
  deadline: Date,
  description?: string
): CalendarEvent {
  return {
    title: `Board Reporting: ${reportTitle}`,
    description: description || `Board reporting deadline for ${reportTitle}`,
    startDate: deadline,
    allDay: true,
    reminders: [60 * 24 * 7, 60 * 24 * 3, 60 * 24], // 1 week, 3 days, 1 day before
  };
}

export function createQuarterlyReviewEvent(
  reviewTitle: string,
  startDate: Date,
  numberOfQuarters: number = 4
): CalendarEvent {
  return {
    title: `Quarterly Review: ${reviewTitle}`,
    description: `Quarterly Consumer Duty review: ${reviewTitle}. Recurring every 3 months.`,
    startDate,
    allDay: true,
    reminders: [60 * 24 * 7, 60 * 24], // 1 week and 1 day before
    recurrence: {
      frequency: 'MONTHLY',
      interval: 3,
      count: numberOfQuarters,
    },
  };
}

export function createPhaseDeadlineEvent(
  phaseName: string,
  targetDate: Date,
  phaseDescription?: string
): CalendarEvent {
  return {
    title: `Phase Deadline: ${phaseName}`,
    description: phaseDescription || `Target completion date for ${phaseName} of Consumer Duty implementation.`,
    startDate: targetDate,
    allDay: true,
    reminders: [60 * 24 * 7, 60 * 24], // 1 week and 1 day before
  };
}

export function createMilestoneEvent(
  milestoneName: string,
  targetDate: Date,
  description?: string
): CalendarEvent {
  return {
    title: `Milestone: ${milestoneName}`,
    description: description || `Review milestone: ${milestoneName}`,
    startDate: targetDate,
    allDay: true,
    reminders: [60 * 24 * 7, 60 * 24], // 1 week and 1 day before
  };
}

// Storage for phase dates
const PHASE_DATES_KEY = 'consumer-duty-phase-dates';

export interface PhaseDates {
  [phaseId: string]: {
    targetDate: string;
    title: string;
    description?: string;
  };
}

export function savePhaseDates(dates: PhaseDates): void {
  localStorage.setItem(PHASE_DATES_KEY, JSON.stringify(dates));
}

export function getPhaseDates(): PhaseDates {
  try {
    const stored = localStorage.getItem(PHASE_DATES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setPhaseDate(phaseId: string, targetDate: Date, title: string, description?: string): void {
  const dates = getPhaseDates();
  dates[phaseId] = {
    targetDate: targetDate.toISOString(),
    title,
    description,
  };
  savePhaseDates(dates);
}

export function removePhaseDate(phaseId: string): void {
  const dates = getPhaseDates();
  delete dates[phaseId];
  savePhaseDates(dates);
}
