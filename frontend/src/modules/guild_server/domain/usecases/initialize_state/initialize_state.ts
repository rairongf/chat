import { IFindManyChannelsRepository, IFindManyUsersRepository } from '@/modules/common';
import { useGuildServerState } from '@/modules/guild_server/state';
import { useSession } from '@/modules/session/context';
import { IInitializeGuildServerStateUsecase } from './interface';

export function useInitializeGuildServerState(
  findManyUsers: IFindManyUsersRepository,
  findManyChannels: IFindManyChannelsRepository,
) {
  const {guilds} = useSession();
  const {guildState: [, setGuild], channelsState: [, setChannels], membersState: [, setMembers]} = useGuildServerState();

  const initializeGuildServerState: IInitializeGuildServerStateUsecase = async ({guildId}) => {
    try {
      const guild = guilds.find((g) => g._id == guildId);
      if(!guild) {
        console.log('Could not find guild data');
        return;
      }

      setGuild(guilds.find((g) => g._id == guildId));

      const friendsResponse = await findManyUsers({});

      if (!friendsResponse.didSucceed) {
        console.log('Error:', friendsResponse.error);
        return;
      }

      setMembers([...friendsResponse.data.elements]);

      const channelsResponse = await findManyChannels({ page: 1, limit: 20, guildId: guildId, });

      if (!channelsResponse.didSucceed) {
        console.log('Error:', channelsResponse.error);
        return;
      }

      setChannels([...channelsResponse.data.elements]);

      return;
    } catch (err) {
      console.log('Caught error:', err);
    }
  };

  return { initializeGuildServerState };
}
