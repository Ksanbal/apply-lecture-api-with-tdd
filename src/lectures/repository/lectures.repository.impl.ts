import { Injectable } from '@nestjs/common';
import { ILectureRepository } from '../service/repository/lectures.repository';
import { LectureDomain } from '../service/domain/lectures.domain';
import { PrismaService } from 'src/prisma.service';

export const LECTURE_REPOSITORY_TOKEN = Symbol('ILectureRepository');

@Injectable()
export class LectureRepositoryImpl implements ILectureRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<LectureDomain[]> {
    const lectures = await this.prisma.lecture.findMany();
    const lectureDetails = await this.prisma.lectureDetail.findMany({
      where: {
        id: {
          in: lectures.map((lecture) => lecture.lectureDetailId),
        },
      },
    });

    return lectures.map((lecture) => {
      const lectureDetail = lectureDetails.find(
        (detail) => detail.id === lecture.lectureDetailId,
      );
      return new LectureDomain(lecture, lectureDetail);
    });
  }

  async findById(id: number): Promise<LectureDomain | null> {
    const lecture = await this.prisma.lecture.findUnique({
      where: {
        id,
      },
    });

    if (lecture === null) return null;

    const lectureDetail = await this.prisma.lectureDetail.findUnique({
      where: {
        id: lecture.lectureDetailId,
      },
    });

    return new LectureDomain(lecture, lectureDetail);
  }

  async update(id: number, leftSeat: number): Promise<LectureDomain | null> {
    const lecture = await this.prisma.lecture.update({
      data: {
        leftSeat,
      },
      where: {
        id,
      },
    });

    if (lecture === null) return null;

    const lectureDetail = await this.prisma.lectureDetail.findUnique({
      where: {
        id: lecture.lectureDetailId,
      },
    });

    return new LectureDomain(lecture, lectureDetail);
  }
}
