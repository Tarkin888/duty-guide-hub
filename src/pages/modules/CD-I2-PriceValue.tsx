import { useState } from "react";
import { ArrowLeft, FileText, Download, Printer, CheckCircle2, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { useToast } from "@/hooks/use-toast";

export default function CDI2PriceValue() {
  const { toast } = useToast();
  const moduleId = "cd-i2";
  const [status, setStatus] = useState<string>("not-started");

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

  const handlePrint = () => {
    window.print();
  };

  const handleMarkComplete = () => {
    setStatus("complete");
    toast({
      title: "Module Completed",
      description: "CD-I2: Price & Value Outcome Implementation marked as complete",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Navigation */}
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="text-sm">Four Outcomes</Badge>
            <Badge variant={status === "complete" ? "default" : "secondary"}>
              {status === "complete" ? "Complete" : status === "in-progress" ? "In Progress" : "Not Started"}
            </Badge>
          </div>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">CD-I2: Price & Value Outcome Implementation</h1>
              <p className="text-xl text-muted-foreground">
                Ensure a reasonable relationship exists between price and benefits across all products
              </p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Module
            </Button>
            <Button onClick={handleMarkComplete} disabled={status === "complete"}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
          </div>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
            <TabsTrigger value="steps">Implementation Steps</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Overview</CardTitle>
                <CardDescription>
                  Understanding the Price & Value Outcome requirements and deliverables
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Purpose</h3>
                  <p className="text-muted-foreground">
                    Ensure a reasonable relationship exists between the price paid by customers and the overall 
                    benefits received across all products and services.
                  </p>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Regulatory Requirement:</span>
                        <Badge variant="outline">PRIN 2A.4</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">8-14 weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phase:</span>
                        <span className="font-medium">Four Outcomes Implementation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mandatory For:</span>
                        <span className="font-medium">All Manufacturers</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Concept</h3>
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertTitle>Fair Value Assessment (FVA)</AlertTitle>
                      <AlertDescription>
                        A comprehensive evaluation of whether products and services provide a reasonable 
                        relationship between price and benefits, considering both financial and non-financial factors.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Deliverables</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Fair Value Assessment methodology",
                      "Completed FVAs for all products",
                      "Price benchmarking framework",
                      "Value for money scorecard",
                      "Review schedule",
                      "Remediation plans for poor value products",
                      "Differential outcomes analysis",
                      "Board attestation report"
                    ].map((deliverable, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Stakeholders Involved</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Board", "Senior Management", "Product Owners", "Pricing Team", "Finance", 
                      "Risk", "Compliance", "Customer Insights", "Distribution Partners"].map((stakeholder) => (
                      <Badge key={stakeholder} variant="secondary">{stakeholder}</Badge>
                    ))}
                  </div>
                </div>

                <Alert className="border-primary/50 bg-primary/5">
                  <AlertTitle>Target Outcome</AlertTitle>
                  <AlertDescription>
                    All products assessed for fair value with evidence-based judgments, differential outcomes 
                    analyzed, poor value products remediated, and ongoing monitoring established.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: REGULATORY FOUNDATION */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Requirements</CardTitle>
                <CardDescription>
                  PRIN 2A.4 - Price & Value Outcome requirements and FCA expectations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA Handbook"
                  reference="PRIN 2A.4"
                  quote="Manufacturers must ensure there is a reasonable relationship between the price paid by customers and the overall benefits received, taking into account the total price paid and the overall benefits of the product or service."
                  link="https://www.handbook.fca.org.uk/handbook/PRIN/2A/4.html"
                />

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="definitions">
                    <AccordionTrigger className="text-lg font-semibold">
                      Key Definitions
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Fair Value</h4>
                        <p className="text-muted-foreground mb-3">
                          A reasonable relationship between the total price paid and the overall benefits received, 
                          considering both financial and non-financial factors.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card className="bg-muted/50">
                            <CardHeader>
                              <CardTitle className="text-base">Total Price Includes</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Headline price/premium/fee</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Ongoing charges</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Transaction fees</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Exit penalties</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Ancillary charges</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Opportunity cost</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Non-monetary costs (time, effort, data)</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-muted/50">
                            <CardHeader>
                              <CardTitle className="text-base">Benefits Include</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3 text-sm">
                                <div>
                                  <p className="font-medium mb-1">Financial Benefits:</p>
                                  <ul className="space-y-1 ml-4">
                                    <li>• Investment returns</li>
                                    <li>• Claims payouts</li>
                                    <li>• Interest earned</li>
                                    <li>• Protection coverage</li>
                                    <li>• Access to capital</li>
                                  </ul>
                                </div>
                                <div>
                                  <p className="font-medium mb-1">Non-Financial Benefits:</p>
                                  <ul className="space-y-1 ml-4">
                                    <li>• Quality of service</li>
                                    <li>• Support provided</li>
                                    <li>• Speed/convenience</li>
                                    <li>• Brand trust</li>
                                    <li>• Peace of mind</li>
                                    <li>• Flexibility</li>
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fca-expectations">
                    <AccordionTrigger className="text-lg font-semibold">
                      FCA Expectations
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-4">
                        <RegulatoryQuote
                          source="FCA"
                          reference="FG22/5"
                          quote="Fair Value Assessment must be more than competitor benchmarking. Firms must consider their own costs and margins, assess differential outcomes, and specifically consider vulnerable customers."
                        />

                        <div className="grid gap-3">
                          {[
                            "FVA must be evidence-based, not just assertions",
                            "Must consider both financial and non-financial benefits",
                            "Must assess differential outcomes (not just averages)",
                            "Must specifically consider vulnerable customers",
                            "Must be proportionate but thorough",
                            "Must review regularly (at least annually)",
                            "Must take action if poor value identified"
                          ].map((expectation, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{expectation}</span>
                            </div>
                          ))}
                        </div>

                        <Alert className="border-warning/50 bg-warning/5">
                          <AlertTitle>FCA Requirement</AlertTitle>
                          <AlertDescription>
                            "Where a firm identifies that a product or service does not provide fair value, 
                            it must take appropriate action to address the issue."
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="manufacturer-distributor">
                    <AccordionTrigger className="text-lg font-semibold">
                      Manufacturer vs Distributor Obligations
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="border-primary">
                          <CardHeader>
                            <CardTitle className="text-base">Manufacturer Obligations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Conduct comprehensive Fair Value Assessment</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Review regularly (annual minimum)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Share FVA summary with distributors</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Take remedial action on poor value products</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Consider distributor feedback on value</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="border-secondary">
                          <CardHeader>
                            <CardTitle className="text-base">Distributor Obligations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Consider value in relation to own charges</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Ensure own charges don't undermine overall value</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Review manufacturer FVA summaries</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Provide feedback to manufacturers on value concerns</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Stop distributing poor value products</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fca-findings">
                    <AccordionTrigger className="text-lg font-semibold">
                      FCA Multi-Firm Review Findings (November 2025)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <Alert className="border-warning/50 bg-warning/5">
                        <AlertTitle>Common Weaknesses Identified</AlertTitle>
                        <AlertDescription>
                          <ul className="space-y-2 mt-2">
                            <li>• Many FVAs relied solely on price benchmarking</li>
                            <li>• Insufficient consideration of non-price factors</li>
                            <li>• Inadequate analysis of differential outcomes</li>
                            <li>• Poor quality MI to support assessments</li>
                            <li>• Lack of evidence for value judgments</li>
                            <li>• Remediation plans missing or incomplete</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: IMPLEMENTATION STEPS */}
          <TabsContent value="steps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Roadmap</CardTitle>
                <CardDescription>
                  Four-phase approach to implementing Fair Value Assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Implementation Timeline</AlertTitle>
                  <AlertDescription>
                    Complete implementation typically takes 8-14 weeks, followed by ongoing monitoring. 
                    Progress through phases sequentially, ensuring governance approval at key stages.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Phase 1: Methodology Development */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="text-base py-1 px-3">Phase 1</Badge>
                <h3 className="text-xl font-semibold">Methodology Development (Weeks 1-3)</h3>
              </div>

              <ChecklistSection
                stepNumber={1}
                title="Design Fair Value Assessment Methodology"
                description="Create comprehensive FVA framework and approach"
                moduleId={moduleId}
                items={[
                  {
                    id: "fva-structure",
                    label: "Define FVA structure and assessment approach",
                    details: "Determine whether to use quantitative scoring, qualitative judgments, or hybrid approach",
                    responsible: "Head of Product / Compliance",
                    duration: "3-5 days"
                  },
                  {
                    id: "fva-factors",
                    label: "Determine assessment factors and weightings",
                    details: "Identify all factors to consider (price, benefits, service, etc.) and relative importance",
                    responsible: "Product Team / Risk",
                    duration: "2-3 days"
                  },
                  {
                    id: "fva-evidence",
                    label: "Establish evidence requirements",
                    details: "Define what data and documentation must support each FVA judgment",
                    responsible: "Compliance / Risk",
                    duration: "2 days"
                  },
                  {
                    id: "fva-frequency",
                    label: "Define review frequency by product type",
                    details: "Set annual minimum plus triggers for ad-hoc reviews (e.g., material changes)",
                    responsible: "Product Governance Committee",
                    duration: "1-2 days"
                  },
                  {
                    id: "fva-scoring",
                    label: "Create assessment scoring/rating system",
                    details: "Define RAG criteria or numerical scoring scale with clear thresholds",
                    responsible: "Product Team",
                    duration: "2 days"
                  },
                  {
                    id: "fva-document",
                    label: "Document methodology comprehensively",
                    details: "Create methodology document covering all aspects of FVA approach",
                    responsible: "Compliance",
                    duration: "3-4 days"
                  },
                  {
                    id: "fva-approval",
                    label: "Obtain governance approval",
                    details: "Present methodology to Board/governance committee for approval",
                    responsible: "Senior Management",
                    duration: "1 week"
                  }
                ]}
                templateLink={{
                  name: "Fair Value Assessment Methodology Template",
                  onClick: () => handleDownload("FVA Methodology Template")
                }}
              />

              <ChecklistSection
                stepNumber={2}
                title="Develop Price Benchmarking Framework"
                description="Establish competitor comparison approach"
                moduleId={moduleId}
                items={[
                  {
                    id: "bench-competitors",
                    label: "Identify competitor products for comparison",
                    details: "List primary and secondary competitors with similar products",
                    responsible: "Product / Market Intelligence",
                    duration: "2-3 days"
                  },
                  {
                    id: "bench-sources",
                    label: "Define data sources (public, purchased, estimated)",
                    details: "Identify where competitor pricing data will come from",
                    responsible: "Market Intelligence",
                    duration: "1-2 days"
                  },
                  {
                    id: "bench-criteria",
                    label: "Establish like-for-like comparison criteria",
                    details: "Define how to adjust for feature differences when comparing",
                    responsible: "Product Team",
                    duration: "2 days"
                  },
                  {
                    id: "bench-limitations",
                    label: "Document limitations of benchmarking",
                    details: "Acknowledge that benchmarking alone is insufficient for FVA",
                    responsible: "Compliance",
                    duration: "1 day"
                  },
                  {
                    id: "bench-templates",
                    label: "Create benchmarking templates",
                    details: "Develop standardized templates for capturing competitor data",
                    responsible: "Product Team",
                    duration: "2 days"
                  }
                ]}
                templateLink={{
                  name: "Price Benchmarking Framework Template",
                  onClick: () => handleDownload("Price Benchmarking Framework")
                }}
              />

              <ChecklistSection
                stepNumber={3}
                title="Create Value Measurement Framework"
                description="Define how to assess and quantify benefits"
                moduleId={moduleId}
                items={[
                  {
                    id: "value-financial",
                    label: "Define how to quantify financial benefits",
                    details: "Methodology for measuring returns, claims ratios, interest, etc.",
                    responsible: "Finance / Actuarial",
                    duration: "3-4 days"
                  },
                  {
                    id: "value-nonfinancial",
                    label: "Define how to assess non-financial benefits",
                    details: "Framework for evaluating service quality, convenience, support, brand trust",
                    responsible: "Customer Experience / Product",
                    duration: "3-4 days"
                  },
                  {
                    id: "value-scoring",
                    label: "Create value scoring methodology",
                    details: "How to combine financial and non-financial factors into overall score",
                    responsible: "Product Team",
                    duration: "2-3 days"
                  },
                  {
                    id: "value-surveys",
                    label: "Develop customer value perception surveys (if used)",
                    details: "Optional: Create surveys to understand customer perception of value",
                    responsible: "Customer Insights",
                    duration: "5-7 days"
                  }
                ]}
                templateLink={{
                  name: "Value Measurement Framework Template",
                  onClick: () => handleDownload("Value Measurement Framework")
                }}
              />
            </div>

            {/* Phase 2: Data Collection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="text-base py-1 px-3">Phase 2</Badge>
                <h3 className="text-xl font-semibold">Data Collection & Analysis (Weeks 3-8)</h3>
              </div>

              <ChecklistSection
                stepNumber={4}
                title="Gather Cost Data"
                description="Collect comprehensive cost information for each product"
                moduleId={moduleId}
                items={[
                  {
                    id: "cost-direct",
                    label: "Direct costs (manufacturing, administration)",
                    details: "Costs directly attributable to product delivery",
                    responsible: "Finance",
                    duration: "1 week"
                  },
                  {
                    id: "cost-indirect",
                    label: "Indirect costs (overhead allocation)",
                    details: "Shared costs allocated to product using appropriate methodology",
                    responsible: "Finance",
                    duration: "1 week"
                  },
                  {
                    id: "cost-distribution",
                    label: "Distribution costs",
                    details: "Costs of selling and distributing product",
                    responsible: "Finance / Sales",
                    duration: "3-5 days"
                  },
                  {
                    id: "cost-marketing",
                    label: "Marketing costs",
                    details: "Customer acquisition and retention costs",
                    responsible: "Marketing / Finance",
                    duration: "3-5 days"
                  },
                  {
                    id: "cost-servicing",
                    label: "Servicing costs",
                    details: "Ongoing customer support and administration costs",
                    responsible: "Operations / Finance",
                    duration: "3-5 days"
                  },
                  {
                    id: "cost-capital",
                    label: "Capital/regulatory costs",
                    details: "Cost of capital held against product risks",
                    responsible: "Finance / Risk",
                    duration: "5-7 days"
                  },
                  {
                    id: "cost-margin",
                    label: "Expected profit margin",
                    details: "Understand target and actual margins (not disclosed to FCA but relevant to FVA)",
                    responsible: "Finance",
                    duration: "2-3 days"
                  }
                ]}
              />

              <ChecklistSection
                stepNumber={5}
                title="Gather Benefits Data"
                description="Collect evidence of benefits delivered to customers"
                moduleId={moduleId}
                items={[
                  {
                    id: "benefits-financial",
                    label: "Financial performance data (returns, claims paid, etc.)",
                    details: "Quantitative evidence of financial benefits realized by customers",
                    responsible: "Finance / Actuarial",
                    duration: "1 week"
                  },
                  {
                    id: "benefits-service",
                    label: "Service quality metrics",
                    details: "Response times, resolution rates, service availability data",
                    responsible: "Operations / Customer Service",
                    duration: "3-5 days"
                  },
                  {
                    id: "benefits-satisfaction",
                    label: "Customer satisfaction data",
                    details: "NPS, CSAT scores, customer feedback analysis",
                    responsible: "Customer Insights",
                    duration: "3-5 days"
                  },
                  {
                    id: "benefits-features",
                    label: "Features and functionality inventory",
                    details: "List all product features and assess usage/value",
                    responsible: "Product Team",
                    duration: "2-3 days"
                  },
                  {
                    id: "benefits-accessibility",
                    label: "Accessibility and convenience factors",
                    details: "Channel availability, ease of use, digital capabilities",
                    responsible: "Digital / Operations",
                    duration: "2-3 days"
                  },
                  {
                    id: "benefits-support",
                    label: "Support quality measures",
                    details: "Effectiveness of customer support and guidance provided",
                    responsible: "Customer Support",
                    duration: "2-3 days"
                  },
                  {
                    id: "benefits-complaints",
                    label: "Complaints and issues data",
                    details: "Analysis of complaints related to value for money",
                    responsible: "Compliance / Customer Service",
                    duration: "3-5 days"
                  }
                ]}
              />

              <ChecklistSection
                stepNumber={6}
                title="Conduct Price Benchmarking"
                description="Compare pricing to market competitors"
                moduleId={moduleId}
                items={[
                  {
                    id: "price-identify",
                    label: "Identify comparable competitor products",
                    details: "Match each product to 3-5 similar competitor offerings",
                    responsible: "Product / Market Intelligence",
                    duration: "1 week"
                  },
                  {
                    id: "price-gather",
                    label: "Gather competitor pricing data",
                    details: "Collect current pricing from all identified competitors",
                    responsible: "Market Intelligence",
                    duration: "1 week"
                  },
                  {
                    id: "price-normalize",
                    label: "Normalize for feature differences",
                    details: "Adjust comparisons for different features, coverage levels, etc.",
                    responsible: "Product Team",
                    duration: "5-7 days"
                  },
                  {
                    id: "price-position",
                    label: "Calculate price position (premium, mid, value)",
                    details: "Determine where product sits in market pricing distribution",
                    responsible: "Product / Pricing",
                    duration: "2-3 days"
                  },
                  {
                    id: "price-rationale",
                    label: "Document rationale for price differences",
                    details: "Explain why product is priced above/below/at market level",
                    responsible: "Product / Pricing",
                    duration: "3-5 days"
                  }
                ]}
                templateLink={{
                  name: "Price Benchmarking Analysis Template",
                  onClick: () => handleDownload("Price Benchmarking Analysis")
                }}
              />

              <ChecklistSection
                stepNumber={7}
                title="Analyze Differential Outcomes"
                description="Critical: Assess value for different customer segments"
                moduleId={moduleId}
                items={[
                  {
                    id: "diff-segment",
                    label: "Segment customer base (by age, tenure, channel, etc.)",
                    details: "Create meaningful customer segments for value analysis",
                    responsible: "Customer Insights / Product",
                    duration: "1 week"
                  },
                  {
                    id: "diff-calculate",
                    label: "Calculate value metrics by segment",
                    details: "Assess price paid and benefits received for each segment",
                    responsible: "Finance / Actuarial / Analytics",
                    duration: "2 weeks"
                  },
                  {
                    id: "diff-identify",
                    label: "Identify segments receiving lower value",
                    details: "Highlight where specific groups get worse deal than average",
                    responsible: "Analytics / Product",
                    duration: "3-5 days"
                  },
                  {
                    id: "diff-justify",
                    label: "Assess whether differences are justified",
                    details: "Determine if legitimate reasons exist for value differences",
                    responsible: "Product / Compliance",
                    duration: "5-7 days"
                  },
                  {
                    id: "diff-vulnerable",
                    label: "Particular focus on vulnerable customers",
                    details: "Specific analysis using four drivers of vulnerability model",
                    responsible: "Vulnerability Lead / Product",
                    duration: "5-7 days"
                  }
                ]}
                templateLink={{
                  name: "Differential Outcomes Analysis Template",
                  onClick: () => handleDownload("Differential Outcomes Analysis")
                }}
              />
            </div>

            {/* Phase 3: FVA Execution */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="text-base py-1 px-3">Phase 3</Badge>
                <h3 className="text-xl font-semibold">Fair Value Assessment Execution (Weeks 6-12)</h3>
              </div>

              <ChecklistSection
                stepNumber={8}
                title="Conduct Fair Value Assessments"
                description="Complete structured FVA for each product"
                moduleId={moduleId}
                items={[
                  {
                    id: "fva-overview",
                    label: "Section 1: Product Overview",
                    details: "Product details, target market summary, pricing structure, customer numbers",
                    responsible: "Product Owner",
                    duration: "1-2 hours per product"
                  },
                  {
                    id: "fva-price",
                    label: "Section 2: Price Analysis",
                    details: "Total price breakdown, benchmark comparison, price-to-market position",
                    responsible: "Pricing / Product",
                    duration: "2-4 hours per product"
                  },
                  {
                    id: "fva-benefits",
                    label: "Section 3: Benefits Analysis",
                    details: "Financial and non-financial benefits, realization analysis, market comparison",
                    responsible: "Product / Analytics",
                    duration: "4-8 hours per product"
                  },
                  {
                    id: "fva-costs",
                    label: "Section 4: Cost Analysis",
                    details: "Firm's cost base, margin analysis, cost-to-serve",
                    responsible: "Finance / Product",
                    duration: "2-4 hours per product"
                  },
                  {
                    id: "fva-differential",
                    label: "Section 5: Differential Outcomes",
                    details: "Segmentation analysis, value by segment, disadvantaged groups",
                    responsible: "Analytics / Product",
                    duration: "4-6 hours per product"
                  },
                  {
                    id: "fva-contextual",
                    label: "Section 6: Contextual Factors",
                    details: "Market conditions, complexity, vulnerability, competitive landscape",
                    responsible: "Product / Compliance",
                    duration: "2-3 hours per product"
                  },
                  {
                    id: "fva-judgment",
                    label: "Section 7: Overall Assessment",
                    details: "Fair value judgment with rationale, evidence, concerns, actions",
                    responsible: "Product Owner / Compliance",
                    duration: "2-4 hours per product"
                  },
                  {
                    id: "fva-governance",
                    label: "Section 8: Governance Sign-Off",
                    details: "Approval by appropriate authority (Product Committee / Board)",
                    responsible: "Senior Management",
                    duration: "Varies"
                  }
                ]}
                templateLink={{
                  name: "Complete Fair Value Assessment Template",
                  onClick: () => handleDownload("Fair Value Assessment Template")
                }}
              />

              <ChecklistSection
                stepNumber={9}
                title="Value for Money Scorecard"
                description="Create summary scorecard for each product"
                moduleId={moduleId}
                items={[
                  {
                    id: "scorecard-price",
                    label: "Price score (1-5 scale)",
                    details: "How competitive is the price relative to market and benefits?",
                    responsible: "Product / Pricing",
                    duration: "30 mins per product"
                  },
                  {
                    id: "scorecard-benefits",
                    label: "Benefits score (1-5 scale)",
                    details: "Quality and quantum of financial and non-financial benefits",
                    responsible: "Product Team",
                    duration: "30 mins per product"
                  },
                  {
                    id: "scorecard-service",
                    label: "Service quality score (1-5 scale)",
                    details: "Quality of customer service and support",
                    responsible: "Customer Service / Operations",
                    duration: "30 mins per product"
                  },
                  {
                    id: "scorecard-accessibility",
                    label: "Accessibility score (1-5 scale)",
                    details: "Ease of access and use for target market including vulnerable customers",
                    responsible: "Digital / Vulnerability Lead",
                    duration: "30 mins per product"
                  },
                  {
                    id: "scorecard-understanding",
                    label: "Customer understanding score (1-5 scale)",
                    details: "Clarity of communications and customer comprehension",
                    responsible: "Communications / Product",
                    duration: "30 mins per product"
                  },
                  {
                    id: "scorecard-overall",
                    label: "Overall value score and RAG rating",
                    details: "Weighted average or holistic judgment with Green/Amber/Red status",
                    responsible: "Product Owner",
                    duration: "30 mins per product"
                  }
                ]}
                templateLink={{
                  name: "Value for Money Scorecard Template",
                  onClick: () => handleDownload("Value Scorecard")
                }}
              />
            </div>

            {/* Phase 4: Remediation & Monitoring */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="text-base py-1 px-3">Phase 4</Badge>
                <h3 className="text-xl font-semibold">Remediation & Monitoring (Weeks 10-14, then ongoing)</h3>
              </div>

              <ChecklistSection
                stepNumber={10}
                title="Address Poor Value Products"
                description="Remediate products assessed as poor value"
                moduleId={moduleId}
                items={[
                  {
                    id: "remedy-identify",
                    label: "Identify root cause (price too high? benefits too low?)",
                    details: "Understand why product doesn't offer fair value",
                    responsible: "Product / Finance",
                    duration: "Varies by product"
                  },
                  {
                    id: "remedy-options",
                    label: "Develop remediation options",
                    details: "Consider: reduce price, enhance benefits, improve service, facilitate switching, or withdraw",
                    responsible: "Product / Senior Management",
                    duration: "1-2 weeks per product"
                  },
                  {
                    id: "remedy-impact",
                    label: "Assess customer impact of each option",
                    details: "Understand consequences for existing customers of different remedies",
                    responsible: "Product / Customer Insights",
                    duration: "1 week per product"
                  },
                  {
                    id: "remedy-select",
                    label: "Select and implement remedy",
                    details: "Choose appropriate action and execute implementation plan",
                    responsible: "Product / Operations",
                    duration: "4-12 weeks per product"
                  },
                  {
                    id: "remedy-communicate",
                    label: "Communicate with affected customers",
                    details: "Inform customers of changes or options available to them",
                    responsible: "Communications / Customer Service",
                    duration: "2-4 weeks"
                  },
                  {
                    id: "remedy-reassess",
                    label: "Re-assess after remediation",
                    details: "Conduct follow-up FVA to confirm value improved",
                    responsible: "Product Owner",
                    duration: "1-2 weeks"
                  }
                ]}
                templateLink={{
                  name: "Value Remediation Plan Template",
                  onClick: () => handleDownload("Remediation Plan")
                }}
              />

              <ChecklistSection
                stepNumber={11}
                title="Establish Ongoing Monitoring"
                description="Create sustainable FVA review process"
                moduleId={moduleId}
                items={[
                  {
                    id: "monitor-frequency",
                    label: "Define FVA review frequency (annual minimum)",
                    details: "Set regular review cycle for each product based on risk and complexity",
                    responsible: "Product Governance Committee",
                    duration: "2-3 days"
                  },
                  {
                    id: "monitor-triggers",
                    label: "Set review triggers",
                    details: "Define events requiring ad-hoc FVA: cost changes, market shifts, complaints, etc.",
                    responsible: "Product / Risk / Compliance",
                    duration: "2-3 days"
                  },
                  {
                    id: "monitor-ownership",
                    label: "Assign ongoing ownership",
                    details: "Clarify who owns FVA for each product going forward",
                    responsible: "Senior Management",
                    duration: "1-2 days"
                  },
                  {
                    id: "monitor-dashboard",
                    label: "Create monitoring dashboard",
                    details: "Develop MI dashboard showing FVA status, review dates, RAG ratings",
                    responsible: "Analytics / MI Team",
                    duration: "2-3 weeks"
                  },
                  {
                    id: "monitor-governance",
                    label: "Integrate into governance reporting",
                    details: "Regular FVA updates to Board/governance committees",
                    responsible: "Compliance / Product",
                    duration: "Ongoing"
                  }
                ]}
                templateLink={{
                  name: "FVA Monitoring & Review Schedule",
                  onClick: () => handleDownload("Monitoring Schedule")
                }}
              />

              <ChecklistSection
                stepNumber={12}
                title="Board & Executive Reporting"
                description="Prepare comprehensive FVA summary for governance"
                moduleId={moduleId}
                items={[
                  {
                    id: "board-summary",
                    label: "Prepare FVA summary for Board",
                    details: "Executive summary of methodology, findings, and actions",
                    responsible: "Compliance / Product",
                    duration: "1 week"
                  },
                  {
                    id: "board-rag",
                    label: "Report on products in each RAG category",
                    details: "Breakdown of products rated Green, Amber, Red with explanations",
                    responsible: "Product / Compliance",
                    duration: "2-3 days"
                  },
                  {
                    id: "board-remediation",
                    label: "Highlight remediation actions",
                    details: "Status of actions taken or planned for poor value products",
                    responsible: "Product",
                    duration: "2-3 days"
                  },
                  {
                    id: "board-attestation",
                    label: "Obtain Board attestation",
                    details: "Board formally confirms reasonable grounds for fair value assessments",
                    responsible: "Board / Executive Committee",
                    duration: "Board meeting"
                  }
                ]}
                templateLink={{
                  name: "Board FVA Report Template",
                  onClick: () => handleDownload("Board Report")
                }}
              />
            </div>
          </TabsContent>

          {/* TAB 4: TEMPLATES & TOOLS */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates & Tools</CardTitle>
                <CardDescription>
                  Comprehensive toolkit for Fair Value Assessment implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <Download className="h-4 w-4" />
                  <AlertTitle>Template Library</AlertTitle>
                  <AlertDescription>
                    All templates are fully editable and designed to support proportionate implementation. 
                    Customize to your firm's size, complexity, and risk profile.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <TemplateCard
                title="Fair Value Assessment Methodology Document"
                description="Comprehensive methodology outlining approach, factors, evidence requirements, scoring system, review frequency, and governance"
                format="Word"
                onDownload={() => handleDownload("FVA Methodology Document")}
                onPreview={() => handlePreview("FVA Methodology Document")}
              />

              <TemplateCard
                title="Fair Value Assessment Template (Master)"
                description="Detailed Excel workbook with 8 tabs covering product details, price analysis, benefits analysis, cost analysis, benchmarking, differential outcomes, contextual factors, and governance"
                format="Excel"
                onDownload={() => handleDownload("Fair Value Assessment Template")}
                onPreview={() => handlePreview("Fair Value Assessment Template")}
              />

              <TemplateCard
                title="Price Benchmarking Template"
                description="Comparison table format for competitor pricing analysis with feature matrix, like-for-like adjustments, and market position calculation"
                format="Excel"
                onDownload={() => handleDownload("Price Benchmarking Template")}
                onPreview={() => handlePreview("Price Benchmarking Template")}
              />

              <TemplateCard
                title="Value for Money Scorecard"
                description="One-page summary per product with 5-dimension scores, spider diagram visualization, RAG status, and key strengths/weaknesses"
                format="PowerPoint"
                onDownload={() => handleDownload("Value Scorecard")}
                onPreview={() => handlePreview("Value Scorecard")}
              />

              <TemplateCard
                title="Differential Outcomes Analysis Template"
                description="Segmentation analysis framework showing value by customer segment, variance from average, vulnerable customer impact, and remediation actions"
                format="Excel"
                onDownload={() => handleDownload("Differential Outcomes Analysis")}
                onPreview={() => handlePreview("Differential Outcomes Analysis")}
              />

              <TemplateCard
                title="Value Remediation Plan Template"
                description="Action plan structure for poor value products including root cause analysis, options considered, implementation plan, and customer communication"
                format="Word"
                onDownload={() => handleDownload("Remediation Plan")}
                onPreview={() => handlePreview("Remediation Plan")}
              />

              <TemplateCard
                title="FVA Monitoring Dashboard Specification"
                description="Dashboard design showing products by RAG status, review schedule, overdue reviews, trend analysis, trigger events, and action tracker"
                format="PowerPoint"
                onDownload={() => handleDownload("Monitoring Dashboard")}
                onPreview={() => handlePreview("Monitoring Dashboard")}
              />

              <TemplateCard
                title="Board FVA Report Template"
                description="Executive summary format covering assessment period, findings by RAG status, key issues, remediation status, vulnerable customer considerations, and attestation statement"
                format="PowerPoint"
                onDownload={() => handleDownload("Board Report")}
                onPreview={() => handlePreview("Board Report")}
              />
            </div>
          </TabsContent>

          {/* TAB 5: SUCCESS CRITERIA */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Criteria</CardTitle>
                <CardDescription>
                  Clear measures of successful Fair Value Assessment implementation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Success Measures</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "FVA methodology approved by Board/governance committee",
                      "All in-scope products assessed (target: 100%)",
                      "Evidence-based assessment for each product",
                      "Differential outcomes analyzed for all products",
                      "Vulnerable customers specifically considered",
                      "Poor value products identified and remediation plans in place",
                      "Distributors provided with FVA summaries",
                      "Ongoing monitoring framework operational",
                      "Board attestation obtained"
                    ].map((criterion, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Metrics to Track</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-base">Assessment Completion</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Products assessed:</span>
                          <span className="font-semibold">X of Y (100% target)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Products rated Green:</span>
                          <span className="font-semibold text-success">X (%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Products rated Amber:</span>
                          <span className="font-semibold text-warning">X (%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Products rated Red:</span>
                          <span className="font-semibold text-destructive">X (%)</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-base">Process Efficiency</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average days to complete FVA:</span>
                          <span className="font-semibold">X days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Remediation actions completed:</span>
                          <span className="font-semibold">X of Y</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next review dates defined:</span>
                          <span className="font-semibold">100%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Quality Indicators</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Evidence documented for all judgments", description: "Clear audit trail from data to conclusion" },
                      { label: "Benchmarking completed where relevant", description: "Competitor pricing considered but not sole factor" },
                      { label: "Non-price factors assessed", description: "Service quality, support, convenience evaluated" },
                      { label: "Differential outcomes analyzed", description: "Value assessed by customer segment" },
                      { label: "Board approval obtained", description: "Governance sign-off on methodology and findings" }
                    ].map((indicator, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{indicator.label}</p>
                            <p className="text-sm text-muted-foreground mt-1">{indicator.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Alert className="border-primary/50 bg-primary/5">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success Outcome</AlertTitle>
                  <AlertDescription>
                    All products have been assessed using an evidence-based, Board-approved methodology. 
                    Differential outcomes have been analyzed, poor value products have remediation plans, 
                    and an ongoing monitoring framework ensures sustained compliance.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 6: COMMON PITFALLS */}
          <TabsContent value="pitfalls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Pitfalls</CardTitle>
                <CardDescription>
                  Learn from FCA multi-firm review findings to avoid common mistakes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="border-warning/50 bg-warning/5">
                  <AlertTitle>Based on FCA Findings</AlertTitle>
                  <AlertDescription>
                    These pitfalls are drawn from FCA multi-firm reviews conducted in 2024-2025. 
                    Many firms made similar mistakes - learn from their experience.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <PitfallCard
                title="Benchmarking as Only Assessment"
                description="FCA Finding: 'Many firms relied solely on price comparison to competitors.' This approach fails to consider whether benefits actually justify the price, or the firm's own cost base and service standards."
                impact="Assessment doesn't demonstrate fair value, just market positioning. Products priced at market average might still be poor value if benefits are weak. Conversely, premium-priced products might offer fair value if benefits are superior."
                prevention="Use benchmarking as one input, not the entire assessment. Must also consider firm's costs, benefits delivered, service quality, differential outcomes, and vulnerable customer impact. Example: Product priced 10% above market might still offer fair value if service quality is significantly better."
              />

              <PitfallCard
                title="Ignoring Non-Financial Benefits"
                description="FCA Finding: 'Assessments focused only on quantifiable financial returns such as investment performance or claims ratios.' This undervalues products where the main benefits are service, support, convenience, or peace of mind."
                impact="Products with strong non-financial benefits (e.g., high-touch support, extensive educational resources, user-friendly digital tools) may be incorrectly assessed as poor value when they actually provide fair value overall."
                prevention="Develop methodology to assess and appropriately weight non-financial benefits. Consider service quality metrics, customer satisfaction data, accessibility measures, and convenience factors. Use customer feedback and behavioral data to understand what customers value."
              />

              <PitfallCard
                title="Averaging Hides Poor Outcomes"
                description="FCA Finding: 'Firms assessed value on average without segmentation analysis.' This allows some customer groups to receive systematically poor value while the overall average appears acceptable."
                impact="Long-standing customers might pay significantly more for same benefits as new customers. Vulnerable customers might receive worse value. Branch customers might get worse deal than digital customers. These issues are hidden when only looking at averages."
                prevention="Mandatory differential outcomes analysis. Segment by tenure, channel, balance/sum assured, vulnerability characteristics, and other relevant factors. Identify segments receiving below-average value and assess whether differences are justified. Example: Back book customers paying more requires specific justification or remediation."
              />

              <PitfallCard
                title="Insufficient Evidence"
                description="FCA Finding: 'Value assertions not backed by data and analysis. Claims that product offers fair value without supporting evidence.' Statements like 'we believe the product is good value' without demonstrating how that conclusion was reached."
                impact="Cannot demonstrate 'reasonable grounds' for fair value conclusion as required by regulation. Assessment would not withstand regulatory scrutiny or challenge. No basis for confident Board attestation."
                prevention="Document all data sources, calculations, assumptions, and rationale. Create clear audit trail from evidence to conclusion. For each assertion, ask 'what evidence supports this?' and ensure it's documented. Include: pricing data, cost analysis, benefits quantification, customer outcomes data, benchmarking results, differential outcomes analysis."
              />

              <PitfallCard
                title="No Action on Poor Value"
                description="FCA Finding: 'Firms identified products as poor value but took no remedial action, or action was inadequate to address the value gap.' FCA Quote: 'Where a firm identifies that a product does not provide fair value, it must take appropriate action to address the issue.'"
                impact="Continued customer harm. Regulatory breach. Potential enforcement action. Reputational damage. Failure to meet Consumer Duty requirements even after identifying issues."
                prevention="Mandatory remediation plan for any Amber or Red ratings. Options include: reduce price, enhance benefits, improve service quality, facilitate customer switching to better value alternatives, or withdraw product. Track remediation actions to completion. Re-assess after changes to confirm value improved. Board oversight of remediation progress."
              />

              <PitfallCard
                title="One-Off Assessment"
                description="FCA Finding: 'Firms treated FVA as one-time compliance exercise completed by July 2023 deadline, with no plans for ongoing review.' Value can deteriorate over time due to cost increases, benefit reductions, market changes, or competitor improvements."
                impact="Products that offered fair value at initial assessment may no longer do so. Firm doesn't identify emerging value issues until customer harm has occurred. Fails to meet regulatory requirement for ongoing assessment."
                prevention="Annual review minimum for all products. More frequent review if risk factors present (e.g., volatile costs, fast-moving market). Define review triggers for ad-hoc assessments: material cost changes, market condition shifts, competitor pricing changes, poor customer outcomes, complaints trends, regulatory feedback. Integrate FVA into business-as-usual governance and monitoring."
              />

              <PitfallCard
                title="Ignoring Vulnerable Customers"
                description="FCA Finding: 'No specific analysis of fair value for vulnerable customers. Vulnerability mentioned generically but not analyzed in detail.' Fails to identify if vulnerable segments disproportionately receive poor value."
                impact="Vulnerable customers may systematically receive worse value (e.g., paying more, receiving fewer benefits, getting poorer service). Higher risk of consumer harm to those least able to bear it. Misses key Consumer Duty requirement to specifically consider vulnerable customers."
                prevention="Use four drivers of vulnerability model (health, life events, resilience, capability) to identify vulnerable segments. Conduct specific differential outcomes analysis for vulnerable customer groups. Assess if product design, pricing, or distribution creates worse outcomes for vulnerable customers. If value differences exist, determine if they're justified or require remediation."
              />

              <PitfallCard
                title="Distributor Ignores Own Charges"
                description="FCA Finding: 'Distributors assumed manufacturer's FVA was sufficient and didn't assess impact of their own distribution charges on overall value to customer.' Distributor's margins, advice fees, or platform charges can tip a product from fair value to poor value."
                impact="Cumulative charges across distribution chain may result in poor overall value even if manufacturer's component is fair. Customer pays total price but distributor hasn't assessed if total price represents fair value. Regulatory breach by distributor."
                prevention="Distributors must assess whether their own charges, when combined with manufacturer's price, result in fair overall value for the customer. If distributor charges are high relative to service provided, may need to reduce charges, enhance service, or stop distributing that product. Manufacturers should provide FVA summaries to distributors to facilitate this assessment."
              />
            </div>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Learn More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Additional resources on Fair Value Assessment best practices and common weaknesses:
                </p>
                <div className="space-y-2">
                  <a href="#" className="text-sm text-primary hover:underline block">
                    → FCA Multi-Firm Review: Fair Value Findings (2024)
                  </a>
                  <a href="#" className="text-sm text-primary hover:underline block">
                    → Good and Poor Practice Examples: Price & Value Outcome
                  </a>
                  <a href="#" className="text-sm text-primary hover:underline block">
                    → FCA Enforcement Cases: Fair Value Breaches
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
