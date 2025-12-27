import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Printer, Download, CheckCircle2, Clock, Users, Target, AlertCircle, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { ChecklistSection } from "@/components/modules/ChecklistSection";
import { ModuleChecklistProgress } from "@/components/modules/ModuleChecklistProgress";
import { RegulatoryQuote } from "@/components/modules/RegulatoryQuote";
import { TrackedTabs, TrackedTabsList, TrackedTabsTrigger, TrackedTabsContent } from "@/components/modules/TrackedTabs";
import { toast } from "sonner";
import { useProgressStore } from "@/stores/progressStore";

const MODULE_ID = "cd-f1-readiness";

export default function CDf1ReadinessAssessment() {
  const navigate = useNavigate();
  
  // Use Zustand store
  const { getModuleStatus, markModuleComplete, markModuleInProgress, updateLastAccessed } = useProgressStore();
  const moduleStatus = getModuleStatus(MODULE_ID);
  const status = moduleStatus.status === 'complete' ? 'completed' : moduleStatus.status;

  // Update last accessed on mount
  useEffect(() => {
    updateLastAccessed(MODULE_ID);
  }, [updateLastAccessed]);

  const handleMarkComplete = () => {
    markModuleComplete(MODULE_ID);
  };

  const handleMarkInProgress = () => {
    markModuleInProgress(MODULE_ID);
  };

  const handlePrint = () => window.print();
  const handleDownload = (templateName: string) => {
    toast.success("Downloading Template", {
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
              <Badge variant="outline" className="text-sm">CD-F1</Badge>
              <Badge className="text-sm">Foundation Module</Badge>
              <Badge variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}>
                {status === "completed" ? "✓ Complete" : status === "in-progress" ? "In Progress" : "Not Started"}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold">Consumer Duty Readiness Assessment</h1>
            <p className="text-lg text-muted-foreground">
              Establish baseline understanding of your organization's Consumer Duty readiness
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
            Duration: 2-4 weeks
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Phase: Foundation
          </span>
        </div>
      </div>

      <Separator />

      {/* Tabbed Content */}
      <TrackedTabs moduleId={MODULE_ID} defaultValue="overview" className="space-y-6">
        <TrackedTabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TrackedTabsTrigger value="overview">Overview</TrackedTabsTrigger>
          <TrackedTabsTrigger value="regulatory">Regulatory</TrackedTabsTrigger>
          <TrackedTabsTrigger value="steps">Implementation</TrackedTabsTrigger>
          <TrackedTabsTrigger value="templates">Templates</TrackedTabsTrigger>
          <TrackedTabsTrigger value="success">Success Criteria</TrackedTabsTrigger>
          <TrackedTabsTrigger value="pitfalls">Pitfalls</TrackedTabsTrigger>
        </TrackedTabsList>

        {/* TAB 1: OVERVIEW */}
        <TrackedTabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Purpose & Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The Consumer Duty Readiness Assessment is the critical first step in your implementation journey. 
                This module helps you establish a comprehensive baseline of your organization's current state, 
                identify capability gaps, and develop a clear understanding of the work required to meet FCA expectations.
              </p>
              
              <Alert className="bg-info/5 border-info/50">
                <AlertCircle className="h-4 w-4 text-info" />
                <AlertDescription>
                  <strong>Why This Matters:</strong> The FCA requires firms to demonstrate "reasonable grounds" 
                  for believing they are delivering good customer outcomes. A thorough readiness assessment 
                  provides the evidence base for this crucial test (FG22/5).
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
                  { icon: "📊", title: "Current State Maturity Assessment", desc: "5-level assessment across 8 key capability areas" },
                  { icon: "🔍", title: "Capability Gap Analysis", desc: "Detailed mapping of gaps against FCA requirements" },
                  { icon: "📈", title: "SWOT Analysis", desc: "Strategic assessment of Consumer Duty readiness" },
                  { icon: "👥", title: "Stakeholder Landscape Map", desc: "Complete mapping of internal stakeholders and their roles" },
                  { icon: "⚡", title: "Quick Wins Identification", desc: "30-day action plan for immediate improvements" },
                  { icon: "📄", title: "Executive Summary Report", desc: "Board-ready presentation of findings" },
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
              <CardTitle>Stakeholders Involved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["Board", "Senior Management", "Compliance", "Risk", "Operations", "Product", "Legal", "Customer Service"].map((role) => (
                  <Badge key={role} variant="secondary">{role}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Clear understanding of current Consumer Duty maturity",
                "Prioritized list of gaps requiring remediation",
                "Baseline metrics for measuring progress",
                "Board approval to proceed with full implementation",
                "Resource requirements understood and committed"
              ].map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{outcome}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TrackedTabsContent>

        {/* TAB 2: REGULATORY FOUNDATION */}
        <TrackedTabsContent value="regulatory" className="space-y-6">
          <RegulatoryQuote
            source="FCA"
            reference="FG22/5, Para 4.2"
            quote="The Consumer Duty sets a higher and clearer standard of consumer protection across financial services and requires firms to put their customers' needs first."
            link="https://www.fca.org.uk/publication/finalised-guidance/fg22-5.pdf"
          />

          <Card>
            <CardHeader>
              <CardTitle>The "Reasonable Grounds" Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Under Consumer Duty, firms must have <strong>reasonable grounds</strong> to believe they are 
                delivering good customer outcomes. This is not about perfection – it's about demonstrating 
                that you have taken reasonable steps to understand your customers' needs and assess whether 
                your products, services, and support are meeting those needs.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-l-primary space-y-3">
                <p className="font-semibold">What constitutes "reasonable grounds"?</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Appropriate testing and monitoring of customer outcomes</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Regular review of management information and data</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Evidence-based decision making</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Documented governance and oversight processes</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Three-Tiered Structure of Consumer Duty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-l-primary pl-4 py-2">
                  <h4 className="font-semibold mb-2">Tier 1: Consumer Principle (Principle 12)</h4>
                  <p className="text-sm text-muted-foreground">
                    "A firm must act to deliver good outcomes for retail customers."
                  </p>
                </div>

                <div className="border-l-4 border-l-accent pl-4 py-2">
                  <h4 className="font-semibold mb-2">Tier 2: Cross-Cutting Rules</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong>Act in good faith</strong> – Be honest, fair and act with integrity</li>
                    <li><strong>Avoid foreseeable harm</strong> – Proactively identify and prevent harm</li>
                    <li><strong>Enable and support</strong> – Help customers pursue their financial objectives</li>
                  </ul>
                </div>

                <div className="border-l-4 border-l-secondary pl-4 py-2">
                  <h4 className="font-semibold mb-2">Tier 3: Four Outcomes</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Products & Services", "Price & Value", "Consumer Understanding", "Consumer Support"].map((outcome) => (
                      <Badge key={outcome} variant="outline" className="justify-center">{outcome}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proportionality Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="bg-accent/5 border-accent/50">
                <Lightbulb className="h-4 w-4 text-accent" />
                <AlertDescription>
                  The FCA expects firms to apply the Duty proportionately. The steps you take should be 
                  appropriate to the nature, scale and complexity of your business, and the products and 
                  services you provide. Smaller firms are not expected to adopt the same approaches as 
                  large, complex organizations.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TrackedTabsContent>

        {/* TAB 3: IMPLEMENTATION STEPS */}
        <TrackedTabsContent value="steps" className="space-y-6">
          <Alert className="bg-primary/5 border-primary/50">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription>
              Complete each step in sequence. Your progress is automatically saved as you check off items.
            </AlertDescription>
          </Alert>

          <ModuleChecklistProgress 
            moduleId="cd-f1-readiness" 
            totalSteps={7}
          />

          <ChecklistSection
            stepNumber={1}
            title="Establish Project Governance"
            description="Set up the governance structure to oversee your Consumer Duty implementation"
            moduleId="cd-f1-readiness"
            items={[
              { 
                id: "step1-1", 
                label: "Secure Board/ExCo sponsorship and commitment",
                details: "Present business case for Consumer Duty implementation to Board. Obtain formal commitment of resources and executive sponsorship.",
                responsible: "CEO/CFO",
                duration: "1 week"
              },
              { 
                id: "step1-2", 
                label: "Appoint dedicated project lead with sufficient authority",
                details: "Identify senior individual with cross-functional influence to lead implementation.",
                responsible: "Board",
                duration: "1 week"
              },
              { 
                id: "step1-3", 
                label: "Form cross-functional assessment team",
                details: "Include representatives from Compliance, Risk, Operations, Product, Legal, Customer Service, and MI/Data teams.",
                responsible: "Project Lead",
                duration: "1 week"
              },
              { 
                id: "step1-4", 
                label: "Define project scope and boundaries",
                details: "Clarify which products, services, and customer segments are in scope for initial assessment.",
                responsible: "Project Team",
                duration: "1 week"
              },
            ]}
          />

          <ChecklistSection
            stepNumber={2}
            title="Conduct Maturity Assessment"
            description="Assess current state across all Consumer Duty capability areas"
            moduleId="cd-f1-readiness"
            items={[
              { 
                id: "step2-1", 
                label: "Deploy maturity assessment questionnaire across all business areas",
                details: "Use structured questionnaire covering governance, products, pricing, communications, support, data, and culture.",
                responsible: "Project Team",
                duration: "2 weeks"
              },
              { 
                id: "step2-2", 
                label: "Score current state using 1-5 maturity scale",
                details: "1=Ad-hoc, 2=Developing, 3=Defined, 4=Managed, 5=Optimized",
                responsible: "Assessment Team",
                duration: "1 week"
              },
              { 
                id: "step2-3", 
                label: "Document evidence supporting each maturity score",
                details: "Collect policies, procedures, MI, meeting minutes, and other artifacts as evidence.",
                responsible: "Business Areas",
                duration: "2 weeks"
              },
              { 
                id: "step2-4", 
                label: "Identify and prioritize capability gaps",
                details: "Compare current maturity to FCA expectations. Flag critical gaps requiring immediate attention.",
                responsible: "Project Team",
                duration: "1 week"
              },
            ]}
            templateLink={{
              name: "Current State Maturity Assessment Template",
              onClick: () => handleDownload("Maturity Assessment Template")
            }}
          />

          <ChecklistSection
            stepNumber={3}
            title="Stakeholder Consultation"
            description="Engage stakeholders to understand current processes and challenges"
            moduleId="cd-f1-readiness"
            items={[
              { 
                id: "step3-1", 
                label: "Map all internal and external stakeholders",
                details: "Identify everyone with a role in delivering customer outcomes across the value chain.",
                responsible: "Project Team",
                duration: "1 week"
              },
              { 
                id: "step3-2", 
                label: "Conduct structured stakeholder interviews (15-25 interviews typical)",
                details: "Use standard interview script. Focus on current processes, pain points, and Consumer Duty understanding.",
                responsible: "Assessment Team",
                duration: "2 weeks"
              },
              { 
                id: "step3-3", 
                label: "Document current processes and customer journeys",
                details: "Create as-is process maps for key customer journeys and touchpoints.",
                responsible: "Process Owners",
                duration: "2 weeks"
              },
              { 
                id: "step3-4", 
                label: "Identify pain points, concerns, and barriers",
                details: "Document systemic issues, resource constraints, and areas of uncertainty.",
                responsible: "Project Team",
                duration: "1 week"
              },
            ]}
            templateLink={{
              name: "Stakeholder Map Template",
              onClick: () => handleDownload("Stakeholder Map Template")
            }}
          />

          <ChecklistSection
            stepNumber={4}
            title="Gap Analysis"
            description="Compare current state to FCA requirements"
            moduleId="cd-f1-readiness"
            items={[
              { 
                id: "step4-1", 
                label: "Compare current state to Consumer Duty requirements",
                details: "Map each FCA requirement (from PRIN 2A) to current capabilities and controls.",
                responsible: "Compliance",
                duration: "2 weeks"
              },
              { 
                id: "step4-2", 
                label: "Assess gaps across all Four Outcomes",
                details: "Analyze gaps for Products & Services, Price & Value, Consumer Understanding, and Consumer Support.",
                responsible: "Assessment Team",
                duration: "2 weeks"
              },
              { 
                id: "step4-3", 
                label: "Prioritize gaps by risk and customer impact",
                details: "Use RAG rating (Red/Amber/Green) to prioritize remediation efforts.",
                responsible: "Risk",
                duration: "1 week"
              },
              { 
                id: "step4-4", 
                label: "Create comprehensive gap register",
                details: "Document all gaps with impact assessment, remediation approach, owner, and timeline.",
                responsible: "Project Team",
                duration: "1 week"
              },
            ]}
            templateLink={{
              name: "Gap Analysis Framework Template",
              onClick: () => handleDownload("Gap Analysis Framework")
            }}
          />

          <ChecklistSection
            stepNumber={5}
            title="SWOT Analysis"
            description="Strategic assessment of Consumer Duty readiness"
            moduleId="cd-f1-readiness"
            items={[
              { 
                id: "step5-1", 
                label: "Complete SWOT framework for Consumer Duty readiness",
                details: "Identify Strengths, Weaknesses, Opportunities, and Threats related to implementation.",
                responsible: "Project Team",
                duration: "1 week"
              },
              { 
                id: "step5-2", 
                label: "Validate SWOT with senior stakeholders",
                details: "Workshop findings with ExCo to ensure alignment and buy-in.",
                responsible: "Project Lead",
                duration: "1 week"
              },
              { 
                id: "step5-3", 
                label: "Identify strategic opportunities from Consumer Duty",
                details: "Consider competitive advantages, customer satisfaction improvements, and operational efficiencies.",
                responsible: "Strategy Team",
                duration: "1 week"
              },
            ]}
            templateLink={{
              name: "SWOT Analysis Template",
              onClick: () => handleDownload("SWOT Analysis Template")
            }}
          />

          <ChecklistSection
            stepNumber={6}
            title="Quick Wins Identification"
            description="Identify immediate improvements you can implement"
            moduleId="cd-f1-readiness"
            items={[
              { 
                id: "step6-1", 
                label: "Identify immediate improvements requiring minimal resource",
                details: "Focus on 'low-hanging fruit' that can demonstrate early progress.",
                responsible: "Project Team",
                duration: "1 week"
              },
              { 
                id: "step6-2", 
                label: "Assess implementation feasibility and resource requirements",
                details: "Consider cost, time, dependencies, and business disruption.",
                responsible: "Business Areas",
                duration: "1 week"
              },
              { 
                id: "step6-3", 
                label: "Prioritise quick wins by impact and effort",
                details: "Plot on 2x2 matrix (Impact vs Effort) to identify highest priority items.",
                responsible: "Project Team",
                duration: "1 week"
              },
              { 
                id: "step6-4", 
                label: "Create 30-day action plan for quick wins",
                details: "Assign owners, set deadlines, define success metrics for initial wave of improvements.",
                responsible: "Project Lead",
                duration: "1 week"
              },
            ]}
          />

          <ChecklistSection
            stepNumber={7}
            title="Executive Report"
            description="Present findings and obtain Board approval"
            moduleId="cd-f1-readiness"
            items={[
              { 
                id: "step7-1", 
                label: "Compile findings into executive summary report",
                details: "Create concise, Board-ready document summarizing assessment findings, gaps, and recommendations.",
                responsible: "Project Lead",
                duration: "1 week"
              },
              { 
                id: "step7-2", 
                label: "Present RAG-rated assessment to Board",
                details: "Deliver presentation highlighting current state, key gaps, resource requirements, and proposed roadmap.",
                responsible: "Project Sponsor",
                duration: "1 meeting"
              },
              { 
                id: "step7-3", 
                label: "Obtain formal Board approval to proceed with implementation",
                details: "Secure commitment of resources and authority to proceed with full Consumer Duty program.",
                responsible: "Board",
                duration: "1 week"
              },
            ]}
            templateLink={{
              name: "Executive Summary Report Template",
              onClick: () => handleDownload("Executive Summary Template")
            }}
          />
        </TrackedTabsContent>

        {/* TAB 4: TEMPLATES & TOOLS */}
        <TrackedTabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Templates & Tools</CardTitle>
              <CardDescription>
                Downloadable templates to support your readiness assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <TemplateCard
                  title="Current State Maturity Assessment"
                  description="5-level maturity assessment framework covering 8 key capability areas with scoring guidance"
                  format="Excel"
                  onDownload={() => handleDownload("Maturity Assessment")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
                <TemplateCard
                  title="Gap Analysis Framework"
                  description="Comprehensive gap analysis template mapping current state to FCA requirements with RAG rating"
                  format="Excel"
                  onDownload={() => handleDownload("Gap Analysis Framework")}
                />
                <TemplateCard
                  title="SWOT Analysis Template"
                  description="Strategic assessment framework for Consumer Duty readiness with guided prompts"
                  format="PowerPoint"
                  onDownload={() => handleDownload("SWOT Analysis")}
                />
                <TemplateCard
                  title="Stakeholder Map Template"
                  description="Visual mapping template for stakeholder influence and interest analysis"
                  format="PowerPoint"
                  onDownload={() => handleDownload("Stakeholder Map")}
                />
                <TemplateCard
                  title="Executive Summary Report"
                  description="Board-ready report template for presenting assessment findings and recommendations"
                  format="Word"
                  onDownload={() => handleDownload("Executive Summary Report")}
                />
                <TemplateCard
                  title="Quick Wins Action Plan"
                  description="30-day action plan template for tracking immediate improvement initiatives"
                  format="Excel"
                  onDownload={() => handleDownload("Quick Wins Action Plan")}
                />
              </div>
            </CardContent>
          </Card>
        </TrackedTabsContent>

        {/* TAB 5: SUCCESS CRITERIA */}
        <TrackedTabsContent value="success" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Success Criteria</CardTitle>
              <CardDescription>
                Your readiness assessment is complete when you can confirm all of the following:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { text: "Comprehensive baseline of current state documented with evidence", icon: CheckCircle2 },
                { text: "All key stakeholders (15-25 individuals) interviewed and inputs captured", icon: Users },
                { text: "Priority gaps identified and RAG-rated by risk and customer impact", icon: AlertCircle },
                { text: "Quick wins identified with assigned owners and delivery deadlines", icon: Target },
                { text: "Board approval obtained to proceed with full implementation program", icon: CheckCircle2 },
                { text: "Project governance structure established with clear RACI", icon: Users },
                { text: "Resource requirements (budget, people, time) understood and committed", icon: CheckCircle2 },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                    <Icon className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Time to Complete", value: "2-4 weeks typical" },
                  { label: "Stakeholder Engagement", value: "15-25 interviews expected" },
                  { label: "Documentation Produced", value: "5-7 key documents" },
                  { label: "Board Presentation", value: "1 formal presentation" },
                  { label: "Quick Wins Identified", value: "8-12 initiatives typical" },
                  { label: "Gap Register Items", value: "25-50 gaps typical" },
                ].map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-lg font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TrackedTabsContent>

        {/* TAB 6: COMMON PITFALLS */}
        <TrackedTabsContent value="pitfalls" className="space-y-6">
          <Alert className="bg-warning/5 border-warning/50">
            <AlertCircle className="h-4 w-4 text-warning" />
            <AlertDescription>
              Learn from common mistakes made by other firms during their readiness assessments
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <PitfallCard
              title="Rushing the Assessment"
              description="Firms rush through the assessment phase to 'get on with implementation', treating it as a box-ticking exercise rather than a genuine diagnostic."
              impact="Missing critical gaps that surface later in implementation, leading to rework, delays, and inadequate customer outcomes. Weak foundation undermines entire program."
              prevention="Allow the full 2-4 weeks for proper assessment. Don't skip stakeholder consultation. Involve Board early to set expectation this is strategic work, not compliance admin."
            />

            <PitfallCard
              title="Over-reliance on Documentation"
              description="Relying solely on documented processes and policies versus understanding actual practice and customer experience in reality."
              impact="Assessment doesn't reflect real customer experience. Documented processes may be comprehensive but not followed, or not effective in delivering good outcomes."
              prevention="Combine document review with operational observation, mystery shopping, and customer journey testing. Talk to front-line staff who interact with customers daily."
            />

            <PitfallCard
              title="Missing Informal Structures"
              description="Ignoring shadow processes, workarounds, and informal power structures that determine how work actually gets done."
              impact="Change initiatives hit unexpected resistance. Implementation blocked by informal gatekeepers. Actual decision-making differs from documented governance."
              prevention="Map informal networks and influence patterns. Identify champions and potential resistors. Consider organizational culture and change readiness alongside technical capability."
            />

            <PitfallCard
              title="Generic TCF Assessment"
              description="Using generic Treating Customers Fairly (TCF) assessment frameworks without adapting for Consumer Duty's higher outcomes standard."
              impact="Missing Consumer Duty-specific requirements like target market definitions, fair value assessments, and foreseeable harm analysis. Assessment doesn't capture the step-change required."
              prevention="Use FCA-specific assessment criteria from FG22/5 and PS22/9. Focus on outcomes not just processes. Engage external expertise if needed to benchmark against Consumer Duty standard."
            />

            <PitfallCard
              title="Insufficient Stakeholder Engagement"
              description="Limited stakeholder consultation, usually just compliance and senior management, missing operational areas and frontline perspectives."
              impact="Blind spots in understanding of current state. Missing practical implementation challenges. Poor buy-in from those who need to deliver changes."
              prevention="Interview representatives from all functions: Product, Operations, Customer Service, MI, Legal, HR, Finance. Include frontline staff and managers. Aim for 15-25 interviews minimum."
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>FCA Multi-Firm Review Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The FCA's multi-firm reviews have highlighted common weaknesses in firms' initial assessments:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-warning">⚠️</span>
                  <span>Insufficient evidence to support 'reasonable grounds' claims</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-warning">⚠️</span>
                  <span>Gap analyses that lack detail on remediation approach and timelines</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-warning">⚠️</span>
                  <span>Board papers lacking specificity on resource commitments</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-warning">⚠️</span>
                  <span>Assessments that don't consider distribution chain implications</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TrackedTabsContent>
      </TrackedTabs>
    </div>
  );
}
