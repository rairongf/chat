import { IFindManyMessagesRepository } from '@/modules/common';
import { useDirectMessagesState } from '@/modules/direct_messages';
import { useWebsocket } from '@/modules/websocket';
import { useRouter } from 'next/navigation';
import { IConnectToChannelUsecase } from './interface';

export function useConnectToChannel(
  findManyMessages: IFindManyMessagesRepository,
) {
  const router = useRouter();
  const { connectTo} = useWebsocket();
  const { messagesState: [, setMessages] } = useDirectMessagesState();

  const connectToChannel: IConnectToChannelUsecase = async ({channelId}) => {
    try {
      const activeChannelId = connectTo(channelId);

      const didConnect = activeChannelId == channelId;
      if(!didConnect){
        console.log(`Could not connect to ${channelId}.`);
        return;
      }

      const messagesResponse = await findManyMessages({ page: 1, limit: 50, channel_id: channelId });

      if (!messagesResponse.didSucceed) {
        console.log('Error:', messagesResponse.error);
        return;
      }

      setMessages(messagesResponse.data.elements);

      router.push(`/channels/@me/${channelId}`);
    } catch (err) {
      console.log(`Caught error:`, err);
    }
  };

  return { connectToChannel };
}
