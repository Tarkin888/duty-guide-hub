import { RATING_LABELS, OUTCOME_LABELS } from '@/data/maturityAssessmentData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AssessmentQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: {
    id: string;
    outcome: string;
    question: string;
    description: string;
  };
  value: number | null;
  onChange: (value: number) => void;
}

export const AssessmentQuestion = ({
  questionNumber,
  totalQuestions,
  question,
  value,
  onChange,
}: AssessmentQuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          {OUTCOME_LABELS[question.outcome]}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {question.question}
        </h3>
        <p className="text-muted-foreground">
          {question.description}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Rate your current maturity level:</p>
        <div className="grid gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange(rating)}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left',
                value === rating
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg',
                value === rating
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}>
                {rating}
              </div>
              <div>
                <div className="font-medium text-foreground">
                  {RATING_LABELS[rating].label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {RATING_LABELS[rating].description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
