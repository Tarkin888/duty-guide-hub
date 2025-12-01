import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Printer, Download, BarChart3, CheckCircle2, AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { updateModuleStatus, addActivity } from "@/lib/storage";
import { toast } from "sonner";

export default function CDM1MIFramework() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"not-started" | "in-progress" | "completed">(() => {
    const stored = localStorage.getItem("module-cd-m1-status");
    return (stored as "not-started" | "in-progress" | "completed") || "not-started";
  });

  const handleStatusChange = (newStatus: "not-started" | "in-progress" | "completed") => {
    setStatus(newStatus);
    updateModuleStatus("cd-m1", newStatus);
    addActivity("status_updated", "CD-M1: MI & Outcome Monitoring Framework");
    toast.success(`Module status updated to ${newStatus}`);
  };

  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const handleExport = () => {
    toast.success("Export functionality coming soon");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">Monitoring Module</Badge>
                  <Badge variant="secondary">{status.replace("-", " ").toUpperCase()}</Badge>
                </div>
                <h1 className="text-3xl font-bold">CD-M1: MI & Outcome Monitoring Framework Implementation</h1>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Establish comprehensive Management Information framework to evidence good outcomes across all four Consumer Duty outcomes and enable data-driven decision-making
            </p>
          </div>

          <div className="flex items-center gap-2">
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
            </div>
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-6 w-full">
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
                  <CardTitle>Module Overview</CardTitle>
                  <CardDescription>Understanding the MI & Outcome Monitoring Framework</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Purpose</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Establish a comprehensive Management Information (MI) framework to evidence good outcomes across all four Consumer Duty outcomes and enable data-driven decision-making. MI is the engine of Consumer Duty compliance - without robust data, firms cannot evidence they're delivering good outcomes.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Regulatory Foundation</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Consumer Duty (all four outcomes)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>FCA Board Reporting Requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>PRIN 2A.5 (Outcome Monitoring)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>FCA Multi-firm Review Findings</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Duration</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        <strong className="text-foreground">4-6 weeks</strong> to establish framework, then <strong className="text-foreground">ongoing continuous monitoring</strong>
                      </p>
                      
                      <h3 className="font-semibold text-lg mb-3">Effort Level</h3>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded ${
                              level <= 5 ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Very High - foundational to all Consumer Duty compliance</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Scope</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "All four Consumer Duty outcomes",
                        "Vulnerable customer outcomes",
                        "Distribution chain monitoring",
                        "Board reporting requirements",
                        "Data quality and governance",
                        "Predictive analytics capability"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Deliverables</h3>
                    <div className="space-y-2">
                      {[
                        "Consumer Outcomes KPI Framework (leading and lagging indicators)",
                        "MI Dashboard specifications (management and board level)",
                        "Data quality and governance framework",
                        "Threshold and trigger matrix",
                        "Reporting frequency and escalation protocols",
                        "Data integration architecture",
                        "Predictive analytics capability",
                        "Differential outcomes analysis methodology",
                        "Evidence repository structure",
                        "Board reporting pack templates"
                      ].map((deliverable, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <RegulatoryQuote
                    source="FCA"
                    reference="Board Reporting Guidance"
                    quote="Firms must be able to demonstrate through robust MI that they are consistently delivering good outcomes for retail customers, including vulnerable customers."
                  />

                  <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg">
                    <div className="flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">Critical Principle</p>
                        <p className="text-sm text-muted-foreground">
                          MI is the engine of Consumer Duty compliance - without robust data, firms cannot evidence they're delivering good outcomes. This is not just reporting; it's the mechanism for identifying issues, driving improvements, and demonstrating to the Board and FCA that good outcomes are being achieved.
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
                  <CardTitle>Regulatory Foundation</CardTitle>
                  <CardDescription>FCA expectations and requirements for MI and outcome monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="mi-quality">
                      <AccordionTrigger className="text-lg font-semibold">
                        1. FCA Expectations on MI Quality
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <RegulatoryQuote
                          source="FCA"
                          reference="Board Reports Guidance"
                          quote="MI should be of sufficient quality to justify the conclusions drawn in the board report. Where data is insufficient, firms should identify gaps and plans to address them."
                        />

                        <div>
                          <h4 className="font-semibold mb-3">Key Requirements</h4>
                          <div className="space-y-3">
                            <div className="border-l-4 border-primary pl-4 py-2">
                              <p className="font-medium text-sm mb-1">Comprehensive</p>
                              <p className="text-sm text-muted-foreground">MI must cover all four outcomes, not just complaints</p>
                            </div>
                            <div className="border-l-4 border-primary pl-4 py-2">
                              <p className="font-medium text-sm mb-1">Reliable</p>
                              <p className="text-sm text-muted-foreground">Data quality must be assured and auditable</p>
                            </div>
                            <div className="border-l-4 border-primary pl-4 py-2">
                              <p className="font-medium text-sm mb-1">Granular</p>
                              <p className="text-sm text-muted-foreground">Must segment by customer type, especially vulnerable customers</p>
                            </div>
                            <div className="border-l-4 border-primary pl-4 py-2">
                              <p className="font-medium text-sm mb-1">Timely</p>
                              <p className="text-sm text-muted-foreground">Frequency appropriate to identify and prevent harm</p>
                            </div>
                            <div className="border-l-4 border-primary pl-4 py-2">
                              <p className="font-medium text-sm mb-1">Actionable</p>
                              <p className="text-sm text-muted-foreground">Must drive decisions and improvements</p>
                            </div>
                            <div className="border-l-4 border-primary pl-4 py-2">
                              <p className="font-medium text-sm mb-1">Forward-looking</p>
                              <p className="text-sm text-muted-foreground">Include predictive indicators, not just retrospective</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="leading-lagging">
                      <AccordionTrigger className="text-lg font-semibold">
                        2. Leading vs Lagging Indicators
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <p className="text-sm text-muted-foreground">
                          Essential distinction for effective monitoring - firms must use a combination to create a complete picture.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card className="border-2">
                            <CardHeader>
                              <CardTitle className="text-base">Lagging Indicators</CardTitle>
                              <CardDescription>Retrospective</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-2">Characteristics:</p>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  <li>• Measure past performance and outcomes</li>
                                  <li>• Confirm what has already happened</li>
                                  <li>• By the time you see the problem, harm may have occurred</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Examples:</p>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  <li>• Complaint volumes</li>
                                  <li>• FOS uphold rates</li>
                                  <li>• Customer churn</li>
                                  <li>• CSAT scores</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Useful for:</p>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  <li>• Assurance</li>
                                  <li>• Trend analysis</li>
                                  <li>• Board reporting</li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-2 border-primary">
                            <CardHeader>
                              <CardTitle className="text-base">Leading Indicators</CardTitle>
                              <CardDescription>Predictive</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-2">Characteristics:</p>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  <li>• Forecast future outcomes and potential issues</li>
                                  <li>• Enable proactive intervention</li>
                                  <li>• Prevent harm before it occurs</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Examples:</p>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  <li>• Training completion rates</li>
                                  <li>• FVA review timeliness</li>
                                  <li>• Communication testing scores</li>
                                  <li>• Product testing pass rates</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Useful for:</p>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  <li>• Early warning</li>
                                  <li>• Prevention</li>
                                  <li>• Management action</li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-sm font-medium mb-2">FCA Guidance</p>
                          <p className="text-sm text-muted-foreground">
                            Firms should use a combination of leading and lagging indicators to create a complete picture. Aim for approximately 40-50% leading indicators to enable prevention, and 50-60% lagging indicators for assurance.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="18-kpis">
                      <AccordionTrigger className="text-lg font-semibold">
                        3. The 18 Essential KPIs for Consumer Duty
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Framework of metrics across four outcomes, balanced between leading and lagging indicators.
                        </p>

                        <div>
                          <h4 className="font-semibold text-base mb-3 text-primary">LEADING INDICATORS (8 metrics)</h4>
                          <div className="space-y-3">
                            {[
                              {
                                name: "Communication Clarity Score",
                                outcome: "Consumer Understanding",
                                description: "Based on readability tests (Flesch-Kincaid) and user testing",
                                target: "Greater than 60 (greater than 70 for vulnerable customer versions)"
                              },
                              {
                                name: "Pre-Launch Product Outcomes Testing Success Rate",
                                outcome: "Products & Services",
                                description: "% of products passing rigorous pre-launch testing",
                                target: "100% before market launch"
                              },
                              {
                                name: "Target Market Definition Accuracy",
                                outcome: "Products & Services",
                                description: "Qualitative score on granularity and vulnerability consideration",
                                target: "Assessed through review process"
                              },
                              {
                                name: "Price-to-Benefit Benchmark Ratio",
                                outcome: "Price & Value",
                                description: "Comparative analysis vs market and own portfolio",
                                target: "Identifies pricing outliers requiring investigation"
                              },
                              {
                                name: "Sludge Audit Score",
                                outcome: "Consumer Support",
                                description: "Assessment of friction in customer journeys (1-5 scale)",
                                target: "Less than 2 (minimal friction)"
                              },
                              {
                                name: "Staff Consumer Duty Training Completion Rate",
                                outcome: "Cross-Cutting",
                                description: "% of staff completing mandatory training",
                                target: "Greater than 95% within target timeframe"
                              },
                              {
                                name: "Vulnerable Customer Identification Rate",
                                outcome: "Cross-Cutting",
                                description: "% of estimated vulnerable population proactively identified",
                                target: "Match estimated prevalence"
                              },
                              {
                                name: "Change Initiative Risk Assessment Score",
                                outcome: "Cross-Cutting",
                                description: "Risk scoring of new initiatives before launch",
                                target: "Prevents new sources of harm"
                              }
                            ].map((kpi, index) => (
                              <Card key={index} className="bg-primary/5">
                                <CardHeader className="pb-3">
                                  <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-sm">{index + 1}. {kpi.name}</CardTitle>
                                    <Badge variant="outline" className="text-xs">{kpi.outcome}</Badge>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <p className="text-sm text-muted-foreground">{kpi.description}</p>
                                  <div className="flex items-start gap-2 mt-2">
                                    <span className="text-xs font-medium text-primary">Target:</span>
                                    <span className="text-xs text-muted-foreground">{kpi.target}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-semibold text-base mb-3 text-secondary">LAGGING INDICATORS (10 metrics)</h4>
                          <div className="space-y-3">
                            {[
                              {
                                name: "Fair Value Assessment Outcome RAG",
                                outcome: "Price & Value",
                                description: "% of products Green/Amber/Red for value",
                                target: "Greater than 95% Green"
                              },
                              {
                                name: "Complaints Root Cause Ratio by Outcome",
                                outcome: "Cross-Cutting",
                                description: "Proportion of complaints attributable to each outcome",
                                target: "Identifies systemic issues"
                              },
                              {
                                name: "First Contact Resolution (FCR) Rate",
                                outcome: "Consumer Support",
                                description: "% of queries resolved first time",
                                target: "Greater than 80%"
                              },
                              {
                                name: "Average Complaint Resolution Time",
                                outcome: "Consumer Support",
                                description: "Days from logging to resolution",
                                target: "Less than 8 days (or firm-specific standard)"
                              },
                              {
                                name: "Customer Satisfaction (CSAT) Score for Support",
                                outcome: "Consumer Support",
                                description: "Transactional survey post-interaction",
                                target: "Greater than 4/5"
                              },
                              {
                                name: "Post-Sale Product Engagement Rate",
                                outcome: "Products & Services",
                                description: "% of customers actively using product features",
                                target: "Low engagement may indicate poor product-market fit"
                              },
                              {
                                name: "Customer Understanding Assessment Score",
                                outcome: "Consumer Understanding",
                                description: "Post-sale testing of comprehension",
                                target: "Greater than 85% pass rate"
                              },
                              {
                                name: "Outcome Variance for Vulnerable Customers",
                                outcome: "Cross-Cutting",
                                description: "Gap in outcomes between vulnerable and all customers",
                                target: "Less than 5% negative variance"
                              },
                              {
                                name: "Customer Churn/Lapse Rate",
                                outcome: "Products & Services / Price & Value",
                                description: "Rate of cancellation or non-renewal",
                                target: "May indicate poor value or unsuitable product"
                              },
                              {
                                name: "Net Promoter Score (NPS)",
                                outcome: "Cross-Cutting",
                                description: "Overall likelihood to recommend",
                                target: "While high-level, significant dips signal issues"
                              }
                            ].map((kpi, index) => (
                              <Card key={index} className="bg-secondary/5">
                                <CardHeader className="pb-3">
                                  <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-sm">{index + 9}. {kpi.name}</CardTitle>
                                    <Badge variant="secondary" className="text-xs">{kpi.outcome}</Badge>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <p className="text-sm text-muted-foreground">{kpi.description}</p>
                                  <div className="flex items-start gap-2 mt-2">
                                    <span className="text-xs font-medium text-secondary">Target:</span>
                                    <span className="text-xs text-muted-foreground">{kpi.target}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-quality">
                      <AccordionTrigger className="text-lg font-semibold">
                        4. Data Quality Requirements
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <RegulatoryQuote
                          source="FCA"
                          reference="Multi-firm Review Findings"
                          quote="Poor data quality undermines a firm's ability to conduct robust assessments. Many firms had insufficient data to justify conclusions, particularly for closed products and vulnerable customers."
                        />

                        <div>
                          <h4 className="font-semibold mb-3">Essential Data Quality Dimensions</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {[
                              { name: "Accuracy", description: "Data correctly represents reality" },
                              { name: "Completeness", description: "All required data captured" },
                              { name: "Consistency", description: "Data aligns across systems" },
                              { name: "Timeliness", description: "Data available when needed" },
                              { name: "Validity", description: "Data conforms to defined formats" },
                              { name: "Uniqueness", description: "No unnecessary duplication" }
                            ].map((dimension, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium text-sm mb-1">{dimension.name}</p>
                                <p className="text-xs text-muted-foreground">{dimension.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg">
                          <p className="text-sm font-medium mb-2">FCA Finding</p>
                          <p className="text-sm text-muted-foreground">
                            Many firms had insufficient data to justify conclusions, particularly for closed products and vulnerable customers. Firms must be transparent about data limitations and have plans to address gaps.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="differential">
                      <AccordionTrigger className="text-lg font-semibold">
                        5. Differential Outcomes Analysis Requirement
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Critical FCA expectation: Firms must analyze outcomes for different customer groups to identify and address disparities.
                        </p>

                        <div>
                          <h4 className="font-semibold mb-3">Priority Segments</h4>
                          <div className="space-y-2">
                            {[
                              { segment: "Vulnerable customers", details: "Four drivers (health, life events, resilience, capability)" },
                              { segment: "Long-standing vs new customers", details: "Identify loyalty penalties" },
                              { segment: "Product version differences", details: "Back-book vs front-book" },
                              { segment: "Distribution channels", details: "Direct vs intermediated" },
                              { segment: "Geographic variations", details: "Regional differences" },
                              { segment: "Demographic groups", details: "Age, income bands (where data available)" }
                            ].map((item, index) => (
                              <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-sm">{item.segment}</p>
                                  <p className="text-xs text-muted-foreground">{item.details}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-sm font-medium mb-2">Methodology</p>
                          <p className="text-sm text-muted-foreground mb-3">
                            Calculate variance = [Average outcome for segment] - [Average outcome for all]
                          </p>
                          <p className="text-sm font-medium mb-2">Target</p>
                          <p className="text-sm text-muted-foreground">
                            Minimize negative variance (ideally zero or positive for vulnerable customers)
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="board-reporting">
                      <AccordionTrigger className="text-lg font-semibold">
                        6. Board Reporting Requirements
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div className="bg-primary/10 p-4 rounded-lg mb-4">
                          <p className="text-sm font-medium mb-2">FCA Mandate</p>
                          <p className="text-sm text-muted-foreground">
                            The Board must review and approve an annual Consumer Duty assessment. This is not optional.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Board MI Must Enable</h4>
                          <div className="space-y-2">
                            {[
                              "Assessment of whether firm is delivering good outcomes",
                              "Understanding of outcomes for different customer types",
                              "Identification of areas of poor performance",
                              "Oversight of remediation actions",
                              "Confirmation that business strategy aligns with Consumer Duty"
                            ].map((requirement, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{requirement}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <Card className="border-2 border-green-500">
                            <CardHeader>
                              <CardTitle className="text-sm flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Good Practice
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>✓ Clear outcomes focus with dedicated sections per outcome</li>
                                <li>✓ High-quality MI supporting conclusions</li>
                                <li>✓ Granular analysis of different customer types</li>
                                <li>✓ Evidence of effective Board challenge</li>
                                <li>✓ Clear action plans with owners and timelines</li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="border-2 border-red-500">
                            <CardHeader>
                              <CardTitle className="text-sm flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                Poor Practice to Avoid
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>✗ Information overload (100+ page packs)</li>
                                <li>✗ Insufficient data to support assertions</li>
                                <li>✗ Lack of analysis for vulnerable customers</li>
                                <li>✗ No evidence of Board scrutiny</li>
                                <li>✗ Vague actions without detail</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* IMPLEMENTATION STEPS TAB */}
            <TabsContent value="steps" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Steps</CardTitle>
                  <CardDescription>Six-phase approach to establishing your MI framework</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <ChecklistSection
                      stepNumber={1}
                      title="PHASE 1: FRAMEWORK DESIGN (Weeks 1-2)"
                      moduleId="cd-m1"
                      items={[
                        {
                          id: "cd-m1-step-1-1",
                          label: "Define Consumer Outcomes KPI Framework",
                          details: "Review 18 essential KPIs, confirm relevance, add firm-specific KPIs, define each precisely (measurement, calculation, sources, targets, frequency, ownership). Organize by outcome area, balance leading and lagging indicators (50/50 split), obtain governance approval.",
                          responsible: "Head of MI / Chief Data Officer",
                          duration: "3-4 days"
                        },
                        {
                          id: "cd-m1-step-1-2",
                          label: "Establish Data Quality Standards",
                          details: "Define data quality dimensions (accuracy, completeness, timeliness, consistency, validity, uniqueness), identify risks by source system, define validation rules and controls, establish monitoring and reporting, assign data steward ownership, create issue escalation process.",
                          responsible: "Data Quality Team",
                          duration: "2-3 days"
                        },
                        {
                          id: "cd-m1-step-1-3",
                          label: "Design Dashboard and Visualization Approach",
                          details: "Define dashboard audiences and needs (Board, Executive, Operational, Compliance), select technology platform, design layouts, define visualization principles (RAG, trends, context), design drill-down capability, plan mobile access.",
                          responsible: "MI Manager / BI Team",
                          duration: "3-4 days"
                        }
                      ]}
                    />

                    <ChecklistSection
                      stepNumber={2}
                      title="PHASE 2: DATA ARCHITECTURE & INTEGRATION (Weeks 2-4)"
                      moduleId="cd-m1"
                      items={[
                        {
                          id: "cd-m1-step-2-1",
                          label: "Map Data Sources and Collection Methods",
                          details: "For each KPI, document: primary source system, extract method, data owner, frequency, transformation required, quality checks, storage location, access controls. Common sources: CRM, complaints system, policy admin, financial systems, QA systems, training systems, analytics, external data.",
                          responsible: "Data Architect / Data Stewards",
                          duration: "4-5 days"
                        },
                        {
                          id: "cd-m1-step-2-2",
                          label: "Build Data Integration and Transformation Logic",
                          details: "Design data warehouse structure, develop ETL processes (automated extraction, cleansing, calculation logic, aggregation by dimensions, load to MI repository), implement reconciliation controls, build audit trail, schedule automated runs, test end-to-end flow.",
                          responsible: "Data Engineering Team",
                          duration: "8-10 days"
                        },
                        {
                          id: "cd-m1-step-2-3",
                          label: "Establish Data Governance",
                          details: "Define governance structure (Committee, Stewards, Consumers, Quality team), create data dictionary (definitions, methodologies, lineage), implement change control process, establish regular quality reviews, define retention and archiving policy.",
                          responsible: "Data Governance Lead",
                          duration: "3-4 days"
                        }
                      ]}
                    />

                    <ChecklistSection
                      stepNumber={3}
                      title="PHASE 3: THRESHOLD & TRIGGER SETTING (Week 4)"
                      moduleId="cd-m1"
                      items={[
                        {
                          id: "cd-m1-step-3-1",
                          label: "Define Thresholds and Action Triggers",
                          details: "For each KPI, establish Green/Amber/Red thresholds with rationale (historical performance, regulatory expectation, benchmark). Define actions at each level: Green (continue monitoring), Amber (investigate, action plan), Red (immediate escalation to SMF, Board notification, mandatory remediation). Define escalation protocols and review frequency.",
                          responsible: "Risk / Compliance / MI teams",
                          duration: "3-4 days"
                        },
                        {
                          id: "cd-m1-step-3-2",
                          label: "Implement Alert and Escalation Mechanisms",
                          details: "Configure dashboard to flag threshold breaches automatically, set up automated alerts (real-time for Red, daily for Amber, weekly summary), define escalation recipients by metric and severity, create communication templates, test alert functionality, establish acknowledgment and action process.",
                          responsible: "MI Manager / IT",
                          duration: "2-3 days"
                        }
                      ]}
                    />

                    <ChecklistSection
                      stepNumber={4}
                      title="PHASE 4: REPORTING DESIGN (Weeks 4-5)"
                      moduleId="cd-m1"
                      items={[
                        {
                          id: "cd-m1-step-4-1",
                          label: "Develop Management Reporting Pack",
                          details: "Design monthly management MI report: Executive Summary (1 page), Four Outcomes Summary (1 page each), Vulnerable Customer Analysis (1 page), Deep Dive Section (2-3 pages rotating focus), Action Tracker (1 page), Appendix (detailed tables). Define distribution list and review forum, establish monthly cadence, create commentary guidelines, build template with automated data population.",
                          responsible: "MI Manager",
                          duration: "3-4 days"
                        },
                        {
                          id: "cd-m1-step-4-2",
                          label: "Develop Board Reporting Pack",
                          details: "Design quarterly board dashboard (1-2 pages): Outcomes Heatmap, Vulnerable Customer Variance, Key Trends, Top 3 Issues. Design annual board report following FCA structure: Executive Summary, Outcomes Assessment per outcome, Vulnerable Customer Analysis, Governance and Culture, Actions and Forward Plan, Supporting Evidence. Define review process, create board reporting calendar.",
                          responsible: "Head of MI / Company Secretary",
                          duration: "3-4 days"
                        },
                        {
                          id: "cd-m1-step-4-3",
                          label: "Establish Differential Outcomes Analysis Process",
                          details: "Define customer segmentation approach (vulnerable by four drivers, long-standing vs new, product version, channel, region, demographics). Calculate outcome variance for each segment, RAG rate variance (Green less than 5%, Amber 5-10%, Red greater than 10%), investigate root causes of negative variance, develop action plans for outcome parity, monitor trends over time.",
                          responsible: "MI Analyst / Vulnerable Customer Lead",
                          duration: "2-3 days"
                        }
                      ]}
                    />

                    <ChecklistSection
                      stepNumber={5}
                      title="PHASE 5: ADVANCED ANALYTICS (Weeks 5-6)"
                      moduleId="cd-m1"
                      items={[
                        {
                          id: "cd-m1-step-5-1",
                          label: "Implement Predictive Analytics Capability",
                          details: "Identify opportunities for predictive modeling: churn prediction, complaint prediction, vulnerability identification, value deterioration, support demand forecasting. Select modeling approach, gather historical data for training, develop and validate models, integrate predictions into dashboard, define actions triggered by predictions.",
                          responsible: "Data Science Team",
                          duration: "8-10 days"
                        },
                        {
                          id: "cd-m1-step-5-2",
                          label: "Establish Customer Journey Analytics",
                          details: "Map key customer journeys (purchase, onboarding, servicing, claims, exit), instrument with tracking (digital analytics, process mining), identify friction points and drop-offs, measure journey outcomes (completion rates, time, errors, support contacts, satisfaction), analyze by segment especially vulnerable, prioritize improvements, track improvements over time.",
                          responsible: "Customer Experience Team",
                          duration: "5-7 days"
                        }
                      ]}
                    />

                    <ChecklistSection
                      stepNumber={6}
                      title="PHASE 6: EMBEDDING & CONTINUOUS IMPROVEMENT (Ongoing)"
                      moduleId="cd-m1"
                      items={[
                        {
                          id: "cd-m1-step-6-1",
                          label: "Establish Regular Review Cadence",
                          details: "Set up regular reviews: Monthly (operational management MI), Quarterly (executive deep-dive by outcome), Quarterly (board dashboard), Annually (comprehensive board report and approval), Annually (KPI framework review and recalibration), Ad-hoc (issue-driven when thresholds breached). Create review agendas, define pre-read materials, establish decision-making protocols, implement action tracker with accountability.",
                          responsible: "Governance team",
                          duration: "Ongoing"
                        },
                        {
                          id: "cd-m1-step-6-2",
                          label: "Build Continuous Improvement Process",
                          details: "Implement quarterly 'So What?' reviews: Are KPIs still right? Are thresholds appropriate? Is data quality adequate? Are actions effective? What can we learn? Establish process for adding/retiring KPIs, create user feedback mechanism, benchmark against industry, incorporate FCA feedback, iterate dashboard design based on usage patterns.",
                          responsible: "MI Manager",
                          duration: "Ongoing"
                        }
                      ]}
                    />
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Implementation Timeline
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Week 2: KPI framework approved</p>
                      <p>• Week 4: Data sources mapped and integration designed</p>
                      <p>• Week 5: Dashboard designs approved</p>
                      <p>• Week 6: Dashboards operational (management level)</p>
                      <p>• Week 8: First monthly MI report delivered</p>
                      <p>• Week 10: Thresholds and triggers implemented</p>
                      <p>• Week 12: Board dashboard operational</p>
                      <p>• Week 16: First quarterly board pack delivered</p>
                      <p>• Ongoing: Continuous monitoring and improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TEMPLATES & TOOLS TAB */}
            <TabsContent value="templates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Templates & Tools</CardTitle>
                  <CardDescription>Ready-to-use templates for MI framework implementation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <TemplateCard
                      title="Consumer Outcomes KPI Framework Document"
                      description="Comprehensive framework defining all metrics with precise definitions, calculations, data sources, targets, thresholds, ownership, and reporting frequency. Includes all 18 essential KPIs plus firm-specific additions organized by outcome area."
                      format="Excel"
                      onDownload={() => toast.success("Downloading KPI Framework template...")}
                    />

                    <TemplateCard
                      title="Data Source Mapping Matrix"
                      description="Excel workbook with tabs for each data domain (Customer, Product, Transactions, Complaints, Support, External). Documents data elements, source systems, extract methods, frequency, owners, quality checks, and notes for all KPI calculations."
                      format="Excel"
                      onDownload={() => toast.success("Downloading Data Source Mapping template...")}
                    />

                    <TemplateCard
                      title="Data Quality Standards Document"
                      description="Formal data quality framework defining standards for accuracy, completeness, consistency, timeliness, validity, and uniqueness. Includes controls by source system, monitoring approach, issue management process, and governance structure."
                      format="Word"
                      onDownload={() => toast.success("Downloading Data Quality Standards template...")}
                    />

                    <TemplateCard
                      title="Dashboard Design Specification"
                      description="Visual mockup and technical specification for Board, Executive, and Operational dashboards. Includes layout design, visualization principles, RAG color coding, trend indicators, drill-down capability, and technical implementation notes."
                      format="PowerPoint"
                      onDownload={() => toast.success("Downloading Dashboard Design template...")}
                    />

                    <TemplateCard
                      title="Threshold and Trigger Matrix"
                      description="Master document defining Green/Amber/Red thresholds for all KPIs, with rationale, actions triggered at each level, owners, escalation paths, and review frequency. Excel format with filters and sorting for easy management."
                      format="Excel"
                      onDownload={() => toast.success("Downloading Threshold Matrix template...")}
                    />

                    <TemplateCard
                      title="Monthly Management MI Report Template"
                      description="Structured report with automated data population: Executive Summary, Four Outcomes Summary (1 page each), Vulnerable Customer Analysis, Monthly Deep-Dive (rotating focus), Action Tracker, and Detailed Metric Appendix. 12-15 pages maximum."
                      format="PowerPoint"
                      onDownload={() => toast.success("Downloading Management MI Report template...")}
                    />

                    <TemplateCard
                      title="Board Reporting Pack Template"
                      description="Quarterly and annual board pack templates following FCA good practice guidance. Includes 1-2 page dashboard, narrative report by outcome (8-12 pages), supporting evidence pack (appendix), and action tracker. Designed for Board review and approval."
                      format="PowerPoint"
                      onDownload={() => toast.success("Downloading Board Reporting Pack template...")}
                    />

                    <TemplateCard
                      title="Differential Outcomes Analysis Template"
                      description="Systematic comparison tool for analyzing outcomes across segments (vulnerable, tenure, channel, geography, demographics). Calculates variance, provides RAG rating, guides investigation, and tracks actions to achieve outcome parity."
                      format="Excel"
                      onDownload={() => toast.success("Downloading Differential Outcomes template...")}
                    />

                    <TemplateCard
                      title="Predictive Analytics Framework Document"
                      description="Framework for building predictive capability including use case definition, data requirements, model specification (algorithm, training, validation), implementation plan, ethical considerations (bias testing), and ongoing model documentation."
                      format="Word"
                      onDownload={() => toast.success("Downloading Predictive Analytics Framework template...")}
                    />

                    <TemplateCard
                      title="Customer Journey Analytics Dashboard"
                      description="Dashboard specification showing performance across customer journeys: journey overview with health status, stage-by-stage detail with completion/drop-off rates, improvement tracker, process mining visualization, and segment comparison capability."
                      format="PowerPoint"
                      onDownload={() => toast.success("Downloading Journey Analytics template...")}
                    />

                    <TemplateCard
                      title="MI Effectiveness Review Template"
                      description="Quarterly self-assessment tool for MI quality covering: MI Quality dimensions (accuracy, completeness, timeliness, relevance, consistency), MI Usage metrics (engagement, actions driven), MI Effectiveness assessment, and prioritized improvement plan."
                      format="Word"
                      onDownload={() => toast.success("Downloading MI Effectiveness Review template...")}
                    />
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Template Usage Guidance</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      All templates are designed to be customized to your firm's specific needs, products, and data environment. They follow FCA good practice guidance and incorporate findings from multi-firm reviews.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Start with the KPI Framework to define what you'll measure</li>
                      <li>• Use Data Source Mapping to document where data comes from</li>
                      <li>• Apply Data Quality Standards to ensure reliable MI</li>
                      <li>• Build Dashboards following the design specifications</li>
                      <li>• Set Thresholds using the matrix template</li>
                      <li>• Generate Reports using the management and board templates</li>
                      <li>• Analyze Differential Outcomes for vulnerable customers</li>
                      <li>• Implement Advanced Analytics using the framework documents</li>
                      <li>• Review Effectiveness quarterly to drive continuous improvement</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SUCCESS CRITERIA TAB */}
            <TabsContent value="success" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Success Criteria</CardTitle>
                  <CardDescription>Evidence that your MI framework is effective and regulatory-ready</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">MI Framework Establishment</h3>
                      <div className="space-y-2">
                        {[
                          "Comprehensive KPI framework covering all four outcomes defined and approved",
                          "18+ KPIs with clear definitions, calculations, and ownership documented",
                          "Balance of leading (40-50%) and lagging (50-60%) indicators achieved",
                          "Data sources identified and integration designed for all KPIs",
                          "Data quality standards defined and controls implemented"
                        ].map((criterion, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Dashboard & Reporting</h3>
                      <div className="space-y-2">
                        {[
                          "Board dashboard operational and approved by board",
                          "Management MI dashboard operational with monthly reporting cycle",
                          "Quarterly board pack template created and first report delivered",
                          "Annual board report structure aligned with FCA good practice guidance",
                          "Dashboard refresh automated (minimal manual intervention)"
                        ].map((criterion, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Data Quality</h3>
                      <div className="space-y-2">
                        {[
                          "Data quality greater than 90% across all quality dimensions (accuracy, completeness, timeliness)",
                          "Data gaps identified with remediation plans and timelines",
                          "Data governance structure operational with assigned stewards",
                          "Data dictionary published and accessible",
                          "Audit trail from source to dashboard documented"
                        ].map((criterion, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Thresholds & Actions</h3>
                      <div className="space-y-2">
                        {[
                          "RAG thresholds defined for all KPIs with documented rationale",
                          "Automated alerting configured for threshold breaches",
                          "Escalation protocols tested and operational",
                          "Action tracker implemented and integrated with governance",
                          "Evidence of actions being triggered and completed when thresholds breached"
                        ].map((criterion, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Differential Outcomes Analysis</h3>
                      <div className="space-y-2">
                        {[
                          "Customer segmentation approach defined (vulnerable, tenure, channel, etc.)",
                          "Outcome variance calculated for all segments on all key metrics",
                          "Negative variances identified with root cause analysis completed",
                          "Action plans in place to achieve outcome parity",
                          "Variance trends monitored and reported quarterly"
                        ].map((criterion, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Advanced Analytics</h3>
                      <div className="space-y-2">
                        {[
                          "At least one predictive model in pilot or production (churn, complaint, vulnerability)",
                          "Customer journey analytics operational for key journeys",
                          "Friction points identified and improvement initiatives launched",
                          "Journey performance improving over time (measured via completion rates, CSAT)"
                        ].map((criterion, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Board & Governance</h3>
                      <div className="space-y-2">
                        {[
                          "Board receives quarterly Consumer Duty dashboard",
                          "Annual board report completed, approved, and filed",
                          "Evidence of board challenge on MI quality and conclusions",
                          "SMF attestation supported by robust MI evidence",
                          "Action tracker shows timely completion of board-directed actions"
                        ].map((criterion, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Regulatory Readiness</h3>
                      <div className="space-y-2">
                        {[
                          "MI can support FCA examination requests within 24-48 hours",
                          "Evidence repository organized and accessible",
                          "Methodology documentation complete and auditable",
                          "Data lineage traceable from source to board report",
                          "Historical MI retained per retention requirements"
                        ].map((criterion, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                      <h3 className="font-semibold mb-3">Key Performance Metrics</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-background rounded-lg">
                          <p className="text-sm font-medium mb-1">MI Quality Scores</p>
                          <p className="text-2xl font-bold text-primary">Greater than 4/5</p>
                          <p className="text-xs text-muted-foreground">Across all dimensions</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg">
                          <p className="text-sm font-medium mb-1">Dashboard Usage</p>
                          <p className="text-2xl font-bold text-primary">Greater than 80%</p>
                          <p className="text-xs text-muted-foreground">Monthly active users</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg">
                          <p className="text-sm font-medium mb-1">Action Completion Rate</p>
                          <p className="text-2xl font-bold text-primary">Greater than 90%</p>
                          <p className="text-xs text-muted-foreground">Within target timelines</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg">
                          <p className="text-sm font-medium mb-1">Data Quality</p>
                          <p className="text-2xl font-bold text-primary">Greater than 90%</p>
                          <p className="text-xs text-muted-foreground">Across all dimensions</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg">
                          <p className="text-sm font-medium mb-1">Board Engagement</p>
                          <p className="text-2xl font-bold text-primary">Evidenced</p>
                          <p className="text-xs text-muted-foreground">Questions and challenge in minutes</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg">
                          <p className="text-sm font-medium mb-1">Regulatory Readiness</p>
                          <p className="text-2xl font-bold text-primary">Less than 48hrs</p>
                          <p className="text-xs text-muted-foreground">To produce MI on request</p>
                        </div>
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
                  <CardDescription>Issues to avoid when implementing your MI framework</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <PitfallCard
                    title="Simply Repackaging Existing MI"
                    description="Firms repackage existing MI without considering what new data is needed to truly understand customer outcomes. Example: Reporting complaint volumes without categorizing by outcome or analyzing root causes."
                    impact="MI fails to provide insight into Consumer Duty outcomes; cannot evidence compliance. The FCA has specifically noted this in multi-firm reviews."
                    prevention="Start fresh - what MI would demonstrate good outcomes? Build that, don't just rebadge TCF MI. Focus on outcome-specific metrics that actually measure customer experience and results."
                  />

                  <PitfallCard
                    title="Relying on Averages Without Segmentation"
                    description="Many firms use average metrics that mask pockets of poor outcomes for specific groups. Example: Overall CSAT 4.2/5 looks good, but vulnerable customers at 3.6/5 (poor outcome masked)."
                    impact="Vulnerable customers experiencing poor outcomes not identified; breach of outcome parity requirement. This is a critical FCA finding that can lead to enforcement action."
                    prevention="Mandatory segmentation - always calculate vulnerable vs all, back-book vs front-book, channel differences, etc. Use the Differential Outcomes Analysis template to systematically compare all segments."
                  />

                  <PitfallCard
                    title="Lagging Indicators Only"
                    description="Firms focus on retrospective metrics without predictive indicators. Example: High churn rate tells you customers already left, doesn't help prevent future churn."
                    impact="Problems identified too late to prevent harm; reactive not proactive approach. By the time you see the issue in lagging indicators, customer detriment has already occurred."
                    prevention="Balance KPIs - aim for 40-50% leading indicators to enable prevention. The 18 Essential KPIs framework includes 8 leading and 10 lagging indicators as a model."
                  />

                  <PitfallCard
                    title="Poor Data Quality With No Acknowledgment"
                    description="Data quality inadequate to support conclusions, and firms not transparent about limitations. Example: Claiming fair value based on incomplete pricing data or unvalidated cost allocations."
                    impact="Board cannot make informed decisions; MI not credible; regulatory challenge. FCA expects transparency about data gaps and plans to address them."
                    prevention="Establish data quality standards, be transparent about gap acknowledgment, create remediation plans with dates. Use the Data Quality Standards Document template."
                  />

                  <PitfallCard
                    title="No Clear Thresholds or Triggers"
                    description="Metrics presented but no definition of what constitutes good vs poor performance. Example: Complaint rate increasing but no threshold defining when action required."
                    impact="No action taken on deteriorating metrics; problems escalate; lack of accountability. MI becomes reporting rather than management tool."
                    prevention="Define RAG thresholds for every KPI with clear actions triggered at each level. Use the Threshold and Trigger Matrix to document thresholds, rationale, and escalation."
                  />

                  <PitfallCard
                    title="Information Overload for Board"
                    description="Board packs exceeding 100 pages; board unable to focus on material issues. Example: 50-page appendix with raw data tables; no executive summary or key issues highlighted."
                    impact="Board overwhelmed; superficial review; fails to provide effective challenge. This is specifically called out in FCA board reporting guidance."
                    prevention="1-2 page board dashboard; 10-15 page report max; appendix for detail; 'So What?' narrative that highlights key issues and decisions needed. Use the Board Reporting Pack template."
                  />

                  <PitfallCard
                    title="Metrics Not Linked to Actions"
                    description="MI presented but no clear actions, owners, or timelines. Example: Red RAG status on consumer understanding but no action plan to improve."
                    impact="MI is reporting not management tool; issues identified but not resolved. Defeats the entire purpose of monitoring."
                    prevention="Every threshold breach must trigger defined action with owner, timeline, success measure. Implement Action Tracker integrated with governance meetings."
                  />

                  <PitfallCard
                    title="No Evidence of Board Challenge"
                    description="Board minutes show MI reviewed but no evidence of scrutiny or challenge. Example: Board 'notes' MI report but doesn't question data quality, methodology, or adequacy of actions."
                    impact="Board not fulfilling oversight duty; rubber-stamp governance. FCA expects to see evidence of effective challenge in board minutes and reports."
                    prevention="Board training on Consumer Duty MI; provide questions board should ask; cultivate challenge culture; ensure independent NEDs are active. Company Secretary should facilitate effective challenge."
                  />

                  <PitfallCard
                    title="Insufficient MI for Closed Products"
                    description="Little or no MI for closed book products. Example: 'We don't collect data on closed products anymore' - not acceptable under Consumer Duty from July 2024."
                    impact="Cannot evidence good outcomes for closed products; breach of Consumer Duty. Closed book products are in scope and must be monitored."
                    prevention="Extend MI collection to closed products; proportionate approach but must have basics. At minimum: vulnerable customer variance, value assessment, complaint analysis for closed books."
                  />

                  <PitfallCard
                    title="Static MI Framework (Set and Forget)"
                    description="KPIs defined at implementation but never reviewed or updated. Example: Still measuring 2023 priorities in 2026 despite market, regulatory, product changes."
                    impact="MI becomes less relevant over time; doesn't capture emerging issues; stale metrics that don't reflect current business or customer needs."
                    prevention="Annual KPI framework review; quarterly 'is this still the right metric?' checks. Use the MI Effectiveness Review template for systematic quarterly assessment."
                  />

                  <PitfallCard
                    title="Dashboard Accessible But Not Used"
                    description="Technology implemented but low engagement from users. Example: Executive dashboard built but never accessed between formal reports."
                    impact="Investment wasted; decisions made without MI; insights not driving action. The best MI in the world is useless if nobody looks at it."
                    prevention="Train users, demonstrate value, embed in meetings, make easy to access, iterate based on feedback. Track usage analytics and address barriers. Monthly dashboard review meetings with decisions logged."
                  />

                  <PitfallCard
                    title="No Data Lineage Documentation"
                    description="MI presented but cannot explain how calculated or source of data. Example: 'What's the source for this churn rate?' - 'Um, not sure, think it's from the CRM?'"
                    impact="Cannot validate MI; auditors and regulators challenge credibility; errors not detected. Undermines confidence in all MI."
                    prevention="Document data lineage from source to dashboard; maintain data dictionary; document calculation methodology. Use Data Source Mapping Matrix template."
                  />

                  <div className="mt-6 p-4 bg-warning/10 border-l-4 border-warning rounded-r-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      Critical Success Factor
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The most common cause of MI failure is treating it as a compliance exercise rather than a management tool. Effective MI frameworks are built from the question "What do we need to know to ensure we're delivering good outcomes?" not "What does the FCA want to see?" When you focus on genuinely understanding and improving customer outcomes, regulatory compliance follows naturally.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
