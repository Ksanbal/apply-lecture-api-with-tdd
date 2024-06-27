import { LectureDomain } from 'src/lectures/service/domain/lectures.domain';

export class LectureResDto {
  id: number;
  date: Date;
  maxSeat: number;
  leftSeat: number;
  name: string;

  constructor(domain: LectureDomain) {
    this.id = domain.id;
    this.date = domain.date;
    this.maxSeat = domain.maxSeat;
    this.leftSeat = domain.leftSeat;
    this.name = domain.detail.name;
  }
}
