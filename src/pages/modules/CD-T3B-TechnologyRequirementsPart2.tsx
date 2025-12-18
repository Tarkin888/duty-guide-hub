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
  RefreshCw,
  Rocket,
  Wrench,
  TestTube,
  GraduationCap,
  Link
} from "lucide-react";

const MODULE_ID = "cd-t3b";

const CDT3BTechnologyRequirementsPart2 = () => {
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
                <Badge variant="secondary">Part 2 of 2</Badge>
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
        {/* Module Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                CD-T3B: Technology Enablement Implementation
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Part 2: Operations & Embedding
              </p>
            </div>
          </div>

          {/* Module Metadata */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Duration: 12-16 weeks</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Owners: IT, Compliance, Business Units</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              <span>Phase: Development to Continuous Improvement</span>
            </div>
          </div>
        </div>

        {/* Navigation to Part 1 */}
        <Card className="mb-6 border-info/20 bg-info/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link className="h-5 w-5 text-info" />
                <div>
                  <p className="font-medium text-foreground">This is Part 2 of the Technology Enablement module</p>
                  <p className="text-sm text-muted-foreground">Part 1 covers Foundation & Selection (Phases 1-2, Steps 1-7)</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/modules/cd-t3a-technology-requirements-part1")}>
                View Part 1
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2 h-auto p-2 bg-muted/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">Overview</TabsTrigger>
            <TabsTrigger value="regulatory" className="data-[state=active]:bg-background">Regulatory</TabsTrigger>
            <TabsTrigger value="implementation" className="data-[state=active]:bg-background">Implementation</TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-background">Templates</TabsTrigger>
            <TabsTrigger value="success" className="data-[state=active]:bg-background">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls" className="data-[state=active]:bg-background">Pitfalls</TabsTrigger>
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
                <p className="text-muted-foreground leading-relaxed">
                  This module completes the Technology Enablement journey by guiding firms through system configuration, 
                  dashboard implementation, data integration, testing, deployment, and continuous improvement. While Part 1 
                  established the foundation and selection framework, Part 2 focuses on operational delivery and embedding 
                  technology into business-as-usual.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Settings className="h-4 w-4 text-primary" />
                        Configuration & Integration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• CRM vulnerability flagging</li>
                        <li>• Product management enhancements</li>
                        <li>• Complaints system integration</li>
                        <li>• MI dashboard deployment</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        Data & Automation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Automated data collection</li>
                        <li>• Data migration procedures</li>
                        <li>• Third-party integrations</li>
                        <li>• Quality monitoring</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TestTube className="h-4 w-4 text-primary" />
                        Testing & Deployment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Comprehensive system testing</li>
                        <li>• User acceptance testing</li>
                        <li>• Phased roll-out strategy</li>
                        <li>• Go-live readiness</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-primary" />
                        Continuous Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Technology effectiveness monitoring</li>
                        <li>• Enhancement pipeline</li>
                        <li>• Technology roadmap reviews</li>
                        <li>• Support model establishment</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Key Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Key Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Configuration</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• System configuration specs</li>
                      <li>• CRM enhancements live</li>
                      <li>• Product management system updated</li>
                      <li>• Complaints system configured</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Dashboards & MI</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 7 Consumer Duty dashboards live</li>
                      <li>• Automated data collection</li>
                      <li>• Alert configuration complete</li>
                      <li>• Board reporting automated</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Operational</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Testing completed and signed off</li>
                      <li>• Training materials and delivery</li>
                      <li>• Support model established</li>
                      <li>• Technology roadmap defined</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-primary" />
                  Implementation Phases (Part 2)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Development & Configuration</h4>
                      <p className="text-sm text-muted-foreground">Weeks 8-14: Configure core systems, build dashboards, implement automation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Data Migration & Integration</h4>
                      <p className="text-sm text-muted-foreground">Weeks 12-16: Migrate historical data, integrate third-party systems</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Testing & Validation</h4>
                      <p className="text-sm text-muted-foreground">Weeks 14-18: System testing, UAT, training materials</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Deployment & Go-Live</h4>
                      <p className="text-sm text-muted-foreground">Weeks 16-20: Phased roll-out, support establishment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">7</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Continuous Improvement</h4>
                      <p className="text-sm text-muted-foreground">Week 20+: Ongoing monitoring, enhancements, roadmap review</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Regulatory Context
                </CardTitle>
                <CardDescription>
                  FCA expectations for technology supporting Consumer Duty compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA"
                  reference="PS22/9 - Consumer Duty"
                  quote="Firms should have systems and controls in place that enable them to identify and respond to the individual needs of customers, including those with characteristics of vulnerability."
                />

                <RegulatoryQuote
                  source="FCA"
                  reference="Board Report Expectations"
                  quote="Board reports should be clear, focused and supported by high-quality data. Information overload and poor data quality undermine the Board's ability to provide effective challenge and oversight."
                />

                <RegulatoryQuote
                  source="FCA"
                  reference="Multi-Firm Review Findings"
                  quote="Technology should augment human judgment, not replace it. Automated flags and scores are prompts for further investigation, not final decisions."
                />
              </CardContent>
            </Card>

            {/* Key Technology Principles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Key Technology Principles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      Data Quality is Paramount
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      MI must be accurate, complete and timely. Poor data quality undermines all Consumer Duty compliance efforts.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Technology Augments Judgment
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Systems provide information and alerts; staff make informed decisions. No over-reliance on automation.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      MI Enables Oversight
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Dashboards must support Board decision-making with clear narrative, not just data. Exception reporting is key.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      Continuous Improvement Required
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Technology is not "set and forget." Regular effectiveness reviews and enhancements are expected.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Considerations */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Security Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="gdpr">
                    <AccordionTrigger>UK GDPR & Data Protection</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Lawful basis for processing vulnerability data (legitimate interest or consent)</li>
                        <li>• Privacy impact assessment for new data collection</li>
                        <li>• Data minimisation - collect only what's needed</li>
                        <li>• Appropriate retention periods</li>
                        <li>• Secure storage and access controls</li>
                        <li>• Subject access request handling</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="audit">
                    <AccordionTrigger>Audit Trail Requirements</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Log all system configuration decisions and approvals</li>
                        <li>• Maintain evidence of testing and sign-offs</li>
                        <li>• Record data quality assessments</li>
                        <li>• Document vendor due diligence</li>
                        <li>• Track changes to dashboards and reports</li>
                        <li>• Retain for regulatory examination (6+ years)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="vendor">
                    <AccordionTrigger>Third-Party Risk Management</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Due diligence on technology vendors</li>
                        <li>• Contractual requirements for Consumer Duty support</li>
                        <li>• Data processing agreements</li>
                        <li>• Exit strategies and data portability</li>
                        <li>• Ongoing vendor monitoring</li>
                        <li>• Sub-contractor oversight</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="continuity">
                    <AccordionTrigger>Business Continuity</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Consumer Duty requires continuous compliance</li>
                        <li>• Disaster recovery procedures for key systems</li>
                        <li>• Backup and restore testing</li>
                        <li>• Manual fallback procedures</li>
                        <li>• RTO/RPO definitions for Consumer Duty systems</li>
                        <li>• Regular DR testing</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            {/* Phase 3: Development & Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Phase 3: Development & Configuration (Weeks 8-14)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={8}
                  title="Configure Core Systems for Consumer Duty"
                  items={[
                    { id: "8.1", label: "CRM vulnerability flagging capability configured", details: "Status, details, communication format, adjustments, review date fields" },
                    { id: "8.2", label: "CRM visibility and alerts set up", details: "Pop-up alerts, banners, vulnerability icons on customer profiles" },
                    { id: "8.3", label: "Product suitability tracking enabled", details: "Target market match, negative target market checks, governance links" },
                    { id: "8.4", label: "Consumer Understanding testing results captured", details: "Test history, scores, outcomes, re-communication triggers" },
                    { id: "8.5", label: "Value assessment outcomes linked to customers", details: "FVA outcome display, poor-value alerts, value-based segmentation" },
                    { id: "8.6", label: "Communication preferences expanded", details: "Format needs, optimal contact times, language preferences" },
                    { id: "8.7", label: "Product management system enhancements complete", details: "Target markets, FVA integration, distribution tracking, review workflows" },
                    { id: "8.8", label: "Complaints system configured", details: "Root cause analysis, vulnerability flagging, MI and reporting" },
                    { id: "8.9", label: "Contact centre systems enhanced", details: "Call routing, screen-pop context, quality monitoring, knowledge base" },
                    { id: "8.10", label: "Document management structure created", details: "Evidence repository, Board pack assembly, version control" }
                  ]}
                />

                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={9}
                  title="Build/Integrate MI Dashboards"
                  items={[
                    { id: "9.1", label: "Dashboard development approach decided", details: "Build vs integrate, UI design, refresh schedule, access controls" },
                    { id: "9.2", label: "Overall Consumer Duty Performance Dashboard built", details: "RAG ratings for all outcomes, key issues, remediation actions" },
                    { id: "9.3", label: "Products & Services Outcome Dashboard built", details: "Product reviews, target market compliance, distribution metrics" },
                    { id: "9.4", label: "Price & Value Outcome Dashboard built", details: "FVA ratings, poor-value products, value improvement tracking" },
                    { id: "9.5", label: "Consumer Understanding Outcome Dashboard built", details: "Testing scores, pass rates, re-communication actions" },
                    { id: "9.6", label: "Consumer Support Outcome Dashboard built", details: "CSAT, FCR, sludge audit scores, support complaints" },
                    { id: "9.7", label: "Vulnerable Customers Dashboard built", details: "Flagged customers by driver, outcome parity analysis, adjustments" },
                    { id: "9.8", label: "Complaints & Issues Dashboard built", details: "Volumes by outcome, root causes, FOS referrals, remediation status" },
                    { id: "9.9", label: "Drill-down capabilities configured", details: "Click through to underlying data, filters, exports" },
                    { id: "9.10", label: "Automated alerts set up", details: "RAG rating changes, threshold breaches, overdue reviews" }
                  ]}
                />

                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={10}
                  title="Implement Data Collection Automation"
                  items={[
                    { id: "10.1", label: "Automated data extraction configured", details: "CRM, product systems, complaints, communications, support" },
                    { id: "10.2", label: "Data transformation and enrichment implemented", details: "Derived metrics, business rules, external data enrichment" },
                    { id: "10.3", label: "Data loading to MI database scheduled", details: "ETL processes, error handling, quality checks, logging" },
                    { id: "10.4", label: "API integrations built where needed", details: "Real-time data, third-party sources, web analytics" },
                    { id: "10.5", label: "End-to-end automation testing complete", details: "Data accuracy, calculation validation, refresh timing, alerts" }
                  ]}
                />

                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={11}
                  title="Develop Communication Testing Tools"
                  items={[
                    { id: "11.1", label: "Digital comprehension testing platform implemented", details: "Survey integration, embedded questions, scoring, reporting" },
                    { id: "11.2", label: "A/B testing capability established", details: "Traffic splitting, statistical testing, winner selection" },
                    { id: "11.3", label: "Behavioural testing tools deployed", details: "Screen recording, heatmaps, funnel analysis, CES measurement" },
                    { id: "11.4", label: "Readability checking integrated", details: "Flesch scoring, complex sentence highlighting, accessibility checking" },
                    { id: "11.5", label: "Testing results repository created", details: "Central storage, linked to communications, trend tracking" }
                  ]}
                />
              </CardContent>
            </Card>

            {/* Phase 4: Data Migration & Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Phase 4: Data Migration & Integration (Weeks 12-16)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={12}
                  title="Migrate Relevant Historical Data"
                  items={[
                    { id: "12.1", label: "Data scope identified", details: "Complaints 2+ years, FVAs, product reviews, testing results, support metrics" },
                    { id: "12.2", label: "Data cleansing completed", details: "Duplicates removed, formats standardised, mandatory fields filled" },
                    { id: "12.3", label: "Data mapping documented", details: "Old fields to new, type conversions, business rules, assumptions" },
                    { id: "12.4", label: "Migration executed", details: "Test migration, sample validation, full migration, reconciliation" },
                    { id: "12.5", label: "Post-migration validation complete", details: "Report comparison, spot checks, UAT, issue documentation" }
                  ]}
                />

                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={13}
                  title="Integrate Third-Party Systems"
                  items={[
                    { id: "13.1", label: "Distributor data feeds configured", details: "Sales data, complaints, customer feedback, claims" },
                    { id: "13.2", label: "Data sending to distributors enabled", details: "Target market updates, FVA outcomes, product information" },
                    { id: "13.3", label: "Email marketing platform integrated", details: "Segment syncing, campaign tracking, A/B results" },
                    { id: "13.4", label: "Customer feedback tools connected", details: "Survey triggers, response collection, review monitoring" },
                    { id: "13.5", label: "External data sources integrated", details: "Credit reference, deprivation indices, market data, FOS database" }
                  ]}
                />
              </CardContent>
            </Card>

            {/* Phase 5: Testing & Validation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5 text-primary" />
                  Phase 5: Testing & Validation (Weeks 14-18)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={14}
                  title="System Testing"
                  items={[
                    { id: "14.1", label: "Unit testing complete", details: "Individual components, calculations, validations, workflows" },
                    { id: "14.2", label: "Integration testing complete", details: "Data flows, API connections, automated collection, dashboard accuracy" },
                    { id: "14.3", label: "User acceptance testing complete", details: "Role-based testing, scenarios, feedback, issues documented" },
                    { id: "14.4", label: "Performance testing complete", details: "Load testing, stress testing, response times, report generation" },
                    { id: "14.5", label: "Security testing complete", details: "Penetration testing, access controls, encryption, vulnerability scanning" },
                    { id: "14.6", label: "Disaster recovery testing complete", details: "Backup/restore, failover, data integrity, business continuity" }
                  ]}
                />

                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={15}
                  title="Create Training Materials for New Systems"
                  items={[
                    { id: "15.1", label: "System user guides created", details: "Role-based guides, step-by-step instructions, troubleshooting, FAQ" },
                    { id: "15.2", label: "Video tutorials produced", details: "5-10 minute videos, system walkthroughs, accessible on intranet" },
                    { id: "15.3", label: "Quick reference cards designed", details: "One-pagers for common tasks, laminated for desks, digital versions" },
                    { id: "15.4", label: "Dashboard interpretation guides written", details: "What each metric means, good looks like, action to take, escalation" },
                    { id: "15.5", label: "Admin/power user documentation prepared", details: "Configuration, report creation, user administration, troubleshooting" }
                  ]}
                />
              </CardContent>
            </Card>

            {/* Phase 6: Deployment & Go-Live */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Phase 6: Deployment & Go-Live (Weeks 16-20)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={16}
                  title="Phased Roll-Out Strategy"
                  items={[
                    { id: "16.1", label: "Phase 1 Pilot completed (Weeks 16-17)", details: "Small pilot group, intensive support, daily feedback, quick fixes" },
                    { id: "16.2", label: "Phase 2 Expanded Pilot completed (Week 18)", details: "Larger group, performance monitoring, continued feedback" },
                    { id: "16.3", label: "Phase 3 Full Roll-Out executed (Weeks 19-20)", details: "All users, go-live communications, support on standby" },
                    { id: "16.4", label: "Post go-live stabilisation in progress", details: "Daily check-ins first week, weekly first month, feedback gathering" }
                  ]}
                />

                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={17}
                  title="Establish Technology Support Model"
                  items={[
                    { id: "17.1", label: "First-line support established", details: "Help desk, knowledge base, escalation procedures, SLAs" },
                    { id: "17.2", label: "Second-line support established", details: "IT team, technical issues, configuration support, performance monitoring" },
                    { id: "17.3", label: "Third-line support arranged", details: "Vendor support contracts, specialist support, escalation procedures" },
                    { id: "17.4", label: "Support documentation created", details: "Known issues log, resolution procedures, contacts, maintenance schedules" }
                  ]}
                />
              </CardContent>
            </Card>

            {/* Phase 7: Continuous Improvement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Phase 7: Continuous Improvement (Week 20+, Ongoing)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={18}
                  title="Monitor Technology Effectiveness"
                  items={[
                    { id: "18.1", label: "User adoption metrics tracked", details: "Login frequency, feature usage, time in system, satisfaction surveys" },
                    { id: "18.2", label: "System performance metrics monitored", details: "Uptime, response times, dashboard refresh, error rates" },
                    { id: "18.3", label: "Data quality metrics assessed", details: "Completeness, accuracy, timeliness, consistency" },
                    { id: "18.4", label: "Business value metrics evaluated", details: "Time saved, improved decisions, faster issue identification, risk reduction" },
                    { id: "18.5", label: "Quarterly effectiveness reviews scheduled", details: "Regular review cadence, improvement identification" }
                  ]}
                />

                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={19}
                  title="Implement Enhancement Pipeline"
                  items={[
                    { id: "19.1", label: "User feedback collection mechanism operational", details: "Surveys, focus groups, ticket analysis, executive feedback" },
                    { id: "19.2", label: "Enhancement prioritisation process defined", details: "Impact vs effort matrix, regulatory imperative, user demand" },
                    { id: "19.3", label: "Enhancement backlog management in place", details: "Grooming sessions, sprint planning, release planning" },
                    { id: "19.4", label: "Enhancement delivery process established", details: "Development, testing, communication, training update, deployment" }
                  ]}
                />

                <ChecklistSection
                  moduleId={MODULE_ID}
                  stepNumber={20}
                  title="Technology Roadmap Review"
                  items={[
                    { id: "20.1", label: "Annual technology review scheduled", details: "Fitness assessment, emerging opportunities, vendor review, strategy update" },
                    { id: "20.2", label: "Regulatory technology scanning in place", details: "RegTech innovations, industry events, pilot programmes, peer learning" },
                    { id: "20.3", label: "Multi-year technology roadmap defined", details: "12 months detailed, 1-3 years strategic, 3+ years vision" }
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Operational Templates (7-13)
                </CardTitle>
                <CardDescription>
                  Templates for system configuration, MI dashboards, and operational readiness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="7. System Configuration Specification Document"
                    description="Document detailed configuration requirements for each system including fields, workflows, security, and testing."
                    format="Word"
                    onPreview={() => handlePreviewTemplate("System Configuration Specification Document")}
                  />
                  <TemplateCard
                    title="8. MI Dashboard Specification & User Guide"
                    description="Full specification for dashboard developers plus user guide explaining how to interpret and act on data."
                    format="Word"
                    onPreview={() => handlePreviewTemplate("MI Dashboard Specification & User Guide")}
                  />
                  <TemplateCard
                    title="9. Data Collection Automation Design Document"
                    description="Design automated data collection including ETL processes, quality checks, scheduling, and error handling."
                    format="Word"
                    onPreview={() => handlePreviewTemplate("Data Collection Automation Design Document")}
                  />
                  <TemplateCard
                    title="10. Data Migration Plan & Validation Report"
                    description="Plan and document data migration including scope, mapping, cleansing, execution, and validation."
                    format="Excel"
                    onPreview={() => handlePreviewTemplate("Data Migration Plan & Validation Report")}
                  />
                  <TemplateCard
                    title="11. Third-Party Integration Specification"
                    description="Specify requirements for integrating with distributors, vendors, and external data providers."
                    format="Word"
                    onPreview={() => handlePreviewTemplate("Third-Party Integration Specification")}
                  />
                  <TemplateCard
                    title="12. System Testing Plan & Results Log"
                    description="Comprehensive testing plan covering unit, integration, UAT, performance, and security testing."
                    format="Excel"
                    onPreview={() => handlePreviewTemplate("System Testing Plan & Results Log")}
                  />
                  <TemplateCard
                    title="13. System Training Materials Checklist"
                    description="Track creation and delivery of all training materials including guides, videos, and quick references."
                    format="Excel"
                    onPreview={() => handlePreviewTemplate("System Training Materials Checklist")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Template Deep Dive */}
            <Card>
              <CardHeader>
                <CardTitle>Template Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="config-spec">
                    <AccordionTrigger>System Configuration Specification Structure</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p><strong>Section 1:</strong> System Overview - name, vendor, version, purpose, integration points</p>
                        <p><strong>Section 2:</strong> Configuration Requirements by Module - field type, values, validation, permissions</p>
                        <p><strong>Section 3:</strong> Data Fields Dictionary - field name, type, length, mandatory, values, purpose</p>
                        <p><strong>Section 4:</strong> Workflows - trigger, steps, decision points, notifications, escalations</p>
                        <p><strong>Section 5:</strong> Reports & Dashboards - purpose, data sources, filters, frequency</p>
                        <p><strong>Section 6:</strong> Security & Access Controls - roles, access matrix, encryption, audit logging</p>
                        <p><strong>Section 7:</strong> Testing Requirements - scenarios, acceptance criteria, sign-off</p>
                        <p><strong>Section 8:</strong> Training Requirements - audiences, content, delivery method</p>
                        <p><strong>Section 9:</strong> Go-Live Checklist - pre-deployment verification</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="dashboard-spec">
                    <AccordionTrigger>MI Dashboard Specification Components</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p><strong>Part A - Developer Specification:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Dashboard purpose and target audience</li>
                          <li>Refresh frequency and data sources</li>
                          <li>Widget definitions (type, calculation, colour coding, click actions)</li>
                          <li>Chart specifications (type, axes, series, colours)</li>
                          <li>Filter options and export capabilities</li>
                          <li>Mobile responsiveness requirements</li>
                        </ul>
                        <p className="mt-3"><strong>Part B - User Guide:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>How to access the dashboard</li>
                          <li>What each widget/chart shows and how to interpret</li>
                          <li>What "good" looks like and action for Amber/Red</li>
                          <li>Example interpretations with screenshots</li>
                          <li>Drill-down and filter instructions</li>
                          <li>Troubleshooting guide</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="testing-plan">
                    <AccordionTrigger>System Testing Plan Structure</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p><strong>Test Scenario Format:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Scenario ID, Name, Priority (High/Medium/Low)</li>
                          <li>Objective - what this test proves</li>
                          <li>Prerequisites - system state, test data required</li>
                          <li>Test steps (numbered actions)</li>
                          <li>Expected result and actual result</li>
                          <li>Pass/Fail, Tester, Date, Comments</li>
                        </ul>
                        <p className="mt-3"><strong>Results Summary Table:</strong></p>
                        <p>Track by phase: Total Scenarios, Passed, Failed, Blocked, Pass Rate, Status</p>
                        <p className="mt-3"><strong>Issues Log:</strong></p>
                        <p>Issue ID, Description, Severity, Test Scenario, Assigned To, Status, Resolution</p>
                        <p className="mt-3"><strong>Go-Live Recommendation:</strong></p>
                        <p>Critical issues resolved? Pass rate acceptable? User sign-off? Go/No-Go decision</p>
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
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Operational Success Criteria
                </CardTitle>
                <CardDescription>
                  Measurable criteria for successful technology operations and embedding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Configuration & Integration */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    Configuration & Integration
                  </h4>
                  <div className="grid gap-2">
                    {[
                      "All planned system configurations completed and tested",
                      "CRM enhanced with vulnerability flagging, product suitability tracking, value ratings",
                      "100% of critical integrations operational (distributor feeds, third-party tools)",
                      "Data collection automation running reliably (>99% uptime)",
                      "All MI dashboards populated with accurate data"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded bg-success/5">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dashboard & MI */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Dashboard & MI
                  </h4>
                  <div className="grid gap-2">
                    {[
                      "All 7 Consumer Duty dashboards live and accessible to designated users",
                      "Dashboard data refreshes automatically per schedule (no manual intervention)",
                      "Drill-down capabilities functional",
                      "Alerts configured and triggering appropriately",
                      "Executive team and Board receiving dashboard reports per agreed schedule"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded bg-success/5">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Adoption */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    User Adoption
                  </h4>
                  <div className="grid gap-2">
                    {[
                      ">90% of target users logged into new systems within first month",
                      ">80% of users rate system training as 'good' or 'excellent'",
                      "Key dashboards viewed at least weekly by designated users",
                      "Help desk tickets decreasing month-on-month after go-live"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded bg-success/5">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Quality */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    Data Quality
                  </h4>
                  <div className="grid gap-2">
                    {[
                      "Data completeness >95% (all mandatory fields populated)",
                      "Data accuracy validated through reconciliation with source systems",
                      "No critical data quality issues unresolved for >48 hours",
                      "Regular data quality monitoring in place"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded bg-success/5">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testing & QA */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TestTube className="h-4 w-4 text-primary" />
                    Testing & Quality Assurance
                  </h4>
                  <div className="grid gap-2">
                    {[
                      ">95% pass rate for critical test scenarios",
                      "All high and critical defects resolved before go-live",
                      "UAT sign-off obtained from all user groups",
                      "Performance testing confirms acceptable response times under load"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded bg-success/5">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operational Readiness */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    Operational Readiness
                  </h4>
                  <div className="grid gap-2">
                    {[
                      "Support model established (first/second/third line)",
                      "Help desk briefed and equipped with knowledge base",
                      "Disaster recovery procedures tested",
                      "Business continuity plans updated to reflect new systems",
                      "Vendor support contracts in place"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded bg-success/5">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continuous Improvement */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-primary" />
                    Continuous Improvement
                  </h4>
                  <div className="grid gap-2">
                    {[
                      "Enhancement request process established",
                      "User feedback collection mechanism operational",
                      "Quarterly technology effectiveness reviews scheduled",
                      "Technology roadmap defined for next 12+ months"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded bg-success/5">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Operational & Embedding Pitfalls (13-20)
                </CardTitle>
                <CardDescription>
                  Common implementation failures and how to avoid them
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PitfallCard
                  title="Pitfall 13: Poor Data Quality Undermining MI"
                  description="Presenting MI to Board that is inaccurate or incomplete, undermining decision-making and regulatory compliance."
                  impact="Board cannot trust data, cannot make informed decisions, increased regulatory risk from poor evidence."
                  prevention="Implement automated data quality checks, regular reconciliation between systems, clear data ownership, and monthly data quality dashboard reviews."
                />

                <PitfallCard
                  title="Pitfall 14: Dashboard Overload"
                  description="Providing excessive MI to Board (100+ page packs) without clear narrative or focus on key issues."
                  impact="Board overwhelmed, key issues missed, poor decision-making, valuable oversight time wasted."
                  prevention="Design dashboards for specific decisions, use RAG ratings and exception reporting, provide layered information (summary + drill-down), include 'So what?' narrative with data. Executive dashboard should fit on 1-2 screens."
                />

                <PitfallCard
                  title="Pitfall 15: 'Set and Forget' After Go-Live"
                  description="Implementing systems but not monitoring effectiveness or improving them over time."
                  impact="Systems become outdated, user workarounds proliferate, value erodes, non-compliance risk increases."
                  prevention="Quarterly technology effectiveness reviews, user feedback surveys, enhancement backlog management, dedicated resource for ongoing development. Consumer Duty is not a one-off project."
                />

                <PitfallCard
                  title="Pitfall 16: Technology Replacing Judgment"
                  description="Over-relying on automated flags and scores without human judgment and appropriate staff intervention."
                  impact="Vulnerable customers missed, inappropriate decisions made, regulatory expectations not met."
                  prevention="Train staff that technology augments judgment, flags are prompts for investigation not final decisions. Empower staff to override when appropriate, require human sign-off on critical decisions."
                />

                <PitfallCard
                  title="Pitfall 17: Inadequate Testing Before Go-Live"
                  description="Pressure to meet deadline leading to insufficient test coverage, superficial UAT, or launching with known defects."
                  impact="System defects in production, poor user experience, loss of confidence, delays to remediation."
                  prevention="Comprehensive test plan covering all scenarios, meaningful UAT with actual end-users, performance and stress testing, clear go/no-go criteria. Testing should be 30-40% of total implementation time."
                />

                <PitfallCard
                  title="Pitfall 18: Poor Integration Between Systems"
                  description="Fragmented systems requiring manual data consolidation for Board reports and operational decisions."
                  impact="Inaccurate data, delayed reporting, missed issues, staff frustration, evidence gaps for regulatory examination."
                  prevention="Map all integration points early, engage vendors on integration requirements, allocate sufficient time and budget, comprehensive integration testing. Consider middleware for complex integrations."
                />

                <PitfallCard
                  title="Pitfall 19: Vendor Lock-In Without Exit Strategy"
                  description="Proprietary data formats, no export capability, complex customisations making vendor changes impossible."
                  impact="Unable to change vendors, escalating costs, limited flexibility, strategic constraints."
                  prevention="Require data portability in vendor contracts, use open standards, document all customisations, regular data backups in portable format, plan for vendor changes from day one."
                />

                <PitfallCard
                  title="Pitfall 20: Training Users on System, Not Outcomes"
                  description="Training designed by IT focusing on which buttons to click, not why or what good outcomes look like."
                  impact="Staff can navigate system but don't understand purpose, poor quality data, wrong decisions made."
                  prevention="Training explains WHY (Consumer Duty outcomes), includes scenarios and decision-making, competency assessment tests judgment not just navigation, ongoing coaching not just one-time training."
                />
              </CardContent>
            </Card>

            {/* Best Practice Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Best Practice Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <h4 className="font-semibold text-success mb-2">Do</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Invest in data quality monitoring</li>
                      <li>• Design dashboards for decisions, not data</li>
                      <li>• Plan for continuous improvement from day one</li>
                      <li>• Train on outcomes, not just system features</li>
                      <li>• Test thoroughly before go-live (30-40% of time)</li>
                      <li>• Map integrations early and budget adequately</li>
                      <li>• Maintain exit strategies with vendors</li>
                      <li>• Empower staff to use judgment</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">Don't</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Present inaccurate data to Board</li>
                      <li>• Create 100+ page MI packs</li>
                      <li>• Assume go-live is the end</li>
                      <li>• Let technology replace human judgment</li>
                      <li>• Rush testing to meet deadlines</li>
                      <li>• Accept manual data consolidation</li>
                      <li>• Get locked into a single vendor</li>
                      <li>• Train on button-clicking only</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Footer */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" onClick={() => navigate("/modules/cd-t3a-technology-requirements-part1")}>
            ← Part 1: Foundation & Selection
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CDT3BTechnologyRequirementsPart2;
