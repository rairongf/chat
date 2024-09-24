import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { DatabaseTransactionService, InjectConnection } from 'src/modules/common';
import { ChannelRepository, ChannelType, Guild, GuildRepository } from 'src/modules/data';
import { CreateGuildBodyDTO } from '../dtos';

@Injectable()
export class CreateGuildService extends DatabaseTransactionService {
  constructor(
    private readonly guildRepository: GuildRepository,
    private readonly channelRepository: ChannelRepository,
    @InjectConnection() connection: Connection,
  ) {
    super(connection);
  }

  async handle(
    userId: Types.ObjectId,
    data: CreateGuildBodyDTO,
  ): Promise<Guild> {
    try {
      const result = await this.transaction(async (session) => {
        const guildId = new Types.ObjectId();

        const guilds = await this.guildRepository.model.create([{
          _id: guildId,
          name: data.name,
          members: [userId],
        }], { session });

        if (!guilds || guilds.length == 0) {
          throw new NotFoundException('Could not create guild');
        }

        const channels = await this.channelRepository.model.create([{
          _id: new Types.ObjectId(),
          type: ChannelType.GUILD_TEXT_CHANNEL,
          name: `general`,
          members: [userId],
          guildId: guildId,
        }], { session });

        if (!channels || channels.length == 0) {
          throw new NotFoundException('Could not create guild default channel');
        }

        const guild = guilds.at(0)!;
        //const channel = channels.at(0)!;

        return {
          _id: guild._id,
          name: guild.name,
          picture: guild.picture,
          members: guild.members,
          createdAt: guild.createdAt,
        };
      });

      return result;
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);

      throw new InternalServerErrorException(
        'Unknown error while creating guild.',
      );
    }
  }
}
