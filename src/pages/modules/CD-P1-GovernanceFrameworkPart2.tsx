import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { 
  ArrowLeft, 
  Building2, 
  Clock, 
  Users, 
  Shield, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  Scale,
  Target,
  Network,
  UserCheck,
  Gauge,
  GraduationCap,
  Heart,
  TrendingUp,
  Settings,
  Link2
} from "lucide-react";
import { toast } from "sonner";

const MODULE_ID = "cd-p1-governance-framework-part2";

export default function CDP1GovernanceFrameworkPart2() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    toast.success("Export functionality will generate a PDF of this module");
  };

  const handleTemplateDownload = (templateName: string) => {
    toast.success(`Downloading ${templateName}...`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">Planning Module</Badge>
                  <Badge variant="secondary">Part 2 of 2</Badge>
                </div>
                <h1 className="text-2xl font-bold">CD-P1: Governance Framework Design</h1>
                <p className="text-muted-foreground">Accountability & Operations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <FileText className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Purpose Card */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Module Purpose
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  Embed accountability mechanisms, integrate Consumer Duty governance with existing structures, 
                  and establish ongoing governance operations to ensure sustainable compliance.
                </p>
              </CardContent>
            </Card>

            {/* Context */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  This is <strong>Part 2</strong> of Governance Framework Design. Part 1 established foundational 
                  structures (Board setup, CDOC establishment, basic roles). Part 2 focuses on making governance 
                  operational and sustainable.
                </p>
              </CardContent>
            </Card>

            {/* Critical Principle */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Critical Principle</h3>
                    <p className="text-foreground">
                      "Governance is not just structure—it's about decision-making, accountability, 
                      and continuous improvement"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Information Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">2-4 weeks</p>
                      <p className="text-xs text-muted-foreground">Framework completion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Key Focus</p>
                      <p className="font-semibold">Accountability</p>
                      <p className="text-xs text-muted-foreground">Decision authority & culture</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Link2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Integration</p>
                      <p className="font-semibold">3 Committees</p>
                      <p className="text-xs text-muted-foreground">Risk, Audit, Rem</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Deliverables</p>
                      <p className="font-semibold">8 key outputs</p>
                      <p className="text-xs text-muted-foreground">Part 2 accountability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scope */}
            <Card>
              <CardHeader>
                <CardTitle>Module Scope</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Part 2 Key Deliverables (This Module)
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      "Complete RACI Matrix for ongoing Consumer Duty operations",
                      "Decision Authority Matrix",
                      "Risk Appetite Statement for Consumer Outcomes",
                      "Integration protocols with Risk Committee, Audit Committee, Remuneration Committee",
                      "Board and executive training programme",
                      "Governance effectiveness measurement framework",
                      "Annual governance review protocol",
                      "Culture and incentives alignment framework"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    Part 1 Scope (Covered in Separate Module)
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                    {[
                      "Board Consumer Duty Charter",
                      "CDOC Terms of Reference",
                      "Three Lines of Defence model",
                      "Initial RACI for implementation",
                      "Escalation pathways",
                      "Meeting cadence and calendar"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REGULATORY FOUNDATION TAB */}
          <TabsContent value="regulatory" className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              {/* Decision-Making Authority */}
              <AccordionItem value="decision-authority" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Gauge className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">1. Decision-Making Authority and Accountability</h3>
                      <p className="text-sm text-muted-foreground">Clear accountability at all levels</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    FCA Expectation: Clear accountability at all levels for consumer outcomes
                  </p>
                  
                  <Card className="p-4 bg-muted/30">
                    <h4 className="font-semibold mb-3">Key Questions Governance Must Answer:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• WHO decides if a product provides fair value?</li>
                      <li>• WHO decides if vulnerable customer outcomes are acceptable?</li>
                      <li>• WHO decides when to withdraw a product causing harm?</li>
                      <li>• WHO decides remediation approach for identified issues?</li>
                      <li>• WHO decides resource allocation for Consumer Duty priorities?</li>
                    </ul>
                    <Card className="mt-3 p-3 bg-primary/5 border-primary/20">
                      <p className="text-sm font-medium">Answer: Must be EXPLICIT in governance framework</p>
                    </Card>
                  </Card>

                  <div>
                    <h4 className="font-semibold mb-3">Decision Authority Principles:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { num: 1, title: "PROPORTIONALITY", desc: "Decisions at appropriate level (operational vs strategic)" },
                        { num: 2, title: "EXPERTISE", desc: "Decision-makers have relevant knowledge" },
                        { num: 3, title: "TIMELINESS", desc: "Decisions made quickly enough to prevent harm" },
                        { num: 4, title: "ACCOUNTABILITY", desc: "One person accountable for each decision (not committees)" },
                        { num: 5, title: "DOCUMENTATION", desc: "Decision rationale and evidence documented" },
                        { num: 6, title: "CHALLENGE", desc: "Appropriate challenge before decision finalized" },
                        { num: 7, title: "ESCALATION", desc: "Clear path when decision-maker uncertain or conflicts arise" }
                      ].map((item) => (
                        <Card key={item.num} className="p-3">
                          <h5 className="font-medium text-sm">{item.num}. {item.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Risk Appetite */}
              <AccordionItem value="risk-appetite" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">2. Risk Appetite for Consumer Outcomes</h3>
                      <p className="text-sm text-muted-foreground">Defining acceptable levels of consumer risk</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <RegulatoryQuote
                    source="FCA Requirement"
                    reference="PRIN 2A"
                    quote="Board must define risk appetite for consumer harm"
                  />
                  
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">What is Risk Appetite Statement (RAS)?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      "The amount and type of risk an organization is willing to accept in pursuit 
                      of its strategic objectives"
                    </p>
                    <h5 className="font-medium text-sm mb-2">For Consumer Duty, RAS defines:</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• How much consumer detriment is acceptable?</li>
                      <li>• What level of poor outcomes triggers action?</li>
                      <li>• Balance between customer outcomes and commercial objectives</li>
                      <li>• Boundaries for decision-making</li>
                    </ul>
                  </Card>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Key Components of Consumer Outcomes RAS:</h4>
                    
                    <Card className="p-4">
                      <h5 className="font-medium mb-2">A. Quantitative Metrics with Thresholds</h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Metric</th>
                              <th className="text-left p-2">Green</th>
                              <th className="text-left p-2">Amber</th>
                              <th className="text-left p-2">Red</th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-b">
                              <td className="p-2 font-medium text-foreground">FOS Uphold Rate</td>
                              <td className="p-2">&lt;5%</td>
                              <td className="p-2">5-10%</td>
                              <td className="p-2">&gt;10%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-medium text-foreground">Fair Value Assessment</td>
                              <td className="p-2">&gt;95% rated "Fair"</td>
                              <td className="p-2">90-95%</td>
                              <td className="p-2">&lt;90%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-medium text-foreground">Understanding Test Pass</td>
                              <td className="p-2">&gt;85%</td>
                              <td className="p-2">75-85%</td>
                              <td className="p-2">&lt;75%</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-medium text-foreground">Vulnerable Customer Variance</td>
                              <td className="p-2">&lt;5% worse</td>
                              <td className="p-2">5-10%</td>
                              <td className="p-2">&gt;10%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h5 className="font-medium mb-2">B. Qualitative Statements</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• "We will not sell products to customers outside our defined target market"</li>
                        <li>• "We will withdraw products identified as not providing fair value within X months"</li>
                        <li>• "We will ensure vulnerable customers achieve outcomes as good as other customers"</li>
                        <li>• "We will not exploit customer behavioural biases for commercial gain"</li>
                        <li>• "We will prioritize resolution of consumer harm over short-term profit"</li>
                      </ul>
                    </Card>
                  </div>

                  <Card className="p-3 bg-success/5 border-success/20">
                    <p className="text-sm">
                      <CheckCircle2 className="h-4 w-4 inline mr-2 text-success" />
                      <strong>FCA Finding:</strong> "Good firms had clear quantitative thresholds for consumer 
                      outcomes that triggered escalation and remediation"
                    </p>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* Integration with Committees */}
              <AccordionItem value="integration" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Network className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">3. Integration with Existing Governance Committees</h3>
                      <p className="text-sm text-muted-foreground">Risk, Audit, and Remuneration Committee coordination</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Consumer Duty must integrate with existing Board committees to avoid silos and ensure coordination.
                  </p>

                  <div className="grid gap-4">
                    <Card className="p-4 border-l-4 border-l-blue-500">
                      <h4 className="font-semibold mb-2">A. Board Risk Committee</h4>
                      <p className="text-sm font-medium mb-2">Role: Oversee consumer detriment as enterprise risk</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Regular reporting on consumer outcome risks</li>
                        <li>• Review of Consumer Duty risk appetite</li>
                        <li>• Oversight of risk mitigation for consumer harm</li>
                        <li>• Approval of Consumer Duty risk framework</li>
                      </ul>
                      <p className="text-xs mt-2 font-medium">
                        Link: CDOC reports to Board Risk Committee quarterly on consumer outcome risks
                      </p>
                    </Card>

                    <Card className="p-4 border-l-4 border-l-purple-500">
                      <h4 className="font-semibold mb-2">B. Board Audit Committee</h4>
                      <p className="text-sm font-medium mb-2">Role: Oversee internal audit's Consumer Duty assurance</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Approve internal audit Consumer Duty plan</li>
                        <li>• Receive audit findings on Consumer Duty implementation</li>
                        <li>• Review outcomes testing results (Third Line)</li>
                        <li>• Oversee management response to audit recommendations</li>
                      </ul>
                      <p className="text-xs mt-2 font-medium">
                        Link: Internal Audit reports Consumer Duty findings to Audit Committee; CDOC provides management response
                      </p>
                    </Card>

                    <Card className="p-4 border-l-4 border-l-amber-500">
                      <h4 className="font-semibold mb-2">C. Remuneration Committee</h4>
                      <p className="text-sm font-medium mb-2">Role: Ensure incentives align with good customer outcomes</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Review incentive schemes for conflict with Consumer Duty</li>
                        <li>• Approve malus/clawback provisions for consumer harm</li>
                        <li>• Consider consumer outcomes in executive remuneration</li>
                        <li>• Review metrics for bonus/LTIPs to include customer outcomes</li>
                      </ul>
                      <p className="text-xs mt-2 font-medium">
                        Link: CDOC provides input to Rem Committee on alignment of incentives with outcomes
                      </p>
                    </Card>
                  </div>

                  <Card className="p-3 bg-warning/5 border-warning/20">
                    <p className="text-sm font-medium">
                      <AlertTriangle className="h-4 w-4 inline mr-2 text-warning" />
                      CRITICAL: Must avoid governance silos—committees must coordinate on Consumer Duty
                    </p>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* Culture and Conduct */}
              <AccordionItem value="culture" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">4. Culture and Conduct Alignment</h3>
                      <p className="text-sm text-muted-foreground">Ensuring culture supports good outcomes</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    FCA Expectation: Culture must support good customer outcomes
                  </p>

                  <Card className="p-4 bg-success/5 border-success/20">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      Indicators of Healthy Consumer Duty Culture
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>✓ Customer outcomes given equal weight to financial targets</li>
                      <li>✓ Staff empowered to challenge practices harmful to customers</li>
                      <li>✓ "Tone from top" consistently emphasizes customer outcomes</li>
                      <li>✓ Successes celebrated include customer outcome improvements</li>
                      <li>✓ Performance metrics include customer outcome measures</li>
                      <li>✓ Incentives reward good outcomes, not just sales volumes</li>
                      <li>✓ Training emphasizes ethical conduct and customer focus</li>
                      <li>✓ Staff confident they won't be penalized for doing right thing for customer</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Culture Assessment Methods:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Staff surveys on culture</li>
                      <li>• Focus groups on customer outcome priorities</li>
                      <li>• Observation of management messaging</li>
                      <li>• Review of performance management processes</li>
                      <li>• Analysis of what gets celebrated and rewarded</li>
                      <li>• Mystery shopping / customer experience testing</li>
                    </ul>
                  </Card>

                  <Card className="p-3 bg-primary/5 border-primary/20">
                    <p className="text-sm font-medium">
                      Key point: Culture cannot be delegated—Board and CEO must actively shape it
                    </p>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* Conduct Rule 6 */}
              <AccordionItem value="cr6" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">5. Conduct Rule 6 and Performance Management</h3>
                      <p className="text-sm text-muted-foreground">Individual accountability for customer outcomes</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <Card className="p-4 bg-destructive/5 border-destructive/20">
                    <h4 className="font-semibold mb-2">Individual Conduct Rule 6 (CR6)</h4>
                    <p className="text-lg font-medium mb-2">"You must act to deliver good outcomes for retail customers"</p>
                    <p className="text-sm text-muted-foreground">
                      Applies to: All Senior Managers, Certified Persons, and Conduct Rules staff
                    </p>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Implications for Performance Management:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• CR6 must be incorporated into job descriptions</li>
                      <li>• Performance objectives should include customer outcome measures</li>
                      <li>• Appraisals should assess CR6 compliance</li>
                      <li>• Promotion criteria should consider customer outcomes</li>
                      <li>• Disciplinary procedures must address CR6 breaches</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Examples of CR6 Assessment in Performance Management:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Product Manager:</strong> "Conducted Fair Value Assessments on time; 
                        identified and remediated 2 products not providing fair value"
                      </li>
                      <li>
                        <strong>Customer Service Manager:</strong> "CSAT improved from 3.8 to 4.2; 
                        vulnerable customer outcomes within 5% of average"
                      </li>
                      <li>
                        <strong>Marketing Manager:</strong> "Communication testing pass rate &gt;90%; 
                        no regulatory findings on misleading communications"
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-3 bg-warning/5 border-warning/20">
                    <p className="text-sm font-medium">
                      <AlertTriangle className="h-4 w-4 inline mr-2 text-warning" />
                      FCA can take action against individuals for CR6 breaches: disciplinary action, fines, 
                      prohibition from working in financial services
                    </p>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* Governance Effectiveness */}
              <AccordionItem value="effectiveness" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">6. Governance Effectiveness Monitoring</h3>
                      <p className="text-sm text-muted-foreground">Ensuring governance works in practice</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    FCA Expectation: Governance must be effective, not just exist
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">Board Level Indicators:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Board actively challenges management on MI</li>
                        <li>✓ Decisions made with adequate evidence</li>
                        <li>✓ Probing questions about customer outcomes</li>
                        <li>✓ Follows up on previous actions</li>
                        <li>✓ Training is comprehensive and regular</li>
                        <li>✓ Papers are clear and outcomes-focused</li>
                      </ul>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">CDOC Level Indicators:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Meetings are well-attended and engaged</li>
                        <li>✓ Drives action across business</li>
                        <li>✓ Escalates issues appropriately</li>
                        <li>✓ Challenges First Line on outcomes</li>
                        <li>✓ Produces high-quality Board reports</li>
                      </ul>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">SMF Level Indicators:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Can articulate Consumer Duty responsibilities</li>
                        <li>✓ Have adequate resources</li>
                        <li>✓ Take proactive steps (reasonable steps)</li>
                        <li>✓ Document oversight and challenge</li>
                      </ul>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">Operational Level Indicators:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Staff understand their role</li>
                        <li>✓ Embedded in business-as-usual</li>
                        <li>✓ Issues identified and escalated promptly</li>
                        <li>✓ Remediation actions completed</li>
                        <li>✓ Continuous improvement evident</li>
                      </ul>
                    </Card>
                  </div>

                  <Card className="p-3 bg-primary/5 border-primary/20">
                    <p className="text-sm font-medium">
                      Governance effectiveness should be formally assessed annually
                    </p>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* IMPLEMENTATION STEPS TAB */}
          <TabsContent value="implementation" className="space-y-6">
            <Card className="p-4 bg-muted/50">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Part 2: Accountability & Operations</p>
                  <p className="text-sm text-muted-foreground">
                    4 phases covering RACI completion, risk appetite, training, and ongoing operations
                  </p>
                </div>
              </div>
            </Card>

            {/* Phase 5: Complete RACI and Decision Authority */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Phase 5</Badge>
                <h3 className="text-lg font-semibold">Complete RACI and Decision Authority (Weeks 1-2)</h3>
              </div>

              <ChecklistSection
                stepNumber={9}
                title="Develop Complete Ongoing RACI Matrix"
                description="Define RACI for all ongoing Consumer Duty operations"
                moduleId={MODULE_ID}
                items={[
                  { id: "9-1", label: "Define RACI for annual product reviews" },
                  { id: "9-2", label: "Define RACI for Fair Value Assessment updates" },
                  { id: "9-3", label: "Define RACI for communication testing (ongoing)" },
                  { id: "9-4", label: "Define RACI for consumer journey monitoring" },
                  { id: "9-5", label: "Define RACI for vulnerable customer framework operation" },
                  { id: "9-6", label: "Define RACI for distribution chain oversight" },
                  { id: "9-7", label: "Define RACI for MI production and analysis" },
                  { id: "9-8", label: "Define RACI for Board reporting" },
                  { id: "9-9", label: "Define RACI for regulatory engagement, training delivery, policy reviews" },
                  { id: "9-10", label: "Review for gaps or overlaps and obtain CDOC approval" },
                  { id: "9-11", label: "Communicate to all affected parties" }
                ]}
              />

              <ChecklistSection
                stepNumber={10}
                title="Create Decision Authority Matrix"
                description="Make explicit WHO can decide WHAT regarding Consumer Duty"
                moduleId={MODULE_ID}
                items={[
                  { id: "10-1", label: "List all key Consumer Duty decisions (product launch/modify/withdraw, target market, fair value, communication approvals, remediation, resource allocation, policy approvals)" },
                  { id: "10-2", label: "Define authority for each decision (who has authority, required inputs/evidence, consultation requirements)" },
                  { id: "10-3", label: "Set approval limits (if financial) and escalation triggers" },
                  { id: "10-4", label: "Document decision rationale and evidence requirements" },
                  { id: "10-5", label: "Review for consistency with RACI" },
                  { id: "10-6", label: "Obtain CDOC approval" },
                  { id: "10-7", label: "Communicate to all decision-makers" }
                ]}
              />

              <Card className="p-4 bg-muted/30">
                <h4 className="font-semibold mb-3">Example Decision Matrix Entry:</h4>
                <div className="text-sm space-y-2">
                  <p><strong>Decision:</strong> Withdraw product due to poor fair value</p>
                  <p><strong>Authority:</strong> Head of Product (minor); CDOC (material); Board (major)</p>
                  <p><strong>Required Inputs:</strong> FVA showing poor value, customer impact assessment, remediation options, cost-benefit analysis</p>
                  <p><strong>Limits:</strong> Minor = &lt;500 customers; Material = 500-5000; Major = &gt;5000</p>
                </div>
              </Card>
            </div>

            {/* Phase 6: Risk Appetite and Integration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Phase 6</Badge>
                <h3 className="text-lg font-semibold">Risk Appetite and Integration (Weeks 2-3)</h3>
              </div>

              <ChecklistSection
                stepNumber={11}
                title="Develop Risk Appetite Statement for Consumer Outcomes"
                description="Define acceptable levels of consumer outcome risk"
                moduleId={MODULE_ID}
                items={[
                  { id: "11-1", label: "Review existing risk appetite statements (if firm has them)" },
                  { id: "11-2", label: "Identify consumer outcome risks to be covered" },
                  { id: "11-3", label: "Define quantitative thresholds for key metrics (complaint rate, FOS uphold rate, FVA scores, understanding test pass rates, vulnerable customer variance)" },
                  { id: "11-4", label: "Define qualitative statements (tolerance for harm, product withdrawal principles, vulnerable customer protections)" },
                  { id: "11-5", label: "Define risk categories and actions (Green/Amber/Red)" },
                  { id: "11-6", label: "Draft Risk Appetite Statement" },
                  { id: "11-7", label: "Review with CDOC" },
                  { id: "11-8", label: "Obtain Board Risk Committee approval" },
                  { id: "11-9", label: "Obtain Board approval" },
                  { id: "11-10", label: "Communicate RAS to all SMFs and outcome owners" },
                  { id: "11-11", label: "Integrate RAS into MI dashboards (show RAG status vs appetite)" }
                ]}
              />

              <Card className="p-3 bg-primary/5 border-primary/20">
                <p className="text-sm font-medium">
                  Key principle: RAS should be STRETCHING but ACHIEVABLE—not so lenient it's meaningless, 
                  not so strict it's impossible
                </p>
              </Card>

              <ChecklistSection
                stepNumber={12}
                title="Integrate with Existing Governance Committees"
                description="Define integration approach for Risk, Audit, and Remuneration Committees"
                moduleId={MODULE_ID}
                items={[
                  { id: "12-1", label: "Update Risk Committee ToR to include Consumer Duty oversight; add standing agenda item; define quarterly reporting from CDOC" },
                  { id: "12-2", label: "Update Audit Committee ToR; approve internal audit Consumer Duty plan; define audit reporting flow" },
                  { id: "12-3", label: "Review incentive schemes for Consumer Duty alignment; identify perverse incentives; design adjustments" },
                  { id: "12-4", label: "Update Remuneration Policy to reference Consumer Duty; obtain Remuneration Committee approval" },
                  { id: "12-5", label: "Define Executive Committee escalation approach (if exists)" },
                  { id: "12-6", label: "Test integration with first quarterly reports to each committee" }
                ]}
              />
            </div>

            {/* Phase 7: Training and Culture */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Phase 7</Badge>
                <h3 className="text-lg font-semibold">Training and Culture (Weeks 2-4)</h3>
              </div>

              <ChecklistSection
                stepNumber={13}
                title="Develop Board and Executive Training Programme"
                description="Ensure Board and Executives can discharge Consumer Duty responsibilities"
                moduleId={MODULE_ID}
                items={[
                  { id: "13-1", label: "Design Board training modules: Fundamentals (2hrs), Firm-Specific Implementation (2hrs), MI Interpretation & Challenge (1.5hrs), Case Studies (1.5hrs), Annual Refresher (1hr)" },
                  { id: "13-2", label: "Design Senior Management training modules: Requirements (3hrs), Operational Implementation (3hrs), MI & Monitoring (2hrs), Leadership & Culture (2hrs), Annual Refresher (1.5hrs)" },
                  { id: "13-3", label: "Procure training delivery (internal or external)" },
                  { id: "13-4", label: "Schedule initial training sessions" },
                  { id: "13-5", label: "Deliver initial training" },
                  { id: "13-6", label: "Assess training effectiveness (quiz, feedback)" },
                  { id: "13-7", label: "Schedule annual refresher training" },
                  { id: "13-8", label: "Include training in induction for new Board members / SMFs" }
                ]}
              />

              <ChecklistSection
                stepNumber={14}
                title="Assess and Align Culture and Incentives"
                description="Ensure culture and incentives support Consumer Duty"
                moduleId={MODULE_ID}
                items={[
                  { id: "14-1", label: "Conduct culture assessment (staff survey, focus groups, management messaging review, behaviour analysis)" },
                  { id: "14-2", label: "Review incentive schemes for all relevant staff (executive remuneration, sales incentives, product development bonuses, customer service metrics)" },
                  { id: "14-3", label: "Identify misalignments (pure volume targets, incentives for selling outside target market, penalties for giving extra support)" },
                  { id: "14-4", label: "Design incentive scheme adjustments (balance volume and quality, include customer outcome metrics, remove perverse incentives, malus/clawback for consumer harm)" },
                  { id: "14-5", label: "Obtain Remuneration Committee approval" },
                  { id: "14-6", label: "Communicate changes to staff" },
                  { id: "14-7", label: "Monitor impact of changes on behaviour and outcomes" }
                ]}
              />

              <Card className="p-3 bg-success/5 border-success/20">
                <p className="text-sm">
                  <CheckCircle2 className="h-4 w-4 inline mr-2 text-success" />
                  <strong>FCA Finding:</strong> "Firms with strong Consumer Duty culture had aligned incentives 
                  and empowered staff to prioritize customer outcomes"
                </p>
              </Card>
            </div>

            {/* Phase 8: Ongoing Governance Operations */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Phase 8</Badge>
                <h3 className="text-lg font-semibold">Ongoing Governance Operations (Weeks 3-4 and ongoing)</h3>
              </div>

              <ChecklistSection
                stepNumber={15}
                title="Establish Governance Effectiveness Measurement"
                description="Ensure governance is working in practice, not just on paper"
                moduleId={MODULE_ID}
                items={[
                  { id: "15-1", label: "Define Board-level metrics (attendance, questions asked, quality of challenge, training completion, self-assessment score)" },
                  { id: "15-2", label: "Define CDOC-level metrics (attendance, issues escalated, actions completed on time, paper quality, self-assessment)" },
                  { id: "15-3", label: "Define SMF-level metrics (SoR coverage, training completion, attestation quality, reasonable steps self-assessment)" },
                  { id: "15-4", label: "Define Operational-level metrics (staff training, survey results, issues escalated, remediation completion)" },
                  { id: "15-5", label: "Establish baseline measurements" },
                  { id: "15-6", label: "Set targets for improvement" },
                  { id: "15-7", label: "Integrate into quarterly CDOC reporting" },
                  { id: "15-8", label: "Include in annual Board report on Consumer Duty" }
                ]}
              />

              <ChecklistSection
                stepNumber={16}
                title="Annual Governance Review Protocol"
                description="Formal annual review of governance effectiveness"
                moduleId={MODULE_ID}
                items={[
                  { id: "16-1", label: "Schedule annual governance review session (typically August/September before annual Board report)" },
                  { id: "16-2", label: "Gather governance effectiveness data" },
                  { id: "16-3", label: "Conduct self-assessments (Board, CDOC, SMFs)" },
                  { id: "16-4", label: "Facilitate review session with CDOC assessing: Structure (fit for purpose?), Effectiveness (working in practice?), Improvements (what needs to change?), Forward Plan (priorities?)" },
                  { id: "16-5", label: "Draft governance review report with recommendations" },
                  { id: "16-6", label: "Present to Board for approval of recommendations" },
                  { id: "16-7", label: "Update governance documents as required (ToRs, RACI, Decision Matrix)" },
                  { id: "16-8", label: "Implement approved changes and communicate to organization" }
                ]}
              />

              <Card className="p-3 bg-primary/5 border-primary/20">
                <p className="text-sm font-medium">
                  FCA expects: "Firms should review effectiveness of their Consumer Duty governance annually 
                  and make improvements"
                </p>
              </Card>
            </div>
          </TabsContent>

          {/* TEMPLATES TAB */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <TemplateCard
                title="Complete RACI Matrix - Ongoing Operations"
                description="Comprehensive Excel workbook covering all ongoing Consumer Duty activities across Products & Services, Price & Value, Consumer Understanding, Consumer Support, Vulnerable Customers, Distribution Chain, and Governance"
                format="Excel"
                onDownload={() => handleTemplateDownload("Complete RACI Matrix")}
              />

              <TemplateCard
                title="Decision Authority Matrix"
                description="Comprehensive matrix defining who decides what for product decisions, target market, fair value, communications, remediation, resource allocation, and policy approvals"
                format="Excel"
                onDownload={() => handleTemplateDownload("Decision Authority Matrix")}
              />

              <TemplateCard
                title="Risk Appetite Statement for Consumer Outcomes"
                description="Board-approved RAS document with quantitative thresholds, qualitative statements, risk categories, escalation requirements, and governance sign-off"
                format="Word"
                onDownload={() => handleTemplateDownload("Risk Appetite Statement")}
              />

              <TemplateCard
                title="Integration Protocol - CDOC to Risk Committee"
                description="Protocol document defining reporting frequency, quarterly report content, review process, ad-hoc escalation triggers, and meeting coordination"
                format="Word"
                onDownload={() => handleTemplateDownload("CDOC Risk Committee Protocol")}
              />

              <TemplateCard
                title="Integration Protocol - Internal Audit to Audit Committee"
                description="Protocol for Internal Audit Consumer Duty reporting to Audit Committee including audit plan, findings, and management responses"
                format="Word"
                onDownload={() => handleTemplateDownload("Audit Committee Protocol")}
              />

              <TemplateCard
                title="Remuneration Alignment Assessment"
                description="Assessment template for reviewing executive remuneration, sales incentives, product development bonuses, and customer service metrics for Consumer Duty alignment"
                format="Excel"
                onDownload={() => handleTemplateDownload("Remuneration Alignment Assessment")}
              />

              <TemplateCard
                title="Board and Executive Training Programme"
                description="Complete training curriculum with module outlines, materials, trainer's guide, assessment questions, and effectiveness evaluation"
                format="PowerPoint"
                onDownload={() => handleTemplateDownload("Training Programme")}
              />

              <TemplateCard
                title="Culture and Incentives Alignment Assessment"
                description="Template for assessing culture through staff surveys, focus groups, management messaging analysis, and 'what gets rewarded' review"
                format="Word"
                onDownload={() => handleTemplateDownload("Culture Assessment")}
              />

              <TemplateCard
                title="Governance Effectiveness Measurement Framework"
                description="Framework document with all effectiveness metrics by governance level, data collection methodology, targets, and dashboard format"
                format="Excel"
                onDownload={() => handleTemplateDownload("Governance Effectiveness Framework")}
              />

              <TemplateCard
                title="Annual Governance Review Report"
                description="Template for annual governance review including structure assessment, effectiveness metrics, lessons learned, and forward plan"
                format="Word"
                onDownload={() => handleTemplateDownload("Annual Governance Review Report")}
              />
            </div>

            {/* Template Details */}
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="raci-detail" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-semibold">Template 1: Complete RACI Matrix - Structure</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <Card className="p-3">
                      <h5 className="font-medium mb-2">Tab 1: Products & Services Outcome</h5>
                      <p className="text-xs text-muted-foreground">Annual product review, target market updates, product monitoring, withdrawal decisions</p>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium mb-2">Tab 2: Price & Value Outcome</h5>
                      <p className="text-xs text-muted-foreground">FVA updates, pricing decisions, value monitoring, remediation</p>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium mb-2">Tab 3: Consumer Understanding</h5>
                      <p className="text-xs text-muted-foreground">Communication design, testing, monitoring, improvements</p>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium mb-2">Tab 4: Consumer Support</h5>
                      <p className="text-xs text-muted-foreground">Support quality monitoring, sludge audits, complaints handling</p>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium mb-2">Tabs 5-10</h5>
                      <p className="text-xs text-muted-foreground">Vulnerable Customers, Distribution Chain, Monitoring & Reporting, Governance & Oversight, Training & Culture, Continuous Improvement</p>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium mb-2">Features</h5>
                      <p className="text-xs text-muted-foreground">Color coding (Green/Amber/Red), notes column, review dates, version control</p>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ras-detail" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-semibold">Template 3: Risk Appetite Statement - Structure</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="space-y-2 text-sm">
                    <p><strong>Section 1:</strong> Introduction - Purpose, scope, relationship to firm-wide RAS</p>
                    <p><strong>Section 2:</strong> Overarching Statement - Zero appetite for material harm</p>
                    <p><strong>Section 3:</strong> Quantitative Thresholds - Table with metrics, Green/Amber/Red thresholds</p>
                    <p><strong>Section 4:</strong> Qualitative Statements - By outcome (Products, Value, Understanding, Support)</p>
                    <p><strong>Section 5:</strong> Actions Required - What happens when thresholds breached</p>
                    <p><strong>Section 6:</strong> Risk Capacity - Maximum vs appetite distinction</p>
                    <p><strong>Section 7:</strong> Review - Annual review process and Board approval</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* SUCCESS CRITERIA TAB */}
          <TabsContent value="success" className="space-y-6">
            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Combined success criteria for Part 1 and Part 2 of Governance Framework Design
              </p>
            </Card>

            <div className="grid gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Board Level
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Board Consumer Duty Charter approved and published</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Board receives quarterly Consumer Duty reporting with high-quality MI</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Board conducts annual dedicated session for Consumer Duty assessment approval</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />&gt;95% Board attendance at Consumer Duty sessions</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Board training completed: initial comprehensive + annual refresher</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Board demonstrates effective challenge (evidenced in minutes)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Board self-assessment score on Consumer Duty governance &gt;4/5</li>
                </ul>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  CDOC Level
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />CDOC Terms of Reference approved by Board</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />CDOC established with appropriate cross-functional membership</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />CDOC meetings held per agreed cadence with &gt;90% attendance</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />CDOC drives action across business (not just coordinates)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />CDOC produces quarterly reports to Board Risk Committee</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />CDOC self-assessment score &gt;4/5</li>
                </ul>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  Accountability & Decision-Making
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Complete RACI Matrix developed for ongoing operations</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Decision Authority Matrix approved and communicated</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />All key Consumer Duty decisions have explicit authority assigned</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Zero instances of "accountability gap"</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Risk Appetite Statement for Consumer Outcomes approved by Board</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />All consumer outcome metrics tracked against Risk Appetite thresholds</li>
                </ul>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-primary" />
                  Integration
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Board Risk Committee receives quarterly CDOC reports</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Audit Committee receives quarterly Internal Audit Consumer Duty updates</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Remuneration Committee has reviewed and approved incentive scheme alignments</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Consumer Duty risks integrated into firm's risk register</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />No duplication or conflicts between committees</li>
                </ul>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Culture & Incentives
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Culture assessment conducted (staff survey, focus groups)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />&gt;70% staff agree "firm prioritizes customer outcomes as highly as financial performance"</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />All incentive schemes reviewed for Consumer Duty alignment</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Material perverse incentives removed or mitigated</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />CR6 integrated into all performance management</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Malus/clawback provisions include consumer harm triggers</li>
                </ul>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Governance Effectiveness
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Governance effectiveness metrics defined and tracked</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Quarterly governance metrics reported to CDOC</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Annual governance review conducted</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Governance improvements identified and implemented</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" />Governance rated "effective" in internal audit review</li>
                </ul>
              </Card>
            </div>

            <Card className="p-4 bg-muted/30">
              <h4 className="font-semibold mb-3">Timeline for Complete Governance Framework:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Part 1 (Weeks 1-6)</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Weeks 1-2: Board setup and SMF responsibilities</li>
                    <li>• Weeks 2-4: CDOC establishment and Three Lines</li>
                    <li>• Weeks 3-4: Initial RACI and escalation</li>
                    <li>• Weeks 4-6: Meeting structure</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Part 2 (Weeks 1-4)</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Weeks 1-2: Complete RACI and Decision Authority</li>
                    <li>• Weeks 2-3: Risk Appetite and Integration</li>
                    <li>• Weeks 2-4: Training and Culture</li>
                    <li>• Weeks 3-4: Ongoing operations setup</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm font-medium mt-3">
                Total: 4-6 weeks for complete governance framework design and initial implementation
              </p>
            </Card>
          </TabsContent>

          {/* COMMON PITFALLS TAB */}
          <TabsContent value="pitfalls" className="space-y-4">
            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Combined pitfalls for Part 1 and Part 2 based on FCA findings and good practice
              </p>
            </Card>

            <div className="space-y-4">
              <PitfallCard
                title="Pitfall 1: Governance Structure Without Authority"
                description="CDOC established but lacks authority to drive action; becomes coordination forum only"
                impact="Issues identified but not remediated; accountability gaps"
                prevention="CDOC Terms of Reference must give explicit authority to direct resources and require action from business"
              />

              <PitfallCard
                title="Pitfall 2: Vague SMF Responsibilities"
                description="SMF responsibilities for Consumer Duty vague or overlapping, creating accountability gaps"
                impact="Nobody clearly accountable for specific outcomes; 'not my job' culture"
                prevention="SoRs must be explicit about which SMF owns which outcome/activity"
              />

              <PitfallCard
                title="Pitfall 3: Board Not Challenging Management"
                description="Board receives MI but doesn't challenge assumptions or quality; rubber-stamps management proposals"
                impact="Board not discharging its oversight responsibility; poor MI not identified"
                prevention="Board training must include 'how to challenge' not just 'what is Consumer Duty'"
              />

              <PitfallCard
                title="Pitfall 4: RACI with Multiple 'Accountable'"
                description="RACI assigns multiple people as Accountable (A) for same decision"
                impact="Diffused accountability; nobody ultimately answerable"
                prevention="RACI rule: Only ONE person can be Accountable for any given decision/activity. If multiple seem needed, break into smaller decisions."
              />

              <PitfallCard
                title="Pitfall 5: Risk Appetite Too Lenient"
                description="Risk appetite thresholds set so high they are effectively unbreachable; not meaningful"
                impact="No escalation trigger; issues not addressed"
                prevention="Risk appetite should be stretching but achievable; based on realistic assessment of good outcomes. E.g., FOS threshold at 50% when industry average is 15% is meaningless."
              />

              <PitfallCard
                title="Pitfall 6: Governance Silos"
                description="Consumer Duty governance operates separately from Risk Committee, Audit Committee; no coordination"
                impact="Duplication of work; conflicting priorities; Board doesn't get holistic view"
                prevention="Clear integration protocols showing how CDOC, Risk Committee, Audit Committee coordinate"
              />

              <PitfallCard
                title="Pitfall 7: Incentives Misaligned with Consumer Duty"
                description="Sales incentives remain pure volume-based; no customer outcome measures"
                impact="Staff incentivized to sell outside target market; poor outcomes"
                prevention="Review all incentive schemes; remove perverse incentives; include quality measures. Staff sanctions under CR6 possible."
              />

              <PitfallCard
                title="Pitfall 8: Decision Authority Unclear"
                description="When issues arise, unclear who has authority to decide; delays in remediation"
                impact="Consumer harm continues while firm debates internally"
                prevention="Decision Authority Matrix must be explicit about who decides what"
              />

              <PitfallCard
                title="Pitfall 9: Governance Effectiveness Not Measured"
                description="Governance structure looks good on paper but not assessed whether working in practice"
                impact="Governance failures not identified; no improvement"
                prevention="Annual governance effectiveness review with metrics"
              />

              <PitfallCard
                title="Pitfall 10: Training One-Off, Not Ongoing"
                description="Board and SMFs received initial Consumer Duty training but no refresher"
                impact="Understanding degrades; regulatory developments not incorporated"
                prevention="Annual refresher training mandatory for Board and SMFs"
              />

              <PitfallCard
                title="Pitfall 11: Culture Assessment Ignored"
                description="Firm assesses culture but doesn't act on findings"
                impact="Toxic culture persists; consumer outcomes suffer"
                prevention="Culture assessment must lead to action plan with accountability"
              />

              <PitfallCard
                title="Pitfall 12: Escalation Too Slow"
                description="Issues identified at operational level but take weeks/months to escalate to CDOC or Board"
                impact="Consumer harm continues unnecessarily"
                prevention="Escalation pathways with tight timelines (days not weeks)"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
