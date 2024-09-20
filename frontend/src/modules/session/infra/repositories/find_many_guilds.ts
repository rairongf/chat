import { api, BaseRepository, Guild } from '@/modules/common';

export type IFindManyGuildsRepository = BaseRepository<Guild[]>;

export const findManyGuilds: IFindManyGuildsRepository = () => {
  return api.get(`/guilds`);
};
