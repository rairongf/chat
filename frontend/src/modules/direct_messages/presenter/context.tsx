import { useAuth } from "@/modules/auth/context";
import { useKeepSignIn } from "@/modules/auth/domain/usecases";
import {
  BaseContextProps,
  Channel,
  findManyChannels,
  findManyMessages,
  findUser,
  Message,
  User,
} from "@/modules/common";
import { createContext, useContext, useEffect } from "react";
import {
  IConnectToChannelUsecase,
  ISendDirectMessageUsecase,
  useConnectToChannel,
  useInitializeDirectMessagesState,
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
  const { setIsAuthenticated, setUser, user } = useAuth();
  const { keepSignIn } = useKeepSignIn();
  const {
    channelsState: [channels],
    usersState: [users],
    messagesState: [messages],
  } = useDirectMessagesState();

  const { initializeDirectMessagesState } =
    useInitializeDirectMessagesState(findManyChannels);

  const { connectToChannel } = useConnectToChannel(findManyMessages);

  const { sendMessage } = useSendDirectMessage();

  async function init() {
    const didSucceed = await keepSignIn({});
    setIsAuthenticated(didSucceed);
    if (!didSucceed) return;

    await initializeDirectMessagesState({});
    if (user) return;

    const response = await findUser({});
    if (!response.didSucceed) return;
    setUser(response.data);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DirectMessagesContext.Provider
      value={{ channels, users, messages, connectToChannel, sendMessage }}
    >
      {children}
    </DirectMessagesContext.Provider>
  );
}

export const useDirectMessages = () => useContext(DirectMessagesContext);
