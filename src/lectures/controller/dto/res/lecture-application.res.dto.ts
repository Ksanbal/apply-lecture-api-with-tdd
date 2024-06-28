import { ApplicationDomain } from 'src/lectures/service/domain/application.domain';

export class LectureApplicationResDto {
  id: number;
  createdAt: Date;

  constructor(domain: ApplicationDomain) {
    this.id = domain.id;
    this.createdAt = domain.createdAt;
  }
}
