import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileCheck, Scale, AlertTriangle, BookOpen, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";

export default function CDRiskAssessment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">CD-F3: Risk & Impact Assessment</h1>
                  <p className="text-muted-foreground">Foundation Module</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">
                  <FileCheck className="h-3 w-3 mr-1" />
                  Foundation Phase
                </Badge>
                <Badge variant="outline">4-6 weeks</Badge>
                <Badge variant="outline">Cross-Cutting</Badge>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-primary" />
                  <span><strong>Duration:</strong> 4-6 weeks initial, ongoing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Scale className="h-4 w-4 text-primary" />
                  <span><strong>Owner:</strong> CRO / Head of Risk</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  <span><strong>Priority:</strong> Critical - All Outcomes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
            <TabsTrigger value="implementation">Implementation Steps</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Module Purpose</h2>
              <p className="text-lg leading-relaxed">
                Identify, assess, and quantify consumer harm risks across the four Consumer Duty outcomes, 
                enabling prioritised remediation and informed resource allocation. This assessment establishes 
                the foundation for risk-based implementation and provides evidence for board-level decision-making.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Regulatory Foundation</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Consumer Duty cross-cutting rule: Avoid causing foreseeable harm</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>PRIN 2A requirements across all four outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>FCA guidance on risk assessment and materiality (FG22/5)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Integration with existing Enterprise Risk Management frameworks</span>
                </li>
              </ul>
            </Card>

            <Alert className="border-primary/50 bg-primary/5">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <AlertTitle className="text-lg">Critical Principle</AlertTitle>
              <AlertDescription className="text-base mt-2">
                Risk assessment must be outcomes-focused, not process-focused. The question is not 
                "Are we following our processes?" but "What harm could our customers experience?"
              </AlertDescription>
            </Alert>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Key Deliverables</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Consumer Duty Risk Register (comprehensive risk catalogue)",
                  "Impact Assessment Matrix (likelihood × severity scoring)",
                  "Risk Appetite Statement for consumer outcomes",
                  "Foreseeable Harm Scenario Library",
                  "Key Risk Indicators (KRI) framework",
                  "Risk Mitigation Strategy for priority risks",
                  "Board-level Risk Summary Report",
                  "Remediation Priority Matrix"
                ].map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                    <FileCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{deliverable}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Stakeholders</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-primary">Primary</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Risk function</li>
                    <li>• Compliance</li>
                    <li>• Business unit heads</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-primary">Secondary</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Internal Audit</li>
                    <li>• Legal</li>
                    <li>• Executive Committee</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-primary">Governance</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Board Risk Committee</li>
                    <li>• Consumer Duty Oversight Committee</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-primary">Input</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Product teams</li>
                    <li>• Customer service</li>
                    <li>• Data analytics</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/5 border-accent">
              <h2 className="text-2xl font-bold mb-4">Why This Matters</h2>
              <p className="mb-4">
                The FCA expects firms to proactively identify where customers could be harmed and take 
                reasonable steps to prevent it. This is a proactive obligation - waiting for harm to occur 
                is non-compliant. A robust risk assessment:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Demonstrates to the Board where consumer harm risks lie</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Enables resource allocation to highest-risk areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Creates the evidence trail for "reasonable grounds" defence</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Supports proportionate implementation (focus on material risks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Prevents regulatory enforcement by identifying issues early</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Link to Other Modules</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Badge variant="outline">Feeds from</Badge>
                  <span className="text-sm">CD-F1 (Current state assessment), CD-F2 (Requirements mapping)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline">Feeds into</Badge>
                  <span className="text-sm">CD-P4 (Implementation roadmap), CD-I1-I4 (Four outcomes), CD-M1 (MI framework)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline">Parallel with</Badge>
                  <span className="text-sm">CD-F2 (Gap analysis identifies risks)</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="foreseeable-harm" className="border rounded-lg px-6">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  1. The Cross-Cutting Rule: Avoid Foreseeable Harm
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <RegulatoryQuote
                    source="FCA"
                    reference="PRIN 2A.2.1(2)"
                    quote="A firm must not, through its actions or omissions, cause foreseeable harm to retail customers."
                  />

                  <div>
                    <h4 className="font-semibold mb-2">Plain English Explanation:</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Firms must identify potential harms customers could experience and take reasonable steps to prevent them. This applies to:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• <strong>Actions:</strong> Things the firm does that could harm customers</li>
                      <li>• <strong>Omissions:</strong> Things the firm fails to do that could harm customers</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">What Constitutes "Foreseeable Harm"?</h4>
                    <p className="text-sm mb-3">
                      <strong>FCA Guidance (FG22/5):</strong> "Harm that a prudent firm ought to be able to predict or anticipate 
                      at the time, based on information reasonably available."
                    </p>
                    <p className="text-sm font-semibold mb-2">This includes:</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Financial detriment:</strong> Direct financial loss, reduced value, missed opportunities</li>
                      <li>• <strong>Material distress:</strong> Significant stress, anxiety, mental health impacts</li>
                      <li>• <strong>Material inconvenience:</strong> Barriers preventing customers accessing products/services</li>
                      <li>• <strong>Indirect harms:</strong> Knock-on effects (e.g., payment holidays leading to credit score damage)</li>
                    </ul>
                  </div>

                  <Alert className="border-primary/50 bg-primary/5">
                    <Scale className="h-5 w-5 text-primary" />
                    <AlertTitle>Critical Concept: The "Reasonable Grounds" Test</AlertTitle>
                    <AlertDescription className="mt-2 space-y-2">
                      <p>FCA assesses foreseeability based on information available at the time of the decision, not with hindsight. Firms must:</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Document what they knew when making decisions</li>
                        <li>• Show they considered potential harms based on that knowledge</li>
                        <li>• Demonstrate reasonable steps taken to mitigate identified risks</li>
                        <li>• Maintain contemporaneous records of decision-making</li>
                      </ul>
                      <p className="text-sm font-semibold mt-2">
                        This means firms need robust risk assessment processes that create an audit trail.
                      </p>
                    </AlertDescription>
                  </Alert>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="materiality" className="border rounded-lg px-6">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  2. Materiality and Proportionality
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-2">FCA Expectation:</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Risk assessment should be proportionate to:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Nature and scale of the firm's activities</li>
                      <li>• Size and complexity of customer base</li>
                      <li>• Potential severity of harm</li>
                      <li>• Likelihood of harm occurring</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">What "Material" Means:</h4>
                    <p className="text-sm text-muted-foreground mb-2">Material risks are those that could:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Cause significant consumer harm (financial or distress)</li>
                      <li>• Affect a large number of customers</li>
                      <li>• Undermine the four outcomes</li>
                      <li>• Lead to regulatory enforcement</li>
                      <li>• Damage firm reputation significantly</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 border-accent">
                      <h4 className="font-semibold mb-3 text-accent">Small Firms</h4>
                      <ul className="text-sm space-y-2">
                        <li>• Simplified risk register (20-30 key risks)</li>
                        <li>• Basic impact scoring (High/Medium/Low)</li>
                        <li>• Focus on most obvious harm scenarios</li>
                        <li>• Less complex documentation</li>
                      </ul>
                    </Card>

                    <Card className="p-4 border-primary">
                      <h4 className="font-semibold mb-3 text-primary">Large Firms</h4>
                      <ul className="text-sm space-y-2">
                        <li>• Comprehensive risk register (50-100+ risks)</li>
                        <li>• Sophisticated scoring (5×5 matrix with quantification)</li>
                        <li>• Detailed scenario analysis and stress testing</li>
                        <li>• Extensive documentation and evidence</li>
                      </ul>
                    </Card>
                  </div>

                  <Alert className="border-warning/50 bg-warning/5">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <AlertTitle>Critical: Proportionality does NOT mean:</AlertTitle>
                    <AlertDescription className="mt-2">
                      <ul className="text-sm space-y-1">
                        <li>• Small firms can ignore certain risks</li>
                        <li>• Less rigorous assessment for smaller populations</li>
                        <li>• Lower standards for customer outcomes</li>
                        <li>• Reduced accountability for foreseeable harms</li>
                      </ul>
                      <p className="text-sm font-semibold mt-3">
                        It means the method and evidence detail scales with firm size, NOT the obligation to deliver good outcomes.
                      </p>
                    </AlertDescription>
                  </Alert>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="four-outcomes" className="border rounded-lg px-6">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  3. Risk Assessment Across the Four Outcomes
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <p className="text-sm text-muted-foreground">
                    For each outcome, firms must assess specific harm risks:
                  </p>

                  {/* Products & Services */}
                  <Card className="p-4 border-primary/30">
                    <h4 className="font-semibold text-lg mb-3 text-primary">Products & Services Outcome Risks</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-sm">Target Market Mis-Definition</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Product sold to customers for whom it's unsuitable<br />
                          <strong>Harm:</strong> Financial loss, product doesn't meet needs, mis-selling<br />
                          <strong>Example:</strong> Complex investment product sold to customers with low risk tolerance
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Product Design Flaws</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Product features that don't meet customer needs or cause harm<br />
                          <strong>Harm:</strong> Cannot realize benefits, unexpected costs, poor value<br />
                          <strong>Example:</strong> Savings product with high exit fees preventing access to funds
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Distribution Strategy Failures</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Product reaches wrong customers through inappropriate channels<br />
                          <strong>Harm:</strong> Unsuitable sales, poor advice, lack of support<br />
                          <strong>Example:</strong> Execution-only sale of product needing advice
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Closed Product Neglect</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Legacy products no longer provide fair value but not reviewed<br />
                          <strong>Harm:</strong> Long-standing customers trapped in poor-value products<br />
                          <strong>Example:</strong> Old insurance policies with outdated coverage and high fees
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Price & Value */}
                  <Card className="p-4 border-accent/30">
                    <h4 className="font-semibold text-lg mb-3 text-accent">Price & Value Outcome Risks</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-sm">Unfair Pricing</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Price doesn't reflect reasonable value for benefits<br />
                          <strong>Harm:</strong> Customers overpay, poor outcomes vs alternatives<br />
                          <strong>Example:</strong> Loyalty penalty (existing customers pay more than new)
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Hidden or Complex Charging</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Customers don't understand true cost<br />
                          <strong>Harm:</strong> Financial detriment, can't make informed decisions<br />
                          <strong>Example:</strong> Multiple overlapping fees reducing investment returns
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Differential Outcomes</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Some customer groups receive worse value<br />
                          <strong>Harm:</strong> Cross-subsidization, vulnerable customers disadvantaged<br />
                          <strong>Example:</strong> Digital-only product cheaper but excludes those needing phone support
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Poor Benchmarking</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Assuming market prices means fair value<br />
                          <strong>Harm:</strong> Industry-wide overcharging not challenged<br />
                          <strong>Example:</strong> "Everyone charges this much" justification without value analysis
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Consumer Understanding */}
                  <Card className="p-4 border-secondary/30">
                    <h4 className="font-semibold text-lg mb-3 text-secondary">Consumer Understanding Outcome Risks</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-sm">Complex Communications</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Customers don't understand what they're buying<br />
                          <strong>Harm:</strong> Uninformed decisions, unexpected outcomes, complaints<br />
                          <strong>Example:</strong> Financial jargon in key documents reducing comprehension
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Misleading Promotions</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Marketing overemphasizes benefits, downplays risks<br />
                          <strong>Harm:</strong> Unrealistic expectations, disappointment, poor decisions<br />
                          <strong>Example:</strong> Highlighting potential returns without clear risk warnings
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Testing Failures</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Firms don't test whether customers understand<br />
                          <strong>Harm:</strong> Communications ineffective but firm doesn't know<br />
                          <strong>Example:</strong> Assuming documents are clear without validation
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Digital Exclusion</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Information only available digitally<br />
                          <strong>Harm:</strong> Low digital capability customers excluded<br />
                          <strong>Example:</strong> Terms only accessible via app, no paper alternative
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Consumer Support */}
                  <Card className="p-4 border-muted">
                    <h4 className="font-semibold text-lg mb-3">Consumer Support Outcome Risks</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-sm">Sludge Practices</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Unreasonable barriers to switching, claiming, complaining<br />
                          <strong>Harm:</strong> Customers trapped, can't access benefits, frustration<br />
                          <strong>Example:</strong> 30-minute phone wait to cancel vs 1-click to purchase
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Poor Service Standards</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Insufficient resources, long wait times, poor quality<br />
                          <strong>Harm:</strong> Cannot get help when needed, complaints unresolved<br />
                          <strong>Example:</strong> Understaffed call centre leading to call abandonment
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Third-Party Access Barriers</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Power of Attorney holders can't manage accounts<br />
                          <strong>Harm:</strong> Vulnerable customers can't get necessary support<br />
                          <strong>Example:</strong> PoA holder required to attend branch in person for simple changes
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Vulnerable Customer Support Gaps</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Risk:</strong> Support not adapted for vulnerability characteristics<br />
                          <strong>Harm:</strong> Vulnerable customers receive worse outcomes<br />
                          <strong>Example:</strong> No alternative to online chat for those with hearing impairment
                        </p>
                      </div>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="erm" className="border rounded-lg px-6">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  4. Enterprise Risk Management Integration
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>FCA Expectation:</strong> Consumer Duty risks must be integrated into the firm's existing 
                    Enterprise Risk Management (ERM) framework, not treated as separate compliance risks.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Integration Requirements:</h4>
                      <div className="space-y-3">
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-1">Risk Taxonomy</p>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• Consumer harm risk as a distinct risk category</li>
                            <li>• Sub-categories for each outcome</li>
                            <li>• Links to operational, conduct, and reputational risks</li>
                          </ul>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-1">Risk Appetite Framework</p>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• Define acceptable levels of consumer harm risk</li>
                            <li>• Set quantitative thresholds (e.g., complaint rates, FOS uphold rates)</li>
                            <li>• Establish qualitative standards (e.g., no sludge practices)</li>
                            <li>• Board approval of risk appetite statement</li>
                          </ul>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-1">Three Lines of Defence</p>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• <strong>First Line:</strong> Business units own and manage risks</li>
                            <li>• <strong>Second Line:</strong> Risk and Compliance provide oversight and challenge</li>
                            <li>• <strong>Third Line:</strong> Internal Audit provides independent assurance</li>
                          </ul>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-1">Risk Reporting</p>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• Consumer harm risks in regular risk committee reports</li>
                            <li>• Escalation to Board Risk Committee for material risks</li>
                            <li>• Integration with stress testing and scenario analysis</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-primary/50 bg-primary/5">
                      <Scale className="h-5 w-5 text-primary" />
                      <AlertTitle>Risk Appetite Statement Example:</AlertTitle>
                      <AlertDescription className="mt-2 text-sm">
                        <p className="italic mb-3">
                          "The firm has zero tolerance for foreseeable harm arising from poor product design, unfair pricing, 
                          or systematic failures in support. We accept that some customers may experience poor outcomes due to 
                          their own decisions or external factors beyond our control, but we will take all reasonable steps to 
                          prevent harm within our sphere of influence.
                        </p>
                        <p className="font-semibold mb-2">Our risk appetite thresholds include:</p>
                        <ul className="space-y-1">
                          <li>• Complaint rate &lt;2% of customer base annually</li>
                          <li>• FOS uphold rate &lt;40% (below industry average)</li>
                          <li>• Fair Value Assessment: &gt;95% of products rated 'Green' for fair value</li>
                          <li>• Consumer Understanding: &gt;85% comprehension in testing</li>
                          <li>• Vulnerable customer outcomes: No negative variance &gt;5% vs general population"</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fca-findings" className="border rounded-lg px-6">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  5. FCA Multi-Firm Review Findings on Risk Assessment
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 border-primary bg-primary/5">
                      <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
                        <FileCheck className="h-4 w-4" />
                        Good Practice (November 2025)
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span><strong>Comprehensive risk registers:</strong> "Firms with detailed risk registers covering all four outcomes and customer segments"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span><strong>Quantified impact assessments:</strong> "Using data to estimate financial impact of potential harms on customer groups"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span><strong>Scenario analysis:</strong> "Testing 'what if' scenarios (e.g., What if interest rates rise 2%?)"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span><strong>Board engagement:</strong> "Risk assessments presented to Board with clear implications and remediation plans"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span><strong>Dynamic monitoring:</strong> "Risk registers updated based on MI, complaints, and external events - not static annual reviews"</span>
                        </li>
                      </ul>
                    </Card>

                    <Card className="p-4 border-warning bg-warning/5">
                      <h4 className="font-semibold mb-3 text-warning flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-warning mt-1">✗</span>
                          <span><strong>Generic risk descriptions:</strong> "Risks described as 'reputational damage' without specifics on harm to customers"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-warning mt-1">✗</span>
                          <span><strong>No differentiation by segment:</strong> "Single risk assessment for all customers, not considering vulnerable groups"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-warning mt-1">✗</span>
                          <span><strong>Backward-looking only:</strong> "Risk assessment based on past complaints, not forward-looking harm scenarios"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-warning mt-1">✗</span>
                          <span><strong>Inadequate mitigation:</strong> "Risks identified but no clear action plan or accountable owner"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-warning mt-1">✗</span>
                          <span><strong>Disconnect from implementation:</strong> "Risk assessment completed but not used to prioritize remediation"</span>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="scenarios" className="border rounded-lg px-6">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  6. Foreseeable Harm: Real-World Scenarios
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    To make "foreseeable harm" concrete, here are examples from FCA enforcement and supervisory work:
                  </p>

                  <Accordion type="single" collapsible className="space-y-3">
                    <AccordionItem value="scenario1" className="border rounded-lg px-4 bg-muted/20">
                      <AccordionTrigger className="hover:no-underline">
                        <div>
                          <p className="font-semibold">Scenario 1: Loyalty Penalty</p>
                          <p className="text-xs text-muted-foreground">Insurance pricing differential harming long-standing customers</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 pt-3 text-sm">
                        <p><strong>Context:</strong> Insurance renewal pricing higher for existing customers than new</p>
                        <p><strong>Foreseeable Harm:</strong> Long-standing customers (often vulnerable, elderly) overpay significantly</p>
                        <p><strong>Why Foreseeable:</strong> Industry-wide practice, data showed differential, consumer groups raised concerns</p>
                        <p><strong>Regulatory Action:</strong> FCA banned practice (insurance pricing rules 2022)</p>
                        <p className="text-warning font-medium">Lesson: "Everyone does it" is not a defence if harm is clear</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="scenario2" className="border rounded-lg px-4 bg-muted/20">
                      <AccordionTrigger className="hover:no-underline">
                        <div>
                          <p className="font-semibold">Scenario 2: Vulnerable Customer Data Not Used</p>
                          <p className="text-xs text-muted-foreground">Collecting vulnerability data but not acting on it</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 pt-3 text-sm">
                        <p><strong>Context:</strong> Firm collects vulnerability data but doesn't use it to adjust support</p>
                        <p><strong>Foreseeable Harm:</strong> Vulnerable customers receive same service as others despite known needs</p>
                        <p><strong>Why Foreseeable:</strong> Firm has information but doesn't act</p>
                        <p><strong>Regulatory Action:</strong> FCA criticism in multi-firm reviews</p>
                        <p className="text-warning font-medium">Lesson: Collecting data creates duty to act on it</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="scenario3" className="border rounded-lg px-4 bg-muted/20">
                      <AccordionTrigger className="hover:no-underline">
                        <div>
                          <p className="font-semibold">Scenario 3: Digital-Only Exclusion</p>
                          <p className="text-xs text-muted-foreground">Branch closures creating access barriers</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 pt-3 text-sm">
                        <p><strong>Context:</strong> Bank closes branches, moves to digital-only service model</p>
                        <p><strong>Foreseeable Harm:</strong> Elderly, digitally excluded customers cannot access accounts</p>
                        <p><strong>Why Foreseeable:</strong> Demographic data shows significant elderly customer base</p>
                        <p><strong>Regulatory Action:</strong> FCA concern letters, requirement for alternative channels</p>
                        <p className="text-warning font-medium">Lesson: Must provide alternatives when discontinuing services</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="scenario4" className="border rounded-lg px-4 bg-muted/20">
                      <AccordionTrigger className="hover:no-underline">
                        <div>
                          <p className="font-semibold">Scenario 4: Complex Exit Fees</p>
                          <p className="text-xs text-muted-foreground">Fee structure preventing informed switching decisions</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 pt-3 text-sm">
                        <p><strong>Context:</strong> Investment product with multi-stage exit fee structure (difficult to calculate)</p>
                        <p><strong>Foreseeable Harm:</strong> Customers can't determine true cost of switching, remain in poor-value product</p>
                        <p><strong>Why Foreseeable:</strong> Customer testing would reveal confusion</p>
                        <p><strong>Regulatory Action:</strong> FCA product intervention in certain sectors</p>
                        <p className="text-warning font-medium">Lesson: Test with actual customers whether fee structures are understood</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="scenario5" className="border rounded-lg px-4 bg-muted/20">
                      <AccordionTrigger className="hover:no-underline">
                        <div>
                          <p className="font-semibold">Scenario 5: Automated Decisions Without Human Override</p>
                          <p className="text-xs text-muted-foreground">Algorithm-driven decisions causing customer harm</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 pt-3 text-sm">
                        <p><strong>Context:</strong> Algorithm auto-declines credit applications with no human review</p>
                        <p><strong>Foreseeable Harm:</strong> Errors (especially for vulnerable/underserved) with no recourse</p>
                        <p><strong>Why Foreseeable:</strong> Algorithms have known bias risks, vulnerable customers may have unusual circumstances</p>
                        <p><strong>Regulatory Action:</strong> FCA guidance on use of algorithms and AI</p>
                        <p className="text-warning font-medium">Lesson: Must have human oversight for material customer detriment decisions</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Implementation Steps Tab - Part 1 */}
          <TabsContent value="implementation" className="space-y-6">
            <Alert className="border-primary/50 bg-primary/5">
              <BookOpen className="h-5 w-5 text-primary" />
              <AlertTitle>Note: Implementation Part 1</AlertTitle>
              <AlertDescription>
                This tab contains Steps 1-3 covering Risk Assessment Preparation and Risk Identification (Weeks 1-3). 
                Steps 4-6 (Impact Assessment, Mitigation Strategy, and Board Reporting) will be covered in Part 2.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              {/* Phase 1 */}
              <Card className="p-6 border-primary">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    1
                  </span>
                  Phase 1: Risk Assessment Preparation (Week 1)
                </h3>

                <ChecklistSection
                  stepNumber={1}
                  title="Step 1: Establish Risk Assessment Governance"
                  items={[
                    { id: "scope", label: "Define assessment scope: All products/services, customer segments, distribution channels, four outcomes, and touchpoints" },
                    { id: "team", label: "Form cross-functional risk assessment team: Risk function (lead), Compliance, Product owners, Customer service heads, Data/MI team, Business line representatives" },
                    { id: "roles", label: "Assign roles and responsibilities: Overall owner (CRO/Head of Compliance), Outcome leads (one per outcome), Business line risk owners, Data analysis lead, Documentation lead" },
                    { id: "timeline", label: "Set timelines and milestones: Week 1 (Preparation), Weeks 2-3 (Risk identification), Week 4 (Impact assessment), Week 5 (Mitigation strategy), Week 6 (Board reporting)" },
                    { id: "resources", label: "Secure necessary resources: Dedicated time from key personnel, Access to data and MI, Workshop facilitation support, Documentation tools" }
                  ]}
                  moduleId="cd-f3-step1"
                />

                <ChecklistSection
                  stepNumber={2}
                  title="Step 2: Conduct Risk Assessment Training"
                  items={[
                    { id: "fundamentals", label: "Consumer Duty fundamentals: Cross-cutting rule (avoid foreseeable harm), Four outcomes, What constitutes 'foreseeable harm', 'Reasonable grounds' test, Proportionality principles" },
                    { id: "methodology", label: "Risk assessment methodology: How to identify consumer harm risks, Likelihood vs impact scoring, Inherent vs residual risk concepts, Root cause identification, Mitigation strategy development" },
                    { id: "examples", label: "Examples of consumer harm: Real-world scenarios from FCA enforcement, Good practice from multi-firm reviews, Sector-specific harm examples relevant to your firm" },
                    { id: "documentation", label: "Documentation requirements: What evidence needed for 'reasonable grounds', Recording decision-making rationale, Audit trail best practices" },
                    { id: "workshop", label: "Deliver 2-hour workshop: Include interactive exercises, Use firm-specific examples, Provide reference materials (FCA guidance, templates)" }
                  ]}
                  moduleId="cd-f3-step2"
                />
              </Card>

              {/* Phase 2 */}
              <Card className="p-6 border-accent">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    2
                  </span>
                  Phase 2: Risk Identification (Weeks 2-3)
                </h3>

                <ChecklistSection
                  stepNumber={3}
                  title="Step 3: Conduct Risk Identification Workshops"
                  items={[
                    { id: "ps-workshop", label: "Products & Services Workshop (3 hours): Target market risks (45 mins), Product design risks (45 mins), Distribution strategy risks (45 mins), Closed product risks (45 mins)" },
                    { id: "pv-workshop", label: "Price & Value Workshop (3 hours): Pricing structures (45 mins), Fair value assessment risks (45 mins), Value delivery risks (45 mins), Differential outcomes (45 mins)" },
                    { id: "cu-workshop", label: "Consumer Understanding Workshop (3 hours): Communication clarity risks (45 mins), Testing & evidence risks (45 mins), Marketing & promotion risks (45 mins), Decision-making support risks (45 mins)" },
                    { id: "cs-workshop", label: "Consumer Support Workshop (3 hours): Service channel risks (45 mins), Service quality risks (45 mins), 'Sludge' and barriers (45 mins), Vulnerable customer support (45 mins)" },
                    { id: "document", label: "Document workshop outputs: Risk description, source/trigger, potential harm, affected segments, current controls, control adequacy, notes" },
                    { id: "consolidate", label: "Consolidate all workshops: Remove duplicates across outcomes, Categorize by theme and segment, Identify quick wins and major concerns" }
                  ]}
                  moduleId="cd-f3-step3"
                />

                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-sm">Key Prompt Questions for Workshops</AlertTitle>
                  <AlertDescription className="text-xs mt-2">
                    <p className="mb-2"><strong>Target Market:</strong> "For whom is this product NOT suitable?" "Have we considered vulnerability?"</p>
                    <p className="mb-2"><strong>Product Design:</strong> "Could any feature cause customer harm?" "Are there barriers to accessing benefits?"</p>
                    <p className="mb-2"><strong>Pricing:</strong> "Could customers easily calculate total cost?" "Do different groups pay different prices?"</p>
                    <p className="mb-2"><strong>Communications:</strong> "Could a typical customer understand this without help?" "Do we test with vulnerable customers?"</p>
                    <p><strong>Support:</strong> "Is it as easy to cancel as to purchase?" "Can all customers access support via preferred channel?"</p>
                  </AlertDescription>
                </Alert>
              </Card>

              <Alert className="border-primary/50 bg-primary/5">
                <BookOpen className="h-5 w-5 text-primary" />
                <AlertTitle>Next Steps (Part 2)</AlertTitle>
                <AlertDescription>
                  After completing Steps 1-3, you'll have identified all material consumer harm risks across the four outcomes. 
                  Part 2 will cover:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Step 4:</strong> Impact Assessment & Risk Scoring (Week 4)</li>
                    <li><strong>Step 5:</strong> Mitigation Strategy Development (Week 5)</li>
                    <li><strong>Step 6:</strong> Board Reporting & Approval (Week 6)</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          {/* Templates & Tools Tab - Part 1 */}
          <TabsContent value="templates" className="space-y-6">
            <Alert className="border-primary/50 bg-primary/5">
              <FileCheck className="h-5 w-5 text-primary" />
              <AlertTitle>Note: Templates Part 1</AlertTitle>
              <AlertDescription>
                This tab contains core templates for Risk Assessment Preparation and Risk Identification (Part 1). 
                Additional templates for impact assessment, mitigation planning, and board reporting will be in Part 2.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              <TemplateCard
                title="Template 1: Risk Assessment Project Charter"
                description="Comprehensive project charter defining governance, scope, methodology, timeline, and resources for the risk assessment. Includes executive summary, governance structure, scope definition, assessment methodology, timeline, resource requirements, success criteria, communication plan, and approvals."
                format="Word"
                onDownload={() => console.log("Download Project Charter Template")}
              />

              <TemplateCard
                title="Template 2: Risk Identification Worksheet"
                description="Structured worksheet for systematically capturing risks during outcome-specific workshops. Includes workshop metadata, risk identification table, risk categorization by theme and customer segment, workshop summary with breakdown by severity, and next steps."
                format="Excel"
                onDownload={() => console.log("Download Risk Worksheet Template")}
              />

              <TemplateCard
                title="Template 3: Foreseeable Harm Scenario Library"
                description="Reference library of realistic harm scenarios with detailed analysis to guide risk identification across all four outcomes. Includes 5 detailed scenarios (Loyalty Penalty, Vulnerable Customer Data, Digital-Only Exclusion, Complex Exit Fees, Automated Decisions) plus 10-15 additional scenarios covering all outcomes and common harm patterns."
                format="PDF"
                onDownload={() => console.log("Download Scenario Library")}
              />

              <Card className="p-6 border-primary">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Foreseeable Harm Scenario Examples
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick reference for common harm scenarios to consider during risk identification:
                </p>
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="loyalty" className="border rounded-lg px-3 bg-muted/20">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      Loyalty Penalty (P&V)
                    </AccordionTrigger>
                    <AccordionContent className="text-xs pt-2 space-y-1">
                      <p><strong>Harm:</strong> Long-standing customers overpay significantly</p>
                      <p><strong>Why Foreseeable:</strong> Data clearly shows differential, consumer groups raised concerns</p>
                      <p><strong>Mitigation:</strong> Ban differential pricing, proactive value checks, vulnerable customer outreach</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="digital" className="border rounded-lg px-3 bg-muted/20">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      Digital Exclusion (CS)
                    </AccordionTrigger>
                    <AccordionContent className="text-xs pt-2 space-y-1">
                      <p><strong>Harm:</strong> Elderly/digitally excluded cannot access services</p>
                      <p><strong>Why Foreseeable:</strong> Demographic data shows significant elderly customer base</p>
                      <p><strong>Mitigation:</strong> Proactive customer analysis, phased transition, enhanced telephone banking, home visits</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="exit-fees" className="border rounded-lg px-3 bg-muted/20">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      Complex Exit Fees (P&V + CS)
                    </AccordionTrigger>
                    <AccordionContent className="text-xs pt-2 space-y-1">
                      <p><strong>Harm:</strong> Customers can't calculate switching costs, remain trapped</p>
                      <p><strong>Why Foreseeable:</strong> Customer testing would reveal confusion</p>
                      <p><strong>Mitigation:</strong> Simplify fee structure, proactive disclosure on statements, test understanding</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vulnerable-data" className="border rounded-lg px-3 bg-muted/20">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      Vulnerability Data Not Acted On (All Outcomes)
                    </AccordionTrigger>
                    <AccordionContent className="text-xs pt-2 space-y-1">
                      <p><strong>Harm:</strong> Vulnerable customers receive same service despite known needs</p>
                      <p><strong>Why Foreseeable:</strong> Firm has information but doesn't act</p>
                      <p><strong>Mitigation:</strong> Develop vulnerability response framework, tailor support, monitor outcome parity</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="automated" className="border rounded-lg px-3 bg-muted/20">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      Automated Decisions (P&S)
                    </AccordionTrigger>
                    <AccordionContent className="text-xs pt-2 space-y-1">
                      <p><strong>Harm:</strong> Algorithm errors with no recourse, especially for vulnerable</p>
                      <p><strong>Why Foreseeable:</strong> Known bias risks, vulnerable may have unusual circumstances</p>
                      <p><strong>Mitigation:</strong> Human oversight for material decisions, bias testing, appeal process</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </div>

            <Card className="p-6 bg-accent/5 border-accent">
              <h3 className="font-semibold text-lg mb-3">How to Use These Templates</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-accent">1.</span>
                  <span><strong>Project Charter:</strong> Complete before starting risk identification workshops. Obtain sponsor approval. Use to communicate scope and expectations to all stakeholders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-accent">2.</span>
                  <span><strong>Risk Worksheets:</strong> Use one worksheet per outcome workshop. Facilitate live documentation during discussions. Consolidate all four worksheets afterward.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-accent">3.</span>
                  <span><strong>Scenario Library:</strong> Review scenarios before workshops as preparation. Reference during workshops when participants need examples. Adapt scenarios to your firm's specific products and context.</span>
                </li>
              </ol>
            </Card>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Success Criteria</h2>
              <p className="text-muted-foreground mb-6">
                Clear, measurable success criteria for the Risk Assessment module:
              </p>

              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="process" className="border rounded-lg px-4 bg-primary/5">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Process Success Criteria
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        Comprehensive Coverage:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ All four outcomes assessed</li>
                        <li>✓ All products and services covered (including closed books)</li>
                        <li>✓ All customer segments considered (with specific focus on vulnerable)</li>
                        <li>✓ All distribution channels and third parties included</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        Stakeholder Engagement:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Cross-functional team actively participated in workshops</li>
                        <li>✓ Business line owners engaged and accountable</li>
                        <li>✓ Board Risk Committee received and approved assessment</li>
                        <li>✓ SMF holders aware of risks in their areas</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        Documentation Quality:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Risk register contains 50-100+ risks (for medium/large firms)</li>
                        <li>✓ Each risk clearly described with specific customer harm</li>
                        <li>✓ Current controls documented</li>
                        <li>✓ Gaps identified with evidence</li>
                        <li>✓ Mitigation plans assigned to named owners</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        Integration:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Consumer Duty risks integrated into Enterprise Risk Management framework</li>
                        <li>✓ Risk appetite statement approved by Board</li>
                        <li>✓ Links to existing risk categories (operational, conduct, etc.)</li>
                        <li>✓ Three Lines of Defence model applied</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="output" className="border rounded-lg px-4 bg-accent/5">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Output Success Criteria
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-accent" />
                        Risk Register Quality:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Risks described specifically (not generically)</li>
                        <li>✓ Customer harm clearly articulated for each risk</li>
                        <li>✓ Likelihood and impact scores assigned using consistent criteria</li>
                        <li>✓ Inherent and residual risk captured</li>
                        <li>✓ Segmentation by customer type where relevant</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-accent" />
                        Prioritization:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Risks prioritized by likelihood × impact score</li>
                        <li>✓ Top 10-20 priority risks identified for immediate action</li>
                        <li>✓ Quick wins (low-effort, high-impact) identified</li>
                        <li>✓ Resources allocated based on risk priority</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-accent" />
                        Board Reporting:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Board Risk Committee received comprehensive risk summary</li>
                        <li>✓ Material risks highlighted with mitigation plans</li>
                        <li>✓ Risk appetite alignment demonstrated</li>
                        <li>✓ Board approved risk register and remediation approach</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-accent" />
                        Actionability:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Each material risk has named mitigation owner</li>
                        <li>✓ Mitigation plans have clear actions and timelines</li>
                        <li>✓ Resource requirements estimated</li>
                        <li>✓ Progress tracking mechanism established</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="compliance" className="border rounded-lg px-4 bg-secondary/5">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Compliance Success Criteria
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <Scale className="h-4 w-4 text-secondary" />
                        Regulatory Alignment:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Assessment covers FCA's four outcomes framework</li>
                        <li>✓ "Foreseeable harm" interpreted correctly</li>
                        <li>✓ Proportionality applied appropriately for firm size</li>
                        <li>✓ Latest FCA guidance and supervisory feedback incorporated</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <Scale className="h-4 w-4 text-secondary" />
                        Evidence Standard:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ Assessment creates audit trail for "reasonable grounds"</li>
                        <li>✓ Decision-making documented contemporaneously</li>
                        <li>✓ Evidence links risks to controls to outcomes</li>
                        <li>✓ Ready for regulatory examination</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-2">
                        <Scale className="h-4 w-4 text-secondary" />
                        Ongoing Monitoring:
                      </p>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>✓ KRIs defined for material risks</li>
                        <li>✓ Monitoring frequency determined</li>
                        <li>✓ Escalation triggers set</li>
                        <li>✓ Review cycle established (at least annually)</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold text-lg mb-4">Timeline Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-background rounded">
                  <span>Week 1: Preparation and training complete</span>
                  <Badge variant="outline">✓</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-background rounded">
                  <span>Weeks 2-3: Risk identification workshops completed</span>
                  <Badge variant="outline">✓</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span>Week 4: Impact assessment and scoring (Part 2)</span>
                  <Badge variant="secondary">Upcoming</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span>Week 5: Mitigation strategies developed (Part 2)</span>
                  <Badge variant="secondary">Upcoming</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span>Week 6: Board reporting and approval (Part 2)</span>
                  <Badge variant="secondary">Upcoming</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-primary">
              <h3 className="font-semibold text-lg mb-4">Key Metrics to Track</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">During Assessment</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Number of risks identified: ___ (target 50-100+ for medium/large firms)</li>
                    <li>• Workshop participation rate: ___% (target &gt;90%)</li>
                    <li>• Risks scored as High: ___ (require immediate action)</li>
                    <li>• Risks scored as Medium: ___ (require planned mitigation)</li>
                    <li>• Risks scored as Low: ___ (require monitoring)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-accent">Post-Assessment</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Mitigation plans with assigned owners: ___% (target 100% of High/Medium)</li>
                    <li>• Board-level risk appetite approved: Yes/No</li>
                    <li>• Integration with ERM complete: Yes/No</li>
                    <li>• Evidence documented and accessible: Yes/No</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <Alert className="border-warning/50 bg-warning/5">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <AlertTitle className="text-lg">Common Pitfalls</AlertTitle>
              <AlertDescription className="text-base">
                Based on FCA findings, regulatory guidance, and implementation experience. Learn from others' mistakes 
                to ensure your risk assessment meets expectations.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <PitfallCard
                title="Pitfall 1: Generic Risk Descriptions"
                description="FCA Finding: 'Risks described as reputational damage or regulatory risk without specific reference to customer harm.' Doesn't identify actual harm to customers, can't develop targeted mitigation, doesn't help prioritization, misses the point of Consumer Duty (outcomes focus)."
                impact="Cannot develop effective mitigation strategies. Regulators will challenge risk register quality. Fails to demonstrate understanding of foreseeable harm. Wastes time on meaningless exercise."
                prevention="Always start with 'Risk to customers is...' not 'Risk to firm is...'. Ask 'What bad thing happens to a customer?' for every risk. Be specific about which product, process, or customer segment. Use template: 'Risk: [Customer segment] may experience [specific harm] due to [specific cause/gap], resulting in [outcome: financial loss/distress/barrier]'."
              />

              <PitfallCard
                title="Pitfall 2: Backward-Looking Only"
                description="FCA Finding: 'Risk assessment based solely on past complaints and historical issues, not forward-looking scenarios.' Consumer Duty requires identifying foreseeable harm (future-looking). Past may not predict future (interest rate changes, new products, regulatory changes). Misses emerging risks and is reactive, not proactive."
                impact="Fail to identify foreseeable harms before they occur. Regulatory criticism for not being proactive. Cannot demonstrate 'reasonable grounds' for future decisions. Surprise events that could have been anticipated."
                prevention="Conduct scenario analysis: Ask 'What if interest rates rise 2%? What if customers live 5 years longer? What if digital adoption accelerates?'. Horizon scan external factors (economic, demographic, technology, regulatory, market events). Think product lifecycle: What happens at maturity? What if customer circumstances change?"
                />

              <PitfallCard
                title="Pitfall 3: No Differentiation by Customer Segment"
                description="FCA Finding: 'Single risk assessment for all customers, without considering vulnerable customers or specific segments.' Consumer Duty explicitly requires vulnerable customer consideration. Different segments experience different harms from same issue. Misses differential outcomes (some segments systematically worse). Can't demonstrate outcome parity."
                impact="Vulnerable customers experiencing harm not identified. Breach of Consumer Duty requirement to consider vulnerable customers. Enforcement action if vulnerable customers harmed. Cannot evidence fair treatment across segments."
                prevention="Always ask 'Does this affect all customers equally?'. Specifically consider each vulnerability driver (Health, Life Events, Resilience, Capability). Use data to identify differential outcomes. Segment by: General population, Vulnerable customers (by driver), Closed book customers, Long-tenure customers, Digital-only users, Demographics (age, location)."
              />

              <PitfallCard
                title="Pitfall 4: Identifying Risks But Not Acting"
                description="FCA Finding: 'Risks identified in assessment but no clear mitigation plan or accountable owner.' Risk identification without action is pointless. Creates evidence of knowing about harm but not preventing it (worse than not knowing). Undermines credibility with Board and regulators. Doesn't fulfill 'avoid foreseeable harm' obligation."
                impact="Regulatory criticism for inaction despite knowledge. Potential enforcement if harm materializes. Board challenges: 'Why didn't you act?'. Wasted effort on assessment with no benefit."
                prevention="Every material risk requires: Named mitigation owner (individual, not team), Specific mitigation actions (not vague 'monitor' or 'review'), Clear timeline (deadline dates), Resource allocation (people, budget, systems), Success criteria (how we'll know it's mitigated). Example: 'Risk: Complex fee structure prevents customers calculating exit costs. Mitigation: Simplify to single percentage by Q2 2026 (Owner: Head of Product), Add calculator to statements by Q1 2026 (Owner: Head of Operations), Test understanding by Q3 2026 (Owner: Customer Research), Budget: £50K systems + £10K testing, Success: >80% customers can estimate exit cost correctly'."
              />

              <PitfallCard
                title="Pitfall 5: Inadequate Board Engagement"
                description="FCA Finding: 'Risk assessment conducted by compliance team but Board not adequately engaged or aware.' Board has ultimate responsibility for Consumer Duty. Board must approve risk appetite. Board needs to understand material risks for oversight. SMF holders personally accountable for risks in their areas."
                impact="Board cannot fulfill oversight duty. Enforcement action against Board/SMF if harm occurs. Lack of Board buy-in undermines implementation. Resource allocation not aligned with risks."
                prevention="Board involvement from start: Present project charter for approval, Board member(s) sponsor assessment, Regular Board updates during assessment. Board-appropriate reporting: Executive summary (1-2 pages max), Top 10-15 material risks highlighted, Heatmap visualization (likelihood × impact), Clear 'ask' of Board (approve, allocate resources, endorse risk appetite), Avoid overwhelming with 100-page risk registers. Board discussion quality: Sufficient time allocated (30-45 mins minimum), NEDs given opportunity to challenge, Questions answered with evidence, Minutes record discussion and decisions. SMF accountability: Each SMF presented with risks in their area, SMF sign-off on risk assessment for their domain, SMF included in mitigation plan development."
              />

              <PitfallCard
                title="Pitfall 6: Confusing Inherent and Residual Risk"
                description="Inherent risk is risk before any controls applied. Residual risk is risk after controls applied. Need both to understand control effectiveness. Common mistake: Only assessing residual risk ('We have controls so risk is Low') without recognizing inherent risk remains High."
                impact="Complacency about controls. False sense of security. If controls fail (human error, process breakdown), inherent risk materializes and firm unprepared. Cannot justify control investment decisions."
                prevention="Always assess inherent risk first (what's the risk with no controls?). Then assess current control effectiveness. Calculate residual risk based on control quality. Monitor controls to ensure residual risk stays acceptable. Example: Product: High-risk investment. Inherent Risk: HIGH (complex, volatile, potential for significant loss). Current Controls: Target market definition, suitability assessment, risk warnings. Residual Risk: MEDIUM (controls reduce but don't eliminate risk). Key Point: Even with good controls, some inherent risk remains. If controls fail, inherent risk materializes."
              />

              <PitfallCard
                title="Pitfall 7: Ignoring Implementation and Operational Risks"
                description="FCA Observation: 'Firms assess product design risks but miss implementation and operational execution risks.' Examples: Resource constraints (understaffed call centre → long waits → poor support), System failures (website down → digital customers can't access), Training gaps (staff don't understand vulnerability → no tailored support), Change management (new system poorly implemented → customer confusion)."
                impact="Product may be well-designed but poorly delivered. Operational failures cause customer harm despite good intentions. Cannot evidence good outcomes if execution fails. Staff cannot deliver Consumer Duty without proper resources and training."
                prevention="Specifically assess operational delivery, not just design. Consider people, process, systems, and data. Think about 'failure modes' (what could go wrong in execution?). Include front-line staff in risk assessment workshops. Ask: Are we adequately resourced? Are systems reliable? Are staff trained? Can processes handle exceptions? What if something breaks?"
              />

              <PitfallCard
                title="Pitfall 8: Treating This as One-Off Exercise"
                description="FCA Expectation: Risk assessment should be dynamic, not static annual review. Risks change as products, customers, and markets evolve. New risks emerge (technology, regulations, economic conditions). Controls degrade over time without monitoring. Consumer Duty is ongoing obligation."
                impact="Risk register becomes outdated and irrelevant. New risks not identified until harm occurs. Controls fail without being monitored. Cannot demonstrate proactive compliance."
                prevention="Continuous monitoring: Establish Key Risk Indicators (KRIs) for material risks, Monitor KRIs monthly/quarterly, Set triggers for review (e.g., complaint rate increases 20%). Event-driven reviews: New product launch → risk assessment required, Product change → re-assess impacted risks, Significant complaint theme → investigate root cause risk, External event (economic shock, regulatory change) → scenario analysis. Annual formal review: Full risk register review annually minimum, Update likelihood/impact scores, Reassess control effectiveness, Update mitigation plans, Board re-approval. Lessons learned integration: Near misses/incidents → add to risk register, Complaints root cause → update risk description, FOS upholds → assess whether foreseeable, FCA findings (multi-firm reviews) → benchmark risks."
              />

              <PitfallCard
                title="Pitfall 9: Insufficient Evidence Trail"
                description="FCA Expectation: Firms must demonstrate 'reasonable grounds' for decisions. Regulators will ask: 'How did you identify this risk?', 'What evidence did you consider?', 'Why did you rate likelihood/impact as you did?', 'What alternatives did you consider for mitigation?'."
                impact="Cannot defend decisions to regulators. Enforcement action if cannot demonstrate reasonable grounds. Audit trail missing for key decisions. Cannot replicate or update assessment."
                prevention="Document for risk identification: Workshop attendance lists, Notes from discussions, Data sources used (complaints, MI, customer feedback), Examples or case studies considered. Document for risk scoring: Scoring criteria definitions, Data supporting likelihood assessment (frequency, customer numbers), Data supporting impact assessment (financial quantification, customer harm), Rationale for scores assigned. Document for mitigation decisions: Options considered, Cost-benefit analysis, Why chosen approach selected, Resource allocation justification, Timeline rationale. Evidence repository: Central storage location for all risk assessment documentation, Version control (track changes over time), Accessible to Board, SMFs, Internal Audit, Regulators, Cross-referenced to other frameworks (ERM, compliance, audit)."
              />

              <PitfallCard
                title="Pitfall 10: Proportionality Misunderstood"
                description="FCA Clarification: Proportionality relates to method/evidence detail, NOT to obligation. Common misunderstanding: 'We're a small firm so we don't need to worry as much about consumer harm.' Correct understanding: 'We're a small firm so our risk assessment can be simpler/less detailed, but we still must identify material risks and mitigate them.'"
                impact="Small firms underestimate their Consumer Duty obligations. Harm occurs to customers despite firm size. FCA enforcement regardless of firm size. No 'small firm exemption' from foreseeable harm rule."
                prevention="Proportionate approach for small firms: Simpler risk register (20-30 risks vs 100), Basic scoring (High/Medium/Low vs 5×5 matrix), Less documentation detail, Streamlined workshops (half-day vs multi-day), Combined outcomes assessment (not separate workshops per outcome). But still required: Comprehensive coverage of all outcomes, Specific risk descriptions (not generic), Vulnerable customer consideration, Board approval and oversight, Evidence of mitigation actions. Regulatory message: Size affects HOW you assess (method), not WHETHER you assess (obligation)."
              />
            </div>

            <Card className="p-6 bg-primary/5 border-primary mt-6">
              <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Be Specific:</strong> Describe customer harm, not firm risk. Use real examples and scenarios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Look Forward:</strong> Foreseeable harm is about the future, not just past complaints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Segment Always:</strong> Vulnerable customers and other segments must be explicitly considered.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Action Every Risk:</strong> Mitigation plans with owners, timelines, and resources for all material risks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Engage the Board:</strong> Board oversight and approval essential from start to finish.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Document Everything:</strong> Create audit trail for 'reasonable grounds' defence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Keep it Dynamic:</strong> Risk assessment is ongoing, not one-off annual exercise.</span>
                </li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}