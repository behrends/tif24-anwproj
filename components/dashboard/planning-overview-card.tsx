'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import type { QuarterOverview } from '@/lib/types';

interface PlanningOverviewCardProps {
  quarterData?: QuarterOverview[];
}

export function PlanningOverviewCard({
  quarterData,
}: PlanningOverviewCardProps) {
  // Mock data if none provided
  const defaultData: QuarterOverview[] = [
    {
      quarter: 'Q1',
      year: 2024,
      totalHours: 200,
      assignedHours: 190,
      percentage: 95,
      status: 'complete',
    },
    {
      quarter: 'Q2',
      year: 2024,
      totalHours: 180,
      assignedHours: 121,
      percentage: 67,
      status: 'partial',
    },
    {
      quarter: 'Q3',
      year: 2024,
      totalHours: 160,
      assignedHours: 19,
      percentage: 12,
      status: 'partial',
    },
    {
      quarter: 'Q4',
      year: 2024,
      totalHours: 140,
      assignedHours: 0,
      percentage: 0,
      status: 'empty',
    },
  ];

  const data = quarterData || defaultData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          📈 Planungsübersicht
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map(
          ({
            quarter,
            year,
            percentage,
            assignedHours,
            totalHours,
          }) => (
            <div key={`${quarter}-${year}`} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  {quarter} {year}:
                </span>
                <span className="font-medium">{percentage}%</span>
              </div>
              <ProgressBar
                value={assignedHours}
                max={totalHours}
                showText={false}
                variant={
                  percentage >= 90
                    ? 'success'
                    : percentage >= 50
                    ? 'warning'
                    : 'danger'
                }
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{assignedHours}h zugeordnet</span>
                <span>{totalHours}h gesamt</span>
              </div>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
