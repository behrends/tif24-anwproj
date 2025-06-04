'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { assignmentService } from '@/lib/assignmentService';
import { lectureService } from '@/lib/lectureService';
import { courseService } from '@/lib/courseService';
import { lecturerService } from '@/lib/lecturerService';
import { Assignment, Lecture, Course, Lecturer } from '@/lib/types';

export default function PlanningPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [lectures, setLectures] = useState<Record<string, Lecture>>({});
  const [courses, setCourses] = useState<Record<string, Course>>({});
  const [lecturers, setLecturers] = useState<Record<string, Lecturer>>({});

  useEffect(() => {
    assignmentService.getAll().then(setAssignments);
    lectureService.getAll().then((ls) => {
      const m: Record<string, Lecture> = {};
      ls.forEach((l) => (m[l.id] = l));
      setLectures(m);
    });
    courseService.getAll().then((cs) => {
      const m: Record<string, Course> = {};
      cs.forEach((c) => (m[c.id] = c));
      setCourses(m);
    });
    lecturerService.getAll().then((ls) => {
      const m: Record<string, Lecturer> = {};
      ls.forEach((l) => (m[l.id] = l));
      setLecturers(m);
    });
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Vorlesungsplanung</h1>
        <Link href="/planung/neu" className="text-blue-600 hover:underline">
          + Hinzufügen
        </Link>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 text-left">Vorlesung</th>
            <th className="px-2 py-1 text-left">Kurs</th>
            <th className="px-2 py-1 text-left">Jahr</th>
            <th className="px-2 py-1 text-left">Quartal</th>
            <th className="px-2 py-1 text-left">Dozent*in</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="px-2 py-1">{lectures[a.lectureId]?.title}</td>
              <td className="px-2 py-1">{courses[a.courseId]?.name}</td>
              <td className="px-2 py-1">{a.year}</td>
              <td className="px-2 py-1">{a.quarter}</td>
              <td className="px-2 py-1">
                {a.lecturerId ? `${lecturers[a.lecturerId]?.firstname} ${lecturers[a.lecturerId]?.lastname}` : '-'}
              </td>
            </tr>
          ))}
          {assignments.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-sm text-muted-foreground">
                Keine Planungen vorhanden
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
