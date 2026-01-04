import { AlertTriangle, TrendingUp, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { OUTCOME_LABELS, OUTCOME_MODULES } from '@/data/maturityAssessmentData';

interface GapAnalysisProps {
  scores: {
    products_services: number;
    price_value: number;
    consumer_understanding: number;
    consumer_support: number;
  };
}

const MODULE_NAMES: Record<string, string> = {
  'CD-I1': 'Products & Services',
  'CD-I2': 'Price & Value',
  'CD-I3': 'Consumer Understanding',
  'CD-I4': 'Consumer Support',
  'CD-I5': 'Vulnerable Customers',
  'CD-I6': 'Distribution Chain',
};

export const GapAnalysis = ({ scores }: GapAnalysisProps) => {
  const outcomes = [
    { key: 'products_services', score: scores.products_services },
    { key: 'price_value', score: scores.price_value },
    { key: 'consumer_understanding', score: scores.consumer_understanding },
    { key: 'consumer_support', score: scores.consumer_support },
  ].sort((a, b) => a.score - b.score);

  const weakestAreas = outcomes.filter(o => o.score < 60);
  const strongestAreas = outcomes.filter(o => o.score >= 60).reverse();

  // Get unique recommended modules based on weak areas
  const recommendedModules = new Set<string>();
  weakestAreas.forEach(area => {
    OUTCOME_MODULES[area.key]?.forEach(module => recommendedModules.add(module));
  });

  return (
    <div className="space-y-6">
      {/* Weakest Areas */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <h4 className="font-semibold text-foreground">Areas Requiring Attention</h4>
        </div>
        {weakestAreas.length > 0 ? (
          <div className="space-y-2">
            {weakestAreas.map(({ key, score }) => (
              <div key={key} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <span className="font-medium text-foreground">{OUTCOME_LABELS[key]}</span>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                  {Math.round(score)}%
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">All areas meet minimum thresholds. Well done!</p>
        )}
      </div>

      {/* Strongest Areas */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <h4 className="font-semibold text-foreground">Areas of Strength</h4>
        </div>
        {strongestAreas.length > 0 ? (
          <div className="space-y-2">
            {strongestAreas.map(({ key, score }) => (
              <div key={key} className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span className="font-medium text-foreground">{OUTCOME_LABELS[key]}</span>
                <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  {Math.round(score)}%
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Focus on the areas above to build strength.</p>
        )}
      </div>

      {/* Recommended Modules */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-4 w-4 text-primary" />
          <h4 className="font-semibold text-foreground">Recommended Modules to Prioritise</h4>
        </div>
        {recommendedModules.size > 0 ? (
          <div className="space-y-2">
            {Array.from(recommendedModules).map(moduleId => (
              <a
                key={moduleId}
                href={`/modules/${moduleId.toLowerCase()}`}
                className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors"
              >
                <div>
                  <span className="font-medium text-foreground">{moduleId}</span>
                  <span className="text-muted-foreground text-sm ml-2">
                    {MODULE_NAMES[moduleId]}
                  </span>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Priority
                </Badge>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            No critical gaps identified. Continue with your current implementation plan.
          </p>
        )}
      </div>
    </div>
  );
};
