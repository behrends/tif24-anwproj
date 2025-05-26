'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress';
import type { LecturerCapacity } from '@/lib/types';

interface LecturerStatusCardProps {
  criticalLecturers?: LecturerCapacity[];
}

export function LecturerStatusCard({
  criticalLecturers,
}: LecturerStatusCardProps) {
  // Mock data if none provided
  const defaultData: LecturerCapacity[] = [
    {
      lecturer: {
        id: '1',
        firstname: 'Hans',
        lastname: 'Müller',
        title: 'Dr.',
        email: 'mueller@extern.de',
        type: 'external',
        yearlyHoursLimit: 240,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      currentHours: 215,
      limit: 240,
      percentage: 89.6,
      quarterBreakdown: { Q1: 80, Q2: 75, Q3: 60, Q4: 0 },
      isWarning: true,
      isCritical: false,
    },
    {
      lecturer: {
        id: '2',
        firstname: 'Sarah',
        lastname: 'Weber',
        title: 'M.',
        email: 'weber@extern.de',
        type: 'external',
        yearlyHoursLimit: 240,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      currentHours: 195,
      limit: 240,
      percentage: 81.3,
      quarterBreakdown: { Q1: 60, Q2: 70, Q3: 65, Q4: 0 },
      isWarning: true,
      isCritical: false,
    },
  ];

  const data = criticalLecturers || defaultData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dozierende Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
            <span>⚠️</span>
            <span>Externe über 200h:</span>
          </div>

          {data.map((lecturerCapacity) => {
            const { lecturer, currentHours, limit, percentage } =
              lecturerCapacity;
            const displayName = `${
              lecturer.title ? lecturer.title + ' ' : ''
            }${lecturer.firstname.charAt(0)}. ${lecturer.lastname}`;

            return (
              <div key={lecturer.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{displayName}</span>
                  <span>
                    {currentHours}/{limit}h
                  </span>
                </div>
                <ProgressBar
                  value={currentHours}
                  max={limit}
                  showText={false}
                  variant={percentage >= 90 ? 'danger' : 'warning'}
                />
                <div className="text-xs text-muted-foreground">
                  {Math.round(percentage)}% der Jahreskapazität
                </div>
              </div>
            );
          })}

          <Button variant="outline" size="sm" className="w-full mt-4">
            👥 Alle anzeigen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
