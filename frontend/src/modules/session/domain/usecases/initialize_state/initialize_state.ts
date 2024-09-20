import { IFindManyGuildsRepository, IFindUserRepository } from '@/modules/session/infra/repositories';
import { IInitializeSessionStateUsecase } from './interface';

export function useInitializeSessionState(
  findUser: IFindUserRepository,
  findGuilds: IFindManyGuildsRepository,
) {
  const initializeState: IInitializeSessionStateUsecase = async () => {
    try {
      const userResponse = await findUser({});

      if (!userResponse.didSucceed) {
        return {didSucceed: false};
      }

      const guildsResponse = await findGuilds({});

      if (!guildsResponse.didSucceed) {
        return {didSucceed: false};
      }
      
      return {didSucceed: true, user: userResponse.data, guilds: [...guildsResponse.data]};
    } catch (err) {
      console.log('Caught error:', err);
      return {didSucceed: false};
    }
  };

  return { initializeState };
}
