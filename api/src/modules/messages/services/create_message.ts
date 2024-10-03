import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { MessagePayload } from 'src/modules/common';
import { MessageRepository } from 'src/modules/data';
import { CreateMessageBodyDTO } from '../dtos';

@Injectable()
export class CreateMessageService {
  constructor(private readonly repository: MessageRepository) { }

  async handle(
    data: CreateMessageBodyDTO,
  ): Promise<MessagePayload> {
    const id = new Types.ObjectId();
    await this.repository.model.create({
      _id: id,
      content: data.content,
      sender: data.senderId,
      channel: data.channelId,
    });

    const message = await this.repository.model.findOne({
      _id: id
    })
      .select({
        _id: 1,
        sender: 1,
        channel: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .populate('sender', '_id name username picture')
      .lean({ getters: true })
      .exec();

    if (!message) {
      throw new NotFoundException('Could not find newly created message');
    }

    return { ...message };
  }
}
