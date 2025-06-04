'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { lectureService } from '@/lib/lectureService';
import { studyProgramService } from '@/lib/studyProgramService';
import { Lecture, StudyProgram } from '@/lib/types';

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [programs, setPrograms] = useState<Record<string, StudyProgram>>({});

  useEffect(() => {
    lectureService.getAll().then(setLectures);
    studyProgramService.getAll().then((progs) => {
      const map: Record<string, StudyProgram> = {};
      progs.forEach((p) => (map[p.id] = p));
      setPrograms(map);
    });
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Vorlesungen</h1>
        <Link href="/vorlesungen/neu" className="text-blue-600 hover:underline">
          + Hinzufügen
        </Link>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 text-left">Titel</th>
            <th className="px-2 py-1 text-left">Studiengang</th>
            <th className="px-2 py-1 text-left">Semester</th>
            <th className="px-2 py-1 text-left">Stunden</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="px-2 py-1">{l.title}</td>
              <td className="px-2 py-1">{programs[l.studyProgramId]?.shortName}</td>
              <td className="px-2 py-1">{l.semester}</td>
              <td className="px-2 py-1">{l.hours}</td>
            </tr>
          ))}
          {lectures.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-sm text-muted-foreground">
                Keine Vorlesungen vorhanden
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
