import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Guild, GuildRepository } from 'src/modules/data';

@Injectable()
export class DeleteGuildService {
  constructor(private readonly repository: GuildRepository) {}

  async handle(
    userId: Types.ObjectId,
    guildId: Types.ObjectId,
  ): Promise<Guild> {
    try {
      const guild = await this.repository.model
        .findOneAndUpdate(
          { _id: guildId, members: userId },
          { $set: { deletedAt: new Date() } },
          { returnDocument: 'after' },
        )
        .lean({ getters: true });

      if (!guild) {
        throw new NotFoundException('Could not delete guild');
      }

      return {
        ...guild,
      };
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException(
        'Unknown error while deleting guild.',
      );
    }
  }
}
