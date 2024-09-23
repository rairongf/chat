import { api, BaseRepository, Guild } from '@/modules/common';

type ICreateGuildRepositoryArguments = {name: string;};

export type ICreateGuildRepository = BaseRepository<Guild, ICreateGuildRepositoryArguments>;

export const createGuild: ICreateGuildRepository = (args: ICreateGuildRepositoryArguments) => {
  return api.post(`/guilds`, args);
};
