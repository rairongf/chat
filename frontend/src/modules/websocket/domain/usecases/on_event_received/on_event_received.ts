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
        `[IOnEventReceivedUsecase] Channel ${activeChannelId} received event:`,
        data
      );
      setLastReceivedEvent(data);
  
      //if (data.channel != activeChannelId) return;
  
      setMessages((messages) => {
        const message = messages.find((m) => m._id == data._id);
        if(message) return [...messages];

        return [
          ...messages,
          {
            _id: data._id,
            channel: data.channel,
            content: data.content,
            createdAt: new Date(data.createdAt),
            sender: data.sender,
          },
        ];
      });
    } catch (err) {
    }
  };

  return { onEventReceived };
}
