import {
  BaseContextProps,
  Channel,
  ReactUseState,
  User,
} from "@/modules/common";
import { createContext, useContext, useState } from "react";

type DirectMessagesStateContextData = {
  channelsState: ReactUseState<Channel[]>;
  friendsState: ReactUseState<User[]>;
};

export const DirectMessagesStateContext =
  createContext<DirectMessagesStateContextData>(
    {} as DirectMessagesStateContextData
  );

export function DirectMessagesStateProvider({ children }: BaseContextProps) {
  const channelsState = useState<Channel[]>([]);
  const friendsState = useState<User[]>([]);

  return (
    <DirectMessagesStateContext.Provider
      value={{
        channelsState,
        friendsState,
      }}
    >
      {children}
    </DirectMessagesStateContext.Provider>
  );
}

export const useDirectMessagesState = () =>
  useContext(DirectMessagesStateContext);
