export interface LecturerOverview {
  id: string;
  name: string;
  title?: string;
  email: string;
  phone: string;
  type: 'internal' | 'external';
  yearlyHours: number;
  yearlyLimit?: number;
  expertise: string[];
  quarters: Record<'Q1' | 'Q2' | 'Q3' | 'Q4', number>;
  warning?: string;
  status?: 'ok' | 'warning';
}

export const lecturers: LecturerOverview[] = [
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
    name: 'Hans M\u00fcller',
    title: 'Dr.',
    email: 'mueller@extern.de',
    phone: '+49 711 987-654',
    type: 'external',
    yearlyHours: 215,
    yearlyLimit: 240,
    expertise: ['Informatik', 'Programmierung'],
    quarters: { Q1: 80, Q2: 75, Q3: 60, Q4: 0 },
    warning: 'Nur noch 25h Kapazit\u00e4t verf\u00fcgbar!',
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
