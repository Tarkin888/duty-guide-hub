import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  Compass,
  Loader2,
  Plus,
  Stamp,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  BOARD_SCORECARD_ROWS,
  BoardAction,
  BoardVerdict,
  RATING_BY_VALUE,
  VERDICT_OPTIONS,
} from '@/config/boardSummaryConfig';
import { useBoardSummary } from '@/hooks/useBoardSummary';
import { BoardScorecardRowCard, RatingBadge } from '@/components/board/BoardScorecardRowCard';
import { resetBoardSummary, seedDemoBoardSummary } from '@/lib/boardSummaryDemo';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const newActionId = () =>
  `action-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const BoardSummary = () => {
  const {
    userId,
    loading,
    saving,
    ratings,
    report,
    snapshots,
    notesAvailable,
    notesForPrefixes,
    rollUp,
    isDemo,
    saveRating,
    saveReport,
    issueToBoard,
    reload,
  } = useBoardSummary();

  const [verdict, setVerdict] = useState<BoardVerdict>(report.verdict);
  const [narrative, setNarrative] = useState(report.verdict_narrative);
  const [differential, setDifferential] = useState(report.differential_outcomes);
  const [forwardLook, setForwardLook] = useState(report.forward_look);
  const [actions, setActions] = useState<BoardAction[]>(report.actions);
  const [approverName, setApproverName] = useState(report.approver_name);
  const [approverRole, setApproverRole] = useState(report.approver_role);
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [signoffDate, setSignoffDate] = useState(report.signoff_date ?? todayIso);
  const [demoBusy, setDemoBusy] = useState(false);

  useEffect(() => {
    setVerdict(report.verdict);
    setNarrative(report.verdict_narrative);
    setDifferential(report.differential_outcomes);
    setForwardLook(report.forward_look);
    setActions(report.actions);
    setApproverName(report.approver_name);
    setApproverRole(report.approver_role);
    setSignoffDate(report.signoff_date ?? todayIso);
  }, [report, todayIso]);

  const draftVerdictSentence = useMemo(() => {
    const { red, amber, green, unrated } = rollUp;
    const parts = [
      `${green} of ${rollUp.total} areas are rated established or advanced`,
      `${amber} developing`,
      `${red} nascent`,
    ];
    const tail = unrated > 0 ? `, with ${unrated} not yet rated` : '';
    return `Based on the Board's own ratings, ${parts.join(', ')}${tail}. `;
  }, [rollUp]);

  const gapRows = useMemo(
    () =>
      BOARD_SCORECARD_ROWS.filter((row) => {
        const rating = ratings[row.key]?.rating;
        return rating === 'nascent' || rating === 'developing';
      }),
    [ratings],
  );

  const differentialSeed = useMemo(() => {
    const cdI5Notes = notesForPrefixes(['cd-i5']);
    if (cdI5Notes.length === 0) return null;
    return cdI5Notes
      .slice(0, 3)
      .map((note) => note.content || note.title)
      .join('\n\n');
  }, [notesForPrefixes]);

  const handleSaveReport = useCallback(() => {
    void saveReport({
      verdict,
      verdict_narrative: narrative,
      differential_outcomes: differential,
      forward_look: forwardLook,
      actions,
      approver_name: approverName,
      approver_role: approverRole,
      signoff_date: signoffDate || null,
    });
  }, [
    saveReport,
    verdict,
    narrative,
    differential,
    forwardLook,
    actions,
    approverName,
    approverRole,
    signoffDate,
  ]);

  const handleIssue = useCallback(async () => {
    if (!approverName.trim() || !approverRole.trim() || !signoffDate) {
      toast.error('Complete the approver name, role and date before issuing to the board');
      return;
    }
    const saved = await saveReport(
      {
        verdict,
        verdict_narrative: narrative,
        differential_outcomes: differential,
        forward_look: forwardLook,
        actions,
        approver_name: approverName,
        approver_role: approverRole,
        signoff_date: signoffDate,
      },
      { silent: true },
    );
    if (!saved) return;
    await issueToBoard(saved);
  }, [
    approverName,
    approverRole,
    signoffDate,
    saveReport,
    verdict,
    narrative,
    differential,
    forwardLook,
    actions,
    issueToBoard,
  ]);

  const handleSeedDemo = useCallback(async () => {
    if (!userId) return;
    setDemoBusy(true);
    try {
      await seedDemoBoardSummary(userId);
      await reload();
      toast.success('Demo firm data loaded');
    } catch (error) {
      console.error('Error seeding demo data:', error);
      toast.error('Could not load the demo data');
    } finally {
      setDemoBusy(false);
    }
  }, [userId, reload]);

  const handleReset = useCallback(async () => {
    if (!userId) return;
    setDemoBusy(true);
    try {
      await resetBoardSummary(userId);
      await reload();
      toast.success('Board Summary cleared');
    } catch (error) {
      console.error('Error clearing board summary:', error);
      toast.error('Could not clear the Board Summary');
    } finally {
      setDemoBusy(false);
    }
  }, [userId, reload]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#f59e0b]" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 md:p-8">
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-[#1e3a8a] md:text-3xl">Board Summary</h1>
          {isDemo && (
            <Badge variant="outline" className="border-[#f59e0b] bg-amber-50 text-[#b45309]">
              Demo data — illustrative only
            </Badge>
          )}
        </div>
        <p className="mt-2 max-w-3xl text-base text-muted-foreground">
          A plain-language, board-facing view of Consumer Duty maturity for the annual board report
          (PRIN 2A.8.3). Every rating is set by a person and supported by a written rationale.
          Nothing on this page is calculated from checklist completion.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={handleSeedDemo}
          disabled={demoBusy}
          className="min-h-[44px]"
        >
          Load demo firm data
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={demoBusy}
          className="min-h-[44px] text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" /> Reset Board Summary
        </Button>
      </div>

      <Card className="border-l-4 border-l-[#f59e0b]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Compass className="h-5 w-5 text-[#1e3a8a]" aria-hidden="true" />
            Related view: full Maturity Assessment
          </CardTitle>
          <CardDescription className="text-base">
            The Maturity Assessment is a separate, differently structured six-category self-assessment
            used by the compliance team. It is related to this scorecard but is not the same set of
            categories, and no ratings are copied between the two.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="min-h-[44px]">
            <Link to="/modules/cd-f1/assessment">View full Maturity Assessment</Link>
          </Button>
        </CardContent>
      </Card>

      <section aria-labelledby="scorecard-heading" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="scorecard-heading" className="text-xl font-semibold text-[#1e3a8a]">
            Maturity scorecard
          </h2>
          <p className="text-sm text-muted-foreground">
            {rollUp.green} established or advanced · {rollUp.amber} developing · {rollUp.red} nascent
            {rollUp.unrated > 0 ? ` · ${rollUp.unrated} not yet rated` : ''}
          </p>
        </div>
        {BOARD_SCORECARD_ROWS.map((row) => (
          <BoardScorecardRowCard
            key={row.key}
            row={row}
            ratingRow={ratings[row.key]}
            notes={notesForPrefixes(row.notePrefixes)}
            notesAvailable={notesAvailable}
            saving={saving}
            onSave={saveRating}
          />
        ))}
      </section>

      <section aria-labelledby="report-heading" className="space-y-4">
        <h2 id="report-heading" className="text-xl font-semibold text-[#1e3a8a]">
          Board report
        </h2>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Overall verdict</CardTitle>
            <CardDescription className="text-base">
              Are we delivering good outcomes for our customers?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-w-md">
              <Label htmlFor="verdict" className="text-sm font-semibold">
                Verdict
              </Label>
              <Select value={verdict} onValueChange={(v) => setVerdict(v as BoardVerdict)}>
                <SelectTrigger id="verdict" className="mt-2 min-h-[44px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VERDICT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="narrative" className="text-sm font-semibold">
                Narrative
              </Label>
              <Textarea
                id="narrative"
                rows={5}
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                className="mt-2 text-base"
                placeholder="Explain the verdict in language the board can read aloud."
              />
              <Button
                variant="link"
                className="mt-1 h-auto p-0 text-[#1e3a8a]"
                onClick={() => setNarrative((current) => draftVerdictSentence + current)}
              >
                Insert draft sentence from the scorecard roll-up
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Differential outcomes</CardTitle>
            <CardDescription className="text-base">
              Which customer groups, including customers with characteristics of vulnerability, fare
              worse, and why.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="differential"
              rows={5}
              value={differential}
              onChange={(e) => setDifferential(e.target.value)}
              className="text-base"
              placeholder="Set out the groups that fare worse and the reasons identified."
            />
            {differentialSeed ? (
              <Button
                variant="link"
                className="mt-1 h-auto p-0 text-[#1e3a8a]"
                onClick={() => setDifferential((current) => `${differentialSeed}\n\n${current}`.trim())}
              >
                Insert recent CD-I5 notes as a starting point
              </Button>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No CD-I5 vulnerable customer notes are available to seed this section.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Gaps &amp; priority actions</CardTitle>
            <CardDescription className="text-base">
              Every area rated nascent or developing is listed here as a gap.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {gapRows.length === 0 ? (
              <p className="text-base text-muted-foreground">
                No areas are currently rated nascent or developing.
              </p>
            ) : (
              <ul className="space-y-2">
                {gapRows.map((row) => (
                  <li
                    key={row.key}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-muted/40 p-3"
                  >
                    <span className="text-base font-medium">{row.title}</span>
                    <div className="flex items-center gap-2">
                      <RatingBadge rating={ratings[row.key]?.rating} />
                      <Button
                        variant="outline"
                        size="sm"
                        className="min-h-[36px]"
                        onClick={() =>
                          setActions((prev) => [
                            ...prev,
                            {
                              id: newActionId(),
                              rowKey: row.key,
                              description: '',
                              owner: '',
                              targetDate: '',
                            },
                          ])
                        }
                      >
                        <Plus className="mr-1 h-4 w-4" aria-hidden="true" /> Add action
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="space-y-3">
              {actions.map((action, index) => {
                const row = BOARD_SCORECARD_ROWS.find((r) => r.key === action.rowKey);
                return (
                  <div key={action.id} className="rounded-md border border-border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {row ? row.title : 'General action'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="min-h-[36px] text-destructive"
                        onClick={() => setActions((prev) => prev.filter((a) => a.id !== action.id))}
                        aria-label={`Remove action ${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                    <div className="mt-2 grid gap-3 md:grid-cols-[1fr_200px_180px]">
                      <div>
                        <Label htmlFor={`action-desc-${action.id}`} className="text-sm">
                          Action
                        </Label>
                        <Textarea
                          id={`action-desc-${action.id}`}
                          rows={2}
                          value={action.description}
                          onChange={(e) =>
                            setActions((prev) =>
                              prev.map((a) =>
                                a.id === action.id ? { ...a, description: e.target.value } : a,
                              ),
                            )
                          }
                          className="mt-1 text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`action-owner-${action.id}`} className="text-sm">
                          Owner
                        </Label>
                        <Input
                          id={`action-owner-${action.id}`}
                          value={action.owner}
                          onChange={(e) =>
                            setActions((prev) =>
                              prev.map((a) => (a.id === action.id ? { ...a, owner: e.target.value } : a)),
                            )
                          }
                          className="mt-1 min-h-[44px] text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`action-date-${action.id}`} className="text-sm">
                          Target date
                        </Label>
                        <Input
                          id={`action-date-${action.id}`}
                          type="date"
                          value={action.targetDate}
                          onChange={(e) =>
                            setActions((prev) =>
                              prev.map((a) =>
                                a.id === action.id ? { ...a, targetDate: e.target.value } : a,
                              ),
                            )
                          }
                          className="mt-1 min-h-[44px] text-base"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Forward look</CardTitle>
            <CardDescription className="text-base">
              What the firm intends to do over the next twelve months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={4}
              value={forwardLook}
              onChange={(e) => setForwardLook(e.target.value)}
              className="text-base"
              aria-label="Forward look"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Stamp className="h-5 w-5 text-[#1e3a8a]" aria-hidden="true" /> Board sign-off
            </CardTitle>
            <CardDescription className="text-base">
              Issuing to the board locks a dated, read-only version. The working draft above stays
              editable.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <Label htmlFor="approver-name" className="text-sm font-semibold">
                  Approver name
                </Label>
                <Input
                  id="approver-name"
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
                  className="mt-1 min-h-[44px] text-base"
                />
              </div>
              <div>
                <Label htmlFor="approver-role" className="text-sm font-semibold">
                  Role (SMF)
                </Label>
                <Input
                  id="approver-role"
                  value={approverRole}
                  onChange={(e) => setApproverRole(e.target.value)}
                  className="mt-1 min-h-[44px] text-base"
                  placeholder="e.g. SMF1 Chief Executive"
                />
              </div>
              <div>
                <Label htmlFor="signoff-date" className="text-sm font-semibold">
                  Date
                </Label>
                <Input
                  id="signoff-date"
                  type="date"
                  value={signoffDate}
                  onChange={(e) => setSignoffDate(e.target.value)}
                  className="mt-1 min-h-[44px] text-base"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleSaveReport}
                disabled={saving}
                className="min-h-[44px] bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90"
              >
                Save draft
              </Button>
              <Button
                onClick={handleIssue}
                disabled={saving}
                className="min-h-[44px] bg-[#f59e0b] text-[#1e293b] hover:bg-[#f59e0b]/90"
              >
                <ClipboardCheck className="mr-2 h-4 w-4" aria-hidden="true" /> Issue to board
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Issued versions</CardTitle>
            <CardDescription className="text-base">
              Locked, read-only snapshots of what was put to the board.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {snapshots.length === 0 ? (
              <p className="text-base text-muted-foreground">No versions have been issued yet.</p>
            ) : (
              <ul className="space-y-3">
                {snapshots.map((snapshot) => (
                  <li key={snapshot.id} className="rounded-md border border-border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-base font-semibold">
                        Version {snapshot.version} — issued {formatDate(snapshot.issued_at)}
                      </span>
                      <Badge variant="outline">Read-only</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Approved by {snapshot.payload.report.approver_name || 'not recorded'}
                      {snapshot.payload.report.approver_role
                        ? ` (${snapshot.payload.report.approver_role})`
                        : ''}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {snapshot.payload.ratings.map((rating) => (
                        <Badge
                          key={rating.row_key}
                          variant="outline"
                          className={RATING_BY_VALUE[rating.rating]?.badgeClass}
                        >
                          {BOARD_SCORECARD_ROWS.find((r) => r.key === rating.row_key)?.title ??
                            rating.row_key}
                          : {RATING_BY_VALUE[rating.rating]?.label ?? rating.rating}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default BoardSummary;
