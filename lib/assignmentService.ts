import { DataService } from './dataService';
import { Assignment } from './types';

export class LocalStorageAssignmentService extends DataService<Assignment> {
  protected storageKey = 'assignments';
}

export const assignmentService = new LocalStorageAssignmentService();
