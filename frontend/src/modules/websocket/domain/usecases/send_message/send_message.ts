import { useSession } from '@/modules/session/context';
import { IStocketClient } from '@/modules/websocket/infra';
import { useWebsocketState } from '@/modules/websocket/state';
import { ISendMessageUsecase } from './interface';

export function useSendMessage(socketClient: IStocketClient) {
  const { user } = useSession();
  const {
    activeChannelIdState: [activeChannelId],
  } = useWebsocketState();

  const sendMessage: ISendMessageUsecase = async ({content}) => {
    try {
      console.log(`Emitting ${content} to ${activeChannelId}...`);
      socketClient.emit("events", {
        channelId: activeChannelId,
        senderId: user?._id,
        content: content,
      });
    } catch (err) {
      console.log(`Caught error:`, err);
    }
  };

  return { sendMessage };
}
