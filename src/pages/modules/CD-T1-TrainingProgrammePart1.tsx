import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Target, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Printer,
  Save,
  GraduationCap,
  UserCheck,
  Layers,
  Brain,
  Presentation,
  Monitor,
  MessageSquare,
  ClipboardCheck,
  Building2,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Lightbulb,
  Scale,
  Video,
  Users2,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { saveModuleProgress, getModuleProgress } from "@/lib/storage";

const MODULE_ID = "cd-t1-part1";

export default function CDT1TrainingProgrammePart1() {
  const [notes, setNotes] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = getModuleProgress(MODULE_ID);
    if (saved) {
      setNotes(saved.notes || "");
      setCheckedItems(saved.checkedItems || {});
    }
  }, []);

  const handleSave = () => {
    saveModuleProgress(MODULE_ID, { notes, checkedItems });
    toast.success("Progress saved successfully");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCheckItem = (id: string, checked: boolean) => {
    const updated = { ...checkedItems, [id]: checked };
    setCheckedItems(updated);
    saveModuleProgress(MODULE_ID, { notes, checkedItems: updated });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs">CD-T1 Part 1</Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Enablement</Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Training Programme Delivery</h1>
              <p className="text-lg text-muted-foreground">Part 1: Foundation & Design</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save Progress
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="regulatory" className="text-xs sm:text-sm">Regulatory</TabsTrigger>
            <TabsTrigger value="implementation" className="text-xs sm:text-sm">Implementation</TabsTrigger>
            <TabsTrigger value="templates" className="text-xs sm:text-sm">Templates</TabsTrigger>
            <TabsTrigger value="success" className="text-xs sm:text-sm">Success Criteria</TabsTrigger>
            <TabsTrigger value="pitfalls" className="text-xs sm:text-sm">Pitfalls</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Purpose
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-foreground">
                  Build comprehensive training capability to embed Consumer Duty across all roles
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">12-16 weeks</p>
                  <p className="text-xs text-muted-foreground">Programme development + ongoing delivery</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Scope
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">All Staff</p>
                  <p className="text-xs text-muted-foreground">Board to frontline, role-specific curricula</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Critical Requirement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold text-amber-600">Conduct Rule 6</p>
                  <p className="text-xs text-muted-foreground">"Act to deliver good outcomes for retail customers"</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold text-green-600">Cross-Cutting</p>
                  <p className="text-xs text-muted-foreground">All outcomes, vulnerable customers, governance</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Regulatory Foundation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">FCA expectation: "All staff understand their responsibilities under the Duty"</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">SMF accountability for ensuring staff trained and competent</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">CR6 applies to all conduct rules staff</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Training effectiveness must be measured and evidenced</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Key Deliverables - Part 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Training Needs Analysis by role and function",
                    "Role-Based Training Curriculum (5 audience groups)",
                    "E-learning modules and classroom materials",
                    "Competency Assessment Framework",
                    "Training effectiveness measurement approach",
                    "Training records and compliance tracking",
                    "Refresher training programme",
                    "Senior leadership training (Board/SMF specific)",
                    "Specialist training for customer-facing staff",
                    "Product team training on Consumer Duty design principles"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                  <Lightbulb className="h-5 w-5" />
                  Critical Success Factor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-900 dark:text-amber-100 font-medium">
                  "Training must drive behavioural change and measurable improvement in customer outcomes, not just knowledge transfer"
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Foundation Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  FCA Expectations on Training
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RegulatoryQuote
                  source="FCA"
                  reference="FG22/5 para 12.4"
                  quote="Firms should ensure all staff understand the firm's obligations under the Consumer Duty, including the four outcomes, and how these apply to their role"
                />

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Key Expectations</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Training proportionate to role and seniority",
                      "Board and SMFs trained on oversight responsibilities",
                      "Customer-facing staff trained on practical application",
                      "Product designers trained on outcome-focused design",
                      "Compliance and risk staff trained on monitoring and assurance",
                      "Regular refresher training to maintain competency",
                      "Training effectiveness measured and evidenced"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-500">
              <CardHeader className="bg-amber-50 dark:bg-amber-950/30">
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-amber-600" />
                  Conduct Rule 6 (CR6) Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-300 dark:border-amber-700">
                  <p className="text-lg font-bold text-amber-800 dark:text-amber-200">
                    Individual Conduct Rule 6: "You must act to deliver good outcomes for retail customers"
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Scope: Applies to ALL conduct rules staff (not just SMFs)</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "Employees directly involved in providing services to retail customers",
                      "Employees whose actions could affect retail customer outcomes",
                      "Those in compliance, risk, product design, marketing roles",
                      "Customer service, sales, advice, and support teams"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                        <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">What CR6 Means in Practice</h4>
                  <div className="space-y-2">
                    {[
                      "Personal responsibility to consider customer outcomes",
                      'Cannot claim "I was just following orders" if outcomes poor',
                      "Must speak up if processes/products cause harm",
                      "Expected to use judgment, not just follow scripts",
                      "Proportionate to role (higher standard for senior roles)"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Training Implications</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      { text: "All conduct staff must understand CR6 obligations", icon: "✓" },
                      { text: "Must know how their role affects customer outcomes", icon: "✓" },
                      { text: "Must understand when to escalate concerns", icon: "✓" },
                      { text: 'Must know what "good outcomes" look like for their area', icon: "✓" },
                      { text: "Assessment required to evidence understanding", icon: "✓" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded text-sm">
                        <span className="text-green-600 font-bold">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  SMF Accountability for Training
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">SMF Responsibility: Senior managers accountable for ensuring their area:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "Has adequate Consumer Duty training",
                      "Staff are competent to perform their roles",
                      "Training effectiveness is monitored",
                      "Competency gaps are identified and addressed",
                      "Records maintained for regulatory review"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Prescribed Responsibility:</strong> Many firms assign training oversight to SMF16 (Compliance Oversight) or SMF17 (Money Laundering Reporting Officer), but ultimate accountability sits with business area SMFs
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Board Oversight: Board must be satisfied that:</h4>
                  <div className="space-y-2">
                    {[
                      "Training programme is comprehensive",
                      "All staff trained to appropriate level",
                      "Training driving cultural change",
                      "Competency maintained through refreshers",
                      "Evidence available for regulatory review"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                        <Building2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Training as Part of Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Culture and Training Connection</h4>
                  <p className="text-sm text-muted-foreground mb-3">Training alone won't embed Consumer Duty. Must be supported by:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "Tone from the top (visible leadership commitment)",
                      "Aligned incentives (reward good customer outcomes)",
                      "Empowerment (staff can make customer-centric decisions)",
                      "Resources (time and tools to do job properly)",
                      "Consequences (poor conduct addressed)"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                        <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <RegulatoryQuote
                  source="FCA"
                  reference="Vulnerable Customer Guidance"
                  quote="Senior leaders have a responsibility to create a culture that supports staff in reducing potential and actual harm to vulnerable customers"
                />

                <div className="space-y-3">
                  <h4 className="font-semibold">Training as Culture Driver</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "Reinforces expected behaviours",
                      "Creates common language and understanding",
                      "Builds confidence to challenge poor practice",
                      "Demonstrates firm's commitment",
                      "Provides tools and frameworks for daily application"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                        <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                  FCA Multi-Firm Review Findings (November 2025)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700 dark:text-green-400">Good Practice Identified</h4>
                  <div className="space-y-2">
                    {[
                      "Comprehensive role-based curricula with practical scenarios",
                      "Training integrated into induction for all new joiners",
                      "Regular testing and competency assessment, not just attendance",
                      "Senior leaders visibly participating in training delivery",
                      "Real case studies from firm's own customer interactions",
                      "Training effectiveness measured through behaviour change, not just satisfaction scores"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700 dark:text-red-400">Areas for Improvement</h4>
                  <div className="space-y-2">
                    {[
                      "Generic, one-size-fits-all training not tailored to roles",
                      "Focus on regulatory requirements, not practical application",
                      "Death by PowerPoint with no engagement or interaction",
                      "Training treated as one-off project, not ongoing programme",
                      "No assessment of whether training changed behaviour",
                      "Senior leadership not trained or treating as optional",
                      "No link between training and performance management"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Steps Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Part 1 covers programme design and foundation (Steps 1-4). Part 2 covers delivery and embedding (Steps 5-8).
                </p>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="phase1" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary">Phase 1</Badge>
                    <span className="font-semibold">Training Needs Analysis</span>
                    <Badge variant="outline">Weeks 1-3</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-6">
                  <ChecklistSection
                    title="Step 1: Conduct Comprehensive Training Needs Analysis"
                    description="Identify training requirements across all roles and levels"
                    items={[
                      {
                        id: "tna-1",
                        label: "Map all roles that interact with or affect retail customers",
                        checked: checkedItems["tna-1"] || false
                      },
                      {
                        id: "tna-2",
                        label: "For each role group, identify current knowledge level and gaps",
                        checked: checkedItems["tna-2"] || false
                      },
                      {
                        id: "tna-3",
                        label: "Gather inputs through structured interviews, focus groups, and assessments",
                        checked: checkedItems["tna-3"] || false
                      },
                      {
                        id: "tna-4",
                        label: "Prioritise training needs (Critical, High, Medium, Lower)",
                        checked: checkedItems["tna-4"] || false
                      },
                      {
                        id: "tna-5",
                        label: "Document findings in Training Needs Analysis Report",
                        checked: checkedItems["tna-5"] || false
                      }
                    ]}
                    onCheckItem={handleCheckItem}
                  />

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">Role Groups to Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-2 text-sm">
                        {[
                          "Board and Non-Executive Directors",
                          "Senior Management Functions (SMFs)",
                          "Product design and approval teams",
                          "Marketing and communications",
                          "Sales and distribution",
                          "Customer service and support",
                          "Complaints handling",
                          "Collections and recoveries",
                          "Compliance and risk teams",
                          "Internal audit",
                          "Technology and data teams",
                          "Third parties and outsourced providers"
                        ].map((role, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-background rounded">
                            <Users className="h-3 w-3 text-primary" />
                            <span>{role}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">For Each Role Group, Identify:</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        {[
                          "Current Consumer Duty knowledge level",
                          "Specific Consumer Duty responsibilities",
                          "Knowledge gaps (regulatory requirements vs current understanding)",
                          "Skills gaps (what they need to DO differently)",
                          "Attitude/culture gaps (mindset changes needed)",
                          "Practical challenges in applying Consumer Duty",
                          "Training preferences (format, duration, timing)"
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 bg-background rounded">
                            <Target className="h-3 w-3 text-primary mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <ChecklistSection
                    title="Step 2: Define Learning Objectives by Role Group"
                    description="Specify measurable learning objectives for each audience using Bloom's Taxonomy"
                    items={[
                      {
                        id: "lo-1",
                        label: "Define specific, measurable learning objectives for Board and NEDs (3-5 objectives)",
                        checked: checkedItems["lo-1"] || false
                      },
                      {
                        id: "lo-2",
                        label: "Define learning objectives for Senior Management Functions (5-7 objectives)",
                        checked: checkedItems["lo-2"] || false
                      },
                      {
                        id: "lo-3",
                        label: "Define learning objectives for Product and service designers (7-10 objectives)",
                        checked: checkedItems["lo-3"] || false
                      },
                      {
                        id: "lo-4",
                        label: "Define learning objectives for Customer service and support (10-12 objectives)",
                        checked: checkedItems["lo-4"] || false
                      },
                      {
                        id: "lo-5",
                        label: "For each objective, specify assessment method and link to Consumer Duty requirement",
                        checked: checkedItems["lo-5"] || false
                      },
                      {
                        id: "lo-6",
                        label: "Review and approve learning objectives with senior stakeholders",
                        checked: checkedItems["lo-6"] || false
                      }
                    ]}
                    onCheckItem={handleCheckItem}
                  />

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Brain className="h-4 w-4 text-primary" />
                        Bloom's Taxonomy Levels for Learning Objectives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-background rounded">
                          <p className="font-semibold text-primary">Knowledge (Remember)</p>
                          <p className="text-muted-foreground">What must they know?</p>
                        </div>
                        <div className="p-3 bg-background rounded">
                          <p className="font-semibold text-primary">Comprehension (Understand)</p>
                          <p className="text-muted-foreground">What must they understand?</p>
                        </div>
                        <div className="p-3 bg-background rounded">
                          <p className="font-semibold text-primary">Application (Apply)</p>
                          <p className="text-muted-foreground">What must they be able to do?</p>
                        </div>
                        <div className="p-3 bg-background rounded">
                          <p className="font-semibold text-primary">Analysis (Analyze)</p>
                          <p className="text-muted-foreground">What must they be able to evaluate?</p>
                        </div>
                        <div className="p-3 bg-background rounded">
                          <p className="font-semibold text-primary">Synthesis (Create)</p>
                          <p className="text-muted-foreground">What must they be able to design/create?</p>
                        </div>
                        <div className="p-3 bg-background rounded">
                          <p className="font-semibold text-primary">Evaluation (Evaluate)</p>
                          <p className="text-muted-foreground">What judgments must they make?</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Example Learning Objectives */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="board-objectives">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          <span>Example: Board/NED Learning Objectives</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Knowledge:</span> Recall the three cross-cutting rules and four outcomes
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Comprehension:</span> Explain how Consumer Duty differs from TCF
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Application:</span> Apply Consumer Duty lens when reviewing Board papers
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Analysis:</span> Identify red flags in MI indicating poor outcomes
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Evaluation:</span> Challenge management on consumer outcome evidence
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="customer-facing-objectives">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>Example: Customer-Facing Staff Learning Objectives</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Knowledge:</span> Remember the four outcomes and how they apply
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Comprehension:</span> Understand what "good outcomes" look like
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Application:</span> Apply Consumer Duty principles in customer interactions
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Analysis:</span> Recognize when customer not achieving good outcome
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Evaluation:</span> Determine when to escalate or provide extra support
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="font-medium">Synthesis:</span> Adapt approach for customers with vulnerabilities
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="phase2" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary">Phase 2</Badge>
                    <span className="font-semibold">Curriculum Design</span>
                    <Badge variant="outline">Weeks 3-6</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-6">
                  <ChecklistSection
                    title="Step 3: Design Role-Based Training Curriculum Structure"
                    description="Create comprehensive curriculum framework for all audiences"
                    items={[
                      {
                        id: "curr-1",
                        label: "Design 5 Core Curriculum Pathways",
                        checked: checkedItems["curr-1"] || false
                      },
                      {
                        id: "curr-2",
                        label: "For each pathway, specify detailed module content, methods, materials, and assessments",
                        checked: checkedItems["curr-2"] || false
                      },
                      {
                        id: "curr-3",
                        label: "Create curriculum map showing pathway relationships and progression routes",
                        checked: checkedItems["curr-3"] || false
                      },
                      {
                        id: "curr-4",
                        label: "Review curriculum with stakeholders and refine",
                        checked: checkedItems["curr-4"] || false
                      }
                    ]}
                    onCheckItem={handleCheckItem}
                  />

                  {/* 5 Core Curriculum Pathways */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">5 Core Curriculum Pathways</h4>

                    {/* Pathway 1: Board and NEDs */}
                    <Card className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-purple-600" />
                          Pathway 1: Board and Non-Executive Directors
                        </CardTitle>
                        <CardDescription>
                          Duration: 3 hours | Format: Facilitated workshop | Frequency: Initial + annual refresher
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>1. Consumer Duty Overview and Strategic Context</span>
                            <Badge variant="outline">45 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>2. The Four Outcomes in Depth</span>
                            <Badge variant="outline">60 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>3. Governance and Oversight</span>
                            <Badge variant="outline">45 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>4. Case Studies and Scenarios</span>
                            <Badge variant="outline">30 mins</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pathway 2: SMFs */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-blue-600" />
                          Pathway 2: Senior Management Functions
                        </CardTitle>
                        <CardDescription>
                          Duration: 6 hours | Format: Workshop + action planning | Frequency: Initial + annual refresher
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>1. Consumer Duty Foundations</span>
                            <Badge variant="outline">60 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>2. SMF Accountability and Oversight</span>
                            <Badge variant="outline">60 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>3. Embedding in Your Function</span>
                            <Badge variant="outline">90 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>4. Vulnerable Customer Responsibilities</span>
                            <Badge variant="outline">60 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>5. Practical Application and Action Planning</span>
                            <Badge variant="outline">90 mins</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pathway 3: Product Designers */}
                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Layers className="h-4 w-4 text-green-600" />
                          Pathway 3: Product Designers and Manufacturers
                        </CardTitle>
                        <CardDescription>
                          Duration: 8 hours | Format: Workshop + exercises | Frequency: Initial + annual + new product inductions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>1. Products & Services Outcome Requirements</span>
                            <Badge variant="outline">90 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>2. Fair Value Assessment Methodology</span>
                            <Badge variant="outline">120 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>3. Vulnerable Customer Considerations in Design</span>
                            <Badge variant="outline">90 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>4. Distribution Strategy and Chain Management</span>
                            <Badge variant="outline">60 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>5. Practical Application</span>
                            <Badge variant="outline">90 mins</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pathway 4: Customer-Facing Staff */}
                    <Card className="border-l-4 border-l-amber-500">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Users className="h-4 w-4 text-amber-600" />
                          Pathway 4: Customer-Facing Staff (Comprehensive)
                        </CardTitle>
                        <CardDescription>
                          Duration: 12 hours | Format: Blended learning | Frequency: Initial + 6-monthly refreshers
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-muted rounded flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <Monitor className="h-3 w-3" />
                              1. Consumer Duty Foundations for Frontline Staff
                            </span>
                            <Badge variant="outline">90 mins e-learning</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <Presentation className="h-3 w-3" />
                              2. Consumer Understanding Outcome in Practice
                            </span>
                            <Badge variant="outline">120 mins classroom</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <Presentation className="h-3 w-3" />
                              3. Consumer Support Outcome in Practice
                            </span>
                            <Badge variant="outline">120 mins classroom</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <Users2 className="h-3 w-3" />
                              4. Vulnerable Customer Recognition and Support
                            </span>
                            <Badge variant="outline">180 mins classroom</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <ClipboardCheck className="h-3 w-3" />
                              5. Practical Application and Assessment
                            </span>
                            <Badge variant="outline">120 mins classroom</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <Award className="h-3 w-3" />
                              6. On-the-Job Coaching and Assessment
                            </span>
                            <Badge variant="outline">90 mins workplace</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pathway 5: Compliance, Risk, Assurance */}
                    <Card className="border-l-4 border-l-red-500">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-red-600" />
                          Pathway 5: Compliance, Risk, and Assurance Functions
                        </CardTitle>
                        <CardDescription>
                          Duration: 8 hours | Format: Technical workshop | Frequency: Initial + annual refresher
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>1. Consumer Duty Technical Deep Dive</span>
                            <Badge variant="outline">120 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>2. Monitoring and MI Requirements</span>
                            <Badge variant="outline">120 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>3. Testing and Assurance Approaches</span>
                            <Badge variant="outline">120 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>4. Second and Third Line Roles</span>
                            <Badge variant="outline">60 mins</Badge>
                          </div>
                          <div className="p-2 bg-muted rounded flex justify-between">
                            <span>5. Practical Application</span>
                            <Badge variant="outline">60 mins</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="phase3" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary">Phase 3</Badge>
                    <span className="font-semibold">Content Development</span>
                    <Badge variant="outline">Weeks 6-12</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-6">
                  <ChecklistSection
                    title="Step 4: Develop Training Materials and Content"
                    description="Create all training content to professional standard"
                    items={[
                      {
                        id: "content-1",
                        label: "Identify modules suitable for e-learning",
                        checked: checkedItems["content-1"] || false
                      },
                      {
                        id: "content-2",
                        label: "Design e-learning modules with engaging multimedia and interactions",
                        checked: checkedItems["content-2"] || false
                      },
                      {
                        id: "content-3",
                        label: "Create facilitator guides, slides, and participant workbooks for classroom sessions",
                        checked: checkedItems["content-3"] || false
                      },
                      {
                        id: "content-4",
                        label: "Develop case studies and scenarios based on real situations",
                        checked: checkedItems["content-4"] || false
                      },
                      {
                        id: "content-5",
                        label: "Create role play scenarios for customer-facing staff training",
                        checked: checkedItems["content-5"] || false
                      },
                      {
                        id: "content-6",
                        label: "Develop Board and executive materials at strategic level",
                        checked: checkedItems["content-6"] || false
                      },
                      {
                        id: "content-7",
                        label: "Create competency assessment framework with all assessment materials",
                        checked: checkedItems["content-7"] || false
                      }
                    ]}
                    onCheckItem={handleCheckItem}
                  />

                  {/* E-Learning Standards */}
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-primary" />
                        E-Learning Content Standards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="space-y-2">
                          <p className="font-medium text-green-700 dark:text-green-400">Design Requirements:</p>
                          {[
                            "Clear learning objectives stated upfront",
                            "Engaging multimedia (videos, animations, interactive elements)",
                            "Real examples from your firm and sector",
                            "Knowledge checks throughout (not just end)",
                            "Ability to save progress and return",
                            "Accessibility features (captions, transcripts, screen reader)",
                            "Mobile-responsive design"
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2 p-1">
                              <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-blue-700 dark:text-blue-400">Content Standards:</p>
                          {[
                            "Modules no longer than 30-45 minutes",
                            'Chunked into 5-10 minute segments',
                            "Mix of delivery methods (video, text, graphics, activities)",
                            "Scenario-based learning, not just information delivery",
                            "Immediate feedback on quiz questions",
                            "Progress tracking visible to learner"
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2 p-1">
                              <CheckCircle2 className="h-3 w-3 text-blue-600 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Classroom Standards */}
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Presentation className="h-4 w-4 text-primary" />
                        Classroom Training Standards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="space-y-2">
                          <p className="font-medium text-green-700 dark:text-green-400">Materials Required:</p>
                          {[
                            "Facilitator guide (detailed session plan with timings)",
                            "Presentation slides (professionally designed, not text-heavy)",
                            "Participant workbook (exercises, note-taking space)",
                            "Case study materials (realistic scenarios)",
                            "Role play briefing sheets",
                            "Assessment materials (tests, observation forms)",
                            "Reference handouts (job aids, quick reference cards)"
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2 p-1">
                              <FileText className="h-3 w-3 text-green-600 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-blue-700 dark:text-blue-400">Content Standards:</p>
                          {[
                            "No more than 15 minutes lecture without activity",
                            "Variety of engagement methods (discussion, exercise, quiz, role play)",
                            "Real examples and case studies (anonymised)",
                            "Practical application (not just theory)",
                            "Time for questions and discussion",
                            "Tangible takeaways (job aids, action plans)"
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2 p-1">
                              <CheckCircle2 className="h-3 w-3 text-blue-600 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Role Play Requirements */}
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        Role Play Scenario Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">Role play scenarios should cover:</p>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        {[
                          "Explaining complex product features",
                          "Handling confused or frustrated customers",
                          "Recognizing and responding to vulnerability",
                          "Supporting customers to switch or cancel",
                          "De-escalating difficult situations",
                          "Applying CR6 in practical situations"
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 bg-background rounded">
                            <Users2 className="h-3 w-3 text-primary mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Engagement Rule */}
                  <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="h-5 w-5 text-amber-600" />
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                          Rule of Thumb: 70% doing, 20% discussing, 10% presenting
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Implementation Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your implementation notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Continue to Part 2 */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">Continue to Part 2 for training delivery, measurement, and embedding</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/enablement/training-part2">Part 2 →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <TemplateCard
                title="Training Needs Analysis Report"
                description="Comprehensive Excel workbook with Executive Summary, Role Inventory, Current Competency Assessment, Knowledge/Skills/Attitude Gaps Analysis, Training Priorities, and Recommendations tabs"
                format="Excel"
                onDownload={() => toast.success("Training Needs Analysis Report template downloaded")}
              />

              <TemplateCard
                title="Learning Objectives Matrix by Role"
                description="Detailed matrix showing learning objectives by Bloom's Taxonomy levels for each role group, with assessment methods and Consumer Duty requirement links"
                format="Excel"
                onDownload={() => toast.success("Learning Objectives Matrix template downloaded")}
              />

              <TemplateCard
                title="Role-Based Training Curriculum Framework"
                description="Comprehensive curriculum document with learning pathway descriptions, module specifications, learning methods, materials, assessment approach, and resource requirements"
                format="Word"
                onDownload={() => toast.success("Curriculum Framework template downloaded")}
              />

              <TemplateCard
                title="E-Learning Module Development Template"
                description="Detailed template for e-learning development including storyboard, script, visual design specifications, interactivity descriptions, and accessibility checklist"
                format="Word"
                onDownload={() => toast.success("E-Learning Template downloaded")}
              />

              <TemplateCard
                title="Classroom Training Module Template"
                description="Comprehensive classroom training template with facilitator guide, slide deck template, participant workbook, activity briefings, and evaluation forms"
                format="PowerPoint"
                onDownload={() => toast.success("Classroom Training Template downloaded")}
              />

              <TemplateCard
                title="Case Study Development Template"
                description="Template for creating case studies with background, scenario, characters, decision points, discussion questions, facilitation notes, and debrief summary"
                format="Word"
                onDownload={() => toast.success("Case Study Template downloaded")}
              />

              <TemplateCard
                title="Role Play Scenario Template"
                description="Role play development template with scenario setup, character briefings, progression, complexity modifiers, observation criteria, and feedback templates"
                format="Word"
                onDownload={() => toast.success("Role Play Template downloaded")}
              />

              <TemplateCard
                title="Competency Assessment Framework"
                description="Comprehensive assessment framework with Consumer Duty competencies by role, assessment methods, pass criteria, self-assessment and manager assessment forms"
                format="Excel"
                onDownload={() => toast.success("Competency Assessment Framework downloaded")}
              />
            </div>
          </TabsContent>

          {/* Success Criteria Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Programme Design Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-2">
                  {[
                    "Training Needs Analysis completed for all role groups",
                    "Learning objectives defined and measurable for all pathways",
                    "5 comprehensive role-based curricula designed",
                    "All training materials developed to professional standard",
                    "E-learning modules engaging and interactive",
                    "Classroom materials include practical exercises and case studies",
                    "Role plays realistic and challenging",
                    "Board materials executive-level and strategic",
                    "Competency assessment framework comprehensive",
                    "All materials reviewed and approved by stakeholders"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Content Quality Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-2">
                  {[
                    "All regulatory requirements accurately reflected",
                    "Real examples and case studies from relevant sector",
                    "FCA enforcement themes and multi-firm review findings incorporated",
                    "Practical application focus, not just knowledge transfer",
                    "Vulnerable customer content integrated throughout",
                    "CR6 personal accountability emphasized",
                    "Materials accessible (plain language, visual aids)",
                    "Culturally appropriate and inclusive"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Timeline Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { milestone: "Training Needs Analysis completed", week: "Week 3" },
                    { milestone: "Learning objectives defined", week: "Week 4" },
                    { milestone: "Curriculum framework approved", week: "Week 6" },
                    { milestone: "E-learning modules developed", week: "Week 10" },
                    { milestone: "Classroom materials developed", week: "Week 12" },
                    { milestone: "Pilot training ready to commence", week: "Week 14" },
                    { milestone: "(Part 2 continues with delivery and embedding)", week: "" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm">{item.milestone}</span>
                      </div>
                      {item.week && <Badge variant="outline">{item.week}</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Pitfalls Tab */}
          <TabsContent value="pitfalls" className="space-y-4">
            <PitfallCard
              title="Generic, One-Size-Fits-All Training"
              description="Training not tailored to different roles and responsibilities. Staff don't understand how Consumer Duty applies to THEIR job."
              impact="Training becomes box-ticking exercise, doesn't change behaviour. FCA Finding: 'Training not tailored to different roles'"
              prevention="Five distinct role-based curricula with job-specific examples and application. Every training must be relevant to the learner's actual work."
            />

            <PitfallCard
              title="Theory Without Practice"
              description="Training focused on what Consumer Duty IS, not how to APPLY it. Staff know the rules but can't apply them in real situations."
              impact="Knowledge without application means no behaviour change. FCA expects practical competence, not just awareness."
              prevention="Every training session must include practical application: case studies, role plays, exercises. Don't just explain vulnerability drivers - practice recognizing indicators."
            />

            <PitfallCard
              title="Death by PowerPoint"
              description="Training consists of long presentations with no engagement. Low retention, disengagement, training becomes a chore."
              impact="Staff tune out, retention plummets, money wasted on ineffective training. Cannot demonstrate competency improvement."
              prevention="No more than 15 minutes lecture without activity. Mix methods: discussion, exercise, role play, quiz. Rule: 70% doing, 20% discussing, 10% presenting."
            />

            <PitfallCard
              title="Treating Board Training as Optional"
              description="Board members not trained or given generic training unsuitable for their level. Board unable to provide effective oversight and challenge."
              impact="Board cannot fulfil Consumer Duty governance requirements. Cannot challenge management effectively on customer outcomes."
              prevention="Board-specific curriculum at strategic level, integrated into regular Board education. Focus on interpreting MI and challenging management, not operational details."
            />

            <PitfallCard
              title="No Competency Assessment"
              description="Training completion tracked but no assessment of whether staff actually learned or can apply knowledge. Cannot evidence staff competence."
              impact="FCA regulatory risk - cannot demonstrate compliance with training requirements. May discover competency gaps only when problems occur."
              prevention="Multi-method assessment: tests, role plays, on-the-job observation, ongoing quality monitoring. Must evidence competency, not just attendance."
            />

            <PitfallCard
              title="One-and-Done Approach"
              description="Training treated as one-off project, not ongoing programme. Knowledge fades, no reinforcement, can't adapt to new issues."
              impact="Initial training benefit erodes over time. New staff, new products, new regulations not covered. Culture reverts to old ways."
              prevention="Initial training + 6-12 month refreshers + ongoing briefings on new developments. Build training into induction, promotions, product launches, system changes."
            />

            <PitfallCard
              title="No Link to Performance Management"
              description="Training separate from performance objectives and consequences. Staff see training as optional, behaviour doesn't change."
              impact="Training investment wasted as staff don't prioritize learning. No accountability for applying Consumer Duty in daily work."
              prevention="Consumer Duty competency in performance objectives, appraisals, and promotion decisions. What gets measured and rewarded gets done."
            />

            <PitfallCard
              title="Ignoring Learning Preferences"
              description="Training delivered in single format regardless of audience needs. Lower engagement and retention, accessibility barriers."
              impact="Some staff poorly served, accessibility requirements not met, engagement varies widely across audience."
              prevention="Blended approach: e-learning, classroom, on-job coaching, microlearning, videos, job aids. Ensure materials work for people with different learning needs."
            />

            <PitfallCard
              title="Outsourcing Without Customization"
              description="Generic off-the-shelf training from external providers with no firm-specific content. Staff don't see relevance to their actual work."
              impact="Training feels irrelevant, staff disengage, no behaviour change. Cannot demonstrate firm-specific application of Consumer Duty."
              prevention="If using external providers, ensure they customize to your firm, products, customer base, challenges. Review and approve all external training content before delivery."
            />

            <PitfallCard
              title="No Training Effectiveness Measurement"
              description="No evaluation of whether training achieving intended outcomes. Cannot demonstrate training working, cannot improve, regulatory risk."
              impact="Training investment may be wasted with no visibility. Cannot evidence to FCA that training driving better customer outcomes."
              prevention="Multi-level evaluation: reaction, learning, behaviour, results (Kirkpatrick model). Show training led to better customer outcomes, not just completion rates."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}