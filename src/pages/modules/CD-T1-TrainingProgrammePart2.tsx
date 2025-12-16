import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Printer, CheckCircle2, Clock, Users, AlertCircle, FileText, GraduationCap, BookOpen, Target, Lightbulb, UserCheck, ClipboardList, BarChart3, TrendingUp, RefreshCw, Award, ArrowRight, Calendar, Layers } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { toast } from "@/hooks/use-toast";
import { getModuleStatus, updateModuleStatus } from "@/lib/storage";

export default function CDT1TrainingProgrammePart2() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(() => getModuleStatus("cd-t1-training-part2"));

  const handleMarkComplete = () => {
    updateModuleStatus("cd-t1-training-part2", "completed");
    setStatus("completed");
    toast({
      title: "Part 2 Complete",
      description: "Training Programme Rollout & Embedding marked as complete!",
    });
  };

  const handlePrint = () => window.print();
  const handleDownload = (templateName: string) => {
    toast({
      title: "Downloading Template",
      description: `${templateName} will download shortly...`,
    });
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="text-sm">CD-T1</Badge>
              <Badge className="text-sm bg-accent text-accent-foreground">Enablement</Badge>
              <Badge variant="secondary">Part 2 of 2</Badge>
              <Badge variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}>
                {status === "completed" ? "✓ Complete" : status === "in-progress" ? "In Progress" : "Not Started"}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold">Training Programme Delivery</h1>
            <p className="text-xl text-primary font-medium">Part 2: Rollout & Embedding</p>
            <p className="text-lg text-muted-foreground">
              Deploy training across organisation and embed Consumer Duty competency as BAU
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleMarkComplete} disabled={status === "completed"}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
          </div>
        </div>
        
        <div className="flex gap-6 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Duration: Week 13+ (12-week rollout + ongoing)
          </span>
          <span className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Continuous: Refresher training ongoing
          </span>
        </div>

        <Alert className="bg-accent/10 border-accent/30">
          <BookOpen className="h-4 w-4" />
          <AlertDescription>
            <strong>Continuation from Part 1:</strong> This module assumes you have completed Training Needs Analysis, 
            curriculum design, and material development (Steps 1-4).{" "}
            <Link to="/enablement/training-part1" className="text-primary hover:underline">
              Return to Part 1
            </Link>
          </AlertDescription>
        </Alert>
      </div>

      <Separator />

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="steps">Implementation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="success">Success Criteria</TabsTrigger>
          <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Part 2: Training Delivery, Measurement & Embedding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Part 2 covers the critical deployment and embedding phases of the training programme. 
                This includes train-the-trainer programmes, phased rollout execution, comprehensive 
                effectiveness measurement using the Kirkpatrick model, and establishing continuous 
                learning as business-as-usual.
              </p>
              
              <div className="bg-background p-4 rounded-lg border">
                <p className="font-semibold mb-2">Critical Success Factor</p>
                <p className="text-sm text-muted-foreground">
                  "Training effectiveness measured by behaviour change and customer outcome improvements, 
                  not just completion rates"
                </p>
              </div>

              <div className="bg-background p-4 rounded-lg border">
                <p className="font-semibold mb-2">Key Principle</p>
                <p className="text-sm text-muted-foreground">
                  "Training is not a project - it's a permanent capability"
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Part 2 Covers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: "👨‍🏫", title: "Train-the-Trainer", desc: "Build internal delivery capability" },
                  { icon: "📅", title: "Phased Rollout", desc: "Execute training across all role groups" },
                  { icon: "✅", title: "Delivery QA", desc: "Ensure consistent training quality" },
                  { icon: "📊", title: "Kirkpatrick Measurement", desc: "4-level effectiveness evaluation" },
                  { icon: "🔄", title: "Refresher Training", desc: "Continuous learning approach" },
                  { icon: "💻", title: "Training Technology", desc: "LMS and platform requirements" },
                  { icon: "📁", title: "Records Management", desc: "Compliance tracking and reporting" },
                  { icon: "👔", title: "Leadership Engagement", desc: "Visible senior support" },
                  { icon: "🎯", title: "Performance Integration", desc: "Link training to appraisals" },
                  { icon: "📈", title: "Continuous Improvement", desc: "Ongoing programme enhancement" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prerequisites from Part 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Training Needs Analysis completed",
                  "Role-based curricula designed",
                  "All training materials developed",
                  "Competency assessment framework established",
                  "E-learning modules built and tested",
                  "Classroom materials finalized",
                  "Pilot training conducted and refined",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-success/10 border border-success/20">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kirkpatrick 4-Level Evaluation Model</CardTitle>
              <CardDescription>Framework for measuring training effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { level: "1", title: "Reaction", question: "Did they like it?", measure: "Satisfaction surveys, engagement" },
                  { level: "2", title: "Learning", question: "Did they learn?", measure: "Knowledge tests, skills demonstration" },
                  { level: "3", title: "Behavior", question: "Are they applying it?", measure: "Quality monitoring, manager observation" },
                  { level: "4", title: "Results", question: "Are outcomes improving?", measure: "Customer metrics, complaints, CSAT" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{item.level}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{item.title}</p>
                        <span className="text-xs text-muted-foreground italic">"{item.question}"</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.measure}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: REGULATORY FOUNDATION */}
        <TabsContent value="regulatory" className="space-y-6">
          <RegulatoryQuote
            source="FCA"
            reference="Guidance"
            quote="Firms should monitor the effectiveness of their training and take action to improve it where necessary"
          />

          <Card>
            <CardHeader>
              <CardTitle>Training Effectiveness Meaning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Training effectiveness means more than tracking attendance:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-card">
                  <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Must Demonstrate
                  </h5>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li>• Staff learned (knowledge gain)</li>
                    <li>• Staff can apply (skills demonstration)</li>
                    <li>• Behaviour changed (observed in practice)</li>
                    <li>• Customer outcomes improved (the proof)</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Evidence Required
                  </h5>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li>• Training records (who, what, when, pass/fail)</li>
                    <li>• Competency assessment results</li>
                    <li>• Quality monitoring showing improvement</li>
                    <li>• Customer outcome metrics improving</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SM&CR Accountability for Training Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="font-semibold mb-2">SMF Duty of Responsibility:</p>
                <p className="text-sm text-muted-foreground">
                  Senior managers must demonstrate they took reasonable steps to ensure training programme 
                  delivered to all relevant staff, monitor completion and competency, address gaps, provide 
                  resources, support application of learning, and review effectiveness.
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold text-sm mb-3">Evidence SMFs Need:</h5>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Training completion reports by function
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Competency assessment pass rates
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Quality monitoring results (before and after)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Staff feedback on training quality
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Action plans for addressing gaps
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg bg-warning/5 border-warning/30">
                <h5 className="font-semibold text-sm mb-3">Board Oversight Questions to Ask:</h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• What % of staff have completed required training?</li>
                  <li>• What evidence that training changing behaviour?</li>
                  <li>• Where are competency gaps and how being addressed?</li>
                  <li>• Are customer outcomes improving post-training?</li>
                  <li>• Is training budget adequate?</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refresher Training Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RegulatoryQuote
                source="FCA"
                reference="Guidance"
                quote="Training should not be a one-off exercise. Firms should provide refresher training and updates as the business or regulatory requirements change"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-sm mb-3">Triggers for Refresher/Update:</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Regular cycle (6-12 months)</li>
                    <li>• New regulatory guidance or FCA feedback</li>
                    <li>• Product launches or changes</li>
                    <li>• Process changes affecting customers</li>
                    <li>• Quality monitoring showing gaps</li>
                    <li>• Staff movement to new roles</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-sm mb-3">Proportionate Approach:</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Not full re-training for all updates</li>
                    <li>• Targeted briefings on specific changes</li>
                    <li>• Microlearning for minor updates</li>
                    <li>• Full refresher for major changes</li>
                    <li>• Annual cycle as minimum</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: IMPLEMENTATION STEPS */}
        <TabsContent value="steps" className="space-y-6">
          <Alert>
            <BookOpen className="h-4 w-4" />
            <AlertDescription>
              Part 2: Steps 5-8 - Train-the-Trainer, Rollout, Measurement, and Continuous Learning
            </AlertDescription>
          </Alert>

          {/* STEP 5 */}
          <Card>
            <CardHeader>
              <CardTitle>Phase 2: Train-the-Trainer & Pilot (Weeks 13-16)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ChecklistSection
                stepNumber={5}
                title="Develop and Deliver Train-the-Trainer Programme"
                description="Build internal training delivery capability"
                moduleId="cd-t1-part2"
                items={[
                  { id: "t1-5-1", label: "Define selection criteria for internal trainers", details: "Deep CD knowledge, credibility, communication skills, patience, enthusiasm, availability, diverse representation" },
                  { id: "t1-5-2", label: "Identify and recruit potential trainers for each pathway", details: "Board: Senior leader; Product: Head of Product; Customer-facing: Team leaders/quality coaches; Compliance: Compliance officers" },
                  { id: "t1-5-3", label: "Design 2-3 day train-the-trainer programme", details: "Consumer Duty deep dive, curriculum mastery, adult learning principles, delivery techniques, handling Q&A, assessment skills" },
                  { id: "t1-5-4", label: "Deliver train-the-trainer programme with practice sessions", details: "Teach-practice-feedback-refine cycle, peer observation, video recording for self-review, master trainer modeling" },
                  { id: "t1-5-5", label: "Implement trainer certification process", details: "Knowledge test (90%+), delivery skills observation, co-delivery with master trainer, solo delivery QA" },
                  { id: "t1-5-6", label: "Provide trainer support resources", details: "Facilitator guides, FAQs, access to CD expert, online trainer community, coaching after initial deliveries" },
                  { id: "t1-5-7", label: "Conduct pilot training sessions with representative groups", details: "10-15 participants per pilot, all pathways piloted, comprehensive feedback gathered" },
                  { id: "t1-5-8", label: "Refine training based on pilot feedback", details: "Address content gaps, adjust timing, improve materials, enhance engagement, fix technical issues" },
                ]}
              />

              <div className="bg-info/10 p-4 rounded-lg border border-info/30">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Why Train-the-Trainer?
                </h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• <strong>Cost-effective:</strong> Internal trainers cheaper than external at scale</li>
                  <li>• <strong>Sustainability:</strong> Internal capability for ongoing delivery and updates</li>
                  <li>• <strong>Credibility:</strong> Trainers from business understand context</li>
                  <li>• <strong>Flexibility:</strong> Can deliver when and where needed</li>
                  <li>• <strong>Cultural fit:</strong> Internal trainers model firm's culture</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* STEP 6 */}
          <Card>
            <CardHeader>
              <CardTitle>Phase 2: Execute Phased Training Rollout (Weeks 17-36)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ChecklistSection
                stepNumber={6}
                title="Execute Phased Training Rollout"
                description="Train all staff to required competency standard"
                moduleId="cd-t1-part2"
                items={[
                  { id: "t1-6-1", label: "Define rollout phases based on priority", details: "Phase 1 (Wks 17-20): Board/SMFs; Phase 2 (19-24): Product/marketing; Phase 3 (23-30): Customer-facing; Phase 4 (29-34): Support; Phase 5 (33-36): Compliance/Risk" },
                  { id: "t1-6-2", label: "Schedule training sessions with multiple options", details: "Avoid peak periods, morning/afternoon options, book venues in advance, send invitations 6-8 weeks ahead" },
                  { id: "t1-6-3", label: "Execute communication campaign to support rollout", details: "Executive message, personalized invitations, intranet articles, countdown communications, success stories" },
                  { id: "t1-6-4", label: "Engage managers to prepare and support their teams", details: "Manager toolkits, ensure attendance, pre/post training discussions" },
                  { id: "t1-6-5", label: "Track attendance and manage non-attendance", details: "Mandatory attendance tracking, escalation for non-attendance, re-scheduling options, make-up sessions" },
                  { id: "t1-6-6", label: "Conduct quality assurance during delivery", details: "Observe sample sessions, gather participant feedback, monitor trainer effectiveness, address issues immediately" },
                  { id: "t1-6-7", label: "Handle special populations", details: "New joiners (induction), internal movers, third parties, senior leaders with limited availability" },
                ]}
              />

              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold text-sm mb-3">Rollout Phase Rationale</h5>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li><strong>Senior leaders first:</strong> Model commitment, understand oversight role</li>
                  <li><strong>Product/commercial next:</strong> Stop creating poor outcomes at source</li>
                  <li><strong>Customer-facing after:</strong> Can apply what others are embedding</li>
                  <li><strong>Support functions later:</strong> But before regulatory deadline</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* STEP 7 */}
          <Card>
            <CardHeader>
              <CardTitle>Phase 3: Measurement & Continuous Improvement (Weeks 20+)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ChecklistSection
                stepNumber={7}
                title="Measure Training Effectiveness Using Kirkpatrick Model"
                description="Evidence that training is delivering intended outcomes"
                moduleId="cd-t1-part2"
                items={[
                  { id: "t1-7-1", label: "Level 1 - Reaction: Implement post-training evaluation forms", details: "Satisfaction, relevance, trainer effectiveness, materials quality. Target: >4.0/5 average, >80% highly relevant" },
                  { id: "t1-7-2", label: "Level 2 - Learning: Conduct pre/post knowledge tests", details: "Same test before/after, 80% passing score. Target: >90% pass first attempt, 30+ point improvement" },
                  { id: "t1-7-3", label: "Level 2 - Learning: Assess skills demonstration during training", details: "Role plays, case study analysis, competency rubric evaluation. Target: >85% achieve competency" },
                  { id: "t1-7-4", label: "Level 3 - Behavior: Monitor on-the-job application", details: "Quality monitoring pre/post training, manager observations, process compliance. Target: 20%+ QM score improvement" },
                  { id: "t1-7-5", label: "Level 3 - Behavior: Conduct follow-up assessments", details: "4-6 weeks, 3 months, 6 months after training. Target: >80% demonstrating behaviors consistently" },
                  { id: "t1-7-6", label: "Level 4 - Results: Link training to customer outcome metrics", details: "CSAT, complaints, FCR, vulnerable customer outcomes. Target: CSAT +10%, complaints -15% within 6 months" },
                  { id: "t1-7-7", label: "Establish continuous improvement cycle", details: "Quarterly training effectiveness review, annual comprehensive review, update materials based on evidence" },
                ]}
              />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="kirkpatrick-detail">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span>Kirkpatrick Measurement Detail</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <Badge className="mb-2">Level 1: Reaction</Badge>
                        <p className="text-xs text-muted-foreground mb-2">
                          Measure immediately after training via evaluation forms
                        </p>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Overall satisfaction (1-5 scale)</li>
                          <li>• Relevance to role</li>
                          <li>• Trainer effectiveness</li>
                          <li>• Materials quality</li>
                          <li>• Likelihood to recommend</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <Badge className="mb-2">Level 2: Learning</Badge>
                        <p className="text-xs text-muted-foreground mb-2">
                          Pre/post tests and skills demonstration
                        </p>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Knowledge test (80% pass mark)</li>
                          <li>• Role play assessment</li>
                          <li>• Case study analysis</li>
                          <li>• Competency certification</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <Badge className="mb-2">Level 3: Behavior</Badge>
                        <p className="text-xs text-muted-foreground mb-2">
                          Monitor at 4-6 weeks, 3 months, 6 months post-training
                        </p>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Quality monitoring scores</li>
                          <li>• Manager observations</li>
                          <li>• Process compliance rates</li>
                          <li>• Mystery shopping results</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <Badge className="mb-2">Level 4: Results</Badge>
                        <p className="text-xs text-muted-foreground mb-2">
                          Business and customer outcomes over 6-12 months
                        </p>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Customer satisfaction (CSAT, NPS)</li>
                          <li>• Complaint volumes and themes</li>
                          <li>• FOS uphold rates</li>
                          <li>• Vulnerable customer outcomes</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* STEP 8 */}
          <Card>
            <CardHeader>
              <CardTitle>Phase 3: Establish Refresher & Continuous Learning (Ongoing)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ChecklistSection
                stepNumber={8}
                title="Establish Refresher Training and Continuous Learning"
                description="Sustain competency and adapt to changes"
                moduleId="cd-t1-part2"
                items={[
                  { id: "t1-8-1", label: "Design annual refresher training programme", details: "2-4 hours (shorter than initial), recap + updates + case studies, interactive, light assessment" },
                  { id: "t1-8-2", label: "Develop microlearning resources", details: "3-5 minute videos, one-page guides, infographics, quick quizzes, weekly 'Consumer Duty Moment'" },
                  { id: "t1-8-3", label: "Establish communities of practice", details: "Online forums (Teams/Slack), topic-based channels, peer learning, SME moderators, monthly meetups" },
                  { id: "t1-8-4", label: "Implement horizon scanning for regulatory updates", details: "Monitor FCA publications, track enforcement actions, attend industry forums, rapid response to new guidance" },
                  { id: "t1-8-5", label: "Integrate Consumer Duty into all other training", details: "Product training, systems training, process training, leadership development - no CD silo" },
                  { id: "t1-8-6", label: "Implement or configure Learning Management System", details: "Centralized platform, course catalog, completion tracking, automated reminders, reporting" },
                  { id: "t1-8-7", label: "Establish training records management", details: "Individual history, assessment results, certificates, retention 6+ years, audit-ready reporting" },
                  { id: "t1-8-8", label: "Secure executive sponsorship and visible leadership support", details: "Leaders attend training, deliver/co-deliver sessions, recognize excellence, reference in communications" },
                ]}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-card">
                  <h5 className="font-semibold text-sm mb-2">Microlearning Topics</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Spotlight on specific vulnerability driver</li>
                    <li>• How to handle specific customer situation</li>
                    <li>• Recent FCA enforcement case and lessons</li>
                    <li>• Staff spotlight: Great CD example</li>
                    <li>• Regulatory update: 2-minute summary</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <h5 className="font-semibold text-sm mb-2">Records to Maintain</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Individual training history</li>
                    <li>• Assessment results and pass/fail</li>
                    <li>• Certificates issued</li>
                    <li>• Attendance registers</li>
                    <li>• Trainer certifications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/50 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-success" />
                Module Complete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You have completed both parts of the Training Programme Delivery module. Part 1 covered 
                programme design and Part 2 covered delivery, measurement, and embedding.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" asChild>
                  <Link to="/enablement/training-part1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Part 1
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/monitoring/mi-framework">
                    Next: MI & Outcome Monitoring
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: TEMPLATES & TOOLS */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateCard
              title="Train-the-Trainer Programme Design"
              description="Complete programme outline with objectives, agenda, activities, assessment methods, and certification criteria"
              format="Word"
              onDownload={() => handleDownload("Train-the-Trainer Programme")}
            />
            <TemplateCard
              title="Trainer Certification Assessment"
              description="Multi-method assessment with knowledge test, delivery observation, co-delivery evaluation, and certification forms"
              format="Word"
              onDownload={() => handleDownload("Trainer Certification Assessment")}
            />
            <TemplateCard
              title="Pilot Training Evaluation Form"
              description="Comprehensive evaluation tool for content, delivery, materials, assessment, and logistics"
              format="Word"
              onDownload={() => handleDownload("Pilot Evaluation Form")}
            />
            <TemplateCard
              title="Training Rollout Project Plan"
              description="Detailed Gantt chart with all sessions scheduled, dependencies, milestones, and resource allocation"
              format="Excel"
              onDownload={() => handleDownload("Rollout Project Plan")}
            />
            <TemplateCard
              title="Training Session Attendance Register"
              description="Session tracking with participant list, attendance confirmation, assessment results, and certificates"
              format="Excel"
              onDownload={() => handleDownload("Attendance Register")}
            />
            <TemplateCard
              title="Training Quality Assurance Checklist"
              description="QA observation tool for reviewing training delivery quality with improvement recommendations"
              format="Word"
              onDownload={() => handleDownload("QA Checklist")}
            />
            <TemplateCard
              title="Level 1 Evaluation Form (Reaction)"
              description="Post-training satisfaction survey with ratings, open feedback, and recommendations tracking"
              format="Word"
              onDownload={() => handleDownload("Level 1 Evaluation Form")}
            />
            <TemplateCard
              title="Consumer Duty Knowledge Test"
              description="Role-specific knowledge assessment with 20-25 questions, multiple choice and scenarios, 80% pass mark"
              format="Word"
              onDownload={() => handleDownload("Knowledge Test")}
            />
            <TemplateCard
              title="Skills Assessment Rubric"
              description="Competency evaluation tool with criteria for each performance level and feedback templates"
              format="Excel"
              onDownload={() => handleDownload("Skills Rubric")}
            />
            <TemplateCard
              title="Post-Training Quality Monitoring Checklist"
              description="Consumer Duty-specific quality criteria for measuring behaviour change by outcome area"
              format="Word"
              onDownload={() => handleDownload("Post-Training QM Checklist")}
            />
            <TemplateCard
              title="Behaviour Change Tracking Dashboard"
              description="Excel dashboard showing Level 3 measurement with quality scores over time and trends"
              format="Excel"
              onDownload={() => handleDownload("Behaviour Change Dashboard")}
            />
            <TemplateCard
              title="Level 4 Outcome Metrics Dashboard"
              description="Strategic dashboard linking training to business results with ROI calculation"
              format="Excel"
              onDownload={() => handleDownload("Outcome Metrics Dashboard")}
            />
            <TemplateCard
              title="Training Effectiveness Board Report"
              description="Executive summary template with participation stats, Kirkpatrick results, achievements, and plans"
              format="PowerPoint"
              onDownload={() => handleDownload("Board Report Template")}
            />
            <TemplateCard
              title="Annual Refresher Training Programme"
              description="Streamlined annual programme with updates, case studies, light assessment, and delivery schedule"
              format="Word"
              onDownload={() => handleDownload("Refresher Programme")}
            />
            <TemplateCard
              title="Microlearning Content Calendar"
              description="12-month calendar with weekly content planned, formats, topics, owners, and distribution channels"
              format="Excel"
              onDownload={() => handleDownload("Microlearning Calendar")}
            />
            <TemplateCard
              title="Training Records Register"
              description="Central record of all training with individual history, compliance status, and reporting"
              format="Excel"
              onDownload={() => handleDownload("Training Records Register")}
            />
            <TemplateCard
              title="Training Compliance Dashboard"
              description="Operational dashboard with completion rates by department, RAG status, and escalation flags"
              format="Excel"
              onDownload={() => handleDownload("Compliance Dashboard")}
            />
            <TemplateCard
              title="LMS Requirements Specification"
              description="Functional, technical, user, and commercial requirements for LMS procurement"
              format="Word"
              onDownload={() => handleDownload("LMS Requirements")}
            />
          </div>
        </TabsContent>

        {/* TAB 5: SUCCESS CRITERIA */}
        <TabsContent value="success" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Delivery Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  ">95% of all staff completed required training by deadline",
                  ">90% pass rate on initial assessment (first attempt)",
                  "<5% require remedial training",
                  "All curriculum pathways delivered successfully",
                  "Pilot training completed with positive feedback (>4.0/5)",
                  "Internal trainers certified and delivering quality training",
                  "Training quality consistently rated >4.0/5 by participants",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/5">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competency Development</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Post-training knowledge scores average 30+ percentage points higher than pre-training",
                  ">85% of staff demonstrate required behaviours in quality monitoring",
                  "Manager assessments confirm >80% applying learning effectively",
                  "Competency maintained at 6-month follow-up",
                  "Staff confidence in applying Consumer Duty significantly increased",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/5">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Outcome Improvements (Level 4)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Customer satisfaction scores improved by 10%+ within 6 months of training",
                  "Consumer Duty-related complaints decreased by 15%+",
                  "Vulnerable customer outcome variance narrowed (within 5% of overall)",
                  "Quality monitoring scores improved by 20%+",
                  "FOS uphold rates decreased (if applicable)",
                  "Clear evidence training contributed to better outcomes",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/5">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Programme Sustainability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Refresher training programme established and operational",
                  "Microlearning and continuous learning embedded",
                  "Communities of practice active and engaged",
                  "Training integrated into induction for new joiners",
                  "Regulatory updates rapidly incorporated into training",
                  "Training records and compliance tracking functioning effectively",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/5">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline Metrics (Part 2)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { milestone: "Pilot completed", week: "Week 16" },
                  { milestone: "Phase 1 (Board/SMF) trained", week: "Week 20" },
                  { milestone: "Phase 3 (Customer-facing) trained", week: "Week 30" },
                  { milestone: "100% of required staff trained", week: "Week 36" },
                  { milestone: "First refresher cycle commenced", week: "Month 12" },
                  { milestone: "Level 4 outcome improvements evidenced", week: "Month 6-12" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{item.milestone}</span>
                    <Badge variant="outline">{item.week}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: COMMON PITFALLS */}
        <TabsContent value="pitfalls" className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Part 2 pitfalls (11-20) - continuing from Part 1 pitfalls (1-10)
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-4">
            <PitfallCard
              title="Training Rollout Too Slow"
              description="Firms running training as 'slow burn' project when regulatory deadline approaching - not all staff trained by required date"
              impact="Compliance risk, rushed training at end, poor quality"
              prevention="Aggressive rollout schedule with multiple sessions per week. Complete 90%+ within 6 months"
            />
            <PitfallCard
              title="Poor Attendance Management"
              description="Training optional in practice - no consequences for non-attendance leads to low completion, especially senior roles"
              impact="Cultural signal that Consumer Duty isn't important"
              prevention="Mandatory attendance linked to performance objectives. Escalation to SMF for non-compliance"
            />
            <PitfallCard
              title="Measuring Completion, Not Effectiveness"
              description="Firms track training completion rates but not whether training actually working - cannot demonstrate results"
              impact="Doing training for show, no evidence of impact"
              prevention="Four-level Kirkpatrick evaluation. Must evidence behaviour change and outcome improvements"
            />
            <PitfallCard
              title="No Refresher Training"
              description="Training treated as one-off project. Staff knowledge fades over time, cannot respond to regulatory updates"
              impact="Competency drift, culture erodes, 70% forgotten within 6 months"
              prevention="Annual refreshers mandatory. Microlearning ongoing. Updates when regulations change"
            />
            <PitfallCard
              title="Internal Trainers Not Properly Prepared"
              description="Internal trainers teaching without adequate preparation or subject matter expertise - poor quality, incorrect information"
              impact="Low credibility, inconsistent delivery, errors propagated"
              prevention="Rigorous train-the-trainer. Certification required. Ongoing coaching and calibration"
            />
            <PitfallCard
              title="Technology Failures Disrupting Delivery"
              description="Training delayed or ineffective due to poor technology (video conference, LMS issues)"
              impact="Frustrated participants, wasted time, poor learning experience"
              prevention="Test technology thoroughly before sessions. Have backup plans. Technical support on standby"
            />
            <PitfallCard
              title="Training Records Inadequate for Regulatory Review"
              description="Cannot produce evidence of who trained, when, assessment results when regulator asks"
              impact="Regulatory criticism, potential enforcement, cannot defend compliance"
              prevention="Comprehensive training records system. Audit trail. Regular reporting. Records readily accessible (24-48 hours)"
            />
            <PitfallCard
              title="No Consequences for Poor Application"
              description="Staff trained but not applying learning. No link to performance management or consequences"
              impact="Training wasted, behaviours don't change, culture unchanged"
              prevention="Consumer Duty competency in performance objectives. Quality monitoring. Coaching. Performance management"
            />
            <PitfallCard
              title="Senior Leaders Not Role Modeling"
              description="Board and senior leaders exempting themselves from training or not demonstrating Consumer Duty behaviours"
              impact="Undermines entire programme, sends message it's not important"
              prevention="Board and SMF train first. Visible participation. Reference Consumer Duty in communications"
            />
            <PitfallCard
              title="Failing to Adapt Training Based on Feedback"
              description="Training continues unchanged despite feedback showing issues with content, delivery, or effectiveness"
              impact="Known problems not fixed, training becomes stale"
              prevention="Quarterly review of all training feedback. Evidence-based improvements. Update materials regularly"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
