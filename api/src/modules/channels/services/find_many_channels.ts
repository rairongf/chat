import { Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { ChatPaginatedResponse } from 'src/modules/common';
import { ChannelDocument, ChannelRepository } from 'src/modules/data';
import { FindManyChannelsQueryParamsDTO } from '../dtos';

@Injectable()
export class FindManyChannelsService {
  constructor(private readonly repository: ChannelRepository) {}

  async handle(
    userId: Types.ObjectId,
    query: FindManyChannelsQueryParamsDTO,
  ): Promise<ChatPaginatedResponse<ChannelDocument>> {
    const filter: FilterQuery<ChannelDocument> = {
      members: userId,
      guildId: query.guildId,
      deletedAt: null,
    };

    const count = await this.repository.model.countDocuments(filter);

    const channels = await this.repository.model
      .find(
        filter,
        {
          _id: 1,
          guildId: 1,
          members: 1,
          name: 1,
          type: 1,
          createdAt: 1,
          updatedAt: 1,
        },
        {
          skip: query.limit * (query.page - 1),
          limit: query.limit,
        },
      )
      .lean({ getters: true })
      .exec();

    return {
      elements: channels,
      currentPage: query.page,
      totalElements: count,
      totalPages: Math.ceil(count / query.limit),
    };
  }
}
