
import { ISendDirectMessageUsecase } from './interface';

export function useSendDirectMessage() {
  const sendMessage: ISendDirectMessageUsecase = async () => {
    try {
      const { data, didSucceed, error } = await ();

      if (!didSucceed) {
        return;
      }

      return data;
    } catch (err) {
    }
  };

  return { sendMessage };
}
