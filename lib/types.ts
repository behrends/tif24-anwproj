export interface Lecturer {
  id: string;
  firstname: string;
  lastname: string;
  title?: string;
  email?: string;
  type: 'internal' | 'external';
  yearlyHoursLimit?: number;
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
  createdAt: string;
  updatedAt: string;
}

export interface Lecture {
  id: string;
  studyProgramId: string;
  semester: number;
  title: string;
  hours: number;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  studyProgramId: string;
  name: string;
  startYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  lectureId: string;
  courseId: string;
  year: number;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  lecturerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationData {
  lecturers: Lecturer[];
  users: User[];
  studyPrograms: StudyProgram[];
  lectures: Lecture[];
  courses: Course[];
  assignments: Assignment[];
}
