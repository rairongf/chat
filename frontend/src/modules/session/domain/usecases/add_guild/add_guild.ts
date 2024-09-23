import { ICreateGuildRepository } from '@/modules/session/infra/repositories';
import { IAddGuildUsecase } from './interface';

export function useAddGuild(createGuild: ICreateGuildRepository) {
  const addGuild: IAddGuildUsecase = async ({name, picture}) => {
    try {
      const { data, didSucceed, error } = await createGuild({name});

      if (!didSucceed) {
        console.log('Error while creating guild:', error);
        return;
      }

      return data;
    } catch (err) {
    }
  };

  return { addGuild };
}
