import { ICreateGuildRepository } from '@/modules/session/infra/repositories';
import { useSessionState } from '@/modules/session/state';
import { IAddGuildUsecase } from './interface';

export function useAddGuild(createGuild: ICreateGuildRepository) {
  const {
    guildsState: [, setGuilds],
  } = useSessionState();

  const addGuild: IAddGuildUsecase = async ({name}) => {
    try {
      const { data, didSucceed, error } = await createGuild({name});

      if (!didSucceed) {
        console.log('Error while creating guild:', error);
        return;
      }

      setGuilds(guilds => [...guilds, data]);
      return;
    } catch (err) {
    }
  };

  return { addGuild };
}
