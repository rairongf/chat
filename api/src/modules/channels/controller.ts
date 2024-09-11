import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateChannelBodyDTO, CreateChannelService } from "./create_channel";
import { FindManyChannelsQueryParamsDTO, FindManyChannelsService } from "./find_many_channels";
import { ChannelIdParam } from "./id_param_dto";

@Controller('channels')
export class ChannelsController {
  constructor(
    private readonly createService: CreateChannelService,
    private readonly findManyService: FindManyChannelsService,
  ) { }

  @Post()
  async create(
    @Body() body: CreateChannelBodyDTO,
  ) {
    return this.createService.handle(body);
  }

  @Get()
  async findMany(
    @Query() query: FindManyChannelsQueryParamsDTO,
  ) {
    return this.findManyService.handle(query);
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