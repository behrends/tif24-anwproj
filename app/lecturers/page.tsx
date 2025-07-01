"use client";
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar, BlockProgressBar } from '@/components/ui/progress';
import type { Quarter } from '@/lib/types';

interface LecturerOverview {
  id: string;
  name: string;
  title?: string;
  email: string;
  phone: string;
  type: 'internal' | 'external';
  yearlyHours: number;
  yearlyLimit?: number;
  expertise: string[];
  quarters: Record<Quarter, number>;
  warning?: string;
  status?: 'ok' | 'warning';
}

const lecturers: LecturerOverview[] = [
  {
    id: '1',
    name: 'Anna Schmidt',
    title: 'Prof. Dr.',
    email: 'schmidt@dhbw.de',
    phone: '+49 721 123-456',
    type: 'internal',
    yearlyHours: 85,
    expertise: ['Marketing', 'BWL Grundlagen'],
    quarters: { Q1: 25, Q2: 40, Q3: 20, Q4: 0 },
    status: 'ok',
  },
  {
    id: '2',
    name: 'Hans Müller',
    title: 'Dr.',
    email: 'mueller@extern.de',
    phone: '+49 711 987-654',
    type: 'external',
    yearlyHours: 215,
    yearlyLimit: 240,
    expertise: ['Informatik', 'Programmierung'],
    quarters: { Q1: 80, Q2: 75, Q3: 60, Q4: 0 },
    warning: 'Nur noch 25h Kapazität verfügbar!',
    status: 'warning',
  },
  {
    id: '3',
    name: 'Sarah Weber',
    title: 'M.',
    email: 'weber@beratung.de',
    phone: '+49 621 456-789',
    type: 'external',
    yearlyHours: 160,
    yearlyLimit: 240,
    expertise: ['Projektmanagement', 'Consulting'],
    quarters: { Q1: 40, Q2: 60, Q3: 60, Q4: 0 },
    status: 'ok',
  },
];

export default function LecturersPage() {
  const [filter, setFilter] = useState<'all' | 'internal' | 'external'>('all');
  const [search, setSearch] = useState('');

  const filtered = lecturers.filter((lec) => {
    const matchesType =
      filter === 'all' || lec.type === filter;
    const matchesSearch =
      lec.name.toLowerCase().includes(search.toLowerCase()) ||
      lec.email.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">👥 Dozierende</h1>
        <Button size="sm">➕ Hinzufügen</Button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            🔍 Alle
          </Button>
          <Button
            variant={filter === 'internal' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('internal')}
          >
            🏢 Intern
          </Button>
          <Button
            variant={filter === 'external' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('external')}
          >
            🌐 Extern
          </Button>
        </div>
        <input
          type="text"
          placeholder="Suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 flex-1 min-w-[180px]"
        />
      </div>

      <div className="space-y-6">
        {filtered.map((lec) => {
          const fullName = `${lec.title ? lec.title + ' ' : ''}${lec.name}`;
          const progress = lec.yearlyLimit
            ? Math.round((lec.yearlyHours / lec.yearlyLimit) * 100)
            : undefined;
          return (
            <Card key={lec.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span>👤</span>
                  <span>
                    {fullName} ({lec.type === 'internal' ? 'Intern' : 'Extern'})
                  </span>
                  {lec.status === 'warning' && <span>⚠️</span>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span>📧 {lec.email}</span>
                  <span>📞 {lec.phone}</span>
                </div>
                <div>
                  {lec.yearlyLimit ? (
                    <div className="space-y-1">
                      <div>
                        📊 2024: {lec.yearlyHours}/{lec.yearlyLimit}h
                      </div>
                      <ProgressBar
                        value={lec.yearlyHours}
                        max={lec.yearlyLimit}
                        showText={false}
                        variant={progress && progress >= 90 ? 'danger' : 'warning'}
                      />
                      <div className="text-xs text-muted-foreground">
                        {progress}%
                      </div>
                    </div>
                  ) : (
                    <div>📊 2024: {lec.yearlyHours}h geplant (unbegrenzt)</div>
                  )}
                </div>
                <div>
                  🎯 Fachgebiete: {lec.expertise.join(', ')}
                </div>
                <div className="text-sm">
                  Q1: {lec.quarters.Q1}h | Q2: {lec.quarters.Q2}h | Q3:{' '}
                  {lec.quarters.Q3}h | Q4: {lec.quarters.Q4}h
                </div>
                <div className="flex gap-2">
                  <BlockProgressBar value={lec.quarters.Q1} max={40} blocks={4} />
                  <BlockProgressBar value={lec.quarters.Q2} max={40} blocks={4} />
                  <BlockProgressBar value={lec.quarters.Q3} max={40} blocks={4} />
                  <BlockProgressBar value={lec.quarters.Q4} max={40} blocks={4} />
                </div>
                {lec.warning && (
                  <div className="text-sm text-orange-600 flex items-center gap-1">
                    ⚠️ {lec.warning}
                  </div>
                )}
                <div className="pt-2 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    ✏️ Bearbeiten
                  </Button>
                  <Button variant="outline" size="sm">
                    📊 Details
                  </Button>
                  <Button variant="outline" size="sm">
                    📅 Planung anzeigen
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Statistik */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistik</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Gesamt: 15 Dozierende | Intern: 8 | Extern: 7
            <br />Externe mit &gt;200h: 2 | Externe am Limit: 1
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
