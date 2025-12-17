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
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CDT2CommunicationsChangePart1() {
  const [activeTab, setActiveTab] = useState("overview");

  const deliverables = {
    foundation: [
      { id: "stakeholder-mapping", label: "Stakeholder mapping and analysis" },
      { id: "change-impact", label: "Change impact assessment by function" },
      { id: "comms-strategy", label: "Communications strategy and plan" },
      { id: "champion-charter", label: "Change champion identification and charter" },
      { id: "leadership-framework", label: "Leadership engagement framework" },
      { id: "resistance-strategy", label: "Resistance management strategy" },
      { id: "comms-materials", label: "Communication materials (templates, FAQs, talking points)" }
    ],
    execution: [
      { id: "launch-comms", label: "Launch communications (internal)" },
      { id: "champion-activation", label: "Change champion network activation" },
      { id: "leadership-comms", label: "Regular leadership communications" },
      { id: "engagement-sessions", label: "Functional engagement sessions" },
      { id: "feedback-collection", label: "Feedback collection and analysis" },
      { id: "quick-wins", label: "Quick wins identification and celebration" },
      { id: "resistance-protocols", label: "Resistance intervention protocols" }
    ],
    embedding: [
      { id: "behaviour-measurement", label: "Behaviour change measurement" },
      { id: "culture-surveys", label: "Culture assessment surveys" },
      { id: "continuous-calendar", label: "Continuous communication calendar" },
      { id: "recognition-programmes", label: "Recognition and reward programmes" },
      { id: "success-stories", label: "Success story capture and sharing" },
      { id: "champion-support", label: "Ongoing champion network support" }
    ]
  };

  const raciMatrix = [
    { activity: "Stakeholder Analysis", board: "I", exec: "C", change: "A", comms: "R", hr: "C", champions: "I", staff: "I" },
    { activity: "Change Impact Assessment", board: "I", exec: "C", change: "A", comms: "R", hr: "C", champions: "C", staff: "I" },
    { activity: "Communications Strategy", board: "A", exec: "R", change: "C", comms: "R", hr: "C", champions: "I", staff: "I" },
    { activity: "Leadership Messaging", board: "R", exec: "R", change: "C", comms: "C", hr: "I", champions: "I", staff: "I" },
    { activity: "Change Champion Network", board: "I", exec: "C", change: "C", comms: "R", hr: "C", champions: "R", staff: "I" },
    { activity: "Resistance Management", board: "I", exec: "C", change: "A", comms: "C", hr: "C", champions: "C", staff: "I" },
    { activity: "Culture Assessment", board: "A", exec: "C", change: "R", comms: "C", hr: "A", champions: "C", staff: "R" },
    { activity: "Behaviour Change Measurement", board: "A", exec: "C", change: "R", comms: "C", hr: "C", champions: "C", staff: "R" }
  ];

  const step1Items = [
    { id: "1.1", label: "Create Stakeholder Inventory", details: "List all groups: Board, Executive, SMFs, Department Heads, Middle Managers, Front-line Staff, Support Functions, Third Parties, Customers" },
    { id: "1.2", label: "Assess Current State by Stakeholder Group", details: "Determine Awareness, Understanding, Impact, Influence, and Current Sentiment for each group" },
    { id: "1.3", label: "Prioritise Stakeholder Groups", details: "Use Priority Matrix: Manage Closely (High impact/influence), Keep Satisfied, Keep Informed, Monitor" },
    { id: "1.4", label: "Identify Key Influencers & Potential Champions", details: "Find those with credibility, passion, communication skills, and networks" }
  ];

  const step2Items = [
    { id: "2.1", label: "Hold Impact Assessment Workshops", details: "Facilitate sessions with each functional area covering START/STOP/DIFFERENT analysis" },
    { id: "2.2", label: "Assess Change Readiness", details: "Score Capability, Capacity, Motivation, and Leadership Support (1-5 scale)" },
    { id: "2.3", label: "Identify Change Risks", details: "Document resistance points, skill gaps, resource constraints, competing priorities, interdependencies" },
    { id: "2.4", label: "Develop Mitigation Strategies", details: "Create specific actions, owners, timelines, and success measures for each risk" }
  ];

  const step3Items = [
    { id: "3.1", label: "Define Communication Objectives", details: "Set SMART objectives for Awareness, Understanding, Engagement, Behaviour Change, Cultural Embedding" },
    { id: "3.2", label: "Craft Key Messages", details: "Develop 3-5 core messages covering Why, What, How, When, and Vision" },
    { id: "3.3", label: "Develop Communication Channels Strategy", details: "Mix top-down (emails, videos, town halls), peer-to-peer (champions, communities), bottom-up (feedback, surveys), and visual channels" },
    { id: "3.4", label: "Create Communication Calendar", details: "Map out 6-12 months of communications with specific activities, owners, and audiences" },
    { id: "3.5", label: "Define Success Measures", details: "Establish metrics for Reach, Engagement, Understanding, Sentiment, and Behaviour" }
  ];

  const step4Items = [
    { id: "4.1", label: "Define Champion Role & Expectations", details: "Create Champion Charter with purpose, responsibilities, time commitment (2-4 hrs/month), and benefits" },
    { id: "4.2", label: "Recruit Change Champions", details: "Launch self-nomination with manager endorsement, target 1-2 champions per 50 employees" },
    { id: "4.3", label: "Launch Champion Network", details: "Conduct half-day kick-off workshop with Executive Sponsor, provide tools and resources" },
    { id: "4.4", label: "Establish Ongoing Champion Support", details: "Set up monthly network calls, bi-weekly office hours, quarterly gatherings, and recognition programme" }
  ];

  const step5Items = [
    { id: "5.1", label: "Secure Executive Commitment", details: "Hold Executive Workshop, obtain commitment for visibility, resources, and decision-making alignment" },
    { id: "5.2", label: "Develop Leadership Communication Plan", details: "Define specific activities for CEO, Executive Sponsor, and other executives with cadence and forums" },
    { id: "5.3", label: "Prepare Leadership Communication Materials", details: "Provide key message guide, Q&A briefing, talking points, personal stories, and dos/don'ts" },
    { id: "5.4", label: "Create 'Catch Them Doing Right' Programme", details: "Implement spot recognition, success story sharing, awards, and visible time allocation" }
  ];

  const step6Items = [
    { id: "6.1", label: "Understand Types of Resistance", details: "Categorise as Rational, Emotional, Political, or Cultural with tailored responses" },
    { id: "6.2", label: "Identify Resistance Early Warning Signals", details: "Monitor for passive resistance, active resistance, compliance without commitment, spreading negativity" },
    { id: "6.3", label: "Develop Intervention Protocols", details: "Create 3-level ladder: Curious Conversation → Targeted Support → Formal Process" },
    { id: "6.4", label: "Build Feedback Loops", details: "Establish anonymous feedback, rumour monitoring, Q&A forums, skip-levels, exit interviews" }
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
                  <Badge className="bg-accent text-accent-foreground text-xs">Part 1 of 2</Badge>
                  <Badge variant="secondary" className="text-xs">Enablement</Badge>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Communications & Change Management</h1>
                <p className="text-muted-foreground">Foundation & Planning</p>
              </div>
            </div>
            <Link to="/enablement/communications-part2">
              <Button variant="outline" size="sm">
                Continue to Part 2 →
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Purpose Card */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Module Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium text-foreground">
                  Drive awareness, understanding, adoption and sustained behaviour change across the organisation to embed Consumer Duty as 'business as usual', not a compliance project.
                </p>
                
                <RegulatoryQuote
                  quote="The Duty requires a shift in culture and approach across the firm, from senior management to front-line staff."
                  source="FCA FG22/5"
                  reference="FG22/5"
                />

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Why This Matters
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Without effective change management, implementation becomes "tick-box" compliance</li>
                    <li>• Staff resistance or lack of understanding undermines even well-designed processes</li>
                    <li>• Cultural change takes time and consistent reinforcement</li>
                    <li>• Leadership visibility and modelling is essential</li>
                    <li>• Communication is dialogue, not broadcast</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Scope */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      This Module Covers
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Stakeholder communication planning and execution
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Change impact assessment across functions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Change champion network establishment
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Leadership engagement and visibility programme
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Resistance management strategies
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Cultural embedding and sustainment
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Feedback mechanisms and continuous dialogue
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Behaviour change measurement
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Complements (Does Not Replace)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>CD-T1:</strong> Training Programme Delivery (technical skills)</li>
                      <li>• <strong>CD-P2:</strong> Policy & Framework Development (formal documentation)</li>
                      <li>• <strong>CD-M4:</strong> Continuous Improvement Framework (ongoing refinement)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Key Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Badge variant="outline">Weeks 1-6</Badge>
                      Foundation & Planning
                    </h4>
                    <ul className="space-y-2">
                      {deliverables.foundation.map((item) => (
                        <li key={item.id} className="flex items-start gap-2 text-sm">
                          <div className="h-4 w-4 border rounded shrink-0 mt-0.5" />
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Badge variant="outline">Weeks 6-20</Badge>
                      Execution
                    </h4>
                    <ul className="space-y-2">
                      {deliverables.execution.map((item) => (
                        <li key={item.id} className="flex items-start gap-2 text-sm">
                          <div className="h-4 w-4 border rounded shrink-0 mt-0.5" />
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Badge variant="outline">Weeks 20+</Badge>
                      Embedding & Sustainment
                    </h4>
                    <ul className="space-y-2">
                      {deliverables.embedding.map((item) => (
                        <li key={item.id} className="flex items-start gap-2 text-sm">
                          <div className="h-4 w-4 border rounded shrink-0 mt-0.5" />
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Duration & Resources */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Foundation & Planning</span>
                      <Badge variant="secondary">4-6 weeks</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Execution</span>
                      <Badge variant="secondary">Weeks 6-20</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Embedding</span>
                      <Badge variant="secondary">12+ months</Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Intense Activity</span>
                    <Badge className="bg-primary">6 months + ongoing</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Resource Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Core Team</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Communications Lead: 0.5-1.0 FTE</li>
                      <li>• Change Manager: 0.3-0.5 FTE</li>
                      <li>• Project Manager: 0.2 FTE</li>
                      <li>• Executive Sponsor: 2-4 hrs/week</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-2">Extended Team</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Change Champions: 1-2 per dept, 2-4 hrs/month</li>
                      <li>• HR/L&D Support: 0.2 FTE</li>
                      <li>• IT/Creative: Project-based</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RACI Matrix */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  RACI Matrix
                </CardTitle>
                <CardDescription>R=Responsible, A=Accountable, C=Consulted, I=Informed</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full">
                  <div className="min-w-[800px]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Activity</th>
                          <th className="text-center py-2 font-medium">Board</th>
                          <th className="text-center py-2 font-medium">Exec Sponsor</th>
                          <th className="text-center py-2 font-medium">Change Mgr</th>
                          <th className="text-center py-2 font-medium">Comms Lead</th>
                          <th className="text-center py-2 font-medium">HR/L&D</th>
                          <th className="text-center py-2 font-medium">Champions</th>
                          <th className="text-center py-2 font-medium">All Staff</th>
                        </tr>
                      </thead>
                      <tbody>
                        {raciMatrix.map((row, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-2">{row.activity}</td>
                            <td className="text-center py-2">
                              <Badge variant={row.board === "A" ? "default" : row.board === "R" ? "secondary" : "outline"} className="w-6 justify-center">
                                {row.board}
                              </Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant={row.exec === "A" ? "default" : row.exec === "R" ? "secondary" : "outline"} className="w-6 justify-center">
                                {row.exec}
                              </Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant={row.change === "A" ? "default" : row.change === "R" ? "secondary" : "outline"} className="w-6 justify-center">
                                {row.change}
                              </Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant={row.comms === "A" ? "default" : row.comms === "R" ? "secondary" : "outline"} className="w-6 justify-center">
                                {row.comms}
                              </Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant={row.hr === "A" ? "default" : row.hr === "R" ? "secondary" : "outline"} className="w-6 justify-center">
                                {row.hr}
                              </Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant={row.champions === "A" ? "default" : row.champions === "R" ? "secondary" : "outline"} className="w-6 justify-center">
                                {row.champions}
                              </Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant={row.staff === "A" ? "default" : row.staff === "R" ? "secondary" : "outline"} className="w-6 justify-center">
                                {row.staff}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Success Criteria Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Success Criteria Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      Awareness
                    </h4>
                    <p className="text-2xl font-bold text-primary">&gt;85%</p>
                    <p className="text-sm text-muted-foreground">Staff awareness within 12 weeks</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      Understanding
                    </h4>
                    <p className="text-2xl font-bold text-primary">&gt;75%</p>
                    <p className="text-sm text-muted-foreground">Can articulate role impact</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      Engagement
                    </h4>
                    <p className="text-2xl font-bold text-primary">&gt;70%</p>
                    <p className="text-sm text-muted-foreground">Actively engaged with change</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            {/* Culture Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Culture Requirements in Consumer Duty
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">The Culture Connection</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>FCA Position:</strong> Culture is not explicitly regulated but is assessed as evidence of compliance effectiveness.
                  </p>
                  <RegulatoryQuote
                    quote="We expect firms' culture, governance, leadership and people policies to be aligned with the Duty and to support the delivery of good outcomes for retail customers."
                    source="FCA FG22/5 para 10.4"
                    reference="FG22/5"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">What This Means</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Culture isn't a "nice to have" - it's HOW Consumer Duty gets delivered</li>
                    <li>• Policies and procedures are worthless without cultural support</li>
                    <li>• FCA will assess culture through staff interviews, observation, internal communications review, whistleblowing reports, exit interview themes, and quality monitoring</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Positive Cultural Indicators
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Customer outcomes prioritised in strategy discussions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Staff comfortable challenging harmful practices
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Quick wins celebrated and shared
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Mistakes treated as learning opportunities
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        "What would we want for our families?" mindset
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      Negative Cultural Indicators
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        Sales targets dominate conversations
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        Staff fearful of raising concerns
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        Compliance seen as "box-ticking"
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        Customer complaints dismissed or minimised
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        "We've always done it this way" resistance
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SMF Accountability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Senior Management Accountability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Individual Conduct Rule 6 (CR6)</h4>
                  <p className="text-lg font-medium text-foreground">
                    All conduct rules staff must: "Act to deliver good outcomes for retail customers"
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Implications for Communications</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• This personal accountability must be clearly communicated</li>
                    <li>• Staff need to understand what "good outcomes" means for their role</li>
                    <li>• Middle managers are critical - they translate strategy to action</li>
                    <li>• Resistance from managers undermines entire implementation</li>
                  </ul>
                </div>

                <RegulatoryQuote
                  quote="Senior managers are accountable for the outcomes experienced by customers in their areas of responsibility."
                  source="FCA PRIN 2A"
                  reference="PRIN 2A"
                />

                <div>
                  <h4 className="font-semibold mb-3">SMF Communication Requirements</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• SMFs must visibly model Consumer Duty behaviours</li>
                    <li>• Cannot delegate cultural change to compliance/communications</li>
                    <li>• Must be "present" - town halls, team meetings, walking the floor</li>
                    <li>• Actions speak louder than words - decisions must align with messaging</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Values Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Integration with Existing Values & Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <h5 className="font-semibold text-destructive mb-2">DON'T</h5>
                    <p className="text-sm">Present Consumer Duty as "new compliance burden"</p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="font-semibold text-green-700 mb-2">DO</h5>
                    <p className="text-sm">Connect to existing organisational values and purpose</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="customer-first">
                    <AccordionTrigger>If firm's values include "Customer First"</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground italic">
                        "Consumer Duty brings our 'Customer First' value to life by defining what 'first' actually means - good outcomes across products, value, understanding, and support."
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="financial-security">
                    <AccordionTrigger>If firm's purpose is "Financial Security for All"</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground italic">
                        "Consumer Duty aligns perfectly with our purpose - we can't deliver financial security without ensuring fair value, clear communications, and appropriate products for each customer's circumstances."
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="innovation">
                    <AccordionTrigger>If firm celebrates "Innovation"</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground italic">
                        "Consumer Duty drives innovation - testing communications, designing for vulnerability, monitoring outcomes - this is how modern financial services works."
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Change Curve */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  The Change Curve & Resistance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-2xl font-bold text-muted-foreground mb-1">1</div>
                    <h5 className="font-semibold mb-2">Denial</h5>
                    <p className="text-xs text-muted-foreground">"This is just TCF rebranded"</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-destructive mb-1">2</div>
                    <h5 className="font-semibold mb-2">Resistance</h5>
                    <p className="text-xs text-muted-foreground">"This is impossible/too expensive"</p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent mb-1">3</div>
                    <h5 className="font-semibold mb-2">Exploration</h5>
                    <p className="text-xs text-muted-foreground">"Maybe there's a better way?"</p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">4</div>
                    <h5 className="font-semibold mb-2">Commitment</h5>
                    <p className="text-xs text-muted-foreground">"This actually improves our business"</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="denial">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="secondary">Weeks 1-4</Badge>
                        Denial Stage Communications
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong>Emphasise:</strong> "This IS different - higher standard, enforcement focus"</li>
                        <li><strong>Evidence:</strong> FCA enforcement actions, multi-firm review findings</li>
                        <li><strong>Approach:</strong> Factual, firm, respectful</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="resistance">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="secondary">Weeks 4-12</Badge>
                        Resistance Stage Communications
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong>Acknowledge:</strong> Legitimate concerns about workload, complexity</li>
                        <li><strong>Address:</strong> Resources being allocated, phased approach, support available</li>
                        <li><strong>Involve:</strong> "How could we make this work?" dialogue</li>
                        <li><strong>Approach:</strong> Empathetic, problem-solving</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="exploration">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="secondary">Weeks 12-20</Badge>
                        Exploration Stage Communications
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong>Enable:</strong> Training, tools, champions, Q&A forums</li>
                        <li><strong>Encourage:</strong> Early adopters, quick wins, success stories</li>
                        <li><strong>Approach:</strong> Supportive, collaborative</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="commitment">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="secondary">Weeks 20+</Badge>
                        Commitment Stage Communications
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong>Reinforce:</strong> Recognition, celebration, continuous improvement</li>
                        <li><strong>Embed:</strong> BAU integration, sustained messaging</li>
                        <li><strong>Approach:</strong> Appreciative, forward-looking</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Middle Management */}
            <Card className="border-warning/50 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-warning" />
                  Middle Management - The Critical Layer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-foreground">
                    Research Finding: "70% of change initiatives fail due to middle management resistance or disengagement"
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Why Middle Managers Matter</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• They're the "permafrost" - can enable or block change</li>
                    <li>• Front-line staff look to their manager, not the CEO</li>
                    <li>• They translate strategy to daily actions</li>
                    <li>• They're often under most pressure (doing more with less)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Must Do for Middle Managers
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Involve early in planning ("What concerns do you foresee?")</li>
                    <li>✓ Provide manager-specific toolkit (talking points, FAQs, escalation paths)</li>
                    <li>✓ Give time and space to absorb before cascading to teams</li>
                    <li>✓ Address their concerns first (can't inspire others if anxious)</li>
                    <li>✓ Recognise their pivotal role publicly</li>
                    <li>✓ Never surprise them (brief before announcing to teams)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FCA Multi-firm Review Findings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  FCA Multi-firm Review Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Good Practice Observed
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Senior leaders regularly communicating importance in all-staff forums
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Change champion networks with representatives from all departments
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Customer outcome metrics integrated into performance reviews
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Staff recognition schemes celebrating Consumer Duty behaviours
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Regular pulse surveys to track cultural shift progress
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        Communications focused on compliance requirements, not the 'why'
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        Limited engagement from middle management - seen as 'compliance issue'
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        Staff surveys show confusion about day-to-day role impact
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        No clear link between Consumer Duty and existing values/purpose
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        Resistance not being identified or managed proactively
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-center text-lg font-medium">
                  Part 1: Foundation & Planning (Weeks 1-6)
                </p>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Steps 1-6 establish the groundwork for successful change management
                </p>
              </CardContent>
            </Card>

            {/* Phase 1: Foundation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge className="bg-primary">Phase 1</Badge>
                Foundation (Weeks 1-3)
              </h3>

              <ChecklistSection
                moduleId="cd-t2-part1"
                stepNumber={1}
                title="Conduct Stakeholder Mapping & Analysis"
                items={step1Items}
              />

              <ChecklistSection
                moduleId="cd-t2-part1"
                stepNumber={2}
                title="Conduct Change Impact Assessment"
                items={step2Items}
              />

              <ChecklistSection
                moduleId="cd-t2-part1"
                stepNumber={3}
                title="Develop Communications Strategy"
                items={step3Items}
              />
            </div>

            {/* Phase 2: Planning */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge className="bg-primary">Phase 2</Badge>
                Planning (Weeks 3-6)
              </h3>

              <ChecklistSection
                moduleId="cd-t2-part1"
                stepNumber={4}
                title="Establish Change Champion Network"
                items={step4Items}
              />

              <ChecklistSection
                moduleId="cd-t2-part1"
                stepNumber={5}
                title="Engage Leadership & Build Visibility Programme"
                items={step5Items}
              />

              <ChecklistSection
                moduleId="cd-t2-part1"
                stepNumber={6}
                title="Develop Resistance Management Strategy"
                items={step6Items}
              />
            </div>

            {/* Resistance Types Detail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserX className="h-5 w-5 text-primary" />
                  Understanding Types of Resistance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Rational Resistance</h5>
                    <p className="text-sm text-muted-foreground mb-2">Based on legitimate concerns</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• "We don't have resources"</li>
                      <li>• "The timeline is unrealistic"</li>
                    </ul>
                    <Badge variant="outline" className="mt-2">Response: Acknowledge and problem-solve</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Emotional Resistance</h5>
                    <p className="text-sm text-muted-foreground mb-2">Based on fear or loss</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• "My skills will be obsolete"</li>
                      <li>• "This means more work"</li>
                    </ul>
                    <Badge variant="outline" className="mt-2">Response: Empathise and support</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Political Resistance</h5>
                    <p className="text-sm text-muted-foreground mb-2">Based on power/control</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• "This threatens my influence"</li>
                      <li>• "This wasn't my idea"</li>
                    </ul>
                    <Badge variant="outline" className="mt-2">Response: Engage and involve</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Cultural Resistance</h5>
                    <p className="text-sm text-muted-foreground mb-2">Based on identity/values</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• "This isn't who we are"</li>
                      <li>• "We've always done it differently"</li>
                    </ul>
                    <Badge variant="outline" className="mt-2">Response: Connect to values and co-create</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Principle */}
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Key Principle</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Resistance is information, not opposition.</strong> Use feedback to improve approach, not to label staff as "problems."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Link to="/enablement/communications-part2">
                <Button>
                  Continue to Part 2: Execution & Embedding →
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <TemplateCard
                title="Stakeholder Mapping Matrix"
                description="Excel workbook with stakeholder groups, awareness levels, impact assessment, priority quadrants, and communication approach planning"
                format="Excel"
              />
              <TemplateCard
                title="Change Impact Assessment Workbook"
                description="Comprehensive workbook with function overview, START/STOP/DIFFERENT analysis, readiness scoring, risk register, and action plan"
                format="Excel"
              />
              <TemplateCard
                title="Communications Strategy Document"
                description="Word template covering objectives, audiences, core messages, channels, calendar, roles, success measures, and governance"
                format="Word"
              />
              <TemplateCard
                title="Change Champion Charter"
                description="Complete charter with role definition, responsibilities, selection criteria, benefits, network structure, and FAQ"
                format="Word"
              />
              <TemplateCard
                title="Leadership Visibility Plan"
                description="12-month calendar tracking leader activities, audiences, key messages, preparation needs, and success measures"
                format="Excel"
              />
              <TemplateCard
                title="Resistance Management Protocol"
                description="Comprehensive protocol with resistance types, early warning signals, intervention ladder, escalation process, and tracking log"
                format="Word"
              />
            </div>

            {/* Template Details */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="stakeholder">
                <AccordionTrigger>Template 1: Stakeholder Mapping Matrix Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Columns:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Stakeholder Group</li>
                      <li>Number of Individuals</li>
                      <li>Current Awareness (H/M/L)</li>
                      <li>Current Understanding (H/M/L)</li>
                      <li>Impact of Change (H/M/L)</li>
                      <li>Influence on Success (H/M/L)</li>
                      <li>Priority Quadrant (auto-calculated)</li>
                      <li>Current Sentiment (Supportive/Neutral/Resistant)</li>
                      <li>Key Concerns/Needs</li>
                      <li>Communication Approach</li>
                      <li>Primary Contact/Owner</li>
                    </ul>
                    <p className="mt-2"><em>Includes worked example for reference</em></p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="impact">
                <AccordionTrigger>Template 2: Change Impact Assessment Workbook Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Worksheets:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Sheet 1: Function Overview (list all functions)</li>
                      <li>Sheet 2: Impact Assessment by Function (START/STOP/DIFFERENTLY)</li>
                      <li>Sheet 3: Change Readiness Scoring (Capability, Capacity, Motivation, Leadership)</li>
                      <li>Sheet 4: Risk Register (description, likelihood, impact, mitigation, owner)</li>
                      <li>Sheet 5: Action Plan (action, owner, deadline, resources, status, RAG)</li>
                    </ul>
                    <p className="mt-2"><em>Includes completed example for one function</em></p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="comms">
                <AccordionTrigger>Template 3: Communications Strategy Document Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Sections:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Executive Summary</li>
                      <li>Change Context & Rationale</li>
                      <li>Communication Objectives (SMART)</li>
                      <li>Target Audiences & Stakeholders</li>
                      <li>Core Messages (by audience)</li>
                      <li>Communication Channels Strategy</li>
                      <li>Communication Calendar (6-12 months)</li>
                      <li>Roles & Responsibilities</li>
                      <li>Success Measures</li>
                      <li>Budget & Resources</li>
                      <li>Governance & Approvals</li>
                    </ol>
                    <p className="mt-2"><strong>Appendices:</strong> Stakeholder mapping, key messages, FAQ, brand guidelines</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="champion">
                <AccordionTrigger>Template 4: Change Champion Charter Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Sections:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Purpose & Context</li>
                      <li>Champion Role Definition</li>
                      <li>Responsibilities & Time Commitment</li>
                      <li>Selection Criteria</li>
                      <li>Benefits of Being a Champion</li>
                      <li>Support & Resources Provided</li>
                      <li>Network Structure</li>
                      <li>Meeting Cadence</li>
                      <li>Communication Channels</li>
                      <li>Recognition & Appreciation</li>
                      <li>Frequently Asked Questions</li>
                    </ol>
                    <p className="mt-2"><em>Includes recruitment email template and application form</em></p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Foundation & Planning Success Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Badge variant="outline">Week 3</Badge>
                      Milestones
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Stakeholder mapping completed for all groups
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Change impact assessment conducted with all functions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Priority resistance points identified
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Executive commitment secured (documented)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Communications strategy approved by Board/ExCo
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Change champion recruitment launched
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Badge variant="outline">Week 6</Badge>
                      Milestones
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        15-30 change champions recruited and trained
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        First champion network meeting completed
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Leadership communication plan established
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Manager toolkit distributed to all people managers
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Resistance management protocols in place
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Communication calendar published (6+ months)
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Effectiveness */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-primary" />
                  Communication Effectiveness Measures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold mb-2">Reach</h5>
                    <p className="text-2xl font-bold text-primary">&gt;80%</p>
                    <p className="text-xs text-muted-foreground">Target audience reached in 4 weeks</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Email open rates: &gt;70%</li>
                      <li>• Town hall attendance: &gt;60%</li>
                      <li>• Intranet visitors: &gt;75%</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold mb-2">Engagement</h5>
                    <p className="text-2xl font-bold text-primary">&gt;65%</p>
                    <p className="text-xs text-muted-foreground">Pulse survey participation</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Q&A submissions: &gt;50</li>
                      <li>• Feedback forms: &gt;100</li>
                      <li>• Champion activity: 100%</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold mb-2">Understanding</h5>
                    <p className="text-2xl font-bold text-primary">&gt;75%</p>
                    <p className="text-xs text-muted-foreground">Can explain role impact by Week 12</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Survey self-assessment</li>
                      <li>• Training pre/post scores</li>
                      <li>• Manager spot checks</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold mb-2">Sentiment</h5>
                    <p className="text-2xl font-bold text-primary">Positive</p>
                    <p className="text-xs text-muted-foreground">Trending feedback themes</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Pulse survey trends</li>
                      <li>• Feedback analysis</li>
                      <li>• Qualitative themes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Change Readiness Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Change Readiness Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      Leadership
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;90% executives participated in visibility activities
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        All SMFs can articulate Consumer Duty accountability
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Consumer Duty referenced in strategic decisions
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Middle Management
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;80% managers feel equipped to support teams
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        Manager toolkit actively used
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &lt;10% managers resistant or disengaged
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-primary" />
                      Front-line Staff
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;70% report awareness of Consumer Duty
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;60% understand role impact
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        &gt;50% feel supported in the change
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Champion Network & Resistance */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Champion Network Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      100% of recruited champions active
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      &gt;80% report feeling valued and supported
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Diverse cross-section represented
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Peer feedback flowing upward consistently
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserX className="h-5 w-5 text-primary" />
                    Resistance Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      All identified resistance documented
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Intervention protocols activated
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      &lt;5% active obstruction
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      No unaddressed "elephants in the room"
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <PitfallCard
              title="Pitfall 1: 'Compliance Communications' - Dry, Legalistic Tone"
              description="Communications focused heavily on regulatory requirements rather than the 'why' and 'what's in it for us'. Staff disengage and see it as another compliance burden."
              impact="Staff disengage, communications ignored, fails to inspire behaviour change, misses opportunity to connect to values."
              prevention="Start with 'why' not 'what'. Connect to existing values and purpose. Use plain English, conversational tone. Include real examples and stories. Make it relevant to each audience."
            />

            <PitfallCard
              title="Pitfall 2: 'Announcement & Silence' - No Ongoing Communication"
              description="Firms communicated at launch but failed to maintain consistent engagement throughout implementation."
              impact="Initial enthusiasm fades, staff forget or deprioritise, confusion builds, change momentum lost."
              prevention="Communication is ongoing, not event-based. 'Little and often' beats 'big and infrequent'. Maintain regular cadence. Always provide forums for questions. Repeat key messages (staff need 7+ times)."
            />

            <PitfallCard
              title="Pitfall 3: 'Top-Down Only' - No Peer-to-Peer Communication"
              description="Over-reliance on executive communications; no grassroots advocacy or peer support."
              impact="Feels like 'management initiative', front-line staff skeptical, no local ownership, missing valuable peer influence."
              prevention="Establish change champion network. Enable team-level conversations. Capture and share staff success stories. Empower managers to adapt messaging for their teams."
            />

            <PitfallCard
              title="Pitfall 4: 'Forgotten Middle' - Neglecting Middle Management"
              description="Middle managers confused about their role; seen as 'compliance issue' not their responsibility."
              impact="Critical translation layer broken, managers undermine change, front-line staff get mixed messages, implementation inconsistent."
              prevention="Involve middle managers early in planning. Provide manager-specific toolkit and training. Give them time to absorb before cascading. Address their concerns first. Never surprise them."
            />

            <PitfallCard
              title="Pitfall 5: 'Broadcast Mode' - One-Way Communication"
              description="No effective feedback mechanisms; staff concerns not being heard or addressed."
              impact="Staff feel unheard and disrespected, valid concerns ignored, resistance grows, miss valuable front-line insights."
              prevention="Always create space for questions and feedback. Respond publicly to themes raised. Say 'I don't know' and commit to finding out. Change plans based on feedback. Close the loop ('You said, we did')."
            />

            <PitfallCard
              title="Pitfall 6: 'Invisible Executives' - Leaders Not Visibly Engaged"
              description="Limited visible leadership engagement beyond initial launch."
              impact="Staff conclude 'not really important', 'do as I say not as I do' message, no tone from the top, credibility damaged."
              prevention="Executive visibility plan with specific commitments. Track and hold leaders accountable. 'Walking the floor' - direct engagement. Leaders reference Consumer Duty in all strategic discussions."
            />

            <PitfallCard
              title="Pitfall 7: 'No Time for Change' - Unrealistic Timelines"
              description="Insufficient time given for staff to absorb, learn, and practice new behaviours."
              impact="Staff overwhelmed, quality suffers, compliance without understanding, burnout and resistance."
              prevention="Realistic phasing (not everything at once). Protect time for training and practice. Reduce or pause non-critical activities. Build in contingency buffer. Celebrate progress, not just completion."
            />

            {/* Recovery Guidance */}
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  Quick Recovery Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you've already fallen into one of these pitfalls:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Acknowledge:</strong> Openly recognise the issue with stakeholders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Assess:</strong> Understand the current impact and scope</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Adjust:</strong> Implement corrective actions immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Communicate:</strong> Explain what you're doing differently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Monitor:</strong> Track whether corrective actions are working</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}