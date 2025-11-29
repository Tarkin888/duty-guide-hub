import { useState } from "react";
import { ArrowLeft, Shield, Heart, Calendar, DollarSign, GraduationCap, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

export default function CDI5VulnerableCustomers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handlePreview = (templateName: string) => {
    toast.info(`Opening preview for: ${templateName}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary/10 rounded-lg">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline">Cross-Cutting</Badge>
                  <Badge>Part 1 of 2</Badge>
                </div>
                <h1 className="text-4xl font-bold mb-2">
                  CD-I5: Vulnerable Customer Framework Implementation
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  Part 1: Foundation, Identification & Recording
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>⏱️ Duration: 6 weeks</span>
                  <span>📋 Foundation Phase</span>
                  <span>🎯 All Four Outcomes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
            <TabsTrigger value="implementation">Implementation Steps</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
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
                  <AlertTitle>Critical Cross-Cutting Obligation</AlertTitle>
                  <AlertDescription>
                    Ensure vulnerable customers achieve outcomes as good as other customers across all four Consumer Duty outcomes. Vulnerability is NOT a fifth outcome - it's a cross-cutting theme applying to every aspect of firm operations.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Regulatory Foundation</h3>
                    <p className="text-sm text-muted-foreground">
                      Consumer Duty (all four outcomes) + FG21/1 Guidance on Vulnerable Customers
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">FCA Expectation</h3>
                    <p className="text-sm text-muted-foreground italic">
                      "Firms should aim to ensure that the outcomes for customers with characteristics of vulnerability are as good as those for other customers" - FG21/1
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Module Scope - Part 1</CardTitle>
                <CardDescription>Foundation establishment (6 weeks)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                      Understanding Vulnerability
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-8">
                      <li>• Four drivers framework</li>
                      <li>• Intersecting vulnerabilities</li>
                      <li>• Temporary vs permanent</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                      Policy Framework
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-8">
                      <li>• Comprehensive policy development</li>
                      <li>• Board approval process</li>
                      <li>• Staff responsibilities</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                      Identification Approach
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-8">
                      <li>• Data analytics models</li>
                      <li>• Staff recognition training</li>
                      <li>• Self-declaration mechanisms</li>
                      <li>• Life event detection</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                      Recording Systems
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-8">
                      <li>• CRM configuration</li>
                      <li>• Data protection compliance</li>
                      <li>• Review protocols</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <Alert className="bg-muted">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Part 2 (To Follow)</AlertTitle>
                  <AlertDescription>
                    Part 2 will cover: Product/service adaptations, enhanced support mechanisms, staff training programmes, monitoring dashboard, and continuous improvement.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Deliverables (Part 1)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Vulnerable Customer Policy Document (Board-approved)",
                    "Four Drivers identification framework",
                    "Vulnerability data collection protocols",
                    "CRM/system configuration for flagging",
                    "Population analysis and baseline metrics",
                    "Journey mapping with vulnerability touchpoints"
                  ].map((deliverable, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 border rounded-lg">
                      <div className="bg-primary/10 p-1 rounded">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Stakeholders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { role: "Executive sponsor", detail: "Board-level" },
                    { role: "Consumer Duty committee", detail: "Oversight" },
                    { role: "Product teams", detail: "Design" },
                    { role: "Customer service", detail: "Operations" },
                    { role: "IT/Data teams", detail: "Systems" },
                    { role: "Risk & Compliance", detail: "Governance" },
                    { role: "Legal", detail: "Data protection" },
                    { role: "L&D", detail: "Training" },
                  ].map((stakeholder, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm">{stakeholder.role}</div>
                      <div className="text-xs text-muted-foreground">{stakeholder.detail}</div>
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
                <CardTitle>FCA Definition of Vulnerable Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-primary/5 border-primary">
                  <Shield className="h-4 w-4" />
                  <AlertTitle className="text-lg">FCA Definition (FG21/1, 1.1)</AlertTitle>
                  <AlertDescription className="text-base mt-2">
                    "Someone who, due to their personal circumstances, is especially susceptible to harm, particularly when a firm is not acting with appropriate levels of care"
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Personal Circumstances</h4>
                    <p className="text-sm text-muted-foreground">Individual factors (not demographics)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Susceptibility to Harm</h4>
                    <p className="text-sm text-muted-foreground">Increased risk of detriment</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Firm's Level of Care</h4>
                    <p className="text-sm text-muted-foreground">Appropriate treatment prevents harm</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <h4 className="font-semibold mb-3 text-destructive">What Vulnerability Is NOT:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✗ Protected characteristics (though may overlap)</li>
                      <li>✗ A static label or permanent category</li>
                      <li>✗ Binary (vulnerable/not vulnerable)</li>
                      <li>✗ Solely customer's responsibility to declare</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold mb-3 text-primary">What Vulnerability IS:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Situational and context-dependent</li>
                      <li>✓ Can be temporary, sporadic, or permanent</li>
                      <li>✓ Exists on a spectrum</li>
                      <li>✓ Firm's responsibility to identify and respond</li>
                      <li>✓ Requires outcomes focus, not just process</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The Four Key Drivers of Vulnerability</CardTitle>
                <CardDescription>Understanding what makes customers vulnerable</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="health">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="font-semibold">DRIVER 1: HEALTH</div>
                          <div className="text-sm text-muted-foreground">Physical disabilities, illness, mental health, cognitive impairment</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-semibold mb-2">Examples:</h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <li>• Physical disability requiring mobility aids</li>
                          <li>• Chronic conditions (diabetes, arthritis, chronic pain)</li>
                          <li>• Visual impairment (blind, partially sighted)</li>
                          <li>• Hearing impairment (deaf, hard of hearing)</li>
                          <li>• Mental health conditions (depression, anxiety, PTSD)</li>
                          <li>• Cognitive impairment (dementia, brain injury)</li>
                          <li>• Learning difficulties (dyslexia, dyscalculia)</li>
                          <li>• Temporary illness affecting capacity</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Potential Harms if Not Supported:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Cannot access premises or digital services</li>
                          <li>• Cannot understand written communications</li>
                          <li>• Cannot participate in phone conversations</li>
                          <li>• Makes decisions when capacity affected</li>
                          <li>• Experiences unnecessary stress and anxiety</li>
                          <li>• Excluded from products/services altogether</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Appropriate Firm Responses:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {[
                            "Accessible formats (large print 16pt+, braille, audio)",
                            "Accessible digital design (screen reader compatible)",
                            "Face-to-face or video alternatives to phone",
                            "Additional time for processing information",
                            "Support for Power of Attorney holders",
                            "Mental health awareness in staff interactions",
                            "Memory aids and reminders"
                          ].map((response, idx) => (
                            <div key={idx} className="text-sm p-2 bg-muted rounded">
                              {response}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="life-events">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-semibold">DRIVER 2: LIFE EVENTS</div>
                          <div className="text-sm text-muted-foreground">Bereavement, relationship breakdown, job loss, retirement, caring</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-semibold mb-2">Examples:</h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <li>• Bereavement (spouse, parent, child)</li>
                          <li>• Divorce or separation</li>
                          <li>• Redundancy or job loss</li>
                          <li>• Retirement (income change, complexity)</li>
                          <li>• New caring responsibilities (elderly parent, disabled child)</li>
                          <li>• Serious illness diagnosis (self or family)</li>
                          <li>• Victim of crime or domestic abuse</li>
                          <li>• Leaving armed forces</li>
                          <li>• Immigration or asylum seeking</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Potential Harms if Not Supported:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Financial decisions made under extreme stress</li>
                          <li>• Important matters overlooked during crisis</li>
                          <li>• Vulnerability to scams or undue pressure</li>
                          <li>• Inability to manage existing commitments</li>
                          <li>• Mental health deterioration</li>
                          <li>• Financial abuse by others</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Appropriate Firm Responses:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {[
                            "Empathy and sensitivity in all interactions",
                            "Flexibility on processes and timelines",
                            "Reduced administrative burden where possible",
                            "Proactive outreach for known events",
                            "Breathing space on payments/deadlines",
                            "Signposting to specialist support services",
                            "Recognition that capacity may be temporarily impaired"
                          ].map((response, idx) => (
                            <div key={idx} className="text-sm p-2 bg-muted rounded">
                              {response}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="resilience">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-semibold">DRIVER 3: RESILIENCE</div>
                          <div className="text-sm text-muted-foreground">Low income, over-indebtedness, low savings, poor credit history</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-semibold mb-2">Examples:</h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <li>• Zero-hours contract or gig economy work</li>
                          <li>• Benefits-dependent income</li>
                          <li>• Significant existing debt burden</li>
                          <li>• Poor credit history limiting options</li>
                          <li>• No emergency savings (&lt;£100)</li>
                          <li>• Recent financial shock</li>
                          <li>• Housing instability or homelessness</li>
                          <li>• Single-income household with dependents</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Potential Harms if Not Supported:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Cannot afford essential products/services</li>
                          <li>• Forced to take inappropriate products due to limited options</li>
                          <li>• Gets trapped in high-cost credit cycle</li>
                          <li>• Experiences severe financial hardship</li>
                          <li>• Mental health impacts of financial stress</li>
                          <li>• Becomes disconnected from financial services</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Appropriate Firm Responses:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {[
                            "Realistic affordability assessments",
                            "Payment arrangement flexibility",
                            "Signposting to free debt advice (StepChange, etc.)",
                            "Not exploiting limited options (predatory pricing)",
                            "Fair pricing even when alternatives limited",
                            "Considerate debt collection practices",
                            "Breathing space schemes",
                            "Alternative product options"
                          ].map((response, idx) => (
                            <div key={idx} className="text-sm p-2 bg-muted rounded">
                              {response}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="capability">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="font-semibold">DRIVER 4: CAPABILITY</div>
                          <div className="text-sm text-muted-foreground">Low financial literacy, digital skills, learning difficulties, language barriers</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-semibold mb-2">Examples:</h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <li>• Low financial literacy (doesn't understand interest, risk)</li>
                          <li>• Low literacy (difficulty reading documents)</li>
                          <li>• Low numeracy (can't calculate costs/returns)</li>
                          <li>• Low digital capability (can't use apps/online banking)</li>
                          <li>• No internet access</li>
                          <li>• Learning difficulties</li>
                          <li>• English not first language</li>
                          <li>• Lack of confidence in financial decisions</li>
                          <li>• Never used financial products before</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Potential Harms if Not Supported:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Makes uninformed financial decisions</li>
                          <li>• Doesn't understand what they're buying</li>
                          <li>• Cannot access digital-only services</li>
                          <li>• Exploited due to lack of knowledge</li>
                          <li>• Excluded from better value products</li>
                          <li>• Cannot manage products effectively</li>
                          <li>• Gets lost in complex processes</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Appropriate Firm Responses:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {[
                            "Plain language communications (Flesch >70)",
                            "Worked examples and illustrations",
                            "Face-to-face or phone alternatives to digital-only",
                            "Patient explanation of concepts",
                            "Active checking of understanding",
                            "Extended decision-making time",
                            "Translation services for key languages",
                            "Financial education support"
                          ].map((response, idx) => (
                            <div key={idx} className="text-sm p-2 bg-muted rounded">
                              {response}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intersecting Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-warning/10 border-warning">
                  <Users className="h-4 w-4" />
                  <AlertTitle>Important Concept</AlertTitle>
                  <AlertDescription>
                    <strong>FCA Guidance:</strong> "Customers often experience more than one driver of vulnerability simultaneously, which can compound susceptibility to harm"
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h4 className="font-semibold">Examples of Intersecting Vulnerabilities:</h4>
                  <div className="grid gap-3">
                    <div className="p-4 border rounded-lg">
                      <div className="font-semibold text-sm mb-2">Triple Vulnerability</div>
                      <p className="text-sm text-muted-foreground">
                        Bereavement (life event) + Depression (health) + Financial stress (resilience) = Highly susceptible to harm
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-semibold text-sm mb-2">Access Barriers</div>
                      <p className="text-sm text-muted-foreground">
                        Disability (health) + Low income (resilience) + Low digital skills (capability) = Significant exclusion risk
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-semibold text-sm mb-2">Decision-Making Risk</div>
                      <p className="text-sm text-muted-foreground">
                        Redundancy (life event) + Debt (resilience) + Poor financial literacy (capability) = Uninformed decisions under pressure
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="bg-muted">
                  <AlertDescription>
                    <strong>Implication for Firms:</strong> When multiple drivers present, support must be more comprehensive, more flexible, more carefully monitored, and potentially involve specialists.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temporary, Sporadic, and Permanent Vulnerability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Temporary</h4>
                    <p className="text-sm text-muted-foreground mb-3">Weeks to months</p>
                    <ul className="text-sm space-y-1">
                      <li>• Broken leg</li>
                      <li>• Bereavement recovery</li>
                      <li>• Job loss recovery</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Sporadic</h4>
                    <p className="text-sm text-muted-foreground mb-3">Intermittent episodes</p>
                    <ul className="text-sm space-y-1">
                      <li>• Episodic mental health</li>
                      <li>• Seasonal work income</li>
                      <li>• Recurring conditions</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Permanent</h4>
                    <p className="text-sm text-muted-foreground mb-3">Long-term or lifelong</p>
                    <ul className="text-sm space-y-1">
                      <li>• Severe disability</li>
                      <li>• Chronic illness</li>
                      <li>• Learning difficulty</li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    <strong>Implication:</strong> Support and recording must be reviewed periodically (not "set and forget"), adjusted as circumstances change, removed when no longer applicable, and flexible to changing needs.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consumer Duty Integration</CardTitle>
                <CardDescription>How vulnerability applies to each outcome</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Products & Services Outcome</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Target market must consider vulnerability drivers</li>
                      <li>• Product design must not exploit vulnerable customers</li>
                      <li>• Testing must include vulnerable customers</li>
                      <li>• Distribution must be accessible</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Price & Value Outcome</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• FVA must analyze vulnerable customers specifically</li>
                      <li>• Must not cross-subsidize unless justified</li>
                      <li>• Must not exploit limited options or low capability</li>
                      <li>• Differential outcomes analysis required</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Consumer Understanding Outcome</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Communications must be accessible</li>
                      <li>• Testing MUST include vulnerable customers</li>
                      <li>• Alternative formats must be available</li>
                      <li>• Active checking of understanding required</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Consumer Support Outcome</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Support channels accessible to vulnerable customers</li>
                      <li>• Staff trained to identify and support</li>
                      <li>• Adjustments embedded in processes</li>
                      <li>• Third-party access enabled (PoA, carers)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key FCA Expectations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-primary bg-muted/50">
                    <h4 className="font-semibold mb-2">A. OUTCOMES PARITY</h4>
                    <p className="text-sm italic mb-3">
                      "Firms should aim to ensure that the outcomes for customers with characteristics of vulnerability are as good as those for other customers" - FG21/1
                    </p>
                    <div className="text-sm space-y-1">
                      <p><strong>What this means:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                        <li>Monitor outcomes separately for vulnerable customers</li>
                        <li>Identify where outcomes are worse</li>
                        <li>Take action to close gaps</li>
                        <li>Not acceptable to have "two-tier" service</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 border-l-4 border-primary bg-muted/50">
                    <h4 className="font-semibold mb-2">B. PROACTIVE IDENTIFICATION</h4>
                    <p className="text-sm italic mb-3">
                      "Firms should take a proactive approach to identifying customers with characteristics of vulnerability" - FG21/1
                    </p>
                    <div className="text-sm space-y-1">
                      <p><strong>What this means:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                        <li>Don't wait for customers to self-declare</li>
                        <li>Use data and analytics to identify</li>
                        <li>Train staff to recognize indicators</li>
                        <li>Create safe environment for disclosure</li>
                        <li>Multiple identification methods</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 border-l-4 border-primary bg-muted/50">
                    <h4 className="font-semibold mb-2">C. FLEXIBLE AND TAILORED SUPPORT</h4>
                    <p className="text-sm italic mb-3">
                      "Firms should provide flexible and tailored support to meet the needs of vulnerable customers"
                    </p>
                    <div className="text-sm space-y-1">
                      <p><strong>What this means:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                        <li>One-size-fits-all doesn't work</li>
                        <li>Adjustments based on individual circumstances</li>
                        <li>Staff empowered to make exceptions</li>
                        <li>Range of channels and formats</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 border-l-4 border-primary bg-muted/50">
                    <h4 className="font-semibold mb-2">D. BOARD ACCOUNTABILITY</h4>
                    <p className="text-sm italic mb-3">
                      "Senior leaders have a responsibility to create a culture that supports staff in reducing potential and actual harm to vulnerable customers"
                    </p>
                    <div className="text-sm space-y-1">
                      <p><strong>What this means:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                        <li>Board-level ownership</li>
                        <li>Culture and incentives aligned</li>
                        <li>Staff supported, not punished for taking time</li>
                        <li>Resources allocated appropriately</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Good Practice vs Poor Practice</CardTitle>
                <CardDescription>FCA Multi-firm Review Findings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold mb-3 text-primary">✅ Good Practice Identified:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Dedicated vulnerable customer teams with enhanced training</li>
                      <li>✓ Proactive identification using multiple data sources</li>
                      <li>✓ Flexible processes with empowered frontline staff</li>
                      <li>✓ Monitoring showing parity of outcomes</li>
                      <li>✓ Consumer panels with lived experience</li>
                      <li>✓ Specialist support readily available</li>
                      <li>✓ Regular review and updating of vulnerability flags</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <h4 className="font-semibold mb-3 text-destructive">❌ Poor Practice Identified:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✗ Identification reactive only - waiting for customer to declare</li>
                      <li>✗ Recording inconsistent - not visible to all staff</li>
                      <li>✗ Generic approach - not tailored to circumstances</li>
                      <li>✗ Training focused on compliance, not practical skills</li>
                      <li>✗ No monitoring of outcomes for vulnerable vs non-vulnerable</li>
                      <li>✗ Products designed for 'average' customer</li>
                      <li>✗ Vague "vulnerable" flag without specifics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab - Phase 1-2 Only */}
          <TabsContent value="implementation" className="space-y-6">
            <Alert className="bg-muted">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Implementation Scope</AlertTitle>
              <AlertDescription>
                This tab covers Phases 1-2 (Foundation & Identification). Phases 3-5 (Adaptations, Training, Monitoring) will be added in Part 2.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Phase 1: Foundation & Policy (Weeks 1-3)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={1}
                  title="Establish Vulnerable Customer Policy Framework"
                  items={[
                    {
                      id: "policy-1",
                      label: "Review existing vulnerable customer policy/approach",
                      details: "Identify what already exists and gaps against Consumer Duty requirements"
                    },
                    {
                      id: "policy-2",
                      label: "Identify gaps against Consumer Duty requirements",
                      details: "Compare current approach to FG21/1 and Consumer Duty standards"
                    },
                    {
                      id: "policy-3",
                      label: "Draft comprehensive policy covering all required elements",
                      details: "Purpose, four drivers, identification, recording, treatment standards, governance",
                      responsible: "Head of Customer Experience / CCO",
                      duration: "1-2 weeks"
                    },
                    {
                      id: "policy-4",
                      label: "Consult stakeholders (operations, IT, legal, compliance)",
                      details: "Ensure all relevant teams input and buy-in to approach"
                    },
                    {
                      id: "policy-5",
                      label: "Present to Consumer Duty oversight committee",
                      details: "Obtain committee review and feedback"
                    },
                    {
                      id: "policy-6",
                      label: "Obtain Board approval",
                      details: "Board must approve vulnerable customer policy",
                      responsible: "Chief Customer Officer",
                      duration: "Board meeting"
                    },
                    {
                      id: "policy-7",
                      label: "Communicate policy to all staff",
                      details: "Ensure all staff aware of firm's commitment and their role"
                    },
                    {
                      id: "policy-8",
                      label: "Publish on firm's website/customer-facing channels",
                      details: "Make policy publicly available to customers"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerable Customer Policy Document Template",
                    onClick: () => handlePreview("Vulnerable Customer Policy Document")
                  }}
                />

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Key Policy Principles to Include:</h4>
                  <ol className="space-y-1 text-sm ml-4 list-decimal">
                    <li>Vulnerability can affect anyone at any time</li>
                    <li>Outcomes for vulnerable customers should equal others</li>
                    <li>Proactive identification, not just reactive waiting</li>
                    <li>Flexible, tailored support based on individual needs</li>
                    <li>Recording with consent and appropriate safeguards</li>
                    <li>Regular review of circumstances (not "set and forget")</li>
                    <li>Staff empowered and supported to help</li>
                    <li>Continuous monitoring and improvement</li>
                  </ol>
                </div>

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={2}
                  title="Understand Your Vulnerable Customer Population"
                  items={[
                    {
                      id: "pop-1",
                      label: "Analyze existing customer base data",
                      details: "Demographics, product holdings, interaction patterns, complaints, third-party contacts"
                    },
                    {
                      id: "pop-2",
                      label: "Conduct external research",
                      details: "UK population statistics, sector-specific data, regional variations, FCA research",
                      responsible: "Head of Data & Analytics"
                    },
                    {
                      id: "pop-3",
                      label: "Estimate vulnerability prevalence in your customer base",
                      details: "Apply national statistics to your demographics, adjust for product types and sectors"
                    },
                    {
                      id: "pop-4",
                      label: "Profile typical vulnerability characteristics by product/segment",
                      details: "Understand which vulnerabilities are most common in each product line"
                    },
                    {
                      id: "pop-5",
                      label: "Create baseline report for governance committee",
                      details: "Document current state before implementation",
                      duration: "1 week"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerable Customer Population Analysis Template",
                    onClick: () => handlePreview("Vulnerable Customer Population Analysis")
                  }}
                />

                <Alert className="bg-primary/5 border-primary">
                  <AlertDescription>
                    <strong>UK Population Benchmarks:</strong> Health driver (46% long-term health conditions), Life events (8-10% at any time), Resilience (25% have &lt;£100 savings), Capability (33% low financial capability). Your customer base will differ - analyze your specific population.
                  </AlertDescription>
                </Alert>

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={3}
                  title="Map Vulnerability Across Customer Journeys"
                  items={[
                    {
                      id: "journey-1",
                      label: "Map complete customer journey for each key product",
                      details: "Awareness → Application → Onboarding → Use → Support → Exit"
                    },
                    {
                      id: "journey-2",
                      label: "Identify vulnerability touchpoints at each stage",
                      details: "Where might vulnerable customers struggle? Where might harm occur?",
                      responsible: "Head of Customer Experience"
                    },
                    {
                      id: "journey-3",
                      label: "Assess current approach at each touchpoint",
                      details: "What support exists? Is it adequate? What gaps exist?"
                    },
                    {
                      id: "journey-4",
                      label: "Identify improvement opportunities",
                      details: "Where can identification happen? Where can support be enhanced?"
                    },
                    {
                      id: "journey-5",
                      label: "Prioritize based on risk of harm",
                      details: "Focus on highest-risk touchpoints first",
                      duration: "1-2 weeks"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerability Journey Mapping Template",
                    onClick: () => handlePreview("Vulnerability Journey Mapping")
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phase 2: Identification & Recording (Weeks 3-6)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={4}
                  title="Design Proactive Identification Approach"
                  items={[
                    {
                      id: "ident-1",
                      label: "METHOD A: Identify data indicators of vulnerability",
                      details: "Age, PoA, payment arrangements, channel preferences, call patterns"
                    },
                    {
                      id: "ident-2",
                      label: "Create vulnerability identification model (scoring algorithm)",
                      details: "Weight indicators, set probability thresholds, define review triggers",
                      responsible: "Head of Data & Analytics",
                      duration: "3-4 weeks"
                    },
                    {
                      id: "ident-3",
                      label: "Test model against known vulnerable customers",
                      details: "Validate precision and recall of identification model"
                    },
                    {
                      id: "ident-4",
                      label: "METHOD B: Train staff to recognize vulnerability indicators",
                      details: "Verbal/non-verbal indicators, tactful inquiry, escalation paths",
                      responsible: "Head of Customer Service"
                    },
                    {
                      id: "ident-5",
                      label: "Provide tactful inquiry scripts and empower staff to flag",
                      details: "\"Is there anything we should know to support you better?\""
                    },
                    {
                      id: "ident-6",
                      label: "METHOD C: Create customer self-declaration opportunities",
                      details: "Application questions, website forms, periodic outreach"
                    },
                    {
                      id: "ident-7",
                      label: "Make disclosure safe and stigma-free",
                      details: "Explain benefits, guarantee confidentiality, never use against customer"
                    },
                    {
                      id: "ident-8",
                      label: "METHOD D: Identify life events that trigger support",
                      details: "Bereavement, retirement, financial difficulty, relationship breakdown"
                    },
                    {
                      id: "ident-9",
                      label: "Create automatic triggers for proactive outreach",
                      details: "When life event detected, trigger specialist team contact"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerability Identification Model Specification & Recognition Guide",
                    onClick: () => handlePreview("Vulnerability Identification Model")
                  }}
                />

                <Alert className="bg-muted">
                  <AlertDescription>
                    <strong>Four-Method Approach:</strong> Most effective identification uses all four methods in combination. Data analytics flags potential vulnerability, staff verify and record, customers can self-declare, and life events trigger proactive support.
                  </AlertDescription>
                </Alert>

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={5}
                  title="Implement Vulnerability Recording System"
                  items={[
                    {
                      id: "record-1",
                      label: "Design recording approach (what, where, how, visibility)",
                      details: "Driver(s), circumstances, adjustments, review date, consent"
                    },
                    {
                      id: "record-2",
                      label: "Ensure data protection compliance",
                      details: "Lawful basis, transparency, security, purpose limitation, retention",
                      responsible: "DPO",
                      duration: "1 week"
                    },
                    {
                      id: "record-3",
                      label: "Configure CRM/systems with vulnerability fields and alerts",
                      details: "Structured fields + free text, visible to all relevant staff",
                      responsible: "IT Director",
                      duration: "2-3 weeks"
                    },
                    {
                      id: "record-4",
                      label: "Build review reminder functionality",
                      details: "System generates task at review date for staff to contact customer"
                    },
                    {
                      id: "record-5",
                      label: "Test data flow and visibility across systems",
                      details: "Verify alert appears in CRM, telephony, case management"
                    },
                    {
                      id: "record-6",
                      label: "Train staff on recording procedures",
                      details: "How to initiate conversation, complete fields, when to review",
                      responsible: "Head of Customer Service",
                      duration: "1 week"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerability Recording Procedures Template",
                    onClick: () => handlePreview("Vulnerability Recording Procedures")
                  }}
                />

                <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <h4 className="font-semibold mb-2 text-destructive">Critical Data Protection Requirements:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>✓ ONLY use for vulnerability support (never pricing, never marketing)</li>
                    <li>✓ Tell customer WHY recording and HOW data used</li>
                    <li>✓ Obtain consent before recording</li>
                    <li>✓ Access controls (need-to-know basis only)</li>
                    <li>✓ Review and remove when no longer applicable</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Implementation Templates (Part 1)</CardTitle>
                <CardDescription>6 essential templates for foundation phase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="1. Vulnerable Customer Policy Document"
                    description="Comprehensive policy covering purpose, four drivers, identification, recording, treatment standards, governance, and monitoring. Board-approved document with appendices including scenarios and quick reference guide. Sections: Executive Summary, Introduction & Context, Four Drivers (3 pages), Identification Approach, Recording & Data Management, Treatment Standards by Outcome (4 pages), Staff Responsibilities, Governance & Oversight, Monitoring & Review, Appendices."
                    format="Word"
                    onPreview={() => handlePreview("Vulnerable Customer Policy Document")}
                  />

                  <TemplateCard
                    title="2. Vulnerable Customer Population Analysis"
                    description="Excel workbook analyzing current customer base to estimate vulnerability prevalence. Includes demographic analysis, data indicators, estimated prevalence vs current identification, segment-specific analysis, and improvement roadmap. 5 tabs: Demographic Analysis, Vulnerability Indicators from Data, Estimated Prevalence (UK benchmarks vs firm), Segment-Specific Analysis (by product type), Actions & Roadmap (prioritized improvements)."
                    format="Excel"
                    onPreview={() => handlePreview("Vulnerable Customer Population Analysis")}
                  />

                  <TemplateCard
                    title="3. Vulnerability Journey Mapping Template"
                    description="Visual and tabular template for mapping vulnerability across customer journeys. Identifies touchpoints, challenges by driver, current support adequacy, and improvement priorities for each journey stage. Includes journey stages (awareness → exit), vulnerability challenges by driver at each stage, current support approach and adequacy scoring, improvement actions required with owners, and visual timeline with color-coded risk levels."
                    format="PowerPoint"
                    onPreview={() => handlePreview("Vulnerability Journey Mapping")}
                  />

                  <TemplateCard
                    title="4. Vulnerability Identification Model Specification"
                    description="Detailed specification for data analytics identification model. Documents data sources, indicators with weights, scoring methodology, validation approach, outputs, and governance. Enables proactive identification of potential vulnerability. Sections: Model overview and purpose, Data sources and quality, Indicators and scoring (by driver), Scoring methodology and thresholds, Model validation approach and results, Outputs and staff actions, Governance and review."
                    format="Word"
                    onPreview={() => handlePreview("Vulnerability Identification Model")}
                  />

                  <TemplateCard
                    title="5. Vulnerability Recognition Guide for Staff"
                    description="Laminated quick reference card (A5 double-sided) + digital job aid. Lists indicators to recognize for each driver, response approach (listen, offer to record, ask about needs, record, adjust), when to escalate, and key reminders. Front: Recognition indicators by driver. Back: 5-step response approach, tactful scripts for offering to record, when to escalate to specialists, dos and don'ts, contact details for specialist team."
                    format="PDF"
                    onPreview={() => handlePreview("Vulnerability Recognition Guide")}
                  />

                  <TemplateCard
                    title="6. Vulnerability Recording Procedures"
                    description="Process document detailing when and how to record vulnerability in CRM. Includes step-by-step recording process, customer consent scripts, mandatory/optional fields, periodic review process, data protection compliance, and quality standards. Sections: When to record vulnerability, How to record - step-by-step with scripts, Periodic review process, Data protection compliance (lawful basis, security, retention), Quality standards (good vs poor recording), Escalation procedures for complex cases."
                    format="Word"
                    onPreview={() => handlePreview("Vulnerability Recording Procedures")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visual & Interactive Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Four Drivers Infographic</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-6 border rounded-lg text-center">
                      <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">HEALTH</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Physical disability</li>
                        <li>Mental health</li>
                        <li>Cognitive impairment</li>
                        <li>Sensory impairment</li>
                      </ul>
                    </div>
                    <div className="p-6 border rounded-lg text-center">
                      <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">LIFE EVENTS</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Bereavement</li>
                        <li>Divorce</li>
                        <li>Job loss</li>
                        <li>Caring duties</li>
                      </ul>
                    </div>
                    <div className="p-6 border rounded-lg text-center">
                      <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">RESILIENCE</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Low income</li>
                        <li>Over-indebtedness</li>
                        <li>No savings</li>
                        <li>Poor credit</li>
                      </ul>
                    </div>
                    <div className="p-6 border rounded-lg text-center">
                      <GraduationCap className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">CAPABILITY</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Low financial literacy</li>
                        <li>Low digital skills</li>
                        <li>Learning difficulties</li>
                        <li>Language barriers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Recording Procedure Flowchart</h3>
                  <div className="p-6 border rounded-lg">
                    <div className="space-y-4">
                      {[
                        "Customer discloses / indicators observed",
                        "Explain recording + ask consent",
                        "Consent obtained?",
                        "Record: Driver(s) + Circumstances + Adjustments + Review Date",
                        "Confirm with customer",
                        "Verify alert visible to all relevant staff",
                        "Provide adjustments immediately"
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 p-3 bg-muted rounded-lg">
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Identification Methods (Venn Diagram Concept)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Data Analytics</h4>
                      <p className="text-sm text-muted-foreground">
                        Algorithms identify probability based on behavioral indicators and demographic data
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Staff Recognition</h4>
                      <p className="text-sm text-muted-foreground">
                        Trained staff spot indicators during interactions and tactfully inquire
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Self-Declaration</h4>
                      <p className="text-sm text-muted-foreground">
                        Customers voluntarily share circumstances in safe, stigma-free environment
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Life Event Detection</h4>
                      <p className="text-sm text-muted-foreground">
                        Major events (bereavement, redundancy) automatically trigger support protocols
                      </p>
                    </div>
                  </div>
                  <Alert className="mt-4 bg-primary/5 border-primary">
                    <AlertDescription>
                      <strong>Most Effective:</strong> Combining all four methods creates comprehensive identification with multiple touchpoints and validation
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Guidance Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    <strong>For Implementation Teams:</strong> This is Part 1 of the Vulnerable Customer Framework module. It establishes policy foundation, understanding of your customer base, proactive identification, and recording systems.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h4 className="font-semibold">Next Steps (Part 2 will cover):</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                    <li>Product and service adaptations for vulnerable customers</li>
                    <li>Enhanced support mechanisms and adjustments</li>
                    <li>Comprehensive training programme</li>
                    <li>Monitoring dashboard and outcome parity analysis</li>
                    <li>Continuous improvement framework</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Estimated Effort for Part 1:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { task: "Policy development", time: "2-3 weeks", note: "Including stakeholder input and Board approval" },
                      { task: "Population analysis", time: "1-2 weeks", note: "Data analytics team" },
                      { task: "Journey mapping", time: "1-2 weeks", note: "Customer experience team" },
                      { task: "Identification model build", time: "3-4 weeks", note: "Data analytics team" },
                      { task: "CRM configuration", time: "2-3 weeks", note: "IT team" },
                      { task: "Staff procedures and training", time: "1-2 weeks", note: "L&D team" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="font-semibold text-sm">{item.task}</div>
                        <div className="text-xs text-primary">{item.time}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <Alert className="bg-warning/10 border-warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Critical Success Factor</AlertTitle>
                  <AlertDescription>
                    Getting Board approval and visible leadership commitment is essential. Without it, operational teams will struggle to prioritize this work.
                  </AlertDescription>
                </Alert>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Integration with Other Modules:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">CD-I1</Badge>
                      <span className="text-muted-foreground">Products & Services: Vulnerability in target market definition</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">CD-I2</Badge>
                      <span className="text-muted-foreground">Price & Value: Vulnerable customer analysis in FVA</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">CD-I3</Badge>
                      <span className="text-muted-foreground">Consumer Understanding: Communications accessibility</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">CD-I4</Badge>
                      <span className="text-muted-foreground">Consumer Support: Support adjustments and third-party access</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">CD-M1</Badge>
                      <span className="text-muted-foreground">MI & Monitoring: Outcome parity dashboard (Part 2)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
