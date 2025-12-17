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
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  Clock, 
  Users, 
  Target,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Database,
  Shield,
  Settings,
  Server,
  Workflow,
  BarChart3,
  Lock,
  Layers,
  MonitorCheck,
  Zap,
  Cloud,
  HardDrive,
  Network
} from "lucide-react";

const CDT3ATechnologyRequirementsPart1 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print initiated",
      description: "The module content has been sent to your printer.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Module content is being prepared for PDF export.",
    });
  };

  const handlePreviewTemplate = (templateName: string) => {
    toast({
      title: "Template Preview",
      description: `Opening preview for ${templateName}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="hidden md:flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Enablement
                </Badge>
                <Badge variant="outline" className="bg-info/10 text-info border-info/20">
                  Technology
                </Badge>
                <Badge variant="secondary">Part 1 of 2</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Module Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <Server className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                CD-T3A: Technology Requirements & System Configuration
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Part 1: Requirements, Architecture & Development
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Specify, configure, and deploy technology systems to support Consumer Duty monitoring, 
            evidence collection, and reporting. This module covers requirements definition through 
            system configuration and testing.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>12-20 weeks (requirements through deployment)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>CTO/CIO, Technology Team, Data Architects</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              <span>8 Key Deliverables</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 h-auto p-2 bg-muted/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="regulatory" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Regulatory
            </TabsTrigger>
            <TabsTrigger value="implementation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Implementation
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Templates
            </TabsTrigger>
            <TabsTrigger value="success" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Success Criteria
            </TabsTrigger>
            <TabsTrigger value="pitfalls" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Pitfalls
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Regulatory Context */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Regulatory Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Consumer Duty requires robust MI and data analytics (FG22/5 Section 10)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Technology underpins outcome monitoring across all four outcomes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Board reporting depends on quality data infrastructure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>FCA expectation: "High-quality, contextualized MI" to evidence compliance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Critical Dependencies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-warning" />
                  Critical Dependencies
                </CardTitle>
                <CardDescription>
                  Complete these modules before starting technology implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="font-medium">CD-M1: MI & Outcome Monitoring Framework</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Defines what to measure (18 essential KPIs)</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium">CD-I1 through CD-I4: Four Outcomes</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Define data collection points for each outcome</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4 text-primary" />
                      <span className="font-medium">CD-I7: Data & Evidence Management</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Defines evidence requirements and retention</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="font-medium">CD-M3: Board & Executive Reporting</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Defines reporting outputs and formats</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scope */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-success/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    In Scope
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>MI dashboard and reporting platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Customer data platforms and analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Outcome monitoring and tracking systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Evidence repository and document management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Integration with existing systems (CRM, policy admin, claims)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Automation of data collection and reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>User access and training systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Out of Scope
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      <span>Core banking/insurance system replacements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      <span>Complete digital transformation programmes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      <span>Customer-facing channel development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      <span>Product administration system overhauls</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Key Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Key Deliverables - Part 1 (CD-T3A)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Technology Requirements Specification", desc: "Comprehensive requirements for all dashboards and systems" },
                    { title: "System Architecture Design", desc: "High-level and detailed architecture documentation" },
                    { title: "Vendor Evaluation Framework", desc: "Criteria and scoring for technology procurement" },
                    { title: "Integration Architecture Diagram", desc: "Visual mapping of all system connections" },
                    { title: "Data Flow Mapping", desc: "Source-to-dashboard data lineage documentation" },
                    { title: "System Configuration Plan", desc: "Detailed build/configure specifications" },
                    { title: "User Acceptance Testing Strategy", desc: "UAT scenarios and test scripts" },
                    { title: "Go-Live Readiness Checklist", desc: "Pre-deployment verification criteria" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-muted/10">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stakeholder Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Stakeholder Map (RACI)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="font-semibold text-destructive mb-2">Accountable</p>
                    <p className="text-sm">CTO/CIO or Head of Technology</p>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <p className="font-semibold text-warning mb-2">Responsible</p>
                    <p className="text-sm">Technology delivery team, Data architects, Business analysts</p>
                  </div>
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <p className="font-semibold text-info mb-2">Consulted</p>
                    <p className="text-sm">Compliance, Risk, Product, Operations, Customer Service</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted border border-border">
                    <p className="font-semibold mb-2">Informed</p>
                    <p className="text-sm">Board Technology Committee, Executive Committee, Internal Audit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology Investment Considerations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Technology Investment Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: Layers, title: "Build vs Buy", desc: "Decision framework for solution approach" },
                    { icon: Cloud, title: "Cloud vs On-Premise", desc: "Infrastructure deployment strategy" },
                    { icon: Network, title: "Integration Complexity", desc: "Assessment of system connections" },
                    { icon: BarChart3, title: "Total Cost of Ownership", desc: "TCO analysis over 5 years" },
                    { icon: Zap, title: "Scalability", desc: "Future-proofing and growth capacity" },
                    { icon: Lock, title: "Vendor Lock-in", desc: "Risk assessment and mitigation" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                      <item.icon className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Critical Success Factors */}
            <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-success" />
                  Critical Success Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Requirements driven by business outcomes, not technology features",
                    "Strong integration with existing systems (avoid data silos)",
                    "User-centric design (dashboards used by board, executives, operational teams)",
                    "Data quality built in from source systems",
                    "Scalable architecture for growing data volumes",
                    "Robust security and data protection",
                    "Clear support and maintenance model",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <RegulatoryQuote
              source="FG22/5 Section 10"
              quote="Firms should use appropriate data and MI to understand whether they are delivering good outcomes for their customers. This should be supported by appropriate governance to review the data and MI, identify areas of concern, and take action to address risks and issues."
            />

            {/* Data Quality Standards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  A. Data Quality Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RegulatoryQuote
                  source="FCA Board Reports Review, November 2024"
                  quote="Poor data quality undermines firms' ability to conduct robust assessments and provide adequate assurance to the board"
                  variant="warning"
                />
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-3">Data Quality Requirements:</h4>
                    <ul className="space-y-2">
                      {[
                        { label: "Accurate", desc: "Correct and error-free" },
                        { label: "Complete", desc: "No material gaps" },
                        { label: "Timely", desc: "Available when needed for decisions" },
                        { label: "Relevant", desc: "Aligned to four outcomes" },
                        { label: "Consistent", desc: "Comparable across time and segments" },
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                          <span><strong>{item.label}:</strong> {item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-destructive">Common Data Quality Failures:</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Relying solely on complaints data (lagging indicator, customer burden)",
                        "Missing closed book product data",
                        "Unable to segment by vulnerable customer characteristics",
                        "Inconsistent definitions across business units",
                        "Manual data collection with high error rates",
                        "Significant lag between event and reporting",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MI Framework Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  B. MI Framework Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Must Support Monitoring of:</h4>
                    <ul className="space-y-3">
                      <li className="p-3 rounded-lg bg-muted/30 border border-border/50">
                        <p className="font-medium text-primary">Products & Services Outcome</p>
                        <p className="text-sm text-muted-foreground">Target market adherence, product performance, post-sale engagement</p>
                      </li>
                      <li className="p-3 rounded-lg bg-muted/30 border border-border/50">
                        <p className="font-medium text-primary">Price & Value Outcome</p>
                        <p className="text-sm text-muted-foreground">Fair value assessment metrics, pricing benchmarks, value realization</p>
                      </li>
                      <li className="p-3 rounded-lg bg-muted/30 border border-border/50">
                        <p className="font-medium text-primary">Consumer Understanding Outcome</p>
                        <p className="text-sm text-muted-foreground">Communication testing results, comprehension scores, confusion indicators</p>
                      </li>
                      <li className="p-3 rounded-lg bg-muted/30 border border-border/50">
                        <p className="font-medium text-primary">Consumer Support Outcome</p>
                        <p className="text-sm text-muted-foreground">Service quality metrics, complaint themes, accessibility measures</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Must Enable:</h4>
                    <ul className="space-y-2">
                      {[
                        "Differential outcome analysis by customer segment (especially vulnerable customers)",
                        "Trend analysis over time",
                        "Root cause investigation when issues identified",
                        "Board-level reporting with executive summaries",
                        "Operational drilldown for detailed investigation",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology Governance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  C. Technology Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="font-medium">Board/Executive responsibilities:</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      "Approve technology investment for Consumer Duty",
                      "Ensure data architecture supports outcome monitoring",
                      "Review MI quality and challenge management assumptions",
                      "Ensure technology risks assessed and mitigated",
                      "Approve vendor selections for critical systems",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  D. Data Protection and Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-3">UK GDPR Compliance Requirements:</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Lawful basis for data processing (legitimate interests for monitoring)",
                        "Data minimization (collect only what's needed)",
                        "Purpose limitation (use data only for Consumer Duty compliance)",
                        "Security measures (encryption, access controls)",
                        "Vulnerability data handling (special category if health-related)",
                        "Customer rights (access, rectification, erasure)",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-info mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Distribution Chain Integration:</h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="font-medium text-sm">For Manufacturers:</p>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Must receive MI from distributors on sales, complaints, feedback</li>
                          <li>• Technology must enable information sharing across chain</li>
                        </ul>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="font-medium text-sm">For Distributors:</p>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Must report relevant data back to manufacturers</li>
                          <li>• Systems must capture point-of-sale and post-sale information</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FCA Findings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  FCA Multi-Firm Review Findings (2024-2025)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-success mb-3">Good Practice Identified:</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Sophisticated data analytics to identify vulnerable customers proactively",
                        "Real-time dashboards enabling rapid identification of emerging issues",
                        "Automated alerts when thresholds breached",
                        "Integration of multiple data sources providing holistic customer view",
                        "Board dashboards with drill-down capability",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-destructive mb-3">Areas for Improvement:</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Simply repackaging existing MI without considering new data needed",
                        "Data gaps, particularly for closed book and vulnerable segments",
                        "Insufficient data to justify conclusions in board reports",
                        "Over-reliance on complaints data as primary outcome indicator",
                        "Manual data collection making timely reporting impossible",
                        "Lack of clear data governance and ownership",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Build vs Buy Framework */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Technology Decision Framework: Build vs Buy vs Configure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Approach</th>
                        <th className="text-left p-3 font-semibold">When Appropriate</th>
                        <th className="text-left p-3 font-semibold">Pros</th>
                        <th className="text-left p-3 font-semibold">Cons</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-3 font-medium">Build Custom</td>
                        <td className="p-3 text-muted-foreground">Unique requirements; existing platforms inadequate; in-house capability</td>
                        <td className="p-3 text-success">Full control; perfect fit; IP ownership</td>
                        <td className="p-3 text-destructive">High cost; long timeline; maintenance burden</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-3 font-medium">Buy Off-Shelf</td>
                        <td className="p-3 text-muted-foreground">Standard requirements; proven solutions; speed priority</td>
                        <td className="p-3 text-success">Faster; lower risk; vendor support; best practice</td>
                        <td className="p-3 text-destructive">Less flexible; license costs; vendor dependency</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Configure Existing</td>
                        <td className="p-3 text-muted-foreground">Existing platforms extensible; budget constraints; quick deployment</td>
                        <td className="p-3 text-success">Leverage existing investment; faster; lower cost</td>
                        <td className="p-3 text-destructive">Limited by platform capabilities</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-info/10 border border-info/20">
                  <h4 className="font-semibold text-info mb-2">Recommended Approach for Most Firms:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Configure</strong> existing CRM/data warehouse for data collection</li>
                    <li>• <strong>Buy</strong> specialized Consumer Duty MI/dashboard platform</li>
                    <li>• <strong>Build</strong> bespoke integrations and reports as needed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Key Technology Components */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Key Technology Components
                </CardTitle>
                <CardDescription>Essential technology stack for Consumer Duty</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: Database, layer: "A. Data Layer", name: "Customer Data Platform (CDP)", purpose: "Centralized customer data aggregation", data: "Demographics, product holdings, interactions, complaints, vulnerability flags" },
                    { icon: BarChart3, layer: "B. Analytics Layer", name: "Business Intelligence (BI)", purpose: "Data analysis, segmentation, trend identification", data: "SQL queries, statistical analysis, predictive modeling" },
                    { icon: MonitorCheck, layer: "C. Visualization Layer", name: "Dashboard & Reporting", purpose: "Present insights to different audiences", data: "Interactive, drill-down, export, mobile-friendly" },
                    { icon: FileText, layer: "D. Evidence Repository", name: "Document Management (DMS)", purpose: "Store policies, assessments, meeting minutes", data: "Version control, audit trail, retention management" },
                    { icon: Workflow, layer: "E. Workflow Automation", name: "Case Management & Workflow", purpose: "Automate data collection, approvals, tracking", data: "Task assignment, notifications, escalation" },
                    { icon: Network, layer: "F. Integration Middleware", name: "API Gateway & ETL", purpose: "Connect systems, transform data, ensure flows", data: "Real-time and batch integration, validation" },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/50 bg-muted/10">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">{item.layer}</span>
                      </div>
                      <p className="font-semibold text-sm mb-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{item.purpose}</p>
                      <p className="text-xs text-muted-foreground italic">{item.data}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            {/* Phase 1 */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <CardTitle>Phase 1: Requirements Definition</CardTitle>
                    <CardDescription>Weeks 1-4</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="space-y-4">
                  <AccordionItem value="step1" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <MonitorCheck className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Step 1: Define MI and Dashboard Requirements</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Board Dashboard Requirements"
                        storageKey="cdt3a-step1-board"
                        items={[
                          "Overall Consumer Duty status (RAG rating)",
                          "Progress overview (four outcomes)",
                          "Key metrics summary (18 essential KPIs from CD-M1)",
                          "Vulnerable customer outcome parity indicators",
                          "Top issues requiring attention",
                          "Action tracker (remediation plans)",
                          "Export to PDF functionality",
                        ]}
                      />
                      <ChecklistSection
                        title="Executive Dashboard Requirements"
                        storageKey="cdt3a-step1-exec"
                        items={[
                          "Detailed metrics by outcome",
                          "Trend analysis over time",
                          "Segmentation (product, channel, customer type)",
                          "Drill-down to underlying data",
                          "Threshold breaches and alerts",
                          "Detailed action plans",
                          "Real-time updates capability",
                        ]}
                      />
                      <ChecklistSection
                        title="Operational Dashboards Requirements"
                        storageKey="cdt3a-step1-ops"
                        items={[
                          "Team-specific metrics (product, service, compliance)",
                          "Granular data with full detail",
                          "Filtering and custom views",
                          "Data export for analysis",
                          "Integration with operational systems",
                          "Role-based access controls",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step2" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Step 2: Define Data Collection Requirements</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Leading Indicators (8 KPIs)"
                        storageKey="cdt3a-step2-leading"
                        items={[
                          "KPI 1: Communication Clarity Score - Content management system source",
                          "KPI 2: Pre-Launch Product Testing Success Rate - Product management source",
                          "KPI 3: Target Market Definition Accuracy - Product governance source",
                          "KPI 4: Price-to-Benefit Benchmark Ratio - Pricing system + market data",
                          "KPI 5: Sludge Audit Score - Process audit system",
                          "KPI 6: Staff Training Completion Rate - LMS source",
                          "KPI 7: Vulnerable Customer Identification Rate - CRM source",
                          "KPI 8: Change Initiative Risk Assessment Score - Change management system",
                        ]}
                      />
                      <ChecklistSection
                        title="Lagging Indicators (10 KPIs)"
                        storageKey="cdt3a-step2-lagging"
                        items={[
                          "KPI 9: Fair Value Assessment Outcome (RAG) - Product system",
                          "KPI 10: Complaints Root Cause Ratio - Complaints system",
                          "KPI 11: First Contact Resolution Rate - Customer service system",
                          "KPI 12: Average Complaint Resolution Time - Complaints system",
                          "KPI 13: Customer Satisfaction Score (CSAT) - Survey platform",
                          "KPI 14: Post-Sale Product Engagement Rate - Product usage analytics",
                          "KPI 15: Customer Understanding Assessment Score - Testing platform",
                          "KPI 16: Outcome Variance for Vulnerable Customers - Multiple systems",
                          "KPI 17: Customer Churn/Lapse Rate - Policy admin system",
                          "KPI 18: Net Promoter Score (NPS) - Survey platform",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step3" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <HardDrive className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Step 3: Map Data Sources and Availability</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Inventory Existing Systems"
                        storageKey="cdt3a-step3-inventory"
                        items={[
                          "CRM system (customer data, interactions, vulnerable flags)",
                          "Policy administration (product holdings, transactions)",
                          "Complaints system (case details, root causes, resolution times)",
                          "Customer service platform (call logs, interactions, CSAT)",
                          "Product management system (product details, target markets, FVAs)",
                          "Marketing/communications system (campaigns, testing results)",
                          "Survey platforms (NPS, satisfaction, comprehension testing)",
                          "Learning management system (LMS) for training data",
                          "Document management for policies and assessments",
                        ]}
                      />
                      <ChecklistSection
                        title="Assess Data Availability and Quality"
                        storageKey="cdt3a-step3-quality"
                        items={[
                          "Document which required data elements exist in current systems",
                          "Identify data quality issues (completeness, accuracy, timeliness)",
                          "Identify data gaps (not currently captured)",
                          "Document system enhancements needed to capture missing data",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step4" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Network className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Step 4: Define Integration Architecture</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Integration Architecture"
                        storageKey="cdt3a-step4-integration"
                        items={[
                          "Design integration approach (real-time API vs batch ETL vs manual)",
                          "Document data flows (source → staging → warehouse → BI → dashboard)",
                          "Define data transformation rules at each stage",
                          "Document error handling and data validation processes",
                          "Define reconciliation and quality checks",
                          "Specify APIs required (endpoint, authentication, format)",
                          "Define ETL job schedules and dependencies",
                          "Document disaster recovery and business continuity requirements",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step5" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Step 5: Specify Security and Access Requirements</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Role-Based Access Control"
                        storageKey="cdt3a-step5-rbac"
                        items={[
                          "Board members: View board dashboard only",
                          "Executive team: View board + executive dashboards",
                          "Compliance team: View all dashboards, edit configuration",
                          "Product teams: View product-specific operational dashboards",
                          "Customer service: View support-related metrics only",
                          "IT administrators: Full system access for maintenance",
                        ]}
                      />
                      <ChecklistSection
                        title="Data Protection Requirements"
                        storageKey="cdt3a-step5-protection"
                        items={[
                          "Personal data minimization in reports (aggregate where possible)",
                          "Pseudonymization for case-level analysis",
                          "Encryption in transit and at rest",
                          "Audit logging of all access and changes",
                          "Data retention and deletion protocols",
                          "Compliance with UK GDPR",
                        ]}
                      />
                      <ChecklistSection
                        title="Information Security Controls"
                        storageKey="cdt3a-step5-security"
                        items={[
                          "Multi-factor authentication (MFA) for all users",
                          "Single sign-on (SSO) integration with corporate identity",
                          "Regular security testing and vulnerability assessments",
                          "Incident response procedures for data breaches",
                          "Third-party vendor security assessment (if external platform)",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Phase 2 */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-info/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info text-info-foreground">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <CardTitle>Phase 2: Solution Design & Vendor Selection</CardTitle>
                    <CardDescription>Weeks 4-10</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="space-y-4">
                  <AccordionItem value="step6" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-info" />
                        <span className="font-semibold">Step 6: Define Build vs Buy Decision</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Build vs Buy Assessment"
                        storageKey="cdt3a-step6-buildvsbuy"
                        items={[
                          "Assess in-house capability (dev resources, BI expertise, support capacity)",
                          "Evaluate build option (pros: customization, control; cons: time, resources)",
                          "Evaluate buy option (pros: speed, proven, support; cons: cost, dependency)",
                          "Evaluate configure option (pros: leverage existing, faster; cons: limitations)",
                          "Document recommended approach with rationale",
                          "Obtain Board approval if significant investment required",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step7" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-info" />
                        <span className="font-semibold">Step 7: Conduct Vendor Evaluation (if buying)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Vendor Evaluation Process"
                        storageKey="cdt3a-step7-vendor"
                        items={[
                          "Create vendor evaluation criteria (functionality, FCA alignment, integration, usability, vendor strength, pricing, security)",
                          "Shortlist 3-5 vendors based on market research",
                          "Request information and schedule demos",
                          "Conduct vendor demonstrations with real requirements",
                          "Test usability with potential end users (board, executive, operational)",
                          "Conduct proof of concept with top 1-2 vendors (2-4 weeks)",
                          "Score vendors using evaluation matrix",
                          "Make selection and obtain approval",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step8" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Layers className="h-5 w-5 text-info" />
                        <span className="font-semibold">Step 8: Design System Architecture</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Architecture Documentation"
                        storageKey="cdt3a-step8-architecture"
                        items={[
                          "Create high-level architecture diagram (all systems, data flows, user access, security)",
                          "Document technology stack specification (infrastructure, databases, middleware, BI platform)",
                          "Define scalability and performance design (volumes, concurrency, response times)",
                          "Document growth projections and optimization strategies",
                          "Define disaster recovery strategy (backup frequency, RTO, RPO)",
                          "Document failover mechanisms if high availability required",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Phase 3 */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-warning/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning text-warning-foreground">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <CardTitle>Phase 3: Configuration & Development</CardTitle>
                    <CardDescription>Weeks 10-18</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="space-y-4">
                  <AccordionItem value="step9" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-warning" />
                        <span className="font-semibold">Step 9: Configure/Develop Data Integration</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Data Integration Development"
                        storageKey="cdt3a-step9-integration"
                        items={[
                          "Set up staging and data warehouse environments",
                          "Provision infrastructure (servers, databases)",
                          "Configure network connectivity to source systems",
                          "Set up development, testing, and production environments",
                          "Implement security controls (firewalls, encryption, access)",
                          "Develop/configure ETL processes for each source system",
                          "Schedule ETL jobs (daily, weekly, monthly as needed)",
                          "Implement error handling and alerting",
                          "Build reconciliation reports (source vs warehouse)",
                          "Develop real-time integrations if required",
                          "Test data integration (unit, integration, volume, accuracy)",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step10" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <MonitorCheck className="h-5 w-5 text-warning" />
                        <span className="font-semibold">Step 10: Configure/Develop Dashboards</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Board Dashboard Build"
                        storageKey="cdt3a-step10-board"
                        items={[
                          "Overall status tile (RAG rating)",
                          "Circular progress indicator (% compliance)",
                          "Four outcomes summary cards",
                          "Top 5 issues requiring attention",
                          "Vulnerable customer outcome parity indicator",
                          "Action tracker (remediation plans)",
                          "Export to PDF functionality",
                        ]}
                      />
                      <ChecklistSection
                        title="Executive Dashboard Build"
                        storageKey="cdt3a-step10-exec"
                        items={[
                          "Detailed KPI tiles for all 18 essential KPIs",
                          "Trend charts (line graphs showing performance over time)",
                          "Segmentation capability (filter by product, channel, customer type)",
                          "Drill-down to underlying data",
                          "Alert indicators (red exclamation for threshold breaches)",
                          "Root cause analysis views",
                        ]}
                      />
                      <ChecklistSection
                        title="Operational Dashboards Build"
                        storageKey="cdt3a-step10-ops"
                        items={[
                          "Product team dashboard (product-specific metrics)",
                          "Customer service dashboard (support quality metrics)",
                          "Complaints team dashboard (complaint analysis)",
                          "Compliance team dashboard (control testing, policy compliance)",
                          "Customizable views per user role",
                        ]}
                      />
                      <ChecklistSection
                        title="Interactivity Features"
                        storageKey="cdt3a-step10-interactivity"
                        items={[
                          "Clickable elements for drill-down",
                          "Filters (date range, product, channel, customer segment)",
                          "Saved views and favorites",
                          "Scheduled report delivery (email PDF reports)",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step11" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-warning" />
                        <span className="font-semibold">Step 11: Implement Security and Access Controls</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Security Implementation"
                        storageKey="cdt3a-step11-security"
                        items={[
                          "Configure role-based access control (create user groups, assign permissions)",
                          "Test access controls (users see only appropriate dashboards)",
                          "Configure SSO integration with corporate identity provider",
                          "Enable multi-factor authentication (MFA)",
                          "Set password policies and session timeouts",
                          "Enable audit logging (user access, configuration changes)",
                          "Set up log retention and review processes",
                          "Conduct penetration testing",
                          "Perform vulnerability scanning",
                          "Remediate identified security issues before go-live",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Phase 4 */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-success/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success text-success-foreground">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <CardTitle>Phase 4: Testing & Deployment</CardTitle>
                    <CardDescription>Weeks 18-20</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="space-y-4">
                  <AccordionItem value="step12" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        <span className="font-semibold">Step 12: Conduct User Acceptance Testing (UAT)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="UAT Execution"
                        storageKey="cdt3a-step12-uat"
                        items={[
                          "Recruit UAT participants (board member, 2-3 executives, 3-5 operational users, compliance lead)",
                          "Develop UAT scenarios (board review, executive investigation, product analysis, compliance tracking, service review)",
                          "Conduct Week 1 UAT: Initial testing with test data",
                          "Conduct Week 2 UAT: Testing with production-like data",
                          "Document issues and feedback",
                          "Prioritize and fix critical issues",
                          "Retest fixed issues",
                          "Obtain UAT sign-off from key stakeholders",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step13" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-success" />
                        <span className="font-semibold">Step 13: Prepare for Go-Live</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ChecklistSection
                        title="Go-Live Preparation"
                        storageKey="cdt3a-step13-golive"
                        items={[
                          "Complete data migration/cutover plan",
                          "Perform final data load from all source systems",
                          "Reconcile data to ensure completeness and accuracy",
                          "Complete cutover checklist (systems ready, users provisioned, support available)",
                          "Create user accounts for all dashboard users",
                          "Assign appropriate roles and permissions",
                          "Send login credentials and instructions",
                          "Prepare user guides and FAQs",
                          "Set up help desk or support email",
                          "Train support staff on common issues",
                          "Define escalation process for critical issues",
                          "Schedule training sessions (covered in CD-T3B)",
                          "Execute communication plan to all users",
                          "Confirm all systems operational",
                          "Monitor closely for first 48 hours",
                          "Address immediate issues and gather feedback",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <TemplateCard
                title="Dashboard Requirements Specification"
                description="Comprehensive specification for Board, Executive, and Operational dashboards with functional and non-functional requirements."
                icon={<MonitorCheck className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Dashboard Requirements Specification")}
              />
              <TemplateCard
                title="Data Collection Requirements Matrix"
                description="Excel workbook covering all 18 Essential KPIs with sources, frequency, calculations, availability, and gap analysis."
                icon={<Database className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Data Collection Requirements Matrix")}
              />
              <TemplateCard
                title="Data Source Mapping Template"
                description="Visual mapping document showing system ownership, data elements, quality assessment, and integration methods."
                icon={<HardDrive className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Data Source Mapping Template")}
              />
              <TemplateCard
                title="Integration Architecture Diagram"
                description="Visual diagram showing source systems, middleware, data warehouse, BI platform, and data flows."
                icon={<Network className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Integration Architecture Diagram")}
              />
              <TemplateCard
                title="Security Requirements Specification"
                description="RBAC matrix, data protection controls, information security standards, and audit requirements."
                icon={<Lock className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Security Requirements Specification")}
              />
              <TemplateCard
                title="Build vs Buy Decision Matrix"
                description="Criteria scoring, cost analysis, risk assessment, and recommendation framework for technology approach."
                icon={<Settings className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Build vs Buy Decision Matrix")}
              />
              <TemplateCard
                title="Vendor Evaluation Scorecard"
                description="Weighted scoring matrix for evaluating Consumer Duty platform vendors across functionality, compliance, and cost."
                icon={<Users className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Vendor Evaluation Scorecard")}
              />
              <TemplateCard
                title="System Architecture Design Document"
                description="High-level architecture, technology stack, scalability plan, and disaster recovery documentation."
                icon={<Layers className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("System Architecture Design Document")}
              />
              <TemplateCard
                title="Data Integration Test Plan"
                description="Test cases, expected results, actual results, and issue tracking for ETL and API testing."
                icon={<Workflow className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Data Integration Test Plan")}
              />
              <TemplateCard
                title="Dashboard Configuration Specification"
                description="Wireframes, data connections, filters, and interactivity specifications for each dashboard."
                icon={<BarChart3 className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Dashboard Configuration Specification")}
              />
              <TemplateCard
                title="Security Configuration Checklist"
                description="RBAC setup verification, authentication testing, logging enablement, and security testing completion."
                icon={<Shield className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Security Configuration Checklist")}
              />
              <TemplateCard
                title="UAT Test Script"
                description="Scenarios, steps, expected results, actual results, and issue documentation for user acceptance testing."
                icon={<CheckCircle2 className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("UAT Test Script")}
              />
              <TemplateCard
                title="Go-Live Readiness Checklist"
                description="Pre-deployment verification checklist with sign-offs and support readiness confirmation."
                icon={<Zap className="h-5 w-5" />}
                onPreview={() => handlePreviewTemplate("Go-Live Readiness Checklist")}
              />
            </div>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-success" />
                  Technology Deployment Success Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Requirements Completeness */}
                <div className="p-4 rounded-lg border border-border bg-muted/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Requirements Completeness
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "All dashboard requirements documented and approved by users",
                      "All 18 essential KPIs mapped to data sources",
                      "Data gaps identified with remediation plans",
                      "Integration architecture designed and reviewed by IT",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution Selection */}
                <div className="p-4 rounded-lg border border-border bg-muted/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Solution Selection
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Build vs buy decision made with Board approval if significant investment",
                      "If buying: Vendor selected based on objective evaluation",
                      "Contracts negotiated and signed",
                      "Implementation plan agreed with vendor",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Data Integration Quality */}
                <div className="p-4 rounded-lg border border-border bg-muted/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Data Integration Quality
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "All source systems successfully connected",
                      "ETL processes operational and scheduled",
                      "Data quality >95% (reconciliation to source systems)",
                      "Real-time integrations performing within SLA (<5 second response)",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dashboard Functionality */}
                <div className="p-4 rounded-lg border border-border bg-muted/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Dashboard Functionality
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Board dashboard displays all required elements",
                      "Executive dashboard supports drill-down and segmentation",
                      "Operational dashboards provide relevant metrics by role",
                      "Export functionality working (PDF for board, Excel for executives)",
                      "Performance meets requirements (load times <5 seconds)",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security & Access */}
                <div className="p-4 rounded-lg border border-border bg-muted/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Security & Access
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "RBAC implemented and tested",
                      "All users provisioned with appropriate access",
                      "SSO and MFA operational",
                      "Audit logging enabled",
                      "Security testing completed with no critical vulnerabilities",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* User Acceptance */}
                <div className="p-4 rounded-lg border border-border bg-muted/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    User Acceptance
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "UAT completed with sign-off from key users",
                      "Board member confirms board dashboard meets needs",
                      "Executives confirm they can monitor performance and investigate issues",
                      "Operational users confirm dashboards provide actionable insights",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deployment Readiness */}
                <div className="p-4 rounded-lg border border-border bg-muted/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Deployment Readiness
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "All data loaded and reconciled",
                      "Support processes established",
                      "Training materials prepared (covered in CD-T3B)",
                      "Communication plan executed",
                      "Go-live checklist completed",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Implementation Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { phase: "Weeks 1-4", title: "Requirements Definition", color: "bg-primary" },
                    { phase: "Weeks 4-10", title: "Solution Design & Vendor Selection", color: "bg-info" },
                    { phase: "Weeks 10-18", title: "Configuration & Development", color: "bg-warning" },
                    { phase: "Weeks 18-20", title: "Testing & Deployment", color: "bg-success" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded text-sm font-medium text-white ${item.color}`}>
                        {item.phase}
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="font-semibold mb-2">Key Milestone Dates:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Week 4:</strong> Requirements approved</li>
                    <li>• <strong>Week 10:</strong> Solution selected, contracts signed</li>
                    <li>• <strong>Week 18:</strong> UAT complete</li>
                    <li>• <strong>Week 20:</strong> Go-live</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <PitfallCard
              number={1}
              title="Technology-Led Rather Than Outcome-Led"
              finding="Firms focused on implementing technology rather than defining what outcomes they needed to monitor"
              impact="Expensive systems deployed that don't actually support Consumer Duty monitoring"
              prevention={[
                "Start with MI requirements (what needs to be measured - the 18 KPIs)",
                "Then define data requirements (what data is needed)",
                "Finally, select technology (what systems/tools will support it)",
                "Don't let technology vendors drive requirements",
              ]}
              example="Firm bought expensive BI platform because 'we need dashboards for Consumer Duty' without defining what specific metrics needed tracking. Platform had great visualization but couldn't integrate with key systems, so most data had to be manually entered."
              riskLevel="HIGH"
              source="FG22/5 Section 10"
            />

            <PitfallCard
              number={2}
              title="Repackaging Existing MI Without New Data"
              finding="Simply repackaging existing MI without considering what new data needed for Consumer Duty"
              impact="Dashboards look good but don't actually evidence Consumer Duty compliance"
              prevention={[
                "Identify data gaps (what's not currently captured)",
                "Enhance source systems to capture missing data (e.g., vulnerable customer flags in CRM)",
                "Don't just report what's easy to report - report what regulators expect",
              ]}
              example="Firm created board dashboard showing existing complaints data and CSAT scores, but had no vulnerable customer outcome parity analysis, fair value assessment status tracking, communication testing results, or sludge audit scores. FCA asked 'How do you know vulnerable customers achieve same outcomes?' Firm had no data."
              riskLevel="HIGH"
              source="FCA Multi-Firm Review 2024"
            />

            <PitfallCard
              number={3}
              title="Underestimating Integration Complexity"
              finding="Integrating multiple systems (CRM, policy admin, complaints, etc.) takes longer and costs more than expected"
              impact="Delayed deployment, budget overruns, incomplete data"
              prevention={[
                "Realistic assessment of integration effort (each system is a mini-project)",
                "Budget 40% of total project time for integration",
                "Consider integration middleware (don't try to directly connect every system)",
                "Start with most critical integrations first (iterative approach)",
                "Plan for manual data loads as interim solution if needed",
              ]}
              example="Firm planned 12-week implementation. Spent 8 weeks just trying to get reliable data extract from legacy policy administration system. Eventually succeeded but 6 months late."
              riskLevel="HIGH"
              source="Implementation Best Practice"
            />

            <PitfallCard
              number={4}
              title="Poor Data Quality Undermines Everything"
              finding="Poor data quality undermines firms' ability to provide adequate assurance"
              impact="Board can't rely on MI, regulatory risk"
              prevention={[
                "Data quality assessment BEFORE building dashboards",
                "Clean data at source (fix root cause in source systems)",
                "Implement data validation and reconciliation processes",
                "Regular data quality reporting",
                "Assign data ownership and accountability",
              ]}
              example="Common data quality issues: missing data (incomplete customer records), inconsistent definitions (product categorization different across systems), duplicate records (same customer multiple times), lag time (data not available when needed for reporting)."
              riskLevel="HIGH"
              source="FCA Board Reports Review Nov 2024"
            />

            <PitfallCard
              number={5}
              title="Building Dashboards Before Defining KPIs"
              finding="Creating visualizations without clear understanding of what metrics matter"
              impact="Pretty dashboards that don't tell you if you're compliant"
              prevention={[
                "Complete CD-M1 (MI Framework) BEFORE starting CD-T3",
                "Define all 18 essential KPIs with clear calculations",
                "Get stakeholder agreement on metrics before any dashboard design",
                "Ensure each metric links to specific Consumer Duty requirement",
              ]}
              riskLevel="MEDIUM"
              source="FG22/5 Section 10"
            />

            <PitfallCard
              number={6}
              title="No User Involvement Until UAT"
              finding="IT builds dashboards in isolation, then presents to users at the end"
              impact="Dashboards don't meet actual user needs, costly rework"
              prevention={[
                "Involve Board member, executives, and operational users from requirements stage",
                "Show wireframes/mockups early for feedback",
                "Iterative design (show progress every 2 weeks)",
                "'Build one, review one, deploy many' - don't build all dashboards before getting feedback",
              ]}
              riskLevel="MEDIUM"
              source="Implementation Best Practice"
            />

            <PitfallCard
              number={7}
              title="Buying Platform Without Implementation Capacity"
              finding="Purchase software license but don't have internal resources to implement"
              impact="'Shelfware' - expensive platform not used effectively"
              prevention={[
                "Assess internal capability honestly",
                "Budget for external consultants/implementers if needed",
                "Factor implementation effort into vendor selection (some vendors provide more support)",
                "Ensure vendor provides training and documentation",
              ]}
              example="Cost Reality Check: Software license £50K-200K/year, Implementation services £100K-300K (one-time), Internal resource 2-3 FTE for 6 months, Ongoing support 1 FTE."
              riskLevel="MEDIUM"
              source="Implementation Best Practice"
            />

            <PitfallCard
              number={8}
              title="Forgetting Mobile/Tablet Access for Board"
              finding="Dashboards only work on desktop; Board members use tablets"
              impact="Board dashboard not actually used"
              prevention={[
                "Specify mobile/tablet requirement in dashboard requirements",
                "Test on actual devices (iPad, Android tablets)",
                "Prioritize board dashboard for mobile optimization",
                "Consider responsive design vs separate mobile app",
              ]}
              riskLevel="MEDIUM"
              source="Implementation Best Practice"
            />

            <PitfallCard
              number={9}
              title="No Plan for Ongoing Maintenance and Enhancement"
              finding="Dashboards deployed then neglected; no resources for updates"
              impact="Dashboards become stale and inaccurate"
              prevention={[
                "Budget for ongoing support (1 FTE permanent)",
                "Establish change request process for enhancements",
                "Regular review of dashboard effectiveness (quarterly)",
                "Plan for regulatory changes requiring MI updates",
              ]}
              riskLevel="MEDIUM"
              source="Implementation Best Practice"
            />

            <PitfallCard
              number={10}
              title="Security Afterthought"
              finding="Security not considered until late in project"
              impact="Delays at go-live, potential data breaches"
              prevention={[
                "Security requirements defined in Phase 1",
                "Involve information security team from start",
                "Security testing throughout (not just at end)",
                "Threat modeling for dashboard architecture",
                "Data protection impact assessment (DPIA) if processing vulnerable customer data",
              ]}
              riskLevel="HIGH"
              source="UK GDPR / Implementation Best Practice"
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CDT3ATechnologyRequirementsPart1;
