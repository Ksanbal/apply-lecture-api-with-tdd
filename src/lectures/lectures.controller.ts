import {
  BadRequestException,
  Controller,
  NotFoundException,
} from '@nestjs/common';

@Controller('lectures')
export class LecturesController {
  async apply(applyDto) {
    if (applyDto.userId > 30) {
      throw new BadRequestException();
    }

    return applyDto;
  }

  async applicationResult(userId: Number) {
    throw new NotFoundException();
  }
}
