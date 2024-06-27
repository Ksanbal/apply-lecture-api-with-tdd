import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LecturesApplyReqDto } from './dto/req/lectures-apply.req.dto';
import { ILecturesService } from '../service/lectures.service';
import { LECTURE_SERVICE_TOKEN } from '../service/lectures.service.impl';
import { LectureResDto } from './dto/res/lecture.res.dto';
import { LectureApplicationResDto } from './dto/res/lecture-application.res.dto';

@Controller('lectures')
export class LecturesController {
  constructor(
    @Inject(LECTURE_SERVICE_TOKEN)
    private readonly lecturesService: ILecturesService,
  ) {}

  @Get()
  async list(): Promise<LectureResDto[]> {
    const lectures = await this.lecturesService.list();

    return lectures.map((lecture) => new LectureResDto(lecture));
  }

  @Post('apply')
  async apply(
    @Body() lecturesApplyReqDto: LecturesApplyReqDto,
  ): Promise<LectureResDto> {
    const lecture = await this.lecturesService.apply(
      lecturesApplyReqDto.lectureId,
      lecturesApplyReqDto.userId,
    );
    return new LectureResDto(lecture);
  }

  @Get(':lectureId/application/:userId')
  async applicationResult(
    @Param('lectureId', ParseIntPipe) lectureId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<LectureApplicationResDto> {
    const application = await this.lecturesService.getApplication(
      lectureId,
      userId,
    );
    return new LectureApplicationResDto(application);
  }
}
