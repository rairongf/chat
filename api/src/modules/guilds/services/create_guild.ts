import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Guild, GuildRepository } from 'src/modules/data';
import { CreateGuildBodyDTO } from '../dtos';

@Injectable()
export class CreateGuildService {
  constructor(private readonly repository: GuildRepository) {
  }

  async handle(
    userId: Types.ObjectId,
    data: CreateGuildBodyDTO,
  ): Promise<Guild> {
    try {
      const guild = await this.repository.model.create({
        _id: new Types.ObjectId(),
        name: data.name,
        members: [userId],
      });

      if (!guild) {
        throw new NotFoundException('Could not create guild');
      }

      return {
        ...guild
      };
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException('Unknown error while creating guild.');
    }
  }
}
