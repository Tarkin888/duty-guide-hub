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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  Database, 
  FileText, 
  Clock, 
  Shield, 
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Users,
  Landmark,
  Scale,
  Target,
  ClipboardCheck,
  Eye,
  MessageSquare,
  AlertCircle,
  BookOpen,
  UserCheck,
  Building2,
  FileCheck,
  PresentationIcon,
  Gavel,
  Lock,
  TrendingUp
} from "lucide-react";

export default function CDI7BDataEvidenceManagementPart2() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handlePreview = (templateName: string) => {
    toast({
      title: "Preview",
      description: `Opening preview for ${templateName}...`,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    toast({
      title: "Export",
      description: "Preparing module export...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-6 print:bg-white print:text-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              className="text-primary-foreground hover:bg-primary/80 print:hidden"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex gap-2 print:hidden">
              <Button variant="secondary" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="secondary" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-lg">
              <ClipboardCheck className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="border-accent text-primary-foreground">
                  CD-I7B
                </Badge>
                <Badge variant="outline" className="border-accent text-primary-foreground">
                  Implementation Module
                </Badge>
                <Badge variant="outline" className="border-accent text-primary-foreground">
                  Part 2 of 2
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Data & Evidence Management Framework
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Part 2: Attestation & Governance - SMF Accountability, Board Reporting, and Regulatory Readiness
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 print:hidden">
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
                  Purpose & Objectives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-lg font-medium text-primary">
                    "Establish robust attestation and governance processes for Consumer Duty evidence and Board reporting to support senior management accountability."
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Part 2 Focus Areas
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• SMF attestation requirements and frameworks</li>
                      <li>• Board reporting evidence pack structure</li>
                      <li>• Annual Consumer Duty assessment evidence</li>
                      <li>• Evidence governance and quality monitoring</li>
                      <li>• Regulatory examination readiness</li>
                      <li>• Evidence challenge and validation processes</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Key Deliverables
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Attestation framework and procedures</li>
                      <li>• Board reporting evidence pack structure</li>
                      <li>• Evidence governance committee ToR</li>
                      <li>• Regulatory examination readiness checklist</li>
                      <li>• Evidence challenge protocol</li>
                      <li>• SMF responsibility mapping for evidence</li>
                      <li>• Evidence escalation protocols</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">2-4 Weeks</p>
                  <p className="text-sm text-muted-foreground">For governance implementation</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Regulatory Basis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">SM&CR + Consumer Duty</p>
                  <p className="text-sm text-muted-foreground">Board oversight requirements</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Critical Principle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">SMF Personal Accountability</p>
                  <p className="text-sm text-muted-foreground">Evidence must support attestation</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Connection to Part 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Part 1 Established:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        Evidence requirements matrix by outcome
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        Documentation standards and protocols
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        Repository structure and taxonomy
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        Record retention schedules
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        Access controls and audit trails
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Part 2 Builds:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary mt-0.5" />
                        Attestation framework leveraging evidence repository
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary mt-0.5" />
                        Board reporting using documented evidence
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary mt-0.5" />
                        Governance committee overseeing evidence quality
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary mt-0.5" />
                        Regulatory readiness using organized records
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary mt-0.5" />
                        Challenge processes validating evidence integrity
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <RegulatoryQuote
              quote="Senior managers must be able to attest to compliance, supported by robust evidence. The board must review and approve an assessment of whether the firm is delivering good outcomes at least annually."
              source="FCA FG22/5 & SM&CR Requirements"
            />
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  SMF Accountability for Evidence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  quote="A senior manager responsible for a function has a duty of responsibility. If there's a breach in their area and they don't have reasonable steps evidence, they can be held personally accountable."
                  source="SM&CR Requirements"
                />

                <div className="space-y-4">
                  <h4 className="font-semibold">Key Accountability Principles</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium text-sm text-primary mb-2">PERSONAL RESPONSIBILITY</h5>
                      <p className="text-sm text-muted-foreground">SMFs are individually accountable for their areas of responsibility</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium text-sm text-primary mb-2">REASONABLE STEPS</h5>
                      <p className="text-sm text-muted-foreground">Must demonstrate they took reasonable steps to comply with obligations</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium text-sm text-primary mb-2">EVIDENCE REQUIREMENT</h5>
                      <p className="text-sm text-muted-foreground">"Reasonable steps" must be evidenced, not just asserted verbally</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium text-sm text-primary mb-2">CONTEMPORANEOUS</h5>
                      <p className="text-sm text-muted-foreground">Evidence created at time of action, not retrospectively assembled</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium text-sm text-primary mb-2">SUFFICIENT</h5>
                      <p className="text-sm text-muted-foreground">Evidence must be proportionate to the risk and materiality</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium text-sm text-primary mb-2">ACCESSIBLE</h5>
                      <p className="text-sm text-muted-foreground">SMFs must be able to access evidence relevant to their accountability</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">What SMFs Must Be Able to Demonstrate</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      Clear understanding of Consumer Duty obligations in their area
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      Systems and controls designed to deliver good outcomes
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      Regular monitoring of outcomes (MI review)
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      Issues identified and acted upon
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      Staff trained and competent
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      Escalations made appropriately
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      Decisions documented with rationale
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                  Attestation Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="board-attestation">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-primary" />
                        Board-Level Attestation (Annual)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <RegulatoryQuote
                        quote="The board must review and approve an assessment of whether the firm is delivering good outcomes at least annually."
                        source="FCA FG22/5 para 10.1"
                      />
                      
                      <div className="space-y-4">
                        <h5 className="font-semibold">What Board Must Attest To:</h5>
                        <ul className="grid md:grid-cols-2 gap-2">
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Good outcomes being delivered for retail customers
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Cross-cutting rules complied with
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Four outcomes requirements met
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Vulnerable customers receiving appropriate support
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Distribution chain managed effectively
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            MI quality sufficient to support conclusions
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Culture aligned with Consumer Duty
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Actions agreed where issues identified
                          </li>
                        </ul>

                        <h5 className="font-semibold mt-4">Evidence Required to Support Board Attestation:</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Comprehensive annual Consumer Duty assessment report</li>
                          <li>• MI dashboard showing outcomes by segment</li>
                          <li>• Product review summaries</li>
                          <li>• Fair Value Assessment outcomes</li>
                          <li>• Testing results (communications, support)</li>
                          <li>• Complaint and FOS trend analysis</li>
                          <li>• Vulnerable customer outcome parity analysis</li>
                          <li>• Distribution chain oversight evidence</li>
                          <li>• Training completion records</li>
                          <li>• Issue and remediation tracking</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="smf-attestation">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-primary" />
                        SMF-Level Attestation (Ongoing)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <RegulatoryQuote
                        quote="SMF holders must be able to demonstrate reasonable steps taken in their areas."
                        source="SM&CR Requirement"
                      />
                      
                      <div className="space-y-4">
                        <h5 className="font-semibold">What SMFs Must Attest To:</h5>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Understanding obligations in their area
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Systems and controls designed appropriately
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Staff trained and competent
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Monitoring in place and reviewed regularly
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Issues identified and escalated
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Remediation actions taken
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            Outcomes improving
                          </li>
                        </ul>

                        <h5 className="font-semibold mt-4">Evidence Required:</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Statement of Responsibilities (SoR) mapping Consumer Duty tasks</li>
                          <li>• Evidence of regular MI review (meeting minutes, sign-offs)</li>
                          <li>• Training records for their area</li>
                          <li>• Issue logs with remediation tracking</li>
                          <li>• Escalation records (when issues raised to Board/committee)</li>
                          <li>• Audit findings and responses</li>
                          <li>• Personal notes/records of oversight activities</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="process-attestation">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        Process-Level Attestation (Per Activity)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">Key processes have sign-off from responsible parties at time of execution.</p>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Process</TableHead>
                            <TableHead>Required Approvers</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Product Approval</TableCell>
                            <TableCell>Product Manager + Compliance + SMF approval</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Fair Value Assessment</TableCell>
                            <TableCell>Pricing/Product + Finance + SMF approval</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Communication Launch</TableCell>
                            <TableCell>Marketing + Compliance + Legal approval</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Policy Update</TableCell>
                            <TableCell>Policy owner + Compliance + SMF approval</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <p className="text-sm text-muted-foreground italic">Evidence: Signed approval documents with clear accountability trail</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PresentationIcon className="h-5 w-5 text-primary" />
                  Board Reporting Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="annual-report">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Annual Consumer Duty Assessment (Mandatory)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800">
                          <strong>Mandatory Requirement:</strong> The board must review and approve an assessment of whether the firm is delivering good outcomes at least annually.
                        </p>
                      </div>

                      <h5 className="font-semibold">Report Must Include:</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h6 className="font-medium text-sm">OVERALL ASSESSMENT</h6>
                          <p className="text-xs text-muted-foreground">Clear statement on compliance status</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h6 className="font-medium text-sm">EXECUTIVE SUMMARY</h6>
                          <p className="text-xs text-muted-foreground">High-level findings, issues, actions</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h6 className="font-medium text-sm">FOUR OUTCOMES ANALYSIS</h6>
                          <p className="text-xs text-muted-foreground">Dedicated section for each outcome</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h6 className="font-medium text-sm">VULNERABLE CUSTOMERS</h6>
                          <p className="text-xs text-muted-foreground">Separate analysis of outcomes vs others</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h6 className="font-medium text-sm">MI QUALITY</h6>
                          <p className="text-xs text-muted-foreground">Assessment of data sufficiency and quality</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h6 className="font-medium text-sm">DISTRIBUTION CHAIN</h6>
                          <p className="text-xs text-muted-foreground">Oversight and outcomes across chain</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h6 className="font-medium text-sm">CULTURE</h6>
                          <p className="text-xs text-muted-foreground">Assessment of culture alignment</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h6 className="font-medium text-sm">ISSUES AND ACTIONS</h6>
                          <p className="text-xs text-muted-foreground">Log of issues, root causes, remediation plans</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="quarterly-report">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Quarterly/Monthly Reporting (Best Practice)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">While annual is mandatory, best practice is regular Board updates:</p>
                      
                      <h5 className="font-semibold">Typical Quarterly Report Includes:</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Dashboard of key outcome metrics (vs targets and trends)</li>
                        <li>• Product changes (new, modified, withdrawn)</li>
                        <li>• Fair value reviews completed</li>
                        <li>• Communication testing results</li>
                        <li>• Support channel performance</li>
                        <li>• Complaints themes and volumes</li>
                        <li>• Vulnerable customer metrics</li>
                        <li>• Issues and escalations</li>
                        <li>• Actions completed/in progress</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="exception-reporting">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        Exception Reporting (As Needed)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h5 className="font-semibold text-red-800 mb-2">Immediate Board Notification Required For:</h5>
                        <ul className="space-y-1 text-sm text-red-700">
                          <li>• Material breach of Consumer Duty</li>
                          <li>• Significant customer harm identified</li>
                          <li>• Regulatory concern or enforcement action</li>
                          <li>• Major system failure affecting outcomes</li>
                          <li>• Whistleblowing allegation related to outcomes</li>
                          <li>• Significant third-party failure in distribution chain</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  "Reasonable Grounds" Defence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Critical Legal Concept for SMF Protection</h5>
                  <p className="text-sm text-blue-700">
                    <strong>Definition:</strong> "Reasonable grounds" means a belief or assessment based on information that a reasonable person would consider sufficient at the time.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-semibold text-green-700 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      What Demonstrates "Reasonable Grounds"
                    </h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>✓ Decision-making record showing options considered</li>
                      <li>✓ Data and analysis that supported decision</li>
                      <li>✓ Assumptions made and rationale</li>
                      <li>✓ Risks identified and mitigations</li>
                      <li>✓ Expert input where appropriate</li>
                      <li>✓ Compliance with internal policies</li>
                      <li>✓ Consistency with regulatory guidance</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-semibold text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      What Does NOT Constitute "Reasonable Grounds"
                    </h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>✗ "Everyone else was doing it"</li>
                      <li>✗ "We didn't think we needed to"</li>
                      <li>✗ Relying on assurances without checking</li>
                      <li>✗ No documentation of decision-making</li>
                      <li>✗ Ignoring obvious red flags</li>
                      <li>✗ Not seeking relevant expertise</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <h5 className="font-semibold">Example: SMF Approves Product Pricing Based on FVA</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h6 className="font-medium text-green-800 mb-2">✓ GOOD EVIDENCE (Reasonable Grounds)</h6>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• FVA completed by qualified team</li>
                        <li>• Methodology approved by Compliance</li>
                        <li>• Data sources validated</li>
                        <li>• Peer benchmarking included</li>
                        <li>• Vulnerable customers specifically considered</li>
                        <li>• SMF reviewed FVA, asked questions, signed off</li>
                        <li>• All documented contemporaneously</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h6 className="font-medium text-red-800 mb-2">✗ POOR EVIDENCE (No Reasonable Grounds)</h6>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• No FVA conducted</li>
                        <li>• SMF signed off without review</li>
                        <li>• Data sources unknown/unreliable</li>
                        <li>• No consideration of vulnerable customers</li>
                        <li>• Evidence created after the fact</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSearch className="h-5 w-5 text-primary" />
                  FCA Scrutiny of Attestations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-semibold">Board Attestation Scrutiny - FCA Will Examine:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Does report genuinely assess outcomes or just describe processes?</li>
                      <li>• Is MI sufficient to support conclusions?</li>
                      <li>• Are vulnerable customers specifically addressed?</li>
                      <li>• Were issues identified and action plans credible?</li>
                      <li>• Did Board challenge or just accept management assertions?</li>
                      <li>• Is there audit trail from data to report conclusions?</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-semibold">SMF Attestation Scrutiny - FCA Will Examine:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Can SMF articulate their specific responsibilities?</li>
                      <li>• Can they show evidence of regular oversight (MI review)?</li>
                      <li>• Can they demonstrate they knew about issues and took action?</li>
                      <li>• Is there trail from issue identification → escalation → resolution?</li>
                      <li>• Did they ensure staff were trained?</li>
                      <li>• Did they challenge their teams or accept assurances?</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    FCA Red Flags
                  </h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-sm font-medium text-amber-700 mb-1">Board Attestation:</h6>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>⚠️ Generic report (could apply to any firm)</li>
                        <li>⚠️ No specific data or metrics</li>
                        <li>⚠️ No issues identified (suggests lack of scrutiny)</li>
                        <li>⚠️ Board minutes show no evidence of discussion</li>
                        <li>⚠️ Report conclusions contradict underlying evidence</li>
                        <li>⚠️ Last-minute creation (just before deadline)</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-sm font-medium text-amber-700 mb-1">SMF Attestation:</h6>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>⚠️ SMF cannot explain what they're accountable for</li>
                        <li>⚠️ No evidence of MI review (no minutes, sign-offs)</li>
                        <li>⚠️ SMF unaware of issues in their area</li>
                        <li>⚠️ No evidence of staff training</li>
                        <li>⚠️ SMF relied entirely on others (delegated accountability)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-primary" />
                  Regulatory Examination Preparation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h5 className="font-semibold">FCA Examination Process</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">1. Request for Information</Badge>
                    <Badge variant="outline">2. Document Review</Badge>
                    <Badge variant="outline">3. On-site Visit (Interviews)</Badge>
                    <Badge variant="outline">4. Follow-up Questions</Badge>
                    <Badge variant="outline">5. Findings Letter</Badge>
                    <Badge variant="outline">6. Remediation Requirements</Badge>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="typical-requests">
                    <AccordionTrigger>Typical Document Requests</AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <li>• Board papers and minutes (past 2-3 years)</li>
                        <li>• Annual Consumer Duty assessments</li>
                        <li>• Product review and FVA documentation</li>
                        <li>• Communication testing results</li>
                        <li>• MI dashboards and reports</li>
                        <li>• Distribution chain agreements and MI</li>
                        <li>• Complaints analysis and RCA</li>
                        <li>• Training records</li>
                        <li>• Policies and procedures</li>
                        <li>• Issue and remediation logs</li>
                        <li>• SMF Statements of Responsibilities</li>
                        <li>• Organisational charts and RACI matrices</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="interview-questions">
                    <AccordionTrigger>Typical Interview Questions</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-3">
                        <h6 className="font-semibold">To Board/NEDs:</h6>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• "How does the Board oversee Consumer Duty?"</li>
                          <li>• "What MI do you review and how often?"</li>
                          <li>• "Can you give an example of where you challenged management?"</li>
                          <li>• "What assurance do you have that outcomes are good?"</li>
                          <li>• "How do you know vulnerable customers are getting good outcomes?"</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h6 className="font-semibold">To SMFs:</h6>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• "What are you personally accountable for under Consumer Duty?"</li>
                          <li>• "Walk me through how you monitor outcomes in your area"</li>
                          <li>• "Tell me about an issue you identified and how you resolved it"</li>
                          <li>• "How do you know your staff understand their responsibilities?"</li>
                          <li>• "Show me evidence that supports your attestation"</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h6 className="font-semibold">To Operational Staff:</h6>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• "Do you understand the Consumer Duty?"</li>
                          <li>• "How does it change how you do your job?"</li>
                          <li>• "What do you do if you identify a poor customer outcome?"</li>
                          <li>• "Can you show me how you use MI to improve outcomes?"</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="best-practices">
                    <AccordionTrigger>Preparation Best Practices</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Mock examination (internal audit conducts practice run)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Document retrieval test (can you find all requested docs in 48 hours?)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Interview preparation (Board and SMFs rehearse answers)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Evidence completeness check (gaps remediated)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Consistency check (report narratives match underlying evidence)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          "Clean room" review (external consultant reviews with fresh eyes)
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Phase 4: Attestation Framework (Weeks 1-2)</CardTitle>
                <CardDescription>
                  Building structured approach to senior management and Board attestations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  stepNumber={10}
                  title="Step 10: Develop Attestation Framework"
                  moduleId="cd-i7b"
                  items={[
                    { id: "10.1", label: "Map all attestation requirements (Board, SMF, process-level)" },
                    { id: "10.2", label: "Define what each attestation covers" },
                    { id: "10.3", label: "Specify evidence required for each attestation" },
                    { id: "10.4", label: "Create attestation statement templates" },
                    { id: "10.5", label: "Define sign-off procedures and workflows" },
                    { id: "10.6", label: "Set review/renewal frequencies" },
                    { id: "10.7", label: "Implement attestation tracking system" },
                  ]}
                />

                <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                  <h5 className="font-semibold">Attestation Hierarchy</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-background rounded-lg p-4 border-2 border-primary">
                      <h6 className="font-bold text-primary mb-2">LEVEL 1: Board Annual Attestation</h6>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li><strong>Frequency:</strong> Annual (minimum)</li>
                        <li><strong>Covers:</strong> Whole firm compliance</li>
                        <li><strong>Evidence:</strong> Comprehensive assessment + MI</li>
                        <li><strong>Sign-off:</strong> Board Chair + CEO</li>
                        <li><strong>Format:</strong> Board resolution in minutes</li>
                      </ul>
                    </div>
                    <div className="bg-background rounded-lg p-4 border-2 border-accent">
                      <h6 className="font-bold text-accent mb-2">LEVEL 2: SMF Attestations</h6>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li><strong>Frequency:</strong> Annual + as needed</li>
                        <li><strong>Covers:</strong> SMF's area of responsibility</li>
                        <li><strong>Evidence:</strong> MI reviews, training, issue logs</li>
                        <li><strong>Sign-off:</strong> Individual SMF</li>
                        <li><strong>Format:</strong> Formal attestation statement</li>
                      </ul>
                    </div>
                    <div className="bg-background rounded-lg p-4 border-2 border-muted-foreground">
                      <h6 className="font-bold mb-2">LEVEL 3: Process Attestations</h6>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li><strong>Frequency:</strong> Per transaction/activity</li>
                        <li><strong>Covers:</strong> Specific processes</li>
                        <li><strong>Evidence:</strong> Completed assessment + chain</li>
                        <li><strong>Sign-off:</strong> Process owner + SMF</li>
                        <li><strong>Format:</strong> Approval signature on doc</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <ChecklistSection
                  stepNumber={11}
                  title="Step 11: Create Board Reporting Evidence Pack Structure"
                  moduleId="cd-i7b"
                  items={[
                    { id: "11.1", label: "Define core evidence requirements for annual assessment" },
                    { id: "11.2", label: "Create evidence pack template with all sections" },
                    { id: "11.3", label: "Specify data requirements for each section" },
                    { id: "11.4", label: "Define review and challenge process before Board" },
                    { id: "11.5", label: "Establish version control for Board packs" },
                    { id: "11.6", label: "Train teams on completing evidence pack" },
                  ]}
                />

                <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                  <h5 className="font-semibold">Board Evidence Pack Structure (15-25 pages main body)</h5>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { section: "1", title: "Executive Summary & Attestation", pages: "2-3 pages" },
                      { section: "2", title: "Scope & Methodology", pages: "1 page" },
                      { section: "3", title: "Four Outcomes Assessment", pages: "4-8 pages" },
                      { section: "4", title: "Vulnerable Customers", pages: "2-3 pages" },
                      { section: "5", title: "Distribution Chain", pages: "1-2 pages" },
                      { section: "6", title: "MI & Monitoring", pages: "2 pages" },
                      { section: "7", title: "Culture & Governance", pages: "1-2 pages" },
                      { section: "8", title: "Issues, Risks & Remediation", pages: "2-4 pages" },
                      { section: "9", title: "Forward-Looking", pages: "1-2 pages" },
                    ].map((item) => (
                      <div key={item.section} className="bg-background rounded-lg p-3 border">
                        <Badge variant="outline" className="mb-1">Section {item.section}</Badge>
                        <h6 className="font-medium text-sm">{item.title}</h6>
                        <p className="text-xs text-muted-foreground">{item.pages}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">Plus Appendices: Full MI data, product reviews, FVA summaries, testing results, complaints analysis, training records, SMF attestations</p>
                </div>

                <ChecklistSection
                  stepNumber={12}
                  title="Step 12: Implement Evidence Challenge Process"
                  moduleId="cd-i7b"
                  items={[
                    { id: "12.1", label: "Define challenge requirements (who challenges what)" },
                    { id: "12.2", label: "Create challenge checklist and question bank" },
                    { id: "12.3", label: "Establish challenge forum (pre-Board review meeting)" },
                    { id: "12.4", label: "Train challengers (NEDs, Compliance, Internal Audit)" },
                    { id: "12.5", label: "Document challenge and response process" },
                    { id: "12.6", label: "Escalate unresolved challenges to Board" },
                  ]}
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-3">Challenge Questions to Ask</h5>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-blue-700">
                    <li>• "How do we know this is true?"</li>
                    <li>• "What evidence supports this assertion?"</li>
                    <li>• "Have we considered alternatives?"</li>
                    <li>• "What could go wrong?"</li>
                    <li>• "Are we being too optimistic?"</li>
                    <li>• "What would the regulator say?"</li>
                    <li>• "Is this complete or are there gaps?"</li>
                    <li>• "How does this compare to peers?"</li>
                    <li>• "What are vulnerable customers experiencing?"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phase 5: Regulatory Examination Readiness (Weeks 2-4)</CardTitle>
                <CardDescription>
                  Preparing for FCA scrutiny with comprehensive evidence and interview readiness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  stepNumber={13}
                  title="Step 13: Conduct Regulatory Examination Readiness Assessment"
                  moduleId="cd-i7b"
                  items={[
                    { id: "13.1", label: "Review FCA examination priorities (2025/26 focus areas)" },
                    { id: "13.2", label: "Self-assess readiness across all areas" },
                    { id: "13.3", label: "Conduct mock document request exercise" },
                    { id: "13.4", label: "Test document retrieval speed (can find within 48 hours?)" },
                    { id: "13.5", label: "Identify evidence gaps and remediate" },
                    { id: "13.6", label: "Conduct mock interviews with Board/SMFs" },
                  ]}
                />

                <div className="space-y-4">
                  <h5 className="font-semibold">Readiness Assessment Areas</h5>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="documentation">
                      <AccordionTrigger>Documentation Readiness</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            All Board papers and minutes available and well-organised
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Annual Consumer Duty assessments complete
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Product reviews and FVAs for all in-scope products
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Communication testing results documented
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            MI dashboards current and complete
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Complaints analysis and RCA documented
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Training records up to date
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Issue and remediation logs current
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Distribution chain agreements and MI available
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            SMF Statements of Responsibilities reflect Consumer Duty
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="quality">
                      <AccordionTrigger>Evidence Quality</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Evidence contemporaneous (dated correctly)
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Evidence complete (no gaps or "TBC")
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Evidence clear and understandable
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Evidence supports conclusions in reports
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Audit trail from data to Board assertions clear
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Version control functioning
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            No inconsistencies between documents
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="interviews">
                      <AccordionTrigger>Interview Readiness</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Board/NEDs can articulate oversight approach
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            SMFs can demonstrate reasonable steps taken
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Staff understand Consumer Duty and their role
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Examples of good practice can be described
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Issues identified and actions taken can be explained
                          </li>
                          <li className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            Challenge process can be demonstrated
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <ChecklistSection
                  stepNumber={14}
                  title="Step 14: Prepare Board and SMFs for Regulatory Interaction"
                  moduleId="cd-i7b"
                  items={[
                    { id: "14.1", label: "Briefing sessions for Board/NEDs on FCA examination" },
                    { id: "14.2", label: "SMF coaching on demonstrating reasonable steps" },
                    { id: "14.3", label: "Practice interviews (mock examination)" },
                    { id: "14.4", label: "Review key evidence each individual may be asked about" },
                    { id: "14.5", label: "Messaging alignment (consistent narrative)" },
                    { id: "14.6", label: "FAQ development for common questions" },
                  ]}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h6 className="font-semibold mb-3">Board/NED Key Messages to Convey</h6>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Board takes Consumer Duty very seriously</li>
                      <li>• Regular oversight through [committee], quarterly reviews</li>
                      <li>• MI shows [outcomes], with actions on [issues]</li>
                      <li>• Culture change driven from top (examples)</li>
                      <li>• Vulnerable customers specifically monitored</li>
                      <li>• Open and transparent with regulator</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h6 className="font-semibold mb-3">SMF Key Messages to Convey</h6>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Clear on specific responsibilities (reference SoR)</li>
                      <li>• Regular oversight through [meetings, MI review]</li>
                      <li>• Staff trained and competent (evidence)</li>
                      <li>• Issues identified proactively (examples)</li>
                      <li>• Actions taken to remediate (examples)</li>
                      <li>• Escalated appropriately (examples)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phase 6: Evidence Governance (Weeks 3-4)</CardTitle>
                <CardDescription>
                  Establishing ongoing governance and quality monitoring for evidence management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  stepNumber={15}
                  title="Step 15: Establish Evidence Governance Committee"
                  moduleId="cd-i7b"
                  items={[
                    { id: "15.1", label: "Define committee purpose and scope" },
                    { id: "15.2", label: "Establish membership (cross-functional)" },
                    { id: "15.3", label: "Create terms of reference" },
                    { id: "15.4", label: "Set meeting frequency (quarterly minimum)" },
                    { id: "15.5", label: "Define agenda and reporting" },
                    { id: "15.6", label: "Link to Consumer Duty Oversight Committee" },
                  ]}
                />

                <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                  <h5 className="font-semibold">Evidence Governance Committee</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-sm mb-2">Committee Responsibilities:</h6>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Oversee evidence framework implementation</li>
                        <li>• Review evidence quality metrics</li>
                        <li>• Monitor repository usage and performance</li>
                        <li>• Review and approve documentation standards</li>
                        <li>• Escalate evidence gaps or quality issues</li>
                        <li>• Commission evidence audits</li>
                        <li>• Ensure regulatory examination readiness</li>
                        <li>• Coordinate evidence-related projects</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-sm mb-2">Typical Membership:</h6>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li><strong>Chair:</strong> Chief Risk Officer or CCO</li>
                        <li><strong>Members:</strong> Compliance, Risk, Legal, Operations, IT, Product, Records Management</li>
                        <li><strong>Attendees:</strong> Internal Audit (observer), SMFs as needed</li>
                      </ul>
                      <h6 className="font-medium text-sm mb-2 mt-4">Quarterly Agenda:</h6>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>1. Evidence quality metrics review</li>
                        <li>2. Gap analysis update</li>
                        <li>3. Repository performance</li>
                        <li>4. Regulatory examination preparedness</li>
                        <li>5. Issues and continuous improvement</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <ChecklistSection
                  stepNumber={16}
                  title="Step 16: Implement Evidence Quality Monitoring"
                  moduleId="cd-i7b"
                  items={[
                    { id: "16.1", label: "Define evidence quality metrics" },
                    { id: "16.2", label: "Set targets for each metric" },
                    { id: "16.3", label: "Implement spot-check sampling programme" },
                    { id: "16.4", label: "Review quality quarterly" },
                    { id: "16.5", label: "Address systemic issues identified" },
                    { id: "16.6", label: "Report to Evidence Governance Committee" },
                  ]}
                />

                <div className="space-y-4">
                  <h5 className="font-semibold">Quality Metrics</h5>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Completeness</TableCell>
                        <TableCell>&gt;95%</TableCell>
                        <TableCell>% of evidence items complete (no gaps/TBC)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Contemporaneousness</TableCell>
                        <TableCell>&gt;95%</TableCell>
                        <TableCell>% dated within 1 week of decision/action</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Clarity</TableCell>
                        <TableCell>&gt;90%</TableCell>
                        <TableCell>% passing readability check</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Version Control</TableCell>
                        <TableCell>100%</TableCell>
                        <TableCell>% with correct versioning</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Accessibility</TableCell>
                        <TableCell>&lt;2 min</TableCell>
                        <TableCell>Average retrieval time</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Audit Trail</TableCell>
                        <TableCell>100%</TableCell>
                        <TableCell>% of decisions with documented rationale</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <ChecklistSection
                  stepNumber={17}
                  title="Step 17: Establish Evidence Escalation Protocols"
                  moduleId="cd-i7b"
                  items={[
                    { id: "17.1", label: "Define what constitutes an evidence issue requiring escalation" },
                    { id: "17.2", label: "Create escalation pathways by severity" },
                    { id: "17.3", label: "Define roles and responsibilities in escalation" },
                    { id: "17.4", label: "Set response timeframes" },
                    { id: "17.5", label: "Establish resolution tracking" },
                    { id: "17.6", label: "Report escalations to governance" },
                  ]}
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h6 className="font-bold text-red-800 mb-2">CRITICAL - Immediate Escalation</h6>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Material evidence gap discovered</li>
                      <li>• Evidence integrity issue</li>
                      <li>• Imminent examination and not ready</li>
                      <li>• Evidence contradicts Board assertions</li>
                      <li>• Legal advice evidence insufficient</li>
                    </ul>
                    <p className="text-xs text-red-600 mt-2"><strong>Response:</strong> 4 hours acknowledgement, 24 hours action plan</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h6 className="font-bold text-amber-800 mb-2">HIGH - Within 1 Week</h6>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Multiple quality failures in spot-checks</li>
                      <li>• Retrieval consistently exceeding targets</li>
                      <li>• Repository system failure</li>
                      <li>• Staff non-compliance with standards</li>
                      <li>• Retention schedule breaches</li>
                    </ul>
                    <p className="text-xs text-amber-600 mt-2"><strong>Response:</strong> 1 day acknowledgement, 1 week action plan</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h6 className="font-bold text-blue-800 mb-2">MEDIUM - Next Committee</h6>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Minor documentation standard non-compliance</li>
                      <li>• Evidence organisation issues</li>
                      <li>• Version control inconsistencies</li>
                      <li>• Training needs identified</li>
                    </ul>
                    <p className="text-xs text-blue-600 mt-2"><strong>Response:</strong> 1 week acknowledgement, 1 month action plan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <TemplateCard
                title="Attestation Framework Document"
                description="Comprehensive framework covering Board, SMF, and process-level attestations with templates, schedules, and tracking requirements"
                format="Word"
                onPreview={() => handlePreview("Attestation Framework Document")}
              />
              <TemplateCard
                title="Board Reporting Evidence Pack Structure"
                description="Detailed template specification for the annual Consumer Duty assessment with all nine sections and appendices"
                format="Word"
                onPreview={() => handlePreview("Board Reporting Evidence Pack")}
              />
              <TemplateCard
                title="Evidence Challenge Protocol"
                description="Structured challenge process including question banks, documentation requirements, and escalation procedures"
                format="Word"
                onPreview={() => handlePreview("Evidence Challenge Protocol")}
              />
              <TemplateCard
                title="Regulatory Examination Readiness Checklist"
                description="Comprehensive checklist covering documentation, evidence quality, interview readiness, and system readiness"
                format="Excel"
                onPreview={() => handlePreview("Regulatory Examination Readiness Checklist")}
              />
              <TemplateCard
                title="Regulatory Interview Preparation Guide"
                description="Interview preparation for Board, SMFs, and staff with typical questions, suggested approaches, and difficult question handling"
                format="Word"
                onPreview={() => handlePreview("Regulatory Interview Preparation Guide")}
              />
              <TemplateCard
                title="Evidence Governance Committee ToR"
                description="Formal committee charter including purpose, authority, membership, responsibilities, meetings, and decision-making"
                format="Word"
                onPreview={() => handlePreview("Evidence Governance Committee ToR")}
              />
              <TemplateCard
                title="Evidence Quality Monitoring Framework"
                description="Ongoing monitoring approach with metrics definitions, spot-check sampling, quality review process, and escalation"
                format="Excel"
                onPreview={() => handlePreview("Evidence Quality Monitoring Framework")}
              />
              <TemplateCard
                title="Evidence Escalation Protocol"
                description="Clear escalation pathways by severity level with triggers, response timeframes, forms, and tracking"
                format="Word"
                onPreview={() => handlePreview("Evidence Escalation Protocol")}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Template Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="attestation-framework">
                    <AccordionTrigger>Attestation Framework Document Contents</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-sm mb-2">Section 1: Overview & Principles</h6>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Purpose of attestations under Consumer Duty</li>
                            <li>• Regulatory requirements (SM&CR, Consumer Duty)</li>
                            <li>• Hierarchy of attestations</li>
                            <li>• Attestation principles</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm mb-2">Section 2: Board Attestation</h6>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Frequency: Annual minimum</li>
                            <li>• Scope: Firm-wide compliance</li>
                            <li>• Format: Board resolution template</li>
                            <li>• Evidence required list</li>
                            <li>• Process and timing</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm mb-2">Section 3: SMF Attestations</h6>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Mapping by SoR</li>
                            <li>• Frequency requirements</li>
                            <li>• Attestation statement template</li>
                            <li>• Evidence by SMF role</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm mb-2">Section 4: Process-Level</h6>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Product approval attestation</li>
                            <li>• Fair Value Assessment attestation</li>
                            <li>• Communication approval attestation</li>
                            <li>• Policy update attestation</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="challenge-questions">
                    <AccordionTrigger>Evidence Challenge Question Bank</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-3">
                        <h6 className="font-semibold">For Fair Value Assessments:</h6>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• What data sources were used and how validated?</li>
                          <li>• Were all mandatory factors considered?</li>
                          <li>• Was differential outcomes analysis conducted?</li>
                          <li>• How does pricing compare to peers?</li>
                          <li>• Were vulnerable customers specifically considered?</li>
                          <li>• What would justify different conclusions?</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h6 className="font-semibold">For Board Papers:</h6>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• What data supports this assertion?</li>
                          <li>• What alternative explanations exist?</li>
                          <li>• How confident are we in this conclusion?</li>
                          <li>• What are the risks if we're wrong?</li>
                          <li>• What do customers say?</li>
                          <li>• How does this compare to peers?</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="interview-prep">
                    <AccordionTrigger>Regulatory Interview Preparation Highlights</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-3">
                        <h6 className="font-semibold">SMF Interview Preparation:</h6>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm font-medium mb-2">Q: "Show me evidence that supports your attestation"</p>
                          <p className="text-sm text-muted-foreground">A: Have ready: MI reviews, meeting minutes, training records, issue logs, escalation records</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h6 className="font-semibold">Handling Difficult Questions:</h6>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm font-medium mb-2">Q: "This evidence looks retrospective" (questioning contemporaneity)</p>
                          <p className="text-sm text-muted-foreground">A: Explain evidence creation process, show metadata if available, acknowledge if retrospective and explain why</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm font-medium mb-2">Q: "Your report says X but evidence shows Y" (inconsistency)</p>
                          <p className="text-sm text-muted-foreground">A: Acknowledge discrepancy, explain reason, commit to correction</p>
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
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                    Attestation Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Attestation framework approved and operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">All required attestations completed and current</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">100% of attestations supported by documented evidence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Board annual attestation completed on time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">All SMFs have current attestation statements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Process-level attestations embedded in workflows</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PresentationIcon className="h-5 w-5 text-primary" />
                    Board Reporting Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Board evidence pack structure defined and approved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Annual Consumer Duty assessment submitted on time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Board approved assessment after substantive discussion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Evidence pack complete (no gaps or "TBC")</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Evidence supports all assertions in report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Board challenge documented in minutes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5 text-primary" />
                    Regulatory Readiness Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Regulatory examination readiness checklist &gt;90% complete</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Mock document request completed within 48 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Mock interviews conducted with positive outcomes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">No critical evidence gaps identified</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Consistency check passed (reports match evidence)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">External review (if conducted) positive</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Evidence Governance Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Evidence Governance Committee established and operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Committee meets quarterly with &gt;80% attendance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Evidence quality metrics tracked and reported</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Spot-check programme operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Evidence quality scores &gt;4/5 average</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">Escalation protocol operational with no overdue items</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Timeline & Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h5 className="font-semibold">Part 2 Timeline</h5>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Badge className="mb-2">Weeks 1-2</Badge>
                      <p className="text-sm font-medium">Attestation Framework</p>
                      <p className="text-xs text-muted-foreground">Board pack structure</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Badge className="mb-2">Weeks 2-4</Badge>
                      <p className="text-sm font-medium">Regulatory Readiness</p>
                      <p className="text-xs text-muted-foreground">Assessment & preparation</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Badge className="mb-2">Weeks 3-4</Badge>
                      <p className="text-sm font-medium">Evidence Governance</p>
                      <p className="text-xs text-muted-foreground">Committee establishment</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Badge variant="outline" className="mb-2">Ongoing</Badge>
                      <p className="text-sm font-medium">Quality Monitoring</p>
                      <p className="text-xs text-muted-foreground">Continuous improvement</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold">Metrics to Track</h5>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Target</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Attestations completed vs required</TableCell>
                        <TableCell>100%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Board pack completion (days before meeting)</TableCell>
                        <TableCell>≥5 days</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Regulatory readiness score</TableCell>
                        <TableCell>&gt;90%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Evidence quality average score</TableCell>
                        <TableCell>&gt;4/5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mock examination pass rate</TableCell>
                        <TableCell>&gt;80%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Critical escalations unresolved</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <PitfallCard
                title="Attestation Without Evidence Review"
                description="SMF signs attestation without reviewing underlying evidence - cannot demonstrate 'reasonable steps'; personally accountable if breach occurs"
                prevention="Mandatory evidence review before attestation. Document what you reviewed and when. Never sign without personally reviewing key evidence."
                icon={<AlertTriangle className="h-5 w-5" />}
              />
              <PitfallCard
                title="Board Papers Lack Substantive Content"
                description="Board papers are high-level summaries without data or detail - Board cannot make informed decisions or properly challenge"
                prevention="Evidence pack with comprehensive data, MI, and analysis. Board members must read in advance. Include specific metrics and trends."
                icon={<AlertTriangle className="h-5 w-5" />}
              />
              <PitfallCard
                title="No Evidence of Board Challenge"
                description="Board minutes show approval but no discussion or questioning - suggests Board is rubber-stamping, not providing oversight"
                prevention="Substantive discussion minuted. Questions and answers recorded. Decisions with rationale. Require pre-read and challenge."
                icon={<AlertTriangle className="h-5 w-5" />}
              />
              <PitfallCard
                title="Evidence Pack Assembled Last Minute"
                description="Evidence pack created shortly before Board meeting, not maintained continuously - suggests reactive compliance, not ongoing oversight"
                prevention="Continuous evidence collection and organisation. Board pack assembly is compilation, not creation. Regular updates throughout year."
                icon={<AlertTriangle className="h-5 w-5" />}
              />
              <PitfallCard
                title="Inconsistency Between Report and Evidence"
                description="Board report asserts good outcomes but underlying evidence shows issues - credibility failure; may be misleading Board"
                prevention="Evidence review and challenge process before Board. Cross-reference checking mandatory. Ensure narrative matches data."
                icon={<AlertTriangle className="h-5 w-5" />}
              />
              <PitfallCard
                title="Unprepared for Regulatory Examination"
                description="Firm cannot produce requested documents; staff unsure how to respond - suggests poor governance and record-keeping"
                prevention="Annual regulatory readiness assessment. Mock examinations. Document retrieval tested. Interview preparation for all key individuals."
                icon={<AlertTriangle className="h-5 w-5" />}
              />
              <PitfallCard
                title="SMF Cannot Demonstrate Oversight"
                description="SMF cannot show evidence of regular MI review or active oversight - cannot demonstrate reasonable steps; personal accountability risk"
                prevention="Formal MI review meetings with minutes. Sign-off of key evidence. Document review activities. Personal oversight folder maintained."
                icon={<AlertTriangle className="h-5 w-5" />}
              />
              <PitfallCard
                title="No Evidence Governance"
                description="No oversight of evidence quality; gaps and issues undetected - evidence deteriorates over time; not fit for purpose when needed"
                prevention="Evidence Governance Committee. Quality monitoring. Spot-checks. Issue escalation. Regular reporting on evidence health."
                icon={<AlertTriangle className="h-5 w-5" />}
              />
            </div>

            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Warning: Personal Accountability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Under SM&CR, senior managers can be held <strong>personally accountable</strong> for failures in their areas of responsibility. 
                    If a breach occurs and the SMF cannot demonstrate they took "reasonable steps" to prevent it, they face:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Public censure</li>
                    <li>• Financial penalties (unlimited for individuals)</li>
                    <li>• Prohibition from working in financial services</li>
                    <li>• Potential criminal prosecution in serious cases</li>
                  </ul>
                  <div className="bg-destructive/10 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium text-destructive">
                      The difference between personal liability and protection is often the quality of contemporaneous evidence 
                      demonstrating that the SMF actively oversaw their area and took reasonable steps to ensure compliance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t print:hidden">
          <Button variant="outline" onClick={() => navigate("/cross-cutting/data-evidence-part1")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Part 1: Foundation & Structure
          </Button>
          <Button onClick={() => navigate("/monitoring/mi-monitoring")}>
            Next: MI & Monitoring Framework
            <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
          </Button>
        </div>
      </main>
    </div>
  );
}
