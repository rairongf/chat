import { BadRequestException, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ChannelRepository, ChannelType } from "src/modules/data";
import { CreateChannelBodyDTO } from ".";

@Injectable()
export class CreateChannelService {
  constructor(
    private readonly repository: ChannelRepository,
  ) { }

  async handle(data: CreateChannelBodyDTO): Promise<unknown> {
    if (data.member_id) {
      const channels = await this.repository.model.create([
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

    const channels = await this.repository.model.create([
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