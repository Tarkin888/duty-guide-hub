import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { 
  FileText, 
  Clock, 
  Target, 
  CheckCircle2, 
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Users,
  DollarSign,
  MessageSquare,
  HeadphonesIcon,
  Link2,
  BarChart3,
  GraduationCap,
  Scale,
  ClipboardList,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CDP2PolicyFrameworkPart2() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
            <span>/</span>
            <span>Governance & Planning</span>
            <span>/</span>
            <span className="text-foreground">CD-P2: Policy Framework - Part 2</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">Policy & Framework Development</h1>
                  <Badge variant="secondary">Part 2 of 2</Badge>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Operational Policies - Translating master policy into day-to-day procedures
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    2-3 weeks
                  </Badge>
                  <Badge variant="outline">Governance & Planning</Badge>
                  <Badge className="bg-warning/10 text-warning border-warning/20">
                    Prerequisite: Part 1 Complete
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/governance/policy">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Part 1: Core Architecture
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
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
                  Purpose
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  Develop detailed operational policies that translate the master policy into day-to-day procedures, 
                  covering all four Consumer Duty outcomes, vulnerable customers, distribution chain management, 
                  MI and monitoring, and training requirements.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Part 2 Scope</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <span>Four Outcomes operational policies</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <span>Vulnerable Customer detailed operational policy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <span>Distribution Chain Management Policy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <span>MI and Outcome Monitoring Policy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <span>Training and Competence Policy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <span>Supporting procedures and guidance</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-sm font-medium text-warning mb-2">Required Before Starting Part 2:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Consumer Duty Master Policy approved by Board</li>
                      <li>• Governance Policy Framework established</li>
                      <li>• Senior Management Accountability Policy in place</li>
                      <li>• Policy Governance Standards defined</li>
                      <li>• Version control and approval workflow operational</li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/governance/policy">
                      Review Part 1 Deliverables
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Part 2 Deliverables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-5 w-5 text-primary" />
                      <span className="font-medium">Products & Services Policy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Target markets, product governance, distribution</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="font-medium">Price & Value Policy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">FVA methodology, pricing governance, remediation</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span className="font-medium">Consumer Understanding Policy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Communication standards, testing, accessibility</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <HeadphonesIcon className="h-5 w-5 text-primary" />
                      <span className="font-medium">Consumer Support Policy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Service standards, sludge audit, complaints</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-medium">Vulnerable Customer Policy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Four drivers, identification, outcome parity</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Link2 className="h-5 w-5 text-primary" />
                      <span className="font-medium">Distribution Chain Policy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Manufacturer/distributor obligations, oversight</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span className="font-medium">MI & Monitoring Policy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">KPI framework, reporting, continuous improvement</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span className="font-medium">Training & Competence Policy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Curriculum, assessment, effectiveness</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Integration Requirement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All operational policies developed in Part 2 must align with and explicitly reference the Consumer Duty 
                  Master Policy from Part 1. They should translate high-level principles into specific, actionable guidance 
                  while maintaining consistency across the policy suite.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Combined Timeline (Part 1 + Part 2)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6">
                    <div className="flex gap-4 relative">
                      <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0 z-10">
                        <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Weeks 1-4: Part 1 - Core Policy Architecture</p>
                        <p className="text-sm text-muted-foreground">Master policy, governance framework, standards</p>
                      </div>
                    </div>
                    <div className="flex gap-4 relative">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 z-10">
                        <span className="text-xs text-primary-foreground font-medium">5</span>
                      </div>
                      <div>
                        <p className="font-medium">Week 5: Four Outcomes Policies</p>
                        <p className="text-sm text-muted-foreground">Products, Price, Understanding, Support policies</p>
                      </div>
                    </div>
                    <div className="flex gap-4 relative">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 z-10">
                        <span className="text-xs text-primary-foreground font-medium">6</span>
                      </div>
                      <div>
                        <p className="font-medium">Week 6: Cross-Cutting Policies</p>
                        <p className="text-sm text-muted-foreground">Vulnerable customers, distribution chain, MI, training</p>
                      </div>
                    </div>
                    <div className="flex gap-4 relative">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 z-10">
                        <span className="text-xs font-medium">7</span>
                      </div>
                      <div>
                        <p className="font-medium">Week 7: Procedures and Final Review</p>
                        <p className="text-sm text-muted-foreground">SOPs, approvals, communication, launch</p>
                      </div>
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
                <CardTitle>1. Operational Policy Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RegulatoryQuote
                  quote="Policies should provide clear guidance to staff on how to deliver good outcomes in practice"
                  source="FCA Guidance"
                  reference="FG22/5"
                />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Role of Operational Policies</h4>
                  <p className="text-muted-foreground">
                    Operational policies bridge the gap between high-level principles in the master policy 
                    and day-to-day procedures and workflows. They translate strategic commitments into 
                    specific guidance for staff decision-making.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h5 className="font-medium mb-2">Must Include</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Specific standards and requirements</li>
                        <li>• Practical examples and scenarios</li>
                        <li>• Decision trees and guidance</li>
                        <li>• Quality standards and thresholds</li>
                        <li>• Exception handling procedures</li>
                        <li>• Escalation paths</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h5 className="font-medium mb-2">Must Reference</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Consumer Duty Master Policy</li>
                        <li>• Relevant PRIN 2A requirements</li>
                        <li>• Supporting templates and tools</li>
                        <li>• Related policies and procedures</li>
                        <li>• MI and monitoring requirements</li>
                        <li>• Review triggers and schedule</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Four Outcomes Policy Framework</CardTitle>
                <CardDescription>Each outcome requires a dedicated operational policy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">A. Products & Services Outcome Policy (PRIN 2A.3)</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                    <li>• Target market definition methodology</li>
                    <li>• Product approval process and governance</li>
                    <li>• Product review cycle and triggers</li>
                    <li>• Distribution strategy requirements</li>
                    <li>• Product modification/withdrawal criteria</li>
                    <li>• Closed book management obligations</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">B. Price & Value Outcome Policy (PRIN 2A.4)</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                    <li>• Fair Value Assessment methodology</li>
                    <li>• Review frequency and triggers</li>
                    <li>• Pricing governance and authority</li>
                    <li>• Benchmarking approach</li>
                    <li>• Differential outcomes analysis</li>
                    <li>• Remediation protocols for poor value</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">C. Consumer Understanding Outcome Policy (PRIN 2A.5)</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                    <li>• Communication standards (plain language, accessibility)</li>
                    <li>• Testing requirements (comprehension, behavioural, usability)</li>
                    <li>• Accessibility requirements (WCAG 2.1 AA)</li>
                    <li>• Marketing review process</li>
                    <li>• Digital design standards</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <HeadphonesIcon className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">D. Consumer Support Outcome Policy (PRIN 2A.6)</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                    <li>• Service standards by channel</li>
                    <li>• Accessibility requirements</li>
                    <li>• Switching and exit procedures</li>
                    <li>• Complaints handling standards (DISP alignment)</li>
                    <li>• Third-party support protocols</li>
                    <li>• Vulnerable customer adjustments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Policy Integration Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-4">
                  <p className="font-medium text-primary mb-2">Critical Integration Principle</p>
                  <p className="text-sm text-muted-foreground">
                    All operational policies must work together as a coherent suite. They should reference each other 
                    where appropriate and avoid gaps or overlaps. A customer journey may span multiple policies, 
                    so consistency is essential.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">All Operational Policies Must:</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Reference the master policy explicitly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Align with governance framework</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Define clear SMF ownership</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Include monitoring and MI requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Specify review triggers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Link to procedures and templates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Address proportionality</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Cross-Cutting Themes Across All Policies:</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                        <span>Vulnerable customer considerations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Link2 className="h-4 w-4 text-info mt-0.5 shrink-0" />
                        <span>Distribution chain responsibilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart3 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>MI and outcome monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <GraduationCap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>Training requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <span>Escalation and exception handling</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. FCA Expectations on Operational Policy Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RegulatoryQuote
                  quote="Firms should ensure their policies translate into consistent, good-quality outcomes for customers in practice"
                  source="FCA Multi-firm Review, November 2025"
                  reference="Multi-firm Review"
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-medium text-success mb-3">Good Practice</h4>
                    <ul className="text-sm space-y-2">
                      <li>✓ Policies contain worked examples relevant to firm's business</li>
                      <li>✓ Decision trees for common scenarios</li>
                      <li>✓ Clear thresholds and escalation criteria</li>
                      <li>✓ Vulnerable customer adjustments in each policy</li>
                      <li>✓ MI requirements specified with ownership</li>
                      <li>✓ Strong links to procedures and templates</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <h4 className="font-medium text-destructive mb-3">Poor Practice</h4>
                    <ul className="text-sm space-y-2">
                      <li>✗ Abstract principles without practical guidance</li>
                      <li>✗ One-size-fits-all for different products/channels</li>
                      <li>✗ Vulnerable customers as afterthought</li>
                      <li>✗ No MI or monitoring requirements specified</li>
                      <li>✗ Gap between policy and actual procedures</li>
                      <li>✗ No exception or escalation process</li>
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
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Prerequisite Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Part 2 assumes Part 1 is complete: Consumer Duty Master Policy approved, governance framework 
                      established, and policy standards defined. Steps continue from Step 10 in Part 1.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Badge variant="outline">Phase 5</Badge>
                Four Outcomes Operational Policies (Week 5)
              </h3>

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={11}
                title="Develop Products & Services Outcome Policy"
                items={[
                  { id: "11.1", label: "Draft Section 1: Purpose and Scope", details: "Policy objectives aligned to PRIN 2A.3, products/services in scope, roles/responsibilities, links to master policy" },
                  { id: "11.2", label: "Draft Section 2: Target Market Definition", details: "Granularity requirements, mandatory characteristics (needs, objectives, demographics, vulnerability, channel preferences), negative target market, documentation standards" },
                  { id: "11.3", label: "Draft Section 3: Product Governance Process", details: "Product approval workflow, pre-launch requirements (target market, FVA, testing, risk assessment, compliance sign-off), launch criteria, product champion role" },
                  { id: "11.4", label: "Draft Section 4: Ongoing Product Review", details: "Minimum annual review frequency, trigger events, assessment criteria, remediation options (modify, pricing, restrict, switching, withdraw)" },
                  { id: "11.5", label: "Draft Section 5: Distribution Strategy", details: "Appropriate channels, information to distributors, monitoring compliance, action on mis-selling" },
                  { id: "11.6", label: "Draft Section 6: Closed Book Management", details: "Ongoing obligations, assessment criteria (continue/modify/exit), value monitoring, communications" },
                  { id: "11.7", label: "Include practical examples by product type", responsible: "Product Governance Lead" },
                  { id: "11.8", label: "Reference relevant templates (target market, product review)", responsible: "Compliance" },
                  { id: "11.9", label: "Define escalation when product fails review", responsible: "Risk" },
                  { id: "11.10", label: "Specify MI requirements for product governance", responsible: "MI Team" }
                ]}
              />

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={12}
                title="Develop Price & Value Outcome Policy"
                items={[
                  { id: "12.1", label: "Draft Section 1: Fair Value Definition", details: "FCA definition, multi-dimensional assessment, reasonable relationship test" },
                  { id: "12.2", label: "Draft Section 2: Fair Value Assessment Methodology", details: "Mandatory FVA process, assessment factors (total price, benefits, product nature, target market, comparables, costs/margins, behaviour, limitations)" },
                  { id: "12.3", label: "Include differential outcomes analysis requirement", details: "Segment by vulnerability, tenure, channel; identify disadvantaged groups" },
                  { id: "12.4", label: "Draft Section 3: Pricing Governance", details: "Pricing authority and approval, changes requiring FVA review, vulnerable customer pricing, legacy pricing" },
                  { id: "12.5", label: "Draft Section 4: Review Frequency and Triggers", details: "Minimum annual review, event-driven reviews (costs, market rates, outcomes, regulatory), review documentation" },
                  { id: "12.6", label: "Draft Section 5: Remediation Protocols", details: "Options hierarchy (reduce price, enhance benefits, improve comms, facilitate switching, withdraw), approval process, customer communications, regulatory notification" },
                  { id: "12.7", label: "Draft Section 6: Distributor Obligations", details: "Not undermining FVA, distributor charges, information sharing" },
                  { id: "12.8", label: "Include worked FVA examples", responsible: "Finance/Product", duration: "1 day" },
                  { id: "12.9", label: "Define 'poor value' thresholds", responsible: "Pricing Committee" },
                  { id: "12.10", label: "Specify board reporting on value outcomes", responsible: "Board Secretary" }
                ]}
              />

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={13}
                title="Develop Consumer Understanding Outcome Policy"
                items={[
                  { id: "13.1", label: "Draft Section 1: Communication Standards", details: "Fair, clear, not misleading; plain language (Flesch >60, >70 for vulnerable); active voice; short sentences; jargon avoidance; timing requirements" },
                  { id: "13.2", label: "Draft Section 2: Testing Requirements", details: "Mandatory pre-launch testing; methodologies (comprehension, behavioural, usability); sample size and composition; success criteria; adaptation process" },
                  { id: "13.3", label: "Draft Section 3: Accessibility Standards", details: "Alternative formats (large print 16pt+, Braille, audio, easy read, video with subtitles); WCAG 2.1 AA for digital; channel choice" },
                  { id: "13.4", label: "Draft Section 4: Marketing and Promotions", details: "Balance requirements (benefits AND limitations/risks); approval process; social media standards; influencer/affiliate requirements" },
                  { id: "13.5", label: "Draft Section 5: Ongoing Monitoring", details: "Effectiveness metrics, testing frequency, feedback collection, improvement process" },
                  { id: "13.6", label: "Include examples of good/poor communications", responsible: "Marketing/Compliance", duration: "1 day" },
                  { id: "13.7", label: "Reference testing protocol template", responsible: "Customer Insights" },
                  { id: "13.8", label: "Define approval workflow for communications", responsible: "Marketing" },
                  { id: "13.9", label: "Specify quality standards and metrics", responsible: "Quality Assurance" }
                ]}
              />

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={14}
                title="Develop Consumer Support Outcome Policy"
                items={[
                  { id: "14.1", label: "Draft Section 1: Service Standards", details: "Accessibility (multiple channels, operating hours, wait times, FCR targets); quality (competency, empathy, accuracy, resolution)" },
                  { id: "14.2", label: "Draft Section 2: Customer Journey Standards", details: "Ease of support access, switching/exiting, claims, complaints; symmetry principle (as easy to cancel as purchase)" },
                  { id: "14.3", label: "Draft Section 3: Sludge Audit Requirements", details: "Definition of sludge practices, prohibition of unreasonable barriers, regular journey audits, remediation" },
                  { id: "14.4", label: "Draft Section 4: Vulnerable Customer Support", details: "Identification and recording, adjustments by driver, staff training, specialist support, third-party access (PoA, carers)" },
                  { id: "14.5", label: "Draft Section 5: Complaints Handling", details: "DISP alignment, root cause analysis requirement, continuous improvement link, board reporting on themes" },
                  { id: "14.6", label: "Draft Section 6: Monitoring and MI", details: "Service quality metrics, channel performance, complaint analysis, outcome monitoring" },
                  { id: "14.7", label: "Include service standards by channel", responsible: "Operations", duration: "1 day" },
                  { id: "14.8", label: "Define 'unreasonable barrier' with examples", responsible: "Customer Experience" },
                  { id: "14.9", label: "Specify vulnerable customer adjustments", responsible: "Vulnerability Lead" },
                  { id: "14.10", label: "Reference journey mapping and sludge audit templates", responsible: "CX Team" }
                ]}
              />
            </div>

            <Separator className="my-8" />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Badge variant="outline">Phase 6</Badge>
                Cross-Cutting Operational Policies (Week 6)
              </h3>

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={15}
                title="Develop Vulnerable Customer Policy (Detailed)"
                items={[
                  { id: "15.1", label: "Draft Section 1: Definition and Four Drivers", details: "FCA definition; Health driver (examples, indicators, adjustments); Life events; Resilience; Capability; intersecting vulnerabilities" },
                  { id: "15.2", label: "Draft Section 2: Identification Approach", details: "Proactive methods (data analytics, staff recognition, life event triggers); self-declaration; indicators and signals; tactful inquiry scripts" },
                  { id: "15.3", label: "Draft Section 3: Recording and Data Protection", details: "What to record (drivers, circumstances, preferences); how to record (CRM, consent, visibility); UK GDPR compliance; review requirements" },
                  { id: "15.4", label: "Draft Section 4: Treatment Standards by Outcome", details: "Products (inclusive design, testing); Price (no exploitation, fair access); Understanding (accessible formats, testing); Support (flexible adjustments)" },
                  { id: "15.5", label: "Draft Section 5: Staff Training and Capability", details: "Role-based training requirements, competency standards, specialist teams, safeguarding awareness" },
                  { id: "15.6", label: "Draft Section 6: Outcome Monitoring", details: "Outcome parity analysis, metrics to monitor (vulnerable vs all), variance thresholds, board reporting" },
                  { id: "15.7", label: "Include extensive practical examples", responsible: "Vulnerability Champion", duration: "2 days" },
                  { id: "15.8", label: "Reference all vulnerability templates from CD-I5", responsible: "Compliance" },
                  { id: "15.9", label: "Define escalation for safeguarding concerns", responsible: "Safeguarding Lead" },
                  { id: "15.10", label: "Specify outcome parity targets", responsible: "MI Team" }
                ]}
              />

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={16}
                title="Develop Distribution Chain Management Policy"
                items={[
                  { id: "16.1", label: "Draft Section 1: Manufacturer Obligations", details: "Product information to distributors, FVA summary provision, target market sharing, distribution strategy, ongoing information sharing, monitoring distributor compliance" },
                  { id: "16.2", label: "Draft Section 2: Distributor Obligations", details: "Information gathering from manufacturers, distribution strategy implementation, own charges assessment, feedback to manufacturers, outcome monitoring" },
                  { id: "16.3", label: "Draft Section 3: Contractual Requirements", details: "Information sharing agreements, SLAs, monitoring/reporting, remediation responsibilities, termination clauses" },
                  { id: "16.4", label: "Draft Section 4: Third-Party Oversight", details: "Due diligence requirements, ongoing monitoring, Appointed Representative management, outsourcing arrangements, issue escalation" },
                  { id: "16.5", label: "Draft Section 5: Chain-Wide Accountability", details: "End-to-end outcome monitoring, coordinated remediation, regulatory reporting, culture alignment" },
                  { id: "16.6", label: "Include distribution chain mapping guidance", responsible: "Distribution", duration: "1 day" },
                  { id: "16.7", label: "Reference manufacturer/distributor agreement templates", responsible: "Legal" },
                  { id: "16.8", label: "Define information flow requirements", responsible: "Operations" },
                  { id: "16.9", label: "Specify monitoring frequency and methods", responsible: "Compliance" }
                ]}
              />

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={17}
                title="Develop MI and Outcome Monitoring Policy"
                items={[
                  { id: "17.1", label: "Draft Section 1: MI Framework Principles", details: "Outcome-focused not just process; leading and lagging indicators; data quality standards; timeliness and relevance; actionability" },
                  { id: "17.2", label: "Draft Section 2: Data Sources", details: "Internal (CRM, complaints, claims, transactions); customer feedback (surveys, panels, social); external (FOS, market, benchmarks); testing results" },
                  { id: "17.3", label: "Draft Section 3: KPI Framework", details: "KPIs by outcome area, vulnerable customer KPIs (outcome parity), distribution chain KPIs, thresholds, RAG criteria" },
                  { id: "17.4", label: "Draft Section 4: Reporting Requirements", details: "Management reporting (frequency, format, audience); board reporting (quarterly minimum, annual comprehensive); regulatory reporting; exception reporting" },
                  { id: "17.5", label: "Draft Section 5: Monitoring Processes", details: "Data collection and validation, analysis and interpretation, issue identification, root cause analysis, remediation tracking" },
                  { id: "17.6", label: "Draft Section 6: Continuous Improvement", details: "Lessons learned capture, MI framework refinement, dashboard evolution, regulatory horizon scanning" },
                  { id: "17.7", label: "Define all KPIs with calculation methodologies", responsible: "MI Team", duration: "2 days" },
                  { id: "17.8", label: "Reference MI dashboard specification template", responsible: "Data Team" },
                  { id: "17.9", label: "Specify data governance requirements", responsible: "Data Governance" },
                  { id: "17.10", label: "Include reporting timetable", responsible: "Board Secretary" }
                ]}
              />

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={18}
                title="Develop Training and Competence Policy"
                items={[
                  { id: "18.1", label: "Draft Section 1: Training Philosophy", details: "Role-based approach, competency not attendance, ongoing development, culture embedding" },
                  { id: "18.2", label: "Draft Section 2: Training Curriculum", details: "Board/NEDs (governance); SMFs (accountability); Product (design, FVA); Distribution/Sales (target market); Customer Service (vulnerability); Marketing (testing); Compliance/Risk (monitoring); All staff (principles, CR6)" },
                  { id: "18.3", label: "Draft Section 3: Training Delivery", details: "E-learning modules, classroom training, workshops/simulations, role plays (vulnerability), on-the-job coaching, refresher training" },
                  { id: "18.4", label: "Draft Section 4: Competency Assessment", details: "Knowledge testing, skills assessment (role plays, observations), quality monitoring (calls, files), 360-degree feedback, competency matrices" },
                  { id: "18.5", label: "Draft Section 5: Training Effectiveness", details: "Completion rates (>95% target), assessment pass rates (>80% target), behavioural change measures, outcome improvements, staff confidence surveys" },
                  { id: "18.6", label: "Draft Section 6: Ongoing Development", details: "Annual refresher requirements, regulatory update training, career pathways, specialist certifications" },
                  { id: "18.7", label: "Define competency standards by role", responsible: "HR/L&D", duration: "2 days" },
                  { id: "18.8", label: "Specify assessment approaches", responsible: "Learning Team" },
                  { id: "18.9", label: "Include training effectiveness metrics", responsible: "HR Analytics" }
                ]}
              />
            </div>

            <Separator className="my-8" />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Badge variant="outline">Phase 7</Badge>
                Procedures and Guidance Development (Week 7)
              </h3>

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={19}
                title="Develop Supporting Procedures"
                items={[
                  { id: "19.1", label: "Create Product Approval SOP", details: "Step-by-step process from concept to launch with decision points" },
                  { id: "19.2", label: "Create FVA Completion Procedure", details: "How to complete a Fair Value Assessment, data sources, sign-offs" },
                  { id: "19.3", label: "Create Communication Testing Procedure", details: "How to conduct comprehension, behavioural, usability testing" },
                  { id: "19.4", label: "Create Vulnerability Identification and Recording Procedure", details: "Tactful inquiry, recording in CRM, consent, adjustments" },
                  { id: "19.5", label: "Create Complaints Root Cause Analysis Procedure", details: "How to conduct RCA, categorisation, escalation, tracking" },
                  { id: "19.6", label: "Create Board Reporting Pack Preparation Procedure", details: "Data gathering, dashboard preparation, narrative, approval" },
                  { id: "19.7", label: "Develop process maps and workflows for each procedure", responsible: "Process Team", duration: "3 days" },
                  { id: "19.8", label: "Create job aids and quick reference guides", responsible: "Training Team" },
                  { id: "19.9", label: "Develop decision trees for common scenarios", responsible: "Operations" },
                  { id: "19.10", label: "Ensure all procedures max 2-4 pages with visuals", responsible: "Documentation" }
                ]}
              />

              <ChecklistSection
                moduleId="cd-p2-part2"
                stepNumber={20}
                title="Conduct Policy Suite Review and Approval"
                items={[
                  { id: "20.1", label: "Review for completeness - all regulatory requirements covered", responsible: "Compliance" },
                  { id: "20.2", label: "Review for consistency - no conflicts between policies", responsible: "Policy Team" },
                  { id: "20.3", label: "Review for clarity - plain language, examples, structure", responsible: "Communications" },
                  { id: "20.4", label: "Review for alignment - policies support each other", responsible: "Risk" },
                  { id: "20.5", label: "Review for implementability - realistic, resourced", responsible: "Operations" },
                  { id: "20.6", label: "Present to Oversight Committee for review", responsible: "CCO" },
                  { id: "20.7", label: "Present summary to Board for approval", responsible: "CEO/CCO" },
                  { id: "20.8", label: "Obtain required approvals and document", responsible: "Board Secretary" },
                  { id: "20.9", label: "Publish all policies to repository", responsible: "Document Control" },
                  { id: "20.10", label: "Launch comprehensive communication campaign", responsible: "Internal Comms" },
                  { id: "20.11", label: "Integrate policies into training programmes", responsible: "L&D" },
                  { id: "20.12", label: "Verify all policies have named SMF owner", responsible: "Compliance" },
                  { id: "20.13", label: "Verify all policies have review date set", responsible: "Policy Team" },
                  { id: "20.14", label: "Verify all policies tested with frontline staff", responsible: "Operations" }
                ]}
              />
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TemplateCard
                title="Products & Services Outcome Policy"
                description="Comprehensive 12-page policy covering target markets, product governance, distribution, and closed books"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="Price & Value Outcome Policy"
                description="Detailed 10-page policy covering FVA methodology, pricing governance, and remediation protocols"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="Consumer Understanding Policy"
                description="Comprehensive 10-page policy covering communication standards, testing, and accessibility"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="Consumer Support Outcome Policy"
                description="Detailed 12-page policy covering service standards, sludge audits, and complaints handling"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="Vulnerable Customer Operational Policy"
                description="Comprehensive 15-page policy covering four drivers, identification, treatment, and outcome monitoring"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="Distribution Chain Management Policy"
                description="10-page policy covering manufacturer/distributor obligations, contracts, and oversight"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="MI and Outcome Monitoring Policy"
                description="Detailed 10-page policy covering KPI framework, reporting, and continuous improvement"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="Training and Competence Policy"
                description="Comprehensive 10-page policy covering curriculum, delivery, assessment, and effectiveness"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="Procedure Development Template"
                description="Standard format for SOPs including purpose, steps, decision points, and quality standards"
                format="Word"
                onDownload={() => {}}
                onPreview={() => {}}
              />
              <TemplateCard
                title="Policy Implementation Tracker"
                description="Comprehensive tracker showing status, approvals, communication, and training for all policies"
                format="Excel"
                onDownload={() => {}}
                onPreview={() => {}}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Procedure Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">All Procedures Must Include:</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Procedure title and reference number</li>
                      <li>• Purpose and scope</li>
                      <li>• Roles and responsibilities</li>
                      <li>• Step-by-step numbered instructions</li>
                      <li>• Decision points (clearly marked)</li>
                      <li>• Inputs and outputs</li>
                      <li>• Systems and tools required</li>
                      <li>• Quality standards</li>
                      <li>• Escalation path</li>
                      <li>• Related policies and templates</li>
                      <li>• Review cycle</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Format Standards:</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Maximum 2-4 pages</li>
                      <li>• Visual flowcharts and diagrams</li>
                      <li>• Numbered steps for traceability</li>
                      <li>• Decision points as diamonds</li>
                      <li>• Examples and scenarios included</li>
                      <li>• Links to templates and tools</li>
                      <li>• Plain language (Flesch &gt;70)</li>
                      <li>• Tested with actual users before launch</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    Part 2 Completion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm">All eight operational policies drafted and approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm">Policies written in plain language (Flesch &gt;60)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm">Supporting procedures developed for key processes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm">Policies integrated with templates and tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm">All policies communicated to relevant staff</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm">Policies incorporated into training curriculum</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-info" />
                    Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-info" />
                    <span className="text-sm">Operational policies align with master policy (Part 1)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-info" />
                    <span className="text-sm">No conflicts between policies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-info" />
                    <span className="text-sm">Clear linkages and cross-references</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-info" />
                    <span className="text-sm">Procedures operationalise policies effectively</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Four Outcomes Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">Comprehensive policy for each outcome</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">Clear standards and expectations defined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">Monitoring and MI requirements specified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">Escalation paths established</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-warning" />
                    Cross-Cutting Themes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-sm">Vulnerable customer policy operational</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-sm">Distribution chain management framework complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-sm">MI and monitoring approach defined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-sm">Training requirements specified</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Readiness Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-3">Regulatory Compliance</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>✓ All PRIN 2A requirements addressed</li>
                      <li>✓ FCA guidance incorporated</li>
                      <li>✓ Good practice examples included</li>
                      <li>✓ Common pitfalls addressed</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-3">Quality Gates</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>✓ Every policy has named SMF owner</li>
                      <li>✓ Every policy has review date set</li>
                      <li>✓ Every policy has supporting procedures</li>
                      <li>✓ Every policy tested with frontline staff</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-3">Operational Readiness</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>✓ Policy suite ready for rollout</li>
                      <li>✓ Staff trained on policies</li>
                      <li>✓ Compliance monitoring defined</li>
                      <li>✓ Board oversight established</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Combined Timeline (Part 1 + Part 2)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4">Week</th>
                        <th className="text-left py-2 pr-4">Part</th>
                        <th className="text-left py-2 pr-4">Focus</th>
                        <th className="text-left py-2">Key Deliverables</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-muted/30">
                        <td className="py-2 pr-4">1</td>
                        <td className="py-2 pr-4">Part 1</td>
                        <td className="py-2 pr-4">Framework Design</td>
                        <td className="py-2">Policy architecture, ownership assigned</td>
                      </tr>
                      <tr className="border-b bg-muted/30">
                        <td className="py-2 pr-4">1-3</td>
                        <td className="py-2 pr-4">Part 1</td>
                        <td className="py-2 pr-4">Master Policy</td>
                        <td className="py-2">Consumer Duty Master Policy drafted and consulted</td>
                      </tr>
                      <tr className="border-b bg-muted/30">
                        <td className="py-2 pr-4">2-3</td>
                        <td className="py-2 pr-4">Part 1</td>
                        <td className="py-2 pr-4">Governance Policies</td>
                        <td className="py-2">Oversight Committee TOR, SMF accountability policy</td>
                      </tr>
                      <tr className="border-b bg-muted/30">
                        <td className="py-2 pr-4">4</td>
                        <td className="py-2 pr-4">Part 1</td>
                        <td className="py-2 pr-4">Communication</td>
                        <td className="py-2">Master policy approved, communicated</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 pr-4 font-medium">5</td>
                        <td className="py-2 pr-4 font-medium">Part 2</td>
                        <td className="py-2 pr-4 font-medium">Four Outcomes</td>
                        <td className="py-2 font-medium">Products, Price, Understanding, Support policies</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 pr-4 font-medium">6</td>
                        <td className="py-2 pr-4 font-medium">Part 2</td>
                        <td className="py-2 pr-4 font-medium">Cross-Cutting</td>
                        <td className="py-2 font-medium">Vulnerability, Distribution, MI, Training policies</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">7</td>
                        <td className="py-2 pr-4 font-medium">Part 2</td>
                        <td className="py-2 pr-4 font-medium">Procedures & Review</td>
                        <td className="py-2 font-medium">SOPs, approvals, launch</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <div className="grid gap-4">
              <PitfallCard
                title="Pitfall 11: Policies Too High-Level"
                description="Operational policies that simply repeat master policy without adding detail or specific guidance for staff decision-making."
                impact="Staff don't know what to do in practice; policies become meaningless documents."
                prevention="Operational policies must provide specific guidance, decision criteria, worked examples, and clear standards. Don't just say 'assess fair value' - specify the 8-step process, data sources, and criteria."
              />
              
              <PitfallCard
                title="Pitfall 12: Policies Not Linked to Procedures"
                description="Gap between what the policy says staff should do and what procedures actually require them to do."
                impact="Policy-procedure mismatch causes confusion and non-compliance; staff follow procedures that contradict policy."
                prevention="Develop procedures in parallel with policies. Have policy owners review procedures for alignment. Test end-to-end that policy requirements flow through to procedure steps."
              />

              <PitfallCard
                title="Pitfall 13: No Practical Examples"
                description="Policies are abstract principles without concrete examples relevant to the firm's actual products and services."
                impact="Staff struggle to apply policies to real situations; inconsistent interpretation and application."
                prevention="Include minimum 2-3 worked examples per policy, covering different scenarios. Use real product names and situations from your business."
              />

              <PitfallCard
                title="Pitfall 14: Overlooking Vulnerable Customers"
                description="Vulnerability mentioned in high-level principles but not embedded in operational policies for each outcome."
                impact="Vulnerable customers receive same treatment as everyone else; potential for harm not mitigated."
                prevention="Every operational policy must explicitly address vulnerable customers. Include specific adjustments, staff guidance, and monitoring requirements for vulnerable customer outcomes."
              />

              <PitfallCard
                title="Pitfall 15: Weak MI Requirements"
                description="Policies don't specify what monitoring is required, what data to collect, or what thresholds trigger action."
                impact="Cannot demonstrate policy compliance or identify issues early; no evidence for regulatory examination."
                prevention="Every policy must specify MI requirements: what metrics, data sources, frequency, thresholds, reporting, and ownership. Make monitoring auditable."
              />

              <PitfallCard
                title="Pitfall 16: No Differentiation by Product/Channel"
                description="One-size-fits-all policies that don't acknowledge differences between products, channels, or customer segments."
                impact="Policies don't work for all situations; staff must interpret or workaround; inconsistent outcomes."
                prevention="Acknowledge variations by product type (retail vs institutional), channel (digital vs branch), and customer segment. Provide channel-specific or product-specific guidance where needed."
              />

              <PitfallCard
                title="Pitfall 17: Insufficient Distributor Focus"
                description="Policies focus on own activities but neglect obligations regarding distribution chain partners."
                impact="Weak oversight of how products actually sold to customers; regulatory expectations not met."
                prevention="Explicit distribution chain policies with clear manufacturer and distributor obligations, contractual requirements, monitoring methods, and escalation when issues identified."
              />

              <PitfallCard
                title="Pitfall 18: Procedures Too Complex"
                description="Procedures so detailed and lengthy (10+ pages) that nobody reads or follows them."
                impact="Shadow processes emerge; actual practice differs from documented procedures; compliance testing meaningless."
                prevention="Keep procedures concise (max 2-4 pages), use visuals (flowcharts, decision trees), test with actual users before launch. If procedure exceeds 4 pages, break into sub-procedures."
              />

              <PitfallCard
                title="Pitfall 19: No Exception Process"
                description="Rigid policies with no flexibility for genuine exceptions where policy cannot reasonably be followed."
                impact="Staff workaround policies without approval; compliance breaches go unreported; actual practice hidden from oversight."
                prevention="Define exception request and approval process in every policy. Specify who can approve exceptions, documentation requirements, time limits, and tracking."
              />

              <PitfallCard
                title="Pitfall 20: Launch Without Training"
                description="Policies published but staff not trained on how to apply them in their day-to-day roles."
                impact="Staff unaware policies exist or don't understand implications for their work; policies not embedded."
                prevention="Training must be delivered before or concurrent with policy launch. Role-based training explaining 'what this means for you'. Test comprehension. Include in onboarding for new starters."
              />
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Part 2 Pitfall Prevention Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Quality Assurance</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Peer review all policies before approval</li>
                      <li>• Test with frontline staff for comprehension</li>
                      <li>• Check policy-procedure-template alignment</li>
                      <li>• Verify MI requirements are complete</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Launch Readiness</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Training developed and scheduled</li>
                      <li>• Communication plan executed</li>
                      <li>• Exception process documented</li>
                      <li>• Monitoring approach operational</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Module Completion Note */}
        <Card className="mt-8 border-success/20 bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" />
              Module CD-P2 Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This completes Module CD-P2: Policy & Framework Development (both parts). You now have a comprehensive 
              Consumer Duty policy suite covering:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-background rounded-lg">
                <h4 className="font-medium mb-2">Part 1 Deliverables</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consumer Duty Master Policy</li>
                  <li>• Governance Policy Framework</li>
                  <li>• Senior Management Accountability Policy</li>
                  <li>• Policy Governance Standards</li>
                </ul>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <h4 className="font-medium mb-2">Part 2 Deliverables</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Four Outcomes operational policies</li>
                  <li>• Cross-cutting operational policies</li>
                  <li>• Supporting procedures and guidance</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Next modules</strong> will focus on implementing these policies across the organization through 
              the Four Outcomes Implementation modules (CD-I1 through CD-I6).
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="/governance/policy">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Part 1: Core Architecture
            </Link>
          </Button>
          <Button asChild>
            <Link to="/outcomes/products">
              Next: CD-I1 Products & Services
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}