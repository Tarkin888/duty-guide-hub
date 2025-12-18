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
  Layers,
  Calendar,
  BarChart3,
  Search,
  FileCheck,
  ArrowRight,
  Printer
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CDM2ATestingAssurancePart1() {
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
          <span>CD-M2A</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Testing & Assurance Programme - Part 1
            </h1>
            <p className="text-lg text-muted-foreground">
              Testing Framework Design & Methodology
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Badge variant="secondary" className="text-sm">
              Duration: 4-6 weeks
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
                Establish systematic testing and assurance mechanisms to validate that Consumer Duty 
                controls are designed effectively and operating as intended.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Foundation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Consumer Duty outcomes testing expectations combined with internal audit best practice
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>PRIN 2A</Badge>
                  <Badge>FG22/5</Badge>
                  <Badge>PS22/9</Badge>
                  <Badge variant="outline">Internal Audit Standards</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Programme Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Part of broader Monitoring & Assurance programme
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-sm">Links to CD-M1 (MI Framework)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-sm">Links to CD-M3 (Board Reporting)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Key Distinction: QC vs Outcome Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg border">
                  <h4 className="font-semibold mb-2">Quality Control (QC)</h4>
                  <p className="text-sm text-muted-foreground">
                    Confirms processes have been followed correctly
                  </p>
                  <p className="text-sm mt-2 italic">
                    "Did we follow the procedure?"
                  </p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-primary">
                  <h4 className="font-semibold mb-2 text-primary">Outcome Testing (OT)</h4>
                  <p className="text-sm text-muted-foreground">
                    Confirms customers achieved good outcomes
                  </p>
                  <p className="text-sm mt-2 italic">
                    "Did the customer get a good outcome?"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Deliverables - Part 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Testing methodology and approach document",
                  "Control inventory and mapping",
                  "Sampling strategy framework",
                  "Testing script library",
                  "Outcome testing protocols",
                  "Three lines of defence assurance model",
                  "Testing calendar and cycle planning"
                ].map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <span>{deliverable}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <RegulatoryQuote
            source="FCA Consumer Duty Expectations"
            quote="Firms must move beyond traditional QC to outcome testing that validates whether customers are actually experiencing good outcomes."
            reference="FG22/5"
          />

          <Card>
            <CardHeader>
              <CardTitle>Testing Scope</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Four Outcomes</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Products & Services</li>
                    <li>• Price & Value</li>
                    <li>• Consumer Understanding</li>
                    <li>• Consumer Support</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Cross-Cutting</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Vulnerable customers</li>
                    <li>• Distribution chain</li>
                    <li>• Differential outcomes</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Control Types</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Design effectiveness</li>
                    <li>• Operating effectiveness</li>
                    <li>• Outcome achievement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REGULATORY FOUNDATION TAB */}
        <TabsContent value="regulatory" className="space-y-6">
          <RegulatoryQuote
            source="FCA Guidance"
            quote="Quality checking confirms processes have been followed. Outcome testing confirms the product or service performed as customers reasonably expected."
            reference="FG22/5"
          />

          {/* QC vs OT Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>QC vs Outcome Testing Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Aspect</th>
                      <th className="text-left p-3 font-semibold">Traditional QC</th>
                      <th className="text-left p-3 font-semibold bg-primary/5">Outcome Testing (Consumer Duty)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Focus</td>
                      <td className="p-3 text-muted-foreground">Process adherence</td>
                      <td className="p-3 bg-primary/5">Customer outcomes achieved</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Question</td>
                      <td className="p-3 text-muted-foreground">"Did we follow the procedure?"</td>
                      <td className="p-3 bg-primary/5">"Did the customer get a good outcome?"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Measure</td>
                      <td className="p-3 text-muted-foreground">Checklist completion</td>
                      <td className="p-3 bg-primary/5">Outcome realisation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Example (Sales)</td>
                      <td className="p-3 text-muted-foreground">"Did adviser document needs?"</td>
                      <td className="p-3 bg-primary/5">"Did product meet customer's actual needs?"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Example (Claims)</td>
                      <td className="p-3 text-muted-foreground">"Was claim processed within SLA?"</td>
                      <td className="p-3 bg-primary/5">"Did customer receive fair settlement?"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Evidence</td>
                      <td className="p-3 text-muted-foreground">Process logs, tick sheets</td>
                      <td className="p-3 bg-primary/5">Customer experience data, outcome metrics</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Timing</td>
                      <td className="p-3 text-muted-foreground">During/immediately after process</td>
                      <td className="p-3 bg-primary/5">Post-outcome (weeks/months later)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Independence</td>
                      <td className="p-3 text-muted-foreground">Often first line (operational)</td>
                      <td className="p-3 bg-primary/5">Must be independent (second/third line)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Three Lines of Defence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Three Lines of Defence Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge>1st Line</Badge>
                    <span className="font-semibold">Business Operations</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Responsible for operational controls and immediate QC
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Day-to-day process compliance</li>
                    <li>• Immediate quality checking</li>
                    <li>• First-level MI reporting</li>
                    <li>• Issue identification and escalation</li>
                  </ul>
                  <p className="text-sm text-warning mt-3 font-medium">
                    NOT sufficient alone for outcome testing
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">2nd Line</Badge>
                    <span className="font-semibold">Compliance & Risk</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Oversight, policy compliance, risk management
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Control framework design</li>
                    <li>• Compliance monitoring and testing</li>
                    <li>• Risk assessment and MI</li>
                    <li>• Second-line outcome testing</li>
                    <li>• Regulatory liaison</li>
                  </ul>
                  <p className="text-sm text-primary mt-3 font-medium">
                    Independent validation of first line
                  </p>
                </div>
                <div className="p-4 border border-primary rounded-lg bg-primary/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-primary">3rd Line</Badge>
                    <span className="font-semibold">Internal Audit</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Independent assurance to Board/Audit Committee
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Comprehensive outcome testing programme</li>
                    <li>• Assurance over control effectiveness</li>
                    <li>• Challenge to first and second lines</li>
                    <li>• Deep-dive thematic reviews</li>
                    <li>• Board reporting on effectiveness</li>
                  </ul>
                  <p className="text-sm text-primary mt-3 font-medium">
                    Reports directly to Board/Audit Committee
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <RegulatoryQuote
            source="FCA Expectation"
            quote="Internal Audit should lead Consumer Duty outcome testing due to independence requirement."
            reference="FCA Multi-Firm Review"
          />

          {/* Control Testing vs Outcome Testing */}
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="control-testing" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Control Testing (Design & Operating Effectiveness)
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Design Effectiveness Testing</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Question: "Is the control, if performed properly, capable of preventing or detecting the risk?"
                    </p>
                    <ul className="text-sm space-y-1">
                      <li><strong>Approach:</strong> Document review, walkthrough, logic assessment</li>
                      <li><strong>Example:</strong> Review FVA methodology - does it consider all required factors?</li>
                      <li><strong>Timing:</strong> One-off or periodic (e.g., annual)</li>
                      <li><strong>Conducted by:</strong> Second line (Compliance/Risk)</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Operating Effectiveness Testing</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Question: "Is the control actually being performed consistently as designed?"
                    </p>
                    <ul className="text-sm space-y-1">
                      <li><strong>Approach:</strong> Sample testing, evidence review, compliance checks</li>
                      <li><strong>Example:</strong> Sample 30 FVAs - were all sections completed correctly?</li>
                      <li><strong>Timing:</strong> Regular (quarterly/annually depending on risk)</li>
                      <li><strong>Conducted by:</strong> Second line and third line</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="outcome-testing" className="border border-primary rounded-lg px-4 bg-primary/5">
              <AccordionTrigger className="text-lg font-semibold">
                Outcome Testing (Primary Focus)
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  <strong>Purpose:</strong> Validate whether customers actually achieved good outcomes
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      outcome: "Products & Services",
                      question: "Did customers who purchased Product X actually use its features and benefit as intended?"
                    },
                    {
                      outcome: "Price & Value",
                      question: "Did customers receive fair value relative to what they paid?"
                    },
                    {
                      outcome: "Consumer Understanding",
                      question: "Did customers understand the key terms when tested months after purchase?"
                    },
                    {
                      outcome: "Consumer Support",
                      question: "Were customers able to switch/exit/complain without unreasonable barriers?"
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-background border rounded-lg">
                      <h5 className="font-semibold text-primary">{item.outcome}</h5>
                      <p className="text-sm text-muted-foreground">{item.question}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-background border rounded-lg">
                  <p className="text-sm"><strong>Timing:</strong> Post-event (after outcome should have materialised)</p>
                  <p className="text-sm"><strong>Conducted by:</strong> Primarily third line (Internal Audit), supported by second line</p>
                  <p className="text-sm mt-2 font-medium text-primary">
                    Key difference: Control testing proves processes work; outcome testing proves customers benefited.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fca-expectations" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                FCA Expectations on Testing
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">A. Independence Requirement</h4>
                    <RegulatoryQuote
                      source="FCA"
                      quote="Outcome testing should be independent from the operational and compliance functions to provide objective assurance."
                      reference="FG22/5"
                    />
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Cannot be conducted by teams who designed/operate the controls</li>
                      <li>• Should be led by Internal Audit (third line)</li>
                      <li>• Results reported directly to Board/Audit Committee</li>
                      <li>• Free from operational bias or conflicts</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">B. Proportionality</h4>
                    <RegulatoryQuote
                      source="FCA"
                      quote="The nature and extent of testing should be proportionate to the scale, complexity and potential for harm."
                      reference="FG22/5"
                    />
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Higher risk products/services = more extensive testing</li>
                      <li>• Vulnerable customer segments = enhanced testing</li>
                      <li>• Simple, low-risk products = lighter-touch testing</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">C. Statistical Validity</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Sample sizes should be sufficient to provide reasonable confidence in findings."
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Cannot test just 5-10 cases and draw firm conclusions</li>
                      <li>• Use statistical sampling methodologies</li>
                      <li>• Consider confidence levels and error margins</li>
                      <li>• Document sampling rationale</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">D. Forward-Looking</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Testing should identify risks and issues before they cause widespread harm."
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Not just backward-looking compliance checking</li>
                      <li>• Identify trends and early warning signals</li>
                      <li>• Proactive issue identification</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">E. Comprehensive Coverage</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Testing must cover all four outcomes, not just one or two.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge>Products & Services</Badge>
                      <Badge>Price & Value</Badge>
                      <Badge>Consumer Understanding</Badge>
                      <Badge>Consumer Support</Badge>
                      <Badge variant="outline">Vulnerable Customers</Badge>
                      <Badge variant="outline">Distribution Chain</Badge>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="testing-types" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                Types of Testing Required by Outcome
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="ps-testing">
                    <AccordionTrigger>Products & Services Outcome Testing</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Target Market Alignment Testing</h5>
                        <p className="text-sm text-muted-foreground">Sample recent sales and verify customer characteristics match target market definition</p>
                        <p className="text-sm"><strong>Red flags:</strong> Sales to negative target market, pattern of unsuitable sales</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Product Performance Testing</h5>
                        <p className="text-sm text-muted-foreground">Track cohort of customers post-purchase. Did product deliver expected benefits?</p>
                        <p className="text-sm"><strong>Red flags:</strong> Low engagement, early cancellation, complaints about not working as expected</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Closed Book Testing</h5>
                        <p className="text-sm text-muted-foreground">Review outcomes for customers on closed products</p>
                        <p className="text-sm"><strong>Red flags:</strong> Poorer outcomes than open products, fee erosion, outdated features</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="pv-testing">
                    <AccordionTrigger>Price & Value Outcome Testing</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Fair Value Assessment Validation</h5>
                        <p className="text-sm text-muted-foreground">Independent review of FVAs. Is methodology sound? Are all factors considered?</p>
                        <p className="text-sm"><strong>Red flags:</strong> Over-reliance on benchmarking, no differential analysis</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Customer Value Realisation Testing</h5>
                        <p className="text-sm text-muted-foreground">Survey customers months after purchase on value perception</p>
                        <p className="text-sm"><strong>Red flags:</strong> Low satisfaction, value-for-money complaints, high churn</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Differential Outcomes Testing</h5>
                        <p className="text-sm text-muted-foreground">Segment analysis of value metrics. Are certain segments getting poorer value?</p>
                        <p className="text-sm"><strong>Red flags:</strong> Vulnerable customers paying more, back-book on worse terms</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cu-testing">
                    <AccordionTrigger>Consumer Understanding Outcome Testing</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Comprehension Testing</h5>
                        <p className="text-sm text-muted-foreground">Test customer understanding post-purchase. Do they understand key features, costs, risks?</p>
                        <p className="text-sm"><strong>Red flags:</strong> Low comprehension scores, misunderstandings causing harm</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Behavioural Testing</h5>
                        <p className="text-sm text-muted-foreground">Observe customer behaviour. Are they acting as if they understood?</p>
                        <p className="text-sm"><strong>Red flags:</strong> Customers not using features they should, missing beneficial options</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Marketing Effectiveness Testing</h5>
                        <p className="text-sm text-muted-foreground">Are customers interpreting messages as intended?</p>
                        <p className="text-sm"><strong>Red flags:</strong> Complaints about being misled, unsuitable sales post-campaign</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cs-testing">
                    <AccordionTrigger>Consumer Support Outcome Testing</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Support Quality Testing</h5>
                        <p className="text-sm text-muted-foreground">Mystery shopping, call monitoring, case file review</p>
                        <p className="text-sm"><strong>Red flags:</strong> Long wait times, unresolved queries, poor quality interactions</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Sludge Audit Testing</h5>
                        <p className="text-sm text-muted-foreground">Process walkthrough for cancellation, switching, complaint, claim processes</p>
                        <p className="text-sm"><strong>Red flags:</strong> Difficult cancellation, excessive steps, asymmetry with purchase</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-semibold">Vulnerable Customer Support Testing</h5>
                        <p className="text-sm text-muted-foreground">Test whether vulnerable customers receive appropriate adjustments</p>
                        <p className="text-sm"><strong>Red flags:</strong> No adjustments despite flag, poorer outcomes for vulnerable</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mfr-findings" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">
                FCA Multi-Firm Review Findings on Testing
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-success rounded-lg">
                    <h4 className="font-semibold text-success mb-3">Good Practice Identified</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Independent outcome testing programme led by Internal Audit",
                        "Statistically valid sampling with documented methodology",
                        "Testing covering all four outcomes systematically",
                        "Findings fed directly into remediation and Board reporting",
                        "Root cause analysis linking testing findings to systemic issues",
                        "Outcome testing separate from QC processes"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 border border-destructive rounded-lg">
                    <h4 className="font-semibold text-destructive mb-3">Areas for Improvement</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Testing limited to QC - no genuine outcome testing",
                        "Outcome testing conducted by first line (lack of independence)",
                        "Sample sizes too small to be meaningful (e.g., 10 cases)",
                        "Testing focused on one outcome only",
                        "No testing of vulnerable customer outcomes",
                        "Findings not escalated or actioned",
                        "Testing backward-looking only, not identifying emerging risks"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        {/* IMPLEMENTATION STEPS TAB */}
        <TabsContent value="implementation" className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Phase 1: Testing Framework Design (Weeks 1-2)</CardTitle>
              <CardDescription>
                Establish governance, methodology, and testing infrastructure
              </CardDescription>
            </CardHeader>
          </Card>

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={1}
            title="Establish Testing Governance"
            items={[
              { id: "m2a-1-1", label: "Define testing scope: All four outcomes + vulnerable customers + distribution chain" },
              { id: "m2a-1-2", label: "Clarify roles: First line (operational QC), Second line (control testing), Third line (outcome testing)" },
              { id: "m2a-1-3", label: "Establish reporting lines: Third line reports to Board/Audit Committee" },
              { id: "m2a-1-4", label: "Define independence standards: No testing of own work, conflict-free" },
              { id: "m2a-1-5", label: "Set up Testing Oversight Committee (or integrate with Audit Committee)" },
              { id: "m2a-1-6", label: "Document governance principles: Independence, proportionality, comprehensiveness, statistical rigour, actionability, Board visibility" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={2}
            title="Create Control Inventory"
            items={[
              { id: "m2a-2-1", label: "List all Consumer Duty controls by outcome (Products & Services, Price & Value, Consumer Understanding, Consumer Support)" },
              { id: "m2a-2-2", label: "Include vulnerable customer and distribution chain controls" },
              { id: "m2a-2-3", label: "Document for each control: description, owner, type (preventive/detective/corrective), frequency, evidence" },
              { id: "m2a-2-4", label: "Map controls to risks and regulatory requirements" },
              { id: "m2a-2-5", label: "Assign risk ratings (high/medium/low) to each control" },
              { id: "m2a-2-6", label: "Categorize controls: Preventive (stop harm), Detective (identify harm), Corrective (fix harm)" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={3}
            title="Develop Testing Methodology"
            items={[
              { id: "m2a-3-1", label: "Define testing approach for each outcome: design effectiveness, operating effectiveness, outcome testing" },
              { id: "m2a-3-2", label: "Establish sampling methodology: statistical sampling, sample size determination, confidence levels" },
              { id: "m2a-3-3", label: "Create testing standards: evidence requirements, procedures, findings documentation" },
              { id: "m2a-3-4", label: "Define rating scales: Effective, Needs Improvement, Ineffective" },
              { id: "m2a-3-5", label: "Define testing cycles: High risk (quarterly), Medium risk (annual), Low risk (biennial)" },
              { id: "m2a-3-6", label: "Document minimum sample sizes: Low risk 30-50, Medium risk 50-100, High risk 100+" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={4}
            title="Build Testing Script Library"
            items={[
              { id: "m2a-4-1", label: "Create Products & Services testing scripts (target market alignment, product performance, closed book)" },
              { id: "m2a-4-2", label: "Create Price & Value testing scripts (FVA validation, value realisation, differential outcomes)" },
              { id: "m2a-4-3", label: "Create Consumer Understanding testing scripts (comprehension, behavioural, marketing effectiveness)" },
              { id: "m2a-4-4", label: "Create Consumer Support testing scripts (support quality, sludge audit, vulnerable customer support)" },
              { id: "m2a-4-5", label: "Define pass criteria and finding ratings for each script" },
              { id: "m2a-4-6", label: "Include evidence requirements and red flags for each test" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={5}
            title="Establish Testing Calendar"
            items={[
              { id: "m2a-5-1", label: "Create annual testing cycle showing which controls tested when" },
              { id: "m2a-5-2", label: "Define sample sizes and resources for each test" },
              { id: "m2a-5-3", label: "Balance workload across year" },
              { id: "m2a-5-4", label: "Align with Board reporting cycle (outcomes available for Board packs)" },
              { id: "m2a-5-5", label: "Build in contingency for ad-hoc testing" },
              { id: "m2a-5-6", label: "Schedule coordinated testing with second line" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={6}
            title="Define Sample Selection Approach"
            items={[
              { id: "m2a-6-1", label: "Establish sampling principles: Risk-based, representative, statistically valid" },
              { id: "m2a-6-2", label: "Document methodologies: Stratified random, judgmental, cohort analysis" },
              { id: "m2a-6-3", label: "Create sampling templates: population definition, stratification, size calculation, selection method" },
              { id: "m2a-6-4", label: "Define confidence levels (typically 90-95%) and margin of error (typically 5-10%)" },
              { id: "m2a-6-5", label: "Ensure samples represent customer mix, products, channels" },
              { id: "m2a-6-6", label: "Document all sampling decisions for audit trail" }
            ]}
          />

          <Card className="bg-secondary/50 border-secondary">
            <CardHeader>
              <CardTitle>Phase 2: Testing Execution (Ongoing Cycles)</CardTitle>
              <CardDescription>
                Conduct control and outcome testing according to established methodology
              </CardDescription>
            </CardHeader>
          </Card>

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={7}
            title="Conduct Control Design Testing"
            items={[
              { id: "m2a-7-1", label: "For each control, assess: Is it appropriately designed to mitigate the risk?" },
              { id: "m2a-7-2", label: "Review: Are responsibilities clearly assigned? Is frequency appropriate?" },
              { id: "m2a-7-3", label: "Assess: Is evidence generated adequate? Are there design gaps?" },
              { id: "m2a-7-4", label: "Document design assessment: strengths, weaknesses, overall rating" },
              { id: "m2a-7-5", label: "Provide recommendations for design improvements" },
              { id: "m2a-7-6", label: "Report design findings to control owners and governance committee" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={8}
            title="Conduct Operating Effectiveness Testing"
            items={[
              { id: "m2a-8-1", label: "Select sample per methodology for each control" },
              { id: "m2a-8-2", label: "Gather evidence that control operated as designed" },
              { id: "m2a-8-3", label: "Identify exceptions or failures" },
              { id: "m2a-8-4", label: "Investigate root cause of any failures" },
              { id: "m2a-8-5", label: "Rate: Effective (>95%), Partially effective (85-95%), Ineffective (<85%)" },
              { id: "m2a-8-6", label: "Document findings with evidence, root cause, and recommendations" }
            ]}
          />

          <ChecklistSection
            moduleId="cd-m2a"
            stepNumber={9}
            title="Conduct Outcome Testing (Primary Focus)"
            items={[
              { id: "m2a-9-1", label: "Products & Services: Sample cohorts, analyze usage, compare actual vs expected benefits" },
              { id: "m2a-9-2", label: "Price & Value: Validate FVAs independently, survey value perception, analyze differential outcomes" },
              { id: "m2a-9-3", label: "Consumer Understanding: Test comprehension post-purchase, analyze behaviour, review complaints" },
              { id: "m2a-9-4", label: "Consumer Support: Mystery shop channels, audit key processes, test for barriers" },
              { id: "m2a-9-5", label: "Rate outcomes: Good (>85%), Needs improvement (70-85%), Poor (<70%)" },
              { id: "m2a-9-6", label: "Conduct root cause analysis for all poor outcomes" }
            ]}
          />

          <Card className="border-info bg-info/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-info" />
                Sample Size Calculator Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Use statistical sampling for meaningful conclusions:
                </p>
                <div className="p-4 bg-background rounded-lg border font-mono text-sm">
                  <p>n = (Z² × p × (1-p)) / E²</p>
                  <p className="text-muted-foreground mt-2">Where:</p>
                  <ul className="text-muted-foreground ml-4">
                    <li>Z = Z-score (1.96 for 95% confidence)</li>
                    <li>p = estimated proportion (0.5 if unknown)</li>
                    <li>E = margin of error (0.05 for 5%)</li>
                  </ul>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-3 border rounded-lg text-center">
                    <p className="font-semibold">Low Risk</p>
                    <p className="text-2xl font-bold text-primary">30-50</p>
                    <p className="text-muted-foreground">items</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <p className="font-semibold">Medium Risk</p>
                    <p className="text-2xl font-bold text-warning">50-100</p>
                    <p className="text-muted-foreground">items</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <p className="font-semibold">High Risk</p>
                    <p className="text-2xl font-bold text-destructive">100+</p>
                    <p className="text-muted-foreground">items</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TEMPLATES TAB */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateCard
              title="Testing Governance Framework Document"
              description="Comprehensive governance document covering purpose, scope, roles, independence standards, testing principles, and annual cycle"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Consumer Duty Control Inventory"
              description="Excel workbook with tabs for each outcome, control details, risk ratings, and control risk map visualization"
              format="Excel"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Testing Methodology Document"
              description="Detailed methodology covering sampling approach, testing procedures, rating scales, and reporting standards"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Testing Script Library"
              description="Complete library of testing scripts for all four outcomes with pass criteria and evidence requirements"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Annual Testing Calendar"
              description="Calendar template showing testing cycles, resource allocation, and alignment with Board reporting"
              format="Excel"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Sampling Strategy Framework"
              description="Framework for sample selection including statistical methodology, size calculations, and documentation requirements"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Control Design Testing Template"
              description="Template for documenting control design effectiveness assessments with rating scales and recommendations"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Operating Effectiveness Testing Template"
              description="Template for sample testing with evidence requirements, exception tracking, and root cause analysis"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Outcome Testing Report Template"
              description="Template for documenting outcome testing findings with quantitative and qualitative analysis"
              format="Word"
              onPreview={() => {}}
            />
            <TemplateCard
              title="Three Lines of Defence Model"
              description="Visual diagram and documentation of 3LOD roles and responsibilities for Consumer Duty testing"
              format="PowerPoint"
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
                  <FileCheck className="h-5 w-5 text-primary" />
                  Framework Establishment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Testing governance framework documented and Board-approved",
                    "Three lines of defence roles clearly defined with independence protocols",
                    "Complete control inventory created for all four outcomes",
                    "Testing methodology documented with statistical rigor",
                    "Annual testing calendar established with resource allocation"
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
                  <Target className="h-5 w-5 text-primary" />
                  Testing Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "All four outcomes tested at least annually",
                    "High-risk controls tested quarterly or semi-annually",
                    "Vulnerable customer outcomes tested specifically",
                    "Distribution chain tested comprehensively",
                    "Both control testing AND outcome testing conducted"
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
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Quality Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Statistically valid sample sizes used (confidence levels documented)",
                    "Independent outcome testing led by third line (Internal Audit)",
                    "Testing scripts standardized and comprehensive",
                    "Findings supported by robust evidence",
                    "Root cause analysis conducted for all issues"
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
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Reporting & Action
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Testing findings reported to Board/Audit Committee quarterly",
                    "Management responses documented for all findings",
                    "Remediation tracked to closure",
                    "Repeat findings escalated",
                    "Testing insights feed continuous improvement"
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
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Weeks 1-2</p>
                  <p className="font-semibold">Framework design & governance</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Weeks 3-4</p>
                  <p className="font-semibold">Control inventory & methodology</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Weeks 5-6</p>
                  <p className="font-semibold">Testing scripts & calendar</p>
                </div>
                <div className="p-4 border rounded-lg text-center bg-primary/5">
                  <p className="text-sm text-muted-foreground">Week 6+</p>
                  <p className="font-semibold">Commence testing cycles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metrics to Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { metric: "Planned testing completed", target: ">95%" },
                  { metric: "Controls rated effective", target: ">90%" },
                  { metric: "Avg. time to remediate findings", target: "<60 days" },
                  { metric: "Testing findings reported to Board", target: "100%" },
                  { metric: "Four outcomes coverage", target: "All annually" },
                  { metric: "Critical issues unresolved >2 weeks", target: "0" }
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
              title="Pitfall 1: QC Instead of Outcome Testing"
              description="Firms conducting quality checking but calling it outcome testing - checking process adherence rather than actual customer outcomes"
              impact="Not actually validating customer outcomes, just process compliance. Cannot evidence good outcomes to FCA."
              prevention="Distinguish QC (process adherence) from OT (outcome achievement). Conduct both. QC asks 'Did we follow the procedure?' OT asks 'Did the customer benefit?'"
            />

            <PitfallCard
              title="Pitfall 2: Lack of Independence"
              description="First line (business operations) conducting outcome testing on their own processes"
              impact="Cannot provide objective assurance; risk of bias. Undermines value of testing to Board and regulator."
              prevention="Third line (Internal Audit) must lead outcome testing. Second line for some control testing only. No testing of own work."
            />

            <PitfallCard
              title="Pitfall 3: Inadequate Sample Sizes"
              description="Testing 10 cases and drawing firm conclusions about entire population"
              impact="Findings not statistically meaningful; false confidence. Cannot support regulatory evidence requirements."
              prevention="Use proper statistical sampling. Document sample size rationale. Minimum 30-50 for low risk, 100+ for high risk."
            />

            <PitfallCard
              title="Pitfall 4: Testing Only One Outcome"
              description="Firms focusing testing only on Products & Services, ignoring other outcomes"
              impact="Incomplete assurance; other outcomes may be failing. Cannot demonstrate comprehensive Consumer Duty compliance."
              prevention="Annual testing calendar must cover ALL four outcomes plus vulnerable customers. No gaps in coverage."
            />

            <PitfallCard
              title="Pitfall 5: No Outcome Testing, Only Control Testing"
              description="Testing controls but not testing whether customers actually got good outcomes"
              impact="Can prove controls work but not that customers benefited. Misses the point of Consumer Duty."
              prevention="Conduct BOTH control testing (do controls work?) AND outcome testing (did customers benefit?)"
            />

            <PitfallCard
              title="Pitfall 6: Findings Not Actioned"
              description="Testing identifies issues but no remediation or follow-up occurs"
              impact="Testing becomes box-ticking exercise with no value. Issues persist and may cause customer harm."
              prevention="Management responses mandatory for all findings. Track remediation to closure. Escalate repeat findings."
            />

            <PitfallCard
              title="Pitfall 7: Backward-Looking Only"
              description="Testing only looks at past compliance, not forward-looking risks"
              impact="Misses emerging issues; reactive not proactive. Fails to prevent future harm."
              prevention="Include forward-looking elements: trend analysis, early warning indicators, scenario testing."
            />

            <PitfallCard
              title="Pitfall 8: No Vulnerable Customer Focus"
              description="Testing doesn't segment results to identify vulnerable customer outcomes separately"
              impact="Cannot identify if vulnerable customers experiencing poorer outcomes. Regulatory breach risk."
              prevention="All outcome testing must include vulnerable vs non-vulnerable comparison. Track variance."
            />

            <PitfallCard
              title="Pitfall 9: Testing Not Reported to Board"
              description="Testing conducted but findings not escalated to Board/Audit Committee"
              impact="Board lacks assurance; cannot fulfill oversight responsibility. Governance failure."
              prevention="Mandatory quarterly reporting of testing findings to Board/Audit Committee."
            />

            <PitfallCard
              title="Pitfall 10: Generic Testing Scripts"
              description="Using generic audit scripts not tailored to Consumer Duty outcomes"
              impact="Testing doesn't validate the right things. Misses outcome-specific requirements."
              prevention="Develop specific Consumer Duty testing scripts for each outcome. Focus on outcome achievement, not just process."
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => navigate("/modules/cd-m1-mi-framework")}>
          Previous: CD-M1 MI Framework
        </Button>
        <Button onClick={() => navigate("/modules/cd-m2b-testing-assurance-part2")}>
          Next: CD-M2B Testing Execution
        </Button>
      </div>
    </div>
  );
}