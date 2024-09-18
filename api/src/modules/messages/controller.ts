import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserJWT, UserPayload } from '../common';
import { CreateMessageBodyDTO, FindManyMessagesQueryParamsDTO } from './dtos';
import { CreateMessageService, FindManyMessagesService } from './services';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly createMessageService: CreateMessageService,
    private readonly findManyMessagesService: FindManyMessagesService,
  ) {}

  @Post()
  async create(
    @UserJWT() user: UserPayload,
    @Body() body: CreateMessageBodyDTO,
  ) {
    return this.createMessageService.handle(user.userId, body);
  }

  @Get()
  async findMany(
    @UserJWT() user: UserPayload,
    @Query() query: FindManyMessagesQueryParamsDTO,
  ) {
    return this.findManyMessagesService.handle(user.userId, query);
  }
}
