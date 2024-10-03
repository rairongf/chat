import { Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { ChatPaginatedResponse, MessagePayload } from 'src/modules/common';
import { MessageDocument, MessageRepository } from 'src/modules/data';
import { FindManyMessagesQueryParamsDTO } from '../dtos';

@Injectable()
export class FindManyMessagesService {
  constructor(private readonly repository: MessageRepository) { }

  async handle(
    userId: Types.ObjectId,
    query: FindManyMessagesQueryParamsDTO,
  ): Promise<ChatPaginatedResponse<MessagePayload>> {
    const filter: FilterQuery<MessageDocument> = {
      channel: query.channelId,
      deletedAt: null,
    };

    const count = await this.repository.model.countDocuments(filter);

    const messages = await this.repository.model
      .find(filter)
      .select({
        _id: 1,
        sender: 1,
        channel: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .populate('sender', '_id name username picture')
      .skip(query.limit * (query.page - 1))
      .limit(query.limit)
      .lean({ getters: true })
      .exec();

    return {
      elements: messages,
      currentPage: query.page,
      totalElements: count,
      totalPages: Math.ceil(count / query.limit),
    };
  }
}
