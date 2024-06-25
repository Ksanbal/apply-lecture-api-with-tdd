import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LecturesModule } from './lectures/lectures.module';

@Module({
  imports: [LecturesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
