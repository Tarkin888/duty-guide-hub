import { useState } from "react";
import { ArrowLeft, Shield, Heart, Calendar, DollarSign, GraduationCap, Users, AlertTriangle, CheckCircle2, Clock, Printer } from "lucide-react";
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
      description: "Vulnerable Customer Framework marked as complete!",
    });
  };

  const handleMarkInProgress = () => {
    updateModuleStatus(STORAGE_KEY, "in-progress");
    setStatus("in-progress");
    toast.info("Module In Progress", {
      description: "Vulnerable Customer Framework marked as in progress",
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
                <h1 className="text-2xl font-bold">Vulnerable Customer Framework Implementation</h1>
                <p className="text-muted-foreground">Foundation, Identification, Adaptations, Training & Monitoring</p>
                
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Duration: 8-12 weeks
                  </span>
                  <span>Phase: Cross-Cutting</span>
                  <span>Scope: All Four Outcomes</span>
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

            <Card>
              <CardHeader>
                <CardTitle>Phase 3: Product & Service Adaptations (Weeks 4-8)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={6}
                  title="Review Products for Vulnerability Impact"
                  items={[
                    {
                      id: "product-1",
                      label: "Assess each product for features that may harm vulnerable customers",
                      details: "Complex structures, high exit fees, digital-only, tight timelines, stable income assumption, complex claims, auto-renewals, hidden charges"
                    },
                    {
                      id: "product-2",
                      label: "Assess whether product meets needs of vulnerable in target market",
                      details: "Review target market definition and vulnerability prevalence",
                      responsible: "Product Managers"
                    },
                    {
                      id: "product-3",
                      label: "Identify necessary adaptations or alternative versions",
                      details: "By driver: Extended cooling-off (health), payment holidays (resilience), simplified versions (capability)"
                    },
                    {
                      id: "product-4",
                      label: "Implement product changes or create vulnerable customer versions",
                      details: "Fee waivers, flexible processes, non-digital alternatives",
                      duration: "4-8 weeks"
                    },
                    {
                      id: "product-5",
                      label: "Test adaptations with vulnerable customers before launch",
                      details: "Recruit from each driver category, validate effectiveness",
                      responsible: "Head of Product"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerability Product Impact Assessment Template",
                    onClick: () => handlePreview("Product Impact Assessment")
                  }}
                />

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={7}
                  title="Adapt Communications for Vulnerable Customers"
                  items={[
                    {
                      id: "comms-1",
                      label: "Review all communications for accessibility",
                      details: "Plain language (Flesch >60), readability, clear structure, visual clarity (12pt min), info density",
                      responsible: "Head of Marketing"
                    },
                    {
                      id: "comms-2",
                      label: "Create alternative formats available on request",
                      details: "Large print (16pt), braille, audio, easy read, video with BSL, translations",
                      duration: "2-3 weeks"
                    },
                    {
                      id: "comms-3",
                      label: "Test communications with vulnerable customers",
                      details: "Comprehension, usability, accessibility, behavioral testing"
                    },
                    {
                      id: "comms-4",
                      label: "Make alternative formats easily available",
                      details: "Prominent on website, mentioned in all comms, fast provision (5 days max), no justification required"
                    }
                  ]}
                  templateLink={{
                    name: "Accessible Communications Checklist",
                    onClick: () => handlePreview("Accessible Communications")
                  }}
                />

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={8}
                  title="Enhance Support for Vulnerable Customers"
                  items={[
                    {
                      id: "support-1",
                      label: "Create Specialist Vulnerable Customer Support Team",
                      details: "Enhanced training, empowered authority, manageable caseloads, supervision support",
                      responsible: "Head of Customer Service",
                      duration: "3-4 weeks"
                    },
                    {
                      id: "support-2",
                      label: "Define support adjustments by driver",
                      details: "Health: extra time, memory aids. Life events: empathy, flexibility. Resilience: payment arrangements. Capability: plain language, non-digital options"
                    },
                    {
                      id: "support-3",
                      label: "Enable third-party support (PoA, carers, advocates)",
                      details: "Verification process, digital access, consent management, safeguarding protocols"
                    },
                    {
                      id: "support-4",
                      label: "Implement safeguarding procedures",
                      details: "Train staff to recognize abuse/exploitation, escalation procedures, information sharing protocols",
                      responsible: "Safeguarding Lead"
                    }
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phase 4: Staff Training & Capability (Weeks 6-10)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={9}
                  title="Develop Vulnerability Training Programme"
                  items={[
                    {
                      id: "train-1",
                      label: "ALL STAFF: Foundation training (2 hours e-learning + facilitated)",
                      details: "What is vulnerability, recognition, response with empathy, recording, escalation, case studies"
                    },
                    {
                      id: "train-2",
                      label: "CUSTOMER-FACING: Advanced training (4 hours classroom)",
                      details: "Deep dive on four drivers, recognition skills, adjustments, difficult conversations, mental health, debt, safeguarding, role plays",
                      responsible: "Head of L&D",
                      duration: "2 weeks to develop"
                    },
                    {
                      id: "train-3",
                      label: "SPECIALIST TEAM: Enhanced training (8+ hours over 2 days)",
                      details: "Advanced mental health, debt specialist knowledge, safeguarding adults, crisis support, complex vulnerabilities, reflective practice"
                    },
                    {
                      id: "train-4",
                      label: "PRODUCT/DESIGN TEAM: Workshop (3 hours)",
                      details: "Inclusive design, vulnerability in target markets, testing with vulnerable customers, fair value"
                    },
                    {
                      id: "train-5",
                      label: "LEADERSHIP: Executive session (2 hours)",
                      details: "Board responsibilities, culture, MI interpretation, resource allocation, regulatory expectations"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerability Training Curriculum",
                    onClick: () => handlePreview("Training Curriculum")
                  }}
                />

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={10}
                  title="Deliver Training and Assess Competency"
                  items={[
                    {
                      id: "deliver-1",
                      label: "Roll out training to all audiences (phased, customer-facing first)",
                      details: "Track completion rates by role",
                      duration: "4-6 weeks"
                    },
                    {
                      id: "deliver-2",
                      label: "Assess competency (tests, role plays, call monitoring)",
                      details: "Knowledge tests (80% pass), role plays (competent rating), ongoing quality monitoring",
                      responsible: "Head of L&D & Quality"
                    },
                    {
                      id: "deliver-3",
                      label: "Refresher training annually",
                      details: "Policy updates, regulatory changes, lessons learned"
                    },
                    {
                      id: "deliver-4",
                      label: "Ongoing reinforcement (team meetings, case studies, coaching)",
                      details: "Recognition and rewards for excellent vulnerable customer support"
                    }
                  ]}
                />

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={11}
                  title="Build Specialist Capabilities and Partnerships"
                  items={[
                    {
                      id: "partner-1",
                      label: "Recruit or develop vulnerable customer specialists",
                      details: "Values-based recruitment, empathy assessment, ongoing supervision",
                      responsible: "Head of HR"
                    },
                    {
                      id: "partner-2",
                      label: "Build external partnerships with support organizations",
                      details: "StepChange, Samaritans, Age UK, RNIB, CAB, local services",
                      duration: "2-3 weeks"
                    },
                    {
                      id: "partner-3",
                      label: "Formalize partnerships (MOUs, training, referral pathways)",
                      details: "Information sharing agreements, joint training, liaison meetings"
                    },
                    {
                      id: "partner-4",
                      label: "Create referral materials (leaflets, guides, tracking)",
                      details: "Customer-facing materials, staff guides on when/how to refer"
                    }
                  ]}
                  templateLink={{
                    name: "External Support Organizations Directory",
                    onClick: () => handlePreview("External Support Directory")
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phase 5: Monitoring & Continuous Improvement (Weeks 8-12, ongoing)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={12}
                  title="Establish Vulnerability Monitoring Framework"
                  items={[
                    {
                      id: "monitor-1",
                      label: "Define vulnerability metrics (identification, outcomes, process)",
                      details: "Customers flagged, breakdown by driver, outcome parity analysis, adjustments provided, training completion",
                      responsible: "Head of Data & Analytics"
                    },
                    {
                      id: "monitor-2",
                      label: "Calculate differential outcomes (vulnerable vs all customers)",
                      details: "Variance for: CSAT, complaints, fair value, comprehension, FCR, resolution time. Set thresholds for action.",
                      duration: "2-3 weeks to build"
                    },
                    {
                      id: "monitor-3",
                      label: "Build Vulnerability Monitoring Dashboard (5 views)",
                      details: "Identification overview, outcome parity analysis (CRITICAL), support provision, quality & compliance, issues & actions"
                    },
                    {
                      id: "monitor-4",
                      label: "Automate data feeds and create visualizations",
                      details: "Monthly to management, quarterly to board, automated alerts"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerability Monitoring Dashboard Specification",
                    onClick: () => handlePreview("Monitoring Dashboard")
                  }}
                />

                <Alert className="bg-destructive/5 border-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Critical FCA Requirement: Outcome Parity</AlertTitle>
                  <AlertDescription>
                    Must monitor outcomes for vulnerable vs non-vulnerable customers and take action when significant variance identified. No monitoring = direct Consumer Duty breach.
                  </AlertDescription>
                </Alert>

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={13}
                  title="Conduct Periodic Vulnerability Reviews"
                  items={[
                    {
                      id: "review-1",
                      label: "Quarterly Review: Compile dashboard, conduct committee meeting",
                      details: "Review identification, analyze outcome parity, root cause analysis, case studies, improvement actions",
                      responsible: "Vulnerable Customer Champion"
                    },
                    {
                      id: "review-2",
                      label: "Document Quarterly Review Report for Board/Executive",
                      details: "Executive summary, identification performance, outcome parity analysis by outcome, actions"
                    },
                    {
                      id: "review-3",
                      label: "Annual Review: Consumer panels with vulnerable customers",
                      details: "Lived experience input, recruitment via charities, themes and recommendations"
                    },
                    {
                      id: "review-4",
                      label: "Annual Accessibility Audit (premises, digital, communications)",
                      details: "WCAG 2.1 AA compliance check, wheelchair access, hearing loops"
                    },
                    {
                      id: "review-5",
                      label: "Policy review and update (Board approval)",
                      details: "Regulatory developments, lessons learned, best practice evolution"
                    },
                    {
                      id: "review-6",
                      label: "Annual Board Report section on vulnerable customers",
                      details: "Identification rates, outcome parity trends, improvement actions, forward plan"
                    }
                  ]}
                  templateLink={{
                    name: "Vulnerability Quarterly Review Template",
                    onClick: () => handlePreview("Quarterly Review")
                  }}
                />

                <ChecklistSection
                  moduleId="cd-i5"
                  stepNumber={14}
                  title="Embed Continuous Improvement"
                  items={[
                    {
                      id: "improve-1",
                      label: "Capture lessons from individual cases (good practice library)",
                      details: "What worked well? What could improve? Systemic issues?"
                    },
                    {
                      id: "improve-2",
                      label: "Share good practice across organization",
                      details: "Case study library, team meetings, knowledge base"
                    },
                    {
                      id: "improve-3",
                      label: "Identify and remediate systemic issues",
                      details: "Product design flaws, communication gaps, support barriers, policy gaps"
                    },
                    {
                      id: "improve-4",
                      label: "Recognize and reward excellent vulnerable customer support",
                      details: "Performance reviews, recognition schemes, career development, celebrate in comms"
                    },
                    {
                      id: "improve-5",
                      label: "Iterate products/communications/support based on feedback",
                      details: "Enhancement pipeline, continuous testing, customer feedback loops"
                    }
                  ]}
                />
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

                <Separator className="my-6" />

                <h3 className="font-semibold text-lg mb-4">Additional Templates (Part 2)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="7. Vulnerability Product Impact Assessment"
                    description="Document template for assessing product features against vulnerability impact. Sections: Product details and target market, Vulnerability prevalence in target market, Feature analysis table (feature, impact, driver affected, severity, mitigation), Overall assessment and adaptations required, Testing methodology with vulnerable customers, Governance sign-off. Enables inclusive product design from the start."
                    format="Word"
                    onPreview={() => handlePreview("Product Impact Assessment")}
                  />

                  <TemplateCard
                    title="8. Accessible Communications Checklist"
                    description="Comprehensive checklist for communication creators covering plain language (Flesch >60, active voice, jargon-free), structure (headings, bullets, key info first), visual design (12pt min, good contrast, white space), accessibility (screen reader compatible, WCAG 2.1 AA, alternative formats), content quality, and testing with vulnerable customers. Ensures all communications meet accessibility standards."
                    format="PDF"
                    onPreview={() => handlePreview("Accessible Communications")}
                  />

                  <TemplateCard
                    title="9. Vulnerability Training Curriculum"
                    description="Detailed training program specifications for 5 audiences (all staff, customer-facing, specialist team, product/design, leadership). Each module includes: learning objectives, content outline, delivery method, materials required, facilitator requirements, assessment method, pass criteria, refresher frequency. Includes role play scenarios and competency assessment tools. Full customer-facing module specification provided as example."
                    format="Word"
                    onPreview={() => handlePreview("Training Curriculum")}
                  />

                  <TemplateCard
                    title="10. External Support Organizations Directory"
                    description="Comprehensive directory of referral partners organized by support type (debt advice, mental health, financial capability, age-related, domestic abuse, disability). For each organization: services description, contact details, when to refer (indicators), referral procedure, materials available, partnership status, special notes (safeguarding, eligibility). Includes staff guidance on how to signpost effectively and safely."
                    format="Excel"
                    onPreview={() => handlePreview("External Support Directory")}
                  />

                  <TemplateCard
                    title="11. Vulnerability Monitoring Dashboard Specification"
                    description="Comprehensive dashboard design with 5 views: (1) Identification Overview (total flags, driver breakdown, identification sources, coverage vs prevalence), (2) Outcome Parity Analysis (CRITICAL - variance for each Consumer Duty outcome metric with RAG status), (3) Support Provision (adjustments provided, specialist team activity, external referrals), (4) Quality & Compliance (training completion, recording quality, call quality scores), (5) Issues & Actions (red RAG items, root cause analysis, improvement actions). Monthly/quarterly review cadence."
                    format="PowerPoint"
                    onPreview={() => handlePreview("Monitoring Dashboard")}
                  />

                  <TemplateCard
                    title="12. Vulnerability Quarterly Review Template"
                    description="Structured quarterly review document with 8 sections: (1) Executive summary with RAG, (2) Identification performance vs targets, (3) Outcome parity analysis by each outcome with variance calculations and root cause analysis, (4) Product/service adaptations implemented, (5) Staff capability and training, (6) Case studies (good practice and learning opportunities), (7) Governance and compliance, (8) Forward plan for next quarter. Appendices include detailed dashboard data and customer feedback verbatims."
                    format="Word"
                    onPreview={() => handlePreview("Quarterly Review")}
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
                    <strong>For Implementation Teams:</strong> This complete Vulnerable Customer Framework module covers all phases from foundation through monitoring. It includes policy, identification, product adaptations, training, and continuous improvement.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h4 className="font-semibold">Implementation Timeline:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                    <li>Weeks 1-3: Foundation and policy (Board approval, population analysis)</li>
                    <li>Weeks 3-6: Identification and recording systems</li>
                    <li>Weeks 4-8: Product and service adaptations</li>
                    <li>Weeks 6-10: Staff training programme</li>
                    <li>Weeks 8-12: Monitoring dashboard and continuous improvement</li>
                    <li>Week 12+: Embedded business-as-usual with ongoing monitoring</li>
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

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Criteria</CardTitle>
                <CardDescription>Clear, measurable criteria for vulnerable customer framework implementation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Identification & Recording (Weeks 1-12)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Vulnerability identification rate reaches estimated prevalence in customer base (target: 80%+ coverage within 24 months)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>&gt;90% of identified customers have specific driver(s) recorded (not vague "vulnerable" flag)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>&gt;90% of recorded vulnerabilities include preferred adjustments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>&gt;95% of recorded vulnerabilities have appropriate review dates set</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Multiple identification methods operational: data analytics scoring, staff recognition, self-declaration prompts, life event detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Overdue vulnerability reviews &lt;5% of total flags</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Outcome Parity (Ongoing)</h3>
                  <Alert className="bg-primary/5 border-primary">
                    <AlertDescription>
                      <strong>Critical FCA Requirement:</strong> No significant negative variance in outcomes for vulnerable vs non-vulnerable customers
                    </AlertDescription>
                  </Alert>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>CSAT variance &lt;0.2 points (target: vulnerable customers as satisfied as others)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Complaint rate variance &lt;2 percentage points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Fair value score variance &lt;0.3 points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Comprehension test pass rate variance &lt;5 percentage points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>FCR rate variance &lt;5 percentage points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Complaint resolution time variance &lt;10%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Where variance exists, root cause identified and documented remediation plan in place with owner and deadline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Quarterly trend shows variance reducing (continuous improvement)</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product & Service Adaptations (Weeks 4-16)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>100% of products assessed for vulnerability impact using standardized template</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Vulnerability explicitly considered in all new product target market definitions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Alternative communication formats available for all key documents: large print (16pt), audio, braille, easy read</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Digital services have effective non-digital alternatives (phone, post, face-to-face) for those who cannot use digital</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Product features that disproportionately harm vulnerable customers identified and mitigated or removed</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Support Capability (Weeks 6-20)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Dedicated vulnerable customer specialist team operational with enhanced training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>&gt;95% of all staff completion of foundation vulnerability training (2 hours)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>&gt;90% of customer-facing staff completion of advanced vulnerability training (4 hours)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>&gt;90% of specialist team completion of enhanced training (8+ hours)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Call quality monitoring scores for vulnerable customer interactions average &gt;4/5 on: empathy, appropriateness of adjustments, recording quality, overall handling</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Governance & Monitoring (Weeks 8-16, then ongoing)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Vulnerability monitoring dashboard operational with all 5 views populated with accurate, timely data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Dashboard reviewed monthly by Vulnerable Customer Committee, quarterly by Executive Committee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Quarterly vulnerability reviews conducted, documented, and shared with Board</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Annual Board report includes dedicated vulnerable customer section with outcome parity analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Consumer panels with vulnerable customers held at least annually, insights documented and acted upon</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Regulatory Compliance (Ongoing)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Comprehensive vulnerable customer policy approved by Board, reviewed annually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Evidence of proactive identification approach using multiple methods (not reactive only)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Evidence of outcome monitoring and parity analysis (dashboard, quarterly reviews)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Evidence of adjustments provided and effectiveness monitored</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Readiness for FCA regulatory examination: documentation, evidence, governance in place</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeline Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { period: "Weeks 1-3", phase: "Foundation and policy", outcome: "Policy approved, population analysis complete" },
                    { period: "Weeks 3-6", phase: "Identification and recording", outcome: "Multiple identification methods operational, recording procedures in place" },
                    { period: "Weeks 4-8", phase: "Product and service adaptations", outcome: "All products assessed, adaptations implemented" },
                    { period: "Weeks 6-10", phase: "Staff training", outcome: "Training rolled out to all audiences, competency assessed" },
                    { period: "Weeks 8-12", phase: "Monitoring implementation", outcome: "Dashboard operational, first quarterly review complete" },
                    { period: "Week 12+", phase: "Ongoing monitoring and continuous improvement", outcome: "Embedded business-as-usual" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{item.period}: {item.phase}</div>
                        <div className="text-sm text-muted-foreground mt-1">→ {item.outcome}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Pitfalls to Avoid</CardTitle>
                <CardDescription>Based on FCA multi-firm review findings and implementation experience</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    These pitfalls have been identified in FCA reviews of firms' vulnerable customer approaches. Avoid them to ensure Consumer Duty compliance.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {[
              {
                number: 1,
                title: "Reactive Identification Only",
                finding: "Firms waiting for customers to self-declare vulnerability rather than proactively identifying",
                problem: "Most vulnerable customers (especially low capability, resilience) won't self-declare. Firm misses majority of vulnerable population.",
                impact: "Vulnerable customers don't receive appropriate support, experience worse outcomes, firm fails Consumer Duty outcome parity requirement",
                prevention: "Implement multiple identification methods: data analytics, staff recognition, life events, AND self-declaration. Set identification targets based on estimated prevalence. Train staff to recognize indicators. Monitor identification rate vs estimated prevalence.",
                risk: "HIGH",
                example: "Firm only flags 3% of customers as vulnerable despite 25%+ estimated prevalence in customer base. FCA review identifies missed vulnerable customers experiencing poor outcomes."
              },
              {
                number: 2,
                title: "Vague 'Vulnerable' Flag Without Specifics",
                finding: "Recording 'vulnerable' without specific driver, circumstances, or adjustments needed",
                problem: "Generic flag doesn't tell staff what support customer needs. Health vulnerability needs different support than capability vulnerability.",
                impact: "Staff don't know how to help. Customer has to repeatedly explain circumstances. Support is generic and ineffective.",
                prevention: "Record specific driver(s): Health/Life Events/Resilience/Capability. Record specific circumstances in free text. Record preferred adjustments. Make information visible and actionable for all staff.",
                risk: "MEDIUM",
                example: "Customer flagged as 'vulnerable' but no details. New staff member doesn't know customer has visual impairment, sends standard 10pt letter customer can't read, customer misses critical deadline."
              },
              {
                number: 3,
                title: "Recording Without Consent or Transparency",
                finding: "Recording vulnerability data without explaining to customer or obtaining consent",
                problem: "UK GDPR violation (lack of transparency). Customer may feel stigmatized or worried about data use.",
                impact: "Data protection breach, customer loss of trust, reputational damage, ICO enforcement risk",
                prevention: "Always explain WHY recording. Get consent. Reassure data will be used ONLY to help, never to disadvantage. Document consent obtained. Update privacy notice.",
                risk: "HIGH",
                example: "Staff records customer has mental health condition without explaining. Customer discovers during data subject access request, complains to ICO about lack of transparency."
              },
              {
                number: 4,
                title: "Vulnerability Flag Not Visible to All Staff",
                finding: "Vulnerability recorded in case notes but not visible to frontline staff who interact with customer",
                problem: "Customer has to repeat their circumstances every time they contact firm. Support isn't consistent.",
                impact: "Customer frustration, poor experience, having to 'prove' vulnerability repeatedly, inconsistent support, worse outcomes",
                prevention: "Prominent vulnerability alert on customer summary screen (red flag icon, banner). Alert visible to ALL customer-facing staff. No need to search buried notes. Alert includes key info: driver, preferred adjustments, review date.",
                risk: "MEDIUM",
                example: "Customer with hearing impairment flagged in notes. New contact center agent doesn't see flag, speaks quickly without checking understanding, customer doesn't understand and makes poor decision."
              },
              {
                number: 5,
                title: "One-Size-Fits-All Generic Approach",
                finding: "Generic 'vulnerable customer process' applied to all regardless of actual circumstances or driver",
                problem: "Different vulnerabilities need different support. Health driver ≠ capability driver ≠ resilience driver. Generic approach doesn't meet individual needs.",
                impact: "Support is inappropriate and ineffective, customer still experiences poor outcomes, wasted resources on wrong interventions",
                prevention: "Train staff on different drivers and appropriate adjustments for each. Record specific driver(s) to enable tailored support. Empower staff to use judgment and tailor approach. Use adjustments library matched to driver(s).",
                risk: "MEDIUM",
                example: "Customer in bereavement (life events driver) needs empathy and flexibility. Firm's generic process offers large print documents (health driver adjustment). Doesn't help customer."
              },
              {
                number: 6,
                title: "No Outcome Monitoring or Parity Analysis",
                finding: "No analysis of whether vulnerable customers achieve outcomes as good as other customers",
                problem: "Can't comply with FCA requirement to ensure outcome parity. Don't know if approach is working. Can't identify where vulnerable customers are disadvantaged.",
                impact: "Regulatory breach of Consumer Duty. Firm doesn't know if causing systematic harm to vulnerable customers. No basis for improvement.",
                prevention: "Mandatory differential outcome analysis: compare vulnerable vs all customers across key metrics. Calculate variance for each Consumer Duty outcome. Set variance thresholds that trigger investigation. Dashboard with outcome parity view reviewed monthly/quarterly. Root cause analysis when significant variance identified.",
                risk: "CRITICAL",
                example: "FCA multi-firm review finds firm has no data on whether vulnerable customers receive same quality outcomes. Complaint rates, CSAT scores, fair value for vulnerable customers unknown. FCA requires immediate remediation."
              },
              {
                number: 7,
                title: "Training Focused on Compliance Awareness, Not Skills",
                finding: "Training tells staff WHAT vulnerability is but not HOW to support vulnerable customers in practice",
                problem: "Staff know the theory but can't apply it. Can recognize vulnerability but don't know what adjustments to offer. Awareness without skills doesn't improve outcomes.",
                impact: "Vulnerable customers identified but not supported effectively, poor customer experience, staff frustration",
                prevention: "Skills-based training with extensive practice: role plays, scenarios, coaching. Focus on recognition AND response (not just recognition). Train on specific adjustments by driver. Ongoing coaching through call quality monitoring. Competency assessment.",
                risk: "MEDIUM",
                example: "Staff complete 1-hour e-learning on vulnerability. Know four drivers. In real call with distressed bereaved customer, don't know how to respond with empathy, offer appropriate flexibility, or signpost to bereavement support."
              },
              {
                number: 8,
                title: "Stigmatizing or Patronizing Treatment",
                finding: "Well-intentioned staff using patronizing language or creating stigma around vulnerability",
                problem: "Customers feel demeaned, don't want to disclose vulnerability in future, damages trust, poor customer experience",
                impact: "Customers reluctant to share circumstances, firm can't identify vulnerability, customers don't get needed support, reputational damage",
                prevention: "Train on respectful, dignity-preserving language. Use customer's own words, not labels. Empathy not sympathy (partnership approach, not pity). Focus on 'what support helps' not 'what's wrong with you'.",
                risk: "LOW (regulatory) but HIGH (reputational)",
                example: "Elderly customer mentions difficulty with smartphone banking. Staff says 'Oh bless, at your age technology is so confusing isn't it?' Customer feels patronized, complains."
              },
              {
                number: 9,
                title: "Vulnerability Considered Only After Product Design Complete",
                finding: "Products designed for 'average' customer, then vulnerability considered as afterthought or exception process",
                problem: "Product may be inherently unsuitable for vulnerable customers in target market. Bolt-on adjustments don't fix design flaws. Excludes vulnerable customers.",
                impact: "Mis-selling risk, product doesn't meet needs of vulnerable in target market, poor value, poor outcomes, regulatory breach",
                prevention: "Inclusive design from the START of product development. Vulnerability explicitly considered in target market definition. Product features assessed for impact on vulnerable customers BEFORE launch. Testing with vulnerable customers DURING design phase. 'Vulnerability impact assessment' mandatory step in product approval.",
                risk: "HIGH",
                example: "Firm designs digital-only current account, launches, then realizes 15% of target market has low digital capability and can't use product. Vulnerable customers excluded or struggle, poor outcomes."
              },
              {
                number: 10,
                title: "Using Vulnerability Data Detrimentally",
                finding: "Firms using vulnerability data to limit product access, charge higher prices, or deny services",
                problem: "DIRECT breach of Consumer Duty. Exploits customers the Duty is designed to protect. May also breach Equality Act if overlaps with protected characteristics.",
                impact: "Serious regulatory enforcement risk, potential FCA fines, reputational catastrophe, customer harm, possible Equality Act legal action",
                prevention: "Clear policy: Vulnerability data used ONLY for support, NEVER detrimentally. Staff training on appropriate use. Monitoring for inappropriate use. Whistleblowing protections. Regular audits of vulnerability data usage.",
                risk: "CRITICAL",
                example: "Firm identifies customer has mental health condition (vulnerability flag). Debt collection team sees flag, uses aggressive tactics assuming customer won't complain. FCA enforcement action."
              },
              {
                number: 11,
                title: "No Periodic Review of Vulnerability Status",
                finding: "Vulnerability flag set and never reviewed or updated - temporary vulnerabilities become permanent records",
                problem: "Customer circumstances change. Temporary vulnerability (broken leg) resolves but flag remains forever. Permanent vulnerability may need different adjustments over time.",
                impact: "Unnecessary data retention (GDPR issue), out-of-date adjustments offered, customer annoyed by irrelevant support",
                prevention: "Mandatory review dates for all vulnerability flags. System generates review prompts. Staff contact customer at review date. Update, remove, or extend flag as appropriate. Temporary = 3-6 month review, permanent = 12 month review. Delete data when no longer relevant.",
                risk: "LOW (Consumer Duty) but MEDIUM (UK GDPR)",
                example: "Customer breaks leg, firm flags for mobility adjustments. 2 years later, leg long healed, firm still sending large print due to old flag. Customer confused and annoyed."
              },
              {
                number: 12,
                title: "Staff Not Empowered to Make Adjustments",
                finding: "Rigid processes prevent staff from providing appropriate adjustments even when they want to help",
                problem: "Staff recognize vulnerability, want to support customer, but procedures/systems/authority don't allow them to make needed exceptions.",
                impact: "Staff frustration, poor vulnerable customer experience, vulnerable customers face barriers, outcome parity not achieved",
                prevention: "Empower frontline staff with authority to make reasonable adjustments without manager approval. Clear guidance on what adjustments are authorized. Specialist team for complex cases. Remove rigid process barriers. Culture of 'how can we help?' not 'computer says no'.",
                risk: "MEDIUM",
                example: "Customer with ADHD needs extra time to make decision. Call center script requires decision within call. Agent wants to give customer time but system won't allow, must close call. Customer feels pressured."
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
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">FCA Finding:</h4>
                    <p className="text-sm text-muted-foreground italic">"{pitfall.finding}"</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Why it's a problem:</h4>
                    <p className="text-sm">{pitfall.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Impact:</h4>
                    <p className="text-sm text-destructive">{pitfall.impact}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">How to avoid:</h4>
                    <p className="text-sm">{pitfall.prevention}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Example:</h4>
                    <p className="text-sm text-muted-foreground">{pitfall.example}</p>
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
