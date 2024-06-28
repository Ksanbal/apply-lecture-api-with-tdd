import { Test, TestingModule } from '@nestjs/testing';
import { APPLICATION_REPOSITORY_TOKEN } from 'src/lectures/repository/application.repository.impl';
import { LECTURE_REPOSITORY_TOKEN } from 'src/lectures/repository/lectures.repository.impl';
import { LectureDomain } from 'src/lectures/service/domain/lectures.domain';
import { ILecturesService } from 'src/lectures/service/lectures.service';
import {
  LECTURE_SERVICE_TOKEN,
  LecturesServiceImpl,
} from 'src/lectures/service/lectures.service.impl';
import { PrismaService } from 'src/prisma.service';
import { StubLectureRepository } from './stub/stub-lecture.repository';
import { StubApplicationRepository } from './stub/stub-application.repository';

describe('LecturesService', () => {
  let service: ILecturesService;
  let stubLectureRepository: StubLectureRepository;
  let stubApplicationRepository: StubApplicationRepository;

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
          useClass: StubLectureRepository,
        },
        {
          provide: APPLICATION_REPOSITORY_TOKEN,
          useClass: StubApplicationRepository,
        },
        // DB
        PrismaService,
      ],
    }).compile();

    service = module.get<ILecturesService>(LECTURE_SERVICE_TOKEN);
    stubLectureRepository = module.get<StubLectureRepository>(
      LECTURE_REPOSITORY_TOKEN,
    );
    stubApplicationRepository = module.get<StubApplicationRepository>(
      APPLICATION_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // list 강의 목록 조회
  describe('강의 목록 조회', () => {
    it('강의 목록을 반환합니다.', async () => {
      // Given
      stubLectureRepository.setup([
        {
          id: 1,
          createdAt: new Date(),
          date: new Date(),
          maxSeat: 10,
          leftSeat: 10,
          detail: {
            id: 1,
            createdAt: new Date(),
            name: '카리나의 외모',
          },
        },
        {
          id: 2,
          createdAt: new Date(),
          date: new Date(),
          maxSeat: 10,
          leftSeat: 10,
          detail: {
            id: 1,
            createdAt: new Date(),
            name: '윈터의 귀여움',
          },
        },
      ]);

      // When
      const result = service.list();

      // Then
      expect(result).resolves.toEqual(expect.any(Array<LectureDomain>));
    });
  });

  // apply 강의 신청
  describe('강의 신청', () => {
    it('강의 정보가 존재하지 않는 경우 404 에러가 발생합니다', async () => {
      // Given
      const lectureId = 1;
      const userId = 1;
      stubLectureRepository.setup([]);

      // When
      const result = service.apply(lectureId, userId);

      // Then
      expect(result).rejects.toThrow('특강이 존재하지 않습니다');
    });

    it('이미 종료된 강의인 경우 400 에러가 발생합니다', () => {
      // Given
      const lectureId = 1;
      const userId = 1;
      const fakeDate = new Date('2000-04-11');
      stubLectureRepository.setup([
        {
          id: lectureId,
          createdAt: fakeDate,
          date: fakeDate,
          maxSeat: 10,
          leftSeat: 10,
          detail: {
            id: 1,
            createdAt: fakeDate,
            name: '카리나의 외모',
          },
        },
      ]);

      // When
      const result = service.apply(lectureId, userId);

      // Then
      expect(result).rejects.toThrow('이미 종료된 특강입니다 🙏');
    });

    it('이미 마감된 강의인 경우 400 에러가 발생합니다', () => {
      // Given
      const lectureId = 1;
      const userId = 1;
      const fakeDate = new Date('2030-04-11');
      stubLectureRepository.setup([
        {
          id: lectureId,
          createdAt: fakeDate,
          date: fakeDate,
          maxSeat: 10,
          leftSeat: 0,
          detail: {
            id: 1,
            createdAt: fakeDate,
            name: '카리나의 외모',
          },
        },
      ]);

      // When
      const result = service.apply(lectureId, userId);

      // Then
      expect(result).rejects.toThrow('특강이 마감되었습니다 🙏');
    });

    it('이미 신청한 기록이 있다면 400 에러가 발생합니다', async () => {
      // Given : 해당 유저로 신청 생성
      const lectureId = 1;
      const userId = 1;
      const fakeDate = new Date('2030-04-11');
      stubLectureRepository.setup([
        {
          id: lectureId,
          createdAt: fakeDate,
          date: fakeDate,
          maxSeat: 10,
          leftSeat: 9,
          detail: {
            id: 1,
            createdAt: fakeDate,
            name: '카리나의 외모',
          },
        },
      ]);

      stubApplicationRepository.setup([
        {
          id: 1,
          createdAt: new Date(),
          lectureId,
          userId,
        },
      ]);

      // When
      const result = service.apply(lectureId, userId);

      // Then
      expect(result).rejects.toThrow('이미 신청한 특강입니다');
    });
  });

  // hasApplication 강의 신청 조회
  describe('강의 신청 조회', () => {
    it('신청한 강의가 없는 경우 404 에러가 발생합니다', () => {
      // Given
      const lectureId = 1;
      const userId = 1;
      const fakeDate = new Date('2030-04-11');
      stubLectureRepository.setup([
        {
          id: lectureId,
          createdAt: fakeDate,
          date: fakeDate,
          maxSeat: 10,
          leftSeat: 9,
          detail: {
            id: 1,
            createdAt: fakeDate,
            name: '카리나의 외모',
          },
        },
      ]);

      // When
      const result = service.getApplication(lectureId, userId);

      // Then
      expect(result).rejects.toThrow('특강 신청 정보가 존재하지 않습니다');
    });
  });
});
