import { Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { ChatPaginatedResponse } from 'src/interfaces';
import { MessageDocument, MessageRepository } from 'src/modules/data';
import { FindManyMessagesQueryParamsDTO } from '../dtos';

@Injectable()
export class FindManyMessagesService {
  constructor(private readonly repository: MessageRepository) {}

  async handle(
    userId: Types.ObjectId,
    query: FindManyMessagesQueryParamsDTO,
  ): Promise<ChatPaginatedResponse<MessageDocument>> {
    const filter: FilterQuery<MessageDocument> = {
      channelId: query.channelId,
    };

    const count = await this.repository.model.countDocuments(filter);

    const messages = await this.repository.model
      .find(
        filter,
        {
          _id: 1,
          senderId: 1,
          channelId: 1,
          content: 1,
          createdAt: 1,
          updatedAt: 1,
        },
        {
          skip: query.limit * (query.page - 1),
          limit: query.limit,
        },
      )
      .exec();

    return {
      elements: messages,
      currentPage: query.page,
      totalElements: count,
      totalPages: Math.ceil(count / query.limit),
    };
  }
}
