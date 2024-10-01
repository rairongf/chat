import { createContext, useContext, useEffect } from "react";
import { BaseContextProps } from "../common";
import {
  EventPayload,
  IConnectToChannelUsecase,
  ISendMessageUsecase,
  MessageDetails,
  useConnectToChannel,
  useOnEventReceived,
  useSendMessage,
} from "./domain";
import { findManyMessages, socket } from "./infra";
import { useWebsocketState } from "./state";

type WebsocketContextData = {
  // States
  activeChannelId: string | undefined;
  messages: MessageDetails[];
  lastReceivedEvent: EventPayload | undefined;
  // Actions
  connectToChannel: IConnectToChannelUsecase;
  sendMessage: ISendMessageUsecase;
};

export const WebsocketContext = createContext<WebsocketContextData>(
  {} as WebsocketContextData
);

export function WebsocketProvider({ children }: BaseContextProps) {
  const {
    activeChannelIdState: [activeChannelId],
    messagesState: [messages],
    lastReceivedEventState: [lastReceivedEvent],
  } = useWebsocketState();

  const { sendMessage } = useSendMessage(socket);

  const { onEventReceived } = useOnEventReceived();

  const { connectToChannel } = useConnectToChannel(
    socket,
    findManyMessages,
    onEventReceived
  );

  function onConnect() {
    console.log("Socket connected!");
  }

  function onDisconnect() {
    console.log("Socket disconnected.");
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      if (activeChannelId) socket.off(activeChannelId, onEventReceived);
    };
  }, []);

  return (
    <WebsocketContext.Provider
      value={{
        messages,
        activeChannelId,
        lastReceivedEvent,
        connectToChannel,
        sendMessage,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}

export const useWebsocket = () => useContext(WebsocketContext);
