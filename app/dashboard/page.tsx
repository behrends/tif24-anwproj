'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StudyProgramsCard } from '@/components/dashboard/study-programs-card';
import { PlanningOverviewCard } from '@/components/dashboard/planning-overview-card';
import { LecturerStatusCard } from '@/components/dashboard/lecturer-status-card';
import { NextStepsCard } from '@/components/dashboard/next-steps-card';
import type { StudyProgramStatus } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [studyPrograms, setStudyPrograms] = useState<
    StudyProgramStatus[]
  >([]);

  useEffect(() => {
    // Mock data basierend auf Wireframes
    const mockData: StudyProgramStatus[] = [
      {
        id: 'bwl',
        name: 'BWL',
        shortName: 'BWL',
        quarters: {
          Q1: {
            status: 'complete',
            percentage: 100,
            totalLectures: 12,
            assignedLectures: 12,
          },
          Q2: {
            status: 'partial',
            percentage: 85,
            totalLectures: 10,
            assignedLectures: 8,
          },
          Q3: {
            status: 'empty',
            percentage: 0,
            totalLectures: 8,
            assignedLectures: 0,
          },
          Q4: {
            status: 'empty',
            percentage: 0,
            totalLectures: 6,
            assignedLectures: 0,
          },
        },
        courses: ['BWL 2024', 'BWL 2023'],
      },
      {
        id: 'informatik',
        name: 'Informatik',
        shortName: 'INF',
        quarters: {
          Q1: {
            status: 'complete',
            percentage: 100,
            totalLectures: 15,
            assignedLectures: 15,
          },
          Q2: {
            status: 'complete',
            percentage: 100,
            totalLectures: 12,
            assignedLectures: 12,
          },
          Q3: {
            status: 'partial',
            percentage: 40,
            totalLectures: 10,
            assignedLectures: 4,
          },
          Q4: {
            status: 'empty',
            percentage: 0,
            totalLectures: 8,
            assignedLectures: 0,
          },
        },
        courses: ['INF 2024', 'INF 2023'],
      },
    ];

    setStudyPrograms(mockData);
  }, []);

  const handlePlanClick = (programId: string) => {
    router.push(`/planning/${programId}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            DHBW Vorlesungsplanung
          </h1>
          <p className="text-muted-foreground mt-1">
            Willkommen, Maria Mustermann
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
          <span>👤</span>
          <span className="text-sm font-medium">M. Mustermann</span>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meine Studiengänge */}
        <StudyProgramsCard
          programs={studyPrograms}
          onPlanClick={handlePlanClick}
        />

        {/* Planungsübersicht */}
        <PlanningOverviewCard />

        {/* Dozierende Status */}
        <LecturerStatusCard />
      </div>

      {/* Nächste Schritte - Full Width */}
      <NextStepsCard />
    </div>
  );
}
