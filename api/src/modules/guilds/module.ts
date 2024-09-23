import { Module } from '@nestjs/common';
import { GuildsController } from './controller';
import { CreateGuildService, DeleteGuildService, FindManyGuildsService, FindOneGuildService, UpdateGuildService } from './services';

@Module({
  controllers: [GuildsController],
  providers: [
    CreateGuildService,
    DeleteGuildService,
    FindManyGuildsService,
    FindOneGuildService,
    UpdateGuildService,
  ],
})
export class GuildsModule { }
