import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'warning' | 'danger' | 'success';
}

export function ProgressBar({
  value,
  max,
  className,
  showText = true,
  variant = 'default',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const getColorClass = () => {
    if (variant !== 'default') {
      switch (variant) {
        case 'success':
          return 'bg-green-500';
        case 'warning':
          return 'bg-yellow-500';
        case 'danger':
          return 'bg-red-500';
        default:
          return 'bg-blue-500';
      }
    }

    // Auto-color based on percentage
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className={cn('space-y-1', className)}>
      {showText && (
        <div className="flex justify-between text-sm">
          <span>{value}</span>
          <span className="text-muted-foreground">/ {max}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Visual progress bar with blocks (like in wireframes)
export function BlockProgressBar({
  value,
  max,
  className,
  blocks = 10,
}: ProgressBarProps & { blocks?: number }) {
  const percentage = Math.min((value / max) * 100, 100);
  const filledBlocks = Math.round((percentage / 100) * blocks);

  return (
    <div className={cn('flex gap-0.5', className)}>
      {Array.from({ length: blocks }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-2 flex-1 rounded-sm',
            i < filledBlocks ? 'bg-blue-500' : 'bg-gray-200'
          )}
        />
      ))}
    </div>
  );
}
