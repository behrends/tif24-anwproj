'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { courseService } from '@/lib/courseService';
import { studyProgramService } from '@/lib/studyProgramService';
import { Course, StudyProgram } from '@/lib/types';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [programs, setPrograms] = useState<Record<string, StudyProgram>>({});

  useEffect(() => {
    courseService.getAll().then(setCourses);
    studyProgramService.getAll().then((progs) => {
      const map: Record<string, StudyProgram> = {};
      progs.forEach((p) => (map[p.id] = p));
      setPrograms(map);
    });
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Kurse</h1>
        <Link href="/kurse/neu" className="text-blue-600 hover:underline">
          + Hinzufügen
        </Link>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 text-left">Name</th>
            <th className="px-2 py-1 text-left">Studiengang</th>
            <th className="px-2 py-1 text-left">Startjahr</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="px-2 py-1">{c.name}</td>
              <td className="px-2 py-1">{programs[c.studyProgramId]?.shortName}</td>
              <td className="px-2 py-1">{c.startYear}</td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-sm text-muted-foreground">
                Keine Kurse vorhanden
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
