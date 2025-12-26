import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Printer, CheckCircle2, Clock, Users, AlertCircle, GraduationCap, BookOpen, Lightbulb, Shield, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { toast } from "@/hooks/use-toast";
import { getModuleStatus, updateModuleStatus } from "@/lib/storage";

export default function CDT1TrainingProgrammePart1() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(() => getModuleStatus("cd-t1-training-part1"));

  const handleMarkComplete = () => {
    updateModuleStatus("cd-t1-training-part1", "completed");
    setStatus("completed");
    toast({
      title: "Part 1 Complete",
      description: "Training Programme Foundation & Design marked as complete!",
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
              <Badge variant="outline" className="text-sm">CD-T1</Badge>
              <Badge className="text-sm bg-accent text-accent-foreground">Enablement</Badge>
              <Badge variant="secondary">Part 1 of 2</Badge>
              <Badge variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}>
                {status === "completed" ? "✓ Complete" : status === "in-progress" ? "In Progress" : "Not Started"}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold">Training Programme Delivery</h1>
            <p className="text-xl text-primary font-medium">Part 1: Foundation & Design</p>
            <p className="text-lg text-muted-foreground">
              Build comprehensive training capability to embed Consumer Duty across all roles
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
            Duration: 6-8 weeks (design and rollout)
          </span>
          <span className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Scope: All staff from Board to frontline
          </span>
        </div>

        <Alert className="bg-primary/5 border-primary/20">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Critical Requirement:</strong> New Individual Conduct Rule 6 (CR6) - "act to deliver good outcomes for retail customers" - applies to ALL conduct rules staff
          </AlertDescription>
        </Alert>
      </div>

      <Separator />

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
                <GraduationCap className="h-5 w-5 text-primary" />
                Purpose & Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                This module guides you through designing and developing a comprehensive Consumer Duty 
                training programme that equips all staff with the knowledge, skills, and confidence to 
                deliver good customer outcomes. Part 1 covers programme design and material development 
                (Steps 1-4). Part 2 covers delivery, measurement, and embedding (Steps 5-8).
              </p>
              
              <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-l-primary">
                <p className="font-semibold mb-2">Critical Success Factor</p>
                <p className="text-sm text-muted-foreground">
                  "Training must drive behavioural change and measurable improvement in customer outcomes, 
                  not just knowledge transfer"
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Deliverables</CardTitle>
              <CardDescription>What you'll produce by completing this module (Part 1)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: "📊", title: "Training Needs Analysis", desc: "Comprehensive analysis by role and function" },
                  { icon: "🎯", title: "Role-Based Training Curriculum", desc: "5 distinct audience pathways" },
                  { icon: "💻", title: "E-learning Modules", desc: "Interactive online learning content" },
                  { icon: "📚", title: "Classroom Materials", desc: "Facilitator guides and participant workbooks" },
                  { icon: "✅", title: "Competency Assessment Framework", desc: "Multi-method assessment approach" },
                  { icon: "📈", title: "Training Effectiveness Measurement", desc: "Kirkpatrick 4-level evaluation approach" },
                  { icon: "👥", title: "Senior Leadership Training", desc: "Board/SMF specific curriculum" },
                  { icon: "🎭", title: "Role Play Scenarios", desc: "Practical customer interaction simulations" },
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
              <CardTitle>5 Role-Based Training Pathways</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { pathway: "1", title: "Board & NEDs", duration: "3 hours", focus: "Strategic oversight and governance" },
                  { pathway: "2", title: "Senior Management Functions", duration: "6 hours", focus: "Accountability and function-specific application" },
                  { pathway: "3", title: "Product Designers", duration: "8 hours", focus: "Inclusive design and fair value assessment" },
                  { pathway: "4", title: "Customer-Facing Staff", duration: "12 hours", focus: "Practical application and vulnerability training" },
                  { pathway: "5", title: "Compliance/Risk/Audit", duration: "8 hours", focus: "Technical deep-dive and testing approaches" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border">
                    <Badge className="w-8 h-8 flex items-center justify-center">{item.pathway}</Badge>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.focus}</p>
                    </div>
                    <Badge variant="outline">{item.duration}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Continue to Part 2
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Part 2 covers training delivery, measurement, and embedding (Steps 5-8)
              </p>
              <Button asChild>
                <Link to="/enablement/training-part2">
                  Go to Part 2: Rollout & Embedding
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: REGULATORY FOUNDATION */}
        <TabsContent value="regulatory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Conduct Rule 6 (CR6) Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30">
                <p className="font-bold text-lg mb-2">Individual Conduct Rule 6:</p>
                <p className="text-lg">"You must act to deliver good outcomes for retail customers"</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-sm mb-3">Scope - Applies to ALL conduct rules staff:</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Employees directly involved in providing services</li>
                    <li>• Those whose actions could affect retail customer outcomes</li>
                    <li>• Compliance, risk, product design, marketing roles</li>
                    <li>• Customer service, sales, advice, and support teams</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-sm mb-3">What CR6 Means in Practice:</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Personal responsibility for customer outcomes</li>
                    <li>• Cannot claim "I was just following orders"</li>
                    <li>• Must speak up if processes cause harm</li>
                    <li>• Expected to use judgment, not just follow scripts</li>
                  </ul>
                </div>
              </div>

              <Alert className="bg-warning/10 border-warning/30">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Training Implication:</strong> All conduct staff must understand CR6 obligations, 
                  know how their role affects customer outcomes, understand when to escalate concerns, and 
                  know what "good outcomes" look like for their area.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <RegulatoryQuote
            source="FCA"
            reference="FG22/5 para 12.4"
            quote="Firms should ensure all staff understand the firm's obligations under the Consumer Duty, including the four outcomes, and how these apply to their role"
          />

          <Card>
            <CardHeader>
              <CardTitle>SMF Accountability for Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="font-semibold mb-2">SMF Responsibility:</p>
                <p className="text-sm text-muted-foreground">
                  Senior managers are accountable for ensuring their area has adequate Consumer Duty training, 
                  staff are competent to perform their roles, training effectiveness is monitored, competency 
                  gaps are identified and addressed, and records are maintained for regulatory review.
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold text-sm mb-3">Board Oversight Must Be Satisfied That:</h5>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Training programme is comprehensive
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    All staff trained to appropriate level
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Training is driving cultural change
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Competency maintained through refreshers
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Evidence available for regulatory review
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FCA Multi-Firm Review Findings</CardTitle>
              <CardDescription>November 2025 - Training Quality Assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-sm flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    Good Practice Identified
                  </h5>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li>✓ Comprehensive role-based curricula with practical scenarios</li>
                    <li>✓ Training integrated into induction for all new joiners</li>
                    <li>✓ Regular testing and competency assessment, not just attendance</li>
                    <li>✓ Senior leaders visibly participating in training delivery</li>
                    <li>✓ Real case studies from firm's own customer interactions</li>
                    <li>✓ Effectiveness measured through behaviour change</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-sm flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    Areas for Improvement
                  </h5>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li>✗ Generic, one-size-fits-all training not tailored to roles</li>
                    <li>✗ Focus on regulatory requirements, not practical application</li>
                    <li>✗ Death by PowerPoint with no engagement</li>
                    <li>✗ Training treated as one-off project, not ongoing</li>
                    <li>✗ No assessment of whether training changed behaviour</li>
                    <li>✗ No link between training and performance management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: IMPLEMENTATION STEPS */}
        <TabsContent value="steps" className="space-y-6">
          <Alert>
            <BookOpen className="h-4 w-4" />
            <AlertDescription>
              Part 1 covers programme design and foundation (Steps 1-4). Part 2 covers delivery and embedding (Steps 5-8).
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Phase 1: Training Needs Analysis (Weeks 1-3)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChecklistSection
                stepNumber={1}
                title="Conduct Comprehensive Training Needs Analysis"
                description="Identify training requirements across all roles and levels"
                moduleId="cd-t1-part1"
                items={[
                  { id: "t1-1-1", label: "Map all roles that interact with or affect retail customers", details: "Board/NEDs, SMFs, Product teams, Marketing, Sales, Customer service, Complaints, Collections, Compliance/Risk, Internal audit, Technology, Third parties" },
                  { id: "t1-1-2", label: "For each role group, identify current knowledge level and gaps", details: "Knowledge gaps (regulatory vs understanding), Skills gaps (what to DO differently), Attitude/culture gaps (mindset changes)" },
                  { id: "t1-1-3", label: "Gather inputs through structured interviews and focus groups", details: "Interview role holders and managers, run focus groups by function, analyse quality monitoring and complaint themes" },
                  { id: "t1-1-4", label: "Prioritise training needs by urgency", details: "Critical (customer-facing), High (product teams), Medium (support functions), Lower (back office)" },
                  { id: "t1-1-5", label: "Document findings in Training Needs Analysis Report" },
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase 1: Learning Objectives (Weeks 3-4)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChecklistSection
                stepNumber={2}
                title="Define Learning Objectives by Role Group"
                description="Specify measurable learning objectives for each audience using Bloom's Taxonomy"
                moduleId="cd-t1-part1"
                items={[
                  { id: "t1-2-1", label: "Define objectives for Board/NEDs (3-5 objectives)", details: "Knowledge: Recall cross-cutting rules; Application: Apply Consumer Duty lens to Board papers; Evaluation: Challenge management on evidence" },
                  { id: "t1-2-2", label: "Define objectives for SMFs (5-7 objectives)", details: "Comprehension: Explain personal accountability; Application: Embed requirements in area processes; Evaluation: Assess whether area delivers good outcomes" },
                  { id: "t1-2-3", label: "Define objectives for Product Designers (7-10 objectives)", details: "Application: Apply principles when designing products; Synthesis: Create products meeting customer needs; Analysis: Identify potential harms" },
                  { id: "t1-2-4", label: "Define objectives for Customer-Facing Staff (10-12 objectives)", details: "Application: Apply principles in customer interactions; Analysis: Recognize when customer not achieving good outcome; Evaluation: Determine when to escalate" },
                  { id: "t1-2-5", label: "Define objectives for Compliance/Risk/Audit (8-10 objectives)", details: "Analysis: Conduct root cause analysis; Evaluation: Test control effectiveness" },
                  { id: "t1-2-6", label: "For each objective, specify assessment method and Consumer Duty link" },
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase 2: Curriculum Design (Weeks 4-6)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ChecklistSection
                stepNumber={3}
                title="Design Role-Based Training Curriculum Structure"
                description="Create comprehensive curriculum framework for all 5 pathways"
                moduleId="cd-t1-part1"
                items={[
                  { id: "t1-3-1", label: "Design Pathway 1: Board & NEDs curriculum", details: "3 hours total: CD Overview (45 mins), Four Outcomes (60 mins), Governance & Oversight (45 mins), Case Studies (30 mins)" },
                  { id: "t1-3-2", label: "Design Pathway 2: SMF curriculum", details: "6 hours: Foundations (60 mins), SMF Accountability (60 mins), Function Embedding (90 mins), Vulnerable Customers (60 mins), Action Planning (90 mins)" },
                  { id: "t1-3-3", label: "Design Pathway 3: Product Designers curriculum", details: "8 hours: Products & Services (90 mins), Fair Value (120 mins), Vulnerability in Design (90 mins), Distribution (60 mins), Practical Application (90 mins)" },
                  { id: "t1-3-4", label: "Design Pathway 4: Customer-Facing Staff curriculum", details: "12 hours blended: E-learning foundations (90 mins), Consumer Understanding (120 mins), Consumer Support (120 mins), Vulnerable Customers (180 mins), Practice & Assessment (120 mins), On-the-job coaching (90 mins)" },
                ]}
              />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pathway-4-detail">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Customer-Facing Staff Curriculum Detail (Pathway 4)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Most comprehensive pathway with 12 hours blended learning including extensive role plays.
                    </p>
                    <div className="space-y-3">
                      {[
                        { module: "1", title: "Consumer Duty Foundations", time: "90 mins", format: "E-learning", content: "What is Consumer Duty, four outcomes, CR6 personal responsibility" },
                        { module: "2", title: "Consumer Understanding in Practice", time: "120 mins", format: "Classroom", content: "Explaining products, checking understanding, adapting communication style" },
                        { module: "3", title: "Consumer Support in Practice", time: "120 mins", format: "Classroom", content: "Timely support, removing barriers, handling complaints, escalation" },
                        { module: "4", title: "Vulnerable Customer Recognition", time: "180 mins", format: "Classroom", content: "Four drivers, indicators, inquiry techniques, adjustments, role plays with actors" },
                        { module: "5", title: "Practical Application & Assessment", time: "120 mins", format: "Classroom", content: "Case studies, scenarios, quality monitoring, personal commitment" },
                        { module: "6", title: "On-the-Job Coaching", time: "90 mins", format: "Workplace", content: "Manager observation, feedback, competency sign-off" },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">Module {item.module}</Badge>
                            <div className="flex gap-2">
                              <Badge variant="secondary">{item.time}</Badge>
                              <Badge>{item.format}</Badge>
                            </div>
                          </div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase 2: Content Development (Weeks 6-12)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ChecklistSection
                stepNumber={4}
                title="Develop Training Materials and Content"
                description="Create all training content to professional standard"
                moduleId="cd-t1-part1"
                items={[
                  { id: "t1-4-1", label: "Develop e-learning modules with interactive elements", details: "Clear objectives, multimedia, real examples, knowledge checks, accessibility features, mobile-responsive" },
                  { id: "t1-4-2", label: "Create classroom training materials", details: "Facilitator guides, presentation slides, participant workbooks, case study materials, role play briefings, assessment materials" },
                  { id: "t1-4-3", label: "Develop case studies based on real scenarios", details: "Anonymised firm examples, FCA enforcement cases, common dilemmas, no obvious 'right answer'" },
                  { id: "t1-4-4", label: "Create role play scenarios for customer-facing training", details: "Realistic customer interactions, scripts for actors, observer briefing, evaluation criteria" },
                  { id: "t1-4-5", label: "Develop Board/Executive level materials", details: "Concise strategic presentation, Board pack-style materials, real MI examples, action planning templates" },
                  { id: "t1-4-6", label: "Build competency assessment framework", details: "Knowledge tests, skills assessments, behavioural observation forms, self-assessment, pass criteria" },
                  { id: "t1-4-7", label: "Test all e-learning modules and fix issues" },
                ]}
              />

              <div className="bg-info/10 p-4 rounded-lg border border-info/30">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Content Quality Standards
                </h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• E-learning modules no longer than 30-45 minutes, chunked into 5-10 minute segments</li>
                  <li>• No more than 15 minutes lecture without activity in classroom sessions</li>
                  <li>• 70% doing, 20% discussing, 10% presenting</li>
                  <li>• All materials tested for plain language (Flesch score &gt;60)</li>
                  <li>• Include minimum 2-3 practical examples per topic</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Continue to Part 2
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Part 2 covers Steps 5-8: Train-the-trainer, phased rollout, effectiveness measurement, 
                and embedding continuous learning.
              </p>
              <Button asChild>
                <Link to="/enablement/training-part2">
                  Continue to Part 2: Rollout & Embedding
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: TEMPLATES & TOOLS */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateCard
              title="Consumer Duty Training Matrix"
              description="Comprehensive role-based training matrix mapping all roles (Board, SMFs, first line, customer-facing, product design, distribution) to training requirements, frequencies, and competency levels"
              format="Excel"
              onDownload={() => handleDownload("Consumer Duty Training Matrix")}
            />
            <TemplateCard
              title="Training Needs Analysis Report"
              description="Comprehensive Excel workbook with role inventory, current competency assessment, knowledge/skills/attitude gaps, priorities, and recommendations"
              format="Excel"
              onDownload={() => handleDownload("Training Needs Analysis Report")}
            />
            <TemplateCard
              title="Learning Objectives Matrix by Role"
              description="Matrix showing objectives by Bloom's Taxonomy level for each role group, with assessment methods and Consumer Duty links"
              format="Excel"
              onDownload={() => handleDownload("Learning Objectives Matrix")}
            />
            <TemplateCard
              title="Consumer Duty Quiz Question Bank"
              description="50+ multiple choice and scenario-based quiz questions covering Consumer Principle, four outcomes, and reasonable grounds with answer keys and scoring rubrics"
              format="Word"
              onDownload={() => handleDownload("Quiz Question Bank")}
            />
            <TemplateCard
              title="Consumer Duty Scenario Library"
              description="30+ practical scenarios for training exercises covering all four outcomes, vulnerability situations, edge cases, and escalation decisions with facilitator discussion guides"
              format="Word"
              onDownload={() => handleDownload("Scenario Library")}
            />
            <TemplateCard
              title="Role-Based Training Curriculum Framework"
              description="Complete curriculum document with 5 pathway specifications, module descriptions, learning methods, and assessment approaches"
              format="Word"
              onDownload={() => handleDownload("Training Curriculum Framework")}
            />
            <TemplateCard
              title="E-Learning Module Development Template"
              description="Storyboard template with screen-by-screen content plan, script template, visual design specifications, and assessment questions"
              format="Word"
              onDownload={() => handleDownload("E-Learning Development Template")}
            />
            <TemplateCard
              title="Classroom Training Module Template"
              description="Comprehensive classroom template with detailed session plan, facilitator guide, participant workbook, and evaluation form"
              format="Word"
              onDownload={() => handleDownload("Classroom Training Template")}
            />
            <TemplateCard
              title="Case Study Development Template"
              description="Template for creating Consumer Duty case studies with scenario structure, discussion questions, and facilitation notes"
              format="Word"
              onDownload={() => handleDownload("Case Study Template")}
            />
            <TemplateCard
              title="Role Play Scenario Template"
              description="Template for developing role play exercises with character briefings, scenario progression, observation criteria, and debrief guide"
              format="Word"
              onDownload={() => handleDownload("Role Play Scenario Template")}
            />
            <TemplateCard
              title="Competency Assessment Framework"
              description="Multi-method assessment framework with knowledge tests, skills rubrics, observation forms, self-assessment, and pass criteria"
              format="Excel"
              onDownload={() => handleDownload("Competency Assessment Framework")}
            />
            <TemplateCard
              title="Training Records Log"
              description="Individual and team training records tracker with completion dates, assessment scores, certification status, and refresher due dates"
              format="Excel"
              onDownload={() => handleDownload("Training Records Log")}
            />
            <TemplateCard
              title="6-8 Week Implementation Timeline"
              description="Accelerated implementation timeline with week-by-week activities for rapid training design and initial rollout phases"
              format="Excel"
              onDownload={() => handleDownload("6-8 Week Implementation Timeline")}
            />
          </div>
        </TabsContent>

        {/* TAB 5: SUCCESS CRITERIA */}
        <TabsContent value="success" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Programme Design Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                  "All materials reviewed and approved by stakeholders",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/5">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6-8 Week Accelerated Timeline (Part 1)</CardTitle>
              <CardDescription>Design and initial rollout phases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { milestone: "Training Needs Analysis completed", week: "Week 1-2" },
                  { milestone: "Learning objectives defined by role", week: "Week 2" },
                  { milestone: "Core curriculum framework approved", week: "Week 3" },
                  { milestone: "E-learning modules developed", week: "Week 4-5" },
                  { milestone: "Classroom materials developed", week: "Week 5-6" },
                  { milestone: "Quiz questions and scenarios finalized", week: "Week 6" },
                  { milestone: "Pilot training conducted and refined", week: "Week 7" },
                  { milestone: "Initial rollout commenced", week: "Week 8" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{item.milestone}</span>
                    <Badge variant="outline">{item.week}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: COMMON PITFALLS */}
        <TabsContent value="pitfalls" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <PitfallCard
              title="Generic, One-Size-Fits-All Training"
              description="Training not tailored to different roles and responsibilities means staff don't understand how Consumer Duty applies to THEIR job"
              impact="Training becomes box-ticking exercise, doesn't change behaviour"
              prevention="Five distinct role-based curricula with job-specific examples and application"
            />
            <PitfallCard
              title="Theory Without Practice"
              description="Training focused on what Consumer Duty IS, not how to APPLY it - staff know the rules but can't apply them in real situations"
              impact="Low confidence, inconsistent application, poor customer outcomes"
              prevention="Every session includes practical application: case studies, role plays, exercises"
            />
            <PitfallCard
              title="Death by PowerPoint"
              description="Training consists of long presentations with no engagement - low retention, disengagement, training becomes chore"
              impact="Poor knowledge retention, staff see training as burden not value"
              prevention="No more than 15 minutes lecture without activity. Mix: discussion, exercise, role play, quiz. Target: 70% doing, 20% discussing, 10% presenting"
            />
            <PitfallCard
              title="Board Training Treated as Optional"
              description="Board members not trained or given generic training unsuitable for their level - Board unable to provide effective oversight"
              impact="Regulatory criticism, inadequate governance, missed warning signs"
              prevention="Board-specific curriculum at strategic level, integrated into regular Board education"
            />
            <PitfallCard
              title="No Competency Assessment"
              description="Training completion tracked but no assessment of whether staff actually learned or can apply the knowledge"
              impact="Cannot evidence staff competent to perform Consumer Duty responsibilities"
              prevention="Multi-method assessment: tests, role plays, on-the-job observation, ongoing quality monitoring"
            />
            <PitfallCard
              title="One-and-Done Approach"
              description="Training treated as one-off project, not ongoing programme - knowledge fades, no reinforcement, can't adapt"
              impact="Competency drift, culture erodes, cannot respond to regulatory changes"
              prevention="Initial training + 6-12 month refreshers + ongoing briefings on new developments"
            />
            <PitfallCard
              title="No Link to Performance Management"
              description="Training separate from performance objectives and consequences - staff see training as optional"
              impact="Behaviour doesn't change, culture unchanged, wasted investment"
              prevention="Consumer Duty competency in performance objectives, appraisals, and promotion decisions"
            />
            <PitfallCard
              title="Ignoring Learning Preferences"
              description="Training delivered in single format regardless of audience needs - lower engagement and accessibility barriers"
              impact="Some staff unable to learn effectively, compliance gaps"
              prevention="Blended approach: e-learning, classroom, on-job coaching, microlearning, videos, job aids"
            />
            <PitfallCard
              title="Outsourcing Without Customization"
              description="Generic off-the-shelf training from external providers with no firm-specific content - staff don't see relevance"
              impact="Poor engagement, no behaviour change, wasted investment"
              prevention="If using external providers, ensure they customize to your firm, products, customer base, challenges"
            />
            <PitfallCard
              title="No Training Effectiveness Measurement"
              description="No evaluation of whether training achieving intended outcomes - cannot demonstrate training working"
              impact="Cannot improve, cannot defend compliance, regulatory risk"
              prevention="Multi-level evaluation: reaction, learning, behavior, results (Kirkpatrick model)"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
