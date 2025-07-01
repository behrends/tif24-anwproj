'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import type { StudyProgramStatus } from '@/lib/types';

interface StudyProgramsCardProps {
  programs: StudyProgramStatus[];
  onPlanClick: (programId: string) => void;
}

export function StudyProgramsCard({
  programs,
  onPlanClick,
}: StudyProgramsCardProps) {
  const getStatusText = (status: string, percentage: number) => {
    switch (status) {
      case 'complete':
        return 'Vollständig';
      case 'partial':
        return `${percentage}% geplant`;
      case 'empty':
        return 'Offen';
      default:
        return 'Offen';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Meine Studiengänge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {programs.map((program) => (
          <div
            key={program.id}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              <h3 className="font-semibold">{program.name}</h3>
            </div>

            <div className="space-y-2 text-sm">
              {Object.entries(program.quarters).map(
                ([quarter, data]) => (
                  <div
                    key={quarter}
                    className="flex justify-between items-center"
                  >
                    <span>{quarter} 2024:</span>
                    <StatusBadge status={data.status}>
                      {getStatusText(data.status, data.percentage)}
                    </StatusBadge>
                  </div>
                )
              )}
            </div>

            <div className="pt-3 border-t space-y-2">
              <p className="text-sm text-muted-foreground">
                Kurse: {program.courses.join(', ')}
              </p>
              <Button
                onClick={() => onPlanClick(program.id)}
                className="w-full"
                size="sm"
              >
                📅 Planen
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
