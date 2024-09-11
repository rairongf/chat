import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateChannelBodyDTO, CreateChannelService } from "./create_channel";
import { FindManyChannelsQueryParamsDTO, FindManyChannelsService } from "./find_many_channels";
import { ChannelIdParam } from "./id_param_dto";
import { User } from "src/decorators";
import { UserPayload } from "src/interfaces";

@Controller('channels')
export class ChannelsController {
  constructor(
    private readonly createService: CreateChannelService,
    private readonly findManyService: FindManyChannelsService,
  ) { }

  @Post()
  async create(
    @User() user: UserPayload,
    @Body() body: CreateChannelBodyDTO,
  ) {
    return this.createService.handle(user.userId, body);
  }

  @Get()
  async findMany(
    @User() user: UserPayload,
    @Query() query: FindManyChannelsQueryParamsDTO,
  ) {
    return this.findManyService.handle(user.userId, query);
  }

  @Get(':id')
  async findOne(
    @Param() param: ChannelIdParam,
  ) { }

  @Patch(':id')
  async update(
    @Param() param: ChannelIdParam,
  ) { }
}