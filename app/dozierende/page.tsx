'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { lecturerService } from '@/lib/lecturerService';
import { Lecturer } from '@/lib/types';

export default function DozierendePage() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    lecturerService.getAll().then(setLecturers);
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Dozierende</h1>
        <Link href="/dozierende/neu" className="text-blue-600 hover:underline">
          + Hinzufügen
        </Link>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 text-left">Name</th>
            <th className="px-2 py-1 text-left">Typ</th>
            <th className="px-2 py-1 text-left">E-Mail</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="px-2 py-1">
                {l.title ? `${l.title} ` : ''}{l.firstname} {l.lastname}
              </td>
              <td className="px-2 py-1">{l.type}</td>
              <td className="px-2 py-1">{l.email}</td>
            </tr>
          ))}
          {lecturers.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-sm text-muted-foreground">
                Keine Dozierenden vorhanden
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
