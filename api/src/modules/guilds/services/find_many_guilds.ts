import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ChannelType, Guild, GuildRepository } from 'src/modules/data';

@Injectable()
export class FindManyGuildsService {
  constructor(private readonly repository: GuildRepository) { }

  async handle(userId: Types.ObjectId): Promise<Guild[]> {
    try {
      const guilds = await this.repository.model
        .find({
          members: userId,
          deletedAt: null,
        })
        .select({
          _id: 1,
          name: 1,
          createdAt: 1,
          picture: 1,
        })
        .populate({
          path: 'channels',
          select: '_id guildId name',
          match: { type: ChannelType.GUILD_TEXT_CHANNEL },
          options: { sort: { createdAt: 1 } },
          perDocumentLimit: 1,
        })
        .lean({ getters: true })
        .exec();

      return [...guilds];
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException(
        'Unknown error while finding guilds',
      );
    }
  }
}
