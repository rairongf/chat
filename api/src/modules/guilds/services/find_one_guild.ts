import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Guild, GuildRepository } from 'src/modules/data';

@Injectable()
export class FindOneGuildService {
  constructor(private readonly repository: GuildRepository) {}

  async handle(
    userId: Types.ObjectId,
    guildId: Types.ObjectId,
  ): Promise<Guild> {
    try {
      const guild = await this.repository.model
        .findOne(
          {
            _id: guildId,
            members: userId,
          },
          {
            _id: 1,
            name: 1,
            members: 1,
            createdAt: 1,
          },
        )
        .lean({ getters: true })
        .exec();

      if (!guild) {
        throw new NotFoundException('Could not find guild');
      }

      return { ...guild };
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException(
        'Unknown error while finding guild',
      );
    }
  }
}
