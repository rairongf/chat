import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { CreateChannelBodyDTO, CreateChannelService } from "./create_channel";
import { FindManyChannelsService } from "./find_many_channels";

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
  async findMany() {
    return this.findManyService.handle();
  }

  @Get(':id')
  async findOne() { }

  @Patch(':id')
  async update() { }
}