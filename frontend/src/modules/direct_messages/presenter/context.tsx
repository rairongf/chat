import {
  BaseContextProps,
  Channel,
  findManyChannels,
  findManyMessages,
  Message,
  User,
} from "@/modules/common";
import { useWebsocket } from "@/modules/websocket";
import { createContext, useContext, useEffect } from "react";
import {
  IConnectToChannelUsecase,
  ISendDirectMessageUsecase,
  useConnectToChannel,
  useInitializeDirectMessagesState,
  useOnEventReceived,
  useSendDirectMessage,
} from "../domain/usecases";
import { useDirectMessagesState } from "./state";

type DirectMessagesContextData = {
  channels: Channel[];
  users: User[];
  messages: Message[];
  connectToChannel: IConnectToChannelUsecase;
  sendMessage: ISendDirectMessageUsecase;
};

export const DirectMessagesContext = createContext<DirectMessagesContextData>(
  {} as DirectMessagesContextData
);

export function DirectMessagesProvider({ children }: BaseContextProps) {
  const {
    channelsState: [channels],
    usersState: [users],
    messagesState: [messages],
  } = useDirectMessagesState();
  const { receivedEvents } = useWebsocket();

  const onEventReceived = useOnEventReceived();

  const { initializeDirectMessagesState } =
    useInitializeDirectMessagesState(findManyChannels);

  const { connectToChannel } = useConnectToChannel(findManyMessages);

  const { sendMessage } = useSendDirectMessage();

  async function init() {
    await initializeDirectMessagesState({});
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const lastEvent = receivedEvents.at(receivedEvents.length - 1);
    if (!lastEvent) return;

    onEventReceived(lastEvent);
  }, [receivedEvents]);

  return (
    <DirectMessagesContext.Provider
      value={{ channels, users, messages, connectToChannel, sendMessage }}
    >
      {children}
    </DirectMessagesContext.Provider>
  );
}

export const useDirectMessages = () => useContext(DirectMessagesContext);
