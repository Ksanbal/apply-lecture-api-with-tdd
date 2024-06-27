import { Application } from '@prisma/client';

export class ApplicationDomain {
  id: number;
  createdAt: Date;

  constructor(entity: Application) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
  }
}
