import { IFindManyMessagesRepository } from '@/modules/common';
import { useDirectMessagesState } from '@/modules/direct_messages';
import { useWebsocket } from '@/modules/websocket';
import { useRouter } from 'next/navigation';
import { IConnectToChannelUsecase } from './interface';

export function useConnectToChannel(
  findManyMessages: IFindManyMessagesRepository,
) {
  const router = useRouter();
  const { activeChannelId, connectTo } = useWebsocket();
  const { messagesState: [, setMessages] } = useDirectMessagesState();

  const connectToChannel: IConnectToChannelUsecase = async ({ channelId }) => {
    try {
      if(activeChannelId == channelId) return;
      const newActiveChannelId = connectTo(channelId);

      const didConnect = newActiveChannelId == channelId;
      if (!didConnect) {
        console.log(`Could not connect to ${channelId}.`);
        return;
      }

      const messagesResponse = await findManyMessages({ page: 1, limit: 50, channelId });

      if (!messagesResponse.didSucceed) {
        console.log('Error:', messagesResponse.error);
        return;
      }

      setMessages([...messagesResponse.data.elements.map((e) => ({
        ...e,
        createdAt: new Date(e.createdAt),
      }))]);

      router.push(`/channels/@me/${channelId}`);
    } catch (err) {
      console.log(`Caught error:`, err);
    }
  };

  return { connectToChannel };
}
