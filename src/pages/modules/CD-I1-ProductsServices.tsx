import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Printer, CheckCircle2, Clock, Users, AlertCircle, FileText, Package, GitBranch, ShieldAlert, Lightbulb, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { ModuleChecklistProgress } from "@/components/modules/ModuleChecklistProgress";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { toast } from "@/hooks/use-toast";
import { getModuleStatus, updateModuleStatus } from "@/lib/storage";

export default function CDI1ProductsServices() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(() => getModuleStatus("cd-i1-products-services"));
  
  const handleStatusChange = useCallback((newStatus: "not-started" | "in-progress" | "completed") => {
    setStatus(newStatus);
  }, []);

  const handleMarkComplete = () => {
    updateModuleStatus("cd-i1-products-services", "completed");
    setStatus("completed");
    toast({
      title: "Module Complete",
      description: "Products & Services module marked as complete!",
    });
  };

  const handlePrint = () => window.print();
  const handleDownload = (templateName: string) => {
    toast({
      title: "Downloading Template",
      description: `${templateName} will download shortly...`,
    });
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
              <Badge variant="outline" className="text-sm">CD-I1</Badge>
              <Badge className="text-sm bg-accent text-accent-foreground">Four Outcomes</Badge>
              <Badge variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}>
                {status === "completed" ? "✓ Complete" : status === "in-progress" ? "In Progress" : "Not Started"}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold">Products & Services Outcome Implementation</h1>
            <p className="text-lg text-muted-foreground">
              Ensure all products and services are fit for purpose and meet customer needs
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
            Duration: 6-12 weeks
          </span>
          <span className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Phase: Four Outcomes Implementation
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
                <Package className="h-5 w-5 text-primary" />
                Purpose & Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The Products & Services Outcome requires firms to ensure that all products and services 
                are designed to meet the needs, characteristics and objectives of customers in a defined 
                target market. This module guides you through establishing robust product governance and 
                conducting comprehensive reviews of your product portfolio.
              </p>
              
              <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-l-primary">
                <p className="font-semibold mb-2">Regulatory Requirement: PRIN 2A.3</p>
                <p className="text-sm text-muted-foreground">
                  "A firm must ensure that products and services in the retail market are designed to 
                  meet the needs, characteristics and objectives of customers, including vulnerable 
                  customers, in the target market."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Deliverables</CardTitle>
              <CardDescription>
                What you'll produce by completing this module
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: "🏛️", title: "Product Governance Framework", desc: "Comprehensive framework covering approval, review, and monitoring" },
                  { icon: "🎯", title: "Target Market Definitions", desc: "Granular target markets for all products (positive and negative)" },
                  { icon: "✅", title: "Product Approval Checklist", desc: "Gateway criteria ensuring Consumer Duty compliance" },
                  { icon: "📅", title: "Product Review Schedule", desc: "Ongoing review calendar for all products" },
                  { icon: "🔄", title: "Distribution Strategy Documentation", desc: "Clear distribution plans aligned with target markets" },
                  { icon: "💙", title: "Vulnerable Customer Considerations", desc: "Embedded vulnerability assessment in all products" },
                  { icon: "📁", title: "Closed Products Action Plan", desc: "Assessment and remediation plan for closed products" },
                  { icon: "📊", title: "Product Performance MI", desc: "Monitoring metrics for customer outcomes" },
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
              <CardTitle>Duration & Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg border">
                  <Badge className="mt-1">Phase 1</Badge>
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">Framework Development</p>
                    <p className="text-xs text-muted-foreground">Weeks 1-3: Design product governance framework and target market methodology</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border">
                  <Badge className="mt-1">Phase 2</Badge>
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">Product Reviews</p>
                    <p className="text-xs text-muted-foreground">Weeks 4-10: Conduct comprehensive reviews of all products including closed products</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border">
                  <Badge className="mt-1">Phase 3</Badge>
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">Distribution Chain</p>
                    <p className="text-xs text-muted-foreground">Weeks 8-12: Map distribution chain and update agreements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border">
                  <Badge className="mt-1">Phase 4</Badge>
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">Embedding</p>
                    <p className="text-xs text-muted-foreground">Weeks 10-12: Training, launch, and establish monitoring</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">CD-F1: Readiness Assessment</p>
                    <p className="text-xs text-muted-foreground">Provides baseline understanding of current state</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">CD-F2: Requirements Mapping</p>
                    <p className="text-xs text-muted-foreground">Clarifies specific obligations under PRIN 2A.3</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: REGULATORY FOUNDATION */}
        <TabsContent value="regulatory" className="space-y-6">
          <RegulatoryQuote
            source="FCA Handbook"
            reference="PRIN 2A.3.1R"
            quote="A firm must ensure that products and services in the retail market are designed to meet the needs, characteristics and objectives of customers, including vulnerable customers, in the target market."
            link="https://www.handbook.fca.org.uk/handbook/PRIN/2A/3.html"
          />

          <Card>
            <CardHeader>
              <CardTitle>Manufacturer Obligations</CardTitle>
              <CardDescription>
                Requirements for firms that design and manufacture products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="approval">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Product Approval Process (PRIN 2A.3.2R)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Manufacturers must have a robust product approval process that is conducted 
                      before the product is marketed to customers.
                    </p>
                    <div className="space-y-3">
                      <div className="border-l-4 border-l-primary pl-4 py-2 bg-muted/30">
                        <p className="font-medium text-sm mb-2">Must Consider:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Target market needs and characteristics</li>
                          <li>• All relevant risks to the target market</li>
                          <li>• Product design compatibility with target market needs</li>
                          <li>• Features that could cause harm or have adverse effects</li>
                          <li>• Whether product can be distributed appropriately</li>
                        </ul>
                      </div>
                      <Alert className="bg-warning/5 border-warning/50">
                        <AlertCircle className="h-4 w-4 text-warning" />
                        <AlertDescription className="text-sm">
                          <strong>FCA Expectation:</strong> Product approval must happen BEFORE marketing. 
                          You cannot retrospectively approve products already in market.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="target-market">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-accent" />
                      <span>Target Market Definition (PRIN 2A.3.3R)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <RegulatoryQuote
                      source="FCA"
                      reference="FG22/5, Para 6.9"
                      quote="Target markets should be defined at a sufficiently granular level to enable effective assessment of whether the product or service meets the needs of customers within that target market."
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg bg-card">
                        <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <span className="text-success">✓</span>
                          Positive Target Market
                        </h5>
                        <p className="text-xs text-muted-foreground mb-2">Must define WHO the product IS suitable for:</p>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Customer characteristics</li>
                          <li>• Financial circumstances</li>
                          <li>• Needs being addressed</li>
                          <li>• Objectives and goals</li>
                          <li>• Knowledge & experience level</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg bg-card">
                        <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <span className="text-destructive">✗</span>
                          Negative Target Market
                        </h5>
                        <p className="text-xs text-muted-foreground mb-2">Must define WHO the product is NOT suitable for:</p>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Unsuitable customer profiles</li>
                          <li>• Risk factors indicating unsuitability</li>
                          <li>• Circumstances where product would cause harm</li>
                          <li>• Groups requiring different solutions</li>
                        </ul>
                      </div>
                    </div>
                    <Alert className="bg-info/5 border-info/50">
                      <Lightbulb className="h-4 w-4 text-info" />
                      <AlertDescription className="text-sm">
                        <strong>Good Practice Example:</strong> Instead of "UK adults aged 18+", define as 
                        "UK homeowners aged 35-55, with household income £40K-£80K, seeking to consolidate 
                        debt, with moderate financial literacy and stable employment."
                      </AlertDescription>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="testing">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-5 w-5 text-secondary" />
                      <span>Testing & Validation (PRIN 2A.3.4R)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Products must be tested to ensure they work as intended and meet the needs 
                      of the target market.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-l-secondary space-y-3">
                      <p className="font-semibold text-sm">Testing Requirements:</p>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex gap-2">
                          <span>1.</span>
                          <span><strong>Scenario Testing:</strong> Test product under various scenarios to identify potential issues</span>
                        </li>
                        <li className="flex gap-2">
                          <span>2.</span>
                          <span><strong>User Testing:</strong> Test with real customers from target market (especially vulnerable groups)</span>
                        </li>
                        <li className="flex gap-2">
                          <span>3.</span>
                          <span><strong>Feature Validation:</strong> Ensure all features work as designed and provide intended benefits</span>
                        </li>
                        <li className="flex gap-2">
                          <span>4.</span>
                          <span><strong>Ongoing Review:</strong> Continue testing throughout product lifecycle as market conditions change</span>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="distribution">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <GitBranch className="h-5 w-5 text-warning" />
                      <span>Distribution Strategy (PRIN 2A.3.5R)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Manufacturers must define an appropriate distribution strategy and take reasonable 
                      steps to ensure distributors understand and comply with it.
                    </p>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <p className="font-semibold text-sm mb-2">Distribution Strategy Must Include:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Appropriate distribution channels for the target market</li>
                          <li>• Level of support customers will need</li>
                          <li>• Information distributors need to comply with Consumer Duty</li>
                          <li>• How sales outside target market will be prevented/detected</li>
                          <li>• Monitoring arrangements and feedback loops</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="font-semibold text-sm mb-2">Information to Distributors Must Include:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Target market definition (positive and negative)</li>
                          <li>• Product features, benefits, and risks</li>
                          <li>• Fair value assessment summary</li>
                          <li>• Distribution strategy and any restrictions</li>
                          <li>• Support required for customers</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="review">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-success" />
                      <span>Regular Review (PRIN 2A.3.6R)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Manufacturers must regularly review whether products continue to meet customer needs 
                      and take action if harm is identified.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg bg-card">
                        <h5 className="font-semibold text-sm mb-2">Review Triggers:</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• At least annually</li>
                          <li>• When performance data indicates issues</li>
                          <li>• If market conditions change</li>
                          <li>• If customer needs evolve</li>
                          <li>• Following complaints or claims spikes</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg bg-card">
                        <h5 className="font-semibold text-sm mb-2">Actions if Harm Identified:</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Modify product features</li>
                          <li>• Improve communications</li>
                          <li>• Restrict distribution</li>
                          <li>• Withdraw product</li>
                          <li>• Contact affected customers</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distributor Obligations</CardTitle>
              <CardDescription>
                Requirements for firms that distribute products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-l-accent pl-4 py-3 bg-muted/30 rounded-r-lg">
                  <h4 className="font-semibold mb-2">Obtain Necessary Information (PRIN 2A.3.7R)</h4>
                  <p className="text-sm text-muted-foreground">
                    Distributors must obtain sufficient information from manufacturers to understand 
                    the product and target market. If information is inadequate, distributors should 
                    not distribute the product.
                  </p>
                </div>
                <div className="border-l-4 border-l-accent pl-4 py-3 bg-muted/30 rounded-r-lg">
                  <h4 className="font-semibold mb-2">Appropriate Distribution (PRIN 2A.3.8R)</h4>
                  <p className="text-sm text-muted-foreground">
                    Distributors must have arrangements to direct products to customers within the 
                    target market and monitor sales outside target market.
                  </p>
                </div>
                <div className="border-l-4 border-l-accent pl-4 py-3 bg-muted/30 rounded-r-lg">
                  <h4 className="font-semibold mb-2">Feedback to Manufacturers (PRIN 2A.3.9R)</h4>
                  <p className="text-sm text-muted-foreground">
                    Distributors must provide feedback to manufacturers on product performance, 
                    customer outcomes, and any issues identified.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Closed Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="bg-destructive/5 border-destructive/50">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertTitle>Critical Requirement</AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="mb-2">
                    Closed products (products closed to new business) must continue to comply with 
                    Consumer Duty from 31 July 2024.
                  </p>
                  <p className="text-sm">
                    Firms cannot neglect customers in closed products. You must assess whether closed 
                    products still meet customer needs, offer fair value, and are not causing harm. 
                    Where issues are identified, you must take action - which may include facilitating 
                    switching to better alternatives.
                  </p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vulnerable Customers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RegulatoryQuote
                source="FCA"
                reference="FG22/5, Para 6.15"
                quote="Firms should consider the needs of vulnerable customers when designing products and services, including how the product design could prevent or reduce the risk of foreseeable harm."
              />
              <div className="bg-info/5 p-4 rounded-lg border-l-4 border-l-info">
                <h4 className="font-semibold mb-3">Four Drivers of Vulnerability:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { driver: "Health", desc: "Physical or mental health conditions" },
                    { driver: "Life Events", desc: "Major life changes (bereavement, job loss)" },
                    { driver: "Resilience", desc: "Low financial or emotional resilience" },
                    { driver: "Capability", desc: "Low knowledge, confidence, or literacy" },
                  ].map((item) => (
                    <div key={item.driver} className="p-3 bg-background rounded border">
                      <p className="font-medium text-sm">{item.driver}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: IMPLEMENTATION STEPS */}
        <TabsContent value="steps" className="space-y-6">
          <Alert className="bg-primary/5 border-primary/50">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription>
              Follow this phased implementation approach. Track your progress through the interactive 
              checklists below - your progress is automatically saved.
            </AlertDescription>
          </Alert>

          <ModuleChecklistProgress 
            moduleId="cd-i1-products" 
            totalSteps={12}
          />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="text-base px-3 py-1">Phase 1</Badge>
              <h3 className="text-xl font-semibold">Framework Development (Weeks 1-3)</h3>
            </div>

            <ChecklistSection
              stepNumber={1}
              title="Review Current Product Governance"
              description="Assess existing product governance against Consumer Duty requirements"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p1s1-1", 
                  label: "Review existing product governance framework and documentation",
                  responsible: "Product Governance",
                  duration: "1 week"
                },
                { 
                  id: "p1s1-2", 
                  label: "Identify gaps against PRIN 2A.3 requirements",
                  responsible: "Compliance",
                  duration: "1 week"
                },
                { 
                  id: "p1s1-3", 
                  label: "Document current product approval processes",
                  responsible: "Product Teams",
                  duration: "1 week"
                },
                { 
                  id: "p1s1-4", 
                  label: "Assess current product lifecycle management approach",
                  responsible: "Product Governance",
                  duration: "1 week"
                },
              ]}
            />

            <ChecklistSection
              stepNumber={2}
              title="Design Consumer Duty Product Governance Framework"
              description="Create enhanced governance framework meeting all Consumer Duty requirements"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p1s2-1", 
                  label: "Define new product approval process with gateway criteria",
                  responsible: "Product Governance",
                  duration: "2 weeks"
                },
                { 
                  id: "p1s2-2", 
                  label: "Establish product review committee with clear RACI",
                  responsible: "Senior Management",
                  duration: "1 week"
                },
                { 
                  id: "p1s2-3", 
                  label: "Define approval authorities and escalation processes",
                  responsible: "Product Governance",
                  duration: "1 week"
                },
                { 
                  id: "p1s2-4", 
                  label: "Create approval gateway criteria checklist",
                  responsible: "Compliance",
                  duration: "1 week"
                },
                { 
                  id: "p1s2-5", 
                  label: "Integrate vulnerability considerations into approval process",
                  responsible: "Risk",
                  duration: "1 week"
                },
                { 
                  id: "p1s2-6", 
                  label: "Design fair value assessment integration",
                  responsible: "Product + Finance",
                  duration: "2 weeks"
                },
              ]}
              templateLink={{
                name: "Product Governance Framework Template",
                onClick: () => handleDownload("Product Governance Framework")
              }}
            />

            <ChecklistSection
              stepNumber={3}
              title="Create Target Market Methodology"
              description="Define standards and approach for target market definitions"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p1s3-1", 
                  label: "Define target market definition standards and templates",
                  responsible: "Product Governance",
                  duration: "2 weeks"
                },
                { 
                  id: "p1s3-2", 
                  label: "Create granularity guidelines with examples",
                  responsible: "Product Teams",
                  duration: "1 week"
                },
                { 
                  id: "p1s3-3", 
                  label: "Develop vulnerability assessment approach",
                  responsible: "Risk + Customer",
                  duration: "2 weeks"
                },
                { 
                  id: "p1s3-4", 
                  label: "Design negative target market definition criteria",
                  responsible: "Product + Risk",
                  duration: "1 week"
                },
                { 
                  id: "p1s3-5", 
                  label: "Establish evidence requirements and documentation standards",
                  responsible: "Compliance",
                  duration: "1 week"
                },
              ]}
              templateLink={{
                name: "Target Market Definition Methodology",
                onClick: () => handleDownload("Target Market Methodology")
              }}
            />
          </div>

          <Separator />

          {/* PHASE 2: PRODUCT REVIEWS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="text-base px-3 py-1 bg-accent text-accent-foreground">Phase 2</Badge>
              <h3 className="text-xl font-semibold">Product Reviews (Weeks 4-10)</h3>
            </div>

            <ChecklistSection
              stepNumber={4}
              title="Product Portfolio Assessment"
              description="Map and prioritize all products for review"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p2s4-1", 
                  label: "Create comprehensive list of all in-scope products and services",
                  responsible: "Product Teams",
                  duration: "1 week"
                },
                { 
                  id: "p2s4-2", 
                  label: "Categorize products by complexity, risk, and customer impact",
                  responsible: "Risk + Product",
                  duration: "1 week"
                },
                { 
                  id: "p2s4-3", 
                  label: "Prioritize products for review (highest risk first)",
                  responsible: "Product Governance",
                  duration: "1 week"
                },
                { 
                  id: "p2s4-4", 
                  label: "Assign review owners to each product",
                  responsible: "Product Governance",
                  duration: "1 week"
                },
                { 
                  id: "p2s4-5", 
                  label: "Create detailed review schedule with milestones",
                  responsible: "Project Team",
                  duration: "1 week"
                },
              ]}
            />

            <ChecklistSection
              stepNumber={5}
              title="Conduct Product Reviews"
              description="Complete comprehensive review for each product"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p2s5-1", 
                  label: "Define positive target market (characteristics, needs, objectives)",
                  details: "Be specific and granular - avoid generic definitions like 'UK adults'",
                  responsible: "Product Owner",
                  duration: "Varies by product"
                },
                { 
                  id: "p2s5-2", 
                  label: "Define negative target market (who product is unsuitable for)",
                  details: "Identify customer profiles where product would cause harm or not meet needs",
                  responsible: "Product Owner + Risk",
                  duration: "Varies"
                },
                { 
                  id: "p2s5-3", 
                  label: "Assess product design against target market needs",
                  details: "Validate that features, benefits, and structure meet identified needs",
                  responsible: "Product Owner",
                  duration: "Varies"
                },
                { 
                  id: "p2s5-4", 
                  label: "Identify any features that could cause foreseeable harm",
                  details: "Consider complexity, costs, restrictions, penalties, or unintended consequences",
                  responsible: "Risk",
                  duration: "Varies"
                },
                { 
                  id: "p2s5-5", 
                  label: "Consider vulnerable customer impact using four drivers model",
                  details: "Assess health, life events, resilience, and capability considerations",
                  responsible: "Customer + Risk",
                  duration: "Varies"
                },
                { 
                  id: "p2s5-6", 
                  label: "Validate distribution strategy aligns with target market",
                  details: "Confirm channels, support level, and monitoring are appropriate",
                  responsible: "Distribution",
                  duration: "Varies"
                },
                { 
                  id: "p2s5-7", 
                  label: "Document all review findings with supporting evidence",
                  responsible: "Product Owner",
                  duration: "Varies"
                },
                { 
                  id: "p2s5-8", 
                  label: "Obtain formal approval/sign-off from governance committee",
                  responsible: "Product Governance",
                  duration: "Per review cycle"
                },
              ]}
              templateLink={{
                name: "Product Review Template (detailed Excel workbook)",
                onClick: () => handleDownload("Product Review Template")
              }}
            />

            <ChecklistSection
              stepNumber={6}
              title="Closed Products Assessment"
              description="Special review process for products closed to new business"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p2s6-1", 
                  label: "Identify all closed products in your portfolio",
                  responsible: "Product Teams",
                  duration: "1 week"
                },
                { 
                  id: "p2s6-2", 
                  label: "Assess whether closed products still meet customer needs",
                  details: "Consider if product features, benefits still appropriate for existing customers",
                  responsible: "Product Owner",
                  duration: "2-4 weeks"
                },
                { 
                  id: "p2s6-3", 
                  label: "Identify any harm being caused to customers in closed products",
                  details: "Look for poor value, unsuitable features, lack of support",
                  responsible: "Risk + Customer",
                  duration: "2-4 weeks"
                },
                { 
                  id: "p2s6-4", 
                  label: "Determine remediation actions for each closed product",
                  details: "Options: continue as-is, modify, contact customers, facilitate switching, withdraw",
                  responsible: "Product Governance",
                  duration: "2 weeks"
                },
                { 
                  id: "p2s6-5", 
                  label: "Create customer communication plan for affected closed products",
                  responsible: "Customer + Comms",
                  duration: "2 weeks"
                },
              ]}
              templateLink={{
                name: "Closed Product Review Template",
                onClick: () => handleDownload("Closed Product Review")
              }}
            />
          </div>

          <Separator />

          {/* PHASE 3: DISTRIBUTION CHAIN */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="text-base px-3 py-1 bg-secondary text-secondary-foreground">Phase 3</Badge>
              <h3 className="text-xl font-semibold">Distribution Chain (Weeks 8-12)</h3>
            </div>

            <ChecklistSection
              stepNumber={7}
              title="Map Distribution Chain"
              description="Identify all participants and clarify roles"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p3s7-1", 
                  label: "Identify all distribution partners (agents, brokers, platforms, etc.)",
                  responsible: "Distribution",
                  duration: "1 week"
                },
                { 
                  id: "p3s7-2", 
                  label: "Clarify manufacturer vs distributor roles for each relationship",
                  responsible: "Legal + Compliance",
                  duration: "2 weeks"
                },
                { 
                  id: "p3s7-3", 
                  label: "Document existing distribution agreements and arrangements",
                  responsible: "Legal",
                  duration: "2 weeks"
                },
                { 
                  id: "p3s7-4", 
                  label: "Assess adequacy of current information sharing",
                  responsible: "Distribution + Compliance",
                  duration: "2 weeks"
                },
              ]}
              templateLink={{
                name: "Distribution Chain Map Template",
                onClick: () => handleDownload("Distribution Chain Map")
              }}
            />

            <ChecklistSection
              stepNumber={8}
              title="Develop Manufacturer Information Packs"
              description="Create comprehensive information for distributors"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p3s8-1", 
                  label: "Create product summary document for each product",
                  responsible: "Product Owner",
                  duration: "Varies"
                },
                { 
                  id: "p3s8-2", 
                  label: "Include target market definition (positive and negative)",
                  responsible: "Product Owner",
                  duration: "Varies"
                },
                { 
                  id: "p3s8-3", 
                  label: "Include fair value assessment summary",
                  responsible: "Product + Finance",
                  duration: "Varies"
                },
                { 
                  id: "p3s8-4", 
                  label: "Document distribution strategy and any restrictions",
                  responsible: "Distribution",
                  duration: "Varies"
                },
                { 
                  id: "p3s8-5", 
                  label: "Detail key features, benefits, and risks",
                  responsible: "Product Owner",
                  duration: "Varies"
                },
                { 
                  id: "p3s8-6", 
                  label: "Specify customer support requirements",
                  responsible: "Customer Service",
                  duration: "Varies"
                },
              ]}
              templateLink={{
                name: "Manufacturer Information Pack Template",
                onClick: () => handleDownload("Manufacturer Info Pack")
              }}
            />

            <ChecklistSection
              stepNumber={9}
              title="Update Distribution Agreements"
              description="Ensure contracts reflect Consumer Duty obligations"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p3s9-1", 
                  label: "Review existing distribution contracts",
                  responsible: "Legal",
                  duration: "3 weeks"
                },
                { 
                  id: "p3s9-2", 
                  label: "Add Consumer Duty clauses covering obligations",
                  responsible: "Legal + Compliance",
                  duration: "3 weeks"
                },
                { 
                  id: "p3s9-3", 
                  label: "Define information sharing requirements and timelines",
                  responsible: "Legal",
                  duration: "2 weeks"
                },
                { 
                  id: "p3s9-4", 
                  label: "Establish feedback mechanisms and reporting",
                  responsible: "Distribution",
                  duration: "2 weeks"
                },
                { 
                  id: "p3s9-5", 
                  label: "Clarify remediation responsibilities if issues arise",
                  responsible: "Legal + Risk",
                  duration: "2 weeks"
                },
              ]}
              templateLink={{
                name: "Distribution Agreement Consumer Duty Clauses",
                onClick: () => handleDownload("Distribution Agreement Clauses")
              }}
            />
          </div>

          <Separator />

          {/* PHASE 4: EMBEDDING */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="text-base px-3 py-1 bg-success text-white">Phase 4</Badge>
              <h3 className="text-xl font-semibold">Embedding (Weeks 10-12)</h3>
            </div>

            <ChecklistSection
              stepNumber={10}
              title="Training"
              description="Ensure all stakeholders understand new requirements"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p4s10-1", 
                  label: "Train product teams on new governance framework",
                  responsible: "Product Governance + Training",
                  duration: "2 weeks"
                },
                { 
                  id: "p4s10-2", 
                  label: "Train distribution partners on their obligations",
                  responsible: "Distribution + Training",
                  duration: "2 weeks"
                },
                { 
                  id: "p4s10-3", 
                  label: "Train sales teams on target markets and suitability",
                  responsible: "Sales + Training",
                  duration: "2 weeks"
                },
                { 
                  id: "p4s10-4", 
                  label: "Train support teams on target markets and vulnerable customers",
                  responsible: "Customer Service + Training",
                  duration: "2 weeks"
                },
                { 
                  id: "p4s10-5", 
                  label: "Provide vulnerable customer awareness training across business",
                  responsible: "Training + HR",
                  duration: "3 weeks"
                },
              ]}
            />

            <ChecklistSection
              stepNumber={11}
              title="Implementation & Monitoring"
              description="Launch framework and establish ongoing processes"
              moduleId="cd-i1-products"
              items={[
                { 
                  id: "p4s11-1", 
                  label: "Formally launch new product governance framework",
                  responsible: "Product Governance",
                  duration: "1 week"
                },
                { 
                  id: "p4s11-2", 
                  label: "Commence ongoing product review schedule",
                  responsible: "Product Teams",
                  duration: "Ongoing"
                },
                { 
                  id: "p4s11-3", 
                  label: "Establish monitoring MI and dashboards",
                  responsible: "MI + Product",
                  duration: "2 weeks"
                },
                { 
                  id: "p4s11-4", 
                  label: "Set up regular reporting to product governance committee",
                  responsible: "Product Governance",
                  duration: "1 week"
                },
                { 
                  id: "p4s11-5", 
                  label: "Implement feedback loops from distributors",
                  responsible: "Distribution",
                  duration: "2 weeks"
                },
              ]}
            />
          </div>
        </TabsContent>

        {/* TAB 4: TEMPLATES & TOOLS */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Template Library</CardTitle>
              <CardDescription>
                Professional templates covering all aspects of Products & Services implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <TemplateCard
                  title="Product Governance Framework"
                  description="Complete framework including approval process, lifecycle management, roles & responsibilities, and governance structure"
                  format="Word"
                  onDownload={() => handleDownload("Product Governance Framework")}
                  onPreview={() => toast({ title: "Preview", description: "Preview functionality coming soon" })}
                />
                <TemplateCard
                  title="Product Review Template"
                  description="Comprehensive Excel workbook with tabs for product details, target market, design assessment, distribution, performance, and findings"
                  format="Excel"
                  onDownload={() => handleDownload("Product Review Template")}
                />
                <TemplateCard
                  title="Target Market Definition Template"
                  description="Structured template for defining granular target markets with positive/negative definitions and vulnerability considerations"
                  format="Word"
                  onDownload={() => handleDownload("Target Market Template")}
                />
                <TemplateCard
                  title="Product Approval Checklist"
                  description="Gateway checklist ensuring all Consumer Duty requirements met before product launch"
                  format="Excel"
                  onDownload={() => handleDownload("Product Approval Checklist")}
                />
                <TemplateCard
                  title="Closed Products Review Template"
                  description="Specialized template for assessing closed products with remediation action planning"
                  format="Excel"
                  onDownload={() => handleDownload("Closed Products Review")}
                />
                <TemplateCard
                  title="Distribution Chain Mapping Template"
                  description="Visual template for mapping distribution participants, roles, information flows, and responsibilities"
                  format="PowerPoint"
                  onDownload={() => handleDownload("Distribution Chain Map")}
                />
                <TemplateCard
                  title="Manufacturer Information Pack Template"
                  description="Comprehensive pack providing distributors with target market, fair value summary, and distribution strategy"
                  format="Word"
                  onDownload={() => handleDownload("Manufacturer Info Pack")}
                />
                <TemplateCard
                  title="Distribution Agreement Clauses"
                  description="Consumer Duty contract clauses covering obligations, information sharing, and remediation responsibilities"
                  format="Word"
                  onDownload={() => handleDownload("Distribution Clauses")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target Market Examples by Sector</CardTitle>
              <CardDescription>
                Good practice examples of granular target market definitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="mortgages">
                  <AccordionTrigger>Mortgages - First Time Buyer Product</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold text-sm mb-2">Positive Target Market:</p>
                      <p className="text-sm text-muted-foreground">
                        UK residents aged 25-40, employed with stable income £25K-£60K, seeking to 
                        purchase first home valued £150K-£400K, with deposit 5-20%, basic financial 
                        literacy, requiring support through purchase process.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold text-sm mb-2">Negative Target Market:</p>
                      <p className="text-sm text-muted-foreground">
                        Customers with adverse credit history, self-employed with variable income, 
                        existing homeowners, customers requiring specialist lending, those seeking 
                        buy-to-let mortgages.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="investments">
                  <AccordionTrigger>Investments - Balanced Portfolio Product</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold text-sm mb-2">Positive Target Market:</p>
                      <p className="text-sm text-muted-foreground">
                        UK residents aged 30-60, investable assets £10K-£100K, seeking medium-term 
                        growth (5-10 years), moderate risk tolerance, good understanding of investment 
                        concepts, comfortable with market volatility within balanced portfolio.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold text-sm mb-2">Negative Target Market:</p>
                      <p className="text-sm text-muted-foreground">
                        Customers with low risk tolerance seeking capital guarantees, those requiring 
                        short-term access to funds (&lt;5 years), customers with limited investment 
                        knowledge, those seeking ethical/ESG investments specifically.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="insurance">
                  <AccordionTrigger>Insurance - Term Life Insurance</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold text-sm mb-2">Positive Target Market:</p>
                      <p className="text-sm text-muted-foreground">
                        UK residents aged 25-55, with financial dependents (children, partner, or 
                        other), seeking protection against loss of income due to death, standard health 
                        status, requiring cover for specific term (10-30 years), basic understanding 
                        of life insurance.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold text-sm mb-2">Negative Target Market:</p>
                      <p className="text-sm text-muted-foreground">
                        Customers without financial dependents, those seeking investment/savings 
                        element (need whole-of-life), customers with significant pre-existing health 
                        conditions requiring specialist underwriting, those over 65 or under 18.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: SUCCESS CRITERIA */}
        <TabsContent value="success" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Success Criteria</CardTitle>
              <CardDescription>
                Measurable outcomes demonstrating successful implementation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Product governance framework approved by Board and operational",
                "All in-scope products reviewed and formally approved",
                "Target markets defined at granular level for 100% of products",
                "Vulnerable customer considerations embedded in all product reviews",
                "Closed products assessed with action plans implemented",
                "Distribution chain fully mapped with roles clarified",
                "Information packs provided to all distributors",
                "Distribution agreements updated with Consumer Duty clauses",
                "Training completed for product, sales, distribution, and support teams",
                "Monitoring MI operational and reporting to governance committee",
              ].map((criteria, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{criteria}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Products Reviewed", value: "X of Y (Target: 100%)" },
                  { label: "Target Markets Approved", value: "X of Y (Target: 100%)" },
                  { label: "Closed Products Assessed", value: "X of Y (Target: 100%)" },
                  { label: "Distribution Agreements Updated", value: "X of Y (Target: 100%)" },
                  { label: "Staff Trained", value: "X of Y (Target: 100%)" },
                  { label: "Information Packs Distributed", value: "X distributors" },
                ].map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-lg font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evidence of Good Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="font-medium mb-3">Your implementation should demonstrate:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Products are being sold to customers within defined target markets</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Sales outside target market are minimal and appropriately managed</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Customer complaints related to product suitability are low/decreasing</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Vulnerable customers are being identified and appropriately supported</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Products are delivering expected benefits to customers</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>No foreseeable harm has been identified in product reviews</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: COMMON PITFALLS */}
        <TabsContent value="pitfalls" className="space-y-6">
          <Alert className="bg-warning/5 border-warning/50">
            <AlertCircle className="h-4 w-4 text-warning" />
            <AlertDescription>
              Learn from FCA multi-firm review findings and avoid these common mistakes
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <PitfallCard
              title="Target Market Too Broad"
              description="FCA Finding: Many firms defined target markets as 'UK adults' or similar generic definitions that provided no meaningful guidance on suitability."
              impact="Unable to properly assess whether products meet customer needs. Increased risk of mis-selling. FCA has criticized firms for this in supervisory reviews."
              prevention="Use customer data and segmentation to define granular markets. Example: Instead of 'UK adults,' define as 'UK adults aged 25-40, with stable income £25K+, seeking first-time home purchase, moderate financial literacy.' Be specific about characteristics, needs, objectives."
            />

            <PitfallCard
              title="Ignoring Vulnerable Customers in Product Design"
              description="FCA Finding: Vulnerability considered as an afterthought during product reviews rather than embedded in product design phase."
              impact="Products may have features that cause harm to vulnerable customers. Retrospective fixes are more costly and damage customer outcomes in interim."
              prevention="Mandatory vulnerability assessment at product design stage using four drivers model (health, life events, resilience, capability). Test products with vulnerable customer groups before launch. Design flexibility and support mechanisms from the start."
            />

            <PitfallCard
              title="No Negative Target Market Defined"
              description="FCA Finding: Firms frequently fail to define who products are unsuitable for, only defining positive target market."
              impact="Increased risk of products being sold to unsuitable customers. No clear guidance for sales teams on who to decline. Regulatory action more likely when harm occurs."
              prevention="Explicitly define characteristics of customers for whom product is unsuitable. Document why product doesn't meet their needs. Provide clear examples and red flags for sales teams. Include in training materials."
            />

            <PitfallCard
              title="Inadequate Product Testing"
              description="FCA Finding: Products approved with minimal or no testing against target market needs. Theoretical assessment without real-world validation."
              impact="Products fail to meet customer needs in practice. Issues only discovered post-launch requiring costly remediation and potential customer redress."
              prevention="Conduct comprehensive testing: scenario analysis for different customer circumstances, user testing with actual customers from target market, pilot programs before full launch, vulnerability testing with at-risk groups. Document all testing and findings."
            />

            <PitfallCard
              title="Poor Information Sharing with Distributors"
              description="FCA Finding: Distributors not provided with adequate information to understand products and comply with their Consumer Duty obligations."
              impact="Distribution chain failures. Products sold outside target market. Distributors unable to support customers appropriately. Shared liability for poor outcomes."
              prevention="Create comprehensive manufacturer information packs including: target market (positive and negative), fair value assessment summary, product features/risks, distribution strategy and restrictions, customer support required. Update regularly as products or target markets change."
            />

            <PitfallCard
              title="Closed Products Neglected"
              description="FCA Finding: Firms assumed closed products were out of scope or deprioritized them until July 2024 deadline."
              impact="Customers left in unsuitable or poor value products. Potential harm continuing for extended periods. Regulatory action likely as FCA has emphasized closed products must comply."
              prevention="Include closed products in scope from start. Review whether still meeting customer needs. Assess if fair value maintained over time. Consider whether customers would be better served by alternative products. Develop customer communication and migration strategies where needed. Don't wait until deadline."
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>FCA Enforcement and Supervisory Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                The FCA has been actively supervising firms' Consumer Duty implementation and has 
                published findings from multi-firm reviews:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-warning font-bold">⚠️</span>
                  <span>Target market definitions lacking granularity (60%+ of firms reviewed)</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-warning font-bold">⚠️</span>
                  <span>Inadequate evidence supporting product approval decisions</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-warning font-bold">⚠️</span>
                  <span>Insufficient consideration of vulnerable customers in product design</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-warning font-bold">⚠️</span>
                  <span>Distribution chain information sharing gaps</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-warning font-bold">⚠️</span>
                  <span>Closed products not adequately reviewed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a 
                  href="https://www.fca.org.uk/publications/multi-firm-reviews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  → FCA Multi-Firm Review Findings
                </a>
                <a 
                  href="https://www.fca.org.uk/publications/finalised-guidance/fg22-5-finalised-guidance-consumer-duty" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  → FG22/5: Consumer Duty Finalised Guidance
                </a>
                <a 
                  href="https://www.fca.org.uk/publications/policy-statements/ps22-9-new-consumer-duty" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  → PS22/9: Consumer Duty Policy Statement
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
