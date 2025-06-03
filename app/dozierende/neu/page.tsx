'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { lecturerService } from '@/lib/lecturerService';
import { Lecturer } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export default function NewLecturerPage() {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Lecturer, 'id' | 'createdAt' | 'updatedAt'>>({
    firstname: '',
    lastname: '',
    title: '',
    email: '',
    type: 'internal',
    yearlyHoursLimit: 240,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLecturer: Lecturer = {
      ...form,
      yearlyHoursLimit: form.type === 'external' ? Number(form.yearlyHoursLimit) : undefined,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await lecturerService.create(newLecturer);
    router.push('/dozierende');
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Neue*r Dozent*in</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Vorname</label>
          <input name="firstname" className="border w-full p-2" value={form.firstname} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1">Nachname</label>
          <input name="lastname" className="border w-full p-2" value={form.lastname} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1">Titel</label>
          <input name="title" className="border w-full p-2" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1">E-Mail</label>
          <input type="email" name="email" className="border w-full p-2" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1">Typ</label>
          <select name="type" className="border w-full p-2" value={form.type} onChange={handleChange}>
            <option value="internal">Intern</option>
            <option value="external">Extern</option>
          </select>
        </div>
        {form.type === 'external' && (
          <div>
            <label className="block mb-1">Jahresstundenlimit</label>
            <input
              type="number"
              name="yearlyHoursLimit"
              className="border w-full p-2"
              value={form.yearlyHoursLimit}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          Speichern
        </button>
      </form>
    </div>
  );
}
