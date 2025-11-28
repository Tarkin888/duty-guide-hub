import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Printer, CheckCircle2, Clock, Users, AlertCircle, FileText, Scale, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { toast } from "sonner";
import { getModuleStatus, updateModuleStatus } from "@/lib/storage";

export default function CDF2RequirementsMapping() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(() => getModuleStatus("cd-f2-requirements"));

  const handleMarkComplete = () => {
    updateModuleStatus("cd-f2-requirements", "completed");
    setStatus("completed");
    toast.success("Module marked as complete!");
  };

  const handlePrint = () => window.print();
  const handleDownload = (templateName: string) => {
    toast.info(`Downloading ${templateName}...`);
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="text-sm">CD-F2</Badge>
              <Badge className="text-sm">Foundation Module</Badge>
              <Badge variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}>
                {status === "completed" ? "✓ Complete" : status === "in-progress" ? "In Progress" : "Not Started"}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold">Regulatory Requirements Mapping</h1>
            <p className="text-lg text-muted-foreground">
              Define complete scope of Consumer Duty regulatory obligations for your firm
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleMarkComplete} disabled={status === "completed"}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
          </div>
        </div>
        
        <div className="flex gap-6 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Duration: 3-4 weeks
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Phase: Foundation
          </span>
        </div>
      </div>

      <Separator />

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="steps">Implementation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="success">Success Criteria</TabsTrigger>
          <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Purpose & Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The Regulatory Requirements Mapping module establishes a comprehensive understanding of all 
                Consumer Duty obligations applicable to your firm. This creates the foundation for your 
                implementation program by clearly defining what you need to comply with and how requirements 
                map to your business activities.
              </p>
              
              <Alert className="bg-info/5 border-info/50">
                <AlertCircle className="h-4 w-4 text-info" />
                <AlertDescription>
                  <strong>Why This Matters:</strong> Consumer Duty introduces new obligations through PRIN 2A. 
                  A complete requirements map ensures nothing is missed and enables you to plan proportionate 
                  implementation based on your firm's role and activities.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: "📋", title: "Regulatory Obligations Register", desc: "Complete list of all applicable PRIN 2A requirements" },
                  { icon: "🔗", title: "Requirements Traceability Matrix", desc: "Linking requirements to controls and evidence" },
                  { icon: "🎯", title: "Scope Boundary Definition", desc: "Clear definition of what's in and out of scope" },
                  { icon: "📊", title: "Four Outcomes Detailed Breakdown", desc: "Comprehensive analysis of each outcome requirement" },
                  { icon: "🔄", title: "Distribution Chain Requirements Map", desc: "Clarification of manufacturer vs distributor obligations" },
                  { icon: "⚖️", title: "Regulatory Interaction Analysis", desc: "How Consumer Duty interacts with TCF, ICOBS, MCOB, etc." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/20">
                <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-2">Complete CD-F1: Readiness Assessment first</p>
                  <p className="text-sm text-muted-foreground">
                    The readiness assessment provides baseline understanding needed to properly scope 
                    and prioritize regulatory requirements mapping.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stakeholders Involved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["Compliance", "Legal", "Product", "Risk", "Operations", "Distribution", "Senior Management"].map((role) => (
                  <Badge key={role} variant="secondary">{role}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: REGULATORY FOUNDATION */}
        <TabsContent value="regulatory" className="space-y-6">
          <RegulatoryQuote
            source="FCA"
            reference="PRIN 2A.1.1R"
            quote="A firm must act to deliver good outcomes for retail customers. This requires a firm to act in good faith towards retail customers, avoid causing foreseeable harm to them and enable and support them to pursue their financial objectives."
            link="https://www.handbook.fca.org.uk/handbook/PRIN/2A/"
          />

          <Card>
            <CardHeader>
              <CardTitle>The Three-Tiered Structure</CardTitle>
              <CardDescription>
                Consumer Duty is structured in three tiers of increasing specificity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tier1">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary">Tier 1</Badge>
                      <span>Consumer Principle (Principle 12)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-l-primary">
                      <p className="font-medium mb-2">PRIN 2A.1.1R</p>
                      <p className="text-sm text-muted-foreground italic">
                        "A firm must act to deliver good outcomes for retail customers."
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This is the overarching principle that all firms must follow. It sets the high-level 
                      standard that everything you do should be directed towards delivering good outcomes 
                      for your retail customers.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tier2">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-accent text-accent-foreground">Tier 2</Badge>
                      <span>Cross-Cutting Rules</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <div className="space-y-4">
                      <div className="border-l-4 border-l-primary pl-4 py-3 bg-card rounded-r-lg">
                        <h4 className="font-semibold mb-2">1. Act in Good Faith (PRIN 2A.2.1R)</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          A firm must act in good faith towards retail customers. This means:
                        </p>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Being honest, open and transparent in dealings with customers</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Not exploiting customers' lack of knowledge or understanding</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Acting with integrity in customer relationships</span>
                          </li>
                        </ul>
                        <div className="mt-4 p-3 bg-muted/50 rounded text-sm">
                          <p className="font-medium mb-1">Example:</p>
                          <p className="text-muted-foreground">
                            A firm acts in good faith when it proactively alerts customers to better-value 
                            products even if it means lower revenue for the firm.
                          </p>
                        </div>
                      </div>

                      <div className="border-l-4 border-l-warning pl-4 py-3 bg-card rounded-r-lg">
                        <h4 className="font-semibold mb-2">2. Avoid Foreseeable Harm (PRIN 2A.2.2R)</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          A firm must avoid causing foreseeable harm to retail customers. This requires:
                        </p>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Proactively identifying potential sources of harm</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Taking reasonable steps to prevent harm from occurring</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Acting on harm that has been identified</span>
                          </li>
                        </ul>
                        <div className="mt-4 p-3 bg-muted/50 rounded text-sm">
                          <p className="font-medium mb-1">Example:</p>
                          <p className="text-muted-foreground">
                            Testing communications with vulnerable customers to ensure they don't cause 
                            confusion or lead to poor decisions.
                          </p>
                        </div>
                      </div>

                      <div className="border-l-4 border-l-secondary pl-4 py-3 bg-card rounded-r-lg">
                        <h4 className="font-semibold mb-2">3. Enable and Support (PRIN 2A.2.3R)</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          A firm must enable and support retail customers to pursue their financial objectives. This means:
                        </p>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Equipping customers to make effective decisions</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Providing appropriate support at key moments</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Removing unnecessary barriers to good outcomes</span>
                          </li>
                        </ul>
                        <div className="mt-4 p-3 bg-muted/50 rounded text-sm">
                          <p className="font-medium mb-1">Example:</p>
                          <p className="text-muted-foreground">
                            Making switching process simple and transparent, not using "sludge practices" 
                            to retain customers who would be better served elsewhere.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tier3">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-secondary">Tier 3</Badge>
                      <span>Four Outcomes</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      The Four Outcomes translate the high-level Principle and Cross-Cutting Rules into 
                      specific, measurable requirements across four key areas:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "Products & Services", ref: "PRIN 2A.3", color: "primary" },
                        { name: "Price & Value", ref: "PRIN 2A.4", color: "accent" },
                        { name: "Consumer Understanding", ref: "PRIN 2A.5", color: "secondary" },
                        { name: "Consumer Support", ref: "PRIN 2A.6", color: "success" },
                      ].map((outcome) => (
                        <div key={outcome.name} className="p-3 rounded-lg border bg-card">
                          <p className="font-semibold text-sm mb-1">{outcome.name}</p>
                          <Badge variant="outline" className="text-xs">{outcome.ref}</Badge>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      See detailed breakdown of each outcome in the sections below.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Four Outcomes: Detailed Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Products & Services Outcome */}
                <AccordionItem value="products">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Products & Services Outcome (PRIN 2A.3)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="PRIN 2A.3.1R"
                      quote="A firm must ensure that products and services in the retail market are designed to meet the needs, characteristics and objectives of customers, including vulnerable customers, in the target market."
                      link="https://www.handbook.fca.org.uk/handbook/PRIN/2A/3.html"
                    />

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3">Manufacturer Obligations:</h4>
                        <div className="space-y-3 pl-4">
                          <div className="border-l-2 border-primary pl-3">
                            <p className="font-medium text-sm mb-1">Product Approval Process (PRIN 2A.3.2R)</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Ensure products meet needs of identified target market</li>
                              <li>• Consider needs of vulnerable customers within target market</li>
                              <li>• Document how product meets customer needs</li>
                            </ul>
                          </div>
                          <div className="border-l-2 border-primary pl-3">
                            <p className="font-medium text-sm mb-1">Target Market Definition (PRIN 2A.3.3R)</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Define positive target market (who product is for)</li>
                              <li>• Define negative target market (who product is NOT for)</li>
                              <li>• Consider characteristics, needs, and objectives</li>
                            </ul>
                          </div>
                          <div className="border-l-2 border-primary pl-3">
                            <p className="font-medium text-sm mb-1">Testing & Validation (PRIN 2A.3.4R)</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Test products work as intended for target market</li>
                              <li>• Validate product features meet customer needs</li>
                              <li>• Review and test throughout product lifecycle</li>
                            </ul>
                          </div>
                          <div className="border-l-2 border-primary pl-3">
                            <p className="font-medium text-sm mb-1">Distribution Strategy (PRIN 2A.3.5R)</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Define appropriate distribution channels</li>
                              <li>• Ensure distributors understand product</li>
                              <li>• Monitor distribution remains appropriate</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Distributor Obligations:</h4>
                        <div className="space-y-3 pl-4">
                          <div className="border-l-2 border-accent pl-3">
                            <p className="font-medium text-sm mb-1">Distribution Arrangements (PRIN 2A.3.6R)</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Only distribute products appropriate for customers</li>
                              <li>• Understand products being distributed</li>
                              <li>• Match products to customer needs and characteristics</li>
                            </ul>
                          </div>
                          <div className="border-l-2 border-accent pl-3">
                            <p className="font-medium text-sm mb-1">Feedback to Manufacturers (PRIN 2A.3.7R)</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Provide feedback on product performance</li>
                              <li>• Alert manufacturers to issues or concerns</li>
                              <li>• Share customer outcomes data</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-warning/5 border-warning/50">
                        <AlertCircle className="h-4 w-4 text-warning" />
                        <AlertDescription className="text-sm">
                          <strong>Closed Products:</strong> Products closed to new business must continue 
                          to meet Consumer Duty standards. You cannot neglect customers in closed products.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price & Value Outcome */}
                <AccordionItem value="price">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-accent" />
                      <span>Price & Value Outcome (PRIN 2A.4)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="PRIN 2A.4.1R"
                      quote="A firm must offer fair value to retail customers. This means that the benefits a customer may reasonably expect from a product or service are proportionate to the total price they pay."
                      link="https://www.handbook.fca.org.uk/handbook/PRIN/2A/4.html"
                    />

                    <div className="space-y-4">
                      <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-l-primary">
                        <h4 className="font-semibold mb-3">Fair Value Assessment Requirements:</h4>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li className="flex gap-2">
                            <span>1.</span>
                            <span><strong>Total Price:</strong> Consider all costs including charges, fees, interest, and any non-monetary costs</span>
                          </li>
                          <li className="flex gap-2">
                            <span>2.</span>
                            <span><strong>Benefits:</strong> Assess both financial and non-financial benefits customers receive</span>
                          </li>
                          <li className="flex gap-2">
                            <span>3.</span>
                            <span><strong>Proportionality:</strong> Benefits must be proportionate to total price</span>
                          </li>
                          <li className="flex gap-2">
                            <span>4.</span>
                            <span><strong>Target Market:</strong> Assessment must consider needs and characteristics of target market</span>
                          </li>
                          <li className="flex gap-2">
                            <span>5.</span>
                            <span><strong>Context:</strong> Consider nature of product, market conditions, and customer expectations</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Methodology Expectations:</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <p className="font-medium text-sm mb-2">Quantitative Analysis</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li>• Cost analysis and breakdowns</li>
                              <li>• Profit margin assessment</li>
                              <li>• Price benchmarking</li>
                              <li>• Value metrics calculation</li>
                            </ul>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="font-medium text-sm mb-2">Qualitative Factors</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li>• Customer perception research</li>
                              <li>• Service quality assessment</li>
                              <li>• Convenience and accessibility</li>
                              <li>• Brand value consideration</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Review Frequency:</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• <strong>At least annually</strong> for all products</p>
                          <p>• <strong>More frequently</strong> if material changes occur (costs, benefits, market conditions)</p>
                          <p>• <strong>Ad-hoc reviews</strong> when customer outcomes data indicates issues</p>
                        </div>
                      </div>

                      <Alert className="bg-destructive/5 border-destructive/50">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <AlertDescription className="text-sm">
                          <strong>Remediation Obligation:</strong> If fair value assessment shows products 
                          don't offer fair value, you must take action - improve benefits, reduce price, 
                          or withdraw the product.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Consumer Understanding & Support - Abbreviated for space */}
                <AccordionItem value="understanding">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-secondary" />
                      <span>Consumer Understanding Outcome (PRIN 2A.5)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="PRIN 2A.5.1R"
                      quote="Communications by a firm to a retail customer must support the customer's understanding of relevant features. Communications must equip the customer to make decisions that are effective, timely and properly informed."
                      link="https://www.handbook.fca.org.uk/handbook/PRIN/2A/5.html"
                    />
                    <div className="p-4 bg-muted/30 border-l-4 border-l-secondary rounded-r-lg">
                      <p className="text-sm text-muted-foreground">
                        Key requirements: Communications must be clear, fair, not misleading; timely and 
                        appropriate; tested with target customers; adapted based on outcomes monitoring.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="support">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <span>Consumer Support Outcome (PRIN 2A.6)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="PRIN 2A.6.1R"
                      quote="Customer support must meet the needs of retail customers, including vulnerable customers. Support must be accessible, of high quality, and help customers act in their interests."
                      link="https://www.handbook.fca.org.uk/handbook/PRIN/2A/6.html"
                    />
                    <div className="p-4 bg-muted/30 border-l-4 border-l-success rounded-r-lg">
                      <p className="text-sm text-muted-foreground">
                        Key requirements: Remove barriers ("sludge practices"); support customers at key 
                        moments; make switching/exit simple; provide effective and accessible support channels.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: IMPLEMENTATION STEPS */}
        <TabsContent value="steps" className="space-y-6">
          <Alert className="bg-primary/5 border-primary/50">
            <Scale className="h-4 w-4 text-primary" />
            <AlertDescription>
              This systematic approach ensures you identify all applicable requirements and create 
              comprehensive traceability to your business processes.
            </AlertDescription>
          </Alert>

          <ChecklistSection
            stepNumber={1}
            title="Identify All Applicable Requirements"
            description="Map Consumer Duty obligations to your firm's activities"
            moduleId="cd-f2-requirements"
            items={[
              { 
                id: "step1-1", 
                label: "Review PRIN 2A in full detail",
                details: "Read all sections of PRIN 2A including Consumer Principle, Cross-Cutting Rules, and Four Outcomes.",
                responsible: "Compliance",
                duration: "1 week"
              },
              { 
                id: "step1-2", 
                label: "Map all sub-requirements to business activities",
                details: "For each PRIN 2A requirement, identify which business activities it applies to.",
                responsible: "Compliance + Business",
                duration: "2 weeks"
              },
              { 
                id: "step1-3", 
                label: "Identify firm role (manufacturer, distributor, or both)",
                details: "Clarify whether you manufacture, distribute, or do both for each product/service.",
                responsible: "Product Teams",
                duration: "1 week"
              },
              { 
                id: "step1-4", 
                label: "Document product and service scope",
                details: "List all products and services (including closed products) in scope for Consumer Duty.",
                responsible: "Product Teams",
                duration: "1 week"
              },
            ]}
          />

          <ChecklistSection
            stepNumber={2}
            title="Create Requirements Register"
            moduleId="cd-f2-requirements"
            items={[
              { id: "step2-1", label: "Build comprehensive obligations list with regulatory references", responsible: "Compliance", duration: "2 weeks" },
              { id: "step2-2", label: "Categorize by outcome (P&S, P&V, CU, CS) and cross-cutting rules", responsible: "Compliance", duration: "1 week" },
              { id: "step2-3", label: "Assign applicability status (Yes/No/Partial) to each requirement", responsible: "Business Areas", duration: "2 weeks" },
              { id: "step2-4", label: "Link to related obligations (ICOBS, MCOB, CONC, etc.)", responsible: "Compliance", duration: "1 week" },
            ]}
            templateLink={{
              name: "Regulatory Obligations Register Template",
              onClick: () => handleDownload("Obligations Register")
            }}
          />

          <ChecklistSection
            stepNumber={3}
            title="Define Target Markets"
            moduleId="cd-f2-requirements"
            items={[
              { id: "step3-1", label: "List all products and services requiring target market definition", duration: "1 week" },
              { id: "step3-2", label: "Define positive target market for each product", duration: "2 weeks" },
              { id: "step3-3", label: "Define negative target market (who product is NOT suitable for)", duration: "2 weeks" },
              { id: "step3-4", label: "Consider vulnerable customer needs within target markets", duration: "1 week" },
              { id: "step3-5", label: "Document rationale and supporting evidence", duration: "1 week" },
            ]}
            templateLink={{
              name: "Target Market Definition Template",
              onClick: () => handleDownload("Target Market Template")
            }}
          />

          <ChecklistSection
            stepNumber={4}
            title="Map Distribution Chain"
            moduleId="cd-f2-requirements"
            items={[
              { id: "step4-1", label: "Identify all distribution chain participants (internal and external)", duration: "1 week" },
              { id: "step4-2", label: "Clarify manufacturer vs distributor roles for each participant", duration: "2 weeks" },
              { id: "step4-3", label: "Document information sharing requirements between parties", duration: "2 weeks" },
              { id: "step4-4", label: "Identify third parties and outsourced arrangements", duration: "1 week" },
              { id: "step4-5", label: "Map end-to-end customer journey across distribution chain", duration: "2 weeks" },
            ]}
            templateLink={{
              name: "Distribution Chain Mapping Template",
              onClick: () => handleDownload("Distribution Chain Map")
            }}
          />

          <ChecklistSection
            stepNumber={5}
            title="Create Traceability Matrix"
            moduleId="cd-f2-requirements"
            items={[
              { id: "step5-1", label: "Link each requirement to responsible business owner", duration: "1 week" },
              { id: "step5-2", label: "Map requirements to policies and procedures", duration: "2 weeks" },
              { id: "step5-3", label: "Identify controls and testing approach for each requirement", duration: "2 weeks" },
              { id: "step5-4", label: "Document evidence sources and locations", duration: "1 week" },
              { id: "step5-5", label: "Validate completeness with stakeholders", duration: "1 week" },
            ]}
            templateLink={{
              name: "Requirements Traceability Matrix Template",
              onClick: () => handleDownload("Traceability Matrix")
            }}
          />
        </TabsContent>

        {/* TAB 4: TEMPLATES & TOOLS */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Templates & Tools</CardTitle>
              <CardDescription>
                Comprehensive templates to support regulatory requirements mapping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <TemplateCard
                  title="Regulatory Obligations Register"
                  description="Complete register of all PRIN 2A requirements with applicability tracking and owner assignment"
                  format="Excel"
                  onDownload={() => handleDownload("Obligations Register")}
                />
                <TemplateCard
                  title="Requirements Traceability Matrix"
                  description="Links regulatory requirements to policies, procedures, controls, testing, and evidence"
                  format="Excel"
                  onDownload={() => handleDownload("Traceability Matrix")}
                />
                <TemplateCard
                  title="Target Market Definition Template"
                  description="Structured template for defining positive and negative target markets for each product"
                  format="Word"
                  onDownload={() => handleDownload("Target Market Template")}
                />
                <TemplateCard
                  title="Distribution Chain Mapping Template"
                  description="Visual tool for mapping distribution chain participants, roles, and information flows"
                  format="PowerPoint"
                  onDownload={() => handleDownload("Distribution Chain Map")}
                />
                <TemplateCard
                  title="Four Outcomes Assessment Checklist"
                  description="Detailed checklist for assessing compliance with each of the Four Outcomes"
                  format="Excel"
                  onDownload={() => handleDownload("Four Outcomes Checklist")}
                />
                <TemplateCard
                  title="Fair Value Assessment Framework"
                  description="Comprehensive methodology for conducting fair value assessments"
                  format="Excel"
                  onDownload={() => handleDownload("Fair Value Framework")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: SUCCESS CRITERIA */}
        <TabsContent value="success" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Success Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "All PRIN 2A requirements identified and documented in obligations register",
                "Requirements mapped to all relevant business activities and products",
                "Roles and responsibilities clarified across distribution chain",
                "Target markets defined for all products with supporting rationale",
                "Scope boundaries clearly defined and documented",
                "Traceability matrix complete linking requirements to controls and evidence",
                "Senior management sign-off obtained on requirements scope",
              ].map((criteria, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{criteria}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: COMMON PITFALLS */}
        <TabsContent value="pitfalls" className="space-y-6">
          <div className="space-y-4">
            <PitfallCard
              title="Missing Indirect Requirements"
              description="Failing to identify requirements that apply through distribution chain relationships or outsourcing arrangements."
              impact="Compliance gaps where you haven't identified obligations that apply to you as a manufacturer or distributor."
              prevention="Map entire distribution chain. Consider both upstream (what you receive from manufacturers) and downstream (what you owe to distributors) obligations."
            />

            <PitfallCard
              title="Overly Broad Target Markets"
              description="Target market definitions that are too generic to enable proper assessment, like 'UK adults aged 18+'."
              impact="Unable to properly assess whether products meet customer needs. FCA has criticized generic target markets in reviews."
              prevention="Be specific about characteristics, needs, objectives, and circumstances of target customers. Define both positive and negative target markets."
            />

            <PitfallCard
              title="Confusion About Manufacturer vs Distributor Roles"
              description="Uncertainty about which obligations apply when firm acts as both manufacturer and distributor for different products."
              impact="Unclear accountability, gaps in oversight, failure to meet specific manufacturer or distributor obligations."
              prevention="Create clear role matrix for each product. Document which entity is manufacturer and which is distributor. Clarify handoffs and information sharing."
            />

            <PitfallCard
              title="Ignoring Closed Products"
              description="Assuming closed products are out of scope or can be deprioritized until July 2024 deadline."
              impact="Breach of Consumer Duty obligations. FCA has stated closed products must comply from July 2024 and firms should be preparing now."
              prevention="Include closed products in scope from the start. Plan phased approach if needed, but don't exclude them entirely."
            />

            <PitfallCard
              title="Copy-Paste Compliance"
              description="Copying other firms' target markets, fair value methodologies, or requirement mappings without customization."
              impact="Requirements mapping doesn't reflect your actual business. Unable to demonstrate understanding of your obligations."
              prevention="Use templates and examples as starting points but customize to your firm's specific products, customers, and operating model."
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
