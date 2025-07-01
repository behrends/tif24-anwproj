'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { ProgressBar } from '@/components/ui/progress';

export default function ProgramPlanningPage({
  params,
}: {
  params: { programId: string };
}) {
  // In a real app we'd fetch data based on params.programId
  const [quarter, setQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q2');

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'] as const;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Quartalsplanung: BWL {quarter} 2024
        </h1>
        <Button>💾 Speichern</Button>
      </div>

      <div className="flex gap-3">
        {quarters.map((q) => (
          <Button
            key={q}
            variant={quarter === q ? 'default' : 'outline'}
            size="sm"
            onClick={() => setQuarter(q)}
          >
            {q} 2024
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          Studiengang:
          <select className="ml-2 border rounded p-1 text-sm">
            <option>BWL</option>
          </select>
        </div>
        <div>
          Kurs:
          <select className="ml-2 border rounded p-1 text-sm">
            <option>BWL Kurs 2024</option>
            <option>BWL Kurs 2023</option>
            <option>BWL Kurs 2022</option>
          </select>
        </div>
        <div>
          Jahr:
          <select className="ml-2 border rounded p-1 text-sm">
            <option>2024</option>
          </select>
        </div>
      </div>

      {/* Kurs 2024 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            🎓 BWL Kurs 2024 <span className="text-sm font-normal">(Semester 1)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 text-left">Vorlesung</th>
                <th className="px-4 py-2 text-left">Std</th>
                <th className="px-4 py-2 text-left">Dozent*in</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-b-0">
                <td className="px-4 py-2">Marketing Grundlagen</td>
                <td className="px-4 py-2">20h</td>
                <td className="px-4 py-2">Dr. Schmidt</td>
                <td className="px-4 py-2">
                  <StatusBadge status="complete">OK</StatusBadge>
                </td>
              </tr>
              <tr className="border-b last:border-b-0">
                <td className="px-4 py-2">Controlling Basics</td>
                <td className="px-4 py-2">16h</td>
                <td className="px-4 py-2">-- Auswählen --</td>
                <td className="px-4 py-2">
                  <StatusBadge status="empty">Offen</StatusBadge>
                </td>
              </tr>
              <tr className="border-b last:border-b-0">
                <td className="px-4 py-2">Projektmanagement</td>
                <td className="px-4 py-2">12h</td>
                <td className="px-4 py-2">Prof. Müller</td>
                <td className="px-4 py-2">
                  <StatusBadge status="warning">Limit</StatusBadge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Wirtschaftsmathematik</td>
                <td className="px-4 py-2">24h</td>
                <td className="px-4 py-2">M. Weber</td>
                <td className="px-4 py-2">
                  <StatusBadge status="complete">OK</StatusBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Kurs 2023 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            🎓 BWL Kurs 2023 <span className="text-sm font-normal">(Semester 3)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 text-left">Vorlesung</th>
                <th className="px-4 py-2 text-left">Std</th>
                <th className="px-4 py-2 text-left">Dozent*in</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-b-0">
                <td className="px-4 py-2">Unternehmensführung</td>
                <td className="px-4 py-2">24h</td>
                <td className="px-4 py-2">Prof. Weber</td>
                <td className="px-4 py-2">
                  <StatusBadge status="complete">OK</StatusBadge>
                </td>
              </tr>
              <tr className="border-b last:border-b-0">
                <td className="px-4 py-2">Wirtschaftsrecht</td>
                <td className="px-4 py-2">18h</td>
                <td className="px-4 py-2">-- Auswählen --</td>
                <td className="px-4 py-2">
                  <StatusBadge status="empty">Offen</StatusBadge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Strategisches Management</td>
                <td className="px-4 py-2">20h</td>
                <td className="px-4 py-2">Dr. Schmidt</td>
                <td className="px-4 py-2">
                  <StatusBadge status="complete">OK</StatusBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Kurs 2022 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            🎓 BWL Kurs 2022 <span className="text-sm font-normal">(Semester 5)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 text-left">Vorlesung</th>
                <th className="px-4 py-2 text-left">Std</th>
                <th className="px-4 py-2 text-left">Dozent*in</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-b-0">
                <td className="px-4 py-2">Masterarbeit Betreuung</td>
                <td className="px-4 py-2">8h</td>
                <td className="px-4 py-2">Prof. Müller</td>
                <td className="px-4 py-2">
                  <StatusBadge status="warning">Limit</StatusBadge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Kolloquium</td>
                <td className="px-4 py-2">4h</td>
                <td className="px-4 py-2">-- Auswählen --</td>
                <td className="px-4 py-2">
                  <StatusBadge status="empty">Offen</StatusBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quartals-Zusammenfassung</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-2">
            Gesamt geplant: <span className="font-medium">146h</span> │ Unbelegt:{' '}
            <span className="font-medium">22h</span>
          </p>
          <ProgressBar value={146} max={168} showText={false} />
          <p className="text-sm text-muted-foreground mt-1">Status: 87%</p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" size="sm">📊 Stundenübersicht</Button>
        <Button variant="outline" size="sm">📄 Exportieren</Button>
        <Button variant="outline" size="sm">🔄 Kopieren von Q1</Button>
      </div>

      <div>
        <Link href="/planning" className="text-sm text-blue-600 underline">
          ← Zurück zur Übersicht
        </Link>
      </div>
    </div>
  );
}

