import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RefreshCw, BarChart3, Database, TestTube, PresentationIcon, ShieldCheck, ArrowRight } from "lucide-react";

interface CycleStage {
  title: string;
  cadence: string;
  description: string;
  icon: typeof BarChart3;
  url: string;
}

const stages: CycleStage[] = [
  {
    title: "Monitor",
    cadence: "Monthly",
    description: "Track outcome MI and key indicators across all four outcomes.",
    icon: BarChart3,
    url: "/monitoring/mi-monitoring",
  },
  {
    title: "Gather evidence",
    cadence: "Continuous",
    description: "Capture contemporaneous evidence as decisions are made, not after.",
    icon: Database,
    url: "/cross-cutting/data-evidence",
  },
  {
    title: "Assess outcomes",
    cadence: "Quarterly",
    description: "Test whether customers, including vulnerable customers, get good outcomes.",
    icon: TestTube,
    url: "/monitoring/testing-assurance",
  },
  {
    title: "Report to board",
    cadence: "At least annually",
    description: "Produce the Consumer Duty board report with data, gaps and actions.",
    icon: PresentationIcon,
    url: "/monitoring/board-reporting",
  },
  {
    title: "Attest",
    cadence: "Annually",
    description: "Board approves the assessment and confirms the firm is delivering good outcomes.",
    icon: ShieldCheck,
    url: "/governance/framework",
  },
];

export function AnnualAttestationCycle() {
  return (
    <Card className="border-accent/30">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <RefreshCw className="h-5 w-5 text-accent" />
              Annual Attestation Cycle
            </CardTitle>
            <CardDescription>
              Consumer Duty is business-as-usual. This is the rhythm you repeat every year, ending in the
              board attestation.
            </CardDescription>
          </div>
          <Badge variant="outline" className="shrink-0 self-start">Repeats every year</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {stages.map((stage, index) => (
            <li key={stage.title} className="h-full">
              <Link
                to={stage.url}
                className="group flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <stage.icon className="h-4 w-4 text-accent" />
                  <span className="font-semibold">{stage.title}</span>
                </div>
                <Badge variant="secondary" className="w-fit text-xs">{stage.cadence}</Badge>
                <p className="text-sm text-muted-foreground">{stage.description}</p>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/monitoring/board-reporting">
              Prepare the board report
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/monitoring/continuous-improvement">Continuous improvement</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnnualAttestationCycle;
