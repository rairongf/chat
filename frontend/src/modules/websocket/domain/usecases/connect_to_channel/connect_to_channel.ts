import { IFindManyMessagesRepository, IStocketClient } from '@/modules/websocket/infra';
import { useWebsocketState } from '@/modules/websocket/state';
import { IOnEventReceivedUsecase } from '../on_event_received';
import { IConnectToChannelUsecase } from './interface';

export function useConnectToChannel(
  socketClient: IStocketClient,
  findManyMessages: IFindManyMessagesRepository,
  onEventReceived: IOnEventReceivedUsecase,
) {
  const {
    activeChannelIdState: [activeChannelId, setActiveChannelId],
    messagesState: [, setMessages],
  } = useWebsocketState();

  const connectToChannel: IConnectToChannelUsecase = async ({channelId}) => {
    try {
      if (channelId == activeChannelId) {
        console.log(`User is already connected to channel ${channelId}`);
        return { isConnected: true };
      }
  
      if (activeChannelId) {
        console.log(
          `Socket disconnecting from previous active channel ${channelId}...`
        );
        socketClient.off(activeChannelId, onEventReceived);
        setActiveChannelId(undefined);
      }
  
      console.log(`Socket connecting to channel ${channelId}...`);
      if (!socketClient.connected) {
        socketClient.connect();
      }
  
      setActiveChannelId(channelId);
      socketClient.on(channelId, onEventReceived);
      const messagesResponse = await findManyMessages({
        page: 1,
        limit: 50,
        channelId,
      });
  
      if (!messagesResponse.didSucceed) {
        console.log(
          "Could not fetch channel messages. Error:",
          messagesResponse.error
        );
        return { isConnected: true };
      }
  
      setMessages([
        ...messagesResponse.data.elements.map((e) => ({
          ...e,
          createdAt: new Date(e.createdAt),
        })),
      ]);
      return { isConnected: true };
    } catch (err) {
      return { isConnected: activeChannelId == channelId };
    }
  };

  return { connectToChannel };
}
