import { Module } from '@nestjs/common';
import { LecturesController } from './lectures.controller';
import { LecturesService } from './lectures.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LecturesController],
  providers: [LecturesService, PrismaService],
})
export class LecturesModule {}
