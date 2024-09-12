import { Injectable } from "@nestjs/common";
import { FilterQuery, Types } from "mongoose";
import { ChatPaginatedResponse } from "src/interfaces";
import { ChannelDocument, ChannelRepository } from "src/modules/data";
import { FindManyChannelsQueryParamsDTO } from "./query_params_dto";

@Injectable()
export class FindManyChannelsService {
  constructor(
    private readonly repository: ChannelRepository,
  ) { }

  async handle(userId: Types.ObjectId, query: FindManyChannelsQueryParamsDTO): Promise<ChatPaginatedResponse<ChannelDocument>> {
    const filter: FilterQuery<ChannelDocument> = {
      members: userId,
      guild_id: query.guild_id,
    };

    const count = await this.repository.model.countDocuments(filter);

    const channels = await this.repository.model.find(filter, {
      _id: 1,
      guild_id: 1,
      members: 1,
      name: 1,
      type: 1,
      createdAt: 1,
      updatedAt: 1,
    }, {
      skip: query.limit * (query.page - 1),
      limit: query.limit,
    }).lean({ getters: true }).exec();

    return {
      elements: channels,
      currentPage: query.page,
      totalElements: count,
      totalPages: Math.ceil(count / query.limit),
    };
  }
}