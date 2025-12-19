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
  PieChart,
  ArrowRight,
  PlayCircle,
  Workflow,
  Search,
  ListChecks,
  RefreshCw,
  Presentation,
  FileSpreadsheet
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CDM3BoardReportingPart2() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("cdm3-part2-notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleSaveNotes = () => {
    localStorage.setItem("cdm3-part2-notes", notes);
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
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">CD-M3: Board & Executive Reporting</h1>
                <p className="text-muted-foreground mt-1">Part 2: Report Production & Quality</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge variant="outline">Monitoring & Assurance</Badge>
                  <Badge variant="secondary">Weeks 10-16 + Ongoing</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/monitoring/board-reporting-part1">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Part A: Foundation
                </Button>
              </Link>
              <Button onClick={handlePrint} variant="outline" size="sm">
                Print Module
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-6 border-primary/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">A</div>
                  <span className="text-sm text-muted-foreground">Foundation & Structure</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">B</div>
                  <span className="text-sm font-medium">Production & Quality</span>
                </div>
              </div>
              <Badge variant="secondary">Steps 6-12</Badge>
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
                  Part B Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-foreground">
                  Establish robust report production workflows, quality assurance processes, and continuous improvement 
                  mechanisms to ensure board reports meet FCA expectations and drive meaningful outcomes.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Duration
                    </h4>
                    <p className="text-muted-foreground">Weeks 10-16 initial cycle, then ongoing quarterly/annual production</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Key Stakeholders
                    </h4>
                    <p className="text-muted-foreground">Report Coordinator, MI Lead, SMF Owners, Compliance, Board, Company Secretary</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Success Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Start early (10-12 weeks before board meeting)",
                    "Build in review time at each stage",
                    "No surprises to the board",
                    "Quality over speed",
                    "Document everything"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-background rounded-lg">
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
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Part B Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This module continues from Part A and covers:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Report production workflows (10-week cycle)",
                    "Narrative structure and analysis guidance",
                    "Evidence pack assembly and management",
                    "Multi-level quality assurance process",
                    "Board presentation and approval",
                    "Continuous improvement mechanisms"
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
                  Key Deliverables (Part B)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Board Report Production Workflow", desc: "10-week timeline with roles and gates" },
                    { title: "Board Report Narrative Structure", desc: "Complete template with section guidance" },
                    { title: "Board Report Evidence Index", desc: "Cross-referenced evidence register" },
                    { title: "Board Report Review Checklist", desc: "Multi-level QA standards" },
                    { title: "Board Meeting Presentation Pack", desc: "15-slide executive summary" },
                    { title: "Post-Report Review Log", desc: "Improvement tracking template" },
                    { title: "Regulatory Horizon Scanning Log", desc: "Ongoing developments tracker" }
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
                  <Calendar className="h-5 w-5 text-primary" />
                  10-Week Production Cycle Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { weeks: "Weeks 1-2", activity: "Data collection and validation", color: "bg-blue-500/10 text-blue-600" },
                    { weeks: "Weeks 3-4", activity: "Analysis and narrative development", color: "bg-indigo-500/10 text-indigo-600" },
                    { weeks: "Weeks 5-6", activity: "Draft report production", color: "bg-purple-500/10 text-purple-600" },
                    { weeks: "Week 7", activity: "SMF review and challenge", color: "bg-pink-500/10 text-pink-600" },
                    { weeks: "Week 8", activity: "Final amendments and evidence assembly", color: "bg-orange-500/10 text-orange-600" },
                    { weeks: "Week 9", activity: "Board paper submission (5-7 days before meeting)", color: "bg-amber-500/10 text-amber-600" },
                    { weeks: "Week 10", activity: "Board presentation and approval", color: "bg-green-500/10 text-green-600" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <Badge variant="outline" className={item.color}>{item.weeks}</Badge>
                      <span className="text-foreground">{item.activity}</span>
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
                  FCA Expectations for Board Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA"
                  reference="FG22/5, 10.3"
                  quote="The board should be satisfied that good outcomes are being delivered and agree actions to address any concerns identified."
                />

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">Board Report Quality Standards:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { standard: "Accuracy", desc: "All data verified and reconciled" },
                      { standard: "Completeness", desc: "All FCA requirements covered" },
                      { standard: "Clarity", desc: "Plain English, logical flow" },
                      { standard: "Evidence", desc: "All assertions supported" },
                      { standard: "Insight", desc: "Analysis not just description" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-medium">{item.standard}:</span>
                          <span className="text-muted-foreground ml-1">{item.desc}</span>
                        </div>
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
                  Evidence Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Warning
                  </h4>
                  <p className="text-foreground">
                    FCA may request the board report AND underlying evidence at short notice. Evidence must be 
                    retrievable within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Evidence Categories:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { category: "Governance", examples: "Meeting minutes, decisions, committee papers" },
                      { category: "Monitoring", examples: "MI reports, dashboards, trend analysis" },
                      { category: "Four Outcomes", examples: "Assessments, testing results, reviews" },
                      { category: "Vulnerable Customers", examples: "Outcome data, policies, support records" },
                      { category: "Distribution Chain", examples: "Agreements, monitoring reports, audits" },
                      { category: "Culture", examples: "Training records, surveys, feedback" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h5 className="font-medium text-foreground">{item.category}</h5>
                        <p className="text-sm text-muted-foreground">{item.examples}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">Evidence Organisation:</h4>
                  <ul className="space-y-2">
                    {[
                      "Organised by report section",
                      "Clearly labelled with document ID",
                      "Version controlled",
                      "Access controlled",
                      "Regulator-ready at all times"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
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
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Maturity Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { level: "Level 1: Nascent", desc: "Basic annual report, minimal analysis, reactive approach" },
                    { level: "Level 2: Developing", desc: "Some insight, quarterly updates, improving data quality" },
                    { level: "Level 3: Defined", desc: "Comprehensive report, good data, proactive identification" },
                    { level: "Level 4: Managed", desc: "Insightful reporting driving decisions, integrated MI" },
                    { level: "Level 5: Embedded", desc: "Outcomes central to strategy, predictive analytics" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground">{item.level}</h5>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            {/* Phase 3: Report Production Workflows */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  Phase 3: Report Production Workflows (Weeks 10-14)
                </CardTitle>
                <CardDescription>Establish the 10-week production cycle</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step6">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 6: Establish Report Production Process
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <h4 className="font-semibold text-primary mb-3">10-Week Production Cycle</h4>
                        <div className="space-y-2">
                          {[
                            { week: "Weeks 1-2", task: "Data collection and validation - gather all MI, verify accuracy" },
                            { week: "Weeks 3-4", task: "Analysis and narrative development - identify trends, root causes" },
                            { week: "Weeks 5-6", task: "Draft report production - write sections, integrate visualisations" },
                            { week: "Week 7", task: "SMF review and challenge - formal sign-off from accountable managers" },
                            { week: "Week 8", task: "Final amendments and evidence assembly - complete evidence pack" },
                            { week: "Week 9", task: "Board paper submission - 5-7 days before meeting" },
                            { week: "Week 10", task: "Board presentation and approval - 60-90 minute discussion" }
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 p-2 bg-background rounded">
                              <Badge variant="outline" className="flex-shrink-0">{item.week}</Badge>
                              <span className="text-sm text-muted-foreground">{item.task}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <ChecklistSection
                        title="Production Process Setup"
                        items={[
                          { id: "prod1", label: "Define 10-week production timeline with milestones" },
                          { id: "prod2", label: "Assign roles: Report Coordinator, MI Lead, Section Owners" },
                          { id: "prod3", label: "Establish quarterly cycle for ongoing monitoring" },
                          { id: "prod4", label: "Define exception reporting triggers" },
                          { id: "prod5", label: "Create version control and document management process" }
                        ]}
                      />

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-3">Quarterly Cycle:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• <strong>Q1:</strong> Annual report production (10-week cycle)</li>
                          <li>• <strong>Q2-Q4:</strong> Quarterly dashboard updates (2-week cycle each)</li>
                          <li>• <strong>Ongoing:</strong> Exception reporting as triggers occur</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step7">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 7: Build Report Narrative and Analysis
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <h4 className="font-semibold text-primary mb-3">Complete Report Structure (25-35 pages total)</h4>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Executive Summary (2 pages max)</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Overall assessment (clear yes/no/partially on delivering good outcomes)</li>
                            <li>• Top 5 achievements</li>
                            <li>• Top 3-5 significant issues</li>
                            <li>• Actions taken and planned</li>
                            <li>• Forward-looking assessment</li>
                            <li>• Board recommendation</li>
                          </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium text-foreground mb-3">Section 1: Scope & Methodology (1-2 pages)</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Products/services covered</li>
                              <li>• Customer segments analysed</li>
                              <li>• Data sources used</li>
                              <li>• Period covered</li>
                              <li>• Methodology explanation</li>
                            </ul>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium text-foreground mb-3">Section 2: Four Outcomes (8-12 pages)</h5>
                            <p className="text-sm text-muted-foreground mb-2">For each outcome (2-3 pages):</p>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Opening assessment (RAG status)</li>
                              <li>• Key findings & quantitative metrics (3-5 KPIs)</li>
                              <li>• Customer segmentation analysis</li>
                              <li>• Root cause analysis for issues</li>
                              <li>• Actions taken/planned</li>
                            </ul>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium text-foreground mb-3">Section 3: Vulnerable Customers (3-4 pages)</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Outcome parity analysis</li>
                              <li>• Identification effectiveness</li>
                              <li>• Support effectiveness</li>
                              <li>• Specific issues/actions</li>
                            </ul>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium text-foreground mb-3">Section 4: Culture & Governance (2-3 pages)</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Training completion</li>
                              <li>• Incentive alignment</li>
                              <li>• Staff engagement</li>
                              <li>• Governance effectiveness</li>
                            </ul>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium text-foreground mb-3">Section 5: Distribution Chain (2-3 pages)</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Manufacturer/distributor performance</li>
                              <li>• Information sharing effectiveness</li>
                              <li>• Issues identified</li>
                            </ul>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium text-foreground mb-3">Section 6: Strategy Alignment (1-2 pages)</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• How strategy supports good outcomes</li>
                              <li>• Future changes impact</li>
                            </ul>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Section 7: Issues, Actions & Forward Plan (3-4 pages)</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Issue log with RAG status</li>
                            <li>• Action plan with owners/deadlines</li>
                            <li>• Forward priorities</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Appendices:</h5>
                          <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <li>• Detailed MI dashboards</li>
                            <li>• Methodology notes</li>
                            <li>• Evidence index</li>
                            <li>• Glossary</li>
                            <li>• SMF attestations</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <h4 className="font-semibold text-primary mb-3">Narrative Guidance</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Be honest about shortcomings",
                            "Explain WHY not just WHAT",
                            "Link findings to root causes",
                            "Show progress trajectory",
                            "Be specific on actions and timelines",
                            "Use plain English",
                            "Write for challenge and scrutiny"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium text-foreground mb-3">Data Visualisation Requirements:</h5>
                        <div className="grid md:grid-cols-2 gap-2">
                          {[
                            "Trend charts for key metrics",
                            "Heatmaps for performance by segment",
                            "RAG ratings throughout",
                            "Benchmark comparisons",
                            "Vulnerability variance analysis"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <BarChart3 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step8">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 8: Assemble Supporting Evidence Pack
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <ChecklistSection
                        title="Evidence Pack Assembly"
                        items={[
                          { id: "evid1", label: "Create evidence index cross-referencing every assertion" },
                          { id: "evid2", label: "Document location and owner for each piece" },
                          { id: "evid3", label: "Assign quality rating (High/Medium/Low) to each item" },
                          { id: "evid4", label: "Ensure all evidence retrievable within 24 hours" },
                          { id: "evid5", label: "Organise by report section with clear labelling" },
                          { id: "evid6", label: "Implement version control for all documents" },
                          { id: "evid7", label: "Establish access controls for sensitive evidence" }
                        ]}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { category: "Governance", items: ["Meeting minutes", "Board decisions", "Committee papers", "Policy approvals"] },
                          { category: "Monitoring", items: ["MI reports", "Dashboards", "Trend analysis", "Alerts"] },
                          { category: "Four Outcomes", items: ["Assessments", "Testing results", "Product reviews", "Fair value assessments"] },
                          { category: "Vulnerable Customers", items: ["Outcome data", "Policies", "Support records", "Training records"] },
                          { category: "Distribution Chain", items: ["Agreements", "Monitoring reports", "Audit findings", "Information sharing logs"] },
                          { category: "Culture", items: ["Training records", "Surveys", "Feedback", "Incentive reviews"] }
                        ].map((cat, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <h5 className="font-medium text-foreground mb-2">{cat.category}</h5>
                            <ul className="space-y-1">
                              {cat.items.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          FCA Warning
                        </h4>
                        <p className="text-foreground">
                          FCA may request the board report AND supporting evidence with short notice. 
                          Evidence must be regulator-ready at all times.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Phase 4: Quality Assurance & Approval */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Phase 4: Quality Assurance & Approval (Weeks 14-16)
                </CardTitle>
                <CardDescription>Multi-level review and board approval</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step9">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 9: Conduct Multi-Level Review Process
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <div className="space-y-4">
                        {[
                          {
                            level: "Level 1: Data Validation Review",
                            desc: "Data owners verify accuracy",
                            tasks: ["Source reconciliation", "Calculation checks", "Sign-off required"]
                          },
                          {
                            level: "Level 2: Compliance Review",
                            desc: "Check against FCA requirements",
                            tasks: ["All mandatory content included", "Regulatory citations correct", "Consistency with guidance"]
                          },
                          {
                            level: "Level 3: SMF Challenge Review",
                            desc: "Challenge conclusions and verify assertions",
                            tasks: ["Verify accuracy of assertions", "Ensure evidence adequate", "Provide written sign-off"]
                          },
                          {
                            level: "Level 4: Executive Review",
                            desc: "CEO/COO full report review",
                            tasks: ["Strategic alignment check", "Completeness assessment", "Final amendments"]
                          },
                          {
                            level: "Level 5: Board Review",
                            desc: "Formal board consideration",
                            tasks: ["5-7 day pre-read period", "Board meeting discussion", "Questions and challenge", "Formal approval"]
                          }
                        ].map((review, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">{review.level}</h5>
                                <p className="text-sm text-muted-foreground">{review.desc}</p>
                              </div>
                            </div>
                            <div className="ml-11 flex flex-wrap gap-2">
                              {review.tasks.map((task, idx) => (
                                <Badge key={idx} variant="outline">{task}</Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <ChecklistSection
                        title="Quality Standards Verification"
                        items={[
                          { id: "qa1", label: "Accuracy: All data verified and reconciled" },
                          { id: "qa2", label: "Completeness: All FCA requirements covered" },
                          { id: "qa3", label: "Clarity: Plain English, logical flow" },
                          { id: "qa4", label: "Evidence: All assertions supported" },
                          { id: "qa5", label: "Insight: Analysis not just description" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step10">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 10: Manage Board Presentation and Approval
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            Pre-Meeting
                          </h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Pre-brief key board members</li>
                            <li>• Provide full report 5-7 days early</li>
                            <li>• Prepare presentation slides (10-15)</li>
                            <li>• Anticipate questions</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg bg-primary/5">
                          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            During Meeting (60-90 mins)
                          </h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Present executive summary</li>
                            <li>• Deep dive on significant issues</li>
                            <li>• Facilitate discussion</li>
                            <li>• Capture board feedback</li>
                            <li>• Record decisions</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Post-Meeting
                          </h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Update report with board input</li>
                            <li>• Finalise approved version</li>
                            <li>• Communicate decisions</li>
                            <li>• Track action implementation</li>
                          </ul>
                        </div>
                      </div>

                      <RegulatoryQuote
                        source="FCA"
                        reference="Multi-firm Review"
                        quote="Board should be satisfied good outcomes being delivered and agree actions to address concerns."
                      />

                      <ChecklistSection
                        title="Board Presentation Checklist"
                        items={[
                          { id: "board1", label: "Full report circulated 5-7 days before meeting" },
                          { id: "board2", label: "Presentation slides prepared (10-15 slides)" },
                          { id: "board3", label: "Key board members pre-briefed" },
                          { id: "board4", label: "60-90 minutes allocated for discussion" },
                          { id: "board5", label: "Minutes capture decisions and actions" },
                          { id: "board6", label: "Formal approval recorded" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Phase 5: Continuous Improvement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Phase 5: Continuous Improvement (Ongoing)
                </CardTitle>
                <CardDescription>Evolve and mature the reporting approach</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step11">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 11: Implement Report Quality Improvement Process
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <ChecklistSection
                        title="Post-Submission Review"
                        items={[
                          { id: "improve1", label: "Conduct post-submission review within 2 weeks" },
                          { id: "improve2", label: "Document what went well" },
                          { id: "improve3", label: "Identify what could improve" },
                          { id: "improve4", label: "Analyse process bottlenecks" },
                          { id: "improve5", label: "Assess resource adequacy" }
                        ]}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Gather Feedback From:</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              Board members
                            </li>
                            <li className="flex items-center gap-2">
                              <UserCheck className="h-4 w-4 text-primary" />
                              SMF holders
                            </li>
                            <li className="flex items-center gap-2">
                              <Settings className="h-4 w-4 text-primary" />
                              Production team
                            </li>
                            <li className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-primary" />
                              Compliance
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Identify Improvements:</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <Workflow className="h-4 w-4 text-primary" />
                              Automation opportunities
                            </li>
                            <li className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              Template refinements
                            </li>
                            <li className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              Timeline adjustments
                            </li>
                            <li className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              Resource needs
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Document lessons learned and update procedures for the next reporting cycle.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step12">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 12: Monitor Ongoing Developments and Update Approach
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <Gavel className="h-4 w-4 text-primary" />
                            Track Regulatory Developments
                          </h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• FCA speeches and guidance</li>
                            <li>• Multi-firm review findings</li>
                            <li>• Enforcement actions</li>
                            <li>• Policy consultations</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <Scale className="h-4 w-4 text-primary" />
                            Benchmark Against Peers
                          </h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Industry forums</li>
                            <li>• Published FCA decisions</li>
                            <li>• Trade body insights</li>
                            <li>• Good practice examples</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            Adapt to Business Changes
                          </h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• New products launched</li>
                            <li>• Distribution changes</li>
                            <li>• Strategic shifts</li>
                            <li>• Market developments</li>
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Evolve Approach
                          </h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Enhanced MI capabilities</li>
                            <li>• New testing methodologies</li>
                            <li>• Improved analytics</li>
                            <li>• Maturity progression</li>
                          </ul>
                        </div>
                      </div>

                      <ChecklistSection
                        title="Maturity Progression Tracking"
                        items={[
                          { id: "mature1", label: "Assess current maturity level" },
                          { id: "mature2", label: "Define target maturity for next period" },
                          { id: "mature3", label: "Identify gaps and improvement actions" },
                          { id: "mature4", label: "Track progress quarterly" },
                          { id: "mature5", label: "Report maturity progression to board" }
                        ]}
                      />

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <h4 className="font-semibold text-primary mb-3">What Good Looks Like (Progression):</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Year 1:</strong> "Issue identified, action planned"</p>
                          <p><strong>Year 2:</strong> "Action implemented, early results"</p>
                          <p><strong>Year 3:</strong> "Issue resolved, maturity progressed"</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  Part B Templates (7)
                </CardTitle>
                <CardDescription>
                  Downloadable templates for report production and quality assurance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="Template 1: Board Report Production Workflow"
                    description="Excel workbook with production timeline, roles matrix, quality gates, and version control. Includes 10-week timeline table with dependencies and RACI for all key roles."
                    format="Excel"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />
                  
                  <TemplateCard
                    title="Template 2: Board Report Narrative Structure"
                    description="Word document with all 7 main sections, executive summary guidance, word count targets, formatting guidelines, and quality standards checklist."
                    format="Word"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 3: Board Report Evidence Index"
                    description="Excel workbook with evidence register, category organisation, quality assessment criteria (targeting >80% high quality), and evidence gaps tracker."
                    format="Excel"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 4: Board Report Review Checklist"
                    description="Word document covering regulatory compliance, data quality, analysis quality, narrative quality, evidence adequacy, board utility, and process compliance."
                    format="Word"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 5: Board Meeting Presentation Pack"
                    description="PowerPoint template with 15 slides: title, overall assessment, dashboard, each outcome, vulnerable customers, culture, distribution, issues deep dive, actions, and forward plan."
                    format="PowerPoint"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 6: Post-Report Review Log"
                    description="Word template for production process review, feedback capture, next cycle actions, regulatory developments tracking, and maturity assessment."
                    format="Word"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />

                  <TemplateCard
                    title="Template 7: Regulatory Horizon Scanning Log"
                    description="Excel workbook with tabs for FCA developments, enforcement actions, industry intelligence, good practice examples, forward regulatory agenda, and update log."
                    format="Excel"
                    onDownload={() => toast.info("Template download - coming soon")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Template Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="template1">
                    <AccordionTrigger>Template 1: Board Report Production Workflow</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Tab 1: Production Timeline</h5>
                          <p className="text-sm text-muted-foreground">
                            Columns: Week, Activities, Responsible Party, Dependencies, Deliverables
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Tab 2: Roles and Responsibilities</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Board members</li>
                            <li>• CEO/COO</li>
                            <li>• Consumer Duty Champion</li>
                            <li>• SMF outcome owners</li>
                            <li>• MI Lead</li>
                            <li>• Report Coordinator</li>
                            <li>• Compliance Lead</li>
                            <li>• Company Secretary</li>
                          </ul>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Tab 3: Quality Gates</h5>
                          <p className="text-sm text-muted-foreground">
                            5 gates with required approvals before proceeding to next phase
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Tab 4: Version Control Log</h5>
                          <p className="text-sm text-muted-foreground">
                            Track all versions with dates, changes, and approvers
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="template3">
                    <AccordionTrigger>Template 3: Board Report Evidence Index</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Tab 1: Evidence Register</h5>
                          <p className="text-sm text-muted-foreground">
                            Columns: Evidence ID, Report Section/Para, Assertion Made, Evidence Type, 
                            Location, Owner, Quality Rating, Notes
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Tab 2: Evidence Categories</h5>
                          <p className="text-sm text-muted-foreground">
                            Organised by type: Governance, Monitoring, Four Outcomes, 
                            Vulnerable Customers, Distribution Chain, Culture
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Tab 3: Evidence Quality Assessment</h5>
                          <p className="text-sm text-muted-foreground">
                            Criteria for High/Medium/Low quality. Target: &gt;80% high quality
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Tab 4: Evidence Gaps</h5>
                          <p className="text-sm text-muted-foreground">
                            Track insufficient evidence with closure plans and owners
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="template5">
                    <AccordionTrigger>Template 5: Board Meeting Presentation Pack</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">15-slide structure:</p>
                        <div className="grid md:grid-cols-3 gap-2">
                          {[
                            "1. Title and Context",
                            "2. Overall Assessment (RAG)",
                            "3. Dashboard Overview",
                            "4-7. Each Outcome (RAG, findings, actions)",
                            "8. Vulnerable Customers",
                            "9. Culture and Governance",
                            "10. Distribution Chain",
                            "11. Significant Issues Deep Dive",
                            "12. Action Plan Summary",
                            "13. Business Strategy Alignment",
                            "14. Forward Plan",
                            "15. Board Decisions Required"
                          ].map((slide, index) => (
                            <div key={index} className="p-2 bg-muted/30 rounded text-sm">
                              {slide}
                            </div>
                          ))}
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
                  <Search className="h-5 w-5 text-primary" />
                  Recommended Document Repository Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-muted/50 rounded-lg text-sm overflow-x-auto">
{`Consumer_Duty_Board_Reporting/
├── Annual_Reports/
│   ├── [Year]/
│   │   ├── Draft_Versions/
│   │   ├── Final_Report/
│   │   └── Evidence_Pack/
│   └── Archive/
├── Quarterly_Dashboards/
│   ├── [Year]_Q[1-4]/
│   └── Archive/
├── Templates/
│   ├── Report_Template/
│   ├── Presentation_Template/
│   └── Checklists/
├── Evidence_Library/
│   ├── Governance/
│   ├── Monitoring/
│   ├── Four_Outcomes/
│   ├── Vulnerable_Customers/
│   ├── Distribution_Chain/
│   └── Culture/
├── Regulatory_Tracking/
│   ├── FCA_Guidance/
│   ├── Enforcement_Actions/
│   └── Horizon_Scanning/
└── Continuous_Improvement/
    ├── Post_Report_Reviews/
    ├── Lessons_Learned/
    └── Maturity_Assessments/`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Part B Success Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Report Production
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Board report submitted minimum 5 days before meeting",
                        "All milestones met within ±2 days",
                        "No emergency revisions required",
                        "Report passes compliance checklist 100%",
                        "Evidence index complete with >80% high quality"
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
                        "Board dedicates 60-90 minutes to discussion",
                        "Board asks probing questions",
                        "Board provides specific feedback",
                        "Board formally approves report",
                        "Board directs specific actions"
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
                      <Eye className="h-4 w-4 text-primary" />
                      Evidence Management
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Evidence pack assembled and indexed",
                        "All assertions cross-referenced",
                        "Evidence accessible within 24 hours",
                        "Quality adequate for regulatory examination"
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
                      <RefreshCw className="h-4 w-4 text-primary" />
                      Continuous Improvement
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Post-report review completed within 2 weeks",
                        "Lessons learned documented",
                        "Process improvements actioned",
                        "Maturity progression tracked"
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
                  <div className="grid md:grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">&lt;70</p>
                      <p className="text-xs text-muted-foreground">Days: data collection to approval</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">≤3</p>
                      <p className="text-xs text-muted-foreground">Report versions</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">&gt;4/5</p>
                      <p className="text-xs text-muted-foreground">Board satisfaction</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-xs text-muted-foreground">Evidence completeness</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-xs text-muted-foreground">Previous actions closed</p>
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
                    { phase: "Phase 3: Report Production", weeks: "Weeks 10-14", desc: "Complete production workflow and first draft" },
                    { phase: "Phase 4: Quality Assurance", weeks: "Weeks 14-16", desc: "Multi-level review and board approval" },
                    { phase: "Phase 5: Continuous Improvement", weeks: "Ongoing", desc: "Post-report review and maturity progression" }
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
                  Common Pitfalls (Part B: 13-20)
                </CardTitle>
                <CardDescription>
                  Based on FCA multi-firm review findings and industry experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PitfallCard
                  number={13}
                  title="Starting Too Late"
                  description="Firms starting 4-6 weeks before deadline, resulting in rushed reports with poor quality, missed issues, and inadequate validation."
                  impact="Board cannot properly review, quality compromised, regulatory risk"
                  prevention="Start 10-12 weeks early with realistic timeline and milestones"
                  example="Firm started 6 weeks before deadline, insufficient time for proper review, submitted 2 days before meeting, board couldn't review properly"
                />

                <PitfallCard
                  number={14}
                  title="Death by Data"
                  description="FCA Finding: 'Extensive data tables but limited analysis' - reports drowning the board in raw data without actionable insights."
                  impact="Board can't identify key issues, report fails to drive decisions"
                  prevention="Data belongs in appendices. Main report should have RAG ratings, trends, root causes, and actions"
                  example="45-page report with 20 pages of data tables, no clear conclusions or recommended actions"
                />

                <PitfallCard
                  number={15}
                  title="Generic Content Not Specific to Firm"
                  description="FCA Finding: 'Reports that could apply to any firm' - lacking firm-specific data, products, segments, and quantification."
                  impact="Doesn't evidence what THIS firm is doing, fails regulatory scrutiny"
                  prevention="Use firm's actual data, name specific products/segments, quantify everything"
                  example="Bad: 'We monitor vulnerable customers' vs Good: 'We completed vulnerability analysis for 23,456 customers. Identified 3,421 (14.6%) with vulnerability characteristics. Outcome variance: CSAT -0.3 points vs non-vulnerable (target <0.5). Action: Specialist support team (6 FTE) recruiting, complete Q1-25.'"
                />

                <PitfallCard
                  number={16}
                  title="No Honest Acknowledgment of Issues"
                  description="FCA Finding: 'Overly positive reports, downplaying problems' - boards not getting the full picture."
                  impact="Board can't direct remediation, regulatory trust eroded"
                  prevention="Be honest, don't bury bad news, use red/amber RAG appropriately"
                  example="FCA Quote: 'We expect boards to see realistic picture including challenges'"
                />

                <PitfallCard
                  number={17}
                  title="Vague Action Plans"
                  description="FCA Finding: 'Action plans lacking detail, owners, timelines' - actions don't get implemented, same issues recur."
                  impact="No accountability, issues persist cycle after cycle"
                  prevention="Every action needs specific description, named owner, deadline, and success criteria"
                  example="Weak: 'Improve vulnerable customer support' vs Strong: 'Implement specialist vulnerable customer team. Owner: J. Smith (Head of Service). Deadline: 31-Mar-25. Success: (1) 6 specialists trained, (2) Call quality >4.5/5, (3) Outcome variance <-5% by Q3-25. Status: 60% complete.'"
                />

                <PitfallCard
                  number={18}
                  title="Insufficient Board Challenge"
                  description="FCA Finding: 'Report simply presented and approved without challenge' - board not discharging oversight duty."
                  impact="Governance failure, regulatory concerns about board effectiveness"
                  prevention="Build challenge into report, pre-brief on scrutiny areas, allow 60-90 minutes, record questions in minutes"
                  example="Good Practice Questions: 'How confident in this data?', 'What's root cause?', 'Are actions sufficient?', 'How do we compare to peers?'"
                />

                <PitfallCard
                  number={19}
                  title="Evidence Pack as Afterthought"
                  description="FCA Finding: 'Firms scrambling for evidence when FCA requests report' - can't produce evidence promptly, undermines credibility."
                  impact="Regulatory examination failure, suggests poor controls"
                  prevention="Build evidence index AS you write report, store systematically, test retrieval"
                  example="Firm took 3 weeks to assemble evidence after FCA request (had to search emails, recreate analysis)"
                />

                <PitfallCard
                  number={20}
                  title="Not Learning from Previous Cycles"
                  description="FCA Finding: 'Same issues in reports year after year' - demonstrates ineffective governance and lack of improvement."
                  impact="Regulatory concern about firm's ability to embed change"
                  prevention="Post-report review every cycle, track maturity progression, show improvement trajectory"
                  example="What Good Looks Like: Year 1 - 'Issue identified, action planned'; Year 2 - 'Action implemented, early results'; Year 3 - 'Issue resolved, maturity progressed'"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Footer */}
        <Card className="mt-8 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Link to="/monitoring/board-reporting-part1">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: Part A - Foundation & Structure
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Module CD-M3 Complete</Badge>
              </div>
              <Link to="/">
                <Button>
                  Return to Dashboard
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
