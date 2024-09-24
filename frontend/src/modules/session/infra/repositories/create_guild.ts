import { api, BaseRepository } from '@/modules/common';
import { GuildSummary } from '../../domain/models';

type ICreateGuildRepositoryArguments = {name: string;};

export type ICreateGuildRepository = BaseRepository<GuildSummary, ICreateGuildRepositoryArguments>;

export const createGuild: ICreateGuildRepository = (args: ICreateGuildRepositoryArguments) => {
  return api.post(`/guilds`, args);
};
