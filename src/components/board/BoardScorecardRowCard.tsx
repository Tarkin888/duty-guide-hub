import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, ExternalLink, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BOARD_RATINGS,
  BoardRating,
  BoardScorecardRow,
  RATING_BY_VALUE,
} from '@/config/boardSummaryConfig';
import { useModuleProgressSummary } from '@/stores/progressStore';
import { getModuleDisplayName } from '@/config/moduleRegistry';
import type { BoardNote, BoardRatingRow } from '@/hooks/useBoardSummary';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const RatingBadge = ({ rating }: { rating?: BoardRating }) => {
  if (!rating) {
    return (
      <Badge variant="outline" className="border-dashed text-muted-foreground">
        Not yet rated
      </Badge>
    );
  }
  const meta = RATING_BY_VALUE[rating];
  return (
    <Badge variant="outline" className={`gap-2 ${meta.badgeClass}`}>
      <span className={`h-2 w-2 rounded-full ${meta.dotClass}`} aria-hidden="true" />
      {meta.label}
    </Badge>
  );
};

const ModuleEvidence = ({ code }: { code: string }) => {
  const summary = useModuleProgressSummary(code);
  const known = summary.totalItems > 0;

  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">
          {code} — {getModuleDisplayName(code)}
        </span>
        {known ? (
          <span className="text-sm text-muted-foreground">
            {summary.checkedItems} of {summary.totalItems} items ticked
            {summary.isMarkedComplete ? ' · marked complete' : ''}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">Not connected</span>
        )}
      </div>
      {known ? (
        <Progress value={summary.percentComplete} className="mt-2 h-2" />
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          No checklist data source is wired for this module, so no completion figure is shown.
        </p>
      )}
    </div>
  );
};

interface Props {
  row: BoardScorecardRow;
  ratingRow?: BoardRatingRow;
  notes: BoardNote[];
  notesAvailable: boolean;
  saving: boolean;
  onSave: (rowKey: string, rating: BoardRating, rationale: string) => void;
}

export const BoardScorecardRowCard = ({
  row,
  ratingRow,
  notes,
  notesAvailable,
  saving,
  onSave,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState<BoardRating | undefined>(ratingRow?.rating);
  const [rationale, setRationale] = useState(ratingRow?.rationale ?? '');

  useEffect(() => {
    setRating(ratingRow?.rating);
    setRationale(ratingRow?.rationale ?? '');
  }, [ratingRow?.rating, ratingRow?.rationale]);

  const dirty =
    rating !== ratingRow?.rating || rationale !== (ratingRow?.rationale ?? '');

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{row.title}</h3>
            <RatingBadge rating={ratingRow?.rating} />
            {ratingRow?.is_demo && (
              <Badge variant="outline" className="border-[#f59e0b] text-[#b45309]">
                Demo data
              </Badge>
            )}
          </div>
          <p className="mt-1 text-base text-muted-foreground">{row.summary}</p>
          {ratingRow && (
            <p className="mt-1 text-sm text-muted-foreground">
              Rated by you · last updated {formatDate(ratingRow.updated_at)}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="min-h-[44px] shrink-0"
        >
          {expanded ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
          {expanded ? 'Hide evidence' : 'Rate & view evidence'}
        </Button>
      </div>

      {expanded && (
        <div className="space-y-5 border-t border-border p-4">
          <div className="grid gap-4 md:grid-cols-[280px_1fr]">
            <div>
              <Label htmlFor={`rating-${row.key}`} className="text-sm font-semibold">
                Board rating (set by you)
              </Label>
              <Select
                value={rating}
                onValueChange={(value) => setRating(value as BoardRating)}
              >
                <SelectTrigger id={`rating-${row.key}`} className="mt-2 min-h-[44px]">
                  <SelectValue placeholder="Choose a rating" />
                </SelectTrigger>
                <SelectContent>
                  {BOARD_RATINGS.map((meta) => (
                    <SelectItem key={meta.value} value={meta.value}>
                      {meta.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {rating && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {RATING_BY_VALUE[rating].description}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor={`rationale-${row.key}`} className="text-sm font-semibold">
                Rationale — why you can stand behind this rating
              </Label>
              <Textarea
                id={`rationale-${row.key}`}
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                rows={4}
                className="mt-2 text-base"
                placeholder="Set out the evidence you have seen and any caveats."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => rating && onSave(row.key, rating, rationale)}
              disabled={!rating || !dirty || saving}
              className="min-h-[44px] bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90"
            >
              Save rating
            </Button>
            {!rating && (
              <span className="text-sm text-muted-foreground">
                Ratings are never calculated from completion percentages.
              </span>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Module evidence (read-only context)
            </h4>
            <div className="mt-2 space-y-2">
              {row.moduleCodes.map((code) => (
                <ModuleEvidence key={code} code={code} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <StickyNote className="h-4 w-4" aria-hidden="true" /> Related notes
            </h4>
            {!notesAvailable ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Notes are not connected, so none are shown here.
              </p>
            ) : notes.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No notes recorded on the source module(s) for this area.
              </p>
            ) : (
              <ul className="mt-2 space-y-2">
                {notes.slice(0, 5).map((note) => (
                  <li key={note.id} className="rounded-md border border-border bg-background p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium uppercase text-muted-foreground">
                        {note.module_id}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(note.updated_at)}
                      </span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-base text-foreground">
                      {note.content || note.title}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {row.links.map((link) => (
              <Button key={link.url} asChild variant="link" className="h-auto p-0 text-[#1e3a8a]">
                <Link to={link.url}>
                  {link.label}
                  <ExternalLink className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
