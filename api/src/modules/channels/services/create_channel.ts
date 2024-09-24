import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Channel, ChannelRepository, ChannelType } from 'src/modules/data';
import { CreateChannelBodyDTO } from '../dtos';

@Injectable()
export class CreateChannelService {
  constructor(private readonly repository: ChannelRepository) { }

  async handle(
    userId: Types.ObjectId,
    data: CreateChannelBodyDTO,
  ): Promise<Channel> {
    if (data.memberId) {
      const channel = await this.repository.model.create({
        _id: new Types.ObjectId(),
        type: ChannelType.PRIVATE,
        name: `direct_message`,
        members: [new Types.ObjectId(data.memberId), userId],
        guildId: null,
      });

      return {
        _id: channel._id,
        name: channel.name,
        type: channel.type,
        members: channel.members,
      };
    }

    if (!data.guildId) {
      throw new BadRequestException(
        'Neither `guild_id` or `member_id` were provided.',
      );
    }

    const channel = await this.repository.model.create({
      _id: new Types.ObjectId(),
      type: ChannelType.GUILD_TEXT_CHANNEL,
      name: data.name ?? '',
      members: [userId],
      guildId: new Types.ObjectId(data.guildId),
    });

    return {
      _id: channel._id,
      name: channel.name,
      type: channel.type,
      members: channel.members,
    };
  }
}
