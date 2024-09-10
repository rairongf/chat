import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Channel, ChannelDocument } from "src/modules/data";

@Injectable()
export class FindManyChannelsService {
  constructor(
    @InjectModel(Channel.name) private readonly model: Model<ChannelDocument>,
  ) { }

  async handle(): Promise<ChannelDocument[]> {
    const channels = await this.model.find({
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