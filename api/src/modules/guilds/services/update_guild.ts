import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Guild, GuildRepository } from 'src/modules/data';
import { UpdateGuildBodyDTO } from '../dtos';

@Injectable()
export class UpdateGuildService {
  constructor(private readonly repository: GuildRepository) {
  }

  async handle(
    userId: Types.ObjectId,
    guildId: Types.ObjectId,
    data: UpdateGuildBodyDTO,
  ): Promise<Guild> {
    try {
      if (!data.name) {
        throw new BadRequestException('Update body must not be empty');
      }

      const guild = await this.repository.model.findOneAndUpdate(
        { _id: guildId, members: userId },
        { name: data.name },
        { returnDocument: 'after' })
        .lean({ getters: true }).exec();

      if (!guild) {
        throw new NotFoundException('Could not update guild');
      }

      return { ...guild };
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException('Unknown error while updating guild');
    }
  }
}
