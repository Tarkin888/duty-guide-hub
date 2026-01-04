import { OUTCOME_LABELS } from '@/data/maturityAssessmentData';

interface MaturityHeatmapProps {
  scores: {
    products_services: number;
    price_value: number;
    consumer_understanding: number;
    consumer_support: number;
  };
}

const getHeatmapColor = (score: number): string => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-lime-500';
  if (score >= 40) return 'bg-yellow-500';
  if (score >= 20) return 'bg-orange-500';
  return 'bg-red-500';
};

const getTextColor = (score: number): string => {
  return 'text-white';
};

export const MaturityHeatmap = ({ scores }: MaturityHeatmapProps) => {
  const outcomes = [
    { key: 'products_services', score: scores.products_services },
    { key: 'price_value', score: scores.price_value },
    { key: 'consumer_understanding', score: scores.consumer_understanding },
    { key: 'consumer_support', score: scores.consumer_support },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {outcomes.map(({ key, score }) => (
        <div
          key={key}
          className={`${getHeatmapColor(score)} ${getTextColor(score)} rounded-lg p-4 text-center transition-all hover:scale-105`}
        >
          <div className="text-2xl font-bold">{Math.round(score)}%</div>
          <div className="text-xs font-medium opacity-90 mt-1">
            {OUTCOME_LABELS[key]}
          </div>
        </div>
      ))}
    </div>
  );
};
