'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { studyProgramService } from '@/lib/studyProgramService';
import { StudyProgram } from '@/lib/types';

export default function NewStudyProgram() {
  const router = useRouter();
  const [form, setForm] = useState<Omit<StudyProgram, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    shortName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProgram: StudyProgram = {
      ...form,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await studyProgramService.create(newProgram);
    router.push('/studiengaenge');
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Neuer Studiengang</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" className="border w-full p-2" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1">Kurzname</label>
          <input name="shortName" className="border w-full p-2" value={form.shortName} onChange={handleChange} required />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Speichern</button>
      </form>
    </div>
  );
}
