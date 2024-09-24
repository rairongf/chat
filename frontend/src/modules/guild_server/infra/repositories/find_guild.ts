import { api, BaseRepository } from '@/modules/common';
import { GuildDetails } from '../../domain/models';

export type IFindGuildMembersRepository = BaseRepository<GuildDetails, {guildId: string;}>;

export const findGuild: IFindGuildMembersRepository = ({guildId}) => {
  return api.get(`/guilds/${guildId}`);
};
