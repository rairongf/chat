import { IFindManyChannelsRepository } from '@/modules/common';
import { useDirectMessagesState } from '@/modules/direct_messages/presenter';
import { IInitializeDirectMessagesStateUsecase } from './interface';

export function useInitializeDirectMessagesState(
  findManyChannels: IFindManyChannelsRepository,
) {
  const { channelsState: [, setChannels] } = useDirectMessagesState();

  const initializeDirectMessagesState: IInitializeDirectMessagesStateUsecase = async () => {
    try {
      const { data, didSucceed, error } = await findManyChannels({ page: 1, limit: 20 });

      if (!didSucceed) {
        console.log('Error:', error);
        return;
      }

      if (data.elements.length == 0) {
        console.log('No channels available.');
        return;
      }

      setChannels(data.elements);

      return;
    } catch (err) {
      console.log('Caught error:', err);
    }
  };

  return { initializeDirectMessagesState };
}
