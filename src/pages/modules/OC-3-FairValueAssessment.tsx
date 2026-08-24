import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Printer,
  Scale,
  Target,
  Gavel,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ClipboardList,
  Shield,
} from "lucide-react";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { toast } from "sonner";
import { NotesTab } from "@/components/notes/NotesTab";

const NOTES_KEY = "oc-3";

const cycleSteps = [
  {
    t: "Define the target market granularly for each product",
    d: "Set out who the product is designed for and, just as importantly, who it is not. Avoid overly broad definitions that hide groups for whom the product does not work.",
  },
  {
    t: "Map foreseeable harms and link them to fair value risks",
    d: "For each product, identify the harms a customer could foreseeably suffer and record which of those harms would show up as a fair value failure.",
  },
  {
    t: "Identify customer groups and segments",
    d: "Analyse customers with characteristics of vulnerability explicitly, together with any differential pricing applied between groups.",
  },
  {
    t: "Conduct the fair value assessment",
    d: "Cover the nature and benefits of the product; the expected total price including all fees and charges; contextual factors including benchmarking and cost-to-serve; and limitations together with non-financial costs and benefits.",
  },
  {
    t: "Assess whether each customer group receives fair value",
    d: "Test the conclusion group by group rather than in aggregate, and examine the full distribution of outcomes, not the average.",
  },
  {
    t: "Identify cross-subsidies and justify fairness across groups",
    d: "Where one group's pricing supports another, state the cross-subsidy openly and explain why it remains fair to both.",
  },
  {
    t: "Document governance challenge and sign-off",
    d: "Record the questions asked by the committee or board, the responses given, and the basis on which the assessment was approved.",
  },
  {
    t: "Feed findings into the board report",
    d: "Carry the conclusions, the evidence behind them and any unresolved risks into the annual board report and attestation evidence pack.",
  },
  {
    t: "Schedule the next review",
    d: "Set the review date at a frequency appropriate to the nature and duration of the product - annually, or sooner where the product is significantly adapted.",
  },
  {
    t: "Track remediation actions and monitor effectiveness",
    d: "Each action carries an owner, a timescale, a success measure, and the data that will show the fair value issue has actually been resolved.",
  },
];

const successCriteria = [
  "Target markets are clearly defined at an appropriate level of granularity, including who the product is not for.",
  "Fair value is assessed holistically and integrated with the other three Consumer Duty outcomes.",
  "Differential outcomes and vulnerable customer impacts are explicitly analysed, not assumed.",
  "Conclusions are evidence-based rather than asserted, with the supporting data identified.",
  "Governance records show genuine senior challenge to the assessment and its conclusions.",
  "Remediation actions are clear, specific, owned and monitored through to effectiveness.",
  "A documented review schedule is in place, proportionate to the nature and duration of each product.",
];

