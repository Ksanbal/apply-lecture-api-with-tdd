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

    const [application, count, newApplication] = await this.prisma.$transaction(
      [
        this.prisma.application.findFirst({
          where: {
            userId,
          },
        }),
        this.prisma.application.count(),
        this.prisma.application.create({
          data: {
            userId,
          },
        }),
      ],
    );

    if (application) {
      // 롤백
      await this.prisma.application.delete({
        where: {
          id: newApplication.id,
        },
      });
      throw new BadRequestException('이미 신청한 특강입니다');
    }

    if (30 <= count) {
      // 롤백
      await this.prisma.application.delete({
        where: {
          id: newApplication.id,
        },
      });
      throw new BadRequestException('특강이 마감되었습니다 🙏');
    }

    return newApplication;
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
