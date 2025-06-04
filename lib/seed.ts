import { ApplicationData, Lecturer, StudyProgram, Lecture, Course, Assignment } from './types';
import { lecturerService } from './lecturerService';
import { studyProgramService } from './studyProgramService';
import { lectureService } from './lectureService';
import { courseService } from './courseService';
import { assignmentService } from './assignmentService';

const seedData: ApplicationData = {
  lecturers: [
    {
      id: '1',
      firstname: 'Max',
      lastname: 'Mustermann',
      title: 'Dr.',
      email: 'max@example.com',
      type: 'external',
      yearlyHoursLimit: 240,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  users: [],
  studyPrograms: [
    { id: '1', name: 'Betriebswirtschaftslehre', shortName: 'BWL', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', name: 'Informatik', shortName: 'INF', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  lectures: [
    {
      id: '1',
      studyProgramId: '1',
      semester: 1,
      title: 'Marketing Grundlagen',
      hours: 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      studyProgramId: '1',
      semester: 1,
      title: 'Controlling Basics',
      hours: 16,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  courses: [
    { id: '1', studyProgramId: '1', name: 'BWL Kurs 2024', startYear: 2024, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', studyProgramId: '1', name: 'BWL Kurs 2023', startYear: 2023, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  assignments: [
    { id: '1', lectureId: '1', courseId: '1', year: 2024, quarter: 'Q2', lecturerId: '1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
};

export async function initData() {
  if (typeof window === 'undefined') return;
  const lecturers = await lecturerService.getAll();
  if (lecturers.length === 0) {
    localStorage.setItem('lecturers', JSON.stringify(seedData.lecturers));
    localStorage.setItem('studyPrograms', JSON.stringify(seedData.studyPrograms));
    localStorage.setItem('lectures', JSON.stringify(seedData.lectures));
    localStorage.setItem('courses', JSON.stringify(seedData.courses));
    localStorage.setItem('assignments', JSON.stringify(seedData.assignments));
  }
}
