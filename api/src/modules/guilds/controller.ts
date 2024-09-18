import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('guilds')
export class GuildsController {
  constructor() {}

  @Post()
  async create() {}

  @Get()
  async findMany() {}

  @Get(':id')
  async findOne() {}

  @Patch(':id')
  async update() {}

  @Delete(':id')
  async delete() {}
}
