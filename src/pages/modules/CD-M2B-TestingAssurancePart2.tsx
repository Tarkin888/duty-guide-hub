import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { 
  ClipboardCheck, 
  Shield, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Target,
  Users,
  TrendingUp,
  MessageSquare,
  Headphones,
  Calendar,
  FolderOpen,
  FileCheck,
  Eye,
  Scale,
  ArrowRight,
  Printer,
  Building,
  UserCheck,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CDM2BTestingAssurancePart2() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Monitoring & Assurance</span>
          <span>/</span>
          <span>CD-M2B</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Testing & Assurance Programme - Part 2
            </h1>
            <p className="text-lg text-muted-foreground">
              Understanding & Support Testing, Annual Reviews, Regulatory Readiness
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Badge variant="secondary" className="text-sm">
              Ongoing Programme
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="regulatory" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Regulatory</span>
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Steps</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="success" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">Success</span>
          </TabsTrigger>
          <TabsTrigger value="pitfalls" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Pitfalls</span>
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Purpose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Complete the Testing & Assurance Programme with Consumer Understanding testing, 
                Consumer Support testing, annual review processes, and regulatory examination readiness.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Part 2A: Understanding & Support Testing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Consumer Understanding outcome testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Consumer Support outcome testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Sludge audit methodologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Vulnerable customer testing protocols</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-secondary/50 bg-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary-foreground" />
                  Part 2B: Annual Reviews & Readiness
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Annual review and attestation processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Documentation and evidence standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Internal audit coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Regulatory examination readiness</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <RegulatoryQuote
            source="FCA Consumer Duty Guidance"
            quote="Where firms use sophisticated testing capabilities to maximise the effectiveness of their sales and marketing, we expect them to use capabilities of an equivalent standard to test whether their communications and customer support are helping consumers to make informed decisions."
            reference="FG22/5"
          />

          <Card className="border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Critical FCA Requirement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                Testing Sophistication Equivalence: If you use A/B testing and behavioral analytics 
                for sales optimization, you MUST use the same sophistication for Consumer Understanding testing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Deliverables - Part 2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Consumer Understanding testing framework",
                  "Comprehension testing protocols",
                  "Behavioral and usability testing",
                  "Consumer Support testing framework",
                  "Sludge audit methodology",
                  "Vulnerable customer testing protocols",
                  "Annual review process",
                  "Board attestation framework",
                  "Evidence repository structure",
                  "Regulatory examination pack"
                ].map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <span>{deliverable}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REGULATORY FOUNDATION TAB */}
        <TabsContent value="regulatory" className="space-y-6">
          {/* Consumer Understanding Testing */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Section 5: Consumer Understanding Outcome Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2">Testing Standard Requirements</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 border rounded-lg bg-destructive/10 border-destructive/30">
                    <p className="font-medium text-destructive">NOT This</p>
                    <p>"Did we provide information?"</p>
                    <p className="text-xs text-muted-foreground">(Output check)</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-destructive/10 border-destructive/30">
                    <p className="font-medium text-destructive">NOT This</p>
                    <p>"Is the document clear?"</p>
                    <p className="text-xs text-muted-foreground">(Process check)</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-success/10 border-success/30">
                    <p className="font-medium text-success">YES This</p>
                    <p>"Did the customer understand?"</p>
                    <p className="text-xs text-muted-foreground">(Outcome check)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Three Types of Understanding Testing */}
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="comprehension" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Type 1: Comprehension Testing
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  <strong>Purpose:</strong> Validate customers understand factual content
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Methods</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Post-communication surveys with knowledge questions</li>
                      <li>• Recall testing (what do you remember?)</li>
                      <li>• Explanation testing (explain in your own words)</li>
                      <li>• True/false questions about key information</li>
                      <li>• Multiple choice on critical features</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Example Protocol</h5>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Customer receives communication</li>
                      <li>Within 24-48 hours, survey sent</li>
                      <li>Questions test 5-7 critical points</li>
                      <li>Pass threshold: 80%+ correct</li>
                      <li>Failed items trigger redesign</li>
                    </ol>
                  </div>
                </div>
                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-sm font-medium">Success Criteria: &gt;85% of customers pass comprehension test</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="behavioral" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Type 2: Behavioral Testing
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  <strong>Purpose:</strong> Observe actual decision-making behaviors
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Methods</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Customer journey observation</li>
                      <li>• Funnel analysis (where do customers drop out?)</li>
                      <li>• Time-on-page analytics</li>
                      <li>• Decision reversal rates</li>
                      <li>• Follow-up action patterns</li>
                      <li>• Support queries after communication</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-warning rounded-lg">
                    <h5 className="font-semibold mb-2 text-warning">Indicators of Poor Understanding</h5>
                    <ul className="text-sm space-y-1">
                      <li>⚠️ High abandonment at terms acceptance</li>
                      <li>⚠️ Repeated visits to same information page</li>
                      <li>⚠️ Support queries immediately after communication</li>
                      <li>⚠️ Frequent early cancellations</li>
                      <li>⚠️ High complaint rates about "didn't understand"</li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-sm font-medium">Success Criteria: &lt;10% abandonment at disclosure/explanation steps</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="usability" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Type 3: Usability Testing
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  <strong>Purpose:</strong> Validate communications are accessible and navigable
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Methods</h5>
                    <ul className="text-sm space-y-1">
                      <li>• User testing sessions (observe customers using materials)</li>
                      <li>• Eye-tracking studies</li>
                      <li>• Heat mapping (which sections get attention?)</li>
                      <li>• Accessibility audits (screen reader testing)</li>
                      <li>• Readability scoring (Flesch-Kincaid)</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Protocol (n=10-15)</h5>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Recruit representative customer sample</li>
                      <li>Give communication in typical format</li>
                      <li>Ask to complete tasks: "Find the monthly cost"</li>
                      <li>Observe: How long? Do they find it?</li>
                      <li>Debrief and iterate design</li>
                    </ol>
                  </div>
                </div>
                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-sm font-medium">Success Criteria: 90% can find critical information within 60 seconds; Readability &gt;60; WCAG 2.1 AA</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Vulnerable Customer Testing */}
          <Card className="border-warning">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-warning" />
                Mandatory: Vulnerable Customer Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The FCA expects firms to specifically test communications with customers who have 
                characteristics of vulnerability:
              </p>
              <div className="grid md:grid-cols-4 gap-3">
                {[
                  { driver: "Low financial capability", approach: "Test with non-specialists" },
                  { driver: "Low digital skills", approach: "Test offline/phone alternatives" },
                  { driver: "Health conditions", approach: "Test with accessibility accommodations" },
                  { driver: "Life events", approach: "Test when customer is stressed" }
                ].map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">{item.driver}</p>
                    <p className="text-xs text-muted-foreground">{item.approach}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                <p className="text-sm font-medium">
                  Success: No significant variance in understanding scores between vulnerable and non-vulnerable customers
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Consumer Support Testing */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-primary" />
                Section 6: Consumer Support Outcome Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2">Testing Must Validate</h4>
                <div className="grid md:grid-cols-3 gap-2">
                  {[
                    "Support is accessible to all customers",
                    "Support is effective (resolves issues)",
                    "Support is timely (meets customer needs)",
                    "No unreasonable barriers exist",
                    "Vulnerable customers receive appropriate support",
                    "Customers can act in their interests"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Three Dimensions of Support Testing */}
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="accessibility" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Dimension 1: Accessibility Testing
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Testing Elements</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Channel availability (phone, email, chat, post)</li>
                      <li>• Channel operating hours vs customer needs</li>
                      <li>• Wait times and availability</li>
                      <li>• Accessibility for disabled customers</li>
                      <li>• Language support</li>
                      <li>• Third-party access (PoA, carers)</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Methods</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Mystery shopping across all channels</li>
                      <li>• Accessibility audits (WCAG 2.1 AA)</li>
                      <li>• Peak time stress testing</li>
                      <li>• Vulnerable customer journey testing</li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-sm font-medium">Success: &lt;5 min wait times for urgent issues; WCAG 2.1 AA compliant; Third-party access within 1 day</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="effectiveness" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Dimension 2: Effectiveness Testing
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Testing Elements</h5>
                    <ul className="text-sm space-y-1">
                      <li>• First Contact Resolution (FCR) rates</li>
                      <li>• Issue resolution time</li>
                      <li>• Quality of resolution</li>
                      <li>• Customer satisfaction post-contact</li>
                      <li>• Repeat contact rates</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Methods</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Post-contact surveys (CSAT)</li>
                      <li>• Call quality monitoring</li>
                      <li>• Customer journey analysis</li>
                      <li>• Root cause analysis of recurring issues</li>
                      <li>• Vulnerable customer outcome comparison</li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-sm font-medium">Success: FCR &gt;80%; CSAT &gt;4/5; Resolution &lt;5 working days; &lt;10% repeat contacts</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sludge" className="border border-destructive rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold text-destructive">
                Dimension 3: Barrier Testing ("Sludge Audits") - HIGH PRIORITY
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <RegulatoryQuote
                  source="FCA Expectation"
                  quote="It should be as easy to cancel/switch/claim as it was to purchase."
                  reference="FG22/5"
                />
                <Card className="border-primary bg-primary/5">
                  <CardHeader>
                    <CardTitle>The Symmetry Test</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-semibold mb-2">Purchase Journey</h5>
                        <ul className="text-sm space-y-1">
                          <li>Steps required: X</li>
                          <li>Time to complete: Y minutes</li>
                          <li>Online option: Yes/No</li>
                          <li>Confirmation: Immediate</li>
                        </ul>
                      </div>
                      <div className="p-4 border border-primary rounded-lg">
                        <h5 className="font-semibold mb-2 text-primary">Cancellation Journey</h5>
                        <ul className="text-sm space-y-1">
                          <li>Steps required: ≤ X <span className="text-success">(must be ≤ purchase)</span></li>
                          <li>Time to complete: ≤ Y minutes</li>
                          <li>Online option: Must match purchase</li>
                          <li>Confirmation: Must match purchase</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="text-sm font-medium text-destructive">
                        If cancellation is more difficult than purchase = SLUDGE PRACTICE = HIGH REGULATORY RISK
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Annual Review */}
          <Card className="border-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary-foreground" />
                Section 7: Annual Review & Assessment Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RegulatoryQuote
                source="PRIN 2A"
                quote="At least annually, the firm's governing body must review and approve a report assessing whether the firm is acting to deliver good outcomes for retail customers."
                reference="PRIN 2A"
              />
              <div className="p-4 bg-secondary/10 rounded-lg">
                <h4 className="font-semibold mb-3">Annual Review Must Assess</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {[
                    "Whether all four outcomes are being delivered",
                    "Quality and effectiveness of testing and monitoring",
                    "Outcomes for vulnerable customers vs others",
                    "Distribution chain effectiveness",
                    "Future business strategy alignment with Consumer Duty",
                    "Culture and incentive alignment",
                    "Actions required to address identified issues"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Board Report Quality */}
          <Card>
            <CardHeader>
              <CardTitle>Board Report Quality Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-success rounded-lg">
                  <h4 className="font-semibold text-success mb-3">GOOD Reports Have</h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Clear outcomes focus - dedicated sections for each outcome",
                      "Good quality MI - data supports conclusions",
                      "Analysis of different customer types - especially vulnerable",
                      "Clear processes for production - not last-minute scramble",
                      "Assessment of culture - not just processes"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 border border-destructive rounded-lg">
                  <h4 className="font-semibold text-destructive mb-3">POOR Reports Show</h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Repackaging existing MI without Consumer Duty lens",
                      "Lack of comprehensive view across distribution chain",
                      "Inadequate analysis of vulnerable customers",
                      "No evidence of Board challenge",
                      "Vague action plans without owners or timelines"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Standards */}
          <Accordion type="single" collapsible>
            <AccordionItem value="evidence" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Section 8: Documentation & Evidence Standards
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <h4 className="font-semibold mb-2">The "Reasonable Grounds" Evidence Test</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    FCA Expectation: Firms must have "reasonable grounds" for believing they are complying
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Contemporaneous documentation of decisions</li>
                    <li>• Clear rationale for judgments made</li>
                    <li>• Data/analysis supporting conclusions</li>
                    <li>• Evidence that controls are operating (not just designed)</li>
                    <li>• Audit trail linking decisions to outcomes</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Evidence Repository Structure</h4>
                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`/Consumer-Duty-Evidence/
  /Testing-Results/
    /Products-Services-Testing/
    /Price-Value-Testing/
    /Consumer-Understanding-Testing/
    /Consumer-Support-Testing/
  /MI-and-Monitoring/
    /Outcomes-Dashboards/
    /Threshold-Breaches/
    /Root-Cause-Analysis/
  /Governance/
    /Board-Reports/
    /Committee-Minutes/
    /SMF-Attestations/
  /Annual-Reviews/
    /[Year]/`}
                  </pre>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Record Retention Periods</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Testing results: 6 years</div>
                    <div>MI and monitoring: 6 years</div>
                    <div>Board reports: Permanent</div>
                    <div>Decision records: 6 years</div>
                    <div>Annual reviews: Permanent</div>
                    <div>Remediation evidence: 6 years</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="audit" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Section 9: Internal Audit Coordination
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Badge className="mb-2">1st Line</Badge>
                    <h5 className="font-semibold">Operations</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Owns processes and controls</li>
                      <li>• Day-to-day monitoring</li>
                      <li>• Documents evidence</li>
                      <li>• Takes corrective action</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Badge variant="secondary" className="mb-2">2nd Line</Badge>
                    <h5 className="font-semibold">Compliance/Risk</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Sets standards and policies</li>
                      <li>• Oversees first line</li>
                      <li>• Challenges testing quality</li>
                      <li>• Coordinates annual review</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-primary rounded-lg bg-primary/5">
                    <Badge className="bg-primary mb-2">3rd Line</Badge>
                    <h5 className="font-semibold">Internal Audit</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Provides independent assurance</li>
                      <li>• Assesses control effectiveness</li>
                      <li>• Tests outcomes independently</li>
                      <li>• Reports to Board/Audit Committee</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="examination" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Section 10: Regulatory Examination Readiness
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold mb-2">Common FCA Questions to Prepare For</h4>
                  <ul className="text-sm space-y-2">
                    {[
                      "Walk me through your Fair Value Assessment for Product X",
                      "How do you know your communications are being understood?",
                      "Show me how outcomes differ for vulnerable vs other customers",
                      "What testing did you do before launching this product?",
                      "What issues have you identified and what did you do about them?",
                      "How does your Board challenge the executive on Consumer Duty?",
                      "What's your testing sophistication compared to your sales optimization?",
                      "Show me the evidence supporting your attestation statement"
                    ].map((question, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Search className="h-4 w-4 text-primary mt-0.5" />
                        <span>"{question}"</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Documentation Readiness</h5>
                    <ul className="text-sm space-y-1">
                      <li>• All board reports accessible</li>
                      <li>• Testing results documented</li>
                      <li>• Decision records complete</li>
                      <li>• Evidence trails clear</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Narrative Readiness</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Clear implementation story</li>
                      <li>• Explain testing approach</li>
                      <li>• Examples of improvements</li>
                      <li>• Evidence of Board challenge</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">People Readiness</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Key personnel briefed</li>
                      <li>• Consistent messaging</li>
                      <li>• Can discuss examples</li>
                      <li>• Non-defensive approach</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        {/* IMPLEMENTATION STEPS TAB */}
        <TabsContent value="implementation" className="space-y-6">
          {/* Consumer Understanding Testing Steps */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Consumer Understanding Testing Implementation
              </CardTitle>
            </CardHeader>
          </Card>

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={1}
            title="Establish Understanding Testing Programme"
            items={[
              { id: "m2b-1-1", label: "Define testing requirements for each communication type" },
              { id: "m2b-1-2", label: "Set comprehension pass thresholds by product/risk (typically 80%+)" },
              { id: "m2b-1-3", label: "Identify testing methods appropriate to channels" },
              { id: "m2b-1-4", label: "Build testing into communication approval workflow" },
              { id: "m2b-1-5", label: "Allocate budget and resources for testing programme" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={2}
            title="Build Testing Capabilities"
            items={[
              { id: "m2b-2-1", label: "Develop in-house testing skills OR engage specialist vendors" },
              { id: "m2b-2-2", label: "Create testing question banks by product" },
              { id: "m2b-2-3", label: "Build behavioral analytics infrastructure" },
              { id: "m2b-2-4", label: "Recruit customer testing panels (including vulnerable customers)" },
              { id: "m2b-2-5", label: "Train staff on testing methodologies" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={3}
            title="Design Product-Specific Testing Protocols"
            items={[
              { id: "m2b-3-1", label: "Map critical information customers MUST understand for each product" },
              { id: "m2b-3-2", label: "Design comprehension questions (5-7 per communication)" },
              { id: "m2b-3-3", label: "Create behavioral tracking specifications" },
              { id: "m2b-3-4", label: "Define success thresholds by product risk" },
              { id: "m2b-3-5", label: "Set testing frequency schedule" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={4}
            title="Conduct Pre-Launch Testing"
            items={[
              { id: "m2b-4-1", label: "Comprehension testing with representative sample (n=100+ for complex products)" },
              { id: "m2b-4-2", label: "Usability testing with small group (n=10-15)" },
              { id: "m2b-4-3", label: "Vulnerable customer testing (n=20+)" },
              { id: "m2b-4-4", label: "Iterate based on findings (may require 2-3 rounds)" },
              { id: "m2b-4-5", label: "Document pass/fail decisions with rationale" }
            ]}
          />

          {/* Consumer Support Testing Steps */}
          <Card className="bg-secondary/50 border-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Consumer Support Testing Implementation
              </CardTitle>
            </CardHeader>
          </Card>

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={5}
            title="Design Support Testing Framework"
            items={[
              { id: "m2b-5-1", label: "Map all customer support journeys requiring testing (cancel, switch, claim, complain)" },
              { id: "m2b-5-2", label: "Define success criteria for each journey" },
              { id: "m2b-5-3", label: "Select testing methods (mystery shopping, analytics, surveys)" },
              { id: "m2b-5-4", label: "Set testing frequency by journey risk" },
              { id: "m2b-5-5", label: "Allocate resources for testing programme" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={6}
            title="Implement Accessibility Testing"
            items={[
              { id: "m2b-6-1", label: "Conduct WCAG 2.1 audit of all digital channels" },
              { id: "m2b-6-2", label: "Test phone systems for ease of navigation" },
              { id: "m2b-6-3", label: "Mystery shop with accessibility scenarios (visual/hearing impairment)" },
              { id: "m2b-6-4", label: "Test third-party access processes (Power of Attorney)" },
              { id: "m2b-6-5", label: "Document findings and remediate issues" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={7}
            title="Conduct Sludge Audits"
            items={[
              { id: "m2b-7-1", label: "Map purchase journey vs service journeys (symmetry test)" },
              { id: "m2b-7-2", label: "Mystery shop cancellation, switching, claims processes" },
              { id: "m2b-7-3", label: "Time and document all steps required" },
              { id: "m2b-7-4", label: "Score difficulty (1-5 scale)" },
              { id: "m2b-7-5", label: "Identify unreasonable barriers" },
              { id: "m2b-7-6", label: "Prioritize removal of barriers" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={8}
            title="Test Vulnerable Customer Support"
            items={[
              { id: "m2b-8-1", label: "Mystery shop with vulnerability scenarios" },
              { id: "m2b-8-2", label: "Track support outcomes for vulnerable vs non-vulnerable" },
              { id: "m2b-8-3", label: "Analyze complaints from vulnerable customers" },
              { id: "m2b-8-4", label: "Test staff recognition and response capabilities" },
              { id: "m2b-8-5", label: "Review adjustment provision and effectiveness" }
            ]}
          />

          {/* Annual Review Steps */}
          <Card className="bg-info/5 border-info/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-info" />
                Annual Review & Attestation Implementation
              </CardTitle>
            </CardHeader>
          </Card>

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={9}
            title="Establish Annual Review Cycle"
            items={[
              { id: "m2b-9-1", label: "Set annual review timing (typically Q3/Q4)" },
              { id: "m2b-9-2", label: "Define review scope and components" },
              { id: "m2b-9-3", label: "Assign responsibility for each component" },
              { id: "m2b-9-4", label: "Create review project plan with milestones" },
              { id: "m2b-9-5", label: "Schedule Board review date" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={10}
            title="Gather Evidence Throughout Year"
            items={[
              { id: "m2b-10-1", label: "Maintain testing results log" },
              { id: "m2b-10-2", label: "Compile MI quarterly" },
              { id: "m2b-10-3", label: "Document all remediation actions" },
              { id: "m2b-10-4", label: "Collect SMF attestations" },
              { id: "m2b-10-5", label: "Gather culture metrics" },
              { id: "m2b-10-6", label: "Update distribution chain information" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={11}
            title="Prepare Outcomes Assessment"
            items={[
              { id: "m2b-11-1", label: "Summarize MI for each outcome (trends, variances, issues)" },
              { id: "m2b-11-2", label: "Conduct differential outcomes analysis (vulnerable vs all)" },
              { id: "m2b-11-3", label: "Document root cause analysis for poor outcomes" },
              { id: "m2b-11-4", label: "Detail actions taken and their effectiveness" },
              { id: "m2b-11-5", label: "Identify outstanding issues and plans" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={12}
            title="Compile Board Report & Obtain Approval"
            items={[
              { id: "m2b-12-1", label: "Draft Executive Summary" },
              { id: "m2b-12-2", label: "Complete each outcome section with MI evidence" },
              { id: "m2b-12-3", label: "Include vulnerable customer analysis" },
              { id: "m2b-12-4", label: "Add culture assessment" },
              { id: "m2b-12-5", label: "Obtain SMF attestations with supporting evidence" },
              { id: "m2b-12-6", label: "Quality review against FCA guidance" },
              { id: "m2b-12-7", label: "Present to Board and obtain formal approval" }
            ]}
          />

          {/* Regulatory Readiness Steps */}
          <Card className="bg-warning/5 border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-warning" />
                Regulatory Examination Readiness
              </CardTitle>
            </CardHeader>
          </Card>

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={13}
            title="Conduct Mock Regulatory Review"
            items={[
              { id: "m2b-13-1", label: "Simulate FCA examination using common questions" },
              { id: "m2b-13-2", label: "Test evidence retrieval speed (target: <5 working days)" },
              { id: "m2b-13-3", label: "Review narrative consistency across personnel" },
              { id: "m2b-13-4", label: "Identify gaps or weaknesses" },
              { id: "m2b-13-5", label: "Remediate issues before real examination" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2b"
            stepNumber={14}
            title="Prepare Examination Pack & Brief Personnel"
            items={[
              { id: "m2b-14-1", label: "Compile key documents in accessible format" },
              { id: "m2b-14-2", label: "Create index/navigation guide" },
              { id: "m2b-14-3", label: "Prepare executive summary of approach" },
              { id: "m2b-14-4", label: "Brief SMFs on Consumer Duty implementation" },
              { id: "m2b-14-5", label: "Practice Q&A sessions with key personnel" },
              { id: "m2b-14-6", label: "Align messaging across individuals" }
            ]}
          />
        </TabsContent>

        {/* TEMPLATES TAB */}
        <TabsContent value="templates" className="space-y-6">
          <h3 className="text-lg font-semibold">Consumer Understanding Testing Templates</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateCard
              title="Consumer Understanding Testing Framework"
              description="Programme specification covering testing requirements, methodologies, vulnerable customer testing, and action protocols"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Communication Testing Protocol"
              description="Product-specific testing specification with comprehension questions, behavioral metrics, and pass/fail thresholds"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Pre-Launch Testing Report"
              description="Comprehensive report template documenting testing methodology, sample composition, results, and sign-off"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Understanding Monitoring Dashboard"
              description="MI dashboard showing survey results, behavioral metrics, complaints, and vulnerable customer variance"
              format="Excel"
              onPreview={() => {}}
            />
          </div>

          <h3 className="text-lg font-semibold mt-8">Consumer Support Testing Templates</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateCard
              title="Support Testing Framework Specification"
              description="Programme covering support journeys, accessibility testing, mystery shopping, and effectiveness metrics"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Sludge Audit Assessment Framework"
              description="Process-by-process assessment with symmetry scoring, barrier identification, and remediation planning"
              format="Excel"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Vulnerable Customer Support Testing Protocol"
              description="Testing specifications including vulnerability scenarios, mystery shopping scripts, and outcome comparison"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Accessibility Audit Checklist"
              description="WCAG 2.1 AA audit checklist for digital channels with phone and in-person testing requirements"
              format="Excel"
              onPreview={() => {}}
            />
          </div>

          <h3 className="text-lg font-semibold mt-8">Annual Review & Attestation Templates</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateCard
              title="Annual Review Project Plan"
              description="Project plan with milestones, responsibilities (RACI), information gathering schedule, and critical path"
              format="Excel"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Testing Programme Annual Review Template"
              description="Assessment covering testing coverage, pass/fail rates, action effectiveness, and programme improvements"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Four Outcomes Annual Assessment Template"
              description="Per-outcome assessment with MI summary, differential analysis, root cause, and year-over-year trends"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Culture & Governance Assessment Template"
              description="Assessment covering staff understanding, training, incentives, governance effectiveness, and SMF duties"
              format="Word"
              onPreview={() => {}}
            />
          </div>

          <h3 className="text-lg font-semibold mt-8">Documentation & Readiness Templates</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateCard
              title="Evidence Repository Structure Specification"
              description="Repository design with folder structure, naming conventions, metadata standards, and retention schedule"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Mock Examination Checklist"
              description="Self-assessment covering FCA questions, evidence retrieval, narrative consistency, and personnel briefing"
              format="Excel"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Regulatory Examination Pack Structure"
              description="Pack organization with executive summary, governance documents, testing results, and evidence index"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Internal Audit Coordination Agreement"
              description="Framework defining audit scope, coordination protocols, information sharing, and action tracking"
              format="Word"
              onPreview={() => {}}
            />
          </div>
        </TabsContent>

        {/* SUCCESS CRITERIA TAB */}
        <TabsContent value="success" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Understanding Testing Effectiveness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    ">85% of communications pass comprehension testing on first attempt",
                    "Failed tests remediated and re-tested within 30 days",
                    "Vulnerable customers included in all testing (>20% of sample)",
                    "Testing sophistication equivalent to sales/marketing testing",
                    "No significant variance in understanding (vulnerable vs all)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-primary" />
                  Support Testing Effectiveness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Sludge audits show cancellation process ≤ purchase complexity",
                    "FCR rates >80% for support interactions",
                    "CSAT scores >4/5 for support",
                    "All channels tested (not just digital)",
                    "Vulnerable customer outcomes equal non-vulnerable"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Governance & Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Annual Board report completed and approved on schedule",
                    "All SMF attestations obtained with supporting evidence",
                    "Evidence repository complete and organized",
                    "Internal audit recommendations implemented within timeframes",
                    "No regulatory findings on testing inadequacy"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Regulatory Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Can respond to FCA information requests within 5 working days",
                    "Mock examinations pass with no major gaps",
                    "Key personnel confident in explaining approach",
                    "Clear evidence trail supports all assertions",
                    "Proactive identification and remediation of issues"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { weeks: "1-4", activity: "Framework design & planning" },
                  { weeks: "4-8", activity: "Testing programme setup" },
                  { weeks: "8-16", activity: "Pilot testing all outcomes" },
                  { weeks: "16-24", activity: "Full rollout & embedding" },
                  { weeks: "24+", activity: "Ongoing monitoring & annual review" }
                ].map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Weeks {item.weeks}</p>
                    <p className="text-sm font-medium">{item.activity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { metric: "Comprehension pass rate", target: ">85%" },
                  { metric: "Failed test remediation", target: "<30 days" },
                  { metric: "FCR rate", target: ">80%" },
                  { metric: "CSAT score", target: ">4/5" },
                  { metric: "Sludge symmetry score", target: "≤1.0" },
                  { metric: "Vulnerable customer variance", target: "<5%" },
                  { metric: "Evidence retrieval time", target: "<5 days" },
                  { metric: "Testing plan completion", target: ">95%" }
                ].map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">{item.metric}</p>
                    <p className="text-lg font-bold text-primary">{item.target}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* COMMON PITFALLS TAB */}
        <TabsContent value="pitfalls" className="space-y-6">
          <div className="grid gap-4">
            <PitfallCard
              title="Pitfall 1: Testing But Not Acting"
              description="Firms conduct testing but don't act on results - a box-ticking exercise that identifies issues without fixing them"
              impact="Poor outcomes persist; regulatory enforcement risk; wasted testing resources. Testing without action is worse than no testing - shows firm knew about issues but didn't fix them."
              prevention="Mandatory action protocols triggered by failed tests. Document why failures occurred and how remediated. Re-test to validate improvement. Maximum 30-day remediation for failed tests."
            />

            <PitfallCard
              title="Pitfall 2: Insufficient Vulnerable Customer Testing"
              description="Testing samples don't include vulnerable customers or only have token representation (e.g., 2-3 people)"
              impact="Communications/support don't work for vulnerable customers; differential outcomes go undetected; regulatory breach"
              prevention="Minimum 20% of testing samples must be vulnerable customers across all four drivers. Oversample intentionally. Analyze results by vulnerability driver."
            />

            <PitfallCard
              title="Pitfall 3: Testing Sophistication Mismatch"
              description="Firms use advanced A/B testing and behavioral analytics for sales optimization but basic surveys for understanding testing"
              impact="Breach of FCA's 'equivalent standard' expectation; enforcement risk; false assurance about customer understanding"
              prevention="Audit sales/marketing testing sophistication. Match that standard for Consumer Understanding testing. If you use A/B testing for conversion, use it for comprehension."
            />

            <PitfallCard
              title="Pitfall 4: Sludge Practices Persist"
              description="Cancellation processes remain significantly harder than purchase despite testing identifying the issue"
              impact="HIGH REGULATORY ENFORCEMENT RISK - this is explicit FCA priority. Customer harm continues. Potential redress obligations."
              prevention="Symmetry test mandatory: cancellation must be ≤ purchase complexity. Mystery shop regularly. Remove ALL barriers. If purchase is 1-click online, cancellation MUST be 1-click online."
            />

            <PitfallCard
              title="Pitfall 5: Poor Quality Annual Board Reports"
              description="Board reports repackage existing MI without Consumer Duty lens; lack vulnerable customer analysis; vague action plans without owners"
              impact="Board cannot fulfill oversight duty; regulatory criticism; potential SMF accountability issues"
              prevention="Follow FCA good practice guidance. Dedicated four outcomes sections. Specific vulnerable customer analysis. Detailed action plans with owners/dates. Evidence of Board challenge in minutes."
            />

            <PitfallCard
              title="Pitfall 6: No Evidence Trail for Attestations"
              description="SMFs attest compliance but cannot produce supporting evidence when challenged by regulator or auditor"
              impact="SMF personal accountability risk; potential prohibition; firm enforcement action"
              prevention="No attestation without robust evidence. Evidence repository must support every assertion. Mock examination to test retrieval. Clear audit trail for all decisions."
            />

            <PitfallCard
              title="Pitfall 7: Testing Too Infrequent"
              description="One-off testing at product launch, then years without re-testing despite market/customer changes"
              impact="Products drift out of compliance; communications become outdated; harm accumulates without detection"
              prevention="Risk-based testing frequency: High-risk quarterly, standard semi-annually, low-risk annually. Test after any material change. Annual minimum for all products."
            />

            <PitfallCard
              title="Pitfall 8: Testing Only Digital Channels"
              description="Firms test online journeys thoroughly but ignore phone, post, or in-person channels"
              impact="Customers using non-digital channels experience poor outcomes; accessibility failures; vulnerable customer harm"
              prevention="Test ALL channels customers actually use. Mystery shop phone and in-person. Ensure parity across channels. Segment results by channel."
            />

            <PitfallCard
              title="Pitfall 9: No Board Challenge"
              description="Board rubber-stamps management reports without probing questions or genuine challenge"
              impact="Governance failure; issues not surfaced; Board unable to fulfill duty; regulatory criticism of governance"
              prevention="Board training on Consumer Duty. Non-Executive challenge role. Specific challenging questions prepared. Time allocated for discussion. Document challenge in minutes."
            />

            <PitfallCard
              title="Pitfall 10: Internal Audit Not Independent"
              description="Internal Audit reviews first-line testing rather than conducting independent outcome testing; reports to Compliance not Audit Committee"
              impact="No genuine third line assurance; regulatory criticism; false comfort to Board"
              prevention="Clear three lines of defence. Internal Audit conducts own independent outcomes testing. Reports to Audit Committee, not Compliance. No conflicts of interest."
            />

            <PitfallCard
              title="Pitfall 11: Late Remediation"
              description="Firms identify issues through testing but take months to fix them, allowing ongoing customer harm"
              impact="Continued customer harm despite awareness; potential redress obligations; enforcement action; reputational damage"
              prevention="30-day maximum remediation for failed tests. Immediate action for high-harm issues. Track time-to-fix metric. Escalate delays to Board."
            />

            <PitfallCard
              title="Pitfall 12: Documentary Not Operational Testing"
              description="Firms test existence of policies/processes but not actual outcomes customers experience"
              impact="False assurance - processes exist on paper but don't work in practice; outcome testing gap"
              prevention="Outcome testing, not QC. Test what customers actually experience, not what documents say should happen. Mystery shop real journeys. Survey real customers."
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => navigate("/monitoring/testing-assurance-part1")}>
          Previous: CD-M2A Testing Framework
        </Button>
        <Button onClick={() => navigate("/monitoring/board-reporting")}>
          Next: CD-M3 Board Reporting
        </Button>
      </div>
    </div>
  );
}