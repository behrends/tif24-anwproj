import { DataService } from './dataService';
import { Lecturer } from './types';

export class LocalStorageLecturerService extends DataService<Lecturer> {
  protected storageKey = 'lecturers';
}

export const lecturerService = new LocalStorageLecturerService();
