import { BaseContextProps, ReactUseState } from "@/modules/common";
import { createContext, useContext, useState } from "react";
import { EventPayload } from "./domain";
import { MessageDetails } from "./domain/models";

type WebsocketStateContextData = {
  activeChannelIdState: ReactUseState<string | undefined>;
  messagesState: ReactUseState<MessageDetails[]>;
  lastReceivedEventState: ReactUseState<EventPayload | undefined>;
};

const WebsocketStateContext = createContext<WebsocketStateContextData>(
  {} as WebsocketStateContextData
);

export function WebsocketStateProvider({ children }: BaseContextProps) {
  const activeChannelIdState = useState<string>();
  const messagesState = useState<MessageDetails[]>([]);
  const lastReceivedEventState = useState<EventPayload>();

  return (
    <WebsocketStateContext.Provider
      value={{ activeChannelIdState, messagesState, lastReceivedEventState }}
    >
      {children}
    </WebsocketStateContext.Provider>
  );
}

export const useWebsocketState = () => useContext(WebsocketStateContext);
