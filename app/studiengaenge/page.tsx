import React from 'react';

export default function Studiengaenge() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Studiengänge</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for degree programs - will be replaced with actual data later */}
        {[
          'Informatik',
          'Wirtschaftsinformatik',
          'BWL',
          'Maschinenbau',
        ].map((studiengang) => (
          <div
            key={studiengang}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{studiengang}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Vorlesungen und Details zum Studiengang {studiengang}
            </p>
            <button className="mt-4 text-sm text-blue-600 hover:underline">
              Details anzeigen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
