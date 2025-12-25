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
import { ModuleStatusBadge } from "@/components/ModuleStatusBadge";
import { ModuleActionButtons } from "@/components/ModuleActionButtons";
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
  FolderTree,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Lock,
  Archive,
  RefreshCw,
  Eye,
  Scale,
  Target,
  Users,
  Landmark,
  Search
} from "lucide-react";

const MODULE_ID = 'CD-I7';

export default function CDI7ADataEvidenceManagementPart1() {
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
              <ModuleStatusBadge moduleId={MODULE_ID} className="border-accent" />
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
              <Database className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <Badge variant="outline" className="border-accent text-primary-foreground">
                  CD-I7A
                </Badge>
                <Badge variant="outline" className="border-accent text-primary-foreground">
                  Implementation Module
                </Badge>
                <Badge variant="outline" className="border-accent text-primary-foreground">
                  Part 1 of 2
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Data & Evidence Management Framework
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-4">
                Part 1: Foundation & Structure - Evidence Requirements, Documentation Standards, and Repository Design
              </p>
              <ModuleActionButtons moduleId={MODULE_ID} />
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
                    "Establish robust evidence collection and documentation systems to demonstrate Consumer Duty compliance through comprehensive, contemporaneous, and auditable records."
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Part 1 Focus Areas
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Evidence requirements matrix by outcome</li>
                      <li>• Documentation standards and protocols</li>
                      <li>• Repository structure and taxonomy</li>
                      <li>• Record retention schedules</li>
                      <li>• Access controls framework</li>
                      <li>• Audit trail requirements</li>
                      <li>• Version control protocols</li>
                      <li>• Evidence quality standards</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Timeline
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Part 1: 4-6 weeks (framework and repository)</li>
                      <li>• Part 2: 2-4 weeks (attestation and governance)</li>
                      <li>• Total duration: 6-10 weeks</li>
                      <li>• Ongoing maintenance required</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warning/50 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Principle: Contemporaneous Evidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium mb-4">
                  Evidence must be CONTEMPORANEOUS - created at the time of decision/action, not retrospectively.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                    <h5 className="font-semibold text-destructive mb-2">NOT Acceptable</h5>
                    <ul className="text-sm space-y-1">
                      <li>✗ Documents created before FCA examination</li>
                      <li>✗ Back-dated meeting minutes</li>
                      <li>✗ Post-rationalisation of decisions</li>
                      <li>✗ Reconstructed decision rationale</li>
                    </ul>
                  </div>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                    <h5 className="font-semibold text-primary mb-2">Acceptable</h5>
                    <ul className="text-sm space-y-1">
                      <li>✓ Real-time meeting minutes</li>
                      <li>✓ Dated approval documents</li>
                      <li>✓ System-timestamped records</li>
                      <li>✓ Version-controlled documents</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <RegulatoryQuote
              source="FCA"
              reference="FG22/5"
              quote="Firms must maintain comprehensive records to demonstrate compliance with Consumer Duty obligations. Evidence should be contemporaneous, complete, and readily accessible."
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Key Deliverables - Part 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">1</Badge>
                      <div>
                        <p className="font-medium">Evidence Requirements Matrix</p>
                        <p className="text-sm text-muted-foreground">By outcome with ownership and standards</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">2</Badge>
                      <div>
                        <p className="font-medium">Documentation Standards Guide</p>
                        <p className="text-sm text-muted-foreground">Templates, naming conventions, quality criteria</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">3</Badge>
                      <div>
                        <p className="font-medium">Repository Structure & Taxonomy</p>
                        <p className="text-sm text-muted-foreground">Logical organization and tagging system</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">4</Badge>
                      <div>
                        <p className="font-medium">Record Retention Schedule</p>
                        <p className="text-sm text-muted-foreground">Legal requirements and disposal protocols</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">5</Badge>
                      <div>
                        <p className="font-medium">Access Controls Framework</p>
                        <p className="text-sm text-muted-foreground">Role-based permissions and audit trails</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">6</Badge>
                      <div>
                        <p className="font-medium">Audit Trail Requirements</p>
                        <p className="text-sm text-muted-foreground">Change tracking and approval workflows</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">7</Badge>
                      <div>
                        <p className="font-medium">Version Control Protocols</p>
                        <p className="text-sm text-muted-foreground">Document lifecycle management</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">8</Badge>
                      <div>
                        <p className="font-medium">Evidence Quality Standards</p>
                        <p className="text-sm text-muted-foreground">Completeness, accuracy, accessibility criteria</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">9</Badge>
                      <div>
                        <p className="font-medium">Data Collection Procedures</p>
                        <p className="text-sm text-muted-foreground">Automated and manual collection processes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">10</Badge>
                      <div>
                        <p className="font-medium">Document Management System Design</p>
                        <p className="text-sm text-muted-foreground">Technology requirements and integration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Evidence Lifecycle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between flex-wrap gap-4 py-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-2">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium">Create</span>
                    <span className="text-xs text-muted-foreground">At time of action</span>
                  </div>
                  <div className="text-2xl text-muted-foreground">→</div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-2">
                      <Archive className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium">Store</span>
                    <span className="text-xs text-muted-foreground">Secure repository</span>
                  </div>
                  <div className="text-2xl text-muted-foreground">→</div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-2">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium">Retrieve</span>
                    <span className="text-xs text-muted-foreground">24-48 hours</span>
                  </div>
                  <div className="text-2xl text-muted-foreground">→</div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-2">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium">Review</span>
                    <span className="text-xs text-muted-foreground">Quality assurance</span>
                  </div>
                  <div className="text-2xl text-muted-foreground">→</div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-2">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium">Retain/Dispose</span>
                    <span className="text-xs text-muted-foreground">Per schedule</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Key Stakeholders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Accountable</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Chief Compliance Officer</li>
                      <li>• Consumer Duty Champion (SMF)</li>
                      <li>• Chief Risk Officer</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Responsible</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Records Management Team</li>
                      <li>• IT/Technology Team</li>
                      <li>• Business Unit Document Owners</li>
                      <li>• Compliance Analysts</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Consulted</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Legal Team</li>
                      <li>• Data Protection Officer</li>
                      <li>• Internal Audit</li>
                      <li>• All Business Units</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  FG22/5: 'Reasonable Grounds' Evidence Requirements
                </CardTitle>
                <CardDescription>
                  The FCA's Finalised Guidance sets clear expectations for evidence that firms must maintain to demonstrate Consumer Duty compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA FG22/5"
                  reference="Paragraph 5.3"
                  quote="Firms must be able to demonstrate that they have reasonable grounds to believe that they are complying with the Consumer Duty. This requires robust evidence gathering and documentation."
                  link="https://www.fca.org.uk/publications/finalised-guidance/fg22-5-final-non-handbook-guidance-new-consumer-duty"
                />

                <RegulatoryQuote
                  source="FCA FG22/5"
                  reference="Paragraph 11.1"
                  quote="Firms should ensure they have appropriate systems and controls in place to collect data and monitor whether they are delivering good outcomes for retail customers in line with the Consumer Duty."
                  link="https://www.fca.org.uk/publications/finalised-guidance/fg22-5-final-non-handbook-guidance-new-consumer-duty"
                />

                <RegulatoryQuote
                  source="FCA FG22/5"
                  reference="Paragraph 11.2"
                  quote="Firms should use data and management information to support effective oversight and identify whether retail customers are getting good outcomes. This should include understanding and evidencing the outcomes different groups of customers receive."
                  link="https://www.fca.org.uk/publications/finalised-guidance/fg22-5-final-non-handbook-guidance-new-consumer-duty"
                />

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileSearch className="h-5 w-5 text-primary" />
                      What 'Reasonable Grounds' Means in Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h5 className="font-semibold text-sm">Evidence Must Show:</h5>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Active monitoring of customer outcomes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Consideration of Consumer Duty in decision-making</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Proactive identification and remediation of harm</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Testing effectiveness of controls</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h5 className="font-semibold text-sm">FCA Will Look For:</h5>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-primary mt-0.5" />
                            <span>Documented rationale for key decisions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-primary mt-0.5" />
                            <span>Regular MI review with actions taken</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-primary mt-0.5" />
                            <span>Challenge and escalation records</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-primary mt-0.5" />
                            <span>Evidence of Board and SMF engagement</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">CONTEMPORANEOUS</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Evidence created at time of decision/action, not retrospectively
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileSearch className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">COMPREHENSIVE</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Covers all material decisions and outcomes
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">ACCESSIBLE</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Retrievable within reasonable timeframe (typically 24-48 hours)
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">AUDITABLE</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Clear trail from decision to action to outcome
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">PROPORTIONATE</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Level of evidence appropriate to risk and materiality
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Archive className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">RETAINED</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Stored for appropriate period (typically 6+ years)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Data Collection Strategy Across Four Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Outcome</TableHead>
                        <TableHead className="min-w-[200px]">Key Data Sources</TableHead>
                        <TableHead className="min-w-[150px]">Collection Frequency</TableHead>
                        <TableHead className="min-w-[200px]">Evidence Types</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Products & Services</TableCell>
                        <TableCell className="text-sm">
                          Target market definitions, product approvals, sales data, customer complaints, product reviews
                        </TableCell>
                        <TableCell className="text-sm">Quarterly + event-driven</TableCell>
                        <TableCell className="text-sm">Approval papers, review minutes, testing results, MI dashboards</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Price & Value</TableCell>
                        <TableCell className="text-sm">
                          FVA assessments, pricing data, claims/utilisation, benefit realisation, comparator analysis
                        </TableCell>
                        <TableCell className="text-sm">Annual FVA + quarterly monitoring</TableCell>
                        <TableCell className="text-sm">FVA documentation, pricing decisions, remediation records</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Consumer Understanding</TableCell>
                        <TableCell className="text-sm">
                          Comprehension testing, readability scores, customer feedback, behavioural data, call recordings
                        </TableCell>
                        <TableCell className="text-sm">Per communication + quarterly review</TableCell>
                        <TableCell className="text-sm">Testing reports, approval records, feedback analysis</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Consumer Support</TableCell>
                        <TableCell className="text-sm">
                          Service metrics (wait times, resolution), sludge audits, complaints data, channel performance
                        </TableCell>
                        <TableCell className="text-sm">Monthly MI + quarterly deep-dive</TableCell>
                        <TableCell className="text-sm">Service reports, audit findings, improvement actions</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <RegulatoryQuote
              source="FCA FG22/5"
              reference="Paragraph 11.4"
              quote="The board (or equivalent governing body) of a firm should review and approve an assessment at least annually of whether the firm is delivering good outcomes for retail customers which are consistent with the Consumer Duty."
              link="https://www.fca.org.uk/publications/finalised-guidance/fg22-5-final-non-handbook-guidance-new-consumer-duty"
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  What Requires Evidencing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="governance">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-primary" />
                        Governance & Strategy
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Board discussions and decisions on Consumer Duty</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>SMF accountability statements and responsibilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Annual Consumer Duty assessments and Board attestation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Governance committee meeting minutes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Escalation decisions and rationale</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Resource allocation decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Strategy alignment assessments</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="products">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Products & Services Outcome
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Target market definitions with rationale</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Product approval decisions and committee papers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Product testing results and methodology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Product review meetings and findings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Distribution strategy decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Product modifications or withdrawals with reasons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Negative target market definitions</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="value">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4 text-primary" />
                        Price & Value Outcome
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Fair Value Assessment methodology and framework</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>FVA calculations and data sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Benchmarking analysis and peer comparisons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Pricing decisions and rationale</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Value monitoring results over time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Remediation actions for poor value products</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Differential outcomes analysis by customer segment</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="understanding">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Consumer Understanding Outcome
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Communication testing methodologies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Testing results (comprehension, behavioural, usability)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Communication approval decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Readability scores and assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Consumer feedback on communications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Adaptations made based on testing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Accessible format provision records</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="support">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Consumer Support Outcome
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Service standard definitions and SLAs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Channel performance monitoring data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Sludge audits and findings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Process improvement decisions and actions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Complaints root cause analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Support adjustments for vulnerable customers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Third-party support arrangements</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vulnerable">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        Vulnerable Customers
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Vulnerability identification approach and criteria</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Recording procedures and consent documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Support adjustments provided (case records)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Outcome parity analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Training completion records</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Periodic review outcomes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Safeguarding escalations</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="distribution">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FolderTree className="h-4 w-4 text-primary" />
                        Distribution Chain
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Manufacturer information packs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Distributor agreements with Consumer Duty clauses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Information sharing protocols</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Chain-wide MI and outcomes data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Third-party due diligence records</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>Outsourcing arrangements and oversight</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Types of Evidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 bg-primary/5">
                    <h4 className="font-semibold text-primary mb-3">PRIMARY EVIDENCE</h4>
                    <p className="text-xs text-muted-foreground mb-3">Direct proof of action/decision</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Meeting minutes with decisions</li>
                      <li>• Signed approval documents</li>
                      <li>• Completed assessments</li>
                      <li>• Testing results with data</li>
                      <li>• System records of actions</li>
                      <li>• Dated correspondence</li>
                      <li>• Audit reports</li>
                      <li>• Training certificates</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4 bg-secondary/30">
                    <h4 className="font-semibold text-primary mb-3">SECONDARY EVIDENCE</h4>
                    <p className="text-xs text-muted-foreground mb-3">Supporting documentation</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Policies and procedures</li>
                      <li>• Guidance documents</li>
                      <li>• External benchmarking</li>
                      <li>• Regulatory guidance cited</li>
                      <li>• Industry standards</li>
                      <li>• Expert opinions</li>
                      <li>• Project plans</li>
                      <li>• Risk assessments</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4 bg-accent/10">
                    <h4 className="font-semibold text-primary mb-3">OUTCOME EVIDENCE</h4>
                    <p className="text-xs text-muted-foreground mb-3">Demonstrating results</p>
                    <ul className="space-y-2 text-sm">
                      <li>• MI dashboards</li>
                      <li>• Customer satisfaction scores</li>
                      <li>• Complaint analysis trends</li>
                      <li>• FOS decisions</li>
                      <li>• Testing improvements</li>
                      <li>• Before/after comparisons</li>
                      <li>• Trend analysis</li>
                      <li>• Outcome monitoring reports</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-primary" />
                  Record Retention Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Legal Requirement</TableHead>
                      <TableHead>Recommended Period</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Consumer Duty Records</TableCell>
                      <TableCell>Min 6 years from end of relationship</TableCell>
                      <TableCell>6 years + 1 year buffer</TableCell>
                      <TableCell>FCA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Complaints</TableCell>
                      <TableCell>6 years from date of complaint</TableCell>
                      <TableCell>6 years</TableCell>
                      <TableCell>DISP</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fair Value Assessments</TableCell>
                      <TableCell>Product lifecycle + 6 years</TableCell>
                      <TableCell>Lifecycle + 6 years</TableCell>
                      <TableCell>FG22/5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Board Papers</TableCell>
                      <TableCell>Duration of firm + 6 years</TableCell>
                      <TableCell>Permanently</TableCell>
                      <TableCell>Best Practice</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Training Records</TableCell>
                      <TableCell>Duration of employment + 6 years</TableCell>
                      <TableCell>Employment + 6 years</TableCell>
                      <TableCell>TC/FCA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Product Approvals</TableCell>
                      <TableCell>Product lifecycle + 6 years</TableCell>
                      <TableCell>Lifecycle + 6 years</TableCell>
                      <TableCell>PROD</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AML Records</TableCell>
                      <TableCell>5 years from transaction</TableCell>
                      <TableCell>5 years</TableCell>
                      <TableCell>MLR 2017</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Evidence Quality Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-2">COMPLETE</h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> All relevant information captured
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Context provided
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Assumptions documented
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Data sources identified
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ Gaps or missing information
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ "To be confirmed" left incomplete
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-2">CONTEMPORANEOUS</h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Created at time of decision/action
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Dated accurately
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Reflects information available at time
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ Retrospectively created
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ Back-dated documents
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ Post-rationalisation
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-2">CLEAR & UNDERSTANDABLE</h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Jargon explained
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Acronyms defined
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Logical structure
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Cross-references provided
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ Unclear rationale
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ Unexplained abbreviations
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-2">AUDITABLE</h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Version control maintained
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Change history tracked
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Approval trail visible
                        </p>
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Links to related documents
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ No version tracking
                        </p>
                        <p className="flex items-center gap-2 text-destructive">
                          ✗ Unclear who approved
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warning/50 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  FCA Regulatory Examination - Red Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RegulatoryQuote
                  source="FCA"
                  reference="Supervisory Approach"
                  quote="We expect to see evidence of the rationale for key decisions, including the data and analysis that supported them."
                />
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">What FCA Examines:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Board papers and minutes</li>
                      <li>• Product approval papers</li>
                      <li>• Fair Value Assessments with workings</li>
                      <li>• Testing methodologies and results</li>
                      <li>• Root cause analysis of issues</li>
                      <li>• Remediation action plans</li>
                      <li>• MI and outcome monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-warning">Red Flags:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="text-destructive">⚠️ Documents created shortly before examination</li>
                      <li className="text-destructive">⚠️ Lack of Board-level documentation</li>
                      <li className="text-destructive">⚠️ No evidence of testing or challenge</li>
                      <li className="text-destructive">⚠️ Generic, template-driven evidence</li>
                      <li className="text-destructive">⚠️ Gaps in critical areas (FVAs, vulnerable)</li>
                      <li className="text-destructive">⚠️ Inconsistencies between documents</li>
                      <li className="text-destructive">⚠️ Decisions without documented rationale</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Data Protection & Evidence Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Lawful Basis for Evidence Collection</h4>
                    <ul className="text-sm space-y-2">
                      <li><strong>Performance of contract:</strong> Customer data in normal course</li>
                      <li><strong>Legal obligation:</strong> Regulatory requirements</li>
                      <li><strong>Legitimate interests:</strong> Demonstrating compliance</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Key Principles</h4>
                    <ul className="text-sm space-y-2">
                      <li><strong>Data minimisation:</strong> Only collect what's needed</li>
                      <li><strong>Purpose limitation:</strong> Use only for intended purpose</li>
                      <li><strong>Storage limitation:</strong> Retain only for required period</li>
                      <li><strong>Security:</strong> Appropriate safeguards</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                  <h4 className="font-semibold text-warning mb-2">Vulnerable Customer Data</h4>
                  <ul className="text-sm space-y-1">
                    <li>• May be "special category" if health-related</li>
                    <li>• Requires extra safeguards and explicit consent where appropriate</li>
                    <li>• Restrict access to those who need it</li>
                    <li>• Enhanced security measures required</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Steps - Part 1: Foundation & Structure</CardTitle>
                <CardDescription>
                  4-6 weeks to establish evidence framework and repository structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full" defaultValue={["phase1"]}>
                  <AccordionItem value="phase1">
                    <AccordionTrigger className="text-lg font-semibold">
                      Phase 1: Evidence Requirements Definition (Weeks 1-2)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <ChecklistSection
                        stepNumber={1}
                        title="Step 1: Create Evidence Requirements Matrix"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-1-1", label: "Map all Consumer Duty obligations requiring evidence" },
                          { id: "i7a-1-2", label: "Define specific evidence items for each obligation" },
                          { id: "i7a-1-3", label: "Identify evidence type (primary, secondary, outcome)" },
                          { id: "i7a-1-4", label: "Specify evidence format and content requirements" },
                          { id: "i7a-1-5", label: "Determine evidence ownership by role/function" },
                          { id: "i7a-1-6", label: "Set quality standards for each evidence type" },
                          { id: "i7a-1-7", label: "Define retention period for each evidence category" },
                          { id: "i7a-1-8", label: "Document current state (have/don't have/partial)" },
                        ]}
                      />

                      <div className="bg-muted/30 rounded-lg p-4">
                        <h5 className="font-semibold mb-3">Evidence Matrix Structure Example:</h5>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Outcome/Area</TableHead>
                              <TableHead>Obligation</TableHead>
                              <TableHead>Evidence Required</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Owner</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Products & Services</TableCell>
                              <TableCell>Target market defined</TableCell>
                              <TableCell>Target market document with rationale</TableCell>
                              <TableCell>Primary</TableCell>
                              <TableCell>Product Manager</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Price & Value</TableCell>
                              <TableCell>FVA conducted</TableCell>
                              <TableCell>Completed FVA with calculations</TableCell>
                              <TableCell>Primary</TableCell>
                              <TableCell>Pricing Team</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <ChecklistSection
                        stepNumber={2}
                        title="Step 2: Gap Analysis - Evidence Currently Available"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-2-1", label: "Review what evidence currently exists for each requirement" },
                          { id: "i7a-2-2", label: "Identify gaps (required but don't have)" },
                          { id: "i7a-2-3", label: "Assess quality of existing evidence against standards" },
                          { id: "i7a-2-4", label: "Determine remediation needs for quality issues" },
                          { id: "i7a-2-5", label: "Prioritise evidence creation by risk level" },
                          { id: "i7a-2-6", label: "Assign owners and deadlines for gap remediation" },
                          { id: "i7a-2-7", label: "Estimate cost/effort for each gap" },
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={3}
                        title="Step 3: Define Documentation Standards"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-3-1", label: "Document structure requirements (headers, sections, approvals)" },
                          { id: "i7a-3-2", label: "Define naming conventions for all document types" },
                          { id: "i7a-3-3", label: "Establish version control protocols" },
                          { id: "i7a-3-4", label: "Design approval workflow standards" },
                          { id: "i7a-3-5", label: "Set cross-referencing requirements" },
                          { id: "i7a-3-6", label: "Define metadata requirements (tags, categories)" },
                          { id: "i7a-3-7", label: "Establish quality review checkpoints" },
                          { id: "i7a-3-8", label: "Create documentation standards guide" },
                        ]}
                      />

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <h5 className="font-semibold mb-3">Document Header Standards:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <ul className="space-y-1">
                            <li>• Document title and reference number</li>
                            <li>• Version number and date</li>
                            <li>• Author and owner</li>
                            <li>• Approval authority and date</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Review date</li>
                            <li>• Classification (confidential, internal)</li>
                            <li>• Related documents</li>
                            <li>• Distribution list</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="phase2">
                    <AccordionTrigger className="text-lg font-semibold">
                      Phase 2: Repository Structure & Taxonomy (Weeks 2-4)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <ChecklistSection
                        stepNumber={4}
                        title="Step 4: Design Repository Structure"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-4-1", label: "Define top-level categories (by outcome, function, or hybrid)" },
                          { id: "i7a-4-2", label: "Create sub-categories and folder structure" },
                          { id: "i7a-4-3", label: "Develop taxonomy and tagging system" },
                          { id: "i7a-4-4", label: "Define access paths (multiple ways to find documents)" },
                          { id: "i7a-4-5", label: "Plan for growth and scalability" },
                          { id: "i7a-4-6", label: "Integrate with existing document management system" },
                          { id: "i7a-4-7", label: "Define archive and disposal paths" },
                        ]}
                      />

                      <div className="bg-muted/30 rounded-lg p-4">
                        <h5 className="font-semibold mb-3">Recommended Repository Structure:</h5>
                        <div className="font-mono text-sm space-y-1 text-muted-foreground">
                          <p>/Consumer-Duty-Evidence</p>
                          <p className="ml-4">/01-Governance</p>
                          <p className="ml-8">/Board-Papers</p>
                          <p className="ml-8">/Committee-Minutes</p>
                          <p className="ml-8">/SMF-Accountability</p>
                          <p className="ml-4">/02-Products-Services</p>
                          <p className="ml-8">/Target-Markets</p>
                          <p className="ml-8">/Product-Approvals</p>
                          <p className="ml-8">/Product-Reviews</p>
                          <p className="ml-4">/03-Price-Value</p>
                          <p className="ml-8">/FVA-Methodology</p>
                          <p className="ml-8">/FVA-Assessments</p>
                          <p className="ml-8">/Value-Monitoring</p>
                          <p className="ml-4">/04-Consumer-Understanding</p>
                          <p className="ml-8">/Testing-Results</p>
                          <p className="ml-8">/Communication-Approvals</p>
                          <p className="ml-4">/05-Consumer-Support</p>
                          <p className="ml-8">/Service-Standards</p>
                          <p className="ml-8">/Sludge-Audits</p>
                          <p className="ml-4">/06-Vulnerable-Customers</p>
                          <p className="ml-4">/07-Distribution-Chain</p>
                          <p className="ml-4">/08-MI-Reporting</p>
                        </div>
                      </div>

                      <ChecklistSection
                        stepNumber={5}
                        title="Step 5: Develop Taxonomy and Tagging System"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-5-1", label: "Define mandatory metadata fields for all documents" },
                          { id: "i7a-5-2", label: "Create controlled vocabulary for tags" },
                          { id: "i7a-5-3", label: "Establish tagging by outcome (Products, Value, Understanding, Support)" },
                          { id: "i7a-5-4", label: "Define product/service tags" },
                          { id: "i7a-5-5", label: "Create date-based taxonomy (year, quarter)" },
                          { id: "i7a-5-6", label: "Define document type tags (policy, assessment, report, minutes)" },
                          { id: "i7a-5-7", label: "Document taxonomy in user guide" },
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={6}
                        title="Step 6: Establish Access Controls"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-6-1", label: "Define role-based access permissions" },
                          { id: "i7a-6-2", label: "Identify sensitive document categories requiring restricted access" },
                          { id: "i7a-6-3", label: "Configure read/write/delete permissions by role" },
                          { id: "i7a-6-4", label: "Establish approval workflows for sensitive changes" },
                          { id: "i7a-6-5", label: "Set up audit trail logging for all access and changes" },
                          { id: "i7a-6-6", label: "Document access control policy" },
                          { id: "i7a-6-7", label: "Test access controls with sample users" },
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="phase3">
                    <AccordionTrigger className="text-lg font-semibold">
                      Phase 3: Record-Keeping Protocols (Weeks 4-6)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <ChecklistSection
                        stepNumber={7}
                        title="Step 7: Create Record Retention Schedule"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-7-1", label: "Map all document types to retention requirements" },
                          { id: "i7a-7-2", label: "Identify legal and regulatory retention periods" },
                          { id: "i7a-7-3", label: "Define trigger events for retention start (e.g., end of relationship)" },
                          { id: "i7a-7-4", label: "Establish disposal procedures and approvals" },
                          { id: "i7a-7-5", label: "Define exceptions handling (ongoing claims, legal holds)" },
                          { id: "i7a-7-6", label: "Create retention schedule document" },
                          { id: "i7a-7-7", label: "Configure automated retention reminders" },
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={8}
                        title="Step 8: Implement Version Control"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-8-1", label: "Define version numbering convention (major.minor)" },
                          { id: "i7a-8-2", label: "Establish draft vs approved status markers" },
                          { id: "i7a-8-3", label: "Configure automatic version history tracking" },
                          { id: "i7a-8-4", label: "Define what constitutes a new version vs minor edit" },
                          { id: "i7a-8-5", label: "Establish superseded document handling" },
                          { id: "i7a-8-6", label: "Create version control protocol document" },
                          { id: "i7a-8-7", label: "Train users on version control procedures" },
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={9}
                        title="Step 9: Establish Audit Trail Requirements"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-9-1", label: "Define what actions require audit logging" },
                          { id: "i7a-9-2", label: "Configure system to capture user, date, time, action" },
                          { id: "i7a-9-3", label: "Establish audit log retention period (typically 6+ years)" },
                          { id: "i7a-9-4", label: "Define audit log review frequency and responsibility" },
                          { id: "i7a-9-5", label: "Create audit log access restrictions" },
                          { id: "i7a-9-6", label: "Test audit trail functionality" },
                          { id: "i7a-9-7", label: "Document audit trail procedures" },
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={10}
                        title="Step 10: Define Data Collection Procedures"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-10-1", label: "Identify automated data collection sources (systems, MI)" },
                          { id: "i7a-10-2", label: "Define manual data collection responsibilities" },
                          { id: "i7a-10-3", label: "Establish data validation and quality checks" },
                          { id: "i7a-10-4", label: "Create data collection schedules (daily, weekly, monthly)" },
                          { id: "i7a-10-5", label: "Define data storage formats and locations" },
                          { id: "i7a-10-6", label: "Establish error handling procedures" },
                          { id: "i7a-10-7", label: "Document data collection procedures" },
                        ]}
                      />

                      <ChecklistSection
                        stepNumber={11}
                        title="Step 11: Document Management System Configuration"
                        moduleId="cd-i7a"
                        items={[
                          { id: "i7a-11-1", label: "Configure repository structure in DMS" },
                          { id: "i7a-11-2", label: "Set up metadata fields and mandatory requirements" },
                          { id: "i7a-11-3", label: "Configure search functionality and indexes" },
                          { id: "i7a-11-4", label: "Implement access controls per design" },
                          { id: "i7a-11-5", label: "Enable version control and audit trail" },
                          { id: "i7a-11-6", label: "Test document upload, search, and retrieval" },
                          { id: "i7a-11-7", label: "Create user training materials" },
                          { id: "i7a-11-8", label: "Conduct user acceptance testing" },
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <TemplateCard
                title="Evidence Requirements Matrix"
                description="Comprehensive matrix mapping all Consumer Duty obligations to required evidence, types, owners, and quality standards"
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("Evidence Requirements Matrix")}
              />
              <TemplateCard
                title="Evidence Gap Analysis Template"
                description="Template to assess current evidence availability against requirements and prioritise remediation"
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("Evidence Gap Analysis Template")}
              />
              <TemplateCard
                title="Documentation Standards Guide"
                description="Comprehensive guide covering document structure, naming conventions, version control, and quality criteria"
                format="Word"
                onDownload={() => {}}
                onPreview={() => handlePreview("Documentation Standards Guide")}
              />
              <TemplateCard
                title="Repository Structure Design"
                description="Template for designing logical folder structure and taxonomy for Consumer Duty evidence"
                format="Word"
                onDownload={() => {}}
                onPreview={() => handlePreview("Repository Structure Design")}
              />
              <TemplateCard
                title="Record Retention Schedule"
                description="Complete retention schedule mapping document types to legal requirements and disposal procedures"
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("Record Retention Schedule")}
              />
              <TemplateCard
                title="Access Controls Matrix"
                description="Template defining role-based permissions for evidence repository access"
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("Access Controls Matrix")}
              />
              <TemplateCard
                title="Version Control Protocol"
                description="Standard operating procedure for document version control and change management"
                format="Word"
                onDownload={() => {}}
                onPreview={() => handlePreview("Version Control Protocol")}
              />
              <TemplateCard
                title="Audit Trail Requirements"
                description="Specification document for audit trail logging and review procedures"
                format="Word"
                onDownload={() => {}}
                onPreview={() => handlePreview("Audit Trail Requirements")}
              />
              <TemplateCard
                title="Evidence Quality Checklist"
                description="Checklist for reviewing evidence quality against completeness, contemporaneity, and accessibility standards"
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("Evidence Quality Checklist")}
              />
              <TemplateCard
                title="Data Collection Procedures"
                description="Template for documenting automated and manual data collection processes"
                format="Word"
                onDownload={() => {}}
                onPreview={() => handlePreview("Data Collection Procedures")}
              />
              <TemplateCard
                title="Taxonomy & Tagging Guide"
                description="Controlled vocabulary and tagging guidelines for consistent document classification"
                format="Word"
                onDownload={() => {}}
                onPreview={() => handlePreview("Taxonomy & Tagging Guide")}
              />
              <TemplateCard
                title="DMS Configuration Checklist"
                description="Implementation checklist for document management system setup and testing"
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("DMS Configuration Checklist")}
              />
              <TemplateCard
                title="Consumer Duty Evidence Log"
                description="Master log for tracking all Consumer Duty evidence items including source, date created, owner, review status, location, and regulatory mapping. Supports FCA examination readiness."
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("Consumer Duty Evidence Log")}
              />
              <TemplateCard
                title="Testing Documentation Template"
                description="Standardised template for documenting Consumer Duty testing activities including test objectives, methodology, sample selection, findings, and remediation tracking per FG22/5 expectations."
                format="Word"
                onDownload={() => {}}
                onPreview={() => handlePreview("Testing Documentation Template")}
              />
              <TemplateCard
                title="Data Gaps Analysis Workbook"
                description="Comprehensive workbook to identify, categorise, and prioritise data gaps across all four outcomes. Includes gap severity scoring, remediation planning, and progress tracking dashboards."
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("Data Gaps Analysis Workbook")}
              />
              <TemplateCard
                title="MI Dashboard Specifications"
                description="Technical specifications for Consumer Duty MI dashboards including data fields, visualisation requirements, refresh frequencies, and user access levels for each of the four outcomes."
                format="Word"
                onDownload={() => {}}
                onPreview={() => handlePreview("MI Dashboard Specifications")}
              />
              <TemplateCard
                title="Board Evidence Pack Template"
                description="Structured template for Board Consumer Duty evidence packs including executive summary, outcome dashboards, trend analysis, issues and actions, and attestation requirements."
                format="PowerPoint"
                onDownload={() => {}}
                onPreview={() => handlePreview("Board Evidence Pack Template")}
              />
              <TemplateCard
                title="FG22/5 Evidence Mapping Matrix"
                description="Matrix mapping specific FG22/5 paragraphs to required evidence types, collection methods, and quality standards for demonstrating 'reasonable grounds' compliance."
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("FG22/5 Evidence Mapping Matrix")}
              />
              <TemplateCard
                title="Outcome-Based Data Collection Schedule"
                description="Detailed schedule for data collection across Products & Services, Price & Value, Consumer Understanding, and Consumer Support outcomes with frequency, source, and responsible parties."
                format="Excel"
                onDownload={() => {}}
                onPreview={() => handlePreview("Outcome-Based Data Collection Schedule")}
              />
            </div>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Success Criteria - Part 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Evidence Framework Success</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Evidence requirements matrix completed for all 4 outcomes</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">100% of obligations mapped to specific evidence items</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Evidence owners assigned for all categories</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Quality standards defined and documented</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Gap analysis completed with prioritised remediation plan</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">&lt;10% of required evidence currently missing</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">All critical gaps have remediation owners and deadlines</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Evidence quality standards signed off by Compliance</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Documentation Standards Success</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Documentation standards guide approved</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Naming conventions defined and communicated</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Version control protocols implemented</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Document templates created for all standard types</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">&gt;90% of new documents follow standards</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Users trained on documentation standards</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Repository Success</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Repository structure implemented in DMS</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Taxonomy and tagging system operational</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Documents retrievable within 24-48 hours</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Access controls configured and tested</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Audit trail logging functional</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Search functionality tested and working</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Retention schedule implemented with reminders</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">User training completed with &gt;80% attendance</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Regulatory Readiness</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Able to produce key evidence within 48 hours of request</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Evidence demonstrates contemporaneous decision-making</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">No critical gaps in mandatory evidence areas</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">Internal audit sign-off on evidence framework</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Timeline Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="w-20 justify-center">Week 2</Badge>
                    <span>Evidence requirements matrix completed</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="w-20 justify-center">Week 3</Badge>
                    <span>Gap analysis completed and remediation plan approved</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="w-20 justify-center">Week 4</Badge>
                    <span>Documentation standards guide published</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="w-20 justify-center">Week 5</Badge>
                    <span>Repository structure and taxonomy implemented</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="w-20 justify-center">Week 6</Badge>
                    <span>Access controls, audit trail, and retention schedule operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <PitfallCard
              title="Retrospective Evidence Creation"
              description="Creating evidence after the fact rather than contemporaneously at the time of decision or action"
              impact="FCA treats retrospectively created evidence as unreliable. Documents created shortly before regulatory examination raise serious red flags and may constitute evidence of cover-up."
              prevention="Embed evidence creation into business processes. Make documentation a required step before decisions are final. Use system timestamps to prove contemporaneity."
            />

            <PitfallCard
              title="Evidence Scattered Across Systems"
              description="Critical evidence stored in multiple locations - emails, shared drives, personal folders, different systems - with no central view"
              impact="Unable to retrieve evidence within regulatory timeframes. Inconsistent versions. Risk of evidence being lost or deleted. Audit findings on inadequate record-keeping."
              prevention="Establish single source of truth for Consumer Duty evidence. Create clear filing protocols. Implement regular evidence audits to ensure completeness."
            />

            <PitfallCard
              title="No Version Control"
              description="Multiple versions of documents exist with no clear indication of which is current or what changed between versions"
              impact="Unable to demonstrate decision trail. Risk of using outdated information. Confusion over approved vs draft documents. Regulatory criticism of document management."
              prevention="Implement formal version control with clear numbering. Use document management system with version history. Mark superseded documents clearly."
            />

            <PitfallCard
              title="Generic Template-Driven Evidence"
              description="Using templates without customisation, resulting in evidence that doesn't reflect actual decisions or firm-specific circumstances"
              impact="FCA identifies template-driven evidence as lacking substance. Does not demonstrate genuine consideration of firm's specific situation. May be treated as tick-box compliance."
              prevention="Use templates as starting points only. Require specific, contextual content. Review for genuine analysis and decision rationale before approval."
            />

            <PitfallCard
              title="Inadequate Decision Rationale"
              description="Recording what was decided but not why, lacking the reasoning and data that supported the decision"
              impact="Unable to demonstrate 'reasonable grounds' for decisions. Regulators question whether proper consideration was given. Vulnerable to hindsight criticism."
              prevention="Require all decision documents to include rationale section. Capture data and analysis that informed decision. Document alternatives considered and why rejected."
            />

            <PitfallCard
              title="No Audit Trail for Changes"
              description="Changes made to documents or data without tracking who changed what and when"
              impact="Unable to demonstrate integrity of evidence. Risk of unauthorised changes. Cannot prove when decisions were made. Data protection concerns."
              prevention="Enable audit logging on all evidence systems. Configure to capture user, action, date/time. Protect audit logs from tampering. Review logs periodically."
            />

            <PitfallCard
              title="Ignoring Retention Requirements"
              description="Disposing of evidence before required retention period expires, or retaining too long and creating data protection issues"
              impact="Unable to produce evidence when requested by regulators. Potential regulatory breach. Data protection violations if over-retaining personal data."
              prevention="Create comprehensive retention schedule. Configure automated retention reminders. Implement legal hold procedures. Regular disposal audits."
            />

            <PitfallCard
              title="Poor Search and Retrieval Capability"
              description="Evidence exists but cannot be found quickly due to poor indexing, inconsistent naming, or inadequate search tools"
              impact="Failure to meet regulatory response timeframes (typically 24-48 hours). Staff frustration. Evidence effectively lost even though it exists."
              prevention="Implement consistent naming conventions. Require mandatory metadata tagging. Test search functionality regularly. Create multiple access paths to key documents."
            />

            <PitfallCard
              title="Insufficient Access Controls"
              description="Either too open (sensitive data accessible to all) or too restricted (legitimate users cannot access needed documents)"
              impact="Data breaches if too open. Operational inefficiency if too restricted. Audit findings on access management. Regulatory concerns about data governance."
              prevention="Design role-based access controls. Review access rights periodically. Balance security with operational needs. Document access control decisions."
            />

            <PitfallCard
              title="Treating Evidence as Afterthought"
              description="Building processes without considering evidence requirements, then struggling to retrofit documentation"
              impact="Evidence gaps discovered during regulatory examination. Processes not designed to capture required information. Significant rework needed."
              prevention="Include evidence requirements in process design. Make documentation a process step, not optional add-on. Review processes for evidence completeness before go-live."
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
