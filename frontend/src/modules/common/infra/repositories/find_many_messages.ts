import { api, Channel, Message, PaginatedRepository } from '@/modules/common';

export type IFindManyMessagesRepository = PaginatedRepository<Message, {
  channelId: Channel['_id']; 
}>;

export const findManyMessages: IFindManyMessagesRepository = ({page = 1, limit = 50, channelId}) => {
  return api.get(`/messages`, {
    params: {page, limit, channelId}
  });
};
