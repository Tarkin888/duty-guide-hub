import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  ArrowLeft, 
  Users, 
  Target, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Megaphone,
  Heart,
  Shield,
  TrendingUp,
  UserCheck,
  Building2,
  Lightbulb,
  MessageCircle,
  Eye,
  UserX,
  Zap,
  Calendar,
  Award,
  PartyPopper,
  RefreshCw,
  BarChart3,
  Star,
  Rocket,
  Volume2
} from "lucide-react";
import { Link } from "react-router-dom";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CDT2CommunicationsChangePart2() {
  const [activeTab, setActiveTab] = useState("implementation");

  const step7Items = [
    { id: "7.1", label: "Pre-Launch Preparation (Week 6)", details: "Final checks: materials approved, hub tested, FAQ ready, leadership briefed, champions ready, managers have toolkits, IT ready, contingency plan" },
    { id: "7.2", label: "Launch Week Activities (Week 7)", details: "Day 1: CEO video launch. Day 2: Executive cascade. Day 3: Manager cascade. Day 4: Champions activated. Day 5: First town hall Q&A" },
    { id: "7.3", label: "Post-Launch Momentum (Weeks 8-10)", details: "Weekly touchpoints: success stories, champion spotlights, training launch, quick wins, first pulse survey" },
    { id: "7.4", label: "Monitor and Adapt", details: "Track email open rates, hub traffic, town hall attendance, Q&A themes, pulse survey results. Be ready to pivot" }
  ];

  const step8Items = [
    { id: "8.1", label: "Establish 'Consumer Duty Conversation' Series", details: "Monthly themed discussions: Basics (M1-2), Four Outcomes (M3-4), Vulnerable Customers (M5-6), Distribution (M7-8), MI (M9-10), Improvement (M11-12)" },
    { id: "8.2", label: "Create 'Ask Me Anything' (AMA) Forums", details: "Monthly virtual sessions with rotating senior leaders, open Q&A, honest transparent answers" },
    { id: "8.3", label: "Launch 'Success Stories' Campaign", details: "Collect examples of Consumer Duty in action, create case studies and videos, weekly spotlight distribution" },
    { id: "8.4", label: "Implement 'Quick Wins' Strategy", details: "Identify achievements within 4-8 weeks, celebrate visible progress, build confidence in change" },
    { id: "8.5", label: "Maintain Champion Network Vitality", details: "Monthly calls, community platform, quarterly gatherings, champion development, recognition, wellbeing monitoring" }
  ];

  const step9Items = [
    { id: "9.1", label: "Establish Resistance Monitoring System", details: "Collect data from manager reports, pulse surveys, champion feedback, Q&A analysis, training evaluation, attendance tracking" },
    { id: "9.2", label: "Categorise and Prioritise Resistance", details: "Map by type (Rational/Emotional/Political/Values), prioritise by impact and influence" },
    { id: "9.3", label: "Execute Intervention Protocols", details: "Individual: Level 1 Curious Conversation → Level 2 Targeted Support → Level 3 Formal Process. Group/Org interventions for widespread resistance" },
    { id: "9.4", label: "Address 'Rumour Mill' Proactively", details: "Monitor, confirm, understand root cause, respond quickly and transparently, follow through on commitments" }
  ];

  const step10Items = [
    { id: "10.1", label: "Design Culture Assessment Methodology", details: "7 dimensions: Awareness, Leadership, Behaviours, Speak-Up, Resources, Values, Embedding. Mix quantitative, qualitative, behavioural methods" },
    { id: "10.2", label: "Conduct First Culture Assessment (Month 6)", details: "Launch survey, focus groups, interviews. Analyse by function, location, level. Share results transparently with action plan" },
    { id: "10.3", label: "Establish Ongoing Behaviour Measurement", details: "Track customer service, product design, FVA, communication testing, decision-making, speak-up behaviours" },
    { id: "10.4", label: "Track Maturity Progression", details: "Use 5-level maturity model: Nascent → Developing → Defined → Managed → Optimising. Quarterly assessment" }
  ];

  const step11Items = [
    { id: "11.1", label: "Design Recognition Framework", details: "Principles: Timely, Specific, Authentic, Public & Private, Inclusive, Aligned. Types: Informal, Formal, Team" },
    { id: "11.2", label: "Establish Award Categories", details: "Customer First, Innovation, Speaking Up, Cross-Collaboration, Continuous Improvement awards. Annual leadership awards" },
    { id: "11.3", label: "Celebrate Milestones & Wins", details: "Implementation milestones, outcome achievements, culture shifts. Multiple celebration formats" },
    { id: "11.4", label: "Share Success Stories Continuously", details: "Weekly spotlights, monthly videos, quarterly roundups. Ensure diversity of stories across all functions and levels" }
  ];

  const step12Items = [
    { id: "12.1", label: "Shift from 'Change' to 'BAU' Messaging", details: "Early: 'We're implementing'. Middle: 'We're embedding'. Mature: 'This is how we work now'" },
    { id: "12.2", label: "Establish Ongoing Communication Rhythm", details: "Quarterly: CEO update, town hall, pulse. Monthly: Success story, champion call. Annual: Board report, culture assessment, awards" },
    { id: "12.3", label: "Integrate Consumer Duty into Existing Communications", details: "Business updates, strategy, product launches, risk reports, HR communications - all reference Consumer Duty naturally" },
    { id: "12.4", label: "Refresh and Renew Periodically", details: "Annual content refresh, champion network renewal, leadership rotation, innovation challenges" }
  ];

  const maturityLevels = [
    { level: 1, name: "Nascent", weeks: "1-8", description: "Awareness building, policies developing, ad hoc activities, compliance-focused" },
    { level: 2, name: "Developing", weeks: "8-16", description: "Understanding increasing, processes defined, some practices inconsistent" },
    { level: 3, name: "Defined", weeks: "16-28", description: "Good understanding, processes consistent, evidence being generated, behaviours visible" },
    { level: 4, name: "Managed", weeks: "28-40", description: "Strong understanding, proactive approach, MI driving decisions, cultural shift evident" },
    { level: 5, name: "Optimising", weeks: "40+", description: "Embedded as BAU, continuous improvement, innovation, outcome-focused culture" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">CD-T2</Badge>
                  <Badge className="bg-accent text-accent-foreground text-xs">Part 2 of 2</Badge>
                  <Badge variant="secondary" className="text-xs">Enablement</Badge>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Communications & Change Management</h1>
                <p className="text-muted-foreground">Execution & Embedding</p>
              </div>
            </div>
            <Link to="/enablement/communications-part1">
              <Button variant="outline" size="sm">
                ← Back to Part 1
              </Button>
            </Link>
          </div>
        </div>

        {/* Continuation Banner */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Rocket className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Part 2: Execution & Embedding (Weeks 6-52+)</p>
                <p className="text-sm text-muted-foreground">
                  Building on Foundation & Planning from Part 1, this section covers launch, ongoing engagement, resistance management, culture assessment, recognition, and long-term sustainment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
          </TabsList>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            {/* Phase 3: Execution */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge className="bg-primary">Phase 3</Badge>
                Execution (Weeks 6-20)
              </h3>

              <ChecklistSection
                moduleId="cd-t2-part2"
                stepNumber={7}
                title="Launch Internal Communications Campaign"
                items={step7Items}
              />

              {/* Launch Week Detail */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-primary" />
                    Launch Week Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <Badge className="mb-2">Day 1</Badge>
                      <p className="text-sm font-medium">CEO Video</p>
                      <p className="text-xs text-muted-foreground">9am launch, all-staff email, intranet takeover</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <Badge className="mb-2">Day 2</Badge>
                      <p className="text-sm font-medium">Executive Cascade</p>
                      <p className="text-xs text-muted-foreground">Each exec messages their function</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <Badge className="mb-2">Day 3</Badge>
                      <p className="text-sm font-medium">Manager Cascade</p>
                      <p className="text-xs text-muted-foreground">30-min team briefings using toolkit</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <Badge className="mb-2">Day 4</Badge>
                      <p className="text-sm font-medium">Champions Active</p>
                      <p className="text-xs text-muted-foreground">Network introduced, peer conversations</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <Badge className="mb-2">Day 5</Badge>
                      <p className="text-sm font-medium">Town Hall Q&A</p>
                      <p className="text-xs text-muted-foreground">Live Q&A with CEO, recorded</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ChecklistSection
                moduleId="cd-t2-part2"
                stepNumber={8}
                title="Execute Ongoing Engagement Activities"
                items={step8Items}
              />

              {/* Engagement Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    12-Month Engagement Themes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-6 gap-2">
                    <div className="p-2 bg-muted/50 rounded text-center">
                      <p className="text-xs font-medium">M1-2</p>
                      <p className="text-xs text-muted-foreground">The Basics</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-center">
                      <p className="text-xs font-medium">M3-4</p>
                      <p className="text-xs text-muted-foreground">Four Outcomes</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-center">
                      <p className="text-xs font-medium">M5-6</p>
                      <p className="text-xs text-muted-foreground">Vulnerable Customers</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-center">
                      <p className="text-xs font-medium">M7-8</p>
                      <p className="text-xs text-muted-foreground">Distribution Chain</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-center">
                      <p className="text-xs font-medium">M9-10</p>
                      <p className="text-xs text-muted-foreground">MI & Monitoring</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-center">
                      <p className="text-xs font-medium">M11-12</p>
                      <p className="text-xs text-muted-foreground">Continuous Improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ChecklistSection
                moduleId="cd-t2-part2"
                stepNumber={9}
                title="Manage Resistance Proactively"
                items={step9Items}
              />

              {/* Intervention Ladder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserX className="h-5 w-5 text-primary" />
                    Individual Resistance Intervention Ladder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-green-500 bg-green-500/5 rounded-r-lg">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/10">Level 1</Badge>
                        Curious Conversation
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">Manager-led. Early signs of concern. Listen, acknowledge, explain, address, follow up.</p>
                      <p className="text-xs text-muted-foreground mt-2 italic">"I've noticed you seem concerned about Consumer Duty. Can you share what's worrying you?"</p>
                    </div>
                    <div className="p-4 border-l-4 border-amber-500 bg-amber-500/5 rounded-r-lg">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Badge variant="outline" className="bg-amber-500/10">Level 2</Badge>
                        Targeted Support
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">Manager + HR/Core Team. Continued resistance. Additional training, peer mentor, clear expectations, support plan.</p>
                    </div>
                    <div className="p-4 border-l-4 border-destructive bg-destructive/5 rounded-r-lg">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Badge variant="outline" className="bg-destructive/10">Level 3</Badge>
                        Formal Process
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">Manager + HR. Resistance becomes obstruction. Formal meeting, PIP, weekly reviews, escalation if no improvement.</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">Note: Most resistance resolves at Levels 1-2. Level 3 is rare but necessary for serial obstructors.</p>
                </CardContent>
              </Card>
            </div>

            {/* Phase 4: Embedding */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge className="bg-primary">Phase 4</Badge>
                Embedding & Sustainment (Weeks 20-52+)
              </h3>

              <ChecklistSection
                moduleId="cd-t2-part2"
                stepNumber={10}
                title="Conduct Culture Assessment & Behaviour Measurement"
                items={step10Items}
              />

              {/* Culture Dimensions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Culture Assessment Dimensions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">Awareness & Understanding</h5>
                      <p className="text-xs text-muted-foreground">Know what Consumer Duty means for role</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">Leadership & Accountability</h5>
                      <p className="text-xs text-muted-foreground">Leaders champion, staff feel accountable</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">Behaviours & Decisions</h5>
                      <p className="text-xs text-muted-foreground">Outcomes considered, work has changed</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">Speak-Up Culture</h5>
                      <p className="text-xs text-muted-foreground">Comfortable raising concerns</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">Resources & Support</h5>
                      <p className="text-xs text-muted-foreground">Tools, time, training available</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">Values Alignment</h5>
                      <p className="text-xs text-muted-foreground">Aligns with org values, proud of approach</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">Embedding & Maturity</h5>
                      <p className="text-xs text-muted-foreground">BAU not project, continuously improving</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Maturity Model */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Maturity Progression Model
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {maturityLevels.map((level) => (
                      <div key={level.level} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {level.level}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{level.name}</span>
                            <Badge variant="outline" className="text-xs">Weeks {level.weeks}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <ChecklistSection
                moduleId="cd-t2-part2"
                stepNumber={11}
                title="Implement Recognition & Celebration Programme"
                items={step11Items}
              />

              {/* Award Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Recognition Award Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <Star className="h-5 w-5 text-accent mb-2" />
                      <h5 className="font-semibold mb-1">Customer First Award</h5>
                      <p className="text-xs text-muted-foreground">Exceptional focus on customer outcomes</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-accent mb-2" />
                      <h5 className="font-semibold mb-1">Innovation Award</h5>
                      <p className="text-xs text-muted-foreground">Creative approaches to implementation</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <Volume2 className="h-5 w-5 text-accent mb-2" />
                      <h5 className="font-semibold mb-1">Speaking Up Award</h5>
                      <p className="text-xs text-muted-foreground">Raising concerns that prevented harm</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <Users className="h-5 w-5 text-accent mb-2" />
                      <h5 className="font-semibold mb-1">Cross-Collaboration Award</h5>
                      <p className="text-xs text-muted-foreground">Breaking silos for better outcomes</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <RefreshCw className="h-5 w-5 text-accent mb-2" />
                      <h5 className="font-semibold mb-1">Continuous Improvement Award</h5>
                      <p className="text-xs text-muted-foreground">Learning and driving improvements</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <Heart className="h-5 w-5 text-accent mb-2" />
                      <h5 className="font-semibold mb-1">Cultural Champion Award</h5>
                      <p className="text-xs text-muted-foreground">Most influenced cultural change (Annual)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ChecklistSection
                moduleId="cd-t2-part2"
                stepNumber={12}
                title="Sustain Communication & Engagement Long-Term"
                items={step12Items}
              />

              {/* Message Evolution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Message Evolution Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <Badge variant="outline" className="mb-2">Months 1-6</Badge>
                      <p className="font-medium">"We're implementing Consumer Duty..."</p>
                      <p className="text-sm text-muted-foreground mt-1">Focus: Change, transformation, new approach</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Badge variant="outline" className="mb-2">Months 6-12</Badge>
                      <p className="font-medium">"We're embedding Consumer Duty..."</p>
                      <p className="text-sm text-muted-foreground mt-1">Focus: Integration, learning, improving</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                      <Badge className="mb-2">Months 12-18+</Badge>
                      <p className="font-medium">"This is how we work now..."</p>
                      <p className="text-sm text-muted-foreground mt-1">Focus: Business as usual, continuous improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Principle */}
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <PartyPopper className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Key Principle</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Celebrate the journey, not just the destination.</strong> Cultural transformation takes 18-24 months. Maintain resources and attention throughout - this is a marathon, not a sprint.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <TemplateCard
                title="Launch Week Communication Plan"
                description="Detailed daily plan with hour-by-hour schedule for launch week, pre-launch checklist, contingency plans, and template messages"
                format="Excel"
              />
              <TemplateCard
                title="Ongoing Engagement Activity Calendar"
                description="12-month rolling calendar with activities, themes, owners, audiences, and success metrics tracking"
                format="Excel"
              />
              <TemplateCard
                title="Success Story Template & Submission Form"
                description="Structured template for capturing and sharing success stories with Challenge, Action, Outcome, Learning format"
                format="Word"
              />
              <TemplateCard
                title="Culture Assessment Survey"
                description="25-30 question survey covering 7 dimensions with rating scales and open text, plus analysis framework"
                format="Word"
              />
              <TemplateCard
                title="Resistance Tracking Log"
                description="Comprehensive log for tracking resistance cases, interventions, outcomes with privacy guidelines and case studies"
                format="Excel"
              />
              <TemplateCard
                title="Recognition & Awards Nomination Form"
                description="Structured nomination form with categories, evidence requirements, and selection process documentation"
                format="Word"
              />
            </div>

            {/* Template Details */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="launch">
                <AccordionTrigger>Template 7: Launch Week Communication Plan Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Columns:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Day/Date, Time, Activity</li>
                      <li>Communication Channel, Owner, Audience</li>
                      <li>Content Description, Materials Needed</li>
                      <li>Preparation Required, Backup Plan</li>
                      <li>Success Measure, Status, Notes</li>
                    </ul>
                    <p className="mt-2"><strong>Includes:</strong> Pre-launch checklist, hour-by-hour schedule, post-launch follow-up, contingency plans, template messages</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="culture">
                <AccordionTrigger>Template 10: Culture Assessment Survey Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Survey Structure (25-30 questions):</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Section 1: Awareness & Understanding (5 questions)</li>
                      <li>Section 2: Leadership & Accountability (5 questions)</li>
                      <li>Section 3: Behaviours & Decision-Making (5 questions)</li>
                      <li>Section 4: Speak-Up Culture (4 questions)</li>
                      <li>Section 5: Resources & Support (4 questions)</li>
                      <li>Section 6: Values Alignment (3 questions)</li>
                      <li>Section 7: Embedding & Maturity (3 questions)</li>
                      <li>Section 8: Overall & Open Feedback (2 questions)</li>
                    </ul>
                    <p className="mt-2"><strong>Demographics:</strong> Function, Job Level, Location, Tenure</p>
                    <p><strong>Includes:</strong> Deployment instructions, analysis framework, benchmarking guidance, reporting templates</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="resistance">
                <AccordionTrigger>Template 11: Resistance Tracking Log Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Columns:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>ID Number, Date Identified, Individual/Team</li>
                      <li>Function/Department, Type of Resistance</li>
                      <li>Description, Impact Level, Root Cause Analysis</li>
                      <li>Intervention Level (1/2/3), Actions Taken, Owner</li>
                      <li>Date of Intervention, Outcome, Current Status</li>
                      <li>Lessons Learned</li>
                    </ul>
                    <p className="mt-2"><strong>Includes:</strong> Privacy guidelines, escalation criteria, intervention protocol quick reference, anonymised case studies</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="story">
                <AccordionTrigger>Template 9: Success Story Template Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Story Content Structure:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li><strong>The Challenge</strong> (150 words) - What customer outcome issue existed?</li>
                      <li><strong>The Action</strong> (200 words) - What did you/your team do?</li>
                      <li><strong>The Outcome</strong> (150 words) - What improved for customers?</li>
                      <li><strong>The Learning</strong> (100 words) - What did you learn?</li>
                    </ol>
                    <p className="mt-2"><strong>Supporting Info:</strong> Photos, quotes, customer feedback, data, manager approval</p>
                    <p><strong>Includes:</strong> Submission form, editorial guidelines, review process, publication schedule</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            {/* Execution Phase */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Execution Phase Success Criteria (Weeks 6-20)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Megaphone className="h-4 w-4 text-primary" />
                      Launch Effectiveness (Weeks 7-12)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;80% email open rate on CEO launch message
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;60% attendance at launch town hall
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;1,000 intranet hub page views in first week
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;50 questions submitted in first month
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        100% of managers cascade briefing to teams
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      Engagement Metrics (Weeks 8-20)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;70% attendance at monthly conversation sessions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;20 success stories submitted by Month 5
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;100 active participants in champion community
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        AMA sessions averaging &gt;40 attendees
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Pulse survey showing &gt;80% awareness by Month 3
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Behaviour Change Evidence (by Week 20)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Call quality shows Consumer Duty in &gt;75% of calls
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        100% product approval checklist completion
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Fair value assessments 100% complete
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;90% priority communications tested
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <UserX className="h-4 w-4 text-primary" />
                      Resistance Management
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        All identified resistance documented
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;90% rational resistance resolved
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &lt;5% active obstruction by Week 20
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        No unaddressed senior/middle management resistance
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Embedding Phase */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Culture Assessment Target Scores
                </CardTitle>
                <CardDescription>Target % Agree or Strongly Agree</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Awareness</h5>
                    <p className="text-2xl font-bold text-primary">&gt;85%</p>
                    <p className="text-xs text-muted-foreground">Understand role impact</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Leadership</h5>
                    <p className="text-2xl font-bold text-primary">&gt;80%</p>
                    <p className="text-xs text-muted-foreground">Leaders visibly champion</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Behaviours</h5>
                    <p className="text-2xl font-bold text-primary">&gt;80%</p>
                    <p className="text-xs text-muted-foreground">Outcomes in decisions</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Speak-Up</h5>
                    <p className="text-2xl font-bold text-primary">&gt;75%</p>
                    <p className="text-xs text-muted-foreground">Comfortable raising concerns</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Resources</h5>
                    <p className="text-2xl font-bold text-primary">&gt;75%</p>
                    <p className="text-xs text-muted-foreground">Have tools and time</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Values</h5>
                    <p className="text-2xl font-bold text-primary">&gt;85%</p>
                    <p className="text-xs text-muted-foreground">Aligns with org values</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Embedding</h5>
                    <p className="text-2xl font-bold text-primary">&gt;70%</p>
                    <p className="text-xs text-muted-foreground">BAU not project (by M12)</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Overall</h5>
                    <p className="text-2xl font-bold text-primary">&gt;7.5/10</p>
                    <p className="text-xs text-muted-foreground">Average by Month 12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Maturity Progression */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Maturity Progression Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Month 6</span>
                    <Badge>Level 3 (Defined)</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Month 12</span>
                    <Badge>Level 4 (Managed)</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="font-medium">Month 18</span>
                    <Badge className="bg-primary">Level 4-5 (Managed/Optimising)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Long-Term Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Long-Term Sustainment Indicators (Month 18+)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    Consumer Duty integrated into all business communications
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    No longer referred to as "project" or "initiative"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    Staff using Consumer Duty language naturally
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    New hires onboarded with Consumer Duty from day 1
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    Continuous improvement suggestions regularly implemented
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    External recognition (awards, FCA acknowledgment, speaking opportunities)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <PitfallCard
              title="Pitfall 8: 'Launch & Fade' - Strong Start, Weak Follow-Through"
              description="Initial enthusiasm during launch phase but engagement declined significantly after 3-6 months. Communications become sporadic, town halls poorly attended, champion network goes quiet."
              impact="Change momentum lost, staff conclude 'not really important', revert to old ways, cultural transformation fails."
              prevention="Plan for the marathon not sprint. Communication calendar 12+ months. Maintain leadership visibility. Champion network actively supported. Celebrate wins continuously. Measure engagement monthly."
            />

            <PitfallCard
              title="Pitfall 9: 'Survey Fatigue' - Over-Measuring Without Action"
              description="Extensive surveying but limited evidence of action taken based on feedback. Staff stop responding and become cynical."
              impact="Low survey participation, cynicism ('Why bother? Nothing changes'), miss valuable feedback, channels become useless."
              prevention="Survey only when prepared to act. Close feedback loop: 'You said, we did'. Share results transparently. Clear action plans with owners. Limit frequency (quarterly max for pulse)."
            />

            <PitfallCard
              title="Pitfall 10: 'Champion Burnout' - Overwhelming Volunteers"
              description="Change champion networks started strong but experienced high attrition due to excessive demands. Too many requests, insufficient support, conflicting with day job."
              impact="Champions quit, network collapses, peer-to-peer support lost, grassroots momentum dies."
              prevention="Clear realistic time commitment (2-4 hrs/month). Manager endorsement required. Robust support from core team. Don't overload. Regular appreciation. Allow opt-out without stigma."
            />

            <PitfallCard
              title="Pitfall 11: 'Recognition Inequity' - Same People Always Recognised"
              description="Recognition concentrated on senior staff or compliance function; front-line staff feel invisible. Every success story features same roles and locations."
              impact="Reinforces 'compliance initiative' perception, front-line disengage, misses opportunity to motivate majority, creates in-group/out-group."
              prevention="Actively seek stories from ALL functions and levels. Proactively reach out to underrepresented areas. Recognise 'unsung heroes'. Include teams not just individuals. Geographic diversity."
            />

            <PitfallCard
              title="Pitfall 12: 'Forgetting the Customer' - Internal Focus Only"
              description="Communications focused entirely on internal implementation; no connection to actual customer outcomes. All about training dates and policy submissions."
              impact="Feels like compliance exercise, staff don't connect to real impact, miss opportunity to inspire, lose sight of the 'why'."
              prevention="Include real customer impact stories. Share customer feedback and testimonials. Show before/after improvements. Celebrate outcome improvements. Bring customer voice into organisation."
            />

            <PitfallCard
              title="Pitfall 13: 'Culture vs Compliance Conflict' - Mixed Messages"
              description="Staff receiving conflicting messages - Consumer Duty values vs sales/efficiency targets. Leaders say 'take time for vulnerable customers' but managers pressure on handle time."
              impact="Staff confusion and cynicism, compliance vs performance anxiety, cultural transformation undermined."
              prevention="Align ALL performance measures with Consumer Duty. Review incentive schemes for conflicts. Adjust efficiency targets. Recognise Consumer Duty behaviours. Walk the talk - decisions must match words."
            />

            <PitfallCard
              title="Pitfall 14: 'Premature Celebration' - Declaring Success Too Early"
              description="Organisations declaring 'Consumer Duty embedded' after 6 months when evidence shows otherwise. Pressure to 'move on' and close the project."
              impact="Resources withdrawn prematurely, communication stops, staff conclude 'back to normal', actual embedding never happens."
              prevention="Set realistic expectations (18-24 months to full maturity). Define clear criteria for 'embedded'. Continue measuring. Transition to BAU ownership not withdrawal. Celebrate progress but acknowledge journey continues."
            />

            {/* Reality Check */}
            <Card className="border-warning/50 bg-warning/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-warning shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Reality Check</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Awareness ≠ Understanding ≠ Behaviour Change ≠ Cultural Embedding</li>
                      <li>• Behaviour change takes 6-12 months minimum</li>
                      <li>• Cultural embedding takes 12-24 months</li>
                      <li>• "Project" may close but work continues</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Story Example */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Customer Story Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground">
                  "Meet Sarah (not real name): Sarah is a 67-year-old widow who was struggling with our online banking. After we trained our customer service team on vulnerability identification, Tom (our agent) recognised Sarah's difficulty and patiently walked her through the process by phone, then arranged for large-print instructions to be posted. Sarah wrote to thank us for the support.
                </p>
                <p className="text-sm font-medium mt-3">
                  This is Consumer Duty in action - recognising vulnerability and providing appropriate support."
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link to="/enablement/communications-part1">
            <Button variant="outline">
              ← Back to Part 1: Foundation & Planning
            </Button>
          </Link>
          <Link to="/enablement/training">
            <Button>
              Related: CD-T1 Training Programme →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}