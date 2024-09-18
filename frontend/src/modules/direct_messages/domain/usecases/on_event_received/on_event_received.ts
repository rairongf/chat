import { Message } from '@/modules/common';
import { useDirectMessagesState } from '@/modules/direct_messages';
import { IOnEventReceivedUsecase } from './interface';

export function useOnEventReceived(): IOnEventReceivedUsecase {
  const { messagesState: [messages, setMessages] } = useDirectMessagesState();

  async function onEventReceived(data: Message) {
    try {
      if (!data) return;
      console.log('[onEventReceived] messages:',messages);
      setMessages([...messages, {
        _id: data._id,
        channelId: data.channelId,
        content: data.content,
        createdAt: new Date(data.createdAt),
        senderId: data.senderId,
      }]);
    } catch (err) {
      console.log('Caught error:', err);
    }
  };

  return onEventReceived;
}
