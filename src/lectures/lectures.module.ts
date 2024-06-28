import { Module } from '@nestjs/common';
import { LecturesController } from './controller/lectures.controller';
import { PrismaService } from 'src/prisma.service';
import {
  LECTURE_SERVICE_TOKEN,
  LecturesServiceImpl,
} from './service/lectures.service.impl';
import {
  LECTURE_REPOSITORY_TOKEN,
  LectureRepositoryImpl,
} from './repository/lectures.repository.impl';
import {
  APPLICATION_REPOSITORY_TOKEN,
  ApplicationRepositoryImpl,
} from './repository/application.repository.impl';

@Module({
  controllers: [LecturesController],
  providers: [
    // Serivce
    {
      provide: LECTURE_SERVICE_TOKEN,
      useClass: LecturesServiceImpl,
    },
    // Repository
    {
      provide: LECTURE_REPOSITORY_TOKEN,
      useClass: LectureRepositoryImpl,
    },
    {
      provide: APPLICATION_REPOSITORY_TOKEN,
      useClass: ApplicationRepositoryImpl,
    },
    // DB
    PrismaService,
  ],
})
export class LecturesModule {}
