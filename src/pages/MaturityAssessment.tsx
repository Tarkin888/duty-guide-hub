import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ClipboardCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { assessmentQuestions } from '@/data/maturityAssessmentData';
import { AssessmentQuestion } from '@/components/maturity/AssessmentQuestion';
import { AssessmentResults } from '@/components/maturity/AssessmentResults';
import { useMaturityAssessment } from '@/hooks/useMaturityAssessment';

const MaturityAssessment = () => {
  const navigate = useNavigate();
  const {
    latestAssessment,
    assessments,
    isLoading,
    canRetake,
    daysUntilRetake,
    saveAssessment,
  } = useMaturityAssessment();

  const [isAssessing, setIsAssessing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleStartAssessment = () => {
    setIsAssessing(true);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [assessmentQuestions[currentQuestion].id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScores = () => {
    const outcomeScores: Record<string, number[]> = {
      products_services: [],
      price_value: [],
      consumer_understanding: [],
      consumer_support: [],
    };

    assessmentQuestions.forEach(q => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        outcomeScores[q.outcome].push(answer);
      }
    });

    const calculateOutcomeScore = (scores: number[]) => {
      if (scores.length === 0) return 0;
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return (avg / 5) * 100;
    };

    const scores = {
      products_services: calculateOutcomeScore(outcomeScores.products_services),
      price_value: calculateOutcomeScore(outcomeScores.price_value),
      consumer_understanding: calculateOutcomeScore(outcomeScores.consumer_understanding),
      consumer_support: calculateOutcomeScore(outcomeScores.consumer_support),
    };

    const overall = (
      scores.products_services +
      scores.price_value +
      scores.consumer_understanding +
      scores.consumer_support
    ) / 4;

    return { overall, ...scores };
  };

  const handleComplete = async () => {
    setIsSaving(true);
    const scores = calculateScores();
    await saveAssessment(answers, scores);
    setIsSaving(false);
    setIsAssessing(false);
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const currentAnswer = answers[assessmentQuestions[currentQuestion]?.id];
  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;
  const allQuestionsAnswered = Object.keys(answers).length === assessmentQuestions.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show results if we have an assessment and not currently assessing
  if (latestAssessment && !isAssessing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Maturity Assessment</h1>
            <p className="text-muted-foreground">Track your Consumer Duty implementation maturity</p>
          </div>
        </div>

        <AssessmentResults
          result={latestAssessment}
          allAssessments={assessments}
          canRetake={canRetake}
          daysUntilRetake={daysUntilRetake}
          onRetake={handleStartAssessment}
        />
      </div>
    );
  }

  // Show assessment in progress
  if (isAssessing) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsAssessing(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Maturity Assessment</h1>
            <Progress value={progress} className="mt-2" />
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <AssessmentQuestion
              questionNumber={currentQuestion + 1}
              totalQuestions={assessmentQuestions.length}
              question={assessmentQuestions[currentQuestion]}
              value={currentAnswer || null}
              onChange={handleAnswer}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleComplete}
              disabled={!allQuestionsAnswered || isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ClipboardCheck className="h-4 w-4 mr-2" />
              )}
              Complete Assessment
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Show start screen
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maturity Assessment</h1>
          <p className="text-muted-foreground">Evaluate your Consumer Duty implementation readiness</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-primary" />
            Consumer Duty Maturity Assessment
          </CardTitle>
          <CardDescription>
            This assessment evaluates your organisation's maturity across the four Consumer Duty outcomes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <h4 className="font-medium text-foreground">20 Questions</h4>
                <p className="text-sm text-muted-foreground">5 questions for each of the four Consumer Duty outcomes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <h4 className="font-medium text-foreground">Rate Your Maturity</h4>
                <p className="text-sm text-muted-foreground">Score each area from 1 (Initial) to 5 (Optimised)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <h4 className="font-medium text-foreground">Get Insights</h4>
                <p className="text-sm text-muted-foreground">Receive gap analysis and module recommendations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">4</div>
              <div>
                <h4 className="font-medium text-foreground">Track Progress</h4>
                <p className="text-sm text-muted-foreground">Retake quarterly to measure improvement over time</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Estimated time:</strong> 10-15 minutes
            </p>
          </div>

          <Button size="lg" className="w-full" onClick={handleStartAssessment}>
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Start Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaturityAssessment;
