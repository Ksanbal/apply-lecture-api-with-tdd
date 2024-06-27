import { Test, TestingModule } from '@nestjs/testing';
import {
  APPLICATION_REPOSITORY_TOKEN,
  ApplicationRepositoryImpl,
} from 'src/lectures/repository/application.repository.impl';
import {
  LECTURE_REPOSITORY_TOKEN,
  LectureRepositoryImpl,
} from 'src/lectures/repository/lectures.repository.impl';
import { ILecturesService } from 'src/lectures/service/lectures.service';
import {
  LECTURE_SERVICE_TOKEN,
  LecturesServiceImpl,
} from 'src/lectures/service/lectures.service.impl';
import { PrismaService } from 'src/prisma.service';

describe('LecturesService', () => {
  let service: ILecturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<ILecturesService>(LECTURE_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
