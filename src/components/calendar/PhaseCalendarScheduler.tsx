import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Trash2, CheckCircle2 } from "lucide-react";
import {
  getPhaseDates,
  setPhaseDate,
  removePhaseDate,
  createPhaseDeadlineEvent,
  createQuarterlyReviewEvent,
  downloadICSFile,
  PhaseDates,
} from "@/utils/calendarExport";
import { AddToCalendarButton } from "./AddToCalendarButton";
import { toast } from "sonner";

interface Phase {
  id: string;
  title: string;
  description: string;
  suggestedWeeks: number;
}

const IMPLEMENTATION_PHASES: Phase[] = [
  {
    id: "phase-1-assessment",
    title: "Phase 1: Assessment & Planning",
    description: "Gap analysis, risk assessment, and implementation planning",
    suggestedWeeks: 4,
  },
  {
    id: "phase-2-design",
    title: "Phase 2: Design & Development",
    description: "Policy development, process design, and system requirements",
    suggestedWeeks: 8,
  },
  {
    id: "phase-3-implementation",
    title: "Phase 3: Implementation",
    description: "System changes, training rollout, and process implementation",
    suggestedWeeks: 12,
  },
  {
    id: "phase-4-testing",
    title: "Phase 4: Testing & Validation",
    description: "UAT, outcome testing, and regulatory compliance verification",
    suggestedWeeks: 4,
  },
  {
    id: "phase-5-golive",
    title: "Phase 5: Go-Live & Monitoring",
    description: "Launch, monitoring, and continuous improvement",
    suggestedWeeks: 4,
  },
];

const MILESTONES = [
  { id: "board-approval", title: "Board Approval of Implementation Plan" },
  { id: "policy-framework", title: "Policy Framework Complete" },
  { id: "training-launch", title: "Training Programme Launch" },
  { id: "systems-ready", title: "Systems Changes Complete" },
  { id: "go-live", title: "Consumer Duty Go-Live" },
];

export function PhaseCalendarScheduler() {
  const [phaseDates, setPhaseDatesState] = useState<PhaseDates>({});
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [tempDate, setTempDate] = useState("");

  useEffect(() => {
    setPhaseDatesState(getPhaseDates());
  }, []);

  const handleSetDate = (phase: Phase) => {
    if (!tempDate) {
      toast.error("Please select a date");
      return;
    }

    const targetDate = new Date(tempDate);
    setPhaseDate(phase.id, targetDate, phase.title, phase.description);
    setPhaseDatesState(getPhaseDates());
    setEditingPhase(null);
    setTempDate("");
    
    toast.success("Phase date set", {
      description: `${phase.title} scheduled for ${targetDate.toLocaleDateString()}`,
    });
  };

  const handleRemoveDate = (phaseId: string) => {
    removePhaseDate(phaseId);
    setPhaseDatesState(getPhaseDates());
    toast.success("Date removed");
  };

  const handleDownloadAllPhases = () => {
    const events = Object.entries(phaseDates).map(([phaseId, data]) => {
      const phase = IMPLEMENTATION_PHASES.find(p => p.id === phaseId) || 
                   MILESTONES.find(m => m.id === phaseId);
      return createPhaseDeadlineEvent(
        data.title,
        new Date(data.targetDate),
        data.description
      );
    });

    if (events.length === 0) {
      toast.error("No phases scheduled", {
        description: "Set target dates for phases first",
      });
      return;
    }

    downloadICSFile(events, "consumer-duty-implementation-phases");
    toast.success("All phase events downloaded");
  };

  const handleAddQuarterlyReviews = () => {
    const firstReviewDate = new Date();
    firstReviewDate.setMonth(firstReviewDate.getMonth() + 3);
    
    const event = createQuarterlyReviewEvent(
      "Consumer Duty Compliance Review",
      firstReviewDate,
      4
    );

    downloadICSFile([event], "quarterly-reviews");
    toast.success("Quarterly reviews calendar downloaded", {
      description: "4 quarterly reviews starting in 3 months",
    });
  };

  const getSuggestedDate = (phase: Phase) => {
    const date = new Date();
    let totalWeeks = 0;
    
    for (const p of IMPLEMENTATION_PHASES) {
      if (p.id === phase.id) break;
      totalWeeks += p.suggestedWeeks;
    }
    
    date.setDate(date.getDate() + (totalWeeks + phase.suggestedWeeks) * 7);
    return date.toISOString().split('T')[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Implementation Phase Scheduler
        </CardTitle>
        <CardDescription>
          Set target dates for each implementation phase. Calendar events include automatic reminders 1 week and 1 day before each deadline.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bulk Actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleDownloadAllPhases}>
            <Download className="h-4 w-4 mr-2" />
            Download All Phase Dates
          </Button>
          <Button variant="outline" onClick={handleAddQuarterlyReviews}>
            <Calendar className="h-4 w-4 mr-2" />
            Add Quarterly Reviews
          </Button>
        </div>

        {/* Implementation Phases */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Implementation Phases
          </h4>
          
          {IMPLEMENTATION_PHASES.map((phase) => {
            const savedDate = phaseDates[phase.id];
            const isEditing = editingPhase === phase.id;

            return (
              <div
                key={phase.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-card"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium">{phase.title}</h5>
                    <Badge variant="secondary" className="text-xs">
                      ~{phase.suggestedWeeks} weeks
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                  
                  {savedDate && (
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        Scheduled: {new Date(savedDate.targetDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        value={tempDate}
                        onChange={(e) => setTempDate(e.target.value)}
                        className="w-40"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Button size="sm" onClick={() => handleSetDate(phase)}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingPhase(null);
                          setTempDate("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : savedDate ? (
                    <>
                      <AddToCalendarButton
                        event={createPhaseDeadlineEvent(
                          phase.title,
                          new Date(savedDate.targetDate),
                          phase.description
                        )}
                        filename={`phase-${phase.id}`}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingPhase(phase.id);
                          setTempDate(savedDate.targetDate.split('T')[0]);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveDate(phase.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingPhase(phase.id);
                        setTempDate(getSuggestedDate(phase));
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Set Date
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Milestones */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Key Milestones
          </h4>
          
          {MILESTONES.map((milestone) => {
            const savedDate = phaseDates[milestone.id];
            const isEditing = editingPhase === milestone.id;

            return (
              <div
                key={milestone.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
              >
                <div className="flex-1">
                  <h5 className="font-medium text-sm">{milestone.title}</h5>
                  {savedDate && (
                    <span className="text-xs text-green-600">
                      {new Date(savedDate.targetDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        value={tempDate}
                        onChange={(e) => setTempDate(e.target.value)}
                        className="w-36"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          if (tempDate) {
                            setPhaseDate(milestone.id, new Date(tempDate), milestone.title);
                            setPhaseDatesState(getPhaseDates());
                            setEditingPhase(null);
                            setTempDate("");
                            toast.success("Milestone date set");
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingPhase(null);
                          setTempDate("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : savedDate ? (
                    <>
                      <AddToCalendarButton
                        event={createPhaseDeadlineEvent(
                          milestone.title,
                          new Date(savedDate.targetDate)
                        )}
                        filename={`milestone-${milestone.id}`}
                        size="sm"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveDate(milestone.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingPhase(milestone.id);
                        setTempDate(new Date().toISOString().split('T')[0]);
                      }}
                    >
                      Set Date
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
