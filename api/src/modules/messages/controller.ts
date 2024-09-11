import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { User } from "src/decorators";
import { UserPayload } from "src/interfaces";
import { CreateMessageBodyDTO, FindManyMessagesQueryParamsDTO } from "./dtos";
import { CreateMessageService, FindManyMessagesService } from "./services";

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly createMessageService: CreateMessageService,
    private readonly findManyMessagesService: FindManyMessagesService,
  ) { }

  @Post()
  async create(
    @User() user: UserPayload,
    @Body() body: CreateMessageBodyDTO,
  ) {
    return this.createMessageService.handle(user.userId, body);
  }

  @Get()
  async findMany(
    @User() user: UserPayload,
    @Query() query: FindManyMessagesQueryParamsDTO,
  ) {
    return this.findManyMessagesService.handle(user.userId, query);
  }
}