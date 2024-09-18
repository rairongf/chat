import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MongoIdParam, UserJWT, UserPayload } from '../common';
import { CreateGuildBodyDTO, UpdateGuildBodyDTO } from './dtos';
import {
  CreateGuildService,
  DeleteGuildService,
  FindManyGuildsService,
  FindOneGuildService,
  UpdateGuildService,
} from './services';

@Controller('guilds')
export class GuildsController {
  constructor(
    private readonly createGuildService: CreateGuildService,
    private readonly deleteGuildService: DeleteGuildService,
    private readonly findManyGuildsService: FindManyGuildsService,
    private readonly findOneGuildService: FindOneGuildService,
    private readonly updateGuildService: UpdateGuildService,
  ) {}

  @Post()
  async create(@UserJWT() user: UserPayload, @Body() data: CreateGuildBodyDTO) {
    return this.createGuildService.handle(user.userId, data);
  }

  @Get()
  async findMany(@UserJWT() user: UserPayload) {
    return this.findManyGuildsService.handle(user.userId);
  }

  @Get(':id')
  async findOne(@UserJWT() user: UserPayload, @Param() param: MongoIdParam) {
    return this.findOneGuildService.handle(user.userId, param.id);
  }

  @Patch(':id')
  async update(
    @UserJWT() user: UserPayload,
    @Param() param: MongoIdParam,
    @Body() data: UpdateGuildBodyDTO,
  ) {
    return this.updateGuildService.handle(user.userId, param.id, data);
  }

  @Delete(':id')
  async delete(@UserJWT() user: UserPayload, @Param() param: MongoIdParam) {
    return this.deleteGuildService.handle(user.userId, param.id);
  }
}
