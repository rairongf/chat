import { Module } from '@nestjs/common';
import { MessagesController } from './controller';
import { CreateMessageService, FindManyMessagesService } from './services';

@Module({
  providers: [CreateMessageService, FindManyMessagesService],
  exports: [CreateMessageService],
  controllers: [MessagesController],
})
export class MessagesModule { }