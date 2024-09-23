import { api, BaseRepository, User } from '@/modules/common';

export type IFindGuildMembersRepository = BaseRepository<User[], {guildId: string;}>;

export const findGuildMembers: IFindGuildMembersRepository = ({guildId}) => {
  return api.get(`/guilds/${guildId}/members`);
};
