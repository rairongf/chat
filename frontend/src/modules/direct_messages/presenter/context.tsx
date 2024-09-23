import {
  BaseContextProps,
  Channel,
  findManyChannels,
  findManyUsers,
  User,
} from "@/modules/common";
import { createContext, useContext, useEffect } from "react";
import { useInitializeDirectMessagesState } from "../domain/usecases";
import { useDirectMessagesState } from "./state";

type DirectMessagesContextData = {
  channels: Channel[];
  friends: User[];
};

export const DirectMessagesContext = createContext<DirectMessagesContextData>(
  {} as DirectMessagesContextData
);

export function DirectMessagesProvider({ children }: BaseContextProps) {
  const {
    channelsState: [channels],
    friendsState: [friends],
  } = useDirectMessagesState();

  const { initializeDirectMessagesState } = useInitializeDirectMessagesState(
    findManyUsers,
    findManyChannels
  );

  async function init() {
    await initializeDirectMessagesState({});
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <DirectMessagesContext.Provider value={{ channels, friends }}>
      {children}
    </DirectMessagesContext.Provider>
  );
}

export const useDirectMessages = () => useContext(DirectMessagesContext);
