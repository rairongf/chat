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
  usersState: ReactUseState<User[]>;
  messagesState: ReactUseState<Message[]>;
};

export const DirectMessagesStateContext =
  createContext<DirectMessagesStateContextData>(
    {} as DirectMessagesStateContextData
  );

export function DirectMessagesStateProvider({ children }: BaseContextProps) {
  const channelsState = useState<Channel[]>([]);
  const usersState = useState<User[]>([]);
  const messagesState = useState<Message[]>([]);

  const value: DirectMessagesStateContextData = {
    channelsState,
    usersState,
    messagesState,
  };

  return (
    <DirectMessagesStateContext.Provider value={value}>
      {children}
    </DirectMessagesStateContext.Provider>
  );
}

export const useDirectMessagesState = () =>
  useContext(DirectMessagesStateContext);
