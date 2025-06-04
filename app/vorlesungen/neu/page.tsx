'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { lectureService } from '@/lib/lectureService';
import { studyProgramService } from '@/lib/studyProgramService';
import { Lecture, StudyProgram } from '@/lib/types';

export default function NewLecturePage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<StudyProgram[]>([]);
  const [form, setForm] = useState<Omit<Lecture, 'id' | 'createdAt' | 'updatedAt'>>({
    studyProgramId: '',
    semester: 1,
    title: '',
    hours: 1,
  });

  useEffect(() => {
    studyProgramService.getAll().then(setPrograms);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'semester' || name === 'hours' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLecture: Lecture = {
      ...form,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await lectureService.create(newLecture);
    router.push('/vorlesungen');
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Neue Vorlesung</h1>
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
          <label className="block mb-1">Semester</label>
          <input type="number" name="semester" className="border w-full p-2" value={form.semester} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1">Titel</label>
          <input name="title" className="border w-full p-2" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1">Stunden</label>
          <input type="number" name="hours" className="border w-full p-2" value={form.hours} onChange={handleChange} required />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Speichern</button>
      </form>
    </div>
  );
}
