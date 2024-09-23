import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Guild, GuildRepository } from 'src/modules/data';

@Injectable()
export class FindManyGuildsService {
  constructor(private readonly repository: GuildRepository) { }

  async handle(userId: Types.ObjectId): Promise<Guild[]> {
    try {
      const guilds = await this.repository.model
        .find(
          {
            members: userId,
            deletedAt: null,
          },
          {
            _id: 1,
            name: 1,
            members: 1,
            createdAt: 1,
            picture: 1,
          },
        )
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
