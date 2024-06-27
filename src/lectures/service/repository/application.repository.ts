import { ApplicationDomain } from '../domain/application.domain';

export interface IApplicationRepository {
  findById(
    lectureId: number,
    userId: number,
  ): Promise<ApplicationDomain | null>;
  create(lectureId: number, userId: number): Promise<ApplicationDomain | null>;
}
