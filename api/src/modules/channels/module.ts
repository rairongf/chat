import { Module } from '@nestjs/common';
import { MessagesModule } from '../messages/module';
import { ChannelsController } from './controller';
import { CreateChannelService } from './create_channel';
import { FindManyChannelsService } from './find_many_channels';
import { ChannelsGateway } from './gateway';

@Module({
  imports: [MessagesModule],
  providers: [ChannelsGateway, CreateChannelService, FindManyChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
