import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async apply(@Body() applyDto) {
    const { userId } = applyDto;

    return this.prisma.$transaction(
      async (tx) => {
        await tx.application.create({
          data: {
            userId,
          },
        });

        const count = await tx.application.count({
          where: {
            userId,
          },
        });

        if (1 < count) {
          throw new BadRequestException('이미 신청한 특강입니다');
        }

        const lecture = await tx.lecture.update({
          data: {
            leftSeat: {
              decrement: 1,
            },
          },
          where: {
            id: 1,
          },
        });

        if (lecture.leftSeat < 0) {
          throw new BadRequestException('특강이 마감되었습니다 🙏');
        }

        return lecture;
      },
      {
        maxWait: 10000,
        timeout: 20000,
      },
    );
  }

  @Get('application/:userId')
  async applicationResult(@Param('userId') userId: Number) {
    const apply = await this.prisma.application.findFirst({
      where: {
        userId: +userId,
      },
    });

    if (apply == null) throw new NotFoundException();

    return apply;
  }
}
