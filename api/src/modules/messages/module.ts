import { Module } from '@nestjs/common';
import { MessagesController } from './controller';
import { CreateMessageService, FindManyMessagesService } from './services';

@Module({
  providers: [CreateMessageService, FindManyMessagesService],
  controllers: [MessagesController],
})
export class MessagesModule { }