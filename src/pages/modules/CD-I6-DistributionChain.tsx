import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Network, Download, FileText, CheckCircle2, AlertTriangle, Scale, Users, Building2, UserCheck, ScrollText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { updateModuleStatus, addActivity } from "@/lib/storage";
import { toast } from "sonner";

export default function CDI6DistributionChain() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"not-started" | "in-progress" | "completed">(() => {
    const stored = localStorage.getItem("module-cd-i6-status");
    return (stored as "not-started" | "in-progress" | "completed") || "not-started";
  });

  const handleStatusChange = (newStatus: "not-started" | "in-progress" | "completed") => {
    setStatus(newStatus);
    updateModuleStatus("cd-i6", newStatus);
    addActivity("status_updated", "CD-I6: Distribution Chain Management");
    toast.success(`Module status updated to ${newStatus}`);
  };

  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const handleExport = () => {
    toast.info("Export functionality coming soon");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2 ml-auto">
          <Badge variant="outline">Implementation Module</Badge>
          <Badge 
            variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}
          >
            {status === "completed" ? "Completed" : status === "in-progress" ? "In Progress" : "Not Started"}
          </Badge>
        </div>
      </div>

      {/* Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <Network className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-3xl">CD-I6: Distribution Chain Management</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Establish clear accountability and effective information sharing across the entire distribution chain to ensure retail customers receive good outcomes regardless of which firm they interact with
                  </CardDescription>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t">
            <Badge variant="outline" className="text-sm">
              Duration: 6-10 weeks
            </Badge>
            <Badge variant="outline" className="text-sm">
              Phase: Implementation
            </Badge>
            <Badge variant="outline" className="text-sm">
              Complexity: High
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Module Actions</h3>
              <p className="text-sm text-muted-foreground">
                Update status, print, or export this module
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as "not-started" | "in-progress" | "completed")}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="regulatory">Regulatory Foundation</TabsTrigger>
              <TabsTrigger value="implementation">Implementation Steps</TabsTrigger>
              <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
              <TabsTrigger value="success">Success Criteria</TabsTrigger>
              <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Module Overview</h2>
                
                <Alert className="mb-6">
                  <Network className="h-5 w-5" />
                  <AlertTitle className="text-lg font-semibold">Critical Principle</AlertTitle>
                  <AlertDescription className="text-base mt-2">
                    "Accountability for good outcomes extends across the entire distribution chain. You cannot outsource responsibility for Consumer Duty compliance."
                  </AlertDescription>
                </Alert>

                <div className="prose max-w-none space-y-6">
                  <section>
                    <h3 className="text-xl font-semibold mb-3">Purpose</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Establish clear accountability and effective information sharing across the entire distribution chain to ensure retail customers receive good outcomes regardless of which firm they interact with.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">Regulatory Foundation</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Consumer Duty (PRIN 2A) applies to ALL firms in distribution chain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Cross-cutting rules apply throughout the chain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Each firm responsible for its own actions AND contribution to end-to-end outcomes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>FG19/5 provides specific guidance for general insurance distribution chains</span>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">Scope</h3>
                    <p className="text-muted-foreground mb-3">This module applies to:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Manufacturers
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          Firms that create, develop, design, issue, or underwrite products
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Distributors
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          Firms that offer, sell, advise on, or arrange products
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Network className="h-4 w-4" />
                            Dual-Role Firms
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          Firms acting as both manufacturer and distributor
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            Principal Firms
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          Firms with Appointed Representatives
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Outsourced Providers
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          Firms using outsourced service providers
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <ScrollText className="h-4 w-4" />
                            Platform Providers
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          Platform providers and intermediaries
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">Key Deliverables</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Distribution chain mapping (all parties identified)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Manufacturer obligations framework</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Distributor requirements framework</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Information sharing agreements and protocols</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Third-party oversight procedures</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Appointed Representative supervision framework</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Outsourcing arrangement reviews</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Chain-wide outcome monitoring approach</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Escalation and remediation protocols</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Distribution chain governance structure</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">Distribution Chain Diagram</h3>
                    <Card className="bg-muted/30 p-6">
                      <div className="space-y-4 font-mono text-sm">
                        <div className="text-center space-y-2">
                          <div className="inline-block bg-primary/10 border-2 border-primary rounded px-4 py-2 font-semibold">
                            Manufacturer
                          </div>
                          <div className="text-primary">↓</div>
                          <div className="inline-block bg-secondary/10 border-2 border-secondary rounded px-4 py-2 font-semibold">
                            Wholesaler / Platform
                          </div>
                          <div className="text-primary">↓</div>
                          <div className="inline-block bg-accent/10 border-2 border-accent rounded px-4 py-2 font-semibold">
                            Distributor / Adviser
                          </div>
                          <div className="text-primary">↓</div>
                          <div className="inline-block bg-muted border-2 border-border rounded px-4 py-2 font-semibold">
                            Customer
                          </div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-muted-foreground mb-1">Information Flow</div>
                            <div className="text-primary text-xl">← ← ← ← ← ←</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Outcome Monitoring</div>
                            <div className="text-secondary text-xl">→ → → → → →</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </section>

                  <RegulatoryQuote
                    source="FCA"
                    reference="FG22/5"
                    quote="All firms in the distribution chain can determine or materially influence customer outcomes and must ensure their contribution supports delivery of good outcomes"
                  />
                </div>
              </div>
            </TabsContent>

            {/* REGULATORY FOUNDATION TAB */}
            <TabsContent value="regulatory" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Regulatory Foundation</h2>

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="manufacturers" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <span>Who is a Manufacturer?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">FCA Definition (PRIN 2A)</h4>
                          <p className="text-sm text-muted-foreground mb-3">A manufacturer is a firm that:</p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Creates a retail product</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Develops a retail product</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Designs a retail product</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Issues a retail product</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Underwrites a retail product</span>
                            </li>
                          </ul>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-3">Practical Examples by Sector</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Banking</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium text-primary">Manufacturer:</span>
                                  <p className="text-muted-foreground">Bank creating a savings account, mortgage product, credit card</p>
                                </div>
                                <div>
                                  <span className="font-medium text-destructive">Not Manufacturer:</span>
                                  <p className="text-muted-foreground">Comparison website showing these products</p>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Insurance</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium text-primary">Manufacturer:</span>
                                  <p className="text-muted-foreground">Insurer underwriting policies</p>
                                </div>
                                <div>
                                  <span className="font-medium text-destructive">Not Manufacturer:</span>
                                  <p className="text-muted-foreground">Insurance broker selling policies</p>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Wealth Management</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium text-primary">Manufacturer:</span>
                                  <p className="text-muted-foreground">Fund manager creating an investment fund; Platform creating model portfolios</p>
                                </div>
                                <div>
                                  <span className="font-medium text-destructive">Not Manufacturer:</span>
                                  <p className="text-muted-foreground">IFA advising on fund selection</p>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Consumer Credit</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium text-primary">Manufacturer:</span>
                                  <p className="text-muted-foreground">Lender creating loan product</p>
                                </div>
                                <div>
                                  <span className="font-medium text-destructive">Not Manufacturer:</span>
                                  <p className="text-muted-foreground">Credit broker arranging loans</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Dual Roles</AlertTitle>
                          <AlertDescription>
                            A firm can be BOTH manufacturer and distributor. Example: A bank that creates mortgages (manufacturer) and also distributes third-party insurance products (distributor).
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="distributors" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Who is a Distributor?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">FCA Definition (PRIN 2A)</h4>
                          <p className="text-sm text-muted-foreground mb-3">A distributor is a firm that:</p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Offers a retail product</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Sells a retail product</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Advises on a retail product</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Arranges a retail product</span>
                            </li>
                          </ul>
                        </div>

                        <Alert className="border-primary/50 bg-primary/5">
                          <AlertTriangle className="h-4 w-4 text-primary" />
                          <AlertTitle>Important Distinction</AlertTitle>
                          <AlertDescription>
                            Distributors are NOT just 'sellers' - they include platforms, intermediaries, and anyone who can materially influence customer outcomes in the distribution process.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="manufacturer-obligations" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Manufacturer Obligations</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      {/* Obligation 1 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 1: Product Governance (PRIN 2A.3)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Requirements:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Robust product approval process</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Target market definition (granular, not broad)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Negative target market identification</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Product testing before launch</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Regular product reviews</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Action when product causes harm</span>
                              </li>
                            </ul>
                          </div>
                          <RegulatoryQuote
                            source="FCA"
                            reference="FG22/5"
                            quote="Manufacturers must design products that meet the needs, characteristics and objectives of customers in the identified target market"
                          />
                        </CardContent>
                      </Card>

                      {/* Obligation 2 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 2: Fair Value Assessment (PRIN 2A.4)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Requirements:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Conduct Fair Value Assessment (FVA) for all products</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Multi-dimensional analysis (not just price comparison)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Consider total price and all benefits</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Assess differential outcomes by customer segment</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Regular review and update</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Take action if fair value not delivered</span>
                              </li>
                            </ul>
                          </div>
                          <RegulatoryQuote
                            source="FCA"
                            reference="FG22/5"
                            quote="Manufacturers are best placed to understand the full cost of producing and distributing a product and must assess whether there is a reasonable relationship between price and benefits"
                          />
                        </CardContent>
                      </Card>

                      {/* Obligation 3 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 3: Information Sharing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Manufacturers must provide distributors with ALL necessary information:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Product features, benefits, risks, limitations</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Target market definition (positive and negative)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Fair value assessment summary</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Distribution strategy</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Any restrictions on how product should be sold</span>
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Information must be:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Clear and accessible (not buried in lengthy documents)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Sufficient for distributor to meet its own obligations</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Kept up to date</span>
                              </li>
                            </ul>
                          </div>
                          <Alert>
                            <AlertDescription className="text-sm">
                              <strong>FCA Note:</strong> Does NOT require disclosure of commercially sensitive information like profit margins, but information must be adequate.
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>

                      {/* Obligation 4 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 4: Distribution Strategy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Requirements:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Develop strategy consistent with target market</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Specify appropriate distribution channels</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Define distributor capabilities required</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Set expectations for distributor conduct</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Monitor distributor adherence</span>
                              </li>
                            </ul>
                          </div>
                          <Card className="bg-muted/30 border-l-4 border-l-primary">
                            <CardHeader>
                              <CardTitle className="text-sm">Example</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <p><strong>Premium investment product with complex features:</strong></p>
                              <div className="space-y-1 ml-4">
                                <p className="text-primary">✓ Appropriate: Distributed via advised channel with qualified advisers</p>
                                <p className="text-destructive">✗ Inappropriate: Sold execution-only to mass market</p>
                              </div>
                            </CardContent>
                          </Card>
                        </CardContent>
                      </Card>

                      {/* Obligation 5 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 5: Ongoing Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Manufacturers must obtain relevant information from distributors:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Sales data (volumes, customer segments)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Sales outside target market</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Customer feedback and complaints</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Claims experience (insurance)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Any other outcome indicators</span>
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Additional requirements:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Monitor whether distributors following strategy</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Identify issues and take action</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Review products based on actual outcomes</span>
                              </li>
                            </ul>
                          </div>
                          <Alert>
                            <AlertDescription className="text-sm">
                              <strong>FCA Expectation:</strong> Manufacturers should have formal processes to obtain and analyse distributor feedback as part of ongoing product reviews.
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="distributor-obligations" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Distributor Obligations</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      {/* Obligation 1 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 1: Obtain Information (PRIN 2A.3)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Distributors must actively obtain information from manufacturers:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Product features and target market</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Fair value assessment summary</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Distribution strategy</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Any restrictions or requirements</span>
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Additional requirements:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Understand the product thoroughly</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Ask for clarification if information inadequate</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Keep information up to date</span>
                              </li>
                            </ul>
                          </div>
                          <Alert>
                            <AlertDescription className="text-sm">
                              <strong>FCA Note:</strong> Distributors cannot simply accept manufacturer information at face value - they must satisfy themselves it is adequate for their purposes.
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>

                      {/* Obligation 2 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 2: Distribution Arrangements (PRIN 2A.3)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Requirements:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Develop arrangements ensuring products reach target market</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Do NOT distribute to customers outside target market</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Have processes to identify target market customers</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Monitor sales patterns</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Take action if selling outside target market</span>
                              </li>
                            </ul>
                          </div>
                          <RegulatoryQuote
                            source="FCA"
                            reference="FG22/5"
                            quote="Distributors must ensure they are offering products to customers for whom they are appropriate"
                          />
                        </CardContent>
                      </Card>

                      {/* Obligation 3 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 3: Fair Value Assessment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Requirements:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Consider whether product provides fair value</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Particular focus on distributor's OWN charges/fees</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Ensure cumulative charges don't undermine manufacturer's FVA</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Take action if value proposition eroded by distribution costs</span>
                              </li>
                            </ul>
                          </div>
                          <Card className="bg-warning/5 border-warning/50">
                            <CardHeader>
                              <CardTitle className="text-sm">Example Scenario</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                              <div className="space-y-1">
                                <p>• Manufacturer conducts FVA showing product offers fair value with total cost 1.5% p.a.</p>
                                <p>• Distributor adds 0.5% platform fee + 0.3% advice fee</p>
                                <p>• Total cost now 2.3% p.a.</p>
                                <p className="font-semibold text-warning mt-2">Distributor must assess whether still fair value</p>
                                <p className="text-muted-foreground">If not, distributor in breach even if manufacturer's original FVA was sound</p>
                              </div>
                            </CardContent>
                          </Card>
                        </CardContent>
                      </Card>

                      {/* Obligation 4 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 4: Feedback to Manufacturers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Distributors must provide relevant information to manufacturers:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Sales volumes and customer characteristics</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Sales outside target market (with reasons)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Customer feedback and complaints</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Questions frequently asked by customers</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5">•</span>
                                <span>Any issues with product or communications</span>
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Additional requirements:</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Timely reporting (as agreed with manufacturer)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Flag concerns proactively</span>
                              </li>
                            </ul>
                          </div>
                          <Alert>
                            <AlertDescription className="text-sm">
                              <strong>Purpose:</strong> Enable manufacturers to conduct effective product reviews.
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>

                      {/* Obligation 5 */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Obligation 5: Own Product Modifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Alert className="border-warning/50 bg-warning/5">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription className="space-y-3">
                              <p>If distributor creates own literature, changes features, or adds services:</p>
                              <ul className="space-y-2 text-sm ml-4 mt-2">
                                <li className="flex items-start gap-2">
                                  <span className="mt-1.5">•</span>
                                  <span>Distributor becomes co-manufacturer for those elements</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="mt-1.5">•</span>
                                  <span>Must ensure modifications don't undermine outcomes</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="mt-1.5">•</span>
                                  <span>Must conduct own testing/assessment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="mt-1.5">•</span>
                                  <span>Takes on manufacturer-level obligations for modified elements</span>
                                </li>
                              </ul>
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="appointed-representatives" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <span>Appointed Representatives (ARs)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <Alert className="border-primary/50 bg-primary/5">
                        <Scale className="h-4 w-4 text-primary" />
                        <AlertTitle>Regulatory Framework</AlertTitle>
                        <AlertDescription className="space-y-2">
                          <p>• Principal firm is responsible for AR's compliance with Consumer Duty</p>
                          <p>• AR is an "agent" of the principal - acts on principal's behalf</p>
                          <p>• Principal must ensure AR delivers good outcomes</p>
                          <p>• Cannot delegate responsibility</p>
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Principal Firm Obligations</h4>
                          
                          <div className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Enhanced Due Diligence</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Robust AR selection process</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Competence and capability assessment</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Financial stability checks</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Fit and proper assessment</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Understanding of Consumer Duty obligations</span>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Oversight Framework</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Clear AR agreement with Consumer Duty obligations</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Regular monitoring of AR activity</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Outcome monitoring (complaints, sales quality)</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Periodic reviews and audits</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Access to AR systems and records</span>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Training Requirements</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Ensure AR staff trained on Consumer Duty</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Competency assessments</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Ongoing training and updates</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Specialized training for vulnerable customers</span>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Support and Intervention</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Provide guidance and support materials</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Respond to AR queries promptly</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Intervene if issues identified</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Remediation where necessary</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Termination if serious breaches</span>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <Alert className="border-warning/50 bg-warning/5">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          <AlertTitle>FCA Finding (Multi-firm reviews)</AlertTitle>
                          <AlertDescription>
                            "Principals often had inadequate oversight of ARs, with limited monitoring of customer outcomes and reactive rather than proactive supervision"
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="outsourcing" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span>Outsourcing and Third Parties</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <RegulatoryQuote
                        source="FCA"
                        reference="FG22/5"
                        quote="A firm remains fully responsible for its compliance with Consumer Duty even when it outsources activities"
                      />

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Common Outsourced Functions</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>Customer service and call centres</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>Claims handling (insurance)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>Debt collection</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>Payment processing</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>Technology platforms</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>Marketing services</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>Data analytics</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Outsourcing Firm Obligations</h4>
                          
                          <div className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Due Diligence</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Assess third party's capability to support Consumer Duty</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Review systems, processes, training</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Check track record and reputation</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Financial stability assessment</span>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Contractual Requirements</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Consumer Duty obligations in contract</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Information provision requirements</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Access rights for monitoring</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Remediation and redress obligations</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Performance standards aligned to outcomes</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Termination rights if breaches occur</span>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Ongoing Oversight</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Regular performance monitoring</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Outcome data analysis</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Quality assurance reviews</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Customer feedback analysis</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Audit rights exercised</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Issue escalation procedures</span>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <Alert>
                          <AlertDescription className="text-sm">
                            <strong>FCA Expectation:</strong> Outsourcing arrangements should be documented, monitored and reviewed to ensure they support delivery of good outcomes.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* IMPLEMENTATION STEPS TAB */}
            <TabsContent value="implementation" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Implementation Steps</h2>
                <p className="text-muted-foreground mb-6">
                  Follow these phases to establish comprehensive distribution chain management aligned with Consumer Duty requirements.
                </p>

                <div className="space-y-6">
                  {/* Phase 1 */}
                  <ChecklistSection
                    stepNumber={1}
                    title="PHASE 1: MAPPING & ASSESSMENT (Weeks 1-3)"
                    moduleId="cd-i6"
                    items={[
                      {
                        id: "cd-i6-step-1-1",
                        label: "Map Complete Distribution Chain",
                        details: "For each product line, identify ALL parties: manufacturers, intermediaries, platforms, distributors, outsourced functions, ARs. Document chain structure visually.",
                        responsible: "Distribution Strategy Team",
                        duration: "1 week"
                      },
                      {
                        id: "cd-i6-step-1-2",
                        label: "Classify Each Firm's Role",
                        details: "Classify as: Pure manufacturer, Pure distributor, Manufacturer-distributor, Platform/intermediary, Outsourced service provider, or Appointed Representative.",
                        responsible: "Compliance Team",
                        duration: "3-4 days"
                      },
                      {
                        id: "cd-i6-step-1-3",
                        label: "Assess Current Arrangements",
                        details: "Review existing contracts, information flows, monitoring processes. Identify gaps against Consumer Duty requirements.",
                        responsible: "Legal & Compliance",
                        duration: "1-2 weeks"
                      },
                      {
                        id: "cd-i6-step-1-4",
                        label: "Stakeholder Engagement",
                        details: "Identify key contacts at each firm. Initial outreach, schedule meetings, establish communication channels.",
                        responsible: "Relationship Managers",
                        duration: "2-3 weeks"
                      }
                    ]}
                  />

                  {/* Phase 2 */}
                  <ChecklistSection
                    stepNumber={2}
                    title="PHASE 2: MANUFACTURER FRAMEWORK (Weeks 2-5)"
                    moduleId="cd-i6"
                    items={[
                      {
                        id: "cd-i6-step-2-1",
                        label: "Enhance Product Governance",
                        details: "Update product approval process: target market (granular), negative target market, distribution strategy, distributor capabilities, channel restrictions. Create product information packs.",
                        responsible: "Product Teams",
                        duration: "2-3 weeks"
                      },
                      {
                        id: "cd-i6-step-2-2",
                        label: "Implement Fair Value Assessment Sharing",
                        details: "Determine FVA information to share with distributors: summary, key factors, assumptions, marginal value segments. Create distributor-facing FVA summary template.",
                        responsible: "Product & Pricing",
                        duration: "1-2 weeks"
                      },
                      {
                        id: "cd-i6-step-2-3",
                        label: "Establish Distributor Feedback Mechanisms",
                        details: "Define required information: sales data, outside target market sales, complaints, customer questions, outcome indicators. Agree reporting frequency, create templates, set up systems.",
                        responsible: "MI & Analytics",
                        duration: "2-3 weeks"
                      },
                      {
                        id: "cd-i6-step-2-4",
                        label: "Distribution Strategy Monitoring",
                        details: "Define monitoring approach: channel analysis, target market metrics, capability reviews. Set escalation thresholds, establish intervention protocols.",
                        responsible: "Distribution Oversight",
                        duration: "1-2 weeks"
                      }
                    ]}
                  />

                  {/* Phase 3 */}
                  <ChecklistSection
                    stepNumber={3}
                    title="PHASE 3: DISTRIBUTOR FRAMEWORK (Weeks 3-6)"
                    moduleId="cd-i6"
                    items={[
                      {
                        id: "cd-i6-step-3-1",
                        label: "Implement Information Gathering Process",
                        details: "For each product: obtain complete product information pack, target market, FVA summary, distribution requirements. Assess adequacy, request additional info if needed. Train staff.",
                        responsible: "Distribution Teams",
                        duration: "2-3 weeks"
                      },
                      {
                        id: "cd-i6-step-3-2",
                        label: "Align Distribution to Target Markets",
                        details: "Review distribution approach per product. Implement target market checks at acquisition and in sales process. Train staff, monitor sales patterns for alignment.",
                        responsible: "Sales & Compliance",
                        duration: "2-3 weeks"
                      },
                      {
                        id: "cd-i6-step-3-3",
                        label: "Assess Impact of Distributor Charges",
                        details: "Calculate total customer cost (manufacturer + platform + advice + other fees). Assess fair value at total cost. Take action if compromised.",
                        responsible: "Pricing & Product",
                        duration: "1-2 weeks"
                      },
                      {
                        id: "cd-i6-step-3-4",
                        label: "Implement Feedback to Manufacturers",
                        details: "Establish data collection: sales volumes, customer characteristics, outside target market sales, complaints. Set up reporting process, designate point of contact.",
                        responsible: "MI & Analytics",
                        duration: "1-2 weeks"
                      }
                    ]}
                  />

                  {/* Phase 4 */}
                  <ChecklistSection
                    stepNumber={4}
                    title="PHASE 4: APPOINTED REPRESENTATIVE OVERSIGHT (Weeks 4-7)"
                    moduleId="cd-i6"
                    items={[
                      {
                        id: "cd-i6-step-4-1",
                        label: "Enhance AR Agreements",
                        details: "Review and update AR agreements: explicit Consumer Duty obligations, outcome delivery requirements, information provision, training obligations, monitoring rights, remediation procedures, termination triggers.",
                        responsible: "Legal & AR Management",
                        duration: "2-3 weeks"
                      },
                      {
                        id: "cd-i6-step-4-2",
                        label: "Implement AR Monitoring Framework",
                        details: "Define monitoring approach: outcome data, collection frequency, concern thresholds, audit schedule. Set up data collection systems, analyze for issues, establish intervention protocols.",
                        responsible: "AR Oversight Team",
                        duration: "2-3 weeks"
                      },
                      {
                        id: "cd-i6-step-4-3",
                        label: "AR Training Programme",
                        details: "Develop Consumer Duty training: core principles, Four Outcomes, vulnerable customers, product knowledge, complaints handling. Deliver to all AR staff, maintain records.",
                        responsible: "Training & Development",
                        duration: "2-3 weeks"
                      }
                    ]}
                  />

                  {/* Phase 5 */}
                  <ChecklistSection
                    stepNumber={5}
                    title="PHASE 5: OUTSOURCING ARRANGEMENTS (Weeks 5-8)"
                    moduleId="cd-i6"
                    items={[
                      {
                        id: "cd-i6-step-5-1",
                        label: "Review Outsourcing Contracts",
                        details: "Identify all outsourced functions impacting outcomes. Review existing contracts: Consumer Duty mentions, outcome standards, MI requirements, audit rights, remediation processes. Prioritize gaps.",
                        responsible: "Legal & Procurement",
                        duration: "1-2 weeks"
                      },
                      {
                        id: "cd-i6-step-5-2",
                        label: "Update Outsourcing Agreements",
                        details: "Renegotiate to include: Consumer Duty alignment, outcome-based service standards, MI requirements, training requirements, audit rights, escalation procedures, remediation obligations, termination rights.",
                        responsible: "Legal & Procurement",
                        duration: "3-4 weeks"
                      },
                      {
                        id: "cd-i6-step-5-3",
                        label: "Implement Third-Party Monitoring",
                        details: "Define monitoring approach per function: outcome metrics, quality standards, SLAs, frequency. Establish data flows, conduct quality reviews, exercise audit rights.",
                        responsible: "Vendor Management",
                        duration: "2-3 weeks"
                      },
                      {
                        id: "cd-i6-step-5-4",
                        label: "Third-Party Escalation and Remediation",
                        details: "Define escalation triggers, establish remediation protocols, define termination criteria, identify backup provider options.",
                        responsible: "Risk & Compliance",
                        duration: "1-2 weeks"
                      }
                    ]}
                  />

                  {/* Phase 6 */}
                  <ChecklistSection
                    stepNumber={6}
                    title="PHASE 6: GOVERNANCE & CONTINUOUS IMPROVEMENT (Weeks 6-10, then ongoing)"
                    moduleId="cd-i6"
                    items={[
                      {
                        id: "cd-i6-step-6-1",
                        label: "Establish Distribution Chain Governance",
                        details: "Define governance structure: ownership, reporting lines, decision authorities, escalation pathways. Create oversight committee, define meeting cadence, integrate with overall Consumer Duty governance.",
                        responsible: "Executive Leadership",
                        duration: "2-3 weeks"
                      },
                      {
                        id: "cd-i6-step-6-2",
                        label: "Implement Chain-Wide Outcome Monitoring",
                        details: "Define end-to-end outcome metrics: complaints by chain party, sales outside target market, FOS referrals, satisfaction, value realization, vulnerable customer outcomes. Establish data aggregation, analyze patterns, take action.",
                        responsible: "MI & Analytics",
                        duration: "3-4 weeks"
                      },
                      {
                        id: "cd-i6-step-6-3",
                        label: "Regular Distribution Chain Reviews",
                        details: "Conduct quarterly reviews: outcome data, issues/trends, compliance with agreements, information sharing effectiveness. Annual deep-dives: comprehensive relationship assessment, AR portfolio review, outsourcing effectiveness, strategic channel fit.",
                        responsible: "Governance Committee",
                        duration: "Ongoing"
                      },
                      {
                        id: "cd-i6-step-6-4",
                        label: "Continuous Improvement and Collaboration",
                        details: "Foster collaborative relationships: regular forums, joint product development, shared insights, best practice sharing. Capture lessons learned, iterate and enhance processes.",
                        responsible: "All Teams",
                        duration: "Ongoing"
                      }
                    ]}
                  />
                </div>

                <Alert className="mt-6">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle>Implementation Note</AlertTitle>
                  <AlertDescription>
                    These phases can be adapted based on your firm's role (manufacturer, distributor, or both) and existing distribution chain maturity. Focus on the phases most relevant to your business model while ensuring end-to-end accountability.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            {/* TEMPLATES & TOOLS TAB */}
            <TabsContent value="templates" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Templates & Tools</h2>
                <p className="text-muted-foreground mb-6">
                  Downloadable templates and tools to support your distribution chain management implementation.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <TemplateCard
                    title="1. Distribution Chain Mapping Tool"
                    description="Excel-based tool with multiple tabs: Chain Visualization, Entity Register, Information Flows, Risks & Issues. Visual flowchart showing all entities and relationships."
                    format="Excel"
                    onDownload={() => toast.info("Template download coming soon")}
                  />

                  <TemplateCard
                    title="2. Distribution Chain Assessment Checklist"
                    description="Comprehensive checklist organized by regulatory requirement covering Manufacturer Obligations, Distributor Obligations, AR oversight, and Outsourcing compliance."
                    format="Excel"
                    onDownload={() => toast.info("Template download coming soon")}
                  />

                  <TemplateCard
                    title="3. Product Information Pack for Distributors"
                    description="Word template structure with 8 sections: Product Summary, Target Market Definition (positive & negative), FVA Summary, Distribution Strategy, Consumer Understanding Requirements, Consumer Support Requirements, Monitoring & Feedback, Version Control."
                    format="Word"
                    onDownload={() => toast.info("Template download coming soon")}
                  />

                  <TemplateCard
                    title="4. Distributor Feedback Report Template"
                    description="Monthly/Quarterly Excel report with 6 tabs: Sales Data, Sales Outside Target Market, Customer Feedback, Complaints, Outcome Indicators, Issues & Concerns."
                    format="Excel"
                    onDownload={() => toast.info("Template download coming soon")}
                  />

                  <TemplateCard
                    title="5. AR Agreement Consumer Duty Addendum"
                    description="Legal document template addendum covering 8 clauses: Consumer Duty Obligations, Training & Competence, Information Provision, Product Distribution, Monitoring & Audit, Remediation, Termination, Indemnity."
                    format="Word"
                    onDownload={() => toast.info("Template download coming soon")}
                  />

                  <TemplateCard
                    title="6. Outsourcing Agreement Consumer Duty Addendum"
                    description="Contract addendum template with 8 clauses: Consumer Duty Alignment, Service Standards, Information Provision, Monitoring & Audit, Training, Issue Management, Customer Redress, Termination."
                    format="Word"
                    onDownload={() => toast.info("Template download coming soon")}
                  />

                  <TemplateCard
                    title="7. Distribution Chain Governance Framework"
                    description="Document template defining governance structure, roles & responsibilities (RACI matrix), decision authorities, information requirements, meeting protocols, Board reporting, annual review process."
                    format="Word"
                    onDownload={() => toast.info("Template download coming soon")}
                  />

                  <TemplateCard
                    title="8. Chain-Wide Outcome Monitoring Dashboard"
                    description="Dashboard specification for Power BI/Tableau/Excel with 6 views: Distribution Channel Performance, Manufacturer-Distributor Information Flow, AR Performance, Outsourced Function Performance, Issues & Actions, Trend Analysis."
                    format="PowerPoint"
                    onDownload={() => toast.info("Template download coming soon")}
                  />

                  <TemplateCard
                    title="9. Third-Party Assessment Checklist"
                    description="Due diligence checklist for outsourcing covering Capability Assessment (Consumer Duty understanding, systems, people, track record), Contract Review, and Ongoing Monitoring requirements."
                    format="Excel"
                    onDownload={() => toast.info("Template download coming soon")}
                  />
                </div>

                <Card className="mt-6 border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      User Guidance Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">How to Use These Templates</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Customize for your context:</strong> All templates are starting points - adapt to your firm's products, distribution channels, and regulatory context</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Collaborative approach:</strong> Share templates with chain partners early to align on format and content expectations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Legal review:</strong> Have legal counsel review all addenda and agreements before execution</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Version control:</strong> Maintain clear version control and change logs, especially for product information packs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Regular updates:</strong> Review and update templates at least annually to reflect regulatory changes and lessons learned</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Priority Templates</h4>
                      <p className="text-muted-foreground mb-2">If resources are limited, start with:</p>
                      <ol className="space-y-1 text-muted-foreground ml-4">
                        <li>1. Distribution Chain Mapping Tool (foundational)</li>
                        <li>2. Product Information Pack for Distributors (manufacturers)</li>
                        <li>3. Distributor Feedback Report Template (both)</li>
                        <li>4. AR Agreement Addendum (if applicable)</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* SUCCESS CRITERIA TAB */}
            <TabsContent value="success" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Success Criteria</h2>
                <p className="text-muted-foreground mb-6">
                  Use these criteria to assess your distribution chain management implementation and readiness for regulatory scrutiny.
                </p>

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="mapping" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Network className="h-5 w-5 text-primary" />
                        <span>Identification and Mapping</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Complete distribution chain mapping</p>
                          <p className="text-sm text-muted-foreground">All products have distribution chains fully mapped, all parties identified (manufacturers, distributors, platforms, ARs, outsourced), roles clearly defined, visual representation created</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Relationship documentation</p>
                          <p className="text-sm text-muted-foreground">Contractual agreements in place with all chain parties including Consumer Duty obligations, information sharing protocols documented, governance structure established</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="manufacturer" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <span>Manufacturer Performance</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Product governance compliance</p>
                          <p className="text-sm text-muted-foreground">100% of products have granular target market definitions, negative target markets identified, distribution strategies documented, product information packs created, distributor capability requirements specified</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Information sharing effectiveness</p>
                          <p className="text-sm text-muted-foreground">All distributors confirm adequate product information received, packs updated at least annually, distributors understand target markets and FVA summaries</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Distributor monitoring</p>
                          <p className="text-sm text-muted-foreground">Distributor feedback received quarterly minimum, sales outside target market tracked and investigated, action taken when distributors not adhering to strategy, regular manufacturer-distributor forums held</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="distributor" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Distributor Performance</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Information gathering</p>
                          <p className="text-sm text-muted-foreground">Product information obtained for all distributed products, gaps identified and clarification sought, product information kept current</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Target market alignment</p>
                          <p className="text-sm text-muted-foreground">Processes ensure sales to target market only, sales outside target market less than 5% and justified, staff trained on target markets, system controls support adherence</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Fair value maintained</p>
                          <p className="text-sm text-muted-foreground">Impact of distributor charges assessed for all products, no products where charges undermine manufacturer FVA, value assessment documented</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Feedback to manufacturers</p>
                          <p className="text-sm text-muted-foreground">Sales data, complaints, outcome data provided quarterly, issues escalated promptly, regular meetings with manufacturers</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ar-oversight" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <span>AR Oversight</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Enhanced AR oversight</p>
                          <p className="text-sm text-muted-foreground">All AR agreements updated with Consumer Duty obligations, all ARs trained (greater than 90% completion), outcome data collected monthly, performance monitored against principals, issues addressed, annual audits conducted</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">AR outcome parity</p>
                          <p className="text-sm text-muted-foreground">AR customer outcomes comparable to principal's direct customers, complaint rates within acceptable variance (less than 10% higher), satisfaction scores comparable</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="outsourcing" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span>Outsourcing Management</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Contract compliance</p>
                          <p className="text-sm text-muted-foreground">All outsourcing contracts include Consumer Duty requirements, service levels aligned to good outcomes, MI requirements specified and data flowing, audit rights exercised annually</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Third-party performance</p>
                          <p className="text-sm text-muted-foreground">Outsourced functions meet service levels greater than 95% of time, customer satisfaction greater than 4/5, issues identified and remediated within SLA timeframes</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="chain-wide" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Network className="h-5 w-5 text-primary" />
                        <span>Chain-Wide Outcomes</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">End-to-end monitoring</p>
                          <p className="text-sm text-muted-foreground">Chain-wide outcome monitoring dashboard operational, outcome data analyzed quarterly, cross-chain issues identified and addressed, joint remediation with chain partners when needed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Collaborative relationships</p>
                          <p className="text-sm text-muted-foreground">Regular manufacturer-distributor forums held, information sharing protocols working effectively, collaborative approach to product improvements, best practice shared across chain</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="governance" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Scale className="h-5 w-5 text-primary" />
                        <span>Governance</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Distribution chain governance</p>
                          <p className="text-sm text-muted-foreground">Oversight committee established and meeting regularly, distribution chain risks escalated to Board, annual distribution chain review completed, Board receives distribution chain outcome reporting</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="regulatory" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Regulatory Compliance</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Examination readiness</p>
                          <p className="text-sm text-muted-foreground">Can demonstrate compliance with manufacturer obligations, distributor obligations, AR & outsourced function oversight, end-to-end customer outcomes across chain. Documentation and evidence comprehensive.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Card className="mt-6 border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle>Timeline Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weeks 1-3:</span>
                        <span className="font-medium">Complete distribution chain mapping</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weeks 2-5:</span>
                        <span className="font-medium">Manufacturer frameworks implemented</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weeks 3-6:</span>
                        <span className="font-medium">Distributor frameworks implemented</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weeks 4-7:</span>
                        <span className="font-medium">AR oversight enhanced</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weeks 5-8:</span>
                        <span className="font-medium">Outsourcing arrangements updated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Week 10:</span>
                        <span className="font-medium">Chain-wide monitoring operational</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ongoing:</span>
                        <span className="font-medium">Continuous improvement and collaboration</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* COMMON PITFALLS TAB */}
            <TabsContent value="pitfalls" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Common Pitfalls</h2>
                <p className="text-muted-foreground mb-6">
                  Learn from FCA multi-firm reviews and enforcement themes to avoid these common distribution chain failures.
                </p>

                <div className="space-y-4">
                  <PitfallCard
                    title="PITFALL 1: ONE-WAY INFORMATION FLOW"
                    description="Information sharing often one-way from manufacturer to distributor without adequate feedback loop (FCA Finding)"
                    impact="Manufacturers cannot conduct effective product reviews, poor outcomes not identified until too late, distributors aware of issues but manufacturer unaware"
                    prevention="Formal agreements requiring bidirectional information sharing, standardized distributor feedback templates, quarterly manufacturer-distributor review meetings, escalation protocols for urgent issues"
                  />

                  <PitfallCard
                    title="PITFALL 2: GENERIC PRODUCT INFORMATION"
                    description="Generic product information insufficient for distributors to comply with their obligations (FCA Finding)"
                    impact="Distributors cannot determine who product is suitable for, sales to unsuitable customers, poor outcomes not foreseeable by distributor due to inadequate information"
                    prevention="Detailed, specific product information packs, granular target market definitions (not 'UK adults aged 18+'), clear negative target market specification, FVA summary with segment-specific insights, worked examples of suitable vs unsuitable customers"
                  />

                  <PitfallCard
                    title="PITFALL 3: NO FORMAL INFORMATION SHARING AGREEMENTS"
                    description="No formal agreements on information sharing frequency or format (FCA Finding)"
                    impact="Ad hoc information requests creating inefficiency, inconsistent or incomplete data, delays in identifying and addressing issues, no clear accountability"
                    prevention="Document information sharing requirements in contracts, specify frequency (monthly, quarterly, annually), standardize formats (templates, data feeds), define escalation triggers, assign ownership and review cycles"
                  />

                  <PitfallCard
                    title="PITFALL 4: SALES OUTSIDE TARGET MARKET NOT INVESTIGATED"
                    description="Limited monitoring of whether distributors adhering to target market with sales outside target market not investigated (FCA Finding)"
                    impact="Systematic sales to unsuitable customers, product causing harm to negative target market, regulatory intervention and redress schemes"
                    prevention="Mandatory reporting of all sales outside target market, require distributor to explain circumstances, manufacturer reviews and challenges explanations, trend analysis to identify systematic issues, action taken (enhanced training, distribution restrictions, product withdrawal). FCA Expectation: Sales outside target market should be exception not norm (<5%) and always justified"
                  />

                  <PitfallCard
                    title="PITFALL 5: INADEQUATE AR OVERSIGHT"
                    description="Principals often had inadequate oversight of ARs with poor outcome monitoring and reactive rather than proactive supervision (FCA Finding)"
                    impact="ARs causing consumer harm, principal unaware until regulatory investigation, principal liable for AR conduct, enforcement action against principal, AR prohibition. FCA: 'The principal is responsible for the AR's compliance. Inadequate oversight is not a defence.'"
                    prevention="Robust AR selection and onboarding, comprehensive AR training on Consumer Duty, monthly AR outcome data collection and analysis, quarterly AR performance reviews, annual on-site AR audits, proactive intervention when issues identified, termination of problematic ARs"
                  />

                  <PitfallCard
                    title="PITFALL 6: OUTSOURCING WITHOUT CONSUMER DUTY UPDATES"
                    description="Outsourcing agreements not updated for Consumer Duty requirements with limited monitoring of third-party contribution to outcomes (FCA Finding)"
                    impact="Third party operates to old standards, third party causes poor customer outcomes, firm liable despite outsourcing, difficulty terminating due to weak contracts. FCA Position: 'You cannot outsource responsibility for Consumer Duty compliance'"
                    prevention="Update all outsourcing contracts with Consumer Duty obligations, define outcome-based service levels, require third party to provide outcome MI, exercise audit rights regularly, have termination rights for Consumer Duty failures, maintain internal capability or backup provider options"
                  />

                  <PitfallCard
                    title="PITFALL 7: DISTRIBUTOR CHARGES UNDERMINE FAIR VALUE"
                    description="Distributors not assessing whether their own charges cumulatively result in poor value for customers (FCA Finding)"
                    impact="Product that offered fair value at manufacturer level no longer fair value after distribution costs, customers paying excessive total fees, both manufacturer and distributor liable, enforcement action and remediation required"
                    prevention="Distributors must calculate total cost to customer (manufacturer + distributor fees), assess whether value maintained at cumulative price point, if not: reduce distributor fees OR stop distributing product OR enhance service to justify fees, document assessment"
                  />

                  <PitfallCard
                    title="PITFALL 8: NO ESCALATION PROTOCOLS"
                    description="Lack of clear escalation procedures when issues identified across distribution chain (FCA Finding)"
                    impact="Issues known but not actioned, diffusion of responsibility, consumer harm continues, slow remediation"
                    prevention="Define clear escalation triggers (thresholds for complaints, sales outside target market, etc.), specify who escalates to whom, set timelines for response and action, document escalations and outcomes, governance oversight of escalated issues"
                  />

                  <PitfallCard
                    title="PITFALL 9: 'SET AND FORGET' AR AGREEMENTS"
                    description="AR agreements signed years ago and never reviewed or updated for Consumer Duty (FCA Finding)"
                    impact="AR agreements don't mention Consumer Duty, no contractual basis for Consumer Duty monitoring, difficult to enforce Consumer Duty compliance, limited remedies if AR fails"
                    prevention="Review all AR agreements, update or addendum for Consumer Duty, ensure ARs sign updated agreements, annual review of AR agreements, align with latest regulatory expectations"
                  />

                  <PitfallCard
                    title="PITFALL 10: ASSUMING DISTRIBUTOR WILL PASS ON INFORMATION TO CUSTOMERS"
                    description="Manufacturers providing information to distributors but not verifying it reaches customers correctly (FCA Finding)"
                    impact="Key information doesn't reach customers, customer misunderstanding, poor outcomes, manufacturer may be liable despite providing information to distributor. FCA Expectation: Manufacturers must ensure distributors are actually communicating key information to customers"
                    prevention="Manufacturers specify which information must be provided to customers, require distributors to confirm they are providing required information, spot-check customer-facing materials, mystery shopping to verify customer experience, address gaps when identified"
                  />

                  <PitfallCard
                    title="PITFALL 11: SILOED THINKING - NOT CONSIDERING END-TO-END JOURNEY"
                    description="Firms focusing on their own part of the chain without considering end-to-end customer journey (FCA Finding)"
                    impact="Disjointed customer experience, gaps in support or information, poor overall outcomes despite each firm meeting own standards, blame-shifting when issues arise. Required Mindset: 'We are all responsible for the end-to-end customer outcome, not just our piece'"
                    prevention="Map complete customer journey across all chain parties, identify handoffs and potential gaps, joint responsibility for customer outcomes, collaborative problem-solving, share customer feedback across chain"
                  />

                  <PitfallCard
                    title="PITFALL 12: CONTRACTUAL DISPUTES DELAYING ACTION"
                    description="Chain parties arguing about whose responsibility it is to remediate while customers continue to experience harm (FCA Finding)"
                    impact="Consumer harm continues during disputes, regulatory intervention, both parties liable, reputational damage. FCA Position: 'Customers should not suffer while firms dispute who is at fault. Fix the problem for customers first.'"
                    prevention="Clear contractual responsibilities from outset, dispute resolution procedures in agreements, 'Fix first, argue later' principle for customer harm, escalation to senior management when disputes arise, independent mediation if needed"
                  />
                </div>

                <Alert className="mt-6 border-destructive/50 bg-destructive/5">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <AlertTitle className="text-destructive">Critical Regulatory Risk Areas</AlertTitle>
                  <AlertDescription>
                    <p className="mb-3">FCA has identified the following as high-priority enforcement themes:</p>
                    <ul className="space-y-1 text-sm ml-4">
                      <li>• Systematic sales outside target market (HIGH RISK)</li>
                      <li>• Information failures leading to customer misunderstanding (HIGH RISK)</li>
                      <li>• AR oversight failures causing consumer harm (VERY HIGH RISK)</li>
                      <li>• Outsourcing failures where third party causes poor outcomes (HIGH RISK)</li>
                      <li>• Distributor charges undermining fair value (HIGH RISK)</li>
                      <li>• Delays in remediation due to contractual disputes (HIGH RISK)</li>
                    </ul>
                    <p className="mt-3 font-semibold">FCA Powers: Can take action against ANY firm in chain, require firms to work together to remediate, prohibit distribution channels if systematic harm, redress may be required from multiple parties.</p>
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}