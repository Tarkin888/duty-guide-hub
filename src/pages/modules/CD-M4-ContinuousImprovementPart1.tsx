import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { 
  FileText, 
  ArrowLeft, 
  Clock, 
  Target, 
  Users, 
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Shield,
  Building2,
  UserCheck,
  ClipboardList,
  Calendar,
  TrendingUp,
  FileCheck,
  BookOpen,
  Scale,
  Eye,
  Gavel,
  Award,
  Settings,
  Layers,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  Search,
  MessageSquare,
  Zap,
  LineChart,
  AlertCircle,
  BrainCircuit,
  FolderSearch,
  Sparkles,
  CircleDot
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CDM4ContinuousImprovementPart1() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("cdm4-part1-notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleSaveNotes = () => {
    localStorage.setItem("cdm4-part1-notes", notes);
    toast.success("Notes saved successfully");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">CD-M4: Continuous Improvement Framework</h1>
                <p className="text-muted-foreground mt-1">Part 1: Governance & Monitoring Foundations</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge variant="outline">Monitoring & Assurance</Badge>
                  <Badge variant="secondary">Ongoing Programme</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePrint} variant="outline" size="sm">
                Print Module
              </Button>
            </div>
          </div>
        </div>

        {/* Critical Banner */}
        <Card className="mb-6 border-destructive/50 bg-destructive/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <p className="font-semibold text-destructive">Critical Principle</p>
                <p className="text-sm text-muted-foreground">
                  Consumer Duty is NOT "set and forget" — it requires perpetual monitoring, learning, and evolution.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Module Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-foreground">
                  Embed a culture of ongoing enhancement and adaptation to ensure Consumer Duty compliance 
                  remains current and effective across all aspects of customer outcomes delivery.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Duration
                    </h4>
                    <p className="text-muted-foreground">Ongoing programme with annual review cycles</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Key Stakeholders
                    </h4>
                    <p className="text-muted-foreground">CCO, CRO, Head of Compliance, Board, All Staff</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Gavel className="h-5 w-5" />
                  FCA Expectation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RegulatoryQuote
                  source="FCA"
                  reference="Supervisory Guidance"
                  quote="Firms must continuously monitor and improve their approach to delivering good customer outcomes."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Regulatory Foundation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Consumer Duty's outcomes-based approach requires continuous assessment and improvement:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Primary Drivers</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Dynamic consumer needs and expectations</li>
                      <li>Evolving regulatory expectations</li>
                      <li>Changing market conditions</li>
                      <li>Technological innovation</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Learning Sources</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Complaints and FOS decisions</li>
                      <li>Regulatory actions and feedback</li>
                      <li>Customer behaviour shifts</li>
                      <li>Maturity progression expectations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Module Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Applies across all four outcomes, governance, and operational delivery:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Annual Consumer Duty review cycle",
                    "Lessons learned capture process",
                    "Root cause analysis methodology",
                    "Improvement prioritisation matrix",
                    "Maturity progression framework",
                    "Innovation pipeline for outcomes",
                    "Regulatory horizon scanning",
                    "Best practice sharing mechanisms",
                    "Performance trend analysis",
                    "Enhancement tracking system",
                    "Culture change measurement",
                    "Continuous improvement governance"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Key Understanding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-3">From Implementation to Continuous Improvement</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-2">
                        <Settings className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">Implementation</p>
                      <p className="text-xs text-muted-foreground">Build the framework</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Monitoring</p>
                      <p className="text-xs text-muted-foreground">Track outcomes</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <div className="w-12 h-12 mx-auto rounded-full bg-primary flex items-center justify-center mb-2">
                        <RefreshCw className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <p className="text-sm font-medium">Improvement</p>
                      <p className="text-xs text-muted-foreground">Evolve continuously</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Key Deliverables (Part 1)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Continuous Improvement Governance Charter", desc: "Ownership and accountability framework" },
                    { title: "Improvement Suggestion Process", desc: "Staff engagement and idea capture" },
                    { title: "Annual Review Cycle Calendar", desc: "12-month milestone framework" },
                    { title: "Trend Analysis Dashboard Specification", desc: "KPI tracking and visualisation" },
                    { title: "Issue Flagging Protocol", desc: "Early warning and escalation" },
                    { title: "Root Cause Analysis Template", desc: "Structured RCA methodology" },
                    { title: "Lessons Learned Repository", desc: "Central knowledge capture" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-primary" />
                  1. The Outcomes-Based Approach Requires Continuous Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA"
                  reference="FG22/5"
                  quote="The Consumer Duty is an outcomes-based regulation. Firms should monitor the outcomes their customers experience and take action to improve them where necessary."
                />

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Key Regulatory Drivers for Continuous Improvement:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { driver: "Dynamic Consumer Needs", desc: "Consumer expectations evolve over time" },
                      { driver: "Regulatory Evolution", desc: "FCA expectations and supervisory focus shift" },
                      { driver: "Market Conditions", desc: "Competitive landscape and economic factors change" },
                      { driver: "Technology Innovation", desc: "New capabilities enable better outcomes" },
                      { driver: "Complaints Intelligence", desc: "Learning from complaints, FOS decisions" },
                      { driver: "Maturity Progression", desc: "Expectation to advance year-on-year" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h5 className="font-medium text-foreground">{item.driver}</h5>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-4">Continuous Improvement Cycle</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Plan", "Do", "Check", "Act", "Learn", "Improve"].map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="px-4 py-2 bg-background rounded-lg border">
                          <span className="font-medium">{step}</span>
                        </div>
                        {index < 5 && <ArrowRight className="h-4 w-4 mx-2 text-primary" />}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  2. Annual Board Review Requirement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA"
                  reference="PRIN 2A"
                  quote="At least annually, the board must review and approve an assessment of whether the firm is delivering good outcomes."
                />

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">This Mandates:</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Formal annual review process",
                      "Board-level assessment and approval",
                      "Evidence-based evaluation",
                      "Action planning for improvements",
                      "Progress tracking on previous actions",
                      "Forward-looking strategic alignment"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  3. FCA Supervisory Expectations (2025/26 Focus Areas)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Current Supervisory Priorities Emphasising Continuous Improvement:</h4>
                  <div className="space-y-2">
                    {[
                      "Deepening fair value assessments over time",
                      "Ongoing monitoring of closed products",
                      "Demonstrable embedding of culture",
                      "Evolution of data analytics capabilities",
                      "Progressive improvement in vulnerable customer outcomes",
                      "Enhancement of distribution chain oversight"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                        <CircleDot className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">FCA Signal</h4>
                  <p className="text-foreground italic">
                    "We expect to see firms' approaches mature and improve year-on-year, not remain static after initial implementation."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  4. Maturity Model Progression
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA"
                  reference="Multi-firm Review (November 2025)"
                  quote="Best practice firms demonstrate progressive maturity, moving from compliance-focused to genuinely customer-centric operations."
                />

                <div className="space-y-3">
                  {[
                    { level: "Level 1: Nascent", desc: "Basic compliance, reactive approach, limited MI", color: "bg-red-500/10 text-red-600" },
                    { level: "Level 2: Developing", desc: "Processes established, early monitoring, some improvement", color: "bg-orange-500/10 text-orange-600" },
                    { level: "Level 3: Defined", desc: "Clear frameworks, regular monitoring, structured improvement", color: "bg-yellow-500/10 text-yellow-600" },
                    { level: "Level 4: Managed", desc: "Data-driven decisions, proactive improvement, clear trends", color: "bg-blue-500/10 text-blue-600" },
                    { level: "Level 5: Embedded", desc: "Customer-centric culture, predictive analytics, continuous innovation", color: "bg-green-500/10 text-green-600" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-foreground">{item.level}</h5>
                          <Badge variant="outline" className={item.color}>Level {index + 1}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground">
                    Expectation: All firms should progress at least one maturity level per year in early years.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  5. Learning from Regulatory Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Multiple feedback channels requiring continuous improvement response:
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="mfr">
                    <AccordionTrigger>A. FCA Multi-firm Reviews</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Published findings on good/poor practice</li>
                        <li>• Sector-specific thematic reviews</li>
                        <li>• Cross-cutting supervisory projects</li>
                        <li>• Dear CEO letters with common themes</li>
                      </ul>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium text-primary">Response Required:</p>
                        <p className="text-sm text-muted-foreground">Compare own approach, identify gaps, implement improvements</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="enforcement">
                    <AccordionTrigger>B. Enforcement Actions</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Final notices and regulatory decisions</li>
                        <li>• Themes and root causes</li>
                        <li>• Systemic issues identified</li>
                        <li>• Preventive lessons</li>
                      </ul>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium text-primary">Response Required:</p>
                        <p className="text-sm text-muted-foreground">Review own controls, enhance where similar risks exist</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fos">
                    <AccordionTrigger>C. Financial Ombudsman Service (FOS) Decisions</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Individual case outcomes</li>
                        <li>• Systemic issue identification</li>
                        <li>• Interpretation of Consumer Duty principles</li>
                        <li>• Emerging complaint themes</li>
                      </ul>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium text-primary">Response Required:</p>
                        <p className="text-sm text-muted-foreground">Root cause analysis, process improvements, training updates</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="supervisory">
                    <AccordionTrigger>D. Supervisory Correspondence</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Section 166 reviews (skilled person reports)</li>
                        <li>• Supervisory visits and assessments</li>
                        <li>• Thematic feedback</li>
                        <li>• Portfolio reviews</li>
                      </ul>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium text-primary">Response Required:</p>
                        <p className="text-sm text-muted-foreground">Structured response, remediation, ongoing monitoring</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  6. Complaints as Improvement Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA"
                  reference="Expectations"
                  quote="Complaints are a valuable source of information about where things are going wrong."
                />

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Complaints-Driven Improvement Cycle:</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { step: "Collect", desc: "Capture all complaints and expressions of dissatisfaction" },
                      { step: "Categorise", desc: "Link to four outcomes and root causes" },
                      { step: "Analyse", desc: "Identify systemic issues vs one-offs" },
                      { step: "Investigate", desc: "Root cause analysis for systemic issues" },
                      { step: "Remediate", desc: "Fix the underlying problem, not just symptom" },
                      { step: "Monitor", desc: "Track whether fix is effective" },
                      { step: "Learn", desc: "Share lessons across organisation" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg text-center">
                        <div className="w-8 h-8 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-2">
                          {index + 1}
                        </div>
                        <h5 className="font-medium text-foreground text-sm">{item.step}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground">
                    Key Metric: Reduction in repeat complaint root causes over time
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  7. Innovation and Customer Benefit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Consumer Duty enables (and expects) innovation:
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "New technologies improving customer outcomes",
                    "Process simplification reducing friction",
                    "AI and automation enhancing support",
                    "Personalisation improving understanding",
                    "Open banking enabling better value",
                    "Vulnerable customer support innovations"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                      <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">FCA Position</h4>
                  <p className="text-foreground">
                    Innovation is welcome where it genuinely improves customer outcomes, but firms must 
                    evidence the benefit and manage risks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            {/* Phase 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Phase 1: Establish Continuous Improvement Governance (Weeks 1-4)
                </CardTitle>
                <CardDescription>Define ownership, processes, and calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step1">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 1: Define Continuous Improvement Ownership
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <ChecklistSection
                        stepNumber={1}
                        moduleId="cdm4-part1"
                        title="Ownership and Governance Setup"
                        items={[
                          { id: "ci1", label: "Designate senior owner for continuous improvement (typically CCO, CRO, or Head of Compliance)" },
                          { id: "ci2", label: "Include continuous improvement as standing agenda item for Consumer Duty Oversight Committee" },
                          { id: "ci3", label: "Define Board expectation for improvement pace" },
                          { id: "ci4", label: "Establish quarterly improvement reviews" },
                          { id: "ci5", label: "Set improvement targets by outcome area" },
                          { id: "ci6", label: "Allocate dedicated improvement resource/budget" }
                        ]}
                      />

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <h4 className="font-semibold text-primary mb-3">Governance Model</h4>
                        <div className="space-y-2">
                          {[
                            { level: "Board", responsibility: "Annual strategic review, approve major improvement initiatives" },
                            { level: "Executive Committee", responsibility: "Quarterly improvement progress review" },
                            { level: "Consumer Duty Oversight Committee", responsibility: "Monthly improvement tracking" },
                            { level: "Workstream Leads", responsibility: "Weekly improvement identification and implementation" },
                            { level: "All Staff", responsibility: "Continuous suggestion and feedback" }
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 p-2 bg-background rounded">
                              <Badge variant="outline" className="flex-shrink-0">{item.level}</Badge>
                              <span className="text-sm text-muted-foreground">{item.responsibility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step2">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 2: Create Improvement Suggestion Process
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <ChecklistSection
                        stepNumber={2}
                        moduleId="cdm4-part1"
                        title="Staff Suggestion Mechanism"
                        items={[
                          { id: "sug1", label: "Design online suggestion form/portal" },
                          { id: "sug2", label: "Establish regular team suggestion sessions" },
                          { id: "sug3", label: "Create 'You said, we did' feedback loop" },
                          { id: "sug4", label: "Implement recognition for valuable suggestions" }
                        ]}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Suggestion Triage Process</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Quick assessment of feasibility and impact</li>
                            <li>• Prioritisation using improvement matrix</li>
                            <li>• Clear feedback to suggester within 2 weeks</li>
                            <li>• Transparent tracking of status</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Suggestion Metrics</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Number of suggestions received</li>
                            <li>• % implemented</li>
                            <li>• Time from suggestion to implementation</li>
                            <li>• Measurable impact on customer outcomes</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-medium text-foreground mb-3">Celebrate and Reward Contributions:</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Recognition in internal communications</li>
                          <li>• Performance review inclusion</li>
                          <li>• Small team rewards for high-impact improvements</li>
                          <li>• Annual improvement awards</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm font-medium text-primary">Cultural Message:</p>
                        <p className="text-foreground italic">"Every customer interaction is an opportunity to learn and improve"</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step3">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 3: Establish Annual Review Cycle Calendar
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <p className="text-muted-foreground">
                        Create 12-month calendar with fixed milestones:
                      </p>

                      <div className="space-y-4">
                        {[
                          {
                            quarter: "Q1 (January-March)",
                            items: [
                              { month: "January", activity: "Complete Year-End data collection and analysis" },
                              { month: "February", activity: "Draft Annual Board Report, conduct internal review" },
                              { month: "March", activity: "Board review and approval of Annual Report, set improvement priorities" }
                            ]
                          },
                          {
                            quarter: "Q2 (April-June)",
                            items: [
                              { month: "April", activity: "Launch Year priority improvement initiatives" },
                              { month: "May", activity: "Quarterly review of Q1 outcomes" },
                              { month: "June", activity: "FCA Corporate Plan analysis, horizon scanning update" }
                            ]
                          },
                          {
                            quarter: "Q3 (July-September)",
                            items: [
                              { month: "July", activity: "Mid-year progress review vs annual plan" },
                              { month: "August", activity: "Quarterly review of Q2 outcomes" },
                              { month: "September", activity: "Product and service review cycle (fair value assessments)" }
                            ]
                          },
                          {
                            quarter: "Q4 (October-December)",
                            items: [
                              { month: "October", activity: "Quarterly review of Q3 outcomes" },
                              { month: "November", activity: "Annual review preparation begins, data collection" },
                              { month: "December", activity: "Year-end analysis, lessons learned capture, next year planning" }
                            ]
                          }
                        ].map((q, qIndex) => (
                          <div key={qIndex} className="p-4 border rounded-lg">
                            <h5 className="font-medium text-foreground mb-3">{q.quarter}</h5>
                            <div className="space-y-2">
                              {q.items.map((item, iIndex) => (
                                <div key={iIndex} className="flex items-start gap-3">
                                  <Badge variant="outline" className="flex-shrink-0">{item.month}</Badge>
                                  <span className="text-sm text-muted-foreground">{item.activity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Phase 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Phase 2: Build Continuous Monitoring Capabilities (Weeks 2-8)
                </CardTitle>
                <CardDescription>Trend analysis, issue flagging, and root cause analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step4">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 4: Implement Trend Analysis for Key Metrics
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <ChecklistSection
                        stepNumber={4}
                        moduleId="cdm4-part1"
                        title="Trend Analysis Setup"
                        items={[
                          { id: "trend1", label: "Establish baseline for each Consumer Duty KPI" },
                          { id: "trend2", label: "Set improvement targets (realistic but stretching)" },
                          { id: "trend3", label: "Create trend charts showing monthly/quarterly performance" },
                          { id: "trend4", label: "Define trigger points requiring investigation" },
                          { id: "trend5", label: "Automate trend analysis where possible" }
                        ]}
                      />

                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium text-foreground mb-3">Trend Chart Requirements:</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Monthly/quarterly performance data points</li>
                          <li>• Trend line (improving/stable/declining)</li>
                          <li>• Variance from target</li>
                          <li>• Annotations for significant events/changes</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                        <h5 className="font-medium text-destructive mb-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Trigger Points Requiring Investigation
                        </h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Adverse trend over 2+ consecutive periods</li>
                          <li>• Sudden spike or drop</li>
                          <li>• Widening gap between vulnerable and all customers</li>
                          <li>• Breach of threshold</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-medium text-foreground mb-3">Example Trends to Track:</h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-medium">Products & Services</p>
                            <p className="text-xs text-muted-foreground">Churn rate trend, product suitability trend</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Price & Value</p>
                            <p className="text-xs text-muted-foreground">Fair value assessment scores trend</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Consumer Understanding</p>
                            <p className="text-xs text-muted-foreground">Comprehension test pass rate trend</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Consumer Support</p>
                            <p className="text-xs text-muted-foreground">CSAT trend, FCR trend, complaint resolution time trend</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step5">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 5: Implement Real-Time Issue Flagging
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <ChecklistSection
                        stepNumber={5}
                        moduleId="cdm4-part1"
                        title="Early Warning System"
                        items={[
                          { id: "flag1", label: "Define early warning indicators that predict potential issues" },
                          { id: "flag2", label: "Create issue flagging protocol with automated alerts" },
                          { id: "flag3", label: "Establish 'stop the line' authority for serious harm risks" },
                          { id: "flag4", label: "Implement rapid escalation to executive level" }
                        ]}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Early Warning Indicators:</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Spike in calls about specific product feature</li>
                            <li>• Increase in incomplete applications</li>
                            <li>• Rise in queries suggesting misunderstanding</li>
                            <li>• Social media negative sentiment increase</li>
                            <li>• Complaints about specific process</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Issue Flagging Protocol:</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Automated alerts when thresholds breached</li>
                            <li>• Escalation to relevant workstream lead</li>
                            <li>• Rapid root cause analysis (within 48 hours)</li>
                            <li>• Immediate containment action if harm occurring</li>
                            <li>• Longer-term fix implementation</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                        <h5 className="font-medium text-destructive mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          "Stop the Line" Authority
                        </h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Empower staff to flag serious customer harm risks immediately</li>
                          <li>• Rapid escalation to executive level</li>
                          <li>• Pause process/product until risk assessed</li>
                          <li>• Transparent communication about response</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-medium text-foreground mb-3">Examples of Real-Time Issues Requiring Response:</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Product feature causing widespread confusion (communication issue)</li>
                          <li>• Digital process with high abandonment rate (support/understanding issue)</li>
                          <li>• Unexpected surge in cancellations (value or support issue)</li>
                          <li>• Vulnerable customers reporting difficulty (support/vulnerability framework issue)</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step6">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 6: Create Root Cause Analysis Framework
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm font-medium text-primary">
                          Robust RCA is critical for systemic improvement
                        </p>
                      </div>

                      <ChecklistSection
                        stepNumber={6}
                        moduleId="cdm4-part1"
                        title="RCA Framework Setup"
                        items={[
                          { id: "rca1", label: "Define when RCA is required (triggers)" },
                          { id: "rca2", label: "Implement structured RCA methodology (5 Whys, Fishbone)" },
                          { id: "rca3", label: "Define required RCA outputs" },
                          { id: "rca4", label: "Link RCA to improvement implementation tracking" }
                        ]}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">When RCA is Required:</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Breach of Consumer Duty threshold/trigger</li>
                            <li>• Regulatory feedback identifying issue</li>
                            <li>• FOS uphold highlighting systemic problem</li>
                            <li>• Complaint theme emerging (3+ similar)</li>
                            <li>• Negative outcome trend persisting 2+ periods</li>
                            <li>• Internal audit finding</li>
                            <li>• Near-miss incident with potential for harm</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">RCA Methodology:</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• "5 Whys" technique</li>
                            <li>• Fishbone/Ishikawa diagram</li>
                            <li>• Process mapping to identify failure points</li>
                            <li>• Data analysis to quantify scale</li>
                            <li>• Customer feedback review</li>
                            <li>• Staff interviews</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium text-foreground mb-3">Required RCA Outputs:</h5>
                        <div className="grid md:grid-cols-2 gap-2">
                          {[
                            "Problem statement (clear, specific)",
                            "Timeline of events",
                            "Immediate cause",
                            "Underlying root cause(s)",
                            "Contributing factors",
                            "Scale of customer impact",
                            "Remediation actions (immediate and longer-term)",
                            "Owner and timeline for each action",
                            "Monitoring plan to confirm fix effectiveness",
                            "Lessons for broader application"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step7">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 7: Build Lessons Learned Repository
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <ChecklistSection
                        stepNumber={7}
                        moduleId="cdm4-part1"
                        title="Lessons Learned System"
                        items={[
                          { id: "ll1", label: "Create central repository (searchable by outcome, product, process, issue type)" },
                          { id: "ll2", label: "Include both positive and negative lessons" },
                          { id: "ll3", label: "Establish templates for consistent capture" },
                          { id: "ll4", label: "Schedule regular reviews to identify patterns" }
                        ]}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Capture Lessons From:</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Implementation projects (what would we do differently?)</li>
                            <li>• Issues and complaints (what was the root cause?)</li>
                            <li>• Regulatory feedback (what do we need to change?)</li>
                            <li>• Customer feedback (what could be better?)</li>
                            <li>• Staff suggestions (where are the pain points?)</li>
                            <li>• External benchmarking (what are others doing better?)</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Quarterly Lessons Review:</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Identify common themes</li>
                            <li>• Prioritise systemic improvements</li>
                            <li>• Share with relevant teams</li>
                            <li>• Update policies/procedures</li>
                            <li>• Feed into training programmes</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-medium text-foreground mb-3">Create "Lessons Learned" Section In:</h5>
                        <div className="flex flex-wrap gap-2">
                          {["Board reports", "Project close-out reports", "Annual Consumer Duty Report", "Team meetings"].map((item, index) => (
                            <Badge key={index} variant="outline">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Continue to Part 2 */}
            <Card className="border-primary/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Steps 1-7 Complete</p>
                    <p className="font-medium">Continue to Part 2 for Steps 8-14</p>
                  </div>
                  <Link to="/monitoring/continuous-improvement-part2">
                    <Button>
                      Part 2: Steps 8-14
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Part 1 Templates (7)
                </CardTitle>
                <CardDescription>
                  Templates for governance, suggestions, and monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="Template 1: Continuous Improvement Governance Charter"
                    description="Defines ownership, accountability, governance model, and improvement targets by outcome area."
                    format="Word"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />
                  
                  <TemplateCard
                    title="Template 2: Improvement Suggestion Form"
                    description="Staff suggestion capture form with triage process, metrics tracking, and feedback loop."
                    format="Word"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 3: Annual Review Cycle Calendar"
                    description="12-month calendar with quarterly milestones, annual report cycle, and review touchpoints."
                    format="Excel"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 4: Trend Analysis Dashboard Specification"
                    description="KPI trend charts, trigger points, automation requirements, and visualisation standards."
                    format="Excel"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 5: Issue Flagging and Escalation Protocol"
                    description="Early warning indicators, automated alerts, escalation paths, and 'stop the line' authority."
                    format="Word"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 6: Root Cause Analysis Template"
                    description="Comprehensive RCA template with 5 Whys, fishbone diagram, outputs checklist, and action tracking."
                    format="Word"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 7: Lessons Learned Capture Form"
                    description="Standardised lesson capture with categorisation, searchable fields, and quarterly review structure."
                    format="Word"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Additional Templates in Part 2</p>
                    <p className="text-sm text-muted-foreground">
                      Maturity assessment, innovation pipeline, horizon scanning, culture measurement, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Part 1 Success Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      Governance Establishment
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Senior owner designated for continuous improvement",
                        "Standing agenda item on Consumer Duty Oversight Committee",
                        "Board expectations for improvement pace documented",
                        "Quarterly improvement reviews scheduled",
                        "Improvement targets set by outcome area",
                        "Dedicated resource/budget allocated"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      Suggestion Process
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Online suggestion portal live",
                        "Triage process operational",
                        "Feedback provided within 2 weeks",
                        "Recognition programme launched",
                        "Suggestion metrics tracked",
                        "'You said, we did' communications active"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <LineChart className="h-4 w-4 text-primary" />
                      Monitoring Capabilities
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Baselines established for all KPIs",
                        "Trend charts operational",
                        "Trigger points defined and monitored",
                        "Automated alerts configured",
                        "Early warning indicators identified"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <FolderSearch className="h-4 w-4 text-primary" />
                      Analysis & Learning
                    </h4>
                    <div className="space-y-2">
                      {[
                        "RCA framework documented and operational",
                        "RCA triggers clearly defined",
                        "Lessons learned repository created",
                        "Quarterly lessons review scheduled",
                        "'Stop the line' authority established"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-3">Key Metrics to Track</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-xs text-muted-foreground">KPIs with baselines</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">&lt;2 wks</p>
                      <p className="text-xs text-muted-foreground">Suggestion feedback time</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">48 hrs</p>
                      <p className="text-xs text-muted-foreground">RCA initiation time</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">Quarterly</p>
                      <p className="text-xs text-muted-foreground">Lessons review cycle</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Timeline Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { phase: "Phase 1: Governance", weeks: "Weeks 1-4", desc: "Ownership, suggestion process, annual calendar" },
                    { phase: "Phase 2: Monitoring", weeks: "Weeks 2-8", desc: "Trend analysis, issue flagging, RCA, lessons learned" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Badge variant="outline" className="flex-shrink-0">{item.weeks}</Badge>
                      <div>
                        <h5 className="font-medium text-foreground">{item.phase}</h5>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Common Pitfalls (Part 1: 1-6)
                </CardTitle>
                <CardDescription>
                  Based on FCA findings and industry experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PitfallCard
                  title="Pitfall 1: Treating Consumer Duty as 'Done'"
                  description="FCA Finding: Firms treating implementation as a one-off project rather than ongoing programme. Many firms 'declared victory' after initial implementation and reduced focus."
                  impact="Compliance degrades over time, outcomes worsen, regulatory risk increases"
                  prevention="Embed continuous improvement into BAU, maintain dedicated resource, keep Consumer Duty on leadership agenda"
                />

                <PitfallCard
                  title="Pitfall 2: No Ownership of Continuous Improvement"
                  description="Improvement activities fragmented across teams with no clear owner. Nobody accountable for driving systematic improvement."
                  impact="Improvements happen ad-hoc if at all, no strategic prioritisation, effort duplicated"
                  prevention="Designate senior owner, establish governance, include in job descriptions and objectives"
                />

                <PitfallCard
                  title="Pitfall 3: Ignoring Staff Suggestions"
                  description="Staff closest to customers have valuable improvement ideas but no mechanism to capture or act on them. Suggestions fall into void."
                  impact="Missed improvement opportunities, staff disengagement, cultural disconnect"
                  prevention="Implement suggestion process with feedback, recognition, and visible action on good ideas"
                />

                <PitfallCard
                  title="Pitfall 4: Data Without Insight"
                  description="Collecting lots of MI data but not analysing trends or deriving actionable insights. Dashboards exist but nobody acts on them."
                  impact="Issues not identified early, improvements not data-driven, regulatory scrutiny on MI effectiveness"
                  prevention="Define trigger points, automate alerts, require trend analysis and recommendations in reports"
                />

                <PitfallCard
                  title="Pitfall 5: Treating Symptoms Not Root Causes"
                  description="Fixing individual complaints or issues without investigating underlying causes. Same problems recur repeatedly."
                  impact="Customer harm continues, regulatory concern about effectiveness, wasted effort on repeated fixes"
                  prevention="Mandatory RCA for systemic issues, track whether fixes are effective, link to lessons learned"
                />

                <PitfallCard
                  title="Pitfall 6: Knowledge Loss"
                  description="Lessons learned not captured systematically. Knowledge leaves with staff, same mistakes repeated, good practices not shared."
                  impact="Repeated failures, slow improvement, inconsistent approach across teams"
                  prevention="Central lessons repository, regular reviews, include in training, require lessons capture in project close-outs"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Footer */}
        <Card className="mt-8 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Link to="/monitoring/board-reporting-part2">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: CD-M3 Board Reporting Part 2
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Part 1 of 2</Badge>
              </div>
              <Link to="/monitoring/continuous-improvement-part2">
                <Button>
                  Next: Part 2 - Advanced Implementation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
