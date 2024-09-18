import { Module } from '@nestjs/common';
import { MessagesModule } from '../messages/module';
import { ChannelsController } from './controller';
import { ChannelsGateway } from './gateway';
import { CreateChannelService, FindManyChannelsService } from './services';

@Module({
  imports: [MessagesModule],
  providers: [ChannelsGateway, CreateChannelService, FindManyChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule { }
