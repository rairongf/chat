import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Channel, ChannelRepository } from 'src/modules/data';

@Injectable()
export class DeleteChannelService {
  constructor(private readonly repository: ChannelRepository) { }

  async handle(
    userId: Types.ObjectId,
    channelId: Types.ObjectId,
  ): Promise<Channel> {
    const channel = await this.repository.model.findOneAndUpdate(
      { _id: channelId, members: userId },
      { $set: { deletedAt: new Date() } },
      { returnDocument: 'after' }
    ).lean({ getters: true });

    if (!channel) {
      throw new BadRequestException('Could not delete channel');
    }

    return { ...channel };
  }
}
