import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, FileText, CheckCircle2, AlertTriangle, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { useToast } from "@/hooks/use-toast";

export default function CDI4ConsumerSupport() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handlePreview = (templateName: string) => {
    toast({
      title: "Preview",
      description: `Preview functionality for ${templateName} coming soon`,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    toast({
      title: "Export",
      description: "Export functionality coming soon",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <Badge variant="outline">Four Outcomes</Badge>
                <Badge variant="secondary">8-14 weeks</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Module Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-background border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3 text-foreground">
                Consumer Support Outcome Implementation
              </h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
                Ensure customers receive support that meets their needs throughout their relationship with the firm
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-sm">
                  PRIN 2A.6
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Sludge Audit Required
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Vulnerable Customer Focus
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
            <TabsTrigger value="steps">Implementation Steps</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
            <TabsTrigger value="success">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Purpose</CardTitle>
                <CardDescription>
                  Ensure customers receive support that meets their needs throughout their relationship with the firm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Regulatory Requirement</h3>
                  <p className="text-muted-foreground">
                    PRIN 2A.6: Firms must provide a standard of support that meets consumers' needs throughout their relationship with the firm
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Duration</h3>
                  <p className="text-muted-foreground">
                    8-14 weeks for initial implementation, then ongoing monitoring and continuous improvement
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Key Focus Areas</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Remove unreasonable barriers ("sludge practices") that deter customers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Enable customer action and benefit realization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Provide accessible support for all customers including vulnerable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Ensure switching and exit is as easy as purchase</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Critical Principle</h3>
                  <div className="p-4 bg-primary/5 border-l-4 border-l-primary rounded">
                    <p className="text-foreground italic">
                      "It should be as easy to switch, cancel, or exit a product as it was to purchase it"
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Key Deliverables</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Customer Support Standards Framework</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive standards for support quality across all channels
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Sludge Audit Findings</h4>
                      <p className="text-sm text-muted-foreground">
                        Identification and remediation of unreasonable barriers
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Service Channel Enhancement</h4>
                      <p className="text-sm text-muted-foreground">
                        Assessment and improvement of all support channels
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Vulnerable Customer Support Protocols</h4>
                      <p className="text-sm text-muted-foreground">
                        Specialized support framework for vulnerable customers
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Switching and Exit Process Improvements</h4>
                      <p className="text-sm text-muted-foreground">
                        Simplified cancellation and switching procedures
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Support Quality Monitoring Framework</h4>
                      <p className="text-sm text-muted-foreground">
                        Dashboard and metrics for ongoing performance tracking
                      </p>
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
                <CardTitle>PRIN 2A.6 Requirements</CardTitle>
                <CardDescription>
                  Consumer Support Outcome regulatory obligations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RegulatoryQuote
                  source="FCA Handbook"
                  reference="PRIN 2A.6"
                  quote="Firms must provide a standard of support that meets consumers' needs throughout their relationship with the firm. This means ensuring customers can use products and services they have purchased as reasonably anticipated, realise their benefits, and act in their interests without unreasonable barriers"
                />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Key Components</h3>
                  <div className="grid gap-4">
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <h4 className="font-medium mb-2">A. Support Must Meet Consumer Needs</h4>
                      <p className="text-sm text-muted-foreground">
                        Support should be appropriate to the product complexity, customer characteristics, and circumstances
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <h4 className="font-medium mb-2">B. Throughout the Relationship</h4>
                      <p className="text-sm text-muted-foreground">
                        Pre-sale, during use, post-sale, and exit - all stages require adequate support
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <h4 className="font-medium mb-2">C. Enable Benefit Realization</h4>
                      <p className="text-sm text-muted-foreground">
                        Customers should be able to actually obtain the benefits the product is designed to provide
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <h4 className="font-medium mb-2">D. Enable Action in Customer Interests</h4>
                      <p className="text-sm text-muted-foreground">
                        Support customers to make changes, switch, cancel, or otherwise act in their best interests
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <h4 className="font-medium mb-2">E. No Unreasonable Barriers</h4>
                      <p className="text-sm text-muted-foreground">
                        Remove "sludge" practices that make it difficult for customers to act
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Constitutes "Support"?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Pre-Sale & Purchase</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Pre-sale guidance and information</li>
                      <li>• Application assistance</li>
                      <li>• Questions about products</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Ongoing Use</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Onboarding assistance</li>
                      <li>• Servicing and queries</li>
                      <li>• Technical support (digital products)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Benefits & Claims</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Claims or benefit access</li>
                      <li>• Problem resolution</li>
                      <li>• Account management</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Exit & Changes</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Switching assistance</li>
                      <li>• Cancellation processes</li>
                      <li>• Complaint handling</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Special Circumstances</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Bereavement support</li>
                      <li>• Vulnerability assistance</li>
                      <li>• Power of Attorney support</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key FCA Expectations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <RegulatoryQuote
                    source="FCA FG22/5"
                    reference="Accessibility Requirement"
                    quote="Support should be accessible to all customers, including those with characteristics of vulnerability"
                  />
                  <p className="text-sm text-muted-foreground">
                    Practical meaning: Multiple channels available (phone, email, post, face-to-face where appropriate), 
                    adequate staffing, reasonable wait times, accessible for customers with disabilities, support for 
                    low digital skills, third-party representatives can access.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <RegulatoryQuote
                    source="FCA FG22/5"
                    reference="No Unreasonable Barriers"
                    quote="Firms should not create unreasonable barriers that deter customers from acting in their interests"
                  />
                  <div>
                    <h4 className="font-medium mb-3">Examples of "Sludge" Practices:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg border border-warning/50 bg-warning/5">
                        <p className="text-sm">Making it difficult to cancel (complex process, hidden option)</p>
                      </div>
                      <div className="p-3 rounded-lg border border-warning/50 bg-warning/5">
                        <p className="text-sm">Long wait times for cancellation vs sales calls</p>
                      </div>
                      <div className="p-3 rounded-lg border border-warning/50 bg-warning/5">
                        <p className="text-sm">Requiring original paperwork for simple requests</p>
                      </div>
                      <div className="p-3 rounded-lg border border-warning/50 bg-warning/5">
                        <p className="text-sm">Excessive form-filling for straightforward queries</p>
                      </div>
                      <div className="p-3 rounded-lg border border-warning/50 bg-warning/5">
                        <p className="text-sm">Multiple unnecessary authentication steps</p>
                      </div>
                      <div className="p-3 rounded-lg border border-warning/50 bg-warning/5">
                        <p className="text-sm">Inconvenient operating hours or limited channels</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <RegulatoryQuote
                    source="FCA FG22/5"
                    reference="Switching and Exit"
                    quote="It should be as easy for customers to switch, cancel, or exit a product as it was to purchase it"
                  />
                  <p className="text-sm text-muted-foreground">
                    If a product can be purchased online in 5 minutes, it should be cancelable online in 5 minutes. 
                    Clear cancellation process, confirmation provided, no unjustified retention barriers, timely 
                    refunds/settlements.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <RegulatoryQuote
                    source="FCA FG22/5"
                    reference="Closed Products"
                    quote="Firms must continue to provide appropriate support for closed products. Customers should not be disadvantaged because a product is no longer actively marketed"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FCA Multi-Firm Review Findings (November 2025)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/50 bg-warning/5">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Significant barriers identified in cancellation processes</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/50 bg-warning/5">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Support quality dropped for closed products</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/50 bg-warning/5">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Long wait times for 'retention' calls (cancellation, switching)</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/50 bg-warning/5">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Digital-only services with no adequate exceptions process</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/50 bg-warning/5">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Vulnerable customers unable to access support</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/50 bg-warning/5">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Power of Attorney holders facing excessive barriers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IMPLEMENTATION STEPS TAB */}
          <TabsContent value="steps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Roadmap</CardTitle>
                <CardDescription>
                  5-phase approach to implementing Consumer Support Outcome
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Badge>Phase 1</Badge>
                    <span className="font-medium">Assessment & Standards</span>
                    <span className="text-sm text-muted-foreground ml-auto">Weeks 1-4</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Badge>Phase 2</Badge>
                    <span className="font-medium">Sludge Audit</span>
                    <span className="text-sm text-muted-foreground ml-auto">Weeks 3-6</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Badge>Phase 3</Badge>
                    <span className="font-medium">Improvement & Remediation</span>
                    <span className="text-sm text-muted-foreground ml-auto">Weeks 6-12</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Badge>Phase 4</Badge>
                    <span className="font-medium">Monitoring & Continuous Improvement</span>
                    <span className="text-sm text-muted-foreground ml-auto">Weeks 10-14+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Phase 1: Assessment & Standards (Weeks 1-4)</h3>

              <ChecklistSection
                stepNumber={1}
                title="Define Consumer Support Standards Framework"
                description="Review existing service standards and define Consumer Duty support principles"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p1s1-1", label: "Review existing service standards", responsible: "Operations Director", duration: "2 days" },
                  { id: "i4-p1s1-2", label: "Define Consumer Duty support principles" },
                  { id: "i4-p1s1-3", label: "Set support standards by channel (phone, digital, email, post)" },
                  { id: "i4-p1s1-4", label: "Define standards for key processes (onboarding, servicing, claims, complaints, switching)" },
                  { id: "i4-p1s1-5", label: "Consider vulnerable customer needs" },
                  { id: "i4-p1s1-6", label: "Document framework" },
                  { id: "i4-p1s1-7", label: "Obtain governance approval" }
                ]}
                templateLink={{
                  name: "Consumer Support Standards Framework",
                  onClick: () => handlePreview("Consumer Support Standards Framework")
                }}
              />

              <ChecklistSection
                stepNumber={2}
                title="Map All Support Channels & Touchpoints"
                description="Inventory all support channels and map to customer journey stages"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p1s2-1", label: "Inventory all support channels (phone, email, web forms, live chat, app, branch, post, social)" },
                  { id: "i4-p1s2-2", label: "Map to customer journey stages" },
                  { id: "i4-p1s2-3", label: "Document channel capabilities and limitations" },
                  { id: "i4-p1s2-4", label: "Identify gaps in channel coverage" }
                ]}
                templateLink={{
                  name: "Support Channel Inventory & Mapping",
                  onClick: () => handlePreview("Support Channel Inventory & Mapping")
                }}
              />

              <ChecklistSection
                stepNumber={3}
                title="Assess Current Support Quality"
                description="Quantitative and qualitative assessment of existing support"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p1s3-1", label: "Gather support metrics for last 12 months (call volumes, answer rates, wait times, FCR)" },
                  { id: "i4-p1s3-2", label: "Benchmark against standards" },
                  { id: "i4-p1s3-3", label: "Identify performance gaps" },
                  { id: "i4-p1s3-4", label: "Review sample of interactions (call recordings, emails, chat transcripts)" },
                  { id: "i4-p1s3-5", label: "Assess quality of resolution" },
                  { id: "i4-p1s3-6", label: "Identify common issues and customer pain points" },
                  { id: "i4-p1s3-7", label: "Review customer feedback and complaints" }
                ]}
                templateLink={{
                  name: "Support Quality Assessment Template",
                  onClick: () => handlePreview("Support Quality Assessment Template")
                }}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Phase 2: Sludge Audit (Weeks 3-6)</h3>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/50">
                <p className="text-sm font-medium">
                  Critical step - must identify and remove unreasonable barriers
                </p>
              </div>

              <ChecklistSection
                stepNumber={4}
                title="Conduct Comprehensive Sludge Audit"
                description="Assess all key customer processes for barriers and friction"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p2s4-1", label: "Map product purchase/application journey", details: "Time required, steps required, information required, friction points" },
                  { id: "i4-p2s4-2", label: "Map product cancellation/exit journey", details: "Compare to purchase journey (symmetry test)" },
                  { id: "i4-p2s4-3", label: "Map switching to alternative process" },
                  { id: "i4-p2s4-4", label: "Map making a claim/accessing benefit process" },
                  { id: "i4-p2s4-5", label: "Map making a complaint process" },
                  { id: "i4-p2s4-6", label: "Map managing account/policy process (changes, accessing information)" },
                  { id: "i4-p2s4-7", label: "Score each process (1-5 scale) for ease, accessibility, and symmetry with purchase" },
                  { id: "i4-p2s4-8", label: "Identify all barriers and friction points" }
                ]}
                templateLink={{
                  name: "Sludge Audit Assessment Framework",
                  onClick: () => handlePreview("Sludge Audit Assessment Framework")
                }}
              />

              <ChecklistSection
                stepNumber={5}
                title="Customer Experience Testing"
                description="Test processes with real customers and mystery shopping"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p2s5-1", label: "Recruit diverse customer group (include vulnerable customers)" },
                  { id: "i4-p2s5-2", label: "Ask customers to complete key processes (cancellation, claims, etc.)" },
                  { id: "i4-p2s5-3", label: "Observe and time completion" },
                  { id: "i4-p2s5-4", label: "Capture frustration points" },
                  { id: "i4-p2s5-5", label: "Gather feedback" },
                  { id: "i4-p2s5-6", label: "Conduct mystery shopping (staff or testers pose as customers)" },
                  { id: "i4-p2s5-7", label: "Document findings and compare to published processes" }
                ]}
                templateLink={{
                  name: "Customer Experience Testing Protocol",
                  onClick: () => handlePreview("Customer Experience Testing Protocol")
                }}
              />

              <ChecklistSection
                stepNumber={6}
                title="Accessibility Audit"
                description="Specific focus on digital and physical accessibility"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p2s6-1", label: "Digital accessibility audit (WCAG 2.1 AA): screen reader, keyboard navigation, color contrast" },
                  { id: "i4-p2s6-2", label: "Physical accessibility (if branches/offices): wheelchair access, hearing loops, large print" },
                  { id: "i4-p2s6-3", label: "Communication accessibility: alternative formats (large print, braille, audio)" },
                  { id: "i4-p2s6-4", label: "Language support and relay services for hearing/speech impaired" }
                ]}
                templateLink={{
                  name: "Accessibility Audit Checklist",
                  onClick: () => handlePreview("Accessibility Audit Checklist")
                }}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Phase 3: Improvement & Remediation (Weeks 6-12)</h3>

              <ChecklistSection
                stepNumber={7}
                title="Prioritize Improvements"
                description="Compile findings and create prioritized improvement backlog"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p3s7-1", label: "Compile all findings from sludge audit, experience testing, accessibility audit" },
                  { id: "i4-p3s7-2", label: "Prioritize by severity of barrier, number of customers affected, regulatory risk" },
                  { id: "i4-p3s7-3", label: "Create prioritized backlog" },
                  { id: "i4-p3s7-4", label: "Assign owners and deadlines" }
                ]}
                templateLink={{
                  name: "Support Improvement Prioritization Matrix",
                  onClick: () => handlePreview("Support Improvement Prioritization Matrix")
                }}
              />

              <ChecklistSection
                stepNumber={8}
                title="Remove Unreasonable Barriers"
                description="Simplify processes and eliminate sludge"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p3s8-1", label: "Simplify processes: reduce steps, remove unnecessary approvals, enable self-service" },
                  { id: "i4-p3s8-2", label: "Improve cancellation/exit: make option prominent, enable online if purchased online" },
                  { id: "i4-p3s8-3", label: "Remove retention loops (max 1 'are you sure?' acceptable)" },
                  { id: "i4-p3s8-4", label: "Provide immediate confirmation and process quickly (within 7 days)" },
                  { id: "i4-p3s8-5", label: "Enhance switching support: provide clear information on alternatives, facilitate switches" },
                  { id: "i4-p3s8-6", label: "Streamline authentication: risk-based, proportionate to transaction" },
                  { id: "i4-p3s8-7", label: "Improve complaint access: multiple channels, prominent information, clear escalation" }
                ]}
              />

              <ChecklistSection
                stepNumber={9}
                title="Enhance Support for Vulnerable Customers"
                description="Implement specialist support and adjustments"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p3s9-1", label: "Train all customer-facing staff on identifying vulnerability (four drivers)" },
                  { id: "i4-p3s9-2", label: "Create specialist vulnerable customer support team" },
                  { id: "i4-p3s9-3", label: "Implement adjustments: extra time, call-backs, third-party support allowed" },
                  { id: "i4-p3s9-4", label: "Alternative communication methods and simplified processes" },
                  { id: "i4-p3s9-5", label: "Record vulnerability (with consent) and flag on customer record" },
                  { id: "i4-p3s9-6", label: "Review and update vulnerability flags periodically" }
                ]}
                templateLink={{
                  name: "Vulnerable Customer Support Framework",
                  onClick: () => handlePreview("Vulnerable Customer Support Framework")
                }}
              />

              <ChecklistSection
                stepNumber={10}
                title="Closed Products Support Plan"
                description="Ensure closed products receive adequate support"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p3s10-1", label: "Review support for all closed products" },
                  { id: "i4-p3s10-2", label: "Ensure support channels still accessible" },
                  { id: "i4-p3s10-3", label: "Ensure staff still trained on products" },
                  { id: "i4-p3s10-4", label: "Provide information on alternative products" },
                  { id: "i4-p3s10-5", label: "Facilitate switching if appropriate" },
                  { id: "i4-p3s10-6", label: "Monitor for issues/complaints" }
                ]}
                templateLink={{
                  name: "Closed Products Support Plan",
                  onClick: () => handlePreview("Closed Products Support Plan")
                }}
              />

              <ChecklistSection
                stepNumber={11}
                title="Resource & Staffing Optimization"
                description="Ensure adequate staffing and optimize technology"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p3s11-1", label: "Model demand across channels" },
                  { id: "i4-p3s11-2", label: "Ensure adequate staffing: peak time coverage, seasonal variation, absence coverage" },
                  { id: "i4-p3s11-3", label: "Review skill mix: first line vs specialist teams" },
                  { id: "i4-p3s11-4", label: "Optimize technology: IVR design, call routing, knowledge management" },
                  { id: "i4-p3s11-5", label: "Balance efficiency and quality (don't over-optimize for speed)" }
                ]}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Phase 4: Monitoring & Continuous Improvement (Weeks 10-14+)</h3>

              <ChecklistSection
                stepNumber={12}
                title="Implement Support Quality Monitoring"
                description="Establish comprehensive monitoring framework"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p4s12-1", label: "Track quantitative metrics: call volumes, answer rates, wait times, FCR, CSAT" },
                  { id: "i4-p4s12-2", label: "Conduct qualitative monitoring: call recording review, email/chat review" },
                  { id: "i4-p4s12-3", label: "Perform root cause analysis: link complaints to systemic issues" },
                  { id: "i4-p4s12-4", label: "Set up monitoring dashboard: real-time operations, weekly/monthly performance" },
                  { id: "i4-p4s12-5", label: "Establish quarterly trends and deep-dive analysis for Board" }
                ]}
                templateLink={{
                  name: "Support Quality Monitoring Dashboard",
                  onClick: () => handlePreview("Support Quality Monitoring Dashboard")
                }}
              />

              <ChecklistSection
                stepNumber={13}
                title="Establish Review Triggers"
                description="Define when support should be re-assessed"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p4s13-1", label: "Define trigger: Breach of service standards" },
                  { id: "i4-p4s13-2", label: "Define trigger: Spike in complaints about support" },
                  { id: "i4-p4s13-3", label: "Define trigger: Product/service changes" },
                  { id: "i4-p4s13-4", label: "Define trigger: Channel changes" },
                  { id: "i4-p4s13-5", label: "Define trigger: Customer feedback indicates issues" },
                  { id: "i4-p4s13-6", label: "Schedule annual sludge audit" }
                ]}
              />

              <ChecklistSection
                stepNumber={14}
                title="Continuous Improvement Process"
                description="Ongoing review and enhancement"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p4s14-1", label: "Regular review of support metrics" },
                  { id: "i4-p4s14-2", label: "Gather staff feedback on customer issues" },
                  { id: "i4-p4s14-3", label: "Implement customer feedback mechanisms (surveys, forums, panels)" },
                  { id: "i4-p4s14-4", label: "Identify improvement opportunities" },
                  { id: "i4-p4s14-5", label: "Pilot improvements and measure impact" },
                  { id: "i4-p4s14-6", label: "Implement successful improvements and share best practices" }
                ]}
                templateLink={{
                  name: "Continuous Improvement Framework",
                  onClick: () => handlePreview("Continuous Improvement Framework")
                }}
              />

              <ChecklistSection
                stepNumber={15}
                title="Staff Training & Development"
                description="Ongoing training on Consumer Duty support requirements"
                moduleId="cd-i4"
                items={[
                  { id: "i4-p4s15-1", label: "Train on Consumer Duty support obligations" },
                  { id: "i4-p4s15-2", label: "Maintain product knowledge training" },
                  { id: "i4-p4s15-3", label: "Develop vulnerable customer support skills" },
                  { id: "i4-p4s15-4", label: "Build empathy and communication skills" },
                  { id: "i4-p4s15-5", label: "Train on de-escalation and complaint handling" },
                  { id: "i4-p4s15-6", label: "Conduct competency assessment and refresher training" }
                ]}
                templateLink={{
                  name: "Support Staff Training Curriculum",
                  onClick: () => handlePreview("Support Staff Training Curriculum")
                }}
              />
            </div>
          </TabsContent>

          {/* TEMPLATES & TOOLS TAB */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Library</CardTitle>
                <CardDescription>
                  Comprehensive toolkit for Consumer Support implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="Consumer Support Standards Framework"
                    description="Comprehensive document defining support principles, standards by channel, and vulnerable customer requirements"
                    format="Word"
                    onPreview={() => handlePreview("Consumer Support Standards Framework")}
                  />
                  <TemplateCard
                    title="Support Channel Inventory & Mapping"
                    description="Spreadsheet documenting all support channels, capabilities, performance metrics, and gaps"
                    format="Excel"
                    onPreview={() => handlePreview("Support Channel Inventory & Mapping")}
                  />
                  <TemplateCard
                    title="Support Quality Assessment Template"
                    description="Assessment framework covering quantitative metrics, qualitative assessment, and gap analysis"
                    format="Excel"
                    onPreview={() => handlePreview("Support Quality Assessment Template")}
                  />
                  <TemplateCard
                    title="Sludge Audit Assessment Framework"
                    description="Detailed audit template for each key customer process to identify barriers and friction"
                    format="Excel"
                    onPreview={() => handlePreview("Sludge Audit Assessment Framework")}
                  />
                  <TemplateCard
                    title="Customer Experience Testing Protocol"
                    description="Testing guide for conducting experience testing and mystery shopping with real customers"
                    format="Word"
                    onPreview={() => handlePreview("Customer Experience Testing Protocol")}
                  />
                  <TemplateCard
                    title="Accessibility Audit Checklist"
                    description="Comprehensive checklist for digital (WCAG 2.1 AA), communication, and physical accessibility"
                    format="Excel"
                    onPreview={() => handlePreview("Accessibility Audit Checklist")}
                  />
                  <TemplateCard
                    title="Support Improvement Prioritization Matrix"
                    description="Prioritization tool for ranking improvements by severity, frequency, regulatory risk, and ease of fix"
                    format="Excel"
                    onPreview={() => handlePreview("Support Improvement Prioritization Matrix")}
                  />
                  <TemplateCard
                    title="Vulnerable Customer Support Framework"
                    description="Comprehensive framework for identifying vulnerability, implementing adjustments, and specialist support"
                    format="Word"
                    onPreview={() => handlePreview("Vulnerable Customer Support Framework")}
                  />
                  <TemplateCard
                    title="Closed Products Support Plan"
                    description="Plan template for ensuring adequate support for closed products"
                    format="Word"
                    onPreview={() => handlePreview("Closed Products Support Plan")}
                  />
                  <TemplateCard
                    title="Root Cause Analysis Framework"
                    description="RCA template using 5 Whys analysis to identify root causes of support issues"
                    format="Word"
                    onPreview={() => handlePreview("Root Cause Analysis Framework")}
                  />
                  <TemplateCard
                    title="Support Quality Monitoring Dashboard"
                    description="Dashboard specification with real-time operations, performance metrics, and outcomes views"
                    format="PowerPoint"
                    onPreview={() => handlePreview("Support Quality Monitoring Dashboard")}
                  />
                  <TemplateCard
                    title="Continuous Improvement Framework"
                    description="Structured 7-stage improvement process from identification to standardization"
                    format="Word"
                    onPreview={() => handlePreview("Continuous Improvement Framework")}
                  />
                  <TemplateCard
                    title="Support Staff Training Curriculum"
                    description="7-module training program covering Consumer Duty, vulnerable customers, and communication skills"
                    format="Word"
                    onPreview={() => handlePreview("Support Staff Training Curriculum")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUCCESS CRITERIA TAB */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Criteria</CardTitle>
                <CardDescription>
                  Measurable outcomes for Consumer Support implementation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Quantitative Measures</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Service Standards Met</p>
                        <p className="text-sm text-muted-foreground">Call answer rate &gt;90% within 60 seconds, email response time &lt;24 hours, FCR &gt;80%, CSAT &gt;4/5</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Sludge Audit Scores</p>
                        <p className="text-sm text-muted-foreground">All processes score 3+ (symmetry with purchase), target 4-5 for exit/cancellation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Accessibility Compliance</p>
                        <p className="text-sm text-muted-foreground">100% WCAG 2.1 AA compliance for digital channels</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Vulnerable Customer Outcomes</p>
                        <p className="text-sm text-muted-foreground">No significant negative variance vs general population in satisfaction and resolution metrics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Complaint Reduction</p>
                        <p className="text-sm text-muted-foreground">Reducing trend in support-related complaints</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Staff Training</p>
                        <p className="text-sm text-muted-foreground">&gt;95% completion of Consumer Duty support training</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Qualitative Measures</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Unreasonable barriers removed from key processes</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Cancellation/exit as easy as purchase</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Vulnerable customer adjustments embedded in all processes</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Closed products receiving adequate support</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Support quality consistent across all channels</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Staff empowered to support customers effectively</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Root cause analysis driving systemic improvements</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Timeline</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Badge>Weeks 1-4</Badge>
                      <span>Standards and assessment</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Badge>Weeks 3-6</Badge>
                      <span>Sludge audit</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Badge>Weeks 6-12</Badge>
                      <span>Improvements and remediation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Badge>Weeks 10-14</Badge>
                      <span>Monitoring implementation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Badge>Week 14+</Badge>
                      <span>Ongoing monitoring and continuous improvement</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Key Metrics to Track</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Service Standards Met</h4>
                      <p className="text-2xl font-bold text-primary">X of Y (%)</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Average Sludge Score</h4>
                      <p className="text-2xl font-bold text-primary">X / 5</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Support-Related Complaints</h4>
                      <p className="text-2xl font-bold text-primary">X (trend ↓)</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">CSAT Score</h4>
                      <p className="text-2xl font-bold text-primary">X / 5</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">FCR Rate</h4>
                      <p className="text-2xl font-bold text-primary">X%</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium mb-2">Vulnerable Customer Satisfaction</h4>
                      <p className="text-2xl font-bold text-primary">X / 5</p>
                    </div>
                  </div>
                </div>
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
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Learn from common mistakes identified in FCA reviews to avoid regulatory issues and ensure good customer outcomes.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <PitfallCard
                title="Difficult Cancellation ('Sludge')"
                description="Significant barriers to cancellation - hidden options, complex processes, excessive retention loops. Example: Product can be purchased online in 5 minutes but cancellation requires 30-minute phone call with multiple retention questions."
                impact="Customers trapped in products they don't want; regulatory breach; enforcement risk. This is a high-risk area for FCA fines."
                prevention="Symmetry test - cancellation process should match purchase process in ease and time. FCA Quote: 'It should be as easy for customers to switch, cancel, or exit a product as it was to purchase it'"
              />

              <PitfallCard
                title="Long Wait Times for 'Retention' Calls"
                description="Calls to cancel or complain have much longer wait times than sales calls. Example: Sales calls answered in <30 seconds; cancellation calls wait 20+ minutes."
                impact="Deters customers from canceling/complaining; demonstrates wrong priorities and creates barriers."
                prevention="Monitor wait times by call type. Cancellation should be answered as quickly as sales. Track and report on wait time disparities."
              />

              <PitfallCard
                title="Digital-Only with No Adequate Exceptions"
                description="Digital-only services with no effective alternative for customers who cannot use digital channels (due to disability, low digital skills, or other reasons)."
                impact="Excludes vulnerable customers; potential discrimination; regulatory breach."
                prevention="FCA Quote: 'While a firm offering a digital-only service is not necessarily required to provide a full-service non-digital alternative, it must have an effective exceptions process.' Provide human alternative for complex issues and those who cannot use digital."
              />

              <PitfallCard
                title="Poor Support for Closed Products"
                description="Support quality dropped after product closure - longer wait times, untrained staff, limited information available."
                impact="Disadvantages customers in closed products; regulatory breach; customer harm continues."
                prevention="Maintain support standards for closed products. Continue staff training. Facilitate switching to alternatives. FCA monitors closed product support quality."
              />

              <PitfallCard
                title="PoA Holders Facing Excessive Barriers"
                description="Power of Attorney holders unable to access or manage accounts despite legal authority. Excessive verification requirements, requiring original documents for routine requests."
                impact="Vulnerable customers (often elderly) cannot have their affairs managed; foreseeable harm; family frustration."
                prevention="Reasonable verification for PoA holders. Don't require original documents for routine requests. Train staff on PoA legal framework."
              />

              <PitfallCard
                title="Vulnerable Customers Excluded"
                description="Support inaccessible or ineffective for customers with vulnerabilities - no alternative formats, no adjustments, staff not trained."
                impact="Vulnerable customers disproportionately harmed; fails Consumer Duty; regulatory breach."
                prevention="Multiple channels. Specialist support team. Staff training on four drivers. Adjustments embedded. Monitor outcomes by vulnerability status."
              />

              <PitfallCard
                title="Post-Sale Support Worse Than Pre-Sale"
                description="Customer experience deteriorates after sale - harder to get help, lower quality support, fewer resources allocated."
                impact="Customers feel misled; complaints increase; poor outcomes; erosion of trust."
                prevention="Equal resourcing and standards pre and post-sale. Monitor both. Align incentives. Don't deprioritize existing customers."
              />

              <PitfallCard
                title="No Root Cause Analysis"
                description="Complaints and issues not analyzed for systemic causes; same problems recurring; no learning or improvement."
                impact="Continuous customer harm; no improvement; regulatory criticism; foreseeable harm continues."
                prevention="Mandatory RCA for complaints and support issues. Link to operational events. Track systemic fixes. Demonstrate learning and improvement."
              />

              <PitfallCard
                title="Staff Not Empowered"
                description="Rigid scripts and processes prevent staff from actually helping customers. No discretion to make exceptions for vulnerable customers or unusual circumstances."
                impact="Poor customer outcomes despite willing staff; frustration for customers and staff; issues escalate unnecessarily."
                prevention="Empower staff to use judgment within guardrails. Trust and train them. Enable exceptions for vulnerable customers. Balance consistency with flexibility."
              />

              <PitfallCard
                title="Monitoring Inputs Not Outcomes"
                description="Firms monitoring process metrics (call volume, handle time) but not outcome metrics (did customer get help? was issue resolved?)."
                impact="Cannot identify poor outcomes; cannot demonstrate compliance; optimize for wrong things."
                prevention="Balance efficiency metrics with outcome metrics. FCR, CSAT, complaint themes are as important as wait times. Monitor vulnerable customer outcomes separately."
              />

              <PitfallCard
                title="Excessive Authentication"
                description="Security questions excessive for routine requests; barriers for legitimate customers including vulnerable customers and PoA holders."
                impact="Frustration; abandonment; may exclude vulnerable customers; poor customer experience."
                prevention="Risk-based authentication - proportionate to transaction. Balance security and accessibility. Simpler authentication for low-risk activities."
              />

              <PitfallCard
                title="Unclear Complaint Process"
                description="Customers don't know how to complain; complaint channels hard to find on website; no clear escalation information."
                impact="Issues not escalated; harm continues; FOS complaints; regulatory criticism."
                prevention="Prominent complaint information on website, letters, statements. Multiple complaint channels. Clear escalation to FOS explained upfront. No barriers to complaining."
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
