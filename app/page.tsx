'use client';
import { useEffect, useState } from 'react';
import { lecturerService } from '@/lib/lecturerService';
import { studyProgramService } from '@/lib/studyProgramService';
import { courseService } from '@/lib/courseService';
import { lectureService } from '@/lib/lectureService';
import { assignmentService } from '@/lib/assignmentService';

export default function HomePage() {
  const [counts, setCounts] = useState({
    lecturers: 0,
    studyPrograms: 0,
    courses: 0,
    lectures: 0,
    assignments: 0,
  });

  useEffect(() => {
    Promise.all([
      lecturerService.getAll(),
      studyProgramService.getAll(),
      courseService.getAll(),
      lectureService.getAll(),
      assignmentService.getAll(),
    ]).then(([l, sp, c, le, a]) => {
      setCounts({
        lecturers: l.length,
        studyPrograms: sp.length,
        courses: c.length,
        lectures: le.length,
        assignments: a.length,
      });
    });
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Dozierende</p>
          <p className="text-2xl font-semibold">{counts.lecturers}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Studiengänge</p>
          <p className="text-2xl font-semibold">{counts.studyPrograms}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Kurse</p>
          <p className="text-2xl font-semibold">{counts.courses}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Vorlesungen</p>
          <p className="text-2xl font-semibold">{counts.lectures}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Planungen</p>
          <p className="text-2xl font-semibold">{counts.assignments}</p>
        </div>
      </div>
    </div>
  );
}
