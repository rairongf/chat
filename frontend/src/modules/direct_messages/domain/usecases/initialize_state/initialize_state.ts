import { IFindManyChannelsRepository, IFindManyUsersRepository } from '@/modules/common';
import { useDirectMessagesState } from '@/modules/direct_messages/presenter';
import { IInitializeDirectMessagesStateUsecase } from './interface';

export function useInitializeDirectMessagesState(
  findManyUsers: IFindManyUsersRepository,
  findManyChannels: IFindManyChannelsRepository,
) {
  const { channelsState: [, setChannels], friendsState: [, setFriends] } = useDirectMessagesState();

  const initializeDirectMessagesState: IInitializeDirectMessagesStateUsecase = async () => {
    try {
      const friendsResponse = await findManyUsers({});

      if (!friendsResponse.didSucceed) {
        console.log('Error:', friendsResponse.error);
        return;
      }

      setFriends([...friendsResponse.data.elements]);

      const channelsResponse = await findManyChannels({ page: 1, limit: 20 });

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

  return { initializeDirectMessagesState };
}
