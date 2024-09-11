import {
  BaseContextProps,
  Channel,
  Message,
  ReactUseState,
  User,
} from "@/modules/common";
import { createContext, useContext, useState } from "react";

type DirectMessagesStateContextData = {
  channelsState: ReactUseState<Channel[]>;
  messagesState: ReactUseState<Message[]>;
  usersState: ReactUseState<User[]>;
};

export const DirectMessagesStateContext =
  createContext<DirectMessagesStateContextData>(
    {} as DirectMessagesStateContextData
  );

export function DirectMessagesStateProvider({ children }: BaseContextProps) {
  const channelsState = useState<Channel[]>([]);
  const usersState = useState<User[]>([]);
  const messagesState = useState<Message[]>([]);

  return (
    <DirectMessagesStateContext.Provider value={{ channelsState, usersState, messagesState }}>
      {children}
    </DirectMessagesStateContext.Provider>
  );
}

export const useDirectMessagesState = () =>
  useContext(DirectMessagesStateContext);
