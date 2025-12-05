import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { 
  ArrowLeft, 
  Target, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Calendar,
  TrendingUp,
  Shield,
  Settings,
  BarChart3,
  MessageSquare,
  RefreshCw,
  Layers,
  GitBranch,
  ClipboardList
} from "lucide-react";

export default function CDP3ImplementationRoadmapPart2() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="text-xs">Planning Module</Badge>
                <Badge className="bg-accent text-accent-foreground text-xs">Part 2 of 2</Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                CD-P3: Implementation Roadmap Development
              </h1>
              <p className="text-lg text-muted-foreground">
                Part 2: Delivery Planning & Monitoring
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-lg font-semibold text-foreground">2-3 Weeks</p>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
            <TabsTrigger value="implementation">Implementation Steps</TabsTrigger>
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
                  Purpose & Scope
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-lg mb-3">Delivery Planning & Monitoring Phase</h3>
                  <p className="text-muted-foreground">
                    Transform Board-approved strategic plans into detailed delivery programmes with robust 
                    risk management, execution monitoring, change control, and programme governance. This 
                    phase ensures the implementation programme delivers on its objectives with appropriate 
                    oversight and adaptability.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Part 2 Scope
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Implementation risk assessment and mitigation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Detailed work package planning
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Programme governance establishment
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Board approval and communication
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Programme kick-off and infrastructure
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Progress monitoring and reporting
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Change control processes
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        Risk Register with Mitigation Plans
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        Detailed Work Package Plans
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        RACI Matrix for Delivery
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        Board Approval Pack
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        Programme Reporting Framework
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        Change Control Procedures
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        Communications Plan
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    Timeline Integration
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Part 2 covers Weeks 3-5 of the planning phase. Combined with Part 1, the complete 
                    implementation roadmap development takes 5-7 weeks. Programme execution follows 
                    immediately after kick-off.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Core Team</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">4-6</p>
                      <p className="text-xs text-muted-foreground">People dedicated</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ClipboardList className="h-4 w-4 text-accent" />
                        <span className="font-medium text-sm">Implementation Steps</span>
                      </div>
                      <p className="text-2xl font-bold text-accent">13</p>
                      <p className="text-xs text-muted-foreground">Detailed activities</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-sm">Templates</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-xs text-muted-foreground">Ready to use</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
                <CardDescription>Complete these before starting Part 2</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">CD-P3 Part 1 Complete</p>
                      <p className="text-xs text-muted-foreground">Strategic planning phase</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Implementation Strategy Approved</p>
                      <p className="text-xs text-muted-foreground">Phasing framework defined</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Resource Estimates Complete</p>
                      <p className="text-xs text-muted-foreground">People, budget, technology</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">High-Level Timeline Drafted</p>
                      <p className="text-xs text-muted-foreground">Phases and milestones defined</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Risk Management in Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  quote="Firms should identify, assess and manage the risks arising from implementation, including resource constraints, timeline pressures, and quality risks. Effective risk management is essential to successful delivery."
                  source="FCA"
                  reference="FG22/5"
                />

                <div className="space-y-4">
                  <h4 className="font-semibold">Implementation Risk Categories</h4>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="resource-risks">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-red-500" />
                          Resource Risks
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Insufficient people with required skills</li>
                          <li>• Key resource unavailability (sickness, attrition)</li>
                          <li>• Competing priorities for shared resources</li>
                          <li>• Budget constraints or cuts</li>
                          <li>• Technology delivery delays</li>
                        </ul>
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg mt-3">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">Typical Mitigations:</p>
                          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            <li>✓ Secure resource commitments in advance</li>
                            <li>✓ Build contingency pool</li>
                            <li>✓ Use external contractors for critical skills</li>
                            <li>✓ Stagger activities to smooth resource demand</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="timeline-risks">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          Timeline Risks
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Optimistic estimates without contingency</li>
                          <li>• Unforeseen dependencies discovered</li>
                          <li>• Approval delays from governance bodies</li>
                          <li>• External dependencies (vendors, regulators)</li>
                          <li>• Scope creep or changing requirements</li>
                        </ul>
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg mt-3">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">Typical Mitigations:</p>
                          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            <li>✓ Add 20-40% contingency to critical path</li>
                            <li>✓ Identify dependencies early</li>
                            <li>✓ Pre-brief governance bodies to expedite approvals</li>
                            <li>✓ Strict change control process</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="quality-risks">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                          Quality Risks
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Deliverables don't meet regulatory standards</li>
                          <li>• Insufficient FCA guidance leads to wrong interpretation</li>
                          <li>• Templates/tools not usable in practice</li>
                          <li>• Training doesn't change behaviour</li>
                          <li>• Evidence gaps discovered during Board review</li>
                        </ul>
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg mt-3">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">Typical Mitigations:</p>
                          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            <li>✓ External expert review of key deliverables</li>
                            <li>✓ Engage industry peers for benchmarking</li>
                            <li>✓ Pilot deliverables with users before rollout</li>
                            <li>✓ Build in quality assurance gates</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="stakeholder-risks">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-purple-500" />
                          Stakeholder Risks
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Board not engaged or challenging adequately</li>
                          <li>• Business units resist change</li>
                          <li>• Staff don't understand importance</li>
                          <li>• Customers negatively impacted during changes</li>
                          <li>• Third parties in distribution chain don't cooperate</li>
                        </ul>
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg mt-3">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">Typical Mitigations:</p>
                          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            <li>✓ Regular Board engagement and education</li>
                            <li>✓ Business unit involvement from start</li>
                            <li>✓ Strong change management and communications</li>
                            <li>✓ Customer testing and phased rollout</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="regulatory-risks">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Regulatory Risks
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• FCA expectations evolve during implementation</li>
                          <li>• Multi-firm review findings require changes mid-stream</li>
                          <li>• Enforcement action in sector creates new precedent</li>
                          <li>• Regulatory examination during implementation</li>
                          <li>• Supervisor's interpretation differs from plan</li>
                        </ul>
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg mt-3">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">Typical Mitigations:</p>
                          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            <li>✓ Monitor regulatory developments continuously</li>
                            <li>✓ Engage with trade bodies and peers</li>
                            <li>✓ Document decision rationale contemporaneously</li>
                            <li>✓ Build flexibility into plans</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Programme Governance Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  quote="Boards must approve implementation plans and SMFs must be accountable for delivery. Progress reporting to Board is required, with Board actively challenging timelines and resources."
                  source="FCA"
                  reference="PRIN 2A"
                />

                <div className="space-y-4">
                  <h4 className="font-semibold">Governance Structure for Implementation</h4>
                  
                  <div className="grid gap-4">
                    <div className="p-4 border rounded-lg bg-primary/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary">Tier 1</Badge>
                        <span className="font-semibold">Board/Audit Committee</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Role: Strategic oversight and approval</p>
                      <p className="text-sm text-muted-foreground mb-2">Frequency: Quarterly (minimum)</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Approve implementation plan and budget</li>
                        <li>• Approve major changes to plan</li>
                        <li>• Review progress and risks</li>
                        <li>• Challenge adequacy of resources</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg bg-accent/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">Tier 2</Badge>
                        <span className="font-semibold">Executive Committee/Steering Committee</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Role: Strategic direction and issue resolution</p>
                      <p className="text-sm text-muted-foreground mb-2">Frequency: Monthly</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Review progress against plan</li>
                        <li>• Resolve resource conflicts</li>
                        <li>• Escalate critical issues to Board</li>
                        <li>• Approve changes within delegated authority</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Tier 3</Badge>
                        <span className="font-semibold">Programme Board/Oversight Committee</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Role: Operational oversight and coordination</p>
                      <p className="text-sm text-muted-foreground mb-2">Frequency: Weekly/Bi-weekly</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Monitor workstream progress</li>
                        <li>• Manage dependencies</li>
                        <li>• Allocate resources within agreed budget</li>
                        <li>• Track risks and issues (RAID)</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Tier 4</Badge>
                        <span className="font-semibold">Workstream Teams</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Role: Delivery of specific activities</p>
                      <p className="text-sm text-muted-foreground mb-2">Frequency: Daily stand-ups, weekly reviews</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Day-to-day task execution</li>
                        <li>• Technical decisions within scope</li>
                        <li>• Escalate blockers and risks</li>
                        <li>• Create deliverables</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  FCA Good Practice in Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">Good Practice Identified</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Clear implementation plans with defined phases, milestones, and accountabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Realistic timelines with appropriate buffer for complexity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Board actively engaged in challenging and approving plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Resources committed and allocated, not just "hoped for"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Risk-based prioritisation focusing on highest harm areas first</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Quick wins identified and delivered to build momentum</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Areas for Improvement</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                        <span>Overly ambitious timelines with no contingency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                        <span>Lack of Board challenge on resource adequacy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                        <span>Plans created but not followed or monitored</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                        <span>No clear SMF accountability for delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                        <span>Insufficient consideration of dependencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                        <span>No mechanism for replanning when issues arise</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Steps (Part 2)</CardTitle>
                <CardDescription>
                  Delivery planning, governance, and monitoring activities (Weeks 3-5)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {/* Phase 4: Risk Assessment */}
                  <AccordionItem value="phase-4" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <Shield className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">Phase 4: Risk Assessment & Mitigation</p>
                          <p className="text-sm text-muted-foreground">Week 3</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-6">
                      <ChecklistSection
                        stepNumber={10}
                        title="Step 10: Conduct Implementation Risk Assessment"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "10-1", label: "Assess resource risks (skills, availability, budget)" },
                          { id: "10-2", label: "Assess timeline risks (estimates, dependencies, approvals)" },
                          { id: "10-3", label: "Assess quality risks (standards, guidance, usability)" },
                          { id: "10-4", label: "Assess stakeholder risks (Board, business units, customers)" },
                          { id: "10-5", label: "Assess regulatory risks (evolving expectations, enforcement)" },
                          { id: "10-6", label: "Rate likelihood and impact for each risk" },
                          { id: "10-7", label: "Identify current mitigations in place" },
                          { id: "10-8", label: "Calculate residual risk levels" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={11}
                        title="Step 11: Create Risk Register and Mitigation Plans"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "11-1", label: "Document each risk with ID, category, description" },
                          { id: "11-2", label: "Record cause and effect for each risk" },
                          { id: "11-3", label: "Complete pre-mitigation assessment (L×I scoring)" },
                          { id: "11-4", label: "Define prevention and contingency actions" },
                          { id: "11-5", label: "Assign risk owners with target dates" },
                          { id: "11-6", label: "Complete post-mitigation assessment" },
                          { id: "11-7", label: "Set review schedule for each risk" },
                          { id: "11-8", label: "Create risk dashboard with RAG ratings" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={12}
                        title="Step 12: Develop Contingency Plans"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "12-1", label: "Identify top 5-10 risks requiring detailed contingency" },
                          { id: "12-2", label: "Define immediate actions (within 24 hours)" },
                          { id: "12-3", label: "Define short-term actions (within 1 week)" },
                          { id: "12-4", label: "Define medium-term actions (within 1 month)" },
                          { id: "12-5", label: "Identify trigger points and early warning indicators" },
                          { id: "12-6", label: "Document contingency resources available" },
                          { id: "12-7", label: "Define communication approach if risk materialises" },
                          { id: "12-8", label: "Pre-identify external support options" }
                        ]}
                      />

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Example Contingency Plan Structure:</h5>
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p><strong>IF</strong> Key Project Lead becomes unavailable mid-programme,</p>
                          <p><strong>THEN</strong> we will:</p>
                          <ul className="ml-4 space-y-1">
                            <li>1. Within 24 hours: Deputy Lead assumes role, Programme Sponsor notified</li>
                            <li>2. Within 1 week: Interim replacement identified from PMO or external market</li>
                            <li>3. Within 1 month: Permanent replacement recruited and onboarded</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Phase 5: Detailed Delivery Planning */}
                  <AccordionItem value="phase-5" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Layers className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">Phase 5: Detailed Delivery Planning</p>
                          <p className="text-sm text-muted-foreground">Week 3-4</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-6">
                      <ChecklistSection
                        stepNumber={13}
                        title="Step 13: Break Down into Detailed Work Packages"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "13-1", label: "Define work packages for each workstream/phase" },
                          { id: "13-2", label: "Assign Work Package ID, Name, Owner for each" },
                          { id: "13-3", label: "Set start and end dates with dependencies" },
                          { id: "13-4", label: "Decompose work packages into tasks" },
                          { id: "13-5", label: "Estimate effort (optimistic/likely/pessimistic)" },
                          { id: "13-6", label: "Assign resources to each task" },
                          { id: "13-7", label: "Confirm resource availability" },
                          { id: "13-8", label: "Identify deliverables with quality criteria" }
                        ]}
                      />

                      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h5 className="font-medium mb-2">Three-Point Estimation Formula:</h5>
                        <p className="text-sm text-muted-foreground">
                          Expected Estimate = (Optimistic + 4×Most Likely + Pessimistic) / 6
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          This provides a weighted average that accounts for uncertainty and produces more realistic estimates.
                        </p>
                      </div>

                      <ChecklistSection
                        stepNumber={14}
                        title="Step 14: Create Detailed Project Plan"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "14-1", label: "Consolidate all work packages into master plan" },
                          { id: "14-2", label: "Create Level 1: Programme overview" },
                          { id: "14-3", label: "Create Level 2: Phase structure" },
                          { id: "14-4", label: "Create Level 3: Workstream details" },
                          { id: "14-5", label: "Create Level 4: Work package breakdown" },
                          { id: "14-6", label: "Create Level 5: Task-level details" },
                          { id: "14-7", label: "Build Gantt chart view with dependencies" },
                          { id: "14-8", label: "Create resource and budget views" },
                          { id: "14-9", label: "Validate critical path identification" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={15}
                        title="Step 15: Develop RACI Matrix for Delivery"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "15-1", label: "List all major deliverables and decisions" },
                          { id: "15-2", label: "Identify all stakeholder roles" },
                          { id: "15-3", label: "Assign R (Responsible) for each deliverable" },
                          { id: "15-4", label: "Assign exactly ONE A (Accountable) per deliverable" },
                          { id: "15-5", label: "Identify C (Consulted) stakeholders" },
                          { id: "15-6", label: "Identify I (Informed) stakeholders" },
                          { id: "15-7", label: "Validate with all named individuals" },
                          { id: "15-8", label: "Publish and communicate RACI matrix" }
                        ]}
                      />

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border rounded-lg">
                          <thead className="bg-muted">
                            <tr>
                              <th className="p-2 text-left border-b">Deliverable</th>
                              <th className="p-2 text-center border-b">Sponsor</th>
                              <th className="p-2 text-center border-b">Project Lead</th>
                              <th className="p-2 text-center border-b">Compliance</th>
                              <th className="p-2 text-center border-b">Product</th>
                              <th className="p-2 text-center border-b">Board</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 border-b">Implementation Plan</td>
                              <td className="p-2 text-center border-b font-bold text-primary">A</td>
                              <td className="p-2 text-center border-b font-bold text-blue-600">R</td>
                              <td className="p-2 text-center border-b text-muted-foreground">C</td>
                              <td className="p-2 text-center border-b text-muted-foreground">C</td>
                              <td className="p-2 text-center border-b text-muted-foreground">I</td>
                            </tr>
                            <tr>
                              <td className="p-2 border-b">Budget Approval</td>
                              <td className="p-2 text-center border-b text-muted-foreground">I</td>
                              <td className="p-2 text-center border-b font-bold text-blue-600">R</td>
                              <td className="p-2 text-center border-b text-muted-foreground">I</td>
                              <td className="p-2 text-center border-b text-muted-foreground">I</td>
                              <td className="p-2 text-center border-b font-bold text-primary">A</td>
                            </tr>
                            <tr>
                              <td className="p-2 border-b">FVA Methodology</td>
                              <td className="p-2 text-center border-b text-muted-foreground">I</td>
                              <td className="p-2 text-center border-b font-bold text-primary">A</td>
                              <td className="p-2 text-center border-b text-muted-foreground">C</td>
                              <td className="p-2 text-center border-b font-bold text-blue-600">R</td>
                              <td className="p-2 text-center border-b text-muted-foreground">I</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Phase 6: Governance & Approval */}
                  <AccordionItem value="phase-6" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">Phase 6: Governance & Approval</p>
                          <p className="text-sm text-muted-foreground">Week 4</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-6">
                      <ChecklistSection
                        stepNumber={16}
                        title="Step 16: Prepare Board Approval Pack"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "16-1", label: "Draft Executive Summary (2 pages)" },
                          { id: "16-2", label: "Draft Strategic Context section (3 pages)" },
                          { id: "16-3", label: "Draft Implementation Approach section (5 pages)" },
                          { id: "16-4", label: "Draft Business Case section (4 pages)" },
                          { id: "16-5", label: "Draft Resource Plan section (3 pages)" },
                          { id: "16-6", label: "Draft Risk Assessment section (3 pages)" },
                          { id: "16-7", label: "Draft Deliverables & Milestones section (4 pages)" },
                          { id: "16-8", label: "Draft Governance & Reporting section (2 pages)" },
                          { id: "16-9", label: "Draft Recommendations & Approvals section" },
                          { id: "16-10", label: "Compile Appendices (detailed Gantt, RACI, etc.)" },
                          { id: "16-11", label: "Quality review of complete pack" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={17}
                        title="Step 17: Conduct Board Approval Meeting"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "17-1", label: "Send pre-read materials 1 week before" },
                          { id: "17-2", label: "Conduct one-on-one briefings with key Board members" },
                          { id: "17-3", label: "Prepare FAQ document anticipating questions" },
                          { id: "17-4", label: "Prepare suggested responses to common questions" },
                          { id: "17-5", label: "Present strategic context (10 mins)" },
                          { id: "17-6", label: "Present implementation approach (15 mins)" },
                          { id: "17-7", label: "Present business case (10 mins)" },
                          { id: "17-8", label: "Present risk management (10 mins)" },
                          { id: "17-9", label: "Facilitate Board discussion (20-30 mins)" },
                          { id: "17-10", label: "Obtain formal approval (plan, budget, resources)" },
                          { id: "17-11", label: "Document Board direction and any conditions" }
                        ]}
                      />

                      <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                        <h5 className="font-medium mb-2">Anticipated Board Questions:</h5>
                        <ul className="text-sm space-y-2">
                          <li><strong>Q:</strong> "Is the timeline realistic?"</li>
                          <li className="ml-4 text-muted-foreground"><strong>A:</strong> "We've built in 20% contingency on critical path, benchmarked against peer firms..."</li>
                          <li><strong>Q:</strong> "What if we don't have the resources?"</li>
                          <li className="ml-4 text-muted-foreground"><strong>A:</strong> "We've assessed resource availability and included external support where needed..."</li>
                          <li><strong>Q:</strong> "How will you keep Board informed?"</li>
                          <li className="ml-4 text-muted-foreground"><strong>A:</strong> "Quarterly Board reports on progress, monthly ExCo oversight, immediate escalation..."</li>
                        </ul>
                      </div>

                      <ChecklistSection
                        stepNumber={18}
                        title="Step 18: Communicate Plan to Organisation"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "18-1", label: "Send email to ExCo within 24 hours of approval" },
                          { id: "18-2", label: "Send email to Programme Team confirming kick-off" },
                          { id: "18-3", label: "Update SMFs on accountability confirmation" },
                          { id: "18-4", label: "Draft all-staff communication" },
                          { id: "18-5", label: "Create Consumer Duty intranet page" },
                          { id: "18-6", label: "Prepare manager briefing pack" },
                          { id: "18-7", label: "Plan monthly newsletter and town halls" },
                          { id: "18-8", label: "Activate change champion network" }
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Phase 7: Programme Kick-Off */}
                  <AccordionItem value="phase-7" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">Phase 7: Programme Kick-Off</p>
                          <p className="text-sm text-muted-foreground">Week 5</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-6">
                      <ChecklistSection
                        stepNumber={19}
                        title="Step 19: Launch Programme"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "19-1", label: "Schedule kick-off event (2 hours)" },
                          { id: "19-2", label: "Confirm attendees (30-50 people)" },
                          { id: "19-3", label: "Prepare kick-off presentation" },
                          { id: "19-4", label: "Programme Sponsor delivers strategic context" },
                          { id: "19-5", label: "Project Lead presents programme overview" },
                          { id: "19-6", label: "Present governance and accountabilities" },
                          { id: "19-7", label: "Workstream leads present deep-dives" },
                          { id: "19-8", label: "Present risks and mitigation" },
                          { id: "19-9", label: "Facilitate Q&A session" },
                          { id: "19-10", label: "Sponsor delivers call to action" },
                          { id: "19-11", label: "Distribute kick-off pack to all attendees" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={20}
                        title="Step 20: Establish Programme Management Infrastructure"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "20-1", label: "Create programme collaboration space (SharePoint/Teams)" },
                          { id: "20-2", label: "Set up project management tool" },
                          { id: "20-3", label: "Establish document repository structure" },
                          { id: "20-4", label: "Create templates library" },
                          { id: "20-5", label: "Set up risk and issue tracking (RAID log)" },
                          { id: "20-6", label: "Configure resource management tool" },
                          { id: "20-7", label: "Establish change control process" },
                          { id: "20-8", label: "Create reporting dashboards" },
                          { id: "20-9", label: "Schedule first workstream meetings" },
                          { id: "20-10", label: "Schedule first Programme Board meeting" }
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={21}
                        title="Step 21: Implement Programme Reporting"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "21-1", label: "Define weekly workstream status report format" },
                          { id: "21-2", label: "Define bi-weekly Programme Board report format" },
                          { id: "21-3", label: "Define monthly Executive report format" },
                          { id: "21-4", label: "Define quarterly Board report format" },
                          { id: "21-5", label: "Create reporting templates for each level" },
                          { id: "21-6", label: "Establish reporting calendar" },
                          { id: "21-7", label: "Train workstream leads on reporting requirements" },
                          { id: "21-8", label: "Set up automated dashboard where possible" }
                        ]}
                      />

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-3">Reporting Frequency Summary:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="p-3 bg-background rounded border">
                            <p className="font-medium">Weekly</p>
                            <p className="text-muted-foreground">Workstream Status</p>
                            <p className="text-xs text-muted-foreground">1-page update, 30 mins prep</p>
                          </div>
                          <div className="p-3 bg-background rounded border">
                            <p className="font-medium">Bi-Weekly</p>
                            <p className="text-muted-foreground">Programme Board</p>
                            <p className="text-xs text-muted-foreground">Dashboard + 1hr meeting</p>
                          </div>
                          <div className="p-3 bg-background rounded border">
                            <p className="font-medium">Monthly</p>
                            <p className="text-muted-foreground">Executive Committee</p>
                            <p className="text-xs text-muted-foreground">5-page report + 1hr meeting</p>
                          </div>
                          <div className="p-3 bg-background rounded border">
                            <p className="font-medium">Quarterly</p>
                            <p className="text-muted-foreground">Board</p>
                            <p className="text-xs text-muted-foreground">8-10 page paper + 30 mins</p>
                          </div>
                        </div>
                      </div>

                      <ChecklistSection
                        stepNumber={22}
                        title="Step 22: Execute Change Control Process"
                        moduleId="cd-p3-part2"
                        items={[
                          { id: "22-1", label: "Define what constitutes a change requiring control" },
                          { id: "22-2", label: "Create Change Request Form template" },
                          { id: "22-3", label: "Define impact assessment process" },
                          { id: "22-4", label: "Define approval thresholds (minor/medium/major)" },
                          { id: "22-5", label: "Establish Change Log tracking system" },
                          { id: "22-6", label: "Define implementation and review process" },
                          { id: "22-7", label: "Communicate change control process to all stakeholders" },
                          { id: "22-8", label: "Train workstream leads on change request process" }
                        ]}
                      />

                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h5 className="font-medium mb-2">Change Approval Thresholds:</h5>
                        <ul className="text-sm space-y-2">
                          <li><strong>Minor</strong> (&lt;£10K, &lt;1 week delay): Project Lead approves</li>
                          <li><strong>Medium</strong> (£10-50K, 1-4 weeks delay): Programme Board approves</li>
                          <li><strong>Major</strong> (&gt;£50K, &gt;4 weeks delay, scope change): ExCo/Board approves</li>
                        </ul>
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
                <CardTitle>Templates & Tools</CardTitle>
                <CardDescription>
                  Comprehensive toolkit for delivery planning and monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="Risk Register Template"
                    description="Excel workbook with risk tracking, RAG ratings, heat maps, and mitigation actions"
                    format="Excel"
                  />
                  <TemplateCard
                    title="Contingency Plan Template"
                    description="Detailed contingency plans for top 5-10 critical risks with trigger points and actions"
                    format="Word"
                  />
                  <TemplateCard
                    title="Detailed Work Package Plan"
                    description="Excel template for task lists, resource assignments, deliverables, and dependencies"
                    format="Excel"
                  />
                  <TemplateCard
                    title="RACI Matrix Template"
                    description="Excel matrix with 50+ pre-populated deliverables and role-based color coding"
                    format="Excel"
                  />
                  <TemplateCard
                    title="Board Approval Pack Template"
                    description="30-40 slide PowerPoint with professional design, pre-populated content placeholders"
                    format="PowerPoint"
                  />
                  <TemplateCard
                    title="Weekly Status Report Template"
                    description="1-page template for workstream progress, RAG status, issues, and next steps"
                    format="Word"
                  />
                  <TemplateCard
                    title="Programme Board Report"
                    description="Dashboard format with programme health, milestones, budget, and risk heat map"
                    format="PowerPoint"
                  />
                  <TemplateCard
                    title="Monthly Executive Report"
                    description="5-page Word template for ExCo with progress, budget, risks, and escalations"
                    format="Word"
                  />
                  <TemplateCard
                    title="Quarterly Board Report"
                    description="10-page report template for strategic progress, outcomes, and regulatory readiness"
                    format="Word"
                  />
                  <TemplateCard
                    title="Change Control Templates"
                    description="Change Request Form, Change Log, and Impact Assessment templates"
                    format="Excel"
                  />
                  <TemplateCard
                    title="Programme Kick-Off Materials"
                    description="Complete kit with agenda, presentations, FAQs, contact list, and charter"
                    format="PowerPoint"
                  />
                  <TemplateCard
                    title="Communications Plan Template"
                    description="Excel template with audience analysis, schedule, channels, and measurement"
                    format="Excel"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Repository Structure</CardTitle>
                <CardDescription>Recommended folder structure for programme documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-muted-foreground">
{`/Consumer-Duty-Programme
  /Governance
    /Board-Papers
    /Steering-Committee
    /Programme-Board
    /Terms-of-Reference
  /Planning
    /Business-Case
    /Project-Plan
    /Risk-Register
    /Resource-Plan
  /Workstreams
    /Products-Services
    /Price-Value
    /Consumer-Understanding
    /Consumer-Support
    /Vulnerable-Customers
    /Distribution-Chain
  /Evidence-Management
  /Deliverables
    /Policies
    /Methodologies
    /Templates
  /Reports
  /Change-Control
    /Change-Requests
    /Impact-Assessments
    /Approvals
  /Reporting
    /Status-Reports
    /Dashboards
    /Lessons-Learned`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Success Criteria
                </CardTitle>
                <CardDescription>Clear, measurable success indicators for Part 2</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-400">Planning Phase Success</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Board-approved implementation plan with documented support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Realistic timeline with 15-20% contingency on critical path</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Budget approved at requested level (not cut)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Resources committed in writing (not just verbal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>All SMF accountabilities formally documented and signed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Risk register with top 10 risks and mitigation plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>RACI matrix complete with no gaps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Programme kick-off completed with &gt;80% attendance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400">Governance Success</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Governance structure operational within 2 weeks of approval</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Programme Board meeting weekly/bi-weekly (attendance &gt;80%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Executive Committee reviewing monthly (attendance &gt;90%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Board receiving quarterly updates (minimum)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>All decisions formally recorded in meeting minutes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Escalation protocol tested and working</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Change control process operational</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400">Delivery Success (Measured Quarterly)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        <span>&gt;85% milestones achieved on time (within 1-week tolerance)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        <span>Budget variance &lt;10% (within approved contingency)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        <span>Resource utilisation 75-85% (not over-allocated)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        <span>Risk register reviewed monthly, no critical risks unmitigated</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        <span>&gt;80% deliverables meeting quality criteria first time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        <span>No critical issues unresolved for &gt;2 weeks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        <span>Change requests processed within 5 working days</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-accent">Stakeholder Engagement Success</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span>Board satisfaction with reporting &gt;4/5 (surveyed annually)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span>ExCo confidence in delivery &gt;3.5/5 (surveyed quarterly)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span>Workstream Lead satisfaction &gt;3.5/5 (surveyed monthly)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span>Business unit heads report adequate involvement &gt;3/5</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span>Staff awareness of programme &gt;70% (surveyed bi-annually)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-3">Timeline Success</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <ul className="space-y-1">
                        <li>✓ Strategic Planning Phase: Complete within 3-4 weeks</li>
                        <li>✓ Board Approval: Obtained within 1 month of planning start</li>
                        <li>✓ Programme Kick-off: Within 2 weeks of Board approval</li>
                        <li>✓ Foundation Phase: Complete within 6-8 weeks</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-1">
                        <li>✓ Framework Development: Complete within 12-14 weeks</li>
                        <li>✓ Operational Implementation: Complete within 20-24 weeks</li>
                        <li>✓ Monitoring & Assurance: Operational by week 30</li>
                        <li>✓ Overall Programme: Within approved timeline ± 10%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Common Pitfalls
                </CardTitle>
                <CardDescription>
                  Based on FCA findings and industry experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PitfallCard
                  title="Pitfall 1: Unrealistic Timelines Without Contingency"
                  description="Many firms underestimate the time required, leading to rushed delivery and quality issues. Deliverables fall below regulatory standard, staff experience burnout, and corners get cut on evidence generation."
                  impact="Deliverables below regulatory standard, staff burnout, Board loses confidence, quality compromised"
                  prevention="Add 20% contingency to all estimates. Consult workstream leads on realistic timelines. Build in buffer for approvals. Use industry benchmarks (typical Consumer Duty implementation: 18-30 months)."
                />

                <PitfallCard
                  title="Pitfall 2: Insufficient Board Engagement and Challenge"
                  description="Boards 'noting' reports rather than actively challenging assumptions and resource adequacy. Management presents overly optimistic picture, Board trusts without verification."
                  impact="Inadequate resources allocated, quality issues not caught early, SMF accountability unclear, regulatory criticism of Board oversight"
                  prevention="Board training on Consumer Duty before approval sought. Ensure Board papers are clear and balanced. Encourage independent NED challenge. External expert to brief Board."
                />

                <PitfallCard
                  title="Pitfall 3: Treating as Compliance Exercise, Not Transformation"
                  description="Firms creating policies and tick-box processes without genuine operational change. Focus on documentation over delivery, business units not involved, seen as overhead not investment."
                  impact="Superficial compliance, no improvement in customer outcomes, regulatory enforcement risk, staff cynicism"
                  prevention="Business-led with compliance support (not compliance-led). Measure customer outcomes, not just process completion. Link to strategic priorities. Engage business units from start."
                />

                <PitfallCard
                  title="Pitfall 4: Inadequate Resource Allocation"
                  description="Firms underestimate resources needed, expecting 'business as usual' teams to absorb work. Belief that existing teams can absorb work, not understanding full scope."
                  impact="Delays and missed milestones, quality compromised, staff burnout, key activities not completed"
                  prevention="Realistic resource estimation using industry benchmarks. Dedicated project team (not 10% of everyone's time). Budget approved before starting. Resource commitments in writing."
                />

                <PitfallCard
                  title="Pitfall 5: Poor Dependency and Risk Management"
                  description="Firms not identifying dependencies until they cause delays, no proactive risk management. Workstreams planned in isolation, no holistic view of programme."
                  impact="Cascade delays across workstreams, resource conflicts, rework when dependencies not met, programme credibility damaged"
                  prevention="Map dependencies explicitly in planning phase. Identify cross-workstream dependencies. Build dependency management into Programme Board agenda. Regular risk review (not just log update)."
                />

                <PitfallCard
                  title="Pitfall 6: Weak Change Control"
                  description="Scope creep and uncontrolled changes leading to budget overruns and timeline slippage. No formal change control process, all requests accepted without impact assessment."
                  impact="Budget exceeded, timeline extended, quality compromised, team demoralized"
                  prevention="Formal change control process from day 1. Impact assessment for all change requests. Clear criteria for approving changes. Communicate that changes = cost/time trade-offs."
                />

                <PitfallCard
                  title="Pitfall 7: Insufficient Integration with Existing Change"
                  description="Parallel structures created, duplicating effort and confusing staff. Consumer Duty seen as separate initiative, lack of portfolio management."
                  impact="Duplication of effort, conflicting requirements, staff confusion, wasted resources"
                  prevention="Map existing change portfolio upfront. Identify overlaps and integration opportunities. Coordinate with other programme leads. Leverage existing governance where possible."
                />

                <PitfallCard
                  title="Pitfall 8: Inadequate Stakeholder Communication"
                  description="Staff not understanding purpose of Consumer Duty, seeing it as 'another compliance burden'. Communications focused on process not purpose, one-way communication."
                  impact="Resistance to change, poor engagement, quality issues (people doing minimum required), cultural change not achieved"
                  prevention="Communicate 'why' (customer outcomes) not just 'what' (rules). Use stories and examples (not just policy text). Two-way communication (listen as well as tell). Engage change champions."
                />

                <PitfallCard
                  title="Pitfall 9: No Mechanism for Learning and Adaptation"
                  description="Firms following original plan rigidly despite new information or regulatory guidance. Fear of appearing incompetent if changing plan, no process for incorporating learning."
                  impact="Programme doesn't adapt to reality, regulatory guidance ignored, lessons not learned, same mistakes repeated"
                  prevention="Build in review points for learning. Encourage 'fail fast, learn fast' culture. Monitor regulatory developments. Peer learning and benchmarking. Retrospectives after each phase."
                />

                <PitfallCard
                  title="Pitfall 10: Treating Completion as the End"
                  description="Firms view Consumer Duty implementation as project with end date, not ongoing obligation. Team disbands after 'go live', moves to BAU without clarity."
                  impact="Momentum lost post-implementation, continuous improvement doesn't happen, maturity doesn't progress, regulatory criticism of stagnation"
                  prevention="Plan for BAU transition from start. Define ongoing roles and responsibilities. Embed in performance objectives. Continuous improvement built into BAU. Annual review cycle."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => navigate("/governance/roadmap")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Part 1: Strategic Planning
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}