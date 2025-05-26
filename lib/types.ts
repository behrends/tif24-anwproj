// Core Types für das DHBW Vorlesungsplanung System
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type PlanningStatus = 'complete' | 'partial' | 'empty';
export type LecturerType = 'internal' | 'external';

export interface Lecturer {
  id: string;
  firstname: string;
  lastname: string;
  title?: string;
  email?: string;
  phone?: string;
  type: LecturerType;
  yearlyHoursLimit?: number; // nur für externe
  expertise?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  title?: string;
  email: string;
  role: 'admin' | 'user';
  assignedStudyPrograms: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StudyProgram {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  semesters: number; // Anzahl Semester (z.B. 6)
  createdAt: string;
  updatedAt: string;
}

// Feste Vorlesungen pro Studiengang
export interface Lecture {
  id: string;
  studyProgramId: string; // Gehört zu welchem Studiengang
  semester: number; // Semester 1-6
  title: string; // "Marketing Grundlagen"
  hours: number; // 20h
  createdAt: string;
  updatedAt: string;
}

// Kurs = Konkrete Kohorte (z.B. "BWL Kurs 2024")
export interface Course {
  id: string;
  studyProgramId: string; // Gehört zu welchem Studiengang
  name: string; // "BWL Kurs 2024"
  startYear: number; // 2024 (Startjahr der Kohorte)
  createdAt: string;
  updatedAt: string;
}

// Zuordnung: Welcher Dozent macht welche Vorlesung für welchen Kurs?
export interface Assignment {
  id: string;
  lectureId: string; // Referenz zur Vorlesung
  courseId: string; // Für welchen Kurs
  year: number; // 2024
  quarter: Quarter;
  lecturerId?: string; // Welcher Dozent (optional = noch nicht geplant)
  createdAt: string;
  updatedAt: string;
}

// Dashboard-spezifische Types
export interface StudyProgramStatus {
  id: string;
  name: string;
  shortName: string;
  quarters: Record<
    Quarter,
    {
      status: PlanningStatus;
      percentage: number;
      totalLectures: number;
      assignedLectures: number;
    }
  >;
  courses: string[];
}

export interface LecturerCapacity {
  lecturer: Lecturer;
  currentHours: number;
  limit: number;
  percentage: number;
  quarterBreakdown: Record<Quarter, number>;
  isWarning: boolean;
  isCritical: boolean;
}

export interface QuarterOverview {
  quarter: Quarter;
  year: number;
  totalHours: number;
  assignedHours: number;
  percentage: number;
  status: PlanningStatus;
}
