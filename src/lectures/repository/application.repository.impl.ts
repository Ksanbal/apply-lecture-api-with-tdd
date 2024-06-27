import { Injectable } from '@nestjs/common';
import { IApplicationRepository } from '../service/repository/application.repository';
import { ApplicationDomain } from '../service/domain/application.domain';
import { PrismaService } from 'src/prisma.service';

export const APPLICATION_REPOSITORY_TOKEN = Symbol('IApplicationRepository');

@Injectable()
export class ApplicationRepositoryImpl implements IApplicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(
    lectureId: number,
    userId: number,
  ): Promise<ApplicationDomain | null> {
    const application = await this.prisma.application.findFirst({
      where: {
        userId,
        lectureId,
      },
    });

    if (application === null) return null;

    return new ApplicationDomain(application);
  }

  async create(
    lectureId: number,
    userId: number,
  ): Promise<ApplicationDomain | null> {
    const application = await this.prisma.application.create({
      data: {
        userId,
        lectureId,
      },
    });
    if (application === null) return null;

    return new ApplicationDomain(application);
  }
}
