import { Lecture, LectureDetail } from '@prisma/client';

export class LectureDomain {
  id: number;
  createdAt: Date;
  date: Date;
  maxSeat: number;
  leftSeat: number;
  detail: {
    id: number;
    createdAt: Date;
    name: string;
  };

  constructor(lectureEntity: Lecture, lectureDetailEntity: LectureDetail) {
    this.id = lectureEntity.id;
    this.createdAt = lectureEntity.createdAt;
    this.date = lectureEntity.date;
    this.maxSeat = lectureEntity.maxSeat;
    this.leftSeat = lectureEntity.leftSeat;
    this.detail = {
      id: lectureDetailEntity.id,
      name: lectureDetailEntity.name,
      createdAt: lectureDetailEntity.createdAt,
    };
  }
}
