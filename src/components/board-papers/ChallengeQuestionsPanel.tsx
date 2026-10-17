import { useId } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { normaliseQuestions } from '@/lib/boardPaperContent';

interface Props {
  value?: string[];
  area: string;
  onChange?: (value: string[]) => void;
}

/** Optional human-authored questions shared by the editor and all frozen pack views. */
const ChallengeQuestionsPanel = ({ value, area, onChange }: Props) => {
  const id = useId();
  const questions = normaliseQuestions(value);
  const visible = questions.filter((text) => text.trim());
  if (!onChange && !visible.length) return null;

  return (
    <div className="bp-at-a-glance space-y-3 rounded-md border p-4 text-base" role="group" aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`} className="bp-at-a-glance-heading text-base font-bold">
        {onChange ? 'Suggested questions for Board challenge' : 'Questions for the Board to consider'}
      </h3>
      {onChange ? (
        <>
          {questions.map((question, index) => (
            <div key={index} className="flex min-w-0 items-center gap-2">
              <Label className="sr-only" htmlFor={`${id}-${index}`}>{area}: question {index + 1}</Label>
              <Input id={`${id}-${index}`} className="min-w-0 flex-1 text-base" maxLength={220} value={question}
                placeholder="What would the Board need to see to be confident about this?"
                onChange={(event) => onChange(questions.map((text, i) => i === index ? event.target.value.slice(0, 220) : text))} />
              <Button type="button" variant="outline" size="icon" className="min-h-[44px] min-w-[44px] shrink-0 hover:bg-muted hover:text-foreground"
                aria-label={`${area}: remove question ${index + 1}`} title="Remove question"
                onClick={() => onChange(questions.filter((_, i) => i !== index))}>
                <Trash2 className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" className="min-h-[44px] hover:bg-muted hover:text-foreground" disabled={questions.length >= 3}
            aria-label={`${area}: add question`} onClick={() => onChange([...questions, ''])}>
            <Plus className="mr-2 h-4 w-4" aria-hidden />Add question
          </Button>
        </>
      ) : (
        <ol className="list-decimal space-y-1 pl-5">
          {visible.map((question, index) => <li key={index} className="whitespace-pre-wrap break-words leading-relaxed">{question}</li>)}
        </ol>
      )}
    </div>
  );
};

export default ChallengeQuestionsPanel;