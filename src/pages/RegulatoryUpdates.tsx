import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  regulatoryUpdates,
  RegulatoryUpdateStatus,
} from "@/data/regulatoryUpdatesData";

type StatusFilter = "All" | RegulatoryUpdateStatus;

const STATUS_FILTERS: StatusFilter[] = ["All", "Finalised", "Consultation", "Interim", "Fact"];

function StatusBadge({ status }: { status: RegulatoryUpdateStatus }) {
  if (status === "Consultation") {
    return (
      <Badge className="border-transparent bg-warning text-warning-foreground hover:bg-warning/90">
        Consultation
      </Badge>
    );
  }
  if (status === "Interim") return <Badge variant="secondary">Interim</Badge>;
  if (status === "Fact") return <Badge variant="outline">Fact</Badge>;
  return <Badge>Finalised</Badge>;
}

export default function RegulatoryUpdates() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const visibleUpdates = useMemo(
    () =>
      statusFilter === "All"
        ? regulatoryUpdates
        : regulatoryUpdates.filter((u) => u.status === statusFilter),
    [statusFilter],
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <CalendarClock className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Regulatory Updates</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Key FCA Consumer Duty developments since November 2025. This tracker summarises finalised
          guidance, reviews and live consultations. Consultation items are proposals, not current rules.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2026</p>
      </header>

      <div
        className="mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter updates by status"
      >
        {STATUS_FILTERS.map((option) => (
          <Button
            key={option}
            type="button"
            size="sm"
            variant={statusFilter === option ? "default" : "outline"}
            aria-pressed={statusFilter === option}
            onClick={() => setStatusFilter(option)}
            className={cn("min-h-[44px]")}
          >
            {option}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {visibleUpdates.map((update) => (
          <Card key={update.id}>
            <CardHeader className="pb-3">
              <p className="text-sm font-medium text-muted-foreground">{update.date}</p>
              <CardTitle className="text-xl leading-snug">{update.title}</CardTitle>
              <div className="pt-1">
                <StatusBadge status={update.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-foreground">
              <p>{update.summary}</p>
              <p>
                <span className="font-semibold">What it means:</span> {update.implication}
              </p>
              <p>
                <span className="font-semibold">Relates to:</span> {update.relatesTo}
              </p>
              <p className="text-sm text-muted-foreground">Source: {update.source}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
