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
  Briefcase,
  UserCheck,
  ClipboardList,
  Calendar,
  GitBranch,
  Layers
} from "lucide-react";
import { toast } from "sonner";

const MODULE_ID = "cd-p1-governance-framework";

export default function CDP1GovernanceFramework() {
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
                  <Badge variant="secondary">Part 1 of 2</Badge>
                </div>
                <h1 className="text-2xl font-bold">CD-P1: Governance Framework Design</h1>
                <p className="text-muted-foreground">Foundation & Structure</p>
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
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
            <TabsTrigger value="implementation">Implementation Steps</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
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
                  Establish clear decision-making authority, accountability structures, and oversight mechanisms 
                  to embed Consumer Duty at the heart of organisational governance.
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
                      "Ultimate responsibility for Consumer Duty rests with the Board. Governance must be 
                      the controlling mechanism for preventing foreseeable harm."
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
                      <p className="font-semibold">4-6 weeks</p>
                      <p className="text-xs text-muted-foreground">Initial framework design</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Key Stakeholders</p>
                      <p className="font-semibold">Board & SMFs</p>
                      <p className="text-xs text-muted-foreground">All senior management</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Regulatory Basis</p>
                      <p className="font-semibold">PRIN 2A, SM&CR</p>
                      <p className="text-xs text-muted-foreground">FG22/5 Section 10</p>
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
                      <p className="font-semibold">7 key outputs</p>
                      <p className="text-xs text-muted-foreground">Part 1 foundation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scope */}
            <Card>
              <CardHeader>
                <CardTitle>Module Scope</CardTitle>
                <CardDescription>
                  Part 1 covers foundational governance structures. Part 2 (separate module) covers 
                  accountability mechanisms, integration with existing governance, and ongoing operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Part 1 Key Deliverables (This Module)
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      "Board Consumer Duty Charter",
                      "Consumer Duty Oversight Committee (CDOC) Terms of Reference",
                      "Three Lines of Defence model for Consumer Duty",
                      "Initial RACI Matrix for Consumer Duty implementation",
                      "Escalation pathway framework",
                      "Meeting cadence and reporting calendar (foundation)",
                      "Governance structure diagram"
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
                    <Clock className="h-4 w-4" />
                    Part 2 Deliverables (Covered in Separate Module)
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                    {[
                      "Complete RACI Matrix (all workstreams)",
                      "Decision authority matrix",
                      "Risk appetite statement for consumer outcomes",
                      "Integration protocols with existing committees",
                      "Board training programme",
                      "Governance effectiveness metrics"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Stakeholders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Key Stakeholders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Board Level</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Board of Directors / Governing Body</li>
                      <li>• Chair and Senior Independent Director</li>
                      <li>• Chief Executive Officer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Senior Management</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• All Senior Management Functions (SMFs)</li>
                      <li>• Chief Risk Officer</li>
                      <li>• Chief Compliance Officer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Supporting Functions</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Company Secretary</li>
                      <li>• Internal Audit Head</li>
                      <li>• Consumer Duty Programme Director</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical FCA Expectations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Critical FCA Expectations</h3>
              
              <RegulatoryQuote
                source="FCA"
                reference="FG22/5 para 10.1"
                quote="A firm's governing body has overall responsibility for ensuring adherence to the Consumer Duty. The governing body must review and approve at least annually an assessment of whether the firm is acting to deliver good outcomes for retail customers consistent with the Consumer Duty."
                link="https://www.fca.org.uk/publications/finalised-guidance/fg22-5-final-non-handbook-guidance-firms-consumer-duty"
              />
              
              <Card className="bg-success/5 border-success/20">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">FCA Finding (November 2025 Board Report Review)</h4>
                      <p className="text-sm">
                        "Good board reports were characterised by clear outcomes focus, high-quality MI, 
                        granular analysis of different customer types including vulnerable customers, 
                        and evidence of effective board challenge."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* REGULATORY FOUNDATION TAB */}
          <TabsContent value="regulatory" className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              {/* Board Ultimate Responsibility */}
              <AccordionItem value="board-responsibility" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">1. Board Ultimate Responsibility</h3>
                      <p className="text-sm text-muted-foreground">Governing body accountability and obligations</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <RegulatoryQuote
                    source="FCA Requirement"
                    reference="PRIN 2A"
                    quote="The governing body of a firm is responsible for ensuring that the firm complies with the Consumer Duty."
                  />
                  
                  <Card className="bg-warning/5 border-warning/20">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">This means:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Board cannot delegate ultimate accountability (though can delegate execution)</li>
                        <li>• Board must actively oversee, not just receive updates</li>
                        <li>• Board must challenge management on Consumer Duty matters</li>
                        <li>• Board must approve annual Consumer Duty assessment</li>
                        <li>• Board members can be held accountable for failures in Consumer Duty implementation</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div>
                    <h4 className="font-semibold mb-3">Key Board Obligations</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { title: "Strategic oversight", desc: "Ensure firm's strategy and business model are consistent with delivering good outcomes" },
                        { title: "Annual approval", desc: "Review and approve comprehensive annual Consumer Duty assessment report" },
                        { title: "Resource allocation", desc: "Ensure adequate resources (people, budget, technology) for Consumer Duty" },
                        { title: "Culture oversight", desc: "Set tone from top; ensure culture supports good customer outcomes" },
                        { title: "Risk appetite", desc: "Define and approve risk appetite for consumer outcomes" },
                        { title: "Policy approval", desc: "Approve all Consumer Duty policies and frameworks" },
                        { title: "Challenge and scrutiny", desc: "Actively challenge management on quality of MI, assumptions, and actions" },
                        { title: "Governance effectiveness", desc: "Ensure governance structures are fit for purpose and operating effectively" }
                      ].map((item, index) => (
                        <Card key={index} className="p-3">
                          <h5 className="font-medium text-sm">{index + 1}. {item.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Governance Pyramid */}
                  <Card className="p-4">
                    <h4 className="font-semibold mb-4 text-center">Governance Hierarchy</h4>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-32 py-2 bg-primary text-primary-foreground text-center text-sm font-medium rounded">
                        Board
                      </div>
                      <div className="w-48 py-2 bg-primary/80 text-primary-foreground text-center text-sm font-medium rounded">
                        Senior Management
                      </div>
                      <div className="w-64 py-2 bg-primary/60 text-primary-foreground text-center text-sm font-medium rounded">
                        Three Lines of Defence
                      </div>
                      <div className="w-80 py-2 bg-primary/40 text-primary-foreground text-center text-sm font-medium rounded">
                        Operational Teams
                      </div>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* SM&CR Integration */}
              <AccordionItem value="smcr" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">2. SM&CR Integration</h3>
                      <p className="text-sm text-muted-foreground">Senior Managers & Certification Regime requirements</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    SM&CR is the mechanism for individual accountability. Key elements include Senior Management 
                    Functions (SMFs), Statements of Responsibilities (SoRs), and the new Conduct Rule 6.
                  </p>

                  <div className="space-y-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">A. Prescribed Responsibility for Consumer Duty</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        While there's no single "Consumer Duty SMF", responsibility must be clearly allocated:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/50 rounded">
                          <h5 className="font-medium text-sm">Option 1: Assign to CEO (SMF1)</h5>
                          <p className="text-xs text-muted-foreground">Most common approach. Must ensure responsibility is explicit in SoR.</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded">
                          <h5 className="font-medium text-sm">Option 2: Chief Compliance/Customer Officer</h5>
                          <p className="text-xs text-muted-foreground">If firm has dedicated customer outcomes role. Must have sufficient seniority.</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded">
                          <h5 className="font-medium text-sm">Option 3: Split across multiple SMFs</h5>
                          <p className="text-xs text-muted-foreground">Requires clear coordination mechanism. Must avoid accountability gaps.</p>
                        </div>
                      </div>
                      <Card className="mt-3 p-3 bg-success/5 border-success/20">
                        <p className="text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4 inline mr-2 text-success" />
                          Recommendation: CEO should hold overarching responsibility with clear allocation of 
                          outcome-specific responsibilities to relevant SMFs
                        </p>
                      </Card>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">B. Statements of Responsibilities (SoRs)</h4>
                      <p className="text-sm text-muted-foreground mb-3">Required elements for each relevant SMF:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Specific Consumer Duty obligations within their area</li>
                        <li>• Which of the Four Outcomes they oversee</li>
                        <li>• Governance committees they participate in</li>
                        <li>• Reporting responsibilities to Board</li>
                        <li>• Resources they control relevant to Consumer Duty</li>
                        <li>• How they will discharge the "duty of responsibility"</li>
                      </ul>
                      
                      <Card className="mt-3 p-3 bg-muted/30">
                        <h5 className="font-medium text-sm mb-2">Example SoR Clause:</h5>
                        <p className="text-xs italic">
                          "Responsible for ensuring the firm complies with the Price and Value Outcome of 
                          the Consumer Duty in relation to all retail products manufactured by the firm, including:
                          approval of Fair Value Assessment methodology, oversight of Fair Value Assessments 
                          for all products, reporting to Board on value outcomes, taking appropriate action 
                          when fair value is not achieved..."
                        </p>
                      </Card>
                    </Card>

                    <Card className="p-4 border-destructive/20 bg-destructive/5">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        C. Conduct Rule 6 (CR6) - NEW REQUIREMENT
                      </h4>
                      <p className="text-sm font-medium mb-2">
                        "You must act to deliver good outcomes for retail customers."
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">This applies to:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• All Senior Managers</li>
                        <li>• All Certified Persons</li>
                        <li>• All Conduct Rules staff (if firm is enhanced scope)</li>
                      </ul>
                      <p className="text-sm font-medium mt-3">
                        SMF holders held to HIGHEST standard under CR6
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">D. Duty of Responsibility</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        FCA can take action against SMF if the firm breaches regulatory requirement in area 
                        of their responsibility AND they did not take reasonable steps to prevent the breach.
                      </p>
                      <h5 className="font-medium text-sm mt-3 mb-2">"Reasonable steps" defence requires:</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Clear understanding of responsibilities</li>
                        <li>• Adequate resources allocated</li>
                        <li>• Appropriate policies and procedures in place</li>
                        <li>• Regular monitoring and oversight</li>
                        <li>• Evidence of challenge and inquiry</li>
                        <li>• Documented decision-making</li>
                        <li>• Prompt action when issues identified</li>
                      </ul>
                      <Card className="mt-3 p-3 bg-warning/5 border-warning/20">
                        <p className="text-sm font-medium">
                          <AlertTriangle className="h-4 w-4 inline mr-2 text-warning" />
                          Key point: Must be able to EVIDENCE reasonable steps taken
                        </p>
                      </Card>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Board Composition */}
              <AccordionItem value="board-composition" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">3. Board Composition and Expertise</h3>
                      <p className="text-sm text-muted-foreground">Capability requirements and Consumer Duty Champion</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">A. Collective Competence</h4>
                    <p className="text-sm text-muted-foreground mb-2">Board must collectively have:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Understanding of Consumer Duty requirements and expectations</li>
                      <li>• Ability to interpret and challenge MI on customer outcomes</li>
                      <li>• Knowledge of the firm's products, services, and customer base</li>
                      <li>• Awareness of sector-specific consumer risks</li>
                      <li>• Understanding of vulnerable customer issues</li>
                      <li>• Capability to assess culture and conduct</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">B. Consumer Duty Champion (Optional but Recommended)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      February 2025 update: No longer formal expectation, but many firms retain role.
                    </p>
                    <h5 className="font-medium text-sm mb-2">Purpose of Champion:</h5>
                    <ul className="space-y-1 text-sm mb-3">
                      <li>• Ensure Consumer Duty is prominent in Board discussions</li>
                      <li>• Challenge management on customer outcomes</li>
                      <li>• Provide independent voice for customer interests</li>
                      <li>• Review quality of MI and challenge assumptions</li>
                      <li>• Support Board training and development</li>
                      <li>• Link between Board and CDOC</li>
                    </ul>
                    <Card className="p-3 bg-success/5 border-success/20">
                      <p className="text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 inline mr-2 text-success" />
                        Recommended: Appoint Champion even if not required - shows commitment to FCA
                      </p>
                    </Card>
                    <h5 className="font-medium text-sm mt-3 mb-2">Typical profile: Independent NED with:</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Consumer affairs / customer experience background</li>
                      <li>• No conflicts of interest</li>
                      <li>• Sufficient time commitment</li>
                      <li>• Challenge mindset</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">C. Training and Development</h4>
                    <p className="text-sm text-muted-foreground mb-2">Board and senior management must be trained on:</p>
                    <ul className="space-y-1 text-sm mb-3">
                      <li>• Consumer Duty requirements and expectations</li>
                      <li>• Four outcomes in detail</li>
                      <li>• Firm's specific approach and implementation</li>
                      <li>• How to interpret MI on consumer outcomes</li>
                      <li>• Good and poor practice from FCA reviews</li>
                      <li>• Enforcement themes</li>
                      <li>• Sector-specific issues</li>
                    </ul>
                    <p className="text-sm font-medium">
                      Frequency: Initial comprehensive training, then annual refresher plus ad-hoc updates
                    </p>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* CDOC */}
              <AccordionItem value="cdoc" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Network className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">4. Consumer Duty Oversight Committee (CDOC)</h3>
                      <p className="text-sm text-muted-foreground">Cross-functional coordination and oversight</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Purpose: Coordinate operational response to Consumer Duty across the firm. 
                    Consumer Duty is cross-functional; requires coordination.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">Typical CDOC Membership</h4>
                      <p className="text-sm font-medium mb-2">Chair: SMF with Consumer Duty responsibility</p>
                      <p className="text-sm text-muted-foreground mb-2">Members:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Head of Product (manufacturer)</li>
                        <li>• Head of Distribution (distributor)</li>
                        <li>• Chief Risk Officer</li>
                        <li>• Chief Compliance Officer</li>
                        <li>• Head of Customer Service</li>
                        <li>• Head of Marketing</li>
                        <li>• Head of Pricing</li>
                        <li>• Data & Analytics Lead</li>
                        <li>• Vulnerable Customer Lead</li>
                        <li>• Legal Counsel (as needed)</li>
                        <li>• Consumer Duty Programme Director</li>
                      </ul>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">Key Responsibilities</h4>
                      <ol className="space-y-1 text-sm">
                        <li>1. Oversee implementation programme</li>
                        <li>2. Review/approve key deliverables</li>
                        <li>3. Monitor Four Outcomes</li>
                        <li>4. Review MI and identify issues</li>
                        <li>5. Ensure remediation</li>
                        <li>6. Coordinate across functions</li>
                        <li>7. Escalate to Board</li>
                        <li>8. Prepare annual Board report</li>
                        <li>9. Oversee distribution chain</li>
                        <li>10. Review risks and controls</li>
                      </ol>
                    </Card>
                  </div>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Meeting Frequency & Reporting</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Meeting Frequency:</h5>
                        <ul className="space-y-1 text-sm">
                          <li>• Implementation phase: Fortnightly/monthly</li>
                          <li>• Steady state: Monthly/quarterly</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Reporting:</h5>
                        <ul className="space-y-1 text-sm">
                          <li>• To: Board/Board Risk Committee</li>
                          <li>• Frequency: Quarterly (minimum)</li>
                          <li>• Format: Written report + MI dashboard</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-3 bg-warning/5 border-warning/20">
                    <p className="text-sm font-medium">
                      <AlertTriangle className="h-4 w-4 inline mr-2 text-warning" />
                      Critical Success Factor: CDOC must have AUTHORITY and RESOURCES to drive action across the firm
                    </p>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* Three Lines of Defence */}
              <AccordionItem value="three-lines" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">5. Three Lines of Defence Model</h3>
                      <p className="text-sm text-muted-foreground">First, Second, and Third Line responsibilities</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="grid gap-4">
                    <Card className="p-4 border-l-4 border-l-blue-500">
                      <h4 className="font-semibold mb-2">FIRST LINE (Business / Operational)</h4>
                      <p className="text-sm font-medium mb-2">Role: Owns and manages Consumer Duty risks</p>
                      <p className="text-sm text-muted-foreground mb-2">Responsibilities:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Design and deliver products/services meeting Consumer Duty</li>
                        <li>• Conduct Fair Value Assessments</li>
                        <li>• Test consumer understanding</li>
                        <li>• Provide appropriate support</li>
                        <li>• Identify and support vulnerable customers</li>
                        <li>• Collect data and evidence</li>
                        <li>• Report issues and near-misses</li>
                        <li>• Implement remediation actions</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        Example roles: Product Managers, Distribution Teams, Customer Service, Marketing
                      </p>
                    </Card>

                    <Card className="p-4 border-l-4 border-l-amber-500">
                      <h4 className="font-semibold mb-2">SECOND LINE (Risk & Compliance)</h4>
                      <p className="text-sm font-medium mb-2">Role: Oversees and challenges First Line</p>
                      <p className="text-sm text-muted-foreground mb-2">Responsibilities:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Set Consumer Duty policy and standards</li>
                        <li>• Provide guidance and interpretation</li>
                        <li>• Review and challenge First Line assessments</li>
                        <li>• Monitor outcomes and MI</li>
                        <li>• Identify risks and issues</li>
                        <li>• Report to CDOC and Board</li>
                        <li>• Coordinate across First Line</li>
                        <li>• Engage with regulators</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        Example roles: Consumer Duty Compliance Lead, Risk Managers, Product Governance
                      </p>
                    </Card>

                    <Card className="p-4 border-l-4 border-l-green-500">
                      <h4 className="font-semibold mb-2">THIRD LINE (Internal Audit)</h4>
                      <p className="text-sm font-medium mb-2">Role: Provides independent assurance</p>
                      <p className="text-sm text-muted-foreground mb-2">Responsibilities:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Audit Consumer Duty implementation</li>
                        <li>• Test effectiveness of controls</li>
                        <li>• Conduct outcomes testing (independent)</li>
                        <li>• Report to Audit Committee</li>
                        <li>• Follow up on issues</li>
                        <li>• Benchmark against good practice</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        Example roles: Internal Audit team
                      </p>
                    </Card>
                  </div>

                  <Card className="p-3 bg-destructive/5 border-destructive/20">
                    <p className="text-sm font-medium">
                      <AlertTriangle className="h-4 w-4 inline mr-2 text-destructive" />
                      CRITICAL: Lines must be independent. First Line cannot review own work. Second Line 
                      provides oversight, not do First Line's work. Third Line remains independent of both.
                    </p>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* FCA Multi-Firm Review Findings */}
              <AccordionItem value="fca-findings" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">6. FCA Multi-Firm Review Findings</h3>
                      <p className="text-sm text-muted-foreground">November 2025 governance observations</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <Card className="p-4 bg-success/5 border-success/20">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      Good Practice Identified
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>✓ "Board-level Consumer Duty Champion with dedicated agenda time"</li>
                      <li>✓ "Clear SMF responsibilities documented in SoRs with specific outcomes"</li>
                      <li>✓ "CDOC with cross-functional membership and authority to drive action"</li>
                      <li>✓ "Board actively challenging management on MI quality and customer outcomes"</li>
                      <li>✓ "Regular Board training on Consumer Duty developments"</li>
                      <li>✓ "Clear escalation pathways from operations to Board"</li>
                    </ul>
                  </Card>

                  <Card className="p-4 bg-destructive/5 border-destructive/20">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>✗ "SMF responsibilities vague or overlapping, creating accountability gaps"</li>
                      <li>✗ "CDOC lacks authority or resources to drive change"</li>
                      <li>✗ "Board receives MI but doesn't challenge assumptions or quality"</li>
                      <li>✗ "Insufficient Board understanding of Consumer Duty requirements"</li>
                      <li>✗ "Consumer Duty treated as compliance project, not governance priority"</li>
                      <li>✗ "No clear link between operational issues and Board visibility"</li>
                    </ul>
                  </Card>

                  <Card className="p-3 bg-primary/5 border-primary/20">
                    <p className="text-sm font-semibold">
                      Key message: Governance must be ACTIVE not PASSIVE
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
                  <p className="font-semibold">Part 1: Foundation & Structure</p>
                  <p className="text-sm text-muted-foreground">
                    4 phases covering Board setup, committee establishment, initial RACI, and escalation framework
                  </p>
                </div>
              </div>
            </Card>

            {/* Phase 1: Board Setup */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Phase 1</Badge>
                <h3 className="text-lg font-semibold">Board Setup (Weeks 1-2)</h3>
              </div>

              <ChecklistSection
                stepNumber={1}
                title="Establish Board Oversight"
                description="Schedule dedicated Board session and secure commitment"
                moduleId={MODULE_ID}
                items={[
                  { id: "1-1", label: "Schedule dedicated Board session on Consumer Duty (minimum 2 hours)" },
                  { id: "1-2", label: "Present Consumer Duty requirements overview to Board (FCA expectations, Four Outcomes, current maturity, implementation plan, resource requirements, Board responsibilities)" },
                  { id: "1-3", label: "Secure Board commitment and sponsorship" },
                  { id: "1-4", label: "Identify Board Consumer Duty Champion (if appointing)" },
                  { id: "1-5", label: "Agree Board agenda time for Consumer Duty (standing item)" }
                ]}
              />

              <Card className="p-4 bg-muted/30">
                <h4 className="font-semibold mb-3">Key Decisions at Board Session:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Approve Consumer Duty as strategic priority</li>
                  <li>2. Approve implementation budget and resources</li>
                  <li>3. Confirm Board oversight approach (dedicated committee or existing?)</li>
                  <li>4. Appoint Consumer Duty Champion (if applicable)</li>
                  <li>5. Set expectations for annual Board review</li>
                </ol>
              </Card>

              <ChecklistSection
                stepNumber={2}
                title="Update Senior Management Responsibilities"
                description="Review and update all relevant SMF Statements of Responsibilities"
                moduleId={MODULE_ID}
                items={[
                  { id: "2-1", label: "Review all SMF Statements of Responsibilities (SoRs)" },
                  { id: "2-2", label: "Identify which SMFs have Consumer Duty responsibilities" },
                  { id: "2-3", label: "Draft specific Consumer Duty clauses for each relevant SoR" },
                  { id: "2-4", label: "Update Management Responsibilities Map to show Consumer Duty" },
                  { id: "2-5", label: "Submit SoR updates to FCA if required (within regulatory timescales)" },
                  { id: "2-6", label: "Communicate updated responsibilities to affected SMFs" }
                ]}
              />

              <Card className="p-4 bg-muted/30">
                <h4 className="font-semibold mb-3">Example Responsibility Allocation:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>CEO (SMF1):</strong> Overall accountability for Consumer Duty compliance</li>
                  <li>• <strong>Chief Risk Officer (SMF4):</strong> Consumer Duty risk framework and monitoring</li>
                  <li>• <strong>Chief Compliance Officer:</strong> Policy, interpretation, regulatory engagement</li>
                  <li>• <strong>Head of Product:</strong> Products & Services and Price & Value outcomes</li>
                  <li>• <strong>Head of Distribution:</strong> Distribution chain management</li>
                  <li>• <strong>Head of Customer Service:</strong> Consumer Support outcome</li>
                  <li>• <strong>Head of Marketing:</strong> Consumer Understanding outcome</li>
                </ul>
                <Card className="mt-3 p-3 bg-warning/5 border-warning/20">
                  <p className="text-sm font-medium">
                    <AlertTriangle className="h-4 w-4 inline mr-2 text-warning" />
                    Critical: NO GAPS in responsibility allocation - every aspect must have an SMF owner
                  </p>
                </Card>
              </Card>

              <ChecklistSection
                stepNumber={3}
                title="Define Board Consumer Duty Charter"
                description="Create formal charter documenting Board's role and responsibilities"
                moduleId={MODULE_ID}
                items={[
                  { id: "3-1", label: "Draft Board Consumer Duty Charter covering Board's role, responsibilities, annual review requirements, challenge expectations, Champion role (if applicable), training commitments" },
                  { id: "3-2", label: "Consult with Board members on draft" },
                  { id: "3-3", label: "Obtain Board approval of Charter" },
                  { id: "3-4", label: "Publish Charter (internal communication)" },
                  { id: "3-5", label: "Include in Board induction materials for new members" }
                ]}
              />
            </div>

            {/* Phase 2: Committee Establishment */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Phase 2</Badge>
                <h3 className="text-lg font-semibold">Committee Establishment (Weeks 2-4)</h3>
              </div>

              <ChecklistSection
                stepNumber={4}
                title="Establish Consumer Duty Oversight Committee (CDOC)"
                description="Create cross-functional committee to coordinate Consumer Duty across the firm"
                moduleId={MODULE_ID}
                items={[
                  { id: "4-1", label: "Draft Terms of Reference for CDOC (purpose, membership, responsibilities, authorities, meeting frequency, quorum, reporting lines, review frequency)" },
                  { id: "4-2", label: "Identify and confirm CDOC members (representatives from all key functions with sufficient seniority)" },
                  { id: "4-3", label: "Obtain Board approval of CDOC Terms of Reference" },
                  { id: "4-4", label: "Communicate CDOC establishment to organisation" },
                  { id: "4-5", label: "Schedule initial CDOC meetings" }
                ]}
              />

              <Card className="p-3 bg-primary/5 border-primary/20">
                <p className="text-sm font-medium">
                  Key principle: CDOC must have AUTHORITY to drive action, not just coordinate
                </p>
              </Card>

              <ChecklistSection
                stepNumber={5}
                title="Clarify Three Lines of Defence Roles"
                description="Document Consumer Duty responsibilities for each Line"
                moduleId={MODULE_ID}
                items={[
                  { id: "5-1", label: "Document First Line responsibilities (own risks, conduct FVAs, collect evidence, monitor outcomes, report issues, implement remediation)" },
                  { id: "5-2", label: "Document Second Line responsibilities (set policy/standards, review/challenge, aggregate MI, identify issues, report to CDOC/Board, engage regulators)" },
                  { id: "5-3", label: "Document Third Line responsibilities (independent audit, test controls, outcomes testing, report to Audit Committee, follow up)" },
                  { id: "5-4", label: "Update job descriptions/role profiles for affected roles" },
                  { id: "5-5", label: "Communicate responsibilities to relevant staff" },
                  { id: "5-6", label: "Provide training on roles and responsibilities" }
                ]}
              />

              <Card className="p-3 bg-destructive/5 border-destructive/20">
                <p className="text-sm font-medium">
                  <AlertTriangle className="h-4 w-4 inline mr-2 text-destructive" />
                  Critical: Independence between Lines must be maintained
                </p>
              </Card>
            </div>

            {/* Phase 3: Initial RACI Development */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Phase 3</Badge>
                <h3 className="text-lg font-semibold">Initial RACI Development (Weeks 3-4)</h3>
              </div>

              <ChecklistSection
                stepNumber={6}
                title="Create Initial RACI Matrix for Consumer Duty Implementation"
                description="Define accountability for key implementation deliverables"
                moduleId={MODULE_ID}
                items={[
                  { id: "6-1", label: "Define RACI for Foundation modules (Assessment, Requirements Mapping, Risk Assessment)" },
                  { id: "6-2", label: "Define RACI for Governance & Planning modules" },
                  { id: "6-3", label: "Define RACI for Four Outcomes implementation modules" },
                  { id: "6-4", label: "Define RACI for Cross-cutting implementation (Vulnerable Customers, Distribution Chain, Data & Evidence)" },
                  { id: "6-5", label: "Review RACI with CDOC and SMFs" },
                  { id: "6-6", label: "Resolve any conflicts or gaps" },
                  { id: "6-7", label: "Obtain CDOC approval" },
                  { id: "6-8", label: "Communicate to all affected parties" }
                ]}
              />

              <Card className="p-4 bg-muted/30">
                <h4 className="font-semibold mb-3">RACI Definitions:</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>R (Responsible):</strong> Does the work</li>
                  <li><strong>A (Accountable):</strong> Ultimately answerable (one person only)</li>
                  <li><strong>C (Consulted):</strong> Provides input before decision/action</li>
                  <li><strong>I (Informed):</strong> Kept updated after decision/action</li>
                </ul>
              </Card>

              <Card className="p-4 bg-muted/30">
                <h4 className="font-semibold mb-3">Example RACI Entry:</h4>
                <p className="text-sm mb-2"><strong>Deliverable:</strong> Fair Value Assessment Methodology</p>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>A:</strong> Head of Product (SMF)</li>
                  <li>• <strong>R:</strong> Product Governance team, Pricing team</li>
                  <li>• <strong>C:</strong> Risk, Compliance, Finance, Marketing</li>
                  <li>• <strong>I:</strong> Board, Distribution teams, Customer Service</li>
                </ul>
              </Card>
            </div>

            {/* Phase 4: Escalation & Meeting Structure */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Phase 4</Badge>
                <h3 className="text-lg font-semibold">Escalation & Meeting Structure (Weeks 4-6)</h3>
              </div>

              <ChecklistSection
                stepNumber={7}
                title="Design Escalation Pathways"
                description="Ensure consumer detriment issues escalate quickly to decision-makers"
                moduleId={MODULE_ID}
                items={[
                  { id: "7-1", label: "Define escalation triggers (product not providing fair value, sales outside target market, testing failures, systemic support issues, vulnerable customer harm, distribution partner non-compliance, regulatory engagement, MI adverse trends, FOS uphold rate)" },
                  { id: "7-2", label: "Define escalation levels (Level 1: Operational, Level 2: Material, Level 3: Significant, Level 4: Critical)" },
                  { id: "7-3", label: "Document what triggers escalation to each level, who must be notified, within what timeframe, what information must be provided, what decisions/actions required, who has authority" },
                  { id: "7-4", label: "Create escalation notification templates" },
                  { id: "7-5", label: "Test escalation process with scenario" },
                  { id: "7-6", label: "Obtain CDOC approval" },
                  { id: "7-7", label: "Communicate escalation process to all staff" }
                ]}
              />

              <Card className="p-4">
                <h4 className="font-semibold mb-3">Escalation Levels Summary:</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                    <h5 className="font-medium text-sm">LEVEL 1: Operational Issue</h5>
                    <p className="text-xs text-muted-foreground">Minor issue resolved by First Line within normal processes</p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                    <h5 className="font-medium text-sm">LEVEL 2: Material Issue</h5>
                    <p className="text-xs text-muted-foreground">Requires Second Line oversight or cross-functional coordination. Escalate to CDOC.</p>
                  </div>
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                    <h5 className="font-medium text-sm">LEVEL 3: Significant Issue</h5>
                    <p className="text-xs text-muted-foreground">Requires Board awareness and potential Board decision</p>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                    <h5 className="font-medium text-sm">LEVEL 4: Critical Issue</h5>
                    <p className="text-xs text-muted-foreground">IMMEDIATE Board notification required (same day)</p>
                  </div>
                </div>
              </Card>

              <Card className="p-3 bg-warning/5 border-warning/20">
                <p className="text-sm font-medium">
                  <AlertTriangle className="h-4 w-4 inline mr-2 text-warning" />
                  Critical: Escalation must be FAST - days not weeks
                </p>
              </Card>

              <ChecklistSection
                stepNumber={8}
                title="Establish Meeting Cadence and Reporting Calendar"
                description="Ensure regular governance oversight and reporting"
                moduleId={MODULE_ID}
                items={[
                  { id: "8-1", label: "Define Board-level meeting structure (Quarterly Consumer Duty standing item, Annual dedicated session, Ad-hoc for significant issues)" },
                  { id: "8-2", label: "Define CDOC meeting structure (Monthly during steady state, fortnightly during implementation)" },
                  { id: "8-3", label: "Define Working Group structure (as needed, typically fortnightly during implementation)" },
                  { id: "8-4", label: "Create annual reporting calendar showing all governance touchpoints" },
                  { id: "8-5", label: "Schedule all meetings for next 12 months" },
                  { id: "8-6", label: "Assign paper preparation responsibilities" },
                  { id: "8-7", label: "Confirm secretariat support" },
                  { id: "8-8", label: "Communicate calendar to all participants" }
                ]}
              />

              <Card className="p-4">
                <h4 className="font-semibold mb-3">Meeting Cadence Summary:</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Board Level</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Quarterly standing item (30+ mins)</li>
                      <li>• Annual dedicated session (2+ hrs)</li>
                      <li>• Papers: 7 days advance</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-2">CDOC Level</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Monthly (steady state)</li>
                      <li>• Fortnightly (implementation)</li>
                      <li>• Papers: 5 days advance</li>
                      <li>• Duration: 2-3 hours</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-2">Working Groups</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• As needed</li>
                      <li>• Typically fortnightly</li>
                      <li>• E.g., Products & Services WG</li>
                      <li>• E.g., Vulnerable Customer WG</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* TEMPLATES & TOOLS TAB */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <TemplateCard
                title="Board Consumer Duty Briefing Pack"
                description="Comprehensive presentation for initial Board session covering regulatory requirements, current state assessment, implementation plan, and governance approach"
                format="PowerPoint"
                onDownload={() => handleTemplateDownload("Board Consumer Duty Briefing Pack")}
              />

              <TemplateCard
                title="Board Consumer Duty Charter"
                description="Formal 2-3 page charter documenting Board's role, responsibilities, annual review requirements, Consumer Duty Champion role, and training commitments"
                format="Word"
                onDownload={() => handleTemplateDownload("Board Consumer Duty Charter")}
              />

              <TemplateCard
                title="SMF Statement of Responsibilities - Consumer Duty Clauses"
                description="Template clauses to insert into SMF SoRs for CEO, Head of Product, Head of Customer Service, and other relevant roles"
                format="Word"
                onDownload={() => handleTemplateDownload("SMF Consumer Duty Clauses")}
              />

              <TemplateCard
                title="CDOC Terms of Reference"
                description="Comprehensive Terms of Reference for Consumer Duty Oversight Committee including purpose, membership, responsibilities, authorities, and reporting"
                format="Word"
                onDownload={() => handleTemplateDownload("CDOC Terms of Reference")}
              />

              <TemplateCard
                title="Three Lines of Defence Responsibilities Matrix"
                description="Table format showing Consumer Duty responsibilities by Line for each key activity (FVAs, target markets, testing, monitoring, etc.)"
                format="Excel"
                onDownload={() => handleTemplateDownload("Three Lines Matrix")}
              />

              <TemplateCard
                title="RACI Matrix - Consumer Duty Implementation (Initial)"
                description="Excel workbook with initial RACI for implementation deliverables, Four Outcomes, cross-cutting activities, and governance"
                format="Excel"
                onDownload={() => handleTemplateDownload("RACI Matrix Initial")}
              />

              <TemplateCard
                title="Escalation Pathway Framework"
                description="Document and visual flowchart showing escalation levels, triggers, thresholds, notification requirements, and decision authority"
                format="Word"
                onDownload={() => handleTemplateDownload("Escalation Pathway Framework")}
              />

              <TemplateCard
                title="Governance Meeting Calendar"
                description="12-month calendar showing all governance touchpoints including Board, CDOC, Working Groups, key deliverables, and training sessions"
                format="Excel"
                onDownload={() => handleTemplateDownload("Governance Meeting Calendar")}
              />
            </div>

            {/* Template Details */}
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="briefing-pack" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-semibold">Template 1: Board Consumer Duty Briefing Pack - Structure</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Section 1: Executive Summary (2 slides)</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• What is Consumer Duty</li>
                        <li>• Why it matters to this firm</li>
                        <li>• Board responsibilities</li>
                        <li>• Timeline and next steps</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Section 2: Regulatory Requirements (4-5 slides)</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Consumer Principle and cross-cutting rules</li>
                        <li>• Four outcomes in detail</li>
                        <li>• FCA expectations and priorities</li>
                        <li>• SM&CR integration</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Section 3: Current State Assessment (3-4 slides)</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Maturity assessment summary</li>
                        <li>• Gap analysis headline findings</li>
                        <li>• Key risks identified</li>
                        <li>• Priority areas for improvement</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Section 4: Implementation Plan (4-5 slides)</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Phased approach</li>
                        <li>• Key deliverables by phase</li>
                        <li>• Timeline and milestones</li>
                        <li>• Budget request</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Section 5: Governance Approach (3-4 slides)</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Board role and responsibilities</li>
                        <li>• Consumer Duty Champion recommendation</li>
                        <li>• CDOC structure</li>
                        <li>• SMF responsibilities</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Section 6: Board Decisions (2 slides)</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Approve strategic priority</li>
                        <li>• Approve implementation budget</li>
                        <li>• Approve governance structure</li>
                        <li>• Appoint Consumer Duty Champion</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="charter" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-semibold">Template 2: Board Consumer Duty Charter - Structure</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="font-medium">Section 1: Purpose and Scope</h5>
                      <p className="text-xs text-muted-foreground">Sets out Board's role ensuring firm acts to deliver good outcomes</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Section 2: Regulatory Context</h5>
                      <p className="text-xs text-muted-foreground">Brief overview of Consumer Duty, reference to PRIN 2A and FG22/5</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Section 3: Board Responsibilities</h5>
                      <p className="text-xs text-muted-foreground">8 key responsibilities including strategic direction, annual approval, resource allocation, challenge</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Section 4: Consumer Duty Champion (if applicable)</h5>
                      <p className="text-xs text-muted-foreground">Named role, responsibilities for challenge and oversight</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Section 5: Board Oversight Mechanisms</h5>
                      <p className="text-xs text-muted-foreground">Quarterly standing item, annual session, CDOC minutes, exception reports</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Section 6: Board Development</h5>
                      <p className="text-xs text-muted-foreground">Initial training, annual refresher, regular updates on FCA developments</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Section 7: Review</h5>
                      <p className="text-xs text-muted-foreground">Annual review or sooner if regulatory requirements change</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="three-lines" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-semibold">Template 5: Three Lines of Defence Matrix - Structure</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Activity</th>
                          <th className="text-left p-2">First Line (Business)</th>
                          <th className="text-left p-2">Second Line (Risk & Compliance)</th>
                          <th className="text-left p-2">Third Line (Internal Audit)</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b">
                          <td className="p-2 font-medium text-foreground">Policy & Standards</td>
                          <td className="p-2">Implement policies</td>
                          <td className="p-2">Set policies; interpret regulations</td>
                          <td className="p-2">Audit effectiveness</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium text-foreground">Target Market Definition</td>
                          <td className="p-2">Draft definitions</td>
                          <td className="p-2">Review and challenge; approve</td>
                          <td className="p-2">Audit appropriateness</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium text-foreground">Fair Value Assessment</td>
                          <td className="p-2">Conduct FVAs; gather data</td>
                          <td className="p-2">Review/challenge; approve methodology</td>
                          <td className="p-2">Audit process and conclusions</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium text-foreground">Communication Testing</td>
                          <td className="p-2">Conduct testing</td>
                          <td className="p-2">Review methodology; challenge results</td>
                          <td className="p-2">Independent outcomes testing</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium text-foreground">Vulnerable Customers</td>
                          <td className="p-2">Identify and support</td>
                          <td className="p-2">Set framework; monitor outcomes</td>
                          <td className="p-2">Audit framework effectiveness</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-foreground">Remediation</td>
                          <td className="p-2">Implement actions</td>
                          <td className="p-2">Track; escalate delays</td>
                          <td className="p-2">Audit effectiveness</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="escalation" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-semibold">Template 7: Escalation Pathway Framework - Structure</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Escalation Principles:</h5>
                      <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1">
                        <li>SPEED: Consumer harm issues must escalate quickly (days not weeks)</li>
                        <li>CLARITY: Clear triggers and thresholds for each level</li>
                        <li>AUTHORITY: Each level has defined decision-making authority</li>
                        <li>DOCUMENTATION: All escalations documented with rationale and actions</li>
                        <li>LEARNING: Escalations drive continuous improvement</li>
                      </ol>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      <Card className="p-3 bg-green-500/10">
                        <h6 className="font-medium text-sm">Level 1: Operational</h6>
                        <p className="text-xs text-muted-foreground">Minor issue, First Line resolves within X days</p>
                      </Card>
                      <Card className="p-3 bg-yellow-500/10">
                        <h6 className="font-medium text-sm">Level 2: Material</h6>
                        <p className="text-xs text-muted-foreground">Second Line/CDOC within Y days, RCA required</p>
                      </Card>
                      <Card className="p-3 bg-orange-500/10">
                        <h6 className="font-medium text-sm">Level 3: Significant</h6>
                        <p className="text-xs text-muted-foreground">Board within Z days, comprehensive impact assessment</p>
                      </Card>
                      <Card className="p-3 bg-red-500/10">
                        <h6 className="font-medium text-sm">Level 4: Critical</h6>
                        <p className="text-xs text-muted-foreground">IMMEDIATE Board notification (same day)</p>
                      </Card>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Escalation Triggers (Examples):</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Product identified as not providing fair value</li>
                        <li>• Significant sales outside target market</li>
                        <li>• Consumer understanding testing failure</li>
                        <li>• Systemic support issues (high complaints, poor CSAT)</li>
                        <li>• Vulnerable customer harm identified</li>
                        <li>• Distribution chain partner non-compliance</li>
                        <li>• Regulatory engagement or information request</li>
                        <li>• Material MI adverse trends</li>
                        <li>• FOS uphold rate above threshold</li>
                        <li>• Enforcement risk elevated</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Interactive Features Note */}
            <Card className="p-4 bg-muted/30">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Interactive Features (Part 1)
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>Governance structure builder:</strong> Drag-and-drop to design CDOC membership</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>SMF responsibility allocator:</strong> Assign outcomes to SMFs, check for gaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>Escalation level assessor:</strong> Enter scenario, get recommended escalation level</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>Meeting calendar generator:</strong> Input firm size/complexity, generate recommended calendar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>RACI conflict checker:</strong> Flags overlapping accountabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>Board Charter customizer:</strong> Select options, generate tailored charter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>Progress tracker:</strong> Checklist with completion %</span>
                </li>
              </ul>
            </Card>

            {/* Part 2 Preview */}
            <Card className="p-4 border-dashed">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Coming in Part 2
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Part 2 (CD-P1 continued) will cover accountability mechanisms, integration, and ongoing governance:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Complete RACI Matrix (all workstreams)</li>
                <li>• Decision authority matrix</li>
                <li>• Risk appetite statement for consumer outcomes</li>
                <li>• Integration protocols with existing committees</li>
                <li>• Board training programme details</li>
                <li>• Governance effectiveness metrics</li>
                <li>• Success Criteria and Common Pitfalls</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
