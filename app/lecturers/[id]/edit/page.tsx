import Link from 'next/link';
import { lecturers } from '../../data';
import { notFound } from 'next/navigation';

export default function LecturerEditPage({
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
      <Link href={`/lecturers/${params.id}`} className="text-sm text-blue-600 underline">
        ← Zurück
      </Link>
      <h1 className="text-2xl font-bold">{fullName} bearbeiten</h1>
      <p className="text-muted-foreground">
        Diese Seite ist ein Platzhalter f\u00fcr das Bearbeitungsformular.
      </p>
    </div>
  );
}
