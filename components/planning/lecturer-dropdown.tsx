'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LecturerOption {
  id: string;
  name: string;
  type: 'internal' | 'external';
  email: string;
  currentHours: number;
  limit?: number;
  expertise?: string;
  status: 'available' | 'warning' | 'unavailable';
}

export function LecturerDropdown() {
  const [search, setSearch] = useState('');

  const lecturers: LecturerOption[] = [
    {
      id: '1',
      name: 'Dr. Anna Schmidt',
      type: 'internal',
      email: 'schmidt@dhbw.de',
      currentHours: 45,
      expertise: 'Marketing-Expertin',
      status: 'available',
    },
    {
      id: '2',
      name: 'Prof. Lisa Weber',
      type: 'internal',
      email: 'weber@dhbw.de',
      currentHours: 120,
      expertise: 'kann Marketing',
      status: 'available',
    },
    {
      id: '3',
      name: 'Dr. Hans Müller',
      type: 'external',
      email: 'mueller@extern.de',
      currentHours: 215,
      limit: 240,
      expertise: 'Nur noch 25h Kapazität!',
      status: 'warning',
    },
    {
      id: '4',
      name: 'M. Fischer',
      type: 'external',
      email: 'fischer@extern.de',
      currentHours: 240,
      limit: 240,
      status: 'unavailable',
    },
  ];

  const filtered = lecturers.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const sections: { title: string; status: LecturerOption['status'] }[] = [
    { title: '✅ VERFÜGBAR', status: 'available' },
    { title: '⚠️  GRENZBEREICH', status: 'warning' },
    { title: '❌ NICHT VERFÜGBAR', status: 'unavailable' },
  ];

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="text-lg">
          Dozent*in für "Marketing Grundlagen" (20h) auswählen:
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Suchen..."
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        {sections.map(({ title, status }) => (
          <div key={status} className="space-y-3">
            <h3 className="text-sm font-semibold">{title}</h3>
            {filtered
              .filter((l) => l.status === status)
              .map((l) => (
                <div
                  key={l.id}
                  className="border rounded-lg p-4 space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {l.name} ({l.type === 'internal' ? 'Intern' : 'Extern'})
                    </span>
                    <Button
                      size="sm"
                      variant={
                        status === 'unavailable'
                          ? 'secondary'
                          : status === 'warning'
                          ? 'outline'
                          : 'outline'
                      }
                      disabled={status === 'unavailable'}
                    >
                      {status === 'warning'
                        ? '⚠️ Auswählen'
                        : status === 'unavailable'
                        ? '❌ Belegt'
                        : 'Auswählen'}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {status === 'warning'
                      ? `📊 2024: 215/240h → Würde 235/240h werden`
                      : status === 'unavailable'
                      ? '📊 2024: 240/240h - Limit erreicht'
                      : `📊 2024: ${l.currentHours}h belegt, ${l.expertise}`}
                  </p>
                  <p className="text-sm text-muted-foreground">📧 {l.email}</p>
                  {status === 'warning' && l.expertise && (
                    <p className="text-sm text-orange-600">⚠️ {l.expertise}</p>
                  )}
                </div>
              ))}
          </div>
        ))}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1">
            👥 + Neue*n Dozent*in anlegen
          </Button>
          <Button variant="ghost" className="flex-1">
            ❌ Abbrechen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LecturerDropdown;
