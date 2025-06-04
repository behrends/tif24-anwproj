'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { assignmentService } from '@/lib/assignmentService';
import { lectureService } from '@/lib/lectureService';
import { courseService } from '@/lib/courseService';
import { lecturerService } from '@/lib/lecturerService';
import { Assignment, Lecture, Course, Lecturer } from '@/lib/types';

export default function NewAssignmentPage() {
  const router = useRouter();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  const [form, setForm] = useState<Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>>({
    lectureId: '',
    courseId: '',
    year: new Date().getFullYear(),
    quarter: 'Q1',
    lecturerId: '',
  });

  useEffect(() => {
    lectureService.getAll().then(setLectures);
    courseService.getAll().then(setCourses);
    lecturerService.getAll().then(setLecturers);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'year' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAssignment: Assignment = {
      ...form,
      lecturerId: form.lecturerId || undefined,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await assignmentService.create(newAssignment);
    router.push('/planung');
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Neue Planung</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Vorlesung</label>
          <select name="lectureId" className="border w-full p-2" value={form.lectureId} onChange={handleChange} required>
            <option value="">Bitte wählen</option>
            {lectures.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Kurs</label>
          <select name="courseId" className="border w-full p-2" value={form.courseId} onChange={handleChange} required>
            <option value="">Bitte wählen</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Jahr</label>
          <input type="number" name="year" className="border w-full p-2" value={form.year} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1">Quartal</label>
          <select name="quarter" className="border w-full p-2" value={form.quarter} onChange={handleChange} required>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Dozent*in (optional)</label>
          <select name="lecturerId" className="border w-full p-2" value={form.lecturerId} onChange={handleChange}>
            <option value="">-- unbesetzt --</option>
            {lecturers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.firstname} {l.lastname}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Speichern</button>
      </form>
    </div>
  );
}
