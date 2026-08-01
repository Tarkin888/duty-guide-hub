import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Printer,
  MessageSquare,
  Target,
  Gavel,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ClipboardList,
  Users,
  Scale,
} from "lucide-react";
import { TemplateCard } from "@/components/modules/TemplateCard";
import { PitfallCard } from "@/components/modules/PitfallCard";
import { toast } from "sonner";

const cycleSteps = [
  {
    t: "Identify high-impact communications to prioritise for testing",
    d: "Start with the communications where misunderstanding causes the most harm - arrears letters, renewal notices, key product terms, fee and charge disclosures, and anything sent at a moment of financial stress.",
  },
  {
    t: "Select proportionate testing methods",
    d: "Choose from comprehension checks, A/B testing, post-sale callbacks and short surveys. The method should fit the size of the firm and the risk of the communication, not the size of the budget.",
  },
  {
    t: "Define a comprehension target before testing",
    d: "Set the standard first - for example, at least 80% correct recall of the key points - so the result can be judged against a stated benchmark rather than interpreted after the fact.",
  },
  {
    t: "Test with a representative sample",
    d: "Include customers with characteristics of vulnerability, lower financial capability, accessibility needs and language requirements. A general-population sample cannot answer whether those groups understood.",
  },
  {
    t: "Document what was tested, what was found, and what changed",
    d: "Record the communication, the method, the sample, the comprehension result, the decision taken and the rationale. Undocumented testing cannot be evidenced to the board or the regulator.",
  },
  {
    t: "Retest after changes to confirm improvement",
    d: "A change is not an improvement until it has been measured. Retest against the same comprehension target and record the measured impact.",
  },
  {
    t: "Feed results into MI segmented by customer group",
    d: "Report comprehension by group - vulnerable customers, lower financial capability, accessibility needs - rather than a blended average that conceals where understanding is weakest.",
  },
  {
    t: "Escalate weak results through governance with named ownership",
    d: "Where a communication fails the comprehension target, escalate it with a named owner, a remediation action and a date, and track it until the retest passes.",
  },
  {
    t: "Repeat on a recurring cycle, prioritised by risk and customer impact",
    d: "Maintain a rolling testing plan so the highest-risk communications are revisited regularly and the coverage of the estate improves year on year.",
  },
];

const successCriteria = [
  "The testing plan covers the firm's high-impact communications, prioritised by risk and customer impact.",
  "Testing methods are proportionate to firm size and are documented, not improvised.",
  "Testing includes vulnerable and lower-capability customer groups, not just the general population.",
  "Results are segmented by customer group rather than reported as blended averages.",
  "A comprehension target is set in advance and measured against.",
  "Changes are retested to confirm the measured impact on understanding.",
  "Governance shows named ownership of the consumer understanding outcome and evidence-based decisions.",
];

const pitfalls = [
  {
    title: "Relying on sales data or absence of complaints as evidence of understanding",
    description: "The firm points to strong sales volumes or a low complaint count as proof that customers understood the product or the communication.",
    impact: "The FCA stated plainly that this does not provide reliable assurance, regardless of firm size. Customers who do not understand a product often do not complain about it.",
    prevention: "Evidence understanding directly through comprehension testing. Treat sales and complaints data as supporting context, never as the primary proof.",
  },
  {
    title: "One-off or undocumented testing",
    description: "Testing was carried out once, or was carried out but leaves little record of the method, the sample, the result or the decision that followed.",
    impact: "The FCA found firms claiming to have tested communications but providing little evidence, with testing that was superficial, one-off or poorly documented.",
    prevention: "Run testing on a recurring cycle and keep a results and action log recording what was tested, what was found and what changed.",
  },
  {
    title: "Cosmetic changes mistaken for improved clarity",
    description: "Text is shortened, icons are added or the layout is refreshed, and the change is recorded as an improvement to consumer understanding.",
    impact: "Presentation changes without measurement can leave comprehension unchanged or worse, while the firm believes the issue is resolved.",
    prevention: "Prioritise meaningful improvements over cosmetic ones and require a measured comprehension result before any change is treated as an improvement.",
  },
  {
    title: "Testing the general population only",
    description: "Samples are drawn from the general customer base with no deliberate inclusion of customers with accessibility needs, language requirements or lower financial capability.",
    impact: "The FCA found it was unclear at these firms whether changes actually supported those groups, and the cross-cutting vulnerability obligations cannot be evidenced.",
    prevention: "Set an explicit quota for those cohorts in every test and record their results separately using the vulnerable cohort testing checklist.",
  },
  {
    title: "MI presented as blended averages",
    description: "Comprehension results are reported to governance as a single overall figure across the whole customer base.",
    impact: "The FCA found MI presented as overall averages concealed how different customer groups, including vulnerable customers, actually understood communications.",
    prevention: "Segment every comprehension measure by customer group and show the weakest-performing group alongside the overall figure.",
  },
  {
    title: "No follow-up to confirm changes worked",
    description: "A communication is redrafted in response to a poor result, and the matter is closed without a retest.",
    impact: "The FCA found changes were sometimes made with no follow-up and no record of what changed, why, or the impact.",
    prevention: "Make a retest a mandatory closing step for every remediation action, measured against the original comprehension target.",
  },
  {
    title: "Unclear accountability for the consumer understanding outcome",
    description: "No named senior individual owns the outcome, so monitoring is produced but not acted on and the feedback loop breaks.",
    impact: "The FCA found unclear accountability and weak feedback loops where monitoring was not fed back into action.",
    prevention: "Name a senior owner for the outcome, give them a structured MI review with tracked actions, and minute the decisions and their evidence base.",
  },
];

