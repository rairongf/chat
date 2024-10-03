import {
  BaseContextProps,
  Channel,
  createChannel,
  findManyChannels,
  findManyUsers,
  User,
} from "@/modules/common";
import { createContext, useContext, useEffect } from "react";
import {
  IAddNewDMChannelUsecase,
  useAddNewDm,
  useInitializeDirectMessagesState,
} from "../domain/usecases";
import { useDirectMessagesState } from "./state";

type DirectMessagesContextData = {
  channels: Channel[];
  friends: User[];

  //
  addNewDm: IAddNewDMChannelUsecase;
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

  const { addNewDm } = useAddNewDm(createChannel);

  async function init() {
    await initializeDirectMessagesState({});
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <DirectMessagesContext.Provider value={{ channels, friends, addNewDm }}>
      {children}
    </DirectMessagesContext.Provider>
  );
}

export const useDirectMessages = () => useContext(DirectMessagesContext);
