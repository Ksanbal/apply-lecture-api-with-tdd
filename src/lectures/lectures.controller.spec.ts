import { Test, TestingModule } from '@nestjs/testing';
import { LecturesController } from './lectures.controller';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

describe('LecturesController', () => {
  let controller: LecturesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LecturesController],
      providers: [PrismaService],
    }).compile();

    controller = module.get<LecturesController>(LecturesController);
    prisma = module.get<PrismaService>(PrismaService);

    /**
     * 테스트 DB 세팅
     */
    // 강의 생성
    await prisma.lecture.deleteMany();
    await prisma.lecture.create({
      data: {
        id: 1,
        name: '카리나의 춤 특강',
        maxSeat: 30,
        leftSeat: 30,
      },
    });

    /// 신청 테이블 clear
    await prisma.application.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });

  /**
   * 특강 신청
   * 1. 이미 신청한 기록이 있다면 에러를 발생
   * 2. 50명이 신청하면 30명은 성공, 20명은 실패해야합니다.
   */
  describe('특강 신청', () => {
    it('이미 신청한 기록이 있다면 에러가 발생합니다.', async () => {
      // Given : 해당 유저로 신청 생성
      const userId = 100;
      const data = {
        userId,
      };
      await controller.apply(data);
      // When
      const result = controller.apply(data);
      // Then
      expect(result).rejects.toThrow(BadRequestException);
    });

    it('100명이 신청하면 30명은 성공, 나머지는 실패해야합니다.', async () => {
      // Given
      const total = 100;
      const expectedSuccess = 30;
      const expectedFail = total - expectedSuccess;
      const datas = Array.from({ length: total }, (_, i) => i + 1);
      const promises = datas.map((userId) =>
        controller.apply({
          userId,
        }),
      );

      // When
      const results = await Promise.allSettled(promises);

      // Then
      const successResults = results.filter(
        (result) => result.status === 'fulfilled',
      );
      const failedResults = results.filter(
        (result) => result.status === 'rejected',
      );
      expect(successResults.length).toEqual(expectedSuccess);
      expect(failedResults.length).toEqual(expectedFail);
    });
  });

  /**
   * 특강 신청 완료 여부 조회
   * 1. 명단에 없으면 404 에러 발생
   */
  describe('특강 신청 완료 여부 조회', () => {
    it('특정 유저가 명단에 없으면 404 에러를 발생합니다.', async () => {
      // Given
      const userId = 100;
      // When
      const result = controller.applicationResult(userId);
      // Then
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
