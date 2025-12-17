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

const MODULE_ID = "cd-t3a";

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
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <Settings className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">CD-T3A: Technology Requirements & System Configuration</h1>
              <p className="text-muted-foreground mt-1">Part 1: Requirements Definition, Solution Design & Development</p>
            </div>
          </div>

          {/* Key Info Cards */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">12-20 weeks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-info/5 to-transparent border-info/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-info" />
                  <div>
                    <p className="text-sm text-muted-foreground">Accountable</p>
                    <p className="font-semibold">CTO/CIO</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-warning/5 to-transparent border-warning/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm text-muted-foreground">Key Focus</p>
                    <p className="font-semibold">MI Dashboard & Data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/5 to-transparent border-success/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Deliverables</p>
                    <p className="font-semibold">8 Key Outputs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto gap-2 bg-transparent p-0">
            {[
              { value: "overview", label: "Overview" },
              { value: "regulatory", label: "Regulatory Foundation" },
              { value: "steps", label: "Implementation Steps" },
              { value: "templates", label: "Templates & Tools" },
              { value: "success", label: "Success Criteria" },
              { value: "pitfalls", label: "Common Pitfalls" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-lg border border-border/50 bg-card hover:bg-muted transition-colors"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Purpose</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  Specify, configure, and deploy technology systems to support Consumer Duty monitoring, 
                  evidence collection, and reporting. This module provides a comprehensive framework for 
                  building the technology infrastructure needed to evidence good customer outcomes.
                </p>
              </CardContent>
            </Card>

            {/* Regulatory Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Regulatory Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {[
                    "Consumer Duty requires robust MI and data analytics (FG22/5 Section 10)",
                    "Technology underpins outcome monitoring across all four outcomes",
                    "Board reporting depends on quality data infrastructure",
                    "FCA expectation: 'High-quality, contextualized MI' to evidence compliance",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
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
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { module: "CD-M1", title: "MI & Outcome Monitoring Framework", desc: "Defines what to measure" },
                    { module: "CD-I1 to CD-I4", title: "Four Outcomes Modules", desc: "Define data collection points" },
                    { module: "CD-I7", title: "Data & Evidence Management", desc: "Defines evidence requirements" },
                    { module: "CD-M3", title: "Board & Executive Reporting", desc: "Defines reporting outputs" },
                  ].map((dep, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <Badge variant="outline" className="mb-2">{dep.module}</Badge>
                      <p className="font-medium">{dep.title}</p>
                      <p className="text-sm text-muted-foreground">{dep.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scope */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-info" />
                  Scope of Technology Enablement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-success">In Scope:</h4>
                    <ul className="space-y-2">
                      {[
                        "MI dashboard and reporting platforms",
                        "Customer data platforms and analytics",
                        "Outcome monitoring and tracking systems",
                        "Evidence repository and document management",
                        "Integration with existing systems (CRM, policy admin, claims)",
                        "Automation of data collection and reporting",
                        "User access and training systems",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-destructive">Out of Scope (Separate Projects):</h4>
                    <ul className="space-y-2">
                      {[
                        "Core banking/insurance system replacements",
                        "Complete digital transformation programmes",
                        "Customer-facing channel development",
                        "Product administration system overhauls",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Key Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-3">Part 1 (CD-T3A - This Module):</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Technology requirements specification",
                        "System architecture design",
                        "Vendor evaluation framework (if procurement needed)",
                        "Integration architecture diagram",
                        "Data flow mapping",
                        "System configuration plan",
                        "User acceptance testing strategy",
                        "Go-live readiness checklist",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <h4 className="font-semibold mb-3">Part 2 (CD-T3B - Next Module):</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Dashboard implementation and customization",
                        "User training delivery",
                        "Data migration and validation",
                        "Performance optimization",
                        "Support and maintenance framework",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-muted-foreground">○</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Success Factors */}
            <Card>
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
                    <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-success/5 border border-success/20">
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
              source="FCA"
              reference="FG22/5 Section 10"
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
                  source="FCA"
                  reference="Board Reports Review, November 2024"
                  quote="Poor data quality undermines firms' ability to conduct robust assessments and provide adequate assurance to the board"
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
                    { icon: Workflow, layer: "E. Workflow Automation", name: "Case Management", purpose: "Automate data collection, approvals, tracking", data: "Task assignment, notifications, escalation" },
                    { icon: Network, layer: "F. Integration Middleware", name: "API Gateway & ETL", purpose: "Connect systems, transform data", data: "Real-time and batch integration, validation" },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-card hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">{item.layer}</span>
                      </div>
                      <h4 className="font-semibold mb-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{item.purpose}</p>
                      <p className="text-xs text-muted-foreground">{item.data}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="steps" className="space-y-6">
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
                <ChecklistSection
                  stepNumber={1}
                  title="Define MI and Dashboard Requirements"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "1-1", label: "Document Board Dashboard Requirements (RAG status, outcomes overview, KPIs summary)" },
                    { id: "1-2", label: "Document Executive Dashboard Requirements (detailed metrics, trends, segmentation)" },
                    { id: "1-3", label: "Document Operational Dashboard Requirements (team-specific, granular data)" },
                    { id: "1-4", label: "Define vulnerable customer outcome parity indicators" },
                    { id: "1-5", label: "Specify action tracker and remediation plan displays" },
                    { id: "1-6", label: "Define export functionality requirements (PDF, Excel)" },
                    { id: "1-7", label: "Obtain stakeholder approval on dashboard requirements" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={2}
                  title="Define Data Collection Requirements"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "2-1", label: "Map 8 Leading Indicators (Communication Clarity, Pre-Launch Testing, Target Market Accuracy, Price-to-Benefit, Sludge Audit, Training Completion, Vulnerable ID Rate, Change Risk)" },
                    { id: "2-2", label: "Map 10 Lagging Indicators (FVA Outcome, Complaints Ratio, FCR, Resolution Time, CSAT, Engagement, Understanding, Outcome Variance, Churn, NPS)" },
                    { id: "2-3", label: "Document calculation formulas for each KPI" },
                    { id: "2-4", label: "Identify data source systems for each KPI" },
                    { id: "2-5", label: "Define collection frequency (real-time, daily, weekly, monthly)" },
                    { id: "2-6", label: "Specify segmentation dimensions (product, channel, vulnerability)" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={3}
                  title="Map Data Sources and Availability"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "3-1", label: "Inventory CRM system (customer data, interactions, vulnerability flags)" },
                    { id: "3-2", label: "Inventory Policy Administration (product holdings, transactions)" },
                    { id: "3-3", label: "Inventory Complaints System (case details, root causes, resolution times)" },
                    { id: "3-4", label: "Inventory Customer Service Platform (call logs, CSAT)" },
                    { id: "3-5", label: "Inventory Product Management System (target markets, FVAs)" },
                    { id: "3-6", label: "Inventory Survey Platforms (NPS, satisfaction, comprehension)" },
                    { id: "3-7", label: "Inventory LMS (training completion data)" },
                    { id: "3-8", label: "Assess data quality for each source (completeness, accuracy, timeliness)" },
                    { id: "3-9", label: "Document data gaps and enhancement requirements" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={4}
                  title="Define Integration Architecture"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "4-1", label: "Design integration approach (real-time API vs batch ETL vs manual)" },
                    { id: "4-2", label: "Document data flows (source → staging → warehouse → BI → dashboard)" },
                    { id: "4-3", label: "Define transformation rules and validation processes" },
                    { id: "4-4", label: "Specify API requirements (endpoints, authentication, format)" },
                    { id: "4-5", label: "Define ETL schedules and dependencies" },
                    { id: "4-6", label: "Document disaster recovery and business continuity requirements" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={5}
                  title="Specify Security and Access Requirements"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "5-1", label: "Define RBAC matrix (Board, Executive, Compliance, Product, Service, IT)" },
                    { id: "5-2", label: "Specify data protection controls (pseudonymization, encryption, minimization)" },
                    { id: "5-3", label: "Document audit logging requirements" },
                    { id: "5-4", label: "Define authentication requirements (SSO, MFA)" },
                    { id: "5-5", label: "Specify retention and deletion protocols" },
                    { id: "5-6", label: "Plan security testing and vulnerability assessments" },
                  ]}
                />
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
                <ChecklistSection
                  stepNumber={6}
                  title="Define Build vs Buy Decision"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "6-1", label: "Assess in-house capability (development resources, BI expertise, support capacity)" },
                    { id: "6-2", label: "Evaluate build option (customization vs time/cost)" },
                    { id: "6-3", label: "Evaluate buy option (speed, proven solutions, vendor support)" },
                    { id: "6-4", label: "Evaluate configure option (leverage existing platforms)" },
                    { id: "6-5", label: "Document recommended approach with rationale" },
                    { id: "6-6", label: "Obtain Board approval if significant investment required" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={7}
                  title="Conduct Vendor Evaluation (if buying)"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "7-1", label: "Create evaluation criteria (functionality, FCA alignment, integration, usability, security, pricing)" },
                    { id: "7-2", label: "Shortlist 3-5 vendors based on market research" },
                    { id: "7-3", label: "Request information and schedule demos" },
                    { id: "7-4", label: "Conduct vendor demonstrations with real requirements" },
                    { id: "7-5", label: "Test usability with potential end users (board, executive, operational)" },
                    { id: "7-6", label: "Conduct proof of concept with top 1-2 vendors (2-4 weeks)" },
                    { id: "7-7", label: "Score vendors using evaluation matrix" },
                    { id: "7-8", label: "Make selection and obtain approval" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={8}
                  title="Design System Architecture"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "8-1", label: "Create high-level architecture diagram (all systems, data flows, security)" },
                    { id: "8-2", label: "Document technology stack specification (infrastructure, databases, middleware)" },
                    { id: "8-3", label: "Define scalability and performance requirements" },
                    { id: "8-4", label: "Document growth projections and optimization strategies" },
                    { id: "8-5", label: "Define disaster recovery strategy (backup, RTO, RPO)" },
                    { id: "8-6", label: "Document failover mechanisms if high availability required" },
                  ]}
                />
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
                <ChecklistSection
                  stepNumber={9}
                  title="Configure/Develop Data Integration"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "9-1", label: "Set up staging and data warehouse environments" },
                    { id: "9-2", label: "Provision infrastructure and configure network connectivity" },
                    { id: "9-3", label: "Set up development, testing, and production environments" },
                    { id: "9-4", label: "Implement security controls (firewalls, encryption, access)" },
                    { id: "9-5", label: "Develop/configure ETL processes for each source system" },
                    { id: "9-6", label: "Schedule ETL jobs and implement error handling" },
                    { id: "9-7", label: "Build reconciliation reports (source vs warehouse)" },
                    { id: "9-8", label: "Test data integration (unit, integration, volume, accuracy)" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={10}
                  title="Configure/Develop Dashboards"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "10-1", label: "Build Board Dashboard (RAG status, progress, outcomes, top issues, actions)" },
                    { id: "10-2", label: "Build Executive Dashboard (18 KPIs, trends, segmentation, drill-down, alerts)" },
                    { id: "10-3", label: "Build Operational Dashboards (product, service, complaints, compliance)" },
                    { id: "10-4", label: "Implement interactivity (drill-down, filters, saved views)" },
                    { id: "10-5", label: "Configure scheduled report delivery" },
                    { id: "10-6", label: "Test export functionality (PDF, Excel)" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={11}
                  title="Implement Security and Access Controls"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "11-1", label: "Configure role-based access control (create user groups, assign permissions)" },
                    { id: "11-2", label: "Test access controls (users see only appropriate dashboards)" },
                    { id: "11-3", label: "Configure SSO integration with corporate identity provider" },
                    { id: "11-4", label: "Enable multi-factor authentication (MFA)" },
                    { id: "11-5", label: "Set password policies and session timeouts" },
                    { id: "11-6", label: "Enable audit logging (user access, configuration changes)" },
                    { id: "11-7", label: "Conduct penetration testing and vulnerability scanning" },
                    { id: "11-8", label: "Remediate identified security issues before go-live" },
                  ]}
                />
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
                <ChecklistSection
                  stepNumber={12}
                  title="Conduct User Acceptance Testing (UAT)"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "12-1", label: "Recruit UAT participants (board member, executives, operational users, compliance)" },
                    { id: "12-2", label: "Develop UAT scenarios (board review, executive investigation, product analysis)" },
                    { id: "12-3", label: "Conduct Week 1 UAT: Initial testing with test data" },
                    { id: "12-4", label: "Conduct Week 2 UAT: Testing with production-like data" },
                    { id: "12-5", label: "Document issues and feedback" },
                    { id: "12-6", label: "Prioritize and fix critical issues" },
                    { id: "12-7", label: "Retest fixed issues" },
                    { id: "12-8", label: "Obtain UAT sign-off from key stakeholders" },
                  ]}
                />

                <ChecklistSection
                  stepNumber={13}
                  title="Prepare for Go-Live"
                  moduleId={MODULE_ID}
                  items={[
                    { id: "13-1", label: "Complete data migration/cutover plan" },
                    { id: "13-2", label: "Perform final data load and reconciliation" },
                    { id: "13-3", label: "Complete cutover checklist" },
                    { id: "13-4", label: "Create user accounts and assign permissions" },
                    { id: "13-5", label: "Prepare user guides and FAQs" },
                    { id: "13-6", label: "Set up help desk and define escalation process" },
                    { id: "13-7", label: "Execute communication plan" },
                    { id: "13-8", label: "Confirm all systems operational and go live" },
                    { id: "13-9", label: "Monitor closely for first 48 hours" },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <TemplateCard
                title="Dashboard Requirements Specification"
                description="Comprehensive specification for Board, Executive, and Operational dashboards with functional and non-functional requirements."
                format="Word"
                onPreview={() => handlePreviewTemplate("Dashboard Requirements Specification")}
              />
              <TemplateCard
                title="Data Collection Requirements Matrix"
                description="Excel workbook covering all 18 Essential KPIs with sources, frequency, calculations, availability, and gap analysis."
                format="Excel"
                onPreview={() => handlePreviewTemplate("Data Collection Requirements Matrix")}
              />
              <TemplateCard
                title="Data Source Mapping Template"
                description="Visual mapping document showing system ownership, data elements, quality assessment, and integration methods."
                format="Excel"
                onPreview={() => handlePreviewTemplate("Data Source Mapping Template")}
              />
              <TemplateCard
                title="Integration Architecture Diagram"
                description="Visual diagram showing source systems, middleware, data warehouse, BI platform, and data flows."
                format="PowerPoint"
                onPreview={() => handlePreviewTemplate("Integration Architecture Diagram")}
              />
              <TemplateCard
                title="Security Requirements Specification"
                description="RBAC matrix, data protection controls, information security standards, and audit requirements."
                format="Word"
                onPreview={() => handlePreviewTemplate("Security Requirements Specification")}
              />
              <TemplateCard
                title="Build vs Buy Decision Matrix"
                description="Criteria scoring, cost analysis, risk assessment, and recommendation framework for technology approach."
                format="Excel"
                onPreview={() => handlePreviewTemplate("Build vs Buy Decision Matrix")}
              />
              <TemplateCard
                title="Vendor Evaluation Scorecard"
                description="Weighted scoring matrix for evaluating Consumer Duty platform vendors across functionality, compliance, and cost."
                format="Excel"
                onPreview={() => handlePreviewTemplate("Vendor Evaluation Scorecard")}
              />
              <TemplateCard
                title="System Architecture Design Document"
                description="High-level architecture, technology stack, scalability plan, and disaster recovery documentation."
                format="Word"
                onPreview={() => handlePreviewTemplate("System Architecture Design Document")}
              />
              <TemplateCard
                title="Data Integration Test Plan"
                description="Test cases, expected results, actual results, and issue tracking for ETL and API testing."
                format="Excel"
                onPreview={() => handlePreviewTemplate("Data Integration Test Plan")}
              />
              <TemplateCard
                title="UAT Test Script"
                description="Scenarios, steps, expected results, actual results, and issue documentation for user acceptance testing."
                format="Excel"
                onPreview={() => handlePreviewTemplate("UAT Test Script")}
              />
              <TemplateCard
                title="Go-Live Readiness Checklist"
                description="Pre-deployment verification checklist with sign-offs and support readiness confirmation."
                format="Excel"
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
                {[
                  {
                    title: "Requirements Completeness",
                    items: [
                      "All dashboard requirements documented and approved by users",
                      "All 18 essential KPIs mapped to data sources",
                      "Data gaps identified with remediation plans",
                      "Integration architecture designed and reviewed by IT",
                    ]
                  },
                  {
                    title: "Solution Selection",
                    items: [
                      "Build vs buy decision made with Board approval if significant investment",
                      "If buying: Vendor selected based on objective evaluation",
                      "Contracts negotiated and signed",
                      "Implementation plan agreed with vendor",
                    ]
                  },
                  {
                    title: "Data Integration Quality",
                    items: [
                      "All source systems successfully connected",
                      "ETL processes operational and scheduled",
                      "Data quality >95% (reconciliation to source systems)",
                      "Real-time integrations performing within SLA (<5 second response)",
                    ]
                  },
                  {
                    title: "Dashboard Functionality",
                    items: [
                      "Board dashboard displays all required elements",
                      "Executive dashboard supports drill-down and segmentation",
                      "Operational dashboards provide relevant metrics by role",
                      "Export functionality working (PDF for board, Excel for executives)",
                      "Performance meets requirements (load times <5 seconds)",
                    ]
                  },
                  {
                    title: "Security & Access",
                    items: [
                      "RBAC implemented and tested",
                      "All users provisioned with appropriate access",
                      "SSO and MFA operational",
                      "Audit logging enabled",
                      "Security testing completed with no critical vulnerabilities",
                    ]
                  },
                  {
                    title: "User Acceptance",
                    items: [
                      "UAT completed with sign-off from key users",
                      "Board member confirms board dashboard meets needs",
                      "Executives confirm they can monitor performance and investigate issues",
                      "Operational users confirm dashboards provide actionable insights",
                    ]
                  },
                  {
                    title: "Deployment Readiness",
                    items: [
                      "All data loaded and reconciled",
                      "Support processes established",
                      "Training materials prepared (covered in CD-T3B)",
                      "Communication plan executed",
                      "Go-live checklist completed",
                    ]
                  },
                ].map((section, sectionIndex) => (
                  <div key={sectionIndex} className="p-4 rounded-lg border border-border bg-muted/20">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {section.title}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {section.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-success">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
              title="Technology-Led Rather Than Outcome-Led"
              description="Firms focused on implementing technology rather than defining what outcomes they needed to monitor. This leads to expensive systems that don't support Consumer Duty monitoring."
              impact="Expensive systems deployed that don't actually support Consumer Duty monitoring"
              prevention="Start with MI requirements (what needs to be measured), then define data requirements, finally select technology. Don't let vendors drive requirements."
            />

            <PitfallCard
              title="Repackaging Existing MI Without New Data"
              description="Simply repackaging existing MI without considering what new data is needed for Consumer Duty. Dashboards look good but don't evidence compliance."
              impact="Dashboards look good but don't actually evidence Consumer Duty compliance"
              prevention="Identify data gaps early, enhance source systems to capture missing data (e.g., vulnerable customer flags), report what regulators expect not just what's easy."
            />

            <PitfallCard
              title="Underestimating Integration Complexity"
              description="Integrating multiple systems (CRM, policy admin, complaints, etc.) takes longer and costs more than expected, causing delays and incomplete data."
              impact="Delayed deployment, budget overruns, incomplete data"
              prevention="Budget 40% of total project time for integration. Use middleware rather than direct connections. Start with critical integrations first. Plan manual loads as interim."
            />

            <PitfallCard
              title="Poor Data Quality Undermines Everything"
              description="Poor data quality undermines firms' ability to provide adequate assurance. Board can't rely on MI, creating regulatory risk."
              impact="Board can't rely on MI, regulatory risk, unreliable dashboards"
              prevention="Assess data quality BEFORE building dashboards. Clean data at source. Implement validation and reconciliation. Assign data ownership and accountability."
            />

            <PitfallCard
              title="Building Dashboards Before Defining KPIs"
              description="Creating visualizations without clear understanding of what metrics matter leads to pretty dashboards that don't tell you if you're compliant."
              impact="Pretty dashboards that don't tell you if you're compliant"
              prevention="Complete CD-M1 (MI Framework) BEFORE starting CD-T3. Define all 18 KPIs with calculations. Get stakeholder agreement before any dashboard design."
            />

            <PitfallCard
              title="No User Involvement Until UAT"
              description="IT builds dashboards in isolation, then presents to users at the end. Dashboards don't meet actual needs, requiring costly rework."
              impact="Dashboards don't meet actual user needs, costly rework"
              prevention="Involve Board, executives, and operational users from requirements stage. Show wireframes early. Iterate every 2 weeks. Build one, review one, deploy many."
            />

            <PitfallCard
              title="Buying Platform Without Implementation Capacity"
              description="Purchasing software license but lacking internal resources to implement leads to expensive 'shelfware' not used effectively."
              impact="'Shelfware' - expensive platform not used effectively"
              prevention="Assess internal capability honestly. Budget for external consultants. Factor implementation effort into vendor selection. Ensure vendor provides training."
            />

            <PitfallCard
              title="Forgetting Mobile/Tablet Access for Board"
              description="Dashboards only work on desktop but Board members use tablets, meaning the board dashboard goes unused."
              impact="Board dashboard not actually used"
              prevention="Specify mobile/tablet requirement in dashboard requirements. Test on actual devices. Prioritize board dashboard for mobile optimization."
            />

            <PitfallCard
              title="No Plan for Ongoing Maintenance"
              description="Dashboards deployed then neglected with no resources for updates. Dashboards become stale and inaccurate over time."
              impact="Dashboards become stale and inaccurate"
              prevention="Budget for ongoing support (1 FTE permanent). Establish change request process. Review effectiveness quarterly. Plan for regulatory changes."
            />

            <PitfallCard
              title="Security Afterthought"
              description="Security not considered until late in project causes delays at go-live and potential data breaches."
              impact="Delays at go-live, potential data breaches"
              prevention="Define security requirements in Phase 1. Involve InfoSec team from start. Test security throughout. Conduct threat modeling and DPIA if processing vulnerable customer data."
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CDT3ATechnologyRequirementsPart1;
