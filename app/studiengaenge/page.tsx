'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { studyProgramService } from '@/lib/studyProgramService';
import { StudyProgram } from '@/lib/types';

export default function StudyProgramsPage() {
  const [programs, setPrograms] = useState<StudyProgram[]>([]);

  useEffect(() => {
    studyProgramService.getAll().then(setPrograms);
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Studiengänge</h1>
        <Link href="/studiengaenge/neu" className="text-blue-600 hover:underline">
          + Hinzufügen
        </Link>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 text-left">Name</th>
            <th className="px-2 py-1 text-left">Kurz</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-2 py-1">{p.name}</td>
              <td className="px-2 py-1">{p.shortName}</td>
            </tr>
          ))}
          {programs.length === 0 && (
            <tr>
              <td colSpan={2} className="p-4 text-center text-sm text-muted-foreground">
                Keine Studiengänge vorhanden
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
