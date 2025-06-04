import { DataService } from './dataService';
import { Course } from './types';

export class LocalStorageCourseService extends DataService<Course> {
  protected storageKey = 'courses';
}

export const courseService = new LocalStorageCourseService();
