import { ICreateChannelRepository } from '@/modules/common';
import { IAddNewDMChannelUsecase } from './interface';

export function useAddNewDm(createChannel: ICreateChannelRepository) {
  const addNewDm: IAddNewDMChannelUsecase = async (args) => {
    try {
      const { data, didSucceed, error } = await createChannel({memberId: args.friend._id});

      if (!didSucceed) {
        console.error('Error creating DM:', error);
        return {didSucceed: didSucceed};
      }

      return {didSucceed: didSucceed, channel: data};
    } catch (err) {
      return {didSucceed: false};
    }
  };

  return { addNewDm };
}
