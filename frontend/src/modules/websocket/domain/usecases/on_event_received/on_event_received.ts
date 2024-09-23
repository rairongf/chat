import { useWebsocketState } from '@/modules/websocket/state';
import { IOnEventReceivedUsecase } from './interface';

export function useOnEventReceived() {
  const {
    activeChannelIdState: [activeChannelId],
    messagesState: [, setMessages],
    lastReceivedEventState: [, setLastReceivedEvent],
  } = useWebsocketState();

  const onEventReceived: IOnEventReceivedUsecase = async (data) => {
    try {
      console.log(
        `[WebsocketProvider] Channel ${activeChannelId} received event:`,
        data
      );
      setLastReceivedEvent(data);
  
      if (data.channelId != activeChannelId) return;
  
      setMessages((messages) => [
        ...messages,
        {
          _id: data._id,
          channelId: data.channelId,
          content: data.content,
          createdAt: new Date(data.createdAt),
          senderId: data.senderId,
        },
      ]);
    } catch (err) {
    }
  };

  return { onEventReceived };
}
