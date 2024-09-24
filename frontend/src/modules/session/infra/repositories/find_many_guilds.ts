import { api, BaseRepository } from '@/modules/common';
import { GuildSummary } from '../../domain/models';

export type IFindManyGuildsRepository = BaseRepository<GuildSummary[]>;

export const findManyGuilds: IFindManyGuildsRepository = () => {
  return api.get(`/guilds`);
};
