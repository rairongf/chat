import { Module } from '@nestjs/common';
import { GuildsController } from './controller';

@Module({
  controllers: [GuildsController],
  providers: [],
})
export class GuildsModule {}
