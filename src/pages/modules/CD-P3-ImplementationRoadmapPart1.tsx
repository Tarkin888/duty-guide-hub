import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Map, Clock, Users, FileText, Target, CheckCircle2, AlertTriangle, Lightbulb, Calendar, DollarSign, GitBranch, Shield, Building2, TrendingUp, Milestone, ArrowRight } from "lucide-react";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { toast } from "sonner";

export default function CDP3ImplementationRoadmapPart1() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    toast.success("Export functionality", {
      description: "Module content prepared for export"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">Governance & Planning</Badge>
                  <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Part 1 of 2</Badge>
                </div>
                <h1 className="text-3xl font-bold text-foreground">CD-P3: Implementation Roadmap Development</h1>
                <p className="text-muted-foreground mt-1">Part 1: Strategic Planning</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint}>Print</Button>
              <Button variant="outline" onClick={handleExport}>Export PDF</Button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
            <TabsTrigger value="steps">Implementation Steps</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Strategic Implementation Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-lg font-medium text-foreground">
                    Develop a comprehensive, Board-approved implementation roadmap that sequences Consumer Duty activities, 
                    allocates resources effectively, and establishes clear accountability for delivery across all four outcomes 
                    and cross-cutting requirements.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Duration & Effort
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Strategic Planning</span>
                        <span className="font-medium">3-4 weeks</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Key Activities</span>
                        <span className="font-medium">15-20 major planning activities</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Core Team</span>
                        <span className="font-medium">4-6 people</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Approval Timeline</span>
                        <span className="font-medium">2-3 weeks for Board approval</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Key Stakeholders
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 py-1">
                        <Badge variant="outline" className="text-xs">Board</Badge>
                        <span>Strategic approval, resource commitment</span>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <Badge variant="outline" className="text-xs">ExCo</Badge>
                        <span>Strategy approval, resource allocation</span>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <Badge variant="outline" className="text-xs">Programme Sponsor</Badge>
                        <span>Overall accountability (SMF level)</span>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <Badge variant="outline" className="text-xs">Project Lead</Badge>
                        <span>Day-to-day management</span>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <Badge variant="outline" className="text-xs">Finance/HR</Badge>
                        <span>Budget and resource planning</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Critical Success Factor</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Board approval and realistic resource commitment. This creates the "contract" between Board and delivery teams 
                    and is the foundation for the entire implementation programme.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Part 1 Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Part 1 Deliverables
                </CardTitle>
                <CardDescription>Strategic planning outputs required for Board approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Implementation Strategy Document", desc: "What/Why/When/Who framework" },
                    { title: "Phasing Framework", desc: "4-5 phases with clear objectives" },
                    { title: "High-Level Timeline", desc: "Gantt chart showing major phases" },
                    { title: "Resource Requirements Summary", desc: "People, technology, external support" },
                    { title: "Budget Estimate & Business Case", desc: "Investment requirements and ROI" },
                    { title: "Critical Path Analysis", desc: "Dependencies and constraints mapped" },
                    { title: "Risk Register & Mitigation Plans", desc: "Programme risks identified and mitigated" },
                    { title: "Governance Structure Design", desc: "4-tier oversight model" },
                    { title: "Board Approval Pack", desc: "Complete package for Board decision" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
                <CardDescription>Complete these modules before starting implementation roadmap development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { id: "CD-F1", title: "Readiness Assessment", path: "/foundation/readiness" },
                    { id: "CD-F2", title: "Requirements Mapping", path: "/foundation/requirements" },
                    { id: "CD-F3", title: "Risk & Impact Assessment", path: "/foundation/risk" },
                    { id: "CD-P1", title: "Governance Framework", path: "/governance/framework" },
                    { id: "CD-P2", title: "Policy & Framework Development", path: "/governance/policy" },
                  ].map((prereq) => (
                    <Button
                      key={prereq.id}
                      variant="outline"
                      className="justify-start h-auto py-3"
                      onClick={() => navigate(prereq.path)}
                    >
                      <div className="text-left">
                        <Badge variant="secondary" className="mb-1">{prereq.id}</Badge>
                        <p className="font-medium">{prereq.title}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scope & Coverage */}
            <Card>
              <CardHeader>
                <CardTitle>Scope & Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-700 dark:text-green-400">✓ In Scope (Part 1)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Strategic planning framework</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Phasing and sequencing logic</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Resource estimation and allocation</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Budget development and approval</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Risk assessment and mitigation</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Governance and decision-making</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Critical path analysis</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Dependencies mapping</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-muted-foreground">→ Part 2 Coverage</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Detailed delivery planning</li>
                      <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Workstream-level plans</li>
                      <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Execution monitoring framework</li>
                      <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Change control processes</li>
                      <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Progress reporting mechanisms</li>
                      <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Issue and risk management</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REGULATORY FOUNDATION TAB */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>FCA Expectations for Implementation Planning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA"
                  reference="FG22/5"
                  quote="Firms should develop and implement a clear plan to meet their obligations under the Consumer Duty"
                />

                <div className="bg-primary/5 border-l-4 border-l-primary p-4 rounded-r-lg">
                  <p className="font-medium text-foreground">
                    The FCA expects firms to take a structured, risk-based approach to implementing the Consumer Duty. 
                    This means developing a clear plan, allocating appropriate resources, and ensuring senior management oversight of delivery.
                  </p>
                </div>

                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="systematic">
                    <AccordionTrigger>A. Systematic Approach Required</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Implementation cannot be ad-hoc or reactive. It must be documented, approved, and systematically executed.
                      </p>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">What This Means:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Cannot be ad-hoc or reactive</li>
                          <li>• Must be documented and approved</li>
                          <li>• Should cover all four outcomes</li>
                          <li>• Needs clear milestones</li>
                          <li>• Requires progress monitoring</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="proportionality">
                    <AccordionTrigger>B. Proportionality in Planning</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Planning should be proportionate to firm's size, complexity, and resources.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-2">Large Firms</h4>
                          <p className="text-xs text-muted-foreground">
                            Formal programme management, detailed project plans, extensive governance
                          </p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-2">Medium Firms</h4>
                          <p className="text-xs text-muted-foreground">
                            Structured approach with clear phases, appropriate governance
                          </p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-2">Small Firms</h4>
                          <p className="text-xs text-muted-foreground">
                            Simpler plans but still documented, realistic, and approved
                          </p>
                        </div>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          <strong>All Firms:</strong> Clear accountability, realistic timelines, appropriate resources
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="accountability">
                    <AccordionTrigger>C. Board and SMF Accountability</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Critical Requirement</h4>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          Board must approve implementation plan and SMFs must be accountable for delivery
                        </p>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Board approval is mandatory (not just "noting")</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>SMFs must be named as accountable for specific workstreams</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Progress reporting to Board required</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Board must challenge timelines and resources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                          <span>Failure to deliver on plan is SMF accountability issue</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="prioritisation">
                    <AccordionTrigger>D. Risk-Based Prioritisation</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Focus on areas of highest consumer harm risk first.
                      </p>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Prioritisation Criteria:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {[
                            "Potential for consumer harm (severity and likelihood)",
                            "Vulnerable customer impact",
                            "Scale (number of customers affected)",
                            "Regulatory enforcement risk",
                            "Reputational risk",
                            "Ease/speed of implementation (quick wins)"
                          ].map((criterion, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                {idx + 1}
                              </span>
                              <span>{criterion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="integration">
                    <AccordionTrigger>E. Integration with Existing Change</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Consumer Duty should integrate with, not duplicate, existing programmes.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Leverage existing transformation programmes",
                          "Integrate with TCF, Product Governance, etc.",
                          "Coordinate with technology/digital programmes",
                          "Align with strategic initiatives",
                          "Avoid creating parallel structures"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm p-2 border rounded">
                            <GitBranch className="h-4 w-4 text-primary" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Phasing Framework */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Standard Phasing Framework (4-5 Phases)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    phase: "Phase 1",
                    name: "Foundation & Assessment",
                    weeks: "Weeks 1-8",
                    priority: "Understanding current state and establishing governance",
                    activities: ["Governance structure establishment", "Current state assessment", "Gap analysis", "Risk assessment", "Board engagement", "Resource mobilisation"],
                    csf: ["Executive sponsorship secured", "Accurate gap analysis", "Realistic risk assessment", "Board commitment obtained"]
                  },
                  {
                    phase: "Phase 2",
                    name: "Framework & Policy Development",
                    weeks: "Weeks 6-14",
                    priority: "Creating the methodologies and governance",
                    activities: ["Policy development", "Fair Value Assessment methodology", "Target market definition approach", "Communication testing protocols", "MI framework design", "Template development"],
                    csf: ["Policies aligned to FCA expectations", "Methodologies robust and practical", "Templates ready for use", "MI framework approved"]
                  },
                  {
                    phase: "Phase 3",
                    name: "Operational Implementation",
                    weeks: "Weeks 10-24",
                    priority: "Embedding the four outcomes",
                    activities: ["Product reviews and FVAs", "Communication redesign and testing", "Customer journey enhancement", "Vulnerable customer framework deployment", "Distribution chain arrangements", "Training delivery"],
                    csf: ["Product reviews completed", "Communications tested", "Support enhanced", "Staff trained", "Evidence generated"]
                  },
                  {
                    phase: "Phase 4",
                    name: "Monitoring & Assurance",
                    weeks: "Weeks 20-30",
                    priority: "Proving it works",
                    activities: ["MI dashboard deployment", "Control testing", "Outcomes monitoring", "Board reporting", "Regulatory examination preparation", "Continuous improvement setup"],
                    csf: ["MI operational", "Outcomes evidenced", "Board reporting effective", "Regulatory readiness confirmed"]
                  },
                  {
                    phase: "Phase 5",
                    name: "Maturity & Optimisation",
                    weeks: "Ongoing",
                    priority: "Continuous improvement",
                    activities: ["Annual review", "Maturity progression", "Best practice adoption", "Innovation", "Regulatory horizon scanning"],
                    csf: ["Continuous improvement embedded", "Maturity targets met", "Regulatory changes incorporated"]
                  }
                ].map((phase, idx) => (
                  <Accordion key={idx} type="single" collapsible>
                    <AccordionItem value={phase.phase}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="font-mono">{phase.phase}</Badge>
                          <span className="font-semibold">{phase.name}</span>
                          <Badge variant="secondary">{phase.weeks}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div className="bg-primary/5 p-3 rounded-lg">
                          <p className="text-sm font-medium">Regulatory Priority: {phase.priority}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Key Activities:</h4>
                            <ul className="space-y-1">
                              {phase.activities.map((activity, i) => (
                                <li key={i} className="text-sm flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">Critical Success Factors:</h4>
                            <ul className="space-y-1">
                              {phase.csf.map((factor, i) => (
                                <li key={i} className="text-sm flex items-center gap-2">
                                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                                  {factor}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </CardContent>
            </Card>

            {/* FCA Multi-Firm Review Findings */}
            <Card>
              <CardHeader>
                <CardTitle>FCA Multi-Firm Review Findings on Implementation Planning</CardTitle>
                <CardDescription>November 2025 findings on implementation approaches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Good Practice Identified
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Clear implementation plans with defined phases, milestones, and accountabilities",
                        "Realistic timelines with appropriate buffer for complexity",
                        "Board actively engaged in challenging and approving plans",
                        "Resources committed and allocated, not just 'hoped for'",
                        "Risk-based prioritisation focusing on highest harm areas first",
                        "Integration with existing change programmes to avoid duplication",
                        "Quick wins identified and delivered to build momentum"
                      ].map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Overly ambitious timelines with no contingency",
                        "Lack of Board challenge on resource adequacy",
                        "Plans created but not followed or monitored",
                        "No clear SMF accountability for delivery",
                        "Insufficient consideration of dependencies",
                        "Parallel structures created instead of integrating with BAU",
                        "No mechanism for replanning when issues arise"
                      ].map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Path and Dependencies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  Critical Path and Dependency Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">What is Critical Path?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    The sequence of activities that determines the minimum time needed to complete the programme. 
                    Any delay on the critical path delays the entire programme.
                  </p>
                  <div className="bg-background border rounded-lg p-3">
                    <p className="text-sm font-medium mb-2">Typical Critical Path for Consumer Duty:</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {["Gap Analysis", "Policy Development", "FVA Methodology", "Product Reviews", "FVAs Completed", "Board Reporting", "Regulatory Readiness"].map((item, idx, arr) => (
                        <span key={idx} className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">{idx + 1}. {item}</Badge>
                          {idx < arr.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      type: "Sequential Dependencies",
                      desc: "Must complete X before Y",
                      examples: ["Gap analysis before detailed planning", "Target markets before product reviews", "FVA methodology before assessing value", "MI dashboard before outcomes monitoring"]
                    },
                    {
                      type: "Resource Dependencies",
                      desc: "Same resource needed for multiple tasks",
                      examples: ["Legal team: policy development AND distribution agreements", "Compliance: gap analysis AND control testing", "Product teams: reviews AND ongoing BAU work"]
                    },
                    {
                      type: "Approval Dependencies",
                      desc: "Need sign-off before proceeding",
                      examples: ["Board must approve budget before allocation", "Policy approved before embedding", "FVA methodology validated before rollout"]
                    },
                    {
                      type: "External Dependencies",
                      desc: "Outside firm's direct control",
                      examples: ["Vendor delivery timelines", "Third-party information (distribution)", "Regulatory guidance publication", "Industry standards development"]
                    }
                  ].map((dep, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">{dep.type}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{dep.desc}</p>
                      <ul className="space-y-1">
                        {dep.examples.map((ex, i) => (
                          <li key={i} className="text-xs flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Build in Contingency</h4>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500/20 text-amber-700 border-amber-300">20%</Badge>
                      <span>Critical path activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500/20 text-amber-700 border-amber-300">30%</Badge>
                      <span>High-risk activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500/20 text-amber-700 border-amber-300">40%</Badge>
                      <span>External dependencies</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governance Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Governance and Decision-Making in Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    tier: "Tier 1",
                    name: "Board/Audit Committee",
                    role: "Strategic oversight and approval",
                    frequency: "Quarterly (minimum)",
                    decisions: ["Approve implementation plan and budget", "Approve major changes to plan", "Approve policies and frameworks", "Review progress and risks", "Challenge adequacy of resources"]
                  },
                  {
                    tier: "Tier 2",
                    name: "Executive Committee/Steering Committee",
                    role: "Strategic direction and issue resolution",
                    frequency: "Monthly",
                    decisions: ["Review progress against plan", "Resolve resource conflicts", "Escalate critical issues to Board", "Approve changes within delegated authority", "Review and approve key deliverables"]
                  },
                  {
                    tier: "Tier 3",
                    name: "Programme Board/Oversight Committee",
                    role: "Operational oversight and coordination",
                    frequency: "Weekly/Bi-weekly",
                    decisions: ["Monitor workstream progress", "Manage dependencies", "Allocate resources within budget", "Resolve operational issues", "Track risks and issues (RAID)"]
                  },
                  {
                    tier: "Tier 4",
                    name: "Workstream Teams",
                    role: "Delivery of specific activities",
                    frequency: "Daily stand-ups, weekly reviews",
                    decisions: ["Day-to-day task execution", "Technical decisions within scope", "Escalate blockers and risks", "Create deliverables", "Engage stakeholders"]
                  }
                ].map((tier, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="font-mono">{tier.tier}</Badge>
                      <h4 className="font-semibold">{tier.name}</h4>
                      <Badge variant="secondary">{tier.frequency}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{tier.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.decisions.map((decision, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-normal">{decision}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resource Planning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Resource Planning Principles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="people">
                    <AccordionTrigger>1. People Resources</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Types Needed:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Project management (PMO, Project Lead)</li>
                            <li>• Subject matter experts (compliance, product, risk, legal)</li>
                            <li>• Business analysts</li>
                            <li>• Change management</li>
                            <li>• Training developers</li>
                            <li>• Communications specialists</li>
                            <li>• Data analysts</li>
                            <li>• IT/technology specialists</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Sourcing Options:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Internal redeployment (pros: knowledge, cons: opportunity cost)</li>
                            <li>• Backfill for redeployed staff (pros: maintains BAU, cons: cost)</li>
                            <li>• External consultants (pros: expertise/capacity, cons: cost/knowledge transfer)</li>
                            <li>• Hybrid model (combination of above)</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">Typical Allocation (Medium-Sized Firm):</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div><span className="font-medium">Project Lead:</span> 100%</div>
                          <div><span className="font-medium">Core team:</span> 4-6 @ 50-100%</div>
                          <div><span className="font-medium">SMEs:</span> 10-15 @ 10-30%</div>
                          <div><span className="font-medium">Total FTE:</span> 8-12</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="technology">
                    <AccordionTrigger>2. Technology Resources</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• MI dashboard development</li>
                            <li>• CRM enhancements (vulnerability flagging)</li>
                            <li>• Document management system</li>
                            <li>• Template repository</li>
                            <li>• Testing tools (communication testing)</li>
                            <li>• Project management tools</li>
                            <li>• Survey/feedback tools</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Budget Considerations:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• New tools vs enhancing existing</li>
                            <li>• Build vs buy decisions</li>
                            <li>• Integration requirements</li>
                            <li>• Ongoing licence/maintenance costs</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="financial">
                    <AccordionTrigger>3. Financial Resources</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Budget Categories:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• People costs (salaries, contractors, consultants)</li>
                            <li>• Technology (licences, development, integration)</li>
                            <li>• Training (development, delivery, materials)</li>
                            <li>• Communications (materials, events, campaigns)</li>
                            <li>• External support (legal, consultancy, audit)</li>
                            <li>• Contingency (typically 10-20% of total)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Typical Budget Range:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 border rounded">
                              <span>Small firm (£10-50m revenue)</span>
                              <span className="font-medium">£50K-200K</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Medium firm (£50-500m revenue)</span>
                              <span className="font-medium">£200K-800K</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Large firm (£500m+ revenue)</span>
                              <span className="font-medium">£800K-3m+</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Note: Significant variation based on current maturity, complexity, and approach
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IMPLEMENTATION STEPS TAB */}
          <TabsContent value="steps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Steps - Part 1: Strategic Planning</CardTitle>
                <CardDescription>
                  Complete these steps to develop your strategic implementation plan for Board approval.
                  Part 2 will cover detailed delivery planning and execution monitoring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    <strong>Note:</strong> This is Part 1 focusing on strategic planning. Part 2 will cover detailed delivery planning and execution monitoring.
                  </p>
                </div>

                <Accordion type="multiple" className="w-full space-y-4">
                  {/* Phase 1 */}
                  <AccordionItem value="phase1" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary">Phase 1</Badge>
                        <span className="font-semibold">Strategic Planning Preparation</span>
                        <Badge variant="outline">Week 1</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-6">
                      <ChecklistSection
                        stepNumber={1}
                        title="Step 1: Mobilise Strategic Planning Team"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-1-1", label: "Confirm Programme Sponsor (SMF level)" },
                          { id: "p3-1-2", label: "Appoint Project Lead (Programme Manager)" },
                          { id: "p3-1-3", label: "Identify Finance partner for budget/business case" },
                          { id: "p3-1-4", label: "Identify HR partner for resource planning" },
                          { id: "p3-1-5", label: "Engage PMO for methodology and tools" },
                          { id: "p3-1-6", label: "Confirm Business Unit representatives" },
                          { id: "p3-1-7", label: "Schedule initial planning workshop" }
                        ]}
                      />

                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Team Composition:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li><strong>Programme Sponsor:</strong> Executive-level, SMF accountable for delivery</li>
                          <li><strong>Project Lead:</strong> Full-time, experienced programme manager</li>
                          <li><strong>Finance Partner:</strong> Part-time, budgeting and business case expertise</li>
                          <li><strong>HR Partner:</strong> Part-time, resource planning and org design</li>
                          <li><strong>PMO:</strong> Part-time, methodology, tools, templates</li>
                          <li><strong>Business Reps:</strong> Part-time, operational reality checks</li>
                        </ul>
                      </div>

                      <ChecklistSection
                        stepNumber={2}
                        title="Step 2: Gather Planning Inputs"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-2-1", label: "Collect all outputs from Modules CD-F1, F2, F3 (assessment, requirements, risks)" },
                          { id: "p3-2-2", label: "Review governance framework from CD-P1" },
                          { id: "p3-2-3", label: "Review policies from CD-P2" },
                          { id: "p3-2-4", label: "Confirm Board expectations and constraints (timeline, budget)" },
                          { id: "p3-2-5", label: "Identify any parallel change programmes" },
                          { id: "p3-2-6", label: "Review resource availability (people, budget, technology)" },
                          { id: "p3-2-7", label: "Understand key business cycle constraints (busy periods, system freezes)" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={3}
                        title="Step 3: Define Implementation Strategy"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-3-1", label: "Conduct strategic planning workshop" },
                          { id: "p3-3-2", label: "Determine implementation approach (Big Bang/Phased/Pilot/Hybrid)" },
                          { id: "p3-3-3", label: "Document rationale for chosen approach" },
                          { id: "p3-3-4", label: "Define high-level timeline with phase completion targets" },
                          { id: "p3-3-5", label: "Establish accountability model (Sponsor, Lead, Workstream Leads)" },
                          { id: "p3-3-6", label: "Complete Implementation Strategy Document" }
                        ]}
                      />

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Strategic Questions to Answer:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-primary">WHAT is our implementation approach?</p>
                            <ul className="text-muted-foreground mt-1 space-y-1">
                              <li>• "Big Bang" (all at once)</li>
                              <li>• Phased (by outcome)</li>
                              <li>• Pilot then Rollout</li>
                              <li>• Hybrid approach</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-primary">WHY this approach?</p>
                            <ul className="text-muted-foreground mt-1 space-y-1">
                              <li>• Risk tolerance</li>
                              <li>• Resource availability</li>
                              <li>• Regulatory pressure</li>
                              <li>• Current maturity</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Phase 2 */}
                  <AccordionItem value="phase2" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary">Phase 2</Badge>
                        <span className="font-semibold">Phasing and Sequencing</span>
                        <Badge variant="outline">Weeks 1-2</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-6">
                      <ChecklistSection
                        stepNumber={4}
                        title="Step 4: Design Phase Structure"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-4-1", label: "Define Phase 1: Foundation & Assessment (objectives, deliverables, resources)" },
                          { id: "p3-4-2", label: "Define Phase 2: Framework Development (objectives, deliverables, resources)" },
                          { id: "p3-4-3", label: "Define Phase 3: Operational Implementation (objectives, deliverables, resources)" },
                          { id: "p3-4-4", label: "Define Phase 4: Monitoring & Assurance (objectives, deliverables, resources)" },
                          { id: "p3-4-5", label: "Define Phase 5: Maturity & Optimisation (ongoing activities)" },
                          { id: "p3-4-6", label: "Document success criteria for each phase" },
                          { id: "p3-4-7", label: "Identify risks and mitigations for each phase" }
                        ]}
                      />

                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">For Each Phase, Define:</h4>
                        <div className="grid md:grid-cols-3 gap-3 text-sm">
                          <div className="space-y-1">
                            <p className="font-medium">Structure</p>
                            <ul className="text-muted-foreground text-xs">
                              <li>• Duration (weeks/months)</li>
                              <li>• Start and end dates</li>
                              <li>• Primary objectives</li>
                            </ul>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Content</p>
                            <ul className="text-muted-foreground text-xs">
                              <li>• Workstreams included</li>
                              <li>• Key deliverables</li>
                              <li>• Success criteria</li>
                            </ul>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Requirements</p>
                            <ul className="text-muted-foreground text-xs">
                              <li>• Resources (FTE, budget)</li>
                              <li>• Dependencies</li>
                              <li>• Risks and mitigations</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <ChecklistSection
                        stepNumber={5}
                        title="Step 5: Map Dependencies and Critical Path"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-5-1", label: "Identify all dependencies for each major deliverable" },
                          { id: "p3-5-2", label: "Create dependency map (visual diagram)" },
                          { id: "p3-5-3", label: "Calculate critical path (longest sequence of dependent activities)" },
                          { id: "p3-5-4", label: "Identify activities with zero float (cannot be delayed)" },
                          { id: "p3-5-5", label: "Flag critical path activities for priority management" },
                          { id: "p3-5-6", label: "Build in contingency (20-40% depending on risk)" },
                          { id: "p3-5-7", label: "Document resource constraints and approval gates" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={6}
                        title="Step 6: Identify Quick Wins"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-6-1", label: "Brainstorm potential quick wins (deliverable in <8 weeks)" },
                          { id: "p3-6-2", label: "Assess quick wins against selection criteria" },
                          { id: "p3-6-3", label: "Prioritise quick wins by impact and visibility" },
                          { id: "p3-6-4", label: "Assign owners and target dates" },
                          { id: "p3-6-5", label: "Complete Quick Wins Register" }
                        ]}
                      />

                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Quick Win Selection Criteria:</h4>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700 dark:text-green-300">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Delivers tangible customer benefit</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Visible to Board/senior management</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Achievable within 6-8 weeks</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Doesn't require complex approvals</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Generates evidence for compliance</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Builds staff engagement</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Phase 3 */}
                  <AccordionItem value="phase3" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary">Phase 3</Badge>
                        <span className="font-semibold">Resource Planning & Budget</span>
                        <Badge variant="outline">Weeks 2-3</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-6">
                      <ChecklistSection
                        stepNumber={7}
                        title="Step 7: Estimate Resource Requirements"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-7-1", label: "Estimate people resources for each workstream/phase" },
                          { id: "p3-7-2", label: "Calculate total FTE requirement across programme" },
                          { id: "p3-7-3", label: "Identify technology requirements and costs" },
                          { id: "p3-7-4", label: "Assess external support needs (legal, consultancy, audit)" },
                          { id: "p3-7-5", label: "Determine sourcing approach (internal, backfill, external)" },
                          { id: "p3-7-6", label: "Complete Resource Requirements Summary" }
                        ]}
                      />

                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Resource Calculation Example:</h4>
                        <div className="text-sm space-y-2">
                          <p className="font-medium">Workstream: Fair Value Assessments (CD-I2)</p>
                          <p className="text-muted-foreground">Activities: Develop methodology, review 50 products, conduct FVAs</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                            <div className="p-2 border rounded text-center">
                              <p className="text-xs text-muted-foreground">Project Lead</p>
                              <p className="font-medium">20% x 16 weeks</p>
                            </div>
                            <div className="p-2 border rounded text-center">
                              <p className="text-xs text-muted-foreground">Product Manager</p>
                              <p className="font-medium">50% x 16 weeks</p>
                            </div>
                            <div className="p-2 border rounded text-center">
                              <p className="text-xs text-muted-foreground">Compliance SME</p>
                              <p className="font-medium">30% x 16 weeks</p>
                            </div>
                            <div className="p-2 border rounded text-center">
                              <p className="text-xs text-muted-foreground">Total</p>
                              <p className="font-medium">28.4 weeks FTE</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ChecklistSection
                        stepNumber={8}
                        title="Step 8: Build Business Case and Budget"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-8-1", label: "Draft Executive Summary (1 page)" },
                          { id: "p3-8-2", label: "Document Strategic Context (regulatory requirement, consequences)" },
                          { id: "p3-8-3", label: "Summarise Implementation Approach (phasing, resources, governance)" },
                          { id: "p3-8-4", label: "Calculate People Costs (internal + external)" },
                          { id: "p3-8-5", label: "Calculate Technology Costs (build/buy, integration, licences)" },
                          { id: "p3-8-6", label: "Calculate Training & Communications Costs" },
                          { id: "p3-8-7", label: "Calculate External Support Costs (legal, consultancy)" },
                          { id: "p3-8-8", label: "Add Contingency (15% of total)" },
                          { id: "p3-8-9", label: "Document quantified and qualitative benefits" },
                          { id: "p3-8-10", label: "Document risks and mitigation strategies" },
                          { id: "p3-8-11", label: "Complete Business Case document" }
                        ]}
                      />

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Business Case Budget Structure:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-2 border rounded">
                            <span>1. People Costs</span>
                            <span className="text-muted-foreground">Salaries, contractors, consultants</span>
                          </div>
                          <div className="flex justify-between p-2 border rounded">
                            <span>2. Technology Costs</span>
                            <span className="text-muted-foreground">Development, licences, integration</span>
                          </div>
                          <div className="flex justify-between p-2 border rounded">
                            <span>3. Training & Communications</span>
                            <span className="text-muted-foreground">Development, delivery, materials</span>
                          </div>
                          <div className="flex justify-between p-2 border rounded">
                            <span>4. External Support</span>
                            <span className="text-muted-foreground">Legal, consultancy, audit</span>
                          </div>
                          <div className="flex justify-between p-2 border rounded bg-amber-50 dark:bg-amber-950/20">
                            <span>5. Contingency</span>
                            <span className="text-muted-foreground">15% of above</span>
                          </div>
                        </div>
                      </div>

                      <ChecklistSection
                        stepNumber={9}
                        title="Step 9: Develop High-Level Timeline (Gantt Chart)"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-9-1", label: "Create visual timeline showing phases, workstreams, milestones" },
                          { id: "p3-9-2", label: "Show dependencies as arrows between activities" },
                          { id: "p3-9-3", label: "Highlight critical path in red" },
                          { id: "p3-9-4", label: "Mark governance touchpoints (Board reviews, approvals)" },
                          { id: "p3-9-5", label: "Include all key milestones (15-20 major milestones)" },
                          { id: "p3-9-6", label: "Flag resource conflicts and constraints" },
                          { id: "p3-9-7", label: "Highlight quick wins in green" },
                          { id: "p3-9-8", label: "Validate timeline with workstream leads" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Phase 4 */}
                  <AccordionItem value="phase4" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary">Phase 4</Badge>
                        <span className="font-semibold">Board Approval Pack</span>
                        <Badge variant="outline">Weeks 3-4</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-6">
                      <ChecklistSection
                        stepNumber={10}
                        title="Step 10: Prepare Board Approval Pack"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-10-1", label: "Compile all deliverables into cohesive pack" },
                          { id: "p3-10-2", label: "Write Executive Summary (2-3 pages)" },
                          { id: "p3-10-3", label: "Prepare Board presentation slides" },
                          { id: "p3-10-4", label: "Include clear recommendation for approval" },
                          { id: "p3-10-5", label: "Prepare FAQ and anticipated questions" },
                          { id: "p3-10-6", label: "Submit to Board Secretary for agenda" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={11}
                        title="Step 11: Conduct Board Presentation and Approval"
                        moduleId="cd-p3-part1"
                        items={[
                          { id: "p3-11-1", label: "Present implementation plan to Board" },
                          { id: "p3-11-2", label: "Address Board questions and concerns" },
                          { id: "p3-11-3", label: "Document Board feedback and required changes" },
                          { id: "p3-11-4", label: "Incorporate any amendments required" },
                          { id: "p3-11-5", label: "Obtain formal Board approval (minuted)" },
                          { id: "p3-11-6", label: "Communicate approval to organisation" }
                        ]}
                      />

                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Board Approval Checklist:</h4>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-red-700 dark:text-red-300">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Implementation strategy approved</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Budget allocation confirmed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Resource commitment agreed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Timeline endorsed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Risk appetite confirmed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Governance structure approved</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TEMPLATES & TOOLS TAB */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates & Tools</CardTitle>
                <CardDescription>
                  Downloadable templates and tools to support strategic implementation planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="Implementation Strategy Document"
                    description="6-8 page document covering What/Why/When/Who framework for Consumer Duty implementation"
                    format="Word"
                  />
                  <TemplateCard
                    title="Phase Structure Template"
                    description="Template for defining each implementation phase with objectives, deliverables, resources, and success criteria"
                    format="Word"
                  />
                  <TemplateCard
                    title="Dependency Map Template"
                    description="Visual template for mapping dependencies between activities with critical path highlighting"
                    format="PowerPoint"
                  />
                  <TemplateCard
                    title="Quick Wins Register"
                    description="Tracker for identifying, prioritising, and monitoring quick win initiatives"
                    format="Excel"
                  />
                  <TemplateCard
                    title="Resource Requirements Calculator"
                    description="Spreadsheet for calculating FTE requirements by workstream and phase"
                    format="Excel"
                  />
                  <TemplateCard
                    title="Business Case Template"
                    description="10-12 page template covering investment, benefits, risks, and recommendation for Board approval"
                    format="Word"
                  />
                  <TemplateCard
                    title="Budget Breakdown Template"
                    description="Detailed budget template with categories for people, technology, training, external support, and contingency"
                    format="Excel"
                  />
                  <TemplateCard
                    title="High-Level Gantt Chart"
                    description="Gantt chart template showing phases, milestones, dependencies, and critical path"
                    format="Excel"
                  />
                  <TemplateCard
                    title="Governance Structure Template"
                    description="Template for defining 4-tier governance structure with roles, responsibilities, and decision authority"
                    format="PowerPoint"
                  />
                  <TemplateCard
                    title="Board Approval Pack Template"
                    description="Complete template pack including executive summary, presentation slides, and recommendation"
                    format="PowerPoint"
                  />
                  <TemplateCard
                    title="Risk Register Template"
                    description="Template for programme risks with assessment, mitigation, and monitoring"
                    format="Excel"
                  />
                  <TemplateCard
                    title="RACI Matrix Template"
                    description="Template for documenting Responsible, Accountable, Consulted, Informed for all activities"
                    format="Excel"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUCCESS CRITERIA TAB */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Criteria - Part 1</CardTitle>
                <CardDescription>
                  Key criteria to confirm successful completion of strategic planning phase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Strategic Planning
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Board-approved implementation plan",
                        "Realistic, achievable timelines",
                        "Resources committed and allocated",
                        "Budget approved",
                        "Clear accountability (RACI)"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-primary" />
                      Planning Quality
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Risk mitigation plans in place",
                        "Dependencies mapped",
                        "Critical path identified",
                        "Quick wins identified",
                        "Integration with BAU planned"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      Governance
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Programme Sponsor confirmed (SMF)",
                        "Project Lead appointed",
                        "Governance structure defined (4 tiers)",
                        "Reporting cadence established",
                        "Decision authority matrix approved"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Documentation
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Implementation Strategy Document complete",
                        "Business Case approved",
                        "Gantt chart created and validated",
                        "Board pack prepared and approved",
                        "Communication to organisation delivered"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Timeline Summary</h4>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 border rounded-lg">
                      <p className="font-medium">Week 1</p>
                      <p className="text-muted-foreground">Mobilisation & Strategy</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="font-medium">Weeks 1-2</p>
                      <p className="text-muted-foreground">Phasing & Dependencies</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="font-medium">Weeks 2-3</p>
                      <p className="text-muted-foreground">Resource & Budget</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="font-medium">Weeks 3-4</p>
                      <p className="text-muted-foreground">Board Approval</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMMON PITFALLS TAB */}
          <TabsContent value="pitfalls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Pitfalls</CardTitle>
                <CardDescription>
                  Avoid these common mistakes in implementation roadmap development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PitfallCard
                  title="Pitfall 1: Overly Ambitious Timelines"
                  description="Setting unrealistic deadlines without considering complexity, dependencies, or resource constraints"
                  impact="Inevitable delays, loss of credibility, team burnout, quality compromises"
                  prevention="Add 20-40% contingency, validate with workstream leads, build in buffer for dependencies"
                />

                <PitfallCard
                  title="Pitfall 2: Insufficient Resource Commitment"
                  description="Planning assumes resources will be available without formal commitment or backfill arrangements"
                  impact="Key staff pulled to BAU, delays, quality issues, programme failure"
                  prevention="Get written resource commitments, plan backfill, identify backup resources"
                />

                <PitfallCard
                  title="Pitfall 3: Ignoring Dependencies"
                  description="Planning activities in isolation without mapping sequential and resource dependencies"
                  impact="Bottlenecks, delays, rework, critical path extensions"
                  prevention="Map all dependencies before finalising timeline, identify critical path"
                />

                <PitfallCard
                  title="Pitfall 4: No Board Challenge"
                  description="Board rubber-stamps plan without challenging timelines, resources, or approach"
                  impact="Inadequate resources, unrealistic expectations, accountability gaps"
                  prevention="Present options and trade-offs, invite Board challenge, document Board discussion"
                />

                <PitfallCard
                  title="Pitfall 5: Planning in Isolation"
                  description="Plan created by compliance/project team without business unit input"
                  impact="Unrealistic assumptions, lack of buy-in, implementation resistance"
                  prevention="Involve business units in planning, validate assumptions, get sign-off from owners"
                />

                <PitfallCard
                  title="Pitfall 6: Ignoring Existing Change Programmes"
                  description="Creating parallel Consumer Duty programme instead of integrating with existing change"
                  impact="Duplication, resource conflicts, change fatigue, coordination failures"
                  prevention="Map existing programmes, identify integration points, coordinate governance"
                />

                <PitfallCard
                  title="Pitfall 7: No Quick Wins"
                  description="Focusing only on long-term deliverables with no early visible progress"
                  impact="Loss of momentum, stakeholder fatigue, difficulty maintaining engagement"
                  prevention="Identify and prioritise quick wins, celebrate early successes, build credibility"
                />

                <PitfallCard
                  title="Pitfall 8: Underestimating Technology Dependencies"
                  description="Assuming technology changes can be delivered quickly without proper assessment"
                  impact="Technology delays impact entire programme, workarounds create risk"
                  prevention="Engage technology early, assess lead times realistically, plan for manual workarounds"
                />

                <PitfallCard
                  title="Pitfall 9: No Contingency or Replanning Mechanism"
                  description="Plan has no buffer for delays and no process for adjusting when issues arise"
                  impact="No flexibility, plan becomes obsolete, loss of control"
                  prevention="Build in 15-20% contingency, establish change control process, regular plan reviews"
                />

                <PitfallCard
                  title="Pitfall 10: Unclear Accountability"
                  description="Plan doesn't specify who is accountable for each workstream and deliverable"
                  impact="No ownership, things fall through cracks, blame culture"
                  prevention="Use RACI matrix, name individuals (not roles), SMF sign-off on accountability"
                />
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm mb-4">
                    This completes Part 1 of Implementation Roadmap Development, establishing the strategic planning framework 
                    and Board approval. Part 2 will cover detailed delivery planning, workstream-level plans, execution monitoring, 
                    and change control processes.
                  </p>
                  <Button onClick={() => navigate("/governance/roadmap-part2")} disabled>
                    Continue to Part 2: Detailed Delivery Planning
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Part 2 coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
