import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { OUTCOME_LABELS } from '@/data/maturityAssessmentData';

interface AssessmentHistoryProps {
  assessments: Array<{
    id: string;
    completed_at: string;
    overall_score: number;
    products_services_score: number;
    price_value_score: number;
    consumer_understanding_score: number;
    consumer_support_score: number;
  }>;
}

export const AssessmentHistory = ({ assessments }: AssessmentHistoryProps) => {
  const chartData = assessments
    .slice()
    .reverse()
    .map((a) => ({
      date: new Date(a.completed_at).toLocaleDateString('en-GB', {
        month: 'short',
        year: '2-digit',
      }),
      overall: Math.round(a.overall_score),
      products_services: Math.round(a.products_services_score),
      price_value: Math.round(a.price_value_score),
      consumer_understanding: Math.round(a.consumer_understanding_score),
      consumer_support: Math.round(a.consumer_support_score),
    }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            className="fill-muted-foreground"
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fontSize: 12 }}
            className="fill-muted-foreground"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="overall" 
            name="Overall"
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
          <Line 
            type="monotone" 
            dataKey="products_services" 
            name={OUTCOME_LABELS.products_services}
            stroke="hsl(var(--chart-1))" 
            strokeWidth={1.5}
            strokeDasharray="5 5"
          />
          <Line 
            type="monotone" 
            dataKey="price_value" 
            name={OUTCOME_LABELS.price_value}
            stroke="hsl(var(--chart-2))" 
            strokeWidth={1.5}
            strokeDasharray="5 5"
          />
          <Line 
            type="monotone" 
            dataKey="consumer_understanding" 
            name={OUTCOME_LABELS.consumer_understanding}
            stroke="hsl(var(--chart-3))" 
            strokeWidth={1.5}
            strokeDasharray="5 5"
          />
          <Line 
            type="monotone" 
            dataKey="consumer_support" 
            name={OUTCOME_LABELS.consumer_support}
            stroke="hsl(var(--chart-4))" 
            strokeWidth={1.5}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
