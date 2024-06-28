import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILecturesService } from './lectures.service';
import { LectureDomain } from './domain/lectures.domain';
import { ApplicationDomain } from './domain/application.domain';
import { LECTURE_REPOSITORY_TOKEN } from '../repository/lectures.repository.impl';
import { ILectureRepository } from './repository/lectures.repository';
import { IApplicationRepository } from './repository/application.repository';
import { APPLICATION_REPOSITORY_TOKEN } from '../repository/application.repository.impl';

export const LECTURE_SERVICE_TOKEN = Symbol('ILecturesService');

@Injectable()
export class LecturesServiceImpl implements ILecturesService {
  constructor(
    @Inject(LECTURE_REPOSITORY_TOKEN)
    private readonly lectureRepository: ILectureRepository,
    @Inject(APPLICATION_REPOSITORY_TOKEN)
    private readonly applicationRepository: IApplicationRepository,
  ) {}

  async list(): Promise<LectureDomain[]> {
    return await this.lectureRepository.findAll();
  }

  async apply(lectureId: number, userId: number): Promise<LectureDomain> {
    const lecture = await this.lectureRepository.findById(lectureId);
    this.validateLectureApplicability(lecture);

    const application = await this.applicationRepository.findById(
      lectureId,
      userId,
    );
    this.validateAlreadyApplied(application);

    await this.applicationRepository.create(lectureId, userId);
    await this.lectureRepository.update(lectureId, lecture.leftSeat - 1);

    return lecture;
  }

  async getApplication(
    lectureId: number,
    userId: number,
  ): Promise<ApplicationDomain> {
    const application = await this.applicationRepository.findById(
      lectureId,
      userId,
    );
    this.hasApplication(application);

    return application;
  }

  /**
   * 특강 신청 가능 여부를 검증
   * - 특강이 없는 경우
   * - 강의일이 현재보다 과거인 경우
   * - 이미 마감된 특강인 경우
   */
  private validateLectureApplicability(lecture: LectureDomain) {
    if (lecture == null) {
      throw new NotFoundException('특강이 존재하지 않습니다');
    }

    if (lecture.date < new Date()) {
      throw new BadRequestException('이미 종료된 특강입니다 🙏');
    }

    if (lecture.leftSeat < 1) {
      throw new BadRequestException('특강이 마감되었습니다 🙏');
    }
  }

  /**
   * 현재 유저가 이미 신청한 특강인지 검증
   */
  private validateAlreadyApplied(application: ApplicationDomain) {
    if (application != null) {
      throw new BadRequestException('이미 신청한 특강입니다');
    }
  }

  /**
   * 특강 신청 정보가 존재하는지 검증
   */
  private hasApplication(application: ApplicationDomain) {
    if (application == null) {
      throw new NotFoundException('특강 신청 정보가 존재하지 않습니다');
    }
  }
}
