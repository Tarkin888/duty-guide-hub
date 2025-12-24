import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { 
  FileText, 
  Clock, 
  Target, 
  Users, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  Shield,
  Building2,
  Layers,
  UserCheck,
  GitBranch,
  MessageSquare,
  BarChart3,
  Printer,
  Save,
  ArrowRight,
  BookOpen,
  Gavel,
  FileCheck,
  ClipboardList
} from "lucide-react";
import { Link } from "react-router-dom";

const CDP2PolicyFrameworkPart1 = () => {
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("cd-p2-part1-notes") || "";
  });

  const handleNotesChange = (value: string) => {
    setNotes(value);
    localStorage.setItem("cd-p2-part1-notes", value);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link to="/" className="hover:text-primary">Dashboard</Link>
            <span>/</span>
            <span>Governance & Planning</span>
            <span>/</span>
            <span className="text-foreground">CD-P2: Policy & Framework Development</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">CD-P2: Policy & Framework Development</h1>
                  <p className="text-lg text-muted-foreground">Part 1: Core Policy Architecture</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Clock className="h-3 w-3 mr-1" />
                  3-4 Weeks
                </Badge>
                <Badge variant="secondary" className="bg-info/10 text-info">
                  Governance & Planning
                </Badge>
                <Badge variant="outline">Part 1 of 2</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
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
                <p className="text-muted-foreground leading-relaxed">
                  Establish comprehensive policy architecture to embed Consumer Duty across all business operations. 
                  This module creates the foundational policy framework that governs how your firm delivers good 
                  customer outcomes, ensures clear accountability, and provides the documentation necessary for 
                  regulatory compliance and Board attestation.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Part 1 Scope
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">Consumer Duty Master Policy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">Governance Policy Framework</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">Senior Management Accountability Policy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">Policy Governance Standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">Version Control and Approval Workflow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">Policy Communication Strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">Policy Review Schedule</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Part 1: Core Policy Architecture</span>
                      <Badge variant="outline">3-4 weeks</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Part 2: Operational Policies</span>
                      <Badge variant="outline">2-3 weeks</Badge>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Total Duration</span>
                        <Badge className="bg-primary">5-7 weeks</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-warning/50 bg-warning/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Critical Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Policies must be:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-warning font-bold">•</span>
                    <span className="text-sm"><strong>Board-approved:</strong> The Board must review and formally approve the Consumer Duty policy framework</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning font-bold">•</span>
                    <span className="text-sm"><strong>SMCR-aligned:</strong> Policies must integrate with Senior Managers & Certification Regime accountability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning font-bold">•</span>
                    <span className="text-sm"><strong>Accountability-focused:</strong> Clear named ownership for each policy area with SMF responsibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <RegulatoryQuote
              source="FCA"
              reference="FG22/5, para 10.1"
              quote="The board or equivalent governing body is responsible for ensuring the implementation and embedding of the Consumer Duty"
              link="https://www.fca.org.uk/publications/finalised-guidance/fg22-5-final-non-handbook-guidance-consumer-duty"
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  Part 2 Coming Next
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Part 2 will develop detailed operational policies for:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                    <span>Four Outcomes Operational Policies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                    <span>Vulnerable Customer Policy (detailed)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                    <span>Distribution Chain Policy Framework</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                    <span>MI and Monitoring Policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                    <span>Training and Competence Policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Notes</CardTitle>
                <CardDescription>Capture your thoughts and action items for this module</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your notes here..."
                  value={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="policy-requirements" className="border rounded-lg px-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    1. Policy Requirements Under Consumer Duty
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <RegulatoryQuote
                    source="FCA"
                    reference="FG22/5"
                    quote="Firms should have clear policies and procedures to enable them to comply with the Consumer Duty, which are understood across the business and embedded in their culture"
                    link="https://www.fca.org.uk/publications/finalised-guidance/fg22-5-final-non-handbook-guidance-consumer-duty"
                  />

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Key Principles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                          <span className="text-sm">Policies must be proportionate to firm size and complexity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                          <span className="text-sm">Must cover all four outcomes and cross-cutting rules</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                          <span className="text-sm">Must integrate with existing policy framework (not standalone)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                          <span className="text-sm">Must be supported by procedures, guidance, and training</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                          <span className="text-sm">Must be subject to regular review and update</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Board Responsibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">This means:</p>
                      <ul className="space-y-2">
                        <li className="text-sm">• Board must review and approve the policy framework</li>
                        <li className="text-sm">• Board must ensure policies drive the right culture and behaviours</li>
                        <li className="text-sm">• Board must monitor effectiveness through MI</li>
                        <li className="text-sm">• Board cannot delegate ultimate responsibility</li>
                      </ul>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="smcr-integration" className="border rounded-lg px-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    2. Senior Managers Regime Integration
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">SMCR Accountability</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        All SMF holders have responsibilities under the Consumer Duty via:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span className="text-sm"><strong>Prescribed Responsibility:</strong> Consumer Duty compliance assigned to specific SMFs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span className="text-sm"><strong>Conduct Rule 6:</strong> "Act to deliver good outcomes for retail customers"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span className="text-sm"><strong>Duty of Responsibility:</strong> Can be held personally accountable for failures</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-warning/30 bg-warning/5">
                    <CardHeader>
                      <CardTitle className="text-base">Policy Requirement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="text-sm">• Policies must clearly define SMF responsibilities</li>
                        <li className="text-sm">• Must align with Statements of Responsibilities (SoRs)</li>
                        <li className="text-sm">• Must enable SMFs to evidence they took "reasonable steps"</li>
                        <li className="text-sm">• Must support regulatory attestation requirements</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Individual Accountability Means</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="text-sm">• Named owner for each policy area</li>
                        <li className="text-sm">• Clear escalation when policies breached</li>
                        <li className="text-sm">• Evidence of oversight and challenge</li>
                        <li className="text-sm">• Documentation of decision-making</li>
                      </ul>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="policy-hierarchy" className="border rounded-lg px-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    3. Policy Hierarchy and Architecture
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Professional policy framework follows this hierarchy:
                  </p>

                  <div className="space-y-3">
                    <Card className="border-l-4 border-l-primary">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge>Level 1</Badge>
                          Master Policy
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Consumer Duty Master Policy (board-approved)</li>
                          <li>• Sets overarching principles and expectations</li>
                          <li>• Delegates authority to Level 2 policies</li>
                          <li>• Reviewed annually (minimum)</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-info">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge variant="secondary">Level 2</Badge>
                          Governance & Framework Policies
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Governance Policy Framework</li>
                          <li>• Senior Management Accountability Policy</li>
                          <li>• Policy Governance Standards</li>
                          <li>• Reviewed annually or when regulatory changes</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-success">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge variant="outline">Level 3</Badge>
                          Operational Policies
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Four Outcomes specific policies (Part 2)</li>
                          <li>• Vulnerable Customer Policy</li>
                          <li>• Distribution Chain Policy</li>
                          <li>• MI and Monitoring Policy</li>
                          <li>• Training Policy</li>
                          <li>• Reviewed annually or when material changes</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-muted-foreground">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge variant="outline">Level 4</Badge>
                          Procedures & Guidance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Standard Operating Procedures (SOPs)</li>
                          <li>• Process maps and workflows</li>
                          <li>• Job aids and quick reference guides</li>
                          <li>• Templates and tools</li>
                          <li>• Reviewed as needed (typically quarterly)</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-info/30 bg-info/5">
                    <CardHeader>
                      <CardTitle className="text-base">Integration Requirement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Policies must integrate with existing frameworks:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        <div className="text-sm">• Risk Management Framework</div>
                        <div className="text-sm">• Compliance Monitoring Framework</div>
                        <div className="text-sm">• Internal Audit Universe</div>
                        <div className="text-sm">• Change Management Framework</div>
                        <div className="text-sm">• Business Continuity Framework</div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fca-expectations" className="border rounded-lg px-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    4. FCA Expectations on Policy Quality
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground font-medium">
                    FCA Multi-firm Review Findings (November 2025):
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-success/30 bg-success/5">
                      <CardHeader>
                        <CardTitle className="text-base text-success flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Good Practice
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>✓ "Policies clearly articulate expected standards with practical examples"</li>
                          <li>✓ "Strong links between policies and operational procedures"</li>
                          <li>✓ "Clear accountability with named owners and escalation paths"</li>
                          <li>✓ "Regular policy effectiveness reviews with metrics"</li>
                          <li>✓ "Plain language accessible to all staff"</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-destructive/30 bg-destructive/5">
                      <CardHeader>
                        <CardTitle className="text-base text-destructive flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Poor Practice
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>✗ "Generic, copy-paste policies not tailored to firm's business"</li>
                          <li>✗ "Policies sit on shelf, not embedded in operations"</li>
                          <li>✗ "No clear ownership or accountability"</li>
                          <li>✗ "Overly legalistic language that staff don't understand"</li>
                          <li>✗ "Policies conflict with operational reality"</li>
                          <li>✗ "No mechanism to track policy breaches or exceptions"</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-warning/30 bg-warning/5">
                    <CardHeader>
                      <CardTitle className="text-base">FCA Enforcement Themes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm">
                        <li>• Inadequate governance and oversight</li>
                        <li>• Policies not followed in practice</li>
                        <li>• Senior management not held accountable</li>
                        <li>• Culture misaligned with policy commitments</li>
                        <li>• No evidence of board challenge on policies</li>
                      </ul>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="legal-landscape" className="border rounded-lg px-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Gavel className="h-5 w-5 text-primary" />
                    5. Legal and Regulatory Landscape
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Policies must address:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">A. Consumer Duty (PRIN 2A)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Consumer Principle (Principle 12)</li>
                          <li>• Cross-cutting rules (good faith, foreseeable harm, enable objectives)</li>
                          <li>• Four outcomes (Products & Services, Price & Value, Consumer Understanding, Consumer Support)</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">B. Senior Managers Regime</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Prescribed Responsibilities allocation</li>
                          <li>• Statements of Responsibilities (SoRs)</li>
                          <li>• Conduct Rules (especially CR6)</li>
                          <li>• Reasonable steps evidence</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">C. Other Relevant Regulations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Product governance (POG requirements)</li>
                          <li>• Treating Customers Fairly (TCF)</li>
                          <li>• Vulnerable customers (FG21/1)</li>
                          <li>• Distribution chain (FG19/5 for insurance)</li>
                          <li>• Data protection (UK GDPR)</li>
                          <li>• Equality Act 2010</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">D. Firm's Regulatory Permissions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Must tailor to firm's specific regulated activities and permissions.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card className="border-info/50 bg-info/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <p className="font-medium text-info">Implementation Timeline</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Part 1 spans 4 weeks across 4 phases: Framework Design (Week 1), Master Policy Development (Weeks 1-3), 
                      Governance Policies (Weeks 2-3), and Communication & Embedding (Week 4).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge variant="outline">Phase 1</Badge>
                Policy Framework Design (Week 1)
              </h3>

              <ChecklistSection
                stepNumber={1}
                title="Establish Policy Development Governance"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-1-1", label: "Create Policy Development Working Group", details: "Chair: CCO or equivalent. Members: Compliance, Risk, Legal, Operations, Product, Customer Service" },
                  { id: "p2-1-2", label: "Assign Senior Management Function sponsor" },
                  { id: "p2-1-3", label: "Agree Terms of Reference for Working Group" },
                  { id: "p2-1-4", label: "Define policy development project plan with milestones" },
                  { id: "p2-1-5", label: "Establish policy consultation process (who reviews, when, how)" },
                  { id: "p2-1-6", label: "Agree policy approval workflow (draft → review → consult → approve)" },
                  { id: "p2-1-7", label: "Set timeline: Target board approval within 4-6 weeks" },
                ]}
              />

              <Card className="ml-4 border-l-4 border-l-info bg-info/5">
                <CardContent className="pt-4">
                  <p className="text-sm font-medium mb-2">Governance Principles:</p>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Early board engagement - share outline before drafting</li>
                    <li>Iterative consultation - don't wait until end to seek input</li>
                    <li>Plain language - test with frontline staff for comprehension</li>
                    <li>Proportionate - appropriate for firm size and complexity</li>
                    <li>Evidence-based - cite regulatory sources</li>
                  </ol>
                </CardContent>
              </Card>

              <ChecklistSection
                stepNumber={2}
                title="Conduct Policy Architecture Review"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-2-1", label: "Map existing policy framework", details: "What policies exist? Which are relevant to CD? What gaps exist?" },
                  { id: "p2-2-2", label: "Define policy hierarchy (4 levels as per regulatory foundation)" },
                  { id: "p2-2-3", label: "Identify policies to create, update, or retire" },
                  { id: "p2-2-4", label: "Create policy roadmap showing dependencies" },
                  { id: "p2-2-5", label: "Agree policy numbering/naming convention" },
                ]}
              />

              <ChecklistSection
                stepNumber={3}
                title="Assign Policy Ownership"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-3-1", label: "Assign SMF accountability for each policy area" },
                  { id: "p2-3-2", label: "Assign operational policy owner (author/maintainer) for each" },
                  { id: "p2-3-3", label: "Define policy owner responsibilities", details: "Drafting, consultation, approval, communication, monitoring, review" },
                  { id: "p2-3-4", label: "Update Statements of Responsibilities (SoRs) to reflect ownership" },
                  { id: "p2-3-5", label: "Document in Responsibilities Map using RACI model" },
                ]}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge variant="outline">Phase 2</Badge>
                Consumer Duty Master Policy Development (Weeks 1-3)
              </h3>

              <ChecklistSection
                stepNumber={4}
                title="Draft Consumer Duty Master Policy"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-4-1", label: "Section 1: Executive Summary (purpose, scope, board commitment, key principles)" },
                  { id: "p2-4-2", label: "Section 2: Regulatory Requirements (Principle 12, cross-cutting rules, four outcomes)" },
                  { id: "p2-4-3", label: "Section 3: Governance and Accountability (Board, SMF, CDOC, Three Lines)" },
                  { id: "p2-4-4", label: "Section 4: Policy Framework (hierarchy, ownership, approval, review)" },
                  { id: "p2-4-5", label: "Section 5: Four Outcomes Approach (high-level principles)" },
                  { id: "p2-4-6", label: "Section 6: Vulnerable Customers (definition, identification, treatment)" },
                  { id: "p2-4-7", label: "Section 7: Distribution Chain (manufacturer/distributor obligations)" },
                  { id: "p2-4-8", label: "Section 8: Monitoring and Reporting (MI framework, board reporting)" },
                  { id: "p2-4-9", label: "Section 9: Training and Competence (role-based requirements)" },
                  { id: "p2-4-10", label: "Section 10: Continuous Improvement (review process, horizon scanning)" },
                  { id: "p2-4-11", label: "Write in plain language (target Flesch >60)" },
                  { id: "p2-4-12", label: "Include practical examples relevant to firm's business" },
                ]}
              />

              <ChecklistSection
                stepNumber={5}
                title="Conduct Internal Consultation"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-5-1", label: "Circulate draft to Policy Working Group for initial review" },
                  { id: "p2-5-2", label: "Workshop with Product teams: Clarity on product governance?" },
                  { id: "p2-5-3", label: "Workshop with Distribution/Sales: Clarity on their obligations?" },
                  { id: "p2-5-4", label: "Workshop with Customer Service: Clarity on support standards?" },
                  { id: "p2-5-5", label: "Review with Compliance: Regulatory accuracy confirmed?" },
                  { id: "p2-5-6", label: "Review with Risk: Integration with risk framework?" },
                  { id: "p2-5-7", label: "Review with Legal: Legal compliance verified?" },
                  { id: "p2-5-8", label: "Document consultation responses and policy decisions" },
                  { id: "p2-5-9", label: "Revise draft incorporating feedback" },
                ]}
              />

              <ChecklistSection
                stepNumber={6}
                title="Board Review and Approval"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-6-1", label: "Prepare board paper with executive summary, regulatory context, architecture overview" },
                  { id: "p2-6-2", label: "Include governance and accountability framework" },
                  { id: "p2-6-3", label: "Include implementation approach and resource requirements" },
                  { id: "p2-6-4", label: "Submit master policy with supporting appendices" },
                  { id: "p2-6-5", label: "Present to board with opportunity for questions and challenge" },
                  { id: "p2-6-6", label: "Document board feedback and any required changes" },
                  { id: "p2-6-7", label: "Incorporate board direction" },
                  { id: "p2-6-8", label: "Obtain formal board approval (minuted)" },
                ]}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge variant="outline">Phase 3</Badge>
                Governance Policy Framework (Weeks 2-3)
              </h3>

              <ChecklistSection
                stepNumber={7}
                title="Develop Governance Policy Framework"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-7-1", label: "A. Consumer Duty Oversight Committee Policy", details: "Purpose, membership, quorum, frequency, reporting lines, authority, MI requirements" },
                  { id: "p2-7-2", label: "Define committee purpose and mandate" },
                  { id: "p2-7-3", label: "Specify membership and quorum requirements" },
                  { id: "p2-7-4", label: "Set meeting frequency and agenda structure" },
                  { id: "p2-7-5", label: "B. Senior Management Accountability Policy", details: "Prescribed responsibilities, SMF expectations, reasonable steps, attestation" },
                  { id: "p2-7-6", label: "Define Prescribed Responsibilities for Consumer Duty" },
                  { id: "p2-7-7", label: "Allocate to specific SMF holders by name" },
                  { id: "p2-7-8", label: "Define 'reasonable steps' expectations and evidence standards" },
                  { id: "p2-7-9", label: "C. Policy Governance Standards", details: "Structure, plain language, version control, approval workflow, review" },
                  { id: "p2-7-10", label: "Define policy structure requirements and templates" },
                  { id: "p2-7-11", label: "Set plain language standards (readability targets)" },
                  { id: "p2-7-12", label: "Define exception and breach management processes" },
                ]}
              />

              <ChecklistSection
                stepNumber={8}
                title="Create Version Control and Approval Workflow"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-8-1", label: "Implement policy version control system", details: "Repository structure, naming convention (e.g., CD-POL-001-v2.0)" },
                  { id: "p2-8-2", label: "Define version numbering rules (major vs minor changes)" },
                  { id: "p2-8-3", label: "Establish superseded policy archiving process" },
                  { id: "p2-8-4", label: "Create change log maintenance procedure" },
                  { id: "p2-8-5", label: "Define approval workflow by policy level", details: "L1: Board, L2: CDOC, L3: SMF, L4: Operational manager" },
                  { id: "p2-8-6", label: "Create approval tracking mechanism" },
                  { id: "p2-8-7", label: "Define emergency change process" },
                  { id: "p2-8-8", label: "Establish annual review calendar" },
                ]}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge variant="outline">Phase 4</Badge>
                Policy Communication and Embedding (Week 4)
              </h3>

              <ChecklistSection
                stepNumber={9}
                title="Develop Policy Communication Strategy"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-9-1", label: "Create communication plan for policy rollout", details: "Key messages by audience, channels, timeline, feedback mechanisms" },
                  { id: "p2-9-2", label: "Draft all-staff email from CEO/Board" },
                  { id: "p2-9-3", label: "Create management briefing pack" },
                  { id: "p2-9-4", label: "Develop frontline staff FAQ document" },
                  { id: "p2-9-5", label: "Prepare 'What this means for you' guides by role", details: "Board, Senior managers, Product teams, Distribution, Customer service, Support functions" },
                  { id: "p2-9-6", label: "Launch policy portal or repository" },
                  { id: "p2-9-7", label: "Schedule launch events (town halls, Q&A sessions)" },
                ]}
              />

              <ChecklistSection
                stepNumber={10}
                title="Establish Policy Monitoring and Compliance"
                moduleId="cd-p2-part1"
                items={[
                  { id: "p2-10-1", label: "Define policy compliance monitoring approach", details: "How will adherence be checked? What constitutes a breach?" },
                  { id: "p2-10-2", label: "Create policy breach register" },
                  { id: "p2-10-3", label: "Define exception request process" },
                  { id: "p2-10-4", label: "Integrate into compliance monitoring plan" },
                  { id: "p2-10-5", label: "Include in internal audit universe" },
                  { id: "p2-10-6", label: "Define MI on policy compliance for board reporting" },
                ]}
              />

              <Card className="ml-4 border-l-4 border-l-success bg-success/5">
                <CardContent className="pt-4">
                  <p className="text-sm font-medium mb-2">Monitoring Mechanisms:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Compliance testing:</strong> Sample-based testing of policy adherence</li>
                    <li>• <strong>Self-assessments:</strong> Business units self-assess compliance</li>
                    <li>• <strong>Quality assurance:</strong> Review of key activities (product approvals, FVAs)</li>
                    <li>• <strong>Issue tracking:</strong> Monitor themes in complaints, incidents</li>
                    <li>• <strong>Internal audit:</strong> Periodic deep-dive reviews</li>
                    <li>• <strong>Management attestation:</strong> Managers attest to policy compliance</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TemplateCard
                title="Consumer Duty Master Policy Document"
                description="Comprehensive 25-page policy template with all 10 sections including executive summary, regulatory requirements, governance, four outcomes, and continuous improvement"
                format="Word"
                onDownload={() => console.log("Download Master Policy")}
                onPreview={() => console.log("Preview Master Policy")}
              />

              <TemplateCard
                title="Policy Development Project Plan"
                description="Gantt chart template showing 4 phases across 7 weeks with milestones, activities, dependencies, owners, and RAG status"
                format="Excel"
                onDownload={() => console.log("Download Project Plan")}
                onPreview={() => console.log("Preview Project Plan")}
              />

              <TemplateCard
                title="Policy Architecture Map"
                description="Visual diagram showing four-level hierarchy, all policies by level, relationships, ownership, review frequencies, and framework integration"
                format="PowerPoint"
                onDownload={() => console.log("Download Architecture Map")}
                onPreview={() => console.log("Preview Architecture Map")}
              />

              <TemplateCard
                title="Policy Ownership Matrix"
                description="Table format tracking policy name, level, SMF accountable, operational owner, review frequency, last/next review dates, and status"
                format="Excel"
                onDownload={() => console.log("Download Ownership Matrix")}
                onPreview={() => console.log("Preview Ownership Matrix")}
              />

              <TemplateCard
                title="Oversight Committee Terms of Reference"
                description="Comprehensive TOR including purpose, authority, membership, quorum, meeting frequency, agenda structure, reporting obligations, and key responsibilities"
                format="Word"
                onDownload={() => console.log("Download Committee TOR")}
                onPreview={() => console.log("Preview Committee TOR")}
              />

              <TemplateCard
                title="SMF Consumer Duty Responsibilities Policy"
                description="Policy template covering prescribed responsibility allocation, SMF-specific expectations by outcome, reasonable steps interpretation, and attestation requirements"
                format="Word"
                onDownload={() => console.log("Download SMF Policy")}
                onPreview={() => console.log("Preview SMF Policy")}
              />

              <TemplateCard
                title="Policy Development Standards"
                description="Standards document specifying template structure, plain language standards (Flesch >60), version numbering rules, review triggers, and quality criteria"
                format="Word"
                onDownload={() => console.log("Download Standards")}
                onPreview={() => console.log("Preview Standards")}
              />

              <TemplateCard
                title="Policy Version Control Log"
                description="Excel tracker with policy reference, version, date, author, reviewer, approver, change summary, review due date, status, and file location"
                format="Excel"
                onDownload={() => console.log("Download Version Log")}
                onPreview={() => console.log("Preview Version Log")}
              />

              <TemplateCard
                title="Policy Approval Workflow Diagram"
                description="Process map showing Draft → Review → Consultation → Revision → Approval → Publication → Communication → Monitoring with decision points"
                format="PowerPoint"
                onDownload={() => console.log("Download Workflow")}
                onPreview={() => console.log("Preview Workflow")}
              />

              <TemplateCard
                title="Policy Communication Strategy Template"
                description="Communication plan including objectives, target audiences, key messages, channels, timeline, responsibilities, success measures, and feedback mechanisms"
                format="Word"
                onDownload={() => console.log("Download Comms Strategy")}
                onPreview={() => console.log("Preview Comms Strategy")}
              />

              <TemplateCard
                title="Policy Breach Register"
                description="Excel log tracking date, policy breached, description, severity, impact, root cause, owner, corrective action, due date, status, and closure"
                format="Excel"
                onDownload={() => console.log("Download Breach Register")}
                onPreview={() => console.log("Preview Breach Register")}
              />

              <TemplateCard
                title="Policy Exception Request Form"
                description="Form template for requesting policy exceptions with business justification, risk assessment, proposed mitigations, duration, and approval workflow"
                format="Word"
                onDownload={() => console.log("Download Exception Form")}
                onPreview={() => console.log("Preview Exception Form")}
              />
            </div>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    Policy Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Consumer Duty Master Policy approved by Board within 4-6 weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Policy framework covers all regulatory requirements (PRIN 2A)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Policies written in plain language (Flesch reading ease &gt;60)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">All policies have named SMF accountability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Version control system operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Policy repository accessible to all staff</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Consumer Duty Oversight Committee established and first meeting held</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Terms of Reference approved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">SMF responsibilities clearly allocated in Statements of Responsibilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Attestation process defined</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-primary" />
                    Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Policies integrated with existing frameworks (risk, compliance, audit)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">No conflicts between Consumer Duty policies and other policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Clear hierarchy and relationships documented</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Policy communicated to all staff (&gt;95% awareness)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Role-specific guidance provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Q&A sessions held</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Policy portal launched</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Policy compliance monitoring approach defined</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Breach reporting mechanism operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Exception process established</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">MI on policy compliance reported to board</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Regulatory Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Policies align with FCA expectations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Evidence of board approval and oversight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">SMF accountability clear and documented</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <span className="text-sm">Ready for regulatory examination</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Timeline Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Week 1</span>
                    <span className="text-sm text-muted-foreground">Framework design and governance setup</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Weeks 1-3</span>
                    <span className="text-sm text-muted-foreground">Master policy development and consultation</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Weeks 2-3</span>
                    <span className="text-sm text-muted-foreground">Governance policies development</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Week 4</span>
                    <span className="text-sm text-muted-foreground">Communication and embedding</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <span className="text-sm font-medium">Weeks 5-7</span>
                    <span className="text-sm text-muted-foreground">Part 2 operational policies (next module)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <div className="grid gap-4">
              <PitfallCard
                title="Pitfall 1: Generic Copy-Paste Policies"
                description="Policies that are clearly copied from templates or competitors without customisation to the firm's actual business"
                impact="Policies don't reflect operational reality; staff can't follow them"
                prevention="Tailor every policy to your firm's products, services, customers, and operating model. Don't say 'our products' generically - name actual product ranges"
              />

              <PitfallCard
                title="Pitfall 2: Legalistic Language Nobody Understands"
                description="Overly legalistic policies that staff find incomprehensible"
                impact="Policies sit on shelf; staff don't know how to comply"
                prevention="Use plain language, test with frontline staff, target Flesch reading ease >60. Instead of 'The firm shall endeavour to ensure', say 'We will'"
              />

              <PitfallCard
                title="Pitfall 3: Policy-Reality Gap"
                description="Policies that describe ideal state but conflict with how business actually operates. FCA Quote: 'Firms should not have policies they do not follow in practice'"
                impact="Policies routinely breached; culture of non-compliance"
                prevention="Ensure policies reflect actual capabilities and operations, or change operations. Don't commit to 24-hour complaint response if you can't deliver"
              />

              <PitfallCard
                title="Pitfall 4: Unclear Accountability"
                description="No named individuals responsible for policy areas"
                impact="Nobody accountable when things go wrong"
                prevention="Assign specific SMF accountability for each policy area. Name the SMF in the policy: 'The Chief Customer Officer (Jane Smith, SMF24) is accountable for...'"
              />

              <PitfallCard
                title="Pitfall 5: Policies as Tick-Box Exercise"
                description="Policies written to satisfy regulator rather than drive good outcomes"
                impact="Policies don't embed in culture; seen as compliance burden"
                prevention="Frame policies around delivering customer outcomes, not just regulatory compliance. Lead with 'We want customers to...' not 'The regulator requires...'"
              />

              <PitfallCard
                title="Pitfall 6: No Board Ownership"
                description="Policies presented to board as fait accompli with no challenge"
                impact="Board doesn't understand or own the approach"
                prevention="Engage board early, present options, invite challenge, document debate. Present trade-offs: 'We could do A (lower cost, higher risk) or B (higher cost, lower risk)'"
              />

              <PitfallCard
                title="Pitfall 7: Publish and Forget"
                description="Policies published but not communicated, trained, or monitored"
                impact="Staff unaware of policies or don't understand them"
                prevention="Comprehensive communication plan, role-specific training, compliance monitoring"
              />

              <PitfallCard
                title="Pitfall 8: Conflicting Policies"
                description="Consumer Duty policies contradict existing policies or incentives"
                impact="Staff confused about priorities; policies undermine each other"
                prevention="Review all policies for conflicts, resolve before approval. Don't have sales incentives that conflict with good customer outcomes"
              />

              <PitfallCard
                title="Pitfall 9: No Review Mechanism"
                description="Policies never reviewed or updated despite changes in business/regulations"
                impact="Policies become obsolete; firm out of compliance"
                prevention="Mandatory review schedule, trigger events for review, ownership for updates"
              />

              <PitfallCard
                title="Pitfall 10: Insufficient Consultation"
                description="Policies written by compliance in isolation without operational input"
                impact="Policies impractical or unimplementable"
                prevention="Extensive consultation with operations, test with frontline staff"
              />
            </div>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Scale className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Regulatory Risk Note</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      All of these pitfalls carry HIGH regulatory risk. FCA multi-firm reviews have specifically 
                      identified these as areas of concern. Use the templates provided in this module to help 
                      avoid these common mistakes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Next Steps */}
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Next Steps</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This completes Part 1 of Policy & Framework Development. Part 2 develops the detailed 
                  operational policies for each of the four outcomes, vulnerable customers, distribution chain, 
                  MI and monitoring, and training requirements.
                </p>
              </div>
              <Button className="flex items-center gap-2" asChild>
                <Link to="/governance/policy-part2">
                  Continue to Part 2
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CDP2PolicyFrameworkPart1;