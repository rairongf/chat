import { Injectable } from "@nestjs/common";
import { ChannelDocument, ChannelRepository } from "src/modules/data";
import { FindManyChannelsQueryParamsDTO } from "./query_params_dto";
import { Types } from "mongoose";

@Injectable()
export class FindManyChannelsService {
  constructor(
    private readonly repository: ChannelRepository,
  ) { }

  async handle(userId: Types.ObjectId, query: FindManyChannelsQueryParamsDTO): Promise<ChannelDocument[]> {
    const channels = await this.repository.model.find({
      members: userId,
      guild_id: query.guild_id,
    }, {
      _id: 1,
      guild_id: 1,
      members: 1,
      name: 1,
      type: 1,
    }, {
      skip: query.limit * (query.page - 1),
      limit: query.limit,
    }).exec();

    return channels;
  }
}