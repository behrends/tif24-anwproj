import { DataService } from './dataService';
import { Lecture } from './types';

export class LocalStorageLectureService extends DataService<Lecture> {
  protected storageKey = 'lectures';
}

export const lectureService = new LocalStorageLectureService();
