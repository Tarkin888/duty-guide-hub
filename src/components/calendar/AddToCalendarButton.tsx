import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Download, ExternalLink } from "lucide-react";
import { CalendarEvent, downloadICSFile } from "@/utils/calendarExport";
import { toast } from "sonner";

interface AddToCalendarButtonProps {
  event: CalendarEvent;
  filename?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function AddToCalendarButton({
  event,
  filename = "event",
  variant = "outline",
  size = "sm",
  className,
}: AddToCalendarButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownloadICS = () => {
    downloadICSFile([event], filename);
    toast.success("Calendar event downloaded", {
      description: "Open the .ics file to add it to your calendar",
    });
    setIsOpen(false);
  };

  const formatDateForGoogle = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const handleGoogleCalendar = () => {
    const endDate = event.endDate || new Date(event.startDate.getTime() + 60 * 60 * 1000);
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${formatDateForGoogle(event.startDate)}/${formatDateForGoogle(endDate)}`,
      details: event.description || '',
      location: event.location || '',
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
    setIsOpen(false);
  };

  const handleOutlookWeb = () => {
    const endDate = event.endDate || new Date(event.startDate.getTime() + 60 * 60 * 1000);
    
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.title,
      startdt: event.startDate.toISOString(),
      enddt: endDate.toISOString(),
      body: event.description || '',
      location: event.location || '',
    });

    window.open(`https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`, '_blank');
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Calendar className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleDownloadICS}>
          <Download className="h-4 w-4 mr-2" />
          Download .ics file
          <span className="text-xs text-muted-foreground ml-auto">All apps</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGoogleCalendar}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Google Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOutlookWeb}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Outlook Web
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
