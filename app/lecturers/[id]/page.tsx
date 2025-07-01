import { notFound } from 'next/navigation';
import Link from 'next/link';
import { lecturers } from '../data';

export default function LecturerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const lecturer = lecturers.find((l) => l.id === params.id);

  if (!lecturer) {
    notFound();
  }

  const fullName = `${lecturer?.title ? lecturer.title + ' ' : ''}${lecturer?.name}`;

  return (
    <div className="container mx-auto p-6 space-y-4">
      <Link href="/lecturers" className="text-sm text-blue-600 underline">
        ← Zurück
      </Link>
      <h1 className="text-3xl font-bold">{fullName}</h1>
      <p className="text-sm">📧 {lecturer?.email}</p>
      <p className="text-sm">📞 {lecturer?.phone}</p>
      <p className="text-sm">
        Typ: {lecturer?.type === 'internal' ? 'Intern' : 'Extern'}
      </p>
    </div>
  );
}
