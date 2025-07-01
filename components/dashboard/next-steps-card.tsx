'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface NextStep {
  id: string;
  type:
    | 'missing_assignments'
    | 'deadline_warning'
    | 'capacity_warning';
  message: string;
  priority: 'high' | 'medium' | 'low';
}

interface NextStepsCardProps {
  steps?: NextStep[];
}

export function NextStepsCard({ steps }: NextStepsCardProps) {
  // Mock data if none provided
  const defaultSteps: NextStep[] = [
    {
      id: '1',
      type: 'missing_assignments',
      message: 'Q2 2024 BWL: 3 Vorlesungen ohne Dozent',
      priority: 'high',
    },
    {
      id: '2',
      type: 'deadline_warning',
      message: 'Q3 2024 Planung: Deadline in 4 Wochen',
      priority: 'medium',
    },
    {
      id: '3',
      type: 'capacity_warning',
      message: 'Dr. Müller: Nur 25h Kapazität bis Jahresende',
      priority: 'medium',
    },
  ];

  const data = steps || defaultSteps;

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '•';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Nächste Schritte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((step) => (
            <div key={step.id} className="flex items-start gap-3">
              <span className="mt-0.5">
                {getPriorityIcon(step.priority)}
              </span>
              <span className="text-sm">{step.message}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
