import { Application } from '@prisma/client';

export class ApplicationDomain {
  id: number;
  createdAt: Date;
  lectureId: number;
  userId: number;

  constructor(entity: Application) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.lectureId = entity.lectureId;
    this.userId = entity.userId;
  }
}