const pitfalls = [
  {
    title: "Overly broad target markets",
    description: "The target market is defined so widely that almost any retail customer falls inside it, so the assessment cannot show who the product genuinely works for.",
    impact: "Groups for whom the product delivers poor value stay invisible, and distributors cannot target the product properly.",
    prevention: "Define the market at a granularity that lets you say who does and does not benefit, and test the definition against actual customer holdings.",
  },
  {
    title: "Process metrics mistaken for outcomes",
    description: "The firm records that a value assessment was completed on schedule and treats that completion as evidence that customers received fair value.",
    impact: "Completing a review says nothing about the value the customer actually received. The FCA has repeatedly warned against this substitution.",
    prevention: "Report outcome measures - what customers paid, what they received, and how that varied by group - alongside any completion tracking.",
  },
  {
    title: "Repackaged data",
    description: "Existing management or pricing data is re-presented as a fair value assessment without being reworked around the questions the rules ask.",
    impact: "The FCA has already warned that repackaging existing data is insufficient to evidence fair value.",
    prevention: "Start from the harms and the value questions, then identify the data needed. Commission new data where the existing set cannot answer the question.",
  },
  {
    title: "No vulnerability analysis",
    description: "The assessment contains no separate view of customers with characteristics of vulnerability or the value they receive.",
    impact: "Poorer value for vulnerable customers is concealed in the overall result, and the firm cannot evidence the cross-cutting obligations.",
    prevention: "Build a vulnerability impact section into every assessment, with data on price paid, benefits used and outcomes achieved by those customers.",
  },
  {
    title: "Relying on averages without examining the full distribution",
    description: "Value is judged on mean price and mean benefit, so tails of the distribution where customers pay far more or use far less are never examined.",
    impact: "The FCA identified reliance on average outcomes as a significant weakness in firms' frameworks.",
    prevention: "Report the distribution - deciles, outliers, and the worst-served groups - and explain the value position at the tails, not just the centre.",
  },
  {
    title: "Benchmarking against an unrepresentative subset",
    description: "Comparators are chosen from a narrow or convenient set of products that do not reflect the market the customer could realistically access.",
    impact: "The benchmark flatters the product and the conclusion of fair value rests on a false comparison.",
    prevention: "Document the comparator selection rationale, include the context in which comparators differ, and refresh the set at each review.",
  },
  {
    title: "Lack of evidence for claims",
    description: "The framework asserts at a high level that the business model is inherently fair value, without producing evidence for the assertion.",
    impact: "The FCA specifically criticised high-level or unevidenced arguments of this kind.",
    prevention: "Attach evidence to every claim. If evidence does not yet exist, record the gap and the plan to close it rather than asserting the conclusion.",
  },
  {
    title: "No data plan for identified gaps",
    description: "Data limitations are acknowledged in the assessment but no plan exists to obtain the missing information.",
    impact: "The same gap recurs at the next review and the firm cannot demonstrate continual improvement.",
    prevention: "Maintain a data plan naming each gap, the owner, the source to be developed and the date by which the next assessment will be better evidenced.",
  },
  {
    title: "Unclear cost allocation",
    description: "Cost-to-serve and distribution costs are allocated across products or groups without a documented, defensible basis.",
    impact: "Cross-subsidies cannot be identified or justified, and the price build-up cannot be explained to the board or the regulator.",
    prevention: "Document the allocation methodology, state its assumptions, and show the resulting cross-subsidies explicitly with a fairness justification.",
  },
  {
    title: "Weak governance challenge",
    description: "Assessments are approved without recorded questions, and rating systems - points-based or RAG - are accepted without scrutiny of the thresholds behind them.",
    impact: "The FCA found rating systems often gave insufficient weight to critical analysis of thresholds and evidence limitations.",
    prevention: "Minute the challenge, require the thresholds and their rationale to be presented alongside each rating, and allow assessments to be sent back.",
  },
  {
    title: "Vague or unmonitored remediation actions",
    description: "Fair value issues are identified but the resulting actions have no owner, no date and no measure of whether customer value improved.",
    impact: "Identified harm persists between reviews and the firm cannot evidence that it took prompt, effective action.",
    prevention: "Give each action an owner, a timescale and a success measure, and report progress at every governance meeting until it is closed.",
  },
];

