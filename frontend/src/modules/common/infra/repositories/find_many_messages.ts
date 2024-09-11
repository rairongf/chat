import { PaginatedRepository } from '@/modules/common/infra/models';
import { api } from '../../../common/infra/services/server/api';
import { Channel, Message } from '../../domain';

export type IFindManyMessagesRepository = PaginatedRepository<Message, {
  channel_id: Channel['_id']; 
}>;

export const findManyMessages: IFindManyMessagesRepository = ({page = 1, limit = 50, channel_id}) => {
  return api.get(`/messages`, {
    params: {page, limit, channel_id}
  });
};
