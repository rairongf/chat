import { IFindGuildMembersRepository } from '@/modules/guild_server/infra/repositories';
import { useGuildServerState } from '@/modules/guild_server/state';
import { IInitializeGuildServerStateUsecase } from './interface';

export function useInitializeGuildServerState(
  findGuild: IFindGuildMembersRepository,
) {
  const {
    guildState: [, setGuild],
    channelsState: [, setChannels],
    membersState: [, setMembers]
  } = useGuildServerState();

  const initializeGuildServerState: IInitializeGuildServerStateUsecase = async ({guildId}) => {
    try {
      const response = await findGuild({guildId});

      if (!response.didSucceed) {
        console.log('Could not fetch guild data. Error:', response.error);
        return {didSucceed: false};
      }

      setGuild({...response.data});
      setMembers([...response.data.members]);
      setChannels([...response.data.channels]);

      return {didSucceed: true};
    } catch (err) {
      console.log('Caught error:', err);
      return {didSucceed: false};
    }
  };

  return { initializeGuildServerState };
}
