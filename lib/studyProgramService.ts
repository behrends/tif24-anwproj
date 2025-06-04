import { DataService } from './dataService';
import { StudyProgram } from './types';

export class LocalStorageStudyProgramService extends DataService<StudyProgram> {
  protected storageKey = 'studyPrograms';
}

export const studyProgramService = new LocalStorageStudyProgramService();
