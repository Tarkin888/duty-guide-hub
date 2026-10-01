import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BoardPaperDetail = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState<{ title: string; firm_name: string | null; reporting_period: string | null } | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");

  useEffect(() => {
    if (!id) return;
    supabase
      .from("board_papers")
      .select("title,firm_name,reporting_period")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setPaper(data);
        setState(data ? "ok" : "missing");
      });
  }, [id]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <Button asChild variant="outline" className="min-h-[44px]">
        <Link to="/board-papers"><ArrowLeft className="mr-2 h-4 w-4" aria-hidden />Back to Board Papers</Link>
      </Button>
      {state === "loading" ? (
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" />
      ) : state === "missing" ? (
        <p className="text-base text-destructive" role="alert">This board paper could not be found.</p>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{paper!.title}</h1>
            <p className="text-base text-muted-foreground">
              {[paper!.firm_name, paper!.reporting_period].filter(Boolean).join(" · ")}
            </p>
          </div>
          <Card>
            <CardContent className="py-8 text-base text-muted-foreground">
              The board paper editor is coming in the next phase.
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default BoardPaperDetail;
