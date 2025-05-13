import React from 'react';
import Link from 'next/link';

// Define a type for our study programs
interface Studiengang {
  id: string;
  name: string;
  description: string;
}

// Sample data for study programs
const studiengaenge: Studiengang[] = [
  {
    id: 'informatik',
    name: 'Informatik',
    description: 'Vorlesungen und Details zum Studiengang Informatik'
  },
  {
    id: 'wirtschaftsinformatik',
    name: 'Wirtschaftsinformatik',
    description: 'Vorlesungen und Details zum Studiengang Wirtschaftsinformatik'
  },
  {
    id: 'bwl',
    name: 'BWL',
    description: 'Vorlesungen und Details zum Studiengang BWL'
  },
  {
    id: 'maschinenbau',
    name: 'Maschinenbau',
    description: 'Vorlesungen und Details zum Studiengang Maschinenbau'
  },
];

export default function Studiengaenge() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Studiengänge</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {studiengaenge.map((studiengang) => (
          <div
            key={studiengang.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{studiengang.name}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              {studiengang.description}
            </p>
            <Link 
              href={`/studiengaenge/${studiengang.id}`} 
              className="mt-4 inline-block text-sm text-blue-600 hover:underline"
            >
              Details anzeigen
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
