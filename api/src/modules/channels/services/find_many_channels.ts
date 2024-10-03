import { Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { ChatPaginatedResponse } from 'src/modules/common';
import { Channel, ChannelDocument, ChannelRepository, ChannelType } from 'src/modules/data';
import { FindManyChannelsQueryParamsDTO } from '../dtos';

type ChannelResultData = Omit<Channel, 'members'> & {
  members: Types.ObjectId[];
}

@Injectable()
export class FindManyChannelsService {
  constructor(private readonly repository: ChannelRepository) { }

  async handle(
    userId: Types.ObjectId,
    query: FindManyChannelsQueryParamsDTO,
  ): Promise<ChatPaginatedResponse<ChannelResultData>> {
    const filter: FilterQuery<ChannelDocument> = {
      members: userId,
      guildId: query.guildId,
      deletedAt: null,
    };

    const count = await this.repository.model.countDocuments(filter);

    const channels = await this.repository.model
      .find(filter)
      .select({
        _id: 1,
        guildId: 1,
        members: 1,
        name: 1,
        type: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .skip(query.limit * (query.page - 1))
      .limit(query.limit)
      .populate({
        path: 'members',
        select: '_id username',
        perDocumentLimit: 1,
        match: { _id: { $ne: userId } }
      })
      .lean({ getters: true })
      .exec();

    return {
      elements: [...channels.map((channel) => {
        const { members, ...data } = channel;
        const nonPopulatedMembers = { ...data, members: members.map((m) => m._id) };

        if (channel.type.toUpperCase() == ChannelType.PRIVATE) {
          return { ...nonPopulatedMembers, name: members.at(0)!.username }
        }

        return nonPopulatedMembers;
      })],
      currentPage: query.page,
      totalElements: count,
      totalPages: Math.ceil(count / query.limit),
    };
  }
}