export default function OC3FairValueAssessment() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
    toast.success("Print dialogue opened");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">Ongoing Compliance</Badge>
                <Badge variant="secondary">Annual cycle</Badge>
              </div>
              <h1 className="text-3xl font-bold">OC-3: Annual Fair Value Assessment &amp; Monitoring</h1>
              <p className="text-muted-foreground mt-1">
                Assess, evidence and remediate fair value as a recurring obligation
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Module
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="success">Success Criteria</TabsTrigger>
          <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Purpose
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-foreground">
                This module helps firms conduct annual fair value assessments of all products and services, identify and
                remediate fair value risks, and evidence fair value in the annual board report and attestation.
              </p>
              <p className="text-muted-foreground">
                Fair value is a standing obligation, not an implementation project. Assessments recur, conclusions are
                challenged, actions are tracked, and the cycle begins again with better evidence than the year before.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                Review frequency
              </CardTitle>
              <CardDescription>PRIN 2A.4.3R</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                Review frequency must be appropriate to the nature and duration of the product. A simple, short-duration
                product may need less frequent review than a long-term product whose value depends on how customer
                circumstances change over many years.
              </p>
              <p className="text-muted-foreground">
                An annual cycle is the working default, brought forward whenever a product is significantly adapted, its
                pricing changes, or monitoring shows the value position has moved.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regulatory */}
        <TabsContent value="regulatory" className="space-y-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-primary" />
                Primary basis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">PRIN 2A.4 (fair value outcome) and Chapter 7 of FG22/5.</p>
              <div>
                <p className="font-semibold text-foreground">The fundamental requirement</p>
                <p className="text-muted-foreground">
                  Firms must assess and regularly review whether their products provide fair value to retail customers in
                  the target markets for those products. Fair value means the amount paid is reasonable compared to the
                  overall benefits customers receive. Regular review is a standing obligation, not a one-time task.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                What the FCA found matters most
              </CardTitle>
              <CardDescription>
                FCA review of 14 firms' fair value frameworks, May 2023, remains current guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                The FCA assessed frameworks against five criteria. Many firms made substantial efforts, but the FCA
                identified four key areas for improvement.
              </p>
              <p>
                Firms were often relying on high-level or unevidenced arguments that their business models are inherently
                fair value, without providing evidence. Some failed to distinguish between manufacturers and distributors
                or to consider fair value across distribution chains.
              </p>
              <p>
                Many did not give sufficient thought to broader contextual factors or the fairness of pricing structures
                beyond whether financial value was positive. A significant weakness was reliance on average outcomes
                rather than analysis of the full distribution of outcomes across customer groups, especially vulnerable
                customers.
              </p>
              <p>
                Some frameworks lacked clear data plans or failed to explain how gaps would be addressed. Rating systems
                (points-based or RAG) often lacked sufficient weight to critical analysis of thresholds and evidence
                limitations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                The ongoing compliance reality
              </CardTitle>
              <CardDescription>
                FCA Price and Value Outcome good and poor practice, September 2024, updated December 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Fair value assessments should be holistic and integrated with other Consumer Duty outcomes. Firms should
                exercise judgment on how to ensure fair value to customers, seeking continual improvement rather than
                static compliance. Particular attention is required to:
              </p>
              <ul className="space-y-2">
                {[
                  "identifying target markets at appropriate granularity (avoiding overly broad definitions);",
                  "assessing differential outcomes and vulnerable customer impacts explicitly;",
                  "benchmarking against comparable products with appropriate context;",
                  "assessing actual customer use patterns not just compliance metrics;",
                  "taking prompt, specific, monitored actions when fair value issues are identified.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Recent sector findings
              </CardTitle>
              <CardDescription>
                CFD providers November 2025, smaller mutual life insurers January 2026, general insurance multi-firm
                reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Firms continue to struggle with fair value frameworks that are outcome-focused rather than
                compliance-focused. The latest FCA supervisory work confirms the five key areas for improvement remain
                live issues across sectors.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Implementation */}
        <TabsContent value="implementation" className="space-y-6">
          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-accent" />
                The recurring fair value cycle: ten steps
              </CardTitle>
              <CardDescription>
                Run this cycle for every product at a frequency appropriate to its nature and duration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {cycleSteps.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{s.t}</p>
                      <p className="text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Fair value toolkit
              </CardTitle>
              <CardDescription>Five tools covering the annual assessment end to end.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TemplateCard
                  title="Target Market Definition worksheet"
                  description="Structured worksheet for defining the target market at appropriate granularity, recording who the product is for, who it is not for, and the evidence behind both."
                  format="Word"
                  complexity="Quick Start"
                  onDownload={() => toast.success("Template download started")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
                <TemplateCard
                  title="Fair Value Assessment template"
                  description="Five-section assessment covering overview, value factors, differential outcomes, governance and action plan, with space for the evidence supporting each conclusion."
                  format="Word"
                  complexity="Advanced"
                  onDownload={() => toast.success("Template download started")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
                <TemplateCard
                  title="Vulnerability Impact Assessment"
                  description="Analysis of value delivered to customers with characteristics of vulnerability, including price paid, benefits used and outcomes achieved compared with other groups."
                  format="Excel"
                  complexity="Intermediate"
                  onDownload={() => toast.success("Template download started")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
                <TemplateCard
                  title="Benchmarking &amp; Comparator Analysis"
                  description="Comparator selection rationale, price and benefit comparison, and the contextual factors that explain differences between the product and its comparators."
                  format="Excel"
                  complexity="Intermediate"
                  onDownload={() => toast.success("Template download started")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
                <TemplateCard
                  title="Fair Value Annual Review Tracker"
                  description="Register of every product, its review frequency, last and next assessment dates, conclusions reached, and open remediation actions with owners and timescales."
                  format="Excel"
                  complexity="Quick Start"
                  onDownload={() => toast.success("Template download started")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Success criteria */}
        <TabsContent value="success" className="space-y-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Success criteria
              </CardTitle>
              <CardDescription>Apply these before an assessment is signed off.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {successCriteria.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pitfalls */}
        <TabsContent value="pitfalls" className="space-y-6">
          <div className="grid gap-6">
            {pitfalls.map((p) => (
              <PitfallCard
                key={p.title}
                title={p.title}
                description={p.description}
                impact={p.impact}
                prevention={p.prevention}
              />
            ))}
          </div>
        </TabsContent>
              {/* TAB: NOTES */}
        <TabsContent value="notes" className="space-y-6">
          <NotesTab moduleId={NOTES_KEY} />
        </TabsContent>

</Tabs>
    </div>
  );
}
