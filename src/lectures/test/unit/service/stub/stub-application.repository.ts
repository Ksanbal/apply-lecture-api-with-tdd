import { ApplicationDomain } from 'src/lectures/service/domain/application.domain';
import { IApplicationRepository } from 'src/lectures/service/repository/application.repository';

export class StubApplicationRepository implements IApplicationRepository {
  private applications: ApplicationDomain[] = [];

  setup(applications: ApplicationDomain[]): void {
    this.applications = applications;
  }

  async findById(
    lectureId: number,
    userId: number,
  ): Promise<ApplicationDomain | null> {
    return this.applications.find(
      (application) =>
        application.lectureId === lectureId && application.userId === userId,
    );
  }

  async create(
    lectureId: number,
    userId: number,
  ): Promise<ApplicationDomain | null> {
    const application: ApplicationDomain = {
      id: this.applications.length + 1,
      createdAt: new Date(),
      lectureId,
      userId,
    };
    this.applications.push(application);
    return application;
  }
}
