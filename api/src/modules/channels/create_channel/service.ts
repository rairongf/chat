import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import {
  ChannelDocument,
  ChannelRepository,
  ChannelType,
} from 'src/modules/data';
import { CreateChannelBodyDTO } from '.';

@Injectable()
export class CreateChannelService {
  constructor(private readonly repository: ChannelRepository) {}

  async handle(
    userId: Types.ObjectId,
    data: CreateChannelBodyDTO,
  ): Promise<ChannelDocument> {
    if (data.memberId) {
      const channels = await this.repository.model.create(
        [
          {
            _id: new Types.ObjectId(),
            type: ChannelType.PRIVATE,
            name: `private_with_${data.memberId}`,
            members: [new Types.ObjectId(data.memberId), userId],
            guildId: null,
          },
        ],
        {},
      );

      return channels.at(0);
    }

    if (!data.guildId) {
      throw new BadRequestException(
        'Neither `guild_id` or `member_id` were provided.',
      );
    }

    const channels = await this.repository.model.create(
      [
        {
          _id: new Types.ObjectId(),
          type: ChannelType.GUILD_TEXT_CHANNEL,
          name: data.name ?? '',
          members: [],
          guildId: new Types.ObjectId(data.guildId),
        },
      ],
      {},
    );

    return channels.at(0);
  }
}
