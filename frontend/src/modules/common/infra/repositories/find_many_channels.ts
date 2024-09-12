import { PaginatedRepository } from '@/modules/common/infra/models';
import { api } from '../../../common/infra/services/server/api';
import { Channel, PaginatedData } from '../../domain';

export type IFindManyChannelsRepository = PaginatedRepository<Channel, {
  guild_id?: string;
}>;

export const findManyChannels: IFindManyChannelsRepository = ({page = 1, limit = 50, ...args}) => {
  return api.get<PaginatedData<Channel>>(`/channels`, {
    params: {
      page, limit, ...args
    },
  });
};
