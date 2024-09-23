import { IFindManyChannelsRepository } from '@/modules/common';
import { IFindGuildMembersRepository } from '@/modules/guild_server/infra/repositories';
import { useGuildServerState } from '@/modules/guild_server/state';
import { useSession } from '@/modules/session/context';
import { IInitializeGuildServerStateUsecase } from './interface';

export function useInitializeGuildServerState(
  findGuildMembers: IFindGuildMembersRepository,
  findManyChannels: IFindManyChannelsRepository,
) {
  const {guilds} = useSession();
  const {guildState: [, setGuild], channelsState: [, setChannels], membersState: [, setMembers]} = useGuildServerState();

  const initializeGuildServerState: IInitializeGuildServerStateUsecase = async ({guildId}) => {
    try {
      const guild = guilds.find((g) => g._id == guildId);
      if(!guild) {
        console.log('Could not find guild data');
        return {didSucceed: false};
      }

      setGuild(guilds.find((g) => g._id == guildId));

      const membersResponse = await findGuildMembers({guildId});

      if (!membersResponse.didSucceed) {
        console.log('Could not fetch guild members. Error:', membersResponse.error);
        return {didSucceed: false};
      }

      setMembers([...membersResponse.data]);

      const channelsResponse = await findManyChannels({ page: 1, limit: 50, guildId: guildId, });

      if (!channelsResponse.didSucceed) {
        console.log('Could not fetch guild channels. Error:', channelsResponse.error);
        return {didSucceed: false};
      }

      setChannels([...channelsResponse.data.elements]);

      return {didSucceed: true, defaultChannelId: channelsResponse.data.elements.at(0)?._id};
    } catch (err) {
      console.log('Caught error:', err);
      return {didSucceed: false};
    }
  };

  return { initializeGuildServerState };
}
