import { IsNumber, IsPositive } from 'class-validator';

export class LecturesApplyReqDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsNumber()
  @IsPositive()
  lectureId: number;
}
