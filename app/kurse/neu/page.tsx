'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { courseService } from '@/lib/courseService';
import { studyProgramService } from '@/lib/studyProgramService';
import { Course, StudyProgram } from '@/lib/types';

export default function NewCoursePage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<StudyProgram[]>([]);
  const [form, setForm] = useState<Omit<Course, 'id' | 'createdAt' | 'updatedAt'>>({
    studyProgramId: '',
    name: '',
    startYear: new Date().getFullYear(),
  });

  useEffect(() => {
    studyProgramService.getAll().then(setPrograms);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'startYear' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      ...form,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await courseService.create(newCourse);
    router.push('/kurse');
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Neuer Kurs</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Studiengang</label>
          <select name="studyProgramId" className="border w-full p-2" value={form.studyProgramId} onChange={handleChange} required>
            <option value="">Bitte wählen</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.shortName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" className="border w-full p-2" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1">Startjahr</label>
          <input type="number" name="startYear" className="border w-full p-2" value={form.startYear} onChange={handleChange} required />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Speichern</button>
      </form>
    </div>
  );
}
