import { api, Channel, PaginatedRepository } from '@/modules/common';
import { MessageDetails } from '../../domain/models';

export type IFindManyMessagesRepository = PaginatedRepository<MessageDetails, {
  channelId: Channel['_id']; 
}>;

export const findManyMessages: IFindManyMessagesRepository = ({page = 1, limit = 50, channelId}) => {
  return api.get(`/messages`, {
    params: {page, limit, channelId}
  });
};
