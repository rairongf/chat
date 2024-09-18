import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MongoIdParam, UserJWT, UserPayload } from '../common';
import { CreateChannelBodyDTO, FindManyChannelsQueryParamsDTO } from './dtos';
import { CreateChannelService, DeleteChannelService, FindManyChannelsService } from './services';

@Controller('channels')
export class ChannelsController {
  constructor(
    private readonly createService: CreateChannelService,
    private readonly findManyService: FindManyChannelsService,
    private readonly deleteService: DeleteChannelService,
  ) { }

  @Post()
  async create(
    @UserJWT() user: UserPayload,
    @Body() body: CreateChannelBodyDTO,
  ) {
    return this.createService.handle(user.userId, body);
  }

  @Get()
  async findMany(
    @UserJWT() user: UserPayload,
    @Query() query: FindManyChannelsQueryParamsDTO,
  ) {
    return this.findManyService.handle(user.userId, query);
  }

  @Get(':id')
  async findOne(@Param() param: MongoIdParam) { }

  @Delete(':id')
  async delete(
    @UserJWT() user: UserPayload,
    @Param() param: MongoIdParam,
  ) {
    return this.deleteService.handle(user.userId, param.id);
  }

  @Patch(':id')
  async update(@Param() param: MongoIdParam) { }
}
