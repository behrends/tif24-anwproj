"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StudyProgramsCard } from '@/components/dashboard/study-programs-card';
import type { StudyProgramStatus } from '@/lib/types';

export default function PlanningPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<StudyProgramStatus[]>([]);

  useEffect(() => {
    // Mock data analog zum Dashboard
    const mock: StudyProgramStatus[] = [
      {
        id: 'bwl',
        name: 'BWL',
        shortName: 'BWL',
        quarters: {
          Q1: { status: 'complete', percentage: 100, totalLectures: 12, assignedLectures: 12 },
          Q2: { status: 'partial', percentage: 85, totalLectures: 10, assignedLectures: 8 },
          Q3: { status: 'empty', percentage: 0, totalLectures: 8, assignedLectures: 0 },
          Q4: { status: 'empty', percentage: 0, totalLectures: 6, assignedLectures: 0 },
        },
        courses: ['BWL 2024', 'BWL 2023'],
      },
      {
        id: 'informatik',
        name: 'Informatik',
        shortName: 'INF',
        quarters: {
          Q1: { status: 'complete', percentage: 100, totalLectures: 15, assignedLectures: 15 },
          Q2: { status: 'complete', percentage: 100, totalLectures: 12, assignedLectures: 12 },
          Q3: { status: 'partial', percentage: 40, totalLectures: 10, assignedLectures: 4 },
          Q4: { status: 'empty', percentage: 0, totalLectures: 8, assignedLectures: 0 },
        },
        courses: ['INF 2024', 'INF 2023'],
      },
    ];
    setPrograms(mock);
  }, []);

  const handlePlanClick = (id: string) => {
    router.push(`/planning/${id}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">📅 Quartalsplanung</h1>
      <StudyProgramsCard programs={programs} onPlanClick={handlePlanClick} />
    </div>
  );
}
