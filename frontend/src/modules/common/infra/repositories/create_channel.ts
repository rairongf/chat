import { api, BaseRepository, Channel } from '@/modules/common';

export type ICreateChannelRepository = BaseRepository<Channel, {
  // PRIVATE CHANNEL (DM)
  memberId?: string;

  // OR GUILD TEXT CHANNEL
  name?: string;
  guildId?: string;
}>;

export const createChannel: ICreateChannelRepository = (data) => {
  return api.post(`/channels`, data);
};
