import { IFindManyGuildsRepository, IFindUserRepository } from '@/modules/session/infra/repositories';
import { useSessionState } from '@/modules/session/state';
import { IInitializeSessionStateUsecase } from './interface';

export function useInitializeSessionState(
  findUser: IFindUserRepository,
  findGuilds: IFindManyGuildsRepository,
) {
  const {
    userState: [, setUser],
    guildsState: [, setGuilds],
  } = useSessionState();

  const initializeState: IInitializeSessionStateUsecase = async () => {
    try {
      const userResponse = await findUser({});

      if (!userResponse.didSucceed) {
        return;
      }

      setUser(userResponse.data);

      const guildsResponse = await findGuilds({});

      if (!guildsResponse.didSucceed) {
        return;
      }

      setGuilds([...guildsResponse.data]);
      
      return;
    } catch (err) {
      console.log('Caught error:', err);
      return;
    }
  };

  return { initializeState };
}
