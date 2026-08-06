import { useState } from "react";
import { ArrowLeft, Heart, Users, FileText, AlertTriangle, CheckCircle2, Clock, Printer, Target, BookOpen, Wrench, AlertCircle, GraduationCap, MessageCircle, Accessibility, ShieldCheck, Brain, LifeBuoy, Phone, Lightbulb, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { useProgressStore, useModuleProgress, normalizeModuleId } from "@/stores/progressStore";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { ModuleChecklistProgress } from "@/components/modules/ModuleChecklistProgress";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { ModuleInsights } from "@/components/modules/ModuleInsights";

const STORAGE_KEY = "cd-i5-vulnerable-customers";

export default function CDI5VulnerableCustomers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const canonicalId = normalizeModuleId(STORAGE_KEY);
  const moduleProgress = useModuleProgress(canonicalId);
  const status = moduleProgress.status === "complete" ? "completed" : moduleProgress.status;
  const markModuleComplete = useProgressStore((state) => state.markModuleComplete);
  const markModuleInProgress = useProgressStore((state) => state.markModuleInProgress);

  const handlePreview = (templateName: string) => {
    toast.info(`Opening preview for: ${templateName}`);
  };

  const handleMarkComplete = () => {
    markModuleComplete(canonicalId, false);
    toast.success("Module Complete", {
      description: "Vulnerable Customers Framework marked as complete!",
    });
  };

  const handleMarkInProgress = () => {
    markModuleInProgress(canonicalId, false);
    toast.info("Module In Progress", {
      description: "Vulnerable Customers Framework marked as in progress",
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
                <Heart className="h-8 w-8 text-primary" />
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
                <h1 className="text-2xl font-bold">Vulnerable Customers Framework</h1>
                <p className="text-muted-foreground">Identifying, Supporting and Protecting Customers in Vulnerable Circumstances</p>
                
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Duration: 8-12 weeks
                  </span>
                  <span>Phase: Cross-Cutting</span>
                  <span>FCA Reference: FG21/1</span>
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
                  <Heart className="h-4 w-4" />
                  <AlertTitle>Vulnerable Customers Framework</AlertTitle>
                  <AlertDescription>
                    Establish a comprehensive framework to identify, understand and respond to the needs of customers in vulnerable circumstances. The FCA expects firms to ensure vulnerable customers receive outcomes as good as those for other customers, and to treat them fairly throughout the customer journey.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      Framework Objectives
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Identify customers in vulnerable circumstances</li>
                      <li>• Understand their needs and how vulnerability affects them</li>
                      <li>• Respond appropriately to meet their needs</li>
                      <li>• Monitor and improve outcomes for vulnerable customers</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Scale className="h-4 w-4 text-primary" />
                      Consumer Duty Context
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Under the Consumer Duty, firms must pay particular attention to the needs of vulnerable customers. Vulnerability is central to all four outcomes and requires firms to consider how vulnerable customers may experience products, services, communications and support differently.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The Four Drivers of Vulnerability</CardTitle>
                <CardDescription>FCA FG21/1 identifies four key drivers that may increase the risk of harm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                        <Brain className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="font-semibold">Health</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Conditions affecting ability to carry out day-to-day tasks</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Physical disability or illness</li>
                      <li>• Mental health conditions</li>
                      <li>• Cognitive impairments</li>
                      <li>• Severe or long-term illness</li>
                      <li>• Hearing or visual impairments</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h3 className="font-semibold">Life Events</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Major life events affecting circumstances</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Bereavement</li>
                      <li>• Relationship breakdown</li>
                      <li>• Job loss or income shock</li>
                      <li>• Retirement</li>
                      <li>• Caring responsibilities</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold">Resilience</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Low ability to withstand financial or emotional shocks</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Low or erratic income</li>
                      <li>• Over-indebtedness</li>
                      <li>• No savings or safety net</li>
                      <li>• Low emotional resilience</li>
                      <li>• Lack of support structure</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold">Capability</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Low knowledge or confidence in managing financial matters</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Low financial literacy</li>
                      <li>• Low digital skills</li>
                      <li>• Poor English language skills</li>
                      <li>• Low confidence managing money</li>
                      <li>• Learning difficulties</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Timeline</CardTitle>
                <CardDescription>8-12 week phased approach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</div>
                      <h3 className="font-semibold">Assessment</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 1-3</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Current state review</li>
                      <li>• Customer base analysis</li>
                      <li>• Gap identification</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</div>
                      <h3 className="font-semibold">Framework Design</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 4-6</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Policy development</li>
                      <li>• Process design</li>
                      <li>• System requirements</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</div>
                      <h3 className="font-semibold">Implementation</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 7-10</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Staff training rollout</li>
                      <li>• System updates</li>
                      <li>• Process embedding</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</div>
                      <h3 className="font-semibold">Monitoring</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Weeks 11-12+</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• MI development</li>
                      <li>• Outcomes tracking</li>
                      <li>• Continuous improvement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Deliverables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: "📋", title: "Vulnerable Customer Policy", desc: "Board-approved policy covering identification, support and monitoring" },
                    { icon: "🎯", title: "Vulnerability Assessment Framework", desc: "Tools and triggers for identifying vulnerability indicators" },
                    { icon: "📞", title: "Support Channel Matrix", desc: "Accessible channels and adjustments for different needs" },
                    { icon: "👥", title: "Staff Training Programme", desc: "Comprehensive training on recognising and responding to vulnerability" },
                    { icon: "📊", title: "Vulnerability MI Dashboard", desc: "Metrics tracking outcomes for vulnerable vs non-vulnerable customers" },
                    { icon: "💬", title: "Accessible Communications Guide", desc: "Standards for clear, accessible customer communications" },
                    { icon: "🔄", title: "Customer Journey Maps", desc: "Vulnerability touchpoints across all customer journeys" },
                    { icon: "📝", title: "Specialist Support Procedures", desc: "Escalation paths and specialist support protocols" },
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
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <RegulatoryQuote
              source="FCA Handbook"
              reference="PRIN 2A.1.14R"
              quote="A firm must pay particular attention to the needs of customers with characteristics of vulnerability and monitor and regularly review their outcomes."
              link="https://www.handbook.fca.org.uk/handbook/PRIN/2A/1.html"
            />

            <Card>
              <CardHeader>
                <CardTitle>FG21/1: Fair Treatment of Vulnerable Customers</CardTitle>
                <CardDescription>Key expectations from the FCA guidance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-primary/5 border-primary/20">
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Core FCA Expectation</AlertTitle>
                  <AlertDescription>
                    "Firms should ensure that vulnerable consumers receive outcomes that are as good as those for other consumers."
                  </AlertDescription>
                </Alert>

                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="understand">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Understand the Needs of Vulnerable Customers
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Firms should:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                        <li>• Understand the nature and scale of vulnerability in their target market</li>
                        <li>• Understand how their products and services may impact vulnerable customers</li>
                        <li>• Create and maintain a vulnerable customer policy</li>
                        <li>• Consider vulnerability throughout product/service design</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="skills">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Ensure Staff Have Appropriate Skills and Capability
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Staff should be equipped to:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                        <li>• Recognise signs that may indicate vulnerability</li>
                        <li>• Understand how to ask questions sensitively</li>
                        <li>• Know what options and support are available</li>
                        <li>• Record and share information appropriately</li>
                        <li>• Look after their own wellbeing when dealing with difficult conversations</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="respond">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <LifeBuoy className="h-4 w-4" />
                        Respond to Customer Needs
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Practical support should include:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                        <li>• Flexibility in how customers interact with the firm</li>
                        <li>• Accessible communications in appropriate formats</li>
                        <li>• Longer appointment times where needed</li>
                        <li>• Allowing third parties to act on behalf of customers</li>
                        <li>• Specialist teams for complex vulnerability needs</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="monitor">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Monitor and Assess Outcomes
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Firms should produce MI that enables them to:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                        <li>• Understand the prevalence of vulnerability in their customer base</li>
                        <li>• Compare outcomes for vulnerable vs non-vulnerable customers</li>
                        <li>• Identify whether vulnerable customers experience worse outcomes</li>
                        <li>• Take action to address any disparities identified</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consumer Duty Integration</CardTitle>
                <CardDescription>How vulnerability intersects with the four outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <span className="text-primary">1.</span> Products & Services
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Products must be designed with vulnerable customers in mind. Target markets should explicitly consider vulnerability characteristics and products should not exploit vulnerabilities.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <span className="text-primary">2.</span> Price & Value
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Vulnerable customers should not pay more for equivalent products. Value assessment should consider whether vulnerability characteristics affect ability to access product benefits.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <span className="text-primary">3.</span> Consumer Understanding
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Communications must be accessible and understandable by customers with different capability levels, health conditions, and other vulnerability drivers.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <span className="text-primary">4.</span> Consumer Support
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Support channels must be accessible to all customers. Vulnerable customers may need additional support, flexibility, and accommodations to achieve the same outcomes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Regulatory References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { ref: "FG21/1", title: "Guidance for firms on the fair treatment of vulnerable customers", link: "https://www.fca.org.uk/publications/finalised-guidance/guidance-firms-fair-treatment-vulnerable-customers" },
                    { ref: "PRIN 2A.1.14R", title: "Particular attention to vulnerable customers", link: "https://www.handbook.fca.org.uk/handbook/PRIN/2A/1.html" },
                    { ref: "PRIN 2A.2.14G", title: "Products and services outcome - vulnerable customer considerations", link: "https://www.handbook.fca.org.uk/handbook/PRIN/2A/2.html" },
                    { ref: "PRIN 2A.4.14G", title: "Consumer understanding - accessible communications", link: "https://www.handbook.fca.org.uk/handbook/PRIN/2A/4.html" },
                    { ref: "PRIN 2A.5.8G", title: "Consumer support - meeting needs of vulnerable customers", link: "https://www.handbook.fca.org.uk/handbook/PRIN/2A/5.html" },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{item.ref}</Badge>
                        <span className="text-sm">{item.title}</span>
                      </div>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <ModuleChecklistProgress moduleId="cd-i5" />

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Phase 1: Assessment &amp; Gap Analysis (Weeks 1-3)</h3>

              <ChecklistSection
                stepNumber={1}
                title="1.1 Customer Base Analysis"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s1-1", label: "Analyse customer demographics and characteristics" },
                  { id: "i5-s1-2", label: "Review existing vulnerability data and indicators" },
                  { id: "i5-s1-3", label: "Estimate prevalence of vulnerability across customer base" },
                  { id: "i5-s1-4", label: "Identify high-risk customer segments" },
                ]}
              />

              <ChecklistSection
                stepNumber={2}
                title="1.2 Current State Review"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s2-1", label: "Review existing vulnerability policies and procedures" },
                  { id: "i5-s2-2", label: "Assess current staff training and capability" },
                  { id: "i5-s2-3", label: "Evaluate support channels and accessibility" },
                  { id: "i5-s2-4", label: "Review customer feedback and complaints data" },
                ]}
              />

              <ChecklistSection
                stepNumber={3}
                title="1.3 Gap Analysis"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s3-1", label: "Compare current state against FG21/1 expectations" },
                  { id: "i5-s3-2", label: "Identify gaps in identification, support and monitoring" },
                  { id: "i5-s3-3", label: "Prioritise gaps by risk and impact" },
                  { id: "i5-s3-4", label: "Develop remediation roadmap" },
                ]}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Phase 2: Framework Design (Weeks 4-6)</h3>

              <ChecklistSection
                stepNumber={4}
                title="2.1 Policy Development"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s4-1", label: "Draft vulnerable customer policy for Board approval" },
                  { id: "i5-s4-2", label: "Define vulnerability categories and indicators" },
                  { id: "i5-s4-3", label: "Establish roles and responsibilities" },
                  { id: "i5-s4-4", label: "Set standards for identification and response" },
                ]}
              />

              <ChecklistSection
                stepNumber={5}
                title="2.2 Process Design"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s5-1", label: "Design vulnerability identification triggers" },
                  { id: "i5-s5-2", label: "Create customer journey touchpoint maps" },
                  { id: "i5-s5-3", label: "Develop escalation and referral pathways" },
                  { id: "i5-s5-4", label: "Define recording and data sharing protocols" },
                ]}
              />

              <ChecklistSection
                stepNumber={6}
                title="2.3 Support Channel Design"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s6-1", label: "Define accessible channel options" },
                  { id: "i5-s6-2", label: "Design reasonable adjustments catalogue" },
                  { id: "i5-s6-3", label: "Create third-party authority processes" },
                  { id: "i5-s6-4", label: "Establish specialist support team structure" },
                ]}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Phase 3: Implementation (Weeks 7-10)</h3>

              <ChecklistSection
                stepNumber={7}
                title="3.1 Staff Training Rollout"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s7-1", label: "Develop role-based training modules" },
                  { id: "i5-s7-2", label: "Train frontline staff on recognition and response" },
                  { id: "i5-s7-3", label: "Train managers on oversight and escalation" },
                  { id: "i5-s7-4", label: "Provide specialist training for support teams" },
                  { id: "i5-s7-5", label: "Include staff wellbeing and self-care guidance" },
                ]}
              />

              <ChecklistSection
                stepNumber={8}
                title="3.2 Communications Update"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s8-1", label: "Review and update customer communications" },
                  { id: "i5-s8-2", label: "Create accessible format alternatives" },
                  { id: "i5-s8-3", label: "Develop vulnerability-specific scripts and guides" },
                  { id: "i5-s8-4", label: "Update website accessibility" },
                ]}
              />

              <ChecklistSection
                stepNumber={9}
                title="3.3 System &amp; Process Updates"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s9-1", label: "Implement vulnerability flags in CRM" },
                  { id: "i5-s9-2", label: "Configure alerts and prompts" },
                  { id: "i5-s9-3", label: "Update call scripts and workflows" },
                  { id: "i5-s9-4", label: "Enable secure information sharing" },
                ]}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Phase 4: Monitoring &amp; Continuous Improvement (Weeks 11-12+)</h3>

              <ChecklistSection
                stepNumber={10}
                title="4.1 MI Development"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s10-1", label: "Define vulnerability outcome metrics" },
                  { id: "i5-s10-2", label: "Create comparison reporting (vulnerable vs non-vulnerable)" },
                  { id: "i5-s10-3", label: "Establish escalation triggers and thresholds" },
                  { id: "i5-s10-4", label: "Design Board-level vulnerability dashboard" },
                ]}
              />

              <ChecklistSection
                stepNumber={11}
                title="4.2 Quality Assurance"
                moduleId="cd-i5"
                items={[
                  { id: "i5-s11-1", label: "Implement vulnerability-focused QA criteria" },
                  { id: "i5-s11-2", label: "Conduct call listening and case reviews" },
                  { id: "i5-s11-3", label: "Gather customer feedback from vulnerable customers" },
                  { id: "i5-s11-4", label: "Review complaints for vulnerability themes" },
                ]}
              />
            </div>
          </TabsContent>


          {/* Templates & Tools Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <TemplateCard
                title="Vulnerable Customer Policy Template"
                description="Comprehensive policy covering identification, support, monitoring and governance of vulnerable customer treatment"
                format="Word"
                onPreview={() => handlePreview("Vulnerable Customer Policy Template")}
              />
              
              <TemplateCard
                title="Vulnerability Assessment Framework"
                description="Structured framework for identifying and recording vulnerability indicators across the four drivers"
                format="Excel"
                onPreview={() => handlePreview("Vulnerability Assessment Framework")}
              />
              
              <TemplateCard
                title="Staff Training Curriculum"
                description="Complete training programme covering recognition, response, recording and staff wellbeing"
                format="PowerPoint"
                onPreview={() => handlePreview("Staff Training Curriculum")}
              />
              
              <TemplateCard
                title="Reasonable Adjustments Catalogue"
                description="Comprehensive list of adjustments and support options mapped to vulnerability types"
                format="Excel"
                onPreview={() => handlePreview("Reasonable Adjustments Catalogue")}
              />
              
              <TemplateCard
                title="Customer Journey Vulnerability Map"
                description="Template for mapping vulnerability touchpoints and intervention opportunities across customer journeys"
                format="Excel"
                onPreview={() => handlePreview("Customer Journey Vulnerability Map")}
              />
              
              <TemplateCard
                title="Vulnerability MI Dashboard"
                description="Pre-built dashboard for monitoring vulnerable customer outcomes and comparison metrics"
                format="Excel"
                onPreview={() => handlePreview("Vulnerability MI Dashboard")}
              />
              
              <TemplateCard
                title="Accessible Communications Checklist"
                description="Standards and checklist for ensuring communications meet accessibility requirements"
                format="Word"
                onPreview={() => handlePreview("Accessible Communications Checklist")}
              />
              
              <TemplateCard
                title="Third Party Authority Form"
                description="Template form for customers authorising third parties to act on their behalf"
                format="Word"
                onPreview={() => handlePreview("Third Party Authority Form")}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conversation Guides</CardTitle>
                <CardDescription>Scripts and prompts for sensitive conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Bereavement Conversation Guide", desc: "Sensitive approach to supporting bereaved customers" },
                    { title: "Financial Difficulty Discussion", desc: "Supportive conversation framework for customers in hardship" },
                    { title: "Mental Health Awareness", desc: "Recognition signs and appropriate response guidance" },
                    { title: "Power of Attorney Guidance", desc: "Handling LPA and deputyship arrangements" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Outcome Metrics</CardTitle>
                <CardDescription>Key measures demonstrating good outcomes for vulnerable customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-success/5 border-success/20">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Equal Outcomes
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Vulnerable customers achieve same outcomes as non-vulnerable customers</li>
                      <li>• No significant disparity in complaint rates, resolution times, or satisfaction</li>
                      <li>• Products and services deliver intended value for vulnerable customers</li>
                      <li>• Vulnerable customers can access and use products as easily as other customers</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Identification Metrics</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• % of customer base with vulnerability indicator recorded</li>
                        <li>• Identification rate by channel and journey stage</li>
                        <li>• Self-disclosure vs staff-identified ratio</li>
                        <li>• Coverage across vulnerability drivers</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Support Metrics</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Reasonable adjustments provision rate</li>
                        <li>• Specialist support team utilisation</li>
                        <li>• Alternative format requests fulfilled</li>
                        <li>• Third party authority arrangements</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Experience Metrics</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Customer satisfaction (vulnerable vs non-vulnerable)</li>
                        <li>• Complaint rates and resolution times</li>
                        <li>• Call handling times and transfers</li>
                        <li>• First contact resolution rates</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Staff Capability Metrics</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Training completion rates</li>
                        <li>• QA scores on vulnerability handling</li>
                        <li>• Staff confidence scores</li>
                        <li>• Escalation appropriateness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { indicator: "Board-approved vulnerability policy in place", status: "Foundation" },
                    { indicator: "All customer-facing staff trained on vulnerability", status: "Foundation" },
                    { indicator: "Vulnerability indicators recorded for 80%+ of customer base", status: "Target" },
                    { indicator: "No material outcome disparity between vulnerable and non-vulnerable customers", status: "Target" },
                    { indicator: "Vulnerability MI reviewed at Board level quarterly", status: "Foundation" },
                    { indicator: "Customer feedback confirms positive support experience", status: "Target" },
                    { indicator: "Accessible channels available for all vulnerability types", status: "Foundation" },
                    { indicator: "QA specifically assesses vulnerability handling", status: "Foundation" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{item.indicator}</span>
                      <Badge variant={item.status === "Foundation" ? "secondary" : "default"}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <PitfallCard
                title="Treating vulnerability as a label, not a spectrum"
                description="Viewing vulnerability as binary (vulnerable/not vulnerable) rather than recognising it exists on a spectrum and can be temporary, situational or permanent."
                impact="High"
                prevention="Train staff to understand vulnerability is dynamic and context-dependent. Focus on needs rather than labels. Regularly review and update vulnerability indicators."
              />
              
              <PitfallCard
                title="Relying solely on self-disclosure"
                description="Expecting customers to identify themselves as vulnerable rather than proactively identifying potential vulnerability through indicators and triggers."
                impact="High"
                prevention="Implement proactive identification through data analysis, staff training on recognition, and customer journey touchpoints designed to identify needs."
              />
              
              <PitfallCard
                title="Inconsistent recording of vulnerability"
                description="Vulnerability information captured in some channels or by some staff but not consistently across all touchpoints, leading to customers having to repeat their circumstances."
                impact="Medium"
                prevention="Implement consistent recording fields across all systems. Create clear guidance on what to record. Enable information sharing across channels with appropriate consent."
              />
              
              <PitfallCard
                title="One-size-fits-all support approach"
                description="Offering the same support to all vulnerable customers rather than tailoring response to specific needs and circumstances."
                impact="Medium"
                prevention="Develop a catalogue of reasonable adjustments mapped to different vulnerability types. Train staff to ask what support would help rather than assuming."
              />
              
              <PitfallCard
                title="Focusing only on frontline staff training"
                description="Training only customer-facing staff while neglecting back-office teams, product designers and senior management who also impact vulnerable customer outcomes."
                impact="Medium"
                prevention="Ensure vulnerability training covers all roles that impact customer outcomes. Include product design, collections, complaints and management oversight teams."
              />
              
              <PitfallCard
                title="Not comparing outcomes between customer groups"
                description="Monitoring overall customer outcomes without specifically comparing vulnerable customer outcomes to identify disparities."
                impact="High"
                prevention="Develop MI that specifically segments outcomes by vulnerability status. Create dashboards showing comparative performance and investigate any gaps."
              />
              
              <PitfallCard
                title="Ignoring staff wellbeing"
                description="Expecting staff to handle difficult vulnerability conversations without adequate support, leading to burnout and avoidance."
                impact="Medium"
                prevention="Provide staff wellbeing support including debriefing opportunities, EAP access, and training on managing emotional impact. Recognise this as skilled work."
              />
              
              <PitfallCard
                title="Accessibility as an afterthought"
                description="Designing communications and processes for the general customer base and then retrofitting accessibility features."
                impact="Medium"
                prevention="Build accessibility into design from the start. Test communications with customers with different needs. Offer alternative formats proactively."
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Common FCA Findings</CardTitle>
                <CardDescription>Issues frequently identified in FCA reviews of vulnerability practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Policies not translated into frontline practice",
                    "Staff lacking confidence to have difficult conversations",
                    "Customer information not shared across channels",
                    "Collections practices not adjusted for vulnerable customers",
                    "Product design not considering vulnerability impact",
                    "Complaints not analysed for vulnerability themes",
                    "Board reporting lacking meaningful vulnerability MI",
                  ].map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{finding}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ModuleInsights moduleCode="CD-I5" moduleTitle="Vulnerable Customers" />
    </div>
  );
}