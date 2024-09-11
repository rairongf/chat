
import { useWebsocket } from '@/modules/websocket';
import { ISendDirectMessageUsecase } from './interface';

export function useSendDirectMessage() {
  const {emit} = useWebsocket();
  
  const sendMessage: ISendDirectMessageUsecase = async ({content}) => {
    try {
      emit(content);
    } catch (err) {
      console.log('Caught error:', err);
    }
  };

  return { sendMessage };
}
