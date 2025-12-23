import { useState } from "react";
import { ArrowLeft, Shield, ClipboardCheck, FileText, Users, AlertTriangle, CheckCircle2, Clock, Printer, Target, BookOpen, Wrench, AlertCircle, TrendingUp, Settings, BarChart3, ListChecks, FileCheck, Building2, GraduationCap, RefreshCw, X, Scale, MessagesSquare, Database, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { getModuleStatus, updateModuleStatus } from "@/lib/storage";

const STORAGE_KEY = "cd-i5-vulnerable-customers";

export default function CDI5VulnerableCustomers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [status, setStatus] = useState(() => getModuleStatus(STORAGE_KEY));

  const handlePreview = (templateName: string) => {
    toast.info(`Opening preview for: ${templateName}`);
  };

  const handleMarkComplete = () => {
    updateModuleStatus(STORAGE_KEY, "completed");
    setStatus("completed");
    toast.success("Module Complete", {
      description: "Material Controls Framework marked as complete!",
    });
  };

  const handleMarkInProgress = () => {
    updateModuleStatus(STORAGE_KEY, "in-progress");
    setStatus("in-progress");
    toast.info("Module In Progress", {
      description: "Material Controls Framework marked as in progress",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline">CD-I5</Badge>
                  <Badge variant="secondary">Cross-Cutting</Badge>
                  <Badge 
                    variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}
                    className={status === "completed" ? "bg-success text-success-foreground" : ""}
                  >
                    {status === "completed" ? (
                      <><CheckCircle2 className="h-3 w-3 mr-1" /> Complete</>
                    ) : status === "in-progress" ? (
                      <><Clock className="h-3 w-3 mr-1" /> In Progress</>
                    ) : "Not Started"}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold">Material Controls Framework Implementation</h1>
                <p className="text-muted-foreground">Comprehensive Control Identification, Testing, Attestation & Continuous Improvement</p>
                
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Duration: 40 weeks
                  </span>
                  <span>Phase: Cross-Cutting</span>
                  <span>Scope: Enterprise-Wide</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              {status === "not-started" && (
                <Button variant="outline" size="sm" onClick={handleMarkInProgress}>
                  <Clock className="h-4 w-4 mr-2" />
                  Mark In Progress
                </Button>
              )}
              <Button size="sm" onClick={handleMarkComplete} disabled={status === "completed"}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {status === "completed" ? "Completed" : "Mark Complete"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
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
                <CardTitle>Module Purpose</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Material Controls Framework</AlertTitle>
                  <AlertDescription>
                    Establish and maintain a robust system of material controls to provide reasonable assurance over financial reporting, operational effectiveness, and regulatory compliance. This framework enables CEO/CFO attestation and board oversight of control effectiveness.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Framework Objectives</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Reliability of financial reporting</li>
                      <li>• Effectiveness and efficiency of operations</li>
                      <li>• Compliance with applicable laws and regulations</li>
                      <li>• Safeguarding of company assets</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Governance Context</h3>
                    <p className="text-sm text-muted-foreground">
                      UK Corporate Governance Code, SOX compliance (if applicable), and industry-specific regulatory requirements. Three lines of defence model with clear accountability at all levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Timeline</CardTitle>
                <CardDescription>40-week phased approach across 6 phases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</div>
                      <h3 className="font-semibold">Foundation & Scoping</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 1-4</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Initial assessment</li>
                      <li>• Framework design</li>
                      <li>• Stakeholder engagement</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</div>
                      <h3 className="font-semibold">Control Identification</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 5-12</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Control inventory</li>
                      <li>• Materiality assessment</li>
                      <li>• First-level validation</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</div>
                      <h3 className="font-semibold">Documentation & Operating Model</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 13-20</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Control documentation</li>
                      <li>• Operating model design</li>
                      <li>• Technology enablement</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</div>
                      <h3 className="font-semibold">Testing & Assurance</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 21-32</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• First-line testing</li>
                      <li>• Second-line review</li>
                      <li>• Third-line assurance</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</div>
                      <h3 className="font-semibold">Board Reporting & Attestation</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 33-40</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Reporting preparation</li>
                      <li>• Management attestation</li>
                      <li>• Board review</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">6</div>
                      <h3 className="font-semibold">Continuous Monitoring</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Ongoing</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Quarterly reviews</li>
                      <li>• Annual refresh</li>
                      <li>• Continuous improvement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Deliverables</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="inventory">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Material Controls Inventory
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li>• Central repository for all material controls</li>
                        <li>• Control categorisation and taxonomy</li>
                        <li>• Risk linkage and strategic objectives mapping</li>
                        <li>• Ownership and accountability assignments</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="documentation">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Control Documentation
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li>• Standardised control descriptions</li>
                        <li>• Control objectives and key attributes</li>
                        <li>• Testing requirements and evidence standards</li>
                        <li>• Dependencies and interrelationships</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="testing">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4" />
                        Testing & Assurance Framework
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li>• Three lines of defence testing protocols</li>
                        <li>• Control self-assessment process</li>
                        <li>• Deficiency management procedures</li>
                        <li>• Remediation tracking and reporting</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="governance">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Governance & Reporting
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li>• Board-level oversight structure</li>
                        <li>• Management attestation framework</li>
                        <li>• Quarterly and annual reporting templates</li>
                        <li>• Policy and procedure documentation</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stakeholders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { role: "Board / Audit Committee", responsibility: "Oversight, approval, challenge" },
                    { role: "CEO / CFO", responsibility: "Attestation, accountability" },
                    { role: "First Line (Business)", responsibility: "Control ownership, execution" },
                    { role: "Second Line (Risk/Compliance)", responsibility: "Review, challenge, monitor" },
                    { role: "Third Line (Internal Audit)", responsibility: "Independent assurance" },
                    { role: "IT / Technology", responsibility: "System controls, GRC platform" },
                    { role: "HR / L&D", responsibility: "Training delivery" },
                    { role: "External Audit", responsibility: "Reliance, coordination" },
                  ].map((stakeholder, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">{stakeholder.role}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{stakeholder.responsibility}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>UK Corporate Governance Code Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-primary/5 border-primary">
                  <Scale className="h-4 w-4" />
                  <AlertDescription className="font-medium">
                    "The board should monitor the company's risk management and internal control systems and, at least annually, carry out a review of their effectiveness and report on that review in the annual report."
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Provision 28</h3>
                    <p className="text-sm text-muted-foreground">
                      The board should carry out a robust assessment of the company's emerging and principal risks. The board should confirm in the annual report that it has completed this assessment, including a description of its principal risks.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Provision 29</h3>
                    <p className="text-sm text-muted-foreground">
                      The board should monitor the company's risk management and internal control systems and, at least annually, carry out a review of their effectiveness and report on that review in the annual report.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Three Lines of Defence Model</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50/50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                        First Line
                      </h4>
                      <p className="text-sm font-medium mb-2">Business Operations</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Own and operate controls</li>
                        <li>• Self-assess control effectiveness</li>
                        <li>• Report deficiencies</li>
                        <li>• Execute remediation</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border-l-4 border-l-green-500 bg-green-50/50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                        Second Line
                      </h4>
                      <p className="text-sm font-medium mb-2">Risk & Compliance</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Set frameworks and policies</li>
                        <li>• Monitor and challenge</li>
                        <li>• Provide independent review</li>
                        <li>• Report to management</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border-l-4 border-l-purple-500 bg-purple-50/50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                        Third Line
                      </h4>
                      <p className="text-sm font-medium mb-2">Internal Audit</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Independent assurance</li>
                        <li>• Test design and effectiveness</li>
                        <li>• Report to Audit Committee</li>
                        <li>• Evaluate framework maturity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Control Definition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>What Makes a Control "Material"?</AlertTitle>
                  <AlertDescription>
                    A control is considered material if its failure could reasonably be expected to result in a material misstatement, significant operational disruption, regulatory breach, or reputational damage.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">Materiality Dimensions</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">Financial</Badge>
                        <span className="text-muted-foreground">Impact on financial statements, revenue, assets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">Operational</Badge>
                        <span className="text-muted-foreground">Service delivery, customer impact, business continuity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">Regulatory</Badge>
                        <span className="text-muted-foreground">Compliance requirements, enforcement risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">Reputational</Badge>
                        <span className="text-muted-foreground">Stakeholder confidence, brand value</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">Strategic</Badge>
                        <span className="text-muted-foreground">Effect on strategic objectives, competitive position</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">Typical Control Volume</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Material Controls</span>
                        <Badge>40-100</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Important Controls</span>
                        <Badge variant="secondary">100-300</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Standard Controls</span>
                        <Badge variant="outline">300+</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        Note: Focus resources on truly material controls. Not everything important is material.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Control Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Nature</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• <strong>Preventive:</strong> Stop errors/fraud before they occur</p>
                      <p>• <strong>Detective:</strong> Identify errors/fraud after occurrence</p>
                      <p>• <strong>Corrective:</strong> Fix identified issues</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Execution</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• <strong>Manual:</strong> Human-performed control</p>
                      <p>• <strong>Automated:</strong> System-enforced control</p>
                      <p>• <strong>IT-Dependent Manual:</strong> Human using IT output</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Frequency</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• Continuous / Real-time</p>
                      <p>• Daily / Weekly</p>
                      <p>• Monthly / Quarterly / Annual</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Precision</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• <strong>Key:</strong> High precision, direct risk mitigation</p>
                      <p>• <strong>Non-Key:</strong> Indirect/supporting control</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Coverage</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• <strong>Complete:</strong> All transactions/items</p>
                      <p>• <strong>Sample:</strong> Selected items only</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Monitoring</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• Real-time monitoring</p>
                      <p>• Periodic review</p>
                      <p>• Exception-based</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Alert className="bg-muted">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Phased Implementation Approach</AlertTitle>
              <AlertDescription>
                This 40-week implementation follows a structured approach across 6 phases, from foundation through to continuous monitoring. Each phase builds on the previous, ensuring a robust and sustainable framework.
              </AlertDescription>
            </Alert>

            {/* Phase 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  Phase 1: Foundation & Scoping (Weeks 1-4)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 1-2: Initial Assessment</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct kick-off meeting with board and executive team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Review existing risk management framework and documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Identify current control landscape and documentation standards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Map existing board reporting structures and information flows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Assess current attestation processes (if any)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document regulatory requirements and governance codes applicable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Identify key stakeholders across three lines of defence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Establish project governance structure and steering committee</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 3-4: Framework Design</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Define materiality thresholds aligned with business objectives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Develop criteria for material control identification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Create preliminary list of candidate material controls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Design control taxonomy and categorisation approach</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Establish control ownership model across the organisation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Draft initial governance structure for material controls oversight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Prepare stakeholder engagement plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Develop communication strategy for rollout</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  Phase 2: Control Identification & Validation (Weeks 5-12)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 5-7: Control Inventory</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct workshops with process owners across key business areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document all candidate controls with preliminary descriptions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Map controls to principal risks and strategic objectives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Identify control gaps and redundancies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Assess current control design effectiveness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Gather evidence of existing control documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Create initial control register with metadata</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Validate control ownership assignments</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 8-10: Materiality Assessment</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Apply materiality criteria to candidate controls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Score controls against financial, operational, and reputational impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Assess regulatory and compliance significance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct impact analysis for control failures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Perform dependency mapping between controls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Facilitate senior management workshops for prioritisation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document rationale for material control designation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Create preliminary material controls inventory</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 11-12: First-Level Validation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Review material controls with internal audit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Validate control descriptions with process owners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Confirm control objectives align with risk appetite</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Assess completeness of control coverage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Identify any regulatory-required controls missing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Refine materiality criteria based on initial findings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Prepare validation report for steering committee</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Obtain initial sign-off from executive sponsors</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  Phase 3: Documentation & Operating Model (Weeks 13-20)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 13-15: Control Documentation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Develop detailed control descriptions using standard template</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document control objectives and key attributes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Define control frequency and testing requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Establish control performance metrics and KPIs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document control dependencies and interrelationships</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Create control procedures and work instructions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Identify control evidence requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Establish document retention requirements</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 16-18: Operating Model Design</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Define roles and responsibilities across three lines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Establish control testing protocols and methodologies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Design control self-assessment process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Create escalation and exception management procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Develop control change management process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Define remediation workflows and timelines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Establish monitoring and reporting cadence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Create training curriculum for control owners</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 19-20: Technology Enablement</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Select or configure GRC platform for material controls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Design dashboards and reporting templates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Configure workflow automation for testing and attestation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Set up control repository and document management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Establish integration with existing risk systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Create user access controls and security protocols</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Develop data quality and validation rules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct system testing and user acceptance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  Phase 4: Testing & Assurance (Weeks 21-32)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg border-l-4 border-l-blue-500">
                    <h4 className="font-semibold mb-3">Week 21-24: First-Line Testing</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Deploy control self-assessment tools to control owners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct initial control effectiveness testing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document testing evidence and results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Identify control deficiencies and root causes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Initiate remediation plans for identified issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Track remediation progress against timelines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Update control documentation based on testing insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Prepare first-line testing summary reports</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg border-l-4 border-l-green-500">
                    <h4 className="font-semibold mb-3">Week 25-28: Second-Line Review</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Risk and compliance teams conduct independent reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Validate first-line testing methodologies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Challenge control effectiveness assessments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Review remediation plans for adequacy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Assess control environment and tone at the top</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Identify systemic issues or control weaknesses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Provide recommendations for improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document second-line findings and conclusions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg border-l-4 border-l-purple-500">
                    <h4 className="font-semibold mb-3">Week 29-32: Third-Line Assurance</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Internal audit executes assurance plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Test design and operating effectiveness independently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Validate control documentation accuracy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Assess governance and oversight effectiveness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Review compliance with policies and procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Evaluate maturity of material controls framework</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Prepare audit findings and management responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Issue internal audit report to audit committee</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 5 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
                  Phase 5: Board Reporting & Attestation (Weeks 33-40)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 33-36: Reporting Preparation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Compile comprehensive control effectiveness summary</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Aggregate findings across all three lines of defence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Prepare executive dashboard with key metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document significant control deficiencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Summarise remediation status and timelines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Create narrative report for board consumption</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Develop supporting appendices with detailed evidence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct quality review of all reporting materials</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-primary/5">
                    <h4 className="font-semibold mb-3">Week 37-38: Management Attestation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>CEO and CFO review complete material controls package</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct attestation workshop with executive team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Address any outstanding questions or concerns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document management representations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Obtain formal written attestations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Prepare disclosure implications assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Review with legal and external advisers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Finalise attestation documentation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Week 39-40: Board Review</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Present material controls report to audit committee</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Facilitate board discussion on control effectiveness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Address board questions and challenge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Obtain board acknowledgement and approval</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Document board minutes and decisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Prepare external disclosure materials (if required)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Communicate outcomes to stakeholders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Archive complete assessment cycle documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 6 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
                  Phase 6: Continuous Monitoring & Improvement (Ongoing)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Quarterly Activities</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Review control performance metrics and KPIs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct control self-assessments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Update risk and control assessments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Monitor remediation progress</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Review and refresh materiality criteria</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Report to management and board committees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Assess emerging risks requiring new controls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Update training materials and deliver refreshers</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Annual Activities</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Conduct full material controls review cycle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Refresh control inventory and materiality assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Update control documentation and procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Perform annual control effectiveness testing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Obtain management and board attestations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Review and enhance framework maturity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Benchmark against industry best practices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Update policies and governance documents</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Templates</CardTitle>
                <CardDescription>Essential templates for material controls framework implementation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="1. Material Controls Inventory Register"
                    description="Central repository for all material controls with key attributes and metadata. Includes control identification, categorisation, risk linkage, materiality assessment, ownership, operating effectiveness, and performance metrics."
                    format="Excel"
                    onPreview={() => handlePreview("Material Controls Inventory Register")}
                  />

                  <TemplateCard
                    title="2. Control Description Standard"
                    description="Standardised format for documenting individual material controls. Required fields include control header, objective, detailed description, attributes (nature, frequency, precision), testing requirements, and dependencies."
                    format="Word"
                    onPreview={() => handlePreview("Control Description Standard")}
                  />

                  <TemplateCard
                    title="3. Materiality Assessment Matrix"
                    description="Structured approach to assess and document control materiality across five dimensions: Financial, Operational, Regulatory, Reputational, and Strategic impact. Includes likelihood assessment and materiality designation."
                    format="Excel"
                    onPreview={() => handlePreview("Materiality Assessment Matrix")}
                  />

                  <TemplateCard
                    title="4. Control Testing Workpaper"
                    description="Document control testing execution and results. Includes testing overview, approach, sample selection, test execution steps, observations, findings, conclusions, and remediation requirements."
                    format="Word"
                    onPreview={() => handlePreview("Control Testing Workpaper")}
                  />

                  <TemplateCard
                    title="5. Control Self-Assessment (CSA) Questionnaire"
                    description="Enable control owners to self-assess control effectiveness. Sections cover control operation, evidence, changes, effectiveness rating, and owner attestation."
                    format="Word"
                    onPreview={() => handlePreview("Control Self-Assessment Questionnaire")}
                  />

                  <TemplateCard
                    title="6. Control Deficiency Log"
                    description="Track and manage control deficiencies through remediation. Fields include identification, classification (Material Weakness/Significant Deficiency), description, root cause, remediation plan, tracking, and escalation status."
                    format="Excel"
                    onPreview={() => handlePreview("Control Deficiency Log")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governance & Reporting Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="7. Board Material Controls Report"
                    description="Comprehensive reporting to the board on material controls effectiveness. Structure includes executive summary, framework overview, control population analysis, testing summary, effectiveness assessment, significant findings, and forward look."
                    format="PowerPoint"
                    onPreview={() => handlePreview("Board Material Controls Report")}
                  />

                  <TemplateCard
                    title="8. Management Attestation Statement"
                    description="Formal written attestation from CEO and CFO on material controls. Covers scope, assessment performed, attestation options (Effective/Effective with exceptions/Ineffective), deficiencies, remediation, and limitations."
                    format="Word"
                    onPreview={() => handlePreview("Management Attestation Statement")}
                  />

                  <TemplateCard
                    title="9. Control Change Request Form"
                    description="Manage changes to material controls through formal process. Sections include requestor information, change details, business justification, change description, risk assessment, implementation plan, and approval workflow."
                    format="Word"
                    onPreview={() => handlePreview("Control Change Request Form")}
                  />

                  <TemplateCard
                    title="10. Quarterly Material Controls Dashboard"
                    description="Executive dashboard for ongoing monitoring. Metrics cover control population, effectiveness, deficiency management, testing coverage, risk coverage, control attributes analysis, emerging themes, and actions."
                    format="PowerPoint"
                    onPreview={() => handlePreview("Quarterly Dashboard")}
                  />

                  <TemplateCard
                    title="11. Annual Material Controls Policy"
                    description="Formal governance document establishing framework requirements. Contents include purpose & scope, definitions, governance structure, materiality criteria, control requirements, testing & assurance, deficiency management, and reporting."
                    format="Word"
                    onPreview={() => handlePreview("Annual Material Controls Policy")}
                  />

                  <TemplateCard
                    title="12. Control Owner Training Curriculum"
                    description="Standardised 15-hour training programme across 10 modules: Framework overview, Design principles, Documentation, Testing & evidence, Self-assessment, Deficiency management, Change management, Technology & tools, Continuous monitoring, Case studies."
                    format="Word"
                    onPreview={() => handlePreview("Training Curriculum")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Curriculum Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { module: 1, title: "Material Controls Framework", duration: "2 hours", content: "Introduction, regulatory context, three lines model, roles and responsibilities" },
                    { module: 2, title: "Control Design Principles", duration: "2 hours", content: "Effective design elements, preventive/detective/corrective, manual vs automated, key controls" },
                    { module: 3, title: "Control Documentation", duration: "1.5 hours", content: "Standards, required elements, evidence requirements, best practices" },
                    { module: 4, title: "Control Testing & Evidence", duration: "2 hours", content: "Test design, sampling, evidence collection, documenting results, working with testers" },
                    { module: 5, title: "Control Self-Assessment", duration: "1.5 hours", content: "Purpose, completing questionnaires, best practices, identifying deficiencies" },
                    { module: 6, title: "Deficiency Management", duration: "1.5 hours", content: "Types, severity classification, root cause analysis, remediation plans, compensating controls" },
                    { module: 7, title: "Change Management", duration: "1 hour", content: "When to raise change requests, process, impact assessment, communication" },
                    { module: 8, title: "Technology & Tools", duration: "1.5 hours", content: "GRC platform navigation, dashboards, workflows, document management" },
                    { module: 9, title: "Continuous Monitoring", duration: "1 hour", content: "Performance monitoring, KPIs, trend analysis, proactive issue identification" },
                    { module: 10, title: "Case Studies & Scenarios", duration: "2 hours", content: "Real-world failures, lessons learned, interactive scenarios, Q&A" },
                  ].map((item) => (
                    <div key={item.module} className="flex items-start gap-4 p-3 border rounded-lg">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {item.module}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{item.title}</span>
                          <Badge variant="secondary">{item.duration}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Assessment & Certification</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Knowledge check quiz (80% pass required)</li>
                    <li>• Practical exercise: Document a control</li>
                    <li>• Certification upon completion</li>
                    <li>• Annual refresher training required</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quantitative Metrics</CardTitle>
                <CardDescription>Measurable targets for framework implementation and ongoing operation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Framework Implementation</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>100% of material controls identified and documented within 9 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>95%+ completeness of control documentation to standard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>100% of material controls assigned to accountable owners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Control inventory reviewed and updated quarterly</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Testing & Assurance</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>100% of material controls tested annually (minimum)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Key controls tested semi-annually or more frequently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>95%+ of planned testing completed on schedule</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Second line reviews cover 100% of material control domains annually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Third line provides assurance on 60%+ of material controls over 3-year cycle</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Control Effectiveness</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>90%+ of material controls operating effectively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>No unresolved material weaknesses at period-end</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Significant deficiencies remediated within 90 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>95%+ of remediation action plans completed on time</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Governance & Reporting</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>100% management attestation obtained annually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Board receives comprehensive material controls report annually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Quarterly updates provided to audit committee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Zero instances of unreported significant deficiencies</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Stakeholder Engagement</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>90%+ control owner training completion within 6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>95%+ completion rate for control self-assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Positive stakeholder feedback scores (4+ out of 5)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qualitative Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Cultural Transformation
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Embedded accountability for controls at all levels</li>
                      <li>• Proactive control ownership vs reactive compliance</li>
                      <li>• Open communication about control issues</li>
                      <li>• Learning culture rather than blame culture</li>
                      <li>• Controls seen as value-adding, not bureaucratic</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Risk Management Integration
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Material controls clearly linked to principal risks</li>
                      <li>• Control effectiveness feeds into risk assessments</li>
                      <li>• Dynamic response to emerging risks</li>
                      <li>• Control strategy aligned with risk appetite</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      Board Confidence
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Board demonstrates understanding of material controls</li>
                      <li>• Constructive challenge in board discussions</li>
                      <li>• Board comfortable with attestation process</li>
                      <li>• External stakeholder confidence maintained</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Operational Excellence
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Reduced control-related incidents and losses</li>
                      <li>• Improved efficiency through control optimisation</li>
                      <li>• Better data quality and reporting reliability</li>
                      <li>• Reduced audit findings and regulatory concerns</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Scale className="h-5 w-5 text-primary" />
                      Regulatory Positioning
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Positive regulatory relationship and engagement</li>
                      <li>• Proactive disclosure of control matters</li>
                      <li>• Demonstrated compliance with governance codes</li>
                      <li>• Benchmark framework within industry</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Continuous Improvement
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Framework matures over successive cycles</li>
                      <li>• Lessons learned are systematically applied</li>
                      <li>• Innovation in control design and automation</li>
                      <li>• Industry best practices adopted</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Pitfalls to Avoid</CardTitle>
                <CardDescription>Based on implementation experience and industry lessons learned</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    These pitfalls have been identified across multiple material controls implementations. Avoiding them will significantly improve your chances of success.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {[
              {
                number: 1,
                title: "Boiling the Ocean - Identifying Too Many Material Controls",
                symptom: "Control inventory balloons to 200+ 'material' controls, making the framework unwieldy and defeating the purpose of focusing on what truly matters.",
                whyItHappens: [
                  "Lack of rigor in applying materiality criteria",
                  "Risk-averse culture where everything feels critical",
                  "Pressure from process owners to elevate their controls",
                  "Confusion between 'important' and 'material'"
                ],
                howToAvoid: [
                  "Establish clear, quantified materiality thresholds upfront",
                  "Apply strict filtering: only controls whose failure would significantly impact strategic objectives",
                  "Benchmark against peers (typically 40-100 material controls for large organisations)",
                  "Create tiered approach: Material / Important / Standard",
                  "Remember: not being 'material' doesn't mean unimportant"
                ],
                risk: "HIGH"
              },
              {
                number: 2,
                title: "Documentation Theatre - Forms Without Substance",
                symptom: "Beautiful control descriptions and testing workpapers that look impressive but don't reflect reality or provide genuine assurance.",
                whyItHappens: [
                  "Compliance mindset vs risk management mindset",
                  "Control owners complete templates without true understanding",
                  "Testing becomes tick-box exercise",
                  "Pressure to show 'everything is fine'"
                ],
                howToAvoid: [
                  "Emphasise purpose over process in training",
                  "Senior management must model transparency and honesty",
                  "Reward those who identify issues, not just those who report green status",
                  "Use data analytics to validate control assertions",
                  "Conduct 'reality checks' through process walkthroughs"
                ],
                risk: "MEDIUM"
              },
              {
                number: 3,
                title: "The Silo Effect - Three Lines Operating in Isolation",
                symptom: "First line doesn't know what second line is reviewing; internal audit findings surprise management; redundant testing; conflicting conclusions.",
                whyItHappens: [
                  "Lack of integrated planning and coordination",
                  "Territorial behaviour or defensive culture",
                  "Different methodologies and terminologies",
                  "Technology systems don't integrate"
                ],
                howToAvoid: [
                  "Establish integrated assurance plan at start of year",
                  "Hold quarterly three lines coordination meetings",
                  "Create shared control repository accessible to all",
                  "Align testing methodologies and rating scales",
                  "Use consistent taxonomy across all three lines"
                ],
                risk: "MEDIUM"
              },
              {
                number: 4,
                title: "Static Framework in a Dynamic Business",
                symptom: "Control inventory becomes outdated as business evolves; new risks emerge without corresponding controls; material controls list feels stale.",
                whyItHappens: [
                  "Framework treated as one-off project rather than ongoing programme",
                  "Lack of triggers for reassessment",
                  "Insufficient connection to strategic planning",
                  "Change management process too bureaucratic"
                ],
                howToAvoid: [
                  "Establish clear triggers for reassessment (acquisitions, new products, regulatory changes)",
                  "Include material controls review in strategic planning cycle",
                  "Quarterly light-touch reviews vs only annual deep dive",
                  "Empower control owners to propose changes proactively",
                  "Link to enterprise risk assessment process"
                ],
                risk: "HIGH"
              },
              {
                number: 5,
                title: "Technology Over-Reliance or Under-Investment",
                symptom: "Either: Expensive GRC platform underutilised. Or: Material controls managed on disparate spreadsheets creating version control nightmares.",
                whyItHappens: [
                  "Technology selected without understanding requirements",
                  "Insufficient user training or change management",
                  "Platform over-configured with unnecessary complexity",
                  "IT and business stakeholders not aligned"
                ],
                howToAvoid: [
                  "Start with process design before selecting technology",
                  "Ensure user involvement in system selection and configuration",
                  "Phased implementation approach",
                  "Invest in training and adoption support",
                  "Balance sophistication with usability"
                ],
                risk: "MEDIUM"
              },
              {
                number: 6,
                title: "Board Overload or Board Disengagement",
                symptom: "Either: Board drowns in detail, can't see forest for trees. Or: Board rubber-stamps reports without genuine understanding or challenge.",
                whyItHappens: [
                  "Unclear on what board needs vs what management wants to share",
                  "Poor report structure: details before summary",
                  "Technical language and jargon",
                  "Board lacks time or expertise to engage"
                ],
                howToAvoid: [
                  "Executive summary first, appendices for detail",
                  "Use visual dashboards and heat maps",
                  "Plain English, avoid jargon and acronyms",
                  "Board training on material controls framework",
                  "Focus board time on exceptions and forward-looking issues"
                ],
                risk: "MEDIUM"
              },
              {
                number: 7,
                title: "Punitive Culture Suppressing Truth",
                symptom: "Control deficiencies hidden or minimised; testers face pressure to give positive ratings; blame culture when issues surface; defensive control owners.",
                whyItHappens: [
                  "Leadership response to bad news creates fear",
                  "Performance management linked to control ratings",
                  "Lack of psychological safety",
                  "Focus on compliance vs improvement"
                ],
                howToAvoid: [
                  "Tone from the top: celebrate issue identification",
                  "Decouple individual performance reviews from control findings",
                  "Recognise and reward those who surface problems",
                  "Focus on root causes and systemic fixes, not individual blame",
                  "'No surprises' culture: early escalation encouraged"
                ],
                risk: "CRITICAL"
              },
              {
                number: 8,
                title: "Expertise Gaps in Key Roles",
                symptom: "Control owners lack understanding of controls; testers unfamiliar with testing methodologies; second line can't provide effective challenge.",
                whyItHappens: [
                  "Roles assigned without considering skills",
                  "Insufficient training provided",
                  "High turnover in key positions",
                  "Technical complexity of some controls"
                ],
                howToAvoid: [
                  "Skills assessment before role assignment",
                  "Comprehensive onboarding and training programmes",
                  "Access to subject matter experts and centres of excellence",
                  "Mentoring and buddy systems for new control owners",
                  "Succession planning for key roles"
                ],
                risk: "MEDIUM"
              },
              {
                number: 9,
                title: "Remediation Plans That Never Close",
                symptom: "Deficiency log grows over time; remediation timelines repeatedly extended; same issues appear in successive reports; action plans lack accountability.",
                whyItHappens: [
                  "Unrealistic timelines set initially",
                  "Lack of accountability for remediation",
                  "Insufficient resources allocated",
                  "Root causes not addressed, only symptoms"
                ],
                howToAvoid: [
                  "Realistic remediation plans with input from those doing the work",
                  "Clear ownership at appropriate seniority level",
                  "Resources and budget explicitly allocated",
                  "Executive steering for complex remediations",
                  "Address root causes, not just patch fixes"
                ],
                risk: "HIGH"
              },
              {
                number: 10,
                title: "Forgetting the 'Why' - Compliance Fatigue",
                symptom: "Eye-rolling when material controls mentioned; seen as bureaucracy; process followed mechanically; stakeholder resistance.",
                whyItHappens: [
                  "Framework becomes end unto itself vs means to objective",
                  "Initial purpose and benefits lost over time",
                  "Process becomes increasingly bureaucratic",
                  "Change fatigue if implemented alongside other initiatives"
                ],
                howToAvoid: [
                  "Continually communicate purpose and benefits",
                  "Share success stories: controls that prevented losses",
                  "Streamline processes over time, reduce burden",
                  "Align with business objectives, not just compliance",
                  "Keep framework lean and focused"
                ],
                risk: "MEDIUM"
              }
            ].map((pitfall) => (
              <Card key={pitfall.number} className="border-l-4 border-l-destructive">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      {pitfall.number}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">⚠️ {pitfall.title}</CardTitle>
                      <Badge variant="destructive">{pitfall.risk} RISK</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Symptom:</h4>
                    <p className="text-sm text-muted-foreground italic">"{pitfall.symptom}"</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Why It Happens:</h4>
                    <ul className="space-y-1 text-sm">
                      {pitfall.whyItHappens.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">How to Avoid:</h4>
                    <ul className="space-y-1 text-sm">
                      {pitfall.howToAvoid.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
