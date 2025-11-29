import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CDI3ConsumerUnderstanding = () => {
  const { toast } = useToast();

  const handleDownload = (templateName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${templateName}...`,
    });
  };

  const handlePreview = (templateName: string) => {
    toast({
      title: "Preview",
      description: `Preview functionality for ${templateName} coming soon`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">Consumer Understanding</h1>
              <Badge variant="default">CD-I3</Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              Consumer Understanding Outcome Implementation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">8-16 weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phase</p>
                  <p className="font-semibold">Four Outcomes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Requirement</p>
                  <p className="font-semibold">PRIN 2A.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="outline" className="mt-1">Not Started</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Steps</TabsTrigger>
          <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
          <TabsTrigger value="success">Success Criteria</TabsTrigger>
          <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Module Overview</CardTitle>
              <CardDescription>
                Ensure communications equip consumers to make effective, timely, and properly informed decisions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Purpose</h3>
                <p className="text-muted-foreground">
                  This module implements PRIN 2A.5, which requires a fundamental shift from simply ensuring 
                  communications are "clear, fair, and not misleading" to proving that they actually enable 
                  customer understanding. This means mandatory testing, monitoring, and adaptation of all 
                  customer communications.
                </p>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Key Shift:</strong> From focusing on what firms send (OUTPUT) to what customers 
                  understand (OUTCOME). Testing is mandatory, not optional.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-lg font-semibold mb-3">Key Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Framework Development</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Communication standards framework</li>
                        <li>• Plain language guidelines</li>
                        <li>• Communication testing protocol</li>
                        <li>• Behavioural testing methodology</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Assessment & Analysis</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Communication inventory</li>
                        <li>• Consumer journey maps</li>
                        <li>• Readability assessment framework</li>
                        <li>• Comprehension testing results</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Implementation</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Marketing and disclosure review process</li>
                        <li>• Digital communication enhancements</li>
                        <li>• Vulnerable customer adaptations</li>
                        <li>• Updated approval workflows</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Monitoring</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Communication effectiveness dashboard</li>
                        <li>• Ongoing monitoring framework</li>
                        <li>• Adaptation and improvement plan</li>
                        <li>• Staff training curriculum</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Stakeholders Involved</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Marketing</Badge>
                  <Badge variant="secondary">Communications Team</Badge>
                  <Badge variant="secondary">Compliance</Badge>
                  <Badge variant="secondary">Legal</Badge>
                  <Badge variant="secondary">Digital/IT</Badge>
                  <Badge variant="secondary">Customer Service</Badge>
                  <Badge variant="secondary">Product Teams</Badge>
                  <Badge variant="secondary">Behavioural Science</Badge>
                  <Badge variant="secondary">Customer Research</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Implementation Timeline</h3>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <Badge className="min-w-24 justify-center">Weeks 1-4</Badge>
                    <p className="text-muted-foreground">Framework and protocol development</p>
                  </div>
                  <div className="flex gap-4">
                    <Badge className="min-w-24 justify-center">Weeks 3-6</Badge>
                    <p className="text-muted-foreground">Assessment and inventory</p>
                  </div>
                  <div className="flex gap-4">
                    <Badge className="min-w-24 justify-center">Weeks 6-14</Badge>
                    <p className="text-muted-foreground">Testing execution</p>
                  </div>
                  <div className="flex gap-4">
                    <Badge className="min-w-24 justify-center">Weeks 12-16</Badge>
                    <p className="text-muted-foreground">Improvement and adaptation</p>
                  </div>
                  <div className="flex gap-4">
                    <Badge className="min-w-24 justify-center">Week 16+</Badge>
                    <p className="text-muted-foreground">Ongoing monitoring and continuous improvement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REGULATORY FOUNDATION TAB */}
        <TabsContent value="regulatory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PRIN 2A.5 Requirements</CardTitle>
              <CardDescription>Consumer Understanding regulatory framework</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RegulatoryQuote
                source="FCA Handbook"
                reference="PRIN 2A.5"
                quote="Firms must communicate in a way that equips consumers to make effective, timely and properly informed decisions about financial products and services"
              />

              <Alert>
                <AlertDescription>
                  <strong>Key Points:</strong>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• Communications must be fair, clear, and not misleading (existing standard)</li>
                    <li>• PLUS must support consumer understanding (higher standard)</li>
                    <li>• PLUS must be tailored to characteristics of recipients</li>
                    <li>• PLUS must be tested for effectiveness</li>
                    <li>• PLUS must be monitored and adapted</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-lg font-semibold mb-4">Evolution from Previous Standards</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 bg-muted">Previous Standard (PRIN 7)</th>
                        <th className="text-left p-3 bg-muted">Consumer Duty Standard (PRIN 2A.5)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">"Clear, fair, not misleading"</td>
                        <td className="p-3">"Equip consumers to make informed decisions"</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Focus on OUTPUT (what firm sends)</td>
                        <td className="p-3">Focus on OUTCOME (what customer understands)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Review content quality</td>
                        <td className="p-3">Test actual comprehension</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Assume good communication = understanding</td>
                        <td className="p-3">Prove understanding through testing</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">One-way broadcast</td>
                        <td className="p-3">Two-way with feedback and adaptation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key FCA Expectations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tailoring">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Badge>Tailoring Requirement</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="FG22/5"
                      quote="Communications should be tailored to the characteristics, needs and objectives of the target market, taking into account characteristics of vulnerability where relevant"
                    />
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Practical Meaning:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Different communications for different audiences</li>
                        <li>• Consider financial literacy levels</li>
                        <li>• Account for digital capability</li>
                        <li>• Adjust for vulnerability characteristics</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="testing">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Badge>Testing Requirement (MANDATORY)</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="FG22/5"
                      quote="Firms should test whether their communications enable consumers to make effective decisions. Where firms use sophisticated testing capabilities to maximise sales, we expect them to use capabilities of an equivalent standard to test other aspects of consumer understanding to ensure good outcomes"
                    />
                    <Alert>
                      <AlertDescription>
                        <strong>Critical Point:</strong> Testing is MANDATORY, not optional. Firms using A/B testing 
                        for sales optimization MUST apply equivalent rigor to testing for understanding.
                      </AlertDescription>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="timing">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Badge>Timing Requirement</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="FG22/5"
                      quote="Information should be provided to consumers at the time that they need it to make effective decisions"
                    />
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Practical Meaning:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Key information upfront</li>
                        <li>• Pre-decision not post-decision</li>
                        <li>• Not buried in T&Cs discovered after purchase</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="consistency">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Badge>Consistency Requirement</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="FG22/5"
                      quote="The standard of clarity in all communications, including post-sale information and terms and conditions, should be as high as that used in promotional materials"
                    />
                    <Alert>
                      <AlertDescription>
                        Marketing materials cannot have high clarity standards while T&Cs are complex and unclear. 
                        ALL communications must meet the same high standard.
                      </AlertDescription>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Testing</CardTitle>
              <CardDescription>Different testing methodologies for different purposes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Comprehension Testing</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Measures:</strong> Can customers understand the information?
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Methods:</strong> Surveys, interviews, knowledge checks
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Example:</strong> "After reading this, can you identify the three main fees?"
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Behavioural Testing</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Measures:</strong> Do customers make better decisions?
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Methods:</strong> A/B testing, randomized trials, behavioral experiments
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Example:</strong> Comparing customer choices when shown different versions of information
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Usability Testing</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Measures:</strong> Can customers navigate and use the information?
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Methods:</strong> User journey testing, digital analytics, eye tracking
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Example:</strong> Testing if customers can find cancellation information within 3 clicks
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FCA Multi-Firm Review Findings</CardTitle>
              <CardDescription>Common issues identified (November 2025)</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertDescription>
                  <ul className="space-y-2">
                    <li>• "Many firms not conducting any testing of communications"</li>
                    <li>• "Testing, where done, often limited to readability scores only"</li>
                    <li>• "Insufficient use of behavioural testing"</li>
                    <li>• "Firms with sophisticated sales optimization not applying same rigor to understanding testing"</li>
                    <li>• "Post-sale communications often neglected"</li>
                    <li>• "Vulnerable customer needs not adequately considered"</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IMPLEMENTATION STEPS TAB */}
        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Workflow</CardTitle>
              <CardDescription>
                Phased approach to implementing Consumer Understanding requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertDescription>
                  This module follows a 5-phase approach: Framework Development → Assessment & Inventory → 
                  Testing Execution → Improvement & Adaptation → Embedding & Monitoring
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Phase 1: Framework Development (Weeks 1-4)</h3>
            
            <ChecklistSection
              stepNumber={1}
              title="Establish Communication Standards Framework"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p1s1-1", 
                  label: "Review existing communication standards",
                  details: "Assess current guidelines and identify gaps"
                },
                { 
                  id: "cdi3-p1s1-2", 
                  label: "Define Consumer Duty communication principles",
                  details: "Create 10-12 key principles for all communications"
                },
                { 
                  id: "cdi3-p1s1-3", 
                  label: "Create enhanced guidelines covering plain language, structure, accessibility",
                  details: "Include WCAG 2.1 AA standards and vulnerable customer considerations"
                },
                { 
                  id: "cdi3-p1s1-4", 
                  label: "Document framework",
                  details: "Create comprehensive framework document"
                },
                { 
                  id: "cdi3-p1s1-5", 
                  label: "Obtain governance approval",
                  details: "Board or senior committee sign-off"
                }
              ]}
              templateLink={{
                name: "Communication Standards Framework Template",
                onClick: () => handlePreview("Communication Standards Framework Template")
              }}
            />

            <ChecklistSection
              stepNumber={2}
              title="Develop Plain Language Guidelines"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p1s2-1", 
                  label: "Set readability targets",
                  details: "Flesch Reading Ease >60, Flesch-Kincaid Grade Level <9"
                },
                { 
                  id: "cdi3-p1s2-2", 
                  label: "Create plain language vocabulary guide",
                  details: "Approved terms and alternatives for jargon"
                },
                { 
                  id: "cdi3-p1s2-3", 
                  label: "Define sentence length limits",
                  details: "Maximum 20-25 words per sentence"
                },
                { 
                  id: "cdi3-p1s2-4", 
                  label: "Establish jargon avoidance protocols",
                  details: "Identify banned terms and required explanations"
                },
                { 
                  id: "cdi3-p1s2-5", 
                  label: "Create plain language checklist",
                  details: "Quick reference guide for content creators"
                }
              ]}
              templateLink={{
                name: "Plain Language Guidelines & Checklist",
                onClick: () => handlePreview("Plain Language Guidelines & Checklist")
              }}
            />

            <ChecklistSection
              stepNumber={3}
              title="Design Communication Testing Protocol"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p1s3-1", 
                  label: "Select testing methodologies for different communication types",
                  details: "Comprehension, behavioural, and usability testing approaches"
                },
                { 
                  id: "cdi3-p1s3-2", 
                  label: "Define sample sizes and statistical significance requirements",
                  details: "Ensure robust and reliable testing"
                },
                { 
                  id: "cdi3-p1s3-3", 
                  label: "Establish success criteria for each communication type",
                  details: "Clear pass/fail thresholds (e.g., 80% comprehension)"
                },
                { 
                  id: "cdi3-p1s3-4", 
                  label: "Create testing scripts and questionnaires",
                  details: "Standardized materials for consistent testing"
                },
                { 
                  id: "cdi3-p1s3-5", 
                  label: "Define testing frequency and assign responsibilities",
                  details: "Who tests what and how often"
                },
                { 
                  id: "cdi3-p1s3-6", 
                  label: "Document protocol",
                  details: "Complete testing protocol manual"
                }
              ]}
              templateLink={{
                name: "Communication Testing Protocol",
                onClick: () => handlePreview("Communication Testing Protocol")
              }}
            />

            <ChecklistSection
              stepNumber={4}
              title="Create Behavioural Testing Methodology"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p1s4-1", 
                  label: "Define behavioural testing approach",
                  details: "A/B testing framework and randomization procedures"
                },
                { 
                  id: "cdi3-p1s4-2", 
                  label: "Establish control and test variants process",
                  details: "How to design effective experiments"
                },
                { 
                  id: "cdi3-p1s4-3", 
                  label: "Identify decision points to test",
                  details: "Critical customer decisions requiring testing"
                },
                { 
                  id: "cdi3-p1s4-4", 
                  label: "Create analysis methodology",
                  details: "Statistical analysis and interpretation guidance"
                },
                { 
                  id: "cdi3-p1s4-5", 
                  label: "Ensure ethical approval processes",
                  details: "Customer protection and consent procedures"
                }
              ]}
              templateLink={{
                name: "Behavioural Testing Methodology Guide",
                onClick: () => handlePreview("Behavioural Testing Methodology Guide")
              }}
            />
          </div>

          <div className="space-y-6 mt-8">
            <h3 className="text-2xl font-bold">Phase 2: Assessment & Inventory (Weeks 3-6)</h3>
            
            <ChecklistSection
              stepNumber={5}
              title="Inventory All Customer Communications"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p2s5-1", 
                  label: "List all customer-facing communications",
                  details: "Pre-sale, point-of-sale, post-sale, ongoing, and exit communications"
                },
                { 
                  id: "cdi3-p2s5-2", 
                  label: "Categorize by type, product, journey stage, and channel",
                  details: "Create comprehensive communication inventory"
                },
                { 
                  id: "cdi3-p2s5-3", 
                  label: "Prioritize for review",
                  details: "Based on risk (complexity, vulnerability, impact), volume, and known issues"
                }
              ]}
              templateLink={{
                name: "Communication Inventory & Prioritization Matrix",
                onClick: () => handlePreview("Communication Inventory & Prioritization Matrix")
              }}
            />

            <ChecklistSection
              stepNumber={6}
              title="Conduct Readability Assessment"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p2s6-1", 
                  label: "Run readability tests on all priority communications",
                  details: "Use Flesch Reading Ease, Flesch-Kincaid, Gunning Fog, SMOG indices"
                },
                { 
                  id: "cdi3-p2s6-2", 
                  label: "Document baseline scores",
                  details: "Record current readability performance"
                },
                { 
                  id: "cdi3-p2s6-3", 
                  label: "Identify communications failing standards",
                  details: "Flag those below target scores"
                },
                { 
                  id: "cdi3-p2s6-4", 
                  label: "Create improvement plan",
                  details: "Prioritized action plan for remediation"
                }
              ]}
              templateLink={{
                name: "Readability Assessment Template",
                onClick: () => handlePreview("Readability Assessment Template")
              }}
            />

            <ChecklistSection
              stepNumber={7}
              title="Map Consumer Journeys"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p2s7-1", 
                  label: "Map complete customer journey for each key product/service",
                  details: "From awareness to exit"
                },
                { 
                  id: "cdi3-p2s7-2", 
                  label: "Identify all communication touchpoints",
                  details: "Document when customers receive information"
                },
                { 
                  id: "cdi3-p2s7-3", 
                  label: "Document customer goals and information needs at each stage",
                  details: "What customers need to know to make decisions"
                },
                { 
                  id: "cdi3-p2s7-4", 
                  label: "Note pain points, friction, and emotional state",
                  details: "Identify where customers struggle or feel pressured"
                },
                { 
                  id: "cdi3-p2s7-5", 
                  label: "Highlight vulnerable customer considerations",
                  details: "Specific journey challenges for vulnerable segments"
                }
              ]}
              templateLink={{
                name: "Consumer Journey Mapping Template",
                onClick: () => handlePreview("Consumer Journey Mapping Template")
              }}
            />
          </div>

          <div className="space-y-6 mt-8">
            <h3 className="text-2xl font-bold">Phase 3: Testing Execution (Weeks 6-14)</h3>
            
            <ChecklistSection
              stepNumber={8}
              title="Conduct Comprehension Testing"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p3s8-1", 
                  label: "Recruit representative sample",
                  details: "Consider demographics, financial literacy, vulnerability"
                },
                { 
                  id: "cdi3-p3s8-2", 
                  label: "Present communication and ask comprehension questions",
                  details: "Use open-ended questions about key information"
                },
                { 
                  id: "cdi3-p3s8-3", 
                  label: "Measure time to find information",
                  details: "Track how long it takes customers to locate critical details"
                },
                { 
                  id: "cdi3-p3s8-4", 
                  label: "Document and analyze results against success criteria",
                  details: "Typically 80%+ must correctly identify key information"
                }
              ]}
              templateLink={{
                name: "Comprehension Testing Script & Results Template",
                onClick: () => handlePreview("Comprehension Testing Script & Results Template")
              }}
            />

            <ChecklistSection
              stepNumber={9}
              title="Conduct Behavioural Testing"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p3s9-1", 
                  label: "Identify decision point to test",
                  details: "e.g., choice of product features"
                },
                { 
                  id: "cdi3-p3s9-2", 
                  label: "Create control and test versions",
                  details: "Existing communication vs. improved version"
                },
                { 
                  id: "cdi3-p3s9-3", 
                  label: "Randomly assign customers and run A/B test",
                  details: "Ensure statistical validity"
                },
                { 
                  id: "cdi3-p3s9-4", 
                  label: "Measure outcomes and analyze for statistical significance",
                  details: "Decisions made, time to decision, drop-off rates, satisfaction"
                },
                { 
                  id: "cdi3-p3s9-5", 
                  label: "Implement winning version and document findings",
                  details: "Roll out improved communication"
                }
              ]}
              templateLink={{
                name: "Behavioural Testing Design & Analysis Template",
                onClick: () => handlePreview("Behavioural Testing Design & Analysis Template")
              }}
            />

            <ChecklistSection
              stepNumber={10}
              title="Conduct Usability Testing"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p3s10-1", 
                  label: "Recruit participants and set realistic tasks",
                  details: "e.g., 'Find information about early exit fees'"
                },
                { 
                  id: "cdi3-p3s10-2", 
                  label: "Observe behavior and measure performance",
                  details: "Task completion rate, time, errors, navigation path"
                },
                { 
                  id: "cdi3-p3s10-3", 
                  label: "Identify friction points and confusion",
                  details: "Where do customers get stuck or make mistakes?"
                },
                { 
                  id: "cdi3-p3s10-4", 
                  label: "Document findings and create improvement recommendations",
                  details: "Clear action items for redesign"
                }
              ]}
              templateLink={{
                name: "Usability Testing Protocol & Findings Template",
                onClick: () => handlePreview("Usability Testing Protocol & Findings Template")
              }}
            />

            <ChecklistSection
              stepNumber={11}
              title="Specialized Testing for Vulnerable Customers"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p3s11-1", 
                  label: "Recruit participants with characteristics of vulnerability",
                  details: "Health, capability, resilience, life events drivers"
                },
                { 
                  id: "cdi3-p3s11-2", 
                  label: "Test communications designed for vulnerable customers",
                  details: "Ensure specialized communications are effective"
                },
                { 
                  id: "cdi3-p3s11-3", 
                  label: "Test whether standard communications work for vulnerable customers",
                  details: "Identify barriers in mainstream communications"
                },
                { 
                  id: "cdi3-p3s11-4", 
                  label: "Assess need for alternative formats",
                  details: "Audio, large print, simplified versions, video"
                },
                { 
                  id: "cdi3-p3s11-5", 
                  label: "Document findings and required adjustments",
                  details: "Specific adaptations needed"
                }
              ]}
              templateLink={{
                name: "Vulnerable Customer Testing Protocol",
                onClick: () => handlePreview("Vulnerable Customer Testing Protocol")
              }}
            />
          </div>

          <div className="space-y-6 mt-8">
            <h3 className="text-2xl font-bold">Phase 4: Improvement & Adaptation (Weeks 12-16)</h3>
            
            <ChecklistSection
              stepNumber={12}
              title="Analyze Testing Results"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p4s12-1", 
                  label: "Compile all testing findings",
                  details: "Aggregate results from all testing activities"
                },
                { 
                  id: "cdi3-p4s12-2", 
                  label: "Identify common themes and issues",
                  details: "Pattern analysis across communications"
                },
                { 
                  id: "cdi3-p4s12-3", 
                  label: "Prioritize improvements",
                  details: "By severity, customers affected, potential harm, ease of fix"
                },
                { 
                  id: "cdi3-p4s12-4", 
                  label: "Create prioritized improvement backlog",
                  details: "Action plan for communication redesign"
                }
              ]}
              templateLink={{
                name: "Testing Findings Analysis & Prioritization",
                onClick: () => handlePreview("Testing Findings Analysis & Prioritization")
              }}
            />

            <ChecklistSection
              stepNumber={13}
              title="Redesign Communications"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p4s13-1", 
                  label: "Apply plain language principles",
                  details: "Use vocabulary guide and sentence structure rules"
                },
                { 
                  id: "cdi3-p4s13-2", 
                  label: "Restructure for clarity",
                  details: "Front-load key info, use headings/bullets, add examples/charts"
                },
                { 
                  id: "cdi3-p4s13-3", 
                  label: "Improve visual design",
                  details: "Increase white space, clear typography, visual hierarchy"
                },
                { 
                  id: "cdi3-p4s13-4", 
                  label: "Create alternative formats where needed",
                  details: "Summary boxes, video explanations, infographics, FAQs"
                },
                { 
                  id: "cdi3-p4s13-5", 
                  label: "Re-test redesigned communications",
                  details: "Confirm improvements achieve targets"
                },
                { 
                  id: "cdi3-p4s13-6", 
                  label: "Implement when testing confirms improvement",
                  details: "Roll out improved versions"
                }
              ]}
            />

            <ChecklistSection
              stepNumber={14}
              title="Digital Communication Enhancement"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p4s14-1", 
                  label: "Simplify navigation and reduce clicks to key information",
                  details: "Make critical information easily accessible"
                },
                { 
                  id: "cdi3-p4s14-2", 
                  label: "Add progress indicators and contextual help",
                  details: "Support customer through multi-step processes"
                },
                { 
                  id: "cdi3-p4s14-3", 
                  label: "Ensure WCAG 2.1 AA accessibility",
                  details: "Screen reader compatible, keyboard navigation, color contrast, text resizing"
                },
                { 
                  id: "cdi3-p4s14-4", 
                  label: "Optimize for mobile",
                  details: "Responsive design for all devices"
                },
                { 
                  id: "cdi3-p4s14-5", 
                  label: "Use analytics to identify and fix drop-off points",
                  details: "Monitor and continuously improve"
                }
              ]}
            />

            <ChecklistSection
              stepNumber={15}
              title="Marketing Review & Alignment"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p4s15-1", 
                  label: "Review all marketing materials against Consumer Duty standards",
                  details: "Apply same rigor as other communications"
                },
                { 
                  id: "cdi3-p4s15-2", 
                  label: "Ensure balance - benefits AND risks prominently displayed",
                  details: "No misleading emphasis"
                },
                { 
                  id: "cdi3-p4s15-3", 
                  label: "Remove misleading elements",
                  details: "Unclear disclaimers, hidden important info, overly optimistic scenarios"
                },
                { 
                  id: "cdi3-p4s15-4", 
                  label: "Align marketing with actual product features and T&Cs",
                  details: "No discrepancies between promotion and reality"
                },
                { 
                  id: "cdi3-p4s15-5", 
                  label: "Test marketing communications for understanding",
                  details: "Same comprehension testing as other materials"
                },
                { 
                  id: "cdi3-p4s15-6", 
                  label: "Update marketing approval process",
                  details: "Embed Consumer Duty checks"
                }
              ]}
              templateLink={{
                name: "Marketing Review Checklist",
                onClick: () => handlePreview("Marketing Review Checklist")
              }}
            />
          </div>

          <div className="space-y-6 mt-8">
            <h3 className="text-2xl font-bold">Phase 5: Embedding & Monitoring (Weeks 14-16, then ongoing)</h3>
            
            <ChecklistSection
              stepNumber={16}
              title="Update Communication Approval Process"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p5s16-1", 
                  label: "Revise approval workflow",
                  details: "Include plain language, readability, testing, vulnerability, accessibility checks"
                },
                { 
                  id: "cdi3-p5s16-2", 
                  label: "Define approval authorities",
                  details: "Clear decision rights at each stage"
                },
                { 
                  id: "cdi3-p5s16-3", 
                  label: "Create approval tracking system",
                  details: "Monitor communication through approval pipeline"
                },
                { 
                  id: "cdi3-p5s16-4", 
                  label: "Train approvers on new standards",
                  details: "Ensure consistent application of requirements"
                }
              ]}
              templateLink={{
                name: "Communication Approval Workflow",
                onClick: () => handlePreview("Communication Approval Workflow")
              }}
            />

            <ChecklistSection
              stepNumber={17}
              title="Establish Ongoing Monitoring"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p5s17-1", 
                  label: "Define monitoring metrics",
                  details: "Customer questions/complaints, analytics, FOS complaints"
                },
                { 
                  id: "cdi3-p5s17-2", 
                  label: "Set up data collection",
                  details: "Call center queries, website analytics, customer feedback"
                },
                { 
                  id: "cdi3-p5s17-3", 
                  label: "Create monitoring dashboard",
                  details: "Real-time view of communication effectiveness"
                },
                { 
                  id: "cdi3-p5s17-4", 
                  label: "Define review triggers for re-testing",
                  details: "Material changes, spikes in complaints, poor outcomes"
                },
                { 
                  id: "cdi3-p5s17-5", 
                  label: "Assign ongoing ownership",
                  details: "Clear accountability for monitoring and action"
                }
              ]}
              templateLink={{
                name: "Communication Effectiveness Monitoring Framework",
                onClick: () => handlePreview("Communication Effectiveness Monitoring Framework")
              }}
            />

            <ChecklistSection
              stepNumber={18}
              title="Staff Training & Capability Building"
              moduleId="cd-i3"
              items={[
                { 
                  id: "cdi3-p5s18-1", 
                  label: "Train communication creators on Consumer Duty requirements",
                  details: "Plain language, testing methodologies, vulnerable customer needs"
                },
                { 
                  id: "cdi3-p5s18-2", 
                  label: "Train customer-facing staff",
                  details: "How to explain complex information and check understanding"
                },
                { 
                  id: "cdi3-p5s18-3", 
                  label: "Provide resources and tools",
                  details: "Checklists, templates, testing request process"
                },
                { 
                  id: "cdi3-p5s18-4", 
                  label: "Assess competency",
                  details: "Ensure staff can apply new standards"
                }
              ]}
              templateLink={{
                name: "Communication Skills Training Curriculum",
                onClick: () => handlePreview("Communication Skills Training Curriculum")
              }}
            />
          </div>
        </TabsContent>

        {/* TEMPLATES & TOOLS TAB */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Templates Library</CardTitle>
              <CardDescription>
                Comprehensive toolkit for Consumer Understanding implementation
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TemplateCard
              title="Communication Standards Framework Document"
              description="Comprehensive framework covering Consumer Duty communication principles, plain language standards, structural clarity, accessibility (WCAG 2.1 AA), vulnerable customer considerations, testing requirements, and approval processes"
              format="Word"
              onDownload={() => handleDownload("Communication Standards Framework")}
              onPreview={() => handlePreview("Communication Standards Framework")}
            />

            <TemplateCard
              title="Plain Language Guidelines & Checklist"
              description="Practical guide with readability targets, sentence structure guidance, vocabulary recommendations, jargon avoidance list, and quick-reference checklist for content review"
              format="Word"
              onDownload={() => handleDownload("Plain Language Guidelines")}
              onPreview={() => handlePreview("Plain Language Guidelines")}
            />

            <TemplateCard
              title="Communication Testing Protocol"
              description="Comprehensive protocol covering testing strategy, comprehension testing, behavioural (A/B) testing, usability testing, vulnerable customer testing, and results documentation"
              format="Word"
              onDownload={() => handleDownload("Communication Testing Protocol")}
              onPreview={() => handlePreview("Communication Testing Protocol")}
            />

            <TemplateCard
              title="Consumer Journey Mapping Template"
              description="Visual template showing journey stages, customer actions/goals, communication touchpoints, emotional states, pain points, and improvement opportunities with vulnerability considerations"
              format="PowerPoint"
              onDownload={() => handleDownload("Consumer Journey Mapping Template")}
              onPreview={() => handlePreview("Consumer Journey Mapping Template")}
            />

            <TemplateCard
              title="Communication Inventory & Prioritization Matrix"
              description="Excel spreadsheet for cataloging all customer communications with categorization, priority rating, readability scores, test results, and improvement tracking"
              format="Excel"
              onDownload={() => handleDownload("Communication Inventory")}
              onPreview={() => handlePreview("Communication Inventory")}
            />

            <TemplateCard
              title="Readability Assessment Template"
              description="Spreadsheet for tracking Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, and SMOG scores with pass/fail assessment and improvement action tracking"
              format="Excel"
              onDownload={() => handleDownload("Readability Assessment Template")}
              onPreview={() => handlePreview("Readability Assessment Template")}
            />

            <TemplateCard
              title="Comprehension Testing Script & Results"
              description="Complete testing guide with participant briefing, test protocol, question sets, response recording, results template, and analysis framework"
              format="Word"
              onDownload={() => handleDownload("Comprehension Testing Script")}
              onPreview={() => handlePreview("Comprehension Testing Script")}
            />

            <TemplateCard
              title="Behavioural Testing Design & Analysis"
              description="A/B testing template with hypothesis formation, test design, control and test versions, sample size calculations, results analysis, and statistical significance assessment"
              format="Excel"
              onDownload={() => handleDownload("Behavioural Testing Template")}
              onPreview={() => handlePreview("Behavioural Testing Template")}
            />

            <TemplateCard
              title="Usability Testing Protocol & Findings"
              description="Usability testing guide with participant recruitment, task scenarios, observation template, performance metrics, findings summary, and improvement recommendations"
              format="Word"
              onDownload={() => handleDownload("Usability Testing Protocol")}
              onPreview={() => handlePreview("Usability Testing Protocol")}
            />

            <TemplateCard
              title="Marketing Review Checklist"
              description="Comprehensive compliance checklist for marketing materials covering regulatory compliance, consumer understanding, alignment with T&Cs, accessibility, vulnerability, and testing requirements"
              format="Word"
              onDownload={() => handleDownload("Marketing Review Checklist")}
              onPreview={() => handlePreview("Marketing Review Checklist")}
            />

            <TemplateCard
              title="Vulnerable Customer Testing Protocol"
              description="Specialized testing guide with recruitment considerations, testing adaptations, safeguarding procedures, specialized questions, and results analysis for vulnerable customer segments"
              format="Word"
              onDownload={() => handleDownload("Vulnerable Customer Testing Protocol")}
              onPreview={() => handlePreview("Vulnerable Customer Testing Protocol")}
            />

            <TemplateCard
              title="Communication Effectiveness Dashboard"
              description="Dashboard specification showing overall communication health, testing pipeline, comprehension performance, customer understanding issues, digital analytics, and improvement actions tracker"
              format="PowerPoint"
              onDownload={() => handleDownload("Communication Effectiveness Dashboard")}
              onPreview={() => handlePreview("Communication Effectiveness Dashboard")}
            />

            <TemplateCard
              title="Communication Approval Workflow"
              description="Process flowchart with draft creation, initial review, testing (if required), final approval, and monitoring stages. Includes approval form, sign-off record, and version history"
              format="PowerPoint"
              onDownload={() => handleDownload("Communication Approval Workflow")}
              onPreview={() => handlePreview("Communication Approval Workflow")}
            />
          </div>
        </TabsContent>

        {/* SUCCESS CRITERIA TAB */}
        <TabsContent value="success" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Success Criteria</CardTitle>
              <CardDescription>
                Measurable outcomes demonstrating effective Consumer Understanding implementation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quantitative Measures</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      100% of customer communications meet readability standards (Flesch Reading Ease &gt;60)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      100% of high-priority communications tested for comprehension
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      80%+ pass rate on comprehension testing for all tested communications
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      No systematic comprehension failures for vulnerable customers
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Digital journey drop-off rates reduced by [X]%
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Understanding-related complaints reduced by [Y]%
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Customer satisfaction with communications improved to [Z]%
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Qualitative Measures</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Plain language principles embedded in communication creation
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Testing integrated into communication approval process
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Consumer journey maps complete for all key products
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Monitoring dashboard operational and reviewed monthly
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Vulnerable customer adaptations implemented where needed
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Staff trained on Consumer Duty communication standards
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Regulatory Compliance</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Evidence of testing for all material communications
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Adaptation of communications based on testing results
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Monitoring framework operational
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Board reporting on communication effectiveness
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Readiness for regulatory examination
                    </p>
                  </div>
                </div>
              </div>

              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-base">Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Communications Reviewed</p>
                      <p className="text-2xl font-bold">X of Y</p>
                      <p className="text-xs text-muted-foreground">Target: 100%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Meeting Standards</p>
                      <p className="text-2xl font-bold">X%</p>
                      <p className="text-xs text-muted-foreground">Target: 100%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Communications Tested</p>
                      <p className="text-2xl font-bold">X%</p>
                      <p className="text-xs text-muted-foreground">High-priority: 100%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Avg Comprehension Pass Rate</p>
                      <p className="text-2xl font-bold">X%</p>
                      <p className="text-xs text-muted-foreground">Target: 80%+</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Understanding Complaints</p>
                      <p className="text-2xl font-bold">X <span className="text-sm">↓</span></p>
                      <p className="text-xs text-muted-foreground">Trend: Decreasing</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Customer Satisfaction</p>
                      <p className="text-2xl font-bold">X/5</p>
                      <p className="text-xs text-muted-foreground">Communications clarity</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* COMMON PITFALLS TAB */}
        <TabsContent value="pitfalls" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Pitfalls</CardTitle>
              <CardDescription>
                Based on FCA multi-firm reviews and enforcement actions
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <PitfallCard
              title="No Testing Conducted"
              description="Many firms not testing communications for consumer understanding despite this being a mandatory requirement under PRIN 2A.5"
              impact="Cannot evidence that communications are effective. This is a regulatory breach that can lead to enforcement action and customer harm"
              prevention="Implement mandatory testing protocol for all material communications. Build testing into approval process. Allocate budget and resources for testing program"
            />

            <PitfallCard
              title="Readability Testing Only"
              description="Testing limited to readability scores (Flesch, Gunning Fog) without actual comprehension testing with real customers"
              impact="High readability score doesn't guarantee customers understand key information. Can still cause harm despite good scores"
              prevention="Readability is necessary but not sufficient. Must test actual comprehension with real customers. Ask questions about key information after they've read the communication"
            />

            <PitfallCard
              title="No Behavioural Testing"
              description="Firms with sophisticated A/B testing for sales optimization not applying same rigor to testing for customer understanding"
              impact="Asymmetry in sophistication - optimize for sales but not for understanding. FCA expects equivalent testing standards"
              prevention="If you A/B test marketing for conversions, you MUST A/B test for understanding. Apply same statistical rigor and resources to both"
            />

            <PitfallCard
              title="Post-Sale Communications Neglected"
              description="High standards for marketing but poor standards for T&Cs, policy documents, and ongoing communications"
              impact="Customers make decisions based on clear marketing but discover different reality in complex T&Cs. Leads to complaints and potential mis-selling"
              prevention="FCA Quote: 'The standard of clarity in all communications, including post-sale information and terms and conditions, should be as high as that used in promotional materials.' Equal standards throughout customer journey"
            />

            <PitfallCard
              title="Not Testing with Vulnerable Customers"
              description="Testing conducted only with general population, not including vulnerable customers in testing samples"
              impact="Communications may work for general population but fail for vulnerable segments (low literacy, cognitive impairment, etc.)"
              prevention="Mandatory inclusion of vulnerable customers in testing samples using four drivers model. Recruit participants with health, capability, resilience, and life event vulnerabilities"
            />

            <PitfallCard
              title="Testing But Not Adapting"
              description="Firms tested communications, identified issues through testing, but didn't adapt communications based on findings"
              impact="Testing becomes box-ticking exercise with no benefit. Issues persist and customers continue to be harmed"
              prevention="Mandatory adaptation loop: Test → Identify Issues → Redesign → Re-test → Implement. Don't proceed to launch if testing reveals problems"
            />

            <PitfallCard
              title="No Ongoing Monitoring"
              description="Testing treated as one-time exercise at launch without ongoing monitoring of communication effectiveness"
              impact="Communications can become ineffective over time as products change, regulations evolve, or market conditions shift"
              prevention="Establish ongoing monitoring of understanding metrics. Define re-testing triggers (material changes, spike in complaints, poor outcomes). Review at least annually"
            />

            <PitfallCard
              title="Burying Key Information"
              description="Important information (fees, risks, exit penalties) hidden in fine print, late in documents, or in dense paragraphs"
              impact="Customers don't see critical information when making decisions. Make uninformed choices leading to detriment"
              prevention="Front-load key information in first page or summary box. Test whether customers can locate critical information within 2 minutes. Use clear headings and signposting"
            />

            <PitfallCard
              title="Jargon and Complexity"
              description="Use of technical language, complex sentence structures, and financial jargon without explanation"
              impact="Many customers cannot understand, especially those with low financial literacy. Leads to confusion, questions, complaints, and poor decisions"
              prevention="Plain language guidelines mandatory. Target Flesch Reading Ease >60. Maximum sentence length 20-25 words. Avoid jargon or explain when necessary. Test with customers of varying literacy levels"
            />

            <PitfallCard
              title="Assuming Digital Accessibility"
              description="Digital communications not accessible to customers with disabilities or low digital skills. No alternative formats offered"
              impact="Significant portion of customers (including many vulnerable) cannot access information. Digital exclusion causes harm"
              prevention="WCAG 2.1 AA compliance mandatory. Offer alternative formats (phone, paper, large print, audio). Test with assistive technologies. Don't assume all customers are digitally capable"
            />

            <PitfallCard
              title="Inconsistent Messages"
              description="Marketing says one thing, T&Cs say another, customer support staff give different information"
              impact="Customer confusion, complaints, potential mis-selling, regulatory issues. Customers don't know what's actually true"
              prevention="Create single source of truth for product information. Alignment checks across all channels before launch. Train all staff from same materials. Regular cross-channel consistency audits"
            />

            <PitfallCard
              title="Poor Information Timing"
              description="Important information provided after decision point (e.g., full fee schedule only provided after application approved)"
              impact="Customers make decisions without key information. Cannot make informed choice. May lead to buyer's remorse and complaints"
              prevention="Information architecture that delivers information when needed for decisions, not after. Test customer journey to identify when information is actually needed. Upfront disclosure of material information"
            />
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>FCA Multi-Firm Review Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  <p className="font-semibold mb-2">Key Findings (November 2025):</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Many firms not conducting any testing of communications</li>
                    <li>• Testing, where done, often limited to readability scores only</li>
                    <li>• Insufficient use of behavioural testing</li>
                    <li>• Firms with sophisticated sales optimization not applying same rigor to understanding testing</li>
                    <li>• Post-sale communications often neglected</li>
                    <li>• Vulnerable customer needs not adequately considered</li>
                    <li>• Limited evidence of communications being adapted based on testing results</li>
                    <li>• Inconsistent application of standards across different communication types</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <Button>Mark Module Complete</Button>
            <Button variant="outline">Print Module</Button>
            <Button variant="outline">Export Summary</Button>
            <Button variant="outline">Save Progress</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CDI3ConsumerUnderstanding;