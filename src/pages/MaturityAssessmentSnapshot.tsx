import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Plus } from "lucide-react";
import {
  MATURITY_CATEGORIES,
  TARGET_SCORE,
  useMaturitySnapshots,
} from "@/hooks/useMaturitySnapshots";
import NewAssessmentModal from "@/components/maturity/NewAssessmentModal";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function MaturityAssessmentSnapshot() {
  const { latest, loading, error, createSnapshot } = useMaturitySnapshots();
  const [modalOpen, setModalOpen] = useState(false);

  const chartData = latest
    ? MATURITY_CATEGORIES.map(({ key, label }) => ({
        category: label,
        current: Number((latest as unknown as Record<string, number>)[`score_${key}`]),
        target: TARGET_SCORE,
      }))
    : [];

  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl space-y-6">
      <Button variant="ghost" asChild className="-ml-4">
        <Link to="/foundation/readiness">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to CD-F1 Readiness Assessment
        </Link>
      </Button>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-2">Maturity Assessment</h1>
          <p className="text-muted-foreground">
            Your current Consumer Duty maturity across six categories, compared
            with a target benchmark of {TARGET_SCORE}.0 out of 5.0.
          </p>
          {latest && (
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: {formatDate(latest.created_at)}
            </p>
          )}
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {loading ? (
        <Card className="py-12 text-center text-muted-foreground">
          Loading assessment…
        </Card>
      ) : error ? (
        <Card className="py-12 text-center text-destructive">{error}</Card>
      ) : !latest ? (
        <Card className="py-12 text-center text-muted-foreground">
          No assessment yet. Click “New Assessment” to begin.
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Current maturity versus target</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto w-full max-w-xl h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData} outerRadius="70%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6} />
                    <Radar
                      name="Current score"
                      dataKey="current"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.25}
                    />
                    <Radar
                      name={`Target (${TARGET_SCORE}.0)`}
                      dataKey="target"
                      stroke="#6b7280"
                      strokeWidth={2}
                      strokeDasharray="5 4"
                      fill="none"

                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category detail</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/60">
                    <TableHead>Category</TableHead>
                    <TableHead className="w-24">Score</TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MATURITY_CATEGORIES.map(({ key, label }, index) => {
                    const row = latest as unknown as Record<string, unknown>;
                    return (
                      <TableRow
                        key={key}
                        className={index % 2 === 1 ? "bg-muted/30" : undefined}
                      >
                        <TableCell className="font-medium">{label}</TableCell>
                        <TableCell>{String(row[`score_${key}`])} / 5</TableCell>
                        <TableCell className="text-muted-foreground">
                          {(row[`comments_${key}`] as string | null) || "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      <NewAssessmentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={createSnapshot}
      />
    </div>
  );
}