export default function OC4OutcomesTesting() {
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
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">Ongoing Compliance</Badge>
                <Badge variant="secondary">Recurring cycle</Badge>
              </div>
              <h1 className="text-3xl font-bold">OC-4: Outcomes Testing &amp; Consumer Understanding</h1>
              <p className="text-muted-foreground mt-1">
                Test, evidence and improve whether customers actually understand
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
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="success">Success Criteria</TabsTrigger>
          <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
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
                This module helps firms design, run and evidence communication testing, so they can show comprehension
                rather than completion, and feed the results into MI and the annual board report.
              </p>
              <p className="text-muted-foreground">
                Testing whether customers understand is a recurring discipline, not a one-off implementation task.
                Communications change, products change and customer circumstances change, so the question of whether
                people actually understood has to be asked again each cycle.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                Comprehension, not completion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                Recording that a communication was reviewed, redrafted or issued says nothing about whether the customer
                understood it. The evidence the FCA expects is a measured comprehension result, segmented by customer
                group, with a record of what changed as a consequence.
              </p>
              <p className="text-muted-foreground">
                Results belong in the firm's MI and in the annual board report, showing not only the overall picture but
                where understanding is weakest and what is being done about it.
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
              <p className="text-foreground">PRIN 2A.5 (consumer understanding outcome) and Chapter 8 of FG22/5.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Source and evidence base
              </CardTitle>
              <CardDescription>
                FCA, Consumer understanding: good practice and areas for improvement, published 13 March 2026
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                This review combined supervisory findings, a September 2025 survey of 38 firms across insurance, retail
                banking, payments, consumer finance and CFD providers, and the 2024 Financial Lives Survey, which found
                12% of adults (around 6.3 million) have limited understanding of the products they hold, and 19% (10.3
                million) have low confidence with everyday numeracy.
              </p>
              <p>
                The FCA assessed firms across five areas: management information and testing; innovation and
                communications design; vulnerability and accessibility; financial promotions; governance and oversight.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                What good testing looks like
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Firms analyse insight from multiple sources - call listening, complaints, chat transcripts, website
                analytics, drop-off data and surveys - reviewed regularly, prioritising meaningful improvements over
                cosmetic changes.
              </p>
              <p>
                Firms test communications both before and after changes, using proportionate tools such as short surveys,
                comprehension checks, A/B testing and customer callbacks, documenting what changed, why, and the measured
                impact.
              </p>
              <p>
                Testing must extend to customers with accessibility needs, language requirements and lower financial
                capability, not just the general population. One firm set an internal target of at least 80% correct
                recall of key points and retested until communications met it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                What the FCA found needs improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Some firms claimed to have tested communications but provided little evidence, with testing that was
                superficial, one-off or poorly documented.
              </p>
              <p>
                Several firms continued to rely on sales data or the absence of complaints as evidence that customers
                understood their products - the FCA stated this does not provide reliable assurance, regardless of firm
                size.
              </p>
              <p>
                Some firms did not test with people who have accessibility needs, language requirements or lower
                financial capability, leaving it unclear whether changes actually supported those groups.
              </p>
              <p>
                Changes were sometimes made without any follow-up to check whether they worked, with no record of what
                changed, why, or the impact.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                On governance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Good practice means clear senior ownership of the consumer understanding outcome, with structured review
                of MI, tracked actions, and decisions grounded in evidence rather than assumption.
              </p>
              <p>
                The FCA found unclear accountability at some firms, weak feedback loops where monitoring was not fed back
                into action, and MI presented as overall averages that concealed how different customer groups, including
                vulnerable customers, actually understood communications.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-accent" />
                Proportionality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The FCA is explicit that testing should be proportionate to firm size. Smaller firms can run simple,
                low-cost testing - for example, phoning a handful of recent customers and asking them to read back key
                policy terms - and this is treated as good practice provided it is done, evidenced and acted on.
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
                The recurring testing cycle: nine steps
              </CardTitle>
              <CardDescription>
                Run this cycle continuously, prioritised by the risk and customer impact of each communication.
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
                Consumer understanding testing toolkit
              </CardTitle>
              <CardDescription>Four tools covering the testing cycle end to end.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TemplateCard
                  title="Communication Testing Protocol"
                  description="Sets out the testing methods, sample size, comprehension target and before-and-after design for each communication in the testing plan."
                  format="Word"
                  complexity="Intermediate"
                  onDownload={() => toast.success("Template download started")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
                <TemplateCard
                  title="Comprehension Test Script"
                  description="Post-sale callback and comprehension check format, with the key points customers should be able to recall and how to score the responses consistently."
                  format="Word"
                  complexity="Quick Start"
                  onDownload={() => toast.success("Template download started")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
                <TemplateCard
                  title="Testing Results &amp; Action Log"
                  description="Record of what was tested, the comprehension result by customer group, the change made, the rationale and the retest outcome."
                  format="Excel"
                  complexity="Quick Start"
                  onDownload={() => toast.success("Template download started")}
                  onPreview={() => toast.info("Preview functionality coming soon")}
                />
                <TemplateCard
                  title="Vulnerable Cohort Testing Checklist"
                  description="Checklist ensuring each test includes customers with characteristics of vulnerability, accessibility needs, language requirements and lower financial capability."
                  format="Word"
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
              <CardDescription>Apply these before testing results are reported as assurance.</CardDescription>
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
      </Tabs>
    </div>
  );
}
