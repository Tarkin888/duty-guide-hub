import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  PieChart
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CDM3BoardReportingPart1() {
  const [notes, setNotes] = useState("");

  const handleSaveNotes = () => {
    localStorage.setItem("cdm3-part1-notes", notes);
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
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">CD-M3: Board & Executive Reporting</h1>
                <p className="text-muted-foreground mt-1">Part 1: Foundation & Structure</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">Monitoring & Assurance</Badge>
                  <Badge variant="secondary">6-8 Weeks + Ongoing</Badge>
                </div>
              </div>
            </div>
            <Button onClick={handlePrint} variant="outline">
              Print Module
            </Button>
          </div>
        </div>

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
                  Establish a comprehensive board and executive reporting framework that demonstrates Consumer Duty 
                  compliance, enables effective oversight, and facilitates informed decision-making.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Duration
                    </h4>
                    <p className="text-muted-foreground">6-8 weeks initial setup, then ongoing quarterly/annual reporting</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Key Stakeholders
                    </h4>
                    <p className="text-muted-foreground">Board, NEDs, CEO, CCO, CDOC, Risk, Internal Audit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <AlertTriangle className="h-5 w-5" />
                  Critical FCA Requirement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RegulatoryQuote
                  source="FCA"
                  reference="FG22/5, 10.1"
                  quote="At least annually, a firm's governing body must review and approve a report which provides a comprehensive assessment of whether the firm is acting to deliver good outcomes for retail customers consistent with the Consumer Duty."
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Primary Regulation</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>PRIN 2A (Consumer Duty)</li>
                      <li>FG22/5 (sections 10.1-10.3)</li>
                      <li>SM&CR accountability requirements</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Guidance</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>FCA Multi-firm Review Findings (Nov 2024)</li>
                      <li>Board Reports Good Practice Guidance</li>
                      <li>SMF Conduct Rule 6 (CR6)</li>
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
                  This module covers board and executive-level reporting for Consumer Duty compliance, including:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Annual Consumer Duty Board Report (mandatory)",
                    "Quarterly executive dashboards",
                    "Exception reporting and escalation",
                    "SMF attestation statements",
                    "Supporting evidence packs",
                    "Integration with existing governance"
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
                  <FileCheck className="h-5 w-5 text-primary" />
                  Key Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Board Reporting Framework Document", desc: "Governance structure and standards" },
                    { title: "Annual Board Report Template", desc: "Comprehensive assessment format" },
                    { title: "Quarterly Executive Dashboard", desc: "KPI summary and trends" },
                    { title: "Exception Reporting Protocol", desc: "Escalation triggers and processes" },
                    { title: "SMF Attestation Templates", desc: "Individual accountability statements" },
                    { title: "Board Pack Structure", desc: "Guidelines and evidence requirements" },
                    { title: "Evidence Pack Specifications", desc: "Documentation standards" },
                    { title: "Reporting Calendar", desc: "Schedule and milestones" },
                    { title: "Board Training Materials", desc: "Consumer Duty induction" },
                    { title: "Quality Assurance Checklist", desc: "Report review standards" }
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Critical Success Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Board receives high-quality, actionable MI on consumer outcomes",
                    "Reports enable effective challenge and scrutiny",
                    "Clear line of sight from operational metrics to strategic outcomes",
                    "Evidence sufficient to support regulatory examination",
                    "SMF accountability clearly documented",
                    "Annual report approved by board with formal attestation"
                  ].map((factor, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{factor}</span>
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
                  1. Annual Board Report Requirement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA"
                  reference="FG22/5, 10.1"
                  quote="At least annually, a firm's governing body must review and approve a report which provides a comprehensive assessment of whether the firm is acting to deliver good outcomes for retail customers consistent with the Consumer Duty."
                />

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Key Points:</h4>
                  <ul className="space-y-2">
                    {[
                      "This is a mandatory requirement, not optional",
                      "Must be reviewed and formally approved by the board/governing body",
                      "Must be evidence-based and supported by robust MI",
                      "FCA may request to see the report and underlying evidence at any time",
                      "Report must be comprehensive - covering all four outcomes, all products, all customer segments",
                      "Board must agree actions to address any identified issues"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">What "Comprehensive" Means:</h4>
                  <p className="text-muted-foreground mb-3">The report must provide the board with sufficient information to:</p>
                  <ul className="space-y-2">
                    {[
                      "Assess whether the firm is complying with Consumer Duty obligations",
                      "Identify any areas where customer outcomes are poor",
                      "Understand root causes of any issues",
                      "Agree remediation actions with clear owners and timelines",
                      "Confirm the firm's future business strategy is consistent with the Duty"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  2. Board Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Ultimate Accountability</h4>
                  <p className="text-foreground">
                    The board holds ultimate responsibility for ensuring the Consumer Duty is embedded throughout 
                    the firm. This cannot be delegated.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Specific Board Duties:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "Strategic oversight", desc: "Ensure strategy, purpose, and culture align with delivering good outcomes" },
                      { title: "Annual assessment", desc: "Review and approve the annual Consumer Duty report" },
                      { title: "MI scrutiny", desc: "Review regular MI on customer outcomes with appropriate challenge" },
                      { title: "Action approval", desc: "Agree remediation plans and ensure implementation" },
                      { title: "SMF oversight", desc: "Hold SMF holders accountable for their areas" },
                      { title: "Resource allocation", desc: "Ensure adequate resources for Consumer Duty compliance" },
                      { title: "Culture setting", desc: "Create tone from top that prioritises customer outcomes" }
                    ].map((duty, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h5 className="font-medium text-foreground">{duty.title}</h5>
                        <p className="text-sm text-muted-foreground">{duty.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <RegulatoryQuote
                  source="FCA"
                  reference="Multi-firm Review Feedback"
                  quote="We expect boards to actively challenge management on the quality of MI, the robustness of assessments, and the adequacy of proposed actions. The absence of challenge in board minutes raises questions about effective oversight."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  3. SMF Individual Accountability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Senior Management Function (SMF) Requirements:</h4>
                  <p className="text-muted-foreground">
                    Under SM&CR, specific SMF holders must be designated with responsibility for:
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Overall Consumer Duty compliance (typically CEO or equivalent)",
                      "Product governance and oversight",
                      "Distribution chain management",
                      "Complaints handling",
                      "MI and data quality",
                      "Training and competence"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2">Individual Conduct Rule 6 (CR6)</h4>
                  <p className="text-foreground mb-2">
                    All SMF holders (and conduct rules staff) must: <strong>"Act to deliver good outcomes for retail customers"</strong>
                  </p>
                  <p className="text-muted-foreground">
                    SMFs are held to the highest standard under this rule.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="duty">
                    <AccordionTrigger>Duty of Responsibility</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-muted-foreground">
                        SMF holders can be held personally accountable if:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>The firm breaches a Consumer Duty requirement in their area, AND</li>
                        <li>They cannot demonstrate they took reasonable steps to prevent the breach</li>
                      </ul>
                      
                      <div className="p-4 bg-muted/50 rounded-lg mt-4">
                        <h5 className="font-semibold mb-2">What "Reasonable Steps" Means:</h5>
                        <div className="grid md:grid-cols-2 gap-2">
                          {[
                            "Clear governance and oversight arrangements",
                            "Adequate resources allocated",
                            "Regular MI review and challenge",
                            "Issues escalated and addressed promptly",
                            "Staff trained and competent",
                            "Controls designed and operating effectively",
                            "Documented evidence of all the above"
                          ].map((step, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="attestation">
                    <AccordionTrigger>Attestation Requirements</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-muted-foreground">
                        SMF holders must be able to attest (formally confirm) that their areas are compliant. 
                        This attestation must be evidenced - not just a signature, but supported by robust MI, 
                        testing results, and assurance work.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  4. FCA's Assessment of Board Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  In November 2024, the FCA published its review of the first wave of annual Consumer Duty board reports. 
                  Key findings:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-primary flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Good Practice Identified
                    </h4>
                    <div className="space-y-2">
                      {[
                        { title: "Clear outcomes focus", desc: "Dedicated sections for each of the four outcomes with clear definition of what 'good' looks like" },
                        { title: "High-quality MI", desc: "Range of quantitative and qualitative data supporting conclusions" },
                        { title: "Granular analysis", desc: "Separate analysis for different customer types, including vulnerable customers" },
                        { title: "Strong culture focus", desc: "Evidence of how culture, incentives, and training align with Duty" },
                        { title: "Effective challenge", desc: "Board minutes show robust questioning and scrutiny of management" },
                        { title: "Clear actions", desc: "Detailed remediation plans with owners, timelines, and success metrics" },
                        { title: "Distribution chain coverage", desc: "Evidence of information sharing and oversight of third parties" }
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                          <h5 className="font-medium text-foreground text-sm">{item.title}</h5>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-destructive flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Areas for Improvement
                    </h4>
                    <div className="space-y-2">
                      {[
                        { title: "Poor MI quality", desc: "Data insufficient to justify conclusions, lacking clear explanation" },
                        { title: "Incomplete distribution chain view", desc: "Failure to evidence information sharing with manufacturers/distributors" },
                        { title: "Inadequate customer segmentation", desc: "No analysis of outcomes for vulnerable customers or other segments" },
                        { title: "Limited evidence of challenge", desc: "Board appears to have accepted management assertions without scrutiny" },
                        { title: "Vague action plans", desc: "No clear owners, timelines, or metrics to track effectiveness" },
                        { title: "Over-reliance on existing TCF MI", desc: "Simply repackaging old metrics without new Consumer Duty-specific data" },
                        { title: "Lack of root cause analysis", desc: "Issues identified but causes and systemic factors not explored" }
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                          <h5 className="font-medium text-foreground text-sm">{item.title}</h5>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  5. Annual Report Content Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  The FCA expects the annual board report to cover five key aspects:
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="outcomes">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">1</Badge>
                        Clear Outcomes Focus
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ul className="space-y-2">
                        {[
                          "Dedicated section for each of the four outcomes",
                          "Clear articulation of what 'good outcomes' look like for your firm",
                          "Analysis of whether customers are achieving these outcomes",
                          "Identification of any poor outcomes"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mi">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">2</Badge>
                        Good Quality MI
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ul className="space-y-2">
                        {[
                          "Range of data sources supporting conclusions (quantitative and qualitative)",
                          "Leading indicators (predictive) and lagging indicators (retrospective)",
                          "Outcome-focused metrics, not just process metrics",
                          "Data quality and limitations acknowledged",
                          "Clear linkage between MI and conclusions"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="segments">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">3</Badge>
                        Analysis of Different Customer Types
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ul className="space-y-2">
                        {[
                          "Separate analysis for customers with characteristics of vulnerability",
                          "Comparison of outcomes (vulnerable vs non-vulnerable)",
                          "Analysis by product, channel, segment as appropriate",
                          "Identification of any groups experiencing systematically worse outcomes"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="process">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">4</Badge>
                        Clear Production Process
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ul className="space-y-2">
                        {[
                          "How the report was compiled (methodology)",
                          "Who was involved (governance)",
                          "What data sources were used",
                          "How the board reviewed and challenged",
                          "Formal approval and sign-off"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="culture">
                    <AccordionTrigger>
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">5</Badge>
                        Assessment of Culture
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ul className="space-y-2">
                        {[
                          "Evidence of how culture supports good outcomes",
                          "Alignment of incentives and remuneration",
                          "Training and competence",
                          "Staff engagement with Consumer Duty",
                          "Tone from the top and leadership behaviours"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  6. Ongoing Reporting Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Beyond the annual report, the board should receive:
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      Quarterly Executive Updates
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Summary dashboard of key CD metrics</li>
                      <li>• Trend analysis (improving/stable/deteriorating)</li>
                      <li>• Deep dive into one outcome or issue</li>
                      <li>• Progress on remediation actions</li>
                      <li>• Emerging risks or regulatory developments</li>
                      <li>• Forward-looking indicators</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Exception Reports (as needed)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Metrics breach pre-set thresholds</li>
                      <li>• Significant customer outcome issues</li>
                      <li>• Material complaints or FOS trends</li>
                      <li>• Regulatory correspondence or findings</li>
                      <li>• Product withdrawals or major changes</li>
                      <li>• Distribution chain issues</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Monthly Management MI
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Detailed operational metrics by outcome</li>
                      <li>• Product-level performance data</li>
                      <li>• Vulnerable customer outcome variance</li>
                      <li>• Complaints root cause analysis</li>
                      <li>• Control testing results</li>
                      <li>• Training completion and quality scores</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  7. Integration with Existing Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Consumer Duty reporting should integrate with, not duplicate, existing governance reporting:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Board Risk Committee",
                      items: ["Consumer harm as enterprise-level risk", "Risk appetite for poor outcomes", "Consumer Duty risks on risk register", "Control effectiveness for Consumer Duty"]
                    },
                    {
                      title: "Board Audit Committee",
                      items: ["Internal audit findings on Consumer Duty", "Assurance map showing three lines of defence", "External audit considerations", "Regulatory reporting accuracy"]
                    },
                    {
                      title: "Remuneration Committee",
                      items: ["Alignment of incentives with good outcomes", "Performance metrics incorporating Consumer Duty", "Consequences for poor consumer outcomes in pay decisions"]
                    },
                    {
                      title: "Other Governance Forums",
                      items: ["Executive Committee: Monthly operational MI", "Product Committee: Product reviews, FVAs, target markets", "Distribution Committee: Chain oversight and third-party management", "Conduct Risk Committee: Consumer Duty as conduct risk"]
                    }
                  ].map((forum, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h5 className="font-semibold text-foreground mb-2">{forum.title}</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {forum.items.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  8. FCA Supervisory Approach to Board Reporting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">What FCA May Request:</h4>
                    <ul className="space-y-2">
                      {[
                        "Copy of annual board report",
                        "Supporting MI and evidence packs",
                        "Board papers and minutes showing discussion",
                        "SMF attestation statements",
                        "Action plans and progress tracking",
                        "Assurance reports (internal audit, control testing)"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <FileText className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">What FCA Will Assess:</h4>
                    <ul className="space-y-2">
                      {[
                        "Is the MI sufficient to support the conclusions?",
                        "Has the board effectively challenged management?",
                        "Are actions adequate to address identified issues?",
                        "Is there evidence of board-level engagement and oversight?",
                        "Are SMF responsibilities clear and being discharged?",
                        "Is the firm's self-assessment realistic (not overly optimistic)?"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <Eye className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <h4 className="font-semibold text-destructive mb-2">High Enforcement Risk If:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "Board report is superficial or lacks evidence",
                      "Board has not approved the report formally",
                      "Actions are vague or not being implemented",
                      "MI quality is poor or insufficient",
                      "No evidence of board challenge",
                      "SMF accountability unclear"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  9. Attestation and Certification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Formal Attestation</h4>
                  <p className="text-muted-foreground">
                    The board's approval of the annual report is treated as a formal attestation that:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "The firm is complying with Consumer Duty obligations",
                      "The board has satisfied itself based on robust evidence",
                      "Actions are in place to address any identified issues",
                      "The firm's strategy is consistent with the Duty"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">SMF Attestation</h4>
                  <p className="text-muted-foreground mb-3">
                    Individual SMF holders may be required to attest for their areas:
                  </p>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-2 italic text-muted-foreground">
                    <p>"I confirm that, based on the evidence available to me, my area is compliant with Consumer Duty requirements"</p>
                    <p>"Any issues identified have been escalated and are being addressed"</p>
                    <p>"I have taken reasonable steps to ensure compliance"</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Supporting Evidence Required:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "MI demonstrating outcomes monitoring",
                      "Control testing results showing effectiveness",
                      "Product review and FVA documentation",
                      "Communications testing evidence",
                      "Vulnerable customer outcome analysis",
                      "Distribution chain oversight records",
                      "Training completion and competency data",
                      "Assurance reports from internal audit or third parties"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm p-2 bg-muted/30 rounded">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">What "Reasonable Grounds" Means</h4>
                  <p className="text-muted-foreground mb-3">
                    For attestation to be valid, there must be reasonable grounds to believe the statements are true. This means:
                  </p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Sufficient evidence of appropriate quality</li>
                    <li>• Proportionate to the complexity of the business</li>
                    <li>• Based on sound judgment and analysis</li>
                    <li>• Contemporaneous (not created after the fact for the report)</li>
                    <li>• Subject to appropriate challenge and review</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Phase 1: Establishing the Reporting Framework (Weeks 1-2)</CardTitle>
                <CardDescription>
                  Build the governance structure and standards for Consumer Duty reporting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  stepNumber={1}
                  title="Define Reporting Governance Structure"
                  description="Establish clear governance for Consumer Duty reporting"
                  moduleId="cdm3-part1"
                  items={[
                    { id: "map-forums", label: "Map existing governance forums", details: "Board and subcommittees (Risk, Audit, Remuneration), Executive Committee, CDOC, Product Committee" },
                    { id: "define-hierarchy", label: "Define reporting hierarchy", details: "What reports to which forum? What frequency? What escalation triggers?" },
                    { id: "clarify-smf", label: "Clarify SMF responsibilities", details: "Which SMF owns overall Consumer Duty reporting? Which SMFs own each outcome area?" },
                    { id: "document-governance", label: "Document reporting governance", details: "Update Terms of Reference, SMF Statements of Responsibilities, create Board Reporting Framework Document" },
                    { id: "obtain-approval", label: "Obtain board approval for framework", details: "Present framework to board for formal approval" }
                  ]}
                />

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Key Principle</h4>
                  <p className="text-muted-foreground">
                    Consumer Duty reporting should be integrated with existing governance, not a parallel structure. 
                    Build on what works, enhance what doesn't.
                  </p>
                </div>

                <ChecklistSection
                  stepNumber={2}
                  title="Design Annual Board Report Structure"
                  description="Create the master template and content framework"
                  moduleId="cdm3-part1"
                  items={[
                    { id: "review-expectations", label: "Review FCA expectations", details: "Study FG22/5 guidance, FCA's 'Good and Poor Practice' findings, sector-specific guidance" },
                    { id: "define-structure", label: "Define report structure", details: "Executive Summary, Four Outcomes Analysis, Vulnerable Customer Outcomes, Distribution Chain, Culture, Actions" },
                    { id: "establish-standards", label: "Establish quality standards", details: "Maximum length (20-30 pages), minimum evidence requirements, data quality standards" },
                    { id: "create-templates", label: "Create section templates", details: "Standard headings and sub-sections, required content for each section, mandatory data points" }
                  ]}
                />

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Good Practice</h4>
                  <p className="text-muted-foreground">
                    The report should be stratified - executive summary for quick board review, detailed sections for deep dive, 
                    appendices for evidence. Board should be able to understand the key messages in 10 minutes.
                  </p>
                </div>

                <ChecklistSection
                  stepNumber={3}
                  title="Design Quarterly Executive Dashboard"
                  description="Create a streamlined quarterly update mechanism"
                  moduleId="cdm3-part1"
                  items={[
                    { id: "define-scope", label: "Define dashboard scope", details: "Identify 15-20 most critical Consumer Duty KPIs aligned to four outcomes" },
                    { id: "structure-views", label: "Structure dashboard views", details: "Overview Tile, Products & Services, Price & Value, Consumer Understanding, Consumer Support, Vulnerable Customers" },
                    { id: "design-visuals", label: "Design visual presentation", details: "One-page summary, drill-down capability, RAG ratings, trend arrows, exception highlighting" },
                    { id: "define-production", label: "Define production process", details: "Data collection and validation, report compilation, quality review, board pack integration" }
                  ]}
                />

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Good Practice</h4>
                  <p className="text-muted-foreground">
                    The dashboard should focus on outcomes and trends, not just current status. "Complaints up 15% quarter-on-quarter" 
                    is more actionable than "342 complaints this quarter."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Implementation Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add your implementation notes here..."
                  className="min-h-[150px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TemplateCard
                title="Annual Board Report Template"
                description="Complete master document with executive summary, four outcomes analysis, reasonable grounds evidence, vulnerable customers, forward look strategy, and board attestation sections per FG22/5 para 10"
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="Quarterly MI Dashboard Pack"
                description="Structured quarterly MI pack with outcome-by-outcome analysis, trend charts, RAG status, variance explanations, exception highlights, and action tracking"
                format="Excel"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="Exception Escalation Form"
                description="Standardised form for escalating Consumer Duty exceptions to Board/ExCo with impact assessment, root cause analysis, immediate actions, and remediation timeline"
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="SMF Attestation Statement Templates"
                description="Individual SMF attestation templates for CEO, CCO, COO, and CFO with role-specific wording, evidence requirements, and annual/quarterly certification options"
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="Consumer Duty Board Paper Template"
                description="Standard board paper format for Consumer Duty matters with purpose, background, analysis, options, recommendation, and decision sections aligned to board governance"
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="Board Reporting Framework Document"
                description="Comprehensive governance structure, responsibilities, and standards for Consumer Duty reporting to the board and executive. Includes reporting hierarchy, SMF accountability matrix, and quality standards."
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="SMF Accountability Matrix"
                description="Maps SMF roles to Consumer Duty responsibilities, reporting obligations, and attestation requirements. Ensures clear ownership across the organization."
                format="Excel"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="Exception Reporting Protocol"
                description="Defines triggers for ad hoc exception reports, notification requirements, timelines, and required content for escalation to board."
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="Board Challenge Questions Guide"
                description="Guide for NEDs and Board members with probing questions for each outcome area, evidence expectations, and red flags to identify during oversight"
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="Regulatory Reporting Obligations Tracker"
                description="Tracker for FCA notifications, regulatory returns, s166 responses, and other regulatory reporting obligations related to Consumer Duty"
                format="Excel"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="MI Quality Standards Document"
                description="Requirements for all Consumer Duty MI including accuracy, timeliness, relevance, consistency, completeness, and contextual standards."
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />

              <TemplateCard
                title="Forward Look Strategy Template"
                description="Template for documenting the firm's forward-looking Consumer Duty strategy including planned improvements, emerging risks, and strategic alignment"
                format="Word"
                onDownload={() => toast.success("Template download started")}
                onPreview={() => toast.info("Preview functionality coming soon")}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Board Reporting Framework Document Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="section1">
                    <AccordionTrigger>Section 1: Purpose and Scope</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Objectives of Consumer Duty reporting framework</li>
                        <li>• Regulatory requirements (FG22/5, SM&CR)</li>
                        <li>• Integration with existing governance</li>
                        <li>• Document ownership and review frequency</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="section2">
                    <AccordionTrigger>Section 2: Reporting Governance Structure</AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Forum</th>
                              <th className="text-left p-2">Report Type</th>
                              <th className="text-left p-2">Frequency</th>
                              <th className="text-left p-2">Decision Authority</th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-b">
                              <td className="p-2">Board</td>
                              <td className="p-2">Annual CD Report</td>
                              <td className="p-2">Annual</td>
                              <td className="p-2">Approve report, agree actions</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">Board</td>
                              <td className="p-2">Quarterly Dashboard</td>
                              <td className="p-2">Quarterly</td>
                              <td className="p-2">Oversee progress, challenge</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">Risk Committee</td>
                              <td className="p-2">CD Risk Report</td>
                              <td className="p-2">Quarterly</td>
                              <td className="p-2">Monitor risk, escalate</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">Audit Committee</td>
                              <td className="p-2">Assurance Report</td>
                              <td className="p-2">Bi-annual</td>
                              <td className="p-2">Oversee assurance, escalate</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">Executive Committee</td>
                              <td className="p-2">Management MI</td>
                              <td className="p-2">Monthly</td>
                              <td className="p-2">Address issues, direct actions</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">CDOC</td>
                              <td className="p-2">Operational Dashboard</td>
                              <td className="p-2">Monthly</td>
                              <td className="p-2">Coordinate remediation</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="section3">
                    <AccordionTrigger>Section 3: SMF Accountability Matrix</AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">SMF Role</th>
                              <th className="text-left p-2">Responsibility</th>
                              <th className="text-left p-2">Attestation</th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-b">
                              <td className="p-2">CEO / SMF1</td>
                              <td className="p-2">Overall Consumer Duty compliance</td>
                              <td className="p-2">Annual attestation</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">COO / SMF18</td>
                              <td className="p-2">Operational implementation of four outcomes</td>
                              <td className="p-2">Quarterly certification</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">CCO / SMF16</td>
                              <td className="p-2">Compliance oversight and assurance</td>
                              <td className="p-2">Quarterly assurance</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">CFO / SMF2</td>
                              <td className="p-2">Fair value assessment accuracy</td>
                              <td className="p-2">Annual attestation</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="section4-9">
                    <AccordionTrigger>Sections 4-9: Additional Framework Components</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">Section 4: Annual Board Report Requirements</h5>
                          <p className="text-sm text-muted-foreground">Mandatory content sections, minimum evidence requirements, quality standards, production timeline</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">Section 5: Quarterly Reporting Requirements</h5>
                          <p className="text-sm text-muted-foreground">Key metrics by outcome, variance analysis, exception triggers, format standards</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">Section 6: Exception Reporting Protocol</h5>
                          <p className="text-sm text-muted-foreground">Triggers, notification requirements, timeline, required content, follow-up</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">Section 7: MI and Data Quality Standards</h5>
                          <p className="text-sm text-muted-foreground">Accuracy, timeliness, relevance, consistency, completeness, contextual requirements</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">Section 8: Board Training and Induction</h5>
                          <p className="text-sm text-muted-foreground">Initial training, annual refresher, new member induction, resource access</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">Section 9: Review and Continuous Improvement</h5>
                          <p className="text-sm text-muted-foreground">Annual framework review, incorporate FCA feedback, benchmark against industry</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Annual Board Report Template Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="front">
                    <AccordionTrigger>Front Matter</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Cover Page</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Report title: "Annual Consumer Duty Board Report"</li>
                            <li>• Reporting period: "[Date] to [Date]"</li>
                            <li>• Preparation date</li>
                            <li>• Classification: "Board Confidential"</li>
                            <li>• Prepared by: [SMF name and role]</li>
                          </ul>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Document Control</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Version number</li>
                            <li>• Distribution list</li>
                            <li>• Review and approval history</li>
                            <li>• Next review date</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="exec-summary">
                    <AccordionTrigger>Section 1: Executive Summary (Maximum 2 pages)</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">1.1 Overall Assessment</h5>
                          <p className="text-sm text-muted-foreground">
                            Single paragraph stating the board's overall conclusion with Overall RAG rating: Green / Amber / Red
                          </p>
                        </div>

                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">1.2 Key Findings by Outcome</h5>
                          <div className="overflow-x-auto mt-2">
                            <table className="w-full text-xs border-collapse">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Outcome</th>
                                  <th className="text-left p-2">RAG</th>
                                  <th className="text-left p-2">Key Finding</th>
                                  <th className="text-left p-2">Priority Action</th>
                                </tr>
                              </thead>
                              <tbody className="text-muted-foreground">
                                <tr className="border-b">
                                  <td className="p-2">Products & Services</td>
                                  <td className="p-2"><Badge variant="outline" className="bg-green-500/10 text-green-600">Green</Badge></td>
                                  <td className="p-2">All products meet target market needs</td>
                                  <td className="p-2">None required</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Price & Value</td>
                                  <td className="p-2"><Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">Amber</Badge></td>
                                  <td className="p-2">Two products show marginal fair value concerns</td>
                                  <td className="p-2">FVA review by Q2</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Consumer Understanding</td>
                                  <td className="p-2"><Badge variant="outline" className="bg-green-500/10 text-green-600">Green</Badge></td>
                                  <td className="p-2">Testing shows &gt;85% comprehension</td>
                                  <td className="p-2">Continue monitoring</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Consumer Support</td>
                                  <td className="p-2"><Badge variant="outline" className="bg-red-500/10 text-red-600">Red</Badge></td>
                                  <td className="p-2">CSAT below target for vulnerable customers</td>
                                  <td className="p-2">Service enhancement Q1</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <h5 className="font-medium mb-2">1.3-1.6 Additional Sections</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Vulnerable Customer Outcomes</li>
                              <li>• Distribution Chain Oversight</li>
                              <li>• Culture and Governance</li>
                              <li>• Material Actions (5-7 items)</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                            <h5 className="font-medium mb-2">1.7 Board Attestation</h5>
                            <p className="text-sm text-muted-foreground italic">
                              "The Board has reviewed and approves this report. The Board is satisfied that the firm 
                              is acting to deliver good outcomes for retail customers consistent with the Consumer Duty..."
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sections-2-5">
                    <AccordionTrigger>Sections 2-5: Detailed Assessment Sections</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Section 2: Introduction and Scope (1-2 pages)</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Purpose of This Report</li>
                            <li>• Reporting Period</li>
                            <li>• Products and Services Covered</li>
                            <li>• Customer Base Profile</li>
                            <li>• Distribution Chain</li>
                            <li>• Governance Structure</li>
                          </ul>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Section 3: Monitoring Methodology (2-3 pages)</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Data Sources Used</li>
                            <li>• Outcomes Testing Approach (QC vs OT)</li>
                            <li>• Data Quality Assessment</li>
                            <li>• Thresholds and Triggers</li>
                            <li>• Proportionality Considerations</li>
                          </ul>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Section 4: Four Outcomes Assessment (8-12 pages)</h5>
                          <p className="text-sm text-muted-foreground mb-2">For each outcome (2-3 pages each):</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• What "Good Outcomes" Look Like</li>
                            <li>• Summary of Performance</li>
                            <li>• Key Metrics and Trends</li>
                            <li>• Product Review Findings</li>
                            <li>• Distribution Chain Oversight</li>
                            <li>• Issues, Root Causes, and Actions</li>
                          </ul>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Section 5: Vulnerable Customer Outcomes (3-4 pages)</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Vulnerable Customer Population</li>
                            <li>• Identification Approach</li>
                            <li>• Outcome Parity Analysis (critical table)</li>
                            <li>• Support Adjustments Provided</li>
                            <li>• Issues and Actions</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Success Criteria for Board Reporting Framework
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Framework Establishment
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Board Reporting Framework Document approved by board",
                        "SMF accountability matrix complete with all roles assigned",
                        "Reporting calendar established for full year",
                        "Quality standards documented and communicated",
                        "All governance forum Terms of Reference updated"
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
                      <BarChart3 className="h-4 w-4 text-primary" />
                      MI Quality Standards
                    </h4>
                    <div className="space-y-2">
                      {[
                        "All required data sources identified and accessible",
                        "Data quality assessment completed for each source",
                        "Accuracy: All key MI reconciled and validated",
                        "Timeliness: MI available within 5 working days of period end",
                        "Completeness: >95% of required data points captured"
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
                      <PieChart className="h-4 w-4 text-primary" />
                      Reporting Delivery
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Annual board report completed on schedule",
                        "Quarterly dashboards delivered by deadline",
                        "Exception reports triggered appropriately",
                        "Board review time allocated (minimum 30 minutes)",
                        "All report sections completed with required evidence"
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
                      <Building2 className="h-4 w-4 text-primary" />
                      Board Engagement
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Board minutes show evidence of challenge",
                        "Board members trained on Consumer Duty",
                        "Actions arising documented with owners",
                        "Progress tracked against previous actions",
                        "Board formally approves annual report"
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
                  <h4 className="font-semibold text-primary mb-3">Key Metrics Dashboard</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-sm text-muted-foreground">Report sections complete</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">&lt;5 days</p>
                      <p className="text-sm text-muted-foreground">MI availability lag</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-sm text-muted-foreground">SMF attestations obtained</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">On time</p>
                      <p className="text-sm text-muted-foreground">Annual report delivery</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Implementation Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { week: "Weeks 1-2", title: "Framework Design", tasks: "Governance mapping, SMF accountability, reporting structure" },
                    { week: "Weeks 3-4", title: "Template Development", tasks: "Annual report template, quarterly dashboard, exception protocol" },
                    { week: "Weeks 5-6", title: "MI Infrastructure", tasks: "Data sources, quality standards, automation" },
                    { week: "Weeks 7-8", title: "Pilot and Embed", tasks: "First quarterly dashboard, board training, process refinement" },
                    { week: "Ongoing", title: "Quarterly Cycle", tasks: "Dashboard production, board review, action tracking" },
                    { week: "Annual", title: "Annual Report", tasks: "Full assessment, SMF attestation, board approval" }
                  ].map((phase, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Badge variant="outline" className="whitespace-nowrap">{phase.week}</Badge>
                      <div>
                        <h5 className="font-medium text-foreground">{phase.title}</h5>
                        <p className="text-sm text-muted-foreground">{phase.tasks}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <div className="grid gap-6">
              <PitfallCard
                title="Poor MI Quality"
                description="Data insufficient to justify conclusions, lacking clear explanation. Board reports making assertions without supporting evidence or with low-quality data."
                impact="FCA criticism, board unable to fulfill oversight duty, regulatory enforcement risk, potential SMF accountability issues."
                prevention="Establish MI quality standards upfront. Document data sources, quality assessments, and limitations. Ensure all conclusions have evidence references. Regular data quality audits."
              />

              <PitfallCard
                title="Rubber-Stamp Governance"
                description="Board appears to accept management assertions without scrutiny. Minutes show no evidence of challenge or questioning."
                impact="Governance failure, issues not surfaced, board unable to demonstrate effective oversight, SMF accountability risk."
                prevention="Board training on Consumer Duty and effective challenge. Include specific challenging questions in board papers. Allocate adequate time for discussion (30+ minutes). Document challenge in minutes."
              />

              <PitfallCard
                title="Inadequate Vulnerable Customer Analysis"
                description="No analysis of outcomes for vulnerable customers or only superficial coverage without comparison to non-vulnerable customers."
                impact="FCA explicitly expects this analysis. Failure to identify differential outcomes means vulnerable customers may be harmed without detection."
                prevention="Mandatory outcome parity analysis in every annual report. Dedicated section with specific metrics. Compare outcomes across all four outcomes. Document any variance and remediation actions."
              />

              <PitfallCard
                title="Vague Action Plans"
                description="Issues identified but action plans lack clear owners, timelines, or success metrics. No way to track whether actions are completed or effective."
                impact="Issues persist, board unable to hold management accountable, regulatory criticism for inadequate response to identified problems."
                prevention="Every action must have: named SMF owner, specific deadline, measurable success criteria. Track progress in subsequent reports. Escalate overdue actions."
              />

              <PitfallCard
                title="Over-reliance on TCF Metrics"
                description="Simply repackaging existing Treating Customers Fairly (TCF) metrics without new Consumer Duty-specific data or outcomes focus."
                impact="Consumer Duty requires outcomes testing, not just process compliance. TCF metrics alone are insufficient evidence of good outcomes."
                prevention="Conduct outcomes testing (not just QC). Add new Consumer Duty-specific KPIs. Test what customers actually experience, not what processes say should happen."
              />

              <PitfallCard
                title="Missing Distribution Chain Coverage"
                description="Failure to evidence information sharing with manufacturers or distributors. No oversight of third parties in the distribution chain."
                impact="Consumer Duty applies across the distribution chain. Firms cannot outsource responsibility. FCA expects evidence of coordination and oversight."
                prevention="Include distribution chain section in annual report. Document information sharing. Evidence oversight of third parties. Track manufacturer/distributor issues."
              />

              <PitfallCard
                title="SMF Attestations Without Evidence"
                description="SMFs sign attestation statements but cannot produce supporting evidence when challenged. Attestation becomes meaningless signature exercise."
                impact="SMF personal accountability risk. If breach occurs, SMF cannot demonstrate reasonable steps. Potential prohibition, fines, or enforcement action."
                prevention="No attestation without robust evidence pack. Create evidence repository. Conduct mock examination to test evidence retrievability. Document reasonable steps taken."
              />

              <PitfallCard
                title="Late or Incomplete Annual Report"
                description="Annual board report delivered late, rushed, or missing required sections. Board unable to give adequate scrutiny."
                impact="Regulatory breach (annual report is mandatory). Board cannot fulfill oversight duty. If FCA requests report, firm cannot produce compliant version."
                prevention="Start early (minimum 8-12 weeks before board deadline). Use project plan with milestones. Quality review gates before board. Contingency time built in."
              />
            </div>

            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  High Enforcement Risk Warning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">
                  The FCA has made clear that board reporting is a priority supervisory focus area. The following 
                  scenarios present the highest enforcement risk:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Annual board report not produced or not board-approved",
                    "MI quality so poor that conclusions are unsupportable",
                    "No evidence of board challenge in minutes",
                    "Vulnerable customer outcomes not analysed",
                    "SMF accountability unclear or undocumented",
                    "Identified issues not addressed with adequate actions"
                  ].map((risk, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                      <span className="text-sm">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Module Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Link to="/monitoring/testing-assurance-part2">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: CD-M2B Testing & Assurance Part 2
            </Button>
          </Link>
          <Link to="/monitoring/board-reporting-part2">
            <Button>
              Next: CD-M3 Part 2 - Annual Report Content
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}