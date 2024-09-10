import { Module } from '@nestjs/common';
import { ChannelsController } from './controller';
import { CreateChannelService } from './create_channel';
import { FindManyChannelsService } from './find_many_channels';
import { ChannelsGateway } from './gateway';

@Module({
  providers: [ChannelsGateway, CreateChannelService, FindManyChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule { }
