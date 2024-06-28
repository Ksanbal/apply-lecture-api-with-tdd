import { ApplicationDomain } from './domain/application.domain';
import { LectureDomain } from './domain/lectures.domain';

export interface ILecturesService {
  list(): Promise<LectureDomain[]>;
  apply(lectureId: number, userId: number): Promise<LectureDomain>;
  getApplication(lectureId: number, userId: number): Promise<ApplicationDomain>;
}
