import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ChannelDocument, ChannelRepository } from "src/modules/data";

@Injectable()
export class FindManyChannelsService {
  constructor(
    private readonly repository: ChannelRepository,
  ) { }

  async handle(): Promise<ChannelDocument[]> {
    const channels = await this.repository.model.find({
      //TODO: include current user id
      members: new Types.ObjectId(''),
    }, {
      _id: 1,
      guild_id: 1,
      name: 1,
      type: 1,
    }).exec();

    return channels;
  }
}