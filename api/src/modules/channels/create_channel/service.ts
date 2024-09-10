import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Channel, ChannelDocument, ChannelType } from "src/modules/data";
import { CreateChannelBodyDTO } from ".";

@Injectable()
export class CreateChannelService {
  constructor(
    @InjectModel(Channel.name) private readonly model: Model<ChannelDocument>,
  ) { }

  async handle(data: CreateChannelBodyDTO): Promise<unknown> {
    if (data.member_id) {
      const channels = await this.model.create([
        {
          type: ChannelType.PRIVATE,
          name: '',
          members: [
            new Types.ObjectId(data.member_id),
            //TODO: set current user id
            new Types.ObjectId(data.member_id),
          ],
          guild_id: null,
        }
      ], {})

      return channels.at(0);
    }

    if (!data.guild_id) {
      throw new BadRequestException('Neither `guild_id` or `member_id` were provided.');
    }

    const channels = await this.model.create([
      {
        type: ChannelType.GUILD_TEXT_CHANNEL,
        name: data.name ?? '',
        members: [],
        guild_id: new Types.ObjectId(data.guild_id),
      }
    ], {});

    return
  }
}