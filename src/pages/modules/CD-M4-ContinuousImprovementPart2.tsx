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
  CircleDot,
  Rocket,
  Compass,
  Share2,
  GitBranch,
  PieChart,
  Filter,
  Gauge,
  Activity,
  Trophy,
  Network
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CDM4ContinuousImprovementPart2() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("cdm4-part2-notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleSaveNotes = () => {
    localStorage.setItem("cdm4-part2-notes", notes);
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
                <p className="text-muted-foreground mt-1">Part 2: Prioritisation, Maturity & Innovation</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge variant="outline">Monitoring & Assurance</Badge>
                  <Badge variant="secondary">Ongoing Programme</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/monitoring/continuous-improvement-part1">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Part 1
                </Button>
              </Link>
              <Button onClick={handlePrint} variant="outline" size="sm">
                Print Module
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Banner */}
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Continuing from Part 1</p>
                  <p className="text-sm text-muted-foreground">
                    This module covers Steps 8-14: Prioritisation, maturity progression, innovation pipeline, and best practice sharing
                  </p>
                </div>
              </div>
              <Link to="/monitoring/continuous-improvement-part1">
                <Button variant="outline" size="sm">
                  Review Part 1 →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="implementation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="implementation">Implementation (Part 2)</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
          </TabsList>

          {/* Implementation Tab - Part 2 */}
          <TabsContent value="implementation" className="space-y-6">
            {/* Phase 3: Improvement Prioritisation & Execution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Phase 3: Develop Improvement Prioritisation & Execution
                </CardTitle>
                <CardDescription>Weeks 6-12 — Structured approach to prioritising and delivering improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Step 8 */}
                  <AccordionItem value="step-8">
                    <AccordionTrigger className="text-lg font-semibold">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Step 8</Badge>
                        Create Improvement Prioritisation Matrix
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <RegulatoryQuote
                        source="FCA Strategic Priority"
                        reference="Consumer Duty Implementation"
                        quote="Resources should be focused on improvements that deliver the greatest customer benefit and address the most significant compliance risks."
                      />

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Prioritisation Criteria</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              Customer Impact
                            </h5>
                            <p className="text-sm text-muted-foreground">Scale of benefit to customers — how many affected and how significantly</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                              <Shield className="h-4 w-4 text-primary" />
                              Regulatory Risk
                            </h5>
                            <p className="text-sm text-muted-foreground">Does improvement address a compliance gap or regulatory concern?</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                              <Settings className="h-4 w-4 text-primary" />
                              Feasibility
                            </h5>
                            <p className="text-sm text-muted-foreground">Resource requirements, complexity, dependencies, and time to implement</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Scoring System</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="bg-muted/50">
                                <th className="border p-2 text-left">Criterion</th>
                                <th className="border p-2 text-center">Weight</th>
                                <th className="border p-2 text-left">Score 1</th>
                                <th className="border p-2 text-left">Score 5</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border p-2 font-medium">Customer Impact</td>
                                <td className="border p-2 text-center">×2</td>
                                <td className="border p-2 text-muted-foreground">Minimal benefit</td>
                                <td className="border p-2 text-muted-foreground">Substantial benefit</td>
                              </tr>
                              <tr>
                                <td className="border p-2 font-medium">Regulatory Risk</td>
                                <td className="border p-2 text-center">×2</td>
                                <td className="border p-2 text-muted-foreground">No regulatory risk</td>
                                <td className="border p-2 text-muted-foreground">Critical compliance gap</td>
                              </tr>
                              <tr>
                                <td className="border p-2 font-medium">Feasibility</td>
                                <td className="border p-2 text-center">×1</td>
                                <td className="border p-2 text-muted-foreground">Very complex/costly</td>
                                <td className="border p-2 text-muted-foreground">Simple and low-cost</td>
                              </tr>
                              <tr>
                                <td className="border p-2 font-medium">Strategic Alignment</td>
                                <td className="border p-2 text-center">×1</td>
                                <td className="border p-2 text-muted-foreground">Not aligned</td>
                                <td className="border p-2 text-muted-foreground">Core strategic priority</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Total Score</strong> = (Customer Impact × 2) + (Regulatory Risk × 2) + Feasibility + Strategic Alignment
                          <br />Maximum: 40 | Minimum: 8
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Priority Categories</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                            <h5 className="font-medium text-destructive mb-2">CRITICAL (Score 32-40)</h5>
                            <p className="text-sm text-muted-foreground">Regulatory compliance gaps, high customer harm — immediate action required</p>
                          </div>
                          <div className="p-4 bg-warning/10 rounded-lg border border-warning/30">
                            <h5 className="font-medium text-warning mb-2">HIGH (Score 24-31)</h5>
                            <p className="text-sm text-muted-foreground">Significant customer benefit or risk reduction — prioritise this quarter</p>
                          </div>
                          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                            <h5 className="font-medium text-primary mb-2">MEDIUM (Score 16-23)</h5>
                            <p className="text-sm text-muted-foreground">Valuable improvements — plan for next 2-3 quarters</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg border">
                            <h5 className="font-medium text-muted-foreground mb-2">LOW (Score 8-15)</h5>
                            <p className="text-sm text-muted-foreground">Nice-to-have enhancements — consider when capacity allows</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h5 className="font-medium text-foreground mb-3">Impact vs Effort Matrix (2×2)</h5>
                        <div className="grid grid-cols-2 gap-2 max-w-md">
                          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded text-center">
                            <p className="font-medium text-green-800 dark:text-green-300">Quick Wins</p>
                            <p className="text-xs text-green-700 dark:text-green-400">High Impact, Low Effort</p>
                            <p className="text-xs mt-1">→ Do First</p>
                          </div>
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded text-center">
                            <p className="font-medium text-blue-800 dark:text-blue-300">Strategic Projects</p>
                            <p className="text-xs text-blue-700 dark:text-blue-400">High Impact, High Effort</p>
                            <p className="text-xs mt-1">→ Plan Carefully</p>
                          </div>
                          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded text-center">
                            <p className="font-medium text-yellow-800 dark:text-yellow-300">Fill-ins</p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-400">Low Impact, Low Effort</p>
                            <p className="text-xs mt-1">→ Do If Capacity</p>
                          </div>
                          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded text-center">
                            <p className="font-medium text-red-800 dark:text-red-300">Time Wasters</p>
                            <p className="text-xs text-red-700 dark:text-red-400">Low Impact, High Effort</p>
                            <p className="text-xs mt-1">→ Avoid</p>
                          </div>
                        </div>
                      </div>

                      <ChecklistSection
                        title="Step 8 Checklist"
                        moduleId="cdm4-part2"
                        stepNumber={8}
                        items={[
                          { id: "8.1", label: "Define prioritisation criteria with weightings" },
                          { id: "8.2", label: "Implement scoring system (1-5 scale per criterion)" },
                          { id: "8.3", label: "Create four priority categories with clear thresholds" },
                          { id: "8.4", label: "Build 2×2 Impact vs Effort matrix visualisation" },
                          { id: "8.5", label: "Establish quarterly prioritisation review process" },
                          { id: "8.6", label: "Create transparent communication of prioritisation decisions" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Step 9 */}
                  <AccordionItem value="step-9">
                    <AccordionTrigger className="text-lg font-semibold">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Step 9</Badge>
                        Establish Improvement Project Management Approach
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Improvement Project Lifecycle</h4>
                        <div className="flex flex-wrap gap-2 items-center justify-center p-4 bg-muted/30 rounded-lg">
                          {["Initiation", "Planning", "Execution", "Testing", "Deployment", "Monitoring", "Review"].map((phase, i) => (
                            <div key={phase} className="flex items-center">
                              <div className="px-3 py-2 bg-primary/10 rounded-lg text-sm font-medium text-primary">
                                {phase}
                              </div>
                              {i < 6 && <ArrowRight className="h-4 w-4 mx-1 text-muted-foreground" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Project Templates Required</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              One-page business case (small improvements)
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              Full project plan (significant changes)
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              RAID log (Risks, Assumptions, Issues, Dependencies)
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              Change request process
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              Progress reporting format
                            </li>
                          </ul>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h5 className="font-medium text-foreground mb-3">Governance Cadence</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              Weekly stand-ups for active projects
                            </li>
                            <li className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              Monthly steering group review
                            </li>
                            <li className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              Quarterly portfolio review
                            </li>
                            <li className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              Clear decision-making authority
                            </li>
                            <li className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              Issue escalation pathways
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium text-primary">
                          Key Principle: Small improvements delivered quickly often better than perfect improvements delivered slowly
                        </p>
                      </div>

                      <ChecklistSection
                        title="Step 9 Checklist"
                        moduleId="cdm4-part2"
                        stepNumber={9}
                        items={[
                          { id: "9.1", label: "Define improvement project lifecycle stages" },
                          { id: "9.2", label: "Create project templates (business case, plan, RAID log)" },
                          { id: "9.3", label: "Establish governance cadence (weekly/monthly/quarterly)" },
                          { id: "9.4", label: "Set up improvement portfolio tracking dashboard" },
                          { id: "9.5", label: "Define decision-making authority levels" },
                          { id: "9.6", label: "Implement benefits realisation tracking" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Step 10 */}
                  <AccordionItem value="step-10">
                    <AccordionTrigger className="text-lg font-semibold">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Step 10</Badge>
                        Implement Quick Wins Programme
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Quick Win Criteria</h4>
                        <div className="grid md:grid-cols-5 gap-3">
                          {[
                            { icon: Clock, label: "30 days or less", desc: "Implementation time" },
                            { icon: Settings, label: "Minimal resource", desc: "Low budget/effort" },
                            { icon: Shield, label: "Low complexity", desc: "Minimal risk" },
                            { icon: Eye, label: "Visible improvement", desc: "Customer/staff impact" },
                            { icon: BarChart3, label: "Measurable", desc: "Clear outcome" }
                          ].map((item) => (
                            <div key={item.label} className="p-3 bg-muted/50 rounded-lg text-center">
                              <item.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                              <p className="text-sm font-medium">{item.label}</p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Example Quick Wins</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            "Reword confusing letter paragraph",
                            "Add FAQ to website for common question",
                            "Simplify form by removing unnecessary field",
                            "Extend call centre hours for difficult day/week",
                            "Add live chat for specific process",
                            "Create video explainer for complex concept",
                            "Improve signposting to vulnerable customer support",
                            "Update email template with clearer call-to-action"
                          ].map((example) => (
                            <div key={example} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                              <Zap className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-sm">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="font-medium text-foreground mb-2">Cultural Message</p>
                        <p className="text-sm text-muted-foreground italic">
                          "Don't wait for perfection — deliver incremental improvements constantly"
                        </p>
                      </div>

                      <ChecklistSection
                        title="Step 10 Checklist"
                        moduleId="cdm4-part2"
                        stepNumber={10}
                        items={[
                          { id: "10.1", label: "Define quick win criteria (≤30 days, low resource)" },
                          { id: "10.2", label: "Create streamlined approval process (manager level)" },
                          { id: "10.3", label: "Allocate dedicated resource/time (e.g., 20% time)" },
                          { id: "10.4", label: "Implement rapid implementation sprints" },
                          { id: "10.5", label: "Establish monthly 'Quick Win Roundup' communication" },
                          { id: "10.6", label: "Create recognition programme for quick win teams" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Phase 4: Maturity Progression Framework */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Phase 4: Build Maturity Progression Framework
                </CardTitle>
                <CardDescription>Weeks 8-16 — Track progression from compliance to embedded excellence</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Step 11 */}
                  <AccordionItem value="step-11">
                    <AccordionTrigger className="text-lg font-semibold">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Step 11</Badge>
                        Implement Maturity Assessment Process
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <RegulatoryQuote
                        source="FCA Multi-firm Review"
                        reference="November 2025"
                        quote="Best practice firms demonstrate progressive maturity, moving from compliance-focused to genuinely customer-centric operations."
                      />

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Maturity Dimensions for Assessment</h4>
                        <div className="grid md:grid-cols-4 gap-3">
                          {[
                            { icon: Building2, label: "Governance & Culture" },
                            { icon: FileText, label: "Products & Services" },
                            { icon: Scale, label: "Price & Value" },
                            { icon: MessageSquare, label: "Consumer Understanding" },
                            { icon: UserCheck, label: "Consumer Support" },
                            { icon: Shield, label: "Vulnerable Customers" },
                            { icon: Network, label: "Distribution Chain" },
                            { icon: BarChart3, label: "Data & MI Capabilities" }
                          ].map((dim) => (
                            <div key={dim.label} className="p-3 bg-muted/50 rounded-lg text-center">
                              <dim.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                              <p className="text-sm font-medium">{dim.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Maturity Level Descriptors</h4>
                        <div className="space-y-3">
                          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                            <h5 className="font-medium text-foreground">Level 1: Nascent</h5>
                            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                              <li>• Ad-hoc processes, reactive approach</li>
                              <li>• Limited MI and outcome monitoring</li>
                              <li>• Compliance-focused, not customer-focused</li>
                              <li>• Siloed functions, limited coordination</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                            <h5 className="font-medium text-foreground">Level 2: Developing</h5>
                            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                              <li>• Processes documented and being implemented</li>
                              <li>• Some outcome monitoring established</li>
                              <li>• Growing customer focus alongside compliance</li>
                              <li>• Cross-functional working emerging</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                            <h5 className="font-medium text-foreground">Level 3: Defined</h5>
                            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                              <li>• Processes embedded and consistently applied</li>
                              <li>• Regular outcome monitoring with MI dashboard</li>
                              <li>• Customer outcomes drive decisions</li>
                              <li>• Strong cross-functional collaboration</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                            <h5 className="font-medium text-foreground">Level 4: Managed</h5>
                            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                              <li>• Data-driven decision making routine</li>
                              <li>• Proactive identification of risks and opportunities</li>
                              <li>• Customer-centric culture evident</li>
                              <li>• Advanced analytics and predictive capabilities</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                            <h5 className="font-medium text-foreground">Level 5: Embedded</h5>
                            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                              <li>• Customer outcomes central to strategy and purpose</li>
                              <li>• Predictive analytics prevent issues before occurrence</li>
                              <li>• Innovation driven by customer benefit</li>
                              <li>• Industry-leading practices</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="font-medium text-foreground mb-2">
                          <Target className="h-4 w-4 inline mr-2" />
                          Target
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Progress at least one level per dimension over 2-3 years. FCA expects to see year-on-year improvement, not stagnation.
                        </p>
                      </div>

                      <ChecklistSection
                        title="Step 11 Checklist"
                        moduleId="cdm4-part2"
                        stepNumber={11}
                        items={[
                          { id: "11.1", label: "Define 8 maturity dimensions for assessment" },
                          { id: "11.2", label: "Create detailed level descriptors (1-5) for each dimension" },
                          { id: "11.3", label: "Develop annual self-assessment process with evidence requirements" },
                          { id: "11.4", label: "Set realistic progression targets (min +0.5 level/year)" },
                          { id: "11.5", label: "Create maturity improvement roadmap for each dimension" },
                          { id: "11.6", label: "Consider external validation options (peer benchmarking, audit)" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Step 12 */}
                  <AccordionItem value="step-12">
                    <AccordionTrigger className="text-lg font-semibold">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Step 12</Badge>
                        Create Innovation Pipeline for Customer Outcomes
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <RegulatoryQuote
                        source="FCA Position"
                        reference="Consumer Duty Guidance"
                        quote="Innovation is welcome where it genuinely improves customer outcomes, but firms must evidence the benefit and manage risks."
                      />

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Innovation Process</h4>
                        <div className="flex flex-wrap gap-2 items-center justify-center p-4 bg-muted/30 rounded-lg">
                          {[
                            { label: "Idea Generation", icon: Lightbulb },
                            { label: "Feasibility", icon: Search },
                            { label: "Customer Benefit", icon: Users },
                            { label: "Risk Assessment", icon: Shield },
                            { label: "Pilot/Test", icon: BrainCircuit },
                            { label: "Evaluate", icon: BarChart3 },
                            { label: "Scale/Stop", icon: Rocket }
                          ].map((phase, i, arr) => (
                            <div key={phase.label} className="flex items-center">
                              <div className="px-3 py-2 bg-primary/10 rounded-lg text-center">
                                <phase.icon className="h-4 w-4 mx-auto mb-1 text-primary" />
                                <span className="text-xs font-medium text-primary">{phase.label}</span>
                              </div>
                              {i < arr.length - 1 && <ArrowRight className="h-4 w-4 mx-1 text-muted-foreground" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Innovation Themes by Outcome</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2">Products & Services</h5>
                            <p className="text-sm text-muted-foreground">New product designs, inclusive features, simplified offerings</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2">Price & Value</h5>
                            <p className="text-sm text-muted-foreground">New value propositions, transparent pricing, loyalty rewards</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2">Consumer Understanding</h5>
                            <p className="text-sm text-muted-foreground">Personalised communications, video content, interactive tools</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2">Consumer Support</h5>
                            <p className="text-sm text-muted-foreground">AI chatbots, new channels, proactive outreach, 24/7 access</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Innovation Examples</h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          {[
                            "AI chatbots for 24/7 support",
                            "Video explainers replacing dense documents",
                            "Personalised communication based on data",
                            "Predictive analytics for vulnerability",
                            "Open banking for value assessment",
                            "Gamification for financial education",
                            "Voice technology for accessibility",
                            "Behavioural nudges for better decisions",
                            "Proactive issue identification"
                          ].map((example) => (
                            <div key={example} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                              <Sparkles className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-sm">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <ChecklistSection
                        title="Step 12 Checklist"
                        moduleId="cdm4-part2"
                        stepNumber={12}
                        items={[
                          { id: "12.1", label: "Establish structured innovation process (idea to scale)" },
                          { id: "12.2", label: "Create innovation themes aligned to four outcomes" },
                          { id: "12.3", label: "Implement 'sandbox' approach for controlled experimentation" },
                          { id: "12.4", label: "Design A/B testing capabilities for communications/processes" },
                          { id: "12.5", label: "Appoint innovation champion at executive level" },
                          { id: "12.6", label: "Allocate protected budget for experimentation" },
                          { id: "12.7", label: "Foster tolerance for 'intelligent failure' culture" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Step 13 */}
                  <AccordionItem value="step-13">
                    <AccordionTrigger className="text-lg font-semibold">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Step 13</Badge>
                        Implement Regulatory Horizon Scanning
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Horizon Scanning Sources</h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          {[
                            { label: "FCA Publications", desc: "Speeches, consultations, policy statements" },
                            { label: "FCA Corporate Plan", desc: "Annual priorities and focus areas" },
                            { label: "Trade Bodies", desc: "UK Finance, ABI, IA intelligence" },
                            { label: "Parliamentary", desc: "Inquiries and Treasury committees" },
                            { label: "International", desc: "EU, US regulatory developments" },
                            { label: "Industry Events", desc: "Conferences, briefings, webinars" }
                          ].map((source) => (
                            <div key={source.label} className="p-3 bg-muted/50 rounded-lg">
                              <h5 className="font-medium text-foreground text-sm">{source.label}</h5>
                              <p className="text-xs text-muted-foreground">{source.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Scanning Process Cadence</h4>
                        <div className="grid md:grid-cols-4 gap-3">
                          <div className="p-3 bg-muted/50 rounded-lg text-center">
                            <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                            <p className="text-sm font-medium">Weekly</p>
                            <p className="text-xs text-muted-foreground">Monitor FCA website and key sources</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg text-center">
                            <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                            <p className="text-sm font-medium">Monthly</p>
                            <p className="text-xs text-muted-foreground">Horizon scanning summary</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg text-center">
                            <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                            <p className="text-sm font-medium">Quarterly</p>
                            <p className="text-xs text-muted-foreground">Strategic implications assessment</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg text-center">
                            <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                            <p className="text-sm font-medium">Annual</p>
                            <p className="text-xs text-muted-foreground">Full regulatory environment review</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Key Areas to Monitor for Consumer Duty</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            "Fair value assessment guidance evolution",
                            "Vulnerable customer support expectations",
                            "Distribution chain oversight requirements",
                            "Technology and AI implications",
                            "Open banking and data sharing",
                            "Climate/ESG integration with Consumer Duty"
                          ].map((area) => (
                            <div key={area} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                              <Compass className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-sm">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <ChecklistSection
                        title="Step 13 Checklist"
                        moduleId="cdm4-part2"
                        stepNumber={13}
                        items={[
                          { id: "13.1", label: "Define comprehensive horizon scanning sources list" },
                          { id: "13.2", label: "Establish scanning process cadence (weekly to annual)" },
                          { id: "13.3", label: "Create impact assessment framework for developments" },
                          { id: "13.4", label: "Implement proactive consultation engagement" },
                          { id: "13.5", label: "Link horizon scanning to improvement planning" },
                          { id: "13.6", label: "Set up regulatory development alert system" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Step 14 */}
                  <AccordionItem value="step-14">
                    <AccordionTrigger className="text-lg font-semibold">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Step 14</Badge>
                        Build Best Practice Sharing Mechanisms
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground">Internal Best Practice Sharing</h4>
                          <ul className="space-y-2">
                            {[
                              "Monthly 'What Worked Well' sessions",
                              "Cross-team showcases (lessons learned)",
                              "Internal newsletter highlighting improvements",
                              "Recognition for exceptional outcome delivery",
                              "Knowledge management system for approaches"
                            ].map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm">
                                <Share2 className="h-4 w-4 text-primary shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground">External Best Practice Sources</h4>
                          <ul className="space-y-2">
                            {[
                              "FCA multi-firm review good practice examples",
                              "Industry working groups and forums",
                              "Trade body guidance and case studies",
                              "Peer firm collaboration (where appropriate)",
                              "International comparison and learning"
                            ].map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm">
                                <Search className="h-4 w-4 text-primary shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-medium text-foreground mb-3">Benchmarking Approach</h5>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-sm">
                            <p className="font-medium mb-1">Identify</p>
                            <p className="text-muted-foreground">Comparable firms (size, sector, complexity)</p>
                          </div>
                          <div className="text-sm">
                            <p className="font-medium mb-1">Compare</p>
                            <p className="text-muted-foreground">Share anonymised data via trade bodies</p>
                          </div>
                          <div className="text-sm">
                            <p className="font-medium mb-1">Learn</p>
                            <p className="text-muted-foreground">Identify gaps, adapt good practice</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="font-medium text-foreground mb-2">Balance Principle</p>
                        <p className="text-sm text-muted-foreground">
                          Don't reinvent the wheel if good practice exists. But don't copy blindly — adapt to your context. 
                          Test and validate before full rollout. Build on good practice to create better practice.
                        </p>
                      </div>

                      <ChecklistSection
                        title="Step 14 Checklist"
                        moduleId="cdm4-part2"
                        stepNumber={14}
                        items={[
                          { id: "14.1", label: "Establish internal best practice sharing mechanisms" },
                          { id: "14.2", label: "Create external best practice identification process" },
                          { id: "14.3", label: "Implement benchmarking approach with comparable firms" },
                          { id: "14.4", label: "Set up regular review of FCA published findings" },
                          { id: "14.5", label: "Create 'What can we learn?' discussion framework" },
                          { id: "14.6", label: "Build best practice repository with search capability" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Module Completion */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Module Complete</p>
                      <p className="text-sm text-muted-foreground">
                        You have completed all 14 implementation steps for the Continuous Improvement Framework
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/monitoring/continuous-improvement-part1">
                      <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Review Part 1
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button size="sm">
                        Return to Dashboard
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <TemplateCard
                title="1. Continuous Improvement Governance Charter"
                description="Formal governance document establishing ownership, committee structure, decision authority, and reporting to Board"
                format="Word"
              />
              <TemplateCard
                title="2. Improvement Suggestion Form & Process"
                description="Staff suggestion form with triage workflow, tracking fields, and feedback loop process"
                format="Word"
              />
              <TemplateCard
                title="3. Annual Consumer Duty Review Calendar"
                description="12-month calendar with monthly milestones, quarterly reviews, and annual strategic activities"
                format="Excel"
              />
              <TemplateCard
                title="4. Trend Analysis Dashboard Specification"
                description="Dashboard design for outcomes trends, vulnerable customer parity, complaints, and predictive indicators"
                format="Excel"
              />
              <TemplateCard
                title="5. Issue Flagging & Escalation Protocol"
                description="Step-by-step protocol for identification, assessment, escalation, RCA, remediation, and monitoring"
                format="Word"
              />
              <TemplateCard
                title="6. Root Cause Analysis Template"
                description="Comprehensive RCA template with 5 Whys, Fishbone diagram, impact assessment, and remediation plan"
                format="Word"
              />
              <TemplateCard
                title="7. Lessons Learned Capture Form"
                description="Structured form for capturing lessons from events, projects, feedback with broader application assessment"
                format="Word"
              />
              <TemplateCard
                title="8. Improvement Prioritisation Matrix"
                description="Excel-based scoring tool with weighted criteria, priority categories, and 2×2 impact/effort matrix"
                format="Excel"
              />
              <TemplateCard
                title="9. Improvement Project Charter & Plan"
                description="Project documentation including one-page charter, detailed plan, RAID log, and benefits tracking"
                format="Word"
              />
              <TemplateCard
                title="10. Quick Wins Log & Impact Tracker"
                description="Simple tracking log for quick improvements with impact measurement and success rate metrics"
                format="Excel"
              />
              <TemplateCard
                title="11. Maturity Assessment Framework"
                description="Detailed scoring guide with level descriptors for all 8 dimensions, evidence requirements, and progression targets"
                format="Excel"
              />
              <TemplateCard
                title="12. Innovation Proposal & Evaluation Framework"
                description="Structured approach covering feasibility, customer benefit, risk assessment, pilot plan, and evaluation criteria"
                format="Word"
              />
              <TemplateCard
                title="13. Regulatory Horizon Scanning Log"
                description="Tracking log for regulatory developments with impact assessment, action planning, and strategic implications"
                format="Excel"
              />
              <TemplateCard
                title="14. Best Practice Capture & Application Framework"
                description="Framework for identifying, adapting, and applying internal and external best practices"
                format="Word"
              />
            </div>

            {/* Detailed Template Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Template Specifications</CardTitle>
                <CardDescription>Detailed content requirements for key templates</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="template-8">
                    <AccordionTrigger>Improvement Prioritisation Matrix (Template 8)</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-3">
                        <h5 className="font-medium">Criteria & Weights</h5>
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="border p-2 text-left">Criterion</th>
                              <th className="border p-2 text-center">Weight</th>
                              <th className="border p-2 text-left">Scoring Guide</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">Customer Impact</td>
                              <td className="border p-2 text-center">×2</td>
                              <td className="border p-2">1=Minimal → 5=Substantial benefit</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Regulatory Risk Reduction</td>
                              <td className="border p-2 text-center">×2</td>
                              <td className="border p-2">1=No risk → 5=Critical compliance gap</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Feasibility</td>
                              <td className="border p-2 text-center">×1</td>
                              <td className="border p-2">1=Very complex → 5=Simple/low-cost</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Strategic Alignment</td>
                              <td className="border p-2 text-center">×1</td>
                              <td className="border p-2">1=Not aligned → 5=Core priority</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="text-sm text-muted-foreground">
                          <strong>Calculation:</strong> (Customer × 2) + (Regulatory × 2) + Feasibility + Strategic = Total (max 40)
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="template-11">
                    <AccordionTrigger>Maturity Assessment Framework (Template 11)</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-3">
                        <h5 className="font-medium">Example: Consumer Understanding Outcome Maturity</h5>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                            <strong>Level 1:</strong> Communications reviewed for legal compliance only. No testing. One-size-fits-all approach.
                          </div>
                          <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                            <strong>Level 2:</strong> Plain language guidelines introduced. Ad-hoc testing. Some tailoring for segments.
                          </div>
                          <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                            <strong>Level 3:</strong> Systematic testing protocol. Regular testing using multiple methods. Tailored for vulnerable customers.
                          </div>
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <strong>Level 4:</strong> Comprehensive testing including behavioural. Predictive analytics. Highly personalised communications.
                          </div>
                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                            <strong>Level 5:</strong> Industry-leading testing. AI-driven personalisation. Proactive identification of confusion.
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          Similar detailed descriptors required for all 8 dimensions
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="template-6">
                    <AccordionTrigger>Root Cause Analysis Template (Template 6)</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium mb-2">RCA Sections</h5>
                          <ul className="space-y-1 text-muted-foreground">
                            <li>1. Issue Description</li>
                            <li>2. Timeline of Events</li>
                            <li>3. Immediate Cause</li>
                            <li>4. 5 Whys Analysis</li>
                            <li>5. Contributing Factors (Fishbone)</li>
                            <li>6. Scale of Impact</li>
                            <li>7. Remediation Plan</li>
                            <li>8. Monitoring Plan</li>
                            <li>9. Lessons Learned</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Fishbone Categories</h5>
                          <ul className="space-y-1 text-muted-foreground">
                            <li>• People factors</li>
                            <li>• Process factors</li>
                            <li>• Technology factors</li>
                            <li>• Environment factors</li>
                            <li>• Policy factors</li>
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
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Governance & Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Continuous improvement formally embedded in governance with clear senior ownership",
                      "Annual review cycle calendar established and followed",
                      "Board receives and approves Annual Consumer Duty Report with improvement priorities",
                      "Standing agenda item at Consumer Duty Oversight Committee",
                      "Improvement suggestion process operational with >50 suggestions per year",
                      ">80% of suggestions receive response within 3 weeks"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    Improvement Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      ">10 improvements implemented per quarter",
                      ">5 quick wins delivered per month",
                      "100% of Critical priority improvements within target timeframe",
                      ">90% of High priority improvements within quarter",
                      "Measurable customer benefit from >80% of improvements"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Monitoring & Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Trend analysis dashboard operational and reviewed monthly",
                      "Early warning indicators defined and monitored",
                      "RCA completed for 100% of systemic issues",
                      "Lessons learned captured from all major issues and projects",
                      "Quarterly lessons learned reviews conducted"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Maturity Progression
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Maturity assessment completed annually",
                      "Progression of at least 0.5 levels per dimension per year",
                      "No dimensions regress in maturity",
                      "Action plans for all dimensions below level 3",
                      "Overall average maturity >3.5 within 3 years"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Culture & Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      ">70% staff engagement in continuous improvement activities",
                      "Recognition programme operational",
                      "Improvement success stories shared monthly",
                      "Staff survey shows increasing customer-centric culture belief",
                      "Visible executive sponsorship and participation"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Innovation pipeline established with >5 active pilots",
                      "At least 1 customer outcome innovation per quarter",
                      "Customer co-creation activities twice per year",
                      "Protected experimentation budget allocated",
                      "Tolerance for 'intelligent failure' culture evident"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Metrics Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  Key Metrics to Track
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { metric: "Improvements Implemented", target: "X per quarter", icon: Activity },
                    { metric: "Quick Wins Delivered", target: "X per month", icon: Zap },
                    { metric: "Avg Implementation Time", target: "X days", icon: Clock },
                    { metric: "Customer Benefit Delivered", target: "£X or X customers", icon: Users },
                    { metric: "Maturity Score", target: "X.X average", icon: TrendingUp },
                    { metric: "Suggestion Engagement", target: "X suggestions, X% implemented", icon: MessageSquare }
                  ].map((item) => (
                    <div key={item.metric} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="h-4 w-4 text-primary" />
                        <p className="font-medium text-sm">{item.metric}</p>
                      </div>
                      <p className="text-muted-foreground text-sm">Target: {item.target}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
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
                    { weeks: "1-4", phase: "Governance and process establishment", status: "Part 1" },
                    { weeks: "2-8", phase: "Monitoring capabilities build", status: "Part 1" },
                    { weeks: "6-12", phase: "Prioritisation and execution frameworks", status: "Part 2" },
                    { weeks: "8-16", phase: "Maturity and innovation frameworks", status: "Part 2" },
                    { weeks: "12+", phase: "Ongoing continuous improvement cycle", status: "Continuous" }
                  ].map((item) => (
                    <div key={item.weeks} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                      <Badge variant="outline" className="shrink-0">Weeks {item.weeks}</Badge>
                      <p className="flex-1 text-sm">{item.phase}</p>
                      <Badge variant="secondary">{item.status}</Badge>
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
                title="Pitfall 1: 'Set and Forget' Mindset"
                description="FCA Finding: Some firms treated Consumer Duty as a one-off implementation project rather than ongoing obligation. Compliance deteriorates over time; firm falls behind evolving expectations."
                impact="Customer outcomes stagnate or decline. Increased regulatory scrutiny. Competitive disadvantage."
                prevention="Embed continuous improvement in governance with annual review cycles, ongoing monitoring, and improvement targets. Consumer Duty is a journey, not a destination."
              />

              <PitfallCard
                title="Pitfall 2: No Dedicated Improvement Resource"
                description="FCA Finding: Firms without dedicated resource for continuous improvement struggle to sustain compliance. Only reactive issue-fixing occurs with no proactive enhancement."
                impact="Improvements are deferred indefinitely. Same issues recur. Staff suggestions go nowhere."
                prevention="Allocate specific budget and resource for continuous improvement, typically 5-10% of Consumer Duty programme."
              />

              <PitfallCard
                title="Pitfall 3: Improvement Without Measurement"
                description="FCA Finding: Changes implemented without validating impact on customer outcomes. Effort wasted on ineffective changes."
                impact="Cannot demonstrate improvement to Board or regulator. Miss opportunities to scale what works."
                prevention="Every improvement must have measurable success criteria and impact validation after implementation."
              />

              <PitfallCard
                title="Pitfall 4: Ignoring Small Improvements"
                description="FCA Finding: Firms focus exclusively on large strategic improvements, missing the cumulative impact of many small changes."
                impact="Long delays before any improvement delivered. Staff disengagement. Lack of visible progress."
                prevention="Balance strategic improvements with quick wins programme. Celebrate small improvements."
              />

              <PitfallCard
                title="Pitfall 5: Poor Prioritisation"
                description="FCA Finding: Equal effort on all improvements regardless of customer impact or regulatory risk. Resources spread too thin."
                impact="Critical improvements delayed. Low-value work consumes capacity. Regulatory gaps persist."
                prevention="Use prioritisation matrix explicitly scoring customer impact, regulatory risk, and feasibility."
              />

              <PitfallCard
                title="Pitfall 6: Not Learning from Complaints"
                description="FCA Finding: Complaints handled individually without identifying and fixing systemic root causes. FCA expects firms to use complaints as valuable intelligence."
                impact="Same issues recur repeatedly. Complaint volumes remain high. Customer harm continues."
                prevention="Mandatory root cause analysis for complaint themes. Track reduction in repeat root causes as KPI."
              />

              <PitfallCard
                title="Pitfall 7: No Staff Engagement"
                description="FCA Finding: Continuous improvement driven entirely top-down without frontline engagement. Miss valuable insights from customer-facing staff."
                impact="Lack of ownership. Poor implementation. Improvements that make jobs harder. Low morale."
                prevention="Create simple suggestion process, recognise contributions, involve staff in design and implementation."
              />

              <PitfallCard
                title="Pitfall 8: Ignoring External Learning"
                description="FCA Finding: Firms not learning from FCA published findings, enforcement actions, or industry good practice."
                impact="Repeat mistakes made by others. Miss opportunities to adopt proven practices. Regulatory surprise."
                prevention="Systematic horizon scanning, regular review of FCA findings, active benchmarking, industry engagement."
              />

              <PitfallCard
                title="Pitfall 9: No Maturity Progression"
                description="FCA Finding: Firms remain at same maturity level year after year, not progressing toward embedded excellence. FCA expects year-on-year improvement."
                impact="Viewed as not taking Consumer Duty seriously. Increased regulatory scrutiny. Competitive disadvantage."
                prevention="Conduct annual maturity assessment, set progression targets, track improvement over time."
              />

              <PitfallCard
                title="Pitfall 10: Innovation Without Governance"
                description="FCA Finding: Uncontrolled experimentation creating new customer risks. Innovations harm customers before issues identified."
                impact="Regulatory intervention. Reputational damage. Innovation stopped entirely as overreaction."
                prevention="Structured innovation process with risk assessment, piloting, and evaluation before scaling."
              />

              <PitfallCard
                title="Pitfall 11: Improvement Data Not Reaching Board"
                description="FCA Finding: Board receives high-level summary only, not trends, deterioration, or improvement effectiveness."
                impact="Board cannot effectively oversee. Issues escalate before visibility. Attestation not properly evidenced."
                prevention="Board reporting includes trend data, improvement tracking, and evidence of effectiveness. Board challenges and probes."
              />

              <PitfallCard
                title="Pitfall 12: Annual Review as Tick-Box"
                description="FCA Finding: Annual report is compliance exercise, not genuine assessment and action-planning. Board rubber-stamps without real discussion."
                impact="Misses opportunity for strategic review. Improvements not prioritised. Nothing changes."
                prevention="Annual report is strategic document with honest assessment, priority-setting, and action-planning. Board actively challenges."
              />
            </div>

            {/* Remediation Guidance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Quick Remediation Guidance
                </CardTitle>
                <CardDescription>If you recognise these pitfalls in your organisation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-foreground mb-2">Immediate Actions</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Acknowledge the gap honestly</li>
                      <li>• Assign clear senior ownership</li>
                      <li>• Allocate dedicated resource/budget</li>
                      <li>• Implement quick wins to show momentum</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-foreground mb-2">Longer-term Actions</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Establish proper governance structure</li>
                      <li>• Build measurement capabilities</li>
                      <li>• Engage staff in improvement culture</li>
                      <li>• Track and demonstrate progression</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notes Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Module Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg bg-background resize-none"
              placeholder="Add your notes for this module..."
            />
            <Button onClick={handleSaveNotes} size="sm">
              Save Notes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
