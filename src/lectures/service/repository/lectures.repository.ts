import { LectureDomain } from '../domain/lectures.domain';

export interface ILectureRepository {
  findAll(): Promise<LectureDomain[]>;
  findById(id: number): Promise<LectureDomain | null>;
  update(id: number, leftSeat: number): Promise<LectureDomain | null>;
}
