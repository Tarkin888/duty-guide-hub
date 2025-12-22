import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  animate?: boolean;
}

export function CircularProgress({ 
  value, 
  size = 160, 
  strokeWidth = 12, 
  className = "",
  animate = true 
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(animate ? 0 : value);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    if (animate) {
      // Animate from current to target value
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value, animate]);

  // Determine color based on progress
  const getProgressColor = () => {
    if (animatedValue === 0) return 'text-muted-foreground';
    if (animatedValue === 100) return 'text-success';
    return 'text-accent';
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted"
        />
        {/* Progress circle with animation */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            getProgressColor(),
            "transition-all duration-1000 ease-out"
          )}
          style={{
            filter: animatedValue === 100 ? 'drop-shadow(0 0 6px hsl(var(--success) / 0.5))' : undefined
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn(
          "text-4xl font-bold transition-colors duration-500",
          animatedValue === 100 ? "text-success" : "text-foreground"
        )}>
          {animatedValue}%
        </span>
        <span className="text-sm text-muted-foreground">Complete</span>
      </div>
    </div>
  );
}
