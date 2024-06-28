import { LectureDomain } from 'src/lectures/service/domain/lectures.domain';
import { ILectureRepository } from 'src/lectures/service/repository/lectures.repository';

export class StubLectureRepository implements ILectureRepository {
  private lectures: LectureDomain[];

  setup(lectures: LectureDomain[]): void {
    this.lectures = lectures;
  }

  async findAll(): Promise<LectureDomain[]> {
    return this.lectures;
  }

  async findById(id: number): Promise<LectureDomain | null> {
    return this.lectures.find((lecture) => lecture.id === id);
  }

  async update(id: number, leftSeat: number): Promise<LectureDomain | null> {
    const lecture = this.lectures.find((lecture) => lecture.id === id);
    if (!lecture) {
      return null;
    }

    lecture.leftSeat = leftSeat;
    return lecture;
  }
}
