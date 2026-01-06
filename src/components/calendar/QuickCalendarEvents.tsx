import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, FileText } from "lucide-react";
import {
  createModuleDueDateEvent,
  createTrainingSessionEvent,
  createBoardReportingDeadline,
  createMilestoneEvent,
  downloadICSFile,
} from "@/utils/calendarExport";
import { toast } from "sonner";

export function QuickCalendarEvents() {
  const [moduleDue, setModuleDue] = useState({ title: "", date: "", description: "" });
  const [training, setTraining] = useState({ title: "", date: "", time: "09:00", duration: "2", location: "", description: "" });
  const [board, setBoard] = useState({ title: "", date: "", description: "" });
  const [milestone, setMilestone] = useState({ title: "", date: "", description: "" });

  const handleModuleDue = () => {
    if (!moduleDue.title || !moduleDue.date) {
      toast.error("Please fill in required fields");
      return;
    }
    const event = createModuleDueDateEvent(
      moduleDue.title,
      new Date(moduleDue.date),
      moduleDue.description
    );
    downloadICSFile([event], `module-${moduleDue.title.toLowerCase().replace(/\s+/g, '-')}`);
    toast.success("Module due date calendar event downloaded");
    setModuleDue({ title: "", date: "", description: "" });
  };

  const handleTraining = () => {
    if (!training.title || !training.date) {
      toast.error("Please fill in required fields");
      return;
    }
    const startDate = new Date(`${training.date}T${training.time}`);
    const event = createTrainingSessionEvent(
      training.title,
      startDate,
      parseInt(training.duration),
      training.description,
      training.location
    );
    downloadICSFile([event], `training-${training.title.toLowerCase().replace(/\s+/g, '-')}`);
    toast.success("Training session calendar event downloaded");
    setTraining({ title: "", date: "", time: "09:00", duration: "2", location: "", description: "" });
  };

  const handleBoard = () => {
    if (!board.title || !board.date) {
      toast.error("Please fill in required fields");
      return;
    }
    const event = createBoardReportingDeadline(
      board.title,
      new Date(board.date),
      board.description
    );
    downloadICSFile([event], `board-${board.title.toLowerCase().replace(/\s+/g, '-')}`);
    toast.success("Board deadline calendar event downloaded");
    setBoard({ title: "", date: "", description: "" });
  };

  const handleMilestone = () => {
    if (!milestone.title || !milestone.date) {
      toast.error("Please fill in required fields");
      return;
    }
    const event = createMilestoneEvent(
      milestone.title,
      new Date(milestone.date),
      milestone.description
    );
    downloadICSFile([event], `milestone-${milestone.title.toLowerCase().replace(/\s+/g, '-')}`);
    toast.success("Milestone calendar event downloaded");
    setMilestone({ title: "", date: "", description: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Quick Calendar Events
        </CardTitle>
        <CardDescription>
          Create calendar events for modules, training, board deadlines, and milestones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="module" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="module" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Module
            </TabsTrigger>
            <TabsTrigger value="training" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Training
            </TabsTrigger>
            <TabsTrigger value="board" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Board
            </TabsTrigger>
            <TabsTrigger value="milestone" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Milestone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="module" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="module-title">Module Name *</Label>
                <Input
                  id="module-title"
                  placeholder="e.g., CD-P1 Governance Framework"
                  value={moduleDue.title}
                  onChange={(e) => setModuleDue({ ...moduleDue, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="module-date">Due Date *</Label>
                <Input
                  id="module-date"
                  type="date"
                  value={moduleDue.date}
                  onChange={(e) => setModuleDue({ ...moduleDue, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="module-desc">Description</Label>
                <Textarea
                  id="module-desc"
                  placeholder="Additional notes..."
                  value={moduleDue.description}
                  onChange={(e) => setModuleDue({ ...moduleDue, description: e.target.value })}
                  rows={2}
                />
              </div>
              <Button onClick={handleModuleDue} className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Create Module Due Date Event
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="training-title">Session Title *</Label>
                <Input
                  id="training-title"
                  placeholder="e.g., Consumer Duty Fundamentals"
                  value={training.title}
                  onChange={(e) => setTraining({ ...training, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="training-date">Date *</Label>
                  <Input
                    id="training-date"
                    type="date"
                    value={training.date}
                    onChange={(e) => setTraining({ ...training, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="training-time">Time</Label>
                  <Input
                    id="training-time"
                    type="time"
                    value={training.time}
                    onChange={(e) => setTraining({ ...training, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="training-duration">Duration (hours)</Label>
                  <Input
                    id="training-duration"
                    type="number"
                    min="1"
                    max="8"
                    value={training.duration}
                    onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="training-location">Location</Label>
                  <Input
                    id="training-location"
                    placeholder="Room/Link"
                    value={training.location}
                    onChange={(e) => setTraining({ ...training, location: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleTraining} className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Create Training Session Event
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="board" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="board-title">Report Title *</Label>
                <Input
                  id="board-title"
                  placeholder="e.g., Q1 Consumer Duty Update"
                  value={board.title}
                  onChange={(e) => setBoard({ ...board, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="board-date">Deadline *</Label>
                <Input
                  id="board-date"
                  type="date"
                  value={board.date}
                  onChange={(e) => setBoard({ ...board, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="board-desc">Description</Label>
                <Textarea
                  id="board-desc"
                  placeholder="Report requirements..."
                  value={board.description}
                  onChange={(e) => setBoard({ ...board, description: e.target.value })}
                  rows={2}
                />
              </div>
              <Button onClick={handleBoard} className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Create Board Deadline Event
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="milestone" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="milestone-title">Milestone Name *</Label>
                <Input
                  id="milestone-title"
                  placeholder="e.g., Phase 2 Complete"
                  value={milestone.title}
                  onChange={(e) => setMilestone({ ...milestone, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="milestone-date">Target Date *</Label>
                <Input
                  id="milestone-date"
                  type="date"
                  value={milestone.date}
                  onChange={(e) => setMilestone({ ...milestone, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="milestone-desc">Description</Label>
                <Textarea
                  id="milestone-desc"
                  placeholder="Milestone details..."
                  value={milestone.description}
                  onChange={(e) => setMilestone({ ...milestone, description: e.target.value })}
                  rows={2}
                />
              </div>
              <Button onClick={handleMilestone} className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Create Milestone Event
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
