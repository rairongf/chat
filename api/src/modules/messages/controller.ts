import { Controller, Get, Query } from '@nestjs/common';
import { UserJWT, UserPayload } from '../common';
import { FindManyMessagesQueryParamsDTO } from './dtos';
import { FindManyMessagesService } from './services';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly findManyMessagesService: FindManyMessagesService,
  ) { }

  @Get()
  async findMany(
    @UserJWT() user: UserPayload,
    @Query() query: FindManyMessagesQueryParamsDTO,
  ) {
    return this.findManyMessagesService.handle(user.userId, query);
  }
}
